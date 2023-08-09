<template>
  <div id="pageTestGraph">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true">
      <div class="md-layout" md-alignment="center" v-if="mode == 1">
        <div
          v-for="(item, i) in todos"
          :key="'pageTestGraph' + i"
          class="md-layout md-flex-medium-100 md-flex-large-50 md-flex-xlarge-50"
          style="padding : 20px 5px 10px 20px"
          draggable="true"
          @dragstart="dragStart(i, $event)"
          @dragover.prevent
          @dragenter="dragEnter"
          @dragleave="dragLeave"
          @dragend="dragEnd"
          @drop="dragFinish(i, $event)"
          :id="'pageTestGraph' + i"
        >
          <div class="main-bg" style="margin-right:1%">
            <div
              v-if="item.title == '1'"
              style="display:flex;width:100%;padding-right:6%"
            >
              <div style="padding-top : 28px;width:18%">
                <div style="font-size:15px">
                  <b>Price policy : </b>
                </div>
              </div>
              <div style="width:42%">
                <div style="font-size:15px">
                  <md-input-container
                    md-theme
                    style="min-height: 0px !important;"
                  >
                    <md-select v-model="id_price_policy" multiple>
                      <md-option
                        v-for="rows in dataList"
                        :key="'dp1' + rows.feild"
                        v-bind:value="rows.feild"
                        class="-left"
                        @selected="setAll(rows, 'price_policy')"
                      >
                        <md-layout
                          class="mr-10 robotoFont minwidth-170 maxwidth-160 font-weight-300"
                          md-align="start"
                        >
                          <label>{{ rows.title }}</label>
                        </md-layout>
                      </md-option>
                    </md-select>
                  </md-input-container>
                </div>
              </div>
              <div style="padding-top : 28px;padding-left : 10px;width:13%">
                <div style="font-size:15px"><b>Status : </b></div>
              </div>
              <div style="width:20%">
                <div style="font-size:15px;">
                  <md-input-container
                    md-theme
                    style="min-height: 0px !important;"
                  >
                    <md-select v-model="id_status" multiple>
                      <md-option
                        v-for="rows in dataList2"
                        :key="'dp2' + rows.feild"
                        v-bind:value="rows.feild"
                        class="-left"
                        @selected="setAll(rows, 'status')"
                      >
                        <md-layout class="robotoFont" md-align="start">
                          <label>{{ rows.title }}</label>
                        </md-layout>
                      </md-option>
                    </md-select>
                  </md-input-container>
                </div>
              </div>
              <div style="width:7%;padding-top:10px;padding-left:10px;">
                <md-button
                  class="md-raised -orange"
                  style="height:30px;min-width:30px"
                  @click="gaFilter()"
                >
                  <md-icon>search</md-icon>
                </md-button>
              </div>
            </div>
            <div
              v-if="item.title == '2'"
              style="display:flex;width:100%;padding-right : 6%"
            >
              <div style="padding-top : 28px;padding-left : 10px;width:20%">
                <div style="font-size:15px"><b>Credit term : </b></div>
              </div>
              <div style="width:40%">
                <div style="font-size:15px">
                  <md-input-container
                    md-theme
                    style="min-height: 0px !important;"
                  >
                    <md-select v-model="id_creditterm" multiple>
                      <md-option
                        v-for="rows in credit"
                        :key="'dp3' + rows.feild"
                        v-bind:value="rows.feild"
                        class="-left"
                        @selected="setAll(rows, 'creditterm')"
                      >
                        <md-layout
                          class="mr-10 robotoFont minwidth-170 maxwidth-160 font-weight-300"
                          md-align="start"
                        >
                          <label>{{ rows.title }}</label>
                        </md-layout>
                      </md-option>
                    </md-select>
                  </md-input-container>
                </div>
              </div>
              <div style="padding-top : 28px;padding-left : 10px;width:13%;">
                <div style="font-size:15px"><b>Status : </b></div>
              </div>
              <div style="width:20%;">
                <div style="font-size:15px">
                  <md-input-container
                    md-theme
                    style="min-height: 0px !important;"
                  >
                    <md-select v-model="id_status2" multiple>
                      <md-option
                        v-for="rows in dataList2"
                        :key="'dp4' + rows.feild"
                        v-bind:value="rows.feild"
                        class="-left"
                        @selected="setAll(rows, 'status2')"
                      >
                        <md-layout
                          class="mr-10 robotoFont minwidth-170 maxwidth-160 font-weight-300"
                          md-align="start"
                        >
                          <label>{{ rows.title }}</label>
                        </md-layout>
                      </md-option>
                    </md-select>
                  </md-input-container>
                </div>
              </div>
              <div style="width:7%;padding-top:10px;padding-left : 10px;">
                <md-button
                  class="md-raised -orange"
                  style="height:30px;min-width:30px"
                  @click="gaFilter2()"
                >
                  <md-icon>search</md-icon>
                </md-button>
              </div>
            </div>
            <div
              :style="{
                position: 'absolute',
                height: getHGraph(item.title),
                width: getWGraph(item.title)
              }"
            ></div>
            <div>
              <iframe
                v-if="item.title == '1'"
                id="myFrame1"
                style="height:430px;border: none;border-radius: 2px; background:white"
                width="640"
                height="480"
                :src="graph1"
              ></iframe>
              <iframe
                v-if="item.title == '2'"
                id="myFrame2"
                style="height:430px;border: none;border-radius: 2px; background:white"
                width="640"
                height="480"
                :src="graph2"
              ></iframe>
              <iframe
                v-if="item.title == '3'"
                id="myFrame3"
                style="height:430px;border: none;border-radius: 2px; background:white"
                width="640"
                height="480"
                :src="graph3"
              ></iframe>
              <iframe
                v-if="item.title == '4'"
                id="myFrame4"
                style="height:430px;border: none;border-radius: 2px; background:white"
                width="640"
                height="480"
                :src="graph4"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div class="md-layout" md-alignment="center" v-if="mode == 2">
        <div
          v-for="(item, i) in todos"
          :key="'pageTestGraph' + i"
          class="md-layout md-flex-medium-100 md-flex-large-25 md-flex-xlarge-25"
          style="padding : 20px 5px 10px 20px"
          draggable="true"
          @dragstart="dragStart(i, $event)"
          @dragover.prevent
          @dragenter="dragEnter"
          @dragleave="dragLeave"
          @dragend="dragEnd"
          @drop="dragFinish(i, $event)"
        >
          <div :class="'box bg' + item.type">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
