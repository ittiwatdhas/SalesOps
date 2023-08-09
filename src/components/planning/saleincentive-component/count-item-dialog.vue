<template>
  <div v-if="datas.head.type =='count_items_info'" class="count_items">
    <div style="width:100%;display:flex" class="title-1">
      <div
        style="width:54%"
      >{{datas.head.sm_code}}&nbsp;:&nbsp;{{datas.head.sm_name}}</div>
      <!-- <div style="width:19%">( {{fmFull(datas.head.count)}} ) Items</div> -->
      <div style="width:19%"></div>
      <div style="width:22%">
        (฿)
        {{subPoint(datas.head.total , 'front')}}
        <span
          style="font-size:14px;"
        >{{subPoint(datas.head.total , 'back')}}</span>
      </div>
      <div style="width:5%;text-align: end;">
        <md-icon style="cursor:pointer" @click.native="close">close</md-icon>
      </div>
    </div>
    <div
      v-if="datas.detail.length == 0"
      class="body-cons"
      style="color: rgba(0, 0, 0, 0.54);font-size:15px;font-family:lato;text-align:center;padding-top:10%"
    >
      No data...
    </div>
    <div 
      v-if="datas.detail.length > 0"
      class="body-cons">
      <div
        style="width:100%;"
        v-for="(row,index) in datas.detail"
        :key="'count-item-'+index"
        class="box-1"
      >
        <div style="width:100%;display:flex;" class="box-1-head">
          <div style="width:55%;">{{row.title}}</div>
          <div style="width:20%;">( {{fmFull(row.item.length)}} ) Items</div>
          <div style="width:25%;">
            (฿)
            {{sumtotal(row.item , 'front')}}
            <span
              style="font-size:12px;"
            >{{sumtotal(row.item , 'back')}}</span>
          </div>
        </div>
        <div
          v-for="(record,indexs) in row.item"
          :key="'count-item-'+index+'-detail-'+indexs"
          class="box-1-detail"
          :style="{'width':'100%','display':'flex', 'margin-bottom': indexs == row.item.length-1 ? '10px':'unset'}"
        >
          <div style="width:80%;">{{record.code}}&nbsp;:&nbsp;{{record.title}}</div>
          <div style="width:20%;padding-left:18px">
            {{subPoint(record.sales , 'front')}}
            <span
              style="font-size:12px;"
            >{{subPoint(record.sales , 'back')}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "count-item-confirm",

  props: {
    datas: {
      type: Object,
      required: true
    }
  },

  methods: {
    sumtotal(data, mode) {
      let total = data.reduce((acc, row) => acc + parseFloat(row.sales), 0);
      return this.subPoint(total, mode);
    },
    subTitle(txt) {
      let master = txt.split(":");
      return master[0];
    },
    close() {
      this.$emit("close");
    },
    subPoint(value, pos) {
      if (_.isNaN(parseFloat(value))) {
        return "";
      } else {
        let rs = this.fm(value);
        let master = rs.split(".");
        if (pos == "front") {
          return master[0];
        } else {
          if (master.length > 1) {
            return "." + master[1];
          } else {
            return "";
          }
        }
      }
    },
    fmInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    fm(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },
    fmFull(value) {
      var test = value.toString().indexOf(".");
      if (test == -1) {
        return this.fmInt(value);
      } else {
        return this.fm(value);
      }
    }
  }
};
</script>

<style lang="scss">
.count_items {
  .title-1 {
    background: #efefef;
    padding: 20px 30px;
    // margin-bottom: 15px;
    color: #414141;
    font-size: 19px;
    font-family: kanit;
  }
  .body-cons {
    padding: 30px;
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100vh - 80px);
    .box-1 {
      border: 1px solid #efefef;
      margin-bottom: 15px;
      border-radius: 4px;
      color: #414141;
      .box-1-head {
        padding: 10px 30px;
        font-size: 16px;
        font-family: kanit;
        background: #efefef;
        margin-bottom: 10px;
      }
      .box-1-detail {
        padding: 5px 90px;
        font-size: 14px;
        font-family: kanit;
      }
      .box-1-detail:hover {
        background: #efefef;
        color: #a2a2a2;
      }
    }
  }
  .body-cons::-webkit-scrollbar {
    height: 7px;
    width: 7px;
    background: #f7f7f7;
  }
  .body-cons::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.11);
    border-radius: 5px;
  }
}
</style>
