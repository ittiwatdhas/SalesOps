import Vue from 'vue'

export default {
    getAllCustomer(value) {
        return Vue.http.get(Vue.config['url'] + '/setting-cust-all', {
            params: {
                'keyword': value
            },
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    getCustomerList(value) {
        let code = value.customer_code
        if (typeof value.customer_code == "undefined") {
            code = ''
        }
        return Vue.http.get(Vue.config['url'] + '/setting-cust-bycode', {
            params: {
                'customer_code': code,
                'type': value.type,
                'sort': value.sort,
                'start_row': value.start_row,
                'orderby': value.orderby,
                'channel_code' : value.channel_code,
                'province_code' :value.province_code
            },
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    getCountCustomer( value ) {
        return Vue.http.get(Vue.config['url'] + '/setting-count-cust', {
            params:{
                'customer_code':value.customer_code,
                'channel_code':value.channel_code,
                'province_code':value.province_code
            },
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    saveLocation(value) {
        var formData = new FormData();
        formData.append('customer_code', value.customer_code);
        formData.append('customer_id', value.customer_id);
        formData.append('latitude', value.latitude);
        formData.append('longitude', value.longitude);
        return Vue.http.post(Vue.config['url'] + '/setting-save-location', formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => Promise.reject(error));
    },
    settingProvinceAll(value) {

        return Vue.http.get(Vue.config['url'] + '/setting-province-all', {
            params: {
                'keyword': value,
            },
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => Promise.reject(error));
    },
    settingUpdateVerify(value) {
        var formData = new FormData();
        formData.append('customer_id', value.customer_id);
        formData.append('customer_code', value.customer_code);
        formData.append('verify', value.verify);
        return Vue.http.post(Vue.config['url'] + '/setting-update-verify', formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => Promise.reject(error));
    },
    settingChannelAll(value) {

        return Vue.http.get(Vue.config['url'] + '/setting-channel-all', {
        
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => Promise.reject(error));
    },


}


