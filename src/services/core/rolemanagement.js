import Vue from "vue";

export default {
    settingRole(value) {
      
        return Vue.http
          .get(Vue.config["url"] + "/setting-role-all", {
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
    settingCountRole() {
        return Vue.http.get(Vue.config['url'] + '/setting-count-role', {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {

          
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },
    settingRoleSearch(value) {
        return Vue.http
          .get(Vue.config["url"] + "/setting-role-search", {
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
      settingRoleSearch_full(value) {
        return Vue.http
          .get(Vue.config["url"] + "/setting-role-search", {
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
      settingSaveRole(value) {
        var formData = new FormData();
        formData.append("type", value.type);
        formData.append("data_detail", JSON.stringify(value));
        return Vue.http
          .post(Vue.config["url"] + "/setting-save-role", formData, {
            headers: {
              Authorization: "Bearer " + Vue.localStorage.get("token"),
            },
          })
          .then((response) => {
            console.log(response)
            // Duplicate
            return Promise.resolve(response);
          })
          .catch((error) => Promise.reject(error));
      },
};



// 1.  API : /setting-role-all?keyword=
// TYPE : GET

// 2. API : /setting-count-role
// TYPE : GET

// 3. API : /setting-role-search?code=&type=&sort=description&orderby=asc
// TYPE : GET

// 4. API : /setting-save-role
// GET : POST
// ตัวอย่าง
// data_detail:{}
// type:add / edit
