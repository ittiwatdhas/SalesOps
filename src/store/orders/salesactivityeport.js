import Vue from "vue";
import moment from "moment";
import salesactivityreports from "../../services/orders/salesactivityeport";
import formService from "../../services/core/formmanage";
import dateFunc from "../../components/Salesops/fullCalendar/dateFunc";
import _ from "lodash";

const state = {
    temp_data_t2:[],
    sales_team_head:[],
    taglabel:[],
    detail_t3:[],
    detail_tap_customer:[],
    activity_team:[],
    detail_t1:[],
    detail_t2:[],
    data_dialog_tripplan:[],
    data_dialog_order:[],
    sum_order:{
        plan:'-',
        checkIn:'-',
        order_value:'-',
        invoice_value:'-'
    },
    sum_customer:{
      plan:'-',
      checkIn:'-',
      order_value:'-',
      invoice_value:'-'
  },
  customer_tooltip: {
    visit:{
      plan:"-",
      in:"-"
    },
    virtual:{
      plan:"-",
      in:"-"
    },
    total:{
      plan:"-",
      in:"-"
    }
  },
    detail_far_from_store:[],
     
  dis_selected_date: {
    year: dateFunc.format(new Date(), "yyyy"),
    month_id: dateFunc.format(new Date(), "MM"),
    month: dateFunc.format(new Date(), "MMMM"),
  },
  pur_selected_date: {
    year: dateFunc.format(new Date(), "yyyy"),
    month: dateFunc.format(new Date(), "MM"),
    month_name: dateFunc.format(new Date(), "MMMM"),
    range: "-"
  },
  spinner:false

};
const mutations = {
  setDateSelect(state, value) {
    state.dis_selected_date.year = value.year;
    state.dis_selected_date.month_id = value.month.id;
    state.dis_selected_date.month = value.month.value;
  },
  clear_data_t3(state, value){
      state.detail_t3 = []
      state.sum_order = {
        plan:'-',
        checkIn:'-',
        order_value:'-',
        invoice_value:'-'
      }
  },
  setFilterTabTripplan(state , value){
    state.spinner = true
    let TheArray = []
    for (let index = 0; index < state.temp_data_t2.length; index++) {
      const element = state.temp_data_t2[index];
      if(element.emp_id.replace(/ |_/g, '').indexOf(value.replace(/ |_/g, '')) != -1 || element.fullname.replace(/ |_/g, '').indexOf(value.replace(/ |_/g, '')) != -1){
          TheArray.push(element)
      }
    }
   
    if(value.length == 0){
      state.detail_t2 = state.temp_data_t2
    }else {
       state.detail_t2 = TheArray
    }
    state.spinner = false
  }
};
const actions = {
  salesTeamHead: ({ state, dispatch } , value ) => {
    state.spinner = true
    salesactivityreports
      .salesTeamHead(value)
      .then(response => {
        state.spinner = false
        // console.log(value)
        if(value.tab != 'order'){
          state.sales_team_head = response.success_data
        }

       
        state.taglabel = response.taglabel
      })
      .catch();
  },
  salesTeamDetail: ({ state, dispatch } , value ) => {
    state.spinner = true
    salesactivityreports
      .salesTeamDetail(value)
      .then(response => {

        if(value.tab == 'tripplan'){
          state.temp_data_t2 = response.data
          state.detail_t2 = response.data
        }
        if(value.tab == 'salesteam'){
          state.detail_t1 = response.data
        }
        if(value.tab == 'dashboard'){
          state.detail_t1 = response.data
        }
        state.spinner = false
        // console.log(response)
      })
      .catch();
  },
  searchActivityTeam: ({ state, dispatch } , value ) => {
    state.spinner = true
    salesactivityreports
      .searchActivityTeam(value)
      .then(response => {
        state.spinner = false
        
        state.activity_team = response.data
       
      })
      .catch();
  },
  orderOverviewBypono: ({ state, dispatch } , value ) => {
    state.spinner = true
    salesactivityreports
      .orderOverviewBypono(value)
      .then(response => {
        state.spinner = false
        state.data_dialog_order = response.data
       
      })
      .catch();
  },
  getFarFromStore: ({ state, dispatch } , value ) => {
    state.spinner = true
    salesactivityreports
      .getFarFromStore(value)
      .then(response => {
        state.spinner = false
        state.detail_far_from_store = response.data
       
      })
      .catch();
  },
  
  orderOverviewDetail: ({ state, dispatch } , value ) => {
    state.spinner = true
    salesactivityreports
      .orderOverviewDetail(value)
      .then(response => {

        if(response.data.length != 0){
            var planCount = 0
            var checkinCount = 0
            var orderValueCount = 0
            var invValueCount = 0
            for (let index = 0; index < response.data.length; index++) {
              const element = response.data[index];
              planCount+=Number(element.count_plan)
              checkinCount+=Number(element.count_checkin)
              orderValueCount+=parseFloat(element.order_value)
              invValueCount+=parseFloat(element.invoice_value)
            }
            state.sum_order.plan = planCount
            state.sum_order.checkIn = checkinCount
            state.sum_order.order_value  = orderValueCount!=0 ? orderValueCount : 0
            state.sum_order.invoice_value  = invValueCount!=0 ? invValueCount : 0
        }else {
          state.sum_order = {
            plan:'-',
            checkIn:'-',
            order_value:'-',
            invoice_value:'-'
          }
        }
       
        state.detail_t3 = response.data 
        state.spinner = false
      })
      .catch();
  },

  customerOverviewDetail: ({ state, dispatch } , value ) => {
    state.spinner = true
    var del_keyword = ''
    del_keyword  = _.cloneDeep(value)
    del_keyword.keyword = ''
    // dispatch('orderOverviewDetail', del_keyword)
    salesactivityreports
      .customerOverviewDetail(value)
      .then(response => {
        var Count1 = 0
        var Count2 = 0
        var Count3 = 0
        var Count4= 0
        var Count5 = 0
        var Count6 = 0

        state.detail_tap_customer = response.data
          state.sum_customer.order_value  = response.sum_order
          state.sum_customer.invoice_value  = response.sum_inv

          // console.log(response.data.plan_visit , response.data.in_visit)
          // console.log(response.data.plan_virtual , response.data.in_virtual)
          // console.log(response.data.total_plan , response.data.total_in)

          if(response.data.length != 0){
           
            for (let index = 0; index < response.data.length; index++) {
              const element = response.data[index];
              Count1+=Number(element.plan_visit)
              Count2+=Number(element.in_visit)
              Count3+=Number(element.plan_virtual)
              Count4+=Number(element.in_virtual)
              Count5+=Number(element.total_plan)
              Count6+=Number(element.total_in)
            }
          
          }
          state.customer_tooltip.visit.plan = Count1 == 0 ? '-' : Count1
          state.customer_tooltip.visit.in = Count2 == 0 ? '-' : Count2

          state.customer_tooltip.virtual.plan = Count3 == 0 ? '-' : Count3
          state.customer_tooltip.virtual.in= Count4 == 0 ? '-' : Count4
          
          state.customer_tooltip.total.plan = Count5 == 0 ? '-' : Count5
          state.customer_tooltip.total.in = Count6 == 0 ? '-' : Count6
        state.spinner = false
        // state.detail_t3 = response.data
      })
      .catch();
  },
  tripplanOverviewDetailSalesActivityReports: ({ state, dispatch } , value ) => {
    state.spinner = true
    salesactivityreports
      .tripplanOverviewDetailSalesActivityReports(value)
      .then(response => {
        state.data_dialog_tripplan = response
        // console.log(response)
        state.spinner = false
       
      })
      .catch();
  },
  gsheetsActivityOverview: ({ state, dispatch } , value ) => {
    state.spinner = true
    salesactivityreports
      .gsheetsActivityOverview(value)
      .then(response => {
        // console.log(response)
        state.spinner = false
       
      })
      .catch();
  }
  // disSelectedDate: ({ state, dispatch }, value) => {
  //   state.dis_selected_date = value;
  // },
};

