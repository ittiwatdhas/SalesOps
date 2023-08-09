<template>
<div id="commentTrip" style="top:20%;left:18%;
    position: absolute;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);" >
    <div class="dialog  pv-0" style="width: 250px;">
        <md-list  class="-bg-gray-EF pt-0">
                <md-divider ></md-divider>
                <md-list-item class="headgray text-left mv-0 mh-0 pt-8 latoFont" style="padding-left: 2px;" @click="checkMonth">
                    <span class="-font-16">Last Month</span>
                    <md-list-expand>
                    <div style="max-height: 250px; overflow: auto; overflow-x: hidden !important;">
                         <md-list class="width-250"  v-for="(row, rowIndex) in comments['before']" :key="row.id">
                       <!-- <md-list  v-for="(row, rowIndex) in arr_notifi">
                        -->
                                <div :class="getRowColor(row.status)">
                                    <li class="md-list-item custom-list" :class="getRowColor(row.status)">
                                        <div class="md-list-item-container"  :class="getRowColor(row.status)">
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
                                        <div class="latoFont ml-20 -font-13 -gray-72 mb-5" style="text-align:left !important">
                                            <div class="breakWord" :class="row.font_style"> {{row.comment}} </div>
                                            <!--<span :class="row.font_style" >{{row.comment}}</span>-->
                                </div> 
                            <hr class="md-divider" v-if="rowIndex != comments.length-1"></div>
                        </md-list>
                         </div> 
                    </md-list-expand>
                </md-list-item>
                   
                   <md-divider ></md-divider>
                    <div class="text-left mv-0 mh-0 -font-16 ph-16 pt-8 height-36 latoFont" >
                        <span>This Month</span>
                    </div>
                    <md-divider ></md-divider>
                    <div style="max-height: 250px; overflow: auto; overflow-x: hidden !important;">
                <div :class="getRowColor(row.status)" class="width-250"   v-for="row in comments['thismonth']" :key="row.id">
                    <md-list-item  class="custom-list " :class="getRowColor(row.status)">
                        <md-avatar class="md-avatar-icon _icon-per -gray mr-16 text-center">
                              <div  class="mt-5">
                                <label class="-font-9 latofont color-black" >
                                  <b>{{row.position}}</b>
                                </label>
                              </div>
                        </md-avatar>
                        <div class="md-list-text-container latoFont" >
                            <span class="-gray-76 kanitFont -font-12" >{{row.name}} {{row.emp_id}}</span>
                            <span class="-font-10 -gray-A8 ">{{showDateTime(row.createdate,2)}}</span>
                        </div>
                    </md-list-item>
                    <div class="latoFont ml-20 -font-13 -gray-72 mb-5" style="text-align:left !important">
                        <div class="breakWord" :class="row.font_style"> {{row.comment}} </div>
                        <!--<span :class="row.font_style" >{{row.comment}}</span>-->
                    </div>
                    <md-divider ></md-divider>
                </div>
                   </div>  
            <md-list-item  class="-bg-gray-EF">
                <md-input-container class="-no-line -search mt-15 mb-10">
                    <md-input placeholder="add a comment" v-model="txtComment"></md-input>
                </md-input-container>
            </md-list-item>
            <md-list-item class="-bg-gray-EF">
            <md-button class="md-raised -orange mr-5 button-comment"  @click="saveComment">
                    <label class="md-display -font-14 latoFont">Reply</label>
                </md-button>
                <md-button class="md-raised -gray-A8 button-comment mr-16" @click="closeComment">
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
    name: 'Ã Â¸â€œÃ Â¸Â±Ã Â¸ï¿½Ã Â¸Å¾Ã Â¸Â¥ 111642',
    time: '3.37 PM Today',
    comment: 'First comment in thead goes',
    bg_corlor: 'white-DF',
    font_style: '',
    },
    {
        id: 2,
        name: 'Ã Â¸â€œÃ Â¸Â±Ã Â¸ï¿½Ã Â¸Å¾Ã Â¸Â¥ 21000',
        time: '4.55 PM Today',
        comment: 'Adjusted target to THB 48,000 (reduced by THB 2,000)',
        bg_corlor: 'red-DF',
        font_style: 'font_style',
    }];
    export default {
   //     computed: {
   //         ...mapGetters({ comments: 'getComment' ,
   //         }),
   //     },
        created () {
            this.getComment();
            if (Vue.localStorage.get("login") == null) {
                this.login = false;
            }
        },
        props : {
            document_no : "",
            doc_comment : "",
        },
        data() {
            return {
                comments:'',
                txtComment:'',
                txtMonth:'thismonth',
                showComment:false,
            }
        },
        methods : {
            checkMonth(){
                this.txtMonth = 'lastmonth'
                this.getComment();
            },
            getBeforMont(){
                return moment().add(-1, 'months').format("MMM YYYY");
            },
             getThisMont(){
                return moment().format("MMM YYYY");
            },
            getRowColor(status){
                if(status == 'C'){
                    return 'white-DF';
                }else{
                    return 'red-DF';
                }
            },
            showDateTime(createdate,type){
                const date = moment(createdate);
                let txt_date = '';
                if(date.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
                    txt_date = date.format('H:mm A')+" Today";
                }else if(date.format('YYYY-MM-DD') == moment().add(-1, 'days').format('YYYY-MM-DD')){
                    txt_date = date.format('H:mm A')+" Yesterday";
                }else if(moment().diff(date, 'days')<7){
                    txt_date = date.format('H:mm A')+" "+date.format('dddd');
                }else{
                    if(type>0){
                        txt_date = date.format('dddd DD,')+" "+date.format('H:mm A')
                    }else{
                        txt_date = date.format('dddd MMM DD, YYYY')+" "+date.format('H:mm A')
                    }
                }
                  return txt_date;
            },
            saveComment(){
                if(this.txtComment != ''){
                    const comment = {
                        'position':Vue.localStorage.get('department').trim(),
                        'emp_id':Vue.localStorage.get('emp_id').toString().trim(),
                        'name':Vue.localStorage.get('first_name').trim(),
                        'last_name':Vue.localStorage.get('last_name').trim(),
                        'status':'N',
                        'comment':this.txtComment.trim(),
                        'document_no':this.doc_comment.document_no,
                        'emp_id_start':Vue.localStorage.get('emp_id').toString().trim(),
                        'msg_to':this.doc_comment.msg_to
                    }
                    var emp_id = Vue.localStorage.get("emp_id").toString().trim();
                    var key = this.$ga_key.Planning_Tripplan_SaveComment;
                    key.eventLabel = "Save Comment:" + emp_id;
                    this.$ga.event(key);

			         this.$http.post(Vue.config["url"] + "/savecomment-activity", comment, {
					          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
					        })
					        .then(function(response) {
					        		this.txtComment ='';
					        		this.getComment();
					            // success
					        }, function(response) {
					        		this.txtComment = this.txtComment.trim();
					            // error
					        });
                   // this.$store.dispatch('saveComment',comment);
                   // this.txtComment = '';
                }
            },
            getComment(){
                    // let document_no = this.document_no;
                    let doc_comment = this.doc_comment;
                    let self = this;
                    const docs_comment = {
                        'document_no':doc_comment.document_no,
                        'emp_code':doc_comment.emp_code,
                        'emp_id':doc_comment.emp_id,
                        'mg_approve':doc_comment.mg_approve,
                        'month':doc_comment.month,
                        'year':doc_comment.year,
                        'msg_to':doc_comment.msg_to,
                        'status_month':this.txtMonth,
                        'emp_id_login':Vue.localStorage.get('emp_id').toString().trim()
                        
                    }
                    var options = {};
		 			options = {"doc_comment":docs_comment};
		 			
			         this.$http.post(Vue.config["url"] + "/getcomment-activity",options, {
					          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
					        })
					        .then(function(response) {
					         let rs = response.body.success;
					        self.comments = rs.data;
					            // success
					        }, function(response) {
					            // error
					        });
                   // this.$store.dispatch('saveComment',comment);
                   // this.txtComment = '';
            },
            closeComment(){  
                var emp_id = Vue.localStorage.get("emp_id").toString().trim();
                var key = this.$ga_key.Planning_Tripplan_CancelComment;
                key.eventLabel = "Cancel Comment:" + emp_id;
                this.$ga.event(key);
                
                this.$emit("closeComment" , false);
            },  
            setShowComment(){  
                this.showComment = false; 
            },  
            createTagNotifications(value){
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
        },
       
    }
</script>
