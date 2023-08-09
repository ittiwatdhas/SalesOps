<template>
<div>
    <md-card :class="monthPickCls">
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
                    <span class="body-primary-text pt-10">{{txt_year}}</span>
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
                    <md-layout  md-align="center" v-for="items in arr_months" :key="items.id"
                    class="month-layout" 
                    v-if="show_mh == true"> 
                    <div class="month-box latoFont" @click="selectMonth(items)" style="text-transform: uppercase;">
                        {{items.value}}
                    </div>
                </md-layout> 
                <md-layout md-align="center" v-for="items in arr_year"  :key="items.id"
                    class="month-layout" 
                    v-if="show_mh == false"> 
                    <div class="month-box latoFont" @click="selectYear(items)">
                        {{items}}
                    </div>
                </md-layout>
            </md-layout>
        </md-card-content>
    </md-card>
</div>
</template>

<script>
var check_month = true;
import { mapGetters, mapActions } from "vuex";
import dateFunc from "../../Salesops/fullCalendar/dateFunc";
export default {
  computed: {
    ...mapGetters({
      sp_data_selected: "sp_data_selected",
      sp_data_popup_selected: "sp_data_popup_selected"
    })
  },
  data() {
    return {
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
      arr_year: this.randomYear("now"),
      txt_month: dateFunc.format(new Date(), "MMMM"),
      txt_year: dateFunc.format(new Date(), "yyyy"),
      monthPickCls: "show-tag month-body",
      currentDate: new Date(),
      keepMonth: ""
    };
  },
  props: {
    type: {}
  },
  methods: {
    goPrev() {
      if (this.show_mh == true) {
        this.currentDate = this.changeMonth(this.currentDate, -12);
      } else {
        this.randomYear("goPrev");
      }
      this.txt_year = parseInt(dateFunc.format(this.currentDate, "yyyy"));
      this.dispatchEvent();
    },
    goNext() {
      if (this.show_mh == true) {
        this.currentDate = this.changeMonth(this.currentDate, 12);
      } else {
        this.randomYear("goNext");
      }
      this.txt_year = parseInt(dateFunc.format(this.currentDate, "yyyy"));
      this.dispatchEvent();
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
      // this.show_mh = true;
      this.txt_year = key;
      check_month = true;
      this.show_mh = true;
      this.$emit("selectyear", { year: key  });
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
        let key_year = parseInt(dateFunc.format(new Date(), "yyyy"));
        for (let i = 0; i < 12; i++) {
          data_year.push(key_year - 6 + i);
        }
        return data_year;
      }
    },
    selectMonth(month) {
      this.keepMonth = month;
      this.txt_month = month.value;
      this.$emit("selectmonth", { year: this.txt_year, month: month });
    },
    dispatchEvent() {
      let currentDate = dateFunc.getStartDate(this.currentDate);
    }
  }
};
</script>
