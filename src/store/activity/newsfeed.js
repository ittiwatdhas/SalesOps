import Vue from 'vue';
import newsfeedService from '../../services/activity/newsfeed'
import checkinService from '../../services/activity/checkin'

const state = {
    io: {},
    newf_group_sales_list: '',
    newf_shw_select_group: 'active',
    newf_check_evt: 'all',
    newf_sales_selected: '',
    newf_group_sales_selected: '',
    newf_sales_list: '',
    newf_sales_search: '',
    newf_level: 0,
    newf_this: '',
    newf_promo_selected: [],
    newf_fb_selected: [],
    newf_dropdown_data: [],
    newf_detail_team: [],
    newf_snk: { vertical: 'top', horizontal: 'center', duration: 5000, txt_submit: 'Agree', txt_warning: '' },
    newf_post_selected: [],
    newf_data: [],
    newf_customer_selected: '',
    newf_customer_list: [],
    newf_customer_search: [],
    newf_show_customer: false,
    newf_txt_cust_selected: '',
    newf_emp_id: '',
    newf_head_id: '',
    newf_show_gallery: false,
    newf_gallery_img: [],
    newf_notification: [],
    newf_last_notification_id: [],
    default_sort_by: '',
    newf_notifiction_cfg: [],
    limit_data: 15, //fix
    start_data: [],
    show_newf_spinner_loading: false,
    newf_has_notification: false,
    newf_brand_selected: [],
    newf_this_brand: '',
    newf_first_post_id: '',
    newf_more_comments: {}, // เก็บตัวแปร คอมเม้น
    newf_expand_comments: {}, // เก็บการกด expand
    newf_temp: {}
};

const mutations = {
    setSocket: (state, socket) => {
        state.io = socket
    },
    // SOCKET_UPDATE_LIKE: (state,  message) => {
    //     console.log(message);
    // },
    // SOCKET_UPDATE_UNLIKE: (state,  message) => {
    //     console.log(message);
    // },
    'SET_NEWF_GROUP_SALES_LIST'(state, value) {
        state.newf_group_sales_list = value;
    },
    'SET_NEWF_SHOW_SELECT_GROUP'(state, value) {
        state.newf_shw_select_group = value;
    },
    'SET_NEWF_CHECK_EVT'(state, value) {
        state.newf_check_evt = value;
    },
    'SET_NEWF_GROUP_SALES_SELECTED'(state, value) {
        state.newf_group_sales_selected = value;
    },
    'SET_NEWF_SALES_SELECTED'(state, value) {
        state.newf_sales_selected = value;
    },
    'SET_NEWF_SALES_LIST'(state, value) {
        state.newf_sales_list = value;
    },
    'SET_NEWF_SALES_SEARCH'(state, value) {
        state.newf_sales_search = value;
    },
    'SET_NEWF_LEVEL'(state, value) {
        state.newf_level = value;
    },
    'SET_NEWF_THIS'(state, value) {
        state.newf_this = value;
    },
    'SET_NEWF_DROPDOWN_DATA'(state, value) {
        // value.label.forEach(function (val, key) {
        //     val.text = val.name
        //     val.children = val.item
        //     val.children.forEach(function (arr, index) {
        //         val.children[index].text = arr.name
        //     });
        // });
        state.newf_dropdown_data = value;
    },
    'SET_NEWF_POST_SELECTED'(state, value) {
        state.newf_post_selected = value;
    },
    'SET_NEWF_DATA'(state, value) {
        // state.newf_data = value;
        value.forEach(function (value, key) {
            state.newf_data.push(value);

            // คำนวนการแสดง คอมเมนต์
            let more_comment;

            if (state.newf_expand_comments['P' + value.head_id] == true)
                more_comment = 0;
            else
                more_comment = value.comment.length - 3;
            // ถ้ามีคอมเมนต์ ให้กำหนดเป็นปุ่ม expand
            if (value.comment.length == 0) {
                Vue.set(state.newf_expand_comments, 'P' + value.head_id, true);
                Vue.set(state.newf_more_comments, 'P' + value.head_id, 0);

            } else {
                Vue.set(state.newf_more_comments, 'P' + value.head_id, more_comment);
            }


        });

        //console.log(state.newf_more_comments);

    },
    'CLEAR_NEWF_DATA'(state, value) {
        state.newf_data = [];
        state.start_data = [];
        //state.start_data = value;
    },
    'SET_NEWF_CUSTOMER_SELECTED'(state, value) {
        state.newf_customer_selected = value;
    },
    'SET_NEWF_CUSTOMER_LIST'(state, value) {
        state.newf_customer_list = value;
    },
    'SET_NEWF_CUSTOMER_SEARCH'(state, value) {
        state.newf_customer_search = value;
    },
    'SET_NEWF_SHOW_CUSTOMER'(state, value) {
        state.newf_show_customer = value;
    },
    'SET_NEWF_TXT_CUST_SELECTED'(state, value) {
        state.newf_txt_cust_selected = value;
    },
    'SET_NEWF_EMP_ID'(state, value) {
        state.newf_emp_id = value;
    },
    'SET_NEWF_HEAD_ID'(state, value) {
        state.newf_head_id = value;
    },
    'SET_NEWF_PROMO_SELECTED'(state, value) {
        state.newf_promo_selected = value;
    },
    'SET_NEWF_FB_SELECTED'(state, value) {
        state.newf_fb_selected = value;
    },
    'SET_NEWF_SHOW_GALLERY'(state, value) {
        state.newf_show_gallery = value;
    },
    'SET_NEWF_GALLERY_IMG'(state, value) {
        state.newf_gallery_img = value;
    },
    'SET_NEWF_NOTIFICATION'(state, value) {
        state.newf_notification = value;
    },
    'REMOVE_NEWF_NOTIFICATION'(state, index) {
        state.newf_notification.data.splice(index, 1)
    },
    'UPDATE_NEWF_NOTIFICATION'(state, index) {
        state.newf_notification.data[index].status_readed = 1;
    },
    'ADD_NEWF_NOTIFICATION'(state, value) {
        value.data.forEach(function (value, key) {
            state.newf_notification.data.push(value);
        });

        //state.newf_notification.data
        //state.newf_notification.data.push(value.data);

        // console.log( state.newf_notification.data);
    },
    'ADD_LAST_NOTIFICATION_ID'(state, value) {
        state.newf_last_notification_id.push(value);
    },
    'CLEAR_LAST_NOTIFICATION_ID'(state, value) {
        state.newf_last_notification_id = [];
    },
    'SHOW_NEWF_LOADING'(state, value) {
        state.show_newf_spinner_loading = value;
    },
    'SET_NEWF_HAS_NOTIFICATION'(state, value) {
        state.newf_has_notification = value;
    },
    'ADD_NEW_NOTIFICATION'(state, value) {
        state.newf_notification.data.unshift(value);
        //console.log(value);
    },
    'SET_NEWF_BRAND_SELECTED'(state, value) {
        state.newf_brand_selected = value;
    },
    'SET_NEWF_THIS_BRAND'(state, value) {
        state.newf_this_brand = value;
    },
    'SET_NEWF_FIRST_POST_ID'(state, value) {
        state.newf_first_post_id = value;
    },
    'SET_NEWF_MORE_COMMENTS'(state, value) {

        //state.newf_more_comments.push();

        Vue.set(state.newf_more_comments, 'P' + value, 0);


        //Object.assign({}, state.newf_more_comments)
        // console.log(state.newf_more_comments);
    },
    'SET_NEWF_EXPAND_COMMENTS'(state, value) {
        // เก็บค่าการกดปุ่ม view more comment

        state.newf_expand_comments[value] = true;
        //console.log(value)
    },
    'UPDATE_NEWF_BY_ID'(state, value) {
        state.newf_data[value.post_id] = value.data;
    }
};

