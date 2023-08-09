<template>
    <md-layout  md-align="center" >
      <md-card md-with-hover style="width:400px" class="mt-30">
        <md-card-header>
          <div class="md-title" style="color:#F44336">Warning!</div>
        </md-card-header>

        <md-card-content class="mv-30">
          <div class="md-subheading mt-30 -gray-79">Please visit our Login and Password Help pages!</div>
        </md-card-content>

        <md-card-actions>
            <md-button @click="goToLogin" >
            <span class="mr-8" style="color:#F44336">GO TO LOGIN</span>
            <md-icon style="color:#F44336">keyboard_arrow_right</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>
    </md-layout>
</template>

<script>


export default {
  name: 'waring-login',
  data() {
    return {
    }
  },
  methods: {
    goToLogin(){
      this.$router.replace('/');
    }
  },
};
</script>
<style>
</style>
