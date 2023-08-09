<template>
  <div id="pageBackOrderManagement">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true">
      <md-layout md-align="center" class="pt-20">
        <!--BOX 3-->
        <md-layout md-flex="100" md-align="center">
          <!-- <md-spinner :md-size="150" :md-stroke="1" v-show="spinner" md-indeterminate></md-spinner> -->
          <div style="position: absolute;z-index: 101;margin-top:25%">
            <md-spinner
              :md-size="150"
              :md-stroke="1"
              v-show="spinner"
              md-indeterminate
            ></md-spinner>
          </div>
          <div
            v-show="spinner"
            style="position: absolute;z-index: 100;width: 100%;
                  height: 100%;background: #EFEFEF;
                  opacity: 0.1;"
          ></div>
          <md-card
            class="sales-area-table"
            style="width:94%;padding-bottom:20px;padding-right:30px"
          >
            <md-layout md-flex="100" style="flex:unset;padding-right:0px">
              <md-layout
                md-flex="30"
                style="padding-left:10px;color:#414141;font-family:lato;font-size:18px;opacity: 0.54;"
                >MY BACK ORDERS</md-layout
              >
              <md-layout md-flex="70" md-align="end">
                <div
                  style="width: 20%;height:35px;padding:0px 0px 0px 10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);"
                >
                  <md-input-container
                    class="md-sel"
                    style="margin:0px;padding-top:0px;min-height:100%"
                  >
                    <md-select @click.native="GoogleAnalytics('my_back_select_order')"  v-model="dpSource" @selected="selSource">
                      <md-option
                        style="width:160px"
                        :value="row.code"
                        v-for="(row, index) in orderSourceList"
                        :key="'orderSourceList-hix' + index"
                        >{{ row.title }}</md-option
                      >
                    </md-select>
                  </md-input-container>
                </div>
                <div style="padding-left:15px;width:40%">
                  <!-- v-model="keyword" -->
                  <md-search-box-back
                    :placeholder="'Search'"
                    :data="[]"
                    @clear="keywordCLR"
                    :value="keyword"
                    @filter="keywordFil"
                  ></md-search-box-back>
                </div>
                <div style="width:10%;">
                  <md-button
                    :style="{
                      color: BKkeepSelected.length > 0 ? '#fd7f00' : '#898989'
                    }"
                    :disabled="BKkeepSelected.length == 0 ? true : false"
                    @click="btnProcess('decline-main')"
                    class="md-icon-button"
                    style="margin:0px;"
                    id="my_back_click_delete_icon"
                  >
                    <md-icon id="my_back_click_delete_icon">delete_sweep</md-icon>
                  </md-button>
                </div>
                <div style="width:30%">
                  <md-button
                    style="height:36px;margin:unset;border-radius:3px;font-size:12px;width:100%"
                    :class="'-orange'"
                    @click="choose('manage', null, null)"
                    >Manage Back Order</md-button
                  >
                </div>
              </md-layout>
            </md-layout>
            <div
              class="detail-blog"
              @scroll="handleScroll"
              :style="{
                height: 'calc(100vh - 200px)',
                'padding-left': '0px',
                'margin-top': '20px'
              }"
            >
              <div
                style="color:#414141;font-size:18px;font-family:lato;width:100%;display: -webkit-box;"
              >
                <div style="width:60%">
                  <b>Back Order K1 ({{ formatNumberInt(k1List.length) }})</b>
                </div>
                <div style="width:40%;text-align:right;padding-right:50px">
                  <span style="font-weight:400">Total</span>
                  <span style="margin-left:25px;font-weight:400"
                    >฿ {{ formatNumber(totalK1) }}</span
                  >
                </div>
              </div>
              <div :class="'head-table'" style="color: rgba(0, 0, 0, 0.54);">
                <div class="text-left" style="width: 5%;">
                  <input
                    type="checkbox"
                    v-model="k1CHK"
                    style="height: 20px;width: 20px;"
                    @change="checkedAll('K1')"
                    id="my_back_select_all_order"
                  />
                </div>
                <div style="width:12%;text-align:left">PO No.</div>
                <div style="width:12%;text-align:left">Order No.</div>
                <div style="width:10%;text-align:left">Invoice No.</div>
                <div style="width:12%;text-align:center">Create Date</div>
                <div class="text-left" style="width: 31%;padding-left:10px">
                  Customer
                </div>
                <div style="width:14%;text-align:right;padding-right:5px">
                  Order Value
                </div>
                <div style="width:4%;"></div>
              </div>
              <div
                v-if="k1List.length == 0"
                style="margin-top:20px;font-size:15px;color: #a8a8a8;text-align:center"
              >
                No data...
              </div>
              <div
                v-for="(items, index) in k1List"
                :key="'K1' + items.po_no + '_' + index"
                class="content-table"
                style="width:100%;font-family:roboto;padding-top:7px;height:35px"
              >
                <!-- @click="openDatail(items)" -->
                <div class="number" style="width: 5%">
                  <input
                    :disabled="disabledChk('sm_code', items)"
                    :style="{
                      opacity: disabledChk('sm_code', items) ? '0.6' : 'unset',
                      height: '20px',
                      width: '20px'
                    }"
                    type="checkbox"
                    v-model="items.checked"
                    @change="countCHK('K1', index)"
                      id="my_back_select_back_order"
                  />
                </div>
                <div class="number" style="width: 12%;">{{ items.po_no }}</div>
                <div class="number" style="width: 12%;">
                  {{ items.order_no }}
                </div>
                <div class="number" style="width: 10%;">{{ items.inv_no }}</div>
                <div class="number" style="width: 12%;text-align:center">
                  {{ formatDate(items.create_date) }}
                </div>
                <div
                  class="descript"
                  style="width: 31%;font-family:kanit;white-space: nowrap;text-overflow: ellipsis;padding-right:5px;padding-left:10px"
                >
                  {{ items.customer_code }}&nbsp;{{ items.customer_name }}
                  <md-tooltip md-direction="top">
                    <span style="font-family:kanit"
                      >{{ items.customer_code }}&nbsp;{{
                        items.customer_name
                      }}</span
                    >
                  </md-tooltip>
                </div>
                <div
                  class="number"
                  style="width: 14%;text-align:right;padding-right:10px;"
                >
                  <span style="margin-right:5px">฿</span>
                  {{ formatNumber(items.order_value) }}
                </div>
                <div
                  class="number view-more"
                  style="width: 4%;text-align:right;padding-right:10px;"
                >
                  <md-menu md-direction="bottom left" md-size="4">
                    <md-button
                      class="md-icon-button"
                      md-menu-trigger
                      style="margin:0px;x"
                    >
                      <md-icon style="margin:0px;opacity:0.5"
                        >more_vert</md-icon
                      >
                    </md-button>
                    <md-menu-content>
                      <md-menu-item @selected="choose('view', items, 'K1')">
                        <span @click="Test()">View Back Order</span>
                      </md-menu-item>
                      <md-menu-item
                        @selected="choose('accept', items, 'K1')"
                        v-if="!disabledChk('sm_code', items)"
                      >
                        <span>Accept Back Order</span>
                      </md-menu-item>
                      <md-menu-item
                        @selected="choose('decline', items, 'K1')"
                        v-if="!disabledChk('sm_code', items)"
                      >
                        <span>Delete Back Order</span>
                      </md-menu-item>
                    </md-menu-content>
                  </md-menu>
                </div>
              </div>
              <!------------------------------------------------------------->
              <div
                style="color:#414141;font-size:18px;font-family:lato;width:100%;margin-top:20px;    display: -webkit-box;"
              >
                <div style="width:60%">
                  <b>Back Order KM ({{ formatNumberInt(kmList.length) }})</b>
                </div>
                <div style="width:40%;text-align:right;padding-right:50px">
                  <span style="font-weight:400">Total</span>
                  <span style="margin-left:25px;font-weight:400"
                    >฿ {{ formatNumber(totalKM) }}</span
                  >
                </div>
              </div>
              <div :class="'head-table'" style="color: rgba(0, 0, 0, 0.54);">
                <div class="text-left" style="width: 5%;">
                  <input
                    type="checkbox"
                    v-model="kmCHK"
                    style="height: 20px;width: 20px;"
                    @change="checkedAll('KM')"
                     id="my_back_select_all_order"
                  />
                </div>
                <div style="width:12%;text-align:left">PO No.</div>
                <div style="width:12%;text-align:left">Order No.</div>
                <div style="width:10%;text-align:left">Invoice No.</div>
                <div style="width:12%;text-align:center">Create Date</div>
                <div class="text-left" style="width: 31%;padding-left:10px">
                  Customer
                </div>
                <div style="width:14%;text-align:right;padding-right:5px">
                  Order Value
                </div>
                <div style="width:4%;"></div>
              </div>
              <div
                v-if="kmList.length == 0"
                style="margin-top:20px;font-size:15px;color: #a8a8a8;text-align:center"
              >
                No data...
              </div>
              <div
                v-for="(items, index) in kmList"
                :key="'KM' + items.po_no + '_' + index"
                class="content-table"
                style="width:100%;font-family:roboto;padding-top:7px;height:35px"
              >
                <!-- @click="openDatail(items)" -->
                <div class="number" style="width: 5%">
                  <input
                    :disabled="disabledChk('sm_code', items)"
                    :style="{
                      opacity: disabledChk('sm_code', items) ? '0.6' : 'unset',
                      height: '20px',
                      width: '20px'
                    }"
                    type="checkbox"
                    v-model="items.checked"
                    @change="countCHK('KM', index)"
                      id="my_back_select_back_order"
                  />
                </div>
                <div class="number" style="width: 12%;">{{ items.po_no }}</div>
                <div class="number" style="width: 12%;">
                  {{ items.order_no }}
                </div>
                <div class="number" style="width: 10%;">{{ items.inv_no }}</div>
                <div class="number" style="width: 12%;text-align:center">
                  {{ formatDate(items.create_date) }}
                </div>
                <div
                  class="descript"
                  style="width: 31%;font-family:kanit;white-space: nowrap;text-overflow: ellipsis;padding-right:5px;padding-left:10px"
                >
                  {{ items.customer_code }}&nbsp;{{ items.customer_name }}
                  <md-tooltip md-direction="top">
                    <span style="font-family:kanit"
                      >{{ items.customer_code }}&nbsp;{{
                        items.customer_name
                      }}</span
                    >
                  </md-tooltip>
                </div>
                <div
                  class="number"
                  style="width: 14%;text-align:right;padding-right:10px;"
                >
                  <span style="margin-right:5px">฿</span>
                  {{ formatNumber(items.order_value) }}
                </div>
                <div
                  class="number view-more"
                  style="width: 4%;text-align:right;padding-right:10px;"
                >
               
                  <md-menu md-direction="bottom left" md-size="4">
                    <md-button
                      class="md-icon-button"
                      md-menu-trigger
                      style="margin:0px;"
                    >
                      <md-icon style="margin:0px;opacity:0.5"
                        >more_vert</md-icon
                      >
                    </md-button>
                   
                      <div id="my_back_View_Back_Order"></div>
                    <md-menu-content>
                      <md-menu-item @selected="choose('view', items, 'KM')">
                        <span>View Back Order</span>
                      </md-menu-item>
                      <md-menu-item
                        @selected="choose('accept', items, 'KM')"
                        v-if="!disabledChk('sm_code', items)"
                      >
                        <span>Accept Back Order</span>
                      </md-menu-item>
                      <md-menu-item
                        @selected="choose('decline', items, 'KM')"
                        v-if="!disabledChk('sm_code', items)"
                      >
                        <span>Delete Back Order</span>
                      </md-menu-item>
                    </md-menu-content>
                  </md-menu>
                </div>
              </div>
            </div>
          </md-card>
        </md-layout>
      </md-layout>
    </div>
    <md-dialog
      ref="pageBackOrderDG"
      id="pageBackOrderDG"
      class="md-orders-view"
    >
      <div
        style="position: absolute;z-index: 101;margin-left:40%;margin-top:25%"
      >
        <md-spinner
          :md-size="150"
          :md-stroke="1"
          v-show="spinnerDG"
          md-indeterminate
        ></md-spinner>
      </div>
      <div class="md-dialog-title">
        <md-layout>
          <md-layout md-flex-large="95">
            <label class="sub-title kanitFont">
              {{ topic }}
              <span v-if="btnSubmit != 'manage'">&nbsp;:::&nbsp;</span>
              {{ topic2 }}
            </label>
          </md-layout>
          <md-layout md-flex-large="5" md-align="end">
            <md-icon
              @click.native="closeDG"
              style="cursor:pointer;margin-right:30px"
              >close</md-icon
            >
          </md-layout>
        </md-layout>
      </div>
      <div
        v-if="detail.length == 0 && btnSubmit != 'manage'"
        style="margin-top:15%;font-size:15px;color: #a8a8a8;text-align:center"
      >
        No data...
      </div>
      <div
        class="md-dialog-content"
        v-if="btnSubmit != 'manage'"
        :style="{ padding: btnSubmit != 'manage' ? '0px' : '0 24px 24px;' }"
      >
        <div class="non-manage-scroll" @scroll="scrollPage">
          <div
            v-for="(record, indexs) in detail"
            :key="'tbitems' + indexs"
            style="border-radius: 4px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);padding:20px;margin-top:15px"
          >
            <div style="font-size:16px">
              <b
                >PO.No. {{ record.po_no }}&nbsp;&nbsp;::: &nbsp;&nbsp;Order
                No.&nbsp;&nbsp;{{ record.order_no }}&nbsp;&nbsp; :::
                &nbsp;&nbsp;Created On &nbsp;&nbsp;{{
                  formatDate(record.create_date)
                }}</b
              >
            </div>
            <md-layout
              md-flex="100"
              style="margin-top:25px;padding-left:10px"
              class="md-promotion-table"
            >
              <div
                class="head-table"
                style="width:100%;color: rgba(0, 0, 0, 0.54);font-weight:600"
              >
                <div
                  style="width:10%;text-align: -webkit-center;"
                  class="md-search-checkbox"
                >
                  <input
                    type="checkbox"
                    style="height: 20px;width: 20px;"
                    v-model="record.checked"
                    @change="checkedAllDG('head', indexs, null)"
                  />
                </div>
                <div style="width: 40%">Items</div>
                <div style="text-align:right;width: 15%;">Price</div>
                <div style="text-align:right;width:15%;">Order QTY</div>
                <div style="width:6%;"></div>
                <div style="text-align:right;width:14%;">Total</div>
              </div>
              <div class="detail-scroll-table" style="overflow:hidden">
                <div
                  class="detail-table"
                  style="width:100%"
                  v-for="(row, index) in record.items"
                  :key="'tbitems' + index"
                >
                  <div
                    style="width:10%;text-align: -webkit-center;"
                    class="md-search-checkbox"
                  >
                    <input
                      type="checkbox"
                      v-model="row.checked"
                      :disabled="disabledChk('sm_code', row)"
                      @change="checkedAllDG('detail', indexs, index)"
                      :style="{
                        opacity: disabledChk('sm_code', row) ? '0.6' : 'unset',
                        height: '20px',
                        width: '20px'
                      }"
                    />
                  </div>
                  <div style="padding-top:8px;width: 40%;">
                    <!-- {{row.flag_status}} ==> -->
                    {{ row.item_code }}
                    <label style="font-family:kanit;"
                      >&nbsp;&nbsp;{{ row.item_name }}</label
                    >
                  </div>
                  <div style="padding-top:8px;text-align:right;width: 15%;">
                    ฿ {{ formatNumber(row.price) }}
                  </div>
                  <div style="padding-top:8px;text-align:right;width:15%;">
                    {{ formatNumberInt(row.qty) }}
                  </div>
                  <div
                    style="padding-top:8px;width:6%;padding-left:8px"
                    class="unit"
                  >
                    {{ row.unit }}
                  </div>
                  <div
                    style="padding-top:8px;text-align:right;width:14%;padding-left:20px"
                  >
                    {{ formatNumber(row.total) }}
                  </div>
                </div>
              </div>
            </md-layout>
            <md-layout style="margin-top:8px">
              <div style="width:87%;text-align:right;font-weight:600">
                Total
              </div>
              <div style="width:13%;text-align:right;font-weight:600">
                {{ formatNumber(record.total) }}
              </div>
            </md-layout>
          </div>
        </div>
        <!------------------------------------------------------------->
        <div
          class="md-dialog-total"
          style="padding-bottom:20px"
          v-if="btnSubmit != 'manage'"
        >
          <div
            style="width: 45%;color:#5A5A5A;font-weight:500;font-size:14px;padding-top: 12px;text-align:right"
          >
            BACK ORDER TOTAL
          </div>
          <div
            style="width: 20%;padding-right:5px;padding-top: 12px;font-weight:500;text-align:right"
            class="number"
          >
            ฿ {{ formatNumber(totalOrder) }}
          </div>
          <div
            style="width: 15%;color:#5A5A5A;font-weight:bold;font-size:14px;padding-top: 12px;text-align:right"
          >
            SELECTED TOTAL
          </div>
          <div
            style="width:20%;padding-top: 12px;padding-right:30px"
            class="number"
          >
            ฿ {{ formatNumber(totalSelected) }}
          </div>
        </div>
        <div class="md-dialog-actions" v-if="btnSubmit != 'manage'">
          <md-layout md-flex="100" md-align="end">
            <div id="my_back_view_delete_item" v-if="type == 'decline'">
              <!-- :class="'md-gray'" -->
              <md-button
              id="my_back_view_delete_item"
                @click="btnProcess('decline-popup')"
                :disabled="disabledBtn()"
              >
                <!-- :disabled="totalSelected == 0 ? true : false" -->
                <span :style="{ color: disabledBtn() ? '' : '#5A5A5A' }">
                  <!-- <span :style="{'color':totalSelected == 0 ?'':'#a8a8a8'}"> -->
                  <b id="my_back_view_delete_item">DELETE BACK ORDER</b>
                </span>
              </md-button>
            </div>
            <div  id="my_back_view_delete_item" v-else-if="type == 'view'">
              <!-- :class="'md-gray'" -->
              <md-button
                @click="btnProcess('accept-decline-popup')"
                :disabled="disabledBtn()"
                id="my_back_view_delete_item"
              >
                <!-- :disabled="totalSelected == 0 ? true:false" -->
                <span :style="{ color: disabledBtn() ? '' : '#5A5A5A' }">
                  <b id="my_back_view_delete_item">DELETE BACK ORDER</b>
                </span>
              </md-button>
              <md-button
                :class="'md-primary'"
                @click="btnProcess('create-order')"
                :disabled="disabledBtn()"
                id="my_back_view_create_order"
              >
                <b  id="my_back_view_create_order">CREATE ORDER</b>
              </md-button>
            </div>
            <div   id="my_back_view_create_order" v-else-if="type == 'accept'">
              <md-button
                :disabled="disabledBtn()"
                :class="'md-primary'"
                @click="btnProcess('create-order')"
                 id="my_back_view_create_order"
              >
                <b id="my_back_view_create_order">CREATE ORDER</b>
              </md-button>
            </div>
          </md-layout>
        </div>
      </div>
      <!------------------------------------------------------------->
      <div
        class="md-dialog-content"
        v-else
        style="padding-top:20px;overflow: hidden;padding-right:10px;"
      >
        <div
        :style="{'margin-bottom': this.hotelDate.isOpen == null ? '35px' : ''}"
         style="display: -webkit-box;width:100%;">
          <div
            style="width:25%;color:#414141;font-size:18px;font-family:roboto;padding-left:20px"
          >
            Back Order List (
            {{ formatNumberInt(keepSelected.length) }} Selected )
          </div>

          <div
            style="width:20%;color:#414141;font-size:18px;font-family:roboto;padding-left:20px"
          >
          <div class="selDate" style=";margin-right:10px;">
                      <div  @click="showDateRange">
                          <md-input-container class="-no-line -search mt-0 latoFont" style="margin-bottom:1px !important">
                              <md-input v-model="act_txt_date_selected" class="input-showtime" v-on:change="selectTime" readonly></md-input>
                              <md-icon class="mr-5" style=" cursor: pointer;"> event
                              <md-tooltip>PO. Date</md-tooltip>
                              </md-icon>
                          </md-input-container>
                      </div>
                   
                      <md-card style="min-width: 250px;position:absolute;"  id="showtime" class="showTime hide-tag" v-click-outside="outsideShowTime">
                          <ul class="md-list"> 
                            <div  v-for="(items) in $store.getters.act_time_list" :key="items.id">
                               <li v-if="items.timename == 'Custom'" class="md-list-item slcGroup-c" >
                                  <div v-if="items.timename == 'Custom'" class="slcGroup-c pl-30 -list-block pr-20 latoFont"  @click="showDateRange(items)">
                                      {{items.timename}}
                                  </div>
                              </li>
                            </div>
                             
                          </ul>
                      </md-card>
                    <input v-click-outside="outsideDatePicker" type='hidden' id="startDatePickerID" v-on:change="updateValues" />
                  </div>
          </div>

          <!-- <div
            style="width:40%;color:#414141;font-size:18px;font-family:roboto;padding-left:20px"
          >
            Back Order List (
            {{ formatNumberInt(keepSelected.length) }} Selected )
          </div> -->



          <div
            style="width: 15%;height:35px;padding: 0px 10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);"
          >
            <md-input-container
              class="md-sel"
              style="margin:0px;padding-top:0px;min-height:100%"
            >
              <md-select @click.native="GoogleAnalytics('my_back_manage_select_order')"  v-model="dpSourcePopup" @selected="selSourcePopup">
                <md-option
                  style="width:160px"
                  :value="row.code"
                  v-for="(row, index) in orderSourceList"
                  :key="'orderSourceList-hix' + index"
                  >{{ row.title }}</md-option
                >
              </md-select>
            </md-input-container>
          </div>
          <div style="width:30%;text-align: -webkit-right;padding-right:20px;">
            <md-search-box-pop-back
              :placeholder="'Search'"
              @clear="keywordCLRBo"
              :value="keywordBO"
              @filter="keywordFilBo"
              style="width:100%;padding-left:20px;"
            ></md-search-box-pop-back>
          </div>
          <div style="width:15%">
            <md-button
              
              :style="{
                color: keepSelected.length > 0 ? '#fd7f00' : '#898989'
              }"
              :disabled="keepSelected.length == 0 ? true : false"
              @click="btnProcess('del')"
              class="md-icon-button"
              style="margin:0px"
              id="my_back_manage_click_delete_icon"
            >
              <md-icon  id="my_back_manage_click_delete_icon">delete_sweep</md-icon>
            </md-button>
            <!-- <md-button
              :style="{ color: '#fd7f00' }"
              @click="btnProcess('export')"
              class="md-icon-button"
              style="margin:0px"
            >
              <md-icon>print</md-icon>
            </md-button> -->
            <md-button
            id="my_back_manage_export"
              style="height:36px;margin:0 0 0 8px;border-radius:3px;font-size:12px;min-width: fit-content;"
              :class="'-orange'"
              @click="showMdsCard()"
              >EXPORT</md-button
            >
          </div>
        </div>





        <div
          class="head-table"
          style="margin:0;width:100%;color: rgba(0, 0, 0, 0.54);font-weight:600;display: -webkit-box;"
        >
          <!-- <div style="width: 5%;"></div> -->
          <div class="text-left" style="width: 5%;">
            <input
              type="checkbox"
              v-model="CHKManageAll"
              style="height: 20px;width: 20px;"
              @change="checkedAllManage()"
            />
          </div>
          <div style="width: 3%;">No.</div>
          <div style="width: 10%;">Order No.</div>
          <div style="width: 10%">PO No.</div>
          <div style="width: 8%;text-align:center;">PO. Date</div>
          <div style="width: 8%;text-align:center;">SM</div>
          <div style="width: 21%">Items</div>
          <div style="width: 12%;text-align:right;padding-right:5px">Price</div>
          <div style="width: 8%;text-align:right;">Order QTY</div>
          <div style="width: 5%"></div>
          <div style="width: 10%;text-align:right;padding-right:15px">
            Total
          </div>
        </div>
        <div
          v-if="detail.length == 0"
          style="margin-top:20px;font-size:15px;color: #a8a8a8;text-align:center"
        >
          No data...
        </div>
        <div class="manage-scroll">
          <div
            v-for="(record, indexs) in detail"
            :key="'tbitems' + indexs"
            style="margin-top:15px;"
          >
            <div
              style="width:100%;display: flex;font-size:16px;width:100%;background:#F8F8F8;border-radius: 4px;"
            >
              <div class="text-left" style="width: 5%;">
                <input
                  type="checkbox"
                  v-model="record.checked"
                  style="height: 20px;width: 20px;"
                  @change="checkedCustAll(indexs)"
                />
              </div>
              <div style="font-family:kanit;width:65%">
                <b
                  >{{ record.customer_code }}&nbsp;&nbsp;{{
                    record.customer_name
                  }}&nbsp;&nbsp; Credit Term :&nbsp;&nbsp;
                  {{ record.credit_term }}</b
                >
              </div>
              <div
                style="font-family:roboto;font-size:15px;width:30%;text-align:right"
              >
                <b
                  >Total&nbsp;&nbsp;&nbsp;฿&nbsp;&nbsp;&nbsp;&nbsp;{{
                    formatNumber(record.total)
                  }}</b
                >
              </div>
            </div>
            <md-layout
              md-flex="100"
              style="margin-top:10px;margin-bottom:30px;"
              class="md-promotion-table"
            >
              <div class="detail-scroll-table" style="overflow:hidden">
                <div
                  class="detail-table"
                  style="width:100%"
                  v-for="(row, index) in record.items"
                  :key="'tbitems' + index"
                >
                  <div style="width:5%;">
                    <input
                      type="checkbox"
                      :disabled="disabledChk('sm_code_check', row)"
                      v-model="row.checked"
                      @change="checkedAllDG('manage', indexs, index)"
                      :style="{
                        opacity: disabledChk('sm_code_check', row) ? '0.6' : 'unset',
                        height: '20px',
                        width: '20px'
                      }"
                    />
                  </div>
                  <div style="padding-top:8px;width:3%;">{{ index + 1 }}</div>
                  <div style="padding-top:8px;width: 10%;">
                    {{ row.order_no }}
                  </div>
                  <div style="padding-top:8px;width: 10%;">{{ row.po_no }}</div>
                  <div style="padding-top:8px;text-align:center;width: 8%;">
                    {{ formatDate(row.po_date) }}
                  </div>
                  <div style="padding-top:8px;text-align:center;width: 8%;">
                    {{ row.sm_code }}
                  </div>
                  <div style="padding-top:8px;width: 21%;">
                    {{ row.item_code }}
                    <label style="font-family:kanit;"
                      >&nbsp;&nbsp;{{ row.item_name }}</label
                    >
                  </div>
                  <div style="padding-top:8px;text-align:right;width: 12%;">
                    ฿ {{ formatNumber(row.price) }}
                  </div>
                  <div style="padding-top:8px;text-align:right;width:8%;">
                    {{ formatNumberInt(row.qty) }}
                  </div>
                  <div
                    style="padding-top:8px;width:5%;padding-left:8px"
                    class="unit"
                  >
                    {{ row.unit }}
                  </div>
                  <div
                    style="padding-top:8px;text-align:right;width:10%;padding-left:20px"
                  >
                    {{ formatNumber(row.total) }}
                  </div>
                </div>
              </div>
            </md-layout>
          </div>
        </div>
      </div>
      <div
        @mouseleave="mouseLeave"
        class="mds-card"
        id="mds-card-export-myback"
        :style="{
          top: '130px',
          right: '2%',
          width: '600px',
          visibility: 'hidden'
        }"
      >
        <div class="title">
          <div style="width:95%" class="left">
            {{ 'Export to email' }}
          </div>
          <div style="width:5%;cursor:pointer" @click="closeMdsCard()">
            <md-icon>close</md-icon>
          </div>
        </div>
        <div class="body">
          <div style="padding-left: 8%;padding-right: 9%;">
            <md-input-container>
              <md-textarea v-model="emailInput"></md-textarea>
            </md-input-container>
            <div v-if="incorrectEmail.length > 0" class="email-error">
              email format is incorrect
            </div>
          </div>
        </div>
        <div class="footer" v-show="showCard">
          <md-button
            style="height:36px;margin:0 0 0 15px;border-radius:3px;font-size:12px;"
            @click="closeMdsCard()"
            >CANCEL</md-button
          >
          <md-button
            style="height:36px;margin:0 0 0 15px;border-radius:3px;font-size:12px;"
            @click="exportData('google')"
            >SEND</md-button
          >
        </div>
      </div>
    </md-dialog>

    <md-dialog ref="md-confirm-dialog">
      <md-dialog-title>{{ titleCF }}</md-dialog-title>
      <md-dialog-content>
        <div
          v-if="titleDes.length > 0"
          style="padding-bottom:10px;font-size:16x;font-family:kanit"
        >
          Item เดียวกันแต่ราคาต่างกันสามารถเลือกได้ 1 รายการ
        </div>
        <div
          style="padding-bottom:10px;font-size:14px;font-family:kanit"
          v-for="(row, index) in titleDes"
          :key="index + 'rowDupBK'"
        >
          {{ row.item_code }}&nbsp;{{ row.item_name }}
        </div>
        <br />
      </md-dialog-content>
      <md-dialog-actions>
        <md-button
          :disabled="disBtnBeforeSave"
          @click="closeCF('md-confirm-dialog')"
          v-if="titleDes.length == 0"
          >{{ leftBtn }}</md-button
        >
        <md-button
          :disabled="disBtnBeforeSave"
          class="md-primary"
          @click="saveAndClose"
          >{{ rightBtn }}</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    <!--Select Decline Reason-->
    <md-dialog ref="md-decline-dialog">
      <md-dialog-title>Select Delete Reason</md-dialog-title>
      <md-dialog-content style="width:350px;padding-top:12px">
        <div
          v-for="row in declineReason"
          :key="'reason-' + row.code"
          style="font-size:14px;font-family:lato;color:#727272;display: -webkit-box;margin-bottom:5px;"
        >
          <div style="margin-right:8px;margin-bottom:12px">
            <md-radio
              class="md-warn"
              v-model="reason"
              id="my-test1"
              name="my-test-group1"
              :md-value="row.code"
              style="margin:0px"
              >{{ row.title }}</md-radio
            >
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="closeCF('md-decline-dialog')">CANCEL</md-button>
        <md-button
          :disabled="reason != null ? false : true"
          class="md-primary"
          @click="saveDecline"
          >SAVE</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    <!-- <div v-if="createOrder" class="mds-dialog">
      <add-orders-dialog></add-orders-dialog>
    </div>-->