const actions = {
    otherAction: (context, type) => {
        return true;
    },
    socket_updateNewpost: (context, message) => {
        // console.log('new post', message[0]);
        let data = message[0];

        let group_sale = Vue.localStorage.get("group_emp_id");

        let n = group_sale.indexOf(data.emp_id);

        if (n > -1) {
            context.dispatch("getNewPost", data.post_id);
            //console.log('update new post');
        } else {
            //console.log('no update');
        }
        //context.dispatch("getNewsfeedByHeadId", data.post_id);
    },
    socket_updateLike: (context, message) => {
        //console.log('like', message[0]);
        let data = message[0];
        context.dispatch("getNewsfeedByHeadId", data.post_id);
    },
    socket_updateUnlike: (context, message) => {
        //console.log('unlike', message[0]);
        let data = message[0];
        context.dispatch("getNewsfeedByHeadId", data.post_id)
    },
    socket_updateComment: (context, message) => {
        //console.log('unlike', message[0]);
        let data = message[0];
        context.dispatch("getNewsfeedByHeadId", data.post_id)
    },
    socket_updateShared: (context, message) => {
        //console.log('unlike', message[0]);
        let data = message[0];
        context.dispatch("getNewsfeedByHeadId", data.post_id)
    },
    setGroupSalesListNewfService: ({ commit, state }, value) => {
        checkinService.getByGroups()
            .then((response) => {
                commit('SET_NEWF_GROUP_SALES_LIST', response.data);
            })
            .catch((error) => console.log('setGroupSalesListNewfService'));
    },
    setMasterNewsfeedService: ({ commit, state }) => {
        state.newf_data = [];
        state.start_data = [];
        newsfeedService.getMasterNewsfeed()
            .then((response) => {
                /*         console.log("setMasterNewsfeedService");
                        console.log(response.sort_by); */
                for (var i = 0; i < response.sort_by.length; i++) {
                    if (response.sort_by[i].taglabel == "RECENT") {
                        state.newf_this.id_sort_by = response.sort_by[i].id
                        this.default_sort_by = response.sort_by[i].id
                    }
                }

                // console.log(response);
                commit("SET_NEWF_DROPDOWN_DATA", response)
                commit("SET_NEWF_CUSTOMER_SEARCH", response['customer'])
            })
            .catch((error) => console.log('setMasterNewsfeedService'));
    },
    getNewsfeedByIDService: ({ commit, state }, value) => {

        newsfeedService.getNewsfeedByID(value)
            .then((response) => {

                // console.log(state.newf_data);

                commit('SET_NEWF_DATA', response);

                // console.log(state.newf_data);

                commit('SET_SHOW_PROGRESS_LOADING', false);
                commit('SHOW_NEWF_LOADING', false);

            })
            .catch((error) => {
                console.log('error ', error);
                commit('SET_SHOW_PROGRESS_LOADING', false);
                commit('SHOW_NEWF_LOADING', false);
            });
    },

    getNewsfeedService: ({ commit, state }, value) => {
        let promo = '';
        let feedback = '';
        let count_first_post = 0;

        if (state.newf_promo_selected.length != 0) {
            for (let i = 0; i < state.newf_promo_selected.length; i++) {
                promo = state.newf_promo_selected[i].id + ',' + promo
            }
        } else {
            promo = '0,'
        }
        if (state.newf_fb_selected.length != 0) {
            for (let i = 0; i < state.newf_fb_selected.length; i++) {
                feedback = state.newf_fb_selected[i].id + ',' + feedback
            }
        } else {
            feedback = '0,'
        }

        if (state.newf_first_post_id != '') {
            count_first_post = 1;
        }

        // console.log(state.start_data);


        if (state.start_data.includes(state.newf_data.length)) {
            commit('SHOW_NEWF_LOADING', false);
            return;
        } else if (value == " " || value == null) {
            commit('SHOW_NEWF_LOADING', false);
            return;

        } else {
            state.start_data.push(state.newf_data.length)
        }

        let rs_brand = '0,';
        if (state.newf_brand_selected.length > 0) {
            for (let i = 0; i < state.newf_brand_selected.length; i++) {
                rs_brand = state.newf_brand_selected[i].id + ',' + rs_brand
            }
            (rs_brand == '') ? 0 : rs_brand
        }
        let obj = {
            saleman: value,
            sort_by: state.newf_this.id_sort_by,
            location: state.newf_this.id_location,
            brand: rs_brand.slice(0, rs_brand.length - 1),
            // brand: state.newf_this.id_brand,
            promotion: promo.slice(0, promo.length - 1),
            feedback: feedback.slice(0, feedback.length - 1),
            start: (state.newf_data.length == 0) ? state.newf_data.length : state.newf_data.length - count_first_post,
            limit: state.limit_data,
            first_post_id: state.newf_first_post_id
        }
        commit('SET_SHOW_PROGRESS_LOADING', true);
        newsfeedService.getNewsfeed(obj)
            .then((response) => {

                commit('SET_NEWF_DATA', response);
                commit('SET_SHOW_PROGRESS_LOADING', false);
                commit('SHOW_NEWF_LOADING', false);

            })
            .catch((error) => {
                // console.log('getNewsfeed')
                commit('SET_SHOW_PROGRESS_LOADING', false);
                commit('SHOW_NEWF_LOADING', false);


            });
    },
    setSalesListNewfService: ({ commit, state }, value) => {
        commit('SET_SHOW_PROGRESS_LOADING', true);
        checkinService.getByGroupsSales(value)
            .then((response) => {
                commit('SET_NEWF_SALES_SEARCH', response);
                commit('SET_NEWF_SALES_LIST', response);
                commit('SET_SHOW_PROGRESS_LOADING', false);
            })
            .catch((error) => console.log('setSalesListNewfService'));
    },
    selectGroupNewsfSalesService: ({ commit, state, dispatch }, value) => {
        state.newf_data = [];
        state.start_data = [];
        commit('SET_NEWF_SALES_LIST', [])
        if (value.mode != "all") {
            dispatch('getUserRoleIdNewfService', value.mode.emp_id);
            commit('SET_NEWF_CHECK_EVT', "group");
            commit('SET_NEWF_SHOW_SELECT_GROUP', "");
            commit('SET_NEWF_GROUP_SALES_SELECTED', value.mode);
            dispatch('setSalesListNewfService', value.mode.emp_id);
            for (let i = 0; i < state.newf_group_sales_list.length; i++) {
                if (state.newf_group_sales_list[i].status_check == "click") {
                    state.newf_group_sales_list[i].status_check = "unclick";
                }
            }
            if (state.newf_group_sales_list[value.index].status_check == "unclick") {
                state.newf_group_sales_list[value.index].status_check = "click";
            }
        } else {
            dispatch('getUserRoleIdNewfService', Vue.localStorage.get("emp_id"));
            commit('SET_NEWF_CHECK_EVT', "all");
            commit('SET_NEWF_SHOW_SELECT_GROUP', "-bg-gray-group");
            commit('SET_NEWF_GROUP_SALES_SELECTED', "");
            dispatch('setSalesListNewfService', Vue.localStorage.get("emp_id"));
            for (let i = 0; i < state.newf_group_sales_list.length; i++) {
                if (state.newf_group_sales_list[i].status_check == "click") {
                    state.newf_group_sales_list[i].status_check = "unclick";
                }
            }
        }
        commit('SET_NEWF_GROUP_SALES_LIST', state.newf_group_sales_list);
    },
    selectSalesNewsfService: ({ commit, state, dispatch }, value) => {
        state.newf_data = [];
        state.start_data = [];

        commit('SET_NEWF_CHECK_EVT', "salesman");
        for (let i = 0; i < state.newf_sales_list.length; i++) {
            if (state.newf_sales_list[i].status_check == "click") {
                state.newf_sales_list[i].status_check = "unclick";
            }
        }
        if (state.newf_sales_list[value.index].status_check == "unclick") {
            state.newf_sales_list[value.index].status_check = "click";
        }
        commit('SET_NEWF_SALES_LIST', state.newf_sales_list);
        commit('SET_NEWF_SALES_SELECTED', value);
        dispatch('getNewsfeedService', value.items.emp_id)
    },
    searchSalesNewsfService: ({ commit, state }, param) => {
        let obj = [];
        if (param.length > 1) {
            for (var i = 0; i < state.newf_sales_search.length; i++) {
                var str =
                    state.newf_sales_search[i].last_name +
                    state.newf_sales_search[i].first_name +
                    state.newf_sales_search[i].status_label +
                    state.newf_sales_search[i].status +
                    state.newf_sales_search[i].department +
                    state.newf_sales_search[i].emp_id;
                if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1)
                    obj.push(state.newf_sales_search[i]);

                if (obj.length > 20) break;
            }
            commit('SET_NEWF_SALES_LIST', obj);
        } else if (param.length == 0) {
            commit('SET_NEWF_SALES_LIST', state.newf_sales_search);
        }
    },
    clearFilterNewsfService: ({ commit, state, dispatch }) => {
        state.newf_data = [];
        state.start_data = [];
        state.newf_this.id_sort_by = this.default_sort_by;
        state.newf_this.id_location = 0;
        state.newf_this.id_feedback = 0;
        state.newf_this_brand.dp_value = 'ALL';
        state.newf_brand_selected = [];
        // state.newf_this.id_brand = 0;
        state.newf_this.id_promotion = 0;
        state.newf_promo_selected = [];
        state.newf_fb_selected = [];

        state.newf_this_brand.data_select = [];
        state.newf_this_brand.chkHeadIn = true;
        state.newf_this_brand.chkHeadOut = true;

        for (let i = 0; i < state.newf_dropdown_data.brand_internal.length; i++) {
            state.newf_this_brand.data_select.push(state.newf_dropdown_data.brand_internal[i]);
            state.newf_dropdown_data.brand_internal[i].checked = true;
        }
        for (let i = 0; i < state.newf_dropdown_data.brand_external.length; i++) {
            state.newf_this_brand.data_select.push(state.newf_dropdown_data.brand_external[i]);
            state.newf_dropdown_data.brand_external[i].checked = true;
        }

        // console.log(state.newf_this_brand.data_select);

        if (state.newf_level == 1) {
            if (state.newf_check_evt != 'salesman') {
                dispatch("getNewsfeedService", state.newf_detail_team.emp_id);
            } else {
                dispatch("getNewsfeedService", state.newf_sales_selected.items.emp_id);
            }
        } else {
            dispatch("getNewsfeedService", state.newf_emp_id);
        }
    },
    filtersNewsfService: ({ commit, state, dispatch }, value) => {
        state.newf_data = [];
        state.start_data = [];
        if (value.type == 'promotion' && value.rows.name != 'Selected') {
            if (state.newf_promo_selected.length == 0) {
                state.newf_promo_selected.push(value.rows)
                if (state.newf_level == 1) {
                    if (state.newf_check_evt != 'salesman') {
                        dispatch("getNewsfeedService", state.newf_detail_team.emp_id)
                    } else {
                        dispatch("getNewsfeedService", state.newf_sales_selected.items.emp_id)
                    }
                } else {
                    dispatch("getNewsfeedService", state.newf_emp_id)
                }
            } else {
                let check_id = true
                for (let i = 0; i < state.newf_promo_selected.length; i++) {
                    if (state.newf_promo_selected[i].id === value.rows.id) {
                        check_id = false
                        state.newf_snk.txt_submit = 'Agree'
                        state.newf_snk.txt_warning = value.rows.name + ' is already selected'
                        state.newf_this.$refs.newf_snackbar.open();
                        break;
                    }
                }
                if (check_id == true) {
                    state.newf_promo_selected.push(value.rows)
                    if (state.newf_level == 1) {
                        if (state.newf_check_evt != 'salesman') {
                            dispatch("getNewsfeedService", state.newf_detail_team.emp_id)
                        } else {
                            dispatch("getNewsfeedService", state.newf_sales_selected.items.emp_id)
                        }
                    } else {
                        dispatch("getNewsfeedService", state.newf_emp_id)
                    }
                }
            }
        } else
            if (value.type == 'newsfeed' && value.rows.name != 'Selected') {
                if (state.newf_fb_selected.length == 0) {
                    state.newf_fb_selected.push(value.rows)
                    if (state.newf_level == 1) {
                        if (state.newf_check_evt != 'salesman') {
                            dispatch("getNewsfeedService", state.newf_detail_team.emp_id)
                        } else {
                            dispatch("getNewsfeedService", state.newf_sales_selected.items.emp_id)
                        }
                    } else {
                        dispatch("getNewsfeedService", state.newf_emp_id)
                    }
                } else {
                    let check_id = true
                    for (let i = 0; i < state.newf_fb_selected.length; i++) {
                        if (state.newf_fb_selected[i].id === value.rows.id) {
                            check_id = false
                            state.newf_snk.txt_submit = 'Agree'
                            state.newf_snk.txt_warning = value.rows.name + ' is already selected'
                            state.newf_this.$refs.newf_snackbar.open();
                            break;
                        }
                    }
                    if (check_id == true) {
                        state.newf_fb_selected.push(value.rows)
                        if (state.newf_level == 1) {
                            if (state.newf_check_evt != 'salesman') {
                                dispatch("getNewsfeedService", state.newf_detail_team.emp_id)
                            } else {
                                dispatch("getNewsfeedService", state.newf_sales_selected.items.emp_id)
                            }
                        } else {
                            dispatch("getNewsfeedService", state.newf_emp_id)
                        }
                    }
                }
            } else {
                if (state.newf_level == 1) {
                    if (state.newf_check_evt != 'salesman') {
                        dispatch("getNewsfeedService", state.newf_detail_team.emp_id)
                    } else {
                        dispatch("getNewsfeedService", state.newf_sales_selected.items.emp_id)
                    }
                } else {
                    dispatch("getNewsfeedService", state.newf_emp_id)
                }
            }
    },
    delPromoNewfService: ({ commit, state, dispatch }, value) => {
        if (value.chip != '') {
            if (value.mode == 'feedback') {
                state.newf_fb_selected.splice(value.index, 1);
                if (state.newf_fb_selected.length == 0) {
                    state.newf_this.id_feedback = 0;
                }
            } else {
                state.newf_promo_selected.splice(value.index, 1);
                state.newf_post_selected.splice(value.index, 1);
                if (state.newf_post_selected.length == 0) {
                    state.newf_this.id_promotion = 0;
                }
            }
            if (value.layout == 'page') {
                commit('SET_NEWF_FIRST_POST_ID', '');
                commit('CLEAR_NEWF_DATA', []);
                dispatch('getNewsfeedService', Vue.localStorage.get("emp_id"))
            }
        }
    },
    closeSnkService: ({ commit, state }, value) => {
        state.newf_this.$refs.newf_snackbar.close();
    },
    getUserRoleIdNewfService: ({ commit, state, dispatch }, value) => {
        commit('SET_NEWF_EMP_ID', value);
        checkinService.getUserRoleId(value)
            .then((response) => {
                state.newf_detail_team = response
                if (response.emp_id != "") {
                    Vue.localStorage.set('group_emp_id', response.emp_id);
                    dispatch('getNewsfeedService', response.emp_id);
                } else {
                    Vue.localStorage.set('group_emp_id', value);
                    dispatch('getNewsfeedService', value);
                }
            })
            .catch((error) => console.log('getUserRoleIdNewfService'));
    },
    addLableNewsf: ({ commit, state, dispatch }, value) => {
        // console.log("addLableNewsf => ", value);
        if (value.type == 'head' && value.rows.name != 'Selected') {
            if (state.newf_post_selected.length == 0) {
                state.newf_post_selected.push(value.rows)
            } else {
                let check_id = true
                for (let i = 0; i < state.newf_post_selected.length; i++) {
                    if (state.newf_post_selected[i].code === value.rows.code) {
                        check_id = false
                        state.newf_snk.txt_submit = 'Agree'
                        state.newf_snk.txt_warning = value.rows.name + ' is already selected'
                        state.newf_this.$refs.newf_snackbar.open();
                        break;
                    }
                }
                if (check_id == true) {
                    state.newf_post_selected.push(value.rows)
                }
            }
        } else {
            let rs = state.newf_dropdown_data.label[2].item
            if (state.newf_post_selected.length == 0 && value.type != 'all_dhas' && value.type != 'all_comp') {
                state.newf_post_selected.push(value.rows)
            } else if (value.type == 'all_dhas' && state.newf_post_selected.length == 0) {
                for (let i = 0; i < rs.length; i++) {
                    if (rs[i].external == 0) {
                        state.newf_post_selected.push(rs[i])
                    }
                }
            } else if (value.type == 'all_dhas' && state.newf_post_selected.length > 0) {
                let check_id = true
                let obj = []
                for (let i = 0; i < state.newf_post_selected.length; i++) {
                    if (state.newf_post_selected[i].hasOwnProperty("parent_code")
                        && state.newf_post_selected[i].parent_code == 3
                        && state.newf_post_selected[i].external == 0
                    ) {
                        //add condition
                    } else {
                        obj.push(state.newf_post_selected[i])
                    }
                }
                for (let i = 0; i < rs.length; i++) {
                    if (rs[i].external == 0) {
                        obj.push(rs[i])
                    }
                }
                state.newf_post_selected = obj
            } else if (value.type == 'all_comp' && state.newf_post_selected.length == 0) {
                for (let i = 0; i < rs.length; i++) {
                    if (rs[i].external == 1) {
                        state.newf_post_selected.push(rs[i])
                    }
                }
            } else if (value.type == 'all_comp' && state.newf_post_selected.length > 0) {
                let check_id = true
                let obj = []
                for (let i = 0; i < state.newf_post_selected.length; i++) {
                    if (state.newf_post_selected[i].hasOwnProperty("parent_code")
                        && state.newf_post_selected[i].parent_code == 3
                        && state.newf_post_selected[i].external == 1
                    ) {
                        //add condition
                    } else {
                        obj.push(state.newf_post_selected[i])
                    }
                }
                for (let i = 0; i < rs.length; i++) {
                    if (rs[i].external == 1) {
                        obj.push(rs[i])
                    }
                }
                state.newf_post_selected = obj
            } else {
                let check_id = true
                for (let i = 0; i < state.newf_post_selected.length; i++) {
                    if (state.newf_post_selected[i].code === value.rows.code) {
                        check_id = false
                        state.newf_snk.txt_submit = 'Agree'
                        state.newf_snk.txt_warning = value.rows.name + ' is already selected'
                        state.newf_this.$refs.newf_snackbar.open();
                        break;
                    }
                }
                if (check_id == true) {
                    state.newf_post_selected.push(value.rows)
                }
            }
        }
        state.newf_this.opsDP = false;
    },
    searchCustomerNewfService: ({ commit, state, dispatch }, param) => {
        let obj = [];
        if (param.length > 0) {
            /*
            for (var i = 0; i < state.newf_customer_search.length; i++) {
                var str =
                    state.newf_customer_search[i].name +
                    state.newf_customer_search[i].name +
                    state.newf_customer_search[i].code;
                if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1)
                    obj.push(state.newf_customer_search[i]);
                if (obj.length > 20) break;
            }
            */

            newsfeedService.searchCustomer(param)
                .then((response) => {
                    obj = response;

                    if (response.length > 0) {

                        commit('SET_NEWF_CUSTOMER_SELECTED', "");
                        commit('SET_NEWF_SHOW_CUSTOMER', true);
                        commit('SET_NEWF_CUSTOMER_LIST', obj);
                    } else {
                        commit('SET_NEWF_CUSTOMER_LIST', state.newf_customer_search);
                        commit('SET_NEWF_CUSTOMER_SELECTED', []);
                        commit('SET_NEWF_SHOW_CUSTOMER', false);
                    }

                })
                .catch((error) => console.log('get customer error'));

        } else if (param.length == 0) {
            commit('SET_NEWF_CUSTOMER_LIST', state.newf_customer_search);
            commit('SET_NEWF_CUSTOMER_SELECTED', []);
            commit('SET_NEWF_SHOW_CUSTOMER', false);
        }
    },
    selectCustomerNewfService: ({ commit, state, dispatch }, value) => {
        commit('SET_NEWF_SHOW_CUSTOMER', false);
        commit('SET_NEWF_CUSTOMER_SELECTED', value);
        commit('SET_NEWF_TXT_CUST_SELECTED', value.code + " : " + value.name);
    },
    savePostNewsfService: ({ commit, state, dispatch }, value) => {
        state.newf_data = [];
        state.start_data = [];
        commit('SET_SHOW_PROGRESS_LOADING', true);
        let customer_selected = '';
        let link_path = '';
        if (state.newf_customer_selected != '') {
            customer_selected = state.newf_customer_selected.code;
        }
        if (value.link_path.length != 0) {
            link_path = value.link_path;
        }
        let obj = {
            cust_code: customer_selected,
            detail: value.detail,
            label_code: state.newf_post_selected,
            link_path: link_path
        }
        newsfeedService.saveNewFeed(obj)
            .then((response) => {

                let post_id = response.body.post_id;

                state.io.emit('newpost', { 'emp_id': Vue.localStorage.get("emp_id"), 'post_id': post_id });

                if (state.newf_level == 1) {
                    if (state.newf_check_evt != 'salesman') {
                        dispatch("getNewsfeedService", state.newf_detail_team.emp_id)
                    } else {
                        dispatch("getNewsfeedService", state.newf_sales_selected.items.emp_id)
                    }
                } else {
                    dispatch("getNewsfeedService", state.newf_emp_id)
                }
                commit('SET_SHOW_PROGRESS_LOADING', false);
            })
            .catch((error) => console.log('saveNewFeed'));
    },
    commentBlogNewsfService({ commit, state }, value) {
        //  if(state.newf_head_id == value.head_id){
        //     if (state.newf_this.inactiveMainComment == 'hide-tag') {
        //         state.newf_this.inactiveMainComment = 'show-tag';
        //         commit('SET_NEWF_HEAD_ID', value.head_id);

        //     }
        //     else {
        //         state.newf_this.inactiveMainComment = 'hide-tag';
        //     }
        // }else{
        //     commit('SET_NEWF_HEAD_ID', value.head_id);
        //     state.newf_this.inactiveMainComment = 'show-tag';
        // }

    },

    addCommentNewsfService: ({ commit, state, dispatch }, value) => {
        if (state.newf_this.comment == "") {
            state.newf_snk.txt_warning = 'Please input comment !'
            state.newf_this.$refs.newf_snackbar.open();
            return;
        }

        commit('SET_SHOW_PROGRESS_LOADING', true);

        for (var i = 0; i < state.newf_data.length; i++) {
            if (state.newf_data[i].head_id == value.head_id) {
                let count_comment = state.newf_data[i].comment.length
                state.newf_data[i].comment[count_comment] = {
                    comment: state.newf_this.comment,
                    commentator: Vue.localStorage.get('first_name') + " " + Vue.localStorage.get('last_name'),
                    id: " "
                }
                state.newf_data[i].count_coment++
                break;

            }

        }

        state.io.emit('comment', { emp_id: Vue.localStorage.get("emp_id"), post_id: value.head_id });

        // commit('SET_NEWF_DATA', state.newf_data);

        let obj = {
            head_id: value.head_id,
            comment: state.newf_this.comment
        }
        state.newf_this.comment = '';
        newsfeedService.saveComment(obj)
            .then((response) => {

                state.io.emit('comment', { emp_id: Vue.localStorage.get("emp_id"), post_id: value.head_id });
                /*   if (state.newf_level == 1) {
                      if (state.newf_check_evt != 'salesman') {
                          dispatch("getNewsfeedService", state.newf_detail_team.emp_id)
                      } else {
                          dispatch("getNewsfeedService", state.newf_sales_selected.items.emp_id)
                      }
  
                      // expand เมื่อ comment
                      // state.newf_more_comments[value.head_id] = 0;
                  } else {
                      dispatch("getNewsfeedService", state.newf_emp_id)
                  } */
                if (state.newf_level == 1) {
                    if (state.newf_check_evt != 'salesman') {
                        dispatch("getNewsfeedByHeadId", value.head_id)
                    } else {
                        dispatch("getNewsfeedByHeadId", value.head_id)
                    }
                } else {
                    dispatch("getNewsfeedByHeadId", value.head_id)
                }
                commit('SET_SHOW_PROGRESS_LOADING', false);
                state.newf_this.comment = '';
                //console.log(state.newf_this.comment);
            })
            .catch((error) => console.log('saveNewFeed'));
    },
    likeShareNewsfService: ({ commit, state, dispatch }, value) => {
        commit('SET_SHOW_PROGRESS_LOADING', true);
        for (var i = 0; i < state.newf_data.length; i++) {
            if (value.type == 'L') {

                //console.log(this);

                //(new Vue()).$socket.emit('like', { emp_id: Vue.localStorage.get("emp_id") })
                //state.io.emit('like', { emp_id: Vue.localStorage.get("emp_id"), post_id: value.head_id });


                if (state.newf_data[i].head_id == value.head_id) {
                    if (state.newf_data[i].status_like == 'like') {
                        state.newf_data[i].status_like = 'unlike';
                        state.newf_data[i].count_like--;
                        //state.io.emit('unlike', { emp_id: Vue.localStorage.get("emp_id"), post_id: value.head_id });

                    } else {
                        state.newf_data[i].status_like = 'like';
                        state.newf_data[i].count_like++;

                    }
                    break;
                }
                // state.io.emit('like', { emp_id: Vue.localStorage.get("emp_id"), post_id: value.head_id });

            }
            else if (value.type == 'S') {


                if (state.newf_data[i].head_id == value.head_id) {
                    state.newf_data[i].count_share++;

                    let count_comment = state.newf_data[i].comment.length
                    state.newf_data[i].comment[count_comment] = {
                        comment: "Shared to " + value.share_name,
                        commentator: Vue.localStorage.get('first_name') + " " + Vue.localStorage.get('last_name'),
                        id: " "
                    }
                    state.newf_data[i].count_coment++


                    break;
                }

            }
        }

        // commit('SET_NEWF_DATA', state.newf_data);
        let share_to = ""
        if (value.share_to != null || value.share_to != '') {
            share_to = value.share_to
        }
        let obj = {
            head_id: value.head_id,
            type: value.type,
            status: value.status,
            share_to: share_to
        }
        newsfeedService.saveLikeShare(obj)
            .then((response) => {

                if (obj.type == 'L') {
                    state.io.emit('like', { emp_id: Vue.localStorage.get("emp_id"), post_id: value.head_id });
                } else if (obj.type == 'S') {
                    state.io.emit('shared', { emp_id: Vue.localStorage.get("emp_id"), post_id: value.head_id });
                }


                // }else if(obj.status == 'S'){
                //     state.io.emit('shared', { emp_id: Vue.localStorage.get("emp_id"), post_id: value.head_id });
                // }
                //console.log(response);
                /* if (state.newf_level == 1) {
                    if (state.newf_check_evt != 'salesman') {
                        dispatch("getNewsfeedService", state.newf_detail_team.emp_id)
                    } else {
                        dispatch("getNewsfeedService", state.newf_sales_selected.items.emp_id)
                    }
                } else {
                    dispatch("getNewsfeedService", state.newf_emp_id)
                } */
                if (state.newf_level == 1) {
                    if (state.newf_check_evt != 'salesman') {
                        dispatch("getNewsfeedByHeadId", value.head_id)
                    } else {
                        dispatch("getNewsfeedByHeadId", value.head_id)
                    }
                } else {
                    dispatch("getNewsfeedByHeadId", value.head_id)
                }

                commit('SET_SHOW_PROGRESS_LOADING', false);
            })
            .catch((error) => console.log('saveLikeShare'));
    },
    setMasterNotification: ({ commit, state }) => {
        newsfeedService.getNotification()
            .then((response) => {
                commit("SET_NEWF_NOTIFICATION", response)
                commit("CLEAR_LAST_NOTIFICATION_ID", []);
            })
            .catch((error) => console.log('setMasterNotification'));
    },
    getNewsfeedOnScroll: ({ commit, state, dispatch }) => {
        commit('SHOW_NEWF_LOADING', true);
        if (state.newf_level == 1) {
            if (state.newf_check_evt != 'salesman') {
                dispatch("getNewsfeedService", state.newf_detail_team.emp_id);
            } else {
                dispatch("getNewsfeedService", state.newf_sales_selected.items.emp_id);
            }
        } else {
            dispatch("getNewsfeedService", state.newf_emp_id);
        }
    },

    // realtime get new post
    getNewPost: ({ commit, state }, value) => {
        newsfeedService.getNewsfeedByID(value)
            .then((response) => {

                if (response.length > 0) {
                    let data = response[0];
                    state.newf_data.unshift(response[0]);

                    state.newf_expand_comments[data.head_id] = true;
                    state.newf_more_comments[data.head_id] = 0;
                    //state.newf_data[data.head_id] = state.newf_data[0];
                }



                //     for (var i = 0; i < state.newf_data.length; i++) {
                //         if (state.newf_data[i].head_id == value) {

                //             let data =  response[0];
                //             // state.newf_data[i] = []
                //            // state.newf_data[i] = response[0];

                //             state.newf_data[i].count_like = data.count_like;
                //             state.newf_data[i].count_share = data.count_share;
                //             state.newf_data[i].count_coment = data.count_coment;

                //             state.newf_data[i].comment = data.comment;


                //             //let val = {post_id:value, data:response[0]};

                //             //commit('UPDATE_NEWF_BY_ID',val);

                //             //console.log(state.newf_data[i]);
                //             console.log(data);
                //             // console.log(state.newf_data);
                //             break;

                //         }

                //     }
                // }

                // commit('SET_NEWF_DATA', response);
                commit('SET_SHOW_PROGRESS_LOADING', false);
                commit('SHOW_NEWF_LOADING', false);

            })
            .catch((error) => {
                console.log('error ', error);
                commit('SET_SHOW_PROGRESS_LOADING', false);
                commit('SHOW_NEWF_LOADING', false);
            });
    },

    getNewsfeedByHeadId: ({ commit, state }, value) => {

        newsfeedService.getNewsfeedByID(value)
            .then((response) => {

                if (response.length > 0) {



                    for (var i = 0; i < state.newf_data.length; i++) {
                        if (state.newf_data[i].head_id == value) {

                            let data = response[0];
                            // state.newf_data[i] = []
                            // state.newf_data[i] = response[0];

                            state.newf_data[i].count_like = data.count_like;
                            state.newf_data[i].count_share = data.count_share;
                            state.newf_data[i].count_coment = data.count_coment;

                            state.newf_data[i].comment = data.comment;


                            //let val = {post_id:value, data:response[0]};

                            //commit('UPDATE_NEWF_BY_ID',val);

                            //console.log(state.newf_data[i]);
                            console.log(data);
                            // console.log(state.newf_data);
                            break;

                        }

                    }

                    // let more_comment ;
                    // let data =  response[0];

                    // if(state.newf_expand_comments[data.head_id] == true)
                    //     more_comment = 0;
                    // else 
                    //     more_comment= data.comment.length - 3;
                    // // ถ้ามีคอมเมนต์ ให้กำหนดเป็นปุ่ม expand
                    // if(data.comment.length == 0) state.newf_expand_comments[data.head_id] = true;

                    // state.newf_more_comments[data.head_id] = more_comment;
                }

                // commit('SET_NEWF_DATA', response);
                commit('SET_SHOW_PROGRESS_LOADING', false);
                commit('SHOW_NEWF_LOADING', false);

            })
            .catch((error) => {
                console.log('error ', error);
                commit('SET_SHOW_PROGRESS_LOADING', false);
                commit('SHOW_NEWF_LOADING', false);
            });
    }

};

