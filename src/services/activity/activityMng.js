import Vue from 'vue'
import moment from "moment";
export default {

  getDataActivityList(val) {
    var formData = new FormData();
    formData.append("range", val.range);
    formData.append("month", val.month);
    formData.append("year", val.year);
    formData.append("filter", JSON.stringify(val.filter));
    return Vue.http
      .post(Vue.config["url"] + "/get-data-activity-list", formData, {
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
      .get(Vue.config["url"] + "/filter-sales-all", {
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

  filterCustomer(params) {
    return Vue.http
      .get(Vue.config["url"] + "/filter-customer-bysales", {
        params: params,
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },

  saveActivityDetail(val) {
    var formData = new FormData();
    formData.append("type", val.type);
    formData.append("data_detail", JSON.stringify(val.data_detail));
    return Vue.http
      .post(Vue.config["url"] + "/save-activity", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },

  

}

