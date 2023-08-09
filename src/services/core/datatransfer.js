import Vue from "vue";
import moment  from "moment";

export default {
      listApi(value) {
        var formData = new FormData();
        formData.append("type", value);
        return Vue.http
          .post(Vue.config["url"] + "setting/list-api", formData, {
            headers: {
              Authorization: "Bearer " + Vue.localStorage.get("token"),
            },
          })
          .then((response) => {
            return Promise.resolve(response);
          })
          .catch((error) => Promise.reject(error));
      },
      runApi(value) {
        var formData = new FormData();
        formData.append("code", value.code);
        formData.append("param", value.param);
        return Vue.http
          .post(Vue.config["url"] + "setting/run-api", formData, {
            headers: {
              Authorization: "Bearer " + Vue.localStorage.get("token"),
            },
          })
          .then((response) => {
            return Promise.resolve(response);
          })
          .catch((error) => Promise.reject(error));
      },
      
      historyLog(value) {
        var formData = new FormData();

        var  startdate = moment(value.end_date);
        var new_date = moment(startdate, "DD-MM-YYYY");
        new_date.add(1, 'days');
        value.end_date = moment(new_date).format('YYYY-MM-DD')
        formData.append("code", value.code);
        formData.append("start_date", value.start_date);
        formData.append("end_date", value.end_date);
        return Vue.http
          .post(Vue.config["url"] + "setting/history-log", formData, {
            headers: {
              Authorization: "Bearer " + Vue.localStorage.get("token"),
            },
          })
          .then((response) => {
            return Promise.resolve(response);
          })
          .catch((error) => Promise.reject(error));
      },


    // settingRole(value) {
    //     return Vue.http
    //       .get(Vue.config["url"] + "/setting-role-all", {
    //         params: {
    //           keyword: value,
    //         },
    //         headers: {
    //           Authorization: "Bearer " + Vue.localStorage.get("token"),
    //         },
    //       })
    //       .then((response) => {
            
    //         return Promise.resolve(response.body.success);
    //       })
    //       .catch((error) => Promise.reject(error));
    //   },
    // settingCountRole() {
    //     return Vue.http.get(Vue.config['url'] + '/setting-count-role', {
    //         headers: {
    //             'Authorization': 'Bearer ' + Vue.localStorage.get('token')
    //         },
    //     }).then((response) => {

          
    //         return Promise.resolve(response.body.success);
    //     }).catch((error) => Promise.reject(error));
    // },
    // settingRoleSearch(value) {
    //     return Vue.http
    //       .get(Vue.config["url"] + "/setting-role-search", {
    //         params: {
    //           code: value.code,
    //           type: value.type,
    //           sort: value.sort,
    //           orderby: value.orderby,
    //         },
    //         headers: {
    //           Authorization: "Bearer " + Vue.localStorage.get("token"),
    //         },
    //       })
    //       .then((response) => {
    //         return Promise.resolve(response.body.success);
    //       })
    //       .catch((error) => Promise.reject(error));
    //   },
    //   settingSaveRole(value) {
    //     var formData = new FormData();
    //     formData.append("type", value.type);
    //     formData.append("data_detail", JSON.stringify(value));
    //     return Vue.http
    //       .post(Vue.config["url"] + "/setting-save-role", formData, {
    //         headers: {
    //           Authorization: "Bearer " + Vue.localStorage.get("token"),
    //         },
    //       })
    //       .then((response) => {
    //         console.log(response)
    //         // Duplicate
    //         return Promise.resolve(response);
    //       })
    //       .catch((error) => Promise.reject(error));
    //   },
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
