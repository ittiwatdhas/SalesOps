<template >
  <div id="app" class="mv-0">
    <div id="noti_Container" class="noti_Container">
      <!--THE NOTIFICAIONS DROPDOWN BOX.-->
      <div
        id="notifications"
        ref="notifications"
        v-show="show_panel"
        v-click-outside="outsidePanel"
      >
        <div class="md-layout" style="height:52px">
          <div class="md-layout-item" style="width:140px;">
            <div
              class="spinner-activity"
              id="divLoader"
              style="float:left;margin-left:25px;margin-top:20px"
            >
              <md-spinner
                :md-size="30"
                :md-stroke="3"
                v-show="loading_notification"
                md-indeterminate
              ></md-spinner>
            </div>
          </div>
          <div class="md-layout-item" style="width:140px;">
            <h3 style="margin-top:20px;">Notifications</h3>
          </div>
          <div class="md-layout-item" style="width:140px;" align="right">
            <md-switch
              class="md-primary"
              v-model="on_notification"
              style="margin-top:23px;margin-right:15px;"
              @change="switchCheck"
            ></md-switch>
            <md-tooltip md-direction="top" class="latoFont">Delete all</md-tooltip>
            <a
              href="javascript:void(0);"
              style="padding:0px;"
              alt="delte"
              titile="delete"
              @click="delete_all_message()"
            >
              <md-icon
                class="clear_all"
                style="padding-top:18px;float:right;margin-right:10px;"
              >clear_all</md-icon>
            </a>
          </div>
        </div>

        <!-- <md-icon>list</md-icon> -->

        <div class="contain" @scroll="handleScroll">
          <div
            class="not-found-data"
            v-if="!newf_notification.data || newf_notification.data.length == 0"
          >Not Notification</div>
          <a
            href="javascript:void(0);"
            style="padding:0px;text-decoration: none;"
            v-for="(item, index) in newf_notification.data"
            @click="read_message(item.id, item.module_abbrev,item.noti_type , index, $event)"
            :key="index"
            v-if="newf_notification.data && newf_notification.data.length > 0"
          >
            <div style="width: 400px;">
              <div class="items md-layout" :class="getClass(item.status_readed)">
                <div class="md-layout-item" style="width:50px;">
                  <md-icon class="icon" v-if="item.noti_type=='L'">thumb_up</md-icon>
                  <md-icon class="icon" v-if="item.noti_type=='C'">comment</md-icon>
                  <md-icon class="icon flips" v-if="item.noti_type=='S'">reply</md-icon>
                  <md-icon class="icon" v-if="item.noti_type=='REJ'">remove_circle</md-icon>
                  <md-icon class="icon" v-if="item.noti_type=='APV'">check_circle</md-icon>
                  <md-icon class="icon" v-if="item.noti_type=='WFA'">send</md-icon>
                  <md-icon class="icon" v-if="item.noti_type=='FWD'">send</md-icon>
                  <md-icon class="icon" v-if="item.noti_type=='REC'">replay</md-icon>
                </div>
                <div
                  class="descript"
                  align="left"
                  style="width: 280px; overflow:hidden; white-space: nowrap; text-overflow: ellipsis;font-family:kanit;padding-top:2px"
                >
                  <span class="message">
                    <b>{{item.sender_name}}</b>
                    <!-- <div style="width: 1000px;white-space: nowrap;"> -->
                    <span class="message" v-if="item.noti_type=='L'">likes on your post.</span>
                    <span
                      class="message"
                      v-if="item.noti_type=='C' && item.module_abbrev == 'NF'"
                    >commented on your post.</span>
                    <span class="message" v-if="item.noti_type=='S'">shared on your post.</span>
                    <span
                      class="message"
                      v-if="item.noti_type=='WFA'"
                    >send PO.NO.{{item.ref_no}} to {{item.receiver_name}}</span>
                    <span
                      class="message"
                      v-if="item.noti_type=='REJ'"
                    >rejected on PO.NO.{{item.ref_no}}</span>
                    <span
                      class="message"
                      v-if="item.noti_type=='APV'"
                    >approved on PO.NO.{{item.ref_no}}</span>
                    <span
                      class="message"
                      v-if="item.noti_type=='FWD'"
                    >send PO.NO.{{item.ref_no}} to {{item.receiver_name}}</span>
                    <span
                      class="message"
                      v-if="item.noti_type=='REC'"
                    >recalled PO.NO.{{item.ref_no}}</span>
                    <span
                      class="message"
                      v-if="item.noti_type=='C' && item.module_abbrev == 'ODR'"
                    >commented on PO.NO.{{item.ref_no}}</span>
                    <!-- </div> -->
                  </span>
                  <md-tooltip md-direction="top">
                    <span class="message">
                      <b>{{item.sender_name}}</b>
                      <span v-if="item.noti_type=='L'">likes on your post.</span>
                      <span
                        v-if="item.noti_type=='C' && item.module_abbrev == 'NF'"
                      >commented on your post.</span>
                      <span v-if="item.noti_type=='S'">shared on your post.</span>
                      <span
                        v-if="item.noti_type=='WFA'"
                      >send PO.NO.{{item.ref_no}} to {{item.receiver_name}}</span>
                      <!--to {{item.receiver_name}} -->
                      <span v-if="item.noti_type=='APV'">approved on PO.NO.{{item.ref_no}}</span>
                      <span v-if="item.noti_type=='REJ'">rejected on PO.NO.{{item.ref_no}}</span>
                      <span
                        v-if="item.noti_type=='FWD'"
                      >send PO.NO.{{item.ref_no}} to {{item.receiver_name}}</span>
                      <span v-if="item.noti_type=='REC'">recalled PO.NO.{{item.ref_no}}</span>
                      <span
                        v-if="item.noti_type=='C' && item.module_abbrev == 'ODR'"
                        class="text-line"
                      >commented on PO.NO.{{item.ref_no}}</span>
                    </span>
                  </md-tooltip>
                </div>
                <div class="md-layout-item" style="width:70px;display:block;" align="right">
                  <div class="close" style="margin-top:5px;">
                    <a
                      href="javascript:void(0);"
                      style="padding:0px;"
                      @click="delete_message(item.id,index, $event)"
                    >
                      <md-icon>close</md-icon>
                    </a>
                  </div>
                  <div class="times" :title="convert_time(item.date)">{{timeAgo(item.date)}}</div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <!-- <div class="seeAll"><a href="#">See All</a></div> -->
      </div>
    </div>

    <menu-header v-if="status_login"></menu-header>
    <sub-menu v-if="status_login"></sub-menu>
    <router-view></router-view>
    <back-to-top text="Back to top" visibleOffset="100"></back-to-top>

    <!-- <md-dialog-confirm 
        :md-title="delete_title" 
        :md-content-html="delete_content" 
        :md-ok-text="OK" 
        :md-cancel-text="Cancel" 
        @open="onOpen" 
        @close="onSave" ref="dlgsave">
    </md-dialog-confirm>-->
  </div>
