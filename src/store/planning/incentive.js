import Vue from "vue";
import moment from "moment";
import service from "../../services/planning/incentive";
import _ from "lodash";

const state = {
  dataList: [],
  masterStep1: {
    arrSymbols: [
      { code: '1', title: "มากกว่าเท่ากับ" },
      { code: '2', title: "มากกว่า" }
    ],
    arrUnits: [{ code: '1', title: "เปอร์เซ็นต์" }, { code: "2", title: "บาท" }],
    arrRange: [{ code: '1', title: "เท่ากับ" }, { code: "2", title: "น้อยกว่า" }],
  },
  step1tab1: {
    arrSalesCycle: [
    ],
    salesCycle: "",
    payDate: "",
    takeNote: '',
    pay_status: '',
    year: '',
    cycle: ''
  },
  step1tab2: {
    team: 1,
    arrTeam: [],
    arrTeamDetail: [],
    arrTeamDetailTemp: [],
  },
  step1tab3: {
    arrConds: [],
    conds: "",
    arrCondsDetail: [],
  },
  step1Setting: [],
  step2: {
    head: {
      sales_cycle: null,
      salesCycleList: [],
      pay_date: '-',
      teams: null,
      teamsList: []
    },
    detail: []
  },
  step3: {
    head: {
      sales_cycle: [],
      salesCycleList: [],
      pay_date: '-',
      teams: [],
      teamsList: [],
      commentlist: [],
      takeNote: ''
    },
    group: [],
    total: {
      total_paid: 0,
      total_paid_percent: 0,
      total_target: 0,
      total_target_percent: 0,
      total_actual: 0,
      total_actual_percent: 0,
      total_sales: 0,
      total_sales_percent: 0,
      total_year_last: 0,
      total_year_now: 0,
      total_year_now_percent: 0,
    },
    total_year: {
      year_now_name: "",
      year_last_name: "",
      sales_name: ""
    }
  },
  step4: {
    detail: [],
    total_payment: 0,
    total_actual: 0,
    total_target: 0,
    team: [],
    arrTeam: [],
  },
  loadingMain: false,
  showBar: false,
  defaultStep: [],
  dataBeforeChange: [],
  currentStep: false,
  flow: [],
  permission: 'creator',
  count_flow: 0,
  com_step3_submit: true,
  com_add_deduct: true,
  com_step4_approve: true,
  com_step4_reject: true,
  data_from_export: [],


  data_reward: [],
  total_reward: {
    reward: 0,
    type: 0,
    group: 0,
    sub: 0,
    cg: 0,
    product: 0
  },
  make_data: [
    {
      reward: 100,
      type: 1,
      group: 0,
      sub: 12,
      cg: 51,
      product: 100
    },
    {
      reward: 200,
      type: 2,
      group: 10,
      sub: 0,
      cg: 51,
      product: 100
    },
    {
      reward: 300,
      type: 3,
      group: 0,
      sub: 250,
      cg: 451,
      product: 1000
    },
    {
      reward: 400,
      type: 4,
      group: 10,
      sub: 0,
      cg: 51,
      product: 100
    },
    {
      reward: 500,
      type: 5,
      group: 20,
      sub: 55,
      cg: 0,
      product: 2800
    },
    {
      reward: 600,
      type: 6,
      group: 20,
      sub: 55,
      cg: 0,
      product: 2345
    },
    {
      reward: 700,
      type: 7,
      group: 20,
      sub: 55,
      cg: 0,
      product: 2800
    },
    {
      reward: 800,
      type: 8,
      group: 20,
      sub: 55,
      cg: 0,
      product: 2800
    },
    {
      reward: 900,
      type: 9,
      group: 20,
      sub: 55,
      cg: 0,
      product: 2800
    },
    {
      reward: 1000,
      type: 10,
      group: 20,
      sub: 55,
      cg: 0,
      product: 2800
    },
    {
      reward: 1100,
      type: 11,
      group: 20,
      sub: 55,
      cg: 0,
      product: 2800
    },
    {
      reward: 1200,
      type: 12,
      group: 20,
      sub: 55,
      cg: 0,
      product: 2800
    },
    {
      reward: 1300,
      type: 13,
      group: 20,
      sub: 55,
      cg: 0,
      product: 2800
    }
  ],

  tmpDataStep2: [],
  tmpDataDetailStep2: [],
  tmpDataCalStep2: []
};
const mutations = {
  keepStep1Setting(state, value) {
    state.step1Setting = value;
  },
  setDataStep2(state, value) {
    // console.log(value)
    state.step2 = value;
  },
  setTmpDataStep2(state, value) {
    state.tmpDataStep2 = value;
    // state.tmpDataStep2 = Object.assign({}, value);
  },
  setTmpDataDetailStep2(state, value) {
    state.tmpDataDetailStep2 = value;
  },
  setTmpDataCalStep2(state, value) {
    state.tmpDataCalStep2 = value;
  },
  setLoadingMain(state, value) {
    state.loadingMain = value;
  },
  setDataStep1tab2(state, value) {
    state.step1tab2 = value;
  },
  setDataBeforeChange(state, value) {
    state.dataBeforeChange = value;
  },
  setDataStep3(state, value) {
    state.step3 = value;
  },
  setShowBar(state, value) {
    state.showBar = value;
  },
  setDefaultStep(state, value) {
    state.defaultStep = value;
  },
  setCurrentStep(state, value) {
    state.currentStep = value;
  },
  setFlow(state, value) {
    state.flow = value;
  },
  setStep1tab1(state, value) {
    state.step1tab1 = value;
  },
  setCountFlow(state, value) {
    state.count_flow = value;
  },
  cal_reward(state, value) {
    // console.log(value)
    //     var rs1 = _.find(value, function (o) { return o.tactics_id == "4728"; });

    //     var rs2 = _.find(rs1.tempCg, function (o) { return o.key == "5"; });
    // console.log(value)
    let param = value
    const sum_reward = param.reduce((accumulator, object) => {
      return accumulator + object.reward;
    }, 0);
    const sum_type = param.reduce((accumulator, object) => {
      return accumulator + object.type;
    }, 0);
    const sum_group = param.reduce((accumulator, object) => {
      return accumulator + object.group;
    }, 0);
    const sum_sub = param.reduce((accumulator, object) => {
      return accumulator + object.sub;
    }, 0);
    const sum_cg = param.reduce((accumulator, object) => {
      return accumulator + object.cg;
    }, 0);
    const sum_product = param.reduce((accumulator, object) => {
      return accumulator + object.product;
    }, 0);

    state.total_reward = {
      reward: sum_reward,
      type: sum_type,
      group: sum_group,
      sub: sum_sub,
      cg: sum_cg,
      product: sum_product
    }
  },
};

