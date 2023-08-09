<template>
  <div>
    <div style="position: absolute;z-index: 101;margin-left:40%;margin-top:25%">
      <md-spinner
        :md-size="150"
        :md-stroke="1"
        md-indeterminate
        v-show="$store.getters['myorders/spinner_order']"
      ></md-spinner>
    </div>
    <div
      v-show="$store.getters['myorders/spinner_order']"
      style="position: absolute;z-index: 100;width: 100%;
                  height: 100%;background: #EFEFEF;
                  opacity: 0.1;"
    ></div>
    <div
      v-show="$store.getters['myorders/spinner_order_vd']"
      style="position: absolute;z-index: 100;width: 100%;
                  height: 100%;background: #EFEFEF;
                  opacity: 0.1;"
    ></div>

    <div class="md-dialog-title">
      <md-layout>
        <md-layout md-flex-large="70">
          <label class="sub-title kanitFont">{{ titleOrder }}</label>
          <!-- ===>{{info.delivery_date_cipher}} -->
        </md-layout>
        <md-layout md-flex-large="30" md-align="end">
          <md-icon
            @click.native="checkCLose('orders')"
            style="cursor:pointer;margin-right:30px"
            >close</md-icon
          >
        </md-layout>
      </md-layout>
    </div>
    <div
      class="md-dialog-content"
      :style="{ 'padding-right': '15px', position: 'inherit' }"
    >
      <div
        class="scroll-main-table"
        :style="{
          height: 'calc(100vh - 180px)',
          'overflow-y': 'auto !important',
          'padding-right': '2px',
          'padding-left': '1px',
        }"
      >
        <md-flow-bar
          :data="flowList"
          style="margin:14px 0 0 0px"
          v-if="renderFlow()"
        ></md-flow-bar>
        <customer-info
          @click.native="showCustomereInfo"
          style="margin-right:5px"
        ></customer-info>
        <md-layout
          md-flex="100"
          class="pt-20"
          v-sticky="{ zIndex: 20, stickyTop: 0 }"
          style="background:#FFF"
        >
          <div class="mt-10" style="width:15%">ITEMS IN MY ORDER</div>
          <md-search-checkbox
            style="width:43%;"
             :id="`search_product`"
            :placeholder="'Add with Product Code'"
            :data="$store.getters['myorders/master_cg']"
            :disabled="renderCnk('searchcg')"
            @submit="submitSearch"
            @filter="filterItems"
            @clear="clearSearch"
            @chooseitem="selectItem"
            @choosecg="selectCG"
            @nextFocus="nextFocus"
            @click.native="showCheckDisable"
          ></md-search-checkbox>
          <div style="width:27%;text-align: -webkit-right;">
            <md-button
              :disabled="renderCnk('addmore')"
              :class="renderCnk('addmore') ? '-gray-A8' : '-orange'"
              style="height:36px;margin:0px 10px 0px 0px;border-radius:3px;font-size:12px"
              @click="showAllProduct"
            >
              <md-icon style="margin-right:7px">search</md-icon>MORE
            </md-button>
            <md-button
              :disabled="renderCnk('addpromo')"
              :class="renderCnk('addpromo') ? '-gray-A8' : '-orange'"
              style="height:36px;margin:unset;border-radius:3px;font-size:12px"
              @click="showPromotion"
            >
              <md-icon style="margin-right:7px">add</md-icon>PROMOTION
            </md-button>
          </div>
          <div class="topic" style="width:10%;text-align: -webkit-right;">
            <md-button
              class="md-icon-button"
              @click="openCF('dupfreeitem')"
              style="margin:unset"
              :disabled="disabledIcon('dupfg')"
            >
              <md-icon
                :style="{
                  color:
                    unitBtn && disabledIcon('dupfg') == false
                      ? '#ff9800'
                      : '#C9C9C9',
                  'margin-top': '',
                  cursor: renderCnk('dupfg') ? 'context-menu' : 'pointer'
                }"
                >card_giftcard</md-icon
              >
              <md-tooltip md-direction="top">Free Gift</md-tooltip>
            </md-button>
            <md-button
              class="md-icon-button"
              @click="openCF('delete')"
              style="margin:unset"
              :disabled="!keepRouter"
            >
              <md-icon
                :style="{
                  color: delBtn ? '#ff9800' : '#C9C9C9',
                  'margin-top': '',
                  'margin-left': '10px',
                  cursor: renderCnk() ? 'context-menu' : 'pointer'
                }"
                >delete_sweep</md-icon
              >
              <md-tooltip md-direction="top">Delete</md-tooltip>
            </md-button>
          </div>
          
        </md-layout>
        <md-layout
          md-flex="100"
          style="margin-top:10px;"
          class="md-promotion-table"
        >
          <div
            class="head-table"
            v-sticky="{ zIndex: 10, stickyTop: 60 }"
            style="background:#FFF;margin-right:0px !important;padding-top:5px"
          >
            <div style="width:3%;" class="md-search-checkbox">
              <input
                type="checkbox"
                v-model="headChk"
                :disabled="renderCnk('checkbox')"
                style="height: 20px;width: 20px"
                @change="checkAllItem($event)"
              />
            </div>
            <div
              :style="{
                width:
                  info.order_status == 'SAPV' || info.order_status == 'APV'
                    ? '32%'
                    : '36%'
              }"
            >
              Item.
            </div>
            <div style="text-align:right;width: 7.5%;">PPU</div>
            <div style="text-align:right;width: 10%;">VD</div>
            <div style="text-align:right;width: 10%;">Price</div>
            <div style="width:2%;"></div>
            <div style="text-align:center;width: 4.5%;">%</div>
            <div style="text-align:right;width: 7%;padding-left:0.5%">
              Order Qty
            </div>
            <div
              style="text-align:right;width: 5.5%;padding-left:0.5%"
              v-if="info.order_status == 'SAPV' || info.order_status == 'APV'"
            >
              Inv.
            </div>
            <div style="width:5%;"></div>
            <div style="width:6%;"></div>
            <div style="width:13.5%;text-align:right;padding-right:2%;">
              Amount
            </div>
          </div>
          <div
            class="detail-scroll-table"
            @scroll="handleScroll"
            style="overflow-y:hidden !important"
          >
            <div
              class="detail-table"
              :style="{
                'margin-top': index == 0 ? '5px' : '3px',
                'margin-bottom':
                  items.length == 1 || items.length == index + 1
                    ? '20px'
                    : '0px'
              }"
              v-for="(row, index) in items"
              :key="'tbitems' + index"
            >
              <div style="width:3%;padding-top:2px" class="md-search-checkbox">
                <input
                  type="checkbox"
                  v-model="row.checked"
                  :disabled="renderCnk('checkboxchild', row)"
                  style="height: 20px;width: 20px;"
                  @change="
                    $store.dispatch('myorders/checkByItems', {
                      indexDetail: index,
                      indexPrarent: 'item'
                    })
                  "
                />
              </div>
              <div
                :style="{
                  width:
                    info.order_status == 'SAPV' || info.order_status == 'APV'
                      ? '27.5%'
                      : '31.5%',
                  'padding-top': '5px',
                  'font-style': italic(row) ? 'italic' : 'normal'
                }"
              >
                {{ row.item_code }}
                <label style="font-family:kanit;"
                  >&nbsp;&nbsp;{{ row.item_name }}</label
                >
              </div>
              <div style="width:9.5%;padding-top:5px;" class="text-right">
                ฿ {{ formatNumber(row.ppu) }}
              </div>
              <div style="width:9.5%;padding-top:5px;" class="text-right">
                <span
                  :style="{
                    visibility: showBath(row, 'show') ? 'visible' : 'hidden'
                  }"
                  >฿</span
                >
                {{ showBath(row, 'value') }}
              </div>
              <div
                class="ipt-table text-right netpriceCls"
                :style="{
                  'padding-left': '1%',
                  width: '10%',
                  display: '-webkit-box'
                }"
              >
                <template>
                  <mds-input
                    :ref="`item_${row.id}`"
                    :class="warningStock(row)"
                    :id="'netprice-' + row.id + '-' + row.flag_status"
                    v-model="row.price"
                    :table="'ppuItem'"
                    :index="index"
                    :indexDetail="index"
                    type="detail"
                    :readOnly="!row.editMode"
                  ></mds-input>
                </template>
              </div>
              <div
                :style="{
                  width: '2%',
                  visibility: renderEditIcon(row) ? 'visible' : 'hidden'
                }"
                @click="
                  editNetPrice(
                    { indexDetail: index, row: row, indexParent: 'no' },
                    $event
                  )
                "
              >
                <md-icon
                  v-if="!italic(row)"
                  class="edit-net-price"
                  :style="{ cursor: renderCnk() ? 'context-menu' : 'pointer' }"
                  >edit</md-icon
                >
              </div>
              <div style="width:5%;padding-top:5px;" class="text-center">
                {{ countDiscount(row, true) }}
              </div>
              <div style="width:5.5%;padding-left:1%;" class="ipt-table">


                <template>
                  <mds-input
                    v-model="row.order_qty"
                     @keydown.tab.prevent.native="nextFocus(index)"
                       :id="`item_order_qty_`+index"
                    :table="'qtyItem'"
                    :index="index"
                    :errorMsg="row.error_stock"
                    type="detail"
                    :readOnly="renderCnk('qtyItem', row)"
                  ></mds-input>
                </template>

                
              </div>
              <div
                style="width:5.5%;padding-left:1%;padding-top:5px;text-align:right"
                class="ipt-table"
                v-if="info.order_status == 'APV' || info.order_status == 'SAPV'"
              >
                {{ formatNumberInt(row.inv_sale_qty) }}
              </div>
              <div
                style="width:5%;padding-top:7px;padding-left:1%"
                class="unit"
              >
                {{ row.unit }}
              </div>
              <div
                :style="{
                  width: ':2.5%',
                  visibility:
                    renderVD(row) == true &&
                    row.order_qty > 0 &&
                    row.flag_status != 'F' &&
                    row.flag_status != 'FV'
                      ? 'visible'
                      : 'hidden',
                  cursor: renderCnk() ? 'context-menu' : 'pointer',
                  background:
                    (keepRouter && info.order_status == 'DRF') ||
                    info.order_status == 'REC'
                      ? '#fd7f00'
                      : 'rgb(201, 201, 201)'
                }"
                :class="'vol-discount'"
                @click="openVolumeDis($event, row, index)"
              >
                <span>%</span>
                <md-tooltip md-direction="top">Volume discount</md-tooltip>
              </div>
              <div style="width:6%;padding-top:5px">
                <!-- 
                =>{{row.vd_price_code}}
                =>{{row.flag_status}}
                =>{{row.budget}}
                =>{{row.price_policy_code}}
                =>{{row.price_code}}
                -->
                <!-- =>{{row.last_discount}} -->
                <!-- =>{{row.flag_status}}  -->
                <!-- {{row.net_price}} -->
                <!-- =>{{row.net_amount}} -->
                <div
                  class="md-rectangle-tag"
                  v-if="row.unit_type != 'INNER' && row.unit_type != 'selling'"
                >
                  <div class="rectangle-text">{{ row.unit_type }}</div>
                </div>
              </div>
              <div
                :style="{
                  width: '9%',
                  'padding-top': '5px',
                  'padding-right': '1%',
                  'white-space': 'nowrap'
                }"
                class="text-right"
              >
                ฿ {{ formatNumber(row.amount) }}
              </div>
            </div>
            <!--PROMOTION PROMO-->
            <div
              class="detail-table"
              :style="{
                'margin-top': indexMom == 0 ? '7px' : '3px',
                display: 'inline-block'
              }"
              v-for="(rowMom, indexMom) in itemsPromo"
              :key="'tbpromo' + indexMom"
            >
              <div
                :style="{
                  'padding-top': items == 0 ? '0px' : '0px',
                  width: '100%',
                  display: 'flex'
                }"
              >
                <div class="md-search-checkbox">
                  <input
                    type="checkbox"
                    v-model="rowMom.checked"
                    :disabled="renderCnk()"
                    style="height: 20px;width: 20px;"
                    @change="
                      $store.dispatch('myorders/checkByItems', {
                        indexDetail: indexMom,
                        indexPrarent: 'promo'
                      })
                    "
                  />
                </div>
                <div
                  @click="showDetails(indexMom)"
                  class="title-promo"
                  :style="{
                    'padding-top': '8px',
                    'padding-left': '10px',
                    width: countLetter(rowMom.promo_code, 25) ? '255px' : '',
                    'white-space': countLetter(rowMom.promo_code, 25)
                      ? 'nowrap'
                      : 'normal',
                    'text-overflow': countLetter(rowMom.promo_code, 25)
                      ? 'ellipsis'
                      : 'unset',
                    display: countLetter(rowMom.promo_code, 25)
                      ? 'block'
                      : '-webkit-box',
                    overflow: countLetter(rowMom.promo_code, 25)
                      ? 'hidden'
                      : 'hidden',
                    cursor: 'pointer'
                  }"
                >
                  {{ rowMom.promo_code }}
                  <md-icon
                    v-if="!checkEnddate(rowMom.promo_code)"
                    style="color:#F44336;font-size:20px;padding-top:1px;margin-left:20px"
                    >warning</md-icon
                  >
                  <div
                    v-if="!checkEnddate(rowMom.promo_code)"
                    style="color:#F44336;font-family:lato;font-size:14px;font-wight:500;padding-top:1px;margin-left:7px"
                  >
                    Promotion Expired
                  </div>
                  <md-tooltip
                    v-if="countLetter(rowMom.promo_code, 25)"
                    md-direction="top"
                    class="mds-tooltips"
                    >{{ rowMom.promo_code }}</md-tooltip
                  >
                </div>
                <div
                  :style="{
                    width: '10px',
                    display: checkEnddate(rowMom.promo_code) ? 'block' : 'none'
                  }"
                  @click="editPromotion(rowMom, indexMom, renderCnk())"
                >
                  <md-icon
                    style="font-size:14px;color:#A8A8A8;cursor:pointer;padding-left:10px;padding-top:7px"
                    >edit</md-icon
                  >
                </div>
              </div>
              <div
                v-if="rowMom.display"
                class="title-promo"
                style="padding-left:35px;padding-right:15px"
              >
                {{ rowMom.promo_name }}
              </div>
              <div
                v-for="(row, index) in rowMom.products"
                :style="{
                  display: 'flex',
                  'margin-top': index == 0 ? '4px' : '2px',
                  'margin-bottom':
                    rowMom.products.length == 1 ||
                    rowMom.products.length == index + 1
                      ? '20px'
                      : '0px'
                }"
                :key="'cdpd' + index"
              >
                <div
                  class="md-search-checkbox"
                  style="padding-right:15px;width:3%"
                >
                  <input
                    type="checkbox"
                    v-model="row.checked"
                    :disabled="renderCnk()"
                    style="height: 20px;width: 20px;visibility: hidden;"
                    @change="
                      $store.dispatch('myorders/checkByItemsPro', {
                        indexDetail: index,
                        e: $event,
                        indexPrarent: indexMom
                      })
                    "
                  />
                </div>
                <div
                  :style="{
                    width:
                      info.order_status == 'SAPV' || info.order_status == 'APV'
                        ? '27.5%'
                        : '31.5%',
                    'padding-top': '5px'
                  }"
                >
                  {{ row.item_code }}
                  <label style="font-family:kanit;"
                    >&nbsp;&nbsp;{{ row.item_name }}</label
                  >
                </div>
                <div
                  style="width:9.5%;padding-top:5px;padding-left:1%"
                  class="text-right"
                >
                  ฿ {{ formatNumber(row.ppu) }}
                </div>
                <div
                  style="width:9.5%;padding-top:5px;padding-left:1%"
                  class="text-right"
                >
                  <!-- <span v-if="row.priceVD !=''">฿</span>
                  {{formatNumber(row.priceVD)}}-->
                </div>
                <div
                  class="ipt-table text-right"
                  :style="{ 'padding-top': '5px', width: '10%' }"
                >
                  ฿ {{ formatNumber(row.price) }}
                </div>
                <div style="width:2%;"></div>
                <div style="width:5%;padding-top:5px;" class="text-center">
                  <label v-if="row.discount != '-'">-{{ row.discount }}%</label>
                  <label v-else>{{ row.discount }}</label>
                </div>
                <div style="width:5.5%;padding-left:1%;" class="ipt-table">
                  <template>
                    <mds-input
                      v-model="row.order_qty"
                      :table="'show'"
                      :index="index"
                      :indexDetail="index"
                      :errorMsg="row.error_stock"
                      type="detail"
                      :readOnly="true"
                    ></mds-input>
                  </template>
                </div>
                <div
                  style="width:5.5%;padding-left:1%;padding-top:5px;text-align:right"
                  class="ipt-table"
                  v-if="
                    info.order_status == 'APV' || info.order_status == 'SAPV'
                  "
                >
                  {{ formatNumberInt(row.inv_sale_qty) }}
                </div>
                <div
                  style="width:5%;padding-top:7px;padding-left:1%"
                  class="unit"
                >
                  {{ row.unit }}
                </div>
                <div style="width:2.5%;"></div>
                <div style="width:6%;padding-top:5px">
                  <!-- =>{{row.budget}} -->
                  <!-- =>{{row.last_discount}} -->
                  <!-- =>{{row.net_amount}} -->
                  <div
                    class="md-rectangle-tag"
                    v-if="
                      row.unit_type != 'INNER' &&
                        row.unit_type != '' &&
                        row.unit_type != 'selling'
                    "
                  >
                    <div class="rectangle-text">{{ row.unit_type }}</div>
                  </div>
                </div>
                <div
                  style="width:9%;padding-top:5px;padding-right:1%; white-space: nowrap;"
                  class="text-right"
                >
                  ฿ {{ formatNumber(row.amount) }}
                </div>
              </div>
              <!--PROMOTION FREEGIFT-->
              <div
                class="title-promo"
                style="padding-top : 8px;padding-left : 35px"
                v-if="rowMom.freeitems.length > 0"
              >
                Premium / Free Gift
              </div>
              <div
                class="detail-table"
                :style="{ 'margin-top': indexf == 0 ? '7px' : '3px' }"
                v-for="(row, indexf) in rowMom.freeitems"
                :key="'tbfreegift' + indexf"
              >
                <div style="width:3%;" class="md-search-checkbox">
                  <input
                    type="checkbox"
                    v-model="row.checked"
                    :disabled="renderCnk()"
                    style="height: 20px;width: 20px;"
                    @change="
                      $store.dispatch('myorders/checkByItems', {
                        indexDetail: indexf,
                        e: row.checked,
                        indexPrarent: 'freegift',
                        parent: indexMom
                      })
                    "
                  />
                </div>
                <div
                  :style="{
                    width:
                      info.order_status == 'SAPV' || info.order_status == 'APV'
                        ? '27.5%'
                        : '31.5%',
                    'padding-top': '5px'
                  }"
                >
                  {{ row.item_code }}
                  <label style="font-family:kanit;"
                    >&nbsp;&nbsp;{{ row.item_name }}</label
                  >
                </div>
                <div
                  style="width:9.5%;padding-top:5px;padding-left:1%"
                  class="text-right"
                >
                  ฿ {{ formatNumber(row.ppu) }}
                </div>
                <div
                  style="width:9.5%;padding-top:5px;padding-left:1%"
                  class="text-right"
                >
                  <!-- <span v-if="row.priceVD !=''">฿</span>
                  {{formatNumber(row.priceVD)}}-->
                </div>
                <div
                  class="ipt-table text-right"
                  :style="{
                    'padding-top': row.editMode ? '' : '5px',
                    'padding-left': row.editMode ? '3%' : '',
                    width: '10%'
                  }"
                >
                  ฿ {{ formatNumber(row.price) }}
                </div>
                <div style="width:2%;"></div>
                <div style="width:6%;padding-top:5px;" class="text-center">
                  {{ row.discount }}
                </div>
                <div style="width:5.5%;padding-left:1%;" class="ipt-table">
                  <template>
                    <mds-input
                      v-model="row.order_qty"
                      :table="'show'"
                      :index="indexf"
                      :indexDetail="indexf"
                      type="detail"
                      :readOnly="true"
                    ></mds-input>
                  </template>
                </div>
                <div
                  style="width:5.5%;padding-left:1%;text-align:right;padding-top:7px"
                  class="ipt-table"
                  v-if="
                    info.order_status == 'APV' || info.order_status == 'SAPV'
                  "
                >
                  {{ formatNumberInt(row.inv_sale_qty) }}
                </div>
                <div
                  style="width:5%;padding-top:7px;padding-left:1%"
                  class="unit"
                >
                  {{ row.unit }}
                </div>
                <div style="width:2.5%;"></div>
                <div style="width:6%;padding-top:5px">
                  <div
                    class="md-rectangle-tag"
                    v-if="
                      row.unit_type != 'INNER' &&
                        row.unit_type != '' &&
                        row.unit_type != 'selling'
                    "
                  >
                    <div class="rectangle-text">{{ row.unit_type }}</div>
                  </div>
                </div>
                <div
                  class="text-right"
                  style="width:9%;padding-top:5px;padding-right:1%; white-space: nowrap;"
                >
                  ฿ {{ formatNumber(row.amount) }}
                </div>
              </div>
            </div>
          </div>
        </md-layout>
      </div>
    </div>
    <div class="md-dialog-total" :style="{ visibility: 'visible' }">
      <div
        style="width: 15%;color:#727272;font-size:12px;padding-top: 11px;text-align:right;padding-right:20px"
      >
        <!-- {{sumBudgetAllRow}} -->
        <div v-if="renderFlow()">
          Spent Budget &nbsp;
          <span class="number">{{ fmRound(sumBudgetAllRow) }}</span>
          <md-tooltip md-direction="top">
            Balance Budget &nbsp;
            <span class="number" v-if="budget == false">-</span>
            <span class="number" v-else>{{ formatNumber(budget) }}</span>
          </md-tooltip>
        </div>
      </div>
      <div style="width:6%;padding-right:1%;padding-top: 12px;" class="number">
        {{ formatNumberInt(totalItems) }}
      </div>
      <div
        style="width: 3%;font-size:11px;padding-top: 13px;"
        class="text-right"
      >
        Item(s)
      </div>
      <div style="width:8%;padding-right:1%;padding-top: 12px;" class="number">
        {{ formatNumberInt(totalOrderQty) }}
      </div>
      <div
        style="width: 3%;font-size:11px;padding-top: 13px;"
        class="text-right"
      >
        Unit(s)
      </div>
      <div style="width: 12%;">
        <div
          style="text-align:right;color:rgba(0, 0, 0, .87);font-size:10px;display: -webkit-box;float: right;"
        >
          <div style="padding-top: 12px;text-transform: uppercase;">
            {{ showInpoutName('discount') }}
          </div>
          <div
            v-if="!checkForm('discount')"
            style="padding-top:3px;width:80px;padding-left:10px; "
          >
            <md-dropdown-box
              id="dp-discount"
              :placeholder="'0'"
              :data="mstDiscount"
              v-model="perDiscountMng"
              @choose="chooseDiscount"
            ></md-dropdown-box>
          </div>
          <div v-else style="padding-left:5px;padding-top:12px">
            ({{ info.percent_discount }}%)
          </div>
        </div>
      </div>
      <div
        style="width: 11%;padding-right:5px;padding-top: 12px;"
        class="number"
      >
        ฿ {{ fmRound(totalDiscount) }}
      </div>
      <div
        style="width: 9%;font-size:11px;padding-top: 13px;"
        class="text-right"
      >
        Total Amount
      </div>
      <div style="width:11%;padding-top: 12px;" class="number">
        ฿ {{ formatNumber(totalAmount) }}
      </div>
      <div
        style="width: 11%;font-size:11px;padding-top: 13px;"
        class="text-right"
      >
        Total Net Amount
      </div>
      <div
        style="width:11%;padding-right:0.5%;padding-top: 12px;"
        class="number"
      >
        ฿ {{ fmRound(totalNetAmount) }}
      </div>
    </div>
    <div class="md-dialog-actions">
      <md-layout v-if="renderBtn() == 'DRF_ORDER'">
        <md-layout md-flex="50">
          <md-button
            :class="items.length > 0 ? 'md-gray' : 'md-primary'"
            @click="checkCLose('orders')"
            >CANCEL</md-button
          >
          <md-button
            v-if="info.id != '' && !disabledDelBtn()"
            class="md-red"
            @click="openCF('deleteOrder')"
            >DELETE</md-button
          >
          <!-- <md-button class="md-gray" :disabled="true">DUPLICATE</md-button> -->
        </md-layout>
        <md-layout md-flex="50" md-align="end">
          <md-button
            class="md-gray"
            @click="openCF('saveDraft')"
            :disabled="info.customer_code == ''"
            >SAVE AS DRAFT</md-button
          >
          <md-button
            :disabled="runProcessPR ? true : false"
            v-if="!btnPreviewOrder"
            class="md-primary"
            @click="openCF('previewOrder')"
            >PREVIEW ORDER</md-button
          >
          <md-button
            v-if="btnPreviewOrder"
            :class="'md-gray'"
            @click="editFRomPreview()"
            >EDIT</md-button
          >
          <md-button
            v-if="btnPreviewOrder"
            class="md-primary"
            @click="openCF('submitOrder')"
            >SUBMIT ORDER</md-button
          >
        </md-layout>
      </md-layout>
      <md-layout v-else-if="renderBtn() == 'ME_WFA_CREATE_ORDER'">
        <md-layout md-flex="50">
          <md-button :class="'md-gray'" @click="checkCLose('orders')"
            >CANCEL</md-button
          >
        </md-layout>
        <md-layout md-flex="50" md-align="end">
          <md-button class="md-primary" @click="openCF('recallOrder')"
            >RECALL</md-button
          >
        </md-layout>
      </md-layout>
      <md-layout
        v-else-if="renderBtn() == 'OTHER_WFA_CREATE_ORDER'"
        md-align="start"
      >
        <md-button :class="'md-gray'" @click="checkCLose('orders')"
          >CANCEL</md-button
        >
      </md-layout>
      <md-layout v-else-if="renderBtn() == 'COMPLETE_ORDER'" md-align="start">
        <md-button :class="'md-gray'" @click="checkCLose('orders')"
          >CANCEL</md-button
        >
      </md-layout>
      <md-layout v-else-if="renderBtn() == 'REJ_ORDER'" md-align="start">
        <md-button :class="'md-gray'" @click="checkCLose('orders')"
          >CANCEL</md-button
        >
        <md-button :class="'md-gray'" @click="openCF('editOrder')"
          >EDIT</md-button
        >
        <!-- <md-button class="md-gray" :disabled="true">DUPLICATE</md-button> -->
      </md-layout>
      <md-layout v-else-if="renderBtn() == 'REC_ORDER'">
        <md-layout md-flex="50">
          <md-button :class="'md-gray'" @click="checkCLose('orders')"
            >CANCEL</md-button
          >
          <md-button class="md-red" @click="openCF('deleteOrder')"
            >DELETE</md-button
          >
        </md-layout>
        <md-layout md-flex="50" md-align="end">
          <md-button
            :disabled="runProcessPR ? true : false"
            v-if="!btnPreviewOrder"
            class="md-primary"
            @click="openCF('previewOrder')"
            >PREVIEW ORDER</md-button
          >
          <md-button
            v-if="btnPreviewOrder"
            :class="'md-gray'"
            @click="editFRomPreview()"
            >EDIT</md-button
          >
          <md-button
            v-if="btnPreviewOrder"
            class="md-primary"
            @click="openCF('submitOrder')"
            >SUBMIT ORDER</md-button
          >
        </md-layout>
      </md-layout>
      <md-layout v-else-if="renderBtn() == 'OTHER_APV_ORDER'">
        <md-layout md-flex="50">
          <md-button :class="'md-gray'" @click="checkCLose('orders')"
            >CANCEL</md-button
          >
          <md-button class="md-red" @click="openCF('rejectOrder')"
            >REJECT</md-button
          >
        </md-layout>
        <md-layout md-flex="50" md-align="end">
          <md-button
            class="md-gray send-to"
            @click="openCF('sendtoOrder')"
            v-if="chiefsalesList.length > 0"
            >SEND TO</md-button
          >
          <md-button class="md-primary" @click="openCF('approveOrder')"
            >APPROVE</md-button
          >
        </md-layout>
      </md-layout>
      <md-layout v-else-if="renderBtn() == 'ME_APV_ORDER'">
        <md-layout md-flex="50">
          <md-button :class="'md-gray'" @click="checkCLose('orders')"
            >CANCEL</md-button
          >
          <md-button class="md-red" @click="openCF('rejectOrder')"
            >REJECT</md-button
          >
        </md-layout>
        <md-layout md-flex="50" md-align="end">
          <md-button
            class="md-gray send-to"
            @click="openCF('sendtoOrder')"
            v-if="chiefsalesList.length > 0"
            >SEND TO</md-button
          >
          <md-button class="md-primary" @click="openCF('approveOrder')"
            >APPROVE</md-button
          >
        </md-layout>
      </md-layout>
      <md-layout v-else-if="renderBtn() == 'ME_FWD_ORDER'">
        <md-layout md-flex="50">
          <md-button :class="'md-gray'" @click="checkCLose('orders')"
            >CANCEL</md-button
          >
        </md-layout>
        <md-layout md-flex="50" md-align="end">
          <md-button class="md-primary" @click="openCF('recallOrder')"
            >RECALL</md-button
          >
          <md-button
            class="md-gray send-to"
            @click="openCF('sendtoOrder')"
            v-if="chiefsalesList.length > 0"
            >SEND TO</md-button
          >
          <md-button class="md-primary" @click="openCF('approveOrder')"
            >APPROVE</md-button
          >
        </md-layout>
      </md-layout>
      <md-layout v-else-if="renderBtn() == 'OTHER_FWD_ORDER'">
        <md-layout md-flex="50">
          <md-button :class="'md-gray'" @click="checkCLose('orders')"
            >CANCEL</md-button
          >
        </md-layout>
        <md-layout md-flex="50" md-align="end">
          <md-button
            class="md-gray send-to"
            @click="openCF('sendtoOrder')"
            v-if="chiefsalesList.length > 0"
            >SEND TO</md-button
          >
          <md-button class="md-primary" @click="openCF('approveOrder')"
            >APPROVE</md-button
          >
        </md-layout>
      </md-layout>
      <md-layout v-else-if="renderBtn() == 'OTHER_APV_ORDER_KM'">
        <md-layout md-flex="50">
          <md-button :class="'md-gray'" @click="checkCLose('orders')"
            >CANCEL</md-button
          >
        </md-layout>
        <md-layout md-flex="50" md-align="end">
          <md-button class="md-primary" @click="openCF('approveOrder')"
            >APPROVE</md-button
          >
        </md-layout>
      </md-layout>
      <md-layout v-else>
        <md-button :class="'md-gray'" @click="checkCLose('orders')"
          >CANCEL</md-button
        >
      </md-layout>
    </div>
    <md-snackbar
      :md-position="vertical + ' ' + horizontal"
      ref="snackbar"
      :md-duration="duration"
    >
      <span style="font-size:16px;font-family:kanit">{{ snackbarMsg }}</span>
      <md-button
        class="md-accent"
        @click="$refs.snackbar.close()"
        style="color:white"
        >OK</md-button
      >
    </md-snackbar>
    
    <md-dialog ref="md-confirm-dialog">
      <md-dialog-title>{{ titleCF }}</md-dialog-title>
      <md-dialog-content>
        <div v-if="descCF == true">
          <md-input-container id="commentIpu" md-inline>
            <label>add a comment</label>
            <md-input
              v-model="txtComment"
              ref="commentIpu"
              :maxlength="100"
            ></md-input>
          </md-input-container>
        </div>
        <div v-else-if="descCF == 'dupfreeitem'">
          <div
            style="padding-bottom:10px;font-size:14px;font-family:kanit"
            v-for="(row, index) in descCFList"
            :key="index + 'rowDup'"
          >
            {{ row.item_code }}&nbsp;{{ row.item_name }}
          </div>
          <br />
        </div>
        <div v-else-if="descCF == 'dupprice'">
          <div
            style="padding-bottom:10px;font-size:14px;font-family:kanit"
            v-for="(row, index) in descCFList"
            :key="index + 'rowDup'"
          >
            {{ row.item_code }}&nbsp;{{
              row.item_name
            }}&nbsp;&nbsp;ราคา&nbsp;&nbsp;{{ formatNumber(row.price) }}&nbsp;฿
          </div>
          <br />
        </div>
        <div v-else-if="descCF == 'delivery_date'">
          <div
            style="padding-bottom:10px;font-size:16px;font-family:kanit;color:#414141"
          >
            กรุณาเปลี่ยน Delivery date เป็นวันที่ "{{ showDeliveryDate }}"
            <br />คลิก "Cancel" เมื่อต้องการกลับไปแก้ไข <br />คลิก "Confirm"
            เมื่อต้องการคง Delivery date เดิม
          </div>
          <!-- >กรุณาเปลี่ยน Delivery date เป็นวันที่ {{showDeliveryDate}}</div> -->
          <br />
        </div>
        <div v-else-if="descCF == 'sendTo'">
          <md-input-container style="margin:0px;" id="sendToName">
            <md-select v-model="selectedChefDendto">
              <md-option
                v-for="items in chiefsalesList"
                :value="items.emp_id"
                :key="'selectedChefDendto' + items.emp_id"
                @selected="chooseSendTo(items)"
              >
                {{ items.emp_id }}&nbsp; : {{ items.first_name }}&nbsp;&nbsp;{{
                  items.last_name
                }}
              </md-option>
            </md-select>
          </md-input-container>
          <md-input-container style="margin:15px 0 0 0" id="senToIpu">
            <label>Note</label>
            <md-input v-model="setdToComment" :maxlength="100"></md-input>
          </md-input-container>
        </div>


        <div v-else style="font-family:kanit;font-size:16px">{{ descCF }}</div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button
          :disabled="runProcessCancel ? true : false"
          v-if="leftBtn != ''"
          @click="closeCF"
          >{{ leftBtn }}</md-button
        >
        <md-button
          :disabled="runProcess ? true : false"
          class="md-primary"
          @click="submitCF"
        >
          <span v-if="descCF == true" style="color:#f44336">REJECT</span>
          <span v-else>{{ rightBtn }}</span>
        </md-button>
        <md-button
          :disabled="runProcess ? true : false"
          v-if="tripleBtn"
          class="md-primary"
          @click="saveAndClose"
          >SAVE & CLOSE</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    <volume-discount :option="optVolDis"></volume-discount>
    <!--ALL PRODUCT-->
    <md-dialog ref="all-product-dialogs" id="all_product_dialog">
      <div style="width: 100%;overflow:hidden;height: 100%;">
        <md-product-dialog
          :data="dataListProductDG"
          :pggroup="dataListProductDG.product_group"
          :subgroup="dataListProductDG.sub_group"
          :cg="dataListProductDG.cg"
          @add="addItem"
          @close="checkCLose('allproduct')"
        />
      </div>
    </md-dialog>
  </div>
