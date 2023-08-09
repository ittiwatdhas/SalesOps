<template>
  <div class="md-auto-focus-box" v-click-outside="mouseLeave">
    <div style="display: -webkit-box;">
      <md-input-container
        md-theme
        class="search-box"
        @click.native="getWidth($event)"
        style="width:100%"
      >
        <label class="cust_code_input">Search Customer</label>
        <md-input
        style="padding:10px 0 0px 0"
          :disabled="disabled"
          v-on:change="change"
          v-model="displayValue"
          @keypress.native="keypress"
          :class="tempId"
          @focus.native="$event.target.select()"
        ></md-input>
      </md-input-container>
      <div v-if="cancelSearch" @click="iconclick" style="cursor:pointer;padding:30px 100px 0 0 ">
        <!-- <md-tooltip md-direction="top">close</md-tooltip> -->
         <md-icon
          :style="{'font-size':'22px','color':disabled ?'rgb(168, 168, 168)':'#fd7f00','padding-left':'2px'}"
        >close</md-icon>
      </div>
    </div>
    <md-card class="text-autocomplete" v-if="showAutocom" :style="{'width' : widthTag +'px'}">
      <div class="auto-com-spinner">
        <md-spinner :md-size="65" :md-stroke="1" v-show="loading" md-indeterminate></md-spinner>
        <div
          v-if="data.length == 0 && !loading"
          style="margin-top: 15px;color:rgba(0, 0, 0, 0.54);font-size:14px"
        >No data....</div>
      </div>
      <ul class="md-list">
        <li class="md-list-item" v-for="(item,index) in data" :key="'cg'+index">
          <div class="md-list-item-row" @click="choose(item,index)">
            
            <div class="long-row">
              <span v-if="item.customer_code != ''">{{item.customer_code}}&nbsp;:</span>
              <span class="descript">{{item.customer_name}}</span>
            </div>
          </div>
        </li>
      </ul>
    </md-card>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
export default {
  create() {},
  props: ["value", "placeholder", "data", "disabled", "loading"],
  data() {
    let random = Math.random();
    return {
      showAutocom: false,
      cancelSearch: false,
      widthTag: 0,
      tempId: random + "s"
    };
  },
  directives: {
    ClickOutside
  },
  computed: {
    displayValue: {
      get: function() {
        return this.value;
      },
      set: function(modifiedValue) {
        this.$emit("input", modifiedValue);
      }
    }
  },
  methods: {
    keypress(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode == 13) {
        this.cancelSearch = true;
        // this.showAutocom = true;
        this.$emit("keypress", evt);
      }
    },
    iconclick() {
        this.$emit("iconclick");
        this.cancelSearch = false
    
    },
    mouseLeave() {
      this.showAutocom = false;
      this.$emit("mouseleave", false);
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
    change(param) {
      if (param.length > 2) {
        this.cancelSearch = true;
        // this.showAutocom = true;
        this.$emit("change", param.trim());
      } else {
        this.cancelSearch = false;
        this.$emit("change", "");
        this.showAutocom = false;
      }
    },
    clear() {
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

   font-family: Roboto;
   font-size:14px;
   color: #00000061;
    height: 50px;
    min-height: 50px;
    .md-icon {
    
    }
  }
  .md-input-container.md-has-value input {
    font-size: 14px;
    font-family: $font-kanit;

    
  }
  .text-autocomplete {
    z-index: 31;
    position: absolute;
    max-height: 200px;
    min-height: 100px;
    padding: 5px 0 10px 0;
    overflow-x: hidden;
    font-size: 14px;
    .no-data-promo {
      margin-top: 15px;
      text-align: center;
    }
    .auto-com-spinner {
      position: absolute;
      left: 30%;
      top: 10%;
      z-index: 1000;
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
        padding-right: 20px;
        padding-left: 20px;
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
  }
}
</style>
