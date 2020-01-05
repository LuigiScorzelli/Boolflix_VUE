<template>
    <div id="nav">
        <div class="nav_container">
            <div class="nav_left">
                <h2 v-animate-css.hover="'lightSpeedIn'">{{ title }}</h2>
            </div>
            <div class="nav_rigth">
                <input v-model="userInput" type="text" :placeholder="alertPlaceholderString" v-on:keyup.13="show"/>
                <button type="button" @click="show()"> Cerca </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "navbar",
    data () {
        return {
            title: "Boolflix",
            userInput: "",
            alertPlaceholderString: "Inserisci un titolo da ricercare"
        }
    },
    methods: {
        //emetto handler click  al click del button 
        // I issue a handler click at the click of the button and call the function that will do the search with an API call from the strore
        show(){      
        if(this.userInput.length != 0) {
            this.$emit("search");
            this.search(this.userInput);
            this.userInput = "";
        } else {
            alert(this.alertPlaceholderString);
        }
        },
        search(str) {
          return this.$store.dispatch("find", str);
        }
    }
}
</script>

<style scoped lang="scss">
#nav {
    width: 100%;
    height: 8vh;
    background: #1B1B1B;
    .nav_container {
        width: 70%;
        height: 100%;
        display: flex;
        margin: 0 auto;
    }
    .nav_left {
        width: 40%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        h2 {
            text-transform: uppercase;
            font-size: 50px;
            color: #f51505;
        }
    }
    .nav_rigth {
        width: 60%;
        height: 100%;
        line-height: 8vh;
        input {
            width: 250px;
            height: 30px;
            outline: none;
            border-style: none;
            background: #1B1B1B;
            border: 2px solid #efefef;
            margin-top: 3px;
            margin-right: 10px;
            border-radius: 2px;
            color: #efefef;
            padding: 5px;
            font-size: 15px;
        }
        button {
            width: 80px;
            height: 25px;
            border-radius: 5px;
            border-style: none;
            outline: none;
            cursor: pointer;
            background: #efefef;
            font-size: 15px;
            transition: all 0.5s ease;
        }
        button:hover{
            background-color: #ffda70;
        }
    }
}
@media screen and (max-width: 830px) {
#nav {
    width: 100%;
    height: 80px;
    .nav_container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .nav_left {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            h2 {
                text-transform: uppercase;
                font-size: 30px;
                }
            }
        .nav_rigth{
            width: 100%;
            height: 100%;
            input{
                width: 200px;
                height: 25px;
                outline: none;
                border-style: none;
                background: #1B1B1B;
                border: 1px solid #efefef;
                margin-top: 5px;
                margin-right: 10px;
                border-radius: 2px;
                color: #efefef;
                padding: 1px;
                font-size: 12px;
                }
            button {
                width: 60px;
                height: 20px;
                font-size: 12px;
                }
            }
        }
    }
}
</style>
