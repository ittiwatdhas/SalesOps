<template>
  <div class="ml-per24 step1">
    <md-list class="bg-mdlist" md-align="center">
      <md-list-item @click="expandLIst(0)">
        <span class="-font-16 latoFont">Select Organizational Level</span>
        <md-list-expand>
          <md-layout>
            <md-layout class="expand-level"></md-layout>
            <md-layout md-flex="100">
              <md-layout md-gutter>
                <md-layout md-flex-small="70" class="ml-30 mr-30">
                  <div class>
                    <md-checkbox
                      class="md-warn-mo"
                      :value.sync="chkhead_sales"
                      @change="checkAllSales($event)"
                    ></md-checkbox>
                  </div>
                  <md-select
                    :value.sync="options_organize_selected"
                    :change="getDataOrganize"
                    class="pl-20 mt-8 width-per80"
                  >
                    <md-option
                      v-for="items in arr_lavel_sales"
                      v-bind:value="items.id"
                      @selected="selectSales(items)"
                      :key="items.id"
                    >
                      <label class="-font-16 latoFont">{{items.name}}</label>
                    </md-option>
                  </md-select>
                </md-layout>
                <md-layout md-flex-small="25" class="pr-20 mt-8">
                  <md-input-container class="-no-line -searchPer mt-0 mb-10 width-per100">
                    <!--position: unset;-->
                    <md-icon>search</md-icon>
                    <md-input
                      class="-font-14 latoFont"
                      :placeholder="bd.holder_searchSales"
                      v-on:change="searchSalesMan"
                      v-model="bd.txtSerchSales"
                    ></md-input>
                  </md-input-container>
                </md-layout>
                <md-layout md-flex-small="100">
                  <md-layout class="mh-24 mt-10 mb-20 expand-line"></md-layout>
                </md-layout>
              </md-layout>
            </md-layout>
            <div class="container scrollbar pl-0" id="style-scrollbar" v-on:scroll="scrollFunction">
              <transition-group tag="div" name="fade">
                <div class="box" v-for="item in arr_sales" :key="item.emp_id">
                  <md-layout>
                    <!-- <md-layout  md-column md-gutter style=" height:60px"> -->
                    <md-layout md-flex="60" md-align="start">
                      <md-layout class="mr-18" md-flex="20" md-align="start">
                        <md-checkbox
                          class="md-warn-mo"
                          :id="item.emp_id"
                          :name="item.emp_id"
                          v-model="item.checked"
                          @change="checkChildSales(item.emp_id,$event)"
                        ></md-checkbox>
                      </md-layout>
                      <md-layout md-flex="30" class="pl-10">
                        <div class="font-bold">
                          <span class="md-display -font-14 -gray-41 latoFont">{{item.emp_id}}</span>
                        </div>
                        <div class="width-150">
                          <span
                            class="md-display defaultCls -list-block -font-14 latoFont -gray-72"
                          >{{item.first_name_en}}</span>
                          <md-tooltip
                            md-direction="top"
                            class="-font-14 latoFont font-weight100"
                          >{{item.first_name_en}}</md-tooltip>
                        </div>
                      </md-layout>
                    </md-layout>
                  </md-layout>
                </div>
              </transition-group>
              <div class="box" v-if="arr_sales.length%2 !=0">
                <md-layout class="ml-10 height-60" md-column md-gutter>
                  <md-layout md-flex="60" md-align="start">
                    <md-layout class="mr-18" md-flex="20" md-align="start">
                      <div></div>
                    </md-layout>
                    <md-layout md-flex="30" class="pl-10">
                      <div class="font-bold">
                        <span class="md-display -font-14 -gray-41 latoFont"></span>
                      </div>
                      <div class="width-150">
                        <span class="md-display defaultCls -list-block -font-14 latoFont -gray-72"></span>
                        <md-tooltip md-direction="top" class="-font-14 latoFont font-weight100"></md-tooltip>
                      </div>
                    </md-layout>
                  </md-layout>
                </md-layout>
              </div>
            </div>
            <md-layout md-align="end" md-gutter="16" class="pr-20 pt-0 pb-15">
              <md-layout md-flex="33" md-align="end">
                <md-button
                  @click="toggleExpandList"
                  class="md-raised -orange mh-0 width-per20 height-40"
                >
                  <label class="md-display -font-14 latoFont">NEXT</label>
                </md-button>
              </md-layout>
            </md-layout>
          </md-layout>
        </md-list-expand>
      </md-list-item>
      <div class="space-list"></div>
      <md-list-item @click="expandLIst(1)">
        <span class="-font-16 latoFont">Select Product Org</span>
        <md-list-expand>
          <md-layout>
            <md-layout class="expand-level"></md-layout>
            <md-layout md-flex="100">
              <md-layout md-gutter>
                <md-layout md-flex-small="70" class="ml-30 mr-30">
                  <div class>
                    <md-checkbox
                      class="md-warn-mo"
                      :value.sync="product_checkall"
                      @change="checkAllProd($event)"
                    ></md-checkbox>
                  </div>
                  <md-select
                    :value.sync="options_product_selected"
                    @change="getDataProduct"
                    class="pl-20 mt-8 width-per80"
                  >
                    <md-option
                      v-for="items in options_product"
                      v-bind:value="items.id"
                      @selected="selectProduct(items)"
                      :key="items.id"
                    >
                      <label class="-font-16 latoFont">{{items.name}}</label>
                    </md-option>
                  </md-select>
                </md-layout>
                <md-layout md-flex-small="25" class="pr-20 mt-8">
                  <md-input-container class="-no-line -searchPer mt-0 mb-10 po-un">
                    <md-icon>search</md-icon>
                    <md-input
                      class="-font-14 latoFont"
                      :placeholder="bd.holder_searchProduct"
                      v-on:change="searchProduct"
                      v-model="bd.txtSerchProduct"
                    ></md-input>
                  </md-input-container>
                </md-layout>
                <md-layout md-flex-small="100">
                  <md-layout class="mh-24 mt-10 mb-20 expand-line"></md-layout>
                </md-layout>
              </md-layout>
            </md-layout>
            <div class="container scrollbar pl-0" id="style-scrollbar" v-on:scroll="scrollFunction">
              <transition-group tag="div" name="fade">
                <div class="box" v-for="item in products" :key="item.id">
                  <md-layout>
                    <!-- <md-layout md-column md-gutter style=" height:60px"> -->
                    <md-layout md-flex="60" md-align="start">
                      <md-layout class="mr-18" md-flex="20" md-align="start">
                        <md-checkbox
                          class="md-warn-mo"
                          :id="item.id"
                          :name="item.name"
                          v-model="item.checked"
                          @change="checkChildProd(item.id,item.name,$event)"
                        ></md-checkbox>
                      </md-layout>
                      <md-layout md-flex="30" class="pl-10">
                        <div class="font-bold">
                          <span class="md-display -font-14 latoFont -gray-41">{{item.id}}</span>
                        </div>
                        <div class="width-150">
                          <span
                            class="md-display defaultCls -list-block -font-14 latoFont -gray-72"
                          >{{item.name}}</span>
                          <md-tooltip
                            md-direction="top"
                            class="-font-14 latoFont font-weight100"
                          >{{item.name}}</md-tooltip>
                        </div>
                      </md-layout>
                    </md-layout>
                  </md-layout>
                </div>
              </transition-group>
              <div class="box" v-if="products.length%2 !=0">
                <md-layout class="ml-10 height-60" md-column md-gutter>
                  <md-layout md-flex="60" md-align="start">
                    <md-layout class="mr-18" md-flex="20" md-align="start">
                      <div></div>
                    </md-layout>
                    <md-layout md-flex="30" class="pl-10">
                      <div class="font-bold">
                        <span class="md-display -font-14 -gray-41 latoFont"/>
                      </div>
                      <div class="width-150">
                        <span class="md-display defaultCls -list-block -font-14 latoFont -gray-72"/>
                        <md-tooltip md-direction="top" class="-font-14 latoFont font-weight100"/>
                      </div>
                    </md-layout>
                  </md-layout>
                </md-layout>
              </div>
            </div>
            <md-layout md-align="end" md-gutter="16" class="pr-20 pt-0 pb-15">
              <md-layout md-flex="33" md-align="end">
                <md-button
                  id="nextStp1"
                  class="md-raised -orange mh-0 width-per20 height-40"
                  @click="setNextStep"
                >
                  <label class="md-display -font-14 latoFont">NEXT</label>
                </md-button>
              </md-layout>
            </md-layout>
          </md-layout>
        </md-list-expand>
      </md-list-item>
    </md-list>
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span>{{txt_warning}}</span>
      <md-button class="md-accent -oranges" @click="confirmAlert">Agree</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
