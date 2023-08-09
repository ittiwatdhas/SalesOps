<template>
  <div class="md-auto-focus-box" @mouseleave="mouseLeave">
    <md-input-container md-theme class="search-box" @click.native="getWidth($event)" :id="tempId">
      <!-- <label class="cust_code_input">Customer Code</label> -->
      <md-input
        placeholder="search..."
        :disabled="disabled"
        v-on:change="change"
        v-model="displayValue"
        :class="tempId"
        @focus.native="$event.target.select()"
      ></md-input>
    </md-input-container>
    <md-card
      class="text-autocomplete"
      v-if="showAutocom"
      :style="{'width' : widthTag +'px',
    'top' : optLabel.top , 'left' : optLabel.left}"
    >
      <div class="no-data-promo" v-if="data.length == 0 ">
        <span>No data....</span>
      </div>
      <ul class="md-list" v-else>
        <li class="md-list-item" v-for="(item,index) in data" :key="'cg'+index">
          <div class="md-list-item-row" @click="choose(item,index)">
            <div class="long-row">
              <span v-if="item.code != ''">{{item.code}}&nbsp;</span>
              <span class="descript">{{item.title}}</span>
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
      widthTag: 0,
      tempId: random + "s",
      optLabel: {
        top: "0px",
        left: "0px",
        display: false
      }
    };
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
    mouseLeave: function() {
      if (this.showAutocom == true) {
        this.showAutocom = false;
        this.$emit("mouseleave", false);
      }
    },
    getWidth(e) {
      // this.widthTag = e.path[2].offsetWidth;
      this.widthTag =  e.srcElement.clientWidth

      this.$nextTick(() => {
        let top = e.y;
        let left = e.x;
        let id = document.getElementById(this.tempId);
        let largestHeight = window.innerHeight - id.offsetHeight;
        let largestWidth = window.innerWidth - id.offsetWidth;

        if (top > largestHeight) {
          top = largestHeight;
        }

        if (left > largestWidth) {
          left = largestWidth;
        }
        this.optLabel.top = top + "px";
        this.optLabel.left = left- 0.5% + "px";
      });
    },
    choose(value, key) {
      this.showAutocom = false;
      this.cancelSearch = true;
      this.$emit("choose", value, key);
    },
    change(param) {
      if (param.length > 1) {
        this.cancelSearch = true;
        this.showAutocom = true;
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
    height: 48px !important;
    min-height: 48px !important;
    .md-icon {
      padding: unset;
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
    padding: 5px 0 10px 0;
    overflow-x: hidden;
    font-size: 12px;
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
    margin-bottom: 0px;
    // box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
  }
}
</style>