</template>


<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

import BackToTop from "@/components/Salesops/fullBackToTop/BackToTop";

//import vuefire from 'vuefire';
// import firebase from "firebase";
//import VueTimeago from 'vue-timeago'

// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyCPoSBua03ucMuZMNA0ERyqVWM7TFII3pg",
//   authDomain: "checkin-c8308.firebaseapp.com",
//   databaseURL: "https://checkin-c8308.firebaseio.com",
//   projectId: "checkin-c8308",
//   storageBucket: "checkin-c8308.appspot.com",
//   messagingSenderId: "568572886518",
//   appId: "appid",
//   measurementId: ""
// };

// firebase.initializeApp(config);

// Retrieve Firebase Messaging object.
// const messaging = firebase.messaging();

export default {
  name: "app",
  components: {
    BackToTop,
    "menu-header": require("@/components/Salesops/layout/menu-top"),
    "sub-menu": require("@/components/Salesops/layout/sub-menu")
  },
  computed: {
    ...mapGetters({
      status_login: "status_login",
      sub_path_menu: "sub_path_menu",
      newf_notification: "newf_notification",
      newf_last_notification_id: "newf_last_notification_id"
    })
  },
  // firebase: {
  //   messages() {
  //     console.log("firebase message test");
  //   }
  // },
  methods: {
    ...mapActions([
      "setPathMenuService",
      "setMasterNotification",
      "getNewsfeedService",
      "getNewsfeedByIDService"
    ]),
    test(p) {
      //alert('test');
      console.log(p);
    },
    delete_item() {
      this.openDialog("dlgsave");
      return;
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {},
    onSave(type) {
      if (type == "ok") {
        alert("save");
        // let obj = {
        //   detail: this.post_massage,
        //   link_path: this.image_arr
        // };
        // this.$store.dispatch("savePostNewsfService", obj);
        // this.closeDialog("newPost");
      }
    },

    read_message(id, type, noti_type, index, e) {
      e.stopPropagation();
      this.loading_notification = true;
      this.$http
        .get(Vue.config["url"] + "/read-msg-noti/" + id, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(
          function(data) {
            // this.show_progress = false;
            var data = data.body.success.data[0];
            //this.$store.commit('REMOVE_NEWF_NOTIFICATION', index);

            //console.log(data.ref_id);
            var ref_id = 0;

            if (data.ref_id != null) {
              ref_id = data.ref_id;
            }

            this.$store.commit("UPDATE_NEWF_NOTIFICATION", index);
            this.loading_notification = false;
            if (type == "NF") {
              this.$store.commit("SET_NEWF_FIRST_POST_ID", ref_id);
              //this.$store.dispatch("getNewsfeedByIDService",  data.ref_id).then(() => {

              //this.$router.push('/activity/newsfeed');

              if (this.$router.history.current.path == "/activity/newsfeed") {
                //Vue.localStorage.set('firs_post_id', data.ref_id);
                this.$store.commit("CLEAR_NEWF_DATA", []);
                //this.$router.push('/activity/newsfeed');

                //this.$store.dispatch("getNewsfeedService", Vue.localStorage.get('emp_id'));
                //window.location();
                //Vue.localStorage.('newf_first_post_id', data.ref_id)
                //console.log("---->");
                var group_emp_id = Vue.localStorage.get("group_emp_id");

                this.$store.dispatch("getNewsfeedService", group_emp_id);

                //this.$router.push('/activity/newsfeed');
                //});
              } else {
                this.$router.push("/activity/newsfeed");
              }
            } else if (type == "ODR") {
              this.$store.commit("SET_SELECT_MENU", "orders");
              //  this.$store.commit("SET_NOTI_EVENT", {doc_no:ref_id, status : "noti" , type: data.noti_type});
              this.$store.commit("myorders/SET_NOTI_EVENT", {
                doc_no: ref_id,
                status: true,
                noti_type: data.noti_type,
                type: type
              });
              var department = Vue.localStorage.get("department");
              if (department == "SM") {
                if (this.$router.history.current.path == "/orders/myorders") {
                  this.$router.push("/orders/myorders/view/" + ref_id);
                } else {
                  this.$router.push("/orders/myorders");
                }
              } else {
                // if(noti_type == 'REJ'){
                if (noti_type == "REC" || noti_type == "WFA") {
                  if (this.$router.history.current.path == "/orders/approval") {
                    this.$router.push("/orders/approval/view/" + ref_id);
                  } else if (
                    this.$router.history.current.path == "/orders/myorders"
                  ) {
                    this.$router.push("/orders/approval/view/" + ref_id);
                  } else {
                    this.$router.push("/orders/approval");
                  }
                } else {
                  if (this.$router.history.current.path == "/orders/myorders") {
                    this.$router.push("/orders/myorders/view/" + ref_id);
                  } else if (
                    this.$router.history.current.path == "/orders/approval"
                  ) {
                    this.$router.push("/orders/myorders/view/" + ref_id);
                  } else {
                    this.$router.push("/orders/myorders");
                    // this.$store.commit("SET_SELECT_MENU", "orders");
                  }
                }
              }
              // this.$router.push("/orders/myorders");
            }

            var x = document.getElementById("notifications");
            x.style.display = "none";
            // console.log(this.$router.history.current);

            //this.$store.dispatch("getNewsfeedOnScroll");

            //this.$store.dispatch("getNewsfeedService",
            //});

            //saleNewsfeed.getNewsfeedService();
            // dispatch('getNewsfeedService', Vue.localStorage.get("emp_id"))
            //this.$stat
            // location.reload();
          },
          response => {
            // this.snk.txt_warning = "getPlanOfDate";
            // this.$refs.snackbar.open();
          }
        );
    },

    delete_message(id, index, e) {
      e.stopPropagation();
      this.loading_notification = true;
      this.$http
        .get(Vue.config["url"] + "/del-msg-noti/" + id, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(
          function(data) {
            // this.show_progress = false;
            // this.events = data.body.success.data;
            this.$store.commit("REMOVE_NEWF_NOTIFICATION", index);
            this.loading_notification = false;
          },
          response => {
            // this.snk.txt_warning = "getPlanOfDate";
            // this.$refs.snackbar.open();
          }
        );
    },

    delete_all_message() {
      console.log("delete all message");
      this.loading_notification = true;
      this.$http
        .get(Vue.config["url"] + "/del-all-msg-noti", {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(
          function(data) {
            // this.show_progress = false;
            // this.events = data.body.success.data;
            this.$store.commit("SET_NEWF_NOTIFICATION", []);
            this.loading_notification = false;
          },
          response => {
            // this.snk.txt_warning = "getPlanOfDate";
            // this.$refs.snackbar.open();
          }
        );
    },
    handleScroll(event) {
      //console.log(this.$store.state.newsfeed);
      //return;
      //this.$refs['list_notification'].onscroll = ev => {
      // console.log('wins scroll',event.target.scrollTop);
      // console.log('wins height',event.target.clientHeight);
      // console.log('doc height',event.target.scrollHeight);
      if (
        event.target.scrollHeight - event.target.clientHeight ==
        event.target.scrollTop
      ) {
        // check send replace list
        var last_id = this.newf_notification.data[
          this.newf_notification.data.length - 1
        ].id;
        if (
          this.$store.state.newsfeed.newf_last_notification_id.includes(last_id)
        ) {
          return;
        } else {
          this.$store.state.newsfeed.newf_last_notification_id.push(last_id);
        }

        this.loading_notification = true;

        this.$store.commit("ADD_LAST_NOTIFICATION_ID", last_id);

        this.$http
          .get(Vue.config["url"] + "/get-msg-noti-infi/" + last_id, {
            headers: {
              Authorization: "Bearer " + Vue.localStorage.get("token")
            }
          })
          .then(
            function(data) {
              this.$store.commit(
                "ADD_NEWF_NOTIFICATION",
                data.body.success.data
              );
              this.loading_notification = false;
            },
            response => {
              // this.snk.txt_warning = "getPlanOfDate";
              // this.$refs.snackbar.open();
            }
          );
      }
    },
    getClass(status) {
      if (status == 0) return "un-read";
      else return "readed";
    },
    switchCheck(value) {
      if (value == true) var status = "on";
      else var status = "off";
      Vue.http
        .get(Vue.config["url"] + "/set-noti-config/" + status, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(response => {
          console.log("set noti config " + status);
        });
    },

    convert_time(time) {
      var t = new Date(time);
      return (
        (t.getDate() < 10 ? "0" : "") +
        t.getDate() +
        "/" +
        (t.getMonth() + 1 < 10 ? "0" : "") +
        (t.getMonth() + 1) +
        "/" +
        t.getFullYear() +
        " " +
        (t.getHours() < 10 ? "0" : "") +
        t.getHours() +
        ":" +
        (t.getMinutes() < 10 ? "0" : "") +
        t.getMinutes()
      );
    },
    formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },
    timeAgo(time) {
      switch (typeof time) {
        case "number":
          break;
        case "string":
          time = +new Date(time);
          break;
        default:
          time = +new Date();
      }
      var time_formats = [
        [60, "seconds", 1], // 60
        [120, "1 minute ago", "1 minute from now"], // 60*2
        [3600, "minutes", 60], // 60*60, 60
        [7200, "1 hour ago", "1 hour from now"], // 60*60*2
        [86400, "hours", 3600], // 60*60*24, 60*60
        [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
        [604800, "days", 86400], // 60*60*24*7, 60*60*24
        [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
        [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, "Last month", "Next month"], // 60*60*24*7*4*2
        [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
        [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
        [58060800000, "centuries", 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
      ];
      // console.log(time);
      var month_names = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];

      var today = (+new Date() - time) / 1000;
      if (today <= 86400) {
        time = new Date(time);
        return this.formatAMPM(time);
      } else if (new Date().getDate() - new Date(time).getDate() == 1) {
        return "Yesterday";
      } else {
        time = new Date(time);
        if (time.getFullYear() != new Date().getFullYear()) {
          return (
            month_names[time.getMonth()] +
            " " +
            time.getDate() +
            " " +
            time.getFullYear()
          );
        } else {
          return month_names[time.getMonth()] + " " + time.getDate();
        }
      }
    },
    outsidePanel(e) {
      if (e.target.id == "btn-noti" || e.target.id == "btn-icon-noti") {
        return;
      }
      var x = document.getElementById("notifications");
      x.style.display = "none";
    } //,
    // socket_login () {
    //    // การส่งข้อมูลไปยัง server ผ่านทาง chat message
    //    socket.emit('username', this.text)

    //  }
  },
  data() {
    return {
      delete_title: "Confirm delete item",
      delete_content: "Delte item?",
      loading_notification: false,
      on_notification: true,
      show_panel: false
    };
  },
  created() {
    // console.log("start app");

    // messaging
    //   .requestPermission()
    //   .then(function() {
    //     console.log("Notification permission granted.");
    //     return messaging.getToken();
    //   })
    //   .then(function(token) {
    //     console.log(token);
    //   })
    //   .catch(function(err) {
    //     console.log("Unable to get permission to notify.", err);
    //   });

    if (Vue.localStorage.get("login") == null) {
      this.$store.commit("SET_STATUS_LOGIN", false);
    } else {
      this.$store.commit("SET_SUB_PATH_MENU", []);
      this.$store.commit("SET_STATUS_LOGIN", true);

      // login socket io
      //this.$socket.emit('login', Vue.localStorage.get('emp_id'));

      // require permission and get token
      // messaging
      //   .requestPermission()
      //   .then(function() {
      //     console.log("Notification permission granted.");
      //     return messaging.getToken();
      //   })
      //   .then(function(token) {
      //     console.log(token);
      //     Vue.http
      //       .post(
      //         Vue.config["url"] + "/save-token",
      //         { "f-token": token },
      //         {
      //           headers: {
      //             Authorization: "Bearer " + Vue.localStorage.get("token")
      //           }
      //         }
      //       )
      //       .then(response => {
      //         console.log("update token to db");
      //       });
      //   })
      //   .catch(function(err) {
      //     console.log("Unable to get permission to notify.");
      //   });

      var self = this;
      // load noti config
      Vue.http
        .get(Vue.config["url"] + "/get-noti-config", {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(function(data) {
          var noti_cfg = data.body.success.data[0].noti_cfg;
          if (noti_cfg == 1) self.on_notification = true;
          else self.on_notification = false;
        })
        .then(response => {
          //console.log(response.bodyText);
        });

      // load notification first
      this.setMasterNotification();

      self = this;

      // messaging.onMessage(function(payload) {
      //   var dat = JSON.parse(payload.data.data);

      //   console.log("on message", dat);

      //   Vue.http
      //     .get(Vue.config["url"] + "/get-msg-noti/" + dat.id, {
      //       headers: {
      //         Authorization: "Bearer " + Vue.localStorage.get("token")
      //       }
      //     })
      //     .then(function(data) {
      //       var data = data.body.success.data[0];
      //       self.$store.commit("ADD_NEW_NOTIFICATION", data);
      //       if (data["count_unread"] > 0) {
      //         self.$store.commit("SET_NEWF_HAS_NOTIFICATION", true);
      //       }
      //     })
      //     .then(response => {
      //       //console.log(response.bodyText);
      //     });

        //var id = payload.data;

        /*  Vue.http
          .get(Vue.config["url"] + "/set-noti-status/1", {
            headers: {
              Authorization: "Bearer " + Vue.localStorage.get("token")
            }
          })
          .then(function(data) {
            console.log(data);
            //change button orange
            //self.$store.commit('ADD_NEW_NOTIFICATION', true);
            self.$store.commit("SET_NEWF_HAS_NOTIFICATION", true);
          })
          .then(response => {
            //console.log(response.bodyText);
          });  // 04/01/2019 by tidarat */

        //self.test(payload);

        //console.log(vm);
        //console.log("Message received. ", payload);
        // ...
        //Vue.alert('test');
        //console.log(Vue);
      // });

      // messaging.onTokenRefresh(function() {
      //   messaging
      //     .getToken()
      //     .then(function(refreshedToken) {
      //       console.log("Token refreshed.");
      //     })
      //     .catch(function(err) {
      //       console.log("Unable to retrieve refreshed token ", err);
      //     });
      // });
      // messaging.setBackgroundMessageHandler(function(payload) {
      //   //console.log('[firebase-messaging-sw.js] Received background message ', payload);
      //   // Customize notification here
      //   var dat = JSON.parse(payload.data.data);
      //   var notificationTitle = dat.title;
      //   var notificationOptions = {
      //     body: dat.message,
      //     icon: '/SalesOpsIcon.png'
      //   };

      //     console.log(vm);
      //   //if(dat.noti_cfg == 1)
      //     return self.registration.showNotification(notificationTitle, notificationOptions);
      //   //else
      //   // return true;
      // });

      // Callback fired if Instance ID token is updated.
      // messaging.onTokenRefresh(function() {
      //   messaging
      //     .getToken()
      //     .then(function(refreshedToken) {
      //       console.log("Token refreshed.");
      //       // Indicate that the new Instance ID token has not yet been sent to the
      //       // app server.
      //       setTokenSentToServer(false);
      //       // Send Instance ID token to app server.
      //       sendTokenToServer(refreshedToken);
      //       // ...
      //     })
      //     .catch(function(err) {
      //       console.log("Unable to retrieve refreshed token ", err);
      //       showToken("Unable to retrieve refreshed token ", err);
      //     });
      // });
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        // add Event Listeners
        document.addEventListener("click", handler);
      },
      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#noti_Container {
  position: relative;
}

/* THE NOTIFICAIONS WINDOW. THIS REMAINS HIDDEN WHEN THE PAGE LOADS. */
#notifications {
  /* display:none; */
  width: 430px;
  /* height: 542px; */
  height: auto;
  max-height: 542px;
  position: absolute;
  top: 60px;
  right: 330px;
  /* background:#FFF; */
  border: solid 1px rgba(100, 100, 100, 0.2);
  -webkit-box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  z-index: 100;
  border-radius: 3px;
  background-color: rgb(247, 247, 247);
}

#notifications .contain {
  /* height: 470px; */
  height: auto;
  max-height: 470px;
  width: 413px;
  margin: 10px 5px 10px 10px;
  background-color: rgb(247, 247, 247);
  overflow-y: scroll;
}
.contain::-webkit-scrollbar {
  width: 7px;
  background-color: rgb(247, 247, 247);
}
.contain::-webkit-scrollbar-thumb {
  border-radius: 3px;
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); */
  background-color: rgb(214, 214, 214);
}

#notifications .items {
  height: 60px;
  width: 400px;
  /* background:white; */
  margin-bottom: 5px;
  margin-right: 10xp;
}

#notifications .readed {
  background: white;
}
#notifications .un-read {
  background: #fffbf0;
}

#notifications .not-found-data {
  height: 50p;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #fff;
}

#notifications h3 {
  color: #727272;
  font-family: Lato;
}
#notifications .clear_all {
  color: #727272;
}
#notifications .icon {
  float: left;
  color: gray;
  margin-top: 18px;
  margin-left: 12px;
}
#notifications .message {
  font-family: Kanit;
  font-size: 12px;
  vertical-align: middle;
  line-height: 60px;
}
#notifications .times {
  margin-top: 10px;
  margin-right: 10px;
  font-family: Roboto;
  font-size: 10px;
  color: #a8a8a8;
}

#notifications .close {
  margin-right: 10px;
}

#notifications .flips {
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  filter: FlipH;
  -ms-filter: "FlipH";
}

/* AN ARROW LIKE STRUCTURE JUST OVER THE NOTIFICATIONS WINDOW */
/* #notifications:before {         
      content: '';
      display:block;
      width:0;
      height:0;
      color:transparent;
      border:10px solid #CCC;
      border-color:transparent transparent #FFF;
      margin-top:-20px;
      margin-left: 400px;
  } */
</style>
