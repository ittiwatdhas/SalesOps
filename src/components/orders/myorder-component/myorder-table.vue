<template>
  <div>
    <div
      v-if="expand"
      :class="'sub-title md-pointer'"
      :style="{'margin-top': '18px'}"
      @click="expandTable"
      :id="tableName"
    >
   
    
      {{tableName}} &nbsp;({{formatNumberInt(value.length)}})
      <md-icon
        :id="'icon'+tableName"
        v-if="expandBlock"
        style="padding-left:15px"
        class="md-pointer"
      >keyboard_arrow_down</md-icon>
      <md-icon
        :id="'icon'+tableName"
        v-else-if="!expandBlock"
        style="padding-left:15px"
        class="md-pointer"
      >keyboard_arrow_right</md-icon>
    </div>
    <div
      v-else
      :class="'sub-title'"
      :style="{'margin-top': '18px'}"
    >{{tableName}} &nbsp;({{formatNumberInt(value.length)}})</div>

    <md-snackbar
      :md-position="vertical + ' ' + horizontal"
      ref="snackbar"
      :md-duration="duration"
    >
      <span>{{ 'ไม่สามารถ Copy PO นี้ได้' }}</span>
      <md-button  @click="close_snack" class="md-accent" style="color:#FD7F00"
      >OK</md-button
      >
    </md-snackbar>


    <div
      :class="'head-table'"
      v-if="showTable && ( type =='XPRESS')"
      style="display: flex;padding-bottom: 12px;width:100%"
    >
      <div class="text-left" style="width: 10%;">PO No.</div>
      <div class="text-left" style="width: 10%;">Order No.</div>
      <div class="text-left" style="width: 10%;">Invoice No.</div>
      <div class="text-left" style="width: 10%;">Po Date</div>
      <div class="text-left" style="width: 10%;">Create Date</div>
      <div class="text-left" style="width: 18%;">Customer</div>
      <div class="text-left" style="width: 13%;">Salesman (Creator)</div>
      <div class="text-right" style=" width: 12%;">Order Value</div>
      <div style="width: 8%;padding-left:0px;text-align:center">Action</div>
     
      <div style="width: 3%;padding-left:0px"></div>
    </div>
    
    <div
      :class="'head-table'"
      v-if="showTable && ( type =='DRAFT') || ( type =='PENNDING') || ( type =='REJECT')"
      style="display: flex;padding-bottom: 12px;"
    >
    <div class="text-left" style="width: 10%;">PO No.</div>
      <div class="text-left" style="width: 10%;">Invoice No.</div>
      <div class="text-left" style="width: 10%;">Create Date</div>
      <div class="text-left" style="width: 38%;">Customer</div>
      <div class="text-left" style="width: 13%;">Salesman (Creator)</div>
      <div class="text-right" style=" width: 12%;">Order Value</div>
      <div style="width: 11%;padding-left:0px;text-align:center">Action</div>
      <div style="width: 3%;padding-left:0px"></div>
    </div>

    <div
      :class="'head-table'"
      v-if="showTable && ( type =='COMPLETED')"
      style="display: flex;padding-bottom: 12px;"
    >
      <div class="text-left" style="background-color:;width: 9%;">PO No.</div>
      <div class="text-left" style="width: 10%;">Order No.</div>
      <div class="text-left" style="background-color:;width:9%;">Invoice No.</div>
      <div class="text-left" style="width:9%;">Po Date.</div>
      <div class="text-left" style="background-color:;width:9%;">Create Date</div>
      <div class="text-left" style="width:17%;">Customer</div>
      <div class="text-left" style="background-color:;width:13%;">Salesman (Creator)</div>
      <div class="text-right" style=" width:11%;">Order Value</div>
      <div style="background-color:;width: 11%;padding-left:0px;text-align:center">Action</div>
      <div style="width:1%;padding-left:0px"></div>
    </div>

   
    <div
      v-for="items in value"
      :key="items.id"
      v-if="showTable"
      :class="items.checked ?'content-table selected':'content-table'"
      style="display: flex;padding-bottom: 8px;padding-right:7px"
    >
      <div
        class="number descript"
        style="width: 10%;padding-top:2px;font-family:kanit;white-space: nowrap;
            text-overflow: ellipsis;"
      >
        {{items.po_no}}
        <md-tooltip
          v-if="countLetter(items.po_no , 13)"
          md-direction="top"
          class="mds-tooltips"
        >{{items.po_no}}</md-tooltip>
      </div>
      <div
        v-if="type == 'COMPLETED'|| type =='XPRESS'"
        class="number descript"
        style="width: 10%;padding-top:2px;
        font-family:kanit;white-space: nowrap;text-overflow: 
        ellipsis;"
      >
        {{items.order_no}}
        <md-tooltip
          v-if="countLetter(items.order_no , 11)"
          md-direction="top"
          class="mds-tooltips"
        >{{items.order_no}}</md-tooltip>
      </div>
      <div
        class="number descript"
        style="width: 10%;padding-top:2px;
        font-family:kanit;white-space: nowrap;text-overflow: 
        ellipsis;"
      >
        {{items.invoice_no}}
        <md-tooltip
          v-if="countLetter(items.invoice_no , 13)"
          md-direction="top"
          class="mds-tooltips"
        >{{items.invoice_no}}</md-tooltip>
      </div>
      <div
        v-if="type == 'COMPLETED'|| type =='XPRESS'"
        class="number"
        style="width: 10%;padding-top:2px"
      >{{showTime(items.po_date)}}</div>
      <div class="number" style="width: 10%;padding-top:2px">{{showTime(items.create_date)}}</div>
      <div
        class="descript"
        :style="{'width':type == 'COMPLETED'|| type =='XPRESS' ?'18%':'38%'
        ,'padding-right':'5px'
        ,'white-space':'nowrap'
        ,'padding-top':'2px'
        ,'text-overflow':'ellipsis'}"
      >
        {{items.customer_code}}&nbsp;&nbsp;
        <span
          style="font-family:kanit"
        >{{items.customer_name_th}}</span>
        <md-tooltip md-direction="top">
          <span style="font-family:kanit">{{items.customer_code}}&nbsp;{{items.customer_name_th}}</span>
        </md-tooltip>
      </div>
      <div
        class="descript"
        style="width: 13%;font-family:kanit;white-space: nowrap;text-overflow: ellipsis;padding-top:2px"
      >
        {{items.salesman_creator}}
        <md-tooltip md-direction="top">
          <span style="font-family:kanit">{{items.salesman_creator}}</span>
        </md-tooltip>
      </div>
      <div style="width: 12%;font-size: 13px;text-align: right;color: #414141;padding-top:2px">
        <span style="padding-right:1px;color:#5A5A5A">฿</span>
        {{$store.getters['globalfunc/formatNumber'](items.total_netamount)}}
      </div>
      <div :class="'number comment'" style="text-align: center;width: 5%;padding-left:15px">
        <md-button
          class="md-icon-button"
          @click="openComment($event , items)"
          :style="{'background': renderComment(items)}"
          :id="'icon'+items.doc_no"
        >
          <md-icon class="comment-btn">chat_bubble</md-icon>
          <md-tooltip md-direction="top">Note</md-tooltip>
        </md-button>
      </div>

      
      <div v-if="type !='XPRESS'"  @click="duplicatePo('createOrder_dialog' , items , type)" :class="'number comment'" style="text-align: center;width: 3%;">
          <md-icon    style="cursor: pointer;color: rgb(201, 201, 201);">content_copy</md-icon>
          <md-tooltip md-direction="top">Copy PO;.</md-tooltip>
      </div>


      <div :class="'number'" style="text-align: center;width: 3%;">
        <md-button style="color:#C9C9C9; width: 24px; min-width: 24px; height: 24px; min-height: 24px; border-radius: 0%;"
          class="md-icon-button"
          @click="openDelivery('delivery_dialog' , items , type)"
          :id="'icon'+items.doc_no"
        >
          <md-icon style="margin-left: 0px;margin-top: 0px;margin-bottom: 0px;">description</md-icon>
          <md-tooltip md-direction="top">Rep.</md-tooltip>
        </md-button>
      </div>
      <div
        class="number"
        style="width: 3%;opacity: 0.54;cursor:pointer"
        @click="openDialog('createOrder_dialog' , items , type)"
        :id="'detail'+items.doc_no"
      >
        <md-icon>keyboard_arrow_right</md-icon>
      </div>
    </div>

  </div>
