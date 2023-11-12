<template>
    <div class="main-container">
        <div class="header">
            <nuxt-link class="home" to="/">
                <img src="~/assets/documentovisco-transparent-light.png" alt="logo" @click="">
            </nuxt-link>
            <h1>Panel pracownika</h1>
        </div>
        <div class="content">
            <profile-card
                class="profile-card"
                :nickname=nickname
                :full-name="name + ' ' + surname"
                :profile-picture-file="profilePicture"
                :verified="true"
            />
            <div class="brief-statistics">
                <info-card
                    :data="totalViews"
                    icon-name="person-outline"
                    caption="Wyświetlenia"
                />
                <info-card
                    :data="totalEarnings"
                    icon-name="cash-outline"
                    caption="Zarobki"
                />
                <info-card
                    :data="totalViewTime"
                    icon-name="time-outline"
                    caption="Suma oglądalności"
                />
            </div>
            <div class="contract">
                <div class="section-header">
                    <span>Umowa</span>
                </div>
                <div class="card" v-if="!editMode">
                    <div class="section">
                        <span class="caption">Ważność umowy:</span>
                        <span class="important">do {{ endDate?.getDate() }}.{{ endDate?.getMonth() + 1 }}.{{ endDate?.getFullYear() }}r</span>
                    </div>
                    <div class="section">
                        <span class="caption">Stawka za godzinę oglądalności:</span>
                        <span class="important">{{ rate }} zł</span>
                    </div>
                    <div class="section">
                        <span class="caption">Procent otrzymywanych dotacji:</span>
                        <span class="important">{{ donationPercentage }}%</span>
                    </div>
                </div>
                <div class="card" v-if="editMode">
                    <div class="section">
                        <span class="caption">Ważność umowy:</span>
                        <span class="important"><input type="date" v-model="endDateString"></span>
                    </div>
                    <div class="section">
                        <span class="caption">Stawka za godzinę oglądalności:</span>
                        <span class="important"><input type="text" v-model="rate">zł</span>
                    </div>
                    <div class="section">
                        <span class="caption">Procent otrzymywanych dotacji:</span>
                        <span class="important"><input type="number" v-model="donationPercentage">%</span>
                    </div>
                    <div class="buttons">
                        <button-component
                            text="Zapisz umowę"
                            icon-name="duplicate-outline"
                            :on-click="saveContract"
                        />
                    </div>
                </div>
            </div>
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
                        <span class="important">{{ viewTime }}</span>
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
                        <span class="important">{{ viewTimeEarnings }} zł</span>
                    </div>

                    <div class="buttons small">
                        <button-component
                            :text="`Wygeneruj raport z miesiąca - ${selectedMonth.name}`"
                            icon-name="document-text-outline"
                            color="#18408e"
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
    import {baseAPIURL} from '../../../config/api.ts';

    const name = ref('');
    const surname = ref('');
    const nickname = ref('');
    const profilePicture = ref('');

    const contract = ref({});
    const endDate = ref();
    const endDateString = ref('')
    const rate = ref();
    const donationPercentage = ref();

    const totalEarnings = ref('2 316 680 zł');
    const totalViews = ref('297.5 tys.');
    const totalViewTime = ref('45 mln. h');

    const reports = ref([]);
    const donations = ref('0 PLN');
    const views = ref('0');
    const viewTime = ref('0 h');
    const viewTimeEarnings = ref('0 PLN');

    const months = [
        {name: 'Czerwiec 2023', value: 6},
        {name: 'Lipiec 2023', value: 7},
        {name: 'Sierpień 2023', value: 8},
        {name: 'Wrzesień 2023', value: 9},
        {name: 'Październik 2023', value: 10},
        {name: 'Listopad 2023', value: 11},
    ]
    const selectedMonth = ref(months.at(-2));

    const { id } = useRoute().params
    const { data: partner } = await useFetch(baseAPIURL + "/partners/" + id);

    name.value = partner.value.name;
    surname.value = partner.value.surname;
    nickname.value = partner.value.nickname;
    profilePicture.value = partner.value.avatar;


    contract.value = partner.value.documents.filter((document) => {
        return (document.rate !== undefined);
    }).sort((item1, item2) => {
        const date1 = new Date(item1.endDate);
        const date2 = new Date(item2.endDate);

        return date1 > date2;
    }).at(-1);

    reports.value = partner.value.documents.filter(document => {
        return document.viewers !== undefined;
    });

    endDate.value = new Date(new Date(contract?.value.endDate).toISOString().split('T')[0]);
    endDateString.value = endDate.value.getFullYear() + '-' + (endDate.value.getMonth() + 1) + '-' + endDate.value.getDate();

    rate.value = contract?.value.rate;
    donationPercentage.value = contract?.value.donationPercentage;

    // get report
    const report = reports.value.find((report) => {
        const date = new Date(report.startDate);
        return date.getMonth() === selectedMonth.value.value - 1;
    });

    donations.value = report.donations + " PLN";
    views.value = report.viewers;
    viewTime.value = report.hoursWatched + " h";
    viewTimeEarnings.value = (contract.value.rate * report.hoursWatched).toFixed(2).toString();

    watch(selectedMonth, () => {
        const report = reports.value.find((report) => {
            const date = new Date(report.startDate);
            return date.getMonth() === selectedMonth.value.value - 1;
        });

        if(!report || !contract) {
            donations.value =  "0 PLN";
            views.value = "0";
            viewTime.value = "0 h"
            viewTimeEarnings.value = '0';
            return;
        }

        donations.value = report.donations + " PLN";
        views.value = report.viewers;
        viewTime.value = report.hoursWatched + " h";
        viewTimeEarnings.value = (contract.value.rate * report.hoursWatched).toFixed(2).toString();
    })

    const editMode = ref(contract?.value.contractExtensionInProgress && !contract?.value.contractExtensionOfferVisible)
    console.log('editmode')
    console.log(editMode);
    const saveContract = async () => {
        endDate.value = new Date(endDateString.value)
        useFetch(baseAPIURL + `/partnershipContracts/${contract?.value.id}`,  {method: 'PATCH', body: {
            "endDate": endDate.value,
            "rate": rate.value,
            "donationPercentage": donationPercentage.value
        }});
        
        editMode.value = false;
    }
</script>

<style lang="scss" scoped>
    .main-container {
        display: flex;
        flex-direction: column;
        font-family: Lato, Helvetica Neue, Noto Sans, sans-serif;
    }
    .header {
        display: flex;
        flex: 1;
        align-items: center;
        background-color: $primary600;

        & > .home {
            & > img {
                width: 8em;
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

    .section-header {
        font-size: 2em;
        margin-bottom: 0.6em;
    }

    .content {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        align-self: center;
        max-width: 800px;
        padding: 2em 0 4em;

        & > span {
            font-size: 1.6em;
            font-weight: 500;
        }

        & > .profile-card {
            margin-bottom: 4em;
        }
    }

    .brief-statistics {
        display: flex;
        gap: 1em;
        margin-bottom: 3.2em;
    }

    .contract {

        margin-bottom: 3.2em;
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

    .statistics {

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