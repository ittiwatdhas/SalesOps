<template>
  <div class="pageVisit" id="pageVisit">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true">
      <!-- START -->
      <div class="box_visit">
        {{ this.delay_check }}
        <div style="margin: 170px 0 0 17%; position: fixed; z-index: 200">
          <md-spinner
            :md-size="150"
            :md-stroke="1"
            v-show="this.$store.getters.spinner_loading"
            md-indeterminate
          ></md-spinner>
        </div>
        <div class="md-layout">
          <div class="box-left">
            <div style="width: 100%" class="md-layout-item">
              <div class="title-menu">Check-in</div>
              <div style="padding: 0 20px 15px 20px">
                <md-auto-focus-box
                  style="padding-right: 15px"
                  :placeholder="'Search Customer'"
                  :data="filter"
                  v-model="inp_txt_filter"
                  :loading="loadCustStatus"
                  @iconclick="iconClick"
                  @choose="chooseCust"
                  @mouseleave="mouseLeave"
                  @change="filterCust"
                >
                </md-auto-focus-box>
              </div>
              <!-- <div id="autoComFilter" style="padding:0px 0px 0px 0px" v-if="expand === 'all'">  -->

              <!-- </div> -->
              <div
                :style="{
                  'pointer-events': this.$store.getters.spinner_loading
                    ? 'none'
                    : '',
                  height: '100%'
                }"
              >
                <!-- TODAY -->
                <md-list style="max-height: 90%; padding: 0">
                  <div @click="Expand('today')" class="head-list">
                    <div style="width: 90%">
                      Planned for Today
                      <span
                        style="
                          color: #727272;
                          font-family: Roboto;
                          font-size: 12px;
                          font-weight: bold;
                          margin: 0 0 0 10px;
                        "
                        >{{ formatDate(this.timeServer) }}</span
                      >
                    </div>
                    <div style="width: 10%; display: grid">
                      <md-icon
                        v-if="expand != 'today' || search_expand_today == true"
                        >expand_less</md-icon
                      >
                      <md-icon v-else>expand_more</md-icon>
                    </div>
                  </div>
                  <div
                    v-if="expand === 'today' || search_expand_today == true"
                    id="left-menu-checkIn"
                    class="style-scroll"
                    style="height: 50%; overflow-y: scroll"
                  >
                    <div
                      style="padding: 10px 0 10px 0"
                      v-if="detail_plan_today.length == 0"
                    >
                      No Planned for Today
                    </div>
                    <md-list-item
                      v-for="(item, index) in detail_plan_today"
                      :key="index"
                    >
                      <div
                        :style="{
                          width: '100%',
                          height: '100%'
                        }"
                      >
                        <div
                          class="row-item-list"
                          :style="{
                            display: 'flex',
                            width: '100%',
                            'background-color':
                              item.plan_id == check_today[0].focus
                                ? '#EFEFEF'
                                : ''
                          }"
                        >
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              width: 20%;
                              height: 100%;
                              background-color: ;
                            "
                          >
                            <md-avatar
                              :style="{ 'background-color': item.even_color }"
                              style="
                                pointer-events: none;
                                color: #fff;
                                display: flex;
                                padding-top: 5px;
                                align-items: center;
                                justify-content: center;
                              "
                              class="md-avatar-icon"
                            >
                              <span v-if="item.visit_status != null">
                                {{ item.visit_status.toUpperCase() }}</span
                              >
                              <span v-else>{{
                                item.visit_type.toUpperCase()
                              }}</span>
                            </md-avatar>
                          </div>

                          <div
                            @click="Focus(item)"
                            :style="{
                              'background-color':
                                item.plan_id == check_today[0].focus
                                  ? '#EFEFEF'
                                  : '',
                              width: '65%',
                              height: '100%'
                            }"
                          >
                            <div class="name-customer">
                              {{ item.customer_code }}{{ ' '
                              }}{{ item.customer_name_th }}
                            </div>
                            <md-tooltip
                              md-direction="top"
                              style="font-family: Kanit"
                              >{{ item.customer_code }}{{ ' '
                              }}{{ item.customer_name_th }}</md-tooltip
                            >
                            <div class="action-checkin">
                              <span style="font-family: Roboto"
                                ><md-icon style="opacity: 0.7; font-size: 18px"
                                  >place</md-icon
                                ><span
                                  v-if="item.distance != null"
                                  style="font-size: 12px"
                                  >{{ floatFormat(item.distance)
                                  }}{{ ' KM' }}</span
                                >
                                <span v-else>{{ '-' }}</span></span
                              >
                              <div
                                style="
                                  padding: 0 0 0px 10px;
                                  font-family: Roboto;
                                  font-size: 12px;
                                "
                              >
                                <md-icon
                                  v-if="item.checkin_time != ''"
                                  style="opacity: 0.7; font-size: 16px"
                                  >schedule</md-icon
                                >{{ formatDate2(item.checkin_time)
                                }}<span
                                  v-if="
                                    item.checkout_time != '' &&
                                    item.checkout_time != null
                                  "
                                  >{{ ' - '
                                  }}{{ formatDate2(item.checkout_time) }}{{ ' '
                                  }}{{
                                    cal_time(
                                      item.checkin_time,
                                      item.checkout_time
                                    )
                                  }}</span
                                >
                              </div>
                            </div>
                          </div>
                          <div style="width: 15%">
                            <md-button
                              :disabled="!btn_check ? true : false"
                              v-if="check_today[0].focus == item.plan_id"
                              @click="
                                InOut_btn(check_today[0].status, item, 'today')
                              "
                              style="
                                background-color: #ff9800;
                                color: #fff;
                                min-width: 100%;
                                margin: 0;
                                height: 100%;
                                padding: 0;
                              "
                            >
                              <span
                                style="background-color: #ff9800"
                                v-if="check_today[0].status"
                                >IN</span
                              >
                              <span style="background-color: #ff9800" v-else
                                >OUT</span
                              >
                            </md-button>
                          </div>
                        </div>
                        <div
                          class="no-row-item-list"
                          v-if="checkRelocate(item)"
                          style="width: 100%; display: flex; padding-top: 3px"
                        >
                          <div style="width: 20%"></div>
                          <div style="width: 40%">
                            <div
                              style="
                                margin-bottom: 10px;
                                background: #f44336;
                                border: 1px solid #f44336;
                                border-radius: 3px;
                                color: #fff;
                                width: 76px;
                                height: 40px;
                                text-align: center;
                                padding-top: 10px;
                                font-family: roboto;
                                cursor: pointer;
                              "
                              v-if="checkRelocateIn(item)"
                              @click="
                                reLocation(
                                  check_today[0].status,
                                  item,
                                  'today',
                                  'in'
                                )
                              "
                            >
                              <span style="font-size: 12px; font-weight: bold"
                                >RE - IN</span
                              >
                            </div>
                          </div>
                          <div style="width: 40%; text-align: end">
                            <div
                              style="
                                margin-bottom: 10px;
                                background: #f44336;
                                border: 1px solid #f44336;
                                border-radius: 3px;
                                color: #fff;
                                width: 93px;
                                height: 40px;
                                text-align: center;
                                padding-top: 10px;
                                font-family: roboto;
                                cursor: pointer;
                              "
                              v-if="checkRelocateOut(item)"
                              @click="
                                reLocation(
                                  check_today[0].status,
                                  item,
                                  'today',
                                  'out'
                                )
                              "
                            >
                              <span style="font-size: 12px; font-weight: bold"
                                >RE - OUT</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </md-list-item>
                  </div>
                </md-list>
                <!-- END TODAY -->
                <!-- PENDING -->
                <md-list style="max-height: 90%; padding: 0">
                  <div @click="Expand('pending')" class="head-list">
                    <div style="width: 90%">Planned for Pending</div>

                    <div style="width: 10%; display: grid">
                      <md-icon
                        v-if="
                          expand != 'pending' || search_expand_pending == true
                        "
                        >expand_less</md-icon
                      >
                      <md-icon v-else>expand_more</md-icon>
                    </div>
                  </div>
                  <div
                    v-if="expand === 'pending' || search_expand_pending == true"
                    id="left-menu-checkIn"
                    class="style-scroll"
                    style="height: 50%; overflow-y: scroll"
                  >
                    <div
                      style="padding: 10px 0 10px 0"
                      v-if="detail_plan_pending.length == 0"
                    >
                      No Planned for Pending
                    </div>
                    <md-list-item
                      v-for="(item, index) in detail_plan_pending"
                      :key="index"
                    >
                      <div
                        @click="Focus_pending(item)"
                        :style="{
                          width: '100%',
                          height: '100%'
                        }"
                      >
                        <div
                          class="row-item-list"
                          :style="{
                            display: 'flex',
                            width: '100%',
                            'background-color':
                              item.customer_id == check_pending[0].focus
                                ? '#EFEFEF'
                                : ''
                          }"
                        >
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              width: 20%;
                              height: 100%;
                              background-color: ;
                            "
                          >
                            <md-avatar
                              :style="{ 'background-color': item.color_active }"
                              style="
                                pointer-events: none;
                                color: #fff;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                              "
                              class="md-avatar-icon"
                            >
                              <span
                                v-if="
                                  item.visit_date ==
                                    formatDate3(timeServer.data) &&
                                  item.checkin_time != null
                                "
                                >A</span
                              >
                              <span v-else>
                                {{ item.visit_type.toUpperCase() }}</span
                              >
                            </md-avatar>
                          </div>

                          <div
                            @click="Focus_pending(item)"
                            :style="{
                              'background-color':
                                item.customer_id == check_pending[0].focus
                                  ? '#EFEFEF'
                                  : '',
                              width: '65%',
                              height: '100%'
                            }"
                          >
                            <div class="name-customer">
                              {{ item.customer_code }}{{ ' '
                              }}{{ item.customer_name_th }}
                            </div>
                            <md-tooltip
                              md-direction="top"
                              style="font-family: Kanit"
                              >{{ item.customer_code }}{{ ' '
                              }}{{ item.customer_name_th }}</md-tooltip
                            >
                            <div class="action-checkin">
                              <span style="font-family: Roboto"
                                ><md-icon style="opacity: 0.7; font-size: 18px"
                                  >place</md-icon
                                ><span
                                  v-if="item.distance != null"
                                  style="font-size: 12px"
                                  >{{ floatFormat(item.distance)
                                  }}{{ ' KM' }}</span
                                >
                                <span v-else>{{ '-' }}</span></span
                              >
                              <div
                                v-if="
                                  item.visit_date ==
                                  formatDate3(timeServer.data)
                                "
                                style="
                                  padding: 0 0 0px 10px;
                                  font-family: Roboto;
                                  font-size: 12px;
                                "
                              >
                                <md-icon
                                  v-if="item.checkin_time != null"
                                  style="opacity: 0.7; font-size: 16px"
                                  >schedule</md-icon
                                >{{ formatDate2(item.checkin_time)
                                }}<span v-if="item.checkout_time != null"
                                  >{{ ' - '
                                  }}{{ formatDate2(item.checkout_time) }}{{ ' '
                                  }}{{
                                    cal_time(
                                      item.checkin_time,
                                      item.checkout_time
                                    )
                                  }}</span
                                >
                              </div>
                            </div>
                          </div>
                          <div style="width: 15%">
                            <md-button
                              v-if="check_pending[0].focus == item.customer_id"
                              :disabled="!btn_check ? true : false"
                              @click="
                                InOut_btn(
                                  check_pending[0].status,
                                  item,
                                  'pending'
                                )
                              "
                              style="
                                background-color: #ff9800;
                                color: #fff;
                                min-width: 100%;
                                margin: 0;
                                height: 100%;
                                padding: 0;
                              "
                            >
                              <span
                                style="background-color: #ff9800"
                                v-if="check_pending[0].status"
                                >IN</span
                              >
                              <span style="background-color: #ff9800" v-else
                                >OUT</span
                              >
                            </md-button>
                          </div>
                        </div>
                        <div
                          class="no-row-item-list"
                          v-if="checkRelocate(item)"
                          style="width: 100%; display: flex; padding-top: 3px"
                        >
                          <div style="width: 20%"></div>
                          <div style="width: 40%">
                            <div
                              style="
                                margin-bottom: 10px;
                                background: #f44336;
                                border: 1px solid #f44336;
                                border-radius: 3px;
                                color: #fff;
                                width: 76px;
                                height: 40px;
                                text-align: center;
                                padding-top: 10px;
                                font-family: roboto;
                                cursor: pointer;
                              "
                              v-if="checkRelocateIn(item)"
                              @click="
                                reLocation(
                                  check_pending[0].status,
                                  item,
                                  'pending',
                                  'in'
                                )
                              "
                            >
                              <span style="font-size: 12px; font-weight: bold"
                                >RE - IN</span
                              >
                            </div>
                          </div>
                          <div style="width: 40%; text-align: end">
                            <div
                              style="
                                margin-bottom: 10px;
                                background: #f44336;
                                border: 1px solid #f44336;
                                border-radius: 3px;
                                color: #fff;
                                width: 93px;
                                height: 40px;
                                text-align: center;
                                padding-top: 10px;
                                font-family: roboto;
                                cursor: pointer;
                              "
                              v-if="checkRelocateOut(item)"
                              @click="
                                reLocation(
                                  check_pending[0].status,
                                  item,
                                  'pending',
                                  'out'
                                )
                              "
                            >
                              <span style="font-size: 12px; font-weight: bold"
                                >RE - OUT</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </md-list-item>
                  </div>
                </md-list>
                <!-- END PENDING -->
                <!-- ALL PLAN   -->
                <md-list style="max-height: 90%; padding: 0">
                  <div @click="Expand('all')" class="head-list">
                    <div style="width: 90%">All My Customer</div>

                    <div style="width: 10%; display: grid">
                      <md-icon
                        v-if="expand != 'all' || search_expand_all == true"
                        >expand_less</md-icon
                      >
                      <md-icon v-else>expand_more</md-icon>
                    </div>
                  </div>
                  <div
                    v-if="expand === 'all' || search_expand_all == true"
                    id="left-menu-checkIn"
                    class="style-scroll"
                    style="height: 50%; overflow-y: scroll"
                  >
                    <div
                      style="padding: 10px 0 10px 0"
                      v-if="detail_plan_all.length == 0"
                    >
                      No Customer...
                    </div>
                    <md-list-item
                      v-for="(item, index) in detail_plan_all"
                      :key="index"
                    >
                      <div
                        @click="Focus_AllPlan(item)"
                        :style="{
                          width: '100%',
                          height: '100%'
                        }"
                      >
                        <div
                          class="row-item-list"
                          :style="{
                            display: 'flex',
                            width: '100%',
                            'background-color':
                              item.customer_id == check_all_plan[0].focus
                                ? '#EFEFEF'
                                : ''
                          }"
                        >
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              width: 20%;
                              height: 100%;
                            "
                          >
                            <md-avatar
                              :style="{ 'background-color': item.color_active }"
                              style="
                                pointer-events: none;
                                color: #fff;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                              "
                              class="md-avatar-icon"
                            >
                              <span
                                v-if="
                                  item.visit_date ==
                                    formatDate3(timeServer.data) &&
                                  item.checkin_time != null
                                "
                                >A</span
                              >
                              <span v-else> <md-icon>store</md-icon> </span>
                            </md-avatar>
                          </div>
                          <div style="width: 65%">
                            <div class="name-customer">
                              {{ item.customer_code }}{{ ' '
                              }}{{ item.customer_name_th }}
                            </div>
                            <md-tooltip
                              md-direction="top"
                              style="font-family: Kanit"
                              >{{ item.customer_code }}{{ ' '
                              }}{{ item.customer_name_th }}</md-tooltip
                            >
                            <div class="action-checkin">
                              <span style="font-family: Roboto"
                                ><md-icon style="opacity: 0.7; font-size: 18px"
                                  >place</md-icon
                                ><span
                                  v-if="item.distance != null"
                                  style="font-size: 12px"
                                  >{{ floatFormat(item.distance)
                                  }}{{ ' KM' }}</span
                                >
                                <span v-else>{{ '-' }}</span></span
                              >
                              <!-- <md-icon style="opacity: 0.7;font-size:8px">schedule</md-icon> -->
                              <div
                                v-if="
                                  item.visit_date ==
                                  formatDate3(timeServer.data)
                                "
                                style="
                                  padding: 0 0 0px 10px;
                                  font-family: Roboto;
                                  font-size: 12px;
                                "
                              >
                                <md-icon
                                  v-if="item.checkin_time != null"
                                  style="opacity: 0.7; font-size: 16px"
                                  >schedule</md-icon
                                >{{ formatDate2(item.checkin_time)
                                }}<span v-if="item.checkout_time != null"
                                  >{{ ' - '
                                  }}{{ formatDate2(item.checkout_time) }}{{ ' '
                                  }}{{
                                    cal_time(
                                      item.checkin_time,
                                      item.checkout_time
                                    )
                                  }}</span
                                >
                              </div>
                            </div>
                          </div>
                          <div style="width: 15%">
                            <md-button
                              :disabled="!btn_check ? true : false"
                              v-if="check_all_plan[0].focus == item.customer_id"
                              @click="
                                InOut_btn(check_all_plan[0].status, item, 'all')
                              "
                              style="
                                background-color: #ff9800;
                                color: #fff;
                                min-width: 100%;
                                margin: 0;
                                height: 100%;
                                padding: 0;
                              "
                            >
                              <span
                                style="background-color: #ff9800"
                                v-if="check_all_plan[0].status"
                                >IN</span
                              >
                              <span style="background-color: #ff9800" v-else
                                >OUT</span
                              >
                            </md-button>
                          </div>
                        </div>
                        <div
                          class="no-row-item-list"
                          v-if="checkRelocate(item)"
                          style="width: 100%; display: flex; padding-top: 3px"
                        >
                          <div style="width: 20%"></div>
                          <div style="width: 40%">
                            <div
                              style="
                                margin-bottom: 10px;
                                background: #f44336;
                                border: 1px solid #f44336;
                                border-radius: 3px;
                                color: #fff;
                                width: 76px;
                                height: 40px;
                                text-align: center;
                                padding-top: 10px;
                                font-family: roboto;
                                cursor: pointer;
                              "
                              v-if="checkRelocateIn(item)"
                              @click="
                                reLocation(
                                  check_all_plan[0].status,
                                  item,
                                  'all',
                                  'in'
                                )
                              "
                            >
                              <span style="font-size: 12px; font-weight: bold"
                                >RE - IN</span
                              >
                            </div>
                          </div>
                          <div style="width: 40%; text-align: end">
                            <div
                              style="
                                margin-bottom: 10px;
                                background: #f44336;
                                border: 1px solid #f44336;
                                border-radius: 3px;
                                color: #fff;
                                width: 93px;
                                height: 40px;
                                text-align: center;
                                padding-top: 10px;
                                font-family: roboto;
                                cursor: pointer;
                              "
                              v-if="checkRelocateOut(item)"
                              @click="
                                reLocation(
                                  check_all_plan[0].status,
                                  item,
                                  'all',
                                  'out'
                                )
                              "
                            >
                              <span style="font-size: 12px; font-weight: bold"
                                >RE - OUT</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </md-list-item>
                  </div>
                </md-list>
                <!-- END ALL PLAN -->
              </div>
            </div>
          </div>
          <div class="box-right">
            <div style="height: 100%; width: 100%" class="md-layout">
              <div style="height: 100%; width: 100%" class="md-layout-item">
                <div class="lat-long">
                  <div style="display: flex; width: 80%" id="head-lat-long">
                    Loading...
                  </div>
                  <div class="btn-drt" style="display: inline;  width: 60%; text-align: right; ">
                    <md-button
                      :style="{
                        'background-color': btn_direction
                          ? '#FF9800'
                          : '#00000042',
                        cursor: btn_direction ? 'pointer' : 'default'
                      }"
                      style="
                        color: #fff;
                        height: 35px;
                        margin: unset;
                        border-radius: 3px;
                        font-size: 12px;
                        min-width: 130px;
                        padding: 0px 5px 0px 0px;
                        /* width: 100%; */
                      "
                      @click="get_direction"
                    >
                      GET DIRECTIONS
                    </md-button>

                     <md-button
                      class="md-button md-icon-button md-raised"
                      style="
                        background-color: #FF9800;
                        margin: unset;
                        align-items: center; 
                        justify-content: center;
                        min-width: 10px; 
                        margin-top: -3px;
                      "
                      @click="get_curlocation"
                    >
                    <i aria-hidden="true" 
                      class="md-icon md-theme-default material-icons" 
                      id="btn-icon-noti" 
                      style="
                      color: white;
                      border: 8px;
                      margin: 8px;
                      ">
                      location_on
                    </i>
                    </md-button>

                    <!-- <md-button
                            :style="{
                              'background-color':btn_direction?'#FF9800' : '#00000042',
                              'cursor':btn_direction?'pointer' : 'default',
                            }"
                            style=";color:#fff;height: 35px;margin:unset;border-radius:3px;font-size: 12px;min-width:130px;padding:0px 5px 0px 0px;width: 100%;"
                            @click="test_bot"
                          >
                            TEST BOT
                          </md-button> -->
                  </div>
                </div>
                <div class="map">
                  <template v-if="current_lat != '' && current_long != ''">
                    <longdo-map @load="loadMap">
                      <longdo-map-marker
                        @add="addMarker"
                        :location="{ lon: null, lat: null }"
                      />
                    </longdo-map>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SNACK -->
    <md-snackbar
      :md-position="snk.vertical + ' ' + snk.horizontal"
      ref="snackbar"
      :md-duration="snk.duration"
    >
      <span>{{ snk.txt_warning }}</span>
      <md-button class="md-accent -oranges" @click="close_snk()"
        >REFRESH</md-button
      >
    </md-snackbar>
    <!-- END SNACK -->
  </div>
