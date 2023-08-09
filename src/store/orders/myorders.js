// import salePerformanceService from '../../services/performance/salePerformance'
import Vue from "vue";
import moment from "moment";
import ordService from "../../services/orders/myorders";
import formService from "../../services/core/formmanage";
import _ from "lodash";


const state = {
  date_selected: {
    month: "",
    year: "",
    range: "-"
  },
  summary_bar: {
    sum_draft: 0,
    sum_pendding: 0,
    sum_complete: 0
  },
  spinner_loading: false,
  autocom_cg: [],
  items_order: [],
  items_order_bk: [],
  items_promo_order: [],
  temp_master_cg: [],
  master_cg: [],
  temp_promo_code: [],
  temp_fg_code: [],
  draft_list: [],
  promo_set_list: [],
  pending_list: [],
  xpress_list: [],
  reject_list: [],
  completed_list: [],
  promo_seleceted: [],
  promo_seleceted_temp: [],
  comment: [],
  keepIndexEdit: "default",
  totalDiscount: 0,
  totalNetAmount: 0,
  totalAmount: 0,
  totalOrderQty: 0,
  totalPromo: {
    netPrice: 0,
    orderQty: 0,
    netAmount: 0,
    countItem: 0,
    amount: 0
  },
  thisPage: "",
  thisPagePM: "",
  customer_info: {
    id: "",
    customer_code: "",
    customer_coded: "",
    customer_name: "-",
    po_no: "System",
    doc_no: "",
    po_date: "",
    creator: "",
    user_create: "",
    ship_to: 0,
    salesman: "",
    salesman_code: "",
    delivery_date: "",
    delivery_date_cipher: "",
    delivery_log: "front default",
    discount: 0,
    percent_discount: 0,
    default_discount:0,
    perDiscountMng: 0 + "%",
    warehouse_code: 0,
    priority: "1",
    take_note: "",
    credit_limit: 0,
    outstanding: 0,
    order_value: 0,
    balance: 0,
    credit_rating: "-",
    order_status: "DRF",
    customer_address: "",
    pay_by_cash: false,
    payByCash: false,
    payByCashOld: false,
    process_order_channel:'',

    //FIX PRICE------------
    pricetype_code: "0",
    price_policy_code: '',
    price_policy_title: '',
    pricefix_code: '',
    pricefix_title: '',
    pricebook_code: '',
    pricebook_title: '',
    customer_channel_code: '',
    customer_channel_title: '',

  },
  paybycash_list: {
    cust_addr1: "",
    cust_addr2: "",
    cust_addr3: "",
    sent_to_cus_name: "",
    receive_name: "",
    tax_id: ""
  },
  promo_set_seleceted: "",
  items_freegift: [],
  promo_freeg_seleceted: [],
  it_NetPrice: 0,
  it_NetAmount: 0,
  it_Amount: 0,
  it_OrderQty: 0,
  promo_NetPrice: 0,
  promo_NetAmount: 0,
  promo_Amount: 0,
  promo_OrderQty: 0,
  fg_NetPrice: 0,
  fg_NetAmount: 0,
  fg_Amount: 0,
  fg_OrderQty: 0,
  freegift_count: [],
  promo_set_selecet_code_temp: "",
  promo_mode: "",
  order_selected: "",
  flow: {},
  master_warehouse: [],
  master_shipto: [],
  salesman_list: [],
  priority: [],
  creditterm: [],
  check_stock: [],
  temp_comment_status: false,
  spinner_order: false,
  spinner_order_vd: false,
  keep_comment_id: {},
  chiefsales: [],
  chiefsales_selected: "",
  keepRouter: true,
  popupComment: [],
  apv_saleman: [],
  apv_customer: [],
  apv_pono: [],
  filter_po: "",
  filter_customer: "",
  filter_salesman: "",
  apv_pono: [],
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
      value: 0,
      text: "Incentive",
      mode: true
    },
    max_pass_percent: 0
  },
  noti_event: {
    doc_no: "",
    status: true,
    noti_type: "",
    type: ""
  },
  // PROMOTION
  spinner_promo: false,
  product_group: [],
  product_cg: [],
  percentDiscPM: 0,
  keepSets: "",
  bigData: [],
  bigPromoset: [],
  fucusCustomer: "",
  textBtnPromo: "ADD TO ORDER",
  volDisList: [],
  keepRange: [],
  totalvolDis: 0,
  textRange: [],
  mstDiscount: [],
  keepDiscountAPV: [],
  minimumSales: 0,
  budget: 0,
  compareBudget: 0,
  enddatePromo: [],
  disableFrom: [],
  loadCustStatus: false,
  allCustomer: [],
  allCustomer_temp: [],
  allCustomer_spinner: false,
  showPONO: '',
  checkBtnAdd: false,
  sumBudgetAllRow: 0,
  totalItems: 0,
  dataListProductDG: {
    product_group: [],
    sub_group: [],
    cg: []
  },
  itemDemo: {
    id: '',
    item_code: '',
    item_name: '',
    discount: "-",
    ppu: 0,
    price: 0,
    net_price: 0,
    order_qty: 0,
    last_discount: 0,
    net_amount: 0,
    unit_type: "INNER",
    unit: '',
    unit_id: '',
    error_stock: '',
    checked: false,
    editMode: false,
    volDiscount: "N",
    flag_status: "A",
    ref_po_no: '',
    priceVD: 0,
    // volume_dis: '',
    budget: 0,
  
    price_policy_code: '',
    price_code: '',
    vd_price_code: ''
  },
  bkMode: false,
  rolecode:'',
  checkBtnCal: false,
  totalDiscount_old: false,
  keep_preview:'',
  orderDialog: {
    bigPromoset: [],
    bkMode: 'OD',
    budget: 0,
    comment: [],
    chiefsales: [],
    compareBudget: 0,
    creditterm: [],
    customer_info: {},
    enddatePromo: '',
    flow: [],
    items_order: [],
    items_order_bk: [],
    items_promo_order: [],
    items_freegift: [],
    fucusCustomer: '',
    keep_comment_id: {},
    keepDiscountAPV: {},
    master_shipto: [],
    master_warehouse: [],
    mstDiscount: [],
    minimumSales: 0,
    order_selected: '',
    paybycash_list: [],
    popupComment: [],
    product_cg: [],
    product_group: [],
    priority: [],
    sumBudgetAllRow: 0,
    ponoStep: false,
    salesman_list: [],
    totalDiscount: 0,
    totalOrderQty: 0,
    temp_comment_status: false,
    totalAmount: 0,
    totalNetAmount: 0,
    totalItems: 0,
    temp_promo_code: null,
    prod_dataList: [],
    prod_headChk: [],
    prod_only_my_product: true,
    prod_product_cg: '',
    prod_mo_product_group_code: '',
    prod_mo_sub_group_code: '',
    prod_mo_product_cg: '',
    prod_disabledBtn: false,
    prod_dataListProductDG: {
      cg: [],
      sub_group: [],
      product_group: []
    },
    prod_keyword: '',
    prod_product_cg: 'all',
    prod_sub_group_code: 'all',
    prod_product_group_code: 'all',
    reCallGetShipToStatus: false,
    chiefsalesLoding: false,
  },
  deliverydate_servercipher: "",

};
const mutations = {
  SET_SHOWPONO(state, value) {
    state.showPONO = value;
  },
  SET_CHECKBTN_ADD(state, value) {
    state.checkBtnAdd = value;
  },
  SET_CHECKBTN_CAL(state, value) {
    state.checkBtnCal = value;
  },
  SET_SPINNER_DG(state, value) {
    state.spinner_loading = value;
  },
  SET_PAYBYCASH(state, value) {
    state.paybycash_list = value;
  },
  SET_SPINNER_ORDER(state, value) {
    state.spinner_order = value;
  },
  SET_CHECK_COMMENT(state, value) {
    state.temp_comment_status = value;
  },
  setChiefsales(state, value) {
    state.chiefsales = value;
  },
  SET_AUTOCOM_CG(state, value) {
    state.autocom_cg = value;
  },
  SET_POPUP_COMMENT(state, value) {
    state.popupComment = value;
  },
  SET_KEEP_ROUTER(state, value) {
    state.keepRouter = value;
  },
  SET_THIS_PAGE(state, value) {
    state.thisPage = value;
  },
  SET_THIS_PAGEPM(state, value) {
    state.thisPagePM = value;
  },
  SET_COMMENT(state, value) {
    state.comment = value;
  },
  setFlow(state, value) {
    state.flow = value;
  },
  SET_NOTI_EVENT(state, value) {
    state.noti_event = value;
  },
  setDraftList(state, value) {
    state.draft_list = value;
  },
  setPenddingList(state, value) {
    state.pending_list = value;
  },
  setCompleteList(state, value) {
    state.completed_list = value;
  },
  setXpressList(state, value) {
    state.xpress_list = value;
  },
  setRejectList(state, value) {
    state.reject_list = value;
  },
  setPromotionSet(state, value) {
    state.promo_set_list = value;
  },
  setCustomerInfo(state, value) {
    state.customer_info = value;
  },
  setSalesmanList(state, value) {
    state.salesman_list = value;
  },
  setPromotions(state, value) {
    let temp = [];
    value.forEach(function (value, key) {
      value.checked = false;
      for (let i = 0; i < value.products.length; i++) {
        value.products[i].editMode = false;
        value.products[i].checked = false;
        value.products[i].error_stock = "";
      }
      temp.push(value);
    });
    state.items_promo_order = temp;
  },
  setItems(state, value) {
    let temp = [];
    let Dis =
      state.customer_info.percent_discount == ""
        ? 0
        : state.customer_info.percent_discount;
    value.forEach(function (value, key) {
      value.editMode = false;
      value.checked = false;
      temp.push(value);
    });
    // console.log(state.items_order)
    state.items_order = temp;
  },
  setItemsPromo(state, value) {
    state.items_promo_order = value;
  },
  setCheckStock(state, value) {
    state.check_stock = value;
  },
  setMasterCG(state, value) {
    let temp = [];
    value.forEach(function (row, key) {
      let master = _.cloneDeep(state.items_order);
      let masterPro = _.cloneDeep(state.items_promo_order);
      let items = row.items;
      // console.log(items);
      if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {

          let indexItem = _.findIndex(master, {
            item_code: items[i].code
          });
          let indexItemFil = _.filter(master, item => {
            return item.item_code == items[i].code;
          });
          let tempPromo = [];
          let tempFreegift = [];
          _.forEach(masterPro, function (row) {
            let indexPromo = _.filter(row.products, item => {
              return item.item_code == items[i].code;
            });
            if (indexPromo.length > 0) {
              tempPromo.push(indexPromo[0]);
            }
            let indexFreegift = _.filter(row.freeitems, item => {
              return item.item_code == items[i].code;
            });
            if (indexFreegift.length > 0) {
              tempFreegift.push(indexFreegift[0]);
            }
          });
          // console.log("code => ", items[i].code);
          // console.log("indexItemFil => ", indexItemFil);
          // console.log("tempPromo => ", tempPromo);
          // console.log("tempFreegift => ", tempFreegift);
          if (indexItemFil.length > 1) {
            /**เจอทั้ง normal items และ free gift*/
            // console.log("Add 1 =====>", items[i].code);

            let indexNo0 = _.findIndex(master, function (o) {
              return (
                o.item_code == items[i].code &&
                parseFloat(o.price) > 0 &&
                (_.isUndefined(o.ref_po_no) || _.trim(o.ref_po_no).length < 2)
              );
            });
            if (indexNo0 >= 0) {
              items[i].title = items[i].title_th;
              items[i].checked = true;
            } else {
              let fil0 = _.filter(indexItemFil, o => {
                return o.item_code == row.items[i].code && parseFloat(o.price) == 0;
              });
              if (fil0.length == 1 && _.isUndefined(fil0[0].ref_po_no) ||
                _.trim(fil0[0].ref_po_no).length < 2) {
                items[i].title = items[i].title_th;
                items[i].checked = true;
                items[i].freegift = true;
              } else {
                _.remove(row.items, function (val) {
                  if (val.code == row.items[i].code) {
                    return true;
                  }
                });
              }
            }
          } else if (indexItemFil.length == 1 && tempPromo.length == 0) {
            // console.log("Add 2 =====> ", items[i].code);
            // console.log("Add 2 =====> ", indexItemFil[0]);
            if (_.isUndefined(indexItemFil[0].ref_po_no) ||
              _.trim(indexItemFil[0].ref_po_no).length < 2) {
              if (parseFloat(indexItemFil[0].price) > 0) {
                // console.log("2.1")
                items[i].title = items[i].title_th;
                items[i].checked = true;

              } else {
                if (parseFloat(row.items[i].ppu) == 0) {
                  items[i].title = items[i].title_th;
                  items[i].checked = true;
                  // console.log("2.11")
                } else {
                  // console.log("2.111")
                }
              }
            } else {
              if (parseFloat(indexItemFil[0].price) > 0) {
                items[i].title = items[i].title_th;
                items[i].checked = false;
                items[i].freegift = true;
                // console.log("2.2")
              } else if (parseFloat(indexItemFil[0].price) == 0 && parseFloat(indexItemFil[0].ppu) > 0) {
                // console.log("2.3")
              } else if (parseFloat(indexItemFil[0].price) == 0 && parseFloat(indexItemFil[0].ppu) == 0) {
                if (parseFloat(row.items[i].ppu) == 0) {
                  _.remove(row.items, function (val) {
                    if (val.code == row.items[i].code) {
                      return true;
                    }
                  });
                  // console.log("2.4")
                } else {
                  // console.log("2.5", row.items[i])

                }

              } else {
                // console.log("2.6")
              }
            }
          } else if (indexItemFil.length == 0 && tempPromo.length == 0) {
            items[i].title = items[i].title_th;
            items[i].checked = false;
            // console.log("Add 3  ==> ", items[i].code);
          } else if (indexItemFil.length == 0 && tempPromo.length > 0 )  {
            items[i].title = items[i].title_th;
            items[i].checked = false;
            items[i].freegift = true;
            // console.log("Add 33  ==> ", items[i].code);
          } else if (indexItemFil.length == 1 && tempPromo.length > 0) {
            if (indexItemFil[0].price == 0) {
              items[i].title = items[i].title_th;
              items[i].checked = true;
              items[i].freegift = true;
              // console.log("Add 4  ==> ", items[i].code);
              // console.log('tempPromo =>' , tempPromo)
              // console.log('indexItemFil =>', indexItemFil[0])
            }
          } else {
            // console.log("Add 4  ==> ", items[i].code);
          }
        }
        if (row.items.length > 0) {
            // console.log('OOO' , items)
          let countCheck = items.filter(todo => todo.checked == true );
          if (countCheck.length == items.length) {
            // console.log('OOO2')
            row.checked = true;
          } else {
            row.checked = false;
            // console.log('OOO3')
          }
          temp.push(row);
        }
      }
    });
    state.master_cg = temp;
  },
  selectedPromo(state, value) {
    state.promo_seleceted = value;
  },
  selectedPromoTemp(state, value) {
    state.promo_seleceted_temp = value;
  },
  selectedPromoSet(state, value) {
    state.promo_set_seleceted = value;
  },
  selectedFreegift(state, value) {
    state.promo_freeg_seleceted = value;
  },
  selectedChiefsales(state, value) {
    state.chiefsales_selected = value;
  },
  keepFreegiftCode(state, value) {
    state.temp_fg_code = value;
  },
  keepPromoCode(state, value) {
    state.temp_promo_code = value;
  },
  setFreegift(state, value) {
    let temp = [];
    value.forEach(function (value, key) {
      value.error_stock = "";
      value.editMode = false;
      value.checked = false;
      value.amount = parseFloat(value.net_price) * parseFloat(value.order_qty);
      temp.push(value);
    });
    state.items_freegift = temp;
  },
  setPromoMode(state, value) {
    state.promo_mode = value;
  },
  setPercentDiscPM(state, value) {
    state.percentDiscPM = value;
  },
  setKeepSets(state, value) {
    state.keepSets = value;
  },
  setFucusCustomers(state, value) {
    state.fucusCustomer = value;
  },
  setVolDisList(state, value) {
    state.volDisList = value;
  },
  setKeepRange(state, value) {
    state.keepRange = value;
  },
  setTotalvolDis(state, value) {
    state.totalvolDis = value;
  },
  setMinimumSales(state, value) {
    state.minimumSales = value;
  },
  setBudget(state, value) {
    state.budget = value;
  },
  setRoleCode(state , value) {
    state.rolecode = value
  },
  setCompareBudget(state, value) {
    state.compareBudget = value;
  },
  setEnddate(state, value) {
    state.enddatePromo = value;
  },
  setSpinnerPromo(state, value) {
    state.spinner_promo = value;
  },
  setDataListProductDG(state, value) {
    state.dataListProductDG = value;
  },
  setBkMode(state, value) {
    state.bkMode = value;
  },
  setMasterShipto(state, value) {
    state.master_shipto = value;
  },
};

