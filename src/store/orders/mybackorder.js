import Vue from "vue";
import moment from "moment";
import mybackorder from "../../services/orders/mybackorder";
import _ from "lodash";

const state = {
    k1List: [],
    kmList: [],
    k1List_temp: [],
    kmList_temp: [],
    detail_temp: [],
    totalK1: 0,
    totalKM: 0,
    btnNewRound: false,
    detail: {
        item_code: '',
        item_name: '',
        items: []
    },
    spinner: false,
    spinnerDG: false,
    selectedRow: "all",
    selectedRound: "",
    declineReason: [],
    dropdown: [{

    }],
    totalOrder: 0,
    typeSource: 'all',
    emailExport: ''
};
const mutations = {
    setK1List(state, value) {
        state.k1List = value;
    },
    setDetail(state, value) {
        state.detail = value;
    },
    setKMList(state, value) {
        state.kmList = value;
    },
    setSpinnerDG(state, value) {
        state.spinnerDG = value;
    },
    setTypeSource(state, value) {
        state.typeSource = value;
    }
};

const actions = {
    getList: ({ commit, state }, value) => {
        state.spinner = true;
        mybackorder
            .getBackOrder(value, state)
            .then(response => {
                state.k1List_temp = _.cloneDeep(response['k1']);
                state.kmList_temp = _.cloneDeep(response['km']);
                // let temp = []
                // for (let i = 0; i < 10; i++) {
                //     temp.push(response['km'][i])
                // }
                let totalK1 = response['k1'].reduce(
                    (acc, row) => acc + parseFloat(row.order_value),
                    0
                );
                let totalKM = response['km'].reduce(
                    (acc, row) => acc + parseFloat(row.order_value),
                    0
                );

                // round ทศนิยม
                let totalK14 = _.round(totalK1, 4);
                let totalK13 = _.round(totalK14, 3);
                let totalK12 = _.round(totalK13, 2);
                state.totalK1 = totalK12
                // round ทศนิยม
                let totalKM4 = _.round(totalKM, 4);
                let totalKM3 = _.round(totalKM4, 3);
                let totalKM2 = _.round(totalKM3, 2);
                state.totalKM = totalKM2

                commit("setK1List", response['k1']);
                commit("setKMList", response['km']);
                // commit("setKMList", temp);
                state.spinner = false;
            })
            .catch();
    },
    getDecReason: ({ state }) => {
        mybackorder
            .getDecReason()
            .then(response => {
                state.declineReason = response.data
                state.emailExport = response.email
            })
            .catch();
    },
    updateStatusBK: ({ state, dispatch }, value) => {
        let k1 = state.k1List.filter(
            todo => todo.checked == true
        );
        let km = state.kmList.filter(
            todo => todo.checked == true
        );
        let data = _.union(km, k1);
        state.spinnerDG = true;
        mybackorder
            .updateStatusBK(data, value)
            .then(response => {
                state.spinnerDG = false;
                dispatch('getList', '');
                // ปุ่มส้ม
            })
            .catch();
    },
    getBcakOrdByCode: ({ commit, state, dispatch }, values) => {
        dispatch("clearDG");
        state.selectedRow = values;
        state.spinnerDG = true;
        mybackorder
            .getBcakOrdByCode(values)
            .then(response => {
                /*
                let total = response.reduce((acc, row) => acc + parseFloat(row.total), 0);
                let total4 = _.round(total, 4);
                let total3 = _.round(total4, 3);
                let total2 = _.round(total3, 2);
                */
                let total2 = 0
                let rs = []
                _.forEach(response, function (rows) {
                    let total = rows.items.reduce((acc, row) => acc + parseFloat(row.total), 0);
                    let t4 = _.round(total, 4);
                    let t3 = _.round(t4, 3);
                    let t2 = _.round(t3, 2);
                    rs.push(t2)
                });
                total2 = rs.reduce((acc, row) => acc + parseFloat(row), 0);
                state.totalOrder = total2
                state.detail_temp = _.cloneDeep(response);
                let temp = [];
                for (let i = 0; i < 20; i++) {
                    if (!_.isUndefined(response[i])) {
                        temp.push(response[i])
                    }
                }
                commit('setDetail', temp)
                state.spinnerDG = false;
            })
            .catch();
    },
    viewsBcakOrdByCode: ({ commit, state, dispatch }, values) => {
        state.selectedRow = values.values;
        state.spinnerDG = true;
        mybackorder
            .viewsBcakOrdByCode(values)
            .then(response => {
                dispatch("clearDG");
                /*let total = response.reduce((acc, row) => acc + parseFloat(row.total), 0);
                let total4 = _.round(total, 4);
                let total3 = _.round(total4, 3);
                let total2 = _.round(total3, 2);
                */
                let total2 = 0
                let rs = []
                _.forEach(response, function (rows) {
                    let total = rows.items.reduce((acc, row) => acc + parseFloat(row.total), 0);
                    let t4 = _.round(total, 4);
                    let t3 = _.round(t4, 3);
                    let t2 = _.round(t3, 2);
                    rs.push(t2)
                });
                total2 = rs.reduce((acc, row) => acc + parseFloat(row), 0);
                state.totalOrder = total2
                state.detail_temp = _.cloneDeep(response);
                commit('setDetail', response)
                state.spinnerDG = false;
            })
            .catch();
    },
    searchBackOrder: ({ state, commit }, keyword) => {
        let clK1 = _.cloneDeep(state.k1List_temp)
        let clKM = _.cloneDeep(state.kmList_temp)
        let key = _.trim(keyword);
        if (key.length > 2) {
            const k1 = clK1.filter(word => {
                const str = word.po_no + word.customer_name + word.customer_code + word.inv_no + word.order_no;
                return str.toUpperCase().indexOf(key.toUpperCase()) !== -1;
            });
            const km = clKM.filter(word => {
                const str = word.po_no + word.customer_name + word.customer_code + word.inv_no + word.order_no;
                return str.toUpperCase().indexOf(keyword.toUpperCase()) !== -1;
            });
            commit("setK1List", k1);
            commit("setKMList", km);
        } else if (key.length == 0) {
            commit("setK1List", clK1);
            // let temp = []
            // for (let i = 0; i < 10; i++) {
            //     temp.push(clKM[i])
            // }
            commit("setKMList", clKM);
        }
    },
    searchBackOrderOnline: ({ state, commit, dispatch }, keyword) => {
        let key = _.trim(keyword);
        if (key.length > 2) {
            dispatch('getList', keyword);
        } else if (key.length == 0) {
            dispatch('getList', keyword);
        }
    },
    filterListBO: ({ state, commit }, keyword) => {
        let detail = _.cloneDeep(state.detail_temp)
        let key = _.trim(keyword);
        if (key.length > 2) {
            const data = detail.filter(word => {
                let str = word.customer_code + word.customer_name + word.credit_term;
                console.log(str)
                let item_no = [];
                word.items.forEach(function (rowTemp, keyItem) {
                    const str_item = rowTemp.order_no + rowTemp.po_no + rowTemp.item_code + rowTemp.item_name + rowTemp.customer_code + rowTemp.customer_name;
                    if (str_item.toUpperCase().indexOf(key.toUpperCase()) == -1) {
                        item_no.push(rowTemp.no);
                    }
                });
                for (var i = 0; i < item_no.length; i++) {
                    _.remove(word.items, function (val) {
                        return val.no == item_no[i];
                    });
                }
                if (word.items.length > 0 || str.toUpperCase().indexOf(key.toUpperCase()) !== -1) {
                    return true;
                }
            });
            commit("setDetail", data);
        } else if (key.length == 0) {
            commit("setDetail", detail);
        }
    },
    generate: ({ state, dispatch }) => {
        // let selected = state.k1List.filter(
        //     todo => todo.status == 'Waiting'
        // );
        // state.spinnerDG = true;
        // mybackorder
        //     .generate(selected)
        //     .then(response => {
        //         dispatch('getList', state.selectedRound)
        //     })
        //     .catch(error => console.error("error => generate"));
    },
    saveAdjust: ({ state, dispatch }) => {
        let data = state.detail.customer;
        let selected = data.filter(
            todo => todo.adjust != todo.adjust_old && todo.checked == true
        );
        mybackorder
            .saveAdjust(state.selectedRow, selected)
            .then(response => {
                // dispatch('getList', state.selectedRound)
                dispatch('getList', '')
            })
            .catch();
    },
    export: ({ state }) => {
        let data = state.detail.customer;
        let selected = data.filter(
            todo => todo.checked == true
        );
        state.spinnerDG = true;
        mybackorder
            .export(state.selectedRow, selected)
            .then(response => {
                state.spinnerDG = false;
            })
            .catch();
    },
    clearDG: ({ commit }) => {
        state.detail = []
    }
};

const getters = {
    selected_date: state => {
        return state.selected_date;
    },
    k1List: state => {
        return state.k1List;
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
    spinnerDG: state => {
        return state.spinnerDG;
    },
    btnNewRound: state => {
        return state.btnNewRound;
    },
    kmList: state => {
        return state.kmList;
    },
    totalK1: state => {
        return state.totalK1;
    },
    totalKM: state => {
        return state.totalKM;
    },
    totalOrder: state => {
        return state.totalOrder;
    },
    declineReason: state => {
        return state.declineReason;
    },
    detail_temp: state => {
        return state.detail_temp;
    },
    kmList_temp: state => {
        return state.kmList_temp;
    },
    k1List_temp: state => {
        return state.k1List_temp;
    },
    typeSource: state => {
        return state.typeSource;
    },
    emailExport: state => {
        return state.emailExport;
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
