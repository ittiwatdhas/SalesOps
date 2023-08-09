<template>
  <div class="ml-per24 step1">
    <md-list class="bg-mdlist" md-align="center" id="md-list-1">
      <md-list-item @click="expandLIst(0)">
        <span class="-font-16 latoFont">Select Sales Team</span>
        <md-list-expand>
          <md-layout>
            <md-layout class="expand-level"></md-layout>
            <md-layout md-flex="100">
              <md-layout md-gutter>
                <md-layout md-flex-small="70" class="ml-30 mr-30" style="display: -webkit-box;">
                  <div class>
                    <md-checkbox
                      class="md-warn-mo"
                      :value.sync="chkhead_sales"
                      @change="checkAllTeam($event)"
                    ></md-checkbox>
                  </div>
                  <md-select
                    :value.sync="options_team_selected"
                    :change="getDataTeamOrg"
                    class="pl-20 mt-8 width-per80 dp-1" 
                    :disabled="false"
                  >
                    <md-option
                      v-for="items in arr_lavel_sales"
                      v-bind:value="items.id"
                      :key="items.id"
                    >
                      <label class="-font-16 latoFont">{{items.name}}</label>
                    </md-option>
                  </md-select>
                  <div style="padding-top:15px;font-family:lato">({{countExpandTeam}})</div>
                </md-layout>
                <md-layout md-flex-small="25" class="pr-20 mt-8">
                  <md-input-container class="-no-line -searchPer mt-0 mb-10 width-per100">
                    <!-- position: unset; -->                 
                    <md-icon>search</md-icon>
                    <md-input
                      class="-font-14 latoFont"
                      :placeholder="bd.holder_searchTeam"
                      v-on:change="searchTeam"
                      v-model="bd.txtSerchTeam"
                    ></md-input>
                  </md-input-container>
                </md-layout>
                <md-layout md-flex-small="100">
                  <md-layout class="mh-24 mt-10 mb-20 expand-line"></md-layout>
                </md-layout>
              </md-layout>  
            </md-layout>

            <div style="padding-left:40%" v-if="arr_team.length == 0">NO DATA</div>
            <div v-else class="container scrollbar pl-0" id="style-scrollbar" v-on:scroll="scrollFunction">
              <transition-group tag="div" name="fade">
                <div class="box" v-for="item in arr_team" :key="item.emp_id">
                  <md-layout>
                    <!-- <md-layout  md-column md-gutter style=" height:60px"> -->
                    <md-layout md-flex="60" md-align="start">
                      <md-layout class="mr-18" md-flex="20" md-align="start">
                        <md-checkbox
                          class="md-warn-mo"
                          :id="item.emp_id"
                          :name="item.emp_id"
                          v-model="item.checked"
                          @change="checkChildTeam(item.emp_id,$event)"
                        ></md-checkbox>
                      </md-layout>
                      <md-layout md-flex="30" class="pl-10">
                        <div class="font-bold">
                          <span class="md-display -font-14 -gray-41 latoFont">{{item.emp_id}}</span>
                        </div>
                        <div class="width-150">
                          <span
                            class="md-display defaultCls -list-block -font-14 latoFont -gray-72"
                          >{{item.first_name_en}}</span>
                          <md-tooltip
                            md-direction="top"
                            class="-font-14 latoFont font-weight100"
                          >{{item.first_name_en}}</md-tooltip>
                        </div>
                      </md-layout>
                    </md-layout>
                  </md-layout>
                </div>
              </transition-group>
              <div class="box" v-if="arr_team.length%2 !=0">
                <md-layout class="ml-10 height-60" md-column md-gutter>
                  <md-layout md-flex="60" md-align="start">
                    <md-layout class="mr-18" md-flex="20" md-align="start">
                      <div></div>
                    </md-layout>
                    <md-layout md-flex="30" class="pl-10">
                      <div class="font-bold">
                        <span class="md-display -font-14 -gray-41 latoFont"></span>
                      </div>
                      <div class="width-150">
                        <span class="md-display defaultCls -list-block -font-14 latoFont -gray-72"></span>
                        <md-tooltip md-direction="top" class="-font-14 latoFont font-weight100"></md-tooltip>
                      </div>
                    </md-layout>
                  </md-layout>
                </md-layout>
              </div>
            </div>

            <md-layout md-align="end" md-gutter="16" class="pr-20 pt-0 pb-15">
              <md-layout md-flex="33" md-align="end">
                <md-button
                  @click="toggleExpandTeam"
                  class="md-raised -orange mh-0 width-per20 height-40"
                >
                  <label class="md-display -font-14 latoFont">NEXT</label>
                </md-button>
              </md-layout>
            </md-layout>
          </md-layout>
        </md-list-expand>
      </md-list-item>
      <div class="space-list"></div>
      <md-list-item @click="expandLIst(1)">
        <span class="-font-16 latoFont">Select Salesman</span>
        <md-list-expand>
          <md-layout>
            <md-layout class="expand-level"></md-layout>
            <md-layout md-flex="100">
              <md-layout md-gutter>
                <md-layout md-flex-small="70" class="ml-30 mr-30" style="width: 130px; display: -webkit-box;">
                  <div class>
                    <md-checkbox
                      class="md-warn-mo"
                      :value.sync="chkhead_sales"
                      @change="checkAllSales($event)"
                    ></md-checkbox>
                  </div>
                  <md-select
                  style="width: 165px;"
                    :value.sync="options_organize_selected"
                    :change="getDataOrganize"
                    class="pl-20 mt-8 width-per80 dp-1" 
                    :disabled="false"
                  >
                    <md-option
                      v-for="items in arr_lavel_sales"
                      v-bind:value="items.id"
                      @selected="selectSales(items)"
                      :key="items.id"
                    >
                      <label class="-font-16 latoFont">{{items.name}}</label>
                    </md-option>
                  </md-select>
                  <div style="padding-top:15px;font-family:lato">({{countExpand1}})</div>
                </md-layout>
                <md-layout md-flex-small="25" class="pr-20 mt-8">
                  <md-input-container class="-no-line -searchPer mt-0 mb-10 width-per100">
                    <!--position: unset;-->
                    <md-icon>search</md-icon>
                    <md-input
                      class="-font-14 latoFont"
                      :placeholder="bd.holder_searchSales"
                      v-on:change="searchSalesMan"
                      v-model="bd.txtSerchSales"
                    ></md-input>
                  </md-input-container>
                </md-layout>
                <md-layout md-flex-small="100">
                  <md-layout class="mh-24 mt-10 mb-20 expand-line"></md-layout>
                </md-layout>
              </md-layout>
            </md-layout>
            <div style="padding-left:40%" v-if="arr_sales.length == 0">NO DATA</div>
            <div v-else class="container scrollbar pl-0" id="style-scrollbar" v-on:scroll="scrollFunction">
              <transition-group tag="div" name="fade">
                <div class="box" v-for="item in arr_sales" :key="item.emp_id">
                  <md-layout>
                    <!-- <md-layout  md-column md-gutter style=" height:60px"> -->
                    <md-layout md-flex="60" md-align="start">
                      <md-layout class="mr-18" md-flex="20" md-align="start">
                        <md-checkbox
                          class="md-warn-mo"
                          :id="item.emp_id"
                          :name="item.emp_id"
                          v-model="item.checked"
                          @change="checkChildSales(item.emp_id,$event)"
                        ></md-checkbox>
                      </md-layout>
                      <md-layout md-flex="30" class="pl-10">
                        <div class="font-bold">
                          <span class="md-display -font-14 -gray-41 latoFont">{{item.emp_id}}</span>
                        </div>
                        <div class="width-150">
                          <span
                            class="md-display defaultCls -list-block -font-14 latoFont -gray-72"
                          >{{item.first_name_en}}</span>
                          <md-tooltip
                            md-direction="top"
                            class="-font-14 latoFont font-weight100"
                          >{{item.first_name_en}}</md-tooltip>
                        </div>
                      </md-layout>
                    </md-layout>
                  </md-layout>
                </div>
              </transition-group>
              <div class="box" v-if="arr_sales.length%2 !=0">
                <md-layout class="ml-10 height-60" md-column md-gutter>
                  <md-layout md-flex="60" md-align="start">
                    <md-layout class="mr-18" md-flex="20" md-align="start">
                      <div></div>
                    </md-layout>
                    <md-layout md-flex="30" class="pl-10">
                      <div class="font-bold">
                        <span class="md-display -font-14 -gray-41 latoFont"></span>
                      </div>
                      <div class="width-150">
                        <span class="md-display defaultCls -list-block -font-14 latoFont -gray-72"></span>
                        <md-tooltip md-direction="top" class="-font-14 latoFont font-weight100"></md-tooltip>
                      </div>
                    </md-layout>
                  </md-layout>
                </md-layout>
              </div>
            </div>
            <md-layout md-align="end" md-gutter="16" class="pr-20 pt-0 pb-15">
              <md-layout md-flex="33" md-align="end">
                <md-button
                  @click="toggleExpandList"
                  class="md-raised -orange mh-0 width-per20 height-40"
                >
                  <label class="md-display -font-14 latoFont">NEXT</label>
                </md-button>
              </md-layout>
            </md-layout>
          </md-layout>
        </md-list-expand>
      </md-list-item>
      <div class="space-list"></div>
      <md-list-item @click="expandLIst(2)">
        <span class="-font-16 latoFont">Select Product</span>
        <md-list-expand>
          <md-layout>
            <md-layout class="expand-level"></md-layout>
            <md-layout md-flex="100">

              <md-layout   md-gutter>
                <md-layout md-flex-small="70" class="ml-50 mr-30" style="display: -webkit-box;">
                  <div class="title-Select-Product mt-8">
                   ONLY LOW TARGET PRODUCTS
                  </div>
                </md-layout>
                <md-layout style="display:flex; justify-content: center;"  md-flex-small="25" class="pr-20 mt-8">
              <div 
                    v-if="only_low_status"
                    @click="set_only()"
                    style="
                    display:flex;
                    justify-content: center;
                    width: 64px;
                    background: #FD7F00 0% 0% no-repeat padding-box;
                    box-shadow: 0px 2px 2px #0000003D;
                    opacity: 1;
                    height: 28px;
                    border-radius: 3px;
                    paddimg-left:0;
                    align-items: center;
                    cursor: pointer;
                    ">
                    <span class="st_btn">YES</span>
                </div>
                <div 
                    v-else
                    @click="set_only()"
                    style="
                    display:flex;
                    justify-content: center;
                    width: 64px;
                    background: #A8A8A8 0% 0% no-repeat padding-box;
                    box-shadow: 0px 2px 2px #0000003D;
                    opacity: 1;
                    height: 28px;
                    border-radius: 3px;
                    paddimg-left:0;
                    align-items: center;
                    cursor: pointer;
                    ">
                    <span class="st_btn">NO</span>
                </div>


                </md-layout>
                <md-layout md-flex-small="100">
                  <md-layout class="mh-24 mt-10 mb-20 expand-line"></md-layout>
                </md-layout>
              </md-layout>

              <div @click="Dialog_BY_CATEGORY()">
                <md-layout  style="cursor: pointer;" md-gutter>
                <md-layout md-flex-small="70" class="ml-50 mr-30" style="display: -webkit-box;">
                  <div class="title-Select-Product">
                   + ADD PRODUCTS
                  </div>
                </md-layout>
                <md-layout style="display:flex; justify-content: center;padding-left:50px" md-flex-small="25" class="pr-20 ">
                   
               <md-icon style="padding-right:5px;color: #000000; opacity:0.54"
                      >arrow_right_down</md-icon
               >
                </md-layout>
                <md-layout md-flex-small="100">
                  <md-layout class="mh-24 mt-10 mb-20 expand-line"></md-layout>
                </md-layout>
              </md-layout>

              </div>

              <md-layout md-gutter>
                <md-layout md-flex-small="70" class="ml-30 mr-30" style="display: -webkit-box;">
                  <div class>
                    <md-checkbox
                      class="md-warn-mo"
                      :value.sync="product_checkall"
                      @change="checkAllProd($event)"
                    ></md-checkbox> 
                    <label class="-font-16 latoFont">CATEGORY</label>
                  </div>
                  <!-- <md-select
                  :disabled="false"
                    :value.sync="options_product_selected"
                    @change="getDataProduct"
                    class="pl-20 mt-8 width-per80 dp-2"
                  >
                    <md-option
                      v-for="items in options_product"
                      v-bind:value="items.id"
                      @selected="selectProduct(items)"
                      :key="items.id"
                    >
                      <label class="-font-16 latoFont">{{items.name}}</label>
                    </md-option>
                  </md-select> -->
                  <div style="padding:20px 0 0 10px;font-family:lato">({{countExpand2}})</div>
                </md-layout>
                <md-layout md-flex-small="25" class="pr-20 mt-8">
                  <md-input-container class="-no-line -searchPer mt-0 mb-10 po-un">
                    <md-icon>search</md-icon>
                    <md-input
                      class="-font-14 latoFont"
                      :placeholder="bd.holder_searchProduct"
                      v-on:change="searchProduct"
                      v-model="bd.txtSerchProduct"
                    ></md-input>
                  </md-input-container>
                </md-layout>
                <md-layout md-flex-small="100">
                  <md-layout class="mh-24 mt-10 mb-20 expand-line"></md-layout>
                </md-layout>
              </md-layout>
            </md-layout>

