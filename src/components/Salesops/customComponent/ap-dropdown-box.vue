<template>
  <div class="md-dropdown-box" @mouseleave="mouseLeave">
    <md-input-container  md-theme class="dropdown-box get_w" @click.native="getWidth($event)">
      <md-input  v-on:change="filter" v-model="displayValue" readonly :class="tempId"></md-input>
      <md-button style="padding: 0 3px;min-width: 1px; margin:0" class="" @click.native="showAutocom = true">
        <md-icon style="padding:0 0 2px 0px">arrow_drop_down</md-icon>
       </md-button>
    </md-input-container>
    <md-card class="text-autocomplete" v-if="showAutocom" :style="{'width' : widthTag +'px'}">
      <div class="no-data-promo" v-if="data.length == 0 ">
        <span>No data....</span>
      </div>
      <ul class="md-list" v-else>
        <li class="md-list-item" v-for="(item,index) in data" :key="'cg'+index">
          <div class="md-list-item-row" @click="choose(item,index)">
            <div style="long-row">
              <!-- <span v-if="item.code != ''">{{item.code}}&nbsp;:</span> -->
              <span :id="'Tripplan_popup_'+item.title"  class="descript">{{item.title}}</span>
            </div>
          </div>
        </li>
      </ul>
    </md-card>
  </div>
</template>

<script>
export default {
  create() {},
  props: ["value", "placeholder", "data"],
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
  data() {
    let random = Math.random();
    return {
      showAutocom: false,
      cancelSearch: false,
      widthTag: 0,
      tempId: random + "w"
    };
  },
  methods: {
    mouseLeave: function() {
      if (this.showAutocom == true) {
        this.showAutocom = false;
      }
    },
    getWidth(e) {
      // this.widthTag = e.path[2].offsetWidth;
      this.widthTag =  document.getElementById('get_w').offsetWidth
    },
    openAutoCom() {
      this.showAutocom = true;
    },
    choose(value, key) {
      this.showAutocom = false;
      if (value.code == "" || value.code == null) {
        this.$emit("input", value.title);
      } else {
        this.$emit("input",  value.title);
      }
      this.cancelSearch = true;
      this.$emit("choose", value, key);
    },
    filter(param) {
      if (param.length > 2) {
        this.cancelSearch = true;
        this.$emit("filter", param.trim());
      } else {
        this.cancelSearch = false;
        this.$emit("filter", "");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-roboto: Roboto;
$font-kanit: Kanit;
.md-dropdown-box {
  padding-top:1px;
  width: 100%;
  height: 40px;
  background:#fff ;
  box-shadow: 0px 0px 5px #00000029;
  border-radius: 3px;
  .md-input {
    cursor: pointer;
    font-family: Roboto;
    color:#727272;
    height: 40px;
  }
  .md-input-container.md-has-value input {
    font-size: 14px;
  }
  .md-input-container {
    height: 40px;
    min-height: 40px;
    margin: 0px;
    // padding-top: 5px;
    padding-bottom: 0px; 
    padding-right: 0px;
    padding-left: 20px;
   
    .md-icon {
      padding: unset;
    }
  }
  .md-input-container:after {
    content: none;
   
  }
  .text-autocomplete {
    position: absolute;
    z-index: 31;
    // width: 100%;
    max-height: 250px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
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
        padding-right: 20px;
        padding-left: 20px;
        text-align: left;
      }
      .long-row {
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        overflow: hidden;
      }
      .descript {
        font-family: Roboto;;
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
  & .dropdown-box {
    box-shadow: 0 0 0.8px rgba(0, 0, 0, 0.16);
  }
  .md-input-container{
    padding-top:0px
  }
}
</style>
