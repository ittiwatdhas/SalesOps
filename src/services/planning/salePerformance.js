import Vue from 'vue'

export default {
  getMonthYearDefault(url) {
    return Vue.http.get(Vue.config['url'] + url, {
      headers: {
      'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
        return Promise.resolve(response.body.success.data);
    }).catch((error) => Promise.reject(error));
  },
  getChannel(url) {
    return Vue.http.get(Vue.config['url'] + url, {
        headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
  },
  getSalesMan(url,value) {
    var formData = new FormData();
    formData.append('data_select', JSON.stringify(value.data_select));
    return Vue.http.post(Vue.config['url'] + url, formData, {
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
  },
  deletePerformance(url) {
    return Vue.http.post(Vue.config['url'] + url, null, {
        headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
    }).then((response) => {
        return Promise.resolve(response.body.success.data);
    }).catch((error) => Promise.reject(error));
  },
  getProductPage(url, page, value, keyword) {
    var formData = new FormData();
    formData.append('page', page);
    formData.append('sale_select', JSON.stringify(value));
    if(keyword != undefined)
      formData.append('keyword', keyword);
    return Vue.http.post(Vue.config['url'] + url, formData, {
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
  },

  getDefaultYearandmonth() {
    return Vue.http.get(Vue.config['url'] + '/get-default-yearandmonth',{
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
  },



  getCatgory(value , time ) {
    // console.log("Emp => ",Vue.localStorage.get("emp_id"),time)
    var formData = new FormData();
    formData.append('month_year', time);
    formData.append('emp_id', Vue.localStorage.get("emp_id"));
    
    return Vue.http.post(Vue.config['url'] + '/get-catgory-all-performance', formData, {
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
  },
  getItemalance(value) {
    var formData = new FormData();
    formData.append('group_code', value);
    // formData.append('emp_id', Vue.localStorage.get("emp_id"));
    return Vue.http.post(Vue.config['url'] + '/get-item-balance', formData, {
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
  },
 
  saveCategory(value ,time) {
    var formData = new FormData();
    formData.append('month_year', time);
    formData.append('emp_id', Vue.localStorage.get("emp_id"));
    formData.append('sale_select', JSON.stringify(value));
    
    return Vue.http.post(Vue.config['url'] + '/save-category', formData, {
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
  },
 
  getSumMainService(url,values){
      var formData = new FormData();
      formData.append('page', values.total_page);
      formData.append('organize_type', values.organize_type);
      formData.append('product_keyword', values.product_keyword);
      formData.append('organizes', JSON.stringify(values.organizes));
      formData.append('product_type', values.product_type);
      formData.append('products_checkall',values.product_checkall);
      formData.append('products_check',JSON.stringify(values.product_selected));
      formData.append('products_uncheck',JSON.stringify(values.products_uncheck));
      formData.append('viewby', values.viewby);
      formData.append('totaltype', values.totaltype);
      formData.append('totalfirst', values.totalfirst);
      formData.append('totalsecond', values.totalsecond);
      formData.append('monthfirst', values.monthfirst);
      formData.append('monthsecond', values.monthsecond);
      formData.append('user_id', values.user_id);
      formData.append('view_status', values.view_status);
      formData.append('team_select', JSON.stringify(values.team_select));
      return Vue.http.post(Vue.config['url'] + url, formData, {
        headers: {
          'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
      }).then((response) => {
          return Promise.resolve(response.body.success.data);
      }).catch((error) => Promise.reject(error));
  },
  getSumDetailService(url,values){
      var formData = new FormData();
      formData.append('page', values.total_page);
      formData.append('product_keyword', values.product_keyword);
      formData.append('organize_type', values.organize_type);
      formData.append('organizes', JSON.stringify(values.organizes));
      formData.append('product_type', values.product_type);
      formData.append('products_checkall',values.product_checkall);
      formData.append('products_check',JSON.stringify(values.product_selected));
      formData.append('products_uncheck',JSON.stringify(values.products_uncheck));
      formData.append('viewby', values.viewby);
      formData.append('totaltype', values.totaltype);
      formData.append('totalfirst', values.totalfirst);
      formData.append('totalsecond', values.totalsecond);
      formData.append('monthfirst', values.monthfirst);
      formData.append('monthsecond', values.monthsecond);
      formData.append('key_where', values.keyWhere);
      formData.append('emp_id', Vue.localStorage.get('emp_id'));
      formData.append('user_id', values.user_id);
      formData.append('view_status', values.view_status);
      formData.append('key_array', JSON.stringify(values.keyArray));
      return Vue.http.post(Vue.config['url'] + url, formData).then((response) => {
          return Promise.resolve(response.body.success.data);
      }).catch((error) => Promise.reject(error));
  },
  getTotalBy(url,values,response){
      var formData = new FormData();
      formData.append('page', values.total_page);
      formData.append('product_keyword', values.product_keyword);
      formData.append('response', JSON.stringify(response));
      formData.append('organize_type', values.organize_type);
      formData.append('product_type', values.product_type);
      formData.append('products_checkall',values.product_checkall);
      formData.append('products_check',JSON.stringify(values.product_selected));
      formData.append('products_uncheck',JSON.stringify(values.products_uncheck));
      formData.append('viewby', values.viewby);
      formData.append('totaltype', values.totaltype);
      formData.append('totalfirst', values.totalfirst);
      formData.append('totalsecond', values.totalsecond);
      return Vue.http.post(Vue.config['url'] + url, formData, {
        headers: {
          'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
      }).then((response) => {
          return Promise.resolve(response.body.success.data);
      }).catch((error) => Promise.reject(error));
  },
  getDetailTotalBy(url,values,response){
      var formData = new FormData();
      formData.append('page', values.total_page);
      formData.append('key_where', values.keyWhere);
      formData.append('response', JSON.stringify(response));
      formData.append('product_keyword', values.product_keyword);
      formData.append('organize_type', values.organize_type);
      formData.append('product_type', values.product_type);
      formData.append('products_checkall',values.product_checkall);
      formData.append('products_check',JSON.stringify(values.product_selected));
      formData.append('products_uncheck',JSON.stringify(values.products_uncheck));
      formData.append('viewby', values.viewby);
      formData.append('totaltype', values.totaltype);
      formData.append('totalfirst', values.totalfirst);
      formData.append('totalsecond', values.totalsecond);
      return Vue.http.post(Vue.config['url'] + url, formData, {
        headers: {
          'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
      }).then((response) => {
          return Promise.resolve(response.body.success.data);
      }).catch((error) => Promise.reject(error));
  },
  getPrevMonth(url,values,response){
      var formData = new FormData();
      formData.append('page', values.total_page);
      formData.append('response', JSON.stringify(response));
      formData.append('product_keyword', values.product_keyword);
      formData.append('organize_type', values.organize_type);
      formData.append('organizes', JSON.stringify(values.organizes));
      formData.append('product_type', values.product_type);
      formData.append('products_checkall',values.product_checkall);
      formData.append('products_check',JSON.stringify(values.product_selected));
      formData.append('products_uncheck',JSON.stringify(values.products_uncheck));
      formData.append('viewby', values.viewby);
      formData.append('monthfirst', values.monthfirst);
      formData.append('monthsecond', values.monthsecond);
      return Vue.http.post(Vue.config['url'] + url, formData, {
        headers: {
          'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
      }).then((response) => {
          return Promise.resolve(response.body.success.data);
      }).catch((error) => Promise.reject(error));
  },
  getDetailPrevMonth(url,values,response){
      var formData = new FormData();
      formData.append('page', values.total_page);
      formData.append('key_where', values.keyWhere);
      formData.append('response', JSON.stringify(response));
      formData.append('organize_type', values.organize_type);
      formData.append('product_keyword', values.product_keyword);
      formData.append('organizes', JSON.stringify(values.organizes));
      formData.append('product_type', values.product_type);
      formData.append('products_checkall',values.product_checkall);
      formData.append('products_check',JSON.stringify(values.product_selected));
      formData.append('products_uncheck',JSON.stringify(values.products_uncheck));
      formData.append('viewby', values.viewby);
      formData.append('monthfirst', values.monthfirst);
      formData.append('monthsecond', values.monthsecond);
      return Vue.http.post(Vue.config['url'] + url, formData, {
        headers: {
          'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
      }).then((response) => {
          return Promise.resolve(response.body.success.data);
      }).catch((error) => Promise.reject(error));
  },
  getIDandNameOfProductORG(url,values){
      var formData = new FormData();
      formData.append('item',values.item);
      formData.append('product_type', values.product_type);
      formData.append('product_keyword', values.product_keyword);
      formData.append('products_checkall',values.product_checkall);
      formData.append('products_check',JSON.stringify(values.product_selected));
      formData.append('products_uncheck',JSON.stringify(values.products_uncheck));
      return Vue.http.post(Vue.config['url'] + url, formData, {
        headers: {
          'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
      }).then((response) => {
          return Promise.resolve(response.body.success.data);
      }).catch((error) => Promise.reject(error));
  },
  getMessageComment(url,values){
      var formData = new FormData();
      formData.append('response', JSON.stringify(values));
      return Vue.http.post(Vue.config['url'] + url, formData, {
        headers: {
          'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
      }).then((response) => {
          return Promise.resolve(response.body.success.data);
      }).catch((error) => Promise.reject(error));
  },
  saveComment(url,values){
      var formData = new FormData();
      formData.append('values', JSON.stringify(values));
      return Vue.http.post(Vue.config['url'] + url, formData, {
        headers: {
          'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
      }).then((response) => {
          return Promise.resolve(response.body.success.data);
      }).catch((error) => Promise.reject(error));
  },
  savePerformance(url,values){
      var formData = new FormData();
      formData.append('type', values.type);
      formData.append('viewby', values.viewby);
      formData.append('items', JSON.stringify(values.items));
      formData.append('adjust', JSON.stringify(values.adjust));
      formData.append('headdetail', JSON.stringify(values.headdetail));
      formData.append('adjustdetail', JSON.stringify(values.adjustdetail));
      formData.append('organize_type', values.organize_type);
      formData.append('product_keyword', values.product_keyword);
      formData.append('organizes', JSON.stringify(values.organizes));
      formData.append('product_type', values.product_type);
      formData.append('products_checkall',values.product_checkall);
      formData.append('products_check',JSON.stringify(values.product_selected));
      formData.append('products_uncheck',JSON.stringify(values.products_uncheck));
      formData.append('totaltype', values.totaltype);
      formData.append('totalfirst', values.totalfirst);
      formData.append('totalsecond', values.totalsecond);
      formData.append('monthfirst', values.monthfirst);
      formData.append('monthsecond', values.monthsecond);
      formData.append('even_click', values.even_click);
      formData.append('team', JSON.stringify(values.team));
      formData.append('user_id', values.user_id);
      
      if(values.user_id != undefined) formData.append('creator', values.user_id);
      const user = {emp_id:Vue.localStorage.get('emp_id'),department:Vue.localStorage.get('department'),first_name:Vue.localStorage.get('first_name'),last_name:Vue.localStorage.get('last_name')};
      formData.append('user', JSON.stringify(user));
      return Vue.http.post(Vue.config['url'] + url, formData, {
        headers: {
          'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
      }).then((response) => {
          return Promise.resolve(response.body.success.data);
      }).catch((error) => Promise.reject(error));
  },
  getDataOfUserRequest(url,user_id,type,status){
      var formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('type', type);
      formData.append('status', status);
      return Vue.http.post(Vue.config['url'] + url, formData, {
        headers: {
          'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
      }).then((response) => {
          return Promise.resolve(response.body.success.data);
      }).catch((error) => Promise.reject(error));
  },
  rejectPerformance(url,user_id){
      var formData = new FormData();
      formData.append('user_id', user_id);
      return Vue.http.post(Vue.config['url'] + url, formData, {
        headers: {
          'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
      }).then((response) => {
          return Promise.resolve(response.body.success.data);
      }).catch((error) => Promise.reject(error));
  },
  getConfigStep1(url) {
    return Vue.http.get(Vue.config['url'] + url, {
      headers: {
      'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
        return Promise.resolve(response.body.success.data);
    }).catch((error) => Promise.reject(error));
  },
  updateComment(url,values){
    var formData = new FormData();
    formData.append('emp_id', values.emp_id);
    formData.append('code', values.code);
    formData.append('msg_to', values.msg_to);
    formData.append('status_read', values.status_read);
    return Vue.http.post(Vue.config['url'] + url, formData, {
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
  },
  getArea(url) {
    return Vue.http.get(Vue.config['url'] + url, {
        headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        },
    }).then((response) => {
        return Promise.resolve(response.body.success);
    }).catch((error) => Promise.reject(error));
  }
}