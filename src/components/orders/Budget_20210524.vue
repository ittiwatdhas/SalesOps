<template>
  <div id="pageBudget">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>

    <div v-if="login == true">
      <md-layout
        md-align="start"
        md-flex="100"
        class="md-topic"
        style="padding-top: 25px; padding-left: 40px"
        >{{ pageName }}</md-layout
      >
      <md-layout md-align="center" class="pt-20">
        <md-tabs id="tabBudget" @change="onChange" @click.native="onTabClick">
          <md-tab
            id="tab-discount"
            :md-active="setActiveTab == 'discount'"
            md-label="Discount Budget"
          >
            <md-layout md-flex="100" md-align="center">
              <md-spinner
                :md-size="150"
                :md-stroke="1"
                v-show="spinner"
                md-indeterminate
              ></md-spinner>
              <md-card class="tap-table">
                <md-layout md-flex="100" style="flex: unset">
                  <md-layout
                    md-flex="50"
                    style="
                      padding-left: 10px;
                      color: #414141;
                      font-family: lato;
                      font-size: 18px;
                    "
                  >
                    <div>
                      <div class="sales-period-box" @mouseleave="mouseLeave">
                        <md-card
                          class="sales-period-view-box"
                          @click.native="openMonth"
                        >
                          <md-card-content>
                            <div class="card-title">
                              <span
                                >{{ disSelectedDate.month }}
                                {{ disSelectedDate.year }}</span
                              >
                            </div>
                            <md-icon>expand_more</md-icon>
                          </md-card-content>
                        </md-card>
                        <month-calendar
                          ref="selectCalendar"
                          v-if="disShowmonth"
                          v-on:selectmonth="disSelectMonth"
                          v-on:selectyear="disSelectyear"
                          :dates="disDate"
                        ></month-calendar>
                      </div>
                      <div
                        style="
                          padding-left: 10px;
                          font-family: roboto;
                          font-size: 12px;
                          text-align: left;
                          padding-top: 5px;
                          color: #a8a8a8;
                        "
                      >
                        <span>Approve Date</span>
                      </div>
                    </div>

                    <div style="padding-left: 30px">
                      <div
                        class="md-dropdown-box"
                        @mouseleave="mouseLeaveDropdow_channel"
                      >
                        <md-input-container
                          style="border-radius: 4px ;height:100%"
                          md-theme
                          class="dropdown-box"
                          @click.native="getWidth($event)"
                        >
                          <md-input
                            style="color:rgb(65,65,65) ; font"
                            @keypress.native="showAutocom_channel = true"
                            @focus="openAutoCom_channel"
                            v-on:change="filterDropdow_channel"
                            v-model="txt_channel"
                            @focus.native="$event.target.select()"
                            readonly
                            :class="tempId"
                          ></md-input>
                          <md-button
                            class="md-icon-button"
                            @click.native="showAutocom_channel = true"
                          >
                            <md-icon style="padding-top: 1px"
                              >arrow_drop_down</md-icon
                            >
                          </md-button>
                        </md-input-container>
                        <md-card
                          class="text-autocomplete"
                          v-if="showAutocom_channel"
                          :style="{ width: widthTag + 'px' }"
                        >
                          <div
                            class="no-data-promo"
                            v-if="dropdown_channel.length == 0"
                          >
                            <span>No data....</span>
                          </div>
                          <ul class="md-list" v-else>
                            <li
                              class="md-list-item"
                              v-for="(item, index) in dropdown_channel"
                              :key="'cg' + index"
                            >
                              <div
                                class="md-list-item-row"
                                @click="select_channel(item)"
                              >
                                <div style="long-row">
                                  <span class="descript">{{
                                    item.channel_code
                                  }}</span>
                                  <span v-if="item.channel_code != ''">
                                    :
                                  </span>
                                  {{ item.title_channel }}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </md-card>
                      </div>
                      <div
                        style="
                          padding-left: 10px;
                          font-family: roboto;
                          font-size: 12px;
                          text-align: left;
                          padding-top: 5px;
                          color: #a8a8a8;
                        "
                      >
                        <span></span>
                      </div>
                    </div>
                  </md-layout>

                  <md-layout md-flex="50" md-align="end">
                    <div style="width: 50%; padding-right: 40px" class="pt-5">
                      <md-search-box
                        :placeholder="'Search'"
                        :data="[]"
                        @clear="keywordDisCLR"
                        :value="keywordDis"
                        @filter="keywordDisFil"
                      ></md-search-box>
                    </div>
                  </md-layout>
                </md-layout>
                <div
                  style="
                    width: 100%;
                    display: flex;
                    font-size: 16px;
                    font-family: roboto;
                    font-weight: bold;
                    margin-top: 15px;
                    padding-top: 10px;
                    padding-bottom: 10px;
                  "
                >
                  <div class="text-left" style="width: 52%"></div>
                  <div class="text-left" style="width: 10%">Total</div>
                  <div
                    class="number pt-2 text-right"
                    style="width: 11%; padding-right: 10px"
                  >
                    {{ formatNumber(totalDis_limit) }}
                  </div>
                  <div
                    class="number pt-2 text-right"
                    style="width: 11%; padding-right: 10px"
                  >
                    {{ formatNumber(totalDis_used) }}
                  </div>
                  <div
                    class="number pt-2 text-right"
                    style="width: 11%; padding-right: 10px"
                  >
                    {{ formatNumber(totalDis_balance) }}
                  </div>
                  <div class="text-left" style="width: 5%"></div>
                </div>

                <div :class="'head-table'" id="moreClick">
                  <div class="text-left" style="width: 13%">Channel</div>
                  <div class="text-left" style="width: 22%">Name</div>
                  <div class="text-left" style="width: 10%">Code</div>
                  <div class="text-left" style="width: 10%">Department</div>
                  <div class="text-left" style="width: 9%">type</div>
                  <div class="text-center" style="width: 11%">Limit</div>
                  <div class="text-center" style="width: 11%">Used</div>
                  <div class="text-center" style="width: 11%">Balance</div>
                  <div class="text-left" style="width: 5%"></div>
                </div>
                <div
                  v-if="dataDiscount.length == 0"
                  style="margin-top: 10%; font-size: 15px; color: #a8a8a8"
                >
                  No Discount Budget
                </div>
                <div
                  class="detail-blog"
                  style="
                    height: calc(100vh - 330px);
                    padding-left: 0px;
                    margin-right: 0px;
                  "
                >
                  <div
                    v-for="(items, dIndex) in dataDiscount"
                    :key="items.code + '_' + dIndex"
                    class="content-table"
                    style="font-family: roboto; padding-top: 7px"
                  >
                    <div
                      class="number pt-2"
                      style="
                        padding-left: 12px;
                        width: 13%;
                        font-family: kanit;
                        font-size: 14px;
                        font-weight: normal;
                      "
                    >
                      {{ items.channel_title }}
                    </div>
                    <div
                      class="number pt-2"
                      style="
                        width: 22%;
                        font-family: kanit;
                        font-size: 14px;
                        font-weight: normal;
                      "
                    >
                      {{ items.name }}
                    </div>
                    <div class="number pt-2" style="width: 10%">
                      {{ items.role_code }}
                    </div>
                    <div class="number pt-2" style="width: 10%">
                      {{ items.department }}
                    </div>
                    <div
                      class="number pt-2"
                      style="width: 8%; background-color: "
                    >
                      {{ items.type }}
                    </div>
                    <div
                      class="number pt-2 text-right"
                      style="width: 11%; font-size: 13px; font-family: roboto"
                    >
                      <span style="padding-right: 4px; color: #5a5a5a">฿</span>
                      {{ items.limit }}
                    </div>
                    <div
                      class="number pt-2 text-right"
                      style="
                        background-color: ;
                        width: 11%;
                        font-size: 13px;
                        font-family: roboto;
                      "
                    >
                      <span
                        style="
                          background-color: ;
                          padding-right: 4px;
                          color: #5a5a5a;
                        "
                        >฿</span
                      >
                      {{ items.used }}
                    </div>
                    <div
                      class="number pt-2 text-right"
                      style="width: 11%; font-size: 13px; font-family: roboto"
                    >
                      <span style="padding-right: 4px; color: #5a5a5a">฿</span>
                      {{ items.balance }}
                    </div>
                    <div
                      class="number"
                      style="
                        width: 2%;
                        opacity: 0.54;
                        cursor: pointer;
                        padding-left: 3px;
                      "
                      @click="openPurchase(items)"
                      :id="'detail' + items.code"
                    >
                      <md-icon>keyboard_arrow_right</md-icon>
                    </div>
                  </div>
                </div>
              </md-card>
            </md-layout>
          </md-tab>

          <md-tab
            id="tab-purchase"
            :md-active="setActiveTab == 'purchase'"
            md-label="Purchase Order"
          >
            <md-layout md-flex="100" md-align="center">
              <md-spinner
                :md-size="150"
                :md-stroke="1"
                v-show="spinner"
                md-indeterminate
              ></md-spinner>
              <md-card class="tap-table">
                <md-layout md-flex="100" style="flex: unset">
                  <md-layout
                    md-flex="60"
                    style="
                      padding-left: 10px;
                      color: #414141;
                      font-family: lato;
                      font-size: 18px;
                    "
                  >
                    <div style="width: 40%">
                      <div style="display: -webkit-box; width: 94%">
                        <div
                          class="sales-period-box"
                          @mouseleave="purMouseLeave"
                        >
                          <md-card
                            class="sales-period-view-box"
                            @click.native="purShowmonth = true"
                          >
                            <md-card-content>
                              <div class="card-title">
                                <div
                                  :style="{
                                    'font-size':
                                      purSelectedDate.year == ''
                                        ? '12px'
                                        : '18px',
                                    'font-weight':
                                      purSelectedDate.year == '' ? '600' : '',
                                    'font-family': 'Roboto',
                                    width: '100%',
                                  }"
                                >
                                  <span
                                    >{{ purSelectedDate.month_name }}
                                    {{ purSelectedDate.year }}</span
                                  >
                                </div>
                              </div>
                              <md-icon>expand_more</md-icon>
                            </md-card-content>
                          </md-card>
                          <month-calendar2
                            ref="selectCalendar"
                            v-if="purShowmonth"
                            v-on:selectmonth="purSelectMonth"
                            v-on:selectyear="purSelectYear"
                            :year="purSelectedDate.year"
                            :month="purSelectedDate.month"
                            :displayRange="true"
                            :range="purSelectedDate.range"
                          ></month-calendar2>
                        </div>
                      </div>
                      <div
                        style="
                          padding-left: 10px;
                          font-family: roboto;
                          font-size: 12px;
                          text-align: left;
                          padding-top: 5px;
                          color: #a8a8a8;
                        "
                      >
                        <span>Approve Date</span>
                      </div>
                    </div>
                    <div style="padding-left: 15px; width: 45%" class="pt-5">
                      <div
                        class="md-dropdown-box"
                        @mouseleave="mouseLeaveDropdow"
                      >
                        <md-input-container
                          md-theme
                          class="dropdown-box"
                          @click.native="getWidth($event)"
                        >
                          <md-input
                            @keypress.native="showAutocom = true"
                            @focus="openAutoCom"
                            :placeholder="levelSalesTitle"
                            v-on:change="filterDropdow"
                            v-model="txtSearch"
                            @focus.native="$event.target.select()"
                            readonly
                            :class="tempId"
                          ></md-input>
                          <md-button
                            class="md-icon-button"
                            @click.native="showAutocom = true"
                          >
                            <md-icon style="padding-top: 1px"
                              >arrow_drop_down</md-icon
                            >
                          </md-button>
                        </md-input-container>
                        <md-card
                          class="text-autocomplete"
                          v-if="showAutocom"
                          :style="{ width: widthTag + 'px' }"
                        >
                          <div
                            class="no-data-promo"
                            v-if="dropdown.length == 0"
                          >
                            <span>No data....</span>
                          </div>
                          <ul class="md-list" v-else>
                            <li
                              class="md-list-item"
                              v-for="(item, index) in dropdown"
                              :key="'cg' + index"
                            >
                              <div
                                class="md-list-item-row"
                                @click="selectLevelSales(item)"
                              >
                                <div style="long-row">
                                  <span class="descript"
                                    >{{ item.title }}&nbsp;</span
                                  >
                                  <span v-if="item.code != ''">{{
                                    item.code
                                  }}</span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </md-card>
                      </div>
                    </div>
                  </md-layout>
                  <md-layout md-flex="40" md-align="end">
                    <div style="width: 60%; padding-right: 40px" class="pt-5">
                      <md-search-box
                        :placeholder="'Search'"
                        :data="[]"
                        @clear="keywordPurCLR"
                        :value="keywordPur"
                        @filter="keywordPurFil"
                      ></md-search-box>
                    </div>
                  </md-layout>
                </md-layout>

                <div
                  style="
                    width: 100%;
                    display: flex;
                    font-size: 16px;
                    font-family: roboto;
                    font-weight: bold;
                    margin-top: 15px;
                    padding-top: 10px;
                    padding-bottom: 10px;
                  "
                >
                  <div class="text-left" style="width: 46%"></div>
                  <div class="text-center" style="width: 16%">Total</div>
                  <div
                    class="number pt-2 text-right"
                    style="width: 10%; padding-right: 10px"
                  >
                    {{ formatNumber(totalPur_amount) }}
                  </div>
                  <div
                    class="number pt-2 text-right"
                    style="width: 10%; padding-right: 10px"
                  >
                    {{ formatNumber(totalPur_netamount) }}
                  </div>
                  <div
                    class="number pt-2 text-right"
                    style="width: 10%; padding-right: 10px"
                  >
                    {{ formatNumber(totalPur_budget) }}
                  </div>
                  <div class="text-left" style="width: 3%"></div>
                </div>

                <div :class="'head-table'" id="moreClick">
                  <div class="text-left" style="width: 9%">PO NO.</div>
                  <div class="text-left" style="width: 8%">PO. Date</div>
                  <div class="text-left" style="width: 8%">Approve Date</div>
                  <div class="text-left" style="width: 8%">Delivery Date</div>
                  <div class="text-left" style="width: 15%">Customer</div>
                  <div class="text-left" style="width: 14%">Salesman</div>
                  <div class="text-center" style="width: 10%">Total Amount</div>
                  <div class="text-center" style="width: 10%">Net Amount</div>
                  <div class="text-center" style="width: 8%">Used Budget</div>
                  <div class="text-center" style="width: 5%">Note</div>
                  <div class="text-left" style="width: 5%"></div>
                </div>
                <div
                  v-if="dataPurchase.length == 0"
                  style="margin-top: 10%; font-size: 15px; color: #a8a8a8"
                >
                  No Purchase Orders
                </div>
                <div
                  class="detail-blog"
                  style="
                    height: calc(100vh - 330px);
                    padding-left: 0px;
                    margin-right: 0px;
                  "
                >
                  <div
                    v-for="items in dataPurchase"
                    :key="items.po_no"
                    class="content-table"
                    style="font-family: roboto; padding-top: 7px"
                  >
                    <div class="number pt-2" style="width: 9%">
                      {{ items.po_no }}
                    </div>
                    <div class="number pt-2" style="width: 8%">
                      {{ showTime(items.po_date) }}
                    </div>
                    <div class="number pt-2" style="width: 8%">
                      {{ showTime(items.apv_apvdate) }}
                    </div>
                    <div class="number pt-2" style="width: 8%">
                      {{ showTime(items.delivery_date) }}
                    </div>
                    <div
                      class="descript pt-2"
                      style="
                        width: 15%;
                        font-family: kanit;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        padding-right: 8px;
                        overflow: hidden;
                      "
                    >
                      {{ items.cust_code }}
                      <span style="font-family: kanit">{{
                        items.customer_name_th
                      }}</span>
                      <md-tooltip md-direction="top">
                        <span style="font-family: kanit"
                          >{{ items.cust_code }}&nbsp;{{
                            items.customer_name_th
                          }}</span
                        >
                      </md-tooltip>
                    </div>
                    <div
                      class="descript pt-2"
                      style="
                        width: 14%;
                        font-family: kanit;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        padding-right: 8px;
                      "
                    >
                      {{ items.sm_code }}
                      <span style="font-family: kanit"
                        >{{ items.first_name }}&nbsp;{{ items.last_name }}</span
                      >
                      <md-tooltip md-direction="top">
                        <span style="font-family: kanit"
                          >{{ items.sm_code }}&nbsp;{{
                            items.first_name
                          }}&nbsp;{{ items.last_name }}</span
                        >
                      </md-tooltip>
                    </div>
                    <div
                      class="number pt-2 text-right"
                      style="width: 10%; font-size: 13px; font-family: roboto"
                    >
                      <span style="padding-right: 4px; color: #5a5a5a">฿</span>
                      {{ formatNumber(items.total_amount) }}
                    </div>
                    <div
                      class="number pt-2 text-right"
                      style="width: 10%; font-size: 13px; font-family: roboto"
                    >
                      <span style="padding-right: 4px; color: #5a5a5a">฿</span>
                      {{ formatNumber(items.total_netamount) }}
                    </div>
                    <div
                      class="number pt-2 text-right"
                      style="width: 8%; font-size: 13px; font-family: roboto"
                    >
                      {{ formatNumber(items.sum_budget) }}
                    </div>
                    <!-- <div class="number pt-2" style="width: 10%">{{items.balance}}</div> -->
                    <!-- <div class="text-right pt-2" style="width: 11%;font-size:13px;font-family:roboto">
                      <span style="padding-right:4px;color:#5A5A5A">฿</span>
                      {{formatNumber(items.invoice_value)}}
                    </div>-->
                    <div
                      :class="'number comment'"
                      style="width: 5%; text-align: center; padding-left: 15px"
                      @click="openComment($event, items)"
                      :id="'icon' + items.po_no"
                    >
                      <md-button
                        class="md-icon-button"
                        :style="{ background: renderComment(items) }"
                      >
                        <md-icon class="comment-btn">chat_bubble</md-icon>
                        <md-tooltip md-direction="top">Note</md-tooltip>
                      </md-button>
                    </div>

                    <div
                      class="number"
                      style="
                        width: 2%;
                        opacity: 0.54;
                        cursor: pointer;
                        padding-left: 3px;
                      "
                      @click="openDatail(items)"
                      :id="'detail' + items.po_no"
                    >
                      <md-icon>keyboard_arrow_right</md-icon>
                    </div>
                  </div>
                </div>
              </md-card>
            </md-layout>
          </md-tab>

          <!-- Purchase Order (MT) -->
          <md-tab
            id="tab-purchase-mt"
            :md-active="setActiveTab == 'purchasemt'"
            md-label="Purchase Order (MT)"
          >
            <md-layout md-flex="100" md-align="center">
              <md-spinner
                :md-size="150"
                :md-stroke="1"
                v-show="spinner"
                md-indeterminate
              ></md-spinner>

              <md-card class="tap-table">
                <md-layout md-flex="100" style="flex: unset">
                  <md-layout
                    md-flex="60"
                    style="
                      padding-left: 10px;
                      color: #414141;
                      font-family: lato;
                      font-size: 18px;
                    "
                  >
                    <div style="width: 40%">
                      <div style="display: -webkit-box; width: 94%">
                        <div
                          class="sales-period-box"
                          @mouseleave="purMouseLeave"
                        >
                          <md-card
                            class="sales-period-view-box"
                            @click.native="purShowmonth = true"
                          >
                            <md-card-content>
                              <div class="card-title">
                                <div
                                  :style="{
                                    'font-size':
                                      purSelectedDate.year == ''
                                        ? '12px'
                                        : '18px',
                                    'font-weight':
                                      purSelectedDate.year == '' ? '600' : '',
                                    'font-family': 'Roboto',
                                    width: '100%',
                                  }"
                                >
                                  <span
                                    >{{ purSelectedDate.month_name }}
                                    {{ purSelectedDate.year }}</span
                                  >
                                </div>
                              </div>
                              <md-icon>expand_more</md-icon>
                            </md-card-content>
                          </md-card>
                          <month-calendar2
                            ref="selectCalendar"
                            v-if="purShowmonth"
                            v-on:selectmonth="purSelectMonth"
                            v-on:selectyear="purSelectYear"
                            :year="purSelectedDate.year"
                            :month="purSelectedDate.month"
                            :displayRange="true"
                            :range="purSelectedDate.range"
                            :idTag="'datePickerId17'"
                          ></month-calendar2>
                        </div>
                      </div>
                      <div
                        style="
                          padding-left: 10px;
                          font-family: roboto;
                          font-size: 12px;
                          text-align: left;
                          padding-top: 5px;
                          color: #a8a8a8;
                        "
                      >
                        <span>Approve Date</span>
                      </div>
                    </div>

                    <div style="padding-left: 15px; width: 45%" class="pt-5">
                      <div
                        class="md-dropdown-box"
                        @mouseleave="mouseLeaveDropdow"
                      >
                        <md-input-container
                          md-theme
                          class="dropdown-box"
                          @click.native="getWidth($event)"
                        >
                          <md-input
                            @keypress.native="showAutocom = true"
                            @focus="openAutoCom"
                            :placeholder="levelSalesTitle"
                            v-on:change="filterDropdow"
                            v-model="txtSearch"
                            @focus.native="$event.target.select()"
                            readonly
                            :class="tempId"
                          ></md-input>
                          <md-button
                            class="md-icon-button"
                            @click.native="showAutocom = true"
                          >
                            <md-icon style="padding-top: 1px"
                              >arrow_drop_down</md-icon
                            >
                          </md-button>
                        </md-input-container>
                        <md-card
                          class="text-autocomplete"
                          v-if="showAutocom"
                          :style="{ width: widthTag + 'px' }"
                        >
                          <div
                            class="no-data-promo"
                            v-if="dropdown.length == 0"
                          >
                            <span>No data....</span>
                          </div>
                          <ul class="md-list" v-else>
                            <li
                              class="md-list-item"
                              v-for="(item, index) in dropdown"
                              :key="'cg' + index"
                            >
                              <div
                                class="md-list-item-row"
                                @click="selectLevelSales(item)"
                              >
                                <div style="long-row">
                                  <span class="descript"
                                    >{{ item.title }}&nbsp;</span
                                  >
                                  <span v-if="item.code != ''">{{
                                    item.code
                                  }}</span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </md-card>
                      </div>
                    </div>
                  </md-layout>

                  <md-layout md-flex="40" md-align="end">
                    <div style="width: 60%; padding-right: 40px" class="pt-5">
                      <md-search-box
                        :placeholder="'Search'"
                        :data="[]"
                        @clear="keywordPurCLR"
                        :value="keywordPur"
                        @filter="keywordPurFil"
                      ></md-search-box>
                    </div>
                  </md-layout>
                </md-layout>

                <!-- TOTAL -->
                <div
                  style="
                    width: 100%;
                    display: flex;
                    font-size: 16px;
                    font-family: roboto;
                    font-weight: bold;
                    margin-top: 15px;
                    padding-top: 10px;
                    padding-bottom: 10px;
                  "
                >
                  <div class="text-left" style="width: 46%"></div>
                  <div class="text-center" style="width: 16%">Total</div>
                  <div
                    class="number pt-2 text-right"
                    style="width: 10%; padding-right: 10px"
                  >
                    {{ formatNumber(totalPur_amount) }}
                  </div>
                  <div
                    class="number pt-2 text-right"
                    style="width: 10%; padding-right: 10px"
                  >
                    {{ formatNumber(totalPur_netamount) }}
                  </div>
                  <div
                    class="number pt-2 text-right"
                    style="width: 10%; padding-right: 10px"
                  >
                    {{ formatNumber(totalPur_budget) }}
                  </div>
                  <div class="text-left" style="width: 3%"></div>
                </div>

                <!-- HEAD TABLE -->
                <div :class="'head-table'" id="moreClick">
                  <div class="text-left" style="width: 9%">PO NO.</div>
                  <div class="text-left" style="width: 8%">PO. Date</div>
                  <!-- <div class="text-left" style="width: 8%">Approve Date</div> -->
                  <div class="text-left" style="width: 8%">Delivery Date</div>
                  <div class="text-left" style="width: 23%">Customer</div>
                  <div class="text-left" style="width: 14%">Salesman</div>
                  <div class="text-center" style="width: 10%">Total Amount</div>
                  <div class="text-center" style="width: 10%">Net Amount</div>
                  <div class="text-center" style="width: 8%">Used Budget</div>
                  <div class="text-center" style="width: 5%">Note</div>
                  <div class="text-left" style="width: 5%"></div>
                </div>

                <!-- TABLE -->
                <div
                  v-if="dataPurchase.length == 0"
                  style="margin-top: 10%; font-size: 15px; color: #a8a8a8"
                >
                  No Purchase Orders
                </div>
                <div
                  class="detail-blog"
                  style="
                    height: calc(100vh - 330px);
                    padding-left: 0px;
                    margin-right: 0px;
                  "
                >
                  <div
                    v-for="items in dataPurchase"
                    :key="items.po_no"
                    class="content-table"
                    style="font-family: roboto; padding-top: 7px"
                  >
                    <div class="number pt-2" style="width: 9%">
                      {{ items.po_no }}
                    </div>
                    <div class="number pt-2" style="width: 8%">
                      {{ showTime(items.po_date) }}
                    </div>
                    <!-- <div class="number pt-2" style="width: 8%">
                      {{ showTime(items.apv_apvdate) }}
                    </div> -->
                    <div class="number pt-2" style="width: 8%">
                      {{ showTime(items.delivery_date) }}
                    </div>
                    <div
                      class="descript pt-2"
                      style="
                        width: 23%;
                        font-family: kanit;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        padding-right: 8px;
                        overflow: hidden;
                      "
                    >
                      {{ items.cust_code }}
                      <span style="font-family: kanit">{{
                        items.customer_name_th
                      }}</span>
                      <md-tooltip md-direction="top">
                        <span style="font-family: kanit"
                          >{{ items.cust_code }}&nbsp;{{
                            items.customer_name_th
                          }}</span
                        >
                      </md-tooltip>
                    </div>
                    <div
                      class="descript pt-2"
                      style="
                        width: 14%;
                        font-family: kanit;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        padding-right: 8px;
                      "
                    >
                      {{ items.sm_code }}
                      <span style="font-family: kanit"
                        >{{ items.first_name }}&nbsp;{{ items.last_name }}</span
                      >
                      <md-tooltip md-direction="top">
                        <span style="font-family: kanit"
                          >{{ items.sm_code }}&nbsp;{{
                            items.first_name
                          }}&nbsp;{{ items.last_name }}</span
                        >
                      </md-tooltip>
                    </div>
                    <div
                      class="number pt-2 text-right"
                      style="width: 10%; font-size: 13px; font-family: roboto"
                    >
                      <span style="padding-right: 4px; color: #5a5a5a">฿</span>
                      {{ formatNumber(items.total_amount) }}
                    </div>
                    <div
                      class="number pt-2 text-right"
                      style="width: 10%; font-size: 13px; font-family: roboto"
                    >
                      <span style="padding-right: 4px; color: #5a5a5a">฿</span>
                      {{ formatNumber(items.total_netamount) }}
                    </div>
                    <div
                      class="number pt-2 text-right"
                      style="width: 8%; font-size: 13px; font-family: roboto"
                    >
                      {{ formatNumber(items.sum_budget) }}
                    </div>
                    <div
                      :class="'number comment'"
                      style="width: 5%; text-align: center; padding-left: 15px"
                      @click="openComment($event, items)"
                      :id="'icon' + items.po_no"
                    >
                      <md-button
                        class="md-icon-button"
                        :style="{ background: renderComment(items) }"
                      >
                        <md-icon class="comment-btn">chat_bubble</md-icon>
                        <md-tooltip md-direction="top">Note</md-tooltip>
                      </md-button>
                    </div>

                    <div
                      class="number"
                      style="
                        width: 2%;
                        opacity: 0.54;
                        cursor: pointer;
                        padding-left: 3px;
                      "
                      @click="openDatailEDI(items)"
                      :id="'detail' + items.po_no"
                    >
                      <md-icon>keyboard_arrow_right</md-icon>
                    </div>
                  </div>
                </div>
              </md-card>
            </md-layout>
          </md-tab>
        </md-tabs>
      </md-layout>
    </div>
    <md-comment-dialog
      :title="'Notes'"
      @close="closeComment"
      @reply="replyComment"
      @read="readComment"
      :data="comment"
      :option="commentOpt"
    ></md-comment-dialog>
    <md-dialog ref="pageBudgetDG" id="pageBudgetDG" class="md-orders-view">
      <div
        style="
          position: absolute;
          z-index: 101;
          margin-left: 40%;
          margin-top: 25%;
        "
      >
        <md-spinner
          :md-size="150"
          :md-stroke="1"
          v-show="spinnerDG"
          md-indeterminate
        ></md-spinner>
      </div>
      <md-orders-view
        @close="closeDG"
        :data="detail"
        @read="readComment"
        @reply="replyCommentDG"
      ></md-orders-view>
    </md-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import dateFunc from "../Salesops/fullCalendar/dateFunc";
