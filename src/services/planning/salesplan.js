import Vue from "vue";

export default {
  getSalePlan(year, month) {
    return Vue.http
      .get(Vue.config["url"] + "/get-all-salesplan", {
        params: { year: year, month: month },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  saveTargetPerCust(values) {
    var formData = new FormData();
    formData.append("year", values.year);
    formData.append("month", values.month);
    formData.append("cust_code", values.cust_code);
    formData.append("area_code", values.area_code);
    formData.append("target", values.target);
    formData.append("selected", values.selected);
    return Vue.http
      .post(Vue.config["url"] + "/save-splan-bycust", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.data);
      })
      .catch(error => Promise.reject(error));
  },
  getSalePlanByPro(values) {
    return Vue.http
      .get(Vue.config["url"] + "/get-splan-bycust", {
        params: {
          year: values.year,
          month: values.month,
          cust_code: values.cust_code,
          // 'keyword': values.keyword ,
          select: values.select
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  searchItemsProduct(values) {
    return Vue.http
      .get(Vue.config["url"] + "/search-splan-product", {
        params: {
          year: values.year,
          month: values.month,
          cust_code: values.cust_code,
          prod_code: values.prod_code
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  autoComplete(values) {
    return Vue.http
      .get(Vue.config["url"] + "/get-master-salesplan", {
        params: {
          keyword: values.keyword
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  saveOrderQtyOfItem(values) {
    var formData = new FormData();
    formData.append("year", values.year);
    formData.append("month", values.month);
    formData.append("cust_code", values.cust_code);
    formData.append("prod_grp", values.prod_grp);
    formData.append("grp_order_qty", values.grp_order_qty);
    formData.append("prod_code", values.prod_code);
    formData.append("order_qty", values.order_qty);
    formData.append("sales_item", values.sales_item);
    return Vue.http
      .post(Vue.config["url"] + "/save-splan-product", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.data);
      })
      .catch(error => Promise.reject(error));
  },
  updateOrderQtyOfItem(values) {
    var formData = new FormData();
    values.forEach(function(rowItem, key) {
      formData.append("type", "order");
      formData.append("datas[" + key + "][year]", rowItem.year);
      formData.append("datas[" + key + "][month]", rowItem.month);
      formData.append("datas[" + key + "][cust_code]", rowItem.cust_code);
      formData.append("datas[" + key + "][prod_grp]", rowItem.prod_grp);
      formData.append("datas[" + key + "][grp_order_qty]", "");
      formData.append("datas[" + key + "][prod_code]", rowItem.prod_code);
      formData.append("datas[" + key + "][order_qty]", rowItem.order_qty);
      formData.append("datas[" + key + "][sales_item]", rowItem.sales);
    });
    return Vue.http
      .post(Vue.config["url"] + "/save-splan-product", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.data);
      })
      .catch(error => Promise.reject(error));
  },
  getStock(values) {
    return Vue.http
      .get(Vue.config["url"] + "/check-stock-product", {
        params: {
          prod_code: values.prod_code,
          cust_code: values.cust_code
        },
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  addItem(values) {
    var formData = new FormData();
    formData.append("year", values.year);
    formData.append("month", values.month);
    formData.append("cust_code", values.cust_code);
    formData.append("prod_code", values.prod_code);
    formData.append("prod_name", values.prod_name);
    formData.append("mtype", values.mtype);
    formData.append("ref_item_code", values.ref_item_code);
    formData.append("item_prod_name", values.item_prod_name);
    formData.append("rtype", values.rtype);
    return Vue.http
      .post(Vue.config["url"] + "/save-splan-newprod", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.data);
      })
      .catch(error => Promise.reject(error));
  },
  saveBookmark(values) {
    var formData = new FormData();
    formData.append("year", values.year);
    formData.append("month", values.month);
    formData.append("cust_code", values.cust_code);
    formData.append("prod_grp", values.prod_grp);
    formData.append("book_mark", values.book_mark);
    formData.append("order_qty", values.order_qty);
    return Vue.http
      .post(Vue.config["url"] + "/save-bookmark", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.data);
      })
      .catch(error => Promise.reject(error));
  }
};
