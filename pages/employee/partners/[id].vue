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
                :nickname=partner.nickname
                :full-name="`${partner.name} ${partner.surname}`"
                profile-picture-file="streamer1.jpg"
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
                    <span>Umowa</span>
                </div>
                <div class="card">
                    <div class="section">
                        <span class="caption">Ważność umowy:</span>
                        <span class="important">do 21.12.2023r</span>
                    </div>
                    <div class="section">
                        <span class="caption">Stawka za godzinę oglądalności:</span>
                        <span class="important">0,03 zł</span>
                    </div>
                    <div class="section">
                        <span class="caption">Procent otrzymywanych dotacji:</span>
                        <span class="important">70%</span>
                    </div>
                    <div class="buttons">
                        <button-component
                            text="Przedłuż umowę"
                            icon-name="duplicate-outline"
                        />
                        <button-component
                            text="Rozwiąż umowę"
                            icon-name="exit-outline"
                            color="#dd3333"
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
    const totalEarnings = ref('2 316 680 zł');
    const views = ref('297.5 tys.');
    const viewTime = ref('45 mln. h');

    const months = ['Czerwiec 2023', 'Lipiec 2023', 'Sierpień 2023', 'Wrzesień 2023', 'Październik 2023', 'Listopad 2023']
    const selectedMonth = ref(months.at(-1));

    // const { id } = useRoute().params
    // fetch data abot partner
    // const { data: partner } = await useFetch(endpoint, { key: id})

    const partner = {"id": 1, "name": "Michał", "surname": "Ziemiec", "nickname": "MikulembeZiemczyk123$$$"}
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