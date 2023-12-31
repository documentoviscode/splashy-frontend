<template>
    <div class="main-container">
        <div class="header">
            <nuxt-link class="home" to="/">
                <img src="~/assets/splashyTV-logo-transparent-light.png" alt="logo" @click="">
            </nuxt-link>
            <h1>Panel pracownika biura obsługi partnerów</h1>
        </div>
        <div class="content">
            <div class="statistics">
                <div class="section-header">
                    <span>Statystyki</span>
                </div>
                <div class="card">
                    <USelectMenu
                        class="month-select"
                        v-model="selectedMonth"
                        :options="months"
                        size="xl"
                        color="#3770dd"
                        option-attribute="name"
                    />

                    <div class="section">
                        <span class="caption">Suma godzin oglądalności:</span>
                        <span class="important">{{viewTime}}</span>
                    </div>
                    <div class="section">
                        <span class="caption">Suma dotacji:</span>
                        <span class="important">{{ donations }}</span>
                    </div>
                    <div class="section">
                        <span class="caption">Liczba unikalnych widzów:</span>
                        <span class="important">{{ views }}</span>
                    </div>
                    <div class="section">
                        <span class="caption">Zarobek za oglądalność:</span>
                        <span class="important">{{ viewTimeEarnings }}</span>
                    </div>

                    <div class="buttons small">
                        <button-component
                            :text="`Wygeneruj raport z miesiąca - ${selectedMonth.name}`"
                            icon-name="document-text-outline"
                            color="#18408e"
                            :onClick="generate"
                        />
                    </div>
                </div>
            </div>
        </div>
         <div class="footer">
            <span>&copy; Documentovisco 2023</span>
        </div>
    </div>
</template>

<script setup>
    const {data,pending,error,refresh} = await useFetch(baseAPIURL + "/monthlyReports");

    const reports = data.value;
    const donations = ref('0 PLN');
    const views = ref('0');
    const viewTime = ref('0 h');
    const viewTimeEarnings = ref('0 PLN')

    const months = [
        {name: 'Czerwiec 2023', value: 6},
        {name: 'Lipiec 2023', value: 7},
        {name: 'Sierpień 2023', value: 8},
        {name: 'Wrzesień 2023', value: 9},
        {name: 'Październik 2023', value: 10},
        {name: 'Listopad 2023', value: 11},
    ]
    const selectedMonth = ref(months.at(-1));

    import {baseAPIURL} from '~/config/api.ts';

    onMounted(() => {
        const filteredReports = reports.filter((report) => {
            const date = new Date(report.startDate);
            return date.getMonth() === selectedMonth.value.value - 1;
        });

        if(!filteredReports) {
            donations.value = "0 PLN";
            views.value = "0";
            viewTime.value = "0 h"
            return;
        }

        let donationsNum = 0;
        let viewsNum = 0;
        let viewTimeNum = 0;
        let viewTimeEarningsNum = 0;
        filteredReports.forEach(item => {
            donationsNum += item.donations;
            viewsNum += item.viewers;
            viewTimeNum += item.hoursWatched;
            viewTimeEarningsNum += item.revenue;
        });

        donations.value = donationsNum + " PLN";
        views.value = viewsNum;
        viewTime.value = viewTimeNum + " h";
        viewTimeEarnings.value = Math.floor(viewTimeEarningsNum) + ' PLN';
    });


    watch(selectedMonth, () => {
        const filteredReports = reports.filter((report) => {
            const date = new Date(report.startDate);
            return date.getMonth() === selectedMonth.value.value - 1;
        });

        if(!filteredReports) {
            donations.value =  "0 PLN";
            views.value = "0";
            viewTime.value = "0 h"
            return;
        }

        let donationsNum = 0;
        let viewsNum = 0;
        let viewTimeNum = 0;
        let viewTimeEarningsNum = 0;
        filteredReports.forEach(item => {
            donationsNum += item.donations;
            viewsNum += item.viewers;
            viewTimeNum += item.hoursWatched;
            viewTimeEarningsNum += item.revenue;
        });

        donations.value = Math.floor(donationsNum) + " PLN";
        views.value = viewsNum;
        viewTime.value = viewTimeNum + " h";
        viewTimeEarnings.value = Math.floor(viewTimeEarningsNum) + ' PLN';
    })

    const generate = async () => {
        if (viewTimeEarnings.value === "0 PLN") return;

        await nextTick();

        const now = new Date().toISOString();
        const startDate = new Date(2023, selectedMonth.value.value - 1, 1, 12);
        const endDate = new Date(2023, selectedMonth.value.value, 0, 12);
        
        const {data,pending,error,refresh} = await useFetch(baseAPIURL + "/monthlyReportCompany", {
            method: 'POST', body: {
                "creationDate": now,
                "startDate": startDate.toISOString(),
                "endDate": endDate.toISOString(),
                "viewers": views.value,
                "hoursWatched": parseFloat(viewTime.value),
                "donations": parseFloat(donations.value),
                "revenue": parseFloat(viewTimeEarnings.value)
        }});

        if (error.value === null) {
            const content = data.value;
            const link = document.createElement("a");
            const file = new Blob([content], {
              type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            });
            link.href = URL.createObjectURL(file);
            link.download = `monthlyReportCompany_${now.substring(0, 10)}.docx`;
            link.click();
            URL.revokeObjectURL(link.href);
        }
    };
</script>

<style lang="scss" scoped>
    .main-container {
        display: flex;
        flex-direction: column;
        font-family: Lato, Helvetica Neue, Noto Sans, sans-serif;
        min-height: 100vh;
    }
    .header {
        display: flex;
        align-items: center;
        background-color: $primary600;

        & > .home {
            & > img {
                width: 5em;
                margin-left: 1em;
                transition: 0.1s ease-in-out;
            }
            & > img:hover {
                filter: brightness(0.9);
            }
            & > img:active {
                filter: brightness(0.8);
            }
        }

        & > h1 {
            padding: 0 1em;
            font-size: 1.7em;
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        align-self: center;
        max-width: 800px;
        padding: 2em 0 4em;
        min-height: 80vh;

        & > span {
            font-size: 1.6em;
            font-weight: 500;
        }
    }
    .section-header {
        font-size: 2em;
        margin-bottom: 0.6em;
    }
    .card {
        background-color: $background600;
        border: $primary500 0.2px solid;
        border-radius: 12px;
        box-shadow: 4px 4px 12px 0 $background800;
        padding: 2em;
        display: flex;
        flex-direction: column;
        gap: 0.8em;

        & > .section {
            display: flex;
            gap: 0.6em;
            align-items: flex-end;

            & > .important {
                font-size: 1.3em;
                font-weight: 600;
            }

            & > .caption {
                font-size: 1.2em;
            }
        }

        & > .buttons {
            margin-top: 1em;
            display: flex;
            gap: 1em;
        }
    }
    .month-select {
        margin-bottom: 0.6em;
    }
    .footer {
        display: flex;
        flex-direction: column;
        flex: 1;
        background-color: $background600;
        padding: 2em 4em;

        & > span {
            align-self: flex-end;
            font-weight: 300;
            color: $background300;
        }
    }
</style>
