<template>
    <div>
        <Navbar @search="showCards" />
        <div id="main_bool">
            <div class="title" v-if="isShowTitle">
                <h1 class="animated rollIn delay-3s">{{ title }}</h1>
            </div>
            <div id="container_cards" v-if="isShowMain">
                <Card :results="moviesResults" />
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Card from "@/components/Card.vue";

export default {
    name: "boolflix",
    components: {
        Navbar,
        Card
    },
    data() {
        return {
            title: "Boolflix",
            isShowTitle: true,
            isShowMain: false,
        }
    },
    computed: {
    // raccolgo i dati dallo store
    // I collect data from the store and assign the result to the props results
        moviesResults() { 
            return this.$store.getters["getItems"];
        }
    },
    methods: {
        // when the search starts I change the Boolean value of these properties to date
        showCards() {
            this.isShowTitle= false;
            this.isShowMain= true;
        }
    }
};
</script>

<style scoped lang="scss">
#main_bool {
    width: 100%;
    height: 100%;
    background: #1B1B1B;
    display: flex;
    .title{
        width: 70%;
        height: 100vh;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        h1{
            text-align: center;
            text-transform: uppercase;
            font-size: 150px;
            padding-bottom: 150px;
            letter-spacing: 7px;
            color: #f51505;
        }
    }
    #container_cards{
        width: 90vw;
        height: auto;
        margin: 0 auto;
    }
}
@media screen and (max-width: 830px) {
    #main_bool .title h1{
        font-size: 50px;
    }
}
</style>
