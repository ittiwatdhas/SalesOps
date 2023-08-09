import newsfeedbrandService from '../../services/core/newsfeedbrand'
import Vue from 'vue';

const state = {
    nfb_customer_list: [],
    nfb_parent_list: [],
    nfb_deatil_list: [],
    nfb_all_cust: 0,
    nfb_active_cust: 0,
    nfb_inactive_cust: 0,
    nfb_spinner_loading: false,
    temp_nfbrand_list: [],
    nfb_loading: true
};

const mutations = {
    'SET_NFB_CUSTOMER'(state, value) {
        state.nfb_customer_list = value;
    },
    'SET_NFB_PARENT'(state, value) {
        state.nfb_parent_list = value;
    },
    'SET_NFB_LOADING'(state, value) {
        state.nfb_loading = value;
    },
    'SET_NFB_DETAIL_LIST'(state, value) {
        if (state.nfb_loading) {
            state.nfb_deatil_list = []
        }
        value.forEach(function (value, key) {
            if (value.brandstatus == 'true') {
                value.brandstatus = true
            } else {
                value.brandstatus = false
            }
            if (value.description == 'null') {
                value.description = ''
            }
            value.brand_type = parseInt(value.brand_type)
            value.mode = false
            value.temp_parent_code = ''
            value.temp_labelname_th = ''
            value.temp_external_source = ''
            state.nfb_deatil_list.push(value);
        });
    }
};

const actions = {
    getAllOptionNFBLabel: ({ commit, state }, value) => {
        newsfeedbrandService.getAllOptionNFBLabel(value)
            .then((response) => {
                commit('SET_NFB_CUSTOMER', response.data);
                commit('SET_NFB_PARENT', response.groups);
                if (state.temp_nfbrand_list.length == 0 && value == "") {
                    state.temp_nfbrand_list = response
                }
            })
            .catch((error) => console.error('error => getAllOptionNFBLabel'));
    },
    getOptionNFBLabelList: ({ commit, state }, value) => {
        state.nfb_spinner_loading = true
        commit('SET_NFB_DETAIL_LIST', []);
        newsfeedbrandService.getOptionNFBLabelList(value)
            .then((response) => {
                state.nfb_spinner_loading = false
                commit('SET_NFB_DETAIL_LIST', response);
            })
            .catch((error) => console.error('error => getOptionNFBLabelList'));
    },
    getCountNFBLabel: ({ commit, state }) => {
        newsfeedbrandService.getCountNFBLabel()
            .then((response) => {
                state.nfb_all_cust = response.count_all
                state.nfb_active_cust = response.count_active
                state.nfb_inactive_cust = response.count_inactive
            })
            .catch((error) => console.error('error => getCountNFBLabel'));
    },
    saveNFBLabel: ({ commit, state, dispatch }, value) => {
        newsfeedbrandService.saveNFBLabel(value)
            .then((response) => {
                // if (value.mode == "active") {
                    dispatch("getCountNFBLabel");
                    let theObject = {
                        labelcode: "",
                        type: value.type,
                        sort: value.sort,
                        start_row: 0,
                        orderby: value.orderby
                    }
                    dispatch("getOptionNFBLabelList", theObject);
                // }
            })
            .catch((error) => console.error('error => saveNFBLabel'));
    },
};

const getters = {
    nfb_customer_list: state => {
        return state.nfb_customer_list;
    },
    nfb_parent_list: state => {
        return state.nfb_parent_list;
    },
    nfb_all_cust: state => {
        return state.nfb_all_cust;
    },
    nfb_active_cust: state => {
        return state.nfb_active_cust;
    },
    nfb_inactive_cust: state => {
        return state.nfb_inactive_cust;
    },
    nfb_deatil_list: state => {
        return state.nfb_deatil_list;
    },
    nfb_spinner_loading: state => {
        return state.nfb_spinner_loading;
    },
    temp_nfbrand_list: state => {
        return state.temp_nfbrand_list;
    },
    nfb_loading: state => {
        return state.nfb_loading;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};