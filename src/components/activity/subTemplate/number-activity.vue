<template>
  <md-layout class="md-report-bar">
    <md-layout md-flex="100">
      <div
      style="margin: 4.5px 1.5% 2.5% 1%;"
        :class="
          tempStatus == 'all'
            ? 'md-rectangle-icon medium orange'
            : 'md-rectangle-icon medium lightgray'
        "
        @click="selectStatus('all')"
      >
        ALL
      </div>
      <div style="width:16%;display:inline-flex">
        <!-- <md-layout  md-flex="15" class="pr-5"> -->
        <div
          :class="tempStatus == 'visit' ? 'title-text active' : 'title-text'"
           class="res_font"
          @click="selectStatus('visit')"
        >
          VISITS
        </div>
        <div   class="title-number res_font_number">{{ $store.getters.act_count_visits }}</div>
        <!-- </md-layout> -->
      </div>
      <div style="width:21%;display:inline-flex">
        <!-- <md-layout  md-flex="20" style="padding-right:3px"> -->
        <div
         class="res_font"
          :class="
            tempStatus == 'unplanned' ? 'title-text active' : 'title-text'
          "
          @click="selectStatus('unplanned')"
        >
          UNPLANNED
        </div>
        <div class="title-number res_font_number">{{ $store.getters.act_unplanned }}</div>
        <!-- </md-layout> -->
      </div>
      <div style="padding:0 0 0 5px;width:21%;display:inline-flex">
        <!-- <md-layout md-flex="20" >  -->
        <div
           class="res_font"
          :class="
            tempStatus == 'incomplete' ? 'title-text active' : 'title-text'
          "
          @click="selectStatus('incomplete')"
        >
          INCOMPLETE
        </div>
        <div class="title-number res_font_number">{{ $store.getters.act_incomplete }}</div>
        <!-- </md-layout> -->
      </div>
      <div style="padding:0 0 0 5px;width:27%;display:inline-flex">
        <!-- <md-layout md-flex="30" >  -->
        <div   class="title-text nohover res_font">SUCCESS RATE</div>
        <div class="title-number res_font_number">{{ $store.getters.act_success_rate }}%</div>
        <!-- </md-layout> -->
      </div>
      <div style="width:5%;padding-top:3px">
        <!-- <md-layout md-align="end" class="-pointer" md-flex="5"> -->
        <md-menu
          md-align-trigger
          md-direction="bottom left"
          v-click-outside="outsideLabel"
          @open="openMenuLabel"
          @close="closeMenuLabel"
        >
          <div md-menu-trigger="">
            <i id="sales_ac_Excel Report" aria-hidden="true" class="md-icon material-icons mt-3"
              >more_vert</i
            >
          </div>
          <md-menu-content class="-no-y-scroll ">
            <md-menu-item
              v-for="item in $store.getters.all_tag_lable['ACT']"
              :key="item.id"
              class="pv-0 height-35"
              @click="showMdsCard()"
            >
              <label
                v-if="item.taglabel == act_report_selected"
                class="md-body-1 -oranges  robotoFont"
                >{{ item.tagname }}</label
              >
              <label v-else class="md-body-1  robotoFont">{{
                item.tagname
              }}</label>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
      <!-- </md-layout>  -->
    </md-layout>
    <md-snackbar
      :md-position="snk.vertical + ' ' + snk.horizontal"
      ref="snackbar"
      :md-duration="snk.duration"
    >
      <span>{{ snk.txt_warning }}</span>
      <md-button class="md-accent -oranges" @click="$refs.snackbar.close()"
        >AGREE</md-button
      >
    </md-snackbar>
    <div
      v-show="showCard"
      class="mds-card"
      id="mds-card-export-myback"
      style="z-index:100"
      :style="{
       
        top: '130px',
        right: '2%',
        width: '600px',
        left: '30%',
        top: '35%'
      }"
    >
      <div class="title">
        <div style="width:95%" class="left">
          {{ 'Export to email' }}
        </div>
        <div style="width:5%;cursor:pointer" @click="closeMdsCard()">
          <md-icon>close</md-icon>
        </div>
      </div>
      <div class="body">
        <div style="padding-left: 8%;padding-right: 9%;">
          <md-input-container>
            <md-textarea v-model="emailInput"></md-textarea>
          </md-input-container>
          <div v-if="incorrectEmail.length > 0" class="email-error">
            email format is incorrect
          </div>
        </div>
      </div>
      <div class="footer">
        <md-button
          style="height:36px;margin:0 0 0 15px;border-radius:3px;font-size:12px;"
          @click="closeMdsCard()"
          >CANCEL</md-button
        >
        <md-button
          style="height:36px;margin:0 0 0 15px;border-radius:3px;font-size:12px;"
          @click="exportData('google')"
          >SEND</md-button
        >
      </div>
    </div>
  </md-layout>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import service from '@/services/activity/checkin'
