<template>
  <div class="full-calendar-header">
    <div class="header-left">
      <slot name="header-left">
      </slot>
    </div>
    <div class="header-center">
       <md-button  @click="openMonthPicker" style="width:250px"> <!--v-click-outside="outsideMonth" -->
          <span class="pt-10 md-subheading -font-18 -gray-72"><b>{{hd.title}}</b></span>
          <md-icon class="ml-8 mt-5 -gray-41" :class="hd.monthPickerClassClose">expand_more</md-icon>
          <md-icon class="ml-8 mt-5 -gray-41" :class="hd.monthPickerClass">expand_less</md-icon>
        </md-button>
        <!-- Start Month Picker-->
          <md-layout md-align="center">
            <md-card :class="hd.monthPickerClass">
                <md-card-header class="head-callendar">
                    <md-layout>
                        <md-layout md-align="start" md-flex="10">
                            <md-button @click.stop="goPrev">
                                <md-icon>chevron_left</md-icon>
                            </md-button>
                        </md-layout>
                        <md-layout md-align="center" md-flex="80">
                          <md-button class="pr-20 pl-10" @click="openYearPicker">
                            <label class="md-body-2 pl-18">
                              <span class="md-body-1 pt-10">{{hd.txt_year}}</span>
                            </label>
                          </md-button>
                        </md-layout>
                        <md-layout md-align="end" md-flex="10">
                            <md-button @click.stop="goNext">
                                <md-icon>chevron_right</md-icon>
                            </md-button>
                        </md-layout>
                    </md-layout>
                </md-card-header>
                <md-card-content class="ph-0 pv-0">
                    <md-layout  class="ph-10 pv-10">
                        <md-layout md-align="center" v-for="(items, idx) in hd.arr_months" 
                            class="month-layout" 
                            v-if="hd.show_mh == true"> 
                            <div class="month-box" @click="selectMonth(items)">
                                {{items.month_name}}
                            </div>
                        </md-layout>
                        <md-layout md-align="center" v-for="(items, idx) in hd.arr_year" 
                            class="month-layout" 
                            v-if="hd.show_mh == false"> 
                            <div class="month-box" @click="selectYear(items)">
                                {{items}}
                            </div>
                        </md-layout>
                    </md-layout>
                </md-card-content>
            </md-card>
          </md-layout>
    </div>
    <div class="header-right">
      <md-button class="-gray-A8 pr-20 pl-10" @click="approveClick">
        <md-icon md-verticalstatus-plan-align="center">done</md-icon>
        <label class="md-body-2 pl-18">
          <b>{{hd.txt_button}}</b>
        </label>
      </md-button>
    </div>
  </div>
</template>
<script>
import dateFunc from './dateFunc'
import Vue from 'vue'

let check_month = true;
  export default {
    created () {
      this.dispatchEvent()
    },
    props : {
      currentDate : {},
      titleFormat : {},
      firstDay    : {},
      monthNames  : {}
    },
    data () {
      return {
        hd:{
          title      : '',
          txt_button : '',
          show_mh : false,
          txt_year : dateFunc.format(new Date(), 'yyyy'),
          arr_year : this.randomYear('now'),
          arr_months : dateFunc.getFullMonth(),
          monthPickerClass: 'hide-tag month-body',
          monthPickerClassClose: 'show-tag month-body',
        },
        headDate : new Date(),
      }
    },
    watch : {
      currentDate (val) {
        if (!val) return
        this.headDate = val
        if(this.$router.history.current.name == 'tripplan-approve'){
            this.hd.txt_button = 'APPROVE'
        }else if(this.$router.history.current.name == 'tripplan-tripplan'){
            this.hd.txt_button = 'SUBMIT'
        }
      }
    },
    methods : {
      goPrev () {
        console.log("show_mh => " ,this.show_mh)
        if(this.hd.show_mh == true){
          this.headDate = this.changeMonth(this.headDate, -12)
        }else{
          this.randomYear("goPrev")
        }
        this.hd.txt_year = parseInt(dateFunc.format(this.headDate, 'yyyy'));
        this.dispatchEvent()
      },
      goNext () {
        if(this.hd.show_mh == true){
          this.headDate = this.changeMonth(this.headDate, 12)
        }else{
          this.randomYear("goNext")
        }
        this.hd.txt_year = parseInt(dateFunc.format(this.headDate, 'yyyy'));
        this.dispatchEvent()
      },
      changeMonth (date, num) {
        let dt = new Date(date)
        return new Date(dt.setMonth(dt.getMonth() + num))
      },
      openMonthPicker() {
        if (check_month == true) {
          this.hd.monthPickerClass = 'show-tag month-body'
          this.hd.monthPickerClassClose = 'hide-tag month-body'
          check_month = false;
          this.hd.show_mh = true;
        } else {
          this.hd.monthPickerClass = 'hide-tag month-body'
          this.hd.monthPickerClassClose = 'show-tag month-body'
          check_month = true;
          this.hd.show_mh = false;
        }
		  },
      openYearPicker() {
        this.hd.show_mh = false;
		  },
      selectYear(key) {
        this.hd.show_mh = true;
        this.hd.txt_year = key ;
        let dt = new Date(this.headDate)
        this.headDate = new Date(dt.setYear(key))
        this.hd.title = dateFunc.format(this.headDate, this.titleFormat, this.monthNames)
      },
      randomYear(key){
        let data_year = [];
        if(key == 'goPrev'){
          let key_year = this.hd.arr_year[0];
          this.hd.arr_year = [];
          for(let i=0;i<12; i++){
              this.hd.arr_year.push(key_year - 12 + i);
          }
        }else if(key == 'goNext'){
          let key_year = this.hd.arr_year[this.hd.arr_year.length-1];
          this.hd.arr_year = [];
          for(let i=0;i<12; i++){
              this.hd.arr_year.push(key_year + 12 + i);
          }
        }else{
          let key_year = parseInt(dateFunc.format(new Date(), 'yyyy'));
          for(let i=0;i<12; i++){
              data_year.push(key_year - 6 + i);
          }
            return data_year;
        }
      },
      selectMonth(key) {
          let current_month = parseInt(dateFunc.format(this.headDate,'M'));
          let select_month = key.month_id - current_month
          this.headDate = this.changeMonth(this.headDate, select_month)
          this.dispatchEvent()
          this.hd.monthPickerClass = 'hide-tag month-body'
          this.hd.monthPickerClassClose = 'show-tag month-body'
          check_month = true;
      },
      dispatchEvent() {
        this.hd.title = dateFunc.format(this.headDate, this.titleFormat, this.monthNames)

        let startDate = dateFunc.getStartDate(this.headDate)
        let curWeekDay = startDate.getDay()
        // 1st day of this monthView
        let diff = parseInt(this.firstDay) - curWeekDay
        if (diff) diff -= 7
        startDate.setDate(startDate.getDate() + diff) 
        // the month view is 6*7
        let endDate = dateFunc.changeDay(startDate, 41)
        // 1st day of current month
        let currentDate = dateFunc.getStartDate(this.headDate)

        this.$emit('change', 
          dateFunc.format(startDate, 'yyyy-MM-dd'),
          dateFunc.format(endDate, 'yyyy-MM-dd'),
          dateFunc.format(currentDate,'yyyy-MM-dd'),
          this.headDate
        )
      },
      approveClick() {
        this.$emit('approveclick')
      },
    },
  }
</script>

