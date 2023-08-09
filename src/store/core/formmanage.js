import formService from "../../services/core/formmanage";
import Vue from "vue";

const state = {
  spinnerLoading: false,
  dataList: [],
  headColumn: []
};

const mutations = {
  setSpinnerLoading(state, value) {
    state.spinnerLoading = value;
  },
  setDataList(state, value) {
    state.dataList = value;
  }
};

const actions = {
  getOrgForm: ({ commit, state, dispatch }, value) => {
    commit("setSpinnerLoading", true);
    formService
      .getOrgForm(value)
      .then(response => {
        state.headColumn = response;
        dispatch("getFormList");
      })
      .catch(error => console.log("getOrgForm"));
  },
  getFormList: ({ commit, state, dispatch }) => {
    formService
      .getALLFormList()
      .then(response => {
        _.forEach(response, function(row, idx) {
          let arr = row["role"].split(",");
          // row.form = "Create New Order";
          for (let i = 0; i < state.headColumn.length; i++) {
            let data = state.headColumn[i];
            var check = _.filter(arr, item => {
              if (data.role_code == item) {
                return true;
              }
            });
            row[data.role_code] = check.length > 0 ? true : false;
          }
        });
        commit("setDataList", response);
        commit("setSpinnerLoading", false);
      })
      .catch(error => console.log("getFormList"));
  },
  saveForm: ({ commit, state ,dispatch}, value) => {
    let rs = "";
    _.forEach(state.headColumn, function(row, idx) {
      if (value[row.role_code] == true) {
        rs = rs + row.role_code + ",";
      }
    });

    if (rs.length > 0) {
      rs = rs.substr(0, rs.length - 1);
    }
    commit("setSpinnerLoading", true);
    formService
      .save({ id: value.id, role: rs })
      .then(response => {
        dispatch("getFormList");
      })
      .catch(error => console.log("getFormList"));
  }
};

const getters = {
  dataList: state => {
    return state.dataList;
  },
  spinnerLoading: state => {
    return state.spinnerLoading;
  },
  headColumn: state => {
    return state.headColumn;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
