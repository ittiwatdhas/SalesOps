import Vue from "vue";

export default {
  getSalesmanByKey(value) {
    var formData = new FormData();
    formData.append("user_emp_id", value);
    return Vue.http
      .post(Vue.config["url"] + "/get-salesman-by-key", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getAllList(value) {
    var formData = new FormData();
    formData.append("user_emp_id", value);
    formData.append("orderby", "ASC");
    formData.append("sort", "team_code");
    formData.append("mode", "all");

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
  getRecList(values) {
    let status = values.statusAtv ? 1 : 0;
    var formData = new FormData();
    formData.append("user_emp_id", values.sales);
    formData.append("log_usrole", Vue.localStorage.get("user_role_id"));
    formData.append("status", status);
    formData.append("fiscal_year", values.year);
    formData.append("fiscal_cycle", values.cycle);
    return Vue.http
      .post(Vue.config["url"] + "/get-recipient-list", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getSalesmanNoGroup(value) {
    var formData = new FormData();
    formData.append("user_emp_id", value.sales);
    formData.append("fiscal_year", value.year);
    formData.append("fiscal_cycle", value.cycle);
    return Vue.http
      .post(Vue.config["url"] + "/get-salesman-nogroup", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  checkDupCode(value) {
    var formData = new FormData();
    formData.append("group_code", value.group_code);
    formData.append("fiscal_year", value.year);
    formData.append("fiscal_cycle", value.cycle);
    return Vue.http
      .post(Vue.config["url"] + "/check-group-code", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  updateRec(value, mode) {
    var formData = new FormData();
    if (mode == "paid") {
      let paid = value.paid ? 1 : 0;
      formData.append("id", value.id);
      formData.append("emp_id", value.sm_code);
      formData.append("emp_code", value.emp_code);
      formData.append("paid", paid);
    } else if (mode == "leavegroup") {
      formData.append("id", value.id);
      formData.append("group_previous", value.group_code);
    } else if (mode == "addchips") {
      formData.append("id", value.id);
      formData.append("emp_ids", value.emp_ids);
      value["details"].forEach(function(row, key) {
        let paid = row.paid ? 1 : 0;
        formData.append("details[" + key + "][emp_code]", row.emp_code);
        formData.append("details[" + key + "][emp_id]", row.code);
        formData.append("details[" + key + "][sales_name]", row.sm_name);
        formData.append("details[" + key + "][salesteam_name]", row.salesteam_name);
        formData.append(
          "details[" + key + "][rec_group_current]",
          value.group_code
        );
        formData.append("details[" + key + "][paid]", paid);
        formData.append("details[" + key + "][group_status]", 1);

        formData.append("details[" + key + "][select_sales_rep]", row.select_sales_rep);
        formData.append("details[" + key + "][fiscal_year]", row.fiscal_year);
        formData.append("details[" + key + "][fiscal_cycle]", row.fiscal_cycle);
      });
    } else if(mode == "changestatusgroup"){
      var status_group = (value.status_group)?0:1; // if status_group = true(active) update status = 0 else 1
      formData.append("status_group", status_group);
    // } else if (mode == "group_name") {
    }else if(mode == "changepaystatus"){
      formData.append("pay_status", (value.pay_status === true)?1:2);
    }
    formData.append("mode", mode);
    formData.append("fiscal_year", value.year);
    formData.append("fiscal_cycle", value.cycle);
    formData.append("group_code", value.group_code);
    formData.append("group_name", value.group_name);
    return Vue.http
      .post(Vue.config["url"] + "/update-recipient", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  updateTarget(value) {
    var formData = new FormData();
    formData.append('emp_code', value.emp_code)
    formData.append('emp_id', value.emp_id)
    formData.append('fiscal_cycle', value.fiscal_cycle)
    formData.append('fiscal_year', value.fiscal_year)
    formData.append('group_code' ,value.group_code)
    formData.append('group_name', value.group_name)
    formData.append('mode' ,value.mode)
    formData.append('target' ,Number(value.target))
    formData.append('type', value.type)
    return Vue.http
      .post(Vue.config["url"] + "/update-recipient", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  }
  
};