</template>

<script>
import Vue from 'vue'
import visit from '../../services/activity/visit'
import moment from 'moment'
import add from 'moment'

export default {
  name: 'pageVisit',
  data () {
    return {
      status_fake: 'Start...',
      login: false,
      current_lat: '',
      current_long: '',
      focus_item: '',
      index_focus: null,
      index_focus_all_plan: null,
      customer_code_filter: '',
      inp_txt_filter: '',
      click_focus: true,
      item_focus: [],
      check_today: [
        {
          focus: null,
          status: true
        }
      ],
      check_pending: [
        {
          focus: null,
          status: true
        }
      ],
      check_all_plan: [
        {
          focus: null,
          status: true
        }
      ],
      afterDateTime: '',
      btn_direction: false,
      mapp: '',
      check_dup: true,
      first_expand: true,
      data_ex: '',
      ccc: false,
      snk: {
        vertical: 'top',
        horizontal: 'center',
        duration: 99999,
        txt_warning: 'กดปุ่ม Refresh เพื่อความถูกต้องของข้อมูล'
      }
    }
  },
  methods: {
    reLocation (status, item, expand, mode) {
      let item_dup = ''
      if (expand === 'pending') {
        for (let index = 0; index < this.detail_plan_today.length; index++) {
          const element = this.detail_plan_today[index]
          if (element.customer_code == item.customer_code) {
            item_dup = element.customer_id
          }
        }
      }
      let obj = {
        status: mode,
        customer_id: item.customer_id,
        lat: this.current_lat,
        long: this.current_long,
        plan_id: item.plan_id,
        customer_code: item.customer_code,
        visit_status: item.visit_status,
        visit_date: item.visit_date,
        expand: expand,
        check_duplicate: item_dup
      }
      visit
        .reLocation(obj)
        .then(response => {
          this.$store.dispatch('getAllPlan', {
            lat: this.current_lat,
            long: this.current_long,
            select_date: '',
            expand: expand,
            check_duplicate: item_dup
          })
        })
        .catch()
    },
    checkRelocate (item) {
      if (
        item.status_location_in != undefined ||
        item.status_location_out != undefined
      ) {
        return true
      } else {
        return false
      }
    },
    checkRelocateIn (item) {
      if (item.status_location_in != undefined) {
        if (item.status_location_in != '0') {
          return true
        } else {
          // return true
          return false
        }
      } else {
        return false
      }
    },
    checkRelocateOut (item) {
      if (item.status_location_out != undefined) {
        if (item.status_location_out != '0') {
          return true
        } else {
          // return true
          return false
        }
      } else {
        return false
      }
    },
    loadMap (map) {
      this.mapp = map
      //  console.log(this.current_lat)
      map.Layers.setBase(longdo.Layers.NORMAL)
      // var marker = new longdo.Marker({ lon: 99.745565, lat: 13.6983423  });
      var marker1 = new longdo.Marker(
        { lon: this.current_long, lat: this.current_lat },
        {
          title: 'Marker',
          icon: {
            html: '<div style="display: flex;justify-content: center;align-items: center;text-align:center"><span class="dot"></span><span class="dot2"></span></div>'
          },
          detail: '',
          visibleRange: { min: 1, max: 20 },
          draggable: false,
          weight: longdo.OverlayWeight.Top
        }
      )
      map.Ui.Fullscreen.visible(false)
      map.Ui.Crosshair.visible(false)
      map.Overlays.add(marker1)
      map.location({ lon: this.current_long, lat: this.current_lat }, true)
      map.zoom(17, true)
    },
    addMarker (marker) {
      // marker.location(10 ,20)
    },
    checkIn_progress () {
      // visit
      //     .checkInHistory()
      //     .then((response) => {
      this.click_focus = true
      this.item_focus = []
      this.btn_direction = false

      this.check_today[0].status = true
      this.check_today[0].focus = null

      this.check_pending[0].status = true
      this.check_pending[0].focus = null

      this.check_all_plan[0].status = true
      this.check_all_plan[0].focus = null

      // console.log('start => ',this.first_expand)

      for (let index = 0; index < this.detail_plan_today.length; index++) {
        const element = this.detail_plan_today[index]
        if (element.checkin_time != null && element.checkout_time == null) {
          this.$store.commit('SET_EXPAND_PLAN', 'today')
          // console.log('A')
          this.click_focus = false
          this.item_focus = element
          this.check_today[0].status = false
          this.check_today[0].focus = element.plan_id
          this.btn_direction = true
        }
      }
      // console.log('1 => ',this.first_expand)

      for (let index = 0; index < this.detail_plan_pending.length; index++) {
        const element = this.detail_plan_pending[index]
        if (
          element.checkin_time != null &&
          element.checkout_time == null &&
          element.visit_status == 'a'
        ) {
          this.$store.commit('SET_EXPAND_PLAN', 'pending')
          // console.log('B')
          this.click_focus = false
          this.item_focus = element
          this.check_pending[0].status = false
          this.check_pending[0].focus = element.customer_id
          this.btn_direction = true
        }
      }
      //  console.log('2 => ',this.first_expand)
      for (let index = 0; index < this.detail_plan_all.length; index++) {
        const element = this.detail_plan_all[index]
        if (element.checkin_time != null && element.checkout_time == null) {
          this.$store.commit('SET_EXPAND_PLAN', 'all')
          // console.log('C')
          console.log('Y 100 ===> ', element)
          this.click_focus = false
          this.item_focus = element
          this.check_all_plan[0].status_location_in = element.status_location_in
          this.check_all_plan[0].status_location_out =
            element.status_location_out
          this.check_all_plan[0].status = false
          this.check_all_plan[0].focus = element.customer_id
          this.btn_direction = true
        }
      }

      // console.log('3 => ',this.first_expand)
      this.$store.commit('SET_SHOW_SPINNER_LOADING', false)
      if (this.data_ex != '') {
        this.$store.commit('SET_EXPAND_PLAN', this.data_ex)
      }
      // })
      // .catch();
    },
    floatFormat (val) {
      return parseFloat(val)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    Expand (param) {
      if (param == this.expand) {
        this.$store.commit('SET_EXPAND_PLAN', '')
      } else {
        if (param === 'today') {
          this.$store.commit('SET_EXPAND_PLAN', 'today')
        } else if (param === 'all') {
          this.$store.commit('SET_EXPAND_PLAN', 'all')
        } else {
          this.$store.commit('SET_EXPAND_PLAN', 'pending')
        }
      }

      //   console.log(param)
    },
    getLocation () {
      var x = document.getElementById('demo')
      var y = document.getElementById('head-lat-long')

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition)
      } else {
        y.innerHTML = 'Geolocation is not supported by this browser.'
      }
    },
    async showPosition (position) {
      var y = document.getElementById('head-lat-long')
      y.innerHTML =
        'Current Location ' +
        position.coords.latitude +
        ', ' +
        position.coords.longitude +
        ' ( accuracy : ' +
        this.floatFormat(position.coords.accuracy) + 
        ' )'

      this.current_lat = position.coords.latitude
      this.current_long = position.coords.longitude

      await this.$store.dispatch('getAllPlan', {
        lat: position.coords.latitude,
        long: position.coords.longitude,
        select_date: '',
        expand: ''
      })
    },
    Focus (param) {
      // console.log( param)
      // console.log(param.lat_mobile, param.long_mobile)
      this.mapp.Overlays.clear()
      this.loadMap(this.mapp)
      // var marker = new longdo.Marker({ lon:param.long_mobile, lat: param.lat_mobile });
      var marker = new longdo.Marker(
        { lon: param.long_mobile, lat: param.lat_mobile },
        {
          title: 'Marker'
        }
      )

      // this.mapp.Overlays.add(marker);
      this.mapp.location(
        { lon: param.long_mobile, lat: param.lat_mobile },
        true
      )
      this.mapp.zoom(10, true)
      this.mapp.Route.clear()
      this.mapp.Route.add({ lon: this.current_long, lat: this.current_lat })
      this.mapp.Route.add(
        new longdo.Marker(
          { lon: param.long_mobile, lat: param.lat_mobile },
          {
            html:
              '<div class="bubble" >' +
              param.customer_code +
              ' ' +
              param.customer_name_th +
              '</div>',
            title:
              '<div>' +
              param.customer_code +
              ' ' +
              param.customer_name_th +
              '</div>',
            detail:
              '<div>' +
              param.customer_code +
              ' ' +
              param.customer_name_th +
              '</div>'
          }
        )
      )

      // this.mapp.Route.add({ lon: param.long_mobile, lat: param.lat_mobile },{title: 'Marker',});
      this.mapp.Route.search()
      this.mapp.Route.auto(true)

      if (this.click_focus) {
        this.item_focus = param
        this.check_pending[0].focus = null
        this.check_all_plan[0].focus = null

        this.check_today[0].focus = param.plan_id
        if (param.lat_mobile == null || param.long_mobile == null) {
          this.btn_direction = false
        } else {
          this.btn_direction = true
        }
        // this.index_focus_all_plan = null
        // this.check[0].item = param
      }
      // console.log(param)
    },
    Focus_pending (param) {
      // console.log(param)
      this.mapp.Overlays.clear()
      this.loadMap(this.mapp)

      var marker = new longdo.Marker({
        lon: param.long_mobile,
        lat: param.lat_mobile
      })
      // this.mapp.Overlays.add(marker);
      this.mapp.location(
        { lon: param.long_mobile, lat: param.lat_mobile },
        true
      )
      this.mapp.zoom(10, true)
      this.mapp.Route.clear()
      this.mapp.Route.add({ lon: this.current_long, lat: this.current_lat })
      this.mapp.Route.add(
        new longdo.Marker(
          { lon: param.long_mobile, lat: param.lat_mobile },
          {
            title:
              '<div>' +
              param.customer_code +
              ' ' +
              param.customer_name_th +
              '</div>',
            detail:
              '<div>' +
              param.customer_code +
              ' ' +
              param.customer_name_th +
              '</div>'
          }
        )
      )

      this.mapp.Route.search()
      this.mapp.Route.auto(true)
      if (this.click_focus) {
        // console.log( param)
        this.item_focus = param
        this.check_today[0].focus = null
        this.check_all_plan[0].focus = null

        this.check_pending[0].focus = param.customer_id
        if (param.lat_mobile == null || param.long_mobile == null) {
          this.btn_direction = false
        } else {
          this.btn_direction = true
        }
        //   this.index_focus_all_plan = null
        //   this.check[0].item = param
        //   this.index_focus = param.plan_id
        // }
      }
    },
    Focus_AllPlan (param) {
      // console.log(param)
      this.mapp.Overlays.clear()
      this.loadMap(this.mapp)

      var marker = new longdo.Marker({
        lon: param.long_mobile,
        lat: param.lat_mobile
      })
      // this.mapp.Overlays.add(marker);
      this.mapp.location(
        { lon: param.long_mobile, lat: param.lat_mobile },
        true
      )
      this.mapp.zoom(10, true)
      this.mapp.Route.clear()
      this.mapp.Route.add({ lon: this.current_long, lat: this.current_lat })
      this.mapp.Route.add(
        new longdo.Marker(
          { lon: param.long_mobile, lat: param.lat_mobile },
          {
            html:
              '<div class="bubble" >' +
              param.customer_code +
              ' ' +
              param.customer_name_th +
              '</div>',
            title:
              '<div>' +
              param.customer_code +
              ' ' +
              param.customer_name_th +
              '</div>',
            detail:
              '<div>' +
              param.customer_code +
              ' ' +
              param.customer_name_th +
              '</div>'
          }
        )
      )

      // this.mapp.Route.add({ lon: param.long_mobile, lat: param.lat_mobile },{title: 'Marker',});
      this.mapp.Route.search()
      this.mapp.Route.auto(true)
      if (this.click_focus) {
        this.item_focus = param
        this.check_today[0].focus = null
        this.check_pending[0].focus = null

        this.check_all_plan[0].focus = param.customer_id
        if (param.lat_mobile == null || param.long_mobile == null) {
          this.btn_direction = false
        } else {
          this.btn_direction = true
        }
      }
    },
    get_direction () {
      if (this.btn_direction) {
        var go = String(
          this.current_lat +
            ',' +
            this.current_long +
            '/' +
            this.item_focus.lat_mobile +
            ',' +
            this.item_focus.long_mobile
        )
        window.open('https://www.google.com/maps/dir/' + go)
      }
    },
    get_curlocation () {
      this.mapp.Overlays.clear();
      this.loadMap(this.mapp)
      this.mapp.location(longdo.LocationMode.Geolocation);
    },
    // test_bot(){
    //   this.$store.dispatch('botCheckin','61113')
    // },
    iconClick () {
      this.inp_txt_filter = ''
      this.$store.commit('SEARCH_ALL_PLAN', '')
      this.customer_code_filter = ''
    },
    mouseLeave () {},
    filterCust: function (param) {
      if (param.length > 2) {
        this.$store.commit('SEARCH_ALL_PLAN', param)
        let _this = this
        this.customer_code_filter = param
      } else {
        // this.$store.commit('SET_FULL_DATA')
        this.$store.commit('SEARCH_ALL_PLAN', '')
        this.customer_code_filter = ''
      }
    },
    chooseCust (item) {
      this.inp_txt_filter = item.customer_code + ' ' + item.customer_name
      // console.log('A',item)
    },
    formatDate (param) {
      return moment(param).format('dddd,  MMMM DD,  YYYY')
    },
    formatDate2 (param) {
      if (param != '' && param != null) {
        return moment(param).format('h:mm A')
      }
    },
    formatDate3 (param) {
      if (param != '' || param != null) {
        return moment(param).format('YYYY-MM-DD')
      }
    },
    durationAPI (c_in, c_out) {
      var year_start = moment(c_in).format('YYYY')
      var mount_start = moment(c_in).format('MM')
      var d_start = moment(c_in).format('D')
      var h_start = moment(c_in).format('k')
      var m_start = moment(c_in).format('mm')
      var s_start = moment(c_in).format('s')

      var year_end = moment(c_out).format('YYYY')
      var mount_end = moment(c_out).format('MM')
      var d_end = moment(c_out).format('D')
      var h_end = moment(c_out).format('k')
      var m_end = moment(c_out).format('mm')
      var s_end = moment(c_out).format('s')

      var result = add(
        new Date(year_start, mount_start, d_start, h_start, m_start, s_start),
        {}
      )
      var result2 = add(
        new Date(year_end, mount_end, d_end, h_end, m_end, s_end),
        {}
      )
      var ms = Number(result2) - Number(result)

      var hours = Math.floor(ms / 1000 / 60 / 60)
      var minutes = Math.floor(ms / 60000) % 60
      var seconds = (ms / 1000) % 60

      // console.log(minutes)

      if (hours < 0) {
        hours = hours * -1
      }

      if (minutes < 0) {
        minutes = minutes * -1
      }

      // console.log(hours + ':' + minutes + ':' + seconds);
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      var Timer =
        'Duration:' + hours + 'h ' + minutes + 'min ' + seconds + 'sec'
      return hours + ':' + minutes + ':' + seconds
    },
    cal_time (c_in, c_out) {
      if (c_in != null && c_out != null) {
        var year_start = moment(c_in).format('YYYY')
        var mount_start = moment(c_in).format('MM')
        var d_start = moment(c_in).format('D')
        var h_start = moment(c_in).format('k')
        var m_start = moment(c_in).format('mm')
        var s_start = moment(c_in).format('s')

        var year_end = moment(c_out).format('YYYY')
        var mount_end = moment(c_out).format('MM')
        var d_end = moment(c_out).format('D')
        var h_end = moment(c_out).format('k')
        var m_end = moment(c_out).format('mm')
        var s_end = moment(c_out).format('s')

        var result = add(
          new Date(year_start, mount_start, d_start, h_start, m_start, 0),
          {}
        )
        var result2 = add(
          new Date(year_end, mount_end, d_end, h_end, m_end, 0),
          {}
        )
        var ms = Number(result2) - Number(result)

        var hours = Math.floor(ms / 1000 / 60 / 60)
        var minutes = Math.floor(ms / 60000) % 60
        var seconds = (ms / 1000) % 60

        if (hours < 0) {
          hours = hours * -1
        }

        if (minutes < 0) {
          minutes = minutes * -1
        }

        // console.log(hours + ':' + minutes + ':' + seconds);
        if (hours < 10) {
          hours = '0' + hours
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        var Timer =
          'Duration:' + hours + 'h ' + minutes + 'min ' + seconds + 'sec'

        // console.log(c_in,c_out,'===>',Timer)
        return '(' + hours + ':' + minutes + ')'
      } else {
      }
    },
    InOut_btn (param, item, expands) {
      // fetch('http://www.geoplugin.net/json.gp',{headers:{
      //   'Access-Control-Allow-Origin': 'http://www.geoplugin.net/json.gp',
      //   'Access-Control-Allow-Credentials': true
      // }})
      // .then((resp) => {
      //   if(!resp.ok) {
      //     console.warn('Cannot fetch location data')
      //     return
      //   }
      //   return resp.json()
      // })
      // .then((data) => {
      //   //Check if the location matches with a margin of one degree
      //   if(Math.abs(this.current_lat - data.geoplugin_latitude) < 1 && Math.abs(this.current_long - data.geoplugin_longitude) < 1) {
      //     console.log("Location is valid")
      //     this.status_fake = 'OK'
      //   } else {
      //     this.status_fake = "Fake Location !!!"
      //     console.warn("Location is probably fake")
      //   }
      // })
      this.$store.commit('SET_BTN_CHECK', false)
      let status_type = ''
      let p_id = 0
      let item_dup = ''
      if (expands === 'pending' || expands === 'all') {
        status_type = 'a'
      } else {
        status_type = 'pa'
      }
      if (expands === 'pending') {
        for (let index = 0; index < this.detail_plan_today.length; index++) {
          const element = this.detail_plan_today[index]
          if (element.customer_code == item.customer_code) {
            p_id = element.plan_id
            status_type = 'pa'
            item_dup = element.customer_id
          }
        }
      } else {
        p_id = item.plan_id
      }
      this.$store.commit('SET_SEARCH_TXT', this.customer_code_filter)
      this.$store.commit('SET_EXPAND_PLAN', expands)
      visit
        .getTimeServer()
        .then(response => {
          if (
            String(moment(response.data).format('YYYY-MM-DD')) !=
            String(JSON.parse(Vue.localStorage.get('timestamp_on_page')))
          ) {
            this.$store.commit('SET_BTN_CHECK', true)
            this.$refs.snackbar.open()
          } else {
            if (!param) {
              this.data_ex = expands
              // console.log('out')
              this.getLocation()
              setTimeout(() => {
                const res = {
                  customer_id: item.customer_id,
                  type: 'checkout',
                  datetime: response.data,
                  purpose_ids: [],
                  lat: this.current_lat,
                  long: this.current_long,
                  visit_type: status_type,
                  checkin_type: 'auto',
                  type_customer: 'm',
                  imei: 0,
                  duration: 0,
                  plan_id: p_id,
                  emp_id: Vue.localStorage.get('emp_id'),
                  visit_date: moment(response.data).format('YYYY-MM-DD'),
                  customer_code: item.customer_code,
                  expand: expands,
                  search_txt: this.customer_code_filter,
                  check_duplicate: item_dup,
                  customer_name_th: item.customer_name_th
                }
                // console.log('out',res)
                this.$store.dispatch('userCheckIn', res)
                this.loadMap(this.mapp)
              }, 200)
            } else {
              this.data_ex = ''
              // console.log('Local => ',Vue.localStorage.get('MARK_LOCATION'))
              this.getLocation()
              console.log(this.current_lat)
              setTimeout(() => {
                const res = {
                  customer_id: item.customer_id,
                  type: 'checkin',
                  datetime: response.data,
                  purpose_ids: [],
                  lat: this.current_lat,
                  long: this.current_long,
                  visit_type: status_type,
                  checkin_type: 'auto',
                  type_customer: 'm',
                  imei: 0,
                  duration: 0,
                  plan_id: p_id,
                  emp_id: Vue.localStorage.get('emp_id'),
                  visit_date: moment(response.data).format('YYYY-MM-DD'),
                  customer_code: item.customer_code,
                  expand: expands,
                  search_txt: this.customer_code_filter,
                  check_duplicate: item_dup,
                  customer_name_th: item.customer_name_th
                }
                //  console.log('in',res)
                this.$store.dispatch('userCheckIn', res)
                this.loadMap(this.mapp)
              }, 200)
            }
          }

          this.afterDateTime = response.data
        })
        .catch()
      // console.log(item,moment(this.timeServer).format("YYYY-MM-DD k:mm:ss"))
    },
    close_snk () {
      this.$refs.snackbar.close()
      location.reload()
    }
  },
  components: {
    'waring-login': require('../Salesops/layout/waring-login'),
    'md-auto-focus-box': require('../Salesops/customComponent/md-auto-focus-box-checkin.vue')
  },
  computed: {
    timeServer () {
      return this.$store.getters['timeServer']
    },
    detail_plan_today () {
      // console.log('today')
      return this.$store.getters['plan_today']
    },
    detail_plan_pending () {
      // console.log('pending')
      return this.$store.getters['plan_pending']
    },
    detail_plan_all () {
      // console.log('all')
      return this.$store.getters['all_plan']
    },
    delay_check () {
      this.$store.commit('SET_SHOW_SPINNER_LOADING', true)
      if (this.$store.getters['delay_check'] == true) {
        this.checkIn_progress()
      }
      return this.$store.getters['testt']
    },
    filter () {
      return this.$store.getters['myorders/autocom_cg']
    },
    loadCustStatus () {
      return this.$store.getters['myorders/loadCustStatus']
    },
    spinner () {
      return this.$store.getters['spinner_loading']
    },
    expand () {
      return this.$store.getters['expand']
    },
    search_expand_today () {
      return this.$store.getters['search_expand_today']
    },
    search_expand_pending () {
      return this.$store.getters['search_expand_pending']
    },
    search_expand_all () {
      return this.$store.getters['search_expand_all']
    },
    btn_check () {
      return this.$store.getters['btn_check']
    }
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.$store.commit('SET_STATUS_LOGIN', false)
      this.$router.replace('/')
    } else {
      this.getLocation()
      // this.$store.dispatch('checkInHistory')
      this.$store.dispatch('setPathMenuService', 'activity')
      this.login = true
      this.$store.commit('SET_STATUS_LOGIN', true)
    }
  }
}
</script>

