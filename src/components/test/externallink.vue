<template>
  <div class="d-flex justify-content-around" style="padding:20px" v-if="redirect()">
    <div>
      <h3>This Vue Component Does a Basic Redirect</h3>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  methods: {
    redirect() {
      // var url = "https://www.google.com";
      var url = Vue.config["urlMkt"];
      window.open(url, "_target");
      // this.$router.push({ path: this.$store.getters.last_menu});
      this.$router.push({ path: "/reports/mkt/report"});
    }
  }
};
</script>
    
<style>
</style>