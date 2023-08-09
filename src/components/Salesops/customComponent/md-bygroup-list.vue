<template>
  <div class="md-bygroup-list">
    <!-- <div class="title-line">BY GROUP</div> -->
    <div>
      <div
        v-for="(row , index) in data"
        :key="'bygroup-list'+index"
        @click="selected(row , index , 'row')"
      >
        <div :class="row.checked ? 'detail-line selected' :'detail-line normal'">
          <!-- :class="rowSelected == index ? 'detail-line selected' :'detail-line normal'" -->
          <div class="md-search-checkbox" v-if="checkbox" style="width: 35px;">
            <md-checkbox
              class="md-primary pr-15"
              v-model="row.checked"
              @change="selected(row , index , $event)"
            ></md-checkbox>
          </div>
          <div
            class="text-line"
          >{{row.full_name}}</div>
            <!-- style="max-width: 300px;" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  create() {},
  props: ["data", "checkbox"],
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
.md-bygroup-list {
  width: 100%;
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
    padding-top: 9px;
    .text-line {
      color: #767676;
      font-family: $font-kanit;
    }
    .md-search-checkbox {
      .md-checkbox {
        margin: 0px;
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
