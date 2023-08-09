import Vue from 'vue'

export default {
    getTimeServer() {
        return Vue.http.get(Vue.config['url'] + "/api/v3/gettimeserver", {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },
    getAllPlan(data) {
        // console.log(data)
        return Vue.http.get(Vue.config['url'] + "/api/v3/customer?location=true", {
            params: {
                lat: data.lat,
                long: data.long,
                select_date: data.select_date
            },
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },
    checkInHistory() {
        return Vue.http.get(Vue.config['url'] + "/api/v3/checkin_history", {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.history);
        }).catch((error) => Promise.reject(error));
    },
    userCheckIn(value) {
        var formData = new FormData();
        formData.append("customer_id", value.customer_id);
        formData.append("type", value.type);
        formData.append("datetime", value.datetime);
        formData.append("purpose_ids", JSON.stringify(value.purpose_ids));
        formData.append("lat", value.lat);
        formData.append("long", value.long);
        formData.append("visit_type", value.visit_type);
        formData.append("checkin_type", value.checkin_type);
        formData.append("type_customer", value.type_customer);
        formData.append("imei", value.imei);
        formData.append("duration", '');
        formData.append("plan_id", value.plan_id);
        formData.append("customer_code", value.customer_code);
        formData.append("emp_id", value.emp_id);
        formData.append("visit_date", value.visit_date);
        return Vue.http.post(Vue.config['url'] + "/api/v3/visit", formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body);
        }).catch((error) => Promise.reject(error));
    },

    botCheckin(value) {
        console.log(value)
        // https://www.google.com/maps?q=16.4461601,100.341069
        var link = 'https://www.google.com/maps?q=' + value.lat + ',' + value.long + ''
        var formData = new FormData();
        formData.append("sales_code", 'Sales ' + value.emp_id);
        formData.append("customer", value.customer_code + ' ' + value.customer_name_th);
        formData.append("status_visit", value.type);
        formData.append("link_map", link);

        return Vue.http.post(Vue.config['url'] + "/bot-checkin", formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },


    reLocation(val) {
        var formData = new FormData();
        formData.append("customer_id", val.customer_id);
        formData.append("status", val.status);
        formData.append("lat", val.lat);
        formData.append("long", val.long);
        formData.append("plan_id", val.plan_id);
        formData.append("customer_code", val.customer_code);
        formData.append("visit_status", val.visit_status);
        formData.append("visit_date", val.visit_date);

        return Vue.http
            .post(Vue.config["url"] + "api/v3/re-location", formData, {
                headers: {
                    Authorization: "Bearer " + Vue.localStorage.get("token")
                }
            })
            .then(response => {
                return Promise.resolve(response.body.success.data);
            })
            .catch(error => Promise.reject(error));
    },


    // getTimeServer(values, state) {
    //     let customer = state.act_customer_selected
    //     if (state.act_customer_selected != '') {
    //         customer = state.act_customer_selected.id
    //     }
    //     var formData = new FormData();
    //     formData.append("_date", state.act_date.value);
    //     formData.append("customer_id", customer);
    //     formData.append("user_role_ids", values);
    //     return Vue.http.post(Vue.config['url'] + "/calculate-plan", formData, {
    //         headers: {
    //             'Authorization': 'Bearer ' + Vue.localStorage.get('token')
    //         },
    //     }).then((response) => {
    //         return Promise.resolve(response.body.success.data);
    //     }).catch((error) => Promise.reject(error));
    // }

}