const actions = {
  exportData: ({ state, commit }, value) => {
    window.location.href = value.url + '?login=' + Vue.localStorage.get("emp_id") +
      '&page=' + value.page +
      '&year=' + value.year +
      '&cycle=' + value.cycle +
      '&teams=' + value.teams;
  },
  getDefaultStep: ({ state, dispatch, commit }, value) => {
    state.step1tab1 = {
      arrSalesCycle: [],
      salesCycle: "",
      payDate: "",
      takeNote: '',
      pay_status: '',
      year: '',
      cycle: ''
    },
      commit('setDefaultStep', [])
    commit('setLoadingMain', true)
    service
      .getDefaultStep()
      .then(response => {
        if (response.flow.length > 0) {
          commit('setFlow', response.flow)
        }
        state.data_from_export = response.data[0]

        state.count_flow = response.count_flow

        state.permission = response.permission == 'creator' ? true : false

        var step3_submit = _.find(response.config, function (o) { return o.note_code == 'step3_submit'; });
        if (!_.isUndefined(step3_submit)) {
          state.com_step3_submit = step3_submit.specify_notes == '1' ? true : false
        }
        var add_deduct = _.find(response.config, function (o) { return o.note_code == 'add_deduct'; });
        if (!_.isUndefined(add_deduct)) {
          state.com_add_deduct = add_deduct.specify_notes == '1' ? true : false
        }
        var step4_approve = _.find(response.config, function (o) { return o.note_code == 'step4_approve'; });
        if (!_.isUndefined(step4_approve)) {
          state.com_step4_approve = step4_approve.specify_notes == '1' ? true : false
        }
        var step4_reject = _.find(response.config, function (o) { return o.note_code == 'step4_reject'; });
        if (!_.isUndefined(step4_reject)) {
          state.com_step4_reject = step4_reject.specify_notes == '1' ? true : false
        }

        if (response.permission == 'approver') {
          var clsStep = document.getElementsByClassName("md-step-header");
          clsStep[3].click();
          var html = document.documentElement;
          html.scrollTop = 0;
          commit('setLoadingMain', false)
        } else {
          if (response.data.length > 0) {
            commit('setDefaultStep', response.data[0])
            let data = response.data[0]
            state.currentStep = response.data[0].step
            if (response.data[0].step == 1) {
              dispatch("getStep1Tab1");
            } else if (response.data[0].step == 2) {
              let obj = {
                year: data.year,
                cycle: data.cycle,
                group_code: data.group_code,
                condition_detail: _.isUndefined(data.data_condition) ? [] : data.data_condition,
                start_date: data.start_date,
                end_date: data.end_date,
                data_recipient: data.data_recipient,
                ms_tactics_code: data.ms_tactics_code,
                action: 'open'
              };
              service
                .getHead(obj)
                .then(rs1 => {
                  var clsStep = document.getElementsByClassName("md-step-header");
                  clsStep[1].click();
                  var html = document.documentElement;
                  html.scrollTop = 0;
                  rs1.events = 'default'
                  dispatch("getStep2Master", rs1);
                })
                .catch();
            } else if (response.data[0].step == 3 || response.data[0].step == 4) {
              // console.log("getDefaultStep => ")
              let obj = {
                permission: 'creator',
                step: response.data[0].step,
                year: data.year,
                cycle: data.cycle,
                group_code: data.group_code_step3,
                start_date: data.start_date,
                end_date: data.end_date,
                emp_id: Vue.localStorage.get("emp_id"),

                sales_cycle: [
                  {
                    code: data.group_code_step3,
                    end_date: data.end_date,
                    fiscal_cycle: data.cycle,
                    fiscal_year: data.year,
                    start_date: data.start_date
                  }
                ]
              };
              if (response.data[0].step == 4) {
                obj.group_code = data.group_code_step4
                obj.sales_cycle = data.sale_cycle
              }

              service
                .nextToStep3(obj)
                .then(rs1 => {
                  var clsStep = document.getElementsByClassName("md-step-header");
                  var html = document.documentElement;
                  html.scrollTop = 0;
                  rs1.events = 'default'
                  rs1.step = response.data[0].step
                  dispatch("getStep3Master", rs1);
                  if (response.data[0].step == 3) {
                    clsStep[2].click();
                  } else {
                    clsStep[3].click();
                  }
                })
                .catch();
            }
          }
        }
      })
      .catch();
  },
  getStep1Tab1: ({ state, commit }) => {
    if (!_.isUndefined(state.defaultStep.step)) {
      service
        .step1tab1({ year: state.defaultStep.year, cycle: state.defaultStep.cycle })
        .then(response => {
          commit('setLoadingMain', false)
          if (response.length > 0) {
            var rs2 = _.find(response, function (o) { return o.checked == true; });
            // console.log(rs2);
            if (!_.isUndefined(rs2)) {
              state.step1tab1 = {
                arrSalesCycle: response,
                salesCycle: rs2.code,
                payDate: rs2.payDate,
                takeNote: rs2.takeNote,
                pay_status: rs2.pay_status,
                year: rs2.fiscal_year,
                cycle: rs2.fiscal_cycle
              }
            }
          } else {
            state.step1tab1 = {
              arrSalesCycle: [],
              salesCycle: "",
              payDate: "",
              takeNote: '',
              pay_status: '',
              year: '',
              cycle: ''
            }
          }
          commit('setLoadingMain', false)
        })
        .catch();
    } else {
      commit('setLoadingMain', false)
    }
  },
  selectSalesCycle: ({ state }, value) => {
    state.step1tab1.salesCycle = value.code
    state.step1tab1.payDate = value.payDate
    state.step1tab1.takeNote = value.takeNote
    state.step1tab1.pay_status = value.pay_status
  },
  filterStep1tab2: ({ state }, value) => {
    let data = _.cloneDeep(state.step1tab2.arrTeamDetailTemp);
    if (value.length > 1) {
      let temp = [];
      _.forEach(data, function (row) {
        let str = row.fullname + row.team + row.emp_id;
        if (str.toUpperCase().indexOf(value.toUpperCase()) !== -1) {
          temp.push(row);
        }
      });
      state.step1tab2.arrTeamDetail = temp;
    } else if (value.length == 0) {
      state.step1tab2.arrTeamDetail = data;
    }
  },
  getStep1Tab3: ({ state }, value) => {
    if (value == 'dropdown') {
      if (state.step1tab3.arrConds == 0) {
        service
          .step1tab3()
          .then(response => {
            state.step1tab3.arrConds = response
            if (response.length > 0) {
              state.step1tab3.conds = [response[0].code];
            } else {
              state.step1tab3.conds = ''
            }
          })
          .catch();
      } else {
        state.step1tab3.conds = [state.step1tab3.arrConds[0].code];
      }
    } else {
      let data = _.cloneDeep(state.step1tab1)
      var rs = _.find(data.arrSalesCycle, function (o) { return o.code == data.salesCycle; });
      if (!_.isUndefined(rs)) {
        let obj = {
          code: _.toString(state.step1tab3.conds)
          , year: rs.fiscal_year
          , cycle: rs.fiscal_cycle
          , group_code: state.step1tab2.team
        }
        service
          .step1tab3Detail(obj)
          .then(response => {
            let filt = _.filter(response, item => {
              if (_.isNumber(item.checked)) {
                return true;
              }
            });
            _.forEach(filt, function (row) {
              let rsFiltDis = _.findIndex(response, function (o) {
                return o.type == row.type && o.set != row.set;
              });
              if (rsFiltDis >= 0) {
                response[rsFiltDis].disable = true
              }
            });

            state.step1Setting = filt
            state.step1tab3.arrCondsDetail = response
          })
          .catch();
      }
    }
  },
  getStep2Master: ({ state, commit }, value) => {
    // console.log("-getStep2Master-");
    commit("setLoadingMain", true);
    let data = _.cloneDeep(state.step2)
    let dataclear = _.cloneDeep(state.step2)
    dataclear.detail = [];
    commit("setDataStep2", dataclear);
    if (value.sale_cycle.length > 0) {
      var rs = _.find(value.sale_cycle, function (o) { return o.checked == true; });
      let rec = value.recipient_group
      if (_.isUndefined(rs)) {
        data.head.sales_cycle = value.sale_cycle[0].code
        data.head.pay_date = value.sale_cycle[0].payDate
      } else {
        data.head.sales_cycle = rs.code
        data.head.pay_date = rs.payDate
      }
      data.head.salesCycleList = value.sale_cycle
      data.head.teamsList = rec
      if (value.events == 'next') {
        data.head.teams = _.isUndefined(state.step1tab2.team) ? rec[0].code : state.step1tab2.team
        let head = data.head;
        var rs = _.find(head.salesCycleList, function (o) {
          return o.code == head.sales_cycle;
        });
        data.detail = [];
        if (!_.isUndefined(rs)) {
          commit("setDataStep2", data);
          commit("setLoadingMain", false);
        } else {
          commit("setDataStep2", data);
          commit("setLoadingMain", false);
        }
      } else {
        data.head.teams = _.isUndefined(state.defaultStep.group_code) ? rec[0].code : state.defaultStep.group_code
        commit("setDataStep2", data);
        commit("setLoadingMain", false);
      }
    } else {
      data.head.pay_date = '-'
      commit("setDataStep2", data);
      commit("setLoadingMain", false);
    }

    localStorage.setItem("tmpDataStep2_head", JSON.stringify(data.head));
    // localStorage.removeItem('tmpDataStep2');
    // commit("setTmpDataStep2", data);
    // console.log("state.tmpDataStep2 ==>", state.tmpDataStep2);
  },
  getStep3Master: ({ state, commit, dispatch }, value) => {
    commit("setLoadingMain", true);
    let data = _.cloneDeep(state.step3)
    let dataclear = _.cloneDeep(state.step3)
    dataclear.detail = [];
    commit("setDataStep3", dataclear);
    data.head.pay_date = ''
    data.head.sales_cycle = []
    if (value.sale_cycle.length > 0) {
      let rec = value.recipient_group
      let sale_cycle_code = '';
      if (value.step == '4') {
        _.forEach(value.sale_cycle, function (row) {
          if (!data.head.sales_cycle.includes(row.code)) {
            data.head.sales_cycle.push(row.code);
            if (data.head.pay_date = '') {
              data.head.pay_date = row.payDate
            } else {
              data.head.pay_date = data.head.pay_date + ',' + row.payDate
            }
          }
        });
      } else {
        var rs = _.find(value.sale_cycle, function (o) { return o.checked == true; });
        if (_.isUndefined(rs)) {
          sale_cycle_code = value.sale_cycle[0].code
          data.head.sales_cycle = [value.sale_cycle[0].code]
          data.head.pay_date = value.sale_cycle[0].payDate
        } else {
          sale_cycle_code = rs.code
          data.head.sales_cycle = [rs.code]
          data.head.pay_date = rs.payDate
        }
      }
      data.head.salesCycleList = value.sale_cycle
      data.head.teamsList = rec
      data.head.commentlist = value.comments
      if (value.events == 'next') {
        if (_.isUndefined(state.step1tab2.team)) {
          data.head.teams = rec[0].code.split(",");
        } else {
          data.head.teams = state.defaultStep.group_code.split(",");
        }
        let head = data.head;
        var rs = _.find(head.salesCycleList, function (o) {
          return o.code == sale_cycle_code;
        });
        if (!_.isUndefined(rs)) {
          let obj = {
            data: data,
            emp_id: Vue.localStorage.get("emp_id"),
            sales_cycle: [
              {
                code: head.teams,
                end_date: rs.end_date,
                fiscal_cycle: rs.fiscal_cycle,
                fiscal_year: rs.fiscal_year,
                start_date: rs.start_date
              }
            ]
          };
          dispatch("getStep3DetailLoad", obj)
        } else {
          commit("setDataStep3", data);
          commit("setLoadingMain", false);
        }
      } else {
        let obj = {
          emp_id: Vue.localStorage.get("emp_id")
        }
        if (value.step == 4) {
          if (_.isUndefined(state.defaultStep.group_code_step4)) {
            data.head.teams = rec[0].code.split(",");
          } else {
            if (!_.isNull(state.defaultStep.group_code_step4)) {
              data.head.teams = state.defaultStep.group_code_step4.split(",");
            }
          }
          obj.sales_cycle = rec
        } else {
          if (_.isUndefined(state.defaultStep.group_code_step3)) {
            data.head.teams = rec[0].code.split(",");
          } else {
            if (!_.isNull(state.defaultStep.group_code_step3)) {
              data.head.teams = state.defaultStep.group_code_step3.split(",");
            }
            obj.sales_cycle = [{
              code: state.defaultStep.group_code_step3,
              end_date: state.defaultStep.end_date,
              fiscal_cycle: state.defaultStep.cycle,
              fiscal_year: state.defaultStep.year,
              start_date: state.defaultStep.start_date
            }]
          }
        }
        obj.data = data

        dispatch("getStep3DetailLoad", obj)
      }
    } else {
      data.head.pay_date = '-'
      commit("setDataStep3", data);
      commit("setLoadingMain", false);
    }
  },

  getStep3DetailLoad: ({ state, commit }, value) => {
    // console.log("getStep3DetailLoad",value);
    service
      .getStep3Detail(value)
      .then(response => {
        value.data.total = response.total;
        if (response.group.length > 0) {
          commit("setShowBar", true);
        } else {
          commit("setShowBar", false);
        }
        value.data.group = response.group;
        value.data.total_year = response.total_year;
        commit("setDataStep3", value.data);
        commit("setLoadingMain", false);
      })
      .catch();
  },
};

