<template>
    <div>
        <img src="~/assets/logo.png" alt="logo" class="center">
        <form @submit.prevent="handleSubmit">
            <label>Zaloguj się za pomocą adresu e-mail</label>
            <input type="email" required>

            <button>Zaloguj</button>
        </form>
        <div class="partner-link">
            <span>WIP</span>
            <nuxt-link to="/partner">Podstrona partnera</nuxt-link>
        </div>
    </div>
</template>

<script setup>
async function handleSubmit () {
    console.log("SUBMITTED!!")
}
</script>

<style lang="scss" scoped>
form {
    max-width: 420px;
    margin: 30px auto;
    text-align: center;
    padding: 40px;
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
    padding: 5px 5px;
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
    flex: 1;
    align-items: center;
    justify-content: center;
    font-family: Lato, Helvetica Neue, Noto Sans, sans-serif;

    & > a {
        text-decoration: none;
        color: inherit;

    }

    & > span {
        font-weight: 600;
        font-size: 1.2em;
    }
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 420px;
}
</style>