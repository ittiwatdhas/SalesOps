import Vue from 'vue'

export default {
    getCalculate(values, state) {
        let customer = ''
        if (state.act_customer_selected != '') {
            customer = state.act_customer_selected.customer_code
        }
        var formData = new FormData();
        formData.append("_date", state.act_date.value);
        formData.append("customer_code", customer);
        formData.append("emp_id", values);
        return Vue.http.post(Vue.config['url'] + "/calculate-plan", formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    getUserRoleId(emp_id) {
        var formData = new FormData();
        formData.append("user_emp_id", emp_id);
        return Vue.http.post(Vue.config['url'] + "/get-user-roleId", formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },
    getCustomerList(values) {
        var formData = new FormData();
        formData.append("saleman_code", values);
        return Vue.http.post(Vue.config['url'] + "/customer-onsale", formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },
    getByGroups() {
        return Vue.http.get(Vue.config['url'] + "/by-groups", {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    getByGroupsSales(emp_id) {
        var formData = new FormData();
        formData.append("user_emp_id", emp_id);
        return Vue.http.post(Vue.config['url'] + "/by-groups-sale", formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    delLabelSales(value) {
        var formData = new FormData();
        formData.append("id_activty", value.lable.id_activity);
        return Vue.http.post(Vue.config['url'] + "/delete-mark-label", formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    saveLabelSales(value) {
        var formData = new FormData();
        formData.append("id_activty", value.lable.id_activity);
        formData.append("tag_label_id", value.tag_label_id);
        formData.append("sale_emp_id", value.lable.emp_id);
        formData.append("sale_emp_code", value.lable.emp_code);
        return Vue.http.post(Vue.config['url'] + "/save-mark-label", formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    getDetailOfSalesList(state, emp_id) {
        let customer = ''
        if (state.act_customer_selected != '') {
            customer = state.act_customer_selected.customer_code
        }
        var formData = new FormData();
        formData.append("_date", state.act_date.value);
        formData.append("customer_code", customer);
        formData.append("emp_id", emp_id);
        formData.append("status", state.act_statusp_selected);
        // formData.append("start_row", state.act_actvity_list.data.length);
        return Vue.http.post(Vue.config['url'] + "/list-detail", formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    getDetailAllSalesList(state, emp_id) {
        let customer = ''

        if (state.act_customer_selected != '') {
            customer = state.act_customer_selected.customer_code
        }
        var formData = new FormData();
        formData.append("_date", state.act_date.value);
        formData.append("customer_code", customer);
        formData.append("emp_id", emp_id);
        formData.append("status", state.act_statusp_selected);
        // formData.append("start_row", state.act_actvity_list.data.length);
        return Vue.http.post(Vue.config['url'] + "/detail-all-sales", formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success.data);
        }).catch((error) => Promise.reject(error));
    },
    gSheetsAct(val) {
        var formData = new FormData();
        if (_.trim(val.email).length > 0) {
            formData.append("email", val.email);
        } else {
            formData.append("email", '');
        }
        formData.append("emp_id", val.emp_id);
        formData.append("date", val.date);
        formData.append("customer_id", val.customer_id);
        formData.append("status", val.status);
        formData.append("team", val.team);
        formData.append("type", val.type);

        return Vue.http
            .post(Vue.config["url"] + "/gsheets_Activity", formData, {
                headers: {
                    Authorization: "Bearer " + Vue.localStorage.get("token")
                }
            })
            .then(response => {
                return Promise.resolve(response.body.success.data);
            })
            .catch(error => Promise.reject(error));
    },

}