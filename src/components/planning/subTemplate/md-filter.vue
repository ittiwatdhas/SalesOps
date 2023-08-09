<template>
  <div class="md-dropdown-box" v-click-outside="mouseLeave">
    <!-- <div class="md-dropdown-box" @mouseleave="mouseLeave"> -->
    <div
      style="display: -webkit-box;
              width:200px;
              cursor : pointer;
              text-decoration: none;
              text-align:left;
              margin-bottom:8px"
      @click="openAutoCom"
    >
      <div class="latoFont -font-15" style="color: #414141">Filter {{value}}</div>
      <md-icon style="color:#A8A8A8; font-size: 18px !important; margin-left: 100px;">ic_arrow_drop_down</md-icon>
    </div>
    <md-card class="text-autocomplete" v-if="showAutocom" :style="{'width' : widthTag +'px'}">
      <div class="no-data-promo" v-if="thaArrayLabel.length == 0 ">
        <span>No data....</span>
      </div>
      <ul class="md-list" v-else>
        <li
          class="md-list-item"
          v-for="(rows , index) in thaArrayLabel"
          :key="'nested-organ-filter'+index"
        >
          <div
            class="md-list-item-row md-search-checkbox"
            @click="chooseRow(index , 'label')"
            style="padding-left: 22px;"
          >
            <md-checkbox
              v-model="rows.checked"
              @change="checkRow(index,$event, 'parent')"
              class="md-primary auto-checkbox pr-10"
            ></md-checkbox>
            <div style=" display: -webkit-box;">
              <div :class="renderLabel(rows.color)">{{rows.title}}</div>
              <div class="total" style="padding-top:2px">{{rows.total}}</div>
            </div>
          </div>
          <div
            v-for="(record , indexs) in rows.items"
            :key="'nested-organ-filter'+indexs"
            class="md-list-item-row md-search-checkbox"
            @click="chooseSubRow(indexs ,index)"
            style="padding-left: 45px;"
          >
            <md-checkbox
              v-model="record.checked"
              @change="checkSubRow(index,indexs,$event )"
              class="md-primary auto-checkbox pr-10"
            ></md-checkbox>
            <div style=" display: -webkit-box;">
              <div :class="renderLabel(record.color)" style="font-size:12px;">{{record.title}}</div>
              <div class="total" style="padding-top:2px">{{record.total}}</div>
            </div>
          </div>
        </li>
        <div class="other-title">Event</div>
        <li
          class="md-list-item"
          v-for="(rows , index) in thaArrayEvent"
          :key="'nested-organ-filters'+index"
        >
          <div
            class="md-list-item-row md-search-checkbox -font-15"
            @click="chooseRow(index , 'event')"
            style="padding-left: 22px;margin-top:5px;"
          >
            <md-checkbox
              v-model="rows.checked"
              @change="checkRow(index,$event , 'event')"
              class="md-primary auto-checkbox pr-10"
            ></md-checkbox>
            <div style=" display: -webkit-box;padding-top:2px">
              <div style="font-size:14px; margin-right:15px;">{{rows.title}}</div>
              <div class="total">{{rows.total}}</div>
            </div>
          </div>
        </li>
      </ul>
    </md-card>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