<!-- Dialog -->
 
<!-- 
  <md-dialog
  ref="dialog">
      aaaaaa
  </md-dialog> --> 

   <md-dialog  
         ref="sub-dialog" 
         style="margin:unset;">
        <md-dialog-title 
        style="
          padding-top:15px;
          margin:0;
          left: 311px;
          width: 658px;
          height: 70px;
          background: #EFEFEF 0% 0% no-repeat padding-box;
          opacity: 1;">
            <span class="title-dialog">ALLOCATE TO SALESMAN</span> 
        </md-dialog-title>
      <md-dialog-content
     
      class="style-scroll"
       style="
        padding:0px 50px 0 50px ;
        background-color:;
        width:655px ; 
        height:668px;
        border:0px
        "> 
       <div style="background-color: ;box-shadow: 0 0 0" class="box-detail ">
      <md-layout
       v-sticky="{ zIndex: 1, stickyTop: 0 }"
       style="
       height: 40px;
       padding:30px 0 60px 0;
       background-color:#fff">
          <div 
          class='head-table'
           >
           <span 
           @click="sort_data('ctg')"
           >
              SALESMAN 
           </span>
            </div>
         
          <div class='head-table' >
            <span 
           @click="sort_data('tg')"
           >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(฿)<br>TARGET
           </span>
             
          </div>
      </md-layout>
        <md-layout>
          <div
              
                @mousedown="edit_row(row)"
                class="menu-dialog"
                :style="{
                'padding': '10px 0 0 15px',
                display: '-webkit-box',
                width: '100%',
                'font-family':'kanit'
                }"
                v-for="(row, index) in this.sub_detail"
                :key="'tbitemss' + index"
              >
              <div style="color:#414141;padding-left:20px;width: 70%;">
               {{row.salesman_code}} : {{row.salesman_name}}
              </div>
              <div style="
               width: 20%;    
               display: flex;
               justify-content: flex-end;
               ">
        <md-input-2
            :data="row"
            :value="row.target"
            @filter="filter_traget"
            @choose="choose_traget"
            :disabled="false"
            @keyup.enter.native="Next(row)"
          ></md-input-2> 
              </div>
          </div>
      </md-layout>
       </div>
      </md-dialog-content>
          <md-dialog-actions>
            <md-button style="color:#A8A8A8;text-transform: none;" class="" @click="closeDialog('close2')">CLOSE</md-button>
            <md-button style="
            opacity: 1;
            text-transform: none;" 
            class="md-primary" @click="closeDialog('SAVE2')">SAVE</md-button>
          </md-dialog-actions>
        </md-dialog>

         <md-dialog   
        
         ref="dialog-category" 
         style="margin:unset;">
        <md-dialog-title 
        style="
          padding-top:15px;
          left: 311px;
          width: 658px;
          height: 70px;
          background: #EFEFEF 0% 0% no-repeat padding-box;
          opacity: 1;">
            <span class="title-dialog">BY CATEGORY</span> 
        </md-dialog-title>

  <div class="style-scroll" @scroll="Scroll" style="overflow-y: scroll;">
  <md-dialog-content
       style="
        padding:0 50px 0 50px ;
        background-color:;
        width:655px ; 
        overflow-y: hidden;
        "> 
       <div 
       class="box-detail ">
      <md-layout
        
        v-sticky="{ zIndex: 1, stickyTop: 0 }"
       style="border-radius: 4px 4px 0 0;display:flex;align-item:center; padding:10px 15px 10px 15px;background-color:#EFEFEF">
          <div  
         
          style="
          display: flex;
          align-items: center;
          width: 6%;
          ">  
           <md-checkbox
            style="margin:0;cursor: pointer;"
            class="md-warn-mo"
            v-model="check_all"
            @change="checkByCatdory('all')">
            </md-checkbox>
                  <!-- <input
                  class="edit_checkbox"
                  type="checkbox"
                  style="height: 18px; width: 18px;"
                  @click="check_select(row,index)"
                  /> -->
          </div>
          <div  
          @click="checkByCatdory('delete')"
          style="
            cursor: pointer; 
            width: 6%;
            background-color:;
            display: flex;
            "
            >
            <md-icon style="color:#95989A ">delete</md-icon>
          </div>
           <div  
          style="
            cursor: pointer; 
            width: 2%;
            background-color:;
            display: flex;
            "
            >
          </div>
          <div  style="width: 86%;">
          <div style="margin:0 15px 0 0px;width: 100%;" class="md-layout-item">  

            <md-search-box2
                @filter="set_cate" 
                v-model="search_cate"
                :placeholder="'Search...'"
                @keyup.enter.native="search_enther"
                style="width:100%;opacity: 0.8;"
              ></md-search-box2> 
         </div>
            </div>
      </md-layout>
      <md-layout
       v-sticky="{ zIndex: 1, stickyTop: 60 }"
       style="
       height: 75px;
       background-color:#fff">
          <div 
          class='head-table'
           >
           <span 
           @click="sort_data('ctg')"
           style="cursor: pointer;">
              BY CATEGORY 
           </span>
            <span>
              <md-icon 
              style="
              padding-left:5px;
              align-items: center;
              display: flex;
              justify-content: end;font-size:18px">

              <span v-if="this.status_sord">arrow_downward</span>
              <span v-else> arrow_upward </span>
              
              </md-icon>
              </span>
            </div>
         
          <div class='head-table' >
            <span 
           @click="sort_data('tg')"
           style="cursor: pointer;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(฿)<br>TARGET
           </span>
             <span>
              <md-icon 
              style="
              padding-left:5px;
              align-items: center;
              display: flex;
              justify-content: end;font-size:18px">
              <span v-if="this.status_sord">arrow_downward</span>
              <span v-else> arrow_upward </span>
              </md-icon>
              </span>
          </div>

      </md-layout>
       <md-layout>
          <div

                @click="pop(row)"
                
                class="menu-dialog"
                :style="{
               'cursor':'pointer',
                'padding': '5px 0 0 15px',
                display: '-webkit-box',
                width: '100%',
                'font-family':'kanit'
                }"
                v-for="(row, index) in this.detail_catg"
                :key="'tbitemss' + index"
              >
              <div style="width: 5%; ">
            <md-checkbox
            class="md-warn-mo"
            style="margin:0;cursor:pointer;"
            v-model="row.checked"
            @change="checkByCatdory(row)">
            </md-checkbox>
              </div>
              <div style="padding-left:20px;width: 70%;">
                {{row.id}} : {{row.name}}
              </div>
              <div style="
               width: 8%;    
               display: flex;
               justify-content: flex-end;
               ">
                {{Number(Number(row.target).toFixed(2)).toLocaleString()}}
              </div>
          </div>
      </md-layout>
  
       
       </div>
      </md-dialog-content>
