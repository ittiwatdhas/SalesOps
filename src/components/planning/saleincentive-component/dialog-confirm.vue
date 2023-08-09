<template>
  <md-dialog
    md-open-from="#custom"
    md-close-to="#custom"
    ref="dialog-confirm"
    class="incentive-dialog-confirm"
  >
    <md-dialog-content>
      <label style="font-size: 18px; font-weight: 500;">{{ content }}</label>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button @click="onClose()" style="color: #a8a8a8;">CANCEL</md-button>
      <md-button class="md-primary" @click="onConfirm()" v-if="btnright != 'OK'">{{btnright}}</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import Vue from "vue";
export default {
  name: "dialog-confirm",

  props: {
    show: {
      type: Boolean,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    btnright: {
      type: String,
      required: true
    }
  },

  watch: {
    show() {
      if (this.show) {
        this.$refs["dialog-confirm"].open();
      }
    }
  },

  methods: {
    onClose() {
      this.$refs["dialog-confirm"].close();
      this.$emit("clickClose");
    },
    onConfirm() {
      this.$refs["dialog-confirm"].close();
      this.$emit("clickConfirm");
    }
  }
};
</script>

<style lang="scss">
.incentive-dialog-confirm {
  .md-dialog.md-reference {
    margin-left: 0% !important;
  }

  .md-dialog-content {
    padding: 40px 35px 20px 40px;

    .salesops-input {
      height: 45px !important;

      input {
        padding-top: 10px;
        font-size: 22px;
      }

      ::placeholder {
        font-size: 20px !important;
      }
    }
  }

  .md-dialog-actions {
    padding-right: 20px;
    padding-bottom: 15px;
  }
}
</style>
