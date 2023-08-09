<template>


  <div class="md-bysalesman-list">
    <!-- <div class="title-line">BY SALESMAN</div> -->
    <div>
      <div
        v-if="data.length > 0"
        v-for="(row , index) in data"
        :key="'bygroup-list'+index"
        @click="selected(row , index , 'row')"
        :id="id + row.code"
      >
        <div :class="row.checked ? 'detail-line selected' :'detail-line normal'">
          <!-- :class="rowSelected == index ? 'detail-line selected' :'detail-line normal'" -->
          <div :class="'status-circle '+ row.status"></div>
          <div v-if="checkbox">
            <md-icon class="ic-checked" v-if="row.checked">check_circle</md-icon>
            <md-icon class="ic-unchecked" v-else>brightness_1</md-icon>
          </div>
          <div class="text-line">{{row.code}} {{row.full_name}}</div>
        </div>
        <div v-if="data.length == 0" :class="'detail-line normal'">
          <span style="color:#a8a8a8;">No Salesman</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  create() {},
  props: ["data", "checkbox", "id"],
  data() {
    return {
      rowSelected: "-"
    };
  },
  methods: {
    selected(row, index, type) {
      //this.rowSelected = index;
      if (type == "row") {
        let mode = row.checked ? false : true;
        this.$emit("selected", row, index, mode);
      } else {
        this.$emit("selected", row, index, type);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-roboto: Roboto;
$font-kanit: Kanit;

.md-bysalesman-list {
  width: 100%;
  height: 495px;
  .title-line,
  .detail-line {
    
    font-family: $font-lato;
    width: 100%;
    border-radius: 4px;
    text-align: left;
    padding-left: 15px;
  
  }
  .title-line {
    background: #efefef;
    height: 20px;
    color: #a8a8a8;
    font-size: 10px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .detail-line {
    
    // display: -webkit-box;
    display: flex;
    margin-bottom: 2px;
    // height: 40px;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-right: 10px;
    padding-left: 19px;
    .md-icon {
      margin-right: 15px;
      &.ic-checked {
        color: #fd7f00;
      }
      &.ic-unchecked {
        font-size: 26px;
        color: #efefef;
      }
    }
    .text-line {
      // white-space: nowrap;
      // text-overflow: ellipsis;
      // display: block;
      padding-top: 3px;
      font-family: $font-kanit;
      color: #767676;
    }
    .md-search-checkbox {
      .md-checkbox {
        margin: 0px;
      }
    }
    .status-circle {
      height: 12px;
      width: 12px;
      border-radius: 8px;
      margin-right: 15px;
      margin-top: 7px;
      &.inactive {
        background: #f44336;
      }
      &.issue {
        background: #fbc02d;
      }
      &.active {
        background: #66bb6a;
      }
    }
    &.normal {
      background: #fefefe;
    }
    &.selected {
      background: #f7f7f7;
    }
  }
  .detail-line:hover {
    background: #f7f7f7;
    cursor: pointer;
  }
}
</style>
