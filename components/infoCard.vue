<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "test",
    props: {
        data: String,
        iconName: {
            required: true,
            type: String,
        },
        caption: String,
    }
});


</script>

<template>
    <div class="container">
        <div class="top">
            <span>{{ data }}</span>
        </div>
        <div class="bottom">
            <Icon :name="'ion:' + iconName" size="18"/>
            <span>{{ caption }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">

.container {
    background-color: $background600;
    padding: 2em 2.4em;
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.8em;
    border-radius: 12px;
    border: $primary500 0.2px solid;
    box-shadow: 4px 4px 12px 0 $background800;
}

.top {
    font-size: 1.7em;
    font-weight: 600;
}

.bottom {
    display: flex;
    align-items: center;
    gap: 0.4em;
    font-size: 1.2em;
}

</style>