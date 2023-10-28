<template>
    <div>
        <img src="~/assets/logo.png" alt="logo" class="center">
        <form>
            <label>Zaloguj się za pomocą adresu e-mail</label>
            <input type="email" required>

            <button>Zaloguj</button>
        </form>
    </div>
</template>

<script setup>
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
}
button {
    background: $primary500;
    border: 0;
    padding: 10px 50px;
    margin-top: 20px;
    color: $text500;
    border-radius: 20px;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 420px;
}
</style>