export default {
  created() {
    this.$store.dispatch("initOrganizes");
    this.$store.dispatch("initProducts");
  },
  computed: {
    ...mapGetters({
      arr_sales: "organizes",
      arr_lavel_sales: "options_organize",
      options_organize_selected: "options_organize_selected",
      products: "products",
      options_product: "options_product",
      options_product_selected: "options_product_selected",
      loadProduct: "load_product",
      product_checkall: "product_checkall",
      chkhead_sales: "chkhead_sales"
    }),
    getDataOrganize: function() {
      this.chkHeadSales = true;
      //   let url = "/get-channel-performance";
      //   if (this.$store.getters.options_organize_selected == 2) {
      //     url = "/get-area-performance";
      //   } else if (this.$store.getters.options_organize_selected == 3) {
      //     url = "/get-saleman-performance";
      //   }
      this.$store.dispatch("setOrganizeNull");
      this.$store.dispatch("getDataOrganizesServiceLoadType");
      //   this.$store.dispatch("getDataOrganizesService", url);
      this.bd.txtSerchSales = "";
    }
  },
  data() {
    return {
      login: false,
      loadMore: 2500,
      pageProduct: 1,
      url: "",
      bd: {
        product_name: 1,
        txtSerchSales: "",
        txtSerchProduct: "",
        holder_searchSales: "Filter",
        holder_searchProduct: "Filter"
      },
      keyword: "",
      expandClasses: "",
      productListSearch: this.getProductList(1, 20),
      arrProductChk: [],
      chkHeadSales: true,
      vertical: "bottom",
      horizontal: "center",
      duration: 7000,
      txt_warning: ""
    };
  },
  methods: {
    ...mapActions([
      "searchOrganize",
      "setSelectedOrganize",
      "searchProduct",
      "setSelectedProduct"
    ]),
    getDataProduct(val) {
      this.loadMore = 2500;
      this.pageProduct = 1;
      this.$store.dispatch("setloadProduct", true);
      this.chkHeadSales = true;
      this.url = "/get-type-performance";
      if (val == 2) {
        this.url = "/get-group-performance";
      } else if (val == 3) {
        this.url = "/get-subgroup-performance";
      } else if (val == 4) {
        this.url = "/get-catgory-performance";
      } else if (val == 5) {
        this.url = "/get-product-performance";
      }
      // this.$store.dispatch("getDataProductsFirstService", {
      //   url: this.url,
      //   page: this.pageProduct
      // });
      this.$store.dispatch("getDataProductLoadType", {
        url: this.url,
        page: this.pageProduct
      });
      this.bd.txtSerchProduct = "";
    },
    scrollFunction(e) {
      if (e.target.scrollLeft > this.loadMore - 1000 && this.loadProduct) {
        this.$store.dispatch("setloadProduct", false);
        this.pageProduct++;
        Promise.all([
          this.$store.dispatch("getDataProductsService", {
            url: this.url,
            page: this.pageProduct,
            keyword: this.keyword
          })
        ]).then(() => {
          this.$store.dispatch("setloadProduct", true);
          this.loadMore = this.loadMore + 2500;
        });
      }
    },
    searchProduct(param) {
      let val = this.options_product_selected;
      this.url = "/get-type-performance";
      if (val == 2) {
        this.url = "/get-group-performance";
      } else if (val == 3) {
        this.url = "/get-subgroup-performance";
      } else if (val == 4) {
        this.url = "/get-catgory-performance";
      } else if (val == 5) {
        this.url = "/get-product-performance";
      }
      this.loadMore = 2500;
      this.pageProduct = 1;
      this.$store.dispatch("setloadProduct", true);
      this.keyword = param;
      this.$store.dispatch("searchProduct", {
        url: this.url,
        page: this.pageProduct,
        keyword: param
      });
    },
    searchSalesMan(param) {
      this.$store.dispatch("searchOrganize", param);
    },
    setNextStep() {
      /*console.log('organize='+this.$store.getters.options_organize_selected);
                console.log('organize-data='+this.$store.getters.organizes_data);
                console.log('product='+this.$store.getters.options_product_selected);
                const uncheck = this.$store.getters.products_uncheck;
                for(var x in uncheck){
                    console.log(x+"==>"+uncheck[x]);
                }
                console.log('viewby_value='+this.$store.getters.getViewById);
                console.log('total_type='+this.$store.getters.getTotalType);
                console.log('total_first='+this.$store.getters.getTotalFirst);
                console.log('total_second='+this.$store.getters.getTotalSecond);
                console.log('month_first='+this.$store.getters.getMonthFirst);
                console.log('month_second='+this.$store.getters.getMonthSecond);*/
      /*this.$store.dispatch('getSumSaleTranService',{
                    organize_type:this.$store.getters.options_organize_selected,
                    organizes:this.$store.getters.organizes_data,
                    product_type:this.$store.getters.options_product_selected,
                    products_uncheck:this.$store.getters.products_uncheck,
                    viewby:this.$store.getters.getViewById,
                    totaltype:this.$store.getters.getTotalType,
                    totalfirst:this.$store.getters.getTotalFirst,
                    totalsecond:this.$store.getters.getTotalSecond,
                    monthfirst:this.$store.getters.getMonthFirst,
                    monthsecond:this.$store.getters.getMonthSecond,
                });*/

      if (
        this.$store.getters.organizes_data.length == 0 &&
        this.$store.getters.product_checkall == false &&
        this.$store.getters.product_selected.length == 0
      ) {
        this.txt_warning =
          "Please Select Sales Organization Level and Product Org.";
        this.$refs.snackbar.open();
      } else if (this.$store.getters.organizes_data.length == 0) {

        this.txt_warning = " Please Select  Sales Organization Level.";
        this.$refs.snackbar.open();
      } else if (
        this.$store.getters.product_checkall == false &&
        this.$store.getters.product_selected.length == 0
      ) {

        this.txt_warning = "Please Select  Product Org.";
        this.$refs.snackbar.open();
      } else {

        var stepper = 1;
        var clsStep = document.getElementsByClassName("md-step-header");
        clsStep[stepper].click();
        var html = document.documentElement;
        html.scrollTop = 0;
                    // this.check_step = 1;
      }
    },
    confirmAlert() {
      if (this.$store.getters.organizes_data.length == 0) {
        var expand = document.getElementsByClassName("md-list-item-expand");
        expand[0].classList.add("md-active");
        expand[1].classList.remove("md-active");
      }
      this.$refs.snackbar.close();
    },
    selectSales: function(item) {
      this.$store.dispatch("setSelectedOrganize", item.id);
      this.bd.holder_searchSales = "Filter " + item.name;
    },
    selectProduct(item) {
      this.$store.dispatch("setSelectedProduct", item.id);
      this.bd.holder_searchProduct = "Filter " + item.name;
    },
    toggleExpandList: function($event) {

      if (this.$store.getters.organizes_data.length == 0) {
        this.txt_warning = " Please Select  Sales Organization Level.";
        this.$refs.snackbar.open();
      } else {
        var expand = document.getElementsByClassName("md-list-item-expand");
        expand[0].classList.remove("md-active");
        expand[1].classList.add("md-active");
        if (this.options_product_selected == null) {
          this.$store.dispatch("getDataProductLoadType", {
            url: this.url,
            page: this.pageProduct
          });
        }else{
          this.getDataProduct(this.options_product_selected);
        }
      }
    },
    expandLIst(key) {
      var expand = document.getElementsByClassName("md-list-item-expand");
      if (key == 0) {
        expand[1].classList.remove("md-active");
        expand[0].classList.add("md-active");
        if (this.options_organize_selected == null) {
          this.$store.dispatch("getDataOrganizesServiceLoadType");
        }
      } else {
        if (this.$store.getters.organizes_data.length == 0) {
          this.txt_warning = " Please Select  Sales Organization Level.";
          this.$refs.snackbar.open();
        } else {
          expand[0].classList.remove("md-active");
          expand[1].classList.add("md-active");
          if (this.options_product_selected == null) {
            this.$store.dispatch("getDataProductLoadType", {
              url: this.url,
              page: this.pageProduct
            });
          }else{
            this.getDataProduct(this.options_product_selected);
          }
        }
      }
    },
    checkAllSales: function(e) {
      this.$store.dispatch("setChkHeadSales", e);
      for (var i = 0; i < this.arr_sales.length; i++) {
        this.arr_sales[i].checked = e;
      }
    },
    checkAllProd: function(e) {
      this.$store.dispatch("setProductCheckAll", e);
      for (var i = 0; i < this.products.length; i++) {
        this.products[i].checked = e;
      }
      if (e) {
        this.$store.dispatch("setUnselectedProductNull");
        this.$store.dispatch("clearProductSelected");
      } else {
        this.$store.dispatch("setUnselectedProductNull");
        this.$store.dispatch("clearProductSelected");
      }
    },
    checkChildSales(id, e) {
      this.$store.dispatch("setUnselectedOrganizeById", { id, status: e });
      var found = this.arr_sales.find(element => {
        return !element.checked;
      });
      if (found) this.$store.dispatch("setChkHeadSales", false);
      else this.$store.dispatch("setChkHeadSales", true);
    },
    checkChildProd(id, name, e) {
      if (this.$store.getters.product_checkall == false) {
        this.$store.dispatch("setProductSelected", { id, name, status: e });
      } else {
        this.$store.dispatch("setProductUncheck", { id, status: e });
      }
      if (e == false) this.$store.dispatch("setProductCheckAll", false);
      setTimeout(() => {
        var found = this.products.find(element => {
          return !element.checked;
        });
        if (!found) this.$store.dispatch("setProductCheckAll", true);
      }, 1000);
    },
    getProductList(start, end) {
      var arr = [];
      for (var i = start; i < end; i++) {
        arr.push({
          id: i,
          product_code: "000" + i,
          product_name_en: "Filing & Storage" + i
        });
      }
      return arr;
    },
    onChosen(e) {}
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

<style scoped>
.step1 #style-scrollbar {
  margin-left: 30px;
}
</style>