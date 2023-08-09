import Vue from "vue";
import _ from "lodash";
import moment from "moment";
export default {
  getList(value) {
    return Vue.http
      .get(Vue.config["url"] + "/get-back-order-management", {
        params: value,
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  getOrderRound() {
    return Vue.http
      .get(Vue.config["url"] + "/get-order-round", {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  syncstock() {
    return Vue.http
      .get(Vue.config["url"] + "/sync-stock-km", {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  ViewK1() {
    return Vue.http
      .get(Vue.config["url"] + "/view-detail-backorderk1", {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getAdjustByCode(values, state) {
    var formData = new FormData();
    formData.append("item_code", values.item_code);
    formData.append("status", values.status);
    formData.append("round", values.round);
    formData.append("source", state.source);
    return Vue.http
      .post(Vue.config["url"] + "/get-adjust-order", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  delAdjust(row, detail) {
    var formData = new FormData();
    formData.append("item_code", row.item_code);
    if (detail.length == 0) {
      formData.append("detail", []);

    }
    detail.forEach(function (values, keys) {
      formData.append("detail[" + keys + "][po_no]", values.po_no);
      formData.append("detail[" + keys + "][customer_code]", values.customer_code);
    });
    return Vue.http
      .post(Vue.config["url"] + "/del-adjust-order", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  export(row, detail) {
    var formData = new FormData();
    formData.append("item_code", row.item_code);
    if (detail.length == 0) {
      formData.append("detail", []);

    }
    detail.forEach(function (values, keys) {
      formData.append("detail[" + keys + "][po_no]", values.po_no);
      formData.append("detail[" + keys + "][customer_code]", values.customer_code);
    });
    return Vue.http
      .post(Vue.config["url"] + "/export-adjust-order", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  saveAdjust(row, detail, head) {
    var formData = new FormData();
    formData.append("head[item_code]", row.item_code);
    formData.append("head[dnmt]", row.dnmt);
    formData.append("head[dnpc]", row.dnpc);
    formData.append("head[dnss]", row.dnss);
    formData.append("head[drpr]", row.drpr);
    formData.append("head[item_name]", row.item_name);
    formData.append("head[qty]", row.qty);
    formData.append("head[recommended]", row.recommended);
    formData.append("head[send]", row.send);
    formData.append("head[sku]", row.sku);
    formData.append("head[status]", row.status);
    formData.append("head[balance]", head.sum.balance);
    formData.append("head[on_queue]", head.sum.on_queue);
    formData.append("head[total_po]", head.sum.total_po);
    formData.append("head[total_stock]", head.sum.total_stock);
    if (detail.length == 0) {
      formData.append("detail", []);
    }
    let nowTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    // detail.forEach(function (values, keys) {
    //   let amount = parseInt(values.adjust) * parseFloat(values.price)
    //   formData.append("detail[" + keys + "][po_no]", values.po_no);
    //   formData.append("detail[" + keys + "][order_no]", values.order_no);
    //   formData.append("detail[" + keys + "][po_date]", values.po_date);
    //   formData.append("detail[" + keys + "][create_date]", values.create_date);
    //   formData.append("detail[" + keys + "][product_no]", row.item_code);
    //   formData.append("detail[" + keys + "][product_name]", row.item_name);
    //   formData.append("detail[" + keys + "][price]", values.price);
    //   formData.append("detail[" + keys + "][order_qty]", values.qty);
    //   formData.append("detail[" + keys + "][unit_code]", values.unit_code);
    //   formData.append("detail[" + keys + "][unit_title]", values.units);
    //   formData.append("detail[" + keys + "][amount]", amount);
    //   formData.append("detail[" + keys + "][sm_code]", values.sm);
    //   formData.append("detail[" + keys + "][cust_code]", values.customer_code);
    //   formData.append("detail[" + keys + "][cust_name]", values.customer_name);
    //   formData.append("detail[" + keys + "][modify_date]", nowTime);
    //   formData.append("detail[" + keys + "][adjust]", values.adjust);
    //   if (!_.isUndefined(values.backorder_id)) {
    //     formData.append("detail[" + keys + "][backorder_id]", values.backorder_id);
    //   } else {
    //     formData.append("detail[" + keys + "][backorder_id]", false);
    //   }
    // });
    formData.append("detail_json", JSON.stringify(detail));
    return Vue.http
      .post(Vue.config["url"] + "/save-adjust-order", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch();
  },
  generate(detail) {
    var formData = new FormData();
    if (detail.length == 0) {
      formData.append("items", []);
    }
    detail.forEach(function (values, keys) {
      formData.append("detail[" + keys + "][item_code]", values.item_code);
      formData.append("detail[" + keys + "][status]", values.status);
      formData.append("detail[" + keys + "][dnpc]", values.dnpc);
      formData.append("detail[" + keys + "][dnmt]", values.dnmt);
      formData.append("detail[" + keys + "][dnss]", values.dnss);
      formData.append("detail[" + keys + "][drpr]", values.drpr);
      formData.append("detail[" + keys + "][item_name]", values.item_name);
      formData.append("detail[" + keys + "][qty]", values.qty);
      formData.append("detail[" + keys + "][recommended]", values.recommended);
      formData.append("detail[" + keys + "][send]", values.send);
      formData.append("detail[" + keys + "][sku]", values.sku);
    });
    return Vue.http
      .post(Vue.config["url"] + "/generate-round", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  gSheetsBkManage(val) {
    var formData = new FormData();
    if (_.trim(val.email).length > 0) {
      formData.append("email", val.email);
    } else {
      formData.append("email", '');
    }
    return Vue.http
      .post(Vue.config["url"] + "sync/gsheets_BackOrderManagement", formData, {
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