// import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'test-graph',
  data () {
    return {
      login: false,
      id_price_policy: ['All', 'BOOK', 'FLEX', 'null'],
      id_status: ['Active'],
      id_creditterm: [
        'All',
        'เครดิต 7 วัน',
        'เครดิต 30 วัน',
        'เครดิต 45 วัน',
        'เครดิต 60 วัน',
        'เครดิต 75 วัน',
        'เครดิต 90 วัน',
        'ลูกค้ากทม 7 วัน',
        'ลูกค้ากทม 90 วัน',
        'ลูกค้ากทม 180 วัน',
        'ลูกค้ากทม 365 วัน',
        'ลูกค้าตจว 30 วัน',
        'ลูกค้าตจว 45 วัน',
        'ลูกค้าตจว 60 วัน'
      ],
      id_status2: ['Active'],
      dataList: [
        {
          title: 'ALL',
          feild: 'All'
        },
        {
          title: 'BOOK',
          feild: 'BOOK'
        },
        {
          title: 'FLEX',
          feild: 'FLEX'
        },
        {
          title: 'Empty string',
          feild: 'null'
        }
      ],
      dataList2: [
        {
          title: 'ALL',
          feild: 'All'
        },
        {
          title: 'Active',
          feild: 'Active'
        },
        {
          title: 'Inactive',
          feild: 'Inactive'
        },
        {
          title: 'Empty string',
          feild: 'null'
        }
      ],
      credit: [
        {
          title: 'ALL',
          feild: 'All'
        },
        {
          title: 'เครดิต 7 วัน',
          feild: 'เครดิต 7 วัน'
        },
        {
          title: 'เครดิต 30 วัน',
          feild: 'เครดิต 30 วัน'
        },
        {
          title: 'เครดิต 45 วัน',
          feild: 'เครดิต 45 วัน'
        },
        {
          title: 'เครดิต 60 วัน',
          feild: 'เครดิต 60 วัน'
        },
        {
          title: 'เครดิต 75 วัน',
          feild: 'เครดิต 75 วัน'
        },
        {
          title: 'เครดิต 90 วัน',
          feild: 'เครดิต 90 วัน'
        },
        {
          title: 'ลูกค้ากทม 7 วัน',
          feild: 'ลูกค้ากทม 7 วัน'
        },
        {
          title: 'ลูกค้ากทม 90 วัน',
          feild: 'ลูกค้ากทม 90 วัน'
        },
        {
          title: 'ลูกค้ากทม 180 วัน',
          feild: 'ลูกค้ากทม 180 วัน'
        },
        {
          title: 'ลูกค้ากทม 365 วัน',
          feild: 'ลูกค้ากทม 365 วัน'
        },
        {
          title: 'ลูกค้าตจว 30 วัน',
          feild: 'ลูกค้าตจว 30 วัน'
        },
        {
          title: 'ลูกค้าตจว 45 วัน',
          feild: 'ลูกค้าตจว 45 วัน'
        },
        {
          title: 'ลูกค้าตจว 60 วัน',
          feild: 'ลูกค้าตจว 60 วัน'
        }
      ],
      todos: [
        { title: '1', done: false, type: 1 },
        { title: '2', done: false, type: 1 },
        { title: '3', done: false, type: 1 },
        { title: '4', done: false, type: 1 }
        // { title: '5', done: false, type: 2 },
        // { title: '6', done: false, type: 2 },
        // { title: '7', done: false, type: 2 },
        // { title: '8', done: false, type: 2 }
      ],
      newItem: '',
      dragging: -1,
      mode: 1,
      graph1: '',
      graph2: '',
      graph3: '',
      graph4: ''
    }
  },
  computed: {
    isDragging () {
      return this.dragging > -1
    }
  },
  watch: {
    id_price_policy (newValue) {
      if (newValue.length != this.dataList.length) {
        this.setAll(newValue, 'price_policy_other')
      }
    },
    id_status (newValue) {
      if (newValue.length != this.dataList2.length) {
        this.setAll(newValue, 'status_other')
      }
    },
    id_creditterm (newValue) {
      if (newValue.length != this.credit.length) {
        this.setAll(newValue, 'creditterm_other')
      }
    },
    id_status2 (newValue) {
      if (newValue.length != this.dataList2.length) {
        this.setAll(newValue, 'status2_other')
      }
    },
    todos: {
      handler: function (todos) {
        // console.log(todos)
      },
      deep: true
    }
  },
  methods: {
    fetchGraph () {
      let ip = 'http://10.7.200.136:8080/mongodb-charts-edfjw/embed/'
      let filters = '&theme=light&filter={}'
      this.graph1 =
        ip + 'charts?id=a1e9679d-ad50-4382-a428-aa9f085de797' + filters
      this.graph2 =
        ip + 'charts?id=2f7c303c-ef3a-4855-be4f-143eee098cbc' + filters
      this.graph3 =
        ip + 'charts?id=db3b6c4c-5e69-41ca-9ffd-4df5bdb307c0' + filters
      this.graph4 =
        ip + 'charts?id=2762a55c-842a-4f13-9f9c-8f81c48ffffd' + filters
    },
    getHGraph (id) {
      let ele = document.getElementById('myFrame' + id)
      if (ele == null) {
        return ''
      } else {
        let total = ele.height - 30
        return total + 'px'
      }
    },
    getWGraph (id) {
      let ele = document.getElementById('myFrame' + id)
      if (ele == null) {
        return ''
      } else {
        return ele.width + 'px'
      }
    },
    addItem () {
      if (!this.newItem) {
        return
      }
      this.todos.push({
        title: this.newItem,
        done: false
      })
      this.newItem = ''
    },
    removeItem (item) {
      this.todos.splice(this.todos.indexOf(item), 1)
    },
    removeItemAt (index) {
      this.todos.splice(index, 1)
    },
    dragStart (which, ev) {
      ev.dataTransfer.setData('Text', this.id)
      ev.dataTransfer.dropEffect = 'move'
      this.dragging = which
    },
    dragEnter (ev) {
      /* 
      if (ev.clientY > ev.target.height / 2) {
        ev.target.style.marginBottom = '10px'
      } else {
        ev.target.style.marginTop = '10px'
      }
      */
    },
    dragLeave (ev) {
      /* 
      ev.target.style.marginTop = '2px'
      ev.target.style.marginBottom = '2px'
      */
    },
    dragEnd (ev) {
      // if (this.dragging == 0) {
      // this.gaFilter()
      // this.gaFilter2()
      // } else if (this.dragging == 1) {
      // }
      this.dragging = -1
    },
    dragFinish (to, ev) {
      this.moveItem(this.dragging, to)
    },
    moveItem (from, to) {
      if (to === -1) {
        this.removeItemAt(from)
      } else {
        this.todos.splice(to, 0, this.todos.splice(from, 1)[0])
      }
    },
    //---------------------------------------------------------
    setAll (value, input) {
      if (input == 'price_policy') {
        if (value.feild == 'All') {
          let all = _.filter(this.id_price_policy, item => {
            if (value.feild == item) {
              return true
            }
          })
          if (all.length == 0) {
            let master = _.map(this.dataList, 'feild')
            this.id_price_policy = master
          } else {
            this.id_price_policy = []
          }
        }
      } else if (input == 'creditterm') {
        if (value.feild == 'All') {
          let all = _.filter(this.id_creditterm, item => {
            if (value.feild == item) {
              return true
            }
          })
          if (all.length == 0) {
            let master = _.map(this.credit, 'feild')
            this.id_creditterm = master
          } else {
            this.id_creditterm = []
          }
        }
      } else if (input == 'status') {
        if (value.feild == 'All') {
          let all = _.filter(this.id_status, item => {
            if (value.feild == item) {
              return true
            }
          })
          if (all.length == 0) {
            let master = _.map(this.dataList2, 'feild')
            this.id_status = master
          } else {
            this.id_status = []
          }
        }
      } else if (input == 'status2') {
        if (value.feild == 'All') {
          let all = _.filter(this.id_status2, item => {
            if (value.feild == item) {
              return true
            }
          })
          if (all.length == 0) {
            let master = _.map(this.dataList2, 'feild')
            this.id_status2 = master
          } else {
            this.id_status2 = []
          }
        }
      } else if (input == 'price_policy_other') {
        let all = _.filter(value, item => {
          if (item == 'All') {
            return true
          }
        })
        if (all.length > 0) {
          this.id_price_policy = _.filter(this.id_price_policy, item => {
            if (item != 'All') {
              return true
            }
          })
        } else {
          if (this.id_price_policy.length == this.dataList.length - 1) {
            this.id_price_policy.push('All')
          }
        }
      } else if (input == 'creditterm_other') {
        let all = _.filter(value, item => {
          if (item == 'All') {
            return true
          }
        })
        if (all.length > 0) {
          this.id_creditterm = _.filter(this.id_creditterm, item => {
            if (item != 'All') {
              return true
            }
          })
        } else {
          if (this.id_creditterm.length == this.credit.length - 1) {
            this.id_creditterm.push('All')
          }
        }
      } else if (input == 'status_other') {
        let all = _.filter(value, item => {
          if (item == 'All') {
            return true
          }
        })
        if (all.length > 0) {
          this.id_status = _.filter(this.id_status, item => {
            if (item != 'All') {
              return true
            }
          })
        } else {
          if (this.id_status.length == this.dataList2.length - 1) {
            this.id_status.push('All')
          }
        }
      } else if (input == 'status2_other') {
        let all = _.filter(value, item => {
          if (item == 'All') {
            return true
          }
        })
        if (all.length > 0) {
          this.id_status2 = _.filter(this.id_status2, item => {
            if (item != 'All') {
              return true
            }
          })
        } else {
          if (this.id_status2.length == this.dataList2.length - 1) {
            this.id_status2.push('All')
          }
        }
      }
    },
    gaFilter2 () {
      let url =
        'http://10.7.200.136:8080/mongodb-charts-edfjw/embed/charts?id=2f7c303c-ef3a-4855-be4f-143eee098cbc&theme=light'
      let cond =
        "&filter={'creditterm_title': {'$in': []}, 'status': {'$in': ['','Active','Inactive']}}"
      let creditterm = []
      let statusData = []
      for (let i = 0; i < this.id_creditterm.length; i++) {
        if (this.id_creditterm[i] == 'null') {
          creditterm.push('')
        } else {
          creditterm.push(this.id_creditterm[i])
        }
      }
      for (let i = 0; i < this.id_status2.length; i++) {
        if (this.id_status2[i] == 'null') {
          statusData.push('')
        } else {
          statusData.push(this.id_status2[i])
        }
      }
      cond =
        "&filter={'creditterm_title': {'$in': " +
        JSON.stringify(creditterm) +
        "}, 'status': {'$in': " +
        JSON.stringify(statusData) +
        '}}'
      this.graph2 = url + cond
      document.getElementById('myFrame2').src = url + cond
    },
    gaFilter () {
      let url =
        'http://10.7.200.136:8080/mongodb-charts-edfjw/embed/charts?id=a1e9679d-ad50-4382-a428-aa9f085de797&theme=light'
      let cond =
        "&filter={'price_policy': {'$in': ['','FLEX','BOOK']}, 'status': {'$in': ['','Active','Inactive']}}"
      let price_policy = []
      let statusData = []
      for (let i = 0; i < this.id_price_policy.length; i++) {
        if (this.id_price_policy[i] == 'null') {
          price_policy.push('')
        } else {
          price_policy.push(this.id_price_policy[i])
        }
      }
      for (let i = 0; i < this.id_status.length; i++) {
        if (this.id_status[i] == 'null') {
          statusData.push('')
        } else {
          statusData.push(this.id_status[i])
        }
      }
      cond =
        "&filter={'price_policy': {'$in': " +
        JSON.stringify(price_policy) +
        "}, 'status': {'$in': " +
        JSON.stringify(statusData) +
        '}}'
      this.graph1 = url + cond
      console.log(this.graph1)
      document.getElementById('myFrame1').src = url + cond
    }
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
      this.login = true
      this.fetchGraph()
      // this.$store.dispatch('setPathMenuService', 'orders')
    }
  },
  components: {
    'menu-header': require('../Salesops/layout/menu-top'),
    'menu-left': require('../Salesops/layout/menu-left')
  }
}
</script>
<style lang="scss" scoped>
#pageTestGraph {
  .main-bg {
    background: white;
    width: 100%;
    height: 100%;
  }
  .box {
    width: 100%;
    height: 250px;
    padding-top: 120px;
    font-size: 150px;
    color: white;
    &.bg1 {
      background: red;
    }
    &.bg2 {
      background: pink;
    }
  }
}
</style>
