<template>
  <div>
    <md-card class="sales-area-table" style="width:100%">
      <div style="display: flex;" class="head-blog">
        <div style="width:19%;padding-top:15px;padding-right: 45px;" class="title">SUMMARY</div>
        <div style="width:19%;text-align:left" class="quota-box">
          <span class="price">฿</span>
          <span class="card-title">{{$store.getters["globalfunc/formatNumber"](detail.sum_draft)}}</span>
          <div class="card-sub-title text-left">Drafts</div>
        </div>
        <div style="width:19%;text-align:left" class="quota-box">
          <span class="price">฿</span>
          <span
            class="card-title"
          >{{$store.getters["globalfunc/formatNumber"](detail.sum_pendding)}}</span>
          <div class="card-sub-title text-left">Pending</div>
        </div>
        <div style="width:19%;text-align:left" class="quota-box">
          <span class="price">฿</span>
          <span
            class="card-title"
          >{{$store.getters["globalfunc/formatNumber"](detail.sum_complete)}}</span>
          <div class="card-sub-title text-left">Completed</div>
        </div>
        <div style="width:24%">
          <md-button
            id="btnCreateOrderDialog"
            class="md-raised -orange"
            style="height:40px;"
            @click="openDialog('createOrder_dialog' , [])"
          >
            <md-icon style="margin-right:10px">add</md-icon>CREATE ORDER
          </md-button>
        </div>
      </div>
    </md-card>
  </div>
</template>
<script>
export default {
  created() {},
  props: ["detail"],
  data() {
    return {};
  },
  methods: {
    openDialog(id, value) {
      this.$emit("opendialog", id, value);
    }
  }
};
</script>
