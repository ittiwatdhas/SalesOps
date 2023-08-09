<template>
  <div id="pageMenuManagement">
    <div>
      <md-spinner
        style="position: absolute;padding-top:30%;z-index: 3"
        :md-size="150"
        :md-stroke="1"
        v-show="$store.getters.cpr_spinner_loading"
        md-indeterminate
      ></md-spinner>
    </div>
    <div
      v-show="$store.getters.cpr_spinner_loading"
      style="z-index: 2;
            opacity: 0.4;
            position: absolute;
            width: 100%;
            height: 100%;"
    ></div>
    <md-layout  md-gutter class="mh-0">
      <md-layout md-column md-gutter md-flex="25">
        <menu-left></menu-left>
      </md-layout>

      <md-layout  md-column md-gutter md-flex="75" style="padding-left:4%; ">
        <md-layout style="flex: initial;width: 100%;" class="header-bar">
          <div class="title" style="width:100%;text-align:left">
            {{ title }}
          </div>
        </md-layout>
        <div
          class="cust-list-box"
          style="width: 90%;margin:2% 10% 0 30px;background-color:;padding:25px 0px 0px 0px"
        >
          <div style="padding-left:50px;padding-bottom:0px" class="head-table">
            <div
              style="padding-bottom:5px"
              @click="selectedTab(row)"
              v-for="row in tabData"
              :key="row.code + 'tabs'"
              :class="
                activeTab === row.code
                  ? 'head-table-tab active'
                  : 'head-table-tab'
              "
            >
              {{ row.desc }}
            </div>
          </div>
          <hr class="style18" >

          <div style="overflow-y='scroll'"  class="body-deatil">
            <!---TAB 2 -->
            <div v-if="activeTab === 2">
          
              <md-layout
          style="flex: initial;margin:20px 55px 20px 55px;"
          class="search-cust-box"
        >
          <div style="width: 30%">
            <md-input-container class="-no-line -search" style="margin: 0px">
              <md-icon class="mr-5">
                search <md-tooltip>search</md-tooltip></md-icon
              >
              <md-input
                placeholder="Search"
                :class="ipt_search == 'Search' ? 'earch-text' : 'value-text'"
                v-on:change="searchUser"
                @choose="chooseMaster"
                :value="ipt_search"
                @focus.native="$event.target.select()"
              ></md-input>
            </md-input-container>
            <md-card v-if="shw_customer" id="style-scroll">
              <ul class="md-list" v-if="dataListSearch.length > 0">
                <li
                  class="md-list-item"
                  v-for="(item, index) in dataListSearch"
                  :key="index"
                >
                  <div class="md-list-item-text" @click="selectUser(item)">
                    {{ item.code
                    }}<span class="kanitFont"> {{ item.title }}</span>
                  </div>
                </li>
              </ul>
            </md-card>
          </div>
          <div style="width: 62%" class="md-report-bar">
            <div style="width: 100%; display: flex">
              <div style="padding-left: 22px; width: 35%">
                <div
                  :class="btnType == 'all' ? 'title-text active' : 'title-text'"
                  @click="selectType('all')"
                >
                  ALL CORP
                </div>
                <div class="title-number">
                  {{ this.$store.getters.cpr_count_ALL_CORP }}
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
                   {{ this.$store.getters.cpr_count_ACTIVE }}
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
                   {{ this.$store.getters.cpr_count_INACTIVE }}
                </div>
              </div>
            </div>
          </div>

          
        <div class="text-center" style="margin-top:0px;width:8%;height:32px; padding-left: 18px;">
              <md-button
                :class="'-orange'"
                style="height: 31px;margin:unset;border-radius:3px;font-size: 12px;min-width: 100%;padding:0px 5px 0px 0px;width: 100%;"
                @click="addLabel"
              >
                <md-icon>add</md-icon>
              </md-button>
            </div>


        </md-layout>

      <md-layout  style="margin:20px 55px 45px 55px;padding:20px 10px 10px 25px;flex: initial;background-color:" class="cust-list-box">
          <div class="head-table">
            <div :class="btnSort =='taglabel' ? 'active':''" style="color:#727272;font-size:14px;width:30%;text-align:left; cursor: pointer;" @click="sortData('corp_code')">Corp. Code</div>
           
            <div :class="btnSort =='tagname' ? 'column-descript active':'column-descript'" style="color:#727272;font-size:14px;width:60%;text-align:left; cursor: pointer;" @click="sortData('corp_name')">Corp. Name</div>
           <div style="color:#727272;font-size:14px;background-color:;width:10%;cursor: pointer;">Status</div>
            <div style="color:#727272;font-size:14px;background-color:;width:10%;cursor: pointer;">Action</div>
          </div>

         

       <md-snackbar ref="snackbar" :md-position="'top' + ' ' + 'center'" :md-duration="duration">
       <span>{{ "Can't delete because it is in use." }}</span>

      <md-button
        class="md-accent"
        @click="$refs.snackbar.close()"
        style="color:#FD7F00"
        >OK</md-button
      >
         </md-snackbar>
          <div class="body-deatil"  @scroll="handleScroll" v-click-outside="outsideTable"
              :style="{'padding-right': $store.getters.corp_list2.length > 1 ? '48px' : '60px',
              'overflow-y':'hidden'}">
          <div v-if="$store.getters.corp_list2.length==0" style="margin-top: 15px;font-size:14px;text-align:center;margin-bottom: 15px;">No corporate ....</div>



            <div class="detail-table" v-for="(item , index) in $store.getters.corp_list2" :key="index"
            :style="{'margin-top': item.mode ? '' : '15px'}"
            :id="'row-'+ index ">

