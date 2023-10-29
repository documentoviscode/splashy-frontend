<template>
    <div class="main-container">
        <div class="logo">
            <img src="~/assets/documentovisco-transparent.png" alt="logo">
        </div>
        <p style="margin: 40px 40px">Witaj na portalu zarządzania umowami z partnerami oraz raportami firmy SplashyTV</p>
        <div class="buttons">
            <button>Partnerzy</button>
            <button>Raporty</button>
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
}
.buttons {
    display: flex;
    flex-direction: row;
    gap: 10em;
    justify-content: space-evenly;

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
    max-width: 40%;
}
</style>