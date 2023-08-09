import Vue from "vue";
import moment from "moment";
import summaryOrderService from "../../services/orders/summaryorders";
import formService from "../../services/core/formmanage";
import _ from "lodash";

const state = {
  getDetailPO: [],
  getDetailPop: [],
  keyword_code: '',
  selected_date: {
    month: "",
    year: "",
    range: "-"
  },
  summary: {
    waiting: 0,
    ordered: 0,
    invoiced: 0,
    reject: 0,
    back_order: 0
  },
  dataList: [],
  dataListTemp: [],
  creditterm: [],
  comment: [],
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
  spinner: false,
  spinnerDG: false,
  selected_dp: "all",
  dropdown: [
    {
      code: "",
      id: "all",
      title: "All Status"
    }
  ],
  totalItems: [],
  commentList: [],
  disableFrom: [],
  tempAllByCondition: [],
  detailBar: [
    {
      title1: "ยอด Order ที่มีการ Key ไม่รวม Line Back Order:",
      value1: "0",
      in_v1: "",
      // title1: "",
      // value1: "",
      title2: "ยอด Invoice ที่เกิดจากการ Key ไม่รวม Back Order:",
      value2: "0",
      in_v2: ""
    },
    {
      title1: "ยอด Order ที่เป็น Line Back Order อย่างเดียว:",
      value1: "0",
      in_v1: "",
      // title1: "",
      // value1: "",
      title2: "ยอด Invoice Line Back Order อย่างเดียว :",
      value2: "0",
      in_v2: ""
    },
    {
      title1: "ยอดเป็น Back Order ที่เกิดจาการ Key Order:",
      value1: "0",
      in_v1: "",


      title2: "ยอดที่ยังไม่เป็น Invoice (On Process):",
      value2: "0",
      in_v2: ""
    }
  ],
  filter_search: {
    po_no: "",
    order_no: "",
    inv_no: "",
    sm_code: "",
    cust_code: "",
    filter_date: "po_date",
    source: ''
  },
  headTotal: [],
  headFilter: false,
  keepSearchHistory: '',

  dataSummary: '',
  summaryDetail: '',
  summaryDate: '',
  summaryPo: '',
  summaryPoDate: '',
};
const mutations = {
  setDataList(state, value) {
    state.dataList = value;
  },
  setDetail(state, value) {
    state.detail = value;
  },
  setKeepSearchHistory(state, value) {
    state.keepSearchHistory = value
  },
};

