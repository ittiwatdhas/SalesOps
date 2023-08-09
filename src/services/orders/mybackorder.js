import Vue from "vue";
import _ from "lodash";
export default {
  getBackOrder(keyword, state) {
    return Vue.http
      .get(Vue.config["url"] + "/get-back-order", {
        params: {
          emp_id: Vue.localStorage.get("emp_id"),
          keyword: keyword,
          source: state.typeSource
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
  getDecReason() {
    return Vue.http
      .get(Vue.config["url"] + "/get-decline-reason", {
        params: {},
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  delBackOrder(data) {
    var formData = new FormData();
    if (data.length == 0) {
      formData.append("detail", []);
    }
    data.forEach(function (values, keys) {
      formData.append("detail[" + keys + "][po_no]", values.po_no);
      formData.append("detail[" + keys + "][customer_code]", values.customer_code);
    });
    return Vue.http
      .post(Vue.config["url"] + "/del-back-order", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getBcakOrdByCode(values) {
    var formData = new FormData();
    formData.append("po_no", values.po_no);
    formData.append("order_no", values.order_no);
    formData.append("inv_no", values.inv_no);
    formData.append("customer_code", values.customer_code);
    formData.append("order_type", values.order_type);
    return Vue.http
      .post(Vue.config["url"] + "/get-detail-backorder", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  viewsBcakOrdByCode(values) {
    var formData = new FormData();
    formData.append("date", values.date);
    formData.append("source", values.values);
    formData.append("emp_id", Vue.localStorage.get("emp_id"));
    return Vue.http
      .post(Vue.config["url"] + "/view-detail-backorder", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  updateStatusBK(data, val) {
    var formData = new FormData();
    if (data.length == 0) {
      formData.append("detail", []);
    }
    data.forEach(function (values, keys) {
      formData.append("detail[" + keys + "][po_no]", values.po_no);
      formData.append("detail[" + keys + "][customer_code]", values.customer_code);
      formData.append("detail[" + keys + "][status]", val.btn);
      formData.append("detail[" + keys + "][reason]", val.reason);
      formData.append("detail[" + keys + "][order_type]", values.order_type);
      formData.append("detail[" + keys + "][bnt_type]", val.bnt_type);
      formData.append("detail[" + keys + "][sm_code]", values.sm_code);
      formData.append("detail[" + keys + "][login]",  Vue.localStorage.get('emp_id'));
      if (!_.isUndefined(values.item_code)) {
        formData.append("detail[" + keys + "][item_code]", values.item_code);
      } else {
        formData.append("detail[" + keys + "][item_code]", false);
      }
      if (!_.isUndefined(values.backorder_id)) {
        formData.append("detail[" + keys + "][backorder_id]", values.backorder_id);
      } else {
        formData.append("detail[" + keys + "][backorder_id]", false);
      }
      if (!_.isUndefined(values.detail_id)) {
        formData.append("detail[" + keys + "][detail_id]", values.detail_id);
      } else {
        formData.append("detail[" + keys + "][detail_id]", false);
      }
    });
    return Vue.http
      .post(Vue.config["url"] + "/update-status-back-order", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  googleSheetBK(val) {
    var formData = new FormData();
    formData.append("source", val.source);
    formData.append("emp_id", val.emp_id);
    formData.append("date", val.date);
    if (_.trim(val.email).length > 0) {
      // let rsemail = JSON.stringify(val.email)
      formData.append("email", val.email);
    } else {
      formData.append("email", '');
    }
    formData.append("backorder_id", JSON.stringify(val.data_sec));
    return Vue.http
      .post(Vue.config["url"] + "/google-sheets-mybackorder", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
};
