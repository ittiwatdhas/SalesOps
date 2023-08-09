import organizes from "../../data/organizes";
import salePerformanceService from "../../services/planning/salePerformance";
import Vue from "vue";

const state = {
  organizes: [],
  tmp_organizes: [],
  options_organize: [],
  options_organize_selected: null,
  loadProduct: true,
  products: [],
  products_uncheck: [],
  options_product: [],
  options_product_selected: null,
  product_selected: [],
  product_checkall: true,
  keyword: "",
  chkhead_sales: true,
  chkhead_team: true,
  keepLoadProduct: false,
  countExpand1: 0,
  countExpand2: 0,
  countExpandTeam: 0,
  temp_countExpand1: "",
  temp_countExpand2: "",
  temp_countExpandTeam: "",
  countProductAll:"",
  team: [],
  tmp_team: [],
  options_team_selected: 2,
  detailCatgory:[],
  full_Catgory:[],
  time:''
};

const mutations = {

  SET_SEARCH(state , value){
    state.detailCatgory = value
  },
  SET_ORGANIZES(state, value) {
    state.organizes = value.organizes;
    state.tmp_organizes = value.tmp_organizes;
    state.options_organize = value.options;
    // NEWISSUE
    state.options_organize_selected = null;
    // state.options_organize_selected = value.options[0].id;
  },
  SEARCH_ORGANIZE(state, keyword) {
    const _organizes = state.tmp_organizes;
    const datas = _organizes.filter(word => {
      const str = word.emp_id + word.first_name_en;
      return str.toUpperCase().indexOf(keyword.toUpperCase()) !== -1;
    });
    state.organizes = datas;
    state.countExpand1 = datas.length;
    state.temp_countExpand1 = datas.length;
  },
  SEARCH_TEAM_ORGANIZE(state, keyword) {
    const _organizes = state.tmp_team;
    const datas = _organizes.filter(word => {
      const str = word.emp_id + word.first_name_en;
      return str.toUpperCase().indexOf(keyword.toUpperCase()) !== -1;
    });
    state.team = datas;
    state.countExpandTeam = datas.length;
    state.temp_countExpandTeam = datas.length;
  },
  
  SET_ORGANIZE_SERVER(state, value) {
    state.organizes = value;
    state.tmp_organizes = value;
  },
  SET_ORGANIZE_NULL(state) {
    state.organizes = [];
    state.tmp_organizes = [];
  },
  SELECTED_ORGANIZE(state, value) {
    state.options_organize_selected = value;
  },
  SET_PRODUCTS(state, value) {
    state.products = value.products;
    state.options_product = value.options;
    // NEWISSUE
    // state.options_product_selected = value.options[0].id;
    state.options_product_selected = null;
  },
  SEARCH_PRODUCT(state, keyword) {
    const _products = state.tmp_products;
    const datas = _products.filter(word => {
      const str = word.id + word.name;
      return str.toUpperCase().indexOf(keyword.toUpperCase()) !== -1;
    });
    state.products = datas;
    state.keyword = keyword;
  },
  SELECTED_PRODUCT(state, value) {
    state.options_product_selected = value;
  },
  SET_SEARCH_PRODUCT(state, value) {
    if (state.product_checkall == false) {
      value.forEach((element, index) => {
        value[index].checked = false;
      });
      if (state.product_selected.length > 0) {
        var data = value.filter(word => {
          if (state.product_selected[word.id]) {
            word.checked = true;
          }
          return word;
        });
        state.products = JSON.parse(JSON.stringify(data));
        state.product_selected = JSON.parse(JSON.stringify(data));
      } else {
        state.products = JSON.parse(JSON.stringify(value));
        state.product_selected = JSON.parse(JSON.stringify(value));
      }
    } else {
      if (state.products_uncheck.length > 0) {
        var data = value.filter(word => {
          if (state.products_uncheck[word.id]) {
            word.checked = false;
          }
          return word;
        });
        state.products = JSON.parse(JSON.stringify(data));
        state.product_selected = JSON.parse(JSON.stringify(data));
      } else {
        // state.product_selected = [];
        // state.product_selected = [];
        state.products = JSON.parse(JSON.stringify(value));
        state.product_selected = JSON.parse(JSON.stringify(value));
      }
    }
  },
  SET_PRODUCT_FIRST_SERVER(state, value) {
    /*if(state.products_uncheck){
            var data = value.filter((word)=> {
                if(state.products_uncheck[word.id]){
                    word.checked = false;
                }
                return word;
            });
            state.products = data;
        }else{*/
    state.products = value;
    //}
  },
  SET_PRODUCT_SERVER(state, value) {
    if (state.product_checkall == false) {
      value.forEach((element, index) => {
        value[index].checked = false;
      });
      if (state.product_selected) {
        var data = value.filter(word => {
          if (state.product_selected[word.id]) {
            word.checked = true;
          }
          return word;
        });
        state.products.push.apply(state.products, data);
      } else {
        state.products.push.apply(state.products, value);
      }
    } else {
      if (state.products_uncheck) {
        var data = value.filter(word => {
          if (state.products_uncheck[word.id]) {
            word.checked = false;
          }
          return word;
        });
        state.products.push.apply(state.products, data);
      } else {
        state.products.push.apply(state.products, value);
      }
    }

    /*if(state.products_uncheck){
            var data = value.filter((word)=> {
                if(state.products_uncheck[word.id]){
                    word.checked = false;
                }
                return word;
            });
            state.products.push.apply(state.products, data);
        }else{
            if(state.product_checkall == false){
                
            }
            state.products.push.apply(state.products, value);
        }*/
  },
  SET_LOAD_PRODUCT(state, value) {
    state.loadProduct = value;
  },
  SET_UNCHECK_ORGANIZE(state, { id, status }) {
    const index = state.organizes.findIndex(organize => {
      return organize.emp_id == id;
    });
    if (status) state.organizes[index].checked = true;
    else state.organizes[index].checked = false;
  },
  SET_UNCHECK_ORGANIZE_TEAM(state, { id, status }) {
    const index = state.team.findIndex(team => {
      return team.emp_id == id;
    });
    if (status) state.team[index].checked = true;
    else state.team[index].checked = false;
  },
  SET_PRODUCT_UNCHECK(state, { id, status }) {
    if (status) {
      const index = state.products_uncheck.findIndex(product => {
        return product.id == id;
      });
      state.products_uncheck.splice(index, 1);
    } else {
      state.products_uncheck.push({ id: id });
    }
  },
  SET_PRODUCT_SELECTED(state, { id, name, status }) {
    if (status) {
      state.product_selected.push({ id, name });
    }else {
      const index = state.product_selected.findIndex(product => {
        return product.id == id;
      });
      state.product_selected.splice(index, 1);
    }

  },
  SET_UNCHECK_PRODUCT_NULL(state) {
    state.products_uncheck = [];
  },
  SET_CLEAR_PRODUCT_SELECTED(state) {
    state.product_selected = [];
  },
  SET_PRODUCT_CHECKALL(state, value) {
    state.product_checkall = value;
  },
  SET_KEYWORD_PRODUCT(state, value) {
    state.keyword = value;
  },
  SET_PRODUCT_UNCHECK_FROM_SERVER(state, value) {
    state.products_uncheck = value;
  },
  SET_PRODUCT_SELECTED_FROM_SERVER(state, value) {
    state.product_selected = value;
  },
  SET_CHECK_ALL_ORGANIZATION(state, value) {
    state.chkhead_sales = value;
  },
  SET_COUNT_EXPAND1(state, value) {
    state.countExpand1 = value;
  },
  SET_COUNT_EXPAND2(state, value) {
    state.countExpand2 = value;
  },
  SET_COUNT_EXPANDTEAM(state, value) {
    state.countExpandTeam = value;
  },
  SET_TEAM_SERVER(state, value) {
    state.team = value;
    state.tmp_team = value;
  },
  SET_TEAM_NULL(state) {
    state.team = [];
    state.tmp_team = [];
  },
  SET_CHECK_ALL_TEAM(state, value) {
    state.chkhead_team = value;
  },
};

