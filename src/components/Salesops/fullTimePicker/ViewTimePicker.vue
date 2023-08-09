<template>
	<div>
    <md-layout> 
        <md-layout md-flex-small="100" md-flex-medium="45" md-flex-large="45"> 
        <div style="width:80px;">
            <md-card class="-large -round-border defaultCls -no-y-scroll" 
                    :class="dateborderCls">
            <md-layout md-gutter :class="datepickCls">
                <md-layout md-column md-gutter style="height: 74px;">
                <md-layout md-flex="60" md-align="center" md-vertical-align="center">
                    <div style="margin-top:15px">
                    <span class="md-display -font-28 mr-5" :class="viewCls" style="font-family: Lato !important;">{{startHour}}</span>
                    <span class="md-display -font-14" :class="viewCls" style="font-family: Lato !important;float:right;">{{startMinutes}}</span>
                    <br> 
                    </div>
                </md-layout>
                <md-layout md-align="center">
                    <div>
                    <span class="md-display -font-11" :class="viewUnitCls">
                        <b style="font-family: Lato !important;">start time</b>
                    </span>
                    </div>
                </md-layout>
                </md-layout>
            </md-layout>
            </md-card>
        </div>
        </md-layout> 
        <md-layout md-flex-small="100" md-flex-medium="45"  md-flex-large="45" style="margin-left:5px"> 
            <div style="width:100px">
            <md-card class="-large -round-border defaultCls  -no-y-scroll" 
                    :class="dateborderCls">
                <md-layout md-gutter :class="datepickCls">
                <md-layout md-column md-gutter style="height: 74px;">
                    <md-layout md-flex="60" md-align="center" md-vertical-align="center">
                    <div  style="margin-top:15px">
                        <span class="md-display -font-28 mr-5" :class="viewCls" style="font-family: Lato !important;">{{endHour}}</span>
                        <span class="md-display -font-14" :class="viewCls" style="font-family: Lato !important;float:right;">{{endMinute}}</span>
                        <br>
                    </div>
                    </md-layout>
                    <md-layout md-align="center">
                    <div>
                        <span class="md-display -font-11" :class="viewUnitCls">
                        <b style="font-family: Lato !important;">util</b>
                        </span>
                    </div>
                    </md-layout>
                </md-layout>
                </md-layout>
            </md-card>
            </div>
        </md-layout> 
        </md-layout> 
	</div>
</template>
<script>

export default {
  components: {
  },
  props: {
      value : {}
  },
  data() {
    return {
        strHours: this.strDefaultHour,
        endHours: this.endDefaultHour,
        startMinute: this.strDefaultMinute,
        endMinutes: this.endDefaultMinute,
        startFocused: this.startDefaultFocused,
        endFocused: this.endDefaultFocused,
        startOverElement: false,
        endOverElement: false,
        dateborderCls : '-gray-DD',
        viewUnitCls: '-gray-A8',
        viewCls:'-gray-A8',
        datepickCls: 'date-body',
      }
    },
    computed: {
    startHour(){
     if(this.value.length >= 4){
        let val =  this.value.strHour < 10 ? '0' + this.value.strHour : this.value.strHour + '';
        // (parseInt(val) > 12) ? this.PM(): this.AM();
        // this.hour = parseInt(val);
        return val;
    //   }else{
    //     return this.hour < 10 ? '0' + this.hour : this.hour + ''
      }
    },
    startMinutes(){
     if(this.value.length >= 4){
        let val =  this.value.startMinute < 10 ? '0' + this.value.startMinute : this.value.startMinute + '';
    //     this.minutes = parseInt(val);
        return val;
    //   }else{
    //     return this.minutes < 10 ? '0' + this.minutes : this.minutes + ''
      }
    },
    endHour(){
     if(this.value.length >= 4){
        let val =  this.value.endHour < 10 ? '0' + this.value.endHour : this.value.endHour + '';
        // this.hour = parseInt(val);
        // (parseInt(val) > 12) ? this.PM(): this.AM();
        return val;
    //   }else{
    //     return this.hour < 10 ? '0' + this.hour : this.hour + ''
      }
    },
    endMinute(){
     if(this.value.length >= 4){
        let val =  this.value.endMinute < 10 ? '0' + this.value.endMinute : this.value.endMinute + '';
    //     this.minutes = parseInt(val);
        return val;
    //   }else{
        // return this.minutes < 10 ? '0' + this.minutes : this.minutes + ''
      }
    }

//     startHour() {
//       if(this.value.length == 4){
//         let val =  this.value.strHour < 10 ? '0' + this.value.strHour : this.value.strHour + '';
//         this.strHours = parseInt(val);
//         return val;
//       }else{
//         return this.strHours < 10 ? '0' + this.strHours : this.strHours + ''
//       }
//     },
//     startMinutes() {
//       if(this.value.length == 4){
//          let val =  this.value.startMinute < 10 ? '0' + this.value.startMinute : this.value.startMinute + ''
//          this.startMinute = parseInt(val);
//          return val;
//       }else{
//         return this.startMinute < 10 ? '0' + this.startMinute : this.startMinute + ''
//       }
//     },
//     endHour() {
//        if(this.value.length == 4){
//         let val =   this.value.endHour < 10 ? '0' + this.value.endHour : this.value.endHour + ''
//         this.endHours = parseInt(val);
//         return val;
//       }else{
//         return this.endHours < 10 ? '0' + this.endHours : this.endHours + ''
//       }
//     },
//     endMinute() {
//        if(this.value.length == 4){
//         let val =   this.value.endMinute < 10 ? '0' + this.value.endMinute : this.value.endMinute + ''
//         this.endMinutes = parseInt(val);
//         return val;
//       }else{
//         return this.endMinutes < 10 ? '0' + this.endMinutes : this.endMinutes + ''
//       }
//     }
  },
}
  
</script>