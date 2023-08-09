<template>
  <div class="full-calendar-body">
    <div class="weeks">
      <strong class="week" v-for="week in weekNames">{{week}}</strong>
    </div>
    <div class="dates" ref="dates">
      <div class="dates-bg">
        <div class="week-row" v-for="week in currentDates">
          <div class="day-cell" v-for="day in week"
            :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}">
            <p class="day-number">{{day.monthDay}}</p>
          </div>
        </div>
      </div>

      <!-- absolute so we can make dynamic td -->
      <div class="dates-events">
        <div class="events-week" v-for="week in currentDates">
          <div class="events-day" v-for="day in week" track-by="$index"
            :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}" @click.stop="selectThisDay(day, $event)">
            <p class="day-number">{{day.monthDay}}</p>
            <div class="event-box">

            <div class="event-item" v-for="event in day.events" v-show="event.cellIndex <= eventLimit"
                 :class="[classNames(event.cssClass), {
                  'is-start'   : isStart(event.start, day.date),
                  'is-end'     : isEnd(event.end,day.date),
                  'is-opacity' : !event.isShow
                  }]" 
                @click="eventClick(event,$event)">
                  <md-layout v-show="event.isShow" v-if="event.status == 'PA'" class="body-item status-plan-pa">
                    <md-layout md-align="start" class="-list-block" md-flex="80">
                      {{isBegin(event, day.date, day.weekDay)}}
                    </md-layout>
                    <md-layout md-align="end">
                       {{isBeginStatus(event, day.date, day.weekDay)}}
                    </md-layout>
                  </md-layout>
                  <md-layout v-show="event.isShow" v-if="event.status != 'PA'" class="body-item status-plan-a">
                    <md-layout md-align="start" class="-list-block -left" md-flex="80">
                       {{isBegin(event, day.date, day.weekDay)}}
                    </md-layout>
                    <md-layout md-align="end">
                       {{isBeginStatus(event, day.date, day.weekDay)}}
                    </md-layout>
                </md-layout>
              </div>
              <p v-if="day.events.length > eventLimit"
                class="more-link" @click.stop="selectThisDay(day, $event)">
                + {{day.events[day.events.length -1].cellIndex - eventLimit}} more
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- full events when click show more -->
      <div v-click-outside="outsideCalendar" class="more-events" v-show="showMore"
        :style="{left: morePos.left + 'px', top: morePos.top + 'px'}">
        <div class="more-header" md-align="end">
          <span class="title mr-5 pr-5" style="text-align:right"  @click.stop="showMore = false">{{moreTitle(selectDay.date)}}</span>
        </div>
        <div class="more-body">
          <ul class="body-list">
            <div v-for="event in selectDay.events">
              <md-layout v-show="event.isShow" v-if="event.status == 'PA'" class="body-item status-plan-pa">
                <md-layout md-align="start" class="event-item -list-block" md-flex="80">
                  {{event.title}}
                </md-layout>
                <md-layout md-align="end">
                  {{event.status}}
                </md-layout>
              </md-layout>
              <md-layout v-show="event.isShow" v-if="event.status != 'PA'" class="body-item status-plan-a">
                <md-layout md-align="start" class="event-item -list-block -left" md-flex="80">
                  {{event.title}}
                </md-layout>
                <md-layout md-align="end">
                  {{event.status}}
                </md-layout>
              </md-layout>
            </div>
            <md-layout md-align="end" class="mt-10" v-if="btn_status_plan == 1">
              <md-button class="md-icon-button md-raised -orange" @click="addPlanClick('onCalendar')">
                <md-icon>add</md-icon>
              </md-button>
            </md-layout>
          </ul>
        </div>
      </div>

      <slot name="body-card">

      </slot>

    </div>
  </div>
