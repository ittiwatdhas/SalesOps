import cmmanage from "../../services/core/cmmanage";
import Vue from "vue";
const state = {
  count_all: 0,
  count_active: 0,
  count_inactive: 0,
  count_tt: 0,
  count_mt: 0,
  count_mtt: 0,
  customerList: [],
  customerListRole: [],
  customer_detail:[],
  cm_spinner_loading: false,
  cm_spinner_loading_role: false,
  cm_spinner_loading_edit_role: false,
  AddressInfo:[],
  sales_cipher:'',
  sales_local:'',
  role_detail:[],
  full_role_detail:[],
  full_cus_detail:[],
  count_cus_role:0,
  count_cus_master:50,
  data_cut:[],
  fname:'',
  role_status:'',
  role_desc:'',
  count_select:0,
  select_customer_with_role:[],
  start_load_data_cm_role:0,
  all_role_cm_role_search:[],
  all_role_cm_role_search_add:[],
  role_code_edit:'',
  channel_code_edit:'',
  Salesman_SalesOps:'',
  search_detail_role:[],
  select_check_list:[],
  Temp_All_add:[],
  channel_search:'',
  search_role_user:[]
 
};
const mutations = {
    SET_FNAME(state , value){
    state.fname = value;
    },
    SET_ROLE_STATUS(state , value){
      state.role_status = value;
    },
    SET_ROLEDESC(state , value){
      state.role_desc = value;
    },
    SET_CUSTOMER_LIST(state , value){
        state.customerList = value;
    },
    SET_CUSTOMER_LIST_ROLE(state , value){
      state.customerListRole = value;
    },
      SET_COUNT_MASTER(state , value){
      state.count_cus_master = Number(state.count_cus_master + value);
    },
      SET_ROLE_DETAIL(state , value){
        state.role_detail = value;
        state.count_select =''
    },
      SET_COUNT_SELECT(state , value){
          if(value ==='add'){
            state.count_select+=1
          }else{
            state.count_select-=1
          }
    },
      START_LOAD_DATA_CM_ROLE(state , value){
        state.start_load_data_cm_role = value
        
    },
      SET_ROLE_CODE_EDIT(state , value){
        state.role_code_edit = value
    },
      SET_CHANNEL_CODE_EDIT(state , value){
      state.channel_code_edit = value
    },
      SET_SELECT_EDIT(state , value){
      state.select_customer_with_role = value
      // console.log('select =>' , value)
    },
      LIST_TEMP_ROLE_SEARCH_ALL(state , value){
        state.all_role_cm_role_search_add = value
    },
      SET_CHANNEL_SEARCH(state , value){
        state.channel_search = value
    }

};
const actions = {

  searchCustomer: ({ commit, state }, value) => {
    state.cm_spinner_loading = true;
    let data_detail =[]
    cmmanage
      .searchCustomer(value)
      .then((response) => { 
        state.count_all = response.sumcust[0].allcustomer;
        state.count_active = response.sumcust[0].active;
        state.count_inactive = response.sumcust[0].inactive;
        state.count_tt = response.sumcust[0].bychannel[1].TT;
        state.count_mt = response.sumcust[0].bychannel[2].MT;
        state.count_mtt = response.sumcust[0].bychannel[3].MTT;
        state.full_cus_detail = response.data
      // LOAD DATA
      if(value.check_load == 'search'){
         state.customerList = response.data
      }else {
        for (let index = 0; index < 500; index++) {
                const element = response.data[index];
                data_detail.push(element)
         }
         state.customerList = data_detail
      }
        state.cm_spinner_loading = false;
      })
      .catch((error) => console.error("error => searchCustomer",error));
  },
  searchCustomerRole: ({ commit, state }, value) => {
    state.cm_spinner_loading_role = true;
    const data_array =[]
    cmmanage
      .searchCustomerRole(value)
      .then((response) => { 
        state.cm_spinner_loading_role = false;
        state.all_role_cm_role_search = response.data
        // state.all_role_cm_role_search_add = response.data
        state.full_role_detail = response.data
        // state.customerListRole =  response.data
        if(value.type === 'search'){
          state.customerListRole = response.data
        }else {
           for(let index = 0; index < 100; index++) {
          const element = response.data[index];
           data_array.push(element)
          }
           state.customerListRole = data_array
        }
      })
      .catch((error) => console.error("error => customerListRole"));
  },
  searchDetailAllRole: ({ commit, state }, value) => {
    // state.cm_spinner_loading_role = true;
    const data_array =[]
    cmmanage
      .searchDetailAllRole(value)
      .then((response) => { 
        // state.cm_spinner_loading_role = false;
        state.all_role_cm_role_search = response.data
      })
      .catch((error) => console.error("error => searchDetailAllRole"));
  },
  searchDetailAllRoleAdd: ({ commit, state }, value) => {
    // state.cm_spinner_loading_role = true;
    const data_array =[]
    cmmanage
      .searchDetailAllRoleAdd(value)
      .then((response) => { 
        // state.cm_spinner_loading_role = false;
        state.all_role_cm_role_search_add = response.data
      })
      .catch((error) => console.error("error => searchDetailAllRoleAdd"));
  }, 
    searchDetailAllRoleAdd_Full: ({ commit, state }, value) => {
    // state.cm_spinner_loading_role = true;
    cmmanage
      .searchDetailAllRoleAdd(value)
      .then((response) => { 
        // state.cm_spinner_loading_role = false;
        state.Temp_All_add = response.data
      })
      .catch((error) => console.error("error => searchDetailAllRoleAdd"));
  },

  countCustomer: ({ commit, state },value ) => {
    cmmanage
      .countCustomer()
      .then((response) => {
      })
      .catch((error) => console.error("error => countCustomer"));
  },
  editRoleDetail: ({ commit, state },value ) => {
    state.cm_spinner_loading_edit_role = true
    let select_c=0
     const data_select_role =[]
    cmmanage
      .editRoleDetail(value)
      .then((response) => {
      
        for (let i = 0; i < state.select_customer_with_role.length; i++) {
          const element = state.select_customer_with_role[i];
          const result = response.data.find( ({ customer_code }) => customer_code == element );
        if(result){
          result.chk = 'true'
        }
        }
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          if(element.chk === 'true'){
            select_c+=1
            if(state.select_customer_with_role.indexOf(element.customer_code) == -1){
              state.select_customer_with_role.push(element.customer_code)
            }
          }
        }
        response.data.sort((a, b) => (a.chk > b.chk ? -1 : 1));
        // console.log("Len => ",state.select_check_list.length)
        state.cm_spinner_loading_edit_role = false
        state.count_select = select_c
        state.count_cus_role = response.data.length
        state.role_detail = response.data
        // console.log("API => ",state.select_customer_with_role )
      })
      .catch((error) => console.error("error => editRoleDetail"));
  },
  editRoleDetail_full: ({ commit, state ,dispatch},value ) => {
    state.cm_spinner_loading_edit_role = true;
    cmmanage
      .editRoleDetail(value)
      .then((response) => {
        state.cm_spinner_loading_edit_role = false;
        state.role_detail = response.data
      })
      .catch((error) => console.error("error => delRoleDetail"));
  },

  delRoleDetail: ({ commit, state ,dispatch},value ) => {
    cmmanage
      .delRoleDetail(value)
      .then((response) => {
        dispatch("searchCustomerRole",{
          cust_search :'',
          role :'',
          channel :''});
      })
      .catch((error) => console.error("error => delRoleDetail"));
  },
  syncCustOnsales: ({ commit, state ,dispatch},value ) => {
      cmmanage
        .syncCustOnsales(value)
        .then((response) => {
          dispatch("searchCustomerRole",{
            cust_search :'',
            role :'',
            channel :''});
        })
        .catch((error) => console.error("error => syncCustOnsales"));
    },
    searchUser: ({ commit, state ,dispatch},value ) => {
      cmmanage
        .searchUser(value)
        .then((response) => {
          state.search_role_user = response.data
          state.fname = response.data[0].fname
          state.role_desc = response.data[0].role_desc
          state.role_status = response.data[0].status
        })
        .catch((error) => console.error("error => searchUser"));
    },
    addRoleDetail: ({ commit, state ,dispatch},value ) => {
      cmmanage
        .addRoleDetail(value)
        .then((response) => {
          // console.log("addRoleDetail",response)
          
        })
        .catch((error) => console.error("error => addRoleDetail"));
    },
    updateRoleDetail: ({ commit, state ,dispatch },value ) => {
      state.cm_spinner_loading_edit_role = true;
      cmmanage
        .updateRoleDetail(value)
        .then((response) => {
          state.cm_spinner_loading_edit_role = false;
          // state.select_check_list = []
          dispatch('editRoleDetail_full', 
          {
            role_code:state.role_code_edit,
            cust_search:'',
            channel:state.channel_search
           })

           dispatch("searchCustomerRole",{
            cust_search :'',
            role :'',
            channel :'',
            type:''});
        })
        .catch((error) => console.error("error => updateRoleDetail"));
    },

    
  // MASTER
  customerDetails: ({ commit, state },value ) => {
    cmmanage
      .customerDetails(value)
      .then((response) => {
        state.customer_detail = response.data
        state.AddressInfo  = response.data.details[0]

        let str1 = JSON.stringify(String(response.data.sales_local));
        var myArr1 = str1.split('"');
        myArr1.splice(myArr1.length-1);
        myArr1 =  String(myArr1).substr(1,String(myArr1).length);
        

        let str2 = JSON.stringify(String(response.data.sales_cipher));
        var myArr2 = str2.split('"');
        myArr2.splice(myArr2.length-1);
        myArr2 =  String(myArr2).substr(1,String(myArr2).length);


        state.sales_local = String(myArr1)
        state.sales_cipher = String(myArr2)
  
      })
      .catch((error) => console.error("error => customerDetails",error));
  },
  // OTHER
  scrollLoadData: ({ commit, state ,dispatch },value ) => {
    const data_before = state.customerListRole;
    let start=0
    let end =0 
    if(data_before.length+100 <= state.full_role_detail.length){
      start = data_before.length+1
      end = data_before.length+100
    }else {
      // console.log('- else -',data_before.length , state.full_role_detail.length)
      start = data_before.length
      end = state.full_role_detail.length
    }
    for (let index = start; index < end; index++) {
      const element = state.full_role_detail[index];
      state.customerListRole.push(element)
      }
  },
  scrollLoadData2: ({ commit, state ,dispatch},value ) => {
    const data_before = state.customerList;
    let start=0
    let end =0 
    // console.log(data_before.length , state.full_cus_detail.length)
      if(data_before.length+500 <= state.full_cus_detail.length){
        start = data_before.length+1
        end = data_before.length+500
      }else {
        start = data_before.length
        end = state.full_cus_detail.length
      }
      for (let index = start; index < end; index++) {
        const element = state.full_cus_detail[index];
        state.customerList.push(element)
        }

      // console.log("scrollLoadData2 => ", state.customerList)
  },
};
const getters = {
  count_all: (state) => {
    return state.count_all;
  },
  count_active: (state) => {
    return state.count_active;
  },
  count_inactive: (state) => {
    return state.count_inactive;
  },
  count_tt: (state) => {
    return state.count_tt;
  },
  count_mt: (state) => {
    return state.count_mt;
  },
  count_mtt: (state) => {
    return state.count_mtt;
  },
  customerList: (state) => {
    return state.customerList;
  },
  customer_detail: (state) => {
    return state.customer_detail;
  },
  customerListRole: (state) => {
    return state.customerListRole;
  },
  cm_spinner_loading:(state) =>{
      return state.cm_spinner_loading;
  },
  cm_spinner_loading_role:(state) =>{
    return state.cm_spinner_loading_role;
  }, 
  cm_spinner_loading_edit_role:(state) =>{
    return state.cm_spinner_loading_edit_role;
  }, 
    AddressInfo:(state) =>{
      return state.AddressInfo;
  },
  sales_cipher:(state) =>{
    return state.sales_cipher;
  },
  sales_local:(state) =>{
    return state.sales_local;
  },
  role_detail:(state) =>{
    return state.role_detail;
  },
  count_cus_role:(state) =>{
    return state.count_cus_role;
  },
  count_cus_master:(state) =>{
    return state.count_cus_master;
  }
  ,
  fname:(state) =>{
    return state.fname;
  }
  ,
  role_status:(state) =>{
    return state.role_status;
  }
  ,
  role_desc:(state) =>{
    return state.role_desc;
  },
  count_select:(state) =>{
    return state.count_select;
  },
  select_customer_with_role:(state) =>{
    return state.select_customer_with_role;
  },
  start_load_data_cm_role:(state) =>{
    return state.start_load_data_cm_role;
  },
  all_role_cm_role_search:(state) =>{
    return state.all_role_cm_role_search;
  },
  all_role_cm_role_search_add:(state) =>{
    return state.all_role_cm_role_search_add;
  },
  full_role_detail:(state) =>{
    return state.full_role_detail
  },
  full_cus_detail:(state) =>{
    return state.full_cus_detail
  },
  role_code_edit:(state) =>{
    return state.role_code_edit
  },
  channel_code_edit:(state) =>{
    return state.channel_code_edit
  },
  search_detail_role:(state)=>{
    return state.search_detail_role
  },
  Salesman_SalesOps:(state)=>{
    return state.Salesman_SalesOps
  },
  select_check_list:(state) =>{
    return state.select_check_list
  },
  Temp_All_add:(state) =>{
    return state.Temp_All_add
  },
  channel_search:(state)=>{
    return state.channel_search
  },
  search_role_user:(state)=>{
    return state.search_role_user
  }



  //   role_all_ALLSTATUS: (state) => {
  //     return state.role_all_ALLSTATUS;
  //   },
  //   role_ACTIVE: (state) => {
  //     return state.role_ACTIVE;
  //   },
  //   role_INACTIVE: (state) => {
  //     return state.role_INACTIVE;
  //   },
  //   roleDataListSearch: (state) => {
  //     return state.dataListSearch;
  //   },
  //   roleDataList: (state) => {
  //     return state.dataList;
  //   },
  //   roleDataListTemp: (state) => {
  //     return state.dataListTemp;
  //   },
  //   check_role_dup: (state) => {
  //     return state.check_role_dup;
  //   },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
// 1.  API : /setting-role-all?keyword=
// TYPE : GET

// 2. API : /setting-role-user
// TYPE : GET

// 3. API : /setting-role-search?code=&type=&sort=description&orderby=asc
// TYPE : GET

// 4. API : /setting-save-role
// GET : POST
// ตัวอย่าง
// data_detail:{}
// type:add / edit
