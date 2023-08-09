import Vue from "vue";
import moment from "moment";
import visit from "../../services/activity/visit";
const state = {
  timeServer: null,
  spinner_loading: true,
  plan_today: [],
  plan_pending: [],
  all_plan: [],
  all_plan_filter: [],
  full_today_plan: [],
  full_pending_plan: [],
  full_all_plan: [],
  search_txt: '',
  expand: "",
  search_expand_today: false,
  search_expand_pending: false,
  search_expand_all: false,
  status_focus: [{
    status: true,
    item: [],
    plan_type: ''
  }],
  array_today_dup: [],
  delay_check: false,
  btn_check: true
};
const mutations = {
  SET_TIME_SERVER(state, value) {
    state.timeServer = value;
  },
  SET_SHOW_SPINNER_LOADING(state, value) {
    state.spinner_loading = value;
  },
  SET_EXPAND_PLAN(state, value) {
    state.expand = value;
  },
  SET_SEARCH_TXT(state, value) {
    state.search_txt = value;
  },
  SET_BTN_CHECK(state, value) {
    state.btn_check = value;
  },

  SEARCH_ALL_PLAN(state, value) {
    // console.log(value)
    const filter_all = [];
    const filter_pending = [];
    const filter_today = [];

    for (let index = 0; index < state.full_today_plan.length; index++) {
      const element = state.full_today_plan[index];
      if (
        String(element.customer_code + "" + element.customer_name_th).indexOf(value) != -1) {
        filter_today.push(element);
      }
    }

    for (let index = 0; index < state.full_pending_plan.length; index++) {
      const element = state.full_pending_plan[index];
      if (String(element.customer_code + "" + element.customer_name_th).indexOf(value) != -1) {
        filter_pending.push(element);
      }
    }

    for (let index = 0; index < state.full_all_plan.length; index++) {
      const element = state.full_all_plan[index];
      if (
        String(element.customer_code + "" + element.customer_name_th).indexOf(
          value
        ) != -1
      ) {
        filter_all.push(element);
      }
    }

    // console.log(filter)
    if (value != "") {

      for (let index = 0; index < state.full_today_plan.length; index++) {
        const element = state.full_today_plan[index];
        if (element.checkin_time != null && element.checkout_time == null) {
          if (!filter_today.find(({ customer_id }) => customer_id === element.customer_id)) {
            filter_today.push(element)
          }
        }
      }

      for (let index = 0; index < state.full_pending_plan.length; index++) {
        const element = state.full_pending_plan[index];
        if (element.checkin_time != null && element.checkout_time == null) {
          if (!filter_pending.find(({ customer_id }) => customer_id === element.customer_id)) {
            filter_pending.push(element)
          }
        }
      }

      for (let index = 0; index < state.full_all_plan.length; index++) {
        const element = state.full_all_plan[index];
        if (element.checkin_time != null && element.checkout_time == null) {
          if (!filter_all.find(({ customer_id }) => customer_id === element.customer_id)) {
            filter_all.push(element)
          }
        }
      }

      state.all_plan = filter_all;
      state.plan_today = filter_today;
      state.plan_pending = filter_pending;
    } else {
      state.all_plan = state.full_all_plan;
      state.plan_today = state.full_today_plan;
      state.plan_pending = state.full_pending_plan;
    }
    // console.log(state.full_today_plan.length ,filter_today.length )

    if (filter_today.length > 0 && state.full_today_plan.length != filter_today.length) {
      state.search_expand_today = true
    } else {
      state.search_expand_today = false
    }

    if (filter_pending.length > 0 && state.full_pending_plan.length != filter_pending.length) {
      state.search_expand_pending = true
    } else {
      state.search_expand_pending = false
    }

    if (filter_all.length > 0 && state.full_all_plan.length != filter_all.length) {
      state.search_expand_all = true

    } else {
      state.search_expand_all = false
    }
    // console.log(filter_today.length,filter_pending.length,filter_all.length)
  },
};

