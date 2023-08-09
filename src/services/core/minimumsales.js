import Vue from "vue";
import { type } from "os";

export default {
  getByGroups(user_emp_id) {
    var formData = new FormData();
    formData.append("user_emp_id", user_emp_id);
    return Vue.http
      .post(Vue.config["url"] + "/get-team-group", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getBySalesman(emp_id) {
    var formData = new FormData();
    formData.append("user_emp_id", emp_id);
    return Vue.http
      .post(Vue.config["url"] + "/by-groups-sale", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getUserRoleId(emp_id) {
    var formData = new FormData();
    formData.append("user_emp_id", emp_id);
    return Vue.http
      .post(Vue.config["url"] + "/get-user-roleId", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  getAllList(value) {
    var formData = new FormData();
    formData.append("user_emp_id", value.user_emp_id);
    formData.append("orderby", value.orderby);
    formData.append("sort", value.sort);
    if (typeof value.mode == "undefined") {
      formData.append("mode", "");
    } else {
      formData.append("mode", value.mode);
    }

    return Vue.http
      .post(Vue.config["url"] + "/get-minimum-sales", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  save(value) {
    var formData = new FormData();
    // formData.append("user_name", value.user_name);
    formData.append("id", value.id);
    // formData.append("emp_code", value.sm_code);
    formData.append("emp_id", value.sm_code);
    formData.append("min_sales_current", value.minimum);
    formData.append("min_sales_previous", value.minimum_previous);
    formData.append("status", value.status);
    return Vue.http
      .post(Vue.config["url"] + "/save-minimum-sales", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => Promise.reject(error));
  }
};
