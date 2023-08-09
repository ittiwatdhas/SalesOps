<template>
  <div>
    <md-input-container :class="'md-promotion-ipt'">
      <md-input
        :id="id"
        type="text"
        v-model.lazy="displayValue"
        class="text-right"
        maxlength="8"
        :disabled="readOnly"
        @blur="calculateOther"
        @keypress.native="isNumber"
        @focus="showIsInputActive()"
        @keyup.native.prevent="nextTab"
        @focus.native="cropText"
      ></md-input>
      <!-- :maxlength="maxInput" -->
      <!-- @focus.native="$event.target.select()" -->
      <!-- @keyup.enter.native.prevent="nextTab" -->
      <div class="md-error" v-if="table != 'ppuItem'">{{ errorMsg }}</div>
    </md-input-container>

    <md-dialog ref="md-confirm-input-dialog">
      <md-dialog-title style="font-family:kanit">{{ dgTitle }}</md-dialog-title>
      <md-dialog-content></md-dialog-content>
      <md-dialog-actions>
        <md-button @click="close" class="md-primary">OK</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import myOrderService from '@/services/orders/myorders'
import Vue from 'vue'
export default {
  created: function () {
    this.tmpData = this.value
  },
  computed: {
    displayValue: {
      get: function () {
        let str = ''
        if (this.table == 'ppuItem' || this.table == 'ppuVol') {
          str = '฿ '
        }
        if (this.isInputActive) {
          if (this.value == '') {
            return 0
          } else {
            return this.value
          }
        } else {
          if (this.table == 'ppuItem' || this.table == 'ppuVol') {
            return this.$store.getters['globalfunc/formatNumber'](this.value)
          } else {
            return this.fmNumberInt(this.value)
          }
        }
      },
      set: function (modifiedValue) {
        let theArray = this.theArray
        let value = this.checkIsNaN(modifiedValue) ? 0 : modifiedValue
        let newValue = 0
        newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''))
        if (this.checkIsNaN(newValue)) {
          newValue = 0
        } else {
          newValue = modifiedValue
        }
        if (theArray.length > 0 && this.table == 'qtyPromo') {
          let data = theArray[this.index]
          let checkBtnAdd = newValue != parseInt(data.order_qty) ? false : true
          this.$store.commit('myorders/SET_CHECKBTN_ADD', checkBtnAdd)
          this.$store.commit('myorders/SET_CHECKBTN_CAL', false)
        }
        let cTheArray = _.cloneDeep(theArray)
        var test = newValue.toString().indexOf('.')
        if (test == -1) {
          this.$emit('input', parseInt(newValue))
        } else {
          this.$emit('input', parseFloat(newValue))
        }
        if (theArray.length > 0) {
          let info = this.$store.getters['myorders/customer_info']
          let data = theArray[this.index]
          let ppu = parseFloat(data.ppu)

          if (this.table == 'ppuItem' && parseFloat(value) > ppu) {
            let dis = parseFloat(this.percentDiscount) / 100
            let vpthis = this
            this.$nextTick(() => {
              if (data.volDiscount == 'N' || _.isUndefined(data.volDiscount)) {
                data.price = data.ppu
              } else {
                data.price = data.ppu
              }
              let amount = parseFloat(data.price) * parseFloat(data.order_qty)
              let amount4 = _.round(amount, 4)
              let amount3 = _.round(amount4, 3)
              let amount2 = _.round(amount3, 2)
              data.amount = amount2

              let step1 = parseFloat(data.price) * dis
              let step2 = _.round(step1, 4)
              let step4 = step2 * parseInt(data.order_qty)
              let step5 = _.round(step4, 4)
              let step6 = _.round(step5, 2)
              data.net_amount = data.amount - step6

              let p_dis = parseFloat(data.price) * dis
              let p_dis4 = _.round(p_dis, 4)
              let p_dis2 = p_dis4 * parseInt(data.order_qty)
              let p_dis5 = _.round(p_dis2, 4)
              data.last_discount = _.round(p_dis5, 2)

              let rsNetPrice = parseFloat(ppu) * dis
              let npp = ppu - rsNetPrice
              let npp4 = _.round(npp, 4)
              let npp3 = _.round(npp4, 3)
              let npp2 = _.round(npp3, 2)

              data.net_price = npp2
              data.budget = 0

              if (data.price == data.ppu) {
                data.flag_status = 'A'
              } else if (data.volDiscount == 'N' && data.price == 0) {
                data.flag_status = 'F'
              } else if (data.volDiscount == 'Y' && data.price == 0) {
                data.flag_status = 'FV'
              } else if (
                data.volDiscount == 'Y' &&
                data.price == data.priceVD
              ) {
                data.flag_status = 'G'
              } else if (
                (data.volDiscount == 'N' &&
                  data.price != ppu &&
                  data.price > 0) ||
                (data.volDiscount == 'Y' &&
                  data.price > data.priceVD &&
                  data.price < ppu)
              ) {
                data.flag_status = 'CP'
              } else if (
                data.volDiscount == 'N' &&
                data.price > 0 &&
                data.price != ppu
              ) {
                data.flag_status = 'CV'
              }
              vpthis.$store.dispatch('myorders/sumTotalTable')
            })
            return
          } else if (this.table == 'ppuItem' && parseFloat(value) == ppu) {
            let dis = parseFloat(this.percentDiscount) / 100
            let value4 = _.round(value, 4)
            let value3 = _.round(value4, 3)
            let value2 = _.round(value3, 2)
            let amount = parseFloat(value2) * parseFloat(data.order_qty)
            let amount4 = _.round(amount, 4)
            let amount3 = _.round(amount4, 3)
            let amount2 = _.round(amount3, 2)

            data.amount = amount2
            let step1 = parseFloat(data.price) * dis
            let step2 = _.round(step1, 4)
            let step4 = step2 * parseInt(data.order_qty)
            let step5 = _.round(step4, 4)
            let step6 = _.round(step5, 2)
            data.net_amount = data.amount - step6

            let p_dis = parseFloat(data.price) * dis
            let p_dis4 = _.round(p_dis, 4)
            let p_dis2 = p_dis4 * parseInt(data.order_qty)
            let p_dis5 = _.round(p_dis2, 4)
            data.last_discount = _.round(p_dis5, 2)

            let rsNetPrice = parseFloat(ppu) * dis
            let npp = ppu - rsNetPrice
            let npp4 = _.round(npp, 4)
            let npp3 = _.round(npp4, 3)
            let npp2 = _.round(npp3, 2)
            data.net_price = npp2
            data.flag_status = 'A'
            data.budget = 0
          } else if (this.table == 'ppuItem' && parseFloat(value) < ppu) {
            let value4 = _.round(value, 4)
            let value3 = _.round(value4, 3)
            let value2 = _.round(value3, 2)
            let amount = parseFloat(value2) * parseFloat(data.order_qty)
            let amount4 = _.round(amount, 4)
            let amount3 = _.round(amount4, 3)
            let amount2 = _.round(amount3, 2)
            data.amount = amount2
            data.price = value2

            let tempPPU = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''))
            if (this.checkIsNaN(tempPPU)) {
              data.discount = 0
            } else {
              let rsPPU = ppu - tempPPU
              let rs = rsPPU / ppu
              data.discount = rs * 100
            }
            let valPPU = parseFloat(value)

            let budget = 0
            if (data.volDiscount == 'N' || _.isUndefined(data.volDiscount)) {
              if (
                parseFloat(data.ppu) > 0 &&
                parseFloat(data.ppu) > parseFloat(data.price)
              ) {
                budget =
                  (parseFloat(data.ppu) - parseFloat(data.price)) *
                  parseFloat(data.order_qty)
                let budget4 = _.round(budget, 4)
                let budget3 = _.round(budget4, 3)
                let rs = _.round(budget3, 2)
                data.budget = rs
              } else {
                data.budget = 0
              }
            } else if (data.volDiscount == 'Y') {
              if (
                parseFloat(data.priceVD) > parseFloat(data.price) &&
                parseFloat(data.ppu) > 0
              ) {
                budget =
                  (parseFloat(data.priceVD) - parseFloat(data.price)) *
                  parseFloat(data.order_qty)
                let budget4 = _.round(budget, 4)
                let budget3 = _.round(budget4, 3)
                let rs = _.round(budget3, 2)
                data.budget = rs
              } else {
                data.budget = 0
              }
            }

            if (valPPU == ppu) {
              data.flag_status = 'A'
            } else if (data.volDiscount == 'N' && valPPU == 0) {
              data.flag_status = 'F'
            } else if (data.volDiscount == 'Y' && valPPU == 0) {
              data.flag_status = 'FV'
            } else if (data.volDiscount == 'Y' && valPPU == data.priceVD) {
              data.flag_status = 'G'
            } else if (
              (data.volDiscount == 'N' && valPPU != ppu && valPPU > 0) ||
              (data.volDiscount == 'Y' && valPPU > data.priceVD && valPPU < ppu)
            ) {
              data.flag_status = 'CP'
            } else if (
              data.volDiscount == 'Y' &&
              valPPU > 0 &&
              valPPU < data.priceVD
            ) {
              data.flag_status = 'CV'
            }
            let dis = parseFloat(this.percentDiscount) / 100
            let rsNetPrice = parseFloat(value) * dis
            let np = parseFloat(value) - rsNetPrice
            let np4 = _.round(np, 4)
            let np3 = _.round(np4, 3)
            let np2 = _.round(np3, 2)
            data.net_price = np2
            let step1 = parseFloat(data.price) * dis
            let step2 = _.round(step1, 4)
            let step4 = step2 * parseInt(data.order_qty)
            let step5 = _.round(step4, 4)
            let step6 = _.round(step5, 2)
            data.net_amount = data.amount - step6

            let p_dis = parseFloat(data.price) * dis
            let p_dis4 = _.round(p_dis, 4)
            let p_dis2 = p_dis4 * parseInt(data.order_qty)
            let p_dis5 = _.round(p_dis2, 4)
            data.last_discount = _.round(p_dis5, 2)

            this.$store.dispatch('myorders/sumTotalTable')
          } else if (this.table == 'qtyFreeg') {
            //----------------------------------------
            var rsfreeg = _.find(this.keepSets.promotions, {
              type: 'Free item'
            })
            let dis = parseFloat(this.percentDiscount) / 100
            if (!_.isUndefined(rsfreeg)) {
              let numOfItem = rsfreeg.number_of_item
              let rsFg = _.cloneDeep(this.theArray)
              var fg = _.filter(rsFg, item => {
                if (_.isNumber(item.order_qty) && item.order_qty > 0) {
                  return true
                }
              })
              var orQty2 = fg.length
              let totalFg = fg.reduce(
                (acc, row) => acc + parseFloat(row.order_qty),
                0
              )
              if (_.isNumber(numOfItem)) {
                if (totalFg > parseInt(numOfItem)) {
                  this.dgTitle =
                    'Premium / Free Gift ต้องไม่เกิน ' +
                    this.fmNumberInt(numOfItem) +
                    ' ชิ้น'
                  this.$refs['md-confirm-input-dialog'].open()
                  let cal = totalFg - parseInt(numOfItem) - value
                  data.order_qty = cal < 0 ? cal * -1 : cal

                  let amount = parseFloat(data.net_price) * parseFloat(value)
                  let amount4 = _.round(amount, 4)
                  let amount3 = _.round(amount4, 3)
                  let amount2 = _.round(amount3, 2)

                  data.amount = amount2
                  let step1 = parseFloat(data.price) * dis
                  let step2 = _.round(step1, 4)
                  let step4 = step2 * parseInt(data.order_qty)
                  let step5 = _.round(step4, 4)
                  let step6 = _.round(step5, 2)
                  data.net_amount = data.amount - step6
                }
              } else if (!_.isUndefined(rsfreeg['ratio'])) {
                if (
                  _.isNumber(rsfreeg['ratio'][0]) &&
                  _.isNumber(rsfreeg['ratio'][1])
                ) {
                  let master = 0
                  let money = 0
                  let freeg = 0
                  master = this.getSum('order_qty')
                  money = rsfreeg['ratio'][0]
                  freeg = rsfreeg['ratio'][1]
                  let cal = Math.floor(master / money)
                  let totalCal = parseInt(cal * freeg)

                  if (totalFg > parseInt(totalCal)) {
                    this.dgTitle =
                      'Premium / Free Gift ต้องไม่เกิน ' +
                      this.fmNumberInt(totalCal) +
                      ' ชิ้น'
                    this.$refs['md-confirm-input-dialog'].open()

                    if (totalFg > totalCal) {
                      let cal = totalFg - totalCal - value
                      data.order_qty = cal < 0 ? cal * -1 : cal

                      let amount =
                        parseFloat(data.net_price) * parseFloat(value)
                      let amount4 = _.round(amount, 4)
                      let amount3 = _.round(amount4, 3)
                      let amount2 = _.round(amount3, 2)

                      data.amount = amount2
                      let step1 = parseFloat(data.price) * dis
                      let step2 = _.round(step1, 4)
                      let step4 = step2 * parseInt(data.order_qty)
                      let step5 = _.round(step4, 4)
                      let step6 = _.round(step5, 2)
                      data.net_amount = data.amount - step6
                    }
                  }
                } else if (_.isNumber(data.qty)) {
                  if (parseFloat(data.qty) < parseFloat(data.order_qty)) {
                    this.dgTitle =
                      'Premium / Free Gift ต้องไม่เกิน ' +
                      this.fmNumberInt(data.qty) +
                      ' ชิ้น'
                    this.$refs['md-confirm-input-dialog'].open()
                    data.order_qty = data.qty
                  }
                }
              } else if (_.isNumber(data.qty)) {
                if (parseFloat(data.qty) < parseFloat(data.order_qty)) {
                  this.dgTitle =
                    'Premium / Free Gift ต้องไม่เกิน ' +
                    this.fmNumberInt(data.qty) +
                    ' ชิ้น'
                  this.$refs['md-confirm-input-dialog'].open()
                  data.order_qty = data.qty
                }
              }
            } else {
              console.log('other case')
            }
            this.$store.dispatch('myorders/sumPromoTable')
            //----------------------------------------
          } else if (this.table == 'qtyItem') {
            let price = parseFloat(data.price)
            let ppu = parseFloat(data.ppu)
            let dis = parseFloat(this.percentDiscount) / 100
            let amount = price * parseFloat(value)
            let amount4 = _.round(amount, 4)
            let amount3 = _.round(amount4, 3)
            let amount2 = _.round(amount3, 2)
            data.amount = amount2

            let step1 = price * dis
            let step2 = _.round(step1, 4)
            let step4 = step2 * parseInt(data.order_qty)
            let step5 = _.round(step4, 4)
            let step6 = _.round(step5, 2)
            data.net_amount = data.amount - step6

            let p_dis = parseFloat(data.price) * dis
            let p_dis4 = _.round(p_dis, 4)
            let p_dis2 = p_dis4 * parseInt(data.order_qty)
            let p_dis5 = _.round(p_dis2, 4)
            data.last_discount = _.round(p_dis5, 2)

            // A :: Auto Price *ราคา Default
            // G :: Global Promotion or Volume Discount *ราคาที่มาจาก Volume Discount ส่วนลดซื้อจำนวนมาก
            // CP :: Change Price *แก้ไขราคา Net Price ที่มากกว่า 0.00
            // CV :: แก้ไขราคาที่มาจาก Volume Discount ส่วนลดซื้อจำนวนมาก *Net Price ที่มากกว่า 0.00
            // FV :: แก้ไขราคาที่มาจาก Volume Discount ส่วนลดซื้อจำนวนมาก *Net Price เป็น 0.00
            // F :: Free Item *แก้ไขราคา Net Price เป็น 0.00
            // P :: Promotion and Free Item *สินค้าที่มาจากชุด Promotion

            let budget = 0
            if (data.volDiscount == 'N' || _.isUndefined(data.volDiscount)) {
              // _.toUpper(info.price_policy_code) == "AUTO"

              if (
                _.toUpper(info.price_policy_code) != 'FIX' &&
                _.toUpper(info.price_policy_code) != 'FLEX'
              ) {
                if (
                  parseFloat(data.ppu) > 0 &&
                  parseFloat(data.ppu) > parseFloat(data.price)
                ) {
                  budget =
                    (parseFloat(data.ppu) - parseFloat(data.price)) *
                    parseFloat(data.order_qty)
                  let budget4 = _.round(budget, 4)
                  let budget3 = _.round(budget4, 3)
                  let rs = _.round(budget3, 2)
                  data.budget = rs
                } else {
                  data.budget = 0
                }
              } else {
                if (data.flag_status == 'F' || data.flag_status == 'FV') {
                  //OPL 199
                  if (!_.isUndefined(data.priceMaster)) {
                    budget =
                      parseFloat(data.priceMaster) * parseFloat(data.order_qty)
                  } else {
                    data.budget = 0
                  }
                  // budget = parseFloat(data.price) * parseFloat(data.order_qty);
                  let budget4 = _.round(budget, 4)
                  let budget3 = _.round(budget4, 3)
                  let rs = _.round(budget3, 2)
                  data.budget = rs
                } else {
                  data.budget = 0
                }
              }
              /*
              if (
                parseFloat(data.ppu) > 0 &&
                parseFloat(data.ppu) > parseFloat(data.price)
              ) {
                budget =
                  (parseFloat(data.ppu) - parseFloat(data.price)) *
                  parseFloat(data.order_qty);
                let budget4 = _.round(budget, 4);
                let budget3 = _.round(budget4, 3);
                let rs = _.round(budget3, 2);
                data.budget = rs;
              } else {
                data.budget = 0;
              }
              */
            } else if (data.volDiscount == 'Y') {
              if (
                parseFloat(data.priceVD) > parseFloat(data.price) &&
                parseFloat(data.ppu) > 0
              ) {
                budget =
                  (parseFloat(data.priceVD) - parseFloat(data.price)) *
                  parseFloat(data.order_qty)
                let budget4 = _.round(budget, 4)
                let budget3 = _.round(budget4, 3)
                let rs = _.round(budget3, 2)
                data.budget = rs
              } else {
                data.budget = 0
              }
            }

            this.$store.dispatch('myorders/sumTotalTable')
          } else if (this.table == 'ppuVol' && value > ppu) {
            let items = this.$store.getters['myorders/items_order']
            let indexItem = _.findIndex(items, {
              item_code: data.item_code
            })
            let dataI = items[indexItem]
            let dis = parseFloat(this.percentDiscount) / 100
            this.$nextTick(() => {
              data.price = data.ppu
              dataI.price = dataI.ppu
              let rsNetPrice = parseFloat(ppu) * dis
              let npp = ppu - rsNetPrice
              let npp4 = _.round(npp, 4)
              let npp3 = _.round(npp4, 3)
              let npp2 = _.round(npp3, 2)

              dataI.net_price = npp2

              if (dataI.volDiscount == 'N' && data.price == 0) {
                dataI.flag_status = 'F'
              } else if (
                dataI.volDiscount == 'N' &&
                data.price != ppu &&
                data.price > 0
              ) {
                dataI.flag_status = 'CP'
              } else if (dataI.volDiscount == 'N' && data.price == ppu) {
                dataI.flag_status = 'A'
              } else if (
                dataI.volDiscount == '์' &&
                data.price > 0 &&
                data.price != ppu
              ) {
                dataI.flag_status = 'CV'
              } else if (
                dataI.volDiscount == 'Y' &&
                data.price > 0 &&
                data.price != data.priceVD
              ) {
                dataI.flag_status = 'CV'
              } else if (dataI.volDiscount == 'Y' && data.price == 0) {
                dataI.flag_status = 'FV'
              } else if (
                dataI.volDiscount == 'Y' &&
                dataI.price == dataI.priceVD
              ) {
                dataI.flag_status = 'G'
              }
            })
            return
          } else if (this.table == 'ppuVol' && value == ppu) {
            let items = this.$store.getters['myorders/items_order']
            let indexItem = _.findIndex(items, {
              item_code: data.item_code
            })
            let dataI = items[indexItem]
            let dis = parseFloat(this.percentDiscount) / 100

            let amount = parseFloat(value) * parseFloat(dataI.order_qty)
            let amount4 = _.round(amount, 4)
            let amount3 = _.round(amount4, 3)
            let amount2 = _.round(amount3, 2)

            dataI.amount = amount2

            let step1 = parseFloat(dataI.price) * dis
            let step2 = _.round(step1, 4)
            let step4 = step2 * parseInt(dataI.order_qty)
            let step5 = _.round(step4, 4)
            let step6 = _.round(step5, 2)
            dataI.net_amount = dataI.amount - step6

            let p_dis = parseFloat(data.price) * dis
            let p_dis4 = _.round(p_dis, 4)
            let p_dis2 = p_dis4 * parseInt(data.order_qty)
            let p_dis5 = _.round(p_dis2, 4)
            data.last_discount = _.round(p_dis5, 2)

            let rsNetPrice = parseFloat(ppu) * dis
            let npp = ppu - rsNetPrice
            let npp4 = _.round(npp, 4)
            let npp3 = _.round(npp4, 3)
            let npp2 = _.round(npp3, 2)
            dataI.net_price = npp2
            if (dataI.volDiscount == 'N') {
              dataI.flag_status = 'A'
            }
          } else if (this.table == 'ppuVol' && value < ppu) {
            let items = this.$store.getters['myorders/items_order']
            let indexItem = _.findIndex(items, {
              item_code: data.item_code
            })
            let dataI = items[indexItem]
            dataI.price = value
            let amount = parseFloat(value) * parseFloat(data.order_qty)
            let amount4 = _.round(amount, 4)
            let amount3 = _.round(amount4, 3)
            let amount2 = _.round(amount3, 2)

            dataI.amount = amount2
            let tempPPU = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''))
            if (this.checkIsNaN(tempPPU)) {
              dataI.discount = 0
            } else {
              let rsPPU = ppu - tempPPU
              let rs = rsPPU / ppu
              dataI.discount = rs * 100
            }

            if (dataI.volDiscount == 'N' && value == 0) {
              dataI.flag_status = 'F'
            } else if (dataI.volDiscount == 'N' && value != ppu && value > 0) {
              dataI.flag_status = 'CP'
            } else if (dataI.volDiscount == 'N' && value == ppu) {
              dataI.flag_status = 'A'
            } else if (dataI.volDiscount == 'N' && value > 0 && value != ppu) {
              dataI.flag_status = 'CV'
            } else if (
              dataI.volDiscount == 'Y' &&
              value > 0 &&
              value != dataI.priceVD
            ) {
              dataI.flag_status = 'CV'
            } else if (dataI.volDiscount == 'Y' && value == 0) {
              dataI.flag_status = 'FV'
            } else if (dataI.volDiscount == 'Y' && value == dataI.priceVD) {
              dataI.flag_status = 'G'
            }

            let rsNetPrice =
              parseFloat(value) * (parseFloat(this.percentDiscount) / 100)
            let npp = parseFloat(value) - rsNetPrice
            let npp4 = _.round(npp, 4)
            let npp3 = _.round(npp4, 3)
            let npp2 = _.round(npp3, 2)
            dataI.net_price = npp2

            let step1 =
              parseFloat(dataI.price) * (parseFloat(this.percentDiscount) / 100)
            let step2 = _.round(step1, 4)
            let step4 = step2 * parseInt(dataI.order_qty)
            let step5 = _.round(step4, 4)
            let step6 = _.round(step5, 2)
            dataI.net_amount = dataI.amount - step6

            this.$store.dispatch('myorders/sumTotalTable')
          } else if (this.table == 'qtyVol') {
          } else if (this.table == 'qtyPromo') {
          }
        }
      }
    },
    percentDiscount () {
      let discount = this.$store.getters['myorders/customer_info']
        .percent_discount
      let rs = this.checkIsNaN(discount) ? 0 : discount
      return rs
    },
    theArray () {
      let rs = []
      if (this.table == 'ppuItem' || this.table == 'qtyItem') {
        rs = this.$store.getters['myorders/items_order']
      } else if (this.table == 'qtyPromo') {
        rs = this.$store.getters['myorders/promo_seleceted']
      } else if (this.table == 'qtyFreeg') {
        rs = this.$store.getters['myorders/promo_freeg_seleceted']
      } else if (this.table == 'ppuVol' || this.table == 'qtyVol') {
        rs = this.$store.getters['myorders/volDisList']
      } else {
        rs = []
      }
      return rs
    },
    proCondition () {
      return this.$store.getters['myorders/promo_set_seleceted']['sets']
    },
    defaultPrice () {
      let rs = this.$store.getters['myorders/promo_set_seleceted']
      if (typeof rs.sets != 'undefined') {
        return rs.sets[0].default_price
      } else {
        return ''
      }
    },
    totalPromo () {
      return this.$store.getters['myorders/totalPromo']
    },
    selectedPromo () {
      return this.$store.getters['myorders/promo_seleceted']
    },
    percentDiscPM () {
      return this.$store.getters['myorders/percentDiscPM']
    },
    keepSets () {
      return this.$store.getters['myorders/keepSets']
    },
    freegSeleceted () {
      return this.$store.getters['myorders/promo_freeg_seleceted']
    },
    volDisList () {
      return this.$store.getters['myorders/volDisList']
    },
    keepRange () {
      return this.$store.getters['myorders/keepRange']
    },
    totalvolDis () {
      return this.$store.getters['myorders/totalvolDis']
    },
    itemsOrders () {
      return this.$store.getters['myorders/items_order']
    },
    priceType () {
      return this.$store.getters['myorders/customer_info'].pricetype_code
    }
  },
  watch: {
    displayValue (value) {
      let info = this.$store.getters['myorders/customer_info']
      if (this.table == 'qtyPromo') {
        if (this.isInputActive) {
          let value4 = _.round(value, 4)
          let value3 = _.round(value4, 3)
          let value2 = _.round(value3, 2)
          this.conditionsPromo(value2)
        }
      } else if (this.table == 'qtyVol') {
        // FIX PRICE---------------
        if (
          (_.toUpper(info.price_policy_code) == 'AUTO' &&
            _.toUpper(info.customer_channel_code) == '100') ||
          _.toUpper(info.price_policy_code) == 'FLEX'
        ) {
          // console.log("price_policy => 6");
          this.conditionsVol(value)
        }
      } else if (this.table == 'ppuItem') {
        if (parseFloat(value) == 0 && !this.isInputActive) {
          let value4 = _.round(value, 4)
          let value3 = _.round(value4, 3)
          let value2 = _.round(value3, 2)
          if (
            (_.toUpper(info.price_policy_code) == 'AUTO' &&
              _.toUpper(info.customer_channel_code) == '100') ||
            _.toUpper(info.price_policy_code) == 'FLEX'
          ) {
            // console.log("price_policy => 7");
            this.conditionsVol(value2)
          }
        }
      }
    }
  },
  props: {
    value: {},
    type: {},
    index: {},
    indexDetail: {},
    table: {},
    readOnly: {},
    errorMsg: {},
    id: ''
  },
  data () {
    return {
      isInputActive: false,
      tmpData: 0,
      warningText: '',
      arrayParent: [],
      arrayChild: [],
      theArrayTemp: [],
      theArrayFullTemp: [],
      keepInput: '',
      dgTitle: '',
      keepEvent: false,
      maxInput: 8
    }
  },
  methods: {
    showIsInputActive () {
      // console.log("showIsInputActive ===>");
      Vue.localStorage.set('FOCUS_INPUT', 'IN')
      this.isInputActive = true
    },
    cropText (e) {
      if (this.table == 'ppuItem') {
        this.$nextTick(() => {
          e.target.select()
        })
      } else {
        e.target.select()
      }
    },
    conditionsVol (value) {
      let t = this
      let runProdByCode = {}
      let itemDemo = _.cloneDeep(t.itemsOrders)
      if (
        this.theArray.length > 0 &&
        typeof this.theArray[0].group != 'undefined'
      ) {
        let data = t.theArray
        let itemsOrders = t.itemsOrders
        let result = t.theArray[0].group
        let dis = parseFloat(t.percentDiscount) / 100
        if (result[0].type == 'Indipendent') {
          // console.log("if ==> ");
          let dataINdex = t.theArray[t.index]
          result.forEach(function (group) {
            let item = group['details'].find(
              todo => todo.item_code === dataINdex.item_code
            )
            let itemsOrders = _.cloneDeep(t.itemsOrders)
            let idx = _.findIndex(data, {
              item_code: dataINdex.item_code
            })
            if (
              _.isUndefined(itemsOrders[idx].ref_po_no) ||
              _.trim(itemsOrders[idx].ref_po_no).length < 2
            ) {
              if (typeof item != 'undefined') {
                _.forEach(group['volume_discount'], function (val, index) {
                  let cldVal = _.cloneDeep(val[0])
                  if (typeof cldVal != 'undefined') {
                    let end = _.isNumber(cldVal.end)
                      ? cldVal.end
                      : 9999999999999999
                    let pr = ''
                    let vd_price_code = ''
                    let obj = {
                      end: end,
                      start: cldVal.start,
                      type: index
                    }
                    val[0] = obj
                    if (
                      _.inRange(data[idx].order_qty, cldVal.start, end) ||
                      data[idx].order_qty == cldVal.start ||
                      data[idx].order_qty == end
                    ) {
                      if (item['price'][index] == false) {
                        pr = dataINdex.ppu
                      } else if (
                        item['price'][index] != false &&
                        typeof item['price'][index] != 'undefined'
                      ) {
                        pr = item['price'][index].price
                        vd_price_code = item['price'][index].default_price_code
                      }

                      let pr4 = _.round(pr, 4)
                      let pr3 = _.round(pr4, 3)
                      let pr2 = _.round(pr3, 2)

                      if (dataINdex.flag_status == 'G') {
                        dataINdex.price = pr2
                      }

                      dataINdex.priceVD = pr2
                      dataINdex.vd_price_code = vd_price_code

                      let idxMS = _.findIndex(itemsOrders, {
                        item_code: dataINdex.item_code
                      })
                      if (idxMS >= 0) {
                        if (dataINdex.flag_status == 'G') {
                          itemsOrders[idxMS].price = pr2
                        }
                        itemsOrders[idxMS].priceVD = pr2
                        itemsOrders[idxMS].order_qty = dataINdex.order_qty
                        let amount =
                          dataINdex.price * parseInt(dataINdex.order_qty)
                        let amount4 = _.round(amount, 4)
                        let amount3 = _.round(amount4, 3)
                        let amount2 = _.round(amount3, 2)

                        let total = amount2 * dis
                        let totalP = dataINdex.price * dis
                        let np = dataINdex.price - totalP
                        let np4 = _.round(np, 4)
                        let np3 = _.round(np4, 3)
                        let np2 = _.round(np3, 2)
                        itemsOrders[idxMS].net_price = np2
                        itemsOrders[idxMS].amount = amount2
                        let step1 = parseFloat(itemsOrders[idxMS].price) * dis
                        let step2 = _.round(step1, 4)
                        let step4 =
                          step2 * parseInt(itemsOrders[idxMS].order_qty)
                        let step5 = _.round(step4, 4)
                        let step6 = _.round(step5, 2)
                        itemsOrders[idxMS].net_amount =
                          itemsOrders[idxMS].amount - step6

                        let p_dis = parseFloat(itemsOrders[idxMS].price) * dis
                        let p_dis4 = _.round(p_dis, 4)
                        let p_dis2 =
                          p_dis4 * parseInt(itemsOrders[idxMS].order_qty)
                        let p_dis5 = _.round(p_dis2, 4)
                        itemsOrders[idxMS].last_discount = _.round(p_dis5, 2)

                        if (
                          parseFloat(itemsOrders[idxMS].priceVD) >
                          parseFloat(itemsOrders[idxMS].price)
                        ) {
                          let budget =
                            (parseFloat(itemsOrders[idxMS].priceVD) -
                              parseFloat(itemsOrders[idxMS].price)) *
                            parseFloat(itemsOrders[idxMS].order_qty)
                          let budget4 = _.round(budget, 4)
                          let budget3 = _.round(budget4, 3)
                          let budget2 = _.round(budget3, 2)
                          itemsOrders[idxMS].budget = budget2
                        }

                        t.$store.commit('myorders/setItems', itemsOrders)
                      }
                    }
                  }
                })
              }
            }
          })
        } else {
          // console.log("else ==> ");
          let keepData = []
          result.forEach(function (group) {
            runProdByCode[group.group_id] = 0
            data.forEach(function (row) {
              if (
                _.isUndefined(row.ref_po_no) ||
                _.trim(row.ref_po_no).length < 2
              ) {
                let item = group['details'].find(
                  todo => todo.item_code === row.item_code
                )
                if (typeof item != 'undefined') {
                  let temp = []
                  _.forEach(group['volume_discount'], function (val, index) {
                    let cldVal = _.cloneDeep(val[0])
                    if (typeof cldVal != 'undefined') {
                      let obj = {
                        end: _.isNumber(cldVal.end)
                          ? cldVal.end
                          : 9999999999999999,
                        start: cldVal.start,
                        type: index
                      }
                      val[0] = obj
                    }
                  })
                  row.group = [group]
                  if (row.flag_status != 'F' && row.flag_status != 'FV') {
                    runProdByCode[group.group_id] =
                      runProdByCode[group.group_id] + parseInt(row.order_qty)
                    row.volDiscount = 'Y'
                    if (row.flag_status == 'A') {
                      row.flag_status = 'G'
                    }
                    row.budget = 0
                  }
                  keepData.push(row)
                }
              }
            })
          })
          let priceCode = {}
          result.forEach(function (group) {
            _.forEach(group['volume_discount'], function (val, index) {
              let cldVal = _.cloneDeep(val[0])
              if (typeof cldVal != 'undefined') {
                if (
                  _.inRange(
                    runProdByCode[group.group_id],
                    cldVal.start,
                    cldVal.end
                  ) ||
                  runProdByCode[group.group_id] == cldVal.start ||
                  runProdByCode[group.group_id] == cldVal.end
                ) {
                  priceCode[group.group_id] = cldVal.type
                }
              }
            })
            keepData.forEach(function (row) {
              if (
                _.isUndefined(row.ref_po_no) ||
                _.trim(row.ref_po_no).length < 2
              ) {
                let item = group['details'].find(
                  todo => todo.item_code === row.item_code
                )
                let rowFV = _.cloneDeep(row)
                if (typeof item != 'undefined') {
                  if (row.flag_status != 'F' && row.flag_status != 'FV') {
                    /* let keyItem = _.findIndex(itemDemo, {
                      item_code: row.item_code
                    }); 
                    */
                    let keyItem = _.findIndex(itemDemo, function (o) {
                      return (
                        o.item_code == row.item_code &&
                        o.flag_status != 'F' &&
                        o.flag_status != 'FV'
                      )
                    })
                    let pr = ''
                    let vd_price_code = ''
                    if (item['price'][priceCode[group.group_id]] == false) {
                      pr = row.ppu
                    } else if (
                      item['price'][priceCode[group.group_id]] != false &&
                      typeof item['price'][priceCode[group.group_id]] !=
                        'undefined'
                    ) {
                      pr = item['price'][priceCode[group.group_id]].price
                      vd_price_code =
                        item['price'][priceCode[group.group_id]].default_price_code
                    }
                    let pr4 = _.round(pr, 4)
                    let pr3 = _.round(pr4, 3)
                    let pr2 = _.round(pr3, 2)
                    if (row.order_qty > 0) {
                      row.priceVD = pr2
                      row.vd_price_code = vd_price_code
                    }
                    if (
                      row.price != parseFloat(row.ppu) &&
                      row.price != pr2 &&
                      row.flag_status != 'G'
                    ) {
                      row.flag_status = 'CV'
                    } else {
                      if (row.order_qty > 0) {
                        row.price = pr2
                      }
                      row.flag_status = 'G'
                    }

                    let amount = row.price * parseInt(row.order_qty)
                    let amount4 = _.round(amount, 4)
                    let amount3 = _.round(amount4, 3)
                    let amount2 = _.round(amount3, 2)

                    let total = amount2 * dis
                    let totalP = row.price * dis
                    let npp = row.price - totalP
                    let npp4 = _.round(npp, 4)
                    let npp3 = _.round(npp4, 3)
                    let npp2 = _.round(npp3, 2)

                    row.net_price = npp2
                    row.amount = amount2

                    let step1 = parseFloat(row.price) * dis
                    let step2 = _.round(step1, 4)
                    let step4 = step2 * parseInt(row.order_qty)
                    let step5 = _.round(step4, 4)
                    let step6 = _.round(step5, 2)
                    row.net_amount = row.amount - step6

                    let p_dis = parseFloat(row.price) * dis
                    let p_dis4 = _.round(p_dis, 4)
                    let p_dis2 = p_dis4 * parseInt(row.order_qty)
                    let p_dis5 = _.round(p_dis2, 4)
                    row.last_discount = _.round(p_dis5, 2)

                    let budget = 0
                    if (parseFloat(row.priceVD) > parseFloat(row.price)) {
                      budget =
                        (parseFloat(row.priceVD) - parseFloat(row.price)) *
                        parseFloat(row.order_qty)
                    }
                    let budget4 = _.round(budget, 4)
                    let budget3 = _.round(budget4, 3)
                    let budget2 = _.round(budget3, 2)
                    row.budget = budget2

                    if (keyItem >= 0) {
                      itemDemo[keyItem] = row

                      // for case free gift display vd
                      let keyItemF = _.findIndex(itemDemo, function (o) {
                        return (
                          o.item_code == row.item_code && o.flag_status == 'FV'
                        )
                      })

                      if (keyItemF >= 0) {
                        let rowFV = itemDemo[keyItemF]
                        rowFV.priceVD = row.priceVD
                        let b = rowFV.priceVD * parseFloat(rowFV.order_qty)
                        let budget4F = _.round(b, 4)
                        let budget3F = _.round(budget4F, 3)
                        let budget2F = _.round(budget3F, 2)
                        rowFV.budget = budget2F
                        itemDemo[keyItemF] = rowFV
                      }
                      t.$store.commit('myorders/setItems', itemDemo)
                    }
                  }
                }
              }
            })
          })
        }
        this.$store.dispatch('myorders/sumVolDisTable')
        this.$store.dispatch('myorders/sumTotalTable')
      }
    },
    conditionsPromo (value) {
      // console.log("value >>> ",value)
      let data = this.theArray[this.index]
      let amount = parseFloat(data.net_price) * value
      let amount4 = _.round(amount, 4)
      let amount3 = _.round(amount4, 3)
      let amount2 = _.round(amount3, 2)

      data.amount = amount2
      data.net_amount = amount2
      let dataTemp = this.$store.getters['myorders/promo_seleceted_temp']
      let filItem = _.findIndex(dataTemp, { item_code: data.item_code })
      if (filItem >= 0 && !_.isUndefined(dataTemp[filItem])) {
        dataTemp[filItem] = data
      }
      this.$store.dispatch('myorders/sumPromoTable')
    },
    getSum (key) {
      if (key == 'Count Item') {
        var pro = _.filter(this.selectedPromo, item => {
          if (_.isNumber(item.order_qty) && item.order_qty > 0) {
            return true
          }
        })
        return pro.length
      } else {
        var pro = _.filter(this.selectedPromo, item => {
          if (_.isNumber(item.order_qty)) {
            return true
          }
        })
        return pro.reduce((acc, row) => acc + parseFloat(row[key]), 0)
      }
    },
    calculateOther () {
      this.isInputActive = false
      Vue.localStorage.set('FOCUS_INPUT', 'OUT')
      if (this.table == 'qtyItem') {
        var pro = _.filter(this.theArray, item => {
          if (_.isNumber(item.order_qty) && item.order_qty > 0) {
            return true
          }
        })
        if (pro.length > 0) {
          // Vue.localStorage.set("FOCUS_INPUT", "IN");
          this.$store.dispatch('myorders/getStock', {
            table: this.table,
            index: this.index
          })
        }
      }
      if (this.table == 'ppuItem' || this.table == 'qtyItem') {
        this.theArray[this.index].editMode = false
        if (this.table == 'ppuItem') {
          this.$store.dispatch('myorders/sumTotalTable')
        }
      }

      if (this.table == 'qtyPromo') {
        let t = this
        let data = this.theArray[this.index]
        let value = data.order_qty

        if (_.isNumber(data.min) && data.min == 0) {
          if (value > data.max && data.max > 0) {
            t.dgTitle = 'ซื้อสินค้าไม่เกิน ' + t.fmNumberInt(data.max) + ' ชิ้น'

            t.$refs['md-confirm-input-dialog'].open()
            data.order_qty = data.max

            let amount = data.max * data.ppu
            let amount4 = _.round(amount, 4)
            let amount3 = _.round(amount4, 3)
            let amount2 = _.round(amount3, 2)
            data.amount = amount2
            let np = data.max * data.net_price
            let np4 = _.round(np, 4)
            let np3 = _.round(np4, 3)
            let np2 = _.round(np3, 2)
            data.net_amount = np2
          }
        } else if (_.isNumber(data.min) && data.min > 0) {
          if (value < data.min) {
            t.dgTitle =
              'ซื้อสินค้าตั้งแต่ ' + t.fmNumberInt(data.min) + ' ชิ้นขึ้นไป'

            t.$refs['md-confirm-input-dialog'].open()
            data.order_qty = data.min
            let amount = data.min * data.ppu
            let amount4 = _.round(amount, 4)
            let amount3 = _.round(amount4, 3)
            let amount2 = _.round(amount3, 2)
            data.amount = amount2
            let np = data.min * data.net_price
            let np4 = _.round(np, 4)
            let np3 = _.round(np4, 3)
            let np2 = _.round(np3, 2)
            data.net_amount = np2
          } else if (
            value > data.min &&
            _.isNumber(data.max) &&
            value > data.max
          ) {
            t.dgTitle =
              'ซื้อสินค้าตั้งแต่ ' +
              t.fmNumberInt(data.min) +
              ' ชิ้นขึ้นไป แต่ไม่เกิน ' +
              t.fmNumberInt(data.max) +
              ' ชิ้น'

            t.$refs['md-confirm-input-dialog'].open()
            data.order_qty = data.max
            let amount = data.max * data.ppu
            let amount4 = _.round(amount, 4)
            let amount3 = _.round(amount4, 3)
            let amount2 = _.round(amount3, 2)
            data.amount = amount2
            let np = data.max * data.net_price
            let np4 = _.round(np, 4)
            let np3 = _.round(np4, 3)
            let np2 = _.round(np3, 2)
            data.net_amount = np2
          }
        }
        t.$store.dispatch('myorders/sumPromoTable')
      }
    },
    fmNumberInt (value) {
      return this.$store.getters['globalfunc/formatNumberInt'](value)
    },
    getPPU (defaultPrice) {
      this.$store.commit('myorders/setSpinnerPromo', true)
      let dataPromo = this.$store.getters['myorders/promo_seleceted']
      myOrderService
        .getPPU(defaultPrice, this.theArray)
        .then(responsePPU => {
          let temp = _.cloneDeep(dataPromo)
          let _thisppu = this
          _.forEach(responsePPU, function (rowPPU) {
            let ind = _.findIndex(temp, {
              item_code: rowPPU.pro_code
            })
            if (ind >= 0) {
              dataPromo[ind].net_price =
                dataPromo[ind].net_price == 0 ? temp[ind].ppu : rowPPU.ppu
              dataPromo[ind].price =
                dataPromo[ind].net_price == 0 ? temp[ind].ppu : rowPPU.ppu
              dataPromo[ind].pricetype = _thisppu.keepSets.default_price
            }
          })
          this.$store.commit('myorders/setSpinnerPromo', false)
        })
        .catch(error => console.error('error => getPPU'))
    },
    isNumber (evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      let res = evt.target.value.split('.')
      if (res.length == 2 && charCode == 46) {
        this.keepEvent = false
        evt.preventDefault()
      } else {
        if (
          (this.table == 'qtyItem' ||
            this.table == 'qtyPromo' ||
            this.table == 'qtyFreeg') &&
          charCode == 46
        ) {
          this.keepEvent = false
          evt.preventDefault()
        }
        if (charCode == 13 && this.table == 'qtyItem') {
          this.calculateOther()
        }
        if (
          charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46
        ) {
          this.keepEvent = false
          evt.preventDefault()
        } else {
          this.keepEvent = true
          return true
        }
      }
    },
    checkIsNaN (val) {
      return isNaN(parseFloat(val))
    },
    close () {
      this.$refs['md-confirm-input-dialog'].close()
    },
    nextTab (e) {
      if (e != '') {
        if (this.table == 'qtyPromo') {
          let evt = e ? e : window.event
          var charCode = e.which ? e.which : e.keyCode
          if (charCode == 13) {
            var el =
              e.target.parentElement.parentElement.parentElement.parentElement
            if (typeof el.nextSibling.childNodes[8] != 'undefined') {
              el.nextSibling.childNodes[8].childNodes[0].childNodes[0].childNodes[0].focus()
            }
          }
        } else if (this.table == 'ppuItem') {
          let res = e.target.value.split('.')
          if (!_.isUndefined(res[1])) {
            if (res[1].length == 1) {
              // this.maxInput = st.length + 1;
              let st = _.toString(e.target.value)
              let data = this.theArray[this.index]
              let id = 'netprice-' + data.item_code
              var x = document.getElementById(id)
              if (!_.isNull(x)) {
                x.maxLength = st.length + 1
                //แก้เรื่อง จังหวะ set maxlength ทำให้ช่อง input มัน render
              }
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.md-promotion-ipt {
  // margin: unset;
  margin-top: 0px;
  margin-bottom: 5px;
  padding: unset;
  min-height: 30px !important;
}
.md-input-container .md-error {
  padding-top: 5px;
  opacity: unset;
  color: #f44336;
  font-size: 11px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
