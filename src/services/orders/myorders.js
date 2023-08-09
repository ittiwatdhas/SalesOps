import Vue from "vue";
import _ from "lodash";
import moment from "moment";
export default {
saveHeadOrder(state) {
  let ord_dilog = sessionStorage.getItem('keep_order_session')
  let theArray = JSON.parse(ord_dilog)

    let data = _.cloneDeep(state.customer_info);
    let payList = state.paybycash_list;
    let poDate = data.po_date;
    // console.log(data)
    if (_.trim(poDate).length == 0) {
      poDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    }
    let deliveryDate = data.delivery_date;
    var formData = new FormData();
    let takeNote = data.take_note == "-" ? "" : data.take_note;

    if (state.items_order_bk.length == 0) {
      formData.append("bk_detail", false);
    } else {
      let rsBK = JSON.stringify(state.items_order_bk)
      formData.append("bk_detail", rsBK);
    }
    formData.append("h_id", data.id);
    formData.append("deliverydate_servercipher", state.deliverydate_servercipher);

    let fromPage = Vue.localStorage.get("FROMPAGE");
    let head_type = 'o';
    if (!_.isNull(fromPage)) {
      if (fromPage == "BACKORDERS") {
        head_type = 'bo';
      }
    } else {
      head_type = 'o';
    }

    let data_cash = {};
    let data_head = {};
    let data_detail = [];
    let data_promo = [];
    let data_sfreegift = [];

    var new_sum_budget = 0
    var new_sum_budget2 = 0
      // console.log(data.percent_discount ,' <-> ',data.default_discount) 
    if(parseFloat(data.percent_discount) > parseFloat(data.default_discount) ){
      new_sum_budget2 = (state.totalAmount) * ((data.percent_discount - data.default_discount) / 100)
      // console.log('new_sum_budget2 =>' , new_sum_budget2)
    }
      let price_1 = 0
      // console.log(state.items_order)
    if (state.items_order.length > 0) {

      // console.log('state.items_order =>' , state.items_order)
      state.items_order.forEach(function (value, key) {
      // console.log(parseFloat(value.price) , parseFloat(value.ref_price))

  if(parseFloat(value.price) < parseFloat(value.ref_price)   ){

          if(parseFloat(value.priceVD) == 0){
            // console.log('- 1 -')
            price_1 = parseFloat(value.ppu)
            //  value.ref_price  = value.price
          }else {
            // console.log('- 2 -')
            price_1  = parseFloat(value.priceVD)
            value.ref_price = value.priceVD
          }

            if( parseFloat(price_1) - parseFloat(value.price) > 0   ){
              new_sum_budget += ( parseFloat(price_1) - parseFloat(value.price) ) * value.order_qty 
            }else {
              new_sum_budget -= 0
            }

  }
      });
    }
    // console.log(new_sum_budget ,' + ', new_sum_budget2 )
    // console.log(Math.abs(theArray.sumBudgetAllRow - (new_sum_budget + new_sum_budget2)  ));
    // console.log('sumBudgetAllRow =>' , theArray.sumBudgetAllRow)
    // console.log('new_sum_budget + new_sum_budget2 =>' ,  new_sum_budget + new_sum_budget2)
    // state.sumBudgetAllRow  = new_sum_budget + new_sum_budget2
    // console.log('new_sum_budget =>' , new_sum_budget + new_sum_budget2)
    data_head = {
      'balance' : data.balance,
      'cust_code' : data.customer_code,
      'credit_term_code' : data.credit_term_code,
      'credit_rating' : data.credit_rating,
      'credit_limit' : data.credit_limit,

      'customer_channel_code' : data.customer_channel_code,
      'customer_channel_title' : data.customer_channel_title,
      'pricetype_code' : data.pricetype_code,
      'price_policy_code' : data.price_policy_code,
      'price_policy_title' : data.price_policy_title,
      'pricebook_code' : data.pricebook_code,
      'pricefix_code' : data.pricefix_code,
      'process_order_channel' : sessionStorage.getItem('process_order_channel'),

      'cus_discount' : data.default_discount,
      'doc_no' : data.doc_no,
      'po_date' : poDate,
      'delivery_date' : deliveryDate,
      'delivery_date_cipher' : data.delivery_date_cipher,
      'delivery_log' : _.isUndefined(data.delivery_log) ? deliveryDate : data.delivery_log,
      'inv_no' : 0,
      'po_no' : _.trim(data.po_no),
      'order_status' : data.order_status,
      'order_value' : data.order_value,
      'outstanding' : data.outstanding,
      'order_mode' : state.bkMode,
      'priority' : data.priority,
      'percent_discount' : data.percent_discount,
      'pay_by_cash' : data.pay_by_cash == true ? 1 : 0,
      'ship_to' : data.ship_to,
      'sm_code' : data.salesman_code,
      'take_note' : takeNote,
      'total_discount' : _.isUndefined(state.totalDiscount) ? 0 : state.totalDiscount,
      'total_netprice' : _.isUndefined(state.totalDiscount) ? 0 : state.totalDiscount,
      'total_qty' : state.totalOrderQty,
      'total_amount' : state.totalAmount,
      'total_netamount' : state.totalNetAmount,
      //  'sum_budget' : state.sumBudgetAllRow,
      'sum_budget' : ( new_sum_budget + new_sum_budget2 ) ,
      'user_create' : data.user_create,
      'warehouse_code' : data.warehouse_code,
      'type' : head_type,
      'copy_po':!theArray.session_copy_po ? '0' : theArray.session_copy_po,
      'copy_po_no':!theArray.session_copy_po_no ? '' : theArray.session_copy_po_no,
    };
    data_cash = {
      'cust_addr1' : _.trim(payList.cust_addr1) == 'undefined' || _.isUndefined(payList.cust_addr1) ? '' : payList.cust_addr1,
      'cust_addr2' : _.trim(payList.cust_addr2) == 'undefined' || _.isUndefined(payList.cust_addr2) ? '' : payList.cust_addr2,
      'cust_addr3' : _.trim(payList.cust_addr3) == 'undefined' || _.isUndefined(payList.cust_addr3) ? '' : payList.cust_addr3,
      'tax_id' :  _.trim(payList.tax_id) == 'undefined' || _.isUndefined(payList.tax_id) ? '' : payList.tax_id,
      'receive_name' : _.trim(payList.receive_name) == 'undefined' || _.isUndefined(payList.receive_name) ? '' : payList.receive_name,
      'sent_to_cus_name' : _.trim(payList.sent_to_cus_name) == 'undefined' || _.isUndefined(payList.sent_to_cus_name) ? '' : payList.sent_to_cus_name,
    };

    // console.log(state.items_order)
     
    if (state.items_order.length > 0) {
      state.items_order.forEach(function (value, key) {
        let bk_ = ''
        // console.log(value.bk_status)
        if(_.isUndefined(value.bk_status)){
          bk_ = value.po_backorder
        //  console.log(' backorder_id => ',value.po_backorder) 
        }else {
          bk_ = value.bk_status
          // console.log('bk_status => ',value.bk_status) 
        }

        data_detail[key] = {
          'id' : value.id,
          'item_code' : value.item_code,
          'item_name' : value.item_name,
          'head_id' : "",
          'priority_id' : data.priority,
          'po_no' : data.po_no,
          'Inv_no' : 0,
          'price_per_unit' : value.ppu,
          'price' : value.price,
          'budget' : (_.isUndefined(value.ref_po_no) || _.trim(value.ref_po_no.length) < 2)?value.budget : 0 ,
          'net_price' : value.net_price,
          'order_qty' : value.order_qty,
          'amount' : value.amount,
          'net_amount' : value.net_amount,
          'ref_price' : value.ref_price,
          'unit_type' : 'selling',
          'selling_unit' : value.unit,
          'flag_status' : value.flag_status,
          'selling_unit_code' :  _.isUndefined(value.unit_id) ? value.selling_unit_code : value.unit_id,
          'ref_po_no' : _.isUndefined(value.ref_po_no)  ? '' : value.ref_po_no,

          // 'po_backorder' : bk_ ,
          'po_backorder' :  _.isUndefined(value.bk_status) ? '' : value.bk_status,
          'priceVD' : _.isUndefined(value.priceVD) ? '' : value.priceVD,
          'backorder_id' : _.isUndefined(value.backorder_id) ? false : value.backorder_id,
          'volume_id' : (!_.isUndefined(value.group)) ? (value.group.length > 0 ? value.group[0].group_id : false ):( _.isUndefined(value.volume_id) ? false : value.volume_id),
          'price_code' : value.price_code,
          'price_policy_code' : value.price_policy_code,
          'vd_price_code' : _.isUndefined(value.vd_price_code) ? '' : value.vd_price_code,
        };
      });
    }

    let k = 0;
    let j = 0;

    if (state.items_promo_order.length > 0) {
      state.items_promo_order.forEach(function (value, key) {


        value.products.forEach(function (row, key) {
          let promo_name =
            typeof row.promo_title == "undefined"
              ? row.promo_name
              : row.promo_title;
        
          data_promo[k] = {
            'id' : row.id,
            'amount' : row.amount,
            'budget' : row.budget,
            'flag_status' : "P",
            'head_id' : "",
            'item_code' : row.item_code,
            'item_name' : row.item_name,
            'Inv_no' : 0,
            'net_price' : row.net_price,
            'price_per_unit' : row.ppu,
            'price' : row.price,
            'net_amount' : row.net_amount,
            'priority_id' : row.priority,
            'po_no' : row.po_no,
            'promo_code' : row.promo_code,
            'percentage' : row.discount,
            'promo_name' : promo_name,
            'promo_sets_name' : row.promo_sets_name,
            'order_qty' : row.order_qty,
            'selling_unit_code' : row.unit_id,
            'selling_unit' : row.unit,
            'unit_type' : 'selling',

          };
          k = k + 1;
        });
        value.freeitems.forEach(function (row, keys) {
          data_sfreegift[j] = {
            'id' : row.id,
            'amount' : row.amount,
            'item_code' : row.item_code,
            'item_name' : row.item_name,
            'Inv_no' : 0,
            'flag_status' : "P",
            'head_id' : "",
            'net_price' : row.net_price,
            'net_amount' : row.net_amount,
            'unit_type' : 'selling',
            'po_no' : row.po_no,
            'priority_id' : row.priority,
            'promo_code' : row.promo_code,
            'price_per_unit' : row.ppu,
            'promo_name' : row.promo_name,
            'promo_sets_name' : row.promo_sets_name,
            'price' : row.price,
            'order_qty' : row.order_qty,
            'selling_unit_code' : row.unit_id,
            'selling_unit' : row.unit,
          };
          j = j + 1;
        });
      });
    }
    // console.log('data_detail =>' , data_detail)
    formData.append("data_head", JSON.stringify(data_head));
    formData.append("data_detail", JSON.stringify(data_detail));
    formData.append("data_promo", JSON.stringify(data_promo));
    formData.append("data_sfreegift", JSON.stringify(data_sfreegift));
    formData.append("data_cash", JSON.stringify(data_cash));
    return Vue.http
      .post(Vue.config["url"] + "/order-save-head", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getOrderById(values) {
    var formData = new FormData();
    formData.append("h_id", values.h_id);
    formData.append("doc_no", values.doc_no);
    return Vue.http
      .post(Vue.config["url"] + "/get-order-Details", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getOrderDeliveryById(values) {
    var formData = new FormData();
    formData.append("h_id", values.id);
    formData.append("doc_no", values.doc_no);
    return Vue.http
      .post(Vue.config["url"] + "/get-order-delivery", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  saveOrderFlow(values) {
    var formData = new FormData();
    formData.append("h_id", values.h_id);
    formData.append("doc_no", values.doc_no);
    formData.append("chief_saleman", values.chief_saleman);
    formData.append("apv_status", values.apv_status);
    formData.append("emp_id", values.emp_id);
    formData.append("delivery_date", values.delivery_date);
    return Vue.http
      .post(Vue.config["url"] + "/order-save-flow", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body);
      })
      .catch(error => Promise.reject(error));
  },
  readComment(values) {
    if (values.length > 0) {
      var formData = new FormData();
      values.forEach(function (row, key) {
        formData.append("id[]", row.id);
      });
      return Vue.http
        .post(Vue.config["url"] + "/order-updatecomment", formData, {
          headers: {
            Authorization: "Bearer " + Vue.localStorage.get("token")
          }
        })
        .then(response => {
          return Promise.resolve(response.body);
        })
        .catch(error => Promise.reject(error));
    }
  },
  getOrderSummary(values) {
    return Vue.http
      .get(Vue.config["url"] + "/get-order-summary", {
        params: {
          month: values.month,
          year: values.year
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  filterSalemanAPV(keyword) {
    return Vue.http
      .get(Vue.config["url"] + "/filter-saleman", {
        params: {
          keyword: keyword
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  filterPonoAPV(val) {
    return Vue.http
      .get(Vue.config["url"] + "/filter-po", {
        params: {
          keyword: val.keyword,
          year: val.year,
          month: val.month
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  filterCustomerAPV(keyword) {
    return Vue.http
      .get(Vue.config["url"] + "/filter-customer", {
        params: {
          keyword: keyword
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getChiefsales(value) {
    return Vue.http
      .get(Vue.config["url"] + "/order-chiefsales", {
        params: {
          saleman: value
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getOrderBySales(values, state) {
    let filter = {
      month: values.month,
      year: values.year,
      page: state.keepRouter ? "myorders" : "approval",
    };
    if (filter.page == "approval") {
      filter.po = values.po;
      filter.salesman = values.saleman;
      filter.customer = values.customer;
    }
    return Vue.http
      .get(Vue.config["url"] + "/get-order-by-sales", {
        params: filter,
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getWarehouse() {
    return Vue.http
      .get(Vue.config["url"] + "/all-warehouse", {
        params: {},
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getFlow(value) {
    return Vue.http
      .get(Vue.config["url"] + "/order-get-flow", {
        params: { doc_no: value.doc_no },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getShipTo(values) {
    return Vue.http
      .get(Vue.config["url"] + "/get-ship-to", {
        params: {
          cust_code: values.customer_code
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  filterCustomer(values) {
    return Vue.http
      .get(Vue.config["url"] + "/get-info-customer", {
        params: {
          cust_code: _.trim(values.keyword)
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getPriority() {
    return Vue.http
      .get(Vue.config["url"] + "/get-priority", {
        params: {},
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getCreditterm() {
    return Vue.http
      .get(Vue.config["url"] + "/all-creditterm", {
        params: {},
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getComment(values) {
    return Vue.http
      .get(Vue.config["url"] + "/order-getcomment", {
        params: {
          head_id: values.h_id,
          doc_no: values.doc_no,
          emp_id: Vue.localStorage.get("emp_id")
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getSalesmanByCust(values) {
    let source = ''
    if(values.all){
      if(values.all.type === 'XPRESS'){
      source = 'express'
    }
    if(values.all.type === 'DRAFT'){
      source = 'draft'
    }
    if(values.all.type === 'PENNDING'){
      source = 'pennding'
    }
    if(values.all.type === 'COMPLETED'){
      source = 'complete'
    }
    if(values.all.type === 'REJECT'){
      source = 'reject'
    }
    }
    
    var formData = new FormData();
    formData.append("cust_code", values.customer_code);
    formData.append("po_no", values.all ? values.all.items.po_no : 'system');
    formData.append("source", source);
    return Vue.http
      .post(Vue.config["url"] + "/get-saleman-by-cust", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getPurcheseInfo(values, getters, state) {
    let outstanding = 0;
    let order_value = 0;
    if (!isNaN(parseFloat(state.customer_info.outstanding))) {
      outstanding = state.customer_info.outstanding;
    }
    if (!isNaN(parseFloat(values.order_value))) {
      order_value = values.order_value;
    }
    let object = {
      id: state.customer_info.id,
      customer_code: values.customer_code,
      customer_coded: values.customer_code,
      customer_name: values.customer_name,
      po_no: state.customer_info.po_no,
      doc_no: state.customer_info.doc_no,
      po_date: state.customer_info.po_date,
      salesman_code: Vue.localStorage.get("emp_id"),
      creator: state.customer_info.creator,
      ship_to: values.ship_to,
      user_create: state.customer_info.user_create,
      delivery_date: state.customer_info.delivery_date,
      delivery_date_cipher: state.customer_info.delivery_date_cipher,
      percent_discount: values.percent_discount,
      default_discount: values.default_discount,
      perDiscountMng: values.percent_discount + "%",
      warehouse_code: values.warehouse_code,
      priority: parseInt(values.priority),
      credit_term_code: values.creditterm_code,
      take_note: "",
      credit_limit: values.credit_limit,
      outstanding: outstanding,
      order_value: values.order_value,
      balance: values.credit_limit - outstanding - order_value,
      credit_rating: values.credit_rating,
      order_status: state.customer_info.order_status,
      customer_address: values.customer_address,
      payByCash: values.is_cash,
      payByCashOld: values.is_cash,
      pay_by_cash: values.is_cash == 1 ? true : false,

      //FIX PRICE------------
      pricetype_code: values.default_price,
      customer_channel_code: values.customer_channel_code,
      customer_channel_title: values.customer_channel_title,
      price_policy_code: values.price_policy_code,
      price_policy_title: values.price_policy_title,
      pricefix_code: values.pricefix_code,
      pricefix_title: values.pricefix_title,
      pricebook_code: values.pricebook_code,
      pricebook_title: values.pricebook_title
    };
    return object;
  },
  searchCG(values, state) {
    var formData = new FormData();
    formData.append("item_code", values.keyword);
    formData.append("default_price", state.customer_info.pricetype_code);
    formData.append("customer_code", state.customer_info.customer_code);

    let data = state.customer_info
    if (!_.isUndefined(data.price_policy_code)) {
      formData.append("price_policy_code", data.price_policy_code);
      if (_.toUpper(data.price_policy_code) == "BOOK") {
        formData.append("price_policy", data.pricebook_code);
      } else if (_.toUpper(data.price_policy_code) == "AUTO") {
        formData.append("price_policy", data.pricetype_code);
      } else if (_.toUpper(data.price_policy_code) == "MIX") {
        formData.append("price_policy", data.pricebook_code + "," + data.pricefix_code);
      } else {
        formData.append("price_policy", data.pricefix_code);
      }
    } else {
      formData.append("price_policy_code", 'auto');
      formData.append("price_policy", data.pricetype_code);
    }

    return Vue.http
      .post(Vue.config["url"] + "/search-items", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  saveComment(values, commentRow) {
    var formData = new FormData();
    formData.append("head_id", commentRow.h_id);
    formData.append("doc_no", commentRow.doc_no);
    formData.append("fname", values.first_name);
    formData.append("lname", values.last_name);
    formData.append("emp_id", values.emp_id);
    formData.append("comment", values.comment);
    formData.append("status", values.status);
    formData.append("position", values.position);
    formData.append("msg_to", values.msg_to);
    formData.append("emp_id_start", values.emp_id);
    return Vue.http
      .post(Vue.config["url"] + "/order-savecomment", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getStockByItems(row, pricetype, warehouse) {
    var formData = new FormData();
    formData.append("qty", row.order_qty);
    formData.append("item_code", row.item_code);
    formData.append("price_type", pricetype);
    formData.append("warehouse_code", warehouse);
    return Vue.http
      .post(Vue.config["url"] + "/get-stock-order", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getStockByGroup(group, pricetype, warehouse) {
    var formData = new FormData();
    group.forEach(function (value, key) {
      formData.append("detail[" + key + "][item_code]", value.item_code);
      formData.append("detail[" + key + "][qty]", value.order_qty);
      formData.append("detail[" + key + "][price_type]", pricetype);
      formData.append("detail[" + key + "][warehouse_code]", warehouse);
    });
    return Vue.http
      .post(Vue.config["url"] + "/get-stock-by-group", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  deleteOrder(state) {
    let values = state.customer_info
    var formData = new FormData();
    formData.append("h_id", values.id);
    formData.append("doc_no", values.doc_no);

    let detail = JSON.stringify(state.items_order)
    formData.append("detail", detail);

    let temp1 = []
    let temp2 = []
    state.items_promo_order.forEach(function (value, key) {
      value.products.forEach(function (row, key) {
        temp1.push(row)
      });
      value.freeitems.forEach(function (row, keys) {
        temp2.push(row)
      });
    });

    let promo = JSON.stringify(temp1)
    let sfreegift = JSON.stringify(temp2)
    formData.append("promo", temp1.length > 0 ? promo : []);
    formData.append("sfreegift", temp2.length > 0 ? sfreegift : []);

    return Vue.http
      .post(Vue.config["url"] + "/delete-order", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  getProductsById(code, defaultPrice) {
    return Vue.http
      .get(Vue.config["url"] + "/get-promotion-item", {
        params: {
          promo_code: code,
          default_price: defaultPrice
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getPromotionSet(value) {
    var formData = new FormData();
    formData.append("promo_code", value.promo_code);
    formData.append("cust_code", value.cust_code);
    formData.append("group", value.group);
    formData.append("cg", value.cg);
    formData.append("keyword", value.keyword);
    formData.append("start", value.start);
    formData.append("end", 20);
    return Vue.http
      .post(Vue.config["url"] + "/get-promotion-set", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getPromoCG(value, group) {
    return Vue.http
      .get(Vue.config["url"] + "/get-product-master", {
        params: {
          cust_code: value,
          prod_group: group
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getPPU(price, code) {
    var formData = new FormData();
    formData.append("default_price", price);
    _.forEach(code, function (row) {
      formData.append("pro_code[]", row.item_code);
    });
    return Vue.http
      .post(Vue.config["url"] + "/get-ppu", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getVolumeDis(prod_code, default_price) {
    var formData = new FormData();
    formData.append("prod_code", prod_code);
    formData.append("default_price", default_price);
    return Vue.http
      .post(Vue.config["url"] + "/get-volume-discount", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getMstDiscount() {
    return Vue.http
      .get(Vue.config["url"] + "/get-mst-discount", {
        params: {},
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  checkMinimum(value) {
    var formData = new FormData();
    formData.append("emp_id", value);
    return Vue.http
      .post(Vue.config["url"] + "/check-minimum", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  saveBudget(value) {
    var formData = new FormData();
    formData.append("emp_id", value.emp_code);
    formData.append("po_no", value.po_no);
    formData.append("h_id", value.h_id);
    formData.append("po_date", value.po_date);
    formData.append("balance", value.balance);
    formData.append("year", value.year);
    formData.append("month_no", value.month_no);
    formData.append("channel_code", value.channel_code);
    formData.append("role_code", value.role_code);
    formData.append("use_budget", value.use_budget);

    return Vue.http
      .post(Vue.config["url"] + "/update-budget", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getBudget(value) {
    return Vue.http
      .get(Vue.config["url"] + "/get-budget", {
        params: {
          emp_id: value.emp_code,
          po_date: value.po_date,
          po_no: value.po_no,
          h_id: value.h_id,
          channel_code: value.channel_code,
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  flagDiscont(doc_no) {
    var formData = new FormData();
    formData.append("flag_discont", 1);
    formData.append("doc_no", doc_no);
    return Vue.http
      .post(Vue.config["url"] + "/flag-discont-orders", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getDeliveryDate(value) {
    return Vue.http
      .get(Vue.config["url"] + "/get-delivery-date", {
        params: {
          customer_code: value.customer_code,
          po_date: value.po_date
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getPromoEndDate(value) {
    var formData = new FormData();
    value.forEach(function (row, key) {
      formData.append("promotion_code[" + key + "]", row.id);
    });
    return Vue.http
      .post(Vue.config["url"] + "/get-enddate-promo", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  updateOrderHead(state) {
    let data = state.customer_info;
    // console.log('state.budget =>' , state.budget)
    let deliveryDate = moment(data.delivery_date).format("YYYY-MM-DD");
    var formData = new FormData();
    let takeNote = data.take_note == "-" ? "" : data.take_note;
    formData.append("h_id", data.id);
    formData.append("cust_code", data.customer_code);
    formData.append("po_no", data.po_no.trim());
    formData.append("priority", data.priority);
    formData.append("take_note", takeNote);
    formData.append("delivery_date", deliveryDate);
    formData.append("bal_budget", state.budget);
    formData.append("percent_discount", data.percent_discount);
    formData.append("credit_term_code", data.credit_term_code);
    formData.append("ship_to", data.ship_to);
    formData.append("warehouse_code", data.warehouse_code);
    formData.append("credit_limit", data.credit_limit);
    formData.append("sum_budget", state.sumBudgetAllRow);
    return Vue.http
      .post(Vue.config["url"] + "/update-order-head", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  saveItemAfterFlagDiscount(state, opt) {
    let info = _.cloneDeep(state.customer_info);
    var formData = new FormData();
    formData.append("head[id]", info.id);
    formData.append("head[total_discount]", state.totalDiscount);
    formData.append("head[total_netprice]", state.totalDiscount);
    formData.append("head[percent_discount]", info.percent_discount);
    formData.append("head[total_netamount]", state.totalNetAmount);
    formData.append("head[credit_term_code]", info.credit_term_code);
    formData.append("head[bal_budget]", state.budget);
    formData.append("head[sum_budget]", state.sumBudgetAllRow);
    
    if (state.items_order.length == 0) {
      formData.append("detail", []);
    } else {
      state.items_order.forEach(function (value, key) {
        formData.append("detail[" + key + "][id]", value.id);
        formData.append("detail[" + key + "][item_code]", value.item_code);
        formData.append("detail[" + key + "][net_amount]", value.net_amount);
        formData.append("detail[" + key + "][net_price]", value.net_price);
        formData.append("detail[" + key + "][budget]", value.budget);
      });
    }
    let k = 0;
    let j = 0;
    if (state.items_promo_order.length == 0) {
      formData.append("promo", []);
      formData.append("sfreegift", []);
    } else {
      state.items_promo_order.forEach(function (value, key) {
        value.products.forEach(function (row, key) {
          formData.append("promo[" + k + "][id]", row.id);
          formData.append("promo[" + k + "][promo_code]", value.promo_code);
          formData.append("promo[" + k + "][item_code]", row.item_code);
          formData.append("promo[" + k + "][net_amount]", row.net_amount);
          formData.append("promo[" + k + "][net_price]", row.net_price);
          formData.append("promo[" + k + "][budget]", row.budget);
          k = k + 1;
        });
        value.freeitems.forEach(function (row, keys) {
          formData.append("sfreegift[" + j + "][id]", row.id);
          formData.append("sfreegift[" + j + "][promo_code]", row.promo_code);
          formData.append("sfreegift[" + j + "][item_code]", row.item_code);
          formData.append("sfreegift[" + j + "][net_amount]", row.net_amount);
          formData.append("sfreegift[" + j + "][net_price]", row.net_price);

          j = j + 1;
        });
      });
    }
    return Vue.http
      .post(Vue.config["url"] + "/update-order-detail", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  editOrderFromReject(values) {
    var formData = new FormData();
    formData.append("h_id", values.h_id);
    formData.append("document_no", values.document_no);
    formData.append("apv_approver_id", values.apv_approver_id);
    formData.append("apv_send_approver", values.apv_send_approver);
    formData.append("apv_status", values.apv_status);
    return Vue.http
      .post(Vue.config["url"] + "/edit-rej-order", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getAllCustomer() {
    return Vue.http
      .get(Vue.config["url"] + "/get-all-customer", {
        params: {
          emp_id: Vue.localStorage.get("emp_id")
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getAllProduct(value) {
    return Vue.http
      .get(Vue.config["url"] + "/search-product-group", {
        params: {
          emp_id: value.emp_id,
          only_product: value.only_product
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  searchSubGroup(values) {
    var formData = new FormData();
    formData.append("productgroup_code", values.code);
    formData.append("only_product", values.only_product);
    formData.append("emp_id", values.emp_id);
    return Vue.http
      .post(Vue.config["url"] + "/search-sub-group", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  searchProductCG(values) {
    var formData = new FormData();
    formData.append("productsubgroup_code", values.code);
    formData.append("only_product", values.only_product);
    formData.append("emp_id", values.emp_id);
    return Vue.http
      .post(Vue.config["url"] + "/search-product-cg", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  searchProductItem(values) {
    var formData = new FormData();
    formData.append("price_type", values.price_type);
    formData.append("product_group_code", values.product_group_code);
    formData.append("sub_group_code", values.sub_group_code);
    formData.append("product_cg", values.product_cg);
    formData.append("keyword", values.keyword);
    formData.append("emp_id", values.emp_id);
    formData.append("only_product", values.only_product);
    formData.append("start", 0);
    formData.append("offset", 1000);
    formData.append("customer_code", values.customer_code);
    //FIX PRICE--------
    formData.append("default_price", values.price_type);
    formData.append("price_policy", values.price_policy);
    formData.append("price_policy_code", values.price_policy_code);

    return Vue.http
      .post(Vue.config["url"] + "/search-product-items", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  callTfCipher() {
    return Vue.http
      .get(Vue.config["url"] + "/tf-cipher", {
        params: {},
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
};
