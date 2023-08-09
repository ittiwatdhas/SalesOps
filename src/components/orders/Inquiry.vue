<template>
  <div id="pageInquiry">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true">
      <div
        v-show="spinner_loading"
        style="
          position: absolute;
          z-index: 100;
          width: 100%;
          height: 100%;
          background: #efefef;
          opacity: 0.1;
        "
      ></div>
      <div style="display: flex">
        <div class="md-topic" style="padding-top: 25px; padding-left: 40px">
          {{ pageName }}
        </div>
        <div class="blog-topic" style="padding-top: 25px">
          : Customer's Order ({{ dataList.length }})
        </div>
      </div>
      <div class="blog-filter">

       
          <div style="width:10%;background:white;padding:5px 10px 5px 10px; border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);">
             <md-input-container class="md-sel" style="margin:0px;padding-top:0px;min-height:100%">
                <md-select   style=""  v-model="filter_Source" >
                  <md-option
                    style="width:auto"
                    :value="row.code"
                    v-for="(row ,index) in orderSource"
                    :key="'orderSourceList-hix'+index"
                    @click.native="filtersearch_(row.code , index)"
                  >{{row.title}} </md-option>
                </md-select>
              </md-input-container>
            </div>
   
        <div
          style=" border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);width: 20%;margin-left: 10px; background: white; padding-top: 5px"
          @mouseleave="mouseLeave"
        >
          <div style="display: flex" class="md-period-box">
            <div style="width: 100%; display: flex" @click="showmonth = true">
              <div
                :style="{
                  'font-size': years == '' ? '16px' : '18px',
                  'font-weight': years == '' ? '500' : '',
                  'font-family': 'Roboto',
                  'text-align': 'left',
                  padding: '5px 20px',
                  color: '#5A5A5A',
                  width: '90%',
                  color:'none'
                }"
              >
                {{ months }} {{ years }}
              </div>
              <div style="width: 10%; padding-top: 3px; padding-right: 1%">
                <md-icon>expand_more</md-icon>
              </div>
            </div>
          </div>
          <month-calendar
            ref="selectCalendar"
            v-if="showmonth"
            v-on:selectmonth="selectMonth"
            v-on:selectyear="selectyear"
            :year="year"
            :month="month"
            :displayRange="displayRange"
            :range="range"
          ></month-calendar>
        </div>

        <div
          style="
            width: 15%;
            background: white;
            padding: 5px 15px;
            margin-left: 10px;
             border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
          "
        >
          <md-input-container
            class="md-sel"
            style="margin: 0px; padding-top: 0px; min-height: 100%"
          >
              <md-select v-model="dp1">
                <div id="inquiry_select_date"></div>
                  <md-option
                    style="width:150px"
                    :value="row.code"
                    v-for="(row ,index) in TypeDate"
                    :key="'channelCrop-hix'+index"
                    @click.native="selectTypeDate(row.name , index)"
                  >{{row.name}}</md-option>
              </md-select>
          </md-input-container>

        </div>

        
         <div style="width:10%;background:white;padding:5px 10px; margin-left: 10px; border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);">
            <md-input-container class="md-sel" style="margin:0px;padding-top:0px;min-height:100%">
              <md-select v-model="group_cus">
                <div id="inquiry_select_channel"></div>
                 <md-option
                    style="width:150px"
                    :value="row.code"
                    v-for="(row ,index) in arr_channel"
                    :key="'channelCrop-hix'+index"
                    @click.native="selectChannelGroup(row.name , index)"
                  >{{row.name}}
                  </md-option>
              </md-select>
            </md-input-container>
          </div>
        


            <div style="width:15%;background:white;padding:5px 10px; margin-left: 10px; border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);">
            <md-input-container
              class="md-sel"
              :style="{
                'pointer-events':group_cus == 'MTT'?'' : 'none',
                'color':group_cus == 'MTT'?'' : '#727272',
                'opacity': group_cus == 'MTT'?'' : '0.5'
              }"
               style="
               margin:0px; 
               padding-top:0px;
               min-height:100%">
              <md-select
               v-model="corporate"
               >
               <div id="inquiry_select_corp"></div>
                <md-option v-if="channelCrop.length == 0" value=""> Select Corporate</md-option>
                 <md-option
                   
                    :value="row.name"
                    v-for="(row ,index) in channelCrop"
                    :key="'channelCrop-hix'+index"
                    @click.native="selectChannel(row , index)"
                  >{{row.name}}</md-option>

              </md-select>
            </md-input-container>
          </div>

        <!-- <div
          style="
            width: 15%;
            background: white;
            padding: 5px 15px;
            margin-left: 10px;
             border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
          "
        >
          <md-input-container
            class="md-sel"
            style="margin: 0px; padding-top: 0px; min-height: 100%"
          >
              <md-select v-model="dp1">
                <div id="inquiry_select_date"></div>
                  <md-option
                    style="width:150px"
                    :value="row.code"
                    v-for="(row ,index) in TypeDate"
                    :key="'channelCrop-hix'+index"
                    @click.native="selectTypeDate(row.name , index)"
                  >{{row.name}}</md-option>
              </md-select>
          </md-input-container>

        </div> -->
        <!-- <div
          style="width: 14%; background: ; padding: 5px 15px; margin-left: 8px"
        >
          <md-input-container class="md-sel" style="margin:0px;padding-top:0px;min-height:100%">
            <md-select v-model="dp2">
              <md-option value="all">Select All</md-option>
              <md-option value="transfered">Transfered</md-option>
              <md-option value="ordered">Ordered</md-option>
              <md-option value="invoiced">Invoiced</md-option>
              <md-option value="not_invoiced">Not Invoiced</md-option>
              <md-option value="not_interface">Not Interface</md-option>
              <md-option value="interface_error">Interface Date</md-option>
              <md-option value="not_process">Not Process Over 1 Hr.</md-option>
            </md-select>
          </md-input-container>
        </div> -->
        <!-- <div
          style="width: 14%; background: ; padding: 5px 15px; margin-left: 8px"
        >
          <md-input-container class="md-sel" style="margin:0px;padding-top:0px;min-height:100%">
            <md-select v-model="dp3">
              <md-option value="all">Select All</md-option>
              <md-option value="cdc">CDC</md-option>
              <md-option value="dcmt">DCMT</md-option>
              <md-option value="dctt">DCTT</md-option>
              <md-option value="retrail">RETRAIL</md-option>
            </md-select>
          </md-input-container>
        </div> -->
        <!-- <div
          style="width: 14%; background: ; padding: 5px 15px; margin-left: 8px"
        >
          <md-input-container class="md-sel" style="margin:0px;padding-top:0px;min-height:100%">
            <md-select v-model="dp4">
              <md-option value="all">Select All</md-option>
              <md-option value="suspended">Suspended</md-option>
              <md-option value="free">Free</md-option>
              <md-option value="inprocess">Inprocess</md-option>
              <md-option value="closed">Closed</md-option>
              <md-option value="calceled">Calceled</md-option>
              <md-option value="blocked">Blocked</md-option>
              <md-option value="not_acknowledge">Not Acknowledge</md-option>
            </md-select>
          </md-input-container>
        </div> -->
        <div style="width: 23%; padding: 0px; margin:0 15px 0 10px;">
          <md-search-box
            id="pageInquiry-md-sel"
            :placeholder="'Search Customer...'"
            :data="[]"
            @clear="keywordCLR"
            :value="keyword"
            @filter="keywordFil"
          ></md-search-box>
        </div>
        <div style="width: 6%; margin-left: 8px">
          <md-button
          id="inquiry_cus_icon"
            :class="'-orange'"
            style="
              margin: unset;
              border-radius: 3px;
              font-size: 12px;
              height: 40px;
            "
            @click="searchInquiry"
          >
            <md-icon id="inquiry_cus_icon">search</md-icon>
          </md-button>
        </div>
      </div>
      <div class="blog-1">
        <div class="blog-1-row">
          <div class="blog-1-head">
            <div style="width: 100%; text-align: center; font-weight: 600">
              Summary Grand Total
            </div>
          </div>
          <div class="blog-1-subhead">
            <div style="width: 10%; text-align: center; padding-left: 20px">
              Total
              <br />(Customer)
            </div>
            <div style="width: 10%; text-align: center">
              Total
              <br />(Order PO)
            </div>
            <div style="width: 10%; text-align: center">
              Line
              <br />(Order)
            </div>
            <!-- <div style="width:6%;text-align:center">
              Line
              <br />(Allocate)
            </div> -->
            <div style="width: 10%; text-align: center">
              Line
              <br />(Invoice)
            </div>
            <!-- <div style="width: 6%; text-align: center">
              Allocate
              <br />(%)
            </div> -->
            <div style="width: 10%; text-align: center">
              Invoice
              <br />(%)
            </div>
            <div style="width: 10%; text-align: center">
              QTY
              <br />(Order)
            </div>
            <!-- <div style="width:6%;text-align:center">
              QTY
              <br />(Allocate)
            </div> -->
            <div style="width: 10%; text-align: center">
              QTY
              <br />(Invoice)
            </div>
            <!-- <div style="width:6%;text-align:center">
              Allocate
              <br />(%)
            </div> -->
            <div style="width: 10%; text-align: center">
              Invoice
              <br />(%)
            </div>
            <div style="width: 10%; text-align: center">
              Amount
              <br />(Order)
            </div>

            <div style="width: 10%; text-align: center; padding-right: 15px">
              Amount
              <br />(Invoice)
            </div>
          </div>
          <div class="blog-1-body">
            <md-spinner
            :md-size="40"
            :md-stroke="1"
            v-show="spinner_loading_total"
            md-indeterminate
          ></md-spinner>
            <div
            v-if="!spinner_loading_total"
              class="blog-1-body-subhead"
              style="font-size: 12px; color: #5a5a5a; font-weight: 600"
            >
         
              <div style="width: 10%; text-align: center; padding-left: 20px">
                {{ fmINT(grandTotal.total_customer) }}
              </div>
              <div style="width: 10%; text-align: center">
                {{ fmINT(grandTotal.total_order_po) }}
              </div>
              <div style="width: 10%; text-align: center">
                {{ fmINT(grandTotal.line_order) }}
              </div>
              <!-- <div style="width:6%;text-align:center">{{fmINT(grandTotal.line_allocate)}}</div> -->
              <div style="width: 10%; text-align: center">
                {{ fmINT(grandTotal.line_invoice) }}
              </div>
              <!-- <div style="width: 6%; text-align: center">
                {{ fm(grandTotal.per_line_allocate) }}%
              </div> -->
              <div style="width: 10%; text-align: center">
                {{ fm(grandTotal.per_line_invoice) }}%
              </div>
              <div style="width: 10%; text-align: center">
                {{ fmINT(grandTotal.qty_order) }}
              </div>
              <!-- <div style="width:6%;text-align:center">{{fmINT(grandTotal.qty_allocate)}}</div> -->
              <div style="width: 10%; text-align: center">
                {{ fmINT(grandTotal.qty_invoice) }}
              </div>
              <!-- <div style="width:6%;text-align:center">{{fmINT(grandTotal.per_qty_allocate)}}</div> -->
              <div style="width: 10%; text-align: center">
                {{ fm(grandTotal.per_qty_invoice) }}%
              </div>
              <div style="width: 10%; text-align: center">
                {{ fm(grandTotal.amount_order) }}
              </div>
              <div style="width: 10%; text-align: center; padding-right: 15px">
                {{ fm(grandTotal.amount_invoice) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="blog-1" style="padding-top: 0px">
        <div style="position: absolute; left: 45%">
          <md-spinner
            :md-size="150"
            :md-stroke="1"
            v-show="spinner_loading"
            md-indeterminate
          ></md-spinner>
        </div>
        <div
          class="blog-1-row"
          v-for="(row, index) in dataList"
          :key="'pageInquiry1-' + row.customer_code"
        >
          <div class="blog-1-head">
            <div style="width: 25%; text-align: left; padding-left: 20px">
              Customer
            </div>
            <div style="width: 10%; text-align: center">Orders PO</div>
            <div style="width: 10%; text-align: center">Order Line</div>
            <!-- <div style="width:10%;text-align:center">Allocate Line</div> -->
            <div style="width: 10%; text-align: center">Order QTY</div>
            <!-- <div style="width:10%;text-align:center">Allocate QTY</div> -->
            <div style="width: 10%; text-align: center">Invoice QTY</div>
            <div style="width: 15%; text-align: right; padding-right: 15px">
              Order Amount
            </div>
            <div style="width: 15%; text-align: right; padding-right: 15px">
              Invoice Amount
            </div>
          </div>
          <div class="blog-1-body" style="margin-bottom: 5px">
            <div id="inquiry_click_cus" class="blog-1-body-row" @click="showDetailByCust(row, index)">
              <div
              id="inquiry_click_cus"
                style="width: 25%; text-align: left; padding-left: 20px"
                class="thai"
              >
                {{ row.customer_code }}:{{ row.customer_name }}
              </div>
              <div style="width: 10%; text-align: center" class="eng">
                {{ fmINT(row.orders_po) }}
              </div>
              <div style="width: 10%; text-align: center" class="eng">
                {{ fmINT(row.orders_line) }}
              </div>
              <!-- <div style="width:10%;text-align:center" class="eng">{{fmINT(row.allocate_line)}}</div> -->
              <div style="width: 10%; text-align: center" class="eng">
                {{ fmINT(row.order_qty) }}
              </div>
              <!-- <div style="width:10%;text-align:center" class="eng">{{fmINT(row.allocate_qty)}}</div> -->
              <div style="width: 10%; text-align: center" class="eng">
                {{ fmINT(row.invoice_qty) }}
              </div>
              <div
                style="width: 15%; text-align: right; padding-right: 15px"
                class="eng"
              >
                ฿ {{ fm(row.order_amount) }}
              </div>
              <div
                style="width: 15%; text-align: right; padding-right: 15px"
                class="eng"
              >
                ฿ {{ fm(row.invoice_amount) }}
              </div>
            </div>
            <div v-if="row.open">
              <div class="blog-2-body-head">
                <div
                  style="width: 10%; text-align: left; padding-left: 20px"
                  class="eng"
                >
                  PO.No.
                </div>
                <div style="width: 9%; text-align: center" class="eng">
                  Order No.
                </div>
                <div style="width: 9.5%; text-align: center" class="eng">
                  Invoice No.
                </div>
                <div style="width: 6.5%; text-align: center" class="eng">
                  PO Date
                </div>
                <div style="width: 6.5%; text-align: center" class="eng">
                  Order Date
                </div>
                <div style="width: 6.5%; text-align: center" class="eng">
                  Delivery Date
                </div>
                <div style="width: 8.5%; text-align: center" class="eng">
                  Invoice Date
                </div>
                <div style="width: 6%; text-align: center" class="eng">
                  Warehouse
                </div>
                <div style="width: 5.5%; text-align: center" class="eng">
                  Line
                </div>
                <div style="width: 5.5%; text-align: center" class="eng">
                  Order QTY
                </div>
                <!-- <div style="width:5.5%;text-align:center" class="eng">Allocate</div> -->
                <div style="width: 5.5%; text-align: center" class="eng">
                  Invoice
                </div>
                <div style="width: 5%; text-align: center" class="eng">
                  Back Order
                </div>
                <div style="width: 4.5%; text-align: center" class="eng">
                  Fulfill
                </div>
                <div style="width: 4.5%; text-align: center" class="eng">
                  Un-Fulfill
                </div>

                <!-- <div style="width:8.5%;text-align:center" class="eng">BatchTime</div> -->

                <div style="width: 7%; text-align: center" class="eng">
                  LN Status
                </div>
              </div>
              
              <div
              id="inquiry_click_po"
                v-for="(rowCust, indexCust) in row.detail_cust"
                :key="'rowCust-' + rowCust.po_no"
              >
             
                <!-- @click="showDetailByPo(index ,rowCust , indexCust)" -->
                <div
                 id="inquiry_click_po"
                  class="blog-2-body-row"
                  @click="showDetailByPo(index, rowCust, indexCust)"
                >
                  <div 
                  id="inquiry_click_po"
                    style="width: 10%; text-align: left; padding-left: 20px"
                    class="eng pd-v"
                  >
                   <md-tooltip md-direction="top">
                    <span
                      style="font-family:kanit"
                    >{{rowCust.sm_code}}&nbsp;{{rowCust.frist_name}}&nbsp;{{rowCust.last_name}}</span>
                  </md-tooltip>
                  
                    {{ rowCust.po_no }}
                  </div>
                  <div id="inquiry_click_po" style="width: 9%; text-align: center" class="eng pd-v">
                    {{ rowCust.order_no }}
                  </div>
                  <div id="inquiry_click_po" style="width: 9.5%; text-align: center" class="eng pd-v">
                    {{ rowCust.inv_no }}
                  </div>

                  <div id="inquiry_click_po" style="width: 6.5%; text-align: center" class="eng pd-v">
                    {{ fmData(rowCust.po_date) }}
                  </div>
                  <div id="inquiry_click_po" style="width: 6.5%; text-align: center" class="eng pd-v">
                    {{ fmData(rowCust.order_date) }}
                  </div>
                  <div id="inquiry_click_po" style="width: 6.5%; text-align: center" class="eng pd-v">
                    {{ fmData(rowCust.delivery_date) }}
                  </div>
                  <div id="inquiry_click_po" style="width: 8.5%; text-align: center" class="eng pd-v">
                    {{ fmData(rowCust.invoice_time) }}
                  </div>
                  <div id="inquiry_click_po" style="width: 6%; text-align: center" class="eng pd-v">
                    {{ rowCust.ln_warehouse }}
                  </div>
                  <div id="inquiry_click_po" style="width: 5.5%; text-align: center" class="eng pd-v">
                    {{ fmINT(rowCust.line) }}
                  </div>
                  <div id="inquiry_click_po" style="width: 5.5%; text-align: center" class="eng pd-v">
                    {{ fmINT(rowCust.order) }}
                  </div>
                  <!-- <div
                    style="width:5.5%;text-align:center"
                    class="eng pd-v"
                  >{{fmINT(rowCust.allocate)}}</div> -->
                  <div id="inquiry_click_po" style="width: 5.5%; text-align: center" class="eng pd-v">
                    {{ fmINT(rowCust.invoice) }}
                  </div>

                  <div id="inquiry_click_po" style="width: 5%; text-align: center" class="eng pd-v">
                    {{ rowCust.backorder }}
                  </div>
                  <div id="inquiry_click_po" style="width: 4.5%; text-align: right" class="eng pd-v">


                      <div v-if="rowCust.ful_fill != '-'  && rowCust.ful_fill.charAt(rowCust.ful_fill.length  - 1 ) == '0' && rowCust.ful_fill.charAt(rowCust.ful_fill.length  - 2 ) == '0' ">
                     {{ Number(rowCust.ful_fill).toFixed(0)}}{{ "%" }}
                    </div>
                    <div v-else-if="rowCust.ful_fill != '-'  && rowCust.ful_fill.charAt(rowCust.ful_fill.length  - 1 ) == '0'  ">
                       {{ Number(rowCust.ful_fill).toFixed(1)}}{{ "%" }}
                    </div>
                    <div v-else-if="rowCust.ful_fill == '-'">
                      {{ rowCust.ful_fill }}
                    </div>
                    <div v-else>
                       {{ rowCust.ful_fill }}{{ "%" }}
                    </div>



                  </div>
                  <div id="inquiry_click_po" style="width: 4.5%; text-align: right" class="eng pd-v">

                     <div v-if="rowCust.un_ful_fill != '-'  && rowCust.un_ful_fill.charAt(rowCust.un_ful_fill.length  - 1 ) == '0' && rowCust.un_ful_fill.charAt(rowCust.un_ful_fill.length  - 2 ) == '0' ">
                     {{ Number(rowCust.un_ful_fill).toFixed(0)}}{{ "%" }}
                    </div>
                    <div v-else-if="rowCust.un_ful_fill != '-'  && rowCust.un_ful_fill.charAt(rowCust.un_ful_fill.length  - 1 ) == '0'  ">
                       {{ Number(rowCust.un_ful_fill).toFixed(1)}}{{ "%" }}
                    </div>
                    <div v-else-if="rowCust.un_ful_fill == '-'">
                      {{ rowCust.un_ful_fill }}
                    </div>
                    <div v-else>
                       {{ rowCust.un_ful_fill }}{{ "%" }}
                    </div>


                  </div>

                  <!-- <div
                    style="width:8.5%;text-align:center"
                    class="eng pd-v"
                  >{{fmData(rowCust.batch_time)}}</div> -->

                  <div
                    id="inquiry_click_po"
                    style="width: 7%; text-align: center; padding-right: 1%"
                    class="eng pd-v"
                  >
                    {{ rowCust.status }}
                  </div>
                </div>
                <div  v-if="rowCust.open">
                  <div class="blog-3-body-head" style="background: #bdbdbd">
                    <div style="width: 4%; text-align: center" class="eng pd-v">
                      Line
                    </div>
                    <div style="width: 8%; text-align: center" class="eng pd-v">
                      ItemNo
                    </div>
                    <div
                      style="width: 12%; text-align: center"
                      class="eng pd-v"
                    >
                      Barcode
                    </div>
                    <div style="width: 23%; text-align: left" class="eng pd-v">
                      Description
                    </div>

                    <div
                      style="width: 5%; text-align: center"
                      class="eng borderWhite pd-v"
                    >
                      Order QTY
                    </div>
                    <div
                      style="width: 5%; text-align: center"
                      class="eng borderWhite pd-v"
                    >
                      SO QTY
                    </div>
                    <!-- <div style="width:7%;text-align:center" class="eng borderWhite pd-v">Allocate</div> -->
                    <!-- <div style="width:7%;text-align:center" class="eng borderWhite pd-v">Packing</div> -->
                    <div
                      style="width: 5%; text-align: center"
                      class="eng borderWhite pd-v"
                    >
                      Invoice
                    </div>
                    <div
                      style="width: 5%; text-align: center"
                      class="eng borderWhite pd-v"
                    >
                      BackOrder
                    </div>
                    <div
                      style="width: 4%; text-align: center"
                      class="eng borderWhite pd-v"
                    >
                      Unit
                    </div>
                    <div
                      style="width: 4%; text-align: center"
                      class="eng borderWhite pd-v"
                    >
                      Fulfill
                    </div>
                    <div
                      style="width: 4%; text-align: center"
                      class="eng borderWhite pd-v"
                    >
                      Un-Fulfill
                    </div>
                    <div
                      style="width: 10%; text-align: center"
                      class="eng borderWhite pd-v"
                    >
                      Net Price
                    </div>

                    <div
                      style="width: 11%; text-align: center"
                      class="eng borderWhite pd-v"
                    >
                      Order Amount
                    </div>
                  </div>
                  <div
                    v-for="(rowPo, indexPo) in rowCust.detail_po.data"
                    :key="
                      'rowPo-' + rowPo.item_no + '-' + indexPo + '-' + indexCust
                    "
                  >
                    <div class="blog-3-body-row">
                      <div
                        style="width: 4%; text-align: center"
                        class="eng pd-v"
                      >
                        {{ rowPo.line }}
                      </div>
                      <div
                        style="width: 8%; text-align: center"
                        class="eng pd-v"
                      >
                        {{ rowPo.item_no }}
                      </div>
                      <div
                        style="width: 12%; text-align: center"
                        class="eng pd-v"
                      >
                        {{ rowPo.barcode }}
                      </div>
                      <div
                        style="width: 23%; text-align: left"
                        class="thai pd-v"
                      >
                        {{ rowPo.description }}
                      </div>
                      <div
                        style="width: 5%; text-align: center"
                        class="eng pd-v"
                      >
                        {{ fmINT(rowPo.qty) }}
                      </div>
                      <div
                        style="width: 5%; text-align: center"
                        class="eng pd-v"
                      >
                        {{ fmINT(rowPo.order) }}
                      </div>
                      <!-- <div style="width:7%;text-align:center" class="eng pd-v">{{rowPo.packing}}</div> -->
                      <div
                        style="width: 5%; text-align: center"
                        class="eng pd-v"
                      >
                        {{ fmINT(rowPo.invoice) }}
                      </div>
                      <div
                        style="width: 5%; text-align: center"
                        class="eng pd-v"
                      >
                        {{ fmINT(rowPo.backorder) }}
                      </div>
                      <div
                        style="width: 4%; text-align: center"
                        class="eng pd-v"
                      >
                        {{ rowPo.unit }}
                      </div>
                      <div
                        style="width: 4%; text-align: right"
                        class="eng pd-v"
                      >
                        <!-- <div v-if="rowPo.ful_fill == '-'">
                          {{ rowPo.ful_fill }}
                        </div>
                        <div v-if="rowPo.ful_fill != '-'">
                          {{ rowPo.ful_fill }}{{ "%" }}
                        </div> -->


                        
                      <div v-if="rowPo.ful_fill != '-'  && rowPo.ful_fill.charAt(rowPo.ful_fill.length  - 1 ) == '0' && rowPo.ful_fill.charAt(rowPo.ful_fill.length  - 2 ) == '0' ">
                     {{ Number(rowPo.ful_fill).toFixed(0)}}{{ "%" }}
                    </div>
                    <div v-else-if="rowPo.ful_fill != '-'  && rowPo.ful_fill.charAt(rowPo.ful_fill.length  - 1 ) == '0'  ">
                       {{ Number(rowPo.ful_fill).toFixed(1)}}{{ "%" }}
                    </div>
                    <div v-else-if="rowPo.ful_fill == '-'">
                      {{ rowPo.ful_fill }}
                    </div>
                    <div v-else>
                       {{ rowPo.ful_fill }}{{ "%" }}
                    </div>


                      
                      </div>
                      <div
                        style="width: 4%; text-align: right"
                        class="eng pd-v"
                      >
                        <!-- <div v-if="rowPo.un_ful_fill == '-'">
                          {{ rowPo.un_ful_fill }}
                        </div>
                        <div v-if="rowPo.un_ful_fill != '-'">
                          {{ rowPo.un_ful_fill }}{{ "%" }}
                        </div> -->


                        
                     <div v-if="rowPo.un_ful_fill != '-'  && rowPo.un_ful_fill.charAt(rowPo.un_ful_fill.length  - 1 ) == '0' && rowPo.un_ful_fill.charAt(rowPo.un_ful_fill.length  - 2 ) == '0' ">
                     {{ Number(rowPo.un_ful_fill).toFixed(0)}}{{ "%" }}
                    </div>
                    <div v-else-if="rowPo.un_ful_fill != '-'  && rowPo.un_ful_fill.charAt(rowPo.un_ful_fill.length  - 1 ) == '0'  ">
                       {{ Number(rowPo.un_ful_fill).toFixed(1)}}{{ "%" }}
                    </div>
                    <div v-else-if="rowPo.un_ful_fill == '-'">
                      {{ rowPo.un_ful_fill }}
                    </div>
                    <div v-else>
                       {{ rowPo.un_ful_fill }}{{ "%" }}
                    </div>


                       
                      </div>
                      <div
                        style="width: 10%; text-align: right; padding-right: 1%"
                        class="eng pd-v"
                      >
                        {{ fm(rowPo.net_price) }}
                      </div>
                      <div
                        style="width: 11%; text-align: right; padding-right: 1%"
                        class="eng pd-v"
                      >
                        {{ fm(rowPo.net_amount) }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="blog-3-body-row total"
                    v-if="rowCust.detail_po.data.length > 0"
                  >
                    <div
                      style="width: 47%; text-align: right; padding-right: 15px"
                      class="thai pd-v"
                    >
                      TOTAL
                    </div>
                    <div
                      style="width: 5%; text-align: center"
                      class="eng borderWhite pd-v"
                    >
                      <b>{{ fmINT(rowCust.detail_po.total.total_qty) }}</b>
                    </div>
                    <div
                      style="width: 5%; text-align: center"
                      class="eng borderWhite pd-v"
                    >
                      <b>{{ fmINT(rowCust.detail_po.total.total_order) }}</b>
                    </div>
                    <div
                      style="width: 5%; text-align: center"
                      class="eng borderWhite pd-v"
                    >
                      <b>{{ fmINT(rowCust.detail_po.total.total_invoice) }}</b>
                    </div>
                    <div
                      style="width: 5%; text-align: center"
                      class="eng borderWhite pd-v"
                    >
                      <b>{{
                        fmINT(rowCust.detail_po.total.total_back_order)
                      }}</b>
                    </div>
                    <div
                      style="width: 5%; text-align: center"
                      class="eng borderWhite pd-v"
                    ></div>
                    <div
                      style="width: 17%; text-align: right; padding-right: 1%"
                      class="eng borderWhite pd-v"
                    >
                      <b>{{ fm(rowCust.detail_po.total.total_net_price) }}</b>
                    </div>
                    <div
                      style="width: 11%; text-align: right; padding-right: 1%"
                      class="eng borderWhite pd-v"
                    >
                      <b>{{ fm(rowCust.detail_po.total.total_net_amount) }}</b>
                    </div>
                  </div>
                  <div
                    v-else
                    style="
                      padding-top: 8px;
                      padding-bottom: 8px;
                      font-size: 14px;
                      color: #727272;
                    "
                  >
                    No data
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import dateFunc from "../Salesops/fullCalendar/dateFunc";
import inqService from "@/services/orders/inquiry";

export default {
  name: "orders-inquiry",
  data() {
    return {
      dataList: [],
      keyword: "",
      dp1: "po_date",
      dp2: "all",
      dp3: "all",
      dp4: "all",
      dp5:'all',
      showmonth: false,
      spinner_loading: false,
      spinner_loading_total : false,
      months: dateFunc.format(new Date(), "MMMM"),
      years: dateFunc.format(new Date(), "yyyy"),
      year: dateFunc.format(new Date(), "yyyy"),
      month: dateFunc.format(new Date(), "MM"),
      range: "-",
      displayRange: true,
      datePickerData: {
        month: dateFunc.format(new Date(), "MM"),
        year: dateFunc.format(new Date(), "yyyy"),
        range: "-",
      },
      grandTotal: {
        total_customer: 0,
        total_order_po: 0,
        line_order: 0,
        line_allocate: 0,
        line_invoice: 0,
        per_line_allocate: 0,
        per_line_invoice: 0,
        qty_order: 0,
        qty_allocate: 0,
        qty_invoice: 0,
        per_qty_allocate: 0,
        per_qty_invoice: 0,
        amount_order: 0,
        amount_allocate: 0,
        amount_invoice: 0,
      },
      pageName: "",

      corporate:'',
      channel:'all',
      group_cus:'all',
      corpName:'',

       arr_channel:[  
        {code:'all',name:'All Channel'},
        {code:'TT',name:'TT'},
        {code:'MTT',name:'MTT'},
      ],
      TypeDate:[  
        {code:'po_date',name:'PO. DATE'},
        {code:'inv_date',name:'Invoice Date'},
        {code:'delivery_date',name:'Delivery Date'},
      ],
      filter_Source:'salesops',
      filter_Source_bycus:'',

      orderSource: []
    };
  },
  methods: {
    changeVal(val) {
      return parseFloat(val);
    },
    mouseLeave: function () {
      if (this.showmonth == true) {
        this.showmonth = false;
      }
    },
    selectyear(value) {
      this.year = value.year;
    },
    selectMonth(value) {
      if (value.mode == "range") {
        var range = value.range.split("/");
        let start = moment(range[0]).format("DD MMM YYYY");
        let end = moment(range[1]).format("DD MMM YYYY");
        this.months = start + " - " + end;
        this.years = "";
        this.month = "";
        this.datePickerData = {
          month: "",
          year: "",
          range: value.range,
          mode: value.mode,
        };
      } else {
        this.months = value.month.value;
        this.years = value.year;
        this.month = value.month.id;
        this.datePickerData = {
          month: value.month.id,
          year: value.year,
          range: "-",
          mode: value.mode,
        };
      }
      this.hideCalendar();
    },
    hideCalendar: function () {
      this.showmonth = false;
    },
    searchInquiry() {
      this.showCustomer();
    },
    keywordFil(val) {
      this.keyword = val;
    },
    keywordCLR() {
      this.keyword = "";
    },
    filtersearch_(input , indexs){
      let items = this.orderSource
      let index = indexs
      let tmp = items.splice(index, 1)
      items.unshift(tmp[0])
      this.orderSource = items

    },
    showDetailByPo(index, rowCust, indexCust) {
      let result =''
      if(!this.dataList[index].detail_cust[indexCust].open){
         let obj = { doc_no: rowCust.doc_no };
      this.spinner_loading = true;
      inqService
        .showDetailByPo(obj)
        .then((response) => {
           result = this.dataList[index].detail_cust[indexCust];
          result.open = !result.open;
          result.detail_po = response;
          this.spinner_loading = false;
        })
        .catch()
      }else {
            result = this.dataList[index].detail_cust[indexCust];
         result.open = !result.open;
      }
     ;
    },
    showDetailByCust(row, index) {
      this.spinner_loading = true;
      let filterRs = {
        filter_date: this.dp1,
        filter_trn: this.dp2,
        filter_add: this.dp3,
        filter_status: this.dp4,
        keyword: this.keyword,
        source: this.filter_Source_bycus
      };
      let obj = {
        range: this.datePickerData.range,
        month: this.datePickerData.month,
        year: this.datePickerData.year,
        cust_code: row.customer_code,
        filter: filterRs,
      };
      inqService
        .showDetailByCust(obj)
        .then((response) => {
          this.dataList[index].open = !this.dataList[index].open;
          this.dataList[index].detail_cust = response;
          this.spinner_loading = false;
        })
        .catch();
    },
    showCustomer() {
      this.spinner_loading = true;
      this.spinner_loading_total = true
      let filterRs = {
        filter_date: this.dp1,
        filter_trn: this.dp2,
        filter_add: this.dp3,
        filter_status: this.dp4,
        keyword: this.keyword,
        filter_group:this.dp5,
        selectChannel:this.channel,
        selectCorpName:this.corpName,
        source: this.filter_Source
      };
      let obj = {
        range: this.datePickerData.range,
        month: this.datePickerData.month,
        year: this.datePickerData.year,
        filter: filterRs,
      };

      inqService
        .getCust(obj)
        .then((response) => {
          if(response.data == 'null'){
            this.dataList = []
          }else {
             this.dataList = response.data;
          }
         
          // this.grandTotal = response.total;

          this.filter_Source_bycus = this.filter_Source
          this.spinner_loading = false;

          inqService
        .inquirygettotalhead(obj)
        .then((response) => {
          // this.dataList = response;
          this.grandTotal = response;

          this.filter_Source_bycus = this.filter_Source
          this.spinner_loading_total = false;
        })
        .catch();

        
        })
        .catch();

       
    },
    fmData(row) {
      return row;
    },
    fmINT(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    fm(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },
   
     selectChannel( param , indexs ){
       document.getElementById('inquiry_select_corp').click()
      let items = this.channelCrop
      let index = indexs
      let tmp = items.splice(index, 1)
      items.unshift(tmp[0])
      this.$store.commit('history/setChannelCrop' ,items )
      // this.channelCrop = items
      if(param.id === 'all'){
        this.corpName = ''
      }else {
         this.corpName = param.id
      }
      
    },
    selectChannelGroup(param ,indexs){
        document.getElementById('inquiry_select_channel').click()
      let items = this.arr_channel
      let index = indexs
      let tmp = items.splice(index, 1)
      items.unshift(tmp[0])
      this.arr_channel = items

      this.$store.dispatch("history/ediCorporateCode",this.group_cus);


      if(this.group_cus != 'MTT'){
        this.corporate = ''
        this.corpName = ''
      }else {
        this.corporate = 'All Corporate'
      }
      this.channel = this.group_cus
    },
    selectTypeDate(param , indexs){
      document.getElementById('inquiry_select_date').click()
      let items = this.TypeDate
      let index = indexs
      let tmp = items.splice(index, 1)
      items.unshift(tmp[0])
      this.TypeDate = items
    },
  },
  computed: {
     channelCrop() {
      return this.$store.getters["history/channelCrop"];
    },

  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.login = true;
      let menu = this.$store.getters["displayMenu"];
      let path = this.$router.app._route.path.split("/");
      let pathFull = this.$router.app._route.path;
      this.$store.commit('history/setChannelCrop' ,[] )
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
      this.$store.dispatch("setPathMenuService", "orders");

      let new_souce = []
      let theArray = JSON.parse(Vue.localStorage.get('order_source')) 
      for (let index = 0; index < theArray.length; index++) {
        const element = theArray[index];
        if(String(element.menu_code).indexOf('inquiry') != -1){
          new_souce.push(element)
        }
      }
        this.orderSource = new_souce
    }
  },
  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
    "md-search-box": require("./myorder-component/md-search-box"),
    "month-calendar": require("../Salesops/customComponent/mds-month-calendarV2"),
  },
};
</script>
<style lang="scss" scoped>
#pageInquiry {
  .blog-filter {
    padding-top: 15px;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
    display: flex;
  }
  .blog-topic {
    text-align: left;
    font-weight: bold;
    color: #414141;
    font-family: lato;
    font-size: 16px;
    padding-top: 20px;
    padding-left: 20px;
  }
  .blog-1 {
    border-radius: 3px;
    padding: 10px 20px;
    .blog-1-row {
      padding: 2.5px 0px;
    }
    .blog-1-head {
      background: #fd7f00;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    .blog-1-subhead {
      background: #fd7f00;
      opacity: 0.6;
    }
    .blog-1-head,
    .blog-1-subhead {
      padding: 6px 0px;
      width: 100%;
      display: flex;
      background: #fd7f00;
      color: #fff;
      font-family: roboto;
      font-size: 12px;
    }
    .blog-1-body {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      background: #fff;
      color: #414141;
      font-size: 16px;
      .thai {
        font-family: kanit;
      }
      .eng {
        font-family: roboto;
      }
      .borderWhite {
        border-left: 2px solid #fff;
      }
      .pd-v {
        padding-top: 6px;
        padding-bottom: 6px;
      }
      .blog-1-body-row,
      .blog-1-body-subhead {
        width: 100%;
        display: flex;
        padding: 9px 0px 10px 0px;
      }
      .blog-1-body-row:hover {
        background: #efefef;
        cursor: pointer;
      }
      .blog-2-body-row,
      .blog-3-body-row {
        width: 100%;
        display: flex;
        font-size: 14px;
        font-family: roboto;
        &.total {
          // margin-bottom: 15px;
          background: #f7f7f7;
        }
      }
      .blog-2-body-head,
      .blog-3-body-head {
        display: flex;
        width: 100%;
        font-size: 12px;
        background: #a8a8a8;
        color: #fff;
      }
      .blog-2-body-head {
        padding: 5px 0px;
      }
      .blog-3-body-head {
        // padding: 3px 0px;
      }
      .blog-2-body-row:hover {
        background: #efefef;
        cursor: pointer;
      }
    }
  }
}
</style>
