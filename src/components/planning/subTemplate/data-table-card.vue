<template>
     <div >
         
    <md-layout>
     
        <md-dialog style="" md-open-from="#fab" ref="dialog-view-balance" id="balance_dialog">
        <md-dialog-title >
             <md-layout>
        <md-layout md-flex-large="70">
            <div style="width:56%;background-color:;"> <label class="sub-title kanitFont">{{title_name}}</label> </div>
            <div style="background-color:"> <span >{{floatFormat(this.val_traget)}}</span> <span style="padding-left:20px">TARGETED</span></div>
          <!-- <label class="sub-title kanitFont">{{title_name}}</label> -->
          <!-- ===>{{info.delivery_date_cipher}} -->
        </md-layout>
        <md-layout md-flex-large="30" md-align="end">
          <md-icon
            @click.native="dialog_close_balance()"
            style="cursor:pointer;margin-right:30px"
            >close</md-icon
          >
        </md-layout>
      </md-layout>
        </md-dialog-title>
        <dialog-balance :value="{id:headDetail , val_traget:this.val_traget}"  v-if="cal_data" ></dialog-balance>
    </md-dialog>
             <div style="padding-top:12px;width: 2%;">
       
                <md-icon v-if="headDetail.status === 'true'" style="color:red">cancel</md-icon>
             </div> 
             <div style="width: 0.5%;"></div>
             
             <div style="width: 97.5%;">    
                 <div  class="mb-15 crad-bg"  :id="'table2_'  + valueTable" v-if="headDetail.id != keepExpand">
            <table  id="res" class="latoFont text-left" style=" width:100%">
                <tr   v-sticky="{ zIndex: 1, stickyTop: 0 }" class="-font-18 -gray-41 height-50" >
                    <td class="pl-15 pb-0 font-bold" style="width:64.7%;padding-top:0px">{{headDetail.id}} : <span style="font-family:kanit">{{headDetail.name}}</span></td>
                    <!-- <td v-if="showTab" class="text-right" colspan="8" > -->
                        <!-- <md-icon class="mr-16 color-black">add</md-icon> -->
                    <!-- </td> -->
                    <!-- <td v-if="!showTab" colspan="8" class/="-bg-gray-EF"></td> -->
                   
                    <td  class="-bg-gray-EF -gray-72 pr-20 text-right">
                      
                        <span style="padding:10px 7px 20px 7px; background-color:" v-if="this.viewId == 2" @click="balance(headDetail)" class=" mr-16 -pointer" >
                            <md-icon   style="color:#797979" class="-font-23 color-black">account_balance
                            </md-icon>
                             <md-tooltip  style="font-size:14px;padding:7px 10px 7px 10px;width: auto; height: auto;"  md-direction="top">
                                       DNSS : <span  v-if="!this.$store.getters.load_hover">{{intFormat(Number(headDetail.tt.DNSS))}}</span><br>
                                       DNMT :  {{intFormat(Number(headDetail.tt.DNMT))}}
                                </md-tooltip>
                        </span>
                        <span @click="showTable" class="pt-15 mr-16 -pointer" >
                            <md-icon class="-font-25 color-black" v-if="showTab">fullscreen
                                <md-tooltip md-direction="top">expand</md-tooltip>
                            </md-icon>
                            <md-icon  class="-font-25 color-black" v-if="!showTab">fullscreen_exit
                                <md-tooltip md-direction="top">collapse</md-tooltip>
                            </md-icon>
                        </span>
                        
                        <span @click="showLine" class="pt-15 mr-16 -pointer" >
                            <md-icon class="-font-25 color-black" v-if="headDetail.id == keepExpand">keyboard_arrow_up
                            </md-icon>
                            <md-icon  class="-font-25 color-black" v-else>keyboard_arrow_down
                            </md-icon>
                        </span>
                    </td>
                </tr>
            </table>
        </div>
        <div style="max-height: 400px;" class="mb-15 crad-bg style-scroll"  :id="'table2_'  + valueTable" v-if="headDetail.id == keepExpand">
            <div v-if="loading" class="mr-snpiner" style="position: absolute;">
                <md-spinner :md-size="60" :md-stroke="2"  md-indeterminate></md-spinner> 
            </div>
            
            <table   id="res" class="latoFont text-left" 
            :style="{ 'width': '100%' , 'overflow-y': items_detail.length>7 ? 'scroll' :'hidden'  }"
            >
               <tr style="background-color:#fff" class="-font-18 -gray-41 height-50" >
                    <td 
                    :style="{'padding-top':'10px' , position : showTab ? 'absolute' : ''   }"
                     class="pl-15 pb-0 font-bold">{{headDetail.id}} : <span style=" background-color:;font-family:kanit">{{headDetail.name}}</span></td>
                    <td   v-if="showTab" class="text-right" colspan="8" >
                        <!-- <md-icon class="mr-16 color-black">add</md-icon> -->
                    </td>
                    <td  v-if="!showTab" colspan="8" class="-bg-gray-EF"></td>
                    <td  class="-bg-gray-EF -gray-72 pr-20 text-right" colspan="6" >
                        <span   style="padding:10px 7px 20px 7px;"  v-if="this.viewId == 2" @click="balance(headDetail)" class="mr-16 -pointer" >
                            <md-icon style="color:#797979" class="-font-23 color-black">account_balance
                            </md-icon>
                             <md-tooltip  style="font-size:14px;padding:7px 10px 7px 10px;width: auto; height: auto;"  md-direction="top">
                                       DNSS : <span  v-if="!this.$store.getters.load_hover">{{intFormat(Number(headDetail.tt.DNSS))}}</span><br>
                                       DNMT :  {{intFormat(Number(headDetail.tt.DNMT))}}
                                </md-tooltip>
                        </span>
                        <span @click="showTable" class="pt-15 mr-16 -pointer" >
                            <md-icon class="-font-25 color-black" v-if="showTab">fullscreen
                                <md-tooltip md-direction="top">expand</md-tooltip>
                            </md-icon>
                            <md-icon  class="-font-25 color-black" v-if="!showTab">fullscreen_exit
                                <md-tooltip md-direction="top">collapse</md-tooltip>
                            </md-icon>
                        </span>
                        <span @click="showLine" class="pt-15 mr-16 -pointer" >
                            <md-icon class="-font-25 color-black" v-if="headDetail.id == keepExpand">keyboard_arrow_up
                            </md-icon>
                            <md-icon  class="-font-25 color-black" v-else>keyboard_arrow_down
                            </md-icon>
                        </span>
                    </td>
                </tr>
                <!--Row select-->
                <tr style="background-color:#fff" v-sticky="{ zIndex: 1, stickyTop: 40 }">
                    <td  ></td>
                    <td v-if="showTab" class="-gray-72 text-left font-bold" colspan="4">
                        {{totalLabel}}
                    </td>
                    <td v-if="showTab" class="-gray-72 text-left font-bold" colspan="4" >
                        {{monthLabel}}
                    </td>
                    <td v-if="showTab"  class="text-left pl-per2 -bg-gray-EF pb-5 -font-14 -gray-72 font-bold" colspan="6">{{monthAdjust[0]}}</td>
                    <td v-if="!showTab" class="-bg-gray-EF pl-10 pb-15 -font-14 -gray-72 font-bold" colspan="5">{{monthAdjust[0]}}</td>
                    <td v-if="!showTab" class="-bg-gray-EF pb-15 -font-14 -gray-72 font-bold" colspan="4">{{monthAdjust[1]}}</td>
                    <td v-if="!showTab" class="-bg-gray-EF pb-15 -font-14 -gray-72 font-bold" colspan="4">{{monthAdjust[2]}}</td>
                    <td v-if="!showTab" class="-bg-gray-EF" ></td>
                </tr>
                <!--Row head-->
                <tr
                 style="background-color:#fff;height: 30px;"  
                 v-sticky="{ zIndex: 1, stickyTop: 60 }"
                 class="-font-12 text-left font-bold">
                            <td class="width-1" ></td>
                        <!--Start tab 1 -->
                            <td v-if="showTab" class="width-1 pr-per05 -gray-72" >Target</td>
                            <td v-if="showTab" class="width-1 -gray-72">Sales</td>
                            <td v-if="showTab" class="width-01 -gray-72"></td>
                            <td v-if="showTab" class="width-1 pr-per2  -gray-72">Ratio</td>
                            <td v-if="showTab" class="width-1 pr-per05 -gray-72">Target</td>
                            <td v-if="showTab" class="width-1 -gray-72 ">Sales</td>
                            <td v-if="showTab" class="width-01 -gray-72"></td>
                            <td v-if="showTab" class="width-1 pr-per2 -gray-72">Ratio</td>
                            <td v-if="showTab" class="width-1 pr-per05 pl-per2 -bg-gray-EF -gray-41 ">Target</td>
                            <td v-if="showTab" class="width-01 -bg-gray-EF -oranges pl-per1">Adjusted</td>
                            <td v-if="showTab" class="width-1 -bg-gray-EF "></td>
                            <td v-if="showTab" class="width-1 -bg-gray-EF -oranges ">Ratio</td>
                            <td v-if="showTab" class="width-1 pr-per05 -bg-gray-EF -gray-41 ">Sales</td>
                        <!--End tab 1 -->
                        <!--Start tab 2 -->
                            <td v-if="!showTab" class="width-2 pl-per1 -bg-gray-EF -gray-72">Target</td>
                            <td v-if="!showTab" class="width-01 -bg-gray-EF -oranges pl-per1">Adjusted</td>
                            <td v-if="!showTab" class="width-1 -bg-gray-EF -gray-72"></td>
                            <td v-if="!showTab" class="width-1 pr-per05 -bg-gray-EF -oranges">Ratio</td>
                            <td v-if="!showTab" class="width-1 -bg-gray-EF -gray-72">Sales</td>

                            <td v-if="!showTab" class="width-2 -bg-gray-EF -gray-72">Target</td>
                            <td v-if="!showTab" class="width-01 -bg-gray-EF -oranges pl-per1">Adjusted</td>
                            <td v-if="!showTab" class="width-1 -bg-gray-EF -gray-72"></td>
                            <td v-if="!showTab" class="width-1 pr-per2 -bg-gray-EF -oranges">Ratio</td>

                            <td v-if="!showTab" class="width-2 pr-per05 -bg-gray-EF -gray-72">Target</td>
                            <td v-if="!showTab" class="width-01 -bg-gray-EF -oranges">Adjusted</td>
                            <td v-if="!showTab" class="width-1 -bg-gray-EF -gray-72"></td>
                            <td v-if="!showTab" class="width-1 -bg-gray-EF -oranges pr-per0">Ratio</td>
                        <!--End tab 2 -->
                        <td width="1%" class="-bg-gray-EF -gray-72"></td>
                    </tr>

                   
                <!--Row body-->
                <tr v-for="(row, rowIndex) in items_detail" :key="headDetail.id+'-'+rowIndex" v-on:mouseover= "mouseOver(rowIndex , row.comment)"  v-on:mouseout= "mouseOut(rowIndex , row.comment)" class="rowsTable">
                    <!-- <td class="pl-20 pd-product -font-16 -gray-72" >
                        {{row.id}}</br>
                        <div class="-gray-A8 -font-14 -list-block width-170">
                            {{row.name}}
                            <md-tooltip md-direction="top">{{row.name}}</md-tooltip>
                        </div>
                    </td> -->
                    <td class="pl-20 pd-product -font-12 -gray-72 -list-block" >
                        {{row.id}} : {{row.name}}
                        <md-tooltip md-direction="top">{{row.id}} : {{row.name}}</md-tooltip>
                    </td>
                    <!--Start tab 1 -->
                    <!--Target 1 -->
                        <td class="-paddingTwo-line pr-per02 -font-12 -gray-A8" v-if="showTab" nowrap>
                            <template v-if="sumtotal[rowIndex]">
                            {{intFormat(sumtotal[rowIndex].target_total)}}
                            <div :id="'dataAchievedTotal_' + rowIndex + valueTable" class="unvisible-tag -font-10 -gray-72 position-hover" >
                                Achieved: {{intFormat(sumtotal[rowIndex].achieved_total)}}%
                            </div>
                            </template>
                        </td>
                    <!--Sales 1 -->
                        <td v-if="showTab" class="-font-12 -gray-A8 -paddingTwo-line"  nowrap> 
                            <template v-if="sumtotal[rowIndex]">{{intFormat(sumtotal[rowIndex].sales_total)}}</template>
                        </td>
                    <!--Growth 1 -->
                        <td v-if="showTab" class="text-left" nowrap>
                        <template v-if="sumtotal[rowIndex]">
                            <label v-if="sumtotal[rowIndex].growth_total>0" class="-font-9 font-green"  > 
                                <md-icon class="-font-12 font-green -width-icon">arrow_drop_up</md-icon>
                                    {{floatFormat(sumtotal[rowIndex].growth_total)}}%
                            </label>
                            <label v-else class="-font-9 -redsummary" > 
                                <md-icon class="-font-12 -redsummary -width-icon">arrow_drop_down</md-icon> 
                                {{floatFormat(sumtotal[rowIndex].growth_total)}}%
                            </label>
                        </template>
                        </td>
                    <!--Ratio 1 -->
                        <td v-if="showTab" class="-font-12 -gray-A8 text-left pr-per2 width-30" >
                            <template v-if="sumtotal[rowIndex]">{{floatFormat(sumtotal[rowIndex].ratio_total)}}%</template>
                        </td>
                    <!--Target 2 -->
                        <td class="-paddingTwo-line  pr-per02 -font-12 -gray-A8" v-if="showTab" nowrap>
                            <template v-if="sumprevmonth[rowIndex]">
                                {{intFormat(sumprevmonth[rowIndex].target_month)}}
                                <div :id="'dataAchievedMonth_' + rowIndex + valueTable" class="unvisible-tag -font-10 -gray-72 position-hover">
                                    Achieved: {{intFormat(sumprevmonth[rowIndex].achieved_month)}}%
                                </div>
                            </template>
                        </td>
                    <!--Sales 2 -->
                        <td v-if="showTab" class="-font-12 -gray-A8 -paddingTwo-line" nowrap>
                            <template v-if="sumprevmonth[rowIndex]">{{intFormat(sumprevmonth[rowIndex].sales_month)}}</template>
                        </td>
                    <!--Growth 2 -->
                        <td v-if="showTab" class="pl-per02 text-left"  nowrap>
                            <template v-if="sumprevmonth[rowIndex]">
                                <label v-if="sumprevmonth[rowIndex].growth_month>0" class="-font-9 font-green"  > 
                                <md-icon class="-font-12 font-green -width-icon" >arrow_drop_up</md-icon>
                                    {{floatFormat(sumprevmonth[rowIndex].growth_month)}}%
                                </label>
                                <label v-else class="-font-9 -redsummary" > 
                                    <md-icon class="-font-12 -redsummary -width-icon" >arrow_drop_down</md-icon> 
                                    {{floatFormat(sumprevmonth[rowIndex].growth_month)}}%
                                </label>
                            </template>
                        </td>
                    <!--Ratio 2 -->
                        <td v-if="showTab" class="-font-12 -gray-A8 text-left pr-per2 width-50 ">
                            <template v-if="sumprevmonth[rowIndex]">{{floatFormat(sumprevmonth[rowIndex].ratio_month) }}%</template>
                        </td>
                    <!--Target 3 -->
                    
                    <!--{{ check_role_detail(adjustdetail[rowIndex].adjust , adjustdetail[rowIndex].max_value ,rowIndex ,valueTable )}}  -->
                        <td  class="-bg-gray-EF -font-12 -gray-41 pl-per01 pr-per01 -paddingTwo-line" nowrap >
                                <!-- {{adjustdetail[rowIndex].checked}} -->
                                <template v-if="adjustdetail[rowIndex]">
                                <md-layout>
                                <div style=" padding:1px 0px 0 0 ;width: 35%;"> 
                                    <md-icon v-if="adjustdetail[rowIndex].checked" style="color:red;font-size:18px">priority_high</md-icon>
                                    <md-tooltip v-if="adjustdetail[rowIndex].checked" md-direction="top">{{adjustdetail[rowIndex].check_desc}}{{' '}}{{adjustdetail[rowIndex].max_value}}</md-tooltip>

                                 </div>
                                <div style="padding:0;text-align:center;background-color:;width: 10%;" > 
                                    {{formatNumber(adjustdetail[rowIndex].adjust_target,0)}}
                                </div>
                                 <!-- <div  v-if="adjustdetail[rowIndex].checked" style="width: 20% ;background-color:red;margin-right:0px"> 
                                    <md-icon  style="color:red;font-size:18px">priority_high</md-icon>
                                    <md-tooltip md-direction="top">{{'Adjusted must be more than '}}{{adjustdetail[rowIndex].max_value}}</md-tooltip>
                                 </div>
                                  <div v-else style="margin-right:0px"> 
                                    <md-icon  style="color:red;font-size:18px"></md-icon>
                                 </div>
                                <div style="background-color:blue;width: 80% " > 
                                    {{formatNumber(adjustdetail[rowIndex].adjust_target,0)}}
                                </div> -->
                                </md-layout>    
                                    </template>
                        </td> 
                    <!--Adjusted 3 -->
                        <td  class="-bg-gray-EF -width-adjust">
                            <template v-if="adjustdetail[rowIndex]">
                            <adjust-input v-model="adjustdetail[rowIndex].adjust" :table="index" index="0" :indexDetail="rowIndex" :code="row.id" type="detail"></adjust-input>
                            </template>
                        </td>
                    <!--Growth 3 -->
                        <td  class="-bg-gray-EF pr-per02  text-left pl-per01" nowrap>
                            <template v-if="adjustdetail[rowIndex]">
                            <label v-if="adjustdetail[rowIndex].growth>0" class="-font-9 font-green"  > 
                            <md-icon class="-font-12 font-green -width-icon" >arrow_drop_up</md-icon>
                                {{floatFormat(adjustdetail[rowIndex].growth)}}%
                            </label>
                            <label v-else class="-font-9 -redsummary" > 
                                <md-icon class="-font-12 -redsummary -width-icon" >arrow_drop_down</md-icon> 
                                {{floatFormat(adjustdetail[rowIndex].growth)}}%
                            </label>
                            </template>
                        </td>
                    <!--Ratio 3 -->
                        <td  class="-bg-gray-EF pl-per05" style="width:55px">
                            <template v-if="adjustdetail[rowIndex]">
                                <ratio-input v-model="adjustdetail[rowIndex].ratio"    index="0" :table="index" :indexDetail="rowIndex" :code="row.id" type="detail"></ratio-input>
                            </template>
                        </td>
                    <!--Sales 3 -->
                        <td class="-font-12 -bg-gray-EF -gray-41  pr-per1 -paddingTwo-line"  nowrap>
                            <template v-if="adjustdetail[rowIndex]">
                                {{intFormat(adjustdetail[rowIndex].adjust_sale)}}
                                <div :id="'dataSuceesSaleMonth_' + rowIndex + valueTable" class="unvisible-tag -font-10 -gray-72 text-left position-hover">
                                    Success: {{intFormat(adjustdetail[rowIndex].success)}}%
                                </div>
                            </template>
                        </td>
                    <!--End tab 1 -->
                    <!--Start tab 2 -->
                        <!--Tab 2 Target 2 -->
                        <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 -paddingOne-line  pr-per05 " nowrap>
                            <template v-if="adjustdetail[rowIndex]">{{formatNumber(adjustdetail[rowIndex].adjust_target1,0)}}</template>
                        </td>
                        <!--Tab 2 Adjust 2 -->
                        <td v-if="!showTab" class="-bg-gray-EF -width-adjust pr-per05" >
                            <template v-if="adjustdetail[rowIndex]">
                            <adjust-input v-model="adjustdetail[rowIndex].adjust1"    :table="index" index="1" :indexDetail="rowIndex" :code="row.id" type="detail"></adjust-input>
                            </template>
                        </td>
                        <!--Tab 2 Growth 2 -->
                        <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05 text-left pl-per02"  nowrap>
                            <template v-if="adjustdetail[rowIndex]">
                                <label v-if="adjustdetail[rowIndex].growth1>0" class="-font-9 font-green"  > 
                                    <md-icon class="-font-12 font-green -width-icon" >arrow_drop_up</md-icon>
                                        {{floatFormat(adjustdetail[rowIndex].growth1)}}%
                                </label>
                                <label v-else class="-font-9 -redsummary" > 
                                    <md-icon class="-font-12 -redsummary -width-icon">arrow_drop_down</md-icon> 
                                    {{floatFormat(adjustdetail[rowIndex].growth1)}}%
                                    </label>
                            </template>
                        </td>
                        <!--Tab 2 Ratio 2 -->
                        <td v-if="!showTab" class="-bg-gray-EF -width-ratio pr-per2 pl-per05">
                            <template v-if="adjustdetail[rowIndex]">
                                <ratio-input v-model="adjustdetail[rowIndex].ratio1"    index="1" :table="index" :indexDetail="rowIndex" :code="row.id" type="detail"></ratio-input>
                            </template>
                        </td>
                        <!--Tab 2 Target 3 -->
                        <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 -paddingOne-line pr-per1" nowrap>
                            <template v-if="adjustdetail[rowIndex]">{{formatNumber(adjustdetail[rowIndex].adjust_target2,0)}}</template>
                        </td>
                        <!--Tab 2 Adjust 3 -->
                        <td v-if="!showTab" class="-bg-gray-EF -width-adjusts  pl-per05 pr-per05" >
                            <template v-if="adjustdetail[rowIndex]">
                            <adjust-input v-model="adjustdetail[rowIndex].adjust2"    :table="index" index="2" :indexDetail="rowIndex" :code="row.id" type="detail"></adjust-input>
                            </template>
                        </td>
                        <!--Tab 2 Growth 3 -->
                        <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05 text-left" nowrap>
                            <template v-if="adjustdetail[rowIndex]">
                                <label v-if="adjustdetail[rowIndex].growth2>0" class="-font-9 font-green"  > 
                                    <md-icon class="-font-12 font-green -width-icon">arrow_drop_up</md-icon>
                                        {{floatFormat(adjustdetail[rowIndex].growth2)}}%
                                </label>
                                <label v-else class="-font-9 -redsummary" > 
                                    <md-icon class="-font-12 -redsummary -width-icon" >arrow_drop_down</md-icon> 
                                    {{floatFormat(adjustdetail[rowIndex].growth2)}}%
                                    </label>
                            </template>
                        </td>
                        <!--Tab 2 Ratio 3 -->
                        <td v-if="!showTab" class="-bg-gray-EF -width-ratio pr-per05 pl-per05" >
                            <template v-if="adjustdetail[rowIndex]">
                                <ratio-input v-model="adjustdetail[rowIndex].ratio2"    index="2" :table="index" :indexDetail="rowIndex" :code="row.id" type="detail"></ratio-input>
                            </template>
                        </td>  
                    <!--End tab 2 -->
                    <td class="-bg-gray-EF showDlgComment text-center" id="showDlgCommentTable2">
                        <div :id="'showIcon_' + rowIndex + valueTable" class="unvisible-tag" >
                            <md-button  class="md-icon-button  ml-0" @click="openComment(row.id,rowIndex, row)">
                                <md-avatar v-if="comments[row.id]"  class="md-avatar-icon _icon-status -large icn-orange">
                                    <md-icon class="-white -font-14 pt-5 mr-icon-comment table2" >mode_comment</md-icon>
                                </md-avatar>
                                <md-avatar v-else  class="md-avatar-icon _icon-status -large icn-gray">
                                    <md-icon class="-white -font-14 pt-5 mr-icon-comment table2" >mode_comment</md-icon>
                                </md-avatar>
                            </md-button>
                        </div>
                    </td>
                </tr>
                <!--Row Total-->
                <tr v-if="showTotal">
                <td></td>
                    <!--Start tab 1 -->
                    <!--Sum Target 1 -->
                        <td v-if="showTab" class="-font-12 -gray-A8 -paddingTwo-line  pr-per02" nowrap>
                            {{intFormat(rowTotal.target_total)}}
                            <div  class="-font-10  -gray-72 position-hover">Achieved: {{intFormat(rowTotal.achieved_total)}}%</div>
                        </td>
                        <!--Sum Sales 1 -->
                        <td v-if="showTab"  class="-font-12 -gray-A8 -paddingTwo-line" nowrap>
                            {{intFormat(rowTotal.sales_total)}}
                        </td>
                        <!--Sum Growth 1 -->
                        <td v-if="showTab" nowrap  class="text-left" >
                            <label v-if="rowTotal.growth_total>=100" class="-font-9 font-green" > 
                            <md-icon class="-font-12 font-green -width-icon" >arrow_drop_up</md-icon>
                                {{floatFormat(rowTotal.growth_total)}}%
                            </label>
                            <label v-else class="-font-9 -redsummary" > 
                                <md-icon class="-font-12 -redsummary -width-icon">arrow_drop_down</md-icon> 
                                {{floatFormat(rowTotal.growth_total)}}%
                            </label>
                        </td>
                        <!--Sum Ratio 1 -->
                        <td v-if="showTab" class="-font-12 -gray-A8 text-left pr-per2 width-55"  nowrap>
                            {{floatFormat(rowTotal.ratio_total)}}%</td>
                        <!--Sum Target 2 -->
                        <td v-if="showTab" class="-font-12 -gray-A8 -paddingTwo-line pr-per02"  nowrap>
                            {{intFormat(rowTotal.target_month)}}
                            <div  class="-font-10  -gray-72 position-hover" >Achieved: {{intFormat(rowTotal.achieved_month)}}%</div>
                        </td>
                        <!--Sum Sales 2 -->
                        <td v-if="showTab" class="-font-12 -gray-A8 -paddingTwo-line">
                            {{intFormat(rowTotal.sales_month)}}
                        </td>
                        <!--Sum Growth 2 -->
                        <td v-if="showTab" class="pr-per02 text-left"  nowrap >
                            <label v-if="rowTotal.growth_month>=100" class="-font-9 font-green" > 
                            <md-icon class="-font-12 font-green -width-icon" >arrow_drop_up</md-icon>
                                {{floatFormat(rowTotal.growth_month)}}%
                            </label>
                            <label v-else class="-font-9 -redsummary" > 
                                <md-icon class="-font-12 -redsummary -width-icon">arrow_drop_down</md-icon> 
                                {{floatFormat(rowTotal.growth_month)}}%
                            </label>
                        </td>
                        <!--Sum Ratio 2 -->
                        <td v-if="showTab" class="-font-12 -gray-A8 text-left pr-per2 width-55 "  nowrap>
                            {{floatFormat(rowTotal.ratio_month)}}%
                        </td>

                        <!--Sum Target 3 -->
                        <td class="-font-12 -gray-41 -bg-gray-EF -paddingTwo-line pl-per01 pr-per02" nowrap>
                            {{call_total_detail(rowTotal.adjust_target ,rowTotal.adjust)}}

                           <md-layout>
                                 <div style=" padding:1px 0px 0 0 ;width: 30%; margin-right:0px;background-color:"> 
                                    <md-icon v-if="this.iconStatus_detail == 'positive'" style="color:#66BB6A;font-size:16px">add_circle</md-icon>
                                    <md-icon v-else-if="this.iconStatus_detail == 'negative'" style="color:red;font-size:16px">remove_circle</md-icon>
                                    <md-tooltip v-if="this.txt_tooltip != '' "   md-direction="top">{{rowTotal.check_desc}}{{' '}}{{this.txt_tooltip}}</md-tooltip>
                                 </div>
                                <div style="padding:0;text-align:center;background-color:;width: 10%;" > 
                                   {{formatNumber(rowTotal.adjust_target,0)}}
                                </div>
                                </md-layout>

                        </td>
                        <!--Sum Adjusted 3 -->
                        <td  class="-bg-gray-EF -width-adjust">
                            <adjust-input v-model="rowTotal.adjust"    :table="index" index="0" type="total"></adjust-input>
                        </td>
                        <!--Sum Growth 3 -->
                        <td class="-bg-gray-EF -gray-41 pl-per02 width-55 text-left pl-per02" nowrap>
                            <label class="-font-9 font-green" v-if="rowTotal.growth>0">
                            <md-icon class="-font-12 font-green -width-icon">arrow_drop_up</md-icon>
                                {{floatFormat(rowTotal.growth)}}%
                            </label>
                            <label v-else class="-font-9 -redsummary" > 
                                <md-icon class="-font-12 -redsummary -width-icon" >arrow_drop_down</md-icon> 
                                {{floatFormat(rowTotal.growth)}}%
                            </label>
                        </td>
                        <!--Sum Ratio 3 -->
                        <td class="-bg-gray-EF -width-ratio pl-per05 -font-12 text-left">
                            {{floatFormat(rowTotal.total_ratio)}}%
                            <!-- <ratio-input v-model="rowTotal.total_ratio" :disabled="true" :table="index" index="0" type="total"></ratio-input> -->
                        </td>
                        <!--Sum Sales 3 -->
                        <td class="-font-12 -bg-gray-EF -gray-41 pr-per1 -paddingTwo-line"  nowrap>
                            {{intFormat(rowTotal.adjust_sale)}}
                            <div class="-font-10  text-left -gray-72 position-hover">
                                Success: {{intFormat(rowTotal.success)}}%
                            </div>
                        </td>
                    <!--End tab 1 -->
                    <!--Start tab 2 -->
                        
                        <!--Sum Tab 2 Target 2 -->
                        <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05 -paddingOne-line"  nowrap>
                            {{formatNumber(rowTotal.adjust_target1,0)}}
                        </td>
                        <!--Sum Tab 2 Adjust 2 -->
                        <td v-if="!showTab" class="-bg-gray-EF -width-adjust pr-per05">
                            <adjust-input v-model="rowTotal.adjust1"    :table="index" index="1" type="total"></adjust-input>
                        </td>
                        <!--Sum Tab 2 Growth 2 -->
                        <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05 text-left"  nowrap>
                            <label v-if="rowTotal.growth_total>=100" class="-font-9 font-green" > 
                            <md-icon class="-font-12 font-green -width-icon">arrow_drop_up</md-icon>
                                {{floatFormat(rowTotal.growth_total)}}%
                            </label>
                            <label v-else class="-font-9 -redsummary" > 
                                <md-icon class="-font-12 -redsummary -width-icon" >arrow_drop_down</md-icon> 
                                {{floatFormat(rowTotal.growth_total)}}%
                            </label>
                        </td>
                        <!--Sum Tab 2 Ratio 2 -->
                        <td v-if="!showTab" class="-bg-gray-EF -width-ratio pr-per2 pl-per05 -font-12 text-left">
                            {{floatFormat(rowTotal.total_ratio1)}}%
                            <!-- <ratio-input v-model="rowTotal.total_ratio1" :table="index"    index="1" type="total"></ratio-input> -->
                        </td>
                        <!--Sum Tab 2 Target 3 -->
                        <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 -paddingOne-line pr-per1"  nowrap>
                            {{formatNumber(rowTotal.adjust_target2,0)}}
                        </td>
                        <!--Sum Tab 2 Adjust 3 -->
                        <td v-if="!showTab" class="-bg-gray-EF -width-adjusts  pl-per05 pr-per05" >
                            <adjust-input v-model="rowTotal.adjust2"    :table="index" index="2" type="total"></adjust-input>
                        </td>
                        <!--Sum Tab 2 Growth 3 -->
                        <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05 text-left"  nowrap>
                            <label v-if="rowTotal.growth_total>=100" class="-font-9 font-green" > 
                            <md-icon class="-font-12 font-green -width-icon">arrow_drop_up</md-icon>
                                {{floatFormat(rowTotal.growth_total)}}%
                            </label>
                            <label v-else class="-font-9 -redsummary" > 
                                <md-icon class="-font-12 -redsummary -width-icon">arrow_drop_down</md-icon> 
                                {{floatFormat(rowTotal.growth_total)}}%
                            </label>
                        </td>
                        <!--Sum Tab 2 Ratio 3 -->
                        <td v-if="!showTab" class="-bg-gray-EF -width-ratio pr-per05 pl-per05 -font-12 text-left">
                            {{floatFormat(rowTotal.total_ratio2)}}%
                            <!-- <ratio-input v-model="rowTotal.total_ratio2" :table="index"    index="2" type="total"></ratio-input> -->
                            
                        </td>
                    <!--End tab 2 -->
                    <td class="-bg-gray-EF"></td>
                </tr>
            </table>
        </div>
        <comment-table v-click-outside="outsideComment" @closeComment="setCloseComment" 
            v-if="show_comment" :style="{top: morePos2.top + 'px'}">
        </comment-table>
             </div>

         </md-layout>
            
    </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'; 
