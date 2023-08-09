<template>
<div class="nested-menu">
    <ul class="menu pl-0 mv-0">
        <li class="dropdown">
                <a class="first-tag" style="width:220px !important" @click="opensDP">
                    <b><span class="latoFont -font-14 -gray-72 total">{{totalLabel}}</span></b>
                    <i class="md-icon -font-13 material-icons firsts-icon">ic_arrow_drop_down</i>
                </a>
            <ul class="submenu" v-click-outside="outsideOpensDP">
                <li class="dropdown">
                    <a>Totals - by Qtr <i class="md-icon sub-icon material-icons">keyboard_arrow_right</i></a>
                    <ul class="submenu">
                        <li v-for="(rows , index) in arrYear" class="dropdown">
                        <a>{{rows.value}}<i class="md-icon sub-icon material-icons" >keyboard_arrow_right</i></a>
                            <ul class="submenu">
                                <li v-for="(item , index) in arrQtr" class="mt-0" @click="selectDP(1 ,rows , item)"><a>{{item.value}}</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a>Month / Year<i class="md-icon material-icons sub-icon" >keyboard_arrow_right</i></a>
                        <ul class="submenu">
                        <li v-for="(rows , index) in arrYear" class="dropdown">
                            <a @click="selectDP(2,rows , null)">{{rows.value}}<i class="md-icon material-icons  sub-icon" >keyboard_arrow_right</i></a>
                                <ul class="submenu">
                                    <li v-for="(item , index) in arrMonth" class="mt-0" @click="selectDP(3 , rows , item)"><a>{{item.value}}</a></li>
                                </ul>
                            </li>
                        </ul>
                </li>
                <li class="dropdown">
                    <a>Stats Analysis<i class="md-icon sub-icon material-icons" >keyboard_arrow_right</i></a>
                    <ul class="submenu">
                    <li class="dropdown">
                    <a>Avg - By Qtr<i class="md-icon sub-icon material-icons" >keyboard_arrow_right</i></a>
                        <ul class="submenu">
                            <li v-for="(rows , index) in arrYear" class="dropdown">
                                <a>{{rows.value}}<i class="md-icon sub-icon material-icons" >keyboard_arrow_right</i></a>
                                    <ul class="submenu">
                                        <li v-for="(item , index) in arrQtr" class="mt-0" @click="selectDP(4,rows , item)"><a>{{item.value}}</a></li>
                                    </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown">
                    <a>Avg - By Year<i class="md-icon sub-icon material-icons" >keyboard_arrow_right</i></a>
                        <ul class="submenu">
                            <li v-for="(rows , index) in arrYear" class="dropdown" @click="selectDP(5,rows , null)">
                                <a>{{rows.value}}</a>
                            </li>
                        </ul>
                    </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script>
let opsDP = false;
    import {mapGetters,mapActions} from 'vuex'; 
    export default {
        computed: {
            ...mapGetters({ arrYear: 'getArrYear', 
                            arrQtr: 'getArrQuater', 
                            arrMonth: 'getArrMonth',
                            totalLabel: 'getTotalLabel',
                            head_detail: 'getHeadDetail',
                            items_detail: 'getItemsDetail',
            }),
        },
        methods : {
            ...mapActions([
                'selectedTotal',
            ]),
            opensDP(){
                var b = document.querySelector(".nested-menu .menu li.dropdown:hover > .submenu"); 
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
            selectDP(selectedRow , rows , item){
                this.$store.dispatch('selectedTotal',{rows,item,selectedRow});
                //this.$emit('selectdp', txt , rows , item);
                var b = document.querySelector(".nested-menu .menu li.dropdown:hover > .submenu"); 
                if(b != null){
                    b.setAttribute("style", "display:none");
                    opsDP = false
                }
                const values = {
                    total_page:this.$store.getters.getTotalPage,
                    product_keyword:this.$store.getters.product_keyword,
                    organizes:this.$store.getters.organizes_data,
                    organize_type:this.$store.getters.options_organize_selected,
                    product_type:this.$store.getters.options_product_selected,
                    products_uncheck:this.$store.getters.products_uncheck,
                    product_selected:this.$store.getters.product_selected,
                    product_checkall:this.$store.getters.product_checkall,
                    viewby:this.$store.getters.getViewById,
                    totaltype:this.$store.getters.getTotalType,
                    totalfirst:this.$store.getters.getTotalFirst,
                    totalsecond:this.$store.getters.getTotalSecond,
                    monthfirst:this.$store.getters.getMonthFirst,
                    monthsecond:this.$store.getters.getMonthSecond,
                };
                const items = this.$store.getters.getSumItems;
                this.$store.dispatch('getSumTotal',{values,items});

                for(var index=0;index<this.head_detail.length;index++){
                    const id = this.head_detail[index].id;
                    const response = this.items_detail[index];
                    values.keyWhere = id;
                    this.$store.dispatch('getDetailTotal',{values,response,index});
                }
            },
            outsideOpensDP: function (e) {
                if(e.target.className!='first-tag' 
                && e.target.className!='latoFont -font-14 -gray-72 total' 
                && e.target.className!='md-icon -font-13 material-icons firsts-icon' 
                && opsDP == true
                ){
                    var b = document.querySelector(".nested-menu .menu li.dropdown ul.submenu"); 
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

.nested-menu .menu,
.nested-menu .menu .submenu {
  display: block;
  /* z-index: 20 !important; */
  position: absolute;
}

.nested-menu .menu li {
  position: relative;tion: absolute;
}

.nested-menu .menu li.dropdown:hover > .submenu {
    display: none;
}

.nested-menu .menu li a {
  display: block;
}

.nested-menu .menu li a:hover {
    background: #EFEFEF;
    cursor : pointer;
    text-decoration: none;
}

.nested-menu .dropdown .first-tag:hover {
     background: #fff;
     padding-bottom:10px;
}
.nested-menu .menu .submenu {
  display: none;
}

.nested-menu .dropdown,
.nested-menu .submenu {
     margin: 0px;
     padding: 0px;
}

.nested-menu .submenu {
  position: absolute;
  left: 0px;
  list-style-type: none;
  width: 200px;
  z-index: 20 !important;
}
.nested-menu .submenu li {
  display: block;
}

.nested-menu .submenu li a {
  display: block;
  background: #fff;
}

.nested-menu .menu .submenu > li.dropdown:hover > .submenu {
  display: block;
} 

.nested-menu .menu .submenu .submenu {
  position: absolute;
  left: 198px;
  top: -1px;
}

.nested-menu .menu .submenu,
.nested-menu .menu .submenu .submenu {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
}

.nested-menu .submenu li.dropdown > a:after,
.nested-menu .submenu li a,
.nested-menu .menu li a::before,
.nested-menu .menu li.dropdown > a::after
{
    margin: 0px;
    padding-left: 22px;
    padding-right: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px!important;
    font-family: Lato;
    color: #727272 !important;
    text-align : left;
    font-style: Regular;
}
.nested-menu .dropdown .first-tag {
    padding-right: 12px;
    padding-bottom: 10px;
}

</style>