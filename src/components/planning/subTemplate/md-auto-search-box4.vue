<template>
  <div class="md-auto-focus-box">
    <div style="display:flex">
      <md-input-container
        md-theme
        class="md-ipt search-box"
        style="margin:0px;min-height:100%;"
        :v-model="value.toLocaleString()"
      >
        <md-input  
          :id="'input'+data.id"
          type='number'
          @keyup.enter.native.prevent="nextTab"
          :value="value.toLocaleString()"
          @focus.native="$event.target.select()"
          :class="tempId"
          :disabled="disabled"
          v-on:change="filter"
        ></md-input>
      </md-input-container>
    </div>
  </div>
</template>

<script>
export default {
  create () {},
  props: ['value', 'placeholder', 'data', 'disabled'],
  data () {
    let random = Math.random()
    return {
      showAutocom: false,
      cancelSearch: false,
      txtSearch: '',
      widthTag: 0,
      tempId: random + 's'
    }
  },
  methods: {
   
    nextTab (e) {
      // document.getElementById((e.target.id+1)).focus()
      // if (e != '') {
      //   let evt = e ? e : window.event
      //   var charCode = e.which ? e.which : e.keyCode
      //   if (charCode == 13) {
      //     var el =
      //       e.target.parentElement.parentElement.parentElement.parentElement
      //     if (
      //       typeof el.nextSibling.childNodes[0].childNodes[6] != 'undefined'
      //     ) {
      //       console.log(el.nextSibling.childNodes[0].childNodes[6].childNodes[0].childNodes[0])
      //       // el.nextSibling.childNodes[0].childNodes[6].childNodes[0].childNodes[0].focus()
      //     }
      //   }
      // }

      // this.showAutocom = true
    },

    getWidth (e) {
      // this.widthTag = e.path[2].offsetWidth
      this.widthTag =  e.srcElement.clientWidth

    },
    choose (value, key) {
      this.showAutocom = false
      this.cancelSearch = true
      this.$emit('choose', value, key)
    },
    filter (param) {
      if (param.length > 0) {
        // this.cancelSearch = true;
        // this.showAutocom = true;
        this.$emit('filter', param.trim())
      } else {
         
      }
    },
    clear () {
      this.txtSearch = ''
      this.cancelSearch = false
      // this.showAutocom = true
      this.$emit('clear')
    }
  }
}
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-roboto: Roboto;
$font-kanit: Kanit;
.md-auto-focus-box {
  width: 100%;
  .md-input-container {
    padding:0;
    .md-icon {
      padding: unset;
    }
    .input {
      // height: 45px;
    }
  }
  .md-input-container:after {
    background-color: #fd7f00;
  }

  .text-autocomplete {
    max-height: 180px;
    z-index: 100;
    position: fixed;
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
        padding-right: 10px;
        padding-left: 10px;
      
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
  .md-input-container input {
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    font-size: 14px;
    text-align: right;
  }
}
</style>
