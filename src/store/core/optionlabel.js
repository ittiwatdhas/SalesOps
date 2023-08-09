import optionlabelService from '../../services/core/optionlabel'
import Vue from 'vue';

const state = {
    optlb_customer_list: [],
    optlb_module_list: [],
    optlb_deatil_list: [],
    optlb_all_cust: 0,
    optlb_active_cust: 0,
    optlb_inactive_cust: 0,
    optlb_spinner_loading: false,
    temp_label_list: [],
    optlb_loading: true,
    last_menu:""
};

const mutations = {
    'SET_OPTLB_CUSTOMER'(state, value) {
        state.optlb_customer_list = value;
    },
    'SET_OPTLB_MODULE'(state, value) {
        state.optlb_module_list = value;
    },
    'SET_OPTLB_LOADING'(state, value) {
        state.optlb_loading = value;
    },
    'SET_OPTLB_DETAIL_LIST'(state, value) {
        if (state.optlb_loading) {
            state.optlb_deatil_list = []
        }
        value.forEach(function (value, key) {
            if (value.tagstatus == 'true') {
                value.tagstatus = true
            } else {
                value.tagstatus = false
            }
            value.mode = false
            value.temp_tagname = ''
            value.temp_taglabel = ''
            value.temp_tagmodule = ''
            state.optlb_deatil_list.push(value);
        });
    },
    'SET_LAST_MENU'(state, value) {
        state.last_menu = value;
    },
};

const actions = {
    getAllOptionLabel: ({ commit, state }, value) => {
        optionlabelService.getAllOptionLabel(value)
            .then((response) => {
                commit('SET_OPTLB_CUSTOMER', response.data);
                commit('SET_OPTLB_MODULE', response.module);
                if (state.temp_label_list.length == 0 && value == "") {
                    state.temp_label_list = response
                }
            })
            .catch((error) => console.error('error => getAllOptionLabel'));
    },
    getOptionLabelList: ({ commit, state }, value) => {
        state.optlb_spinner_loading = true
        commit('SET_OPTLB_DETAIL_LIST', []);
        optionlabelService.getOptionLabelList(value)
            .then((response) => {
                state.optlb_spinner_loading = false
                commit('SET_OPTLB_DETAIL_LIST', response);
            })
            .catch((error) => console.error('error => getOptionLabelList'));
    },
    getCountLabel: ({ commit, state }) => {
        optionlabelService.getCountLabel()
            .then((response) => {
                state.optlb_all_cust = response.count_all
                state.optlb_active_cust = response.count_active
                state.optlb_inactive_cust = response.count_inactive
            })
            .catch((error) => console.error('error => getCountLabel'));
    },
    saveLabel: ({ commit, state, dispatch }, value) => {
        optionlabelService.saveLabel(value)
            .then((response) => {
                // if (value.mode == "active") {
                    dispatch("getCountLabel");
                    let theObject = {
                        taglabel: "",
                        type: value.type,
                        sort: value.sort,
                        start_row: 0,
                        orderby: value.orderby
                    }
                    dispatch("getOptionLabelList", theObject);
                // }
            })
            .catch((error) => console.error('error => saveLabel'));
    },
};

const getters = {
    optlb_customer_list: state => {
        return state.optlb_customer_list;
    },
    optlb_module_list: state => {
        return state.optlb_module_list;
    },
    optlb_all_cust: state => {
        return state.optlb_all_cust;
    },
    optlb_active_cust: state => {
        return state.optlb_active_cust;
    },
    optlb_inactive_cust: state => {
        return state.optlb_inactive_cust;
    },
    optlb_deatil_list: state => {
        return state.optlb_deatil_list;
    },
    optlb_spinner_loading: state => {
        return state.optlb_spinner_loading;
    },
    temp_label_list: state => {
        return state.temp_label_list;
    },
    optlb_loading: state => {
        return state.optlb_loading;
    },
    last_menu: state => {
        console.log(state.last_menu);
        return state.last_menu;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};