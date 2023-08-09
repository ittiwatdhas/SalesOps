import departmentService from "../../services/core/departmentManage";
import Vue from "vue";

const state = {
  dm_all_ALLSTATUS: 0,
  dm_ACTIVE: 0,
  dm_INACTIVE: 0,
  dm_deatil_list: [],
  dm_loading: true,
  dm_spinner_loading: false,
  dataListSearch: [],
  dataList: [],
};
const mutations = {
  SET_DM_DETAIL_LIST(state, value) {
    state.dm_deatil_list = value
  },
  SET_DM_LIST_SEARCH(state, value) {
    state.dataListSearch = value;
  },
  SET_DM_LIST(state, value) {
    state.dataList = value;
  },
  
};
const actions = {
  settingDepartment: ({ commit}, value) => {
    departmentService
      .settingDepartment(value)
      .then((response) => {
        commit("SET_DM_LIST_SEARCH", response.data);
        if(state.dm_deatil_list.length == 0){
          commit("SET_DM_DETAIL_LIST", response.data);
        }
      })
      .catch((error) => console.error("error => getAllDepartment"));
  },
  settingCountDepartment: () => {
    departmentService
      .settingCountDepartment()
      .then((response) => {
        state.dm_all_ALLSTATUS = response.data.count_all;
        state.dm_ACTIVE = response.data.count_active;
        state.dm_INACTIVE = response.data.count_inactive;
      })
      .catch((error) => console.error("error => settingCountDepartment"));
  },
  settingDepartmentSearch: ({ commit, state }, value) => {
    departmentService
      .settingDepartmentSearch(value)
      .then((response) => {
        // console.log("settingDepartmentSearch Res => ",response.data);
        commit("SET_DM_LIST", response.data);
      })

      .catch((error) => console.error("error => settingDepartmentSearch"));
  },
  settingSaveDepartment: ({ commit, state, dispatch }, value) => {
    departmentService
      .settingSaveDepartment(value)
      .then((response) => {
        dispatch("settingCountDepartment");
        let theObject = {
          code: value.search_code,
          type: value.type,
          sort: value.sort,
          orderby: value.orderby
      }
      dispatch("settingDepartmentSearch", theObject);
      })

      .catch((error) => console.error("error => settingSaveDepartment"));
  },
};

const getters = {
  dm_all_ALLSTATUS: (state) => {
    return state.dm_all_ALLSTATUS;
  },
  dm_ACTIVE: (state) => {
    return state.dm_ACTIVE;
  },
  dm_INACTIVE: (state) => {
    return state.dm_INACTIVE;
  },
  dm_deatil_list: (state) => {
    return state.dm_deatil_list;
  },
  dmDataListSearch: (state) => {
    return state.dataListSearch;
  },
  dmDataList: (state) => {
    return state.dataList;
  },

};

export default {
  state,
  mutations,
  actions,
  getters,
};

// /setting-save-department
