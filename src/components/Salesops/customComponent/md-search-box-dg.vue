<template>
  <div class="md-search-box" v-click-outside="mouseLeave">
    <md-input-container md-theme class="search-box" @click.native="getWidth($event)">
      <md-button class="md-icon-button">
        <md-icon style="padding-top:1px;">search</md-icon>
      </md-button>
      <md-input
        @keypress.native="showAutocom = true"
        @focus="openAutoCom"
        :placeholder="placeholder"
        v-on:change="filter"
        @focus.native="$event.target.select()"
        v-model="txtSearch"
        :class="tempId"
      ></md-input>
      <md-button class="md-icon-button" v-if="cancelSearch" @click="clear">
        <md-icon style="padding-top:1px">cancel</md-icon>
      </md-button>
    </md-input-container>
    <md-card
      class="text-autocomplete"
      v-if="showAutocom"
      :style="{'width' : widthTag +'px' , 'bottom' : bottom +'px'}"
    >
      <div class="no-data-promo" v-if="data.length == 0 ">
        <span>No data....</span>
      </div>
      <ul class="md-list" v-else>
        <li class="md-list-item" v-for="(item,index) in data" :key="'cg'+index">
          <div class="md-list-item-row" @click="choose(item,index)">
            <div class="long-row">
              <span v-if="item.code != ''">{{item.code}}&nbsp;:</span>
              <span class="descript">{{item.title}}</span>
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
  props: ["value", "placeholder", "data"],
  data() {
    let random = Math.random();
    return {
      showAutocom: false,
      cancelSearch: false,
      txtSearch: "",
      widthTag: 0,
      // bottom: 107,
      bottom:120,
      tempId: random + "s",
      keepWidth: ""
    };
  },
  methods: {
    mouseLeave() {
      if (this.showAutocom == true) {
        this.showAutocom = false;
        this.cancelSearch = false;
        this.txtSearch = "";
      }
    },
    getWidth(e) {
      this.keepWidth = e;
      // this.widthTag = e.path[2].offsetWidth;
    },
    openAutoCom() {
      this.showAutocom = true;
    },
    choose(value, key) {
      this.showAutocom = false;
      this.txtSearch = '';
      // this.txtSearch = value.code + " " + value.title;
      this.cancelSearch = false;
      this.$emit("choose", value, key);
    },
    filter(param) {
      // console.log(this.keepWidth.x);
      // this.bottom = this.keepWidth.x

      this.widthTag = this.keepWidth.path[2].offsetWidth;
      if (param.length > 2) {
        this.cancelSearch = true;
        this.$emit("filter", param.trim());
      } else {
        this.cancelSearch = false;
        this.$emit("filter", "");
      }
    },
    clear() {
      this.txtSearch = "";
      this.cancelSearch = false;
      this.showAutocom = true;
      this.$emit("clear");
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
$font-kanit: Kanit;
.md-search-box {
  width: 100%;
  .md-input-container {
    height: 36px;
    min-height: 36px;
    margin: unset;
    padding: unset;
    .md-icon {
      padding: unset;
    }
  }
  .md-input-container.md-has-value input {
    font-size: 14px;
  }
  .md-input-container:after {
    content: none;
  }
  .text-autocomplete {
    z-index: 31;
    position: absolute;
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
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
  }
}
</style>
