<template>
    <div>
        <img src="~/assets/documentovisco-transparent-light.png" alt="logo" class="center">
        <form @submit.prevent="handleSubmit">
            <label>Zaloguj się za pomocą adresu e-mail</label>
            <input v-model="email" type="email" required>
            <span v-if="wrongEmail">Błędny adres E-mail</span>

            <button>Zaloguj</button>
        </form>
        <div class="partner-link">
            <span>WIP</span>
            <div>
                <button-component
                    text="Podstrona klienta"
                    icon-name="person-outline"
                    :on-click="() => {email = 'ernest.kolodziej@gmail.com'}"
                />
            </div>
            <div>
                <button-component
                    text="Podstrona partnera"
                    icon-name="headset-outline"
                    :on-click="() => {email = 'alicja.wroblewska@wp.pl'}"
                />
            </div>
            <div>
                <button-component
                    text="Podstrona admina"
                    icon-name="build-outline"
                    :on-click="() => {email = 'cezary.krawczyk@gmail.com'}"
                />
            </div>
        </div>
    </div>
</template>

<script setup>

import { baseAPIURL } from '~/config/api.ts';

const email = ref('');

const wrongEmail = ref(false);

onMounted(() => {
    sessionStorage.clear();
});

async function handleSubmit () {

    const { data } = await useFetch(baseAPIURL + '/users');

    const users = data.value;
    const matchingUsers = users.filter(user => user.email.toLowerCase() == email.value.toLowerCase());

    if (matchingUsers.length == 0) {
        wrongEmail.value = true;
        return;
    }

    const currentUser = matchingUsers[0];
    sessionStorage.setItem("userData", JSON.stringify(currentUser));
    wrongEmail.value = false;

    if (currentUser.role == "ADMIN") {
        await navigateTo('/employee');
    }
    
    if (currentUser.role == "PARTNER") {
        await navigateTo('/partner');
    }

    if (currentUser.role == "CLIENT") {
        await navigateTo('/client_page');
    }
}

</script>

<style lang="scss" scoped>
form {
    max-width: 420px;
    margin: 30px auto;
    text-align: center;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > span {
        color: $error500;
        font-size: 16;
        font-weight: 600;
    }
}
label {
    display: inline-block;
    margin: 10px auto;
}
input {
    display: block;
    box-sizing: border-box;
    width: 80%;
    margin: 10px auto;
    border-radius: 20px;
    padding: 5px 1em;
}
button {
    background: $primary500;
    border: 0;
    padding: 10px 50px;
    margin-top: 30px;
    color: $text500;
    border-radius: 20px;
    cursor: pointer;
}
button:hover {
    background-color: $primary600;
}
.partner-link {
    display: flex;
    flex-direction: column;
    row-gap: 1.2em;
    align-items: center;
    justify-content: center;
    font-family: Lato, Helvetica Neue, Noto Sans, sans-serif;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 420px;
}
</style>
