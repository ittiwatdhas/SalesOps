<template>
  <div class="md-search-checkbox" v-click-outside="mouseLeave">
    <!-- <div class="md-search-checkbox" @mouseleave="mouseLeave"> -->
    <md-input-container  id="w-12" md-theme class="search-box" @click.native="getWidth($event)">
      <md-button class="md-icon-button" @click="openAutoCom">
        <md-icon style="padding-top:1px;">add</md-icon>
      </md-button>
      <!--@keypress.native="showAutocom = true"-->
      <md-input
        style="padding:0 0 0 10px;"
        @focus="openAutoCom"
        :placeholder="placeholder"
        v-on:change="filter"
        v-model="txtSearch"
        :class="tempId"
        :disabled="disabled"
        @keypress.native="submit"
        @focus.native="$event.target.select()"
        @keydown.tab.prevent.native="nextFocus_s('search_next')"
      ></md-input>
      <!-- <md-button class="md-icon-button" v-if="cancelSearch" @click="clear">
        <md-icon style="padding-top:1px" class="clearSearch-auto">cancel</md-icon>
      </md-button> -->
      <!-- <md-button style="min-width:55px; margin:0;background-color:#fd7f00 " class="" @click.native="submit"> -->
        <md-button  :class="disabled ? '-gray-A8' : '-orange'"   :disabled="disabled" style="min-width:55px; margin:0;background-color:#fd7f00 " class="" @click.native="submit">
        <md-icon style="color:#fff;padding-top:0px;">add</md-icon>
      </md-button>
    </md-input-container>
    <md-card class="text-autocomplete" v-if="showAutocom" :style="{'width' : widthTag +'px'}">
      <!-- <div class="no-data-promo">
            <span  v-if="data.length == 0 ">No data....</span>
            <span  v-else>No data....</span>
      </div>-->
      <ul class="md-list">
        <div class="auto-com-spinner">
          <md-spinner
            :md-size="65"
            :md-stroke="1"
            v-show="$store.getters['myorders/spinner_loading']"
            md-indeterminate
          ></md-spinner>
          <div
            v-if="data.length == 0 && !$store.getters['myorders/spinner_loading']"
            style="margin-top: 15px;color:rgba(0, 0, 0, 0.54);font-size:14px"
          >No data....</div>
        </div>
        <li class="md-list-item" v-for="(rowCg,indexCg) in data" :key="'cg'+indexCg">
          <div
            class="md-list-item-row"
            @click="chooseCG(rowCg , indexCg)"
            style="padding-left: 12px;background:#EFEFEF"
          >
            <input
              type="checkbox"
              v-model="rowCg.checked"
              style="height: 20px;width: 20px;"
            />
              <!-- @change="checkAllCg(rowCg,indexCg,$event)" -->
            <div class="long-row" style="padding-top:3px;padding-left:5px">
              {{rowCg.code}}&nbsp;
              <span class="descript">: {{rowCg.title}}</span>
            </div>
          </div>
          <div
            class="md-list-item-row"
            v-for="(rowIt,indexIt) in rowCg.items"
            :key="'its'+indexIt"
            @click="chooseItem(rowIt,indexIt,indexCg)"
            style="padding-left: 25px;"
          >
            <div>
              <input
                type="checkbox"
                v-model="rowIt.checked"
                style="height: 20px;width: 20px;"
              />
                <!-- @change="checkItem(rowIt,indexIt,indexCg,$event)" -->
            </div>
            <div style="width:100%;display:flex">
              <div
                class="long-row"
                :style="{'padding-top':'3px','padding-left':'5px','width':displayFreeGift(rowIt) == ''?'100%':'80%'}"
              >
                <span v-if="rowIt.code!= ''">{{rowIt.code}}&nbsp;:</span>
                <span class="descript">{{rowIt.title}}</span>
              </div>
              <div
                style="color:#f44336;width:20%"
                v-if="displayFreeGift(rowIt) != ''"
              >{{displayFreeGift(rowIt)}}</div>
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
  directives: {
    ClickOutside
  },
  methods: {
    // mouseLeave: function() {
    //   if (this.showAutocom == true) {
    //     this.showAutocom = false;
    //     this.cancelSearch = false;
    //     this.txtSearch = "";
    //   }
    // },
    displayFreeGift(row) {
      if (!_.isUndefined(row.freegift)) {
        return "Free Gift";
      } else {
        return "";
      }
    },
    submit(evt) {
        // console.log(evt)
      evt = evt ? evt : window.event;
      this.$emit("submit", evt);
      var charCode = evt.which ? evt.which : evt.keyCode;
      if(charCode == 13 || evt.type === 'click'){
        this.Enter_next()
        // this.txtSearch = "";
        this.cancelSearch = false;
      }
    
    },
    mouseLeave() {
      if (this.showAutocom == true) {
        this.showAutocom = false;
        this.cancelSearch = false;
        this.txtSearch = "";
        this.$store.commit("myorders/setMasterCG", []);
      }
    },
    checkAllCg(value, key, e) {
      for (let i = 0; i < this.data[key].items.length; i++) {
        this.data[key].items[i].checked = this.data[key].checked;
      }
     
      this.$emit("choosecg", this.data[key]);
    },
    chooseCG(value, key) {
      // console.log('A')
      this.data[key].checked = !this.data[key].checked;
      for (let i = 0; i < this.data[key].items.length; i++) {
        this.data[key].items[i].checked = this.data[key].checked;
      }
      this.$emit("choosecg", this.data[key]);
      // this.Enter_next()
    },
    checkItem(value, key, keyCg, e) {
      let check = [];
      for (let i = 0; i < this.data[keyCg].items.length; i++) {
        if (!this.data[keyCg].items[i].checked) {
          check.push(this.data[keyCg].items[i].code);
        }
      }

      if (!e) {
        this.data[keyCg].checked = false;
      } else if (check.includes(value.code) && check.length == 1) {
        this.data[keyCg].checked = true;
        
      }
      // value.checked = e;
      this.$emit("chooseitem", value, key);
      // this.Enter_next()
    },
    chooseItem(value, key, keyCg) {
      let item = this.data[keyCg].items[key];
      item.checked = !item.checked;
      if (this.data[keyCg].checked == true && item.checked == false) {
        
        this.data[keyCg].checked = false;
      } else {
        let check = false;
        for (let i = 0; i < this.data[keyCg].items.length; i++) {
          if (!this.data[keyCg].items[i].checked) {
            check = true;
            break;
          }
        }
        if (check == false && this.data[keyCg].checked == false) {
          this.data[keyCg].checked = true;
        }
        this.Enter_next();
      }

      this.$emit("chooseitem", value, key);
     
    },
    getWidth(e) {
      // this.widthTag = e.path[2].offsetWidth;
      this.widthTag =  document.getElementById('w-12').offsetWidth
    },
    openAutoCom() {
      if (!this.disabled && this.txtSearch.length > 0) {
        this.showAutocom = true;
      }
    },
    filter(param) {
      if (param.length > 2) {
        this.showAutocom = true;
        this.cancelSearch = true;
        this.$emit("filter", param.trim());
      } else {
        this.showAutocom = false;
        this.cancelSearch = false;
        this.$emit("filter", "");
      }
    },
    clear() {
      this.txtSearch = "";
      this.cancelSearch = false;
      this.showAutocom = true;
      this.$emit("clear");
    },
    Enter_next(){
       setTimeout(() => {
        //  console.log('test',this.$store.getters['myorders/master_cg'].length)
         if(this.item_order.length!=0){
          if(this.$store.getters['myorders/master_cg'].length == 1 ){
            if(typeof(this.$store.getters['myorders/master_cg'][0].items != "undefined")){
               if(this.$store.getters['myorders/master_cg'][0].items.length == 1 ){
              this.showAutocom = false;
              this.txtSearch = "";
              this.$emit("nextFocus", this.item_order.length);
            }
            }
             
          }
         }
        // this.nextFocus_s('search_next')
        }, 800); 
    },
    nextFocus_s(param){
      // console.log('A')
      this.showAutocom = false
      this.$emit("nextFocus", -1);  
    }
  },
  watch: {
    item_order(value) {
       setTimeout(() => {
          // console.log('watch=>',value.length)
        // this.nextFocus_s('search_next')
        }, 150);
    }
  },
    computed: {
      item_order () {
      return this.$store.getters['myorders/items_order']
    },
    }
};
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-roboto: Roboto;
$font-kanit: Kanit;
.md-search-checkbox {
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
    min-height: 90px;
    max-height: 250px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
    padding: 5px 0 10px 0;
    overflow-x: hidden;
    font-size: 12px;
    .no-data-promo {
      margin-top: 15px;
      text-align: center;
    }
    .auto-com-spinner {
      position: absolute;
      left: 40%;
      top: 10%;
      z-index: 1000;
    }
    .md-list-item {
      color: #5a5a5a;
      padding: 0 0 0 0;
      font-family: $font-roboto;
      .md-checkbox {
        margin: unset;
      }
      .md-list-item-row {
        padding-top: 3px;
        display: flex;
        font-family: $font-lato;
        padding-bottom: 3px;
        padding-right: 20px;
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
    .md-list-item-row:hover {
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