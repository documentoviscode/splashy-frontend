<template>
    <div>
        <img src="~/assets/documentovisco-transparent-light.png" alt="logo" class="center">
        <form @submit.prevent="handleSubmit">
            <label>Zaloguj się za pomocą adresu e-mail</label>
            <input type="email" required>

            <button>Zaloguj</button>
        </form>
        <div class="partner-link">
            <span>WIP</span>
            <nuxt-link to="/client_page">
                <button-component
                    text="Podstrona klienta"
                    icon-name="person-outline"
                />
            </nuxt-link>
            <nuxt-link to="/partner">
                <button-component
                    text="Podstrona partnera"
                    icon-name="headset-outline"
                />
            </nuxt-link>
            <nuxt-link to="/employee">
                <button-component
                    text="Podstrona admina"
                    icon-name="build-outline"
                />
            </nuxt-link>
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
    row-gap: 1em;
    align-items: center;
    justify-content: center;
    font-family: Lato, Helvetica Neue, Noto Sans, sans-serif;

    & > div {
        background-color: $primary500;
        border-radius: 4em;
        padding: 10px 20px;
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
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 420px;
}
</style>