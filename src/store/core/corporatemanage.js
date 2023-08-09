import corporateManageService from "../../services/core/corporatemanage";
import Vue from "vue";

const state = {
  corp_list: [],
  corp_list2: [],
  customer_setting :[],
  cpr_count_ALL_CORP :'',
  cpr_count_ACTIVE :'',
  cpr_count_INACTIVE :'',
  search_list:[],
  customer_mtt_list:[],
  customer_mtt_count:'',
  cpr_spinner_loading: false,
 

  // path_menu: [],
  // all_path_menu: [],
  // head_path_menu: [],
  // sub_path_menu: [],
  // left_path_menu: [],
  // select_menu: '',
  // displayMenu: []
};

const mutations = {
  'SET_CORP_DETAIL_LIST'(state, value) {
        state.corp_list2 = []
   var count=1
    value.forEach(function (value, key) {
      // console.log(count)
        value.id = count
        value.add_dup = false
        value.btn_edit = false
        value.inp_code = false
        value.inp_name = false
        value.check_row_edit = false
        value.mode = false
        value.temp_corp_code = ''
        value.temp_corp_name = ''
        value.corp_code =value.corp_code
        value.corp_name = value.corp_name
        value.status = value.status
        value.active_edit_code = 'inactive'
        state.corp_list2.push(value);
        count++;
    });
},

  // 'SET_ALL_PATH_MENU'(state, value) {
  //     state.all_path_menu = value;
  // },
  // 'SET_HEAD_PATH_MENU'(state, value) {
  //     state.head_path_menu = value;
  // },
  // 'SET_SUB_PATH_MENU'(state, value) {
  //     state.sub_path_menu = value;
  // },
  // 'SET_LEFT_PATH_MENU'(state, value) {
  //     state.left_path_menu = value;
  // },
  // 'SET_SELECT_MENU'(state, value) {
  //     state.select_menu = value;
  // },
  // 'SET_DISPLAYMENU'(state, value) {
  //     state.displayMenu = value;
  // },
};

