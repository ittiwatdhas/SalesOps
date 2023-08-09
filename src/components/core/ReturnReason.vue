<template>
  <div id="pageMenuManagement">
    <div>
      <md-spinner style="position: absolute;padding-top:30%;z-index: 3" :md-size="150" :md-stroke="1"
        v-show="$store.getters.cpr_spinner_loading" md-indeterminate></md-spinner>
    </div>
    <div v-show="$store.getters.cpr_spinner_loading" style="z-index: 2;
            opacity: 0.4;
            position: absolute;
            width: 100%;
            height: 100%;"></div>
    <md-layout md-gutter class="mh-0">
      <md-layout md-column md-gutter md-flex="25">
        <menu-left></menu-left>
      </md-layout>

      <md-layout md-column md-gutter md-flex="75" style="padding-left:4%; ">
        <md-layout style="flex: initial;width: 100%;" class="header-bar">
          <div class="title" style="width:100%;text-align:left;font-weight: bolder;">
            {{ title }}
          </div>
        </md-layout>
        <div class="cust-list-box" style="width: 90%;margin:2% 10% 0 30px;padding: 0px 0px 0px 0px">


          <div style="overflow-y='scroll'" class="body-deatil">

            <md-layout style="flex: initial;margin:20px 55px 20px 55px;" class="search-cust-box">
              <div style="width: 30%">
                <md-input-container class="-no-line -search" style="margin: 0px">
                  <md-icon class="mr-5">
                    search <md-tooltip>search</md-tooltip></md-icon>
                  <md-input placeholder="Search" :class="rt_search === 'Search' ? 'search-text' : 'value-text'"
                    v-on:change="searchUser" v-model="rt_search" @focus.native="$event.target.select()"></md-input>

                </md-input-container>
                <md-card v-if="shw_customer" id="style-scroll">
                  <ul class="md-list" v-if="listData.length > 0">
                    <li class="md-list-item" v-for="(item, index) in listData" :key="index">
                      <div class="md-list-item-text" @click="selectUser(item)">
                        {{ item.code
                        }}<span class="kanitFont"> {{ item.title }}</span>
                      </div>
                    </li>
                  </ul>
                </md-card>
              </div>
              <div class="text-center" style="margin-top:0px;width:7%;height:32px; padding-left: 18px;">
                <md-button :class="'-orange'"
                  style="height: 31px;margin:unset;border-radius:3px;font-size: 12px;min-width: 100%;padding:0px 5px 0px 0px;width: 100%;"
                  @click="openDetail('search')">
                  <md-icon>search</md-icon>
                </md-button>
              </div>


              <div class="text-center" style="margin-top:0px;width:63%;height:32px; padding-left: 58%;">
                <md-button :class="'-orange'"
                  style="height: 31px;margin:unset;border-radius:3px;font-size: 12px;min-width: 100%;padding:0px 5px 0px 0px;width: 100%;"
                  @click="openDialog_('add')">
                  <md-icon>add</md-icon>
                </md-button>
              </div>

            </md-layout>

            <md-layout style="margin:20px 55px 45px 55px;padding:20px 10px 10px 25px;flex: initial;background-color:"
              class="cust-list-box">
              <div class="head-table">
                <div style="width:4%;text-align:left;color:#727272;font-size:16px;"> No.</div>
                <div style="color:#727272;font-size:16px;width:20%;cursor: pointer;">Code</div>
                <div style="color:#727272;font-size:16px;width:26%;cursor: pointer;">Description</div>
                <div style="color:#727272;font-size:16px;width:15%;cursor: pointer;text-align: right;">Type</div>
                <div style="color:#727272;font-size:16px;width:17%;cursor: pointer;text-align: right;">Status</div>
                <div style="color:#727272;font-size:16px;width:16%;cursor: pointer;text-align: right;">Action</div>

              </div>


              <md-snackbar ref="snackbar" :md-position="'top' + ' ' + 'center'" :md-duration="duration">
                <span>{{ "Can't delete because it is in use." }}</span>

                <md-button class="md-accent" @click="$refs.snackbar.close()" style="color:#FD7F00">OK</md-button>
              </md-snackbar>
              <div class="body-deatil" @scroll="handleScroll" v-click-outside="outsideTable" :style="{
                'padding-right': this.$store.getters.returnreason_list.length > 1 ? '48px' : '60px',
                'overflow-y': 'scroll'
              }">
                <div v-if="listData.length == 0"
                  style="margin-top: 15px;font-size:14px;text-align:center;margin-bottom: 15px;">No Customer ....</div>


                <div class="detail-table" v-for="(item, index) in listData" :key="index" :style="{ 'margin-top': '15px' }"
                  :id="'row-' + index">

                  <div class="inp-bar" :style="{ 'margin-top': '10px', 'width': '7%', 'text-align': 'left' }">
                    <label style="opacity:0.8;font-size:14px;font-weight: bold;color:#5A5A5A">
                      {{ index + 1 }}
                    </label>
                  </div>

                  <div class="inp-bar" :style="{ 'margin-top': '10px', 'width': '22%' }">
                    <label style="opacity:0.8;font-size:14px;font-weight: bold;color:#5A5A5A" class="label-text">{{
                      item.code }}</label>
                  </div>

                  <div class="inp-bar" :style="{ 'margin-top': '10px', 'width': '30%', 'text-align': 'left' }">
                    <label style="opacity:0.8;font-family: kanit; font-size:14px;color:#5A5A5A" class="label-text">{{
                      item.description }}</label>
                  </div>

                  <div class="inp-bar" :style="{ 'margin-top': '10px', 'width': '30%', 'text-align': 'left' }">
                    <label style="opacity:0.8;font-size:14px;font-weight: bold;color:#5A5A5A" class="label-text">{{
                      item.rs_type }}</label>
                  </div>
                  <!-- ////////////// status ////////////////// -->
                  <md-icon :style="{ 'color': item.status == 1 ? '#66BB6A' : '#F44336', 'width': '13%' }">
                    fiber_manual_record
                  </md-icon>

                  <div class="md-avatar md-avatar-icon" style="margin-right: 25px; " @click="openDialog_('edit', item)">
                    <md-icon style="color:#797979">edit</md-icon>
                  </div>

                  <div class="md-avatar md-avatar-icon" style="margin-left: 15px;" @click="openDialog_('delete')"
                    v-if="showDeleteIcon">
                    <md-icon style="color:#797979">
                      delete_outline
                    </md-icon>
                  </div>



                </div>
              </div>
            </md-layout>

            <md-dialog ref="confiem-dialog" style="margin:unset">
              <md-dialog-title>{{ ques }}</md-dialog-title>
              <md-dialog-content>{{ ans }}</md-dialog-content>
              <md-dialog-actions>
                <md-button class="" @click="closeDialog_master('close')">Cancel</md-button>
                <md-button class="md-primary" @click="closeDialog_master('save')">{{ this.btn_dialog }}</md-button>
              </md-dialog-actions>
            </md-dialog>

            <md-dialog ref="confiem-dialog-delete" style="margin:unset">
              <md-dialog-title style=" font-size:14px;color:#727272">{{ ans }}</md-dialog-title>
              <md-dialog-actions>
                <md-button class="" @click="closeDialog_master('close')">Cancel</md-button>
                <md-button class="md-primary" @click="closeDialog_master('save')">{{ this.btn_dialog }}</md-button>
              </md-dialog-actions>
            </md-dialog>
          </div>
        </div>
      </md-layout>
    </md-layout>

    <!-- ////////////////////////////////////////////////////////////////////////////// -->


    <!-- ////////////////////////////////////////////////////////////////////////////////////// -->

    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="reasontype_add" id="pageDepartmentDialog">
      <md-dialog-title>
        <md-layout>
          <md-layout md-flex="90" style="display: -webkit-box; overflow: hidden">
            <div class="title">Return Reason Details</div>
          </md-layout>
          <md-layout md-flex="10" md-align="end">
            <md-button class="md-icon-button" @click="open_dialog('close')">
              <md-icon>close</md-icon>
              <md-tooltip md-direction="right">close</md-tooltip>
            </md-button>
          </md-layout>
        </md-layout>
      </md-dialog-title>
      <md-dialog-content>
        <div style="padding-left: 5%; padding-right: 5%; margin-top: 5px">

          <md-input-container style="margin-bottom: 7px">
            <label>Type</label>
            <md-select v-model="rt_type">
              <md-option v-for="option in rt_type_options" :key="option.id" :value="option.id">
                {{ option.code }} : {{ option.description }}
              </md-option></md-select>
            <div class="md-error" style="bottom: -25px; opacity: inherit; color: #f44336"
              v-if="(rt_type === '' || rt_type == null) && validInp">
              {{ warningText }}
            </div>
          </md-input-container>

          <md-input-container style="margin-bottom: 7px">
            <label>Code</label>
            <md-input v-model="rt_code" @keypress.native="isNumber"></md-input>
            <div class="md-error" style="bottom: -25px; opacity: inherit; color: #f44336"
              v-if="(rt_code === '' || isNaN(rt_code)) && validInp">
              {{ warningText }}
            </div>
          </md-input-container>
          <md-input-container style="margin-bottom: 7px">
            <label>Description</label>
            <md-input v-model="rt_description"></md-input>
            <div class="md-error" style="bottom: -25px; opacity: inherit; color: #f44336"
              v-if="(rt_description == '' || rt_description == null) && validInp">
              {{ warningText }}
            </div>
          </md-input-container>



          <div style="margin-top: 30px; color: #797979;">
            <label>Status</label>
          </div>

          <div style=" margin-bottom: 40px">
            <md-radio v-model="rt_status" md-value=1 class="md-warn">Active</md-radio>
            <md-radio v-model="rt_status" md-value=0 class="md-warn" style="margin-left: 15%">Inactive</md-radio>
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions>
        <!-- <md-button
          v-if="btndelete"
          class="md-raised md-button-delete"
          @click="open_dialog('delete')"
        >
          <label>DELETE</label>
        </md-button> -->

        <md-button class="md-raised md-button-cancel" @click="open_dialog('close')">
          <label>CANCEL</label>
        </md-button>
        <md-button class="md-raised md-button-save" @click="open_dialog('save')" :disabled="btn_save_condition"
          :style="{ backgroundColor: btn_save_condition ? '#797979' : '', color: btn_save_condition ? 'white' : '' }">
          <label>SAVE</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <!-- //////////////////////////////////////////////////////////////////////////////////////// -->
    <!-- //////////////////////////////////////// UPDATE ////////////////////////////////////// -->
    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="reasontype_update" id="pageDepartmentDialog">
      <md-dialog-title>
        <md-layout>
          <md-layout md-flex="90" style="display: -webkit-box; overflow: hidden">
            <div class="title">Return Reason Details</div>
          </md-layout>
          <md-layout md-flex="10" md-align="end">
            <md-button class="md-icon-button" @click="open_dialog('close')">
              <md-icon>close</md-icon>
              <md-tooltip md-direction="right">close</md-tooltip>
            </md-button>
          </md-layout>
        </md-layout>
      </md-dialog-title>
      <md-dialog-content>
        <div style="padding-left: 5%; padding-right: 5%; margin-top: 5px">

          <md-input-container style="margin-bottom: 7px">
            <label>Type</label>
            <md-select v-model="rt_type">
              <md-option v-for="option in rt_type_options" :key="option.id" :value="option.id">
                {{ option.code }} : {{ option.description }}
              </md-option></md-select>
            <div class="md-error" style="bottom: -25px; opacity: inherit; color: #f44336"
              v-if="(rt_type === '' || rt_type == null) && validInp">
              {{ warningText }}
            </div>
          </md-input-container>

          <md-input-container style="margin-bottom: 7px ">
            <label>Code</label>
            <md-input v-model="rt_code" @keypress.native="isNumber"></md-input>
            <div class="md-error" style="bottom: -25px; opacity: inherit; color: #f44336"
              v-if="(rt_code === '' || isNaN(rt_code)) && validInp">
              {{ warningText }}
            </div>
          </md-input-container>
          <md-input-container style="margin-bottom: 7px">
            <label>Description</label>
            <md-input v-model="rt_description"></md-input>
            <div class="md-error" style="bottom: -25px; opacity: inherit; color: #f44336"
              v-if="(rt_description == '' || rt_description == null) && validInp">
              {{ warningText }}
            </div>
          </md-input-container>



          <div style="margin-top: 30px; color: #797979;">
            <label>Status</label>
          </div>

          <div style=" margin-bottom: 40px">
            <md-radio v-model="rt_status" md-value=1 class="md-warn">Active</md-radio>
            <md-radio v-model="rt_status" md-value=0 class="md-warn" style="margin-left: 15%">Inactive</md-radio>
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions>
        <!-- <md-button
          v-if="btndelete"
          class="md-raised md-button-delete"
          @click="open_dialog('delete')"
        >
          <label>DELETE</label>
        </md-button> -->

        <md-button class="md-raised md-button-cancel" @click="open_dialog('close')">
          <label>CANCEL</label>
        </md-button>
        <md-button class="md-raised md-button-save" @click="open_dialog('update_save')" :disabled="btn_save_condition"
          :style="{ backgroundColor: btn_save_condition ? '#797979' : '', color: btn_save_condition ? 'white' : '' }">
          <label>SAVE</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <!-- //////////////// ADD ////////////////////// -->
    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="confirm_close" id="duplicate">
      <md-dialog-content> Do you want to close? </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="confirm_close('cancel')">
          <label style="color: ##a8a8a8">CANCEL</label>
        </md-button>
        <md-button @click="confirm_close('close')">
          <label style="color: #fd7f00">CLOSE</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <!-- ////////////////////// DELETE //////////////////////// -->
    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="confirm_delete" id="duplicate">
      <md-dialog-content> Do you want to delete? </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="confirm_close('cancel_delete')">
          <label style="color: ##a8a8a8">NO</label>
        </md-button>
        <md-button @click="confirm_close('delete')">
          <label style="color: #fd7f00">YES</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <!-- ////////////////////// SAVE //////////////////////// -->
    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="confirm_save" id="duplicate">
      <md-dialog-content> Do you want to save? </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="confirm_close('cancel_save')">
          <label style="color: ##a8a8a8">CANCEL</label>
        </md-button>
        <md-button @click="confirm_close('save')">
          <label style="color: #fd7f00">SAVE</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <!-- //////////////////// UPDATE //////////////////// -->
    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="confirm_update" id="duplicate">
      <md-dialog-content> Do you want to update? </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="confirm_close('cancel_save')">
          <label style="color: ##a8a8a8">CANCEL</label>
        </md-button>
        <md-button @click="confirm_close('update_save')">
          <label style="color: #fd7f00">SAVE</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <!-- //////////////////// Duplicate //////////////////// -->
    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="confirm_duplicate" id="duplicate">
      <md-dialog-content> Dupilcate code ! </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="confirm_close('duplicate_ok')">
          <label style="color: #fd7f00">OK</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>
