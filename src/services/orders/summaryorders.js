import Vue from "vue";
import _ from "lodash";
import moment from "moment";
export default {

  getSummary(value) {
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
  summaryPo(value) {
    return Vue.http
      .post(Vue.config["url"] + "/report/order-summary-po", {
        params: { 
          'salesteam': value[0], 
          'date': value[1]
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  summaryDetail(value) {
    var formData = new FormData();
    formData.append("date", value[0]);
    formData.append("customer_channel_code", value[1]);
    formData.append("sub_channel", value[2]);
    formData.append("salesteam_code", value[3]);
    formData.append("customer_code", value[4]);
    return Vue.http
      .post(Vue.config["url"] + "/report/order-summary-customer", {
        params: { formData },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  summaryOrder(value) {
    var formData = new FormData();
    formData.append("range", value.range);
    formData.append("month", value.month);
    formData.append("year", value.year);
    return Vue.http
      .get(Vue.config["url"] + "/report/order-summary-all", {
        params: { 'dateFrom': value },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },

  getSummaryCust(value, state) {
    var formData = new FormData();
    formData.append("date", state.getDetailPop[0]);
    formData.append("customer_channel_code", state.getDetailPop[1]);
    formData.append("sub_channel", state.getDetailPop[2]);
    formData.append("salesteam_code", state.getDetailPop[3]);
    formData.append("customer_code", state.keyword_code || '');
    return Vue.http
      .post(Vue.config["url"] + "/report/order-summary-customer", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        console.log(state.getDetailPop, state.keyword_code)
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  getSummaryPO(value, state) {
    var formData = new FormData();
    formData.append("date", state.getDetailPO[0]);
    formData.append("customer_channel_code", state.getDetailPO[1]);
    formData.append("sub_channel", state.getDetailPO[2]);
    formData.append("salesteam_code", state.getDetailPO[3]);
    formData.append("po_no", state.keyword_code || '');
    return Vue.http
      .post(Vue.config["url"] + "/report/order-summary-po", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        console.log(state.getDetailPO, state.keyword_code)
        return Promise.resolve(response.body.success);
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



};
