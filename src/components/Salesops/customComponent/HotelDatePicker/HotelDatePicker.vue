<template>
  <div>
    <div class="datepicker_container" style="display:none">
      <input class="datepicker__input" type="text" :id="datePickerId" :placeholder="placeholder">
    </div>
  </div>
</template>

<script>
import Datepicker from "./hotel-datepicker.js";

const defaultDatei18n = {
  selected: "Your stay:",
  night: "Night",
  nights: "Nights",
  button: "Close",
  "check-in": "Check-in",
  "check-out": "Check-Out",
  "day-names": [ "SUN","MON", "TUE", "WED", "THUR", "FRI", "SAT"],
  "month-names": [
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
  "error-more": "Date range should not be more than 1 night",
  "error-more-plural": "Date range should not be more than %d nights",
  "error-less": "Date range should not be less than 1 night",
  "error-less-plural": "Date range should not be less than %d nights",
  "info-more": "Please select a date range longer than 1 night",
  "info-more-plural": "Please select a date range longer than %d nights",
  "info-range": "Please select a date range between %d and %d nights",
  "info-default": "Please select a date range"
};

export default {
  name: "HotelDatepicker",
  components: {},
  props: {
    datePickerId: {
      type: String,
      default: "datepickerId-" + new Date().getTime().toString() // simulate random
    },
    placeholder: {
      type: String,
      default: "Check-in ~ Check-out"
    },
    format: {
      type: String,
      default: "YYYY-MM-DD"
    },
    infoFormat: {
      type: String,
      default: "YYYY-MM-DD"
    },
    separator: {
      type: String,
      default: " - "
    },
    startOfWeek: {
      type: String,
      default: "sunday"
    },
    startDate: {
      type: [Date, String],
      default: function() {
        return new Date();
      }
    },
    endDate: {
      type: [Date, String, Boolean]
    },
    minNights: {
      type: Number,
      default: 0
    },
    maxNights: {
      type: Number,
      default: 0
    },
    selectForward: {
      type: Boolean,
      default: false
    },
    disabledDates: {
      type: Array,
      default: function() {
        return [];
      }
    },
    enableCheckout: {
      type: Boolean,
      default: false
    },
    container: {
      type: String,
      default: ""
    },
    animationSpeed: {
      type: String,
      default: ".5s"
    },
    hoveringTooltip: {
      type: [Boolean, Function],
      default: false
    },
    showTopbar: {
      type: Boolean,
      default: true
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    i18n: {
      type: Object,
      default: () => defaultDatei18n
    }
  },
  data() {
    return {
      inputValue: "",
      hdpkr: {}
    };
  },
  computed: {},
  watch: {
    "hdpkr.isOpen": {
      handler(newVal, oldVal) {
        if (!this.hdpkr.isOpen && this.hdpkr.changed) {
          const date = document.querySelector(`#${this.datePickerId}`).value;
          this.$emit("updateDateRange", date, this.datePickerId);
        } else if (!this.hdpkr.isOpen && !this.hdpkr.changed) {
          this.$emit("cancelUpdateDateRange", this.datePickerId);
        }
      }
    }
  },
  methods: {
    getValue() {
      return this.hdpkr.getValue();
    },
    setValue(val) {
      this.hdpkr.setValue(val);
    },
    toggle() {
      if (this.hdpkr.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },
    open: function() {
      setTimeout(() => {
        this.hdpkr.open();
      }, 0);
    },
    close() {
      setTimeout(() => {
        this.hdpkr.close();
      }, 0);
    },
    clear() {
      // Clears the datepicker value.
      setTimeout(() => {
        this.hdpkr.clear();
      }, 100);
    },
    setRange(d1, d2) {
      // Sets the date range value.
      this.hdpkr.setRange(d1, d2);
    },
    getDatePicker() {
      // Gets the datepicker DOM element.
      return this.hdpkr.getDatePicker();
    },
    getNights() {
      // Gets the number of nights selected. Returns 0 otherwise.
      return this.hdpkr.getNights();
    },
    updateDateRange(e) {
      const newDate = document.querySelector(`#${this.datePickerId}`).value;
      // console.log('HotelDatepicker updateDateRange', newDate, e)
      this.$emit("updateDateRange", newDate, this.datePickerId);
    }
  },
  mounted: function() {
    // const containerElement = document.querySelector(this.container)
    // console.log('containerElement', containerElement)
    const hdpkrId = document.querySelector(`#${this.datePickerId}`);
    const hdpkrOptions = {
      datePickerId: this.datePickerId,
      format: this.format,
      infoFormat: this.infoFormat,
      separator: this.separator,
      startOfWeek: this.startOfWeek,
      startDate: this.startDate,
      endDate: this.endDate,
      minNights: this.minNights,
      maxNights: this.maxNights,
      selectForward: this.selectForward,
      disabledDates: this.disabledDates,
      enableCheckout: this.enableCheckout,
      container: this.container,
      animationSpeed: this.animationSpeed,
      hoveringTooltip: this.hoveringTooltip,
      showTopbar: this.showTopbar,
      autoClose: this.autoClose,
      i18n: this.i18n
    };
    this.hdpkr = new Datepicker(hdpkrId, hdpkrOptions);
    // console.log(this.hdpkr)
    if (!this.showTopbar) {
      // showTopbar is not implement from hotel datepicker now...
      const hdpkrTopbar = document.querySelector(".datepicker__topbar");
      hdpkrTopbar.style.display = "none";
    }
  }
};
</script>

<style lang="scss">
@import "./hotel-datepicker.css";

// ///////////////////////////////////////////////
// Overwrite and customize datepicker style
// ///////////////////////////////////////////////
.datepicker {
  $closeBtnColor: #fd7f00;
  $primaryColor: #fd7f00;
  $selectedColor: #fd7f00;
  $selectedRangeColor: #fd7f00;

  * {
    box-sizing: border-box;
  } //
  // font-size: 16px;
  // line-height: 16px;
  border-radius: 0px;
  &__input {
    width: 240px;
    margin: 0;
    padding: 10px 20px;
    font-size: 13px;
    line-height: normal;
    border: 1px solid #dcdcdc;
    outline: none;
    &::placeholder {
      color: #e5e5e5;
    }
  }
  &__inner {
  }
  &__week {
    &-days {
      height: 32px; //
      // background-color: #7D7C7D;
    }
    &-name {
      font-size: 12px;
      text-transform: uppercase;
      font-family: lato;
    }
  }
  &__month {
    &-name {
      font-size: 16px;
      text-transform: initial;
      color: #5A5A5A;
      font-weight: 500;
      font-family: lato;
    }
    &-caption {
      height: 40px; //
      // background-color: #7D7C7D;
    }
  }
  &__month-day {
    &--valid {
      color: #c9c9c9;
      font-family: lato;
      font-size: 11px;
      // color: #393332;
      &:hover {
        background-color: $primaryColor;
        color: #ffffff;
      }
    }
    &--today {
      background-color: #ffffff;
      box-shadow: 0px 0px 0px 1px $primaryColor inset;
      &.datepicker__month-day--invalid {
        color: #e8ebf4;
        box-shadow: 0px 0px 0px 1px #e8ebf4 inset;
      }
    }
    &--selected {
      // background-color: rgba(0, 158, 222, 0.5);
      background-color: $selectedRangeColor;
      opacity: 0.7;
      color: #ffffff;
      //   color: #c7bbb8;
    }
    &--hovering {
      // background-color: rgba(0, 158, 222, 0.2) !important;
      background-color: $selectedRangeColor;
      opacity: 0.6;
      color: #ffffff;
    }
    &--first-day-selected {
      background-color: $selectedColor;
      color: #ffffff;
    }
    &--last-day-selected {
      background-color: $selectedColor;
      color: #ffffff;
    }
  }
  &__month-button {
    background-color: #ffffff;
    &:hover {
      background-color: $primaryColor;
      color: #ffffff;
    }
  }
  &__close-button {
    background-color: $closeBtnColor;
  }
  &__tooltip {
    background-color: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    &:after {
      border-top: 4px solid rgba(0, 0, 0, 0.7);
    }
  }
}

@media (max-width: 480px) {
  .datepicker {
    &__month {
      &--month2 {
        display: table;
      }
    }
  }
}

@media (min-width: 768px) {
}
</style>
