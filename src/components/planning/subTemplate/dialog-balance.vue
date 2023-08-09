<template>
<div>
    <md-dialog-content style="max-height: 100% ;min-height: 100%;">
  <md-layout
          class="head_table" style="padding-left:3%;width:100%;background-color:">
             <div  style="background-color:;width: 39%;"></div>
             
             <div   style="background-color:;width: 8%;">TOTAL</div>
             <div style="background-color:;width:11.5%;"></div>
             
            <div style="background-color:;width: 8%;">
             <div >DNSS</div>
             <md-tooltip md-direction="top">Sales Stock (WN)</md-tooltip>
            </div>
             <div style="background-color:;width:12%;"></div>

            <div style="width: 8%;">
              <div >DNMT</div>
              <md-tooltip md-direction="top">Special Reserve (WN)</md-tooltip>
            </div>
           <div style="width:12%;"></div>
             
            
        </md-layout>

        <div style="position: absolute;padding-left: 45%;"> 
            <md-spinner
            :md-size="50"
            :md-stroke="3"
            v-show="this.$store.getters.display_balance"
            md-indeterminate
          ></md-spinner>
          </div>
       
        <div style="
        padding-top:20px;
        display: flex;
        justify-content: space-around;
        align-content: center;" 
        v-if="this.$store.getters.balance_detail.length == 0"> No Balance... </div>
          <div class="style-scroll" style="overflow-y: scroll;max-height:430px;">
               <div  
                class="detail"
                :style="{
               'font-size':'14px',  
                'padding': '18px 0 0 3%',
                display: '-webkit-box',
                width: '100%',
                'font-family':'Roboto'
                }"
                v-for="(row, index) in this.$store.getters.balance_detail"
                :key="'tbitemss111' + index"
              >

             <div 
             style="
             width:39%;
             white-space: nowrap; 
             overflow: hidden;
             text-overflow: ellipsis; 
             font-family:Kanit;
             padding-right:25px;
             ">
                 {{row.name}}
                  <md-tooltip md-direction="top">{{row.name}}</md-tooltip>
             </div>
             

             <div style="background-color:;width:8%;">{{floatFormat(row.total)}}</div>
             <div style="background-color:;font-size:12px; width:12%;"> <span v-if="row.per_total!=0">%{{floatFormat(row.per_total)}}</span> </div>

             <div style="background-color:;width:8%;">{{floatFormat(row.dnss)}}</div>
             <div style="font-size:12px;width:12%;"> <span v-if="row.per_dnss!=0">%{{floatFormat(row.per_dnss)}}</span> </div>


             <div style="background-color:;width:8%;">{{floatFormat(row.dnmt)}}</div>
             <div style="font-size:12px;width:12%;"> <span v-if="row.per_dnmt!=0">%{{floatFormat(row.per_dnmt)}}</span></div>

              
          </div>
          </div>
          <div v-if="this.$store.getters.balance_detail.length > 0">
              <md-layout 
               
                v-for="(row, index) in this.$store.getters.balance_total"
                    :key="'tbitemss222' + index"
                style="margin-top:10px;padding-left:3%"
                
                > 
                
                <div class="total_row"  style="background-color:;width:38.5%;"></div>

                <div class="total_row" style="background-color:;width:8%;">{{floatFormat(row.sum_total)}}</div>
                <div  class="total_row" style="font-size:12px; width:12%;"> <span v-if="row.sum_per_total!=0">%{{floatFormat(row.sum_per_total)}}</span> </div>

                <div class="total_row" style="background-color:;width: 8%;">{{floatFormat(row.sum_dnss)}}</div>
                <div  class="total_row" style="font-size:12px;width:12%;"> <span v-if="row.sum_per_dnss!=0">%{{floatFormat(row.sum_per_dnss)}}</span> </div>

               
                <div class="total_row" style="background-color:;width: 8%;">{{floatFormat(row.sum_dnmt)}}</div>
                <div  class="total_row" style="font-size:12px;width:12%;"> <span v-if="row.sum_per_dnmt!=0">%{{floatFormat(row.sum_per_dnmt)}}</span> </div>

                     
        </md-layout>
          </div>
        
    </md-dialog-content>
    
</div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'; 
    import VueSticky from 'vue-sticky'
    export default {
        created : function() {
                this.sum_total();
                this.val = this.value.val_traget;
        },
        computed: {
            // ...mapGetters({ 
            //         rowAdjust: 'getRowAdjust',
            //         headDetail: 'getHeadDetail',
            //         itemDetail: 'getAdjustMonthDetailAll',
            //         rowAdjustTotalDetail: 'getRowTotalDetailAll'
            // }),
            // displayValue: {
            //     get: function() {
            //         if (this.isInputActive) {
            //             var test = this.value.toString().indexOf(".");
            //             if(test==-1){
            //                 return this.value.toString();
            //             }else
            //                 // return parseFloat(this.value).toFixed(2).toString();
            //                 return this.formatNumber(this.value,2);
            //         } else {

            //             return this.formatNumber(this.value,2);
            //             // return parseFloat(this.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
            //         }
            //     },
            //     set: function(modifiedValue) {
            //         this.modifiedValue = modifiedValue
            //     //     let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""));
            //     //     if (isNaN(newValue)) {
            //     //         newValue = 0;
            //     //     }
            //     //     this.$emit('input', newValue);
            //     }
            // },
            // adjustdetail(){
            //     return this.$store.getters.getAdjustMonthDetail(this.table);
            // },
        
        },
         directives: {
            sticky: VueSticky
        } ,
        props : {
            load_data:{},
            value : {},
            // type:{},
            // index:{},
            // indexDetail:{},
            // table: {},
            // code: {}
                    },
        methods : {
             floatFormat(val){
                 let number=parseFloat(val).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                
                if(number.charAt(String(number.length-1)) === '0'){
                    number = parseFloat(val).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                return number; 
            },
            sum_total(){ 
                this.$store.dispatch('getItemalance',this.value.id.id)
            },
        },
        data() {
            return {
                balance_detail:[],
                data_total:[{
                    sum_total:0,
                    sum_per_total:0,
                    sum_dnss:0,
                    sum_per_dnss:0,
                    sum_gnss:0,
                    sum_per_gnss:0,
                    sum_dnbs:0,
                    sum_per_dnbs:0,
                    sum_dnpc:0,
                    sum_per_dnpc:0
                }]
            }
        },
    }
</script>
<style lang="">
    .head_table{
        text-align: left;
        font-family:Lato;
        letter-spacing: 0px;
        color: #414141;
        opacity: 1;
        font-weight: bold;
    }
    .detail{
        text-align: left;
        letter-spacing: NaNpx;
        color: #5A5A5A;
        opacity: 1;
    }
    .total_row{
        color:#5A5A5A;
        background: #EFEFEF 0% 0% no-repeat padding-box;
        opacity: 1;
        font-size: 14px;
        padding:10px 0 10px 0;
        font-family: Roboto;
    }
</style>