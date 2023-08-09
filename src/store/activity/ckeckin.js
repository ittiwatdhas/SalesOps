import Vue from 'vue';
import checkinService from '../../services/activity/checkin'

const state = {
    status_login: false,
    tag_lable: [],
    show_progress_loading: false,
    show_spinner_loading: false,
    act_count_visits: 0,
    act_incomplete: 0,
    act_unplanned: 0,
    act_success_rate: 0,
    act_date: { id: 1, timename: "Today", value: "today" },
    act_customer_selected: '',
    act_customer_list: [],
    act_customer_search: [],
    act_shw_customer: false,
    act_group_sales_list: '',
    act_shw_select_group: 'active',
    act_check_evt: 'all',
    act_sales_selected: '',
    act_group_sales_selected: '',
    act_sales_list: '',
    act_sales_search: '',
    act_statusp_selected: 'all',
    act_actvity_list: [],
    act_txt_cust_selected: '',
    act_txt_date_selected: '',
    act_time_list: [],
    act_time_search: [{
        id: 1,
        timename: "Today",
        value: "today"
    },
    {
        id: 2,
        timename: "Yesterday",
        value: "yesterday"
    },
    {
        id: 3,
        timename: "This week",
        value: "this_week"
    },
    {
        id: 4,
        timename: "Last week",
        value: "last_week"
    },
    {
        id: 5,
        timename: "This month",
        value: "this_month"
    },
    {
        id: 6,
        timename: "Last month",
        value: "last_month"
    },
    {
        id: 7,
        timename: "Custom",
        value: "custom"
    }
    ],
    act_shw_report: false,
    act_default_i18n: {
        night: "Night",
        nights: "Nights",
        "day-names": ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"],
        "month-names": [
            "JANUARY",
            "FEBRUARY",
            "MARCH",
            "APRIL",
            "MAY",
            "JUNE",
            "JULY",
            "AUGUST",
            "SEPTEMBER",
            "OCTOBER",
            "NOVEMBER",
            "DECEMBER"
        ]
    },
    act_shw_lable: false,
    act_shw_menu_lable: false,
    act_level: 0,
    act_export_sale: '',
    act_export_team: '',
    act_path_export_report: '',
    act_selected_sales_from_dsh: '',
    act_email: '',
    act_emp_id: ''
};

const mutations = {
    'SET_STATUS_LOGIN'(state, value) {
        state.status_login = value;
    },
    'SET_SHOW_CUSTOMER'(state, value) {
        state.act_shw_customer = value;
    },
    'SET_SHOW_PROGRESS_LOADING'(state, value) {
        state.show_progress_loading = value;
    },
    'SET_SHOW_SPINNER_LOADING'(state, value) {
        state.show_spinner_loading = value;
    },
    'SET_SHOW_REPORT'(state, value) {
        state.act_shw_report = value;
    },
    'SET_CUSTOMER_SELECTED'(state, value) {
        state.act_customer_selected = value;
    },
    'SET_CUSTOMER_LIST'(state, value) {
        state.act_customer_list = value;
    },
    'SET_CUSTOMER_SEARCH'(state, value) {
        state.act_customer_search = value;
    },
    'SET_GROUP_SALES_LIST'(state, value) {
        state.act_group_sales_list = value;
    },
    'SET_SHOW_SELECT_GROUP'(state, value) {
        state.act_shw_select_group = value;
    },
    'SET_CHECK_EVT'(state, value) {
        state.act_check_evt = value;
    },
    'SET_GROUP_SALES_SELECTED'(state, value) {
        state.act_group_sales_selected = value;
    },
    'SET_SALES_SELECTED'(state, value) {
        state.act_sales_selected = value;
    },
    'SET_SALES_LIST'(state, value) {
        state.act_sales_list = value;
    },
    'SET_SALES_SEARCH'(state, value) {
        state.act_sales_search = value;
    },
    'SET_STATUSP_SELECTED'(state, value) {
        state.act_statusp_selected = value;
    },
    'SET_ACTIVITY_LIST'(state, value) {
        state.act_actvity_list = value;
    },
    'SET_DATE_SELECTED'(state, value) {
        state.act_date = value;
    },
    'SET_TXT_CUST_SELECTED'(state, value) {
        state.act_txt_cust_selected = value;
    },
    'SET_EMP_ID'(state, value) {
        state.act_emp_id = value;
    },
    'SET_TXT_DATE_SELECTED'(state, value) {
        state.act_txt_date_selected = value;
    },
    'SET_TIME_LIST'(state, value) {
        state.act_time_list = value;
    },
    'SET_TIME_SEARCH'(state, value) {
        state.act_time_search = value;
    },
    'SET_SHOW_LABLE'(state, value) {
        state.act_shw_lable = value;
    },
    'SET_SHOW_MENU_LABLE'(state, value) {
        state.act_shw_menu_lable = value;
    },
    'SET_LEVEL'(state, value) {
        state.act_level = value;
    },
    'SET_EXPORT_SALE'(state, value) {
        state.act_export_sale = value;
    },
    'SET_EXPORT_TEAM'(state, value) {
        state.act_export_team = value;
    },
    'SET_PATH_EXPORT_REPORT'(state, value) {
        state.act_path_export_report = value;
    },
    'SET_ACT_SELECTED_FROM_DSH'(state, value) {
        state.act_selected_sales_from_dsh = value;
    },
};

