<template>
  <div v-if="datas.head.type =='tactics2'" class="tactics2">
    <div style="width:100%;display:flex" class="title-1">
      <div
        style="width:100%"
      >{{datas.head.sm_code}}&nbsp;:&nbsp;{{datas.head.sm_name}}</div>
      <div  style="padding-left:190px;width:33%">
        PAID : (฿)
        {{subPoint(datas.head.total , 'front')}}
        <span
          style="font-size:14px;"
        >{{subPoint(datas.head.total , 'back')}}</span>
      </div>
      <div style="width:3%;text-align: end;">
        <md-icon style="cursor:pointer" @click.native="close">close</md-icon>
      </div>
    </div>
    <div class="body-cons">
      <div class="borders">
      <div class="box-1" style="width:100%">{{datas.head.title}}</div>
        <md-layout style="background-color:"> 
          <!--ROW 1-->
         <div style="background-color:;width: 50%;">
            <div v-if="datas.detail.length == 0 " style="color: rgba(0, 0, 0, 0.54);font-size:15px;font-family:lato;text-align:center;padding-top:10%">No data...</div>
            <div style="width:100%;" v-for="(row,index) in datas.detail" :key="'tactics2-item-'+index">
              <div
                style="width:100%;"
                class="mds-body"
                v-for="(record, idx) in row.tac_use"
                :key="'tactics2-tac_use-'+idx"
              >
                <div style="width:100%;display: flex;padding-top:20px">
                  <div v-if="datas.detail.length == 0 " style="width:5%;padding-top:3px;text-align:end">
                    <input
                      v-if="record.show_checkbox"
                      v-model="record.checked"
                      type="checkbox"
                      :disabled="true"
                      style="height: 20px;width: 20px;"
                    />
                  </div>
                  <div
                    style="width:25%;padding-top:5px;padding-left:10px;"
                    class="text-1"
                  >{{record.title}}</div>
                  <div style="width:18%;">
                    <md-input-container style="margin:0px;">
                      <md-select v-model="record.symbols_code" :disabled="true">
                        <md-option
                          :value="row.code"
                          v-for="row in masterStep1.arrSymbols"
                          :key="'tactics2-arrdg1'+row.code"
                        >{{row.title}}</md-option>
                      </md-select>
                    </md-input-container>
                  </div>
                  <div
                    style="width:25%;padding-left:3%;padding-right:5%;padding-top:12px;"
                    class="under-line"
                  >
                    <div style="width:100%;">
                      <div class="title-ipt-roboto" style="text-align:center">
                        <span style="font-size:14px;color:#5a5a5a">{{renderUnit(record.unit_code)}}</span>
                        &nbsp;&nbsp;
                        {{fmFull(row.math_value)}}
                      </div>
                    </div>
                  </div>
                  <div style="width:27%;padding-right:40px">
                    <md-input-container style="margin:0px;">
                      <md-select v-model="record.unit_code" :disabled="true">
                        <md-option
                          :value="row.code"
                          v-for="row in masterStep1.arrUnits"
                          :key="'tactics2-s-arrdg1'+row.code"
                        >{{row.title}}</md-option>
                      </md-select>
                    </md-input-container>
                  </div>
                </div>
                <!--ROW 2-->
                <div v-if="record.detail.length > 0">
                  <div v-if="record.paid_type != 'count_items'"
                    :style="{'padding-right':'30px','width':'100%','display':'flex','font-family':'lato','font-size':'12px','margin-top':'15px'}"
                  >
                    <div style="width:32%;font-family:kanit;font-size:14px;padding-left:57px"></div>
                    <div style="width:15%;text-align:center">
                      <b>Actual Sales (฿)</b>
                    </div>
                    <div style="width:15%;text-align:center;">
                      <b>Target (฿)</b>
                    </div>
                    <div style="width:15%;text-align:center;">
                      <b>Achieved (%)</b>
                    </div>
                    <div style="width:23%;"></div>
                  </div>
                  <div v-if="record.paid_type == 'count_items'"
                    :style="{'padding-right':'30px','width':'100%','display':'flex','font-family':'lato','font-size':'12px','margin-top':'15px'}"
                  >
                    <div style="width:32%;font-family:kanit;font-size:14px;padding-left:57px"></div>
                    <div style="width:15%;text-align:center">
                      <b>Count Items</b>
                    </div>
                    <div style="width:15%;text-align:center;">
                      <b>Target Items</b>
                    </div>
                    <div style="width:15%;text-align:center;">
                      <b>Achieved (%)</b>
                    </div>
                    <div style="width:23%;"></div>
                  </div>
                  <div
                    :style="{'padding-right':'30px','width':'100%','display':'flex','font-family':'roboto','font-size':'12px','margin-top':'5px','color':'#5A5A5A'}"
                  >
                    <div
                      v-for="(lines,indexs) in record.detail"
                      :key="'tactics2-items-'+index+'-rewards-'+indexs"
                      :style="{'width':'100%','display':'flex', 'margin-bottom': indexs == record.detail.length-1 ? '10px':'unset'}"
                    >
                      <div style="width:30%;"></div>
                      <div style="width:20%;text-align:center">{{fmFull(lines.actual)}}</div>
                      <div style="width:20%;text-align:center;">
                        <b>{{fmFull(lines.target)}}</b>
                      </div>
                      <div style="width:20%;text-align:center;">
                        <b>{{fmFull(lines.achieved)}}</b>
                      </div>
                      <div style="width:23%">
                        <div
                          :style="{'width':'30%','background':backgroundStatus(lines.status),'color':'white','text-align':'center','border-radius':'6px'}"
                        >{{lines.status}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         </div>


          <div style=";width: 50%;">
          <div v-if="datas.detail.length == 0 " style="color: rgba(0, 0, 0, 0.54);font-size:15px;font-family:lato;text-align:center;padding-top:10%">No data...</div>
            <div style="width:100%;" v-for="(row,index) in datas.detail" :key="'tactics2-item-'+index">
          <!--ROW 3-->
          <div style="width:100%;display: flex;">
            <div v-if="datas.detail.length == 0 " style="width:5%;"></div>
            <div
              style="width:25%;padding-top:8px;padding-left:42px;text-align:left"
              class="text-1"
            >เพดานเงินรางวัล</div>
            <div style="width:18%;">
              <md-input-container style="margin:0px">
                <md-select v-model="row.range_code" :disabled="true">
                  <md-option
                    :value="row.code"
                    v-for="row in masterStep1.arrRange"
                    :key="'tactics2-d-arrdg1'+row.code"
                  >{{row.title}}</md-option>
                </md-select>
              </md-input-container>
            </div>
            <div
              style="width:25%;padding-left:5%;padding-top:12px;padding-right:5%"
              class="under-line"
            >
              <div class="title-ipt-roboto" style="text-align:center">{{fmFull(row.max_reward)}}</div>
            </div>
            <div style="width:27%"></div>
          </div>
          <!--ROW 4-->
          <div
            :style="{'padding-right':'30px','width':'100%','display':'flex','font-family':'lato','font-size':'12px','margin-top':'15px','margin-bottom':'8px'}"
          >
            <div
              style="width:40%;font-family:kanit;font-size:14px;padding-left:57px"
            >ขั้นเงินรางวัล แปรผันตาม</div>
            <div style="width:15%;text-align:center">
              <b>Target (%)</b>
            </div>
            <div style="width:20%;text-align:right;">
              <b>Incentive (%)</b>
            </div>
          </div>
          <div style="width:100%;">
            <div
              v-for="(line,indexs) in row.step"
              :key="'step'+indexs"
              style="display:flex;padding-top:15px"
            >
              <div style="width:40%;"></div>
              <div
                style="width:15%;text-align:center;margin-right:2%"
                class="under-line title-ipt-roboto"
              >{{fmFull(line.meet_target_min)}}</div>
              <div
                style="min-width:15%;text-align:right;center;margin-left:2%"
                class="under-line title-ipt-roboto"
              >
                <div
                  v-if="line.math_paid == 0"
                  style="color:#A8A8A8;font-size:11px;padding-top:2px;text-align:center"
                >achieve target (%)</div>
                <div v-else>{{fmFull(line.math_paid)}}</div>
              </div>
            </div>
          </div>
          <div
            v-for="(line,indexs) in row.rewards"
            :key="'tactics2-items-'+index+'-rewards-'+indexs"
            :style="{'padding-right':'30px','width':'100%','display':'flex', 'margin-bottom': indexs == row.rewards.length-1 ? '10px':'unset'}"
          >
            <div style="width:33%;" class="text-1"></div>
            <div style="width:67%">
              <div style="display:flex;width:100%;padding:5px 0px;">
                <div style="width:20%;text-align:center;padding-left:10px;padding-right:15px">
                  <div class="title-ipt-roboto">{{fmFull(line.target)}}</div>
                </div>
                <div
                  :style="{'width':'30%','text-align':line.incentive ==0 ?'right':'right','padding-right':line.incentive ==0 ?'5%':'7%','padding-left':line.incentive ==0 ?'0%':'5%'}"
                >
                  <div
                    v-if="line.incentive ==0"
                    style="color:#A8A8A8;font-size:11px;"
                  >achieve target (%)</div>
                  <div class="title-ipt-roboto" v-else>{{fmFull(line.incentive)}}</div>
                </div>
                <div style="width:50%;"></div>
              </div>
            </div>
          </div>
          </div>
          </div>
        </md-layout>
      
      
        <div v-if="datas.detail.length == 0 " style="color: rgba(0, 0, 0, 0.54);font-size:15px;font-family:lato;text-align:center;padding-top:10%">No data...</div>
        <div style="width:100%;" v-for="(row,index) in datas.detail" :key="'tactics2-item-'+index">
       
          <div
            v-if="row.item_cg.length > 0"
            :style="{'padding-left':'30px','width':'100%','display':'flex','font-family':'lato','font-size':'12px','margin-top':'30px','margin-bottom':'10px'}"
          >
            <div :style="{ 'color': icon_sort_show === 'cg_list' ?'#000' : 'gray'}"  style="cursor: pointer;width:35%;text-align:left;padding-left:25px">
              <b @click="sort('cg_list')" class="hover_head1">
                
                <md-icon v-if="sort_by === 'ASC' && icon_sort_show === 'cg_list'" style="padding-top:3px;font-size:15px">arrow_upward</md-icon>
                <md-icon v-if="sort_by === 'DESC' && icon_sort_show === 'cg_list'" style="padding-top:3px;font-size:15px">arrow_downward</md-icon>
              CG LIST</b> 
            </div>
            <div :style="{ 'color': icon_sort_show === 'sales' ?'#000' : 'gray'}" style="cursor: pointer;width:13%;text-align:left">
              <b  @click="sort('sales')" class="hover_head2">SALES 
                <md-icon v-if="sort_by === 'ASC' && icon_sort_show === 'sales'" style="padding-top:3px;font-size:15px">arrow_upward</md-icon></b>
                <md-icon v-if="sort_by === 'DESC' && icon_sort_show === 'sales'" style="padding-top:3px;font-size:15px">arrow_downward</md-icon>
            </div>
            <div :style="{ 'color': icon_sort_show === 'target' ?'#000' : 'gray'}"  style="cursor: pointer;width:13%;text-align:left;">
              <b @click="sort('target')" class="hover_head3">TARGET / <small>min.</small> 
              <md-icon v-if="sort_by === 'ASC' && icon_sort_show === 'target'" style="padding-top:3px;font-size:15px">arrow_upward</md-icon></b>
               <md-icon v-if="sort_by === 'DESC' && icon_sort_show === 'target'" style="padding-top:3px;font-size:15px">arrow_downward</md-icon>
            </div>
            <div :style="{ 'color': icon_sort_show === 'achieve' ?'#000' : 'gray'}"  style="cursor: pointer;width:13%;text-align:left;">
              <b @click="sort('achieve')" class="hover_head4">ACHIEVE %  
                <md-icon v-if="sort_by === 'ASC' && icon_sort_show === 'achieve'" style="padding-top:3px;font-size:15px">arrow_upward</md-icon></b>
                <md-icon v-if="sort_by === 'DESC' && icon_sort_show === 'achieve'" style="padding-top:3px;font-size:15px">arrow_downward</md-icon>
            </div>
            <div :style="{ 'color': icon_sort_show === 'rewards' ?'#000' : 'gray'}"  style="cursor: pointer;width:13%;text-align:left;">
              <b @click="sort('rewards')" class="hover_head5">REWARDS  
              <md-icon v-if="sort_by === 'ASC' && icon_sort_show === 'rewards'" style="padding-top:3px;font-size:15px">arrow_upward</md-icon></b>
              <md-icon v-if="sort_by === 'DESC' && icon_sort_show === 'rewards'" style="padding-top:3px;font-size:15px">arrow_downward</md-icon>
            </div>
            <div :style="{ 'color': icon_sort_show === 'paid' ?'#000' : 'gray'}"  style="cursor: pointer;width:13%;text-align:left;">
              <b @click="sort('paid')" class="hover_head6">PAID  
              <md-icon v-if="sort_by === 'ASC' && icon_sort_show === 'paid'" style="padding-top:3px;font-size:15px">arrow_upward</md-icon></b>
              <md-icon v-if="sort_by === 'DESC' && icon_sort_show === 'paid'" style="padding-top:3px;font-size:15px">arrow_downward</md-icon>
            </div>
          </div>
          <div class="body-cons-small">
            <!-- <div
              v-if="row.item_cg.length==0"
              style="color:#A8A8A8;text-align:center;width:100%;padding:5% 0%;font-size:15px"
            >No data...</div>-->
            <div
              class="lines"
              v-for="(line,indexs) in row.item_cg"
              :key="'tactics2s-item-'+index+'-rewards-'+indexs"
              :style="{ 'margin-bottom': indexs == row.item_cg.length-1 ? '10px':'unset'}"
            >
              <div
                style="width:35%;text-align:left;padding-left:25px;font-family:kanit;padding-right:15px"
              >{{line.code}}&nbsp;:&nbsp;{{line.title}}</div>
              <div style="width:13%;text-align:left">{{fmFull(line.sales)}}</div>
              <div style="width:13%;text-align:left;padding-left:5px"> <span :style="{'color' : line.target < line.min_target  ? 'red' : ''}">{{fmFull(line.target)}}</span> / <small>{{fmFull(line.min_target)}}</small></div>
              <div style="width:13%;text-align:left;padding-left:5px">{{fmFull(line.achieved)}}</div>
              <div style="width:13%;text-align:left;padding-left:5px">{{fmFull(line.reward)}}</div>
              <div style="width:13%;text-align:left;padding-left:5px">{{fmFull(line.paid)}}</div>
            </div>
          </div>
          <!--ROW 6-->
          <div
            class="total-bar"
            :style="{'padding-left':'30px','width':'100%','display':'flex','font-family':'lato','font-size':'12px','margin-top':'8px','margin-bottom':'10px'}"
          >
            <div style="width:35%;text-align:left;padding-left:25px">
              <b>TOTAL :</b>
            </div>
            <div style="width:13%;text-align:left">
              <b>{{fmFull(row.total_item.total_sales)}}</b>
            </div>
            <div style="width:13%;text-align:left;">
              <b>{{fmFull(row.total_item.total_target)}}</b>
            </div>
            <div style="width:13%;text-align:left;">
              <!-- <b>{{fmFull(row.total_item.total_achieved)}}</b> -->
            </div>
            <div style="width:13%;text-align:left;">
              <b>{{fmFull(row.total_item.total_reward)}}</b>
            </div>
            <div style="width:13%;text-align:left;">
              <b>{{fmFull(row.total_item.total_paid)}}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

 const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }

    return items
  }

