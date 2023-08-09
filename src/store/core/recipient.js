import recipientService from "../../services/core/recipient";
import Vue from "vue";

const state = {
  spinnerLoading: false,
  keepAllSM: [],
  byGroupList: [],
  bySMList: [],
  dataList: [],
  dataListTemp: [],
  dataAllData: [],
  countData: 0,
  smnoGroup: [],
  smnoGroupTemp: [],
  arrDetails: [],
  spinnerLoadingDG: false,
  statusAtv: true,
  dataDefault : {
    year : '',
    cycle : '',
    payStatus : true
  },
  dataDefaultList : {
    years: [],
    cycles : [],
  },
  status_look:false,
  flow_state:'',
};

const mutations = {
  setByGroupList(state, value) {
    state.byGroupList = [{ code: "", title: "All Recipient Group" }];
    var rsNull = _.filter(value, item => {
      if (item.group_status == 0) {
        return true;
      }
    });
    if (rsNull.length > 0) {
      state.byGroupList.push({ code: "", title: "NONE GROUP" });
    }
    value.forEach(function (value, key) {
      if (value.group_status == 1) {
        value.code = value.group_code;
        value.title = value.group_name;
        state.byGroupList.push(value);
      }
    });
  },
  setBySMList(state, value) {
    state.bySMList = [];
    value.forEach(function (value, key) {
      value.code = value.sm_code;
      value.title = value.sm_name;
      state.bySMList.push(value);
    });
  },
  setSpinnerLoading(state, value) {
    state.spinnerLoading = value;
  },
  spinnerLoadingDG(state, value) {
    state.spinnerLoadingDG = value;
  },
  setsmNoGroup(state, value) {
    state.smnoGroup = value;
  },
  setDataList(state, value) {
    state.dataList = [];
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      if(element.group_name != 'NONE GROUP' ){
          for (let x = 0; x < element.details.length; x++) {
            const data = element.details[x];
            data.min_target = parseInt(data.min_target).toLocaleString()
            // console.log(parseInt(data.min_target).toLocaleString())
          }
      }
    }
    value.forEach(function (val, keys) {
      val["details"].forEach(function (value, key) {
        value.paid = value.paid == 0 ? false : true;
        value.temp_paid = value.paid == 0 ? false : true;
      });
     
     
      state.dataList.push(val);
    });
   
  },
  setDetailList(state, value) {
    state.arrDetails = [];
    value.forEach(function (value, keys) {
      value.paid = value.paid == 0 ? false : true;
      value.temp_paid = value.paid == 0 ? false : true;
      state.arrDetails.push(value);
    });
  },
  setDataListTemp(state, value) {
    state.dataListTemp = [];
    value.forEach(function (val, keys) {
      val["details"].forEach(function (value, key) {
        value.paid = value.paid == 0 ? false : true;
        value.temp_paid = value.paid == 0 ? false : true;
      });
      state.dataListTemp.push(val);
    });
  },
  setstatusAtv(state, value) {
    state.statusAtv = value;
  },
  setdataDefault(state, value) {
    state.dataDefault = value;
  },
  setdataDefaultList(state, value) {
    state.dataDefaultList = value;
  },

};

