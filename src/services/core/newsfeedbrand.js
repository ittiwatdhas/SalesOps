import Vue from 'vue'

export default {
    getAllOptionNFBLabel(value) {
        return Vue.http.get(Vue.config['url'] + '/setting-nfbrand-all', {
            params: {
                'keyword': value
            },
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },
    getOptionNFBLabelList(value) {
        let code = value.customer_code
        if (typeof value.customer_code == "undefined") {
            code = ''
        }
        return Vue.http.get(Vue.config['url'] + '/setting-nfbrand-search', {
            params: {
                'labelcode': value.labelcode,
                'type': value.type,
                'sort': value.sort,
                'start_row': value.start_row,
                'orderby': value.orderby
            },
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    getCountNFBLabel() {
        return Vue.http.get(Vue.config['url'] + '/setting-count-nfbrand', {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    saveNFBLabel(value) {
        var formData = new FormData();
        formData.append('brand_type', value.brand_type);
        formData.append('name_th', value.name_th);
        formData.append('name_en', value.name_en);
        formData.append('description', value.description);
        formData.append('brandstatus', value.brandstatus);
        formData.append('id', value.id);
        return Vue.http.post(Vue.config['url'] + '/setting-save-nfbrand', formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => Promise.reject(error));
    }
}