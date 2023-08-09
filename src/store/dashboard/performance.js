import performanceService from "../../services/dashboard/performance";
import Vue from "vue";
import _ from "lodash";
const state = {
  date_selected: {
    month_id: "",
    month: "",
    year: ""
  },
  spinner_loading: false,
  period_detail: {
    block1: {
      value: 0,
      text: "Sales Target"
    },
    block2: {
      value: 0,
      text: "Sales Achieved"
    },
    progress: {
      value: 0,
      text: "0"
    },
    button: {
      value: 5600,
      text: "Incentive",
      mode: true
    }
  },
  graph_options: {
    tooltip: {
      trigger: "item",
      formatter: function(params) {
        let val = parseFloat(params.value[1]).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        var tooltip = "<span>+฿ " + val + "</span>";
        return tooltip;
      },
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#FD7F00",
          color: "#FFF",
          fontFamily: "Roboto",
          fontSize: 12,
          show: false
        },
        crossStyle: {
          color: "#FD7F00",
          type: "solid",
          opacity: 0
        }
      },
      position: function(point, params, dom, rect, size) {
        // console.log(point);
        // return [point[0] - 2, point[1] - 2];
      },
      backgroundColor: "#FD7F00",
      textStyle: {
        color: "#FFF",
        fontFamily: "Roboto",
        fontSize: 12
      }
    },
    title: {
      show: false
    },
    legend: {
      top: "5%",
      left: "3%",
      show: true,
      data: ["Sales Quota", "Sales Achieved"],
      textStyle: {
        color: "#fff",
        fontFamily: "Roboto",
        fontSize: 12,
        padding: [0, 20, 0, 0]
      }
    },
    grid: {
      left: "0.5%",
      right: "0.5%",
      top: "1%",
      height: "98%",
      width: "97.5%",
      containLabel: true
    },
    backgroundColor: "#484848",
    xAxis: {
      min: 0,
      splitNumber: 31,
      scale: false,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      show: false
    },
    yAxis: {
      show: false,
      splitNumber: 10,
      min: 0,
      max: 4000000,
      scale: false,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: "Sales Achieved",
        type: "line",
        data: [],
        lineStyle: {
          width: 1
        },
        // symbol: 'rect',
        symbolSize: 5,
        itemStyle: {
          color: "#FFF",
          borderColor: "#FFF"
        },
        label: {
          color: "#fff",
          borderRadius: 20
        }
      },
      {
        name: "Sales Quota",
        type: "line",
        lineStyle: {
          width: 1.1,
          type: "dashed"
        },
        symbol: "circle",
        symbolSize: 10,
        itemStyle: {
          color: "#FD7F00",
          borderColor: "#FD7F00",
          opacity: 0
        },
        data: []
      }
    ]
  },
  bygroup_list: [],
  bysalesman_list: [],
  filterSM_list: [],
  sort_by_cg: "",
  filter_by_cg: "",
  salesmen_selected: "",
  plan_detail: {
    title: "",
    visit: 0,
    visit_percent: 0,
    total_paln: 0,
    unplan: 0
  },
  sortby_list: [
    {
      code: "",
      coded: "1",
      title: "Highest Target",
      text: "highest_target"
    },
    {
      code: "",
      coded: "2",
      title: "Lowest Target",
      text: "lowest_target"
    },
    {
      code: "",
      coded: "3",
      title: "Highest Remaining",
      text: "highest_remaining"
    },
    {
      code: "",
      coded: "4",
      title: "Lowest Remaining",
      text: "lowest_remaining"
    },
    {
      code: "",
      coded: "5",
      title: "Highest Achieve ( % )",
      text: "highest_achieve"
    },
    {
      code: "",
      coded: "6",
      title: "Lowest Achieve ( % )",
      text: "lowest_achieve"
    }
  ],
  bycg_list: [],
  filter_bycg: [],
  bycg_detail: [],
  spinner_sidenav: false,
  disabled_dpcg: false,
  keep_CGDP: "Lowest Achieve ( % )",
  keep_CGDP_POP: "Lowest Achieve ( % )",
  cg_selected: "",
  keepInfitySCroll: [],
  tempALlCG: [],
  tempProdSearch: ""
};
const mutations = {
  setTempProdSearch(state, value) {
    state.tempProdSearch = value;
  },
  SET_GRAPH_OPTINS(state, value) {
    state.graph_options = value;
  },
  SET_BYCG_DETAIL(state, value) {
    state.bycg_detail = value;
  },
  setGroupList(state, value) {
    let temp = [{ full_name: "All Salesman", checked: true, code: "all" }];
    value.forEach(function(row, key) {
      row.checked = false;
      row.code = row.emp_id;
      row.full_name = row.team_name;
      temp.push(row);
    });
    state.bygroup_list = temp;
  },
  setSalesmanList(state, value) {
    let temp = [];
    let emp_id =
      state.salesmen_selected.length > 0 ? "" : state.salesmen_selected.emp_id;
    value.forEach(function(row, key) {
      if (emp_id == row.emp_id) {
        row.checked = true;
      } else {
        row.checked = false;
      }
      row.code = row.emp_id;
      row.full_name = row.name;
      temp.push(row);
    });
    state.bysalesman_list = temp;
  },
  SET_FILTERSM_LIST(state, value) {
    let temp = [];
    value.forEach(function(row, key) {
      row.title = row.name;
      row.code = row.emp_id;
      temp.push(row);
    });
    state.filterSM_list = temp;
  },
  keepCGPOP(state, value) {
    state.keep_CGDP_POP = value;
  },
  keepCGP(state, value) {
    state.keep_CGDP = value;
  },
  SET_SM_SELECTED(state, value) {
    state.salesmen_selected = value;
  },
  SET_BYCG_LIST(state, value) {
    state.bycg_list = value;
  },
  SET_FILTERCG_LIST(state, value) {
    state.filter_bycg = value;
  }
};

