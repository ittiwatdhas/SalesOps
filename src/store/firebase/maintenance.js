import axios from 'axios';
import { db } from "./firebase"

const store = {
  state: {
    statusServer: [{
      key: "status",
      messages: "online"
    },
    {
      key: "warning",
      messages: "-"
    }],
  },
  mutations: {
    setStatusServer(state, data) {
      state.statusServer = data;
    },
  },
  actions: {
    watchServer({ state, dispatch, commit }, data) {
      let ref = db.ref("dev/salesops")
      ref.on("value", function (snapshot) {
        let msg = []
        snapshot.forEach(function (childSnapshot) {
          let temp = { key: '', messages: [] }
          temp.key = childSnapshot.key
          temp.messages = childSnapshot.val()
          msg.push(temp)
        });
        if (msg.length > 0) {
          let master = ['online', 'offline', 'retest']
          if (master.includes(msg[0].messages)) {
          } else {
            msg = state.statusServer
          }
        } else {
          msg = state.statusServer
        }
        commit("setStatusServer", msg)
        localStorage.setItem("setStatusServer", msg[0].messages)
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

    },
    setServer({ state, dispatch, commit }) {
      // db.ref("server/status").set('online');
    },
  },
  getters: {
    statusServer(state) {
      return state.statusServer;
    },
  }
}

export default store;