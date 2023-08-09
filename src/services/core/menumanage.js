import Vue from "vue";

export default {
  saveMenu(value) {
    var formData = new FormData();
    let detail = JSON.stringify(value)
    formData.append("data", detail);
    return Vue.http
      .post(Vue.config["url"] + "/save-menu-management", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  getMenu(value) {
    var formData = new FormData();
    // formData.append("id", value.id);
    return Vue.http
      .post(Vue.config["url"] + "/get-menu-management", formData, {
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