export default {
  name: "orders-budget",
  data() {
    let random = Math.random();
    return {
      keywordDis: "",
      keywordPur: "",
      commentOpt: {
        display: false,
        top: 0,
        left: 0,
      },
      disDate: {
        year: dateFunc.format(new Date(), "yyyy"),
        month_id: dateFunc.format(new Date(), "MM"),
      },
      disShowmonth: false,
      purShowmonth: false,
      setActiveTab: "discount",
      evenChangeTab: "",
      showAutocom: false,
      showAutocom_channel: false,
      cancelSearch: false,
      txtSearch: "",
      txt_channel: "All Channel",
      widthTag: 0,
      tempId: random + "w",
      totalDis_limit: 0,
      totalDis_used: 0,
      totalDis_balance: 0,
      totalPur_amount: 0,
      totalPur_netamount: 0,
      totalPur_budget: 0,
      pageName: "",
      channel_code_filter: "",
      dropdown_channel: [
        { channel_code: "", title_channel: "All Channel" },
        { channel_code: "100", title_channel: "กลุ่มลูกค้า TT" },
        { channel_code: "200", title_channel: "กลุ่มลูกค้า MT" },
        { channel_code: "300", title_channel: "กลุ่มลูกค้า MTT" },
      ],
    };
  },
  computed: {
    dataDiscount() {
      let dataDiscount = this.$store.getters["budget/dataDiscount"];
      this.totalDis_limit = dataDiscount.reduce(
        (acc, row) => acc + parseFloat(row.limit.replace(/,/g, "")),
        0
      );
      this.totalDis_used = dataDiscount.reduce(
        (acc, row) => acc + parseFloat(row.used.replace(/,/g, "")),
        0
      );
      this.totalDis_balance = dataDiscount.reduce(
        (acc, row) => acc + parseFloat(row.balance.replace(/,/g, "")),
        0
      );
      // console.log(row.used)
      return this.$store.getters["budget/dataDiscount"];
    },
    dataPurchase() {
      let dataPurchase = this.$store.getters["budget/dataPurchase"];
      this.totalPur_amount = dataPurchase.reduce(
        (acc, row) => acc + parseFloat(row.total_amount),
        0
      );
      this.totalPur_netamount = dataPurchase.reduce(
        (acc, row) => acc + parseFloat(row.total_netamount),
        0
      );
      this.totalPur_budget = dataPurchase.reduce(
        (acc, row) => acc + parseFloat(row.sum_budget),
        0
      );
      return this.$store.getters["budget/dataPurchase"];
    },
    spinner() {
      return this.$store.getters["budget/spinner"];
    },
    dropdown() {
      return this.$store.getters["budget/dropdown"];
    },
    levelSalesTitle() {
      return this.$store.getters["budget/levelSalesTitle"];
    },
    comment() {
      return this.$store.getters["budget/comment"];
    },
    disSelectedDate() {
      return this.$store.getters["budget/dis_selected_date"];
    },
    purSelectedDate() {
      return this.$store.getters["budget/pur_selected_date"];
    },
    spinnerDG() {
      return this.$store.getters["budget/spinnerDG"];
    },
    detail() {
      return this.$store.getters["budget/detail"];
    },
  },
  watch: {
    // keyword(val) {
    //   this.filterList(val);
    // }
  },
  methods: {
    // openSelectDP() {
    //   this.displayDP = true;
    // },
    showTime(value) {
      return moment(new Date(value)).format("DD/MM/YYYY");
      // return moment(new Date(value)).format("DD-MM-YYYY");
    },
    select_channel(value) {
      this.channel_code_filter = value.channel_code;
      this.showAutocom_channel = false;
      if (value.channel_code != "") {
        this.txt_channel = value.channel_code + " : " + value.title_channel;
      } else {
        this.txt_channel = value.title_channel;
      }
      // this.txtSearch = value.code + " " + value.title;

      this.$store.dispatch("budget/getDiscountList", value);
    },
    selectLevelSales(value) {
      this.showAutocom = false;
      // this.txtSearch = value.code + " " + value.title;
      this.txtSearch = value.title + " " + value.code;
      this.cancelSearch = true;
      this.$store.dispatch("budget/selectLevelSales", value);
    },

    keywordDisCLR() {
      this.keywordDis = "";
      this.filterList("discount", "");
    },
    keywordDisFil(val) {
      this.keywordDis = val;
      this.filterList("discount", val);
    },

    keywordPurFil(val) {
      this.keywordPur = val;
      this.filterList("purchase", val);
    },
    keywordPurCLR() {
      this.keywordPur = "";
      this.filterList("purchase", "");
    },
    filterList(type, param) {
      let t = this;
      setTimeout(() => {
        if (type == "discount") {
          t.$store.dispatch("budget/filterDis", param);
        } else {
          t.$store.dispatch("budget/filterPur", param);
        }
      }, 20);
    },
    onChange(tabIndex) {
      console.log(
        "🚀 ~ file: Budget.vue ~ line 909 ~ onChange ~ tabIndex",
        tabIndex
      );
      if (tabIndex == 0) {
        this.setActiveTab = "discount";
        this.evenChangeTab = "";
      } else if (tabIndex == 1) {
        this.setActiveTab = "purchase";
        if (this.evenChangeTab == "") {
          this.evenChangeTab = "detailPurchase";
          this.$store.dispatch("budget/getPurchaseList");
        }
      } else {
        this.setActiveTab = "purchasemt";
      }
    },
    onTabClick(event) {
      // console.log("onTabClick",event);
    },
    readComment(data) {
      this.$store.dispatch("budget/readComment", data);
    },
    closeComment() {
      this.commentOpt.display = false;
    },
    replyCommentDG(value) {
      if (this.comment.length == 0) {
        value.emp_id_start = Vue.localStorage.get("emp_id");
      } else {
        value.emp_id_start = this.comment[this.comment.length - 1].emp_id_start;
      }

      value.msg_to = "";
      value.emp_id_start = "";
      value.head_id = value.h_id;
      value.doc_no = value.doc_no;

      this.$store.dispatch("budget/replyComment", value);
    },
    replyComment(value) {
      if (value != null) {
        if (this.comment.length == 0) {
          value.emp_id_start = Vue.localStorage.get("emp_id");
        } else {
          value.emp_id_start = this.comment[
            this.comment.length - 1
          ].emp_id_start;
        }

        value.msg_to = "";
        value.emp_id_start = "";
        value.head_id = this.keepRow.h_id;
        value.doc_no = this.keepRow.doc_no;

        this.$store.dispatch("budget/replyComment", value);
      }
    },
    openComment(e, items) {
      let pageX = e.pageX;

      if (pageX == 0) {
        let comment = document.getElementById("icon" + items.doc_no);
        pageX = comment.offsetLeft + 270;
      }
      let masterScreenW = window.screen.height;

      let H = e.y + 200;
      if (H > masterScreenW) {
        let total = H - masterScreenW;

        this.commentOpt.top = e.y - total;
      } else {
        this.commentOpt.top = e.y;
      }
      this.commentOpt.left = pageX - 270;
      this.commentOpt.display = true;
      this.keepRow = items;
      this.$store.dispatch("budget/getComment", items);
    },
    renderComment(value) {
      if (value.order_status == "REJ") {
        return "#F44336";
      } else if (value.note_status == false && value.order_status !== "REJ") {
        return "#FD7F00";
      } else {
        return "#C9C9C9";
      }
    },

    disSelectMonth(value, even = null) {
      let date = this.$store.getters["budget/dis_selected_date"];
      if (even == "purSelect") {
        if (value.mode == "period") {
          date.month_id = value.month.id;
          date.month = value.month.value;
          date.year = value.year;
          this.disDate.month_id = value.month.id;
          this.disDate.year = value.year;
        } else {
          var range = value.range.split("/");
          date.month_id = moment(range[0]).format("MM");
          date.month = moment(range[0]).format("MMMM");
          date.year = value.year;
          this.disDate.month_id = moment(range[0]).format("MM");
          this.disDate.year = value.year;
        }
        this.$store.dispatch("budget/getDiscountList");
      } else {
        date.month_id = value.month.id;
        date.month = value.month.value;
        date.year = value.year;
        this.disDate.month_id = value.month.id;
        this.disDate.year = value.year;
        this.purSelectMonth(value, "disSelect");
        this.$store.dispatch("budget/getDiscountList");
      }
      this.hideCalendar();
    },
    disSelectyear(value) {
      this.disDate.year = value.year;
    },
    purSelectMonth(value, even = null) {
      let date = this.$store.getters["budget/pur_selected_date"];
      if (even == "disSelect") {
        date.month = value.month.id;
        date.month_name = value.month.value;
        date.year = value.year;
        date.range = "-";
      } else {
        if (value.mode == "range") {
          var range = value.range.split("/");
          let start = moment(range[0]).format("DD MMM YYYY");
          let end = moment(range[1]).format("DD MMM YYYY");
          date.month = "";
          date.month_name = value.range;
          date.year = "";
          date.range = value.range;
        } else {
          date.month = value.month.id;
          date.month_name = value.month.value;
          date.year = value.year;
          date.range = "-";
        }
        this.disSelectMonth(value, "purSelect");
        this.$store.dispatch("budget/getPurchaseList");
      }
      this.purhideCalendar();

      // this.$store.dispatch("budget/getPurchaseList");
    },
    purSelectYear(value) {
      let date = this.$store.getters["budget/pur_selected_date"];
      date.year = value.year;
      // this.disDate.year = value.year;
    },
    openMonth() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_SelectMonth;
      key.eventLabel = "SelectMonth:" + emp_id;
      this.$ga.event(key);

      this.disShowmonth = true;
    },
    mouseLeave: function () {
      if (this.disShowmonth == true) {
        this.disShowmonth = false;
      }
    },
    hideCalendar: function () {
      this.disShowmonth = false;
    },
    openDatail(value) {
      this.$store.dispatch("budget/getOrderById", value);
      this.$refs["pageBudgetDG"].open();
    },
    openDatailEDI(value) {
      Vue.localStorage.set("budget_detail", JSON.stringify(value));
      let sub_menu_edis = JSON.parse(Vue.localStorage.get("sub_menu_edi"));
      let row = _.find(sub_menu_edis, function (o) {
        return o.m_code == "ediorders";
      });
      if (!_.isUndefined(row)) {
        var m_path = row.m_path.replace("/edi/", "");
        // location.href = "edi/#/" + m_path;
        window.open("edi/#/" + m_path);
      }
    },
    closeDG() {
      this.$refs["pageBudgetDG"].close();
    },
    openPurchase(value) {
      console.log(
        "🚀 ~ file: Budget.vue ~ line 1095 ~ openPurchase ~ value",
        value
      );
      var rs = _.find(this.dropdown, function (o) {
        return o.code == value.role_code;
      });
      if (!_.isUndefined(rs) && value.channel != 200) {
        this.evenChangeTab = "detailPurchase";
        let values = {
          code: value.role_code,
          title: value.name,
        };
        this.selectLevelSales(values);
        this.setActiveTab = "purchase";
      } else {
        this.evenChangeTab = "detailPurchase";
        let values = {
          code: value.role_code,
          title: value.name,
        };
        this.setActiveTab = "purchasemt";
      }
    },

    filterDropdow_channel(param) {
      console.log(
        "🚀 ~ file: Budget.vue ~ line 1162 ~ filterDropdow_channel ~ param",
        param
      );
      if (param.length > 2) {
        // this.cancelSearch = true;
        // this.$emit("filter", param.trim());
      } else {
        // this.cancelSearch = false;
        // this.$emit("filter", "");
      }
    },
    filterDropdow(param) {
      if (param.length > 2) {
        this.cancelSearch = true;
        this.$emit("filter", param.trim());
      } else {
        this.cancelSearch = false;
        this.$emit("filter", "");
      }
    },
    mouseLeaveDropdow() {
      if (this.showAutocom == true) {
        this.showAutocom = false;
        this.txtSearch = "";
      }
    },
    mouseLeaveDropdow_channel() {
      if (this.showAutocom_channel == true) {
        this.showAutocom_channel = false;
        this.txtSearch_channel = "";
      }
    },
    getWidth(e) {
      // this.widthTag = e.path[2].offsetWidth;
       this.widthTag =  e.srcElement.clientWidth

    },
    openAutoCom() {
      this.showAutocom = true;
    },
    openAutoCom_channel() {
      this.showAutocom = true;
    },
    purhideCalendar: function () {
      this.purShowmonth = false;
    },
    purMouseLeave: function () {
      if (this.purShowmonth == true) {
        this.purShowmonth = false;
      }
    },
    sumDataDis() {
      this.totalDis = this.dataDiscount.reduce(
        (acc, row) => acc + parseFloat(row.used),
        0
      );
      console.log(row.used);
    },
    formatNumber(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.login = true;
      this.$store.dispatch("setPathMenuService", "orders");
      let menu = this.$store.getters["displayMenu"];
      let path = this.$router.app._route.path.split("/");
      let pathFull = this.$router.app._route.path;
      let head = _.filter(menu, (item) => {
        if (item.m_code == path[1]) {
          return true;
        }
      });
      if (head.length > 0) {
        let sub = _.filter(head[0].sub_menu, (item) => {
          if (item.m_path == pathFull) {
            return true;
          }
        });
        if (sub.length > 0) {
          this.pageName = sub[0].m_name;
        }
      }

      let dateDis = this.$store.getters["budget/dis_selected_date"];
      dateDis.year = dateFunc.format(new Date(), "yyyy");
      dateDis.month_id = dateFunc.format(new Date(), "MM");
      dateDis.month = dateFunc.format(new Date(), "MMMM");
      let datePur = this.$store.getters["budget/pur_selected_date"];
      datePur.year = dateFunc.format(new Date(), "yyyy");
      datePur.month = dateFunc.format(new Date(), "MM");
      datePur.month_name = dateFunc.format(new Date(), "MMMM");
      datePur.range = "-";
      this.$store.dispatch("budget/getDiscountList");
      // this.$store.dispatch("budget/getLevelSales");
    }
  },
  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
    "md-search-box": require("./myorder-component/md-search-box"),
    "md-comment-dialog": require("../Salesops/customComponent/md-comment-dialog"),
    "month-calendar": require("../Salesops/customComponent/mds-month-calendar"),
    "md-orders-view": require("./budget-component/md-orders-view"),
    "month-calendar2": require("../Salesops/customComponent/mds-month-calendarV2"),
  },
};
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-roboto: Roboto;
$font-kanit: Kanit;
#tabBudget {
  width: 94%;

  .md-taps {
    width: 94%;
    padding-bottom: 10px;
    background: #efefef !important;
    height: 400px;
    // height: 550px;
  }
  .md-taps .md-tap {
    padding-top: 0px !important;
    padding-left: 0px !important;
    padding-bottom: 0px !important;
    padding-right: 0px !important;
  }
}
#pageBudget {
  .pt-2 {
    padding-top: 2px;
  }
  .md-dropdown-box {
    background-color: white;
    height: 63%;
    border-radius: 4px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
    color: rgb(65, 65, 65);
  }
  .head-table {
    font-family: roboto;
    opacity: 0.54;
    margin-top: 20px;
    display: flex;
    padding-bottom: 15px;
    padding-left: 25px;
    font-size: 12px;
    font-weight: 600;
    .md-icon {
      cursor: pointer;
    }
    .md-taps .md-tap {
      padding-top: 0px !important;
      padding-left: 0px !important;
      padding-bottom: 0px !important;
      padding-right: 0px !important;
    }
  }
  .tap-table {
    // height: 400px;
    width: 100%;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-top: 20px;
    box-shadow: 0px 0px 3px 0px unquote("#00000029");
    .detail-blog {
      overflow-y: auto;
      overflow-x: hidden;
      text-align: left !important;
      background-color: white;
      padding: 0px !important;
      padding-left: 0px;
      width: 100%;
      height: 360px;
      &::-webkit-scrollbar {
        height: 5px;
        width: 6px;
        background-color: white;
      }
      &::-webkit-scrollbar-thumb {
        background: #a8a8a8;
        border-radius: 3px;
      }
      .content-table {
        display: flex;
        padding-bottom: 5px;
        padding-top: 7px;
        padding-left: 10px;
        .hover-row:hover {
          color: #fd7f00 !important;
          cursor: pointer;
        }
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
  .sales-period-box .sales-period-view-box {
    height: 45px;
  }
  .md-tabs .md-tab {
    padding: 0px;
  }

  .comment {
    .md-button.md-icon-button {
      width: 24px;
      min-width: 24px;
      height: 24px;
      min-height: 24px;
      .md-icon {
        font-size: 13px;
        color: #ffffff;
        padding-top: 5px;
      }
    }
  }
  .md-spinner {
    position: absolute;
    z-index: 10;
    padding-top: 400px;
  }
  .md-dropdown-box {
    width: 100%;
    .md-input {
      cursor: pointer;
    }
    .md-input-container input {
      font-family: $font-kanit;
      padding-top: 8px;
      font-size: 18px;
      font-weight: normal;
      // color: rgba(0, 0, 0, 0.87);
    }
    .md-input-container {
      height: 40px;
      min-height: 40px;
      margin: 0px;
      padding-top: 0px;
      padding-bottom: 0px;
      padding-right: 0px;
      padding-left: 20px;
      .md-icon {
        padding: unset;
      }
      .md-input-placeholder input {
        font-size: 22px;
      }
      .md-has-value input {
        font-size: 22px;
      }
    }
    .md-input-container:after {
      content: none;
    }
    .text-autocomplete {
      position: absolute;
      z-index: 31;
      // width: 100%;
      max-height: 250px;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
      padding: 5px 0 10px 0;
      overflow-x: hidden;
      font-size: 14px;
      .no-data-promo {
        margin-top: 15px;
        text-align: center;
      }
      .md-list-item {
        color: #5a5a5a;
        padding: 0 0 0 0;
        font-family: $font-roboto;

        .md-list-item-row {
          padding-top: 6px;
          display: flex;
          font-family: $font-lato;
          padding-bottom: 6px;
          padding-right: 20px;
          padding-left: 20px;
          text-align: left;
        }
        .long-row {
          white-space: nowrap;
          text-overflow: ellipsis;
          display: block;
          overflow: hidden;
        }
        .descript {
          font-family: $font-kanit;
        }
      }
      .md-list-item:hover {
        background: #efefef;
        cursor: pointer;
      }
    }
    .text-autocomplete::-webkit-scrollbar {
      height: 5px;
      width: 5px;
      background: #f7f7f7;
    }
    .text-autocomplete::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.11);
      border-radius: 5px;
    }
    & .dropdown-box {
      box-shadow: 0 0 0.8px rgba(0, 0, 0, 0.16);
    }
  }
}
</style>
