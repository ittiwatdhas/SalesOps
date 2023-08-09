<template>
<div id="proin-dialog-packing">
    <!-- <md-button id="btnPricing" :class="'md-raised -btn-gray -btn-orange'" @click="openDialog()">
        <label>PACKING</label>
    </md-button> -->

    <md-spinner :md-size="150" :md-stroke="1" md-indeterminate v-show="(loadingPage)" style="position: fixed; z-index: 10; top: 23%; left: 45%;"></md-spinner>

    <div :class="(showDialog) ? 'bg-backdrop' : ''"></div>
    <div class="proin-md-dialog" v-show="(showDialog)">
        <div class="dialog-title">
            <div class="-text">Packing</div>
            <div class="-close">
                <md-icon style="cursor:pointer;margin-right:30px" @click.native="closeDialog">close</md-icon>
            </div>
        </div>

        <div class="layout-dialog">
            <div class="title-content">{{ value }} : {{ descriptionTH }}</div>
            <!--<div class="md-layout" style="padding-left: 2px; margin-top: 5px;">-->
            <div v-if="checkData === true" class="row-bg-orange" style="display: block; text-align: center; line-height: 50px;">No data.</div>
            <div v-else>
                <div class="md-layout row-content" md-align="center">
                    <md-layout md-flex="45" class="display-info">
                        <md-input-container md-theme class="-readonly">
                            <div class="auto-search">
                                <label class="value-label">Product Type</label>
                                <md-tooltip md-direction="bottom" class="mds-tooltips">{{ data.productType }}</md-tooltip>
                                <md-input v-model="data.productType" readonly='readonly'></md-input>
                            </div>
                        </md-input-container>
                    </md-layout>
                    <md-layout md-flex="10" class="display-info"></md-layout>
                    <md-layout md-flex="45" class="display-info">
                        <md-input-container md-theme class="-readonly">
                            <div class="auto-search">
                                <label class="value-label">Product Class</label>
                                <md-tooltip md-direction="bottom" class="mds-tooltips">{{ data.productClass }}</md-tooltip>
                                <md-input v-model="data.productClass" readonly='readonly'></md-input>
                            </div>
                        </md-input-container>
                    </md-layout>
                </div>
                <div class="md-layout row-content" md-align="center">
                    <md-layout md-flex="45" class="display-info">
                        <md-input-container md-theme class="-readonly">
                            <div class="auto-search">
                                <label class="value-label">Item Group</label>
                                <md-tooltip md-direction="bottom" class="mds-tooltips">{{ data.itemGroup }}</md-tooltip>
                                <md-input v-model="data.itemGroup" readonly='readonly'></md-input>
                            </div>
                        </md-input-container>
                    </md-layout>
                    <md-layout md-flex="10" class="display-info"></md-layout>
                    <md-layout md-flex="45" class="display-info">
                        <md-input-container md-theme class="-readonly">
                            <div class="auto-search">
                                <label class="value-label">Convert of Selling Unit</label>
                                <md-input v-model="data.sellingUnitConv" readonly='readonly'></md-input>
                            </div>
                        </md-input-container>
                    </md-layout>
                </div>
                <div class="md-layout row-content" md-align="center">
                    <md-layout md-flex="45" class="display-info">
                        <md-input-container md-theme class="-readonly">
                            <div class="auto-search">
                                <label class="value-label">Stocking Unit</label>
                                <md-input v-model="data.stockUnit" readonly='readonly'></md-input>
                            </div>
                        </md-input-container>
                    </md-layout>
                    <md-layout md-flex="10" class="display-info"></md-layout>
                    <md-layout md-flex="45" class="display-info">
                        <md-input-container md-theme class="-readonly">
                            <div class="auto-search">
                                <label class="value-label">Selling Unit</label>
                                <md-input v-model="data.sellingUnit" readonly='readonly'></md-input>
                            </div>
                        </md-input-container>
                    </md-layout>
                </div>
                <div class="md-layout row-content" md-align="center">
                    <md-layout md-flex="45" class="display-info">
                        <md-input-container md-theme class="-readonly">
                            <div class="auto-search">
                                <label class="value-label">Minimum-Pick</label>
                                <md-input v-model="data.minimumPick" readonly='readonly'></md-input>
                            </div>
                        </md-input-container>
                    </md-layout>
                    <md-layout md-flex="10" class="display-info"></md-layout>
                    <md-layout md-flex="45" class="display-info">
                        <md-input-container md-theme class="-readonly">
                            <div class="auto-search">
                                <label class="value-label">Inner Box (Conversion)</label>
                                <md-input v-model="data.innerBox" readonly='readonly'></md-input>
                            </div>
                        </md-input-container>
                    </md-layout>
                </div>
                <div class="md-layout row-content" md-align="center">
                    <md-layout md-flex="45" class="display-info">
                        <md-input-container md-theme class="-readonly">
                            <div class="auto-search">
                                <label class="value-label">Outer Box (Conversion)</label>
                                <md-input v-model="data.outerBox" readonly='readonly'></md-input>
                            </div>
                        </md-input-container>
                    </md-layout>
                    <md-layout md-flex="10" class="display-info"></md-layout>
                    <md-layout md-flex="45" class="display-info">
                        <md-input-container md-theme class="-readonly">
                            <div class="auto-search">
                                <label class="value-label">Pallet (Conversion)</label>
                                <md-input v-model="data.pallet" readonly='readonly'></md-input>
                            </div>
                        </md-input-container>
                    </md-layout>
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
    name: "dialog-packing",
    props: ["value", "descriptionTH", "showDialog"],
    data() {
        return {
            data: [],
            snackbarContent: "",
            vertical: "bottom",
            horizontal: "center",
            duration: 4000,
            loadingPage: false,
            // showDialog: false,
            dialogContent: "Do you want to close ?",
            dialogConfirmClose: false,
            checkData: false
        };
    },
    components: {
        "dialog-confirm": require("./dialog-confirm")
    },
    created() {},
    watch: {
        showDialog(){
            let self = this;
            self.loadingPage = true;
            promotionInformationService.GetPacking(this.value)
                .then(response => {
                    if (response.data !== undefined && response.data.length > 0) {
                        let rs = response.data[0];
                        self.data['productType'] = rs.productype_code + ' ' + rs.productype_title;
                        self.data['productClass'] = rs.productlifecycle_code + ' ' + rs.productlifecycle_title
                        self.data['itemGroup'] = rs.itemgroup_code + ' ' + rs.itemgroup_title
                        self.data['sellingUnitConv'] = rs.selling_um_conv
                        self.data['sellingUnit'] = rs.selling_um + ' (' + rs.selling_um_title + ')'
                        self.data['stockUnit'] = rs.stock_um_code + ' (' + rs.stock_um_title + ')'
                        self.data['minimumPick'] = rs.minimum_pick + ' (' + rs.stock_um_title + ')'
                        self.data['innerBox'] = rs.innerpack_um_conv + ' (' + rs.innerpack_um_title + ')'
                        self.data['outerBox'] = rs.case_um_conv + ' (' + rs.case_um_title + ')'
                        self.data['pallet'] = rs.pallet_um_conv + ' (' + rs.pallet_um_title + ')'

                        // self.showDialog = true;
                        self.loadingPage = false;
                    } else {
                        this.checkData = true;
                        // this.snackbarContent = "No data of Packing.";
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
            this.data = [];
            this.checkData = false;
            this.$emit("confirm");
            // this.showDialog = false;
        },
        // openDialog() {
        //     if (this.value == "") {
        //         this.snackbarContent = "Please Select Item Code";
        //         this.$refs.snackbar.open();
        //         return;
        //     }

        //     let self = this;
        //     self.loadingPage = true;
        //     promotionInformationService.GetPacking(this.value)
        //         .then(response => {
        //             if (response.data !== undefined && response.data.length > 0) {
        //                 let rs = response.data[0];
        //                 self.data['productType'] = rs.productype_code + ' ' + rs.productype_title;
        //                 self.data['productClass'] = rs.productlifecycle_code + ' ' + rs.productlifecycle_title
        //                 self.data['itemGroup'] = rs.itemgroup_code + ' ' + rs.itemgroup_title
        //                 self.data['sellingUnitConv'] = rs.selling_um_conv
        //                 self.data['sellingUnit'] = rs.selling_um + ' (' + rs.selling_um_title + ')'
        //                 self.data['stockUnit'] = rs.stock_um_code + ' (' + rs.stock_um_title + ')'
        //                 self.data['minimumPick'] = rs.boi_um_conv + ' (' + rs.boi_um_title + ')'
        //                 self.data['innerBox'] = rs.innerpack_um_conv + ' (' + rs.innerpack_um_title + ')'
        //                 self.data['outerBox'] = rs.case_um_conv + ' (' + rs.case_um_title + ')'
        //                 self.data['pallet'] = rs.pallet_um_conv + ' (' + rs.pallet_um_title + ')'

        //                 // self.showDialog = true;
        //                 self.loadingPage = false;
        //             } else {
        //                 this.snackbarContent = "No data of Packing.";
        //                 this.$refs.snackbar.open();
        //                 self.loadingPage = false;
        //                 return;
        //             }
        //         });
        // },
        closeDialog() {
            this.dialogConfirmClose = true;
        },
        formatNumber(value, dicimal) {
            return promotionInformationService.formatNumber(value, dicimal);
        }
    }
};
</script>

<style lang="scss" scoped>
#proin-dialog-packing {
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
        width: 85%;
        max-width: 85% !important;
        height: 100%;
        z-index: 5;
        top: 0% !important;
        left: 7.5% !important;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
        background-color: #FFFFFF;
        border-radius: 2px;

        .md-input-container {
            margin-bottom: 18px;
        }

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

        .auto-search {
            width: 100%;
        }

        .layout-dialog {
            padding: 20px 30px;

            .title-content {
                font-family: Kanit;
                font-size: 16px;
                font-weight: 400;
                color: #5A5A5A;
                text-align: left;
                padding-left: 5px;
                margin-bottom: 35px;
            }

            .row-content {
                // margin: 0 auto;
                padding-left: 30px;
                padding-right: 30px;
                width: 100%;
            }

            .md-input-focused:after {
                height: 1px;
                position: absolute;
                right: 0;
                bottom: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.12);
                transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                content: " ";
            }

            .-readonly {
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

            .row-bg-orange:hover {
                border-radius: 4px;
                background: #FED8B2;
                color: #96704A !important;
            }
        }
    }
}
</style>
