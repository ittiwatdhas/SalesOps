<template>
  <div>
    <md-dialog class="incentive-dialog-step-two" md-open-from="#custom" md-close-to="#custom" ref="dialog-step-two">
      <md-spinner v-show="loadingPage" :md-size="150" :md-stroke="1" md-indeterminate
        style="position: fixed; z-index: 10; left: 45%; top: 35%"></md-spinner>

      <div class="md-dialog-title" style="
          background: #efefef;
          margin-right: 1px;
          padding-top: 20px;
          padding-bottom: 10px;
          margin-bottom: 12px;
        ">
        <md-layout>
          <md-layout md-flex-large="80">
            <md-chip>{{ title.tactics_index }}</md-chip>
            <label class="sub-title kanitFont" style="font-size: 18px; margin-left: 10px">{{ title.tactics_title
            }}</label>
            <label class="sub-title kanitFont" style="font-size: 18px; font-weight: 600; margin-left: 7px">- {{
              title.condition_title }}</label>
          </md-layout>
          <md-layout md-flex-large="20" md-align="end">
            <md-icon @click.native="closeDialog('dialog-step-two')"
              style="cursor: pointer; margin: 0px; text-align: right">close</md-icon>
          </md-layout>
        </md-layout>
      </div>

      <md-dialog-content style="padding: 0">
        <div style="height: 100%" class="md-layout">
          <div style="height: 100%; width: 13%">
            <div style="
                justify-content: center;
                align-items: center;
                display: flex;
                height: 13%;
                font-size: 16px;
              ">
              REWARDS SELECTION
            </div>
            <div class="scroll-left" style="overflow-y: scroll; height: 87%; padding-top: 20px">
              <div v-for="(row, index) in reward_selection" :key="'dialog-content-' + index" style="
                  padding: 10px 0 10px 0;
                  justify-content: center;
                  display: flex;
                ">
                <div @click="select_reward(row)" :style="{
                  color: is_active == Number(row) ? '#FD7F00' : '#727272',
                }" style="
                    cursor: pointer;
                    font-family: kanit;
                    font-size: 17px;
                    margin-bottom: 10px;
                  ">
                  {{ "฿ " }}{{ fmNumberInt(row) }}
                </div>
              </div>

              <div style="
                  padding: 10px 0 10px 0;
                  justify-content: center;
                  display: flex;
                ">
                <div @click="select_reward('all')" :style="{ color: is_active == 'all' ? '#FD7F00' : '#727272' }" style="
                    cursor: pointer;
                    font-family: kanit;
                    font-size: 17px;
                    margin-bottom: 10px;
                  ">
                  ALL PRICES
                </div>
              </div>
            </div>
          </div>

          <div style="height: 100%; width: 87%">
            <div class="content-respon">
              <div style="background: #efefef; padding: 10px; display: flex">
                <div style="width: 30%; display: flex"></div>

                <div style="
                    width: 15%;
                    text-align: left;
                    padding-left: 1%;
                    padding-right: 1%;
                  ">
                  <!-- <div class="text-1">KEY SEARCH</div> -->
                  <form @click.stop.prevent="changeTypeSearch">
                    <md-switch style="margin-bottom: 0px; margin-top: 13px" type="submit" v-model="type_search"
                      class="md-primary">
                      <label v-if="type_search">SEARCH + ADD</label>
                      <label v-if="!type_search">SEARCH</label>
                    </md-switch>
                    <!-- <div class="text-1">SEARCH</div> -->
                  </form>
                </div>
                <div id="copy_search" v-show="type_search" style="background-color: yellow; width: 55%">
                  <div class="salesops-input" style="margin-right: 20px; display: flex">
                    <!-- <md-icon style="cursor: pointer; color: #A8A8A8;">post_add</md-icon> -->
                    <md-icon style="
                        cursor: pointer;
                        color: #a8a8a8;
                        margin: 0px 10px;
                        padding-top: 6px;
                      " @click.native="clearSearchTxtProductCopy">refresh</md-icon>
                    <input type="text" v-model="searchTxtProductCopy"
                      placeholder="Please fill in cg code set, ex. xxx001 xxx002 xxx003." @keyup.enter="
                        searchProductItem(searchTxtProductCopy, 'copy')
                        " />
                  </div>
                </div>
                <div v-show="!type_search" style="width: 55%">
                  <div class="salesops-input" style="margin-right: 20px; display: flex">
                    <md-icon style="
                        cursor: pointer;
                        color: #a8a8a8;
                        margin: 0px 10px;
                        padding-top: 6px;
                      " @click.native="searchProductItem(searchTxtProduct, 'key')">playlist_add</md-icon>
                    <input type="text" v-model="searchTxtProduct" placeholder="Search..."
                      @keyup.enter="searchProductItem(searchTxtProduct, 'key')" />
                  </div>

                  <div v-show="showDisplaySearch">
                    <!-- v-click-outside="closeDivSearch" -->
                    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog-search-items-add"
                      class="incentive-search-items incentive-dialog-step-two">
                      <md-dialog-title style="margin-bottom: 5px !important">
                        <!-- <div style="height: 53px; width: 50%"></div>
                        <div
                          style="
                            height: 53px;
                            width: 47%;
                            display: flex;
                            align-items: center;
                          "
                        >
                          <div class="salesops-input" style="display: flex">
                            <md-icon
                              style="
                                cursor: pointer;
                                color: #a8a8a8;
                                margin: 0px 10px;
                                padding-top: 6px;
                              "
                              >playlist_add</md-icon
                            >
                            <input
                              type="text"
                              v-model="searchTxtProduct"
                              placeholder="Search..."
                              @keyup.enter="
                                searchProductItem(searchTxtProduct, 'key')
                              "
                            />
                          </div>
                        </div>
                        <div
                          style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 3%;
                          "
                        >
                          <md-icon
                            @click.native="onCloseDialog"
                            style="cursor: pointer"
                            >close</md-icon
                          >
                        </div> -->
                        <div id="head-table-seach-popup-title" style="height: 54px; display: flex; width: 100%">
                          <div style="
                              height: 53px;
                              width: 31%;
                              display: flex;
                              align-items: center;
                            ">
                            <div class="salesops-input" style="display: flex; margin-left: 15px">
                              <md-icon style="
                                  color: #a8a8a8;
                                  margin: 0px 10px;
                                  padding-top: 6px;
                                ">playlist_add</md-icon>
                              <input type="text" v-model="searchTxtProduct" placeholder="Search..." @keyup.enter="
                                searchProductItem(searchTxtProduct, 'key')
                                " />
                            </div>
                          </div>

                          <div class="flex-center head-style-box-search" style="width: 7%">
                            <div style="height: 50%">MOM</div>
                            <div style="height: 50%">
                              {{ "( " }}{{ title.head_table[0] }}{{ " )" }}
                            </div>
                          </div>

                          <div class="flex-center head-style-box-search" style="width: 7%">
                            <div style="height: 50%">MOM</div>
                            <div style="height: 50%">
                              {{ "( " }}{{ title.head_table[1] }}{{ " )" }}
                            </div>
                          </div>

                          <div class="flex-center head-style-box-search" style="width: 7%">
                            <div style="height: 50%">MOM</div>
                            <div style="height: 50%">
                              {{ "( " }}{{ title.head_table[2] }}{{ " )" }}
                            </div>
                          </div>

                          <div class="flex-center head-style-box-search" style="color: #fd7f00; width: 7%">
                            <div style="height: 50%">MTG</div>
                            <div style="height: 50%">
                              {{ "( " }}{{ title.head_table[3] }}{{ " )" }}
                            </div>
                          </div>

                          <div class="flex-center head-style-box-search" style="width: 7%">
                            <div style="height: 50%">
                              {{ "M " }}{{ title.head_table[4] }}
                            </div>
                            <div style="height: 50%; display: grid">
                              <div class="underline-content">
                                {{ "TG " }}{{ title.head_table[3] }}
                              </div>
                            </div>
                          </div>

                          <div class="flex-center head-style-box-search" style="width: 7%">
                            <div style="height: 50%">
                              {{ "M " }}{{ title.head_table[4] }}
                            </div>
                            <div style="height: 50%; display: grid">
                              <div class="underline-content">
                                {{ "TG " }}{{ title.head_table[3] }}
                              </div>
                            </div>
                          </div>

                          <div class="flex-center head-style-box-search" style="width: 7%">
                            <div style="height: 50%">
                              {{ "M " }}{{ title.head_table[4] }}
                            </div>
                            <div style="height: 50%; display: grid">
                              <div class="underline-content">
                                {{ "TG " }}{{ title.head_table[3] }}
                              </div>
                            </div>
                          </div>

                          <div class="flex-center head-style-box-search" style="
                              font-size: 12px;
                              font-size: 12px;
                              width: 7%;
                              height: 80%;
                              font-weight: normal;
                            ">
                            <div style="height: 50%">Prices</div>
                            <div style="height: 50%">
                              {{
                                dataSearchProduct[0] !== undefined
                                ? dataSearchProduct[0].price_type
                                : ""
                              }}
                            </div>
                          </div>

                          <div style="
                              display: flex;
                              align-items: center;
                              width: 11%;
                              justify-content: end;
                            ">
                            <div class="font-kanit" style="
                                font-size: 9px;
                                font-weight: normal;
                                font-size: 10px;
                                padding-right: 8px;
                              ">
                              { ฿ Supply : {{ formatNumber(sumSupply, 0) }} }
                            </div>
                          </div>
                          <div style="
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              width: 2%;
                              margin-right: 6px;
                            ">
                            <md-icon @click.native="onCloseDialog" style="cursor: pointer">close</md-icon>
                          </div>
                        </div>
                      </md-dialog-title>

                      <md-dialog-content>
                        <md-card style="padding: 0">
                          <md-card-content>
                            <!-- Loading -->
                            <div v-show="loadingSearch" style="
                                padding: 20px;
                                text-align: center;
                                display: flex;
                                justify-content: center;
                              ">
                              <md-spinner :md-size="30" :md-stroke="1" md-indeterminate style="
                                  position: fixed;
                                  z-index: 10;
                                  margin-left: -40px;
                                "></md-spinner>
                              <label style="margin-left: 45px; padding-top: 5px">Loading..</label>
                            </div>

                            <template v-for="(product, iProduct) in dataSearchProduct">
                              <!-- mom -->
                              <div :key="`${iProduct}-${product.group_code}` + `search`
                                " id="head-table-seach-popup" style="
                                  height: 45px;
                                  color: #fff;
                                  display: flex;
                                  width: 100%;
                                  background-color: #797979;
                                  cursor: pointer;
                                " @click="toggleCollapsible(product.group_code)">
                                <!-- <div style="padding: 12px; width: 3%"> -->
                                <div style="width: 2%">
                                  <!-- <label class="-salesops-checkbox-container">
                                    <input
                                      type="checkbox"
                                      :id="product.group_code"
                                      :value="product.group_code"
                                      @click="
                                        selectAllProductSearch(
                                          product.group_code
                                        )
                                      "
                                    />
                                    <span class="-salesops-checkbox"></span>
                                  </label> -->
                                </div>

                                <div style="display: flex; width: 29%">
                                  <div style="
                                      padding: 0px;
                                      font-family: Kanit;
                                      display: flex;
                                      align-items: center;
                                      font-size: 16px;
                                      font-weight: bold;
                                      width: 30%;
                                    ">
                                    {{ product.group_data }}
                                  </div>
                                  <div style="
                                      display: flex;
                                      align-items: center;
                                      width: 70%;
                                    ">
                                    <!-- Selected (
                                    {{
                                      product.count_select == 0
                                        ? "-"
                                        : product.count_select
                                    }}
                                    ) Items -->
                                    Selected (
                                    {{
                                      selecteItems[product.group_code].length
                                    }}
                                    ) Items
                                  </div>
                                </div>

                                <div class="margin-auto-right" style="width: 7%">
                                  {{
                                    fmNumberInt(
                                      sumHeadTable[product.group_code]["m_1"]
                                    )
                                  }}
                                </div>

                                <div class="margin-auto-right" style="width: 7%">
                                  {{
                                    fmNumberInt(
                                      sumHeadTable[product.group_code]["m_2"]
                                    )
                                  }}
                                </div>

                                <div class="margin-auto-right" style="width: 7%">
                                  {{
                                    fmNumberInt(
                                      sumHeadTable[product.group_code]["m_3"]
                                    )
                                  }}
                                </div>

                                <div class="margin-auto-right" style="
                                    width: 7%;
                                    color: #fd7f00;
                                    font-weight: 500;
                                  ">
                                  {{
                                    fmNumberInt(
                                      sumHeadTable[product.group_code]["mtg"]
                                    )
                                  }}
                                </div>

                                <div style="width: 7%"></div>
                                <div style="width: 7%"></div>
                                <div style="width: 7%"></div>
                                <div style="width: 7%"></div>

                                <div style="
                                    display: flex;
                                    align-items: center;
                                    width: 11%;
                                    justify-content: end;
                                  ">
                                  <div class="font-kanit" style="
                                      font-size: 9px;
                                      font-weight: normal;
                                      font-size: 10px;
                                      color: #fff;
                                      padding-right: 8px;
                                    ">
                                    { ฿ Supply :
                                    {{ formatNumber(product.supply, 0) }} }
                                  </div>
                                </div>

                                <div style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    width: 2%;
                                  ">
                                  <a href="#" style="padding: 0">
                                    <md-icon v-if="collapsedTable(product.group_code)"
                                      style="margin: 0px; color: #fff">arrow_drop_up</md-icon>
                                    <md-icon v-else style="margin: 0px; color: #fff">arrow_drop_down</md-icon>
                                  </a>
                                </div>
                              </div>
                              <!-- child -->
                              <template>
                                <div :key="`${iProduct}-${product.group_code}` +
                                  `child`
                                  " v-show="collapsedTable(product.group_code)">
                                  <template v-for="(item, rIndex) in product.items">
                                    <div :key="`${rIndex}-${item.product_code}` + `search`" style="
                                        display: flex;
                                        width: 100%;
                                        padding: 11px 0 11px 0;
                                      " :class="'row-bg-gray'">
                                      <div style="width: 2%"></div>
                                      <div style="display: flex; width: 29%">
                                        <div style="width: 10%">
                                          <label class="-salesops-checkbox-container"
                                            :class="item.disabled ? '-disabled' : ''">
                                            <input type="checkbox" :id="item.product_code" :value="item.product_code"
                                              v-model="item.isChecked" @click=" selectProductSearch(product, item)"
                                              :disabled="item.disabled" />
                                            <span class="-salesops-checkbox"></span>
                                          </label>
                                        </div>
                                        <div style="
                                            padding: 0 20px 0 0;
                                            white-space: nowrap;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                          ">
                                          {{ item.product_code }} :
                                          {{ item.product_name }}
                                        </div>
                                      </div>
                                      <div class="text-right" style="width: 7%">
                                        {{ fmNumberInt(item.m_1) }}
                                      </div>
                                      <div class="text-right" style="width: 7%">
                                        {{ fmNumberInt(item.m_2) }}
                                      </div>
                                      <div class="text-right" style="width: 7%">
                                        {{ fmNumberInt(item.m_3) }}
                                      </div>
                                      <div class="text-right" style="width: 7%; color: #fd7f00">
                                        {{ (fmNumberInt(item.mtg) == 0) ? "" : fmNumberInt(item.mtg) }}
                                      </div>

                                      <div v-if="(fmNumberInt(item.mtg) == 0)" class="text-right" style="width: 7%"></div>
                                      <div v-else class="text-right" style="width: 7%">
                                        % {{ fmNumberFloat(item.m_4)[0] }}
                                        {{ "." }}
                                        <!-- {{ ("% " + fmNumberFloat(item.m_4)[0] + ".").trim() }} -->
                                        <span style="
                                            padding-top: 0.5px;
                                            font-size: 10px;
                                          ">{{
                                            fmNumberFloat(item.m_4)[1]
                                          }}</span>
                                      </div>

                                      <div v-if="(fmNumberInt(item.mtg) == 0)" class="text-right" style="width: 7%"></div>
                                      <div v-else class="text-right" style="width: 7%">
                                        % {{ fmNumberFloat(item.m_5)[0] }}
                                        {{ "."
                                        }}<span style="
                                            padding-top: 0.5px;
                                            font-size: 10px;
                                          ">{{
                                            fmNumberFloat(item.m_5)[1]
                                          }}</span>
                                      </div>

                                      <div v-if="(fmNumberInt(item.mtg) == 0)" class="text-right" style="width: 7%"></div>
                                      <div v-else class="text-right" style="width: 7%">
                                        % {{ fmNumberFloat(item.m_6)[0] }}
                                        {{ "."
                                        }}<span style="
                                            padding-top: 0.5px;
                                            font-size: 10px;
                                          ">{{
                                            fmNumberFloat(item.m_6)[1]
                                          }}</span>
                                      </div>

                                      <div class="text-right" style="width: 7%"></div>
                                      <div style="
                                          font-size: 11px;
                                          color: #41414180;
                                          width: 11%;
                                          text-align: right;
                                          padding-right: 8px;
                                        ">
                                        {{ fmNumberInt(item.supply) }}
                                      </div>
                                      <div style="width: 2%"></div>
                                      <!-- <label
                                          class="-salesops-checkbox-container"
                                          :style="{'visibility':ckeckExist(item.code , 'child')? 'hidden':'visible' , 'width':'5%'}"
                                        >
                                          <input
                                            type="checkbox"
                                            :id="item.code"
                                            :value="item.code"
                                            @click="
                                              selectProductSearch(product.code, item.code)
                                            "
                                          />
                                          <span class="-salesops-checkbox"></span>
                                        </label>
                                        <div
                                          class="font-kanit"
                                          style="width: 75%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                                          :title="item.product_name"
                                        >{{ item.code }} : {{ item.product_name }}</div>
                                        <div
                                          class="font-kanit"
                                          style="text-align: right; font-size: 11px; color: #41414180; width: 20%;"
                                        >{{ formatNumber(item.total, 0) }}</div> -->
                                    </div>
                                  </template>
                                </div>
                              </template>
                            </template>
                          </md-card-content>
                        </md-card>
                      </md-dialog-content>
                    </md-dialog>
                  </div>
                </div>
              </div>

              <!-- TABLE -->
              <div id="table-product-filter">
                <div style="
                    padding: 0 0 0 5px;
                    background-color: #fff;
                    width: 100%;
                  " class="footer-table">
                  <div style="width: 100%" class="detail-table">
                    <div style="padding: 0 0 0 15px" class="md-layout">
                      <div style="
                          display: flex;
                          justify-content: center;
                          width: 3%;
                        ">
                        <md-icon @click.native="deleteItems()" style="
                            cursor: pointer;
                            color: #a8a8a8;
                            margin: 0px 3px;
                            padding-top: 6px;
                          ">delete</md-icon>
                      </div>
                      <div style="padding: 0 0 0 1%; width: 21%"></div>
                      <div style="
                          color: #fd7f00;
                          display: contents;
                          background-color: ;
                          width: 9%;
                        ">
                        <div style="
                            display: flex;
                            align-items: center;
                            padding: 0 5px 0 0;
                          ">
                          <div style="padding: 0">
                            <md-icon @click.native="openDialogUpdateRewards()" style="
                                padding-top: 2px;
                                cursor: pointer;
                                width: 100%;
                                min-width: 100%;
                                font-size: 18px;
                              ">
                              edit</md-icon>
                          </div>
                        </div>
                        <div style="
                            display: flex;
                            align-items: center;
                            font-weight: bold;
                            font-size: 12px;
                            padding: 0;
                            width: 5%;
                          ">
                          REWARDS
                        </div>
                        <div style="display: flex; padding: 0; width: 2%">
                          <md-icon v-if="sortDESC" style="cursor: pointer" @click.native="sortDataTable()">
                            arrow_drop_down
                          </md-icon>
                          <md-icon v-else style="cursor: pointer" @click.native="sortDataTable()">
                            arrow_drop_up
                          </md-icon>
                        </div>
                      </div>
                      <div class="flex-center head-style">
                        <div style="height: 50%">MOM</div>
                        <div style="height: 50%">
                          {{ "( " }}{{ title.head_table[0] }}{{ " )" }}
                        </div>
                      </div>
                      <div class="flex-center head-style" style="width: 9%">
                        <div style="height: 50%">MOM</div>
                        <div style="height: 50%">
                          {{ "( " }}{{ title.head_table[1] }}{{ " )" }}
                        </div>
                      </div>
                      <div class="flex-center head-style" style="width: 9%">
                        <div style="height: 50%">MOM</div>
                        <div style="height: 50%">
                          {{ "( " }}{{ title.head_table[2] }}{{ " )" }}
                        </div>
                      </div>
                      <div class="flex-center txt-mng head-style" style="width: 9%">
                        <div style="height: 50%">MTG</div>
                        <div style="height: 50%">
                          {{ "( " }}{{ title.head_table[3] }}{{ " )" }}
                        </div>
                      </div>
                      <div class="flex-center head-style" style="width: 9%">
                        <div style="
                            height: 50%;
                            text-decoration-line: underline;
                            text-decoration-thickness: 2px;
                          ">
                          {{ "M " }}{{ title.head_table[4] }}
                        </div>
                        <div style="height: 50%">
                          {{ "TG " }}{{ title.head_table[3] }}
                        </div>
                      </div>
                      <div class="flex-center head-style" style="width: 7.5%">
                        <div style="
                            height: 50%;
                            text-decoration-line: underline;
                            text-decoration-thickness: 2px;
                          ">
                          {{ "M " }}{{ title.head_table[5] }}
                        </div>
                        <div style="height: 50%">
                          {{ "TG " }}{{ title.head_table[3] }}
                        </div>
                      </div>
                      <div class="flex-center head-style" style="width: 7%">
                        <div style="
                            height: 50%;
                            text-decoration-line: underline;
                            text-decoration-thickness: 2px;
                          ">
                          {{ "M " }}{{ title.head_table[6] }}
                        </div>
                        <div style="height: 50%">
                          {{ "TG " }}{{ title.head_table[3] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="divBodyList">
                  <div v-show="tbListItems == null || tbListItems.length == 0" :class="'row-bg-gray'"
                    style="display: block; text-align: center">
                    No data in table.
                  </div>
                  <div v-for="(item, rIndex) in tbListItems" :key="rIndex" style="display: contents">
                    <div v-if="item.items.length > 0 && show_tab(item.items)" style="margin: 0 0 13px 0" class="head-tab">
                      <div style="
                          padding: 7px 0 0 10px;
                          display: flex;
                          justify-content: center;
                          width: 3%;
                        ">
                        <label class="-salesops-checkbox-container">
                          <input type="checkbox" :id="item.group_code" :value="item.check_box" v-model="item.check_box"
                            @click="selectAllProductFilter(item.group_data)" />
                          <span class="-salesops-checkbox"></span>
                        </label>
                      </div>
                      <div @click="expand_head(item)" style="display: flex; align-items: center; width: 8%">
                        {{ item.group_data }}
                      </div>
                      <div @click="expand_head(item)" style="display: flex; align-items: center; width: 14%">
                        {{ "Selected ( " }}{{ item.count_select == 0 || item.count_select == null ? " - " :
                          item.count_select }}{{ " ) Items" }}
                      </div>
                      <div @click="expand_head(item)" style="display: flex; align-items: center; width: 8%">
                        {{
                          fmNumberInt(item.sum_select_reward) == 0 || fmNumberInt(item.sum_select_reward) == null
                          ? " - "
                          : fmNumberInt(item.sum_select_reward)
                        }}
                      </div>

                      <div @click="expand_head(item)" style="
                          justify-content: center;
                          display: flex;
                          align-items: center;
                          width: 9%;
                        ">
                        {{ fmNumberInt(item.m_1) }}
                      </div>
                      <div @click="expand_head(item)" style="
                          justify-content: center;
                          display: flex;
                          align-items: center;
                          width: 9%;
                        ">
                        {{ fmNumberInt(item.m_2) }}
                      </div>
                      <div @click="expand_head(item)" style="
                          justify-content: center;
                          display: flex;
                          align-items: center;
                          width: 9%;
                        ">
                        {{ fmNumberInt(item.m_3) }}
                      </div>
                      <div @click="expand_head(item)" style="
                          justify-content: center;
                          display: flex;
                          align-items: center;
                          width: 9%;
                        ">
                        {{ fmNumberInt(item.mtg) }}
                      </div>
                      <div @click="expand_head(item)" style="
                          justify-content: center;
                          display: flex;
                          align-items: center;
                          width: 9%;
                        "></div>
                      <div @click="expand_head(item)" style="
                          justify-content: center;
                          display: flex;
                          align-items: center;
                          width: 7%;
                        "></div>
                      <div @click="expand_head(item)" style="
                          justify-content: center;
                          display: flex;
                          align-items: center;
                          width: 7%;
                        "></div>

                      <div @click="expand_head(item)" style="
                          padding-right: 5px;
                          display: flex;
                          justify-content: flex-end;
                          align-items: center;
                          width: 8%;
                        ">
                        <span v-if="item.expand" class="material-icons">
                          expand_less
                        </span>
                        <span v-else class="material-icons"> expand_more </span>
                      </div>
                    </div>
                    <div v-if="item.expand &&
                      item.items.length > 0 &&
                      show_tab(item.items)
                      " class="detail-table">
                      <div v-for="(item2, rIndex_2) in item.items" :key="rIndex_2">
                        <div v-if="item2.dis_p" :style="{
                          cursor: item2.sub_item.length > 0 ? 'pointer' : '',
                          'background-color':
                            hover_focus == item2.product_code
                              ? '#D4D4D4'
                              : '',
                          color:
                            hover_focus == item2.product_code ? '#fff' : '',
                        }" @mouseout="hover_focus = ''" @mouseover="hover_line(item2)" style="padding: 5px 0 5px 0"
                          class="md-layout">
                          <div style="
                              padding: 0 0 0 4px;
                              display: flex;
                              justify-content: center;
                              width: 3%;
                            ">
                            <label class="-salesops-checkbox-container">
                              <input type="checkbox" v-model="checkedProductFilter_current" :id="item.product_code"
                                :value="item2.product_code + '' + item.group_code
                                  " @click="selectProductFilter(item2, item)" />
                              <span class="-salesops-checkbox"></span>
                            </label>
                          </div>
                          <div @click="expand_item(item2)" :style="{
                            'font-weight':
                              item2.sub_item.length > 0 ? 'bold' : '',
                            color: item2.sub_item.length > 0 ? '#F44336' : '',
                          }" style="padding: 0 1% 0 0; width: 22%" class="nowrap-title"
                            :title="item2.product_code + ' : ' + item2.product_name">
                            {{
                              item2.product_code + " : " + item2.product_name
                            }}
                          </div>
                          <div class="respon-column-rewards" style="
                              background-color: ;
                              padding-right: 20px;
                              width: 8%;
                              display: flex;
                            ">
                            <span>฿</span>
                            <md-input-container class="md-input-focused">
                              <!--  -->
                              <!-- @keyup.enter.native="calulateReward(item.code)" -->
                              <md-input v-model="item2.reward" @blur="calulateReward()" @keypress.native="isNumber"
                                @focus="formatStringToFloat(rIndex_2, item2)"></md-input>
                            </md-input-container>
                          </div>
                          <div class="flex-center" @click="expand_item(item2)" style="width: 9%">
                            {{ fmNumberInt(item2.m_1) }}
                          </div>
                          <div class="flex-center" @click="expand_item(item2)" style="width: 9%">
                            {{ fmNumberInt(item2.m_2) }}
                          </div>
                          <div class="flex-center" @click="expand_item(item2)" style="width: 9%">
                            {{ fmNumberInt(item2.m_3) }}
                          </div>
                          <div class="flex-center txt-mng" @click="expand_item(item2)" style="width: 9%">
                            {{ fmNumberInt(item2.mtg) }}
                          </div>

                          <div v-if="(fmNumberInt(item2.mtg) == 0)" class="flex-center" @click="expand_item(item2)"
                            style="width: 9%"></div>
                          <div v-else class="flex-center" @click="expand_item(item2)" style="width: 9%">
                            % {{ fmNumberFloat(item2.m_4)[0] }} {{ "." }}
                            <span style="padding-top: 0.5px; font-size: 9px">{{
                              fmNumberFloat(item2.m_4)[1]
                            }}</span>
                          </div>

                          <div v-if="(fmNumberInt(item2.mtg) == 0)" class="flex-center" @click="expand_item(item2)"
                            style="width: 9%"></div>
                          <div v-else class="flex-center" @click="expand_item(item2)" style="width: 7%">
                            % {{ fmNumberFloat(item2.m_5)[0] }} {{ "." }}
                            <span style="padding-top: 0.5px; font-size: 9px">{{
                              fmNumberFloat(item2.m_5)[1]
                            }}</span>
                          </div>

                          <div v-if="(fmNumberInt(item2.mtg) == 0)" class="flex-center" @click="expand_item(item2)"
                            style="width: 9%"></div>
                          <div v-else class="flex-center" @click="expand_item(item2)" style="width: 7%">
                            % {{ fmNumberFloat(item2.m_6)[0] }} {{ "." }}
                            <span style="padding-top: 0.5px; font-size: 9px">{{
                              fmNumberFloat(item2.m_6)[1]
                            }}</span>
                          </div>

                          <div :style="{
                                color: item2.sub_item.length > 0 ? '#F44336' : '',
                              }" style="font-weight: bold; color: #fd7f00; width: 7%">
                            {{ item2.sub_item.length > 0 ? "CONFLICT" : "" }}
                          </div>
                        </div>
                        <div v-if="item2.expand" class="subitem-table">
                          <div v-for="(item2, rIndex_2) in item2.sub_item" :key="rIndex_2">
                            <div style="padding: 5px 0 5px 0" class="md-layout">
                              <!-- <div style="display:flex; justify-content: center;width:3%;"> </div> -->
                              <div style="padding: 0 0.5% 0 1%; width: 23%" class="nowrap-title"
                                :title="item2.product_code + ' : ' + item2.product_name">
                                {{
                                  item2.product_code +
                                  " : " +
                                  item2.product_name
                                }}
                              </div>
                              <div class="respon-column-rewards" style="
                                  padding-right: 20px;
                                  width: 8.5%;
                                  display: flex;
                                ">
                                <span>฿</span>
                                <md-input-container class="md-input-focused">
                                  <!-- @blur="calulateReward(item.code)" -->
                                  <!-- @keyup.enter.native="calulateReward(item.code)" -->
                                  <md-input v-model="item2.reward" @keypress.native="isNumber" @focus="
                                    formatStringToFloat(rIndex_2, item2)
                                    "></md-input>
                                </md-input-container>
                              </div>
                              <div class="flex-center" style="width: 9.2%">
                                {{ fmNumberInt(item2.m_1) }}
                              </div>
                              <div class="flex-center" style="width: 9.3%">
                                {{ fmNumberInt(item2.m_2) }}
                              </div>
                              <div class="flex-center" style="width: 9.3%">
                                {{ fmNumberInt(item2.m_3) }}
                              </div>
                              <div class="flex-center txt-mng" style="width: 9.2%">
                                {{ fmNumberInt(item2.mtg) }}
                              </div>
                              <div class="flex-center" style="width: 9.5%">
                                % {{ fmNumberFloat(item2.m_4)[0] }} {{ "." }}
                                <span style="padding-top: 0.5px; font-size: 9px">{{ fmNumberFloat(item2.m_4)[1] }}</span>
                              </div>
                              <div class="flex-center" style="width: 7.2%">
                                % {{ fmNumberFloat(item2.m_5)[0] }} {{ "." }}
                                <span style="padding-top: 0.5px; font-size: 9px">{{ fmNumberFloat(item2.m_5)[1] }}</span>
                              </div>
                              <div class="flex-center" style="width: 7.3%">
                                % {{ fmNumberFloat(item2.m_6)[0] }} {{ "." }}
                                <span style="padding-top: 0.5px; font-size: 9px">{{ fmNumberFloat(item2.m_6)[1] }}</span>
                              </div>
                              <div style="
                                  font-weight: bold;
                                  color: #fd7f00;
                                  width: 7%;
                                ">
                                {{ item2.intent }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style="padding: 0; width: 100%" class="footer-table">
                  <div style="padding: 0; width: 100%" class="detail-table">
                    <div style="padding: 5px 0 5px 0" class="md-layout">
                      <div style="
                          display: flex;
                          justify-content: center;
                          width: 4%;
                        ">
                        {{ "( " }}
                        {{
                          this.checkedProductFilter_current.length == 0
                          ? " - "
                          : this.checkedProductFilter_current.length
                        }}
                        {{ ")" }}
                      </div>
                      <div style="
                          font-weight: bold;
                          padding: 0 0 0 1%;
                          width: 20.7%;
                        ">
                        Selected Items :
                        {{ fmNumberInt(this.total.sum_select_reward) }}
                      </div>
                      <div class="respon-column-rewards" style="
                          font-weight: bold;
                          padding-right: 20px;
                          width: 8%;
                          display: flex;
                        ">
                        {{ fmNumberInt(this.total.reward) }}
                      </div>
                      <div class="flex-center" style="width: 9%">
                        {{ fmNumberInt(this.total.m_1) }}
                      </div>
                      <div class="flex-center" style="width: 9%">
                        {{ fmNumberInt(this.total.m_2) }}
                      </div>
                      <div class="flex-center" style="width: 9%">
                        {{ fmNumberInt(this.total.m_3) }}
                      </div>
                      <div class="flex-center txt-mng" style="width: 9%">
                        {{ fmNumberInt(this.total.mtg) }}
                      </div>
                      <div class="flex-center" style="width: 9%"></div>
                      <div class="flex-center" style="width: 7.5%"></div>
                      <div class="flex-center" style="width: 7%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions style="justify-content: unset; padding: 10px 30px">
        <div style="
            padding: 0 20px 0 0;
            display: flex;
            justify-content: flex-end;
            font-size: 15px;
            font-weight: bold;
            font-family: Roboto;
            color: #a8a8a8;
            width: 11%;
          "></div>
        <div style="
            padding: 0 20px 0 0;
            display: flex;
            justify-content: flex-start;
            font-size: 15px;
            font-weight: bold;
            font-family: Roboto;
            color: #a8a8a8;
            width: 23%;
          ">
          BALANCE REWARD :
          <span style="padding: 0 0 0 10px; font-weight: normal; font-family: Lato" :style="{
            color:
              this.sumMaxRewards - this.rewardTotal > 0 ? '#66BB6A' : 'red',
          }">
            {{ " " }}{{ fmNumberInt(this.sumMaxRewards - this.rewardTotal) }}
          </span>
        </div>
        <div style="width: 46%">
          <span style="
              color: #414141;
              font-family: Lato;
              font-size: 15px;
              font-weight: bold;
            ">฿ {{ fmNumberInt(this.rewardTotal) }}</span>
          <span style="color: #a8a8a8; font-family: Roboto; font-size: 10px">( ALL PRICES REWARD )</span>
        </div>

        <div style="display: flex; justify-content: flex-end; width: 20%">
          <md-button style="color: #a2a2a2" @click="reloadData()">RELOAD</md-button>
          <!-- <md-button class="md-primary" @click="saveDataDialog()" style="margin-left: 32px;">Save</md-button> -->
        </div>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog-update-rewards" class="incentive-update-rewards">
      <md-dialog-content>
        <div style="font-size: 16px; color: #727272; font-weight: 500">
          Do you want to edit all selected items as .
        </div>
        <div style="display: flex; margin-top: 20px; font-size: 22px">
          <label style="padding-top: 14px; margin-right: 10px">฿</label>
          <div class="salesops-input">
            <input ref="valueUpdateRewardsID" type="text" v-model="valueUpdateRewards" @keypress="isNumber"
              @focus="formatStringToFloatEdit(2)" @blur="updateRewards" placeholder="Value update..." />
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="onCancelValueUpdate()" style="color: #a8a8a8">Cancel</md-button>
        <md-button class="md-primary" @click="updateRewardsMany()">Update</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-snackbar class="incentive-step-two-snackbar" :md-position="vertical + ' ' + horizontal" ref="snackbar"
      :md-duration="duration">
      <span>{{ textSnackbar }}</span>
      <md-button @click="$refs.snackbar.close()">OK</md-button>
    </md-snackbar>

    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar_input" :md-duration="duration">
      <span>Can't found cg code : {{ snkValue }}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">
        <span style="color: #fd7f00">Agree</span>
      </md-button>
    </md-snackbar>

    <dialog-confirm :show="showDialogConfirm" :btnright="btnright" :content="dialogConfirmContent"
      @clickClose="onCloseDialog" @clickConfirm="onConfirmDialog"></dialog-confirm>
  </div>
