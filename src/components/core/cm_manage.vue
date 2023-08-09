<template>
  <div id="pageMenuManagement">
    <div>
      <!-- <md-spinner
        style="position: absolute;padding-top:30%;z-index: 3"
        :md-size="150"
        :md-stroke="1"
        v-show="$store.getters.cm_spinner_loading_role"
        md-indeterminate
      ></md-spinner> -->
    </div>
    <!-- <div
      v-show="$store.getters.cpr_spinner_loading"
      style="z-index: 2;
            city: 0.4;
            position: absolute;
            width: 100%;
            height: 100%;"
    ></div> -->
    <md-layout  md-gutter class="mh-0">
      <md-layout md-column md-gutter md-flex="25">
        <menu-left></menu-left>
      </md-layout>
      <md-progress v-show="$store.getters.show_progress_loading" class="md-warn main-loading" :md-progress="1" md-indeterminate></md-progress>
      
      <md-layout  md-column md-gutter md-flex="75" style="padding-left:4%; ">
        <md-layout style="flex: initial;width: 100%;" class="header-bar">
          <div class="title" style="padding-bottom:18px;width:100%;text-align:left">
            {{ title }}
          </div>
        </md-layout>
        <div
          class="cust-list-box"
          style="width: 90%;margin:0% 2% 0 20px;background-color:;padding:25px 0px 0px 0px"
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
          <div 
          style=""  
          class="">
            <!---TAB 2 -->
          <div v-if="activeTab === 3">
            <md-spinner
        style="margin-left:100px; position: absolute;padding-top:30%;z-index: 3"
        :md-size="150"
        :md-stroke="1"
        v-show="$store.getters.cm_spinner_loading_role"
        md-indeterminate
        
      ></md-spinner>
          <md-layout style="padding: 0% 1% 2% 1%" md-flex="90" class="pt-20">
         
            <div style="width:27%;background-color: ; padding-left:14px">
            <md-auto-search-box
            :placeholder="'All Customer'"
            :data="this.$store.getters.custm_customer_list"
            :value="customer_cus_role"
            @filter="searchCustomer_role"
            @choose="chooseCust_cus_role"
            :disabled="false"
          ></md-auto-search-box> 
            </div>
            <div style="width:27%;background-color: ; padding-left:20px">
               <md-auto-search-box4
            :placeholder="'All Role'"
            :data="this.$store.getters.all_role_cm_role_search"
            :value="customer_cus_all_role"
            @filter="search_role"
            @choose="choose_role"
            :disabled="false"
          ></md-auto-search-box4> 
            </div>
              <div 
             @click="SearchCustomerWithRole()"
             style="
             margin-left:10px;background: #FD7F00 0% 0% no-repeat padding-box;
             margin-top:8px;
             height: 37px;
             border-radius: 3px;
             opacity: 0.9;padding-top:9px;
             paddimg-left:0;align-items: left;
             width:4.3%">
           <md-icon style="cursor: pointer;font-size:20px;color:#fff;">search</md-icon>
           <md-tooltip  style="height: auto; white-space: normal; max-width:30%;"  md-delay="100" md-direction="top"> <span class="kanitFont">Search</span></md-tooltip> 
          
          </div>
             <div   style="width:29%;">
            <!-- <md-dropdown-box :data="this.$store.getters.custm_channel_list"
             @choose="set_channel_role" 
             v-model="cus_list"
             ></md-dropdown-box> -->
             </div>
             <div 
             @click="syn_btn()"
             style="
             margin-left:10px;background: #FD7F00 0% 0% no-repeat padding-box;
             margin-top:8px;
             height: 37px;
             border-radius: 3px;
             opacity: 0.9;padding-top:9px;
             paddimg-left:0;align-items: left;
             width:4.3%">
           <md-icon style="cursor: pointer;font-size:20px;color:#fff;">sync</md-icon>
           <md-tooltip  style="height: auto; white-space: normal; max-width:30%;"  md-delay="100" md-direction="top"> <span class="kanitFont">Sync(Cipher)</span></md-tooltip> 
          </div>
          <div 
             @click="openDialog_role_add()"
             style="
             margin-left:10px;background: #FD7F00 0% 0% no-repeat padding-box;
             margin-top:8px;
             height: 37px;
             border-radius: 3px;
             opacity: 0.9;padding-top:9px;
             paddimg-left:0;align-items: left;
             width:4.3%">

           <md-icon style="cursor: pointer;font-size:20px;color:#fff;">add</md-icon>
           <md-tooltip  style="height: auto; white-space: normal; max-width:30%;"  md-delay="100" md-direction="top"> <span class="kanitFont">Add</span></md-tooltip> 
          </div>
      </md-layout>
      <md-layout  style="padding-left:0;margin:0px 30px 15px 15px;height:100%;width:97%;flex: initial;" class="cust-list-box">
           <div class="head-table" style="padding:0">
           <div :class="btnSort =='taglabel' ? 'active':''" style="background-color:;color:#727272;font-size:14px;width:10%; cursor: pointer;" @click="sortData('role')">Role</div>
           <div :class="btnSort =='tagname' ? 'column-descript active':'column-descript'" style="background-color:;color:#727272;font-size:14px;width:20%;text-align:left; cursor: pointer;" @click="sortData('corp_name')">Name</div>
           <div style="color:#727272;font-size:14px;background-color:;width:50%;cursor: pointer;text-align:center;">Customer</div>
           <div style="color:#727272;font-size:14px;background-color:;width:10%;cursor: pointer;">Source</div>
           <div style="color:#727272;font-size:14px;background-color:;width:6%;cursor: pointer;">Status</div>
           <div style="color:#727272;font-size:14px;background-color:;width:3%;cursor: pointer;"></div>
          </div>
      
      
      <div  @scroll="handleScroll_WithRole" style="  height: 440px;"  class="body-deatil" >
            <div v-if="$store.getters.customerListRole.length==1 &&  $store.getters.customerListRole[0].name == '' " style="margin-top: 15px;font-size:14px;text-align:center;margin-bottom: 15px;">No customer ....</div>
            <div style="padding-bottom:0px" v-else class="detail-table hover-icon" v-for="(item , index3) in $store.getters.customerListRole" :key="index3"
            :id="'row-'+ index3 ">
             <div  class="inp-bar" style="background-color:; padding:0;width:10%;text-align:center">  {{item.role}}  </div>
             <div  class="inp-bar font-Kanit" style="
                text-align:left;
                white-space: nowrap; 
                width: 20%; 
                padding:0;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right:15px">
                {{item.name}} 
                <md-tooltip  style="height: auto; white-space: normal; max-width:30%;"  md-delay="100" md-direction="top"> <span class="kanitFont">{{item.name}}</span></md-tooltip> 

             </div>

             <div  class="inp-bar" style=" 
                text-align:left;
                white-space: nowrap; 
                width: 50%; 
                padding:0;
                overflow: hidden;
                text-overflow: ellipsis;
                "
                >
               {{ String(item.cust)}}
                <!-- <md-tooltip  style="height: auto; white-space: normal; max-width:30%;"  md-delay="100" md-direction="top"> <span class="kanitFont">{{item.cust}}</span></md-tooltip>  -->
                </div>
             <div  class="inp-bar" style="padding:0;width:10%;text-align:center"> {{item.source}} </div>

             <div  class="inp-bar" style="background-color:;padding:0;width:6%;text-align:center">   
              <md-avatar v-if="item.status == '1'" class="md-cycle-icon small green"></md-avatar>
              <md-avatar v-else-if="item.status == '0'" class="md-cycle-icon small red"></md-avatar> 
              </div>
                
               <md-menu style="width:3%;background-color:;"  md-size="4" md-direction="bottom left">
                            <md-button style="" class="md-icon-button" md-menu-trigger>
                              <md-icon style="margin: 0px !important;"
                                >more_vert</md-icon
                              >
                            </md-button>
                            <md-menu-content>
                              <md-menu-item
                                @selected="openDialog_role(item)"
                              >
                                <span>Edit</span>
                              </md-menu-item>
                               <md-menu-item
                                @selected="openDialog_role_remove(item)"
                              >
                                <span>Remove</span>
                              </md-menu-item>
                               <md-menu-item
                                @selected="sync(item)"
                              >
                                <span>Sync (Cipher)</span>
                              </md-menu-item>
                            </md-menu-content>
               </md-menu>
              </div>
           <!-- {{this.$store.getters.customerList}} -->
      </div>
        </md-layout>
   </div>
        <!---TAB 2 -->
      <div  v-else>
       <md-spinner 
        style="margin-left:100px;position: absolute;padding-top:30%;z-index: 3"
        :md-size="150"
        :md-stroke="1"
        v-show="$store.getters.cm_spinner_loading"
        md-indeterminate
      ></md-spinner>

     <md-layout style="margin:0 10px 0 15px; border-radius:5px;padding:1px 0 1px 1px;overflow-y: hidden; " md-flex="90" class="pt-20">
         <div  class="font-Roboto"   style="width:35%;">
            <md-dropdown-box 
            :data="this.$store.getters.custm_channel_list" 
            @choose="set_channel" 
            v-model="cus_list"
            ></md-dropdown-box>
         </div>
            <div  style="width:29%;background-color: ; padding-left:14px">
               <md-auto-search-box
            :placeholder="'All Customer'"
            :data="this.$store.getters.custm_customer_list"
            :value="customer_cus"
            @filter="filter_searchCustomer"
            @choose="chooseCust_cus"
            :disabled="false"
          ></md-auto-search-box>
            </div>
            <div style="width:29%;background-color: ; padding-left:20px">
               <md-auto-search-box
            :placeholder="'All Province'"
            :data="this.$store.getters.custm_province_list"
            :value="provinceCode"
            @filter="searchProvince"
            @choose="choose_province"
            :disabled="false"
          ></md-auto-search-box> 
            </div>
            <div 
             @click="SearchCustomerMaster()"
             style="
             margin-left:0px;
             background: #FD7F00 0% 0% no-repeat padding-box;
             margin-top:0px;
             height: 37px;
             border-radius: 3px;
             opacity: 0.9;
             padding-top:10px;
             margin-left:15px;
             align-items: left;
             width:5%;
             margin-top:6px;">
           <md-icon style="cursor: pointer;font-size:20px;color:#fff;">search</md-icon>
           <md-tooltip  style="height: auto; white-space: normal; max-width:30%;"  md-delay="100" md-direction="top"> <span class="kanitFont">Search</span></md-tooltip> 
          </div>
      </md-layout>

      <md-layout  style="padding:10px 10px 0px 15px;flex: initial;width: 100%; ;" >
            <md-layout  class="md-report-bar">
              <md-layout md-flex-large="100" >
                <md-layout md-flex="17" style="padding-left:0px;background:;justify-content: center">
                    <div :class="btnType =='all' ?'title-text active':'title-text'" @click="selectType('all')">ALL</div>
                    <div class="title-number">{{this.$store.getters.count_all}}</div>
                </md-layout>
                <md-layout  md-flex="19" class="mr-3" style='background:;justify-content: center'> 
                    <div :class="btnType =='active' ?'title-text active':'title-text'"  @click="selectType('active')">ACTIVE</div>
                    <div class="title-number">{{this.$store.getters.count_active}}</div>
                </md-layout>
                <md-layout md-flex="19" style='background:;justify-content: center'> 
                    <div :class="btnType =='inactive' ?'title-text active':'title-text'" @click="selectType('inactive')">INACTIVE</div>
                    <div class="title-number">{{this.$store.getters.count_inactive}}</div>
                </md-layout>
                <md-layout md-flex="19" style='background:;justify-content: center'> 
                    <div style="cursor:context-menu;" class="title-text2" >TT</div>
                    <div class="title-number">{{this.$store.getters.count_tt}}</div>
                </md-layout>
                <md-layout md-flex="22"  style='background:;justify-content: center'> 
                    <div style="cursor:context-menu;"  class="title-text2" >MT</div>
                    <div  class="title-number">{{this.$store.getters.count_mt}}</div>
                </md-layout>
                 <md-layout md-flex="22"  style='background:;justify-content: center'> 
                    <div style="cursor:context-menu;"  class="title-text2" >MTT</div>
                    <div class="title-number">{{this.$store.getters.count_mtt}}</div>
                </md-layout>
              </md-layout>
            </md-layout>
        </md-layout>

        
       <md-layout  style="padding-left:0;margin:0px 30px 15px 15px;height:440px;width:97%;flex: initial;" class="cust-list-box">
      <div class="head-table" style="padding:0 10px 10px 10px">
            <div class="font-Roboto" style="background-color:;color:#727272;font-size:14px;width:7%;text-align:left;">Code</div>
           <div :class="btnSort =='tagname' ? 'column-descript active':'column-descript'" style="color:#727272;font-size:14px;width:28%;text-align:left;">Customer Name</div>
           <div style="color:#727272;font-size:14px;background-color:;width:15%;cursor: pointer;text-align:left;">Area</div>
           <div style="color:#727272;font-size:14px;background-color:;width:18%;cursor: pointer;text-align:left;padding-left:11px">Channel</div>
           <div style="color:#727272;font-size:14px;background-color:;width:10%;cursor: pointer;">Price Policy</div>
           <div style="color:#727272;font-size:14px;background-color:;width:10%;cursor: pointer;">Price</div>
           <div style="color:#727272;font-size:14px;background-color:;width:10%;cursor: pointer;">Status</div>
          </div>

          <div @scroll="handleScroll_Master" style="
          height: 95%;
          padding-left:10px;
          "  class="body-deatil" >
                <div v-if="$store.getters.customerList== 'null'  && this.$store.getters.cm_spinner_loading == false" style="margin-top: 15px;font-size:14px;text-align:center;margin-bottom: 15px;">No customer ....</div>
                <div @click="openDialog_master(item)"   style=";cursor:pointer;padding-bottom:15px" v-else class="detail-table detail" v-for="(item , index2) in $store.getters.customerList" :key="index2"
                :id="'row-'+ index2 ">
            <!-- <div class="detail-table" style="background-color:red"> -->
                <div class="inp-bar " style="background-color:; width:7%;"> {{item.customer_code}} </div>
                <div md-align="left" class="inp-bar font-Kanit"
                style="
                    text-align:left;
                    white-space: nowrap; 
                    width: 28%; 
                    overflow: hidden;
                    text-overflow: ellipsis; 
                    "> {{item.customer_name_th}}
                    <md-tooltip md-direction="top"> <span class="kanitFont">{{item.customer_name_th}}</span></md-tooltip>
                    </div>
                
                <div
                  class="inp-bar font-Kanit" 
                    style="
                    text-align:left;
                    white-space: nowrap; 
                    width: 15%; 
                    padding:0;
                    overflow: hidden;
                    text-overflow: ellipsis; 
                    background-color:;
                    "
                    > {{item.area_id}} 
                    <md-tooltip md-direction="top"> <span class="kanitFont">{{item.area_id}}</span></md-tooltip></div>
                <div  class="inp-bar font-Kanit" style="padding:0;width:18%;text-align:left">  {{item.customer_channel}}  </div>
                <div  class="inp-bar font-Roboto" style="padding:0;width:10%;text-align:center"> {{item.price_policy}} </div>
                <div  class="inp-bar" style="padding:0;width:10%;text-align:center"> {{item.price_type}} </div>
                <div  class="inp-bar" style="padding:0;width:10%;text-align:center">   <md-avatar v-if="item.status == '1'" class="md-cycle-icon small green"></md-avatar>
                  <md-avatar v-else-if="item.status == '0'" class="md-cycle-icon small red"></md-avatar> </div>
                </div>
           </div>
        </md-layout >

      </div>
     </div>
        </div>
      </md-layout>
    </md-layout>
    
    <md-dialog  id=""  ref="details-customer-role-remove" style="">
  <md-dialog-title style=" font-size:14px;color:#727272">Do you want to remove?</md-dialog-title>
     <md-dialog-actions>
            <md-button class="" @click="closeDialog_role('close')">Cancel</md-button>
            <md-button class="md-primary" @click="closeDialog_role('save')">REMOVE</md-button>
          </md-dialog-actions>
    </md-dialog>

    <md-dialog  id="all_cust_dialog_cm_role"  ref="details-customer-role" style="">
      <md-dialog-title
          style="font-weight: 500;background:#EFEFEF;color:#414141;font-size:16px;padding-bottom:15px;padding-top:15px;"
        >
          <md-layout>
            <md-layout md-flex="70">
              <label class="sub-title font-Roboto">All Customer</label>
            </md-layout>
            <md-layout md-flex="30" md-align="end">
              <md-icon
                @click.native="closeDialog_role"
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
            <md-layout md-flex="20" md-align="start" style="padding-top:18px;color:#414141;opacity:0.9;font-weight: 500;font-size:18px"
              >Customer List&nbsp;({{ this.$store.getters.count_cus_role }})
              </md-layout  
            >
            <md-layout style="padding:5px 0 5px 0;background-color:;" md-flex="80" md-align="end">
          <div style=" margin:0 15px 0px 0px;width: 30%;" class="md-layout-item">  
            <md-dropdown-box2 
            :data="this.$store.getters.custm_channel_list" 
            @choose="set_channel_edit" 
            v-model="cus_list2">
            </md-dropdown-box2>
             
          </div>
          
          <div style="margin:0 15px 0 0px;width: 30%;" class="md-layout-item">  
             <md-search-box2
                @filter="set_customer_edit" 
                v-model="customer_edit"
                :placeholder="'Search Customer...'"
                style="width:100%;opacity: 0.8;"
              ></md-search-box2> 
          </div>
          <div style="margin:0 15px 0 0px;width: 5%;" class="md-layout-item">  
           
          <div 
             @click="SearchCustomerWithRole_edit()"
             style="
             margin-left:0px;
             background: #FD7F00 0% 0% no-repeat padding-box;
             margin-top:0px;
             height: 82%;
             border-radius: 3px;
             opacity: 0.9;padding-top:0px;
             paddimg-left:0;align-items: left;
             width:100%;
             display:flex;
            
             ">
           <md-icon style="cursor: pointer;font-size:22px;color:#fff;">search</md-icon>
           <md-tooltip  style="height: auto; white-space: normal; max-width:30%;"  md-delay="100" md-direction="top"> <span class="kanitFont">Search</span></md-tooltip>           
          </div>
          </div>
           <div style="padding:0 0px 0 5px;width: 15%;" class="md-layout-item">  
             <div 
              @click="Save_edit_role()"
             style="
             background: #FD7F00 0% 0% no-repeat padding-box;
              height: 82%;
              border-radius: 3px;
              opacity: 0.9;
              padding-left:0;
              align-items: center;
              padding-top:0px;
              padding-left:0px;
              width:60%;
              display:flex;
              justify-content:center;
              cursor: pointer;"
              >
              <span style="color:#fff">SAVE</span>
          </div>
          </div>
            </md-layout>
          </md-layout>
         <md-layout style="margin-top:15px;background-color:"> 
         <div 
         style="font-weight: 600;fonr-size:14px;color: #727272;opacity:1;font-family:Roboto;width:100%;background-color:;display: -webkit-box;"
            >
              <div   style="background-color:;width:9%;text-align:center">Select ({{this.$store.getters.count_select}})</div>
              <div   style="text-align:center;background-color:;width:10%;">Code</div>
              <div   style="background-color:; width:22%;">Customer Name (TH)</div>
              <div   style="background-color:;width: 18%;">Channel Title</div>
              <div   style="background-color:; width: 41%;">Address</div>
            </div>
            <!-- $store.getters.cm_spinner_loading_edit_role -->
            <div
              class="body-deatil"
              :style="{  width: '100%' ,'padding-bottom':'10px','padding-left':' 0px','padding-top':'5px' }"
            >
             <md-spinner
        style="font-size:16px;margin-left:40%;position: absolute;padding-top:30%;z-index: 3"
        :md-size="150"
        :md-stroke="1"
        v-show="$store.getters.cm_spinner_loading_edit_role"
        md-indeterminate
      ></md-spinner>
              <div
                v-if="this.$store.getters.role_detail.length == 0 "
                style="margin-top: 15px;font-size:14px;text-align:center;margin-bottom: 15px;"
                >
                No customer ....
                </div>
              <div
                class="menu-dialog"
                :style="{
                  'margin-top': '10px',
                  display: '-webkit-box',
                  width: '100%',
                  'font-family':'kanit'
                }"
                v-for="(row, index) in this.$store.getters.role_detail"
                :key="'tbitemss' + index"
                
              >
                <div style="padding-left:40px;text-align:center;background-color:;width:8%;">
                  
                <!-- <md-checkbox class="md-warn-mo" 
                        style="margin:0px;margin-top:5px;" 
                        v-model="row.chk === 'true' ? true : false"
                         @click="check_select(row,index)">
                </md-checkbox> -->
                  
                   <label class="container">
                  <input
                  class="edit_checkbox"
                  type="checkbox"
                  style="height: 20px; width: 20px;"
                  v-model="row.chk === 'true' ? true : false"
                   @click="check_select(row,index)"
                />
                        <span class="checkmark"></span>
                  </label>

                  
                  <!-- <input
                  class="edit_checkbox"
                  type="checkbox"
                  style="height: 20px; width: 20px;"
                  v-model="row.chk === 'true' ? true : false"
                   @click="check_select(row,index)"
                /> -->


