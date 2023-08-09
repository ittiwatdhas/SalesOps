import Vue from "vue";
import _ from "lodash";
import moment from "moment";
export default {
    salesTeamHead(value) {
    return Vue.http
      .get(Vue.config["url"] + "/report/sales-team-head", {
        params: {
            month:value.month,
            year:value.year,
            tab:value.tab,
            emp_id:value.emp_id,
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
  salesTeamDetail(value) {
    return Vue.http
      .get(Vue.config["url"] + "/report/sales-team-detail", {
        params: {
            month:value.month,
            year:value.year,
            tab:value.tab,
            emp_id:value.emp_id,
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
  searchActivityTeam(value) {
    return Vue.http
      .get(Vue.config["url"] + "/report/sales-activity-team", {
        params: {
          tab:value
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
  gsheetsActivityOverview(value) {
    var formData = new FormData();
    formData.append("email", value.email);
    formData.append("month", value.month);
    formData.append("year", value.year);
    formData.append("emp_id", value.emp_id);
    formData.append("keyword", value.keyword);
    formData.append("btn", value.btn);
    return Vue.http
      .post(Vue.config["url"] + "/report/gsheets-activity-overview", formData, {
        headers: {
          Authorization: "Bearer " + Vue.localStorage.get("token"),
        },
      })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => Promise.reject(error));
  },

  orderOverviewDetail(value) {
    return Vue.http
      .get(Vue.config["url"] + "/report/order-overview-detail", {
        params: {
          month:value.month,
          year:value.year,
          emp_id:value.emp_id,
          keyword:value.keyword,
          type:value.type,
          status:value.status
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
  customerOverviewDetail(value) {
    return Vue.http
      .get(Vue.config["url"] + "/report/customer-overview-detail", {
        params: {

          month:value.month,
          year:value.year,
          emp_id:value.emp_id,
          keyword:value.keyword,
          type:'all_type',
          status:'all_status'
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
  getFarFromStore(value) {
    return Vue.http
      .get(Vue.config["url"] + "/report/get-far-from-store", {
        params: {
          month:value.month,
          year:value.year,
          emp_id:value.emp_id
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

  tripplanOverviewDetailSalesActivityReports(value) {
    return Vue.http
      .get(Vue.config["url"] + "/report/tripplan-overview-detail", {
        params: {
          month:value.month,
          year:value.year,
          emp_id:value.emp_id,
          type:value.type
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
  orderOverviewBypono(param ){
        this.loading_overview = true
        var formData = new FormData();
        formData.append('year', String(param.year))
        formData.append('month', String(param.month))
        formData.append('emp_id',String(param.emp_id))
        formData.append('po_no',String(param.po_no))
        formData.append('plan_date',String(param.plan_date))
        
      return Vue.http.post(Vue.config['url'] + '/report/order-overview-bypono', formData, {
        headers: {
          'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
      }).then((response) => {
        // console.log(response)

        return Promise.resolve(response.body.success);
      
      }).catch((error) => Promise.reject(error));
      },


 




  // order-overview-detail

 

  


//   getOrderById(values) {
};