<style>
.box_visit {
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.box-left {
  display: flex;
  background-color: #ffffff;
  width: 45%;
  height: calc(100vh - 80px);
  border: 1px solid #d1d1d1;
}
.a:hover {
  backgrpund-color: red;
}
.box-right {
  width: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.map {
  border: 1px solid #000;
  width: 90%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 0 0 40px;
}
@media screen and (min-width: 600px) and (min-height: 900px) {
  .title-menu {
  }
  .map {
    height: 40%;
  }
  .box-left {
    width: 35%;
    height: calc(110vh - 80px);
  }
  .box-right {
    width: 65%;
  }
}

.title-menu {
  color: #797979;
  text-align: left;
  font-family: Lato;
  font-size: 18px;
  letter-spacing: 0px;
  color: #797979;
  opacity: 1;
  height: 40px;

  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px 0 0 20px;
  font-weight: bold;
}
.head-list {
  background: #f7f7f7 0% 0% no-repeat padding-box;
  border: 0.5px solid #d1d1d1;
  opacity: 1;
  height: 35px;
  display: flex;

  text-align: left;
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0px;
  color: #727272;
  opacity: 1;
  align-items: center;
  cursor: pointer;
  padding: 10px 0 10px 20px;
}
.item-list {
  /* height: 60px; */
  /* border:1px solid red; */
  display: flex;
}
.item-list :hover {
  /* background-color: #efefef; */
  /* cursor: pointer; */
}
.row-item-list:hover {
  background-color: #efefef;
  cursor: pointer;
}

.style-scroll::-webkit-scrollbar {
  width: 0.5em;
}
.style-scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgbs(0, 0, 0.3);
}
.style-scroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgb(0, 0, 0, 0.11);
  outline: 0px solid slategray;
}
.name-customer {
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  height: 50%;
  padding: 8px 0 0 0;
  align-items: center;
  text-align: left;
  font-family: Kanit;
  font-size: 16px;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
}

