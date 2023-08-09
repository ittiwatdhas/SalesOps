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
          <div style="width: 40%">
            <md-input-container class="-no-line -search" style="margin: 0px">
              <md-icon class="mr-5">
                search <md-tooltip>search</md-tooltip></md-icon
              >
              <md-input
                placeholder="Search"
                :class="ipt_search == 'Search' ? 'earch-text' : 'value-text'"
                v-on:change="searchDepartment"
                @focus="showSearch"
                :value="ipt_search"
                @focus.native="$event.target.select()"
              ></md-input>
            </md-input-container>
            <md-card
              v-if="shw_department"
              v-click-outside="outsideShowCust"
              id="style-scroll"
            >
              <ul class="md-list" v-if="dataListSearch.length > 0">
                <li
                  class="md-list-item"
                  v-for="(item, index) in dataListSearch"
                  :key="index"
                >
                  <div
                    class="md-list-item-text"
                    @click="selectDepartment(item)"
                  >
                    {{ item.code
                    }}<span class="kanitFont"> : {{ item.description }}</span>
                  </div>
                </li>
              </ul>
            </md-card>
          </div>
          <div style="width: 50%" class="md-report-bar">
            <div style="width: 100%; display: flex">
              <div style="padding-left: 22px; width: 35%">
                <div
                  :class="btnType == 'all' ? 'title-text active' : 'title-text'"
                  @click="selectType('all')"
                >
                  ALL STATUS
                </div>
                <div class="title-number">
                  {{ formatNumber($store.getters.dm_all_ALLSTATUS) }}
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
                  {{ formatNumber($store.getters.dm_ACTIVE) }}
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
                  {{ formatNumber($store.getters.dm_INACTIVE) }}
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
          style="flex: initial"
          md-align="center"
          class="cust-list-box"
          v-if="dataList.length == 0"
        >
          <span class="nodata">No data</span>
        </md-layout>
        <md-layout
          style="flex: initial; margin-left: 2%; margin-right: 9%"
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
              Code
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
              Parent
            </div>
            <div
              :class="
                btnSort == 'category'
                  ? 'column-province active'
                  : 'column-province'
              "
              style="
                width: 15%;
                text-align: left;
                cursor: pointer;
                font-weight: 500;
              "
              @click="sortData('category')"
            >
              Category
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
                {{ item.parent == true ? "" : item.parent }}
              </div>
              <div class="column-province" style="width: 15%">
                {{ item.category }}
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
      id="pageDepartmentDialog"
    >
      <md-dialog-title>
        <md-layout>
          <md-layout
            md-flex="90"
            style="display: -webkit-box; overflow: hidden"
          >
            <div class="title">Department Details</div>
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
            <label>Department Code</label>
            <md-input
              v-model="ipt_code"
              @keypress.native="keySpecial"
              :disabled="disabledCODE"
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
          <md-input-container style="margin-bottom: 7px">
            <label>Category</label>
            <md-input
              v-model="ipt_category"
              @keypress.native="keySpecial"
            ></md-input>
            <div
              class="md-error"
              style="bottom: -25px; opacity: inherit; color: #f44336"
              v-if="(ipt_category == '' || ipt_category == null) && validInp"
            >
              {{ warningText }}
            </div>
          </md-input-container>
          <md-input-container style="margin-bottom: 7px">
            <label>Company</label>
            <md-input
              v-model="ipt_company"
              @keypress.native="keySpecial"
              :disabled="disabledcompany"
            ></md-input>
            <div
              class="md-error"
              style="bottom: -25px; opacity: inherit; color: #f44336"
              v-if="(ipt_company == '' || ipt_company == null) && validInp"
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
              />
               </div>
                <div style="width: 25%;padding-top: 8px; color: #727272;">  Child Dep. </div>
            <div style="width: 65%;">
                   <div class="search-cust-box" style="width: 100%">
              <md-input-container class="-no-line -search" style="margin: 0px">
                <md-input
                  :disabled="!ipt_root"
                  :class="
                    ipt_departant == 'Select Department'
                      ? 'earch-text'
                      : 'value-text'
                  "
                  placeholder="Select Department"
                  v-on:change="searchDetail"
                  @focus="showAutocom"
                  :value="ipt_departant"
                  @focus.native="$event.target.select()"
                ></md-input>
                <div
                  class="md-error"
                  style="bottom: -25px; opacity: inherit; color: #f44336"
                  v-if="(ipt_departant == '' || ipt_departant == null ) && validInp && this.ipt_root == true"
                >
                  {{ warningText }}
                </div>
                <md-icon
                  class="ml-5"
                  @click.native="openAutoCom"
                  :style="{ cursor: ipt_root ? 'default' : 'pointer' }"
                >
                  arrow_drop_down</md-icon
                >
              </md-input-container>
              <md-card
                v-if="shw_autocom"
                v-click-outside="outsideShowCustDP"
                id="style-scroll"
                style="max-height: 200px; height: 200px; bottom: 240px"
              >
                <ul class="md-list" v-if="dataListDetail.length > 0">
                  <li
                    class="md-list-item"
                    v-for="(item, index) in dataListDetail"
                    :key="index"
                  >
                    <div
                      class="md-list-item-text"
                      @click="selectDepartDP(item)"
                    >
                      {{ item.code }} :
                      <span class="kanitFont" style="margin-left: 10px">
                        {{ item.description }}</span
                      >
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
          <div style="margin-top: 12px; margin-bottom: 80px">
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
export default {
  name: "setting-department",
  data() {
    return {
      title: "DEPARTMENT MANAGEMENT",
      ipt_search: "",
      shw_department: false,
      btnType: "active",
      btnSort: "code",
      btndelete: false,
      ipt_code: "",
      ipt_description: "",
      ipt_category: "",
      ipt_company: "DHAS",
      ipt_status: 1,
      ipt_root: false,
      ipt_departant: "",
      ipt_departantFull: "",
      inp_parent: "",
      shw_autocom: false,
      shw_autocom2: false,
      validInp: false,
      warningText: "Please input data",
      tempSort: "ASC",
      all_label: [],
      active_label: [],
      type_save: "",
      ipt_searc_code: "",
      disabledCODE: false,
      disabledcompany: true,
      dataListDetail: [],
      dataListDetailTemp: [],
      validation_Child_Dep: false,
      used: "",
      used_parent: "",
      used_status: "",
    };
  },
  computed: {
    dataListSearch() {
      return this.$store.getters["dmDataListSearch"];
    },
    dataList() {
      if (this.dataListDetailTemp.length == 0) {
        this.dataListDetailTemp = this.$store.getters["dm_deatil_list"];
        this.dataListDetail = this.$store.getters["dm_deatil_list"];
      }
      return this.$store.getters["dmDataList"];
    },
  },
  methods: {
    fetchData() {
      this.all_label = arr.length;
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
      if (this.shw_department) {
        this.shw_department = false;
      } else {
        this.shw_department = true;
      }
    },
    sortData(value) {
      this.btnSort = value;
      this.tempSort = this.tempSort == "ASC" ? "DESC" : "ASC";

      this.$store.dispatch("settingDepartmentSearch", {
        code: this.ipt_searc_code,
        type: this.btnType,
        sort: this.btnSort,
        orderby: this.tempSort,
      });
    },
    searchDepartment: function (param) {
      this.shw_autocom2 = true;
      if (param.length > 1) {
        this.$store.dispatch("settingDepartment", param);
      } else if (param.length == 0) {
        this.ipt_searc_code = "";
        this.$store.dispatch("settingDepartmentSearch", {
          code: "",
          type: this.btnType,
          sort: this.btnSort,
          orderby: this.tempSort,
        });
      }
    },
    selectDepartment(value) {
      this.shw_department = false;
      this.ipt_search = value.code + " " + value.description;
      this.ipt_searc_code = value.code;
      this.$store.dispatch("settingDepartmentSearch", {
        code: value.code,
        type: this.btnType,
        sort: this.btnSort,
        orderby: this.tempSort,
      });
    },
    selectDepartDP(value) {
      this.inp_parent = value.code;
      this.shw_autocom = false;
      this.ipt_departant = value.code + " : " + value.description;
      this.ipt_departantFull = value;
    },
    openAutoCom() {
      if (this.ipt_root) {
        this.shw_autocom = !this.shw_autocom2;
      }
    },
    showAutocom() {
      if (this.shw_autocom) {
        this.shw_autocom = false;
      } else {
        this.shw_autocom = true;
      }
    },
    searchDetail: function (param) {
      // this.dataListDetail = []
      this.shw_autocom = true;
      if (param.length > 1) {
        let temp = [];
        _.forEach(this.dataListDetailTemp, function (row, key) {
          let str = row.code + row.description;
          if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1) {
            temp.push(row);
          }
        });
        this.dataListDetail = temp;
      } else if (param.length == 0) {
        this.dataListDetail = this.dataListDetailTemp;
      }
    },
    selectType(value) {
      this.$store.dispatch("settingDepartmentSearch", {
        code: this.ipt_searc_code,
        type: value,
        sort: this.btnSort,
        orderby: this.tempSort,
      });
      this.btnType = value;
    },
    setRoot(e) {
      // if (this.ipt_root) {
      this.ipt_departant = "";
      // }
    },
    saveData() {
      if (
        this.ipt_code.trim().length == 0 ||
        this.ipt_description.trim().length == 0 ||
        this.ipt_category.trim().length == 0 ||
        this.ipt_company.trim().length == 0 ||
        (this.ipt_root == false && this.ipt_departant.trim().length == 0)
      ) {
        this.validInp = true;
      } else {
        this.validInp = false;
        let rs = {
          type_save: this.type_save == "edit" ? "edit" : "add",
          code: this.ipt_code,
          description: this.ipt_description,
          category: this.ipt_category,
          company: this.ipt_company,
          status: this.ipt_status == 0 ? false : true,
          root: this.ipt_root,
          child_dep: this.inp_parent,
          parent: this.inp_parent,
          search_code: this.ipt_searc_code,
          type: this.btnType,
          sort: this.btnSort,
          orderby: this.tempSort,
          // parent: this.ipt_root ? this.ipt_root : this.ipt_departantFull.code,
        };
        this.$refs["department"].close();

        this.$store.dispatch("settingSaveDepartment", rs);
      }
    },
    delete_role() {
      let rs = {
        type_save: "delete",
        code: this.ipt_code,
        description: this.ipt_description,
        category: this.ipt_category,
        company: this.ipt_company,
        status: this.ipt_status == 0 ? false : true,
        root: this.ipt_root,
        child_dep: this.inp_parent,
        parent: this.inp_parent,
        search_code: this.ipt_searc_code,
        type: this.btnType,
        sort: this.btnSort,
        orderby: this.tempSort,
        // parent: this.ipt_root ? this.ipt_root : this.ipt_departantFull.code,
      };
      this.$store.dispatch("settingSaveDepartment", rs);
      this.$refs["department"].close();
      this.$refs["confirm_delete"].close();
      console.log(rs);
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
      console.log(value);
      if (index != null) {
        this.btndelete = true;
        this.type_save = "edit";
        this.disabledCODE = true;
        this.disabledcompany = true;
        this.used = value.used;
        this.used_parent = value.used_parent;
        this.used_status = value.used_status;
      }
      if (value != null) {
        this.inp_parent = value.parent;
      }
      if (value == null) {
        this.used = "";
        this.used_parent = "";
        this.used_status = "";
        this.btndelete = false;
        this.shw_autocom = false;
        this.disabledCODE = false;
        this.disabledcompany = false;
        this.ipt_departant = "";
        this.ipt_code = "";
        this.ipt_description = "";
        this.ipt_category = "";
        this.ipt_company = "DHAS";
        this.ipt_status = 1;
        this.ipt_root = true;
        this.inp_parent = "";
      } else {
        if (value.parent == true) {
          this.inp_parent = value.parent;
          this.ipt_root = value.parent;
          this.ipt_departant = "";
          this.ipt_departantFull = "";
        } else {
          let child = _.filter(this.dataListDetailTemp, (item) => {
            if (item.code == value.parent) {
              return true;
            }
          });
          this.ipt_root = true;
          if (child.length > 0) {
            this.ipt_departant = child[0].code + " " + child[0].description;
            this.ipt_departantFull = child[0];
          }
        }
        this.ipt_code = value.code;
        this.ipt_description = value.description;
        this.ipt_category = value.category;
        this.ipt_company = value.company;
        this.ipt_status = value.status;
      }
      this.validInp = false;
      this.$refs["department"].open();
    },
    open_dialog(ref) {
      console.log("open_dialog",ref)
      if (ref == "delete") {
        if (this.used_status == "0") {
          this.$refs["confirm_delete"].open();
        } else {
          this.$refs["confirm_delete_last"].open();
        }
      }
      if (ref == "save") {
        if (
          this.ipt_code.trim().length == 0 ||
          this.ipt_description.trim().length == 0 ||
          this.ipt_category.trim().length == 0 ||
          this.ipt_company.trim().length == 0 ||
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
    outsideShowCust: function (e) {
      if (
        e.target.className != "md-input" &&
        e.target.className != "md-input earch-text" &&
        e.target.className != "md-input value-text"
      ) {
        this.shw_department = false;
      }
    },
    outsideShowCustDP: function (e) {
      if (
        e.target.className != "md-input" &&
        e.target.className != "md-input earch-text" &&
        e.target.className != "md-input value-text"
      ) {
        this.shw_autocom2 = false;
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

      // this.fetchData();
      this.$store.dispatch("settingCountDepartment");
      this.$store.dispatch("settingDepartment", "");
      this.$store.dispatch("settingDepartmentSearch", {
        code: this.ipt_searc_code,
        type: this.btnType,
        sort: this.btnSort,
        orderby: this.tempSort,
        // code: "",
        // type: "",
        // sort: "",
        // orderby: "asc",
      });
    }
  },
  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
  },
};
</script>
<style></style>
