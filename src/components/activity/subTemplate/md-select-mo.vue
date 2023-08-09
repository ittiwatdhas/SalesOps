<template>
    <div style="width:100% !important">
            <div class="md-input-container mv-0 mh-0 pt-0 pl-20 -ipt-shadow brand" style="min-height: 0px !important;"  @click.stop="showDP()" >
                <div class="md-select md-theme-default">
                    <div class="md-menu"> 
                        <span class="md-select-value brand"  id="select-brand">{{dp_value}}</span>  
                    </div> 
                </div>
            </div>
        <md-card class="-medium dp-brand" style="position:absolute ; z-index:10;" 
             v-if="showInside" v-click-outside="closeEvent">
            <md-card-content id="style-scroll"
            class="-left robotoFont -font-14 -gray-75 -no-x-scroll ph-0 select-brand" 
            style="max-width:250px;min-width:160px;height:230px;width:auto;">
            <!-- style="width:218px;height:230px"> -->
                <div class="ul-month pt-5 pb-5 pl-18 -pointer" style="" @click="selectAll">
                    <label class="font-bold pt-5 -font-14">ALL</label>
                </div>
                <div  class="ul-month">
                    <md-checkbox class="md-warn-mo  ml-35" 
                    style="margin:0px;margin-top:5px;" 
                    v-model="chkHeadIn" @change="checkAllProd($event , 'in')">
                     <label class="font-bold" style="margin:0px;" >DHAS</label></md-checkbox> 
                </div>
                <div class="ul-month" v-for="(row , index) in newf_dropdown_data.brand_internal" :key="'m'+index">
                     <md-checkbox class="md-warn-mo ml-50" style="margin:0px;margin-top:5px;" 
                        :id="row.id" 
                        :name="row.name"
                        v-model="row.checked"
                        @change="checkChildProd(row , $event , index , 'in')">{{row.name}}</md-checkbox>
                </div>
                <div class="ul-month">
                     <md-checkbox class="md-warn-mo  ml-35" 
                        style="margin:0px;margin-top:5px;" 
                        v-model="chkHeadOut"  
                        @change="checkAllProd($event , 'out')">
                         <label class="font-bold" style="margin:0px;" >COMPETTITOR</label>
                     </md-checkbox>
                   
                </div>
                <div class="ul-month" v-for="(row , index) in newf_dropdown_data.brand_external" :key="'m1'+index">
                    <md-checkbox class="md-warn-mo ml-50"   style="margin:0px;margin-top:5px;" 
                        :id="row.id" 
                        :name="row.name"
                        v-model="row.checked"
                        @change="checkChildProd(row , $event , index  , 'out')">{{row.name}}</md-checkbox>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
