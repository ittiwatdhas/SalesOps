<template>
  <div
    class="comment-dialog"
    @mouseleave="mouseLeave"
    v-show="option.display"
    :style="{'top': option.top +'px','left': option.left +'px','position':'absolute','z-index':'1000'}"
  >
    <div class="comment-head" style="text-align:left">{{title}}</div>
    <div class="comment-body" @scroll="handleScroll">
      <div v-for="(row, rowIndex) in data" :key="row.id + rowIndex" :value="row.id">
        <div
          :style="{'background': row.status == 'Y'?'#FFFFFF':'#FDF5DF' , 
                    'padding':'5px 10px 8px 10px', 'width':'100%', 'cursor': row.status == 'Y'?'':'pointer' , 
                    'border-bottom':'solid 0.1px #DDDDDD'}"
        >
          <div style="display:flex">
            <div class="md-rectangle-icon medium lightgray"></div>
            <div style="line-height:17px;padding-top:7px;text-align: -webkit-auto;">
              <div class="name-txt">{{row.name}} {{row.emp_id}}</div>
              <div class="time-txt">{{formatTime(row.createdate , 1)}}</div>
            </div>
          </div>
          <div class="comment-txt">{{row.comment}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
export default {
  created() {},
  props: ["data", "title", "option"],
  data() {
    return {
      comments: "",
      txtComment: "",
      txtMonth: "thismonth",
      showComment: false
    };
  },
  methods: {
    read() {
      this.$emit("read", this.data);
    },
    handleScroll(event) {
      this.$emit("handleScroll", event);
    },
    formatTime(value, type) {
      const date = moment(value);
      let txt_date = "";
      if (date.format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")) {
        txt_date = date.format("H:mm A") + " Today";
      } else if (
        date.format("YYYY-MM-DD") ==
        moment()
          .add(-1, "days")
          .format("YYYY-MM-DD")
      ) {
        txt_date = date.format("H:mm A") + " Yesterday";
      } else if (moment().diff(date, "days") < 7) {
        txt_date = date.format("H:mm A") + " " + date.format("dddd");
      } else {
        if (type > 0) {
          txt_date = date.format("dddd DD,") + " " + date.format("H:mm A");
        } else {
          txt_date =
            date.format("dddd MMM DD, YYYY") + " " + date.format("H:mm A");
        }
      }
      return txt_date;
    },
    reply() {
      if (this.txtComment != "") {
        let temp = {
          id: "new",
          position: Vue.localStorage.get("department"),
          emp_id: Vue.localStorage.get("emp_id"),
          first_name: Vue.localStorage.get("first_name"),
          last_name: Vue.localStorage.get("last_name"),
          status: "N",
          comment: this.txtComment.trim(),
          emp_id_start: "",
          msg_to: ""
        };
        this.txtComment = "";
        this.$emit("reply", temp);
      } else {
        this.$emit("reply", null);
      }
    },
    close() {
      this.$emit("close", false);
    },
    showDateTime(createdate, type) {
      const date = moment(createdate);
      let txt_date = "";
      if (date.format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")) {
        txt_date = date.format("H:mm A") + " Today";
      } else if (
        date.format("YYYY-MM-DD") ==
        moment()
          .add(-1, "days")
          .format("YYYY-MM-DD")
      ) {
        txt_date = date.format("H:mm A") + " Yesterday";
      } else if (moment().diff(date, "days") < 7) {
        txt_date = date.format("H:mm A") + " " + date.format("dddd");
      } else {
        if (type > 0) {
          txt_date = date.format("dddd DD,") + " " + date.format("H:mm A");
        } else {
          txt_date =
            date.format("dddd MMM DD, YYYY") + " " + date.format("H:mm A");
        }
      }
      return txt_date;
    },
    mouseLeave: function() {
      if (this.option.display == true) {
        this.$emit("close", false);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$color-primary: #fd7f00;
$color-green: #66bb6a;
$color-red: #f44336;
$color-light-gray: #efefef;
$font-roboto: Roboto;
$font-lato: Lato;
$font-kanit: Kanit;
.comment-dialog {
  width: 250px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  .comment-head {
    height: 32px;
    color: #727272;
    font-family: $font-lato;
    font-size: 15px;
    background: $color-light-gray;
    padding-left: 10px;
    padding-top: 6px;
    font-weight: bold;
    border-bottom: solid 0.1px #dddddd;
  }
  .comment-footer {
    background: $color-light-gray;
    padding: 10px;
    .md-input-container {
      margin: unset;
      padding-left: 10px;
      height: 28px;
      background: white;
      border-radius: 4px;
      min-height: 28px;
      padding-top: 1px;
      box-shadow: 0 0px 3px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0),
        0 1px 1px -2px rgba(0, 0, 0, 0);
      input {
        height: 28px;
        font-size: 14px;
      }
    }
    .md-button {
      height: 30px;
      min-height: 24px;
      box-shadow: unset;
      font-size: 12px;
      line-height: 14px;
      margin-left: unset;
      margin-top: 10px;
      width: 88px;
      &.reply-btn {
        color: #ffffff;
        background: #a8a8a8;
      }
      &.cancel-btn {
        background: $color-primary;
        color: #ffffff;
      }
    }
    .reply-btn:hover {
      background: #a8a8a8;
    }
    .cancel-btn:hover {
      background: $color-primary;
    }
  }
  .comment-body {
    max-height: 200px;
    // max-height: 170px;
    // max-height: calc(100vh - 350px);
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
    .md-rectangle-icon {
      &.medium {
        width: 32px;
        min-width: 32px;
        height: 32px;
        min-height: 32px;
      }
    }
    .position-txt {
      color: rgba(0, 0, 0, 0.87);
      font-size: 9px;
      font-family: $font-lato;
      font-weight: bold;
    }
    .name-txt {
      font-family: $font-kanit;
      color: #767676;
      font-size: 12px;
    }
    .time-txt {
      color: #a8a8a8;
      font-size: 10px;
      font-family: $font-lato;
    }
    .comment-txt {
      font-family: $font-kanit;
      text-align: left;
      font-size: 13px;
      margin-bottom: 5px;
      color: #727272;
    }
  }
  .comment-body::-webkit-scrollbar {
    height: 5px;
    width: 5px;
    background: #ffffff;
  }
  .comment-body::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.11);
    border-radius: 5px;
  }
}
</style>

