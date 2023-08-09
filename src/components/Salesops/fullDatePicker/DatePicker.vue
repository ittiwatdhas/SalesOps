<script>
  const dayMap = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  }
  const dayShortMap = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  }

  const monthMap = {
    0: 'JAN',
    1: 'FEB',
    2: 'MAR',
    3: 'APR',
    4: 'MAY',
    5: 'JUN',
    6: 'JUL',
    7: 'AUG',
    8: 'SEP',
    9: 'OCT',
    10: 'NOV',
    11: 'DEC'
  }

  const monthShortMap = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  }

  const slice = (array, start, end) => {
    let length = array == null ? 0 : array.length

    if (! length) {
      return []
    }
    start = start == null ? 0 : start
    end = end === undefined ? length : end

    if (start < 0) {
      start = -start > length ? 0 : (length + start)
    }

    end = end > length ? length : end

    if (end < 0) {
      end += length
    }

    length = start > end ? 0 : ((end - start) >>> 0)
    start >>>= 0

    let index = -1

    const result = new Array(length)

    while (++index < length) {
      result[index] = array[index + start]
    }

    return result
  }

  const chunk = (array, size) => {
    size = Math.max(size, 0)
    const length = array == null ? 0 : array.length
    if (! length || size < 1) {
      return []
    }
    let index = 0
    let resIndex = 0
    const result = new Array(Math.ceil(length / size))
    while (index < length) {
      result[resIndex++] = slice(array, index, (index += size))
    }
    return result
  }

  export default {
      props: {
        color: {
          type: String,
          required: false,
          default: '#009688'
        },

        min: {
          type: String,
          required: false
        },

        max: {
          type: String,
          required: false
        },

        value: {
          type: String,
          required: false
        },
        

    },
    computed: {
      specifiedDate () {
        return new Date(this.value)
      },
      calculatedDate () {
        return `${this.selectedYear}-${this.selectedMonth + 1}-${this.selectedDay + 1}`
      },
      strDayWord () {
        let date = new Date(this.value)
        return dayMap[date.getDay()]
      },
      abbrivatedDay () {
        let date = new Date(this.value)
        return dayMap[date.getDay()]
      },
      currentMonthWord () {
        const rs = this.value.split('-')
        return monthMap[parseInt(rs[1])]
      },
      strMonthWord () {
        const rs = this.value.split('-')
        return monthMap[parseInt(rs[1]) - 1]
      },
      selectedMonthWord () {
        const rs = this.value.split('-')
        return monthMap[parseInt(rs[1]) - 1]
      },
      strDay() {
        const rs = this.value.split('-')
        let val = (parseInt(rs[2])) < 10 ? '0' + (parseInt(rs[2])) : (parseInt(rs[2])) + ''
        return val
      },
      selectedDay() {
        const rs = this.value.split('-')
        let val = (parseInt(rs[2])) < 10 ? '0' + (parseInt(rs[2])) : (parseInt(rs[2])) + ''
        return val
      },
      strYear() {
        const rs = this.value.split('-')
        return parseInt(rs[0])
      },
      selectedYear() {
        const rs = this.value.split('-')
        return parseInt(rs[0])
      },
      selectedMonth() {
        const rs = this.value.split('-')
        return parseInt(rs[1])
      },
      selectedDayOfWeek() {
        let date = new Date(this.value)
        return date.getDay()
      },
      currentYear() {
        let date = new Date(this.value)
        return date.getFullYear()
      },
      currentMonth() {
        let date = new Date(this.value)
        return date.getMonth()
      },
      selecting() {
        return 'date'
      },
      minDate () {
        if (this.min) {
          const minDateSplit = this.min.split('-')
          return new Date(minDateSplit[0], minDateSplit[1], minDateSplit[2])
        }
        return
      },
      maxDate () {
        if (this.max) {
          const maxDateSplit = this.max.split('-')
          return new Date(maxDateSplit[0], maxDateSplit[1], maxDateSplit[2])
        }
        return
      },

      /**
       * Determines if the left arrow for the current date should be shown.
       *
       * @return {Boolean}
       */
      showLeftArrow () {
        // Show the left arrow when there is either no mininum date, or when the
        // minimum year and minimum month are the same as the current year and
        // current month.
        if (! this.min) return true

        if (this.minDate.getFullYear() === this.currentYear &&
            this.minDate.getMonth() - 1 === this.currentMonth) {
          return false
        }

        return true
      },

      /**
       * Determines if the right arrow for the current date should be shown.
       *
       * @return {Boolean}
       */
      showRightArrow () {
        // Show the right arrow when there is either no maximum date, or when
        // the maximum year and maximum month are the same as the current
        // year and current month.
        if (! this.max) return true

        if (this.maxDate.getFullYear() === this.currentYear &&
            this.maxDate.getMonth() - 1 === this.currentMonth) {
          return false
        }

        return true
      },
      calendar () {
          // The calendar's output is a function of all of the days in a given
          // month, chunked into an array of arrays, each containing 5 or 6
          // and 7 elements respectively.
          const days = []

          // Padding for the first row, e.g. if the month's first day starts on
          // Friday, the first array will be ['', '', '', '', '', '1', '2']
          const startOfMonthDay = new Date(this.currentYear, this.currentMonth, 1).getDay()

          for (let i = 0, len = startOfMonthDay; i < len; i++) {
            days.push('')
          }

          // Create an array containing all days in the current month
          const daysInMonth = 32 - new Date(this.currentYear, this.currentMonth, 32).getDate()

          for (let i = 0, len = daysInMonth; i < daysInMonth; i++) {
            days.push(i + 1)
          }

          // Map the days from numbers to objects that have current day,
          // selected, and disabled properties for the view.
          const today = new Date()

          const dayObjects = days.map((day) => {
            const currentDay = (day === today.getDate()) &&
                              (this.currentMonth === today.getMonth()) &&
                              (this.currentYear === today.getFullYear())

            const selected = (this.selectedDay + 1 === day) &&
                            (this.currentMonth === this.selectedMonth) &&
                            (this.currentYear === this.selectedYear)

            const disabled = this.dayDisabled(day)

            return { day, currentDay, selected, disabled }
          })

          // Chunk all of the days into an array of arrays, by seven.
          return chunk(dayObjects, 7)
        },
        years () {
          // Set the first year of the array.
          let firstYear

          if (this.min) {
            firstYear = this.minDate.getFullYear()
          } else if (this.value) {
            firstYear = this.specifiedDate.getFullYear()
          } else {
            firstYear = (new Date).getFullYear()
          }

          // Create a range of years to loop through which is either the maximum
          // date minus the first year, or simply 100.
          let through = this.max ? (this.maxDate.getFullYear() + 1) - firstYear : 101

          let years = []

          for (let i = firstYear, len = firstYear + through; i < len; i++) {
            years.push(i)
          }

          return years.map((year) => {
            return { year, selected: year === this.selectedYear }
          })
        }
      },
    created () {
      this.hideBodyOverflow(true)
      this.setEscapeEvent()
    },
    data: () => ({
      showClsDate : false,
      rs_date : '',
      rs_selectedYear :'',
      rs_shortDay :'',
      rs_shortMonthWord :'',
      rs_day :'',
    }),
    methods: {
      setSelecting (value) {
        // this.selecting = value;
        if (value === 'year') {
          this.$nextTick(() => {
            const container = document.querySelector('.calendar-year-select')
            const el = document.getElementById(`${this.selectedYear}-calendar-year`)
            container.scrollTop = (el.offsetTop - 100) - 76
          })
        }
      },
      setByDay (day) {
        // if (day.disabled) return
        if(day.disabled || day.day==''){
           return
        }
        this.rs_date = day;
        const rs = this.value.split('-')
        this.rs_selectedYear =  parseInt(rs[0])
        let select_day = rs[0] + '-' + rs[1] + '-' + day.day
        let date = new Date(select_day)
        this.rs_shortDay =  dayShortMap[date.getDay()]

        this.rs_shortMonthWord =  monthShortMap[parseInt(rs[1]) - 1]
        this.rs_day =  (day.day < 10 )? '0' + day.day : day.day + ''
      },
      setByMonth (month) {
        if (month === 12) {
          this.currentYear = this.currentYear + 1
          this.currentMonth = 0
          return
        }
        if (month === -1) {
          this.currentYear = this.currentYear - 1
          this.currentMonth = 11
          return
        }
        this.currentMonth = month
      },
      setByYear (year) {
        this.selectedYear = year
        this.currentYear = year
        this.selecting = 'date'
      },
      dayDisabled (day) {
        if (this.min &&
            (this.minDate.getMonth() - 1 === this.currentMonth &&
            this.minDate.getFullYear() === this.currentYear) &&
            day < this.minDate.getDate()) {
          return true
        }
        if (this.max &&
            (this.maxDate.getMonth() - 1 === this.currentMonth &&
            this.maxDate.getFullYear() === this.currentYear) &&
            day > this.maxDate.getDate()) {
          return true
        }

        return false
      },
      hideBodyOverflow (show) {
        const bodyEl = document.querySelector('body')
        if (show === true) {
          bodyEl.style.overflow = 'hidden'
          return
        }
        bodyEl.style.overflow = ''
      },
      setEscapeEvent () {
        document.addEventListener('keydown', (event) => {
          if (event.keyCode == 27 || event.key == 'Escape') {
            this.onClose()
          }
        })
      },
      saveDatepicker(){
          if(this.rs_date!=''){
              this.$emit("savedatepicker" , this.rs_date);
          }
            this.showClsDate = false;
      },
      openDatepicker(){
        if(this.showClsDate == true){
          this.showClsDate = false;
        }else{
          const rs = this.value.split('-')
          this.rs_selectedYear =  parseInt(rs[0])

          let date = new Date(this.value)
          this.rs_shortDay =  dayShortMap[date.getDay()]

          this.rs_shortMonthWord =  monthShortMap[parseInt(rs[1]) - 1]

          this.rs_day =  (parseInt(rs[2])) < 10 ? '0' + (parseInt(rs[2])) : (parseInt(rs[2])) + ''

          this.showClsDate = true;
        }
      },
      closeDatepicker(){
          this.showClsDate = false;
      },
      outsideDatepicker: function (e) {
        if(e.target.className!='' && e.target.className!='current-day'){
            this.showClsDate = false;
        }
		  },
    },
     directives: {
      'click-outside': {
        bind: function (el, binding, vNode) {
          // Provided expression must evaluate to a function.
          if (typeof binding.value !== 'function') {
            const compName = vNode.context.name
            let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
            if (compName) { warn += `Found in component '${compName}'` }
          }
          // Define Handler and cache it on the element
          const bubble = binding.modifiers.bubble
          const handler = (e) => {
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
      },
    }
  }
</script>
<template>
	<div class="date-picker-container">
        <div @click="openDatepicker"   v-click-outside="outsideDatepicker">
          <md-card class="-large -round-border selet-time-pointer -orange">
            <md-layout md-gutter class="date-body" >
              <md-layout md-column md-gutter style="width: 150px; height:75px">
                <md-layout md-flex="60" md-align="center">
                  <md-layout md-flex="40" md-align="end">
                    <div class="pl-10 mt-5">
                      <span class="md-display -font-36 -gray-41">{{selectedDay}}</span>
                    </div>
                  </md-layout>
                  <md-layout class="out-side">
                    <div class="pt-10" style="padding-left: 10px; text-align:left">
                      <span class="md-display -font-11 -gray-41">{{selectedMonthWord}} {{selectedYear}}</span>
                    </div>
                    <div style="padding-left: 10px; text-align:left;line-height:5px">
                      <span class="md-display -font-11 -gray-41" style="font-weight: bold;">
                        {{abbrivatedDay}}
                      </span>
                    </div>
                  </md-layout>
                </md-layout>
                <md-layout class="out-side" md-align="center">
                    <span class="md-display -font-9 -gray-9A" style="margin-top:0px;font-weight: bold;">
                      day
                    </span>
                </md-layout>
              </md-layout>
            </md-layout>
          </md-card>
        </div>
    </md-layout>
    <div class="calendar-container" v-if="showClsDate == true">
      <div class="calendar">
        <header :style="{ 'background-color': '#FD7F00' , 'color':'#fff' }" class="calendar-header">
            <span :class="{ 'calendar-faint': selecting === 'year' }"
                @click="setSelecting('date')">
               <span style="font-family: Lato!important;font-size:14px;opacity: 0.7;"> {{ rs_selectedYear }} </span> </br>
              <span style="font-family: Lato!important;font-size:20px">{{rs_shortDay}}, {{ rs_shortMonthWord }} {{rs_day}}</span>
            </span><!--{{ abbrivatedDay }}-->
        </header>

        <div class="calendar-body" v-if="selecting === 'date'">
          <div class="calendar-date">
            <div>
              <div class="calendar-arrows flex left" @click="setByMonth(currentMonth - 1)"
                   v-if="showLeftArrow">
              </div>
            </div>
            <div>
              <div class="calendar-arrows flex right" @click="setByMonth(currentMonth + 1)"
                   v-if="showRightArrow">
              </div>
            </div>
          </div>
          <table style="margin-top: 10px;">
            <thead>
              <tr style="color:#A8A8A8;font-family: Lato !important;" >
                <td><b>SUN</b></td>
                <td><b>MON</b></td>
                <td><b>TUE</b></td>
                <td><b>WED</b></td>
                <td><b>THU</b></td>
                <td><b>FRI</b></td>
                <td><b>SAT</b></td>
              </tr>
            </thead>

            <tbody>
              <tr v-for="days in calendar">
                <td :style="{
                      'color': day.currentDay && ! day.selected ? '#FD7F00;font-family: Lato !important;' : '','background-color;font-family: Lato !important;': day.selected ? '#FD7F00;font-family: Lato !important;' : ''}"
                    :class="{'current-day': day.currentDay, 'disabled': day.disabled,'selected': day.selected}"
                    v-for="day in days"
                    tabindex="0"
                    @click="setByDay(day)">{{ day.day }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="calendar-year-select" v-if="selecting === 'year'">
          <div :style="{ 'color': year.selected ? color : '' }"
               :class="{ 'selected': year.selected }"
               :id="`${year.year}-calendar-year`"
               v-for="year in years"
               @click="setByYear(year.year)">
            {{ year.year }}
          </div>
        </div>
        <div class="calendar-footer">
         <button :style="{ 'color': '#FD7F00' }" @click="closeDatepicker">CANCEL</button>
         <button :style="{ 'color': '#FD7F00' }" @click="saveDatepicker">OK</button>
        <!--
         -->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  *, *::before, *::after {
      box-sizing: inherit;
  }

  div, h2, h3, h4, table, tbody, thead, tr, td, button {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  button {
    border-radius: 2px;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    padding: 0 16px;
    outline: none;
    user-select: none;
  }

  .flex {
    display: flex;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .date-picker-container, .date-picker-background {
    overflow-y: auto;
    /*position: fixed;*/
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .date-picker-container {
    line-height: 1.5;
    z-index: 9998;
  }

  .date-picker-background {
    /*background-color: rgba(0, 0, 0, 0.5);*/
    z-index: 9999;
  }

  .calendar-faint {
    opacity: 0.75;
  }

  .calendar-container {
    background-color: #fff;
    border-radius: 2px;
    cursor: initial;
    position: fixed;    
    user-select: text;
    width: 280px;
    height: 380px;
    z-index: 100;
    user-select: none;
    margin-top:3px;
    overflow-x: hidden !important;
    overflow-y: hidden !important;
    box-shadow: 1px 2px 5px 0 rgba(0, 0, 0, 0.38), 0 0 4px 0 rgba(0, 0, 0, 0.08); 
  }

  .calendar {
    height: 290px; /*330*/
    width: 280px;
  }

  .calendar-header {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    color: #fff;
    display: flex;
    /*align-items: left;*/
    text-align:left;
    justify-content: space-between;
    padding: 16px 20px;
    font-size : 20px;
  }

  .calendar-header h2, .calendar-header h3 {
    cursor: default;
  }

  .calendar-header h2.calendar-faint, .calendar-header h3.calendar-faint {
    cursor: pointer;
  }

  .calendar-header h2 {
    font-size: 28px;
    line-height: 30px;
    margin-top: 3px;
  }

  .calendar-header h3 {
    font-size: 1.125rem;
    font-weight: 300;
  }

  .calendar-body {
    /*padding: 0px;*/
    width: 300px !important;    
  }

  .calendar-date {
    display: flex;
  }

  .calendar-date .calendar-arrows.left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .calendar-current-date {
    cursor: default;
    text-align: center;
  }

  .calendar-date .calendar-arrows.right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .calendar-date > div {
    width: 33.333%;
  }

  .calendar-date h4 {
    font-size: 14px;
    font-weight: 500;
  }

  .calendar-arrows {
    cursor: pointer;
    padding: 0 8px;
  }

  .calendar-body table {
    border-spacing: 2px;
    border-collapse: separate;
    cursor: default;
    font-size: 12px;
    margin: 8px;
    table-layout: fixed;
    text-align: center;
    height : 210px;
    /*width: 100%;*/
  }

  .calendar-body table thead {
    color: #757575;
  }

  .calendar-body table thead td, .calendar-body table thead td {
    cursor: default!important;
  }

  .calendar-body tr {
    height: 30px;
    vertical-align: middle;
  }

  .calendar-body td {
    border-radius: 50%;
    cursor: pointer;
    vertical-align: middle;
    transition: background-color .15s;
    width: 35px;
    font-size:12px;
    font-family: Roboto !important;
  }

  .calendar-body td:focus {
    outline: none;
  }

  .calendar-body tbody td:hover {
    /*background-color: #FD7F00;*/
    color : #FD7F00;
    /*background-color: rgba(0, 0, 0, 0.1);*/
  }

  .calendar-body td:empty {
    background-color: transparent!important;
    cursor: default;
  }

  .calendar-body td.current-day {
    font-weight: bold;
  }

  .calendar-body td.disabled {
    color: #c5c5c5;
    cursor: default;
    pointer-events: none;
  }

  .calendar-body td.selected {
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
  }

  .calendar-year-select {
    box-shadow: inset 0 -1px 1px rgba(0, 0, 0, 0.075);
    height: 353px;
    overflow-y: scroll;
    text-align: center;
  }

  .calendar-year-select div {
    cursor: pointer;
    padding: 8px 0;
    transition: background-color .15s;
  }

  .calendar-year-select div:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .calendar-year-select .selected {
    font-size: 24px;
  }

  .calendar-footer {
    position: absolute;
    bottom: 16px;
    right: 16px;
    margin-top:10px;
  }

  .calendar-footer button {
    background-color: transparent;
    border: 1px solid transparent;
    box-shadow: none;
  }

  .calendar-fade-enter-active, .calendar-fade-leave-active {
    transition: opacity .15s;
  }

  .calendar-fade-enter, .calendar-fade-leave-to {
    opacity: 0;
  }

  .date-picker-container .md-display{
    font-family: Lato
  }
</style>
