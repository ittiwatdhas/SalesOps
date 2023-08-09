import Vue from 'vue'
import App from './App'

/** custom css */
import './assets/vue-material.css'
import './assets/salesops.css'
import './assets/app.scss'

/** custom installing */
import VueMaterial from 'vue-material'
import Router from 'vue-router'
import VueI18n from 'vue-i18n'

// import moment from 'moment'
import fullCalendar from 'vue-fullcalendar'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'

/** custom create folder */
import configs from './config/configs'
import router from './config/routers'
import locales from './config/locales'
import store from './store/store'

import ga_kay from './config/ga_key'


/** icon css  */
import MaterialIcon from './assets/icon/material-design-icon.css'

/** font */
import FontRoboto from './assets/font/fontRoboto.css'
import FontLato from './assets/font/fontLato.css'
import FontKanit from './assets/font/fontKanit.css'
import FontAvenir from './assets/font/fontAvenir.css'
import FontHelveticaNeue from './assets/font/fontHelveticaNeue.css'
import FontProximaNova from './assets/font/fontProximaNova.css'

import LongdoMap from 'longdo-map-vue'

/* just import veu-analytics   */
//import google_analytics from './components/gnalytics/google_analytics.js'
/* Init google_analytics */
//google_analytics.init()

/*  EX  */
//	ga('send', {
//			  hitType: 'event',
//			  eventCategory: 'Videos',
//			  eventAction: 'play',
//			  eventLabel: 'Fall Campaign'
//			});
import VueSocketio from 'vue-socketio';

import VueAnalytics from 'vue-analytics';

Object.keys(customConfigs).forEach(function (key) {
    Vue.config[key] = customConfigs[key];
});

Vue.prototype.$ga_key = ga_kay;

//Vue.config['ga_key'] = ga_kay;


Vue.use(LongdoMap, {
    load: {
        apiKey: 'aefeb3c723bd4f2a3c431626ab9e4c49'
    }
})


let option = {
    query: {
        api: Vue.config['realTime']['api']
    },
    path: Vue.config['realTime']['path'],//'/sckio/socket.io'
    secure: true
    //path: '/sckio/socket.io'//,
    //transports : ['polling', 'websocket']
}


//console.log(this.$ga_key);

Vue.use(VueSocketio, Vue.config['realTime']['server'] , option, store);

Vue.use(VueAnalytics,{
    id: Vue.config['googleAnalytics'],
    router,
    autoTracking: {
        screenview: true,
        pageviewOnLoad: true,
        page: true
      }
})
Vue.use(VueMaterial)
    // Vue.use(moment)
Vue.use(fullCalendar)
Vue.use(VueResource)
Vue.use(VueLocalStorage)
Vue.use(VueI18n)

Vue.use(MaterialIcon)
Vue.use(FontRoboto)
Vue.use(FontLato)
Vue.use(FontKanit)
Vue.use(FontAvenir)
Vue.use(FontHelveticaNeue)
Vue.use(FontProximaNova)

Vue.material.registerTheme('default', {
        primary: 'orange',
        accent: 'red',
        warn: 'orange',
    })
    /** Set ตัวแปรที่ใช้ในระบบ */
/*    
Object.keys(configs).forEach(function(key) {
    Vue.config[key] = configs[key];
});
*/

var i18n = new VueI18n({
    locale: Vue.config.lang,
    messages: locales
})


new Vue({
    el: '#app',
    i18n,
    router,
    store,
    template: '<App/>',
    components: { App }
})
