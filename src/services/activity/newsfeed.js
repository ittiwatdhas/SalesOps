import Vue from 'vue'

export default {
    getMasterNewsfeed() {
        return Vue.http.get(Vue.config['url'] + "/master-newsfeed", {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    getNewsfeed(value) {
        var formData = new FormData();
        formData.append("saleman", value.saleman);
        formData.append("sort_by", value.sort_by);
        formData.append("location", value.location);
        formData.append("promotion", value.promotion);
        formData.append("feedback", value.feedback);
        formData.append("brand", value.brand);
        formData.append("start", value.start);
        formData.append("limit", value.limit);
        formData.append("first_post_id", value.first_post_id);
        return Vue.http.post(Vue.config['url'] + "/news-feed", formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            //this.$store.commit('SET_NEWF_FIRST_POST_ID', data.ref_id);
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    getNewsfeedByID(value){
        return Vue.http.get(Vue.config['url'] + "/news-feed/"+value, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {

            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    saveComment(value) {
        var formData = new FormData();
        formData.append("head_id", value.head_id);
        formData.append("comment", value.comment);
        return Vue.http.post(Vue.config['url'] + "/save-comment", formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => Promise.reject(error));
    },
    saveLikeShare(value) {
        var formData = new FormData();
        formData.append("head_id", value.head_id);
        formData.append("type", value.type);
        formData.append("status", value.status);
        formData.append("share_to", value.share_to);
        return Vue.http.post(Vue.config['url'] + "/save-like-share", formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => Promise.reject(error));
    },
    saveNewFeed(value) {
        const label_code = [];
        for (var i = 0; i < value.label_code.length; i++) {
            label_code[i] = {
                code: value.label_code[i]['code'],
                external: value.label_code[i]['external']
            }
        }
        const comment = {
            'cust_code': value.cust_code,
            'detail': value.detail,
            'label_code': label_code,
            'link_path': value.link_path,
        }
        return Vue.http.post(Vue.config['url'] + "/save-newsfeed", comment, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => Promise.reject(error));
    },
    
    getNotification() {
        return Vue.http.get(Vue.config['url'] + "/get-msg-noti-infi", {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },

    searchCustomer(value){
        return Vue.http.post(Vue.config['url'] + "/search-customer",{'key':value}, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    }

}