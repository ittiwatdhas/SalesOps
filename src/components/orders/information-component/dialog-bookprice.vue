<template>
<div id="proin-dialog-pricing">
    <!-- <md-button id="btnPricing" :class="'md-raised -btn-gray -btn-orange'" @click="openDialog()">
        <label>PRICING</label>
    </md-button> -->

    <md-spinner :md-size="150" :md-stroke="1" md-indeterminate v-show="(loadingPage)" style="position: fixed; z-index: 10; top: 23%; left: 45%;"></md-spinner>

    <div :class="(showDialog) ? 'bg-backdrop' : ''"></div>
    <div class="proin-md-dialog" v-show="(showDialog)">
        <div class="dialog-title">
            <div class="-text">Book Price</div>
            <div class="-close">
                <md-icon style="cursor:pointer;margin-right:30px" @click.native="closeDialog">close</md-icon>
            </div>
        </div>

        <div class="layout-dialog">
            <div class="title-content">{{ value }} : {{ descriptionTH }}</div>
            <div class="md-layout" style="padding-left: 2px; margin-top: 5px;">
                <div id="table-pricing">
                    <div id="divHeadUpdate" class="display">
                        <div style="width: 32%;" class="-text-left">Price Type</div>
                        <div style="width: 18%;" class="-text-right">Price : SKU</div>
                        <div style="width: 18%;" class="-text-right">Price : Selling</div>
                        <div style="width: 20%; padding-left: 25px;" class="-text-center">Start Date</div>
                        <div style="width: 12%;" class="-text-center">End Date</div>
                    </div>
                    <div id="divBodyUpdate" class="display">
                        <div v-if="dataTable.length === 0" class="row-bg-orange" style="display: block; text-align: center;">No data in table.</div>
                        <div v-else :class="'row-bg-orange'" v-for="(item, updateIndex) in dataTable" :key="updateIndex">
                            <div style="width: 32%;" class="-text-left nowrap-title -font-400">
                                <!-- <span>{{ item.price_type }}</span> -->
                                       <span>{{ item.price_type }} {{ (pricetype[item.price_type]) ? " : " + pricetype[item.price_type] : "" }}</span>
                            </div>
                            <div style="width: 18%;" class="-text-right">{{ formatNumber(item.sku, 2) }}</div>
                            <div style="width: 18%;" class="-text-right">{{ formatNumber(item.price_selling, 2) }}</div>
                            <div style="width: 20%; padding-left: 25px;" class="-text-center">{{ convertDate(item.start_date) }}</div>
                            <div style="width: 12%;" class="-text-center">{{ convertDate(item.end_date) }}</div>
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
import moment from "moment";
import promotionInformationService from "@/services/orders/promotioninformation";
export default {
    name: "dialog-pricing",
    props: ["value", "descriptionTH", "showDialog"],
    data() {
        return {
            snackbarContent: "",
            vertical: "bottom",
            horizontal: "center",
            duration: 4000,
            loadingPage: false,
            // showDialog: false,
            dataTable: [],
            pricetype: [],
            dialogContent: "Do you want to close ?",
            dialogConfirmClose: false
        };
    },
    created() {},
    watch: {
        showDialog(){
            let self = this;
            self.loadingPage = true;
            self.dataTable = [];
            self.pricetype = [];
            promotionInformationService.GetฺBookprice(this.value)
                .then(response => {
                    if (response.data.length > 0 && response.data[0].start_date != '' ) {
                        self.dataTable = response.data;
                        self.pricetype = response.pricetype;

                        self.dataTable.sort((a, b) => (a.pricetype_code > b.pricetype_code) ? 1 : -1)
                        // self.showDialog = true;
                        self.loadingPage = false;
                    } else {
                        // this.snackbarContent = "No data of Pricing.";
                        // this.$refs.snackbar.open();
                        self.loadingPage = false;
                        return;
                    }
                });
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
        onCloseDialog(boolean) {
            this.dialogConfirmClose = boolean;
        },
        onConfirmDialog(boolean) {
            this.dialogConfirmClose = boolean;
            this.$emit("confirm");
            // this.dataTable = [];
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
        //     promotionInformationService.GetPricing(this.value)
        //         .then(response => {
        //             if (response.data.length > 0) {
        //                 self.dataTable = response.data;
        //                 self.pricetype = response.pricetype;

        //                 self.dataTable.sort((a, b) => (a.pricetype_code > b.pricetype_code) ? 1 : -1)
        //                 self.showDialog = true;
        //                 self.loadingPage = false;
        //             } else {
        //                 this.snackbarContent = "No data of Pricing.";
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
    },
    components: {
        "dialog-confirm": require("./dialog-confirm")
    }
};
</script>

<style lang="scss" scoped>
#proin-dialog-pricing {
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
        width: 80%;
        max-width: 80% !important;
        height: 100%;
        z-index: 5;
        top: 0% !important;
        left: 10% !important;
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
            padding: 20px 30px;

            .title-content {
                font-family: Kanit;
                font-size: 16px;
                font-weight: 400;
                color: #5A5A5A;
                text-align: left;
                padding-left: 5px;
            }

            #table-pricing {
                font-family: kanit;
                font-size: 14px;
                font-weight: 300;
                width: 100%;
                margin-top: 20px;

                .row-bg-orange:hover {
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
                    height: calc(100vh - 190px);
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
    }
}
</style>