</template>

<script>
import incentiveService from "@/services/planning/incentive";
import ClickOutside from "vue-click-outside";
import Vue from "vue";

export default {
  name: "dialog-step-two",

  directives: {
    ClickOutside,
  },

  components: {
    "dialog-confirm": require("./dialog-confirm"),
  },

  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      dataSearchProduct: {},
      searchTxtProduct: "",
      searchTxtProductCopy: "",
      showDisplaySearch: false,
      loadingSearch: false,
      loadingPage: false,
      tbListItems: [],
      Full_tbListItems: [],
      checkedProductSearchAll: [],
      checkedProductSearch: [],
      checkedProductFilterAll: false,
      checkedProductFilter: [],
      checkedProductFilter_current: [],
      sortDESC: false, //Default เรียงจากน้อยไปมาก
      sumRewards: 0,
      sumNewItem: 0,
      sumHighGrowth: 0,
      sumRisingStar: 0,
      sumCashCow: 0,
      sumDog: 0,
      sumTotal: 0,
      sumMaxRewards: 0,
      valueUpdateRewards: "",
      vertical: "bottom",
      horizontal: "center",
      duration: 10000,
      sumSelectData: 0,
      dialogConfirmContent: "",
      showDialogConfirm: false,
      checkClickButton: "",
      btnright: "",
      type_search: false,
      snkValue: "",

      hover_focus: "",
      is_active: 1,
      b_reward: "",
      reward_selection: [],
      rewardTotal: 0,
      total: {
        sum_select_reward: "-",
        reward: "-",
        m_1: 0,
        m_2: 0,
        m_3: 0,
        mtg: 0,
        m_4: 0,
        m_5: 0,
        m_6: 0,
      },
      check_selection: {
        product: [],
        cg: [],
        sub_grpup: [],
        group: [],
        type: [],
      },
      isCollapsed: {
        product: false,
        cg: false,
        sub: false,
        group: false,
        type: true,
      },
      checkShowDialogSearch: false,
      sumSupply: 0,
      sumHeadTable: {
        product: {
          m_1: 0,
          m_2: 0,
          m_3: 0,
          mtg: 0,
          m_4: 0,
          m_5: 0,
          m_6: 0,
        },
        cg: {
          m_1: 0,
          m_2: 0,
          m_3: 0,
          mtg: 0,
          m_4: 0,
          m_5: 0,
          m_6: 0,
        },
        sub: {
          m_1: 0,
          m_2: 0,
          m_3: 0,
          mtg: 0,
          m_4: 0,
          m_5: 0,
          m_6: 0,
        },
        group: {
          m_1: 0,
          m_2: 0,
          m_3: 0,
          mtg: 0,
          m_4: 0,
          m_5: 0,
          m_6: 0,
        },
        type: {
          m_1: 0,
          m_2: 0,
          m_3: 0,
          mtg: 0,
          m_4: 0,
          m_5: 0,
          m_6: 0,
        },
      },
      selecteItems: {
        product: [],
        cg: [],
        sub: [],
        group: [],
        type: [],
      },
      dataSelectedSearch: {
        product: [],
        cg: [],
        sub: [],
        group: [],
        type: [],
      },
      checkDataDisabled: {
        product: [],
        cg: [],
        sub: [],
        group: [],
        type: [],
      },
      textSnackbar: ""
    };
  },

  watch: {
    show() {
      if (this.show) {
        this.$refs["dialog-step-two"].open();
        this.loadDataList();
        // incentiveService.getListData().then(response => {
        //   this.tbListItems = response;
        //   this.calulateFooter();
        // });
      }
    },
  },
  methods: {
    toggleCollapsible(type) {
      this.isCollapsed[type] = !this.isCollapsed[type];
    },
    collapsedTable(type) {
      return this.isCollapsed[type];
    },
    onCancelValueUpdate() {
      this.checkShowDialogSearch = false;
      // this.tbListItems = JSON.parse(
      //   localStorage.getItem("reload_detail_step2")
      // );
      // this.calulateReward();
      // this.calulateAll();
      // this.calulateFooter();
      // this.calulateReward();
      this.$refs["dialog-update-rewards"].close();
    },
    hover_line(param) {
      if (param.sub_item.length > 0) {
        this.hover_focus = param.product_code;
        // console.log(param)
      }
    },
    expand_head(param) {
      if (param.expand) {
        param.expand = false;
      } else {
        param.expand = true;
      }
    },
    expand_item(param) {
      if (param.sub_item.length > 0) {
        if (param.expand) {
          param.expand = false;
        } else {
          param.expand = true;
        }
      }
    },
    select_reward(param) {
      console.log(" == ", param);
      if (param == "all") {
        // this.tbListItems = _.cloneDeep(this.Full_tbListItems)
        for (let index = 0; index < this.tbListItems.length; index++) {
          const element = this.tbListItems[index].items;
          element.map((obj) => ({ ...obj, dis_p: (obj.dis_p = true) }));
        }
      } else {
        for (let index = 0; index < this.tbListItems.length; index++) {
          const element = this.tbListItems[index].items;
          for (let j = 0; j < element.length; j++) {
            const element2 = element[j];
            let formattedNum = element2.reward.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            });
            formattedNum = formattedNum.replace(/,/g, "");
            if (formattedNum != param) {
              // console.log("element2 ==>", element2)
              if (element2.dis_p) {
                element2.expand = false;
              }
              element2.dis_p = false;
            } else {
              element2.dis_p = true;
            }
          }
        }
      }

      if (param != "all") {
        this.is_active = param;
        this.b_reward = param;
      } else {
        this.is_active = "all";
        this.b_reward = "all";
      }
      this.calulateAll();
      this.calulateFooter();
      // this.calulateReward()
    },
    fmNumberInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    fmNumberFloat(value) {
      let text = this.$store.getters["globalfunc/formatNumber"](value);
      const myArray = text.split(".");
      return myArray;
    },
    fmNumberFloatDF(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },
    ckeckExist(code, mode) {
      if (mode == "mom") {
        let key = this.checkedProductSearchAll.findIndex((item) => {
          return code === item;
        });

        if (key > -1) {
          return true;
        } else {
          return false;
        }
      } else {
        let key = this.tbListItems.findIndex((item) => {
          return code === item.code;
        });

        if (key > -1) {
          return true;
        } else {
          return false;
        }
      }
    },
    formatNumber(value, dicimal) {
      if (isNaN(parseFloat(value))) {
        return value;
      } else {
        return parseFloat(value).toLocaleString(undefined, {
          minimumFractionDigits: dicimal,
          maximumFractionDigits: dicimal,
        });
      }
    },
    isNumber_new(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      console.log(charCode);
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57)
        // && charCode !== 46 (.)
      ) {
        this.keepEvent = false;
        evt.preventDefault();
      } else {
        this.keepEvent = true;
        return true;
      }
    },
    closeDialog(ref) {
      this.btnright = "YES";
      this.checkClickButton = "close";
      this.dialogConfirmContent = "Are you sure you want to close.... ?";
      this.showDialogConfirm = true;
    },
    selectAllProductFilter(param) {
      let index = this.tbListItems.findIndex((item) => {
        return param === item.group_data;
      });
      // console.log(this.tbListItems[index])
      const select_ = this.tbListItems[index];
      // console.log(select_)
      if (!select_.check_box) {
        for (let index = 0; index < select_.items.length; index++) {
          const element = select_.items[index];
          // console.log(element.product_code + '' +select_.group_code)
          if (element.dis_p == true) {
            let index_check = this.checkedProductFilter_current.indexOf(
              element.product_code + "" + select_.group_code
            );
            if (index_check == -1) {
              this.checkedProductFilter_current.push(
                element.product_code + "" + select_.group_code
              );
            }
          }
        }
        select_.check_box = true;
      } else {
        for (let index = 0; index < select_.items.length; index++) {
          const element = select_.items[index];
          this.checkedProductFilter_current =
            this.checkedProductFilter_current.filter(
              (item) => item !== element.product_code + "" + select_.group_code
            );
        }
        select_.check_box = false;
      }

      this.calulateAll();
    },
    selectProductFilter(param, param2) {
      // console.log(' check box -> ',param2)
      let rs = param.reward.toString().replace(/,/g, "");
      if (
        this.checkedProductFilter_current.indexOf(
          param.product_code + "" + param2.group_code
        ) == -1
      ) {
        this.checkedProductFilter_current.push(
          param.product_code + "" + param2.group_code
        );
        // this.sumSelectData += reward && reward !== "" ? parseFloat(reward) : 0;
        this.sumSelectData +=
          param.reward && param.reward !== "" ? parseFloat(rs) : 0;
      } else {
        this.checkedProductFilter_current.splice(
          this.checkedProductFilter_current.indexOf(
            param.product_code + "" + param2.group_code
          ),
          1
        );
        // this.sumSelectData -= reward && reward !== "" ? parseFloat(reward) : 0;
        this.sumSelectData -=
          param.reward && param.reward !== "" ? parseFloat(rs) : 0;
      }
      this.checkedProductFilterAll =
        this.checkedProductFilter_current.length == this.tbListItems.length
          ? true
          : false;

      this.calulateAll();
    },
    sortDataTable() {
      if (this.sortDESC) {
        this.sortDESC = false;
        for (let index = 0; index < this.tbListItems.length; index++) {
          const element = this.tbListItems[index].items;

          for (let index = 0; index < element.length; index++) {
            const element2 = element[index];
            element2.sub_item.sort((a, b) =>
              Number(a.reward) > Number(b.reward) ? 1 : -1
            );
          }
          element.sort((a, b) =>
            Number(a.reward) > Number(b.reward) ? 1 : -1
          );
        }
      } else {
        this.sortDESC = true;
        for (let index = 0; index < this.tbListItems.length; index++) {
          const element = this.tbListItems[index].items;

          for (let index = 0; index < element.length; index++) {
            const element2 = element[index];
            element2.sub_item.sort((a, b) =>
              Number(a.reward) < Number(b.reward) ? 1 : -1
            );
          }
          element.sort((a, b) =>
            Number(a.reward) < Number(b.reward) ? 1 : -1
          );
        }
      }
    },
    calulateAll() {
      var selected_sum = 0;
      // RESET COUNT SUM
      this.tbListItems.forEach((element, index) => {
        element.sum_select_reward = 0;
        element.count_select = 0;
      });

      // console.log("this.checkedProductFilter_current ==>", this.checkedProductFilter_current);
      // console.log("this.tbListItems ==>", this.tbListItems);
      for (
        let index = 0;
        index < this.checkedProductFilter_current.length;
        index++
      ) {
        const element = this.checkedProductFilter_current[index];
        for (let index = 0; index < this.tbListItems.length; index++) {
          const master_data = this.tbListItems[index].items;
          const head_data = this.tbListItems[index];
          // console.log(head_data);
          const a = master_data.find(
            (x) => x.product_code + "" + head_data.group_code === element
          );
          if (a) {
            let parts = a.reward.toString().split(".");
            let num = parts[0].replace(/,/g, "");
            let rs = num;
            // SUM SELECT RWWARD ALL
            selected_sum += parseFloat(rs);
            // SUM SELECT REWARD HEAD
            // console.log(Number(a.reward, 0))
            head_data.count_select += 1;
            head_data.sum_select_reward += parseFloat(rs);
          }
        }
      }
      this.total.sum_select_reward = selected_sum;
      // console.log('cal All ==> ' , selected_sum )
    },
    calulateFooter() {
      let sum_h_m1 = 0;
      let sum_h_m2 = 0;
      let sum_h_m3 = 0;
      let sum_h_mtg = 0;

      let sum_reward = 0;
      let total_reward = 0;
      let sum_m_1 = 0;
      let sum_m_2 = 0;
      let sum_m_3 = 0;
      let sum_mtg = 0;
      let sum_m_4 = 0;
      let sum_m_5 = 0;
      let sum_m_6 = 0;
      for (let index = 0; index < this.tbListItems.length; index++) {
        const element = this.tbListItems[index];

        sum_reward += element.items.reduce((accumulator, object) => {
          let parts = object.reward.toString().split(".");
          let num = parts[0].replace(/,/g, "");
          let rs = num;
          if (object.dis_p) {
            return accumulator + parseFloat(rs);
          } else {
            return accumulator + parseFloat(0);
          }
        }, 0);

        total_reward += element.items.reduce((accumulator, object) => {
          let parts = object.reward.toString().split(".");
          let num = parts[0].replace(/,/g, "");
          let rs = num;
          return accumulator + parseFloat(rs);
        }, 0);

        for (let index = 0; index < element.items.length; index++) {
          const subItems = element.items[index];
          sum_h_m1 += subItems.m_1;
          sum_h_m2 += subItems.m_2;
          sum_h_m3 += subItems.m_3;
          sum_h_mtg += subItems.mtg;
          // sum_h_m1 += subItems.m_1
        }
        element.m_1 = sum_h_m1;
        element.m_2 = sum_h_m2;
        element.m_3 = sum_h_m3;
        element.mtg = sum_h_mtg;

        sum_h_m1 = 0;
        sum_h_m2 = 0;
        sum_h_m3 = 0;
        sum_h_mtg = 0;
        sum_m_1 += element.items.reduce((accumulator, object) => {
          if (object.dis_p) {
            return accumulator + parseFloat(object.m_1);
          } else {
            return accumulator + parseFloat(0);
          }
        }, 0);
        sum_m_2 += element.items.reduce((accumulator, object) => {
          if (object.dis_p) {
            return accumulator + parseFloat(object.m_2);
          } else {
            return accumulator + parseFloat(0);
          }
        }, 0);

        sum_m_3 += element.items.reduce((accumulator, object) => {
          if (object.dis_p) {
            return accumulator + parseFloat(object.m_3);
          } else {
            return accumulator + parseFloat(0);
          }
        }, 0);

        sum_mtg += element.items.reduce((accumulator, object) => {
          if (object.dis_p) {
            return accumulator + parseFloat(object.mtg);
          } else {
            return accumulator + parseFloat(0);
          }
        }, 0);

        sum_m_4 += element.items.reduce((accumulator, object) => {
          if (object.dis_p) {
            return accumulator + parseFloat(object.m_4);
          } else {
            return accumulator + parseFloat(0);
          }
        }, 0);

        sum_m_5 += element.items.reduce((accumulator, object) => {
          if (object.dis_p) {
            return accumulator + parseFloat(object.m_5);
          } else {
            return accumulator + parseFloat(0);
          }
        }, 0);

        sum_m_6 += element.items.reduce((accumulator, object) => {
          if (object.dis_p) {
            return accumulator + parseFloat(object.m_6);
          } else {
            return accumulator + parseFloat(0);
          }
        }, 0);
      }
      this.sumMaxRewards = this.title.max_reward;

      this.total.reward = sum_reward;
      this.rewardTotal = total_reward;

      this.total.m_1 = sum_m_1;
      this.total.m_2 = sum_m_2;
      this.total.m_3 = sum_m_3;
      this.total.mtg = sum_mtg;
      this.total.m_4 = sum_m_4;
      this.total.m_5 = sum_m_5;
      this.total.m_6 = sum_m_6;
    },
    calulateFooter_() {
      this.sumRewards = 0;
      this.sumNewItem = 0;
      this.sumHighGrowth = 0;
      this.sumRisingStar = 0;
      this.sumCashCow = 0;
      this.sumDog = 0;
      this.sumTotal = 0;
      this.sumMaxRewards = this.title.max_reward;
      let parts, rs;
      for (let i = 0; i < this.tbListItems.length; i++) {
        parts = this.tbListItems[i].reward.toString();
        rs = parts.replace(/,/g, "");
        this.sumRewards +=
          this.tbListItems[i].reward && this.tbListItems[i].reward !== ""
            ? parseFloat(rs)
            : 0;
        // this.sumRewards +=
        //   this.tbListItems[i].reward && this.tbListItems[i].reward !== ""
        //     ? parseFloat(this.tbListItems[i].reward)
        //     : 0;
        this.sumNewItem +=
          this.tbListItems[i].new_item && this.tbListItems[i].new_item !== ""
            ? parseFloat(this.tbListItems[i].new_item)
            : 0;
        this.sumHighGrowth +=
          this.tbListItems[i].high_growth &&
            this.tbListItems[i].high_growth !== ""
            ? parseFloat(this.tbListItems[i].high_growth)
            : 0;
        this.sumRisingStar +=
          this.tbListItems[i].rising_star &&
            this.tbListItems[i].rising_star !== ""
            ? parseFloat(this.tbListItems[i].rising_star)
            : 0;
        this.sumCashCow +=
          this.tbListItems[i].cash_cow && this.tbListItems[i].cash_cow !== ""
            ? parseFloat(this.tbListItems[i].cash_cow)
            : 0;
        this.sumDog +=
          this.tbListItems[i].dog && this.tbListItems[i].dog !== ""
            ? parseFloat(this.tbListItems[i].dog)
            : 0;
        this.sumTotal +=
          this.tbListItems[i].total && this.tbListItems[i].total !== ""
            ? parseFloat(this.tbListItems[i].total)
            : 0;
      }
      this.sumMaxRewards -= this.sumRewards;
    },
    formatStringToFloat(index, dicimal) {
      for (let index = 0; index < this.tbListItems.length; index++) {
        const element = this.tbListItems[index].items;
        for (let index = 0; index < element.length; index++) {
          const items = element[index];

          for (let index = 0; index < items.sub_item.length; index++) {
            const sub_items = items.sub_item[index];
            // console.log(sub_items.reward)
            let parts = sub_items.reward.toString().split(".");
            let num = parts[0].replace(/,/g, "");
            let rs = num;
            if (!_.isNaN(parseFloat(rs))) {
              sub_items.reward = this.formatNumber(rs, 0);
            }
          }
          let parts = items.reward.toString().split(".");
          let num = parts[0].replace(/,/g, "");
          let rs = num;

          if (!_.isNaN(parseFloat(rs))) {
            items.reward = this.formatNumber(rs, 0);
          }
          // console.log(items)
        }
      }
      // this.calulateAll();
      // this.calulateFooter();
      // this.calulateReward();
    },
    formatStringToFloat_sub(index, dicimal) {
      console.log("bbb", dicimal);
      for (let index = 0; index < this.tbListItems.length; index++) {
        const element = this.tbListItems[index].items;
        for (let index = 0; index < element.length; index++) {
          const items = element[index];
          let parts = items.reward.toString().split(".");
          let num = parts[0].replace(/,/g, "");
          let rs = num;

          if (!_.isNaN(parseFloat(rs))) {
            items.reward = this.formatNumber(rs, 0);
          }

          // console.log(items)
        }
      }
      this.calulateAll();
      this.calulateFooter();
      // this.calulateReward()
    },
    formatStringToFloatEdit(index, dicimal) {
      let parts = this.valueUpdateRewards.toString().split(".");
      let num = parts[0].replace(/,/g, "");
      let rs = num;
      if (!_.isNaN(parseFloat(rs))) {
        this.valueUpdateRewards = parseFloat(rs);
      }
    },
    updateRewards() {
      this.valueUpdateRewards = this.formatNumber(this.valueUpdateRewards, 0);
      // console.log(this.valueUpdateRewards)
    },
    show_tab(param) {
      // console.log(param)
      let check = 0;
      for (let index = 0; index < param.length; index++) {
        const element = param[index];
        if (element.dis_p == true) {
          check += 1;
        }
      }
      if (check == 0) {
        return false;
      } else {
        return true;
      }
      // console.log(check)
    },
    calulateReward(dataSaveOnSearch) {
      // this.loadingPage = true;
      let obj = {
        year: this.title.year,
        cycle: this.title.cycle,
        tactics_id: this.title.tactics_id,
        condition_code: this.title.condition_code,
        data_table: (dataSaveOnSearch !== undefined) ? dataSaveOnSearch : this.tbListItems,
        // data_table: this.tbListItems,
      };
      // console.log("this.tbListItems ==>", this.tbListItems)
      // console.log("this.dataSearchProduct ==>", this.dataSearchProduct);

      // this.calulateHeadTableDetail();
      this.calulateAll();
      this.calulateFooter();

      // console.log("obj ==>", obj);
      // return;
      let self = this;
      incentiveService
        .saveDataDialogStepTwo_NEW(obj)
        .then((response) => {
          this.reward_selection = response.reward_selection;
          this.reward_selection.sort((a, b) =>
            Number(a) > Number(b) ? 1 : -1
          );

          // if (dataSaveOnSearch !== undefined) {
          self.tbListItems = response.data_table;
          // console.log("self.tbListItems ==>", self.tbListItems);
          // }

          var key = self.step2['detail'].findIndex(function (item) {
            return item.conditions_select == self.title.condition_code;
          });
          self.step2['detail'][key]['item_cg'] = response.data.item_cg
          // console.log("self.step2 ==>", self.step2);
          this.$store.commit("incentive/setDataStep2", self.step2);

          this.loadingPage = false;
        })
        .catch();
    },
    // calulateHeadTableDetail() {
    //   let selected_sum = 0;
    //   this.tbListItems.forEach((items, key) => {
    //     for (let index = 0; index < items['items'].length; index++) {
    //       // items['items'][index]
    //       let a = items['items'][index];
    //       let parts = a.reward.toString().split(".");
    //       let num = parts[0].replace(/,/g, "");
    //       let rs = num;
    //       selected_sum += parseFloat(rs);
    //     }
    //     this.tbListItems[key]['sum_select_reward'] = selected_sum;
    //     selected_sum = 0;
    //   });
    //   console.log("this.tbListItems ==>", this.tbListItems);
    // },
    clearDataSumHeadTable() {
      this.sumHeadTable = {
        product: {
          m_1: 0,
          m_2: 0,
          m_3: 0,
          mtg: 0,
          m_4: 0,
          m_5: 0,
          m_6: 0,
        },
        cg: {
          m_1: 0,
          m_2: 0,
          m_3: 0,
          mtg: 0,
          m_4: 0,
          m_5: 0,
          m_6: 0,
        },
        sub: {
          m_1: 0,
          m_2: 0,
          m_3: 0,
          mtg: 0,
          m_4: 0,
          m_5: 0,
          m_6: 0,
        },
        group: {
          m_1: 0,
          m_2: 0,
          m_3: 0,
          mtg: 0,
          m_4: 0,
          m_5: 0,
          m_6: 0,
        },
        type: {
          m_1: 0,
          m_2: 0,
          m_3: 0,
          mtg: 0,
          m_4: 0,
          m_5: 0,
          m_6: 0,
        },
      };
    },
    searchProductItem(txtSearch, type) {
      // console.log("type ==>", type);
      if (type == "key") {
        //NEW OPL
        if (txtSearch == "") {
          // if txtSearch have data not clear
          this.checkedProductFilter_current = [];
        }

        // console.log(this.title.condition_code)
        // console.log(this.title.group_code)

        this.dataSearchProduct = [];
        this.showDisplaySearch = true;
        this.checkShowDialogSearch = true;
        this.loadingSearch = true;

        for (let index = 0; index < this.tbListItems.length; index++) {
          const element = this.tbListItems[index];
          if (element.group_code == "product") {
            for (let index = 0; index < element.items.length; index++) {
              const sub_items = element.items[index];
              this.check_selection.product.push(sub_items.product_code);
            }
          }

          if (element.group_code == "cg") {
            for (let index = 0; index < element.items.length; index++) {
              const sub_items = element.items[index];
              this.check_selection.cg.push(sub_items.product_code);
            }
          }
          if (element.group_code == "sub") {
            for (let index = 0; index < element.items.length; index++) {
              const sub_items = element.items[index];
              this.check_selection.sub_grpup.push(sub_items.product_code);
            }
          }
          if (element.group_code == "group") {
            for (let index = 0; index < element.items.length; index++) {
              const sub_items = element.items[index];
              this.check_selection.group.push(sub_items.product_code);
            }
          }
          if (element.group_code == "type") {
            for (let index = 0; index < element.items.length; index++) {
              const sub_items = element.items[index];
              this.check_selection.type.push(sub_items.product_code);
            }
          }
        }

        // console.log(this.check_selection);
        let condition5 = {
          condition_code: this.title.condition_code,
          group_code: this.title.group_code,
          product: String(JSON.stringify(this.check_selection.product)),
          cg: JSON.stringify(this.check_selection.cg),
          sub_grpup: JSON.stringify(this.check_selection.sub_grpup),
          group: JSON.stringify(this.check_selection.group),
          type: JSON.stringify(this.check_selection.type),
        };

        this.clearVarPopupSearch();
        this.$refs["dialog-search-items-add"].open();

        //-- START : Push Data Selected from table detail --//
        let self = this;
        self.checkDataDisabled = {
          product: [],
          cg: [],
          sub: [],
          group: [],
          type: [],
        };
        self.tbListItems.forEach(function (valueDetail, keyDetail) {
          if (!self.checkDataDisabled[valueDetail.group_code]) {
            self.checkDataDisabled[valueDetail.group_code] = [];
          }
          for (let k = 0; k < valueDetail.items.length; k++) {
            if (self.checkDataDisabled[valueDetail.group_code].indexOf(valueDetail.items[k]) == -1) {
              self.checkDataDisabled[valueDetail.group_code].push(valueDetail.items[k]['product_code']);
            }
          }
        });
        // console.log("self.checkDataDisabled ==>", self.checkDataDisabled);
        //-- END : Push Data Selected from table detail --//

        incentiveService
          .getDataSearchProductPost(txtSearch, type, condition5)
          .then((response) => {
            // console.log("response ==>", response);
            // localStorage.setItem(
            //    "reload_search_step2",
            //    JSON.stringify(response)
            // );
            this.dataSearchProduct = response;

            this.checkedProductSearchAll = [];
            this.sumSupply = 0;
            this.clearDataSumHeadTable();

            for (let i = 0; i < response.length; i++) {
              if (this.tbListItems.length === 0) {
                this.checkedProductSearch[response[i].code] = [];
              } else {
                for (let j = 0; j < response[i].items.length; j++) {
                  let key = this.tbListItems.findIndex((item) => {
                    return response[i].items[j] === item.code;
                  });

                  if (key > -1) {
                    this.checkedProductSearch[response[i].code].push(
                      response[i].items[j].code
                    );
                  }

                  //-- START : Check Disable Data --//
                  if (self.checkDataDisabled[response[i].group_code].indexOf(self.dataSearchProduct[i].items[j]['product_code']) == -1) {
                    if (self.dataSearchProduct[i].items[j]['disabled'] === undefined) {
                      Vue.set(
                        self.dataSearchProduct[i].items[j],
                        "disabled",
                        false
                      );
                    }
                  } else {
                    Vue.set(
                      self.dataSearchProduct[i].items[j],
                      "disabled",
                      true
                    );
                    // console.log("self.dataSearchProduct[i] ==>", self.dataSearchProduct[i]);
                    self.checkChildLevel(i, self.dataSearchProduct[i].items[j], 'disabled');
                  }
                  //-- END : Check Disable Data --//
                }

                let checkItemsAll = response[i].items.length;
                if (
                  this.checkedProductSearch[response[i].code] !== undefined &&
                  this.checkedProductSearch[response[i].code].length ===
                  checkItemsAll
                ) {
                  this.checkedProductSearchAll.push(response[i].code);
                }
              }

              /*-- START SUM HEAD TABLE --*/
              this.sumSupply += parseFloat(Math.round(response[i]["supply"]));
              response[i]["items"].forEach((dataItems, indexItems) => {
                this.sumHeadTable[response[i]["group_code"]]["m_1"] +=
                  Math.floor(parseFloat(dataItems.m_1));
                this.sumHeadTable[response[i]["group_code"]]["m_2"] +=
                  Math.floor(parseFloat(dataItems.m_2));
                this.sumHeadTable[response[i]["group_code"]]["m_3"] +=
                  Math.floor(parseFloat(dataItems.m_3));
                this.sumHeadTable[response[i]["group_code"]]["m_4"] +=
                  parseFloat(parseFloat(dataItems.m_4).toFixed(2));
                this.sumHeadTable[response[i]["group_code"]]["m_5"] +=
                  parseFloat(parseFloat(dataItems.m_5).toFixed(2));
                this.sumHeadTable[response[i]["group_code"]]["m_6"] +=
                  parseFloat(parseFloat(dataItems.m_6).toFixed(2));
                this.sumHeadTable[response[i]["group_code"]]["mtg"] +=
                  Math.floor(parseFloat(dataItems.mtg));
              });
              /*-- END SUM HEAD TABLE --*/
            }
            // console.log("this.sumHeadTable ==>", this.sumHeadTable);
            // console.log("this.dataSearchProduct ==>", this.dataSearchProduct);
            this.loadingSearch = false;
          });
      } else if (type == "copy") {
        // if(txtSearch == ""){ // if txtSearch have data not clear
        //   this.checkedProductFilter_current = [];
        // }
        let txtSearch_arr = txtSearch.split(" ");
        let res_code = [];
        incentiveService.getSearchProducts(txtSearch, type).then((response) => {
          for (let i = 0; i < response.length; i++) {
            res_code.push(response[i].code);
            var rs = _.find(this.tbListItems, function (o) {
              return o.code == response[i].code;
            });
            if (_.isUndefined(rs)) {
              this.tbListItems.push(response[i]);
            }

            let checkDat = this.checkedProductFilter_current.findIndex(
              (item) => {
                return response[i].code === item;
              }
            );
            if (checkDat === -1) {
              this.checkedProductFilter_current.push(response[i].code);
            }

            if (
              this.checkedProductSearchAll.indexOf(response[i].group_code) == -1
            ) {
              this.checkedProductSearchAll.push(response[i].group_code);
            }

            if (
              this.checkedProductSearch[response[i].group_code] === undefined
            ) {
              this.checkedProductSearch[response[i].group_code] = [];
            }
            this.checkedProductSearch[response[i].group_code].push(
              response[i].code
            );

            response[i].reward = this.formatNumber(response[i].reward, 0);
          }

          this.loadingPage = false;

          this.calulateFooter();
          // this.calulateReward()
          if (
            this.title.condition_code === 2 ||
            (this.title.condition_code === "2" &&
              this.searchTxtProductCopy != "" &&
              this.checkedProductFilter_current.length > 0)
          ) {
            this.$refs["dialog-update-rewards"].open();
            this.valueUpdateRewards = "";
          }

          if (res_code.length != txtSearch_arr.length) {
            var str_code = "";

            for (var i = 0; i < txtSearch_arr.length; i++) {
              let check = res_code.includes(txtSearch_arr[i]);
              if (!check) {
                if (str_code == "") {
                  str_code = txtSearch_arr[i];
                } else {
                  str_code = str_code + " " + txtSearch_arr[i];
                }
              }
            }
            this.snkValue = str_code;
            this.$refs.snackbar_input.open();
          }
        });
      }
    },
    selectAllProductSearch(productCode) {
      let key = "";
      for (let itemCode in this.dataSearchProduct) {
        key = this.dataSearchProduct.findIndex((item) => {
          return productCode === item.code;
        });
      }

      if (this.checkedProductSearchAll.indexOf(productCode) == -1) {
        //-- กรณีเลือก checkbox --//
        this.checkedProductSearchAll.push(productCode);

        let pushChild = [];
        for (let i = 0; i < this.dataSearchProduct[key].items.length; i++) {
          pushChild.push(this.dataSearchProduct[key].items[i].code);
          /* START PUSH DATA IN TABLE */
          let checkDataTable = this.tbListItems.findIndex((item) => {
            return this.dataSearchProduct[key].items[i].code === item.code;
          });
          if (checkDataTable === -1) {
            this.tbListItems.push(this.dataSearchProduct[key].items[i]);
          }

          //NEW OPL
          let checkDat = this.checkedProductFilter_current.findIndex((item) => {
            return this.dataSearchProduct[key].items[i].code === item;
          });
          if (checkDat === -1) {
            this.checkedProductFilter_current.push(
              this.dataSearchProduct[key].items[i].code
            );
          }
          /* END PUSH DATA IN TABLE */
        }
        this.checkedProductSearch[this.dataSearchProduct[key].code] = pushChild;
      } else {
        //-- กรณีเอา checkbox ออก --//
        this.checkedProductSearchAll.splice(
          this.checkedProductSearchAll.indexOf(productCode),
          1
        );
        delete this.checkedProductSearch[productCode];

        /* START DELETE DATA IN TABLE */
        for (let i = 0; i < this.dataSearchProduct[key].items.length; i++) {
          let indexDelete = this.tbListItems.findIndex((item) => {
            return this.dataSearchProduct[key].items[i].code === item.code;
          });

          this.tbListItems.splice(indexDelete, 1);
        }
        /* END DELETE DATA IN TABLE */
      }
      this.calulateFooter();
      // this.calulateReward()
    },
    selectProductSearch(head, detail) {
      // console.log("Search Search");
      // console.log(head);
      // console.log(detail);

      let keyIndex = this.dataSearchProduct.findIndex((item) => {
        return item.group_code === head.group_code;
      });
      this.checkChildLevel(keyIndex, detail);
    },
    checkChildLevel(keyIndex, detail, typeDisable) {
      let self = this;
      let checked_group_code = self.dataSearchProduct[keyIndex].group_code;

      // console.log("checked_group_code ==>", checked_group_code);
      // console.log("detail ==>", detail.product_code);
      self.dataSearchProduct.forEach(function (value, key) {
        if (key > keyIndex) {
          value.items.forEach(function (item, index) {
            // console.log("item ==>", item.type_code);
            // if (self.dataSearchProduct[key].items[index]['disabled'] === false) {
            if (
              checked_group_code == "type" &&
              item.type_code == detail.product_code
            ) {
              let check =
                detail.isChecked !== undefined && detail.isChecked === true
                  ? false
                  : true;

              if (typeDisable === 'disabled' && detail.disabled === true) {
                Vue.set(
                  self.dataSearchProduct[key].items[index],
                  "disabled",
                  true
                );
              } else if (self.dataSearchProduct[key].items[index]['disabled'] !== true) {
                Vue.set(
                  self.dataSearchProduct[key].items[index],
                  "isChecked",
                  check
                );

                self.setSelecteItems(
                  detail,
                  checked_group_code,
                  check,
                  value,
                  item
                );
              }
            } else if (
              checked_group_code == "group" &&
              item.group_code == detail.product_code
            ) {
              let check =
                detail.isChecked !== undefined && detail.isChecked === true
                  ? false
                  : true;

              if (typeDisable === 'disabled' && detail.disabled === true) {
                Vue.set(
                  self.dataSearchProduct[key].items[index],
                  "disabled",
                  true
                );
              } else if (self.dataSearchProduct[key].items[index]['disabled'] !== true) {
                Vue.set(
                  self.dataSearchProduct[key].items[index],
                  "isChecked",
                  check
                );

                self.setSelecteItems(
                  detail,
                  checked_group_code,
                  check,
                  value,
                  item
                );
              }
            } else if (
              checked_group_code == "sub" &&
              item.sub_code == detail.product_code
            ) {
              let check =
                detail.isChecked !== undefined && detail.isChecked === true
                  ? false
                  : true;

              if (typeDisable === 'disabled' && detail.disabled === true) {
                Vue.set(
                  self.dataSearchProduct[key].items[index],
                  "disabled",
                  true
                );
              } else if (self.dataSearchProduct[key].items[index]['disabled'] !== true) {
                Vue.set(
                  self.dataSearchProduct[key].items[index],
                  "isChecked",
                  check
                );

                self.setSelecteItems(
                  detail,
                  checked_group_code,
                  check,
                  value,
                  item
                );
              }
            } else if (
              checked_group_code == "cg" &&
              item.cg_code == detail.product_code
            ) {
              let check =
                detail.isChecked !== undefined && detail.isChecked === true
                  ? false
                  : true;

              if (typeDisable === 'disabled' && detail.disabled === true) {
                Vue.set(
                  self.dataSearchProduct[key].items[index],
                  "disabled",
                  true
                );
              } else if (self.dataSearchProduct[key].items[index]['disabled'] !== true) {
                Vue.set(
                  self.dataSearchProduct[key].items[index],
                  "isChecked",
                  check
                );

                self.setSelecteItems(
                  detail,
                  checked_group_code,
                  check,
                  value,
                  item
                );
              }

            }
            // }
          });
        }
      });

      // console.log("this.dataSearchProduct ==>", this.dataSearchProduct);
      // console.log("this.selecteItems ==>", this.selecteItems);
    },
    setSelecteItems(detail, checked_group_code, check, value, item) {
      //-- เช็คตัวมันเอง --//
      // console.log("check ==>", check);
      // console.log("this.selecteItems ==>", this.selecteItems);
      // console.log("checked_group_code ==>", checked_group_code);
      // console.log("detail.product_code ==>", detail.product_code);
      if (
        check === true &&
        this.selecteItems[checked_group_code].indexOf(detail.product_code) == -1
      ) {
        this.selecteItems[checked_group_code].push(detail.product_code);
      } else if (check === false) {
        let index = this.selecteItems[checked_group_code].indexOf(
          detail.product_code
        );
        if (index > -1) {
          this.selecteItems[checked_group_code].splice(index, 1);
        }
      }

      //-- เช็คลูก ไม่สนแม่ --//
      if (
        check === true &&
        this.selecteItems[value.group_code].indexOf(item.product_code) == -1
      ) {
        this.selecteItems[value.group_code].push(item.product_code);
        // console.log("detail ลูก ==>", detail);
      } else if (check === false) {
        let index = this.selecteItems[value.group_code].indexOf(
          item.product_code
        );
        if (index > -1) {
          this.selecteItems[value.group_code].splice(index, 1);
        }
      }
    },
    clearVarPopupSearch() {
      this.isCollapsed = {
        product: false,
        cg: false,
        sub: false,
        group: false,
        type: true,
      };

      this.selecteItems = {
        product: [],
        cg: [],
        sub: [],
        group: [],
        type: [],
      };
    },
    selectProductSearch_(param1, param2) {
      let key = this.dataSearchProduct.findIndex((item) => {
        return productCode === item.code;
      });

      if (
        this.checkedProductSearch[productCode] === undefined ||
        this.checkedProductSearch[productCode].indexOf(itemCode) == -1
      ) {
        //-- กรณีเลือก checkbox --//
        if (this.checkedProductSearch[productCode] === undefined) {
          /* check ลูกตัวแรก ให้แอดแม่เข้า array ด้วย */
          let pushChild = [];
          pushChild.push(itemCode);
          this.checkedProductSearch[this.dataSearchProduct[key].code] =
            pushChild;

          this.checkedProductFilter_current.push(itemCode);
        } else {
          this.checkedProductSearch[productCode].push(itemCode);
          //NEW OPL
          this.checkedProductFilter_current.push(itemCode);
        }

        /* START PUSH DATA IN TABLE */
        let index = this.tbListItems.findIndex((item) => {
          return itemCode === item.code;
        });
        if (index === -1) {
          //NOT HAVE
          let indexItem = this.dataSearchProduct[key].items.findIndex(
            (item) => {
              return itemCode === item.code;
            }
          );
          this.tbListItems.push(this.dataSearchProduct[key].items[indexItem]);
        }
        /* END PUSH DATA IN TABLE */
      } else {
        //-- กรณีเอา checkbox ออก --//
        this.checkedProductSearch[productCode].splice(
          this.checkedProductSearch[productCode].indexOf(itemCode),
          1
        );

        /* START DELETE DATA IN TABLE */
        for (let i = 0; i < this.dataSearchProduct[key].items.length; i++) {
          if (this.dataSearchProduct[key].items[i].code === itemCode) {
            let indexDelete = this.tbListItems.findIndex((item) => {
              return this.dataSearchProduct[key].items[i].code === item.code;
            });
            this.tbListItems.splice(indexDelete, 1);
          }
        }
        /* END DELETE DATA IN TABLE */
      }

      //-- Auto CheckBox Mom --//
      if (
        this.checkedProductSearch[productCode].length ===
        this.dataSearchProduct[key].items.length
      ) {
        //-- Check ลูกทีละตัวจนครบ ให้ checkbox แม่ auto --//
        this.checkedProductSearchAll.push(productCode);
      } else {
        //-- Check เอาลูกออก 1 ตัว ให้เอา checkbox แม่ออก auto --//
        if (this.checkedProductSearchAll.indexOf(productCode) > -1) {
          this.checkedProductSearchAll.splice(
            this.checkedProductSearchAll.indexOf(productCode),
            1
          );
        }
      }
      this.calulateFooter();
      // this.calulateReward()
    },
    closeDivSearch() {
      if (
        this.title.condition_code === 2 ||
        (this.title.condition_code === "2" &&
          this.showDisplaySearch &&
          this.checkedProductFilter_current.length > 0)
      ) {
        this.$refs["dialog-update-rewards"].open();
        this.valueUpdateRewards = "";
      }
      this.showDisplaySearch = false;
      this.dataSearchProduct = {};
      this.$refs["dialog-search-items-add"].close();
      this.searchTxtProduct = "";
    },
    clearSearchTxtProductCopy() {
      this.searchTxtProductCopy = "";
      this.checkedProductFilter_current = [];
    },
    openDialogUpdateRewards() {
      if (this.checkedProductFilter_current.length > 0) {
        this.valueUpdateRewards = "";
        this.$refs["dialog-update-rewards"].open();
      } else {
        this.textSnackbar = "Please select the product you want to update.";
        this.$refs.snackbar.open();
      }
    },
    updateRewardsMany() {
      if (this.checkShowDialogSearch) {
        this.pushDataIntoTable();
        this.checkShowDialogSearch = false;
      } else {
        for (let i = 0; i < this.checkedProductFilter_current.length; i++) {
          for (let index = 0; index < this.tbListItems.length; index++) {
            const element = this.tbListItems[index].items;
            let key = element.findIndex((item) => {
              return (
                this.checkedProductFilter_current[i] ===
                item.product_code + "" + this.tbListItems[index].group_code
              );
            });
            if (key != -1) {
              let parts = this.valueUpdateRewards.toString().split(".");
              let num = parts[0].replace(/,/g, "");
              let rs = num;

              element[key].reward = parseFloat(rs);
            }
          }
        }
        this.calulateAll();
        this.calulateFooter();
        // this.calulateReward()
        this.valueUpdateRewards = "";
      }
      this.$refs["dialog-update-rewards"].close();
    },
    updateRewardsMany_() {
      for (let i = 0; i < this.checkedProductFilter_current.length; i++) {
        let key = this.tbListItems.findIndex((item) => {
          return this.checkedProductFilter_current[i] === item.code;
        });

        this.tbListItems[key].reward = this.valueUpdateRewards;
      }

      var mystring = this.valueUpdateRewards;
      let sum_select_reward =
        this.checkedProductFilter_current.length *
        parseFloat(mystring.replace(/,/g, ""));
      this.sumSelectData = sum_select_reward;

      this.calulateFooter();
      // this.calulateReward()
      this.$refs["dialog-update-rewards"].close();
    },
    deleteItems() {
      // console.log("DEL", this.checkedProductFilter_current);
      if (this.checkedProductFilter_current.length > 0) {
        this.$refs.snackbar.close()
        this.btnright = "REMOVE";
        this.checkClickButton = "delete";
        this.dialogConfirmContent = "Do you want to remove these items?";
        this.showDialogConfirm = true;
      } else {
        this.textSnackbar = "Please select the product you want to delete.";
        this.$refs.snackbar.open();
      }
    },
    saveDataDialog() {
      if (this.title.record.tac_type == 2) {
        this.checkClickButton = "save";

        this.btnright = "save";
        this.checkClickButton = "save";
        this.dialogConfirmContent = "Are you sure you want to save ?";
      } else {
        this.btnright = "save";
        this.checkClickButton = "save";
        this.dialogConfirmContent = "Are you sure you want to save ?";
      }
      this.showDialogConfirm = true;
    },
    reloadData() {
      this.btnright = "DONE";
      this.checkClickButton = "reload";
      this.dialogConfirmContent =
        "Do you want to clear the last reward configuration. Then apply the previous reward configuration.";
      this.showDialogConfirm = true;
    },

    loadDataList() {
      // console.log('Load Data --- ')
      this.loadingPage = true;
      this.checkedProductSearchAll = [];
      this.checkedProductSearch = [];
      this.checkedProductFilterAll = false;
      this.checkedProductFilter = [];
      this.sumSelectData = 0;
      this.checkedProductFilter_current = [];
      this.b_reward = this.reward_selection[0];

      let obj = {
        year: this.title.year,
        cycle: this.title.cycle,
        tactics_id: this.title.tactics_id,
        condition_code: this.title.condition_code,
      };

      incentiveService.getListDataTable(obj).then((response) => {
        this.default_data = _.cloneDeep(response);
        for (let index = 0; index < response.tbListItems.length; index++) {
          const element = response.tbListItems[index];
          for (let j = 0; j < element.items.length; j++) {
            const element2 = element.items[j];
            Object.assign(element2, { dis_p: true });
          }
        }

        localStorage.setItem(
          "reload_detail_step2",
          JSON.stringify(response.tbListItems)
        );

        this.tbListItems = response.tbListItems;
        this.Full_tbListItems = response.tbListItems;
        this.reward_selection = response.reward_selection;
        this.reward_selection.sort((a, b) => (Number(a) > Number(b) ? 1 : -1));
        this.loadingPage = false;
        this.select_reward(this.title.toReward);
        this.calulateFooter();
      });
      // console.log(this.tbListItems)
      this.calulateFooter();
      // this.calulateReward()
      this.loadingPage = false;
    },
    onCloseDialog() {
      if (this.checkShowDialogSearch) {
        this.$refs["dialog-update-rewards"].open();
        this.clearVarPopupSearch();
      }
      // this.pushDataIntoTable();
      this.$refs["dialog-search-items-add"].close();
      this.showDialogConfirm = false;
    },
    pushDataIntoTable() {
      // console.log("this.title ==>", this.title);
      // console.log("this.tbListItems ==>", this.tbListItems);
      // console.log("this.valueUpdateRewards ==>", this.valueUpdateRewards);
      // console.log("this.dataSearchProduct ==>", this.dataSearchProduct);

      let self = this;
      let dataPush = [];
      let dataItems = [];
      let checkGroupCode = [];
      let sum_m_1 = 0;
      let sum_m_2 = 0;
      let sum_m_3 = 0;
      let sum_mtg = 0;
      let tmpGroupCode = "";
      //-- STAR : เลือกเอา data เฉพาะที่ทำการถูกเลือก checkbox --//
      self.dataSearchProduct.forEach((dataType, indexType) => {
        for (let i = 0; i < dataType.items.length; i++) {
          if (
            dataType.items[i]["isChecked"] !== undefined &&
            dataType.items[i]["isChecked"] === true
          ) {
            // if (dataType["group_code"] != tmpGroupCode) {
            //   dataItems = [];
            //   sum_m_1 = 0;
            //   sum_m_2 = 0;
            //   sum_m_3 = 0;
            //   sum_mtg = 0;
            // }

            // dataPush[dataType["group_code"]].push(dataType.items[i]);
            dataType.items[i]['reward'] = this.valueUpdateRewards;
            dataType.items[i]['dis_p'] = true;
            dataItems.push(dataType.items[i]);
            sum_m_1 += Math.floor(parseFloat(dataType.items[i]['m_1']));
            sum_m_2 += Math.floor(parseFloat(dataType.items[i]['m_2']));
            sum_m_3 += Math.floor(parseFloat(dataType.items[i]['m_3']));
            sum_mtg += Math.floor(parseFloat(dataType.items[i]['mtg']));

            if (checkGroupCode.indexOf(dataType["group_code"]) == -1) {
              checkGroupCode.push(dataType["group_code"]);
            }
          }
          tmpGroupCode = dataType["group_code"];
        }

        let key = checkGroupCode.indexOf(dataType["group_code"]);
        if (key > -1) {
          dataPush.push({
            group_code: dataType["group_code"],
            group_data: dataType["group_data"],
            items: dataItems,
            m_1: sum_m_1,
            m_2: sum_m_2,
            m_3: sum_m_3,
            mtg: sum_mtg
          });
        }

        dataItems = [];
        sum_m_1 = 0;
        sum_m_2 = 0;
        sum_m_3 = 0;
        sum_mtg = 0;
      });
      // console.log("dataPush ==>", dataPush);
      // return;
      //-- END : เลือกเอา data เฉพาะที่ทำการถูกเลือก checkbox --//

      //-- START : รวม data จากการ search ใส่ใน dataTableNew --//
      var dataTableNew = [];
      dataPush.forEach(function (dataSearch) {
        var matchingItem = dataTableNew.find(function (item) {
          return item.group_code === dataSearch.group_code;
        });

        if (matchingItem) {
          matchingItem.items = matchingItem.items.concat(dataSearch.items);
          matchingItem.m_1 += parseFloat(dataSearch.m_1);
          matchingItem.m_2 += parseFloat(dataSearch.m_2);
          matchingItem.m_3 += parseFloat(dataSearch.m_3);
          matchingItem.mtg += parseFloat(dataSearch.mtg);
        } else {
          dataTableNew.push({
            group_code: dataSearch.group_code,
            group_data: dataSearch.group_data,
            items: dataSearch.items,
            m_1: dataSearch.m_1,
            m_2: dataSearch.m_2,
            m_3: dataSearch.m_3,
            m_4: 0,
            m_5: 0,
            m_6: 0,
            mtg: dataSearch.mtg,
            sp_ic_conditions_id: self.title.condition_code,
            sp_ic_tactics_id: self.title.tactics_id,
            paid: "",
            paid_list: self.title.tactics_title,
            expand: true
          });
        }
      });
      // console.log("dataTableNew ==>", dataTableNew);
      // return;
      //-- END : รวม data จากการ search ใส่ใน dataTableNew --//

      //-- START : รวม data จาก detail ใส่ใน dataTableNew --//
      self.tbListItems.forEach(function (dataDetail) {
        var matchingItem = dataTableNew.find(function (item) {
          return item.group_code === dataDetail.group_code;
        });

        if (matchingItem) {
          matchingItem.items = matchingItem.items.concat(dataDetail.items);
          matchingItem.m_1 += parseFloat(dataDetail.m_1);
          matchingItem.m_2 += parseFloat(dataDetail.m_2);
          matchingItem.m_3 += parseFloat(dataDetail.m_3);
          matchingItem.mtg += parseFloat(dataDetail.mtg);
        } else {
          dataTableNew.push({
            group_code: dataDetail.group_code,
            group_data: dataDetail.group_data,
            items: dataDetail.items,
            m_1: dataDetail.m_1,
            m_2: dataDetail.m_2,
            m_3: dataDetail.m_3,
            m_4: 0,
            m_5: 0,
            m_6: 0,
            mtg: dataDetail.mtg,
            sp_ic_conditions_id: self.title.condition_code,
            sp_ic_tactics_id: self.title.tactics_id,
            paid: "",
            paid_list: self.title.tactics_title,
            expand: true
          });
        }
      });
      // console.log("dataTableNew ==>", dataTableNew);
      // return;
      //-- END : รวม data จาก detail ใส่ใน dataTableNew --//

      //-- START : จัดเรียงข้อมูลใหม่ตาม type > group > sub > cg > product --//
      var dataSort = { "type": 1, "group": 2, "sub": 3, "cg": 4, "product": 5 };
      dataTableNew.sort(function (a, b) {
        var groupCodeA = a.group_code;
        var groupCodeB = b.group_code;
        return dataSort[groupCodeA] - dataSort[groupCodeB];
      });
      console.log("dataTableNew ==>", dataTableNew);
      // return;
      //-- END : จัดเรียงข้อมูลใหม่ตาม type > group > sub > cg > product --//
      this.valueUpdateRewards = "";
      // this.tbListItems = dataTableNew;
      // this.calulateReward(dataTableNew);
      this.calulateReward(dataTableNew);
    },
    onConfirmDialog() {
      this.showDialogConfirm = false;
      if (this.checkClickButton === "close") {
        this.$refs["dialog-step-two"].close();
        this.clearVariable();
        this.$emit("close");
      } else if (this.checkClickButton === "save") {
        this.loadingPage = true;

        let obj = {
          year: this.title.year,
          cycle: this.title.cycle,
          tactics_id: this.title.tactics_id,
          condition_code: this.title.condition_code,
          data_table: this.tbListItems,
        };
        incentiveService
          .saveDataDialogStepTwo(obj)
          .then((response) => {
            let data = _.cloneDeep(this.step2);
            var rsKey = _.findIndex(data.detail, function (o) {
              return o.tactics_id == response.tactics_id;
            });
            if (rsKey >= 0) {
              data.detail[rsKey].item_cg = response.item_cg;
              if (!_.isUndefined(data.detail[rsKey].tempCg)) {
                data.detail[rsKey].tempCg = [];
                data.detail[rsKey].tempCg.push({
                  key: obj.condition_code,
                  datas: response.item_cg,
                });
              }
              console.log(data);
              this.$store.commit("incentive/setDataStep2", data);
            }
            this.$refs["dialog-step-two"].close();
            this.clearVariable();
            this.loadingPage = false;
            this.$emit("close");
          })
          .catch();
      } else if (this.checkClickButton === "reload") {
        this.tbListItems = JSON.parse(
          localStorage.getItem("reload_detail_step2")
        );

        // this.is_active = "all";
        // this.b_reward = "all";
        this.select_reward('all');
        this.checkedProductFilter_current = [];
        this.calulateReward();

        // console.log(this.tbListItems);
        // this.tbListItems = this.default_data.tbListItems;
        // console.log("Reload => ", this.default_data.tbListItems.rewards);
        // this.loadDataList();
      } else if (this.checkClickButton === "delete") {
        // console.log(this.checkedProductFilter_current);
        for (
          let index = 0;
          index < this.checkedProductFilter_current.length;
          index++
        ) {
          const element = this.checkedProductFilter_current[index];
          for (let j = 0; j < this.tbListItems.length; j++) {
            const items_master = this.tbListItems[j].items;
            const items_master_head = this.tbListItems[j];
            let c = items_master.findIndex((item) => {
              return (
                element ===
                item.product_code + "" + items_master_head.group_code
              );
            });
            if (c != -1) {
              items_master.splice(c, 1);
            }
            this.tbListItems[j].check_box = false;
          }
        }
        // console.log("==>", this.tbListItems);
        // this.is_active = "all";
        // this.b_reward = "all";
        this.select_reward('all');
        this.checkedProductFilter_current = [];

        this.calulateAll();
        this.calulateFooter();
        this.calulateReward();
      }
    },
    clearVariable() {
      this.dataSearchProduct = {};
      this.searchTxtProduct = "";
      this.searchTxtProductCopy = "";
      this.type_search = false;
      this.showDisplaySearch = false;
      this.loadingSearch = false;
      this.tbListItems = [];
      this.checkedProductSearchAll = [];
      this.checkedProductFilter_current = [];
      this.checkedProductSearch = [];
      this.checkedProductFilterAll = false;
      this.checkedProductFilter = [];
      this.sortDESC = true;
      this.sumRewards = 0;
      this.sumNewItem = 0;
      this.sumHighGrowth = 0;
      this.sumRisingStar = 0;
      this.sumCashCow = 0;
      this.sumDog = 0;
      this.sumTotal = 0;
      this.sumSelectData = 0;
      this.valueUpdateRewards = "";
    },
    checkColor(value) {
      if (value >= 0) {
        return "#66BB6A";
      } else {
        return "#F44336";
      }
    },
    changeTypeSearch() {
      // console.log(this.type_search)
    },
  },
  computed: {
    step2() {
      return this.$store.getters["incentive/step2"];
    },
  },
};
</script>

