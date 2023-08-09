<template>
     <md-layout >
         <div style="width: 2%;padding-top:10px">
             <!-- <md-icon style="color:red">cancel</md-icon> -->
             </div>
             <div style="width: 0.5%;"></div>

            <div style="max-height: 400px;width: 97.5%;" class="mb-40 crad-bg style-scroll ">
                <table v-if="items.length == 0"> 
                </table>
<!-- Dialog -->
         <md-dialog     
         ref="dialog-Back-to-Target" style="margin:unset">
        <md-dialog-title style=" font-size:14px;color:#727272">
            
        </md-dialog-title>
      <md-dialog-content style="padding:0 20px 0 20px ;background-color:; width: 360px ; height: 80px;;"> 
          Confirmation, the adjusted data will be overwritten
            with the original target.
      </md-dialog-content>
          <md-dialog-actions>
            <md-button style="text-transform: none;" class="" @click="closeDialog('close')">Cancel</md-button>
            <md-button style="
            background: #A8A8A880 0% 0% no-repeat padding-box;
            opacity: 1;
            text-transform: none;" 
            class="md-primary" @click="closeDialog('Confirm')">Confirm</md-button>
          </md-dialog-actions>
        </md-dialog>
<!-- End Dialog  -->
                <table style="overflow-y: scroll;" v-if="items.length > 0"  id="res" class="latoFont text-left" >
                    <tr
                     
                     class="-font-18 -gray-41 height-50;" >
                        <td class="pl-15 pt-15 pb-0 font-bold" style="width: 0%;">Collected Data</td>
                        <td  v-if="showTab" colspan="8" class="text-right">
                            <!-- <md-icon class="mr-16 color-black">add</md-icon> -->
                        </td>
                        <td v-if="!showTab" colspan="8" class="-bg-gray-EF"></td>
                        <td  class="-bg-gray-EF -gray-72 pr-20 text-right" colspan="6" >
                          

                        <md-menu  md-size="4" md-direction="bottom left">
                          <md-button class="md-icon-button" md-menu-trigger>
                            <md-icon>more_vert</md-icon>
                          </md-button>
                          <md-menu-content>
                            <md-menu-item @click="openDialog()">
                              <span >Back To Target</span>
                            </md-menu-item>
                          </md-menu-content>
                        </md-menu>
                            <span  @click="showTable" class="pt-15 mr-14 -pointer" >
                                <md-icon style="padding-top:7px" class="-font-25 color-black"  v-if="showTab">fullscreen
                                    <md-tooltip md-direction="top">expand</md-tooltip>
                                </md-icon>
                                <!-- <md-icon class="-font-25 color-black" v-if="!showTab">fullscreen_exit
                                    <md-tooltip md-direction="top">collapse</md-tooltip>
                                </md-icon> -->
                                 <md-icon style="padding-top:7px" class="-font-25 color-black" v-if="!showTab">fullscreen_exit
                                    <md-tooltip md-direction="top">collapse</md-tooltip>
                                </md-icon>
                            </span>
                            <!-- <md-icon class="-font-25 -pointer color-black" >more_vert</md-icon> -->
                        </td>
                    </tr>
                    <!--Row select-->
                    <tr >
                        <td></td>
                        <td style="position: relative;" v-if="showTab" class="-gray-72 pb-40 text-left" colspan="4">
                            <nested-total-dp></nested-total-dp>
                        </td>
                        <td style="position: relative;" v-if="showTab" class="-gray-72  pb-40 text-left" colspan="4" >
                            <nested-month-dp></nested-month-dp>
                        </td>
                        <td v-if="showTab"  class="text-left pl-per2 pb-5 -font-14 year-head" colspan="6">{{monthAdjust[0]}}</td>
                        <td v-if="!showTab" class="pl-10 pb-15 -font-14 year-head" colspan="5">{{monthAdjust[0]}}</td>
                        <td v-if="!showTab" class="pb-15 -font-14 year-head" colspan="4">{{monthAdjust[1]}}</td>
                        <td v-if="!showTab" class="pb-15 -font-14 year-head" colspan="4">{{monthAdjust[2]}}</td>
                        <td v-if="!showTab" class="-bg-gray-EF" ></td>
                    </tr>
                    <!--Row head-->
                    <tr 
                    style="background-color:#fff;height: 30px;"  
                     v-sticky="{ zIndex: 1, stickyTop: 0 }"
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
                    <tr  v-for="(row, rowIndex) in items" v-on:mouseover= "mouseOver(rowIndex , row.comment)"  v-on:mouseout= "mouseOut(rowIndex , row.comment)" class="rowsTable">
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
                            <td class="-paddingTwo-line pr-per02 -font-12 -gray-A8"  v-if="showTab" nowrap>
                                <template v-if="sumtotal[rowIndex]">
                                    {{intFormat(sumtotal[rowIndex].target_total)}}
                                    <div :id="'achievedTotal_' + rowIndex" class="unvisible-tag -font-10 -gray-72 position-hover" >
                                        Achieved: {{intFormat(sumtotal[rowIndex].achieved_total)}}%
                                    </div>
                                </template>
                            </td>
                        <!--Sales 1 -->
                            <td v-if="showTab" class="-font-12 -gray-A8 -paddingTwo-line"  nowrap> 
                               <template v-if="sumtotal[rowIndex]">{{intFormat(sumtotal[rowIndex].sales_total)}}</template>
                            </td>
                        <!--Growth 1 -->
                            <td v-if="showTab" nowrap class="text-left">
                            <template v-if="sumtotal[rowIndex]">
                                <label v-if="sumtotal[rowIndex].growth_total>0" class="-font-9 font-green"  > 
                                    <md-icon class="-font-12 font-green -width-icon">arrow_drop_up</md-icon>
                                        {{floatFormat(sumtotal[rowIndex].growth_total)}}%
                                </label>
                                <label v-else class="-font-9 -redsummary" > 
                                    <md-icon class="-font-12 -redsummary -width-icon" >arrow_drop_down</md-icon> 
                                    {{floatFormat(sumtotal[rowIndex].growth_total)}}%
                                </label>
                            </template>
                            </td>
                        <!--Ratio 1 -->
                            <td v-if="showTab" class="-font-12 -gray-A8 text-left width-30"  style="padding-right: 10px;">
                                <template v-if="sumtotal[rowIndex]">{{floatFormat(sumtotal[rowIndex].ratio_total)}}%</template>
                            </td>
                        <!--Target 2 -->
                            <td class="-font-12 -gray-A8 -paddingTwo-line pr-per02"  v-if="showTab" nowrap>
                                <template v-if="sumprevmonth[rowIndex]">
                                    {{intFormat(sumprevmonth[rowIndex].target_month)}}
                                    <div :id="'achievedMonth_' + rowIndex" class="unvisible-tag -font-10 -gray-72 position-hover" >
                                        Achieved: {{intFormat(sumprevmonth[rowIndex].achieved_month)}}%
                                    </div>
                                </template>
                            </td>
                        <!--Sales 2 -->
                            <td v-if="showTab" class="-font-12 -gray-A8 -paddingTwo-line" nowrap>
                                <template v-if="sumprevmonth[rowIndex]">{{intFormat(sumprevmonth[rowIndex].sales_month)}}</template>
                            </td>
                        <!--Growth 2 -->
                            <td v-if="showTab" class="pr-per0 text-left"  nowrap style=";width:55px">
                                <template v-if="sumprevmonth[rowIndex]">
                                    <label v-if="sumprevmonth[rowIndex].growth_month>0" class="-font-9 font-green"  > 
                                    <md-icon class="-font-12 font-green -width-icon">arrow_drop_up</md-icon>
                                        {{floatFormat(sumprevmonth[rowIndex].growth_month)}}%
                                    </label>
                                    <label v-else class="-font-9 -redsummary" > 
                                        <md-icon class="-font-12 -redsummary -width-icon">arrow_drop_down</md-icon> 
                                        {{floatFormat(sumprevmonth[rowIndex].growth_month)}}%
                                    </label>
                                </template>
                            </td>
                        <!--Ratio 2 -->
                            <td v-if="showTab" class="-font-12 -gray-A8 text-left " style="padding-right:10px;width:60px">
                                <template v-if="sumprevmonth[rowIndex]">{{floatFormat(sumprevmonth[rowIndex].ratio_month) }}%</template>
                            </td>
                        <!--Target 3 -->
                            <td  class="-bg-gray-EF -font-12 -gray-41 pr-per05 pl-per1 -paddingTwo-line" nowrap  >
                               <template v-if="rowAdjust[rowIndex]">
                                      {{formatNumber(rowAdjust[rowIndex].adjust_target,0)}} 
                                  
                               </template>
                            </td> 
                        <!--Adjusted 3 -->
                            <td class="-bg-gray-EF -width-adjust" >
                                <template v-if="rowAdjust[rowIndex]">
                                    <adjust-input v-model="rowAdjust[rowIndex].adjust" index="0" table="-1" :indexDetail="rowIndex" :code="row.id" type="detail"></adjust-input>
                                </template>
                            </td>
                        <!--Growth 3 -->
                            <td  class="-bg-gray-EF pr-per0 text-left pl-per01" nowrap >
                                <template v-if="rowAdjust[rowIndex]">
                                    <label v-if="rowAdjust[rowIndex].growth>0" class="-font-9 font-green"  > 
                                        <md-icon class="-font-12 font-green -width-icon" >arrow_drop_up</md-icon>
                                            {{floatFormat(rowAdjust[rowIndex].growth)}}%
                                    </label>
                                    <label v-else class="-font-9 -redsummary" > 
                                        <md-icon class="-font-12 -redsummary -width-icon">arrow_drop_down</md-icon> 
                                        {{floatFormat(rowAdjust[rowIndex].growth)}}%
                                        </label>
                                </template>
                            </td>
                        <!--Ratio 3 -->
                            <td  class="-bg-gray-EF" style="width:60px;padding-right:5px">
                                <template v-if="rowAdjust[rowIndex]">
                                    <ratio-input v-model="rowAdjust[rowIndex].ratio" index="0" table="-1" :indexDetail="rowIndex" :code="row.id" type="detail"></ratio-input>
                                </template>
                            </td>
                        <!--Sales 3 -->
                          <td  class="-font-12 -bg-gray-EF -gray-41 -paddingTwo-line pr-per1 " nowrap>
                                <template v-if="rowAdjust[rowIndex]">
                                {{intFormat(rowAdjust[rowIndex].adjust_sale)}}
                                <div :id="'suceesSaleMonth_' + rowIndex" class="unvisible-tag -font-10 -gray-72 text-left position-hover" >
                                    Success: {{intFormat(rowAdjust[rowIndex].success)}}%
                                </div>
                                </template>
                                
                            </td>
                        <!--End tab 1 -->
                        <!--Start tab 2 -->
                            <!--Tab 2 Target 2 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05 -paddingOne-line" nowrap>
                               <template v-if="rowAdjust[rowIndex]">
                               {{formatNumber(rowAdjust[rowIndex].adjust_target1,0)}}
                               </template>
                            </td>
                            <!--Tab 2 Adjust 2 -->
                            <td v-if="!showTab" class="-bg-gray-EF -width-adjust pr-per05"  >
                                <template v-if="rowAdjust[rowIndex]">
                                    <adjust-input v-model="rowAdjust[rowIndex].adjust1" table="-1" index="1" :indexDetail="rowIndex" :code="row.id" type="detail"></adjust-input>
                                </template>
                            </td>
                            <!--Tab 2 Growth 2 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05  text-left" nowrap>
                                <template v-if="rowAdjust[rowIndex]">
                                    <label v-if="rowAdjust[rowIndex].growth1>0" class="-font-9 font-green"  > 
                                        <md-icon class="-font-12 font-green -width-icon" >arrow_drop_up</md-icon>
                                            {{floatFormat(rowAdjust[rowIndex].growth1)}}%
                                    </label>
                                    <label v-else class="-font-9 -redsummary" > 
                                        <md-icon class="-font-12 -redsummary -width-icon">arrow_drop_down</md-icon> 
                                        {{floatFormat(rowAdjust[rowIndex].growth1)}}%
                                        </label>
                                </template>
                            </td>
                            <!--Tab 2 Ratio 2 -->
                            <td v-if="!showTab" class="-bg-gray-EF -width-ratio pr-per2 pl-per05" >
                                <template v-if="rowAdjust[rowIndex]">
                                    <ratio-input v-model="rowAdjust[rowIndex].ratio1" index="1" table="-1" :indexDetail="rowIndex" :code="row.id" type="detail"></ratio-input>
                                </template>
                            </td>
                            <!--Tab 2 Target 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per1  -paddingOne-line" nowrap>
                                <template v-if="rowAdjust[rowIndex]">
                                {{formatNumber(rowAdjust[rowIndex].adjust_target2,0)}}
                                </template>
                            </td>
                            <!--Tab 2 Adjust 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF -width-adjusts  pl-per05 pr-per05"  >
                                <template v-if="rowAdjust[rowIndex]">
                                    <adjust-input v-model="rowAdjust[rowIndex].adjust2" table="-1" index="2" :indexDetail="rowIndex" :code="row.id" type="detail"></adjust-input>
                                </template>
                            </td>
                            <!--Tab 2 Growth 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05  text-left" nowrap>
                                <template v-if="rowAdjust[rowIndex]">
                                    <label v-if="rowAdjust[rowIndex].growth2>0" class="-font-9 font-green"  > 
                                        <md-icon class="-font-12 font-green -width-icon" >arrow_drop_up</md-icon>
                                            {{floatFormat(rowAdjust[rowIndex].growth2)}}%
                                    </label>
                                    <label v-else class="-font-9 -redsummary" > 
                                        <md-icon class="-font-12 -redsummary -width-icon" >arrow_drop_down</md-icon> 
                                        {{floatFormat(rowAdjust[rowIndex].growth2)}}%
                                        </label>
                                </template>
                            </td>
                            <!--Tab 2 Ratio 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF -width-ratio pr-per05 pl-per05"  >
                                <template v-if="rowAdjust[rowIndex]">
                                    <ratio-input v-model="rowAdjust[rowIndex].ratio2" index="2" table="-1" :disabled="true" :indexDetail="rowIndex" :code="row.id" type="detail"></ratio-input>
                                </template>
                            </td>  
                        <!--End tab 2 -->
                        <td class="-bg-gray-EF showDlgComment text-center"  id="showDlgCommentTable1">
                            <div :id="'showIcons_' + rowIndex" :class="checkComment(comments[row.id])" >
                            <!-- <div :id="'showIcons_' + rowIndex" class="unvisible-tag" > -->
                                <md-button   class="md-icon-button  ml-0"  @click="openComment(row.id,rowIndex , row)">
                                    <md-avatar :class="checkColor(comments[row.id])">
                                        <md-icon class="-white -font-14 pt-5 mr-icon-comment" >mode_comment</md-icon>
                                    </md-avatar>
                                </md-button>
                            </div>
                        </td>
                    </tr>
                    <!--Row Total-->
                    <tr   v-if="showTotal">
                        <td></td>
                        <!--Start tab 1 -->
                        <!--Sum Target 1 -->
                            <td v-if="showTab" class="-font-12 -gray-A8 -paddingTwo-line pr-per02"  nowrap>
                                {{intFormat(rowTotal.target_total)}}
                                <div class="-font-10 -gray-72 position-hover" >Achieved: {{intFormat(rowTotal.achieved_total)}}%</div>
                            </td>
                            <!--Sum Sales 1 -->
                            <td v-if="showTab" class="-font-12 -gray-A8 -paddingTwo-line" nowrap>
                               {{intFormat(rowTotal.sales_total)}}
                            </td>
                            <!--Sum Growth 1 -->
                            <td v-if="showTab" nowrap class="text-left">
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
                            <td v-if="showTab" class="-font-12 -gray-A8 text-left width-55"  nowrap style="padding-right:10px">
                                {{floatFormat(rowTotal.ratio_total)}}%</td>
                            <!--Sum Target 2 -->
                            <td v-if="showTab" class="-font-12 -gray-A8 -paddingTwo-line pr-per02"  nowrap>
                                {{intFormat(rowTotal.target_month)}}
                                <div  class="-font-10  -gray-72 position-hover" >Achieved: {{intFormat(rowTotal.achieved_month)}}%</div>
                            </td>
                            <!--Sum Sales 2 -->
                            <td v-if="showTab" class="-font-12 -gray-A8 -paddingTwo-line" nowrap>
                               {{intFormat(rowTotal.sales_month)}}
                            </td>
                            <!--Sum Growth 2 -->
                            <td v-if="showTab" class="pr-per02 text-left"  nowrap>
                                <label v-if="rowTotal.growth_month>=100" class="-font-9 font-green" > 
                                <md-icon class="-font-12 font-green -width-icon">arrow_drop_up</md-icon>
                                    {{floatFormat(rowTotal.growth_month)}}%
                                </label>
                                <label v-else class="-font-9 -redsummary" > 
                                    <md-icon class="-font-12 -redsummary -width-icon" >arrow_drop_down</md-icon> 
                                    {{floatFormat(rowTotal.growth_month)}}%
                                </label>
                            </td>
                            <!--Sum Ratio 2 -->
                            <td v-if="showTab" class="-font-12 -gray-A8 text-left width-55"  style="padding-right:10px">
                                {{floatFormat(rowTotal.ratio_month)}}%
                            </td>
                            <!--Sum Target 3 -->
                            <td  style="background-color:red" class="-font-12 -gray-41 -bg-gray-EF pr-per05 pl-per01 -paddingTwo-line" nowrap>
                                <template  v-if="rowTotalAdjust[0]">
                                <md-layout>
                                    {{call_total(rowTotalAdjust[0].total_target ,rowTotalAdjust[0].total_adjust)}}
                                    <!-- {{rowTotalAdjust[0].total_target + " - " +rowTotalAdjust[0].total_adjust }} -->
                                 <div style="padding-top:2px;width: 25%; margin-right:0px;background-color:"> 
                                    <md-icon v-if="this.iconStatus == 'positive'" style="color:#66BB6A;font-size:16px">add_circle</md-icon>
                                    <md-icon v-else-if="this.iconStatus == 'negative'" style="color:red;font-size:18px">remove_circle</md-icon>
                                    <md-tooltip  v-if="this.txt_tooltip != '' " md-direction="top">{{rowTotalAdjust[0].check_desc}}{{' '}}{{this.txt_tooltip}}</md-tooltip>
                                 </div>
                                <div style="padding:0;text-align:center;background-color:;width: 10%;" > 
                                    {{formatNumber(rowTotalAdjust[0].total_target,0)}}
                                </div>
                                </md-layout>          
                                </template>
                            </td>
                            <!--Sum Adjusted 3 -->
                            <td class="-bg-gray-EF -width-adjust"  >
                                <template v-if="rowTotalAdjust[0]">
                                    <adjust-input v-model="rowTotalAdjust[0].total_adjust" table="-1" index="0" type="total"></adjust-input>
                                </template>
                            </td>
                            <!--Sum Growth 3 -->
                            <td class="-bg-gray-EF -gray-41 pl-per02 width-55 text-left"  nowrap>
                                <template v-if="rowTotalAdjust[0]">
                                    <label class="-font-9 font-green" v-if="rowTotalAdjust[0].total_growth > 0" >
                                    <md-icon class="-font-12 font-green -width-icon" >arrow_drop_up</md-icon>
                                        {{floatFormat(rowTotalAdjust[0].total_growth)}}%
                                    </label>
                                    <label v-else class="-font-9 -redsummary" > 
                                        <md-icon class="-font-12 -redsummary -width-icon">arrow_drop_down</md-icon> 
                                        {{floatFormat(rowTotalAdjust[0].total_growth)}}%
                                    </label>
                                </template>
                            </td>
                            <!--Sum Ratio 3 -->
                            <td  class="-bg-gray-EF -font-12 text-left width-30" style="width:55px">
                                <template v-if="rowTotalAdjust[0]">{{floatFormat(rowTotalAdjust[0].total_ratio)}}%
                                    <!-- <ratio-input v-model="rowTotalAdjust[0].total_ratio" table="-1" :disabled="true" index="0" type="total"></ratio-input> -->
                                </template>
                            </td>
                            <!--Sum Sales 3 -->
                            <td  class="-font-12 -gray-41 -bg-gray-EF pr-per1  -paddingTwo-line" nowrap >
                                <template v-if="rowTotalAdjust[0]">
                                 {{intFormat(rowTotalAdjust[0].total)}}
                                 <div  class="-font-10 text-left -gray-72 position-hover" >
                                    Success:{{intFormat(rowTotalAdjust[0].total_success)}}%
                                 </div>
                                </template>
                            </td>
                        <!--End tab 1 -->
                        <!--Start tab 2 -->
                            <!--Sum Tab 2 Target 2 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05 -paddingOne-line" nowrap>
                                 <template v-if="rowTotalAdjust[1]">
                                 {{formatNumber(rowTotalAdjust[1].total_target,0)}}
                                </template>
                            </td>
                            <!--Sum Tab 2 Adjust 2 -->
                            <td v-if="!showTab" class="-bg-gray-EF -width-adjust pr-per05">
                                <template v-if="rowTotalAdjust[1]">
                                    <adjust-input v-model="rowTotalAdjust[1].total_adjust" table="-1" index="1" type="total"></adjust-input>
                                </template>
                            </td>
                            <!--Sum Tab 2 Growth 2 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05  text-left"  nowrap>
                                <template v-if="rowTotalAdjust[1]">
                                    <label class="-font-9 font-green" v-if="rowTotalAdjust[1].total_growth > 0" >
                                    <md-icon class="-font-12 font-green -width-icon" >arrow_drop_up</md-icon>
                                        {{floatFormat(rowTotalAdjust[1].total_growth)}}%
                                    </label>
                                    <label v-else class="-font-9 -redsummary" > 
                                        <md-icon class="-font-12 -redsummary -width-icon">arrow_drop_down</md-icon> 
                                        {{floatFormat(rowTotalAdjust[1].total_growth)}}%
                                    </label>
                                </template>
                            </td>
                            <!--Sum Tab 2 Ratio 2 -->
                            <td v-if="!showTab" class="-bg-gray-EF pr-per2  -width-ratio pl-per05 -font-12 text-left">
                                <template v-if="rowTotalAdjust[1]">{{floatFormat(rowTotalAdjust[1].total_ratio)}}%
                                    <!-- <ratio-input v-model="rowTotalAdjust[1].total_ratio" table="-1" :disabled="true" index="1" type="total"></ratio-input> -->
                                </template>
                            </td>
                            <!--Sum Tab 2 Target 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per1 -paddingOne-line" nowrap>
                                <template v-if="rowTotalAdjust[2]">
                                 {{formatNumber(rowTotalAdjust[2].total_target,0)}}
                                </template>
                            </td>
                            <!--Sum Tab 2 Adjust 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF -width-adjusts  pl-per05 pr-per05" >
                                <template v-if="rowTotalAdjust[2]">
                                    <adjust-input v-model="rowTotalAdjust[2].total_adjust" table="-1" index="2" type="total"></adjust-input>
                                </template>
                            </td>
                            <!--Sum Tab 2 Growth 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05  text-left"  nowrap>
                                <template v-if="rowTotalAdjust[2]">
                                    <label class="-font-9 font-green" v-if="rowTotalAdjust[2].total_growth > 0" >
                                    <md-icon class="-font-12 font-green -width-icon" >arrow_drop_up</md-icon>
                                        {{floatFormat(rowTotalAdjust[2].total_growth)}}%
                                    </label>
                                    <label v-else class="-font-9 -redsummary" > 
                                        <md-icon class="-font-12 -redsummary -width-icon">arrow_drop_down</md-icon> 
                                        {{floatFormat(rowTotalAdjust[2].total_growth)}}%
                                    </label>
                                </template>
                            </td>
                            <!--Sum Tab 2 Ratio 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF  -width-ratio pr-per05 pl-per05 -font-12 text-left">
                                <template v-if="rowTotalAdjust[2]">{{floatFormat(rowTotalAdjust[1].total_ratio)}}%
                                    <!-- <ratio-input v-model="rowTotalAdjust[2].total_ratio" table="-1" :disabled="true" index="2" type="total"></ratio-input> -->
                                </template>
                            </td>
                        <!--End tab 2 -->
                        <td class="-bg-gray-EF"></td>
                    </tr>
                    <tr> <td nowrap="nowrap"></td></tr>
                </table>
            </div>
            <comment-table v-click-outside="outsideComment"  @closeComment="setCloseComment" 
            v-if="show_comment" :style="{top: morePos.top + 'px'}">
            </comment-table>
            <!-- table  -->
            <div style="width:100%" v-if="showDetail"  v-for="(row, rowIndex) in headDetail">
                <!-- <data-table :value="row" :index="rowIndex"></data-table> -->
                <!-- <data-table-dialog :value="row" :index="rowIndex"></data-table-dialog> -->
                <data-table-card :value="row" :index="rowIndex"></data-table-card>
            </div>
            <div v-if="loading" class="mr-snpiner" >
                <md-spinner :md-size="60" :md-stroke="2"  md-indeterminate></md-spinner>  
            </div>
    </md-layout>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'; 
