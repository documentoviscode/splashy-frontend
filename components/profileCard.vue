<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "profileCard",
    props: {
        nickname: {
            required: true,
            type: String,
        },
        fullName: {
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        profilePictureFile: {
            type: String,
        },
    },
})
</script>

<template>
    <div class="container">
        <div class="header">
            <div class="name">
                <div class="nick">
                    <span v-if="nickname.length < 20" class="short-nick">{{ nickname }}</span>
                    <span v-if="nickname.length >= 20" class="long-nick">{{ nickname }}</span>
                    <img v-if="verified" src="@/assets/verified-icon.png" alt="verified icon">
                </div>
                <span class="fullname">{{ fullName }}</span>
            </div>
            <div class="profile-pic">
                <img :src="`/profilePictures/${profilePictureFile}`" alt="profile picture">
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
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.6em;
            
            & > .short-nick {
            font-size: 2.8em;
            }

            & > .long-nick {
                font-size: 2em;
            }

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
            width: 12em;
            border-radius: 200em;
        }
    }

</style>