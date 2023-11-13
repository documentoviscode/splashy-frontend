<template>
    <div @click="navToPartner" class="link">
        <div class="partners-container">
            <div class="profile-picture">
                <img :src="`/profilePictures/${partner.avatar}`" alt="profile photo" class="rounded-image">
            </div>
            <div class="name-container">
                <div class="name">
                    {{ partner.name }} {{ partner.surname }}
                </div>
                <div class="buttons" v-if="contractExtensionInProgress">
                    <span>Czy umowa wymaga zmian?</span>
                    <div>
                        <button-component
                            text="Tak - edytuj umowę"
                            icon-name="create-outline"
                            class="button"
                            :on-click="navToPartner"
                        />
                        <button-component
                            text="Nie - wyślij ofertę do klienta"
                            icon-name="checkbox-outline"
                            color="#2056bd"
                            class="button"
                            :on-click="sendOffer"
                        />
                    </div>
                    <span class="sent" v-if="extendContractTextVisible">Wysłano ofertę do klienta</span>
                </div>


                <div v-if="contractExtensionInProgress" class="notification-text">
                    <span>Prośba o przedłużenie umowy</span>
                </div>
                <div class="notification" v-if="contractExtensionInProgress">
                    <Icon class="icon" name="ion:notifications-outline" size="30"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {baseAPIURL} from "../config/api.ts";
    import {navigateTo} from "#app";

    const { partner } = defineProps(['partner']);

    const contractExtensionInProgress = ref(partner.contract.contractExtensionInProgress && !partner.contract?.contractExtensionOfferVisible);
    const extendContractTextVisible = ref(false);

    const sendOffer = async () => {
        extendContractTextVisible.value = true;

        setTimeout(() => {extendContractTextVisible.value = false}, 3000);

        useFetch(baseAPIURL + `/tasks/adminReview/true`,  {method: 'POST'});

        partner.contract.value['contractExtensionOfferVisible'] = true;
    }

    const navToPartner = async () => {
        await navigateTo(`/employee/partners/${partner.id}`);
    }

</script>

<style lang="scss" scoped>
.partners-container {
    background-color: $background400;
    display: flex;
    flex-direction: row;
    padding: 1em 2em;
    gap: 3em;
    text-decoration: none;
    border-radius: 2em;
    border: 0.1em solid $primary500;
    box-shadow: 4px 4px 12px 0 $background800;
}
.profile-picture {
    align-self: center;

    & > img {
        border-radius: 50%;
        width: 8em;
    }
}

.link {
    &:hover {
        cursor: pointer;
    }
}

.name-container {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;

    & > .name {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: $text500;
        font-size: 2em;
        font-weight: 500;
    }

    & > .buttons {
        display: flex;
        flex-direction: column;
        margin-top: 1em;

        & > span {
            margin-bottom: 0.4em;
        }

        & > div {
            display: flex;
            gap: 0.6em;
            height: 3em;
        }

        & > .sent {
            font-size: 1.2em;
            color: $secondary400;
            margin-top: 1.4em;
        }
    }
}

.notification {
    position: absolute;
    width: 2.4em;
    height: 2.4em;
    background-color: $error500;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.notification-text {
    position: absolute;
    top: 0;
    right: 3em;
    height: 2.4em;
    display: flex;
    align-items: center;

    & > span {
        font-size: 0.8em;
    }
}

</style>