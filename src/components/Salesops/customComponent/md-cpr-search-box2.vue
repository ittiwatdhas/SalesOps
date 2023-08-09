<template>
  <div class="md-search-box">
    <md-input-container md-theme class="search-box" @click.native="getWidth($event)">
      <md-button class="md-icon-button">
        <md-icon style="padding-top:1px;">search</md-icon>
      </md-button>
      <md-input
        :placeholder="placeholder"
        v-on:change="filter"
        :class="tempId"
      ></md-input>
    </md-input-container>
  
  </div>
</template>

<script>
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
      tempId: random + "s"
    };
  },
  methods: {
    mouseLeave: function() {
      if (this.showAutocom == true) {
        this.showAutocom = false;
        this.cancelSearch = false;
        this.txtSearch = "";
      }
    },
    getWidth(e) {
      // this.widthTag = e.path[2].offsetWidth;
      this.widthTag =  e.srcElement.clientWidth
    },
    openAutoCom() {
      this.showAutocom = true;
    },
    choose(value, key) {
      this.showAutocom = false;
      this.txtSearch = value.customer_code + " " + value.customer_name_th;
      this.cancelSearch = true;
      this.$emit("choose", value, key);
    },
    filter(param) {
      if (param.length > 0) {
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
  }
};
</script>
<style lang="scss" scoped>

$font-lato: Lato;
$font-roboto: Roboto;
$font-kanit: Kanit;
.md-search-box {
  width: 100%;
  height: 82%;
  .md-input-container {
    height: 100%;
    margin: 0px;
    padding-top: 0px;
    padding-bottom: 2px;
    padding-right: 0px;
    padding-left: 8px;
    border: 1px solid #D1D1D1;
    border-radius: 4px;
    
    .md-icon {
      padding: unset;
    }
    padding-top:5px ;
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
    padding: 3px 0 10px 0;
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