.btn-sub:hover {
  background-color: red;
}
.name-customer2 {
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  height: 50%;
  padding: 8px 0 0 0;
  align-items: center;
  text-align: left;
  font-family: Kanit;
  font-size: 16px;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
}

.action-checkin {
  height: 50%;
  display: flex;
  align-items: center;
  font-family: Roboto;
  color: #0000008a;
  font-size: 14px;
}

.lat-long {
  display: flex;
  margin: 0px 0 0 40px;
  width: 90%;
  height: 80px;
  align-items: flex-end;
  font-family: Roboto;
  font-size: 12px;
  letter-spacing: 0px;
  color: #727272;
  opacity: 1;
}
.btn-drt {
  padding: 0 0 5px;
  width: 20%;
}

.dot {
  height: 50px;
  width: 50px;
  background-color: #ffffff59;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
}
.dot2 {
  height: 15px;
  width: 15px;
  border: 5px solid #fff;
  background-color: #ff9800;
  border-radius: 50%;
  display: inline-block;
  position: relative;
}

.bubble {
  height: auto;
  width: auto;
  margin: 0 0 150px 0;
  min-width: 200px;
  background: #fff;
  border-radius: 4px;
  font-size: 12px;
  /* text-align: center; */
  padding: 10px;
  padding-bottom: 22px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 4px #fd7f00;
  border: 0.5px solid #fd7f00;
  opacity: 1;
  color: #727272;
}
</style>