const actions = {
  getSalesmanByKey: ({ commit, state, dispatch }, value) => {
    var arr_value = {
      statusAtv : state.statusAtv,
    };
    commit("setSpinnerLoading", true);
    recipientService
      .getSalesmanByKey(value)
      .then(response => {
        // console.log(response);

        state.dataDefaultList.team_arr = response.team_arr;
        state.dataDefaultList.years = response.years;
        state.dataDefaultList.cycles = [];
        let pay_status = 0
        var rsYear = _.filter(response.years, item => {
          if (item.check == true) {
            return true;
          }
        });
        if (rsYear.length > 0) {
          state.dataDefault.year = rsYear[0].code;
          arr_value.year = rsYear[0].code;
          pay_status++
        }else{
          if(response.years.length > 0){
            state.dataDefault.year = response.years[(response.years.length)- 1].code;
            arr_value.year = response.years[(response.years.length)- 1].code;
          }
        }

        if(response.team_arr[state.dataDefault.year]){
          _.forEach(response.team_arr[state.dataDefault.year], function (values) {
            let obj_c = {
              code : values.code,
              name : values.name,
              check : values.check
            }
            state.dataDefaultList.cycles.push(obj_c) 
            })

        }
        let cycle_list = state.dataDefaultList.cycles
        // state.dataDefaultList.cycles = response.cycles;

        var rsCycle = _.filter(cycle_list, item => {
          if (item.check == true) {
            return true;
          }
        });
        if (rsCycle.length > 0) {
          state.dataDefault.cycle = rsCycle[0].code;
          arr_value.cycle = rsCycle[0].code;
          pay_status++
        }else{
          if(cycle_list.length > 0){
            state.dataDefault.cycle = cycle_list[(cycle_list.length)- 1].code;
            arr_value.cycle = cycle_list[(cycle_list.length)- 1].code;
          }
        }
        state.dataDefault.payStatus = (pay_status == 2)?true:false
        if(response.sales.length > 0){
          state.keepAllSM = response.sales[0].SalesmanCode;
          arr_value.sales = response.sales[0].SalesmanCode;
        }
        // state.keepAllSM = response.sales[0].SalesmanCode;
        // arr_value.sales = response.sales[0].SalesmanCode;
        recipientService
          .getRecList(arr_value)
          .then(result => {
            commit("setSpinnerLoading", false);
            commit("setByGroupList", result["bygroup"]);
            commit("setBySMList", result["bysales"]);
            state.status_look = result["status_look"];
            state.flow_state = result["flow_state"];
            state.dataAllData = _.cloneDeep(result);
            dispatch("getBySalesman", result);
          })
          .catch(error => console.log("getRecDP"));
      })
      .catch(error => console.log("getSalesmanByKey"));
  },
  getBySalesman: ({ commit, state }, value) => {
    commit("setDataList", []);
    let arr = [];
    state.countData = value["bysales"].length;
    var rsNull = _.filter(value["bysales"], item => {
      if (item.group_status == 0) {
        return true;
      }
    });
    if (rsNull.length > 0) {
      _.forEach(rsNull, function (row) {
        // row.group_name = "NONE GROUP";
        // row.group_code = "none_group";
        row.paid = row.paid == 1 ? true : false;
        row.temp_paid = row.paid == 1 ? true : false;
      });
      arr.push({
        group_name: "NONE GROUP",
        group_code: "",
        details: _.sortBy(rsNull, "code")
      });
    }
    _.forEach(value["bygroup"], function (row) {
      if (row.group_status == 1) {
        var rs = _.filter(value["bysales"], item => {
          if (item.group_code == row.group_code) {
            return true;
          }
        });
        if (rs.length > 0) {
          arr.push({
            group_name: rs[0].group_name,
            group_code: rs[0].group_code,
            details: _.sortBy(rs, "code")
          });
        }
      } else {
        arr.push({
          group_name: row.group_name,
          group_code: row.group_code,
          details: []
        });
      }
    });
    commit("setDataList", arr);
    commit("setDataListTemp", arr);
  },
  selectedGroup: ({ commit, state, dispatch }, value) => {
    let data = _.cloneDeep(state.dataListTemp);
    if (typeof value.group_code == "undefined") {
      if (value.title == "NONE GROUP") {
        var rs = _.filter(data, item => {
          if (item.group_code == value.code) {
            return true;
          }
        });
        state.countData = rs[0]["details"].length;
        commit("setDataList", rs);
      } else {
        commit("setDataList", data);
        state.countData = state.dataAllData["bysales"].length;
      }
    } else {
      var rs = _.filter(data, item => {
        if (item.group_code == value.group_code) {
          return true;
        }
      });
      state.countData = rs[0]["details"].length;
      commit("setDataList", rs);
    }
  },
  clearSearch: ({ commit, state }) => {
    let data = _.cloneDeep(state.dataListTemp);
    state.countData = state.dataAllData["bysales"].length;
    commit("setDataList", data);
  },
  filterData: ({ commit, state }, param) => {
    let theArray = _.cloneDeep(state.dataAllData);
    const response = theArray["bysales"].filter(word => {
      const str = word.code + word.title;
      // const str = word.code + word.first_name+ word.last_name+ word.last_name;
      return str.toUpperCase().indexOf(param.toUpperCase()) !== -1;
    });
    commit("setBySMList", response);
  },
  chooseSales: ({ commit, state }, value) => {
    let data = _.cloneDeep(state.dataListTemp);
    if (value.group_code == "none_group") {
      var rs = _.filter(data, item => {
        if (item.group_name == value.group_name) {
          return true;
        }
      });
    } else {
      var rs = _.filter(data, item => {
        if (item.group_code == value.group_code) {
          return true;
        }
      });
    }

    commit("setDataList", rs);
    state.countData = rs[0]["details"].length;
  },
  updatePaid: ({ state }, value) => {
    value.cycle = state.dataDefault.cycle,
    value.year = state.dataDefault.year
    // console.log("==>");
    recipientService
      .updateRec(value, "paid")
      .then(result => {
        // console.log("updatePaid success =>");
      })
      .catch(error => console.log("updatePaid"));
  },
  updateTarget: ({ state }, value) => {
   const res = {
    emp_id: value.data.code,
    emp_code: value.data.emp_code,
    mode: 'min_target',
    fiscal_year: value.data.fiscal_year,
    fiscal_cycle: value.data.fiscal_cycle,
    group_code: value.data.group_code,
    group_name: value.data.group_name,
    target: value.target,
    type: value.type
   }
    recipientService
      .updateTarget(res)
      .then(result => {
        // console.log("updatePaid success =>",result);
      })
      .catch(error => console.log("updateTarget"));
  },
  updateGroupName: ({ state, commit, dispatch }, value) => {
    value.cycle = state.dataDefault.cycle,
    value.year = state.dataDefault.year
    var arr_value = {
      statusAtv : state.statusAtv,
      sales : state.keepAllSM,
      cycle : state.dataDefault.cycle,
      year : state.dataDefault.year
    };
    commit("setSpinnerLoading", true);
    recipientService
      .updateRec(value, "group_name")
      .then(res => {
        recipientService
          .getRecList(arr_value)
          .then(result => {
            commit("setByGroupList", result["bygroup"]);
            commit("setBySMList", result["bysales"]);
            state.status_look = result["status_look"];
            state.flow_state = result["flow_state"];
            state.dataAllData = _.cloneDeep(result);
            dispatch("getBySalesman", result);
            commit("setSpinnerLoading", false);
          })
          .catch(error => console.log("getRecDP"));
      })
      .catch(error => console.log("updateGroupName"));
  },
  addChips: ({ state, commit, dispatch }, value) => {
    var arr_value = {
      statusAtv : state.statusAtv,
      sales : state.keepAllSM,
      cycle : state.dataDefault.cycle,
      year : state.dataDefault.year
    };
    commit("setSpinnerLoading", true);
    value.emp_ids = state.keepAllSM
    value.cycle = state.dataDefault.cycle,
    value.year = state.dataDefault.year
    recipientService
      .updateRec(value, "addchips")
      .then(res => {
        commit("setDetailList", []);
        recipientService
          .getRecList(arr_value)
          .then(result => {

            commit("setByGroupList", result["bygroup"]);
            commit("setBySMList", result["bysales"]);
            state.status_look = result["status_look"];
            state.flow_state = result["flow_state"];
            state.dataAllData = _.cloneDeep(result);
            dispatch("getBySalesman", result);
            commit("setSpinnerLoading", false);
          })
          .catch(error => console.log("getRecDP"));
      })
      .catch(error => console.log("updateRec"));
  },
  saveGroup: ({ state, commit, dispatch }, value) => {
    var arr_value = {
      statusAtv : state.statusAtv,
      sales : state.keepAllSM,
      cycle : state.dataDefault.cycle,
      year : state.dataDefault.year
    };

    value.emp_ids = state.keepAllSM
    value.cycle = state.dataDefault.cycle,
    value.year = state.dataDefault.year
    commit("spinnerLoadingDG", true);

    recipientService
      .updateRec(value, "addchips")
      .then(result => {
        commit("setDetailList", result);
        dispatch("getSalesmanNoGroup");
        commit("spinnerLoadingDG", false);
        recipientService
          .getRecList(arr_value)
          .then(result => {
            commit("setByGroupList", result["bygroup"]);
            commit("setBySMList", result["bysales"]);
            state.status_look = result["status_look"];
            state.flow_state = result["flow_state"];
            // commit("setDetailList", result["bysales"]);
            state.dataAllData = _.cloneDeep(result);
            dispatch("getBySalesman", result);
          })
          .catch(error => console.log("getRecDP"));
      })
      .catch(error => console.log("updateRec"));
  },
  leaveGroup: ({ state, commit, dispatch }, value) => {
    var arr_value = {
      statusAtv : state.statusAtv,
      sales : state.keepAllSM,
      cycle : state.dataDefault.cycle,
      year : state.dataDefault.year
    };

    value.cycle = state.dataDefault.cycle,
    value.year = state.dataDefault.year
    commit("setSpinnerLoading", true);
    recipientService
      .updateRec(value, "leavegroup")
      .then(result => {
        recipientService
          .getRecList(arr_value)
          .then(result => {
            commit("setByGroupList", result["bygroup"]);
            commit("setBySMList", result["bysales"]);
            state.status_look = result["status_look"];
            state.flow_state = result["flow_state"];
            state.dataAllData = _.cloneDeep(result);
            dispatch("getBySalesman", result);
            commit("setSpinnerLoading", false);
          })
          .catch(error => console.log("getRecDP"));
      })
      .catch(error => console.log("leaveGroup"));
  },
  getSalesmanNoGroup: ({ state, commit }) => {
    var arr_value = {
      statusAtv : state.statusAtv,
      sales : state.keepAllSM,
      cycle : state.dataDefault.cycle,
      year : state.dataDefault.year
    };
    recipientService
      .getSalesmanNoGroup(arr_value)
      .then(result => {
        commit("setsmNoGroup", result);
        state.smnoGroupTemp = _.cloneDeep(result);
      })
      .catch(error => console.log("leaveGroup"));
  },
  checkDupSM: ({ state, commit }, value) => {
    let data = _.cloneDeep(state.smnoGroupTemp);
    let arrDetails = _.cloneDeep(state.arrDetails);
    value.forEach(function (value, key) {
      _.remove(data, function (val) {
        return val.code == value.code;
      });
    });
    arrDetails.forEach(function (value, key) {
      _.remove(data, function (val) {
        return val.code == value.code;
      });
    });
    commit("setsmNoGroup", data);
  },
  filterRec: ({ commit, state }, value) => {
    let theArray = _.cloneDeep(state.smnoGroupTemp);
    const response = theArray.filter(word => {
      const str = word.code + word.title;
      return str.toUpperCase().indexOf(value.param.toUpperCase()) !== -1;
    });
    let arrDetails = _.cloneDeep(state.arrDetails);
    arrDetails.forEach(function (row, key) {
      _.remove(response, function (val) {
        return val.code == row.code;
      });
    });
    value.chips.forEach(function (row, key) {
      _.remove(response, function (val) {
        return val.code == row.code;
      });
    });
    // console.log(response)
    commit("setsmNoGroup", response);
  },
  changeStatusAtv: ({ commit, state, dispatch }) => {
    var arr_value = {
      statusAtv : state.statusAtv,
      sales : state.keepAllSM,
      cycle : state.dataDefault.cycle,
      year : state.dataDefault.year
      
    };
    state.flow_state = ''
    commit("setSpinnerLoading", true);
    recipientService
      .getRecList(arr_value)
      .then(result => {
        commit("setByGroupList", result["bygroup"]);
        commit("setBySMList", result["bysales"]);
        state.status_look = result["status_look"];
        state.flow_state = result["flow_state"];
        state.dataAllData = _.cloneDeep(result);
        dispatch("getBySalesman", result);
        commit("setSpinnerLoading", false);
      })
      .catch(error => console.log("getRecDP"));

  },
  updateStatusGroup: ({ state, commit, dispatch }, value) => {
    var arr_value = {
      statusAtv : state.statusAtv,
      sales : state.keepAllSM,
      cycle : state.dataDefault.cycle,
      year : state.dataDefault.year
    };
    value.cycle = state.dataDefault.cycle,
    value.year = state.dataDefault.year
    commit("setSpinnerLoading", true);
    recipientService
      .updateRec(value, "changestatusgroup")
      .then(result => {
        recipientService
          .getRecList(arr_value)
          .then(result => {
            commit("setByGroupList", result["bygroup"]);
            commit("setBySMList", result["bysales"]);
            state.status_look = result["status_look"];
            state.flow_state = result["flow_state"];
            state.dataAllData = _.cloneDeep(result);
            dispatch("getBySalesman", result);
            commit("setSpinnerLoading", false);
          })
          .catch(error => console.log("getRecDP"));
      })
      .catch(error => console.log("leaveGroup"));
  },
  updatePayStatus: ({ state, commit }, value) => {
    value.cycle = state.dataDefault.cycle,
    value.year = state.dataDefault.year
    commit("setSpinnerLoading", true);
    recipientService
      .updateRec(value, "changepaystatus")
      .then(result => {
        // commit("setdataDefaultList", result);
        commit("setSpinnerLoading", false);
      })
      .catch(error => console.log("updatePaid"));
  },
  
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
  },
  countData: state => {
    return state.countData;
  },
  bySMList: state => {
    return state.bySMList;
  },
  smnoGroup: state => {
    return state.smnoGroup;
  },
  arrDetails: state => {
    return state.arrDetails;
  },
  spinnerLoadingDG: state => {
    return state.spinnerLoadingDG;
  },
  dataAllData: state => {
    return state.dataAllData;
  },
  statusAtv: state => {
    return state.statusAtv;
  },
  dataDefault: state => {
    return state.dataDefault
  },
  dataDefaultList: state => {
    return state.dataDefaultList
  },
  statusLook: state => {
    return state.status_look
  },
  getflowState: state => {
    return state.flow_state
  }


};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
