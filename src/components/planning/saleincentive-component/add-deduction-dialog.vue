<template>
  <div>
    <div
      v-if="datas.head.type =='deduction_item' || datas.head.type =='additions_item'"
      class="additions_item"
    >
      <div style="width:100%;display:flex" class="title-1">
        <div
          style="width:97%"
        >{{datas.head.sm_code}}&nbsp;:&nbsp;{{datas.head.sm_name}}</div>
        <div style="width:3%;text-align: end;">
          <md-icon style="cursor:pointer" @click.native="close">close</md-icon>
        </div>
      </div>
      <div class="body-cons">
        <div class="borders">
          <div class="box-1" style="width:100%">{{datas.head.title}}</div>
          <div style="width:100%;">
            <!-- v-if="row.detail.length > 0" -->
            <div
              :style="{'padding-left':'35px','width':'100%','display':'flex','font-family':'lato','font-size':'12px','margin-top':'20px','margin-bottom':'8px'}"
            >
              <div style="width:30%;text-align:left;">
                <b>TOPICS</b>
              </div>
              <div style="width:19%;text-align:left">
                <b>TYPE</b>
              </div>
              <div style="width:16%;text-align:left;padding-left:10px">
                <b>PAID</b>
              </div>
              <div style="width:25%;text-align:left">
                <b>COMMENT</b>
              </div>
              <div style="width:10%;text-align:right;padding-right:5px">
                <md-icon
                  :style="{
                    'visibility':currentStep == 3 ?'visible':'hidden',
                  'cursor':'pointer',
                'padding-top':'2px',
                'text-align':'center',
                'background':'#fd7f00',
                'color':'white',
                'border-radius': '24px',
                'font-size':'18px',
                'height': '24px','min-height': '24px',
                'width': '24px','min-width': '24px'}"
                  @click.native="add()"
                >add</md-icon>
              </div>
            </div>
            <div
              v-if="datas.detail.length == 0"
              style="color:#41414180;text-align:center;width:100%;padding:10px 0px;font-size:13px"
            >No data...</div>
            <div
              v-for="(line,indexs) in datas.detail"
              :key="'add-item-'+indexs"
              :style="{'width':'100%','display':'flex', 'margin-bottom': indexs == datas.detail.length-1 ? '10px':'unset'}"
            >
              <div style="display:flex;width:100%;padding-left:35px" class="box-1-detail">
                <div style="width:30%;padding-right:30px;padding-left:25px;">
                  <md-input-container
                    style="margin:0px;min-height:30px;height:30px;padding-top:0px"
                  >
                    <md-select
                      v-model="line.topic_id"
                      @selected="seltopic(indexs)"
                      :disabled="currentStep == 4 ? true:false"
                    >
                      <md-option
                        :value="row.code"
                        v-for="row in datas.head.dropdown.topic"
                        :key="'a4-arrdg1'+row.code"
                        :disabled="renderDis(row.code)"
                      >
                        <span
                          :style="{'color':renderDis(row.code)? 'rgb(168, 168, 168)': ''}"
                        >{{row.title}}</span>
                      </md-option>
                    </md-select>
                  </md-input-container>
                </div>
                <div style="width:19%;text-align:center;padding-right:30px">
                  <md-input-container
                    style="margin:0px;min-height:30px;height:30px;padding-top:0px"
                  >
                    <md-select
                      v-model="line.type_id"
                      @selected="seltype(indexs)"
                      :disabled="currentStep == 4 || currentStep == 3 ? true:false"

                    >
                      <md-option
                        :value="row.code"
                        v-for="row in datas.head.dropdown.type"
                        :key="'a5-arrdg12'+row.code"
                      >{{row.title}}</md-option>
                    </md-select>
                  </md-input-container>
                </div>
                <div style="width:16%;text-align:center;display:flex">
                  <div v-if="line.type_id == '1'" style="width:10%;padding-top:7px">+</div>
                  <div v-else style="width:10%;padding-top:7px">-</div>
                  <div style="width:90%;padding-right:30px" class="hide-dis">
                    <mds-input
                      v-model="line.paid"
                      :id="'paid-'+indexs"
                      :table="'paid'"
                      :index="indexs"
                      :indexDetail="indexs"
                      type="detail"
                      :readOnly="currentStep == 4 ? true:false"
                      @nextTab="nextTabs"
                      @calculate="calculate"
                    ></mds-input>
                  </div>
                </div>
                <div style="width:25%;text-align:center" class="hide-dis"> 
                  <md-input-container
                    class="md-input-focused"
                    style="min-height:30px;padding-top:0px"
                  >
                  <md-textarea id="note"
                    v-model="line.note" 
                    :placeholder="line.last_note" 
                    maxlength="255" 
                    @focus.native="$event.target.select()"
                  ></md-textarea>
                    <!-- <md-input
                      v-model="line.note"
                      :placeholder="line.last_note"
                      @focus.native="$event.target.select()"
                      class="note"
                    ></md-input> -->
                  </md-input-container>
                </div>
                <div style="width:10%;text-align:right;padding-right:5px">
                  <md-button
                    class="md-icon-button"
                    @click="openComment($event , line)"
                    :style="{'visibility':line.comment.length > 0 ? 'visible':'hidden','background': renderComment(line) , 'margin':'9px 0px 0px 0px', 'padding-top':'0px'}"
                    :id="'icon'+line.id"
                  >
                    <md-icon class="comment-btn">chat_bubble</md-icon>
                    <md-tooltip md-direction="top">Note</md-tooltip>
                  </md-button>

                  <md-icon
                    class="delIcon"
                    :style="{
                    'visibility':currentStep == 3 ?'visible':'hidden',
                    'margin-top':'6px',
                    'cursor':'pointer',
                    'text-align':'center',
                    'color':'#A8A8A8',
                    'border-radius': '27px',
                    'font-size':'29px',
                    'height': '27px','min-height': '27px',
                    'width': '27px','min-width': '27px'}"
                    @click.native="del(line)"
                  >remove_circle</md-icon>
                </div>
              </div>
            </div>
            <div style="width:100%;background:#EFEFEF;padding:10px;font-size:14px;display:flex">
              <div style="width:50%"></div>
              <div style="width:50%;padding-left:13px">
                <span v-if="datas.head.total >= 0">+</span>
                <span v-else-if="datas.head.total < 0">-</span>
                {{showTotal(datas.head.total)}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="width:100%;padding:7px;text-align:right;margin-top:10px" class="title-1">
        <md-button
          style="height:30px;min-height:30px;margin:unset;color:#fd7f00;
        border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
          @click="save()"
        >SAVE</md-button>
      </div>
    </div>
    <md-comment-dialog
      :title="'Notes'"
      @close="closeComment"
      @read="readComment"
      @handleScroll="getCommentId"
      :data="lineComment"
      :option="commentOpt"
    ></md-comment-dialog>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "count-item-confirm",
  components: {
    "md-comment-dialog": require("./md-comment-dialog"),
    "mds-input": require("./step1-input")
  },
  data() {
    return {
      lineComment: [],
      commentOpt: {
        display: false,
        top: 0,
        left: 0
      }
    };
  },
  props: {
    datas: {
      type: Object,
      required: true
    }
  },
  computed: {
    masterStep1() {
      return this.$store.getters["incentive/masterStep1"];
    },
    currentStep() {
      return this.$store.getters["incentive/currentStep"];
    }
  },
  methods: {
    nextTabs(index, el) {
      let rows = this.datas.detail[index];
      let id = "paid-" + index;
      var x = document.getElementById(id);
      if (!_.isNull(x)) {
        x.maxLength = el.length + 1;
      }
    },
    openComment(e, items) {
      let pageX = e.pageX;
      if (pageX == 0) {
        let comment = document.getElementById("icon" + items.id);
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
      this.commentOpt.top = this.commentOpt.top - 60;
      this.commentOpt.left = pageX - 420;
      this.commentOpt.display = true;
      this.lineComment = items.comment;
    },
    getCommentId(value) {
      // console.log("--->", value.srcElement.childNodes);
    },
    closeComment() {
      this.commentOpt.display = false;
    },
    readComment() {
      console.log("readComment");
    },
    renderComment(value) {
      // if (value.order_status == "REJ") {
      //   return "#F44336";
      // } else if (value.note_status == false && value.order_status !== "REJ") {
      return "#FD7F00";
      // } else {
      //   return "#C9C9C9";
      // }
    },
    showTotal(value) {
      if (value < 0) {
        value = value * -1;
      }
      return this.fmFull(value);
    },
    renderDis(code) {
      let check = _.filter(this.datas.detail, o => {
        if (o.topic_id == code && code != "0") {
          return true;
        }
      });
      return check.length == 0 ? false : true;
    },
    save() {
      this.$emit("save");
    },
    add() {
      if (this.currentStep == 3) {
        this.$emit("add");
      }
    },
    del(index) {
      if (this.currentStep == 3) {
        this.$emit("del", index);
      }
    },
    calculate(index) {
      this.$emit("calculate", index);
    },
    close() {
      this.$emit("close");
    },
    seltopic(indexs) {
      let master = _.cloneDeep(this.datas.head.dropdown)
      let paid_type = ''
      let topic_id = this.datas.detail[indexs].topic_id
      if(parseInt(topic_id) != 0){
        let row = _.find(master.topic, function (o) {
          return parseInt(o.code) == parseInt(topic_id)
        })
        if (!_.isUndefined(row)) {
          paid_type = row.paid_type
        }
        let row_type = _.find(master.type_temp, function (o) {
          return o.paid_type == paid_type
        })
        if (!_.isUndefined(row_type)) {
          this.datas.head.dropdown.type = []
          this.datas.head.dropdown.type.push(row_type)
          this.datas.detail[indexs].type_id = row_type.code
        }

      }

      this.$emit("seltopic", indexs);
    },
    seltype(indexs) {
      this.$emit("calculate", indexs);
    },
    renderUnit(value) {
      if (value == 1) {
        return "%";
      } else {
        return "฿";
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
.additions_item {
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
    height: calc(100vh - 251px);
    .borders {
      border: 1px solid #efefef;
      border-radius: 3px;
    }
    .box-1 {
      padding: 30px 30px 0px 35px;
      font-family: kanit;
      font-size: 18px;
      font-weight: 600;
    }
    .title-ipt-roboto,
    .title-ipt-kanit {
      height: 20px;
      color: #414141;
      font-size: 13px;
      line-height: 1;
      padding-bottom: 2px;
      font-family: roboto;
      border-bottom: 1px solid rgba(201, 201, 201, 0.57);
    }
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
    .text-1 {
      font-family: kanit;
    }
    .md-input-container {
      margin: 0px 0px 15px 0px;
    }
    .md-select .md-select-value {
      font-family: kanit;
      font-size: 14px;
    }
    .md-theme-default.md-input-container.md-input-focused:after {
      height: 1px;
    }
    .md-theme-default.md-input-container.md-input-focused input,
    .md-input-container.md-has-value input {
      font-size: 14px;
      font-family: roboto;
    }
    .md-theme-default.md-input-container.md-input-focused input.note,
    .md-input-container.md-has-value input.note {
      font-size: 14px;
      font-family: kanit;
    }
    .box-1-detail {
      .delIcon {
        visibility: hidden;
      }
    }
    .box-1-detail:hover {
      background: #efefef;
      .delIcon {
        visibility: visible;
      }
    }
    .md-input-container .md-count {
      display: none;
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
  .hide-dis {
    .md-input-container.md-input-disabled:after {
      background-image : none;
    }
  }
  #note::placeholder {
    color:#A8A8A8;
    font-size: 12px;
    font-family: kanit;
}
}
</style>
