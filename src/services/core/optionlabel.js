import Vue from 'vue'

export default {
    getAllOptionLabel(value) {
        return Vue.http.get(Vue.config['url'] + '/setting-optlabel-all', {
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
    getOptionLabelList(value) {
        let code = value.customer_code
        if (typeof value.customer_code == "undefined") {
            code = ''
        }
        return Vue.http.get(Vue.config['url'] + '/setting-optlabel-search', {
            params: {
                'tag_label': value.taglabel,
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
    getCountLabel() {
        return Vue.http.get(Vue.config['url'] + '/setting-count-optlabel', {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    saveLabel(value) {
        var formData = new FormData();
        formData.append('id', value.id);
        formData.append('tagname', value.tagname);
        formData.append('taglabel', value.taglabel);
        formData.append('tagmodule', value.tagmodule);
        formData.append('status', value.status);
        return Vue.http.post(Vue.config['url'] + '/setting-save-optlabel', formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => Promise.reject(error));
    }
}