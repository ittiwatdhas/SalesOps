<template>
<div id="mainpageInformation">
    <div id="pageInformation">
        <md-spinner :md-size="150" :md-stroke="1" md-indeterminate v-show="(loadingProductAll)" style="position: fixed; z-index: 10; top: 23%; left: 45%;"></md-spinner>
        <md-layout>
            <div class="title">INFORMATION - OVERVIEW</div>
            <div class="select-information" v-click-outside="mouseLeave">
                <md-input-container md-theme>
                    <div class="input-information" @click="showSelected()">
                        <md-input v-model="selectedInformation" readonly></md-input>
                        <md-icon class="pl-4">expand_more</md-icon>
                    </div>
                    <div class="options-information" :style="{'display': (vShowSelected) ? 'block' : 'none'}">
                        <ul>
                            <li v-for="(list, index) in listInformation" :key="index" @click="onSelectedInformation(list)">{{ list.name }}</li>
                        </ul>
                    </div>
                </md-input-container>
            </div>
        </md-layout>

        <md-layout>
          
            <md-card md-flex="100" class="card-info">
                <div md-flex="100" class="-title">Product INFO</div>
                <div md-flex="100" class="-info">
                  <div v-if="this.vStatus != ''" style="align-items:center; display: flex;justify-content: flex-end;"> 
                     <md-avatar v-if="this.vStatus == 'Active'" style="margin: 0px 5px 3px 0;" class="md-cycle-icon small green"></md-avatar>
                     <md-avatar v-else style="margin: 0px 5px 3px 0;" class="md-cycle-icon small red"></md-avatar>
                     {{this.vStatus}}
                    </div>
                    <md-layout md-align="center">
                        <md-layout md-flex="33" class="display-info">
                            <md-input-container md-theme v-click-outside="mouseLeaveAutoSearch">
                                <div class="auto-search">
                                    <label class="value-label">Item Code</label>
                                    <!-- <md-input v-model="dataSearch" placeholder="Search item code... (At least 3 digits)" @input.native="autoSearch($event)"></md-input> -->
                                    <md-input v-model="dataSearch" placeholder="Search item code..." @keypress.native="autoSearch"></md-input>
                                    <md-spinner :md-size="100" :md-stroke="1" md-indeterminate v-show="(loadingPage)" style="position: absolute; z-index: 3; left: 30%; top: 100%; margin-top: 20px;"></md-spinner>
                                    <span @click="searchAllProduct()">
                                        <md-icon class="pl-4">search</md-icon>
                                    </span>
                                </div>
                                <div class="datas-auto-search" :style="{'display': (vShowAutoSearch) ? 'block' : 'none'}">
                                    <ul v-show="(listAutoSearch.length == 0)">
                                        <li>No data.</li>
                                    </ul>
                                    <ul v-show="(listAutoSearch.length > 0)">
                                        <li v-for="(data, index) in listAutoSearch" :key="index" @click="onSelectedAutoSearch(data)" class="nowrap">
                                            {{ data.code }} : {{ data.title_th }}
                                            <md-tooltip md-direction="bottom" class="mds-tooltips">{{ data.code }} : {{ data.title_th }}</md-tooltip>
                                        </li>
                                    </ul>
                                </div>
                            </md-input-container>
                        </md-layout>
                        <md-layout md-flex="33" class="display-info">
                            <md-input-container md-theme class="-readonly">
                                <label class="value-label">Description TH</label>
                                <md-tooltip md-direction="bottom" class="mds-tooltips">{{ descriptionTH }}</md-tooltip>
                                <md-input v-model="descriptionTH" :readonly="true"></md-input>
                            </md-input-container>
                        </md-layout>
                        <md-layout md-flex="33" class="display-info">
                            <md-input-container md-theme class="-readonly">
                                <label class="value-label">Description EN</label>
                                <md-tooltip md-direction="bottom" class="mds-tooltips">{{ descriptionEN }}</md-tooltip>
                                <md-input v-model="descriptionEN" :readonly="true"></md-input>
                            </md-input-container>
                        </md-layout>
                    </md-layout>

                    <md-layout md-align="center">
                        <md-layout md-flex="33" class="display-info">
                            <md-input-container md-theme v-click-outside="mouseLeaveAutoBarcodeSearch">
                                <div class="auto-search">
                                    <label class="value-label">Barcode</label>
                                    <!-- <md-input v-model="dataSearch" placeholder="Search item code... (At least 3 digits)" @input.native="autoSearch($event)"></md-input> -->
                                    <md-input v-model="barcode" placeholder="Search Barcode..." @keypress.native="autoSearchBarcode"></md-input>
                                    <md-spinner :md-size="100" :md-stroke="1" md-indeterminate v-show="(loadingPage_barcode)" style="position: absolute; z-index: 3; left: 30%; top: 100%; margin-top: 20px;"></md-spinner>
                                    <span @click="searchBarcode()">
                                        <md-icon class="pl-4">search</md-icon>
                                    </span>
                                </div>
                                <div class="datas-auto-search" :style="{'display': (vShowAutoBarcodeSearch) ? 'block' : 'none'}">
                                    <ul v-show="(listAutoBarcodeSearch.length == 0)">
                                        <li>No data.</li>
                                    </ul>
                                    <ul v-show="(listAutoBarcodeSearch.length > 0)">
                                        <li v-for="(data, index) in listAutoBarcodeSearch" :key="index" @click="onSelectedAutoSearch(data)" class="initial">
                                            {{ data.barcode }} : {{ data.code }} : {{ data.title_th }}
                                            <!-- <md-tooltip md-direction="bottom" class="mds-tooltips">{{ data.barcode }} : {{ data.code }} : {{ data.title_th }}</md-tooltip> -->
                                        </li>
                                    </ul>
                                </div>
                            </md-input-container>
                        </md-layout>
                        <!-- <md-layout md-flex="33" class="display-info">
                            <md-input-container md-theme class="-readonly">
                                <label class="value-label">Barcode</label>
                                <md-input v-model="barcode" :readonly="true"></md-input>
                            </md-input-container>
                        </md-layout> -->
                        <md-layout md-flex="33" class="display-info">
                            <md-input-container md-theme class="-readonly">
                                <label class="value-label">Type</label>
                                <md-tooltip md-direction="bottom" class="mds-tooltips">{{ type }}</md-tooltip>
                                <md-input v-model="type" :readonly="true"></md-input>
                            </md-input-container>
                        </md-layout>
                        <md-layout md-flex="33" class="display-info">
                            <md-input-container md-theme class="-readonly">
                                <label class="value-label">Group</label>
                                <md-tooltip md-direction="bottom" class="mds-tooltips">{{ group }}</md-tooltip>
                                <md-input v-model="group" :readonly="true"></md-input>
                            </md-input-container>
                        </md-layout>
                    </md-layout>

                    <md-layout md-align="center">
                        <md-layout md-flex="33" class="display-info">
                            <md-input-container md-theme class="-readonly">
                                <label class="value-label">Product Code</label>
                                <md-input v-model="productcode" :readonly="true"></md-input>
                            </md-input-container>
                        </md-layout>
                        <md-layout md-flex="33" class="display-info">
                            <md-input-container md-theme class="-readonly">
                                <label class="value-label">Sub Group</label>
                                <md-tooltip md-direction="bottom" class="mds-tooltips">{{ subgroup }}</md-tooltip>
                                <md-input v-model="subgroup" :readonly="true"></md-input>
                            </md-input-container>
                        </md-layout>
                        <md-layout md-flex="33" class="display-info">
                            <md-input-container md-theme class="-readonly">
                                <label class="value-label">CG</label>
                                <md-tooltip md-direction="bottom" class="mds-tooltips">{{ cg }}</md-tooltip>
                                <md-input v-model="cg" :readonly="true"></md-input>
                            </md-input-container>
                        </md-layout>
                    </md-layout>
                </div>

                  <div md-flex="100" class="display-dialog">
                    <div md-flex="33">
                        <md-button id="btnPricing" :class="'md-raised -btn-gray -btn-orange'" @click="openDialog('pricing')">
                            <label>PRICING</label>
                        </md-button>
                        <!-- <dialog-pricing v-model="dataSearch" :descriptionTH="descriptionTH"></dialog-pricing> -->
                    </div>
                    <div md-flex="33">
                        <md-button :class="'md-raised -btn-gray -btn-orange'" @click="openDialog('volumepricing')">
                            <label>VOLUME PRICING</label>
                        </md-button>
                        <!-- <dialog-promotion v-model="dataSearch" :descriptionTH="descriptionTH"></dialog-promotion> -->
                    </div>
                    <div md-flex="33">
                         <!-- <div style="width: 215px;"></div> -->
                        <md-button id="btnPricing" :class="'md-raised -btn-gray -btn-orange'" @click="openDialog('bookprice')">
                            <label>BOOK PRICE</label>
                        </md-button>
                        <!-- <dialog-packing v-model="dataSearch" :descriptionTH="descriptionTH"></dialog-packing> -->
                    </div>
                </div>
                <div md-flex="100" class="display-dialog">
                    <div md-flex="33">
                         <md-button id="btnPricing" :class="'md-raised -btn-gray -btn-orange'" @click="openDialog('promotion')">
                            <label>PROMOTION</label>
                        </md-button>
                        <!-- <dialog-volume-pricing v-model="dataSearch"></dialog-volume-pricing> -->
                    </div>
                    <div md-flex="33">
                         <md-button id="btnPricing" :class="'md-raised -btn-gray -btn-orange'" @click="openDialog('packing')">
                            <label>PACKING</label>
                        </md-button>
                        <!-- <dialog-warehouse v-model='dataSearch' :descriptionTH="descriptionTH"></dialog-warehouse> -->
                    </div>
                    <div md-flex="33">
                        <md-button id="btnPricing" :class="'md-raised -btn-gray -btn-orange'" @click="openDialog('warehouse')">
                            <label>WAREHOUSE</label>
                        </md-button>
                    </div>
                </div>
            </md-card>
        </md-layout>
    </div>

    <dialog-product-all v-model="dataProductAll" :showDialog="showDialogProudctAll" @addProduct="onAddProduct" @clickClose="onCloseDialog"></dialog-product-all>

    <dialog-pricing :showDialog="showDialogPricing" v-model="dataSearch" :descriptionTH="descriptionTH" @confirm="confirmCloseDialog"></dialog-pricing>
     <dialog-bookprice :showDialog="showDialogBookprice" v-model="dataSearch" :descriptionTH="descriptionTH" @confirm="confirmCloseDialog"></dialog-bookprice>
    <dialog-promotion :showDialog="showDialogPromotion" v-model="dataSearch" :descriptionTH="descriptionTH" @confirm="confirmCloseDialog"></dialog-promotion>
    <dialog-packing :showDialog="showDialogPacking" v-model="dataSearch" :descriptionTH="descriptionTH" @confirm="confirmCloseDialog"></dialog-packing>
    <dialog-volume-pricing :showDialog="showDialogVolumePricing" v-model="dataSearch" :descriptionTH="descriptionTH" @confirm="confirmCloseDialog"></dialog-volume-pricing>
    <dialog-warehouse :showDialog="showDialogWarehouse" v-model="dataSearch" :descriptionTH="descriptionTH" @confirm="confirmCloseDialog"></dialog-warehouse>

    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
        <span>{{ snackbarContent }}</span>
        <md-button class="md-accent" @click="$refs.snackbar.close()">OK</md-button>
    </md-snackbar>
