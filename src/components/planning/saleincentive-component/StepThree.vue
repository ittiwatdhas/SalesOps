<template>
  <div>
    <div id="sales-incen-stapthree" style="width: 100%;">
      <head-StepThree
        v-if="currentStep == 3"
        @opendg="emitFromHead"
      > </head-StepThree>
      <head-StepFour
        v-if="currentStep == 4"
        @opendg="emitFromHead"
        @sender="selectedSender"
      ></head-StepFour>
      
      <!--BLOCK HEAD-->
      <div
        class="mds-card head-box"
        style="margin-top:10px;width:100%;padding:10px 20px;margin-bottom:15px"
      >
        <div style="width:100%;display:flex;">
          <div style="width:25%;text-align:left">
            <div class="text-1">Sales Cycle</div>
            <div class="text-2 no-under-line-dp" style="padding-right:10%">
              <md-input-container
                style="margin:0px;padding-top:0px;min-height:30px"
              >
                <md-select multiple v-model="step3.head.sales_cycle">
                  <md-subheader
                    @click.native="selectAllSalesCycle"
                    :style="{
                      cursor: 'pointer',
                      'font-size': '16px',
                      'font-family': 'lato',
                      'font-weight': '600',
                      color: checkColSalesCycle() ? '#fd7f00' : '#757575'
                    }"
                    class="mds-subheader"
                    >All sales cycle</md-subheader
                  >
                  <md-option
                    v-for="(row, idx) in step3.head.salesCycleList"
                    @click.native="selectSalesCycle(row)"
                    :value="row.code"
                    :key="'s-cyle' + idx"
                  >
                    <template>
                      <div
                        style="display:-webkit-box;width:100%;padding-bottom:7px"
                      >
                        <div
                          :style="{
                            'line-height': '1.4',
                            'white-space': 'initial',
                            'text-overflow': 'ellipsis',
                            display: 'block',
                            color: checkByList(step3.head.sales_cycle, row.code)
                              ? '#fd7f00'
                              : 'black',
                            'padding-right': '5px',
                            overflow: 'hidden'
                          }"
                        >
                          {{ formatterDate('head', row.start_date) }} -
                          {{ formatterDate('head', row.end_date) }}
                        </div>
                      </div>
                    </template>
                  </md-option>
                </md-select>
              </md-input-container>
            </div>
          </div>
          <div style="width:25%;text-align:left;padding-left:5%">
            <div class="text-1">Pay Date</div>
            <div class="text-2" style="padding-top:5px">
              <!-- formatterDate('head', step3.head.pay_date) -->
              <span v-if="step3.head.pay_date != '-'">{{ showPayDate() }}</span>
              <span v-else>{{ step3.head.pay_date }}</span>
            </div>
          </div>
          <div style="width:40%;text-align:left" class="no-under-line-dp">
            <div class="text-1">Recipient Group</div>
            <md-input-container
              style="margin:unset;min-height:30px;padding:0px;max-width:610px"
            >
              <md-select multiple v-model="step3.head.teams">
                <md-subheader
                  @click.native="selecedAllTeam"
                  :style="{
                    cursor: 'pointer',
                    'font-size': '16px',
                    'font-family': 'lato',
                    'font-weight': '600',
                    color: checkCol() ? '#fd7f00' : '#757575'
                  }"
                  class="mds-subheader"
                  >All recipient group</md-subheader
                >
                <md-option
                  @click.native="selecedTeam(row)"
                  v-for="row in step3.head.teamsList"
                  :key="row.code"
                  :value="row.code"
                >
                  <template>
                    <div
                      style="display:-webkit-box;width:100%;padding-bottom:7px"
                    >
                      <div
                        :style="{
                          width: '300px',
                          'line-height': '1.4',
                          'white-space': 'initial',
                          'text-overflow': 'ellipsis',
                          display: 'block',
                          color: checkByList(step3.head.teams, row.code)
                            ? '#fd7f00'
                            : 'black',
                          'padding-right': '5px',
                          overflow: 'hidden'
                        }"
                      >
                        <!-- {{ row.code }} -->
                        {{ row.name }}
                      </div>
                      <div style="width:15px;padding-top:3px;">
                        <div
                          class="step1tab2-team-chip"
                          style="height:15px"
                          v-if="row.status == 'active'"
                        ></div>
                        <div
                          class="step1tab2-unteam-chip"
                          style="height:15px"
                          v-else
                        ></div>
                      </div>
                    </div>
                  </template>
                </md-option>
              </md-select>
            </md-input-container>
          </div>
          <div style="width:10%;text-align:right" class="no-under-line-dp">
            <!-- <div class="text-1">Recipient Group</div> commentlist-->
            <md-button 
                    class="comment md-icon-button"
                    @click="openCommentHead($event , step3.head.commentlist)"
                    :style="{'visibility':step3.head.commentlist.length > 0 ? 'visible':'hidden','background': renderComment(step3.head.commentlist) , 'margin':'20px 0px 0px 0px', 'padding-top':'0px'}"
                    
                  >
                    <md-icon style="height:24px,min-height:24px,width:24px,min-width: 24px" class="comment-btn">chat_bubble</md-icon>
                    <md-tooltip md-direction="top">Note</md-tooltip>
                  </md-button>
          </div>
        </div>
      </div>
      <div
        v-if="step3.group.length == 0"
        class="mds-card"
        style="color:rgba(0, 0, 0, .99);text-align:center;width:100%;padding:10% 0%;font-size:15px"
      >
        No data...
      </div>
      <div
        v-if="step3.group.length > 0"
        class="mds-card"
        style="margin-bottom:60px;width:100%;padding:16px 5px 5px 10px;display: block"
      >
        <div
          style="width:100%;display:flex;color:#A8A8A8;font-size:13px;font-family:roboto;padding-bottom:5px"
        >
          <div style="width:3%"></div>
          <div
            style="width:16%;justify-content:left;display:flex;cursor:pointer;color:#414141"
            @click="sortCol(2)"
          >
            Salesman
            <div style="padding-left:10px">
              <md-icon v-if="col2">arrow_drop_down</md-icon>
              <md-icon v-else>arrow_drop_up</md-icon>
            </div>
          </div>
          <div
            style="width:7%;justify-content:left;display:flex;cursor:pointer;color:#414141"
            @click="sortCol(3)"
          >
            <b>Paid</b>
            <div style="padding-left:10px">
              <md-icon v-if="col3">arrow_drop_down</md-icon>
              <md-icon v-else>arrow_drop_up</md-icon>
            </div>
          </div>
          <div style="width:7%;text-align:left"></div>
          <div style="width:7%;text-align:left">Actual Sales</div>
          <div style="width:7%;text-align:left"></div>
          <div style="width:7%;text-align:left">Target</div>
          <div style="width:7%;text-align:left"></div>
          <div style="width:7%;text-align:left">
            Sales
            <br />
            (&nbsp;{{ yearLable.sales_name }}&nbsp;)
          </div>
          <div style="width:7%;text-align:left"></div>
          <div style="width:7%;text-align:left">
            Year on Year
            <br />
            (&nbsp;{{ yearLable.year_now_name }}&nbsp;)
          </div>
          <div style="width:7%;text-align:left"></div>
          <div style="width:7%;text-align:left">
            Year on Year
            <br />
            (&nbsp;{{ yearLable.year_last_name }}&nbsp;)
          </div>
          <div style="width:2%;"></div>
        </div>
        <div id="step3dataList">
          <div
            v-for="(row, index) in step3.group"
            :key="'con' + row.sm_code + '-' + index"
            style="width:100%; display:flex;margin-bottom:20px;"
          >
            <div style="width:100%;font-family:roboto">
              <div style="display:flex;padding:5px 0px 8px 10px;">
                <span style="font-weight:600;"
                  >{{ row.group_code }}&nbsp;:&nbsp;{{ row.group_name }}</span
                >&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="color:rgb(168, 168, 168);">{{
                  formatterDate('latest', row.latest)
                }}</span>
              </div>
              <div
                v-for="(row2, index2) in row.smlist"
                :key="'con' + row2.sm_code + '-' + index + '-' + index2"
                style="width:100%;"
              >
                <div style="width:100%;margin-top:5px;" class="row-2">
                  <div style="width:3%;padding-top:3px">{{ index2 + 1 }}</div>
                  <div
                    @click="hideDetail(index, index2)"
                    style="width:16%;text-align:left;font-family:kanit;padding-top:3px;cursor:pointer"
                  >
                    {{ row2.sm_code }}&nbsp;:&nbsp;{{ row2.sm_name }}
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    <b>
                      {{ subPoint(row2.paid, 'front') }}
                      <span style="font-size:10px;">{{
                        subPoint(row2.paid, 'back')
                      }}</span>
                    </b>
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    <span style="font-size:10px"
                      >%{{ fm(row2.paid_percent) }}</span
                    >
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    {{ subPoint(row2.actual, 'front') }}
                    <span style="font-size:10px">{{
                      subPoint(row2.actual, 'back')
                    }}</span>
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    <span style="font-size:10px"
                      >%{{ fm(row2.actual_percent) }}</span
                    >
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    {{ subPoint(row2.target, 'front') }}
                    <span style="font-size:10px">{{
                      subPoint(row2.target, 'back')
                    }}</span>
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    <span style="font-size:10px"
                      >%{{ fm(row2.target_percent) }}</span
                    >
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    {{ subPoint(row2.sales, 'front') }}
                    <span style="font-size:10px">{{
                      subPoint(row2.sales, 'back')
                    }}</span>
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    <span style="font-size:10px"
                      >%{{ fm(row2.sales_percent) }}</span
                    >
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    {{ subPoint(row2.year_now, 'front') }}
                    <span style="font-size:10px">{{
                      subPoint(row2.year_now, 'back')
                    }}</span>
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    <span style="font-size:10px"
                      >%{{ fm(row2.year_now_percent) }}</span
                    >
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    {{ subPoint(row2.year_last, 'front') }}
                    <span style="font-size:10px">{{
                      subPoint(row2.year_last, 'back')
                    }}</span>
                  </div>
                  <div style="width:2%;cursor:pointer;text-align:end;">
                    <md-menu
                      md-direction="bottom left"
                      md-size="4"
                      style="height: 30px;"
                    >
                      <md-button
                        class="md-icon-button"
                        md-menu-trigger
                        style="margin:0px;"
                      >
                        <md-icon style="margin:0px;opacity:0.5"
                          >more_vert</md-icon
                        >
                      </md-button>
                      <md-menu-content>
                        <md-menu-item @selected="choose('paid', index, index2)">
                          <span>Paid Details</span>
                        </md-menu-item>
                        <md-menu-item @selected="choose('actual', index, index2)">
                          <span>Actual Sales Details</span>
                        </md-menu-item>
                      </md-menu-content>
                    </md-menu>
                  </div>
                </div>
                <div
                  v-if="
                    row2.show_detail == 'paid' || row2.show_detail == 'actual'
                  "
                  style="width:100%;padding:0px 45px 0px 23px;"
                >
                  <div style="display:flex;background:#F7F7F7;padding:5px;">
                    <div style="width:25%;text-align:right"></div>
                    <div style="width:25%;color:#A8A8A8;text-align:left;x">
                      <span v-if="row2.show_detail == 'paid'">PAID DETAILS</span>
                      <span v-else-if="row2.show_detail == 'actual'"
                        >ACTUAL SALES DETAILS</span
                      >
                    </div>
                    <div style="width:27%;text-align:right;padding-right:1%;">
                      <span
                        v-if="row2.show_detail == 'paid'"
                        style="color:#A8A8A8"
                        >(฿) PAID</span
                      >
                      <span
                        v-else-if="row2.show_detail == 'actual'"
                        style="color:#A8A8A8"
                        >(฿) SALES</span
                      >
                    </div>
                    <div style="width:18%;text-align:left;padding-left:5px">
                      <b>
                        {{ subPoint(row2.total_detail, 'front') }}
                        <span style="font-size:12px">{{
                          subPoint(row2.total_detail, 'back')
                        }}</span>
                      </b>
                    </div>
                    <div style="width:5%;"></div>
                  </div>
                </div>
                <div
                  v-for="(row3, index3) in row2.detail"
                  :key="'con3-' + index + '-' + index2 + '-' + index3"
                  :style="{
                    width: '100%',
                    'margin-top': '2px',
                    padding: '0px 43px 0px 23px',
                    'border-radius': ' 3px'
                  }"
                >
                  <div
                    class="row-2"
                    v-if="
                      row2.show_detail == 'paid' || row2.show_detail == 'actual'
                    "
                    :style="{
                      width: '100%',
                      'margin-bottom':
                        index3 == row2.detail.length - 1 ? '20px' : '0px',
                      display: 'flex'
                    }"
                  >
                    <div style="width:25%;text-align:right"></div>
                    <div
                      style="width:25%; display: flex;"
                    > 
                    <div 
                      :style="{
                        width: row2.show_detail == 'paid' ? '55%' : '70%',
                        'text-align': 'left',
                        'padding-top': '2px',
                        'font-family': 'kanit'
                      }"
                    
                      >{{ row3.title }}</div >
                      <div v-if="row3.type == 'count_items'"
                        style="text-align:left;padding-left: 10px;"
                        @click="showDetaill(index, index2, index3, 'info')"
                      >
                        <md-icon style="color:#A8A8A8;cursor:pointer">info</md-icon> 
                      </div>
                      <div v-if="row3.type == 'count_items'"
                      style="text-align:left;padding-top:2px;font-family:kanit;padding-left: 3px;">
                      {{ subPoint(row3.count_item, 'front') }}
                      <span style="font-size:12px">{{
                        subPoint(row3.count_item, 'back')
                      }}</span>
                      items</div>
                    </div>
                    <div style="width:27%"></div>
                    <div
                      style="width:18%;text-align:left;font-size:15px;padding-top:2px;padding-left:5px"
                    >
                      {{ subPoint(row3.total, 'front') }}
                      <span style="font-size:12px">{{
                        subPoint(row3.total, 'back')
                      }}</span>
                    </div>
                    <!-- v-if="row3.type != 'actual_sales' " -->
                    <div v-if="row3.type != 'invoices' && row3.type != 'orders'"
                      style="width:5%;text-align:left;padding-top:3px"
                      @click="showDetaill(index, index2, index3)"
                    >
                      <md-icon style="color:#A8A8A8;cursor:pointer"
                        >keyboard_arrow_right</md-icon
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="height: 80px;"></div>
        </div>
      </div>

      <md-dialog
        md-open-from="#custom"
        md-close-to="#custom"
        ref="incentive-dialog-step3-full"
        id="incentive-dialog-step3-full"
      >
        <count-item-dialog
          :datas="datasComp"
          @close="closeDialog"
        ></count-item-dialog>
        <tactics2-dialog
          :datas="datasComp"
          @close="closeDialog"
        ></tactics2-dialog>
        <invoice-dialog
          :datas="datasComp"
          :datasHead="step3.head"
          @close="closeDialog"
          @show="showItems"
          @cycle="selectCycle"
          @add="selectCheckbox"
          @save="saveInvoice"
          @del="delInvoice"
          :groupCode="currentGroupCode"
        ></invoice-dialog>
      </md-dialog>
      <md-dialog
        md-open-from="#custom"
        md-close-to="#custom"
        ref="incentive-dialog-step3"
        id="incentive-dialog-step3"
      >
        <count-item-detail-dialog
          :datas="datasComp"
          @close="closeDialog"
        ></count-item-detail-dialog>
        <tactics1-dialog
          :datas="datasComp"
          @close="closeDialog"
        ></tactics1-dialog>
        <add-deduction-dialog
          :datas="datasComp"
          @close="closeDialog"
          @add="addLow"
          @del="delLow"
          @calculate="calulatePaid"
          @save="savePaid"
          @seltopic="selTopic"
        ></add-deduction-dialog>
      </md-dialog>

      <md-snackbar
        :md-position="vertical + ' ' + horizontal"
        ref="snackbar"
        :md-duration="duration"
      >
        <span>{{ snkTitle }}</span>
        <md-button class="md-accent" @click="$refs.snackbar.close()">
          <span style="color:#fd7f00">OK</span>
        </md-button>
      </md-snackbar>
    </div>
    <div class="md-card roundsummary-incen" style="padding-top: 11px;" v-if="showBar">
      <div style="width:100%;display:flex">
        <div style="width:10%;text-align:left;padding-top:3px;padding-left:3px">
          {{ subPoint(grandTotal.total_paid, 'front') }}
          <span style="font-size:10px;">{{
            subPoint(grandTotal.total_paid, 'back')
          }}</span>
        </div>
        <div style="width:9%;text-align:left;padding-top:3px">
          <span style="font-size:10px"
            >%{{ fm(grandTotal.total_paid_percent) }}</span
          >
        </div>
        <div style="width:9%;text-align:left;padding-top:3px">
          {{ subPoint(grandTotal.total_actual, 'front') }}
          <span style="font-size:10px">{{
            subPoint(grandTotal.total_actual, 'back')
          }}</span>
        </div>
        <div style="width:9%;text-align:left;padding-top:3px">
          <span style="font-size:10px"
            >%{{ fm(grandTotal.total_actual_percent) }}</span
          >
        </div>
        <div style="width:9%;text-align:left;padding-top:3px">
          {{ subPoint(grandTotal.total_target, 'front') }}
          <span style="font-size:10px">{{
            subPoint(grandTotal.total_target, 'back')
          }}</span>
        </div>
        <div style="width:9%;text-align:left;padding-top:3px">
          <span style="font-size:10px"
            >%{{ fm(grandTotal.total_target_percent) }}</span
          >
        </div>
        <div style="width:9%;text-align:left;padding-top:3px">
          {{ subPoint(grandTotal.total_sales, 'front') }}
          <span style="font-size:10px">{{
            subPoint(grandTotal.total_sales, 'back')
          }}</span>
        </div>
        <div style="width:9%;text-align:left;padding-top:3px">
          <span style="font-size:10px"
            >%{{ fm(grandTotal.total_sales_percent) }}</span
          >
        </div>
        <div style="width:9%;text-align:left;padding-top:3px">
          {{ subPoint(grandTotal.total_year_now, 'front') }}
          <span style="font-size:10px">{{
            subPoint(grandTotal.total_year_now, 'back')
          }}</span>
        </div>
        <div style="width:9%;text-align:left;padding-top:3px">
          <span style="font-size:10px"
            >%{{ fm(grandTotal.total_year_now_percent) }}</span
          >
        </div>
        <div style="width:9%;text-align:left;padding-top:3px">
          {{ subPoint(grandTotal.total_year_last, 'front') }}
          <span style="font-size:10px">{{
            subPoint(grandTotal.total_year_last, 'back')
          }}</span>
        </div>
      </div>
    </div>

    <md-dialog ref="md-confirm-dialog-paid">
      <md-dialog-title>{{ titleCF }}</md-dialog-title>
      <md-dialog-content style="font-family:kanit;font-size:16px">{{
        detailCF
      }}</md-dialog-content>
      <md-dialog-actions>
        <md-button @click="closeDialog" v-if="titleButtonCencel != ''">{{
          titleButtonCencel
        }}</md-button>
        <md-button class="md-primary" @click="submitDG">{{
          titleButton
        }}</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-comment-dialog
      :title="'Notes'"
      @close="closeComment"
      @read="readComment"
      @handleScroll="getCommentId"
      :data="headComment"
      :option="commentOpt"
    ></md-comment-dialog>

    <md-dialog ref="dialog-comment">
      <md-dialog-title>{{ titleComment }}</md-dialog-title>
      <md-dialog-content style="overflow:hidden">
        <!-- <div md-dialog-title md-title
          style="font-size: 16px; color: #727272; font-weight: 500;"
        >{{titleComment}}</div> -->
        <div  style="display: flex; margin-top: 10px; font-size: 22px;">
          <md-input-container style="margin-top:0px">
            <md-textarea id="step3Comment" v-model="step3.head.takeNote"></md-textarea>
          </md-input-container>
        </div>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="$refs['dialog-comment'].close()" style="color: #a8a8a8;">Cancel</md-button>
        <md-button class="md-primary" @click="submitDG()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import service from '@/services/planning/incentive'