const actions = {
  getVisitPlan: ({ commit, state, dispatch, getters }, values) => {
    state.spinner_loading = true;
    let code = "";
    if (state.salesmen_selected.length == 0) {
      code = getters.selected_code;
    } else {
      code = state.salesmen_selected.code;
    }
    let filter = [
      {
        name: "achieved",
        sort: "DESC",
        step: 1
      },
      {
        name: "progress",
        sort: "DESC",
        step: 2
      }
    ];
    // console.log(code)
    performanceService
      .getGraphBymonth(values, code)
      .then(response => {
        state.plan_detail.title = values.name;
        state.plan_detail.visit = response["cal"].visit;
        state.plan_detail.total_paln = response["cal"].total_paln;
        state.plan_detail.unplan = response["cal"].unplan;
        state.plan_detail.visit_percent = response["cal"].visit_percent;
        state.graph_options.xAxis.splitNumber =
          response["graph"].quota.length - 1;
        state.graph_options.series[0].data = response["graph"].achieved;
        state.graph_options.series[1].data = response["graph"].quota;
        commit("SET_GRAPH_OPTINS", state.graph_options);
        state.spinner_loading = false;
        dispatch("getByCG", [values, code, state.sort_by_cg, filter]);
        dispatch("getCGAll", code);
      })
      .catch(error => console.error("error => getGraphBymonth"));
  },
  getByCG: ({ commit, state }, values) => {
    if (state.spinner_loading == false) {
      state.keepInfitySCroll = values;
      state.spinner_loading = true;
      state.disabled_dpcg = true;
      values.start = 0;
      performanceService
        .getByCG(values)
        .then(response => {
          if (response.length > 0) {
            response[0].checked = true;
          }
          commit("SET_BYCG_LIST", response);
          state.disabled_dpcg = false;
          state.spinner_loading = false;
        })
        .catch(error => console.error("error => getByCG"));
    }
  },
  getCGAll: ({ commit, state }, values) => {
    let obj = {
      year: state.date_selected.year,
      month: state.date_selected.month_id
    };
    obj.sale_emp_id = values;
    performanceService
      .getCGAll(obj)
      .then(response => {
        state.tempALlCG = _.cloneDeep(response);
        commit("SET_FILTERCG_LIST", response);
      })
      .catch(error => console.error("error => getByCG"));
  },
  getByCGScroll: ({ commit, state, dispatch }) => {
    if (
      state.bycg_list.length < state.filter_bycg.length &&
      state.disabled_dpcg == false
    ) {
      // state.spinner_loading = true;
      state.disabled_dpcg = true;
      let values = _.cloneDeep(state.keepInfitySCroll);
      values.start = state.bycg_list.length;
      let list = _.cloneDeep(state.bycg_list);
      let tempList = list.filter(todo => todo.search != true);
      performanceService
        .getByCG(values)
        .then(response => {
          response.forEach(function(row, key) {
            if (state.tempProdSearch == row.code) {
              row.checked = true;
              state.tempProdSearch = "";
            }
            tempList.push(row);
          });
          commit("SET_BYCG_LIST", tempList);
          state.disabled_dpcg = false;
          // state.spinner_loading = false;
        })
        .catch(error => console.error("error => getByCGScroll"));
    }
  },
  getProdDetail: ({ commit, state, dispatch, getters }, values) => {
    state.spinner_sidenav = true;
    state.cg_selected = values;
    let code = "";
    if (state.salesmen_selected.length == 0) {
      code = getters.selected_code;
    } else {
      code = state.salesmen_selected.code;
    }
    commit("SET_BYCG_DETAIL", []);
    let obj = {
      year: state.date_selected.year,
      month: state.date_selected.month_id
    };
    performanceService
      .getProdDetail([obj, code, values.code, values.sort_by])
      .then(response => {
        commit("SET_BYCG_DETAIL", response);
        state.spinner_sidenav = false;
      })
      .catch(error => console.error("error => getProdDetail"));
  },
  selectCGDP: ({ commit, state, dispatch, getters }, values) => {
    state.sort_by_cg = values;
    state.keep_CGDP = values.title;
    state.keep_CGDP_POP = values.title;
    let code = "";
    if (state.salesmen_selected.length == 0) {
      code = getters.selected_code;
    } else {
      code = state.salesmen_selected.code;
    }
    let obj = {
      year: state.date_selected.year,
      month: state.date_selected.month_id
    };
    let filter = [
      {
        name: "achieved",
        sort: "DESC",
        step: 1
      },
      {
        name: "progress",
        sort: "DESC",
        step: 2
      }
    ];
    dispatch("getByCG", [obj, code, values.text, filter]);
    dispatch("getCGAll", code);
  },

  filterCGDP: ({ commit, state, dispatch, getters }, values) => {
    state.filter_by_cg = values;
    let code = "";
    if (state.salesmen_selected.length == 0) {
      code = getters.selected_code;
    } else {
      code = state.salesmen_selected.code;
    }
    let obj = {
      year: state.date_selected.year,
      month: state.date_selected.month_id
    };
    dispatch("getByCG", [obj, code, "sort_by", values]);
    dispatch("getCGAll", code);
  },
  filterSales: ({ commit, state }, params) => {
    let obj = [];
    if (params.length > 1) {
      state.bysalesman_list.forEach(function(row, key) {
        let str =
          row.code +
          row.first_name +
          row.status +
          row.department +
          row.last_name;
        if (str.toUpperCase().indexOf(params.toUpperCase()) !== -1) {
          obj.push(row);
          commit("SET_FILTERSM_LIST", []);
          commit("SET_FILTERSM_LIST", obj);
        }
      });
    } else if (params.length == 0) {
      commit("SET_FILTERSM_LIST", state.bysalesman_list);
    }
  },
  filterCG: ({ commit, state }, params) => {
    let obj = [];
    let data = _.cloneDeep(state.tempALlCG);
    if (params.length > 1) {
      data.forEach(function(row, key) {
        let str = row.code + row.item_name;
        if (str.toUpperCase().indexOf(params.toUpperCase()) !== -1) {
          obj.push(row);
          commit("SET_FILTERCG_LIST", obj);
        }
      });
    } else if (params.length == 0) {
      commit("SET_FILTERCG_LIST", data);
    }
  },
  selectedSalesman: ({ commit, state, dispatch }, values) => {
    let checkedTrue = state.bysalesman_list.find(todo => todo.checked === true);
    let indexTrue = state.bysalesman_list.indexOf(checkedTrue);
    if (indexTrue >= 0) {
      state.bysalesman_list[indexTrue].checked = false;
    }

    state.bysalesman_list[values[1]].checked = values[2];
    let checkedG = state.bygroup_list.filter(todo => todo.checked === true);
    checkedG.forEach(function(row, key) {
      let indexTrue = state.bygroup_list.indexOf(row);
      if (indexTrue >= 0) {
        state.bygroup_list[indexTrue].checked = false;
      }
    });

    commit("SET_SM_SELECTED", values[0]);
    let checked_sm = state.bysalesman_list.filter(
      todo => todo.checked === true
    );
    if (checked_sm.length > 0) {
      dispatch("getVisitPlan", {
        year: state.date_selected.year,
        month: state.date_selected.month_id,
        name: values[0].name
      });
    } else {
      state.plan_detail = {
        title: "-",
        visit: 0,
        visit_percent: 0,
        total_paln: 0,
        unplan: 0
      };
    }
  },
  selectSales: ({ commit, state, dispatch }, values) => {
    let checkedTrue = state.bygroup_list.filter(todo => todo.checked === true);
    checkedTrue.forEach(function(row, key) {
      let indexTrue = state.bygroup_list.indexOf(row);
      if (indexTrue >= 0) {
        state.bygroup_list[indexTrue].checked = false;
      }
    });
    commit("SET_SM_SELECTED", values);
    dispatch("getVisitPlan", {
      year: state.date_selected.year,
      month: state.date_selected.month_id,
      name: values.full_name
    });
    dispatch("hilightRowSalesman", values.code);
  },
  selectedTeam: ({ commit, state, dispatch }, values) => {
    state.bygroup_list[values[1]].checked = values[2];
    let checked_group = state.bygroup_list.filter(
      todo => todo.checked === true
    );
    if (values[0].full_name == "All Salesman") {
      checked_group.forEach(function(row, key) {
        if (row.full_name != "All Salesman") {
          let indexFull = state.bygroup_list.indexOf(row);
          if (indexFull >= 0) {
            state.bygroup_list[indexFull].checked = false;
          }
        }
      });
    } else {
      let full_name = state.bygroup_list.find(
        todo => todo.full_name === "All Salesman"
      );
      if (typeof full_name != "undefined") {
        if (full_name.checked) {
          let indexAll = state.bygroup_list.indexOf(full_name);
          if (indexAll >= 0) {
            state.bygroup_list[indexAll].checked = false;
          }
        }
      }
    }
    let checked_group2 = state.bygroup_list.filter(
      todo => todo.checked === true
    );
    let str = "";
    checked_group2.forEach(function(row, key) {
      str += row.full_name + ", ";
    });
    let checkedSales = state.bysalesman_list.filter(
      todo => todo.checked === true
    );
    checkedSales.forEach(function(row, key) {
      let indexTrue = state.bysalesman_list.indexOf(row);
      if (indexTrue >= 0) {
        state.bysalesman_list[indexTrue].checked = false;
      }
    });
    commit("SET_SM_SELECTED", []);
    if (checked_group2.length > 0) {
      dispatch("getVisitPlan", {
        year: state.date_selected.year,
        month: state.date_selected.month_id,
        name: str.substring(0, str.length - 2)
      });
    } else {
      state.plan_detail = {
        title: "-",
        visit: 0,
        visit_percent: 0,
        total_paln: 0,
        unplan: 0
      };
    }
    dispatch("getBySalesman", {
      year: state.date_selected.year,
      month: state.date_selected.month_id
    });
  },
  getSummary: ({ commit, state, getters }, values) => {
    let code = "";
    if (state.salesmen_selected.length == 0) {
      code = getters.selected_code;
    } else {
      code = state.salesmen_selected.code;
    }
    performanceService
      .getSummary(values, code)
      .then(response => {
        state.period_detail.max_pass_percent = response.max_pass_percent;
        state.period_detail.block1.value = response.sum_quota;
        state.period_detail.block2.value = response.sum_achieved;
        state.period_detail.progress.value = response.sum_progress;
        state.period_detail.button.value = response.sum_incentive;
        if (
          parseFloat(response.sum_quota) > parseFloat(response.sum_achieved)
        ) {
          state.graph_options.yAxis.max = response.sum_quota;
        } else {
          state.graph_options.yAxis.max = response.sum_achieved;
        }
      })
      .catch(error => console.error("error => getSummary"));
  },
  getByGrouup: ({ commit, state, dispatch }) => {
    state.spinner_loading = true;
    performanceService
      .getByGrouup()
      .then(response => {
        commit("setGroupList", response.data);
        dispatch("getBySalesman", {
          year: state.date_selected.year,
          month: state.date_selected.month_id
        });
      })
      .catch(error => console.error("error => getByGrouup"));
  },
  getBySalesman: ({ commit, state, getters }, values) => {
    let code = "";
    if (state.salesmen_selected.length == 0) {
      code = getters.selected_code;
    } else {
      code = state.salesmen_selected.code;
    }
    if (code == null) {
      code = Vue.localStorage.get("emp_id");
    }
    performanceService
      .getBySalesman(values, code)
      .then(response => {
        commit("setSalesmanList", response.data);
        commit("SET_FILTERSM_LIST", response.data);
        state.spinner_loading = false;
      })
      .catch(error => console.error("error => getBySalesman"));
  },
  getProdSearch: ({ state, dispatch, getters, commit }, values) => {
    let obj = {
      year: state.date_selected.year,
      month: state.date_selected.month_id
    };
    let code = "";
    if (state.salesmen_selected.length == 0) {
      code = getters.selected_code;
    } else {
      code = state.salesmen_selected.code;
    }
    state.tempProdSearch = values;
    obj.sale_emp_id = code;
    obj.code = values;
    state.spinner_loading = true;
    state.disabled_dpcg = true;
    let id = "bycg-box" + state.bycg_list[state.bycg_list.length - 1].code;
    let temp = document.getElementById(id);
    if (temp != null) {
      temp.scrollIntoView({
        behavior: "smooth"
      });
    }
    performanceService
      .getProdSearch(obj)
      .then(response => {
        if (response.length > 0) {
          let rs = response[0];
          rs.search = true;
          if (state.bycg_list.length > 0) {
            state.bycg_list.push(response[0]);
          }
          dispatch("hilightRowCG", values);
        }
        setTimeout(() => {
          state.disabled_dpcg = false;
          state.spinner_loading = false;
        }, 2000);
      })
      .catch(error => console.error("error => getProdSearch"));
  },
  hilightRowCG: ({ commit, state }, values) => {
    let temp = _.cloneDeep(state.bycg_list);
    let checkedTrue = temp.find(todo => todo.checked === true);
    let indexTrue = temp.indexOf(checkedTrue);
    if (indexTrue >= 0) {
      temp[indexTrue].checked = false;
    }
    let checkedItem = temp.find(todo => todo.code === values);
    let indexItem = temp.indexOf(checkedItem);
    if (indexItem >= 0) {
      temp[indexItem].checked = true;
    }
    commit("SET_BYCG_LIST", temp);
  },
  hilightRowSalesman: ({ commit, state }, values) => {
    let data = state.bysalesman_list;
    let checkedTrue = data.find(todo => todo.checked === true);
    let indexTrue = data.indexOf(checkedTrue);
    if (indexTrue >= 0) {
      data[indexTrue].checked = false;
    }

    let findIndex = data.find(todo => todo.code === values);
    let index = data.indexOf(findIndex);
    if (index >= 0) {
      data[index].checked = true;
    }
  }
};

