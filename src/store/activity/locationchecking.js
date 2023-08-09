import Vue from "vue";
import LocationCheckingservice from "../../services/activity/locationchecking";
// import _ from "lodash";
const state = {
  lcn_customer_list: [],
  lcn_loading: true,
  lcn_spinner_loading: false,
  token:''

  // temp_customer_list: [],
};
const mutations = {
  SET_CUSTOMER_LIST_LOCATION(state, value) {
    if (state.lcn_loading) {
      state.lcn_customer_list = [];
    }
    value.forEach(function (value, key) {
      state.lcn_customer_list.push(value);
    });
    // state.lcn_customer_list = value;
  },
  SET_CUSTM_LOADING(state, value) {
    state.custm_loading = value;
  },

  //   setDatasList(state, value) {
  //     state.datas_list = value;
  //   },
  //   setFilterSearch(state, value) {
  //     state.filter_search = value
  //   }
};
const actions = {
  settingReturnCustomerLocation: ({ commit, state, dispatch }, value) => {
    state.lcn_spinner_loading = true;
    LocationCheckingservice.settingReturnCustomerLocation(value)
      .then((response) => {
        state.lcn_spinner_loading = false;
        // console.log(response.body.success.data);
        state.lcn_customer_list = response.body.success.data ;
        state.token = Vue.localStorage.get('token')
        // commit("SET_CUSTOMER_LIST_LOCATION",  JSON.stringify() response.body.success.data);
        // state.lcn_customer_list =  JSON.stringify(response.body.success.data) ;
      })
      .catch((error) => console.log("setCustomerListService"));
  },
};

const getters = {
  lcn_customer_list: (state) => {
    return state.lcn_customer_list;
  },
  lcn_loading: (state) => {
    return state.lcn_loading;
  },
  lcn_spinner_loading: (state) => {
    return state.lcn_spinner_loading;
  },
  token: (state) => {
    return state.token;
  },
};
export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters,
};
