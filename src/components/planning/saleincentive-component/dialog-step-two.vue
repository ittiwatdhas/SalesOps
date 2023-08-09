<template>
  <div>
    <md-dialog
      class="incentive-dialog-step-two"
      md-open-from="#custom"
      md-close-to="#custom"
      ref="dialog-step-two"
    >
      <md-spinner
        v-show="loadingPage"
        :md-size="150"
        :md-stroke="1"
        md-indeterminate
        style="position: fixed; z-index: 10; left: 45%; top: 35%;"
      ></md-spinner>

      <div
        class="md-dialog-title"
        style="background: #EFEFEF; margin-right: 1px; padding-top: 20px; padding-bottom: 10px; margin-bottom: 12px;"
      >
        <md-layout>
          <md-layout md-flex-large="80">
            <md-chip>{{ title.tactics_index }}</md-chip>
            <label
              class="sub-title kanitFont"
              style="font-size: 18px; margin-left: 10px;"
            >{{ title.tactics_title }}</label>
            <label
              class="sub-title kanitFont"
              style="font-size: 18px; font-weight: 600; margin-left: 7px;"
            >- {{ title.condition_title }}</label>
          </md-layout>
          <md-layout md-flex-large="20" md-align="end">
            <md-icon
              @click.native="closeDialog('dialog-step-two')"
              style="cursor: pointer; margin: 0px; text-align: right;"
            >close</md-icon>
          </md-layout>
        </md-layout>
      </div>

      <md-dialog-content>
        <div class="content-respon">
          <div style="background: #EFEFEF; padding: 15px; display: flex;">
            <div style="width: 22%; display: flex;">
              <div style="margin-left: 10px; margin-top: 3px;">
                <label class="-salesops-checkbox-container">
                  <input
                    type="checkbox"
                    @click="selectAllProductFilter"
                    v-model="checkedProductFilterAll"
                  />
                  <span class="-salesops-checkbox"></span>
                </label>
              </div>
              <md-icon
                title="Delete"
                style="cursor: pointer; margin: 0px; padding-left: 5px; color: #A8A8A8;"
                class="icon-delete"
                @click.native="deleteItems"
              >delete</md-icon>
              <!-- <label
                style="padding-top: 4px; color: #414141; font-size: 18px; padding-left: 20px; font-family: Kanit;"
              >PRODUCT CATEGORY SELECTED</label> -->
              <label
                style="padding-top: 4px; color: #414141; font-size: 18px; padding-left: 20px; font-family: Kanit;"
              >SELECTED LIST</label>
            </div>
            <!-- <div v-show="
                    title.condition_code === 2 || title.condition_code === '2'
                  " 
                  style="width: 18%;" >
              <div style="margin-left: 10px; margin-top: 3px;">
                <label
                  style="padding-top: 4px; color: #A8A8A8; font-size: 12px; padding-left: 20px; font-family: Kanit;"
                >BALANCE : </label>
                
                <label
                  style="padding-top: 4px; font-size: 12px; font-family: Kanit;"
                  :style="{'color': checkColor(sumMaxRewards)}"
                >{{ formatNumber(sumMaxRewards, 0) }}</label>
                
              </div>
            </div> -->

            <div v-show="
                    title.condition_code === 1 || title.condition_code === '1'
                  " 
                  style="width: 18%;" >
            </div>
            <div style="width: 17%; text-align: left; padding-left: 1%; padding-right: 1%;">
              <!-- <div class="text-1">KEY SEARCH</div> -->
              <form @click.stop.prevent="changeTypeSearch">
                <md-switch style="margin-bottom: 0px;margin-top: 13px;"
                  type="submit"
                  v-model="type_search"
                  class="md-primary"
                >
                <label v-if="type_search">SEARCH + ADD</label>
                <label v-if="!type_search">SEARCH</label>
                </md-switch>
                <!-- <div class="text-1">SEARCH</div> -->
              </form>
              
            </div>
            <div id="copy_search" v-show="type_search" style="width: 40%;">
              <div class="salesops-input" style="margin-right: 20px; display: flex;">
                <!-- <md-icon style="cursor: pointer; color: #A8A8A8;">post_add</md-icon> -->
                <md-icon
                  style="cursor: pointer; color: #A8A8A8; margin: 0px 10px; padding-top: 6px;"
                  @click.native="clearSearchTxtProductCopy"
                >refresh</md-icon>
                <input
                  type="text"
                  v-model="searchTxtProductCopy"
                  placeholder="Please fill in cg code set, ex. xxx001 xxx002 xxx003."
                  @keyup.enter="searchProductItem(searchTxtProductCopy, 'copy')"
                />
              </div>
            </div>
            <div v-show="!type_search" style="width: 40%;" v-click-outside="closeDivSearch">
              <div class="salesops-input" style="margin-right: 20px; display: flex;">
                <!-- <md-icon style="cursor: pointer; color: #A8A8A8;">post_add</md-icon> -->
                <md-icon
                  style="cursor: pointer; color: #A8A8A8; margin: 0px 10px; padding-top: 6px;"
                  @click.native="searchProductItem(searchTxtProduct, 'key')"
                >playlist_add</md-icon>
                <input
                  type="text"
                  v-model="searchTxtProduct"
                  placeholder="Search..."
                  @keyup.enter="searchProductItem(searchTxtProduct, 'key')"
                />
              </div>

              <div v-show="showDisplaySearch">
                <md-card
                  class="search-product-treeview"
                  style="position: absolute; top: 66px; margin-left: 2px;"
                >
                  <md-card-content>
                    <!-- Loading -->
                    <div
                      v-show="loadingSearch"
                      style="padding: 20px; text-align: center; display: flex; justify-content: center;"
                    >
                      <md-spinner
                        :md-size="30"
                        :md-stroke="1"
                        md-indeterminate
                        style="position: fixed; z-index: 10; margin-left: -40px;"
                      ></md-spinner>
                      <label style="margin-left: 45px; padding-top: 5px;">Loading..</label>
                    </div>

                    <template v-for="(product, iProduct) in dataSearchProduct">
                      <!-- mom -->
                      <div
                        :key="`${iProduct}-${product.code}`"
                        style="display: flex; width: 100%; background-color: rgba(236, 236, 235, 1); padding: 15px 25px 15px 15px;"
                      >
                        <label
                          class="-salesops-checkbox-container"
                          :style="{'visibility':ckeckExist(product.code , 'mom')? 'hidden':'visible' , 'width':'5%'}"
                        >
                          <!-- v-model="checkedProductSearchAll" -->
                          <input
                            type="checkbox"
                            @click="selectAllProductSearch(product.code)"
                            :id="product.code"
                            :value="product.code"
                          />
                          <span class="-salesops-checkbox"></span>
                        </label>
                        <div
                          class="font-kanit"
                          style="width: 63%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                          :title="product.name"
                        >{{ product.code }} : {{ product.name }}</div>
                        <div
                          class="font-kanit"
                          style="text-align: right; font-size: 10px; color: #41414180; width: 27%;"
                        >{ ฿ Supply : {{ formatNumber(product.supply, 0) }} }</div>
                        <div style="width: 5%;">
                          <md-icon
                            style="margin: 0px; color: #A8A8A8; padding-left: 5px;"
                          >arrow_drop_down</md-icon>
                        </div>
                      </div>

                      <!-- child -->
                      <template v-for="(item, rIndex) in product.items">
                        <div
                          :key="`${rIndex}-${item.code}`"
                          style="display: flex; width: 100%; padding: 6px 50px 7px 50px;"
                          :class="'row-bg-gray'"
                        >
                          <label
                            class="-salesops-checkbox-container"
                            :style="{'visibility':ckeckExist(item.code , 'child')? 'hidden':'visible' , 'width':'5%'}"
                          >
                            <!-- v-model="checkedProductSearch[product.code]" -->
                            <input
                              type="checkbox"
                              :id="item.code"
                              :value="item.code"
                              @click="
                                selectProductSearch(product.code, item.code)
                              "
                            />
                            <span class="-salesops-checkbox"></span>
                          </label>
                          <div
                            class="font-kanit"
                            style="width: 75%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                            :title="item.name"
                          >{{ item.code }} : {{ item.name }}</div>
                          <div
                            class="font-kanit"
                            style="text-align: right; font-size: 11px; color: #41414180; width: 20%;"
                          >{{ formatNumber(item.total, 0) }}</div>
                        </div>
                      </template>
                    </template>
                  </md-card-content>
                </md-card>
              </div>
            </div>
          </div>
          <!-- TABLE -->
          <div id="table-product-filter">
            <div id="divHeadList">
              <div style="width: 4%;"></div>
              <div
                style="text-align: right;"
                :class="
                  title.condition_code === 1 || title.condition_code === '1'
                    ? 'respon-column-name-0'
                    : 'respon-column-name-1'
                "
              >
                <md-icon
                  v-show="
                    title.condition_code === 2 || title.condition_code === '2'
                  "
                  title="Edit"
                  style="cursor: pointer; margin: 0px; color: #A8A8A8; font-size: 20px;"
                  @click.native="openDialogUpdateRewards()"
                >create</md-icon>
              </div>
              <div
                v-show="
                  title.condition_code === 2 || title.condition_code === '2'
                "
                class="respon-column-rewards"
                style="cursor: pointer;"
                @click="sortDataTable()"
              >
                REWARDS
                <md-icon v-show="sortDESC" style="margin: 0px; color: #A8A8A8;">arrow_drop_down</md-icon>
                <md-icon v-show="!sortDESC" style="margin: 0px; color: #A8A8A8;">arrow_drop_up</md-icon>
              </div>
              <div style="width: 10%; padding-left: 15px;">(฿) NEW ITEM</div>
              <div class="respon-column-highgrowth">(฿) HIGH GROWTH LOW SHARE</div>
              <div style="width: 10%;">(฿) RISING STAR</div>
              <div style="width: 10%;">(฿) CASH COW</div>
              <div style="width: 8%;">(฿) DOG</div>
              <div style="width: 8%; color: #414141; font-weight: 800;">(฿) Total</div>
            </div>

            <div id="divBodyList">
              <div
                v-show="tbListItems == null || tbListItems.length == 0"
                :class="'row-bg-gray'"
                style="display: block; text-align: center;"
              >No data in table.</div>

              <div
                :class="item.used ? 'row-bg-gray -disabled' : 'row-bg-gray'"
                v-for="(item, rIndex) in tbListItems"
                :key="rIndex"
              >
                <div style="width: 4%;">
                  <label class="-salesops-checkbox-container">
                    <input
                      type="checkbox"
                      v-model="checkedProductFilter_current"
                      :id="item.code"
                      :value="item.code"
                      @click="selectProductFilter(item.code, item.reward)"
                    />
                    <span class="-salesops-checkbox"></span>
                  </label>
                </div>
                <div
                  :class="
                    title.condition_code === 1 || title.condition_code === '1'
                      ? 'respon-column-name-0'
                      : 'respon-column-name-1'
                  "
                  style="font-family: Kanit;"
                  class="nowrap-title"
                  :title="item.name"
                >{{ item.code }} : {{ item.name }}</div>
                <div
                  v-show="
                    title.condition_code === 2 || title.condition_code === '2'
                  "
                  class="respon-column-rewards"
                  style="display: flex;"
                >
                  <span>฿</span>
                  <md-input-container class="md-input-focused">
                    <md-input
                      v-model="item.reward"
                      @keypress.native="isNumber"
                      @focus="formatStringToFloat(rIndex, 2)"
                      @focus.native="$event.target.select()"
                      @blur="calulateReward(item.code)"
                      @keyup.enter.native="calulateReward(item.code)"
                    ></md-input>
                  </md-input-container>
                </div>
                <div style="width: 10%; padding-left: 15px;">{{ formatNumber(item.new_item, 0) }}</div>
                <div class="respon-column-highgrowth">{{ formatNumber(item.high_growth, 0) }}</div>
                <div style="width: 10%;">{{ formatNumber(item.rising_star, 0) }}</div>
                <div style="width: 10%;">{{ formatNumber(item.cash_cow, 0) }}</div>
                <div style="width: 8%;">{{ formatNumber(item.dog, 0) }}</div>
                <div
                  style="width: 8%; color: #414141; font-weight: 800;"
                >{{ formatNumber(item.total, 0) }}</div>
              </div>
            </div>

            <div class="footer-table">
              <div
                :class="
                  title.condition_code === 1 || title.condition_code === '1'
                    ? 'respon-column-name-0'
                    : 'respon-column-name-1'
                "
                style="font-size: 14px; font-weight: 600;"
                class="has-bg padding-respon"
              >
                <!-- Grand Totals : -->
                <label
                  v-if="
                    title.condition_code === 1 || title.condition_code === '1'
                  "
                >Grand Totals :</label>
                <label v-else>
                  Selected : &emsp; ฿
                  {{ formatNumber(sumSelectData, 0) }}
                </label>
              </div>
              <div
                v-show="
                  title.condition_code === 2 || title.condition_code === '2'
                "
                class="has-bg respon-column-rewards"
              >
                <label style="padding-right: 5px;">฿</label>
                {{ formatNumber(sumRewards, 0) }}
              </div>
              <div
                style="width: 10%; padding-left: 15px;"
                class="has-bg"
              >{{ formatNumber(sumNewItem, 0) }}</div>
              <div class="has-bg respon-column-highgrowth">{{ formatNumber(sumHighGrowth, 0) }}</div>
              <div style="width: 10%;" class="has-bg">{{ formatNumber(sumRisingStar, 0) }}</div>
              <div style="width: 10%;" class="has-bg">{{ formatNumber(sumCashCow, 0) }}</div>
              <div style="width: 8%;" class="has-bg">{{ formatNumber(sumDog, 0) }}</div>
              <div
                style="width: 8%; color: #414141; font-weight: 800;"
                class="has-bg"
              >{{ formatNumber(sumTotal, 0) }}</div>
            </div>
          </div>
        </div>
      </md-dialog-content>
      <!-- v-show="
                    title.condition_code === 2 || title.condition_code === '2'
                  "  -->
      <md-dialog-actions style="justify-content: unset;padding: 10px 30px;">
              <div style="padding:0 20px 0 0 ;display:flex;justify-content: flex-end;;font-size:15px;font-weight: bold; font-family:Roboto; color: #A8A8A8;width: 11%;" ></div>
                <div  v-show="title.condition_code === 2 || title.condition_code === '2'" 
                 style="padding:0 20px 0 0 ;display:flex;justify-content: flex-start;font-size:15px;font-weight: bold; font-family:Roboto; color: #A8A8A8;width: 23%;" >
              
                 <div style="margin-left: 10px; margin-top: 3px;">
                <label
                  style="padding-top: 4px; color: #A8A8A8; font-size: 12px; padding-left: 20px; font-family: Kanit;"
                >BALANCE : </label>
                
                <label
                  style="padding-top: 4px; font-size: 12px; font-family: Kanit;"
                  :style="{'color': checkColor(sumMaxRewards)}"
                >{{ formatNumber(sumMaxRewards, 0) }}</label>
                
              </div>
               
                 
                </div>
                <div style="width: 46%;">
                </div>

                <div style="display: flex;justify-content: flex-end;width: 20%;">
                  <md-button style="color: #a2a2a2;" @click="reloadData()">RELOAD</md-button>
                  <md-button class="md-primary" @click="saveDataDialog()" style="margin-left: 32px;">Save</md-button>
                </div>
            </md-dialog-actions>

            
      <!-- <md-dialog-actions style="padding: 10px 30px;">
        <md-button style="color: #a2a2a2;" @click="reloadData()">RELOAD</md-button>
        <md-button class="md-primary" @click="saveDataDialog()" style="margin-left: 32px;">Save</md-button>
      </md-dialog-actions> -->
    </md-dialog>

    <md-dialog
      md-open-from="#custom"
      md-close-to="#custom"
      ref="dialog-update-rewards"
      class="incentive-update-rewards"
    >
      <md-dialog-content>
        <div
          style="font-size: 16px; color: #727272; font-weight: 500;"
        >Do you want to edit all selected items as .</div>
        <div style="display: flex; margin-top: 20px; font-size: 22px;">
          <label style="padding-top: 14px; margin-right: 10px;">฿</label>
          <div class="salesops-input">
            <input
              ref="valueUpdateRewardsID"
              type="text"
              v-model="valueUpdateRewards"
              @keypress="isNumber"
              @focus="formatStringToFloatEdit(2)"
              @blur="updateRewards"
              placeholder="Value update..."
            />
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="$refs['dialog-update-rewards'].close()" style="color: #a8a8a8;">Cancel</md-button>
        <md-button class="md-primary" @click="updateRewardsMany()">Update</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-snackbar
      class="incentive-step-two-snackbar"
      :md-position="vertical + ' ' + horizontal"
      ref="snackbar"
      :md-duration="duration"
    >
      <span>Please select the product you want to update.</span>
      <md-button @click="$refs.snackbar.close()">OK</md-button>
    </md-snackbar>

    <md-snackbar
      :md-position="vertical + ' ' + horizontal"
      ref="snackbar_input"
      :md-duration="duration"
    >
      <span>Can't found cg code : {{ snkValue }}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">
        <span style="color:#fd7f00">Agree</span>
      </md-button>
    </md-snackbar>

    <dialog-confirm
      :show="showDialogConfirm"
      :btnright="btnright"
      :content="dialogConfirmContent"
      @clickClose="onCloseDialog"
      @clickConfirm="onConfirmDialog"
    ></dialog-confirm>
  </div>
