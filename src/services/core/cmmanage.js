import Vue from "vue";

export default {

    searchCustomer(value) {
        var formData = new FormData();
        formData.append('cust_search', value.cust_search);
        formData.append('province', value.province);
        formData.append('channel', value.channel);
        formData.append('type', value.type);
        return Vue.http.post(Vue.config['url'] + '/setting/search-customer', formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },
    searchCustomerRole(value) {
      var formData = new FormData();
      formData.append('cust_search', value.cust_search);
      formData.append('role', value.role);
      formData.append('channel', value.channel);
    //   formData.append('type', value.type);
      return Vue.http.post(Vue.config['url'] + '/setting/search-customer-role', formData, {
          headers: {
              'Authorization': 'Bearer ' + Vue.localStorage.get('token')
          },
      }).then((response) => {
          return Promise.resolve(response.body.success);
      }).catch((error) => Promise.reject(error));
  },
  searchDetailAllRole(value) {
    var formData = new FormData();
    formData.append('cust_search', '');
    formData.append('role', value);
    formData.append('channel', '');
  //   formData.append('type', value.type);
    return Vue.http.post(Vue.config['url'] + '/setting/search-customer-role', formData, {
        headers: {
            'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
},
searchDetailAllRoleAdd(value) {
    var formData = new FormData();
    formData.append('cust_search', '');
    formData.append('role', value);
    formData.append('channel', '');
  //   formData.append('type', value.type);
    return Vue.http.post(Vue.config['url'] + '/setting/search-customer-role', formData, {
        headers: {
            'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
},

  
    countCustomer() {
    return Vue.http
      .get(Vue.config["url"] + "/setting/count-customer", {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token"),
        },
      })
      .then((response) => {
        return Promise.resolve(response.body.success);
      })
      .catch((error) => Promise.reject(error));
  },
  editRoleDetail(value) {
    var formData = new FormData();
    formData.append('role_code',value.role_code);
    formData.append('cust_search',value.cust_search);
    formData.append('channel',value.channel);
    return Vue.http.post(Vue.config['url'] + '/setting/edit-role-detail', formData, {
        headers: {
            'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
},
  delRoleDetail(value) {
    var formData = new FormData();
    formData.append('role_code',value.role_code);
    return Vue.http.post(Vue.config['url'] + '/setting/del-role-detail', formData, {
        headers: {
            'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
},
syncCustOnsales(value) {
    var formData = new FormData();
    formData.append('role_code',value.role_code);
    return Vue.http.post(Vue.config['url'] + '/setting/sync-cust-onsales', formData, {
        headers: {
            'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
},
searchUser(value) {
    var formData = new FormData();
    formData.append('role_code',value.role_code);
    return Vue.http.post(Vue.config['url'] + '/setting/searchUser', formData, {
        headers: {
            'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
},
addRoleDetail(value) {
    var formData = new FormData();
    formData.append('role_code',value.role_code);
    return Vue.http.post(Vue.config['url'] + '/setting/add-role-detail', formData, {
        headers: {
            'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
},
updateRoleDetail(value) {
    var formData = new FormData();
    formData.append('role_code',value.role_code);
    formData.append('channel',value.channel);
    formData.append('ccust',value.ccust);
    return Vue.http.post(Vue.config['url'] + '/setting/update-role-detail', formData, {
        headers: {
            'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
},











// MASTER
customerDetails(value) {
    var formData = new FormData();
    formData.append('cust_code',value.cust_code);

    return Vue.http.post(Vue.config['url'] + '/setting/customer-details', formData, {
        headers: {
            'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
},




};

// setting-count-department
// /setting-department-search?code=&type=&sort=&orderby=asc
// setting-save-department
// /setting-save-department
