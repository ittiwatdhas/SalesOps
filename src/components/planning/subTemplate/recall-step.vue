<template>
     <md-layout md-gutter class="mb-10">
        <md-card style="margin-left:30px;width:100%;" class="mt-10">
            <md-card-content class="pv-30" style="padding-left:25px !important;">
                <md-layout> 
                    <md-layout md-align="start" class="mt-5 ml-10" md-flex="80" v-for="row in header_status" :key="row.id"> 
                        <div class="mr-20">
                            <md-avatar v-if="row.status == 'send'" class="md-avatar-icon -warm _icon-status mb-10"></md-avatar>
                            <md-avatar v-else-if="row.status == 'approved'" class="md-avatar-icon -green _icon-status mb-10"></md-avatar>
                            <md-avatar v-else class="md-avatar-icon -red _icon-status mb-10"></md-avatar>
                        <span class="-gray-41 pl-20 -font-20 latoFont" v-if="row.status == 'send'">Pending Approval from</span>
                        <span class="-gray-41 pl-20 -font-20 latoFont" v-else-if="row.status == 'approved'">Approved from</span>
                        <span class="-gray-41 pl-20 -font-20 latoFont" v-else>Reject from</span>
                        <span class="-gray-41 pl-5 -font-20 latoFont"><b>{{row.userapprove}}</b></span>
                        <span class="-gray-A8 pl-20 body-primary-text" v-if="row.status == 'send' || row.status == 'approved'">submitted on {{renderDate(row.createdate)}}</span>
                        <span class="-gray-A8 pl-20 body-primary-text" v-else>rejected on {{renderDate(row.createdate)}}</span>
                        
                        </div>        
                    </md-layout> 
                    <span class="pl-10 -redsummary -font-20" v-if="this.lock_process == true" style="padding-top: 10px; padding-bottom: 10px;"><b>System Locking</b></span>
                    <md-layout md-align="end"> 
                        <md-button  v-if="this.authen_step == 'recall' && this.lock_process == false" class="md-raised -gray-A8 pr-20 pl-10 mv-0" @click="recallClick" style="width: 134px !important">
                            <label class="pl-18"><b>RECALL</b></label>
                        </md-button>
                        <md-button  v-else-if="this.authen_step == 'reject' && this.lock_process == false" class="md-raised -orange pr-20 pl-10 mv-0" @click="resendClick" style="width: 134px !important">
                            <label class="pl-18"><b>ADJUST</b></label>
                        </md-button>
                    </md-layout>
                    <nested-team-dp 
                        class="pr-20 mt-20 sales-tag pl-50"
                        v-if="this.lock_process == false"
                        :value="this.select_team"
                        @organselected="selectedTeam"> 
                    </nested-team-dp>
                </md-layout>
                <!--md-layout v-else> 
                    <md-layout md-align="start" class="mt-5 ml-10" md-flex="80"> 
                        <div class="mr-20">
                            <md-avatar v-if="this.authen_step == 'recall'" class="md-avatar-icon -warm _icon-status mb-10"></md-avatar>
                            <md-avatar v-else class="md-avatar-icon -red _icon-status mb-10"></md-avatar>
                        <span class="-gray-41 pl-20 -font-20 latoFont" v-if="this.authen_step == 'recall'">Pending Approval from</span>
                        <span class="-gray-41 pl-20 -font-20 latoFont" v-else>Reject from</span>
                        <span class="-gray-41 pl-5 -font-20 latoFont"><b>{{headerStep3.userapprove}}</b></span>
                        <span class="-gray-A8 pl-20 body-primary-text" v-if="this.authen_step == 'recall'">Submitted on {{headerStep3.submitted}}</span>
                        <span class="-gray-A8 pl-20 body-primary-text" v-else><font color="red">Rejected on {{headerStep3.datereject}}</font>,&nbsp;&nbsp;Submitted on {{headerStep3.submitted}}</span>
                        </div>        
                    </md-layout> 
                       
                    <md-layout md-align="end"> 
                        <md-button  v-if="this.authen_step == 'recall'" class="md-raised -gray-A8 pr-20 pl-10 mv-0" @click="recallClick" style="width: 134px !important">
                            <label class="pl-18"><b>RECALL</b></label>
                        </md-button>
                        <md-button  v-else class="md-raised -orange pr-20 pl-10 mv-0" @click="resendClick" style="width: 134px !important">
                            <label class="pl-18"><b>RE-SEND</b></label>
                        </md-button>
                    </md-layout>    
                </md-layout-->  
                     
            </md-card-content>
        </md-card>
    </md-layout>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'; 
    import nestedTeamDB from './nested-team-dp';
    import moment from 'moment';
    export default {
        computed: {
            ...mapGetters({ authen_step: 'getCheckAuthenStep',
                            header_status: 'getHeaderStatus',
                            lock_process: 'getCheckLockProcess',
                            select_team: 'getTeamByValue'
            })
        },
        props : {
            value : {},
        },
        components: {
            'nested-team-dp' :nestedTeamDB
        },
        methods : {
            ...mapActions([
                "selectedTeam"
            ]),
            recallClick() {
                this.$emit('recallclick');
            },
            resendClick() {
                this.$emit('resendclick');
            },
            renderDate(_date){
                 return moment(_date,'YYYY-MM-DD HH:mm:ss').format('MMMM DD, YYYY [at] HH : mm');
            }
     }
    }
</script>

<style scoped>
 
</style>