</template>
<script>
import ordService from '@/services/orders/myorders'
import Datepicker from 'vuejs-datepicker'
import Vue from 'vue'
import moment from 'moment'
import _ from 'lodash'
import VueSticky from 'vue-sticky'
import { mapGetters, mapActions } from 'vuex'

export default {
  created () {
    this.$store.commit('myorders/SET_THIS_PAGE', this)
  },
  data () {
    return {
      modeDialog: '',
      department: Vue.localStorage.get('department'),
      showPromo: true,
      modeCF: '',
      titleCF: '',
      descCF: '',
      descCFList: [],
      idDialog: 'createOrder_dialog',
      headChk: false,
      display: false,
      vertical: 'top',
      horizontal: 'center',
      duration: 4000,
      snackbarMsg: 'Please Select customer',
      titleOrder: 'New Order Create Form',
      txtComment: '',
      leftBtn: 'CANCEL',
      rightBtn: 'OK',
      tripleBtn: false,
      autoBtn: false,
      showDeatil: false,
      fgBtn: false,
      delBtn: false,
      unitBtn: false,
      optVolDis: {
        top: 0,
        left: 0,
        display: false
      },
      keepOpenVol: '',
      keepSearch: '',
      runProcess: false,
      runProcessPR: false,
      runProcessD: false,
      runProcessCancel: false,
      btnPreviewOrder: false,
      showDeliveryDate: '',
      setdToComment: '',
      selectedChefDendto: '',
      find_po_success:'',
      find_po_success2:'',
      cheang_po:'',
      perDiscountMng:0

    }
  },
  computed: {
    itemsPromo () {
      return this.$store.getters['myorders/items_promo_order']
    },
    items () {
      return this.$store.getters['myorders/items_order']
    },
    freegift () {
      return this.$store.getters['myorders/items_freegift']
    },
    info () {
      this.perDiscountMng = this.$store.getters['myorders/customer_info'].perDiscountMng
      return this.$store.getters['myorders/customer_info']
    },
    flowList () {
      return this.$store.getters['myorders/flow']
    },
    selectedChiefsales () {
      return this.$store.getters['myorders/chiefsales_selected']
    },
    keepRouter () {
      return this.$store.getters['myorders/keepRouter']
    },
    chiefsalesList () {
      return this.$store.getters['myorders/chiefsales']
    },
    totalNetAmount () {
      return this.$store.getters['myorders/totalNetAmount']
    },
    totalDiscount () {
      return this.$store.getters['myorders/totalDiscount']
    },
    totalOrderQty () {
      return this.$store.getters['myorders/totalOrderQty']
    },
    totalAmount () {
      return this.$store.getters['myorders/totalAmount']
    },
    commentList () {
      return this.$store.getters['myorders/comment']
    },
    tempCommentStatus () {
      return this.$store.getters['myorders/temp_comment_status']
    },
    spinnerVolume () {
      return this.$store.getters['myorders/spinnerVolume']
    },
    mstDiscount () {
      if(this.$store.getters['myorders/mstDiscount'].length == 0) {
        // console.log('Null')
      }
      return this.$store.getters['myorders/mstDiscount']
    },
    minimumSales () {
      return this.$store.getters['myorders/minimumSales']
    },
    budget () {
      return this.$store.getters['myorders/budget']
    },
    compareBudget () {
      return this.$store.getters['myorders/compareBudget']
    },
    keepDiscountAPV () {
      return this.$store.getters['myorders/keepDiscountAPV']
    },
    enddatePromo () {
      return this.$store.getters['myorders/enddatePromo']
    },
    disableFrom () {
      return this.$store.getters['myorders/disableFrom']
    },
    payByCash () {
      return this.$store.getters['myorders/paybycash_list']
    },
    dataListProductDG () {
      return this.$store.getters['myorders/dataListProductDG']
    },
    sumBudgetAllRow () {
      return this.$store.getters['myorders/sumBudgetAllRow']
    },
    showPONO () {
      return this.$store.getters['myorders/showPONO']
    },
    totalItems () {
      return this.$store.getters['myorders/totalItems']
    },
    bkMode () {
      return this.$store.getters['myorders/bkMode']
    },
    orderDialog () {
      return this.$store.getters['myorders/orderDialog']
    },
    chiefsales () {
      return this.$store.getters['myorders/chiefsales']
    },
    totalDiscount_old () {
      return this.$store.getters['myorders/totalDiscount_old']
    },
    reCallGetShipToStatus () {
      return this.$store.getters['myorders/reCallGetShipToStatus']
    },
    spinner_order_vd () {
      return this.$store.getters['myorders/spinner_order_vd']
    },
    chiefsalesLoding () {
      return this.$store.getters['myorders/chiefsalesLoding']
    }
  },
  methods: {
    
    renderEditIcon (row) {
      // console.log(' === ' , row)
      if (
        _.toUpper(this.info.price_policy_code) == 'AUTO' ||
        _.toUpper(this.info.price_policy_code) == 'FLEX'
      ) {
        // console.log(' 1296 ')
        // if (_.toUpper(this.info.price_policy_code) == 'AUTO') {
        if (row.flag_status != 'F' && row.flag_status != 'FV') {
          // console.log(' 1299 ')
          return true
        } else {
          // console.log(' 1302 ')
          return false
        }
      } else {
        return false
      }
    },
    showBath (row, mode) {
      if (_.isNull(row.priceVD) || row.priceVD == '' || row.priceVD == null) {
        if (mode == 'value') {
          return ''
        } else {
          return false
        }
      } else {
        if (mode == 'value') {
          if (parseFloat(row.priceVD) == 0) {
            return ''
          } else {
            return this.formatNumber(row.priceVD)
          }
        } else {
          if (parseFloat(row.priceVD) == 0) {
            return false
          } else {
            return true
          }
        }
      }
    },
    editFRomPreview () {
      this.btnPreviewOrder = false
      this.runProcessPR = false
      // let ord_dilog = Vue.localStorage.get('ORD_DIALOG')
         let ord_dilog = sessionStorage.getItem('keep_order_session')
      let theArray = JSON.parse(ord_dilog)
      if (!_.isNull(ord_dilog)) {
        let status = theArray.customer_info.order_status
        let rs = status.split('_')
        if (rs.length > 0) {
          this.info.order_status = rs[0]
        }
      }
    },
    disabledDelBtn () {
      if (this.bkMode == 'OD' && this.info.customer_code == '') {
        return true
      } else if (this.bkMode == 'K1' || this.bkMode == 'KM') {
        return false
        // ปรับตาม OPL ลบ Po ได้
        // return true;
      } else {
        return false
      }
    },
    renderVD (row) {
      if (
        row.flag_status != 'A' &&
        row.flag_status != 'F' &&
        row.flag_status != 'CP' &&
        (!_.isUndefined(row.ref_po_no) || !_.isNull(row.ref_po_no)) &&
        _.trim(row.ref_po_no).length < 2
      ) {
        return true
      } else {
        return false
      }
    },
    italic (row) {
      if (_.isUndefined(row.ref_po_no) || _.isNull(row.ref_po_no)) {
        return false
      } else if (
        !_.isUndefined(row.ref_po_no) &&
        _.trim(row.ref_po_no).length > 2
      ) {
        return true
      } else {
        return false
      }
    },
    disabledIcon (icon) {
      let fromPage = Vue.localStorage.get('FROMPAGE')
      if (this.bkMode == 'KM') {
        return false
      } else if (this.bkMode == 'K1') {
        return false
      } else {
        return !this.keepRouter
      }
    },
    checkEnddate (promo_code) {
      if (typeof this.enddatePromo[promo_code] != 'undefined') {
        return this.enddatePromo[promo_code].status
      } else {
        return true
      }
    },
    checkForm (input) {
      if (
        !this.keepRouter &&
        typeof this.disableFrom[input] != 'undefined' &&
        (this.info.order_status == 'WFA' || this.info.order_status == 'FWD')
      ) {
        return this.disableFrom[input].status
      } else if (
        this.keepRouter &&
        typeof this.disableFrom[input] != 'undefined' &&
        (this.info.order_status == 'DRF' || this.info.order_status == 'REC')
      ) {
        return this.disableFrom[input].status
      } else {
        return true
      }
    },
    showInpoutName (input) {
      if (typeof this.disableFrom[input] != 'undefined') {
        return this.disableFrom[input].title
      } else {
        return ''
      }
    },
    chooseDiscount (value) {
      console.log(value)
      this.perDiscountMng = value.dscrate
      this.info.perDiscountMng = value.dscrate + '%'
      this.info.percent_discount = value.dscrate
      this.$store.dispatch('myorders/setDiscountAPV', value.dscrate)
    },
    warningStock (row) {
      let ppu = row.ppu != false ? parseFloat(row.ppu) : 0
      let price = parseFloat(row.price)
      let ref_price = parseFloat(row.ref_price)
      if (!_.isUndefined(row.ref_po_no) && _.trim(row.ref_po_no).length > 2) {
        return ''
      } else if (
        ref_price != price &&
        (row.flag_status == 'F' ||
          row.flag_status == 'CP' ||
          row.flag_status == 'FV' ||
          row.flag_status == 'CV') 
      ) {
        if (_.isUndefined(row.ref_po_no) || _.trim(row.ref_po_no).length < 2) {
          return 'warning-stock'
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    checkAllItem (e) {
      this.optVolDis.display = false
      this.keepOpenVol = ''
      this.$store.dispatch('myorders/checkAllItem', this.headChk)
    },
    showCustomereInfo () {
      this.optVolDis.display = false
      this.keepOpenVol = ''
    },test(){ console.log('Test')},
    handleScroll (event) {
      this.optVolDis.display = false
      this.keepOpenVol = ''
    },
    openVolumeDis (e, row, index) {
      let order_status = this.info.order_status
      if ((this.keepRouter && order_status == 'DRF') || order_status == 'REC') {
        if (row.item_code == this.keepOpenVol) {
          this.optVolDis.display = false
          this.keepOpenVol = ''
        } else {
          this.keepOpenVol = row.item_code
          this.$store.dispatch('myorders/checkStepRange', row)
        }
        let screen = window.screen
        let screenY = e.screenY
        this.optVolDis.left = 25
        let item = 'volume-discount'
        let el = document.getElementById(item)
        let offset = e.screenY + el.offsetHeight
        if (offset > screen.height) {
          let total = offset - screen.height
          let percent = (offset * 10) / 100
          this.optVolDis.top = e.pageY - total - percent
        } else {
          this.optVolDis.top = e.pageY - 40
        }
        this.optVolDis.displayIcon = e.pageY
      }
    },
    countLetter (row, key) {
      if (row.length >= key) {
        return true
      } else {
        return false
      }
    },
    showDetails (index) {
      this.itemsPromo[index].display = !this.itemsPromo[index].display
    },
    renderBtn () {
      let data = this.info
      let emp_id = Vue.localStorage.get('emp_id')
      this.autoBtn = false
      if (this.$route.path == '/orders/myorders') {
        if (typeof data.order_status != 'undefined') {
          if (data.order_status === 'DRF') {
            this.autoBtn = true
            return 'DRF_ORDER'
          } else if (data.order_status == 'REJ') {
            return 'REJ_ORDER'
          } else if (data.order_status == 'REC') {
            this.autoBtn = true
            return 'REC_ORDER'
          } else if (
            data.order_status == 'APV' ||
            data.order_status == 'SAPV'
          ) {
            return 'COMPLETE_ORDER'
          } else if (
            data.order_status == 'WFA' &&
            data.user_create == Vue.localStorage.get('emp_id')
          ) {
            if (this.bkMode != 'KM') {
              return 'ME_WFA_CREATE_ORDER'
            } else {
              return ''
            }
          } else if (
            data.order_status == 'WFA' &&
            data.user_create != Vue.localStorage.get('emp_id')
          ) {
            if (this.bkMode != 'KM') {
              return 'OTHER_WFA_CREATE_ORDER'
            } else {
              return ''
            }
          } else if (data.order_status === 'DRF_PR') {
            return 'DRF_ORDER'
          } else if (data.order_status === 'REC_PR') {
            return 'REC_ORDER'
          } else if (data.order_status == 'REJ_PR') {
            return 'REJ_ORDER'
          }
        }
      } else {
        if (typeof this.flowList['flow'] != 'undefined') {
          let active_user = this.flowList
          let last_user = active_user['flow'][active_user['flow'].length - 1]
          if (typeof last_user != 'undefined') {
            if (
              emp_id == last_user.apv_approver_id &&
              last_user.apv_status == 'WFA' &&
              data.user_create != Vue.localStorage.get('emp_id')
            ) {
              // console.log("1 ===>");
              // if (this.bkMode == 'KM') {
              //   return 'OTHER_APV_ORDER_KM'
              // } else {
              //   return 'OTHER_APV_ORDER'
              // } // เอาออกเนื่องจากยังหาสาเหตุที่ให้ใช้เงื่อนไขนี้ไม่ได้ 
                return 'OTHER_APV_ORDER' 
              
            } else if (
              emp_id == last_user.apv_approver_id &&
              last_user.apv_status == 'WFA' &&
              data.user_create == Vue.localStorage.get('emp_id')
            ) {
              // console.log("2 ===>");
              // return 'OTHER_APV_ORDER_KM'
              return 'OTHER_APV_ORDER' 
            } else if (
              emp_id == last_user.apv_approver_id &&
              last_user.apv_status == 'WFA' &&
              data.user_create == Vue.localStorage.get('emp_id')
            ) {
              // console.log("3 ===>");
              return 'ME_APV_ORDER'
            } else if (
              emp_id == last_user.apv_approver_id &&
              last_user.apv_status == 'FWD' &&
              Vue.localStorage.get('department') != 'BU' &&
              data.user_create != Vue.localStorage.get('emp_id')
            ) {
              // console.log("4 ===>");
              return 'OTHER_FWD_ORDER'
            } else if (
              emp_id == last_user.apv_approver_id &&
              last_user.apv_status == 'FWD' &&
              Vue.localStorage.get('department') != 'BU' &&
              data.user_create == Vue.localStorage.get('emp_id')
            ) {
              // console.log("5 ===>");
              return 'ME_FWD_ORDER'
            } else {
              // console.log("===>");
              return ''
            }
          } else {
            // console.log("----->");
          }
        }
      }
    },
    checkCLose (mode) {
      if (mode == 'orders') {
        let data = this.info
        var podate = new Date()
        var po_dd = podate.getDate()
        var po_mm = podate.getMonth()
        var po_y = podate.getFullYear()
        let temp2 = new Date(po_y, po_mm, po_dd + 1)
        if (data.order_status == 'REC') {
          if (this.items.length == 0 && this.itemsPromo.length == 0) {
            this.tripleBtn = true
            this.openCF('cancelOrder')
          } else {
            this.tripleBtn = false
            this.openCF('cancelOrder')
          }
        } else if (data.order_status == 'DRF') {
          if (
            data.id == '' &&
            this.items.length == 0 &&
            this.itemsPromo.length == 0
          ) {
            this.tripleBtn = false
            this.openCF('cancelOrder')
          } else if (
            (data.id == '' && this.items.length > 0) ||
            this.itemsPromo.length > 0
          ) {
            this.tripleBtn = true
            this.openCF('cancelOrder')
          } else if (data.id != '') {
            this.tripleBtn = true
            this.openCF('cancelOrder')
          } else {
            this.tripleBtn = false
            this.openCF('cancelOrder')
          }
        } else if (
          data.order_status == 'DRF_PR' ||
          data.order_status == 'REC_PR'
        ) {
          this.tripleBtn = false
          this.openCF('cancelOrder')
        } else {
          this.tripleBtn = false
          this.closeDlg('createOrder_dialog')
          Vue.localStorage.set('ORD_DIALOG', JSON.stringify(this.orderDialog))
          Vue.localStorage.set('ORD_DIALOG_SHOW', 'CLOSE')
          sessionStorage.setItem('keep_order_session',JSON.stringify(this.orderDialog))
          sessionStorage.setItem('ORD_DIALOG_SHOW_SESSION','CLOSE')
        }
      } else if (mode == 'allproduct') {
        this.$refs['all-product-dialogs'].active = false
      }
    },
    addItem (mode) { 
      if (mode == 'close') {
        this.checkCLose('allproduct')
        Vue.localStorage.set('ALLPROD_DIALOG_SHOW', 'CLOSE')
      }
    },
    showAllProduct () {
      if (this.info.customer_code == '') {
        this.snackbarMsg = 'Please Select customer'
        this.$refs.snackbar.open()
      } else {
        Vue.localStorage.set('ALLPROD_DIALOG_SHOW', 'OPEN')
        this.$store.commit('myorders/SET_CHECKBTN_CAL', true)
        let data = {
          product_group: [],
          sub_group: [],
          cg: []
        }
        let only_product = true
        let statusDdilog = Vue.localStorage.get('ORD_DIALOG_SHOW')
        if (statusDdilog == 'OPEN') {
          // let ord_dilog = Vue.localStorage.get('ORD_DIALOG')
          let ord_dilog =sessionStorage.getItem('keep_order_session')
          let theArray = JSON.parse(ord_dilog)
          if (!_.isNull(ord_dilog)) {
            only_product = theArray['prod_only_my_product']
          }
        }
        ordService
          .getAllProduct({
            only_product: only_product,
            emp_id: this.info.salesman_code
          })
          .then(response => {
            data.product_group = response
            this.$store.dispatch('myorders/setLocalStore', {
              feild: 'prod_dataListProductDG',
              data: data
            })
            this.$store.dispatch('myorders/setSession', {
              feild: 'prod_dataListProductDG',
              data: data
            })
            this.$refs['all-product-dialogs'].open()
          })
          .catch()
        ordService
          .searchSubGroup({
            code: 'all',
            only_product: only_product,
            emp_id: this.info.salesman_code
          })
          .then(response => {
            this.spinner = false
            data.sub_group = _.filter(response, item => {
              if (item.title != null && item.code != ' ') {
                return true
              }
            })
            this.$store.dispatch('myorders/setLocalStore', {
              feild: 'prod_dataListProductDG',
              data: data
            })
            this.$store.dispatch('myorders/setSession', {
              feild: 'prod_dataListProductDG',
              data: data
            })
          })
          .catch()
        ordService
          .searchProductCG({
            code: 'all',
            only_product: only_product,
            emp_id: this.info.salesman_code
          })
          .then(response => {
            this.spinner = false
            data.cg = _.filter(response, item => {
              if (item.title != null && item.code != ' ') {
                return true
              }
            })
            this.$store.dispatch('myorders/setLocalStore', {
              feild: 'prod_dataListProductDG',
              data: data
            })
             this.$store.dispatch('myorders/setSession', {
              feild: 'prod_dataListProductDG',
              data: data
            })
          })
          .catch()
        this.$store.commit('myorders/setDataListProductDG', data)
      }
    },
    openCF (action) {
      let ord_dilog = sessionStorage.getItem('keep_order_session')
      let theArray = JSON.parse(ord_dilog)
    // console.log('rolecode =>',theArray.rolecode ,'Spent Budget =>',Number(this.sumBudgetAllRow) , "   Cipher Budget => ",Number(this.budget) )
      let check = ''
      // if(theArray.rolecode != ''){
      //    if( Number(this.sumBudgetAllRow) >= this.budget && this.budget == 0 && this.sumBudgetAllRow != 0){
      //     check = true
      // }else {
      //     check = false
      // }
      // }
      if( (theArray.rolecode == 'undefined' || theArray.rolecode == '') && Number(this.sumBudgetAllRow) >0){
        check = true
      }else {
        check = false
      }
      
    // console.log(check)
      // console.log(this.$store.getters['myorders/roleCode'])
      // console.log(this.compareBudget ,' - ' , this.budget , check)
      this.optVolDis.display = false
      this.keepOpenVol = ''
      this.rightBtn = 'OK'
      this.leftBtn = 'CANCEL'
      this.modeCF = action
      this.descCFList = []
      if (action == 'delete') {
        this.titleCF = 'Do you want delete item?'
        this.tripleBtn = false
      } else if (action == 'view') {
        this.titleCF = 'Do you want to change box?'
        this.descCF = ''
        this.tripleBtn = false
      } else if (action == 'dupfreeitem') {
        let countData = this.items.filter(
          todo =>
            _.isUndefined(todo.ref_po_no) || _.trim(todo.ref_po_no).length < 2
        )
        /*
        let dupCode = this.items.filter(
          todo =>
            todo.checked == true &&
            todo.flag_status != "F" &&
            todo.flag_status != "FV" &&
            todo.flag_status != "P"
        );
        */
        let dupCode = countData.filter(
          todo =>
            todo.checked == true &&
            todo.flag_status != 'F' &&
            todo.flag_status != 'FV' &&
            todo.flag_status != 'P'
        )
        let showDup = []
        let itemsL = this.items
        _.forEach(dupCode, function (row) {
          let dupRow = itemsL.filter(todo => todo.item_code == row.item_code)
          if (dupRow.length > 1) {
            showDup.push(row)
          }
        })
        /**ITEM SAME PRICE */
        let step2 = _.groupBy(this.items, 'item_code')
        let checkDup = []
        _.forEach(step2, function (rowHead) {
          if (rowHead.length > 1) {
            let step3 = _.groupBy(rowHead, 'price')
            let dup = []
            _.forEach(step3, function (rowHead3) {
              if (rowHead3.length > 1) {
                dup.push(rowHead3)
              }
            })
            if (dup.length > 0) {
              checkDup.push(rowHead[0])
            }
          }
        })
        if (checkDup.length > 0) {
          this.titleCF = 'กรุณาตรวจสอบสินค้า'
          this.descCF = 'dupprice'
          this.descCFList = checkDup
          this.rightBtn = 'OK'
          this.leftBtn = ''
          this.tripleBtn = false
          this.modeCF = 'normal'
        } else if (showDup.length == 0) {
          this.titleCF = 'Do you want to add free item?'
          this.rightBtn = 'ADD'
          this.descCF = ''
        } else {
          this.titleCF = 'Can not add duplicatie items.'
          this.rightBtn = 'OK'
          this.descCF = 'dupfreeitem'
          this.descCFList = showDup
        }
        this.tripleBtn = false
      } else if (action == 'rejectOrder') {
        this.titleCF = 'Please enter the reason.'
        this.rightBtn = 'REJECT'
        this.descCF = true
        this.tripleBtn = false
      } else if (action == 'recallOrder') {
        this.titleCF = 'Do you want to recall order?'
        this.descCF = ''
        this.tripleBtn = false
      } else if (action == 'editOrder') {
        this.titleCF = 'Do you want to edit this PO.?'
        this.descCF = ''
        this.tripleBtn = false
      } else if (action == 'deleteOrder') {
        
         let check_ = this.check_po_success().check_
         let array_temp = this.check_po_success().array_temp
      if(!check_){
        this.modeCF =''
        this.$refs['md-confirm-dialog'].close()
        array_temp = {h_id :array_temp.id, doc_no: array_temp.doc_no , po_no:array_temp.po_no}
        this.$store.dispatch('myorders/getOrderById',{items:array_temp})
        this.runProcess = false
        this.runProcessCancel = false
        this.snackbarMsg = 'PO.NO. '+array_temp.po_no+' ส่งเข้าระบบเรียบร้อยแล้ว'        
        this.$refs.snackbar.open()
      }else {
        this.titleCF = 'Do you want to delete this draft?'
        this.descCF = ''
        this.leftBtn = 'NO'
        this.rightBtn = 'YES'
        this.tripleBtn = false
      }
        
      } else if (action == 'saveDraft') {
      
         let check_ = this.check_po_success().check_
         let array_temp = this.check_po_success().array_temp
      if(!check_){
        this.modeCF =''
        this.$refs['md-confirm-dialog'].close()
        array_temp = {h_id :array_temp.id, doc_no: array_temp.doc_no , po_no:array_temp.po_no}
        this.$store.dispatch('myorders/getOrderById',{items:array_temp})
        this.runProcess = false
        this.runProcessCancel = false
        this.snackbarMsg = 'PO.NO. '+array_temp.po_no+' ส่งเข้าระบบเรียบร้อยแล้ว'        
        this.$refs.snackbar.open()
      }else {
            let data = this.info
            let checkY = data.delivery_date.split('-')
            var ch1 = new Date()
            var po_y = ch1.getFullYear()

            if (
              _.trim(data.delivery_date).length < 10 ||
              _.trim(data.delivery_date).length > 19
            ) {
              this.titleCF = 'กรุณาตรวจสอบ Delivery date'
              this.descCF = ''
              this.leftBtn = ''
              this.tripleBtn = false
              this.modeCF = 'deliverydate'
            } else {
              this.titleCF = 'Do you want to save this draft?'
              this.rightBtn = 'SAVE'
              this.descCF = ''
              this.tripleBtn = false
            }
      }
      } else if (action == 'submitOrder') {

        let count = this.items.filter(todo => todo.order_qty == 0)
        let enddate = []
        let t = this
        this.itemsPromo.forEach(function (value, key) {
          if (
            typeof t.enddatePromo[value.promo_code] != 'undefined' &&
            !t.enddatePromo[value.promo_code].status
          ) {
            enddate.push(value)
          }
        })
        let data = this.info
        let checkY = data.delivery_date.split('-')
        var ch1 = new Date()
        var po_y = ch1.getFullYear()
        let master_shipto = this.$store.getters['myorders/master_shipto']
        if (enddate.length > 0) {
          this.titleCF = 'Promotion Expired, please remove before submit.'
          this.descCF = ''
          this.rightBtn = 'OK'
          this.leftBtn = ''
          this.tripleBtn = false
          this.modeCF = 'enddate'
        } else if (
          _.trim(data.delivery_date).length < 10 ||
          _.trim(data.delivery_date).length > 19
        ) {
          this.titleCF = 'กรุณาตรวจสอบ Delivery date'
          this.descCF = ''
          this.leftBtn = ''
          this.tripleBtn = false
          this.modeCF = 'deliverydate'
        } else if (this.items.length > 0 || this.itemsPromo.length > 0) {
          let data = this.info
          let poDate = moment(data.po_date).format('YYYY-MM-DD')
          let deliveryDate = moment(data.delivery_date).format('YYYY-MM-DD')
          if (
            data.salesman == '' ||
            data.customer_code == '' ||
            data.customer_name == '-' ||
            count.length > 0
          ) {
            this.titleCF =
              'This order did not complete, please check Order QTY.'
            this.descCF = ''
            this.leftBtn = ''
            this.tripleBtn = false
            this.modeCF = 'normal'
          } else if (
            this.totalNetAmount < this.minimumSales &&
            this.minimumSales != false &&
            this.bkMode != 'KM' &&
            this.bkMode != 'K1'
          ) {
            this.titleCF =
              'ยอดเปิดบิลขั้นต่ำคือ ' +
              this.formatNumber(this.minimumSales) +
              ' บาท'
            this.descCF = ''
            this.rightBtn = 'OK'
            this.leftBtn = ''
            this.tripleBtn = false
            this.modeCF = 'checkMinimum'
          } else if (this.minimumSales == false) {
            this.titleCF =
              'ไม่พบยอดเปิดบิลขั้นต่ำ กรุณาติดต่อผู้จัดการหรือผู้ดูแลระบบ'
            this.descCF = ''
            this.rightBtn = 'OK'
            this.leftBtn = ''
            this.tripleBtn = false
            this.modeCF = 'checkMinimum'
          } else if (
            data.pay_by_cash == true &&
            (this.payByCash.cust_addr1.trim().length == 0 ||
              this.payByCash.sent_to_cus_name.trim().length == 0 ||
              this.payByCash.receive_name.trim().length == 0 ||
              (this.payByCash.tax_id.length >= 0 &&
                this.payByCash.tax_id.length < 10) ||
              this.payByCash.tax_id.length > 13)
          ) {
            this.titleCF = 'Please check cashed customer detail'
            this.descCF = ''
            this.leftBtn = ''
            this.tripleBtn = false
            this.rightBtn = 'OK'
            this.modeCF = 'normal'
          } else if (deliveryDate == poDate) {
            this.titleCF = 'กรุณาเปลี่ยน PO. Date'
            this.descCF = ''
            this.leftBtn = ''
            this.tripleBtn = false
            this.rightBtn = 'OK'
            this.modeCF = 'normal'
          } else if (master_shipto.length == 0) {
            if (this.reCallGetShipToStatus) {
              this.titleCF = 'ไม่มีข้อมูล Ship to กรุณาติดต่อหน่วยงาน ODM'
              this.descCF = ''
              this.leftBtn = ''
              this.tripleBtn = false
              this.rightBtn = 'OK'
              this.modeCF = 'normal'
            } else {
              this.titleCF = 'Connection Failed'
              this.descCF =
                'ไม่สามารถเชื่อมต่อเซิร์ฟเวอ์ได้ กรุณาลองใหม่อีกครั้ง...'
              this.rightBtn = 'TRY AGAIN'
              this.leftBtn = ''
              this.tripleBtn = false
              this.modeCF = 'showError500'
            }
          } else if (this.chiefsales.length == 0) {
            this.titleCF =
              'ไม่พบ ผู้อนุมัติ กรุณาติดต่อผู้จัดการหรือผู้ดูแลระบบ'
            this.descCF = ''
            this.rightBtn = 'OK'
            this.tripleBtn = false
            this.modeCF = 'normal'
          } else if (count.length == 0 && this.totalNetAmount == 0) {
            this.titleCF = 'Total Amount ต้องมีค่ามากกว่า 0 บาทขึ้นไป'
            this.descCF = ''
            this.rightBtn = 'OK'
            this.tripleBtn = false
            this.modeCF = 'normal'
          } else if (count.length == 0 && this.totalNetAmount > 0) {
            let dold = new Date(data.delivery_date)
            let dnew = new Date()
            if (dold <= dnew) {
              let nowDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
              let nowD = moment(new Date()).format('YYYY-MM-DD')
              let time = moment(nowD).format('YYYY-MM-DD') + ' ' + nowDate

              let rsDate = {
                customer_code: data.customer_code,
                po_date: nowDate,
                delivery_date: data.delivery_date,
                mode: 'confirm'
              }
              this.getDeliveryDateAlert(rsDate)
            } else {
              this.titleCF = 'Do you confirm to order?'
              this.descCF = ''
              this.rightBtn = 'CONFIRM'
              this.tripleBtn = false
              this.modeCF = 'submitOrder'
            }
          }
        } else {
          this.titleCF = 'Please add at lease 1 item'
          this.descCF = ''
          this.leftBtn = ''
          this.tripleBtn = false
          this.modeCF = 'normal'
        }
      } else if (action == 'previewOrder') {
        if (Vue.localStorage.get('FOCUS_INPUT') == 'OUT') {
          // console.log("previewOrder ==>", Vue.localStorage.get("FOCUS_INPUT"));
          this.runProcessPR = true
          let count = this.items.filter(todo => todo.order_qty == 0)
         
          let enddate = []
          let t = this

          let step2 = _.groupBy(this.items, 'item_code')
          let checkDup = []
          _.forEach(step2, function (rowHead) {
            if (rowHead.length > 1) {
              let step3 = _.groupBy(rowHead, 'price')
              let dup = []
              _.forEach(step3, function (rowHead3) {
                if (rowHead3.length > 1) {
                  dup.push(rowHead3)
                }
              })
              if (dup.length > 0) {
                checkDup.push(rowHead[0])
              }
            }
          })


          this.itemsPromo.forEach(function (value, key) {
            if (
              typeof t.enddatePromo[value.promo_code] != 'undefined' &&
              !t.enddatePromo[value.promo_code].status
            ) {
              enddate.push(value)
            }
          })
          let data = this.info
          // let checkY = data.delivery_date.split('-')
          var ch1 = new Date()
          // var po_y = ch1.getFullYear()
          let master_shipto = this.$store.getters['myorders/master_shipto']
          if (checkDup.length > 0) {
            this.titleCF = 'กรุณาตรวจสอบสินค้า'
            this.descCF = 'dupprice'
            this.descCFList = checkDup
            this.rightBtn = 'OK'
            this.leftBtn = ''
            this.tripleBtn = false
            this.modeCF = 'normal'
          } else if (enddate.length > 0) {
            this.titleCF = 'Promotion Expired, please remove before submit.'
            this.descCF = ''
            this.rightBtn = 'OK'
            this.leftBtn = ''
            this.tripleBtn = false
            this.modeCF = 'enddate'
          } else if (
            _.trim(data.delivery_date).length < 10 ||
            _.trim(data.delivery_date).length > 19
          ) {
            this.titleCF = 'กรุณาตรวจสอบ Delivery date'
            this.descCF = ''
            this.leftBtn = ''
            this.tripleBtn = false
            this.modeCF = 'deliverydate'
            this.runProcessPR = false
          } else if (this.items.length > 0 || this.itemsPromo.length > 0) {
            let data = this.info
            let poDate = moment(data.po_date).format('YYYY-MM-DD')
            let deliveryDate = moment(data.delivery_date).format('YYYY-MM-DD')
            if (
              data.salesman == '' ||
              data.customer_code == '' ||
              data.customer_name == '-' ||
              count.length > 0
            ) {
              this.titleCF =
                'This order did not complete, please check Order QTY.'
              this.descCF = ''
              this.leftBtn = ''
              this.tripleBtn = false
              this.modeCF = 'normal'
            } else if (
              this.totalNetAmount < this.minimumSales &&
              this.minimumSales != false &&
              this.bkMode != 'KM' &&
              this.bkMode != 'K1'
            ) {
              this.titleCF =
                'ยอดเปิดบิลขั้นต่ำคือ ' +
                this.formatNumber(this.minimumSales) +
                ' บาท'
              this.descCF = ''
              this.rightBtn = 'OK'
              this.leftBtn = ''
              this.tripleBtn = false
              this.modeCF = 'checkMinimum'
            } else if (this.minimumSales == false) {
              // console.log('No')
              this.titleCF =
                'ไม่พบยอดเปิดบิลขั้นต่ำ กรุณาติดต่อผู้จัดการหรือผู้ดูแลระบบ'
              this.descCF = ''
              this.rightBtn = 'OK'
              this.leftBtn = ''
              this.tripleBtn = false
              this.modeCF = 'checkMinimum'
            } else if (
              data.pay_by_cash == true &&
              (this.payByCash.cust_addr1.trim().length == 0 ||
                this.payByCash.sent_to_cus_name.trim().length == 0 ||
                this.payByCash.receive_name.trim().length == 0 ||
                (this.payByCash.tax_id.length >= 0 &&
                  this.payByCash.tax_id.length < 10) ||
                this.payByCash.tax_id.length > 13)
            ) {
              this.titleCF = 'Please check cashed customer detail'
              this.descCF = ''
              this.leftBtn = ''
              this.tripleBtn = false
              this.rightBtn = 'OK'
              this.modeCF = 'normal'
            } else if (deliveryDate == poDate ) {
              this.titleCF = 'กรุณาเปลี่ยน PO. Date'
              this.descCF = ''
              this.leftBtn = ''
              this.tripleBtn = false
              this.rightBtn = 'OK'
              this.modeCF = 'normal'
            } else if (master_shipto.length == 0) {
              if (this.reCallGetShipToStatus) {
                this.titleCF = 'ไม่มีข้อมูล Ship to กรุณาติดต่อหน่วยงาน ODM'
                this.descCF = ''
                this.leftBtn = ''
                this.tripleBtn = false
                this.rightBtn = 'OK'
                this.modeCF = 'normal'
              } else {
                this.titleCF = 'Connection Failed'
                this.descCF =
                  'ไม่สามารถเชื่อมต่อเซิร์ฟเวอ์ได้ กรุณาลองใหม่อีกครั้ง...'
                this.rightBtn = 'TRY AGAIN'
                this.leftBtn = ''
                this.tripleBtn = false
                this.modeCF = 'showError500'
              }
            } else if (
              this.chiefsales.length == 0 &&
              this.chiefsalesLoding == false
            ) {
              this.titleCF =
                'ไม่พบ ผู้อนุมัติ กรุณาติดต่อผู้จัดการหรือผู้ดูแลระบบ'
              this.descCF = ''
              this.rightBtn = 'OK'
              this.tripleBtn = false
              this.modeCF = 'normal'
            } else if (
              this.chiefsales.length == 0 &&
              this.chiefsalesLoding == true
            ) {
              this.titleCF = 'กรุณารอสักครู่ ระบบกำลังทำงาน'
              this.descCF = ''
              this.leftBtn = ''
              this.rightBtn = 'CLOSE'
              this.tripleBtn = false
              this.modeCF = 'normal'
            } else if (count.length == 0 && this.totalNetAmount == 0) {
              this.titleCF = 'Total Amount ต้องมีค่ามากกว่า 0 บาทขึ้นไป'
              this.descCF = ''
              this.rightBtn = 'OK'
              this.tripleBtn = false
              this.modeCF = 'normal'
            } else if (count.length == 0 && this.totalNetAmount > 0) {
              let data = this.info
              let t = this
              this.$store.commit('myorders/SET_SPINNER_ORDER', true)
              setTimeout(function () {
                Vue.http
                  .get(Vue.config['url'] + '/check-po', {
                    params: {
                      po_no: data.po_no,
                      h_id: data.id
                    },
                    headers: {
                      Authorization: 'Bearer ' + Vue.localStorage.get('token')
                    }
                  })
                  .then(response => {
                    let rs = response.body.success.data
                    if (rs.status == true) {
                        let checkTimeLate = false
                      let now = moment(new Date()).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )


                 Vue.http
                  .get(Vue.config['url'] + '/get-delivery-date', {
                    params: {
                      customer_code: data.customer_code,
                      po_date: now
                    },
                    headers: { Authorization: 'Bearer ' + Vue.localStorage.get('token') }
                  })
                  .then(
                    response => {
                      let result = response.body.success.data
                      // console.log(result)

                     
                      if(data.delivery_date < result.deliverydate){
                        checkTimeLate = true
                      }else {
                      }
                      // success callback
                    },
                    response => {
                      // error callback
                      if (response.status == 500) {
                      }
                    }
                  )
                      let dold = new Date(data.delivery_date)
                      let dnew = new Date()

                      setTimeout(() => {
                         if (dold <= dnew || checkTimeLate) {
                        let nowDate = moment(new Date()).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )
                        let nowD = moment(new Date()).format('YYYY-MM-DD')
                        let time =
                          moment(nowD).format('YYYY-MM-DD') + ' ' + nowDate
                        let rsDate = {
                          customer_code: data.customer_code,
                          po_date: nowDate,
                          delivery_date: data.delivery_date,
                          mode: 'preview'
                        }
                        t.getDeliveryDateAlert(rsDate)
                      } else {
                        // let ord_dilog = Vue.localStorage.get('ORD_DIALOG')
                        let ord_dilog = sessionStorage.getItem('keep_order_session')
                        let theArray = JSON.parse(ord_dilog)
                        // console.log(theArray.customer_info.order_status)
                        if (!_.isNull(ord_dilog)) {
                          if (theArray.customer_info.order_status == 'REJ') {
                            t.info.order_status = 'DRF_PR'
                          } else {
                            // console.log('OK', t.info.po_no)
                            if(t.info.po_no != 'System'){
                              // console.log(Vue.localStorage.get('PO_SUCCESS'))
                              // console.log(t.info.id)
                                  if(_.isNull(Vue.localStorage.get('PO_SUCCESS'))){
                                    let array_ = []
                                    Vue.localStorage.set('PO_SUCCESS',JSON.stringify(array_))
                                    // console.log('OK')
                                  }
                              let theArray_ = JSON.parse(Vue.localStorage.get('PO_SUCCESS'))
                              const CheckDup1 = theArray_.find(theArray_ => theArray_.id == t.info.id && theArray_.po_no == t.info.po_no);
                              const CheckDup2 = theArray_.find(theArray_ => theArray_.id == t.info.id && theArray_.po_no != t.info.po_no);
                              if(!CheckDup1){
                                this.find_po_success = true
                                // console.log('Undifind !! ')
                              }else {
                                this.find_po_success = false
                              }

                              if(!CheckDup2){
                                this.find_po_success2 = true
                                // console.log('Undifind !! ')
                              }else {
                                this.find_po_success2 = false
                                this.cheang_po = t.info.po_no
                              // console.log(t.info.po_no) 
                              }
                                
                                // console.log('CheckDup2 => ',this.find_po_success2)
                            }
                           
                            if(t.info.po_no== 'System' || (this.find_po_success && this.find_po_success2)    ){
                            /////////////////////////////////////////
                            if(sessionStorage.getItem('keep_order_session') === 'undefined'){
                              let array = []
                              sessionStorage.setItem('keep_order_session',JSON.stringify(array))
                            }

                            setTimeout(() => {
                             theArray = JSON.parse(sessionStorage.getItem('keep_order_session'))
                              let or = theArray.customer_info.order_status
                              let rs = or.split('_')
                              if (rs.length > 0) {
                                t.info.order_status = rs[0] + '_PR'
                              }
                              sessionStorage.setItem('keep_order_session',JSON.stringify(theArray))
                             
                              }, 10);
                              t.saveDraftCheckDate('previewOrder')
                          
                            }else {

                              if(this.find_po_success2){
                                let keep_preview = Vue.localStorage.get('KEEP_PREVIEW')
                                let theArray = JSON.parse(keep_preview)
                                t.$store.dispatch('myorders/getOrderById',{items:theArray})
                                  t.runProcess = false
                                  t.runProcessCancel = false
                                  t.snackbarMsg = 'PO.NO. '+theArray.po_no+' ส่งเข้าระบบเรียบร้อยแล้ว'        
                                  t.$refs.snackbar.open()
                              }else {
                                let keep_preview = Vue.localStorage.get('KEEP_PREVIEW')
                                let theArray = JSON.parse(keep_preview)
                                t.$store.dispatch('myorders/getOrderById',{items:theArray})
                                  t.runProcess = false
                                  t.runProcessCancel = false
                                  t.snackbarMsg = 'ไม่สามารถแก้ไข PO.No. '+theArray.po_no+ ' เป็น '+ this.cheang_po + ' ได้'        
                                  t.$refs.snackbar.open()
                              }
                               
                              // console.log('Po ส่งไปละ')
                            }
                          }
                        }
                      }
                      }, 500);

                    } else {
                      t.checkDupPO()
                      t.$store.commit('myorders/SET_SPINNER_ORDER', false)
                    }
                  })
                  .catch()
              }, 5)
            }
          } else {
            this.titleCF = 'Please add at lease 1 item'
            this.descCF = ''
            this.leftBtn = ''
            this.tripleBtn = false
            this.modeCF = 'normal'
          }
        }
      } else if (action == 'sendtoOrder') {

       
        this.rightBtn = 'SEND'
        this.titleCF = 'Send to'
        this.tripleBtn = false
        this.descCF = 'sendTo'
        if (this.chiefsalesList.length > 0) {
          this.selectedChefDendto = this.chiefsalesList[0].emp_id
          this.$store.commit(
            'myorders/selectedChiefsales',
            this.chiefsalesList[0]
          )
        }
      } else if (action == 'approveOrder') {
 // this.compareBudget > this.budget || this.budget == 0
        this.tripleBtn = false
        let data = this.info
        let noBudget = this.items.filter(
          todo =>
            todo.flag_status == 'FV' ||
            todo.flag_status == 'F' ||
            todo.flag_status == 'CV' ||
            todo.flag_status == 'CP'
        )
        if (
          check  &&
          this.items.length > 0 
          // &&
          // this.info.percent_discount > 0
        ) {

          // console.log(this.budget , this.items.length )
          this.titleCF =
            'ไม่พบ discount budget กรุณาติดต่อผู้จัดการหรือผู้ดูแลระบบ'
          this.descCF = ''
          this.rightBtn = 'OK'
          this.leftBtn = ''
          this.modeCF = 'checkMinimum'
        } else if (this.sumBudgetAllRow > this.budget ) {
          // console.log(noBudget.length , data.percent_discount , this.totalDiscount_old)
          if (
            noBudget.length == 0 &&
           parseFloat(data.percent_discount) <= parseFloat(this.totalDiscount_old)
          ) {
            let dold = new Date(this.info.delivery_date)
            let dnew = new Date()
            if (dold <= dnew) {
              let nowDate = moment(new Date()).format('YYYY-MM-DD HH:MM:ss')
              let nowD = moment(new Date()).format('YYYY-MM-DD')
              let time = moment(nowD).format('YYYY-MM-DD') + ' ' + nowDate

              let rsDate = {
                customer_code: data.customer_code,
                po_date: nowDate,
                delivery_date: data.delivery_date,
                mode: 'approve'
              }
              this.getDeliveryDateAlert(rsDate)
            } else {
              this.titleCF = 'Do you want to approve this order?'
              this.rightBtn = 'CONFIRM'
              this.descCF = ''
            }
          } else {
            this.titleCF =
              'Discount Budget คงเหลือ ' +
              this.formatNumber(this.budget) +
              ' บาท'
            this.descCF = ''
            this.rightBtn = 'OK'
            this.leftBtn = ''
            this.modeCF = 'checkMinimum'
          }
        } else {
          let dold = new Date(data.delivery_date)
          let dnew = new Date()
          if (dold <= dnew) {
            let nowDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            let nowD = moment(new Date()).format('YYYY-MM-DD')
            let time = moment(nowD).format('YYYY-MM-DD') + ' ' + nowDate

            let rsDate = {
              customer_code: data.customer_code,
              po_date: nowDate,
              delivery_date: data.delivery_date,
              mode: 'preview'
            }
            
            this.getDeliveryDateAlert(rsDate)
          } else {
            this.titleCF = 'Do you want to approve this order?'
            this.rightBtn = 'CONFIRM'
            this.descCF = ''
          }
        }
      } else if (action == 'cancelOrder') {
        this.titleCF = 'Do you want to close?'
        this.descCF = ''
        this.rightBtn = 'YES'
        this.leftBtn = 'NO'
      }
       else if (
        action == 'showpono' ||
        action == 'showpono_PR' ||
        action == 'showponoALLClose' 
      ) {
        let pono = this.info.po_no == 'System' ? this.showPONO : this.info.po_no
        this.titleCF = 'PO NO. ' + pono
        this.rightBtn = 'OK'
        this.leftBtn = ''
        this.descCF = ''
        this.tripleBtn = false
      } else if (action == 'deliverydate') {
        this.titleCF = 'กรุณาตรวจสอบ Delivery date'
        this.descCF = ''
        this.leftBtn = ''
        this.tripleBtn = false
        this.modeCF = 'deliverydate'
      }
      let items_promo_order = this.itemsPromo.filter(
        todo => todo.checked == true
      )
      let items_order = this.items.filter(todo => todo.checked == true)
      let items_freegift = this.freegift.filter(todo => todo.checked == true)
      let temp = false
      let tempFg = []
      this.itemsPromo.forEach(function (row, key) {
        let promo = row['products'].filter(todo => todo.checked == true)
        if (promo.length > 0) {
          temp = true
          return true
        }
        let rs = row['freeitems'].filter(todo => todo.checked === true)
        if (rs.length > 0) {
          tempFg.push(rs)
        }
      })

      if (
        this.modeCF == 'rejectOrder' ||
        this.modeCF == 'recallOrder' ||
        this.modeCF == 'editOrder' ||
        this.modeCF == 'saveDraft' ||
        this.modeCF == 'submitOrder' ||
        this.modeCF == 'approveOrder' ||
        this.modeCF == 'sendtoOrder' ||
        this.modeCF == 'cancelOrder' ||
        this.modeCF == 'checkMinimum' ||
        this.modeCF == 'enddate' ||
        this.modeCF == 'normal' ||
        this.modeCF == 'showpono' ||
        this.modeCF == 'showpono_PR' ||
        this.modeCF == 'deleteOrder' ||
        this.modeCF == 'showError500' ||
        this.modeCF == 'showponoALLClose'
      ) {
        this.runProcess = false
        this.runProcessCancel = false
        this.$refs['md-confirm-dialog'].open()
      } else if (
        (action == 'view' || action == 'dupfreeitem') &&
        this.unitBtn == true
      ) {
        if (
          this.info.order_status == 'DRF' ||
          this.info.order_status == 'REC'
        ) {
          this.runProcess = false
          this.runProcessCancel = false
          this.$refs['md-confirm-dialog'].open()
        }
      } else if (action == 'delete' && this.delBtn == true) {
        if (
          this.info.order_status == 'DRF' ||
          this.info.order_status == 'REC'
        ) {
          this.runProcess = false
          this.runProcessCancel = false
          this.$refs['md-confirm-dialog'].open()
        }
      } else if (this.modeCF == 'deliverydate') {
        this.runProcess = false
        this.runProcessCancel = false
        this.snackbarMsg = 'กรุณาตรวจสอบ Delivery date'
        this.$refs.snackbar.open()
      }
    },
    saveDraftCheckDate (mode) {
      let clnInfo = _.cloneDeep(this.info)
      let rsYear = clnInfo.delivery_date.split('-')
      let nowD = moment(new Date()).format('YYYY-MM-DD')
      var podate = new Date(nowD)
      if (clnInfo.po_date.length > 0) {
        podate = new Date(clnInfo.po_date)
      }
      var po_dd = podate.getDate()
      var po_mm = podate.getMonth()
      var po_y = podate.getFullYear()
      let rsPoDate = moment(new Date(po_y, po_mm, po_dd + 1)).format(
        'YYYY-MM-DD'
      )
      let checkFM = moment(clnInfo.delivery_date, [
        'YYYY-MM-DD',
        'YYYY-MM-DD HH:mm:ss'
      ]).format()

      if (checkFM == 'Invalid date') {
        // console.log('PROBLEM ---> ')
        let checkFM2 = moment(clnInfo.delivery_log, [
          'YYYY-MM-DD',
          'YYYY-MM-DD HH:mm:ss'
        ]).format()
        if (checkFM2 == 'Invalid date') {
          this.info.delivery_date = rsPoDate
        } else {
          this.info.delivery_date = clnInfo.delivery_log
        }
        this.$store.dispatch('myorders/saveDraft', mode)
      } else {
        let bf = moment(clnInfo.delivery_date).isBefore(clnInfo.po_date)
        if (bf) {
          this.info.delivery_date = rsPoDate
          this.$store.dispatch('myorders/saveDraft', mode)
        } else {
          this.$store.dispatch('myorders/saveDraft', mode)
        }
      }
    },
    getDeliveryDateAlert (value) {
      let t = this
      Vue.http
        .get(Vue.config['url'] + '/get-delivery-date', {
          params: {
            customer_code: value.customer_code,
            po_date: value.po_date
          },
          headers: { Authorization: 'Bearer ' + Vue.localStorage.get('token') }
        })
        .then(
          response => {
            let result = response.body.success.data
            let rs = result.deliverydate
            let checkFM = moment(rs, [
              'YYYY-MM-DD',
              'YYYY-MM-DD HH:mm:ss'
            ]).format()
            if (checkFM != 'Invalid date' && !_.isUndefined(rs)) {
              let nowD = moment(new Date()).format('YYYY-MM-DD')
              var podate = new Date(nowD)
              if (value.po_date.length > 0) {
                nowD = moment(new Date()).format('YYYY-MM-DD')
                podate = new Date(value.po_date)
              }
              var po_dd = podate.getDate()
              var po_mm = podate.getMonth()
              var po_y = podate.getFullYear()
              let rsPoDate = moment(new Date(po_y, po_mm, po_dd + 1)).format(
                'YYYY-MM-DD'
              )
              let dold = new Date(value.delivery_date)
              let dnew = new Date()
          
              // console.log('---- 2 ------')
              // console.log(rs)
              // console.log(value.delivery_date)

              
              if (dold <= dnew || value.delivery_date <  rs) {
                t.showDeliveryDate = moment(new Date(rs)).format('DD/MM/YYYY')
                t.descCF = 'delivery_date'
              } else {
                t.descCF = ''
              }
            }
            if (value.mode == 'approve') {
              this.titleCF = 'Do you want to approve this order?'
              this.rightBtn = 'CONFIRM'
            } else if (value.mode == 'confirm') {
              this.titleCF = 'Do you confirm to order?'
              this.rightBtn = 'CONFIRM'
              this.tripleBtn = false
              this.modeCF = 'submitOrder'
            } else {
              t.titleCF = 'Do you want to preview this order?'
              t.rightBtn = 'CONFIRM'
              t.tripleBtn = false
              t.runProcess = false
              t.runProcessCancel = false
              t.$refs['md-confirm-dialog'].open()
            }

            // success callback
          },
          response => {
            // error callback
            if (response.status == 500) {
            }
          }
        )
    },
    submitCF () {
      this.runProcessPR = false
      this.runProcess = true
      this.runProcessCancel = true
      if (this.modeCF == 'delete') {
        this.$refs['md-confirm-dialog'].close()
        this.$store.dispatch('myorders/deleteItem', { parent: this.headChk })
      } else if (this.modeCF == 'view') {
        this.$refs['md-confirm-dialog'].close()
        this.$store.dispatch('myorders/viewItem')
      } else if (this.modeCF == 'dupfreeitem') {


        this.$refs['md-confirm-dialog'].close()
        this.$store.dispatch('myorders/dupFreeitem')
        this.unitBtn = false
        this.delBtn = false
      } else if (this.modeCF == 'deleteOrder') {
        this.$refs['md-confirm-dialog'].close()
        this.$store.dispatch('myorders/deleteOrder')
        this.closeDlg('createOrder_dialog')
        Vue.localStorage.set('ORD_DIALOG', JSON.stringify(this.orderDialog))
         sessionStorage.setItem('keep_order_session',JSON.stringify(this.orderDialog))
        Vue.localStorage.set('ORD_DIALOG_SHOW', 'CLOSE')
        sessionStorage.setItem('ORD_DIALOG_SHOW_SESSION','CLOSE')
      } else if (this.modeCF == 'saveDraft') {
        let data = this.info
        let t = this
        this.$store.commit('myorders/SET_SPINNER_ORDER', true)
        Vue.http
          .get(Vue.config['url'] + '/check-po', {
            params: {
              po_no: data.po_no,
              h_id: data.id
            },
            headers: {
              Authorization: 'Bearer ' + Vue.localStorage.get('token')
            }
          })
          .then(response => {
            let rs = response.body.success.data
            if (rs.status == true) {
              t.$store.commit('myorders/SET_SPINNER_ORDER', false)
              t.saveDraftCheckDate('saveDraft')
            } else {
              t.checkDupPO()
              t.$store.commit('myorders/SET_SPINNER_ORDER', false)
            }
          })
          .catch()
      } else if (this.modeCF == 'submitOrder') {
        console.log(' SUBB =>' , this.info )
        // exit();
          let check_ = true
          let array_temp = []
          if(!_.isNull(Vue.localStorage.get('PO_SUCCESS'))){
            // console.log('check Submit order =>', JSON.parse(sessionStorage.getItem('keep_order_session')))
            let array_po = JSON.parse(sessionStorage.getItem('keep_order_session'))
            // console.log(array_po.customer_info.h_id)
             check_ = true
            let theArray_ = JSON.parse(Vue.localStorage.get('PO_SUCCESS'))
            for(var i = 0; i < theArray_.length; i++) {
                if(theArray_[i].id == array_po.customer_info.h_id) {
                  array_temp = theArray_[i]
                  check_ = false
                  break;
                }
              }
          }
        //  console.log('check_ =>',check_)
      // Vue.localStorage.set('PO_SUCCESS', JSON.stringify(theArray_))
      if(check_){
        // console.log('OK')
      }else {
        // console.log(array_temp)
        array_temp = {h_id :array_temp.id, doc_no: array_temp.doc_no , po_no:array_temp.po_no}
        this.$store.dispatch('myorders/getOrderById',{items:array_temp})
        this.runProcess = false
        this.runProcessCancel = false
        this.snackbarMsg = 'PO.NO. '+array_temp.po_no+' ส่งเข้าระบบเรียบร้อยแล้ว'        
        this.$refs.snackbar.open()
        this.$refs['md-confirm-dialog'].close()
        // console.log('Nor Ok')
      }
                Vue.localStorage.set("STATUS_BTN_PREVIEW",'false')
                let payBy = false
                let data = this.info
                let poDate = moment(data.po_date).format('YYYY-MM-DD')
                let deliveryDate = moment(data.delivery_date).format('YYYY-MM-DD')
                Vue.localStorage.remove('FROMPAGE')
                Vue.localStorage.remove('BK_DETAIL')
                if (
                  data.pay_by_cash == true &&
                  (this.payByCash.cust_addr1.trim().length == 0 ||
                    this.payByCash.sent_to_cus_name.trim().length == 0 ||
                    this.payByCash.receive_name.trim().length == 0 ||
                    (this.payByCash.tax_id.length >= 0 &&
                      this.payByCash.tax_id.length < 10) ||
                      this.payByCash.tax_id.length > 13)
                ) {
                  payBy = true
                }

                if (
                  (this.items.length > 0 || this.itemsPromo.length > 0) &&
                  payBy == false &&
                  poDate != deliveryDate
                ) {
                  console.log(this.items)
                  let countRef = this.items.filter(
                    todo =>
                      _.isUndefined(todo.ref_po_no) || _.trim(todo.ref_po_no).length < 2
                  )
                  let count = countRef.filter(
                    todo =>
                      todo.flag_status == 'CV' ||
                      todo.flag_status == 'CP' ||
                      todo.flag_status == 'FV' ||
                    ( todo.flag_status == 'F' &&  todo.bk_status != 'B' )
                  )
                  if (count.length == 0) {
                    count = countRef.filter(
                      todo =>
                        todo.flag_status == 'A' &&
                        parseFloat(todo.price) !== parseFloat(todo.ppu) &&
                        parseFloat(todo.price) === 0
                    )
                  } else {
                    _.remove(count, function (val) {
                      if (
                        parseFloat(val.price) < parseFloat(val.ppu) &&
                        parseFloat(val.price) > parseFloat(val.priceVD) &&
                        parseFloat(val.priceVD) > 0
                      ) {
                        return true
                      }
                    })
                  }
// console.log('countRef =' ,countRef)
                  let countQty = countRef.filter(todo => todo.order_qty == 0)
                  let countPPU = countRef.filter(todo => parseFloat(todo.ppu) == 0 && todo.bk_status != 'B' )
                  if (
                    countQty.length == 0 &&
                    data.salesman != '' &&
                    data.customer_code != '' &&
                    data.customer_name != '-'
                  ) {
                    let data = this.info
                    let t = this
                    this.$store.commit('myorders/SET_SPINNER_ORDER', true)
                    Vue.http
                      .get(Vue.config['url'] + '/check-po', {
                        params: {
                          po_no: data.po_no,
                          h_id: data.id
                        },
                        headers: {
                          Authorization: 'Bearer ' + Vue.localStorage.get('token')
                        }
                      })

                      .then(response => {
                        let rs = response.body.success.data
                        if (rs.status == true) {
                            // console.log(JSON.parse(Vue.localStorage.get('ORD_DIALOG')).customer_info.doc_no)
                            // console.log(JSON.parse(Vue.localStorage.get('ORD_DIALOG')).customer_info.h_id)
                            if(Vue.localStorage.get('PO_SUCCESS') == null){
                                const data_map = []
                                data_map.push({
                                  
                                id:JSON.parse(sessionStorage.getItem('keep_order_session')).customer_info.h_id,
                                po_no:JSON.parse(sessionStorage.getItem('keep_order_session')).customer_info.po_no,
                                doc_no:JSON.parse(sessionStorage.getItem('keep_order_session')).customer_info.doc_no,
                            })
                            Vue.localStorage.set('PO_SUCCESS',JSON.stringify(data_map))
                                // console.log('Po null =>',data_map)
                            }else {
                              const data_map = JSON.parse(Vue.localStorage.get('PO_SUCCESS'))
                              data_map.push({
                                id:JSON.parse(sessionStorage.getItem('keep_order_session')).customer_info.h_id,
                                po_no:JSON.parse(sessionStorage.getItem('keep_order_session')).customer_info.po_no,
                                doc_no:JSON.parse(sessionStorage.getItem('keep_order_session')).customer_info.doc_no,
                            })
                              Vue.localStorage.set('PO_SUCCESS',JSON.stringify(data_map))
                            }
                            
                          if (count.length > 0 || t.tempCommentStatus == true) {
                            t.$store.dispatch('myorders/submitOrder', 'submitOrder')
                            // console.log('1 >>> ')
                            // console.log('-----------------')
                          } else if (
                            t.commentList.length > 0 &&
                            (data.order_status == 'DRF' ||
                              data.order_status == 'DRF_PR')
                          ) {
                            t.$store.dispatch('myorders/submitOrder', 'submitOrder')
                            // console.log('2 >>> ')
                          } else if (
                            data.order_status == 'REC' ||
                            data.order_status == 'REC_PR'
                          ) {
                            if (countPPU.length > 0 || t.commentList.length > 0) {
                              t.$store.dispatch('myorders/submitOrder', 'submitOrder')
                              // console.log('3 >>> ')
                            } else {
                              t.$store.dispatch(
                                'myorders/submitOrder',
                                'submitOrderAuto'
                              )
                              // console.log('4 >>> ')
                            }
                          } else if (countPPU.length > 0) {
                            t.$store.dispatch('myorders/submitOrder', 'submitOrder')
                            // console.log('5 >>> ')
                          } else {
                            t.$store.dispatch('myorders/submitOrder', 'submitOrderAuto')
                            // console.log('6 >>> ')
                          }
                        } else {
                          t.checkDupPO()
                        }
                      })
                      .catch()
                  }
        }
        } else if (this.modeCF == 'recallOrder') {
        this.$refs['md-confirm-dialog'].close()
        this.$store.dispatch('myorders/submitOrder', 'recallOrder')
        this.closeDlg('createOrder_dialog')
        Vue.localStorage.set('ORD_DIALOG', JSON.stringify(this.orderDialog))
         sessionStorage.setItem('keep_order_session',JSON.stringify(this.orderDialog))
        Vue.localStorage.set('ORD_DIALOG_SHOW', 'CLOSE')
        sessionStorage.setItem('ORD_DIALOG_SHOW_SESSION','CLOSE')
      } else if (this.modeCF == 'editOrder') {

        this.$refs['md-confirm-dialog'].close()
        this.$store.dispatch('myorders/editOrderFromReject')
      } else if (this.modeCF == 'rejectOrder') {
        let ipy = this.txtComment.trim()
        if (ipy.length > 0) {
          let temp = {
            id: '',
            doc_no: '',
            position: Vue.localStorage.get('department'),
            emp_id: Vue.localStorage.get('emp_id'),
            first_name: Vue.localStorage.get('first_name'),
            last_name: Vue.localStorage.get('last_name'),
            status: 'N',
            createdate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            comment: this.txtComment.trim(),
            emp_id_start: '',
            popup: false,
            msg_to: ''
          }
          this.$refs['md-confirm-dialog'].close()
          this.$store.commit('myorders/SET_POPUP_COMMENT', [])
          this.$store.commit('myorders/SET_POPUP_COMMENT', temp)
          this.$store.dispatch('myorders/submitOrder', 'rejectOrder')
          this.$store.dispatch('myorders/replyComment', temp)
          this.closeDlg('createOrder_dialog')
          Vue.localStorage.set('ORD_DIALOG', JSON.stringify(this.orderDialog))
           sessionStorage.setItem('keep_order_session',JSON.stringify(this.orderDialog))
          Vue.localStorage.set('ORD_DIALOG_SHOW', 'CLOSE')
           sessionStorage.setItem('ORD_DIALOG_SHOW_SESSION','CLOSE')
          this.txtComment = ''
        } else {
          this.runProcess = false
          this.runProcessCancel = false
          this.$refs.commentIpu.$el.focus()
        }
      } else if (this.modeCF == 'sendtoOrder') {
        let ipy = this.setdToComment.trim()
        if (ipy.length > 0) {
          let temp = {
            id: '',
            doc_no: '',
            position: Vue.localStorage.get('department'),
            emp_id: Vue.localStorage.get('emp_id'),
            first_name: Vue.localStorage.get('first_name'),
            last_name: Vue.localStorage.get('last_name'),
            status: 'N',
            createdate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            comment: this.setdToComment.trim(),
            emp_id_start: '',
            popup: false,
            msg_to: ''
          }
          this.$store.commit('myorders/SET_POPUP_COMMENT', [])
          this.$store.commit('myorders/SET_POPUP_COMMENT', temp)
          this.$store.dispatch('myorders/submitOrder', 'sendtoOrder')
          this.$store.dispatch('myorders/replyComment', temp)
          this.setdToComment = ''
        }
        this.$refs['md-confirm-dialog'].close()
        this.closeDlg('createOrder_dialog')
        Vue.localStorage.set('ORD_DIALOG', JSON.stringify(this.orderDialog))
        sessionStorage.setItem('keep_order_session', JSON.stringify(this.orderDialog))
        Vue.localStorage.set('ORD_DIALOG_SHOW', 'CLOSE')
        sessionStorage.setItem('ORD_DIALOG_SHOW_SESSION','CLOSE')
      } else if (this.modeCF == 'approveOrder') {
        this.$refs['md-confirm-dialog'].close()
        this.$store.dispatch('myorders/submitOrder', 'approveOrder')
        this.closeDlg('createOrder_dialog')
        Vue.localStorage.set('ORD_DIALOG', JSON.stringify(this.orderDialog))
        sessionStorage.setItem('keep_order_session', JSON.stringify(this.orderDialog))
        Vue.localStorage.set('ORD_DIALOG_SHOW', 'CLOSE')
        sessionStorage.setItem('ORD_DIALOG_SHOW_SESSION','CLOSE')
      } else if (this.modeCF == 'cancelOrder') {
        this.$refs['md-confirm-dialog'].close()
        this.closeDlg('createOrder_dialog')
        Vue.localStorage.set('ORD_DIALOG', JSON.stringify(this.orderDialog))
        sessionStorage.setItem('keep_order_session', JSON.stringify(this.orderDialog))
        Vue.localStorage.set('ORD_DIALOG_SHOW', 'CLOSE')
        sessionStorage.setItem('ORD_DIALOG_SHOW_SESSION','CLOSE')
        let fromPage = Vue.localStorage.get('FROMPAGE')
        if (!_.isNull(fromPage)) {
          if (fromPage == 'BACKORDERS') {
            this.$router.push({ path: '/orders/my-back-order' })
            Vue.localStorage.remove('FROMPAGE')
            Vue.localStorage.remove('BK_DETAIL')
          }
        } else {
          Vue.localStorage.remove('FROMPAGE')
          Vue.localStorage.remove('BK_DETAIL')
        }
      } else if (this.modeCF == 'checkMinimum' || this.modeCF == 'enddate') {
        this.$refs['md-confirm-dialog'].close()
      } else if (this.modeCF == 'normal') {
        this.$refs['md-confirm-dialog'].close()
      } else if (
        this.modeCF == 'showpono' ||
        this.modeCF == 'showponoALLClose'
      ) {
        this.$refs['md-confirm-dialog'].close()
        this.closeDlg('createOrder_dialog')
        Vue.localStorage.set('ORD_DIALOG', JSON.stringify(this.orderDialog))
        sessionStorage.setItem('keep_order_session', JSON.stringify(this.orderDialog))
        Vue.localStorage.set('ORD_DIALOG_SHOW', 'CLOSE')
        sessionStorage.setItem('ORD_DIALOG_SHOW_SESSION','CLOSE')
      } else if (this.modeCF == 'showpono_PR') {
        this.$refs['md-confirm-dialog'].close()
      } else if (this.modeCF == 'deliverydate') {
        this.$refs['md-confirm-dialog'].close()
      } else if (this.modeCF == 'showError500') {
        let data = this.info
        this.$refs['md-confirm-dialog'].close()
        this.$store.dispatch('myorders/reCallGetShipTo', {
          code: data.customer_code,
          action: 'submitCF'
        })
      } else if (this.modeCF == 'previewOrder') {
        // let ord_dilog = Vue.localStorage.get('ORD_DIALOG')
        let ord_dilog = sessionStorage.getItem('keep_order_session')
        let theArray = JSON.parse(ord_dilog)
        if (!_.isNull(ord_dilog)) {
          if (theArray.customer_info.order_status == 'REJ') {
            this.info.order_status = 'DRF_PR'
          } else {
            let or = theArray.customer_info.order_status
            let rs = or.split('_')
            if (rs.length > 0) {
              this.info.order_status = rs[0] + '_PR'
            }
          }
        }
        this.saveDraftCheckDate('previewOrder')
        // console.log('pre')
        this.$refs['md-confirm-dialog'].close()
      }
    },
    saveAndClose () {
      let data = this.info
      let checkY = data.delivery_date.split('-')
      var ch1 = new Date()
      var po_y = ch1.getFullYear()

      if (
        _.trim(data.delivery_date).length < 10 ||
        _.trim(data.delivery_date).length > 19
      ) {
        this.openCF('deliverydate')
      } else {
        // if (data.order_status != "DRF_PR" && data.order_status != "REC_PR") {
        //   this.$refs["md-confirm-dialog"].close();
        //   console.log("C2")
        // }
        let t = this
        this.$store.commit('myorders/SET_SPINNER_ORDER', true)
        Vue.http
          .get(Vue.config['url'] + '/check-po', {
            params: {
              po_no: data.po_no,
              h_id: data.id
            },
            headers: {
              Authorization: 'Bearer ' + Vue.localStorage.get('token')
            }
          })
          .then(response => {
            let rs = response.body.success.data
            if (rs.status == true) {
              t.saveDraftCheckDate('saveDraftAndClose')
              // t.closeDlg("createOrder_dialog");
            } else {
              t.checkDupPO()
            }
          })
          .catch(error => Promise.reject(error))
      }
    },
    editNetPrice (value, e) {
      if (_.isUndefined(value.row.bk_status) || value.row.bk_status == '') {
        let item = 'netprice-' + value.row.id + '-' + value.row.flag_status
        this.$store.dispatch('myorders/editNetPrice', value)
        let el = document.getElementById(item)

        let theArray = this.items[value.indexDetail]

        if (this.autoBtn == true) {
          setTimeout(function () {
            el.disabled = false
          }, 50)
          if (theArray.editMode) {
            setTimeout(function () {
              el.focus()
            }, 100)
          }
        }
      }
    },
    renderIcon () {
      let promo = this.itemsPromo.filter(todo => todo.checked == true)
      let items = this.items.filter(todo => todo.checked == true)
      let freegift = this.freegift.filter(todo => todo.checked == true)
      let temp = false
      this.itemsPromo.forEach(function (row, key) {
        let promo = row['products'].filter(todo => todo.checked == true)
        if (promo.length > 0) {
          temp = true
          return true
        }
      })
      if (
        promo.length > 0 ||
        items.length > 0 ||
        freegift.length > 0 ||
        temp == true
      ) {
        return true
      } else {
        return false
      }
    },
    renderFlow () {
      if (this.keepRouter) {
        if (
          this.info.order_status == 'DRF' ||
          this.info.order_status == 'DRF_PR'
          ) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    renderCnk (input, row) {
      if(input == 'qtyItem'){
        // console.log(row , this.bkMode)
      }
      let order_status = this.info.order_status
      // console.log(input ,)
      // console.log(order_status)
      if (this.keepRouter) {
        if (order_status == 'DRF' || order_status == 'REC') {
          this.titleOrder = 'New Order Create Form'
          let fromPage = Vue.localStorage.get('FROMPAGE')

          if (
            this.bkMode == 'KM' &&
            (input == 'searchcg' || input == 'addmore')
          ) {
            return true
          } else if (
            this.bkMode != 'KM' &&
            (input == 'searchcg' || input == 'addmore')
          ) {
            if (
              _.trim(this.info.customer_channel_code).length == 0 ||
              _.trim(this.info.price_policy_code).length == 0 ||
              _.trim(this.info.customer_channel_code) == '00' ||
              _.trim(this.info.customer_channel_code) == '000'
            ) {
              return true
            } else {
              return false
            }
          } else if (input == 'qtyItem' && this.bkMode == 'KM') {
            return true
          } else if (input == 'addpromo') {
            if (
              _.trim(this.info.customer_channel_code).length == 0 ||
              _.trim(this.info.price_policy_code).length == 0 ||
              _.trim(this.info.customer_channel_code) == '00' ||
              _.trim(this.info.customer_channel_code) == '000'
            ) {
              return true
            } else if (
              _.toUpper(this.info.price_policy_code) == 'AUTO' &&
              _.toUpper(this.info.customer_channel_code) == '100'
            ) {
              if (this.bkMode == 'KM') {
                return true
              } else {
                return false
              }
            } else if (_.toUpper(this.info.price_policy_code) == 'FLEX') {
              if (this.bkMode == 'KM') {
                return true
              } else {
                return false
              }
            } else {
              return true
            }
          } else if (input == 'qtyItem' && this.bkMode == 'K1') {

            if (row.ref_po_no != '' ) {
              console.log(row,' == 1 == ')
              console.log(row)
              return true
            } else {
              console.log(row,' == 2 == ')
              row.ref_po_no = ''
              row.po_backorder = ''
              // console.log(row)
              return false
            }

          } else if (input == 'checkboxchild') {
            if (this.info.po_no == 'System') {
              return false
            } else {
              if (
                !_.isUndefined(row.ref_po_no) &&
                _.trim(row.ref_po_no).length > 2
              ) {
                return true
              } else {
                return false
              }
            }
          } else {
            return false
          }
        } else if (order_status == 'DRF_PR') {
          // console.log('DRF_PR')
          this.titleOrder = 'Preview Order'
          return true
        } else {
          this.titleOrder = 'Order Detail'
          return true
        }
      } else {
        this.titleOrder = 'Order Detail'
        return true
      }
    },
    showCheckDisable () {
      this.optVolDis.display = false
      this.keepOpenVol = ''
      if (this.info.customer_code == '') {
        this.snackbarMsg = 'Please Select customer'
        this.$refs.snackbar.open()
      }
    },
    countDiscount (value, mode) {
      let rsPPU = value.ppu - value.price
      let rs = rsPPU / value.ppu
      let dash = mode == true ? '-' : ''
      if (rs > 0) {
        // round ทศนิยม
        let all = rs * 100
        let all4 = _.round(all, 4)
        let all3 = _.round(all4, 3)
        let all2 = _.round(all3, 2)
        return dash + all2 + '%'
      } else {
        return '-'
      }
    },
    chooseSendTo (value) {
      this.$store.commit('myorders/selectedChiefsales', value)
      // this.display = false;
      // this.$store.commit("myorders/selectedChiefsales", value);
      // this.openCF("sendtoOrder");
    },
    closeSendTo (value) {
      this.display = value
    },
    dupOrder () {
      this.closeDlg(this.idDialog)
      this.$store.dispatch('myorders/dupOrder', {})
    },
    filterItems (param) {
      this.keepSearch = param
      this.$store.commit('myorders/setMasterCG', [])
      if (param.length > 1) {
        if (this.info.customer_code == '') {
          this.$refs.snackbar.open()
        }
      } else if (param.length == 0) {
        this.$store.commit('myorders/setMasterCG', [])
      }
    },
    submitSearch (evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (charCode == 13 || evt.type === 'click') {
        if (this.keepSearch.length > 1) {
          if (this.info.customer_code == '') {
            this.$refs.snackbar.open()
          } else {
            this.$store.dispatch('myorders/searchCG', {
              keyword: this.keepSearch
            })
          }
        }
      }
    },
    selectCG (value) {
      this.$store.dispatch('myorders/selectCG', value)
    },
    selectItem (value) {
         setTimeout(() => {
          this.nextFocus(this.$store.getters['myorders/items_order'].length)
        }, 150);
      this.$store.dispatch('myorders/selectItem', value)
    },
    clearSearch () {
      this.$store.commit('myorders/setMasterCG', [])
    },
    closeDlg (id) {
      this.runProcessPR = false
      this.btnPreviewOrder = false
      this.$emit('closedlg', id)
    },
    addOrder () {
      this.showPromo = true
    },
    showPromotion () {
      this.optVolDis.display = false
      this.keepOpenVol = ''
      let order_status = this.info.order_status
      if (this.keepRouter) {
        this.$store.commit('myorders/setPercentDiscPM', 0)
        this.$store.commit('myorders/setPromotionSet', [])
        this.$store.commit('myorders/selectedPromo', [])
        this.$store.commit('myorders/selectedFreegift', [])
        if (order_status == 'DRF' || order_status == 'REC') {
          if (this.info.customer_code == '') {
            this.snackbarMsg = 'Please Select customer'
            this.$refs.snackbar.open()
          } else {
            this.$store.commit(
              'myorders/setFucusCustomers',
              this.info.customer_code
            )
            this.showPromo = false
            this.$store.commit('myorders/setPromoMode', 'add')
            this.$store.dispatch('myorders/showPromotion')
            this.$emit('showpromotion')
          }
        }
      }
    },
    editPromotion (value, index, mode) {
      if (mode == false) {
        this.showPromo = false
        this.$emit('showpromotion')
        this.$store.dispatch('myorders/editPromoById', value)
      }
    },
    checkDupPO () {
      this.runProcessPR = false
      this.runProcessCancel = false
      this.snackbarMsg = 'Duplicate PO.No.'
      this.$refs.snackbar.open()
    },
    closeCF () {
      if (this.modeCF == 'previewOrder') {
        this.runProcessPR = false
      } else if (this.modeCF == 'normal') {
        this.runProcessPR = false
      }
      this.$refs['md-confirm-dialog'].close()
      this.$store.commit('myorders/SET_SPINNER_ORDER', false)
    },
    closeDialog (ref, type) {
      this.$refs[ref].close()
    },
    viewFormatter (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },
    formatNumberInt (value) {
      return this.$store.getters['globalfunc/formatNumberInt'](value)
    },
    formatNumber (value) {
      return this.$store.getters['globalfunc/formatNumber'](value)
    },
    fmRound (value) {
      // round ทศนิยม
      let value4 = _.round(value, 4)
      let value3 = _.round(value4, 3)
      let value2 = _.round(value3, 2)
      return this.$store.getters['globalfunc/formatNumber'](value2)
    },
        nextFocus(param) {
      // console.log('length => ',this.items.length)
      // console.log('index ==>', param)
      if(param+1 < this.items.length){
        document.getElementById('item_order_qty_'+(param+1)).focus()
        // console.log('1')
      } else if(param+1 == this.items.length){
          // console.log('2', document.getElementById('search_product').childNodes[0].childNodes[0])
          // document.getElementById('search_product').focus()
          // document.getElementById('item_order_qty_'+0).focus()
          document.getElementById('search_product').childNodes[0].childNodes[0].focus()
      }else {
        // console.log('3')
        document.getElementById('item_order_qty_'+(param-1)).focus()
      }
    },
    check_po_success(){
          let check_ = true
          let array_temp = []
          if(!_.isNull(Vue.localStorage.get('PO_SUCCESS'))){
            // console.log('check Submit order =>', JSON.parse(sessionStorage.getItem('keep_order_session')))
            let array_po = JSON.parse(sessionStorage.getItem('keep_order_session'))
            // console.log(array_po.customer_info.h_id)
             check_ = true
            let theArray_ = JSON.parse(Vue.localStorage.get('PO_SUCCESS'))
            for(var i = 0; i < theArray_.length; i++) {
                if(theArray_[i].id == array_po.customer_info.h_id) {
                  array_temp = theArray_[i]
                  check_ = false
                  break;
                }
              }
          }
            let check_rs = {check_:check_,array_temp:array_temp}
          return check_rs
    }

  },
  components: {
    'sento-block': require('./sento-block'),
    'md-product-dialog': require('./all-product-dialog'),
    'mds-input': require('./orderqty-input'),
    'customer-info': require('./customer-info'),
    'volume-discount': require('./volume-discount'),
    'md-search-checkbox': require('../../Salesops/customComponent/md-search-checkbox'),
    'md-flow-bar': require('../../Salesops/customComponent/md-flow-bar'),
    'md-dropdown-box': require('./md-dropdown-box'),
    Datepicker
  },
  directives: {
    sticky: VueSticky
  }
}
</script>
<style lang="scss" scoped>
$font-roboto: Roboto;
$color-red: #f44336;
.vol-discount {
  width: 24px;
  min-width: 24px;
  height: 24px;
  min-height: 24px;
  background: #fd7f00;
  border-radius: 15px;
  text-align: center;
  padding-top: 2px;
  cursor: pointer;
  span {
    color: White;
  }
}
.md-dialog-actions {
  // background: red;
  background: #fafafa;
  height: 60px;
  padding: 18px 30px 18px 33px;
  font-size: 16px;
  font-family: $font-roboto;
  font-weight: bold;
  .md-red {
    color: $color-red;
  }
  .md-gray {
    color: #a8a8a8;
  }
}
.md-dialog-total {
  // padding-top: 12px;
  padding-left: 10px;
  padding-right: 30px;
  font-family: $font-roboto;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.16);
  height: 45px;
  width: 100%;
  display: flex;
  .number {
    color: #414141;
    font-weight: 600;
    text-align: right;
    font-size: 12px;
    font-family: lato;
  }
}
.md-dialog-content {
  .md-promotion-table {
    .head-table {
      display: flex;
      padding-bottom: 8px;
      width: 100%;
      color: rgba(0, 0, 0, 0.87);
      // opacity: 0.9;
      // color: #414141;
      font-size: 12px;
      margin-right: 1%;
      .md-checkbox {
        margin: unset;
        .md-checkbox-container {
          border: 2px solid #707070;
        }
      }
    }
    .detail-scroll-table {
      overflow-y: auto;
      overflow-x: hidden;
      width: 100%;
      .edit-net-price {
        font-size: 14px;
        color: #a8a8a8;
        padding-left: 5px;
        padding-top: 7px;
      }
      .title-promo {
        color: #5a5a5a;
        font-size: 13px;
        font-family: kanit;
        font-weight: bold;
      }
      .detail-table {
        width: 100%;
        margin-right: 1%;
        display: flex;
        font-size: 13px;
        // color: #5a5a5a;
        color: rgba(0, 0, 0, 0.87);
        // opacity: 0.9;
        .ipt-table {
          padding-left: 15px;
          .md-input-container {
            margin: unset;
            padding: unset;
            height: 30px;
            min-height: 30px;
          }
          .md-input-container.md-input-disabled:after {
            background-color: rgba(0, 0, 0, 0.12);
            background-image: unset;
          }
          &.netpriceCls {
            .md-input-container.md-input-disabled:after {
              background-color: white;
              background-image: unset;
            }
          }
        }
        .md-checkbox {
          margin-top: 8px;
          margin-bottom: 0px;
          margin-left: 0px;
          margin-right: 0px;
          .md-checkbox-container {
            border: 2px solid #707070;
          }
        }
        .md-rectangle-tag .rectangle-text {
          width: auto;
          border-radius: 16px;
          background: #a8a8a8;
          font-family: roboto;
          font-size: 8px;
          padding: 0 6px 0 6px;
          font-weight: unset;
        }
        .unit {
          color: rgba(0, 0, 0, 0.87);
          // opacity: 0.9;
          // color: #898989;
          font-size: 11px;
          font-family: kanit;
        }
      }
      &::-webkit-scrollbar {
        height: 5px;
        width: 6px;
        background-color: white;
      }
      &::-webkit-scrollbar-thumb {
        background: #a8a8a8;
        border-radius: 3px;
      }
    }
  }
  .scroll-main-table {
    &::-webkit-scrollbar {
      height: 5px;
      width: 6px;
      background-color: white;
    }
    &::-webkit-scrollbar-thumb {
      background: #a8a8a8;
      border-radius: 3px;
    }
  }
}
</style>