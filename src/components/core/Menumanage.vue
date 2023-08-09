<template>
  <div id="pageMenuManagement">
    <div>
      <md-spinner
        style="position: absolute;padding-top:30%;z-index: 3"
        :md-size="150"
        :md-stroke="1"
        v-show="spinnerLoading"
        md-indeterminate
      ></md-spinner>
    </div>
    <div
      v-show="spinnerLoading"
      style="z-index: 2;
            opacity: 0.4;
            position: absolute;
            width: 100%;
            height: 100%;"
    ></div>
    <md-layout md-gutter class="mh-0">
      <md-layout md-column md-gutter md-flex="25">
        <menu-left></menu-left>
      </md-layout>

      <md-layout md-column md-gutter md-flex="75" style="padding-left:4%;">
        <md-layout style="flex: initial;" class="header-bar">
          <div class="title" style="width:100%;text-align:left">
            {{ title }}
          </div>
        </md-layout>
        <div
          class="cust-list-box"
          style="padding-top:25px;padding-left:0px;padding-right:0px;"
        >
          <div
          style="padding-left:30px"
           class="head-table">
            <div
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
          <hr class='style18'>

          <div class="body-deatil">
            <!---TAB 1 -->
            <div v-if="activeTab === 1">
              <div style="text-align: end;">
                <md-button class="md-raised -orange" @click="addData">
                  <md-icon
                    class="pb-4"
                    md-verticalstatus-plan-align="center"
                    md-align="center"
                    >add</md-icon
                  >
                  <label class="ml-15 addNewRow">Add Menu</label>
                </md-button>
              </div>
              <div style="margin-top:15px">
                <div
                  v-for="(row, index) in masterMenu"
                  :key="'menu-' + row.m_id"
                >
               
                  <div style="display:flex;width:100%">
                    <div
                      class="parent-menu"
                      style="width:50%;padding-left:10%;"
                    >
                      {{ row.m_name }}
                    </div>
                    <div style="width:10%">
                      <form
                        @click.stop.prevent="changeStatusMenu(row, index)"
                        style="height:22px"
                      >
                        <md-switch
                          type="submit"
                          v-model="row.m_status_code"
                          class="md-primary"
                        ></md-switch>
                      </form>
                    </div>
                    <div style="width:40%;text-align:left;padding-top:8px">
                      <div class="mds-icon" @click="editRowTab1(row, index)">
                        <md-icon>edit</md-icon>
                      </div>
                    </div>
                  </div>
                  <div
                    v-for="(record, inx) in row.submenu"
                    :key="'menu-record' + record.m_id"
                  >
                    <div style="display:flex;width:100%;">
                      <div
                        style="width:50%;padding-left:20%"
                        class="child-menu"
                      >
                        {{ record.m_name }}
                      </div>
                      <div style="width:10%">
                        <form
                          @click.stop.prevent="changeStatusMenu(record, inx)"
                          style="height:22px"
                        > 
                          <md-switch
                            type="submit"
                            v-model="record.m_status_code"
                            class="md-primary"
                          ></md-switch>
                        </form>
                      </div>
                      <div style="width:40%;text-align:left;padding-top:8px">
                        <div class="mds-icon" @click="editRowTab1(record, inx)">
                          <md-icon>edit</md-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!---TAB 2 -->
            <div v-else-if="activeTab === 2">
              <div
                style="display:flex;padding-bottom:20px;padding-top:20px;width:100%"
              >
                <div style="width:15%;text-align: end;"></div>
                <div style="width:45%;padding-right:30px">
                  <md-input-container
                    style="margin-bottom:0px;margin-top:0px;width:300px"
                  >
                    <label for="movie">Select Group Menu</label>
                    <md-select v-model="tab2Row.group_id">
                      <md-option
                        :value="row.id"
                        v-for="row in masterGroup"
                        :key="'tab1-popup' + row.id"
                        @click.native="setGroup(row)"
                        >{{ row.name }}</md-option
                      >
                    </md-select>
                  </md-input-container>
                </div>
                <div style="width:40%;text-align: end;">
                  <md-button class="md-raised -orange" @click="addData">
                    <md-icon
                      class="pb-4"
                      md-verticalstatus-plan-align="center"
                      md-align="center"
                      >add</md-icon
                    >
                    <label class="ml-15">Add Group</label>
                  </md-button>
                  <md-button
                    :class="
                      tab2Row.group_id === null
                        ? 'md-raised -gray-A8'
                        : 'md-raised -orange'
                    "
                    :disabled="tab2Row.group_id === null"
                    @click="saveGroup"
                  >
                    <label class="ml-15">SAVE</label>
                  </md-button>
                </div>
              </div>
              <div style="margin-top:15px">
                <div
                  v-for="(row, index) in masterMenu"
                 
                  :key="'menu-' + row.m_id"
                >
              
                  <div
                    style="display:flex;width:100%;padding-left:20%;padding-top:10px;padding-bottom:10px;margin-top:10px"
                  >
                    <label class="-salesops-checkbox-container">
                      <input
                        @click="selectParent(row, index)"
                        :disabled="tab2Row.group_id === null || !row.m_status_code"
                        type="checkbox"
                        :id="row.m_id"
                        :value="row.m_id"
                        v-model="tab2Row.menu_access"
                      />
                      <span  :style="{
                          'background-color': tab2Row.group_id === null ||  !row.m_status_code ? '#ccc' : null,
                         
                      }" class="-salesops-checkbox"></span>
                    </label>
                    <span style="font-weight:700"> {{ row.m_name }}</span>
                  </div>
                  <div
                    v-for="record in row.submenu"
                    :key="'menu-record' + record.m_id"
                  >
                    <div
                      style="display:flex;width:100%;padding-left:30%;padding-top:8px;padding-bottom:8px"
                    >
                    <!-- {{tab2Row.menu_access}} -->
                      <label class="-salesops-checkbox-container">
                        <input
                           @click="select_child(row, index)"
                          :disabled="tab2Row.group_id === null || !record.m_status_code || !row.m_status_code "
                          type="checkbox"
                          :id="record.m_id"
                          :value="record.m_id"
                          v-model="tab2Row.menu_access"
                        />
                        <span :style="{'background-color': tab2Row.group_id === null || !record.m_status_code || !row.m_status_code ? '#ccc' : null,}" class="-salesops-checkbox"></span>
                      </label>
                      {{ record.m_name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!---TAB 3 -->
            <div v-else>
              <div style="width:100%;display:flex;margin-bottom:50px">
                <div style="width:10%;"></div>
                <div style="width:40%;">
                  <md-input-container
                    style="margin-bottom:0px;margin-top:0px;width:90%"
                  >                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                    <label for="movie">Select Group Menu</label>
                    <md-select v-model="tab3Row.group_id">
                      <md-option
                        :value="row.id"
                        v-for="row in masterGroup"
                        :key="'tab1-popup' + row.id"
                        @click.native="filterGroup(row)"
                        >{{ row.name }}</md-option
                      >
                    </md-select>
                  </md-input-container>
                </div>
                <div style="width:50%;padding-top:10px">
                  <md-search-box
                    style="width:70%"
                    id="menu-search-box"
                    :placeholder="'Search'"
                    :data="bySMList"
                    @filter="filterSalesMain"
                    @choose="chooseSales"
                    @clear="clearSearch"
                  ></md-search-box>
                </div>
              </div>
              <div
                style="overflow-y: auto;overflow-x: hidden; margin-top: 20px;"
              >
                <div
                  v-for="(row, idx) in tab3Row.master_group"
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
                      'margin-top': '0.5px',
                      'margin-right': '13%',
                      'border-radius': '3px',
                      'box-shadow': '0 0 3px rgba(0, 0, 0, 0.16)'
                    }"
                  >
                    <div class="title-hover" @click="expandChild(idx)">
                      {{ row.name }}
                    </div>

                    <div
                      class="head-table"
                      style="display: -webkit-box;padding-top:14px;padding-right:5px;"
                    >
                      <div style="width:10%;"></div>
                      <div
                        style="
                        font-size:14px;
                        width:60%;
                        text-align:left
                        ;padding-top:8px;
                        font-family:roboto"
                      >
                        Name
                      </div>

                      <div
                        style="
                        font-size:14px;
                        width:20%;
                        text-align:center;
                        padding-top:8px;
                        font-family:roboto"
                      >
                        Department
                      </div>

                      <div
                        :style="{
                          width: '10%',
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
                              <span>Add user</span>
                            </md-menu-item>
                          </md-menu-content>
                        </md-menu>
                      </div>
                    </div>
                  </div>
                  <md-layout
                    style="flex: initial;margin-top:0px;display:none"
                    class="cust-list-box"
                    :id="idx + '-detail-box'"
                  >
                    <div
                      class="body-deatil"
                      style="max-height:none !important;overflow:hidden !important"
                    >
                      <div
                        v-if="row.child.length == 0"
                        style="margin-top: 15px;font-size:14px;text-align:center;margin-bottom: 15px;"
                      >
                        No salesman ....
                      </div>
                      <div
                        class="detail-table"
                        v-for="(item, index) in row.child"
                        :key="index"
                        :style="{ 'margin-top': '8px' }"
                        :id="item.emp_id + '-row-menu'"
                      >
                        <div style="width:10%;padding-top:8px">
                          <md-icon style="color:#797979">person</md-icon>
                        </div>
                        <div
                          :class="'column-descript'"
                          style="width:60%;text-align:left;color:#414141;padding-top:8px"
                        >
                          {{ item.emp_id }} &nbsp;{{ item.first_name }}&nbsp;{{
                            item.last_name
                          }}
                        </div>
                        <div
                          class="teamname"
                          style="width:20%;padding-top:8px;font-family:kanit"
                        >
                          {{ item.department }}
                        </div>
                        <div
                          :stlye="{
                            width: '10%',
                            'text-align': 'right',
                            cursor: 'pointer'
                          }"
                          class="hover-icon"
                        >
                          <md-menu md-size="4" md-direction="bottom left">
                            <md-button class="md-icon-button" md-menu-trigger>
                              <md-icon style="margin-right: 0px !important;"
                                >more_vert</md-icon
                              >
                            </md-button>
                            <md-menu-content>
                              <md-menu-item
                                @selected="removeSM(item, 'remove')"
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
    <md-dialog ref="details-dialog" style="margin:unset;">
      <md-dialog-title
        style="background:#fafafa;padding-bottom:10px;display:flex"
      >
        <div style="width:50%">
          {{ displayTitle() }}
        </div>
        <div
          @click="closeDetailDialogX"
          style="width:50%;text-align:right;cursor:pointer"
        >
          <md-icon>close</md-icon>
        </div>
      </md-dialog-title>
      <md-dialog-content
        :style="{
          width: activeTab === 3 ? '800px' : '500px',
          height: activeTab === 3 ? 'calc(100vh - 280px)' : 'auto'
        }"
      >
        <div>
          <md-spinner
            style="position: absolute;margin-top:15%;z-index: 3;margin-left:35%"
            :md-size="150"
            :md-stroke="1"
            v-show="spinnerLoadingPopup"
            md-indeterminate
          ></md-spinner>
        </div>
        <div
          v-show="spinnerLoadingPopup"
          style="z-index: 2;
            opacity: 0.4;
            position: absolute;
            width: 90%;
            height: 100%;"
        ></div>

        <div v-if="activeTab === 1" style="padding:0px 30px">
          <md-input-container md-inline style="margin-bottom:0px">
            <label>Menu name</label>
            <md-input v-model="tab1Row.m_name"></md-input>
          </md-input-container>
          <div
            style="color:red;font-size:12px"
            v-if="tab1Row.m_name_warning !== null"
          >
            {{ tab1Row.m_name_warning }}
          </div>
          <md-input-container md-inline style="margin-bottom:0px">
            <label>Menu code</label>
            <md-input
              :disabled="tab1Row.mode === 'edit' ? true : false"
              v-model="tab1Row.m_code"
              @keyup.native="changeMcode"
            ></md-input>
          </md-input-container>
          <div
            style="color:red;font-size:12px"
            v-if="tab1Row.m_code_warning !== null"
          >
            {{ tab1Row.m_code_warning }}
          </div>
          <md-input-container md-inline style="margin-bottom:0px">
            <label>Path</label>
            <md-input v-model="tab1Row.m_path" :disabled="true"></md-input>
          </md-input-container>
          <md-input-container
            md-inline
            :style="{
              'margin-bottom': tab1Row.m_order_warning === null ? '10px' : '0px'
            }"
          >
            <label>Sorting</label>
            <!-- :disabled="tab1Row.mode === 'edit' ? true : false" -->
            <md-input
              :disabled="true"
              v-model="tab1Row.m_order"
              @keypress.native="isNumber"
            ></md-input>
          </md-input-container>
          <div
            style="color:red;font-size:12px"
            v-if="tab1Row.m_order_warning !== null"
          >
            {{ tab1Row.m_order_warning }}
          </div>
          <div style="display:flex">
            <md-checkbox
              @change="chaneMainMenu"
              :disabled="tab1Row.mode === 'edit' ? true : false"
              v-model="tab1Row.m_main_menu"
              class="md-warn"
              style="width:200px;padding-top:13px"
              >Main Menu</md-checkbox
            >
            <md-input-container>
              <label for="movie">Select Main Menu</label>
              <md-select
                v-model="tab1Row.m_ref"
                :disabled="
                  tab1Row.mode === 'edit' ||
                  (tab1Row.mode === 'add' && tab1Row.m_main_menu)
                    ? true
                    : false
                "
              >
                <md-option
                  @click.native="changeMrefTab1(row)"
                  :value="row.m_id"
                  v-for="row in masterMenu"
                  :key="'tab1-popup' + row.m_code"
                  >{{ row.m_name }}</md-option
                >
              </md-select>
            </md-input-container>
          </div>
          <div
            style="color:red;font-size:12px"
            v-if="tab1Row.m_main_warning !== null"
          >
            {{ tab1Row.m_main_warning }}
          </div>
           <div style="display:flex">
            <md-radio v-model="tab1Row.m_status" :md-value="1" class="md-warn"
              >Active</md-radio
            >
            <md-radio
              v-model="tab1Row.m_status"
              :md-value="0"
              class="md-warn"
              style="margin-left:15%"
              >Inactive</md-radio
            >
          </div>
        </div>
        <div v-else-if="activeTab === 2">
          <md-input-container md-inline style="margin-bottom:0px">
            <label>Group name</label>
            <md-input v-model="tab2Row.group_name"></md-input>
          </md-input-container>
          <div style="color:red;font-size:12px" v-if="tab2Row.warning !== null">
            {{ tab2Row.warning }}
          </div>
        </div>
        <div v-else>
          <div style="width:100%;display:flex">
            <div style="width:20%;padding-top:20px">Menu Group</div>
            <div style="width:75%">
              <md-input-container
                style="margin-bottom:0px;margin-top:0px;width:80%"
              >
                <label for="movie">Select Group Menu</label>
                <md-select
                  v-model="tab3Row.group_id_popup"
                  :disabled="tab3Row.arrChips.length > 0 ? true : false"
                >
                  <md-option
                    :value="row.id"
                    v-for="row in masterGroup"
                    :key="'tab1-popup' + row.id"
                    @click.native="filterGroupPopup(row)"
                    >{{ row.name }}</md-option
                  >
                </md-select>
              </md-input-container>
            </div>
            <div style="width:5%;padding-top:10px">
              <md-menu md-size="4" md-direction="bottom left">
                <md-button class="md-icon-button" md-menu-trigger>
                  <md-icon>more_vert</md-icon>
                </md-button>
                <md-menu-content>
                  <md-menu-item @selected="addUserPopup()">
                    <span>Add user</span>
                  </md-menu-item>
                </md-menu-content>
              </md-menu>
            </div>
          </div>
          <div
            class="body-deatil"
            style="max-height:none !important;overflow:hidden !important;padding-top:30px"
          >
            <div
              class="detail-table"
              v-for="(item, index) in tab3Row.arrSmList"
              :key="index"
              :style="{
                'margin-top': '8px',
                display: 'flex',
                'padding-left': '30px'
              }"
              :id="item.emp_id + '-row-recipient'"
            >
              <div style="width:10%;padding-top:8px">
                <md-icon style="color:#797979">person</md-icon>
              </div>
              <div
                :class="'column-descript'"
                style="width:65%;text-align:left;color:#414141;padding-top:8px"
              >
                {{ item.emp_id }} &nbsp;{{ item.first_name }}&nbsp;{{
                  item.last_name
                }}
              </div>
              <div
                class="teamname"
                style="width:20%;padding-top:8px;font-family:kanit"
              >
                {{ item.department }}
              </div>
              <div
                :stlye="{
                  width: '5%',
                  'text-align': 'right',
                  cursor: 'pointer'
                }"
                class="hover-icon"
              >
                <md-menu md-size="4" md-direction="bottom left">
                  <md-button class="md-icon-button" md-menu-trigger>
                    <md-icon style="margin-right: 0px !important;"
                      >more_vert</md-icon
                    >
                  </md-button>
                  <md-menu-content>
                    <md-menu-item @selected="removeSM(item, 'remove_popup')">
                      <span>Remove</span>
                    </md-menu-item>
                  </md-menu-content>
                </md-menu>
              </div>
            </div>
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions
        style="padding-right:20px;padding-bottom:20px;display: block;"
      >
        <div style="width:100%;display:flex">
          <div style="width:50%">
            <md-search-box-dg
              v-if="activeTab === 3 && showFooter"
              id="pageRicipient-search-box2"
              :placeholder="'Search'"
              :data="tab3Row.masterSmList"
              @filter="filterSalesman"
              @choose="chooesSalesman"
            ></md-search-box-dg>
          </div>
          <div style="width:50%;text-align:right">
            <md-button class="-gray-A8" @click="closeDetailDialog"
              >Cancel</md-button
            >
            <md-button
              class="md-primary -orange"
              @click="saveDetailDialog"
              v-if="activeTab === 3 && showFooter"
              >{{ 'Add' }}</md-button
            >
            <md-button
              class="md-primary -orange"
              @click="saveDetailDialog"
              v-else-if="activeTab === 1 || activeTab === 2"
              >{{ 'Save' }}</md-button
            >
          </div>
        </div>
        <div
          style="widthg:100%;padding-top:20px"
          v-if="activeTab === 3 && showFooter"
        >
          <div class="chips-box">
            <md-chip
              style="margin-bottom: 5px;margin-right: 5px;"
              md-deletable
              v-for="(row, index) in tab3Row.arrChips"
              :key="'chips-box' + index"
              @click.native="deleteStore(row)"
              >{{ row.code }}&nbsp;{{ row.title }}</md-chip
            >
          </div>
        </div>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog ref="confirm-dialog" style="margin:unset">
      <md-dialog-title>{{ titleMsg }}</md-dialog-title>
      <md-dialog-content>
        <div>{{ detailMsg }}</div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="closeDialog">Cancel</md-button>
        <md-button class="md-primary" @click="saveDialog">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import service from '@/services/core/menumanage'