</div>
      


          <md-dialog-actions>
            <md-button style="color:#A8A8A8;text-transform: none;" class="" @click="closeDialog('close')">CLOSE</md-button>
            <md-button style="
            opacity: 1;
            text-transform: none;" 
            class="md-primary" @click="closeDialog('SAVE')">SAVE</md-button>
          </md-dialog-actions>
        </md-dialog>
<!-- End Dialog  -->

          <div style="padding-left:40%" v-if="products.length == 0">NO DATA</div>
            <div v-else class="container scrollbar pl-0" id="style-scrollbar" v-on:scroll="scrollFunction">
              <transition-group tag="div" name="fade">
                <div class="box" v-for="item in products" :key="item.id">
                  <md-layout>
                    <!-- <md-layout md-column md-gutter style=" height:60px"> -->
                    <md-layout md-flex="60" md-align="start">
                      <md-layout class="mr-18" md-flex="20" md-align="start">
                        <md-checkbox
                          class="md-warn-mo"
                          :id="item.id"
                          :name="item.name"
                          v-model="item.checked"
                          @change="checkChildProd(item.id,item.name,$event)"
                        ></md-checkbox>
                      </md-layout>
                      <md-layout md-flex="30" class="pl-10">
                        <div class="font-bold">
                          <span class="md-display -font-14 latoFont -gray-41">{{item.id}}</span>
                        </div>
                        <div class="width-150">
                          <span
                            class="md-display defaultCls -list-block -font-14 latoFont -gray-72"
                          >{{item.name}}</span>
                          <md-tooltip
                            md-direction="top"
                            class="-font-14 latoFont font-weight100"
                          >{{item.name}}</md-tooltip>
                        </div>
                      </md-layout>
                    </md-layout>
                  </md-layout>
                </div>
              </transition-group>
              <div class="box" v-if="products.length%2 !=0">
                <md-layout class="ml-10 height-60" md-column md-gutter>
                  <md-layout md-flex="60" md-align="start">
                    <md-layout class="mr-18" md-flex="20" md-align="start">
                      <div></div>
                    </md-layout>
                    <md-layout md-flex="30" class="pl-10">
                      <div class="font-bold">
                        <span class="md-display -font-14 -gray-41 latoFont"/>
                      </div>
                      <div class="width-150">
                        <span class="md-display defaultCls -list-block -font-14 latoFont -gray-72"/>
                        <md-tooltip md-direction="top" class="-font-14 latoFont font-weight100"/>
                      </div>
                    </md-layout>
                  </md-layout>
                </md-layout>
              </div>
            </div>
            <md-layout md-align="end" md-gutter="16" class="pr-20 pt-0 pb-15">
              <md-layout md-flex="33" md-align="end">
                <md-button
                  id="nextStp1"
                  class="md-raised -orange mh-0 width-per20 height-40"
                  @click="setNextStep"
                >
                  <label class="md-display -font-14 latoFont">NEXT</label>
                </md-button>
              </md-layout>
            </md-layout>
          </md-layout>
        </md-list-expand>
      </md-list-item>
    </md-list>
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span>{{txt_warning}}</span>
      <md-button class="md-accent -oranges" @click="confirmAlert">Agree</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import VueSticky from 'vue-sticky'