</template>
<script>
  import dateFunc from './dateFunc'
  import Vue from 'vue'

  export default {
    props : {
      currentDate : {},
      events      : {},
      weekNames   : {
        type : Array,
        default : []
      },
      monthNames  : {},
      firstDay    : {}
    },
    created () {
      this.events.forEach((item, index) => {
        item._id = item.id || index
        item.end = item.end || item.start
      })
    },
    data () {
      return {
        // weekNames : DAY_NAMES,
        weekMask : [1,2,3,4,5,6,7],
        // events : [],
        isLismit : true,
        eventLimit : 3,
        showMore : false,
        morePos : {
          top: 0,
          left : 0
        },
        selectDay : {},
        btn_status_plan : Vue.localStorage.get('status_plan'),
      }
    },
    watch : {
      weekNames (val) {
        //console.log('watch weekNames', val)
      }
    },
    computed : {
      currentDates () {

        if(this.$router.history.current.name == 'tripplan-approve'){
              this.btn_status_plan = 0;
        }else if(this.$router.history.current.name == 'tripplan-tripplan'){
              // console.log("body => " , Vue.localStorage.get('status_plan'));
              // console.log(this.$router.history.current.name);
              this.btn_status_plan = Vue.localStorage.get('status_plan');
        }
        return this.getCalendar()
      }
    },
    methods : {
      isBegin (event, date, index , field) {
        let st = new Date(event.start)

        if (index == 0 || st.toDateString() == date.toDateString()) {
          return event.title
        }
        return '　'
      },
      isBeginStatus (event, date, index , field) {
        let st = new Date(event.start)

        if (index == 0 || st.toDateString() == date.toDateString()) {
          return event.status
        }
        return '　'
      },
      moreTitle (date) {
        let dt = new Date(date)
        // return moment(String(dt)).format('D')
        return dt.getDate()
      },
      classNames (cssClass) {
        if(!cssClass) return ''
        // string  
        if (typeof cssClass == 'string') return cssClass

        // Array
        if (Array.isArray(cssClass)) return cssClass.join(' ')
        
        // else
        return ''
      },
      getCalendar () {
        // calculate 2d-array of each month
        // first day of this month
        let now = new Date() // today
        let current = new Date(this.currentDate)

        let startDate = dateFunc.getStartDate(current) // 1st day of this month

        let curWeekDay = startDate.getDay()

        // begin date of this table may be some day of last month
        let diff = parseInt(this.firstDay) - curWeekDay
        diff = diff > 0 ? (diff - 7) : diff

        startDate.setDate(startDate.getDate() + diff)
        let calendar = []

        for(let perWeek = 0 ; perWeek < 6 ; perWeek++) {

          let week = []

          for(let perDay = 0 ; perDay < 7 ; perDay++) {
            week.push({
              monthDay : startDate.getDate(),
              isToday : now.toDateString() == startDate.toDateString(),
              isCurMonth : startDate.getMonth() == current.getMonth(),
              weekDay : perDay,
              date : new Date(startDate),
              events : this.slotEvents(startDate)
            })

            startDate.setDate(startDate.getDate() + 1)
            // if (startDate.toDateString() == endDate.toDateString()) {
            //   isFinal = true
            //   break
            // }
          }
          calendar.push(week)
          // if (isFinal) break
        }
        return calendar
      },
      slotEvents (date) {

        // find all events start from this date
        let cellIndexArr = []
        let thisDayEvents = this.events.filter(day => {
          let dt = new Date(day.start)
          let st = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())
          let ed = day.end ? new Date(day.end) : st
          // console.log('slotEvt', st, ed, date)
          return date>=st && date<=ed
        })

        // sort by duration
        thisDayEvents.sort((a,b)=>{
          if(!a.cellIndex) return 1
          if (!b.cellIndex) return -1
          return a.cellIndex - b.cellIndex
        })

        // mark cellIndex and place holder
        for (let i = 0;i<thisDayEvents.length;i++) {
          thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || (i + 1)
          thisDayEvents[i].isShow = true
          if (thisDayEvents[i].cellIndex == i+1 || i>2) continue
          thisDayEvents.splice(i,0,{
            title : 'holder',
            cellIndex : i+1,
            start : dateFunc.format(date,'yyyy-MM-dd'),
            end : dateFunc.format(date,'yyyy-MM-dd'),
            isShow : false
          })
        }

        return thisDayEvents
      },
      isStart (eventDate, date) {
        let st = new Date(eventDate)
        return st.toDateString() == date.toDateString()
      },
      isEnd (eventDate,date) {
        let ed = new Date(eventDate)
        return ed.toDateString() == date.toDateString()
      },
      selectThisDay (day, jsEvent) {
        this.selectDay = day
        this.showMore = true
        this.morePos = this.computePos(event.target)
        this.morePos.top -= 100
        let events = day.events.filter(item =>{
          return item.isShow == true
        })
        this.$emit('moreclick', day.date, events, jsEvent)
      },
      computePos (target) {
        let eventRect = target.getBoundingClientRect()
        let pageRect = this.$refs.dates.getBoundingClientRect()
        return {
          left : eventRect.left - pageRect.left,
          top  : eventRect.top + eventRect.height - pageRect.top
        }
      },
      dayClick(day, jsEvent) {
        this.$emit('dayclick', day, jsEvent)
      },
      eventClick(event, jsEvent) {
        if (!event.isShow) {
          return
        }
        jsEvent.stopPropagation()
        let pos = this.computePos(jsEvent.target)
        this.$emit('eventclick', event, jsEvent, pos)
        console.log("event => ", event);
      },
      addPlanClick(key) {
        this.$emit('addplanclick' , key)
      },
      outsideCalendar: function (e) {
				this.showMore = false
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
      }
    }
  }
</script>