const actions = {

  searchCustomer: ({ state, commit, dispatch }, value) => {
      state.keyword_code = value
      // dispatch('getList', value);
      console.log('keyword >>>>', state.keyword_code)
    
  },

  summaryPo: ({ state, commit, dispatch }, value) => {
    state.spinner = true
    summaryOrderService
      .summaryPo(value)
      // .summaryPoDate(date)
      .then(response => {
        state.summaryPo = response.data
        state.spinner = false
        // state.summaryPoDate = response.date
        console.log('>>>>>>>>>>>>>>', response)
      })
      .catch();

  },
  summaryDetail: ({ state, commit, dispatch }, value) => {
    state.spinner = true
    summaryOrderService
      .summaryDetail(value)
      .then(response => {
        state.summaryDetail = response.data
        state.spinner = false
        console.log('>>>>>>>>>>', response)
      })
      .catch();

  },
  searchSummaryCust: ({ state, commit, dispatch }, value) => {
    state.spinner = true
    summaryOrderService
      .getSummaryCust(value, state)
      .then(response => {
        state.summaryDetail = response.data
        state.spinner = false
        // console.log('>>>>>>>>>>', state.getDetailPop)
      })
      .catch();

  },

  searchSummaryPO: ({ state, commit, dispatch }, value) => {
    state.spinner = true
    summaryOrderService
      .getSummaryPO(value, state)
      .then(response => {
        state.summaryPo = response.data
        state.spinner = false
        // console.log('>>>>>>>>>>', state.getDetailPO)
      })
      .catch();

  },
  getSummaryCust: ({ state, commit, dispatch }, value) => {
    state.spinner = true
    state.getDetailPop = value
    summaryOrderService
      .getSummaryCust(value, state)
      .then(response => {
        state.summaryDetail = response.data
        state.spinner = false
        // console.log('>>>>>>>>>>', state.getDetailPop)
      })
      .catch();

  },
  getSummaryPO: ({ state, commit, dispatch }, value) => {
    state.spinner = true
    state.getDetailPO = value
    summaryOrderService
      .getSummaryPO(value, state)
      .then(response => {
        state.summaryPo = response.data
        state.spinner = false
        // console.log('>>>>>>>>>>', state.getDetailPO)
      })
      .catch();

  },

  summaryOrder: ({ state, commit, dispatch }, value) => {
    state.spinner = true
    summaryOrderService
      .summaryOrder(value)
      .then(response => {
        state.dataSummary = response
        state.spinner = false
        console.log(response)
      })
      .catch();

  },

  getOrderHistoryTotal: ({ state }, value) => {
    summaryOrderService
      .getOrderHistoryTotal(value)
      .then(response => {
        console.log(response.data)

        // state.creditterm = response;
        state.headTotal = response.data
        state.detailBar[0].value1 = response.data.total1
        state.detailBar[0].value2 = response.data.total2
        state.detailBar[1].value1 = response.data.total3
        state.detailBar[1].value2 = response.data.total4
        state.detailBar[2].value1 = response.data.total5
        state.detailBar[2].value2 = response.data.total6
        state.detailBar[2].in_v2 = response.data.total7
        state.headFilter = false
      })
      .catch();
  },

  getList: ({ commit, state, dispatch }) => {
    state.spinner = true;
    state.headFilter = true
    let param = {
      range: state.selected_date.range,
      month: state.selected_date.month,
      year: state.selected_date.year,
      textSearch: 'all',
      filter: state.filter_search
    };
    state.detailBar[0].value1 = '0'
    state.detailBar[0].value2 = '0'
    state.detailBar[1].value1 = '0'
    state.detailBar[1].value2 = '0'
    state.detailBar[2].value1 = '0'
    state.detailBar[2].value2 = '0'
    summaryOrderService
      .getList(param)
      .then(response => {
        commit("setKeepSearchHistory", JSON.stringify(param))
        dispatch('getOrderHistoryTotal', param)
        let temp = [];
        let tempLoad = [];
        let status = _.cloneDeep(state.dropdown);
        for (let i = 0; i < response['data'].length; i++) {
          let row = response['data'][i];
          let rsStatus = "";
          let tf_cipher = parseInt(row.tf_cipher)
          let order_status = row.order_status
          let truck_no = false
          if (_.isNull(row.truck_no)) {
            truck_no = false
          } else if (row.truck_no.length == 0) {
            truck_no = false
          } else {
            truck_no = true
          }

          let transfer_ref = false
          if (_.isNull(row.transfer_ref)) {
            transfer_ref = false
          } else if (_.trim(row.transfer_ref).length == 0) {
            transfer_ref = false
          } else {
            transfer_ref = true
          }
          let status_ln = false
          if (!_.isNull(row.status_ln)) {
            status_ln = true;
          }

          let po_status = row.po_status;
          let order_no = row.order_no.length < 2 ? false : true
          let inv_no = row.inv_no.length < 2 ? false : true
          let cust_confirm = row.cust_confirm.length < 2 ? false : true
          if (po_status == "noship") {
            rsStatus = "NS";
          } else if (tf_cipher == 1 && (order_status == "APV" || order_status == "SAPV")
            && po_status == 'canceled') {
            rsStatus = "CC";
          } else if (tf_cipher == 1 && (order_status == "APV" || order_status == "SAPV")
            && po_status == 'blocked') {
            rsStatus = "BC";
          } else if (tf_cipher == 1 && (order_status == "APV" || order_status == "SAPV")
            && order_no == true && inv_no == false && po_status == 'closed' && status_ln == true) {
            rsStatus = "CL";
          } else if (tf_cipher == 0 && order_status == "REJ"
            && order_no == false
            && inv_no == false
            && truck_no == false
            && transfer_ref == false
            && cust_confirm == false
            && status_ln == false
          ) {
            rsStatus = "RJ";
          } else if (tf_cipher == 0 && order_status == "WFA"
            && order_no == false
            && inv_no == false
            && truck_no == false
            && transfer_ref == false
            && cust_confirm == false
            && status_ln == false
          ) {
            rsStatus = "IP";
          } else if (tf_cipher == 0 && (order_status == "APV" || order_status == "SAPV")
            && order_no == false
            && inv_no == false
            && truck_no == false
            && transfer_ref == false
            && cust_confirm == false
            && status_ln == false) {
            rsStatus = "AP";
          } else if (tf_cipher == 1 && (order_status == "APV" || order_status == "SAPV" || order_status == "WFA")
            && order_no == false
            && inv_no == false
            && truck_no == false
            && transfer_ref == false
            && cust_confirm == false
            && status_ln == false) {
            rsStatus = "WT";
          } else if (tf_cipher == 1 && (order_status == "APV" || order_status == "SAPV")
            && order_no == true
            && inv_no == false
            && truck_no == false
            && transfer_ref == false
            && cust_confirm == false
            && status_ln == true) {
            rsStatus = "OD";
          } else if (tf_cipher == 1 && (order_status == "APV" || order_status == "SAPV")
            && order_no == true
            && inv_no == true
            && truck_no == false
            && transfer_ref == false
            && cust_confirm == false
            && status_ln == true) {
            rsStatus = "IN";
          } else if (tf_cipher == 1 && (order_status == "APV" || order_status == "SAPV")
            && order_no == true
            && inv_no == true
            && truck_no == true
            && (transfer_ref == true || transfer_ref == false)
            && cust_confirm == false
            && status_ln == true) {
            rsStatus = "SP";
          } else if (tf_cipher == 1 && (order_status == "APV" || order_status == "SAPV")
            && order_no == true
            && inv_no == true
            && truck_no == true
            && (transfer_ref == true || transfer_ref == false)
            && cust_confirm == true
            && status_ln == true) {
            rsStatus = "RC";
          } else if (tf_cipher == 1 && (order_status == "APV" || order_status == "SAPV")
            && order_no == false
            && inv_no == false
            && truck_no == false
            && transfer_ref == false
            && cust_confirm == false
            && status_ln == true) {
            rsStatus = "TF";
          } else {
            rsStatus = "NOSTATUS";
          }

          let statusName = status.filter(todo => todo.id == rsStatus);
          if (_.trim(row.po_date).length > 6) {
            row.po_date = moment(row.po_date).format("DD/MM/YY");
          }

          row.status_id = rsStatus;
          row.status = statusName.length > 0 ? statusName[0].title : "";
          temp.push(row);
          if (i < 40) {
            tempLoad.push(row);
          }
        }
        state.dataListTemp = _.cloneDeep(temp);

        if (tempLoad.length == 40 && response['data'].length > 40) {
          if (state.selected_dp == 'all') {
            commit("setDataList", tempLoad);
            state.tempAllByCondition = temp;
          } else {
            let rs = temp.filter(todo => todo.status_id == state.selected_dp)
            commit("setDataList", rs);
            state.tempAllByCondition = rs;
          }
        } else {
          if (state.selected_dp == 'all') {
            commit("setDataList", temp);
            state.tempAllByCondition = temp;
          } else {
            let rs = temp.filter(todo => todo.status_id == state.selected_dp)
            commit("setDataList", rs);
            state.tempAllByCondition = rs;
          }

        }
        /*
        if (state.selected_dp == 'all') {
          commit("setDataList", temp);
        } else {
          let rs = temp.filter(todo => todo.status_id == state.selected_dp)
          commit("setDataList", rs);
        }
          */
        state.spinner = false;
        // let invoiced_back = _.filter(state.dataList, item => {
        //   if ((item.fulfilled == '100' || item.fulfilled == 100) && item.po_status == 'closed') {
        //     return true;
        //   }
        // });
        state.summary = {
          // invoiced_back: invoiced_back.reduce(
          //   (acc, row) => acc + parseFloat(row.order_value),
          //   0
          // ),
          back_order: _.isUndefined(response['sum_backorder']) ? 0 : response['sum_backorder'],
          waiting: _.isUndefined(response['waiting']) ? 0 : response['waiting'],
          ordered: _.isUndefined(response['ordered']) ? 0 : response['ordered'],
          invoiced: _.isUndefined(response['invoiced']) ? 0 : response['invoiced'],
          reject: _.isUndefined(response['reject']) ? 0 : response['reject'],
        };

      })
      .catch();
  },
  getOrderById: ({ commit, state, dispatch }, values) => {
    dispatch("clearDG");
    state.spinnerDG = true;
    summaryOrderService
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
          summaryOrderService
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
          // console.log("-->")
          if (response.items != "false") {
            _.forEach(response.items, function (row) {
              // round ทศนิยม
              let price4 = _.round(row.price, 4);
              let price3 = _.round(price4, 3);
              let price2 = _.round(price3, 2);
              row.price = price2
              // console.log(row.price)
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

          summaryOrderService
            .getFlow({ doc_no: data.doc_no })
            .then(row => {
              state.spinnerDG = false;
              rs.flow = row;
              commit("setDetail", rs);
            })
            .catch();
          state.comment = [];
          summaryOrderService
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
};

const getters = {
  keyword_res: state => {
    return state.keyword_res;
  },
  getDetailPop: state => {
    return state.getDetailPop;
  },
  getDetailPO: state => {
    return state.getDetailPO;
  },
  keyword_code: state => {
    return state.keyword_code;
  },
  summaryPoDate: state => {
    return state.summaryPoDate;
  },
  summaryPo: state => {
    return state.summaryPo;
  },
  summaryDetail: state => {
    return state.summaryDetail;
  },
  summaryDate: state => {
    return state.summaryDate;
  },
  dataSummary: state => {
    return state.dataSummary;
  },
  paybycash_list: state => {
    return state.paybycash_list;
  },
  selected_date: state => {
    return state.selected_date;
  },
  dataList: state => {
    return state.dataList;
  },
  summary: state => {
    return state.summary;
  },
  spinner: state => {
    return state.spinner;
  },
  comment: state => {
    return state.comment;
  },
  dropdown: state => {
    return state.dropdown;
  },
  selected_dp: state => {
    return state.selected_dp;
  },
  detail: state => {
    return state.detail;
  },
  spinnerDG: state => {
    return state.spinnerDG;
  },
  totalItems: state => {
    return state.totalItems;
  },
  creditterm: state => {
    return state.creditterm;
  },
  commentList: state => {
    return state.commentList;
  },
  disableFrom: state => {
    return state.disableFrom;
  },
  disableFrom: state => {
    return state.disableFrom;
  },
  dataListTemp: state => {
    return state.tempAllByCondition;
  },
  detailBar: state => {
    return state.detailBar;
  },
  filter_search: state => {
    return state.filter_search;
  },
  headTotal: state => {
    return state.headTotal
  },
  headFilter: state => {
    return state.headFilter
  },
  keepSearchHistory: state => {
    return state.keepSearchHistory
  }


};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