const getters = {
  masterStep1: state => {
    return state.masterStep1;
  },
  step1tab1: state => {
    return state.step1tab1;
  },
  step1tab2: state => {
    return state.step1tab2;
  },
  step1tab3: state => {
    return state.step1tab3;
  },
  step1Setting: state => {
    return state.step1Setting;
  },
  step2: state => {
    return state.step2;
  },
  tmpDataStep2: state => {
    return state.tmpDataStep2;
    // return JSON.parse(JSON.stringify(state.tmpDataStep2));
  },
  tmpDataCalStep2: state => {
    return state.tmpDataCalStep2;
  },
  step3: state => {
    return state.step3;
  },
  step4: state => {
    return state.step4;
  },
  loadingMain: state => {
    return state.loadingMain;
  },
  defaultStep: state => {
    return state.defaultStep;
  },
  dataBeforeChange: state => {
    return state.dataBeforeChange;
  },
  showBar: state => {
    return state.showBar;
  },
  currentStep: state => {
    return state.currentStep;
  },
  flow: state => {
    return state.flow;
  },
  permission: state => {
    return state.permission;
  },
  countFlow: state => {
    return state.count_flow;
  },
  comStep3Submit: state => {
    return state.com_step3_submit;
  },
  comAddDeduct: state => {
    return state.com_add_deduct;
  },
  comStep4Approve: state => {
    return state.com_step4_approve;
  },
  comStep4Reject: state => {
    return state.com_step4_reject;
  },
  data_from_export: state => {
    return state.data_from_export
  },
  data_reward: state => {
    return state.data_reward
  },
  total_reward: state => {
    return state.total_reward
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
