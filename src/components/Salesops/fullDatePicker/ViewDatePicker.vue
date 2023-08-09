<template>
	<div style="margin-right:10px" class="ViewDatePicker">
          <md-card class="-large -round-border defaultCls -gray-DD">
            <md-layout md-gutter class="date-body" >
              <md-layout md-column md-gutter style="min-width: 120px; height:75px">
                <md-layout style="background-color:" md-flex="60" md-align="center">
                  <md-layout md-flex="40" md-align="end">
                    <div class="pl-10" style="margin-top:20px">
                      <span class="md-display -font-36 -gray-A8">{{selectedDay}}</span>
                    </div>
                  </md-layout>
                  <md-layout>
                    <div class="pt-10" style="padding-left: 10px; text-align:left">
                      <span class="md-display -font-11 -gray-A8">{{selectedMonthWord}} {{selectedYear}}</span>
                    </div>
                    <div style="padding-left: 10px; text-align:left;line-height:5px">
                      <span class="md-display -font-11 -gray-A8">
                        <b>{{abbrivatedDay}}</b>
                      </span>
                    </div>
                  </md-layout>
                 
                </md-layout> 
                <md-layout md-align="center">
                    <span class="md-display -font-9 -gray-A8" style="margin-top:0px">
                      <b>day</b>
                    </span>
                </md-layout>
              </md-layout>
            </md-layout>
          </md-card>
	</div>
</template>
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

export default {
  components: {
  },
  props: {
    value: {
      type: String,
      required: false
    }
  },
  data() {
    return {
        dateborderCls : '-gray-DD',
        viewUnitCls: '-gray-A8',
        viewCls:'-gray-A8',
        datepickCls: 'date-body',
      }
    },
    computed: {
       abbrivatedDay () {
        let date = new Date(this.value)
        return dayMap[date.getDay()]
      },
      selectedDay() {
        const rs = this.value.split('-')
        let val = (parseInt(rs[2])) < 10 ? '0' + (parseInt(rs[2])) : (parseInt(rs[2])) + ''
        return val
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
      selectedMonthWord () {
        const rs = this.value.split('-')
        return monthMap[parseInt(rs[1]) - 1]
      },
  },
}
  
</script>
<style>
  .ViewDatePicker .md-display{
    font-family: Lato
  }
</style>