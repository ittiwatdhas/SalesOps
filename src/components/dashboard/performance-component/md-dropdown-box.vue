<template>
  <div class="md-dropdown-box" @mouseleave="mouseLeave">
    <md-input-container md-theme class="dropdown-box" @click.native="getWidth($event)">
      <md-input
        @click.native="openAutoCom"
        :disabled="disabled"
        @keypress.native="showAutocom = true"
        :placeholder="placeholder"
        v-on:change="filter"
        v-model="txtSearch"
        @focus.native="$event.target.select()"
        readonly
        :class="tempId"
      ></md-input>
      <md-button class="md-icon-button" @click.native="openAutoCom">
        <md-icon style="padding-top:1px" @click.native="openAutoCom">arrow_drop_down</md-icon>
      </md-button>
    </md-input-container>
    <md-card
      class="text-autocomplete"
      v-if="showAutocom"
      :style="{'width' : widthTag +'px','borde':'1px solid #e8e6e6' , 'top' : top +'px'}"
    >
      <div
        style="color:#434343;font-family:roboto;font-size:18px;text-align:left"
        class="pl-25 pt-20"
      >
        <span>
          <b>Sort By</b>
        </span>
      </div>
      <div class="no-data-promo" v-if="data.length == 0 ">
        <span>No data....</span>
      </div>
      <ul class="md-list" v-else>
        <li class="md-list-item" v-for="(item,index) in data" :key="'cg'+index">
          <div class="md-list-item-row" @click="choose(item,index)">
            <div style="long-row" class="pl-25">
              <span v-if="item.code != ''">{{item.code}}&nbsp;:</span>
              <span class="descript" style="font-weight: 100;">{{item.title}}</span>
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
  props: ["value", "placeholder", "data", "disabled"],
  data() {
    let random = Math.random();
    return {
      showAutocom: false,
      cancelSearch: false,
      txtSearch: "",
      widthTag: 0,
      tempId: random + "w",
      top: 0
    };
  },
  methods: {
    mouseLeave: function() {
      if (this.showAutocom == true) {
        this.showAutocom = false;
        this.txtSearch = "";
      }
    },
    getWidth(e) {
      // this.widthTag = e.path[2].offsetWidth;
      this.widthTag =  e.srcElement.clientWidth

      
      // let temp = document.getElementById("search-bycg-blog");
      // temp.scrollIntoView({
      //   behavior: "smooth"
      // });
    },
    openAutoCom(e) {
      this.showAutocom = true;
      let total = window.screen.height - e.pageY;
      if (total < 380) {
        this.top = e.pageY - e.pageY * 0.51;
      } else {
        this.top = e.pageY + 20;
      }
    },
    choose(value, key) {
      this.showAutocom = false;
      // this.txtSearch = value.code + " " + value.title;
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
  width: 100%;
  .md-input {
    cursor: pointer;
  }
  .md-input-container.md-has-value input {
    font-size: 14px;
  }
  .md-input-container {
    height: 36px;
    min-height: 36px;
    margin: 0px;
    padding-top: 0px;
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
    max-height: 280px;
    box-shadow: 4px 0px 14px 0px rgba(0, 0, 0, 0.12);
    border-radius: 7px;
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
        font-family: $font-roboto;
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
}
</style>