<!-- ACTIVE -->
              <div v-if="item.active_edit_code == 'active'" class="inp-bar" :style="{'margin-top': item.mode ? '10px' : '','width':'30%', 'text-align': 'left'}"><!--inp-bar-->
                 <md-input-container v-if="item.mode "
                  :style="{'margin-bottom': item.temp_corp_code == '' || item.temp_corp_code == null ? '10px' : '0px'}">
                  <label class="label-text small"  >Corp Code</label>
                  <md-input
                   v-model="item.temp_corp_code"
                   disabled
                   ></md-input>
                  <div class="md-error" v-if="item.temp_corp_code == ''">{{warningText}}</div>
                </md-input-container>
                <label v-else style="opacity:0.8;font-size:14px;font-weight: bold;color:#5A5A5A" class="label-text">{{item.corp_code}}</label>
              </div>
         
              <div  v-if="item.active_edit_code == 'active'" class="inp-bar" :style="{'margin-top': item.mode ? '10px' : '','width':'60%', 'text-align': 'left'}"><!--inp-bar-->
                 <md-input-container v-if="item.mode"
                  :style="{'margin-bottom': item.temp_corp_name == '' || item.temp_corp_name == null ? '10px' : '0px','width':'50%'}">
                  <label class="label-text small"  >Corp Name</label>
                  <md-input v-model="item.temp_corp_name"></md-input>
                  <div class="md-error" v-if="item.temp_corp_name == ''">{{warningText}}</div>
                </md-input-container>
                <label style="opacity:0.8;font-size:14px;font-weight: bold;color:#5A5A5A"  v-else class="label-text">{{item.corp_name}}</label>
              </div>
 <!-- ACTIVE -->
 <!-- IN_ACTIVE -->
              <div v-if="item.active_edit_code == 'inactive'" class="inp-bar" :style="{'margin-top': item.mode ? '10px' : '','width':'30%', 'text-align': 'left'}"><!--inp-bar-->
                 <md-input-container v-if="item.mode "
                  :style="{'margin-bottom': item.temp_corp_code == '' || item.temp_corp_code == null ? '10px' : '0px'}">
                  <label class="label-text small"  >Corp Code</label>
                  <md-input
                   v-model="item.temp_corp_code"
                   ></md-input>
                  <div class="md-error" v-if="item.temp_corp_code == ''">{{warningText}}</div>
                </md-input-container>
                <label v-else style="opacity:0.8;font-size:14px;font-weight: bold;color:#5A5A5A" class="label-text">{{item.corp_code}}</label>
                <div style="color:red"  class="md-error" v-if="item.add_dup"><small>{{warningText_dup}}</small></div>
              </div>
         
              <div  v-if="item.active_edit_code == 'inactive'" class="inp-bar" :style="{'margin-top': item.mode ? '10px' : '','width':'60%', 'text-align': 'left'}"><!--inp-bar-->
                 <md-input-container v-if="item.mode"
                  :style="{'margin-bottom': item.temp_corp_name == '' || item.temp_corp_name == null ? '10px' : '0px','width':'50%'}">
                  <label class="label-text small"  >Corp Name</label>
                  <md-input v-model="item.temp_corp_name"></md-input>
                  <div class="md-error" v-if="this.inp_name">{{warningText}}</div>
                </md-input-container>
              
                <label style="opacity:0.8;font-size:14px;font-weight: bold;color:#5A5A5A"  v-else class="label-text">{{item.corp_name}}</label>
              </div>
 <!-- IN_ACTIVE -->

              <div :style="{'padding-top': item.mode ? '37px' : '','width':'8%'}">
                <form @click.stop.prevent="openDialog_corpMaster(item , index , 'active')" style="height:22px;">
                  <md-switch  type="submit" v-model="item.status" class="md-primary"></md-switch>
                </form>
              </div>

               <div v-if="item.status && !item.mode" :style="{'padding-top': item.mode ? '37px' : '','width':'6%',}">
                   <md-icon 
                 :style="{'color':'#D1D1D1'}">
                 delete
                 </md-icon>
              </div>

              <div @click="openDialog_corpMaster(item , index , 'delete')"  v-if="!item.status && !item.mode" :style="{'padding-top': item.mode ? '37px' : '','width':'6%' , 'cursor': 'pointer'}">
                   <md-icon 
                 :style="{'color':'#FD7F00'}">
                 delete
                 </md-icon>
              </div>
              <div v-if="item.mode" :style="{'padding-top': item.mode ? '37px' : '','width':'6%'}"></div>

  

         
                <div  :style="{'padding-top': item.mode ? '37px' : '','width':'5%'}">  
              
               <div v-if="!item.btn_edit">
                   <div v-if="item.mode " class="md-avatar md-avatar-icon active" @click="openDialog_corpMaster(item , index , 'all')">
                  <md-icon>save</md-icon>
                </div>

                <div v-else class="md-avatar md-avatar-icon" @click="editRow(item , index)">
                  <md-icon style="color:#797979">edit</md-icon>
                </div>
                </div>
                <div v-else>
                   <div v-if="item.mode " class="md-avatar md-avatar-icon active" @click="openDialog_corpMaster(item , index , 'edit')">
                  <md-icon>save</md-icon>
                </div>

                <div v-else class="md-avatar md-avatar-icon" @click="editRow(item , index)">
                  <md-icon style="color:#797979">edit</md-icon>
                </div>
                </div>
              </div>
  

            </div>  
          </div>
        </md-layout>

         <md-dialog ref="confiem-dialog" style="margin:unset">
        <md-dialog-title>{{ques}}</md-dialog-title>
          <md-dialog-content>{{ans}}</md-dialog-content>
          <md-dialog-actions>
            <md-button class="" @click="closeDialog_master('close')">Cancel</md-button>
            <md-button class="md-primary" @click="closeDialog_master('save')">{{this.btn_dialog}}</md-button>
          </md-dialog-actions>
        </md-dialog>

         <md-dialog ref="confiem-dialog-delete" style="margin:unset">
        <md-dialog-title style=" font-size:14px;color:#727272">{{ans}}</md-dialog-title>
          <md-dialog-actions>
            <md-button class="" @click="closeDialog_master('close')">Cancel</md-button>
            <md-button class="md-primary" @click="closeDialog_master('save')">{{this.btn_dialog}}</md-button>
          </md-dialog-actions>
        </md-dialog>
        
       
            </div>
 <!---TAB 3 -->
    <div v-else>
   <md-layout md-column md-gutter md-flex="90" style="padding: 0% 10% 0% 3.5%">
     <md-layout style="background-color: " md-flex="90" class="pt-20">
        <div style="padding-bottom:0px;padding-top:0 !important; margin-left:5%;width:30%; background-color:;height:39px; ">
          <md-dropdown-box
            :data="this.$store.getters.corp_list"
            @choose="set_corporate"
            v-model="corp_all"
          ></md-dropdown-box>
        </div>

        <div  style="width: 43%; padding-left: 19px; ">
                  <md-search-box
                    id="menu-search-box"
                    :placeholder="'Search Customer...'"
                    @filter="filterCustomer"
                    @choose="chooseSales"
                    @clear="clearSearch"
                  ></md-search-box>
                  
        </div>

        <div class="text-center" style="margin-top:0px;width:8%;height:32px; padding-left: 18px;">
              <md-button
                :class="'-orange'"
                style="height: 39px;margin:unset;border-radius:3px;font-size: 12px;min-width: 100%;padding:0px 5px 0px 0px;width: 100%;"
                @click="search_corp"
              >
                <md-icon>search</md-icon>
              </md-button>
            </div>

      </md-layout>
                  <!-- Dialog -->
       <md-dialog
      md-open-from="#fab"
      md-close-to="#fab"
      ref="confirm_delete"
      id="duplicate"
    >
      <md-dialog-content> Do you want to remove? </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="confirm_close('cancel_delete')">
          <label style="color: ##a8a8a8">CENCEL</label>
        </md-button>
        <md-button @click="confirm_close('delete')">
          <label style="color: #fd7f00">REMOVE</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>
