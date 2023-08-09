import usermanage from "../../services/core/usermanage";
import Vue from "vue";

const state = {
  usm_all_ALLSTATUS: 0,
  usm_ACTIVE: 0,
  usm_INACTIVE: 0,
  dataList: [],
  dataListSearch: [],
  dataListTemp: [],
  role_unused:[],
  role_used:[],

};

const mutations = {
  SET_USM_ALL_USER(state, value) {
    state.usm_all_user = value;
  },
  SET_USM_ACTIVE(state, value) {
    state.usm_active = value;
  },
  SET_USM_INACTIVE(state, value) {
    state.usm_inactive = value;
  },
  SET_USM_LIST(state, value) {
    // console.log("SET_USM_LIST",value);
    state.dataList = value
    state.dataListTemp = value
  },
  SET_USM_LIST_SEARCH(state, value) {
    // console.log("SET_USM_LIST_SEARCH",value);
    state.dataListSearch = value
  },
  SET_ROLE_USE(state, value){
    // console.log("🚀 ~ file: usermanage.js ~ line 36 ~ SET_ROLE_USE ~ value", value)
     state.role_used = value
  },
  SET(state , value) {
    state.dataList = value
  }
 
};

const actions = {
  settingUserAll: ({ commit, state }, value) => {
    usermanage
      .settingUserAll(value)
      .then((response) => {
        // console.log(response);
        commit("SET_USM_LIST_SEARCH", response.data);
      })
      .catch((error) => console.error("error => settingUserAll"));
  },
  settingCountUser: ({ commit, state }) => {
    usermanage
      .settingCountUser()
      .then((response) => {
        // console.log(response);
        state.usm_all_ALLSTATUS = response.data.count_all;
        state.usm_ACTIVE = response.data.count_active;
        state.usm_INACTIVE = response.data.count_inactive;
      })
      .catch((error) => console.error("error => settingCountUser"));
  },
  settingUserSearch: ({ commit, state },value) => {
    usermanage
      .settingUserSearch(value)
      .then((response) => {
      //  console.log("settingUserSearch Res => ",response);
        commit("SET_USM_LIST", response.data);
      })
      .catch((error) => console.error("error => settingUserSearch"));
  },
  settingSaveUser: ({ commit, state ,dispatch },value) => {
    usermanage
      .settingSaveUser(value)
      .then((response) => {
      //  console.log("settingSaveUser Res => ",response);
      //  this.$store.dispatch("settingDepartment", "");
      let srt = {
        code: '',
        type: '',
        sort: '',
        orderby: 'asc',
      }
       dispatch("settingUserSearch", srt);
      })
      .catch((error) => console.error("error => settingSaveUser"));
  },  
  settingRoleUser: ({ commit, state },value) => {
    usermanage
      .settingRoleUser()
      .then((response) => {
        state.role_unused = response.data.unused;
        state.role_used = response.data.used;
        // console.log('settingRoleUser => ',response.data.used);

      })
      .catch((error) => console.error("error => settingRoleUser"));
  },
  
};

const getters = {
  usm_all_ALLSTATUS: (state) => {
    return state.usm_all_ALLSTATUS;
  },
  usm_ACTIVE: (state) => {
    return state.usm_ACTIVE;
  },
  usm_INACTIVE: (state) => {
    return state.usm_INACTIVE;
  },
  usmDataList: (state) => {
    return state.dataList;
  },
  SET_USM_LIST(state, value) {
    // console.log("SET_USM_LIST",value);
    state.dataList = value
    state.dataListTemp = value
  },
  usmDataListTemp: (state) => {
    return state.dataListTemp;
  },
  usmDataListSearch: (state) => {
    return state.dataListSearch;
  },
  usmDataUnused: (state) => {
    return state.role_unused;
  },
  usmDataUsed: (state) => {
    return state.role_used;
  },

 
 
};

export default {
  state,
  mutations,
  actions,
  getters,
};

// 1.  API : /setting-user-all?keyword=
// TYPE : GET

// 2. API : /setting-count-user
// TYPE : GET

// 3. API : /setting-user-search?role_code=&type=&sort=description&orderby=asc
// TYPE : GET

// 4. API : /setting-save-user
// TYPE : POST
// ตัวอย่าง
// data_detail:{}
// type:add / edit
