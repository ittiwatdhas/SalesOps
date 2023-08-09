<template>
  <div id="sales-incen-staptwo">
    <div style="width: 100%; text-align: right">
      <md-button
        class="-gray-A8"
        style="
          height: 30px;
          min-height: 30px;
          margin: unset;
          border-radius: 3px;
          font-size: 12px;
          margin-right: 10px;
          line-height: 30px;
        "
        @click="openDG('savedraft')"
        >save</md-button
      >
      <md-button
        class="-orange"
        style="
          height: 30px;
          min-height: 30px;
          margin: unset;
          border-radius: 3px;
          font-size: 12px;
          margin-right: 10px;
          line-height: 30px;
        "
        @click="openDG('saveAndnext')"
        >next</md-button
      >
    </div>
    <!--BLOCK HEAD-->
    <div
      class="mds-card head-box"
      style="
        margin-top: 10px;
        width: 100%;
        padding: 10px 20px;
        margin-bottom: 15px;
      "
    >
      <div style="width: 100%; display: flex">
        <div style="width: 25%; text-align: left">
          <div class="text-1">Sales Cycle</div>
          <div class="text-2 no-under-line-dp" style="padding-right: 10%">
            <md-input-container
              style="margin: 0px; padding-top: 0px; min-height: 30px"
            >
              <md-select v-model="step2.head.sales_cycle">
                <md-option
                  v-for="(row, idx) in step2.head.salesCycleList"
                  @selected="selectSalesCycle(row)"
                  :value="row.code"
                  :key="'s-cyle' + idx"
                >
                  <span
                    :style="{
                      color:
                        step2.head.sales_cycle == row.code
                          ? '#fd7f00'
                          : 'black',
                    }"
                    >{{ formatterDate(row.start_date) }} -
                    {{ formatterDate(row.end_date) }}</span
                  >
                </md-option>
              </md-select>
            </md-input-container>
          </div>
        </div>
        <div style="width: 25%; text-align: left; padding-left: 5%">
          <div class="text-1">Pay Date</div>
          <div class="text-2" style="padding-top: 5px">
            <span v-if="step2.head.pay_date != '-'">{{
              formatterDate(step2.head.pay_date)
            }}</span>
            <span v-else>{{ step2.head.pay_date }}</span>
          </div>
        </div>
        <div style="width: 50%; text-align: left" class="no-under-line-dp">
          <div class="text-1">Recipient Group</div>
          <md-input-container
            style="margin: unset; min-height: 30px; padding: 0px"
          >
            <md-select @selected="selecedTeam" v-model="step2.head.teams">
              <md-option
                v-for="row in step2.head.teamsList"
                :key="row.code"
                :value="row.code"
              >
                <template>
                  <div
                    style="
                      display: -webkit-box;
                      width: 100%;
                      padding-bottom: 7px;
                    "
                  >
                    <!-- 'white-space': 'nowrap', -->
                    <div
                      :style="{
                        width: '230px',
                        'line-height': '1.4',
                        'white-space': 'initial',
                        'text-overflow': 'ellipsis',
                        color:
                          step2.head.teams == row.code ? '#fd7f00' : 'black',
                        display: 'block',
                        'padding-right': '5px',
                        overflow: 'hidden',
                      }"
                    >
                      {{ row.name }}
                    </div>
                    <div style="width: 15px; padding-top: 3px">
                      <div
                        class="step1tab2-team-chip"
                        style="height: 15px"
                        v-if="row.status == 'active'"
                      ></div>
                      <div
                        class="step1tab2-unteam-chip"
                        style="height: 15px"
                        v-else
                      ></div>
                      <!-- <div style="width:60px;padding-top:3px"> -->
                      <!-- <div class="step1tab2-team-chip" style="" v-if="row.status != ''">{{row.status}}</div> -->
                    </div>
                  </div>
                </template>
              </md-option>
            </md-select>
          </md-input-container>
        </div>
      </div>
    </div>
    <!--BLOCK DETAIL-->
    <div
      v-if="step2.detail.length == 0"
      class="mds-card"
      style="
        color: rgba(0, 0, 0, 0.99);
        text-align: center;
        width: 100%;
        padding: 10% 0%;
        font-size: 15px;
      "
    >
      No data...
    </div>
    <div
      v-for="(row, index) in step2.detail"
      :key="'con' + row.code"
      style="width: 100%; display: flex"
    >
      <div
        class="mds-card"
        style="margin-bottom: 20px; width: 50%; padding: 16px; display: block"
      >
        <div style="width: 100%; display: flex">
          <div class="show-check-no bg">{{ index + 1 }}</div>
          <div
            style="
              font-family: kanit;
              color: #414141;
              ont-size: 18px;
              margin-left: 12px;
              padding-top: 1px;
            "
          >
            {{ row.title }}
          </div>
        </div>
        <!--ROW 1-->
        <div
          style="width: 100%; display: flex; padding-top: 15px"
          class="mds-body"
          v-for="(record, idx) in row.tac_use"
          :key="'tac_use-' + idx"
        >
          <div style="width: 5%; padding-top: 10px" class="text-1">
            <!-- tac_use -->
            <input
              v-if="record.show_checkbox"
              type="checkbox"
              v-model="record.checked"
              style="height: 20px; width: 20px"
              @change="setConChk($event)"
            />
          </div>
          <div
            style="
              width: 30%;
              padding-top: 10px;
              padding-left: 8px;
              padding-right: 5px;
              text-align: left;
            "
            class="text-1"
          >
            {{ record.title }}
          </div>
          <div style="width: 20%" class="no-under-line">
            <md-input-container>
              <md-select
                v-model="record.symbols_code"
                :disabled="record.show_checkbox"
              >
                <md-option
                  @click.native="chooseSymbol(index)"
                  :value="row.code"
                  v-for="row in masterStep1.arrSymbols"
                  :key="'arrdg1' + row.code"
                  >{{ row.title }}</md-option
                >
              </md-select>
            </md-input-container>
          </div>
          <div
            style="
              width: 27%;
              padding-left: 4%;
              padding-right: 5%;
              padding-top: 4px;
              display: flex;
            "
            class="under-line"
          >
            <div style="padding-top: 6px; font-size: 12px; color: #5a5a5a">
              {{ renderUnit(record.unit_code) }}
            </div>
            <template>
              <mds-input
                v-model="record.math_value"
                :id="'tac_use_step2-' + row.tactics_id + '-math_value-' + idx"
                :table="'math_value_step2'"
                :index="index"
                :indexDetail="index"
                type="detail"
                :readOnly="record.show_checkbox"
                @calculate="changeMathVal"
              ></mds-input>
            </template>
          </div>
          <div style="width: 15%" class="no-under-line">
            <md-input-container>
              <md-select
                v-model="record.unit_code"
                :disabled="record.show_checkbox"
              >
                <md-option
                  @click.native="chooseUnitCode(index)"
                  :value="row.code"
                  v-for="row in masterStep1.arrUnits"
                  :key="'arrdg1' + row.code"
                  >{{ row.title }}</md-option
                >
              </md-select>
            </md-input-container>
          </div>
        </div>
        <!--ROW 2-->
        <div style="width: 100%; display: flex" class="mds-body">
          <div
            style="
              width: 35%;
              padding-top: 10px;
              padding-left: 38px;
              text-align: left;
            "
            class="text-1"
          >
            เพดานเงินรางวัล
          </div>
          <div style="width: 20%" class="no-under-line">
            <md-input-container>
              <md-select
                v-model="row.range_code"
                @selected="slectedRange(index)"
              >
                <md-option
                  :value="row.code"
                  v-for="row in masterStep1.arrRange"
                  :key="'arrdg1' + row.code"
                  >{{ row.title }}</md-option
                >
              </md-select>
            </md-input-container>
          </div>
          <div
            style="
              width: 25%;
              padding-left: 5%;
              padding-right: 3%;
              display: flex;
              padding-top: 4px;
            "
            class="under-line"
          >
            <div style="padding-top: 6px; font-size: 12px; color: #5a5a5a">
              ฿
            </div>
            <template>
              <mds-input
                v-model="row.max_reward"
                :id="'max_reward_step2-' + row.tactics_id"
                :table="'max_reward_step2'"
                :index="index"
                :indexDetail="index"
                type="detail"
                :readOnly="false"
              ></mds-input>
            </template>
          </div>
          <div style="width: 20%"></div>
        </div>
        <!--ROW 3-->
        <div
          style="
            width: 100%;
            display: flex;
            padding-top: 18px;
            text-align: left;
          "
          class="mds-body"
        >
          <div :style="{ width: '35%', 'padding-left': '38px' }" class="text-1">
            <span v-if="row.tac_type == 1 || row.tac_type == 3"
              >ขั้นเงินรางวัล</span
            >
            <span v-else-if="row.tac_type == 2">ขั้นเงินรางวัล แปรผันตาม</span>
          </div>
          <div
            class="text-2"
            :style="{
              width: '25%',
              'text-align': 'center',
              'padding-right': '5%',
            }"
          >
            Target (%)
          </div>
          <div :style="{ width: '18%', 'text-align': 'center' }" class="text-2">
            <span v-if="row.tac_type == 1 || row.tac_type == 3"
              >Incentive (฿)</span
            >
            <span v-else-if="row.tac_type == 2">Incentive (%)</span>
          </div>
          <div
            :style="{
              width: '22%',
              'text-align': 'left',
              'padding-left': '2%',
            }"
            class="text-2"
          >
            <md-icon
              @click.native="addReward(index)"
              style="color: #fd7f00; cursor: pointer"
              >add_circle</md-icon
            >
          </div>
        </div>
        <!--ROW 3-->
        <div
          style="width: 100%; display: flex; padding-bottom: 10px"
          class="mds-body hide-icon"
          v-for="(record, idx) in row.rewards"
          :key="index + 'reword-row' + idx"
        >
          <div
            :style="{
              width: row.tac_type == 1 || row.tac_type == 3 ? '35%' : '35%',
            }"
          ></div>
          <div
            :style="{
              width: '25%',
              'text-align': 'center',
              'padding-right': '5%',
            }"
            class="under-line"
          >
            <template>
              <mds-input
                v-model="record.target"
                :table="'target_step2'"
                :id="'rewards_step2-' + row.tactics_id + '-target-' + idx"
                :index="index"
                :indexDetail="idx"
                type="detail"
                :readOnly="false"
              ></mds-input>
            </template>
          </div>
          <div
            :style="{ width: '18%', 'text-align': 'left' }"
            class="under-line"
          >
            <div
              v-if="
                row.tac_type == 1 ||
                row.tac_type == 3 ||
                (row.tac_type == 2 && record.incentive > 0)
              "
            >
              <template>
                <mds-input
                  :id="'rewards_step2-' + row.tactics_id + '-incentive-' + idx"
                  v-model="record.incentive"
                  :table="'incentive_step2'"
                  @setincentive="setIncentive"
                  :index="index"
                  :indexDetail="idx"
                  type="detail"
                  :readOnly="false"
                ></mds-input>
              </template>
            </div>
            <div
              v-else-if="row.tac_type == 2 && record.incentive == 0"
              style="
                color: #a8a8a8;
                font-size: 11px;
                padding-top: 8px;
                text-align: center;
              "
            >
              achieve target (%)
            </div>
          </div>
          <div
            :style="{
              width: '22%',
              'text-align': 'left',
              'padding-left': '2%',
            }"
            class="text-2"
          >
            <md-icon
              style="cursor: pointer; opacity: 0.5"
              class="del"
              @click.native="delReward(index, idx)"
              >remove_circle</md-icon
            >
            <md-icon
              v-if="row.tac_type == 2 && record.incentive == 0"
              style="cursor: pointer; font-size: 16px; padding-top: 3px"
              class="del"
              @click.native="editReward(index, idx)"
              >edit</md-icon
            >
          </div>
        </div>
      </div>
      <div class="mds-card-gray" style="margin-bottom: 20px; width: 50%">
        <div style="width: 100%">
          <div
            :style="{
              'margin-bottom': row.conditions_select == '5' ? '20px' : '',
            }"
            style="width: 100%; padding-top: 10px; display: flex"
          >
            <div style="width: 45%" class="no-under-line">
              <md-input-container id="asd" style="margin: 0px">
                <md-select id="hhgghh" v-model="row.conditions_select">
                  <md-option
                    :value="row.code"
                    v-for="row in row.ms_conditions"
                    :key="'r-conditon' + row.code"
                    @click.native="slectedRightCondition(index, row)"
                    >{{ row.title }}</md-option
                  >
                </md-select>
              </md-input-container>
            </div>
            <div style="width: 55%; text-align: right">
              <!-- v-if="row.conditions_select != '3' && row.conditions_select != '4'" -->
              <md-button
                v-if="row.conditions_select != '4'"
                class="md-primary"
                style="
                  margin: unset;
                  background: #a8a8a8;
                  color: #fff;
                  font-size: 11px;
                  height: 30px;
                  min-height: 30px;
                  line-height: 30px;
                "
                @click="showDialogStepTwo(row, index + 1)"
                >ADD / REMOVE item</md-button
              >
            </div>
          </div>
          <!-- v-if="row.conditions_select != '3' && row.conditions_select != '4'" -->
          <div
            style="
              width: 100%;
              padding-top: 10px;
              display: flex;
              padding-bottom: 10px;
              padding-right: 40%;
            "
            v-if="row.conditions_select != '5' && row.conditions_select != '4'"
          >
            <md-search-box
              :placeholder="'Search…'"
              :index="index"
              @filter="filterItems"
              :value="row.search_cg"
              @clear="keywordCLR"
            ></md-search-box>
          </div>
          <div
            style="
              border-radius: 5px;
              align-items: center;
              height: 35px;
              color: #fff;
              background-color: rgb(168, 168, 168);
              width: 100%;
              display: flex;
            "
            v-if="row.conditions_select == '5'"
          >
            <div
              :style="{
                'font-family': 'kanit',
                width: '15%',
                'text-align': 'right',
              }"
            >
              REWARDS
            </div>
            <div
              :style="{
                'font-family': 'kanit',
                width: '17%',
                'text-align': 'center',
              }"
            >
              TYPE
            </div>
            <div
              :style="{
                'font-family': 'kanit',
                width: '17%',
                'text-align': 'center',
              }"
            >
              GROUP
            </div>
            <div
              :style="{
                'font-family': 'kanit',
                width: '17%',
                'text-align': 'center',
              }"
            >
              SUB
            </div>
            <div
              :style="{
                'font-family': 'kanit',
                width: '17%',
                'text-align': 'center',
              }"
            >
              CG
            </div>
            <div
              :style="{
                'font-family': 'kanit',
                width: '17%',
                'text-align': 'center',
              }"
            >
              PRODUCT
            </div>
          </div>
          <div class="mds-card-gray-item">
            <div
              v-if="row.item_cg.length == 0 || row.conditions_select == '3'"
              style="
                color: rgba(0, 0, 0, 0.99);
                text-align: center;
                width: 100%;
                padding: 10% 0%;
                font-size: 15px;
              "
            >
              No data...
            </div>
            <div
              style="width: 100%; padding-top: 5px"
              v-for="(rightRow, rightIndex) in row.item_cg"
              :key="'rightRow' + rightRow + '-' + rightIndex"
            >
              <div style="display: flex" v-if="row.conditions_select == '5'">
                <div
                  style="width: 15%; text-align: right; display: flex"
                  class="under-line"
                >
                  <div
                    style="padding-top: 12px; font-size: 12px; color: #5a5a5a"
                  >
                    ฿
                  </div>
                  <template>
                    <mds-input
                      :data="rightRow"
                      v-model="rightRow.reward"
                      :id="
                        'conditions_select_2-' +
                        row.tactics_id +
                        '-incentive-' +
                        rightIndex
                      "
                      :table="'itemcg_step2_rewards'"
                      :index="index"
                      :indexDetail="rightIndex"
                      type="detail"
                      :readOnly="false"
                    ></mds-input>
                  </template>
                </div>

                <div
                  @click="nextToPopup(row, rightRow.reward)"
                  :style="{
                    cursor: rightRow.type != 0 ? 'pointer' : '',
                    width: '17%',
                    'text-underline-offset': '3px',
                    'font-family': 'kanit',
                    'text-align': 'center',
                    'padding-top': '10px',
                  }"
                >
                  <!-- {{'( '}}{{ fmNumberInt(rightRow.type) == 0 ? '' : fmNumberInt(rightRow.type) }}{{' )'}} -->
                  {{ "( " }}
                  <span style="text-decoration: underline">{{
                    rightRow.type == 0 ? "" : fmNumberInt(rightRow.type)
                  }}</span
                  >{{ " )" }}
                </div>

                <div
                  @click="nextToPopup(row, rightRow.reward)"
                  :style="{
                    width: '17%',
                    'text-underline-offset': '3px',
                    cursor: rightRow.group != 0 ? 'pointer' : '',
                    'font-family': 'kanit',
                    'text-align': 'center',
                    'padding-top': '10px',
                  }"
                >
                  {{ "( " }}
                  <span style="text-decoration: underline">{{
                    rightRow.group == 0 ? "" : fmNumberInt(rightRow.group)
                  }}</span
                  >{{ " )" }}
                </div>

                <div
                  @click="nextToPopup(row, rightRow.reward)"
                  :style="{
                    cursor: rightRow.sub != 0 ? 'pointer' : '',
                    width: '17%',
                    'padding-top': '10px',
                    'text-underline-offset': '3px',
                    'font-family': 'kanit',
                    'text-align': 'center',
                  }"
                >
                  {{ "( " }}
                  <span style="text-decoration: underline">{{
                    rightRow.sub == 0 ? "" : fmNumberInt(rightRow.sub)
                  }}</span
                  >{{ " )" }}
                  <!-- {{'( '}}{{ fmNumberInt(rightRow.sub) == 0 ? '' : fmNumberInt(rightRow.sub)}}{{' )'}} -->
                </div>

                <div
                  @click="nextToPopup(row, rightRow.reward)"
                  :style="{
                    cursor: rightRow.cg != 0 ? 'pointer' : '',
                    width: '17%',
                    'text-underline-offset': '3px',
                    'font-family': 'kanit',
                    'text-align': 'center',
                    'padding-top': '10px',
                  }"
                >
                  {{ "( " }}
                  <span style="text-decoration: underline">{{
                    rightRow.cg == 0 ? "" : fmNumberInt(rightRow.cg)
                  }}</span
                  >{{ " )" }}
                  <!-- {{'( '}}{{fmNumberInt( rightRow.cg )  == 0 ? '' : fmNumberInt(rightRow.cg )}}{{' )'}} -->
                </div>
                <div
                  @click="nextToPopup(row, rightRow.reward)"
                  :style="{
                    cursor: rightRow.product != 0 ? 'pointer' : '',
                    width: '17%',
                    'text-underline-offset': '3px',
                    'font-family': 'kanit',
                    'text-align': 'center',
                    'padding-top': '10px',
                  }"
                >
                  {{ "( " }}
                  <span style="text-decoration: underline">{{
                    rightRow.product == 0 ? "" : fmNumberInt(rightRow.product)
                  }}</span
                  >{{ " )" }}

                  <!-- {{'( '}}{{ fmNumberInt(rightRow.product) == 0 ? '' : fmNumberInt(rightRow.product)}}{{' )'}} -->
                </div>
              </div>
              <div
                style="width: 100%; display: flex; padding-right: 5%"
                v-if="row.conditions_select == '2'"
              >
                <div
                  :style="{
                    'font-family': 'kanit',
                    width: '85%',
                    'text-align': 'left',
                    'padding-top': '10px',
                    'padding-left': '3%',
                  }"
                >
                  {{ rightRow.code }}&nbsp; &nbsp; {{ rightRow.title }}
                </div>
                <div
                  style="width: 15%; text-align: left; display: flex"
                  class="under-line"
                >
                  <div
                    style="padding-top: 12px; font-size: 12px; color: #5a5a5a"
                  >
                    ฿
                  </div>
                  <template>
                    <mds-input
                      v-model="rightRow.reward"
                      :id="
                        'conditions_select_2-' +
                        row.tactics_id +
                        '-incentive-' +
                        rightIndex
                      "
                      :table="'itemcg_step2'"
                      :index="index"
                      :indexDetail="rightIndex"
                      type="detail"
                      :readOnly="false"
                    ></mds-input>
                  </template>
                </div>
              </div>
              <div
                style="width: 100%; display: flex; padding-right: 5%"
                v-if="row.conditions_select == '1'"
              >
                <div style="width: 5%">
                  <input
                    type="checkbox"
                    v-model="rightRow.checked"
                    style="height: 20px; width: 20px"
                    @change="setChkRightHead($event, index, rightIndex)"
                  />
                </div>
                <div
                  :style="{
                    'font-family': 'kanit',
                    width: '95%',
                    'text-align': 'left',
                    'padding-top': '5px',
                    'padding-left': '2%',
                    'font-weight': hilightRow(index, rightIndex, null)
                      ? 'bold'
                      : 'unset',
                  }"
                >
                  {{ rightRow.code }}&nbsp;&nbsp; {{ rightRow.title }}
                </div>
              </div>
              <div
                style="width: 100%; display: flex; padding-right: 5%"
                v-if="row.conditions_select == '4'"
              >
                <div
                  :style="{
                    'font-family': 'kanit',
                    width: '45%',
                    'text-align': 'left',
                    'padding-top': '10px',
                    'padding-left': '3%',
                    'font-weight': hilightRow(index, rightIndex, null)
                      ? 'bold'
                      : 'unset',
                  }"
                >
                  {{ rightRow.code }}&nbsp; &nbsp; {{ rightRow.title }}
                </div>
                <div
                  style="
                    width: 15%;
                    text-align: left;
                    display: flex;
                    padding-right: 3%;
                  "
                  class="under-line"
                >
                  <div
                    style="padding-top: 12px; font-size: 12px; color: #5a5a5a"
                  ></div>
                  <template>
                    <mds-input
                      v-model="rightRow.reward"
                      :id="
                        'conditions_select_2-' +
                        row.tactics_id +
                        '-incentive-' +
                        rightIndex
                      "
                      :table="'itemcg_step2'"
                      :index="index"
                      :indexDetail="rightIndex"
                      type="detail"
                      :readOnly="false"
                    ></mds-input>
                  </template>
                </div>
                <div
                  style="
                    padding-top: 12px;
                    text-align: left;
                    font-family: kanit;
                    font-size: 12px;
                    color: #5a5a5a;
                    display: flex;
                    padding-right: 3%;
                  "
                >
                  items
                </div>
                <div
                  style="
                    padding-top: 12px;
                    text-align: left;
                    font-family: kanit;
                    font-size: 10px;
                    color: #5a5a5a;
                    display: flex;
                  "
                >
                  {{ rightRow.detail }}
                </div>
              </div>
              <div
                style="width: 100%; padding-top: 5px; padding-left: 7%"
                v-for="(rightRows, rightIndexs) in rightRow.items"
                :key="'rightRow' + rightRows + '-' + rightIndexs"
              >
                <div style="width: 100%; display: flex; padding-right: 5%">
                  <div style="width: 5%">
                    <input
                      type="checkbox"
                      v-model="rightRows.checked"
                      style="height: 20px; width: 20px"
                      @change="
                        setChkRight($event, index, rightIndex, rightIndexs)
                      "
                    />
                  </div>
                  <div
                    :style="{
                      'font-family': 'kanit',
                      width: '95%',
                      'text-align': 'left',
                      'padding-top': '5px',
                      'padding-left': '2%',
                      'font-weight': hilightRow(index, rightIndex, rightIndexs)
                        ? 'bold'
                        : 'unset',
                    }"
                  >
                    {{ rightRows.code }}&nbsp; {{ rightRows.title }}
                  </div>
                </div>
              </div>
            </div>
            <!-- TOTAL -->
          </div>
          <div
            style="
              border-radius: 5px;
              background-color: rgb(168, 168, 168);
              color: #fff;
              width: 100%;
              display: flex;
              align-items: center;
              height: 35px;
            "
            v-if="row.conditions_select == '5'"
          >
            <div
              :style="{ width: rightIndex2 == 'reward' ? '15%' : '17%' }"
              v-for="(rightRow, rightIndex2) in total_reward"
              :key="'rightRow' + rightRow + '-' + rightIndex2"
            >
              <div
                :style="{
                  'text-underline-offset': '3px',
                  display: 'flex',
                  'font-family': 'kanit',
                  'justify-content':
                    rightIndex2 == 'reward' ? 'flex-end' : 'center',
                }"
              >
                {{ "( " }}
                <span style="text-decoration: underline">{{
                  rightRow.cg == 0 ? "" : fmNumberInt(rightRow)
                }}</span
                >{{ " )" }}
                <!-- {{'( '}}{{ fmNumberInt(rightRow) }}{{' )'}} -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <dialog-step-two
      :show="dialogStepTwo"
      :title="titleDialogStepTwo"
      @close="onCloseDialogStepTwo"
    ></dialog-step-two>

    <new-dialog-step-two
      :show="newDialogStepTwo"
      :title="newTitleDialogStepTwo"
      @close="newOnCloseDialogStepTwo"
    ></new-dialog-step-two>

    <md-dialog ref="md-confirm-dialog-condition">
      <md-dialog-title>{{ titleCF }}</md-dialog-title>
      <md-dialog-content>
        <div
          v-for="(row, index) in detailCF"
          :key="'dialog-content-' + index"
          style="display: flex"
        >
          <div style="font-family: kanit; font-size: 15px; margin-bottom: 10px">
            {{ row.title }}
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="cancelDG">CANCEL</md-button>
        <md-button
          class="md-primary"
          @click="submitDG"
          v-if="modeCF != 'nosave'"
          >{{ titleButton }}</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-dialog
      class="dialog-configuration"
      ref="md-confirm-dialog-configuration"
    >
      <md-dialog-content>
        <div style="padding-bottom: 10px">
          You should save your configuration.
        </div>
        <div>Do you want to save draft ?</div>
        <div
          v-for="(row, index) in detailCF"
          :key="'dialog-content-' + index"
          style="display: flex"
        >
          <div style="font-family: kanit; font-size: 15px; margin-bottom: 10px">
            {{ row.title }}
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <div style="width: 70%">
          <md-button style="color: #a8a8a8" @click="reloadDG">
            <div style="height: 18px; text-align: left">RELOAD</div>
            <div
              style="
                color: #a8a8a8;
                height: 30px;
                font-size: 10px;
                font-weight: 200;
              "
            >
              Then the previous configuration will be applied.
            </div>
          </md-button>
        </div>
        <div style="width: 30%; text-align: end">
          <!-- <md-button style="color: #a8a8a8; height: 48px" @click="cancelDG"
            >CANCEL</md-button
          > -->
          <md-button class="md-primary" style="height: 48px" @click="submitDG"
            >DONE</md-button
          >
          <!-- <md-button class="md-primary" style="height: 48px" @click="cancelDG"
            >DONE</md-button
          > -->
        </div>
      </md-dialog-actions>
    </md-dialog>

    <md-snackbar
      :md-position="vertical + ' ' + horizontal"
      ref="snackbar"
      :md-duration="duration"
    >
      <span>{{ snkTitle }}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">
        <span style="color: #fd7f00">OK</span>
      </md-button>
    </md-snackbar>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import service from "@/services/planning/incentive";
