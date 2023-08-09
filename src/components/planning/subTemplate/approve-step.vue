<template>
    <div class="width-pre100" >
        <div class="nested-sales-dp" >
            <ul class="menu pl-0 mv-0">
                <li class="text-left height-70" >
                        
                        <md-layout class="pv-20 approve-bg" md-align="center" style="padding-left: 50px;" v-if="this.users.length == 0">
                            <span class="nodata">NO DATA</span>
                        </md-layout>
                        <a class="sales-tag approve-a" @click="opensDP">
                        <md-layout class="pv-20 approve-bg" v-if="this.users.length > 0">
                            <md-layout md-align="start" md-flex="75">
                                <div class="mh-20 mt-10">
                                    <md-avatar v-if="user.type == 'A'" class="md-avatar-icon -green _icon-status"></md-avatar>
                                    <md-avatar v-else-if="user.type == 'R'" class="md-avatar-icon -red _icon-status"></md-avatar>
                                    <md-avatar v-else-if="user.type == 'P' && user.status == 'reject'" class="md-avatar-icon -red _icon-status"></md-avatar>
                                    <md-avatar v-else-if="user.type == 'P' && user.status == 'approve'" class="md-avatar-icon -green _icon-status"></md-avatar>
                                    <md-avatar v-else class="md-avatar-icon -warm _icon-status"></md-avatar>
                                    <!--md-avatar v-if="value.activity == 'issue'" class="md-avatar-icon -warm _icon-status"></md-avatar>
                                    <md-avatar v-if="value.activity == 'active'" class="md-avatar-icon -green _icon-status"></md-avatar>
                                    <md-avatar v-if="value.activity == 'inactive'" class="md-avatar-icon -red _icon-status"></md-avatar-->
                                </div>
                                <div class="pr-20 mt-10 sales-tag -font-16">
                                    <span class="kanitFont sales-tag color-65">{{user.first_name}} {{user.last_name}}</span>  
                                    <span class="latoFont sales-tag color-65">{{user.emp_id}}</span>
                                </div>
                                <div class="ml-20 mr-30 kanitFont mt-10 sales-tag -font-14">
                                    <i class="md-icon -font-13 material-icons sales-tag">ic_arrow_drop_down</i>
                                </div>
                                <div class="ml-50 kanitFont mt-10 sales-tag -font-14">
                                    <span class="-gray-A8 body-primary-text">({{getCountApprove()}} more pending approval)</span>
                                    <!--<span>({{arr_selectView.length}} more pending approval)</span>
                                    -->
                                </div>
                                <nested-team-dp 
                                    class="pr-20 mt-10 sales-tag pl-20"
                                    v-if="this.showApproveButton && this.lock_process == false"
                                    :value="this.select_team"
                                    @organselected="selectedTeam"> 
                                    </nested-team-dp>
                                <div class="ml-20 kanitFont mt-10 sales-tag -font-14">
                                    <span class="pl-10 -redsummary -font-20" v-if="this.lock_process == true" style="padding-top: 10px; padding-bottom: 10px;"><b>System Locking</b></span>
                                </div>
                            </md-layout>
                            <md-layout md-align="end" class="pr-15" v-if="this.showApproveButton && this.lock_process == false">
                                <md-button class="md-raised -gray-A8 pr-20 pl-10 mh-0 width-134" @click="rejectClick" >
                                    <label class="pl-18"><b>{{txt_button1}}</b></label>
                                </md-button>
                                <md-button class="md-raised -green pr-20 pl-10" @click="approveClick">
                                    <md-icon md-align="end">done</md-icon>
                                    <label class="pl-18"><b>{{txt_button2}}</b></label>
                                </md-button>
                            </md-layout>    
                            <md-layout md-align="end" v-if="this.showRecallButton && !this.showApproveButton && this.lock_process == false"> 
                                <md-button  class="md-raised -gray-A8 pr-20 pl-10 mv-0" @click="recallClick" style="width: 134px !important">
                                    <label class="pl-18"><b>RECALL</b></label>
                                </md-button>
                            </md-layout>
                        </md-layout>   
                    </a>
                    <ul class="submenu ph-0 pv-0" v-click-outside="outsideOpensDP">
                        <li v-for="(rows , index) in users" class="shows mt-0" @click="salesSelected(rows)">
                            <a>
                                <md-layout class="pt-5">
                                    <md-layout md-align="start" md-flex="80">
                                        <div class="md-avatar md-avatar-icon _icon-status-rec -gray mh-0">
                                            <!--<label class="md-subheading" >
                                                    <b>{{items.short_name}}</b>
                                            </label>
                                            -->
                                        </div>
                                        <div class="pl-20 -list-block pr-20 -font-14">
                                            <span class="kanitFont">{{rows.first_name}} {{rows.last_name}}</span>  
                                            <span class="latoFont">{{rows.emp_id}}</span>
                                        </div>
                                    </md-layout>   
                                    <md-layout  md-flex="10">
                                        <div class="mr-20 latoFont">
                                            <md-chip v-if="rows.type == 'A'" class="-green -rectangle -small pr-0" >
                                                <b>APPROVED</b>
                                            </md-chip>
                                            <md-chip v-else-if="rows.type == 'P'" class="-gray-A8 -rectangle -small">
                                                <b>PENDING</b>
                                            </md-chip>
                                            <md-chip v-else class="-red -rectangle -small pr-0">
                                                <b>REJECTED</b>
                                            </md-chip>
                                        </div>
                                    </md-layout>   
                                </md-layout>   
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!--Start confirm dialog-->
            <md-dialog-confirm class="z-index-3"
                :md-title="dlg.title"
                :md-content-html="dlg.contentHtml"
                :md-ok-text="dlg.ok"
                :md-cancel-text="dlg.cancel"
                @open="closeDialog"
                @close="submitDlg"
                ref="dlgname">
            </md-dialog-confirm>
        <!--End confirm dialog-->
    </div>
