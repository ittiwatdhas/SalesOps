import Vue from 'vue'
import moment from "moment";
export default {
  step1tab1(val) {
    return Vue.http
      .get(Vue.config["url"] + "/incen-get-sales-cycle", {
        params: val,
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  saveStep1Tab1(val) {
    var rs = _.find(val.arrSalesCycle, function (o) {
      return o.code == val.salesCycle;
    });
    var formData = new FormData();
    let payDate = moment(val.payDate).format("YYYY-MM-DD")
    formData.append("start_date", rs.start_date);
    formData.append("end_date", rs.end_date);
    let checkFM = moment(payDate, [
      "YYYY-MM-DD"
    ]).format();
    if (checkFM != 'Invalid date') {
      formData.append("payDate", payDate);
    } else {
      formData.append("payDate", '');

    }
    formData.append("takeNote", val.takeNote);
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    return Vue.http
      .post(Vue.config["url"] + "/incen-save-sales-cycle", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  step1tab2dp(val) {
    return Vue.http
      .get(Vue.config["url"] + "/incen-get-recipient-all", {
        params: val,
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  step1tab2(val) {
    var formData = new FormData();
    formData.append("start_date", val.start_date);
    formData.append("end_date", val.end_date);
    formData.append("code", val.code);
    return Vue.http
      .post(Vue.config["url"] + "/incen-get-sale-bygroup", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  saveStep1Tab2(value) {
    var formData = new FormData();
    let rs = JSON.stringify(value)
    formData.append("data_select", rs);
    return Vue.http
      .post(Vue.config["url"] + "/incen-save-recipient", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body);
      })
      .catch(error => Promise.reject(error));
  },
  step1tab3() {
    return Vue.http
      .get(Vue.config["url"] + "/incen-get-condition-all", {
        params: {},
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  step1tab3Detail(val) {
    return Vue.http
      .get(Vue.config["url"] + "/incen-get-condition-bytype", {
        params: val,
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  saveStep1Tab3(val) {
    var formData = new FormData();
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("group_code", val.group_code);
    let rs_rec = JSON.stringify(val.data_recipient)
    formData.append("data_recipient", rs_rec);
    let rs = JSON.stringify(val.condition_detail)
    formData.append("condition_detail", rs);
    return Vue.http
      .post(Vue.config["url"] + "/incen-save-condition-detail", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getHead(val) {
    var formData = new FormData();
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("group_code", val.group_code);
    // formData.append("condition_code", val.condition_code);

    formData.append("start_date", val.start_date);
    formData.append("end_date", val.end_date);
    formData.append("ms_tactics_code", val.ms_tactics_code);

    let rs = JSON.stringify(val.condition_detail)
    formData.append("data_condition", rs);

    let rs2 = JSON.stringify(val.data_recipient)
    formData.append("data_recipient", rs2);

    formData.append("action", val.action);
    return Vue.http
      .post(Vue.config["url"] + "/incen-get-head", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  nextToStep3(val) {
    var formData = new FormData();
    formData.append("step", val.step);
    if (!_.isUndefined(val.year)) {
      formData.append("year", val.year);
    }
    if (!_.isUndefined(val.cycle)) {
      formData.append("cycle", val.cycle);
    }
    if (!_.isUndefined(val.group_code)) {
      formData.append("group_code", val.group_code);
    }
    if (!_.isUndefined(val.start_date)) {
      formData.append("start_date", val.start_date);
    }
    if (!_.isUndefined(val.end_date)) {
      formData.append("end_date", val.end_date);
    }
    if (!_.isUndefined(val.ms_tactics_code)) {
      formData.append("end_date", val.ms_tactics_code);
    }
    if (!_.isUndefined(val.data_recipient)) {
      let rs2 = JSON.stringify(val.data_recipient)
      formData.append("data_recipient", rs2);
    }
    if (!_.isUndefined(val.condition_detail)) {
      let rs = JSON.stringify(val.condition_detail)
      formData.append("data_condition", rs);
    }

    formData.append("permission", val.permission);

    formData.append("emp_id", val.emp_id);
    if (!_.isUndefined(val.sales_cycle)) {
      let rs3 = JSON.stringify(val.sales_cycle)
      formData.append("sales_cycle", rs3);
    }

    return Vue.http
      .post(Vue.config["url"] + "/incen-get-review-head", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getStep3Popupy(val) {
    var formData = new FormData();
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("group_code", val.group_code);
    let rs = JSON.stringify(val.condition_detail)
    formData.append("condition_detail", rs);
    return Vue.http
      .post(Vue.config["url"] + "/incen-get-condition-detail", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  saveStep3(val) {
    var formData = new FormData();
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("group_code", val.group_code);
    let rs = JSON.stringify(val.condition_detail)
    formData.append("condition_detail", rs);
    return Vue.http
      .post(Vue.config["url"] + "/incen-save-condition", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getListData() {
    var data = [];
    for (var i = 0; i < 600; i++) {
      data.push({
        code: "010173" + i,
        name: "ELP DURA LAF 2100 SIP",
        reward: 1000,
        new_item: 123456,
        high_growth: 123456,
        rising_star: 123456,
        cash_cow: 123456,
        dog: 123456,
        total: 123456
      });
    }
    return Promise.resolve(data);
  },
  getDataSearchProduct(value,type , condition5) {
    let keyword = {}
    
    if(condition5){
       keyword = {
        keyword: value,
        type: type,
        condition_code: condition5.condition_code,
        group_code: condition5.group_code,
        product: condition5.product,
        cg:   condition5.cg,
        sub_grpup: condition5.sub_grpup,
        group: condition5.group,
        type_code: condition5.type,

      }
    }else {
       keyword = {
        keyword: value,
        type: type
      }
    }

    return Vue.http
      .get(Vue.config["url"] + "incen-get-search-cg", {
        params: keyword,
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getDataSearchProductPost(value,type , condition5) {

    let keyword = {}
    
    if(condition5){
       keyword = {
        keyword: value,
        type: type,
        condition_code: condition5.condition_code,
        group_code: condition5.group_code,
        product: condition5.product,
        cg:   condition5.cg,
        sub_grpup: condition5.sub_grpup,
        group: condition5.group,
        type: condition5.type,

      }
    }else {
       keyword = {
        keyword: value,
        type: type
      }
    }

    var formData = new FormData();
    formData.append("keyword", value);
    formData.append("type", type);

    formData.append("condition_code", keyword.condition_code);
    formData.append("group_code", keyword.group_code);
    formData.append("product", keyword.product);
    formData.append("cg", keyword.cg);
    formData.append("sub_grpup", keyword.sub_grpup);
    formData.append("group", keyword.group);
    formData.append("type_code", keyword.type);

    return Vue.http
      .post(Vue.config["url"] + "incen-get-search-cg", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));




    // return Vue.http
    //   .post(Vue.config["url"] + "incen-get-search-cg", {
    //     params: keyword,
    //     headers: {
    //       Authorization: "Bearer " + Vue.localStorage.get("token")
    //     }
    //   })
    //   .then(response => {
    //     return Promise.resolve(response.body.success.data);
    //   })
    //   .catch(error => Promise.reject(error));
  },
  getSearchProducts(value,type) {

    var formData = new FormData();
    formData.append("keyword", value);
    formData.append("type", type);
    return Vue.http
      .post(Vue.config["url"] + "incen-get-search-cg", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  
  saveDataDialogStepTwo(val) {
    var formData = new FormData();
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("tactics_id", val.tactics_id);
    formData.append("condition_code", val.condition_code);
    let rs = JSON.stringify(val.data_table)
    formData.append("data_table", rs);

    return Vue.http
      .post(Vue.config["url"] + "/incen-save-cg-bytactics", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  saveDataDialogStepTwo_NEW(val) {
    var formData = new FormData();
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("tactics_id", val.tactics_id);
    formData.append("condition_code", val.condition_code);
    let rs = JSON.stringify(val.data_table)
    formData.append("data_table", rs);

    return Vue.http
      .post(Vue.config["url"] + "/incen-save-cg-bytactics", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  getListDataTable(val) {
    var formData = new FormData();
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("tactics_id", val.tactics_id);
    formData.append("condition_code", val.condition_code);

    return Vue.http
      .post(Vue.config["url"] + "/incen-get-cg-bytactics", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getDetail(val) {
    var formData = new FormData();
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("group_code", val.group_code);

    formData.append("start_date", val.start_date);
    formData.append("end_date", val.end_date);
    return Vue.http
      .post(Vue.config["url"] + "/incen-get-detail", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getStep3Detail(val) {
    var formData = new FormData();
    formData.append("emp_id", val.emp_id);
    if (!_.isUndefined(val.sales_cycle)) {
      let rs2 = JSON.stringify(val.sales_cycle)
      formData.append("sales_cycle", rs2);
    }
    return Vue.http
      .post(Vue.config["url"] + "/incen-get-review-detail", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getDefaultStep() {
    return Vue.http
      .get(Vue.config["url"] + "/incen-get-default-step", {
        params: {},
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success);
      })
      .catch(error => Promise.reject(error));
  },
  exportData(value) {
    return Vue.http
      .get(Vue.config["url"] + "/payment-export-excel", {
        params: {
          login:value.login,
          year:value.year,
          cycle:value.cycle,
          teams:value.teams
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
  saveDraftByStep(val) {
    var formData = new FormData();
    formData.append("step", val.step);
    if (!_.isUndefined(val.year)) {
      formData.append("year", val.year);
    }
    if (!_.isUndefined(val.cycle)) {
      formData.append("cycle", val.cycle);
    }
    if (!_.isUndefined(val.group_code)) {
      formData.append("group_code", val.group_code);
    }
    if (!_.isUndefined(val.start_date)) {
      formData.append("start_date", val.start_date);
    }
    if (!_.isUndefined(val.end_date)) {
      formData.append("end_date", val.end_date);
    }
    if (!_.isUndefined(val.ms_tactics_code)) {
      formData.append("ms_tactics_code", val.ms_tactics_code);
    }
    if (!_.isUndefined(val.data_head)) {
      let rs = JSON.stringify(val.data_head)
      formData.append("data_head", rs);
    }
    if (!_.isUndefined(val.data_detail)) {
      let rs2 = JSON.stringify(val.data_detail)
      formData.append("data_detail", rs2);
    }

    formData.append("button", val.button);
    if (!_.isUndefined(val.sales_cycle)) {
      let rs3 = JSON.stringify(val.sales_cycle)
      formData.append("sales_cycle", rs3);
    }

    if (!_.isUndefined(val.note)) {
      formData.append("note", val.note);
    }

    return Vue.http
      .post(Vue.config["url"] + "/incen-save", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getStep3DetailByType(val) {
    var formData = new FormData();
    formData.append("document_id", val.document_id);
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("group_code", val.group_code);

    formData.append("start_date", val.start_date);
    formData.append("end_date", val.end_date);
    formData.append("sm_code", val.sm_code);
    formData.append("button", val.button);
    return Vue.http
      .post(Vue.config["url"] + "/incen-get-detail-type", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getPopupDetailByType(val) {
    var formData = new FormData();
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("group_code", val.group_code);
    formData.append("start_date", val.start_date);
    formData.append("end_date", val.end_date);
    formData.append("sm_code", val.sm_code);
    formData.append("button_id", val.button_id);
    formData.append("button_code", val.button_code);
    formData.append("button_type", val.button_type);
    formData.append("log_user", val.log_user);
    return Vue.http
      .post(Vue.config["url"] + "/incen-get-popup-detail", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        if(val.button_type === 'tactics2'){
          if(response.body.success.data.length != 0){
            response.body.success.data.detail[0].item_cg.sort((a, b) => (a.code > b.code) ? 1 : -1)
        }
        }

        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  savePaid(val) {
    var formData = new FormData();
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("group_code", val.group_code);
    formData.append("start_date", val.start_date);
    formData.append("end_date", val.end_date);
    formData.append("sm_code", val.sm_code);
    formData.append("button_type", val.button_type);
    if (val.button_type == "additions_item" ||
      val.button_type == "deduction_item") {
      let temp = []
      for (let i = 0; i < val.data_detail.length; i++) {
        let note = _.replace(val.data_detail[i].note, '%', 'replacepercent');
        val.data_detail[i].note = note
        temp.push(val.data_detail[i])
      }
      let rs = JSON.stringify(temp)
      formData.append("data_detail", rs);
    } else {
      let rs = JSON.stringify(val.data_detail)
      formData.append("data_detail", rs);
    }

    return Vue.http
      .post(Vue.config["url"] + "/incen-save-popup-detail", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  searchOrderStep3(val) {
    var formData = new FormData();
    formData.append("sm_code", val.sm_code);
    formData.append("keyword", val.keyword);
    formData.append("year", val.year);
    formData.append("cycle", val.cycle);
    formData.append("now_year", val.now_year);
    formData.append("now_cycle", val.now_cycle);
    formData.append("group_code", val.group_code);
    return Vue.http
      .post(Vue.config["url"] + "/incen-get-search-order", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  calulateAllicentive(val) {
    var formData = new FormData();
    formData.append("group_code", val.group_code);
    return Vue.http
      .post(Vue.config["url"] + "/incen-calculate-all", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getFlow(val) {
    var formData = new FormData();
    return Vue.http
      .post(Vue.config["url"] + "/incen-get-flow", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  runFlow(val) {
    let rs = JSON.stringify(val.document)
    var formData = new FormData();
    formData.append("mode", val.mode);
    formData.append("document", rs);
    formData.append("login", val.login);
    if (!_.isUndefined(val.note)) {
      formData.append("note", val.note);
    }
    return Vue.http
      .post(Vue.config["url"] + "/incen-save-flow", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token")
        }
      })
      .then(response => {
        return Promise.resolve(response.body.success.data);
      })
      .catch(error => Promise.reject(error));
  },
  getPaymentReport(val) {
    var formData = new FormData();
    formData.append("emp_id", val.emp_id);
    return Vue.http
      .post(Vue.config["url"] + "/get-payment-report", formData, {
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

