<template>
<div id="proin-dialog-pricing">
    <md-spinner :md-size="150" :md-stroke="1" md-indeterminate v-show="(loadingPage)" style="position: fixed; z-index: 10; top: 35%; left: 55%;"></md-spinner>

    <div :class="(showDialog) ? 'bg-backdrop' : ''"></div>
    <div class="proin-md-dialog" v-show="(showDialog)">
        <div class="dialog-title">
            <div class="-text">All Product</div>
            <div class="-close">
                <md-icon style="cursor:pointer;margin-right:30px" @click.native="closeDialog">close</md-icon>
            </div>
        </div>

        <div class="layout-dialog">
            <div class="dialog-left-panel">
                <div class="md-layout">
                    <div class="md-layout-item">Search by</div>
                    <!-- <div class="md-layout-item" style="margin-bottom: 25px;">Search by</div> -->
                    <!-- <div class="md-layout-item -checkbox">
                        <label class="-proin-checkbox-container">
                            <input type="checkbox" v-model="checkedProduct">
                            <span class="-proin-checkbox"></span>
                        </label>
                        <span>Only My Product</span>
                    </div> -->
                    <div class="md-layout-item -dropdown">
                        <!-- <md-dropdown-box :data="valueProductAll.group" :placeholder="'All Product Group'" @choose="choosePG" v-model="product_group_code"></md-dropdown-box>
                        <md-dropdown-box :data="valueProductAll.subgroup" :placeholder="'All Sub Group'" @choose="chooseSG" v-model="product_subgroup_code"></md-dropdown-box>
                        <md-dropdown-box :data="valueProductAll.cg" :placeholder="'All CG'" @choose="chooseCG" v-model="product_cg_code"></md-dropdown-box> -->
                        <md-dropdown-box :data="value.group" :placeholder="'All Product Group'" @choose="choosePG" v-model="product_group_code"></md-dropdown-box>
                        <md-dropdown-box :data="value.subgroup" :placeholder="'All Sub Group'" @choose="chooseSG" v-model="product_subgroup_code"></md-dropdown-box>
                        <md-dropdown-box :data="value.cg" :placeholder="'All CG'" @choose="chooseCG" v-model="product_cg_code"></md-dropdown-box>
                    </div>
                    <div class="md-layout-item">
                        <!-- <md-search-box id="all-producr-popup" style="margin-top:20px;" :placeholder="'Search by Code or Name...'" v-model="keyword"></md-search-box> -->
                        <md-search-box :placeholder="'Search by Code or Name...'" @clear="keywordCLR" :value="keyword" @filter="keywordFil" style="width:100%; margin-top:20px;"></md-search-box>
                        <div style="text-align: -webkit-center;margin-top:20px">
                            <md-button :class="'-orange'" style="height:36px;border-radius:3px;font-size:12px" @click="searchProduct">
                                <md-icon style="margin-right:7px">search</md-icon>SEARCH
                            </md-button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dialog-right-panel">
                <div class="md-layout -table">
                    <!-- <div class="md-layout-item" style="display: flex;">
                        <div style="width: 50%; padding-top: 15px; padding-left: 5px;">Product List</div>
                        <div style="width: 50%; text-align: -webkit-right;">
                            <md-button :disabled="disabledBtn" :class="disabledBtn ?'-gray-A8':'-orange'" style="height:36px; border-radius:3px; font-size:12px" @click="addProduct">
                                <md-icon style="margin-right:7px">done</md-icon>ADD PRODUCT
                            </md-button>
                        </div>
                    </div> -->

                    <div class="md-layout-item">
                        <div id="table-product-all">
                            <div id="divHeadUpdate" class="display">
                                <div style="width: 88%;" class="-text-left">Item ({{dataTable.length}})</div>
                                <div style="width: 12%;" class="-text-left">Unit</div>
                            </div>
                            <div id="divBodyUpdate" class="display">
                                <div v-show="(dataTable == null || dataTable.length == 0)" :class="'row-bg-orange'" style="display: block; text-align: center;">No data in table.</div>
                                <div :class="'row-bg-orange'" v-for="(item, updateIndex) in dataTable" :key="updateIndex" @click="selectedProduct(item, updateIndex)">
                                <!-- <div :class="(rowSelected == updateIndex) ? '-selected' : 'row-bg-gray'" v-for="(item, updateIndex) in dataTable" :key="updateIndex" @click="selectedProduct(item, updateIndex)"> -->
                                    <div style="width: 12%;" class="-text-left -font-400">{{ item.code }}</div>
                                    <div style="width: 76%;" class="-text-left nowrap-title -font-400">
                                        <md-tooltip md-direction="bottom" class="mds-tooltips">{{ item.title }}</md-tooltip>
                                        <span>{{ item.title }}</span>
                                    </div>
                                    <div style="width: 12%;" class="-text-left">{{ item.selling_um }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <dialog-confirm v-model="dialogContent" :dialogConfirmClose="dialogConfirmClose" @clickClose="onCloseDialog" @clickConfirm="onConfirmDialog"></dialog-confirm>
</div>
</template>

<script>
import Vue from "vue";
import ClickOutside from "vue-click-outside";
import promotionInformationService from "@/services/orders/promotioninformation";
export default {
    name: "dialog-pricing",
    props: ["value", "showDialog"],
    data() {
        return {
            loadingPage: false,
            dataTable: [],
            dialogContent: "Do you want to close ?",
            dialogConfirmClose: false,
            checkedProduct: false,
            product_group_code: "",
            product_subgroup_code: "",
            product_cg_code: "",
            keyword: "",
            disabledBtn: true,
            vProductGroup: "",
            vProductSubGroup: "",
            vProductCGGroup: "",
            rowSelected: -1,
            dataSelected: [],
            // valueProductAll: this.value
        };
    },
    created() {},
    watch: {},
    computed: {},
    methods: {
        getDataHierarchy(value) {
            let data = (value.code == "") ? "" : value;
            promotionInformationService.GetProductAll(data)
                .then(response => {
                    if (value.code == "") {
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
                        this.value = response;

                    } else {
                        if (value.type == "group") {
                            response.subgroup.unshift({
                                code: "",
                                title: "All Sub Group"
                            });
                            // valueProductAll.subgroup = response.subgroup;
                            response.subgroup.sort((a, b) => (a.code > b.code) ? 1 : -1);
                            this.value.subgroup = response.subgroup;

                            response.cg.unshift({
                                code: "",
                                title: "All CG"
                            });
                            // valueProductAll.cg = response.cg;
                            response.cg.sort((a, b) => (a.code > b.code) ? 1 : -1);
                            this.value.cg = response.cg;
                        } else if (value.type == "subgroup") {
                            response.cg.unshift({
                                code: "",
                                title: "All CG"
                            });
                            // valueProductAll.cg = response.cg;
                            response.cg.sort((a, b) => (a.code > b.code) ? 1 : -1);
                            this.value.cg = response.cg;
                        }
                    }

                    self.showDialogProudctAll = true;
                    this.loadingProductAll = false;
                });
        },
        addProduct() {
            this.product_group_code = "";
            this.product_subgroup_code = "";
            this.product_cg_code = "";
            this.vProductGroup = "";
            this.vProductSubGroup = "";
            this.vProductCGGroup = "";
            this.keyword = "";
            this.dataTable = [];
            this.disabledBtn = true;

            var temp = document.getElementById("all-producr-popup");
            if (!_.isNull(temp)) {
                temp.childNodes[0].childNodes[2].value = "";
                if (!_.isUndefined(temp.childNodes[0].childNodes[4].style)) {
                    temp.childNodes[0].childNodes[4].style.display = "none";
                }
            }

            this.$emit("addProduct", this.dataSelected);
        },
        selectedProduct(value, key) {
            this.dataSelected = value;
            this.rowSelected = key;
            this.disabledBtn = false;

            /* Change Process 26.07.2019 close button*/
            this.product_group_code = "";
            this.product_subgroup_code = "";
            this.product_cg_code = "";
            this.vProductGroup = "";
            this.vProductSubGroup = "";
            this.vProductCGGroup = "";
            this.keyword = "";
            this.dataTable = [];
            this.disabledBtn = true;

            var temp = document.getElementById("all-producr-popup");
            if (!_.isNull(temp)) {
                temp.childNodes[0].childNodes[2].value = "";
                if (!_.isUndefined(temp.childNodes[0].childNodes[4].style)) {
                    temp.childNodes[0].childNodes[4].style.display = "none";
                }
            }

            this.$emit("addProduct", this.dataSelected);
        },
        searchProduct(val) {
            let datas = {
                keyword: this.keyword,
                group: this.vProductGroup,
                subgroup: this.vProductSubGroup,
                cg: this.vProductCGGroup
            };

            let self = this;
            this.loadingPage = true;
            promotionInformationService.GetAutoSearchItemCode(datas)
                .then(response => {
                    self.rowSelected = -1;
                    this.disabledBtn = true;

                    response.sort((a, b) => (a.code > b.code) ? 1 : -1);
                    self.dataTable = response;
                    self.loadingPage = false;
                });
        },
        choosePG(value, key) {
            this.vProductGroup = value.code;

            let datas = {
                type: "group",
                code: value.code
            }
            this.getDataHierarchy(datas);
        },
        chooseSG(value, key) {
            this.vProductSubGroup = value.code;

            let datas = {
                type: "subgroup",
                code: value.code
            }
            this.getDataHierarchy(datas);
        },
        chooseCG(value, key) {
            this.vProductCGGroup = value.code;
        },
        onCloseDialog(boolean) {
            this.dialogConfirmClose = boolean;
        },
        onConfirmDialog(boolean) {
            this.dialogConfirmClose = boolean;

            this.product_group_code = "";
            this.product_subgroup_code = "";
            this.product_cg_code = "";
            this.vProductGroup = "";
            this.vProductSubGroup = "";
            this.vProductCGGroup = "";
            this.keyword = "";
            this.dataTable = [];
            this.disabledBtn = true;

            var temp = document.getElementById("all-producr-popup");
            if (!_.isNull(temp)) {
                temp.childNodes[0].childNodes[2].value = "";
                if (!_.isUndefined(temp.childNodes[0].childNodes[4].style)) {
                    temp.childNodes[0].childNodes[4].style.display = "none";
                }
            }

            this.$emit("clickClose", false);
        },
        closeDialog() {
            this.dialogConfirmClose = true;
        },
        keywordCLR() {
            this.keyword = "";
        },
        keywordFil(val) {
            this.keyword = val;
        }
    },
    directives: {
        ClickOutside
    },
    components: {
        "dialog-confirm": require("./dialog-confirm"),
        "md-dropdown-box": require("../myorder-component/md-dropdown-box"),
        "md-search-box": require("../myorder-component/md-search-box")
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
        width: 90%;
        max-width: 90% !important;
        height: 100%;
        z-index: 5;
        top: 0% !important;
        left: 5% !important;
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
            padding: 10px 20px;
            display: flex;
            font-size: 16px;
            font-weight: 400;
            font-family: Roboto;

            .dialog-left-panel {
                width: 30%;
                height: 100%;
                padding: 20px 10px;
                // background-color: pink;
            }

            .dialog-right-panel {
                width: 70%;
                height: 100%;
                padding: 10px 5px 10px 15px;
                // background-color: palevioletred;
            }

            .md-layout .md-layout-item {
                width: 100%;
                text-align: left;

                &.-checkbox {
                    display: flex;
                    margin-bottom: 5px;
                }

                &.-dropdown {
                    .md-dropdown-box {
                        margin-top: 20px;
                    }
                }
            }

            .md-layout.-table {
                // margin-top: 15px;
                padding: 10px 10px 15px 20px;
                border: 1px solid #BDBDBD !important;
                border-radius: 4px;
                font-size: 16px;
                font-weight: 300;
                color: #5A5A5A;
                text-align: left;
            }

            #table-product-all {
                font-family: kanit;
                font-size: 14px;
                font-weight: 300;
                width: 100%;

                .row-bg-orange:hover {
                    border-radius: 4px;
                    background: #FED8B2;
                    color: #96704A !important;
                    cursor: pointer;
                }

                .row-bg-gray:hover {
                    border-radius: 4px;
                    background: #ececeb;
                    cursor: pointer;
                }

                .-selected {
                    border-radius: 4px;
                    background: #FED8B2;
                    color: #96704A !important;
                }

                #divHeadUpdate {
                    width: 99%;
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
                    // height: calc(90vmin - 235px);
                    height: calc(100vh - 175px);
                    overflow-y: scroll;

                    >div {
                        width: 100%;
                        display: -webkit-inline-box;
                        padding-top: 9px;
                        padding-bottom: 9px;
                        color: #414141;
                        cursor: pointer;

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

        /* The -proin-checkbox-container */
        .-proin-checkbox-container {
            display: block;
            position: relative;
            padding-left: 35px;
            cursor: pointer;
            font-size: 22px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* Hide the browser's default checkbox */
        .-proin-checkbox-container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        /* Create a custom checkbox */
        .-proin-checkbox {
            position: absolute;
            top: 0;
            left: 0;
            height: 20px;
            width: 20px;
            background-color: #fff;
            border: 1.5px solid #767676;
            border-radius: 3px;
        }

        /* On mouse-over, add a grey background color */
        .-proin-checkbox-container:hover input~.-proin-checkbox {
            background-color: #ccc;
        }

        /* When the checkbox is checked, add a blue background */
        .-proin-checkbox-container input:checked~.-proin-checkbox {
            background-color: #FD7F00;
            border-color: #FD7F00;
        }

        /* Create the -proin-checkbox/indicator (hidden when not checked) */
        .-proin-checkbox:after {
            content: "";
            position: absolute;
            display: none;
        }

        /* Show the -proin-checkbox when checked */
        .-proin-checkbox-container input:checked~.-proin-checkbox:after {
            display: block;
        }

        /* Style the -proin-checkbox/indicator */
        .-proin-checkbox-container .-proin-checkbox:after {
            left: 6px;
            top: 1px;
            width: 5px;
            height: 13px;
            border: solid white;
            border-width: 0 2px 2px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    }
}
</style>