<style lang="scss">
.incentive-dialog-step-two {
  #head-table-seach-popup-title {
    >div {
      color: #797979;
    }

    .underline-content::before {
      border-top: 1px solid #797979;
    }
  }

  #head-table-seach-popup {
    margin-bottom: 5px;

    .underline-content::before {
      border-top: 1px solid white;
    }
  }

  #head-table-seach-popup,
  #head-table-seach-popup-title {
    >div {
      padding-left: 0px !important;
      padding-right: 0px !important;
    }

    .head-style-box-search>div {
      text-align: right;
      font-weight: bold;
    }

    .margin-auto-right {
      margin: auto;
      text-align: right;
    }
  }

  .text-right {
    text-align: right;
  }

  .underline-content {
    position: relative;
    justify-self: end;
    padding-top: 1px;
  }

  .underline-content::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .md-card {
    overflow: hidden;
  }

  .md-dialog.md-reference {
    margin-left: 0% !important;
    height: 100%;
    max-height: 100%;
    width: 100%;
    max-width: 100%;
  }

  .md-dialog-title {
    margin-bottom: 0px !important;

    .md-chip {
      background-color: rgb(168, 168, 168);
      color: white;
      border-radius: 5px;
      height: 20px;
      width: 20px;
      padding: 2px 0px 0px;
      text-align: center;
      font-size: 14px;
    }

    .icon-save:hover {
      color: #ff9800;
    }
  }

  .md-dialog-content {
    padding-bottom: 0px;

    .font-kanit {
      font-family: Kanit !important;
    }

    .icon-delete:hover {
      color: #ff9800;
    }

    .search-product-treeview {
      .md-card-content {
        padding: 0px;
        height: calc(85vmin - 190px);
        display: block;
        overflow-y: scroll;

        .row-bg-gray:hover {
          background: #efefef;
        }

        &::-webkit-scrollbar {
          height: 7px;
          width: 6px;
          background: #efefef;
        }

        &::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.11);
          border-radius: 5px;
        }
      }
    }
  }

  .md-dialog-actions {
    background: rgb(239, 239, 239);
  }

  /* START CUSTOM CHECKBOX */
  .-salesops-checkbox-container {
    display: block;
    position: relative;
    // padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .-salesops-checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .-salesops-checkbox {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #fff;
    border: 2px solid #95989a;
    border-radius: 3px;
  }

  .-salesops-checkbox-container:hover input~.-salesops-checkbox {
    background-color: #ccc;
  }

  .-salesops-checkbox-container input:checked~.-salesops-checkbox {
    background-color: #ff9800;
    border-color: #ff9800;
  }

  .-salesops-checkbox:after {
    content: "";
    position: absolute;
    display: none;
  }

  .-salesops-checkbox-container input:checked~.-salesops-checkbox:after {
    display: block;
  }

  .-salesops-checkbox-container .-salesops-checkbox:after {
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .-salesops-checkbox-container.-disabled {
    cursor: unset !important;

    .-salesops-checkbox {
      background-color: #ccc;
      border: 2px solid #ccc;
    }
  }

  /* END CUSTOM CHECKBOX */

  #table-product-filter {
    margin-left: 0px;
    font-family: Lato;

    .row-bg-gray:hover {
      border-radius: 4px;
      background: rgba(236, 236, 235, 1);
    }

    #divHeadList {
      width: 99.4%;
      display: -webkit-inline-box;
      font-size: 12px;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 15px;
      color: #a8a8a8;

      div {
        // border: 1px solid pink;
        padding-left: 8px;
        padding-right: 5px;

        &.-text-right {
          text-align: right;
        }

        &.-text-center {
          text-align: center;
        }
      }
    }

    #divBodyList {
      width: 100%;
      // height: calc(100vmin - 355px);
      display: block;
      overflow-y: scroll;
      font-size: 12px;

      >div {
        width: 100%;
        height: 35px;
        display: -webkit-inline-box;
        padding-top: 5px;
        padding-bottom: 5px;

        div {
          // border: 1px solid pink;
          padding-left: 3px;
          padding-right: 0px;

          &.-text-right {
            text-align: right;
          }

          &.-text-center {
            text-align: center;
          }

          &.nowrap-title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          &.-font-kanit {
            font-size: 14px;
            font-family: kanit;
          }

          .md-input-container {
            margin: 0px;
            padding-top: 0px;
            height: 20px;
            min-height: 20px;

            input {
              height: 21px;
              min-height: 21px;
              font-size: 12px;
              padding-bottom: 2px;
            }
          }
        }
      }

      &::-webkit-scrollbar {
        height: 7px;
        width: 6px;
        // background: #f7f7f7;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.11);
        border-radius: 5px;
      }
    }

    .footer-table {
      // border: 1px solid pink;
      display: -webkit-inline-box;
      // margin-top: 8px;
      margin-top: 12px;
      margin-bottom: 5px;
      width: 99.4%;
      font-size: 12px;

      background-color: #efefef;
      padding: 0px 0px;

      div {
        padding-left: 2px;
        padding-right: 8px;

        // &.has-bg {
        //   background-color: #efefef;
        //   padding: 18px 8px;
        // }
      }
    }
  }
}