const actions = {
    setTimeListService: ({ commit, state }) => {
        let obj = []
        for (let i = 0; i < state.act_time_search.length; i++) {
            if (state.act_date.id != state.act_time_search[i].id || state.act_date.id == 7) {
                obj.push(state.act_time_search[i]);
            }
        }
        commit('SET_TIME_LIST', obj);
    },
    getCalculateService: ({ commit, state }, value) => {
        checkinService.getCalculate(value, state)
            .then((response) => {
                state.act_count_visits = response.count_visits;
                state.act_incomplete = response.incomplete;
                state.act_unplanned = response.unplanned;
                state.act_success_rate = response.success_rate;
            })
            .catch((error) => console.log('getCalculateService'));
    },
    getUserRoleIdService: ({ commit, state, dispatch }, value) => {
        checkinService.getUserRoleId(value)
            .then((response) => {
                if (response.emp_id != "" && response.data != "") {
                    commit('SET_EMP_ID', response.emp_id);
                    if (state.act_check_evt == "all") {
                        dispatch('getDetailALlSalesListService', Vue.localStorage.get("emp_id"));
                    } else if (state.act_check_evt == "group") {
                        dispatch('getDetailOfSalesListService', { evt: state.act_check_evt, emp_id: response.emp_id });
                    }
                    dispatch('getCalculateService', response.emp_id);
                    dispatch('setCustomerListService', response.emp_id);
                }
            })
            .catch((error) => console.log('getUserRoleIdService'));
    },
    setCustomerListService: ({ commit, state }, value) => {
        checkinService.getCustomerList(value)
            .then((response) => {
                state.act_email = response.email
                commit('SET_CUSTOMER_LIST', response.data);
                commit('SET_CUSTOMER_SEARCH', response.data);
            })
            .catch((error) => console.log('setCustomerListService'));
    },
    setGroupSalesListService: ({ commit, state }, value) => {
        checkinService.getByGroups()
            .then((response) => {
                state.act_email = response.email
                commit('SET_GROUP_SALES_LIST', response.data);
            })
            .catch((error) => console.log('setGroupSalesListService'));
    },
    setSalesListService: ({ commit, state }, value) => {
        commit('SET_SHOW_PROGRESS_LOADING', true);
        checkinService.getByGroupsSales(value)
            .then((response) => {
                commit('SET_SALES_SEARCH', response);
                if (state.act_selected_sales_from_dsh != '') {
                    let obj = response
                    for (var i = 0; i < response.length; i++) {
                        if (obj[i].emp_id == state.act_selected_sales_from_dsh.emp_id) {
                            obj[i].status_check = "click";
                            commit('SET_ACT_SELECTED_FROM_DSH', '');
                            commit('SET_SALES_LIST', obj);
                            commit('SET_SHOW_PROGRESS_LOADING', false);
                            return
                        }
                    }
                } else {
                    commit('SET_SALES_LIST', response);
                }
                commit('SET_SHOW_PROGRESS_LOADING', false);
            })
            .catch((error) => console.log('setSalesListService'));
    },
    searchCustomerService: ({ commit, state, dispatch }, param) => {
        let obj = [];
        if (param.length > 1) {
            for (var i = 0; i < state.act_customer_search.length; i++) {
                var str =
                    state.act_customer_search[i].customer_name_th +
                    state.act_customer_search[i].customer_name_th +
                    state.act_customer_search[i].customer_code;
                if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1)
                    obj.push(state.act_customer_search[i]);
                if (obj.length > 20) break;
            }
            commit('SET_CUSTOMER_SELECTED', "");
            commit('SET_SHOW_CUSTOMER', true);
            commit('SET_CUSTOMER_LIST', obj);
        } else if (param.length == 0) {
            commit('SET_CUSTOMER_LIST', state.act_customer_search);
            commit('SET_CUSTOMER_SELECTED', "");
            dispatch('getDetailOfSalesListService', { evt: state.act_check_evt, emp_id: state.act_emp_id });
            commit('SET_SHOW_CUSTOMER', false);
        }
    },
    selectCustomerService: ({ commit, state, dispatch }, value) => {
        commit('SET_SHOW_CUSTOMER', false);
        commit('SET_CUSTOMER_SELECTED', value);
        commit('SET_TXT_CUST_SELECTED', value.customer_name_th);
        if (state.act_group_sales_selected == "" && state.act_check_evt != "salesman") {
            dispatch('getUserRoleIdService', Vue.localStorage.get("emp_id"));
            dispatch('getDetailALlSalesListService', Vue.localStorage.get("emp_id"));
        } else {
            if (state.act_check_evt == "group") {
                dispatch('getUserRoleIdService', state.act_group_sales_selected.emp_id);
            } else if (state.act_check_evt == "all") {
                dispatch('getUserRoleIdService', Vue.localStorage.get("emp_id"));
            } else {
                dispatch('getDetailOfSalesListService', { evt: state.act_check_evt, emp_id: Vue.localStorage.get("emp_id") });
                dispatch('getCalculateService', Vue.localStorage.get("emp_id"));
            }
        }
    },
    selectGroupSalesService: ({ commit, state, dispatch }, value) => {
        commit('SET_EXPORT_SALE', "");
        commit('SET_SALES_LIST', [])
        if (value.mode != "all") {
            commit('SET_EXPORT_TEAM', value.mode.emp_id);
            commit('SET_CHECK_EVT', "group");
            commit('SET_SHOW_SELECT_GROUP', "");
            commit('SET_GROUP_SALES_SELECTED', value.mode);
            dispatch('getUserRoleIdService', value.mode.emp_id);
            dispatch('setSalesListService', value.mode.emp_id);
            for (let i = 0; i < state.act_group_sales_list.length; i++) {
                if (state.act_group_sales_list[i].status_check == "click") {
                    state.act_group_sales_list[i].status_check = "unclick";
                }
            }
            if (state.act_group_sales_list[value.index].status_check == "unclick") {
                state.act_group_sales_list[value.index].status_check = "click";
            }
        } else {
            commit('SET_EXPORT_TEAM', '');
            commit('SET_CHECK_EVT', "all");
            commit('SET_SHOW_SELECT_GROUP', "-bg-gray-group");
            commit('SET_GROUP_SALES_SELECTED', "");
            dispatch('getUserRoleIdService', Vue.localStorage.get("emp_id"));
            dispatch('setSalesListService', Vue.localStorage.get("emp_id"));
            for (let i = 0; i < state.act_group_sales_list.length; i++) {
                if (state.act_group_sales_list[i].status_check == "click") {
                    state.act_group_sales_list[i].status_check = "unclick";
                }
            }
        }
        commit('SET_GROUP_SALES_LIST', state.act_group_sales_list);
    },
    selectSalesService: ({ commit, state, dispatch }, value) => {
        commit('SET_EXPORT_SALE', value.items.emp_id);
        commit('SET_CHECK_EVT', "salesman");
        commit('SET_EMP_ID', value.items.emp_id);
        for (let i = 0; i < state.act_sales_list.length; i++) {
            if (state.act_sales_list[i].status_check == "click") {
                state.act_sales_list[i].status_check = "unclick";
            }
        }
        if (state.act_sales_list[value.index].status_check == "unclick") {
            state.act_sales_list[value.index].status_check = "click";
        }
        commit('SET_SALES_LIST', state.act_sales_list);
        commit('SET_SALES_SELECTED', value);
        dispatch('setCustomerListService', value.items.emp_id);
        dispatch('getCalculateService', value.items.emp_id);
        dispatch('getDetailOfSalesListService', { evt: state.act_check_evt, emp_id: value.items.emp_id });
    },
    searchSalesService: ({ commit, state }, param) => {
        let obj = [];
        if (param.length > 1) {
            for (var i = 0; i < state.act_sales_search.length; i++) {
                var str =
                    state.act_sales_search[i].last_name +
                    state.act_sales_search[i].first_name +
                    state.act_sales_search[i].status_label +
                    state.act_sales_search[i].status +
                    state.act_sales_search[i].department +
                    state.act_sales_search[i].emp_id;
                if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1)
                    obj.push(state.act_sales_search[i]);

                if (obj.length > 20) break;
            }
            commit('SET_SALES_LIST', obj);
        } else if (param.length == 0) {
            commit('SET_SALES_LIST', state.act_sales_search);
        }
    },
    delLableSalesListService: ({ commit, state }, value) => {
        checkinService.delLabelSales(value)
            .then((response) => {
                state.act_sales_list[value.index].id_activity = null;
                state.act_sales_list[value.index].tag_label_id = null;
                state.act_sales_list[value.index].status_label = null;
                commit('SET_SALES_LIST', state.act_sales_list);
            })
            .catch((error) => console.log('delLableSalesListService'));
    },
    saveLableSalesListService: ({ commit, state }, value) => {
        checkinService.saveLabelSales(value)
            .then((response) => {
                state.act_sales_list[value.index].tag_label_id = response.tag_label_id;
                state.act_sales_list[value.index].status_label = response.status_label;
                state.act_sales_list[value.index].id_activity = response.id;
                commit('SET_SALES_LIST', state.act_sales_list);
            })
            .catch((error) => console.log('saveLableSalesListService'));
    },
    setStatusPlanService: ({ commit, state, dispatch }, value) => {
        commit('SET_STATUSP_SELECTED', value);
        dispatch('getDetailOfSalesListService', { evt: state.act_check_evt, emp_id: state.act_emp_id });
    },
    getDetailOfSalesListService: ({ commit, state }, value) => {
        commit('SET_SHOW_SPINNER_LOADING', true);
        checkinService.getDetailOfSalesList(state, value.emp_id)
            .then((response) => {
                commit('SET_SHOW_SPINNER_LOADING', false);
                commit('SET_EMP_ID', value.emp_id);
                commit('SET_CHECK_EVT', value.evt);
                commit('SET_ACTIVITY_LIST', response);
            })
            .catch((error) => console.log('getDetailOfSalesListService'));
    },
    setTimeOfActivityService: ({ commit, state, dispatch }, value) => {
        commit('SET_DATE_SELECTED', value);
        commit('SET_TXT_DATE_SELECTED', value.timename);
        dispatch('getDetailOfSalesListService', { evt: state.act_check_evt, emp_id: state.act_emp_id });
        dispatch('getCalculateService', state.act_emp_id);
    },
    getDetailALlSalesListService: ({ commit, state }, value) => {
        commit('SET_SHOW_SPINNER_LOADING', true);
        checkinService.getDetailAllSalesList(state, Vue.localStorage.get("emp_id"))
            .then((response) => {
                commit('SET_SHOW_SPINNER_LOADING', false);
                commit('SET_ACTIVITY_LIST', response);
            })
            .catch((error) => console.log('getDetailALlSalesListService'));
    },
    setExportReportService: ({ commit, state }) => {
        let cust = "";
        let team = '';
        let sale = ''
        let type = 'team';
        console.log(state.act_customer_selected);
        if (state.act_customer_selected != "") {
            cust = state.act_customer_selected.id;
        }
        if (state.act_export_team == "") {
            team = Vue.localStorage.get("emp_id");
        } else {
            team = state.act_export_team;
        }

        if (state.act_export_sale == "") {
            sale = Vue.localStorage.get("emp_id");
        } else {
            type = 'salesman'
            sale = state.act_export_sale
        }

        if (Vue.localStorage.get("department") == 'SM') {
            type = 'salesman'
        }
        window.location.href = state.act_path_export_report + '?_date=' + state.act_date.value +
            '&customer_id=' + cust +
            '&customer_code=' + cust +
            '&emp_id=' + sale +
            '&status=' + state.act_statusp_selected +
            '&team=' + team +
            '&login=' + Vue.localStorage.get("emp_id") +
            '&type=' + type;
    },
};

