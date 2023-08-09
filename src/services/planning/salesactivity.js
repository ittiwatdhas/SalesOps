import Vue from "vue";
import _ from "lodash";
import moment from "moment";
export default {
  // getDiscountList(value) {
  //   return Vue.http
  //     .get(Vue.config["url"] + "/budget-get-discount", {
  //       params: value,
  //       headers: {
  //         Authorization: "Bearer " + Vue.localStorage.get("token")
  //       }
  //     })
  //     .then(response => {
  //       return Promise.resolve(response.body.success);
  //     })
  //     .catch(error => Promise.reject(error));
  // },
  
  // getLevelSales(value) {
  //   var formData = new FormData();
  //   formData.append("month", value.month);
  //   formData.append("year", value.year);
  //   formData.append("emp_ids", JSON.stringify(value.emp_ids));
  //   return Vue.http
  //     .post(Vue.config["url"] + "/budget-get-levelsales",formData, {
  //       headers: {
  //         Authorization: "Bearer " + Vue.localStorage.get("token")
  //       }
  //     })
  //     .then(response => {
  //       return Promise.resolve(response.body.success);
  //     })
  //     .catch(error => Promise.reject(error));
  // },

  // getPurchaseList(value) {
  //   return Vue.http
  //     .get(Vue.config["url"] + "/budget-get-purchase", {
  //       params: value,
  //       headers: {
  //         Authorization: "Bearer " + Vue.localStorage.get("token")
  //       }
  //     })
  //     .then(response => {
  //       return Promise.resolve(response.body.success);
  //     })
  //     .catch(error => Promise.reject(error));
  // },

  // getOrderById(values) {
  //   var formData = new FormData();
  //   formData.append("h_id", values.h_id);
  //   formData.append("doc_no", values.doc_no);
  //   return Vue.http
  //     .post(Vue.config["url"] + "/get-order-Details", formData, {
  //       headers: {
  //         Authorization: "Bearer " + Vue.localStorage.get("token")
  //       }
  //     })
  //     .then(response => {
  //       return Promise.resolve(response.body.success.data);
  //     })
  //     .catch(error => Promise.reject(error));
  // },
  // getShipTo(values) {
  //   return Vue.http
  //     .get(Vue.config["url"] + "/get-ship-to", {
  //       params: {
  //         cust_code: values
  //       },
  //       headers: {
  //         Authorization: "Bearer " + Vue.localStorage.get("token")
  //       }
  //     })
  //     .then(response => {
  //       return Promise.resolve(response.body.success.data);
  //     })
  //     .catch(error => Promise.reject(error));
  // },
  // getFlow(value) {
  //   return Vue.http
  //     .get(Vue.config["url"] + "/order-get-flow", {
  //       params: value,
  //       headers: {
  //         Authorization: "Bearer " + Vue.localStorage.get("token")
  //       }
  //     })
  //     .then(response => {
  //       return Promise.resolve(response.body.success.data);
  //     })
  //     .catch(error => Promise.reject(error));
  // },
  // getComment(values) {
  //   return Vue.http
  //     .get(Vue.config["url"] + "/order-getcomment", {
  //       params: values,
  //       headers: {
  //         Authorization: "Bearer " + Vue.localStorage.get("token")
  //       }
  //     })
  //     .then(response => {
  //       return Promise.resolve(response.body.success.data);
  //     })
  //     .catch(error => Promise.reject(error));
  // },
  // readComment(values) {
  //   if (values.length > 0) {
  //     var formData = new FormData();
  //     values.forEach(function(row, key) {
  //       formData.append("id[]", row.id);
  //     });
  //     return Vue.http
  //       .post(Vue.config["url"] + "/order-updatecomment", formData, {
  //         headers: {
  //           Authorization: "Bearer " + Vue.localStorage.get("token")
  //         }
  //       })
  //       .then(response => {
  //         return Promise.resolve(response.body);
  //       })
  //       .catch(error => Promise.reject(error));
  //   }
  // },
  // saveComment(values) {
  //   var formData = new FormData();
  //   formData.append("head_id", values.h_id);
  //   formData.append("doc_no", values.doc_no);
  //   formData.append("fname", values.first_name);
  //   formData.append("lname", values.last_name);
  //   formData.append("emp_id", values.emp_id);
  //   formData.append("comment", values.comment);
  //   formData.append("status", values.status);
  //   formData.append("position", values.position);
  //   formData.append("msg_to", values.msg_to);
  //   formData.append("emp_id_start", values.emp_id);
  //   return Vue.http
  //     .post(Vue.config["url"] + "/order-savecomment", formData, {
  //       headers: {
  //         Authorization: "Bearer " + Vue.localStorage.get("token")
  //       }
  //     })
  //     .then(response => {
  //       return Promise.resolve(response.body.success.data);
  //     })
  //     .catch(error => Promise.reject(error));
  // },
  // GetBudgetMT(value) {
  //   return Vue.http
  //       .get(Vue.config["url"] + "/budget-get-mt", {
  //           params: {
  //             range: value.range,
  //             month: value.month,
  //             year: value.year,
  //             emp_id: value.emp_id,
  //             filter: value.filter,
  //             corp_code: value.corp_code,
  //             page: value.page,
  //             per_page: value.per_page
  //           },
  //           headers: {
  //               Authorization: "Bearer " + Vue.localStorage.get("token")
  //           }
  //       })
  //       .then(response => {
  //           return Promise.resolve(response.body.success);
  //       })
  //       .catch(error => Promise.reject(error));
  // },
  //   getCorporateCode(datas){
  //       return Vue.http.get(Vue.config["url"] + '/edi-corporate-code'
  //       ).then(function (response){
  //           return Promise.resolve(response.body);
  //       }).catch(function (error){
  //           return Promise.reject(error);
  //       });
  //   }
};
