<template>
  <div id="pageRicipient">
    <md-layout md-gutter class="mh-0">
      <md-layout md-column md-gutter md-flex="25">
        <menu-left></menu-left>
      </md-layout>
      <md-layout md-column md-gutter md-flex="75" style="padding-left:2%;">
        <md-layout style="flex: initial;" class="header-bar">
          <div class="title ml-20" style="width:50%;text-align:left">{{ title }}</div>
        </md-layout>
        <md-layout style="flex: initial; height: 80px;" class="header-bar ">
          <div style="padding-left: 5%; width: 15%; text-align: left;">
            <div class="text-1">Year</div>
            <div class="text-2 no-under-line-dp" style="padding-right:10%">
                <md-input-container
                  style="margin:0px;min-height:30px;padding-top:3px;height:30px;"
                >
                  <md-select class="select-rep" v-model="dataDefault.year">
                    <md-option
                      @click.native="selecedData('year',v.code)"
                      v-for="(v, index) in dataDefaultList.years"
                      :value="v.code"
                      :key="index"
                    >
                      <template>
                        <div class="select-rep-2">
                          {{ v.name }}
                        </div>
                      </template></md-option
                    >
                  </md-select>
                </md-input-container>
            </div>
          </div>
          <div style="width: 15%; text-align: left; padding-left: 5%;">
            <div class="text-1">Cycle</div>
            <div class="text-2 no-under-line-dp" >
              <md-input-container
                  style="margin:0px;min-height:30px;padding-top:3px;height:30px;"
                >
                  <md-select class="select-rep" v-model="dataDefault.cycle">
                    <md-option
                      @click.native="selecedData('cycle',v.code)"
                      v-for=" v in dataDefaultList.cycles"
                      :value="v.code"
                      :key="dataDefault.year+'_' + v.code"
                    >
                      <template>
                        <div class="select-rep-2">
                          {{ v.name }}
                        </div>
                      </template></md-option
                    >
                  </md-select>
                </md-input-container>
            </div>
          </div>



          <div style="width: 18%; text-align: left; padding-left: 5%;">
            <div class="text-1">Set Working Cycle</div>
            <form @click.stop.prevent="changePayStatus">
              <md-switch style="margin-bottom: 0px;margin-top: 13px;"
                type="submit"
                v-model="dataDefault.payStatus"
                class="md-primary"
                :disabled="statusLook && flowStateStr == 'PASS' ? true : false"
              ></md-switch>
            </form>
          </div>
          
          <div style="width: 14%; text-align: left; padding-left: 5%;">
            <div class="text-1">Active Group</div>
            <form @click.stop.prevent="changeStatus">
              <md-switch style="margin-bottom: 0px;margin-top: 13px;"
                type="submit"
                v-model="statusAtv"
                class="md-primary"
              ></md-switch>
            </form>
          </div>
          <div style="padding-right: 10%; width: 33%; text-align: right;">
            <md-button class="md-raised" style="color:#ff9800; background-color: #efefef;" 
              @click="openAddGroup"
              :disabled="statusLook">
              <md-icon
                class="pb-4"
                md-verticalstatus-plan-align="center"
                md-align="center"
                >add</md-icon
              >
              <label class="ml-15 addNewRow" ><span style="color:#ff9800;">Add Group</span></label>
            </md-button>
          </div>
        </md-layout>
        <md-layout style="flex: initial;padding-left: 5%;">
          <div style="padding-top:4px;">
           <label style="text-align:left;" ><span style="color:#2c3e50;">PAYMENTS</span></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <label v-if="flowStateStr != ''" style="text-align:left;" > <button :style="{'background-color': flowStateStr == 'NON ENTRY' ? '#A8A8A8' : '#FD7F00'}" class="button2 button6">{{flowStateStr}}</button></label>
        </md-layout>
        <md-layout
          style="margin-left:5%;flex: initial;margin-top:10px"
          class="search-cust-box"
        >
          <div style="width:38%">
            <!-- twotwo -->
            <md-dropdown-box
              v-model="inputDP"
              :data="byGroupList"
              @choose="salesTeamHead"
            ></md-dropdown-box>
          </div>

          <div style="width:38%">
            <md-search-box-new
              id="pageRicipient-search-box"
              :placeholder="'Search'"
              :data="bySMList"
              @filter="filterSales"
              @choose="chooseSales"
              @clear="clearSearch"
            ></md-search-box-new>
          </div>
          <div class="md-report-bar" style="width:24%;">
            <span style="font-size:11px;color:#727272;font-family:roboto"
              >Recipient</span
            >
            <span
              style="font-size:18px;color:#575757;font-family:Helvetica Neue;padding-left:13px"
            >
              <b>{{
                $store.getters['globalfunc/formatNumberInt'](countData)
              }}</b>
            </span>
          </div>
        </md-layout>

        <!-- <div v-for="(value, index1) in dataList" :key="index1">
          <div v-if="value.group_name == 'NONE GROUP'">
            <div v-for="(vl, index2) in value.details" :key="index2">
              {{vl.group_name}}
            </div>
          </div>
        </div> -->

        <md-spinner
          :md-size="150"
          :md-stroke="1"
          v-show="spinnerLoading"
          md-indeterminate
        ></md-spinner>
        <div
          id="pageRicipient-scroll"
          style="overflow-y: auto;overflow-x: hidden; height: calc(100vh - 220px);margin-top: 20px;"
        >
          <div
            v-for="(row, idx) in dataList"
            :key="idx + '-head-box'"
            style="margin-bottom: 20px;"
          >
            <div
              class="head-box"
              :style="{
                'padding-bottom': row.group_code == '' ? '10px' : '',
                'margin-top': '0px',
                
              }"
            >
              <!-- group1 -->
               <div
                class="head-table"
                style="display: -webkit-box;padding-top:10px;padding-right:5px"
              >
              <div style="padding-top:3px;background-color:;width:auto;">{{ row.group_name }}</div>
                <div
                  :class="'column-descript'"
                  style="background-color:;width:25%;text-align:left;padding-top:0px;font-family:roboto"
                >
                  <button class="button button5">{{row.details.length}}</button>
                </div>

              </div>
              <!-- <div style="background-color:red;text-align:left;width: 20%;">
                    <span>{{ row.group_name }}</span><button class="button button5">{{row.details.length}}</button>
                </div> -->
              <div
                class="head-table"
                style="display: -webkit-box;padding-top:14px;padding-right:5px"
              >
                <div style="background-color:;width:8%;"></div>
                <div
                  :class="'column-descript'"
                  style="background-color:;width:25%;text-align:left;padding-top:8px;font-family:roboto"
                >
                  Salesman
                </div>

                <div
                  :class="'team_code'"
                  style="background-color:;width:32%;text-align:left;padding-top:8px;font-family:roboto"
                >
                  Sales Team
                </div>

                <div
                  :class="'status'"
                  style="background-color:;width:10%;padding-top:8px;font-family:roboto"
                >
                  Paid
                </div>

                 <div
                  :class="'status'"
                  style="background-color:;width:15%;padding-top:8px;font-family:roboto"
                >
                 <span v-if="row.group_name != 'NONE GROUP'">Min. Target</span> 
                </div>
                 <div
                  :class="'status'"
                  style="background-color:;width:5%;padding-top:8px;font-family:roboto"
                >
                </div>

                <div
                  :style="{
                    background:'',
                    width: '5%',
                    cursor: row.group_code == 'none_group' ? '' : 'pointer',
                    'text-align': 'right'
                  }"

                >
                  <md-menu
                    md-size="4"
                    md-direction="bottom left"
                    v-if="row.group_code != ''"
                  >

                    <md-button class="md-icon-button" md-menu-trigger
                    :disabled="statusLook">
                      <md-icon>more_vert</md-icon>
                    </md-button>
                    <md-menu-content>
                      <md-menu-item @selected="openEditGroup(row)">
                        <span>Manage Recipient</span>
                      </md-menu-item>
                      <md-menu-item v-if="statusAtv == true" @selected="instatusGroup(row)">
                        <span v-if="statusAtv == true">Inactive</span>
                      </md-menu-item>
                      <md-menu-item v-if="statusAtv == false" @selected="actstatusGroup(row)">
                        <span v-if="statusAtv == false">Active</span>
                      </md-menu-item>
                      <md-menu-item  @selected="openChangeTarget( row )">
                        <span>Set a min. Sales Target</span>
                      </md-menu-item>
                    </md-menu-content>
                  </md-menu>
                </div>
              </div>
            </div>
            <md-layout style="flex: initial;" class="cust-list-box">
              <div
                class="body-deatil"
                @scroll="handleScroll"
                style="max-height: 100%"
              >
                <div
                  v-if="row.details.length == 0"
                  style="margin-top: 15px;font-size:14px;text-align:center;margin-bottom: 15px;"
                >
                  No salesman ....
                </div>
                <div
                  class="detail-table"
                  v-for="(item, index) in row.details"
                  :key="index"
                  :style="{ 'margin-top': '8px' }"
                  :id="item.sm_code + '-row-recipient'"
                >
                  <div style="text-align:left;width:8%;padding-top:8px">
                    <md-icon style="color:#797979">person</md-icon>
                  </div>
                  <div
                    :class="'column-descript'"
                    style="background-color:;width:25%;text-align:left;color:#414141;padding-top:8px"
                  >
                    {{ item.sm_code }}&nbsp;{{ item.sm_name }}
                  </div>
                  <div
                    class="teamname"
                    style="background-color:;width:32%;padding-top:8px;font-family:kanit"
                  >
                    {{ item.salesteam_name }}
                  </div>
                  <div style="background-color:;width:10%;cursor: pointer;">
                    <form
                      @click.stop.prevent="
                        changePaid({ parent: idx, child: index })
                      "
                      style="height:22px;padding-top:8px"
                    >
                      <md-switch
                        type="submit"
                        v-model="item.paid"
                        class="md-primary"
                        :disabled="statusLook"
                      ></md-switch>
                    </form>
                  </div>

                    <div v-if="item.group_code != 'none_group'" style="width:15%;padding:8px 0px 0px 25px">
                   <md-input-container style="min-height:auto;padding:0px 0px 0px 0px;margin:0px" >
        
                  <md-input 
                  style="font-size:14px;font-family:Kanit"
                  type="text" 
                  v-model="item.min_target"
                  @keypress.native="isNumber" 
                  @focus="check_edit(item.min_target,item,{ parent: idx, child: index })" 
                  @blur.native="calculateOther" 
                  class="text-left" 
                  ></md-input>
                  <!-- <md-input type="number" @keyup.native="hide(item.min_target,item)" @blur="hide(item.min_target,item)" @focus="check_edit(item.min_target,item)"  style="padding:0px"  v-model="item.min_target"></md-input> -->
                </md-input-container>
                  </div>
                      <div v-if="item.group_code != 'none_group'" style="width:5%;padding-top:8px">
                    <md-icon 
                    :style="{'color':idIconEdit === item.id ? '#FD7F00': '#fff' }">edit</md-icon>
                  </div>

                  <div
                    :stlye="{
                      width: '5%',
                      'text-align': 'right',
                      'padding-right': '18.5px',
                      cursor: item.group_code == 'none_group' ? '' : 'pointer'
                    }"
                    class="hover-icon"
                  >
                    <md-menu
                      md-size="4"
                      md-direction="bottom left"
                      v-if="item.group_code != 'none_group'"
                    >
                      <md-button class="md-icon-button" md-menu-trigger :disabled="statusLook">
                        <md-icon>more_vert</md-icon>
                      </md-button>
                      <md-menu-content>
                        <md-menu-item
                          @selected="removeSM({ parent: idx, child: index })"
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

          <md-layout
            style="flex: initial;margin-top :20px !important"
            md-align="center"
            class="cust-list-box"
            v-if="dataList.length == 0"
          >
            <span class="nodata">No recipient group.</span>
          </md-layout>
        </div>
      </md-layout>
    </md-layout>

    <!--COMFIRM DG-->
    <md-dialog ref="confirm-dialog1" style="margin:unset">
      <md-dialog-title>Do you want to close manage recipient?</md-dialog-title>
      <md-dialog-content></md-dialog-content>
      <md-dialog-actions>
        <md-button @click="cancelProcess1" style="color:#A8A8A8"
          >Cancel</md-button
        >
        <md-button @click="closeProcess1" style="color:#A8A8A8"
          >Close</md-button
        >
        <md-button @click="submitProcess1" class="md-primary"
          >Save & Close</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-dialog ref="confirm-sales-target" style="margin:unset">
      <md-dialog-title ><span style="font-family: Roboto;font-size:16px ;letter-spacing: 0px;color: #727272;opacity: 1;">Do you want to modify the minimum sales target to ?</span> </md-dialog-title>
      <md-dialog-content style="display: flex;justify-content: space-around;">
        <div> <span style="color: #5A5A5A;font-family:Lato;font-size:22px">฿</span> <input style="font-size:22px;color: #5A5A5A"   v-model="inp_group_target"  class="inputdialogtarget" type="number"></div>
       
         </md-dialog-content>
      <md-dialog-actions>
       
        <md-button @click="closeTarget" style="color:#A8A8A8"
          >Close</md-button
        >
        <md-button @click="submitTarget" class="md-primary"
          >Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    

    <md-dialog ref="confirm-dialog" style="margin:unset">
      <md-dialog-title>{{ ques }}</md-dialog-title>
      <md-dialog-content>{{ ans }}</md-dialog-content>
      <md-dialog-actions>
        <md-button @click="cancelProcess" style="color:#A8A8A8"
          >Cancel</md-button
        >
        <md-button
          v-if="tripleBtn != ''"
          @click="closeProcess"
          style="color:#A8A8A8"
          >{{ tripleBtn }}</md-button
        >
        <md-button class="md-primary" @click="submitProcess">{{
          rightBtn
        }}</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!--COMFIRM DG-->
    <md-dialog ref="dg" id="pageRicipientDG" class="md-dialog-container">
      <md-dialog-title style="display: -webkit-box;">
        <!-- headerManageRecipient -->
        <div style="width:98%">Manage Recipient</div>
        <div style="width:2%;cursor:pointer" @click="closeByButton">
          <md-icon>close</md-icon>
        </div>
      </md-dialog-title>

      <md-dialog-content
        :style="{ height: footer ? '550px' : '550px', overflow: 'hidden' }"
        style="width:99%;margin-left:5px; margin-right:5px;"
      >
        <div style="position: absolute; margin-left: 38%;">
          <md-spinner
            :md-size="150"
            :md-stroke="1"
            v-show="spinnerLoadingDG"
            md-indeterminate
          ></md-spinner>
        </div>
        <div style="display: -webkit-box;width:100%;padding-top:0px;">
          <div class="head-text" style="width:12%;padding-top:10px;">
            Recipient Group
          </div>
          <div
            v-click-outside="outsideCode"
            class="head-text mds-input"
            style="width:20%;padding-top:1px;"
          >
            <md-input-container md-inline style="width:180px;">
              <label>code</label>
              <md-input
                v-model="iptCode"
                :disabled="disabledCode"
                @keypress.native="checkDupCode"
                ref="iptCode"
                maxlength="15"
              ></md-input>
            </md-input-container>
          </div>
          <!-- v-click-outside="outsideName" -->
          <div class="head-text mds-input" style="width:60%;padding-top:1px;">
            <md-input-container md-inline>
              <label>name</label>
              <!-- textEdit @keypress.native -->
              <md-input
                v-model="iptName"
                @keypress.native="checkCharacter"
                maxlength="50"
              ></md-input>
            </md-input-container>
          </div>

          <!-- แสดง tab Save Group และ Add Recipient -->
          <div class="head-text" style="width:5%;">
            <md-menu md-size="4" md-direction="bottom left">
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item @selected="openSaveGroup">
                  <span>Save Group</span>
                </md-menu-item>
                <md-menu-item @selected="showFooter">
                  <span>Add Recipient</span>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>
        <div style="width:100%;padding-top:0px" class="cust-list-box">
          <div
            class="head-table"
            style="display: -webkit-box;padding-top:25px;padding-right:5px"
          >
            <div style="width:4%;"></div>
            <div
              :class="'column-descript'"
              style="width:20%;padding-top:8px;font-family:roboto;"
            >
              Salesman
            </div>
            <div
              :class="'team_code'"
              style="width:26%;text-align:left;padding-top:8px;font-family:roboto;margin-right:2px;"
            >
              Sales Team
            </div>
            <div
              :class="'status'"
              style="width:4%;padding-top:8px;font-family:roboto;"
            >
              Paid
            </div>
            <div
              style="padding-top:8px;color:rgba(0, 0, 0, 0.54);padding-left:5px;"
            >
              Sales Representative
            </div>
            <div style="width:10%;cursor: pointer;text-align:right"></div>
          </div>
          <div
            class="body-deatil"
            @scroll="handleScroll"
            :style="{
              height: footer ? 'calc(100vh - 425px)' : 'calc(100vh - 330px)'
            }"
          >
            <div
              class="detail-table"
              v-for="(item, index) in arrDetails"
              :key="index"
              :style="{ 'margin-top': '3px' }"
              :id="'row-' + index"
            >
              <div style="width:4%;padding-top:9px;">
                <md-icon style="color:#797979">person</md-icon>
              </div>
              <div
                :class="'column-descript'"
                style="font-size:12px;width:20%;text-align:left;color:#414141;padding-top:14px;"
              >
                {{ item.sm_code }}&nbsp;{{ item.sm_name }}
              </div>
              <div
                class="teamname"
                style="padding-top:14px;font-family:Kanit;margin-right:2px;"
              >
                {{ item.salesteam_name }}
              </div>
              <div style="width:6%;cursor: pointer;text-align:center;">
                <form
                  @click.stop.prevent="changePaidFromDg(item)"
                  style="height:22px;"
                >
                  <md-switch
                    type="submit"
                    v-model="item.paid"
                    class="md-primary"
                  ></md-switch>
                </form>
              </div>
              <div style="width:38%;margin-right:-21px;">
                <!-- oneone -->
                <md-input-container
                  style="margin:0px;min-height:30px;padding-top:3px;height:30px;"
                >
                  <md-select class="select-rep" v-model="item.select_sales_rep">
                    <md-option
                      v-for="(v, ind) in item.sales_rep"
                      :value="v.salesCode"
                      :key="ind"
                    >
                      <template>
                        <div class="select-rep-2">
                          {{ v.salesCode }} {{ v.salesName }} {{ v.salesTeam }}
                        </div>
                      </template></md-option
                    >
                  </md-select>
                </md-input-container>
                <!--
                <select
                  v-model="selected[index]"
                  style="width:100%;height:40px;font-size:12px;font-family:Kanit;color:#414141;
                       border-color:white;border-bottom-color:#efefef;height:auto;margin-top:4px;"
                >
                  <option value="none">NONE</option>
                  <option
                    v-for="(v, ind) in salesData"
                    :value="v.salesCode"
                    :key="ind"
                    style="font-size:14px;font-family:Kanit;color:#414141;"
                  >
                    {{ v.salesCode }} {{ v.salesName }} {{ v.salesTeam }}
                  </option>
                </select>
                -->
              </div>
              <div style="margin-left:4%;" class="hover-icon">
                <md-menu md-size="4" md-direction="bottom left">
                  <md-button class="md-icon-button" md-menu-trigger>
                    <md-icon>more_vert</md-icon>
                  </md-button>
                  <md-menu-content>
                    <md-menu-item @selected="removeSMFromDg(item)">
                      <span>Remove</span>
                    </md-menu-item>
                  </md-menu-content>
                </md-menu>
              </div>
            </div>
            <br /><br /><br />
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions v-if="footer">
        <div style="display:-webkit-box;width:100%;">
          <div style="width:40%">
            <md-search-box-dg
              id="pageRicipient-search-box2"
              :placeholder="'Search'"
              :data="smnoGroup"
              @filter="filterRec"
              @choose="chooseRec"
            ></md-search-box-dg>
          </div>

          <div
            style="width:60%;text-align:right;padding-right:18px;display: -webkit-box;"
          >
            <div style="width:175px;text-align:center;display: flex;">
              <div
                style=" color: rgba(0, 0, 0, 0.54);font-size: 14px;padding-left:49px;padding-top:8px"
              >
                Paid
              </div>
              <form
                @click.stop.prevent="changePaidFromFooter"
                style="padding-left:30px;padding-top:5px"
              >
                <md-switch
                  type="submit"
                  v-model="iptstatus"
                  class="md-primary"
                ></md-switch>
              </form>
            </div>
            <div style="padding-left:260px;">
              <md-button
                class="md-raised gray"
                @click="cancelDg"
                style="width:80px;"
              >
                <label>CANCEL</label>
              </md-button>
              <md-button
                class="md-raised orange"
                @click="openAddchips"
                style="width:80px;"
              >
                <label>ADD</label>
              </md-button>
            </div>
          </div>
        </div>
        <div class="chips-box">
          <md-chip
            md-deletable
            v-for="(row, index) in arrChips"
            :key="'chips-box' + index"
            @click.native="deleteStore(row)"
            >{{ row.code }}&nbsp;{{ row.title }}</md-chip
          >
        </div>
      </md-dialog-actions>
    </md-dialog>
    <!--snackbar-->
    <md-snackbar
      :md-position="vertical + ' ' + horizontal"
      ref="snackbar"
      :md-duration="duration"
    >
      <span>{{ textSnackBar }}</span>
      <md-button
        class="md-accent"
        @click="$refs.snackbar.close()"
        style="color:white"
        >OK</md-button
      >
    </md-snackbar>
  </div>
