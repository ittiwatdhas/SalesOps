<template>
<md-layout v-if="this.show_summary">
    <div class="md-card roundsummary">
        <div class="md-layout">
            <div class="md-layout -graysummary md-flex-20 md-align-center">
                <span class="md-display mt-8">SUMMARY</span>
            </div>
            <div class="md-layout md-flex-25 md-align-center">
                <span class="md-display -font-12 mt-8">TOTAL TARGET</span>
            </div>
            <div class="md-layout md-align-start">
                <span class="md-display mt-8  font-bold">{{parseInt(this.total_target).toLocaleString()}}</span>
            </div>
            <div class="md-layout md-flex-15 md-align-start">
                <span class="md-display -font-12 mt-8">BALANCE</span>
            </div>
            <div class="md-layout">
                <span v-if="this.total_balance<0"  class="md-display mt-8 -redsummary font-bold">{{parseInt(this.total_balance).toLocaleString()}}</span>
                <span v-else  class="md-display mt-8 -greensummary font-bold">{{parseInt(this.total_balance).toLocaleString()}}</span>
            </div>
        </div>
    </div>
</md-layout>

</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    export default {
        computed: {
            ...mapGetters({ 
                  show_summary: 'getShowSummary',
                  total_target: 'getSummaryTotalTarget',
                  total_balance: 'getSummaryTotalBalance',
            }),
            
        },
    }
</script>