const getters = {
    tag_lable: state => {
        return state.tag_lable;
    },
    show_progress_loading: state => {
        return state.show_progress_loading;
    },
    status_login: state => {
        return state.status_login;
    },
    act_count_visits: state => {
        return state.act_count_visits;
    },
    act_incomplete: state => {
        return state.act_incomplete;
    },
    act_unplanned: state => {
        return state.act_unplanned;
    },
    act_success_rate: state => {
        return state.act_success_rate;
    },
    act_shw_customer: state => {
        return state.act_shw_customer;
    },
    act_customer_selected: state => {
        return state.act_customer_selected;
    },
    act_customer_list: state => {
        return state.act_customer_list;
    },
    act_customer_search: state => {
        return state.act_customer_search;
    },
    act_group_sales_list: state => {
        return state.act_group_sales_list;
    },
    act_shw_select_group: state => {
        return state.act_shw_select_group;
    },
    act_check_evt: state => {
        return state.act_check_evt;
    },
    act_sales_selected: state => {
        return state.act_sales_selected;
    },
    act_group_sales_selected: state => {
        return state.act_group_sales_selected;
    },
    act_sales_list: state => {
        return state.act_sales_list;
    },
    act_statusp_selected: state => {
        return state.act_statusp_selected;
    },
    act_actvity_list: state => {
        return state.act_actvity_list;
    },
    act_date: state => {
        return state.act_date;
    },
    act_txt_cust_selected: state => {
        return state.act_txt_cust_selected;
    },
    act_emp_id: state => {
        return state.act_emp_id;
    },
    act_txt_date_selected: state => {
        return state.act_txt_date_selected;
    },
    act_time_list: state => {
        return state.act_time_list;
    },
    act_time_search: state => {
        return state.act_time_search;
    },
    act_shw_report: state => {
        return state.act_shw_report;
    },
    act_default_i18n: state => {
        return state.act_default_i18n;
    },
    act_shw_lable: state => {
        return state.act_shw_lable;
    },
    act_shw_menu_lable: state => {
        return state.act_shw_menu_lable;
    },
    act_level: state => {
        return state.act_level;
    },
    act_export_sale: state => {
        return state.act_export_sale;
    },
    act_export_team: state => {
        return state.act_export_team;
    },
    act_path_export_report: state => {
        return state.act_path_export_report;
    },
    show_spinner_loading: state => {
        return state.show_spinner_loading;
    },
    act_selected_sales_from_dsh: state => {
        return state.act_selected_sales_from_dsh;
    },
    act_email: state => {
        return state.act_email;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};