</template>
<script>
import Vue from 'vue'
import _ from 'lodash'
import recipientService from '@/services/core/recipient'
import ClickOutside from 'vue-click-outside'
export default {
  name: 'setting-recipient',
  data () {
    return {
      selected: [],
      value: [],
      arrLength: '',
      objLength: '',
      group_name: '',
      ipt_code: '',
      ipt_name: '',
      vertical: 'top',
      horizontal: 'center',
      duration: 4000,
      inputDP: 'All Recipient Group',
      title: 'RECIPIENT MANAGEMENT',
      ipt_search: 'Search',
      ques: 'Do you want to leave row?',
      ans: 'Changes might not be saved.',
      rightBtn: 'SAVE',
      mode: '',
      iptCode: '',
      iptName: '',
      footer: false,
      iptstatus: true,
      arrChips: [],
      textSnackBar: '',
      tripleBtn: '',
      keepDupCode: [],
      disabledCode: false,
      keepEvent: false,
      havePress: false,
      status_atv: true,
      dup_code: false,
      flowStateStr: '',
      value_set: '',
      idIconEdit:'',
      isInputActive: false,
      inp_target:'',
      item_focus:[],
      inp_group_target:'',
      detail_group_target:[],
      row:[]
      // dataDefaultList: {
      //   years : [],
      //   cycles : []
      // }
    }
  },
  computed: {
    dataDefault(){
      return this.$store.getters['recipient/dataDefault']
    },
    dataDefaultList(){
      return this.$store.getters['recipient/dataDefaultList']
    },
    dataList () {
      // console.log('byGroupList: ', this.$store.getters["recipient/byGroupList"]);
      let group_list = this.$store.getters["recipient/byGroupList"]
      if(this.group_name == ""){
        if(group_list.length > 0){
          this.group_name = group_list[0]['title']
        }
      }
      return this.$store.getters['recipient/dataList']
    },
    byGroupList () {
      return this.$store.getters['recipient/byGroupList']
    },
    spinnerLoading () {
      return this.$store.getters['recipient/spinnerLoading']
    },
    selectedTeam () {
      return this.$store.getters['recipient/selectedTeam']
    },
    bySMList () {
      // ELF UNI BANGKOK : AREA MG IBSN MID&NORTH
      var bySMList = this.$store.getters['recipient/bySMList']
      var rs = []
      if (this.group_name == 'All Recipient Group' || this.group_name == "") {
        rs = bySMList
      } else {
        for (var i = 0; i < bySMList.length; i++) {
          if (bySMList[i].group_name == this.group_name) {
            rs.push(bySMList[i])
          }
        }
      }
      return rs
      // return bySMList;
    },
    countData () {
      return this.$store.getters['recipient/countData']
    },
    smnoGroup () {
      return this.$store.getters['recipient/smnoGroup']
    },
    arrDetails () {
      return this.$store.getters['recipient/arrDetails']
    },
    spinnerLoadingDG () {
      return this.$store.getters['recipient/spinnerLoadingDG']
    },
    dataAllData () {
      return this.$store.getters['recipient/dataAllData']
    },
    statusAtv () {
      this.status_atv = this.$store.getters['recipient/statusAtv'];
      return this.$store.getters['recipient/statusAtv']
    },
    statusLook () {
      this.flowStateStr = this.$store.getters['recipient/getflowState'].toUpperCase()
      return this.$store.getters['recipient/statusLook']
    },
  },
  methods: {
    closeProcess1 () {
      this.$store.commit('recipient/setDetailList', [])
      this.$refs['confirm-dialog1'].close()
      this.$refs['dg'].close()
      // console.log('closebyButton1');
      // this.$refs["confirm-dialog1"].close();
    },
    cancelProcess1 () {
      this.$refs['confirm-dialog1'].close()
    },
    submitProcess1 () {
      this.$store.dispatch('recipient/updateGroupName', {
        group_code: this.iptCode,
        group_name: this.iptName
      })
      // this.$store.dispatch(
      //   'recipient/getSalesmanByKey',
      //   Vue.localStorage.get('emp_id')
      // )
      this.$refs['dg'].close()
      this.$refs['confirm-dialog1'].close()
      this.havePress = false
    },
    outsideCode () {
      if (this.$refs['dg'].active == true && this.disabledCode == false) {
        var rs = _.filter(this.keepDupCode, item => {
          if (item == this.iptCode) {
            return true
          }
        })
        if (rs.length == 0) {
          let rs_data = {
            group_code: this.iptCode,
            cycle : this.dataDefault.cycle,
            year : this.dataDefault.year,
          }
          recipientService
            .checkDupCode(rs_data)
            .then(result => {
              if (result.length > 0) {
                this.dup_code = true
                this.textSnackBar = 'Recipient Group is exist.'
                this.$refs.snackbar.open()
              } else {
                this.dup_code = false
                this.keepDupCode.push(this.iptCode)
                let data = _.cloneDeep(this.arrDetails)
                let _this = this
                data.forEach(function (value, key) {
                  value.group_code = _this.iptCode
                })
                this.$store.commit('recipient/setDetailList', data)
                this.arrChips.forEach(function (value, key) {
                  value.group_code = _this.iptCode
                })
              }
            })
            .catch(error => console.log('checkDupCode'))
        }
      }
    },
    outsideName () {
      if (this.$refs['dg'].active == true && this.disabledCode == true) {
        this.$store.dispatch('recipient/updateGroupName', {
          group_code: this.iptCode,
          group_name: this.iptName
        })
      }
    },
    chooseRec (value) {
      let obj = this.dataAllData['bysales'].filter(item => item.sm_code == value.code)
      if(obj.length > 0){
        value.select_sales_rep = obj[0]['select_sales_rep']
        value.sales_rep = obj[0]['sales_rep']
        value.fiscal_cycle = obj[0]['fiscal_cycle']
        value.fiscal_year = obj[0]['fiscal_year']
      }else{
        value.select_sales_rep = ""
        value.sales_rep = []
        value.fiscal_cycle = ""
        value.fiscal_year = ""
      }
      value.paid = this.iptstatus
      value.sm_code = value.code
      value.sm_name = value.title
      value.group_code = this.iptCode
      value.group_name = this.iptName
      value.id = 'new'
      this.arrChips.push(value)
      this.$store.dispatch('recipient/checkDupSM', this.arrChips)
    },
    cancelDg () {
      this.footer = false
      let data = _.cloneDeep(this.smnoGroup)
      this.arrChips.forEach(function (value, key) {
        data.push(value)
      })
      this.$store.commit('recipient/setsmNoGroup', _.sortBy(data, 'code'))
      this.arrChips = []
    },
    closeProcess () {
      this.$store.commit('recipient/setDetailList', [])
      this.arrChips = []
      this.footer = false
      this.$refs['confirm-dialog'].close()
      this.$refs['dg'].close()
    },
    cancelProcess () {
      if (this.mode == 'changePaid') {
        let val = this.selectRow
        let data = this.dataList[val.parent]['details'][val.child]
        this.dataList[val.parent]['details'][val.child].paid = data.temp_paid
        this.$refs['confirm-dialog'].close()
      } else {
        this.$refs['confirm-dialog'].close()
      }
    },
    submitProcess (mode) {
      if (this.mode == 'changePaid') {
        // console.log('submitProcess 1');
        let val = this.selectRow
        let data = this.dataList[val.parent]['details'][val.child]
        this.dataList[val.parent]['details'][val.child].temp_paid = data.paid
        this.$store.commit('recipient/setDataListTemp', this.dataList)
        this.$store.dispatch('recipient/updatePaid', data)
        this.$refs['confirm-dialog'].close()
      } else if (this.mode == 'removeSM') {
        // console.log('submitProcess 2');
        let val = this.selectRow
        let data = this.dataList[val.parent]['details'][val.child]
        this.$store.dispatch('recipient/leaveGroup', data)
        this.$refs['confirm-dialog'].close()
      } else if (this.mode == 'openAddchips') {
        // console.log('submitProcess 3',this.arrDetails);
        // setDetailList
        let data = _.cloneDeep(this.arrDetails)
        this.arrChips.forEach(function (value, key) {
          data.push(value)
        })
        this.$store.commit('recipient/setDetailList', data)
        this.arrChips = []
        this.footer = false
        this.$refs['confirm-dialog'].close()
      } else if (this.mode == 'openSaveGroup') {
        // console.log('submitProcess 4');
        let rs = {
          group_code: this.iptCode,
          group_name: this.iptName,
          details: this.arrDetails
        }
        this.$store.dispatch('recipient/saveGroup', rs)
        this.disabledCode = true
        this.footer = false
        this.$refs['confirm-dialog'].close()
        // this.$refs['dg'].close()
      } else if (this.mode == 'closeByButton') {
        // console.log('submitProcess 5');
        let rs = {
          group_code: this.iptCode,
          group_name: this.iptName,
          details: this.arrDetails,
          cycle : this.dataDefault.cycle,
          year : this.dataDefault.year,
        }
        this.$store.dispatch('recipient/addChips', rs)
        this.$refs['confirm-dialog'].close()
        this.$refs['dg'].close()
      } else if (this.mode == 'updatedIptName') {
        this.$store.dispatch('recipient/updateGroupName', {
          group_code: this.iptCode,
          group_name: this.iptName
        })
        // this.$store.dispatch(
        //   'recipient/getSalesmanByKey',
        //   Vue.localStorage.get('emp_id')
        // )
        this.$refs['dg'].close()
        this.$refs['confirm-dialog'].close()
        this.havePress = false
      } else if (this.mode == 'updatedArrDetails') {
        if (this.disabledCode == true) {
          for (var i = 0; i < this.value.length; i++) {
            this.$store.dispatch('recipient/leaveGroup', this.value[i])
          }
        }
        this.$refs['dg'].close()
        this.$refs['confirm-dialog'].close()
      }
    },
    openAddGroup () {
      this.tripleBtn = ''
      this.arrChips = []
      this.iptCode = ''
      this.iptName = ''
      this.ipt_code = ''
      this.ipt_name = ''
      this.disabledCode = false
      this.$store.dispatch('recipient/getSalesmanNoGroup')
      this.$store.commit('recipient/setDetailList', [])
      this.$refs['dg'].open()
    },
    openEditGroup (value) {
      // var dataList = this.$store.getters["recipient/dataList"];
      // console.log(value.group_name);
      // var index = dataList.findIndex(t => t.group_name == value.group_name);
      // console.log(index);
      this.selectRow = value
      this.disabledCode = true
      this.tripleBtn = ''
      this.iptCode = value.group_code
      this.iptName = value.group_name
      this.$store.commit('recipient/setDetailList', value.details)
      this.$store.dispatch('recipient/getSalesmanNoGroup')
      this.$refs['dg'].open()
      this.ipt_code = value.group_code
      this.ipt_name = value.group_name
    },
    changePaid (value) {
      if(this.statusLook == true && this.flowStateStr == 'PASS'){
          this.textSnackBar = "Fix Sales Cycle, Please Contact Finance Department."
          this.$refs.snackbar.open()
      }else if(this.statusLook == true && (this.flowStateStr == 'PENDING' || this.flowStateStr == 'EDIT')){
        this.textSnackBar = "The transaction could not be performed during the approval process."
        this.$refs.snackbar.open()
      }else{
        this.mode = 'changePaid'
        this.selectRow = value
        this.tripleBtn = ''
        this.ques = 'Do you want to change status?'
        this.rightBtn = 'SAVE'
        let data = this.dataList[value.parent]['details'][value.child].paid
        let sts = data ? 'paid' : 'unpaid'
        this.ans = 'Status will change to ' + sts + '.'
        this.$refs['confirm-dialog'].open()
      }
    },
    removeSM (value) {
      this.mode = 'removeSM'
      this.selectRow = value
      this.ques = 'Do you want to remove recipient?'
      this.rightBtn = 'REMOVE'
      this.ans = ''
      this.tripleBtn = ''
      this.$refs['confirm-dialog'].open()
    },

    closeByButton () {
      this.mode = 'closeByButton'
      this.ques = 'Do you want to close manage recipient?'
      let obj = this.arrDetails.filter(item => item.id == 'new')
      if (this.disabledCode == false && this.arrDetails.length > 0  && this.dup_code == false) {
        this.rightBtn = 'SAVE & CLOSE'
        this.tripleBtn = 'CLOSE'
        this.ans = ''
        this.$refs['confirm-dialog'].open()
      } else if (this.disabledCode == false && this.arrDetails.length == 0 && this.dup_code == false) {
        if(this.ipt_name.trim() != this.iptName.trim() && this.ipt_code.trim() != this.iptCode.trim()){
          this.rightBtn = 'SAVE & CLOSE'
          this.tripleBtn = 'CLOSE'
          this.ans = ''
          this.$refs['confirm-dialog'].open()
        }else{
          this.arrChips = []
          this.footer = false
          this.$store.commit('recipient/setDetailList', [])
          this.$refs['dg'].close()
        }
      } else if (this.disabledCode == true && obj.length > 0 && this.dup_code == false) {
        this.rightBtn = 'SAVE & CLOSE'
        this.tripleBtn = 'CLOSE'
        this.ans = ''
        this.$refs['confirm-dialog'].open()
      } else if (this.disabledCode == true && obj.length == 0 && this.dup_code == false) {
        // console.log('closeByButton 4');
        this.arrChips = []
        this.footer = false
        // this.$store.commit("recipient/setDetailList", []);
        // this.$refs["dg"].close();

        if (this.arrLength != this.objLength) {
          this.arrLength = 0
          this.objLength = 0
          this.mode = 'updatedArrDetails'
          this.rightBtn = 'SAVE & CLOSE'
          this.tripleBtn = 'CLOSE'
          this.ans = ''
          this.$refs['confirm-dialog'].open()
        } else if (this.ipt_name.trim() != this.iptName.trim()) {
          this.mode = 'updatedIptName'
          this.rightBtn = 'SAVE & CLOSE'
          this.tripleBtn = 'CLOSE'
          this.ans = ''
          this.$refs['confirm-dialog'].open()
        } else if(this.ipt_name.trim() == this.iptName.trim() && this.ipt_code.trim() == this.iptCode.trim() && this.arrDetails.length == 0){
          this.$refs['dg'].close()
        } else {
          this.rightBtn = 'SAVE & CLOSE'
          this.tripleBtn = 'CLOSE'
          this.ans = ''
          this.$refs['confirm-dialog'].open()
          // this.$refs['dg'].close()
        }
      }
    },

    openSaveGroup () {
      this.mode = 'openSaveGroup'
      this.tripleBtn = ''
      if (this.arrDetails.length > 0) {
        this.ques = 'Do you want to save recipient?'
        this.rightBtn = 'SAVE'
        this.ans = ''
        this.$refs['confirm-dialog'].open()
      } else {
        this.textSnackBar = 'Please select salesman.'
        this.$refs.snackbar.open()
      }
    },
    showFooter () {
      if (this.iptCode.length > 0 && this.iptName.length > 0) {
        this.footer = true
      } else {
        this.textSnackBar = 'Please enter recipient group code & name'
        this.$refs.snackbar.open()
      }
    },
    changePaidFromFooter () {
      let _this = this
      this.arrChips.forEach(function (value, key) {
        value.paid = _this.iptstatus
      })
    },
    changePaidFromDg (value) {
      if (this.disabledCode == true) {
        value.group_code= this.iptCode,
        value.group_name = this.iptName,
        this.$store.dispatch('recipient/updatePaid', value)
      }
    },
    removeSMFromDg (value) {
      // if (this.disabledCode == true) {
      //   this.$store.dispatch("recipient/leaveGroup", value);
      // }

      let obj = this.arrDetails.filter(item => item.code != value.code)

      this.arrLength = this.arrDetails.length
      this.objLength = obj.length
      this.value.push(value)

      this.$store.commit('recipient/setDetailList', obj)
      let data = _.cloneDeep(this.smnoGroup)
      data.push(value)
      this.$store.commit('recipient/setsmNoGroup', _.sortBy(data, 'code'))
    },
    openAddchips () {
      this.mode = 'openAddchips'
      this.tripleBtn = ''
      this.ques = 'Do you want to add recipient?'
      this.rightBtn = 'SAVE'
      this.ans = ''
      this.$refs['confirm-dialog'].open()
    },
    salesTeamHead (value) {
      this.group_name = value.title
      this.$store.dispatch('recipient/selectedGroup', value)
    },
    filterSales (param) {
      this.$store.dispatch('recipient/filterData', param)
    },
    chooseSales (value) {
      let temp = document.getElementById(value.sm_code + '-row-recipient')
      if (temp != '') {
        temp.scrollIntoView({
          behavior: 'smooth'
        })
      }
      // this.$store.dispatch("recipient/chooseSales", value);
    },
    clearSearch () {
      this.$store.dispatch('recipient/clearSearch')
    },

    checkCharacter (evt) {
      //  ' ; - " | ^ % & @ ( ) , # *
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode

      if (charCode == 13) {
        if (this.disabledCode == true) {
          this.$store.dispatch('recipient/updateGroupName', {
            group_code: this.iptCode,
            group_name: this.iptName
          })
        }
        let data = _.cloneDeep(this.arrDetails)
        let _this = this
        data.forEach(function (value, key) {
          value.group_name = _this.iptName
        })
        this.arrChips.forEach(function (value, key) {
          value.group_name = _this.iptName
        })
        this.$store.commit('recipient/setDetailList', data)
      } else if (
        charCode == 39 ||
        charCode == 59 ||
        charCode == 124 ||
        charCode == 45 ||
        charCode == 94 ||
        charCode == 37 ||
        charCode == 38 ||
        charCode == 64 ||
        charCode == 40 ||
        charCode == 41 ||
        charCode == 44 ||
        charCode == 35 ||
        charCode == 42
      ) {
        this.keepEvent = false
        evt.preventDefault()
      } else {
        console.log('checkCharacter 4')
        // console.log(this.ipt_name);
        // console.log(this.iptName);
        // if(this.ipt_name == this.iptName){
        //   console.log('checkCharacter 5');
        //   this.havePress = true;
      }
      this.keepEvent = true
      return true
    },

    deleteStore (value) {
      let data = _.cloneDeep(this.smnoGroup)
      this.arrChips = this.arrChips.filter(item => item.code != value.code)
      data.push(value)
      this.$store.commit('recipient/setsmNoGroup', _.sortBy(data, 'code'))
    },
    filterRec (value) {
      this.$store.dispatch('recipient/filterRec', {
        param: value,
        chips: this.arrChips
      })
    },
    checkDupCode (evt) {
      //  ' ; - " | ^ % & @ ( ) , # *
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (charCode == 13 && this.iptCode.length > 0) {
        let rs_data = {
          group_code: this.iptCode,
          cycle : this.dataDefault.cycle,
          year : this.dataDefault.year,
        }
        recipientService
          .checkDupCode(rs_data)
          .then(result => {
            if (result.length > 0) {
              this.dup_code = true
              this.textSnackBar = 'Recipient Group is exist.'
              this.$refs.snackbar.open()
            } else {
              this.dup_code = false
              this.keepDupCode.push(this.iptCode)
              let data = _.cloneDeep(this.arrDetails)
              let _this = this
              data.forEach(function (value, key) {
                value.group_code = _this.iptCode
              })
              this.$store.commit('recipient/setDetailList', data)
              this.arrChips.forEach(function (value, key) {
                value.group_code = _this.iptCode
              })
            }
          })
          .catch(error => console.log('checkDupCode'))
      } else if (
        charCode == 39 ||
        charCode == 59 ||
        charCode == 124 ||
        charCode == 45 ||
        charCode == 94 ||
        charCode == 37 ||
        charCode == 38 ||
        charCode == 64 ||
        charCode == 40 ||
        charCode == 41 ||
        charCode == 44 ||
        charCode == 35 ||
        charCode == 42
      ) {
        this.keepEvent = false
        evt.preventDefault()
      } else {
        this.keepEvent = true
        return true
      }
    },
    handleScroll (event) {},
    changeStatus (){
      if(this.status_atv === true){
        this.status_atv = false;
        this.$store.commit('recipient/setstatusAtv', false)
      }else{
        this.status_atv = true;
        this.$store.commit('recipient/setstatusAtv', true)
      }
      this.$store.dispatch("recipient/changeStatusAtv");
    },
    changePayStatus (){
      
      let _data = _.cloneDeep(this.dataDefault)
      let _dataList = _.cloneDeep(this.dataDefaultList)
      let pay_status = _data.payStatus
      if(this.statusLook == true && this.flowStateStr == 'PASS'){
          this.textSnackBar = "Fix Sales Cycle, Please Contact Finance Department."
          this.$refs.snackbar.open()
      }else{
        this.$store.dispatch("recipient/updatePayStatus",{
          group_code: this.iptCode,
          group_name: this.iptName,    
          pay_status: pay_status
        });
      }
      
    },
    instatusGroup (value) {
      if(value.details.length > 0){
        this.textSnackBar = "Can't inactive this group, Because there are members in the group."
        this.$refs.snackbar.open()
      }else{
        this.$store.dispatch("recipient/updateStatusGroup",{
          group_code: value.group_code,
          group_name: value.group_name,
          status_group: this.status_atv
        });
      }
    },
    actstatusGroup (value) {
      this.$store.dispatch("recipient/updateStatusGroup",{
        group_code: value.group_code,
        group_name: value.group_name,
        status_group: this.status_atv
      });
    },
    selecedData (type, value) {

      let _data = _.cloneDeep(this.dataDefault)
      let _dataList = _.cloneDeep(this.dataDefaultList)
      this.$store.commit('recipient/setdataDefaultList', [])
      let pay_status = 0
      if(type == 'year'){
        
          _data.year = value
          _dataList.cycles = []
          if(_dataList.team_arr[_data.year]){
            _.forEach(_dataList.team_arr[_data.year], function (values) {
              let obj_c = {
                code : values.code.toString(),
                name : values.name,
                check : values.check
              }
              _dataList.cycles.push(obj_c) 
            })

          }
          if(_dataList.cycles.length > 0){
          //   // _dataList.cycles[_dataList.cycles.length-1].check = true
            _data.cycle =  _dataList.cycles[_dataList.cycles.length-1].code
          }

        
      }else{
        _data.cycle = value
      }

      var rsYear = _.filter(_dataList.years, item => {
        if (item.code == _data.year) {
          return true;
        }
      });
      if (rsYear.length > 0) {
        if (rsYear[0].check == true) {
          pay_status++
        }
      }

      var rsCycle = _.filter(_dataList.cycles, item => {
        if (item.code == _data.cycle) {
          return true;
        }
      });

      if (rsCycle.length > 0) {
        if (rsCycle[0].check == true) {
          pay_status++
        }
      }
      _data.payStatus =(pay_status == 2)?true:false
      this.$store.commit('recipient/setdataDefault', _data)
      this.$store.commit('recipient/setdataDefaultList', _dataList)
      this.$store.dispatch("recipient/changeStatusAtv");
    },
    check_edit(ipt_val, item , row){
    // console.log(this.item_focus)
      this.inp_target = ipt_val
      this.item_focus = { item : item , row : row}
      this.idIconEdit = item.id
      // console.log('check_edit...',this.item_focus)
    },
    floatFormat (val) {
      // console.log(val)
      return parseFloat(val).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    closeTarget(){this.$refs['confirm-sales-target'].close()},
    submitTarget(){
      // console.log(this.inp_group_target)
      
      if(this.inp_group_target  != ''){
          // console.log(this.detail_group_target.group_code)
          let res = {
            emp_code: "",
            code: "",
            fiscal_cycle:  this.dataDefault.cycle,
            fiscal_year: this.dataDefault.year,
            group_code: this.detail_group_target.group_code,
            group_name: this.detail_group_target.group_name,
            mode: "min_target",
          }
        this.$store.dispatch('recipient/updateTarget', {data : res , type:'group' , target:this.inp_group_target})
        for (let index = 0; index < this.dataList.length; index++) {
          const element = this.dataList[index];
           var number = ''
          if(element.group_code === this.detail_group_target.group_code){
            for (let x = 0; x < element.details.length; x++) {
              const row_details = element.details[x];
              // console.log(row_details)
             
              const myArray = this.inp_group_target.split(",")
                  for (let index = 0; index < myArray.length; index++) {
                    const element = myArray[index];
                    // console.log(element)
                    number += element
                  }
               row_details.min_target =  parseInt(number).toLocaleString() 
               number = ''
            }
            //  console.log(' Number cal => ',number)
          }
        }
        this.$refs['confirm-sales-target'].close()
      }
      },
    openChangeTarget( param ){
      this.inp_group_target = ''
      this.detail_group_target = param
      // console.log( param.group_code , param.group_name )
       this.$refs['confirm-sales-target'].open()
    },
    calculateOther(evt){
      // console.log('a',evt)
      // console.log(this.item_focus.item.sm_name)
             if(!evt.srcElement._value){
                   evt.srcElement._value  = '0'
              }
      var number = ''
      const myArray = evt.srcElement._value.split(",")
                  for (let index = 0; index < myArray.length; index++) {
                    const element = myArray[index];
                    // console.log(element)
                    number += element
                  }
                  // console.log(' Number cal => ',number)

        let val =  this.item_focus.row
        let data = this.dataList[val.parent]['details'][val.child]
        this.dataList[val.parent]['details'][val.child].temp_paid = data.paid
        //this.$store.commit('recipient/setDataListTemp', this.dataList)
        // console.log(data.min_target)
        this.$store.dispatch('recipient/updateTarget', {data : data , type:'sales' , target:number})
      this.idIconEdit = ''
      this.item_focus.item.min_target =  parseInt(number).toLocaleString()
    },
     isNumber(evt) {
                evt = (evt) ? evt : window.event;
                this.inp_target = evt.srcElement._value 
                if(!this.inp_target){
                   evt.srcElement._value  = '0'
                }
                var number = ''
                if(evt.key === 'Enter'){
                  const myArray = evt.srcElement._value.split(",")
                  for (let index = 0; index < myArray.length; index++) {
                    const element = myArray[index];
                    // console.log(element)
                    number += element
                  }
                  // console.log(' Number => ',number)
                  this.item_focus.item.min_target =  parseInt(number).toLocaleString()

                   // console.log('submitProcess 1');
        let val =  this.item_focus.row
        let data = this.dataList[val.parent]['details'][val.child]
        this.dataList[val.parent]['details'][val.child].temp_paid = data.paid
        //this.$store.commit('recipient/setDataListTemp', this.dataList)
        this.$store.dispatch('recipient/updateTarget', {data : data , type:'sales' , target:evt.srcElement._value})
        this.$refs['confirm-dialog'].close()
                  this.idIconEdit = ''
                }
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault()
                } else {
                    return true;
                }
            },
            isNumber_dialog( evt ){
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
            },
       formatNumber(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },intFormat (val) {
      console.log(val)
      return parseInt(val).toLocaleString()
    },


  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
      this.$store.dispatch('setPathMenuService', 'setting')
      this.login = true;
      this.$store.dispatch(
        'recipient/getSalesmanByKey',Vue.localStorage.get('emp_id')
      )
    }
  },
  components: {
    'menu-header': require('../Salesops/layout/menu-top'),
    'menu-left': require('../Salesops/layout/menu-left'),
    'md-search-box': require('../Salesops/customComponent/md-search-box'),
    'md-search-box-new': require('../Salesops/customComponent/md-search-box_new'),
    'md-search-box-dg': require('../Salesops/customComponent/md-search-box-dg'),
    'md-dropdown-box': require('../Salesops/customComponent/mds-dropdown-box')
  },
  directives: {
    ClickOutside
  }
}
</script>
<style lang="scss" scoped>
#pageRicipient {
  .md-dropdown-box {
    background: #ffffff;
  }

  #pageRicipient-scroll::-webkit-scrollbar {
    height: 7px;
    width: 8px;
    background: #f7f7f7;
  }
  #pageRicipient-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.11);
    border-radius: 5px;
  }
  .md-report-bar {
    padding-top: 7px;
    padding-left: 4%;
    display: -webkit-box;
  }
  .head-box {
    color: rgba(0, 0, 0, 0.54);
    font-size: 14px;
    font-family: Kanit;
    font-weight: 500;

    border-radius: 3px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
    margin-top: 20px;
    padding-top: 18px;
    padding-left: 48px;
    background: #ffffff;
    padding-bottom: 7px;
    margin-left: 5%;
    margin-right: 13%;
  }
  .cust-list-box {
    margin-left: 5% !important;
    padding-top: 10px !important;
    margin-top: 0px !important;
    .head-table {
      font-weight: roboto;
    }
    .body-deatil {
      overflow: hidden !important;
      .md-icon {
        margin-right: 0px !important;
      }

      .hover-icon {
        visibility: hidden;
      }
      .detail-table:hover {
        cursor: pointer;
        .hover-icon {
          visibility: visible;
        }
      }
    }

    .teamname {
      width: 35%;
      text-align: left;
      cursor: pointer;
      color: #414141;
      opacity: 0.5;
      font-family: roboto;
      font-weight: bold;
    }
  }
  .md-select {
    min-width: unset;
  }
    .button5 {border-radius: 50%;}
  .button {
  background-color: #FD7F00; /* Green */
  width: 23px;
  height: 23px;
  border: none;
  color: white;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 0px 0px 0px 10px;
  cursor: pointer;
}
 .button6 {border-radius: 16px;}
 .button2 {
  background-color: #FD7F00; /* Green */
  width: auto;
  height: 23px;
  border: none;
  color: white;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 0px 0px 0px 10px;
  cursor: pointer;
}
}
.inputdialogtarget{
width: 120px;
height: 40px;
border:0.1px solid gray;
box-shadow: 0px 0px 1px #00000029;
border-radius: 4px;
opacity: 1;
font-size:22px
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>
