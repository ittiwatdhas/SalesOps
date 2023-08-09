<template>
  <div class="md-dropdown-box" v-click-outside="mouseLeave">
    <div
      style="width:350px;
            display:-webkit-box;
            cursor:pointer;
            text-align:left;
            margin-bottom:8px"
      @click="openAutoCom"
    >
      <div class="latoFont -font-15" style="color: #414141">View by {{value}}</div>
      <md-icon style="color:#A8A8A8; font-size: 18px !important; ">ic_arrow_drop_down</md-icon>
    </div>
    <md-card class="text-autocomplete" v-if="showAutocom" :style="{'width' : widthTag +'px'}">
      <div class="no-data-promo" v-if="arr_selectView.length == 0 ">
        <span>No data....</span>
      </div>
      <ul class="md-list" v-else>
        <li
          class="md-list-item"
          v-for="(rows , index) in arr_selectView"
          :key="'nested-organ-menu'+index"
        >
          <div class="md-list-item-row -font-15" @click="organSelected(rows)">
            <span>{{rows.name}}</span>
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
    ...mapGetters({ arr_selectView: "viewby" })
  },
  props: {
    value: {}
  },
  data() {
    return {
      showAutocom: false,
      widthTag: 350
    };
  },
  methods: {
    ...mapActions(["selectedViewBy"]),
    mouseLeave() {
      this.showAutocom = false;
    },
    openAutoCom() {
      this.showAutocom = true;
    },
    organSelected(rows) {
      if (this.$store.getters.getViewById != rows.id) {
        this.$store.dispatch("selectedViewBy", rows);
        this.showAutocom = false;
        this.$store.dispatch("getSumMainService2", {
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
    }
  },
  directives: {
    ClickOutside
  }
};
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-kanit: Kanit;
.md-dropdown-box {
  .text-autocomplete {
    position: absolute;
    z-index: 31;
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

        .md-list-item-row {
          padding-left: 22px;
          padding-top: 10px;
          padding-bottom: 10px;
          font-size: 18px;
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