</template>

<script>
let opsDP = false

import {mapGetters,mapActions} from 'vuex'; 
import nestedTeamDB from './nested-team-dp';
    export default {
        computed: {
            ...mapGetters({ users: 'getUsersRequest', 
                            user: 'getUserRequest', 
                            user_id: 'getUserIdRequest',
                            showRecallButton :'getRecallButton',
                            showApproveButton :'getApproveButton',
                            lock_process: 'getCheckLockProcess',
                            select_team: "getTeamByValue"
            })
        },
        props : {
            value : {}
        },
        components: {
            'nested-team-dp' :nestedTeamDB
        },
        data () {
            return {
                txt_button1 : 'REJECT',
                txt_button2 : 'APPROVE',
                // showApproveButton: true,
                dlg: { title: 'title', contentHtml: '....', ok: 'Yes', cancel: 'Cancel',subject: null},
                showSelects : true,
            }
        },
        methods : {
            ...mapActions([
                "selectedTeam"
            ]),
            opensDP(){
                var b = document.querySelector(".nested-sales-dp .menu li:hover > .submenu"); 
                if(opsDP == false){
                    if(b != null){
                        b.setAttribute("style", "display:block");
                        opsDP = true
                    }
                }else{
                    if(b != null){
                        b.setAttribute("style", "display:none");
                        opsDP = false
                    }
                }
             },
            salesSelected(rows){
                if(this.user_id != rows.emp_id){
                    if(rows.type == 'P'){
                        if(rows.status == 'reject'){
                            this.$store.dispatch('setRecallButton',false);
                            // this.showApproveButton = true;
                            this.$store.commit('SET_APPROVE_BUTTON',true);
                        }else{
                            this.$store.dispatch('setRecallButton',false);
                            // this.showApproveButton = true;
                            this.$store.commit('SET_APPROVE_BUTTON',true);
                            
                        }
                        this.$store.dispatch('setUserRequest',rows);
                        var b = document.querySelector(".nested-sales-dp .menu li:hover > .submenu"); 
                        if(b != null){
                            b.setAttribute("style", "display:none");
                            opsDP = false
                        }
                        
                    }else{
                        // if(rows.status == 'send')
                        this.$store.dispatch('setRecallButton',false);
                        // this.showApproveButton = false;
                        this.$store.commit('SET_APPROVE_BUTTON',false);
                        this.$store.dispatch('setUserRequest',rows);
                        var b = document.querySelector(".nested-sales-dp .menu li:hover > .submenu"); 
                        if(b != null){
                            b.setAttribute("style", "display:none");
                            opsDP = false
                        }
                    }
                    // if(rows.type == 'A' || rows.type == 'R'){
                    //     if(rows.status == 'send')
                    //         this.$store.dispatch('setRecallButton',true);
                    //     // this.showApproveButton = false;
                    //     this.$store.commit('SET_APPROVE_BUTTON',false);
                    //     this.$store.dispatch('setUserRequest',rows);
                    //     var b = document.querySelector(".nested-sales-dp .menu li:hover > .submenu"); 
                    //     if(b != null){
                    //         b.setAttribute("style", "display:none");
                    //         opsDP = false
                    //     }
                    // }else{
                    //     this.$store.dispatch('setRecallButton',false);
                    //     // this.showApproveButton = true;
                    //     this.$store.commit('SET_APPROVE_BUTTON',true);
                    //     this.$store.dispatch('setUserRequest',rows);
                    //     var b = document.querySelector(".nested-sales-dp .menu li:hover > .submenu"); 
                    //     if(b != null){
                    //         b.setAttribute("style", "display:none");
                    //         opsDP = false
                    //     }
                    // }
                }
             },
            saveDraftClick() {
                this.dlg =  {
                    title: 'Do you want to save draft ?',
                    contentHtml: "Changes might be saved ",
                    subject : 'SAVE_DRAFT'
                };
                this.openDialog();
            },
            approveClick() {
                this.dlg =  {
                    title: 'Do you want to approve ?',
                    contentHtml: "Changes might be saved ",
                    subject : 'APPROVE'
                };
                this.openDialog();
            },
            rejectClick() {
                this.dlg =  {
                    title: 'Do you want to reject ?',
                    contentHtml: "Changes might be saved ",
                    subject : 'REJECT'
                };
                this.openDialog();
            },
            recallClick() {
                this.dlg =  {
                    title: 'Do you want to recall ?',
                    contentHtml: "Changes might be saved ",
                    subject : 'RECALL'
                };
                this.openDialog();
            },
            outsideOpensDP: function (e) {
                if(e.target.className!='md-layout md-flex-50 md-align-start' 
                && e.target.className!='md-icon -font-13 material-icons sales-tag'
                && e.target.className!='pl-20 kanitFont mt-10 sales-tag'
                && e.target.className!='pr-20 mt-10 sales-tag'
                && e.target.className!='kanitFont sales-tag'
                && e.target.className!='kanitFont sales-tag color-65'
                && e.target.className!='latoFont sales-tag color-65'
                && e.target.className!='latoFont sales-tag'
                && opsDP == true
                ){

                    var b = document.querySelector(".nested-sales-dp .menu li ul.submenu"); 
                    if(b != null){
                        b.setAttribute("style", "display:none");
                        opsDP = false
                    }
                }
             },
             getCountApprove: function (){
                //  const result = this.users.filter(word => word.type =='P' || word.type =='R');
                 const result = this.users.filter(word => word.type =='P'); 
                 return result.length;
             },
              openDialog() {
            this.$refs.dlgname.open();
		},
       	closeDialog() {
            this.$refs.dlgname.close()
		},
        submitDlg(type){
			if(type == "ok"){
                if(this.dlg.subject == 'SAVE_DRAFT'){
					this.$emit('savedraftclick');
				}else if(this.dlg.subject =='RECALL'){
                    // this.showApproveButton = true;
                    this.$store.commit('SET_APPROVE_BUTTON',true);
                    this.$store.dispatch('setRecallButton',false);
                    this.$store.dispatch('recallApprove',{user_id:this.user_id,status:'P'});
                    this.$store.dispatch('recallPerformance',{
                        items:this.$store.getters.getSumItems,
                        adjust:this.$store.getters.getRowAdjust,
                        headdetail:this.$store.getters.getHeadDetail,
                        adjustdetail:this.$store.getters.getAdjustMonthDetailAll,
                        user_id:this.user_id,
                        even_click: "RECALL"

                    });
                }else if(this.dlg.subject =='APPROVE'){
                    // this.showApproveButton = false;
                    this.$store.commit('SET_APPROVE_BUTTON',false);
                    this.$store.dispatch('recallApprove',{user_id:this.user_id,status:'A'});
                    this.$store.dispatch('savePerformance',{
                        viewby:this.$store.getters.getViewById,
                        type:'approve',
                        items:this.$store.getters.getSumItems,
                        adjust:this.$store.getters.getRowAdjust,
                        headdetail:this.$store.getters.getHeadDetail,
                        adjustdetail:this.$store.getters.getAdjustMonthDetailAll,
                        product_keyword:this.$store.getters.product_keyword,
                        organize_type:this.$store.getters.options_organize_selected,
                        organizes:this.$store.getters.organizes_data,
                        product_type:this.$store.getters.options_product_selected,
                        products_uncheck:this.$store.getters.products_uncheck,
                        product_selected:this.$store.getters.product_selected,
                        product_checkall:this.$store.getters.product_checkall,
                        totaltype:this.$store.getters.getTotalType,
                        totalfirst:this.$store.getters.getTotalFirst,
                        totalsecond:this.$store.getters.getTotalSecond,
                        monthfirst:this.$store.getters.getMonthFirst,
                        monthsecond:this.$store.getters.getMonthSecond,
                        user_id:this.$store.getters.getUserIdRequest,
                        team: this.$store.getters.organizes_team_data
                    });
                }else if(this.dlg.subject =='REJECT'){
                     this.$store.dispatch("rejectSalePerformance");
                //    this.$emit('rejectclick');
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
     }
    }
</script>

<style scoped>

.nested-sales-dp .menu li {
  position: relative;
}

.nested-sales-dp .menu li .shows a:hover {
    background: #EFEFEF;
    cursor : pointer;
    text-decoration: none;
}

.nested-sales-dp .menu .submenu {
  display: none;
}

.nested-sales-dp .submenu {
   position: absolute;
   left: 0px;
   top: 105px;
   z-index: 1000 !important;
   width: 350px;
}

.nested-sales-dp .submenu li a {
    display: block;
    background: #fff;
    margin: 0px;
    padding-left: 22px;
    padding-right: 22px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 18px;
    font-family: Lato;
    color: #414141 !important;
    font-style: Regular;
}

.nested-sales-dp .menu .submenu{
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
}

</style>