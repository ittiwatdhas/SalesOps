<template>
<div id="proin-dialog-warehouse">
    <!-- <md-button id="btnPricing" :class="'md-raised -btn-gray -btn-orange'" @click="openDialog()">
        <label>WAREHOUSE</label>
    </md-button> -->
    
    <md-spinner :md-size="150" :md-stroke="1" md-indeterminate v-show="(loadingPage)" style="position: fixed; z-index: 10; top: 23%; left: 45%;"></md-spinner>
    
    <div :class="(showDialog) ? 'bg-backdrop' : ''"></div>
    <div class="proin-md-dialog" v-show="(showDialog)">
        <div class="dialog-title">
            <div class="-text">Warehouse</div>
            <div class="-close">
                <md-icon style="cursor:pointer;margin-right:30px" @click.native="closeDialog">close</md-icon>
            </div>
        </div>
        
        <div class="layout-dialog">
            <fieldset style='padding-top: 10px;'>
                <div class="title-content">{{ value }} : {{ descriptionTH }}</div>
                <div v-if="checkData === true" class="row-bg-orange" style="display: block; text-align: center; line-height: 50px;">No data.</div>
                <div v-else>
                    <div class="md-layout row-content" md-align="center">
                        <md-layout md-flex="30" class="display-info">
                            <md-input-container md-theme class="-readonly">
                                <div class="auto-search">
                                    <label class="value-label">Product Type</label>
                                    <md-tooltip md-direction="bottom" class="mds-tooltips">{{ data.productType }}</md-tooltip>
                                    <md-input v-model="data.productType" readonly='readonly'></md-input>
                                </div>
                            </md-input-container>
                        </md-layout>
                        <md-layout md-flex="5" class="display-info"></md-layout>
                        <md-layout md-flex="30" class="display-info">
                            <md-input-container md-theme class="-readonly">
                                <div class="auto-search">
                                    <label class="value-label">Item Group</label>
                                    <md-tooltip md-direction="bottom" class="mds-tooltips">{{ data.itemGroup }}</md-tooltip>
                                    <md-input v-model="data.itemGroup" readonly='readonly'></md-input>
                                </div>
                            </md-input-container>
                        </md-layout>
                        <md-layout md-flex="5" class="display-info"></md-layout>
                        <md-layout md-flex="30" class="display-info">
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
                        <md-layout md-flex="30" class="display-info">
                            <md-input-container md-theme class="-readonly">
                                <div class="auto-search">
                                    <label class="value-label">Stocking Unit</label>
                                    <md-input v-model="data.stockUnit" readonly='readonly'></md-input>
                                </div>
                            </md-input-container>
                        </md-layout>
                        <md-layout md-flex="5" class="display-info"></md-layout>
                        <md-layout md-flex="30" class="display-info">
                            <md-input-container md-theme class="-readonly">
                                <div class="auto-search">
                                    <label class="value-label">Selling Unit</label>
                                    <md-input v-model="data.sellingUnit" readonly='readonly'></md-input>
                                </div>
                            </md-input-container>
                        </md-layout>
                        <md-layout md-flex="5" class="display-info"></md-layout>
                        <md-layout md-flex="30" class="display-info">
                            <md-input-container md-theme class="-readonly">
                                <div class="auto-search">
                                    <label class="value-label">Convert of Selling Unit</label>
                                    <md-input v-model="data.sellingUnitConv" readonly='readonly'></md-input>
                                </div>
                            </md-input-container>
                        </md-layout>
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="layout-dialog" style='padding-top:0'>
            <div style='width:100%'>
                <div id="grid">
                    <div id="divHeadUpdate" class="display">
                        <div style="width: 10%;" class="-text-center">Warehouse</div>
                        <div style="width: 10%;" class="-text-right">Allocate / Selling</div>
                        <div style="width: 12%;" class="-text-right">Allocate / Stocking</div>
                        <div style="width: 9%;" class="-text-right">On Hand</div>
                        <div style="width: 10%;" class="-text-right">Available</div>
                        <div style="width: 14%;" class="-text-right">Arrival(อยู่ระหว่างสั่งซื้อ)</div>
                        <!-- <div style="width: 10%;" class="-text-right">Max NNSS</div> -->
                        <div style="width: 12%;" class="-text-right">Max DNMT / Selling</div>
                        <!--<div style="width: 10%; padding-left: 25px;" class="-text-center">Unit</div>-->
                        <div style="width: 10%;" class="-text-center">Unit</div>
                        <!--<div style="width: 10%;" class="-text-right">Unit</div>-->
                        <div style="width: 13%;" class="-text-center">Last Update</div>
                    </div>
                    <div id="divBodyUpdate" class="display">
                        <div v-if="dataGrid.length === 0" class="row-bg-orange" style="display: block; text-align: center;">No data in table.</div>
                        <div v-else :class="'row-bg-orange'" v-for="(item, updateIndex) in dataGrid" :key="updateIndex">
                            <div style="width: 10%;" class="-text-center nowrap-title -font-400">
                                <md-tooltip md-direction="bottom" class="mds-tooltips">{{ item.warehouse_code }}</md-tooltip>
                                <span>{{ item.warehouse_code }}</span>
                            </div>
                            <div v-show="item.warehouse_code === 'DNSS'" style="width: 10%;" class="-text-right">{{ formatNumber(item.minorder, 0) }}</div>
                            <div v-show="item.warehouse_code !== 'DNSS'" style="width: 10%;" class="-text-right">0</div>
                            <div style="width: 12%;" class="-text-right">{{ formatNumber(item.allocate_stocking, 0) }}</div>
                            <div style="width: 9%;" class="-text-right">{{ formatNumber(item.onhand, 0) }}</div>
                            <div style="width: 10%;" class="-text-right">{{ formatNumber(item.balance, 0) }}</div>
                            <div style="width: 14%;" class="-text-right">{{ formatNumber(item.arrival, 0) }}</div>
                            <!-- <div v-show="item.warehouse_code === 'NNSS'" style="width: 10%;" class="-text-right">{{ formatNumber(item.minorder, 0) }}</div>
                            <div v-show="item.warehouse_code !== 'NNSS'"  style="width: 10%;" class="-text-right">0</div> -->
                            <div v-show="item.warehouse_code === 'DNMT'" style="width: 12%;" class="-text-right">{{ formatNumber((item.minorder), 0)}}</div>
                            <div v-show="item.warehouse_code !== 'DNMT'"  style="width: 12%;" class="-text-right">0</div>
                            <div style="width: 10%;" class="-text-center">{{ data.stockCode }}</div>
                            <div style="width: 13%;" class="-text-center">{{ item.mtime }}</div>
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
    name: "dialog-warehouse",
    props: ["value", "descriptionTH", "showDialog"],
    data() {
        return {
            data: [],
            dataGrid: [],
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
            this.data = [];
            this.dataGrid = [];
            
            promotionInformationService.GetWherehouse(this.value)
                .then(response => {
                    if (response.data !== undefined && response.data.length > 0) {
                        let rs = response.data[0];
                        self.data['productType'] = rs.productype_code + ' ' + rs.productype_title;
                        self.data['productClass'] = rs.productlifecycle_code + ' ' + rs.productlifecycle_title
                        self.data['itemGroup'] = rs.itemgroup_code + ' ' + rs.itemgroup_title
                        self.data['sellingUnitConv'] = rs.selling_um_conv
                        self.data['sellingUnit'] = rs.selling_um + ' (' + rs.selling_um_title + ')'
                        self.data['stockUnit'] = rs.stock_um_code + ' (' + rs.stock_um_title + ')'
                        self.data['stockCode'] = rs.selling_um_title
                        self.dataGrid = rs.stock;
                        
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
            this.dataGrid = [];
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
        //     promotionInformationService.GetWherehouse(this.value)
        //         .then(response => {
        //             if (response.data !== undefined && response.data.length > 0) {
        //                 let rs = response.data[0];
        //                 self.data['productType'] = rs.productype_code + ' ' + rs.productype_title;
        //                 self.data['productClass'] = rs.productlifecycle_code + ' ' + rs.productlifecycle_title
        //                 self.data['itemGroup'] = rs.itemgroup_code + ' ' + rs.itemgroup_title
        //                 self.data['sellingUnitConv'] = rs.selling_um_conv
        //                 self.data['sellingUnit'] = rs.selling_um + ' (' + rs.selling_um_title + ')'
        //                 self.data['stockUnit'] = rs.stock_um_code + ' (' + rs.stock_um_title + ')'
        //                 self.data['stockCode'] = rs.selling_um_title
        //                 self.dataGrid = rs.stock;
                        
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
#proin-dialog-warehouse {
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
        
        .md-input-container{
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
                margin: 0 auto;
                padding-left: 25px;
                padding-right: 25px;
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
            
            #grid {
                font-family: kanit;
                font-size: 14px;
                font-weight: 300;

                .row-bg-orange:hover {
                    border-radius: 4px;
                    background: #FED8B2;
                    color: #96704A !important;
                }

                #divHeadUpdate {
                    width: 99.4%;
                    display: -webkit-box;
                    font-family: Roboto;
//                    font-weight: bold;
//                    color: #000000;
                    color: #aaa;
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
                    font-size: 16px;

                    width: 100%;
                    display: block;
                    height: calc(100vh - 380px);
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

            .row-bg-orange:hover {
                border-radius: 4px;
                background: #FED8B2;
                color: #96704A !important;
            }
        }
    }
}
</style>
