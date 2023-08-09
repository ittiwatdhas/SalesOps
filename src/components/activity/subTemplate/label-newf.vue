<template>
  <div v-if="display" @mouseleave="close">
    <div :id="id" class="context-box" :style="{'top' : top , 'left' : left}">
      <div
        v-for="(rows , idx) in newf_dropdown_data.label"
        :key="'test_'+idx"
        class="context-row"
        v-on:mouseover="mouseOverMom(rows , idx , $event)"
        @click="addLableNewsf({rows : rows, type : 'head'})"
      >
        <div :class="idxMom == idx ? 'context-row-item selected' : 'context-row-item'">
          <md-icon>label</md-icon>
          <label>{{rows.name}}</label>
        </div>
      </div>
    </div>
    <div
      :id="id +'childs'"
      v-if="idxMom != 'default'"
      class="context-box"
      :style="{'top' : optLabel.top , 'left' : optLabel.left}"
    >
      <div v-if="newf_dropdown_data.label[idxMom].name == 'Brand'">
        <div class="context-row-title" @click="addLableNewsf({rows : [], type : 'all_dhas'})">DHAS</div>
        <div
          v-for="(rows , index) in newf_dropdown_data.label[idxMom].item"
          :key="'test_'+index"
          class="context-row"
          @click="addLableNewsf({rows : rows, type : 'sub'})"
        >
          <div class="context-row-item">
            <md-icon>add_circle</md-icon>
            <label>{{rows.name}}</label>
          </div>
        </div>
        <div
          class="context-row-title"
          @click="addLableNewsf({rows : [], type : 'all_comp'})"
        >COMPETTITOR</div>
        <div
          v-for="(rows , index) in newf_dropdown_data.label[idxMom].item"
          :key="rows.name + index"
          class="context-row"
          @click="addLableNewsf({rows : rows, type : 'sub'})"
        >
          <div class="context-row-item">
            <md-icon>add_circle</md-icon>
            <label>{{rows.name}}</label>
          </div>
        </div>
      </div>
      <div v-if="newf_dropdown_data.label[idxMom].name != 'Brand'">
        <div
          v-for="(rows , index) in newf_dropdown_data.label[idxMom].item"
          :key="rows.name + index"
          class="context-row"
          @click="addLableNewsf({rows : rows, type : 'sub'})"
        >
          <div class="context-row-item">
            <md-icon>add_circle</md-icon>
            <label>{{rows.name}}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
  created() {},
  props: {
    id: String,
    top: String,
    left: String,
    display: Boolean
  },
  data() {
    return {
      idxMom: "default",
      optLabel: {
        top: "0px",
        left: "0px",
        display: false
      },
      keepClick: false
    };
  },
  computed: {
    ...mapGetters({
      newf_dropdown_data: "newf_dropdown_data",
      newf_customer_list: "newf_customer_list"
    })
  },
  methods: {
    ...mapActions(["addLableNewsf"]),
    mouseOverMom(rows, idxMom, e) {
      if (this.idxMom != idxMom) {
        this.idxMom = idxMom;
        this.$nextTick(() => {
          let top = e.y;
          let left = e.x;
          let id = document.getElementById(this.id + "childs");
          let idMom = document.getElementById(this.id);
          let largestHeight = window.innerHeight - id.offsetHeight - 25;
          let largestWidth = window.innerWidth - id.offsetWidth - 25;

          if (top > largestHeight) {
            top = largestHeight; 
          }

          if (left > largestWidth) {
            left = largestWidth;
          }
          this.optLabel.left = idMom.offsetLeft + 200 + "px";
          this.optLabel.top = top + "px";
        });
      } else {
        // console.log("-->");
      }
    },

    close: function() {
      this.$emit("close");
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        // add Event Listeners
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
.context-box {
  max-height: calc(100vh - 125px);
  // max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1000;
  position: fixed;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);

  .context-row-title {
    text-align: left;
    padding-left: 20px;
    padding-top: 10px;
    font-size: 14px;
    font-family: Lato;
    color: #727272;
    width: 200px;
    min-height: 40px;
    background: #fff;
  }
  .context-row {
    width: 200px;
    min-height: 40px;
    text-align: left;
    background: #fff;

    .context-row-item {
      padding-left: 20px;
      padding-top: 8px;
      .md-icon {
        margin-right: 5px;
      }
      &.selected {
        color: #fd7f00;
      }
    }
  }
  .context-row-title:hover {
    color: #fd7f00;
    background: #efefef;
    cursor: pointer;
  }
  .context-row:hover {
    color: #fd7f00;
    background: #efefef;
    cursor: pointer;
  }
  &::-webkit-scrollbar {
    height: 5px;
    width: 5px;
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background: #efefef;
    border-radius: 3px;
  }
}
</style>

<style scoped>
.label-menu .menu,
.label-menu .menu .submenu {
  display: block;
  z-index: 2000 !important;
  float: left;
  background: white;
  height: 180px;
}
.label-menu .menu li {
  /* position: relative; */
}
.label-menu .menu li.dropdown:hover > .submenu {
  /* display: none; */
}
.label-menu .menu li a:hover {
  background: #efefef;
  cursor: pointer;
  text-decoration: none;
}

.label-menu .menu .submenu .submenu a:hover {
  font-weight: bold;
}
.label-menu .menu .submenu a:hover .color-icon,
.label-menu .menu .submenu a:hover .color-label {
  color: #fd7f00 !important;
}

.label-menu .dropdown .label-tag:hover {
  background: #fff;
  padding-bottom: 10px;
}
.label-menu .menu .submenu {
  /* display: none; */
}

.label-menu .dropdown,
.label-menu .submenu {
  margin: 0px;
  padding: 0px;
}

.label-menu .submenu {
  position: absolute;
  left: 0px;
  list-style-type: none;
  width: 200px;
  z-index: 1000 !important;
}
.label-menu .submenu li {
  display: block;
}

.label-menu .submenu li a {
  display: block;
  background: #fff;
}

.label-menu .menu .submenu > li.dropdown:hover > .submenu {
  display: block;
  overflow-y: auto;
}

.label-menu .menu .submenu .submenu {
  position: absolute;
  left: 198px;
  /*top: -1px;*/
  /*top: 10px;*/
  display: none;
}

.label-menu .menu .submenu,
.label-menu .menu .submenu .submenu {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
}

.label-menu .submenu li.dropdown > a:after,
.label-menu .submenu li a,
.label-menu .menu li a::before,
.label-menu .menu li.dropdown > a::after {
  margin: 0px;
  padding-left: 22px;
  padding-right: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px !important;
  font-family: Lato;
  color: #727272 !important;
  text-align: left;
  font-style: Regular;
}
.label-menu .dropdown .label-tag {
  padding-right: 12px;
  padding-bottom: 10px;
}

.bgLabel {
  width: 400px;
  position: fixed;
  height: 500px;
  /* overflow-y: hidden; */
  left: 31%;
  z-index: 1px;
  top: 300px;
  z-index: 1000;
}

.sub-menu > li:hover {
  background-color: #00f;
}

.label-menu .menu > li > .submenu > li:hover > a > label,
.label-menu .menu > li > .submenu > li:hover > a > .md-icon {
  color: #fd7f00;
}
</style>