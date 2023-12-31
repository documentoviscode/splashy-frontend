<template>
    <div class="main-container">
        <div class="header">
            <nuxt-link class="home" to="/">
                <img src="~/assets/splashyTV-logo-transparent-light.png" alt="logo" @click="">
            </nuxt-link>
            <h1>Panel partnera</h1>
        </div>
        <div class="content">
            <profile-card
                class="profile-card"
                :nickname="nickname"
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
                <div v-if="!contractExtensionOfferVisible">
                    <div class="section-header">
                        <span>Twoja umowa</span>
                    </div>
                    <div class="card">
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
                        <div class="buttons">
                            <button-component
                                text="Przedłuż umowę"
                                icon-name="duplicate-outline"
                                :on-click="extendContract"
                            />
                            <button-component
                                text="Rozwiąż umowę"
                                icon-name="exit-outline"
                                color="#dd3333"
                                :on-click="navigateBack"
                            />
                        </div>
                        <transition name="fade" mode="in-out">
                            <div v-if="extendContractTextVisible" class="alert">
                                <span>Wysłano prośbę o przedłużenie umowy</span>
                            </div>
                        </transition>
                    </div>
                </div>
                
                <div v-if="contractExtensionOfferVisible">
                    <div class="section-header">
                        <span>Zatwierdź nową umowę</span>
                        <span class="notification"><Icon class="icon" name="ion:notifications-outline" size="30"/></span>
                    </div>
                    <div class="card" style="border: #c40b74 0.2px solid;">
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
                        <div class="buttons">
                            <button-component
                                text="Zaakceptuj ofertę"
                                icon-name="duplicate-outline"
                                :on-click="acceptContract"
                            />
                            <button-component
                                text="Odrzuć ofertę"
                                icon-name="exit-outline"
                                color="#dd3333"
                                :on-click="declineContract"
                            />
                        </div>
                        <transition name="fade" mode="in-out">
                            <div v-if="acceptedNewContractTextVisible" class="alert">
                                <span>Zapisano nową umowę</span>
                            </div>
                        </transition>
                        <transition name="fade" mode="in-out">
                            <div v-if="declinedNewContractTextVisible" class="alert">
                                <span>Odrzucono nowe warunki umowy</span>
                            </div>
                        </transition>
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
                            :onClick="generate"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <span>&copy; splashyTV 2023</span>
        </div>
    </div>
</template>