<!-- END - Dialog -->

    </md-layout>
              <div
                style="overflow-y: auto;overflow-x: hidden; margin-top: 10px;"
              >
                <div
                  v-for="(row, idx) in this.$store.getters.customer_setting"
                  :key="idx + '-head-box'"
                  :style="{ 'margin-bottom': '20px' }"
                >
                  <div
                    class="head-box"
                    :style="{
                      'font-size': '18px',
                      'padding-bottom': '10px',
                      'padding-top': '20px',
                      'margin-top': '0px',
                      'margin-left': '8%',
                      'margin-top': '1px',
                      'margin-right': '13%',
                      'border-radius': '3px',
                      'box-shadow': '0 0 3px rgba(0, 0, 0, 0.16)'
                    }"
                  >
                    <div v-if="row.status"    style="opacity: 1;font-weight: 900; color:#727272 ; cursor:context-menu;"  class="title-hover">
                      {{ row.name }} ( {{row.customer_count}} ) 
                    </div>
                    <div v-else   style="opacity: 1;font-weight: 900; color:red ; cursor:context-menu;"  class="title-hover">
                      {{ row.name }} ( {{row.customer_count}} ) 
                    </div>

                    <div
                      class="head-table"
                      style="display: -webkit-box;padding-top:14px;padding-right:7px;"
                    >
                      <div style="width:8%;"></div>
                      <div
                        style="
                        font-size:14px;
                        width:15%;
                        text-align:left
                        ;padding-top:8px;
                        font-family:roboto
                        color: #727272;
                        opacity: 0.9;"
                        
                      >
                        Code
                      </div>
                      
                      <div
                        style="
                        font-size:14px;
                        width:69%;
                        text-align:left;
                        padding-top:8px;
                        font-family:roboto
                        color: #727272;
                        opacity: 0.9;"
                      >
                        Department
                      </div>
                      
      
                      <div
                        :style="{
                          width: '10.5%',
                          cursor: 'pointer',
                          'text-align': 'right'
                        }"
                      >
                        <md-menu md-size="4" md-direction="bottom left">
                          <md-button class="md-icon-button" md-menu-trigger>
                            <md-icon>more_vert</md-icon>
                          </md-button>
                          <md-menu-content>
                            <md-menu-item @selected="addUser(row)">
                              <span>Add Customer</span>
                            </md-menu-item>
                          </md-menu-content>
                        </md-menu>
                      </div>
                    </div>
                  </div>
                   
                  <md-layout
                
                    style=" flex: initial;margin-left:8%;margin-top:0%"
                    class="cust-list-box"
                    :id="idx + '-detail-box'"
                  >
                    <div
                      class="body-deatil"
                      style="max-height:none !important;overflow:hidden !important"
                    >
                    <div
                        v-if="row.customer.length == 0"
                        style="margin-top: 15px;font-size:14px;text-align:center;margin-bottom: 15px;"
                      >
                        No customer ....
                      </div>
                      <div 
                      
                        style="cursor: pointer;width: 100%;"
                        class="detail-table hover-icon"
                        v-for="(item, index) in row.customer"
                        :key="index"
                        :style="{ 'margin-top': '8px' }"
                        :id="item.customer_code + '-row-menu'"  
                      
                      >
                      

                        <div
                          :class="'column-descript'  "
                          style="width:25%;text-align:left;color:#414141;padding-top:8px"
                        >
                          {{ item.customer_code }}
                        </div>
                         <div
                          :class="'column-descript'  "
                          style="width:100%;text-align:left;color:#414141;padding-top:8px"
                        >
                           {{ item.customer_name_th }}
                        </div>

                        <div
                          :stlye="{
                            width: '10%',
                            'text-align': 'right',
                            cursor: 'pointer',   
                          }"
                        
                        >
                          <!-- class="hover-icon" -->
                          <md-menu  md-size="4" md-direction="bottom left">
                            <md-button class="md-icon-button" md-menu-trigger>
                              <md-icon style="margin-right: 0px !important;"
                                >more_vert</md-icon
                              >
                            </md-button>
                            <md-menu-content>
                              <md-menu-item
                                @selected="removeCorp(item, item.corp_code)"
                              >
                                <span>Remove</span>
                              </md-menu-item>
                            </md-menu-content>
                          </md-menu>
                        </div>
                      </div>
                    </div>
                  </md-layout>
                </div>
              </div>
            </div>
          </div>
        </div>
      </md-layout>
    </md-layout>

    <md-dialog  id="all_cust_dialog_cpr"  ref="details-dialog" style="">
      <md-dialog-title
          style="font-weight: 500;background:#EFEFEF;color:#414141;font-size:16px;padding-bottom:15px;padding-top:15px;"
        >
          <md-layout>
            <md-layout md-flex="70">
              <label class="sub-title kanitFont">All MTT Customer</label>
            </md-layout>
            <md-layout md-flex="30" md-align="end">
              <md-icon
                @click.native="closeAllCust"
                style="cursor:pointer;margin-right:0px"
                >close</md-icon
              >
            </md-layout>
          </md-layout>
          <!-- All My Customer -->
        </md-dialog-title>
          <md-dialog-content class='content-dialog'  style="height:100%;width:100%;">
        
         
         
          <div
            style="position: absolute;z-index: 101;margin-left:40%;margin-top:10%;"
          >
          </div>
          <md-layout md-flex="100" md-align="end">
            <md-layout md-flex="60" md-align="start" style="color:#414141;opacity:0.9;font-weight: 500;font-size:18px"
              >Customer List&nbsp;({{ this.$store.getters.customer_mtt_count }})</md-layout  
            >
            <md-layout md-flex="40" md-align="end">
              <md-search-box
                :placeholder="'Search Customer...'"
                :value="mtt_search"
                style="width:85%;opacity: 0.8;"
                @filter="keywordFilA"
                @clear="keywordCPR"
              ></md-search-box>

            </md-layout>
          </md-layout>

         <md-layout style="margin-top:15px;background-color:"> 
         <div 
         style="font-weight: 600;fonr-size:14px;color: #727272;opacity:1;font-family:Roboto;width:100%;background-color:;display: -webkit-box;"
            >
              <div   style="background-color:;width: 20%;padding-left:10px">Channel Title</div>
              <div  @click="sortData_MTT('customer_code')" style="text-align:center;background-color:;cursor: pointer;width: 20%;">Customer Code</div>
              <div   style="background-color:; width: 40%;">Customer Name (TH)</div>
              <div  @click="sortData_MTT('corp_name')" style="background-color:;cursor: pointer;width: 20%;">Corp. Name</div>
            </div>
            <div
              class="body-deatil"
              :style="{  width: '100%' ,'padding-bottom':'10px','padding-left':'10px','padding-top':'5px' }"
            >
              <div
                        v-if="this.$store.getters.customer_mtt_list == 0"
                        style="margin-top: 15px;font-size:14px;text-align:center;margin-bottom: 15px;"
                      >
                        No customer ....
                      </div>
              <div
                class="menu-dialog"
                :style="{
                  'margin-top': '5px',
                  display: '-webkit-box',
                  width: '100%',
                  'font-family':'kanit'

                  
                }"
                v-for="(row, index) in this.$store.getters.customer_mtt_list"
                :key="'tbitemss' + index"
                @click="chooseCustByAll(row)"
              >
              
                <div style="background-color:;width:20%;">
                  {{row.customer_channel_title}}
                </div>
                <div style="background-color:;text-align:center;padding-right:30px;width:20%;font-family:kanit">
                  {{row.customer_code}}
                </div>
                <div
                  style="background-color:;width:40%;color:#414141; opacity:0.7;"
                >
                  {{row.customer_name_th}}
                </div>
                <div style="background-color:;width:20%;color:#414141; opacity:0.7">
                  <label style="font-family:kanit;"
                    >{{ row.corp_name }}</label
                  >
                </div>
              </div>
            </div>

        </md-layout>
        </md-dialog-content>
    </md-dialog>
    
  </div>
