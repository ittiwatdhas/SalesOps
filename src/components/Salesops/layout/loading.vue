<template>
  <!-- Start Progress-->
    <!-- <div style="position: absolute;z-index: 2;top: 400px;left: 35%; " v-show="show_progress">
        <md-card  class="-no-x-scroll -no-y-scroll shadow" style="background-color:#efeaea;">
            <md-card-content style="width: 500px;height: 100px;" class="ph-0 pv-0">
                <div style="margin-top: 30px;">
                <span class="md-title" style="color:#727272">Loading</span>
                </div>
                <md-progress style="background-color: #FD7F00;top: 0px;left: 40px;"  md-indeterminate></md-progress>
            </md-card-content>
        </md-card>
    </div>   -->
    <!-- <div style="position: absolute;z-index: 2; left: 0%;" > style="background-color: #FD7F00;top: 0px;"-->
        <md-progress v-show="show_progress" class="md-warn main-loading" :md-progress="1" md-indeterminate></md-progress>
    <!-- </div>   -->
<!-- End Progress -->
</template>

<script>

import Vue from 'vue'

export default {
  name: 'tripplan-loading',
  data() {
    return {
        show_progress:false,

    }
  },
  methods: {
   
  },
};
</script>
<style>
.md-progress-track, .md-progress.md-theme-default.md-indeterminate{	
	/* height: 15px!important; */
	 /* width: 418px!important;  */
}
.md-theme-default.md-progress.md-warn {
   background-color: rgba(255, 152, 0, .38)!important; 
}
.md-theme-default.md-progress.md-warn .md-progress-track:after, .md-theme-default.md-progress.md-warn .md-progress-track:before {
    background-color: #FD7F00!important; 
}
.md-card.-no-x-scroll.-no-y-scroll.shadow.md-theme-default{
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.3) !important; 
}
</style>