<!--                   
                  <label class="container">
                  <input type="checkbox" 
                  :checked="row.chk == 'true'"
                  @click="check_select(row,index)"
                  >
                  <span class="checkmark"></span>
                  </label> -->
<!-- 
                   <input 
                   style="
                   height:20px;
                   width:20px;
                   background-color:red;
                   "
                   type="checkbox" 
                   :checked="row.chk == 'true'"
                  > -->
                </div>
                <div style="background-color:;text-align:center;width:10%;font-family:kanit">
                  {{row.customer_code}}
                </div>
                <div
                  style="background-color:;width:22%;color:#414141; opacity:0.7;"
                >
                  {{row.customer_name_th}}
                </div>
                <div style="background-color:;width:18%;color:#414141; opacity:0.7">
                  <label style="font-family:kanit;"
                  >{{ row.title}}</label
                  >
                </div>
                <div style="background-color:;width:42%;color:#414141; opacity:0.7">
                  <label style="font-family:kanit;"
                    >{{ row.addr }}</label
                  >
                </div>
              </div>
            </div>

        </md-layout>
        </md-dialog-content>
    </md-dialog>
     <md-dialog   id="all_cust_dialog"  ref="all_cust_dialog" style="width:100%;">
      <md-dialog-title
          style="font-weight: 500;background:#EFEFEF;color:#414141;font-size:16px;padding-bottom:15px;padding-top:x;"
        >
          <md-layout>
            <md-layout md-flex="70">
              <label style="opacity: 1;color:#414141" class="sub-title font-Roboto">Customer Details</label>
            </md-layout>
            <md-layout md-flex="30" md-align="end">
              <md-icon
                @click.native="closeDialog_master"
                style="cursor:pointer;margin-right:0px"
                >close</md-icon
              >
            </md-layout>
          </md-layout>
          <!-- All My Customer -->
        </md-dialog-title>
          <md-dialog-content class='content-dialog'  style="height:100%;width:100%;">
            <md-layout>
