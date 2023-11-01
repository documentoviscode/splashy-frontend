<template>
    <div class="main-container">
        <div class="logo">
            <img src="~/assets/documentovisco-transparent-light.png" alt="logo">
        </div>
        <p style="margin: 40px 40px">Witaj na portalu zarządzania umowami z partnerami oraz raportami firmy SplashyTV</p>
        <div class="links">
            <div>
                <nuxt-link to="/employee/partners">Partnerzy</nuxt-link>
            </div>
            <div>
                <nuxt-link to="/employee/reports">Raporty</nuxt-link>
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
    justify-content: center;
    align-items: center;

    & > p {
        font-size: 1.2em;
    }
}
.links {
    display: flex;
    flex-direction: row;
    gap: 10em;
    justify-content: space-evenly;

    & > div {
        background-color: $primary500;
        border-radius: 4em;
        padding: 1em 5em;
        transition: background-color 0.15s ease-in-out;

        &:hover {
            background-color: $primary600;
        }

        & > a {
            text-decoration: none;
            color: inherit;
        }

        & > span {
            font-weight: 600;
            font-size: 1.2em;
        }
    }

}
button {
    flex: 1;
    background: $primary500;
    border: 0;
    padding: 1em 6em;
    margin: 4em auto;
    color: $text500;
    border-radius: 3em;
    cursor: pointer;
}
button:hover {
    background-color: $primary600;
}
.logo {
    margin-top: 6em;
    max-width: 20%;
}
</style>