<script setup>
    import {baseAPIURL} from "~/config/api.ts";
    import {navigateTo} from "#app";

    var userData;
    const name = ref('');
    const surname = ref('');
    const nickname = ref('');
    const profilePicture = ref('');
    const user = ref(null);

    const contract = ref({});
    const endDate = ref();
    const rate = ref();
    const donationPercentage = ref();
    const contractExtensionOfferVisible = ref(false)

    const totalEarnings = ref('2 316 680 zł');
    const totalViews = ref('297.5 tys.');
    const totalViewTime = ref('45 mln. h');

    const reports = ref([]);
    const donations = ref('0 PLN');
    const views = ref('0');
    const viewTime = ref('0 h');
    const viewTimeEarnings = ref('0 PLN');

    onMounted(() => {
        const userDataString = sessionStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);

            name.value = userData.name;
            surname.value = userData.surname;
            nickname.value = userData.nickname;
            profilePicture.value = userData.avatar;

            user.value = userData;

            if (userData.id === 2) {
                totalEarnings.value = '2 316 680 zł';
                totalViews.value = '297.5 tys.';
                totalViewTime.value = '45 mln. h';
            }
            else if (userData.id === 3) {
                totalEarnings.value = '620 180 zł';
                totalViews.value = '123.4 tys.';
                totalViewTime.value = '9 mln. h';
            }
            else if (userData.id === 4) {
                totalEarnings.value = '1 451 000 zł';
                totalViews.value = '89.5 tys.';
                totalViewTime.value = '20 mln. h';
            }

            contract.value = user.value.documents.filter((document) => {
                return (document.rate !== undefined);
            }).sort((item1, item2) => {
                const date1 = new Date(item1.endDate);
                const date2 = new Date(item2.endDate);

                return date1 > date2;
            }).at(-1);

            reports.value = user.value.documents.filter(document => {
                return document.viewers !== undefined;
            });

            endDate.value = new Date(new Date(contract?.value.endDate).toISOString().split('T')[0]);
            rate.value = contract?.value.rate;
            donationPercentage.value = contract?.value.donationPercentage;
            contractExtensionOfferVisible.value = contract?.value.contractExtensionOfferVisible;

            // get report
            const report = reports.value.find((report) => {
                const date = new Date(report.startDate);
                return date.getMonth() === selectedMonth.value.value - 1;
            });
            console.log(reports);

            donations.value = report.donations + " PLN";
            views.value = report.viewers;
            viewTime.value = report.hoursWatched + " h";
            viewTimeEarnings.value = (contract.value.rate * report.hoursWatched).toFixed(2).toString();
        }
    });

    const generate = async () => {
        await nextTick();
        const {data,pending,error,refresh} = await useFetch(baseAPIURL + "/monthlyReports");
        const monthlyReports = [];
        for (const i in data.value) {
            monthlyReports.push(data.value[i].id)
        }

        const report = reports.value.find((report) => {
          const date = new Date(report.startDate);
          return date.getMonth() === selectedMonth.value.value - 1 && monthlyReports.includes(report.id);
        });

        await nextTick();
        if (report) {
            await nextTick();
            const {data,pending,error,refresh} = await useFetch(baseAPIURL + "/monthlyReportPartner/" + report.id);
            const content = data.value;

            const link = document.createElement("a");
            const file = new Blob([content], { type: 'application/pdf' });
            link.href = URL.createObjectURL(file);
            link.download = `monthlyReport_${new Date().toISOString().substring(0, 10)}.pdf`;
            link.click();
            URL.revokeObjectURL(link.href);
        }
    };

    const months = [
        {name: 'Czerwiec 2023', value: 6},
        {name: 'Lipiec 2023', value: 7},
        {name: 'Sierpień 2023', value: 8},
        {name: 'Wrzesień 2023', value: 9},
        {name: 'Październik 2023', value: 10},
        {name: 'Listopad 2023', value: 11},
    ]
    const selectedMonth = ref(months.at(-2));

    const extendContractTextVisible = ref(false);
    const acceptedNewContractTextVisible = ref(false)
    const declinedNewContractTextVisible = ref(false)

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

    const extendContract = async () => {
        useFetch(baseAPIURL + `/tasks/create/${user?.value.id}/${contract?.value.id}`,  {method: 'POST'});

        extendContractTextVisible.value = true;

        setTimeout(() => {extendContractTextVisible.value = false}, 5000);
    }

    const navigateBack = () => {
        setTimeout(async () => {await navigateTo('/')}, 1000);
    }

    const acceptContract = async () => {
        useFetch(baseAPIURL + `/tasks/userReview/true`,  {method: 'POST'});

        acceptedNewContractTextVisible.value = true;

        setTimeout(() => {acceptedNewContractTextVisible.value = false}, 3000);
        setTimeout(() => {contractExtensionOfferVisible.value = false}, 3000);
    }

    const declineContract = async () => {
        useFetch(baseAPIURL + `/tasks/userReview/false`,  {method: 'POST'});

        declinedNewContractTextVisible.value = true;

        setTimeout(() => {declinedNewContractTextVisible.value = false}, 1000);
        setTimeout(() => {contractExtensionOfferVisible.value = false}, 1000);

        navigateBack();
    }
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s, transform 0.5s;
    }
    .fade-enter-from, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0;
        transform: translateY(-60%);
    }

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
                margin-left: 1em;
                width: 5em;
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

        & > .alert {
            margin-top: 1em;
            padding: 1em 1em;
            border: 1px solid $secondary800;
            border-radius: 12px;

            & > span {
                font-size: 1.4em;
                margin-top: 1em;
                color: $secondary400;
            }
        }
    }

    .statistics {

    }

    .month-select {
        margin-bottom: 0.6em;
    }

    .notification {
        margin-left: 0.5em;
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
