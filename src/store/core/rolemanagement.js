import rolemanagement from "../../services/core/rolemanagement";
import Vue from "vue";
const state = {
  role_all_ALLSTATUS: 0,
  role_ACTIVE: 0,
  role_INACTIVE: 0,
  rl_loading: true,
  rl_deatil_list: [],
  dataListSearch: [],
  dataList: [],
  dataList_full: [],
  dataListTemp: [],
  check_role_dup: "",
  
};
const mutations = {
  SET_RL_LIST_SEARCH(state, value) {
    state.dataListSearch = value;
  },
  SET_RL_LIST(state, value) {
    state.dataList = value;
    state.dataListTemp = value;
  },
  SET_CHECK_ROLE_CODE(state, value) {
    state.check_role_dup = value;
  },
  SET_DATA_ROLE_SEARCH(state , value) {
    state.dataList = value
  }
};
const actions = {
  settingRoleSearch_full: ({ commit, state }, value) => {
    rolemanagement
      .settingRoleSearch_full(value)
      .then((response) => {
      //  console.log("settingRoleSearch_full Res => ",response.data);
        // commit("SET_RL_LIST", response.data);
        state.dataList_full = response.data
      })
      .catch((error) => console.error("error => settingRoleSearch_full"));
  },

  
  settingRole: ({ commit, state }, value) => {
    rolemanagement
      .settingRole(value)
      .then((response) => {
        commit("SET_RL_LIST_SEARCH", response.data);
      })
      .catch((error) => console.error("error => getAllRole"));
  },
  settingCountRole: () => {
    rolemanagement
      .settingCountRole()
      .then((response) => {
        state.role_all_ALLSTATUS = response.data.count_all;
        state.role_ACTIVE = response.data.count_active;
        state.role_INACTIVE = response.data.count_inactive;
      })
      .catch((error) => console.error("error => settingCountRole"));
  },
  settingRoleSearch: ({ commit, state ,dispatch }, value) => {
    rolemanagement
      .settingRoleSearch(value)
      .then((response) => {
        dispatch('settingRoleSearch_full',value)
        commit("SET_RL_LIST", response.data);
      })
      .catch((error) => console.error("error => settingRoleSearch"));
  },
  settingSaveRole: ({ commit, state, dispatch }, value) => {
    rolemanagement
      .settingSaveRole(value)
      .then((response) => {
      
        if (response.body.duplicate) {
          //no Action  ( Duplicate )
        } else {
          console.log("success")
          //close Popup is success
        }
        dispatch("settingCountRole");
        let theObject = {
          code: "",
          type: "",
          sort: "",
          orderby: "",
        };
        dispatch("settingRoleSearch", theObject);
      })
      .catch((error) => console.error("error => settingSaveRole"));
  },
};

const getters = {
  role_all_ALLSTATUS: (state) => {
    return state.role_all_ALLSTATUS;
  },
  role_ACTIVE: (state) => {
    return state.role_ACTIVE;
  },
  role_INACTIVE: (state) => {
    return state.role_INACTIVE;
  },
  roleDataListSearch: (state) => {
    return state.dataListSearch;
  },
  roleDataList: (state) => {
    return state.dataList;
  },
  roleDataListTemp: (state) => {
    return state.dataListTemp;
  },
  check_role_dup: (state) => {
    return state.check_role_dup;
  },
  dataList_full: (state) => {
    return state.dataList_full;
  }
 
};

export default {
  state,
  mutations,
  actions,
  getters,
};
// 1.  API : /setting-role-all?keyword=
// TYPE : GET

// 2. API : /setting-role-user
// TYPE : GET

// 3. API : /setting-role-search?code=&type=&sort=description&orderby=asc
// TYPE : GET

// 4. API : /setting-save-role
// GET : POST
// ตัวอย่าง
// data_detail:{}
// type:add / edit
