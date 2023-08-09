import Vue from "vue";

export default {
  settingUserAll(value) {
    return Vue.http
      .get(Vue.config["url"] + "/setting-user-all", {
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
  settingCountUser() {
    return Vue.http
      .get(Vue.config["url"] + "/setting-count-user", {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token"),
        },
      })
      .then((response) => {
        return Promise.resolve(response.body.success);
      })
      .catch((error) => Promise.reject(error));
  },
  settingUserSearch(value) {
    return Vue.http
      .get(Vue.config["url"] + "/setting-user-search", {
        params: {
          id:value.id,
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
  settingSaveUser(value) {
    var formData = new FormData();
    formData.append("type", value.type);
    formData.append("data_detail", JSON.stringify(value));
    return Vue.http
      .post(Vue.config["url"] + "/setting-save-user", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token"),
        },
      })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => Promise.reject(error));
  },
  settingRoleUser(value) {
    return Vue.http
      .get(Vue.config["url"] + "/setting-role-user", {
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
};

// 1.  API : /setting-user-all?keyword=
// TYPE : GET

// 2. API : /setting-count-user
// TYPE : GET

// 3. API : /setting-user-search?role_code=&type=&sort=description&orderby=asc
// TYPE : GET

// 4. API : /setting-save-user
// GET : POST
// ตัวอย่าง
// data_detail:{}
// type:add / edit