</div>
</template>

<script>
import Vue from "vue";
import ClickOutside from "vue-click-outside";
import promotionInformationService from "@/services/orders/promotioninformation";
export default {
    name: "information",
    data() {
        return {
            vShowAutoSearch: false,
            vShowSelected: false,
            listAutoSearch: [],
            vStatus:'',
            listInformation: [{
                value: 0,
                name: "Product Information"
            }],
            selectedInformation: "Product Information",
            dataSearch: "",
            descriptionTH: "",
            descriptionEN: "",
            barcode: "",
            type: "",
            group: "",
            productcode: "",
            subgroup: "",
            cg: "",
            loadingPage: false,
            loadingProductAll: false,
            showDialogProudctAll: false,
            dataProductAll: {},
            oldData: "",
            snackbarContent: "",
            vertical: "bottom",
            horizontal: "center",
            duration: 4000,
            showDialogPricing: false,
            showDialogPacking: false,
            showDialogPromotion: false,
            showDialogVolumePricing: false,
            showDialogWarehouse: false,
            showDialogBookprice: false,
            listAutoBarcodeSearch: [],
            vShowAutoBarcodeSearch: false,
            loadingPage_barcode: false,
            oldBarcode:""
        };
    },
    created() {
        if (Vue.localStorage.get("login") == null) {
            this.login = false;
            this.$router.replace("/");
        } else {
            this.login = true;
            this.$store.dispatch("setPathMenuService", "orders");
        }
    },
    watch: {},
    computed: {},
    methods: {
        openDialog(page) {
            if (this.dataSearch == "") {
                this.snackbarContent = "Please Select Item Code";
                this.$refs.snackbar.open();
                return;
            }

            if (page == "pricing") {
                this.showDialogPricing = true;
            } else if (page == "promotion") {
                this.showDialogPromotion = true;
            } else if(page == "packing") {
                this.showDialogPacking = true;
            } else if(page == "volumepricing") {
                this.showDialogVolumePricing = true;
            } else if(page == "warehouse") {
                this.showDialogWarehouse = true;
            }else if(page == "bookprice"){
                this.showDialogBookprice = true;
            }

        },
        confirmCloseDialog() {
            this.showDialogPricing = false;
            this.showDialogPromotion = false;
            this.showDialogPacking = false;
            this.showDialogVolumePricing = false;
            this.showDialogWarehouse = false;
            this.showDialogBookprice = false;
        },
        onAddProduct(data) {
            this.dataSearch = data.code;
            this.descriptionTH = (data.title_th) ? data.title_th : "";
            this.descriptionEN = (data.title) ? data.title : "";
            this.barcode = (data.barcode) ? data.barcode : "";
            this.type = ((data.productype_code) ? data.productype_code : "") + " " + ((data.productype_title) ? data.productype_title : "");
            this.group = ((data.productgroup_code) ? data.productgroup_code : "") + " " + ((data.productgroup_title) ? data.productgroup_title : "");
            this.productcode = (data.refcode) ? data.refcode : "";
            this.subgroup = ((data.productsubgroup_code) ? data.productsubgroup_code : "") + " " + ((data.productsubgroup_title) ? data.productsubgroup_title : "");
            this.cg = ((data.productcg_code) ? data.productcg_code : "") + " " + ((data.productcg_title) ? data.productcg_title : "");
            this.oldData = data.code;
            this.oldBarcode = data.barcode;
            this.showDialogProudctAll = false;
            this.vStatus = data.status
        },
        onCloseDialog(boolean) {
            this.showDialogProudctAll = boolean;
        },
        searchAllProduct() {
            let self = this;
            this.loadingProductAll = true;
            promotionInformationService.GetProductAll()
                .then(response => {
                    response.group.unshift({
                        code: "",
                        title: "All Product Group"
                    });
                    response.subgroup.unshift({
                        code: "",
                        title: "All Sub Group"
                    });
                    response.cg.unshift({
                        code: "",
                        title: "All CG"
                    });

                    response.group.sort((a, b) => (a.code > b.code) ? 1 : -1);
                    response.subgroup.sort((a, b) => (a.code > b.code) ? 1 : -1);
                    response.cg.sort((a, b) => (a.code > b.code) ? 1 : -1);

                    self.dataProductAll = response;
                    self.showDialogProudctAll = true;
                    this.loadingProductAll = false;
                });
        },
        autoSearch(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode == 13) {
                this.loadingPage = true;
                // let value = event.target.value;
                let value = {
                    keyword:  _.trim(this.dataSearch)
                };
                promotionInformationService.GetAutoSearchItemCode(value)
                    .then(response => {
                        this.listAutoSearch = response
                        this.vShowAutoSearch = true;
                        this.loadingPage = false;
                    });

                if (value == "") {
                    this.descriptionTH = "";
                    this.descriptionEN = "";
                    this.barcode = "";
                    this.type = "";
                    this.group = "";
                    this.productcode = "";
                    this.subgroup = "";
                    this.cg = "";
                    this.oldData = "";
                    this.oldBarcode = "";
                }
            }
        },
        autoSearchBarcode(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode == 13) {
                this.loadingPage_barcode = true;
                // let value = event.target.value;
                let value = {
                    keyword: this.barcode
                };
                promotionInformationService.GetAutoSearchBarcodeode(value)
                    .then(response => {
                        this.listAutoBarcodeSearch = response
                        this.vShowAutoBarcodeSearch = true;
                        this.loadingPage_barcode = false;
                    });

                if (value == "") {
                    this.dataSearch = "";
                    this.descriptionTH = "";
                    this.descriptionEN = "";
                    // this.barcode = "";
                    this.type = "";
                    this.group = "";
                    this.productcode = "";
                    this.subgroup = "";
                    this.cg = "";
                    this.oldData = "";
                    this.oldBarcode = "";
                }
            }
        },
        searchBarcode() {
            // let self = this;
            this.loadingPage_barcode = true;
            let value = {
                    keyword: this.barcode
                };
                promotionInformationService.GetAutoSearchBarcodeode(value)
                    .then(response => {
                        this.listAutoBarcodeSearch = response
                        this.vShowAutoBarcodeSearch = true;
                        this.loadingPage_barcode = false;
                    });

                if (value == "") {
                    this.dataSearch = "";
                    this.descriptionTH = "";
                    this.descriptionEN = "";
                    // this.barcode = "";
                    this.type = "";
                    this.group = "";
                    this.productcode = "";
                    this.subgroup = "";
                    this.cg = "";
                    this.oldData = "";
                    this.oldBarcode = "";
                }
            // promotionInformationService.GetProductAll()
            //     .then(response => {
            //         response.group.unshift({
            //             code: "",
            //             title: "All Product Group"
            //         });
            //         response.subgroup.unshift({
            //             code: "",
            //             title: "All Sub Group"
            //         });
            //         response.cg.unshift({
            //             code: "",
            //             title: "All CG"
            //         });

            //         response.group.sort((a, b) => (a.code > b.code) ? 1 : -1);
            //         response.subgroup.sort((a, b) => (a.code > b.code) ? 1 : -1);
            //         response.cg.sort((a, b) => (a.code > b.code) ? 1 : -1);

            //         self.dataProductAll = response;
            //         self.showDialogProudctAll = true;
            //         this.loadingProductAll = false;
            //     });
        },
        mouseLeaveAutoSearch() {
            this.vShowAutoSearch = false;
            if(this.dataSearch != this.oldData) {
                this.dataSearch = this.oldData;
            }
        },
        mouseLeaveAutoBarcodeSearch() {
            this.vShowAutoBarcodeSearch = false;
            if(this.barcode != this.oldBarcode) {
                this.barcode = this.oldBarcode;
            }
        },
        onSelectedAutoSearch(data) {
            this.dataSearch = data.code;
            this.descriptionTH = (data.title_th) ? data.title_th : "";
            this.descriptionEN = (data.title) ? data.title : "";
            this.barcode = (data.barcode) ? data.barcode : "";
            this.type = ((data.productype_code) ? data.productype_code : "") + " " + ((data.productype_title) ? data.productype_title : "");
            this.group = ((data.productgroup_code) ? data.productgroup_code : "") + " " + ((data.productgroup_title) ? data.productgroup_title : "");
            this.productcode = (data.refcode) ? data.refcode : "";
            this.subgroup = ((data.productsubgroup_code) ? data.productsubgroup_code : "") + " " + ((data.productsubgroup_title) ? data.productsubgroup_title : "");
            this.cg = ((data.productcg_code) ? data.productcg_code : "") + " " + ((data.productcg_title) ? data.productcg_title : "");
            this.oldData = data.code;
            this.oldBarcode = data.barcode;
            this.vShowAutoSearch = false;
            this.vShowAutoBarcodeSearch = false;
            this.vStatus = data.status

        },

        mouseLeave() {
            this.vShowSelected = false;
        },
        onSelectedInformation(list) {
            let index = this.listInformation.findIndex(item => item.value === list.value);
            this.selectedInformation = this.listInformation[index].name;
            this.vShowSelected = false;
        },
        showSelected() {
            this.vShowSelected = (this.vShowSelected) ? false : true;
        }
    },
    directives: {
        ClickOutside
    },
    components: {
        "menu-header": require("../Salesops/layout/menu-top"),
        "menu-left": require("../Salesops/layout/menu-left"),
        "dialog-pricing": require("./information-component/dialog-pricing"),
        "dialog-bookprice": require("./information-component/dialog-bookprice"),
        "dialog-promotion": require("./information-component/dialog-promotion"),
        "dialog-packing": require("./information-component/dialog-packing"),
        "dialog-volume-pricing": require("./information-component/dialog-volume-pricing"),
        "dialog-warehouse": require("./information-component/dialog-warehouse"),
        "dialog-product-all": require("./information-component/dialog-product-all")
    }
};
</script>

