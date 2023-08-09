<template>
  <div id="pageDepartment">
    <md-layout md-gutter class="mh-0">
      <md-layout md-column md-gutter md-flex="25">
        <menu-left></menu-left>
      </md-layout>

      <md-layout md-column md-gutter md-flex="75" style="padding-left: 4%">
        <md-layout style="flex: initial"
          ><div class="title">{{ title }}</div></md-layout
        >
        <md-layout
          style="flex: initial; margin-left: 2%; margin-right: 5%"
          class="search-cust-box"
        >

        <div style="margin:0 5px 0 0;width: 15%;"> 
          <md-dropdown-box style="max-height: 35.5px;" @choose="set_type" :data="this.type_search"  v-model="data_type_search"></md-dropdown-box>
        </div>
          <div 

          @mouseleave="outsideShowSearcgh"
          style="margin:0 5px 0 0;width: 24%">
            <md-input-container class="-no-line -search" style="margin: 0px">
              <md-icon class="mr-5">
                search <md-tooltip>search</md-tooltip></md-icon
              >
              <md-input
                id="input-search"
                placeholder="Search"
                :class="ipt_search == 'Search' ? 'earch-text' : 'value-text'"
                v-on:change="searchCustomer"
                :v-model="ipt_search"
                @focus.native="$event.target.select()"
              ></md-input>
              <div v-if="ipt_search != ''"  @click="clear_search" >
               <md-icon style="cursor: pointer;display: flex;font-size:18px" class="mr-5">
                clear <md-tooltip>clear</md-tooltip></md-icon
              >
              </div>
            </md-input-container>
            
          </div>
          <div style="width: 55%" class="md-report-bar">
            <div style="width: 100%; display: flex">
              <div style="padding-left: 22px; width: 35%">
                <div
                  :class="btnType == 'all' ? 'title-text active' : 'title-text'"
                  @click="selectType('all')"
                >
                  ALL ROLE
                </div>
                <div class="title-number">
                  {{ formatNumber($store.getters.role_all_ALLSTATUS) }}
                </div>
              </div>
              <div style="width: 35%">
                <div
                  :class="
                    btnType == 'active' ? 'title-text active' : 'title-text'
                  "
                  @click="selectType('active')"
                >
                  ACTIVE
                </div>
                <div class="title-number">
                  {{ formatNumber($store.getters.role_ACTIVE) }}
                </div>
              </div>
              <div style="width: 30%">
                <div
                  :class="
                    btnType == 'inactive' ? 'title-text active' : 'title-text'
                  "
                  @click="selectType('inactive')"
                >
                  INACTIVE
                </div>
                <div class="title-number">
                  {{ formatNumber($store.getters.role_INACTIVE) }}
                </div>
              </div>
            </div>
          </div>

          <div style="paddimg-left:0;align-items: left;width:5%">
            <svg class="add-btn"  @click="openDialog(null, null)"  id="Search_Button" data-name="Search Button" xmlns="SVG namespace" width="36" height="36" viewBox="0 0 36 36">
            <rect id="Rectangle_518" data-name="Rectangle 518" width="36" height="36" rx="3" fill="#fd7f00" opacity="0.9"/>
            <g id="ic_add" transform="translate(6 6)">
            <rect id="rectangle" width="24" height="24" fill="none"/>
            <path id="path" d="M11,5v6H5v2h6v6h2V13h6V11H13V5Z" fill="#fff" fill-rule="evenodd"/>
            </g>
            </svg>
          </div>

        </md-layout>
        <md-spinner
          :md-size="150"
          :md-stroke="1"
          v-show="$store.getters.custm_spinner_loading"
          md-indeterminate
        ></md-spinner>
        <md-layout
          style="margin-right: 5%;flex:initial;margin-left:2%"
          md-align="center"
          class="cust-list-box"
          v-if="dataList.length == 0"
        >
          <span class="nodata">No data</span>
        </md-layout>
        <md-layout
          style="flex: initial; margin-left: 2%; margin-right: 5%"
          class="cust-list-box"
          v-else
        >
          <div class="head-table">
            <div
              :class="btnSort == 'code' ? 'active' : ''"
              style="
                width: 15%;
                text-align: left;
                cursor: pointer;
                font-weight: 500;
              "
              @click="sortData('code')"
            >
              Role Code
            </div>
            <div
              :class="
                btnSort == 'description'
                  ? 'column-province active'
                  : 'column-province'
              "
              style="
                width: 35%;
                text-align: left;
                cursor: pointer;
                font-weight: 500;
              "
              @click="sortData('description')"
            >
              Description
            </div>
            <div
              :class="
                btnSort == 'parent'
                  ? 'column-province active'
                  : 'column-province'
              "
              style="
                width: 15%;
                text-align: left;
                cursor: pointer;
                font-weight: 500;
              "
              @click="sortData('parent')"
            >
              Parent Code
            </div>
            <div
              :class="
                btnSort == 'source'
                  ? 'column-province active'
                  : 'column-province'
              "
              style="
                width: 15%;
                text-align: left;
                cursor: pointer;
                font-weight: 500;
              "
              @click="sortData('source')"
            >
              Source
            </div>
            <div
              :class="btnSort == 'status' ? 'active' : ''"
              style="width: 10%; cursor: pointer; font-weight: 500"
              @click="sortData('status')"
            >
              Status
            </div>
            <div style="width: 10%"></div>
          </div>
          <div
            class="body-deatil"
            @scroll="handleScroll"
            :style="{
              'padding-right': dataList.length > 1 ? '48px' : '60px',
              'overflow-y': dataList.length > 1 ? 'scroll' : 'hidden',
            }"
          >
            <div
              class="detail-table"
              :style="{
                'padding-bottom': '13px',
                'padding-top': index == 0 ? '15px' : '0px',
              }"
              v-for="(item, index) in dataList"
              :key="index"
            >
              <div style="width: 15%; text-align: left">
                {{ item.code }}
              </div>
              <div style="width: 35%; text-align: left">
                {{ item.description }}
              </div>
              <div style="width: 15%; text-align: left">
                {{ item.parent }}
              </div>
              <div class="column-province" style="width: 15%">
                {{ item.source }}
              </div>
              <div style="width: 10%">
                <md-avatar
                  v-if="item.status == 1"
                  class="md-avatar-icon -green _icon-status"
                ></md-avatar>
                <md-avatar
                  v-else
                  class="md-avatar-icon -red _icon-status"
                ></md-avatar>
              </div>
              <div style="width: 10%" @click="openDialog(item, index)">
                <div class="md-avatar md-avatar-icon">
                  <md-icon style="color: #797979">edit</md-icon>
                </div>
              </div>
            </div>
          </div>
        </md-layout>
      </md-layout>
    </md-layout>

    
    <md-dialog
      md-open-from="#fab"
      md-close-to="#fab"
      ref="confirm_delete_last"
      id="reject_delete"
    >
      <md-dialog-content
        >ไม่สามารถลบข้อมูลนี้ได้ เนื่องจากมีการเรียกใช้งาน</md-dialog-content
      >
      <div class="content">{{ this.used }}</div>
       <div class="content">{{ this.used_parent }}</div>
      <md-dialog-actions>
        <md-button @click="confirm_close('cancel_delete_last')">
          <label style="color: #fd7f00">OK</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>



    <md-dialog
      md-open-from="#fab"
      md-close-to="#fab"
      ref="confirm_delete"
      id="duplicate"
    >
      <md-dialog-content> Do you want to delete? </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="confirm_close('cancel_delete')">
          <label style="color: ##a8a8a8">CENCEL</label>
        </md-button>
        <md-button @click="confirm_close('delete')">
          <label style="color: #fd7f00">DELETE</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog
      md-open-from="#fab"
      md-close-to="#fab"
      ref="confirm_save"
      id="duplicate"
    >
      <md-dialog-content> Do you want to save? </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="confirm_close('cancel_save')">
          <label style="color: ##a8a8a8">CENCEL</label>
        </md-button>
        <md-button @click="confirm_close('save')">
          <label style="color: #fd7f00">SAVE</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog
      md-open-from="#fab"
      md-close-to="#fab"
      ref="confirm_close"
      id="duplicate"
    >
      <md-dialog-content> Do you want to close? </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="confirm_close('cancel')">
          <label style="color: ##a8a8a8">CENCEL</label>
        </md-button>
        <md-button @click="confirm_close('close')">
          <label style="color: #fd7f00">CLOSE</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog
      md-open-from="#fab"
      md-close-to="#fab"
      ref="duplicate"
      id="duplicate"
    >
      <md-dialog-content> Role Code ซ้ำ กรุณาตรวจสอบ </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="closeDialog('duplicate')">
          <label style="color: #fd7f00">OK</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog
      md-open-from="#fab"
      md-close-to="#fab"
      ref="department"
      id="pageroleDialog"
    >
      <md-dialog-title>
        <md-layout>
          <md-layout
            md-flex="90"
            style="display: -webkit-box; overflow: hidden"
          >
            <div class="title">Role Details</div>
          </md-layout>
          <md-layout md-flex="10" md-align="end">
            <md-button class="md-icon-button" @click="open_dialog('close')">
              <md-icon>close</md-icon>
              <md-tooltip md-direction="right">close</md-tooltip>
            </md-button>
          </md-layout>
        </md-layout>
      </md-dialog-title>
      <md-dialog-content style="height: 390px">
        <div style="padding-left: 5%; padding-right: 5%">
          <md-input-container style="margin-bottom: 7px">
            <label>Role Code</label>
            <md-input
              v-model="ipt_code"
              @keypress.native="keySpecial"
              :disabled="ipt_rolecode"
            ></md-input>
            <div
              class="md-error"
              style="bottom: -25px; opacity: inherit; color: #f44336"
              v-if="(ipt_code == '' || ipt_code == null) && validInp"
            >
              {{ warningText }}
            </div>
          </md-input-container>
          <md-input-container style="margin-bottom: 7px">
            <label>Description</label>
            <md-input
              v-model="ipt_description"
              @keypress.native="keySpecial"
            ></md-input>
            <div
              class="md-error"
              style="bottom: -25px; opacity: inherit; color: #f44336"
              v-if="
                (ipt_description == '' || ipt_description == null) && validInp
              "
            >
              {{ warningText }}
            </div>
          </md-input-container>
          
          <div style="margin-top: 25px; display: flex">
            <div style="width: 10%;padding-top: 5px;"> 
              <input
                type="checkbox"
                style="height: 20px; width: 20px"
                v-model="ipt_root"
                @change="setRoot($event)"
              /> </div>
            <div style="width: 25%;padding-top: 8px; color: #727272;">  Parent Code </div>
          <div style="width: 65%;">
             <div
              class="search-cust-box"
              style="width: 100%"
              @mouseleave="outsideShowCustDP"
            >
             <md-input-container class="-no-line -search" style="margin: 0px;">
                <md-input
                  :disabled="!ipt_root"
                  :class="
                    ipt_departant == 'Select Parent'
                      ? 'earch-text'
                      : 'value-text'
                  "
                  placeholder="Select Parent"
                  v-on:change="searchCustomer"
                  @focus="showAutocom"
                  :value="ipt_departant"
                  @focus.native="$event.target.select()"
                ></md-input>
                <md-icon
                  v-if="ipt_departant != ''"
                  class="ml-0"
                  @click.native="clearParent"
                  :style="{ cursor: 'pointer' }"
                  style="font-size:18px;display: flex;"
                >
                  clear</md-icon
                >
              <md-icon
                  class="ml-0"
                  @click.native="openAutoCom"
                  :style="{ cursor: ipt_root ? 'default' : 'pointer' }"
                >
                  arrow_drop_down</md-icon
                >
                <!-- <md-icon
                  class="ml-5"
                  @click.native="openAutoCom"
                  :style="{ cursor: ipt_root ? 'default' : 'pointer' }"
                >
                  arrow_drop_down</md-icon
                > -->
              </md-input-container>
              <md-card
                v-if="shw_autocom"
                id="style-scroll"
                style="max-height: 190px;"
              >
                <ul class="md-list" v-if="dataListSearch.length > 0">
                  <li
                    class="md-list-item"
                    v-for="(item, index) in dataListSearch"
                    :key="index"
                  >
                    <div
                      class="md-list-item-text"
                      @click="selectDepartDP(item)"
                    >
                      {{ item.code }} :
                      <span class="kanitFont"> {{ item.title }}</span>
                    </div>
                  </li>
                </ul>
                <ul class="md-list" v-else>
                  <li
                    class="md-list-item"
                    style="padding-top: 25px; text-align: center"
                  >
                    No data...
                  </li>
                </ul>
              </md-card>
            </div>
          </div>
          </div>
          <div
            class="md-error"
            style="bottom: -25px; opacity: inherit; color: #f44336"
            v-if="(ipt_departant == '' || ipt_departant == null) && validInp"
          >
            {{ warningText }}
          </div>
          <div
            class="md-error"
            style="bottom: -25px; opacity: inherit; color: #f44336"
            v-if="(ipt_action_log == '' || ipt_action_log == null) && validInp"
          >
            {{ warningText }}
          </div>

      <div style="display: flex; width: 100%">
            <div style=" width: 40%">
              <md-radio v-model="ipt_status_approve" md-value="0" class="md-warn"
                >  Disapprove (CHN)</md-radio
              >
            </div>
            <div style="padding-left: 3%; width: 60%">
              <md-radio
                v-model="ipt_status_approve"
                md-value="1"
                class="md-warn"
                style="margin-left: 15%"
                >Approve (CHN)  </md-radio
              >
            </div>
          </div>


          <div style="display: flex; width: 100%">
            <div style="padding-right: 3%; width: 40%">
              <md-radio style="margin:0 0 0 0;" v-model="ipt_status" md-value="1" class="md-warn"
                >Active</md-radio
              >
            </div>
            <div style="padding-left: 3%; width: 60%">
              <md-radio
                v-model="ipt_status"
                md-value="0"
                class="md-warn"
                style="margin:0 0 0 0;margin-left: 15%"
                >Inactive</md-radio
              >
            </div>
          </div>
          <div style="display: flex; width: 100%">
            <div style="padding-right: 8%; width: 50%">
              <md-input-container style="margin-bottom: 7px">
                <label>Source</label>
                <md-input
                  v-model="ipt_source"
                  @keypress.native="keySpecial"
                  :disabled="true"
                ></md-input>
                <div
                  class="md-error"
                  style="bottom: -25px; opacity: inherit; color: #f44336"
                  v-if="(ipt_source == '' || ipt_source == null) && validInp"
                >
                  {{ warningText }}
                </div>
              </md-input-container>
            </div>
            <div style="padding-right: 8%; padding-left: 3%; width: 50%">
              <md-input-container style="margin-bottom: 7px">
                <label>Action log</label>
                <md-input
                  v-model="ipt_action_log"
                  :disabled="true"
                  @keypress.native="keySpecial"
                ></md-input>
                <div
                  class="md-error"
                  style="bottom: -25px; opacity: inherit; color: #f44336"
                  v-if="
                    (ipt_action_log == '' || ipt_action_log == null) && validInp
                  "
                >
                  {{ warningText }}
                </div>
              </md-input-container>
            </div>
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button
          v-if="btndelete"
          class="md-raised md-button-delete"
          @click="open_dialog('delete')"
        >
          <label>DELETE</label>
        </md-button>

        <md-button
          class="md-raised md-button-cancel"
          @click="open_dialog('close')"
        >
          <label>CANCEL</label>
        </md-button>
        <md-button
          class="md-raised md-button-save"
          @click="open_dialog('save')"
        >
          <label>SAVE</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import ClickOutside from "vue-click-outside";
