import Vue from 'vue'

export default {
    getAllOptionNFLabel(value) {
        return Vue.http.get(Vue.config['url'] + '/setting-nflable-all', {
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
    getOptionNFLabelList(value) {
        let code = value.customer_code
        if (typeof value.customer_code == "undefined") {
            code = ''
        }
        return Vue.http.get(Vue.config['url'] + '/setting-nflable-search', {
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
    getCountNFLabel() {
        return Vue.http.get(Vue.config['url'] + '/setting-count-nflable', {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    saveNFLabel(value) {
        var formData = new FormData();
        formData.append('label_id', value.label_id);
        formData.append('labelname_th', value.labelname_th);
        formData.append('parent_code', value.parent_code);
        formData.append('external_source', value.external_source);
        formData.append('labelstatus', value.labelstatus);
        return Vue.http.post(Vue.config['url'] + '/setting-save-nflabel', formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => Promise.reject(error));
    }
}