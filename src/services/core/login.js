import Vue from 'vue'

export default {
    getPathMenu(state) {
        return Vue.http.get(Vue.config['url'] + "/path-menu", {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => { 
            Vue.localStorage.set('frist_path', JSON.stringify(response.body.success.menu_data[0].sub_menu[0].item[0].m_path));
            Vue.localStorage.set('all_path_menu', JSON.stringify(response.body.success));
            let theArray = response.body.success.menu_data
           for (let index = 0; index < theArray[0].sub_menu.length; index++) {
               if(index == 0){
                Object.assign(theArray[0].sub_menu[index], {status_hide_show: true});
               }else {
                Object.assign(theArray[0].sub_menu[index], {status_hide_show: false });
               }
           }
            // Object.assign(theArray[0].sub_menu[0], {status_hide_show: ''});
            theArray.forEach(function (element) {
                Vue.localStorage.set('sub_menu_' + element.m_code.trim(), JSON.stringify(element.sub_menu));
            });

            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    },
    // getPathMenu(state) {
    //     return Vue.http.get(Vue.config['url'] + "/path-menu", {
    //         headers: {
    //             'Authorization': 'Bearer ' + Vue.localStorage.get('token')
    //         },
    //     }).then((response) => {
    //         if (response.body.success.sub_menu_activity != null) {
    //             Vue.localStorage.set('all_path_menu', JSON.stringify(response.body.success));
    //         }
    //         return Promise.resolve(response.body.success);
    //     }).catch((error) => Promise.reject(error));
    // },
    changePassword(value) {
        var formData = new FormData();
        formData.append('username', value.username);
        formData.append('password', value.password);
        return Vue.http.post(Vue.config['url'] + '/change-password', formData, {
            headers: {
                'Authorization': 'Bearer ' + Vue.localStorage.get('token')
            },
        }).then((response) => {
            return Promise.resolve(response.body.success);
        }).catch((error) => Promise.reject(error));
    }
}