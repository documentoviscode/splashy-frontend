<template>
    <div class="main-container">
        <div class="header">
            <nuxt-link class="home" to="/">
                <img src="~/assets/splashyTV-logo-transparent-light.png" alt="logo" @click="">
            </nuxt-link>
            <h1>Panel pracownika</h1>
        </div>
        <div class="content">
            <div class="partners-cards">
                <div v-for="p in partners">
                    <PartnerCard :partner="p" />
                </div>
            </div>
        </div>
        <div class="footer">
            <span>&copy; Documentovisco 2023</span>
        </div>
    </div>
</template>

<script setup>
import {baseAPIURL} from '../../../config/api.ts';

const {data,pending,error,refresh} = await useFetch(baseAPIURL + "/partners");
    const partners = ref([]);
   
    onMounted(() => {
        partners.value = data.value;

        partners.value.forEach(partner => {
            partner['contract'] = partner.documents.filter((document) => {
                return (document.rate !== undefined);
            }).sort((item1, item2) => {
                const date1 = new Date(item1.endDate);
                const date2 = new Date(item2.endDate);

                return date1 > date2;
            }).at(-1);
        });
    });

</script>

<style lang="scss" scoped>
    .main-container {
        display: flex;
        flex-direction: column;
        font-family: Lato, Helvetica Neue, Noto Sans, sans-serif;
        height: 100vh;
    }
    .header {
            display: flex;
            align-items: center;
            background-color: $primary600;

            & > .home {
                & > img {
                    width: 5em;
                    margin-left: 1em;
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

    .footer {
        display: flex;
        flex-direction: column;
        background-color: $background600;
        padding: 2em 4em;

        & > span {
            align-self: flex-end;
            font-weight: 300;
            color: $background300;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        align-self: center;
        flex: 1;
        width: 100%;
        max-width: 800px;
        padding: 2em 0 4em;

        & > span {
            font-size: 1.6em;
            font-weight: 500;
        }
    }

    .filtering-form {
        background-color: $background400;
        display: flex;
        flex-direction: column;
        padding: 1em;
        margin: 2em 5em;
        height: fit-content;
        flex: 1;
    }

    .form-input {
        padding: 0.6em;
        margin: 0.8em auto;
        color: black;
    }

    .partners-cards {
        display: flex;
        flex-direction: column;
        gap: 2em;
        flex: 3;
    }

</style>
