<template>
  <div class="md-promotion-box" @scroll="handleScroll">
    <md-card
      v-for="(item , index) in data"
      :key="'promo-' + item.id"
      @click.native="choose(item , index)"
    >
      <md-card-content
        :style="{'background': item.promo_code == selectCode ? '#FD7F00' : '#f5f5f5'}"
      >
        <div
          class="title"
          style="font-family:kanit;display: -webkit-box;"
          :style="{'color': item.promo_code == selectCode ? '#FFFFFF' : '#5A5A5A'}"
        >
          <md-icon
            :style="{'padding-top':'2px','color': item.promo_code == selectCode ? '#FFFFFF' : '#727272'}"
          >{{iconTag}}</md-icon>
          <div
            style="font-size:12px;
            width:150px;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: block;
            overflow: hidden;
            font-weight: 600;
          "
          >
             {{item.promo_code}} : {{item.promo_name}}
            <md-tooltip md-direction="bottom" class="mds-tooltips"> {{item.promo_code}} : {{item.promo_name}}</md-tooltip>
          </div>
        </div>
            <!-- 'width':'250px',
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis',
            'display': 'block',
            'overflow': 'hidden' -->
          <!-- :style="{'color': item.promo_code == selectCode ? '#FFFFFF' : '#727272',}" -->
        <div
          class="detail"
          :style="{'color': item.promo_code == selectCode ? '#FFFFFF' : 'rgba(0, 0, 0, .87)',}"
        >
          {{item.promo_desc}}
          <!-- <md-tooltip md-direction="bottom" class="mds-tooltips">{{item.promo_desc}}</md-tooltip> -->
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  props: ["value", "data", "iconTag", "selectCode"],
  data() {
    return {};
  },
  methods: {
    handleScroll: function(evt) {
      this.$emit("scroll", evt);
    },
    choose(value, key) {
      if (this.selectCode == value.promo_code) {
        this.$emit("choose", null, key);
      } else {
        this.$emit("choose", value, key);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-roboto: Roboto;
$font-kanit: Kanit;
.md-promotion-box {
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 5px;
  .md-card {
    margin-bottom: 8px;
    width: 100%;
    border-radius: 3px 0px 0px 3px;
    box-shadow: none;
    overflow: hidden;
    .md-card-content {
      height: auto;
      min-height: 80px;
      padding: 10px;
      .title {
        font-weight: bold;
        font-family: $font-roboto;
        font-size: 10px;
      }
      .detail {
        line-height: 16px;
        font-family: $font-kanit;
        font-size: 11px;
      }
      .md-icon {
        min-width: 20px;
        font-size: 17px;
      }
    }
  }
  .md-card :hover {
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

