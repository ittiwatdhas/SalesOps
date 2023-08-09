<template>
  <div>
  <md-layout> 
      <md-layout md-flex-small="100" md-flex-medium="45" md-flex-large="45" class="mr-5"> 
          <div style="width:100px" @click="focusHandlerStart" >
            <md-card class="-large -round-border selet-time-pointer -no-y-scroll" :class="dateborderCls">
              <md-layout md-gutter :class="datepickCls" style="width:67px">
                <md-layout md-column md-gutter style="height: 75px !important;">
                  <md-layout md-flex="60" md-align="center">
                      <div class="mt-15" >
                          <span class="md-display -font-28 mr-5" :class="viewCls" style="font-family: Lato !important;">{{startHour}}</span>
                          <span class="md-display -font-14" :class="viewCls" style="font-family: Lato !important; float:right;">{{startMinutes}}</span>
                      </div> 
                  </md-layout>
                  <md-layout  md-align="center">
                    <div class="time-out">
                      <span class="md-display -font-11"  :class="viewUnitCls" style="font-family: Lato !important;font-weight: bold;">start time</span>
                    </div>
                  </md-layout>
                </md-layout>
              </md-layout>
            </md-card>
          </div>
      </md-layout> 
       <md-layout md-flex-small="100" md-flex-medium="45" md-flex-large="45"> 
          <div style="width:100px" @click="focusHandlerEnd" >
            <md-card class="-large -round-border selet-time-pointer -no-y-scroll" :class="dateborderCls">
              <md-layout md-gutter :class="datepickCls" style="width:67px;margin:left:3px">
                <md-layout md-column md-gutter style="height: 75px !important;">
                  <md-layout md-flex="60"  md-align="center">
                      <div class="mt-15">
                          <span class="md-display -font-28 mr-5" :class="viewCls" style="font-family: Lato !important;">{{endHour}}</span>
                          <span class="md-display -font-14" :class="viewCls" style="font-family: Lato !important;float:right;">{{endMinute}}</span>
                      </div>
                  </md-layout>
                  <md-layout md-align="center">
                    <div  class="time-out">
                      <span class="md-display -font-11" :class="viewUnitCls" style="font-family: Lato !important;font-weight: bold;"> until</span>
                    </div>
                  </md-layout>
                </md-layout>
              </md-layout>
            </md-card>
          </div>
      </md-layout> 
  </md-layout> 
    <transition name="movedown-fade">
      <div 
        class="timepicker"
        v-if="showPicker"  v-click-outside="outsideTimepicker">
          <div class="clock-wrap">
            <div class="clock">
              <div class="timedisplay">
                <div class="innerdisplay">
                  <div class="time-left"></div>
                  <div class="showtime"> 
                    <span 
                      class="hour"  @click="mode = 'hour'"  :style="{ opacity: mode === 'hour' ? 1 : 0.7 }">{{fixHour(hour)}}</span>
                    <span>:</span>
                    <span class="minutes" @click="mode = 'minutes'"
                      :style="{ opacity: mode === 'minutes' ? 1 : 0.7 }">{{fixMinutes(minutes)}}</span>
                  </div>
                  <div class="time-right">
                    <div style="flex: 1 1 0%; position: relative; font-size: 14px;">
                      <div class="-pointer" style="opacity: 0.7; margin-right: 40px;font-family: Lato !important;" @click="PM" :class="pmCls"> PM</div>
                      <div class="-pointer" style="position: absolute; opacity: 0.7; top: -15px;font-family: Lato !important;" @click="AM" :class="amCls">AM</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="clockpanel">
                <div class="clockbg"></div>
                <div class="hourpicker">
                  <div class="selector"  :style="selectorRotateAngle"></div>
                  <span style="font-family: Lato !important;font-size:12px;" v-if="rangeTime == 'am'"
                      class="hourtxt" v-for="i in 12" :style="getHourStyle(i % 12)"
                      @click="mode === 'hour' ? hour = i : minutes = 5 * i">
                      <!-- {{mode === 'hour' ? i : (5 * i) % 60 || '00'}} -->
                      {{mode === 'hour' ? i== 12 ? i=0 :i : (5 * i) % 60 || '00'}}
                    </span>
                    <span style="font-family: Lato !important;font-size:12px;" v-if="rangeTime == 'pm'"
                      class="hourtxt" v-for="i in 12" :style="getHourStyle(i % 12)"
                      @click="mode === 'hour' ? hour = i : minutes = 5 * i">
                      {{mode === 'hour' ?  i == 12 ? i = 12 : i + 12 : (5 * i) % 60 || '00'}}
                      <!-- {{mode === 'hour' ? i + 12 : (5 * i) % 60 || '00'}} -->
                    </span>
                </div>
              </div>
              <span class="txtWarning">{{txtWarning}}</span>
              <div class="actionbuttons">
                <button @click="showPicker = false"><span>CANCEL</span></button>
                <button @click="selectStartTime({})"><span>OK</span></button>
              </div>
            </div>
          </div>
      </div>
    </transition>
    <div 
      class="mask" 
      @click="showPicker=false"
      :style="{ opacity: showPicker ? 1 : 0, left: showPicker ? 0 : '-100%'}"></div>
  </div>

