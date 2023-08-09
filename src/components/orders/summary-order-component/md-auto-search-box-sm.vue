<template>
  <div class="md-auto-focus-box" @mouseleave="mouseLeave">
    <div style="display:flex">
      <md-input-container
        md-theme
        class="md-ipt search-box"
        style="margin:0px;min-height:100%;"
        @click.native="getWidth($event)"
        v-model="value"
      >
        <!-- <md-icon style="padding-right:5px;color: #000000; opacity:0.54">search</md-icon> -->
        <label style="font-size:11px;color: #000000; opacity:0.38">{{placeholder}}</label>
        <md-input
          id="orderhis_input_salesman"
          @keyup.enter.native.prevent="nextTab"
          :value="value"
          @focus.native="$event.target.select()"
          :class="tempId"
          :disabled="disabled"
          v-on:change="filter"
        ></md-input>
        <md-tooltip
          md-direction="bottom"
          class="mds-tooltips"
          v-if="displayTooltip(value)"
        >{{ value }}</md-tooltip>
      </md-input-container>
    </div>
    <md-card class="text-autocomplete" v-if="showAutocom" :style="{'width' : widthTag +'px'}">
      <div class="no-data-promo" v-if="data.length == 0 ">
        <span>No data....</span>
      </div>
      <ul class="md-list" v-else>
        <li class="md-list-item" v-for="(item,index) in data" :key="'cg'+index">
          <div class="md-list-item-row" @click="choose(item,index)">
            <div class="long-row">
              {{item.code}}
              &nbsp;
              <span
                class="descript"
                v-if="item.title != ''"
              >: {{item.title}}</span>
            </div>
          </div>
          <md-tooltip md-direction="bottom" class="mds-tooltips">{{ item.code }} : {{ item.title }}</md-tooltip>
        </li>
      </ul>
    </md-card>
  </div>
</template>

<script>
export default {
  create() {},
  props: ["value", "placeholder", "data", "disabled"],
  data() {
    let random = Math.random();
    return {
      showAutocom: false,
      cancelSearch: false,
      txtSearch: "",
      widthTag: 0,
      tempId: random + "s"
    };
  },
  methods: {
    displayTooltip(val) {
      if (_.trim(val).length == 0) {
        return false;
      } else {
        return true;
      }
    },
    nextTab() {
      this.showAutocom = true;
    },
    mouseLeave: function() {
      if (this.showAutocom == true) {
        this.showAutocom = false;
        this.txtSearch = "";
      }
    },
    getWidth(e) {
      // this.widthTag = e.path[2].offsetWidth;
      this.widthTag =  e.srcElement.clientWidth

    },
    choose(value, key) {
      this.showAutocom = false;
      this.cancelSearch = true;
      this.$emit("choose", value, key);
    },
    filter(param) {
      if (param.length > 1) {
        //   this.cancelSearch = true;
        //   this.showAutocom = true;
        this.$emit("filter", param.trim());
      } else {
        //   this.cancelSearch = false;
        this.$emit("filter", "");
        //   this.showAutocom = false;
      }
    },
    clear() {
      this.txtSearch = "";
      this.cancelSearch = false;
      this.showAutocom = true;
      this.$emit("clear");
    }
  }
};
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-roboto: Roboto;
$font-kanit: Kanit;
.md-auto-focus-box {
  width: 100%;
  .md-input-container {
    .md-icon {
      padding: unset;
    }
  }
 
  
  // .md-input-container.md-has-value input {
  //   font-size: 14px;
  //   font-family: $font-kanit;
  //   color: #414141;
  //   font-weight: 400;
  // }
  .text-autocomplete {
    z-index: 100;
    position: fixed;
    max-height: 200px;
    // box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
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
        padding-right: 10px;
        padding-left: 10px;
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
  & .search-box {
    margin-bottom: 0px;
    // box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
  }
  .md-input-container input {
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    font-size: 14px;
  }
}

</style>
