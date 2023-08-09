import Vue from "vue";
import moment from "moment";
import activityMngservice from "../../services/activity/activityMng";
import _ from "lodash";

const state = {

  filter_search: {
    sm_code: "",
    cust_code: "",
  },
  loadingMain: false,
  spinnerLoading: false,
  showBar: false,
  spinner: false,
  selected_date: {
    month: moment().format('MM'),
    year: moment().format('YYYY'),
    range: "-"
  },
  datas_list: [],
  listAutoSM:[],
  listAutoCust:[],
  listDataSMDetail:[],
  listDataCustDetail:[]



};
const mutations = {
  
  setDatasList(state, value) {
    state.datas_list = value;
  },
  // setDataDefault(state, value) {
  //   state.data_default = value;
  // },
  setFilterSearch(state, value) {
    state.filter_search = value
  }

};

const actions = {

  getList: ({ commit, state }) => {
    state.spinner = true;
    let param = {
      range: state.selected_date.range,
      month: state.selected_date.month,
      year: state.selected_date.year,
      filter: state.filter_search
    };
    activityMngservice
      .getDataActivityList(param)
      .then(response => {
        commit("setDatasList", response);
        state.spinner = false;
      })
      .catch();
  },
  filterSaleman: ({ state }, value) => {
    activityMngservice
      .filterSaleman(value)
      .then(response => {
        state.listAutoSM = response;
      })
      .catch();
  },
  filterCustomer: ({ state }, value) => {
    activityMngservice
      .filterCustomer(value)
      .then(response => {
        state.listAutoCust = response
      })
      .catch();
  },
  filterSalemanAdd: ({ state }, value) => {
    activityMngservice
      .filterSaleman(value)
      .then(response => {
        state.listDataSMDetail = response;
      })
      .catch();
  },
  filterCustomerAdd: ({ state }, value) => {
    activityMngservice
      .filterCustomer(value)
      .then(response => {
        state.listDataCustDetail = response
      })
      .catch();
  },
  saveActivityDetail:({commit, state }, value) => {
    state.spinner = true;
    let param = {
      range: state.selected_date.range,
      month: state.selected_date.month,
      year: state.selected_date.year,
      filter: state.filter_search
    };
    activityMngservice
    .saveActivityDetail(value)
    .then(response => {
      activityMngservice
        .getDataActivityList(param)
        .then(response => {
          commit("setDatasList", response);
          state.spinner = false;
        })
        .catch();
      // state.listDataCustDetail = response
    })
    .catch();
  }
  

  
};

const getters = {
  datasList: state => {
    return state.datas_list;
  },
  dataDefault: state => {
    return state.data_default
  },
  filter_search: state => {
    return state.filter_search;
  },
  spinner: state => {
    return state.spinner;
  },
  selected_date: state => {
    return state.selected_date;
  },
  listAutoSM: state => {
    return state.listAutoSM;
  },
  listAutoCust: state => {
    return state.listAutoCust;
  },
  listDataSMDetail: state => {
    return state.listDataSMDetail;
  },
  listDataCustDetail: state => {
    return state.listDataCustDetail;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
