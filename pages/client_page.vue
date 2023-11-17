<template>
    <div class="main-container">
        <div class="client_container">
            <nuxt-link to="/" class="button_return"><span>&lt;&ensp; Powrót</span></nuxt-link>
            <div class="client_profile">
                <div>Profil użytkownika</div>
                <img src="../assets/images/example_profile_picture.jpg" alt="Profile picture">
            </div>
            <div class="client_data">
                <div class="data_header">Twoje dane</div>
                <div class="credential">
                    <span>{{ nickname }}</span>
                    <label>Nazwa użytkownika</label>
                </div>
                <div class="credential">
                    <span>{{ name }} {{ surname }}</span>
                    <label>Imię i nazwisko</label>
                </div>
                <div class="credential">
                    <span>{{ email }}</span>
                    <label>E-mail</label>
                </div>
                <div class="subscriptions">
                    <div class="subscriptions_header"><span>Subskrypcja i pakiety dodatkowe</span></div>
                    <div class="balance_state">
                        Twój kolejny rachunek w dniu <strong>{{ nextBillingDate.toISOString().substring(0, 10) }}</strong> wynosi <strong>{{subscription.monthlyRate}} zł</strong>.
                    </div>
                    <div v-if="packages.length > 0" class="bundles_label">Pakiety dodatkowe</div>
                    <div class="bundles">
                        <div v-for="(p, index) in packages" :key="index">
                            <div class="bundle" :class="'bundle' + index">
                                <div class="content">
                                    {{ p.packageType }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button-component
                    class="update-card"
                    style="padding-left: 300px;"
                    text="Wykup dodatkowe pakiety"
                    icon-name="build-outline"
                    :onClick="goToBuySubscription"
                />
            </div>
            <div class="client_card">
                <div class="card_header">Karta rachunkowa</div>
                <div class="card_number">{{ cardNumber }}</div>
                <div class="label_card_number">Numer karty</div>
                <div class="card_valid_date">{{ cardExpirationDate.split('-')[1] }} / {{ cardExpirationDate.split('-')[0].slice(2, 4) }}</div>
                <div class="label_card_valid_date">Data ważności</div>
                <div class="card_type">Mastercard</div>
                <div class="label_card_type">Rodzaj karty</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const name = ref('');
    const surname = ref('');
    const nickname = ref('');
    const email = ref('');
    const cardNumber = ref('');
    const cardExpirationDate = ref('');

    const packages = ref([])
    const subscriptionList = ref([]);    
    const subscription = ref({});
    const nextBillingDate = ref(new Date());

    import {baseAPIURL} from '~/config/api.ts';

    onMounted(async () => {
        const userDataString = sessionStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);

            name.value = userData.name;
            surname.value = userData.surname;
            nickname.value = userData.email.split('@')[0];
            email.value = userData.email;
            cardNumber.value = userData.creditCard.number;
            cardExpirationDate.value = userData.creditCard.expirationDate;

            await nextTick();

            const {data,pending,error,refresh} = await useFetch(baseAPIURL + '/users/' + userData.id);
            console.log(data.value);
            packages.value = data.value.documents.filter((document) => {
                return (document.period === undefined)
            });
            subscriptionList.value = data.value.documents.filter((document) => {
                return !(document.period === undefined)
            });
            subscription.value = subscriptionList.value[0];
            nextBillingDate.value = new Date(subscription.value.startDate)
            nextBillingDate.value.setHours(12);
            nextBillingDate.value.setMonth(nextBillingDate.value.getMonth() + 1);
        }
    });
    const goToBuySubscription = async () => {
        await navigateTo('/buy_subscription')
    }
</script>

<style lang="scss" scoped>

.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2em;
}

.client_container {
    display: grid;
    grid-template-columns: 920px 400px;
    grid-template-rows: 2fr 5fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
}

.client_data, .but, .client_card,{
    background-color: $background600;
    padding: 20px;
    border-radius: 10px;
}

.button_return {
    background-color: $primary600;
    border-radius: 12px;
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
    font-size: 18px;
    color: $text500;
    align-self: end;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color ease-in-out 100ms;

    &:hover {
        background-color: $primary700;
    }

    &:active {
        background-color: $background500;
    }

    & > span {
        font-weight: 600;
    }
}

.client_profile {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $background500;
    grid-row: 1;
    grid-column: 1 / span 2;
    justify-self: end;
    align-self: end;

    & > div {
        margin-right: 20px;
        font-size: 30px;
        float: left;
    }

    & > img {
        width: 100px;
        height: 100px;
        border-radius: 100%;
    }
}

.client_profile > div {
    float: left;
}

.client_data {
    grid-column: 1;
    grid-row: 2;
    font-size: 30px;
    padding: 20px 40px;
    display: grid;
    grid-template-columns: 320px 500px;
    column-gap: 20px;
    justify-items: stretch;
    border: 0.1rem solid $primary500;
}

.data_header {
    margin-bottom: 30px;
}

.credential {
    grid-column: 1;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    & > span {
        font-size: 24px;
    }

    & > label {
        font-size: 15px;
    }
}

.subscriptions {
    border-left: 0.5px solid $background400;
    //border: 2px $text500 solid;
    //border-radius: 10px;
    grid-column: 2;
    grid-row: 1 / span 7;
    justify-self: stretch;
    align-self: stretch;
    row-gap: 10px;
    padding: 0 0 20px 0;
}

.subscriptions_header {
    font-size: 30px;
    padding-left: 1em;
    padding-bottom: 8px;
    //background: $primary500;
    width: 501px;
    transform: translate(-2px, -2px);
}

.balance_state {
    font-size: 20px;
    padding: 20px 32px;
    width: 460px;

    & > strong {
        font-size: 21px;
    }
}

.bundles_label {
    font-size: 14px;
    padding: 10px 32px;
    width: 460px;
}

.bundles {
    padding: 0 32px;
    width: 460px;
    margin-top: 10px;
}

.bundle {
    //background-color: #000000;
    width: 460px;
    height: 80px;
    margin-bottom: 10px;
    border-radius: 10px;
    display: flex;
    font-size: 34px;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 1px solid $primary700;
    background-color: $background700;
    box-shadow: inset 0 0 20px 4px $background800;

    &::before {
        content: '';
        position: absolute;
        border-radius: 10px;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        clip-path: polygon(0 0, 50% 0, 30% 100%, 0 100%);
    }

    & > .content {
        z-index: 1;
        text-shadow: 2px 2px 8px $background200;
    }
}

.bundle0::before {
    background: url("assets/premium-background-1.jpg") center/cover;
    filter: brightness(1.1) contrast(1.3);
}

.bundle1::before {
    background: url("assets/premium-background-2.jpg") center/cover;
    filter: brightness(1.2) contrast(1.3);
}

.bundle0 .bundle1 {
    background-color: #000;
}


.buttons {
    grid-column: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    background-color: $background500;
    flex-basis: max-content;
    gap: 30px;
    
    & > div {
        background-color: $background400;
        font-size: 22px;
        border-radius: 10px;
        flex-grow: 1;
    }
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
    font-size: 24px;
    width: 360px;
    margin-bottom: 10px;
}

.label_card_number, .label_card_valid_date, .label_card_type {
    font-size: 15px;
    width: 360px;
    margin-bottom: 40px;
}

.label_card_type {
    margin-bottom: 30px;
}

.update-card {
    background-color: $primary500;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;

    &:hover {
        background-color: $primary600;
    }

    &:active {
        background-color: $primary400;
    }
}
</style>
