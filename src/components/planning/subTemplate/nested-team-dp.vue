<template>
  <div class="md-dropdown-box" v-click-outside="mouseLeave">
    <div
      style="width:280px;
            display:-webkit-box;
            cursor:pointer;
            text-align:left;
            margin-bottom:8px"
      @click="openAutoCom"
    >
      <div class="latoFont" style="color: #414141; font-size: 16px !important;">Sales Team {{value}}</div>
      <md-icon style="color:#A8A8A8; font-size: 18px !important; margin-left: 120px;">ic_arrow_drop_down</md-icon>
    </div>
    <md-card class="text-autocomplete" v-if="showAutocom" :style="{'width' : widthTag +'px'}" >
      <div class="no-data-promo" v-if="arr_selectTeam.length == 0 ">
        <span>No data....</span>
      </div>
      <ul class="md-list" v-else>
        <li
          class="md-list-item"
          v-for="(rows , index) in arr_selectTeam"
          :key="'nested-organ-menu'+index"
        >
          <div class="md-list-item-row" @click="chooseRow(index , 'event')">
            <md-checkbox
              v-model="rows.checked"
              @change="checkRow(index,$event , 'event')"
              class="md-primary auto-checkbox pr-10"
          >
            </md-checkbox>
            <div style=" display: -webkit-box !important;padding-top:2px;">
              <div class="kanitFont" style="font-size:14px; margin-right:15px;">{{rows.first_name_en}}</div>
            </div>
          </div>
        </li>
      </ul>
    </md-card>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapGetters, mapActions } from "vuex";
export default {
  create() {},
  computed: {
    ...mapGetters({ arr_selectTeam: "getTeamOrganize" })
  },
  props: {
    value: {}
  },
  data() {
    return {
      showAutocom: false,
      widthTag: 280,
      action: false
    };
  },
  methods: {
    ...mapActions(["selectedTeamOrg"]),
    mouseLeave() {
      this.showAutocom = false;
      if(this.action === true){
        this.$store.dispatch("setLoadSelectTeamStep2", {
            checkLoad: 'changeDP',
            total_page: this.$store.getters.getTotalPage,
            product_keyword: this.$store.getters.product_keyword,
            organize_type: this.$store.getters.options_organize_selected,
            organizes: this.$store.getters.organizes_data,
            product_type: this.$store.getters.options_product_selected,
            products_uncheck: this.$store.getters.products_uncheck,
            product_selected: this.$store.getters.product_selected,
            product_checkall: this.$store.getters.product_checkall,
            viewby: this.$store.getters.getViewById,
            totaltype: this.$store.getters.getTotalType,
            totalfirst: this.$store.getters.getTotalFirst,
            totalsecond: this.$store.getters.getTotalSecond,
            monthfirst: this.$store.getters.getMonthFirst,
            monthsecond: this.$store.getters.getMonthSecond,
            team_select: this.$store.getters.getTeamSelect
          });
      }
    },
    openAutoCom() {
      this.showAutocom = true;
      this.action = true;
    },
    chooseRow(index, mode) {
      let data = this.arr_selectTeam[index];
      data.checked = !data.checked;
    },
    checkRow(index, e, mode) {
      let data = this.arr_selectTeam[index];
      data.checked = !data.checked;
    },
  },

  
  directives: {
      ClickOutside
  },
};
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-kanit: Kanit;
.md-dropdown-box {
  .text-autocomplete {
    position: fixed;
    z-index: 200 !important;
    max-height: 250px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
    overflow-x: hidden;
    font-size: 14px;
    .no-data-promo {
      margin-top: 15px;
      text-align: center;
    }
    .md-list {
      padding: 0px;
      .md-list-item {
        color: #5a5a5a;
        padding: 0 0 0 0;
        text-align: left;
        .md-checkbox {
          padding-top: 3px;
          margin: 0px;
        }
        .md-list-item-row {
          display: -webkit-box;
          padding-left: 22px;
          padding-top: 5px;
          padding-bottom: 5px;
          font-size: 15px;
          font-family: $font-lato;
          color: #414141 !important;
        }
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
