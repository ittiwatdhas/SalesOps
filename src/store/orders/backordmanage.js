import Vue from "vue";
import moment from "moment";
import backService from "../../services/orders/backordmanage";
import _ from "lodash";

const state = {
    dataList: [],
    dataListTemp: [],
    btnNewRound: false,
    detail: {
        item_code: '',
        item_name: '',
        status: '',
        customer: [],
        sum: {
            total_po: 0,
            total_stock: 0,
            on_queue: 0,
            balance: 0
        }
    },
    detailDataTemp: {
        item_code: '',
        item_name: '',
        status: '',
        customer: [],
        sum: {
            total_po: 0,
            total_stock: 0,
            on_queue: 0,
            balance: 0
        }
    },
    spinner: false,
    spinnerDG: false,
    selectedRow: "all",
    source: "all",
    selectedRound: "",
    dropdown: [],
    bkEmail: '',
    check_confirm: true
};
const mutations = {
    setDataList(state, value) {
        state.dataList = value;
    },
    setDetail(state, value) {
        state.detail = value;
    },
    setSpinner(state, value) {
        state.spinner = value;
    },
    setDetailCustomer(state, value) {
        state.detail.customer = value;
    },
    setSource(state, value) {
        state.source = value;
    },
    setSelectedRow(state, value) {
        state.selectedRow = value;
    },
    set_confirm_generate(state, value) {
        state.check_confirm = value;
    },
};

const actions = {
    getList: ({ commit, state }, value) => {
        state.selectedRound = value
        state.spinner = true;
        state.btnNewRound = false
        backService
            .getList({ round: value })
            .then(response => {
                state.bkEmail = response.email
                commit("setDataList", response.data);
                state.dataListTemp = _.clone(response.data);
                let btn = response.data.filter(
                    todo => todo.status == 'Adjusted'
                );
                state.btnNewRound = btn.length > 0 ? true : false;
                state.spinner = false;
                state.check_confirm = true

            })
            .catch();
    },
    getOrderRound: ({ state }) => {
        backService
            .getOrderRound()
            .then(response => {
                let temp = []
                _.forEach(response, function (row) {
                    temp.push({ id: row.code, code: '', title: row.title })
                })
                state.dropdown = temp
            })
            .catch();
    },
    syncstock: ({ state, dispatch }) => {
        state.spinner = true;
        backService
            .syncstock()
            .then(response => {
                dispatch("getList", "");
            })
            .catch();
    },
    getAdjustByCode: ({ commit, state, dispatch }, values) => {
        dispatch("clearDG");
        state.selectedRow = values;
        state.spinnerDG = true;
        values.round = state.selectedRound == '' ? 'current' : state.selectedRound
        backService
            .getAdjustByCode(values, state)
            .then(response => {
                response.item_code = values.item_code
                response.item_name = values.item_name
                response.status = values.status
                let rs = response['customer'].filter(
                    todo => todo.customer_code != ''
                );
                response.customer = rs;
                if (response.sum.total_po == '') {
                    response.sum = {
                        total_po: 0,
                        total_stock: 0,
                        on_queue: 0,
                        balance: 0
                    }
                }
                commit('setDetail', response);
                state.detailDataTemp = _.clone(response);

                state.spinnerDG = false;
            })
            .catch();
    },
    delAdjust: ({ state, dispatch }) => {
        let data = state.detail.customer;
        let selected = data.filter(
            todo => todo.checked == true
        );
        state.spinnerDG = true;
        backService
            .delAdjust(state.selectedRow, selected)
            .then(response => {
                dispatch('getAdjustByCode', state.selectedRow)
                dispatch('getList', state.selectedRound)
            })
            .catch();
    },
    generate: ({ state, dispatch }) => {
        state.check_confirm = false
        let selected = state.dataList.filter(
            todo => todo.status == 'Adjusted'
        );
        state.spinnerDG = true;
        backService
            .generate(selected)
            .then(response => {
                dispatch('getOrderRound')
                dispatch('getList', state.selectedRound)
               
            })
            .catch();
    },
    saveAdjust: ({ state, dispatch }) => {
        let data = state.detail.customer;
        let selected = data.filter(
            todo => todo.checked == true
        );
        backService
            .saveAdjust(state.selectedRow, selected, state.detail)
            .then(response => {
                dispatch('getList', state.selectedRound)

            })
            .catch();
    },
    // export: ({ state }) => {
    //     let data = state.detail.customer;
    //     let selected = data.filter(
    //         todo => todo.checked == true
    //     );
    //     state.spinnerDG = true;
    //     backService
    //         .export(state.selectedRow, selected)
    //         .then(response => {
    //             state.spinnerDG = false;
    //         })
    //         .catch();
    // },

    clearDG: ({ commit }) => {
        state.detail = {
            item_code: '',
            item_name: '',
            customer: [],
            sum: {
                total_po: 0,
                total_stock: 0,
                on_queue: 0,
                balance: 0
            }
        },
            state.detailDataTemp = {
                item_code: '',
                item_name: '',
                customer: [],
                sum: {
                    total_po: 0,
                    total_stock: 0,
                    on_queue: 0,
                    balance: 0
                }
            }
    },
};

const getters = {
    selected_date: state => {
        return state.selected_date;
    },
    dataList: state => {
        return state.dataList;
    },
    dataListTemp: state => {
        return state.dataListTemp;
    },
    spinner: state => {
        return state.spinner;
    },
    comment: state => {
        return state.comment;
    },
    dropdown: state => {
        return state.dropdown;
    },
    selectedRow: state => {
        return state.selectedRow;
    },
    detail: state => {
        return state.detail;
    },
    detailDataTemp: state => {
        return state.detailDataTemp;
    },
    spinnerDG: state => {
        return state.spinnerDG;
    },
    btnNewRound: state => {
        return state.btnNewRound;
    },
    source: state => {
        return state.source;
    },
    bkEmail: state => {
        return state.bkEmail;
    },
    check_confirm: state => {
        return state.check_confirm
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
