<template>
    <div class="main-container">
        <div class="sub_form">
            <div class="button-container">
                <button-component
                    text="Powrót"
                    icon-name="arrow-back"
                    :on-click="navigateBack"
                />
            </div>
            <div class="header">Wybierz pakiet dodatkowy:</div>
            <USelectMenu
                v-if="!allPackagesBought"
                v-model="selectedSubscription"
                :options="packagesToBuy"
                size="xl"
                color="#3770dd"
                option-attribute="name"
            />
            <div v-if="!allPackagesBought && selectedSubscription" class="price">Cena: <strong id="price">{{ selectedSubscription?.price ?? 0.00 }} zł</strong></div>
            <div v-if="!allPackagesBought" class="period">{{ selectedSubscription?.price ? 'Ważność: na zawsze' : null }}</div>
            <div v-if="!allPackagesBought" class="description" id="description"> {{ selectedSubscription?.description ?? 'Wybierz pakiet z listy powyżej' }}</div>
            <button-component
                v-if="!allPackagesBought"
                text="Kup pakiet"
                icon-name="add-outline"
                :onClick="buy"
            />
            <transition name="fade" mode="in-out">
                <div v-if="boughtTextVisible" class="buy_text">
                    <span>{{ buyText }}</span>
                </div>
            </transition>
            <div class="all_packages_bought" v-if="allPackagesBought">
                <span>Kupiłeś wszystkie pakiety! Gratulacje 😏😏</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {baseAPIURL} from '~/config/api.ts';
    import {navigateTo} from "#app";

    const userId = ref('');
    const buyText = ref('');
    const usersPackages = ref([])
    const packagesToBuy = ref([])

    const allPackagesBought = ref(false);
    const boughtTextVisible = ref(false);

    const packages = [
        {name: 'VIP+', price: 59.99, description: 'Pakiet oferujący ponad 1000 dodatkowych streamów oraz możliwość wysyłania prywatnych wiadomości do streamerek', value: 0},
        {name: 'VIP++ PREMIUM 4K UHD', price: 229.99, description: 'Pakiet dla największych koneserów, oferujący wszystkie możliwe streamy, jakość 4k Ultra HD oraz zapisywanie streamów na prywatnym dysku',value: 1}
    ];

    onMounted(async () => {
        const userDataString = sessionStorage.getItem('userData')
        if(userDataString) {
            const userData = JSON.parse(userDataString);
            
            userId.value = userData.id;

            await nextTick();

            const {data} = await useFetch(baseAPIURL + '/users/' + userData.id);
            usersPackages.value = data.value.documents.filter((document) => {
                return (document.period === undefined)
            })

            const packagesNames = usersPackages.value.map(pkg => pkg.packageType);
            packagesToBuy.value = packages.filter((p) => {
                return !packagesNames.includes(p.name);
            })
        }
    });

    watch(packagesToBuy, () => {
        if (packagesToBuy.value.length <= 0) {
            allPackagesBought.value = true;
        }
    });
    
    const selectedSubscription = ref(packagesToBuy[0]);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = today.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

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

        boughtTextVisible.value = true;
        setTimeout(() => {
            boughtTextVisible.value = false
        }, 2000);

        setTimeout(async () => {
            await navigateTo('/client_page')
        }, 4000)
    }

    const navigateBack = async () => {
        await navigateTo('/client_page');
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
    background-color: $background600;
    border: 1px solid $primary500;
    border-radius: 10px;

    & > .all_packages_bought > span {
        font-size: 2em;
    }

    & > .button-container {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 8em;
    }
}

.sub_form > div {
    width: 100%;
}

.header {
    text-align: center;
    font-size: 30px;
}

.price, .period, .description {
    font-size: 24px;

    & > strong {
        font-size: 26px;
    }
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
    font-size: 26px;
    border-radius: 12px;
    padding: 0.5em 1em;
    border: 1px solid $secondary700;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s, transform 0.5s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: translateY(-60%);
}
</style>