<script>
import Vue from 'vue'
import service from '@/services/core/reasontype'
// import corporateManageService from "@/services/core/corporatemanage";

import { relativeTimeThreshold } from 'moment';
let checkStatus = false;
let masterTab = [
  { code: 3, desc: 'Customer' },
  { code: 2, desc: 'Product' }
]
export default {
  name: 'menu-mangement',
  data() {
    return {
      showDeleteIcon: false,

      te_id: '',
      rt_type: '',
      rt_type_options: [],
      rs_type_options: [],
      _rt_type_options: [],
      rt_code: '',
      rt_description: '',
      rt_status: '',
      validInp: false,
      check_comfirm: false,

      s_active: true,
      s_inactive: false,

      showFooter: false,
      title: 'RETURN TYPE',
      tabData: masterTab,
      activeTab: masterTab[0].code,
      masterMenu: [],
      masterGroup: [],
      titleMsg: null,
      detailMsg: null,

      tab2Row: {
        group_id: null,
        menu_access: [],
        group_name: null,
        warning: null
      },
      masterUsAccess: [],
      tab3Row: {
        master_group: [],
        selected: null,
        selected_delete: null,
        group_id_popup: null,
        arrSmList: [],
        masterSmList: [],
        arrChips: []
      },
      spinnerLoading: false,
      spinnerLoadingPopup: false,
      bySMList: [],
      masterAllSmList_temp: [],
      codeCorp: '',
      corp_all: 'All Corporate',
      select_api: '',
      btnSort: '',
      cusCode: '',
      keyword: '',
      tempSort: 'ASC',
      add_group_corp: '',
      corp_code: '',
      customer_code: '',
      type: '',
      btn_edit: false,
      btnType: 'active',
      rt_search: '',
      mode: '',

      tempIndex: "default",
      tempEdit: "default",
      tempMode: "",
      ques: "Do you want to leave row?",
      ans: "Changes might not be saved.",
      warningText: "Please input data",
      warningText_dup: 'Duplicate code.',


      type: '',
      corp_code_old: '',
      corp_name_old: '',
      corp_code_new: '',
      corp_name_new: '',
      status: '',
      inp_code: false,
      inp_name: false,

      btn_dialog: 'SAVE',
      duration: 2000,
      check_search: '',
      mtt_search: '',
      txt: 'AAA',

      cust_all: '',

      dbReturnType: [{ code: '100', description: 'คืนสินค้าดี', damage: '10.00', status: 1 },
      { code: '200', description: 'คืนสินค้าชำรุด', damage: '20.00', status: 1 },
      { code: '300', description: 'เปลี่ยนบิล', damage: '30.00', status: 0 }],
      dataListSearch: [], // ข้อมูลที่ค้นหา
      shw_customer: false, // สถานะการแสดงผลรายการค้นหา
      keepEvent: false,
      btn_save: true,
      btn_duplicate: '',
      listData: [],
      listData_add: [],
      listData_update: [],
    }
  },
  mounted() {
    service
      .selectReturnReasontype()
      .then(response => {
        this.rs_type_options = _.cloneDeep(response.data)
        this.rt_type_options = response.data
        console.log('>>>>>>>>>>>>>>>>', this.rt_type_options)

      })

  },
  computed: {
    btn_save_condition() {
      return this.rt_code == '' || this.rt_description == '' || this.rt_type == '';
    },
    filteredItems() {
      return this.$store.getters.reasontype_list.filter(item => {
        return item.name.toLowerCase().indexOf(this.rt_search.toLowerCase()) > -1
      })
    },
    spinner() {
      return this.$store.getters['summaryorders/spinner']
    },
    spinnerDG() {
      return this.$store.getters['summaryorders/spinnerDG']
    },
    // dataListSearch() {
    //   return this.$store.getters['reasontype/reasontype_list']
    // },
  },

  // async mounted() {
  //       await this.$store.dispatch('getReasontype');
  //   },

  methods: {
    isNumber(evt) {
      if (this.rt_code.length >= 3) {
        evt.preventDefault();
        return;
      }


      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;

      if (charCode == 13) {
        // this.calculateOther();
      } else if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        this.keepEvent = false;
        evt.preventDefault();
      } else {
        this.keepEvent = true;
        return true;
      }
    },
    async open_dialog(ref) {
      if (ref == 'close') {
        this.$refs["confirm_close"].open();
      }
      if (ref == 'save') {
        if (
          this.rt_code.trim().length == 0 ||
          this.rt_description.trim().length == 0 ||
          this.rt_type == ''
          // this.rt_status.trim().length == 0
        ) {
          this.validInp = true;
          this.$refs["confirm_save"].close();
        } else {

          console.log({
            code: this.rt_code,
            description: this.rt_description,
            Type: this.rt_type,
            status: this.rt_status,
            options: this.rt_type_options
          })
          // await this.$store.dispatch('insertReturnReasontype', {
          //   code: this.rt_code,
          //   description: this.rt_description,
          //   status: this.rt_status,
          //   re_type_id: this.rt_type,
          // });

        }

        this.$refs["confirm_save"].open();
      }
      if (ref == 'update_save') {
        if (
          this.rt_code.trim().length == 0 ||
          this.rt_description.trim().length == 0 ||
          this.rt_type == ''
          // this.rt_status.trim().length == 0
        ) {
          this.validInp = true;
          this.$refs["confirm_update"].close();
        } else {

          console.log({
            id: this.rt_id,
            code: this.rt_code,
            description: this.rt_description,
            Type: this.rt_type,
            status: this.rt_status
          })
          // this.$store.dispatch('updateReturnReasontype', {
          //   id: this.rt_id,
          //   code: this.rt_code,
          //   description: this.rt_description,
          //   status: this.rt_status,
          //   re_type_id: this.rt_type,
          // });

        }
        this.$refs["confirm_update"].open();
      }


    },
    confirm_close(ref) {
      if (ref == 'close') {
        // this.openDetail('search')
        this.$refs["confirm_close"].close();
        this.$refs["reasontype_add"].close();
        this.$refs["reasontype_update"].close();
      }
      if (ref == 'cancel') {
        this.$refs["confirm_close"].close();
      }
      if (ref == 'delete') {
        this.$refs["confirm_delete"].close();
        // api delete
      }
      if (ref == 'cancel_delete') {
        this.$refs["confirm_delete"].close();
      }
      if (ref == 'cancel_save') {
        // this.openDetail('search')
        this.$refs["confirm_save"].close();
        this.$refs["confirm_update"].close();

      }
      if (ref == 'duplicate_ok') {
        // this.$store.commit('setCheckDuplicate', '');
        this.btn_duplicate = ''
        this.$refs["confirm_duplicate"].close();
      }
      if (ref == 'save') {
        var formData = new FormData();
        formData.append('code', this.rt_code);
        formData.append('description', this.rt_description);
        formData.append('status', this.rt_status);
        formData.append('re_type_id', this.rt_type);
        service
          .insertReturnReasontype(formData)
          .then(response => {
            this.dataListSearch = _.cloneDeep(response.data)
            this.listData_add = response.data
            this.check_comfirm = response.check
            if (response.check == 'false') {
              this.$refs["confirm_duplicate"].open();
              this.$refs["confirm_save"].close();
            } else if (response.check == 'true') {
              this.$refs["confirm_save"].close();
              this.$refs["reasontype_add"].close();
              service
                .getReturnReasontype()
                .then(response => {
                  this.dataListSearch = _.cloneDeep(response.data)
                  this.listData = response.data
                })
            }
          })


      }

      if (ref == 'update_save') {
        var formData = new FormData();
        formData.append('id', this.rt_id);
        formData.append('code', this.rt_code);
        formData.append('description', this.rt_description);
        formData.append('status', this.rt_status);
        formData.append('re_type_id', this.rt_type);
        service
          .updateReturnReasontype(formData)
          .then(response => {
            this.dataListSearch = _.cloneDeep(response.data)
            this.listData_update = response.data
            this.check_comfirm = response.check
            if (response.check == 'false') {
              this.$refs["confirm_duplicate"].open();
              this.$refs["confirm_update"].close();
            } else if (response.check == 'true') {
              this.$refs["confirm_update"].close();
              this.$refs["reasontype_update"].close();
              service
                .getReturnReasontype()
                .then(response => {
                  this.dataListSearch = _.cloneDeep(response.data)
                  this.listData = response.data
                })
            }
          })
        // this.$store.dispatch('updateReturnReasontype', {
        //   id: this.rt_id,
        //   code: this.rt_code,
        //   description: this.rt_description,
        //   status: this.rt_status,
        //   re_type_id: this.rt_type,
        // });
        // if (this.$store.getters.check_duplicate == 'false') {
        //   this.$refs["confirm_duplicate"].open();
        //   this.$refs["confirm_update"].close();
        // } else if (this.$store.getters.check_duplicate == 'true') {
        //   this.$refs["confirm_update"].close();
        //   this.$refs["reasontype_update"].close();
        //   service
        //     .getReturnReasontype()
        //     .then(response => {
        //       this.dataListSearch = _.cloneDeep(response.data)
        //       this.listData = response.data
        //     })
        // console.log('test')
        // this.$store.dispatch('getReasontype')

        // this.reasonTypeList()
        // window.location.reload()

      }


    },
    openDialog_(ref, value) {
      if (ref == 'add') {
        this.rt_code = '',
          this.rt_type = '',
          this.rt_description = '',
          this.rt_status = ''
        this.validInp = false
        this.rt_status = 1
        this.$refs["reasontype_add"].open();
      }
      if (ref == 'delete') {
        this.$refs["confirm_delete"].open();
      }
      if (ref == 'edit') {
        this.rt_id = value.id
        this.rt_code = value.code
        this.rt_type = parseInt(value.id_type)
        this.rt_description = value.description
        this.rt_status = value.status
        console.log(value.id_type)
        // this.$store.dispatch('updateReasontype', {
        //       id: value.id,
        //       code: this.rt_code,
        //       description: this.rt_description,
        //       damage: this.rt_type,
        //       status: this.rt_status
        //     });
        this.$refs["reasontype_update"].open();
      }
    },

    openDetail(value) {
      if (value == 'search') {

        service
          .searchReturnReasontype(this.rt_search)
          .then(response => {
            this.dataListSearch = _.cloneDeep(response.data)
            this.listData = response.data
          })

      }

    },
    selectUser(item) {
      console.log('Selected User:', item);

    },

    addLabel() {
      let theArray = this.$store.getters.corp_list2;
      if (theArray[theArray.length - 1].id != "new") {
        let theObject = {
          id: "new",
          corp_code: "",
          tagmodule: "",
          corp_name: "",
          status: false,
          mode: true,
          temp_corp_code: "",
          temp_corp_name: "",
          temp_tagmodule: "",
          active_edit_code: 'inactive',
          add_dup: false,
          btn_edit: false,
          check_row_edit: false
        };
        theArray.push(theObject);
        checkStatus = true;
        if (this.tempIndex != "default") {
          this.$store.getters.corp_list2[this.tempIndex].status = false;
        }
        if (theArray.length > 1) {
          this.tempIndex = theArray.length - 1;
        } else {
          this.tempIndex = 0;
        }

        setTimeout(() => {
          let btn = document.getElementById("row-" + this.tempIndex);

          let input = btn.childNodes[6].childNodes[0].childNodes[6];
          if (input != null) {
            checkStatus = true;
          }
        }, 150);
        checkStatus = false;
      }
    },
    outsideTable: function (e) {
      if (
        this.tempIndex != "default" &&
        checkStatus == true &&
        e.target.className != "md-button md-button-ghost md-theme-default" &&
        e.target.className != "md-dialog-container md-theme-default md-active" &&
        e.target.className != "md-dialog-content" &&
        e.target.className != "md-dialog" &&
        e.target.className != "md-dialog-actions" &&
        e.target.className != "md-button md-theme-default" &&
        e.target.className != "md-button md-primary md-theme-default" &&
        e.target.className != "md-dialog-title md-title"
      ) {
        let theObject = this.$store.getters.corp_list2[this.tempIndex];
        if (theObject.id == "new" && theObject.mode) {
          this.$store.getters.corp_list2.splice(
            this.$store.getters.corp_list2.length - 1,
            1
          );
          this.tempEdit = "default";
          this.tempIndex = "default";
          theObject.mode = false;
        } else if (typeof theObject.id == "number" && theObject.mode) {
          theObject.mode = false;
          this.checkStatus = false;
        }
      }
    }, outsideShowCust: function (e) {
      if (
        e.target.className != "md-input" &&
        e.target.className != "md-input earch-text" &&
        e.target.className != "md-input value-text"
      ) {
        this.shw_customer = false;
      }
    }, handleScroll(event) { },


    filterCustomer(param) {
      this.cusCode = param
      // if (_.trim(param).length > 0) {
      // this.$store.dispatch('searchCustomerMapping',{'corp_code':this.codeCorp, 'customer':''}  )
      // }else {
      // }
    },
    check_status(value) {

      if (value == 'all') {
        return ''
      } else if (value == 'active') {
        return '1'
      } else {
        return '0'
      }
    },
    chooseSales(value) {
      this.cusCode = value.customer_code
      this.customer_code = value.customer_code

    },
    clearSearch() {
      this.cusCode = ''
    },
    deleteStore(value) {
      let master = _.cloneDeep(this.tab3Row.arrChips)
      this.tab3Row.arrChips = _.filter(master, item => {
        return item.code != value.code
      })
    },
    chooesSalesman(value) {
      let master = _.cloneDeep(this.tab3Row.masterSmList)
      this.tab3Row.masterSmList = _.filter(master, item => {
        return item.code != value.code
      })
      this.tab3Row.arrChips.push(value)
    },

    sortData_MTT(param) {
      this.tempSort = this.tempSort == "ASC" ? "DESC" : "ASC";
      this.$store.dispatch('settingMttCustomer',
        {
          customer: '',
          feild: param,
          sorting: this.tempSort
        }
      )
    },
    keywordFilA(val) {
      this.mtt_search = val
      this.$store.dispatch('settingMttCustomer',
        {
          customer: val,
          feild: 'corp_name,customer_code',
          sorting: 'ASC'
        })
    },
    keywordCPR() {
      this.mtt_search = ""
      this.$store.dispatch('settingMttCustomer',
        {
          customer: '',
          feild: 'corp_name,customer_code',
          sorting: 'ASC'
        })
      // this.keyword = ''
      this.keyword = ''
    },
    addUser(row) {
      this.add_group_corp = row.code
      this.tab3Row.selected = row
      this.tab3Row.mode = 'add'
      this.addData()
    },
    expandChild(idx) {
      let key = idx + '-detail-box'
      let styleOld = document.getElementById(key).style.display
      if (styleOld === 'none') {
        document.getElementById(key).style.display = 'block'
      } else {
        document.getElementById(key).style.display = 'none'
      }
    },
    removeCorp(item) {
      this.$refs["confirm_delete"].open();
      this.corp_code = item.corp_code,
        this.customer_code = item.customer_code,
        this.type = 'remove'
    },

    selectType(value) {
      let status_to_api = ''
      if (value === 'active') {
        status_to_api = '1'
      } else if (value === 'inactive') {
        status_to_api = '0'
      } else {
        status_to_api = 'all'
      }
      console.log(status_to_api)
      // let select_status = {
      //   corp_code: '',
      //   status: status_to_api
      // }

      this.$store.dispatch('selectAllCustomer', status_to_api)
      this.$store.dispatch('selectAllProduct', status_to_api)


      this.btnType = value;
    },
    selectedTab(row) {
      this.activeTab = row.code
    },

    editRow(value, index) {

      let theOldObject = this.$store.getters.corp_list2[this.tempIndex];
      let theObject = this.$store.getters.corp_list2[index];
      theObject.btn_edit = true;

      let rs_check_edit = {
        type: 'status',
        corp_code_old: value.corp_code,
        corp_name_old: '',
        corp_code_new: '',
        corp_name_new: '',
        status: '',
        type: 'edit',
      }
      corporateManageService
        .settingSaveCorporateMaster(rs_check_edit)
        .then((response) => {

          if (response.data == 'inactive') {
            theObject.active_edit_code = 'inactive'

          } else {
            theObject.active_edit_code = 'active'
            theObject.check_row_edit = true
          }
        })
        .catch((error) => console.log("settingSaveCorporateMaster"));

      if (value.mode) {
        theObject.mode = false;
        theObject.temp_corp_code = "";
        theObject.temp_corp_name = "";
        // theObject.temp_tagmodule = "";
        // console.log("if => ");
        theOldObject.mode = false;
      } else {
        checkStatus = true;
        if (this.tempIndex == "default") {
          // console.log("else 1 => ");
          theObject.temp_corp_code = value.corp_code;
          theObject.temp_corp_name = value.corp_name;
          theObject.mode = true;
          this.tempMode = 'edit'
          this.tempIndex = index;

        } else if (
          this.tempIndex != index &&
          theOldObject.corp_code == theOldObject.temp_corp_code &&
          theOldObject.corp_name == theOldObject.temp_corp_name &&
          theOldObject.id != "new"
        ) {
          // console.log("else 2 => ");
          // close old row
          theOldObject.temp_corp_code = "";
          theOldObject.temp_corp_name = "";
          theOldObject.mode = false;
          theOldObject.btn_edit = false;
          // open new row
          theObject.temp_corp_code = value.corp_code;
          theObject.temp_corp_name = value.corp_name;
          // theObject.temp_tagmodule = value.tagmodule;
          theObject.mode = true;
          theObject.btn_edit = true;

          this.tempIndex = index;
        } else if (this.tempIndex == index) {

          theObject.temp_corp_code = value.corp_code;
          theObject.temp_corp_name = value.corp_name;
          theObject.mode = true;
          this.tempIndex = index;
          // console.log("else 3 => ");
        } else if (theOldObject.id == "new") {
          this.$store.getters.corp_list2.splice(
            this.$store.getters.corp_list2.length - 1,
            1
          );
          this.tempEdit = index;
          this.tempIndex = "default";
          // console.log("else 4 => ");
        } else {
          // console.log("else 5 => ");
          this.tempEdit = index;
          this.tempMode = "edit";
          this.ques = "Do you want to leave row?";
          this.ans = "Changes might not be saved.";
          this.openDialog_corpMaster(value, index, "edit");
        }
      }
    },
    addData() {

      this.keywordCPR()
      this.$refs['details-dialog'].open()
    },
    openDialog() {
      this.$refs['confirm-dialog'].open()
    },
    closeAllCust() {
      this.$refs['details-dialog'].close()
    },
    closeDialog() {
      this.$refs['confirm-dialog'].close()
    },

    closeDialog_master(mode) {
      this.btn_dialog = "SAVE"
      //  console.log("A",mode,this.tempMode)
      let theObject = this.$store.getters.corp_list2[this.tempIndex];
      let theNewObject = this.$store.getters.corp_list2[this.tempEdit];
      if (mode == "save") {
        if (this.tempMode == "edit") {
          // console.log("if 1====> save to DB");
          let edit = {
            type: 'edit',
            corp_code_new: theObject.temp_corp_code,
            corp_name_new: theObject.temp_corp_name,
            corp_code_old: theObject.corp_code,
            corp_name_old: theObject.corp_name,
            status: theObject.status == true ? 1 : 0
          }
          // console.log('EDIT => ',edit)
          corporateManageService
            .settingSaveCorporateMaster(edit)
            .then((response) => {
              // console.log('settingSaveCorporateMaster Res => ',response)
              if (response.data === 'error duplicate') {
                theObject.mode = true
                theObject.add_dup = true
              } else {
                var render_status = this.check_status(this.btnType)
                this.$store.dispatch('selectAllCorporate', { 'corp_code': '', 'status': render_status })
                theObject.mode = false
                theObject.add_dup = false
                this.$store.dispatch('settingCustomerMapping', { 'corp_code': '', 'customer': '' })
              }
            })
            .catch((error) => console.log("settingSaveCorporateMaster"));
          theObject.mode = false;
        } else if (this.tempMode == "active") {
          let rs_active = {
            type: 'status',
            corp_code_old: theObject.corp_code,
            corp_name_old: theObject.corp_name,
            corp_code_new: '',
            corp_name_new: '',
            status: theObject.status ? 1 : 0,
          }
          this.$store.dispatch('settingSaveCorporateMaster', rs_active)
          var render_status = this.check_status(this.btnType)
          this.$store.dispatch('selectAllCorporate', { 'corp_code': '', 'status': render_status })
          console.log("if 2====> save to DB", rs_active);
        } else if (this.tempMode == "all") {
          theObject.temp_corp_code = theObject.temp_corp_code;
          theObject.temp_corp_name = theObject.temp_corp_name;
          // console.log("if 3====> save to DB",theObject);
          let rs_add = {
            type: 'add',
            corp_code_new: theObject.temp_corp_code,
            corp_name_new: theObject.temp_corp_name,
            corp_code_old: '',
            corp_name_old: '',
            status: theObject.status ? '1' : '0'
          }
          // console.log(rs_add)
          corporateManageService
            .settingSaveCorporateMaster(rs_add)
            .then((response) => {
              // console.log('settingSaveCorporateMaster',response)

              if (response.data === 'insert success') {
                var render_status = this.check_status(this.btnType)
                this.$store.dispatch('selectAllCorporate', { 'corp_code': '', 'status': render_status })
                theObject.mode = false
                theObject.add_dup = false
                this.$store.dispatch('settingCustomerMapping', { 'corp_code': '', 'customer': '' })
              } else {

                theObject.mode = true
                theObject.add_dup = true
              }
              // this.$store.dispatch('selectAllCorporate', '')
            })
            .catch((error) => console.log("settingSaveCorporateMaster"));
          // theObject.tagmodule = theObject.temp_tagmodule;

        } else if (this.tempMode == "delete") {
          let rs_delete = {

            type: 'delete',
            corp_code_old: theObject.corp_code,
            corp_name_old: theObject.corp_name,
            corp_code_new: '',
            corp_name_new: '',
            status: ''
          }
          corporateManageService
            .settingSaveCorporateMaster(rs_delete)
            .then((response) => {
              // console.log('settingSaveCorporateMaster Res => ',response)
              if (response.data == 'active') {
                this.$refs.snackbar.open()

              } else {
                var render_status = this.check_status(this.btnType)
                this.$store.dispatch('selectAllCorporate', { 'corp_code': '', 'status': render_status })
                this.$store.dispatch('settingCustomerMapping', { 'corp_code': '', 'customer': '' })
              }
            })
            .catch((error) => console.log("settingSaveCorporateMaster"));
          // console.log(theObject)
          // console.log('Delete')

        }

        this.tempIndex = "default"
        // this.$store.dispatch("saveLabel", {
        //   taglabel: theObject.taglabel,
        //   tagname: theObject.tagname,
        //   tagmodule: theObject.tagmodule,
        //   id: theObject.id == "new" ? 0 : theObject.id,
        //   status: theObject.tagstatus,
        //   mode: this.tempMode,
        //   type: this.btnType,
        //   sort: this.btnSort,
        //   orderby: this.tempSort,
        //   start_row: 0
        // });
      } else {
        if (this.tempMode == "edit") {
          // console.log("else 1====>");
        } else if (this.tempMode == "active") {
          theObject.status = !theObject.status;
        } else if (this.tempMode == "all") {
          theObject.mode = false;
        }
      }
      // console.log(theObject)
      theObject.mode = false;
      this.$refs["confiem-dialog"].close();
      this.$refs["confiem-dialog-delete"].close();
    },
    set_corporate: function (data) {
      this.corp_all = data.corp_name
      this.select_api = data.corp_code
    }, search_corp() {
      this.check_search = this.select_api
      this.$store.dispatch('settingCustomerMapping', { 'corp_code': this.select_api, 'customer': this.cusCode })
    },
    searchUser(value) {
      // var render_status = this.check_status(this.btnType)
      // this.$store.dispatch('selectAllCorporate_search', { 'corp_code': value, 'status': render_status })
    },
    shw_customer() { },
    chooseMaster(value) {
      // console.log(value)
    },

    chooseCustByAll: function (param) {
      var rs = {}
      if (param.corp_code == '') {
        rs = {
          'corp_code': this.add_group_corp,
          'customer_code': param.customer_code,
          'type': 'add',
          'check_search': this.check_search,
          'mtt_search': this.mtt_search
        }
        this.$store.dispatch('settingAddRemoveCustomerMapping', rs)
        // console.log("Add => ", rs)
      } else {
        // console.log("No Add => ", param.corp_code , param.customer_code , this.add_group_corp)
      }
    },

    openDialog_corpMaster(value, index, mode) {
      if (mode == 'delete') {
        this.btn_dialog = "DELETE"
        this.tempIndex = index;
        this.tempMode = mode;
        this.selectRow = value;
        this.$refs["confiem-dialog-delete"].open();
        this.ques = "";
        this.ans = "Do you want to delete?";
      } else

        // console.log("openDialog => ");
        if (mode == "active") {
          // console.log("status1")
          this.tempIndex = index;
          this.tempMode = mode;
          this.selectRow = value;
          this.ques = "Do you want save Corporate?";
          let status = value.status ? "active " : "inactive";
          this.ans = "The status will change to " + status + ".";
        } else if (mode == "all") {

          this.tempIndex = index;
          this.tempMode = mode;
          this.selectRow = value;
          this.ques = "Do you want to save?";
          this.ans = "";
        } else if (mode == "edit") {
          // console.log("EDIYTT")
          this.tempIndex = index;
          this.tempMode = mode;
          this.selectRow = value;
          this.ques = "Do you want to edit?";
          this.ans = "";
        }
      let theObject = this.$store.getters.corp_list2[index];

      if (mode == "all" && theObject.mode == true) {
        if (theObject.temp_corp_code.trim().length == 0) {

          theObject.temp_corp_code = "";
          this.inp_code = true;
        } else if (theObject.temp_corp_name.trim().length == 0) {
          theObject.temp_corp_name = "";
          this.inp_name = true;
        } else {
          this.$refs["confiem-dialog"].open();
        }
      } else if (mode == "active" && theObject.mode == false) {
        this.$refs["confiem-dialog"].open();
      } else if (mode == "edit") {
        // console.log(mode);
        this.$refs["confiem-dialog"].open();
      }
    },
  },
  created() {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
      this.$store.dispatch('settingCustomerMapping', { 'corp_code': '', 'customer': '' })
      this.$store.dispatch('searchCustomerMapping', { 'corp_code': '', 'customer': '' })
      this.$store.dispatch('selectAllCorporate', { 'corp_code': '', 'status': 1 })
      this.$store.dispatch('setPathMenuService', 'setting')
      this.$store.dispatch('settingMttCustomer',
        {
          customer: '',
          feild: 'corp_name,customer_code',
          sorting: 'ASC'
        })

      this.login = true

      service
        .getReturnReasontype()
        .then(response => {
          this.dataListSearch = _.cloneDeep(response.data)
          this.listData = response.data
        })

      // console.log("setting => ",this.$store.getters.customer_setting)
    }
  },
  directives: {
    "click-outside": {
      bind: function (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${binding.expression
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
      unbind: function (el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  },

  components: {
    'menu-header': require('../Salesops/layout/menu-top'),
    'menu-left': require('../Salesops/layout/menu-left'),
    'md-search-box-dg': require('../Salesops/customComponent/md-search-box-dg'),
    'md-search-box': require('../Salesops/customComponent/md-cpr-search-box'),
    "md-dropdown-box": require("../Salesops/customComponent/mde-dropdown-box.vue"),
    // "md-fasttrack-view": require("../Salesops/customComponent/md-fasttrack-view.vue"),


  }
}
</script>
<style lang="scss" scoped>
#pageMenuManagement {
  .head-table {
    font-weight: 600;
    font-size: 18px !important;

    .head-table-tab {
      margin-right: 7%;
      max-width: 200px;
      text-align: left;
      cursor: pointer;
    }

    .active {
      border-bottom-style: solid;
      border-bottom-color: #fd7f00;
    }
  }

  .body-deatil {
    overflow-x: hidden !important;
    margin-top: 20px;
    max-height: calc(100vh - 225px) !important;
    font-family: lato;

    .parent-menu {
      text-align: left;
      font-weight: 700;
      padding-top: 12px;
      padding-bottom: 10px;
    }

    .child-menu {
      text-align: left;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .mds-icon {
      cursor: pointer;
      padding: 2px;
      background: #efefef;
      width: 30px;
      text-align: center;
      padding-top: 2px;
      border-radius: 4px;

      .md-icon {
        color: rgb(121, 121, 121);
        font-size: 19px;
      }
    }

    .hover-icon {
      .md-icon {
        color: white;
      }
    }

    .hover-icon:hover {
      .md-icon {
        color: black;
      }
    }

    .title-hover {
      cursor: pointer;
    }

    .title-hover:hover {
      cursor: pointer;
      color: #fd7f00;
    }
  }

  /* START CUSTOM CHECKBOX */
  .-salesops-checkbox-container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .-salesops-checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .-salesops-checkbox {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #fff;
    border: 1.5px solid #a8a8a8;
    border-radius: 3px;
  }

  .-salesops-checkbox-container:hover input~.-salesops-checkbox {
    background-color: #ccc;
  }

  .-salesops-checkbox-container input:checked~.-salesops-checkbox {
    background-color: #ff9800;
    border-color: #ff9800;
  }

  .-salesops-checkbox:after {
    content: '';
    position: absolute;
    display: none;
  }

  .-salesops-checkbox-container input:checked~.-salesops-checkbox:after {
    display: block;
  }

  .-salesops-checkbox-container .-salesops-checkbox:after {
    left: 6px;
    top: 1px;
    width: 5px;
    height: 13px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  /* END CUSTOM CHECKBOX */
}
</style>