<!-- BOX1 -->
<div style="
      border:0.5px solid #efefef;
      border-radius: 6px ;
      opacity: 1;
      height: 120px;"
    class="md-layout">
     <div style="
      border:0.5;
      border-radius: 6px 0px 0px 6px;
      width: 15%;
      height: 100%;
      text-align: center;
  " 
    class="md-layout-item">
  <table style="height: 100%;width: 100%;">
    <tr style="; width: 100%;height: 70%;background-color:">
      <div v-if="this.$store.getters.AddressInfo.status == '1'" style="padding:30px 25px 0 0;height: 100%;width: 100%;"  class="md-layout-item">
           <md-icon style="font-size:50px !important;color:#66BB6A">check_circle</md-icon>
      </div>
       <div v-else-if="this.$store.getters.AddressInfo.status == '0'" style="padding:30px 25px 0 0;height: 100%;width: 100%;"  class="md-layout-item">
      <md-icon style="font-size:50px !important;color:#F44336">cancel</md-icon>
      </div>
       <div v-else style="padding:30px 25px 0 0;height: 100%;width: 100%;"  class="md-layout-item">
        <md-icon style="font-size:50px !important;color:#A8A8A8">error</md-icon>
      </div>
    </tr>
      <tr style="width: 100%;height: 30%;background-color:">
         <div v-if="this.$store.getters.AddressInfo.status == '1'" style="padding:0px 0px 0 0;height: 100%;width: 100%;"  class="md-layout-item">
          <span class="font-Roboto" style="color:#727272"> Active  </span> 
         </div>
         <div v-else-if="this.$store.getters.AddressInfo.status == '0'" style="padding:0px 0px 0 0;height: 100%;width: 100%;"  class="md-layout-item">
          <span class="font-Roboto" style="color:#727272"> Inactive </span> 
         </div>
         <div v-else style="padding:0px 0px 0 0;height: 100%;width: 100%;"  class="md-layout-item">
          <span class="font-Roboto" style="color:#727272"> N/A </span> 
         </div>
      </tr>
    </table>
    </div>
    <div
    style="
     background-color:#EFEFEF;
      border:0.5px;
      color:#414141;
      width: 12%;
      padding:40px 0 0 20px;
      text-align: left;
      letter-spacing: 0px;
      opacity: 1;
      font-weight: 600;
      font-size:18px
      "
    class="md-layout-item font-Roboto">
    {{this.$store.getters.AddressInfo.customer_code+" :"}}
    </div> 
    <div style="
      color:#414141;
      background-color:#EFEFEF;
      border:0.5px;
      border-radius: 0px 6px 6px 0px;
      padding: 40px 0 0 0px;
      width: 73%;
      font-weight: 600;
      font-size:18px
      " 
      class="md-layout-item font-Kanit">
    {{this.$store.getters.AddressInfo.customer_name_th}}  

   <div
   style="padding-top:10px ;color:#414141"
    class="md-layout-item font-Roboto"
    >
    {{this.$store.getters.AddressInfo.customer_name_eng}} 
 </div>
      </div>
