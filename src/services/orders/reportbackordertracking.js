import Vue from "vue";
import _ from "lodash";
import moment from "moment";
export default {
  getDropdownCust(val) {
    var formData = new FormData();
    formData.append("search", val.search);
    formData.append("group_code", val.group_code);
    formData.append("product_no", val.product_no);
    formData.append("salesman", val.salesman);
    if (_.trim(val.area).length > 0) {
      let rs = JSON.stringify(val.area)
      formData.append("area", rs);
    } else {
      formData.append("area", '');
    }

    if (_.trim(val.type).length > 0) {
      let rsType = JSON.stringify(val.type)
      formData.append("type", rsType);
    } else {
      formData.append("type", '');
    }
    return Vue.http
      .post(Vue.config["url"] + "backorder/GetItemBackOrder", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  searchCustomer(val) {
    var formData = new FormData();
    formData.append("product_no", val.product_no);
    formData.append("sm_code", val.sm_code);
    formData.append("cust_name", val.cust_name);
    formData.append("feild", val.feild);
    formData.append("sorting", val.sorting);
    formData.append("start", val.start);
    formData.append("limit", val.limit);
    if (_.trim(val.area).length > 0) {
      let rs = JSON.stringify(val.area)
      formData.append("area", rs);
    } else {
      formData.append("area", '');
    }

    if (_.trim(val.type).length > 0) {
      let rsType = JSON.stringify(val.type)
      formData.append("type", rsType);
    } else {
      formData.append("type", '');
    }
    return Vue.http
      .post(Vue.config["url"] + "backorder/GetProduct", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  searchProductGroup(val) {
    var formData = new FormData();
    formData.append("group_code", val.group_code);
    formData.append("product_name", val.product_name);
    formData.append("feild", val.feild);
    formData.append("sorting", val.sorting);
    formData.append("start", val.start);
    formData.append("limit", val.limit);

    if (_.trim(val.area).length > 0) {
      let rs = JSON.stringify(val.area)
      formData.append("area", rs);
    } else {
      formData.append("area", '');
    }

    if (_.trim(val.type).length > 0) {
      let rsType = JSON.stringify(val.type)
      formData.append("type", rsType);
    } else {
      formData.append("type", '');
    }

    return Vue.http
      .post(Vue.config["url"] + "backorder/GetProduct_group", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getDropdownProductGroup(val) {
    var formData = new FormData();
    formData.append("search_group", val.search_group);
    formData.append("search_area", val.search_area);
    if (_.trim(val.area).length > 0) {
      let rsArea = JSON.stringify(val.area)
      formData.append("area", rsArea);
    } else {
      formData.append("area", '');
    }
    if (_.trim(val.type).length > 0) {
      let rsType = JSON.stringify(val.type)
      formData.append("type", rsType);
    } else {
      formData.append("type", '');
    }

    return Vue.http
      .post(Vue.config["url"] + "backorder/GetGroupBackOrder", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getAllProductDropdown(val) {
    var formData = new FormData();
    formData.append("search", val);
    return Vue.http
      .post(Vue.config["url"] + "backorder/GetAllBackOrder", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  getProductTypeDropdown(value) {
    return Vue.http
      .get(Vue.config["url"] + "backorder/GetAllBackOrder_type", {
        params: {},
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  searchAllProduct(val) {
    var formData = new FormData();
    if (_.trim(val.area).length > 0) {
      let rs = JSON.stringify(val.area)
      formData.append("area", rs);
    } else {
      formData.append("area", '');
    }

    if (_.trim(val.type).length > 0) {
      let rsType = JSON.stringify(val.type)
      formData.append("type", rsType);
    } else {
      formData.append("type", '');
    }
    // if (_.trim(val.filter_bk).length > 0) {
    //   let rs = JSON.stringify(val.filter_bk)
    //   formData.append("filter_bk", rs);
    // } else {
    //   formData.append("filter_bk", '');
    // }
    formData.append("filter_bk", val.filter_bk);
    formData.append("search", val.search);
    formData.append("feild", val.feild);
    formData.append("sorting", val.sorting);
    formData.append("start", val.start);
    formData.append("limit", val.limit);
    return Vue.http
      .post(Vue.config["url"] + "backorder/GetAll_BackOrder", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  searchUnresponded(val) {
    var formData = new FormData();
    if (_.trim(val.area).length > 0) {
      let rs = JSON.stringify(val.area)
      formData.append("area", rs);
    } else {
      formData.append("area", '');
    }

    if (_.trim(val.type).length > 0) {
      let rsType = JSON.stringify(val.type)
      formData.append("type", rsType);
    } else {
      formData.append("type", '');

    }
    if (_.trim(val.unresponded).length > 0) {
      let rs = JSON.stringify(val.unresponded)
      formData.append("unresponded", rs);
    } else {
      formData.append("unresponded", '');
    }
    formData.append("feild", val.feild);
    formData.append("sorting", val.sorting);
    return Vue.http
      .post(Vue.config["url"] + "backorder/Unresponded", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  searchUnrespondedDetail(val) {
    var formData = new FormData();
    if (_.trim(val.area).length > 0) {
      let rs = JSON.stringify(val.area)
      formData.append("area", rs);
    } else {
      formData.append("area", '');
    }

    if (_.trim(val.type).length > 0) {
      let rsType = JSON.stringify(val.type)
      formData.append("type", rsType);
    } else {
      formData.append("type", '');

    }
    if (_.trim(val.unresponded_detail).length > 0) {
      let rs = JSON.stringify(val.unresponded_detail)
      formData.append("unresponded_detail", rs);
    } else {
      formData.append("unresponded_detail", '');
    }
    if (_.trim(val.unresponded).length > 0) {
      let rs = JSON.stringify(val.unresponded)
      formData.append("unresponded", rs);
    } else {
      formData.append("unresponded", '');
    }
    formData.append("feild", val.feild);
    formData.append("sorting", val.sorting);
    return Vue.http
      .post(Vue.config["url"] + "backorder/Unresponded_Detail", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  searchDiscontinued(val) {
    var formData = new FormData();
    if (_.trim(val.area).length > 0) {
      let rs = JSON.stringify(val.area)
      formData.append("area", rs);
    } else {
      formData.append("area", '');
    }

    if (_.trim(val.type).length > 0) {
      let rsType = JSON.stringify(val.type)
      formData.append("type", rsType);
    } else {
      formData.append("type", '');

    }
    if (_.trim(val.discontinued).length > 0) {
      let rs = JSON.stringify(val.discontinued)
      formData.append("discontinued", rs);
    } else {
      formData.append("discontinued", '');
    }
    formData.append("feild", val.feild);
    formData.append("sorting", val.sorting);
    return Vue.http
      .post(Vue.config["url"] + "backorder/Discontinued", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  searchViewqList(val) {
    var formData = new FormData();
    if (_.trim(val.queue).length > 0) {
      let rs = JSON.stringify(val.queue)
      formData.append("queue", rs);
    } else {
      formData.append("queue", '');
    }
    formData.append("feild", val.feild);
    formData.append("sorting", val.sorting);
    return Vue.http
      .post(Vue.config["url"] + "backorder/ViewQueue", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  filterProduct(val) {
    var formData = new FormData();
    formData.append("search", val.search);
    formData.append("group_code", val.group_code);
    if (_.trim(val.area).length > 0) {
      let rs = JSON.stringify(val.area)
      formData.append("area", rs);
    } else {
      formData.append("area", '');
    }

    if (_.trim(val.type).length > 0) {
      let rsType = JSON.stringify(val.type)
      formData.append("type", rsType);
    } else {
      formData.append("type", '');
    }
    return Vue.http
      .post(Vue.config["url"] + "backorder/Get_product", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  searchProduct(val) {
    var formData = new FormData();
    if (_.trim(val.item_name).length > 0) {
      let rs = JSON.stringify(val.item_name)
      formData.append("item_name", rs);
    } else {
      formData.append("item_name", '');
    }
    formData.append("search", val.search);
    formData.append("feild", val.feild);
    formData.append("sorting", val.sorting);
    formData.append("start", val.start);
    formData.append("limit", val.limit);
    if (_.trim(val.area).length > 0) {
      let rs = JSON.stringify(val.area)
      formData.append("area", rs);
    } else {
      formData.append("area", '');
    }

    if (_.trim(val.type).length > 0) {
      let rsType = JSON.stringify(val.type)
      formData.append("type", rsType);
    } else {
      formData.append("type", '');
    }
    return Vue.http
      .post(Vue.config["url"] + "backorder/Group_Area", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  export(value) {
    return Vue.http
      .get(Vue.config["url"] + "backorder/export_backorder_tracking", {
        params: {
          search: value.search,
          area: value.area,
          type: value.type,
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
  gSheets(val) {
    var formData = new FormData();
    formData.append("search", val.search);
    formData.append("filter_bk", val.filter_bk);
    if (_.trim(val.area).length > 0) {
      // let rsArea = JSON.stringify(val.area)
      formData.append("area", val.area);
    } else {
      formData.append("area", '');
    }
    if (_.trim(val.type).length > 0) {
      // let rsType = JSON.stringify(val.type)
      formData.append("type", val.type);
    } else {
      formData.append("type", '');
    }
    if (_.trim(val.email).length > 0) {
      // let rsemail = JSON.stringify(val.email)
      formData.append("email", val.email);
    } else {
      formData.append("email", '');
    }
    return Vue.http
      .post(Vue.config["url"] + "backorder/gsheets_backorder_tracking", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  gSheetsViewQ(val) {
    console.log(val.queue)
    var formData = new FormData();
    if (_.trim(val.queue).length > 0) {
      let rsqueue = JSON.stringify(val.queue)
      formData.append("queue", rsqueue);
    } else {
      formData.append("queue", '');
    }
    if (_.trim(val.email).length > 0) {
      formData.append("email", val.email);
    } else {
      formData.append("email", '');
    }
    formData.append("feild", val.feild);
    formData.append("sorting", val.sorting);
    return Vue.http
      .post(Vue.config["url"] + "backorder/gsheets_ViewQueue", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
};
