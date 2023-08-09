import Vue from "vue";
import moment from "moment";
import budgetService from "../../services/orders/budget";
import formService from "../../services/core/formmanage";
import dateFunc from "../../components/Salesops/fullCalendar/dateFunc";
import _ from "lodash";

const state = {
  dis_selected_date: {
    year: dateFunc.format(new Date(), "yyyy"),
    month_id: dateFunc.format(new Date(), "MM"),
    month: dateFunc.format(new Date(), "MMMM"),
  },
  pur_selected_date: {
    year: dateFunc.format(new Date(), "yyyy"),
    month: dateFunc.format(new Date(), "MM"),
    month_name: dateFunc.format(new Date(), "MMMM"),
    range: "-"
  },
  dataDiscount: [],
  dataDiscountTemp: [],
  dataPurchase: [],
  dataPurchaseTemp: [],
  selectLevelSales: [],
  dataCorporate: [],
  spinner: false,
  levelSalesTitle: "",
  levelSalesCode: "",
  corporateCode: "",
  detail: {
    flow: [],
    items: [],
    promotion: [],
    comment: [],
    head: {
      customer_name_th: "",
      customer_address: "",
      po_no: "",
      po_date: "",
      ship_to: "",
      salesman_code: "",
      delivery_date: "",
      creator: "",
      priority: "",
      warehouse: "",
      take_note: "",
      percent_discount: "",
      term: "",
      credit_rating: "",
      pricetype_code: ""
    },
    totalDiscount: 0,
    totalAmount: 0,
    totalOrderQty: 0,
    totalNetAmount: 0
  },
  paybycash_list: {
    cust_addr1: "",
    cust_addr2: "",
    cust_addr3: "",
    sent_to_cus_name: "",
    receive_name: "",
    tax_id: ""
  },
  spinnerDG: false,
  creditterm: [],
  comment: [],
  disableFrom: [],
  totalItems: [],
  commentList: [],
  list_emp_ids: [],
  chn_code :'',
  loadDataMT: false,
  checkLoadDataMT: false
};
const mutations = {
  setDiscountList(state, value) {
    state.dataDiscount = value;
  },
  setPurchaseList(state, value) {
    state.dataPurchase = value;
  },
  setCorporateCode(state, value) {
    state.corporateCode = value;
  },
  setLevelSalesCode(state, value) {
    state.levelSalesCode = value;
  },
  setLevelSalesTitle(state, value) {
    state.levelSalesTitle = value;
  },
  setDetail(state, value) {
    state.detail = value;
  },
  SET_PAYBYCASH(state, value) {
    state.paybycash_list = value;
  },
  setLoadDataMT(state, value) {
    state.loadDataMT = value;
  },
  setCheckLoadDataMT(state, value) {
    state.checkLoadDataMT = value === 'purchasemt' ? true : false;
  },
  // setSelectedDate(state, value) {
  //   state.dis_selected_date = value;
  // },
};

