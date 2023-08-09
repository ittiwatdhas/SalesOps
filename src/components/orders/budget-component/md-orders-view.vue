<template>
  <div>
    <div class="md-dialog-title">
      <md-layout>
        <md-layout md-flex-large="70">
          <label class="sub-title kanitFont">{{titleOrder}}</label>
        </md-layout>
        <md-layout md-flex-large="30" md-align="end">
          <md-icon @click.native="close" style="cursor:pointer;margin-right:30px">close</md-icon>
        </md-layout>
      </md-layout>
    </div>
    <div class="md-dialog-content">
      <div
        class="scroll-main-table"
        :style="{'height' : 'calc(100vh - 180px)','overflow-y':'auto !important','padding-right':'2px'}"
      >
        <md-flow-bar :data="data.flow" style="margin-top:14px"></md-flow-bar>
        <md-layout md-flex="100" class="mt-10">
          <div class="customer-info-box">
            <div style="display: flex;width:100%">
              <!--CUSTOMER INFO-->
              <div style="width:26%">
                <label class="topic">CUSTOMER INFO</label>
                <div class="bg-filter" style="padding:10px 0px 10px 20px">
                  <div style="width:100%">
                    <div class="title-ipt">Customer Code</div>
                    <div style="display: -webkit-box;">
                      <div class="title-ipt-roboto" style="width:90%">{{data.head.cust_code}}</div>
                      <md-icon
                        v-if="data.head.customer_name_th != '-'"
                        style="margin-top:0px;font-size:23px;color:#a8a8a8;cursor:pointer"
                      >search</md-icon>
                    </div>
                  </div>
                  <div style="width:100%;margin-top:8px">
                    <div class="title-ipt">Customer Name</div>
                    <div style="display: -webkit-box;">
                      <div
                        class="title-ipt-kanit"
                        style="padding-bottom: 0px;height:19px;width:90%"
                      >
                        {{data.head.customer_name_th}}
                        <md-tooltip md-direction="top">{{data.head.customer_name_th}}</md-tooltip>
                      </div>
                      <md-icon
                        v-if="data.head.customer_name_th != '-'"
                        style="margin-top:0px;font-size:20px;color:#a8a8a8;cursor:pointer"
                      >error</md-icon>
                      <md-tooltip
                        md-direction="bottom"
                        class="mds-tooltips"
                      >{{data.head.customer_address}}</md-tooltip>
                    </div>
                  </div>
                </div>
              </div>
              <!--PURCHASE INFO-->
              <div style="margin-left:15px;width:74%">
                <label class="topic">PURCHASE INFO</label>
                <div style="display: flex;">
                  <div class="bg-filter-blog" style="width:19%;padding:10px 0px 10px 20px">
                    <div style="width:100%">
                      <div class="title-ipt">{{showInpoutName('po_no')}}</div>
                      <div
                        class="title-ipt-roboto"
                        style="border-bottom: 1px solid #C9C9C9;"
                      >{{data.head.po_no}}</div>
                    </div>
                    <div style="width:100%;margin-top:15px;">
                      <div class="title-ipt">{{showInpoutName('po_date')}}</div>
                      <div
                        class="title-ipt-roboto"
                        style="margin-bottom:10px"
                      >{{viewFormatter(data.head.po_date)}}</div>
                    </div>
                  </div>
                  <div class="bg-filter-blog" style="width:19%;padding:10px 0px 10px 20px">
                    <div style="width:100%">
                      <div class="title-ipt">Creator</div>
                      <div
                        class="title-ipt-kanit"
                      >{{data.head.user_create_name_th}}&nbsp;{{data.head.user_create_lastname_th}}</div>
                    </div>
                    <div style="width:100%;margin-top:11px">
                      <div class="title-ipt">{{showInpoutName('delivery_date')}}</div>
                      <div
                        class="title-ipt-roboto"
                        style="margin-bottom:10px"
                      >{{viewFormatter(data.head.delivery_date)}}</div>
                    </div>
                  </div>
                  <div class="bg-filter-blog" style="width:19%;padding:10px 0px 10px 20px">
                    <div style="width:100%">
                      <div class="title-ipt">{{showInpoutName('salesman')}}</div>
                      <div
                        class="title-ipt-kanit"
                      >{{data.head.sm_code}}&nbsp;{{data.head.first_name}}&nbsp;{{data.head.last_name}}</div>
                    </div>
                    <div style="width:100%;margin-top:11px">
                      <div class="title-ipt">{{showInpoutName('ship_to')}}</div>
                      <div class="title-ipt-kanit" style="margin-bottom:10px">
                        {{data.head.ship_to}}
                        <md-tooltip md-direction="bottom" class="mds-tooltips">{{data.head.ship_to}}</md-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="bg-filter-blog" style="width:18.5%;padding:10px 0px 10px 20px">
                    <div style="width:100%">
                      <div class="title-ipt">{{showInpoutName('priority')}}</div>
                      <div class="title-ipt-roboto">{{data.head.priority_title}}</div>
                    </div>
                    <div style="width:100%;margin-top:11px">
                      <div class="title-ipt">{{showInpoutName('warehouse')}}</div>
                      <div
                        class="title-ipt-kanit"
                        style="margin-bottom:10px"
                      >{{showWarehouse(data.head.warehouse_code)}}</div>
                    </div>
                  </div>
                  <div
                    class="bg-filter-blog takeNoteIP"
                    style="width:18.5%;padding:10px 0px 10px 20px"
                  >
                    <div style="width:100%">
                      <div class="title-ipt">{{showInpoutName('take_note')}}</div>
                      <div class="title-ipt-kanit">{{data.head.take_note}}</div>
                      <div
                        class="show-take-note"
                        v-if="data.head.take_note != null && data.head.take_note != ''"
                      >{{data.head.take_note}}</div>
                    </div>
                    <div class="md-search-checkbox" style="display: -webkit-box;">
                      <div style="padding-top:18px">
                        <input
                          type="checkbox"
                          v-model="data.head.pay_by_cash"
                          :disabled="true"
                          style="height: 20px;width: 20px;"
                        />
                      </div>
                      <div
                        @click="showPayByCash('open')"
                        style="font-family: Roboto;
                  padding-top: 22px;
                  cursor: pointer;
                  font-size: 12px !important;
                  color: #727272
                  line-height: 11px;"
                      >Pay by Cash</div>
                    </div>
                  </div>
                  <div class="bg-filter-blog" style="padding:unset;width:6%">
                    <div
                      @click="openComment($event)"
                      :style="{'background': renderComment(), 'width':'24px' , 'height' : '24px','border-radius':'50%', 'margin-top':'17px' , 'margin-left':'5px'}"
                    >
                      <md-icon
                        :id="'btn-comment-' + data.head.doc_no"
                        :style="{'color': 'white' , 'margin-top':'6px', 'margin-left':'6px', 'cursor':'pointer','font-size':' 13px'}"
                        class="comment-btn"
                      >chat_bubble</md-icon>
                      <md-tooltip md-direction="top">Note to Manager</md-tooltip>
                    </div>
                    <div :class="'comment'" style @click="showCreditFunc">
                      <md-icon
                        :style="{'color': '#C9C9C9' , 'margin-top':'27px', 'margin-left':'5px', 'cursor':'pointer'}"
                        class="creditinfo-btn"
                      >credit_card</md-icon>
                      <md-tooltip md-direction="top">Credit info</md-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="credit-info"
              v-click-outside="closeCredit"
              v-show="showCredit"
              :style="{'top': 200 +'px','left': posCredit +'px','position':'absolute','z-index':'1000'}"
            >
              <md-layout class="md-head">
                <md-layout md-flex-large="90">
                  <label class="md-title">Credit info</label>
                </md-layout>
                <md-layout md-flex-large="10" md-align="end">
                  <md-button class="md-icon-button" @click="showCredit = false">
                    <md-icon>close</md-icon>
                    <md-tooltip md-direction="right">close</md-tooltip>
                  </md-button>
                </md-layout>
              </md-layout>
              <md-layout class="md-body">
                <div style="display:flex;width:100%">
                  <div style="width:35%;padding-right:20px">
                    <div class="title-ipt">Credit Limit</div>
                    <div class="title-ipt-roboto">{{formatNumber(data.head.credit_limit)}}</div>
                  </div>
                  <div style="width:35%;padding-right:20px">
                    <div class="title-ipt">Outstanding Payment</div>
                    <div class="title-ipt-roboto">{{formatNumber(data.head.outstanding)}}</div>
                  </div>
                  <div style="width:30%">
                    <div class="title-ipt">Order Value</div>
                    <div class="title-ipt-roboto">{{formatNumber(data.head.order_value)}}</div>
                  </div>
                </div>
                <div style="display:flex;width:100%;margin-top:17px">
                  <div style="width:25%;padding-right:20px">
                    <div class="title-ipt">Balance</div>
                    <div class="title-ipt-roboto">{{formatNumber(data.head.balance)}}</div>
                  </div>
                  <div style="width:45%;padding-right:20px">
                    <div class="title-ipt">Credit Term</div>
                    <div class="title-ipt-roboto">{{data.head.credit_term_title}}</div>
                  </div>
                  <div style="width:30%;padding-right:20px">
                    <div class="title-ipt">Grade</div>
                    <div class="title-ipt-roboto">{{data.head.credit_rating}}</div>
                  </div>
                  <!-- <div style="width:20%">
                    <div class="title-ipt">Default Price</div>
                    <div class="title-ipt-roboto">{{data.head.pricetype_code}}</div>
                  </div> -->
                </div>
                  <div style="padding:10px 0 0 0;display:flex;width:100%">
                  <div style="width:40%;padding-right:20px">
                    <div class="title-ipt">Price Policy</div>
                    <div class="title-ipt-roboto">{{data.head.price_policy_title}}</div>
                  </div>

                  <div style="width:40%;padding-right:20px">
                    <div class="title-ipt">Customer Channel</div>
                    <div class="title-ipt-roboto">{{data.head.customer_channel_title}}</div>
                  </div>

                  <div style="width:20%;padding-right:20px">
                    <div class="title-ipt">Price</div>
                    <div class="title-ipt-roboto">{{renderPrice(data.head)}}</div>
                  </div>
                  <!-- 
                  <md-input-container style="margin-bottom:13px;width:40%;">
                    <label>Price Policy</label>
                    <md-input class="title-ipt-roboto" v-model="data.head.price_policy_title" readonly></md-input>
                  </md-input-container> -->
                  <!-- <md-input-container style="margin-bottom:13px;width:40%;margin-left:5%">
                    <label>Customer Channel</label>
                    <md-input class="title-ipt-roboto" v-model="data.head.customer_channel_title" readonly></md-input>
                  </md-input-container> -->
                  <!-- <md-input-container style="margin-bottom:13px;width:20%;margin-left:20px">
                    <label>Price</label>
                    <md-input class="title-ipt-roboto" :value="renderPrice(data.head)" readonly></md-input>
                  </md-input-container> -->
                </div>
              </md-layout>
            </div>
          </div>
        </md-layout>
        <md-layout
          md-flex="100"
          class="pt-20"
          v-sticky="{ zIndex: 20, stickyTop: 0 }"
          style="background:#FFF"
        >
          <md-layout md-flex="20" style="color:#727272;font-size:14px">
            <div class="mt-10">ITEMS IN MY ORDER</div>
          </md-layout>
          <md-layout md-flex="40" style="width:100%">
            <md-search-checkbox :placeholder="'Add with Product Code'" :data="[]" :disabled="true"></md-search-checkbox>
          </md-layout>
          <md-layout md-flex="30" style="width:100%;padding-left:20px">
            <div style="margin-right:10px">
              <md-button
                :disabled="true"
                :class="'-gray-A8'"
                style="height:36px;margin:unset;border-radius:3px;font-size:12px"
              >
                <md-icon style="margin-right:7px">search</md-icon>MORE
              </md-button>
            </div>
            <md-button
              :disabled="true"
              :class="'-gray-A8'"
              style="height:36px;margin:unset;border-radius:3px;font-size:12px"
            >
              <md-icon style="margin-right:7px">add</md-icon>PROMOTION
            </md-button>
          </md-layout>
          <md-layout md-flex="10" md-align="end">
            <div class="topic">
              <md-button class="md-icon-button" style="margin:unset" :disabled="true">
                <md-icon
                  :style="{'color': '#C9C9C9' , 'margin-top':'', 'cursor' : 'context-menu' }"
                >card_giftcard</md-icon>
                <md-tooltip md-direction="top">Free Gift</md-tooltip>
              </md-button>
              <md-button class="md-icon-button" style="margin:unset" :disabled="true">
                <md-icon
                  :style="{'color': '#C9C9C9' , 'margin-top':'', 'margin-left':'10px' ,'cursor' : 'context-menu'}"
                >delete_sweep</md-icon>
                <md-tooltip md-direction="top">Delete</md-tooltip>
              </md-button>
            </div>
          </md-layout>
        </md-layout>
        <md-layout
          md-flex="100"
          style="padding-top:10px;margin-right:0px !important"
          class="md-promotion-table"
        >
          <div class="head-table" v-sticky="{ zIndex: 20, stickyTop: 60 }" style="background:#FFF;padding-top:5px">
            <div style="width:3%;" class="md-search-checkbox">
              <input type="checkbox" :disabled="true" style="height: 20px;width: 20px" />
            </div>
            <div
              :style="{'width': data.head.order_status =='SAPV' || data.head.order_status =='APV' ?'26%':'33%','opacity': '0.9'}"
            >Item.</div>
            <div style="text-align:right;width: 10%;opacity: 0.9">PPU</div>
            <div style="text-align:right;width: 8%;opacity: 0.9">VD</div>
            <div style="text-align:right;width: 9%;opacity: 0.9">Price</div>
            <div style="width:2%;"></div>
            <div style="text-align:center;width: 5.5%;opacity: 0.9;">%</div>
            <div style="text-align:right;width: 8.5%;opacity: 0.9">Order Qty</div>
            <div
              :style="{'text-align':'right','width': '7%','opacity': '0.9'}"
              v-if="data.head.order_status =='SAPV' || data.head.order_status =='APV'"
            >Inv.</div>
            <div style="width:6%;"></div>
            <div style="width:7%;"></div>
            <div style="width:8%;text-align:right;opacity: 0.9">Amount</div>
          </div>
          <!--PROMOTION ITEMS  height: calc(100vh - 464px);-->
          <div class="detail-scroll-table" style="overflow-y:hidden !important">
            <div
              class="detail-table"
              :style="{'margin-top': index == 0 ? '5px' : '3px'}"
              v-for="(row , index) in data.items"
              :key="'tbitems'+index"
            >
              <div style="width:3%;" class="md-search-checkbox">
                <input type="checkbox" :disabled="true" style="height: 20px;width: 20px" />
              </div>
              <div
                :style="{'width':data.head.order_status =='SAPV' || data.head.order_status =='APV' ? '28%' :'35%','padding-top':'5px','font-style' : italic(row) ? 'italic' : 'normal'}"
              >
                {{row.item_code}}
                <label style="font-family:kanit;">&nbsp;&nbsp;{{row.item_name}}</label>
              </div>
              <div
                style="width:8.5%;padding-top:5px;"
                class="text-right"
              >฿ {{formatNumber(row.ppu)}}</div>
              <div style="width:8.5%;padding-top:5px;" class="text-right">
                <span :style="{'visibility' : showBath(row , 'show') ? 'visible':'hidden'}">฿</span>
                {{showBath(row , 'value')}}
              </div>
              <div
                class="ipt-table text-right netpriceCls"
                :style="{'padding-left': '1%','width':'8.5%'}"
              >
                <div :class="warningStock(row)" style="padding-top:5px">{{formatNumber(row.price)}}</div>
              </div>
              <div style="width:2%;">
                <md-icon
                  class="edit-net-price"
                  :style="{'cursor' :'context-menu' , 'visibility':row.flag_status != 'F'  ||row.flag_status != 'FV' ?'visible':'hidden'}"
                >edit</md-icon>
                <!-- :style="{'cursor' :'context-menu' , 'visibility':row.flag_status == 'A' || row.flag_status == 'CP'|| row.flag_status == 'F' ?'visible':'hidden'}" -->
              </div>
              <div
                style="width:5%;padding-top:5px;"
                class="text-center"
              >{{countDiscount(row , true)}}</div>
              <div style="width:7%;padding-left:1%;" class="ipt-table">
                <div
                  class="title-ipt-roboto"
                  style="padding-top:5px;text-align:right;border-bottom: 1.4px solid rgba(104, 99, 99, 0.43);"
                >{{row.order_qty}}</div>
              </div>
              <div
                style="width:7%;padding-left:1%;"
                class="ipt-table"
                v-if="data.head.order_status =='SAPV' || data.head.order_status =='APV'"
              >
                <div
                  class="title-ipt-roboto"
                  style="padding-top:5px;text-align:right;"
                >{{formatNumberInt(row.inv_sale_qty)}}</div>
              </div>
              <div style="width:4%;padding-top:5px;padding-left:1%" class="unit">{{row.unit}}</div>
              <!-- ,'visibility' : row.volDiscount == 'Y' && row.order_qty > 0? 'visible':'hidden' -->
              <div
                :style="{'width' : ':2.5%'
              ,'visibility' : renderVD(row) ==true && row.order_qty > 0 && row.flag_status !='F'? 'visible':'hidden'
               ,'background':(data.head.order_status == 'DRF') || data.head.order_status == 'REC'?'#fd7f00':'rgb(201, 201, 201)'
              , 'cursor' : 'context-menu'}"
                :class="'vol-discount'"
              >
                <span>%</span>
                <md-tooltip md-direction="top">Volume discount</md-tooltip>
              </div>
              <div style="width:6%;padding-top:5px">
                <div
                  class="md-rectangle-tag"
                  v-if="row.unit_type != 'INNER' && row.unit_type != '' && row.unit_type != 'selling'"
                >
                  <div class="rectangle-text">{{row.unit_type}}{{countLastDiscount(index , row)}}</div>
                </div>
              </div>
              <div
                :style="{'width':'10%','padding-top':'5px','white-space':'nowrap','padding-right':'5px'}"
                class="text-right"
              >฿ {{formatNumber(row.amount)}}</div>
            </div>
            <!--PROMOTION PROMO-->
            <div
              class="detail-table"
              :style="{'margin-top': indexMom == 0 ? '7px' : '3px','display':'inline-block'}"
              v-for="(row , indexMom) in data.promotion"
              :key="'tbpromo'+indexMom"
            >
              <div
                :style="{'padding-top': data.items == 0 ? '0px' : '0px','width':'100%' , 'display' :'flex'}"
              >
                <div class="md-search-checkbox">
                  <input type="checkbox" :disabled="true" style="height: 20px;width: 20px" />
                </div>
                <div
                  @click="showDetails(indexMom)"
                  class="title-promo"
                  :style="{'padding-top' : '8px','padding-left' : '10px'
                  ,'width':countLetter(row.promo_code , 25)?'255px':''
                  ,'white-space':countLetter(row.promo_code , 25)?'nowrap':'normal'
                  ,'text-overflow':countLetter(row.promo_code , 25)?'ellipsis':'unset'
                  ,'display':countLetter(row.promo_code , 25)?'block':'-webkit-box'
                  ,'overflow':countLetter(row.promo_code , 25)?'hidden':'hidden'
                  ,'cursor':'pointer'}"
                >
                  {{row.promo_code}}
                  <md-tooltip
                    v-if="countLetter(row.promo_code , 25)"
                    md-direction="top"
                    class="mds-tooltips"
                  >{{row.promo_code}}</md-tooltip>
                </div>
                <div :style="{'width':'10px' , 'display' : 'block'}">
                  <md-icon
                    style="font-size:14px;color:#A8A8A8;cursor:pointer;padding-left:10px;padding-top:7px"
                  >edit</md-icon>
                </div>
              </div>
              <div
                v-if="row.display"
                class="title-promo"
                style="padding-left:35px;padding-right:15px"
              >{{row.promo_name}}</div>
              <div
                style="display:flex;padding-top:5px"
                v-for="(row , index) in row.products"
                :key="'cdpd'+index"
              >
                <div class="md-search-checkbox" style="width:3%;padding-right:15px">
                  <md-checkbox style="visibility: hidden;" :disabled="true" class="md-primary"></md-checkbox>
                </div>
                <div
                  :style="{'width':data.head.order_status =='SAPV' || data.head.order_status =='APV' ?'28%' :'35%','padding-top':'5px'}"
                >
                  {{row.item_code}}
                  <label style="font-family:kanit;">&nbsp;&nbsp;{{row.item_name}}</label>
                </div>
                <div
                  style="width:8.5%;padding-top:5px;padding-left:1%"
                  class="text-right"
                >฿ {{formatNumber(row.ppu)}}</div>
                <div style="width:8.5%;padding-top:5px;" class="text-right"></div>
                <div class="ipt-table text-right" :style="{'padding-top': '5px','width':'8.5%'}">
                  <label>฿ {{formatNumber(row.price)}}</label>
                </div>
                <div style="width:2%;"></div>
                <div
                  style="width:5%;padding-top:5px;"
                  class="text-center"
                >{{countDiscount(row , true)}}</div>
                <div style="width:7%;padding-left:1%;" class="ipt-table">
                  <div
                    class="title-ipt-roboto"
                    style="padding-top:5px;text-align:right;border-bottom: 1.4px solid rgba(104, 99, 99, 0.43);"
                  >{{row.order_qty}}</div>
                </div>
                <div
                  style="width:7%;padding-left:1%;"
                  class="ipt-table"
                  v-if="data.head.order_status =='SAPV' || data.head.order_status =='APV'"
                >
                  <div
                    class="title-ipt-roboto"
                    style="padding-top:5px;text-align:right;"
                  >{{formatNumberInt(row.inv_sale_qty)}}</div>
                </div>
                <div style="width:4%;padding-top:5px;padding-left:1%" class="unit">{{row.unit}}</div>
                <div style="width:2.5%;"></div>
                <div style="width:6%;padding-top:5px">
                  <div
                    class="md-rectangle-tag"
                    v-if="row.unit_type != 'INNER' && row.unit_type != '' && row.unit_type != 'selling'"
                  >
                    <div class="rectangle-text">{{row.unit_type}}</div>
                  </div>
                </div>
                <div
                  style="width:10%;padding-top:5px; white-space: nowrap;padding-right:5px"
                  class="text-right"
                >฿ {{formatNumber(row.amount)}}</div>
              </div>
              <!--PROMOTION FREEGIFT-->
              <div
                class="title-promo"
                style="padding-top : 8px;padding-left : 35px"
                v-if="row.freeitems.length > 0"
              >Premium / Free Gift</div>
              <div
                class="detail-table"
                :style="{'margin-top': indexf == 0 ? '7px' : '3px'}"
                v-for="(row , indexf) in row.freeitems"
                :key="'tbfreegift'+indexf"
              >
                <div style="width:3%;" class="md-search-checkbox">
                  <input type="checkbox" :disabled="true" style="height: 20px;width: 20px" />
                </div>
                <div
                  :style="{'width':data.head.order_status =='SAPV' || data.head.order_status =='APV' ?'28%' :'35%','padding-top':'5px'}"
                >
                  {{row.item_code}}
                  <label style="font-family:kanit;">&nbsp;&nbsp;{{row.item_name}}</label>
                </div>
                <div
                  style="width:8.5%;padding-top:5px;padding-left:1%"
                  class="text-right"
                >฿ {{formatNumber(row.ppu)}}</div>
                <div style="width:8.5%;padding-top:5px;" class="text-right"></div>
                <div
                  class="ipt-table text-right"
                  :style="{'padding-top': row.editMode ? '' : '5px','padding-left': row.editMode ? '3%' : '','width':'8.5%'}"
                >
                  <label>฿ {{formatNumber(row.price)}}</label>
                </div>
                <div style="width:2%;"></div>
                <div
                  style="width:5%;padding-top:5px;"
                  class="text-center"
                >{{countDiscount(row , true)}}</div>
                <div style="width:7%;padding-left:1%;" class="ipt-table">
                  <div
                    class="title-ipt-roboto"
                    style="padding-top:5px;text-align:right;border-bottom: 1.4px solid rgba(104, 99, 99, 0.43);"
                  >{{row.order_qty}}</div>
                </div>
                <div
                  style="width:7.5%;"
                  class="ipt-table"
                  v-if="data.head.order_status =='SAPV' || data.head.order_status =='APV'"
                >
                  <div
                    class="title-ipt-roboto"
                    style="padding-top:5px;text-align:right;"
                  >{{formatNumberInt(row.inv_sale_qty)}}</div>
                </div>
                <div style="width:4.5%;padding-top:5px;padding-left:1%" class="unit">{{row.unit}}</div>
                <div style="width:2.5%;"></div>
                <div style="width:6%;padding-top:5px">
                  <div
                    class="md-rectangle-tag"
                    v-if="row.unit_type != 'INNER' && row.unit_type != '' && row.unit_type != 'selling'"
                  >
                    <div class="rectangle-text">{{row.unit_type}}</div>
                  </div>
                </div>
                <div
                  class="text-right"
                  style="width:10%;padding-top:5px;white-space: nowrap;padding-right:5px"
                >฿ {{formatNumber(row.amount)}}</div>
              </div>
            </div>
          </div>
        </md-layout>
      </div>
    </div>
    <div
      class="md-dialog-total"
      :style="{'visibility' : data.items.length == 0 && data.promotion.length == 0 ? 'hidden':'visible'}"
    >
      <div style="width: 16%;color:rgba(0, 0, 0, .87);font-size:14px;padding-top: 12px;">
        Spent Budget &nbsp;
        <span
          class="number"
          style="font-weight:bold"
        >{{formatNumber(data.head.sum_budget)}}</span>
        <md-tooltip md-direction="top">
          Balance Budget &nbsp;
          <span class="number">{{formatNumber(data.head.bal_budget)}}</span>
        </md-tooltip>
      </div>
      <div
        style="width:6%;padding-right:1%;padding-top: 12px;"
        class="number"
      >{{formatNumberInt(totalItems)}}</div>
      <div style="width: 3%;font-size:11px;padding-top: 13px;" class="text-right">Item(s)</div>
      <div
        style="width:8%;padding-right:1%;padding-top: 12px;"
        class="number"
      >{{formatNumberInt(data.totalOrderQty)}}</div>
      <div style="width: 3%;font-size:11px;padding-top: 13px;" class="text-right">Unit(s)</div>
      <div style="width: 10%;">
        <div
          style="text-align:right;color:rgba(0, 0, 0, .87);font-size:10px;display: -webkit-box;float: right;"
        >
          <div style="padding-top: 13px;text-transform: uppercase;">{{showInpoutName('discount')}}</div>
          <div style="padding-left:5px;padding-top:12px">({{data.head.percent_discount}}%)</div>
        </div>
      </div>
      <div
        style="width: 11%;padding-right:5px;padding-top: 12px;"
        class="number"
      >฿ {{formatNumber(data.totalDiscount)}}</div>
      <div style="width: 10%;font-size:11px;padding-top: 13px;" class="text-right">Total Amount</div>
      <div style="width:11%;padding-top: 12px;" class="number">฿ {{formatNumber(data.totalAmount)}}</div>
      <div style="width: 11%;font-size:11px;padding-top: 13px;" class="text-right">Total Net Amount</div>
      <div
        style="width:11%;padding-right:0.5%;padding-top: 12px;"
        class="number"
      >฿ {{formatNumber(data.totalNetAmount)}}</div>
    </div>
    <div class="md-dialog-actions">
      <md-layout>
        <md-button :class="'md-gray'" @click="close">CANCEL</md-button>
      </md-layout>
    </div>
    <md-comment-dialog
      :title="'Note to Manager'"
      @read="read"
      @close="closeComment"
      @reply="reply"
      :data="commentList"
      :option="commentOpt"
    ></md-comment-dialog>
    <!--PAY BY CASH-->
    <md-dialog ref="paybycash-dialog">
      <md-dialog-title
        style="color:#727272;font-size:14px;font-family:roboto"
      >Cashed Customer Detail</md-dialog-title>
      <md-dialog-content style="width: 700px;">
        <div
          style="font-family: Roboto;
                  padding-top: 16px;
                  cursor: pointer;
                  font-size: 12px !important;
                  color: #727272"
        >Send to</div>
        <md-input-container class="paybycash" md-inline style="margin:0px">
          <label>Leave a Customer Name Here</label>
          <md-input :disabled="true" v-model="payByCash.sent_to_cus_name"></md-input>
        </md-input-container>
        <div
          style="font-family: Roboto;
                  padding-top: 16px;
                  cursor: pointer;
                  font-size: 12px !important;
                  color: #727272;margin-top:10px"
        >Receiver Name</div>
        <md-input-container class="paybycash" md-inline style="margin:0px">
          <label>Leave a receiver Name</label>
          <md-input :disabled="true" v-model="payByCash.receive_name"></md-input>
        </md-input-container>
        <div
          style="font-family: Roboto;
                  padding-top: 16px;
                  cursor: pointer;
                  font-size: 12px !important;
                  color: #727272;margin-top:10px"
        >Tax ID</div>
        <md-input-container class="paybycash" md-inline style="margin:0px">
          <label>Leave Number only 10 - 13 digits</label>
          <md-input :disabled="true" v-model="payByCash.tax_id"></md-input>
        </md-input-container>
        <div
          style="font-family: Roboto;
                  padding-top: 16px;
                  cursor: pointer;
                  font-size: 12px !important;
                  color: #727272;margin-top:10px"
        >Customer Address</div>
        <md-input-container class="paybycash" md-inline style="margin:0px">
          <label>Leave Customer Address Here</label>
          <md-input :disabled="true" v-model="payByCash.cust_addr1"></md-input>
        </md-input-container>
        <md-input-container class="paybycash" md-inline style="margin:0px">
          <md-input :disabled="true" v-model="payByCash.cust_addr2"></md-input>
        </md-input-container>
        <md-input-container class="paybycash" md-inline style="margin:0px">
          <md-input :disabled="true" v-model="payByCash.cust_addr3"></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="clearPayByCash" style="color:#A8A8A8">CANCEL</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import ClickOutside from "vue-click-outside";
