<template>
<div class="showDlgComment po-showComment " >
    <div class="dialog no-padding pv-0 width-240">
        <md-list  class="-bg-gray-EF pt-0">
            <md-list-item>
                <span>ALL</span>
                <md-list-expand>
                    <md-list class="width-250"  v-for="(row, rowIndex) in comments['all']" :key="row.id">
                    <div :class="getRowColor(row.status_read)">
                        <li class="md-list-item custom-list" :class="getRowColor(row.status_read)">
                            <div class="md-list-item-container"  :class="getRowColor(row.status_read)">
                            <md-avatar class="md-avatar-icon _icon-per -gray mr-16 text-center">
                              <div  class="mt-5">
                                <label class="-font-9 latofont color-black" >
                                  <b>{{row.position}}</b>
                                </label>
                              </div>
                            </md-avatar>
                            <div class="md-list-text-container latoFont">
                                <span class="-gray-76 kanitFont -font-12" >
                                    {{row.name}} {{row.emp_id}} (draf)</span> 
                                <span class="-font-10 -gray-A8 ">
                                    {{showDateTime(row.createdate,0)}}</span></div></div></li> 
                            <div class="latoFont ml-20 -font-10 -gray-72 mb-5" v-if="row.team_select != null">
                                <span :class="row.font_style">{{row.type}}</span><br>
                                <span  class="-gray-72 -list-block" style="width: 200px;">{{row.team_select}} 
                                    <md-tooltip md-direction="left">{{row.team_select}}</md-tooltip>
                                </span>
                            </div>       
                            <div class="latoFont ml-20 -font-13 -gray-72 mb-5">
                                <span :class="row.font_style">
                                    {{row.comment}}</span></div> 
                                    <hr class="md-divider md-inset" v-if="rowIndex != comments['all'].length-1">
                        </div>
                    </md-list>
                </md-list-expand>
            </md-list-item>
                <md-divider class="md-inset"></md-divider>
                <md-list-item>
                    <span>{{getBeforMont()}}</span>
                    <md-list-expand>
                        <md-list class="width-250"  v-for="(row, rowIndex) in comments['before']" :key="row.id">
                        <div :class="getRowColor(row.status_read)">
                            <li class="md-list-item custom-list" :class="getRowColor(row.status_read)">
                                <div class="md-list-item-container"  :class="getRowColor(row.status_read)">
                                <md-avatar class="md-avatar-icon _icon-per -gray mr-16 text-center">
                                    <div  class="mt-5">
                                        <label class="-font-9 latofont color-black" >
                                        <b>{{row.position}}</b>
                                        </label>
                                    </div>
                                </md-avatar> 
                                <div class="md-list-text-container latoFont">
                                    <span class="-gray-76 kanitFont -font-12">
                                        {{row.name}} {{row.emp_id}}</span> 
                                    <span class="-font-10 -gray-A8 ">
                                        {{showDateTime(row.createdate,1)}}</span></div></div></li> 
                                <div class="latoFont ml-20 -font-10 -gray-72 mb-5" v-if="row.team_select != null">
                                    <span :class="row.font_style">{{row.type}}</span><br>
                                    <span  class="-gray-72 -list-block" style="width: 200px;">{{row.team_select}} 
                                        <md-tooltip md-direction="left">{{row.team_select}}</md-tooltip>
                                    </span>
                                </div>  
                                <div class="latoFont ml-20 -font-13 -gray-72 mb-5">
                                    <span :class="row.font_style">
                                        {{row.comment}}</span></div> 
                                        <hr class="md-divider md-inset" v-if="rowIndex != comments['before'].length-1"></div>
                        </md-list>
                    </md-list-expand>
                </md-list-item>
                <md-divider class="md-inset"></md-divider>
                    <div class="text-left mv-0 mh-0 -font-16 ph-16 pt-8 height-36 latoFont" >
                        <span>{{nowDate()}}</span>
                    </div>
                    <md-divider class="md-inset"></md-divider>
                    <div style="max-height: 375px; overflow: auto; overflow-x: hidden !important;">
                <div :class="getRowColor(row.status_read)" v-for="row in comments['now']" :key="row.id">
                    <md-list-item  class="custom-list " :class="getRowColor(row.status_read)">
                        <md-avatar class="md-avatar-icon _icon-per -gray mr-16 text-center">
                              <div  class="mt-5">
                                <label class="-font-9 latofont color-black" >
                                  <b>{{row.position}}</b>
                                </label>
                              </div>
                        </md-avatar>
                        <div class="md-list-text-container latoFont" >
                            <div>
                                <span class="-gray-76 kanitFont -font-12" >{{row.name}} {{row.emp_id}}</span>
                                <span class="-gray-76 kanitFont -font-12" style="padding-left: 25px;">{{row.cycle}}</span>
                            </div>
                            <div>
                                <span class="-font-10 -gray-A8 text-left">{{showDateTime(row.createdate,2)}}</span>
                                <span class="-font-10 -gray-A8 text-rigth" style="padding-left: 40px;">{{row.type}}</span>
                            </div>
                        </div>
                    </md-list-item>
                    <div class="latoFont ml-20 -font-11 -gray-72 mb-5" v-if= "row.team_select != null">
                        <span  class="-gray-72 -list-block" style="width: 200px;">{{row.team_select}} 
                            <md-tooltip md-direction="left">{{row.team_select}}</md-tooltip>
                        </span>
                    </div>  
                    <div class="latoFont ml-20 -font-13 -gray-72 mb-5">
                        <span :class="row.font_style" >{{row.comment}}</span>
                    </div>
                    <md-divider class="md-inset"></md-divider>
                </div>
                </div>
            <md-list-item  class="-bg-gray-EF">
                <md-input-container class="-no-line -search mt-15 mb-10">
                    <md-input placeholder="add a comment" v-model="txtComment"  @click.native="readComment"></md-input>
                </md-input-container>
            </md-list-item>
            <md-list-item class="-bg-gray-EF">
            <md-button class="md-raised -orange mr-5 button-comment"  @click="saveComment">
                    <label class="md-display -font-14 latoFont">Reply</label>
                </md-button>
                <md-button class="md-raised -gray-A8 button-comment" @click="closeComment">
                    <label class="md-display -font-14 latoFont">Cancel</label>
                </md-button>
            </md-list-item>
            </md-list>
        </div>
    </div>
