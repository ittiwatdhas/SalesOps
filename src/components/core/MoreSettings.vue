<template>
  <div class="pageAbout">
 
    <md-layout md-gutter class="mh-0">

        <md-layout md-column md-gutter md-flex="25">
        <menu-left></menu-left>
      </md-layout>

       <md-layout md-flex="70" md-align="center">
        <!-- <md-card class="mt-60" style="height:65px !important; width:200px">
            <md-card-content> -->
              <div class="md-nodata-text" style="color: #767676;padding-top:10%">
                <!-- Coming Soon!!! -->
              </div>
            <!-- </md-card-content> -->
            <!-- <img src="~@/assets/images/UnderConstruct.jpg" alt="Sale Ope" > -->
          <!-- </md-card> -->
      </md-layout>
    </md-layout>
  
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  name: 'tripplan-about',
  data() {
    return {
      msg : 'Coming Soon!',
     
    };
  },
  methods: {

  },
  created(){
		if(Vue.localStorage.get('login') == null){
			this.login = false;
			this.$router.replace('/');
		}else{
      this.$store.dispatch("setPathMenuService" , "setting");
			this.login = true;
		}
	},
  	components: {
		'menu-header'   : require('../Salesops/layout/menu-top'),
		'menu-left'   : require('../Salesops/layout/menu-left'),
	},
};
</script>
<style>

</style>