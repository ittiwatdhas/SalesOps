import datatransfer from "../../services/core/datatransfer";
import Vue from "vue";
const state = {
//   role_all_ALLSTATUS: 0,
list_detail:[],
logs:[],
loading:false,
loading_history:false,
check_detail_log:false

};
const mutations = {
  'SET_LOG_HIS'(state, value) {
    state.logs = value;
},
};
const actions = {
    listApi: ({ commit, state }, value) => {
      state.loading = true
    datatransfer
      .listApi(value)
      .then((response) => {
        state.loading = false
        for (let index = 0; index < response.body.success.data.length; index++) {
          const element = response.body.success.data[index];
          Object.assign(element, {
            value_input:'',
            index: index+1
          });
        }
        state.list_detail = response.body.success.data
        // Object.assign(target, source)
      })
      .catch((error) => console.error("error => listApi"));
  },
  runApi: ({ commit, state ,dispatch}, value) => {
    state.loading = true
    datatransfer
      .runApi(value)
      .then((response) => {
        state.loading = false
            // console.log('listApi =>', response)
            dispatch('listApi','T')
      })
      .catch((error) => console.error("error => runApi"));
  },
  runApi_R: ({ commit, state ,dispatch}, value) => {
    state.loading = true
    datatransfer
      .runApi(value)
      .then((response) => {
        state.loading = false
            // console.log('runApi_R =>', response)
            dispatch('listApi','R')
      })
      .catch((error) => console.error("error => runApi_R"));
  },
  historyLog: ({ commit, state ,dispatch}, value) => {
    state.loading_history = true
    datatransfer
      .historyLog(value)
      .then((response) => {
        state.loading_history = false
            state.logs = response.body.success.data
           
            if(response.body.success.data.length == 1 && response.body.success.data[0].emp_id === '-'){
              state.check_detail_log = true
            }else {
              state.check_detail_log = false
            }
      })
      .catch((error) => console.error("error => historyLog"));
  },
//   settingRole: ({ commit, state }, value) => {
//     rolemanagement
//       .settingRole(value)
//       .then((response) => {
//         commit("SET_RL_LIST_SEARCH", response.data);
//       })
//       .catch((error) => console.error("error => getAllRole"));
//   },
//   settingCountRole: () => {
//     rolemanagement
//       .settingCountRole()
//       .then((response) => {
//         state.role_all_ALLSTATUS = response.data.count_all;
//         state.role_ACTIVE = response.data.count_active;
//         state.role_INACTIVE = response.data.count_inactive;
//       })
//       .catch((error) => console.error("error => settingCountRole"));
//   },
//   settingRoleSearch: ({ commit, state }, value) => {
//     rolemanagement
//       .settingRoleSearch(value)
//       .then((response) => {
//         //  console.log("settingRoleSearch Res => ",response.data);
//         commit("SET_RL_LIST", response.data);
//       })
//       .catch((error) => console.error("error => settingRoleSearch"));
//   },
//   settingSaveRole: ({ commit, state, dispatch }, value) => {
//     rolemanagement
//       .settingSaveRole(value)
//       .then((response) => {
      
//         if (response.body.duplicate) {
//           //no Action  ( Duplicate )
//         } else {
//           console.log("success")
//           //close Popup is success
//         }
//         dispatch("settingCountRole");
//         let theObject = {
//           code: "",
//           type: "",
//           sort: "",
//           orderby: "",
//         };
//         dispatch("settingRoleSearch", theObject);
//       })
//       .catch((error) => console.error("error => settingSaveRole"));
//   },
};

const getters = {
    list_detail:(state) =>{
        return state.list_detail
    },
    logs:(state) =>{
        return state.logs
    },
    loading:(state) =>{
        return state.loading
    },
    loading_history:(state) =>{
      return state.loading_history
  },
  check_detail_log:(state) =>{
    return state.check_detail_log
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
