<template>
  <div class="pageTest">
    pageTest
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  name: 'tripplan-test',
  data() {
    return {
     
     
    };
  },
  methods: {

  },
  created(){
		if(Vue.localStorage.get('login') == null){
			this.login = false;
			this.$router.replace('/');
		}else{
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