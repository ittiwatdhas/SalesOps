<template>
    <div id="sear-salesman" class="z-index-3 height-36" >
        <md-input-container class="-no-line -search mt-0 mb-1">
            <md-icon class="mr-5"> search
            <md-tooltip>search</md-tooltip>
            </md-icon>
            <md-input style="font-size:10px" id="sales_ac_filter_cus" placeholder="filter customer…" v-on:change="searchCustomerService"  :value="act_txt_cust_selected"></md-input>
        </md-input-container>
        <md-card class="showCust" v-if="act_shw_customer" v-click-outside="outsideShowCust" id="style-scroll">
            <ul class="md-list"> 
                <li class="md-list-item slcGroup-c" v-for="(cust, idx) in act_customer_list">
                    <div class="slcGroup-c pl-40 -list-block pr-20 latoFont" @click="selectCustomerService(cust)">{{cust.customer_code}}</span> <span class="kanitFont"> {{cust.customer_name_th}}</span></div> 
                </li> 
            </ul>
        </md-card>
    </div>
</template>

<script>
import Vue from "vue";
import {mapGetters,mapActions} from 'vuex'; 
    export default {
        data () {
            return {}
        },
        computed: {
            ...mapGetters({ 
                act_shw_customer: 'act_shw_customer',
                act_customer_selected: 'act_customer_selected',
                act_txt_cust_selected: 'act_txt_cust_selected',
                act_customer_list: 'act_customer_list',
            })
        },
        methods : {
            ...mapActions([
                'searchCustomerService',
                'selectCustomerService',
            ]),
            outsideShowCust: function (e) {
                if(e.target.className!='md-input'){
                     this.$store.commit('SET_SHOW_CUSTOMER', false);
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
    #sear-salesman .md-input-container .md-icon:not(.md-icon-delete)~.md-input{
        font-family: Kanit !important;
        color: #a8a8a8;
        font-size:13px;
        font-weight: 300;
        margin-left: 0px;
    }
</style>