<template>
        <div class="container scrollbar pt-5" id="style-scrollbar">
            <md-card v-for="row in value" :class="getPromoRowColor(row)" :key="row.id" style="width: 180px">
                <md-card-content class="-no-x-scroll -no-y-scroll robotoFont" style="height: 80px !important;" >
                    <div class="-font-10 font-bold" 
                    :style="{'color': row.selected ? '#FFFFFF' : '#5A5A5A'}">{{row.type}}</div>
                    <div class="-font-12 line-h"
                    :style="{'color': row.selected ? '#FFFFFF' : '#727272'}" >{{row.promo_name}}</div>
                </md-card-content>
            </md-card>
        </div>
</template>

<script>
let opsDP = false;
    import {mapGetters,mapActions} from 'vuex'; 
    export default {
        computed: {
            ...mapGetters({ 
                 sp_arr_promotion: 'sp_arr_promotion',
            }),
        },
        props : {
            value :  {}
        },
        methods : {
            getPromoRowColor(data){
                if(data.selected){
                    return "promo -noshadow bg-oranges -round-border mb-10"
                }else{
                    return "promo -noshadow -bg-gray-EF -round-border mb-10"
                }
            },
        }
    }
</script>