import VueSticky from 'vue-sticky'
import Vue from 'vue'
var show_table=true;

    export default {
        computed: {
            ...mapGetters({ viewId: 'getViewById' ,
                            items: 'getSumItems',
                            sumtotal: 'getSumTotal',
                            sumprevmonth: 'getSumPrevMonth',
                            showTotal: 'getShowTotal',
                            rowTotal: 'getRowTotal',
                            loadTotal: 'getLoadTotal',
                            loadDetail: 'getLoadDetail',
                            loadDetailHead: 'getLoadDetailHead',
                            total_page: 'getTotalPage',
                            loading: 'getShowLoading',
                            showDetail: 'getShowDetail',
                            headDetail: 'getHeadDetail',
                            headIndex: 'getHeadIndex',
                            monthAdjust: 'getMonthAdjust',
                            rowTotalAdjust: 'getRowTotalAdjust',
                            rowAdjust: 'getRowAdjust',
                            comments: 'getComments',
                            load_step3: 'getLoadStep3',
            })
        },
        props : {
            value : {}
        },
         components : {
            'nested-total-dp'   : require('./nested-total-dp'),
            'nested-month-dp'   : require('./nested-month-dp'),
            // 'data-table'   : require('./data-table'),
            'adjust-input' : require('./adjust-input'),
            'ratio-input' : require('./ratio-input'),
            'comment-table' : require('./comment-table'),
            // 'data-table-dialog'   : require('./data-table-dialog'),
            'data-table-card'   : require('./data-table-card'),
        },
        data () {
            return {
                arr_table: [],
                currencyValue:0,
                showTab : true,
                txtComment : '',
                adj_tpye:'',
                target:'',
                morePos : {
                    top: 0,
                    left : 0,
                },
                show_comment:false,
                iconStatus:'',
                icon_name:'',
                txt_tooltip:''
            }
        },
        created () {
            window.addEventListener('scroll', this.handleScroll);
            //this.handleScroll();
            //this.$store.watch((state) => (state.auth), this.handleAuthUpdate);
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods : {
            ...mapActions([
                'selectedViewBy',
            ]),
            checkComment(row){
                // console.log("checkComment => " , row)
                if(typeof row != 'undefined' && row.read == 'N'){
                    return 'visible-tag';
                }else{
                    return 'unvisible-tag';
                }

            },
            checkColor(row){
                if(typeof row != 'undefined' && row.read == 'N'){
                    return 'md-avatar-icon _icon-status -large icn-orange';
                }else{
                    return 'md-avatar-icon _icon-status -large icn-gray';
                }

            },
            handleScroll(){
                if(this.load_step3 == true){
                    var container = document.body.scrollHeight;
                    const num = ((container*1)*10)/100;
                    //console.log(container+'==='+(window.scrollY+window.innerHeight+num));
                    if(container <= (window.scrollY+window.innerHeight+num) && this.loadTotal){
                        this.$store.dispatch('setLoadMoreToFalse');
                        this.$store.dispatch('setPlusTotalPage');
                        this.$store.dispatch('getSumMainServiceMore',{
                            total_page:this.$store.getters.getTotalPage,
                            organize_type:this.$store.getters.options_organize_selected,
                            product_keyword:this.$store.getters.product_keyword,
                            organizes:this.$store.getters.organizes_data,
                            product_type:this.$store.getters.options_product_selected,
                            products_uncheck:this.$store.getters.products_uncheck,
                            product_selected:this.$store.getters.product_selected,
                            product_checkall:this.$store.getters.product_checkall,
                            viewby:this.$store.getters.getViewById,
                            totaltype:this.$store.getters.getTotalType,
                            totalfirst:this.$store.getters.getTotalFirst,
                            totalsecond:this.$store.getters.getTotalSecond,
                            monthfirst:this.$store.getters.getMonthFirst,
                            monthsecond:this.$store.getters.getMonthSecond,
                        });
                    }else if(container <= (window.scrollY+window.innerHeight+num) && this.loadDetailHead){
                        // console.log("this.headIndex => " , this.headIndex)
                        // this.$store.dispatch('setLoadMoreToFalse');
                        // this.$store.dispatch('setShowDetail',true);
                        // this.$store.dispatch('getHeadDetail',{
                        //     organize_type:this.$store.getters.options_organize_selected,
                        //     organizes:this.$store.getters.organizes_data,
                        //     product_keyword:this.$store.getters.product_keyword,
                        //     product_type:this.$store.getters.options_product_selected,
                        //     products_uncheck:this.$store.getters.products_uncheck,
                        //     product_selected:this.$store.getters.product_selected,
                        //     product_checkall:this.$store.getters.product_checkall,
                        // });
                        
                    }else if(container <= (window.scrollY+window.innerHeight+num) && this.loadDetail){
                        // this.$store.dispatch('setLoadMoreToFalse');
                        // this.$store.dispatch('getSumDetailService',{
                        //     index:this.headIndex,
                        //     total_page:1,
                        //     insertType:'more',
                        //     organize_type:this.$store.getters.options_organize_selected,
                        //     organizes:this.$store.getters.organizes_data,
                        //     product_keyword:this.$store.getters.product_keyword,
                        //     product_type:this.$store.getters.options_product_selected,
                        //     products_uncheck:this.$store.getters.products_uncheck,
                        //     product_selected:this.$store.getters.product_selected,
                        //     product_checkall:this.$store.getters.product_checkall,
                        //     viewby:this.$store.getters.getViewById,
                        //     totaltype:this.$store.getters.getTotalType,
                        //     totalfirst:this.$store.getters.getTotalFirst,
                        //     totalsecond:this.$store.getters.getTotalSecond,
                        //     monthfirst:this.$store.getters.getMonthFirst,
                        //     monthsecond:this.$store.getters.getMonthSecond,
                        // });
                    }
                }
            },
            call_total(total_target ,total_adjust ){
                  
                if(total_adjust -total_target > 0 ){
                    
                    this.txt_tooltip = '+'+this.floatFormat(total_adjust -total_target)
                    // console.log("+")
                    this.iconStatus ='positive'
                }else if(total_adjust -total_target < 0) {
                    //  console.log("-")
                    this.iconStatus ='negative'
                    this.txt_tooltip = this.floatFormat(total_adjust -total_target)
                }else {
                    this.iconStatus =''
                    this.txt_tooltip = '';
                    // console.log("=")
                }
               
            },
            
            emitSaveDraftClick() {
                this.$emit('savedraftclick');
            },
            emitNextStepClick() {
                var stepper = 2;
                var clsStep =  document.getElementsByClassName("md-step-header");
                clsStep[stepper].click();
                var html = document.documentElement;
                    html.scrollTop = 0;
                this.$emit('nextstepclick');
            },

            mouseOver(rowIndex , key){
                if(typeof this.comments[this.items[rowIndex].id] != 'undefined'&& this.comments[this.items[rowIndex].id].read == 'N'){
                    // console.log("ค้าง")
                }else{
                    // console.log("หาย")
                    var x = document.getElementById("showIcons_" + rowIndex);
                    if(x!=null){
                        x.classList.remove("unvisible-tag");
                        x.classList.add("visible-tag");
                    }
                    var b = document.getElementById("suceesSaleMonth_" + rowIndex);
                    if( this.showTab == false){
                        if(b!=null){
                            b.classList.remove("unvisible-tag");
                            b.classList.add("visible-tag");
                        }
                    }else{
                        var y = document.getElementById("achievedTotal_" + rowIndex);
                        var z = document.getElementById("achievedMonth_" + rowIndex);
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
                }
            
                //     var x = document.getElementById("showIcons_" + rowIndex);
                //     if(x!=null){
                //         x.classList.remove("unvisible-tag");
                //         x.classList.add("visible-tag");
                //     }
                //     var b = document.getElementById("suceesSaleMonth_" + rowIndex);
                //     if( this.showTab == false){
                //         if(b!=null){
                //             b.classList.remove("unvisible-tag");
                //             b.classList.add("visible-tag");
                //         }
                //     }else{
                //         var y = document.getElementById("achievedTotal_" + rowIndex);
                //         var z = document.getElementById("achievedMonth_" + rowIndex);
                //         if(b!=null){
                //             b.classList.remove("unvisible-tag");
                //             b.classList.add("visible-tag");
                //         }
                //         if(z!=null){
                //             z.classList.remove("unvisible-tag");
                //             z.classList.add("visible-tag");
                //         }
                //         if(y!=null){
                //             y.classList.remove("unvisible-tag");
                //             y.classList.add("visible-tag");
                //         }
                //     } 
            },
            mouseOut(rowIndex , key){
                if(typeof this.comments[this.items[rowIndex].id] != 'undefined'&& this.comments[this.items[rowIndex].id].read == 'N'){
                    }else{
                    var x = document.getElementById("showIcons_" + rowIndex);
                        if(x!=null){
                            x.classList.remove("visible-tag");
                            x.classList.add("unvisible-tag");
                        }
                    var b = document.getElementById("suceesSaleMonth_" + rowIndex);
                    if( this.showTab == false){
                        // ตารางสอง
                        if(b!=null){
                            b.classList.remove("visible-tag");
                            b.classList.add("unvisible-tag");
                        }
                    }else{
                        // ตารางแรก
                        var y = document.getElementById("achievedTotal_" + rowIndex);
                        var z = document.getElementById("achievedMonth_" + rowIndex);
                        // var a = document.getElementById("achievedMonthcur_" + rowIndex);
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
                }

                //     var x = document.getElementById("showIcons_" + rowIndex);
                //     if(x!=null){
                //         x.classList.remove("visible-tag");
                //         x.classList.add("unvisible-tag");
                //     }
                // var b = document.getElementById("suceesSaleMonth_" + rowIndex);
                // if( this.showTab == false){
                //     // ตารางสอง
                //     if(b!=null){
                //         b.classList.remove("visible-tag");
                //         b.classList.add("unvisible-tag");
                //     }
                // }else{
                //     // ตารางแรก
                //     var y = document.getElementById("achievedTotal_" + rowIndex);
                //     var z = document.getElementById("achievedMonth_" + rowIndex);
                //     // var a = document.getElementById("achievedMonthcur_" + rowIndex);
                //     if(y!=null){
                //         y.classList.remove("visible-tag");
                //         y.classList.add("unvisible-tag");
                //     }
                //     if(z!=null){
                //         z.classList.remove("visible-tag");
                //         z.classList.add("unvisible-tag");
                //     }
                //     if(b!=null){
                //         b.classList.remove("visible-tag");
                //         b.classList.add("unvisible-tag");
                //     }
                //     // a.classList.remove("visible-tag");
                //     // a.classList.add("unvisible-tag");
                // }
            },
            getSumary(){
                var arr = [];
                    arr.push({
                        name:'ผลรวม',
                        target_total: parseInt(5000000),
                        sales_total: parseInt(3333332),
                        growth_total: 400,
                        success_total: 400,
                        target_month: parseInt(Math.floor(2500000)),
                        sales_month: parseInt(Math.floor(20000000)),
                        growth_month: 400,
                        success_month: 400,
                        target_monthcur: 16665,
                        // target_monthcur: 1666666665,
                        adjusted: this.floatFormat(11111111.10),
                        // adjusted: this.floatFormat((1000000000 * 4) /7),
                        adjusted_month1: this.floatFormat(11111111.10),
                        adjusted_month2: this.floatFormat(11111111.10),
                        adjusted_month3: this.floatFormat(11111111.10),
                        // adjusted: parseInt(Math.floor(1000000000 * 4) /7),
                        // adjusted: this.floatFormat('10000'),
                        ratio: this.floatFormat((65.08)),
                        ratio_month1: this.floatFormat((65.08)),
                        ratio_month2: this.floatFormat((65.08)),
                        ratio_month3: this.floatFormat((65.08)),
                        growhth_mothcur: 400,
                        sales_monthcur: '',
                        comment: '',
                    })
                return arr;
            },
            computePos (target) {
                let eventRect = target.getBoundingClientRect()
                let pageRect = document.getElementById("showDlgCommentTable1").getBoundingClientRect();
                return {
                    left : eventRect.left - pageRect.left,
				    top  : eventRect.top + eventRect.height - pageRect.top
                }
		    },
            openDialog(){
                this.$refs['dialog-Back-to-Target'].open()
            },closeDialog( param ){

                if(param ==='Confirm'){
                    this.$store.dispatch('getSumMainService2',JSON.parse(Vue.localStorage.get('Back-to-Target')))
                }
                 this.$refs['dialog-Back-to-Target'].close()
            },
            
            openComment(id,item , row) {
                this.morePos = this.computePos(event.target);
                this.$store.dispatch('setCommentShow',id); 
                setTimeout(() => {
                    this.show_comment = true;
                }, 500);
                this.getNotification();
            },
            setCloseComment() {
                this.show_comment = false;
            },

            adjustedSum(key,tpye){
                this.adj_tpye=tpye;
                this.sumTotalTable();
            },
            ratioSum(key,tpye){
                this.adj_tpye=tpye;
                this.sumTotalTable();
            },
            selectTotal(){
                //console.log("selectTotal => " , this.dp.select_total);
            },
            sumTotalTable(){
                var table = this.value.table;
                var sum = 0 ,target_total = 0, sales_total = 0, growth_total = 0, success_total = 0,
                    target_month = 0, sales_month = 0, growth_month = 0, success_month = 0, target_monthcur = 0,
                    adjusted = 0,ratio = 0, ratio_month1 = 0, ratio_month2 = 0, ratio_month3 = 0, 
                    growhth_mothcur = 0, sales_monthcur = 0,
                    adjusted_month1=0,adjusted_month2=0,adjusted_month3=0;
                var arr_sumtotal = this.value.total_tabel
                for(let i=0; i< table.length; i++){
                    if(this.adj_tpye==1){
                        var rowsAdj = document.getElementById("adj_" + i).value;
                        var rowsAdjComma = rowsAdj.replace(/\,/g,'');
                        rowsAdjComma =(rowsAdjComma == '') ? 0 : rowsAdjComma
                        adjusted += parseFloat(rowsAdjComma);
                        adjusted_month1 = arr_sumtotal[0].adjusted_month1.replace(/\,/g,'');
                        adjusted_month2 = arr_sumtotal[0].adjusted_month2.replace(/\,/g,'');
                        adjusted_month3 = arr_sumtotal[0].adjusted_month3.replace(/\,/g,'');

                        var rowsRat = document.getElementById("ratio_" + i).value;
                        rowsRat =(rowsRat == '') ? 0 : rowsRat
                        ratio += parseFloat(rowsRat);
                    
                        ratio_month1 = arr_sumtotal[0].ratio_month1;
                        ratio_month2 = arr_sumtotal[0].ratio_month2;
                        ratio_month3 = arr_sumtotal[0].ratio_month3;
                    }else if(this.adj_tpye==2){
                        var adj_month1 = document.getElementById("adj_month1_" + i).value;
                        var adj_month1Comma = adj_month1.replace(/\,/g,'');
                        adj_month1Comma =(adj_month1Comma == '') ? 0 : adj_month1Comma
                        adjusted_month1 += parseFloat(adj_month1Comma);
                        adjusted = arr_sumtotal[0].adjusted.replace(/\,/g,'');
                        adjusted_month2 = arr_sumtotal[0].adjusted_month2.replace(/\,/g,'');
                        adjusted_month3 = arr_sumtotal[0].adjusted_month3.replace(/\,/g,'');

                        var rowsRat1 = document.getElementById("ratio_month1_" + i).value;
                        rowsRat1 =(rowsRat1 == '') ? 0 : rowsRat1
                        ratio_month1 += parseFloat(rowsRat1);
                        ratio = arr_sumtotal[0].ratio;
                        ratio_month2 = arr_sumtotal[0].ratio_month2;
                        ratio_month3 = arr_sumtotal[0].ratio_month3;
                    }else if(this.adj_tpye==3){
                        var adj_month2 = document.getElementById("adj_month2_" + i).value;
                        var adj_month2Comma = adj_month2.replace(/\,/g,'');
                        adj_month2Comma =(adj_month2Comma == '') ? 0 : adj_month2Comma
                        adjusted_month2 += parseFloat(adj_month2Comma);
                        adjusted = arr_sumtotal[0].adjusted.replace(/\,/g,'');
                        adjusted_month1 = arr_sumtotal[0].adjusted_month1.replace(/\,/g,'');
                        adjusted_month3 = arr_sumtotal[0].adjusted_month3.replace(/\,/g,'');

                        var rowsRat2 = document.getElementById("ratio_month2_" + i).value;
                        rowsRat2 =(rowsRat2 == '') ? 0 : rowsRat2
                        ratio_month2 += parseFloat(rowsRat2);
                        ratio = arr_sumtotal[0].ratio;
                        ratio_month1 = arr_sumtotal[0].ratio_month1;
                        ratio_month3 = arr_sumtotal[0].ratio_month3;
                    }else if(this.adj_tpye==4){
                        var adj_month3 = document.getElementById("adj_month3_" + i).value;
                        var adj_month3Comma = adj_month3.replace(/\,/g,'');
                        adj_month3Comma =(adj_month3Comma == '') ? 0 : adj_month3Comma;
                        adjusted_month3 += parseFloat(adj_month3Comma);
                        adjusted = arr_sumtotal[0].adjusted.replace(/\,/g,'');
                        adjusted_month1 = arr_sumtotal[0].adjusted_month1.replace(/\,/g,'');
                        adjusted_month2 = arr_sumtotal[0].adjusted_month2.replace(/\,/g,'');
                    
                        var rowsRat3 = document.getElementById("ratio_month3_" + i).value;
                        rowsRat3 =(rowsRat3 == '') ? 0 : rowsRat3
                        ratio_month3 += parseFloat(rowsRat3);
                        ratio = arr_sumtotal[0].ratio;
                        ratio_month1 = arr_sumtotal[0].ratio_month1;
                        ratio_month2 = arr_sumtotal[0].ratio_month2;
                    }

                    target_total += parseFloat(table[i].target_total);
                    sales_total += parseFloat(table[i].sales_total);
                    growth_total += parseFloat(table[i].growth_total);
                    success_total += parseFloat(table[i].success_total);
                    target_month += parseFloat(table[i].target_month);
                    sales_month += parseFloat(table[i].sales_month);
                    growth_month += parseFloat(table[i].growth_month);
                    success_month += parseFloat(table[i].success_month);
                    target_monthcur += parseFloat(table[i].target_monthcur);
                    growhth_mothcur += parseFloat(table[i].growhth_mothcur);
                    sales_monthcur += parseFloat(table[i].sales_monthcur);
                }
                var rs = {
                    target_total : target_total,
                    sales_total : sales_total,
                    growth_total : growth_total,
                    success_total : success_total,
                    target_month : target_month,
                    sales_month : sales_month,
                    growth_month : growth_month,
                    success_month : success_month,
                    target_monthcur : target_monthcur,
                    growhth_mothcur : growhth_mothcur,
                    sales_monthcur : sales_monthcur,
                    adjusted : this.floatFormat(adjusted),
                    adjusted_month1 : this.floatFormat(adjusted_month1),
                    adjusted_month2 : this.floatFormat(adjusted_month2),
                    adjusted_month3 : this.floatFormat(adjusted_month3),
                    ratio : this.floatFormat(ratio),
                    ratio_month1 : this.floatFormat(ratio_month1),
                    ratio_month2 : this.floatFormat(ratio_month2),
                    ratio_month3 : this.floatFormat(ratio_month3)
                }
                this.value.total_tabel = [];
                this.value.total_tabel.push(rs);
                this.createTagSummary();
            },
       
            showTable(item){
                // show tab
                this.$store.dispatch('setShowExpand',this.showTab);
                this.$store.dispatch('calculateSummary');
                if( this.showTab == false){
                    this.showTab = true;
                }else{
                    this.showTab = false;
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
                if(e.target.className=='md-icon -white -font-14 pt-5 mr-icon-comment md-theme-default material-icons'){
                    if(this.show_comment == true){
                        this.show_comment = false;
                    }
                       
                }
                if(e.target.className!='md-icon -white -font-14 pt-5 mr-icon-comment md-theme-default material-icons'){
                       this.show_comment = false;
                }
            },
            floatFormat(val){
                return parseFloat(val).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
            },
            intFormat(val){
                return parseInt(val).toLocaleString();
            },
            focusOutFormat(rowIndex,arr_table,type){
                // var rowIndexArray=arr_table;
                // this.currencyValue = parseFloat( rowIndexArray.replace(/[^\d\.]/g, ""));
                // if (isNaN(this.currencyValue)) {
                //     this.currencyValue = 0;
                // }
                // rowIndexArray =  this.currencyValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                // var table = this.value.table
                // if(type==1){
                //     table[rowIndex].adjusted =  rowIndexArray;
                // }else if(type==2){
                //     table[rowIndex].adjusted_month1  = rowIndexArray;
                // }else if (type==3){
                //     table[rowIndex].adjusted_month2  = rowIndexArray;
                // }else if(type==4){
                //     table[rowIndex].adjusted_month3  = rowIndexArray;
                // }
            },
            focusInFormat(rowIndex,arr_table,type){
                // console.log(arr_table);
                // var valueArray = arr_table;
                // var valueArray = arr_table.replace(/\,/g,'');
                // var table = this.value.table
                // if(type==1){
                //     table[rowIndex].adjusted  = valueArray;
                // }else if(type==2){
                //     table[rowIndex].adjusted_month1  = valueArray;
                // }else if (type==3){
                //     table[rowIndex].adjusted_month2  = valueArray;
                // }else if(type==4){
                //     table[rowIndex].adjusted_month3  = valueArray;
                // }
                
                // table[rowIndex].adjusted  = table[rowIndex].adjusted.toString();
            },
            ratioFormat(rowIndex,arr_table,type){
                // var valueArray = parseFloat(arr_table).toFixed(2);
                // var table = this.value.table
                // if(type==1){
                //     table[rowIndex].ratio  = valueArray;
                // }else if(type==2){
                //     table[rowIndex].ratiod_month1  = valueArray;
                // }else if (type==3){
                //     table[rowIndex].ratio_month2  = valueArray;
                // }else if(type==4){
                //     table[rowIndex].ratio_month3  = valueArray;
                // }
                // table[rowIndex].ratio = parseFloat(table[rowIndex].ratio).toFixed(2);
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
        }
        ,
        sticky: VueSticky
     }
    }
</script>
<style>
div.fixed {
    position: fixed;
    width: 50%;
    bottom: 10px;
    border: 3px solid #8AC007;
} 
div.absolute {
    position: absolute;
    width: 50%;
    bottom: 10px;
    border: 3px solid #8AC007;
} 

.style-scroll::-webkit-scrollbar{
    width: 0.5em;
}
.style-scroll::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgbs(0,0,0.3);
}
.style-scroll::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color:rgb(0, 0, 0,0.11);
    outline: 0px solid slategray;
}

</style>