</template>

<script>
import incentiveService from "@/services/planning/incentive";
import ClickOutside from "vue-click-outside";

export default {
  name: "dialog-step-two",

  directives: {
    ClickOutside
  },

  components: {
    "dialog-confirm": require("./dialog-confirm")
  },

  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      dataSearchProduct: {},
      searchTxtProduct: "",
      searchTxtProductCopy: "",
      showDisplaySearch: false,
      loadingSearch: false,
      loadingPage: false,
      tbListItems: [],
      checkedProductSearchAll: [],
      checkedProductSearch: [],
      checkedProductFilterAll: false,
      checkedProductFilter: [],
      checkedProductFilter_current: [],
      sortDESC: true, //Default เรียงจากมากไปน้อย
      sumRewards: 0,
      sumNewItem: 0,
      sumHighGrowth: 0,
      sumRisingStar: 0,
      sumCashCow: 0,
      sumDog: 0,
      sumTotal: 0,
      sumMaxRewards: 0,
      valueUpdateRewards: "",
      vertical: "bottom",
      horizontal: "center",
      duration: 10000,
      sumSelectData: 0,
      dialogConfirmContent: "",
      showDialogConfirm: false,
      checkClickButton: "",
      btnright: "",
      type_search: false,
      snkValue: ""
    };
  },

  watch: {
    show() {
      if (this.show) {
        this.$refs["dialog-step-two"].open();
        this.loadDataList();
        // incentiveService.getListData().then(response => {
        //   this.tbListItems = response;
        //   this.calulateFooter();
        // });
      }
    }
  },

  methods: {
    ckeckExist(code, mode) {
      if (mode == "mom") {
        let key = this.checkedProductSearchAll.findIndex(item => {
          return code === item;
        });

        if (key > -1) {
          return true;
        } else {
          return false;
        }
      } else {
        let key = this.tbListItems.findIndex(item => {
          return code === item.code;
        });

        if (key > -1) {
          return true;
        } else {
          return false;
        }
      }
    },
    formatNumber(value, dicimal) {
      if (isNaN(parseFloat(value))) {
        return value;
      } else {
        return parseFloat(value).toLocaleString(undefined, {
          minimumFractionDigits: dicimal,
          maximumFractionDigits: dicimal
        });
      }
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57)
        // && charCode !== 46 (.)
      ) {
        this.keepEvent = false;
        evt.preventDefault();
      } else {
        this.keepEvent = true;
        return true;
      }
    },
    closeDialog(ref) {
      this.btnright = "YES";
      this.checkClickButton = "close";
      this.dialogConfirmContent = "Are you sure you want to close ?";
      this.showDialogConfirm = true;
    },
    selectAllProductFilter() {
      this.checkedProductFilter = [];
      this.checkedProductFilter_current = [];
      this.sumSelectData = 0;
      if (!this.checkedProductFilterAll) {
        for (let itemCode in this.tbListItems) {
          let value_reward = this.tbListItems[itemCode].reward;
          let rs = value_reward.toString().replace(/,/g, "");

          this.checkedProductFilter.push(this.tbListItems[itemCode].code);
          this.checkedProductFilter_current.push(
            this.tbListItems[itemCode].code
          );
          this.sumSelectData +=
            this.tbListItems[itemCode].reward &&
            this.tbListItems[itemCode].reward !== ""
              ? // ? parseFloat(this.tbListItems[itemCode].reward)
                parseFloat(rs)
              : 0;
        }
      } else {
        this.sumSelectData = 0;
      }
    },
    selectProductFilter(code, reward) {
      let rs = reward.toString().replace(/,/g, "");
      if (this.checkedProductFilter_current.indexOf(code) == -1) {
        this.checkedProductFilter_current.push(code);
        // this.sumSelectData += reward && reward !== "" ? parseFloat(reward) : 0;
        this.sumSelectData += reward && reward !== "" ? parseFloat(rs) : 0;
      } else {
        this.checkedProductFilter_current.splice(
          this.checkedProductFilter_current.indexOf(code),
          1
        );
        // this.sumSelectData -= reward && reward !== "" ? parseFloat(reward) : 0;
        this.sumSelectData -= reward && reward !== "" ? parseFloat(rs) : 0;
      }
      this.checkedProductFilterAll =
        this.checkedProductFilter_current.length == this.tbListItems.length
          ? true
          : false;
      /*
      if (this.checkedProductFilter.indexOf(code) == -1) {
        this.checkedProductFilter.push(code);
        this.sumSelectData += reward && reward !== "" ? parseFloat(rs) : 0;
      } else {
        this.checkedProductFilter.splice(
          this.checkedProductFilter.indexOf(code),
          1
        );
        this.sumSelectData -= reward && reward !== "" ? parseFloat(rs) : 0;
      }
      */
    },
    sortDataTable() {
      for (let i = 0; i < this.tbListItems.length; i++) {
        let parts = this.tbListItems[i].reward.toString();
        let rs = parts.replace(/,/g, "");
        this.tbListItems[i].reward =
          this.tbListItems[i].reward && this.tbListItems[i].reward !== ""
            ? parseFloat(rs)
            : 0;
      }

      if (this.sortDESC) {
        this.sortDESC = false;
        this.tbListItems.sort((a, b) =>
          parseFloat(a.reward) > parseFloat(b.reward) ? 1 : -1
        );
      } else {
        this.sortDESC = true;
        this.tbListItems.sort((a, b) =>
          parseFloat(a.reward) < parseFloat(b.reward) ? 1 : -1
        );
      }

      for (let i = 0; i < this.tbListItems.length; i++) {
        this.tbListItems[i].reward = this.formatNumber(
          this.tbListItems[i].reward,
          0
        );
      }
    },
    calulateFooter() {
      this.sumRewards = 0;
      this.sumNewItem = 0;
      this.sumHighGrowth = 0;
      this.sumRisingStar = 0;
      this.sumCashCow = 0;
      this.sumDog = 0;
      this.sumTotal = 0;
      this.sumMaxRewards = this.title.max_reward;
      let parts, rs;
      for (let i = 0; i < this.tbListItems.length; i++) {
        parts = this.tbListItems[i].reward.toString();
        rs = parts.replace(/,/g, "");
        this.sumRewards +=
          this.tbListItems[i].reward && this.tbListItems[i].reward !== ""
            ? parseFloat(rs)
            : 0;
        // this.sumRewards +=
        //   this.tbListItems[i].reward && this.tbListItems[i].reward !== ""
        //     ? parseFloat(this.tbListItems[i].reward)
        //     : 0;

        this.sumNewItem +=
          this.tbListItems[i].new_item && this.tbListItems[i].new_item !== ""
            ? parseFloat(this.tbListItems[i].new_item)
            : 0;
        this.sumHighGrowth +=
          this.tbListItems[i].high_growth &&
          this.tbListItems[i].high_growth !== ""
            ? parseFloat(this.tbListItems[i].high_growth)
            : 0;
        this.sumRisingStar +=
          this.tbListItems[i].rising_star &&
          this.tbListItems[i].rising_star !== ""
            ? parseFloat(this.tbListItems[i].rising_star)
            : 0;
        this.sumCashCow +=
          this.tbListItems[i].cash_cow && this.tbListItems[i].cash_cow !== ""
            ? parseFloat(this.tbListItems[i].cash_cow)
            : 0;
        this.sumDog +=
          this.tbListItems[i].dog && this.tbListItems[i].dog !== ""
            ? parseFloat(this.tbListItems[i].dog)
            : 0;
        this.sumTotal +=
          this.tbListItems[i].total && this.tbListItems[i].total !== ""
            ? parseFloat(this.tbListItems[i].total)
            : 0;

        
      }
      this.sumMaxRewards -= this.sumRewards;
    },
    formatStringToFloat(index, dicimal) {
      let parts = this.tbListItems[index].reward.toString().split(".");
      let num = parts[0].replace(/,/g, "");
      let rs = num;
      // if (parts[1] !== undefined) {
      //   let digit = parts[1].slice(0, 3);
      //   digit = digit.length < 2 ? digit + "0" : digit;
      //   rs = num + "." + digit;
      // }

      if (!_.isNaN(parseFloat(rs))) {
        this.tbListItems[index].reward = parseFloat(rs);
      }
    },
    formatStringToFloatEdit(index, dicimal) {
      let parts = this.valueUpdateRewards.toString().split(".");
      let num = parts[0].replace(/,/g, "");
      let rs = num;
      if (!_.isNaN(parseFloat(rs))) {
        this.valueUpdateRewards = parseFloat(rs);
      }
    },
    updateRewards() {
      this.valueUpdateRewards = this.formatNumber(this.valueUpdateRewards, 0);
    },
    calulateReward(code) {
      this.sumRewards = 0;
      this.sumSelectData = 0;
      this.sumMaxRewards = this.title.max_reward;
      for (let i = 0; i < this.tbListItems.length; i++) {
        let parts = this.tbListItems[i].reward.toString().split(".");
        let num = parts[0].replace(/,/g, "");
        let dicimal = 0;
        let rs = num;

        this.sumRewards +=
          this.tbListItems[i].reward && this.tbListItems[i].reward !== ""
            ? // ? parseFloat(this.tbListItems[i].reward)
              parseFloat(rs)
            : 0;

        if (this.checkedProductFilter.indexOf(this.tbListItems[i].code) > -1) {
          this.sumSelectData +=
            this.tbListItems[i].reward && this.tbListItems[i].reward !== ""
              ? // ? parseFloat(this.tbListItems[i].reward)
                parseFloat(rs)
              : 0;
        }

        //Format
        // if (parts.length > 1) {
        //   let digit = parts[1].slice(0, 3);
        //   digit = digit.length < 2 ? digit + "0" : digit;
        //   rs = num + "." + digit;

        //   if (parseFloat(digit) === 0) {
        //     dicimal = 0;
        //   } else {
        //     dicimal = 2;
        //   }
        // }

        this.tbListItems[i].reward = this.formatNumber(parseFloat(rs), dicimal);
      }
      this.sumMaxRewards -= this.sumRewards;
    },
    searchProductItem(txtSearch, type) {
      if(type == 'key'){
        //NEW OPL
        if(txtSearch == ""){ // if txtSearch have data not clear
          this.checkedProductFilter_current = [];
        }
        

        this.dataSearchProduct = [];
        this.showDisplaySearch = true;
        this.loadingSearch = true;
        incentiveService
        .getDataSearchProduct(txtSearch, type)
        .then(response => {
          this.dataSearchProduct = response;

          this.checkedProductSearchAll = [];
          for (let i = 0; i < response.length; i++) {
            if (this.tbListItems.length === 0) {
              this.checkedProductSearch[response[i].code] = [];
            } else {
              for (let j = 0; j < response[i].items.length; j++) {
                let key = this.tbListItems.findIndex(item => {
                  return response[i].items[j] === item.code;
                });

                if (key > -1) {
                  this.checkedProductSearch[response[i].code].push(
                    response[i].items[j].code
                  );
                }
              }

              let checkItemsAll = response[i].items.length;
              if (
                this.checkedProductSearch[response[i].code] !== undefined &&
                this.checkedProductSearch[response[i].code].length ===
                  checkItemsAll
              ) {
                this.checkedProductSearchAll.push(response[i].code);
              }
            }
          }

          this.loadingSearch = false;
        });
      }else if(type == 'copy'){
        // if(txtSearch == ""){ // if txtSearch have data not clear
        //   this.checkedProductFilter_current = [];
        // }
        let txtSearch_arr = txtSearch.split(" ");
        let res_code = []
        incentiveService
        .getSearchProducts(txtSearch,type)
        .then(response => {

          for (let i = 0; i < response.length; i++) {
            res_code.push(response[i].code)
            var rs = _.find(this.tbListItems, function(o) {
              return o.code == response[i].code;
            });
            if (_.isUndefined(rs)) {
              this.tbListItems.push(response[i])
            }

            let checkDat = this.checkedProductFilter_current.findIndex(item => {
            return response[i].code === item;
            });
            if (checkDat === -1) {
              this.checkedProductFilter_current.push(
                response[i].code
              );
            }

            if (
              this.checkedProductSearchAll.indexOf(response[i].group_code) == -1
            ) {
              this.checkedProductSearchAll.push(response[i].group_code);
            }

            if (this.checkedProductSearch[response[i].group_code] === undefined) {
              this.checkedProductSearch[response[i].group_code] = [];
            }
            this.checkedProductSearch[response[i].group_code].push(
              response[i].code
            );

            response[i].reward = this.formatNumber(response[i].reward, 0);
          }
         
          this.loadingPage = false;

          this.calulateFooter();
          if (
            this.title.condition_code === 2 ||
            (this.title.condition_code === "2" &&
            this.searchTxtProductCopy != "" &&
              this.checkedProductFilter_current.length > 0)
          ) {
            this.$refs["dialog-update-rewards"].open();
            this.valueUpdateRewards = "";
          }

          if(res_code.length != txtSearch_arr.length){
            var str_code = ''

            for(var i=0;i<txtSearch_arr.length;i++){
              let check = res_code.includes(txtSearch_arr[i])
              if(!check){
                if(str_code == ''){
                  str_code = txtSearch_arr[i]
                }else{
                  str_code = str_code+' '+txtSearch_arr[i]
                }
              }
            }
            this.snkValue = str_code
            this.$refs.snackbar_input.open();
          }
          

          
        });
      }
      
    },
    selectAllProductSearch(productCode) {
      let key = "";
      for (let itemCode in this.dataSearchProduct) {
        key = this.dataSearchProduct.findIndex(item => {
          return productCode === item.code;
        });
      }

      if (this.checkedProductSearchAll.indexOf(productCode) == -1) {
        //-- กรณีเลือก checkbox --//
        this.checkedProductSearchAll.push(productCode);

        let pushChild = [];
        for (let i = 0; i < this.dataSearchProduct[key].items.length; i++) {
          pushChild.push(this.dataSearchProduct[key].items[i].code);
          /* START PUSH DATA IN TABLE */
          let checkDataTable = this.tbListItems.findIndex(item => {
            return this.dataSearchProduct[key].items[i].code === item.code;
          });
          if (checkDataTable === -1) {
            this.tbListItems.push(this.dataSearchProduct[key].items[i]);
          }

          //NEW OPL
          let checkDat = this.checkedProductFilter_current.findIndex(item => {
            return this.dataSearchProduct[key].items[i].code === item;
          });
          if (checkDat === -1) {
            this.checkedProductFilter_current.push(
              this.dataSearchProduct[key].items[i].code
            );
          }
          /* END PUSH DATA IN TABLE */
        }
        this.checkedProductSearch[this.dataSearchProduct[key].code] = pushChild;
      } else {
        //-- กรณีเอา checkbox ออก --//
        this.checkedProductSearchAll.splice(
          this.checkedProductSearchAll.indexOf(productCode),
          1
        );
        delete this.checkedProductSearch[productCode];

        /* START DELETE DATA IN TABLE */
        for (let i = 0; i < this.dataSearchProduct[key].items.length; i++) {
          let indexDelete = this.tbListItems.findIndex(item => {
            return this.dataSearchProduct[key].items[i].code === item.code;
          });

          this.tbListItems.splice(indexDelete, 1);
        }
        /* END DELETE DATA IN TABLE */
      }
      this.calulateFooter();
    },
    selectProductSearch(productCode, itemCode) {
      let key = this.dataSearchProduct.findIndex(item => {
        return productCode === item.code;
      });
      if (
        this.checkedProductSearch[productCode] === undefined ||
        this.checkedProductSearch[productCode].indexOf(itemCode) == -1
      ) {
        //-- กรณีเลือก checkbox --//
        if (this.checkedProductSearch[productCode] === undefined) {
          /* check ลูกตัวแรก ให้แอดแม่เข้า array ด้วย */
          let pushChild = [];
          pushChild.push(itemCode);
          this.checkedProductSearch[
            this.dataSearchProduct[key].code
          ] = pushChild;

          this.checkedProductFilter_current.push(itemCode); 
        } else {
          this.checkedProductSearch[productCode].push(itemCode);
          //NEW OPL
          this.checkedProductFilter_current.push(itemCode);
        }

        /* START PUSH DATA IN TABLE */
        let index = this.tbListItems.findIndex(item => {
          return itemCode === item.code;
        });
        if (index === -1) {
          //NOT HAVE
          let indexItem = this.dataSearchProduct[key].items.findIndex(item => {
            return itemCode === item.code;
          });
          this.tbListItems.push(this.dataSearchProduct[key].items[indexItem]);
        }
        /* END PUSH DATA IN TABLE */
      } else {
        //-- กรณีเอา checkbox ออก --//
        this.checkedProductSearch[productCode].splice(
          this.checkedProductSearch[productCode].indexOf(itemCode),
          1
        );

        /* START DELETE DATA IN TABLE */
        for (let i = 0; i < this.dataSearchProduct[key].items.length; i++) {
          if (this.dataSearchProduct[key].items[i].code === itemCode) {
            let indexDelete = this.tbListItems.findIndex(item => {
              return this.dataSearchProduct[key].items[i].code === item.code;
            });
            this.tbListItems.splice(indexDelete, 1);
          }
        }
        /* END DELETE DATA IN TABLE */
      }

      //-- Auto CheckBox Mom --//
      if (
        this.checkedProductSearch[productCode].length ===
        this.dataSearchProduct[key].items.length
      ) {
        //-- Check ลูกทีละตัวจนครบ ให้ checkbox แม่ auto --//
        this.checkedProductSearchAll.push(productCode);
      } else {
        //-- Check เอาลูกออก 1 ตัว ให้เอา checkbox แม่ออก auto --//
        if (this.checkedProductSearchAll.indexOf(productCode) > -1) {
          this.checkedProductSearchAll.splice(
            this.checkedProductSearchAll.indexOf(productCode),
            1
          );
        }
      }
      this.calulateFooter();
    },
    closeDivSearch() {
      if (
        this.title.condition_code === 2 ||
        (this.title.condition_code === "2" &&
          this.showDisplaySearch &&
          this.checkedProductFilter_current.length > 0)
      ) {
        this.$refs["dialog-update-rewards"].open();
        this.valueUpdateRewards = "";
      }
      this.showDisplaySearch = false;
      this.dataSearchProduct = {};
      this.searchTxtProduct = "";
      
    },
    clearSearchTxtProductCopy() {
      this.searchTxtProductCopy = "";
      this.checkedProductFilter_current = [];
    },
    openDialogUpdateRewards() {
      if (this.checkedProductFilter_current.length > 0) {
        this.valueUpdateRewards = "";
        this.$refs["dialog-update-rewards"].open();
      } else {
        this.$refs.snackbar.open();
      }
    },
    updateRewardsMany() {
      for (let i = 0; i < this.checkedProductFilter_current.length; i++) {
        let key = this.tbListItems.findIndex(item => {
          return this.checkedProductFilter_current[i] === item.code;
        });

        this.tbListItems[key].reward = this.valueUpdateRewards;
      }

      var mystring = this.valueUpdateRewards;
      let sum_select_reward =
        this.checkedProductFilter_current.length *
        parseFloat(mystring.replace(/,/g, ""));
      this.sumSelectData = sum_select_reward;

      this.calulateFooter();
      this.$refs["dialog-update-rewards"].close();
    },
    deleteItems() {
      for (let i = 0; i < this.checkedProductFilter_current.length; i++) {
        let index = this.tbListItems.findIndex(item => {
          return this.checkedProductFilter_current[i] === item.code;
        });
        if (index >= 0) {
          this.checkedProductSearch[this.tbListItems[index].group_code].splice(
            this.checkedProductSearch[
              this.tbListItems[index].group_code
            ].indexOf(this.checkedProductFilter_current[i]),
            1
          );

          let indexMom = this.checkedProductSearchAll.indexOf(
            this.tbListItems[index].group_code
          );
          if (indexMom > -1) {
            this.checkedProductSearchAll.splice(indexMom, 1);
          }

          this.tbListItems.splice(index, 1);
          this.calulateFooter();
        }
      }
      this.checkedProductFilter_current = [];
      this.sumSelectData = 0;
      this.checkedProductFilterAll = false;
      /*
        for (let i = 0; i < this.checkedProductFilter.length; i++) {
        let index = this.tbListItems.findIndex(item => {
          return this.checkedProductFilter[i] === item.code;
        });

        this.checkedProductSearch[this.tbListItems[index].group_code].splice(
          this.checkedProductSearch[this.tbListItems[index].group_code].indexOf(
            this.checkedProductFilter[i]
          ),
          1
        );

        let indexMom = this.checkedProductSearchAll.indexOf(
          this.tbListItems[index].group_code
        );
        if (indexMom > -1) {
          this.checkedProductSearchAll.splice(indexMom, 1);
        }

        let key = this.tbListItems.findIndex(item => {
          return this.checkedProductFilter[i] === item.code;
        });

        this.tbListItems.splice(key, 1);
        this.calulateFooter();
      }
      this.checkedProductFilterAll = false;
      this.checkedProductFilter = [];
      this.sumSelectData = 0;
    },
      */
    },
    saveDataDialog() {
      if (this.title.record.tac_type == 2) {
        for (let i = 0; i < this.tbListItems.length; i++) {
          let parts = this.tbListItems[i].reward.toString();
          let rs = parts.replace(/,/g, "");
          this.tbListItems[i].reward =
            this.tbListItems[i].reward && this.tbListItems[i].reward !== ""
              ? parseFloat(rs)
              : 0;
        }
        let sum2 = this.tbListItems.reduce(
          (acc, row) => acc + parseFloat(row.reward),
          0
        );
        if (this.title.record.max_reward < sum2) {
          this.checkClickButton = "";
          this.dialogConfirmContent =
            "เงินรางวัลรายหมวดสินค้า เกินกว่า เพดานเงินรางวัล";
          this.btnright = "OK";
        } else {
          this.btnright = "save";
          this.checkClickButton = "save";
          this.dialogConfirmContent = "Are you sure you want to save ?";
        }
      } else {
        this.btnright = "save";
        this.checkClickButton = "save";
        this.dialogConfirmContent = "Are you sure you want to save ?";
      }
      this.showDialogConfirm = true;
    },
    reloadData() {
      this.btnright = "YES";
      this.checkClickButton = "reload";
      this.dialogConfirmContent = "Are you sure you want to reload data ?";
      this.showDialogConfirm = true;
    },

    loadDataList() {
      this.loadingPage = true;
      this.checkedProductSearchAll = [];
      this.checkedProductSearch = [];
      this.checkedProductFilterAll = false;
      this.checkedProductFilter = [];
      this.sumSelectData = 0;
      this.checkedProductFilter_current = [];

      let obj = {
        year: this.title.year,
        cycle: this.title.cycle,
        tactics_id: this.title.tactics_id,
        condition_code: this.title.condition_code
      };

      incentiveService.getListDataTable(obj).then(response => {
        this.tbListItems = response;

        for (let i = 0; i < response.length; i++) {
          if (
            this.checkedProductSearchAll.indexOf(response[i].group_code) == -1
          ) {
            this.checkedProductSearchAll.push(response[i].group_code);
          }

          if (this.checkedProductSearch[response[i].group_code] === undefined) {
            this.checkedProductSearch[response[i].group_code] = [];
          }
          this.checkedProductSearch[response[i].group_code].push(
            response[i].code
          );

          response[i].reward = this.formatNumber(response[i].reward, 0);
        }

        this.loadingPage = false;
        this.calulateFooter();
      });
    },
    onCloseDialog() {
      this.showDialogConfirm = false;
    },
    onConfirmDialog() {
      this.showDialogConfirm = false;

      if (this.checkClickButton === "close") {
        this.$refs["dialog-step-two"].close();
        this.clearVariable();
        this.$emit("close");
      } else if (this.checkClickButton === "save") {
        this.loadingPage = true;

        for (let i = 0; i < this.tbListItems.length; i++) {
          let parts = this.tbListItems[i].reward.toString();
          let rs = parts.replace(/,/g, "");
          this.tbListItems[i].reward =
            this.tbListItems[i].reward && this.tbListItems[i].reward !== ""
              ? parseFloat(rs)
              : 0;
        }

        let obj = {
          year: this.title.year,
          cycle: this.title.cycle,
          tactics_id: this.title.tactics_id,
          condition_code: this.title.condition_code,
          data_table: this.tbListItems
        };
        incentiveService
          .saveDataDialogStepTwo(obj)
          .then(response => {
            let data = _.cloneDeep(this.step2);
            var rsKey = _.findIndex(data.detail, function(o) {
              return o.tactics_id == response.tactics_id;
            });
            if (rsKey >= 0) {
              data.detail[rsKey].item_cg = response.item_cg;
              if (!_.isUndefined(data.detail[rsKey].tempCg)) {
                data.detail[rsKey].tempCg = [];
                data.detail[rsKey].tempCg.push({
                  key: obj.condition_code,
                  datas: response.item_cg
                });
              }
              this.$store.commit("incentive/setDataStep2", data);
            }
            this.$refs["dialog-step-two"].close();
            this.clearVariable();
            this.loadingPage = false;
            this.$emit("close");
          })
          .catch();
      } else if (this.checkClickButton === "reload") {
        this.loadDataList();
      }
    },
    clearVariable() {
      this.dataSearchProduct = {};
      this.searchTxtProduct = "";
      this.searchTxtProductCopy = "";
      this.type_search = false;
      this.showDisplaySearch = false;
      this.loadingSearch = false;
      this.tbListItems = [];
      this.checkedProductSearchAll = [];
      this.checkedProductFilter_current = [];
      this.checkedProductSearch = [];
      this.checkedProductFilterAll = false;
      this.checkedProductFilter = [];
      this.sortDESC = true;
      this.sumRewards = 0;
      this.sumNewItem = 0;
      this.sumHighGrowth = 0;
      this.sumRisingStar = 0;
      this.sumCashCow = 0;
      this.sumDog = 0;
      this.sumTotal = 0;
      this.sumSelectData = 0;
      this.valueUpdateRewards = "";
    },
    checkColor(value) {
      if(value >= 0){
         return '#66BB6A';
      }else{
        return '#F44336';
      }
      
    },
    changeTypeSearch() {
      // console.log(this.type_search)
    }
  },
  computed: {
    step2() {
      return this.$store.getters["incentive/step2"];
    }
  }
};
</script>