import Vue from "vue";
export default {
  created() {
    this.$store.dispatch('getDefaultYearandmonth')
    this.$store.dispatch("initOrganizes");
    this.$store.dispatch("initProducts");
  },
  computed: {
     detail_catg() {
       return  this.$store.getters["detailCatgory"]
    },
    full_Catgory() {
       return  this.$store.getters["full_Catgory"]
    },
    ...mapGetters({
      arr_sales: "organizes",
      arr_lavel_sales: "options_organize",
      options_organize_selected: "options_organize_selected",
      products: "products",
      options_product: "options_product",
      options_product_selected: "options_product_selected",
      loadProduct: "load_product",
      product_checkall: "product_checkall",
      chkhead_sales: "chkhead_sales",
      countExpand1: "countExpand1",
      temp_countExpand1: "temp_countExpand1",
      temp_countExpand2: "temp_countExpand2",
      countExpand2: "countExpand2",
      countProductAll: "countProductAll",
      countExpandTeam: "countExpandTeam",
      temp_countExpandTeam: "temp_countExpandTeam",
      arr_team: "organizes_team",
      options_team_selected: "options_team_selected",
    }),
    getDataOrganize: function() {
      this.chkHeadSales = true;
      //   let url = "/get-channel-performance";
      //   if (this.$store.getters.options_organize_selected == 2) {
      //     url = "/get-area-performance";
      //   } else if (this.$store.getters.options_organize_selected == 3) {
      //     url = "/get-saleman-performance";
      //   }
      this.$store.dispatch("setOrganizeNull");
      // this.$store.dispatch("getDataOrganizesServiceLoadType");
      //   this.$store.dispatch("getDataOrganizesService", url);
      this.bd.txtSerchSales = "";
      

    },
     getDataTeamOrg: function() {
      this.chkHeadTeam = true;
      let url = "/get-area-performance";
      this.$store.dispatch("setTeamOrgNull");
      this.$store.dispatch("getDataOrganizesService", {url: url, type: "area"});
      if (this.options_organize_selected == null) {
        this.$store.dispatch("getDataOrganizesServiceLoadType");
      }
      this.bd.txtSerchTeam = "";
      var expand = document.getElementsByClassName("md-list-item-expand");
      if(expand.length > 0){
        expand[0].classList.add("md-active");
        expand[1].classList.remove("md-a/ctive");
        expand[2].classList.remove("md-a/ctive");
      }

    },
   
  },
  data() {
    return {
      login: false,
      loadMore: 2500,
      pageProduct: 1,
      url: "",
      bd: {
        product_name: 1,
        txtSerchSales: "",
        txtSerchProduct: "",
        txtSerchTeam: "",
        holder_searchSales: "Filter",
        holder_searchProduct: "Filter",
        holder_searchTeam: "Filter"
      },
      keyword: "",
      expandClasses: "",
      productListSearch: this.getProductList(1, 20),
      arrProductChk: [],
      chkHeadSales: true,
      vertical: "bottom",
      horizontal: "center",
      duration: 7000,
      txt_warning: "",
      only_low_status:false,
      search_cate:'',
      check_all:false,
      checkbox_all:true,
      status_sord:true,
      sort:'',
      search_data:[],
      sub_detail:[],
      old_sub_detail:[],
      head_detail:[],
      edit_traget:'',
      target_inp:'',
      before_detail:[],
      main_traget:[]
    };
  },
  methods: {
    ...mapActions([
      "searchOrganize",
      "setSelectedOrganize",
      "searchProduct",
      "setSelectedProduct"
    ]),
    getDataProduct(val) {
      this.loadMore = 2500;
      this.pageProduct = 1;
      this.$store.dispatch("setloadProduct", true);
      this.chkHeadSales = true;
      this.url = this.mapURL(val);
      // this.$store.dispatch("getDataProductsFirstService", {
      //   url: this.url,
      //   page: this.pageProduct
      // });
      this.$store.dispatch("getDataProductLoadType", {
        url: this.url,
        page: this.pageProduct
      });
      this.bd.txtSerchProduct = "";
    },
     
    scrollFunction(e) {
      if (e.target.scrollLeft > this.loadMore - 1000 && this.loadProduct) {
        this.$store.dispatch("setloadProduct", false);
        this.pageProduct++;
        let val = this.options_product_selected;
        this.url = this.mapURL(val);
        Promise.all([
          this.$store.dispatch("getDataProductsService", {
            url: this.url,
            page: this.pageProduct,
            keyword: this.keyword
          })
        ]).then(() => {
          this.$store.dispatch("setloadProduct", true);
          this.loadMore = this.loadMore + 2500;
        });
      }
    },
    mapURL(val){
      let url = "/get-type-performance";
      if (val == 2) {
        url = "/get-group-performance";
      } else if (val == 3) {
        url = "/get-subgroup-performance";
      } else if (val == 4) {
        url = "/get-catgory-performance";
      } else if (val == 5) {
        url = "/get-product-performance";
      }
      return url;
    },
    searchProduct(param) {
      let val = this.options_product_selected;
      this.url = this.mapURL(val);
      this.loadMore = 2500;
      this.pageProduct = 1;
      this.$store.dispatch("setloadProduct", true);
      this.keyword = param;
      this.$store.dispatch("searchProduct", {
        url: this.url,
        page: this.pageProduct,
        keyword: param
      });
    },
    searchSalesMan(param) {
      this.$store.dispatch("searchOrganize", param);
    },
    searchTeam(param) {
      this.$store.dispatch("searchTeamOrganize", param);
    },

pop( param ){
  this.sub_detail = param.items
  this.head_detail = param;
  this.before_detail = param
  this.$refs['sub-dialog'].open()
},
  filter_traget:function( item ){
  // console.log('Main => ',this.main_traget)
  // console.log(item, Number(this.main_traget.target).toLocaleString())
  this.target_inp = item
  this.main_traget.target =  item
  //  this.edit_traget.target = Number(item)
  // console.log("🚀 ~ file: Step1.vue ~ line 888 ~ item", item)
  },
  Next( param ){
     if(document.getElementById('input'+(param.id+1)) != null){
        this.main_traget = this.sub_detail[(param.id)]
   
        document.getElementById('input'+(param.id+1)).focus()
     }
    
    },
edit_row( param ){
this.main_traget = param
},
choose_traget(){
  
},
 Scroll(event){
   if (
        event.target.scrollTop + event.target.clientHeight >=
        event.target.scrollHeight-1
      ) {
        this.$store.dispatch('scrollLoadGetCatgory')
      }else {
      }
 },
    setNextStep() {
      if(this.countProductAll == this.countExpand2){
        if(this.$store.getters.product_checkall == true){
          this.$store.dispatch("clearProductSelected");
        }
      }else{
        if(this.$store.getters.product_selected.length == 0){
          for(var i = 0 ; i < this.products.length;i++ ){
            let item = this.products[i];
            if(item.checked == true){
              item.status = true;
              this.$store.dispatch("setProductSelected", item);
            }
          }
        }
      } 
      this.$store.dispatch("setAuthenStepCheck", ""); 
      /*console.log('organize='+this.$store.getters.options_organize_selected);
                console.log('organize-data='+this.$store.getters.organizes_data);
                console.log('product='+this.$store.getters.options_product_selected);
                const uncheck = this.$store.getters.products_uncheck;
                for(var x in uncheck){
                    console.log(x+"==>"+uncheck[x]);
                }
                console.log('viewby_value='+this.$store.getters.getViewById);
                console.log('total_type='+this.$store.getters.getTotalType);
                console.log('total_first='+this.$store.getters.getTotalFirst);
                console.log('total_second='+this.$store.getters.getTotalSecond);
                console.log('month_first='+this.$store.getters.getMonthFirst);
                console.log('month_second='+this.$store.getters.getMonthSecond);*/
      /*this.$store.dispatch('getSumSaleTranService',{
                    organize_type:this.$store.getters.options_organize_selected,
                    organizes:this.$store.getters.organizes_data,
                    product_type:this.$store.getters.options_product_selected,
                    products_uncheck:this.$store.getters.products_uncheck,
                    viewby:this.$store.getters.getViewById,
                    totaltype:this.$store.getters.getTotalType,
                    totalfirst:this.$store.getters.getTotalFirst,
                    totalsecond:this.$store.getters.getTotalSecond,
                    monthfirst:this.$store.getters.getMonthFirst,
                    monthsecond:this.$store.getters.getMonthSecond,
                });*/

      if (
        this.$store.getters.organizes_data.length == 0 &&
        this.$store.getters.product_checkall == false &&
        this.$store.getters.product_selected.length == 0
      ) {
        this.txt_warning =
          "Please Select Salesman and Product.";
        this.$refs.snackbar.open();
      }else if (this.$store.getters.organizes_data.length == 0) {
        this.txt_warning = " Please Select Salesman.";
        this.$refs.snackbar.open();
      } else if (
        this.$store.getters.product_checkall == false && this.countExpand2 == 0
        // (this.$store.getters.product_selected.length == 0 && this.countExpand2 == 0)
      ) {
        this.txt_warning = "Please Select Product.";
        this.$refs.snackbar.open();
      } else {
        var stepper = 1;
        var clsStep = document.getElementsByClassName("md-step-header");
        clsStep[stepper].click();
        var html = document.documentElement;
        html.scrollTop = 0;
                    // this.check_step = 1;
      }
    },
    Dialog_BY_CATEGORY(){
      this.$refs['dialog-category'].open()
      this.$store.dispatch('getCatgory')
    },
    closeDialog( param ){
      let data_rs = []
      if(param === 'SAVE'){
       for (let index = 0; index < this.detail_catg.length; index++) {
         const element = this.detail_catg[index];
          if(element.checked){
            data_rs.push(element)
          }
       }
         this.$store.dispatch('saveCategory',data_rs)
         this.$refs['dialog-category'].close()
      }else if(param === 'SAVE2'){
    //  console.log(this.target_inp)
        if(this.target_inp == null){
          this.target_inp = '0'
        }
        if(this.edit_traget){
           this.edit_traget.target = this.target_inp
        }
        this.target_inp='0'
        let sum_target = 0
        for (let index = 0; index < this.sub_detail.length; index++) {
          const element = this.sub_detail[index];
          if(element.target != '0'){
            sum_target+=Number(element.target)
          }
        }
        this.head_detail.target = sum_target
         this.$refs['sub-dialog'].close()
         this.edit_traget  =''
         this.target_inp = null
      }
      if(param === 'close2'){
      
        for (let index = 0; index < this.sub_detail.length; index++) {
          const element = this.sub_detail[index];
          element.target = '0'
        }
         this.head_detail.target = '0'
         this.$refs['sub-dialog'].close()
         this.edit_traget  =''
         this.target_inp = null
      }else if(param === 'close'){
          this.$refs['dialog-category'].close()
      }
    },
    set_only(){
      if(this.only_low_status){
        this.only_low_status = false
      }else {
        this.only_low_status = true
      }
    },
    set_cate( value ){
      this.search_cate = value
    },
    search_enther(){
      this.search_data = []
      for (let index = 0; index < this.full_Catgory.length; index++) {
      const element = this.full_Catgory[index];
      var data = String(element.id +''+element.name)
      var check =  data.indexOf(this.search_cate)
      if(check != -1){
        this.search_data.push(element)
      }
      }
      this.$store.commit('SET_SEARCH',this.search_data)
      // this.detail_catg = this.search_data
     if(this.search_cate === ''){
       this.$store.dispatch('getCatgory')
        // this.$store.commit('SET_SEARCH',this.full_Catgory)
     }
      
    },
    sort_data( param ){
      if(param === 'tg'){
        if(this.sort === 'DEST'){
        this.detail_catg.sort((a, b) => (a.target > b.target ? 1 : -1));
        this.sort = ''
      }else {
         this.detail_catg.sort((a, b) => (a.target > b.target ? -1 : 1));
         this.sort = 'DEST'
      }
      }else {
        if(this.sort === 'DEST'){
        this.detail_catg.sort((a, b) => (a.ta > b.id ? 1 : -1));
        this.sort = ''
      }else {
         this.detail_catg.sort((a, b) => (a.id > b.id ? -1 : 1));
         this.sort = 'DEST'
      }
      }
     
      if(this.status_sord == true){
         this.status_sord = false
      }else {
         this.status_sord = true
      }

    },
    checkByCatdory( param ){
      if(param === 'all'){
        if(this.check_all){
        for (let index = 0; index < this.detail_catg.length; index++) {
          const element = this.detail_catg[index];
          element.checked = false
        }
          this.check_all = false
        }else{
        for (let index = 0; index < this.detail_catg.length; index++) {
          const element = this.detail_catg[index];
          element.checked = true
        }
           this.check_all = true
        }
        }else if(param != 'delete') { 
        if(param.checked){
          param.checked = false
        }else{
          param.checked = true
        }
        }
      if(param === 'delete'){
          for (let index = 0; index < this.detail_catg.length; index++) {
          const element = this.detail_catg[index];
          element.checked = false
        }
         this.check_all = false
      }
    },
  
    confirmAlert() {
      if (this.$store.getters.organizes_data.length == 0) {
        var expand = document.getElementsByClassName("md-list-item-expand");
        expand[0].classList.add("md-active");
        expand[1].classList.remove("md-active");
      }
      this.$refs.snackbar.close();
    },
    selectSales: function(item) {
      this.$store.dispatch("setSelectedOrganize", item.id);
      this.bd.holder_searchSales = "Filter " + item.name;
    },
    selectProduct(item) {
      this.$store.dispatch("setSelectedProduct", item.id);
      this.bd.holder_searchProduct = "Filter " + item.name;
    },
    toggleExpandList: function($event) {
      
      if (this.$store.getters.organizes_data.length == 0) {
        this.txt_warning = " Please Select Salesman.";
        this.$refs.snackbar.open();
      } else {
        var expand = document.getElementsByClassName("md-list-item-expand");
        expand[0].classList.remove("md-active");
        expand[1].classList.remove("md-active");
        expand[2].classList.add("md-active");
        if (this.options_product_selected == null) {
          this.$store.dispatch("getDataProductLoadType", {
            url: this.url,
            page: this.pageProduct
          });
        }else{
          this.getDataProduct(this.options_product_selected);
        }
      }
    },
    toggleExpandTeam: function($event) {
      if (this.$store.getters.organizes_team_data.length == 0) {
        this.txt_warning = " Please Select Sales Team.";
        this.$refs.snackbar.open();
      } else {
        var expand = document.getElementsByClassName("md-list-item-expand");
        expand[0].classList.remove("md-active");
        expand[1].classList.add("md-active");
        expand[2].classList.remove("md-active");
        // if (this.options_organize_selected == null) {
          this.$store.dispatch("getDataOrganizesServiceLoadType");
        // }
      }
    },
    expandLIst(key) {
      var expand = document.getElementsByClassName("md-list-item-expand");
      if (key == 0) {
        if (expand[0].classList.contains("md-active")) {
          expand[0].classList.remove("md-active");
        } else {
          expand[0].classList.add("md-active");
        }
        expand[1].classList.remove("md-active");
        expand[2].classList.remove("md-active");
      }else if (key == 1) {
        if (expand[1].classList.contains("md-active")) {
          expand[1].classList.remove("md-active");
        } else {
          expand[1].classList.add("md-active");
        }
        expand[0].classList.remove("md-active");
        expand[2].classList.remove("md-active");
        // expand[0].classList.add("md-active");
        // if (this.options_organize_selected == null) {
          this.$store.dispatch("getDataOrganizesServiceLoadType");
        // }
      } else {
        if (this.$store.getters.organizes_data.length == 0) {
          this.txt_warning = " Please Select Sales Team.";
          this.$refs.snackbar.open();
        } else {
          if (expand[2].classList.contains("md-active")) {
            expand[2].classList.remove("md-active");
          } else {
            expand[2].classList.add("md-active");
          }
          expand[0].classList.remove("md-active");
          expand[1].classList.remove("md-active");
          // expand[1].classList.add("md-active");
          if (this.options_product_selected == null) {
            this.$store.dispatch("getDataProductLoadType", {
              url: this.url,
              page: this.pageProduct
            });
          }else{
            this.getDataProduct(this.options_product_selected);
          }
        }
      }
    },
    
    checkAllSales: function(e) {
      this.$store.dispatch("setChkHeadSales", e);
      for (var i = 0; i < this.arr_sales.length; i++) {
        this.arr_sales[i].checked = e;
      }
      if(e){
        this.$store.commit("SET_COUNT_EXPAND1" , this.temp_countExpand1)

      }else{
        this.$store.commit("SET_COUNT_EXPAND1" , 0)
      }
    },
    checkAllTeam: function(e) {
      this.$store.dispatch("setChkHeadTeam", e);
      for (var i = 0; i < this.arr_team.length; i++) {
        this.arr_team[i].checked = e;
      }
      if(e){
        this.$store.commit("SET_COUNT_EXPANDTEAM" , this.temp_countExpandTeam)

      }else{
        this.$store.commit("SET_COUNT_EXPANDTEAM" , 0)
      }
    },
    checkAllProd: function(e) {
      this.$store.dispatch("setProductCheckAll", e);
      for (var i = 0; i < this.products.length; i++) {
        this.products[i].checked = e;
      }
      if(e){
        this.$store.commit("SET_COUNT_EXPAND2" , this.temp_countExpand2)

      }else{
        this.$store.commit("SET_COUNT_EXPAND2" , 0)
      }

      if (e) {
        this.$store.dispatch("setUnselectedProductNull");
        this.$store.dispatch("clearProductSelected");
      } else {
        this.$store.dispatch("setUnselectedProductNull");
        this.$store.dispatch("clearProductSelected");
      }
    },
    checkChildSales(id, e) {
      this.$store.dispatch("setUnselectedOrganizeById", { id, status: e });
      var found = this.arr_sales.find(element => {
        return !element.checked;
      });
      if (found) this.$store.dispatch("setChkHeadSales", false);
      else this.$store.dispatch("setChkHeadSales", true);
    },
    checkChildTeam(id, e) {
      this.$store.dispatch("setUnselectedOrganizeTeamById", { id, status: e });
      var found = this.arr_team.find(element => {
        return !element.checked;
      });
      if (found) this.$store.dispatch("setChkHeadTeam", false);
      else this.$store.dispatch("setChkHeadTeam", true);
    },
    checkChildProd(id, name, e) {
        // this.$store.dispatch("checkProd");
      if (e == false) this.$store.dispatch("setProductCheckAll", false);
      if (this.$store.getters.product_checkall == false) {
        this.$store.dispatch("setProductSelected", { id, name, status: e });
        this.$store.dispatch("setProductUncheck", { id, status: e });
      } 
      /* else {
        this.$store.dispatch("setProductUncheck", { id, status: e });
      } */
      // if (e == false) this.$store.dispatch("setProductCheckAll", false);
      setTimeout(() => {
        this.$store.dispatch("checkProd",e)
        var found = this.products.find(element => {
          
          return !element.checked;
        });
        if (!found) this.$store.dispatch("setProductCheckAll", true);
      }, 1000);

    },
    getProductList(start, end) {
      var arr = [];
      for (var i = start; i < end; i++) {
        arr.push({
          id: i,
          product_code: "000" + i,
          product_name_en: "Filing & Storage" + i
        });
      }
      return arr;
    },
    onChosen(e) {}
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },
      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    },
     sticky: VueSticky,
  },
 
  components:{
    'md-search-box2': require('../../Salesops/customComponent/md-stg-search-box'),
    "md-input-2": require("./md-auto-search-box4.vue"),

  }
};
</script>