let masterTab = [
  { code: 3, desc: 'User Access' },
  { code: 2, desc: 'Group Menu' },
  { code: 1, desc: 'SalesOps Menu' }
]
export default {
  name: 'menu-mangement',
  data () {
    return {
      showFooter: false,
      title: 'MENU MANAGEMENT',
      tabData: masterTab,
      activeTab: masterTab[0].code,
      masterMenu: [],
      masterGroup: [],
      titleMsg: null,
      detailMsg: null,
      tab1Row: {
        mode: null,
        m_name: null,
        m_code: null,
        m_path: null,
        m_order: null,
        m_order_warning: null,
        m_main_warning: null,
        m_name_warning: null,
        m_code_warning: null,
        m_main_menu: false,
        m_ref: null,
        m_id: null,
        m_status: 1,
        old_m: null,
        m_submenu: false
      },
      tab2Row: {
        group_id: null,
        menu_access: [],
        group_name: null,
        warning: null
      },
      masterUsAccess: [],
      tab3Row: {
        master_group: [],
        mode: null,
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
    
    }
  },
  methods: {
    filterSalesMain (param) {
      if (_.trim(param).length > 0) {
        let master = _.cloneDeep(this.tab3Row.masterAllSmList_temp)
        this.bySMList = master.filter(word => {
          const str = word.title + word.code + word.emp_id
          return str.toUpperCase().indexOf(param.toUpperCase()) !== -1
        })
      }
    },
    chooseSales (value) {
      let selectedRow = []
      this.tab3Row.master_group.forEach(element => {
        let temp = _.filter(element.child, item => {
          return item.code === value.code
        })
        if (temp.length > 0) {
          selectedRow = element
        }
      })
      this.tab3Row.master_group = [selectedRow]
    },
    clearSearch () {
      this.tab3Row.master_group = this.masterUsAccess
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
    filterSalesman (value) {
      if (_.trim(value).length > 0) {
        let master = _.cloneDeep(this.tab3Row.masterSmList_temp)
        this.tab3Row.masterSmList = master.filter(word => {
          const str = word.title + word.code + word.emp_id
          return str.toUpperCase().indexOf(value.toUpperCase()) !== -1
        })
      }
    },
    filterGroupPopup () {
      // if (this.tab3Row.arrChips.length > 0) {
      //   this.tab3Row.mode = 'might_saved'
      //   this.titleMsg = 'Changes might not be saved.'
      //   this.$refs['confirm-dialog'].open()
      // }
    },
    addUserPopup () {
      this.showFooter = true
    },
    displayTitle () {
      let str = ''
      if (this.activeTab === 1) {
        str = 'Menu Detail'
      } else if (this.activeTab === 2) {
        str = 'ADD GROUP'
      } else {
        str = 'Manage User Access'
      }
      return str
    },
    filterGroup (row) {
      this.tab3Row.master_group = [row]
    },
    addUser (row) {
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
    removeSM (item, mode) {
      this.titleMsg = 'Do you want to remove user?'
      this.$refs['confirm-dialog'].open()
      this.tab3Row.mode = mode
      if (mode === 'remove_popup') {
        this.tab3Row.selected_delete = item
      } else {
        this.tab3Row.selected = item
      }
    },
    select_child(row, index){
    
        this.tab2Row.menu_access.push(row.m_id)
      
    },
    selectParent (row, index) {
     
      if (this.tab2Row.group_id !== null) {
        let exist = _.findIndex(this.tab2Row.menu_access, function (o) {
          return o == row.m_id
        })
        if (exist >= 0) {
          this.tab2Row.menu_access.splice(exist, 1)
          _.remove(this.tab2Row.menu_access, function (o) {
            return o == row.m_id
          })
          if (!_.isUndefined(row.submenu)) {
            row.submenu.forEach(element => {
              _.remove(this.tab2Row.menu_access, function (o) {
                return o == element.m_id
              })
            })
          }
        } else {
          this.tab2Row.menu_access.push(row.m_id)
          if (!_.isUndefined(row.submenu)) {
            row.submenu.forEach(element => {

              if(element.m_status == '1'){
                this.tab2Row.menu_access.push(element.m_id)
              }
              
            })
          }
        }
      }
    },
    saveGroup () {
      this.titleMsg = null
      this.titleMsg = 'Do you want save group menu?'
      this.openDialog()
    },
    setGroup (row) {
      
      if (_.trim(row.menu_id).length > 0) {
        this.tab2Row.menu_access = row.menu_id.split(',').map(Number)
      } else {
        this.tab2Row.menu_access = []
      }
      this.tab2Row.group_name = row.name
    },
    chaneMainMenu () {
      if (this.tab1Row.m_main_menu) {
        //no selected
        if (this.tab1Row.m_ref === null) {
          this.tab1Row.m_path = null
          this.tab1Row.m_order = null
        } else {
          let index = _.findIndex(this.masterMenu, {
            m_id: this.tab1Row.m_ref
          })
          if (!_.isUndefined(this.masterMenu[index])) {
            if (
              this.tab1Row.m_code !== null &&
              _.trim(this.tab1Row.m_code).length > 0
            ) {
              this.tab1Row.m_path =
                '/' + this.masterMenu[index].m_code + '/' + this.tab1Row.m_code
            }
          }
        }
      } else {
        //selected
        if (
          this.tab1Row.m_code !== null &&
          _.trim(this.tab1Row.m_code).length > 0
        ) {
          this.tab1Row.m_path = '/' + this.tab1Row.m_code
        }
        let ref = _.filter(this.masterMenu, function (o) {
          return o.m_ref === 0
        })
        let arr = ref.sort(function (a, b) {
          return a.m_order - b.m_order
        })
        this.tab1Row.m_order = arr[arr.length - 1].m_order + 1
        this.tab1Row.m_main_warning = null
      }
    },
    changeMcode () {
      if (
        this.tab1Row.m_path !== null &&
        _.trim(this.tab1Row.m_path).length > 0
      ) {
        var str = this.tab1Row.m_path.split('/')
        this.tab1Row.m_path = '/' + str[1] + '/' + this.tab1Row.m_code
      }
    },
    changeMrefTab1 (row) {
      let index = _.findIndex(this.masterMenu, {
        m_id: row.m_id
      })
      if (!_.isUndefined(this.masterMenu[index].submenu)) {
        let arr = this.masterMenu[index].submenu.sort(function (a, b) {
          return a.m_order - b.m_order
        })
        this.tab1Row.m_order =
          arr.length > 0 ? arr[arr.length - 1].m_order + 1 : 1
      }
      if (
        this.tab1Row.m_code !== null &&
        _.trim(this.tab1Row.m_code).length > 0
      ) {
        this.tab1Row.m_path = '/' + row.m_code + '/' + this.tab1Row.m_code
      }
      this.tab1Row.m_main_warning = null
    },
    editRowTab1 (row, index) {
    
      this.tab1Row.mode = 'edit'
      this.tab1Row.old_m = row
      this.tab1Row.m_name = row.m_name
      this.tab1Row.m_code = row.m_code
      this.tab1Row.m_path = row.m_path
      this.tab1Row.m_order = row.m_order
      this.tab1Row.m_main_menu = row.m_ref === 0 ? true : false
      this.tab1Row.m_ref = row.m_ref
      this.tab1Row.m_id = row.m_id
      this.tab1Row.m_status = row.m_status 
      this.tab1Row.m_submenu =
        !_.isUndefined(row.submenu) && row.submenu.length > 0 ? true : false
        console.log(this.tab1Row.m_status)
      this.$refs['details-dialog'].open()
    },

    changeStatusMenu (row, index) {
      this.titleMsg = 'Do you want save menu?'
      this.$refs['confirm-dialog'].open()
      this.tab1Row = row
      // this.tab1Row.m_status = '555'
      // this.tab1Row.m_status = row.m_status === 1 ? 0 : 1
    },
    
    selectedTab (row) {
      this.activeTab = row.code
    },
    saveDetailDialog () {
      
      if (this.activeTab === 1) {
        if ( 
          this.tab1Row.m_name === null ||
          _.trim(this.tab1Row.m_name).length === 0
        ) {
          this.tab1Row.m_name_warning = 'Please enter menu name'
          this.tab1Row.m_code_warning = null
        } else if (
          this.tab1Row.m_code === null ||
          _.trim(this.tab1Row.m_code).length === 0
        ) {
          this.tab1Row.m_name_warning = null
          this.tab1Row.m_code_warning = 'Please enter menu code'
        } else if (
          this.tab1Row.m_order === null &&
          this.tab1Row.m_ref === null
        ) {
          this.tab1Row.m_name_warning = null
          this.tab1Row.m_code_warning = null
          this.tab1Row.m_main_warning = 'Please salect main menu or sub menu'
        } else {
          this.$refs['confirm-dialog'].close()
          this.saveDialog()
        }
      } else if (this.activeTab === 2) {
        if (
          this.tab2Row.group_name === null ||
          _.trim(this.tab2Row.group_name).length === 0
        ) {
          this.tab2Row.warning = 'Please enter group name'
        } else {
          this.tab2Row.warning = null
          let t = this
          let dup = _.filter(t.masterGroup, function (o) {
            return t.tab2Row.group_name === o.name
          })
          if (dup.length > 0) {
            this.tab2Row.warning = 'Duplication group name!'
          } else {
            this.$refs['confirm-dialog'].close()
            this.saveDialog()
          }
        }
      } else if (this.activeTab === 3) {

        // tab3Row.arrSmList
        // tab3Row.arrChips
        // console.log('==>', this.tab3Row)
        if (this.tab3Row.arrChips.length > 0) {
          this.titleMsg = 'Do you want to add user?'
          this.$refs['confirm-dialog'].open()
        }
      }
    },
    closeDetailDialogX () {
      if (this.tab3Row.arrChips.length > 0) {
        this.titleMsg = 'Changes might not be saved.'
        this.$refs['confirm-dialog'].open()
      } else {
        this.$refs['details-dialog'].close()
      }
    },
    closeDetailDialog () {
      if (this.activeTab === 1) {
        this.tab1Row = {
          mode: null,
          m_name: null,
          m_code: null,
          m_path: null,
          m_order: null,
          m_order_warning: null,
          m_main_menu: false,
          m_ref: null,
          m_id: null,
          m_status: 1,
          old_m: null,
          m_submenu: false
        }
        this.$refs['details-dialog'].close()
      } else if (this.activeTab === 2) {
        this.$refs['details-dialog'].close()
      } else if (this.activeTab === 3) {
        if (this.tab3Row.mode === 'add') {
          this.tab3Row.arrChips = []
          if (this.showFooter) {
            this.showFooter = false
          } else {
            this.$refs['details-dialog'].close()
          }
        } else {
          this.$refs['details-dialog'].close()
        }
      }
    },
    addData () {
      if (this.activeTab === 1) {
        this.tab1Row = {
          mode: 'add',
          m_name: null,
          m_code: null,
          m_path: null,
          m_order: null,
          m_order_warning: null,
          m_main_warning: null,
          m_name_warning: null,
          m_code_warning: null,
          m_main_menu: false,
          m_ref: null,
          m_id: null,
          m_status: 1,
          old_m: null,
          m_submenu: false
        }
      } else if (this.activeTab === 2) {
        this.tab2Row = {
          group_id: null,
          menu_access: [],
          group_name: null,
          warning: null
        }
      } else if (this.activeTab === 3) {
        this.tab3Row.selected_delete = null
        this.tab3Row.group_id_popup = this.tab3Row.selected.id
        this.tab3Row.arrSmList = this.tab3Row.selected.child
      }
      this.$refs['details-dialog'].open()
    },
    openDialog () {
      this.$refs['confirm-dialog'].open()
    },
    saveDialog () {
      
      this.spinnerLoadingPopup = true
      let obj = null
      if (this.activeTab === 1) {

            if( this.tab1Row.mode){
              console.log("EDIT")
            }else {
              this.tab1Row.m_status = this.tab1Row.m_status == 1 ? 0 :1
            }
        obj = this.tab1Row
        obj.activeTab = 'salesops_menu'
        console.log('saveDialog -=> ', this.tab1Row)
        this.connectAPI(obj)
      } else if (this.activeTab === 2) {
    
        obj = this.tab2Row
        obj.activeTab = 'group_menu'
        this.connectAPI(obj)
      } else if (this.activeTab === 3) {
         
        if (this.tab3Row.mode === 'remove') {
          obj = this.tab3Row.selected
          obj.activeTab = 'remove_user_access'
          this.connectAPI(obj)
        } else if (this.tab3Row.mode === 'remove_popup') {
          obj = this.tab3Row.selected_delete
          obj.activeTab = 'remove_user_access'
          this.connectAPI(obj)
        } else if (this.tab3Row.mode === 'add') {
         
          obj = {
            salesman: this.tab3Row.arrChips,
            group_access: this.tab3Row.group_id_popup,
            activeTab: 'add_user_access'
          }

         
          this.connectAPI(obj)
          // this.showFooter = false
        }
      }
      // console.log('obj => ', obj)
    },
    connectAPI (obj) {
      if (this.activeTab === 1) {
        this.$refs['confirm-dialog'].close()
      } else if (this.activeTab === 2) {
        this.$refs['confirm-dialog'].close()
      } else if (this.activeTab === 3) {
        this.$refs['confirm-dialog'].close()
        // this.$refs['details-dialog'].close()
      }
      service
        .saveMenu(obj)
        .then(response => {
          if (this.activeTab === 1) {
            this.$refs['details-dialog'].close()
          } else if (this.activeTab === 2) {
            this.$refs['details-dialog'].close()
          } else if (this.activeTab === 3) {
            this.tab3Row.arrChips = []
            // this.$refs['details-dialog'].close()
          }
          this.spinnerLoadingPopup = false
          this.getMenuData()
        })
        .catch(error => console.log('getMenu'))
    },
    closeDialog () {
      if(this.tab1Row.m_status == 0){
        this.tab1Row.m_status_code = false
      }else {
        this.tab1Row.m_status_code = true
      }
      this.$refs['confirm-dialog'].close()
    },
    getMenuData () {
      this.spinnerLoading = true
      service
        .getMenu()
        .then(response => {
          // let setArray = []
          // response.data.menu.forEach(element => {
          //   if (element.m_code !== 'root_index') {
          //     if(element.m_level == 1){

          //     }

          //     // if(element.m_level == 1){
          //       let index = _.findIndex(setArray, {
          //         m_id: element.m_ref
          //       })
              
          //       element.m_status_code = element.m_status === 0 ? false : true
          //       if (index < 0) {
          //         element.submenu = []
          //         setArray.push(element)
          //       } else {
          //         setArray[index].submenu.push(element)
          //       }
          //     // }
          //   }
          // })
          // console.log("setArray",setArray);
          this.masterMenu = response.data.menus
          this.masterGroup = response.data.group
          let usAccess = []
          response.data.group.forEach(element => {
            element.child = _.filter(response.data.user_access, function (o) {
              return o.menu_access_id === element.id
            })
            usAccess.push(element)
          })
          this.tab3Row.master_group = usAccess
          this.tab3Row.masterSmList = response.data.user_no_group
          this.tab3Row.masterSmList_temp = response.data.user_no_group
          this.tab3Row.masterAllSmList_temp = response.data.user_access
          this.masterUsAccess = usAccess
          if (this.activeTab === 3 && this.$refs['details-dialog'].active) {
            let group_id_popup = this.tab3Row.group_id_popup
            let arrSmList = _.filter(usAccess, function (o) {
              return o.id === group_id_popup
            })
            this.tab3Row.arrSmList =
              arrSmList.length > 0 ? arrSmList[0].child : []
          }
          this.spinnerLoading = false
        })
        .catch(error => console.log('getMenu'))
    },
    isNumber (evt) {
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
    }
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
      this.$store.dispatch('setPathMenuService', 'setting')
      this.login = true
      this.getMenuData()
    }
  },
  components: {
    'menu-header': require('../Salesops/layout/menu-top'),
    'menu-left': require('../Salesops/layout/menu-left'),
    'md-search-box-dg': require('../Salesops/customComponent/md-search-box-dg'),
    'md-search-box': require('../Salesops/customComponent/md-search-box')
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