const getters = {
  date_selected: state => {
    return state.date_selected;
  },
  selected_code: state => {
    let checked_all = state.bygroup_list.filter(todo => todo.code === "all");
    let code = Vue.localStorage.get("emp_id");
    if (checked_all.length > 0) {
      if (checked_all[0].checked == false) {
        let checked_group = state.bygroup_list.filter(
          todo => todo.checked === true
        );
        let str = "";
        checked_group.forEach(function(row, key) {
          str += row.code + ",";
        });
        code = str.substring(0, str.length - 1);
      }
    }
    return code;
  },
  spinner_loading: state => {
    return state.spinner_loading;
  },
  graph_options: state => {
    return state.graph_options;
  },
  bygroup_list: state => {
    return state.bygroup_list;
  },
  bysalesman_list: state => {
    return state.bysalesman_list;
  },
  filterSM_list: state => {
    return state.filterSM_list;
  },
  salesmen_selected: state => {
    return state.salesmen_selected;
  },
  plan_detail: state => {
    return state.plan_detail;
  },
  sortby_list: state => {
    return state.sortby_list;
  },
  bycg_list: state => {
    return state.bycg_list;
  },
  filter_bycg: state => {
    return state.filter_bycg;
  },
  bycg_detail: state => {
    return state.bycg_detail;
  },
  spinner_sidenav: state => {
    return state.spinner_sidenav;
  },
  cg_selected: state => {
    return state.cg_selected;
  },
  period_detail: state => {
    return state.period_detail;
  },
  disabled_dpcg: state => {
    return state.disabled_dpcg;
  },
  keep_CGDP: state => {
    return state.keep_CGDP;
  },
  keep_CGDP_POP: state => {
    return state.keep_CGDP_POP;
  },
  tempProdSearch: state => {
    return state.tempProdSearch;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
