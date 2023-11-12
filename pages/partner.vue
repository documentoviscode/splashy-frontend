<template>
    <div class="main-container">
        <div class="header">
            <nuxt-link class="home" to="/">
                <img src="~/assets/documentovisco-transparent-light.png" alt="logo" @click="">
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
                    :data="views"
                    icon-name="person-outline"
                    caption="Wyświetlenia"
                />
                <info-card
                    :data="totalEarnings"
                    icon-name="cash-outline"
                    caption="Zarobki"
                />
                <info-card
                    :data="viewTime"
                    icon-name="time-outline"
                    caption="Suma oglądalności"
                />
            </div>
            <div class="contract">
                <div class="section-header">
                    <span>Twoja umowa</span>
                </div>
                <div class="card">
                    <div class="section">
                        <span class="caption">Ważność umowy:</span>
                        <span class="important">do {{ endDate }}r</span>
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
                        />
                    </div>
                    <span v-if="extendContractTextVisible">Wysłano prośbę o przedłużenie umowy</span>
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
                    />

                    <div class="section">
                        <span class="caption">Suma godzin oglądalności:</span>
                        <span class="important">163200 h</span>
                    </div>
                    <div class="section">
                        <span class="caption">Suma dotacji:</span>
                        <span class="important">84 510 zł</span>
                    </div>
                    <div class="section">
                        <span class="caption">Liczba unikalnych widzów:</span>
                        <span class="important">23 452</span>
                    </div>
                    <div class="section">
                        <span class="caption">Zarobek za oglądalność:</span>
                        <span class="important">4 896 zł</span>
                    </div>

                    <div class="buttons small">
                        <button-component
                            :text="`Wygeneruj raport z miesiąca - ${selectedMonth}`"
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
    import {baseAPIURL} from "~/config/api.ts";
    import {end} from "@popperjs/core";

    const name = ref('');
    const surname = ref('');
    const nickname = ref('');
    const profilePicture = ref('');
    const user = ref(null);

    const contract = ref({});
    const endDate = ref();
    const rate = ref();
    const donationPercentage = ref();

    onMounted(() => {
        const userDataString = sessionStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);

            name.value = userData.name;
            surname.value = userData.surname;
            nickname.value = userData.nickname;
            profilePicture.value = userData.avatar;

            user.value = userData;

            contract.value = user.value.documents.filter((document) => {
                return (document.rate !== undefined);
            })[0];
            console.log(contract.value);

            endDate.value = new Date(contract?.value.endDate).toISOString().split('T')[0];
            rate.value = contract?.value.rate;
            donationPercentage.value = contract?.value.donationPercentage;
        }
    });

    const totalEarnings = ref('2 316 680 zł');
    const views = ref('297.5 tys.');
    const viewTime = ref('45 mln. h');

    const months = ['Czerwiec 2023', 'Lipiec 2023', 'Sierpień 2023', 'Wrzesień 2023', 'Październik 2023', 'Listopad 2023']
    const selectedMonth = ref(months.at(-1));

    const extendContractTextVisible = ref(false);

    const extendContract = async () => {
        useFetch(baseAPIURL + `/tasks/create/${user?.value.id}/${contract?.value.id}`,  {method: 'POST'});

        extendContractTextVisible.value = true;

        setTimeout(() => {extendContractTextVisible.value = false}, 5000);
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

        & > span {
            font-size: 1.4em;
            margin-top: 1em;
            color: $secondary400;
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
