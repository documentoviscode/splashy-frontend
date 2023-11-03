<template>
    <div class="main-container">
        <div class="logo">
            <img src="~/assets/documentovisco-transparent-light.png" alt="logo">
        </div>
        <p style="margin: 40px 40px">Witaj na portalu zarządzania umowami z partnerami oraz raportami firmy SplashyTV</p>
        <div class="links">
            <div>
                <nuxt-link to="/employee/partners">
                    <button-component text="Partnerzy" />
                </nuxt-link>
            </div>
            <div>
                <nuxt-link to="/employee/reports">
                    <button-component text="Raporty" />
                </nuxt-link>
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
}
.logo {
    margin-top: 6em;
    max-width: 20%;
}
</style>