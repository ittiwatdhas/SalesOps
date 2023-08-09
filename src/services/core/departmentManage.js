import Vue from "vue";

export default {
  settingDepartment(value) {
    return Vue.http
      .get(Vue.config["url"] + "/setting-department-all", {
        params: {
          keyword: value,
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token"),
        },
      })
      .then((response) => {
        return Promise.resolve(response.body.success);
      })
      .catch((error) => Promise.reject(error));
  },
  settingCountDepartment() {
    return Vue.http
      .get(Vue.config["url"] + "/setting-count-department", {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token"),
        },
      })
      .then((response) => {
        return Promise.resolve(response.body.success);
      })
      .catch((error) => Promise.reject(error));
  },
  settingDepartmentSearch(value) {
    return Vue.http
      .get(Vue.config["url"] + "/setting-department-search", {
        params: {
          code: value.code,
          type: value.type,
          sort: value.sort,
          orderby: value.orderby,
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token"),
        },
      })
      .then((response) => {
        return Promise.resolve(response.body.success);
      })
      .catch((error) => Promise.reject(error));
  },
  settingSaveDepartment(value) {

    var formData = new FormData();
    formData.append("type",value.type_save);
    formData.append("data_detail",JSON.stringify(value));
    return Vue.http
      .post(Vue.config["url"] + "/setting-save-department", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token"),
        },
      })
      .then((response) => {
        console.log(response);
        return Promise.resolve(response);
      })
      .catch((error) => Promise.reject(error));
  },
};

// setting-count-department
// /setting-department-search?code=&type=&sort=&orderby=asc
// setting-save-department
// /setting-save-department
