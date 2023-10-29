<template>
    <div class="main-container">
        <div class="header">
            <img src="~/assets/documentovisco-transparent-light.png" alt="logo">
            <h1>Panel partnera</h1>
        </div>
        <div class="content">
            <profile-card
                nickname="belledelphine97_"
                full-name="Belle Delphine"
                profile-picture-file="streamer1.jpg"
            />
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
    }
</style>