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

          <div  @mouseleave="mouseLeaveSearch" style="margin:0 5px 0 0;width: 30%">
            <md-input-container class="-no-line -search" style="margin: 0px">
              <md-icon class="mr-5">
                search <md-tooltip>search</md-tooltip></md-icon
              >
              <md-input
               id="input-search"
                placeholder="Search"
                :class="ipt_search == 'Search' ? 'earch-text' : 'value-text'"
                v-on:change="searchUser"
                :value="ipt_search"
                @focus.native="$event.target.select()"
              ></md-input>
              <div v-if="ipt_search != ''"  @click="clear_search" >
               <md-icon style="cursor: pointer;display: flex;font-size:18px" class="mr-5">
                clear <md-tooltip>clear</md-tooltip></md-icon
              >
              </div>
            </md-input-container>
            <!-- <md-card v-if="shw_customer" id="style-scroll">
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
            </md-card> -->
          </div>
          <div style="width: 55%" class="md-report-bar">
            <div style="width: 100%; display: flex">
              <div style="padding-left: 22px; width: 35%">
                <div
                  :class="btnType == 'all' ? 'title-text active' : 'title-text'"
                  @click="selectType('all')"
                >
                  ALL USER
                </div>
                <div class="title-number">
                  {{ formatNumber($store.getters.usm_all_ALLSTATUS) }}
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
                  {{ formatNumber($store.getters.usm_ACTIVE) }}
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
                  {{ formatNumber($store.getters.usm_INACTIVE) }}
                </div>
              </div>
            </div>
          </div>
           <div style="paddimg-left:0;align-items: left;width:8%">
            <svg class="add-btn" @click="openDialog(null, null)"  id="Search_Button" data-name="Search Button" xmlns="SVG namespace" width="36" height="36" viewBox="0 0 36 36">
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
          style="flex: initial;margin-left:2%"
          md-align="center"
          class="cust-list-box"

          v-if="dataList.length == 0"
        >
          <span class="nodata">No data</span>
        </md-layout>
        <md-layout
          style="flex: initial;margin-left:2% "
          class="cust-list-box"
          v-else
        >
          <div class="head-table">
            <div
              :class="btnSort == 'role_code' ? 'active' : ''"
              style="
                width: 11%;
                text-align: left;
                cursor: pointer;
                font-weight: 500;
              "
              @click="sortData('role_code')"
            >
              Role Code
            </div>
            <div
              :class="
                btnSort == 'emp_code'
                  ? 'column-province active'
                  : 'column-province'
              "
              style="
                width: 12%;
                text-align: left;
                cursor: pointer;
                font-weight: 500;
              "
              @click="sortData('emp_code')"
            >
              Emp Code
            </div>
            <div
              :class="
                btnSort == 'first_name'
                  ? 'column-province active'
                  : 'column-province'
              "
              style="
                width: 20%;
                text-align: left;
                cursor: pointer;
                font-weight: 500;
              "
              @click="sortData('first_name')"
            >
              Thai Name
            </div>
            <div
              :class="
                btnSort == 'username'
                  ? 'column-province active'
                  : 'column-province'
              "
              style="
                width: 15%;
                text-align: left;
                cursor: pointer;
                font-weight: 500;
              "
              @click="sortData('username')"
            >
              Username
            </div>
            <div
              :class="
                btnSort == 'department'
                  ? 'column-province active'
                  : 'column-province'
              "
              style="
                width: 12%;
                text-align: left;
                cursor: pointer;
                font-weight: 500;
              "
              @click="sortData('department')"
            >
              Department
            </div>
            <div
              :class="
                btnSort == 'email'
                  ? 'column-province active'
                  : 'column-province'
              "
              style="
                width: 20%;
                text-align: left;
                cursor: pointer;
                font-weight: 500;
              "
              @click="sortData('email')"
            >
              Email
            </div>
            <div
              :class="btnSort == 'status' ? 'active' : ''"
              style="width: 5%; cursor: pointer; font-weight: 500"
              @click="sortData('status')"
            >
              Status
            </div>
            <div style="width: 5%"></div>
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
              <div style="width: 11%; text-align: left">
                {{ item.role_code }}
              </div>
              <div style="width: 12%; text-align: left">
                {{ item.emp_code }}
              </div>
              <div class="column-descript" style="width: 20%">
                {{ item.first_name }}
              </div>
              <div class="column-province" style="width: 15%">
                {{ item.username }}
              </div>
              <div class="column-province" style="width: 12%">
                {{ item.department }}
              </div>
              <div class="column-province" style="width: 20%">
                {{ item.email }}
              </div>

              <div style="width: 5%">
                <md-avatar
                  v-if="item.status == 1"
                  class="md-avatar-icon -green _icon-status"
                ></md-avatar>
                <md-avatar
                  v-else
                  class="md-avatar-icon -red _icon-status"
                ></md-avatar>
              </div>
              <div style="width: 5%" @click="openDialog(item, index)">
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
      ref="confirm_delete"
      id="duplicate"
    >
      <md-dialog-content> Do you want to delete? </md-dialog-content>
      <div class='user_delete'> user นี้อาจเคยถูกเรียกใช้งาน </div>
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
      ref="department"
      id="pageDepartmentDialog2"
    >
      <md-dialog-title>
        <md-layout>
          <md-layout
            md-flex="90"
            style="display: -webkit-box; overflow: hidden"
          >
            <div class="title">User Details</div>
          </md-layout>
          <md-layout md-flex="10" md-align="end">
            <md-button class="md-icon-button" @click="open_dialog('close')">
              <md-icon>close</md-icon>
              <md-tooltip md-direction="right">close</md-tooltip>
            </md-button>
          </md-layout>
        </md-layout>
      </md-dialog-title>
      <md-dialog-content style="padding-top: 0px">
        <div style="padding-left: 5%; padding-right: 5%">
          <md-input-container style="margin-bottom: 7px">
            <label>Username</label>
            <md-input
              v-model="ipt_username"
              @keypress.native="keySpecial"
            ></md-input>
            <div
              class="md-error"
              style="bottom: -25px; opacity: inherit; color: #f44336"
              v-if="(ipt_username == '' || ipt_username == null) && validInp"
            >
              {{ warningText }}
            </div>
          </md-input-container>
            <div style="display: flex; width: 100%;">
            <md-input-container
                md-has-password
                :stlye="{'width':dialog_add ? '100%' : '95%'}"
              >
              <label>Password</label>
              <md-input
                v-model="ipt_password" style="margin: 0 35px 0 0;"
                :disabled="disabled_password"
                type="password"
                @keypress.native="keySpecial"
              ></md-input> 
              <div
                class="md-error"
                style="bottom: -25px; opacity: inherit; color: #f44336"
                v-if="(ipt_password == '' || ipt_password == null) && validInp"
              >
                <!-- {{ warningText }} -->
              </div>
            </md-input-container>
            <md-button v-if="dialog_add == false" style="margin-top: 10px; color:gray" class="md-icon-button" @click="enabled_password()">
                <md-icon>edit</md-icon>
            <md-tooltip md-direction="right">edit</md-tooltip>
            </md-button>
          </div>
          <div style="display: flex; width: 100%">
            <md-input-container
              style="margin-bottom: 7px; width: 50%; margin-right: 5%"
            >
              <label>Employee Code</label>
              <md-input
                v-model="ipt_emp_code"
                @keypress.native="keySpecial"
              ></md-input>
              <div
                class="md-error"
                style="bottom: -25px; opacity: inherit; color: #f44336"
                v-if="(ipt_emp_code == '' || ipt_emp_code == null) && validInp"
              >
                {{ warningText }}
              </div>
            </md-input-container>
            <md-input-container
              style="margin-bottom: 7px; width: 50%; margin-left: 5%"
            >
              <label>Email</label>
              <md-input
                v-model="ipt_email"
                @keypress.native="keySpecialEmail"
              ></md-input>
              <!-- <div
                class="md-error"
                style="bottom: -25px; opacity: inherit; color: #f44336"
                v-if="(ipt_email == '' || ipt_email == null) && validInp"
              >
                {{ warningText }}
              </div> -->
            </md-input-container>
          </div>
          <div style="display: flex; width: 100%">
            <md-input-container
              style="margin-bottom: 7px; width: 50%; margin-right: 5%"
            >
              <label>First name (TH)</label>
              <md-input
                v-model="ipt_firstname"
                @keypress.native="keySpecial"
              ></md-input>
              <div
                class="md-error"
                style="bottom: -25px; opacity: inherit; color: #f44336"
                v-if="
                  (ipt_firstname == '' || ipt_firstname == null) && validInp
                "
              >
                {{ warningText }}
              </div>
            </md-input-container>
            <md-input-container
              style="margin-bottom: 7px; width: 50%; margin-left: 5%"
            >
              <label>Last name (TH)</label>
              <md-input
                v-model="ipt_lastname"
                @keypress.native="keySpecial"
              ></md-input>
              <div
                class="md-error"
                style="bottom: -25px; opacity: inherit; color: #f44336"
                v-if="(ipt_lastname == '' || ipt_lastname == null) && validInp"
              >
                {{ warningText }}
              </div>
            </md-input-container>
          </div>
          <div style="display: flex; width: 100%">
            <md-input-container
              style="margin-bottom: 7px; width: 50%; margin-right: 5%"
            >
              <label>First name (EN)</label>
              <md-input
                v-model="ipt_firstname_en"
                @keypress.native="keySpecial"
              ></md-input>
              <!-- <div
                class="md-error"
                style="bottom: -25px; opacity: inherit; color: #f44336"
                v-if="
                  (ipt_firstname_en == '' || ipt_firstname_en == null) &&
                  validInp
                "
              >
                {{ warningText }}
              </div> -->
            </md-input-container>
            <md-input-container
              style="margin-bottom: 7px; width: 50%; margin-left: 5%"
            >
              <label>Last name (EN)</label>
              <md-input
                v-model="ipt_lastname_en"
                @keypress.native="keySpecial"
              ></md-input>
              <!-- <div
                class="md-error"
                style="bottom: -25px; opacity: inherit; color: #f44336"
                v-if="
                  (ipt_lastname_en == '' || ipt_lastname_en == null) && validInp
                "
              >
                {{ warningText }}
              </div> -->
            </md-input-container>
          </div>
          <div style="margin-top: 15px; display: flex">
            <div style="padding-top: 8px; color: #727272; width: 30%">
              Department
            </div>
            <div
              class="search-cust-box"
              style="width: 70%"
              @mouseleave="mouseLeaveDP"
            >
              <md-input-container class="-no-line -search" style="margin: 0px">
                <md-input
                  :class="
                    ipt_departant == 'Select Department'
                      ? 'earch-text'
                      : 'value-text'
                  "
                  placeholder="Select Department"
                  v-on:change="showAutocom"
                  @focus="showAutocom"
                  :value="ipt_departant"
                  @focus.native="$event.target.select()"
                ></md-input>
                <md-icon
                  class="ml-0"
                  @click.native="clearDep"
                  :style="{ cursor: 'pointer' }"
                  style="font-size:18px;display: flex;"
                >
                  clear</md-icon
                >
                <md-icon
                 class="ml-0"
                  @click.native="openAutoCom"
                  :style="{ cursor: 'pointer' }"
                >
                  arrow_drop_down</md-icon
                >
              </md-input-container>
              <div
                class="md-error"
                style="bottom: -2px; opacity: inherit; color: #f44336"
                v-if="
                  (ipt_departant == '' || ipt_departant == null) && validInp
                "
              >
                {{ warningText }}
              </div>
              <md-card
                v-if="shw_autocom"
                id="style-scroll"
                style="max-height: 200px; height: 200px; bottom: 235px"
              >
                <ul class="md-list" v-if="departmentList.length > 0">
                  <li
                    class="md-list-item"
                    v-for="(item, index) in departmentList"
                    :key="index"
                  >
                    <div
                      class="md-list-item-text"
                      @click="selectDepartDP(item, 'departant')"
                    >
                      {{ item.code }} :
                      <span class="kanitFont"> {{ item.description }}</span>
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

          <div style="padding-top: 5px; margin-top: 15px; display: flex">
            <div style="padding-top: 8px; color: #727272; width: 30%">
              Role Code
            </div>
            <div
              class="search-cust-box"
              style="width: 70%"
              @mouseleave="mouseLeaveRole"
            >
              <md-input-container class="-no-line -search" style="margin: 0px">
                <md-input
                  :class="
                    ipt_role == 'Select Role' ? 'earch-text' : 'value-text'
                  "
                  placeholder="Select Role"
                  v-on:change="showAutocomRole"
                  @focus="showAutocomRole"
                  :value="ipt_role"
                  @focus.native="$event.target.select()"
                >
                </md-input>
                <md-icon
                  class="ml-0"
                  @click.native="clearRole"
                  :style="{ cursor: 'pointer' }"
                  style="display: flex;font-size:18px"
                >
                  clear</md-icon
                >
                <md-icon
                  class="ml-0"
                  @click.native="openAutoComRole"
                  :style="{ cursor: 'pointer' }"
                >
                  arrow_drop_down</md-icon
                >
              </md-input-container>
             
              <md-card
                v-if="shw_autocom_role"
                id="style-scroll"
                style="max-height: 200px; height: 200px; bottom: 235px"
              >
                <ul class="md-list" v-if="RoleList_unuse.length > 0 || RoleList_use.length > 0">
                  <li>
                    <div
                      style="
                        padding: 5px 0 5px 10px;
                        font-size: 14px;
                        color: #8d8d8d;
                        background-color:#DCDCDC;
                      "
                    >
                      UNUSED
                    </div>
                  </li>
                  <li
                    class="md-list-item"
                    
                    v-for="(item, index) in RoleList_unuse"
                    :key="index"
                  >
                    <div
                      class="md-list-item-text"
                      @click="selectDepartDP(item, 'role_code')"
                    >
                      {{ item.code
                      }}<span class="kanitFont"> {{ item.description }}</span>
                    </div>
                  </li>

                  <li>
                    <div
                      style="
                        padding: 5px 0 5px 10px;
                        font-size: 14px;
                        color: #8d8d8d;
                        background-color:#DCDCDC;
                      "
                    >
                      USED
                    </div>
                  </li>
                  <li
                  
                    class="md-list-item"
                    v-for="(item, index) in RoleList_use"
                    :key="'unused' + index"
                  >
                    <div
                      class="md-list-item-text"
                      @click="selectDepartDP(item, 'role_code')"
                    >
                      {{ item.code
                      }}<span class="kanitFont"> {{ item.description }}</span>
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
          <div
            class="md-error"
            style="
              padding-left: 30%;
              bottom: -2px;
              opacity: inherit;
              color: #f44336;
            "
            v-if="(ipt_role == '' || ipt_role == null) && validInp"
          >
            {{ warningText }}
          </div>
          <div style="margin-top: 5px; display: flex">
            <div style="color: #727272; margin-right: 70px; padding-top: 17px">
              Status
            </div>
            <md-radio v-model="ipt_status" md-value="1" class="md-warn"
              >Active</md-radio
            >
            <md-radio
              v-model="ipt_status"
              md-value="0"
              class="md-warn"
              style="margin-left: 15%"
              >Inactive</md-radio
            >
          </div>
          <div style="display: flex">
            <div style="color: #727272; padding-top: 7px; width: 30%">
              Notification
            </div>
            <div
              style="
                margin-right: 10px;
                padding-top: 3px;
                width: 35%;
                display: flex;
              "
            >
              <input
                type="checkbox"
                style="height: 20px; width: 20px"
                v-model="ipt_visible"
              />
              <div style="padding-top: 3px; margin-left: 8px">Visible</div>
            </div>
            <div
              style="
                margin-right: 10px;
                padding-top: 3px;
                width: 35%;
                display: flex;
              "
            >
              <input
                type="checkbox"
                style="height: 20px; width: 20px"
                v-model="ipt_status_noti"
              />
              <div style="padding-top: 3px; margin-left: 8px">Status</div>
            </div>
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions style="margin-top: 10px">
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
export default {
  name: "tripplan-custmanege",
  data() {
    return {
      title: "USER MANAGEMENT",
      ipt_search: "",
      shw_customer: false,
      btnType: "all",
      btnSort: "role_code",
      btndelete: false,
      ipt_id: "",
      ipt_code: "",
      ipt_username: "",
      ipt_password: "",
      ipt_emp_code: "",
      ipt_email: "",
      ipt_firstname: "",
      ipt_lastname: "",
      ipt_firstname_en: "",
      ipt_lastname_en: "",
      ipt_departant: "",
      ipt_role_code: "",
      ipt_role: "",
      ipt_iptColeFull: "",
      ipt_visible: true,
      ipt_status_noti: true,
      ipt_status: 1,
      shw_autocom: false,
      shw_autocom_role: false,
      validInp: false,
      warningText: "Please input data",
      tempSort: "ASC",
      // dataList: [],
      // dataListTemp: [],
      // dataListSearch: [],
      // all_label: [],
      // active_label: [],
      // inactive_label: [],
      departmentList: [],
      departmentListFull: [],
      
      RoleList_use: [],
      RoleListFull_use: [],

      RoleList_unuse: [],
      RoleListFull_unuse: [],

      // roleCodeList: [],
      roleCodeListFull: [],
      select_role_code: "",
      save_type: "",
      disabled_password: false,
      dialog_add: true,

      data_type_search:'Role Code',
      type_search:[
        {code: "role", title: "Role Code" },
        {code: "emp", title: "Emp Code" }
      ]

    };
  },
  computed: {
    all_label() {
      return this.$store.getters["usm_all_user"];
    },
    dataList() {
      if (this.departmentListFull.length == 0) {
        this.departmentListFull = this.$store.getters["dm_deatil_list"];
        this.departmentList = this.$store.getters["dm_deatil_list"];
      }
      return this.$store.getters["usmDataList"];
    },
    dataListTemp() {
      return this.$store.getters["usmDataListTemp"];
    },
    dataListSearch() {
      return this.$store.getters["usmDataListSearch"];
    },
    roleCodeList_un() {
      if (this.RoleListFull_unuse.length == 0) {
        this.RoleListFull_unuse = this.$store.getters["usmDataUnused"];
        this.RoleList_unuse = this.$store.getters["usmDataUnused"];
      }
      
      return this.$store.getters["usmDataUnused"];
    },
    roleCodeList() {
      if (this.RoleListFull_use.length == 0) {
        this.RoleListFull_use = this.$store.getters["usmDataUsed"];
        this.RoleList_use = this.$store.getters["usmDataUsed"];
      }
      return this.$store.getters["usmDataUsed"];
    },
  },
  methods: {
    fetchData() {
      let arr = [];
      for (let i = 0; i < 20; i++) {
        arr.push({
          role_code: "0000" + i,
          emp_code: "10000" + 1,
          first_name: "Thai Name " + i,
          last_name: "Thai Name " + i,
          username: "Username " + i,
          department: "MNG" + i,
          email: "mail_" + i + "@mail.com",
          status: i < 10 ? 1 : 0,
          password: "password" + i,
          firstname_en: "Name " + i,
          lastname_en: "Surname " + i,
          visible: true,
          status_noti: false,
        });

      
      }
    
      let active = _.filter(arr, (item) => {
        if (item.status == 1) {
          return true;
        }
      });
      this.active_label = active.length;
      let inactive = _.filter(arr, (item) => {
        if (item.status == 0) {
          return true;
        }
      });
      this.inactive_label = inactive.length;
    },

    showSearch() {
      // if (this.shw_customer) {
      //   this.shw_customer = false;
      // } else {
      //   this.shw_customer = true;
      // }
    },
    sortData(value) {
      this.btnSort = value;
      this.tempSort = this.tempSort == "ASC" ? "DESC" : "ASC";


      if(value == 'role_code'){
          if(this.tempSort == 'ASC'){
             this.dataList.sort((a, b) => (String((b.role_code)) < String((a.role_code)))  ? -1 : 1 )
           }else {
             this.dataList.sort((a, b) => (String((b.role_code)) < String((a.role_code)))  ? 1 : -1 )
          }
      }
      if(value == 'emp_code'){
          if(this.tempSort == 'ASC'){
             this.dataList.sort((a, b) => (String((b.emp_code)) < String((a.emp_code)))  ? -1 : 1 )
           }else {
             this.dataList.sort((a, b) => (String((b.emp_code)) < String((a.emp_code)))  ? 1 : -1 )
          }
      }
      if(value == 'first_name'){
          if(this.tempSort == 'ASC'){
             this.dataList.sort((a, b) => (String((b.first_name)) < String((a.first_name)))  ? -1 : 1 )
           }else {
             this.dataList.sort((a, b) => (String((b.first_name)) < String((a.first_name)))  ? 1 : -1 )
          }
      }
      if(value == 'username'){
          if(this.tempSort == 'ASC'){
             this.dataList.sort((a, b) => (String((b.username)) < String((a.username)))  ? -1 : 1 )
           }else {
             this.dataList.sort((a, b) => (String((b.username)) < String((a.username)))  ? 1 : -1 )
          }
      }
      if(value == 'role_code'){
          if(this.tempSort == 'ASC'){
             this.dataList.sort((a, b) => (String((b.emp_code)) < String((a.emp_code)))  ? -1 : 1 )
           }else {
             this.dataList.sort((a, b) => (String((b.emp_code)) < String((a.emp_code)))  ? 1 : -1 )
          }
      }
      if(value == 'department'){
          if(this.tempSort == 'ASC'){
             this.dataList.sort((a, b) => (String((b.department)) < String((a.department)))  ? -1 : 1 )
           }else {
             this.dataList.sort((a, b) => (String((b.department)) < String((a.department)))  ? 1 : -1 )
          }
      }
      if(value == 'email'){
          if(this.tempSort == 'ASC'){
             this.dataList.sort((a, b) => (String((b.email)) < String((a.email)))  ? -1 : 1 )
           }else {
             this.dataList.sort((a, b) => (String((b.email)) < String((a.email)))  ? 1 : -1 )
          }
      }
      if(value == 'status'){
          if(this.tempSort == 'ASC'){
             this.dataList.sort((a, b) => (String((b.status)) < String((a.status)))  ? -1 : 1 )
           }else {
             this.dataList.sort((a, b) => (String((b.status)) < String((a.status)))  ? 1 : -1 )
          }
      }

      
      // this.$store.dispatch("settingUserSearch", {
      //   id:value.id,
      //   code: this.select_role_code,
      //   type: this.btnType,
      //   sort: this.btnSort,
      //   orderby: this.tempSort,
      // });

    },
    searchUser: function (param) {
      this.ipt_search = param
      this.$store.dispatch("settingUserAll", param);
      this.shw_customer = true;
      if (param.length > 1) {
        let temp = [];
        _.forEach(this.dataListTemp, function (row, key) {
          let str =
            row.role_code +
            row.emp_code +
            row.first_name +
            row.last_name +
            row.email +
            row.department +
            row.username;
          if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1) {
            temp.push(row);
          }
        });
        this.$store.commit('SET' , temp)
        // this.dataListSearch = temp;
      } else if (param.length == 0) {
        this.$store.dispatch("settingUserSearch", {
          code: "",
          type: "",
          sort: "",
          orderby: "",
        });
        // this.dataListSearch = this.dataListTemp;
      }
    },
    selectUser(value) {
      this.shw_customer = false;
      this.ipt_search = value.code + " : " + value.title;
      this.select_role_code = value.role_code;

      this.$store.dispatch("settingUserSearch", {
        id: value.id,
        code: value.code,
        type: this.btnType,
        sort: this.btnSort,
        orderby: this.tempSort,
      });
    },
    selectDepartDP(value, mode) {
      if (mode == "departant") {
        this.shw_autocom = false;
        this.ipt_departant = value.code + " : " + value.description;
        this.ipt_departantFull = value;
        this.ipt_code = value.code;
      } else {
        this.shw_autocom_role = false;
        this.ipt_role = value.code + " : " + value.description;
        this.ipt_role_code = value.code;
        this.ipt_iptColeFull = value;
        this.ipt_code = value.code;
      }
    },
    openAutoCom() {
      this.shw_autocom = !this.shw_autocom;
    },
    openAutoComRole() {
      this.shw_autocom_role = !this.shw_autocom_role;
    },
    showAutocom: function (param) {
      console.log(param)
      this.shw_autocom = true;
      if (param.length > 1) {
        let temp = [];

          // console.log(this.dataList)
        _.forEach(this.departmentListFull, function (row, key) {
          let str = row.code + ":" + row.description;
          if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1) {
            temp.push(row);
          }
        });
        console.log(temp)
        this.departmentList = temp;
      
      } else if (param.length == 0) {
        this.departmentList = this.departmentListFull;
      }
    },

    showAutocomRole: function (param) {
      console.log(this.RoleListFull_use)
      this.shw_autocom_role = true;
      // var role_check = this.roleCodeList.concat(this.roleCodeList_un);
      // let master = _.cloneDeep(this.roleCodeList)
      // console.log(master);
      if (param.length > 1) {
        let temp_use = [];
        let temp_unuse = [];
        _.forEach(this.RoleListFull_use , function (row, key) {
          let str = row.code + " : " + row.description;
          if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1) {
            console.log("======>" , row )
            temp_use.push(row);
          }
        });

        _.forEach(this.RoleListFull_unuse , function (row, key) {
          let str = row.code + " : " + row.description;
          if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1) {
            // console.log("======>"  )
            temp_unuse.push(row);
          }
        });

        // this.$store.commit('SET_ROLE_USE' , temp)
        this.RoleList_use = temp_use;
        this.RoleList_unuse = temp_unuse;
        // console.log("temp => ", temp);
      } else if (param.length == 0) {
        this.ipt_role = "";
        this.RoleList_use   = this.RoleListFull_use
        this.RoleList_unuse   = this.RoleListFull_unuse
        // this.$store.commit('SET_ROLE_USE' , master)
      }

    },
    selectType(value) {
      // document.getElementById('input-search').value = null
      this.ipt_search = ''
      this.$store.dispatch("settingUserSearch", {
        id:value.id,
        code: "",
        type: value,
        sort: this.btnSort,
        orderby: this.tempSort,
      });
      this.btnType = value;

      // if (value == "all") {
      //   this.dataList = this.dataListTemp;
      // } else {
      //   let key = value == "active" ? 1 : 0;
      //   this.dataList = _.filter(this.dataListTemp, (item) => {
      //     if (item.status == key) {
      //       return true;
      //     }
      //   });
      // }
      // console.log(value);
    },
    saveData() {
      if (
        this.ipt_username.trim().length == 0 ||
        this.ipt_emp_code.trim().length == 0 ||
        this.ipt_firstname.trim().length == 0 ||
        this.ipt_lastname.trim().length == 0 ||
        (this.ipt_code.trim().length == 0 && this.save_type === "add") ||
        this.ipt_role_code.trim().length == 0
      ) {
        this.validInp = true;
      } else {
        this.validInp = false;
        this.ipt_code = this.ipt_code;
        
        let rs = {
          id: this.ipt_id,
          type: this.save_type == "edit" ? "edit" : "add",
          role_code: this.ipt_role_code,
          department: this.ipt_code,
          username: this.ipt_username,
          password: this.ipt_password,
          emp_code: this.ipt_emp_code,
          email: this.ipt_email,
          first_name: this.ipt_firstname,
          last_name: this.ipt_lastname,
          firstname_en: this.ipt_firstname_en,
          lastname_en: this.ipt_lastname_en,
          status: this.ipt_status == 0 ? false : true,
          code: this.select_role_code,
          sort: this.btnSort,
          orderby: this.tempSort,
          Visible: this.ipt_visible == 1 ? true : false,
          status_noti: this.ipt_status_noti == 1 ? true : false,
        };
        this.$refs["department"].close();
        this.$store.dispatch("settingSaveUser", rs);
        console.log("saveData => ", rs);
      }
    },
    delete_role() {
      let rs = {
        id: this.ipt_id,
        type: "delete",
        role_code: this.ipt_role_code,
        department: this.ipt_code,
        username: this.ipt_username,
        emp_code: this.ipt_emp_code,
        email: this.ipt_email,
        first_name: this.ipt_firstname,
        last_name: this.ipt_lastname,
        firstname_en: this.ipt_firstname_en,
        lastname_en: this.ipt_lastname_en,
        status: this.ipt_status == 0 ? false : true,
        code: this.select_role_code,
        sort: this.btnSort,
        orderby: this.tempSort,
        Visible: this.ipt_visible == 1 ? true : false,
        status_noti: this.ipt_status_noti == 1 ? true : false,
      };

      // console.log(rs);
      this.$store.dispatch("settingSaveUser", rs);
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
      
      if (this.RoleListFull_unuse.length == 0) {
        this.RoleListFull_unuse = this.$store.getters["usmDataUnused"];
        this.RoleList_unuse = this.$store.getters["usmDataUnused"];
      }
      if (this.RoleListFull_use.length == 0) {
        this.RoleListFull_use = this.$store.getters["usmDataUsed"];
        this.RoleList_use = this.$store.getters["usmDataUsed"];
      }
     
      let role;

      // console.log(value);
      if (value == null) {
        this.btndelete = false;
        this.disabled_password = false;
        (this.ipt_id = ""), (this.save_type = "add");
        this.ipt_username = "";
        this.ipt_password = "";
        this.ipt_emp_code = "";
        this.ipt_email = "";
        this.ipt_firstname = "";
        this.ipt_lastname = "";
        this.ipt_firstname_en = "";
        this.ipt_lastname_en = "";
        this.ipt_departant = "";
        this.ipt_role_code = "";
        this.ipt_role = "";
        this.ipt_visible = true;
        this.ipt_status_noti = true;
        this.ipt_status = 1;
        this.dialog_add = true;
      } else {
        this.disabled_password = true;
        this.save_type = "edit";
        this.ipt_id = value.id;
        this.ipt_password = value.password;
         this.dialog_add = false;

        let dept = _.filter(this.departmentList, (item) => {
          if (item.code == value.department) {
            this.ipt_code = item.code;
            return true;
          }
        });
        if (dept.length > 0) {
          this.ipt_departant = dept[0].code + " : " + dept[0].description;
          this.ipt_departantFull = dept[0];
        }

        var role_check = this.roleCodeList.concat(this.roleCodeList_un);
        // console.log(role_check);

        // console.log(value.role_code, this.roleCodeList_un);
        role = _.filter(role_check, (item) => {
          if (item.code == value.role_code) {
            return true;
          }
        });

        //  role = _.filter(this.roleCodeList_un, (item) => {
        //   if (item.code == value.role_code) {
        //     return true;
        //   }
        // });

        if (role.length > 0) {
          this.ipt_role = role[0].code + " : " + role[0].description;
          this.ipt_role_code = role[0].code;
          this.ipt_iptColeFull = role[0];
        } else {
          this.ipt_role = value.role_code + " : " + value.description;
          this.ipt_role_code = value.role_code;
        }

        this.ipt_username = value.username;
        this.ipt_firstname = value.first_name;
        this.ipt_status = value.status;
        this.ipt_emp_code = value.emp_code;
        this.ipt_email = value.email;

        this.ipt_password = value.password;
        this.ipt_lastname = value.last_name;
        this.ipt_firstname_en = value.firstname_en;
        this.ipt_lastname_en = value.lastname_en;
        this.ipt_visible = value.visible;
        this.ipt_status_noti = value.status_noti;

        if (this.ipt_status == 0) {
          this.btndelete = true;
        }else {
          this.btndelete = false;
        }

        console.log(this.ipt_status);
      }
      this.validInp = false;
      this.$refs["department"].open();
    },
    enabled_password(){
      this.disabled_password = false
    }, 
    open_dialog(ref) {
      if (ref == "delete") {
        this.$refs["confirm_delete"].open();
      }
      if (ref == "save") {
        if (
          this.ipt_username.trim().length == 0 ||
          this.ipt_emp_code.trim().length == 0 ||
          this.ipt_firstname.trim().length == 0 ||
          this.ipt_lastname.trim().length == 0 ||
          (this.ipt_code.trim().length == 0 && this.save_type === "add") ||
          this.ipt_role_code.trim().length == 0
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
    clearRole(){
      this.ipt_role_code = ''
      this.ipt_role = ''
    },
     clearDep(){
      this.ipt_departant = ''
      this.ipt_code = ''
    },
    clear_search(){
      this.ipt_search = ''
       this.$store.dispatch("settingUserSearch", {
          code: "",
          type: this.btnType,
          sort: "",
          orderby: "",
        });
    },
    confirm_close(ref) {
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
      this.$refs["department"].close();
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
    keySpecialEmail(e) {
      console.log(e.keyCode);
      if (
        e.keyCode == 96 ||
        e.keyCode == 126 ||
        e.keyCode == 33 ||
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
    mouseLeaveDP: function () {
      if (this.shw_autocom == true) {
        this.shw_autocom = false;
      }
    },
    mouseLeaveRole: function () {
      if (this.shw_autocom_role == true) {
        this.shw_autocom_role = false;
      }
    },
    mouseLeaveSearch: function () {
      if (this.shw_customer) {
        this.shw_customer = false;
      } else {
        this.shw_customer = true;
      }
    },
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
   
      this.$store.dispatch("settingRoleUser", "");
      this.$store.dispatch("settingCountUser");
      this.$store.dispatch("settingDepartment", "");
      this.$store.dispatch("setPathMenuService", "setting");
      this.$store.dispatch("settingUserSearch", {
        id:'',
        code: this.select_role_code,
        type: this.btnType,
        sort: this.btnSort,
        orderby: this.tempSort,
      });
      this.login = true;
      // this.fetchData();
    }
  },
  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
    "md-dropdown-box": require("../Salesops/customComponent/mdc-dropdown-box3")
  },
};
</script>
<style></style>
