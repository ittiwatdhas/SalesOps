<template>
<div id="proin-dialog-promotion">
    <!-- <md-button id="btnPricing" :class="'md-raised -btn-gray -btn-orange'" @click="openDialog()">
        <label>PROMOTION</label>
    </md-button> -->

    <md-spinner :md-size="150" :md-stroke="1" md-indeterminate v-show="(loadingPage)" style="position: fixed; z-index: 10; top: 23%; left: 45%;"></md-spinner>

    <div :class="(showDialog) ? 'bg-backdrop' : ''"></div>
    <div class="proin-md-dialog" v-show="(showDialog)">
        <div class="dialog-title">
            <div class="-text">Promotion</div>
            <div class="-close">
                <md-icon style="cursor:pointer;margin-right:30px" @click.native="closeDialog">close</md-icon>
            </div>
        </div>

        <div class="layout-dialog">
            <div class="block-promotion">
                <div style="display: flex;">
                    <div class="title-content">{{ value }} : {{ descriptionTH }}</div>
                    <div class="select-dropdown" v-click-outside="mouseLeave">
                        <md-input-container md-theme>
                            <div class="input-dropdown" @click="showSelected()">
                                <md-input v-model="selectedDropdown" readonly></md-input>
                                <md-icon class="pl-4" v-show="(!vShowSelected)">arrow_drop_down</md-icon>
                                <md-icon class="pl-4" v-show="(vShowSelected)">arrow_drop_up</md-icon>
                            </div>
                            <div class="options-dropdown" :style="{'display': (vShowSelected) ? 'block' : 'none'}">
                                <ul>
                                    <li v-for="(list, index) in listDropdown" :key="index" @click="onSelectedDropdown(list)">{{ list.name }}</li>
                                </ul>
                            </div>
                        </md-input-container>
                    </div>
                </div>

                <div class="md-layout" style="padding-left: 2px; margin-top: 5px;">
                    <div id="table-promotion">
                        <div id="divHeadUpdate" class="display">
                            <div style="width: 18%;" class="-text-left">Promotion Code</div>
                            <div style="width: 46%;" class="-text-left">Promotion Title</div>
                            <div style="width: 10%;" class="-text-center">Create Date</div>
                            <div style="width: 18%;" class="-text-center">Available on</div>
                            <div style="width: 8%;" class="-text-center">Status</div>
                        </div>
                        <div id="divBodyUpdate" class="display">
                            <div v-show="(dataTable == null || dataTable.length == 0)" :class="'row-bg-orange'" style="display: block; text-align: center;">No data in table.</div>
                            <!-- <div :class="(rowSelected == updateIndex) ? 'row-bg-orange -selected' : 'row-bg-orange'" v-for="(item, updateIndex) in dataTable" :key="updateIndex" @click="selectRowsPromotion(item, updateIndex)"> -->
                            <div :class="(rowSelected == updateIndex) ? '-selected' : 'row-bg-gray'" v-for="(item, updateIndex) in dataTable" :key="updateIndex" style="cursor: pointer;" @click="selectRowsPromotion(item, updateIndex)">
                                <div style="width: 18%;" class="-text-left nowrap-title -font-400">
                                    <md-tooltip md-direction="bottom" class="mds-tooltips">{{ item.promotion_code }}</md-tooltip>
                                    <span>{{ item.promotion_code }}</span>
                                </div>
                                <div style="width: 46%;" class="-text-left nowrap-title -font-400">
                                    <md-tooltip md-direction="bottom" class="mds-tooltips">{{ item.promotion_title }}</md-tooltip>
                                    <span>{{ item.promotion_title }}</span>
                                </div>
                                <div style="width: 10%;" class="-text-center">{{ convertDate(item.c_time) }}</div>
                                <div style="width: 18%;" class="-text-center">{{ convertDate(item.startdate) }} - {{ convertDate(item.enddate) }}</div>
                                <div style="width: 8%;" class="-text-center">{{ item.type }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="block-info">
                <div style="display: flex;">
                    <div class="title-content">Promotion Info</div>
                    <div class="chip-info">
                        <div v-show="(chipStatus != '')" :class="(chipStatus == 'Active') ? 'chip-status -active' : 'chip-status -inactive'">{{ chipStatus }}</div>
                    </div>
                </div>
                <div v-show="(chipStatus != '')" class="-codetitle">{{ promotionCodeTitle }}</div>
                <div v-show="(chipStatus != '')" class="-detail">{{ (promotionDetail == "") ? "" : "- " + promotionDetail }}</div>
                <div v-show="(chipStatus == '')" :class="'row-bg-orange'" class="no-data">No data in this block.</div>
            </div>

            <div class="block-condition">
                <div class="title-content">Condition Set</div>

                <div v-show="(promotionSet.length == 0)" :class="'row-bg-orange'" class="no-data">No data in this block.</div>
                <md-tabs md-active-tab="tab-0" v-show="(promotionSet.length > 0)">
                    <md-tab v-for="(item , index) in promotionSet" :key="index" :id="`tab-${index}`" :md-label="(item.name == '') ? `SET ${(index+1)}` : `${item.name}`">
                        <div class="md-layout-item md-layout md-gutter">
                            <div class="md-layout-item" style="padding-left: 0px; width: 60%;">
                                <div class="md-layout-item md-layout md-gutter">
                                    <div class="md-layout-item" style="padding-left: 0px; width: 30%;">
                                        <div class="md-tab-orange-text">Set</div>
                                        <div class="md-tab-text" style="margin-top:3px">{{item.name}}</div>
                                    </div>
                                    <div class="md-layout-item" style="width: 70%;">
                                        <div class="md-tab-orange-text">Default Price</div>
                                        <div class="md-tab-text" style="margin-top:3px">{{item.default_price}}</div>
                                    </div>
                                    <div class="md-layout-item rows-item" style="width: 100%;">
                                        <div class="mktops-text-condition" style="display: flex;">
                                            <div style="width: 25%; padding-top: 10px;">Conditions</div>
                                        </div>
                                    </div>
                                    <div v-if="item.conditions.length > 0">
                                        <template v-for="(item_condition , index_condition) in item.conditions">
                                            <div v-if="(item_condition.type != 'Count Item')" :key="`condition_${index_condition}`" class="md-layout-item md-size-100 step-content-line">
                                                <div class="section-sub-line"></div>
                                                <label class="mktops-text-qty mr-20">{{item_condition.type}}</label>
                                                <label class="md-tab-orange-text" style="margin-right:5px">Min</label>
                                                <label class="md-tab-text mr-20">{{item_condition.min}}</label>
                                                <label class="md-tab-orange-text" style="margin-right:5px">Max</label>
                                                <label class="md-tab-text">{{item_condition.max}}</label>
                                            </div>

                                            <template v-else>
                                                <div class="md-layout-item step-content-line" style="width: 100%;">
                                                    <div class="section-sub-line"></div>
                                                    <label class="mktops-text-qty mr-20">Count Item (≥)</label>
                                                    <label class="md-tab-text">{{item_condition.count}}</label>
                                                </div>
                                                <div class="md-layout-item step-content-line" style="width: 100%;">
                                                    <div class="section-sub-line"></div>
                                                    <label class="mktops-text-qty mr-20">QTY</label>
                                                    <label class="md-tab-orange-text" style="margin-right:5px">Min</label>
                                                    <label class="md-tab-text mr-20">{{item_condition.min}}</label>
                                                    <label class="md-tab-orange-text" style="margin-right:5px">Max</label>
                                                    <label class="md-tab-text">{{item_condition.max}}</label>
                                                </div>
                                            </template>
                                        </template>
                                    </div>
                                    <div v-else>
                                        <div class="md-layout-item step-content-line" style="width: 100%;">
                                            <div class="section-sub-line"></div>
                                            <label class="mktops-text-qty mr-20 -donthavedata">Not have Conditions.</label>
                                        </div>
                                    </div>

                                    <div class="md-layout-item rows-item" style="width: 100%;">
                                        <div class="mktops-text-condition">Promotions</div>
                                    </div>

                                    <div v-for="(item_promotion , index_promotion) in item.promotions" :key="`promotion_${index_promotion}`" :class="item_promotion.type == 'Free item' ? 'md-layout-item fix-height' : 'md-layout-item step-content-line'" style="width: 100%;">
                                        <template v-if="item_promotion.type == 'Discount'">
                                            <div class="section-sub-line"></div>
                                            <label class="mktops-text-qty mr-20">{{item_promotion.type}}</label>
                                            <label class="md-tab-text">{{item_promotion.value}} %</label>
                                        </template>
                                        <template v-else-if="item_promotion.type == 'Net Price'">
                                            <div class="section-sub-line"></div>
                                            <label class="mktops-text-qty mr-20">{{item_promotion.type}}</label>
                                            <label class="md-tab-text" style="font-family: Kanit;">{{item_promotion.value}} บาท</label>
                                        </template>
                                        <template v-else-if="item_promotion.type == 'Free item'">
                                            <div class="free-item">
                                                <div class="section-sub-line"></div>
                                                <div class="mktops-text-qty mr-20">{{item_promotion.type}}</div>
                                                <div style="text-align: right; width: 74%;">Number of &ensp; {{ (item_promotion.number_of_item == '') ? '-' : item_promotion.number_of_item }} &ensp; items</div>
                                            </div>
                                            <div id="table-manage-promotions">
                                                <div id="divTableHead">
                                                    <div style="width: 15%;">Code</div>
                                                    <div style="width: 52%">Description</div>
                                                    <div style="width: 10%;">Unit</div>
                                                    <div style="width: 10%;" class="-text-right">QTY</div>
                                                    <div style="width: 13%;" class="-text-center">Ratio</div>
                                                </div>
                                                <div id="divTableBody">
                                                    <div :class="(item.status == 'Inactive') ? '-inactive-product' : 'row-bg-orange'" v-for="(item, csIndex) in item_promotion.value" :key="csIndex">
                                                        <div style="width: 15%">{{ item.code }}</div>
                                                        <div style="width: 52%; font-family: Kanit;" class="nowrap-title">
                                                            {{ item.desc }}
                                                            <md-tooltip md-direction="bottom" class="mds-tooltips">{{ item.desc }}</md-tooltip>
                                                        </div>
                                                        <div style="width: 10%;">{{ item.unit }}</div>
                                                        <div style="width: 10%;" class="-text-right">{{ item.qty }}</div>
                                                        <div style="width: 13%;" class="-text-center">{{ displayRatio(item.ratio) }}</div>
                                                    </div>
                                                </div>
                                                <!-- <div style="font-weight: 400; font-size: 13px; color: red; font-style: italic; margin-top: 10px;">*Product code ที่ถูก Inactive</div> -->
                                            </div>
                                        </template>
                                    </div>
                                    <div v-if="item.promotions.length == 0" class="md-layout-item" style="width: 100%;">
                                        <template>
                                            <div class="free-item">
                                                <div class="section-sub-line"></div>
                                                <label class="mktops-text-qty mr-20 -donthavedata">Do not have Discount.</label>
                                            </div>
                                        </template>

                                        <template>
                                            <div class="free-item">
                                                <div class="section-sub-line"></div>
                                                <label class="mktops-text-qty mr-20 -donthavedata">Do not have Net Price.</label>
                                            </div>
                                        </template>

                                        <template>
                                            <div class="free-item">
                                                <div class="section-sub-line"></div>
                                                <div class="mktops-text-qty mr-20 -donthavedata">Do not have Free item.</div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="md-layout-item section-line" style="width: 40%;">
                                <div class="mktops-text-condition">Customer Groups</div>
                                <div class="md-layout filter-chips">
                                    <!-- <md-chip style="display: inline-grid;margin-left: 0px;" class="md-primary" v-for="(customer,index_customer) in item.customers" :key="`customer_${index_customer}`">({{index_customer+1}}) {{customer.group_name}}</md-chip> -->
                                    <md-chip style="display: inline-grid;margin-left: 0px;" class="md-primary" v-for="(customer,index_customer) in item.customers" :key="`customer_${index_customer}`">{{customer.group_name}}</md-chip>
                                </div>
                            </div>
                        </div>
                    </md-tab>
                </md-tabs>
            </div>

            <div class="block-product">
                <div class="title-content">Product ({{ dataProductTable.length }})</div>
                <div class="md-layout" style="padding-left: 2px; margin-top: 5px;">
                    <div id="table-product">
                        <div id="divHeadUpdate" class="display">
                            <div style="width: 37%;" class="-text-left">Item</div>
                            <div style="width: 13%;" class="-text-right">Stock</div>
                            <div style="width: 8%;" class="-text-center">Unit</div>
                            <div style="width: 6%;" class="-text-right">Min</div>
                            <div style="width: 6%;" class="-text-right">Max</div>
                            <div style="width: 8%;" class="-text-right">Net Price</div>
                            <div style="width: 10%;" class="-text-right">Default Price</div>
                            <div style="width: 12%;" class="-text-right">Promotion Price</div>
                        </div>
                        <div id="divBodyUpdate" class="display">
                            <div v-show="(dataProductTable == null || dataProductTable.length == 0)" :class="'row-bg-orange'" style="display: block; text-align: center;">No data in table.</div>
                            <div :style="{'color':item.status_show === 'active' ? '' : '#EFEFEF'}" :class="'row-bg-orange'" v-for="(item, detailIndex) in dataProductTable" :key="detailIndex">
                                <div style="width: 6%; font-weight: bold !important;" class="-text-left -font-400">{{ item.code }}</div>
                                <div style="width: 31%; font-weight: bold !important;" class="-text-left nowrap-title -font-400">
                                    <md-tooltip md-direction="bottom" class="mds-tooltips">{{ item.item_name }}</md-tooltip>
                                    <span>{{ item.item_name }}</span>
                                </div>
                                <div style="width: 13%;" class="-text-right">( {{ formatNumber(item.balance, 0) }} / {{ formatNumber(item.onorder, 0) }} )</div>
                                <div style="width: 8%;" class="-text-center">{{ item.seu_code }}</div>
                                <div style="width: 6%;" class="-text-right">{{ formatNumber(item.min, 0) }}</div>
                                <div style="width: 6%;" class="-text-right">{{ formatNumber(item.max, 0) }}</div>
                                <div style="width: 8%;" class="-text-right">฿ {{ formatNumber(item.netprice, 2) }}</div>
                                <div style="width: 10%;" class="-text-right">฿ {{ formatNumber(item.price, 2) }}</div>
                                <div style="width: 12%;" class="-text-right">฿ {{ formatNumber(item.promo_price, 2) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
        <span>{{ snackbarContent }}</span>
        <md-button class="md-accent" @click="$refs.snackbar.close()">OK</md-button>
    </md-snackbar>

    <dialog-confirm v-model="dialogContent" :dialogConfirmClose="dialogConfirmClose" @clickClose="onCloseDialog" @clickConfirm="onConfirmDialog"></dialog-confirm>
</div>
</template>

<script>
import Vue from "vue";
import ClickOutside from "vue-click-outside";
import moment from "moment";
import promotionInformationService from "@/services/orders/promotioninformation";
export default {
    name: "dialog-promotion",
    props: ["value", "descriptionTH", "showDialog"],
    data() {
        return {
            snackbarContent: "",
            vertical: "bottom",
            horizontal: "center",
            duration: 4000,
            loadingPage: false,
            // showDialog: false,
            dialogContent: "Do you want to close ?",
            dialogConfirmClose: false,
            vShowSelected: false,
            listDropdown: [{
                value: 0,
                name: "All Status"
            }, {
                value: 1,
                name: "Active"
            }, {
                value: 2,
                name: "Inactive"
            }],
            selectedDropdown: "All Status",
            dataTable: [],
            chipStatus: '',
            promotionCodeTitle: '',
            promotionDetail: '',
            dataProductTable: [],
            promotionSet: [],
            rowSelected: 0
        };
    },
    created() {},
    watch: {
        showDialog(){
            this.getPromotionList();
        }
    },
    computed: {},
    methods: {
        convertDate(date) {
            if(date == "0000-00-00 00:00:00" || date == null || date == "") {
                return "";
            } else {
                return moment(new Date(date)).format("DD/MM/YYYY");
            }
        },
        selectRowsPromotion(item, updateIndex) {
            let self = this;
            self.loadingPage = true;
            promotionInformationService.GetProductPromotion(item._id.$oid)
                .then(response => {
                    if (response.length > 0) {
                        // let startdate = moment(new Date(response[0].startdate));
                        // let enddate = moment(new Date(response[0].enddate));
                        // let nowdate = moment(new Date());

                        // if(enddate.diff(nowdate, "days") == 0 ||
                        // (startdate.diff(nowdate, "days") <= 0 && enddate.diff(nowdate, "days") >= 0) ||
                        // startdate.diff(nowdate, "days") == 0) {
                        //     self.chipStatus = "Active";
                        // } else {
                        //     self.chipStatus = "Inactive";
                        // }

                        self.rowSelected = updateIndex;
                        self.chipStatus = response[0].type;
                        self.dataProductTable = response[0].products;
                        self.promotionCodeTitle = response[0].promotion_code + " : " + response[0].promotion_title;
                        self.promotionDetail = response[0].promotion_detail;
                        self.promotionSet = response[0].sets;
                        self.loadingPage = false;
                    } else {
                        this.snackbarContent = "No data Product of Promotion.";
                        this.$refs.snackbar.open();
                        self.loadingPage = false;
                        return;
                    }
                });
        },
        onCloseDialog(boolean) {
            this.dialogConfirmClose = boolean;
        },
        onConfirmDialog(boolean) {
            this.dialogConfirmClose = boolean;
            this.dataTable = [];
            this.selectedDropdown = "All Status";
            this.$emit("confirm");
            // this.showDialog = false;
        },
        // openDialog() {
        //     if (this.value == "") {
        //         this.snackbarContent = "Please Select Item Code";
        //         this.$refs.snackbar.open();
        //         return;
        //     }

        //     this.getPromotionList();
        // },
        getPromotionList() {
            let self = this;
            self.loadingPage = true;
            let datas = {
                code: this.value,
                status: (this.selectedDropdown == "All Status") ? "" : this.selectedDropdown
            };
            promotionInformationService.GetPromotion(datas)
                .then(response => {
                    if (response.length > 0) {
                        // let startdate = moment(new Date(response[0].startdate));
                        // let enddate = moment(new Date(response[0].enddate));
                        // let nowdate = moment(new Date());

                        // if(enddate.diff(nowdate, "days") == 0 ||
                        // (startdate.diff(nowdate, "days") <= 0 && enddate.diff(nowdate, "days") >= 0) ||
                        // startdate.diff(nowdate, "days") == 0) {
                        //     self.chipStatus = "Active";
                        // } else {
                        //     self.chipStatus = "Inactive";
                        // }
                        // response[0].products[10].status_show = 'inactive'
                        // response[0].products[2].status_show = 'inactive'
                        // response[0].products[19].status_show = 'inactive'
                     

                        self.rowSelected = 0;
                        self.dataTable = response;
                        self.chipStatus = response[0].type;
                        self.dataProductTable = response[0].products;
                        self.promotionCodeTitle = response[0].promotion_code + " : " + response[0].promotion_title;
                        self.promotionDetail = response[0].promotion_detail;
                        self.promotionSet = response[0].sets;

                      
                        // self.dataTable.sort((a, b) => (a.promotion_code > b.promotion_code) ? 1 : -1)
                        self.dataProductTable.sort((a, b) => (a.code > b.code) ? -1 : 1)
                        self.dataProductTable.sort((a, b) => (a.status_show > b.status_show) ? 1 : -1)

                        // self.showDialog = true;
                        self.loadingPage = false;

                    } else if (self.showDialog) {
                        self.dataTable = [];
                        self.chipStatus = "";
                        self.dataProductTable = [];
                        self.promotionCodeTitle = "";
                        self.promotionDetail = "";
                        self.promotionSet = [];
                        self.loadingPage = false;

                    } else {
                        // this.snackbarContent = "No data of Promotion.";
                        // this.$refs.snackbar.open();
                        self.loadingPage = false;
                        return;
                    }
                });
        },
        closeDialog() {
            this.dialogConfirmClose = true;
        },
        mouseLeave() {
            this.vShowSelected = false;
        },
        onSelectedDropdown(list) {
            let index = this.listDropdown.findIndex(item => item.value === list.value);
            this.selectedDropdown = this.listDropdown[index].name;
            this.getPromotionList();
            this.vShowSelected = false;
        },
        showSelected() {
            this.vShowSelected = (this.vShowSelected) ? false : true;
        },
        formatNumber(value, dicimal) {
            return promotionInformationService.formatNumber(value, dicimal);
        },
        displayRatio(item) {
            if (item[0] != "" && item[1] != "") {
                return item[0] + " : " + item[1];
            } else {
                return "";
            }
        }
    },
    directives: {
        ClickOutside
    },
    components: {
        "dialog-confirm": require("./dialog-confirm")
    }
};
</script>

<style lang="scss" scoped>
$color-primary: #FD7F00;
$font-Roboto: Roboto;
$font-Lato: Lato;
$color-green: #64a064;
$color-red: #F44336;

#proin-dialog-promotion {
    .bg-backdrop {
        background: rgba(0, 0, 0, 0.55);
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 4;
        top: 0;
        left: 0;
    }

    .proin-md-dialog {
        position: fixed;
        width: 95%;
        max-width: 95% !important;
        height: 100%;
        z-index: 5;
        top: 0% !important;
        left: 2.5% !important;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
        background-color: #FFFFFF;
        border-radius: 2px;

        .dialog-title {
            display: flex;
            background: #fafafa;
            height: 60px;
            color: #414141;
            padding: 18px 0 18px 33px !important;

            .-text {
                width: 95%;
                margin: 0px !important;
                margin-bottom: 0px;
                font-family: Kanit;
                font-size: 20px;
                margin-left: 10px;
                text-align: left;
            }

            .-close {
                width: 5%;
                margin: 0px !important;
                cursor: pointer;
                margin-right: 30px;
                text-align: center;

                .md-icon {
                    margin-right: 25px !important;
                }
            }
        }

        .no-data {
            display: block;
            text-align: center;
            font-family: kanit;
            font-size: 14px;
            font-weight: 300;
            color: #414141;
            padding-top: 9px;
            padding-bottom: 9px;

            &.row-bg-orange:hover {
                border-radius: 4px;
                background: #FED8B2;
                color: #96704A !important;
            }
        }

        .layout-dialog {
            margin-right: 5px;
            padding: 15px 20px 20px 30px;
            // background-color: pink;
            height: calc(100vh - 65px);
            overflow-y: scroll;

            &::-webkit-scrollbar {
                height: 5px;
                width: 5px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba(0, 0, 0, 0.11);
                border-radius: 5px;
            }

            .block-promotion {
                padding: 25px 15px;
                border: 1px solid #BDBDBD !important;
                border-radius: 4px;

                .title-content {
                    width: 85%;
                    font-family: Kanit;
                    font-size: 16px;
                    font-weight: 400;
                    color: #5A5A5A;
                    text-align: left;
                    padding-left: 5px;
                    padding-top: 8px;
                }

                .select-dropdown {
                    width: 15%;
                    background: #EFEFEF;
                    border-radius: 4px;
                    height: 36px;

                    .md-input-container {
                        margin: 0px;
                        padding: 0px;
                        min-height: unset;

                        &::after {
                            background-color: unset;
                        }
                    }

                    .input-dropdown {
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
                            margin: 7px 10px 4px 5px;

                            &:not(.md-icon-delete) {
                                color: rgba(0, 0, 0, 0.54);
                            }
                        }
                    }

                    .options-dropdown {
                        position: absolute;
                        width: 98%;
                        z-index: 2;
                        margin-top: 36px;
                        margin-left: 2px;
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
                                background: #EFEFEF;
                                cursor: pointer;
                            }
                        }
                    }
                }

                #table-promotion {
                    font-family: kanit;
                    font-size: 14px;
                    font-weight: 300;
                    width: 100%;
                    margin-top: 15px;

                    .row-bg-orange:hover {
                        border-radius: 4px;
                        background: #FED8B2;
                        color: #96704A !important;
                    }

                    .row-bg-gray:hover {
                        border-radius: 4px;
                        background: #ececeb;
                        cursor: pointer;
                    }

                    .-selected {
                        // border-radius: 4px;
                        // border: 1px solid #FED8B2;
                        border-radius: 4px;
                        background: #FED8B2;
                        color: #96704A !important;
                    }

                    #divHeadUpdate {
                        width: 99.4%;
                        display: -webkit-box;
                        font-family: Roboto;
                        font-weight: bold;
                        color: #000000;
                        margin-top: 12px;
                        margin-bottom: 11px;

                        div {
                            // border: 1px solid pink;
                            padding-left: 5px;
                            padding-right: 5px;

                            &.-text-right {
                                text-align: right;
                            }

                            &.-text-left {
                                text-align: left;
                            }

                            &.-text-center {
                                text-align: center;
                            }
                        }
                    }

                    #divBodyUpdate {
                        width: 100%;
                        display: block;
                        height: calc(90vmin - 400px);
                        overflow-y: scroll;

                        >div {
                            width: 100%;
                            display: -webkit-inline-box;
                            padding-top: 9px;
                            padding-bottom: 9px;
                            color: #414141;

                            div {
                                // border: 1px solid pink;
                                padding-left: 5px;
                                padding-right: 5px;

                                &.-font-400 {
                                    font-weight: 400 !important;
                                    // color: #5A5A5A;
                                }

                                &.-text-right {
                                    text-align: right;
                                }

                                &.-text-left {
                                    text-align: left;
                                }

                                &.-text-center {
                                    text-align: center;
                                }

                                &.nowrap-title {
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }
                            }
                        }

                        &::-webkit-scrollbar {
                            height: 7px;
                            width: 7px;
                            // background: #f7f7f7;
                        }

                        &::-webkit-scrollbar-thumb {
                            background-color: rgba(0, 0, 0, 0.11);
                            border-radius: 5px;
                        }
                    }
                }
            }

            .block-info {
                margin-top: 15px;
                padding: 25px 15px;
                border: 1px solid #BDBDBD !important;
                border-radius: 4px;
                font-size: 16px;
                font-weight: 300;
                color: #5A5A5A;
                text-align: left;

                .title-content {
                    width: 90%;
                    font-family: Roboto;
                    padding-left: 5px;
                    padding-top: 3px;
                    font-weight: 400;
                }

                .chip-info {
                    width: 10%;
                    text-align: right;
                    margin-right: 5px;

                    .chip-status {
                        display: inline-block;
                        padding-left: 20px;
                        padding-right: 20px;
                        border-radius: 10px;
                        color: #fff;
                        font-size: 13px;
                        font-family: Roboto;
                        padding-top: 3px;
                        padding-bottom: 3px;

                        &.-active {
                            background-color: #66BB6A;
                        }

                        &.-inactive {
                            background-color: #f44336;
                        }
                    }
                }

                .-codetitle {
                    margin: 20px;
                    font-family: Kanit;
                    font-weight: 400;
                }

                .-detail {
                    font-family: Kanit;
                    margin: 0px 20px;
                }
            }

            .block-condition {
                margin-top: 15px;
                padding: 25px 15px 15px 15px;
                border: 1px solid #BDBDBD !important;
                border-radius: 4px;
                // font-size: 16px;
                font-weight: 400;
                color: #5A5A5A;
                text-align: left;

                width: 100%;
                // overflow-y: scroll;
                // height: calc(90vh - 120px);
                padding-right: 10px;
                // background-color: #f7f7f7;

                // &::-webkit-scrollbar {
                //     height: 7px;
                //     width: 5px;
                // }

                .title-content {
                    width: 90%;
                    font-family: Roboto;
                    padding-left: 5px;
                    padding-top: 3px;
                    font-weight: 400;
                    font-size: 16px;
                }

                #tab-0 {
                    color: #5A5A5A;
                    font-family: Roboto;
                }

                .mr-20 {
                    margin-right: 20px;
                }

                // .md-theme-default.md-tabs>nav.md-tabs-navigation {
                //     background-color: #ffffff;
                //     border-bottom: 1px solid #BDBDBD !important;
                // }

                // .md-tabs-navigation-container {

                // }

                .md-gutter:not(.md-column) {
                    margin: 0px;
                }

                .md-transparent {
                    color: #ffffff;
                    background-color: #3f51b5;

                    .md-icon {
                        color: #ffffff;
                    }

                    .main-title {
                        width: 625px;
                        padding-top: 8px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        height: 40px;
                    }

                    .sub-title {
                        width: 100px;
                        padding-left: 20px;
                        text-transform: uppercase;
                    }
                }

                .md-card {
                    margin: 5px 7px 13px 20px;

                    .md-card-header {
                        padding: 20px 5px 0 20px;

                        .md-card-header-text {
                            padding-top: 4px;
                        }

                        .mktops-subheader-text {
                            width: 25%;
                            font-size: 16px;
                            font-family: $font-Lato;
                            color: #414141;
                            font-weight: bold;

                            .md-button:before {
                                content: none;
                            }
                        }
                    }
                }

                .mktops-square-blue {
                    width: 30px;
                    height: 30px;
                    background-color: $color-primary;
                    border-radius: 4px;
                    line-height: 30px;
                    text-align: center;
                    font-size: 10px;
                    margin-top: 8px;

                    .md-icon {
                        color: #ffffff;
                    }
                }

                .md-tabs-navigation {
                    padding-left: unset;
                    border-bottom: 1px solid #d7d7d7;
                }

                .md-tab {
                    padding: 20px;
                }

                .md-tab-text & .md-tab-orange-text {
                    font-size: 14px;
                }

                .md-tab-orange-text {
                    color: $color-primary;
                    font-size: 12px;
                }

                .md-tab-orange-text.table {
                    font-weight: 400;
                }

                .rows-item {
                    padding-left: 0px;
                    margin-top: 16px;
                }

                .mr-20 {
                    margin-right: 20px;
                }

                .mktops-text-condition {
                    font-family: Roboto;
                    font-weight: 500;
                    font-size: 16px;
                    color: #000000;
                }

                .mktops-text-qty {
                    font-family: Roboto;
                    font-size: 16px;
                    color: #000000;
                }

                .section-line {
                    border-left: 1px solid #d7d7d7;
                    padding-right: 0px !important;
                }

                .section-sub-line {
                    border-left: 1px solid #d7d7d7;
                    height: 100%;
                    width: 5px;
                    margin-right: 18px;
                }

                .free-item {
                    display: flex;
                    margin-top: 14px;
                    border-left: 1px solid #d7d7d7;
                    color: #414141;
                    font-family: Roboto;
                }

                .-donthavedata {
                    font-size: 14px;
                    color: #929292;
                }

                .step-content-line {
                    margin-top: 14px;
                    display: flex;
                    padding-left: 10px;
                }

                .filter-chips {
                    margin-top: 7px;
                    font-family: kanit;

                    .md-chip {
                        width: 300px;
                        margin-top: 3px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        font-size: 13px;
                    }

                    .md-chip:focus:not(.md-disabled),
                    .md-chip:active:not(.md-disabled) {
                        cursor: unset;
                        box-shadow: none;
                    }

                    .md-chip.md-theme-default {
                        background-color: #FD7F00;
                        color: #ffffff;
                    }

                    &::-webkit-scrollbar {
                        height: 7px;
                        width: 5px;
                    }
                }

                .section-sub {
                    margin-top: 14px;
                    display: flex;
                    padding-left: 10px;
                }

                .mktops-produce-table,
                .mktops-info-table {
                    .md-table {
                        font-family: $font-Roboto;

                        .md-toolbar {
                            padding-right: unset;
                            border-bottom: 0;
                        }

                        .md-table-head-label {
                            font-size: 12px;
                            font-family: $font-Roboto;
                        }

                        .md-table-fixed-header {
                            padding: 0 0 0 13px;
                            margin-bottom: 5px;
                            margin-top: 7px;
                        }

                        .md-content.md-table-content.md-scrollbar.md-theme-default {
                            .md-table-row {
                                .md-table-cell-container {
                                    padding: 0 5px 0 7px;
                                }
                            }
                        }
                    }

                    .-break-word {
                        white-space: pre-wrap;
                        word-wrap: break-word;
                    }
                }

                .mktops-produce-table {
                    #table-manage-produce {
                        margin-left: 15px;
                        margin-right: 5px;
                        padding-bottom: 20px;

                        #divTableHead {
                            width: 99.1%;
                            display: -webkit-inline-box;
                            // font-size: 13px;
                            font-weight: bold;
                            margin-top: 15px;
                            margin-bottom: 10px;

                            color: rgba(0, 0, 0, .54);
                            font-size: 12px;
                            font-family: Roboto;

                            div {
                                // border: 1px solid pink;
                                padding-left: 5px;
                                padding-right: 5px;

                                &.-text-right {
                                    text-align: right;
                                }

                                &.-text-center {
                                    text-align: center;
                                }
                            }
                        }

                        #divTableFoot {
                            width: 99.1%;
                            display: -webkit-inline-box;
                            font-weight: bold;
                            margin-top: 10px;
                            margin-bottom: 10px;

                            // color: rgba(0, 0, 0, .54);
                            font-size: 12px;
                            font-family: Roboto;

                            div {
                                // border: 1px solid pink;
                                padding-left: 5px;
                                padding-right: 5px;

                                &.-text-right {
                                    text-align: right;
                                }

                                &.-text-center {
                                    text-align: center;
                                }
                            }
                        }

                        #divTableBody {
                            width: 100%;
                            height: calc(320px - 145px);
                            display: block;
                            overflow-y: scroll;
                            font-size: 13px;

                            >div {
                                width: 100%;
                                height: 35px;
                                display: -webkit-inline-box;
                                padding-top: 5px;
                                padding-bottom: 5px;

                                div {
                                    // border: 1px solid pink;
                                    padding: 3px 5px 0 5px;

                                    &.-text-right {
                                        text-align: right;
                                    }

                                    &.-text-center {
                                        text-align: center;
                                    }

                                    &.nowrap-title {
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }

                                    &.-netprice {
                                        color: #A8A8A8;
                                    }
                                }
                            }

                            .row-bg-orange:hover {
                                border-radius: 4px;
                                background: #FED8B2;
                                color: #96704A !important;
                            }

                            &::-webkit-scrollbar {
                                height: 7px;
                                width: 5px;
                            }
                        }
                    }

                }

                .mktops-info-table {
                    width: 100%;
                    text-align: left;
                    margin-bottom: 10px;

                    .info-table-content {
                        border-top: 0;
                        font-size: 14px;
                        color: rgba(0, 0, 0, 0.87);
                        font-weight: 500;
                        vertical-align: top;

                        >td {
                            padding-right: 10px;
                        }
                    }
                }

                .content-md-drawer {
                    margin-right: 4px;
                    overflow-y: scroll;
                    height: calc(100vh - 80px);
                }

                .content-md-drawer::-webkit-scrollbar {
                    height: 7px;
                    width: 5px;
                    background: #f7f7f7;
                }

                .content-md-drawer::-webkit-scrollbar-thumb {
                    background-color: #f7f7f7;
                    border-radius: 5px;
                }

                .md-dialog-container {
                    width: 100%;
                }

                .md-toolbar {
                    background-color: white !important;
                    box-shadow: unset !important;
                    border-bottom: 0 !important;

                    .title-panel {
                        // position: fixed;
                        width: 80%;
                        font-size: 18px;
                        font-weight: 500;
                        padding: 8px 15px 0;
                    }

                    .sub-title {
                        width: 15%;
                        text-align: right;
                        padding-top: 8px;
                    }

                    .md-menu {
                        width: 5%;
                        text-align: right;
                        padding-top: 8px;

                        .more-vert {
                            height: 25px;
                            width: 25px;
                            min-width: 25px;
                        }
                    }
                }

                #table-manage-promotions {
                    margin-left: 20px;
                    margin-right: 5px;
                    width: 95%;

                    #divTableHead {
                        width: 99.9%;
                        display: -webkit-inline-box;
                        font-weight: bold;
                        margin-top: 15px;
                        margin-bottom: 10px;

                        // color: rgba(0, 0, 0, .54);
                        color: #000000;
                        font-size: 12px;
                        font-family: Roboto;

                        div {
                            // border: 1px solid pink;
                            padding-left: 5px;
                            padding-right: 5px;

                            &.-text-right {
                                text-align: right;
                            }

                            &.-text-center {
                                text-align: center;
                            }
                        }
                    }

                    #divTableBody {
                        width: 100%;
                        font-size: 13px;
                        color: #414141;

                        >div {
                            width: 100%;
                            height: 35px;
                            display: -webkit-inline-box;
                            padding-top: 5px;
                            padding-bottom: 5px;

                            div {
                                // border: 1px solid pink;
                                padding: 3px 5px 0 5px;

                                &.-text-right {
                                    text-align: right;
                                }

                                &.-text-center {
                                    text-align: center;
                                }

                                &.nowrap-title {
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }

                                &.-netprice {
                                    color: #A8A8A8;
                                }
                            }
                        }

                        .row-bg-orange:hover {
                            border-radius: 4px;
                            background: #FED8B2;
                            color: #96704A !important;
                        }

                        &::-webkit-scrollbar {
                            height: 7px;
                            width: 5px;
                        }
                    }
                }

                .btn-none {
                    height: 36px;
                }

                // .-inactive-product,
                // .-inactive-product .-netprice {
                //     color: red !important;
                //     font-style: italic;
                // }

                .md-layout.md-gutter>.md-layout-item {
                    padding-right: 12px;
                    padding-left: 12px;
                }
            }

            .block-product {
                margin-top: 15px;
                padding: 25px 15px;
                border: 1px solid #BDBDBD !important;
                border-radius: 4px;
                font-size: 16px;
                font-weight: 300;
                color: #5A5A5A;
                text-align: left;

                .title-content {
                    width: 90%;
                    font-family: Roboto;
                    padding-left: 5px;
                    padding-top: 3px;
                    font-weight: 400;
                }

                #table-product {
                    font-family: kanit;
                    font-size: 14px;
                    font-weight: 300;
                    width: 100%;
                    margin-top: 10px;

                    .row-bg-orange:hover {
                        border-radius: 4px;
                        background: #FED8B2;
                        color: #96704A !important;
                    }

                    #divHeadUpdate {
                        width: 99.4%;
                        display: -webkit-box;
                        font-family: Roboto;
                        font-weight: bold;
                        color: #000000;
                        margin-top: 12px;
                        margin-bottom: 11px;

                        div {
                            // border: 1px solid pink;
                            padding-left: 5px;
                            padding-right: 5px;

                            &.-text-right {
                                text-align: right;
                            }

                            &.-text-left {
                                text-align: left;
                            }

                            &.-text-center {
                                text-align: center;
                            }
                        }
                    }

                    #divBodyUpdate {
                        width: 100%;
                        display: block;
                        height: calc(90vmin - 395px);
                        overflow-y: scroll;

                        >div {
                            width: 100%;
                            display: -webkit-inline-box;
                            padding-top: 9px;
                            padding-bottom: 9px;
                            color: #414141;

                            div {
                                // border: 1px solid pink;
                                padding-left: 5px;
                                padding-right: 5px;

                                &.-font-400 {
                                    font-weight: 400 !important;
                                    // color: #5A5A5A;
                                }

                                &.-text-right {
                                    text-align: right;
                                }

                                &.-text-left {
                                    text-align: left;
                                }

                                &.-text-center {
                                    text-align: center;
                                }

                                &.nowrap-title {
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }
                            }
                        }

                        &::-webkit-scrollbar {
                            height: 7px;
                            width: 7px;
                            // background: #f7f7f7;
                        }

                        &::-webkit-scrollbar-thumb {
                            background-color: rgba(0, 0, 0, 0.11);
                            border-radius: 5px;
                        }
                    }
                }
            }
        }
    }
}
</style><style lang="scss">
.md-theme-default.md-tabs>.md-tabs-navigation {
    background-color: #ffffff !important;
    border-bottom: 1px solid #BDBDBD !important;
    margin-top: 15px
}

.md-theme-default.md-tabs>.md-tabs-navigation .md-tab-indicator {
    background-color: #FD7F00;
    height: 3px !important;
}

.md-theme-default.md-tabs>.md-tabs-navigation .md-tab-header.md-active {
    color: #FD7F00 !important;
}

.md-tab-header-container span {
    font-size: 16px;
    font-family: Kanit;
    // color: #797979;
    font-weight: 400;
}
</style>
