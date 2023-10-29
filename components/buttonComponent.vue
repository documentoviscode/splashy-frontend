<script lang="ts">
    import {defineComponent} from 'vue'

    export default defineComponent({
        name: "buttonComponent",
        props: {
            iconName: {
                type: String,
                required: false,
            },
            text: {
                type: String,
                required: true,
            },
            color: {
                type: String,
                default: '#3770dd',
            },
            onClick: {
                type: Function,
                required: false
            }
        },
    });

</script>

<template>
    <div class="container" :style="{ backgroundColor: color }" @click="onClick">
        <Icon class="icon" v-if="iconName" :name="`ion:${iconName}`" size="21"/>
        <span>{{ text }}</span>
    </div>
</template>

<style scoped lang="scss">
    .container {
        padding: 0.8em 1.2em;
        display: inline-flex;
        align-items: center;
        border-radius: 20px;

        & > span {
            font-weight: 700;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        & > .icon {
            margin-right: 0.4em;
        }

        transition: 0.1s ease-in-out;

        &:hover {
            filter: brightness(0.85);
        }

        &:active {
            filter:brightness(0.75);
        }
    }
</style>