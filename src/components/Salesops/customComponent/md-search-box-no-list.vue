<template>
  <div class="md-search-box" @mouseleave="mouseLeave">
    <md-input-container
      md-theme
      class="search-box"
      @click.native="getWidth($event)"
    >
      <!-- <md-button class="md-icon-button">
        <md-icon style="padding-top:1px;">search</md-icon>
      </md-button> -->
      <md-input
        @focus="openAutoCom"
        :placeholder="placeholder"
        v-on:change="filter"
        @focus.native="$event.target.select()"
        v-model="txtSearch"
        :class="tempId"
      ></md-input>
      <md-button class="md-icon-button" v-if="cancelSearch" @click="clear">
        <md-icon style="padding-top:1px">cancel</md-icon>
      </md-button>
    </md-input-container>
  </div>
</template>

<script>
export default {
  create () {},
  props: ['value', 'placeholder', 'data'],
  data () {
    let random = Math.random()
    return {
      cancelSearch: false,
      txtSearch: '',
      widthTag: 0,
      tempId: random + 's'
    }
  },
  methods: {
    mouseLeave: function () {},
    getWidth (e) {
      // this.widthTag = e.path[2].offsetWidth
      this.widthTag =  e.srcElement.clientWidth
    },
    openAutoCom () {},
    choose (value, key) {
      this.txtSearch = value.code + ' ' + value.title
      this.cancelSearch = true
      this.$emit('choose', value, key)
    },
    filter (param) {
      if (param.length > 0) {
        this.cancelSearch = true
        this.$emit('filter', param.trim())
      } else {
        this.cancelSearch = false
        this.$emit('filter', '')
      }
    },
    clear () {
      this.txtSearch = ''
      this.cancelSearch = false
      this.$emit('clear')
    }
  }
}
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-roboto: Roboto;
$font-kanit: Kanit;
.md-search-box {
  width: 100%;
  .md-input-container {
    height: 36px;
    min-height: 36px;
    margin: unset;
    padding: 0px 0px 10px 10px;
    .md-icon {
      padding: unset;
    }
  }
  .md-input-container.md-has-value input {
    font-size: 14px;
    color: #A2A2A2;
  }
  .md-input-container:after {
    content: none;
  }
  & .search-box {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
  }
}
</style>