</div>
  <div style="
    margin-top:20px;
    border: 1px solid #D1D1D1;
    border-radius: 3px;
    opacity: 1;
    width: 100%;
    height: 170px;
    "
     class="box2">
     <div style="padding-top:15px;font-family:Roboto;font-size:18px"  class="md-layout-item title-cut-detail">  Address Info </div>
     <div style="padding: 10px 10px 0 10px" class="md-layout-item">  
       <md-auto-search-box3
            :placeholder="'Address'"
            :value="this.$store.getters.AddressInfo.addr"
            :disabled="true"
          >
        </md-auto-search-box3> 
        </div>
        <div style="padding: 10px 10px 0 10px" class="md-layout"> 
          <div style="padding: 0px 20px 0 0px;width: 30%;" class="md-layout-item">
            <md-auto-search-box3
            :placeholder="'District'"
            :value="this.$store.getters.AddressInfo.dist_code"
            :disabled="true"
          >
            </md-auto-search-box3> 
          </div>

          <div style="padding: 0px 20px 0 0px;width: 30%;" class="md-layout-item"> 
             <md-auto-search-box3
            :placeholder="'Province'"
            :value="this.$store.getters.AddressInfo.prov_name"
            :disabled="true"
             >
            </md-auto-search-box3> 

          </div>

           <div style="padding: 0px 20px 0 0px;width: 20%;" class="md-layout-item"> 
             <md-auto-search-box3
            :placeholder="'Zipcode'"
            :value="this.$store.getters.AddressInfo.zipcode"
            :disabled="true"
             >
             </md-auto-search-box3> 
          </div>

          <div style="padding: 0px 0px 0 0px;width: 20%;" class="md-layout-item"> 
             <md-auto-search-box3
            :placeholder="'Area'"
            :value="this.$store.getters.AddressInfo.area"
            :disabled="true"
             >
             </md-auto-search-box3>
          </div>
          
          </div> 
        
    </div>
     <div style="
    margin-top:20px;
    border: 1px solid #D1D1D1;
    border-radius: 3px;
    opacity: 1;
    width: 100%;
    height: 225px;
    "
     class="box2">
      <div style="padding-top:15px;font-family:Roboto;font-size:18px"  class="md-layout-item title-cut-detail">  Credit Info </div>
      <div style="padding: 10px 10px 0 10px" class="md-layout-item"> 
        <div style="padding: 0px 0px 0 0px" class="md-layout"> 
          
          <div style="padding: 0px 20px 0 0px;width: 14%;" class="md-layout-item">
            <md-auto-search-box3
            :placeholder="'Credit Limit'"
            :value="Number(this.$store.getters.AddressInfo.creditlimit).toLocaleString()"
            :disabled="true"
          >
            </md-auto-search-box3>
          </div>

          <div style="padding: 0px 20px 0 0px;width: 20%;" class="md-layout-item"> 
             <md-auto-search-box3
            :placeholder="'Credit Term'"
            :value="this.$store.getters.AddressInfo.creditterm"
            :disabled="true"
             >
            </md-auto-search-box3>

          </div>

          <div style="padding: 0px 20px 0 0px;width: 20%;" class="md-layout-item"> 
             <md-auto-search-box3
            :placeholder="'Payment Term'"
            :value="this.$store.getters.AddressInfo.paymentterm"
            :disabled="true"
             >
             </md-auto-search-box3>

          </div>

          <div style="padding: 0px 20px 0 0px;width: 20%;" class="md-layout-item"> 
             <md-auto-search-box3
            :placeholder="'Customer Group'"
            :value="this.$store.getters.AddressInfo.cust_grp"
            :disabled="true"
             >
             </md-auto-search-box3>

          </div>

          <div style="padding: 0px 0px 0 0px;width: 26%;" class="md-layout-item"> 
             <md-auto-search-box3
            :placeholder="'Customer Type'"
            :value="this.$store.getters.AddressInfo.customer_type"
            :disabled="true"
             >
             </md-auto-search-box3> 
          </div>
          
          </div> 

        <div style="padding: 10px 0px 0 0px" class="md-layout"> 
          
          <!-- <div style="padding: 0px 20px 0 0px;width: 25%;" class="md-layout-item">
            <md-auto-search-box3
            :placeholder="'Warehouse'"
            :value="this.$store.getters.AddressInfo.warehouse"
            :disabled="true"
          >
            </md-auto-search-box3>
            <md-tooltip  style="height: auto; white-space: normal; max-width:30%;"  md-delay="100" md-direction="top"> <span class="kanitFont">{{this.$store.getters.AddressInfo.warehouse}}</span></md-tooltip> 

          </div> -->

          <div style="padding: 0px 20px 0 0px;width: 28%;" class="md-layout-item"> 
             <md-auto-search-box3
            :placeholder="'Customer Channel'"
            :value="this.$store.getters.AddressInfo.customer_channel"
            :disabled="true"
             >
            </md-auto-search-box3>

          </div>

          <div style="padding: 0px 20px 0 0px;width: 17%;" class="md-layout-item"> 
             <md-auto-search-box3
            :placeholder="'Price Policy'"
            :value="this.$store.getters.AddressInfo.price_policy"
            :disabled="true"
             >
             </md-auto-search-box3>
              
          </div>

          <div style="padding: 0px 20px 0 0px;width: 13%;" class="md-layout-item"> 
             <md-auto-search-box3
            :placeholder="'Default Price'"
            :value="this.$store.getters.AddressInfo.price_type"
            :disabled="true"
             >
             </md-auto-search-box3>

          </div>

          <div style="padding: 0px 10px 0 0px;width: 13%;" class="md-layout-item"> 
             <md-auto-search-box3
            :placeholder="'Fix Price'"
            :value="this.$store.getters.AddressInfo.pricefix_code"
            :disabled="true"
             >
             </md-auto-search-box3> 
          </div>

          <div style="padding: 0px 10px 0 0px;width: 13%;" class="md-layout-item"> 
             <md-auto-search-box3
            :placeholder="'Book Price'"
            :value="this.$store.getters.AddressInfo.pricebook_code"
            :disabled="true"
             >
             </md-auto-search-box3> 
          </div>
          <div style="padding: 0px 0px 0 0px;width: 16%;" class="md-layout-item"> 
             <md-auto-search-box3
            :placeholder="'Pay by'"
            :value="this.$store.getters.AddressInfo.pay_by"
            :disabled="true"
             >
             </md-auto-search-box3>
          </div>
        </div>

        <div style="padding: 10px 0px 0 0px" class="md-layout">
          <div style="padding: 0px 20px 0 0px;width: 28%;" class="md-layout-item">
            <md-auto-search-box3
            :placeholder="'Ship to'"
            :value="this.$store.getters.AddressInfo.shipto"
            :disabled="true"
          >
            </md-auto-search-box3>
            <md-tooltip  style="height: auto; white-space: normal; max-width:30%;"  md-delay="100" md-direction="top"> <span class="kanitFont">{{this.$store.getters.AddressInfo.shipto}}</span></md-tooltip> 
          </div>

          <div style="padding: 0px 20px 0 0px;width: 30%;" class="md-layout-item">
            <md-auto-search-box3
            :placeholder="'Warehouse'"
            :value="this.$store.getters.AddressInfo.warehouse"
            :disabled="true"
          >
            </md-auto-search-box3>
            <md-tooltip  style="height: auto; white-space: normal; max-width:30%;"  md-delay="100" md-direction="top"> <span class="kanitFont">{{this.$store.getters.AddressInfo.warehouse}}</span></md-tooltip> 
          </div>
        </div>
      </div>
    </div>
        <div style="
        margin-top:20px;
        border: 1px solid #D1D1D1;
        border-radius: 3px;
        opacity: 1;
        width: 100%;
        height: auto;
        padding-bottom:0px;
        "
        class="box3">
       <div style="padding-top:15px;font-family:Roboto;padding-left:15px;font-size:18px" class="md-layout-item title-cut-detail">Salesman Info</div>
        <div style="background-color:; margin: 20px 10px 0 15px" class="md-layout">
      
       <div style="padding: 0px 20px 0 0px;width: 48%;" class="md-layout-item"> 
       <small style="color:#727272 ; "> Salesman (Cipher) </small> 
       </div>
       <div style="width: 4%;"></div>
       <div style="padding: 0px 20px 10px 0px;width: 48%;" class="md-layout-item"> 
        <small style="color:#727272 ; "> Salesman (SalesOps) </small> 
       </div>
      </div>
      <div style="font-familt:Kanit; background-color:; margin: 0px 20px 20px 15px" class="md-layout">
            
      <div style="
      padding: 0px 25px 0 15px;
      width: 48%;
      height: 50%;
      border: 1px solid #EFEFEF;
      border-radius: 3px;
      opacity: 1;
      background-color:#fff"
      class=""> 
             <md-input-container class="textarea " 
             style="
             padding-top:0;
             background-color:;
             width: 100%; 
             height:auto;
             font-family:Kanit;
             ">
             <md-textarea
              class="inp-textarea"
              style="
              display: block;
              word-wrap: break-word;
              background-color:;
              line-height: 1.8;
              font-size:16px;
              height:auto;
              color:#414141"
              v-model="this.$store.getters.sales_cipher"
              :disabled="true"
            ></md-textarea>
            </md-input-container>
      </div>
      <div style="width: 4%;"></div>
            <div style="
            font-family:Kanit;
            padding: 0px 25px 0 15px;
            width: 48%;
            border: 1px solid #EFEFEF;
            border-radius: 3px;
            opacity: 1;
            background-color:#fff " 
      class="md-layout-item"> 
             <md-input-container class="textarea"
              style="
              font-family:Kanit;
              padding-top:0;
              width: 100%; 
              height:auto;
              ">
             <md-textarea
              class="inp-textarea"
              style="
              color:#414141;
              word-wrap: break-word;
              padding-bottom:2px;
              line-height: 1.8;
              font-size:16px;
              height:auto;
              "
              v-model="this.$store.getters.sales_local"
              :disabled="true"
            ></md-textarea>
            </md-input-container>
        </div>
      </div>
    </div>
