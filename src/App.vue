<template>
  <div id="app">
    <Boolflix />
  </div>
</template>

<script>
import Boolflix from "@/components/Boolflix.vue";

export default {
  components: {
      Boolflix
    }
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Roboto Slab', serif;
}
</style>