import VueSticky from 'vue-sticky'
    export default {
        computed: {
            ...mapGetters({ viewId: 'getViewById' ,
                            loadTotal: 'getLoadTotal',
                            loadDetail: 'getLoadDetail',
                            total_page: 'getTotalPage',
                            totalLabel: 'getTotalLabel',
                            monthLabel: 'getMonthLabel',
                            comments: 'getComments',
                            monthAdjust: 'getMonthAdjust',
                            load_step3: 'getLoadStep3',
                           
            }),
            headDetail(){
                return this.$store.getters.getHeadDetailByIndex(this.index);
            },
            items_detail(){
                return this.$store.getters.getDetailDataByIndex(this.index);
            },
            sumtotal(){
                return this.$store.getters.getSumTotalDetail(this.index);
            },
            sumprevmonth(){
              
                return this.$store.getters.getSumPrevMonthDetail(this.index);
            },
            adjustdetail(){
                // console.log(' => ',this.$store.getters.getAdjustMonthDetail(this.index));
                return this.$store.getters.getAdjustMonthDetail(this.index);
            },
            showTotal(){
                return this.$store.getters.getShowTotalDetail(this.index);
            },
            rowTotal(){
                // console.log("rowTotal",this.$store.getters.getRowTotalDetail(this.index));
                return this.$store.getters.getRowTotalDetail(this.index);
            },
            keepExpand(){
                return this.$store.getters.keepExpand;
            }
        },
        created(){
            
            /* if(this.load_step3==true){
                console.log("created load_step3 ===>")
            this.$store.dispatch('getSumDetailService',{
                index:0,
                // index:this.index,
                total_page:1,
                insertType:'new',
                organize_type:this.$store.getters.options_organize_selected,
                organizes:this.$store.getters.organizes_data,
                product_type:this.$store.getters.options_product_selected,
                products_uncheck:this.$store.getters.products_uncheck,
                product_keyword:this.$store.getters.product_keyword,
                product_selected:this.$store.getters.product_selected,
                product_checkall:this.$store.getters.product_checkall,
                viewby:this.$store.getters.getViewById,
                totaltype:this.$store.getters.getTotalType,
                totalfirst:this.$store.getters.getTotalFirst,
                totalsecond:this.$store.getters.getTotalSecond,
                monthfirst:this.$store.getters.getMonthFirst,
                monthsecond:this.$store.getters.getMonthSecond,
            }); */
            // }
        },
        components : {
            'adjust-input' : require('./adjust-input'),
            'ratio-input' : require('./ratio-input'),
            'comment-table' : require('./comment-table'),
            'dialog-balance' : require('./dialog-balance'),
        },
         props : {
            index : {},
            value : {}
        },
        data () {
            return {
                currencyValue:0,
                showTab : true,
                txtComment : '',
                valueTable:this.index,
                morePos2 : {
                    top: 0,
                    left : 0,
                },
                show_comment:false,
                loading:false,
                iconStatus_detail:'',
                txt_tooltip:'',
                status_box:'',
                cal_data:false,
                title_name:'',
                val_traget:''
            }
        },
        
        methods : {
            ...mapActions([
                'selectedViewBy',
            ]),
            mouseOver(rowIndex , key){
                // if(key == false){
                    var x = document.getElementById("showIcon_" + rowIndex+ this.valueTable);
                    if(x!=null){
                        x.classList.remove("unvisible-tag");
                        x.classList.add("visible-tag");
                    }
                // }
                var b = document.getElementById("dataSuceesSaleMonth_" + rowIndex + this.valueTable);
                if( this.showTab == false){
                    if(b!=null){
                        b.classList.remove("unvisible-tag");
                        b.classList.add("visible-tag");
                    }
                }else{
                    var y = document.getElementById("dataAchievedTotal_" + rowIndex +  this.valueTable);
                    var z = document.getElementById("dataAchievedMonth_" + rowIndex  +  this.valueTable);
                    if(b!=null){
                        b.classList.remove("unvisible-tag");
                        b.classList.add("visible-tag");
                    }
                    if(z!=null){
                        z.classList.remove("unvisible-tag");
                        z.classList.add("visible-tag");
                    }  
                    if(y!=null){
                        y.classList.remove("unvisible-tag");
                        y.classList.add("visible-tag");
                    }
                }  
            },
            balance( param ){
              this.val_traget = this.rowTotal.adjust_target
              this.title_name = param.id+' : '+ param.name
              this.cal_data = true
              this.$refs['dialog-view-balance'].open()
            },dialog_close_balance(){
              this.cal_data = false
              this.$refs['dialog-view-balance'].close()
            },
            
            check_role_detail(param_target , max_value , index , check){
                console.log("check_role_detail", index);
                let error = 0
               
                if(param_target<max_value && param_target != max_value){
                    this.adjustdetail[index].checked = true
                    // error +=1

                }else {
                    this.adjustdetail[index].checked = false
                }
                        // if(error != 0){
                        //     this.headDetail.status = false
                        //     // console.log('yes')
                        // }else {
                        //     this.headDetail.status = true
                        // }
                // console.log(error)

            },
            mouseOut(rowIndex , key){
                // if(key == false){
                    var x = document.getElementById("showIcon_" + rowIndex + this.valueTable);
                    if(x!=null){
                        x.classList.remove("visible-tag");
                        x.classList.add("unvisible-tag");
                    }
                // }
                var b = document.getElementById("dataSuceesSaleMonth_" + rowIndex + this.valueTable);
                if( this.showTab == false){
                    // ตารางสอง
                    if(b!=null){
                        b.classList.remove("visible-tag");
                        b.classList.add("unvisible-tag");
                    }
                }else{
                    // ตารางแรก
                    var y = document.getElementById("dataAchievedTotal_" + rowIndex +  this.valueTable);
                    var z = document.getElementById("dataAchievedMonth_" + rowIndex +  this.valueTable);
                    if(y!=null){
                        y.classList.remove("visible-tag");
                        y.classList.add("unvisible-tag");
                    }
                    if(z!=null){
                        z.classList.remove("visible-tag");
                        z.classList.add("unvisible-tag");
                    }
                    if(b!=null){
                        b.classList.remove("visible-tag");
                        b.classList.add("unvisible-tag");
                    }
                    // a.classList.remove("visible-tag");
                    // a.classList.add("unvisible-tag");
                  
                }
            },
            computePos (target) {
                let eventRect = target.getBoundingClientRect()
                let pageRect = document.getElementById("showDlgCommentTable2").getBoundingClientRect();
                let page = document.getElementById("table2_"+  this.valueTable).getBoundingClientRect();
                return {
                    left : eventRect.left - pageRect.left,
				    top  : (page.height - pageRect.top) + eventRect.top + 65
                }
		    },
            openComment(id,item , row) {
                this.morePos2 = this.computePos(event.target);
                this.$store.dispatch('setCommentShow',id); 
                setTimeout(() => {
                    this.show_comment = true;
                }, 500);
                this.getNotification();
            },
            setCloseComment() {
                this.show_comment = false;
            },
            showTable(item){
                if( this.showTab == false){
                    this.showTab = true;
                }else{
                    this.showTab = false;
                }
            },
            showLine(){
                this.loading = true
                if( this.keepExpand == this.headDetail.id){
                    this.$store.commit("SET_EXPAND" , '')
                    this.loading = false
                }else{
                    this.$store.commit("SET_EXPAND" , this.headDetail.id)
                    this.loading = false
                }
            },
            createTagNotification(value){
                var d1 = document.getElementById('pagePerformance');
                var x = document.getElementsByClassName("roundnoti");
                if(x.length == 0){
                    var sumtxt = '<div id="roundnoti" class="roundnoti">'
                        sumtxt += '<span id="notificate" class="latoFont">'+ value +'</span>'
                        sumtxt += '</div>';
                    d1.insertAdjacentHTML('afterend', sumtxt);
                    var callFunc = this;
                    document.getElementById("roundnoti").addEventListener("click", function(){
                        callFunc.getNotification();
                    });
                }else{
                    document.getElementById("notificate").innerText = value
                }
            }, 
            getNotification(){
                var x = document.getElementsByClassName("roundnoti");
                if(x.length>0){
                    var countNoti = document.getElementById("notificate").innerText;
                    var checkVal = (parseInt(countNoti) >=1) ?  parseInt(countNoti) - 1 : 0
                    if(checkVal == 0){
                    x[0].remove(x.selectedIndex);
                    }else{
                        document.getElementById("notificate").innerText = checkVal;
                    }
                }
            },
            outsideComment: function (e) {
                if(e.target.className=='md-icon -white -font-14 pt-5 mr-icon-comment table2 md-theme-default material-icons'){
                  if(this.show_comment == true){
                     this.show_comment = false;
                  }
                }
                if(e.target.className!='md-icon -white -font-14 pt-5 mr-icon-comment table2 md-theme-default material-icons'){
                     this.show_comment = false;
                }
            },
            floatFormat(val){
                return parseFloat(val).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
            },
            intFormat(val){
                return parseInt(val).toLocaleString();
            },
          
            formatNumber(value, dicimal) {
                if (isNaN(parseFloat(value))) {
                    return value;
                } else {
                    if (value % 1 == 0) {
                        return parseFloat(value).toLocaleString(undefined, {
                            minimumFractionDigits: dicimal,
                            maximumFractionDigits: dicimal
                        });
                    } else {
                        let parts = value.toString().split(".");
                        let num = (parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        let rs = 0;
                        if(dicimal == 0){
                            rs = num;
                        }else{
                            let digit = parts[1].slice(0, dicimal);
                            digit = (digit.length < 2) ? digit + "0" : digit;
                            rs = num + "." + digit;
                        }
                        
                        // let comma = parseFloat(rs.replace(',', ''));
                        // return Math.round(parseFloat(comma) * 100) / 100;
                        return rs;
                    }
                }
            },call_total_detail(total_target ,total_adjust ){
                  var mark =''
                if(total_adjust - total_target > 0 ){
                    // console.log("+")
                    this.txt_tooltip = '+'+this.floatFormat(total_adjust -total_target)
                    this.iconStatus_detail ='positive'
                    mark = "+"
                }else if(total_adjust -total_target < 0) {
                     this.txt_tooltip = this.floatFormat(total_adjust -total_target)
                    //  console.log("-")
                    this.iconStatus_detail ='negative'
                }else {
                     this.txt_tooltip = ''
                    this.iconStatus_detail = ''
                    // console.log("=")
                }
            },
    },
        directives: {
        'click-outside': {
            bind: function(el, binding, vNode) {
                // Provided expression must evaluate to a function.
                if (typeof binding.value !== 'function') {
                const compName = vNode.context.name
                let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
                if (compName) { warn += `Found in component '${compName}'` }
                }
                // Define Handler and cache it on the element
                const bubble = binding.modifiers.bubble
                const handler = (e) => {
                if (bubble || (!el.contains(e.target) && el !== e.target)) {
                    binding.value(e)
                }
                }
                el.__vueClickOutside__ = handler

                // add Event Listeners
                document.addEventListener('click', handler)
            },
            unbind: function(el, binding) {
                // Remove Event Listeners
                document.removeEventListener('click', el.__vueClickOutside__)
                el.__vueClickOutside__ = null
            }
        },
        sticky: VueSticky
     }
    }
</script>
