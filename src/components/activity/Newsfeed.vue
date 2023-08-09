<template>
  <div id="pageNewsfeed">
    <div v-if="!status_login" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-else>
      <md-progress
        v-show="show_progress_loading"
        class="md-warn main-loading"
        :md-progress="1"
        md-indeterminate
      ></md-progress>
      <md-layout md-gutter class="pageNewsfeed-body">
        <lightbox
          ref="gallery"
          :imgs="images"
          :modalclose="modalclose"
          :keyinput="keyinput"
          :mousescroll="mousescroll"
          :showclosebutton="showclosebutton"
          :showcaption="showcaption"
          :imagecountseparator="imagecountseparator"
          :showimagecount="showimagecount"
          :showthumbnails="showthumbnails"
          @click="isShow=!modalclose"
        />
        <!--Blog Left-->
        <div
          class="pt-20"
          style="width:23.5%"
          v-sticky="{ zIndex: 1, stickyTop: 0 }"
          v-if="newf_level == 1"
        >
          <md-layout md-align="start">
            <span class="page-header pt-5">NEWSFEED</span>
          </md-layout>
          <md-layout md-align="start" class="md-search-box mt-20">
            <md-input-container md-theme>
              <md-icon class="pl-4">search</md-icon>
              <md-input
                v-on:change="searchSalesNewsfService"
                placeholder="Search sales…"
                @click.native="gaSearchSalesman()"
              ></md-input>
            </md-input-container>
          </md-layout>
          <ul style="width: unset;" class="md-list md-list-sales-box z-index-0 ">
            <li class="md-list-item sales-box-head">BY GROUP</li>
            <div class="content-dialog"   :style="{'max-height':'355px','overflow-y':$store.getters.newf_group_sales_list.length >10 ? 'scroll' : none}">
             <li
              :class="'md-list-item sales-box-deatil group '+ $store.getters.newf_shw_select_group"
              @click="gaSelectByGroup();selectGroupNewsfSalesService({mode :'all', index : '-1'})"
            >All Salesman</li>
            <li
            style="font-family:Kanit"
              v-for="(items, idx) in $store.getters.newf_group_sales_list"
              :key="idx"
              :class="items.status_check=='unclick' ?'md-list-item sales-box-deatil group '+ items.status_font:'md-list-item sales-box-deatil group active ' + items.status_font"
              @click="gaSelectByGroup();selectGroupNewsfSalesService({mode : items, index : idx})"
            >{{items.team_name}}</li>

            </div>
          


            <li class="md-list-item sales-box-head mt-20">BY SALESMAN</li>
            <div  class="content-dialog"  :style="{'height':'430px','overflow-y':newf_sales_list.length>20 ? 'scroll' : none}">
             <li
              class="md-list-item sales-box-deatil group"
              v-if="newf_sales_list.length == 0"
            >{{txt_data_no_salesman}}</li>
            <li
              v-for="(items, idx) in newf_sales_list"
              :key="'c_' + idx"
              :class="items.status_check=='unclick' ?'md-list-item sales-box-deatil sales':'md-list-item sales-box-deatil sales active'"
              v-if="newf_sales_list.length > 0"
            >
              <md-layout>
                <div style="width: 3%;margin-top:2px;margin-right:10px">
                  <md-avatar v-if="items.status == 'issue'" class="md-cycle-icon small yellow"></md-avatar>
                  <md-avatar v-else-if="items.status == 'active'" class="md-cycle-icon small green"></md-avatar>
                  <md-avatar v-else-if="items.status == 'inactive'" class="md-cycle-icon small red"></md-avatar>
                </div>
                <div style="width: 8%;margin-right:10px">
                  <div class="md-rectangle-icon medium lightgray">{{items.short_name}}</div>
                </div>
                <div
                  md-align="left"
                  class="descript"
                  @click="gaSelectSalesman();selectSalesNewsfService({items : items,index : idx})"
                  :style="{'width': '80%' ,'padding-top':'1.5px'}"
                >
                  <span class="latoFont">{{items.emp_id}}</span>
                  {{items.first_name}} {{items.last_name}}
                  <md-tooltip md-direction="top">
                    <span class="latoFont">{{items.emp_id}}</span>
                    <span class="kanitFont">{{items.first_name}} {{items.last_name}}</span>
                  </md-tooltip>
                </div>
              </md-layout>
            </li>
            </div>
           
          </ul>
        </div>

        <!--Blog Center-->
        <!-- newf_level ==1 -->
        <div :class="newf_level =='1' ? 'super-view':'normal-view'">
          <div @click="addPost" v-sticky="{ zIndex: 2, stickyTop: 0 }">
            <md-layout md-align="center" class="pv-10" style="background-color:#F6F9FC;">
              <md-card
                class="-large -radius4-shadow0-16"
                style=" height: 60px;padding-top: 0px;overflow:hidden"
              >
                <md-card-content class="ph-25 pb-0" style="width: 550px;">
                  <md-list style="display: table;">
                    <md-list-item >
                      <div class="md-cycle-icon big lightgray" style="margin-top:5px"></div>
                      <div class="md-list-item-text">
                        <label
                          class="-font-16"
                          style="padding-top: 0px !important;"
                        >Do you have any updates ?</label>
                      </div>
                    </md-list-item>
                  </md-list>
                </md-card-content>
              </md-card>
            </md-layout>
          </div>
          <md-layout
            v-for="(items,index) in newf_data"
            :key="'nf'+index"
            md-align="center"
            class="center-box"
          >
            <md-card class="-large -radius4-shadow0-16 mb-30">
              <md-card-content class="ph-0" style="padding-bottom:0px;">
                <md-list>
                  <md-list-item>
                    <div class="md-cycle-icon big lightgray"></div>
                    <div class="md-list-item-text pt-10 -font-13 -gray52" style="width:50%">
                      <span class="kanitFont">{{items.saleman_name}}</span>
                      <br>
                      <span class="latoFont">{{items.saleman}}</span>
                    </div>
                    <div
                      class="md-list-item-text pl-10 pt-10 text-right -font-12 -gray81"
                      style="width:50%"
                    >
                      <md-icon style="margin-right:10px">store</md-icon>
                      <span
                        class="kanitFont"
                      >{{items.customer_code}}&nbsp;:&nbsp;{{items.customer_name}}</span>
                      <br>
                      <!-- {{items}} -->
                      <span class="latoFont" style="color:#BDBDBD">{{items.post_date}}</span>
                    </div>
                  </md-list-item>
                </md-list>

                <div class="ph-25 text-left pb-10 -font-16 latoFont">{{items.detail}}</div>

                <div style="white-space:nowrap; overflow-x:auto;height-240" id="style-scroll-h">
                  <div class="text-left pb-4">
                    <img
                      class="pr-10 pt-10 width-330 height-240 lazyload"
                      v-for="(item,index) in items.path"
                      :key="'path'+index"
                      :src="item.linkpath"
                      alt="SALES OPS"
                      @click="setActive(index,items.path)"
                      @changeIndex="changeImg($event)"
                    >
                  </div>
                </div>
                <!-- <md-layout>
                <md-layout v-for="(items, index) in items.path"  class="mt-10 mr-10"  style=" width:  330px; height:  240px;">-->
                <!-- <img  class="pr-10" src="~@/assets/images/tripplan.png" alt='SALES OPS'/> -->
                <!-- <img class="pr-10" src="items.linkpath" alt='SALES OPS'/>
                </md-layout>
                </md-layout>-->
                <div class="ph-25 text-left pb-20">
                  <md-chip
                    v-for="(labels) in items.label"
                    :key="labels.id"
                    md-disabled
                    class="-orange mr-10 mt-10"
                    style="color: #ffffff;"
                  >{{labels.labelname}}</md-chip>
                </div>
                <md-layout md-gutter class="ph-25 pv-10 latoFont">
                  <md-layout>{{items.count_like}} people liked your post</md-layout>
                  <md-layout
                    md-align="end"
                  >{{items.count_coment}} comment • {{items.count_share}} shares</md-layout>
                </md-layout>
                <hr class="md-divider">
                <md-layout md-gutter class="ph-25 pv-10">
                  <md-layout>
                    <md-button
                      v-if="items.status_like=='like'"
                      @click="gaLike();likeShareNewsfService({type:'L',status:0,head_id:items.head_id})"
                    >
                      <img class="pb-5" src="~@/assets/images/Active_Like.png" alt="Like">&nbsp;
                      <label class="newf-btn-like -oranges">Like</label>
                    </md-button>
                    <md-button
                      class="-gray-72"
                      v-else
                      @click="likeShareNewsfService({type:'L',status:1,head_id:items.head_id})"
                    >
                      <img class="pb-5" src="~@/assets/images/Like.png" alt="Like">&nbsp;
                      <label class="newf-btn-like">Like</label>
                    </md-button>
                  </md-layout>
                  <md-layout>
                    <md-button @click="gaClickComment();goto_comment(items.head_id)">
                      <img class="pb-5" src="~@/assets/images/Comment.png" alt="Comment">&nbsp;
                      <span class="newf-btn-comment">Comment</span>
                    </md-button>
                  </md-layout>
                  <md-layout>
                    <md-menu md-align-trigger md-direction="bottom left">
                      <md-button md-menu-trigger @click="gaShared()">
                        <img class="pb-5" src="~@/assets/images/Share.png" alt="Share">&nbsp;
                        <span class="newf-btn-share">Share</span>
                      </md-button>
                      <md-menu-content class="-no-y-scroll" style="width:250px">
                        <md-menu-item
                          v-for="(item) in newf_dropdown_data.cheifSalesman"
                          :key="'chef'+item.id"
                          class="pv-0 height-35"
                          @click="likeShareNewsfService({type:'S',status:1,head_id:items.head_id,share_to:item.emp_id,share_name:item.fullname})"
                        >
                          <md-layout md-align="start" class="pl-10">
                            <div class="latoFont -font-13" style="width:55px">{{item.emp_id}}</div>
                            <div class="kanitFont -font-13" style="
                                  width:150px
                                  white-space: nowrap;
                                  text-overflow: ellipsis;
                                  display: block;
                                  overflow: hidden;">{{item.fullname}}</div>
                            <!-- <md-layout
                              style="display: contents;"
                              class="latoFont -font-13"
                              md-align="start"
                              md-flex="35"
                            >{{item.emp_id}}</md-layout>
                            <md-layout class="kanitFont -font-13" md-align="start" style="padding-left:10px">{{item.fullname}}</md-layout> -->
                          </md-layout>
                        </md-menu-item>
                      </md-menu-content>
                    </md-menu>
                  </md-layout>
                </md-layout>
                <div
                  class="viewMore"
                  v-if="items.comment.length > show_comment && newf_more_comments['P'+items.head_id] != 0"
                >
                  <button
                    class="btn"
                    @click="gaViewMore();expand_view_more(items.head_id)"
                  >View more ({{newf_more_comments['P'+items.head_id]}})</button>
                </div>
                <md-list class="comments">
                  <md-list-item
                    v-for="(comment, index) in items.comment"
                    :key="'C'+comment.id"
                    class="pt-10 block_comment"
                    v-show="index >= newf_more_comments['P'+items.head_id]"
                  >
                    <div class="md-cycle-icon big lightgray"></div>
                    <div class="md-list-item-text -font-14 -gray-52 contains" style="width:100%">
                      <span class="kanitFont">{{comment.commentator}}</span>
                      <br>
                      <span class="kanitFont">{{comment.comment}}</span>
                      <br>
                      <span class="times">{{timeAgo(comment.comment_time)}}</span>
                    </div>
                  </md-list-item>
                </md-list>
                <!--<div :class="inactiveMainComment">-->
                <div :ref="'COM_'+items.head_id" :class="'block_add_comment COM_'+items.head_id">
                  <div class="md-cycle-icon big lightgray"></div>
                  <md-input-container
                    class="-no-line -search"
                    style="border-radius:50px !important;"
                  >
                    <md-input
                      @click.native="gaInputComment()"
                      placeholder="Comment here"
                      v-model="comment"
                      @keyup.enter.native="addCommentNewsfService({head_id:items.head_id});"
                    ></md-input>
                  </md-input-container>
                </div>
              </md-card-content>
            </md-card>
          </md-layout>
          <md-spinner
            :md-size="100"
            :md-stroke="3"
            v-show="show_newf_spinner_loading"
            md-indeterminate
          ></md-spinner>
        </div>

        <!--Blog Right-->
        <div class="rightZone" style="width:17.5%" v-sticky="{ zIndex: 1, stickyTop: 10 }">
          <md-card class="-no-y-scroll">
            <md-layout md-flex="20" md-align="start" class="mt-15 pl-20">
              <label class="header5">SORT BY</label>
            </md-layout>
            <md-layout md-flex="20" md-align="start" class="pl-20 mv-5">
              <md-input-container
                md-theme
                style="padding:0 10px 0 0;min-height: 0px !important;"
                class="mv-0 mh-0 pt-0 pl-20 -ipt-shadow"
              >
                <md-select v-model="id_sort_by" @click.native="gaFilter()">
                  <md-option
                    v-for=" rows in newf_dropdown_data.sort_by"
                    :key="'dp'+rows.id"
                    v-bind:value="rows.id"
                    @selected="filtersNewsfService({rows : rows, type : 'sort_by'})"
                    class="-left"
                  >
                    <md-layout
                      class="mr-10 robotoFont minwidth-170 maxwidth-160 font-weight-300"
                      md-align="start"
                    >
                      <label>{{ rows.name }}</label>
                    </md-layout>
                  </md-option>
                </md-select>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="20" md-align="start" class="mt-20 pl-20">
              <label class="header5">LOCATION</label>
            </md-layout>
            <md-layout md-flex="20" md-align="start" class="pl-20 mv-5">
              <md-input-container
                md-theme
                style="padding:0 5px 0 0;min-height: 0px !important;"
                class="mv-0 mh-0 pt-0 pl-20 -ipt-shadow"
              >
                <md-select v-model="id_location" @click.native="gaFilter()">
                  <md-option
                    v-for=" rows in newf_dropdown_data.location"
                    :key="'l'+rows.id"
                    v-bind:value="rows.id"
                    @selected="filtersNewsfService({rows : rows, type : 'location'})"
                    class="-left"
                  >
                    <md-layout
                      class="mr-10 robotoFont minwidth-170 maxwidth-160 font-weight-300"
                      md-align="start"
                    >
                      <label>{{ rows.name }}</label>
                    </md-layout>
                  </md-option>
                </md-select>
              </md-input-container>
            </md-layout>
            <md-layout md-flex="20" md-align="start" class="mt-20 pl-20">
              <label class="header5">BRAND</label>
            </md-layout>
            <md-layout md-flex="20" md-align="start" class="pl-20 mv-5">
              <md-select-mo style="position:unset;"></md-select-mo>
            </md-layout>
            <md-layout md-flex="20" md-align="start" class="mt-20 pl-20">
              <label class="header5">FEEDBACK</label>
            </md-layout>
            <md-layout md-flex="20" md-align="start" class="pl-20 mv-5">
              <md-input-container
                md-theme
                style="padding:0 5px 0 0;min-height: 0px !important;font-family:kanit"
                class="mv-0 mh-0 pt-0 pl-20 -ipt-shadow"
              >
                <md-select v-model="id_feedback" @click.native="gaFilter()">
                  <md-option
                    v-for=" rows in newf_dropdown_data.feedback"
                    :key="'nf'+rows.id"
                    v-bind:value="rows.id"
                    @selected="filtersNewsfService({rows : rows, type : 'newsfeed'})"
                    class="-left"
                  >
                    <md-layout
                      class="mr-10 robotoFont minwidth-170 maxwidth-160 font-weight-300"
                      md-align="start"
                    >
                      <label style="font-family:kanit">{{ rows.name }}</label>
                    </md-layout>
                  </md-option>
                </md-select>
              </md-input-container>
            </md-layout>
            <div class="text-left mh-20">
              <md-chip
                class="robotoFont -orange mt-5 mh-3 text-left tag-chip"
                v-for="(chip,index) in $store.getters.newf_fb_selected"
                :key="'chpp'+chip.id"
                :md-editable="mdStatic"
                :md-deletable="mdStatic"
                @delete="delPromoNewfService({chip : chip.id , index : index , mode :'feedback',layout :'page'})"
              >
                <slot name="chip" :value="chip.id">{{ chip.name }}</slot>
                <md-tooltip md-direction="top" class="robotoFont">{{chip.name}}</md-tooltip>
              </md-chip>
            </div>
            <md-layout md-flex="20" md-align="start" class="mt-20 pl-20">
              <label class="header5">PROMOTION</label>
            </md-layout>
            <md-layout md-flex="20" md-align="start" class="pl-20 mv-5">
              <md-input-container
                md-theme
                style="padding:0 5px 0 0;min-height: 0px !important;"
                class="mv-0 mh-0 pt-0 pl-20 -ipt-shadow"
              >
                <md-select v-model="id_promotion" @click.native="gaFilter()">
                  <md-option
                    v-for=" rows in newf_dropdown_data.promotion"
                    :key="'pro'+rows.id"
                    v-bind:value="rows.id"
                    @selected="filtersNewsfService({rows : rows, type : 'promotion'})"
                    class="-left"
                  >
                    <md-layout
                      class="mr-10 robotoFont minwidth-170 maxwidth-160 font-weight-300"
                      md-align="start"
                    >
                      <label>{{ rows.name }}</label>
                    </md-layout>
                  </md-option>
                </md-select>
              </md-input-container>
            </md-layout>
            <div class="text-left mh-20">
              <md-chip
                class="robotoFont -orange mt-5 mh-3 text-left tag-chip"
                v-for="(chip,index) in newf_promo_selected"
                :key="'chp'+chip.id"
                :md-editable="mdStatic"
                :md-deletable="mdStatic"
                @delete="delPromoNewfService({chip : chip.id , index : index, mode :'promotion',layout :'page'})"
              >
                <slot name="chip" :value="chip.id">{{ chip.name }}</slot>
                <md-tooltip md-direction="top" class="robotoFont">{{chip.name}}</md-tooltip>
              </md-chip>
            </div>
            <md-layout md-flex="20" md-align="center" class="mb-50 mt-40">
              <md-button class="md-raised -gray-A8 mh-0 height-40" @click="clearFilterNewsfService">
                <label class="md-display -font-14 robotoFont">CLEAR FILTERS</label>
              </md-button>
            </md-layout>
          </md-card>
        </div>
      </md-layout>

      <md-dialog ref="newPost" id="newPost" class="z-index-2">
        <md-dialog-title class="mb-0 -bg-gray-EF pt-15">
          <md-layout>
            <md-layout md-flex-large="50" class="robotoFont">Create a Post</md-layout>
            <md-layout md-flex-large="50" md-align="end">
              <md-button class="md-icon-button" @click="closeDialog('newPost')">
                <md-icon class="mb-15">close</md-icon>
                <md-tooltip md-direction="right">close</md-tooltip>
              </md-button>
            </md-layout>
          </md-layout>
        </md-dialog-title>
        <md-dialog-content class="mh-20 ph-0 width-500" id="style-scroll">
          <md-list>
            <md-list-item>
              <div class="md-cycle-icon big lightgray" style="margin-right:15px;margin-top:13px"></div>
              <div
                class="md-list-item-text pt-10 -font-13 gray52"
                style="width: -webkit-fill-available;"
              >
                <span class="kanitFont">{{full_name}}</span>
                <br>
                <span>{{emp_id}}</span>
              </div>
              <md-icon class="mt-15">store</md-icon>
              <div class="md-list-item-text pl-10">
                <div class="width-200 float-left">
                  <search-customer></search-customer>
                </div>
              </div>
            </md-list-item>
          </md-list>
          <md-input-container class="input-font">
            <md-textarea
              placeholder="Do you have any updates ?"
              v-model="post_massage"
              class="ph-10"
            ></md-textarea>
          </md-input-container>
          <md-layout>
            <md-layout md-flex-large="20" class="dropbox mt-10 mr-10">
              <md-icon class="mt-25 ml-24 -font-50">add</md-icon>
              <input
                type="file"
                id="image"
                class="input-file"
                @change="previewImage"
                accept="image/*"
                @click="gaNewPostAddImage()"
              >
            </md-layout>
            <md-layout
              v-for="(item,index) in image_data"
              :key="'p'+item.id"
              class="mt-10 mr-10 hover-pic"
              md-flex-large="20"
            >
              <div class="edit ml-pre75 -pointer">
                <a @click="deleteImage(index)">
                  <md-icon class="position-absolute -oranges">cancel</md-icon>
                </a>
              </div>
              <img class="preview" :src="item" style="width:100px; height:100px;">
            </md-layout>
          </md-layout>
          <div class="text-left pv-20">
            <div class="label-tag">
              <!-- <md-button class="ph-0 mh-0 mt-4" @click="$easycm($event,$root)"> -->
              <md-button class="ph-0 mh-0 mt-4" @click="opensDP">
                <md-chip class="md-chip -gray-72 pt-5" id="btn_add_label">
                  ADD A LABEL
                  <md-icon class="-font-20">add</md-icon>
                </md-chip>
              </md-button>
              <md-chip
                class="robotoFont -orange mt-5 mh-3 text-left tag-chip"
                v-for="(chip,index) in newf_post_selected"
                :key="'chip_' + index"
                :md-editable="mdStatic"
                :md-deletable="mdStatic"
                @delete="delPromoNewfService({chip : chip.id , index : index, mode :'promotion',layout :'popup'})"
              >
                <slot name="chip" :value="chip.id">{{ chip.name }}</slot>
                <md-tooltip md-direction="top" class="robotoFont">{{chip.name}}</md-tooltip>
              </md-chip>
            </div>
          </div>
        </md-dialog-content>
        <md-dialog-actions class="-bg-gray-EF">
          <md-button
            class="md-raised -gray-A8 md-display -font-14 height-36"
            @click="closeDialog('newPost')"
          >CANCEL</md-button>
          <md-button
            class="md-raised -orange md-display -font-14 height-36 mh-10"
            @click="savePost"
          >PUBLISH</md-button>
        </md-dialog-actions>
      </md-dialog>

      <!-- <easy-cm :list="$store.getters.newf_dropdown_data.label"></easy-cm> -->
      <label-newf
        :id="'labelNewfeed'"
        @close="closeLabel"
        :display="optLabel.display"
        :top="optLabel.top"
        :left="optLabel.top"
      ></label-newf>
      <!--End Layout Left-->
      <!--Stat Dialog Confirm alertCheckPlan-->
      <md-snackbar
        :md-position="newf_snk.vertical + ' ' + newf_snk.horizontal"
        ref="newf_snackbar"
        :md-duration="newf_snk.duration"
      >
        <span>{{newf_snk.txt_warning}}</span>
        <md-button class="md-accent -oranges" @click="closeSnkService">{{newf_snk.txt_submit}}</md-button>
      </md-snackbar>
      <md-dialog-confirm
        :md-title="dlg.title"
        :md-content-html="dlg.contentHtml"
        :md-ok-text="dlg.ok"
        :md-cancel-text="dlg.cancel"
        @open="onOpen"
        @close="onSave"
        ref="dlgsave"
      ></md-dialog-confirm>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import VueSticky from "vue-sticky";
