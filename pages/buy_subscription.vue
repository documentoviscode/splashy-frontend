<template>
    <div class="sub_form">
        <div class="header">Wybierz subskrypcję:</div>
        <select>
            <option value="0">--</option>
            <option value="1">Pakiet 1</option>
            <option value="2">Pakiet 2</option>
        </select>
        <div class="price">Cena: <strong>40.00 zł</strong></div>
        <div class="period">Czas: miesięcznie/na zawsze</div>
        <div class="description">
            Opis: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel massa augue. Curabitur tortor arcu, tristique in cursus eu, maximus vitae ex. Integer at nibh in massa viverra fringilla sit amet ac risus. Fusce arcu ante, dictum pharetra suscipit a, vehicula vel nisi.
        </div>
        <button class="buy_sub">Kup</button>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
#__nuxt {
    display: flex;
    justify-content: center;
}

.sub_form {
    width: 800px;
    display: flex;
    flex-direction: column;
    align-content: stretch;
    justify-content: flex-start;
    row-gap: 40px;
    margin-top: 80px;
    padding: 40px 60px;
    background-color: $background400;
    border-radius: 10px;
}

.sub_form > div {
    width: 100%;
}

.header {
    text-align: center;
    font-size: 24px;
}

.price, .period, .description {
    font-size: 24px;
}

.sub_form > select {
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    margin: 0 160px;
    height: 30px;
}

.buy_sub {
    border-radius: 1000px;
    background-color: $primary500;
    width: 300px;
    margin: 0 auto;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
}
</style>