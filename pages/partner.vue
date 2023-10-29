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
                    data="297.5 tys."
                    icon-name="person-outline"
                    caption="Wyświetlenia"
                />
                <info-card
                    data="2 316 680 zł"
                    icon-name="cash-outline"
                    caption="Zarobki"
                />
                <info-card
                    data="45 mln. h"
                    icon-name="time-outline"
                    caption="Suma oglądalności"
                />
            </div>
        </div>
    </div>
</template>

<script setup>

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
    }
</style>