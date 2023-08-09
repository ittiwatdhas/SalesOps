import custManageService from "../../services/core/custmanage";
import Vue from "vue";

const state = {
  custm_customer_list: [],
  custm_deatil_list: [],
  custm_province_list: [],
  custm_channel_list: [],
  custm_all_cust: 0,
  custm_active_cust: 0,
  custm_inactive_cust: 0,
  custm_count_unverify: 0,
  custm_count_verify: 0,
  custm_spinner_loading: false,
  temp_customer_list: [],
  custm_selected: "",
  custm_loading: true,
};

const mutations = {
  SET_CUSTM_CUSTOMER(state, value) {
    state.custm_customer_list = value;
  },
  SET_CUSTM_SELECTED(state, value) {
    state.custm_selected = value;
  },
  SET_CUSTM_LOADING(state, value) {
    state.custm_loading = value;
  },
  SET_CUSTM_DETAIL_LIST(state, value) {
    if (state.custm_loading) {
      state.custm_deatil_list = [];
    }
    value.forEach(function (value, key) {
      state.custm_deatil_list.push(value);
    });
  },
  SET_PROVINCE_LIST(state, value) {
    state.custm_province_list = value;
  },
  SET_CHANNEL_LIST(state, value) {
    state.custm_channel_list = value;
  },
};

const actions = {
  getAllCustomer: ({ commit, state }, value) => {
    custManageService
      .getAllCustomer(value)
      .then((response) => {
        commit("SET_CUSTM_CUSTOMER", response);
        if (state.temp_customer_list.length == 0 && value == "") {
          state.temp_customer_list = response;
        }
      })
      .catch((error) => console.error("error => getAllCustomer"));
  },
  getCustomerList: ({ commit, state, dispatch }, value) => {
    console.log(value)
    state.custm_spinner_loading = true;
    custManageService
      .getCustomerList(value)
      .then((response) => {
        state.custm_spinner_loading = false;
        commit("SET_CUSTM_DETAIL_LIST", response);

        dispatch("getCountCustomer", {
          customer_code: value.customer_code,
          channel_code: value.channel_code,
          province_code: value.province_code,
        });
      })
      .catch((error) => console.error("error => getCustomerList"));
  },
  getCountCustomer: ({ commit, state }, value) => {
    custManageService
      .getCountCustomer(value)
      .then((response) => {
        // console.log(response);
        state.custm_all_cust = response.count_all;
        state.custm_active_cust = response.count_active;
        state.custm_inactive_cust = response.count_inactive;
        state.custm_count_unverify = response.count_unverify;
        state.custm_count_verify = response.count_verify;
      })
      .catch((error) => console.error("error => getCountCustomer"));
  },
  saveLocation: ({ commit, state }, value) => {
    custManageService
      .saveLocation(value)
      .then((response) => {
        state.custm_deatil_list[value.index].lat_mobile = value.latitude;
        state.custm_deatil_list[value.index].long_mobile = value.longitude;
        state.custm_deatil_list[value.index].distance_status = 1;
      })
      .catch((error) => console.error("error => saveLocation"));
  },
  settingProvinceAll: ({ commit, state }, value) => {
    custManageService
      .settingProvinceAll(value)
      .then((response) => {
        commit("SET_PROVINCE_LIST", response.body.success.data);
      })
      .catch((error) => console.error("error => saveLocation"));
  },
  settingUpdateVerify: ({ commit, state, dispatch }, value) => {
    custManageService
      .settingUpdateVerify(value)
      .then((response) => {
        dispatch("getAllCustomer", "");
        dispatch("getCountCustomer", "");
      })
      .catch((error) => console.error("error => saveLocation"));
  },
  settingChannelAll: ({ commit, state }, value) => {
    custManageService
      .settingChannelAll()
      .then((response) => {
        commit("SET_CHANNEL_LIST", response.body.success.data);
      })
      .catch((error) => console.error("error => saveLocation"));
  },
};

// API : /setting-channel-all
// TYPE : GET

const getters = {
  custm_province_list: (state) => {
    return state.custm_province_list;
  },
  custm_customer_list: (state) => {
    return state.custm_customer_list;
  },
  custm_channel_list: (state) => {
    return state.custm_channel_list;
  },
  custm_all_cust: (state) => {
    return state.custm_all_cust;
  },
  custm_active_cust: (state) => {
    return state.custm_active_cust;
  },
  custm_inactive_cust: (state) => {
    return state.custm_inactive_cust;
  },
  custm_count_unverify: (state) => {
    return state.custm_count_unverify;
  },
  custm_count_verify: (state) => {
    return state.custm_count_verify;
  },
  custm_deatil_list: (state) => {
    return state.custm_deatil_list;
  },
  custm_spinner_loading: (state) => {
    return state.custm_spinner_loading;
  },
  temp_customer_list: (state) => {
    return state.temp_customer_list;
  },
  custm_selected: (state) => {
    return state.custm_selected;
  },
  custm_loading: (state) => {
    return state.custm_loading;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