<style lang="scss">
.incentive-dialog-step-two {
  .md-dialog.md-reference {
    margin-left: 0% !important;
    height: 100%;
    max-height: 100%;
    width: 90%;
    max-width: 90%;
  }

  .md-dialog-title {
    margin-bottom: 0px !important;

    .md-chip {
      background-color: rgb(168, 168, 168);
      color: white;
      border-radius: 5px;
      height: 20px;
      width: 20px;
      padding: 2px 0px 0px;
      text-align: center;
      font-size: 14px;
    }
    .icon-save:hover {
      color: #ff9800;
    }
  }

  .md-dialog-content {
    padding-bottom: 0px;

    .font-kanit {
      font-family: Kanit !important;
    }

    .icon-delete:hover {
      color: #ff9800;
    }

    .search-product-treeview {
      .md-card-content {
        padding: 0px;
        height: calc(85vmin - 190px);
        display: block;
        overflow-y: scroll;

        .row-bg-gray:hover {
          background: #efefef;
        }

        &::-webkit-scrollbar {
          height: 7px;
          width: 6px;
          background: #efefef;
        }
        &::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.11);
          border-radius: 5px;
        }
      }
    }
  }

  .md-dialog-actions {
    background: rgb(239, 239, 239);
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
    content: "";
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

  #table-product-filter {
    margin-left: 18px;
    font-family: Lato;

    .row-bg-gray:hover {
      border-radius: 4px;
      background: rgba(236, 236, 235, 1);
    }

    #divHeadList {
      width: 99.4%;
      display: -webkit-inline-box;
      font-size: 12px;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 15px;
      color: #a8a8a8;

      div {
        // border: 1px solid pink;
        padding-left: 8px;
        padding-right: 5px;

        &.-text-right {
          text-align: right;
        }

        &.-text-center {
          text-align: center;
        }
      }
    }

    #divBodyList {
      width: 100%;
      // height: calc(100vmin - 355px);
      display: block;
      overflow-y: scroll;
      font-size: 12px;

      > div {
        width: 100%;
        height: 35px;
        display: -webkit-inline-box;
        padding-top: 5px;
        padding-bottom: 5px;

        div {
          // border: 1px solid pink;
          padding-left: 8px;
          padding-right: 8px;

          &.-text-right {
            text-align: right;
          }

          &.-text-center {
            text-align: center;
          }

          &.nowrap-title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          &.-font-kanit {
            font-size: 14px;
            font-family: kanit;
          }

          .md-input-container {
            margin: 0px;
            padding-top: 0px;
            height: 20px;
            min-height: 20px;

            input {
              height: 21px;
              min-height: 21px;
              font-size: 12px;
              padding-bottom: 2px;
            }
          }
        }
      }

      &::-webkit-scrollbar {
        height: 7px;
        width: 6px;
        // background: #f7f7f7;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.11);
        border-radius: 5px;
      }
    }

    .footer-table {
      // border: 1px solid pink;
      display: -webkit-inline-box;
      // margin-top: 8px;
      margin-top: 12px;
      margin-bottom: 5px;
      width: 99.4%;
      font-size: 12px;

      background-color: #efefef;
      padding: 15px 0px;

      div {
        padding-left: 8px;
        padding-right: 8px;

        // &.has-bg {
        //   background-color: #efefef;
        //   padding: 18px 8px;
        // }
      }
    }
  }
}