const actions = {
  initOrganizes: ({ commit }) => {
    const department = Vue.localStorage.get("department");
    const options = [
      {
        id: 1,
        name: "SALES CHANNEL"
      },
      {
        id: 2,
        name: "SALES AREA"
      },
      {
        id: 3,
        name: "SALESMAN"
      }
    ];
    if (department == "SUP") {
      options.splice(0, 1);
    }
    commit("SET_ORGANIZES", { organizes, options });
  },
  searchOrganize: ({ commit }, keyword) => {
    commit("SEARCH_ORGANIZE", keyword);
  },
  searchTeamOrganize: ({ commit }, keyword) => {
    commit("SEARCH_TEAM_ORGANIZE", keyword);
  },
  checkProd: ({ commit ,state}, even) => {
    let countExpand2 = state.countExpand2;
    if(even == false){
      state.countExpand2 = countExpand2 - 1;
    }else{
      state.countExpand2 = countExpand2 + 1;
    }
    
    
    // state.countExpand2 = data.length;
  },
  /*setOrganizeServer: ({commit}, value) => {
        commit('SET_ORGANIZE_SERVER', value);
        //commit('SELECTED_ORGANIZE', value);
    },*/
  setSelectedOrganize: ({ commit }, value) => {
    commit("SELECTED_ORGANIZE", value);
  },
  getDataOrganizesService: ({ commit, rootState }, value) => {
    
    value.data_select = "";
    if(value.type == 'saleman'){
      commit("SET_CLEAR_TEAM_ORGANIZE");
      var data = state.team.filter(team => {
        return team.checked == true;
      });
      value.data_select = data;
      commit("SET_TEAM_ORGANIZE", data);
    }
    salePerformanceService
      .getSalesMan(value.url,value)
      .then(response => {
        // const user_id = rootState.step2.user_id;
        // if (user_id == "")
        if(response.type == "area"){
          commit("SET_TEAM_NULL");
          state.countExpandTeam = response.count;
          if (state.temp_countExpandTeam == "") {
            state.temp_countExpandTeam = response.count;
          }
          commit("SET_TEAM_SERVER", response.data);
        }else{
          commit("SET_ORGANIZE_SERVER", []);
          state.countExpand1 = response.count;
          if (state.temp_countExpand1 == "") {
            state.temp_countExpand1 = response.count;
          }
          commit("SET_ORGANIZE_SERVER", response.data);
        }

      })
      .catch(error => console.log("error"));
    //}
  },
  getCatgory:({ commit ,dispatch }) =>{

    let data_detail =[]
    let st=40
    let value = "";
    var data = state.organizes.filter(organize => {
      return organize.checked == true;
    });
    value = data;
    salePerformanceService
      .getCatgory(value , state.time )
      .then(response => {
        for (let index = 0; index < response.data.length; index++) {
          for (let j = 0; j < response.data[index].items.length; j++) {
           Object.assign(response.data[index].items[j], { id: (j+1)  });
          }
        }
        if(response.data.length <40){
           st  = response.data.length
        }
        for (let index = 0; index < st; index++) {
          const element = response.data[index];
          data_detail.push(element)
        }
        state.detailCatgory = data_detail
        // state.detailCatgory = response.data
        state.full_Catgory = response.data

      })
      .catch(error => console.log("error"));
  },
  scrollLoadGetCatgory: ({ commit, state ,dispatch},value ) => {
    const data_before = state.detailCatgory;
    let start=0
    let end =0 
    // console.log(data_before.length)
    if(data_before.length+30 <= state.full_Catgory.length){
      start = data_before.length+1
      end = data_before.length+30
    }else {
      start = data_before.length
      end = state.full_Catgory.length
    }

    for (let index = start; index < end; index++) {
      const element = state.full_Catgory[index];
      state.detailCatgory.push(element)
    }

    // console.log(start , end )
    // console.log(data_before.length , state.full_cus_detail.length)
      // if(data_before.length+500 <= state.full_cus_detail.length){
      //   start = data_before.length+1
      //   end = data_before.length+500
      // }else {
      //   start = data_before.length
      //   end = state.full_cus_detail.length
      // }
      // for (let index = start; index < end; index++) {
      //   const element = state.full_cus_detail[index];
      //   state.customerList.push(element)
      //   }

      // console.log("scrollLoadData2 => ", state.customerList)
  },
  getDefaultYearandmonth:({ commit ,dispatch}) =>{
    salePerformanceService
      .getDefaultYearandmonth()
      .then(response => {
        state.time = response.data.month
        // console.log("getDefaultYearandmonth => ",response.data.month)
      })
      .catch(error => console.log("error"));
  },

  
  saveCategory:({ commit  },value) =>{
   
    salePerformanceService
      .saveCategory(value,state.time)
      .then(response => {
        // console.log("saveCategory",response)
      
      })
      .catch(error => console.log("error"));
  },

  setOrganizeNull: ({ commit }) => {
    commit("SET_ORGANIZE_NULL");
  },
  setTeamOrgNull: ({ commit }) => {
    commit("SET_TEAM_NULL");
  },
  initProducts: ({ commit }) => {
    //const department = Vue.localStorage.get('department');
    const options = [
      {
        id: 1,
        name: "TYPE"
      },
      {
        id: 2,
        name: "GROUP"
      },
      {
        id: 3,
        name: "SUB GROUP"
      },
      {
        id: 4,
        name: "CATEGORY"
      }
      // ,{
      //     id: 5,
      //     name: 'PRODUCT'
      // }
    ];
    const products = [];
    commit("SET_PRODUCTS", { products, options });
  },
  setSelectedProduct: ({ commit }, value) => {
    commit("SELECTED_PRODUCT", value);
  },
  
  getDataProductLoadType: ({ commit, dispatch }, value) => {
    //NEW ISSUE
    if (!state.keepLoadProduct && value.url == "") {
      // salePerformanceService
      //   .getConfigStep1("get-config-step1")
      //   .then(response => {
      //     state.keepLoadProduct = true
      //     if (typeof response.product_org != "undefined") {
      //       state.options_product_selected = response.product_org.id;
      //       let arrayUrl = [
      //         {
      //           id: 1,
      //           url: "/get-type-performance"
      //         },
      //         {
      //           id: 2,
      //           url: "/get-group-performance"
      //         },
      //         {
      //           id: 3,
      //           url: "/get-subgroup-performance"
      //         },
      //         {
      //           id: 4,
      //           url: "/get-catgory-performance"
      //         },
      //         {
      //           id: 4,
      //           url: "/get-product-performance"
      //         }
      //       ];
      //       var url = arrayUrl.filter(row => {
      //         return row.id == state.options_product_selected;
      //       });
      //       dispatch("getDataProductsFirstService", {
      //         url: url[0].url,
      //         page: value.page
      //       });
      //     }
      //   })
      //   .catch(error => console.log("error=>getConfigStep1"));
    } else if (value.url != "") {
      dispatch("getDataProductsFirstService", {
        url: value.url,
        page: value.page
      });
    }
  },
  getDataOrganizesServiceLoadType: ({ commit, dispatch }) => {
    //NEW ISSUE
    let arrayUrl = [
      {
        id: 1,
        type: "channel",
        url: "/get-channel-performance"
      },
      {
        id: 2,
        type: "area",
        url: "/get-area-performance"
      },
      {
        id: 3,
        type: "saleman",
        url: "/get-saleman-performance"
      }
    ];
    if (state.options_organize_selected == null) {
      salePerformanceService
        .getConfigStep1("/get-config-step1")
        .then(response => {
          if (typeof response.organ_level != "undefined") {
            state.options_organize_selected = response.organ_level.id;
            state.options_product_selected = response.product_org.id;
          }
        })
        .catch(error => console.log("error=>getConfigStep1"));
    } else {
      var url = arrayUrl.filter(row => {
        return row.id == state.options_organize_selected;
      });
      dispatch("getDataOrganizesService", {url: url[0].url, type: url[0].type} );
    }
  },
  getDataProductsFirstService: ({ commit, rootState }, { url, page }) => {
    commit("SET_PRODUCT_FIRST_SERVER", []);
    commit("SET_PRODUCT_CHECKALL", true);
    let value = "";
    var data = state.organizes.filter(organize => {
      return organize.checked == true;
    });
    value = data;
    salePerformanceService
      .getProductPage(url, page, value)
      .then(response => {
        state.countExpand2 = response.count;
        state.countProductAll = response.count;
        if (state.temp_countExpand2 == "") {
          state.temp_countExpand2 = response.count;
        }
        const user_id = rootState.step2.user_id;
        commit("SET_PRODUCT_FIRST_SERVER",  JSON.parse(JSON.stringify(response.data)));

        // if (user_id == "") {
          commit("SET_CLEAR_PRODUCT_SELECTED");
          commit("SET_UNCHECK_PRODUCT_NULL");
        // }
      })
      .catch(error => console.log("error=>getDataProductsFirstService"));
  },
  getDataProductsService: ({ commit }, { url, page, keyword }) => {
    commit("SET_KEYWORD_PRODUCT", keyword);
    let value = "";
    var data = state.organizes.filter(organize => {
      return organize.checked == true;
    });
    value = data;
    salePerformanceService
      .getProductPage(url, page, value, keyword)
      .then(response => {
        if (response.length < 50) commit("SET_LOAD_PRODUCT", false);
        commit("SET_PRODUCT_SERVER", response.data);
      })
      .catch(error => console.log("error=>getDataProductsService"));
  },
  searchProduct: ({ commit }, { url, page, keyword }) => {
    commit("SET_KEYWORD_PRODUCT", keyword);
    let value = "";
    var data = state.organizes.filter(organize => {
      return organize.checked == true;
    });
    value = data;
    salePerformanceService
      .getProductPage(url, page, value, keyword)
      .then(response => {
        // commit("SET_PRODUCT_CHECKALL", false);
        commit("SET_SEARCH_PRODUCT", response.data);
        state.countExpand2 = response.count;
        state.temp_countExpand2 = response.count;
      })
      .catch(error => console.log("error=>searchProduct"));
    //commit('SEARCH_PRODUCT', keyword);
  },
  setloadProduct: ({ commit }, value) => {
    commit("SET_LOAD_PRODUCT", value);
  },
  setProductUncheck: ({ commit }, { id, status }) => {
    commit("SET_PRODUCT_UNCHECK", { id, status });
  },
  setProductSelected: ({ commit }, { id, name, status }) => {
    commit("SET_PRODUCT_SELECTED", { id, name, status });
  },
  setUnselectedOrganizeById: ({ commit }, { id, status }) => {
    commit("SET_UNCHECK_ORGANIZE", { id, status });
  },
  setUnselectedProductNull: ({ commit }) => {
    commit("SET_UNCHECK_PRODUCT_NULL");
  },
  clearProductSelected: ({ commit }) => {
    commit("SET_CLEAR_PRODUCT_SELECTED");
  },
  setProductCheckAll: ({ commit }, value) => {
    commit("SET_PRODUCT_CHECKALL", value);
  },
  setChkHeadSales: ({ commit ,state}, value) => {
    commit("SET_CHECK_ALL_ORGANIZATION", value);
    if (value) {
      state.countExpand1 = state.temp_countExpand1;
    } else {
      var data = state.organizes.filter(row => {
        return row.checked == true;
      });
      state.countExpand1 = data.length;
    }
  },
  setChkHeadTeam: ({ commit ,state}, value) => {
    commit("SET_CHECK_ALL_TEAM", value);
    if (value) {
      state.countExpandTeam = state.temp_countExpandTeam;
    } else {
      var data = state.team.filter(row => {
        return row.checked == true;
      });
      state.countExpandTeam = data.length;
    }
  },
  setUnselectedOrganizeTeamById: ({ commit }, { id, status }) => {
    commit("SET_UNCHECK_ORGANIZE_TEAM", { id, status });
  },
};

