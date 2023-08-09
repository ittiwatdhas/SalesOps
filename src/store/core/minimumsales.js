import minimumsalesService from "../../services/core/minimumsales";
import Vue from "vue";

const state = {
  byGroupList: [],
  dataList: [],
  bySalesman: [],
  keepGroup: [],
  dataList_temp: [],
  bySalesman_temp: [],
  selectedTeam: {},
  spinnerLoading: false
};

const mutations = {
  setByGroupList(state, value) {
    state.byGroupList = [{ code: "", title: "All Sales Team" }];
    value.forEach(function(value, key) {
      if (value.code != "") {
        state.byGroupList.push(value);
      }
    });
  },
  setBySalesman(state, value) {
    state.bySalesman = [];
    value.forEach(function(value, key) {
      value.code = value.emp_id;
      value.title = value.first_name + " " + value.last_name;
      state.bySalesman.push(value);
    });
  },
  setSelectedTeam(state, value) {
    state.selectedTeam = value;
  },
  setSpinnerLoading(state, value) {
    state.spinnerLoading = value;
  },
  setDataList(state, value) {
    state.dataList = [];
    value.forEach(function(value, key) {
      value.status = value.status == 0 ? false : true;
      value.mode = false;
      value.temp_status = value.status;
      value.full_name = value.sm_code + " " + value.full_sm;
      value.minimum = isNaN(parseFloat(value.minimum)) ? 0 : value.minimum;
      value.temp_team_code = value.team_code;
      value.temp_sm_code = value.sm_code;
      value.temp_full_sm = value.full_sm;
      value.temp_team_name = value.team_name;
      value.temp_minimum = value.minimum;
      state.dataList.push(value);
    });
  },
  setDataListTemp(state, value) {
    state.dataList_temp = [];
    value.forEach(function(value, key) {
      value.status = value.status == 0 ? false : true;
      value.mode = false;
      value.full_name = value.sm_code + " " + value.full_sm;
      value.temp_status = value.status;
      value.minimum = isNaN(parseFloat(value.minimum)) ? 0 : value.minimum;
      value.temp_sm_code = value.sm_code;
      value.temp_team_code = value.team_code;
      value.temp_full_sm = value.full_sm;
      value.temp_team_name = value.team_name;
      value.temp_minimum = value.minimum;
      state.dataList_temp.push(value);
    });
  }
};

const actions = {
  getByGroups: ({ commit, dispatch }, value) => {
    minimumsalesService
      .getByGroups(value.user_emp_id)
      .then(response => {
        commit("setByGroupList", response);
        dispatch("getAllList", value);
      })
      .catch(error => console.log("getByGroups"));
  },
  getBySalesman: ({ commit, state }, value) => {
    minimumsalesService
      .getBySalesman(value)
      .then(response => {
        var rs = _.filter(response, item => {
          if (item.emp_id != value) {
            return true;
          }
        });
        state.bySalesman_temp = _.cloneDeep(rs);
        commit("setBySalesman", rs);
      })
      .catch(error => console.log("getBySalesman"));
  },
  getAllList: ({ commit, state }, value) => {
    commit("setSpinnerLoading", true);
    if (
      state.selectedTeam.code == Vue.localStorage.get("emp_id") ||
      state.selectedTeam.code == ""
    ) {
      var rs = _.filter(state.byGroupList, item => {
        if (item.code != "") {
          return true;
        }
      });
      let code = _.map(rs, "code");
      value.user_emp_id = code;
      value.mode = "all";
      minimumsalesService
        .getAllList(value)
        .then(res => {
          commit("setDataList", res);
          commit("setDataListTemp", res);
          commit("setSpinnerLoading", false);
        })
        .catch(error => console.log("getAllList2"));
    } else {
      value.mode = "all";
      minimumsalesService
        .getAllList(value)
        .then(res => {
          commit("setDataList", res);
          commit("setDataListTemp", res);
          commit("setSpinnerLoading", false);
        })
        .catch(error => console.log("getAllList2"));
    }
  },
  setectedTeamsPerRow: ({ commit, state, dispatch }, value) => {
    // dispatch("getMasterRow", value);
  },
  filterSM: ({ commit, state }, param) => {
    var re = new RegExp("^" + param, "i");
    let theArray = _.cloneDeep(state.bySalesman_temp);
    var response = theArray.filter(item => {
      if (item["emp_id"].match(re)) {
        return true;
      } else if (item["name"].match(re)) {
        return true;
      }
    });
    commit("setBySalesman", response);
  },
  getMasterRow: ({ commit, state }, value) => {
    // commit("setSpinnerLoading", true);
    let team_code = value.team_code;
    var checkGroup = _.filter(state.keepGroup, item => {
      if (item.groupId == team_code) {
        return true;
      }
    });
    var checkSM = _.filter(state.dataList, item => {
      if (item.team_code == team_code) {
        return true;
      }
    });
    let sm_code = _.map(checkSM, "sm_code");
    // if (checkGroup.length == 0) {
    minimumsalesService
      .getBySalesman(team_code)
      .then(res => {
        // keep group
        state.keepGroup.push({
          groupId: team_code,
          detail: _.cloneDeep(res)
        });
        // ทำเรื่องข้อมูลตรง dropdown ต่อ
        sm_code.forEach(function(value, key) {
          _.remove(res, function(val) {
            return val.sm_code == value;
          });
        });
        state.bySalesman_temp = _.cloneDeep(res);
        commit("setBySalesman", res);
        commit("setSpinnerLoading", false);
      })
      .catch(error => console.log("getBySalesman"));
    // } else {
    //   // let theArray = _.cloneDeep(checkGroup[0].detail);
    //   // sm_code.forEach(function(value, key) {
    //   //   _.remove(theArray, function(val) {
    //   //     return val.emp_id == value;
    //   //   });
    //   // });
    //   // state.bySalesman_temp = _.cloneDeep(theArray);
    //   // commit("setBySalesman", theArray);
    // }
  },
  filterData: ({ commit, state }, param) => {
    let theArray = _.cloneDeep(state.dataList_temp);
    var re = new RegExp("^" + param, "i");
    var response = theArray.filter(item => {
      if (item["sm_code"].match(re)) {
        return true;
      } else if (item["full_sm"].match(re)) {
        return true;
      } else if (item["team_code"].match(re)) {
        return true;
      } else if (item["team_name"].match(re)) {
        return true;
      }
    });
    commit("setDataList", response);
  },
  clearSearch: ({ commit, state, dispatch }, value) => {
    let theArray = _.cloneDeep(state.dataList_temp);
    commit("setDataList", theArray);
  },
  save: ({ commit, state, dispatch }, value) => {
    commit("setSpinnerLoading", true);
    let objSave = _.cloneDeep(value["save"]);
    objSave.id = isNaN(parseFloat(objSave.id)) ? "new" : objSave.id;
    objSave.status = objSave.status == false ? 0 : 1;
    if (objSave.minimum != objSave.temp_minimum) {
      objSave.minimum_previous = objSave.temp_minimum;
    }
    minimumsalesService
      .save(objSave)
      .then(res => {
        dispatch("getAllList", value.load);
      })
      .catch(error => console.log("save"));
  }
};

const getters = {
  byGroupList: state => {
    return state.byGroupList;
  },
  dataList: state => {
    return state.dataList;
  },
  bySalesman: state => {
    return state.bySalesman;
  },
  selectedTeam: state => {
    return state.selectedTeam;
  },
  spinnerLoading: state => {
    return state.spinnerLoading;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