let opsDP = false;
    import Vue from "vue";
    import {mapGetters,mapActions} from 'vuex'; 
    export default {
        computed: {
            ...mapGetters({ 
                newf_dropdown_data: 'newf_dropdown_data'
            }),
        },
        props : {

        },
        data() {
            return {
                dp_value : 'ALL',
                chkHeadIn : true,
                chkHeadOut : true,
                data_select : [],
                group_id : '',
                showInside: false,
                select_all: true
            }
        },
        mounted(){

            // for (let i = 0; i < this.newf_dropdown_data.brand_internal.length; i++) {
            //     //this.newf_dropdown_data.brand_internal[i].checked = true;
            //     let value = this.newf_dropdown_data.brand_internal[i];
            //     this.data_select.push({'id':value.id,'name':value.name, 'type':'in'});
            // }
            // for (let i = 0; i < this.newf_dropdown_data.brand_external.length; i++) {
            //     //this.newf_dropdown_data.brand_external[i].checked = true;
            //     let value = this.newf_dropdown_data.brand_external[i];
            //     this.data_select.push({'id':value.id,'name':value.name, 'type':'out'});
            // }
        },
        created(){
            
            this.$store.commit("SET_NEWF_THIS_BRAND", this);
            // console.log('data ',this.newf_dropdown_data);
            // console.log('data select',this.data_select);
            
            // for (let i = 0; i < this.newf_dropdown_data.brand_internal.length; i++) {
            //     //this.newf_dropdown_data.brand_internal[i].checked = true;
            //     let value = this.newf_dropdown_data.brand_internal[i];
            //     this.data_select.push({'id':value.id,'name':value.name, 'type':'in'});
            // }
            // for (let i = 0; i < this.newf_dropdown_data.brand_external.length; i++) {
            //     //this.newf_dropdown_data.brand_external[i].checked = true;
            //     let value = this.newf_dropdown_data.brand_external[i];
            //     this.data_select.push({'id':value.id,'name':value.name, 'type':'out'});
            // }
        },


        methods : {
            
            closeEvent: function () {
                
                this.hideDP();

                // console.log('get new newsfeed');

                // console.log(this.data_select);
                var total = this.newf_dropdown_data.brand_internal.length + this.newf_dropdown_data.brand_external.length;
                if(this.data_select.length == total){
                    this.$store.commit("SET_NEWF_BRAND_SELECTED", 0);
                    this.$store.dispatch("filtersNewsfService", {rows : [], type : 'brand'});        
                }else{
                    this.$store.commit("SET_NEWF_BRAND_SELECTED", this.data_select);
                    this.$store.dispatch("filtersNewsfService", {rows : [], type : 'brand'});
                }

                /* this.$store.commit("SET_NEWF_BRAND_SELECTED", this.data_select);
                this.$store.dispatch("filtersNewsfService", {rows : [], type : 'brand'}); */
            },
             showDP: function () {

                  this.$ga.event(this.$ga_key.Activity_Newsfeed_Filter);  

                 if(this.data_select.length == 0){
                     this.chkHeadIn = true;
                    this.chkHeadOut = true;
                     for (let i = 0; i < this.newf_dropdown_data.brand_internal.length; i++) {
                        this.data_select.push(this.newf_dropdown_data.brand_internal[i])
                        this.newf_dropdown_data.brand_internal[i].checked = true;
                    }
                    for (let i = 0; i < this.newf_dropdown_data.brand_external.length; i++) {
                        this.data_select.push(this.newf_dropdown_data.brand_external[i])
                        this.newf_dropdown_data.brand_external[i].checked = true;

                    }
                 }
                //  console.log(this.data_select)
                //  console.log('show');
                //var dp_brand = document.getElementById("dp_brand");
                //dp_brand.setAttribute("style", "");
                this.showInside = true;
            },
            hideDP: function () { 
                // console.log('hide');
                this.showInside = false;
            },
            selectAll(){
                if(this.select_all == true){

                     this.select_all = false;


                    this.chkHeadIn = false;
                    this.chkHeadOut = false;

                    this.data_select = [];
                    for (let i = 0; i < this.newf_dropdown_data.brand_internal.length; i++) {
                        this.newf_dropdown_data.brand_internal[i].checked = false;
                    }
                    for (let i = 0; i < this.newf_dropdown_data.brand_external.length; i++) {
                        this.newf_dropdown_data.brand_external[i].checked = false;

                    }

                   
                }else{
                    this.select_all = true;
                    this.dp_value = 'ALL';

                                        // select all
                    this.chkHeadIn = true;
                    this.chkHeadOut = true;
                    this.data_select = [];
                    for (let i = 0; i < this.newf_dropdown_data.brand_internal.length; i++) {
                        this.newf_dropdown_data.brand_internal[i].checked = true;
                        let value = this.newf_dropdown_data.brand_internal[i];
                        this.data_select.push({'id':value.id,'name':value.name, 'type':'in'});
                    }
                    for (let i = 0; i < this.newf_dropdown_data.brand_external.length; i++) {
                        this.newf_dropdown_data.brand_external[i].checked = true;
                        let value = this.newf_dropdown_data.brand_external[i];
                        this.data_select.push({'id':value.id,'name':value.name, 'type':'out'});
                    }
                    
                }

                // this.$store.commit("SET_NEWF_BRAND_SELECTED", []);
                // this.$store.dispatch("filtersNewsfService", {rows : [], type : 'brand'});
            },

            removeFunction (myObjects,prop,valu)
            {
                return myObjects.filter(function (val) {
                    return val[prop] !== valu;
                });
            },

            displayDP()
            {
                var total = this.newf_dropdown_data.brand_internal.length + this.newf_dropdown_data.brand_external.length;
                this.dp_value = '';
                this.group_id = '';
                // console.log(total);
                // console.log(this.data_select.length);
                // console.log(this.data_select);

                if(this.data_select.length == total)
                {
                    this.dp_value = 'ALL';
                }else if(this.data_select.length > 0){
                    for (let i = 0; i < this.data_select.length; i++) {
                        this.dp_value += this.data_select[i].name + ', ';
                        this.group_id += this.data_select[i].id + ',';
                    }
                    this.dp_value = this.dp_value.slice(0,-2);
                    this.group_id = this.group_id.slice(0,-1);

                    //console.log(this.group_id);
                
                }else{
                    this.dp_value = 'ALL';
                }
                // this.$store.commit("SET_NEWF_BRAND_SELECTED", this.data_select);
                // this.$store.dispatch("filtersNewsfService", {rows : [], type : 'brand'});
            },

            checkAllProd:function(e , mode){
                
                this.dp_value = '';
                let rs = this.newf_dropdown_data.brand;
                if(mode == 'in')
                {
                    if(e == true){
                        console.log('add all product internal');
                        for (let i = 0; i < rs.internal.length; i++) {
                            this.newf_dropdown_data.brand_internal[i].checked = true;
                            let value = this.newf_dropdown_data.brand_internal[i];
                            this.data_select.push({'id':value.id,'name':value.name, 'type':mode});
                        }
                    }else{
                        console.log('remove all product internal');
                        for (let i = 0; i < rs.internal.length; i++) {
                            this.newf_dropdown_data.brand_internal[i].checked = false;
                            let value = this.newf_dropdown_data.brand_internal[i];
                            //value.checkec = false;

                            this.data_select = this.removeFunction(this.data_select, "id", value.id);
                            
                        }
                    }
                }

                if(mode == 'out')
                {
                    if(e == true){
                        console.log('add all product external');
                        for (let i = 0; i < rs.external.length; i++) {
                            this.newf_dropdown_data.brand_external[i].checked = true;
                            let value = this.newf_dropdown_data.brand_external[i];
                            console.log(value);
                            this.data_select.push({'id':value.id,'name':value.name, 'type':mode});
                        }
                    }else{
                        console.log('remove all product external');
                        for (let i = 0; i < rs.external.length; i++) {
                            this.newf_dropdown_data.brand_external[i].checked = false;
                            let value = this.newf_dropdown_data.brand_external[i];
                            console.log(value);
                            this.data_select = this.removeFunction(this.data_select, "id", value.id);
                        }
                    }
                }

                this.displayDP();
                //console.log(this.data_select);


                // if(mode == 'in'){
                //     for (let i = 0; i < rs.internal.length; i++) {
                //         this.newf_dropdown_data.brand_internal[i].checked = true
                //     }
                // }else if(mode == 'out') {
                //     for (let i = 0; i < rs.external.length; i++) {
                //         this.newf_dropdown_data.brand_external[i].checked = true
                //     }
                // }
                // for (let i = 0; i < rs.internal.length; i++) {
                //      if(rs.internal[i].checked){
                //         this.dp_value += rs.internal[i].name + ', '
                //     }
                // }
                // for (let i = 0; i < rs.external.length; i++) {
                //       if(rs.external[i].checked){
                //         this.dp_value += rs.external[i].name + ', '
                //     }
                // }
            //     if(this.dp_value != ''){
            //         this.$store.dispatch("filtersNewsfService", {rows : [], type : 'brand'});
            //    }else{
            //        this.selectAll()
            //    }*/
            },
            checkChildProd(value , e , indexs ,mode){

                //console.log(e);
                if(e == true)
                {
                    // console.log('add array');
                    this.data_select.push({'id':value.id,'name':value.name, 'type':mode});
                }else{
                    // console.log('remove array');
                    this.data_select = this.removeFunction(this.data_select, "id", value.id);

                }

                if(mode =='in'){
                    if(this.newf_dropdown_data.brand_internal.length == this.data_select.filter(function(x){return x.type=='in'}).length)
                    {
                        this.chkHeadIn = true;
                    }else{
                        this.chkHeadIn = false;
                    }
                }

                if(mode == 'out'){
                    if(this.newf_dropdown_data.brand_external.length == this.data_select.filter(function(x){return x.type=='out'}).length)
                    {
                        this.chkHeadOut = true;
                    }else{
                        this.chkHeadOut = false;
                    }
                }


                this.displayDP();


                /*
                 let rs = this.newf_dropdown_data.brand
                 if(mode == 'in'){
                    rs.internal[indexs].checked = e
                 }else{
                    rs.external[indexs].checked = e
                 }
                if(e){
                    if(this.dp_value == 'ALL'){
                        this.dp_value = value.name + ' ,' 
                    }else if(this.dp_value == ''){
                        this.dp_value = value.name
                    }else{
                        let last_str = this.dp_value.substring(this.dp_value.length, this.dp_value.length-1);
                        if(last_str == ','){
                            this.dp_value = this.dp_value +  value.name
                        }else{
                            this.dp_value = this.dp_value + ' ,' + value.name
                        }
                    }
                }else{
                    this.dp_value = '';
                    for (let i = 0; i < rs.internal.length; i++) {
                        if(rs.internal[i].checked){
                            this.dp_value += rs.internal[i].name + ', '
                        }
                    }
                    for (let i = 0; i < rs.external.length; i++) {
                        if(rs.external[i].checked){
                            this.dp_value += rs.external[i].name + ', '
                        }
                    }
                }
                if(this.chkHeadIn == true && mode == 'in'){
                    this.chkHeadIn = false;
                }
                if(this.chkHeadOut == true && mode == 'out'){
                    this.chkHeadOut = false; 
                }
                if(this.dp_value != ''){
                    this.$store.dispatch("filtersNewsfService", {rows : [], type : 'brand'});
                }else{
                   this.selectAll()
                }*/
            },
            showMonthDP(){
                this.showDP = true;
                // var dp_brand = document.getElementById("dp_brand");
                // dp_brand.setAttribute("style", "position:absolute ; z-index:10;display:block;");
                // dp_brand.classList.remove("hide-tag");          
                //console.log('show brane');
                // let d_this = this
                // if(dp_brand.classList.length > 3){
                //     dp_brand.classList.remove("hide-tag");
                // }else{
                //     dp_brand.classList.add("hide-tag");
                // }
                // document.getElementById("pageNewsfeed").addEventListener("click",  function(e){
                //     console.log(e.target.className);
                //     if( 
                //         e.target.className == "ul-month pt-5 pb-5 pl-18 -pointer" ||
                //         e.target.className == "md-select-value brand" ||
                //         e.target.className == "md-input-container mv-0 mh-0 pt-0 pl-20 -ipt-shadow brand"
                //     ){
                //         //detail
                //     }else{
                //         dp_brand.classList.add("hide-tag");

                //         console.log(d_this.data_select);
                //     }
                // });
            }
        },
        directives: {
		'click-outside': {
			bind: function(el, binding, vNode) {
                // Provided expression must evaluate to a function.
                if (typeof binding.value !== 'function') {
                    const compName = vNode.context.name
                let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
                if (compName) { warn += `Found in component '${compName}'` }
                
                console.warn(warn)
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

.select-brand .ul-month:hover {
  background: #A8A8A8;
}

.select-brand.ul-month:hover,
.select-brand.ul-month {
  font-size: 14px !important;
  cursor: pointer;
  /* height:49px; */
}
.dp-brand {
    position: absolute;
    z-index: 10;
    top: 200px;
    max-width:250px;
    min-width:160px;
    width:auto;
    height:230px;
    max-height : 450px;
    border-radius: 2px !important;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12) !important;
}
/*
.md-theme-default.md-checkbox.md-checked .md-checkbox-container {
    background-color: #A8A8A8;
    border-color: #A8A8A8;
}
*/
</style>
