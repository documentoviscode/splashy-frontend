<template>
    <div class="main-container">
        <div class="sub_form">
            <div class="header">Wybierz pakiet:</div>
            <USelectMenu
                v-model="selectedSubscription"
                :options="packagesToBuy"
                size="xl"
                color="#3770dd"
                option-attribute="name"
            />
            <div class="price">Cena: <strong id="price">{{ selectedSubscription?.price ?? 0.00 }}</strong></div>
            <div class="period">Czas: na zawsze</div>
            <div class="description" id="description"> {{ selectedSubscription?.description ?? 'Witam' }}
            </div>
            <button-component
                text="Kup pakiet"
                icon-name="build-outline"
                :onClick="buy"
            />
                <span class="buy_text">{{ buyText }}</span>
        </div>
    </div>
</template>

<script setup>
    import {baseAPIURL} from '~/config/api.ts';

    const userId = ref('');
    const buyText = ref('');
    const usersPackages = ref([])
    const packagesToBuy = ref([])

    const packages = [
    {name: 'Freezing b!ch3s', price: 99.99, description: 'Freeze !', value: 0},
    {name: 'Old but gold', price: 69.99, description: 'Olds',value: 1}
    ];

    onMounted(async () => {
        const userDataString = sessionStorage.getItem('userData')
        if(userDataString) {
            const userData = JSON.parse(userDataString);
            
            userId.value = userData.id;

            await nextTick();

            const {data,pending,error,refresh} = await useFetch(baseAPIURL + '/users/' + userData.id)
            console.log(data)
            usersPackages.value = data.value.documents.filter((document) => {
                return (document.period === undefined)
            })

            console.log(usersPackages)
            const packagesNames = usersPackages.value.map(pkg => pkg.packageType);
            console.log(packagesNames)
            packagesToBuy.value = packages.filter((p) => {
                return !packagesNames.includes(p.name);
            })
            console.log(packagesToBuy)
        }
    })
    
    const selectedSubscription = ref(packagesToBuy[0]);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = today.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // Example usage
    const currentDate = getCurrentDate();


    const buy = async () => {
        const selectedPkg = selectedSubscription.value.value;
        const {data,pending,error,refresh, status} = await useFetch(baseAPIURL + "/additionalPackages?userId=" + userId.value, {method: 'POST', body: {
            "type": "PDF",
            "creationDate": getCurrentDate(),
            "packageType": packages[selectedPkg].name,
            "price": packages[selectedPkg].price,
            "gdriveLink": "gdriveLink"
        }})
        if(status.value == 'success') {
            buyText.value = 'Zakupiono pakiet!'
        } else {
            buyText.value = 'Nie udało się zakupić pakietu!'
        }
        setTimeout(async () => {
            await navigateTo('/client_page')
        }, 2500)
    }

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

.buy_text {
    color: $secondary400;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
}
</style>
