<template>
  <div v-show="display" @mouseout.native="hideBlock" v-click-outside="outsideShowCg">
    <div
      class="arrow-left"
      :style="{'position': 'absolute','z-index': '20' , 'bottom':60 +'px', 'left':88+'%'}"
    ></div>
    <div
      class="arrow-left-cover"
      :style="{'position': 'absolute','z-index': '22' , 'bottom':55 +'px', 'left':87.5 +'%'}"
    ></div>
    <md-card
      class="block"
      :style="{'position': 'absolute','z-index': '20' , 'bottom':60 +'px', 'left':70+'%'}"
    >
      <md-card-content>
        <ul class="md-list">
          <li
            class="md-list-item"
            v-for="(item,index) in $store.getters['myorders/chiefsales']"
            :key="'sennto'+index"
          >
            <div class="md-list-item-row" @click="choose(item)">
              <div style="long-row">
                {{item.emp_id}}&nbsp;
                <span class="descript">: {{item.first_name}}&nbsp;&nbsp;{{item.last_name}}</span>
              </div>
            </div>
          </li>
        </ul>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["display"],
  methods: {
    ...mapActions([]),
    choose(value) {
      this.$emit("choose", value);
    },
    outsideShowCg: function(e) {
      if (e.target.className != "md-button md-gray send-to md-theme-default") {
        this.$emit("close", false);
      }
    }
  },
  data() {
    return {};
  },
  components: {},
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }
        }
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-roboto: Roboto;
$font-kanit: Kanit;
.arrow-left {
  box-sizing: border-box;
  border: 0.5em solid black;
  border-color: transparent transparent #ffffff #ffffff;
  transform-origin: 0 0;
  transform: rotate(44deg);
  box-shadow: 0 1.5px 2.5px 0 rgba(0, 0, 0, 0.16);
}
.arrow-left-cover {
  width: 11px;
  height: 11px;
  background: white;
  transform: rotate(44deg);
}

.md-card {
  width: 264px;
  .md-card-content {
    padding: unset;
    .content-txt {
      padding: 10px;
      background: #ffffff;
    }
    &:last-child {
      padding-bottom: unset;
    }
  }
  &.block {
    position: absolute;
    z-index: 31;
    // width: 100%;
    max-height: 400px;
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
  .block::-webkit-scrollbar {
    height: 5px;
    width: 5px;
    background: #f7f7f7;
  }
  .block::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.11);
    border-radius: 5px;
  }
}
</style>
