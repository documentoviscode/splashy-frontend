<template>
    <div class="container">
        <button>&lt;&ensp; Powrót</button>
        <div class="client_profile">
            <div>Profil użytkownika</div>
            <img src="../assets/images/example_profile_picture.jpg" alt="Profile picture">
        </div>
        <div class="client_data">
            <div class="data_header">Twoje dane</div>
            <div class="username">janusz1968pl</div>
            <div class="label_username">Nazwa użytkownika</div>
            <div class="names">Janusz Nowacki</div>
            <div class="label_names">Imię i nazwisko</div>
            <div class="email">j.nowacki@p.cichowski.com</div>
            <div class="label_email">E-mail</div>
            <div class="subscriptions">
                <div class="subscriptions_header">Subskrypcja i pakiety dodatkowe</div>
                <div class="balance_state">
                    Twój kolejny rachunek w dniu <strong>14.11.23</strong> wynosi <strong>30.56 zł</strong>.
                </div>
                <div class="bundles_label">Pakiety dodatkowe</div>
                <div class="bundles">
                    <div class="bundle">Pakiet 1</div>
                    <div class="bundle">Pakiet 2</div>
                </div>
            </div>
        </div>
        <div class="buttons">
            <div class="client_manage_button">
                <div>Zarządzaj swoim panelem</div>
            </div>
            <div class="client_edit_button">
                <div>Edytuj dane konta</div>
            </div>
        </div>
        <div class="client_card">
            <div class="card_header">Karta rachunkowa</div>
            <div class="card_number">**** **** **** 2500</div>
            <div class="label_card_number">Numer karty</div>
            <div class="card_valid_date">07 / 24</div>
            <div class="label_card_valid_date">Data ważności</div>
            <div class="card_type">Mastercard</div>
            <div class="label_card_type">Rodzaj karty</div>
            <button class="update-card">Aktualizuj dane karty</button>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss">
.container {
    width: 100%;
    display: grid;
    grid-template-columns: 900px 400px;
    grid-template-rows: 2fr 5fr 1fr;
    column-gap: 20px;
    row-gap: 10px;
    margin: 0 60px;
}

.container > div, button {
    background-color: $background400;
    padding: 20px;
    border-radius: 10px;
}

button {
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
    font-size: 18px;
    color: $text500;
    align-self: end;
    padding: 10px 20px;
}

div.client_profile {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $background500;
    grid-row: 1;
    grid-column: 1 / span 2;
    justify-self: end;
    align-self: end;
}

.client_profile > div {
    margin-right: 20px;
    font-size: 30px;
}

.client_profile > img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
}

.client_profile > img, div {
    float: left;
}

.client_data {
    grid-column: 1;
    grid-row: 2;
    font-size: 30px;
    padding: 20px 40px;
    display: grid;
    grid-template-columns: 340px 500px;
    column-gap: 20px;
    justify-items: stretch;
}

.data_header {
    margin-bottom: 30px;
}

.username, .names, .email {
    grid-column: 1;
    font-size: 24px;
}

.label_username, .label_names, .label_email {
    grid-column: 1;
    font-size: 15px;
}

.subscriptions {
    border: 2px $text500 solid;
    border-radius: 10px;
    grid-column: 2;
    grid-row: 1 / span 7;
    justify-self: stretch;
    align-self: stretch;
    row-gap: 10px;
    padding: 0 0 20px 0;
}

.subscriptions_header {
    font-size: 26px;
    text-align: center;
    padding: 20px 0;
    background: $primary500;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    width: 501px;
    transform: translate(-2px, -2px);
}

.balance_state {
    font-size: 20px;
    padding: 20px 20px;
    width: 460px;
}

.bundles_label {
    font-size: 14px;
    padding: 10px 20px;
    width: 460px;
}

.bundles {
    padding: 0 20px;
    width: 460px;
    margin-top: 10px;
}

.bundle {
    background-color: #000000;
    width: 460px;
    height: 50px;
    margin-bottom: 10px;
    border-radius: 10px;
    text-align: center;
}

.buttons {
    grid-column: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    background-color: $background500 !important;
    padding: 0 !important;
}

.buttons > div {
    background-color: $background400;
    font-size: 22px;
    border-radius: 10px;
}

.client_manage_button {
    grid-column: 1;
}

.client_edit_button {
    grid-column: 2;
}

.client_manage_button, .client_edit_button {
    display: grid;
    align-items: center;
    justify-items: center;
}

.client_card {
    grid-column: 2;
    grid-row: 2 / span 2;
    font-size: 30px;
    padding: 20px 40px;
}

.card_header {
    margin-bottom: 40px;
}

.card_number, .card_valid_date, .card_type {
    grid-column: 1;
    font-size: 24px;
    width: 360px;
    margin-bottom: 10px;
}

.label_card_number, .label_card_valid_date, .label_card_type {
    grid-column: 1;
    font-size: 15px;
    width: 360px;
    margin-bottom: 40px;
}

.label_card_type {
    margin-bottom: 30px;
}

.update-card {
    background-color: $primary500;
}
</style>