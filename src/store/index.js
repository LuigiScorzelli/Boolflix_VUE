import Vue from "vue";
import Vuex from "vuex";
import httpClient from "../api/httpClient";
import VAnimateCss from 'v-animate-css';

Vue.use(VAnimateCss);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: null,
    urlAjax: 'https://api.themoviedb.org/3/search/multi',
    api_key: '63c4b4876efa837dcfb06a6ff46ab59f',
    language: 'it-IT'
  },
  // uso una mutations per riempire l'array items nello store
  // use a mutations to fill the array items in the store
  mutations: {
    setItems (state, results) {
      state.items = results;
    },
  },
  getters: {
    getItems(state) {
      return state.items;
    },
    findItem: state => id => {
      return state.items.find(item => {
        return item.id === id;
      });
    }
  },
  actions: {
    // invio la chiamata ajax e con context.commit richiamo la mutations "setItems"
    // send the ajax call and with context.commit I call the mutations "setItems"
    async find (context, src) {
      var resultsGetApi = [];
      var response = await httpClient.getRequest(this.state.urlAjax, 
          {
            api_key : this.state.api_key,
            language : this.state.language,
            query : src,
          }
        );
        // variabilizzo la risposta della chiamata e modifico l'oggetto
        // vary the answer of the call and modify the object
        var res = response.data;
        for(var i = 0; i < res.results.length; i++) {
          if(res.results[i].poster_path != undefined) {
            var dataResultItems = {
              id: res.results[i].id,
              image: res.results[i].poster_path,
              media_type: res.results[i].media_type,
              title: res.results[i].title,
              name: res.results[i].name,
              original_title: res.results[i].original_title,
              original_language: res.results[i].original_language,
              popularity: res.results[i].vote_average,
              description: res.results[i].overview,
              imgActive: true,
              infoActive: false
            }
          }
          resultsGetApi.push(dataResultItems);
        } 
      context.commit("setItems", resultsGetApi);
    }
  }
});
