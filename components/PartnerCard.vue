<template>
    <NuxtLink :to="`/employee/partners/${partner.id}`" class="link">
        <div class="container">
            <div class="profile-picture">
                <img src="~/assets/profilePictures/streamer1.jpg" alt="profile photo" class="rounded-image">
            </div>
            <div class="name">
                {{ partner.name }} {{ partner.surname }}
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
    const { partner } = defineProps(['partner'])
</script>

<style lang="scss" scoped>
.container {
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
}
.rounded-image {
    border-radius: 50%;
}

.name {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: $text500;
    letter-spacing: 1em;
    font-size: 1em;
    font-weight: 600;
}
</style>