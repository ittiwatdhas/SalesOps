<template>
  <div id="pageMyOrders">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true">
      <md-layout
        md-align="start"
        md-flex="100"
        class="md-topic"
        style="padding-top:25px;padding-left:70px"
      >
        <span v-if="keepRouter">{{ pageOrderName }}</span>
        <span v-else>{{ pageOrderName2 }}</span>
      </md-layout>
      <md-layout md-align="center" class="pt-20">
        <!--BOX 1-->
        <md-layout md-flex="100" md-align="center" v-if="keepRouter">
          <sales-period-block
            style="width:90%"
            :max="$store.getters['myorders/period_detail'].max_pass_percent"
            @selectmonth="selectMonth"
            @selectyear="selectYear"
            :detail="$store.getters['myorders/period_detail']"
            :year="$store.getters['myorders/date_selected'].year"
            :month="$store.getters['myorders/date_selected'].month"
            :range="$store.getters['myorders/date_selected'].range"
            :displayRange="true"
          ></sales-period-block>
        </md-layout>
        <md-layout md-flex="100" md-align="center" v-else>
          <head-approve-bar style="width:90%"></head-approve-bar>
        </md-layout>
        <!--BOX 2-->
        <md-spinner
          :md-size="150"
          :md-stroke="1"
          v-show="$store.getters['myorders/spinner_loading']"
          md-indeterminate
        ></md-spinner>
        <md-layout md-flex="100" md-align="center" class="mt-20" v-if="keepRouter">
          <summary-bar
            :detail="$store.getters['myorders/summary_bar']"
            @opendialog="openDialog"
            style="width:90%"
          ></summary-bar>
        </md-layout>
        <!--BOX 3-->
        <md-layout md-flex="100" md-align="center" :class="!keepRouter ?'mt-20':''">
          <md-card class="sales-area-table" style="overflow : initial;">
            <div
              class="detail-blog"
              @scroll="handleScroll"
              :style="{'height': keepRouter ? 'calc(100vh - 300px)' : 'calc(100vh - 230px)',
                              'padding-top': keepRouter ? '' : '30px'}"
            >
              <div class="title" v-if="keepRouter">MY ORDERS</div>
              <div class="title" v-else style="padding-left:10px">APPROVAL</div>
              <myorder-table
                v-if="keepRouter"
                tableName="Drafts"
                :type="'DRAFT'"
                :expand="false"
                v-model="draftList"
                @opendialog="openDialog"
                @opencomment="openComment"
                @opendelivery="openDelivery"
              ></myorder-table>
              <myorder-table
                v-if="keepRouter"
                tableName="Pending"
                :type="'PENNDING'"
                :expand="false"
                v-model="pendingList"
                @opendialog="openDialog"
                @opencomment="openComment"
                @opendelivery="openDelivery"
              ></myorder-table>
              <myorder-table
                v-if="keepRouter"
                tableName="Rejected"
                :type="'REJECT'"
                :expand="false"
                v-model="rejectList"
                @opendialog="openDialog"
                @opencomment="openComment"
                @opendelivery="openDelivery"
              ></myorder-table>
              
              <myorder-table
                v-if="keepRouter"
                tableName="Completed"
                :type="'COMPLETED'"
                v-model="completedList"
                @opendialog="openDialog"
                @opencomment="openComment"
                @opendelivery="openDelivery"
                :expand="true"
              ></myorder-table>
              <apv-myorder-table
                v-if="!keepRouter"
                tableName="Pending"
                :type="'PENNDING'"
                :expand="false"
                v-model="pendingList"
                @opendialog="openDialog"
                @opencomment="openComment"
                @opendelivery="openDelivery"
              ></apv-myorder-table>
              <apv-myorder-table
                v-if="!keepRouter"
                tableName="Rejected"
                :type="'REJECT'"
                :expand="false"
                v-model="rejectList"
                @opendialog="openDialog"
                @opencomment="openComment"
                @opendelivery="openDelivery"
              ></apv-myorder-table>
              <apv-myorder-table
                v-if="!keepRouter"
                tableName="Completed"
                :type="'COMPLETED'"
                v-model="completedList"
                @opendialog="openDialog"
                @opencomment="openComment"
                @opendelivery="openDelivery"
                :expand="true"
              ></apv-myorder-table>
              <myorder-table
                v-if="keepRouter"
                tableName="DhasXpress"
                :type="'XPRESS'"
                :expand="true"
                v-model="xpressList"
                @opendialog="openDialog"
                @opencomment="openComment"
                @opendelivery="openDelivery"
              ></myorder-table>


            </div>
          </md-card>
        </md-layout>
      </md-layout>
    </div>

    <!-- DIALOG -->
    <md-dialog md-open-from="#fab" ref="createOrder_dialog" id="createOrder_dialog">
      <create-orders v-if="showPromo" @closedlg="closeDlg" @showpromotion="showPromotion"></create-orders>
      <promotion-view v-else @add="addOrder" @addclose="addAndCloseOrder" @close="closePromotion"></promotion-view>
    </md-dialog>
    <md-comment-dialog
      :title="'Notes'"
      @close="closeComment"
      @reply="replyComment"
      @read="readComment"
      @handleScroll="getCommentId"
      :data="$store.getters['myorders/comment']"
      :option="commentOpt"
    ></md-comment-dialog>
    <md-snackbar
      :md-position="vertical + ' ' + horizontal"
      ref="ord_snackbar"
      :md-duration="duration"
    >
      <span>{{txt_warning}}</span>
      <md-button class="md-accent" @click="retry" style="color:#FD7F00">Retry</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";

     

