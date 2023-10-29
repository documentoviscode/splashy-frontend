<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "profileCard"
})
</script>

<template>
    <div class="container">
        <div class="header">
            <div class="name">
                <div class="nick">
                    <span>belledelphine97_</span>
                    <img src="@/assets/verified-icon.png" alt="verified icon">
                </div>
                <span class="fullname">Belle Delphine</span>
            </div>
            <div class="profile-pic">
                <img src="~/assets/streamer-profile-pic.jpg" alt="profile picture">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

    .container {
        display: flex;
        flex: 1;
        width: 100%;
    }

    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        justify-content: space-between;
    }

    .name {
        display: flex;
        flex-direction: column;
        row-gap: 1em;

        & > .nick {
            font-size: 2.8em;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.6em;

            & > img {
                width: 36px;
                filter: brightness(1.2);
            }
        }

        & > .fullname {
            font-size: 1.8em;
        }
    }

    .profile-pic {
        display: flex;
        align-items: center;
        justify-content: center;

        & > img {
            width: 70%;
            border-radius: 200em;
        }
    }

</style>