const getters = {
    sales_team_head: state => {
        return state.sales_team_head
    },
    taglabel: state => {
        return state.taglabel
    },
    detail_t1: state => {
        return state.detail_t1
    },
    detail_t2: state => {
      return state.detail_t2
  },
  dis_selected_date: state => {
    return state.dis_selected_date;
  },
  activity_team: state =>{
    return state.activity_team
  },
  detail_t3: state =>{
    return state.detail_t3
  },
  spinner: state => {
    return state.spinner;
  },
  data_dialog_tripplan: state =>{
    return state.data_dialog_tripplan
  },
  data_dialog_order: state =>{
    return state.data_dialog_order
  },
  sum_order: state =>{
    return state.sum_order
  },
  sum_customer: state =>{
    return state.sum_customer
  },
  detail_far_from_store: state => {
    return state.detail_far_from_store
  },
  detail_tap_customer: state => {
    return state.detail_tap_customer
  },
  customer_tooltip: state =>{
    return state.customer_tooltip
  }
//   dropdown: state => {
//     return state.selectLevelSales;
//   },
//   dataCorporate: state => {
//     return state.dataCorporate;
//   },
//   levelSalesTitle: state => {
//     return state.levelSalesTitle;
//   },
//   levelSalesCode: state => {
//     return state.levelSalesCode;
//   },
//   dataPurchase: state => {
//     return state.dataPurchase;
//   },
//   detail: state => {
//     return state.detail;
//   },
//   spinnerDG: state => {
//     return state.spinnerDG;
//   },
//   comment: state => {
//     return state.comment;
//   },
//   disableFrom: state => {
//     return state.disableFrom;
//   },
//   totalItems: state => {
//     return state.totalItems;
//   },
//   paybycash_list: state => {
//     return state.paybycash_list;
//   },
//   commentList: state => {
//     return state.commentList;
//   },
//   loadDataMT: state => {
//     return state.loadDataMT;
//   },
};
export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
};
