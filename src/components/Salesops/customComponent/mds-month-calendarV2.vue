<template>
  <div>
    <md-card
      class="month-body"
      :style="{
        width: show_range ? '560px !important' : '350px !important',
        height: show_range ? '300px !important' : 'auto !important',
        overflow: 'hidden',
      }"
    >
      <HotelDatePicker
        :id="dpkr16.datePickerId"
        :ref="dpkr16.datePickerId"
        :datePickerId="dpkr16.datePickerId"
        :placeholder="dpkr16.placeholder"
        :separator="separator"
        :showTopbar="dpkr16.showTopbar"
        v-on:updateDateRange="updateDateRange"
        :startDate="dpkr16.startDate"
        :hoveringTooltip="dpkr16.hoveringTooltip"
        :minNights="dpkr16.minNights"
      />
      <md-card-header
        class="head-callendar"
        :style="{ visibility: show_range ? 'hidden' : 'visible' }"
      >
        <md-layout>
          <md-layout
            md-align="start"
            md-flex="30"
            style="text-align: -webkit-center"
          >
            <div
              style="padding-top: 5px"
              class="btn-month"
              @click.stop="goPrev"
            >
              <md-icon>chevron_left</md-icon>
            </div>
          </md-layout>
          <md-layout md-align="center" md-flex="40">
            <md-button class="pr-20 pl-10" @click="openYearPicker">
              <label class="md-body-2 pl-18">
                <span class="body-primary-text pt-10">{{
                  year == "" ? "YEAR" : year
                }}</span>
              </label>
            </md-button>
          </md-layout>
          <md-layout
            md-align="end"
            md-flex="30"
            style="text-align: -webkit-center"
          >
            <div
              style="padding-top: 5px"
              class="btn-month"
              @click.stop="goNext"
            >
              <md-icon>chevron_right</md-icon>
            </div>
          </md-layout>
        </md-layout>
      </md-card-header>
      <md-card-content
        :style="{ visibility: show_range ? 'hidden' : 'visible' }"
        class="ph-0 pv-0"
      >
        <md-layout class="ph-10 pv-10">
          <div v-if="show_mh == true" style="display: contents">
            <md-layout
              md-align="center"
              v-for="items in arr_months"
              :key="items.id"
              :class="
                month == items.id ? 'month-layout current' : 'month-layout'
              "
            >
              <div
                class="month-box latoFont"
                @click="selectMonth(items)"
                style="text-transform: uppercase"
              >
                {{ items.value }}
              </div>
            </md-layout>
          </div>
          <div style="display: contents" v-else>
            <md-layout
              md-align="center"
              v-for="items in arr_year"
              :key="items.id"
              :class="year == items ? 'month-layout current' : 'month-layout'"
            >
              <div class="month-box latoFont" @click="selectYear(items)">
                {{ items }}
              </div>
            </md-layout>
          </div>
          <md-layout
            v-if="displayRange"
            style="justify-content: center"
            @click.native="showRange"
            :class="month == '' ? 'month-layout current' : 'month-layout'"
          >
            <div class="month-box latoFont">CUSTOM</div>
          </md-layout>
        </md-layout>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  props: {
    year: {
      type: [String, Number],
      default: moment().format("YYYY"),
    },
    month: {
      type: [String, Number],
      default: moment().format("MM"),
    },
    range: {
      type: String,
      default: "-",
    },
    displayRange: {
      type: Boolean,
      default: false,
    },
    idTag: {
      type: String,
      required: false,
      default: "datePickerId16",
    },
  },
  watch: {
    value(val) {
      console.log(val);
    },
  },
  components: {
    HotelDatePicker: require("./HotelDatePicker/HotelDatePicker"),
  },
  data() {
    return {
      dpkr16: {
        value: "",
        // datePickerId: "datePickerId16",
        datePickerId: this.idTag,
        showTopbar: false,
        startDate: new Date(new Date().getFullYear() - 10 + "-01-01"),
        hoveringTooltip: false,
        minNights: 0,
      },
      separator: "/",
      monthStart: "",
      monthEnd: "",
      yearStart: "",
      yearEnd: "",
      show_mh: true,
      arr_months: [
        {
          id: "01",
          value: "January",
        },
        {
          id: "02",
          value: "Febuary",
        },
        {
          id: "03",
          value: "March",
        },
        {
          id: "04",
          value: "April",
        },
        {
          id: "05",
          value: "May",
        },
        {
          id: "06",
          value: "June",
        },
        {
          id: "07",
          value: "July",
        },
        {
          id: "08",
          value: "August",
        },
        {
          id: "09",
          value: "September",
        },
        {
          id: "10",
          value: "October",
        },
        {
          id: "11",
          value: "November",
        },
        {
          id: "12",
          value: "December",
        },
      ],
      arr_year: this.randomYear("now"),
      txt_month: moment().format("MMMM"),
      txt_year: moment().format("YYYY"),
      currentDate: new Date(),
      show_range: false,
    };
  },
  watch: {},
  methods: {
    updateDateRange: function (newDateRange, datePickerId) {
      Object.keys(this.$data).map((key) => {
        if (typeof this.$data[key] === "object") {
          if (this.$data[key].datePickerId === datePickerId) {
            this.$data[key].value = newDateRange;
          }
        }
      });
      this.$emit("selectmonth", {
        mode: "range",
        year: this.year,
        month: "",
        range: newDateRange,
      });
    },
    showRange() {
      this.show_range = true;
      this.toggle(this.dpkr16.datePickerId);
    },
    toggle(datePickerId) {
      if (this.range != "-") {
        var range = this.range.split("/");
        const demo2D1 = new Date(range[0]);
        const demo2D2 = new Date(range[1]);
        this.setRange(this.dpkr16.datePickerId, demo2D1, demo2D2);
      } else {
        this.setRange(this.dpkr16.datePickerId, new Date(), new Date());
      }
      this.$refs[datePickerId].toggle();
    },
    setRange(datePickerId, d1, d2) {
      this.$refs[datePickerId].setRange(d1, d2);
    },
    selectMonth(month) {
      this.txt_month = month.value;
      let year = this.year == "" ? moment().format("YYYY") : this.year;
      this.$emit("selectmonth", {
        mode: "period",
        year: year,
        month: month,
        range: null,
      });
    },
    goPrev() {
      if (this.show_mh == true) {
        let year = this.year == "" ? moment().format("YYYY") : this.year;
        this.$emit("selectyear", {
          year: parseInt(year) - 1,
        });
        this.currentDate = this.changeMonth(this.currentDate, -12);
      } else {
        this.randomYear("goPrev");
      }
    },
    goNext() {
      if (this.show_mh == true) {
        let year = this.year == "" ? moment().format("YYYY") : this.year;
        this.$emit("selectyear", {
          year: parseInt(year) + 1,
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
  },
};
</script>