import VueSticky from "vue-sticky";

export default {
  name: "step-two",
  components: {
    "mds-input": require("./step1-input"),
    "md-search-box": require("./md-search-box"),
    "dialog-step-two": require("./dialog-step-two"),
    "new-dialog-step-two": require("./new-dialog-step-two"),
  },
  data() {
    return {
      step2searh: "",
      masterCg: [],
      keepSearch: "",
      dialogStepTwo: false,
      newDialogStepTwo: false,
      titleDialogStepTwo: {
        head_table: "",
        tactics_index: "",
        year: "",
        cycle: "",
        tactics_id: "",
        tactics_title: "",
        condition_code: "",
        condition_title: "",
        record: "",
      },
      newTitleDialogStepTwo: {
        head_table: "",
        tactics_index: "",
        year: "",
        cycle: "",
        tactics_id: "",
        tactics_title: "",
        condition_code: "",
        condition_title: "",
        record: "",
        toReward: "all",
      },
      titleCF: "",
      modeCF: "",
      detailCF: [],
      editRe: {
        mom: "",
        child: "",
      },
      titleButton: "SAVE",
      vertical: "bottom",
      horizontal: "center",
      duration: 4000,
      snkTitle: "",
      tactics_use_id: "",

      total: {
        reward: 0,
        type: 0,
        group: 0,
        sub: 0,
        cg: 0,
        product: 0,
      },
    };
  },
  methods: {
    nextToPopup(param1, param2) {
      console.log(param1);
      if (param1 != "" || param1 != 0) {
        this.showDialogStepTwo(param1, 1);
        this.newTitleDialogStepTwo.toReward = param2;
        console.log("Next Reward => ", param2);
      } else {
        console.log(param1);
      }
    },
    calculateOtherIn() {},
    chooseSymbol(index) {
      if (!_.isUndefined(this.step2.detail[index])) {
        if (this.step2.detail[index].tac_use.length > 0) {
          let tac_use = this.step2.detail[index].tac_use[0];
          if (tac_use.tactics_use == "") {
            this.tactics_use_id = tac_use.id;
          }
          if (tac_use.unit_code.toString() == "1" && tac_use.math_value > 150) {
            this.snkTitle =
              "Review %" +
              this.fmNumberInt(tac_use.math_value) +
              " pass the total Sales Target, Please.";
            this.$refs.snackbar.open();
          }
        }
      }
      if (!_.isUndefined(this.step2.detail)) {
        for (var i = 0; i < this.step2.detail.length; i++) {
          if (!_.isUndefined(this.step2.detail[i + 1])) {
            if (this.step2.detail[i + 1].tac_use.length > 0) {
              if (
                this.step2.detail[i + 1].tac_use[0].tactics_use ==
                this.tactics_use_id.toString()
              ) {
                let obj = this.step2.detail[index].tac_use[0];
                this.step2.detail[i + 1].tac_use[0].math_value = obj.math_value;
                this.step2.detail[i + 1].tac_use[0].symbols_code =
                  obj.symbols_code;
                this.step2.detail[i + 1].tac_use[0].unit_code = obj.unit_code;
              }
            }
          }
        }
      }
      // if (!_.isUndefined(this.step2.detail[index + 1])) {
      //   if (this.step2.detail[index + 1].tac_use.length > 0) {
      //     let obj = this.step2.detail[index].tac_use[0]
      //     this.step2.detail[index + 1].tac_use[0].math_value = obj.math_value
      //     this.step2.detail[index + 1].tac_use[0].symbols_code =
      //       obj.symbols_code
      //     this.step2.detail[index + 1].tac_use[0].unit_code = obj.unit_code
      //   }
      // }
    },
    chooseUnitCode(index) {
      this.chooseSymbol(index);
    },
    changeMathVal(index) {
      this.chooseSymbol(index);
    },
    setIncentive(val) {
      /*
      this.editRe = val;
      this.openDG("setincentive");
      */
    },
    showIcon(row, index) {
      // if (row.rewards[0].incentive == 0 && index > 0) {
      //   return false;
      // } else {
      return true;
      // }
    },
    renderUnit(value) {
      if (value == 1) {
        return "%";
      } else {
        return "฿";
      }
    },
    setChkRightHead(e, index, rightIndex) {
      let master = _.cloneDeep(this.step2);
      let tempKeyHead = master.detail[index].item_cg[rightIndex];
      _.forEach(tempKeyHead.items, function (value) {
        value.checked = tempKeyHead.checked;
      });
      this.$store.commit("incentive/setDataStep2", master);
    },
    setChkRight(e, index, rightIndex, rightIndexs) {
      let master = _.cloneDeep(this.step2);
      let tempKeyHead = master.detail[index].item_cg[rightIndex];
      let tempKey = master.detail[index].item_cg[rightIndex].items;
      let check = _.filter(tempKey, function (o) {
        return o.checked;
      });
      if (check.length == tempKey.length && tempKey.length > 0) {
        tempKeyHead.checked = true;
      } else {
        tempKeyHead.checked = false;
      }
      this.$store.commit("incentive/setDataStep2", master);
    },
    selectSalesCycle() {
      let head = this.step2.head;
      var rs = _.find(head.salesCycleList, function (o) {
        return o.code == head.sales_cycle;
      });
      let obj = {
        start_date: rs.start_date,
        end_date: rs.end_date,
      };
      service
        .step1tab2dp(obj)
        .then((response) => {
          this.step2.head.teamsList = response;
          this.step2.head.teams = response.length > 0 ? response[0].code : null;
          this.$store.commit("incentive/setDataStep2", this.step2);
        })
        .catch();
    },
    sum_total(param) {
      const sum_reward = param.reduce((accumulator, object) => {
        return accumulator + object.reward;
      }, 0);
      const sum_type = param.reduce((accumulator, object) => {
        return accumulator + object.type;
      }, 0);
      const sum_group = param.reduce((accumulator, object) => {
        return accumulator + object.group;
      }, 0);
      const sum_sub = param.reduce((accumulator, object) => {
        return accumulator + object.sub;
      }, 0);
      const sum_cg = param.reduce((accumulator, object) => {
        return accumulator + object.cg;
      }, 0);
      const sum_product = param.reduce((accumulator, object) => {
        return accumulator + object.product;
      }, 0);

      this.total = {
        reward: sum_reward,
        type: sum_type,
        group: sum_group,
        sub: sum_sub,
        cg: sum_cg,
        product: sum_product,
      };
      // console.log('total -=>', this.total)
    },
    selecedTeam() {
      // console.log("-selecedTeam-");
      this.$store.commit("incentive/setLoadingMain", true);
      let head = this.step2.head;
      var rs = _.find(head.salesCycleList, function (o) {
        return o.code == head.sales_cycle;
      });
      let master = _.cloneDeep(this.step2);
      if (!_.isUndefined(rs)) {
        let obj = {
          year: rs.fiscal_year,
          cycle: rs.fiscal_cycle,
          group_code: head.teams,
          start_date: rs.start_date,
          end_date: rs.end_date,
        };
        service
          .getDetail(obj)
          .then((response) => {
            master.detail = response;
            _.forEach(master.detail, function (values) {
              values.tempCg = [];
              values.tempCg.push({
                key: values.conditions_select,
                datas: values.item_cg,
              });
            });
            // console.log(response);

            localStorage.setItem(
              "tmpDataStep2_detail",
              JSON.stringify(response)
            );
            // let tmpDataStep2 = this.$store.getters["incentive/tmpDataStep2"];
            // let tmpDataStep2 = [];
            // tmpDataStep2['head'] = this.step2.head;
            // tmpDataStep2['detail'] = response;
            // console.log("tmpDataStep2 ==>", tmpDataStep2);
            // this.$store.commit("incentive/setTmpDataStep2", tmpDataStep2);
            // let arrDataStep2 = JSON.parse(JSON.stringify(tmpDataStep2));
            // let arrDataStep2 = _.cloneDeep(tmpDataStep2);
            // console.log("arrDataStep2 ==>", arrDataStep2);
            // this.$store.commit("incentive/setTmpDataStep2", arrDataStep2);

            var item_CG = _.find(master.detail, function (o) {
              return o.conditions_select == "5";
            });
            if (item_CG) {
              this.$store.commit("incentive/cal_reward", item_CG.item_cg);
            }
            this.step2.detail = master.detail;
            this.$store.commit("incentive/setLoadingMain", false);
          })
          .catch();
      } else {
        this.$store.commit("incentive/setLoadingMain", false);
      }
    },
    addReward(mom) {
      let master = _.cloneDeep(this.step2);
      let masterOld = _.cloneDeep(this.step2);
      let last =
        master.detail[mom].rewards[masterOld.detail[mom].rewards.length - 1];
      if (_.isUndefined(last)) {
        master.detail[mom].rewards.push({
          id: master.detail[mom].rewards.length,
          target: 0,
          incentive: 0,
        });
      } else {
        let target = 0;
        let incentive = 0;
        if (_.isNaN(parseFloat(last.target) + 1)) {
          master.detail[mom].rewards[0].target = 0;
          master.detail[mom].rewards[0].incentive = 0;
          target = 1;
          if (master.detail[mom].tac_type == 1) {
            incentive = 1;
          } else {
            incentive = 0;
          }
        } else {
          target = parseFloat(last.target) + 1;
          if (master.detail[mom].tac_type == 1) {
            incentive = parseFloat(last.incentive) + 1;
          } else {
            let key = master.detail[mom].rewards.length;
            if (master.detail[mom].rewards[key - 1].incentive > 0) {
              incentive = parseFloat(last.incentive) + 1;
            } else {
              incentive = 0;
            }
          }
        }
        master.detail[mom].rewards.push({
          id: master.detail[mom].rewards.length,
          target: target,
          incentive: incentive,
        });
      }
      this.$store.commit("incentive/setDataStep2", master);
    },
    editReward(mom, child) {
      this.step2.detail[mom].rewards[child].incentive = 1;
      /*
      this.editRe = {
        mom: mom,
        child: child
      };
      this.openDG("editreward");
      */
    },
    delReward(mom, child) {
      let master = _.cloneDeep(this.step2);
      let data = master.detail[mom].rewards;
      let detail = data[child];
      master.detail[mom].rewards = _.filter(data, (item) => {
        if (item.id != detail.id) {
          return true;
        }
      });
      if (master.detail[mom].rewards.length == 0) {
        master.detail[mom].rewards.push({
          id: master.detail[mom].rewards.length,
          target: 0,
          incentive: 0,
        });
      }
      this.$store.commit("incentive/setDataStep2", master);
    },
    saveAndNext() {
      this.$store.commit("incentive/setLoadingMain", true);
      let data = _.cloneDeep(this.step2.head);
      var rs = _.find(data.salesCycleList, function (o) {
        return o.code == data.sales_cycle;
      });
      if (_.isUndefined(this.defaultStep.ms_tactics_code)) {
        service
          .getDefaultStep()
          .then((response) => {
            if (response.data.length > 0) {
              this.$store.commit("incentive/setDefaultStep", response.data[0]);
              let data = response.data[0];
              let obj = {
                step: 3,
                permission: "creator",
                year: data.year,
                cycle: data.cycle,
                group_code: data.group_code,
                condition_detail: data.data_condition,
                start_date: data.start_date,
                end_date: data.end_date,
                data_recipient: data.data_recipient,
                ms_tactics_code: data.ms_tactics_code,
                emp_id: Vue.localStorage.get("emp_id"),
                sales_cycle: [
                  {
                    code: data.group_code,
                    end_date: data.end_date,
                    fiscal_cycle: data.cycle,
                    fiscal_year: data.year,
                    start_date: data.start_date,
                  },
                ],
              };

              service
                .nextToStep3(obj)
                .then((response) => {
                  var clsStep =
                    document.getElementsByClassName("md-step-header");
                  clsStep[2].click();
                  document.getElementsByTagName("html")[0].style =
                    "overflow-y:scroll";
                  var html = document.documentElement;
                  html.scrollTop = 0;
                  response.events = "next";
                  this.$store.dispatch("incentive/getStep3Master", response);
                })
                .catch();
            }
          })
          .catch();
      } else {
        let obj = {
          step: 3,
          permission: "creator",
          year: this.defaultStep.year,
          cycle: this.defaultStep.cycle,
          group_code: this.defaultStep.group_code,
          condition_detail: this.defaultStep.data_condition,
          start_date: this.defaultStep.start_date,
          end_date: this.defaultStep.end_date,
          data_recipient: this.defaultStep.data_recipient,
          ms_tactics_code: this.defaultStep.ms_tactics_code,
          emp_id: Vue.localStorage.get("emp_id"),
        };

        service
          .nextToStep3(obj)
          .then((response) => {
            var clsStep = document.getElementsByClassName("md-step-header");
            clsStep[2].click();
            document.getElementsByTagName("html")[0].style =
              "overflow-y:scroll";
            var html = document.documentElement;
            html.scrollTop = 0;
            response.events = "next";
            this.$store.dispatch("incentive/getStep3Master", response);
          })
          .catch();
      }
    },
    saveDraft() {
      this.$store.commit("incentive/setLoadingMain", true);
      this.$refs["md-confirm-dialog-condition"].close();
      let head = this.step2.head;
      var rs = _.find(head.salesCycleList, function (o) {
        return o.code == head.sales_cycle;
      });
      if (!_.isUndefined(rs)) {
        let obj = {
          step: 2,
          year: rs.fiscal_year,
          cycle: rs.fiscal_cycle,
          group_code: head.teams,
          start_date: rs.start_date,
          end_date: rs.end_date,
          data_head: head,
          data_detail: this.step2.detail,
          button: this.modeCF,
          ms_tactics_code: _.isUndefined(this.defaultStep.ms_tactics_code)
            ? 0
            : this.defaultStep.ms_tactics_code,
        };
        service
          .saveDraftByStep(obj)
          .then((response) => {
            this.$store.commit("incentive/setLoadingMain", false);
          })
          .catch();
      }
    },
    openDG(mode) {
      console.log("-openDG-", mode);
      // let master = _.cloneDeep(this.step2)
      let tmpDataCalStep2 = this.$store.getters["incentive/tmpDataCalStep2"];
      // console.log("tmpDataCalStep2 ==>", tmpDataCalStep2);
      let master =
        tmpDataCalStep2.length == 0 ? _.cloneDeep(this.step2) : tmpDataCalStep2;

      if (mode == "savedraft" || mode == "saveAndnext") {
        console.log("master ===>", master);
        let temp = [];
        let checkType = _.filter(master.detail, (o) => {
          if (o.conditions_select != "3" && o.item_cg.length == 0) {
            return true;
          }
        });

        // console.log("checkType ==>", checkType);
        if (checkType.length == 0) {
          _.forEach(master.detail, function (o) {
            if (o.conditions_select == "1" && o.item_cg.length > 0) {
              let dup = [];
              _.forEach(o.item_cg, function (i) {
                let checkTrue = _.filter(i.items, (k) => {
                  if (k.checked) {
                    return true;
                  }
                });
                if (checkTrue.length == 0) {
                  dup.push(o);
                }
              });
              if (dup.length == o.item_cg.length) {
                temp = [dup[0]];
              }
            }
          });
        } else {
          temp = checkType;
        }

        // console.log("temp ==>", temp);
        if (temp.length > 0) {
          this.modeCF = "nosave";
          this.titleCF = "Please checked at lease 1 item";
          this.detailCF = temp;
          this.titleButton = "SAVE";
          this.$refs["md-confirm-dialog-condition"].open();
        } else {
          this.detailCF = [];
          this.modeCF = mode;
          if (mode == "savedraft") {
            let tac1 = _.filter(master.detail, (o) => {
              if (o.tac_type == 1) {
                return true;
              }
            });
            if (tac1.length > 0) {
              let count = tac1[0].rewards.length;
              let math_value = 0;
              let symbols_code = 1; // 1 : >= , 2 : >
              let tac_use = false;
              if (!_.isUndefined(tac1[0].tac_use[0])) {
                math_value = tac1[0].tac_use[0].math_value;
                symbols_code = tac1[0].tac_use[0].symbols_code;
                tac_use = tac1[0].tac_use[0].tactics_use != "" ? true : false;
              }
              let data = tac1[0].rewards[0];
              let start_re = data.target;
              if (
                tac1[0].tac_use[0].unit_code == "1" &&
                tac1[0].tac_use[0].math_value > 150
              ) {
                this.detailCF.push({
                  title:
                    "Review %" +
                    this.fmNumberInt(tac1[0].tac_use[0].math_value) +
                    " pass the total Sales Target, Please.",
                });
              } else if (
                tac1[0].range_code == "1" &&
                tac1[0].rewards[count - 1].incentive > tac1[0].max_reward
              ) {
                this.detailCF.push({
                  title: "เงินรางวัลยอดขายรวม เกินกว่า เพดานเงินรางวัล",
                });
              } else if (
                tac1[0].range_code == "2" &&
                tac1[0].rewards[count - 1].incentive >= tac1[0].max_reward
              ) {
                this.detailCF.push({
                  title: "เงินรางวัลยอดขายรวม เกินกว่า เพดานเงินรางวัล",
                });
              } else if (
                symbols_code == "1" &&
                start_re < math_value &&
                tac_use == false
              ) {
                this.detailCF.push({
                  title: "ขั้นเงินรางวัล ต้องตามเกณฑ์ เงินรางวัลยอดขายรวม",
                });
              } else if (
                symbols_code == "2" &&
                start_re <= math_value &&
                tac_use == false
              ) {
                this.detailCF.push({
                  title: "ขั้นเงินรางวัล ต้องตามเกณฑ์ เงินรางวัลยอดขายรวม",
                });
              }
            }
            let tac3 = _.filter(master.detail, (o) => {
              if (o.tac_type == 3) {
                return true;
              }
            });
            if (tac3.length > 0) {
              let count = tac3[0].rewards.length;
              let math_value = 0;
              let symbols_code = 1; // 1 : >= , 2 : >
              let tac_use = false;
              if (!_.isUndefined(tac3[0].tac_use[0])) {
                math_value = tac3[0].tac_use[0].math_value;
                symbols_code = tac3[0].tac_use[0].symbols_code;
                tac_use = tac3[0].tac_use[0].tactics_use != "" ? true : false;
              }
              let data = tac3[0].rewards[0];
              let start_re = data.target;
              if (
                tac3[0].tac_use[0].unit_code == "1" &&
                tac3[0].tac_use[0].math_value > 150
              ) {
                this.detailCF.push({
                  title:
                    "Review %" +
                    this.fmNumberInt(tac1[0].tac_use[0].math_value) +
                    " pass the total Sales Target, Please.",
                });
              } else if (
                tac3[0].range_code == "1" &&
                tac3[0].rewards[count - 1].incentive > tac3[0].max_reward
              ) {
                this.detailCF.push({
                  title: "Count items เกินกว่า เพดานเงินรางวัล",
                });
              } else if (
                tac3[0].range_code == "2" &&
                tac3[0].rewards[count - 1].incentive >= tac3[0].max_reward
              ) {
                this.detailCF.push({
                  title: "Count items เกินกว่า เพดานเงินรางวัล",
                });
              } else if (
                symbols_code == "1" &&
                start_re < math_value &&
                tac_use == false
              ) {
                this.detailCF.push({
                  title: "ขั้นเงินรางวัล ต้องตามเกณฑ์ Count items",
                });
              } else if (
                symbols_code == "2" &&
                start_re <= math_value &&
                tac_use == false
              ) {
                this.detailCF.push({
                  title: "ขั้นเงินรางวัล ต้องตามเกณฑ์ Count items",
                });
              }
            }
            let tac2 = _.filter(master.detail, (o) => {
              if (o.tac_type == 2) {
                return true;
              }
            });
            if (tac2.length > 0) {
              if (tac2[0].tempCg.length > 0) {
                let sum2 = tac2[0].tempCg[0].datas.reduce(
                  (acc, row) => acc + parseFloat(row.reward),
                  0
                );
                if (tac2[0].range_code == "1" && sum2 > tac2[0].max_reward) {
                  this.detailCF.push({
                    title: "เงินรางวัลรายหมวดสินค้า เกินกว่า เพดานเงินรางวัล",
                  });
                } else if (
                  tac2[0].range_code == "2" &&
                  sum2 >= tac2[0].max_reward
                ) {
                  this.detailCF.push({
                    title: "เงินรางวัลรายหมวดสินค้า เกินกว่า เพดานเงินรางวัล",
                  });
                }
              }
            }
            if (this.detailCF.length == 0) {
              this.titleCF = "Do you want to save this draft?";
              this.titleButton = "SAVE";
            } else {
              this.modeCF = "nosave";
              this.titleCF = "Please checked!";
              this.titleButton = "SAVE";
            }
          } else if (mode == "saveAndnext") {
            this.detailCF = [];
            let tac3 = _.filter(master.detail, (o) => {
              if (o.tac_type == 3) {
                return true;
              }
            });
            if (tac3.length > 0) {
              let count = tac3[0].rewards.length;
              let math_value = 0;
              let symbols_code = 1; // 1 : >= , 2 : >
              let tac_use = false;
              if (!_.isUndefined(tac3[0].tac_use[0])) {
                math_value = tac3[0].tac_use[0].math_value;
                symbols_code = tac3[0].tac_use[0].symbols_code;
                tac_use = tac3[0].tac_use[0].tactics_use != "" ? true : false;
              }
              let data = tac3[0].rewards[0];
              let start_re = data.target;
              if (
                tac3[0].tac_use[0].unit_code == "1" &&
                tac3[0].tac_use[0].math_value > 150
              ) {
                this.detailCF.push({
                  title:
                    "Review %" +
                    this.fmNumberInt(tac1[0].tac_use[0].math_value) +
                    " pass the total Sales Target, Please.",
                });
              } else if (
                tac3[0].range_code == "1" &&
                tac3[0].rewards[count - 1].incentive > tac3[0].max_reward
              ) {
                this.detailCF.push({
                  title: "Count items เกินกว่า เพดานเงินรางวัล",
                });
              } else if (
                tac3[0].range_code == "2" &&
                tac3[0].rewards[count - 1].incentive >= tac3[0].max_reward
              ) {
                this.detailCF.push({
                  title: "Count items เกินกว่า เพดานเงินรางวัล",
                });
              } else if (
                symbols_code == "1" &&
                start_re < math_value &&
                tac_use == false
              ) {
                this.detailCF.push({
                  title: "ขั้นเงินรางวัล ต้องตามเกณฑ์ Count items",
                });
              } else if (
                symbols_code == "2" &&
                start_re <= math_value &&
                tac_use == false
              ) {
                this.detailCF.push({
                  title: "ขั้นเงินรางวัล ต้องตามเกณฑ์ Count items",
                });
              }
            }

            let tac1 = _.filter(master.detail, (o) => {
              if (o.tac_type == 1) {
                return true;
              }
            });
            if (tac1.length > 0) {
              let count = tac1[0].rewards.length;
              let math_value = 0;
              let symbols_code = 1; // 1 : >= , 2 : >
              let tac_use = false;
              if (!_.isUndefined(tac1[0].tac_use[0])) {
                math_value = tac1[0].tac_use[0].math_value;
                symbols_code = tac1[0].tac_use[0].symbols_code;
                tac_use = tac1[0].tac_use[0].tactics_use != "" ? true : false;
              }
              let data = tac1[0].rewards[0];
              let start_re = data.target;
              if (
                tac1[0].tac_use[0].unit_code == "1" &&
                tac1[0].tac_use[0].math_value > 150
              ) {
                this.detailCF.push({
                  title:
                    "Review %" +
                    this.fmNumberInt(tac1[0].tac_use[0].math_value) +
                    " pass the total Sales Target, Please.",
                });
              } else if (
                tac1[0].range_code == "1" &&
                tac1[0].rewards[count - 1].incentive > tac1[0].max_reward
              ) {
                this.detailCF.push({
                  title: "เงินรางวัลยอดขายรวม เกินกว่า เพดานเงินรางวัล",
                });
              } else if (
                tac1[0].range_code == "2" &&
                tac1[0].rewards[count - 1].incentive >= tac1[0].max_reward
              ) {
                this.detailCF.push({
                  title: "เงินรางวัลยอดขายรวม เกินกว่า เพดานเงินรางวัล",
                });
              } else if (
                symbols_code == "1" &&
                start_re < math_value &&
                tac_use == false
              ) {
                this.detailCF.push({
                  title: "ขั้นเงินรางวัล ต้องตามเกณฑ์ เงินรางวัลยอดขายรวม",
                });
              } else if (
                symbols_code == "2" &&
                start_re <= math_value &&
                tac_use == false
              ) {
                this.detailCF.push({
                  title: "ขั้นเงินรางวัล ต้องตามเกณฑ์ เงินรางวัลยอดขายรวม",
                });
              }
            }
            let tac2 = _.filter(master.detail, (o) => {
              if (o.tac_type == 2) {
                return true;
              }
            });
            if (tac2.length > 0) {
              if (tac2[0].tempCg.length > 0) {
                let sum2 = tac2[0].tempCg[0].datas.reduce(
                  (acc, row) => acc + parseFloat(row.reward),
                  0
                );
                if (tac2[0].range_code == "1" && sum2 > tac2[0].max_reward) {
                  this.detailCF.push({
                    title: "เงินรางวัลรายหมวดสินค้า เกินกว่า เพดานเงินรางวัล",
                  });
                } else if (
                  tac2[0].range_code == "2" &&
                  sum2 >= tac2[0].max_reward
                ) {
                  this.detailCF.push({
                    title: "เงินรางวัลรายหมวดสินค้า เกินกว่า เพดานเงินรางวัล",
                  });
                }
              }
            }
            if (this.detailCF.length > 0) {
              this.modeCF = "nosave";
              this.titleCF = "Please checked!";
              this.titleButton = "SAVE";
            } else {
              let pay_date = new Date(master.head.pay_date);
              let now = new Date();
              let date_now = new Date(
                now.getFullYear() +
                  "-" +
                  (now.getMonth() + 1) +
                  "-" +
                  now.getDate()
              );
              // pay_date = new Date("2023-07-01");
              if (pay_date.valueOf() < date_now.valueOf()) {
                this.modeCF = "nosave";
                this.titleButton = "OK";
                this.titleCF = "Cannot calculate due date to overdue";
              } else {
                this.titleButton = "OK";
                // this.titleCF = 'Do you want to step 3 ?'
                this.titleCF =
                  "Do you want to next step, ( 3 ) Review Incentive ?";
              }
            }
          }

          if(this.modeCF == 'saveAndnext') {
            this.$refs["md-confirm-dialog-configuration"].open();
          } else {
            this.$refs["md-confirm-dialog-condition"].open();
          }
        }
      } else if (mode == "editreward") {
        this.titleCF = "คุณต้องการ reset ขั้นเงินรางวัลแปรผันตามค่า Default?";
        this.titleButton = "RESET";
        this.modeCF = mode;
        this.$refs["md-confirm-dialog-condition"].open();
      } else if (mode == "setincentive") {
        this.titleButton = "OK";
        this.modeCF = mode;
        this.titleCF = "เปลี่ยนทั้ง คอลัมน์ให้เป็น default?";
        this.titleButton = "OK";
        this.$refs["md-confirm-dialog-condition"].open();
      }
    },
    submitDG() {
      console.log("this.modeCF ==>", this.modeCF);
      // if(this.modeCF == "nosave") {
      //   this.snkTitle = "Please select condition.";
      //   this.$refs.snackbar.open();
      // }

      if (this.modeCF == "savedraft") {
        this.saveDraft();
      } else if (this.modeCF == "saveAndnext") {
        this.saveDraft();
        this.saveAndNext();
      } else if (this.modeCF == "editreward") {
        let mom = this.editRe.mom;
        let child = this.editRe.child;
        let master = _.cloneDeep(this.step2);
        let master2 = _.cloneDeep(this.step2);
        let data = master.detail[mom].rewards;
        for (let i = 0; i < data.length; i++) {
          if (master2.detail[mom].rewards[0].incentive == 0) {
            let val = i == 0 ? 1 : data[i - 1].incentive + 1;
            data[i].incentive = val;
          } else {
            data[i].incentive = 0;
          }
        }
        this.$store.commit("incentive/setDataStep2", master);
        this.$refs["md-confirm-dialog-condition"].close();
        this.editRe = {
          mom: "",
          child: "",
        };
      } else if (this.modeCF == "setincentive") {
        let master = _.cloneDeep(this.step2);
        let mom = this.editRe.mom;
        let child = this.editRe.child;
        let data = master.detail[mom].rewards;
        let old = this.dataBeforeChange.detail[mom].rewards[child];
        for (let i = 0; i < data.length; i++) {
          if (i != child) {
            data[i].incentive = data[child].incentive;
          }
        }
        this.$store.commit("incentive/setDataStep2", master);
        this.$refs["md-confirm-dialog-condition"].close();
        this.editRe = {
          mom: "",
          child: "",
        };
      }
    },
    cancelDG() {
      if (
        this.modeCF == "savedraft" ||
        this.modeCF == "saveAndnext" ||
        this.modeCF == "nosave" ||
        this.modeCF == "editreward"
      ) {
        this.$refs["md-confirm-dialog-condition"].close();
      } else if (this.modeCF == "setincentive") {
        let mom = this.editRe.mom;
        let child = this.editRe.child;
        let old = this.dataBeforeChange.detail[mom].rewards[child];
        let master = _.cloneDeep(this.step2);
        let data = master.detail[mom].rewards[child];
        if (data.incentive == 0) {
          master.detail[mom].rewards[child].incentive = old.incentive;
        }
        this.$store.commit("incentive/setDataStep2", master);
        this.$refs["md-confirm-dialog-condition"].close();
      }
      this.$refs["md-confirm-dialog-configuration"].close();
    },
    reloadDG() {
      // console.log("-reloadDG-");
      // let tmpDataStep2 = this.$store.getters["incentive/tmpDataStep2"];
      // let tmpDataStep2 = this.$store.getters["incentive/tmpDataCalStep2"];
      let tmpDataStep2_head = JSON.parse(
        localStorage.getItem("tmpDataStep2_head")
      );
      let tmpDataStep2_detail = JSON.parse(
        localStorage.getItem("tmpDataStep2_detail")
      );
      // console.log("tmpDataStep2_head ==>", tmpDataStep2_head);
      // console.log("tmpDataStep2_detail ==>", tmpDataStep2_detail);

      // let index = tmpDataStep2["detail"].findIndex((item) => {
      //   return item.conditions_select === "5";
      // });

      // this.step2["detail"][index]["conditions_select"] = tmpDataStep2["detail"][index]['conditions_select'];
      // let copyDataStep2 = tmpDataStep2["detail"][index]["item_cg"];
      // this.step2["detail"][index]["item_cg"] = copyDataStep2;

      // copyDataStep2.forEach((item, key) => {
      //   this.step2["detail"][index]["item_cg"][key]['reward'] = item['reward_old'];
      // });

      // console.log("this.step2 ==>", this.step2);

      let tmpDataStep2 = {
        detail: tmpDataStep2_detail,
        head: tmpDataStep2_head,
      };
      // console.log("tmpDataStep2 ==>", tmpDataStep2);
      this.$store.commit("incentive/setDataStep2", tmpDataStep2);
      this.$refs["md-confirm-dialog-configuration"].close();
    },
    slectedRange(key) {
      // console.log("slectedRange =>");
    },
    showDialogStepTwo(row, index) {
      console.log("row => ".row);
      console.log("index =>", index);
      var rs = _.find(row.ms_conditions, function (o) {
        return o.code == row.conditions_select;
      });
      if (!_.isUndefined(rs)) {
        if (rs.code == "5") {
          let mster = this.step2.head;
          var rs2 = _.find(mster.salesCycleList, function (o) {
            return o.code == mster.sales_cycle;
          });

          let head = [];
          let this_year = moment(rs2.payDate).format("YYYY");
          head.push(moment(rs2.payDate).subtract(1, "year").format("YYYY"));
          head.push(moment(rs2.payDate).subtract(2, "year").format("YYYY"));
          head.push(moment(rs2.payDate).subtract(3, "year").format("YYYY"));
          head.push(this_year);
          head.push(moment(rs2.payDate).subtract(1, "year").format("YYYY"));
          head.push(moment(rs2.payDate).subtract(2, "year").format("YYYY"));
          head.push(moment(rs2.payDate).subtract(3, "year").format("YYYY"));

          this.newTitleDialogStepTwo = {
            head_table: head,
            tactics_index: index,
            year: rs2.fiscal_year,
            cycle: rs2.fiscal_cycle,
            tactics_id: row.tactics_id,
            tactics_title: row.title,
            condition_code: row.conditions_select,
            condition_title: rs.title,
            record: row,
            max_reward: row.max_reward,
            toReward: "all",
            condition_code: 5,
            group_code: this.step2.head.teams,
          };
          // console.log(this.newTitleDialogStepTwo);

          this.newDialogStepTwo = true;
        } else {
          let mster = this.step2.head;
          var rs2 = _.find(mster.salesCycleList, function (o) {
            return o.code == mster.sales_cycle;
          });

          // console.log(rs2)
          this.titleDialogStepTwo = {
            tactics_index: index,
            year: rs2.fiscal_year,
            cycle: rs2.fiscal_cycle,
            tactics_id: row.tactics_id,
            tactics_title: row.title,
            condition_code: row.conditions_select,
            condition_title: rs.title,
            record: row,
            max_reward: row.max_reward,
          };
          this.dialogStepTwo = true;
        }
      } else {
        this.snkTitle = "Please select condition.";
        this.$refs.snackbar.open();
      }
    },
    onCloseDialogStepTwo() {
      this.dialogStepTwo = false;
    },
    newOnCloseDialogStepTwo() {
      this.newDialogStepTwo = false;
    },
    slectedRightCondition(key, row) {
      this.$refs["md-confirm-dialog-configuration"].open();
      // console.log("key ==>", key);
      let master = _.cloneDeep(this.step2);
      // let master2 = _.cloneDeep(this.step2);
      let tempKey = master.detail[key].conditions_select;
      // console.log("tempKey ==>", tempKey);

      var keyIndex = _.findIndex(master.detail[key].tempCg, function (o) {
        return o.key == tempKey;
      });
      if (keyIndex >= 0) {
        master.detail[key].item_cg = master.detail[key].tempCg[keyIndex].datas;
      } else {
        master.detail[key].item_cg = [];
      }
      // console.log(master);
      this.$store.commit("incentive/setDataStep2", master);
    },
    filterItems(val) {
      let param = val.param;
      let master = _.cloneDeep(this.step2);
      let tempKey = master.detail[val.index];
      if (!_.isUndefined(tempKey) && _.trim(param).length > 2) {
        master.detail[val.index].search_cg = _.trim(param);
      } else if (!_.isUndefined(tempKey) && _.trim(param).length == 0) {
        master.detail[val.index].search_cg = "";
      } else {
        master.detail[val.index].search_cg = "";
      }
      this.$store.commit("incentive/setDataStep2", master);
    },
    hilightRow(index, idx, rightIndexs) {
      let master = _.cloneDeep(this.step2);
      let tempKey = master.detail[index];
      if (
        !_.isUndefined(tempKey.search_cg) &&
        _.trim(tempKey.search_cg).length > 1
      ) {
        let str = "";
        if (rightIndexs != null) {
          str =
            _.trim(tempKey.item_cg[idx].items[rightIndexs].code) +
            _.trim(tempKey.item_cg[idx].items[rightIndexs].title);
        } else {
          str =
            _.trim(tempKey.item_cg[idx].code) +
            _.trim(tempKey.item_cg[idx].title);
        }
        return (
          str.toUpperCase().indexOf(tempKey.search_cg.toUpperCase()) !== -1
        );
      } else {
        return false;
      }
    },
    keywordCLR(index) {
      let master = _.cloneDeep(this.step2);
      master.detail[index].search_cg = "";
      this.$store.commit("incentive/setDataStep2", master);
    },
    setConChk(key) {
      console.log("setConChk >>> ");
    },
    fmNumberInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    formatterDate(date) {
      let checkFM = moment(date, [
        "YYYY-MM-DD",
        "YYYY-MM-DD HH:mm:ss",
      ]).format();

      if (checkFM == "Invalid date") {
        return "";
      } else {
        return moment(date).format("DD MMM YYYY");
      }
    },
  },
  computed: {
    step1Setting() {
      return this.$store.getters["incentive/step1Setting"];
    },
    masterStep1() {
      return this.$store.getters["incentive/masterStep1"];
    },
    step2() {
      return this.$store.getters["incentive/step2"];
    },
    defaultStep() {
      return this.$store.getters["incentive/defaultStep"];
    },
    dataBeforeChange() {
      return this.$store.getters["incentive/dataBeforeChange"];
    },
    data_reward() {
      return this.$store.getters["incentive/data_reward"];
    },
    total_reward() {
      return this.$store.getters["incentive/total_reward"];
    },
  },
  created() {},
  watch: {
    step2(val) {
      // console.log("-watch-");
      // console.log("this.step2 ==>", JSON.stringify(this.step2));
      // this.$store.commit("incentive/setTmpDataStep2", this.step2);
      // let cloneDataStep2 = JSON.parse(JSON.stringify(this.step2));
      // console.log("cloneDataStep2 ==>", cloneDataStep2);

      this.$store.getters["incentive/step2"];
      if (document.getElementById("hhgghh") != null) {
        // setTimeout(() => {
        //    this.slectedRightCondition(2 , '')
        // }, 0);
        // console.log( document.getElementById('hhgghh'))
      }
    },
  },
  directives: {
    sticky: VueSticky,
  },
};
</script>
<style lang="scss" scoped>
.step1tab2-team-chip {
  background: #66bb6a;
  color: #ffffff;
  font-size: 9px;
  border-radius: 16px;
  text-align: center;
  height: 18px;
  line-height: 1.4;
}
.step1tab2-unteam-chip {
  background: #a8a8a8;
  color: #ffffff;
  font-size: 9px;
  border-radius: 16px;
  text-align: center;
  height: 18px;
  line-height: 1.4;
}

.dialog-configuration {
  .md-dialog-content {
    width: 490px;
    font-size: 16px;
    font-weight: 500;
    color: #727272;
    padding: 35px 30px 20px 30px;
  }
  .md-dialog-actions {
    padding-bottom: 15px;
    padding-right: 15px;
  }
}
</style>
