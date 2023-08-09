import Vue from "vue";

export default {
  getSummary(values, salesman_code) {
    var formData = new FormData();
    formData.append("sale_emp_id", salesman_code);
    formData.append("month", values.month);
    formData.append("year", values.year);
    return Vue.http
      .post(Vue.config["url"] + "/total-salearea", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getByGrouup() {
    return Vue.http
      .get(Vue.config["url"] + "/get-group-sale", {
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
  getBySalesman(values, salesmane_code) {
    var formData = new FormData();
    formData.append("sale_emp_id", salesmane_code);
    formData.append("month", values.month);
    formData.append("year", values.year);
    return Vue.http
      .post(Vue.config["url"] + "/get-sale-all", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  getGraphBymonth(values, salesmane_code) {
    var formData = new FormData();
    formData.append("sale_emp_id", salesmane_code);
    formData.append("month", values.month);
    formData.append("year", values.year);
    return Vue.http
      .post(Vue.config["url"] + "/get-graph-bymonth", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  getByCG(values) {
    var formData = new FormData();
    let limit = 25;
    formData.append("start", values.start);
    formData.append("limit", limit);
    formData.append("sale_emp_id", values[1]);
    formData.append("month", values[0].month);
    formData.append("year", values[0].year);
    formData.append("sort_by", values[2] == "" ? "lowest_achieve" : values[2]);
    // formData.append("sort_by", values[2] == "" ? "highest_achieve" : values[2]);
    values[3].forEach(function(row, key) {
      formData.append("filter[" + key + "][name]", row.name);
      formData.append("filter[" + key + "][sort]", row.sort);
      formData.append("filter[" + key + "][step]", row.step);
    });
    // formData.append("sort_filter", values[3].sort_filter);
    return Vue.http
      .post(Vue.config["url"] + "/get-cg", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getProdDetail(values) {
    var formData = new FormData();
    formData.append("sale_emp_id", values[1]);
    formData.append("month", values[0].month);
    formData.append("year", values[0].year);
    formData.append("cg_code", values[2]);
    formData.append("sort_by", values[3]);
    return Vue.http
      .post(Vue.config["url"] + "/get-prod-detail", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getCGAll(values) {
    var formData = new FormData();
    formData.append("sale_emp_id", values.sale_emp_id);
    formData.append("month", values.month);
    formData.append("year", values.year);
    return Vue.http
      .post(Vue.config["url"] + "/get-cg-all", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getProdSearch(values) {
    var formData = new FormData();
    formData.append("sale_emp_id", values.sale_emp_id);
    formData.append("month", values.month);
    formData.append("year", values.year);
    formData.append("pro_cg_code", values.code);
    return Vue.http
      .post(Vue.config["url"] + "/get-prod-search", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getSalesmanByCust(values) {
    // var formData = new FormData();
    // formData.append("cust_code", values.customer_code);
    // return Vue.http
    //   .post(Vue.config["url"] + "/get-saleman-by-cust", formData, {
    //     headers: {
    //       Authorization: "Bearer " + Vue.localStorage.get("token")
    //     }
    //   })
    //   .then(response => {
    //     return Promise.resolve(response.body.success.data);
    //   })
    //   .catch(error => Promise.reject(error));
  }
};