export default {
  name: "count-item-confirm",
    data() {
      return {
         sort_by:'ASC',
         icon_sort_show:'cg_list',
         status_hover:false,
         before_sort:'',
         users: [
        {
          id: 1,
          name: 'Shawna Dubbin',
          email: 'sdubbin0@geocities.com',
          gender: 'Male',
          title: 'Assistant Media Planner'
        },
        {
          id: 2,
          name: 'Odette Demageard',
          email: 'odemageard1@spotify.com',
          gender: 'Female',
          title: 'Account Coordinator'
        },
        {
          id: 3,
          name: 'Lonnie Izkovitz',
          email: 'lizkovitz3@youtu.be',
          gender: 'Female',
          title: 'Operator'
        },
        {
          id: 4,
          name: 'Thatcher Stave',
          email: 'tstave4@reference.com',
          gender: 'Male',
          title: 'Software Test Engineer III'
        },
        {
          id: 5,
          name: 'Clarinda Marieton',
          email: 'cmarietonh@theatlantic.com',
          gender: 'Female',
          title: 'Paralegal'
        }
      ]


      }
    },
  props: {
    datas: {
      type: Object,
      required: true,
    }
  },
  computed: {
    masterStep1() {
      return this.$store.getters["incentive/masterStep1"];
    }
  },
  created () {
     this.searched = this.users
  },
  methods: {

     newUser () {
        window.alert('Noop')
      },
      searchOnTable () {
        this.searched = searchByName(this.users, this.search)
      },
  
    close() {
      this.$emit("close");
    },
    subPoint(value, pos) {
      let rs = this.fmFull(value);
      let master = rs.split(".");
      if (pos == "front") {
        return master[0];
      } else {
        if (master.length > 1) {
          return "." + master[1];
        } else {
          return "";
        }
      }
    },
    renderUnit(value) {
      if (value == 1) {
        return "%";
      } else {
        return "฿";
      }
    },
    fmInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    fm(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },
    fmFull(value) {
      if (_.isNaN(parseFloat(value))) {
        return "";
      } else {
        var test = value.toString().indexOf(".");
        if (test == -1) {
          return this.fmInt(value);
        } else {
          return this.fm(value);
        }
      }
    },
    backgroundStatus(value) {
      if( value == 'PASS'){
        return '#66bb6a'
      }else if(value == 'FAILED'){
        return '#f44336'
      }else{
        return '#C9C9C9'
      }
    },
    sort( param ){
      if( param === 'cg_list'){

        if(this.before_sort  != param){
          this.datas.detail[0].item_cg.sort((a, b) => (a.code > b.code) ? 1 : -1)
          this.sort_by = 'ASC'
        }else {
             if(this.sort_by === 'ASC'){
          this.datas.detail[0].item_cg.sort((a, b) => (a.code > b.code) ? -1 : 1)
          this.sort_by = 'DESC'
        }else {
          this.datas.detail[0].item_cg.sort((a, b) => (a.code> b.code) ? 1 : -1)
          this.sort_by = 'ASC'
        }
        }
        this.before_sort  = 'cg_list'
        // console.log(this.datas.detail[0].item_cg)
     
        // console.log('cg_list')
        }
      else if(param === 'sales'){

        if(this.before_sort  != param){
          this.datas.detail[0].item_cg.sort((a, b) => (Number(a.sales) > Number(b.sales)) ? 1 : -1)
          this.sort_by = 'ASC'
        }else {
             if(this.sort_by === 'ASC'){
          this.datas.detail[0].item_cg.sort((a, b) => (Number(a.sales) > Number(b.sales)) ? -1 : 1)
          this.sort_by = 'DESC'
        }else {
          this.datas.detail[0].item_cg.sort((a, b) => (Number(a.sales) > Number(b.sales)) ? 1 : -1)
          this.sort_by = 'ASC'
        }
        }
        this.before_sort  = 'sales'
        //  console.log('sales')
      }
      else if(param === 'target'){
         if(this.before_sort  != param){
          this.datas.detail[0].item_cg.sort((a, b) => (Number(a.target) > Number(b.target)) ? 1 : -1)
          this.sort_by = 'ASC'
        }else {
             if(this.sort_by === 'ASC'){
          this.datas.detail[0].item_cg.sort((a, b) => (Number(a.target) > Number(b.target)) ? -1 : 1)
          this.sort_by = 'DESC'
        }else {
          this.datas.detail[0].item_cg.sort((a, b) => (Number(a.target) > Number(b.target)) ? 1 : -1)
          this.sort_by = 'ASC'
        }
        }
         
        this.before_sort  = 'target'
        // console.log('target')
      }
      else if(param === 'achieve'){
        if(this.before_sort  != param){
          this.datas.detail[0].item_cg.sort((a, b) => (Number(a.achieved) > Number(b.achieved)) ? 1 : -1)
          this.sort_by = 'ASC'
        }else {
             if(this.sort_by === 'ASC'){
          this.datas.detail[0].item_cg.sort((a, b) => (Number(a.achieved) > Number(b.achieved)) ? -1 : 1)
          this.sort_by = 'DESC'
        }else {
          this.datas.detail[0].item_cg.sort((a, b) => (Number(a.achieved) > Number(b.achieved)) ? 1 : -1)
          this.sort_by = 'ASC'
        }
        }
        this.before_sort  = 'achieve'
        // console.log('achieve')
      }
      else if(param === 'rewards'){
          if(this.before_sort  != param){
          this.datas.detail[0].item_cg.sort((a, b) => (a.reward > b.reward) ? 1 : -1)
          this.sort_by = 'ASC'
        }else {
             if(this.sort_by === 'ASC'){
          this.datas.detail[0].item_cg.sort((a, b) => (a.reward > b.reward) ? -1 : 1)
          this.sort_by = 'DESC'
        }else {
          this.datas.detail[0].item_cg.sort((a, b) => (a.reward > b.reward) ? 1 : -1)
          this.sort_by = 'ASC'
        }
        }
       this.before_sort  = 'rewards'
        // console.log('rewards')
      }
      else if(param === 'paid'){
           if(this.before_sort  != param){
          this.datas.detail[0].item_cg.sort((a, b) => (a.paid > b.paid) ? 1 : -1)
          this.sort_by = 'ASC'
        }else {
             if(this.sort_by === 'ASC'){
          this.datas.detail[0].item_cg.sort((a, b) => (a.paid > b.paid) ? -1 : 1)
          this.sort_by = 'DESC'
        }else {
          this.datas.detail[0].item_cg.sort((a, b) => (a.paid > b.paid) ? 1 : -1)
          this.sort_by = 'ASC'
        }
        }
        this.before_sort  = 'paid'
        // console.log('paid')
      }
      this.icon_sort_show = param
    },
    hover() {
      this.status_hover = true
      console.log('Hover')
    }
  }
};
</script>

