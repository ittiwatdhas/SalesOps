<template>
  <div class="activity-list-box">
    <md-card
      v-if="$store.getters.act_actvity_list.total == 0"
      class="md-nodata-text"
      >{{ DataNotFound }}</md-card
    >
    <md-card
      v-for="(items, idx) in $store.getters.act_actvity_list.data"
      :key="items.id"
      v-if="$store.getters.act_actvity_list.total > 0"
    >
      <md-card-header>
        <div class="title">{{ idx }}</div>
        <div style="display:flex;width:100%">
          <div style="width:30%;" class="subtitle mt-15 ml-45">Customer</div>
          <div style="width:21%;" class="subtitle">Visit Time (Duration)</div>
          <div style="width:8%;" class="subtitle">Distance</div>
          <div style="width:19%;" class="subtitle">Salesman</div>
          <div style="width:19%;" class="subtitle">Reason</div>
          <div style="width:3%;" class="subtitle">Type</div>
        </div>
      </md-card-header>
      <md-card-content :key="detail.id" v-for="detail in items">
        <div style="display:flex;width:100%">
          <div style="width:2%;" class="float-left">
            <div
              class="md-cycle-icon medium orange"
              :style="{'background-color':detail.even_color}"
              v-if="detail.status_plan != 'P'"
            >
              {{ detail.status_plan }}
            </div>
            <div  
             :style="{'background-color':detail.even_color}"
             class="md-cycle-icon medium gray" v-else>
              {{ detail.status_plan }}
            </div>
          </div>
          <div style="width:3%;" class="float-left text-left ml-20">
            <label class="body-secondary-text2 latoFont">{{
              detail.customer_code
            }}</label>
          </div>
          <div style="width:24%;" class="float-left text-left ml-30 kanitFont">
            <div class="word-wrap float-left width-pre100">
              <label class="-gray-72 -font-12 font-bold">{{
                detail.customer_name_th
              }}</label>
            </div>
          </div>
          <div style="width:2%;" class="float-left text-left ml-10">
            <md-icon
              v-if="detail.ci_mobile != '-' || detail.co_mobile != '-'"
              class="-gray-A8"
              >query_builder</md-icon
            >
            <md-icon v-else class="unvisible-tag -gray-A8"
              >query_builder</md-icon
            >
          </div>
          <div style="width:20%;" class="float-left text-left ml-10">
            <label
              v-if="detail.ci_mobile != '-' || detail.co_mobile != '-'"
              class="body-secondary-text2"
              >{{ detail.ci_mobile }} - {{ detail.co_mobile }}</label
            >
            <label v-else class="body-secondary-text2 unvisible-tag"
              >{{ detail.ci_mobile }} - {{ detail.co_mobile }}</label
            >

            <label
              v-if="detail.ci_mobile != '-' && detail.co_mobile != '-'"
              class="body-secondary-text2 ml-5"
              >({{ detail.period_time }})</label
            >
            <label v-else class="body-secondary-text2 ml-5 unvisible-tag"
              >({{ detail.period_time }})</label
            >
          </div>
          <div
            v-if="detail.ci_mobile != '-' || detail.co_mobile != '-'"
            style="width:4%;"
            class="float-left ml-10"
          >
            <div
              v-if="detail.distance_status == 1"
              class="md-rectangle-icon medium lightgray pb-5"
            >
              OK<md-tooltip md-direction="top"
                >[{{ detail.distance_checkIn
                }}{{ detail.distance_checkOut }}]</md-tooltip
              >
            </div>
            <div
              v-if="detail.distance_status == 0"
              class="md-rectangle-icon medium yellow pb-5"
            >
              !<md-tooltip md-direction="top"
                >[{{ detail.distance_checkIn
                }}{{ detail.distance_checkOut }}]</md-tooltip
              >
            </div>
          </div>
          <div v-else style="width:4%;" class="text-left float-left ml-10">
            <div class="md-rectangle-icon lightgray pb-5 unvisible-tag">
              OK
            </div>
          </div>
          <div class="text-left float-left ml-5" style="width:23%">
            <label class="body-secondary-text2 latoFont">{{
              detail.saleman
            }}</label>
            <label class="body-secondary-text2 ml-5 kanitFont">{{
              detail.sale_name
            }}</label>
          </div>
          <div
            style="width:20%;"
            class="icon-reprosive ml-5 text-left float-left"
          >
            <md-icon class="" v-if="detail.reason[4]"
              >slideshow
              <md-tooltip md-direction="top">{{
                detail.reason[4].detail
              }}</md-tooltip>
            </md-icon>
            <md-icon v-else class="disableBtn">slideshow </md-icon>
            <md-icon class="" v-if="detail.reason[5]"
              >description
              <md-tooltip md-direction="top">{{
                detail.reason[5].detail
              }}</md-tooltip>
            </md-icon>

            <md-icon v-else class="disableBtn">description </md-icon>
            <md-icon class="" v-if="detail.reason[6]"
              >attach_money
              <md-tooltip md-direction="top">{{
                detail.reason[6].detail
              }}</md-tooltip>
            </md-icon>
            <md-icon v-else class="disableBtn">attach_money </md-icon>
            <md-icon class="" v-if="detail.reason[7]"
              >check_circle
              <md-tooltip md-direction="top">{{
                detail.reason[7].detail
              }}</md-tooltip>
            </md-icon>
            <md-icon v-else class="disableBtn">check_circle </md-icon>

            <md-icon class="serachStatus" v-if="detail.reason[8]"
              >content_paste
              <md-tooltip md-direction="top">{{
                detail.reason[8].detail
              }}</md-tooltip>
            </md-icon>
            <md-icon v-else class="disableBtn">content_paste</md-icon>

            <md-icon class="serachStatus" v-if="detail.reason[9]"
              >more_horiz
              <md-tooltip md-direction="top">{{
                detail.reason[9].detail
              }}</md-tooltip>
            </md-icon>
            <md-icon v-else class="disableBtn">more_horiz </md-icon>
          </div>
          <div
            style="width:2%;"
            class="icon-reprosive ml-5 text-left float-left"
          >
            <md-icon v-if="detail.plantype_icon != 'default'"
              >{{ detail.plantype_icon }}
            </md-icon>
            <md-tooltip
              md-direction="top"
              v-if="detail.plantype_icon != 'default'"
              >{{ detail.plan_types }}</md-tooltip
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    value: {}
  },
  data () {
    return {
      DataNotFound: 'No Activity'
    }
  },
  computed: {},
  methods: {},
}
</script>
