import Vue from "vue";

const state = {
  // custm_customer_list: [],
};

const mutations = {
  // 'SET_CUSTM_CUSTOMER'(state, value) {
  //     state.custm_customer_list = value;
  // },
};

const actions = {
  getAllCustomer: ({ commit, state }, value) => {
    custManageService
      .getAllCustomer(value)
      .then(response => {
        commit("SET_CUSTM_CUSTOMER", response);
        if (state.temp_customer_list.length == 0 && value == "") {
          state.temp_customer_list = response;
        }
      })
      .catch(error => console.error("error => getAllCustomer"));
  }
};

const getters = {
  formatNumber: state => value => {
    if (isNaN(parseFloat(value))) {
      return value;
    } else {
      /*
      let step4 = _.round(value, 4);
      let step3 = _.round(step4, 3);
      let step2 = _.round(step3, 2);
      return parseFloat(step2).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      */
      return parseFloat(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  },
  formatNumberInt: state => value => {
    if (isNaN(parseFloat(value))) {
      return value;
    } else {
      /*
      let step0 = _.round(value, 0);
      return parseInt(step0).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      */
      return parseInt(value).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
  },
  checkPointInt: state => value => {
    if (isNaN(parseFloat(value))) {
      return 0;
    } else {
      let str = value.toString().split(".");
      if (str > 1) {
        let statVal = parseFloat(value)
          .toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
          .toString()
          .split(".");
        return statVal[0];
      } else {
        return parseInt(value).toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
      }
    }
  },
  checkPoint: state => value => {
    if (isNaN(parseFloat(value))) {
      return 0;
    } else {
      let str = value.toString().split(".");
      if (str.length == 1) {
        return parseInt(value).toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
      } else {
        let sunStr = str[1].length;
        if (sunStr == 2 && str[1] == "00") {
          return parseInt(value).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });
        } else if (
          sunStr == 2 &&
          str[1].substr(0, 1) != "0" &&
          str[1].substr(1, 1) == "0"
        ) {
          /*
          let step4 = _.round(value, 4);
          let step3 = _.round(step4, 3);
          let step2 = _.round(step3, 2);
          let step1 = _.round(step2, 1);
          return parseFloat(step1).toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
          });
          */
          return parseFloat(value).toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
          });
        } else if (
          sunStr == 2 &&
          str[1].substr(0, 1) != "0" &&
          str[1].substr(1, 1) != "0"
        ) {
          /*
          let step4 = _.round(value, 4);
          let step3 = _.round(step4, 3);
          let step2 = _.round(step3, 2);
          return parseFloat(step2).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          */
          return parseFloat(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        } else if (sunStr > 2) {
          /*
          let step4 = _.round(value, 4);
          let step3 = _.round(step4, 3);
          let step2 = _.round(step3, 2);
          return parseFloat(step2).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          */
          return parseFloat(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        } else {
          /*
          let step4 = _.round(value, 4);
          let step3 = _.round(step4, 3);
          let step2 = _.round(step3, 2);
          return parseFloat(step2).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          */
          return parseFloat(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        }
      }
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
