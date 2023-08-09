import Vue from 'vue'

export default {
  getSaleActivityCoverage() {
    var formData = new FormData();
    formData.append('search', '');
    return Vue.http.post(Vue.config['url'] + '/sale-activity-coverage', formData, {
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
      return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
  },
  getOverallSalesActivity() {
    return Vue.http.get(Vue.config['url'] + '/overall-sales-activity', {
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
      return Promise.resolve(response.body.success.data);
    }).catch((error) => Promise.reject(error));
  },
  getNumberValue() {
    return Vue.http.get(Vue.config['url'] + '/number-of-visits', {
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
      return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
  },
  getOverviewBYPosition() {
    return Vue.http.get(Vue.config['url'] + '/team-overview-by-position', {
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
      return Promise.resolve(response.body.success.data);
    }).catch((error) => Promise.reject(error));
  },
  getSaleTeamOverview(value) {
    var formData = new FormData();
    formData.append('emp_code', value.emp_code);
    formData.append('emp_id', value.team_code);
    formData.append('user_role_id', value.team_code);
    return Vue.http.post(Vue.config['url'] + '/sale-team-overview', formData, {
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
      return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
  },
  getTagLabel(values) {
    var formData = new FormData();
    formData.append('mode', values);
    return Vue.http.post(Vue.config['url'] + "/get-taglabel", formData, {
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
      return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
  },
}