.incentive-search-items {
  .md-card {
    box-shadow: none;
  }

  .md-dialog-title {
    display: flex;
    background-color: #efefef;
    height: 53px;
    padding: 0;
    margin: 0;
  }

  .md-dialog.md-reference {
    margin-left: 0% !important;
    height: 85%;
    max-height: 85%;
    width: 95%;
    max-width: 95%;
  }

  .md-dialog-content {
    padding: 0;

    &::-webkit-scrollbar {
      height: 7px;
      width: 6px;
      // background: #f7f7f7;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.11);
      border-radius: 5px;
    }
  }

  .md-card .md-card-content {
    padding: 0;
  }

  .salesops-input {
    width: 100%;
    padding-left: 8px;
    padding-right: 13.8px;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;

    input {
      width: 100%;
      border: none;
    }

    input:focus {
      outline: none;
    }

    ::placeholder {
      color: #bdbdbd;
      opacity: 1;
      font-family: kanit;
      font-size: 12px;
      font-weight: 100;
    }
  }
}

.incentive-dialog-step-two,
.incentive-update-rewards {
  .salesops-input {
    width: 100%;
    padding-left: 8px;
    padding-right: 13.8px;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;

    input {
      width: 100%;
      border: none;
    }

    input:focus {
      outline: none;
    }

    ::placeholder {
      color: #bdbdbd;
      opacity: 1;
      font-family: kanit;
      font-size: 12px;
      font-weight: 100;
    }
  }
}

