<template>
     <md-layout >
            <div class="mb-40 crad-bg"  :id="'table2_'  + valueTable">
                <table  id="res" class="latoFont text-left">
                    <tr class="-font-18 -gray-41 height-50" >
                        <td class="pl-15 pt-15 pb-0 font-bold">{{headDetail.id}} : {{headDetail.name}}</td>
                        <td v-if="showTab" class="text-right" colspan="8" >
                            <md-icon class="mr-16 color-black">add</md-icon>
                        </td>
                        <td v-if="!showTab" colspan="8" class="-bg-gray-EF"></td>
                        <td  class="-bg-gray-EF -gray-72 pr-20 text-right" colspan="6" >
                            <span @click="showTable" class="pt-15 mr-16 -pointer" >
                                <md-icon class="-font-25 color-black" v-if="showTab">fullscreen
                                    <md-tooltip md-direction="top">expand</md-tooltip>
                                </md-icon>
                                <md-icon  class="-font-25 color-black" v-if="!showTab">fullscreen_exit
                                    <md-tooltip md-direction="top">collapse</md-tooltip>
                                </md-icon>
                            </span>
                            <md-icon  class="-font-25 -pointer color-black">more_vert</md-icon>
                        </td>
                        </td>
                    </tr>
                    <!--Row select-->
                    <tr>
                        <td></td>
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
                    <tr class="-font-12 text-center font-bold" >
                            <td class="width-1" ></td>
                        <!--Start tab 1 -->
                            <td v-if="showTab" class="width-1 pr-per05 -gray-72" >Target</td>
                            <td v-if="showTab" class="width-1 -gray-72">Sales</td>
                            <td v-if="showTab" class="width-01 -gray-72"></td>
                            <td v-if="showTab" class="width-1 pr-per2  -gray-72">Ratio</td>
                            <td v-if="showTab" class="width-1 pr-per05 -gray-72">Target</td>
                            <td v-if="showTab" class="width-1 -gray-72">Sales</td>
                            <td v-if="showTab" class="width-01 -gray-72"></td>
                            <td v-if="showTab" class="width-1 pr-per2 -gray-72">Ratio</td>
                            <td v-if="showTab" class="width-2 pl-per2 pr-per05  -bg-gray-EF -gray-41">Target</td>
                            <td v-if="showTab" class="width-01 -oranges -bg-gray-EF">Adjusted</td>
                            <td v-if="showTab" class="width-01 -bg-gray-EF"></td>
                            <td v-if="showTab" class="width-1 -oranges -bg-gray-EF">Ratio</td>
                            <td v-if="showTab" class="width-01 pr-per05 -bg-gray-EF -gray-41  pl-10">Sales</td>
                        <!--End tab 1 -->
                        <!--Start tab 2 -->
                             <td v-if="!showTab" class="width-2 pl-per1 -bg-gray-EF -gray-72">Target</td>
                            <td v-if="!showTab" class="width-01 -bg-gray-EF -oranges">Adjusted</td>
                            <td v-if="!showTab" class="width-01 -bg-gray-EF -gray-72"></td>
                            <td v-if="!showTab" class="width-1 pr-per05 -bg-gray-EF -oranges">Ratio</td>
                            <td v-if="!showTab" class="width-1 -bg-gray-EF -gray-72 pr-per2 ">Sales</td>

                            <td v-if="!showTab" class="width-2 -bg-gray-EF -gray-72">Target</td>
                            <td v-if="!showTab" class="width-01 -bg-gray-EF -oranges">Adjusted</td>
                            <td v-if="!showTab" class="width-01 -bg-gray-EF -gray-72"></td>
                            <td v-if="!showTab" class="width-1 pr-per2 -bg-gray-EF -oranges">Ratio</td>

                            <td v-if="!showTab" class="width-2 pr-per05 -bg-gray-EF -gray-72">Target</td>
                            <td v-if="!showTab" class="width-01 -bg-gray-EF -oranges">Adjusted</td>
                            <td v-if="!showTab" class="width-01 -bg-gray-EF -gray-72"></td>
                            <td v-if="!showTab" class="width-1 -bg-gray-EF -oranges pr-per0">Ratio</td>
                        <!--End tab 2 -->
                        <td width="1%" class="-bg-gray-EF -gray-72"></td>
                    </tr>
                    <!--Row body-->
                    <tr v-for="(row, rowIndex) in items_detail" v-on:mouseover= "mouseOver(rowIndex , row.comment)"  v-on:mouseout= "mouseOut(rowIndex , row.comment)" class="rowsTable">
                        <td class="pl-20 pd-product -font-16 -gray-72" >
                           {{row.id}}</br>
                            <div class="-gray-A8 -font-14 -list-block width-170">
                                {{row.name}}
                                <md-tooltip md-direction="top">{{row.name}}</md-tooltip>
                            </div>
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
                            <td v-if="showTab" class="text-right" nowrap>
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
                            <td v-if="showTab" class="-font-12 -gray-A8 text-right pr-per2 width-30" >
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
                            <td v-if="showTab" class="pl-per02 text-right"  nowrap>
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
                            <td v-if="showTab" class="-font-12 -gray-A8 text-right pr-per2 width-50 ">
                                <template v-if="sumprevmonth[rowIndex]">{{floatFormat(sumprevmonth[rowIndex].ratio_month) }}%</template>
                            </td>
                        
                        <!--Target 3 -->
                            <td class="-bg-gray-EF -font-12 -gray-41 pl-per2 pr-per05 -paddingTwo-line" nowrap >
                                 <template v-if="adjustdetail[rowIndex]">{{intFormat(adjustdetail[rowIndex].adjust_target)}}</template>
                            </td> 
                        <!--Adjusted 3 -->
                            <td  class="-bg-gray-EF -width-adjust"  >
                                <template v-if="adjustdetail[rowIndex]">
                                <!--md-input-container class="md-input-invalid input-per -width-adjust" >
                                    <md-input type="text" :maxlength="10" class="text-right"
                                        :id="'adj_' + rowIndex" @focus.native="$event.target.select()"
                                        v-on:focus="focusInFormat(rowIndex, row.adjusted, 1)" 
                                        v-on:blur="focusOutFormat(rowIndex, row.adjusted, 1)" 
                                        v-on:change="adjustedSum(rowIndex, 1)" 
                                        :value="intFormat(adjustdetail[rowIndex].adjust)">
                                    </md-input>
                                </md-input-container-->
                                <adjust-input v-model="adjustdetail[rowIndex].adjust" :table="index" index="0" :indexDetail="rowIndex" type="detail"></adjust-input>
                                </template>
                            </td>
                        <!--Growth 3 -->
                            <td  class="-bg-gray-EF pr-per02 width-50 text-right" nowrap>
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
                            <td  class="-bg-gray-EF -width-ratio pl-per05"  >
                                <template v-if="adjustdetail[rowIndex]">
                                    <ratio-input v-model="adjustdetail[rowIndex].ratio" index="0" :table="index" :indexDetail="rowIndex" type="detail"></ratio-input>
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
                                <template v-if="adjustdetail[rowIndex]">{{intFormat(adjustdetail[rowIndex].adjust_target1)}}</template>
                            </td>
                            <!--Tab 2 Adjust 2 -->
                            <td v-if="!showTab" class="-bg-gray-EF -width-adjust pr-per05" >
                                <template v-if="adjustdetail[rowIndex]">
                                <!--md-input-container class="md-input-invalid input-per -width-adjust">
                                    <md-input type="text" :maxlength="10" class="text-right" 
                                        :id="'adj_month2_' + rowIndex" @focus.native="$event.target.select()"
                                        v-on:focus="focusInFormat(rowIndex, row.adjusted_month2, 3)" 
                                        v-on:blur="focusOutFormat(rowIndex, row.adjusted_month2, 3)" 
                                        v-on:change="adjustedSum(rowIndex,3)" 
                                        :value="intFormat(adjustdetail[rowIndex].adjust1)" ></md-input>
                                </md-input-container-->
                                <adjust-input v-model="adjustdetail[rowIndex].adjust1" :table="index" index="1" :indexDetail="rowIndex" type="detail"></adjust-input>
                                </template>
                            </td>
                            <!--Tab 2 Growth 2 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05 text-right"  nowrap>
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
                                <!--template v-if="adjustdetail[rowIndex]">
                                <md-input-container class="md-input-invalid input-per -width-ratio">
                                    <md-input type="number" :maxlength="6" class="text-right" 
                                        :id="'ratio_month2_' + rowIndex" @focus.native="$event.target.select()"
                                        v-on:blur="ratioFormat(rowIndex, adjustdetail[rowIndex].ratio1, 3)" 
                                        v-on:change="ratioSum(rowIndex,3)" 
                                        :value="floatFormat(adjustdetail[rowIndex].ratio1)"></md-input>
                                    <span class="-font-12 -gray-41 pt-5">%</span>
                                </md-input-container>
                                </template-->
                                <template v-if="adjustdetail[rowIndex]">
                                    <ratio-input v-model="adjustdetail[rowIndex].ratio1" index="1" :table="index" :indexDetail="rowIndex" type="detail"></ratio-input>
                                </template>
                            </td>
                            <!--Tab 2 Target 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 -paddingOne-line pr-per1" nowrap>
                                <template v-if="adjustdetail[rowIndex]">{{intFormat(adjustdetail[rowIndex].adjust_target2)}}</template>
                            </td>
                            <!--Tab 2 Adjust 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF -width-adjusts  pl-per05 pr-per05" >
                                <template v-if="adjustdetail[rowIndex]">
                                <!--md-input-container class="md-input-invalid input-per -width-adjusts pl-per05">
                                    <md-input type="text" :maxlength="10" class="text-right"
                                        :id="'adj_month3_' + rowIndex" @focus.native="$event.target.select()"
                                        v-on:focus="focusInFormat(rowIndex, row.adjusted_month3, 4)" 
                                        v-on:blur="focusOutFormat(rowIndex, row.adjusted_month3, 4)" 
                                        v-on:change="adjustedSum(rowIndex,4)" 
                                        :value="intFormat(adjustdetail[rowIndex].adjust2)" ></md-input>
                                </md-input-container-->
                                <adjust-input v-model="adjustdetail[rowIndex].adjust2" :table="index" index="2" :indexDetail="rowIndex" type="detail"></adjust-input>
                                </template>
                            </td>
                            <!--Tab 2 Growth 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05 text-right" nowrap>
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
                                <!--template v-if="adjustdetail[rowIndex]">
                                <md-input-container class="md-input-invalid input-per -width-ratio">
                                    <md-input type="number" :maxlength="6" class="text-right" 
                                        :id="'ratio_month3_' + rowIndex" @focus.native="$event.target.select()"
                                        v-on:blur="ratioFormat(rowIndex, adjustdetail[rowIndex].ratio2, 4)" 
                                        v-on:change="ratioSum(rowIndex,4)" 
                                        :value="floatFormat(adjustdetail[rowIndex].ratio2)"></md-input>
                                    <span class="-font-12 -gray-41 pt-5">%</span>
                                </md-input-container>
                                </template-->
                                <template v-if="adjustdetail[rowIndex]">
                                    <ratio-input v-model="adjustdetail[rowIndex].ratio2" index="2" :table="index" :indexDetail="rowIndex" type="detail"></ratio-input>
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
                            
                            <!-- <div :id="'showIcon_' + rowIndex + valueTable" class="unvisible-tag" v-if="row.comment == false">
                                <md-button  class="md-icon-button  ml-0"  @click="openComment(rowIndex , row)">
                                    <md-avatar  class="md-avatar-icon _icon-status -large icn-gray">
                                        <md-icon class="-white -font-14 pt-5 mr-icon-comment" >mode_comment</md-icon>
                                    </md-avatar>
                                </md-button>
                            </div>
                            <div v-else :id="'showIcon_' + rowIndex + valueTable" class="visible-tag">
                                <md-button  class="md-icon-button ml-0"  @click="openComment(rowIndex , row)">
                                    <md-avatar  class="md-avatar-icon _icon-status -large icn-orange">
                                        <md-icon class="-white -font-14 pt-5 mr-icon-comment" >mode_comment</md-icon>
                                    </md-avatar>
                                </md-button>
                            </div> -->
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
                            <td v-if="showTab" nowrap  class="text-right" nowrap>
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
                            <td v-if="showTab" class="-font-12 -gray-A8 text-right pr-per2 width-55"  nowrap>
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
                            <td v-if="showTab" class="pr-per02 text-right"  nowrap >
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
                            <td v-if="showTab" class="-font-12 -gray-A8 text-right pr-per2 width-55 "  nowrap>
                                {{floatFormat(rowTotal.ratio_month)}}%
                            </td>

                            <!--Sum Target 3 -->
                            <td class="-font-12 -gray-41 -bg-gray-EF -paddingTwo-line pl-per2 pr-per05" nowrap>
                                {{intFormat(rowTotal.adjust_target)}}
                            </td>
                            <!--Sum Adjusted 3 -->
                            <td  class="-bg-gray-EF -width-adjust"  >
                                <!--md-input-container class="md-input-invalid input-per -width-adjust" >
                                    <md-input type="text" id="adj_total" :value="intFormat(rowTotal.adjust)" @focus.native="$event.target.select()" class="text-right"></md-input>
                                </md-input-container-->
                                <adjust-input v-model="rowTotal.adjust" :table="index" index="0" type="total"></adjust-input>
                            </td>
                            <!--Sum Growth 3 -->
                            <td class="-bg-gray-EF -gray-41 pl-per02 width-55 text-right" nowrap>
                                <label class="-font-9 font-green" v-if="rowTotal.growth>0">
                                <md-icon class="-font-12 font-green -width-icon">arrow_drop_up</md-icon>
                                    {{intFormat(rowTotal.growth)}}
                                </label>
                                <label v-else class="-font-9 -redsummary" > 
                                    <md-icon class="-font-12 -redsummary -width-icon" >arrow_drop_down</md-icon> 
                                    {{intFormat(rowTotal.growth)}}%
                                </label>
                            </td>
                            <!--Sum Ratio 3 -->
                            <td class="-bg-gray-EF -width-ratio pl-per05" >
                                <ratio-input v-model="rowTotal.total_ratio" :table="index" :disabled="true" index="0" type="total"></ratio-input>
                            </td>
                            <!--Sum Sales 3 -->
                            <td class="-font-12 -bg-gray-EF -gray-41 pr-per1 -paddingTwo-line"  nowrap>
                                {{intFormat(rowTotal.adjust_sale)}}
                                <div class="-font-10  -gray-72 position-hover">
                                    Success: {{floatFormat(rowTotal.success)}}%
                                </div>
                            </td>
                        <!--End tab 1 -->
                        <!--Start tab 2 -->
                           
                            <!--Sum Tab 2 Target 2 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05 -paddingOne-line"  nowrap>
                                {{intFormat(rowTotal.adjust_target1)}}
                            </td>
                            <!--Sum Tab 2 Adjust 2 -->
                            <td v-if="!showTab" class="-bg-gray-EF -width-adjust pr-per05">
                                <!--md-input-container class="md-input-invalid input-per -width-adjust">
                                    <md-input type="text" id="adj_totalm2" class="text-right" @focus.native="$event.target.select()"></md-input>
                                </md-input-container-->
                                <adjust-input v-model="rowTotal.adjust1" :table="index" index="1" type="total"></adjust-input>
                            </td>
                            <!--Sum Tab 2 Growth 2 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05 text-right"  nowrap>
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
                            <td v-if="!showTab" class="-bg-gray-EF -width-ratio pr-per2 pl-per05">
                                <ratio-input v-model="rowTotal.total_ratio1" :table="index" :disabled="true" index="1" type="total"></ratio-input>
                            </td>
                            <!--Sum Tab 2 Target 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 -paddingOne-line pr-per1"  nowrap>
                                {{intFormat(rowTotal.adjust_target2)}}
                            </td>
                            <!--Sum Tab 2 Adjust 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF -width-adjusts  pl-per05 pr-per05" >
                                <!--md-input-container class="md-input-invalid input-per -width-adjusts  pl-per05">
                                    <md-input class="text-right" type="text" id="adj_totalm3" @focus.native="$event.target.select()"></md-input>
                                </md-input-container-->
                                <adjust-input v-model="rowTotal.adjust2" :table="index" index="2" type="total"></adjust-input>
                            </td>
                            <!--Sum Tab 2 Growth 3 -->
                            <td v-if="!showTab" class="-bg-gray-EF -font-12 -gray-41 pr-per05 text-right"  nowrap>
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
                            <td v-if="!showTab" class="-bg-gray-EF -width-ratio pr-per05 pl-per05">
                                <ratio-input v-model="rowTotal.total_ratio2" :table="index" :disabled="true" index="2" type="total"></ratio-input>
                                
                            </td>
                        <!--End tab 2 -->
                        <td class="-bg-gray-EF"></td>
                    </tr>
                </table>
            </div>
            <comment-table v-click-outside="outsideComment" @closeComment="setCloseComment" 
                v-if="show_comment" :style="{top: morePos2.top + 'px'}">
            </comment-table>
            
    </md-layout>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'; 
