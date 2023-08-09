import newsfeedlabelService from '../../services/core/newsfeedlabel'
import Vue from 'vue';

const state = {
    nflb_customer_list: [],
    nflb_parent_list: [],
    nflb_deatil_list: [],
    nflb_all_cust: 0,
    nflb_active_cust: 0,
    nflb_inactive_cust: 0,
    nflb_spinner_loading: false,
    temp_nflabel_list: [],
    nflb_loading: true
};

const mutations = {
    'SET_NFLB_CUSTOMER'(state, value) {
        state.nflb_customer_list = value;
    },
    'SET_NFLB_PARENT'(state, value) {
        state.nflb_parent_list = value;
    },
    'SET_NFLB_LOADING'(state, value) {
        state.nflb_loading = value;
    },
    'SET_NFLB_DETAIL_LIST'(state, value) {
        if (state.nflb_loading) {
            state.nflb_deatil_list = []
        }
        value.forEach(function (value, key) {
            if (value.labelstatus == 'true') {
                value.labelstatus = true
            } else {
                value.labelstatus = false
            }
            if (value.external_source == 'null') {
                value.external_source = ''
            }
            value.mode = false
            value.temp_parent_code = ''
            value.temp_labelname_th = ''
            value.temp_external_source = ''
            state.nflb_deatil_list.push(value);
        });
    }
};

const actions = {
    getAllOptionNFLabel: ({ commit, state }, value) => {
        newsfeedlabelService.getAllOptionNFLabel(value)
            .then((response) => {
                commit('SET_NFLB_CUSTOMER', response.data);
                commit('SET_NFLB_PARENT', response.parent);
                if (state.temp_nflabel_list.length == 0 && value == "") {
                    state.temp_nflabel_list = response
                }
            })
            .catch((error) => console.error('error => getAllOptionNFLabel'));
    },
    getOptionNFLabelList: ({ commit, state }, value) => {
        console.log(value)
        state.nflb_spinner_loading = true
        commit('SET_NFLB_DETAIL_LIST', []);
        newsfeedlabelService.getOptionNFLabelList(value)
            .then((response) => {
                state.nflb_spinner_loading = false
                commit('SET_NFLB_DETAIL_LIST', response);
            })
            .catch((error) => console.error('error => getOptionNFLabelList'));
    },
    getCountNFLabel: ({ commit, state }) => {
        newsfeedlabelService.getCountNFLabel()
            .then((response) => {
                state.nflb_all_cust = response.count_all
                state.nflb_active_cust = response.count_active
                state.nflb_inactive_cust = response.count_inactive
            })
            .catch((error) => console.error('error => getCountNFLabel'));
    },
    saveNFLabel: ({ commit, state, dispatch }, value) => {
        newsfeedlabelService.saveNFLabel(value)
            .then((response) => {
                // if (value.mode == "active") {
                dispatch("getCountNFLabel");
                // }
                let theObject = {
                    labelcode: "",
                    type: value.type,
                    sort: value.sort,
                    start_row: 0,
                    orderby: value.orderby
                }
                dispatch("getOptionNFLabelList", theObject);
                dispatch("getAllOptionNFLabel", "");
            })
            .catch((error) => console.error('error => saveNFLabel'));
    },
};

const getters = {
    nflb_customer_list: state => {
        return state.nflb_customer_list;
    },
    nflb_parent_list: state => {
        return state.nflb_parent_list;
    },
    nflb_all_cust: state => {
        return state.nflb_all_cust;
    },
    nflb_active_cust: state => {
        return state.nflb_active_cust;
    },
    nflb_inactive_cust: state => {
        return state.nflb_inactive_cust;
    },
    nflb_deatil_list: state => {
        return state.nflb_deatil_list;
    },
    nflb_spinner_loading: state => {
        return state.nflb_spinner_loading;
    },
    temp_nflabel_list: state => {
        return state.temp_nflabel_list;
    },
    nflb_loading: state => {
        return state.nflb_loading;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};