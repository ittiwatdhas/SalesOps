<template>
  <div>
    <md-card
      class="month-body"
      :style="{'width' : show_range ?'498px !important':'350px !important' ,
      'height' : show_range ?'300px !important':'auto !important',
      'overflow' : 'hidden'}"
    >
      <date-picker
        id="vue2-datepicker"
        :lang="lang"
        :shortcuts="false"
        v-model="dates.range"
        @change="updateValue"
        range
      >
        <div slot="header" style="display: -webkit-box;width:100%;padding-top:20px;">
          <div class="top-range" @click.stop="goPrevRange">
            <div style="width:20%">
              <md-icon style="cursor:pointer;">chevron_left</md-icon>
            </div>
            <div style="width:80%">{{monthStart}}&nbsp;&nbsp;{{yearStart}}</div>
          </div>
          <div class="top-range" @click.stop="goNextRange">
            <div style="width:80%">{{monthEnd}}&nbsp;&nbsp;{{yearEnd}}</div>
            <div style="width:20%;padding-right: 10px;">
              <md-icon style="cursor:pointer;">chevron_right</md-icon>
            </div>
          </div>
        </div>
      </date-picker>
      <md-card-header
        class="head-callendar"
        :style="{'visibility' : show_range ?'hidden':'visible'}"
      >
        <md-layout>
          <md-layout md-align="start" md-flex="30" style="text-align: -webkit-center;">
            <div style="padding-top:5px;" class="btn-month" @click.stop="goPrev">
              <md-icon>chevron_left</md-icon>
            </div>
          </md-layout>
          <md-layout md-align="center" md-flex="40">
            <md-button class="pr-20 pl-10" @click="openYearPicker">
              <label class="md-body-2 pl-18">
                <span class="body-primary-text pt-10">{{dates.year}}</span>
              </label>
            </md-button>
          </md-layout>
          <md-layout md-align="end" md-flex="30" style="text-align: -webkit-center;">
            <div style="padding-top:5px;" class="btn-month" @click.stop="goNext">
              <md-icon>chevron_right</md-icon>
            </div>
          </md-layout>
        </md-layout>
      </md-card-header>
      <md-card-content :style="{'visibility' : show_range ?'hidden':'visible'}" class="ph-0 pv-0">
        <md-layout class="ph-10 pv-10">
          <div v-if="show_mh == true" style="display: contents;">
            <md-layout
              md-align="center"
              v-for="items in arr_months"
              :key="items.id"
              :class="dates.month_id == items.id ? 'month-layout current' : 'month-layout'"
            >
              <div
                class="month-box latoFont"
                @click="selectMonth(items)"
                style="text-transform: uppercase;"
              >{{items.value}}</div>
            </md-layout>
          </div>
          <div style="display: contents;" v-else>
            <md-layout
              md-align="center"
              v-for="items in arr_year"
              :key="items.id"
              :class="dates.year == items ? 'month-layout current' : 'month-layout'"
            >
              <div class="month-box latoFont" @click="selectYear(items)">{{items}}</div>
            </md-layout>
          </div>
          <md-layout
            v-if="range"
            style="justify-content: center;"
            @click.native="showRange"
            :class="dates.month_id == '' ? 'month-layout current' : 'month-layout'"
          >
            <div class="month-box latoFont">CUSTOM</div>
          </md-layout>
        </md-layout>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  props: {
    dates: {
      type: Object,
      default: {
        month_id: moment().format("MM"),
        year: moment().format("YYYY"),
        range: ""
      }
    },
    type: {},
    range: {
      type: Boolean,
      default: false
    }
  },
  components: { DatePicker },
  data() {
    return {
      monthStart: "",
      monthEnd: "",
      yearStart: "",
      yearEnd: "",
      show_mh: true,
      arr_months: [
        {
          id: "01",
          value: "January"
        },
        {
          id: "02",
          value: "Febuary"
        },
        {
          id: "03",
          value: "March"
        },
        {
          id: "04",
          value: "April"
        },
        {
          id: "05",
          value: "May"
        },
        {
          id: "06",
          value: "June"
        },
        {
          id: "07",
          value: "July"
        },
        {
          id: "08",
          value: "August"
        },
        {
          id: "09",
          value: "September"
        },
        {
          id: "10",
          value: "October"
        },
        {
          id: "11",
          value: "November"
        },
        {
          id: "12",
          value: "December"
        }
      ],
      arr_fullmonths: [
        "JANUARY",
        "FEBUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER"
      ],
      shortDays: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
      arr_year: this.randomYear("now"),
      txt_month: moment().format("MMMM"),
      txt_year: moment().format("YYYY"),
      currentDate: new Date(),
      show_range: false,
      lang: {
        days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        months: [
          "JANUARY",
          "FEBUARY",
          "MARCH",
          "APRIL",
          "MAY",
          "JUNE",
          "JULY",
          "AUGUST",
          "SEPTEMBER",
          "OCTOBER",
          "NOVEMBER",
          "DECEMBER"
        ]
      }
    };
  },
  watch: {},
  methods: {
    goPrevRange() {
      var main = document.getElementById("vue2-datepicker");
      if (main != null) {
        main.childNodes[2].childNodes[2].childNodes[0].childNodes[0].childNodes[2].click();
        main.childNodes[2].childNodes[2].childNodes[2].childNodes[0].childNodes[2].click();
        this.setTopRange();
      }
      // console.log("goPrevRange => ");
    },
    goNextRange() {
      var main = document.getElementById("vue2-datepicker");
      if (main != null) {
        main.childNodes[2].childNodes[2].childNodes[2].childNodes[0].childNodes[6].click();
        main.childNodes[2].childNodes[2].childNodes[0].childNodes[0].childNodes[6].click();
        this.setTopRange();
      }
      // console.log("goNextRange => ");
    },
    updateValue: function(value) {
      this.$emit("selectmonth", {
        year: moment().format("MM"),
        month: "",
        range: value
      });
    },
    showRange() {
      this.show_range = true;
      var main = document.getElementById("vue2-datepicker");
      if (main != null) {
        if (main.childNodes[0].classList.value == "mx-input-wrapper") {
          main.childNodes[0].click();
          main.childNodes[2].childNodes[2].childNodes[2].childNodes[0].childNodes[6].click();
          this.setTopRange();
        }
      }
    },
    goPrev() {
      if (this.show_mh == true) {
        this.$emit("selectyear", {
          year: parseInt(this.dates.year) - 1
        });
        this.currentDate = this.changeMonth(this.currentDate, -12);
      } else {
        this.randomYear("goPrev");
      }
    },
    goNext() {
      if (this.show_mh == true) {
        this.$emit("selectyear", {
          year: parseInt(this.dates.year) + 1
        });
        this.currentDate = this.changeMonth(this.currentDate, 12);
      } else {
        this.randomYear("goNext");
      }
    },
    changeMonth(date, num) {
      let dt = new Date(date);
      return new Date(dt.setMonth(dt.getMonth() + num));
    },
    openYearPicker() {
      if (this.show_mh == true) {
        this.show_mh = false;
      } else {
        this.show_mh = true;
      }
    },
    selectYear(key) {
      this.txt_year = key;
      this.show_mh = true;
      this.$emit("selectyear", { year: key });
    },
    randomYear(key) {
      let data_year = [];
      if (key == "goPrev") {
        let key_year = this.arr_year[0];
        this.arr_year = [];
        for (let i = 0; i < 12; i++) {
          this.arr_year.push(key_year - 12 + i);
        }
      } else if (key == "goNext") {
        let key_year = this.arr_year[this.arr_year.length - 1];
        this.arr_year = [];
        for (let i = 0; i < 12; i++) {
          this.arr_year.push(key_year + 12 + i);
        }
      } else {
        let key_year = parseInt(moment().format("YYYY"));
        for (let i = 0; i < 12; i++) {
          data_year.push(key_year - 6 + i);
        }
        return data_year;
      }
    },
    selectMonth(month) {
      this.txt_month = month.value;
      this.$emit("selectmonth", {
        year: this.dates.year,
        month: month,
        range: []
      });
    },
    setTopRange() {
      let _this = this;
      var main = document.getElementById("vue2-datepicker");
      if (main != null) {
        setTimeout(function() {
          _this.monthStart =
            main.childNodes[2].childNodes[2].childNodes[0].childNodes[0].childNodes[8].childNodes[0].nodeValue;
          _this.yearStart =
            main.childNodes[2].childNodes[2].childNodes[0].childNodes[0].childNodes[10].childNodes[0].nodeValue;
          _this.monthEnd =
            main.childNodes[2].childNodes[2].childNodes[2].childNodes[0].childNodes[8].childNodes[0].nodeValue;
          _this.yearEnd =
            main.childNodes[2].childNodes[2].childNodes[2].childNodes[0].childNodes[10].childNodes[0].nodeValue;
        }, 0);
      }
    }
  }
};
</script>
