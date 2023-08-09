import Vue from "vue";
import _ from "lodash";
import moment from "moment";
export default {
  getCust(value) {
    var formData = new FormData();
    formData.append("range", value.range);
    formData.append("month", value.month);
    formData.append("year", value.year);
    formData.append("filter", JSON.stringify(value.filter));
    return Vue.http
      .post(Vue.config["url"] + "/inquiry-get-head", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },

  inquirygettotalhead(value) {
    var formData = new FormData();
    formData.append("range", value.range);
    formData.append("month", value.month);
    formData.append("year", value.year);
    formData.append("filter", JSON.stringify(value.filter));
    return Vue.http
      .post(Vue.config["url"] + "/inquiry-get-total-head", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  showDetailByCust(value) {
    var formData = new FormData();
    formData.append("range", value.range);
    formData.append("month", value.month);
    formData.append("year", value.year);
    formData.append("cust_code", value.cust_code);
    formData.append("filter", JSON.stringify(value.filter));
    return Vue.http
      .post(Vue.config["url"] + "/inquiry-get-head-bycustomer", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  showDetailByPo(values) {
    return Vue.http
      .get(Vue.config["url"] + "/inquiry-get-detail", {
        params: values,
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  }
}