.incentive-update-rewards,
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

.incentive-step-two-snackbar {
  .md-button:last-child {
    color: red;
  }
}

@media screen and (min-width: 959px) {
  .content-respon {
    // margin: 15px 15px 0px;
    margin: 15px 0px 0px;

    .search-product-treeview {
      width: 45.7%;
    }

    #table-product-filter {
      #divBodyList {
        height: calc(100vmin - 300px);
      }
    }

    .respon-column-name-0 {
      width: 35%;
    }

    .respon-column-name-1 {
      width: 23%;
    }

    .footer-table {
      .respon-column-name-0 {
        width: 39%;
      }

      .respon-column-name-1 {
        width: 27%;
      }

      .padding-respon {
        padding-left: 45px !important;
      }
    }

    .respon-column-rewards {
      width: 12%;
    }

    .respon-column-highgrowth {
      width: 15%;
    }
  }
}

.head-tab {
  border: 1px solid #fff;
  border-width: 1px 0 0 0;
  cursor: pointer;
  color: #fff;
  opacity: 0.8;
  width: 100%;
  height: 36px;
  display: flex;
  background-color: #414141;
  font-family: Kanit;
  font-size: 16px;
}

.detail-table {
  padding: 0 0 13px 0;

  .nowrap-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.flex-center {
  display: flex;
  justify-content: center;
}

.head-style-box-search {
  font-size: 12px;
  font-family: Lato;
  opacity: 0.8;
  color: #fff;
  text-align: left;
  display: block;
  width: 9%;
  padding: 3px;
}

.head-style {
  padding: 0 0 0 2px;
  font-size: 12px;
  font-weight: bold;
  font-family: Lato;
  opacity: 0.8;
  color: #a8a8a8;
  text-align: center;
  display: block;
  width: 9%;
}

.txt-mng {
  color: #414141;
  font-weight: bold;
}

.subitem-table {
  width: 96%;
  box-shadow: 0px 0px 1px #fd7f00;
  border: 1px solid #fd7f00;
  border-radius: 5px;

  margin: 5px 0 5px 3%;
}

@media screen and (min-width: 1279px) {
  .content-respon {
    // margin: 15px 40px 0px;
    margin: 15px 0px 0px;

    .search-product-treeview {
      width: 46.5%;
    }

    #table-product-filter {
      #divBodyList {
        height: calc(100vmin - 310px);
      }
    }

    .respon-column-name-0 {
      width: 38%;
    }

    .respon-column-name-1 {
      width: 28%;
    }

    .footer-table {
      .respon-column-name-0 {
        width: 42%;
      }

      .respon-column-name-1 {
        width: 32%;
      }

      .padding-respon {
        padding-left: 53px !important;
      }
    }

    .respon-column-rewards {
      width: 10%;
    }

    .respon-column-highgrowth {
      width: 12%;
    }
  }
}

.scroll-left {
  &::-webkit-scrollbar {
    height: 7px;
    width: 6px;
    // background: #f7f7f7;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.11);
    border-radius: 5px;
  }
}

@media screen and (min-width: 1920px) {
  .content-respon {
    // margin: 15px 40px 0px;
    margin: 15px 0px 0px;

    .search-product-treeview {
      width: 47.7%;
    }

    #table-product-filter {
      #divBodyList {
        height: calc(100vmin - 355px);
      }
    }

    .respon-column-name-0 {
      width: 41%;
    }

    .respon-column-name-1 {
      width: 31%;
    }

    .footer-table {
      .respon-column-name-0 {
        width: 45%;
      }

      .respon-column-name-1 {
        width: 35%;
      }

      .padding-respon {
        padding-left: 70px !important;
      }
    }

    .respon-column-rewards {
      width: 10%;
    }

    .respon-column-highgrowth {
      width: 9%;
    }
  }
}
</style>
