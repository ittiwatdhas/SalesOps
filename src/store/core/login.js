import loginService from '../../services/core/login'
import Vue from 'vue';

const state = {
    path_menu: [],
    all_path_menu: [],
    head_path_menu: [],
    sub_path_menu: [],
    left_path_menu: [],
    left_path_menu_after:[],
    select_menu: '',
    displayMenu: [],
    data_check:[],
    frist_page:''
};
const mutations = {
    'SET_ALL_PATH_MENU'(state, value) {
        state.all_path_menu = value;
    },
    'SET_HEAD_PATH_MENU'(state, value) {
        state.head_path_menu = value;
    },
    'SET_SUB_PATH_MENU'(state, value) {
        state.sub_path_menu = value;
    },
    'SET_LEFT_PATH_MENU'(state, value) {
        state.left_path_menu = value;
    },
    'SET_SELECT_MENU'(state, value) {
        state.select_menu = value;
    },
    'SET_DISPLAYMENU'(state, value) {
        state.displayMenu = value;
    },
    'SET_FRISTPAGE'(state, value) {
        state.frist_page = value;
    },
    'SET_LEFT_PATH_MENU_AFTER'(state, value) {
        state.left_path_menu_after = value;
    },
};
const actions = {
    setPathMenuService: ({ commit, state }, value ) => {
        
        if (Vue.localStorage.get('all_path_menu') == null) {
            loginService.getPathMenu(state)
                .then((response) => {
                    Vue.localStorage.set('frist_page', JSON.stringify(response.menu_data[0].sub_menu[0].item[0].m_path));
                    if (response.menu_data.length > 0) {
                        state.displayMenu = response.menu_data
                        commit('SET_ALL_PATH_MENU', response);
                        commit('SET_HEAD_PATH_MENU', response.menu_data);
                        commit('SET_FRISTPAGE', response.menu_data[0].sub_menu[0].item[0].m_path);
                        let key = 'sub_menu_' + value.trim()
                        if (value == 'setting') {
                            commit('SET_LEFT_PATH_MENU', JSON.parse(Vue.localStorage.get(key)));
                        } else {
                            commit('SET_SUB_PATH_MENU', JSON.parse(Vue.localStorage.get(key)));
                        }
                    } else {
                        commit('SET_ALL_PATH_MENU', []);
                        commit('SET_HEAD_PATH_MENU', []);
                        commit('SET_SUB_PATH_MENU', []);
                    }
                })
                .catch((error) => console.log('setPathMenuService'));
        } else {
            
            let all_path_menu = Vue.localStorage.get('all_path_menu');
            let rs = JSON.parse(all_path_menu)
            state.displayMenu = rs.menu_data
            commit('SET_ALL_PATH_MENU', rs);
            commit('SET_HEAD_PATH_MENU', rs.menu_data);
            let key = 'sub_menu_' + value
            if (value == 'setting') {
               if(state.left_path_menu_after.length == 0){
                commit('SET_LEFT_PATH_MENU', JSON.parse(Vue.localStorage.get(key)));

               }else {
                commit('SET_LEFT_PATH_MENU', state.left_path_menu_after);
               }
            } else {
                
                commit('SET_SUB_PATH_MENU', JSON.parse(Vue.localStorage.get(key)));
            }
        }
    },
    selectedMenuService: ({ commit, state }, value) => {
        // let key = 'sub_menu_' + value.m_code.trim()
        // console.log("selectedMenuService==> ", Vue.localStorage.get(key))
        // if (value.m_code == 'setting') {
        //     // commit('SET_LEFT_PATH_MENU', JSON.parse(Vue.localStorage.get(key)));
        // } else {
        //     // console.log(JSON.parse(Vue.localStorage.get(key)))
        //     //     commit('SET_SUB_PATH_MENU', JSON.parse(Vue.localStorage.get(key)));
        // }
    },
    changePasswordService: ({ commit, state }, value) => {
        loginService.changePassword(value)
            .then((response) => {
                value.router.replace('/dashboard');
            })
            .catch((error) => console.log('changePasswordService'));

    },
};
const getters = {
    path_menu: state => {
        return state.path_menu;
    },
    all_path_menu: state => {
        return state.all_path_menu;
    },
    head_path_menu: state => {
        return state.head_path_menu;
    },
    sub_path_menu: state => {
        return state.sub_path_menu;
    },
    left_path_menu: state => {
        return state.left_path_menu;
    },
    left_path_menu_after: state => {
        return state.left_path_menu_after;
    },
    select_menu: state => {
        return state.select_menu;
    },
    displayMenu: state => {
        return state.displayMenu;
    },
    frist_page: state => {
        return state.frist_page;
    },
};



export default {
    state,
    mutations,
    actions,
    getters
};