</template>
<script>
import Vue from 'vue'
import service from '@/services/core/menumanage'
import corporateManageService from "@/services/core/corporatemanage";
let checkStatus = false;
let masterTab = [
  { code: 3, desc: 'Customer Mapping' },
  { code: 2, desc: 'Corporate Master' }
]
export default {
  name: 'menu-mangement',
  data () {
    return {
     
      showFooter: false,
      title: 'CORPORATE MANAGEMENT',
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
      codeCorp:'',
      corp_all:'All Corporate',
      select_api:'',
      btnSort:'',
      cusCode:'',
      keyword:'',
      tempSort:'ASC',
      add_group_corp:'',
      corp_code:'',
      customer_code:'',
      type:'',
      btn_edit: false,
      btnType:'active',
      ipt_search:'',
      mode: '',

      tempIndex: "default",
      tempEdit: "default",
      tempMode: "",
      ques: "Do you want to leave row?",
      ans: "Changes might not be saved.",
      warningText: "Please input data",
      warningText_dup:'Duplicate code.',
      

      type :'',
      corp_code_old:'',
      corp_name_old:'',
      corp_code_new:'',
      corp_name_new:'',
      status:'',
      inp_code:false,
      inp_name:false,

      btn_dialog:'SAVE',
      duration:2000,
      check_search:'',
      mtt_search:'',
      txt:'AAA'

    }
  },
  methods: {

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
          active_edit_code:'inactive',
          add_dup:false,
          btn_edit:false,
          check_row_edit:false
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
        outsideTable: function(e) {
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
    }, outsideShowCust: function(e) {
      if (
        e.target.className != "md-input" &&
        e.target.className != "md-input earch-text" &&
        e.target.className != "md-input value-text"
      ) {
        this.shw_customer = false;
      }
    }, handleScroll(event) {},


    filterCustomer (param) {
       this.cusCode  = param
      // if (_.trim(param).length > 0) {
      // this.$store.dispatch('searchCustomerMapping',{'corp_code':this.codeCorp, 'customer':''}  )
      // }else {
      // }
    },
    check_status( value ){

      if(value == 'all'){
        return ''
      }else if(value == 'active') {
        return '1'
      }else {
        return '0'
      }
    },
    chooseSales (value) {
      this.cusCode = value.customer_code
      this.customer_code = value.customer_code

    },
    clearSearch () {
      this.cusCode =''
    },
    deleteStore (value) {
      let master = _.cloneDeep(this.tab3Row.arrChips)
      this.tab3Row.arrChips = _.filter(master, item => {
        return item.code != value.code
      })
    },
    chooesSalesman (value) {
      let master = _.cloneDeep(this.tab3Row.masterSmList)
      this.tab3Row.masterSmList = _.filter(master, item => {
        return item.code != value.code
      })
      this.tab3Row.arrChips.push(value)
    },
    
   sortData_MTT( param ){
      this.tempSort = this.tempSort == "ASC" ? "DESC" : "ASC";
      this.$store.dispatch('settingMttCustomer',
      {
        customer:'',
        feild:param,
        sorting:this.tempSort}
      ) 
    },
    keywordFilA (val) {
       this.mtt_search = val
       this.$store.dispatch('settingMttCustomer',
      {
        customer:val,
        feild:'corp_name,customer_code',
        sorting:'ASC'} ) 
    },
     keywordCPR() {
       this.mtt_search = ""
        this.$store.dispatch('settingMttCustomer',
      {
        customer:'',
        feild:'corp_name,customer_code',
        sorting:'ASC'} ) 
      // this.keyword = ''
      this.keyword = ''
    },
    addUser (row) {
      this.add_group_corp = row.code
      this.tab3Row.selected = row
      this.tab3Row.mode = 'add'
      this.addData()
    },
    expandChild (idx) {
      let key = idx + '-detail-box'
      let styleOld = document.getElementById(key).style.display
      if (styleOld === 'none') {
        document.getElementById(key).style.display = 'block'
      } else {
        document.getElementById(key).style.display = 'none'
      }
    },
    removeCorp (item) {
      this.$refs["confirm_delete"].open();
      this.corp_code = item.corp_code,
      this.customer_code = item.customer_code,
      this.type= 'remove'
    },
  
   selectType(value) {
     let status_to_api = ''
     if(value === 'active'){
       status_to_api = 1
     }else if(value === 'inactive'){
      status_to_api = 0
     }
     let select_status ={
       corp_code : '',
       status : status_to_api
     }

     this.$store.dispatch('selectAllCorporate2', select_status)


 this.btnType = value;
   },
    selectedTab (row) {
      this.activeTab = row.code
    },

   confirm_close(param){
  
     if(param === 'cancel_delete'){
         this.$refs["confirm_delete"].close();
     }else {
      var rs = {}
      rs ={
        'corp_code':this.corp_code,
        'customer_code' :this.customer_code,
        'type': this.type,
        'check_search' : this.check_search,
       
      }
      // console.log("DELETE", this.check_search )
      this.$store.dispatch('settingAddRemoveCustomerMapping' , rs )
      this.$refs["confirm_delete"].close();
     }
   },
   editRow(value, index) {
  
      let theOldObject = this.$store.getters.corp_list2[this.tempIndex];
      let theObject = this.$store.getters.corp_list2[index];
      theObject.btn_edit = true;
     
       let rs_check_edit = {
            type :'status',
            corp_code_old :value.corp_code,
            corp_name_old:'',
            corp_code_new:'',
            corp_name_new:'',
            status: '', 
            type:'edit',
          }
           corporateManageService
          .settingSaveCorporateMaster(rs_check_edit)
          .then((response) => {

           if(response.data == 'inactive'){
             theObject.active_edit_code = 'inactive'

           }else {
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
    addData () {
       
      this.keywordCPR()
      this.$refs['details-dialog'].open()
    },
    openDialog () {
      this.$refs['confirm-dialog'].open()
    },
     closeAllCust () {
      this.$refs['details-dialog'].close()
    },
    closeDialog () {
      this.$refs['confirm-dialog'].close()
    },

    closeDialog_master(mode) {
      this.btn_dialog ="SAVE"
    //  console.log("A",mode,this.tempMode)
      let theObject = this.$store.getters.corp_list2[this.tempIndex];
      let theNewObject = this.$store.getters.corp_list2[this.tempEdit];
      if (mode == "save") {
        if (this.tempMode == "edit") {
          // console.log("if 1====> save to DB");
          let edit ={
          type :'edit',
            corp_code_new :theObject.temp_corp_code,
            corp_name_new:theObject.temp_corp_name,
            corp_code_old:theObject.corp_code,
            corp_name_old:theObject.corp_name,
            status:theObject.status == true ? 1 : 0
          }
          // console.log('EDIT => ',edit)
           corporateManageService
          .settingSaveCorporateMaster(edit)
          .then((response) => { 
            // console.log('settingSaveCorporateMaster Res => ',response)
            if(response.data === 'error duplicate'){
              theObject.mode = true
              theObject.add_dup = true  
            }else {
             var render_status = this.check_status(this.btnType)
              this.$store.dispatch('selectAllCorporate', {'corp_code':'' , 'status':render_status})  
              theObject.mode = false
              theObject.add_dup = false 
              this.$store.dispatch('settingCustomerMapping',{'corp_code':'' , 'customer':''}  )
            }
          })
          .catch((error) => console.log("settingSaveCorporateMaster"));
          theObject.mode = false;
        } else if (this.tempMode == "active") {
          let rs_active = {
            type :'status',
            corp_code_old :theObject.corp_code,
            corp_name_old:theObject.corp_name,
            corp_code_new:'',
            corp_name_new:'',
            status: theObject.status ? 1 : 0,
          }
          this.$store.dispatch('settingSaveCorporateMaster',rs_active)
          var render_status = this.check_status(this.btnType)
          this.$store.dispatch('selectAllCorporate', {'corp_code':'' , 'status':render_status})
           console.log("if 2====> save to DB",rs_active);
        } else if (this.tempMode == "all") {
          theObject.temp_corp_code = theObject.temp_corp_code;
          theObject.temp_corp_name = theObject.temp_corp_name;
          // console.log("if 3====> save to DB",theObject);
          let rs_add = {
            type :'add',
            corp_code_new :theObject.temp_corp_code,
            corp_name_new:theObject.temp_corp_name,
            corp_code_old:'',
            corp_name_old:'',
            status:theObject.status? '1' :'0'
          }
          // console.log(rs_add)
          corporateManageService
          .settingSaveCorporateMaster(rs_add)
          .then((response) => {
            // console.log('settingSaveCorporateMaster',response)

            if(response.data === 'insert success'){
              var render_status = this.check_status(this.btnType)
              this.$store.dispatch('selectAllCorporate', {'corp_code':'' , 'status':render_status})  
              theObject.mode = false
              theObject.add_dup = false 
                this.$store.dispatch('settingCustomerMapping',{'corp_code':'' , 'customer':''}  )
            }else {
             
              theObject.mode = true
              theObject.add_dup = true  
            }
            // this.$store.dispatch('selectAllCorporate', '')
          })
          .catch((error) => console.log("settingSaveCorporateMaster"));
          // theObject.tagmodule = theObject.temp_tagmodule;
         
        }else if(this.tempMode == "delete"){
          let rs_delete = {

            type :'delete',
            corp_code_old :theObject.corp_code,
            corp_name_old:theObject.corp_name,
            corp_code_new:'',
            corp_name_new:'',
            status:''
          }
          corporateManageService
          .settingSaveCorporateMaster(rs_delete)
          .then((response) => { 
            // console.log('settingSaveCorporateMaster Res => ',response)
            if(response.data == 'active'){
                    this.$refs.snackbar.open()

            }else {
            var render_status = this.check_status(this.btnType)
             this.$store.dispatch('selectAllCorporate', {'corp_code':'' , 'status':render_status})
             this.$store.dispatch('settingCustomerMapping',{'corp_code':'' , 'customer':''}  )
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
      set_corporate : function( data ){
      this.corp_all = data.corp_name
      this.select_api = data.corp_code
  },search_corp(){
this.check_search = this.select_api
    this.$store.dispatch('settingCustomerMapping' ,  {'corp_code':this.select_api , 'customer':this.cusCode }  )
  },
  searchUser( value ){
      var render_status = this.check_status(this.btnType)
      this.$store.dispatch('selectAllCorporate_search', {'corp_code':value , 'status':render_status})
  },
  shw_customer(){},
  dataListSearch(){},
  chooseMaster( value ){
  // console.log(value)
  },

  chooseCustByAll:function( param ){ 
    var rs = {}
    if(param.corp_code==''){
      rs ={
        'corp_code':this.add_group_corp,
        'customer_code' :param.customer_code,
        'type': 'add',
        'check_search' : this.check_search,
        'mtt_search' : this.mtt_search
      }
      this.$store.dispatch('settingAddRemoveCustomerMapping' , rs )
      // console.log("Add => ", rs)
    }else {
      // console.log("No Add => ", param.corp_code , param.customer_code , this.add_group_corp)
    }
    },

      openDialog_corpMaster(value, index, mode) {
        if(mode == 'delete'){
        this.btn_dialog = "DELETE"
        this.tempIndex = index;
        this.tempMode = mode;
        this.selectRow = value;
        this.$refs["confiem-dialog-delete"].open();
        this.ques = "";
        this.ans = "Do you want to delete?";
        }else
      
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
          this.inp_name= true;
        } else {
          this.$refs["confiem-dialog"].open();
        }
      } else if ( mode == "active" && theObject.mode == false) {
       this.$refs["confiem-dialog"].open();
      } else if(mode == "edit") {
        // console.log(mode); 
         this.$refs["confiem-dialog"].open();
      }
    },
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
      this.$store.dispatch('settingCustomerMapping',{'corp_code':'' , 'customer':''}  )
      this.$store.dispatch('searchCustomerMapping',{'corp_code':'', 'customer':''}  )
      this.$store.dispatch('selectAllCorporate', {'corp_code':'' , 'status':1 })
      this.$store.dispatch('setPathMenuService','setting')
      this.$store.dispatch('settingMttCustomer',
      {
        customer:'',
        feild:'corp_name,customer_code',
        sorting:'ASC'} ) 
      
      this.login = true
   

      // console.log("setting => ",this.$store.getters.customer_setting)
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
  },

  components: {
    'menu-header': require('../Salesops/layout/menu-top'),
    'menu-left': require('../Salesops/layout/menu-left'),
    'md-search-box-dg': require('../Salesops/customComponent/md-search-box-dg'),
    'md-search-box': require('../Salesops/customComponent/md-cpr-search-box'),
    "md-dropdown-box": require("../Salesops/customComponent/mde-dropdown-box.vue"),
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

  .-salesops-checkbox-container:hover input ~ .-salesops-checkbox {
    background-color: #ccc;
  }

  .-salesops-checkbox-container input:checked ~ .-salesops-checkbox {
    background-color: #ff9800;
    border-color: #ff9800;
  }

  .-salesops-checkbox:after {
    content: '';
    position: absolute;
    display: none;
  }

  .-salesops-checkbox-container input:checked ~ .-salesops-checkbox:after {
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
