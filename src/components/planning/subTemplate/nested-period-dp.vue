<template>
<div>
    <div @click="opensDP" class="-pointer">
            <md-card class="-medium -radius4-shadow0-16" style="height: 64px;">
                <md-card-content class="pl-18 pt-10 pb-5 -left -font-18 robotoFont -no-y-scroll">
                    <div class="floating-box width-150" style="min-height:unset">
                        <span class="p-tag -gray5A">{{sp_data_selected}}</span>
                    </div>
                    <md-icon class="p-tag -gray-41 -pointer">expand_more</md-icon>
                    <div class="p-tag -font-12 -gray-A8">Sales Period</div>
                </md-card-content>
            </md-card>
        <!--<md-card class="-medium -radius4-shadow0-16">
            <md-card-content class="pl-18 pt-15 pb-5 -left -font-18 robotoFont">
                <span class="p-tag -gray5A" v-if="type =='view'">{{sp_data_selected}}</span>
                <span class="p-tag -gray5A" v-else>{{sp_data_popup_selected}}</span>
                <md-icon class="p-tag -gray-41 -pointer">expand_more</md-icon>
                <div class="p-tag -font-12 -gray-A8">Sales Period</div>
            </md-card-content>
        </md-card>
        -->
    </div>
    <div class="nested-period-menu">
        <ul class="menu pl-0 mv-0">
            <li class="dropdown">
                <ul class="submenu period-tag" v-click-outside="outsideOpensDP">
                    <li v-for="(rows , index) in sp_arr_year" class="dropdown" style="width: 200px;">
                    <a>{{rows.value}}<i class="md-icon sub-icon material-icons -font-18"  style="margin-left: 120px;">keyboard_arrow_right</i></a>
                        <ul class="submenu">
                            <li v-for="(item , index) in sp_arr_month" class="mt-0" @click="selectMonthDP(rows , item)"><a>{{item.value}}</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
let opsDP = false;
    import {mapGetters,mapActions} from 'vuex'; 
    export default {
        computed: {
            ...mapGetters({ 
                sp_arr_month: 'sp_arr_month',
                sp_arr_year: 'sp_arr_year',
                sp_data_selected: 'sp_data_selected',
                sp_data_popup_selected: 'sp_data_popup_selected',
            }),
        },
        props : {
            type : {}
        },
        methods : {
            opensDP(){
                var b = document.querySelector(".submenu.period-tag"); 
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
            selectMonthDP(rows , item){
                var b = document.querySelector(".nested-period-menu .menu li.dropdown:hover > .submenu"); 
                if(b != null){
                    b.setAttribute("style", "display:none");
                    opsDP = false
                }
                // if(this.type == 'view'){
                    this.$store.commit('SET_SP_DATE_SELECTED', item.value + ' ' + rows.value);
                // }else{
                    // this.$store.commit('SET_SP_POPUPDATE_SELECTED', item.value + ' ' + rows.value);
                // }   
             },
            outsideOpensDP: function (e) {
                if(
                    // e.target.className!='period-tag -font-18 robotoFont' 
                // && 
                e.target.className!='p-tag -gray5A' 
                && e.target.className!='p-tag -font-12 -gray-A8' 
                && e.target.className!='md-icon p-tag -gray-41 -pointer md-theme-default material-icons' 
                && opsDP == true
                ){
                    var b = document.querySelector(".nested-period-menu .menu li.dropdown ul.submenu"); 
                    if(b != null){
                        b.setAttribute("style", "display:none");
                        opsDP = false
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
.period-tag {
    border-radius: 4px !important;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16) !important;
    background-color: #fff;
    text-align: left;
    padding-top:13px;
    padding-left:18px;
}
.nested-period-menu ul {
    list-style-type: none;
}
.nested-period-menu .menu,
.nested-period-menu .menu .submenu {
  display: block;
  z-index: 2;
  position: absolute;
}

.nested-period-menu .menu li {
  position: relative;
}

.nested-period-menu .menu li.dropdown:hover > .submenu {
    display: none;
}

.nested-period-menu .menu li a {
  display: block;
}

.nested-period-menu .menu li a:hover {
    background: #EFEFEF;
    cursor : pointer;
    text-decoration: none;
}

.nested-period-menu .dropdown .period-tag:hover {
     background: #fff;
     padding-bottom:10px;
}
.nested-period-menu .menu .submenu {
  display: none;
}

.nested-period-menu .dropdown,
.nested-period-menu .submenu {
     margin: 0px;
     padding: 0px;
}

.nested-period-menu .submenu {
  position: absolute;
  left: 0px;
  list-style-type: none;
  /*display: block;*/
  width: 220px;
  /*width: 200px;*/
  z-index: 1000!important;
}
.nested-period-menu .submenu li {
  display: block;
} 

.nested-period-menu .submenu li a {
  display: block;
  background: #fff;
}

.nested-period-menu .menu .submenu > li.dropdown:hover > .submenu {
  display: block;
}

.nested-period-menu .menu .submenu .submenu {
  position: absolute;
  left: 220px;
  top: -1px;
}

.nested-period-menu .menu .submenu,
.nested-period-menu .menu .submenu .submenu {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
}

.nested-period-menu .submenu li.dropdown > a:after,
.nested-period-menu .submenu li a,
.nested-period-menu .menu li a::before,
.nested-period-menu .menu li.dropdown > a::after
{
    margin: 0px;
    padding-left: 22px;
    padding-right: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px!important;
    font-family: Roboto;
    color: #414141 !important;
    /*color: #727272 !important;*/
    text-align : left;
    /* font-family: 'Roboto'; */
    font-style: Regular;
    width: 220px;
}
.nested-period-menu .dropdown .period-tag {
    padding-right: 12px;
    padding-bottom: 10px;
}

.ml-90 {
    margin-left : 105px
}
</style>