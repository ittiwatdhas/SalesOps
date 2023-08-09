<template>
<div id="proin-dialog-volume-pricing">
    <!-- <md-button :class="'md-raised -btn-gray -btn-orange'" @click="openDialog()">
        <label>VOLUME PRICING</label>
    </md-button> -->

    <md-spinner :md-size="150" :md-stroke="1" md-indeterminate v-show="(loadingPage)" style="position: fixed; z-index: 10; top: 23%; left: 45%;"></md-spinner>

    <div :class="(showDialog) ? 'bg-backdrop' : ''"></div>
    <div class="proin-md-dialog" v-show="(showDialog)">
        <div class="dialog-title">
            <div class="-text">Volume Pricing</div>
            <div class="-close">
                <md-icon style="cursor:pointer;margin-right:30px" @click.native="closeDialog">close</md-icon>
            </div>
        </div>

        <div class="layout-dialog">
            <div class="dialog-left-panel">




                <div style="height: 40%">
                    
                <div class="md-layout layout-input-value" style="padding-left: 0px; display: block; margin-top: 15px;">
                    <div class="md-layout-item">
                        <div class="md-layout layout-input-value">
                            <div style="width: 100%;">
                                <div style="text-align: left;"><label>Title</label></div>
                                <div class="display-mode -font-kanit nowrap-title" style="text-align: left;">
                                    <md-tooltip v-show="dataTable.length > 0" md-direction="bottom" class="mds-tooltips">{{ vTitle }}</md-tooltip>
                                    <label v-if="dataTable.length === 0" style="line-height: 50px; display: inline-block;"></label>
                                    <label v-else>{{vTitle}}</label>
                                </div>

                                <div class="-textarea" style="text-align: left;">
                                    <label>Detail</label>
                                    <textarea v-model="vDetail" :disabled="true"></textarea>
                                </div>

                                <div style="width: 100%; display: flex; text-align: left;">
                                    <div style="width: 35%; margin-top: 12px;"><label>Type</label></div>
                                </div>
                                <div v-if="dataTable.length === 0" style="width: 100%; line-height: 50px; display: inline-block;"></div>
                                <div v-else style="width: 100%; display: flex; text-align: left;">
                                    <div style="width: 35%;" class="display-mode -font-kanit"><label>{{ (mixSwitch == true) ? "Mixable" : "Independent" }}</label></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
                
                <div style="height: 60%">
                    <div class="md-layout layout-input-value">
                    <div class="md-layout-item quantity-condition">
                        <div class="display-flex -head" style="padding-left: 55px;">
                            <!-- <div class="con-type"></div> -->
                            <div style="width: 160px;">QUANTITY CONDITION</div>
                        </div>
                        <div class="display-flex -head" style="margin-top: 20px;">
                            <div class="con-type"></div>
                            <div class="value-type">Start</div>
                            <div class="-null"></div>
                            <div class="value-type">End</div>
                        </div>
                        <div class="-group-condition">
                            <div class="display-flex" style="margin-top: 0px;">
                                <div class="con-type">A3 &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="A3_start" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                                <div class="-null">&ensp; - &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="A3" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                            </div>

                            <div class="display-flex">
                                <div class="con-type">C3 &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C3_start" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                                <div class="-null">&ensp; - &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C3" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                            </div>

                            <div class="display-flex">
                                <div class="con-type">C2 &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C2_start" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                                <div class="-null">&ensp; - &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C2" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                            </div>

                            <div class="display-flex">
                                <div class="con-type">C1 &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C1_start" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                                <div class="-null">&ensp; - &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C1" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                            </div>

                            <div class="display-flex">
                                <div class="con-type">C0 &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C0_start" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                                <div class="-null">&ensp; - &ensp;</div>
                                <div class="con-type" style="color: #797979;">MORE</div>
                            </div>
                        </div>
                    </div>
               </div>

                </div>

                <!-- <div class="md-layout layout-input-value" style="padding-left: 0px; display: block; margin-top: 15px;">
                    <div class="md-layout-item">
                        <div class="md-layout layout-input-value">
                            <div style="width: 100%;">
                                <div style="text-align: left;"><label>Title</label></div>
                                <div class="display-mode -font-kanit nowrap-title" style="text-align: left;">
                                    <md-tooltip v-show="dataTable.length > 0" md-direction="bottom" class="mds-tooltips">{{ vTitle }}</md-tooltip>
                                    <label v-if="dataTable.length === 0" style="line-height: 50px; display: inline-block;"></label>
                                    <label v-else>{{vTitle}}</label>
                                </div>

                                <div class="-textarea" style="text-align: left;">
                                    <label>Detail</label>
                                    <textarea v-model="vDetail" :disabled="true"></textarea>
                                </div>

                                <div style="width: 100%; display: flex; text-align: left;">
                                    <div style="width: 35%; margin-top: 12px;"><label>Type</label></div>
                                </div>
                                <div v-if="dataTable.length === 0" style="width: 100%; line-height: 50px; display: inline-block;"></div>
                                <div v-else style="width: 100%; display: flex; text-align: left;">
                                    <div style="width: 35%;" class="display-mode -font-kanit"><label>{{ (mixSwitch == true) ? "Mixable" : "Independent" }}</label></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