var show_menulabel = false;

export default {
  name: "pageNewsfeed",
  components: {
    "waring-login": require("../Salesops/layout/waring-login"),
    "search-customer": require("./subTemplate/search-customer"),
    "label-newf": require("./subTemplate/label-newf"),
    lightbox: require("../Salesops/gallery/lightbox"),
    "md-select-mo": require("./subTemplate/md-select-mo")
  },

  computed: {
    ...mapGetters({
      all_tag_lable: "all_tag_lable",
      newf_group_sales_list: "newf_group_sales_list",
      newf_shw_select_group: "newf_shw_select_group",
      newf_sales_list: "newf_sales_list",
      newf_level: "newf_level",
      status_login: "status_login",
      show_progress_loading: "show_progress_loading",
      newf_promo_selected: "newf_promo_selected",
      newf_snk: "newf_snk",
      newf_dropdown_data: "newf_dropdown_data",
      newf_sub_lable: "newf_sub_lable",
      newf_head_lable: "newf_head_lable",
      newf_data: "newf_data",
      newf_head_id: "newf_head_id",
      newf_post_selected: "newf_post_selected",
      newf_gallery_img: "newf_gallery_img",
      show_newf_spinner_loading: "show_newf_spinner_loading",
      newf_more_comments: "newf_more_comments"
    })
  },
  beforeCreate() {
    this.$store.commit("setSocket", this.$socket);
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    if (Vue.localStorage.get("login") == null) {
      this.$store.commit("SET_STATUS_LOGIN", false);
    } else {
      this.$store.dispatch("setPathMenuService", "activity");
      //   this.$store.dispatch("setPathMenuService");
      //   this.$store.dispatch("selectedMenuService", { m_code: "activity" });
      this.$store.dispatch("setMasterNewsfeedService");
      this.$store.dispatch(
        "getUserRoleIdNewfService",
        Vue.localStorage.get("emp_id")
      );
      this.$store.commit("SET_STATUS_LOGIN", true);
      this.$store.commit("SET_NEWF_SALES_LIST", []);
      this.$store.commit("SET_NEWF_GROUP_SALES_LIST", []);
      this.$store.commit("SET_NEWF_THIS", this);
      this.$store.commit(
        "SET_NEWF_LEVEL",
        Vue.localStorage.get("config_level")
      );
      this.$store.commit("SET_NEWF_TXT_CUST_SELECTED", "");
      this.$store.commit("SET_NEWF_PROMO_SELECTED", []);
      if (this.newf_level == 1) {
        this.$store.dispatch("setGroupSalesListNewfService");
        this.$store.dispatch(
          "setSalesListNewfService",
          Vue.localStorage.get("emp_id")
        );
        this.$store.commit("SET_NEWF_CHECK_EVT", "all");
      } else {
        this.$store.commit("SET_NEWF_CHECK_EVT", "salesman");
      }

      this.$store.commit("SET_SHOW_SUMMARY", false);
    }
    // // fetches credentials for firebase
    // fetch('/firebase.json')
    //   .then(function(res) {
    //     return res.json();
    //   })
    //   .then(function(config) {
    //     window.firebase.initializeApp(config);
    //     this.registerServiceWorker();
    //   }.bind(this))
    //   .catch(function(err) {
    //     console.error('Unable to find a firebase.json file. Create one with the config credentials.', err);
    //   });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      food: "",
      users: ["jim_halpert", "michael_scott"],
      txt_data_no_salesman: "No Salesman",
      id_sort_by: "",
      id_location: 0,
      id_brand: 0,
      id_promotion: 0,
      id_feedback: 0,
      mdStatic: true,
      inactiveMainComment: "",
      post_massage: "",
      comment: "",
      emp_code: Vue.localStorage.get("emp_code"),
      emp_id: Vue.localStorage.get("emp_id"),
      full_name:
        Vue.localStorage.get("first_name") +
        " " +
        Vue.localStorage.get("last_name"),
      dlg: {
        title: "Do you want save post ?",
        contentHtml: " ",
        ok: "Yes",
        cancel: "Cancel"
      },
      image_data: [],
      files: new FormData(),
      image_arr: [],
      display: false,
      isShow: true,
      images: [
        { imageUrl: "", caption: "" }
        // {'imageUrl':'http://localhost:8000/images/21000/05032018131006ball.png','caption':'12'},
        // {'imageUrl':'http://localhost:8000/images/21000/box.jpg','caption':'14'}
      ],
      index: 0,
      modalclose: true,
      keyinput: true,
      mousescroll: true,
      showclosebutton: true,
      showcaption: true,
      imagecountseparator: "of",
      showimagecount: true,
      showthumbnails: true,
      view_comments: [],
      show_comment: 3,
      optLabel: {
        top: "0px",
        left: "0px",
        display: false
      },
      keepClick: false
    };
  },
  sockets: {
    // update_like: function(data){
    //   console.log('like', data)
    // },
    // update_unlike: function(data){
    //   console.log('unlike', data)
    // }
  },
  methods: {
    ...mapActions([
      "selectGroupNewsfSalesService",
      "selectSalesNewsfService",
      "searchSalesNewsfService",
      "clearFilterNewsfService",
      "filtersNewsfService",
      "closeSnkService",
      "savePostNewsfService",
      "addCommentNewsfService",
      "likeShareNewsfService",
      //"commentBlogNewsfService",
      "delPromoNewfService",
      "getNewsfeedOnScroll"
    ]),
    onClick(text) {
      alert("You clicked " + text);
    },
    handleScroll(event) {
      this.scrolled = window.scrollY > 0;
      if (this.scrolled) {
        let tag = document.getElementsByClassName("md-menu-content");
        if (tag.length > 0) {
          tag[0].style.top = null;
          tag[0].style.left = null;
        }
      }

      window.onscroll = ev => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          this.$store.dispatch("getNewsfeedOnScroll");
        } else {
          return false;
        }
      };
    },
    addPost() {
      this.$ga.event(this.$ga_key.Activity_Newsfeed_CreatePost);
      this.openDialog("newPost");
      this.$store.commit("SET_NEWF_POST_SELECTED", []);
      this.$store.commit("SET_NEWF_TXT_CUST_SELECTED", "");
      this.$store.commit("SET_NEWF_SHOW_CUSTOMER", false);
      this.post_massage = "";
      this.image_data = [];
      this.image_arr = [];
    },
    opensDP(e) {
      this.optLabel.display = true;
      if (this.keepClick == false) {
        this.keepClick = true
        this.$nextTick(() => {
          let top = e.y;
          let left = e.x;
          let id = document.getElementById("labelNewfeed");
          let largestHeight = window.innerHeight - id.offsetHeight - 25;
          let largestWidth = window.innerWidth - id.offsetWidth - 25;
 
          if (top > largestHeight) {
            top = largestHeight;
          }

          if (left > largestWidth) {
            left = largestWidth;
          }

          this.optLabel.top = top + 26+ "px";
          this.optLabel.left = left + "px";
        });
      }
    },
    closeLabel() {
      this.optLabel.display = false;
    },
    savePost() {
      if (this.$store.getters.newf_customer_selected.length <= 0) {
        this.$store.getters.newf_snk.txt_warning = "Please select Customer !";
        this.$refs.newf_snackbar.open();
        return;
      }
      if (this.post_massage == null || this.post_massage == "") {
        this.$store.getters.newf_snk.txt_warning = "Do you have any updates !";
        this.$refs.newf_snackbar.open();
        return;
      }

      if (this.$store.getters.newf_post_selected.length <= 0) {
        this.$store.getters.newf_snk.txt_warning = "Please select Label !";
        this.$refs.newf_snackbar.open();
        return;
      }

      this.openDialog("dlgsave");
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {},
    onSave(type) {
      if (type == "ok") {
        this.gaNewPostPublish();

        let obj = {
          detail: this.post_massage,
          link_path: this.image_arr
        };
        this.$store.dispatch("savePostNewsfService", obj);
        this.closeDialog("newPost");
      }
    },
    previewImage: function(event) {
      // Reference to the DOM input element
      var input = event.target;
      let files = event.target.files || event.dataTransfer.files;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.image_data" refers to the image_data of Vue component
          // Read image as base64 and set to image_data
          this.image_data.push(e.target.result);
          this.files.append("file", input.files[0], input.files[0].name);
          const comment = {
            image: e.target.result,
            image_name: input.files[0].name
          };
          this.image_arr.push(comment);

          document.getElementById("image").value = "";
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    deleteImage(index) {
      this.image_data.splice(index, 1);
      this.image_arr.splice(index, 1);
    },
    setActive(idx, img) {
      this.images = img;
      this.$refs["gallery"].setIndex(idx);
      this.$refs["gallery"].$forceUpdate();
      this.$refs["gallery"].openImg();
    },
    formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },
    goto_comment(refName) {
      var element = this.$refs["COM_" + refName][0];

      var top = element.offsetParent.offsetTop + element.offsetTop - 300;

      window.scrollTo(0, top);

      element.querySelector("input").focus();
    },
    timeAgo(time) {
      switch (typeof time) {
        case "number":
          break;
        case "string":
          time = +new Date(time);
          break;
        /* case "object":
          if (time.constructor === Date) time = time.getTime();
          break; */
        default:
          time = +new Date();
      }
      //   var time_formats = [
      //     [60, "seconds", 1], // 60
      //     [120, "1 minute ago", "1 minute from now"], // 60*2
      //     [3600, "minutes", 60], // 60*60, 60
      //     [7200, "1 hour ago", "1 hour from now"], // 60*60*2
      //     [86400, "hours", 3600], // 60*60*24, 60*60
      //     [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
      //     [604800, "days", 86400], // 60*60*24*7, 60*60*24
      //     [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
      //     [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
      //     [4838400, "Last month", "Next month"], // 60*60*24*7*4*2
      //     [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      //     [58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
      //     [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      //     [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
      //     [58060800000, "centuries", 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
      //   ];
      // console.log(time);
      var month_names = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];

      var today = (+new Date() - time) / 1000;
      if (
        today < 86400 &&
        new Date().getDate() - new Date(time).getDate() == 0
      ) {
        time = new Date(time);
        return this.formatAMPM(time);
      } else if (new Date().getDate() - new Date(time).getDate() == 1) {
        time = new Date(time);
        return "Yesterday " + this.formatAMPM(time);
      } else {
        time = new Date(time);
        if (time.getFullYear() != new Date().getFullYear()) {
          return (
            month_names[time.getMonth()] +
            " " +
            time.getDate() +
            "," +
            time.getFullYear() +
            " at " +
            this.formatAMPM(time)
          );
        } else {
          return (
            month_names[time.getMonth()] +
            " " +
            time.getDate() +
            " at " +
            this.formatAMPM(time)
          );
        }
      }
    },
    // count_view_more(post_id, comment)
    // {
    //     this.view_comments[post_id] = comment.length - comment;
    //     //console.log(this.view_comments)
    //     // console.log(this.view_comments)
    //     return this.view_comments[post_id];
    // },
    expand_view_more(post_id) {
      //this.newf_more_comments[post_id] = 0;
      //console.log(post_id);
      //console.log('view more');

      //console.log(post_id, this.newf_more_comments);
      // console.log(post_id, this.newf_more_comments);
      //this.$store.commit("SET_NEWF_HEAD_ID", post_id);
      //console.log(this.newf_more_comments[post_id]);

      //this.$store.state.newf_more_comments['P'+post_id] = 0;

      //Vue.set(this.$store.state.newf_more_comments, 'P'+post_id, 0);

      this.$store.commit("SET_NEWF_MORE_COMMENTS", post_id);
      this.$store.commit("SET_NEWF_EXPAND_COMMENTS", post_id);

      //Vue.set(this.newf_more_comments, post_id,0)

      //.$forceUpdate();
      //this.inactiveMainComment = "";
      //console.log(this.newf_more_comments[post_id]);
    },

    gaSearchSalesman() {
      this.$ga.event(this.$ga_key.Activity_Newsfeed_SearchSalesnam);
    },
    gaSelectByGroup() {
      this.$ga.event(this.$ga_key.Activity_Newsfeed_SelectSalesGroup);
    },
    gaSelectSalesman() {
      this.$ga.event(this.$ga_key.Activity_Newsfeed_SelectBySalesman);
    },
    gaLike() {
      this.$ga.event(this.$ga_key.Activity_Newsfeed_Like);
    },
    gaShared() {
      this.$ga.event(this.$ga_key.Activity_Newsfeed_Shared);
    },
    gaClickComment() {
      this.$ga.event(this.$ga_key.Activity_Newsfeed_ClickComment);
    },
    gaInputComment() {
      this.$ga.event(this.$ga_key.Activity_Newsfeed_InputComment);
    },
    gaViewMore() {
      this.$ga.event(this.$ga_key.Activity_Newsfeed_ViewMore);
    },
    gaFilter() {
      this.$ga.event(this.$ga_key.Activity_Newsfeed_Filter);
    },
    gaNewPostAddImage() {
      this.$ga.event(this.$ga_key.Activity_Newsfeed_NewpostAddimage);
    },
    gaNewPostPublish() {
      this.$ga.event(this.$ga_key.Activity_Newsfeed_NewpostPublish);
    }
  },
  directives: {
    sticky: VueSticky
  }
};
</script>

<style src="../Salesops/fullDateRange/act-styles.css"></style>
<style scoped>
.input-font.md-input-container.md-has-value textarea,
.input-font.md-input-container.md-input-placeholder textarea {
  font-size: 14px !important;
}

.dropbox {
  outline-offset: -10px;
  background: #efefef;
  color: #ffffff;
  min-height: 100px; /* minimum height */
  max-width: 100px; /* minimum width */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  min-height: 100px; /* minimum height */
  max-width: 100px; /* minimum width */
  position: absolute;
  cursor: pointer;
}

.md-list-item.slcGroup:hover {
  background-color: #efefef;
}
.hover-pic {
  position: relative;
  display: inline-block;
}

.hover-pic:hover .edit {
  display: block;
}

.edit {
  position: absolute;
  display: none;
}

.edit a {
  color: #000;
}

.newf-btn-like {
  font: bold 16px Roboto;
  text-transform: capitalize;
  color: #525252;
}
.newf-btn-comment {
  font: bold 16px Roboto;
  text-transform: capitalize;
  color: #525252;
}
.newf-btn-share {
  font: bold 16px Roboto;
  text-transform: capitalize;
  color: #525252;
}
</style>
