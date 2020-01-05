<template>
  <div id="cards_container">
    <div class="cards" v-for="(result, index) in results" :key="index" @click="isShowInfo(result.id)" :v-if="results.length != 0">
      <div class="card_img">
          <img :src="imgUrl + result.image" v-animate-css.click="'zoomOutLeft'"/>
      </div>
      <div class="card_info" v-if="!result.imgActive" v-show="result.media_type == 'movie'">
        <ul>
          <li>{{ result.title }}</li>
          <li>{{ result.name }}</li>
          <li>{{ result.original_title }}</li>
          <li>{{ result.media_type }}</li>
          <li><img :src="showFlagsStars[index].lang" /></li>
          <li>
            <div class="starsContainer">
              <div class="colorStars">
                <i v-for="(flagColors, index1) in showFlagsStars[index].vote" :key="index1" :class="{'fas fa-star': true, 'color': index1 <= showFlagsStars[index1].vote }"></i>
              </div>
              <div class="stars">
                <i v-for="(flag, index2) in showFlagsStars[index].stars" :key="index2" class="fas fa-star"></i>
              </div>
            </div>
          </li>
          <li>{{ result.description }}</li>
        </ul>
      </div>
    </div>
    <div id="error" else> 
      <h2>{{ error }}</h2> 
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    results: Array,
    flag: String
  },
  data() {
    return {
      imgUrl: "https://image.tmdb.org/t/p/w342",
      error: "la tua ricerca non ha prodotto risultati. riprova",
      flags: [
        {
          language: "en",
          url: "https://www.countryflags.io/GB/shiny/32.png"
        },
        {
          language: "it",
          url: "https://www.countryflags.io/IT/shiny/32.png"
        },
        {
          language: "de",
          url: "https://www.countryflags.io/DE/shiny/32.png"
        },
        {
          language: "fr",
          url: "https://www.countryflags.io/FR/shiny/32.png"
        },
        {
          language: "es",
          url: "https://www.countryflags.io/ES/shiny/32.png"
        },
        {
          language: "jp",
          url: "https://www.countryflags.io/JP/shiny/32.png"
        }
      ]
    };
  },
  computed: {
    // racconlo i dati dallo items nello store e assegno ad ogniuno la bandiera e le stelle con delle funzioni
    // collect the data from the items in the store and assign each one the flag and the stars with functions
    showFlagsStars() {
      var toRetStore = this.$store.state.items.map(item => {
        return {
          lang: this.checkLanguage(item.original_language),
          vote: this.colorStars(item.popularity),
          stars: this.stars(this.colorStars(item.popularity))
        };
      });
      return toRetStore;
    }
  },
  methods: {
    // al click sulla card cambio il valore booleano della propietà imgActive
    // when I click on the card I change the Boolean value of the imgActive property
    isShowInfo(res) {
      var toRet = this.$store.getters["findItem"](parseInt(res));
      return (toRet.imgActive = !toRet.imgActive);
    },
    // uso questa funzione per assegnare la bandiera giusta in base alla lingua
    // I use this function to assign the right flag according to the language
    checkLanguage(str) {
      for (var i = 0; i < this.flags.length; i++) {
        if (this.flags[i].language == str) {
          return this.flags[i].url;
        }
      }
    },
    // uso questa funzione per verificare le stelle da colorare in base al voto
    // use this feature to check the coloring stars by rating
    colorStars(num) {
      var numStars = (num * 5) / 10;
      return Math.floor(numStars);
    },
    // uso questa funzione per verificare le stelle rimanenti da non colorare
    // use this function to check the remaining stars not to be colored
    stars(num) {
      var numStars = parseInt(5) - parseInt(num);
      return numStars;
    }
  }
};
</script>

<style scoped lang="scss">
#cards_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  .cards {
    width: 342px;
    height: 513px;
    margin: 15px;
    position: relative;
    .card_img {
      width: 100%;
      height: 100%;
      overflow: hidden;
      &:hover {
        transform: translateY(-10%) scale(1, 1);
      }
    }
    .card_info {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 20px;
      background-color: rgba(0, 0, 0, 0.9);
      position: absolute;
      top: 0;
      & ul li {
        list-style: none;
        color: white;
        font-weight: bold;
      }
      & .color {
        color: yellow;
      }
      & .starsContainer {
        width: 100px;
        height: 40px;
        display: flex;
        margin: 0 auto;
        .colorStars {
          width: auto;
          height: 100%;
          display: flex;
          justify-content: flex-end;
        }
        .stars {
          width: auto;
          height: 100%;
          display: flex;
          justify-content: flex-start;
        }
      }
    }
  }
  #error {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 40px;
    color: #f51505;
  }
}
@media screen and (max-width: 830px) {
  #cards_container {
    width: 100%;
    height: 100%;
    padding: 0;
    .cards {
      width: 100%;
    }
  }
}
</style>