<!-- BOX2 -->
            </md-layout>
        </md-dialog-content>
    </md-dialog>

    <md-dialog  id="all_cust_dialog_cm_role_add"  ref="details-customer-role-add" style="">
      <md-dialog-title
          style="font-weight: 600;background:#EFEFEF;color:#414141;font-size:16px;padding:15px 15px 15px 20px;"
        >
          <md-layout>
            <md-layout md-flex="70">
              <label class="sub-title font-Roboto">Role Details</label>
            </md-layout>
            <md-layout md-flex="30" md-align="end">
              <md-icon
                @click.native="closeDialog_role_add"
                style="cursor:pointer;margin-right:0px"
                >close</md-icon
              >
            </md-layout>
          </md-layout>
          <!-- All My Customer -->
        </md-dialog-title>
        
          <md-dialog-content class='content-dialog font-Roboto '  style="overflow: hidden;height:100%;width:100%;">
            <div style="margin:5px 30px 0 30px;background-color:;">
              <div style="width: 100%;" class="md-layout" > 
                <div style="width: 90%;background-color:" class="md-layout-item"> 
            <md-auto-search-box5
            :placeholder="'All Role'"
            :data="this.$store.getters.search_role_user"
            :value="value_add_Roledetail"
            @filter="search_Roledetail"
            @choose="choose_Roledetail"
            :disabled="false"
          ></md-auto-search-box5>
          </div>
          <div style="width: 10%;background-color:" class="md-layout-item"> 
          
             <div 
               @click="search_user()"
             style="
             background: #FD7F00 0% 0% no-repeat padding-box;
              height: 37px;
              border-radius: 3px;
              opacity: 0.9;
              padding-left:0;
              align-items: center;
              margin-top:8px;
              margin-left:10px;
              width:80%;
              display:flex;
              justify-content:center;
              cursor: pointer;"
              >
           <md-icon style="cursor: pointer;font-size:23px;color:#fff;">search</md-icon>
             </div>
          </div>
              </div>
              
        <md-layout> 
            <md-auto-search-box3
            
            :placeholder="'Name'"
            :value="this.$store.getters.fname"
            :disabled="true"
            >
            </md-auto-search-box3> 
         </md-layout>
              <md-layout> 
                <md-auto-search-box3
            :placeholder="'Role Description'"
            :value="this.$store.getters.role_desc"
            :disabled="true"
            >
            </md-auto-search-box3> 
          </md-layout>
          <md-layout style="padding-top:9px"> 
            <span class="font-Roboto" style="color:#727272;font-weight:600;">Status : </span>
            <div class="font-Roboto" >&nbsp;{{this.$store.getters.role_status}}</div> 
            
          </md-layout>
            </div>
 <md-layout style="background-color:;width: 100%;display: flex;justify-content: flex-end;padding-right: 4%;  padding-top:5px">
            <md-button style="color:#fff;background: #A8A8A8 0% 0% no-repeat padding-box;opacity: 0.8;" class="" @click="closeDialog_Role_Detail('close')">Cancel</md-button>
            <md-button style="color:#fff;background: #FD7F00 0% 0% no-repeat padding-box;opacity: 0.8;" class="md-primary" @click="closeDialog_Role_Detail('save')">SAVE</md-button>
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
  { code: 3, desc: 'Customer with Role' },
  { code: 2, desc: 'Customer Master' }
]
export default {
  name: 'menu-mangement',
  data () {
    return {
     
      showFooter: false,
      title: 'CUSTOMER MANAGEMENT',
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

      codeChannel:'',
      codeChannel_role:'',
      cus_list:'All Customer Channel',
      cus_list2:'All Customer Channel',
      shw_customer:false,
      customer_cus:"",
      codeCus:'',
      cusId:'',
      customer_cus_role:"",
      codeCus_role:'',
      cusId_role:'',
      customer_cus_all_role:"",
      codeCus_all_role:'',
      cusId_all_role:'',
      provinceCode:'',
      province_choose:'',
      proCus:'',
      data_remove:"",

      limit:100,
      start:0,
      customer_master_list:[],
      value_add_Roledetail:'',

       codeChannel_edit:'',
       customer_edit:'',
       role_code_edit:'',

       select_check_list:[]

    }
  },
   computed: {
     List_all_search_add_role(){
       return this.$store.getters["Temp_All_add"];
     }
   
  },
  methods: {

// CUSTOMER WITH ROLE

      set_channel_role( value ){
         this.codeChannel_role = value.code;
         this.$store.dispatch("searchCustomerRole",{
          cust_search : this.codeCus_role,
          role : this.codeCus_all_role ,
          channel :value.code});
    },
      chooseCust_cus_role: function(item){
      this.customer_cus_role = item.code +'  '+item.title;
      this.codeCus_role = item.code;
      this.cusId_role = item.title;
       
    },
      choose_role: function(item){
      this.customer_cus_all_role = item.role +'  '+item.name;
      this.codeCus_all_role = item.role;
      this.cusId_all_role = item.name;
    },
      searchCustomer_role: function(param) {
      //  this.shw_customer = true;
      if (param.length > 1) {
        this.$store.dispatch("getAllCustomer", param);
        this.codeCus_role = param
      } else if (param.length == 0) {
        this.$store.dispatch("getAllCustomer", '');
        
           this.codeCus_role = ''
      }
    },  
      search_role: function( param ){
          if (param.length > 2) {
            this.$store.dispatch('searchDetailAllRole',param)
              this.codeCus_all_role  = param
          // this.$store.dispatch("searchCustomerRole",{
          // cust_search :this.codeCus_role,
          // role :param,
          // channel :this.codeChannel_role});
      } else if (param.length == 0) {
        //  this.$store.dispatch("searchCustomerRole",{
        //   cust_search :this.codeCus_role,
        //   role :'',
        //   channel :this.codeChannel_role});
          this.codeCus_all_role  = ''
      }
    },
//-----

// CUSTOMER WITH ROLE EDIT
openDialog_role( param ){
      
      this.cus_list2= 'All Customer Channel'
      this.$store.commit('SET_CHANNEL_CODE_EDIT','')
      this.$store.commit('SET_SELECT_EDIT',[])
      this.role_code_edit = param.role
      this.$store.dispatch('editRoleDetail', 
      {
        'role_code':param.role,
        'cust_search':'',
        'channel':''
       })
       
      this.$refs['details-customer-role'].open()
    },
      set_channel_edit( value ){

      this.$store.commit('SET_CHANNEL_SEARCH',value.code)
       this.$store.commit('SET_ROLE_DETAIL',[])
       this.$store.commit('SET_SELECT_EDIT',this.$store.getters.select_customer_with_role)
       this.codeChannel_edit = value.code;
       this.$store.dispatch('editRoleDetail', 
      {
        'role_code':this.role_code_edit,
        'cust_search':this.customer_edit,
        'channel':value.code
       })

      },
      set_customer_edit( value ){
              this.customer_edit = value
      },
      SearchCustomerWithRole_edit(){

           this.$store.dispatch('editRoleDetail', 
      {
        'role_code':this.role_code_edit,
        'cust_search':this.customer_edit,
        'channel':this.codeChannel_edit
       })
          // console.log( this.codeChannel_edit + ' '+this.customer_edit)
      },
      check_select( param ,index){


     let check =  this.$store.getters.select_customer_with_role.indexOf(String(param.customer_code));
      if(check == -1){
        this.$store.commit('SET_COUNT_SELECT','add')
        this.$store.getters.select_customer_with_role.push(param.customer_code)
        this.select_check_list.push(param.customer_code)
        // console.log("Add")
      }else {
        this.$store.commit('SET_COUNT_SELECT','del')
        this.$store.getters.select_customer_with_role.splice(check,1)
        this.select_check_list.splice(check,1)
      }

      // console.log(this.$store.getters.select_customer_with_role)

      if(this.$store.getters.role_detail[index].chk == 'true'){
          this.$store.getters.role_detail[index].chk = 'false'
      }else {
          this.$store.getters.role_detail[index].chk = 'true'
      }
      // console.log("box =>",this.select_check_list)
      },
      Save_edit_role(){
     
      // console.log('save  ',  this.$store.getters.select_customer_with_role)

     this.$store.dispatch('updateRoleDetail',
      {
        role_code : this.role_code_edit,
        channel : this.codeChannel_edit,
        ccust:  JSON.stringify(this.$store.getters.select_customer_with_role)
      })
        // this.$refs['details-customer-role'].close()
        // this.$store.commit('SET_ROLE_DETAIL',[])
        this.$store.commit('SET_ROLE_CODE_EDIT',this.role_code_edit)
        // console.log("role_code =>" ,this.role_code_edit ,"channel =>" , this.codeChannel_edit,"ccust =>",this.$store.getters.select_customer_with_role )
      },

//-----

// CUSTOMER WITH ROLE ADD
search_Roledetail:function( item ){
  if(item.length == 0){
     this.$store.commit("SET_FNAME", '');
     this.$store.commit("SET_ROLE_STATUS", '-');
     this.$store.commit("SET_ROLEDESC", '');
    //  this.$store.commit('LIST_TEMP_ROLE_SEARCH_ALL',this.List_all_search_add_role)
    //  this.$store.dispatch('searchDetailAllRoleAdd','')
  }
  if(item.length > 2){
      this.value_add_Roledetail = item
      // this.$store.dispatch('searchDetailAllRoleAdd',item)
      this.$store.dispatch("searchUser",{
          role_code :item,
         });
   }
},
    choose_Roledetail:function( item ){
      this.value_add_Roledetail = item.role_code
      this.$store.dispatch("searchUser",{
          role_code :item.role_code,
       });
    },
//-----

// BTN_CUSTOMER WITH ROLE
    sync( param ){
       this.$store.dispatch('syncCustOnsales', {
        'role_code': param.role})
    },
    syn_btn(){
      this.$store.dispatch('syncCustOnsales', {
        'role_code': 'all'})
    },
    SearchCustomerWithRole(){
       this.$store.dispatch("searchCustomerRole",{
          cust_search :this.codeCus_role,
          role :this.codeCus_all_role,
          channel :this.codeChannel_role,
          type:'search'});
    },
//-----

// CUSTOMER WITH MASTER

  set_channel( value ){
        this.codeChannel = value.code;
        this.$store.commit('SET_CHANNEL_CODE_EDIT',value.code)
        this.$store.dispatch("searchCustomer",{
          cust_search :this.codeCus ,
          province : this.proCus,
          channel :value.code,
          type:this.btnType,
          check_load:'search'
          });
      },
     chooseCust_cus: function(item){
      this.customer_cus = item.code +'  '+item.title;
      this.codeCus = item.code;
      this.cusId = item.customer_id;
      
    },
     choose_province: function(item){
      this.provinceCode = item.code +'  '+item.title;
      this.proCus = item.title;

    },
      searchProvince: function( param ){
      if (param.length > 1) {
           this.$store.dispatch("settingProvinceAll",param);
           this.proCus = param
      } else if (param.length == 0) {
         this.$store.dispatch("settingProvinceAll",'');
          this.proCus = ''
       }
    },
      filter_searchCustomer: function(param) {
      //  this.shw_customer = true;
      if (param.length > 1) {
        this.$store.dispatch("getAllCustomer", param);
        this.codeCus = param
      } else if (param.length == 0) {
          this.codeCus = ''
      }
    },
      SearchCustomerMaster(){
       this.$store.dispatch("searchCustomer",{
          cust_search :this.codeCus ,
          province : this.proCus,
          channel :this.codeChannel,
          type:this.btnType,
          check_load:'search'
      });
    },
//-----
      selectType(value) {
      this.$store.dispatch("searchCustomer",{
          cust_search :this.codeCus,
          province : this.proCus,
          channel :this.codeChannel,
          type:value,
          check_load:'search'});
      this.btnType = value;
   },
   search_user(){
      this.$store.dispatch("searchUser",{
          role_code :this.value_add_Roledetail,
         });
      // console.log('Search User => ',this.value_add_Roledetail)
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
    }, 
    handleScroll_WithRole( event ) {
    // console.log(event.target.scrollTop ,event.target.clientHeight , event.target.scrollHeight  )
      if (
        event.target.scrollTop + event.target.clientHeight >=
        event.target.scrollHeight-1
      ) {
        let count = this.$store.getters.customerListRole.length
        // console.log(count)
        this.$store.dispatch('scrollLoadData',count)
      }else {
      }
    },
    handleScroll_Master( event ){
      // console.log( event.target.scrollTop ,event.target.clientHeight , event.target.scrollHeight )
        if (
        event.target.scrollTop + event.target.clientHeight >=
        event.target.scrollHeight-0.5
      ) {
        let count = this.$store.getters.customerList.length
        //  console.log(count)
        this.$store.dispatch('scrollLoadData2',count)
      }else {
      }
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
   
   
    selectedTab (row) {
      this.activeTab = row.code
      this.$store.commit("SET_CUSTOMER_LIST", [])
      // console.log(row)
      if(row.code ==2 ){
      this.$store.dispatch("searchCustomer",{
          cust_search :'',
          province :'',
          channel :'',
          type:this.btnType});
      }
    },

  check( param ){
    // console.log(" BOX ",param)
    return true
  },
    addData () {
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
    
    openDialog_role_remove( param ){
      this.data_remove = param
      this.$refs['details-customer-role-remove'].open()
    },
     openDialog_role_add(){
    // this.$store.dispatch('searchDetailAllRoleAdd','')
     this.$store.commit("SET_FNAME", '');
     this.$store.commit("SET_ROLE_STATUS", '-');
     this.$store.commit("SET_ROLEDESC", '');
     this.value_add_Roledetail =''
      this.$refs['details-customer-role-add'].open()
    },
    openDialog_master( param ){
     
      this.$store.dispatch('customerDetails', {
        'cust_code':param.customer_code ,})
      this.$refs['all_cust_dialog'].open()
    },
    closeDialog_role (param ) {
      if(param === 'save'){
        //  console.log('REMOVE => ',this.data_remove)
        this.$store.dispatch('delRoleDetail', {
        'role_code': this.data_remove.role})
      }else {
      }  
       
        this.$refs['details-customer-role-remove'].close()
        this.$refs['details-customer-role'].close()
        this.$store.commit('SET_ROLE_DETAIL',[])
      
    },
    closeDialog_role_add( param ){
      this.$refs['details-customer-role-add'].close()
    },
     closeDialog_master () {
        this.$refs['all_cust_dialog'].close()
        this.$refs['details-customer-role'].close()
        
    },
    closeDialog_Role_Detail( param ){
      
      if(param === 'save'){
        this.$store.dispatch('addRoleDetail', {
        'role_code': this.value_add_Roledetail})
        // console.log("save Role",this.value_add_Roledetail);
      }
      
       this.$refs['details-customer-role-add'].close()
    },
  dataListSearch(){},
  chooseMaster( value ){
  // console.log(value)
  },
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
        this.$store.dispatch('setPathMenuService','setting')
        this.$store.dispatch("searchCustomerRole",{
          cust_search :'',
          role :'',
          channel :'',
          type:''});
        this.$store.dispatch('searchDetailAllRoleAdd','')
        this.$store.dispatch("countCustomer");
        this.$store.dispatch("settingChannelAll");
        this.$store.dispatch("getAllCustomer", "");
        this.$store.dispatch("settingProvinceAll",'');
        this.$store.dispatch("searchDetailAllRoleAdd_Full",'');
        
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
    'md-search-box2': require('../Salesops/customComponent/md-cpr-search-box2'),
    "md-dropdown-box": require("../Salesops/customComponent/mdc-dropdown-box.vue"),
    "md-dropdown-box2": require("../Salesops/customComponent/mdc-dropdown-box2.vue"),
    "md-auto-search-box": require("../activity/act-management-component/md-auto-search-box.vue"),
    "md-auto-search-box3": require("../activity/act-management-component/md-auto-search-box3.vue"),
    "md-auto-search-box4": require("../activity/act-management-component/md-auto-search-box4.vue"),
    "md-auto-search-box5": require("../activity/act-management-component/md-auto-search-box5.vue"),

 
 }
}
</script>
<style lang="scss" scoped>
$font-kanit: Kanit;

.font-Kanit{
  font-family: Kanit;
}
.font-Roboto{
  font-family: Roboto;
}

.title-cut-detail{
  font-size: 14px;
  font-weight:600;
  padding:10px 0 0 10px;
}

.detail-data{
   
    padding:15px 0 15px 15px;
    border-radius: 5px;
    margin:0px 10px 0 15px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 3px #00000029;
    opacity: 1;
    }

.inp-textarea{
  font-family: inherit !important;
}
.textarea:after{
  position:unset;
}
.textarea{

}
.md-input-container{
  margin:0
}

/* The container */
.container {
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

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 2px solid #707070;
    border-radius: 4px;
    opacity: 0.7;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
   background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #FD7F00 ;
  border-color: #FD7F00 ;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
   content: '';
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
    left: 6px;
    top: 1px;
    width: 5px;
    height: 11px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

				  



 
#pageMenuManagement {
  
      .box-1{
      height: 200px;
      border: 1px solid #ddd;
      background-color: red;
      margin:15px;
      border-radius: 5px;
    }

 
  .detail{
    border-radius: 4px;
    padding-top:5px;
  }
  .detail:hover{
    background-color: #EFEFEF;
  }
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