const getters = {
  organizes: state => {
    return state.organizes;
  },
  organizes_data: state => {
    var data = state.organizes.filter(organize => {
      return organize.checked == true;
    });
    return data;
  },
  options_organize: state => {
    return state.options_organize;
  },
  options_organize_selected: state => {
    return state.options_organize_selected;
  },
  products: state => {
    return state.products;
  },
  products_uncheck: state => {
    return state.products_uncheck;
  },
  product_selected: state => {
    return state.product_selected;
  },
  options_product: state => {
    return state.options_product;
  },
  options_product_selected: state => {
    return state.options_product_selected;
  },
  load_product: state => {
    return state.loadProduct;
  },
  product_checkall: state => {
    return state.product_checkall;
  },
  product_keyword: state => {
    return state.keyword;
  },
  chkhead_sales: state => {
    return state.chkhead_sales;
  },
  countExpand1: state => {
    return state.countExpand1;
  },
  countExpand2: state => {
    return state.countExpand2;
  },
  countExpandTeam: state => {
    return state.countExpandTeam;
  },
  temp_countExpand1: state => {
    return state.temp_countExpand1;
  },
  temp_countExpand2: state => {
    return state.temp_countExpand2;
  },
  temp_countExpandTeam: state => {
    return state.temp_countExpandTeam;
  },
  countProductAll: state =>{
    return state.countProductAll;
  },
  organizes_team: state => {
    return state.team;
  },
  options_team_selected: state => {
    return state.options_team_selected;
  },
  chkhead_team: state => {
    return state.chkhead_team;
  },
  organizes_team_data: state => {
    var data = state.team.filter(team => {
      return team.checked == true;
    });
    return data;
  },
  detailCatgory:state =>{
    return state.detailCatgory
  },
  full_Catgory:state =>{
    return state.full_Catgory
  },
  time:state =>{
    return state.time
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