<!-- 
                    <div class="md-layout layout-input-value">
                    <div class="md-layout-item quantity-condition">
                        <div class="display-flex -head" style="padding-left: 55px;">
                           
                            <div style="width: 160px;">QUANTITY CONDITION</div>
                        </div>
                        <div class="display-flex -head" style="margin-top: 20px;">
                            <div class="con-type"></div>
                            <div class="value-type">Start</div>
                            <div class="-null"></div>
                            <div class="value-type">End</div>
                        </div>
                        <div class="-group-condition">
                            <div class="display-flex" style="margin-top: 0px;">
                                <div class="con-type">A3 &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="A3_start" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                                <div class="-null">&ensp; - &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="A3" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                            </div>

                            <div class="display-flex">
                                <div class="con-type">C3 &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C3_start" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                                <div class="-null">&ensp; - &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C3" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                            </div>

                            <div class="display-flex">
                                <div class="con-type">C2 &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C2_start" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                                <div class="-null">&ensp; - &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C2" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                            </div>

                            <div class="display-flex">
                                <div class="con-type">C1 &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C1_start" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                                <div class="-null">&ensp; - &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C1" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                            </div>

                            <div class="display-flex">
                                <div class="con-type">C0 &ensp;</div>
                                <div class="value-type">
                                    <md-input-container class="-md-input input-disabled">
                                        <md-input v-model="C0_start" :disabled="true"></md-input>
                                    </md-input-container>
                                </div>
                                <div class="-null">&ensp; - &ensp;</div>
                                <div class="con-type" style="color: #797979;">MORE</div>
                            </div>
                        </div>
                    </div>
               </div> -->


            </div>

            <div class="dialog-right-panel">
                <div class="md-layout" style="padding-left: 2px; margin-top: 5px;">
                    <div class="md-layout-item">
                        <div id="table-volume-pricing">
                            <div id="divHeadUpdate" class="display">
                                <div style="width: 40%;" class="-text-left">Item ({{ formatNumber(dataTable.length, 0) }})</div>
                                <div style="width: 10%;" class="-text-right">A3</div>
                                <div style="width: 10%;" class="-text-right">C3</div>
                                <div style="width: 10%;" class="-text-right">C2</div>
                                <div style="width: 10%;" class="-text-right">C1</div>
                                <div style="width: 10%;" class="-text-right">C0</div>
                                <div style="width: 10%; padding-left: 15px;" class="-text-left">Unit</div>
                            </div>
                            <div id="divBodyUpdate" class="display">
                                <!-- <div :class="'row-bg-orange'" v-for="(item, updateIndex) in dataTable" :key="updateIndex"> -->
                        
                                <div v-if="dataTable.length === 0" class="row-bg-orange" style="display: block; text-align: center;">No data in table.</div>
                                <div :style="{'color':item.status_show === 'active' ? '' : '#EFEFEF'}" v-else :class="(value == item.item_code) ? '-selected' : 'row-bg-gray'" v-for="(item, updateIndex) in dataTable" :key="updateIndex" :id="(value == item.item_code) ? 'rowSelected' : ''">
                                    <div style="width: 40%;" class="-text-left nowrap-title -font-400">
                                        <md-tooltip md-direction="bottom" class="mds-tooltips">{{ item.item_code }} {{ item.item_name }}</md-tooltip>
                                        <span>{{ item.item_code }} {{ item.item_name }}</span>
                                    </div>
                           
                                    <div style="width: 10%;" class="-text-right">{{ formatNumber(item.qty_a3, 2) }}</div>
                                    <div style="width: 10%;" class="-text-right">{{ formatNumber(item.qty_c3, 2) }}</div>
                                    <div style="width: 10%;" class="-text-right">{{ formatNumber(item.qty_c2, 2) }}</div>
                                    <div style="width: 10%;" class="-text-right">{{ formatNumber(item.qty_c1, 2) }}</div>
                                    <div style="width: 10%;" class="-text-right">{{ formatNumber(item.qty_c0, 2) }}</div>
                                    <div style="width: 10%; padding-left: 15px;" class="-text-left">{{ item.saleprice_um_title }}</div>
                                </div>
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
import promotionInformationService from "@/services/orders/promotioninformation";
export default {
    name: "dialog-volume-pricing",
    props: ["value", "showDialog"],
    data() {
        return {
            snackbarContent: "",
            vertical: "bottom",
            horizontal: "center",
            duration: 4000,
            loadingPage: false,
            // showDialog: false,
            dataTable: [],
            C3: 0,
            C2: 0,
            C1: 0,
            C0: 0,
            A3: 0,
            C3_start: 0,
            C2_start: 0,
            C1_start: 0,
            C0_start: 0,
            A3_start: 0,
            dialogContent: "Do you want to close ?",
            dialogConfirmClose: false,
            vTitle: "",
            vDetail: "",
            mixSwitch: true
        };
    },
    created() {},
    watch: {
        showDialog(){
            let self = this;
            self.loadingPage = true;

            this.dataTable = [];
            this.vTitle = "";
            this.vDetail = "";
            this.C3 = 0;
            this.C2 = 0;
            this.C1 = 0;
            this.C0 = 0;
            this.A3 = 0;
            this.C3_start = 0;
            this.C2_start = 0;
            this.C1_start = 0;
            this.C0_start = 0;
            this.A3_start = 0;

            promotionInformationService.GetVolumePricing(this.value)
                .then(response => {
                    if (response.length > 0) {
                        self.vTitle = response[0].h_name;
                        self.vDetail = response[0].h_detail;
                        if (response[0].type == "Mixable") {
                            this.mixSwitch = true;
                        } else {
                            this.mixSwitch = false;
                        }
                        self.A3_start = (response[0].qty_a3[0].start == "" || response[0].qty_a3[0].start == null) ? 0 : response[0].qty_a3[0].start;
                        self.A3 = (response[0].qty_a3[0].end == "" || response[0].qty_a3[0].end == null) ? 0 : response[0].qty_a3[0].end;
                        if (response[0].qty_c3 != null) {
                            self.C3_start = (response[0].qty_c3[0].start == "" || response[0].qty_c3[0].start == null) ? 0 : response[0].qty_c3[0].start;
                            self.C3 = (response[0].qty_c3[0].end == "" || response[0].qty_c3[0].end == null) ? 0 : response[0].qty_c3[0].end;
                        }
                        self.C2_start = (response[0].qty_c2[0].start == "" || response[0].qty_c2[0].start == null) ? 0 : response[0].qty_c2[0].start;
                        self.C2 = (response[0].qty_c2[0].end == "" || response[0].qty_c2[0].end == null) ? 0 : response[0].qty_c2[0].end;
                        self.C1_start = (response[0].qty_c1[0].start == "" || response[0].qty_c1[0].start == null) ? 0 : response[0].qty_c1[0].start;
                        self.C1 = (response[0].qty_c1[0].end == "" || response[0].qty_c1[0].end == null) ? 0 : response[0].qty_c1[0].end;
                        self.C0_start = (response[0].qty_c0[0].start == "" || response[0].qty_c0[0].start == null) ? 0 : response[0].qty_c0[0].start;

                        response[0].details.forEach(function (value, key) {
                            self.dataTable.push({
                                item_code: value.item_code,
                                item_name: value.item_name,
                                cost: (value.cost) ? value.cost : "",
                                qty_a3: value.qty_a3,
                                qty_c0: value.qty_c0,
                                qty_c1: value.qty_c1,
                                qty_c2: value.qty_c2,
                                qty_c3: value.qty_c3,
                                saleprice_um_title: value.saleprice_um_title,
                                status_show: value.status_show
                            });
                        });
                       
                        self.dataTable.sort((a, b) => (a.item_code > b.item_code ) ? -1 : 1)
                        self.dataTable.sort((c, d) => (c.status_show > d.status_show) ? 1 : -1)
                       
                        // self.showDialog = true;
                        self.loadingPage = false;

                        self.$nextTick(() => {
                            let temp = document.getElementById("rowSelected");
                            if (temp != "") {
                                temp.scrollIntoView({
                                    // behavior: "smooth"
                                    behavior: "auto"
                                });
                            }
                        });

                    } else {
                        // this.snackbarContent = "No data of Volume Pricing.";
                        // this.$refs.snackbar.open();
                        self.loadingPage = false;
                        return;
                    }
                });
        }
    },
    computed: {},
    methods: {
        onCloseDialog(boolean) {
            this.dialogConfirmClose = boolean;
        },
        onConfirmDialog(boolean) {
            this.dialogConfirmClose = boolean;
            // this.dataTable = [];
            // this.C3 = 0;
            // this.C2 = 0;
            // this.C1 = 0;
            // this.C0 = 0;
            // this.A3 = 0;
            // this.C3_start = 0;
            // this.C2_start = 0;
            // this.C1_start = 0;
            // this.C0_start = 0;
            // this.A3_start = 0;
            // this.showDialog = false;
            this.$emit("confirm");
        },
        // openDialog() {
        //     if (this.value == "") {
        //         this.snackbarContent = "Please Select Item Code";
        //         this.$refs.snackbar.open();
        //         return;
        //     }

            // let self = this;
            // self.loadingPage = true;
            // promotionInformationService.GetVolumePricing(this.value)
            //     .then(response => {
            //         if (response.length > 0) {
            //             self.vTitle = response[0].h_name;
            //             if (response[0].type == "Mixable") {
            //                 this.mixSwitch = true;
            //             } else {
            //                 this.mixSwitch = false;
            //             }
            //             self.A3_start = (response[0].qty_a3[0].start == "" || response[0].qty_a3[0].start == null) ? 0 : response[0].qty_a3[0].start;
            //             self.A3 = (response[0].qty_a3[0].end == "" || response[0].qty_a3[0].end == null) ? 0 : response[0].qty_a3[0].end;
            //             if (response[0].qty_c3 != null) {
            //                 self.C3_start = (response[0].qty_c3[0].start == "" || response[0].qty_c3[0].start == null) ? 0 : response[0].qty_c3[0].start;
            //                 self.C3 = (response[0].qty_c3[0].end == "" || response[0].qty_c3[0].end == null) ? 0 : response[0].qty_c3[0].end;
            //             }
            //             self.C2_start = (response[0].qty_c2[0].start == "" || response[0].qty_c2[0].start == null) ? 0 : response[0].qty_c2[0].start;
            //             self.C2 = (response[0].qty_c2[0].end == "" || response[0].qty_c2[0].end == null) ? 0 : response[0].qty_c2[0].end;
            //             self.C1_start = (response[0].qty_c1[0].start == "" || response[0].qty_c1[0].start == null) ? 0 : response[0].qty_c1[0].start;
            //             self.C1 = (response[0].qty_c1[0].end == "" || response[0].qty_c1[0].end == null) ? 0 : response[0].qty_c1[0].end;
            //             self.C0_start = (response[0].qty_c0[0].start == "" || response[0].qty_c0[0].start == null) ? 0 : response[0].qty_c0[0].start;

            //             response[0].details.forEach(function (value, key) {
            //                 self.dataTable.push({
            //                     item_code: value.item_code,
            //                     item_name: value.item_name,
            //                     cost: (value.cost) ? value.cost : "",
            //                     qty_a3: value.qty_a3,
            //                     qty_c0: value.qty_c0,
            //                     qty_c1: value.qty_c1,
            //                     qty_c2: value.qty_c2,
            //                     qty_c3: value.qty_c3,
            //                     saleprice_um_title: value.saleprice_um_title
            //                 });
            //             });

            //             self.dataTable.sort((a, b) => (a.item_code > b.item_code) ? 1 : -1)
            //             self.showDialog = true;
            //             self.loadingPage = false;

            //             self.$nextTick(() => {
            //                 let temp = document.getElementById("rowSelected");
            //                 if (temp != "") {
            //                     temp.scrollIntoView({
            //                         // behavior: "smooth"
            //                         behavior: "auto"
            //                     });
            //                 }
            //             });

            //         } else {
            //             this.snackbarContent = "No data of Volume Pricing.";
            //             this.$refs.snackbar.open();
            //             self.loadingPage = false;
            //             return;
            //         }
            //     });
        // },
        closeDialog() {
            this.dialogConfirmClose = true;
        },
        formatNumber(value, dicimal) {
            return promotionInformationService.formatNumber(value, dicimal);
        }
    },
    components: {
        "dialog-confirm": require("./dialog-confirm")
    }
};
</script>