.incentive-update-rewards,
.incentive-dialog-confirm {
  .md-dialog.md-reference {
    margin-left: 0% !important;
  }

  .md-dialog-content {
    padding: 40px 35px 20px 40px;

    .salesops-input {
      height: 45px !important;

      input {
        padding-top: 10px;
        font-size: 22px;
      }

      ::placeholder {
        font-size: 20px !important;
      }
    }
  }

  .md-dialog-actions {
    padding-right: 20px;
    padding-bottom: 15px;
  }
}

.incentive-dialog-step-two,
.incentive-update-rewards {
  .salesops-input {
    width: 100%;
    padding-left: 8px;
    padding-right: 13.8px;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;

    input {
      width: 100%;
      border: none;
    }

    input:focus {
      outline: none;
    }

    ::placeholder {
      color: #bdbdbd;
      opacity: 1;
      font-family: kanit;
      font-size: 12px;
      font-weight: 100;
    }
  }
}

.incentive-step-two-snackbar {
  .md-button:last-child {
    color: red;
  }
}

@media screen and (min-width: 959px) {
  .content-respon {
    // margin: 15px 15px 0px;
    margin: 15px 0px 0px;

    .search-product-treeview {
      width: 45.7%;
    }

    #table-product-filter {
      #divBodyList {
        height: calc(100vmin - 300px);
      }
    }

    .respon-column-name-0 {
      width: 35%;
    }

    .respon-column-name-1 {
      width: 23%;
    }

    .footer-table {
      .respon-column-name-0 {
        width: 39%;
      }

      .respon-column-name-1 {
        width: 27%;
      }

      .padding-respon {
        padding-left: 45px !important;
      }
    }

    .respon-column-rewards {
      width: 12%;
    }
    .respon-column-highgrowth {
      width: 15%;
    }
  }
}

