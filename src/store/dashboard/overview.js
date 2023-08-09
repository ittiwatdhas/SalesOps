import dashboardService from '../../services/dashboard/overview'
import checkinService from '../../services/activity/checkin'
import Vue from 'vue';

const state = {
    status_login: false,
    dsh_on_track: '0%',
    dsh_issue: '0%',
    dsh_in_active: '0%',
    dsh_sum_salesman: '0%',
    dsh_salesman_list: [],
    dsh_salesman_search: [],
    dsh_overall_sales: [],
    dsh_team_overviw: [],
    dsh_department: '',
    dsh_number_value_pa: [],
    dsh_number_value_p: [],
    dsh_selected_sales_to_act: '',
    dsh_team_by_sup: [],
    dsh_team_selected: [],
    dsh_tag_lable: [],
    all_tag_lable: [],
    act_shw_menu_team: '',
    act_shw_menu_overview: true,
    act_check_loaddata: true
};

const mutations = {
    'SET_SALESMAN_DSH_LIST'(state, value) {
        state.dsh_salesman_list = value;
    },
    'SET_DSH_TAG_LABLE'(state, value) {
        state.dsh_tag_lable = value;
    },
    'SET_ALL_TAG_LABLE'(state, value) {
        state.all_tag_lable = value;
    },
    'SET_SALESMAN_DSH_SEARCH'(state, value) {
        state.dsh_salesman_search = value;
    },
    'SET_NUMBER_VALUE_PA'(state, value) {
        state.dsh_number_value_pa = value;
    },
    'SET_NUMBER_VALUE_P'(state, value) {
        state.dsh_number_value_p = value;
    },
    'SET_DSH_SELECT_SALES_TO_ACT'(state, value) {
        state.dsh_selected_sales_to_act = value;
    },
    'SET_TEAM_SELECTED'(state, value) {
        state.dsh_team_selected = value;
    },
    'SET_DEPARTMENT'(state, value) {
        state.dsh_department = value;
    },
    'SET_SHOW_MENU_TEAM'(state, value) {
        state.act_shw_menu_team = value;
    },
    'SET_SHOW_MENU_OVERVIEW'(state, value) {
        state.act_shw_menu_overview = value;
    },
};