import rolemanagement from "@/services/core/rolemanagement";
export default {
  name: "tripplan-custmanege",
  data() {
    return {
      title: "ROLE MANAGEMENT",
      ipt_search: "",
      shw_customer: false,
      btnType: "all",
      btnSort: "code",
      btndelete: false,
      ipt_searc_code: "",
      ipt_code: "",
      ipt_description: "",
      ipt_source: "",
      ipt_action_log: "DHAS",
      ipt_status: 1,
      ipt_status_approve:1,
      approve_status:'0',
      ipt_root: false,
      ipt_departant: "",
      ipt_rolecode: false,
      ipt_departantFull: "",
      shw_autocom: false,
      validInp: false,
      warningText: "Please input data",
      tempSort: "ASC",
      dataListTemp: [],
      dataListSearch: [],
      type_save: "",
      child_code: "",
      id_save: 0,
      duplicate: false,
       used: "",
      used_parent: "",
      used_status: "",
      data_type_search:'Role Code',
      type_search:[
        {code: "role", title: "Role Code" },
        {code: "parent", title: "Parent Code" }
      ]
      
    };
  },
  computed: {
    dataList() {
      this.dataListSearch = this.$store.getters["roleDataListSearch"];
      this.dataListTemp = this.$store.getters["roleDataList"];
      return this.$store.getters["roleDataList"];
    },
    dataList_full(){
      //  this.dataListTemp = this.$store.getters["dataList_full"];
      return this.$store.getters["dataList_full"];
    }
  },
  methods: {
    outsideShowSearcgh:function(){
      this.shw_customer = false;
    },
    showSearch() {
      // if (this.shw_customer) {
      //   this.shw_customer = false;
      // } else {
      //   this.shw_customer = true;
      // }
    },
    set_type(){
     
      document.getElementById('input-search').value = null
     this.$store.dispatch("settingRoleSearch", {
        code: "",
        type: this.btnType,
        sort: "",
        orderby: "asc",
      });
    
    },
    sortData(value) {
      this.btnSort = value;
      this.tempSort = this.tempSort == "ASC" ? "DESC" : "ASC";
      if(value == 'code'){
          if(this.tempSort == 'ASC'){
             this.dataListTemp.sort((a, b) => (String((b.code)) < String((a.code)))  ? -1 : 1 )
           }else {
             this.dataListTemp.sort((a, b) => (String((b.code)) < String((a.code)))  ? 1 : -1 )
          }
      }
      if(value == 'description'){
          if(this.tempSort == 'ASC'){
             this.dataListTemp.sort((a, b) => (String((b.description)) < String((a.description)))  ? -1 : 1 )
           }else {
             this.dataListTemp.sort((a, b) => (String((b.description)) < String((a.description)))  ? 1 : -1 )
          }
      }
      if(value == 'parent'){
          if(this.tempSort == 'ASC'){
             this.dataListTemp.sort((a, b) => (String((b.parent)) < String((a.parent)))  ? -1 : 1 )
           }else {
             this.dataListTemp.sort((a, b) => (String((b.parent)) < String((a.parent)))  ? 1 : -1 )
          }
      }
      if(value == 'source'){
          if(this.tempSort == 'ASC'){
             this.dataListTemp.sort((a, b) => (String((b.source)) < String((a.source)))  ? -1 : 1 )
           }else {
             this.dataListTemp.sort((a, b) => (String((b.source)) < String((a.source)))  ? 1 : -1 )
          }
      }
      if(value == 'status'){
          if(this.tempSort == 'ASC'){
             this.dataListTemp.sort((a, b) => (String((b.status)) < String((a.status)))  ? -1 : 1 )
           }else {
             this.dataListTemp.sort((a, b) => (String((b.status)) < String((a.status)))  ? 1 : -1 )
          }
      }
    },
    searchCustomer: function (param) {
      this.ipt_search = param
      // this.shw_autocom = true;
      if (param.length > 1) {
     if(this.data_type_search == 'Role Code'){
             let temp = [];
        _.forEach(this.dataList_full, function (row, key) {
          let str = row.code + row.description + row.source;
          if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1) {
            row.title = row.description;
            temp.push(row);
          }
        });
        this.dataListSearch = temp;
        this.$store.commit('SET_DATA_ROLE_SEARCH', temp)
      }else {

        let temp = [];
        _.forEach(this.dataList_full, function (row, key) {
          let str = row.parent;
          if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1) {
            row.title = row.description;
            temp.push(row);
          }
        });
        this.dataListSearch = temp;
        this.$store.commit('SET_DATA_ROLE_SEARCH', temp)

      }

      } else if (param.length == 0) {
        this.ipt_departant = "";
        this.$store.dispatch("settingRoleSearch", {
          code: param,
          type: this.btnType,
          sort: "",
          orderby: "asc",
        });
        this.dataListTemp = this.dataListSearch;
      }
    },
    selectCustomer(value) {
      this.shw_customer = false;
      this.ipt_search = value.code + " " + value.title;
      this.$store.dispatch("settingRoleSearch", {
        code: value.code,
        type: "",
        sort: "",
        orderby: "asc",
      });
    },
    selectDepartDP(value) {
      this.child_code = value.code;
      this.shw_autocom = false;
      this.ipt_departant = value.code + " " + value.title;
      this.ipt_departantFull = value;
    },
    openAutoCom() {
      if (this.ipt_root) {
        this.shw_autocom = !this.shw_autocom;
      }
    },
    clearParent(){
      this.ipt_departant = ''
      this.ipt_departant
      console.log('clearParent')
    },
    clear_search(){
      this.ipt_search = ''
      document.getElementById('input-search').value = null
       this.$store.dispatch("settingRoleSearch", {
          code: "",
          type: this.btnType,
          sort: "",
          orderby: "asc",
        });
    },
    showAutocom: function (param) {
      this.shw_autocom = true;
      if (param.length > 1) {
        this.validInp = true;
        let temp = [];
        _.forEach(this.dataListTemp, function (row, key) {
          let str = row.code + row.description + row.source;
          if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1) {
            temp.push(row);
          }
        });
        this.dataListSearch = temp;
      } else if (param.length == 0) {
        this.validInp = false;
        this.$store.dispatch("settingRoleSearch", {
          code: "",
          type: "",
          sort: "",
          orderby: "asc",
        });
        this.dataListSearch = this.dataListTemp;
      }
    },
    selectType(value) {
      document.getElementById('input-search').value = null
      this.$store.dispatch("settingRoleSearch", {
        code: "",
        type: value,
        sort: "",
        orderby: "asc",
      });
      this.btnType = value;
    },
    setRoot(e) {
      // if (this.ipt_root) {
      this.ipt_departant = "";
      // }
    },
    saveData() {
      // console.log(this.child_code);
      if (
        this.child_code.trim().length == 0 && this.ipt_root == true  ||
        this.ipt_code.trim().length == 0 ||
        this.ipt_description.trim().length == 0 ||
        this.ipt_source.trim().length == 0 ||
        this.ipt_action_log.trim().length == 0 ||
        (this.ipt_root == true && this.ipt_departant.trim().length == 0)
      ) {
        this.validInp = true;
      } else {
        this.validInp = false;
        let rs = {
          type: this.type_save == "add" ? "add" : "edit",
          code: this.ipt_code,
          description: this.ipt_description,
          source: this.ipt_source,
          action_log: this.ipt_action_log,
          status: this.ipt_status == 0 ? false : true,
          status_approve: this.ipt_status_approve == 0 ? false : true,
          root: this.ipt_root,
          child_dep: this.child_code,
          parent: this.ipt_root ? this.ipt_root : this.ipt_departantFull.code,
          id: this.id_save,
        };
        rolemanagement
          .settingSaveRole(rs)
          .then((response) => {
            // console.log(response);
            if (response.body.duplicate) {
              //no Action  ( Duplicate )
              this.$refs["duplicate"].open();
              console.log("Duplicate");
            } else {
              console.log("success");
              this.$refs["department"].close();
              //close Popup is success
            }
            this.$store.dispatch("settingCountRole");
            let theObject = {
              code: "",
              type: "",
              sort: "",
              orderby: "",
            };
            this.$store.dispatch("settingRoleSearch", theObject);
          })
          .catch((error) => console.error("error => settingSaveRole"));
      }
    },
    delete_role() {
      let rs = {
        type: "delete",
        code: this.ipt_code,
        description: this.ipt_description,
        source: this.ipt_source,
        action_log: this.ipt_action_log,
        status: this.ipt_status == 0 ? false : true,
        status_approve: this.ipt_status_approve == 0 ? false : true,
        root: this.ipt_root,
        child_dep: this.child_code,
        parent: this.ipt_root ? this.ipt_root : this.ipt_departantFull.code,
        id: this.id_save,
      };

      this.$store.dispatch("settingSaveRole", rs);
      this.$refs["confirm_delete"].close();
      this.$refs["department"].close();
    },
    handleScroll(event) {
      // if (
      //   event.target.scrollHeight - event.target.clientHeight ==
      //     event.target.scrollTop &&
      //   this.$store.getters.custm_deatil_list.length <
      //     this.$store.getters.custm_all_cust
      // ) {
      //   this.$store.commit('SET_CUSTM_LOADING', false)
      //   this.$store.dispatch('getCustomerList', {
      //     customer_code: '',
      //     type: this.btnType,
      //     sort: this.btnSort,
      //     start_row: this.$store.getters.custm_deatil_list.length,
      //     orderby: this.tempSort
      //   })
      // }
    },
    openDialog(value, index) {
      this.shw_autocom = false;
      if (value != null) {
        this.btndelete = true;
        this.type_save = "edit";
        this.ipt_rolecode = true;
         this.used = value.used;
        this.used_parent = value.used_parent;
        this.used_status = value.used_status;

         let child = _.filter(this.dataList_full, (item) => {
            if (item.code == value.parent) {
              return true;
            }
          });
           if (child.length > 0) {
            this.child_code = child[0].code;
            this.ipt_departant = child[0].code + " " + child[0].description;
            this.ipt_departantFull = child[0];
          }

        
      }
      if (value == null) {
         this.used = "";
        this.used_parent = "";
        this.used_status = "";
        this.btndelete = false;
        this.ipt_rolecode = false;
        this.id_save = "0";
        this.type_save = "add";
        this.ipt_departant = "";
        this.ipt_code = "";
        this.ipt_description = "";
        this.ipt_source = "SalesOps";
        this.ipt_action_log = "Create ";
        this.ipt_status = 1;
        this.ipt_status_approve = 0;
        this.ipt_root = true;
      } else {
        // value.parent == true
        if (value.parent == "") {
          // console.log('AA',value)
          this.ipt_root = value.parent;
          this.ipt_departant = "";
          this.ipt_departantFull = "";
        } else {
          let child = _.filter(this.dataListTemp, (item) => {
            if (item.code == value.parent) {
              return true;
            }
          });
          this.ipt_root = true;
          if (child.length > 0) {
            this.child_code = child[0].code;
            this.ipt_departant = child[0].code + " " + child[0].description;
            this.ipt_departantFull = child[0];
          }
        }
        this.id_save = value.id;
        this.ipt_code = value.code;
        this.ipt_description = value.description;
        this.ipt_source = value.source;
        this.ipt_action_log = value.action_log;
        this.ipt_status = value.status;
        this.ipt_status_approve = value.approve_status;
      }
      this.validInp = false;
      this.btndelete = this.ipt_status==0 ?true :false
     
      this.$refs["department"].open();
    },
    open_dialog(ref) {
      if (ref == "delete") {
        if (this.used_status == "0") {
          this.$refs["confirm_delete"].open();
        } else {
          this.$refs["confirm_delete_last"].open();
        }
      }
      if (ref == "save") {
        if (
          this.child_code.trim().length == 0 ||
          this.ipt_code.trim().length == 0 ||
          this.ipt_description.trim().length == 0 ||
          this.ipt_source.trim().length == 0 ||
          this.ipt_action_log.trim().length == 0 ||
          (this.ipt_root == true && this.ipt_departant.trim().length == 0)
        ) {
          this.validInp = true;
        } else {
          this.$refs["confirm_save"].open();
        }
      }
      if (ref == "close") {
        this.$refs["confirm_close"].open();
      }
    },
    confirm_close(ref) {

       if (ref == "cancel_delete_last") {
        this.$refs["confirm_delete_last"].close();
      }


      if (ref == "cancel_delete") {
        this.$refs["confirm_delete"].close();
      }
      if (ref == "cancel_save") {
        this.$refs["confirm_save"].close();
      }
      if (ref == "save") {
        this.saveData();
        this.$refs["confirm_save"].close();
      }
      if (ref == "delete") {
        this.delete_role();
      }
      if (ref === "close") {
        this.$refs["confirm_close"].close();
        this.$refs["department"].close();
      } else {
        this.$refs["confirm_close"].close();
      }
    },
    closeDialog(ref) {
      if (ref == "duplicate") {
        this.$refs["duplicate"].close();
        this.$refs["department"].open();
      } else {
        this.shw_autocom = false;
        this.$refs["department"].close();
      }
    },
    formatNumber(value) {
      return parseFloat(value)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    keySpecial(e) {
      if (
        e.keyCode == 96 ||
        e.keyCode == 126 ||
        e.keyCode == 33 ||
        e.keyCode == 64 ||
        e.keyCode == 35 ||
        e.keyCode == 36 ||
        e.keyCode == 37 ||
        e.keyCode == 94 ||
        e.keyCode == 38 ||
        e.keyCode == 42 ||
        e.keyCode == 63 ||
        e.keyCode == 59 ||
        e.keyCode == 58 ||
        e.keyCode == 39 ||
        e.keyCode == 34 ||
        e.keyCode == 92
      ) {
        e.preventDefault();
      }
    },
    outsideShowCust: function (e) {
      if (
        e.target.className != "md-input" &&
        e.target.className != "md-input earch-text" &&
        e.target.className != "md-input value-text"
      ) {
        this.shw_customer = false;
      }
    },
    outsideShowCustDP: function () {
      if (this.shw_autocom == true) {
        this.shw_autocom = false;
      }
    },
  },
  directives: {
    ClickOutside,
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.$store.dispatch("setPathMenuService", "setting");
      this.login = true;
      // console.log(this.$store);
      this.$store.dispatch("settingRole", "");
      this.$store.dispatch("settingCountRole");
      this.$store.dispatch("settingRoleSearch", {
        code: "",
        type: "",
        sort: "",
        orderby: "asc",
      });
       this.$store.dispatch("settingRoleSearch_full", {
        code: "",
        type: "",
        sort: "",
        orderby: "asc",
      });
      // this.fetchData()
    }
  },
  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
    "md-dropdown-box": require("../Salesops/customComponent/mdc-dropdown-box3")
  },
};
</script>
<style>
</style>
