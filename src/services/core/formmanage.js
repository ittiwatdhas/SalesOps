import Vue from "vue";

export default {
  getOrgForm() {
    return Vue.http
      .get(Vue.config["url"] + "/get-org-form", {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getFormList() {
    return Vue.http
      .get(Vue.config["url"] + "/get-form-manage", {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getALLFormList() {
    return Vue.http
      .get(Vue.config["url"] + "/get-all-form-manage", {
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
    formData.append("id", value.id);
    formData.append("role", value.role);
    return Vue.http
      .post(Vue.config["url"] + "/save-form-manage", formData, {
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