export default {
  data () {
    return {
      shReport: false,
      act_report_selected: '',
      snk: {
        vertical: 'top',
        horizontal: 'center',
        duration: 7000,
        txt_warning: 'Exporting data is empty.'
      },
      tempStatus: 'all',
      emailInput: '',
      showCard: false,
      incorrectEmail: []
    }
  },
  computed: {
    act_email () {
      return this.$store.getters['act_email']
    },
    act_customer_selected () {
      return this.$store.getters['act_customer_selected']
    },
    act_export_team () {
      return this.$store.getters['act_export_team']
    },
    act_export_sale () {
      return this.$store.getters['act_export_sale']
    },
    act_date () {
      return this.$store.getters['act_date']
    },
    act_statusp_selected () {
      return this.$store.getters['act_statusp_selected']
    }
  },
  methods: {
    exportData (mode) {
      if (mode === 'google') {
        let emails = this.emailInput.split(',')
        let checkMail = []
        let checkMailTrue = []
        emails.forEach(element => {
          if (_.trim(element).length > 0) {
            var lastAtPos = element.lastIndexOf('@')
            var lastDotPos = element.lastIndexOf('.')
            if (
              lastAtPos < lastDotPos &&
              lastAtPos > 0 &&
              element.indexOf('@@') == -1 &&
              lastDotPos > 2 &&
              element.length - lastDotPos > 2
            ) {
              checkMailTrue.push(element)
            } else {
              checkMail.push(element)
            }
          }
        })
        this.incorrectEmail = checkMail
        if (checkMail.length === 0) {
          this.closeMdsCard()

          let cust = ''
          let team = ''
          let sale = ''
          let type = 'team'
          if (this.act_customer_selected != '') {
            cust = this.act_customer_selected.id
          }
          if (this.act_export_team == '') {
            team = Vue.localStorage.get('emp_id')
          } else {
            team = this.act_export_team
          }

          if (this.act_export_sale == '') {
            sale = Vue.localStorage.get('emp_id')
          } else {
            type = 'salesman'
            sale = this.act_export_sale
          }

          if (Vue.localStorage.get('department') == 'SM') {
            type = 'salesman'
          }
          let obj = {
            email: checkMailTrue,
            emp_id: sale,
            date: this.act_date.value,
            customer_id: cust,
            status: this.act_statusp_selected,
            team: team,
            type: type
          }
          service
            .gSheetsAct(obj)
            .then(response => {})
            .catch()
        }
      } else {
        this.$emit('export', mode)
      }
    },
    showMdsCard () {
      this.botton = 'export'
      let email = ''
      if (this.act_email.length > 0) {
        email = _.cloneDeep(this.act_email)
      }
      this.emailInput = email
      this.showCard = true
    },
    closeMdsCard () {
      this.botton = null
      this.showCard = false
    },
    selectStatus (key) {
      // google analytics
      switch (key) {
        case 'visit':
          this.$ga.event(this.$ga_key.Activity_Checkin_FilterVisit)
          break
        case 'unplanned':
          this.$ga.event(this.$ga_key.Activity_Checkin_Unplanned)
          break
        case 'incomplete':
          this.$ga.event(this.$ga_key.Activity_Checkin_Incomplete)
          break
      }

      this.tempStatus = key
      this.$store.dispatch('setStatusPlanService', key)
    },
    openShowReport () {
      if (this.shReport == false) {
        this.shReport = true
      } else {
        this.shReport = false
      }
    },
    outsideShowReport: function (e) {
      if (e.target.className != 'md-input') {
        this.shReport = false
      }
    },
    selectReport (key) {
      this.shReport = false
      this.act_report_selected = key.taglabel

      if (
        (this.$store.getters.act_statusp_selected == 'visit' &&
          this.$store.getters.act_count_visits == 0) ||
        (this.$store.getters.act_statusp_selected == 'unplanned' &&
          this.$store.getters.act_unplanned == 0) ||
        (this.$store.getters.act_statusp_selected == 'incomplete' &&
          this.$store.getters.act_incomplete == 0) ||
        (this.$store.getters.act_statusp_selected == 'all' &&
          this.$store.getters.act_count_visits == 0 &&
          this.$store.getters.act_incomplete == 0 &&
          this.$store.getters.act_unplanned == 0)
      ) {
        this.$refs.snackbar.open()
        this.snk.mode = 'submit'
        return
      }
      if (key.taglabel == 'EXCEL') {
        this.$ga.event(this.$ga_key.Activity_Checkin_ExcelReport) // google analytics
        this.$store.commit(
          'SET_PATH_EXPORT_REPORT',
          Vue.config['urlReport'] + '/excel-export'
        )
      } else if (key.taglabel == 'PDF') {
        this.$store.commit(
          'SET_PATH_EXPORT_REPORT',
          Vue.config['urlReport'] + '/pdf-export'
        )
      }
      this.$store.dispatch('setExportReportService')
    },
    outsideLabel: function (e) {
      if (this.screenX != e.screenX) {
        if (this.$store.getters.act_shw_report == true) {
          this.$store.commit('SET_SHOW_REPORT', false)
          return
        }
      }
    },
    closeMenuLabel () {
      this.$store.commit('SET_SHOW_REPORT', false)
    },
    openMenuLabel () {
      this.$store.commit('SET_SHOW_REPORT', true)
    }
  },
  directives: {
    'click-outside': {
      bind: function (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) {
            warn += `Found in component '${compName}'`
          }
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },
      unbind: function (el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.md-report-bar {
  .mds-card {
    position: absolute;
    background: #ffffff;
    z-index: 2;
    border-radius: 4px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    .title {
      font-family: roboto;
      font-size: 20px;
      display: flex;
      padding: 20px 30px;
      font-weight: bold;
    }
    .body {
      .md-input-container {
        overflow-y: auto;
        overflow-x: hidden;
        padding: 3px 10px;
        border: 1px solid #fd7f00;
        border-radius: 4px;
        margin: 0px;
        height: 75px;
        &::-webkit-scrollbar {
          height: 7px;
          width: 5px;
          background: #ffffff;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #a8a8a8;
          border-radius: 5px;
        }
      }
      .md-input-container:after {
        background-color: unset;
      }
      .email-error {
        text-align: left;
        padding-top: 5px;
        color: #f44336;
        font-size: 14px;
      }
      .remark {
        text-align: left;
        padding-bottom: 30px;
        padding-left: 10%;
        padding-right: 10%;
        color: #757575;
      }
    }
    .footer {
      padding-top: 15px;
      padding-bottom: 10px;
      padding-right: 20px;
      justify-content: flex-end;
      display: flex;
      .md-button {
        color: #fd7f00;
        font-weight: bold;
        font-size: 14px;
      }
    }
  }

   @media screen and (min-width: 1300px)  {
   
  }

    @media screen and (max-width: 1200px)  {
     .res_font{
      font-size: 9px;
    }
    .res_font_number{
      font-size: 10px;
    }
    }

}
</style>
