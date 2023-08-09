import Vue from "vue";
import _ from "lodash";
import moment from "moment";
export default {
  ediCorporateCode(value) {
    return Vue.http
      .get(Vue.config["url"] + "/edi-corporate-code", {
        params: { 'type': value },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.data);
      })
      .catch(error => Promise.reject(error));
  },
  getOrderHistoryTotal(value) {
    var formData = new FormData();
    formData.append("range", value.range);
    formData.append("month", value.month);
    formData.append("year", value.year);
    formData.append("textSearch", value.textSearch);
    formData.append("filter", JSON.stringify(value.filter));
    return Vue.http
      .post(Vue.config["url"] + "/get-order-history-total", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  getList(value) {
    var formData = new FormData();
    formData.append("range", value.range);
    formData.append("month", value.month);
    formData.append("year", value.year);
    formData.append("textSearch", value.textSearch);
    formData.append("filter", JSON.stringify(value.filter));
    return Vue.http
      .post(Vue.config["url"] + "/get-order-history", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  getHistoryStatus() {
    return Vue.http
      .get(Vue.config["url"] + "/get-history-status", {
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
  getTimeServer() {
    return Vue.http
      .get(Vue.config["url"] + "/date", {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body);
      })
      .catch(error => Promise.reject(error));
  },
  getComment(values) {
    return Vue.http
      .get(Vue.config["url"] + "/order-getcomment", {
        params: values,
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  saveComment(values) {
    var formData = new FormData();
    formData.append("head_id", values.h_id);
    formData.append("doc_no", values.doc_no);
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
  getFlow(value) {
    return Vue.http
      .get(Vue.config["url"] + "/order-get-flow", {
        params: value,
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
  getShipTo(values) {
    return Vue.http
      .get(Vue.config["url"] + "/get-ship-to", {
        params: {
          cust_code: values
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
  filterSaleman(keyword) {
    return Vue.http
      .get(Vue.config["url"] + "/filter-saleman", {
        params: {
          keyword: keyword.keyword,
          view: keyword.view
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

  filterCustomer(keyword) {
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
  getOrderSouce() {
    return Vue.http
      .get(Vue.config["url"] + "/get-order-source", {
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
  exportOrderHistoryGsheet(values) {
    return Vue.http
      .get(Vue.config["url"] + "/export-order-history-gsheet", {
        params: values,
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