var newdate = new Date()
var dd = newdate.getDate()
var mm = newdate.getMonth()
var y = newdate.getFullYear()

export default {
  name: 'step-three',
  components: {
    'count-item-dialog': require('./count-item-dialog'),
    'count-item-detail-dialog': require('./count-item-detail-dialog'),
    'tactics1-dialog': require('./tactics1-dialog'),
    'tactics2-dialog': require('./tactics2-dialog'),
    'add-deduction-dialog': require('./add-deduction-dialog'),
    'invoice-dialog': require('./invoice-dialog'),
    'head-StepThree': require('./head-StepThree'),
    'head-StepFour': require('./head-StepFour'),
    "md-comment-dialog": require("./md-comment-dialog")
  },
  data () {
    return {
      vertical: 'bottom',
      horizontal: 'center',
      duration: 4000,
      snkTitle: '',
      col2: true,
      col3: true,
      detailList: [],
      vertical: 'bottom',
      horizontal: 'center',
      duration: 4000,
      snkTitle: '',
      datasComp: {
        head: {
          sm_code: '',
          sm_name: '',
          title: '',
          total: 0,
          count: 0,
          type: '',
          group_code: ''
        },
        detail: []
      },
      titleCF: 'Do you want to save?',
      titleButton: 'SAVE',
      saveDataINV: [],
      marterINV: [],
      currentGroupCode: '',
      valFromCompo: '',
      titleButtonCencel: 'CANCEL',
      selectSender: null,
      detailCF: '',
      headComment: [],
      commentOpt: {
        display: false,
        top: 0,
        left: 0
      },
      takeNote: "",
      titleComment: '',
      choose_last: {
        mode: '',
        index: '',
        index2: ''
      },
      teamsSelectAll: false
    }
  },
  computed: {
    step3 () {
      return this.$store.getters['incentive/step3']
    },
    grandTotal () {
      return this.$store.getters['incentive/step3'].total
    },
    yearLable () {
      return this.$store.getters['incentive/step3'].total_year
    },
    defaultStep () {
      return this.$store.getters['incentive/defaultStep']
    },
    showBar () {
      return this.$store.getters['incentive/showBar']
    },
    currentStep () {
      return this.$store.getters['incentive/currentStep']
    },
    flow () {
      return this.$store.getters['incentive/flow']
    },
    loadingMain () {
      return this.$store.getters['incentive/loadingMain']
    },
    comStep3Submit() {
      return this.$store.getters["incentive/comStep3Submit"];
    },
    comAddDeduct() {
      return this.$store.getters["incentive/comAddDeduct"];
    },
    comStep4Approve() {
      return this.$store.getters["incentive/comStep4Approve"];
    },
    comStep4Reject() {
      return this.$store.getters["incentive/comStep4Reject"];
    }

    
  },
  methods: {
    showPayDate () {
      let master = _.cloneDeep(this.step3)
      let sales_cycle = master.head.salesCycleList
      let result = []
      let result_code = []
      this.step3.head.pay_date = ""
      // 
      _.forEach(master.head.sales_cycle, function (value, key) {
        let row = _.find(sales_cycle, function (o) {
          return o.code == value
        })
        if (!_.isUndefined(row)) {
          if(!result_code.includes(value)){
            result_code.push(value)
            result.push(row)
          }
        }
      })
      let str = ''
      let t = this
      _.forEach(result, function (value, key) {
        str = str + t.formatterDate('head', value.payDate) + ' , '
      })

      if (str.length > 2) {
        return str.substr(0, str.length - 2)
      } else {
        return '-'
      }
    },
    checkByList (arr, code) {
      let key = _.findIndex(arr, function (o) {
        return parseInt(o) == parseInt(code)
      })
      if (key >= 0) {
        return true
      } else {
        return false
      }
    },
    emitFromHead (mode, val) {
      this.valFromCompo = val
      this.openDG(mode)
    },
    selectedSender (val) {
      if (!this.loadingMain) {
        this.$store.commit('incentive/setLoadingMain', true)
        this.selectSender = val
        let master = _.cloneDeep(this.step3)
        let sales_cycle = master.head.salesCycleList
        let result = []

        // _.forEach(master.head.sales_cycle, function (value, key) {
        //   let row = _.find(sales_cycle, function (o) {
        //     return o.code == value
        //   })
        //   if (!_.isUndefined(row)) {
        //     result.push(row)
        //   }
        // })
        _.forEach(sales_cycle, function (row) {
          if(!result.includes(row.code)){
            result.push(row.code);
          }
        });
        let obj = {
          step: 4,
          permission: 'approver',
          year: val.fiscal_year,
          cycle: val.fiscal_cycle,
          emp_id: val.creator,
          sales_cycle:sales_cycle
        }
        master.group = []
        master.head.salesCycleList = []
        master.head.teamsList = []
        master.head.commentlist = []
        this.$store.commit('incentive/setDataStep3', master)
        service
          .nextToStep3(obj)
          .then(response => {
            this.$store.commit(
              'incentive/setDefaultStep',
              response.defaultStep[0]
            )
            let defaultStep = []
            let group_code = []
            // master.head.teamsList = (!_.isUndefined(defaultStep.group_all))? defaultStep.group_all: []
            // master.head.salesCycleList = response.sale_cycle
            master.head.commentlist = response.comments
            if (response.defaultStep.length > 0) {
              defaultStep = response.defaultStep[0]
              group_code = (!_.isUndefined(defaultStep.group_code_step4))? defaultStep.group_code_step4: []
              master.head.teamsList = (!_.isUndefined(defaultStep.group_all))? defaultStep.group_all: []
              let rec_sale_cycle = []
              if(response.sale_cycle.length > 0  ){
                master.head.salesCycleList = response.sale_cycle
                _.forEach(response.sale_cycle, function (row) {
                  if(!master.head.sales_cycle.includes(row.code)){
                    master.head.sales_cycle.push(row.code);
                    if(master.head.pay_date = ''){
                      master.head.pay_date = row.payDate
                    }else{
                      master.head.pay_date = master.head.pay_date+ ','+row.payDate
                    }
                  }
                });
              }else{
                // master.head.sales_cycle = defaultStep.sale_cycle
                master.head.salesCycleList = defaultStep.sale_cycle
                _.forEach(defaultStep.sale_cycle, function (row) {
                  let rec = _.find(defaultStep.sale_cycle, function (o) {
                    return o.start_date == defaultStep.start_date
                  })

                  if (!_.isUndefined(rec)) {
                    if(!master.head.sales_cycle.includes(rec.code)){
                      master.head.sales_cycle.push(rec.code);
                      if(master.head.pay_date = ''){
                        master.head.pay_date = rec.payDate
                      }else{
                        master.head.pay_date = master.head.pay_date+ ','+rec.payDate
                      }
                    }
                  }
                });
              }

              if (_.isUndefined(group_code)) {
                master.head.teams = rec[0].code.split(",");
              } else {
                if (!_.isNull(group_code)) {
                  master.head.teams = group_code.split(",");
                }
              }
              //   master.head.sales_cycle = _.map(result, 'code')
              //   var rs = _.find(response.sale_cycle, function (o) {
              //     return o.checked == true
              //   })
              //   if (!_.isUndefined(rs)) {
              //     master.head.sales_cycle = [rs.code]
              //     master.head.pay_date = rs.payDate
              //   }
              //   master.head.teams = [response.defaultStep[0].group_code]

              this.$store.commit('incentive/setDataStep3', master)
              // this.$store.commit('incentive/setLoadingMain', false)
              // this.selecedAllTeam()
              this.getdetail()
            }else{
              this.$store.commit('incentive/setLoadingMain', false)
            }
          })
          .catch()
      }
    },
    selectCycle (id) {},
    selTopic (indexs) {
      let master = _.cloneDeep(this.datasComp.head.dropdown)
      let key = this.datasComp.detail
      let lines = master.topic.findIndex(o => {
        return o.code === key[indexs].topic_id
      })
      if (lines > -1) {
        this.datasComp.detail[indexs].topic_name = master.topic[lines].title
      }
    },
    delInvoice (itemCode, record) {
      // data for save inv
      let objINV = {
        po_no: record.po_no,
        po_date: record.po_date,
        order_no: record.order_no,
        order_date: record.order_date,
        trn_inv_no: record.inv_no,
        trn_inv_date: record.inv_date,
        response_code: record.response_code,
        group_code: record.group_code,
        customer_code: record.cust_code,
        customer_name_th: record.customer_name_th,
        trn_amt: record.net_value,
        cycle: record.cycle,
        year: record.year,
        check: false
      }

      let masterINV = _.cloneDeep(this.saveDataINV)
      let keyINV = _.findIndex(masterINV, function (o) {
        return (
          o.customer_code == record.cust_code && o.trn_inv_no == record.inv_no
        )
      })
      if (keyINV >= 0) {
        this.saveDataINV[keyINV] = objINV
      } else {
        this.saveDataINV.push(objINV)
      }

      let master = _.cloneDeep(this.datasComp.head.docNo)

      let chr = itemCode.split('|')
      let lines = this.datasComp.detail.findIndex(o => {
        return o.cust_code === chr[0]
      })

      if (lines > -1) {
        let rs = _.cloneDeep(this.datasComp.detail[lines].item)
        let lines2 = this.datasComp.detail[lines].item.findIndex(o => {
          return o.inv_no === chr[1]
        })

        if (lines2 > -1) {
          this.datasComp.head.docNo = _.filter(master, o => o !== itemCode)
          let mom = _.cloneDeep(this.datasComp.detail[lines].item)
          this.datasComp.detail[lines].item = _.filter(
            mom,
            o => o.inv_no !== chr[1]
          )
          let rs = this.datasComp.detail[lines].item
          this.datasComp.detail[lines].total_net_value = rs.reduce(
            (acc, row) => acc + parseFloat(row.net_value),
            0
          )
          this.datasComp.head.total = this.datasComp.detail.reduce(
            (acc, row) => acc + parseFloat(row.total_net_value),
            0
          )
          this.countPOandINV(rs, lines)
        }
      }
    },
    countPOandINV (mom, key) {
      let inv = _.groupBy(mom, 'inv_no')
      let po = _.groupBy(mom, 'po_no')
      let rsInv = []
      _.forEach(inv, function (rowHead) {
        rsInv.push(rowHead)
      })
      let rsPo = []
      _.forEach(po, function (rowHead) {
        rsPo.push(rowHead)
      })
      this.datasComp.detail[key].inv_value = rsInv.length
      this.datasComp.detail[key].po_value = rsPo.length
      let rs = this.datasComp.detail
      if (this.datasComp.detail[key].item.length == 0) {
        this.datasComp.detail = _.filter(
          rs,
          o => o.cust_code !== this.datasComp.detail[key].cust_code
        )
      }
    },
    saveInvoice () {
      this.openDG('saveInvoice')
    },
    selectCheckbox (itemCode, record) {
      // data for save inv
      let objINV = {
        po_no: record.po_no,
        po_date: record.po_date,
        order_no: record.order_no,
        order_date: record.order_date,
        trn_inv_no: record.inv_no,
        trn_inv_date: record.inv_date,
        response_code: record.response_code,
        group_code: record.group_code,
        customer_code: record.cust_code,
        customer_name_th: record.customer_name_th,
        trn_amt: record.total_netamount,
        check: record.checked ? false : true,
        cycle: record.cycle,
        year: record.year
      }
      let masterINV = _.cloneDeep(this.saveDataINV)
      let keyINV = _.findIndex(masterINV, function (o) {
        return (
          o.customer_code == record.cust_code && o.trn_inv_no == record.inv_no
        )
      })
      if (keyINV >= 0) {
        let reverseeChK = record.checked ? false : true
        if (reverseeChK == record.checked_origin) {
          _.remove(this.saveDataINV, function (o) {
            return (
              o.customer_code == record.cust_code &&
              o.trn_inv_no == record.inv_no
            )
          })
        } else {
          this.saveDataINV[keyINV] = objINV
        }
      } else {
        this.saveDataINV.push(objINV)
      }

      let master = _.cloneDeep(this.datasComp.head.docNo)

      let chr = itemCode.split('|')
      let lines = this.datasComp.detail.findIndex(o => {
        return o.cust_code === chr[0]
      })
      if (lines > -1) {
        let rs = _.cloneDeep(this.datasComp.detail[lines].item)
        let lines2 = this.datasComp.detail[lines].item.findIndex(o => {
          return o.inv_no === chr[1]
        })

        if (lines2 > -1) {
          this.datasComp.head.docNo = _.filter(master, o => o !== itemCode)
          let mom = _.cloneDeep(this.datasComp.detail[lines].item)
          this.datasComp.detail[lines].item = _.filter(
            mom,
            o => o.inv_no !== chr[1]
          )
          let rs = this.datasComp.detail[lines].item
          this.datasComp.detail[lines].total_net_value = rs.reduce(
            (acc, row) => acc + parseFloat(row.net_value),
            0
          )
          this.datasComp.head.total = this.datasComp.detail.reduce(
            (acc, row) => acc + parseFloat(row.total_net_value),
            0
          )
        } else {
          this.datasComp.detail[lines].item.push(record)
          let rs = this.datasComp.detail[lines].item
          this.datasComp.detail[lines].total_net_value = rs.reduce(
            (acc, row) => acc + parseFloat(row.net_value),
            0
          )
          this.datasComp.head.total = this.datasComp.detail.reduce(
            (acc, row) => acc + parseFloat(row.total_net_value),
            0
          )
          this.datasComp.head.docNo.push(itemCode)
        }
        this.countPOandINV(this.datasComp.detail[lines].item, lines)
      } else {
        this.datasComp.head.docNo.push(itemCode)
        let obj = {
          cust_code: record.cust_code,
          customer_name_th: record.customer_name_th,
          inv_value: 0,
          po_value: 0,
          total_net_value: record.net_value,
          item: [record]
        }
        this.datasComp.detail.push(obj)
        let lines3 = this.datasComp.detail.findIndex(o => {
          return o.cust_code === chr[0]
        })
        if (lines3 > -1) {
          let rs = _.cloneDeep(this.datasComp.detail[lines3].item)
          this.countPOandINV(rs, lines3)
          this.datasComp.detail[lines3].total_net_value = rs.reduce(
            (acc, row) => acc + parseFloat(row.net_value),
            0
          )
          this.datasComp.head.total = this.datasComp.detail.reduce(
            (acc, row) => acc + parseFloat(row.total_net_value),
            0
          )
        }
      }
    },
    showItems (index) {
      if (!_.isUndefined(this.datasComp.detail[index])) {
        this.datasComp.detail[index].show_item = !this.datasComp.detail[index]
          .show_item
      }
    },
    submitDG () {
      let master = _.cloneDeep(this.step3)
      if (this.modeCF == 'calculate') {
        this.$store.commit('incentive/setLoadingMain', true)
        this.$refs['md-confirm-dialog-paid'].close()
        let obj = {
          group_code: master.head.teams
        }
        service
          .calulateAllicentive(obj)
          .then(response => {
            this.$store.commit('incentive/setLoadingMain', false)
            let result = []
            _.forEach(master.head.teams, function (values) {
              let row = _.find(master.head.teamsList, function (o) {
                return values == o.code
              })
              if (!_.isUndefined(row)) {
                result.push(row)
              }
            })
            let obj = {
              data: _.cloneDeep(this.step3),
              emp_id: Vue.localStorage.get('emp_id'),
              sales_cycle: result
            }
            this.$store.dispatch('incentive/getStep3DetailLoad', obj)
          })
          .catch()
      } else if (this.modeCF == 'save' || this.modeCF == 'submit') {
        let checkLatest = _.filter(master.group, item => {
          if (item.latest == '' || item.latest == null) {
            return true
          }
        })
        if(this.comStep3Submit == true && this.modeCF == 'submit'){
          if (_.trim(master.head.takeNote) == 0) {
            this.modeCF = 'check_comment'
            this.titleButtonCencel = ''
            this.titleCF = 'Please specify a comment.'
            this.titleButton = 'OK'
            this.$refs['md-confirm-dialog-paid'].open()
            return false
          }
        }
        if (
          this.modeCF == 'save' ||
          (this.modeCF == 'submit' && checkLatest.length == 0)
        ) {
          this.$store.commit('incentive/setLoadingMain', true)
          this.$refs['md-confirm-dialog-paid'].close()
          this.$refs['dialog-comment'].close()
          let master = _.cloneDeep(this.step3)
     
          if (this.modeCF == 'submit') {
            let sales_cycle = master.head.salesCycleList
            let note = master.head.takeNote
            let result = []
            _.forEach(master.head.sales_cycle, function (value, key) {
              let row = _.find(sales_cycle, function (o) {
                return parseInt(o.code) == parseInt(value)
              })
              if (!_.isUndefined(row)) {
                result.push(row)
              }
            })

            let obj = {
              step: this.modeCF == 'save' ? 3 : 4,
              button: this.modeCF,
              sales_cycle: result,
              note: note,
              year: this.defaultStep.year,
              cycle: this.defaultStep.cycle,
            }
            service
              .saveDraftByStep(obj)
              .then(response => {
                this.$store.commit('incentive/setLoadingMain', false)
                if (this.modeCF == 'submit') {
                  this.$store.dispatch('incentive/getDefaultStep')
                }
              })
              .catch()
          } else {
            if (master.head.sales_cycle.length > 0) {
              var rs = _.find(master.head.salesCycleList, function (o) {
                return o.code == master.head.sales_cycle[0]
              })
              if (!_.isUndefined(rs)) {
                let obj = {
                  step: this.modeCF == 'save' ? 3 : 4,
                  year: rs.fiscal_year,
                  cycle: rs.fiscal_cycle,
                  group_code: master.head.teams,
                  start_date: rs.start_date,
                  end_date: rs.end_date,
                  data_head: master.head,
                  data_detail: master.group,
                  button: this.modeCF,
                  ms_tactics_code: _.isUndefined(
                    this.defaultStep.ms_tactics_code
                  )
                    ? 0
                    : this.defaultStep.ms_tactics_code
                }
                service
                  .saveDraftByStep(obj)
                  .then(response => {
                    this.$store.commit('incentive/setLoadingMain', false)
                    if (this.modeCF == 'submit') {
                      this.$store.dispatch('incentive/getDefaultStep')
                    }
                  })
                  .catch()
              }
            }
          }
        } else {
          this.$refs['md-confirm-dialog-paid'].close()
        }
      } else if (
        this.modeCF == 'reject' ||
        this.modeCF == 'sendto' ||
        this.modeCF == 'approve'
      ) {
        if (_.trim(this.valFromCompo) != 0) {
          if(this.comStep4Reject == true && this.modeCF == 'reject'){
            if (_.trim(master.head.takeNote) == 0) {
            // if(master.head.takeNote == ""){
              this.modeCF = 'check_comment_'+this.modeCF
              this.titleButtonCencel = ''
              this.titleCF = 'Please specify a comment.'
              this.titleButton = 'OK'
              this.$refs['md-confirm-dialog-paid'].open()
              return false
            }
          }else if(this.comStep4Approve == true && this.modeCF == 'sendto'){
             if (_.trim(master.head.takeNote) == 0) {
              this.modeCF = 'check_comment_'+this.modeCF
              this.titleButtonCencel = ''
              this.titleCF = 'Please specify a comment.'
              this.titleButton = 'OK'
              this.$refs['md-confirm-dialog-paid'].open()
              return false
            }
          }
          // return false
          this.$store.commit('incentive/setLoadingMain', true)
          this.$refs['md-confirm-dialog-paid'].close()
          this.$refs['dialog-comment'].close()
          var block = document.getElementById('step4-flow-block')
          if (!_.isNull(block)) {
            block.style.visibility = 'hidden'
          }
          let note = master.head.takeNote
          let obj = {
            mode: this.modeCF,
            document: this.valFromCompo,
            login: Vue.localStorage.get('emp_id'),
            note: note
          }
          service
            .runFlow(obj)
            .then(response => {
              this.$store.commit('incentive/setFlow', response.flow)
              this.$store.commit('incentive/setCountFlow', response.count_flow)
              this.$store.commit('incentive/setLoadingMain', false)
            })
            .catch()
        } else {
          this.$refs['md-confirm-dialog-paid'].close()
        }
      } else if (
        this.modeCF == 'recall' ||
        this.modeCF == 'edit' ||
        this.modeCF == 'submit-step4'
      ) {

        if(this.comStep4Approve == true && this.modeCF == 'submit-step4'){
            if (_.trim(master.head.takeNote) == 0) {
            this.modeCF = 'check_comment_'+this.modeCF
            this.titleButtonCencel = ''
            this.titleCF = 'Please specify a comment.'
            this.titleButton = 'OK'
            this.$refs['md-confirm-dialog-paid'].open()
            return false
          }
        }
        this.$store.commit('incentive/setLoadingMain', true)
        this.$refs['md-confirm-dialog-paid'].close()
        this.$refs['dialog-comment'].close()
        let note = master.head.takeNote
        let obj = {
          mode: this.modeCF,
          document: this.flow[0],
          login: Vue.localStorage.get('emp_id'),
          note: note
        }
        service
          .runFlow(obj)
          .then(response => {
            this.$store.commit('incentive/setLoadingMain', false)
            this.$store.dispatch('incentive/getDefaultStep')
            // this.$store.commit("incentive/setCurrentStep", 4);
          })
          .catch()
      } else if( this.modeCF == 'check_comment'){
        this.$refs['md-confirm-dialog-paid'].close()
        this.modeCF = 'submit'
      }else if( this.modeCF == 'check_comment_paid'){
        this.$refs['md-confirm-dialog-paid'].close()
        this.modeCF = 'savePaid'
      }else if( this.modeCF == 'nosave'){
        this.$refs['md-confirm-dialog-paid'].close()
      }else if( this.modeCF == 'check_comment_reject'){
        this.$refs['md-confirm-dialog-paid'].close()
        this.modeCF = 'reject'
      }else if(this.modeCF == 'check_comment_sendto'){
        this.$refs['md-confirm-dialog-paid'].close()
        this.modeCF = 'sendto'
      }else if(this.modeCF == 'check_comment_submit-step4'){
        this.$refs['md-confirm-dialog-paid'].close()
        this.modeCF = 'submit-step4'
      } else {
        let modeCF = _.cloneDeep(this.modeCF)
        this.modeCF = this.modeCF == 'savePaid' ? 'successPaid' : 'successInv'

        let obj = {
          year: this.defaultStep.year,
          cycle: this.defaultStep.cycle,
          group_code: this.datasComp.head.group_code,
          start_date: this.defaultStep.start_date,
          end_date: this.defaultStep.end_date,
          sm_code: this.datasComp.head.sm_code,
          button_type: this.datasComp.head.type,
          data_detail:
            modeCF == 'saveInvoice' ? this.saveDataINV : this.datasComp.detail
        }
        service
          .savePaid(obj)
          .then(response => {
            this.closeDialog()
            this.saveDataINV = []

            this.selecedTeam('reload')
          })
          .catch()
      }
    },
    savePaid () {
      this.openDG('savePaid')
    },
    calulatePaid (index) {
      this.calTopic(index)
    },
    calTopic (index) {
      let master1 = _.cloneDeep(this.datasComp.detail)
      let master = _.cloneDeep(this.datasComp.head.dropdown)
      if (master.type_temp.length > 0) {
        let type1 = _.filter(master1, o => {
          if (o.type_id == master.type_temp[0].code) {
            return true
          }
        })
        if (!_.isUndefined(master1[index])) {
          let typeName = _.filter(master.type_temp, o => {
            if (o.code == master1[index].type_id) {
              return true
            }
          })
          this.datasComp.detail[index].type_name =
            typeName.length > 0 ? typeName[0].title : ''
        }
        let sumType1 = type1.reduce((acc, row) => acc + parseFloat(row.paid), 0)
        let type2 = _.filter(master1, o => {
          if (o.type_id == master.type_temp[1].code) {
            return true
          }
        })
        let sumType2 = type2.reduce((acc, row) => acc + parseFloat(row.paid), 0)
        let step1 = -1 * sumType2
        this.datasComp.head.total = sumType1 + step1
      }
    },
    delLow (row) {
      let master1 = _.cloneDeep(this.datasComp.detail)
      this.datasComp.detail = _.filter(master1, o => {
        if (o.id != row.id) {
          return true
        }
      })
      // if (this.datasComp.detail.length == 0) {
      //   this.addLow()
      // }
      this.calTopic()
    },
    addLow () {
      let master = this.datasComp.head.dropdown
      this.datasComp.detail.push({
        id: 'new-' + this.datasComp.detail.length + 1,
        topic_id: master.topic.length > 0 ? master.topic[0].code : '',
        topic_name: master.topic.length > 0 ? master.topic[0].title : '',
        type_id: master.type.length > 0 ? master.type[0].code : '',
        type_name: master.type.length > 0 ? master.type[0].title : '',
        paid: 0,
        note: '',
        last_note: '*require',
        txt_note: '',
        status_comment: false,
        comment: []
      })
      this.calTopic()
    },
    showDetaill (index, index2, index3, type = null) {
      this.$store.commit('incentive/setLoadingMain', true)
      let master = _.cloneDeep(this.step3)
      let mom = master.group[index]
      let sm = master.group[index].smlist[index2]
      let detail = master.group[index].smlist[index2].detail[index3]
      
      let emp_ids = Vue.localStorage.get('emp_id')
      if (!_.isNull(this.selectSender)) {
        emp_ids = this.selectSender.creator
      }
      var detail_type = (type !=  null)?detail.type+"_"+type : detail.type
      let obj = {
        year: this.defaultStep.year,
        cycle: this.defaultStep.cycle,
        group_code: sm.group_code,
        condition_detail: this.defaultStep.data_condition,
        start_date: this.defaultStep.start_date,
        end_date: this.defaultStep.end_date,
        sm_code: sm.sm_code,
        button_id: detail.id,
        button_code: detail.code,
        button_type: detail_type,
        log_user: emp_ids,


      }
      this.currentGroupCode = sm.group_code
      let rsCycle = ''
      let detailsCode = []
      service
        .getPopupDetailByType(obj)
        .then(response => {
          let dropdown = []
          if (
            detail_type == 'additions_item' ||
            detail_type == 'deduction_item'
          ) {
            dropdown = {
              topic: response.topic,
              type: response.type,
              type_temp: response.type
            }
          } else if (
            detail_type == 'invoices' ||
            detail_type == 'orders' ||
            detail_type == 'actual_sales'
          ) {
            rsCycle = _.find(response.cycle, function (o) {
              return o.select == true
            })

            for (let i = 0; i < response.detail.length; i++) {
              for (let j = 0; j < response.detail[i].item.length; j++) {
                detailsCode.push(
                  response.detail[i].cust_code +
                    '|' +
                    response.detail[i].item[j].inv_no
                )
              }
            }
          } else if (detail_type == 'tactics2' || detail_type == 'tactics1' || detail_type == 'count_items') {
            response.total = detail.total
          }

          // actual_sales
          // invoices
          // orders
          this.datasComp = {
            head: {
              sm_code: sm.sm_code,
              sm_name: sm.sm_name,
              title:
                detail_type == 'additions_item' ||
                detail_type == 'deduction_item'
                  ? 'Additions Items / Deduction Items'
                  : detail.title,
              total: _.isUndefined(response.total) ? 0 : response.total,
              dropdown:
                detail_type == 'additions_item' ||
                detail_type == 'deduction_item'
                  ? dropdown //response.dropdown
                  : [],
              count: _.isUndefined(response.count) ? 0 : response.count,
              type: detail_type,
              cycle: _.isUndefined(response.cycle) ? [] : response.cycle,
              cycle_id:
                _.isUndefined(rsCycle) || rsCycle == '' ? '' : rsCycle.cycle,
              docNo: detailsCode,
              group_code: sm.group_code,
            },
            detail: response.detail
          }
          // if (detail.type != "actual_sales") {
          this.openDG(detail_type)
          var body = document.getElementsByTagName('body')
          body[0].setAttribute('style', 'overflow: hidden !important;')
          if (
            detail_type == 'additions_item' ||
            detail_type == 'deduction_item'
          ) {
            this.calTopic()
          }
          // }
          this.$store.commit('incentive/setLoadingMain', false)
          this.$store.commit('incentive/setShowBar', false)
        })
        .catch()
    },
    openDG (mode) {
      this.modeCF = mode
      this.detailCF = ''
      let master = _.cloneDeep(this.step3)
      this.titleButtonCencel = 'CANCEL'
      let sales_cycle = master.head.salesCycleList
      let check_date = 0
       _.forEach(master.head.sales_cycle, function (value, key) {
        let row = _.find(sales_cycle, function (o) {
          return o.code == value
        })
        if (!_.isUndefined(row)) {
          let pay_date = new Date(row.payDate)
          let now = new Date()
          let date_now = new Date(now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate())
          if(pay_date.valueOf() < date_now.valueOf()){
            check_date++
          }
        }
      })

      if(mode === 'export'){
        console.log(this.permission)
        var rs = {
        login:Vue.localStorage.get("emp_id"),
        year:master.head.salesCycleList[0].fiscal_year,
        cycle:master.head.salesCycleList[0].fiscal_cycle,
        teams:'all',
        url:Vue.config["urlReport"] + "/payment-export-excel",
        page:'incentive'
      }
      this.$store.dispatch('incentive/exportData' , rs)
      } else 
      if (mode == 'save') {
        if(check_date > 0){
          this.modeCF = 'nosave'
          this.titleButtonCencel = ''
          this.titleButton = 'OK'
          this.titleCF = 'Cannot calculate due date to overdue'
          this.$refs['md-confirm-dialog-paid'].open()
        }else{
          this.titleCF = 'Do you want to save this draft?'
          this.titleButton = 'SAVE'
          this.$refs['md-confirm-dialog-paid'].open()
        }
      } else if (mode == 'submit' || mode == 'submit-step4') {
        let checkLatest = _.filter(master.group, item => {
          if (item.latest == '' || item.latest == null) {
            return true
          }
        })
        if (checkLatest.length > 0) {
          this.titleCF = 'Pleaes calculate?'
          this.titleButton = 'OK'
          this.$refs['md-confirm-dialog-paid'].open()
        } else if(check_date > 0){
          this.modeCF = 'nosave'
          this.titleButtonCencel = ''
          this.titleButton = 'OK'
          this.titleCF = 'Cannot calculate due date to overdue'
          this.$refs['md-confirm-dialog-paid'].open()
        } else{
      
            // this.titleCF = 'Do you want to submit this?'
            // this.titleButton = 'OK'
            // this.$refs['md-confirm-dialog-paid'].open()
          this.titleComment = 'You should attach a note to approve the rewards.';
          this.$refs["dialog-comment"].open();
          this.step3.head.takeNote = "";
        }
      } else if (mode == 'calculate') {
        if(check_date > 0){
          this.modeCF = 'nosave'
          this.titleButtonCencel = ''
          this.titleButton = 'OK'
          this.titleCF = 'Cannot calculate due date to overdue'
          this.$refs['md-confirm-dialog-paid'].open()
        }else{
          this.titleCF = 'Do you want to calculate?'
          this.titleButton = 'OK'
          this.$refs['md-confirm-dialog-paid'].open()
        }
      } else if (mode == 'recall') {
        this.titleCF = 'Do you want to recall this?'
        this.titleButton = 'OK'
        this.$refs['md-confirm-dialog-paid'].open()
      } else if (mode == 'edit') {
        this.titleCF = 'Do you want to edit this ?'
        this.titleButton = 'OK'
        this.$refs['md-confirm-dialog-paid'].open()
      } else if (mode == 'reject') {
        if (_.trim(this.valFromCompo) == 0) {
          this.titleButtonCencel = ''
          this.titleCF = 'Please choose one from the list.'
          this.titleButton = 'OK'
          this.$refs['md-confirm-dialog-paid'].open()
        } else {
          // this.titleCF = 'Do you want to reject this?'
          // this.titleButton = 'OK'
          // this.$refs['md-confirm-dialog-paid'].open()

          this.titleComment = 'You should attach a note to reject the rewards.';
          this.$refs["dialog-comment"].open();
          this.step3.head.takeNote = "";
        }
      } else if (mode == 'sendto') {
        if (_.trim(this.valFromCompo) == 0) {
          this.titleButtonCencel = ''
          this.titleCF = 'Please choose one from the list.'
          this.titleButton = 'OK'
          this.$refs['md-confirm-dialog-paid'].open()
        } else {
          // this.titleCF = 'Do you want to submit this?'
          // this.detailCF = this.valFromCompo.creator_name;
          // this.titleButton = 'OK'
          // this.$refs['md-confirm-dialog-paid'].open()

          this.titleComment = 'You should attach a note to approve the rewards.';
          this.$refs["dialog-comment"].open();
          this.step3.head.takeNote = "";
        }
      } else if (mode == 'approve') {
        if (_.trim(this.valFromCompo) == 0) {
          this.titleButtonCencel = ''
          this.titleCF = 'Please choose one from the list.'
          this.titleButton = 'OK'
          this.$refs['md-confirm-dialog-paid'].open()
        } else {
          // this.titleCF = 'Do you want to approve this ?'
          // this.titleButton = 'OK'
          // this.$refs['md-confirm-dialog-paid'].open()
          this.titleComment = 'You should attach a note to approve the rewards.';
          this.$refs["dialog-comment"].open();
          this.step3.head.takeNote = "";
        }
      } else if (
        mode == 'count_items_info' ||
        mode == 'tactics2' ||
        mode == 'invoices' ||
        mode == 'actual_sales' ||
        mode == 'orders'
      ) {
        this.$refs['incentive-dialog-step3-full'].open()
      } else if (mode == 'saveInvoice') {
        this.titleCF = 'Do you want to save?'
        this.titleButton = 'SAVE'
        this.$refs['md-confirm-dialog-paid'].open()
      }else if(mode == 'savePaid'){

        let detail = _.cloneDeep(this.datasComp.detail)
        let comment = 0
        let topic = 0
        let status_check = false
        for(var i=0; i< detail.length ;i++){
          var n = detail[i].id.toString().indexOf("new");

          if(n == -1){
            status_check = detail[i].status_check
            if(detail[i].topic_id == '0'){
              topic++
            }

            if(detail[i].note.trim() == "" && detail[i].txt_note == ""){
              comment++
            } 
          }else{
            if(detail[i].topic_id == '0'){
              topic++
            }
            if(detail[i].note.trim() == ""){
              comment++
            }
          }
        }
        if(detail.length > 1 && comment == 1 && status_check == false){
          comment = 0
        }

        if(topic > 0 && this.comAddDeduct == true){
          this.modeCF = 'check_comment_paid'
          this.titleButtonCencel = ''
          this.titleCF = 'Please specify a topic.'
          this.titleButton = 'OK'
          this.$refs['md-confirm-dialog-paid'].open()
        } else
        if(comment > 0 && this.comAddDeduct == true){
          this.modeCF = 'check_comment_paid'
          this.titleButtonCencel = ''
          this.titleCF = 'Please specify a comment.'
          this.titleButton = 'OK'
          this.$refs['md-confirm-dialog-paid'].open()
        }else{
          this.titleCF = 'Do you want to save?'
          this.titleButton = 'SAVE'
          this.$refs['md-confirm-dialog-paid'].open()
        }
      }  else {
        this.$refs['incentive-dialog-step3'].open()
      }
    },
    selectAllSalesCycle (value) {
      let master = _.cloneDeep(this.step3)
      if (
        master.head.salesCycleList.length == master.head.sales_cycle.length &&
        master.head.sales_cycle.length > 0
      ) {
        master.head.sales_cycle = []
        master.head.recipient_group = []
        master.head.teamsList = []
        master.head.teams = []
        master = this.clearData(master)
        this.$store.commit('incentive/setDataStep3', master)

        this.teamsSelectAll = false
        master.head.teams = []
        master = this.clearData(master)
        this.$store.commit('incentive/setDataStep3', master)
      } else {
        // console.log('A')
        this.selectSalesCycle('all')
        setTimeout(() => {
              this.selecedTeam('all')
        }, 2000)
      }
    },
    selectSalesCycle (val) {
      if (!this.loadingMain) {
        this.$store.commit('incentive/setLoadingMain', true)
        let master = _.cloneDeep(this.step3)
        let sales_cycle = master.head.salesCycleList

        let result = []
        if (val == 'all') {
          result = master.head.salesCycleList
        } else {
          var findCode = _.findIndex(master.head.sales_cycle, function (o) {
            return parseInt(o) == parseInt(val.code)
          })
          if (findCode >= 0) {
            _.remove(master.head.sales_cycle, function (n) {
              return parseInt(n) == parseInt(val.code)
            })
          } else {
            master.head.sales_cycle.push(val.code)
          }
          _.forEach(master.head.sales_cycle, function (value, key) {
            let row = _.find(sales_cycle, function (o) {
              return o.code == value
            })
            if (!_.isUndefined(row)) {
              result.push(row)
            }
          })
        }
        if (result.length > 0) {
          let emp_ids = Vue.localStorage.get('emp_id')
          if (!_.isNull(this.selectSender)) {
            emp_ids = this.selectSender.creator
          }
          var rs = result[0]
          let obj = {
            step: 3,
            permission: 'creator',
            start_date: rs.start_date,
            end_date: rs.end_date,
            year: rs.fiscal_year,
            cycle: rs.fiscal_cycle,
            group_code: master.head.teams,
            ms_tactics_code: this.defaultStep.ms_tactics_code,
            condition_detail: this.defaultStep.data_condition,
            data_recipient: this.defaultStep.data_recipient,
            emp_id: emp_ids,
            sales_cycle: result
          }
          // console.log('selectSalesCycle => ')

          service
            .nextToStep3(obj)
            .then(response => {
              if (response.recipient_group.length > 0) {
                master.head.teams = _.map(response.recipient_group, 'code')
                // master.head.teams = [response.recipient_group[0].code]
              }
              master.head.teamsList = response.recipient_group
              master.head.sales_cycle = _.map(result, 'code')
              master.head.commentlist = response.comments
              this.$store.commit('incentive/setDataStep3', master)
              // this.$store.commit('incentive/setLoadingMain', false)
              // this.selecedTeam(result[0])
              this.getdetail()
            
            })
            .catch()
        } else {
          master.head.teams = []
          master.head.teamsList = []
          master.head.recipient_group = []
          master = this.clearData(master)
          this.$store.commit('incentive/setDataStep3', master)
          this.$store.commit('incentive/setLoadingMain', false)
        }
      }
    },
    hideDetail (index, index2) {
      let master = _.cloneDeep(this.step3)
      if (master.group[index].smlist[index2].show_detail != '') {
        master.group[index].smlist[index2].show_detail = ''
      }
      this.$store.commit('incentive/setDataStep3', master)
    },
    choose (mode, index, index2) {
      this.choose_last.mode = mode
      this.choose_last.index = index
      this.choose_last.index2 = index2
      this.$store.commit('incentive/setLoadingMain', true)
      let master = _.cloneDeep(this.step3)
      master.group[index].smlist[index2].show_detail = mode
      let head = this.step3.head
      // var rs = _.find(head.salesCycleList, function (o) {
      //   return o.code == head.sales_cycle
      // })
      var rs_group = _.find(head.teamsList, function (o) {
        return o.code == master.group[index].group_code
      })

      if (!_.isUndefined(rs_group)) {
        let obj = {
          document_id: master.group[index].smlist[index2].document_id,
          year: rs_group.fiscal_year,
          cycle: rs_group.fiscal_cycle,
          group_code: master.group[index].group_code,
          start_date: rs_group.start_date,
          end_date: rs_group.end_date,
          sm_code: master.group[index].smlist[index2].sm_code,
          button: mode == 'paid' ? 'paid_detail' : 'actual_sales_detail'
        }
        service
          .getStep3DetailByType(obj)
          .then(response => {
            master.group[index].smlist[index2].total_detail = response.total
            master.group[index].smlist[index2].detail = response.data
            this.$store.commit('incentive/setDataStep3', master)
            this.$store.commit('incentive/setLoadingMain', false)
          })
          .catch()
      } else {
        this.$store.commit('incentive/setDataStep3', master)
      }
    },
    checkCol () {
      let master = _.cloneDeep(this.step3)
      if (master.head.teams.length == master.head.teamsList.length && master.head.teams.length > 0) {
        return true
      } else {
        if(this.teamsSelectAll == true){
          master.head.teams = _.map(master.head.teamsList, 'code')
          this.$store.commit('incentive/setDataStep3', master)
          return true
        }else{
          return false
        }
      }
      
    },
    checkColSalesCycle () {
      let head = this.step3.head
      if (
        head.salesCycleList.length == head.sales_cycle.length &&
        head.salesCycleList.length > 0
      ) {
        return true
      } else {
        return false
      }
    },
    selecedAllTeam (value) {
      
      let master = _.cloneDeep(this.step3)
      if (
        master.head.teamsList.length == master.head.teams.length &&
        master.head.teams.length > 0
      ) {
        // console.log('s')
        this.teamsSelectAll = false
        master.head.teams = []
        master = this.clearData(master)
        this.$store.commit('incentive/setDataStep3', master)
      } else {
        this.selecedTeam('all')
        this.teamsSelectAll = true
      }
    },
    selecedTeam (value) {
      let head = this.step3.head
      let master = _.cloneDeep(this.step3)
      this.$store.commit('incentive/setLoadingMain', true)
      let result = []
      if (value == 'all') {
        this.teamsSelectAll = true
        result = master.head.teamsList
        
      } else if(value == 'reload'){
        _.forEach(master.head.teams, function (values) {
          let row = _.find(master.head.teamsList, function (o) {
            return values == o.code
          })
          if (!_.isUndefined(row)) {
            result.push(row)
          }
        })
      }else {
        this.teamsSelectAll = false
        var findCode = _.findIndex(master.head.teams, function (o) {
          return o.toString() == value.code.toString()
        })

        if (findCode < 0) {
          master.head.teams.push(value.code)
        } else {
          _.remove(master.head.teams, function (n) {
            return n.toString() == value.code.toString()
          })
        }
       
        _.forEach(master.head.teams, function (values) {
          let row = _.find(master.head.teamsList, function (o) {
            return values == o.code
          })
          if (!_.isUndefined(row)) {
            result.push(row)
          }
        })
      }
      // master.head.teams = _.map(result, 'code')
      // this.$store.commit('incentive/setDataStep3', master)
      
      let emp_ids = Vue.localStorage.get('emp_id')
      if (!_.isNull(this.selectSender)) {
        emp_ids = this.selectSender.creator
      }
      let obj = {
        emp_id:
          this.permission == 'creator'
            ? Vue.localStorage.get('emp_id')
            : emp_ids,
        sales_cycle: result
      }
      service
        .getStep3Detail(obj)
        .then(response => {
          if (value != 'reload') {
            // master.group = response.group
            master.total_year = response.total_year
            master.head.teams = _.map(result, 'code')
            if (response.group.length > 0) {
              this.$store.commit('incentive/setShowBar', true)
            } else {
              this.$store.commit('incentive/setShowBar', false)
            }
          }

          master.group = response.group
          master.total = response.total
          this.$store.commit('incentive/setDataStep3', master)
          this.$store.commit('incentive/setLoadingMain', false)
          if(value == 'reload'){
            this.choose(this.choose_last.mode, this.choose_last.index, this.choose_last.index2)
          }
          
        })
        .catch()
    },
    getdetail () {
      let master = _.cloneDeep(this.step3)
      let result = master.head.teamsList
      let emp_ids = Vue.localStorage.get('emp_id')
      if (!_.isNull(this.selectSender)) {
        emp_ids = this.selectSender.creator
      }
      let obj = {
        emp_id:
          this.permission == 'creator'
            ? Vue.localStorage.get('emp_id')
            : emp_ids,
        sales_cycle: result
      }

      service
        .getStep3Detail(obj)
        .then(response => {
            master.group = response.group
            master.total_year = response.total_year
            if (response.group.length > 0) {
              this.$store.commit('incentive/setShowBar', true)
            } else {
              this.$store.commit('incentive/setShowBar', false)
            }
          // }
          master.total = response.total
          this.$store.commit('incentive/setDataStep3', master)
          this.$store.commit('incentive/setLoadingMain', false)
        })
        .catch()
    },

    closeDialog () {
      if (this.modeCF != 'savePaid' && this.modeCF != 'saveInvoice') {
        if (this.step3.group.length > 0) {
          this.$store.commit('incentive/setShowBar', true)
        }
        var body = document.getElementsByTagName('body')
        body[0].setAttribute('style', 'overflow-y: auto !important')
        body[0].setAttribute('style', 'overflow-x: hidden !important')
      }

      if (
        this.modeCF == 'count_items_info' ||
        this.modeCF == 'tactics2' ||
        this.modeCF == 'invoices' ||
        this.modeCF == 'actual_sales' ||
        this.modeCF == 'orders'
      ) {
        this.$refs['incentive-dialog-step3-full'].close()
      } else if (this.modeCF == 'savePaid' || this.modeCF == 'saveInvoice') {
        this.$refs['md-confirm-dialog-paid'].close()
        this.$refs['incentive-dialog-step3'].close()
      } else if (this.modeCF == 'successPaid') {
        this.$refs['md-confirm-dialog-paid'].close()
        this.$refs['incentive-dialog-step3'].close()
      } else if (this.modeCF == 'successInv') {
        this.$refs['md-confirm-dialog-paid'].close()
        this.$refs['incentive-dialog-step3-full'].close()
      } else if (
        this.modeCF == 'calculate' ||
        this.modeCF == 'save' ||
        this.modeCF == 'reject' ||
        this.modeCF == 'sendto' ||
        this.modeCF == 'approve' ||
        this.modeCF == 'edit' ||
        this.modeCF == 'submit' ||
        this.modeCF == 'recall' 

      ) {
        this.$refs['md-confirm-dialog-paid'].close()
      } else {
        this.$refs['incentive-dialog-step3'].close()
      }
    },
    subPoint (value, pos) {
      if (_.isNaN(parseFloat(value))) {
        return ''
      } else {
        let rs = this.fmFull(value)
        let master = rs.split('.')
        if (pos == 'front') {
          return master[0]
        } else {
          if (master.length > 1) {
            return '.' + master[1]
          } else {
            return ''
          }
        }
      }
    },
    clearData (master) {
      master.group = []
      master.total = {
        total_paid: 0,
        total_paid_percent: 0,
        total_target: 0,
        total_target_percent: 0,
        total_actual: 0,
        total_actual_percent: 0,
        total_sales: 0,
        total_sales_percent: 0,
        total_year_last: 0,
        total_year_now: 0,
        total_year_now_percent: 0
      }
      return master
    },
    sortCol (mode) {
      if (mode == 2) {
        this.col2 = !this.col2
      } else {
        this.col3 = !this.col3
      }
      let master = _.cloneDeep(this.step3)
      let cols2 = this.col2 ? 'asc' : 'desc'
      let cols3 = this.col3 ? 'asc' : 'desc'
      _.forEach(master.group, function (row) {
        if (mode == 2) {
          row.smlist = _.orderBy(row.smlist, ['sm_code'], [cols2])
        } else {
          row.smlist = _.orderBy(row.smlist, ['paid'], [cols3])
        }
      })
      this.$store.commit('incentive/setDataStep3', master)
    },
    formatterDate (mode, date) {
      let checkFM = moment(date, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']).format()

      if (checkFM == 'Invalid date') {
        return ''
      } else {
        if (mode == 'head') {
          return moment(date).format('DD MMM YYYY')
        } else {
          return 'latest  ' + moment(date).format('DD/MM/YYYY HH:mm:ss')
        }
      }
    },
    /*-----------------------*/
    fmInt (value) {
      return this.$store.getters['globalfunc/formatNumberInt'](value)
    },
    fm (value) {
      return this.$store.getters['globalfunc/formatNumber'](value)
    },
    fmFull (value) {
      var test = value.toString().indexOf('.')
      if (test == -1) {
        return this.fmInt(value)
      } else {
        return this.fm(value)
      }
    },
    fmNumber (value) {
      return this.$store.getters['globalfunc/formatNumber'](value)
    },
    renderComment(value) {
      return "#FD7F00";
    },
    openCommentHead(e, items) {
      let pageX = e.pageX;
      if (pageX == 0) {
        let comment = document.getElementById("icon" + 1);
        pageX = comment.offsetLeft;
      }
      let masterScreenW = window.screen.height;
      let H = e.y;
      if (H > masterScreenW) {
        let total = H - masterScreenW;
        this.commentOpt.top = e.y - total;
      } else {
        this.commentOpt.top = e.y;
      }
      this.commentOpt.top = this.commentOpt.top - 120;
      this.commentOpt.left = pageX - 220;
      this.commentOpt.display = true;
      this.headComment = items;
    },
    getCommentId(value) {
      // console.log("--->", value.srcElement.childNodes);
    },
    closeComment() {
      this.commentOpt.display = false;
    },
    readComment() {
      // console.log("readComment");
    },
    updateComment() {
      // console.log("updateComment");
    }
  },
  created () {
    // console.log("STEP3 >>>");
  }
}
</script>
<style lang="scss" scoped>
#sales-incen-stapthree {
  .md-spinner {
    display: unset;
    position: absolute;
  }
  .md-input-container:after {
    display: none;
  }
  .row-2 {
    display: flex;
    font-size: 12px;
  }
  .row-2:hover {
    background: #efefef;
    border-radius: 3px;
  }
  .md-button.comment.md-icon-button {
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
    #step3dataList {
      display: block; 
      overflow-y: scroll;
      height: 500px;
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
}
.roundsummary-incen {
  width: 76%;
  left: 19%;
  position: fixed;
  overflow-y: hidden;
  z-index: 1px;
  font-family: roboto;
  font-size: 13px;
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  bottom: 0px;
  z-index: 1000;
  background: #414141d5;
  color: white;
  padding: 5px 10px;
  height: 7%;
}
.step1tab2-team-chip {
  background: #66bb6a;
  color: #ffffff;
  font-size: 9px;
  border-radius: 16px;
  text-align: center;
  height: 18px;
  line-height: 1.4;
}
.step1tab2-unteam-chip {
  background: #a8a8a8;
  color: #ffffff;
  font-size: 9px;
  border-radius: 16px;
  text-align: center;
  height: 18px;
  line-height: 1.4;
}
</style>