<!-- GOOGLE ANALYTICS SEND ID -->
     <div id="my_back_manage_select_all_cus"></div>
     <div id="my_back_select_order"></div>
     <div id="my_back_manage_select_order"></div>
     <div id="my_back_manage_select_cus"></div>
     <div id="my_back_view_select_all_item"></div>
     <div id="my_back_manage_select_cus"></div>
     <div id="my_back_View Back Order"></div>
     <div id="my_back_Accept Back Order"></div>
     <div id="my_back_Delete Back Order"></div>
     <div id="my_back_manage_select_item"></div>
     <div id="my_back_view_select_item"></div>


  

<!-- END [ GOOGLE ANALYTICS SEND ID]  -->


  </div>
  
</template>
<script>
import Vue from 'vue'
import bkService from '@/services/orders/mybackorder'
import historyService from '@/services/orders/history'


import HotelDatepicker from "../Salesops/fullDateRange/hotel-datepicker.js"
import { mapGetters, mapActions } from "vuex";

import moment from 'moment'
import _ from 'lodash'

let date = new Date();

export default {
  name: 'my-back-order',
  data () {
    return {
      act_lable_index: "",
      act_lable_selected: [],
      act_index_status: null,
      hotelDate: '',



      topic: '',
      topic2: '',
      keyword: '',
      titleCF: '',
      titleDes: [],
      leftBtn: 'CANCEL',
      rightBtn: 'CONFIRM',
      keepRow: [],
      keepType: '',
      activeBtn: false,
      k1CHK: false,
      kmCHK: false,
      type: null,
      btnSubmit: '',
      keywordBO: '',
      keepSelected: [],
      BKkeepSelected: [],
      totalSelected: 0,
      reason: 1,
      // createOrder: false,
      keepCust: null,
      loading: false,
      loadingDG: false,
      disBtnBeforeSave: false,
      CHKManageAll: false,
      dpSource: 'all',
      dpSourcePopup: 'all',
      orderSourceList: [],
      emailInput: '',
      showCard: false,
      incorrectEmail: [],
      btn_type: 'pop_up',
      start : 0
    }
  },
  computed: {
    ...mapGetters({
      act_sales_list: "act_sales_list",
      act_txt_date_selected: "act_txt_date_selected",
      act_default_i18n: "act_default_i18n"
    }),
    k1List () {
      return this.$store.getters['mybackorder/k1List']
    },
    kmList () {
      return this.$store.getters['mybackorder/kmList']
    },
    k1List_temp () {
      return this.$store.getters['mybackorder/k1List_temp']
    },
    kmList_temp () {
      return this.$store.getters['mybackorder/kmList_temp']
    },
    btnNewRound () {
      return this.$store.getters['mybackorder/btnNewRound']
    },
    spinner () {
      return this.$store.getters['mybackorder/spinner']
    },
    dropdown () {
      return this.$store.getters['mybackorder/dropdown']
    },
    detail () {
      return this.$store.getters['mybackorder/detail']
    },
    spinnerDG () {
      return this.$store.getters['mybackorder/spinnerDG']
    },
    totalK1 () {
      return this.$store.getters['mybackorder/totalK1']
    },
    totalKM () {
      return this.$store.getters['mybackorder/totalKM']
    },
    totalOrder () {
      return this.$store.getters['mybackorder/totalOrder']
    },
    declineReason () {
      return this.$store.getters['mybackorder/declineReason']
    },
    detail_temp () {
      return this.$store.getters['mybackorder/detail_temp']
    },
    orderDialog () {
      return this.$store.getters['myorders/orderDialog']
    },
    emailExport () {
      return this.$store.getters['mybackorder/emailExport']
    }
  },
  watch: {},
  methods: {
    ...mapActions([
      "selectGroupSalesService",
      "selectSalesService",
      "searchSalesService"
    ]),
    selectTime() {
      // this.$ga.event(this.$ga_key.Activity_Checkin_FilterTime)
      document.getElementById("pageBackOrderManagement").click();
      document.getElementById("showtime").className =
        "md-card showTime md-theme-default show-tag";
    },
    outsideShowTime: function(e) {
      if (
        e.target.className != "md-icon mr-5 md-theme-default material-icons" &&
        e.target.className != "md-input input-showtime"
      ) {
        // document.getElementById("showtime").className =
        //   "md-card showTime md-theme-default hide-tag";
      }
    },
    timeCallback(item) {
      // this.start = 0
      this.$store.commit('SET_DATE_SELECTED', item);
      this.$store.commit('SET_TXT_DATE_SELECTED', item.timename);
      this.$store.dispatch('mybackorder/viewsBcakOrdByCode', {values:this.dpSourcePopup , date : this.act_txt_date_selected })
      document.getElementById("showtime").className =
        "md-card showTime md-theme-default hide-tag";
      // this.$store.dispatch("setTimeListService");
    },
    updateValues() {
      // console.log(this.hotelDate)
      var startDate = document.getElementById("startDatePickerID").value;
      let obj = { id: 7, timename: startDate, value: startDate , source:this.dpSourcePopup};
      // this.filterList(obj)
      this.$store.dispatch('mybackorder/viewsBcakOrdByCode', {values:this.dpSourcePopup , date : startDate})
      // this.$store.dispatch("mybackorder/searchBackOrderByDate", obj);
      this.$store.commit('SET_DATE_SELECTED', obj);
      this.$store.commit('SET_TXT_DATE_SELECTED', obj.timename);
      this.hotelDate.isOpen = true;
      document.getElementById("showtime").className =
        "md-card showTime md-theme-default hide-tag";
    },
    showDateRange(item) {
      document.getElementById("showtime").className =
        "md-card showTime md-theme-default show-tag";
      if (this.hotelDate.isOpen == true) {
        this.hotelDate.isOpen = false;
      }else {
       
       if(this.start == 0){
          let rsDate = date.getFullYear();
          let st = new Date().setDate(new Date().getDate() - 90)
          let en = new Date()
                this.hotelDate = new HotelDatepicker(
                    document.getElementById("startDatePickerID"),
                    {
                      format: "DD/MM/YYYY",
                      startOfWeek: "monday",
                      minNights: 1,
                      maxNights: 0,
                      maxDays:0,
                      allowedRanges: this.allowedRanges,
                      container: "",
                      i18n: this.act_default_i18n,
                      startDate: new Date(rsDate - 5 + "-01-01"),
                      endDate: new Date(),
                    }
                  );
                  this.start  = 1
                  // console.log(st,en)
                  this.hotelDate.start = st
                  this.hotelDate.end = en
                  // console.log(this.hotelDate.start)
          }
      this.hotelDate.isOpen = false;
      this.hotelDate.input.click();
      this.hotelDate.isOpen = false;
      }
      //   this.$store.dispatch('setTimeOfActivityService' , item);
      //   this.$store.dispatch('setTimeListService');
    },
    outsideDatePicker: function(e) {
      if (
        e.target.className != "datepicker__inner" &&
        e.target.className != "md-icon mr-5 md-theme-default material-icons" &&
        e.target.className != "slcGroup-c pl-40 -list-block pr-20 latoFont" &&
        e.target.className !=
          "datepicker__month-day datepicker__month-day--visibleMonth datepicker__month-day--valid    datepicker__month-day--selected datepicker__month-day--first-day-selected " &&
        e.target.className !=
          "datepicker__month-day datepicker__month-day--visibleMonth datepicker__month-day--valid " &&
        e.target.className != "slcGroup-c pl-40 -list-block pr-20 latoFont"
      ) {
        if(this.start == 1){
          this.hotelDate.isOpen = true;
        }
        document.getElementById("showtime").className =
          "md-card showTime md-theme-default hide-tag";
      }
    },

    exportData (mode) {
      // return;
      let emails = this.emailInput.split(',')
      let checkMail = []
      let checkMailTrue = []
      emails.forEach(element => {
        if (_.trim(element).length > 0) {
          var lastAtPos = element.lastIndexOf('@')
          var lastDotPos = element.lastIndexOf('.')
          if (
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            element.indexOf('@@') == -1 &&
            lastDotPos > 2 &&
            element.length - lastDotPos > 2
          ) {
            checkMailTrue.push(element)
          } else {
            checkMail.push(element)
          }
        }
      })
      this.incorrectEmail = checkMail
      if (checkMail.length === 0) {
        let data_sec = []
        _.forEach(this.detail, function (row, key) {
          let rs = row.items.filter(todo => todo.checked == true)
          _.forEach(rs, function (rowItem, keyItem) {
            data_sec.push(rowItem.backorder_id)
          })
        })
        
        let obj = {
          source: this.dpSource,
          emp_id: Vue.localStorage.get('emp_id'),
          email: checkMailTrue,
          data_sec: data_sec,
          date:this.act_txt_date_selected

        }
        this.closeMdsCard()
        bkService
          .googleSheetBK(obj)
          .then(response => {})
          .catch()
      }
    },
    showMdsCard () {
      this.emailInput = this.emailExport
      setTimeout(() => {
        this.showCard = true
        document.getElementById('mds-card-export-myback').style.visibility =
          'visible'
      }, 0)
    },
    closeMdsCard () {
      this.showCard = false
      setTimeout(() => {
        document.getElementById('mds-card-export-myback').style.visibility =
          'hidden'
      }, 0)
    },
    mouseLeave: function () {
      // if (this.showCard == true) {
      // this.showCard = false
      // }
    },
    selSourcePopup () {
        this.$store.dispatch('mybackorder/viewsBcakOrdByCode', {values:this.dpSourcePopup , date : this.act_txt_date_selected })
      
    },
    selSource () {
      this.$store.commit('mybackorder/setTypeSource', this.dpSource)
      this.$store.dispatch('mybackorder/getList', this.keyword)
    },
    GoogleAnalytics(param){
      document.getElementById(param).click()
      // console.log('Test Google',param)
      },
    orderSouce () {
      historyService
        .getOrderSouce()
        .then(response => {
          this.orderSourceList = response
          this.$store.commit('mybackorder/setTypeSource', this.dpSource)
        })
        .catch()
    },
    keywordFil (val) {
      this.keyword = val
      this.filterList(val)
    },
    keywordCLR () {
      this.keyword = ''
      this.$store.dispatch('mybackorder/searchBackOrderOnline', '')
    },
    keywordFilBo (val) {
      this.keywordBO = val
      this.filterListBO(val)
    },
    keywordCLRBo () {
      this.keywordBO = ''
      this.filterListBO('')
    },
    disabledChk (val, row) {
      if (Vue.localStorage.get('emp_id') == row[val]) {
        return false
      } else {
        return true
      }
    },
    handleScroll (event) {
      let t = this
      let key = _.trim(this.keyword)
      if (key.length == 0) {
        if (
          t.loading == false &&
          this.kmList.length < this.kmList_temp.length
        ) {
          t.loading = true
          let data = this.kmList_temp
          let start = this.kmList.length
          let end = this.kmList.length + 5
          for (let i = start; i < end; i++) {
            if (!_.isUndefined(data[i])) {
              this.kmList.push(data[i])
            }
          }
          t.loading = false
        }
      }
    },
    scrollPage (val) {
      let t = this
      if (
        t.loadingDG == false &&
        this.detail.length < this.detail_temp.length
      ) {
        t.loadingDG = true
        let data = this.detail_temp
        let start = this.detail.length
        let end = this.detail.length + 5
        for (let i = start; i < end; i++) {
          if (!_.isUndefined(data[i])) {
            this.detail.push(data[i])
          }
        }
        t.loadingDG = false
      }
    },
    submit () {
      if (this.type == 'decline' && this.totalSelected > 0) {
        this.$refs['md-decline-dialog'].open()
      }
    },
    disabledBtn () {
      if (this.keepCust.order_type == 'K1') {
        if (this.keepSelected.length == 0) {
          return true
        } else {
          return false
        }
      } else if (this.keepCust.order_type == 'KM') {
        if (this.totalSelected > 0) {
          return false
        } else {
          return true
        }
      }
    },
    checkedAllDG (level, indexs, child) {

      // console.log(indexs)
      
      let t = this
      if (level == 'head') {
         this.GoogleAnalytics('my_back_view_select_all_item')
        //  console.log(t.detail[indexs].items)
         for (let index = 0; index < t.detail[indexs].items.length; index++) {
           const element = t.detail[indexs].items[index];

            Object.assign(element , {index_checkbox : index+'-'+indexs})
         }
        _.forEach(t.detail[indexs].items, function (row) {
          if (Vue.localStorage.get('emp_id') == row['sm_code']) {
            // t.detail[indexs]
            row.checked = t.detail[indexs].checked
            row.order_no = t.detail[indexs].order_no
            row.po_no = t.detail[indexs].po_no
            let str = t.detail[indexs].order_no + '-' + row.item_code
            if (t.detail[indexs].checked) {
              row.keyId = str
              row.customer_code = row.cust_code
              row.bk_type = row.order_type
              row.ref_po_no = row.bd_po_no

                _.remove(t.keepSelected, function (val) {
                return val.index_checkbox == row.index_checkbox 
              })
              t.keepSelected.push(row)
             
            } else {
              _.remove(t.keepSelected, function (val) {
                // console.log('re => ',val.keyId  , str)
                return val.index_checkbox == row.index_checkbox  
              })
            }
          }
          //  console.log(t.keepSelected)
        })
        let totalS = t.keepSelected.reduce(
          (acc, row) => acc + parseFloat(row.total),
          0
        )
        // round ทศนิยม
        let totalS4 = _.round(totalS, 4)
        let totalS3 = _.round(totalS4, 3)
        let totalS2 = _.round(totalS3, 2)
        t.totalSelected = totalS2
       
      } else if (level == 'manage') {
         this.GoogleAnalytics('my_back_view_select_item')
        let chk = t.detail[indexs].items.filter(todo => todo.checked == true)
        let row = t.detail[indexs].items[child]
        let str = row.order_no + '-' + row.item_code
        let indexItem = _.findIndex(t.detail_temp, {
          customer_code: row.customer_code
        })
        if (row.checked) {
          row.keyId = str
          t.keepSelected.push(row)
          if (indexItem >= 0) {
            t.detail_temp[indexItem].items[child].checked = true
          }
        } else {
          if (indexItem >= 0) {
            t.detail_temp[indexItem].items[child].checked = false
          }
          _.remove(t.keepSelected, function (val) {
            return val.keyId == str
          })
        }

      } else {
       this.GoogleAnalytics('my_back_view_select_item')
         for (let index = 0; index < t.detail[indexs].items.length; index++) {
           const element = t.detail[indexs].items[index]
            Object.assign(element , {index_checkbox : index+'-'+indexs})
         }
        let chk = t.detail[indexs].items.filter(todo => todo.checked == true)
        let row = t.detail[indexs].items[child]
        row.order_no = t.detail[indexs].order_no
        row.po_no = t.detail[indexs].po_no
        let str = row.order_no + '-' + row.item_code
        if (row.checked) {
          row.keyId = str
          row.customer_code = row.cust_code
          row.bk_type = row.order_type
          row.ref_po_no = row.bd_po_no
          t.keepSelected.push(row)
        } else {
          _.remove(t.keepSelected, function (val) {
            return val.index_checkbox == row.index_checkbox 
          })
        }

        let totalS = t.keepSelected.reduce(
          (acc, row) => acc + parseFloat(row.total),
          0
        )
        //  console.log(t.keepSelected)
        // round ทศนิยม
        let totalS4 = _.round(totalS, 4)
        let totalS3 = _.round(totalS4, 3)
        let totalS2 = _.round(totalS3, 2)
        t.totalSelected = totalS2

        t.detail[indexs].checked =
          chk.length == t.detail[indexs].items.length ? true : false
      }
    },
    checkedReason (index) {
      this.reason = this.declineReason[index]
    },
    saveDecline () {
      if (!_.isNull(this.reason)) {
        let obj = {
          reason: this.reason,
          btn: 'dec',
          bnt_type: this.btn_type
        }
        let data = []

        if (_.isNull(this.type)) {
          let k1 = this.k1List.filter(todo => todo.checked == true)
          let km = this.kmList.filter(todo => todo.checked == true)
          data = _.union(km, k1)
          this.activeBtn = false
        } else {
          // data = this.BKkeepSelected;
          _.forEach(this.detail, function (row, key) {
            let rs = row.items.filter(todo => todo.checked == true)
            _.forEach(rs, function (rowItem, keyItem) {
              data.push(rowItem)
            })
          })
        }

        this.$store.commit('mybackorder/setSpinnerDG', true)
        bkService
          .updateStatusBK(data, obj)
          .then(response => {
            this.$store.commit('mybackorder/setSpinnerDG', false)
            this.$store.dispatch('mybackorder/getList', this.keyword)
          })
          .catch()
        this.$refs['md-decline-dialog'].close()
        this.$refs['pageBackOrderDG'].close()
        this.reason = 1
        this.type = null
      }
    },
    choose (type, row, table) {
      if(type == 'view'){
         this.GoogleAnalytics('my_back_View Back Order')
//  my_back_View Back Order
      }else if(type == 'accept' ){
         this.GoogleAnalytics('my_back_Accept Back Order')
//  my_back_Accept Back Order
      }else if(type == 'decline' ){
         this.GoogleAnalytics('my_back_Delete Back Order')        
// my_back_Delete Back Order
      }

      this.type = type
      if (!_.isNull(row)) {
        row.order_type = table
      }
      this.activeBtn = false
      this.keepSelected = []
      this.totalSelected = 0
      // this.createOrder = false;
      let wh = table == 'K1' ? 'DNSS' : 'DNPC'
      this.keepCust = row
      this.topic2 =
        type == 'manage' ? '' : row.customer_code + ' ' + row.customer_name
      if (type == 'decline') {
        this.$store.dispatch('mybackorder/getBcakOrdByCode', row)
        this.topic = 'Select Back Order (' + table + ' ' + wh + ')'
        this.btnSubmit = 'DECLINE BACK ORDER'
        this.$refs['pageBackOrderDG'].open()
      } else if (type == 'accept') {
        this.btnSubmit = 'CREATE ORDER'
        this.$store.dispatch('mybackorder/getBcakOrdByCode', row)
        this.topic = 'Select Back Order (' + table + ' ' + wh + ')'
        this.$refs['pageBackOrderDG'].open()
      } else if (type == 'view') {
        this.btnSubmit = 'DECLINE BACK ORDER'
        this.$store.dispatch('mybackorder/getBcakOrdByCode', row)
        this.topic = 'Select Back Order (' + table + ' ' + wh + ')'
        this.$refs['pageBackOrderDG'].open()
      } else if (type == 'manage') {
        this.btnSubmit = 'manage'
        this.CHKManageAll = false

      const start_date =  new Date();
       start_date.setDate(new Date().getDate() - 90)
      const end_date = new Date()

        // this.Add_0(start_date.getDate())
      let txt_start = this.Add_0(start_date.getDate())+'/'+this.Add_0((start_date.getMonth()+1))+'/'+start_date.getFullYear()
      let txt_end = this.Add_0(end_date.getDate())+'/'+this.Add_0((end_date.getMonth()+1))+'/'+end_date.getFullYear()
      
      // console.log(txt_start , txt_end)
        this.$store.dispatch("setTimeListService", 0);
        this.$store.commit("SET_TXT_DATE_SELECTED", txt_start+ ' - ' + txt_end)
        this.$store.commit("SET_DATE_SELECTED", {
          id: 7,
          timename: "Custom",
          value: "custom"
        });

        // this.$store.dispatch(
        //   'mybackorder/viewsBcakOrdByCode',{values:this.dpSourcePopup , date : this.act_txt_date_selected })
        this.topic = 'Manage Back Order by Salesman'
        this.$refs['pageBackOrderDG'].open()
      }
    },
    Add_0( param ){
      if(param < 10){
        return '0'+param
      }else {
        return param
      }
    },
    filterList (param) {
      this.$store.dispatch('mybackorder/searchBackOrderOnline', param)
    },
    filterListBO (param) {
      this.$store.dispatch('mybackorder/filterListBO', param)
    },
    checkedAll (table) {
      let t = this
      if (table == 'K1') {
        _.forEach(this.k1List, function (row) {
          if (Vue.localStorage.get('emp_id') == row.sm_code) {
            row.checked = t.k1CHK
            let str = table + '-' + row.order_no + '-' + row.customer_code
            if (row.checked) {
              row.keyId = str
              let chk_keep = t.BKkeepSelected.filter(keep => keep.keyId == str)
              if (chk_keep.length == 0) {
                t.BKkeepSelected.push(row)
              }
            } else {
              _.remove(t.BKkeepSelected, function (val) {
                return val.keyId == str
              })
            }
          }
        })
        let chk = this.k1List.filter(todo => todo.checked == true)
        this.activeBtn = chk.length == 0 ? false : true
      } else {
        _.forEach(this.kmList, function (row) {
          if (Vue.localStorage.get('emp_id') == row.sm_code) {
            row.checked = t.kmCHK
            let str = table + '-' + row.order_no + '-' + row.customer_code
            if (row.checked) {
              row.keyId = str
              let chk_keep = t.BKkeepSelected.filter(keep => keep.keyId == str)
              if (chk_keep.length == 0) {
                t.BKkeepSelected.push(row)
              }
            } else {
              _.remove(t.BKkeepSelected, function (val) {
                return val.keyId == str
              })
            }
          }
        })
        let chk = this.kmList.filter(todo => todo.checked == true)
        this.activeBtn = chk.length == 0 ? false : true
      }
    },
    countCHK (table, index) {
      let t = this
      if (table == 'K1') {
        let chk = this.k1List.filter(todo => todo.checked == true)
        let row = this.k1List[index]
        let str = table + '-' + row.order_no + '-' + row.customer_code
        if (row.checked) {
          row.keyId = str
          let chk_keep = t.BKkeepSelected.filter(keep => keep.keyId == str)
          if (chk_keep.length == 0) {
            t.BKkeepSelected.push(row)
          }
        } else {
          _.remove(t.BKkeepSelected, function (val) {
            return val.keyId == str
          })
        }
        this.activeBtn = chk.length == 0 ? false : true
        this.k1CHK = chk.length != this.k1List.length ? false : true
      } else {
        let chk = this.kmList.filter(todo => todo.checked == true)
        let row = this.kmList[index]
        let str = table + '-' + row.order_no + '-' + row.customer_code
        if (row.checked) {
          row.keyId = str
          let chk_keep = t.BKkeepSelected.filter(keep => keep.keyId == str)
          if (chk_keep.length == 0) {
            t.BKkeepSelected.push(row)
          }
        } else {
          _.remove(t.BKkeepSelected, function (val) {
            return val.keyId == str
          })
        }
        this.activeBtn = chk.length == 0 ? false : true
        this.kmCHK = chk.length != this.kmList.length ? false : true
      }
    },
    saveAndClose () {
      let t = this
      t.closeCF('md-confirm-dialog')
      this.disBtnBeforeSave = true
      if (t.keepType == 'generate') {
        t.$store.dispatch('mybackorder/generate')
      } else if (t.keepType == 'del') {
        this.$store.commit('mybackorder/setSpinnerDG', true)
        let obj = {
          reason: '',
          btn: 'del'
        }
        bkService
          .updateStatusBK(t.keepSelected, obj)
          .then(response => {

            if(this.start == 1){
          let rsDate = date.getFullYear();
          let st = new Date().setDate(new Date().getDate() - 90)
          let en = new Date()
                this.hotelDate = new HotelDatepicker(
                    document.getElementById("startDatePickerID"),
                    {
                      format: "DD/MM/YYYY",
                      startOfWeek: "monday",
                      minNights: 1,
                      maxNights: 0,
                      maxDays:0,
                      allowedRanges: this.allowedRanges,
                      container: "",
                      i18n: this.act_default_i18n,
                      startDate: new Date(rsDate - 5 + "-01-01"),
                      endDate: new Date(),
                    }
                  );
                  this.start  = 0
                  // console.log(st,en)
                  this.hotelDate.start = st
                  this.hotelDate.end = en
                  // console.log(this.hotelDate.start)
          }

            var startDate = document.getElementById("startDatePickerID").value;
            t.$store.dispatch('mybackorder/viewsBcakOrdByCode',{values:t.dpSourcePopup , date : this.act_txt_date_selected } )
            setTimeout(() => {
              t.$store.commit('mybackorder/setSpinnerDG', false)
              t.keepSelected = []
            }, 200)
          })
          .catch()
      } else if (t.keepType == 'export') {
        this.export_excel()
        // t.$store.dispatch("mybackorder/exprot_excel",this.keywordBO);
      } else if (t.keepType == 'create-order') {

        t.$refs['pageBackOrderDG'].close()
        this.reason = 1
        this.type = null
        let obj = {
          detail: t.keepSelected,
          head: t.keepCust
        }
        // console.log(t.keepSelected);
        Vue.localStorage.set('FROMPAGE', 'BACKORDERS')
        Vue.localStorage.set('BK_DETAIL', JSON.stringify(obj))

        // sessionStorage.setItem('process_order_channel' , )

        Vue.localStorage.set('ORD_DIALOG_SHOW', 'OPEN')
        sessionStorage.setItem('ORD_DIALOG_SHOW_SESSION','OPEN')

        Vue.localStorage.set('ORD_DIALOG', JSON.stringify(this.orderDialog))
        sessionStorage.setItem('keep_order_session',JSON.stringify(this.orderDialog))


        t.$router.push({ path: '/orders/myorders' })
        // this.createOrder = true;
      }
    },
    closeCF (id) {
      this.$refs[id].close()
    },
    btnProcess (type) {
      this.keepType = type
      this.titleDes = []
      if (type == 'decline-main' && this.BKkeepSelected.length > 0) {
        this.btn_type = 'view'
        this.$refs['md-decline-dialog'].open()
      } else if (type == 'decline-popup') {
        // } else if (type == "decline-popup" && this.totalSelected > 0) {
        this.$refs['md-decline-dialog'].open()
      } else if (type == 'accept-decline-popup') {
        // } else if (type == "accept-decline-popup" && this.totalSelected > 0) {
        this.$refs['md-decline-dialog'].open()
      } else if (type == 'create-order') {
        let step1 = this.keepSelected.filter(todo => parseFloat(todo.price) > 0)
        let step2 = _.groupBy(step1, 'item_code')
        let checkDup = []
        _.forEach(step2, function (rowHead) {
          if (rowHead.length > 1) {
            let step3 = _.groupBy(rowHead, 'price')
            let dup = []
            _.forEach(step3, function (rowHead3) {
              dup.push(rowHead3)
            })
            if (dup.length > 1) {
              checkDup.push(rowHead[0])
            }
          }
        })
        if (checkDup.length > 0) {
          this.titleCF = 'กรุณาตรวจสอบสินค้า'
          this.rightBtn = 'OK'
          this.titleDes = checkDup
          this.$refs['md-confirm-dialog'].open()
          this.disBtnBeforeSave = false
          this.keepType = 'checkGroupItem'
        } else {
          this.titleCF = 'Do you confirm to create order?'
          this.rightBtn = 'CONFIRM'
          this.$refs['md-confirm-dialog'].open()
          this.disBtnBeforeSave = false
        }
      } else if (type == 'export') {
        this.titleCF = 'Do you to export back order?'
        this.rightBtn = 'EXPORT'
        this.disBtnBeforeSave = false
        this.$refs['md-confirm-dialog'].open()
      } else if (type == 'del') {
        this.titleCF = 'Do you want to delete back order?'
        this.rightBtn = 'DELETE'
        this.disBtnBeforeSave = false
        this.$refs['md-confirm-dialog'].open()
      }
    },
    closeDG () {
   
      this.$refs['pageBackOrderDG'].close()
      this.reason = 1
      this.type = null
    },
    formatDate (value) {
      if (value == '') {
        return ''
      } else {
        return moment(value).format('DD/MM/YYYY')
      }
    },
    formatNumberInt (value) {
      let step4 = _.round(value, 4)
      let step3 = _.round(step4, 3)
      let step2 = _.round(step3, 2)
      return parseFloat(step2).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
      // return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    formatNumber (value) {
      if (!_.isUndefined(value)) {
        let step4 = _.round(value, 4)
        let step3 = _.round(step4, 3)
        let step2 = _.round(step3, 2)
        return parseFloat(step2).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      } else {
        return parseFloat(0).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      }
      // return this.$store.getters["globalfunc/formatNumber"](value);
    },

    export_excel (isXLSX = false) {
      let self = this
      let date = moment(new Date()).format('DDMMYYYYHHMM')
      let head_data = [
        'NO.',
        'Order No.',
        'PO No.',
        'PO. Date',
        'SM',
        'Items',
        'Price',
        'Order QTY',
        '',
        'Total'
      ]
      self.JSONToExportConvertor(
        head_data,
        self.detail,
        'backorder_[' + date + ']',
        self.keepSelected,
        true
      )
    },

    JSONToExportConvertor (
      HEADData,
      JSONData,
      ReportTitle,
      keepSelected,
      ShowLabel
    ) {
      var arrData =
        typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData
      var emp_id = Vue.localStorage.get('emp_id')
      var full_name =
        Vue.localStorage.get('first_name') +
        ' ' +
        Vue.localStorage.get('last_name')
      var data_export = ''
      data_export =
        'Manage Back Order by Salesman ' +
        '\r\n' +
        'Export By : ' +
        emp_id +
        ' ' +
        full_name +
        '\r\n'

      if (ShowLabel) {
        var row = ''
        for (var h = 0; h < HEADData.length; h++) {
          row += HEADData[h] + ','
        }
        row = row.slice(0, -1)
        data_export += row + '\r\n'
      }

      let datail = ''

      if (keepSelected.length == 0) {
        for (var i = 0; i < arrData.length; i++) {
          datail =
            'Customer : ' +
            arrData[i]['customer_code'] +
            ' ' +
            arrData[i]['customer_name'] +
            ' Credit Term: ' +
            // arrData[i]["credit_term"];
            arrData[i]['credit_term'] +
            ',' +
            ',' +
            ',' +
            ',' +
            ',' +
            ',' +
            ',' +
            ',' +
            'Total:' +
            ',' +
            arrData[i]['total']
          datail.slice(0, datail.length - 1)
          data_export += datail + '\r\n'
          datail = ''
          let item = arrData[i]['items']
          for (var l = 0; l < item.length; l++) {
            var order_no = item[l]['order_no'].toString()
            var po_date = moment(new Date(item[l]['po_date']))
              .format('DD/MM/YYYY')
              .toString()
            var sm = item[l]['sm_code'].toString()
            var price = item[l]['price'].replace(',', '')
            var total = item[l]['total']
            var qty = item[l]['qty']
            datail =
              item[l]['no'] +
              ', ' +
              order_no +
              ',' +
              item[l]['po_no'] +
              ',' +
              po_date +
              ',' +
              sm +
              ',' +
              item[l]['item_code'] +
              ' ' +
              item[l]['item_name'] +
              ',' +
              price +
              ',' +
              qty +
              ',' +
              item[l]['unit'] +
              ',' +
              total
            datail.slice(0, datail.length - 1)
            data_export += datail + '\r\n'
          }
        }
      } else {
        for (var i = 0; i < arrData.length; i++) {
          let chk = arrData[i].items.filter(todo => todo.checked == true)
          if (chk.length > 0) {
            datail =
              'Customer : ' +
              arrData[i]['customer_code'] +
              ' ' +
              arrData[i]['customer_name'] +
              ' Credit Term: ' +
              // arrData[i]["credit_term"];
              arrData[i]['credit_term'] +
              ',' +
              ',' +
              ',' +
              ',' +
              ',' +
              ',' +
              ',' +
              ',' +
              'Total:' +
              ',' +
              arrData[i]['total']
            datail.slice(0, datail.length - 1)
            data_export += datail + '\r\n'
            datail = ''
            let item = chk
            var no = 1
            for (var l = 0; l < item.length; l++) {
              var order_no = item[l]['order_no'].toString()
              var po_date = moment(new Date(item[l]['po_date']))
                .format('DD/MM/YYYY')
                .toString()
              var sm = item[l]['sm_code'].toString()
              var price = item[l]['price'].replace(',', '')
              var total = item[l]['total']
              var qty = item[l]['qty']
              datail =
                no +
                ', ' +
                order_no +
                ',' +
                item[l]['po_no'] +
                ',' +
                po_date +
                ',' +
                sm +
                ',' +
                item[l]['item_code'] +
                ' ' +
                item[l]['item_name'] +
                ',' +
                price +
                ',' +
                qty +
                ',' +
                item[l]['unit'] +
                ',' +
                total
              datail.slice(0, datail.length - 1)
              data_export += datail + '\r\n'
              no++
            }
          }
        }
      }
      if (arrData.length == 0) {
        data_export += 'No Data...' + '\r\n'
      }
      var fileName = ReportTitle
      var universalBOM = '\uFEFF'
      var uri =
        'data:text/csv;charset=utf-8,' +
        encodeURIComponent(universalBOM + data_export)
      var link = document.createElement('a')
      link.href = uri
      link.style = 'visibility:hidden'
      link.download = fileName + '.xls'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    checkedAllManage () {
      this.GoogleAnalytics('my_back_manage_select_all_cus')
      let t = this
      let count = 0
      _.forEach(t.detail, function (row, key) {
        let countItem = row.items.length
        let numItem = 0
        let indexItem = _.findIndex(t.detail_temp, {
          customer_code: row.customer_code
        })
        _.forEach(row.items, function (rowItem, keyItem) {
          if (Vue.localStorage.get('emp_id') == rowItem.sm_code) {
            rowItem.checked = t.CHKManageAll
            let str = rowItem.order_no + '-' + rowItem.item_code
            if (rowItem.checked) {
              rowItem.keyId = str
              let chk_keep = t.keepSelected.filter(keep => keep.keyId == str)
              if (chk_keep.length == 0) {
                t.keepSelected.push(rowItem)
              }
              if (indexItem >= 0) {
                t.detail_temp[indexItem].items[keyItem].checked = true
              }
            } else {
              if (indexItem >= 0) {
                t.detail_temp[indexItem].items[keyItem].checked = false
              }
              _.remove(t.keepSelected, function (val) {
                return val.keyId == str
              })
            }
            numItem++
            count++
          }
        })
        if (countItem == numItem) {
          row.checked = t.CHKManageAll
          t.detail_temp[indexItem].checked = t.CHKManageAll
        }
      })
    },
    checkedCustAll (indexs) {
      this.GoogleAnalytics('my_back_manage_select_cus')
      let t = this
      let statusChk = t.detail[indexs].checked
      let indexItem = _.findIndex(t.detail_temp, {
        customer_code: t.detail[indexs].customer_code
      })
      t.detail_temp[indexItem].checked = statusChk
      _.forEach(t.detail[indexs].items, function (rowItem, keyItem) {
        if (Vue.localStorage.get('emp_id') == rowItem.sm_code) {
          rowItem.checked = statusChk
          let str = rowItem.order_no + '-' + rowItem.item_code
          if (rowItem.checked) {
            rowItem.keyId = str
            let chk_keep = t.keepSelected.filter(keep => keep.keyId == str)
            if (chk_keep.length == 0) {
              t.keepSelected.push(rowItem)
            }
            if (indexItem >= 0) {
              t.detail_temp[indexItem].items[keyItem].checked = true
            }
          } else {
            if (indexItem >= 0) {
              t.detail_temp[indexItem].items[keyItem].checked = false
            }
            _.remove(t.keepSelected, function (val) {
              return val.keyId == str
            })
          }
        }
      })
    }
  },
  props: {
    value: {
      type: String
    },
    allowedRanges: {
      default: function() {
        return [];
      },
      type: Array
    },
    i18n: {
      default: () => this.act_default_i18n,
      type: Object
    }
  },
  components: {
    'menu-header': require('../Salesops/layout/menu-top'),
    'menu-left': require('../Salesops/layout/menu-left'),
    HotelDatepicker,
    'md-search-box': require('./myorder-component/md-search-box'),
    'md-search-box-pop-back': require('./myorder-component/md-search-box-pop-back'),
    'md-search-box-back': require('./myorder-component/md-search-box-back'),
    'add-orders-dialog': require('./back-order-comonent/add-orders-dialog'),
  },
  mounted: function() {
    // let rsDate = date.getFullYear();
    //   if(document.getElementById("startDatePickerID") != null){
    // this.hotelDate = new HotelDatepicker(
    //       document.getElementById("startDatePickerID"),
    //       {
    //         format: "DD/MM/YYYY",
    //         startOfWeek: "monday",
    //         minNights: 1,
    //         maxNights: 0,
    //         allowedRanges: this.allowedRanges,
    //         container: "",
    //         i18n: this.act_default_i18n,
    //         startDate: new Date(rsDate - 5 + "-01-01")
    //       }
    //     );
    //   }
    
    // console.log(this.hotelDate,this.allowedRanges , this.act_default_i18n)
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
      this.login = true
      this.$store.dispatch('setPathMenuService', 'orders')
      this.orderSouce()
      this.$store.dispatch('mybackorder/getDecReason')

        
      this.$store.dispatch("setTimeListService", 0);
      this.$store.commit("SET_TXT_DATE_SELECTED" ,"Custom")
      this.$store.commit("SET_DATE_SELECTED", {
        id: 7,
        timename: "Custom",
        value: "custom"
      });
      
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
  }
}
</script>
<style src="../Salesops/fullDateRange/styles.scss" lang="scss"></style>
<style src="../Salesops/fullDateRange/act-styles.css"></style>
<style lang="scss" scoped>
.md-select {
     width: 95%; 
     min-width: 100px
}
#pageBackOrderManagement {
  .md-select {
     width: 95%; 
     min-width: 100px
}
  .pt-2 {
    padding-top: 2px;
  }
  .md-dropdown-box {
    background: #efefef;
  }
  .head-table {
    font-family: roboto;
    // opacity: 0.54;
    margin-top: 25px;
    display: flex;
    font-size: 12px;
    font-weight: 600;
    .md-icon {
      cursor: pointer;
    }
  }
  .sales-area-table {
    width: 1000px;
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 10px;
    .detail-blog {
      padding: 0px !important;
      .content-table {
        display: flex;
        padding-bottom: 5px;
        padding-top: 7px;
        padding-left: 10px;
        .view-more {
          visibility: hidden;
        }
      }
      .content-table:hover {
        .view-more {
          visibility: visible;
        }
      }
    }
  }
}
</style>