</template>
<script>
import moment from "moment";
export default {
  created() {
    if (this.expand) {
      this.showTable = false;
    }
  },
  props: {
    value: {
      type: Array,
      default: []
    },
    tableName: {
      type: String,
      default: ""
    },
    expand: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return { expandBlock: false, showTable: true  ,  vertical: 'top',horizontal: 'center', duration: 7000,};
  },
  methods: {
    formatNumberInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    countLetter(row, key) {
      if (row.length >= key) {
        return true;
      } else {
        return false;
      }
    },
    showTime(value) {
      return moment(new Date(value)).format("DD/MM/YYYY");
      // return moment(new Date(value)).format("YYYY-MM-DD");
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
    openComment(e, items) {
      this.$emit("opencomment", e, items);
    },
    duplicatePo(id, value, type){
        if(value.copy_status){
          this.openDialog('createOrder_dialog' , value , 'COPY')
        }else {
          this.$refs.snackbar.open()
        }
    },
    close_snack(){
      this.$refs.snackbar.close()
    },
    openDialog(id, value, type) {
      this.$emit("opendialog", id, value, type);
    },
    openDelivery(id, value, type) {
      this.$emit("opendelivery", id, value, type);
    },
    expandTable() {
      if (this.expandBlock) {
        this.expandBlock = false;
        if (this.expand) {
          this.showTable = this.expandBlock;
        }
      } else {
        this.expandBlock = true;
        if (this.expand) {
          this.showTable = this.expandBlock;
        }
      }
      this.$emit("expandtable");
    }
  }
};
</script>
