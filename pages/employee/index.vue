<template>
    <div class="header">
        <nuxt-link class="home" to="/">
            <img src="~/assets/splashyTV-logo-transparent-light.png" alt="logo">
        </nuxt-link>
        <h1>Panel pracownika biura obsługi partnerów</h1>
    </div>
    <div class="main-container">
        <div class="logo">
            <img src="~/assets/splashyTV-logo-transparent-light.png" alt="splashyTV logo">
        </div>
        <p style="margin: 40px 40px">Witaj na portalu zarządzania umowami z partnerami oraz raportami firmy SplashyTV</p>
        <div class="links">
            <div>
                <nuxt-link to="/employee/partners">
                    <button-component text="Partnerzy" icon-name="person-outline"/>
                </nuxt-link>
            </div>
            <div>
                <nuxt-link to="/employee/reports">
                    <button-component text="Raporty" icon-name="document-outline"/>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    pageTransition: false,
    layoutTransition: false
})

</script>

<style lang="scss" scoped>
.main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > p {
        font-size: 1.3em;
    }
}
.links {
    display: flex;
    flex-direction: row;
    gap: 4em;
    justify-content: space-evenly;
    margin-top: 2em;
}
.logo {
    margin-top: 6em;
    max-width: 20%;

    & > img {
        width: 18em;
    }
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
</style>