<style lang="scss">
.tactics2 {
  .title-1 {
    background: #efefef;
    padding: 20px 30px;
    padding-left:70px;
    // margin-bottom: 15px;
    color: #414141;
    font-size: 19px;
    font-family: kanit;
  }
  .body-cons {
    padding:30px 80px 0 80px;
    .borders {
      // border: 1px solid #efefef;
    }
    .box-1 {
      font-family: kanit;
      font-size: 18px;
      font-weight: 600;
    }
    .title-ipt-roboto,
    .title-ipt-kanit {
      height: 20px;
      color: #414141;
      font-size: 13px;
      line-height: 1;
      padding-bottom: 2px;
      font-family: roboto;
      border-bottom: 1px solid rgba(201, 201, 201, 0.57);
    }
    .text-1 {
      font-family: kanit;
    }
    .md-input-container.md-input-disabled:after {
      background-image: none;
      border-bottom: 1px solid rgba(201, 201, 201, 0.57);
    }
    .md-select .md-select-value {
      font-family: kanit;
      font-size: 14px;
    }
    .total-bar {
      font-size: 14px;
      padding: 8px 0px;
      background: #efefef;
    }
    .lines {
      padding-left: 30px;
      width: 100%;
      font-size: 14px;
      display: flex;
      padding-bottom: 6px;
      padding-top: 6px;
    }
    .lines:hover {
      background: #efefef;
    }
    .md-input-container {
      padding: unset;
      min-height: 30px;
    }
  }
  .body-cons-small {
    // padding: 30px;
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100vh - 400px);
  }
  .body-cons-small::-webkit-scrollbar {
    height: 7px;
    width: 7px;
    background: #f7f7f7;
  }
  .body-cons-small::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.11);
    border-radius: 5px;
  }

  
  .hover_head1:hover{
    color:#000;
    font-weight: 1000;
  }
   .hover_head2:hover{
    color:#000;
     font-weight: bold;
  }
   .hover_head3:hover{
    color:#000;
     font-weight: bold;
  }
   .hover_head4:hover{
    color:#000;
     font-weight: bold;
  }
   .hover_head5:hover{
   color:#000;
    font-weight: bold;
  }
   .hover_head6:hover{
    color: #000;
     font-weight: bold;
  }
}
</style>