let arr_notifi = [{
    id: 1,
    name: 'ณัฐพล 111642',
    time: '3.37 PM Today',
    comment: 'First comment in thead goes',
    bg_corlor: 'white-DF',
    font_style: '',
    },
    {
        id: 2,
        name: 'ณัฐพล 21000',
        time: '4.55 PM Today',
        comment: 'Adjusted target to THB 48,000 (reduced by THB 2,000)',
        bg_corlor: 'red-DF',
        font_style: 'font_style',
    }];
    export default {
        computed: {
            ...mapGetters({ viewId: 'getViewById' ,
                            //sumtotal: 'getSumTotal',
                            //sumprevmonth: 'getSumPrevMonth',
                            //showTotal: 'getShowTotal',
                            //rowTotal: 'getRowTotal',
                            loadTotal: 'getLoadTotal',
                            loadDetail: 'getLoadDetail',
                            total_page: 'getTotalPage',
                            //loading: 'getShowLoading',

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
                return this.$store.getters.getAdjustMonthDetail(this.index);
            },
            showTotal(){
                return this.$store.getters.getShowTotalDetail(this.index);
            },
            rowTotal(){
                return this.$store.getters.getRowTotalDetail(this.index);
            }
        },
        created(){
            if(this.load_step3==true){
            this.$store.dispatch('getSumDetailService',{
                index:this.index,
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
            });
            }
        },
        components : {
            'adjust-input' : require('./adjust-input'),
            'ratio-input' : require('./ratio-input'),
            'comment-table' : require('./comment-table'),
        },
         props : {
            index : {},
            value : {}
        },
        data () {
            return {
                bd: {
                    txtComment:'',
                    disbled:true,
                },
                arr_notifi: arr_notifi,
                arr_table: [],
                removeTag : false,
                openTag : false,
                currencyValue:0,
                showTab : true,
                txtComment : '',
                adj_tpye:'',
                showBar1:false,
                showBar2:false,
                summaryPage :  {target1: 0,balance1: 0,target2: 0,balance2: 0},
                showBar:false,
                sumBar :  {adjusted_1: '',target_monthcur_1: '',adjusted_2: '',target_monthcur_2: ''},
                target:'',
                bal:'',
                valueTable:this.index,
                head:{total_year:'YEAR 2017',total_month:'OCT 2017',month_current:'AUG 2017'},
                headTwo:{month_current:'AUG 2017',month_next:'	SEP 2017',month_next_two:'OCT 2017'},
                morePos2 : {
                    top: 0,
                    left : 0,
                },
                show_comment:false,
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
     }
    }
</script>
