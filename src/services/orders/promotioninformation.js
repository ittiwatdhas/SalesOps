import Vue from "vue";
// import _ from "lodash";
// import moment from "moment";

export default {
    formatNumber(value, dicimal) {
        if (isNaN(parseFloat(value))) {
            let val = 0;
            return val.toFixed(dicimal);
        } else {
            if (value % 1 == 0) {
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
    GetAutoSearchItemCode(value) {
        return Vue.http
            .get(Vue.config["url"] + "/infor-product", {
                params: {
                    filter: value.keyword,
                    status: 'Active',
                    group: value.group,
                    subgroup: value.subgroup,
                    cg: value.cg
                },
                headers: {
                    Authorization: "Bearer " + Vue.localStorage.get("token")
                }
            })
            .then(response => {
                return Promise.resolve(response.body.success.data);
            })
            .catch(error => Promise.reject(error));
    },
    GetVolumePricing(value) {
        return Vue.http
            .get(Vue.config["url"] + "/infor-volumndiscount", {
                params: {
                    code: value
                },
                headers: {
                    Authorization: "Bearer " + Vue.localStorage.get("token")
                }
            })
            .then(response => {
                return Promise.resolve(response.body.success.data);
            })
            .catch(error => Promise.reject(error));
    },
    GetPricing(value) {
        return Vue.http
            .get(Vue.config["url"] + "/infor-pricing", {
                params: {
                    code: value
                },
                headers: {
                    Authorization: "Bearer " + Vue.localStorage.get("token")
                }
            })
            .then(response => {
                return Promise.resolve(response.body.success);
            })
            .catch(error => Promise.reject(error));
    },
    GetฺBookprice(value) {
        return Vue.http
            .get(Vue.config["url"] + "/infor-pricbook", {
                params: {
                    code: value
                },
                headers: {
                    Authorization: "Bearer " + Vue.localStorage.get("token")
                }
            })
            .then(response => {
                return Promise.resolve(response.body.success);
            })
            .catch(error => Promise.reject(error));
    },
    GetPacking(value) {
        return Vue.http
            .get(Vue.config["url"] + "/infor-packing", {
                params: {
                    code: value
                },
                headers: {
                    Authorization: "Bearer " + Vue.localStorage.get("token")
                }
            })
            .then(response => {
                return Promise.resolve(response.body.success);
            })
            .catch(error => Promise.reject(error));
    },
    GetPromotion(value) {
        return Vue.http
            .get(Vue.config["url"] + "/infor-promotion", {
                params: {
                    code: value.code,
                    type: value.status
                },
                headers: {
                    Authorization: "Bearer " + Vue.localStorage.get("token")
                }
            })
            .then(response => {
                return Promise.resolve(response.body.success.data);
            })
            .catch(error => Promise.reject(error));
    },
    GetProductPromotion(value) {
        return Vue.http
            .get(Vue.config["url"] + "/infor-promotion-byid", {
                params: {
                    id: value,
                },
                headers: {
                    Authorization: "Bearer " + Vue.localStorage.get("token")
                }
            })
            .then(response => {
                return Promise.resolve(response.body.success.data);
            })
            .catch(error => Promise.reject(error));
    },
    GetWherehouse(value) {
        return Vue.http
            .get(Vue.config["url"] + "/infor-warehouse", {
                params: {
                    code: value
                },
                headers: {
                    Authorization: "Bearer " + Vue.localStorage.get("token")
                }
            })
            .then(response => {
                return Promise.resolve(response.body.success);
            })
            .catch(error => Promise.reject(error));
    },
    GetProductAll(value) {
        var param = (value === undefined || value == "") ? {} : {
            type: value.type,
            hc_code: value.code
        };

        return Vue.http
            .get(Vue.config["url"] + "/infor-product-group", {
                params: param,
                headers: {
                    Authorization: "Bearer " + Vue.localStorage.get("token")
                }
            })
            .then(response => {
                return Promise.resolve(response.body.success.data);
            })
            .catch(error => Promise.reject(error));
    },
    GetAutoSearchBarcodeode(value) {
        return Vue.http
            .get(Vue.config["url"] + "/infor-barcode", {
                params: {
                    filter: value.keyword,
                    status: 'Active',
                    group: value.group,
                    subgroup: value.subgroup,
                    cg: value.cg
                },
                headers: {
                    Authorization: "Bearer " + Vue.localStorage.get("token")
                }
            })
            .then(response => {
                return Promise.resolve(response.body.success.data);
            })
            .catch(error => Promise.reject(error));
    },
};