import VueSticky from "vue-sticky";
import _ from "lodash";
export default {
  created() {},
  props: ["data"],
  data() {
    return {
      titleOrder: "Order Detail",
      showCredit: false,
      posCredit: 0,
      commentOpt: {
        display: false,
        top: 0,
        left: 0
      }
    };
  },
  computed: {
    commentList() {
      return this.$store.getters["budget/commentList"];
    },
    warehouse() {
      return this.$store.getters["myorders/master_warehouse"];
    },
    payByCash() {
      return this.$store.getters["budget/paybycash_list"];
    },
    totalItems() {
      return this.$store.getters["budget/totalItems"];
    },
    disableFrom() {
      return this.$store.getters["budget/disableFrom"];
    }
  },
  methods: {
    renderPrice(data) {
      if (_.toUpper(data.price_policy_code) == "BOOK") {
        return data.pricebook_code;
      } else if (_.toUpper(data.price_policy_code) == "AUTO") {
        return data.pricetype_code;
      } else if (_.toUpper(data.price_policy_code) == "MIX") {
        return data.pricebook_code + "," + data.pricefix_code;
      } else {
        return data.pricefix_code;
      }
    },
    showBath(row, mode) {
      if (_.isNull(row.priceVD) || row.priceVD == "" || row.priceVD == null) {
        if (mode == "value") {
          return "";
        } else {
          return false;
        }
      } else {
        if (mode == "value") {
          if (parseFloat(row.priceVD) == 0) {
            return "";
          } else {
            return this.formatNumber(row.priceVD);
          }
        } else {
          if (parseFloat(row.priceVD) == 0) {
            return false;
          } else {
            return true;
          }
        }
      }
    },
    showInpoutName(input) {
      if (typeof this.disableFrom[input] != "undefined") {
        return this.disableFrom[input].title;
      } else {
        return "";
      }
    },
    renderVD(row) {
      if (
        row.flag_status != "A" &&
        row.flag_status != "F" &&
        row.flag_status != "CP" &&
        (!_.isUndefined(row.ref_po_no) || !_.isNull(row.ref_po_no)) &&
        _.trim(row.ref_po_no).length < 2
      ) {
        return true;
      } else {
        return false;
      }
    },
    italic(row) {
      if (_.isUndefined(row.ref_po_no) || _.isNull(row.ref_po_no)) {
        return false;
      } else if (!_.isUndefined(row.ref_po_no) && row.ref_po_no.length > 2) {
        return true;
      } else {
        return false;
      }
    },
    clearPayByCash() {
      this.$refs["paybycash-dialog"].close();
    },
    showPayByCash(value) {
      if (value == "open") {
        this.$refs["paybycash-dialog"].open();
      } else {
        if (value == true) {
          this.$refs["paybycash-dialog"].open();
        }
      }
    },
    showWarehouse(value) {
      var rs = _.filter(this.warehouse, item => {
        if (item.code == value) {
          return true;
        }
      });
      return rs.length > 0 ? rs[0].code + " : " + rs[0].title : value;
    },
    closeCredit(e) {
      if (
        e.target.className != "credit-info" &&
        e.target.className !=
          "md-icon creditinfo-btn md-theme-default material-icons"
      ) {
        this.showCredit = false;
      }
    },
    read(data) {
      this.$emit("read", data);
    },
    closeComment() {
      this.commentOpt.display = false;
    },
    reply(value) {
      // if (value != null) {
      //   this.$emit("reply", value);
      // }
    },
    showCreditFunc(e) {
      this.posCredit = e.target.offsetLeft - 450;
      this.showCredit = true;
    },
    openComment(e, items) {
      let pos = e.target.offsetLeft + 230 + 520 - 980;
      this.commentOpt.left = pos;
      this.commentOpt.top = 150;
      this.commentOpt.display = true;
    },
    renderComment() {
      let value = this.data.head;
      if (value.order_status == "REJ") {
        return "#F44336";
      } else if (value.count_comment == "true" && value.order_status != "DRF") {
        return "#FD7F00";
      } else {
        return "#C9C9C9";
      }
    },
    warningStock(row) {
      let ppu = row.ppu != false ? parseFloat(row.ppu) : 0;
      let price = parseFloat(row.price);
      if (
        ppu != price &&
        (row.flag_status == "F" ||
          row.flag_status == "CP" ||
          row.flag_status == "FV" ||
          row.flag_status == "CV")
      ) {
        return "warning-stock";
      } else {
        return "";
      }
    },
    showDetails(index) {
      this.data.promotion[index].display = !this.data.promotion[index].display;
    },
    close() {
      this.$emit("close");
    },
    viewFormatter(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    formatNumberInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    formatNumber(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },
    countLetter(row, key) {
      if (row.length >= key) {
        return true;
      } else {
        return false;
      }
    },
    countLastDiscount(index, value) {
      // let data = this.items;
      // let per_c =
      //   this.customerInfo.percent_discount == ""
      //     ? 0
      //     : this.customerInfo.percent_discount;
      // data[index].last_discount = (value.amount / 100) * per_c;
    },
    countDiscount(value, mode) {
      let rsPPU = value.ppu - value.price;
      let rs = rsPPU / value.ppu;
      let dash = mode == true ? "-" : "";
      if (rs > 0) {
        // round ทศนิยม
        let all = rs * 100;
        let all4 = _.round(all, 4);
        let all3 = _.round(all4, 3);
        let all2 = _.round(all3, 2);
        return dash + all2 + "%";
      } else {
        return "-";
      }
    }
  },
  components: {
    "md-search-checkbox": require("../../Salesops/customComponent/md-search-checkbox"),
    "md-comment-dialog": require("../../Salesops/customComponent/md-comment-dialog"),
    "md-flow-bar": require("../../Salesops/customComponent/md-flow-bar")
  },
  directives: {
    ClickOutside,
    sticky: VueSticky
  }
};
</script>
<style lang="scss" scoped>
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

</style>

