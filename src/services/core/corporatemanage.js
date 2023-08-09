import Vue from 'vue'

export default {

    selectAllCorporate(value) {
        var formData = new FormData();
        formData.append('corp_code', value.corp_code);
        return Vue.http.post(Vue.config['url'] + '/setting-corporate-master-customer', formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },
    selectAllCorporate2(value) {
        
        var formData = new FormData();
        formData.append('corp_code', value.corp_code);
        formData.append('status', value.status);
        return Vue.http.post(Vue.config['url'] + '/setting-corporate-master-corporate', formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },
    
    settingCustomerMapping(value) {
        var formData = new FormData();
        formData.append('corp_code', value.corp_code);
        formData.append('customer', value.customer);
        return Vue.http.post(Vue.config['url'] + '/setting-customer-mapping', formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },
    searchCustomerMapping(value) {
        var formData2 = new FormData();
        formData2.append('corp_code', value.corp_code);
        formData2.append('customer', value.customer);
        return Vue.http.post(Vue.config['url'] + '/setting-customer-mapping', formData2, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },
    settingMttCustomer(value) {
        var formData2 = new FormData();
        formData2.append('customer', value.customer);
        formData2.append('feild', value.feild);
        formData2.append('sorting', value.sorting);
        return Vue.http.post(Vue.config['url'] + '/setting-mtt-customer', formData2, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },
    settingAddRemoveCustomerMapping(value) {
        var formData = new FormData();
        formData.append('corp_code', value.corp_code);
        formData.append('customer', value.customer_code);
        formData.append('type', value.type);
        return Vue.http.post(Vue.config['url'] + '/setting-add-remove-customer-mapping', formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    }, 
    settingSaveCorporateMaster(value) {
        var formData = new FormData();
        formData.append('type', value.type);
        formData.append('corp_code_old', value.corp_code_old);
        formData.append('corp_name_old', value.corp_name_old);
        formData.append('corp_code_new', value.corp_code_new);
        formData.append('corp_name_new', value.corp_name_new);
        formData.append('status', value.status);
        return Vue.http.post(Vue.config['url'] + '/setting-save-corporate-master', formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    }

    // selectAllCorporate(state) {
    //     return Vue.http.post(Vue.config['url'] + "/setting-corporate-master", {
            
    //         headers: {
    //             'Authorization': 'Bearer ' + Vue.localStorage.get('token')
    //         },
    //     }).then((response) => {
    //         Vue.localStorage.set('all_path_menu', JSON.stringify(response.body.success));
    //         let theArray = response.body.success.menu_data
    //         theArray.forEach(function (element) {
    //             Vue.localStorage.set('sub_menu_' + element.m_code.trim(), JSON.stringify(element.sub_menu));
    //         });
    //         return Promise.resolve(response.body.success);
    //     }).catch((error) => Promise.reject(error));
    // },
   
    // changePassword(value) {
    //     var formData = new FormData();
    //     formData.append('username', value.username);
    //     formData.append('password', value.password);
    //     return Vue.http.post(Vue.config['url'] + '/change-password', formData, {
    //         headers: {
    //             'Authorization': 'Bearer ' + Vue.localStorage.get('token')
    //         },
    //     }).then((response) => {
    //         return Promise.resolve(response.body.success);
    //     }).catch((error) => Promise.reject(error));
    // }
}