<template>
    <div class="main-container">
        <div class="header">
            <img src="~/assets/documentovisco-transparent-light.png" alt="logo">
            <h1>Panel partnera</h1>
        </div>
        <div class="content">
            <profile-card
                class="profile-card"
                nickname="belledelphine97_"
                full-name="Belle Delphine"
                profile-picture-file="streamer1.jpg"
                verified="true"
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
                <div class="text">
                    <span>Twoja umowa</span>
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

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const totalEarnings = ref('2 316 680 zł');
    const views = ref('297.5 tys.');
    const viewTime = ref('45 mln. h');

</script>

<style lang="scss" scoped>
    .main-container {
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        font-family: Lato, Helvetica Neue, Noto Sans, sans-serif;
    }
    .header {
        display: flex;
        flex: 1;
        background-color: $primary600;

        & > img {
            width: 8em;
        }

        & > h1 {
            padding: 0 1em;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        align-self: center;
        max-width: 800px;
        max-height: 800px;
        padding: 2em 0;

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
        & > .text {
            font-size: 2em;
            margin-bottom: 0.6em;
        }

        & > .card {
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
                    font-size: 1.6em;
                }

                & > .caption {
                    font-size: 1.3em;
                }
            }
        }
    }
</style>