</template>
<script>
  import Vue from 'vue';
  import {mapGetters,mapActions} from 'vuex'; 
  import moment from 'moment'
  var show_comment = true;
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
            ...mapGetters({ comments: 'getComment' ,
            }),
        },
        created () {
        },
        props : {
            value : {},
        },
        data() {
            return {
                arr_notifi: arr_notifi,
                txtComment:'',
                showComment:false,

            }
        },
        methods : {
            ...mapActions([
                'saveComment',
            ]),
            getBeforMont(){
                return moment().add(-1, 'months').format("MMM YYYY");
            },
            getRowColor(status){
               /*  if(status == 'C'){
                    return 'white-DF';
                }else{
                    return 'red-DF';
                } */
                if(status == 'Y'){
                    return 'white-DF';
                }else{
                    return 'red-DF';
                }
            },
            showDateTime(createdate,type){
                const date = moment(createdate);
                if(date.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
                    return date.format('H:mm A')+" Today";
                }else if(date.format('YYYY-MM-DD') == moment().add(-1, 'days').format('YYYY-MM-DD')){
                    return date.format('H:mm A')+" Yesterday";
                }else if(moment().diff(date, 'days')<7){
                    return date.format('H:mm A')+" "+date.format('dddd');
                }else{
                    if(type>0)
                        return date.format('dddd DD,')+" "+date.format('H:mm A');
                    else
                        return date.format('dddd MMM DD, YYYY')+" "+date.format('H:mm A');
                }
            },
            nowDate(){
              return moment().format('MMM YYYY')
            },
            saveComment(){
                if(this.txtComment != ''){
                    const comment = {
                        'position':Vue.localStorage.get('department').trim(),
                        'emp_id':Vue.localStorage.get('emp_id').toString().trim(),
                        'name':Vue.localStorage.get('first_name').trim(),
                        'status':'C',
                        'comment':this.txtComment.trim(),
                        'createdate':moment().format('YYYY-MM-DD HH:mm:ss'),
                    }
                    this.$store.dispatch('saveComment',comment);
                    this.txtComment = '';
                 this.$ga.event(this.$ga_key.Planning_Tripplan_SaveComment);
                }
            },
            closeComment(){  
                 this.$ga.event(this.$ga_key.Planning_Tripplan_CancelComment);
                this.$emit("closeComment" , false);
            },  
            setShowComment(){  
                this.showComment = false; 
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
            readComment() {
                console.log("readComment");
                const comment = {
                        'emp_id':Vue.localStorage.get('emp_id').toString().trim(),
                        'status_read':'Y',
                    }
                this.$store.dispatch("updateComment",comment);
            },
        },
       
    }
</script>