export default {
  name: "my-orders",
  data() {
    return {
      showPromo: true,
      showmonth: false,
      commentOpt: {
        display: false,
        top: 0,
        left: 0
      },
      txt_warning: "",
      vertical: "bottom",
      horizontal: "center",
      duration: 7000,
      pageOrderName: "",
      pageOrderName2: ""
    };
  },
  computed: {
    keepRouter() {
      return this.$store.getters["myorders/keepRouter"];
    },
    completedList() {
      return this.$store.getters["myorders/completed_list"];
    },
    pendingList() {
      return this.$store.getters["myorders/pending_list"];
    },
    rejectList() {
      return this.$store.getters["myorders/reject_list"];
    },
    draftList() {
      return this.$store.getters["myorders/draft_list"];
    },
    orderDialog() {
      return this.$store.getters["myorders/orderDialog"];
    },
    info() {
      return this.$store.getters["myorders/customer_info"];
    },
    xpressList() {
      return this.$store.getters["myorders/xpress_list"];
    }
  },
  methods: {
    getCommentId(value) {
      // console.log("--->", value.srcElement.childNodes);
    },
    addOrder() {
      this.$store.dispatch("myorders/addItems");
    },
    addAndCloseOrder() {
      this.$store.dispatch("myorders/addItems");
      this.showPromo = true;
    },
    closePromotion() {
      this.$store.dispatch("myorders/getPromoCG", {
        customer_code: this.info.customer_code,
        group: "all"
      });
      this.showPromo = true;
    },
    showPromotion() {
      this.showPromo = false;
    },
    readComment(data) {
      this.$store.dispatch("myorders/readComment", data);
    },
    openComment(e, items) {
      let pageX = e.pageX;

      if (pageX == 0) {
        let comment = document.getElementById("icon" + items.doc_no);
        pageX = comment.offsetLeft + 270;
      }

      let masterScreenW = window.screen.height;

      let H = e.y + 200;
      if (H > masterScreenW) {
        let total = H - masterScreenW;

        this.commentOpt.top = e.y - total;
      } else {
        this.commentOpt.top = e.y;
      }
      this.commentOpt.left = pageX - 270;
      this.commentOpt.display = true;
      this.$store.dispatch("myorders/getComment", items);
    },
    openDelivery(ref, items, type) {
      let route = this.$router.resolve({
        name: "new-report",
        query: { doc_no: items.doc_no, id: items.h_id }
      });
      window.open(route.href, "_blank");
    },
    closeComment() {
      this.commentOpt.display = false;
    },
    replyComment(value) {
      if (value != null) {
        value.msg_to = "";
        value.emp_id_start = "";
        value["popup"] = false;
        this.$store.dispatch("myorders/replyComment", value);
      }
    },
    selectYear(value) {
      let date = this.$store.getters["myorders/date_selected"];
      date.year = value.year;
    },
    selectMonth(value) {
      let date = this.$store.getters["myorders/date_selected"];
      if (value.mode == "period") {
        date.month = value.month;
        date.year = value.year;
        date.range = "-";
        this.$store.dispatch("myorders/getOrderBySales", {
          year: value.year,
          month: value.month,
        });
      } else {
        date.year = "";
        date.month = "";
        date.range = value.range;
        this.$store.dispatch("myorders/getOrderBySales", {
          month: value.range,
          year: "range"
        });
      }
    },
    openDialog(ref, items, type) {
      Vue.localStorage.set("STATUS_BTN_PREVIEW",'true')
      Vue.localStorage.set("PO_NO_PREVIEW",'')
      
      if (this.$store.getters["sp_move_myorder"] == "start") {
        this.$store.commit("SET_SP_MOVE_MYORDER", "");
      } else {
        if (typeof type == "undefined") {
          this.$store.dispatch("myorders/openOrder");
        } else {
          this.$store.dispatch("myorders/getOrderById", {
            items: items,
            type: type
          });
        }
      }
      
      
      this.$refs[ref].open();
    },
    handleScroll(event) {
      this.closeComment();
    },
    closeDlg(id) {
      this.$refs[id].close();
      Vue.localStorage.set("ORD_DIALOG", JSON.stringify(this.orderDialog));
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    retry() {
      this.$refs.ord_snackbar.close();
    },
    showEvenNoti() {
      /*    let _route_name = this.$route.name;
      let route_names = _route_name.split("/");
        console.log(route_names[0]);
      if(this.$store.getters["myorders/keepRouter"] == false && route_names[0] == 'orders-myorders'){
        this.$store.commit("myorders/SET_KEEP_ROUTER", true);
        let date = this.$store.getters["myorders/date_selected"];
        date.month = moment(new Date()).format("MM");
        date.year = moment(new Date()).format("YYYY");
        this.$store.dispatch("myorders/getOrderBySales", {
          year: date.year,
          month: date.month
        });
      } */

      let self = this;
      let noti_event = this.$store.getters["myorders/noti_event"];
      setTimeout(function() {
        if (noti_event.status == true && noti_event.type == "ODR") {
          let completed = document.getElementById("Completed");
          let icon_completed = document.getElementById("iconCompleted");
          if (icon_completed.textContent == "keyboard_arrow_right") {
            completed.click();
          }
          self.$store.dispatch("myorders/hilightRow", noti_event.doc_no);

          if (noti_event.noti_type == "C") {
            setTimeout(function() {
              let comment = document.getElementById("icon" + noti_event.doc_no);
              if (comment != null) {
                // self.$store.dispatch("myorders/hilightRow", noti_event.doc_no);
                // comment.focus({preventScroll:false});
                // comment.click();
                let detail = document.getElementById(
                  "detail" + noti_event.doc_no
                );
                detail.click();
                setTimeout(function() {
                  let popcomment = document.getElementById(
                    "btn-comment-" + noti_event.doc_no
                  );
                  if (popcomment != null) {
                    popcomment.click();
                  }
                }, 2500);
              } else {
                self.txt_warning =
                  "No comment your select PO.NO " + noti_event.doc_no;
                self.$refs.ord_snackbar.open();
              }
            }, 1000);
            /* }else if(noti_event.noti_type == 'APV'){
            setTimeout(function() {
              let detail = document.getElementById("detail"+noti_event.doc_no);
              console.log("detail"+detail);
              if(detail != null){
                detail.click();
              }
            },1000); */
          } else {
            setTimeout(function() {
              let detail = document.getElementById(
                "detail" + noti_event.doc_no
              );
              if (detail != null) {
                // self.$store.dispatch("myorders/hilightRow", noti_event.doc_no);
                detail.click();
              } else {
                self.txt_warning = "No have PO.NO " + noti_event.doc_no;
                self.$refs.ord_snackbar.open();
              }
            }, 1000);
          }
        }
      }, 1300);
      self.$store.commit("myorders/SET_NOTI_EVENT", {});
    }
  },
  watch: {
    "$route.params.doc_no": function(doc_no) {
      let _route_name = this.$route.name;
      let route_names = _route_name.split("/");
      let date = this.$store.getters["myorders/date_selected"];
      date.month = moment(new Date()).format("MM");
      date.year = moment(new Date()).format("YYYY");
      if (
        this.$store.getters["myorders/keepRouter"] == false &&
        route_names[0] == "orders-myorders"
      ) {
        this.$store.commit("myorders/SET_KEEP_ROUTER", true);
        this.$store.dispatch("myorders/getOrderBySales", {
          year: date.year,
          month: date.month
        });
      } else if (
        this.$store.getters["myorders/keepRouter"] == true &&
        route_names[0] == "orders-approval"
      ) {
        this.$store.commit("myorders/SET_KEEP_ROUTER", false);
        this.$store.dispatch("myorders/getOrderBySales", {
          year: date.year,
          month: date.month,
          po: "",
          saleman: "",
          customer: ""
        });
      }
      this.showEvenNoti();
    }
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.login = true;
      this.$store.dispatch("setPathMenuService", "orders");
      let date = this.$store.getters["myorders/date_selected"];
      date.month = moment(new Date()).format("MM");
      date.year = moment(new Date()).format("YYYY");
      date.range = "-";
      let nowD = moment(new Date()).format("YYYY-MM-DD");
      var podate = new Date(nowD);
      var po_dd = podate.getDate();
      var po_mm = podate.getMonth();
      var po_y = podate.getFullYear();
      let rsPoDate = moment(new Date(po_y, po_mm, po_dd + 1)).format(
        "YYYY-MM-DD"
      );
       document.addEventListener("visibilitychange", () => {
          this.$store.dispatch("myorders/getWarehouse");
          let theArray =  JSON.parse(sessionStorage.getItem('keep_order_session')).customer_info
          if(theArray && theArray.order_status === 'DRF_PR'){
          this.$store.dispatch('myorders/getOrderById',{items:theArray})
          }
      });

      let menu = this.$store.getters["displayMenu"];
      let path = this.$router.app._route.path.split("/");
      let pathFull = this.$router.app._route.path;
      let head = _.filter(menu, item => {
        if (item.m_code == path[1]) {
          return true;
        }
      });
      if (head.length > 0) {
        let sub = _.filter(head[0].sub_menu, item => {
          if (item.m_path == "/orders/myorders") {
            return true;
          }
        });
        if (sub.length > 0) {
          this.pageOrderName = sub[0].m_name;
        }
        let sub2 = _.filter(head[0].sub_menu, item => {
          if (item.m_path == "/orders/approval") {
            return true;
          }
        });
        if (sub2.length > 0) {
          this.pageOrderName2 = sub2[0].m_name;
        }
      }
      this.$store.commit("myorders/SET_NOTI_EVENT", {});
      this.$store.dispatch("myorders/getPriority");
      this.$store.dispatch("myorders/getCreditterm");
      this.$store.dispatch("myorders/getWarehouse");
      this.$store.dispatch("myorders/getMstDiscount");
      let _route_name = this.$route.name;
      let route_names = _route_name.split("/");

      if (route_names[0] == "orders-approval") {
        this.$store.commit("myorders/SET_KEEP_ROUTER", false);
        this.$store.dispatch("myorders/getOrderBySales", {
          year: date.year,
          month: date.month,
          po: "",
          saleman: "",
          customer: ""
        });

        let thisTemp2 = this;
        let statusDdilog = Vue.localStorage.get("ORD_DIALOG_SHOW");
        // let statusDdilog = sessionStorage.getItem("ORD_DIALOG_SHOW_SESSION");
        if (statusDdilog == "OPEN") {
          let ord_dilog = sessionStorage.getItem('keep_order_session')
          // let ord_dilog = Vue.localStorage.get("ORD_DIALOG");
          let theArray = JSON.parse(ord_dilog);
          if (!_.isNull(ord_dilog)) {
            setTimeout(function() {
              thisTemp2.$store.dispatch("myorders/afterFullReffresh", theArray);
              thisTemp2.$refs["createOrder_dialog"].open();
            }, 500);
          }
        } else {
          Vue.localStorage.set("ORD_DIALOG", JSON.stringify(this.orderDialog));
          sessionStorage.setItem('keep_order_session',JSON.stringify(this.orderDialog))

          // Vue.localStorage.set("ORD_DIALOG2", JSON.stringify(this.orderDialog));
        }
      } else {
        this.$store.commit("myorders/SET_KEEP_ROUTER", true);
        this.$store.dispatch("myorders/getOrderBySales", {
          year: date.year,
          month: date.month,
         
        });

        let thisTemp2 = this;
        // let statusDdilog = Vue.localStorage.get("ORD_DIALOG_SHOW");
        let statusDdilog = sessionStorage.getItem('ORD_DIALOG_SHOW_SESSION');

        if (statusDdilog == "OPEN" ) {
       
          console.log('OPENN...')
       
          Vue.localStorage.set("STATUS_BTN_PREVIEW",'true')
          // Vue.localStorage.set('ORD_DIALOG',sessionStorage.getItem('keep_order_session'))
          let fromPage = Vue.localStorage.get("FROMPAGE");
          if (!_.isNull(fromPage)) {
            if (fromPage == "BACKORDERS") {
              setTimeout(function() {
                let obj = Vue.localStorage.get("BK_DETAIL");
                let theArray = JSON.parse(obj);
                thisTemp2.$store.dispatch("myorders/getInfoFromBK", theArray);
                thisTemp2.$refs["createOrder_dialog"].open();
              }, 0);
            }
          } else {
            console.log('OPENN')
            // this.$store.dispatch('myorders/getMstDiscount')
            // let ord_dilog = Vue.localStorage.get("ORD_DIALOG")
            let ord_dilog = sessionStorage.getItem('keep_order_session')
            let theArray = JSON.parse(ord_dilog);
            if (!_.isNull(ord_dilog)) {
              setTimeout(function() {
                if (theArray.ponoStep) {
                  let obj = {
                    items: {
                      doc_no: theArray.customer_info.doc_no,
                      h_id: theArray.customer_info.h_id
                    }
                  };
                  thisTemp2.$store.dispatch("myorders/getOrderById", obj);
                  thisTemp2.$refs["createOrder_dialog"].open();
                } else {
                  if (
                    theArray.customer_info.user_create ==
                    Vue.localStorage.get("emp_id")
                  ) {
                    thisTemp2.$store.dispatch(
                      "myorders/afterFullReffresh",
                      theArray
                    );
                    thisTemp2.$refs["createOrder_dialog"].open();
                  } else {
                    thisTemp2.$store.dispatch("myorders/clearDialog");
                  }
                }
              }, 500);
            }
          }
        } else {
          Vue.localStorage.set("ORD_DIALOG", JSON.stringify(this.orderDialog));
          sessionStorage.setItem('keep_order_session',JSON.stringify(this.orderDialog))

          // Vue.localStorage.set("ORD_DIALOG2", JSON.stringify(this.orderDialog));
        }
        setTimeout(function() {
          if (thisTemp2.$store.getters["sp_move_myorder"] == "start") {
            let obj = {
              head: thisTemp2.$store.getters.sp_cust_head,
              items: thisTemp2.$store.getters.sp_create_order_go
            };
            thisTemp2.$store.dispatch("myorders/getPurcheseInfoFromSP", obj);
            let temp = document.getElementById("btnCreateOrderDialog");
            temp.click();
          }
        }, 500);
      }
      let noti_event = this.$store.getters["myorders/noti_event"];
      let self = this;
      setTimeout(function() {
        if (noti_event.status == true && noti_event.type == "ODR") {
          let completed = document.getElementById("Completed");
          let icon_completed = document.getElementById("iconCompleted");
          if (icon_completed.textContent == "keyboard_arrow_right") {
            completed.click();
          }
          self.$store.dispatch("myorders/hilightRow", noti_event.doc_no);
          if (noti_event.noti_type == "C") {
            setTimeout(function() {
              let comment = document.getElementById("icon" + noti_event.doc_no);
              if (comment != null) {
                let detail = document.getElementById(
                  "detail" + noti_event.doc_no
                );
                detail.click();
                setTimeout(function() {
                  let popcomment = document.getElementById(
                    "btn-comment-" + noti_event.doc_no
                  );
                  popcomment.click();
                }, 2500);
              } else {
                this.txt_warning =
                  "No comment your select PO.NO " + noti_event.doc_no;
                this.$refs.ord_snackbar.open();
              }
            }, 1000);
          } else {
            setTimeout(function() {
              let detail = document.getElementById(
                "detail" + noti_event.doc_no
              );
              if (detail != null) {
                detail.click();
              } else {
                this.txt_warning = "No have PO.NO " + noti_event.doc_no;
                this.$refs.ord_snackbar.open();
              }
            }, 1000);
          }
        }
      }, 1500);
    }
  },

  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
    "create-orders": require("./myorder-component/create-orders-dialog"),
    "promotion-view": require("./myorder-component/promotion-page"),
    "summary-bar": require("./myorder-component/summary-bar"),
    "myorder-table": require("./myorder-component/myorder-table"),
    "head-approve-bar": require("./myorder-component/head-approve-bar"),
    "sales-period-block": require("../Salesops/customComponent/md-period-boxes"),
    "md-comment-dialog": require("../Salesops/customComponent/md-comment-dialog"),
    "apv-myorder-table": require("./myorder-component/apv-myorder-table")
  }
};
</script>
<style lang="scss" scoped>
#pageMyOrders {
  .sales-area-table {
    width: 90% !important;
    // width: 930px !important;
  }
}
</style>