const actions = {
    setSaleActivityCoverageService: ({ commit, state }) => {
        dashboardService.getSaleActivityCoverage()
            .then((response) => {
                state.dsh_on_track = response.on_track
                state.dsh_issue = response.issue
                state.dsh_in_active = response.in_active
                state.dsh_sum_salesman = response.sum_salesman
                commit('SET_SALESMAN_DSH_LIST', response.data);
                commit('SET_SALESMAN_DSH_SEARCH', response.data);
            })
            .catch((error) => console.log('setSaleActivityCoverageService'));
    },
    getDshTagLableService: ({ commit, state }, value) => {
        dashboardService.getTagLabel(value)
            .then((response) => {
                state.dsh_tag_lable = [{ id: 0, taglabel: "", tagname: "View Activity Log", tagmodule: "DSH" }]
                for (var i = 0; i < response['DSH'].length; i++) {
                    state.dsh_tag_lable.push(response['DSH'][i])
                }
                commit('SET_DSH_TAG_LABLE', state.dsh_tag_lable);
                commit('SET_ALL_TAG_LABLE', response);
            })
            .catch((error) => console.log('getDshTagLableService'));
    },
    setOverallSalesActivityService: ({ commit, state }) => {
        dashboardService.getOverallSalesActivity()
            .then((response) => {
                state.act_check_loaddata = false
                state.dsh_overall_sales = response
            })
            .catch((error) => console.log('setOverallSalesActivityService'));
    },
    setTeamOverviewService: ({ commit, state }, value) => {
        dashboardService.getSaleTeamOverview(value)
            .then((response) => {
                let obj = {
                    team_id: response.team_userId,
                    team_name: response.team_name,
                    team_code: response.team_code,
                }
                commit('SET_TEAM_SELECTED', obj);
                state.dsh_team_overviw = response.data
                // state.dsh_department = response.department
                // if (state.dsh_department == 'SUP' || state.dsh_department == 'AM') {
                //     state.dsh_department = 'SUP';
                // }
            })
            .catch((error) => console.log('setTeamOverviewService'));
    },
    setNumberValueService: ({ commit, state, dispatch }, value) => {
        commit('SET_SHOW_PROGRESS_LOADING', true);
        dashboardService.getNumberValue()
            .then((response) => {
                state.dsh_number_value_pa = response.data_pa;
                state.dsh_number_value_p = response.data_p;
                let obj_pa = []
                let obj_p = []
                for (let i = 0; i < state.dsh_number_value_pa.length; i++) {
                    obj_pa.push(state.dsh_number_value_pa[i].value);
                }
                for (let i = 0; i < state.dsh_number_value_p.length; i++) {
                    obj_p.push(state.dsh_number_value_p[i].value);
                }
                commit('SET_NUMBER_VALUE_PA', obj_pa);
                commit('SET_NUMBER_VALUE_P', obj_p);
                if (state.dsh_number_value_pa.length > 0 || state.dsh_number_value_p.length > 0) {
                    dispatch("setDshGraphService", value);
                }
            })
            .catch((error) => console.log('setNumberValueService'));
    },
    searchActivityCoverageService: ({ commit, state }, param) => {
        let obj = [];
        if (param.length > 1) {
            for (var i = 0; i < state.dsh_salesman_search.length; i++) {
                var str =
                    state.dsh_salesman_search[i].last_name +
                    state.dsh_salesman_search[i].first_name +
                    state.dsh_salesman_search[i].status_label +
                    state.dsh_salesman_search[i].status +
                    state.dsh_salesman_search[i].comment +
                    state.dsh_salesman_search[i].emp_id;
                if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1)
                    obj.push(state.dsh_salesman_search[i]);

                // if (obj.length > 20) break;
            }
            commit('SET_SALESMAN_DSH_LIST', obj);
        } else if (param.length == 0) {
            commit('SET_SALESMAN_DSH_LIST', state.dsh_salesman_search);
        }
    },
    saveDshLableSalesListService: ({ commit, state }, value) => {
        checkinService.saveLabelSales(value)
            .then((response) => {
                state.dsh_salesman_list[value.index].tag_label_id = response.tag_label_id;
                state.dsh_salesman_list[value.index].status_label = response.status_label;
                state.dsh_salesman_list[value.index].id_activity = response.id;
                commit('SET_SALESMAN_DSH_LIST', state.dsh_salesman_list);
            })
            .catch((error) => console.log('saveLableSalesListService'));
    },
    setOverviewBYPositionService: ({ commit, state }) => {
        dashboardService.getOverviewBYPosition()
            .then((response) => {
                state.dsh_team_by_sup = response
            })
            .catch((error) => console.log('setOverviewBYPositionService'));
    },
    delDshLableSalesListService: ({ commit, state }, value) => {
        checkinService.delLabelSales(value)
            .then((response) => {
                state.dsh_salesman_list[value.index].id_activity = null;
                state.dsh_salesman_list[value.index].tag_label_id = null;
                state.dsh_salesman_list[value.index].status_label = null;
                commit('SET_SALESMAN_DSH_LIST', state.dsh_salesman_list);
            })
            .catch((error) => console.log('delDshLableSalesListService'));
    },
    setDshGraphService: ({ commit, state }, value) => {
        let dash = state.dsh_number_value_pa
        // let dash = [1000, 1500, 2500, 3500, 40]
        let dashMax = Math.max(...dash);
        let hGraph = 500
        let stepSize = 50
        if (dashMax > 0) {
            hGraph = dashMax + (dashMax * 0.25)
            stepSize = Math.floor(hGraph / 10)
        }
        Chart.plugins.register({
            afterDatasetsDraw: function (chart, easing) {
                var ctx = chart.ctx;
                chart.data.datasets.forEach(function (dataset, i) {
                    var meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element, index) {
                            var fontSize = 12;
                            var fontStyle = 'blod';
                            var fontFamily = 'Lato';
                            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                            var dataString = dataset.data[index].toString();
                            ctx.textAlign = 'center';
                            var padding = 10;
                            var position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                        });
                    }
                });
            }
        });
        value.mode.chart = new Chart(value.mode.$refs.chart, {
            type: "line",
            data: {
                labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                datasets: [
                    {
                        backgroundColor: '#FBC02D',
                        borderColor: '#FD7F00',
                        data: dash,
                        // data: state.dsh_number_value_pa,
                        fill: false,
                        borderWidth: 1,
                        xscales: false,
                    },
                ],
            },
            options: {
                responsive: true,
                title: false,
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: true,
                            drawOnChartArea: false,
                        },
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#CBCBCB',
                            fontSize: 12,
                            fontStyle: 'blod'
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            drawBorder: true,
                            drawOnChartArea: false
                        },
                        display: false,
                        ticks: {
                            min: 0,
                            // max: 500,
                            // stepSize: 50
                            max: hGraph,
                            stepSize: stepSize
                        }
                    }]
                },
                legend: {
                    display: false
                },
                elements: {
                    point: { radius: 0 },
                    line: { tension: 0 }
                },
            }
        })
        commit('SET_SHOW_PROGRESS_LOADING', false);
    },
};

const getters = {
    dsh_on_track: state => {
        return state.dsh_on_track;
    },
    dsh_issue: state => {
        return state.dsh_issue;
    },
    dsh_in_active: state => {
        return state.dsh_in_active;
    },
    dsh_sum_salesman: state => {
        return state.dsh_sum_salesman;
    },
    dsh_salesman_search: state => {
        return state.dsh_salesman_search;
    },
    dsh_salesman_list: state => {
        return state.dsh_salesman_list;
    },
    dsh_overall_sales: state => {
        return state.dsh_overall_sales;
    },
    dsh_team_overviw: state => {
        return state.dsh_team_overviw;
    },
    dsh_department: state => {
        return state.dsh_department;
    },
    dsh_number_value_pa: state => {
        return state.dsh_number_value_pa;
    },
    dsh_number_value_p: state => {
        return state.dsh_number_value_p;
    },
    dsh_selected_sales_to_act: state => {
        return state.dsh_selected_sales_to_act;
    },
    dsh_team_by_sup: state => {
        return state.dsh_team_by_sup;
    },
    dsh_team_selected: state => {
        return state.dsh_team_selected;
    },
    dsh_tag_lable: state => {
        return state.dsh_tag_lable;
    },
    all_tag_lable: state => {
        return state.all_tag_lable;
    },
    act_shw_menu_team: state => {
        return state.act_shw_menu_team;
    },
    act_shw_menu_overview: state => {
        return state.act_shw_menu_overview;
    },
    act_check_loaddata: state => {
        return state.act_check_loaddata;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};