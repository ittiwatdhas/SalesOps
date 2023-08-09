<template>
  <div class="md-search-box" @mouseleave="mouseLeave">
    <md-input-container md-theme class="search-box" @click.native="getWidth($event)">
      <!-- @focus="openAutoCom" -->
      <!-- @keypress.native="showAutocom = true" -->
      <md-input
      style="padding:0 0 0 10px"
        :placeholder="placeholder"
        v-on:change="filter"
        @focus.native="$event.target.select()"
        :value="value"
        :class="tempId"
        @keypress.native="submit"
        @blur="other"
      ></md-input>
      <md-button class="md-icon-button" v-if="cancelSearch" @click="clear">
        <md-icon style="padding-top:1px">cancel</md-icon>
      </md-button>
        <md-button @click.native="click_search" style="width:20px;margin:0;background-color:#fd7f00 " class="">
        <md-icon style="color:#fff;">search</md-icon>
      </md-button>
    </md-input-container>
  </div>
</template>

<script>
export default {
  create() {},
  props: ["value", "placeholder"],
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
    submit(evt) {
      this.$emit("submit", evt);
    },
    click_search(evt){
      this.$emit("submit", evt);
    },
    other() {
      this.$emit("other");
    },
    mouseLeave: function() {
      if (this.showAutocom == true) {
        this.showAutocom = false;
      }
    },
    getWidth(e) {
      // this.widthTag = e.path[2].offsetWidth;
      this.widthTag =  e.srcElement.clientWidth

    },
    openAutoCom() {
      this.showAutocom = true;
    },
    // submit
    filter(param) {
      if (param.length > 2) {
        this.cancelSearch = true;
        this.$emit("filter", param);
      } else {
        this.cancelSearch = false;
        this.$emit("filter", param);
      }
    },
    clear() {
      this.$emit("clear", "");
      this.txtSearch = "";
      this.cancelSearch = false;
      this.showAutocom = true;
    }
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
  .md-button {
      min-width: 55px;
  }
}
</style>
