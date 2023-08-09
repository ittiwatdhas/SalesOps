import Vue from 'vue'
import moment from "moment";
export default {

  getPaymentReportDetail(val) {
    // console.log(val);
    var formData = new FormData();
    formData.append("team_select", JSON.stringify(val.team_select));
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("view", val.view);
    return Vue.http
      .post(Vue.config["url"] + "/get-payment-report-detail", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },

  getPaymentDefault(val) {
    return Vue.http
      .get(Vue.config["url"] + "/payment-data-default", {
        params: val,
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },

  getStep3DetailByType(val) {
    var formData = new FormData();
    formData.append("document_id", val.document_id);
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("group_code", val.group_code);

    formData.append("start_date", val.start_date);
    formData.append("end_date", val.end_date);
    formData.append("sm_code", val.sm_code);
    formData.append("button", val.button);
    return Vue.http
      .post(Vue.config["url"] + "/incen-get-detail-type", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },

  getPopupDetailByType(val) {
    var formData = new FormData();
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("group_code", val.group_code);
    formData.append("start_date", val.start_date);
    formData.append("end_date", val.end_date);
    formData.append("sm_code", val.sm_code);
    formData.append("button_id", val.button_id);
    formData.append("button_code", val.button_code);
    formData.append("button_type", val.button_type);
    formData.append("log_user", val.log_user);
    return Vue.http
      .post(Vue.config["url"] + "/incen-get-popup-detail", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },

  setUnlock(val) {
    var formData = new FormData();
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("team_select", JSON.stringify(val.team_select));
    return Vue.http
      .post(Vue.config["url"] + "/set-payment-unlock", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },

  getExportExcel() {
    return Vue.http
      .get(Vue.config["urlReport"] + "/payment-export-excel", {
        params: {},
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  gSheetsAct(val) {
    var formData = new FormData();
   
    formData.append("login", Vue.localStorage.get("emp_id"));
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("teams", val.teams);
     

    return Vue.http
        .post(Vue.config["url"] + "/export-gsheet-payment", formData, {
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

