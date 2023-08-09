import Vue from "vue";

export default {

    testService() {
        var formData = new FormData();
        // formData.append("year", values.year);
        return Vue.http
            .post(Vue.config["url"] + "/test-service", formData, {
                headers: {
                    Authorization: "Bearer " + Vue.localStorage.get("token")
                }
            })
            .then(response => {
                return Promise.resolve(response.body.data);
            })
            .catch(error => Promise.reject(error));
    },
    mappingData(value) {
        const data = value;
        return Vue.http.post(Vue.config["url"] + "/edi-mapping", data, {
            headers: {
                Authorization: "Bearer " + Vue.localStorage.get("token")
            }
        }).then(response => {
            return Promise.resolve(response.body.success);
        }).catch(error => Promise.reject(error));

    },
    formatNumber(value, dicimal) {
        if(isNaN(parseFloat(value))) {
            let val = 0;
            return val.toFixed(dicimal);
        } else {
            if(value % 1 == 0) {
                return parseFloat(value).toLocaleString(undefined, {
                    minimumFractionDigits: dicimal,
                    maximumFractionDigits: dicimal
                });
            } else {
                let parts = value.toString().split(".");
                let num = (parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                let digit = parts[1].slice(0, 3);
                digit = (digit.length < 2) ? digit + "0" : digit;
                let rs = num + "." + digit;
                let comma = parseFloat(rs.replace(',', ''));
                return parseFloat(Math.round(parseFloat(comma) * 100) / 100).toLocaleString(undefined, {
                    minimumFractionDigits: dicimal,
                    maximumFractionDigits: dicimal
                });
            }
        }
    },
    upload(data){
        return Vue.http.post(Vue.config["url"] + "/edi-upload", data, {
            headers: {
//                Authorization: "Bearer " + Vue.localStorage.get("token"),
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return Promise.resolve(response.body.success);
        }).catch(error => Promise.reject(error));
    },
    mapingInsert(data){
        return Vue.http.post(Vue.config["url"] + "/edi-mapping-insert", data, {
            headers: {
                Authorization: "Bearer " + Vue.localStorage.get("token")
            }
        }).then(response => {
            return Promise.resolve(response.body.success.data);
        }).catch(error => Promise.reject(error));
    },
    transfer(data){
        return Vue.http.post(Vue.config["url"] + "/edi-transfer", data, {
            headers: {
                Authorization: "Bearer " + Vue.localStorage.get("token")
            }
        }).then(response => {
            return Promise.resolve(response.body.success);
        }).catch(error => Promise.reject(error));
    }
};