const actions = {
  getAllPlan: ({ commit, state, dispatch }, value) => {
    state.spinner_loading = true;
    // commit('SET_SHOW_SPINNER_LOADING', true);
    visit
      .getTimeServer()
      .then((time_server) => {
        value.select_date = moment(time_server.data).format("YYYY-MM-DD");
        state.timeServer = time_server.data;
        Vue.localStorage.set("timestamp_on_page", JSON.stringify(moment(time_server.data).format("YYYY-MM-DD")));
        visit
          .getAllPlan(value)
          .then((response) => {
            if (_.isEmpty(response.data)) {
              console.log(response.data)
              response.data = []
            }

            var arr = []
            arr = response.plan_today.filter(function (item) {
              return item.customer_code !== "0"
            })
            response.plan_today = arr

            var arr2 = []
            arr2 = response.plan_pending.filter(function (item) {
              return item.customer_code !== "0"
            })
            response.plan_pending = arr2

            for (let index = 0; index < response.plan_today.length; index++) {
              const element = response.plan_today[index];
              Object.assign(element, {
                checkin_time: '',
                checkout_time: '',
                visit_status: null
              });
            }

            for (let index = 0; index < response.plan_pending.length; index++) {
              const element = response.plan_pending[index];
              Object.assign(element, {
                checkin_time: '',
                checkout_time: '',
                visit_status: null
              });
            }

            for (let index = 0; index < response.data.length; index++) {
              const element = response.data[index];
              Object.assign(element, {
                checkin_time: '',
                checkout_time: '',
                visit_status: null
              });
            }

            state.plan_today = response.plan_today;
            state.full_today_plan = response.plan_today;

            state.all_plan = response.data;
            state.full_all_plan = response.data;

            state.plan_pending = response.plan_pending;
            state.full_pending_plan = response.plan_pending;

            if (value.expand == '') {
              if (response.plan_today.length != 0) {
                state.expand = "today";
              } else if (response.plan_pending.length != 0) {
                state.expand = "pending";
              } else {
                state.expand = "all";
              }
            }
            dispatch("checkInHistory", {
              time_server: time_server,
              expand: value.expand,
              check_dup: value.check_dup
            });
            //    commit('SET_SHOW_SPINNER_LOADING', false);
          })
          .catch();
      })
      .catch();
  },
  checkInHistory: ({ commit, state, dispatch }, value) => {
    // console.log(value)
    visit
      .checkInHistory()
      .then((response) => {
        // console.log(response)
        if (!_.isEmpty(response)) {

          // console.log(value.time_server.data)
          for (let index = 0; index < state.plan_pending.length; index++) {
            const element = state.plan_pending[index];
            dispatch('AAA', String(element.customer_id))
          }

          var new_date = moment(value.time_server.data, "YYYY-MM-DD").add(1, 'days');;
          const merge_today = state.plan_today.map((t1) => ({
            ...t1,
            ...response.find((t2) => t2.plan_id === t1.plan_id),
          }));

          // console.log(state.array_today_dup)
          const merge_pending = state.plan_pending.map((t1) => ({}
            , {
            ...t1,
            ...response.find((t2) =>
              state.array_today_dup.findIndex(x => x.customer_id === t1.customer_id) == -1 &&
              t2.customer_id === t1.customer_id &&
              String(moment(new_date).format("YYYY-MM-DD")) == String(t1.plan_date) &&
              String(moment(value.time_server.data).format("YYYY-MM-DD")) == String(t2.visit_date)),
          }));
          if (state.all_plan.length != undefined) {
            const merge_all = state.all_plan.map((t1) => ({
              ...t1,
              ...response.find((t2) => String(t2.customer_id) === String(t1.customer_id) && String(moment(value.time_server.data).format("YYYY-MM-DD")) === String(t2.visit_date)),
            }));
            state.all_plan = merge_all
            merge_all.sort((a, b) => (String(a.checkin_time) > String(b.checkin_time)) ? -1 : 1)
            state.full_all_plan = merge_all
          } else {

          }

          merge_today.sort((a, b) => (String(a.checkin_time) > String(b.checkin_time)) ? -1 : 1)
          merge_pending.sort((a, b) => (String(a.checkin_time) > String(b.checkin_time)) ? -1 : 1)
          state.full_today_plan = merge_today
          state.full_pending_plan = merge_pending

          for (let index = 0; index < merge_pending.length; index++) {
            const element = merge_pending[index];

            if (element.checkin_time != '' && element.checkout_time != '' || element.checkin_time != '' && element.checkout_time == '') {
              if (moment(state.timeServer.data).format("YYYY-MM-DD") == element.visit_date) {
                element.even_color = '#FD7F00'
              }
            }
          }
          state.plan_today = merge_today;
          state.plan_pending = merge_pending;


          // console.log(merge_all,state.search_txt)
          commit('SEARCH_ALL_PLAN', state.search_txt)
          // state.expand = value.expand
          state.delay_check = true

          // dispatch('CheckInProgress')
        }
        state.btn_check = true
        state.spinner_loading = false
      })

      .catch();

  },
  userCheckIn: ({ commit, state, dispatch }, value) => {
    state.spinner_loading = true;
    visit
      .userCheckIn(value)
      .then((response) => {

        console.log(response.message)
        if (response.message) {
          dispatch('botCheckin', value)
        }

        dispatch('getAllPlan', {
          lat: value.lat,
          long: value.long,
          select_date: '',
          expand: value.expand,
          check_dup: value.check_duplicate
        })
      })
      .catch((error) => console.log('userCheckIn'));
  },
  botCheckin: ({ commit, state, dispatch }, value) => {
    visit
      .botCheckin(value)
      .then((response) => {

      })
      .catch((error) => console.log('userCheckIn'));
  },
  AAA: ({ commit, state, dispatch }, value) => {
    let obj = state.plan_today.find(obj => obj.customer_id == value)
    if (obj) {
      state.array_today_dup.push(obj)
    }
  },
  reLocation: ({ commit, state, dispatch }, value) => {
    visit
      .reLocation(value)
      .then((response) => {

        
      })
      .catch((error) => console.log('reLocation'));
  }
};
const getters = {
  spinner_loading: (state) => {
    return state.spinner_loading;
  },
  timeServer: (state) => {
    return state.timeServer;
  },
  plan_today: (state) => {
    return state.plan_today;
  },
  all_plan: (state) => {
    return state.all_plan;
  },
  expand: (state) => {
    return state.expand;
  },
  search_expand_today: (state) => {
    return state.search_expand_today
  },
  search_expand_pending: (state) => {
    return state.search_expand_pending
  },
  search_expand_all: (state) => {
    return state.search_expand_all
  },
  plan_pending: (state) => {
    return state.plan_pending;
  },
  status_focus: (state) => {
    return state.status_focus
  },
  delay_check: (state) => {
    return state.delay_check
  },
  btn_check: (state) => {
    return state.btn_check
  }
  //   datasList: state => {
  //     return state.datas_list;
  //   }
};
export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters,
};
