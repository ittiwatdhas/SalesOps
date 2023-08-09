<template>
  <div id="pageAccount">
    <md-layout md-gutter class="mh-0">
      <md-layout md-column md-gutter md-flex="25">
        <menu-left></menu-left>
      </md-layout>

       <md-layout md-flex="75" md-align="center" class="md-detail-body">
            <md-card md-with-hover class="setting">
              <md-card-header><span class="title">My Account</span></md-card-header>
              <md-card-content class="pb-0 mt-30 mh-80">
                <div>
                  <md-avatar class="md-avatar-icon -gray-EF _icon-status -setting"></md-avatar>
                </div>
                <md-input-container class="mt-10 mb-5">
                  <label>Username</label>
                  <md-input placeholder="Username" v-model="txt_username" disabled style="font-family: Roboto !important;"></md-input>
                  <md-icon class="mr-8">person</md-icon>
                </md-input-container>
                <md-input-container md-has-password class="mb-5">
                  <label>New Password</label>
                  <md-input type="password" v-model="txt_password" ref="newPwd" maxlength="20" style="font-family: Roboto !important;"></md-input>
                </md-input-container>
                <md-input-container md-has-password class="mb-5">
                  <label>Confirm Password</label>
                  <md-input type="password" v-model="txt_password_comfirm" ref="cfPwd" maxlength="20" style="font-family: Roboto !important;"></md-input>
                </md-input-container>
              </md-card-content>
              <md-card-actions class="mv-30">
                <md-button class="md-raised save mh-80" @click="checkPassword">
                  <span class="mr-8" style="font-family: Roboto !important;font-size:14px !important">SAVE CHANGES</span>
                </md-button>
              </md-card-actions>
            </md-card>
      </md-layout>
    </md-layout>
    <!--Stat Dialog Confirm that comment is value before close Dialog-->
    <md-dialog-confirm :md-title="comment_confirm.title" :md-content-html="comment_confirm.contentHtml" :md-ok-text="comment_confirm.ok" :md-cancel-text="comment_confirm.cancel" @open="onOpen" @close="cancel" ref="confirm_changepassword">
    </md-dialog-confirm>
    <!--End Dialog Confirm that comment is value before close Dialog-->
    <!--Start snackbar-->
      <md-snackbar :md-position="snk.vertical + ' ' + snk.horizontal" ref="snackbar" :md-duration="snk.duration">
        <span>{{snk.txt_warning}}</span>
        <md-button class="md-accent" @click="submitSnk" style="color:#FD7F00">{{snk.txt_submit}}</md-button>
      </md-snackbar>
    <!--End snackbar-->
  </div>
</template>
<script>
import Vue from 'vue'
import {mapGetters,mapActions} from 'vuex'; 
export default {
  name: 'tripplan-account',
  data() {
    return {
      txt_username : Vue.localStorage.get('emp_id'),
      txt_password:'',
      txt_password_comfirm:'',
      comment_confirm: {
        title: 'Do you want to confirm password?',
        contentHtml: 'Change password of '+ Vue.localStorage.get('emp_id') + ' username.',
        ok: 'Yes',
        cancel: 'Cancel'
      },
      snk:{
        vertical: 'top',
        horizontal: 'center',
        duration: 7000,
        txt_submit : 'Agree',
        txt_warning : '',
        mode: ''
      },
      arr_menu:[],
      check_menu:'',
    };
  },
  methods: {
    confrimPassword() {
      // this.$router.replace('/dashboard');
      // console.log("status login => ", Vue.config['authen']);
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    cancel(type) {
      if (type == "ok") {
        let obj = {
          username : this.txt_username,
          password : this.txt_password_comfirm,
          router : this.$router,
        }
      this.$store.dispatch('changePasswordService', obj );
      }
    },
    checkPassword(){
      if(this.txt_password == ''){
        this.snk.txt_warning="Please enter your new password";
				this.$refs.snackbar.open();
         this.$refs.newPwd.$el.select();
      }else if(this.txt_password_comfirm == ''){
        this.snk.txt_warning="Please enter your confirm password";
				this.$refs.snackbar.open();
        this.$refs.cfPwd.$el.select();
      }else if(this.txt_password != this.txt_password_comfirm && this.txt_password != '' && this.txt_password_comfirm != ''){
        this.snk.txt_warning="Password does not match";
				this.$refs.snackbar.open();
      }else if(this.txt_password.length < 4 && this.txt_password_comfirm.length < 4 ||
          this.txt_password == '' && this.txt_password_comfirm == ''){
          this.snk.txt_warning="Please enter your password at least 4 characters";
				  this.$refs.snackbar.open();
      }else{
        this.openDialog('confirm_changepassword');
      }
    },
    submitSnk(){
      this.$refs.snackbar.close();
    },
    onOpen() {
      // console.log('Opened');
    },

  },
  created(){
		if(Vue.localStorage.get('login') == null){
			this.login = false;
			this.$router.replace('/');
		}else{
      this.$store.dispatch("setPathMenuService" , "setting");
      // this.$store.commit('SET_SUB_PATH_MENU', []);
      this.login = true;
      this.sub_menu_setting = Vue.localStorage.get('sub_menu_setting');
      this.arr_menu=JSON.parse( this.sub_menu_setting);
		}
	},
  	components: {
		'menu-header'   : require('../Salesops/layout/menu-top'),
		'menu-left'   : require('../Salesops/layout/menu-left'),
	},
};
</script>
<style>
  .setting {
    width: 40%;
    margin-top: 3%;
  }

  .mr-8 {
    margin-right: 8px !important;
  }

  .mt-8 {
    margin-top: 8px !important;
  }

</style>