@media screen and (min-width: 1279px) {
  .content-respon {
    // margin: 15px 40px 0px;
    margin: 15px 0px 0px;

    .search-product-treeview {
      width: 46.5%;
    }

    #table-product-filter {
      #divBodyList {
        height: calc(100vmin - 345px);
      }
    }

    .respon-column-name-0 {
      width: 38%;
    }

    .respon-column-name-1 {
      width: 28%;
    }

    .footer-table {
      .respon-column-name-0 {
        width: 42%;
      }

      .respon-column-name-1 {
        width: 32%;
      }

      .padding-respon {
        padding-left: 53px !important;
      }
    }

    .respon-column-rewards {
      width: 10%;
    }
    .respon-column-highgrowth {
      width: 12%;
    }
  }
}

@media screen and (min-width: 1920px) {
  .content-respon {
    // margin: 15px 40px 0px;
    margin: 15px 0px 0px;

    .search-product-treeview {
      width: 47.7%;
    }

    #table-product-filter {
      #divBodyList {
        height: calc(100vmin - 355px);
      }
    }

    .respon-column-name-0 {
      width: 41%;
    }

    .respon-column-name-1 {
      width: 31%;
    }

    .footer-table {
      .respon-column-name-0 {
        width: 45%;
      }

      .respon-column-name-1 {
        width: 35%;
      }

      .padding-respon {
        padding-left: 70px !important;
      }
    }

    .respon-column-rewards {
      width: 10%;
    }
    .respon-column-highgrowth {
      width: 9%;
    }
  }
}
</style>