const actions = {
  selectAllCorporate: ({ commit, state,dispatch }, value) => {
    corporateManageService
      .selectAllCorporate(value)
      .then((response) => {
        // console.log("count ",response);
        state.cpr_count_ALL_CORP = response.all_corp;
        state.cpr_count_ACTIVE = response.active;
        state.cpr_count_INACTIVE = response.inactive;
        state.corp_list = response.data; 
        dispatch('selectAllCorporate2',value)
      })
      .catch((error) => console.log("changePasswordService"));
  },
  selectAllCorporate2: ({ commit, state }, value) => {
    state.cpr_spinner_loading = true;
    commit('SET_CORP_DETAIL_LIST', []);
    corporateManageService
      .selectAllCorporate2(value)
      .then((response) => {
        state.cpr_spinner_loading = false;
        state.cpr_count_ALL_CORP = response.all_corp;
        state.cpr_count_ACTIVE = response.active;
        state.cpr_count_INACTIVE = response.inactive;
        
        commit('SET_CORP_DETAIL_LIST', response.data);
        
      })
      .catch((error) => console.log("changePasswordService"));
  },
  selectAllCorporate_search: ({ commit, state }, value) => {
   
    commit('SET_CORP_DETAIL_LIST', []);
    corporateManageService
      .selectAllCorporate2(value)
      .then((response) => {
   
        commit('SET_CORP_DETAIL_LIST', response.data);
        
      })
      .catch((error) => console.log("changePasswordService"));
  },
  settingCustomerMapping: ({ commit, state }, value) => {
    state.cpr_spinner_loading = true;
    corporateManageService
      .settingCustomerMapping(value)
      .then((response) => {
        state.cpr_spinner_loading = false;
        // console.log("API => ", response.data);
        state.customer_setting =[]
        var group_data = response.data.group;
        var mapping_data = [];
        var customer = response.data.customer;
        for (let index = 0; index < group_data.length; index++) {
            Object.assign(group_data[index], { customer: []  });
            Object.assign(group_data[index], { customer_count: ''  });
            Object.assign(group_data[index], { corp_code: ''  });
         for (let j = 0; j < customer.length; j++) {
             if(customer[j].corp_name == group_data[index].name && customer[j].corp_code == group_data[index].code){
                  const element = customer[j]; 
                  mapping_data.push({
                    customer_code: element.customer_code,
                    customer_name_th: element.customer_name_th,
                    corp_code: element.corp_code,
                  })
                  group_data[index].corp_code = customer[j].corp_code
             }
         }
         group_data[index].customer = mapping_data
         group_data[index].customer_count = mapping_data.length
         mapping_data =[];
         const element = group_data[index];
         state.customer_setting.push(element)
          //  console.log("=>", element);
        }
      //   state.customer_setting.sort((a, b) =>
      //   a.customer_count > b.customer_count ? -1 : 1,
      // );
      })
      .catch((error) => console.log("changePasswordService"));
  },
  searchCustomerMapping: ({ commit, state }, value) => {
    corporateManageService
      .searchCustomerMapping(value)
      .then((response) => {
        // console.log("search List =>  ",response.data.customer);
        state.search_list = response.data.customer
        // state.corp_list = response.data;
      })
      .catch((error) => console.log("changePasswordService"));
  },
  settingMttCustomer: ({ commit, state }, value) => {
    corporateManageService
      .settingMttCustomer(value)
      .then((response) => {
        state.customer_mtt_list = response.data
        state.customer_mtt_count = response.countcust
        // state.corp_list = response.data;
      })
      .catch((error) => console.log("changePasswordService"));
  },
  settingAddRemoveCustomerMapping: ({ commit, state,dispatch }, value ) => {
  
    corporateManageService
      .settingAddRemoveCustomerMapping(value)
      .then((response) => {
        dispatch('settingMttCustomer',{customer:value.mtt_search,feild:'corp_name,customer_code',sorting:'ASC'} )
        dispatch('settingCustomerMapping',{'corp_code':value.check_search , 'customer':''}  )
        dispatch('selectAllCorporate', {'corp_code':'' , 'status':1})
      })
      .catch((error) => console.log("settingAddRemoveCustomerMapping"));
  },
  settingSaveCorporateMaster: ({ commit, state,dispatch }, value) => {
  
    corporateManageService
      .settingSaveCorporateMaster(value)
      .then((response) => {
       
        dispatch('settingMttCustomer',{customer:'',feild:'corp_code',sorting:'ASC'} )
        dispatch('settingCustomerMapping',{'corp_code':'' , 'customer':''}  )
        // dispatch('selectAllCorporate', '')

      })
      .catch((error) => console.log("settingSaveCorporateMaster"));
  },



 
};




const getters = {
  corp_list: (state) => {
    return state.corp_list;
  },
  corp_list2: (state) => {
    return state.corp_list2;
  },
  customer_setting: (state) => {
    return state.customer_setting;
  },
  cpr_count_ALL_CORP: (state) => {
    return state.cpr_count_ALL_CORP;
  },
  cpr_count_ACTIVE: (state) => {
    return state.cpr_count_ACTIVE;
  },
  cpr_count_INACTIVE: (state) => {
    return state.cpr_count_INACTIVE;
  },
  search_list: (state) => {
    return state.search_list;
  },
  customer_mtt_list: (state) => {
    return state.customer_mtt_list;
  },
  customer_mtt_count: (state) => {
    return state.customer_mtt_count;
  },
  cpr_spinner_loading: (state) => {
    return state.cpr_spinner_loading;
  },

  
  

  // path_menu: state => {
  //     return state.path_menu;
  // },
  // all_path_menu: state => {
  //     return state.all_path_menu;
  // },
  // head_path_menu: state => {
  //     return state.head_path_menu;
  // },
  // sub_path_menu: state => {
  //     return state.sub_path_menu;
  // },
  // left_path_menu: state => {
  //     return state.left_path_menu;
  // },
  // select_menu: state => {
  //     return state.select_menu;
  // },
  // displayMenu: state => {
  //     return state.displayMenu;
  // },
};

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters,
};