const actions = {
  getDiscountList: ({ state, dispatch } , value ) => {

    
    if(value){
      state.chn_code = value.channel_code
    }
    console.log(state.chn_code)
    state.spinner = true;
    let param = {
      month: state.dis_selected_date.month_id,
      year: state.dis_selected_date.year,
      channel :  state.chn_code
      
    };

    budgetService
      .getDiscountList(param)
      .then(response => {
        state.list_emp_ids = [];
        response.data.forEach(function (value, key) {
          state.list_emp_ids.push(value.role_code);
        });
        state.dataDiscount = response.data;
        state.dataDiscountTemp = response.data;
        state.spinner = false;
        dispatch("getLevelSales");
      })
      .catch();

  },
    getCorporateList: ({ state, dispatch }, value) => {
        budgetService.getCorporateCode()
                .then((response) => {
                    let tmp_corp = [];
                    if(response){
                        tmp_corp = response.data;
                    }
                    tmp_corp.unshift({id:'',name:'All Corporate'});
                    state.dataCorporate = tmp_corp;
                })
                .catch();
    },
  getLevelSales: ({ commit, state }) => {
    let param = {
      emp_ids: state.list_emp_ids
    };
    budgetService
      .getLevelSales(param)
      .then(response => {
        state.selectLevelSales = response.data;
        if (response.data[0]) {
          state.levelSalesCode = response.data[0].code;
          // state.levelSalesTitle = response.data[0].code+ " "+response.data[0].title;
          state.levelSalesTitle = response.data[0].title + " " + response.data[0].code;
        }
      })
      .catch();
  },
  getPurchaseList: ({ commit, state }) => {
    state.spinner = true;
    let param = {
      range: state.pur_selected_date.range,
      month: state.pur_selected_date.month,
      year: state.pur_selected_date.year,
      corp_code: state.corporateCode,
      emp_id: state.levelSalesCode
    };
    budgetService
      .getPurchaseList(param)
      .then(response => {
        state.dataPurchase = response.data;
        state.dataPurchaseTemp = response.data;
        state.spinner = false;
      })
      .catch();
  },
  selectLevelSales: ({ state, dispatch }, value) => {
    state.spinner = true;
    var rs = _.find(state.selectLevelSales, function (o) {
      return o.code == value.code;
    });
    if (!_.isUndefined(rs)) {
      state.levelSalesCode = value.code;
      // state.levelSalesTitle = value.code+ " "+value.title;
      state.levelSalesTitle = value.title + " " + value.code;
      if(state.loadDataMT === false && state.checkLoadDataMT === false) {
        dispatch("getPurchaseList");
      }

      if(state.checkLoadDataMT === true) {
        state.loadDataMT = true;
      }
      state.spinner = false;
    }
    // state.levelSalesCode = value.code;
    // state.levelSalesTitle = value.title;
    // dispatch("getPurchaseList");
    // state.spinner = false;

  },
  selectCorporate: ({ state, dispatch }, value) => {
    state.spinner = true;
    var rs = _.find(state.dataCorporate, function (o) {
      return o.id == value.id;
    });
    if (!_.isUndefined(rs)) {
      state.corporateCode = value.id;
      // state.levelSalesTitle = value.code+ " "+value.title;
      if(state.loadDataMT === false && state.checkLoadDataMT === false) {
        dispatch("getPurchaseList");
      }

      if(state.checkLoadDataMT === true) {
        state.loadDataMT = true;
      }
      state.spinner = false;
    }
  },

  filterDis: ({ commit, state }, param) => {
    let data = _.cloneDeep(state.dataDiscountTemp);
    let tempAll = data
    let kryW = _.trim(param)
    if (kryW.length > 2) {
      let temp = [];
      let tempLoad = [];
      _.forEach(tempAll, function (row, key) {
        let str =
          row.name +
          row.role_code +
          row.department;
        if (str.toUpperCase().indexOf(kryW.toUpperCase()) !== -1) {
          temp.push(row);
          if (tempLoad.length < 40) {
            tempLoad.push(row);
          }
        }
      });
      if (tempLoad.length <= 40) {
        commit("setDiscountList", tempLoad);
      } else {
        commit("setDiscountList", temp);
      }

    } else if (param.length == 0) {
      commit("setDiscountList", tempAll);
    }
  },
  filterPur: ({ commit, state }, param) => {
    let data = _.cloneDeep(state.dataPurchaseTemp);
    let tempAll = data
    let kryW = _.trim(param)
    if (kryW.length > 2) {
      let temp = [];
      let tempLoad = [];
      _.forEach(tempAll, function (row, key) {
        let str =
          row.po_no +
          row.cust_code +
          row.sm_code;
        if (str.toUpperCase().indexOf(kryW.toUpperCase()) !== -1) {
          temp.push(row);
          if (tempLoad.length < 40) {
            tempLoad.push(row);
          }
        }
      });
      if (tempLoad.length <= 40) {
        commit("setPurchaseList", tempLoad);
      } else {
        commit("setPurchaseList", temp);
      }

    } else if (param.length == 0) {
      commit("setPurchaseList", tempAll);
    }
  },
  getOrderById: ({ commit, state, dispatch }, values) => {
    dispatch("clearDG");
    state.spinnerDG = true;
    budgetService
      .getOrderById(values)
      .then(response => {
        dispatch("getFormList");
        if (response.order_head.length == 1) {
          let data = response.order_head[0];
          let term = state.creditterm.filter(
            todo => todo.code == data.credit_term_code
          );
          state.paybycash_list = {
            cust_addr1: data.cust_addr1,
            cust_addr2: data.cust_addr2,
            cust_addr3: data.cust_addr3,
            sent_to_cus_name: data.sent_to_cus_name,
            receive_name: data.receive_name,
            tax_id: data.tax_id
          };
          // console.log("data >> " , data)
          data.term = term.length > 0 ? term[0].title : data.credit_term_code;
          data.pay_by_cash = parseInt(data.pay_by_cash) == 0 ? false : true
          budgetService
            .getShipTo(data.cust_code)
            .then(response => {
              let shipto = response.filter(
                todo => todo.customer_code == data.ship_to
              );
              data.ship_to =
                shipto.length > 0 ? shipto[0].customer_addr : data.ship_to;
            })
            .catch();

          let rs = {
            items: [],
            promotion: [],
            head: data,
            flow: []
          };
          if (response.items != "false") {
            _.forEach(response.items, function (row) {
              // round ทศนิยม
              let price4 = _.round(row.price, 4);
              let price3 = _.round(price4, 3);
              let price2 = _.round(price3, 2);
              row.price = price2
            });
            rs.items = response.items;
          }
          if (response.promotion != "false") {
            let temp = [];
            _.forEach(response.promotion, function (row) {
              let netA = row.products.reduce(
                (acc, row) => acc + parseFloat(row.net_amount),
                0
              );
              let order_qty = row.products.reduce(
                (acc, row) => acc + parseFloat(row.order_qty),
                0
              );
              let amount = row.products.reduce(
                (acc, row) => acc + parseFloat(row.amount),
                0
              );
              row.net_amount = netA;
              row.amount = amount;
              row.order_qty = order_qty;
              if (response.freegiffs != "false") {
                let fg = response["freegiffs"].filter(
                  todo => todo.promo_code == row.promo_code
                );
                row.freeitems = fg;
              } else {
                row.freeitems = [];
              }
              temp.push(row);
            });

            rs.promotion = temp;
          }

          let item = _.cloneDeep(rs.items);
          let pro = _.cloneDeep(rs.promotion);
          let netA = 0;
          let orQty = 0;
          let amount = 0;
          let netA1 = 0;
          let orQty1 = 0;
          let amount1 = 0;
          let ibudget = 0;
          if (item.length > 0) {
            netA = item.reduce(
              (acc, row) => acc + parseFloat(row.net_amount),
              0
            );
            orQty = item.reduce((acc, row) => acc + parseInt(row.order_qty), 0);
            amount = item.reduce((acc, row) => acc + parseFloat(row.amount), 0);
            ibudget = item.reduce((acc, row) => acc + parseFloat(row.budget), 0);
          }
          if (pro.length > 0) {
            netA1 = pro.reduce(
              (acc, row) => acc + parseFloat(row.net_amount),
              0
            );
            orQty1 = pro.reduce((acc, row) => acc + parseInt(row.order_qty), 0);
            amount1 = pro.reduce((acc, row) => acc + parseFloat(row.amount), 0);
          }

          let netA2 = 0;
          let orQty2 = 0;
          let amount2 = 0;
          let keepUniq = [];
          let keepUniqFg = [];
          _.forEach(pro, function (row) {
            let rs_netA2 = row["freeitems"].reduce(
              (acc, row) => acc + parseFloat(row.net_amount),
              0
            );
            netA2 = netA2 + rs_netA2;

            keepUniq = _.union(keepUniq, row["products"]);
            let rs_orQty2 = row["freeitems"].reduce(
              (acc, row) => acc + parseFloat(row.order_qty),
              0
            );

            orQty2 = orQty2 + rs_orQty2;

            let rs_amount2 = row["freeitems"].reduce(
              (acc, row) => acc + parseFloat(row.amount),
              0
            );
            amount2 = amount2 + rs_amount2;
            keepUniqFg = _.union(keepUniqFg, row["freeitems"]);
          });
          let keepUniqAll = _.union(keepUniq, keepUniqFg);
          let totalUniq = _.union(_.union(keepUniqAll, item), "item_code");

          state.totalItems = totalUniq.length
          let rsAmount = amount + amount1 + amount2;
          let rsNetA = netA + netA1 + netA2;
          rs.totalDiscount = rsAmount - rsNetA;
          rs.totalOrderQty = orQty + orQty1 + orQty2;
          rs.totalAmount = amount + amount1 + amount2;
          rs.totalNetAmount = netA + netA1 + netA2;

          budgetService
            .getFlow({ doc_no: data.doc_no })
            .then(row => {
              state.spinnerDG = false;
              rs.flow = row;
              commit("setDetail", rs);
            })
            .catch();
          state.comment = [];
          budgetService
            .getComment({
              head_id: data.h_id,
              doc_no: data.doc_no,
              emp_id: Vue.localStorage.get("emp_id")
            })
            .then(response => {
              state.commentList = response
              commit("setDetail", rs);
            })
            .catch();
        }
      })
      .catch();
  },
  readComment: ({ state }, value) => {
    let tempData = value.filter(todo => todo.status === "N");
    if (tempData.length > 0) {
      budgetService
        .readComment(tempData)
        .then(response => {
          tempData.forEach(function (row, key) {
            let temp = state.comment.filter(todo => todo.id === row.id);
            temp.forEach(function (rowTemp, key) {
              let rsIndex = state.comment.indexOf(rowTemp);
              if (rsIndex >= 0) {
                state.comment[rsIndex].status = "Y";
              }
            });
          });
        })
        .catch();
    }
  },
  replyComment: ({ state }, value) => {
    budgetService
      .saveComment(value)
      .then(response => {
        state.comment.push(response);
      })
      .catch();
  },
  getFormList: ({ state }) => {
    formService
      .getFormList()
      .then(response => {
        let rs = [];
        let key = 'create_order';
        let data = response.filter(todo => todo.page_name === key);
        const str = Vue.localStorage.get("department");
        if (_.trim(str).length > 0) {
          _.forEach(data, function (row, idx) {
            let arr = row["role"].split(",");
            var check = _.filter(arr, item => {
              if (str.toUpperCase() == item.toUpperCase()) {
                return true;
              }
            });
            rs[row.field_name] = {
              status: check.length > 0 ? false : true,
              title: row.field_desc,
              desc: row.page_desc
            };
          });
        }
        state.disableFrom = rs;
      })
      .catch();
  },
  getComment: ({ state }, values) => {
    state.comment = [];
    budgetService
      .getComment({
        head_id: values.h_id,
        doc_no: values.doc_no,
        emp_id: Vue.localStorage.get("emp_id")
      })
      .then(response => {
        state.comment = response;
      })
      .catch();
  },
  clearDG: ({ commit }) => {
    let rs = {
      flow: [],
      items: [],
      promotion: [],
      comment: [],
      head: {
        customer_name_th: "",
        customer_address: "",
        po_no: "",
        po_date: "",
        ship_to: "",
        salesman_code: "",
        delivery_date: "",
        creator: "",
        priority: "",
        warehouse: "",
        take_note: "",
        percent_discount: "",
        balance: "",
        term: "",
        credit_rating: "",
        pricetype_code: ""
      },

      totalDiscount: 0,
      totalAmount: 0,
      totalOrderQty: 0,
      totalNetAmount: 0
    };
    state.paybycash_list = {
      cust_addr1: "",
      cust_addr2: "",
      cust_addr3: "",
      sent_to_cus_name: "",
      receive_name: "",
      tax_id: ""
    };
    commit("setDetail", rs);
  },

  // disSelectedDate: ({ state, dispatch }, value) => {
  //   state.dis_selected_date = value;
  // },
};

const getters = {
  dis_selected_date: state => {
    return state.dis_selected_date;
  },
  pur_selected_date: state => {
    return state.pur_selected_date;
  },
  dataDiscount: state => {
    return state.dataDiscount;
  },
  spinner: state => {
    return state.spinner;
  },
  dropdown: state => {
    return state.selectLevelSales;
  },
  dataCorporate: state => {
    return state.dataCorporate;
  },
  levelSalesTitle: state => {
    return state.levelSalesTitle;
  },
  levelSalesCode: state => {
    return state.levelSalesCode;
  },
  dataPurchase: state => {
    return state.dataPurchase;
  },
  detail: state => {
    return state.detail;
  },
  spinnerDG: state => {
    return state.spinnerDG;
  },
  comment: state => {
    return state.comment;
  },
  disableFrom: state => {
    return state.disableFrom;
  },
  totalItems: state => {
    return state.totalItems;
  },
  paybycash_list: state => {
    return state.paybycash_list;
  },
  commentList: state => {
    return state.commentList;
  },
  loadDataMT: state => {
    return state.loadDataMT;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