export default {
  create() {},
  computed: {
    // ...mapGetters({ arr_selectView: "viewby" })
  },
  props: {
    value: {}
  },
  data() {
    return {
      showAutocom: false,
      widthTag: 230,
      thaArrayEvent: [
        {
          title: "Changed Allocation",
          total: "65",
          checked: false
        }
      ],
      thaArrayLabel: [
        {
          title: "Normal",
          total: "380",
          color: "gray",
          checked: true,
          items: []
        },
        {
          title: "New CG",
          total: "10",
          color: "green",
          checked: true,
          items: []
        },
        {
          title: "Under",
          total: "10",
          color: "yellow",
          checked: true,
          items: [
            {
              title: "1 .. 1,500 ฿",
              total: "2",
              checked: true,
              color: "light-yellow"
            },
            {
              title: "1,501 .. 3,000 ฿",
              total: "7",
              checked: true,
              color: "lighter-yellow"
            },
            {
              title: "3,001 .. 4,900 ฿",
              total: "1",
              checked: true,
              color: "yellow"
            }
          ]
        },
        {
          title: "Over",
          total: "45",
          color: "red",
          checked: true,
          items: [
            {
              title: "1% -- 10%",
              total: "28",
              checked: true,
              color: "light-red"
            },
            {
              title: "11% -- 20%",
              total: "10",
              checked: true,
              color: "lighter-red"
            },
            {
              title: "21% -- More",
              total: "7",
              checked: true,
              color: "red"
            }
          ]
        }
      ]
    };
  },
  methods: {
    // ...mapActions(["selectedViewBy"]),
    renderLabel(color) {
      return "label " + color;
    },
    mouseLeave() {
      this.showAutocom = false;
    },
    openAutoCom() {
      this.showAutocom = true;
    },
    chooseRow(index, mode) {
      if (mode == "label") {
        let data = this.thaArrayLabel[index];
        data.checked = !data.checked;
        if (data.items.length > 0) {
          this.checkAllItems(index, data.checked, "parent");
        }
      } else {
        let datas = this.thaArrayEvent[index];
        datas.checked = !datas.checked;
      }
    },
    chooseSubRow(index, parent) {
      let data = this.thaArrayLabel[parent].items[index];
      data.checked = !data.checked;
      this.checkAllItems(parent, data.checked, "row");
    },
    checkSubRow(index, indexs, e) {
      let data = this.thaArrayLabel[index].items[indexs];
      data.checked = !data.checked;
      let items = this.thaArrayLabel[index].items;
      var filt = _.filter(items, item => {
        if (item.checked == true) {
          return true;
        }
      });
      if (items.length == filt.length) {
        this.thaArrayLabel[index].checked = true;
      } else {
        this.thaArrayLabel[index].checked = false;
      }
      // this.checkAllItems(indexs, data.checked, "row");
    },
    checkRow(index, e, mode) {
      if (mode == "parent") {
        let data = this.thaArrayLabel[index];
        data.checked = !data.checked;
        if (data.items.length > 0) {
          this.checkAllItems(index, data.checked, "parent");
        }
      } else {
        let datas = this.thaArrayEvent[index];
        datas.checked = !datas.checked;
      }
    },
    checkAllItems(index, e, mode) {
      let items = this.thaArrayLabel[index].items;
      if (mode == "parent") {
        _.forEach(items, function(row, idx) {
          items[idx].checked = e;
        });
      }
      var filt = _.filter(items, item => {
        if (item.checked == true) {
          return true;
        }
      });
      if (items.length == filt.length) {
        this.thaArrayLabel[index].checked = true;
      } else {
        this.thaArrayLabel[index].checked = false;
      }
    }
  },
  directives: {
    ClickOutside
  }
};
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-roboto: Roboto;
.md-dropdown-box {
  .text-autocomplete {
    position: absolute;
    z-index: 2001;
    height: 365px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
    overflow-x: hidden;
    font-size: 14px;
    padding-top: 17px;
    .no-data-promo {
      margin-top: 15px;
      text-align: center;
    }
    .md-list {
      padding: 0px;
      .md-list-item {
        color: #5a5a5a;
        padding: 0 0 0 0;
        text-align: left;

        .md-checkbox {
          padding-top: 3px;
          margin: 0px;
        }
        .md-list-item-row {
          display: -webkit-box;
          padding-top: 5px;
          padding-bottom: 5px;
          color: #414141 !important;
          .label {
            font-size: 12px;
            font-family: $font-roboto;
            width: 100px;
            height: 22px;
            color: white;
            font-size: 14px;
            padding-top: 1px;
            margin-top: 3px;
            text-align: center;
            border-radius: 22px;
            margin-right: 16px;
            margin-left: 8px;
            &.gray {
              background: #d1d1d1;
            }
            &.green {
              background: #66bb6a;
            }
            &.red {
              background: #f44336;
            }
            &.yellow {
              background: #fbc02d;
            }
            &.light-red {
              background: #f44336;
              opacity: 0.8;
            }
            &.lighter-red {
              background: #f44336;
              opacity: 0.9;
            }
            &.light-yellow {
              background: #FBC02D;
              opacity: 0.8;
            }
            &.lighter-yellow {
              background: #FBC02D;
              opacity: 0.9;
            }
          }
          .total {
            font-size: 12px;
            color: #adadad;
            font-family: $font-lato;
          }
        }
      }
      .other-title {
        font-family: $font-lato;
        font-size: 16px;
        color: #414141;
        padding-left: 22px;
        text-align: left;
        padding-top: 8px;
      }
    }
    .md-list-item-row:hover {
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
</style>
