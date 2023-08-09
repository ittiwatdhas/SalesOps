<template>
<md-input-container class="md-input-invalid input-per -width-adjust" >
      <md-input type="text" 
      v-model="displayValue" 
      :disabled="status_input" 
      @blur="calculateOther" 
      @keypress.native="isNumber" 
      @focus="isInputActive = true" 
      class="text-left"  
      maxlength="13"
      @focus.native="$event.target.select()" ></md-input><!-- v-model="row.adjusted" -->
</md-input-container>      <!--  v-on:change="calculate" -->
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'; 
    export default {
        created : function() {
            this.tmpData = this.value;
        },
        computed: {
            ...mapGetters({ 
                    rowAdjust: 'getRowAdjust',
                    headDetail: 'getHeadDetail',
                    itemDetail: 'getAdjustMonthDetailAll',
                    rowAdjustTotalDetail: 'getRowTotalDetailAll'
            }),
            displayValue: {
                get: function() {
                    if (this.isInputActive) {
                        var test = this.value.toString().indexOf(".");
                        if(test==-1){
                            return this.value.toString();
                        }else
                            // return parseFloat(this.value).toFixed(2).toString();
                            return this.formatNumber(this.value,2);
                    } else {

                        return this.formatNumber(this.value,2);
                        // return parseFloat(this.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
                    }
                },
                set: function(modifiedValue) {
                    this.modifiedValue = modifiedValue
                //     let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""));
                //     if (isNaN(newValue)) {
                //         newValue = 0;
                //     }
                //     this.$emit('input', newValue);
                }
            },
            adjustdetail(){
                return this.$store.getters.getAdjustMonthDetail(this.table);
            },
            status_input(){
                return this.$store.getters.status_input;
            }
        },
        props : {
            value : {},
            type:{},
            index:{},
            indexDetail:{},
            table: {},
            code: {}
        },
        methods : {
            formatNumber(value, dicimal,type = null) {
                if (isNaN(parseFloat(value))) {
                    return value;
                } else {
                    if (value % 1 == 0) {
                        if(type == null){
                            return parseFloat(value).toLocaleString(undefined, {
                                minimumFractionDigits: dicimal,
                                maximumFractionDigits: dicimal
                            });
                        }else{
                           return parseFloat(value);
                        }
                        
                    } else {

                        let parts = value.toString().split(".");
                        let num = 0;
                        if(type == null){
                            num = (parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        }else{
                            num = parts[0];
                        }
                        let digit = parts[1].slice(0, dicimal);
                            digit = (digit.length < 2) ? digit + "0" : digit;
                        let rs = num + "." + digit;
                        // let comma = parseFloat(rs.replace(',', ''));
                        // return Math.round(parseFloat(comma) * 100) / 100;
                        return rs;
                    }
                }
            },
            isNumber(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();;
                } else {
                    return true;
                }
            },
            calculateOther(){
                this.modifiedValue
                                    let newValue = parseFloat(this.modifiedValue.replace(/[^\d\.]/g, ""));
                    if (isNaN(newValue)) {
                        newValue = 0;
                    }
                    this.$emit('input', newValue);
                // console.log("table : ",this.table);
                // console.log("type : ",this.type);
                // console.log("index : ",this.index);
                // console.log("code : ",this.code);
                // console.log("value : ",this.value);
                // console.log("indexDetail : ",this.indexDetail); 

                this.isInputActive = false;
                // console.log(": )");
                setTimeout(() => {
                    if(this.type == 'detail' && this.table==-1){ 
                        this.setAdjustMainAndRatioMainAndTotalMainAuto(); 
                        this.setAdjustDetailAndRatioDetailAndTotalDetailAuto(this.value,this.code);
                    }else if(this.type == 'total' && this.table==-1){ 
                     //calculate in this table
                        let adjust = 0;
                        let growth = 0;
                        let growth_total = 0;
                        var adjust_auto = 0;
                        let ratio_line = 0;
                        let total_adjust = 0;
                        let adjust_arr = [];
                            adjust_arr['index_min'] = -1;
                            adjust_arr['index_max'] = -1;
                            adjust_arr['adjust_max'] = "";
                            adjust_arr['adjust_min'] = "";
                            adjust_arr['code_min'] = "";
                            adjust_arr['code_max'] = "";
                    
                        for(var i=0;i<this.rowAdjust.length;i++){
                            adjust = 0;
                            growth = 0;
                            adjust_auto = 0;
                            ratio_line = 0;
                            if(this.index == 0){
                                adjust_auto = this.rowAdjust[i].adjust;
                                if(this.rowAdjust[i].ratio!=0){
                                    // ratio_line = this.formatNumber(this.rowAdjust[i].ratio,4);
                                    // ratio_line = parseFloat(this.rowAdjust[i].ratio).toFixed(4);
                                    ratio_line = this.rowAdjust[i].ratio*1;
                                    adjust = ((this.value*1)*(ratio_line*1)/100);
                                    total_adjust = total_adjust + adjust;
                                    // console.log(" ----- index card : ", i, " adjust : ",adjust);
                                    if(adjust_arr['adjust_min'] ==="" && adjust !=0 ){
                                        adjust_arr['index_min'] = i;
                                        adjust_arr['adjust_min'] = adjust;
                                        adjust_arr['code_min'] = this.rowAdjust[i].code;
                                    }
                                    if(adjust != 0 && adjust_arr['adjust_min']  > adjust){
                                        adjust_arr['index_min'] = i;
                                        adjust_arr['adjust_min'] = adjust;
                                        adjust_arr['code_min'] = this.rowAdjust[i].code;
                                    }
                                    if(adjust_arr['adjust_max'] ==="" && adjust !=0 ){
                                        adjust_arr['index_max'] = i;
                                        adjust_arr['adjust_max'] = adjust;
                                        adjust_arr['code_max'] = this.rowAdjust[i].code;
                                    }
                                    if(adjust_arr['adjust_max']  < adjust && adjust != 0){
                                        adjust_arr['index_max'] = i;
                                        adjust_arr['adjust_max'] = adjust;
                                        adjust_arr['code_max'] = this.rowAdjust[i].code;
                                    }
                                    // adjust_str = adjust_str +"+"+adjust;
                                    // ratio_str = ratio_str +"+"+ratio_line;
                                    // adjust_auto_str = adjust_auto_str +"+"+adjust_auto;
                                    // adjust = ((this.value*1)*(this.rowAdjust[i].ratio*1)/100);
                                    if(isNaN(this.rowAdjust[i].lasttarget)){
                                        this.rowAdjust[i].lasttarget = 0;
                                    }
                                    if(this.rowAdjust[i].lasttarget == 0 && adjust !=0)
                                        growth = 100;
                                    else if(this.rowAdjust[i].lasttarget == 0 && adjust ==0)
                                        growth = 0;
                                    else
                                        growth = ((((adjust*1)-(this.rowAdjust[i].lasttarget*1))/this.rowAdjust[i].lasttarget*1)*100);
                                    growth_total += (this.rowAdjust[i].lasttarget*1);
                                }
                            }else if(this.index == 1){
                                adjust_auto = this.rowAdjust[i].adjust1;
                                if(this.rowAdjust[i].ratio1!=0){
                                    // ratio_line = parseFloat(this.rowAdjust[i].ratio1).toFixed(2);
                                    ratio_line = this.rowAdjust[i].ratio1*1;
                                    adjust = ((this.value*1)*(ratio_line*1)/100);
                                    total_adjust = total_adjust + adjust;
                                    // console.log(" ----- index card : ", i, " adjust : ",adjust);
                                    if(adjust_arr['adjust_min'] ==="" && adjust !=0 ){
                                        adjust_arr['index_min'] = i;
                                        adjust_arr['adjust_min'] = adjust;
                                        adjust_arr['code_min'] = this.rowAdjust[i].code;
                                    }
                                    if(adjust != 0 && adjust_arr['adjust_min']  > adjust){
                                        adjust_arr['index_min'] = i;
                                        adjust_arr['adjust_min'] = adjust;
                                        adjust_arr['code_min'] = this.rowAdjust[i].code;
                                    }
                                    if(adjust_arr['adjust_max'] ==="" && adjust !=0 ){
                                        adjust_arr['index_max'] = i;
                                        adjust_arr['adjust_max'] = adjust;
                                        adjust_arr['code_max'] = this.rowAdjust[i].code;
                                    }
                                    if(adjust_arr['adjust_max']  < adjust && adjust != 0){
                                        adjust_arr['index_max'] = i;
                                        adjust_arr['adjust_max'] = adjust;
                                        adjust_arr['code_max'] = this.rowAdjust[i].code;
                                    }
                                    // adjust = ((this.value*1)*(this.rowAdjust[i].ratio1*1)/100);
                                    if(isNaN(this.rowAdjust[i].lasttarget1)){
                                        this.rowAdjust[i].lasttarget1 = 0;
                                    }
                                    if(this.rowAdjust[i].lasttarget1 == 0 && adjust !=0)
                                        growth = 100;
                                    else if(this.rowAdjust[i].lasttarget1 == 0 && adjust ==0)
                                        growth = 0;
                                    else
                                        growth = ((((adjust*1)-(this.rowAdjust[i].lasttarget1*1))/this.rowAdjust[i].lasttarget1*1)*100);
                                    growth_total += (this.rowAdjust[i].lasttarget1*1);
                                }
                            }else if(this.index == 2){
                                adjust_auto = this.rowAdjust[i].adjust2;
                                if(this.rowAdjust[i].ratio2!=0){
                                    ratio_line = this.rowAdjust[i].ratio2*1;
                                    // ratio_line = parseFloat(this.rowAdjust[i].ratio2).toFixed(2);
                                    adjust = ((this.value*1)*(ratio_line*1)/100);
                                    total_adjust = total_adjust + adjust;
                                    // console.log(" ----- index card : ", i, " adjust : ",adjust);
                                    if(adjust_arr['adjust_min'] ==="" && adjust !=0 ){
                                        adjust_arr['index_min'] = i;
                                        adjust_arr['adjust_min'] = adjust;
                                        adjust_arr['code_min'] = this.rowAdjust[i].code;
                                    }
                                    if(adjust != 0 && adjust_arr['adjust_min']  > adjust){
                                        adjust_arr['index_min'] = i;
                                        adjust_arr['adjust_min'] = adjust;
                                        adjust_arr['code_min'] = this.rowAdjust[i].code;
                                    }
                                    if(adjust_arr['adjust_max'] ==="" && adjust !=0 ){
                                        adjust_arr['index_max'] = i;
                                        adjust_arr['adjust_max'] = adjust;
                                        adjust_arr['code_max'] = this.rowAdjust[i].code;
                                    }
                                    if(adjust_arr['adjust_max']  < adjust && adjust != 0){
                                        adjust_arr['index_max'] = i;
                                        adjust_arr['adjust_max'] = adjust;
                                        adjust_arr['code_max'] = this.rowAdjust[i].code;
                                    }
                                    // adjust = ((this.value*1)*(this.rowAdjust[i].ratio2*1)/100);
                                    if(isNaN(this.rowAdjust[i].lasttarget2)){
                                        this.rowAdjust[i].lasttarget2 = 0;
                                    }
                                    if(this.rowAdjust[i].lasttarget2 == 0 && adjust !=0)
                                        growth = 100;
                                    else if(this.rowAdjust[i].lasttarget2 == 0 && adjust ==0)
                                        growth = 0;
                                    else
                                        growth = ((((adjust*1)-(this.rowAdjust[i].lasttarget2*1))/this.rowAdjust[i].lasttarget2*1)*100);
                                    growth_total += (this.rowAdjust[i].lasttarget2*1);
                                }
                            }
                            if(isNaN(growth)){
                                growth = 0;
                            }
                            this.$store.dispatch('setAdjust',{adjust,index:this.index,indexDetail:i});
                            this.$store.dispatch('setGrowth',{growth,index:this.index,indexDetail:i});

                            this.setAdjustDetailTotalDetailAutoByCollected(adjust,this.rowAdjust[i].code);
                        }
                        // console.log("-- total_adjust : ",total_adjust);
                        //                     console.log("min : index",this.index_card_max, "adj : ",this.adjust_min );
                        // console.log("max : index",this.index_card_min, "adj : ",this.adjust_max );
                        // console.log("adjust_arr : ",adjust_arr);
                        this.setAdjustTotalDiff(total_adjust,this.value,adjust_arr)
                        let setgrowth_total = 0;
                        if(growth_total == 0 && this.value!=0){
                            setgrowth_total = 100;
                        }else if(growth_total == 0 && this.value ==0){
                            setgrowth_total = 0;
                        }else{
                            setgrowth_total = ((((this.value*1)-(growth_total*1))/growth_total*1)*100);
                        }
                        
                        //this.$store.dispatch('setRowTotalGrowth',{total:ratio,index:this.index});
                        this.$store.dispatch('setRowTotalGrowth',{total:setgrowth_total,index:this.index});
                        for(var sub_i =0;sub_i <this.itemDetail.length;sub_i++){
                            this.calculateAdjustSubTable(this.index,sub_i);
                        }
                        this.$store.dispatch('calculateSummary');
                        // console.log("adjust_str:" ,adjust_str);
                        // console.log("ratio_str:" ,ratio_str);
                        // console.log("adjust_auto_str:" ,adjust_auto_str);

                    }else if(this.type =='detail' && this.table!=-1){
                        this.calculateAdjustSubTable(this.index,this.table);//
                        let total = 0;
                        let indexTotal = -1;
                        let status_check = false;
                        for(var i=0;i<this.itemDetail.length;i++){
                            indexTotal = this.itemDetail[i].findIndex(item => item.code === this.code);

                            if(this.itemDetail[i][indexTotal] != undefined){
                                if(this.index == 0){
                                    total += (this.itemDetail[i][indexTotal].adjust*1);
                                }else if(this.index == 1){
                                    total += (this.itemDetail[i][indexTotal].adjust1*1);
                                }else if(this.index == 2){
                                    total += (this.itemDetail[i][indexTotal].adjust2*1);
                                }
                            }
                        }
                        // console.log("total detail", total);
                        this.$store.dispatch('setAdjustByCode',{adjust:total,index:this.index,code:this.code});
                        // this.$store.dispatch('setAdjustByCheck',{adjust:total,index:this.index,code:this.code});
                        // this.$store.dispatch('setAdjust',{adjust:total,index:this.index,indexDetail:this.indexDetail});
                        this.setAdjustMainAndRatioMainAndTotalMainAuto();
                    }else if(this.type == 'total' && this.table!=-1){
                        const rowTotal = this.rowAdjustTotalDetail[this.table];
                        let totalRatio = 0;
                        if(this.index == 0){
                            totalRatio = rowTotal.total_ratio;   
                        }else if(this.index == 1){
                            totalRatio = rowTotal.total_ratio1;
                        }else if(this.index == 2){
                            totalRatio = rowTotal.total_ratio2;
                        }

                        if(totalRatio!=0){
                            let adjust = 0;
                            let total_adjustChange = 0;
                            let adjust_min = "";
                            let adjust_max = "";
                            let index_min = -1;
                            let index_max = -1;
                            let code_min = "";
                            let code_max = "";
                            
                            for(var i=0;i<this.adjustdetail.length;i++){
                                adjust = 0;
                                if(this.index == 0){
                                    if(this.adjustdetail[i].ratio!=0){
                                        adjust = ((this.value*1)*(this.adjustdetail[i].ratio*1)/100);
                                        if(adjust_min === "" && adjust !=0 ){
                                            index_min = i;
                                            code_min = this.adjustdetail[i].code;
                                            adjust_min = adjust;
                                        } 
                                        if(adjust_min  > adjust && adjust != 0){
                                            adjust_min = adjust;
                                            index_min = i;
                                            code_min = this.adjustdetail[i].code;
                                        }
                                        if(adjust_max === "" && adjust !=0 ){
                                            index_max = i;
                                            code_min = this.adjustdetail[i].code;
                                            adjust_max = adjust;
                                        }
                                        if(adjust_max  < adjust && adjust != 0){
                                            adjust_max = adjust;
                                            index_max = i;
                                            code_max = this.adjustdetail[i].code;
                                        }
                                        total_adjustChange = total_adjustChange + (adjust*1);
                                    }
                                }else if(this.index == 1){
                                    if(this.adjustdetail[i].ratio1!=0){
                                        adjust = ((this.value*1)*(this.adjustdetail[i].ratio1*1)/100);
                                        if(adjust_min === "" && adjust !=0 ){
                                            index_min = i;
                                            code_min = this.adjustdetail[i].code;
                                            adjust_min = adjust;
                                        }
                                        if(adjust_min  > adjust && adjust != 0){
                                            adjust_min = adjust;
                                            index_min = i;
                                            code_min = this.adjustdetail[i].code;
                                        }
                                        if(adjust_max === "" && adjust !=0 ){
                                            index_max = i;
                                            code_min = this.adjustdetail[i].code;
                                            adjust_max = adjust;
                                        }
                                        if(adjust_max  < adjust && adjust != 0){
                                            adjust_max = adjust;
                                            index_max = i;
                                            code_max = this.adjustdetail[i].code;
                                        }
                                        total_adjustChange = total_adjustChange + (adjust*1);
                                    
                                    }
                                }else if(this.index == 2){
                                    if(this.adjustdetail[i].ratio2!=0){
                                        adjust = ((this.value*1)*(this.adjustdetail[i].ratio2*1)/100);

                                        if(adjust_min === "" && adjust !=0 ){
                                            index_min = i;
                                            code_min = this.adjustdetail[i].code;
                                            adjust_min = adjust;
                                        }
                                        if(adjust_min  > adjust && adjust != 0){
                                            adjust_min = adjust;
                                            index_min = i;
                                            code_min = this.adjustdetail[i].code;
                                        }
                                        if(adjust_max === "" && adjust !=0 ){
                                            index_max = i;
                                            code_min = this.adjustdetail[i].code;
                                            adjust_max = adjust;
                                        }
                                        if(adjust_max  < adjust && adjust != 0){
                                            adjust_max = adjust;
                                            index_max = i;
                                            code_max = this.adjustdetail[i].code;
                                        }
                                        total_adjustChange = total_adjustChange + (adjust*1);
                                    
                                    }
                                }
                                this.$store.dispatch('setAdjustDetail',{adjust,index:this.index,indexDetail:i,table:this.table,code:this.adjustdetail[i].code});
                            // console.log("min : index",index_min, "adj : ",adjust_min, "code :", code_min);
                            // console.log("max : index",index_max, "adj : ",adjust_max, "code :", code_max);
                            // console.log("total_adjustChange : ",total_adjustChange);
                            }
                            // let diff_val = parseFloat(value_input) - parseFloat(_total_adjust);
                            let diff_val = parseFloat(this.value) - parseFloat(this.formatNumber(total_adjustChange,4,'int'));
                            // let diff_val = parseFloat(this.value) - parseFloat(total_adjustChange);
                            let card_index = "";
                            let code_index = "";
                            adjust = 0;

                            // console.log("total_adjustChange --->: ", this.formatNumber(total_adjustChange,4,'int')*1);
                            // console.log("this.value : ",parseFloat(this.value));
                            // console.log("diff_val : ",diff_val);

                            if(isNaN(diff_val)) diff_val = 0;
                            if(diff_val != 0){
                                diff_val = parseFloat(this.value) - parseFloat(total_adjustChange);
                                if(diff_val > 0){
                                    card_index = index_min;
                                    code_index = code_min;
                                }else{
                                    card_index = index_max;
                                    code_index = code_max;
                                }
                                if(this.index == 0){
                                    adjust = parseFloat(this.adjustdetail[card_index].adjust) + diff_val;
                                }else if(this.index == 1){
                                    adjust = parseFloat(this.adjustdetail[card_index].adjust1) + diff_val;
                                }else if(this.index == 2){
                                    adjust = parseFloat(this.adjustdetail[card_index].adjust2) + diff_val;
                                }
                                // console.log("adjust: ",adjust);
                                this.$store.dispatch('setAdjustDetail',{adjust,index:this.index,indexDetail:card_index,table:this.table,code:code_index});
                            } 
                        }else{
                            // console.log("total = 0");
                            this.$store.dispatch('setRowTotalAdjustDetail',{total:0,index:this.table,key:this.index});
                        }
                        let total = 0;
                        let indexTotal =-1;
                        let ratioDetailAll = 0;
                        for(var a=0;a<this.adjustdetail.length;a++){
                            ratioDetailAll = 0;
                            total = 0;
                            for(var i=0;i<this.itemDetail.length;i++){
                                indexTotal = this.itemDetail[i].findIndex(item => item.code === this.adjustdetail[a].code);
                                // console.log("indexDetail --> ",indexTotal , " code : ",this.adjustdetail[a].code);
                        // console.log("ratio --> ",this.itemDetail[i][indexTotal]);
                                if(this.itemDetail[i][indexTotal] == undefined) continue;
                                if(this.index == 0){
                                    ratioDetailAll = ratioDetailAll+this.itemDetail[i][indexTotal].ratio;
                                    total += (this.itemDetail[i][indexTotal].adjust*1);
                                }else if(this.index == 1){
                                    ratioDetailAll = ratioDetailAll+this.itemDetail[i][indexTotal].ratio;
                                    total += (this.itemDetail[i][indexTotal].adjust1*1);
                                }else if(this.index == 2){
                                    ratioDetailAll = ratioDetailAll+this.itemDetail[i][indexTotal].ratio;
                                    total += (this.itemDetail[i][indexTotal].adjust2*1);
                                }
                            }
                            // console.log("--------ratioDetailAll --> ",ratioDetailAll);
                            // console.log("------total --> ",total);
                            if(ratioDetailAll == 0){
                                if(this.code != undefined){
                                    console.log('adjust:0');
                                    this.$store.dispatch('setAdjustByCode',{adjust:0,index:this.index,code:this.code});
                                    // this.$store.dispatch('setAdjust',{adjust:0,index:this.index,indexDetail:this.indexDetail});
                                }
                            }else{
                                this.$store.dispatch('setAdjustByCode',{adjust:total,index:this.index,code:this.adjustdetail[a].code});
                            }
                        }
                        this.setAdjustMainByCollected();
                        
                    }
                },1000);
            },

            setAdjustMainAndRatioMainAndTotalMainAuto(){
                // console.log("setAdjustMainAndRatioMainAndTotalMainAuto",this.code);
                let ratioDetailAll = 0;
                let growthAll = 0;
                let indexDetail = -1;
                for(var i=0;i<this.itemDetail.length;i++){  // sum ratio from key in item, All card
                    indexDetail = this.itemDetail[i].findIndex(item => item.code === this.code);
                    // console.log("indexDetail --> ",indexDetail);
                    // console.log("ratio --> ",this.itemDetail[i][indexDetail]); 
                    if(this.itemDetail[i][indexDetail] == undefined) continue;
                    if(this.index == 0){
                        ratioDetailAll = ratioDetailAll+this.itemDetail[i][indexDetail].ratio;
                    }else if(this.index == 1){
                        ratioDetailAll = ratioDetailAll+this.itemDetail[i][indexDetail].ratio1;
                    }else if(this.index == 2){
                        ratioDetailAll = ratioDetailAll+this.itemDetail[i][indexDetail].ratio2;
                    }
                }
                //  console.log("ratioDetailAll --> ",ratioDetailAll);
                if(ratioDetailAll == 0){
                    if(this.code != undefined){
                        // console.log('adjust:0');
                        this.$store.dispatch('setAdjustByCode',{adjust:0,index:this.index,code:this.code});
                        // this.$store.dispatch('setAdjust',{adjust:0,index:this.index,indexDetail:this.indexDetail});
                    }
                }
                // else{
                    let total_str = "";
                    let total = 0;
                    let total_last = 0;
                    for(var i=0;i<this.rowAdjust.length;i++){ // sum total(Main) adjust 
                        if(this.index == 0){
                            total += (this.rowAdjust[i].adjust*1);
                            total_str = total_str+ "+"+ (this.rowAdjust[i].adjust*1);
                            total_last += (this.rowAdjust[i].lasttarget*1);
                        }else if(this.index == 1){
                            total += (this.rowAdjust[i].adjust1*1);
                            total_last += (this.rowAdjust[i].lasttarget1*1);
                        }else if(this.index == 2){
                            total += (this.rowAdjust[i].adjust2*1);
                            total_last += (this.rowAdjust[i].lasttarget2*1);
                        }
                    }
                    // console.log('total adjust : ',total);
                    // console.log('total total_str : ',total);
                    let total_growth = ((((total*1)-(total_last*1))/total_last*1)*100);
                    if(isNaN(total_growth)){
                        total_growth = 0;
                    }
                   
                    this.$store.dispatch('setRowTotalAdjust',{total,index:this.index});
                    // const total_growth = ((((total*1)-(total_last*1))/total_last*1)*100);
                    this.$store.dispatch('setRowTotalGrowth',{total:total_growth,index:this.index});
                    let ratio_total = 0;
                    let growth = 0;
                    let ratio = 0;
                    if(total>0){
                        for(var i=0;i<this.rowAdjust.length;i++){ // cal ratio(Main) and growth(Main) by line
                            ratio_total = 0;
                            growth = 0;
                            if(this.index == 0){
                                ratio_total = (((this.rowAdjust[i].adjust*1)/total)*100);
                                if(this.rowAdjust[i].lasttarget == 0 && this.rowAdjust[i].adjust !=0)
                                    growth = 100;
                                else if(this.rowAdjust[i].lasttarget == 0 && this.rowAdjust[i].adjust ==0)
                                    growth = 0;
                                else
                                    growth = ((((this.rowAdjust[i].adjust*1)-(this.rowAdjust[i].lasttarget*1))/this.rowAdjust[i].lasttarget*1)*100);
                            }else if(this.index == 1){
                                ratio_total = (((this.rowAdjust[i].adjust1*1)/total)*100);
                                if(this.rowAdjust[i].lasttarget1 == 0 && this.rowAdjust[i].adjust1!=0)
                                    growth = 100;
                                else if(this.rowAdjust[i].lasttarget1 == 0 && this.rowAdjust[i].adjust1 ==0)
                                    growth = 0;
                                else
                                    growth = ((((this.rowAdjust[i].adjust1*1)-(this.rowAdjust[i].lasttarget1*1))/this.rowAdjust[i].lasttarget1*1)*100);
                            }else if(this.index == 2){
                                ratio_total = (((this.rowAdjust[i].adjust2*1)/total)*100);
                                if(this.rowAdjust[i].lasttarget2 == 0 && this.rowAdjust[i].adjust2!=0)
                                    growth = 100;
                                else if(this.rowAdjust[i].lasttarget2 == 0 && this.rowAdjust[i].adjust2 ==0)
                                    growth = 0;
                                else
                                    growth = ((((this.rowAdjust[i].adjust2*1)-(this.rowAdjust[i].lasttarget2*1))/this.rowAdjust[i].lasttarget2*1)*100);
                            }
                            if(isNaN(growth)){
                                growth = 0;
                            }
                            this.$store.dispatch('setRatio',{ratio_total,index:this.index,indexDetail:i});
                            this.$store.dispatch('setGrowth',{growth,index:this.index,indexDetail:i});
                        }
                        if(this.index == 0){
                            ratio = 100;
                        }else if(this.index == 1){
                            ratio = 100;
                        }else if(this.index == 2){
                            ratio = 100;
                        }

                    }else{
                        if(this.index == 0){
                            ratio = 0;
                        }else if(this.index == 1){
                            ratio = 0;
                        }else if(this.index == 2){
                            ratio = 0;
                        }
                    }
                    
                    /* let ratio = 0;   // move in FOR: cal ratio(Main) and growth(Main) by line
                    for(var i=0;i<this.rowAdjust.length;i++){ // sum total(Main) ratio 
                        
                        if(this.index == 0){
                            ratio += (this.rowAdjust[i].ratio*1);
                        }else if(this.index == 1){
                            ratio += (this.rowAdjust[i].ratio1*1);
                        }else if(this.index == 2){
                            ratio += (this.rowAdjust[i].ratio2*1);
                        }
                    }
                    */
                    this.$store.dispatch('setRowTotalRatio',{total:ratio,index:this.index}); 
                    this.$store.dispatch('calculateSummary');
                // }
            },
            setAdjustDetailAndRatioDetailAndTotalDetailAuto(value, code){ // loop detail total
                    let total = 0;
                    let total_last = 0;
                    let indexTotal = -1;
                    for(var i=0;i<this.itemDetail.length;i++){ // sum total adjust from key in item, All card
                    indexTotal = this.itemDetail[i].findIndex(item => item.code === code);
                        if(this.itemDetail[i][indexTotal] == undefined) continue;
                        if(this.index == 0){
                            total += (this.itemDetail[i][indexTotal].adjust*1);
                            total_last += (this.itemDetail[i][indexTotal].lasttarget*1);
                        }else if(this.index == 1){
                            total += (this.itemDetail[i][indexTotal].adjust1*1);
                            total_last += (this.itemDetail[i][indexTotal].lasttarget1*1);
                        }else if(this.index == 2){
                            total += (this.itemDetail[i][indexTotal].adjust2*1);
                            total_last += (this.itemDetail[i][indexTotal].lasttarget2*1);
                        }
                    }
                    if(isNaN(total)) total = 0;
                    // console.log("total : ",total);
                    // const changed = ((total*1)-value)*-1;
                    // const percent = (changed*100)/total;
                    // let adjust = 0;
                    // let adjustChanged = 0;
                    // let indexDetail = -1;
                    // for(var i=0;i<this.itemDetail.length;i++){ // cal adjust from key in item, Each card
                    //     indexDetail = this.itemDetail[i].findIndex(item => item.code === code);
                    //     if(this.itemDetail[i][indexDetail] == undefined) continue;
                    //     adjust = 0;
                    //     adjustChanged = 0;
                    //     if(this.index == 0){
                    //         adjust = ((this.itemDetail[i][indexDetail].adjust*1)*percent)/100;
                    //         adjustChanged = (this.itemDetail[i][indexDetail].adjust*1)+adjust;
                    //     }else if(this.index == 1){
                    //         adjust = ((this.itemDetail[i][indexDetail].adjust1*1)*percent)/100;
                    //         adjustChanged = (this.itemDetail[i][indexDetail].adjust1*1)+adjust;
                    //     }else if(this.index == 2){
                    //         adjust = ((this.itemDetail[i][indexDetail].adjust2*1)*percent)/100;
                    //         adjustChanged = (this.itemDetail[i][indexDetail].adjust2*1)+adjust;
                    //     }
                    //     if(isNaN(adjustChanged)) adjustChanged = 0;
                    //     if(indexDetail != -1) this.$store.dispatch('setAdjustDetail',{adjust:adjustChanged,index:this.index,indexDetail,table:i,code:code});
                    //     this.calculateAdjustSubTable(this.index,i);
                    // }
 
                    let percent = 0;
                    let adjust = 0;
                    let adjustChanged = 0;
                    let indexDetail = -1;
                    let total_adjustChange = 0;
                    let adjust_arr = [];
                    adjust_arr['index_min'] = -1;
                    adjust_arr['index_max'] = -1;
                    adjust_arr['adjust_max'] = "";
                    adjust_arr['adjust_min'] = "";
                        
                    for(var i=0;i<this.itemDetail.length;i++){ // cal adjust from key in item, Each card
                        indexDetail = this.itemDetail[i].findIndex(item => item.code === code);
                        if(this.itemDetail[i][indexDetail] == undefined) continue;
                        adjust = 0;
                        adjustChanged = 0;
                        percent = 0;
                        if(this.index == 0){
                            percent = (this.itemDetail[i][indexDetail].adjust*1)/total;
                            if(isNaN(percent)) percent = 0;
                            // console.log(" ----- adjustChanged card =  ", value, " * ",percent);
                            adjustChanged = value*percent;
                            if(adjust_arr['adjust_min'] ==="" && adjustChanged !=0 ){
                                adjust_arr['index_min'] = i;
                                adjust_arr['adjust_min'] = adjustChanged;
                            }
                            // console.log(" ----- index card : ", i, " indexDetail : ",indexDetail, "adjust : ",adjustChanged);
                            if(adjustChanged != 0 && adjust_arr['adjust_min']  > adjustChanged){
                                adjust_arr['index_min'] = i;
                                adjust_arr['adjust_min'] = adjustChanged;
                            }
                            if(adjust_arr['adjust_max'] ==="" && adjustChanged !=0 ){
                                adjust_arr['index_max'] = i;
                                adjust_arr['adjust_max'] = adjustChanged;
                            }
                            if(adjust_arr['adjust_max']  < adjustChanged && adjustChanged != 0){
                                adjust_arr['index_max'] = i;
                                adjust_arr['adjust_max'] = adjustChanged;
                            }
                            total_adjustChange = total_adjustChange + (adjustChanged*1);
                        }else if(this.index == 1){
                            percent = (this.itemDetail[i][indexDetail].adjust1*1)/total;
                            adjustChanged = value*percent;
                            if(adjust_arr['adjust_min'] ==="" && adjustChanged !=0 ){
                                adjust_arr['index_min'] = i;
                                adjust_arr['adjust_min'] = adjustChanged;
                            }
                            // console.log(" ----- index card : ", i, " indexDetail : ",indexDetail, "adjust : ",adjustChanged);
                            if(adjustChanged != 0 && adjust_arr['adjust_min']  > adjustChanged){
                                adjust_arr['index_min'] = i;
                                adjust_arr['adjust_min'] = adjustChanged;
                            }
                            if(adjust_arr['adjust_max'] ==="" && adjustChanged !=0 ){
                                adjust_arr['index_max'] = i;
                                adjust_arr['adjust_max'] = adjustChanged;
                            }
                            if(adjust_arr['adjust_max']  < adjustChanged && adjustChanged != 0){
                                adjust_arr['index_max'] = i;
                                adjust_arr['adjust_max'] = adjustChanged;
                            }
                            total_adjustChange = total_adjustChange + (adjustChanged*1);
                        }else if(this.index == 2){
                            percent = (this.itemDetail[i][indexDetail].adjust2*1)/total;
                            adjustChanged = value*percent;
                            if(adjust_arr['adjust_min'] ==="" && adjustChanged !=0 ){
                                adjust_arr['index_min'] = i;
                                adjust_arr['adjust_min'] = adjustChanged;
                            }
                            // console.log(" ----- index card : ", i, " indexDetail : ",indexDetail, "adjust : ",adjustChanged);
                            if(adjustChanged != 0 && adjust_arr['adjust_min']  > adjustChanged){
                                adjust_arr['index_min'] = i;
                                adjust_arr['adjust_min'] = adjustChanged;
                            }
                            if(adjust_arr['adjust_max'] ==="" && adjustChanged !=0 ){
                                adjust_arr['index_max'] = i;
                                adjust_arr['adjust_max'] = adjustChanged;
                            }
                            if(adjust_arr['adjust_max']  < adjustChanged && adjustChanged != 0){
                                adjust_arr['index_max'] = i;
                                adjust_arr['adjust_max'] = adjustChanged;
                            }
                            total_adjustChange = total_adjustChange + (adjustChanged*1);
                        }
                        

                        if(isNaN(adjustChanged)) adjustChanged = 0;
                        if(indexDetail != -1) this.$store.dispatch('setAdjustDetail',{adjust:adjustChanged,index:this.index,indexDetail,table:i,code:code});
                        this.calculateAdjustSubTable(this.index,i);
                    }
                    // console.log("min : index",this.index_card_max, "adj : ",this.adjust_min );
                    //     console.log("max : index",this.index_card_min, "adj : ",this.adjust_max );
                    //     console.log("total_adjustChange : ",total_adjustChange);
                    //     console.log("adjust_arr : ",adjust_arr);
                        this.setAdjustDetailDiff(total_adjustChange,code,this.value,adjust_arr,'detail');
            },
            calculateAdjustSubTable(index,table) {  // cal detail 
                const adjustdetail = this.$store.getters.getAdjustMonthDetail(table);
                let total = 0;

                for(var i=0;i<adjustdetail.length;i++){ // sum total(card) adjust
                    if(index == 0){
                        total += (adjustdetail[i].adjust*1);
                    }else if(index == 1){
                        total += (adjustdetail[i].adjust1*1);
                    }else if(index == 2){
                        total += (adjustdetail[i].adjust2*1);
                    }
                }
                                
                this.$store.dispatch('setRowTotalAdjustDetail',{total,index:table,key:index});
                let totaladjust = 0;
                let totallasttarget = 0;
                let ratio_total =0;
                let growth = 0;
                let ratio = 0;
                let status_check = false;
                // console.log("index", index)
                // console.log("table", table)
                if(index == 0 && table != -1){
                    let indexDetail = adjustdetail.findIndex(item => item.code === this.code);
                    // console.log("indexDetail",indexDetail)
                    // console.log("indexDetail",adjustdetail[indexDetail])
                    if(adjustdetail[indexDetail].adjust < adjustdetail[indexDetail].max_value){
                        status_check = true;
                        this.$store.getters.setHeadDetailByIndexStatus({table :this.table  })
                    }else {
                         this.$store.getters.setHeadDetailByIndexStatus({table :this.table  })
                    }
                    // this.$store.dispatch('setAdjustDetail',{adjust:adjustChanged,index:this.index,indexDetail,table:i,code:code});

                    this.$store.dispatch('setAdjustByCheck',{status_check:status_check,index:this.index,indexDetail,table:this.table,code:this.code});
                    // this.$store.dispatch('setAdjustByCheck',{status_check:status_check,index:indexDetail,code:this.code});
                }

                for(var i=0;i<adjustdetail.length;i++){ // cal ratio by card, Per total(card)
                    ratio_total = 0;
                    growth = 0;
                    status_check = false; 
                    if(total > 0){
                        if(index == 0){
                            
                            // console.log(adjustdetail[i].max_value)
                            // if(adjustdetail[i].adjust < adjustdetail[i].max_value){
                            //     status_check = true;
                            // }
                            // console.log("adjustdetail", adjustdetail[i])
                            ratio_total = (((adjustdetail[i].adjust*1)/total)*100);
                            if(adjustdetail[i].lasttarget == 0 && adjustdetail[i].adjust!=0)
                                growth = 100;
                            else if(adjustdetail[i].lasttarget == 0 && adjustdetail[i].adjust ==0)
                                growth = 0;
                            else
                                growth = ((((adjustdetail[i].adjust*1)-(adjustdetail[i].lasttarget*1))/adjustdetail[i].lasttarget*1)*100);
                            totaladjust += (adjustdetail[i].adjust*1);
                            totallasttarget += (adjustdetail[i].lasttarget*1);
                        }else if(index == 1){
                            ratio_total = (((adjustdetail[i].adjust1*1)/total)*100);
                            if(adjustdetail[i].lasttarget1 == 0 && adjustdetail[i].adjust1!=0)
                                growth = 100;
                            else if(adjustdetail[i].lasttarget1 == 0 && adjustdetail[i].adjust1 ==0)
                                growth = 0;
                            else
                                growth = ((((adjustdetail[i].adjust1*1)-(adjustdetail[i].lasttarget1*1))/adjustdetail[i].lasttarget1*1)*100);
                            totaladjust += (adjustdetail[i].adjust1*1);
                            totallasttarget += (adjustdetail[i].lasttarget1*1);
                        }else if(index == 2){
                            ratio_total = (((adjustdetail[i].adjust2*1)/total)*100);
                            if(adjustdetail[i].lasttarget2 == 0 && adjustdetail[i].adjust2!=0)
                                growth = 100;
                            else if(adjustdetail[i].lasttarget2 == 0 && adjustdetail[i].adjust2 ==0)
                                growth = 0;
                            else
                                growth = ((((adjustdetail[i].adjust2*1)-(adjustdetail[i].lasttarget2*1))/adjustdetail[i].lasttarget2*1)*100);
                            totaladjust += (adjustdetail[i].adjust2*1);
                            totallasttarget += (adjustdetail[i].lasttarget2*1);
                        }
                        //  this.$store.dispatch('setAdjustByCheck',{status_check:status_check,index:this.index,code:this.code});
                    }
                    // console.log("ratio_total ", ratio_total);
                    if(isNaN(growth)){
                        growth = 0;
                    }
                   
                    this.$store.dispatch('setRatioDetail',{ratio_total,index,indexDetail:i,table,code:adjustdetail[i].code});
                    if (!isNaN(growth))
                    this.$store.dispatch('setGrowthDetail',{growth,index,indexDetail:i,table,code:adjustdetail[i].code});
                }
                if(total > 0){
                    if(this.index == 0){
                        ratio = 100;
                    }else if(this.index == 1){
                        ratio = 100;
                    }else if(this.index == 2){
                        ratio = 100;
                    }
                }else{
                    if(this.index == 0){
                        ratio = 0;
                    }else if(this.index == 1){
                        ratio = 0;
                    }else if(this.index == 2){
                        ratio = 0;
                    }
                }
                /* let ratio = 0;  //move in FOR:cal ratio by card, Per total(card)
                for(var i=0;i<adjustdetail.length;i++){ // sum total(card) ratio
                    if(index == 0){
                        ratio += (adjustdetail[i].ratio*1);
                    }else if(index == 1){
                        ratio += (adjustdetail[i].ratio1*1);
                    }else if(index == 2){
                        ratio += (adjustdetail[i].ratio2*1);
                    }
                } */

                let growthtotal = 0;
                if(totallasttarget == 0 && totaladjust!=0){
                    growthtotal = 100;
                }else if(totallasttarget == 0 && totaladjust ==0){
                    growthtotal = 0;
                
                }else{
                    growthtotal = ((((totaladjust*1)-(totallasttarget*1))/totallasttarget*1)*100);
                }
                if(isNaN(growthtotal)){
                    growthtotal = 0;
                }
                // const growthtotal = ((((totaladjust*1)-(totallasttarget*1))/totallasttarget*1)*100);
                this.$store.dispatch('setRowTotalRatioDetail',{total:ratio,index:table,key:index});
                this.$store.dispatch('setRowTotalGrowthDetail',{total:growthtotal,index:table,key:index});
            },
            setAdjustDetailTotalDetailAutoByCollected(value,code){ // loop detail total
                let total = 0;
                let total_last = 0;
                let indexTotal = -1;
                for(var i=0;i<this.itemDetail.length;i++){ // sum total adjust from key in item, All card
                    indexTotal = this.itemDetail[i].findIndex(item => item.code === code);
                    // const result = this.itemDetail[i].find( item => item.code === code );
                    if(this.itemDetail[i][indexTotal] == undefined) continue;
                    if(this.index == 0){
                        total += (this.itemDetail[i][indexTotal].adjust*1);
                        total_last += (this.itemDetail[i][indexTotal].lasttarget*1);
                    }else if(this.index == 1){
                        total += (this.itemDetail[i][indexTotal].adjust1*1);
                        total_last += (this.itemDetail[i][indexTotal].lasttarget1*1);
                    }else if(this.index == 2){
                        total += (this.itemDetail[i][indexTotal].adjust2*1);
                        total_last += (this.itemDetail[i][indexTotal].lasttarget2*1);
                    }
                }
                // console.log("---total--- : ",total);
                const changed = ((total*1)-value)*-1;
                let percent = (changed*100)/total;
                if(isNaN(percent)) percent = 0;
                let adjust = 0;
                let adjustChanged = 0;
                let indexDetail = -1;
                let total_adjustChange = 0;
                let adjust_arr = [];
                    adjust_arr['index_min'] = -1;
                    adjust_arr['index_max'] = -1;
                    adjust_arr['adjust_max'] = "";
                    adjust_arr['adjust_min'] = "";

                for(var i=0;i<this.itemDetail.length;i++){ // cal adjust from key in item, Each card
                    indexDetail = this.itemDetail[i].findIndex(item => item.code === code);
                    if(this.itemDetail[i][indexDetail] == undefined) continue;
                    adjust = 0;
                    adjustChanged = 0;

                    if(this.index == 0){
                    // console.log(" ----- index card : ", i, " indexDetail : ",indexDetail, "adj : ",this.itemDetail[i][indexDetail].adjust);

                        adjust = ((this.itemDetail[i][indexDetail].adjust*1)*percent)/100;
                        if(isNaN(adjust)) adjust = 0;
                        adjustChanged = (this.itemDetail[i][indexDetail].adjust*1)+adjust;
                        if(adjust_arr['adjust_min'] ==="" && adjustChanged !=0 ){
                            adjust_arr['index_min'] = i;
                            adjust_arr['adjust_min'] = adjustChanged;
                        }
                        // console.log(" ----- index card : ", i, " indexDetail : ",indexDetail, "adjust : ",adjustChanged);
                        if(adjustChanged != 0 && adjust_arr['adjust_min']  > adjustChanged){
                            adjust_arr['index_min'] = i;
                            adjust_arr['adjust_min'] = adjustChanged;
                        }
                        if(adjust_arr['adjust_max'] ==="" && adjustChanged !=0 ){
                            adjust_arr['index_max'] = i;
                            adjust_arr['adjust_max'] = adjustChanged;
                        }
                        if(adjust_arr['adjust_max']  < adjustChanged && adjustChanged != 0){
                            adjust_arr['index_max'] = i;
                            adjust_arr['adjust_max'] = adjustChanged;
                        }
                        total_adjustChange = total_adjustChange + (adjustChanged*1);
                    }else if(this.index == 1){
                        adjust = ((this.itemDetail[i][indexDetail].adjust1*1)*percent)/100;
                        if(isNaN(adjust)) adjust = 0;
                        adjustChanged = (this.itemDetail[i][indexDetail].adjust1*1)+adjust;
                        if(adjust_arr['adjust_min'] ==="" && adjustChanged !=0 ){
                            adjust_arr['index_min'] = i;
                            adjust_arr['adjust_min'] = adjustChanged;
                        }
                        // console.log(" ----- index card : ", i, " indexDetail : ",indexDetail, "adjust : ",adjustChanged);
                        if(adjustChanged != 0 && adjust_arr['adjust_min']  > adjustChanged){
                            adjust_arr['index_min'] = i;
                            adjust_arr['adjust_min'] = adjustChanged;
                        }
                        if(adjust_arr['adjust_max'] ==="" && adjustChanged !=0 ){
                            adjust_arr['index_max'] = i;
                            adjust_arr['adjust_max'] = adjustChanged;
                        }
                        if(adjust_arr['adjust_max']  < adjustChanged && adjustChanged != 0){
                            adjust_arr['index_max'] = i;
                            adjust_arr['adjust_max'] = adjustChanged;
                        }
                        total_adjustChange = total_adjustChange + (adjustChanged*1);
                    }else if(this.index == 2){
                        adjust = ((this.itemDetail[i][indexDetail].adjust2*1)*percent)/100;
                        if(isNaN(adjust)) adjust = 0;
                        adjustChanged = (this.itemDetail[i][indexDetail].adjust2*1)+adjust;
                        if(adjust_arr['adjust_min'] ==="" && adjustChanged !=0 ){
                            adjust_arr['index_min'] = i;
                            adjust_arr['adjust_min'] = adjustChanged;
                        }
                        // console.log(" ----- index card : ", i, " indexDetail : ",indexDetail, "adjust : ",adjustChanged);
                        if(adjustChanged != 0 && adjust_arr['adjust_min']  > adjustChanged){
                            adjust_arr['index_min'] = i;
                            adjust_arr['adjust_min'] = adjustChanged;
                        }
                        if(adjust_arr['adjust_max'] ==="" && adjustChanged !=0 ){
                            adjust_arr['index_max'] = i;
                            adjust_arr['adjust_max'] = adjustChanged;
                        }
                        if(adjust_arr['adjust_max']  < adjustChanged && adjustChanged != 0){
                            adjust_arr['index_max'] = i;
                            adjust_arr['adjust_max'] = adjustChanged;
                        }
                        total_adjustChange = total_adjustChange + (adjustChanged*1);
                    }
                    if(isNaN(adjustChanged)) adjustChanged = 0;
                    if (indexDetail != -1)
                    this.$store.dispatch('setAdjustDetail',{adjust:adjustChanged,index:this.index,indexDetail,table:i,code:code});

                    // this.calculateAdjustSubTable(this.index,i);
                }
                // console.log("min : index",adjust_arr['index_min'], "adj : ",adjust_arr['adjust_min'] );
                // console.log("max : index",adjust_arr['index_max'], "adj : ",adjust_arr['index_max'] );
                // console.log("total_adjustChange : ",total_adjustChange);
                // console.log("adjust_arr : ",adjust_arr);
                this.setAdjustDetailDiff(total_adjustChange,code,value,adjust_arr,'total');

            },
            setAdjustMainByCollected(){
                /* console.log("setAdjustMainAndRatioMainAndTotalMainAuto");
                let ratioDetailAll = 0;
                let growthAll = 0;
                let indexDetail = -1;
                for(var a=0;a<this.rowAdjust.length;a++){ 
                    for(var i=0;i<this.itemDetail.length;i++){  // sum ratio from key in item, All card
                        indexDetail = this.itemDetail[i].findIndex(item => item.code === this.rowAdjust[a].code);
                        console.log("indexDetail --> ",indexDetail);
                        console.log("ratio --> ",this.itemDetail[i][indexDetail]);
                        if(this.itemDetail[i][indexDetail] == undefined) continue;
                        if(this.index == 0){
                            ratioDetailAll = ratioDetailAll+this.itemDetail[i][indexDetail].ratio;
                        }else if(this.index == 1){
                            ratioDetailAll = ratioDetailAll+this.itemDetail[i][indexDetail].ratio1;
                        }else if(this.index == 2){
                            ratioDetailAll = ratioDetailAll+this.itemDetail[i][indexDetail].ratio2;
                        }
                    }
                    
                    console.log("ratioDetailAll --> ",ratioDetailAll);
                    if(ratioDetailAll == 0){
                        if(this.code != undefined){
                            console.log('adjust:0');
                            this.$store.dispatch('setAdjustByCode',{adjust:0,index:this.index,code:this.code});
                            // this.$store.dispatch('setAdjust',{adjust:0,index:this.index,indexDetail:this.indexDetail});
                        }
                    }else{ */
                        let total = 0;
                        let total_last = 0;
                        for(var i=0;i<this.rowAdjust.length;i++){ // sum total(Main) adjust 
                            if(this.index == 0){
                                total += (this.rowAdjust[i].adjust*1);
                                total_last += (this.rowAdjust[i].lasttarget*1);
                            }else if(this.index == 1){
                                total += (this.rowAdjust[i].adjust1*1);
                                total_last += (this.rowAdjust[i].lasttarget1*1);
                            }else if(this.index == 2){
                                total += (this.rowAdjust[i].adjust2*1);
                                total_last += (this.rowAdjust[i].lasttarget2*1);
                            }
                        }
                        // console.log(" tatal ---> ", total)
                        // console.log(" total_last ---> ", total_last)
                        let total_growth = 0;
                        if(total_last == 0 && total!=0){
                            total_growth = 100;
                        }else if(total_last == 0 && total ==0){
                            total_growth = 0;
                        }else{
                            total_growth = ((((total*1)-(total_last*1))/total_last*1)*100);
                        }
                        // let total_growth = ((((total*1)-(total_last*1))/total_last*1)*100);
                        if(isNaN(total_growth)){
                            total_growth = 0;
                        }
                        
                        this.$store.dispatch('setRowTotalAdjust',{total,index:this.index});
                        // const total_growth = ((((total*1)-(total_last*1))/total_last*1)*100);
                        this.$store.dispatch('setRowTotalGrowth',{total:total_growth,index:this.index});
                        let ratio_total = 0;
                        let growth = 0;
                        let ratio = 0;
                        if(total>0){
                            for(var i=0;i<this.rowAdjust.length;i++){ // cal ratio(Main) and growth(Main) by line
                                ratio_total = 0;
                                growth = 0;
                                if(this.index == 0){
                                    ratio_total = (((this.rowAdjust[i].adjust*1)/total)*100);
                                    if(this.rowAdjust[i].lasttarget == 0 && this.rowAdjust[i].adjust !=0)
                                        growth = 100;
                                    else if(this.rowAdjust[i].lasttarget == 0 && this.rowAdjust[i].adjust ==0)
                                        growth = 0;
                                    else
                                        growth = ((((this.rowAdjust[i].adjust*1)-(this.rowAdjust[i].lasttarget*1))/this.rowAdjust[i].lasttarget*1)*100);
                                }else if(this.index == 1){
                                    ratio_total = (((this.rowAdjust[i].adjust1*1)/total)*100);
                                    if(this.rowAdjust[i].lasttarget1 == 0 && this.rowAdjust[i].adjust1!=0)
                                        growth = 100;
                                    else if(this.rowAdjust[i].lasttarget1 == 0 && this.rowAdjust[i].adjust1 ==0)
                                        growth = 0;
                                    else
                                        growth = ((((this.rowAdjust[i].adjust1*1)-(this.rowAdjust[i].lasttarget1*1))/this.rowAdjust[i].lasttarget1*1)*100);
                                }else if(this.index == 2){
                                    ratio_total = (((this.rowAdjust[i].adjust2*1)/total)*100);
                                    if(this.rowAdjust[i].lasttarget2 == 0 && this.rowAdjust[i].adjust2!=0)
                                        growth = 100;
                                    else if(this.rowAdjust[i].lasttarget2 == 0 && this.rowAdjust[i].adjust2 ==0)
                                        growth = 0;
                                    else
                                        growth = ((((this.rowAdjust[i].adjust2*1)-(this.rowAdjust[i].lasttarget2*1))/this.rowAdjust[i].lasttarget2*1)*100);
                                }
                                if(isNaN(growth)){
                                    growth = 0;
                                }
                                this.$store.dispatch('setRatio',{ratio_total,index:this.index,indexDetail:i});
                                this.$store.dispatch('setGrowth',{growth,index:this.index,indexDetail:i});
                            }
                            if(this.index == 0){
                                ratio = 100;
                            }else if(this.index == 1){
                                ratio = 100;
                            }else if(this.index == 2){
                                ratio = 100;
                            }

                        }else{
                            if(this.index == 0){
                                ratio = 0;
                            }else if(this.index == 1){
                                ratio = 0;
                            }else if(this.index == 2){
                                ratio = 0;
                            }
                        }

                        this.$store.dispatch('setRowTotalRatio',{total:ratio,index:this.index}); 
                        this.$store.dispatch('calculateSummary');
                    // }
                // }
            },
            setAdjustDetailDiff(total_adjust,code,value_input,adjust_arr,type){
                // console.log("----------code-------------- :",code);

                let adjustChanged = 0;
                let card_index = 0;
                let indexDetail = -1;
                let _total_adjust = (type == 'total')? total_adjust:this.formatNumber(total_adjust,4,'int');
                let _value_input = (type == 'total')? value_input:this.formatNumber(value_input,4,'int')
                let diff_val = parseFloat(_value_input) - parseFloat(_total_adjust);
                // console.log("value_input :",_value_input);
                //         console.log("total_adjust : ",_total_adjust);
                //         console.log("diff_val : ",diff_val);
                if(isNaN(diff_val)) diff_val = 0;
                if(diff_val != 0){
                    diff_val = parseFloat(value_input) - parseFloat(total_adjust);

                    if(diff_val > 0){
                        card_index = adjust_arr['index_min'];
                    }else{
                        card_index = adjust_arr['index_max'];
                    }
                    indexDetail = this.itemDetail[card_index].findIndex(item => item.code === code);

                    if(indexDetail != -1){
                        if(this.index == 0){
                            // console.log("adjust: ",parseFloat(this.itemDetail[card_index][indexDetail].adjust) ,"con_diff_val :", diff_val)
                            adjustChanged = parseFloat(this.itemDetail[card_index][indexDetail].adjust) + diff_val;
                        }else if(this.index == 1){
                            adjustChanged = parseFloat(this.itemDetail[card_index][indexDetail].adjust1) + diff_val;
                        }else if(this.index == 2){
                            adjustChanged = parseFloat(this.itemDetail[card_index][indexDetail].adjust2) + diff_val;
                        }
                
                        // console.log("adjustChanged : ",adjustChanged);
                        if(isNaN(adjustChanged)) adjustChanged = 0;
                        if(indexDetail != -1) this.$store.dispatch('setAdjustDetail',{adjust:adjustChanged,index:this.index,indexDetail,table:card_index,code:code});
                        this.calculateAdjustSubTable(this.index,card_index);
                    }
            }

            },
            setAdjustTotalDiff(total_adjust,value_input,adjust_arr){
                // console.log("----------code-------------- :",code);

                let adjust = 0;
                let card_index = "";
                let code = "";
                let _total_adjust = this.formatNumber(total_adjust,4,'int');
                let _value_input = this.formatNumber(value_input,4,'int')
                let diff_val = parseFloat(_value_input) - parseFloat(_total_adjust);
                // console.log("value_input :",_value_input);
                //         console.log("total_adjust : ",_total_adjust);
                //         console.log("diff_val : ",diff_val);
                if(isNaN(diff_val)) diff_val = 0;
                if(diff_val != 0){
                    diff_val = parseFloat(value_input) - parseFloat(total_adjust);

                    if(diff_val > 0){
                        card_index = adjust_arr['index_min'];
                        code = adjust_arr['code_min']
                    }else{
                        card_index = adjust_arr['index_max'];
                        code = adjust_arr['code_max'];
                    }

                    // if(card_index !== ""){
                        if(this.index == 0){
                            // console.log("adjust: ",parseFloat(this.rowAdjust[card_index].adjust) ,"con_diff_val :", diff_val)
                            adjust = parseFloat(this.rowAdjust[card_index].adjust) + diff_val;
                        }else if(this.index == 1){
                            adjust = parseFloat(this.rowAdjust[card_index].adjust1) + diff_val;
                        }else if(this.index == 2){
                            adjust = parseFloat(this.rowAdjust[card_index].adjust2) + diff_val;
                        }
                    //     if(isNaN(adjust)) adjust = 0;
                        // console.log("adjust : ",adjust);
                        this.$store.dispatch('setAdjust',{adjust,index:this.index,indexDetail:card_index});
                        this.setAdjustDetailTotalDetailAutoByCollected(adjust,code);
                    //     console.log("adjust : ",adjust);
                    // }
                }   

            },
            convert(n){
                var [lead,decimal,pow] = n.toString().split(/e|\./);
                let res = (pow <= 0)
                    ? "0." + "0".repeat(Math.abs(pow)-1) + lead + decimal
                    : lead + ( +pow >= decimal.length ? (decimal + "0".repeat(+pow-decimal.length)) : (decimal.slice(0,+pow)+"."+decimal.slice(+pow)));
                return res;
            }
           
        },
        data() {
            return {
                isInputActive: false,
                tmpData:0,
                disabled:true,
                index_card_max:"",
                index_card_min:"",
                adjust_min:0,
                adjust_max:0,
                modifiedValue: 0
                
            }
        },
    }
</script>