<style lang="scss" scoped>
#proin-dialog-volume-pricing {
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

        .layout-dialog {
            padding: 0px 15px 5px 25px;
            display: flex;
            height: 100%;

            .md-layout .md-layout-item {
                width: 100%;
            }

            .dialog-left-panel {
                width: 25%;
                height: 100%;
                // background-color: pink;

                .-textarea {
                    // padding-left: 14px;
                    width: 100%;
                    color: #727272;
                    margin-top: 10px;

                    textarea {
                        width: 95% !important;
                        min-width: 95%;
                        max-width: 95%;
                        min-height: 115px;
                        max-height: 145px;
                        font-size: 15px;
                        font-weight: 400;
                        font-family: kanit;
                        margin-top: 10px;
                        padding-left: 8px;
                        padding-right: 13.8px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        background: #fff;
                    }
                    ::placeholder {
                        color: #BDBDBD;
                        opacity: 1;
                        font-size: 14px;
                        font-family: lato;
                    }
                }
            }

            .dialog-right-panel {
                width: 75%;
                height: 100%;
                // background-color: plum;

                #table-volume-pricing {
                    font-family: kanit;
                    font-size: 14px;
                    font-weight: 300;

                    .row-bg-orange:hover {
                        border-radius: 4px;
                        background: #FED8B2;
                        color: #96704A !important;
                    }

                    .row-bg-gray:hover {
                        border-radius: 4px;
                        background: #ececeb;
                    }

                    .-selected {
                        // border-radius: 4px;
                        // border: 1px solid #FED8B2;
                        border-radius: 4px;
                        background: #FED8B2;
                        color: #96704A !important;
                    }

                    #divHeadUpdate {
                        width: 99.1%;
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
                        height: calc(100vh - 130px);
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
                            width: 8px;
                            // background: #f7f7f7;
                        }

                        &::-webkit-scrollbar-thumb {
                            background-color: rgba(0, 0, 0, 0.11);
                            border-radius: 5px;
                        }
                    }
                }
            }

            .layout-input-value {
                .md-has-value>label {
                    color: #727272;
                }

                .display-mode {
                    font-size: 16px;
                    color: #000000;
                    margin-top: 4px;

                    &.nowrap-title {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: block;
                    }
                }
            }

            .md-layout {
                padding-left: 7px;

                .display-flex {
                    &.-head {
                        font-family: Roboto;
                        font-size: 14px;
                        color: #000000;
                    }
                }

                .quantity-condition {
                    margin-top: 20px;
                    padding-left: 7px;

                    .display-flex {
                        width: 100%;
                        display: flex;
                        text-align: center;

                        .con-type {
                            width: 20%;
                            margin-top: 10px;
                        }

                        .value-type {
                            width: 65px;
                        }

                        .-null {
                            width: 30px;
                            margin-top: 10px;
                        }
                    }

                    >label {
                        color: #000000;
                        opacity: 1;
                        font-size: 13px;
                    }

                    .-group-condition {
                        font-family: Lato;
                        font-size: 16px;
                        color: #000000;
                        margin-top: 3px;

                        .display-flex {
                            margin-top: 20px;
                        }

                        span {
                            margin-top: 10px;
                        }

                        div {
                            max-height: 32px;
                        }

                        .-md-input {
                            padding-top: unset;
                            width: 65px;
                            min-height: 29.7px;
                            background-color: #ffffff;
                            border-radius: 4px;
                            box-shadow: 0 0 3px rgba(0, 0, 0, 0.16), 0 0 0 rgba(0, 0, 0, 0),
                                0 1px 1px -2px rgba(0, 0, 0, 0);

                            &.md-input-container:after,
                            &.md-input-container:before {
                                content: none;
                                background-image: none;
                            }

                            >input {
                                z-index: 1;
                                width: 58.5px;
                                font-size: 14px;
                                text-align: center;
                                // -webkit-text-fill-color: #3f51b5;
                                -webkit-text-fill-color: #fff;
                            }

                            &.input-disabled {
                                >input {
                                    // background-color: #f1f1f1;
                                    background-color: #FD7F00;
                                    border-radius: 4px;
                                }
                            }

                            >span {
                                // margin-top: 31px;
                                // margin-left: 24px;
                                position: absolute;
                                padding-top: 25px;
                                padding-left: 24px;
                                font-size: 11px;
                                opacity: 0.5;
                            }
                        }

                        .-flex-relative {
                            display: flex;
                            position: relative;
                            color: #000000;

                            #span-a3 {
                                position: absolute;
                                padding-top: 29px;
                                font-size: 11px;
                                opacity: 0.5;
                            }

                            #span-c0 {
                                position: absolute;
                                padding-top: 29px;
                                padding-left: 40px;
                                font-size: 11px;
                                opacity: 0.5;
                            }
                        }
                    }
                }

                &.-btn-right {
                    text-align: right;

                    .btn-cancel {
                        background-color: rgb(153, 155, 168);
                        color: white;
                        width: 108.64px;
                        height: 32px;
                    }

                    .btn-save {
                        margin-right: 0px;
                        width: 83.97px;
                        height: 32px;
                    }
                }

                .md-switch {
                    margin-left: 7px;
                    margin-bottom: 10px;
                }

                .-txt-items {
                    padding-top: 23px;
                    padding-left: 3px;
                    font-size: 14px;
                    font-weight: bold;
                }

                .-add-product {
                    width: 25%;
                    padding-top: 25px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #3f51b5;
                    text-transform: uppercase;

                    #add-product {
                        cursor: pointer;
                    }
                }

                .filter-table {
                    text-align: right;

                    input {
                        width: 85%;
                        margin-top: 14px;
                        padding-left: 8px;
                        padding-right: 13.8px;
                        height: 36px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        background: #fff;
                    }

                    ::placeholder {
                        color: #BDBDBD;
                        opacity: 1;
                        font-family: kanit;
                        font-size: 12px;
                        font-weight: 100;
                    }
                }

                .-delete-back {
                    color: #b3b3b3;
                    cursor: pointer;
                }

                .mktops-control-box {
                    margin-top: 5px;

                    .head-search-price {
                        display: flex;

                        .md-search-box {
                            margin: 10px 10px 10px 0px;
                            padding-top: unset;
                            width: 80%;
                            border-radius: 3px;
                            min-height: 36px;
                            box-shadow: 0 0 3px rgba(0, 0, 0, 0.16), 0 0 0 rgba(0, 0, 0, 0),
                                0 1px 1px -2px rgba(0, 0, 0, 0);

                            .md-icon.material-icons {
                                margin-top: 6px;
                                margin-left: 12px;
                                margin-right: 5px;
                                color: rgba(0, 0, 0, 0.54);

                                &.-search-back {
                                    margin-top: 7px;
                                    margin-right: 10px;
                                }
                            }

                            .md-input {
                                height: 36px;
                                margin-left: 7px;
                            }

                            &.md-input-container:after,
                            &.md-input-container:before {
                                content: none;
                            }
                        }
                    }

                    .treeview-box {
                        width: 100%;
                        margin-top: 9px;
                        margin-bottom: 5px;

                        .vue-treeselect__multi-value {
                            margin: 0;
                        }

                        .vue-treeselect__multi-value-item-container {
                            display: none;
                        }

                        .vue-treeselect__limit-tip-text {
                            display: none;
                        }

                        .vue-treeselect__input-container {
                            padding-top: 1px;
                            padding-left: 5px;
                        }

                        .vue-treeselect__label-container {
                            label {
                                &.nowrap-title {
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: block;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
