<template>
    <div class="main-container">
        <div class="sub_form">
            <div class="header">Wybierz pakiet:</div>
            <USelectMenu
                v-model="selectedSubscription"
                :options="packages"
                size="xl"
                color="#3770dd"
                option-attribute="name"
            />
            <div class="price">Cena: <strong id="price">{{ price }}</strong></div>
            <div class="period">Czas: miesięcznie/na zawsze</div>
            <div class="description" id="description"> {{ description }}
            </div>
            <button-component
                text="Kup pakiet"
                icon-name="build-outline"
                :onClick="buy"
            />

        </div>
    </div>
</template>

<script setup>

    const userId = ref('');
    const description = ref('Lorem ipsum dolor sit amet');
    const price = ref('0.00 zł');

//    const packages = [
//    {name: 'Freezing b!ch3s', price: 99.99, description: 'Freeze !', value: 0},
//    {name: 'Old but gold', price: 69.99, description: 'Olds',value: 1}
//    ];

    const packages = [
    {name: 'Freezing b!ch3s', value: 0},
    {name: 'Old but gold', value: 1}
    ];



    onMounted(() => {
        const userDataString = sessionStorage.getItem('userData')
        if(userDataString) {
            const userData = JSON.parse(userDataString);
            
            userId.value = userData.id;
        }
    })
    
    const selectedSubscription = ref(packages.at(-1));

    import {baseAPIURL} from '~/config/api.ts';
    
    const buy = async () => {
        const selectedPkg = selectedSubscription.value;
//        const {data,pending,error,refresh} = await useFetch(baseAPIURL + "/additionalPackages" {method: 'POST', body: {
//            "type": "PDF",
//            "creationDate": "2023-11-11",
//            "packageType": packages[selectedPkg].name,
//            "price": packages[selectedPkg].price,
//            "gdriveLink": "gdriveLink"
//        }})
    }

    watch(selectedSubscription, () => {
        price.value = packages[selectedSubscription.value].price;
        description.value = packages[selectedSubscription.value].description;
    })




</script>

<style lang="scss" scoped>

.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sub_form {
    width: 800px;
    display: flex;
    flex-direction: column;
    align-content: stretch;
    justify-content: flex-start;
    row-gap: 40px;
    margin-top: 80px;
    padding: 40px 60px;
    background-color: $background400;
    border-radius: 10px;
}

.sub_form > div {
    width: 100%;
}

.header {
    text-align: center;
    font-size: 24px;
}

.price, .period, .description {
    font-size: 24px;
}

.sub_form > select {
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    margin: 0 160px;
    height: 30px;
}

.buy_sub {
    border-radius: 1000px;
    background-color: $primary500;
    width: 300px;
    margin: 0 auto;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
}
</style>