<style lang="scss">
#mainpageInformation {
    overflow-y: scroll;
    height: calc(100vh - 110px);

    #pageInformation {
        margin: 30px 55px 30px 60px;

        .title {
            width: 25%;
            text-align: left;
            color: #797979;
            font-family: Lato;
            font-size: 18px;
            padding-top: 8px;
        }

        .select-information {
            width: 20%;

            .md-input-container {
                margin: 0px;
                padding: 0px;
                min-height: unset;
            }

            .input-information {
                display: flex;
                width: 100%;

                input {
                    cursor: pointer;
                    padding-left: 10px;
                    font-size: 16px;
                    color: rgba(0, 0, 0, 0.87);
                }

                .md-icon {
                    cursor: pointer;
                    padding-left: 3px;
                }
            }

            .options-information {
                position: absolute;
                width: 100%;
                margin-top: 5px;
                z-index: 2;
                box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);

                ul {
                    display: inline;
                    margin: 0;
                    padding: 0;

                    li {
                        display: block;
                        padding: 8px 10px;
                        margin: 0;
                        text-align: left;
                        font-family: Lato;
                        font-size: 16px;
                        color: rgba(0, 0, 0, 0.87);
                        background-color: white;
                    }

                    li:hover {
                        // background: #c5c5c5;
                        background: #e0e0e0;
                        cursor: pointer;
                    }
                }
            }
        }

        .card-info {
            width: 100%;
            margin-top: 40px;
            padding: 30px;

            .-title {
                text-align: left;
                font-family: Roboto;
                font-size: 12px;
                color: #727272;
                margin: 0px 10px;
            }

            .-info {
                background-color: #F8F8F8;
                margin: 10px 10px;
                padding: 25px;

                .md-input-container input::-webkit-input-placeholder {
                    font-family: Roboto;
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.54);
                }

                .display-info {
                    padding: 10px 40px;

                    .auto-search {
                        display: flex;
                        width: 100%;

                        .md-icon {
                            cursor: pointer;
                        }
                    }

                    .value-label {
                        top: 0;
                        opacity: 1;
                        font-family: Roboto;
                        font-size: 11px;
                        color: #727272;
                    }

                    input {
                        font-family: kanit;
                        font-size: 13px;
                        font-weight: 300;
                        color: #414141;
                    }

                    .md-icon {
                        margin-left: 3px !important;
                    }

                    .md-input-container {
                        margin: 0px 0px;

                        &.md-input-focused label {
                            color: #FF9800;
                        }

                        &.-readonly {
                            label {
                                color: #727272 !important;
                            }

                            &.md-input-focused:after {
                                height: 1px;
                                position: absolute;
                                right: 0;
                                bottom: 0;
                                left: 0;
                                background-color: rgba(0, 0, 0, 0.12);
                                transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                                content: " ";
                            }
                        }
                    }

                    .datas-auto-search {
                        position: absolute;
                        width: 100%;
                        margin-top: 32px;
                        z-index: 2;
                        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
                        overflow-y: scroll;
                        max-height: 180px;

                        ul {
                            display: inline;
                            margin: 0;
                            padding: 0;

                            li {
                                display: block;
                                padding: 8px 10px;
                                margin: 0;
                                text-align: left;
                                font-family: Lato;
                                font-size: 14px;
                                color: rgba(0, 0, 0, 0.87);
                                background-color: white;

                                &.nowrap {
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }

                                &.initial {
                                    white-space: initial;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }
                            }

                            li:hover {
                                background: #efefef;
                                cursor: pointer;
                            }
                        }

                        &::-webkit-scrollbar {
                            height: 7px;
                            width: 8px;
                            background: #f7f7f7;
                        }

                        &::-webkit-scrollbar-thumb {
                            background-color: rgba(0, 0, 0, 0.11);
                            border-radius: 5px;
                        }
                    }
                }
            }

            .display-dialog {
                display: flex;
                justify-content: center;

                >div {
                    margin: 10px 30px;

                    .md-button {
                        width: 200px;
                        height: 80px;
                        border-radius: 4px;
                        padding: 0px;

                        &.-btn-gray {
                            background-color: #A8A8A8;
                        }

                        &.-btn-orange:hover {
                            background-color: #FD7F00;
                        }

                        label {
                            font-family: Roboto;
                            font-size: 18px;
                            font-weight: bold;
                            color: #FFFFFF;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

    &::-webkit-scrollbar {
        height: 7px;
        width: 8px;
        background: #f7f7f7;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.11);
        border-radius: 5px;
    }
}
</style>