const getters = {
    newf_group_sales_list: state => {
        return state.newf_group_sales_list;
    },
    newf_shw_select_group: state => {
        return state.newf_shw_select_group;
    },
    newf_check_evt: state => {
        return state.newf_check_evt;
    },
    newf_sales_selected: state => {
        return state.newf_sales_selected;
    },
    newf_group_sales_selected: state => {
        return state.newf_group_sales_selected;
    },
    newf_sales_list: state => {
        return state.newf_sales_list;
    },
    newf_level: state => {
        return state.newf_level;
    },
    newf_sort_by: state => {
        return state.newf_sort_by;
    },
    newf_loation: state => {
        return state.newf_loation;
    },
    newf_brand: state => {
        return state.newf_brand;
    },
    newf_promotion: state => {
        return state.newf_promotion;
    },
    newf_this: state => {
        return state.newf_this;
    },
    newf_promo_selected: state => {
        return state.newf_promo_selected;
    },
    newf_fb_selected: state => {
        return state.newf_fb_selected;
    },
    newf_snk: state => {
        return state.newf_snk;
    },
    newf_dropdown_data: state => {
        return state.newf_dropdown_data;
    },
    newf_detail_team: state => {
        return state.newf_detail_team;
    },

    newf_post_selected: state => {
        return state.newf_post_selected;
    },
    newf_data: state => {
        return state.newf_data;
    },
    newf_customer_selected: state => {
        return state.newf_customer_selected;
    },
    newf_customer_list: state => {
        return state.newf_customer_list;
    },
    newf_show_customer: state => {
        return state.newf_show_customer;
    },
    newf_txt_cust_selected: state => {
        return state.newf_txt_cust_selected;
    },
    newf_emp_id: state => {
        return state.newf_emp_id;
    },
    newf_head_id: state => {
        return state.newf_head_id;
    },
    newf_show_gallery: state => {
        return state.newf_show_gallery;
    },
    newf_gallery_img: state => {
        return state.newf_gallery_img;
    },
    newf_notification: state => {
        return state.newf_notification;
    },
    newf_last_notification_id: state => {
        return state.newf_last_notification_id;
    },
    show_newf_spinner_loading: state => {
        return state.show_newf_spinner_loading;
    },
    newf_has_notification: state => {
        return state.newf_has_notification;
    },
    newf_brand_selected: state => {
        return state.newf_brand_selected;
    },
    newf_this_brand: state => {
        return state.newf_this_brand;
    },
    newf_first_post_id: state => {
        return state.newf_first_post_id;
    },
    newf_more_comments: state => {
        return state.newf_more_comments;
    },
    newf_expand_comments: state => {
        return state.newf_expand_comments;
    },
    newf_temp: state => {
        return state.newf_temp;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};