const actions = {
  reCallGetShipTo: ({ state, commit, dispatch }, value) => {
    state.spinner_order = true
    let obj = { cust_code: value.code }
    if (value.action == 'getInfoFromBK') {
      obj = { cust_code: value.code.customer_code }
    }
    Vue.http.get(Vue.config['url'] + '/get-ship-to', {
      params: obj,
      headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
    }).then(response => {
      state.spinner_order = false
      state.reCallGetShipToStatus = true
      let rs = response.body.success.data;
      commit('setMasterShipto', rs)
      dispatch('setLocalStore', { feild: 'master_shipto', data: rs })
      dispatch('setSession', { feild: 'master_shipto', data: rs })
      if (value.action == 'getPurcheseInfo') {
        commit("setCustomerInfo", value.data);
      } else if (value.action == 'getInfoFromBK') {
        if (value.code.order_type == 'K1') {
          value.data.warehouse_code = 'DNSS'
          commit("setCustomerInfo", value.data);
        } else {
          value.data.warehouse_code = 'DNPC'
          var spTo = _.find(rs, item => {
            if (item.code == '111') {
              return true;
            }
          });
          if (!_.isUndefined(spTo)) {
            value.data.ship_to = spTo.customer_code
          }
          commit("setCustomerInfo", value.data);
        }
      }
      // success callback
    }, response => {
      // error callback
      if (response.status == 500) {
        state.reCallGetShipToStatus = false
        // dispatch('reCallGetShipTo', value)
      }
    });
  },
  afterFullReffresh: ({ state, commit, dispatch }, value) => {
    dispatch("clearDialog");
    state.totalDiscount = value['totalDiscount'];


    // console.log('value.customer_info' , value.customer_info)
    commit('setCustomerInfo', value.customer_info)
    commit('setSalesmanList', value['salesman_list'])
    state.temp_comment_status = value['temp_comment_status'];
    commit('SET_COMMENT', value['comment'])
    commit('SET_POPUP_COMMENT', value['popupComment'])
    commit('setItems', value['items_order'])
    state.items_order_bk = value['items_order_bk']
    commit('setItemsPromo', value['items_promo_order'])
    commit('setFreegift', value['items_freegift'])
    state.product_cg = value['product_cg'];
    state.product_group = value['product_group'];
    state.bigPromoset = value['bigPromoset'];
    // state.master_shipto = value['master_shipto'];
    commit('setMasterShipto', value['master_shipto'])
    state.totalOrderQty = value['totalOrderQty'];
    state.totalAmount = value['totalAmount'];
    state.totalNetAmount = value['totalNetAmount'];
    state.sumBudgetAllRow = value['sumBudgetAllRow'];
    state.totalItems = value['totalItems'];
    commit('setBkMode', value['bkMode'])
    state.temp_promo_code = value['temp_promo_code'];
    commit('setChiefsales', value['chiefsales'])
    commit('setBudget', value['budget'])
    state.totalDiscount_old =  value['customer_info'].perDiscountMng
    let paybycash_list = {
      cust_addr1: value.customer_info.cust_addr1,
      cust_addr2: value.customer_info.cust_addr2,
      cust_addr3: value.customer_info.cust_addr3,
      sent_to_cus_name: value.customer_info.sent_to_cus_name,
      receive_name: value.customer_info.receive_name,
      tax_id: value.customer_info.tax_id
    };
    commit('SET_PAYBYCASH', paybycash_list)
    state.order_selected = value['order_selected'];
    commit('setFucusCustomers', value['fucusCustomer'])
    commit('setFlow', value['flow'])
    commit('setEnddate', value['enddatePromo'])
    state.keepDiscountAPV = value['keepDiscountAPV'];
    commit('setCompareBudget', value['compareBudget'])
    state.master_warehouse = value['master_warehouse']
    state.creditterm = value['creditterm']
    state.keep_comment_id = value['keep_comment_id']
    state.priority = value['priority']
    state.mstDiscount = value['mstDiscount']
    commit('setMinimumSales', value['minimumSales'])
    setTimeout(function () {
      let allProd_dilog = Vue.localStorage.get("ALLPROD_DIALOG_SHOW");
      if (allProd_dilog == "OPEN") {
        state.thisPage.showAllProduct();
        commit(
          "setDataListProductDG",
          value['prod_dataListProductDG']
        );
      }
    }, 100);
  },
  setLocalStore: ({ state ,dispatch}, value) => {
    // SAVE local store
    dispatch('setSession',value)
    let obj = Vue.localStorage.get("ORD_DIALOG");
    if (_.isUndefined(obj) || obj != 'undefined') {
      let theArray = JSON.parse(obj);
      if (_.isNull(theArray)) {
          Vue.localStorage.set("ORD_DIALOG", JSON.stringify(this.orderDialog));
          // sessionStorage.setItem('DIALOG_SESSION',JSON.stringify(this.orderDialog));
      } else {
        if (!_.isUndefined(theArray[value.feild]) || !_.isNull(theArray[value.feild])) {
          theArray[value.feild] = value.data
          Vue.localStorage.set("ORD_DIALOG", JSON.stringify(theArray));
          // sessionStorage.setItem('DIALOG_SESSION', JSON.stringify(theArray));
        }
      }
    }
  },
  setSession: ({ state }, value) => {
    // SAVE local store
    let obj = sessionStorage.getItem('keep_order_session')
    if (_.isUndefined(obj) || obj != 'undefined') {
      let theArray = JSON.parse(obj);
      if (_.isNull(theArray)) {
          // Vue.localStorage.set("ORD_DIALOG", JSON.stringify(this.orderDialog));
          sessionStorage.setItem('keep_order_session',JSON.stringify(this.orderDialog));
      } else {
        if (!_.isUndefined(theArray[value.feild]) || !_.isNull(theArray[value.feild])) {
          theArray[value.feild] = value.data
          // Vue.localStorage.set("ORD_DIALOG", JSON.stringify(theArray));
          sessionStorage.setItem('keep_order_session', JSON.stringify(theArray));
        }
      }
    }
  },
  addItems: ({ commit, state, dispatch }) => {
    console.log('ADD')
    commit("setSpinnerPromo", true)
    setTimeout(function () {
      state.keepIndexEdit = "default";
      let promoSetSeleceted = _.cloneDeep(state.promo_set_seleceted);
      /*
      ปิดตรงนี้
      let promoSeleceted = _.cloneDeep(state.promo_seleceted);
      */
      let promoSeleceted = _.cloneDeep(state.promo_seleceted_temp);
      let freegSeleceted = _.cloneDeep(state.promo_freeg_seleceted);
      let keepFGCode = _.cloneDeep(state.temp_fg_code);
      let itemsPromo = _.cloneDeep(state.items_promo_order);
      let bigData = _.cloneDeep(state.bigData);
      let info = _.cloneDeep(state.customer_info);

      //หัก FREE GIFT ออก
      let bigIndex = _.findIndex(bigData, {
        promo_code: promoSetSeleceted.promo_code
      });
      let big = {
        promo_code: promoSetSeleceted.promo_code,
        products: promoSeleceted,
        freeitems: freegSeleceted,
        discount: state.percentDiscPM,
        netPrice: state.totalPromo.netPrice,
        countItem: state.totalPromo.countItem,
        orderQty: state.totalPromo.orderQty,
        netAmount: state.totalPromo.netAmount
      };
      if (bigIndex >= 0) {
        state.bigData[bigIndex] = big;
      } else {
        state.bigData.push(big);
      }
      let orQty = freegSeleceted.reduce(
        (acc, row) => acc + parseInt(row.order_qty),
        0
      );
      var promoFilter = _.filter(promoSeleceted, item => {
        if (item.order_qty > 0 && item.order_qty != "") {
          return true;
        }
      });
      var freegFilter = _.filter(freegSeleceted, item => {
        if (item.order_qty > 0 && item.order_qty != "") {
          return true;
        }
      });
      let promoFind = _.findIndex(itemsPromo, {
        promo_code: promoSetSeleceted.promo_code
      });
      _.forEach(promoFilter, function (row) {

        let tempRow = _.cloneDeep(row);
        row.promo_sets_name = state.keepSets.name;
        row.price = tempRow.net_price;
        row.checked = false;
        row.amount = tempRow.net_amount;
        let per = parseFloat(info.percent_discount) / 100;
        let qty = parseFloat(tempRow.net_price) * tempRow.order_qty

        let rsNetPrice =
          parseFloat(tempRow.net_price) * per;
        let npp = parseFloat(tempRow.net_price) - rsNetPrice;
        let npp2 = _.round(npp, 2);
        row.net_price = npp2;

        let p_dis = parseFloat(tempRow.net_price) * (parseFloat(info.percent_discount) / 100)
        // let p_dis = parseFloat(tempRow.price) * (parseFloat(info.percent_discount) / 100)
        let p_dis4 = _.round(p_dis, 4);
        let p_dis2 = p_dis4 * parseInt(tempRow.order_qty);
        let p_dis5 = _.round(p_dis2, 4);
        row.last_discount = _.round(p_dis5, 2);

        let npStep1 = _.round(p_dis4, 2);
        let npStep2 = parseFloat(tempRow.net_price) - npStep1
        // let npStep2 = parseFloat(tempRow.price) - npStep1
        let npStep3 = _.round(npStep2, 4);
        let npStep4 = _.round(npStep3, 2);
        let npStep5 = row.amount * (parseFloat(info.percent_discount) / 100)
        let npStep6 = row.amount - npStep5
        let npStep7 = _.round(npStep6, 4);
        let npStep8 = _.round(npStep7, 2);
        row.net_amount = npStep8;

        // let npStep2 = parseInt(row.order_qty) * npStep1
        // let npStep3 = _.round(npStep2, 4);
        // let npStep4 = _.round(npStep3, 2);
        // let npStep5 = row.amount - npStep4
        // let npStep6 = _.round(npStep5, 4);
        // let npStep7 = _.round(npStep6, 2);
        // row.net_amount = npStep7;

        /*
        let b1 = parseFloat(row.ppu) - parseFloat(row.price)
        let b2 = b1 * parseInt(row.order_qty);
        let b3 = _.round(b2, 4);
        row.budget = _.round(b3, 2);
        */
        row.budget = 0;
      });

      let rs_netA = promoFilter.reduce(
        (acc, row) => acc + parseFloat(row.net_amount),
        0
      );
      let rs_amount = promoFilter.reduce(
        (acc, row) => acc + parseFloat(row.amount),
        0
      );

      if (promoFind >= 0) {
        // เลือก promotion ใหม่ซ้ำกับ promotion ที่เลือกไปแล้ว
        itemsPromo[promoFind].products = promoFilter;
        itemsPromo[promoFind].net_amount = rs_netA;
        itemsPromo[promoFind].amount = rs_amount;
        itemsPromo[promoFind].order_qty = state.totalPromo.orderQty - orQty;
        itemsPromo[promoFind].freeitems = freegFilter;
        dispatch('setLocalStore', { feild: 'items_promo_order', data: itemsPromo })
        dispatch('setSession', { feild: 'items_promo_order', data: itemsPromo })

        commit("setItemsPromo", itemsPromo);
        keepFGCode = _.filter(keepFGCode, item => {
          if (item.promo_code != promoSetSeleceted.promo_code) {
            return true;
          }
        });
      } else {
        // เลือก promotion ใหม่
        promoSetSeleceted.display = false;
        promoSetSeleceted.checked = false;
        promoSetSeleceted.products = promoFilter;
        promoSetSeleceted.net_amount = rs_netA;
        promoSetSeleceted.amount = rs_amount;
        promoSetSeleceted.order_qty = state.totalPromo.orderQty - orQty;
        promoSetSeleceted.freeitems = freegFilter;
        itemsPromo.push(promoSetSeleceted);
        dispatch('setLocalStore', { feild: 'items_promo_order', data: itemsPromo })
        dispatch('setSession', { feild: 'items_promo_order', data: itemsPromo })
        commit("setItemsPromo", itemsPromo);
        // dispatch("sumTotalTable");
      }

      dispatch("sumTotalTable");
      commit("setSpinnerPromo", false)
      dispatch("getPromoCG", {
        customer_code: info.customer_code,
        group: "all"
      });
      //PROD 03/12/2020
      commit('selectedPromoTemp', [])
    }, 0);
  },
  deleteItem: ({ commit, state, dispatch }, value) => {
    setTimeout(function () {
      let keepDel = [];
      let items = _.cloneDeep(state.items_order);
      let promo = _.cloneDeep(state.items_promo_order);
      let info = _.cloneDeep(state.customer_info);
      if (value.parent) {
        if (info.po_no == 'System') {
          dispatch('setLocalStore', { feild: 'items_order', data: [] })
          dispatch('setLocalStore', { feild: 'bkMode', data: 'OD' })

          
          dispatch('setSession', { feild: 'items_order', data: [] })
          dispatch('setSession', { feild: 'bkMode', data: 'OD' })


          commit("setItems", []);
          commit('setBkMode', 'OD')
        } else {
          var rsItemsDel = _.filter(items, item => {
            if (!_.isUndefined(item.ref_po_no) &&
              _.trim(item.ref_po_no).length > 2) {
              return true;
            }
          });
          commit("setItems", rsItemsDel);
          dispatch('setLocalStore', { feild: 'items_order', data: rsItemsDel })
          dispatch('setSession', { feild: 'items_order', data: rsItemsDel })

        }
        state.thisPage.headChk = false;
        commit("setPromotions", []);
        commit("keepPromoCode", null);
        state.bigData = [];

        dispatch('setLocalStore', { feild: 'bigData', data: [] })
        dispatch('setLocalStore', { feild: 'items_promo_order', data: [] })
        dispatch('setLocalStore', { feild: 'temp_promo_code', data: null })


        dispatch('setSession', { feild: 'bigData', data: [] })
        dispatch('setSession', { feild: 'items_promo_order', data: [] })
        dispatch('setSession', { feild: 'temp_promo_code', data: null })
      } else {
        //DELETE ITEMS
        var rsItemsDel = _.filter(items, item => {
          if (item.checked === true) {
            return true;
          }
        });
        keepDel = rsItemsDel;
        if (rsItemsDel.length > 0) {
          var rsItems = _.filter(items, item => {
            if (item.checked === false) {
              return true;
            }
          });
          commit("setItems", rsItems);
          dispatch('setLocalStore', { feild: 'items_order', data: rsItems })
          dispatch('setSession', { feild: 'items_order', data: rsItems })


          var chexkBkMode = _.filter(rsItems, item => {
            if (item.ref_po_no.length > 2 && !_.isUndefined(item.ref_po_no)) {
              return true;
            }
          });
          if (chexkBkMode.length == 0) {
            commit('setBkMode', 'OD')
            dispatch('setLocalStore', { feild: 'bkMode', data: 'OD' })
            dispatch('setSession', { feild: 'bkMode', data: 'OD' })

          }
        }

        //DELETE PROMOTION
        promo.forEach(function (value, key) {
          if (value.checked) {
            _.remove(promo, function (val) {
              return val.checked == true;
            });
            _.remove(state.bigData, function (val) {
              return val.promo_code == value.promo_code;
            });
          } else {
            _.remove(value["freeitems"], function (val) {
              if (val.checked) {
                let keyItem = _.findIndex(state.bigData, {
                  promo_code: val.promo_code
                });
                if (keyItem >= 0) {
                  let keyDetail = _.findIndex(state.bigData[keyItem]['freeitems'], {
                    item_code: val.item_code
                  });
                  if (keyDetail >= 0) {
                    state.bigData[keyItem]['freeitems'][keyDetail].order_qty = 0
                  }
                }
              }
              return val.checked == true;
            });
          }
        });
        commit("setItemsPromo", promo);
        state.thisPage.delBtn = false;
        state.thisPage.unitBtn = false;
        state.thisPage.headChk = false;
        state.keepIndexEdit = "default";

        dispatch('setLocalStore', { feild: 'items_promo_order', data: promo })
        dispatch('setSession', { feild: 'items_promo_order', data: promo })
      }
      /*
       ยังไม่้ว่า set ทำไมเลยปิดไว้ก่อน
      let masterCG = _.cloneDeep(state.temp_master_cg);
      commit("setMasterCG", masterCG);
        */
      _.forEach(keepDel, function (row) {
        if (!_.isUndefined(row.group)) {
          let tempVD = row.group
          let type = 'del'
          dispatch('checkRange', { tempVD, row, type })
        }
      });

      dispatch("sumTotalTable");
    }, 0);
  },
  removeItemsFromPromo: ({ dispatch, state }, value) => {
    _.forEach(value, function (row) {
      if (!_.isUndefined(row.group)) {
        let tempVD = row.group
        dispatch('checkRange', { tempVD, row })
      }
    });
    dispatch("sumTotalTable");
  },
  checkByItems: ({ state }, value) => {
    console.log('checkByItems')
    if (value.indexPrarent == "promo") {
      let val = state.items_promo_order[value.indexDetail].checked
      let data = state.items_promo_order[value.indexDetail];
      data["products"].forEach(function (row, key) {
        row.checked = val;
      });
      data["freeitems"].forEach(function (record, keys) {
        record.checked = val;
      });
    }

    let count = []
        // let count = state.items_order.filter(todo => todo.checked === true
        //       && (_.isUndefined(todo.ref_po_no) ||
        //         _.trim(todo.ref_po_no).length < 2)
        //       );
    // console.log(state.items_order)
      let count_check = state.items_order.filter(todo => todo.checked === true)

      let count_2 =   count_check.filter(todo => _.isUndefined(todo.bk_type) )

      if(count_2.length > 0){
        // NEW
       
             count = state.items_order.filter(todo => todo.checked === true
              && (_.isUndefined(todo.ref_po_no) ||
                _.trim(todo.ref_po_no).length < 2)
              );
               console.log('New => ' , count)
      }else  {
        // back
            count =  state.items_order.filter(todo =>todo.checked === true && todo.bk_type != 'km')
            console.log(' back => ',count)
      }

      
   
    let countPromo = state.items_promo_order.filter(
      todo => todo.checked === true
    );

    let tempFg = [];
    let tempFgF = [];
    state.items_promo_order.forEach(function (record, keys) {
      let rs = record.freeitems.filter(todo => todo.checked === true);
      if (rs.length > 0) {
        tempFg.push(rs);
      }
      let rsF = record.freeitems.filter(todo => todo.checked === false);
      if (rsF.length > 0) {
        tempFgF.push(rsF);
      }
    });
    var dupItems = _.filter(state.items_order, item => {
      if (!_.isUndefined(item.ref_po_no) &&
        _.trim(item.ref_po_no).length > 2) {
        return true;
      }
    });
    if (
      count.length == state.items_order.length &&
      countPromo.length == state.items_promo_order.length &&
      tempFgF.length == 0
    ) {
      // console.log('1')
      state.thisPage.headChk = true;
    } else {
      // console.log('2')
      state.thisPage.headChk = false;
    }
    if (count.length == 0 && countPromo.length == 0 && tempFg.length == 0) {

      // state.thisPage.delBtn = state.items_order.length > 0 ? true : false;
      let check_km =  state.items_order.filter(todo =>todo.checked === true && todo.bk_type == 'km')
        if(check_km.length > 0){
          state.thisPage.delBtn = true
        }else {
          state.thisPage.delBtn = false
        }
            
      state.thisPage.unitBtn = false;

      console.log("1 >>> ")
    } else if (count.length == 0 && countPromo.length > 0) {
      state.thisPage.delBtn = true;
      state.thisPage.unitBtn = false;
      console.log("2 >>> ")
    } else if (
      count.length == 0 &&
      countPromo.length == 0 &&
      tempFg.length > 0
    ) {
      state.thisPage.delBtn = true;
      state.thisPage.unitBtn = false;
      console.log("3 >>> ")
    } else {
      console.log("4 >>> ",state.items_order)
      console.log("4 >>> ",dupItems)
      console.log("4 >>> ",count)
      state.thisPage.delBtn = true;
      let total = state.items_order.length - dupItems.length
      console.log(total)
      if (total == count.length) {
        state.thisPage.unitBtn = true
      } else if (dupItems.length == count.length) {
        console.log('114011')
        state.thisPage.unitBtn = true
      } else {
        console.log('1140')
        state.thisPage.unitBtn = true
      }
      // state.thisPage.unitBtn = dupItems.length == count.length ? false : true;
    }
  },
  checkByItemsPro: ({ state }, value) => {
    let mom = value.indexPrarent;
    let child = value.indexDetail;
    let data = state.items_promo_order[mom]["products"];
    data[child].checked = value.e;
    let promo = _.cloneDeep(state.items_promo_order);
    let countPromo = data.filter(todo => todo.checked === true);
    if (countPromo.length == data.length) {
      state.thisPage.unitBtn = true;
      state.items_promo_order[mom].checked = true;
    } else {
      if (value.e == true) {
        state.thisPage.unitBtn = true;
      } else {
        let temp = false;
        promo.forEach(function (row, key) {
          let promo = row["products"].filter(todo => todo.checked == true);
          if (promo.length > 0) {
            temp = true;
          }
        });
        if (temp) {
          state.thisPage.unitBtn = true;
        } else {
          state.thisPage.unitBtn = false;
        }
      }
      state.items_promo_order[mom].checked = false;
    }
    let countPromoAll = state.items_promo_order.filter(
      todo => todo.checked === true
    );
    if (countPromoAll.length > 0) {
      state.thisPage.delBtn = true;
    } else {
      state.thisPage.delBtn = false;
    }
  },
  selectItem: ({ commit, state, dispatch }, value) => {
    console.log(value)
    let items = _.cloneDeep(state.items_order);
    let info = _.cloneDeep(state.customer_info);
    let itemDemo = _.cloneDeep(state.itemDemo);
    let keepDel = [];
    /*let indexItem = _.findIndex(items, {
      item_code: value.code
    });
    */
    let percentDis = info.percent_discount == "" ? 0 : info.percent_discount;
    // console.log("value =>> ", value)
    if (value.checked) {
      if (!_.isUndefined(value.freegift)) {
        console.log("1.1 ==>")
        let ppu = value.ppu == '' || value.ppu == null ? 0 : parseFloat(value.ppu);
        let ppu2 = _.round(ppu, 2);
        itemDemo.id = value.code
        itemDemo.item_code = value.code
        itemDemo.item_name = value.title
        itemDemo.discount = "-"
        itemDemo.item_code = value.code
        itemDemo.ppu = ppu2
        itemDemo.price = 0
        itemDemo.net_price = 0
        itemDemo.order_qty = 0
        itemDemo.amount = 0
        itemDemo.last_discount = (0 / 1000) * percentDis
        itemDemo.net_amount = 0
        itemDemo.unit_type = "INNER"
        itemDemo.unit = value.unit
        itemDemo.unit_id = value.unit_id
        itemDemo.checked = false
        itemDemo.editMode = false
        itemDemo.volDiscount = 'N'
        itemDemo.flag_status = "F"
        itemDemo.ref_po_no = ""
        itemDemo.budget = 0
        //FIX PRICE -----
        itemDemo.price_policy_code = value.price_policy_code
        itemDemo.price_code = value.price_policy
        items.push(itemDemo);
      } else {
        let ppu = value.ppu == '' || value.ppu == null ? 0 : parseFloat(value.ppu);
        let rsNetPrice = ppu * (parseFloat(info.percent_discount) / 100)

        let pricePOL = value.price == '' || value.price == null ? 0 : parseFloat(value.price);
        let roundPOL = _.round(pricePOL, 2);

        // console.log("1.1 ==>", roundPOL)
        let ppu2 = _.round(ppu, 2);
          // console.log(ppu2)
        itemDemo.id = value.code
        itemDemo.item_code = value.code
        itemDemo.item_name = value.title
        itemDemo.discount = "-"
        itemDemo.item_code = value.code
        itemDemo.ppu = ppu2
        itemDemo.net_price = ppu2 - rsNetPrice
        itemDemo.order_qty = 0
        itemDemo.amount = 0
        itemDemo.last_discount = (0 / 1000) * percentDis
        itemDemo.net_amount = 0
        itemDemo.unit_type = "INNER"
        itemDemo.unit = value.unit
        itemDemo.unit_id = value.unit_id
        itemDemo.checked = false
        itemDemo.editMode = false
        itemDemo.volDiscount = 'N'
        itemDemo.flag_status = "A"
        itemDemo.ref_po_no = ""
        itemDemo.budget = 0
        //FIX PRICE -----
        itemDemo.price = roundPOL
        itemDemo.ref_price = roundPOL
        itemDemo.price_policy_code = value.price_policy_code
        itemDemo.price_code = value.price_policy
        items.push(itemDemo);
      }
    } else {
      if (!_.isUndefined(value.freegift)) {
        // console.log("2.1 ==>")
        _.remove(items, function (o) {
          if (o.item_code == value.code) {
            keepDel.push(o)
          }
          return o.item_code == value.code && parseFloat(o.price) == 0;
        });
      } else {
        // console.log("2.2 ==>")
        var step1 = _.filter(items, o => {
          if (o.item_code == value.code) {
            return true;
          }
        });
        if (step1.length == 1) {
          if (step1[0].ref_po_no.length > 2 && !_.isUndefined(step1[0].ref_po_no)) {
            // console.log("2.22")
          } else {
            // console.log("2.222")
            _.remove(items, function (o) {
              if (o.item_code == value.code) {
                keepDel.push(o)
              }
              return (o.item_code == value.code && parseFloat(o.price) > 0) ||
                (o.item_code == value.code && parseFloat(o.ppu) == 0);
            });
          }

        } else if (step1.length > 1) {
          // console.log("2.222222")
          _.remove(items, function (o) {
            if (o.item_code == value.code) {
              keepDel.push(o)
            }
            return (o.item_code == value.code && parseFloat(o.price) > 0)
          });
        }
      }
    }
    var chexkBkMode = _.filter(items, item => {
      if (item.ref_po_no.length > 2 && !_.isUndefined(item.ref_po_no)) {
        return true;
      }
    });

    if (chexkBkMode.length == 0) {
      commit('setBkMode', 'OD')
      dispatch('setLocalStore', { feild: 'bkMode', data: 'OD' })
      dispatch('setSession', { feild: 'bkMode', data: 'OD' })

    }
    commit("setItems", items);
    keepDel.forEach(function (row, key) {
      if (!_.isUndefined(row.group)) {
        let tempVD = row.group
        let type = 'selectItem'
        dispatch('checkRange', { tempVD, row, type })
      }
    });
    // console.log(items)
    dispatch('setLocalStore', { feild: 'items_order', data: items })
    dispatch('setSession', { feild: 'items_order', data: items })
    dispatch("sumTotalTable");
  },
  dupFreeitem: ({ commit, state, dispatch }) => {
    let items = _.cloneDeep(state.items_order);
    let info = _.cloneDeep(state.customer_info);
    let countTrue = items.filter(todo => todo.checked === true);
    let temp = [];
    if (state.thisPage.headChk) {
      state.thisPage.headChk = false;
    }
    items.forEach(function (row, key) {
      if (row.checked ) {
        // console.log(row)
        // row.flag_status != 'P'
        if (row.flag_status != 'F' && row.flag_status != 'FV'  && parseFloat(row.ppu) > 0) {


          let step1 = countTrue.filter(todo => todo.item_code === row.item_code);
          let step11 = items.filter(todo => todo.item_code === row.item_code);
          // console.log(step1 )
          // console.log('-----')
          // console.log(step11)
          if (step1.length == 1 && step11.length == 1) {
            // console.log("3 >>" ,row)
            temp.push(row);
            let rs = _.cloneDeep(row);
            let ppu = row.ppu == '' || row.ppu == null ? 0 : parseFloat(row.ppu);

            let rsNetPrice = parseFloat(rs.price) * (parseFloat(info.percent_discount) / 100)
            rs.id = rs.id + "-" + rs.id;
            rs.order_qty = 1;
            // console.log('1402')
            rs.priceMaster = parseFloat(rs.price);
            rs.price = 0;
            rs.net_price = parseFloat(rs.price) == 0 ? 0 : parseFloat(rs.price) - rsNetPrice;
            rs.last_discount = 0;
            rs.amount = 0;
            rs.net_amount = 0;
            rs.bk_status = ''
            rs.ref_po_no = ''
            rs.ref_price = ppu
            // rs.priceVD = 0;
            if (_.isNumber(row.priceVD)) {
              rs.priceVD = row.priceVD
              rs.flag_status = "FV";
            } else {
              rs.priceVD = 0
              rs.flag_status = "F";
            }
            rs.volDiscount = 'N';

            let price = parseFloat(rs.price)
            let dif = (parseFloat(info.percent_discount) / 100)
            let step_5 = 0
            if (_.toUpper(info.price_policy_code) == "FIX" || _.toUpper(info.price_policy_code) == "FLEX") {
              // console.log('1426')
              let step_2 = parseFloat(rs.priceMaster) * parseFloat(rs.order_qty)
              let step_45 = _.round(step_2, 4);
              step_5 = step_45
            } else {
              if (row.volDiscount == 'Y') {
                let step_2 = parseFloat(rs.priceVD) * parseFloat(rs.order_qty)
                let step_45 = _.round(step_2, 4);
                step_5 = step_45
              } else {
                let step_3 = price - (price * dif)
                let step_4 = parseFloat(rs.ppu) - step_3
                let step_45 = _.round(step_4, 4);
                step_5 = step_45 * parseInt(rs.order_qty)

              }
            }

            let rsstep_5 = _.round(step_5, 2);
            rs.budget = rsstep_5
          // console.log(rs)

      

            temp.push(rs);
          } else {
            let step2 = step1.filter(todo => todo.flag_status != 'F' && todo.flag_status != 'FV' && todo.flag_status != 'P');
            // console.log("4 >>", step2)
            if (step2.length > 0) {
              temp.push(step2[0]);
            }
          }
        } else {
          // console.log("5 >>")
          temp.push(row);
        }
      } else {
        console.log("6 >>",row)
        temp.push(row);
      }
    });
    commit("setItems", temp);
    dispatch('setLocalStore', { feild: 'items_order', data: temp })
    dispatch('setSession', { feild: 'items_order', data: temp })

    dispatch("sumTotalTable");
  },
  selectCG: ({ commit, state, dispatch }, value) => {
    // console.log(value)
    let items = _.cloneDeep(state.items_order);
    let info = _.cloneDeep(state.customer_info);
    let keepDel = []

    value.items.forEach(function (row, key) {
      if (value.checked) {
        if (!_.isUndefined(row.freegift)) {
          let ppu = row.ppu == '' || row.ppu == null ? 0 : parseFloat(row.ppu);
          let round2 = _.round(ppu, 2);
          let rsNetPrice = round2 * (parseFloat(info.percent_discount) / 100)
          let pricePOL = row.price == '' || row.price == null ? 0 : parseFloat(row.price);
          let roundPOL = _.round(pricePOL, 2);
          let itemDemo = _.cloneDeep(state.itemDemo);
          itemDemo.id = row.code
          itemDemo.item_code = row.code
          itemDemo.item_name = row.title
          itemDemo.discount = "-"
          itemDemo.ppu = round2
          itemDemo.price = 0
          itemDemo.net_price = 0
          itemDemo.order_qty = typeof row.order_qty != "undefined" ? row.order_qty : 0
          itemDemo.last_discount = 0
          itemDemo.net_amount = 0
          itemDemo.amount = 0
          itemDemo.unit_type = "INNER"
          itemDemo.unit = row.unit
          itemDemo.unit_id = row.unit_id
          itemDemo.checked = false
          itemDemo.editMode = false
          itemDemo.volDiscount = 'N'
          itemDemo.flag_status = "F"
          itemDemo.ref_po_no = ""
          itemDemo.budget = 0
          itemDemo.priceVD = 0
          itemDemo.priceMaster = ppu
          itemDemo.ref_price = ppu
          itemDemo.price = 0
          //FIX PRICE -----
          itemDemo.price_policy_code = row.price_policy_code
          itemDemo.price_code = row.price_policy
          
          // console.log('itemDemo 1  =>' , itemDemo)
          items.push(itemDemo);
          // console.log("1 ==>")
        } else {
          var step1 = _.filter(items, o => {
            if (o.item_code == row.code) {
              return true;
            }
          });
          // console.log("2 ==>")
          if (step1.length == 0 || (step1.length > 0 && (step1[0].flag_status == 'F' || step1[0].flag_status == 'FV'))) {
            let ppu = row.ppu == '' || row.ppu == null ? 0 : parseFloat(row.ppu);
            let round2 = _.round(ppu, 2);
            let pricePOL = row.price == '' || row.price == null ? 0 : parseFloat(row.price);
            let roundPOL = _.round(pricePOL, 2);
            let rsNetPrice = round2 * (parseFloat(info.percent_discount) / 100)
            let itemDemo = _.cloneDeep(state.itemDemo);
            itemDemo.id = row.code
            itemDemo.item_code = row.code
            itemDemo.item_name = row.title
            itemDemo.discount = "-"
            itemDemo.ppu = round2
            itemDemo.net_price = round2 - rsNetPrice
            itemDemo.order_qty = typeof row.order_qty != "undefined" ? row.order_qty : 0
            itemDemo.last_discount = 0
            itemDemo.net_amount = 0
            itemDemo.amount = 0
            itemDemo.unit_type = "INNER"
            itemDemo.unit = row.unit
            itemDemo.unit_id = row.unit_id
            itemDemo.checked = false
            itemDemo.editMode = false
            itemDemo.volDiscount = 'N'
            itemDemo.flag_status = "A"
            itemDemo.ref_po_no = ""
            itemDemo.ref_price = roundPOL
            itemDemo.budget = 0
            itemDemo.priceVD = 0
            // itemDemo.priceMaster = ppu
            //FIX PRICE -----
            itemDemo.price = roundPOL
            itemDemo.price_policy_code = row.price_policy_code
            itemDemo.price_code = row.price_policy
            items.push(itemDemo);

            // console.log('itemDemo 2  =>' , itemDemo)
          }
        }
      } else {
        if (!_.isUndefined(row.freegift)) {
          _.remove(items, function (o) {
            if (o.item_code == row.code) {
              keepDel.push(o)
            }
            return o.item_code == row.code && parseFloat(o.price) == 0;
          });
          // console.log("3 ==>")
        } else {
          var step1 = _.filter(items, o => {
            if (o.item_code == row.code) {
              return true;
            }
          });
          if (step1.length == 1) {
            if (step1[0].ref_po_no.length > 2 && !_.isUndefined(step1[0].ref_po_no)) {
              // console.log("3.33")
            } else {
              // console.log("3.3333")
              _.remove(items, function (o) {
                /*
                if (o.item_code == row.code) {
                  keepDel.push(o)
                }
                */
                return (o.item_code == row.code && parseFloat(o.price) > 0) ||
                  (o.item_code == row.code && parseFloat(o.ppu) == 0);
              });
            }
          } else if (step1.length > 1) {
            _.remove(items, function (o) {
              if (o.item_code == row.code && o.flag_status != 'F' && o.flag_status != 'FV') {
                keepDel.push(o)
              }
              return (o.item_code == row.code && parseFloat(o.price) > 0)
            });
            // console.log("4 ==>")
          }
        }
      }
    });
    var chexkBkMode = _.filter(items, item => {
      if (item.ref_po_no.length > 2 && !_.isUndefined(item.ref_po_no)) {
        return true;
      }
    });

    if (chexkBkMode.length == 0) {
      commit('setBkMode', 'OD')
      dispatch('setLocalStore', { feild: 'bkMode', data: 'OD' })
      dispatch('setSession', { feild: 'bkMode', data: 'OD' })
    }

    //ดูตรงนี้ต่อ
    commit("setItems", items);
    dispatch('setLocalStore', { feild: 'items_order', data: items })
    dispatch('setSession', { feild: 'items_order', data: items })

    dispatch("sumTotalTable");

    if (!value.checked) {
      keepDel.forEach(function (row, key) {
        if (!_.isUndefined(row.group)) {
          let tempVD = row.group
          let type = 'selectCG'
          dispatch('checkRange', { tempVD, row, type })
        }
      });
    }
  },
  editOrderFromReject: ({ commit, state, dispatch }) => {
    let rs = {
      h_id: state.customer_info.id,
      document_no: state.customer_info.doc_no,
      apv_approver_id: Vue.localStorage.get("emp_id"),
      apv_send_approver: state.flow.approve.emp_id,
      apv_status: 'DRF'
    }
    if(!_.isNull(Vue.localStorage.get('PO_SUCCESS'))){
      // console.log('Edit =>', state.customer_info.id)
      let theArray_ = JSON.parse(Vue.localStorage.get('PO_SUCCESS'))
      // const getFruit = theArray_.find(theArray_ => theArray_.id == info.h_id);

      for(var i = 0; i < theArray_.length; i++) {
        if(theArray_[i].id == state.customer_info.id) {
            theArray_.splice(i, 1);
            break;
        }
      }
      Vue.localStorage.set('PO_SUCCESS', JSON.stringify(theArray_))
    }
    // console.log(state.customer_info.id)
    commit("SET_SPINNER_ORDER", true);
    ordService
      .editOrderFromReject(rs)
      .then(response => {
        state.customer_info.order_status = 'DRF';
        dispatch('setLocalStore', { feild: 'customer_info', data: state.customer_info })
        // console.log('1')
        dispatch('setSession', { feild: 'customer_info', data: state.customer_info })
        state.spinner_order = true;
        let items = _.cloneDeep(state.items_order)
        var itemNobk = _.filter(items, item => {
          if (item.flag_status != "A" &&
            item.flag_status != "F" &&
            item.flag_status != "FV" &&
            item.flag_status != "CP" &&
            (!_.isUndefined(item.ref_po_no) || !_.isNull(item.ref_po_no)) &&
            _.trim(item.ref_po_no).length < 2) {
            return true;
          }
        });
        let prod_code = _.map(itemNobk, "item_code");
        // FIX PRICE---------------
        if (
          (_.toUpper(state.customer_info.price_policy_code) == "AUTO" &&
            _.toUpper(state.customer_info.customer_channel_code) == "100") ||
          _.toUpper(state.customer_info.price_policy_code) == "FLEX"
        ) {
          // console.log("price_policy => 1")
          let priceForVd =
            _.toUpper(state.customer_info.price_policy_code) == "AUTO"
              ? state.customer_info.pricetype_code
              : state.customer_info.pricefix_code;

          ordService
            .getVolumeDis(prod_code, priceForVd)
            .then(result => {
              state.spinner_order = false;
              result.forEach(function (group) {
                group['details'].forEach(function (record) {
                  let index = _.findIndex(items, function (o) { return o.item_code == record.item_code; });
                  if (!_.isUndefined(items[index])) {
                    items[index]['group'] = [group]
                  }
                });
              });
            })
            .catch();
        }
        commit("setItems", items);
        commit("SET_SPINNER_ORDER", false);
        dispatch("getOrderBySales", {
          year: state.date_selected.year,
          month: state.date_selected.month,
          po: state.filter_po,
          saleman:
            state.filter_salesman == "" ? "" : state.filter_salesman.code,
          customer:
            state.filter_customer == "" ? "" : state.filter_customer.code
        });
      })
      .catch();
  },
  editPromoById: ({ commit, state, dispatch }, values) => {
    // console.log("editPromoById => ")
    let info = _.cloneDeep(state.customer_info);
    if (state.product_cg.length == 0) {
      dispatch("getPromoCG", {
        customer_code: info.customer_code,
        group: "all"
      });
    }

    state.textBtnPromo = "UPDATE";
    let bigData = _.cloneDeep(state.bigData);

    var checkCal = _.filter(state.promo_seleceted_temp, item => {
      if (item.order_qty > 0) {
        return true;
      }
    });
    if (checkCal.length > 0) {
      state.thisPagePM.calculate('no-noti');
    }

    let bigPromoset = _.cloneDeep(state.bigPromoset);
    let keyBig = _.find(bigData, {
      promo_code: values.promo_code
    });
    let index = _.findIndex(bigPromoset, {
      promo_code: values.promo_code
    });

    let rs = _.cloneDeep(values);
    rs.promo_code = values.promo_code;
    rs.last_promoset_id = "";
    rs.group = "";
    rs.cg = "";
    rs.keyword = "";
    rs.start = 0;
    rs.cust_code = info.customer_code;
    commit("selectedFreegift", []);
    if (typeof keyBig != "undefined") {
      // console.log("====>")
      rs.doc_no = keyBig.doc_no;

      commit("selectedFreegift", keyBig.freeitems);
      let prod = keyBig["products"].filter(todo => todo.order_qty > 0);
      prod.forEach(function (row, key) {
        let indexP = _.findIndex(keyBig["products"], {
          item_code: row.item_code
        });
        if (indexP >= 0) {
          // console.log("row >> " , row)
          keyBig["products"][indexP].net_price = row.price
          let amount = parseFloat(row.price) * parseInt(row.order_qty);
          let amount2 = _.round(amount, 2);

          keyBig["products"][indexP].amount = amount2
          keyBig["products"][indexP].net_amount = amount2
        }
      });
      commit("selectedPromoTemp", keyBig.products);
      // ตรงนี้จ้า
      let tempDush = []
      let endLoop = keyBig.products.length > 50 ? 50 : keyBig.products.length
      for (let i = 0; i < endLoop; i++) {
        tempDush.push(keyBig.products[i]);
      }
      commit("selectedPromo", tempDush);
      // commit("selectedPromo", keyBig.products);
      state.totalPromo.netPrice = keyBig.netPrice;
      state.totalPromo.orderQty = keyBig.orderQty;
      state.totalPromo.netAmount = keyBig.netAmount;
      state.totalPromo.countItem = keyBig.countItem;
      state.totalPromo.percentDiscPM = keyBig.discount;
      if (index >= 0) {
        let temp = _.cloneDeep(bigPromoset[index]);
        bigPromoset[index] = bigPromoset[0];
        bigPromoset[0] = temp;
        commit("setPromotionSet", bigPromoset);
        commit("selectedPromoSet", temp);
      } else {
        commit("setSpinnerPromo", true)
        ordService
          .getPromotionSet(rs)
          .then(response => {
            if (response.length > 0) {
              var checkPro = _.find(response, item => {
                if (item.promo_code == values.promo_code) {
                  return true;
                }
              });
              if (typeof checkPro != "undefined") {
                commit("selectedPromoSet", checkPro);
                commit("setPromotionSet", response);
              }
            } else {
              commit("setPromotionSet", []);
            }
          })
          .catch(error => console.error("error => editPromoById"));
      }
      commit("setSpinnerPromo", false)
    } else {
      // console.log("2 >>> ")
      commit("setSpinnerPromo", true)
      let info = _.cloneDeep(state.customer_info);
      rs.doc_no = info.doc_no;
      ordService
        .getPromotionSet(rs)
        .then(response => {
          if (response.length > 0) {
            commit("setPromotionSet", response);
            var checkPro = _.find(response, item => {
              if (item.promo_code == values.promo_code) {
                return true;
              }
            });
            if (typeof checkPro != "undefined") {
              commit("selectedPromoSet", checkPro);
              commit("setSpinnerPromo", true)
              dispatch("getProductsById", checkPro);
            }
          } else {
            commit("setPromotionSet", []);
          }
          commit("setSpinnerPromo", false)
        })
        .catch();
      if (state.product_cg.length == 0) {

      }
    }
  },
  getPromoCG: ({ state }, values) => {
    ordService
      .getPromoCG(values.customer_code, values.group)
      .then(response => {
        state.product_cg = response.cg;
        state.product_group = response.group;
      })
      .catch();

  },
  scrollPage: ({ commit, state, dispatch }) => {
    let data = state.promo_seleceted_temp;
    let start = state.promo_seleceted.length;
    let end = state.promo_seleceted.length + 10;
    for (let i = start; i < end; i++) {
      if (typeof data[i] != "undefined") {
        state.promo_seleceted.push(data[i])
      }
    }
  },
  keywordProdFil: ({ commit, state, dispatch }, value) => {
    let keyword = _.trim(value)
    let data = state.promo_seleceted_temp;
    if (keyword.length == 0) {
      let tempDush = []
      let endLoop = data.length > 50 ? 50 : data.length
      for (let i = 0; i < endLoop; i++) {
        tempDush.push(data[i]);
      }
      commit("selectedPromo", tempDush);
    } else if (keyword.length > 2) {
      let tempDush = []
      _.forEach(data, function (row, key) {
        let str = row.item_code + row.item_name;
        if (str.toUpperCase().indexOf(keyword.toUpperCase()) !== -1) {
          tempDush.push(row);
        }
      });
      commit("selectedPromo", tempDush);
    }
  },
  getProductsById: ({ commit, state, dispatch }, values) => {
    let value = "";
    if (values == null) {
      value = state.promo_set_seleceted;
    } else {
      value = values;
    }
    // commit("setSpinnerPromo", true)
    let keyBig = _.find(state.bigData, {
      promo_code: value.promo_code
    });
    commit("selectedPromoSet", value);
    if (typeof keyBig != "undefined") {
      state.textBtnPromo = "UPDATE";
      commit("selectedFreegift", keyBig.freeitems);
      commit("selectedPromoTemp", keyBig.products);

      let tempDush = []
      let endLoop = keyBig.products.length > 50 ? 50 : keyBig.products.length
      for (let i = 0; i < endLoop; i++) {
        tempDush.push(keyBig.products[i]);
      }
      let discPromo = keyBig["products"].filter(todo => parseFloat(todo.discount) > 0);
      if (discPromo.length > 0) {
        commit("setPercentDiscPM", discPromo[0].discount);
      }
      commit("selectedPromo", tempDush);

      state.totalPromo.countItem = keyBig.countItem;
      state.totalPromo.netPrice = keyBig.netPrice;
      state.totalPromo.orderQty = keyBig.orderQty;
      state.totalPromo.netAmount = keyBig.netAmount;
      state.totalPromo.percentDiscPM = keyBig.discount;
      commit("setSpinnerPromo", false)
      commit("SET_CHECKBTN_ADD", false);
    } else {
      if (value["sets"].length > 0) {
        // console.log("3===>")
        let defaultPrice = value.sets[0].default_price;
        let code = value.promo_code;
        commit("setKeepSets", value["sets"][0]);
        ordService
          .getProductsById(code, defaultPrice)
          .then(response => {
            commit("SET_CHECKBTN_ADD", false);
            let data = response.products;
            let items = _.cloneDeep(state.items_promo_order);
            if (value.sets[0].conditions.length == 0) {
              // console.log("3.1===>")
              let info = _.cloneDeep(state.customer_info);
              let obj = {
                name: "NOCONDITION",
                default_price: info.pricetype_code
              };
              commit("setKeepSets", obj);
              if (data.length > 0 && items.length > 0) {
                // console.log("3.2===>")
                let indexP = _.findIndex(items, {
                  promo_code: code
                });
                if (indexP >= 0) {
                  let keyItems = items[indexP].products;
                  keyItems.forEach(function (row, key) {
                    let idx = _.findIndex(data, {
                      item_code: row.item_code,
                      unit_id: row.unit_id
                    });
                    if (idx >= 0) {
                      let amount =
                        parseInt(row.order_qty) * parseFloat(row.net_price);
                      let amount2 = _.round(amount, 2);

                      data[idx].order_qty = parseInt(row.order_qty);
                      data[idx].discount = '-';
                      data[idx].amount = amount2;
                      data[idx].net_amount = amount2;

                      let ppu2 = _.round(row.ppu, 2);

                      data[idx].ppu = ppu2;
                      data[idx].net_price = row.price;
                      data[idx].price = row.price;
                    }
                  });
                  let tempDush = []
                  let endLoop = data.length > 50 ? 50 : data.length
                  for (let i = 0; i < endLoop; i++) {
                    tempDush.push(data[i]);
                  }
                  commit("selectedPromoTemp", data);
                  commit("selectedPromo", tempDush);
                  commit("setSpinnerPromo", false)
                  commit("selectedFreegift", []);
                  // console.log("4===>")
                } else {
                  commit("selectedPromoTemp", data);
                  let tempDush = []
                  let endLoop = data.length > 50 ? 50 : data.length
                  for (let i = 0; i < endLoop; i++) {
                    tempDush.push(data[i]);
                  }
                  commit("selectedPromo", tempDush);
                  commit("setSpinnerPromo", false)
                  commit("selectedFreegift", []);
                  // console.log("4.1===>")
                }
              } else {
                // console.log("5===>")
                let tempDush = []
                _.forEach(data, function (value, key) {
                  let pr2 = _.round(value.ppu, 2);
                  value.ppu = pr2

                  let net_price2 = _.round(value.net_price, 2);
                  value.net_price = net_price2

                  let netprice_old2 = _.round(value.netprice_old, 2);
                  value.netprice_old = netprice_old2

                  if (key < 50) {
                    tempDush.push(value)
                  }
                });
                commit("selectedPromoTemp", data);
                commit("selectedPromo", tempDush);
                commit("setSpinnerPromo", false)
                commit("selectedFreegift", []);
              }
            } else {
              // console.log("6===>")
              let promotions = value.sets[0]["promotions"];
              var rsfreeg = _.find(promotions, {
                type: "Free item"
              });
              let rsfreegVal = [];
              if (typeof rsfreeg != "undefined") {
                rsfreeg["value"].forEach(function (row, key) {
                  row.order_qty = 0;
                  row.error_stock = true;
                });
                rsfreegVal = rsfreeg["value"];
              }
              if (data.length > 0 && items.length > 0) {
                let indexP = _.findIndex(items, {
                  promo_code: code
                });

                if (indexP >= 0) {
                  let keyItems = items[indexP].products;
                  let sets = ''
                  if (keyItems.length > 0) {
                    sets = keyItems[0].promo_sets_name;
                  }

                  var findSets = _.find(value.sets, item => {
                    if (item.name == sets) {
                      return true;
                    }
                  });
                  state.textBtnPromo = "UPDATE";

                  if (typeof findSets != "undefined") {
                    commit("setKeepSets", findSets);
                    // -- FREE GIFT------
                    var freeg = _.find(findSets["promotions"], {
                      type: "Free item"
                    });
                    let keepFGCode = _.cloneDeep(items[indexP].freeitems);
                    let rsFG = []
                    if (typeof freeg != "undefined") {
                      freeg["value"].forEach(function (row, key) {
                        let idx = _.findIndex(keepFGCode, {
                          item_code: row.item_code
                        });
                        let master = 0;
                        if (findSets["conditions"][0].type == "QTY") {
                          master = parseInt(items[indexP].order_qty);
                        } else if (findSets["conditions"][0].type == "Value") {
                          master = items[indexP].amount;
                        }
                        let money = row.ratio[0];
                        let freeg = row.ratio[1];
                        if (
                          !isNaN(parseFloat(money)) &&
                          !isNaN(parseFloat(freeg))
                        ) {
                          row.qty = parseInt((master / money) * freeg);
                          row.order_qty = parseInt((master / money) * freeg);
                        }
                        if (keepFGCode.length > 0 && idx >= 0) {
                          row.order_qty = parseInt(keepFGCode[idx].order_qty);
                          row.net_amount = keepFGCode[idx].amount;
                          row.ppu = keepFGCode[idx].ppu;
                          row.amount = keepFGCode[idx].amount;
                          //20201208
                          row.promo_name = keepFGCode[idx].promo_name;
                        }
                        row.error_stock = true;
                        rsFG.push(_.cloneDeep(row))
                      });
                      commit("selectedFreegift", rsFG);
                    } else {
                      commit("selectedFreegift", []);
                    }
                    // -- DISCOUNT------
                    var discount = _.find(findSets["promotions"], {
                      type: "Discount"
                    });
                    var netP = _.find(findSets["promotions"], {
                      type: "Net Price"
                    });
                    let spin = 0;
                    if (
                      typeof discount != "undefined" &&
                      typeof netP == "undefined"
                    ) {
                      keyItems.forEach(function (row, key) {
                        let idx = _.findIndex(data, {
                          item_code: row.item_code,
                          unit_id: row.unit_id
                        });
                        spin = key;
                        if (idx >= 0) {
                          data[idx].order_qty = parseInt(row.order_qty);
                          data[idx].discount = discount["value"];
                          data[idx].net_price = row.price;
                          data[idx].net_amount = row.amount;
                        }
                      });
                      let tempDush = []
                      let endLoop = data.length > 50 ? 50 : data.length
                      for (let i = 0; i < endLoop; i++) {
                        tempDush.push(data[i]);
                      }
                      // console.log("6.3===>")
                      commit("setPercentDiscPM", discount["value"]);
                      commit("selectedPromoTemp", data);
                      commit("selectedPromo", tempDush);
                      commit("selectedFreegift", rsfreegVal);
                      dispatch("sumPromoTable");
                      if (spin == keyItems.length - 1) {
                        commit("setSpinnerPromo", false)
                      }
                    } else if (
                      typeof discount != "undefined" &&
                      typeof netP != "undefined"
                    ) {
                      let spin = 0;
                      let tempDush = []
                      data.forEach(function (row, key) {
                        let idx = _.findIndex(keyItems, {
                          item_code: row.item_code,
                          unit_id: row.unit_id
                        });
                        spin = key;
                        if (idx >= 0) {
                          row.net_price = keyItems[idx].net_price;
                          row.price = keyItems[idx].net_price;
                          row.order_qty = parseInt(keyItems[idx].order_qty);
                          row.net_amount = keyItems[idx].amount;
                          row.ppu = keyItems[idx].ppu;
                          let allamount =
                            parseFloat(keyItems[idx].order_qty) *
                            parseFloat(keyItems[idx].net_price);
                          row.amount = _.round(allamount, 2);
                          row.discount = row.discount;
                        } else {
                          let pr2 = _.round(netP["value"], 2);

                          row.net_price = pr2;
                        }
                        if (key < 50) {
                          tempDush.push(row)
                        }
                      });
                      // console.log("6.5===>")
                      commit("selectedPromoTemp", data);
                      commit("selectedPromo", tempDush);
                      commit("selectedFreegift", rsfreegVal);
                      dispatch("sumPromoTable");
                      if (spin == data.length - 1) {
                        commit("setSpinnerPromo", false)
                      }
                    } else {
                      let spin = 0;
                      let tempDush = []
                      data.forEach(function (row, key) {
                        let idx = _.findIndex(keyItems, {
                          item_code: row.item_code,
                          unit_id: row.unit_id
                        });
                        spin = key;
                        if (idx >= 0) {
                          let pricer2 = _.round(keyItems[idx].price, 2);
                          row.net_price = pricer2;
                          row.netprice_old = pricer2;
                          let net_price2 = _.round(keyItems[idx].net_price, 2);

                          row.price = net_price2;
                          row.order_qty = parseInt(keyItems[idx].order_qty);
                          row.net_amount = keyItems[idx].amount;
                          row.ppu = keyItems[idx].ppu;

                          let allA = parseFloat(keyItems[idx].order_qty) *
                            parseFloat(keyItems[idx].net_price);
                          let pr2 = _.round(allA, 2);

                          row.amount = pr2
                          row.discount = row.discount;
                        }
                        if (key < 50) {
                          tempDush.push(row)
                        }
                      });
                      commit("selectedPromoTemp", data);
                      commit("selectedPromo", tempDush);
                      commit("setPercentDiscPM", 0);
                      commit("selectedFreegift", rsfreegVal);
                      dispatch("sumPromoTable");
                      if (spin == data.length - 1) {
                        commit("setSpinnerPromo", false)
                        // console.log("7===>")
                      }
                    }
                  } else {
                    // console.log("8===>")
                    state.textBtnPromo = "ADD TO ORDER";
                    commit("selectedPromoTemp", data);
                    let tempDush = []
                    let endLoop = data.length > 50 ? 50 : data.length
                    for (let i = 0; i < endLoop; i++) {
                      tempDush.push(data[i]);
                    }
                    commit("selectedPromo", tempDush);
                    commit("selectedFreegift", rsfreegVal);
                    dispatch("sumPromoTable");
                    commit("setSpinnerPromo", false)
                  }
                } else {
                  // console.log("9===>")
                  state.textBtnPromo = "ADD TO ORDER";
                  let tempDush = []
                  _.forEach(data, function (value, key) {
                    let pr2 = _.round(value.ppu, 2);
                    value.ppu = pr2

                    let net_price2 = _.round(value.net_price, 2);
                    value.net_price = net_price2

                    let netprice_old2 = _.round(value.netprice_old, 2);
                    value.netprice_old = netprice_old2
                    if (key < 50) {
                      tempDush.push(value)
                    }
                  });
                  commit("selectedPromoTemp", data);
                  commit("selectedPromo", tempDush);
                  commit("selectedFreegift", rsfreegVal);
                  dispatch("sumPromoTable");
                  commit("setSpinnerPromo", false)
                }
              } else {
                // console.log("10===>")
                state.textBtnPromo = "ADD TO ORDER";
                let tempDush = []
                _.forEach(data, function (value, key) {
                  let pr2 = _.round(value.ppu, 2);
                  value.ppu = pr2

                  let net_price2 = _.round(value.net_price, 2);
                  value.net_price = net_price2

                  let netprice_old2 = _.round(value.netprice_old, 2);
                  value.netprice_old = netprice_old2
                  if (key < 50) {
                    tempDush.push(value)
                  }
                });
                commit("selectedPromoTemp", data);
                commit("selectedPromo", tempDush);

                commit("selectedFreegift", rsfreegVal);
                dispatch("sumPromoTable");
                commit("setSpinnerPromo", false)
              }
            }
            var checkCal = _.filter(state.promo_seleceted_temp, item => {
              if (item.order_qty > 0) {
                return true;
              }
            });
            if (checkCal.length > 0) {
              state.thisPagePM.calculate('no-noti');
            }
          })
          .catch();
      } else {
        // console.log("11===>")
        commit("selectedPromoTemp", []);
        commit("selectedPromo", []);
        commit("selectedFreegift", []);
        dispatch("sumPromoTable");
        commit("setSpinnerPromo", false)
      }
    }
  },
  getPromotionSet: ({ commit, state, dispatch }, values) => {
    let rs = _.cloneDeep(values);
    let proset = _.cloneDeep(state.promo_set_list);
    let info = _.cloneDeep(state.customer_info);
    let last_promoset_id = "";
    if (state.spinner_promo == false) {
      if (values.mode == "scroll") {
        //CHECK SCROLL
        last_promoset_id =
          proset.length > 0 ? proset[proset.length - 1].promo_code : "";
      }

      rs.promo_code = "";
      rs.doc_no = info.doc_no;
      rs.cust_code = info.customer_code;
      rs.last_promoset_id = last_promoset_id;
      commit("setSpinnerPromo", true)
      if (values.mode != "scroll") {
        commit("selectedPromoTemp", []);
        commit("selectedPromo", []);
        commit("setPromotionSet", []);
        commit("selectedFreegift", []);
        proset = [];
      }
      if (values.mode == "search") {
        commit("selectedPromoSet", []);
      }
      rs.start = proset.length;
      ordService
        .getPromotionSet(rs)
        .then(response => {
          if (values.mode == "scroll" && response.length > 0) {
            response.forEach(function (row, key) {
              var checkCal = _.filter(proset, item => {
                if (item.promo_code == row.promo_code) {
                  return true;
                }
              });
              // console.log(row.promo_code)
              if (checkCal.length == 0) {
                // console.log(row.promo_code)
                // console.log(row)
                // console.log("-----------------------------")
                proset.push(row);
              }
            });
            commit("setPromotionSet", proset);
          } else if (values.mode != "scroll") {
            response.forEach(function (row, key) {
              var checkCal = _.filter(proset, item => {
                if (item.promo_code == row.promo_code) {
                  return true;
                }
              });
              if (checkCal.length == 0) {
                proset.push(row);
              }
            });
            commit("setPromotionSet", proset);
          }
          commit("setSpinnerPromo", false)
          if (state.bigPromoset.length == 0) {
            state.bigPromoset = response;
          }
        })
        .catch();
    }
  },
  showPromotion: ({ commit, state, dispatch }, values) => {
    commit("selectedPromoTemp", []);
    commit("selectedPromo", []);
    commit("selectedFreegift", []);
    commit("selectedPromoSet", []);
    if (state.promo_mode == "add") {
      state.textBtnPromo = "ADD TO ORDER"
      // dispatch("getPromotionSet", {
      //   group: "",
      //   cg: "",
      //   keyword: "",
      //   mode: "dp"
      // });
      let info = _.cloneDeep(state.customer_info);
      if (state.product_cg.length == 0) {
        dispatch("getPromoCG", {
          customer_code: info.customer_code,
          group: "all"
        });
      }
    } else {
      dispatch("getPromotionSet", {
        group: "",
        cg: "",
        keyword: ""
      });
    }
  },
  getOrderChiefsales: ({ commit, state, dispatch }, values) => {
    state.chiefsalesLoding = true
    if (Vue.localStorage.get("department") != "BU") {
      state.chiefsales = [];
      ordService
        .getChiefsales(Vue.localStorage.get("emp_id"))
        .then(response => {
          state.chiefsalesLoding = false
          commit("setChiefsales", response);
        })
        .catch();
    } else {
      state.chiefsalesLoding = false
      state.chiefsales = [];
    }
    dispatch('setLocalStore', { feild: 'chiefsales', data: state.chiefsales })
    dispatch('setSession', { feild: 'chiefsales', data: state.chiefsales })

  },
  submitOrder: ({ commit, state, dispatch }, values) => {
    console.log("🚀 ~ file: myorders.js:2382 ~ values:", values)
    let apv_status = "";
    let chief_saleman = "";
    let emp_id = "";
    let info = _.cloneDeep(state.customer_info);
    let nowTime = moment(new Date()).format("HH:mm:ss");
    if (values == "submitOrder") {
      let dep = Vue.localStorage.get("department");
      if (dep == "SM") {
        if (state.chiefsales.length > 0) {
          chief_saleman = state.chiefsales[0].emp_id;
        } else {
          chief_saleman = "";
        }
      } else {
        if (state.chiefsales.length > 0) {
          chief_saleman = state.chiefsales[0].emp_id;
        } else {
          chief_saleman = info.user_create;
        }
        /*
        OPL CS
        if (info.user_create.trim() == info.salesman_code.trim()) {
          if (state.chiefsales.length > 0) {
            chief_saleman = state.chiefsales[0].emp_id;
          } else {
            chief_saleman = "";
          }
        } else {
          chief_saleman = info.user_create;
        }
        */
      }
      // console.log(state.chiefsales)
      if (chief_saleman == "") {
        apv_status = "DRF";
      } else {
        apv_status = "WFA";
      }

      // exit();
      emp_id = info.salesman_code;

    } else if (values == "submitOrderAuto") {
      apv_status = "SAPV";
      chief_saleman = "999999";
      emp_id = info.salesman_code;

    } else if (values == "recallOrder") {
      if(!_.isNull(Vue.localStorage.get('PO_SUCCESS'))){
      // console.log('rec =>', info.h_id)
      let theArray_ = JSON.parse(Vue.localStorage.get('PO_SUCCESS'))
      // const getFruit = theArray_.find(theArray_ => theArray_.id == info.h_id);

      for(var i = 0; i < theArray_.length; i++) {
        if(theArray_[i].id == info.h_id) {
            theArray_.splice(i, 1);
            break;
        }
    }
      // console.log(theArray_)
      Vue.localStorage.set('PO_SUCCESS', JSON.stringify(theArray_))
      }
      if (state.chiefsales.length > 0) {
        chief_saleman = state.chiefsales[0].emp_id;
      } else {
        chief_saleman = "";
      }
      emp_id = info.salesman_code;
      apv_status = "REC";

    } else if (values == "rejectOrder") {
      state.keep_comment_id = info;
      state.keep_comment_id.h_id = info.id;
      dispatch('setLocalStore', { feild: 'keep_comment_id', data: info })
      dispatch('setSession', { feild: 'keep_comment_id', data: info })

      chief_saleman = Vue.localStorage.get("emp_id");
      emp_id = info.salesman_code;
      apv_status = "REJ";

    } else if (values == "sendtoOrder") {
      chief_saleman = state.chiefsales_selected.emp_id;
      emp_id = Vue.localStorage.get("emp_id");
      apv_status = "FWD";
    } else if (values == "approveOrder") {
      chief_saleman = Vue.localStorage.get("emp_id");
      emp_id = info.salesman_code;
      apv_status = "APV";
    }


    let obj = {
      h_id: info.id,
      doc_no: info.doc_no,
      chief_saleman: chief_saleman,
      apv_status: apv_status,
      emp_id: emp_id

    };
console.log(obj)
    if (values == "submitOrder" || values == "submitOrderAuto") {
      if (state.chiefsales.length > 0) {
        if(obj.apv_status == 'SAPV' && Vue.localStorage.get("department") == 'ODM'){
        ordService
        .updateOrderHead(state)
        .then(response => {
        })
        .catch();
        let balane = 0
        let use_budget = 0
        if (parseFloat(state.keepDiscountAPV.discount) ==
            parseFloat(info.percent_discount))
          {
            // console.log('A')
          balane = parseFloat(state.budget) - parseFloat(info.sum_budget)
          use_budget = parseFloat(info.sum_budget)
        } else {
          // console.log('B',
          // parseFloat(state.budget) , !parseFloat(state.sumBudgetAllRow) ? 0 : parseFloat(state.sumBudgetAllRow)  )

          balane = parseFloat(state.budget) - ( !parseFloat(state.sumBudgetAllRow) ? 0 : parseFloat(state.sumBudgetAllRow) )
          use_budget = !parseFloat(state.sumBudgetAllRow) ? 0 : parseFloat(state.sumBudgetAllRow)
          // console.log('balane =>' , balane)
          // console.log('use_budget =>' , use_budget)
          // exit()
        }

        dispatch("getBudget", {
          year: moment(new Date()).format("YYYY"),
          month_no: moment(new Date()).format("MM"),
          channel_code: state.customer_info.customer_channel_code,
          role_code: Vue.localStorage.get("emp_id"),
          emp_code: Vue.localStorage.get("emp_code"),
          po_date: moment(new Date()).format("YYYY-MM-DD"),
          balance: balane,
          use_budget: use_budget,
          mode: "save"
        });


      }

        ordService
          .saveOrderFlow(obj)
          .then(response => {
            commit('SET_SHOWPONO', response.po_no)
            state.thisPage.openCF("showpono");
            dispatch("getOrderBySales", {
              year: state.date_selected.year,
              month: state.date_selected.month
            });
          })
          .catch();
      } else {
        dispatch("getOrderBySales", {
          year: state.date_selected.year,
          month: state.date_selected.month
        });
      }
    } else {

  
      // console.log('updateOrderHead',obj.apv_status )
      ordService
        .saveOrderFlow(obj)
        .then(response => {
          state.spinner_loading = true;
          ordService
            .updateOrderHead(state)
            .then(response => {
              if (obj.apv_status == 'APV') {
                dispatch("callTfCipher");
              }
              // console.log("update head");
            })
            .catch();
            // console.log('state.keepRouter =>', state.keepRouter)
            // console.log('values =>' , values)
            // console.log('state.sumBudgetAllRow =>' ,state.sumBudgetAllRow )
          if (
             !state.keepRouter &&
             values == "approveOrder" &&
             state.sumBudgetAllRow > 0

          ) {
            let balane = 0
            let use_budget = 0
            if (parseFloat(state.keepDiscountAPV.discount) ==
              parseFloat(info.percent_discount)) {
              balane = parseFloat(state.budget) - parseFloat(info.sum_budget)
              use_budget = parseFloat(info.sum_budget)
            } else {
              balane = parseFloat(state.budget) - parseFloat(state.sumBudgetAllRow)
              use_budget = parseFloat(state.sumBudgetAllRow)
            }

            dispatch("getBudget", {
              year: moment(new Date()).format("YYYY"),
              month_no: moment(new Date()).format("MM"),
              channel_code: state.customer_info.customer_channel_code,
              role_code: Vue.localStorage.get("emp_id"),
              emp_code: Vue.localStorage.get("emp_code"),
              po_date: moment(new Date()).format("YYYY-MM-DD"),
              balance: balane,
              use_budget: use_budget,
              mode: "save"
            });
          }
          if (
            parseFloat(state.keepDiscountAPV.discount) !=
            parseFloat(info.percent_discount)
          ) {
            dispatch("flagDiscont", info.doc_no);
            ordService
              .saveItemAfterFlagDiscount(state, values)
              .then(response => { })
              .catch();
          }
          if (values != "submitOrder") {
            dispatch("getOrderBySales", {
              year: state.date_selected.year,
              month: state.date_selected.month,
              po: state.filter_po,
              saleman:
                state.filter_salesman == "" ? "" : state.filter_salesman.code,
              customer:
                state.filter_customer == "" ? "" : state.filter_customer.code
            });
          }
        })
        .catch();
    }
  },
  calDiscountForNewOrder: ({ state, dispatch }, values) => {
    let data = _.cloneDeep(state.customer_info);
    ordService
      .filterCustomer({ keyword: data.customer_code })
      .then(response => {
        if (response.length > 0) {
          let percent = parseFloat(response[0].percent_discount);
          if (percent > parseFloat(data.percent_discount)) {
            dispatch("flagDiscont", data.doc_no);
          }

          if (parseFloat(data.percent_discount) > percent) {
            let diffPrice = 0;
            let totalDiscount = 0;
            _.forEach(values.items_order, function (row) {
              let rs =
                (parseFloat(row.ppu) - parseFloat(row.net_price)) *
                parseInt(row.order_qty);
              diffPrice = diffPrice + parseFloat(rs);
              let dc = (row.amount * percent) / 100;

              row.net_amount = row.amount - dc;
              let per_c = percent == "" ? 0 : percent;

              let p_dis = parseFloat(row.price) * (parseFloat(per_c) / 100)
              let p_dis4 = _.round(p_dis, 4);
              let p_dis2 = p_dis4 * parseInt(row.order_qty);
              let p_dis5 = _.round(p_dis2, 4);
              row.last_discount = _.round(p_dis5, 2);
            });
            _.forEach(values.items_promo_order, function (row) {
              _.forEach(row.products, function (record) {
                let dc = (record.amount * percent) / 100;
                record.net_amount = record.amount - dc;
                let per_c = percent == "" ? 0 : percent;

                let p_dis = parseFloat(record.price) * (parseFloat(per_c) / 100)
                let p_dis4 = _.round(p_dis, 4);
                let p_dis2 = p_dis4 * parseInt(record.order_qty);
                let p_dis5 = _.round(p_dis2, 4);
                record.last_discount = _.round(p_dis5, 2);
              });
              row.net_amount = row.products.reduce(
                (acc, row) => acc + parseFloat(row.net_amount),
                0
              );
            });

            let item = _.cloneDeep(values.items_order);
            let pro = _.cloneDeep(values.items_promo_order);

            let netA = item.reduce(
              (acc, row) => acc + parseFloat(row.net_amount),
              0
            );
            let amount = item.reduce(
              (acc, row) => acc + parseFloat(row.amount),
              0
            );
            let netA1 = pro.reduce(
              (acc, row) => acc + parseFloat(row.net_amount),
              0
            );
            let amount1 = pro.reduce(
              (acc, row) => acc + parseFloat(row.amount),
              0
            );

            let netA2 = 0;
            let amount2 = 0;
            _.forEach(pro, function (row) {
              let rs_netA2 = row["freeitems"].reduce(
                (acc, row) => acc + parseFloat(row.net_amount),
                0
              );
              netA2 = netA2 + rs_netA2;

              let rs_amount2 = row["freeitems"].reduce(
                (acc, row) => acc + parseFloat(row.amount),
                0
              );
              amount2 = amount2 + rs_amount2;
            });

            let rsAmount = amount + amount1 + amount2;
            let rsNetA = netA + netA1 + netA2;
            totalDiscount = rsAmount - rsNetA;
            // console.log("diffPrice >>> ", diffPrice)

            let compare =
              parseFloat(state.totalDiscount) -
              parseFloat(totalDiscount) +
              diffPrice;

            dispatch("getBudget", {
              year: moment(new Date()).format("YYYY"),
              month_no: moment(new Date()).format("MM"),
              channel_code: state.customer_info.customer_channel_code,
              role_code: Vue.localStorage.get("emp_id"),
              emp_code: Vue.localStorage.get("emp_code"),
              po_date: moment(new Date()).format("YYYY-MM-DD"),
              balance: parseFloat(state.budget) - parseFloat(compare),
              use_budget: parseFloat(compare),
              mode: "save"
            });
          }
        }
      })
      .catch();
  },
  saveDraft: ({ commit, state, dispatch }, value) => {
    let nowTime = moment(new Date()).format("HH:mm:ss");
    let dataC = _.cloneDeep(state.customer_info);
    ordService
      .saveHeadOrder(state)
      .then(response => {
          if(!response.status){
            state.thisPage.openCF("preview_reject");
            // state.thisPage.openCF("preview_reject2");
            // let ord_dilog = Vue.localStorage.get('ORD_DIALOG')
            let ord_dilog = sessionStorage.getItem('keep_order_session')
            let theArray = JSON.parse(ord_dilog)
            // console.log(theArray)
            let values={
              'items':theArray.customer_info,
            }
         
            dispatch('getOrderById',values)
            commit("SET_SPINNER_ORDER", false);
          }else {
        commit("SET_SPINNER_ORDER", false);
        dispatch('setLocalStore', { feild: 'ponoStep', data: true })
        dispatch('setSession', { feild: 'ponoStep', data: true })
        commit('SET_SHOWPONO', response.po_no)
        state.customer_info.id = response.h_id
        state.customer_info.h_id = response.h_id
        state.customer_info.doc_no = response.doc_no
        state.customer_info.po_no = response.po_no
        state.keep_comment_id.id = response.h_id
        state.keep_comment_id.h_id = response.h_id
        state.keep_comment_id.doc_no = response.doc_no
        dispatch('setLocalStore', { feild: 'customer_info', data: state.customer_info })
        dispatch('setSession', { feild: 'customer_info', data: state.customer_info })


        if (state.customer_info.order_status == 'DRF_PR' || state.customer_info.order_status == 'REC_PR') {
          state.thisPage.btnPreviewOrder = true;
          state.thisPage.runProcessPR = false;
          if (_.trim(dataC.po_no) != _.trim(response.po_no)) {
              // console.log('ID =>',response)
              Vue.localStorage.set('KEEP_PREVIEW',JSON.stringify(state.customer_info))
              Vue.localStorage.set('PO_NO_PREVIEW',response.po_no)
              state.thisPage.openCF("showpono_PR");
          } else {
            if (value == 'saveDraft' && dataC.order_status == 'DRF_PR') {
              state.thisPage.openCF("showpono");
            } else if (value == 'saveDraftAndClose') {
              state.thisPage.closeDlg("createOrder_dialog");
            } else if (value == 'previewOrder') {
              let people = new Map();
              people.set('1', 'jhon');
              people.set('2', 'jasmein');
              people.set('3', 'abdo');
              let jhonKey = people.get('10');
              // console.log(jhonKey)
              if(!jhonKey){
                // console.log('un')
              }

              // let ord_dilog = sessionStorage.getItem('keep_order_session')
              // let theArray = JSON.parse(ord_dilog)
              // for (let index = 0; index < theArray.items_order.length; index++) {
              //   const element = theArray.items_order[index];
              //   element.ref_price = element.price
              // }

              // dispatch('setLocalStore', { feild: 'items_order', data: theArray.items_order })
              // dispatch('setSession', { feild: 'items_order', data: theArray.items_order })
              // commit("setItems", theArray.items_order);
              // console.log(theArray.items_order)
           
              Vue.localStorage.set('KEEP_PREVIEW',JSON.stringify(state.customer_info))
              Vue.localStorage.set('PO_NO_PREVIEW',response.po_no)
              state.thisPage.openCF("showpono_PR");
            } else{
              // console.log("PR => 3");
            }
          }
        } else {
          if (value == 'saveDraftAndClose') {
            state.thisPage.openCF("showponoALLClose");
          } else {
            state.thisPage.openCF("showpono");
          }
        }

        if (state.popupComment.length > 0) {
          state.keep_comment_id.h_id = response.h_id;
          state.keep_comment_id.doc_no = response.doc_no;
          dispatch('setLocalStore', { feild: 'keep_comment_id', data: response })
          dispatch('setSession', { feild: 'keep_comment_id', data: response })
          state.popupComment.forEach(function (value, key) {
            value.doc_no = response.doc_no;
            dispatch("replyComment", value);
          });
        }
        dispatch("getOrderBySales", {
          year: state.date_selected.year,
          month: state.date_selected.month
        });
          }
      })
      .catch();
  },
  openOrder: ({ state, dispatch }) => {
    // console.log('Opem Order =>', state.mstDiscount)
    state.spinner_order = true;
    state.temp_comment_status = false;
    state.comment = [];

    dispatch("clearDialog");
    state.salesman_list = [
      {
        emp_id: Vue.localStorage.get("emp_id"),
        first_name: _.trim(Vue.localStorage.get("first_name")),
        last_name: _.trim(Vue.localStorage.get("last_name"))
      }
    ];
    let nowD = moment(new Date()).format("YYYY-MM-DD");
    let nowT = moment(new Date()).format("HH:mm:ss");
    var podate = new Date(nowD);
    var po_dd = podate.getDate();
    var po_mm = podate.getMonth();
    var po_y = podate.getFullYear();
    let rsPoDate = moment(new Date(po_y, po_mm, po_dd + 1)).format(
      "YYYY-MM-DD"
    );
    state.customer_info.po_no = "System";
    state.customer_info.po_date = nowD + ' ' + nowT;
    state.customer_info.creator =
      _.trim(Vue.localStorage.get("first_name")) +
      "  " +
      _.trim(Vue.localStorage.get("last_name"));
    state.customer_info.user_create = Vue.localStorage.get("emp_id");
    state.customer_info.salesman_code = Vue.localStorage.get("emp_id");
    state.customer_info.delivery_date = rsPoDate;
    state.customer_info.delivery_date_cipher = '';
    state.customer_info.delivery_log = 'front default';
    state.customer_info.payByCash = false;
    state.customer_info.pay_by_cash = false;
    state.totalDiscount = 0;
    state.spinner_order = false;
    if (state.mstDiscount.length == 0) {
      dispatch("getMstDiscount");
    }
    if (
      state.keepRouter &&
      typeof state.disableFrom["discount"] != "undefined" &&
      !state.disableFrom["discount"].status
    ) {
      dispatch("getBudget", {
        year: moment(new Date()).format("YYYY"),
        month_no: moment(new Date()).format("MM"),
        channel_code: state.customer_info.customer_channel_code,
        role_code: Vue.localStorage.get("emp_id"),
        emp_code: Vue.localStorage.get("emp_code"),
        po_date: moment(new Date()).format("YYYY-MM-DD"),
        balance: 0,
        mode: "show"
      });
    }
    Vue.localStorage.set("ORD_DIALOG_SHOW", 'OPEN');
    sessionStorage.setItem('ORD_DIALOG_SHOW_SESSION','OPEN')
    dispatch('setLocalStore', { feild: 'totalDiscount', data: state.totalDiscount })
    dispatch('setLocalStore', { feild: 'customer_info', data: state.customer_info })
    dispatch('setLocalStore', { feild: 'salesman_list', data: state.salesman_list })
    dispatch('setLocalStore', { feild: 'temp_comment_status', data: false })
    dispatch('setLocalStore', { feild: 'comment', data: [] })

    dispatch('setSession', { feild: 'totalDiscount', data: state.totalDiscount })
    dispatch('setSession', { feild: 'customer_info', data: state.customer_info })
    dispatch('setSession', { feild: 'salesman_list', data: state.salesman_list })
    dispatch('setSession', { feild: 'temp_comment_status', data: false })
    dispatch('setSession', { feild: 'comment', data: [] })

  },
 
  getOrderById: ({ commit, state, dispatch }, values) => {
    // console.log(values.items)
    Vue.localStorage.set("ORD_DIALOG_SHOW", 'OPEN');
    sessionStorage.setItem('ORD_DIALOG_SHOW_SESSION','OPEN')
    dispatch("clearDialog");

    commit("selectedChiefsales", "");
    state.spinner_order = true;
    state.temp_comment_status = false;
    state.comment = [];
    if (state.mstDiscount.length == 0) {
      dispatch("getMstDiscount");
    }
    ordService
      .getOrderById(values.items)
      .then(response => {
     
console.log('resss' , response)
        setTimeout(function () {
          var session_copy_po = ''
          var session_copy_po_no = ''

          var session_copy_po = ''
          var session_copy_po_no = ''
          

        if(values.type == 'COPY'){
          session_copy_po = '1'
          session_copy_po_no =  response.order_head[0].po_no
            let rsDate = {
              customer_code: response.order_head[0].cust_code,
              po_date: moment(new Date()).format('YYYY-MM-DD HH:MM:ss')
            };
            // console.log(rsDate)
            dispatch('getDeliveryDate', rsDate)
            //  console.log(response.order_head[0])
            response.order_head[0].po_date = moment(new Date()).format('YYYY-MM-DD HH:MM:ss')
            response.order_head[0].po_no += '.'
            response.order_head[0].h_id = ''
        }else {
          session_copy_po = '0'
          session_copy_po_no =  ''
        }
        dispatch('setSession', { feild: 'session_copy_po', data: session_copy_po })
        dispatch('setSession', { feild: 'session_copy_po_no', data: session_copy_po_no })
        // console.log(session_copy_po , session_copy_po_no)
          if (response.order_head.length == 1) {

            state.items_order_bk = false;
            let data = response.order_head[0];
            if(values.type != 'COPY'){
             dispatch("getComment", data);
            }

            
            commit("setBkMode", data.order_mode);
            commit('setMasterShipto', [])
            dispatch('reCallGetShipTo', { code: data.cust_code, data: [], action: 'getOrderById' })

            data.id = data.h_id
            data.customer_code = data.cust_code
            data.customer_coded = data.cust_code
            data.customer_name = data.customer_name_th
            data.creator = data.user_create_name_th + "  " + data.user_create_lastname_th
            data.salesman_code = data.sm_code == null ? 0 : data.sm_code.toString()
            data.perDiscountMng = data.percent_discount + "%"
            data.take_note = data.take_note == null || data.take_note == ""
              ? ""
              : data.take_note
            data.count_comment = response.count_comment
            data.payByCash = data.pay_by_cash
            data.pay_by_cash = data.pay_by_cash == 1 ? true : false
            state.totalDiscount_old = data.percent_discount;


            // console.log("balance => ", data.balance)
            let payBy = {
              cust_addr1: _.trim(data.cust_addr1) == 'undefined' ? '' : data.cust_addr1,
              cust_addr2: _.trim(data.cust_addr2) == 'undefined' ? '' : data.cust_addr2,
              cust_addr3: _.trim(data.cust_addr3) == 'undefined' ? '' : data.cust_addr3,
              sent_to_cus_name: _.trim(data.sent_to_cus_name) == 'undefined' ? '' : data.sent_to_cus_name,
              receive_name: _.trim(data.receive_name) == 'undefined' ? '' : data.receive_name,
              tax_id: _.trim(data.tax_id) == 'undefined' ? '' : data.tax_id
            };
            commit("setBudget", data.bal_budget);
            commit("SET_PAYBYCASH", payBy);
            state.totalDiscount = data.total_netprice;
            state.order_selected = data;
            state.fucusCustomer = data.cust_code;
            commit("setCustomerInfo", data);
            dispatch("getOrderChiefsales", data.salesman_code);

            dispatch('setLocalStore', { feild: 'budget', data: data.bal_budget })
            dispatch('setLocalStore', { feild: 'paybycash_list', data: payBy })
            dispatch('setLocalStore', { feild: 'totalDiscount', data: state.totalDiscount })
            dispatch('setLocalStore', { feild: 'order_selected', data: state.order_selected })
            dispatch('setLocalStore', { feild: 'fucusCustomer', data: state.fucusCustomer })
            dispatch('setLocalStore', { feild: 'customer_info', data: state.customer_info })


            // console.log(state.customer_info)
            dispatch('setSession', { feild: 'budget', data: data.bal_budget })
            dispatch('setSession', { feild: 'paybycash_list', data: payBy })
            dispatch('setSession', { feild: 'totalDiscount', data: state.totalDiscount })
            dispatch('setSession', { feild: 'order_selected', data: state.order_selected })
            dispatch('setSession', { feild: 'fucusCustomer', data: state.fucusCustomer })
            dispatch('setSession', { feild: 'customer_info', data: state.customer_info })
            
            if (response.items != "false") {
              _.forEach(response.items, function (row) {
                let price2 = _.round(row.price, 2);
                row.price = price2
                if (parseFloat(row.priceVD) > 0) {
                  row.volDiscount = 'Y'
                } else {
                  row.volDiscount = 'N'
                }
                let p_dis = parseFloat(row.price) * (parseFloat(data.percent_discount) / 100)
                let p_dis4 = _.round(p_dis, 4);
                let p_dis2 = p_dis4 * parseInt(row.order_qty);
                let p_dis5 = _.round(p_dis2, 4);
                row.last_discount = _.round(p_dis5, 2);
                row.last_discount_new = 0;
                row.budget_old = row.budget
                //OPL 199
                console.log('3053')
                row.priceMaster = parseFloat(row.budget) / parseFloat(row.order_qty)
              });
              commit("setItems", response.items);
              dispatch('setLocalStore', { feild: 'items_order', data: response.items })
              dispatch('setSession', { feild: 'items_order', data: response.items })

            }
            dispatch("sumTotalTable");
            if (
              !state.keepRouter &&
              (data.order_status == "WFA" || data.order_status == "FWD")
            ) {
              dispatch("getBudget", {
                year: moment(new Date()).format("YYYY"),
                month_no: moment(new Date()).format("MM"),
                channel_code: state.customer_info.customer_channel_code,
                role_code: Vue.localStorage.get("emp_id"),
                emp_code: Vue.localStorage.get("emp_code"),
                po_date: moment(new Date()).format("YYYY-MM-DD"),
                balance: 0,
                mode: "show"
              });
            } else if (
              state.keepRouter &&
              (data.order_status == "DRF" || data.order_status == "REC")
            ) {
              dispatch("getBudget", {
                year: moment(new Date()).format("YYYY"),
                month_no: moment(new Date()).format("MM"),
                channel_code: state.customer_info.customer_channel_code,
                role_code: Vue.localStorage.get("emp_id"),
                emp_code: Vue.localStorage.get("emp_code"),
                po_date: moment(new Date()).format("YYYY-MM-DD"),
                balance: 0,
                mode: "show"
              });

              if (response.items != "false") {
                // FIX PRICE---------------
                if (
                  (_.toUpper(state.customer_info.price_policy_code) == "AUTO" &&
                    _.toUpper(state.customer_info.customer_channel_code) == "100") ||
                  _.toUpper(state.customer_info.price_policy_code) == "FLEX"
                ) {
                  // console.log("price_policy => 2",response)

                  var itemNobk = _.filter(response.items, item => {
                    if (item.flag_status != "A" &&
                      item.flag_status != "F" &&
                      item.flag_status != "CP" &&
                      (!_.isUndefined(item.ref_po_no) || !_.isNull(item.ref_po_no)) &&
                      _.trim(item.ref_po_no).length < 2) {
                      return true;
                    }
                  });
                  let prod_code = _.map(itemNobk, "item_code");
                  let priceForVd =
                    _.toUpper(state.customer_info.price_policy_code) == "AUTO"
                      ? data.pricetype_code
                      : data.pricefix_code;
                  ordService
                    .getVolumeDis(prod_code, priceForVd)
                    .then(result => {
                      result.forEach(function (group) {
                        group['details'].forEach(function (record) {
                          let index = _.findIndex(response['items'], function (o) { return o.item_code == record.item_code; });
                          if (!_.isUndefined(response['items'][index])) {
                            response['items'][index]['group'] = [group]
                            response['items'][index]['volDiscount'] = 'Y'
                          }
                        });
                      });
                    })
                    .catch();
                }
              }else {
                // console.log("LDLDLD => ", response)
              }
            }

            if (data.order_status != "DRF") {
              ordService
                .getFlow(data)
                .then(row => {
                  commit("setFlow", row);
                  dispatch('setLocalStore', { feild: 'flow', data: row })
                  dispatch('setSession', { feild: 'flow', data: row })
                })
                .catch();
            }
            commit("setSalesmanList", []);
            dispatch('setLocalStore', { feild: 'salesman_list', data: [] })
            dispatch('setSession', { feild: 'salesman_list', data: [] })
           
            ordService
              .getSalesmanByCust({ all:values,  customer_code: data.cust_code })
              .then(response => {
                if (response == "null") {
                  let list = [
                    {
                      emp_id: Vue.localStorage.get("emp_id"),
                      first_name: _.trim(Vue.localStorage.get("first_name")),
                      last_name: _.trim(Vue.localStorage.get("last_name"))
                    }
                  ];
                  commit("setSalesmanList", list);
                  dispatch('setLocalStore', { feild: 'salesman_list', data: list })
                  dispatch('setSession', { feild: 'salesman_list', data: list })

                } else {
                  commit("setSalesmanList", response);
                  dispatch('setLocalStore', { feild: 'salesman_list', data: response })
                  dispatch('setSession', { feild: 'salesman_list', data: response })

                }
                state.customer_info.salesman_code = data.salesman_code;
              })
              .catch();
          }
          if (response.promotion != "false") {
            let temp = [];
            _.forEach(response.promotion, function (row) {

              _.forEach(row.products, function (record) {
                let p_dis = parseFloat(record.price) * (parseFloat(state.customer_info.percent_discount) / 100)
                let p_dis4 = _.round(p_dis, 4);
                let p_dis2 = p_dis4 * parseInt(record.order_qty);
                let p_dis5 = _.round(p_dis2, 4);
                record.last_discount = _.round(p_dis5, 2);
                record.last_discount_new = _.round(p_dis5, 2);
                record.budget_old = record.budget
              });

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
            if (state.customer_info.order_status == "DRF") {
              ordService
                .getPromoEndDate(response.promotion)
                .then(response => {
                  commit("setEnddate", response);
                  commit("setPromotions", temp);
                  dispatch('setLocalStore', { feild: 'enddatePromo', data: response })
                  dispatch('setLocalStore', { feild: 'items_promo_order', data: temp })
                  
                  dispatch('setSession', { feild: 'enddatePromo', data: response })
                  dispatch('setSession', { feild: 'items_promo_order', data: temp })
                  dispatch("sumTotalTable");
                })
                .catch();
            } else {
              commit("setPromotions", temp);
              dispatch('setLocalStore', { feild: 'items_promo_order', data: temp })
              dispatch('setSession', { feild: 'items_promo_order', data: temp })

              dispatch("sumTotalTable");
            }
          }
          state.keepDiscountAPV = {
            discount: _.cloneDeep(state.customer_info.percent_discount),
            items: _.cloneDeep(state.items_order),
            promotion: _.cloneDeep(state.items_promo_order),
            freeitems: _.cloneDeep(state.items_freegift),
            totalDiscount: _.cloneDeep(state.totalDiscount)
          };
          dispatch('setLocalStore', { feild: 'keepDiscountAPV', data: state.keepDiscountAPV })
          dispatch('setSession', { feild: 'keepDiscountAPV', data: state.keepDiscountAPV })

          // state.spinner_order = false;
          if(values.type == 'COPY'){
            state.customer_info.order_status = 'DRF'
            let ord_dilog = sessionStorage.getItem('keep_order_session')
            let theArray = JSON.parse(ord_dilog)
            theArray.customer_info.order_status = 'DRF'
            // console.log(theArray)
            sessionStorage.setItem('keep_order_session', JSON.stringify(theArray))
          }
          // sessionStorage.setItem('keep_order_session', JSON.stringify())
          // console.log(state.customer_info )

        }, 0);
      })
      .catch();
    /*
    ยังไม่้ว่า set ทำไมเลยปิดไว้ก่อน
    let masterCG = _.cloneDeep(state.temp_master_cg);
    commit("setMasterCG", masterCG);
    */
    dispatch('setLocalStore', { feild: 'customer_info', data: state.customer_info })
    dispatch('setSession', { feild: 'customer_info', data: state.customer_info })

  },
  
  viewItem: ({ state }) => {
    // ITEMS
    let items = state.items_order;
    var rsItems = _.filter(items, { checked: true });
    _.forEach(rsItems, function (row) {
      row.unit_type = row.unit_type == "INNER" ? "OUTER" : "INNER";
    });

    dispatch('setLocalStore', { feild: 'items_order', data: state.items_order })
    dispatch('setSession', { feild: 'items_order', data: state.items_order })
  },
  checkAllItem: ({ state }, value) => {
    let info = _.cloneDeep(state.customer_info);
    // var dupItems 
    let clone_data_a = _.cloneDeep( state.items_order)
    // console.log(' clone_data_a ',clone_data_a)

    // = _.filter(state.items_order, item => {
    //   if (!_.isUndefined(item.ref_po_no) &&
    //     _.trim(item.ref_po_no).length > 2) {
    //     return true;
    //   }
    // });

    _.forEach(clone_data_a, function (row) {
      if (info.po_no == 'System') {
        row.checked = value;
      } else {
        if (_.isUndefined(row.ref_po_no) ||
          _.trim(row.ref_po_no).length < 2) {
          row.checked = value;
        }
      }
    });
      state.items_order =  clone_data_a


    var dupItems = []
    let count_check = state.items_order.filter(todo => todo.checked === true)
    let count_check_km = state.items_order.filter(todo => todo.checked === true && todo.bk_type == 'km')

    let count_2 =   count_check.filter(todo => _.isUndefined(todo.bk_type) )

    if(count_2.length > 0){
      // NEW
      dupItems = state.items_order.filter(todo => todo.checked === true
            && (_.isUndefined(todo.ref_po_no) ||
              _.trim(todo.ref_po_no).length < 2)
              );
            //  console.log('New => ' , dupItems)
    }else  {
      // back
      dupItems =  state.items_order.filter(todo =>todo.checked === true && todo.bk_type != 'km')
        //  console.log(' back => ',dupItems)
    }


    if (state.items_order.length > 0 && state.items_promo_order.length > 0) {
      // console.log('3210')
      state.thisPage.unitBtn = value;
      state.thisPage.delBtn = value;
    } else if (
      state.items_order.length > 0 &&
      state.items_promo_order.length == 0
    ) {
      // console.log('3217')

      // if (dupItems.length == state.items_order.length && value) {
      if (count_check_km.length > 0 && state.items_order.length > 0) {
        // console.log('3219')
        state.thisPage.unitBtn = false
      } else  {
        // console.log(state.items_order)
        let clone_data = _.cloneDeep( state.items_order)
        // console.log('a =>',  clone_data)

        let check_km2  =  state.items_order.filter(todo =>todo.checked === true  )
          // console.log('check_km2 ',check_km2)

          if(count_2.length > 0){
            state.thisPage.unitBtn = true
          }else {

              if(check_km2.length > 0 && count_check_km.length > 0){
                  // console.log('> 0')
                state.thisPage.unitBtn = false
              }else {
                let count_check_ = state.items_order.filter(todo => todo.checked === true 
                  && todo.bk_type == 'k1')

                if(count_check_.length > 0){
                    state.thisPage.unitBtn = true
                }else {
                  state.thisPage.unitBtn = false
                }
              
              }
          }
      
        // console.log('3222' , value)

      }
      // state.thisPage.unitBtn = dupItems.length == state.items_order.length ? !value : value;
      state.thisPage.delBtn = value;
    } else if (
      state.items_order.length == 0 &&
      state.items_promo_order.length > 0
    ) {
      // console.log('3231')
      state.thisPage.unitBtn = false;
      state.thisPage.delBtn = value;
    }
    // _.forEach(state.items_order, function (row) {
    //   if (info.po_no == 'System') {
    //     row.checked = value;
    //   } else {
    //     if (_.isUndefined(row.ref_po_no) ||
    //       _.trim(row.ref_po_no).length < 2) {
    //       row.checked = value;
    //     }
    //   }
    // });
    _.forEach(state.items_promo_order, function (row) {
      row.checked = value;
      _.forEach(row.products, function (record) {
        record.checked = value;
      });
      _.forEach(row.freeitems, function (record) {
        record.checked = value;
      });
    });
  },

  editNetPrice: ({ state }, value) => {
    let info = state.customer_info;
    if (info.order_status === "DRF" || info.order_status === "REC") {
      let theArray = state.items_order;
      if (value.indexParent == "no") {
        if (state.keepIndexEdit == "default") {
          if (!_.isUndefined(theArray[value.indexDetail])) {
            theArray[value.indexDetail].editMode = true;
          }
          state.keepIndexEdit = value.indexDetail;
        } else if (state.keepIndexEdit != value.indexDetail) {
          if (!_.isUndefined(theArray[value.indexDetail])) {
            theArray[value.indexDetail].editMode = true;
          }
          if (!_.isUndefined(theArray[state.keepIndexEdit])) {
            theArray[state.keepIndexEdit].editMode = false;
          }
          state.keepIndexEdit = value.indexDetail;
        } else if (state.keepIndexEdit == value.indexDetail) {
          if (!_.isUndefined(theArray[value.indexDetail])) {
            theArray[value.indexDetail].editMode = false;
          }
          state.keepIndexEdit = "default";
        }
      } else {
        if (state.keepIndexEdit != "default") {
          if (!_.isUndefined(theArray[state.keepIndexEdit])) {
            theArray[state.keepIndexEdit].editMode = false;
          }
        }
      }
    }
  },
  sumPromoTable: ({ state }) => {
    let rsPro = _.cloneDeep(state.promo_seleceted_temp);
    /*let rsPro = _.cloneDeep(state.promo_seleceted);*/
    let rsFg = _.cloneDeep(state.promo_freeg_seleceted);

    //PROMOTION
    var pro = _.filter(rsPro, item => {
      if (item.order_qty != "" || item.order_qty > 0) {
        return true;
      }
    });

    let netA = pro.reduce((acc, row) => acc + parseFloat(row.net_amount), 0);
    let orQty = pro.reduce((acc, row) => acc + parseInt(row.order_qty), 0);
    let amount = pro.reduce((acc, row) => acc + parseFloat(row.amount), 0);
    //FREE GIFT
    var fg = _.filter(rsFg, item => {
      if (item.order_qty != "" || item.order_qty > 0) {
        return true;
      }
    });

    let orQty2 = fg.reduce((acc, row) => acc + parseInt(row.order_qty), 0);
    let amount2 = fg.reduce((acc, row) => acc + parseFloat(row.amount), 0);

    var proCount = _.filter(rsPro, item => {
      if (item.order_qty != "" && item.order_qty > 0) {
        return true;
      }
    });
    let keepUniqAll = _.union(proCount, fg);
    let rs_count = _.uniqBy(keepUniqAll, "item_code");

    let netA2 = _.round(netA, 2);

    let allA = amount + amount2
    let allA2 = _.round(allA, 2);
    let allamount2 = _.round(amount, 2);

    let netPrice = allamount2 - netA2 > 0 ? allamount2 - netA : 0
    let netPrice2 = _.round(netPrice, 2);

    state.totalPromo = {
      netPrice: netPrice2,
      orderQty: orQty + orQty2,
      netAmount: netA2,
      amount: allA2,
      pNetPrice: allamount2 - netA2,
      pQty: orQty,
      pNetAmount: netA2,
      countItem: rs_count.length,
      pAmount: allamount2
    };
  },
  sumTotalTable: ({ state, dispatch }) => {
 
    let info = _.cloneDeep(state.customer_info);
    let item = _.cloneDeep(state.items_order);
    let pro = _.cloneDeep(state.items_promo_order);
    // item.ref_price = item.price
   
    
    // console.log(pro)

    let itemNoFlag = item.filter(todo => todo.flag_status != "P" || todo.flag_status == "G");
    //ITEMS
    let ibudget = item.reduce((acc, row) => acc + parseFloat(row.budget), 0);
    /**
     * 
     let netA = itemNoFlag.reduce((acc, row) => acc + parseFloat(row.net_amount), 0);
     let orQty = itemNoFlag.reduce((acc, row) => acc + parseInt(row.order_qty), 0);
     let amount = itemNoFlag.reduce((acc, row) => acc + parseFloat(row.amount), 0);
    */
    let netA = item.reduce((acc, row) => acc + parseFloat(row.net_amount), 0);
    let orQty = item.reduce((acc, row) => acc + parseInt(row.order_qty), 0);
    let amount = item.reduce((acc, row) => acc + parseFloat(row.amount), 0);
    let last_dis = item.reduce((acc, row) => acc + parseFloat(row.last_discount), 0);
    // let last_dis = itemNoFlag.reduce((acc, row) => acc + parseFloat(row.last_discount), 0);
    let last_dis_new = 0
    let ibudget_old = 0
    if (state.keepRouter == false) {
      last_dis_new = item.reduce((acc, row) => acc + parseFloat(row.last_discount_new), 0);
      ibudget_old = item.reduce((acc, row) => acc + parseFloat(row.budget_old), 0);
    }
    //PROMOTION
    let netA1 = pro.reduce((acc, row) => acc + parseFloat(row.net_amount), 0);
    let orQty1 = pro.reduce((acc, row) => acc + parseInt(row.order_qty), 0);
    let amount1 = pro.reduce((acc, row) => acc + parseFloat(row.amount), 0);

    //FREE GIFT
    let netA2 = 0;
    let orQty2 = 0;
    let amount2 = 0;
    let budget = 0;
    let budget_old = 0;
    let last_dis1 = 0;
    let last_dis1_new = 0;
    let keepUniq = [];
    let keepUniqFg = [];
    // item.last_discount_new =  state.customer_info *(item.percent_discount / 100 )
    // console.log('1 => state.customer_info =>', state.customer_info.sum_budget)
    _.forEach(pro, function (row) {

      keepUniq = _.union(keepUniq, row["products"]);
      let rs_netA2 = row["freeitems"].reduce(
        (acc, row) => acc + parseFloat(row.net_amount),
        0
      );
      netA2 = netA2 + rs_netA2;

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

      if (state.keepRouter == false) {
        last_dis1_new = row["products"].reduce((acc, row) => acc + parseFloat(row.last_discount_new), 0) + last_dis1_new;
      }
      last_dis1 = row["products"].reduce((acc, row) => acc + parseFloat(row.last_discount), 0) + last_dis1;
      budget = row["products"].reduce((acc, row) => acc + parseFloat(row.budget), 0) + budget;
      budget_old = row["products"].reduce((acc, row) => acc + parseFloat(row.budget_old), 0) + budget_old;
   
    });

    let keepUniqAll = _.union(keepUniq, keepUniqFg);

    let totalUniq = _.union(_.union(keepUniqAll, item), "item_code");

    state.totalItems = totalUniq.length

    state.totalOrderQty = orQty + orQty1 + orQty2;

    let allamount = amount + amount1 + amount2
    // console.log("amount2", amount2)
    // console.log(" amount1", amount1)
    // console.log(" amount", amount)
    let allamount2 = _.round(allamount, 2);
    state.totalAmount = allamount2;
    // console.log('cus_info',state.customer_info)
    let total_dis = last_dis1 + last_dis
    let all_dis = total_dis > 0 ? total_dis : 0;
    let totalDis4 = _.round(all_dis, 4);
    let totalDis2 = _.round(totalDis4, 2);
    // totalDis2 = 
    // console.log("1 ==> " , last_dis1)
    // console.log("2 ==> " , last_dis)
    // console.log('A',allamount2 * (info.percent_discount /100 ) )
    // state.totalDiscount = totalDis2;
    
    state.totalDiscount =  allamount2 * (info.percent_discount /100 ) 
    if (state.keepRouter == false) {
      let total_dis_new = last_dis1_new + last_dis_new
      let all_dis_new = total_dis_new > 0 ? total_dis_new : 0;
      let totalDis4_new = _.round(all_dis_new, 4);
      let totalDis2_new = _.round(totalDis4_new, 2);
      // console.log(totalDis2 +" --- "+ totalDis2_new)
      if (parseFloat(info.percent_discount) > parseFloat(state.totalDiscount_old)) {
        state.totalDiscount =  (info.percent_discount/100) * allamount2 
        // state.totalDiscount = totalDis2 + totalDis2_new
        let allbudget = budget + ibudget + ibudget_old + budget_old
        let allbudget2 = _.round(allbudget, 2);
        state.sumBudgetAllRow = allbudget2;
        // console.log('3411 ->', allbudget2)
      } else if (parseFloat(info.percent_discount) < parseFloat(state.totalDiscount_old)) {
        // console.log('3418 ->', info.sum_budget)
        state.totalDiscount = totalDis2_new
        state.sumBudgetAllRow = info.sum_budget;
      } else if (parseFloat(info.percent_discount) == parseFloat(state.totalDiscount_old)) {
        // console.log('3422 ->', nfo.sum_budget)
        state.sumBudgetAllRow = info.sum_budget;
      }
    } else {
      if (info.order_status == "DRF" || info.order_status == "REC") {
        let allbudget = budget + ibudget
        // console.log('allbudget = ', budget , ibudget)
        let allbudget2 = _.round(allbudget, 2);
        state.sumBudgetAllRow = allbudget2;
        // console.log('3430 -> ', allbudget2)
        // console.log('AAAAA =>' , allbudget2)
      } else {
        // console.log('3433 ->', info.sum_budget)
        state.sumBudgetAllRow = info.sum_budget;
      }
    }
    // console.log(state.items_order)P
    let allnetA = allamount2 - state.totalDiscount
    let allnetA2 = _.round(allnetA, 2);
    state.totalNetAmount = allnetA2;
    dispatch('setLocalStore', { feild: 'totalOrderQty', data: state.totalOrderQty })
    dispatch('setLocalStore', { feild: 'totalAmount', data: state.totalAmount })
    dispatch('setLocalStore', { feild: 'totalNetAmount', data: state.totalNetAmount })
    dispatch('setLocalStore', { feild: 'sumBudgetAllRow', data: state.sumBudgetAllRow })
    dispatch('setLocalStore', { feild: 'totalDiscount', data: state.totalDiscount })
    dispatch('setLocalStore', { feild: 'totalItems', data: state.totalItems })
    dispatch('setLocalStore', { feild: 'items_order', data: state.items_order })
    dispatch('setLocalStore', { feild: 'items_promo_order', data: state.items_promo_order })

    
    dispatch('setSession', { feild: 'totalOrderQty', data: state.totalOrderQty })
    dispatch('setSession', { feild: 'totalAmount', data: state.totalAmount })
    dispatch('setSession', { feild: 'totalNetAmount', data: state.totalNetAmount })
    dispatch('setSession', { feild: 'sumBudgetAllRow', data: state.sumBudgetAllRow })
    dispatch('setSession', { feild: 'totalDiscount', data: state.totalDiscount })
    dispatch('setSession', { feild: 'totalItems', data: state.totalItems })
    dispatch('setSession', { feild: 'items_order', data: state.items_order })
    dispatch('setSession', { feild: 'items_promo_order', data: state.items_promo_order })

  },
  sumVolDisTable: ({ state }) => {
    let item = _.cloneDeep(state.volDisList);
    let orQty = item.reduce((acc, row) => acc + parseInt(row.order_qty), 0);
    state.totalvolDis = orQty;
    if (orQty == 0) {
      state.thisPage.optVolDis.display = false;
    }
  },
  getComment: ({ state, dispatch }, value) => {
    state.keep_comment_id = value;
    state.comment = [];
    state.temp_comment_status = false;
    dispatch('setLocalStore', { feild: 'keep_comment_id', data: value })
    dispatch('setLocalStore', { feild: 'comment', data: [] })
    dispatch('setLocalStore', { feild: 'temp_comment_status', data: false })
    
    dispatch('setSession', { feild: 'keep_comment_id', data: value })
    dispatch('setSession', { feild: 'comment', data: [] })
    dispatch('setSession', { feild: 'temp_comment_status', data: false })
    ordService
      .getComment(value)
      .then(response => {
        state.comment = response;
        dispatch('setLocalStore', { feild: 'comment', data: response })
        dispatch('setSession', { feild: 'comment', data: response })

      })
      .catch();
  },
  filterAllCUst: ({ state }, keyword) => {
    let item = _.cloneDeep(state.allCustomer_temp);
    if (keyword.length == 0) {
      state.allCustomer = item;
    } else if (keyword.length > 2) {
      state.allCustomer = item.filter(word => {
        const str = word.customer_code + word.customer_name_th + word.customer_name_eng + word.addr;
        return str.toUpperCase().indexOf(keyword.toUpperCase()) !== -1;
      });

    }
  },
  getAllCustomer: ({ state }, value) => {
    state.allCustomer_spinner = true;
    ordService
      .getAllCustomer(value)
      .then(response => {
        var data = _.filter(response, item => {
          if (item.customer_code != null && item.customer_id != null) {
            return true;
          }
        });
        state.allCustomer = data;
        state.allCustomer_temp = data;
        state.allCustomer_spinner = false;
      })
      .catch();
  },
  readComment: ({ state, dispatch }, value) => {
    let tempData = value.filter(todo => todo.status === "N");
    if (tempData.length > 0) {
      ordService
        .readComment(tempData)
        .then(response => {
          tempData.forEach(function (row, key) {
            let temp = state.comment.filter(todo => todo.id === row.id);
            temp.forEach(function (rowTemp, key) {
              let rsIndex = state.comment.indexOf(rowTemp);
              if (rsIndex >= 0) {
                state.comment[rsIndex].status = "Y";
                dispatch('setLocalStore', { feild: 'comment', data: state.comment })
                dispatch('setSession', { feild: 'comment', data: state.comment })

              }
            });
          });
        })
        .catch();
    }
  },
  replyComment: ({ state, dispatch }, value) => {
    if (state.comment.length == 0) {
      value.emp_id_start = Vue.localStorage.get("emp_id");
    } else {
      value.emp_id_start = state.comment[state.comment.length - 1].emp_id_start;
    }
    let data = _.cloneDeep(state.comment);
    state.comment = _.filter(data, item => {
      if (item.id != 'new') {
        return true;
      }
    });
    ordService
      .saveComment(value, state.keep_comment_id)
      .then(response => {
        state.comment.push(response);
        state.popupComment = [];
        state.temp_comment_status = false;
        dispatch('setLocalStore', { feild: 'comment', data: state.comment })
        dispatch('setLocalStore', { feild: 'popupComment', data: [] })
        dispatch('setLocalStore', { feild: 'temp_comment_status', data: false })

        
        dispatch('setSession', { feild: 'comment', data: state.comment })
        dispatch('setSession', { feild: 'popupComment', data: [] })
        dispatch('setSession', { feild: 'temp_comment_status', data: false })
      })
      .catch();
  },
  getWarehouse: ({ state, dispatch }) => {
    ordService
      .getWarehouse()
      .then(response => {
        state.master_warehouse = response;
        dispatch('setLocalStore', { feild: 'master_warehouse', data: response })
        dispatch('setSession', { feild: 'master_warehouse', data: response })

      })
      .catch();
  },
  filterCustomer: ({ commit }, value) => {
    state.loadCustStatus = true;
    ordService
      .filterCustomer(value)
      .then(response => {
        state.loadCustStatus = false;
        commit("SET_AUTOCOM_CG", response);
      })
      .catch();
  },
  getPriority: ({ state, dispatch }) => {
    state.priority = [];
    dispatch('setLocalStore', { feild: 'priority', data: [] })
    dispatch('setSession', { feild: 'priority', data: [] })

    ordService
      .getPriority()
      .then(response => {
        response.forEach(function (rowTemp, key) {
          rowTemp.id = parseInt(rowTemp.id);
          state.priority.push(rowTemp);
          dispatch('setLocalStore', { feild: 'priority', data: state.priority })
          dispatch('setSession', { feild: 'priority', data: state.priority })

        });
      })
      .catch();
  },
  getCreditterm: ({ state, dispatch }) => {
    state.creditterm = [];
    ordService
      .getCreditterm()
      .then(response => {
        state.creditterm = response;
        dispatch('setLocalStore', { feild: 'creditterm ', data: response })
        dispatch('setSession', { feild: 'creditterm ', data: response })
      })
      .catch();
  },
  getOrderSummary: ({ state, commit }, values) => {
    let data = { month: values.month, year: values.year };
    ordService
      .getOrderSummary(data)
      .then(response => {
        state.period_detail.block1.value = response.sum_quota;
        state.period_detail.block2.value = response.sum_achieved;
        state.period_detail.progress.value = response.sum_progress;
        state.period_detail.button.value = response.sum_incentive;
        state.period_detail.max_pass_percent = response.max_pass_percent;
        state.summary_bar.sum_draft = response.total_draft;
        state.summary_bar.sum_pendding = response.total_pending;
        state.summary_bar.sum_complete = response.total_complete;
        commit("SET_SPINNER_ORDER", false);
      })
      .catch();
  },
  getOrderBySales: ({ state, dispatch }, values) => {
    state.spinner_loading = true;
    state.draft_list = [];
    state.pending_list = [];
    state.completed_list = [];
    state.reject_list = [];
    state.xpress_list = [];
    dispatch("getFormList");
    ordService
      .getOrderBySales(values, state)
      .then(response => {
        if (state.keepRouter) {
          if (response.drafts.total > 0) {
            state.draft_list = response.drafts.data;
          } else {
            state.draft_list = [];
          }
          if (response.pending.total > 0) {
            state.pending_list = response.pending.data;
          } else {
            state.pending_list = [];
          }
          if (response.rejected.total > 0) {
            state.reject_list = response.rejected.data;
          } else {
            state.reject_list = [];
          }
          if (!_.isUndefined(response.xpress) && response.xpress.total > 0) {
            state.xpress_list = response.xpress.data;
          } else {
            state.xpress_list = [];
          }
        } else {
          if (response.rejected.total > 0) {
            state.reject_list = response.rejected.data;
          } else {
            state.reject_list = [];
          }
          if (response.pending.total > 0) {
            state.pending_list = response.pending.data;
          } else {
            state.pending_list = [];
          }
        }

        if (response.completed.total > 0) {
          state.completed_list = response.completed.data;
        } else {
          state.completed_list = [];
        }
        state.spinner_loading = false;
        if (state.keepRouter) {
          if (values.year == "range") {
            dispatch("getOrderSummary", {
              year: values.year,
              month: values.month
            });
          } else {
            dispatch("getOrderSummary", {
              year: state.date_selected.year,
              month: state.date_selected.month
            });
          }
        }
      })
      .catch();
  },
  getInfoFromBK: ({ commit, state, dispatch }, values) => {
    dispatch("clearDialog");
    commit("selectedChiefsales", "");
    state.spinner_order = true;
    state.temp_comment_status = false;
    state.comment = [];
    let head = values.head
    ordService
      .filterCustomer({ keyword: head.customer_code })
      .then(resp => {
        // console.log( resp[0].process_order_channel)
        sessionStorage.setItem('process_order_channel' , resp[0].process_order_channel)
        commit('setBkMode', head.order_type)
        dispatch('setLocalStore', { feild: 'bkMode', data: head.order_type })
        dispatch('setSession', { feild: 'bkMode', data: head.order_type })

        if (resp.length > 0) {
          let data = resp[0]
          commit('setMasterShipto', [])
          // เพิ่มเพื่อแจ้งเตือนกรณี api ship to 
          dispatch('reCallGetShipTo', { code: head, data: data, action: 'getInfoFromBK' })
          if (typeof state.disableFrom['discount'] != "undefined" && state.disableFrom['discount'].status == false) {
            dispatch('getMstDiscount')
          }

          state.salesman_list = [
            {
              emp_id: Vue.localStorage.get("emp_id"),
              first_name: _.trim(Vue.localStorage.get("first_name")),
              last_name: _.trim(Vue.localStorage.get("last_name"))
            }
          ];
          dispatch('setLocalStore', { feild: 'salesman_list', data: state.salesman_list })
          dispatch('setSession', { feild: 'salesman_list', data: state.salesman_list })

          data.id = ""
          data.doc_no = ""
          data.customer_code = head.customer_code
          data.customer_coded = head.customer_code
          data.customer_name = data.customer_name
          data.user_create = Vue.localStorage.get("emp_id")
          data.creator = _.trim(Vue.localStorage.get("first_name")) + "  " + _.trim(Vue.localStorage.get("last_name"))
          data.salesman_code = Vue.localStorage.get("emp_id"),
            data.perDiscountMng = data.percent_discount + "%"
          data.take_note = data.take_note == null || data.take_note == ""
            ? ""
            : data.take_note
          data.payByCash = data.is_cash
          data.pay_by_cash = data.is_cash == 1 ? true : false
          data.po_no = 'System'
          data.order_status = 'DRF'
          let outstanding = 0
          let order_value = 0
          data.outstanding = outstanding
          if (!isNaN(parseFloat(data.order_value))) {
            order_value = data.order_value;
          }
          data.balance = data.credit_limit - outstanding - order_value,
            data.credit_term_code = data.creditterm_code

          //FIX PRICE------------
          data.pricetype_code = data.default_price

          let payBy = {
            cust_addr1: '',
            cust_addr2: '',
            cust_addr3: '',
            sent_to_cus_name: '',
            receive_name: '',
            tax_id: ''
          };
          commit("setBudget", data.bal_budget);
          commit("SET_PAYBYCASH", payBy);
          state.totalDiscount = data.total_netprice;
          state.order_selected = data;
          state.fucusCustomer = data.cust_code;

          dispatch('setLocalStore', { feild: 'budget', data: data.bal_budget })
          dispatch('setLocalStore', { feild: 'paybycash_list', data: payBy })
          dispatch('setLocalStore', { feild: 'order_selected', data: data })
          dispatch('setLocalStore', { feild: 'fucusCustomer', data: data.cust_code })

          dispatch('setSession', { feild: 'budget', data: data.bal_budget })
          dispatch('setSession', { feild: 'paybycash_list', data: payBy })
          dispatch('setSession', { feild: 'order_selected', data: data })
          dispatch('setSession', { feild: 'fucusCustomer', data: data.cust_code })



          let nowDate = moment(new Date()).format("HH:mm:ss");
          let nowD = moment(new Date()).format("YYYY-MM-DD");
          let nowDALL = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
          let time = moment(nowD).format("YYYY-MM-DD") + " " + nowDate;
          var podate = new Date(nowD);
          var po_dd = podate.getDate();
          var po_mm = podate.getMonth();
          var po_y = podate.getFullYear();
          let rsPoDate = moment(new Date(po_y, po_mm, po_dd + 1)).format(
            "YYYY-MM-DD"
          );
          let rsDate = {
            customer_code: data.customer_code,
            po_date: time
          };
          /*
          if (_.trim(data.delivery_date_cipher).length == 0) {
            data.delivery_date_cipher = nowDALL;
          }
          */
          let detail = []
          let perc = parseFloat(data.percent_discount)

          let result = _.groupBy(values.detail, 'item_code');
          _.forEach(result, function (rowHead) {
            let mapRow = _.groupBy(rowHead, 'price');
            _.forEach(mapRow, function (row) {
              let record = _.cloneDeep(row[0]);
              let qty = row.reduce(
                (acc, row) => acc + parseFloat(row.qty),
                0
              );
              let code = _.map(row, 'ref_po_no');
              record.order_qty = qty
              record.ref_po_no = _.toString(code)
              let price_per2 = _.round(record.price_per_unit, 2);

              record.ppu = price_per2
              // record.flag_status = 'A'
              let step1 = parseFloat(record.price) * (perc / 100)
              let np = parseFloat(record.price) - step1
              let np2 = _.round(np, 2);
              record.net_price = np2

              let amount = parseFloat(qty) * parseFloat(record.price)
              let amount2 = _.round(amount, 2);
              record.amount = amount2

              // let netP = parseFloat(qty) * parseFloat(record.net_price)
              // let netP2 = _.round(netP, 2);
              let stepAm1 = record.amount * (perc / 100)
              let stepAm2 = _.round(stepAm1, 4);
              let stepAm3 = _.round(stepAm2, 2);
              let stepAm4 = record.amount - stepAm3
              let stepAm5 = _.round(stepAm4, 4);
              let stepAm6 = _.round(stepAm5, 2);
              record.net_amount = stepAm6
              record.budget = 0
              // record.last_discount = 0
              let p_dis = parseFloat(record.price) * (parseFloat(perc) / 100)
              let p_dis4 = _.round(p_dis, 4);
              let p_dis2 = p_dis4 * parseInt(record.order_qty);
              let p_dis5 = _.round(p_dis2, 4);
              record.last_discount = _.round(p_dis5, 2);
              record.last_discount_new = 0
              detail.push(record);
            });
          });
          state.items_order_bk = values.detail

          Vue.http.get(Vue.config['url'] + '/get-delivery-date', {
            params: {
              customer_code: rsDate.customer_code,
              po_date: rsDate.po_date
            },
            headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
          }).then(response => {
            let results = response.body.success.data;
            data.po_date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            let rs = results.deliverydate;
            if (!_.isUndefined(rs)) {
              let checkY = rs.split("-");
              if (_.trim(rs).length >= 10 && parseFloat(checkY[0]) >= parseFloat(po_y)) {
                data.delivery_date = rs;
              } else {
                data.delivery_date = rsPoDate
                state.thisPage.openCF("deliverydate");
              }
              state.deliverydate_servercipher = results.server_date;
              if (_.trim(state.customer_info.delivery_date_cipher).length == 0) {
                state.customer_info.delivery_date_cipher = results.server_date;
              }
            } else {
              data.delivery_date = rsPoDate
              state.thisPage.openCF("deliverydate");
            }
            commit("setCustomerInfo", data);
            dispatch('setLocalStore', { feild: 'customer_info', data: data })
            dispatch('setSession', { feild: 'customer_info', data: data })

            commit("setItems", detail);
            dispatch('setLocalStore', { feild: 'items_order', data: detail })
            dispatch('setLocalStore', { feild: 'items_order_bk', data: values.detail })

            dispatch('setSession', { feild: 'items_order', data: detail })
            dispatch('setSession', { feild: 'items_order_bk', data: values.detail })
            dispatch("sumTotalTable");
            Vue.localStorage.remove("FROMPAGE");
            Vue.localStorage.remove("BK_DETAIL");
            // success callback
          }, response => {
            // error callback
            if (response.status == 500) {
              data.delivery_date = rsPoDate
              state.thisPage.openCF("deliverydate");
              commit("setCustomerInfo", data);
              dispatch('setLocalStore', { feild: 'customer_info', data: data })
              dispatch('setSession', { feild: 'customer_info', data: data })


              commit("setItems", detail);
              dispatch('setLocalStore', { feild: 'items_order', data: detail })
              dispatch('setLocalStore', { feild: 'items_order_bk', data: values.detail })
              
              dispatch('setSession', { feild: 'items_order', data: detail })
              dispatch('setSession', { feild: 'items_order_bk', data: values.detail })
              dispatch("sumTotalTable");
              Vue.localStorage.remove("FROMPAGE");
              Vue.localStorage.remove("BK_DETAIL");
            }
          });
          dispatch("getOrderChiefsales", data.salesman_code);
          dispatch("checkMinimum", data.salesman_code);
        }
      })
      .catch();
  },
  getPurcheseInfoFromSP: ({ commit, state, getters, dispatch }, values) => {
    state.spinner_order = true;
    state.temp_comment_status = false;
    state.comment = [];
    dispatch("clearDialog");
    state.salesman_list = [
      {
        emp_id: Vue.localStorage.get("emp_id"),
        first_name: _.trim(Vue.localStorage.get("first_name")),
        last_name: _.trim(Vue.localStorage.get("last_name"))
      }
    ];

    dispatch('setLocalStore', { feild: 'salesman_list', data: state.salesman_list })
    dispatch('setSession', { feild: 'salesman_list', data: state.salesman_list })


    let nowDate = moment(new Date()).format("HH:mm:ss");
    let nowD = moment(new Date()).format("YYYY-MM-DD");
    let time = moment(nowD).format("YYYY-MM-DD") + " " + nowDate;

    let rsDate = {
      customer_code: values.head.cust_code,
      po_date: time
    };
    dispatch('getDeliveryDate', rsDate)

    state.customer_info.po_no = "System";
    state.customer_info.po_date = nowD;
    state.customer_info.creator =
      _.trim(Vue.localStorage.get("first_name")) +
      "  " +
      _.trim(Vue.localStorage.get("last_name"));
    state.customer_info.user_create = Vue.localStorage.get("emp_id");
    // state.customer_info.delivery_date = rsPoDate;
    state.customer_info.payByCash = false;
    state.customer_info.pay_by_cash = false;
    state.totalDiscount = 0;

    // state.master_shipto = [];
    commit('setMasterShipto', [])
    commit('setBkMode', 'OD')
    state.fucusCustomer = values.head.cust_code;

    dispatch('setLocalStore', { feild: 'bkMode', data: 'OD' })
    dispatch('setLocalStore', { feild: 'fucusCustomer', data: values.head.cust_code })
    // เพิ่มเพื่อแจ้งเตือนกรณี api ship to 
    dispatch('reCallGetShipTo', { code: values.head.cust_code, data: [], action: 'getPurcheseInfoFromSP' })

    ordService
      .getPromoCG(values.head.cust_code, "all")
      .then(response => {
        state.product_cg = response.cg;
        state.product_group = response.group;
        dispatch('setLocalStore', { feild: 'product_cg', data: response.cg })
        dispatch('setLocalStore', { feild: 'masterproduct_group_shipto', data: response.group })
        
        dispatch('setSession', { feild: 'product_cg', data: response.cg })
        dispatch('setSession', { feild: 'masterproduct_group_shipto', data: response.group })
      })
      .catch();
    ordService
      .filterCustomer({ keyword: values.head.cust_code })
      .then(response => {
        let dataRs = response[0];
        let outstanding = 0;
        let order_value = 0;

        if (!isNaN(parseFloat(dataRs.order_value))) {
          order_value = parseFloat(dataRs.order_value);
        }

        let temp = dataRs.credit_limit - outstanding - order_value;
        state.customer_info.balance = temp;
        state.customer_info.order_value = order_value;
        state.customer_info.credit_limit = dataRs.credit_limit;
        state.customer_info.credit_rating = dataRs.credit_rating;
        state.customer_info.credit_term_code = dataRs.credit_term_code;
        state.customer_info.creditterm_title = dataRs.creditterm_title;
        state.customer_info.customer_code = dataRs.customer_code;
        state.customer_info.customer_coded = dataRs.customer_code;
        state.customer_info.customer_name = dataRs.customer_name;
        state.customer_info.customer_name_en = dataRs.customer_name_en;
        state.customer_info.default_price = dataRs.default_price;
        state.customer_info.paymentterm_code = dataRs.paymentterm_code;
        state.customer_info.paymentterm_title = dataRs.paymentterm_title;
        state.customer_info.percent_discount = dataRs.percent_discount;
        state.customer_info.default_discount = dataRs.default_discount;
        state.customer_info.perDiscountMng = dataRs.percent_discount + "%";
        state.customer_info.ship_to = dataRs.ship_to;
        state.customer_info.warehouse_code = dataRs.warehouse_code;
        state.customer_info.warehouse_title = dataRs.warehouse_title;
        state.customer_info.customer_address = dataRs.customer_address;
        state.customer_info.payByCash = dataRs.is_cash;
        state.customer_info.pay_by_cash = dataRs.is_cash == 1 ? true : false;

        let arr_items = [];
        values.items.forEach(function (rowTemp, key) {
          let percent =
            dataRs.percent_discount != "" || dataRs.percent_discount != 0
              ? parseInt(dataRs.percent_discount)
              : 1;
          let dc = (rowTemp.amount * percent) / 100;
          let p_dis = parseFloat(rowTemp.price) * (parseFloat(percent) / 100)
          let p_dis4 = _.round(p_dis, 4);
          let p_dis2 = p_dis4 * parseInt(rowTemp.order_qty);
          let p_dis5 = _.round(p_dis2, 4);
          rowTemp.last_discount = _.round(p_dis5, 2);

          arr_items.push({
            net_amount: rowTemp.amount - dc,
            last_discount: p_dis2 * parseInt(rowTemp.order_qty),
            amount: rowTemp.amount,
            item_code: rowTemp.item_code,
            item_name: rowTemp.item_name,
            net_price: rowTemp.net_price,
            order_qty: rowTemp.order_qty,
            ppu: rowTemp.ppu,
            unit: rowTemp.unit,
            unit_id: rowTemp.unit_id,
            unit_type: rowTemp.unit_type
          });
        });
        commit("setItems", arr_items);
        dispatch('setLocalStore', { feild: 'items_order', data: arr_items })
        dispatch('setSession', { feild: 'items_order', data: arr_items })

        state.spinner_order = false;
        dispatch("sumTotalTable");
      })
      .catch();
    if (getters.customer_info.order_status === "DRF") {
      ordService
        .getSalesmanByCust({ all:values,customer_code: values.head.cust_code })
        .then(response => {
          state.salesman_list = [];
          dispatch('setLocalStore', { feild: 'salesman_list', data: [] })
          dispatch('setSession', { feild: 'salesman_list', data: [] })
          if (response == "null") {
            state.salesman_list = [
              {
                emp_id: Vue.localStorage.get("emp_id"),
                first_name: _.trim(Vue.localStorage.get("first_name")),
                last_name: _.trim(Vue.localStorage.get("last_name"))
              }
            ];
            state.customer_info.salesman_code = Vue.localStorage.get("emp_id");

            dispatch('setLocalStore', { feild: 'salesman_list', data: state.salesman_list })
            dispatch('setSession', { feild: 'salesman_list', data: state.salesman_list })
          } else {
            setTimeout(function () {
              state.salesman_list = response;
              if (state.salesman_list.length > 0) {
                state.customer_info.salesman_code =
                  state.salesman_list[0].emp_id;
              }
            }, 0);
          }
        })
        .catch();
    }
    dispatch('setLocalStore', { feild: 'customer_info', data: state.customer_info })
    dispatch('setSession', { feild: 'customer_info', data: state.customer_info })

  },
  setDiscountAPV: ({ state, dispatch, commit }, values) => {

    // console.log('setDiscountAPV')
    // let obj = Vue.localStorage.get("ORD_DIALOG");
    let obj = sessionStorage.getItem('keep_order_session')
    // console.log(obj)
    let theArray = JSON.parse(obj);
    // console.log("🚀 ~ file: myorders.js:4124 ~ theArray", theArray)
    if (
      !_.isUndefined(theArray["customer_info"]) ||
      !_.isNull(theArray["customer_info"])
    ) {
      theArray["customer_info"]['percent_discount'] = values;
      theArray["customer_info"]['perDiscountMng'] = values + '%';
      dispatch('setLocalStore', { feild: 'customer_info', data: theArray["customer_info"] })
      dispatch('setSession', { feild: 'customer_info', data: theArray["customer_info"] })

    }
    let percent = parseFloat(values);
    // console.log('percent =>' , percent)
    // CHANGE PERCENT DISCOUNT
    let diffPrice = 0;
    let namNew = 0;

    let clnItems = []
    if (_.isUndefined(state.keepDiscountAPV.items)) {
      clnItems = _.cloneDeep(state.items_order);
    } else {
      clnItems = _.cloneDeep(state.keepDiscountAPV.items);
    }

// console.log(state.keepDiscountAPV)
    // let dis = _.isNaN(parseFloat(state.keepDiscountAPV.discount)) ? parseFloat(state.customer_info.percent_discount) : parseFloat(state.keepDiscountAPV.discount)
    // console.log(' theArray["customer_info"] => ',theArray["customer_info"])
    let dis = theArray["customer_info"]['default_discount']
    // console.log(';DUS = >' , dis)
    let per_c = percent == "" ? 0 : percent;
    // console.log('per_c =>' + per_c)
    // let  dis = 3;
    let difPerent = dis >= per_c ? per_c : per_c - dis;

    // console.log('ตั้งต้น => ' , dis)
    // console.log('เลือก => ' , per_c)
    // console.log('เอาไปคำนวน => ',difPerent )
    // console.log(state.items_order)
    // console.log('difPerent =>' , difPerent)
    // let difPerent = dis > per_c ? dis - per_c : per_c - dis;
    _.forEach(state.items_order, function (row, key1) {
      // console.log('forEach =>' , row)
      let oldAM = clnItems[key1]
      let price = parseFloat(row.order_qty) * parseFloat(row.price)
      let total = price * (per_c / 100)
      let nm = price - total;
      let nm2 = _.round(nm, 2);
      row.net_amount = nm2;

      let rsNetPrice =
        parseFloat(row.price) * (parseFloat(per_c) / 100);
      let rsNetPrice2 = _.round(rsNetPrice, 2);

      let npp = parseFloat(row.price) - rsNetPrice2;
      let npp2 = _.round(npp, 2);

      row.net_price = npp2;

      let p_dis = parseFloat(row.price) * (parseFloat(difPerent) / 100)
      let p_dis4 = _.round(p_dis, 4);
      let p_dis2 = p_dis4 * parseInt(row.order_qty);
      let p_dis5 = _.round(p_dis2, 4);
      row.last_discount_new = _.round(p_dis5, 2);

      // if (_.isUndefined(row.ref_po_no) || _.trim(row.ref_po_no.length) < 2) {
      if (dis >= per_c ) {
        // console.log('- 1 -',oldAM.budget , state.customer_info)
        row.budget =  parseFloat(state.customer_info.sum_budget) 
      } else {
        // console.log('- 2 -')
        let price = parseFloat(row.price)
        let ppu = parseFloat(row.ppu)
        let priceVD = parseFloat(row.priceVD)
        let dif = (difPerent / 100)
        let step2_r = 0
        let step4 = 0

        // console.log('priceVD =>' , priceVD)
        // console.log('price =>' , price)

        if (priceVD > 0 && priceVD >= price && price > 0) {
          console.log('- 3 -')
          let step1 = price * dif
          let step2 = price - step1
          step2_r = _.round(step2, 4)
          let step3 = _.round(step2_r, 4);
          step4 = price - step3
          // console.log("==>",step4)
        } else if (priceVD > 0 && priceVD >= price && price == 0) {
          // console.log('- 4 -')
          if (row.flag_status != 'FV' && row.flag_status != 'F') {
            // console.log('- 5 -')
            let step1 = priceVD * dif
            let step2 = priceVD - step1
            step2_r = _.round(step2, 4)
            let step3 = _.round(step2_r, 4);
            step4 = priceVD - step3
            // console.log("1 ==>")
          }
        } else if (priceVD == 0 && price > 0) {
          // console.log('- 6 -')
          let step1 = price * dif
          let step2 = price - step1
          step2_r = _.round(step2, 4)
          let step3 = _.round(step2_r, 4);
          step4 = price - step3
          // console.log("2 ==>")
        } else if (priceVD == 0 && price == 0) {
          // console.log('- 7 -')
          /*
          let step1 = ppu * dif
          let step2 = ppu - step1
          step2_r = _.round(step2, 4)
          let step3 = _.round(step2_r, 4);
          step4 = ppu - step3
          */
        }
        let step5 = _.round(step4, 4);
        let step6 = step5 * parseInt(row.order_qty);
        // console.log(step5 , '*', parseInt(row.order_qty))
        // console.log('step6' , row)
        let cal_price = 0.00
        if(parseFloat( row.ppu )  >= row.price && parseFloat(row.price) == 0 ){
            if(parseFloat( row.priceVD ) > 0){
              cal_price = ( row.priceVD   - row.price )* row.order_qty
            }else {
              cal_price = ( row.ppu   - row.price )* row.order_qty
            }
          
        }else if(parseFloat( row.ppu )  >= row.price 
        &&( row.flag_status == 'CP' || row.flag_status == 'CV')
        && parseFloat( row.price ) < parseFloat( row.ref_price ) 
        ){
          if(parseFloat( row.priceVD) != '' &&parseFloat(row.priceVD) != 0 ){
            cal_price = ( row.priceVD - row.price )* row.order_qty
          }else {
            cal_price = ( row.ppu - row.price )* row.order_qty
          }
          
        }
        // console.log(cal_price)
        row.budget =   parseFloat(cal_price) + ( (difPerent / 100 ) *  parseFloat( row.amount) )
        // console.log(difPerent ,  row.amount)
        // console.log(row.budget , ' = ',   _.round(step6, 2) ,'+', cal_price ,'+ ( (', difPerent ,'/, 100 ) * ',  row.amount  ,')'  )
      }
    
      let sum = namNew + parseFloat(row.budget)
        // console.log(namNew , parseFloat(row.budget))
      // console.log("🚀 ~ file: myorders.js:4229 ~ sum", row)
      let sum5 = _.round(sum, 2);
      // console.log("🚀 ~ file: myorders.js:4258 ~ sum5", sum5)
      namNew = sum5
      // console.log(row.amount , "*" , (per_c/100))
      // row.last_discount = row.amount * ( per_c / 100 )
      // console.log('row =>' , row )
      // }
    });
    _.forEach(state.items_promo_order, function (row, key1) {
      _.forEach(row.products, function (record, key2) {
        if (dis > per_c) {
          record.budget = 0
        } else {
          let dif = (difPerent / 100)
          let step1 = parseFloat(record.price) * dif
          let step2 = parseFloat(record.price) - step1
          let step2_r = _.round(step2, 4)
          let step3 = _.round(step2_r, 4);
          let step4 = parseFloat(record.price) - step3
          let step5 = _.round(step4, 4);
          let step6 = step5 * parseInt(record.order_qty);
          record.budget = _.round(step6, 2)
        }

        let p_dis = parseFloat(record.price) * (parseFloat(difPerent) / 100)
        let p_dis4 = _.round(p_dis, 4);
        let p_dis2 = p_dis4 * parseInt(record.order_qty);
        let p_dis5 = _.round(p_dis2, 4);
        record.last_discount_new = _.round(p_dis5, 2);

        diffPrice = diffPrice + record.budget;

        let rsNetPrice =
          parseFloat(record.price) * (parseFloat(per_c) / 100);
        let rsNetPrice2 = _.round(rsNetPrice, 2);

        let npp = parseFloat(record.price) - rsNetPrice2;
        let npp2 = _.round(npp, 2);

        record.net_price = npp2;
        let nm = record.net_price * parseFloat(record.order_qty);
        let nm2 = _.round(nm, 2);
        record.net_amount = nm2

      });
      row.net_amount = row.products.reduce(
        (acc, row) => acc + parseFloat(row.net_amount),
        0
      );
    });
    _.forEach(state.items_freegift, function (row) {
      let rsA2 = _.round(row.amount, 2);

      let dc = (rsA2 * percent) / 100;
      let nm = rsA2 - dc;
      let nm2 = _.round(nm, 2);
      row.net_amount = nm2;
      let per_c = percent == "" ? 0 : percent;
      let p_dis = parseFloat(row.price) * (parseFloat(per_c) / 100)
      let p_dis4 = _.round(p_dis, 4);
      let p_dis2 = p_dis4 * parseInt(row.order_qty);
      let p_dis5 = _.round(p_dis2, 4);
      row.last_discount_new = _.round(p_dis5, 2);

      let rsNetPrice = parseFloat(row.price) * (parseFloat(percent) / 100)
      let rsNetPrice2 = _.round(rsNetPrice, 2);

      let nnp = parseFloat(row.price) - rsNetPrice2
      let nnp2 = _.round(nnp, 2);
      row.net_price = nnp2
    });

   if(dis >= per_c){
    // console.log(state.customer_info)
    state.sumBudgetAllRow = state.customer_info.sum_budget
    state.totalDiscount = (state.customer_info.percent_discount / 100) * state.totalAmount
    state.totalNetAmount = state.totalAmount - state.totalDiscount 
  }else {
      // console.log(' 11 + ', state.customer_info , namNew ,diffPrice)
        dispatch("sumTotalTable");
        let allBUdget = namNew + diffPrice
        let allBUdget2 = _.round(allBUdget, 2);
        state.sum_budget = parseFloat(allBUdget2)
    //  console.log('_____________________' , parseFloat(allBUdget2) )
        commit("setCompareBudget", allBUdget2);
        state.sumBudgetAllRow = state.sum_budget
        
   }
    dispatch('setLocalStore', { feild: 'sum_budget', data: state.sum_budget })
    dispatch('setLocalStore', { feild: 'compareBudget', data: state.compareBudget })
   
      // console.log('state.sum_budget =>' , state.sum_budget)
    dispatch('setSession', { feild: 'sum_budget', data: state.sum_budget })
    dispatch('setSession', { feild: 'compareBudget', data: state.compareBudget })

  },
  getPurcheseInfo: ({ commit, state, getters, dispatch }, values) => {
    let success = ordService.getPurcheseInfo(values, getters, state);
    /*CLEAR Commemt*/
    if (_.trim(success.doc_no).length == 0) {
      state.keep_comment_id = {};
      state.comment = [];
      commit('SET_POPUP_COMMENT', [])
      state.temp_comment_status = false;
      dispatch('setLocalStore', { feild: 'keep_comment_id', data: {} })
      dispatch('setLocalStore', { feild: 'temp_comment_status', data: false })
      dispatch('setLocalStore', { feild: 'comment', data: [] })
      dispatch('setLocalStore', { feild: 'popupComment', data: [] })

      dispatch('setSession', { feild: 'keep_comment_id', data: {} })
      dispatch('setSession', { feild: 'temp_comment_status', data: false })
      dispatch('setSession', { feild: 'comment', data: [] })
      dispatch('setSession', { feild: 'popupComment', data: [] })
    }
    /*-------------*/
    let percent = success.percent_discount;
    state.bigPromoset = [];
    // CHANGE PERCENT DISCOUNT
    _.forEach(state.items_order, function (row) {
      let dc = (row.amount * percent) / 100;
      let nm = row.amount - dc;
      let nm2 = _.round(nm, 2);
      row.net_amount = nm2;
      let per_c = percent == "" ? 0 : percent;

      let p_dis = parseFloat(row.price) * (parseFloat(per_c) / 100)
      let p_dis4 = _.round(p_dis, 4);
      let p_dis2 = p_dis4 * parseInt(row.order_qty);
      let p_dis5 = _.round(p_dis2, 4);
      row.last_discount = _.round(p_dis5, 2);
    });
    _.forEach(state.items_promo_order, function (row) {
      _.forEach(row.products, function (record) {
        let dc = (record.amount * percent) / 100;
        let nm = record.amount - dc;
        let nm2 = _.round(nm, 2);
        record.net_amount = nm2;
        let per_c = percent == "" ? 0 : percent;
        let p_dis = parseFloat(record.price) * (parseFloat(per_c) / 100)
        let p_dis4 = _.round(p_dis, 4);
        let p_dis2 = p_dis4 * parseInt(record.order_qty);
        let p_dis5 = _.round(p_dis2, 4);
        record.last_discount = _.round(p_dis5, 2);
      });
      row.net_amount = row.products.reduce(
        (acc, row) => acc + parseFloat(row.net_amount),
        0
      );
    });
    _.forEach(state.items_freegift, function (row) {
      let dc = (row.amount * percent) / 100;

      let am = row.amount - dc;
      let am2 = _.round(am, 2);
      row.net_amount = am2;

      let per_c = percent == "" ? 0 : percent;
      let p_dis = parseFloat(row.price) * (parseFloat(per_c) / 100)
      let p_dis4 = _.round(p_dis, 4);
      let p_dis2 = p_dis4 * parseInt(row.order_qty);
      let p_dis5 = _.round(p_dis2, 4);
      row.last_discount = _.round(p_dis5, 2);
    });

    dispatch("sumTotalTable");
    commit('setMasterShipto', [])
    dispatch('setLocalStore', { feild: 'master_shipto', data: [] })
    dispatch('setSession', { feild: 'master_shipto', data: [] })
    // เพิ่มเพื่อแจ้งเตือนกรณี api ship to 
    dispatch('reCallGetShipTo', { code: values.customer_code, data: success, action: 'getPurcheseInfo' })
    if (getters.customer_info.order_status === "DRF") {
      ordService
        .getSalesmanByCust(values)
        .then(response => {
          state.salesman_list = [];
          if (response == "null") {
            state.salesman_list = [
              {
                emp_id: Vue.localStorage.get("emp_id"),
                first_name: _.trim(Vue.localStorage.get("first_name")),
                last_name: _.trim(Vue.localStorage.get("last_name"))
              }
            ];
            state.customer_info.salesman_code = Vue.localStorage.get("emp_id");
          } else {
            setTimeout(function () {
              state.salesman_list = response;
              if (state.salesman_list.length > 0) {
                state.customer_info.salesman_code =
                  state.salesman_list[0].emp_id;
              }
            }, 0);
          }
        })
        .catch();
    }
    commit("setCustomerInfo", success);
    let cust_code = state.customer_info.customer_code;
    ordService
      .getPromoCG(cust_code, "all")
      .then(response => {
        state.product_cg = response.cg;
        state.product_group = response.group;
      })
      .catch();

    dispatch('setLocalStore', { feild: 'customer_info', data: success })
    dispatch('setLocalStore', { feild: 'items_order', data: state.items_order })
    dispatch('setLocalStore', { feild: 'items_promo_order', data: state.items_promo_order })
    dispatch('setLocalStore', { feild: 'items_freegift', data: state.items_freegift })
    dispatch('setLocalStore', { feild: 'bigPromoset', data: [] })
    dispatch('setLocalStore', { feild: 'salesman_list', data: state.salesman_list })
    dispatch('setLocalStore', { feild: 'product_cg', data: state.product_cg })
    dispatch('setLocalStore', { feild: 'product_group', data: state.product_group })
    
    dispatch('setSession', { feild: 'customer_info', data: success })
    dispatch('setSession', { feild: 'items_order', data: state.items_order })
    dispatch('setSession', { feild: 'items_promo_order', data: state.items_promo_order })
    dispatch('setSession', { feild: 'items_freegift', data: state.items_freegift })
    dispatch('setSession', { feild: 'bigPromoset', data: [] })
    dispatch('setSession', { feild: 'salesman_list', data: state.salesman_list })
    dispatch('setSession', { feild: 'product_cg', data: state.product_cg })
    dispatch('setSession', { feild: 'product_group', data: state.product_group })
  },
  searchCG: ({ commit, state , dispatch }, values) => {
    commit("setMasterCG", []);
    state.spinner_loading = true;
    ordService
      .searchCG(values, state)
      .then(response => {
        // console.log(response)
        let master1 = _.cloneDeep(response)
        if (response.length > 0 && state.items_promo_order.length > 0) {
            let itemFreegift = []
              //  console.log(state.items_promo_order)
     
          _.forEach(state.items_promo_order, function (row) {
            _.forEach(row.freeitems, function (rowItem) { 
              itemFreegift.push(rowItem)
            })
        })
            for (let index = 0; index < itemFreegift.length; index++) {
              const element = itemFreegift[index];
              // console.log(element)
              _.forEach(master1, function (row) {
                _.forEach(row.items, function (row_items) {
                  if(row_items.code == element.item_code  ){
                
                    if(row.items.length > 1){
                      // console.log(' > 1 =>',row.items)
                      row.items = row.items.filter(function( obj ) {
                        return obj.code !== element.item_code;
                      });
                        // console.log('row.items = <' , row.items)
                    }else {
                        // console.log('row.items = <' , row.items)
                      master1 = master1.filter(function( obj ) {
                        return obj.code !== row.code ;
                      });
                    }
                  }
                })
              })        
            }
        }
        // console.log('master1 =>' , response[0].items[0])
        
        response = master1 
       commit("setMasterCG", response);
        if(response.length == 1  ){
          // console.log(response[0])
          if(response[0].items.length == 1 && response[0].items[0].checked == false){
            // console.log('OK')
            response[0].items[0].checked = true
            response[0].checked = true
            dispatch('selectCG',response[0])
            // console.log(' 1 ',response)
          }
      } 
        state.spinner_loading = false;
        if (state.temp_master_cg.length == 0) {
          let masterCG = _.cloneDeep(response);
          state.temp_master_cg = masterCG;
        }
      })
      .catch();
  },

  filterCustomerAPV: ({ state }, values) => {
    ordService
      .filterCustomerAPV(values)
      .then(response => {
        state.apv_customer = response;
      })
      .catch();
  },
  filterSalemanAPV: ({ state }, values) => {
    ordService
      .filterSalemanAPV(values)
      .then(response => {
        state.apv_saleman = response;
      })
      .catch();
  },
  filterPonoAPV: ({ state }, values) => {
    ordService
      .filterPonoAPV(values)
      .then(response => {
        state.apv_pono = response;
      })
      .catch();
  },
  callTfCipher: ({ state }) => { },

  filterProdCG: ({ state }, values) => {
    let cust_code = state.customer_info.customer_code;
    ordService
      .getPromoCG(cust_code, values.prod_group)
      .then(response => {
        state.product_cg = response.cg;
      })
      .catch();
  },
  getStock: ({ commit, state, dispatch }, values) => {
    let row = "";
    if (values.table == "qtyItem" || values.table == "ppuItem") {
      row = state.items_order[values.index];
    } else if (values.table == "qtyPromo") {
      row = state.promo_seleceted[values.index];
    }
    if (values.table == "qtyItem") {
      let info = _.cloneDeep(state.customer_info);
      var itemNobk = _.filter(state.items_order, item => {
        if (_.isUndefined(item.ref_po_no) || item.ref_po_no.length < 2) {
          return true;
        }
      });

      let prod_code = _.map(itemNobk, "item_code");
      ordService
        .getStockByItems(row, info.pricetype_code, info.warehouse_code)
        .then(response => {
          if (_.isBoolean(response.stock) == false) {
            if (response.stock < row.order_qty) {
              state.items_order[values.index].error_stock =
                response.stock + " left in stock";
            } else {
              state.items_order[values.index].error_stock = "";
            }
            commit('setItems', state.items_order)
          }
        })
        .catch();
      // FIX PRICE---------------
      if (
        (_.toUpper(state.customer_info.price_policy_code) == "AUTO" &&
          _.toUpper(state.customer_info.customer_channel_code) == "100") ||
        _.toUpper(state.customer_info.price_policy_code) == "FLEX"
      ) {
        // console.log("price_policy => 3")

        if (row.flag_status != 'F' && row.flag_status != 'FV') {
          // state.spinner_order = true;
          var step1 = _.filter(state.items_order, o => {
            if (_.isUndefined(o.ref_po_no) || o.ref_po_no.length < 2) {
              return true;
            }
          });
          var step2 = _.filter(step1, o => {
            if (o.flag_status != 'F' && o.flag_status != 'FV') {
              return true;
            }
          });
          let prod_code2 = _.map(step2, "item_code");
          state.spinner_order_vd = true;
          let priceForVd =
            _.toUpper(state.customer_info.price_policy_code) == "AUTO"
              ? info.pricetype_code
              : info.pricefix_code;
          ordService
            .getVolumeDis(prod_code2, priceForVd)
            .then(result => {
              // console.log("===>")
              // state.spinner_order = true;
              let tempVD = [];
              result.forEach(function (group) {
                let item = group["details"].find(
                  todo => todo.item_code === row.item_code
                );
                if (!_.isUndefined(item)) {
                  tempVD.push(group)
                }
              });
              if (tempVD.length > 0) {
                dispatch("checkRange", { tempVD, row });
              } else {
                Vue.localStorage.set("FOCUS_INPUT", 'OUT');
                state.spinner_order_vd = false;
                // state.spinner_order = false;
              }
            })
            .catch();
        }
      }
    }
  },
  checkRange: ({ state, commit, dispatch }, value) => {
    let t = state.customer_info;
    let runProdByCode = {};
    let tempVD = value['tempVD']
    let data = _.cloneDeep(state.items_order);
    setTimeout(function () {
      // console.log(tempVD[0])
      if (tempVD[0].type == 'Indipendent') {
        // console.log("if qty => 2")
        tempVD.forEach(function (group) {
          let item = group["details"].find(
            todo => todo.item_code === value['row'].item_code
          );
          let idx = _.findIndex(data, { 'item_code': value['row'].item_code });
          if (idx >= 0) {
            if (
              _.isUndefined(data[idx].ref_po_no) ||
              _.trim(data[idx].ref_po_no).length < 2
            ) {
              if (typeof item != "undefined") {
                _.forEach(group["volume_discount"], function (val, index) {
                  let cldVal = _.cloneDeep(val[0]);
                  if (typeof cldVal != "undefined") {
                    let end = _.isNumber(cldVal.end) ? cldVal.end : 9999999;
                    let dis = parseInt(t.percent_discount) / 100;
                    let pr = '';
                    let vd_price_code = '';
                    let obj = {
                      end: end,
                      start: cldVal.start,
                      type: index
                    };
                    val[0] = obj;
                    if (
                      _.inRange(data[idx].order_qty, cldVal.start, end) || (
                        data[idx].order_qty == cldVal.start
                      ) || (
                        data[idx].order_qty == end
                      )
                    ) {
                      if (item["price"][index] == false) {
                        pr = data[idx].ppu;
                      } else if (
                        item["price"][index] != false &&
                        typeof item["price"][index] != "undefined"
                      ) {
                        pr = item["price"][index].price;
                        vd_price_code = item["price"][index].default_price_code;
                      }
                      let pr2 = _.round(pr, 2);
                      data[idx].vd_price_code = vd_price_code;
                      data[idx].priceVD = pr2;
                      if (data[idx].flag_status == "G") { b
                        data[idx].price = pr2;
                      }

                      let amount = data[idx].price * parseInt(data[idx].order_qty);
                      let amount2 = _.round(amount, 2);
                      let total = amount2 * dis;
                      let totalP = data[idx].price * dis;

                      let np = data[idx].price - totalP;
                      let np2 = _.round(np, 2);
                      data[idx].net_price = np2;
                      data[idx].amount = amount2;

                      let step1 = parseFloat(data[idx].price) * dis;
                      let step2 = _.round(step1, 4);
                      let step4 = step2 * parseInt(data[idx].order_qty);
                      let step5 = _.round(step4, 4);
                      let step6 = _.round(step5, 2);
                      let step7 = data[idx].amount - step6
                      data[idx].net_amount = _.round(step7, 2);
                      // data[idx].net_amount = data[idx].amount - step6;

                      let p_dis = parseFloat(data[idx].price) * (parseFloat(t.percent_discount) / 100)
                      let p_dis4 = _.round(p_dis, 4);
                      let p_dis2 = p_dis4 * parseInt(data[idx].order_qty);
                      let p_dis5 = _.round(p_dis2, 4);
                      data[idx].last_discount = _.round(p_dis5, 2);


                      let budget = 0
                      if (parseFloat(data[idx].price) < parseFloat(data[idx].priceVD) && parseFloat(data[idx].priceVD) > 0 && parseFloat(data[idx].ppu) > 0) {
                        /*if (parseFloat(data[idx].priceVD) >= parseFloat(data[idx].price) && parseFloat(data[idx].priceVD) > 0) {*/
                        budget = (parseFloat(data[idx].priceVD) - parseFloat(data[idx].price)) * parseFloat(data[idx].order_qty)
                        let budget2 = _.round(budget, 2);
                        data[idx].budget = budget2
                        // console.log("===> ", budget2)
                      }
                    }
                  }
                });
                data[idx].group = [group];
                if (data[idx].flag_status != "F" && data[idx].flag_status != "FV") {
                  data[idx].volDiscount = "Y";
                  if (data[idx].flag_status == 'A') {
                    data[idx].flag_status = "G";
                  }
                  data[idx].budget = 0;
                }
              }
            }
          }
        });
      } else {
        // console.log("else qty => 2")
        let keepData = []
        tempVD.forEach(function (group) {
          runProdByCode[group.group_id] = 0;
          data.forEach(function (row) {
            if (
              _.isUndefined(row.ref_po_no) ||
              _.trim(row.ref_po_no).length < 2
            ) {
              let item = group["details"].find(
                todo => todo.item_code === row.item_code
              );
              if (!_.isUndefined(item) && (row.flag_status != 'F' || row.flag_status != "FV")) {
                _.forEach(group["volume_discount"], function (val, index) {
                  let cldVal = _.cloneDeep(val[0]);
                  if (typeof cldVal != "undefined") {
                    let obj = {
                      end: _.isNumber(cldVal.end) ? cldVal.end : 9999999,
                      start: cldVal.start,
                      type: index
                    };
                    val[0] = obj;
                  }
                });
                row.group = [group];
                if (row.flag_status != "F" && row.flag_status != "FV") {
                  runProdByCode[group.group_id] =
                    runProdByCode[group.group_id] + parseInt(row.order_qty);
                  row.volDiscount = "Y";
                  if (row.flag_status == 'A') {
                    row.flag_status = "G";
                  }
                  row.budget = 0
                }
                keepData.push(row)
              }
            }
          });
        });
        let priceCode = {};
        tempVD.forEach(function (group) {
          _.forEach(group["volume_discount"], function (val, index) {
            let cldVal = _.cloneDeep(val[0]);
            if (typeof cldVal != "undefined") {
              if (
                _.inRange(runProdByCode[group.group_id], cldVal.start, cldVal.end)
                || (runProdByCode[group.group_id] == cldVal.start)
                || (runProdByCode[group.group_id] == cldVal.end)
              ) {
                priceCode[group.group_id] = cldVal.type;
              }
            }
          });

          keepData.forEach(function (row) {
            if (
              _.isUndefined(row.ref_po_no) ||
              _.trim(row.ref_po_no).length < 2
            ) {
              let item = group["details"].find(
                todo => todo.item_code === row.item_code
              );
              if (!_.isUndefined(item)) {
                if (row.flag_status != 'F' && row.flag_status != 'FV') {
                  let dis = parseInt(t.percent_discount) / 100;
                  let pr = ''
                  let vd_price_code = ''
                  if (item["price"][priceCode[group.group_id]] == false) {
                    pr = row.ppu;
                  } else if (
                    item["price"][priceCode[group.group_id]] != false &&
                    typeof item["price"][priceCode[group.group_id]] != "undefined"
                  ) {
                    pr = item["price"][priceCode[group.group_id]].price;
                    vd_price_code = item["price"][priceCode[group.group_id]].default_price_code
                  }
                  let pr2 = _.round(pr, 2);
                  row.priceVD = pr2;
                  row.vd_price_code = vd_price_code;
                  // for case free gift display vd
                  let keyItemF = _.findIndex(data, function (o) {
                    return (
                      o.item_code == row.item_code && (o.flag_status == "FV" || o.flag_status == "F")
                    );
                  });
                  if (keyItemF >= 0) {
                    let rowFV = data[keyItemF];
                    rowFV.priceVD = row.priceVD;
                    let b = row.priceVD * parseFloat(rowFV.order_qty)
                    let budget4F = _.round(b, 4);
                    let budget3F = _.round(budget4F, 3);
                    let budget2F = _.round(budget3F, 2);
                    rowFV.budget = budget2F;
                    data[keyItemF] = rowFV;
                  }

                  if (row.price != parseFloat(row.ppu) && row.price == pr2) {
                    row.flag_status = 'G'
                    if (parseInt(row.order_qty) > 0) {
                      row.price = pr2;
                    }
                  } else if (row.price != parseFloat(row.ppu) && row.price != pr2 && row.flag_status != 'G') {
                    row.flag_status = 'CV'
                  } else {
                    // if (parseInt(row.order_qty) > 0) {
                      row.price = pr2;
                    // }
                  }
                  let amount = row.price * parseInt(row.order_qty);
                  let amount2 = _.round(amount, 2);
                  let total = amount2 * dis;
                  let totalP = row.price * dis;
                  let npp = row.price - totalP;
                  let npp2 = _.round(npp, 2);
                  row.net_price = npp2;
                  row.amount = amount2;
                  let step1 = parseFloat(row.price) * dis;
                  let step2 = _.round(step1, 4);
                  let step4 = step2 * parseInt(row.order_qty);
                  let step5 = _.round(step4, 4);
                  let step6 = _.round(step5, 2);
                  let step7 = row.amount - step6;
                  row.net_amount = _.round(step7, 2);
                  // row.net_amount = row.amount - step6;

                  let p_dis = parseFloat(row.price) * (parseFloat(t.percent_discount) / 100)
                  let p_dis4 = _.round(p_dis, 4);
                  let p_dis2 = p_dis4 * parseInt(row.order_qty);
                  let p_dis5 = _.round(p_dis2, 4);
                  row.last_discount = _.round(p_dis5, 2);

                  let budget = 0
                  if (parseFloat(row.price) < parseFloat(row.priceVD) && parseFloat(row.priceVD) > 0 && parseFloat(row.ppu) > 0) {
                    /*if (parseFloat(row.priceVD) >= parseFloat(row.price) && parseFloat(row.priceVD) > 0) {*/
                    budget = (parseFloat(row.priceVD) - parseFloat(row.price)) * parseFloat(row.order_qty)
                    let budget2 = _.round(budget, 2);
                    row.budget = budget2
                    // console.log("2 ===> ", budget2)
                  }
                } else {
                  if (group.details.length > 0 && !_.isUndefined(value.type)) {
                    if (value.type == 'del' || value.type == 'selectItem' || value.type == 'selectCG') {
                      var deep = _.cloneDeep(state.items_order);
                      let dataNoF = _.filter(deep, function (o) { return o.flag_status != 'F' && o.flag_status != 'FV'; });
                      let map1 = _.map(dataNoF, 'item_code');
                      let map2 = _.map(group.details, 'item_code');
                      let uniq = _.intersection(map1, map2);
                      // for case free gift display vd
                      let keyItemF = _.findIndex(data, function (o) {
                        return (
                          o.item_code == row.item_code && (o.flag_status == "FV" || o.flag_status == "F")
                        );
                      });
                      let keyItemAll = _.filter(data, function (o) {
                        return (
                          o.item_code == row.item_code
                        );
                      });
                      if (keyItemF >= 0 && keyItemAll.length == 1) {
                        let rowFV = data[keyItemF];
                        rowFV.priceVD = 0;
                        let budget4F = _.round(rowFV.ppu, 4);
                        let budget3F = _.round(budget4F, 3);
                        let budget2F = _.round(budget3F, 2);
                        // console.log('5101')
                        rowFV.priceMaster = rowFV.ppu;
                        rowFV.budget = budget2F;
                        rowFV.flag_status = 'F';
                        data[keyItemF] = rowFV;
                      }
                    }
                  }
                }
              }
            }
          });
        });
      }
      commit("setItems", data);
      state.spinner_order_vd = false;
      Vue.localStorage.set("FOCUS_INPUT", 'OUT');
      // state.spinner_order = false;
      dispatch("sumTotalTable");
    }, 0);
  },
  checkStepRange: ({ commit, state, dispatch }, value) => {
    // FIX PRICE---------------
    if (
      (_.toUpper(state.customer_info.price_policy_code) == "AUTO" &&
        _.toUpper(state.customer_info.customer_channel_code) == "100") ||
      _.toUpper(state.customer_info.price_policy_code) == "FLEX"
    ) {
      // console.log("price_policy => 4")

      let cloneItem = _.cloneDeep(state.items_order);
      let textRange = []
      let temp = [];
      var gup = _.filter(cloneItem, item => {
        if (typeof item.group != 'undefined') {
          return true;
        }
      });
      if (typeof value['group'] != "undefined") {
        _.forEach(value['group'], function (group) {
          _.forEach(group["volume_discount"], function (val, index) {
            let cldVal = _.cloneDeep(val[0]);
            if (typeof cldVal != "undefined") {
              if (index == "C0") {
                textRange.push({ code: index, title: "> " + cldVal.start });
              } else {
                textRange.push({ code: index, title: cldVal.start + " - " + cldVal.end });
              }
            }
          });
          _.forEach(gup, function (records) {
            let items = group["details"].find(
              rs => rs.item_code === records.item_code && (records.flag_status != 'F' && records.flag_status != 'FV')
            );
            if (typeof items != "undefined") {
              temp.push(records)
            }
          });
        });
      } else {
        let info = _.cloneDeep(state.customer_info);
        var itemNobk = _.filter(state.items_order, item => {
          if (_.isUndefined(item.ref_po_no) || item.ref_po_no.length < 2) {
            return true;
          }
        });
        let prod_code = _.map(itemNobk, "item_code");
        let priceForVd =
          _.toUpper(state.customer_info.price_policy_code) == "AUTO"
            ? info.pricetype_code
            : info.pricefix_code;
        ordService
          .getVolumeDis(prod_code, priceForVd)
          .then(result => {
            state.spinner_order = true;
            let tempVD = [];
            result.forEach(function (groups) {
              state.items_order.forEach(function (record, key) {
                let item = groups["details"].find(
                  todo => todo.item_code === record.item_code
                );
                if (!_.isUndefined(item) && _.isUndefined(record.ref_po_no) || record.ref_po_no.length < 2) {
                  state.items_order[key].group = [groups]
                  dispatch("checkStepRange", value);
                }
              });
            });

            if (tempVD.length > 0) {
              dispatch("checkRange", { tempVD, value });
            } else {
              state.spinner_order = false;
            }
          })
          .catch();
      }
      let total = temp.reduce(
        (acc, row) => acc + parseFloat(row.order_qty),
        0
      );
      commit("setVolDisList", temp);
      commit("setTotalvolDis", total);
      state.textRange = textRange
      state.thisPage.optVolDis.display = true;
    }
  },
  deleteOrder: ({ state, dispatch }) => {
    if (
      state.customer_info.order_status === "DRF" ||
      state.customer_info.order_status === "DRF_PR" ||
      state.customer_info.order_status === "REC" ||
      state.customer_info.order_status === "REC_PR"
    ) {
      ordService
        .deleteOrder(state)
        .then(response => {
          dispatch("getOrderBySales", {
            year: state.date_selected.year,
            month: state.date_selected.month
          });
        })
        .catch();
    }
  },
  checkMinimum: ({ commit, dispatch }, value) => {
    ordService
      .checkMinimum(value)
      .then(response => {
        if (response.length == 0) {
          commit("setMinimumSales", false);
          dispatch('setLocalStore', { feild: 'minimumSales', data: false })
          dispatch('setSession', { feild: 'minimumSales', data: false })
        } else {
          commit("setMinimumSales", parseFloat(response[0].minimum));
          dispatch('setLocalStore', { feild: 'minimumSales', data: parseFloat(response[0].minimum) })
          dispatch('setSession', { feild: 'minimumSales', data: parseFloat(response[0].minimum) })
        }
      })
      .catch();
  },
  getMstDiscount: ({ state, dispatch }) => {
    ordService
      .getMstDiscount()
      .then(response => {
        // console.log('getMstDiscount =>' , response)
        state.mstDiscount = response;
        dispatch('setLocalStore', { feild: 'mstDiscount', data: response })
        dispatch('setSession', { feild: 'mstDiscount', data: response })
      })
      .catch();
  },
  getBudget: ({ commit, dispatch }, value) => {
    if (value.mode == "show") {
      value.po_no = state.customer_info.po_no
      value.h_id = state.customer_info.h_id
      ordService
        .getBudget(value)
        .then(response => {
          if (response.length == 0) {
            commit("setBudget", false);
            dispatch('setLocalStore', { feild: 'budget', data: false })
            dispatch('setSession', { feild: 'budget', data: false })
          } else {
            commit("setBudget", response.balance);
            dispatch('setLocalStore', { feild: 'rolecode', data: response.role_code })
            // commit("setRoleCode", response.role_code);
            dispatch('setLocalStore', { feild: 'budget', data: response.balance })
            dispatch('setSession', { feild: 'budget', data: response.balance })
          }
        })
        .catch();
    } else {
      value.po_no = state.customer_info.po_no
      value.h_id = state.customer_info.h_id
      ordService
        .saveBudget(value)
        .then(response => {
          // state.mstDiscount = response
        })
        .catch();
    }
  },
  flagDiscont: ({ commit }, value) => {
    ordService
      .flagDiscont(value)
      .then(response => { })
      .catch();
  },
  getDeliveryDate: ({ dispatch, state, commit }, value) => {
    let nowD = moment(new Date()).format("YYYY-MM-DD");
    let nowALL = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    var podate = new Date(nowD);
    if (state.customer_info.po_date.length > 0) {
      podate = new Date(state.customer_info.po_date);
    }
    var po_dd = podate.getDate();
    var po_mm = podate.getMonth();
    var po_y = podate.getFullYear();
    let rsPoDate = moment(new Date(po_y, po_mm, po_dd + 1)).format(
      "YYYY-MM-DD"
    );
    /*
    if (_.trim(state.customer_info.delivery_date_cipher).length == 0) {
      state.customer_info.delivery_date_cipher = nowALL;
    }
    */
    Vue.http.get(Vue.config['url'] + '/get-delivery-date', {
      params: {
        customer_code: value.customer_code,
        po_date: value.po_date
      },
      headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
    }).then(response => {
      let result = response.body.success.data;
      // console.log(state.customer_info)
      let rs = result.deliverydate;
      state.customer_info.delivery_log = rs;
      state.deliverydate_servercipher =  result.server_date;
      
      if (_.trim(state.customer_info.delivery_date_cipher).length == 0) {
        state.customer_info.delivery_date_cipher = result.server_date;
      }
      if (state.customer_info.order_status == 'DRF' && _.trim(state.customer_info.doc_no).length == 0) {
        state.customer_info.po_date = result.po_date;
      }

      let checkFM = moment(rs, [
        "YYYY-MM-DD",
        "YYYY-MM-DD HH:mm:ss"
      ]).format();
      if (checkFM != 'Invalid date' && !_.isUndefined(rs)) {
        let bf = moment(rs).isBefore(podate);
        if (bf) {
          state.customer_info.delivery_date = rsPoDate
          state.thisPage.openCF("deliverydate");
        } else {
          state.customer_info.delivery_date = rs;
          // let obj = Vue.localStorage.get("ORD_DIALOG");
          let obj = sessionStorage.getItem('keep_order_session')
          let theArray = JSON.parse(obj);
          if (
            !_.isUndefined(theArray["customer_info"]) ||
            !_.isNull(theArray["customer_info"])
          ) {
            theArray["customer_info"]['delivery_date'] = rs;
            theArray["customer_info"]['delivery_log'] = rs;
            // console.log(theArray["customer_info"])
            dispatch('setLocalStore', { feild: 'customer_info', data: theArray["customer_info"] })
            dispatch('setSession', { feild: 'customer_info', data: theArray["customer_info"] })

          }
        }

        /*
        if (!_.isUndefined(rs)) {
        let checkY = rs.split("-");
        if (_.trim(rs).length >= 10 && parseFloat(checkY[0]) >= parseFloat(po_y)) {
          state.customer_info.delivery_date = rs;
          // state.customer_info.delivery_log = rs;
          let obj = Vue.localStorage.get("ORD_DIALOG");
          let theArray = JSON.parse(obj);
          if (
            !_.isUndefined(theArray["customer_info"]) ||
            !_.isNull(theArray["customer_info"])
          ) {
            theArray["customer_info"]['delivery_date'] = rs;
            theArray["customer_info"]['delivery_date'] = rs + ' ' + nowT;
            dispatch('setLocalStore', { feild: 'customer_info', data: theArray["customer_info"] })
          }
        } else {
          state.customer_info.delivery_date = rsPoDate
          state.thisPage.openCF("deliverydate");
        }*/
      } else {
        state.customer_info.delivery_date = rsPoDate
        state.thisPage.openCF("deliverydate");
      }
      // let obj = Vue.localStorage.get("ORD_DIALOG");
      let obj = sessionStorage.getItem('keep_order_session')

      
      let theArray = JSON.parse(obj);
      if (
        !_.isUndefined(theArray["customer_info"]) ||
        !_.isNull(theArray["customer_info"])
      ) {
        theArray["customer_info"]['delivery_log'] = rs;
        dispatch('setLocalStore', { feild: 'customer_info', data: theArray["customer_info"] })
        dispatch('setSession', { feild: 'customer_info', data: theArray["customer_info"] })

      }
      // success callback
    }, response => {
      // error callback
      if (response.status == 500) {
        state.customer_info.delivery_log = 'Front issue  api error';
        state.customer_info.delivery_date = rsPoDate
        state.thisPage.openCF("deliverydate");
        // let obj = Vue.localStorage.get("ORD_DIALOG");
        let obj = sessionStorage.getItem('keep_order_session')
        let theArray = JSON.parse(obj);
        if (
          !_.isUndefined(theArray["customer_info"]) ||
          !_.isNull(theArray["customer_info"])
        ) {
          theArray["customer_info"]['delivery_log'] = 'Front issue  api error';
          dispatch('setLocalStore', { feild: 'customer_info', data: theArray["customer_info"] })
          // console.log('13')
          dispatch('setSession', { feild: 'customer_info', data: theArray["customer_info"] })

        }
      } else {
        state.customer_info.delivery_log = 'Front issue api error not 500';
      }
    });
  },
  dupOrder: ({ commit, state }, value) => { },
  clearDialog: ({ commit, state }) => {
    state.thisPage.headChk = false;
    state.thisPage.btnPreviewOrder = false;
    state.thisPage.unitBtn = false;
    state.thisPage.delBtn = false;
    commit("setItems", []);
    commit("keepPromoCode", null);
    commit("setPromotions", []);
    commit("setFreegift", []);
    commit("keepFreegiftCode", []);
    commit("setMasterCG", []);
    commit('setBkMode', 'OD')
    state.bigData = [];
    state.items_order_bk = [];
    state.bigPromoset = [];
    state.fucusCustomer = "";
    state.totalPromo = {
      netPrice: 0,
      orderQty: 0,
      netAmount: 0,
      countItem: 0,
      amount: 0
    };
    state.paybycash_list = {
      cust_addr1: "",
      cust_addr2: "",
      cust_addr3: "",
      sent_to_cus_name: "",
      receive_name: "",
      tax_id: ""
    };
    state.temp_comment_status = false;
    state.flow = [];
    let obj = {
      id: "",
      customer_code: "",
      customer_coded: "",
      customer_name: "-",
      po_no: "",
      doc_no: "",
      po_date: "",
      term: "",
      creator: "",
      user_create: "",
      ship_to: "",
      salesman_code: "",
      delivery_date: "",
      delivery_date_cipher: "",
      delivery_log: '',
      default_discount:0,
      percent_discount: 0,
      perDiscountMng: 0 + "%",
      discount: 0,
      warehouse_code: 0,
      priority: 1,
      take_note: "",
      credit_limit: 0,
      outstanding: 0,
      order_value: 0,
      balance: "--",
      credit_rating: "-",
      order_status: "DRF",
      payByCash: false,
      pay_by_cash: false,

      //FIX PRICE------------
      pricetype_code: "-",
      price_policy_code: '',
      price_policy_title: '',
      pricefix_code: '',
      pricefix_title: '',
      pricebook_code: '',
      pricebook_title: '',
      customer_channel_code: '',
      customer_channel_title: '',
    };
    state.order_selected = obj;
    state.sumBudgetAllRow = 0
    state.totalNetAmount = 0;
    state.totalOrderQty = 0;
    state.totalAmount = 0;
    state.totalDiscount = 0;
    state.totalItems = 0;
    commit("setCustomerInfo", obj);
    Vue.localStorage.set("FOCUS_INPUT", 'OUT');
  },
  clearDataFromCUst: ({ commit, state }) => {
    commit("setItems", []);
    commit("keepPromoCode", null);
    commit("setPromotions", []);
    commit("setFreegift", []);
    commit("keepFreegiftCode", []);
    commit("setMasterCG", []);
    state.bigData = [];
    state.bigPromoset = [];
  },
  hilightRow: ({ commit, state }, values) => {
    let draft_list = _.cloneDeep(state.draft_list);
    let pending_list = _.cloneDeep(state.pending_list);
    let completed_list = _.cloneDeep(state.completed_list);
    let reject_list = _.cloneDeep(state.reject_list);

    if (draft_list.length > 0) {
      let checkedTrue = draft_list.find(todo => todo.checked === true);
      let indexTrue = draft_list.indexOf(checkedTrue);
      if (indexTrue >= 0) {
        draft_list[indexTrue].checked = false;
      }
      let checkedItem = draft_list.find(todo => todo.doc_no === values);
      let indexItem = draft_list.indexOf(checkedItem);
      if (indexItem >= 0) {
        draft_list[indexItem].checked = true;
      }
      commit("setDraftList", draft_list);
    }
    if (pending_list.length > 0) {
      let checkedTrue = pending_list.find(todo => todo.checked === true);
      let indexTrue = pending_list.indexOf(checkedTrue);
      if (indexTrue >= 0) {
        pending_list[indexTrue].checked = false;
      }
      let checkedItem = pending_list.find(todo => todo.doc_no === values);
      let indexItem = pending_list.indexOf(checkedItem);
      if (indexItem >= 0) {
        pending_list[indexItem].checked = true;
      }
      commit("setPenddingList", pending_list);
    }
    if (completed_list.length > 0) {
      let checkedTrue = completed_list.find(todo => todo.checked === true);
      let indexTrue = completed_list.indexOf(checkedTrue);
      if (indexTrue >= 0) {
        completed_list[indexTrue].checked = false;
      }
      let checkedItem = completed_list.find(todo => todo.doc_no === values);
      let indexItem = completed_list.indexOf(checkedItem);
      if (indexItem >= 0) {
        completed_list[indexItem].checked = true;
      }
      commit("setCompleteList", completed_list);
    }
    if (reject_list.length > 0) {
      let checkedTrue = reject_list.find(todo => todo.checked === true);
      let indexTrue = reject_list.indexOf(checkedTrue);
      if (indexTrue >= 0) {
        reject_list[indexTrue].checked = false;
      }
      let checkedItem = reject_list.find(todo => todo.doc_no === values);
      let indexItem = reject_list.indexOf(checkedItem);
      if (indexItem >= 0) {
        reject_list[indexItem].checked = true;
      }
      commit("setRejectList", reject_list);
    }
  },
  getFormList: ({ state }) => {
    formService
      .getFormList()
      .then(response => {
        let rs = [];
        let key = state.keepRouter ? "create_order" : "approved_order";
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
  }
};

const getters = {
  date_selected: state => {
    return state.date_selected;
  },
  summary_bar: state => {
    return state.summary_bar;
  },
  spinner_loading: state => {
    return state.spinner_loading;
  },
  autocom_cg: state => {
    return state.autocom_cg;
  },
  items_order: state => {
    return state.items_order;
  },
  master_cg: state => {
    return state.master_cg;
  },
  customer_info: state => {
    return state.customer_info;
  },
  temp_master_cg: state => {
    return state.temp_master_cg;
  },
  draft_list: state => {
    return state.draft_list;
  },
  pending_list: state => {
    return state.pending_list;
  },
  completed_list: state => {
    return state.completed_list;
  },
  reject_list: state => {
    return state.reject_list;
  },
  promo_seleceted: state => {
    return state.promo_seleceted;
  },
  comment: state => {
    return state.comment;
  },
  totalDiscount: state => {
    return state.totalDiscount;
  },
  totalNetAmount: state => {
    return state.totalNetAmount;
  },
  totalAmount: state => {
    return state.totalAmount;
  },
  totalOrderQty: state => {
    return state.totalOrderQty;
  },
  totalPromo: state => {
    return state.totalPromo;
  },
  thisPage: state => {
    return state.thisPage;
  },
  items_promo_order: state => {
    return state.items_promo_order;
  },
  promo_set_list: state => {
    return state.promo_set_list;
  },
  promo_set_seleceted: state => {
    return state.promo_set_seleceted;
  },
  temp_promo_code: state => {
    return state.temp_promo_code;
  },
  temp_fg_code: state => {
    return state.temp_fg_code;
  },
  promo_freeg_seleceted: state => {
    return state.promo_freeg_seleceted;
  },
  items_freegift: state => {
    return state.items_freegift;
  },
  promo_mode: state => {
    return state.promo_mode;
  },
  order_selected: state => {
    return state.order_selected;
  },
  flow: state => {
    return state.flow;
  },
  temp_comment_status: state => {
    return state.temp_comment_status;
  },
  master_warehouse: state => {
    return state.master_warehouse;
  },
  master_shipto: state => {
    return state.master_shipto;
  },
  salesman_list: state => {
    return state.salesman_list;
  },
  priority: state => {
    return state.priority;
  },
  creditterm: state => {
    return state.creditterm;
  },
  spinner_order: state => {
    return state.spinner_order;
  },
  check_stock: state => {
    return state.check_stock;
  },
  chiefsales: state => {
    return state.chiefsales;
  },
  period_detail: state => {
    return state.period_detail;
  },
  chiefsales_selected: state => {
    return state.chiefsales_selected;
  },
  keepRouter: state => {
    return state.keepRouter;
  },
  popupComment: state => {
    return state.popupComment;
  },
  apv_saleman: state => {
    return state.apv_saleman;
  },
  apv_pono: state => {
    return state.apv_pono;
  },
  apv_customer: state => {
    return state.apv_customer;
  },
  filter_po: state => {
    return state.filter_po;
  },
  filter_customer: state => {
    return state.filter_customer;
  },
  filter_salesman: state => {
    return state.filter_salesman;
  },
  noti_event: state => {
    return state.noti_event;
  },
  //PROMOTION
  spinner_promo: state => {
    return state.spinner_promo;
  },
  product_group: state => {
    return state.product_group;
  },
  product_cg: state => {
    return state.product_cg;
  },
  percentDiscPM: state => {
    return state.percentDiscPM;
  },
  keepSets: state => {
    return state.keepSets;
  },
  bigData: state => {
    return state.bigData;
  },
  bigPromoset: state => {
    return state.bigPromoset;
  },
  fucusCustomer: state => {
    return state.fucusCustomer;
  },
  textBtnPromo: state => {
    return state.textBtnPromo;
  },
  volDisList: state => {
    return state.volDisList;
  },
  totalvolDis: state => {
    return state.totalvolDis;
  },
  keepRange: state => {
    return state.keepRange;
  },
  textRange: state => {
    return state.textRange;
  },
  mstDiscount: state => {
    return state.mstDiscount;
  },
  minimumSales: state => {
    return state.minimumSales;
  },
  budget: state => {
    return state.budget;
  },
  roleCode: state => {
    return state.roleCode;
  },
  compareBudget: state => {
    return state.compareBudget;
  },
  keepDiscountAPV: state => {
    return state.keepDiscountAPV;
  },
  enddatePromo: state => {
    return state.enddatePromo;
  },
  disableFrom: state => {
    return state.disableFrom;
  },
  paybycash_list: state => {
    return state.paybycash_list;
  },
  loadCustStatus: state => {
    return state.loadCustStatus;
  },
  allCustomer: state => {
    return state.allCustomer;
  },
  allCustomer_spinner: state => {
    return state.allCustomer_spinner;
  },
  dataListProductDG: state => {
    return state.dataListProductDG;
  },
  checkBtnAdd: state => {
    return state.checkBtnAdd;
  },
  sumBudgetAllRow: state => {
    return state.sumBudgetAllRow;
  },
  showPONO: state => {
    return state.showPONO;
  },
  totalItems: state => {
    return state.totalItems;
  },
  itemDemo: state => {
    return state.itemDemo;
  },
  bkMode: state => {
    return state.bkMode;
  },
  thisPagePM: state => {
    return state.thisPagePM;
  },
  orderDialog: state => {
    return state.orderDialog;
  },
  checkBtnCal: state => {
    return state.checkBtnCal;
  },
  totalDiscount_old: state => {
    return state.totalDiscount_old;
  },
  promo_seleceted_temp: state => {
    return state.promo_seleceted_temp;
  },
  reCallGetShipToStatus: state => {
    return state.reCallGetShipToStatus;
  },
  spinner_order_vd: state => {
    return state.spinner_order_vd;
  },
  chiefsalesLoding: state => {
    return state.chiefsalesLoding;
  },
  xpress_list: state => {
    return state.xpress_list;
  },

};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};