<style scoped>
.step1 #style-scrollbar {
  margin-left: 30px;
}
.title-Select-Product{
top: 286px;
left: 444px;
width: 234px;
height: 19px;
font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) 16px/19px var(--unnamed-font-family-lato);
letter-spacing: var(--unnamed-character-spacing-0);
text-align: left;
font: normal normal normal 16px/19px Lato;
letter-spacing: 0px;
color: #414141;
opacity: 1;
}


.st_btn{
left: 777px;
width: 22px;
height: 16px;
font: var(--unnamed-font-style-normal) normal medium 12px/16px Roboto;
letter-spacing: var(--unnamed-character-spacing-0);
color: var(--unnamed-color-ffffff);
text-align: center;
font: normal normal medium 12px/16px Roboto;
letter-spacing: 0px;
color: #FFFFFF;
opacity: 1;
}

.title-dialog{
padding-top:0px;
width: 106px;
height: 19px;
font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) 16px/19px var(--unnamed-font-family-lato);
letter-spacing: var(--unnamed-character-spacing-0);
text-align: left;
font: normal normal normal 16px/19px Lato;
letter-spacing: 0px;
color: #414141;
opacity: 1;

}


.container {
  display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 2px solid #707070;
    border-radius: 4px;
    opacity: 0.7;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
   background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #FD7F00 ;
  border-color: #FD7F00 ;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
   content: '';
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
    left: 6px;
    top: 1px;
    width: 5px;
    height: 11px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
.head-table{
   
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font: var(--unnamed-font-style-normal) normal bold 12px/15px var(--unnamed-font-family-lato);
    letter-spacing: var(--unnamed-character-spacing-0);
    color: var(--unnamed-color-a8a8a8);
    text-align: left;
    font: normal normal bold 12px/15px Lato;
    letter-spacing: 0px;
    color: #A8A8A8;
    opacity: 1;
}
.box-detail{
background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 0px 3px #00000029;
opacity: 1;
border-radius: 4px;
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