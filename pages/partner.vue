<template>
    <div class="main-container">
        <div class="header">
            <img src="~/assets/documentovisco-transparent-light.png" alt="logo" class="center">
            <h1>Panel partnera</h1>
        </div>
        <div class="content">
            <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ea iusto non, obcaecati porro quidem vero?
            </span>
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
        flex: 1;
        align-self: center;
        padding: 4em 0;

        & > span {
            font-size: 1.6em;
            font-weight: 500;
        }
    }
</style>