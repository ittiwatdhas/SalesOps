import Vue from "vue";
import moment from "moment";
import service from "../../services/planning/payment";
import _ from "lodash";

const state = {

  act_path_payment_export: '',
  datas_list : {
    years: [],
    cycles : [],
    teams : [],
    status_show : false,
    state : {
      state: '',
      first_surname: '-' 
    }
  },
  team_list_selest: [],
  data_default : {
    year : '',
    cycle : ''
  },
  detail_list: {
    sales: [],
    total: [],
    total_year: []
  },
  loadingMain: false,
  showBar: false,


};
const mutations = {
  
  setTeamListSelect(state, value) {
    state.team_list_selest = value;
  },
  setDetailList(state, value) {
    state.detail_list = value;
  },
  setLoadingMain(state, value) {
    state.loadingMain = value;
  },
  setShowBar(state, value) {
    state.showBar = value;
  },
  setDatasList(state, value) {
    state.datas_list = value;
  },
  setDataDefault(state, value) {
    state.data_default = value;
  },

};

const actions = {
  getDataDefault: ({ commit, state }) => {
    let val = {
      view: 'dashboard_incentive',
    };
    service
      .getPaymentDefault(val)
      .then(response => {
        // console.log(response);
        state.datas_list = response;
        // _.forEach(response.teams, function (values) {
        //   if(values.checked == true){
        //     team_select.push(values.code)
        //   }
        // })
        // commit("setTeamListSelect", team_select);
        let default_year = ''
        let default_cycle = ''
        if(response.years.length >0){
          default_year = response.years[0].code
        }
        
        state.datas_list.cycles = []
        state.datas_list.teams = []
        if(response.team_arr[default_year]){
          _.forEach(response.team_arr[default_year], function (values) {
            let obj_c = {
              code : values.code,
              name : values.name
            }
            state.datas_list.cycles.push(obj_c) 
            })

        }

        if(state.datas_list.cycles.length >0){
          default_cycle =  state.datas_list.cycles[state.datas_list.cycles.length-1].code
          // console.log(state.datas_list.cycles[state.datas_list.cycles.length-1].code)
        }

        if(response.team_arr.length > 0){
          if(response.team_arr[default_year][default_cycle]['teams'].length > 0){
            state.datas_list.teams = response.team_arr[default_year][default_cycle]['teams']
          }
        }

        let team_select = []
        _.forEach(state.datas_list.teams, function (values) {
          if(values.checked == true){
            team_select.push(values.code)
          }
        })
        commit("setTeamListSelect", team_select);
        state.data_default.year = default_year
        state.data_default.cycle = default_cycle

        let obj = {
          team_select : team_select
          , year: default_year
          , cycle: default_cycle
          , view: 'dashboard_incentive'
        }
        service
        .getPaymentReportDetail(obj)
        .then(response => {
          state.datas_list.status_show = response.status_show
          state.datas_list.state = response.state
          state.datas_list.flow_state = response.flow_state,
          commit("setDetailList", response);
          commit("setLoadingMain", false);

        })
        .catch();

      })
      .catch();
  },

  getPaymentReportDetail: ({ state, commit },value) => {
    // console.log("getStep3DetailLoad",value);

    service
      .getPaymentReportDetail(value)
      .then(response => {
        commit("setDetailList", response);
        // value.data.total = response.total;
        // if (response.group.length > 0) {
        //   commit("setShowBar", true);
        // } else {
        //   commit("setShowBar", false);
        // }
        // value.data.group = response.group;
        // value.data.total_year = response.total_year;
        // commit("setDetailList", value.data);
        // commit("setLoadingMain", false);
      })
      .catch();
  },

  setExportReportService: ({ commit, state },value) => {
    let year = value.year;
    let cycle =  value.cycle;
    let teams = value.teams
    let url = value.url
    
    window.location.href = url + '?login=' + Vue.localStorage.get("emp_id") +
        '&year=' + year +
        '&cycle=' + cycle +
        '&teams=' + teams;

    // this.$router.push("/orders/myorders");
  },
};

const getters = {
  datasList: state => {
    return state.datas_list;
  },
  teamListSelect: state => {
    return state.team_list_selest;
  },
  dataDefault: state => {
    return state.data_default
  },
  detailList: state => {
    return state.detail_list
  },
  loadingMain: state => {
    return state.loadingMain;
  },
  showBar: state => {
    return state.showBar;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