</template>

<script>
const positions = [
  [0, 5],//[0, 5],
  [40, 15],//[54.5, 16.6],
  [70, 40], //[94.4, 59.5],
  [80, 80], //[109, 114],
  [70, 120], //[94.4, 168.5],
  [40, 150],// [54.5, 208.4],
  [0, 160],//[0, 223],
  [-40, 150],//[-54.5, 208.4],
  [-70, 120],//[-94.4, 168.5],
  [-80, 80],//[-109, 114],
  [-70, 45],//[-94.4, 59.5],
  [-40, 19.6] //[-54.5, 19.6]
]
export default {
  name: 'hello',
  props : {
     value : {}
  },
  data () {
    return {
      showPicker: false,
      mode: 'hour',
      time: '',
      hour: 12,
      minutes: 0,
      dateborderCls : '-orange',
      viewUnitCls: '-gray-9A',
      viewCls:'-gray-41',
      datepickCls: 'date-body',
      setMode : '',
      txtWarning : '',
      pmCls:'',
      amCls:'',
      rangeTime : 'am',
      selectorCls : ''
      // runHour : 12,
      // startHour : '09',
      // startMinutes : '00',
    }
  },
  computed: {
    selectorRotateAngle () {
      if (this.mode === 'hour') {
        return {
          transform: `rotateZ(${this.hour * 30 + 'deg'})`
        }
      } else {
        return {
          transform: `rotateZ(${this.minutes * 6 + 'deg'})`
        }
      }
    },
    startHour(){
     if(this.value.length >= 4){
        let val =  this.value.strHour < 10 ? '0' + this.value.strHour : this.value.strHour + '';
        (parseInt(val) > 12) ? this.PM(): this.AM();
        this.hour = parseInt(val);
        return val;
      }else{
        return this.hour < 10 ? '0' + this.hour : this.hour + ''
      }
    },
    startMinutes(){
     if(this.value.length >= 4){
        let val =  this.value.startMinute < 10 ? '0' + this.value.startMinute : this.value.startMinute + '';
        this.minutes = parseInt(val);
        return val;
      }else{
        return this.minutes < 10 ? '0' + this.minutes : this.minutes + ''
      }
    },
    endHour(){
     if(this.value.length >= 4){
        let val =  this.value.endHour < 10 ? '0' + this.value.endHour : this.value.endHour + '';
        this.hour = parseInt(val);
        (parseInt(val) > 12) ? this.PM(): this.AM();
        return val;
      }else{
        return this.hour < 10 ? '0' + this.hour : this.hour + ''
      }
    },
    endMinute(){
     if(this.value.length >= 4){
        let val =  this.value.endMinute < 10 ? '0' + this.value.endMinute : this.value.endMinute + '';
        this.minutes = parseInt(val);
        return val;
      }else{
        this.AM()
        return this.minutes < 10 ? '0' + this.minutes : this.minutes + ''
      }
    }
  },
  methods: {
    focusHandlerStart (e) {
      this.txtWarning='';
      (parseInt(this.value.strHour) >= 12)? this.PM() : this.AM();
      // (parseInt(this.value.strHour) > 12)? this.PM() : this.AM();
      this.hour =  this.value.strHour;
      this.minutes =  this.value.startMinute ;
      this.setMode = 'start';
      e.target.blur()
      if(this.showPicker == true){
        this.showPicker = false
      }else{
        this.showPicker = true
      }
    },
    focusHandlerEnd (e) {
       this.txtWarning='';
      (parseInt(this.value.endHour) >= 12)? this.PM() : this.AM();
      // (parseInt(this.value.endHour) > 12)? this.PM() : this.AM();
       this.hour =  this.value.endHour;
       this.minutes =  this.value.endMinute;
       this.setMode = 'end';
       e.target.blur()
      this.showPicker = true
    },
    getHourStyle (i) {
        const hasSelected = (this.mode === 'hour' &&  this.hour % 12 === i) 
          || (this.mode === 'minutes' && this.minutes % 60 === i * 5)
        const styleObj = {
          transform: `translate(${positions[i][0] + 'px'}, ${positions[i][1] + 'px'})`,
          background: hasSelected ? '#FD7F00' : 'rgba(255, 255, 255, 0)',
          /*background: hasSelected ? 'rgb(0, 188, 212)' : 'rgba(255, 255, 255, 0)',*/
          color: !hasSelected ? '#2c3e50' : '#FFF'
        }
        return styleObj
    },
    fixHour (h) {
      if(this.rangeTime == 'am'){
        return h < 10 ? '0' + h : h
      }else{
        return (h < 13 && h!=12) ? h + 12 : h;
        // return (h < 13 ) ? h + 12 : h;
      }
    },
    fixMinutes (m) {
      return m % 60 < 10 ? '0' + m % 60 : m % 60
    },
    selectStartTime (obj) {
      let hour = this.hour
      let minutes = this.minutes
      let H = (hour == 60)? 0: hour;
      let m = (minutes == 60)? 0: minutes;
      // console.log(this.rangeTime);
      // console.log(H);
      let countH = 0;
      // let countH = (this.rangeTime == 'am')? H : H + 12;
      if(this.rangeTime == 'am'){
        countH = H;
      }else{
        if(H == 12){
        // if(H == 24){
          countH = H
        }else{
          if(H<13){
             countH = H + 12;
          }else{
            countH = H
          }
         
        }
      }
      if(this.setMode == 'start'){
        if(countH == 23 ){
          this.value.endHour = 0;
          // this.value.endHour = 24;
          this.value.endMinute = 0;
        }else if(H == 23){
          countH=23;
          this.value.endHour = 0;
          // this.value.endHour = 24;
          this.value.endMinute = 0;
        } 
        // else if(countH == 24){
        //   this.value.endHour = 24;
        //   this.value.endMinute = 0;
        //   m=0;
        // }
        else if(countH > parseInt(this.value.endHour)){
          this.value.endHour= countH+1;
          this.value.endMinute = m;
        }else if(countH == parseInt(this.value.endHour) && (minutes > parseInt(this.value.endMinute)||minutes == parseInt(this.value.endMinute))){
          this.value.endHour = countH + 1;
          this.value.endMinute = m;
        }
        // if(countH > parseInt(this.value.endHour)){
        //   this.txtWarning =" Start time over " + this.endHour + ":" + this.endMinute;
        // }else if(countH == parseInt(this.value.endHour) && minutes > parseInt(this.value.endMinute)){
        //     this.txtWarning =" Start time over " + this.endHour + ":" + this.endMinute;
        // }else{
          let obj = {
            strHour: countH, 
            startMinute: m,
            endHour: this.value.endHour,
            endMinute: this.value.endMinute,
            setMode : this.setMode,
            rangeTime : this.rangeTime,
            length : 6
          }
          this.txtWarning ="";
          this.showPicker = false
          this.$emit("selectstarttime" , obj);
        // }
      }else{
        // console.log("end---"+countH);
        let minSelect = minutes;
        if(minutes==60){
          minSelect = 0;
        }
        if(countH < parseInt(this.value.strHour) && countH!=0){
        // if(countH < parseInt(this.value.strHour)){
            this.txtWarning = this.startHour + ":" + this.startMinutes + " less than Until" ;
        }else if(countH == parseInt(this.value.strHour) && minSelect <= parseInt(this.value.startMinute)){
           this.txtWarning = this.startHour + ":" + this.startMinutes + " less than Until" ;
        }
        else if(countH == 0 && minutes > 0 && minutes != 60 && parseInt(this.value.strHour)!=0){
          this.txtWarning = "Until less than 00 : 00" ;
          // this.txtWarning = "Until less than " + countH + ": 00" ;
        }
        else{
          let obj = {
            strHour: this.value.strHour, 
            startMinute: this.value.startMinute,
            endHour: countH,
            endMinute: m,
            setMode : this.setMode,
            rangeTime : this.rangeTime,
            length : 6
          }
           this.txtWarning ="";
           this.showPicker = false
           this.$emit("selectstarttime" , obj);
        }
      }
    },
    PM(){
      this.rangeTime = 'pm';
      this.pmCls = 'rangTime';
      this.amCls = '';
      this.selectorCls = '';
      // console.log('PM=>');
    },
    AM(){
      this.rangeTime = 'am';
      this.pmCls = '';
      this.amCls = 'rangTime';
      this.selectorCls = '';
      // console.log('AM=>');
    },
    outsideTimepicker: function (e) {
      if(e.target.className!='md-display -font-28 mr-5 -gray-41' 
      && e.target.className!= 'md-display -font-14 -gray-41'
      && e.target.className!= 'md-layout md-flex-60 md-align-center'
      && e.target.className!= 'md-layout md-align-center'
      && e.target.className!= 'md-display -font-11 -gray-9A'
      && e.target.className!= 'mt-15'
      && e.target.className!= 'md-display -font-11 -gray-9A'
      && e.target.className!= 'time-out'
      && e.target.className!= ''
      ){
          this.showPicker = false;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-family: Roboto;
}
input {
  outline: none;
}
.mask {
 /* position: fixed;
  top: 0;
  left: 0;
  z-index: 1400;
  will-change: opacity;
  width: 100%;
  height: 100%;
  /*background: rgba(0, 0, 0, 0.541176);*/
  /*transition: opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;*/
}
.movedown-fade-enter-active, .movedown-fade-leave-active {
  transition: all .5s ease;
}
.movedown-fade-enter, .movedown-fade-leave {
  transform: translate3d(0, -20px, 0);
  opacity: 0;
}
.timepicker {
  position: fixed;
  /*top: 0;*/
  left: 0;
  z-index: 1500;
  width: 100%;
  /*height: 100%;*/
  /*margin-left:150px;*/
  padding-top: 0px;
}
.clock-wrap {
  width: 220px;
  max-width: 220px;
  border-radius: 2px;
  margin: 0 auto;
  background-color: rgb(255, 255, 255)
}
.clock {
  width: 220px;
  box-shadow: 1px 2px 5px 0 rgba(0, 0, 0, 0.38), 0 0 4px 0 rgba(0, 0, 0, 0.08); 
  border-radius: 2px;
}
.timedisplay {
  /*padding: 14px 0;*/
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  background-color:#FD7F00;
  /*background-color: rgb(0, 188, 212);*/
  color: white;
}
.innerdisplay {
  margin: 6px 0px;
  line-height: 58px;
  height: 58px;
  font-size: 58px;
  display: flex;
  justify-content: center;
  align-items: baseline;
}
.time-left, .time-right {
  flex: 1 1 0%;
  position: relative;
  line-height: 17px;
  height: 17px;
  font-size: 17px;
}
.showtime {
  margin: 0px 10px;
  font-size: 35px;
}
.hour, .minutes {
  cursor: pointer;
  font-family: Lato !important;
}
.clockpanel {
  height: 220px;
  padding: 10px;
  position: relative;
  box-sizing: content-box;
}
.clockbg {
  position: absolute;
  top: 20px;
  width: 200px;
  height: 200px;
  border-radius: 100%;
  background-color: #F8F8F8
  /*background-color: rgba(0, 0, 0, 0.0666667);*/
}
.hourpicker {
  height: 100%;
  width: 100%;
  border-radius: 100%;
  position: relative;
  /*pointer-events: none;*/
  box-sizing: border-box;
  
}
.hourtxt {
  display: inline-block;
  position: absolute;
  width: 32px;
  height: 28px;
  border-radius: 100%;
  left: calc(50% - 16px);
  top: 10px;
  text-align: center;
  padding-top: 5px;
  font-size: 1.1em;
  cursor: pointer;
  /*pointer-events: none;*/
}
.selector {
  height: 40%;
  background: #FD7F00;
  /*background: rgb(0, 188, 212);*/
  width: 2px;
  left: calc(50% - 1px);
  position: absolute;
  bottom: 52%;
  transform-origin: center bottom 0px;
  pointer-events: none;
}
.actionbuttons {
  padding: 8px;
 /* width: 100%;*/
  text-align: right;
  margin-top: 0px;
  border-top: none;
}
.actionbuttons button {
  border: 10px;
  box-sizing: border-box;
  display: inline-block;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  text-decoration: none;
  margin: 0px;
  padding: 0px;
  outline: none;
  font-size: inherit;
  font-weight: inherit;
  transform: translate(0px, 0px);
  height: 36px;
  line-height: 36px;
  min-width: 88px;
  color: #FD7F00;
  /*color: rgb(0, 188, 212);*/
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0);
  text-align: center;
  -webkit-user-select: none;
}
.actionbuttons span {
  font-family: Lato !important;
  position: relative;
  /*padding-left: 16px;*/
  /*padding-right: 16px;*/
  vertical-align: middle;
  letter-spacing: 0px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
}
.txtWarning {
    font-family: Lato !important;
     font-size: 1.1em;
     color: #797979 !important;
}
.rangTime{
  /*font-weight : 600;*/
  opacity: 2.7 !important;
}
</style>
