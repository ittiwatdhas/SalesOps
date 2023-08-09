<template>
<md-input-container class="md-input-invalid input-per -width-ratio ">
    <!-- <template v-if="disabled">
        <md-input type="text" v-model="displayValue" :disabled="true" class="cursor-not text-right disabled"></md-input>
    </template>
    <template v-else> -->
        <md-input type="text" 
        v-model="displayValue" 
        :disabled="status_input" 
        @blur="calculateOther" 
        @keypress.native="isNumber" 
        v-on:change="calculate" 
        @focus="isInputActive = true" 
        class="text-left" 
        maxlength="6"
        @focus.native="$event.target.select()"></md-input>
    <!-- </template> --> 
    <span class="-font-12 -gray-41 pt-5">%</span>
</md-input-container>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'; 
    export default {
        computed: {
            ...mapGetters({ 
                    rowAdjust: 'getRowAdjust',
                    rowAdjustTotal: 'getRowTotalAdjust',
                    itemDetail: 'getAdjustMonthDetailAll',
            }),
            displayValue: {
                get: function() {
                    if (this.isInputActive) {
                        var test = this.value.toString().indexOf(".");
                        if(test==-1){
                            return this.value.toString();
                        }else
                            return this.value.toFixed(2).toString();
                            // return this.formatNumber(this.value,2);
                    } else {
                        return parseFloat(this.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
                        // return this.formatNumber(this.value,2); 
                    }
                },
                set: function(modifiedValue) {
                    let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""));
                    if (isNaN(newValue)) {
                        newValue = 0;
                    }
                    this.$emit('input', newValue);
                }
            },
            adjustdetail(){
                return this.$store.getters.getAdjustMonthDetail(this.table);
            },
            rowtotaldetail(){
                return this.$store.getters.getRowTotalDetail(this.table);
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
            disabled: {},
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
            calculateOther(){
                this.isInputActive = false;
                setTimeout(() => {
                    if(this.type == 'detail' && this.table==-1){
                        //calculate in table
                        var adjust_now = 0;
                        if(this.index == 0){
                            adjust_now = this.rowAdjust[this.indexDetail].adjust;
                        }else if(this.index == 1){
                            adjust_now = this.rowAdjust[this.indexDetail].adjust1;
                        }else if(this.index == 2){
                            adjust_now = this.rowAdjust[this.indexDetail].adjust2;
                        }
                        // console.log("adjust : ",adjust_now);
                        this.setAdjustDetailAndRatioDetailAndTotalDetailAuto(adjust_now,this.code);
                    }else if(this.type =='detail' && this.table!=-1){
                        /* var total =[];
                        for(var i=0;i<this.itemDetail.length;i++){
                            for(var j=0;j<this.itemDetail[i].length;j++){
                                
                                if(total[j] == undefined) total[j] = 0;
                                if(this.index == 0){
                                    total[j] += (this.itemDetail[i][j].adjust*1);
                                }else if(this.index == 1){
                                    total[j] += (this.itemDetail[i][j].adjust1*1);
                                }else if(this.index == 2){
                                    total[j] += (this.itemDetail[i][j].adjust2*1);
                                }
                            }
                        }
                        for(var i=0;i<total.length;i++){
                            this.$store.dispatch('setAdjust',{adjust:total[i],index:this.index,indexDetail:i});
                        } */
                        let total = 0;
                        let indexTotal =-1;
                        for(var a=0;a<this.adjustdetail.length;a++){
                            // console.log(this.adjustdetail[a].code);
                            total = 0;
                            for(var i=0;i<this.itemDetail.length;i++){
                                indexTotal = this.itemDetail[i].findIndex(item => item.code === this.adjustdetail[a].code);
                                // console.log(this.adjustdetail[a].code);
                                if(this.itemDetail[i][indexTotal] == undefined) continue;
                                if(this.index == 0){
                                    total += (this.itemDetail[i][indexTotal].adjust*1);
                                }else if(this.index == 1){
                                    total += (this.itemDetail[i][indexTotal].adjust1*1);
                                }else if(this.index == 2){
                                    total += (this.itemDetail[i][indexTotal].adjust2*1);
                                }
                            }
                            // console.log("itemDetail total",total);
                            this.$store.dispatch('setAdjustByCode',{adjust:total,index:this.index,code:this.adjustdetail[a].code});
                        }
                        
                        this.setAdjustMainAndRatioMainAndTotalMainAuto();
                    }
                }, 200);
            },
            calculate(){
                setTimeout(() => {
    /*                     let v = this.value;
                        if(!this.disabled && (v*1)>100 ){
                            v = 100;
                            this.$emit('input', "100");
                        } */
                        if(this.type == 'detail' && this.table==-1){  //head
                            
                            //calculate in table
                            let percent = 0;
                            let total_per = 0;
                            let per_new = 0;
                            let total_new =  100 - this.value;
                            let v = this.value;

                            if(!this.disabled && (v*1)>100 ){
                                v = 100;
                                this.$emit('input', "100");
                            } 
                            for(var i=0;i<this.rowAdjust.length;i++){
                                  
                                if(this.indexDetail != i){
                                    if(this.index == 0){
                                        total_per += (this.rowAdjust[i].ratio*1);
                                    }else if(this.index == 1){
                                        total_per += (this.rowAdjust[i].ratio1*1);
                                    }else if(this.index == 2){
                                        total_per += (this.rowAdjust[i].ratio2*1);
                                    }

                                }
                            }
                            for(var i=0;i<this.rowAdjust.length;i++){
                                
                                if(this.indexDetail != i){
                                    if(total_per*1 != 0){
                                        if(this.index == 0){
                                            per_new = ((this.rowAdjust[i].ratio*1) / total_per) * total_new;  
                                            this.rowAdjust[i].ratio = per_new;

                                        }else if(this.index == 1){
                                            per_new = ((this.rowAdjust[i].ratio1*1) / total_per) * total_new;  
                                            this.rowAdjust[i].ratio1 = per_new;
                                        }else if(this.index == 2){
                                            per_new = ((this.rowAdjust[i].ratio2*1) / total_per) * total_new;  
                                            this.rowAdjust[i].ratio2 = per_new;
                                        }

                                    }else{  
                                        if(this.index == 0){
                                            this.rowAdjust[i].ratio = 0;

                                        }else if(this.index == 1){
                                            this.rowAdjust[i].ratio1 = 0;
                                        }else if(this.index == 2){
                                            this.rowAdjust[i].ratio2 = 0;
                                        }
                                    }
                                    
                                }

                                if(this.index == 0){
                                    percent += (this.rowAdjust[i].ratio*1);
                                }else if(this.index == 1){
                                    percent += (this.rowAdjust[i].ratio1*1);
                                }else if(this.index == 2){
                                    percent += (this.rowAdjust[i].ratio2*1);
                                }
                            }

                            this.$store.dispatch('setRowTotalRatio',{total:percent,index:this.index});
                            const total = this.rowAdjustTotal[this.index].total_adjust;
                            let adjust = 0;
                            let ratio_line = 0;
                            if(total!=0){
                                for(var i=0;i<this.rowAdjust.length;i++){
                                    adjust = 0;
                                    ratio_line = 0;
                                    if(this.index == 0){
                                        // ratio_line = this.rowAdjust[i].ratio;
                                        ratio_line = parseFloat(this.rowAdjust[i].ratio).toFixed(2);
                                        adjust = ((ratio_line*1)*total)/percent;
                                        // adjust = ((this.rowAdjust[i].ratio*1)*total)/percent;
                                    }else if(this.index == 1){
                                        ratio_line = parseFloat(this.rowAdjust[i].ratio1).toFixed(2);
                                        // ratio_line = this.rowAdjust[i].ratio1;
                                        adjust = ((ratio_line*1)*total)/percent;
                                        // adjust = ((this.rowAdjust[i].ratio1*1)*total)/percent;
                                    }else if(this.index == 2){
                                        ratio_line = parseFloat(this.rowAdjust[i].ratio2).toFixed(2);
                                        // ratio_line = this.rowAdjust[i].ratio2;
                                        adjust = ((ratio_line*1)*total)/percent;
                                        // adjust = ((this.rowAdjust[i].ratio2*1)*total)/percent;
                                    }
                                    this.$store.dispatch('setAdjust',{adjust:adjust,index:this.index,indexDetail:i});
                                }
                            }
                            
                        }else if(this.type =='detail' && this.table!=-1){ //detail

                            let percent = 0;
                            let total_per = 0;
                            let per_new = 0;
                            let total_new =  100 - this.value;
                            let v = this.value;

                            if(!this.disabled && (v*1)>100 ){
                                v = 100;
                                this.$emit('input', "100");
                            } 

                            for(var i=0;i<this.adjustdetail.length;i++){

                                if(this.indexDetail != i){
                                    if(this.index == 0){
                                        total_per += (this.adjustdetail[i].ratio*1);
                                    }else if(this.index == 1){
                                        total_per += (this.adjustdetail[i].ratio1*1);
                                    }else if(this.index == 2){
                                        total_per += (this.adjustdetail[i].ratio2*1);
                                    }

                                }
                            }
                            for(var i=0;i<this.adjustdetail.length;i++){
                                  
                                    if(this.indexDetail != i){

                                        if(total_per*1 != 0){
                                            if(this.index == 0){
                                                per_new = ((this.adjustdetail[i].ratio*1) / total_per) * total_new;  
                                                this.adjustdetail[i].ratio = per_new;

                                            }else if(this.index == 1){
                                                per_new = ((this.adjustdetail[i].ratio1*1) / total_per) * total_new;  
                                                this.adjustdetail[i].ratio1 = per_new;
                                            }else if(this.index == 2){
                                                per_new = ((this.adjustdetail[i].ratio2*1) / total_per) * total_new;  
                                                this.adjustdetail[i].ratio2 = per_new;
                                            }

                                        }else{
                                            if(this.index == 0){
                                                this.adjustdetail[i].ratio = 0;

                                            }else if(this.index == 1){
                                                this.adjustdetail[i].ratio1 = 0;
                                            }else if(this.index == 2){
                                                this.adjustdetail[i].ratio2 = 0;
                                            }
                                        }

                                    }

                                if(this.index == 0){
                                    percent += (this.adjustdetail[i].ratio*1);
                                }else if(this.index == 1){
                                    percent += (this.adjustdetail[i].ratio1*1);
                                }else if(this.index == 2){
                                    percent += (this.adjustdetail[i].ratio2*1);
                                }
                            }

                            this.$store.dispatch('setRowTotalRatioDetail',{total:percent,index:this.table,key:this.index});
                            let total = 0;
                            if(this.index == 0)
                                total = this.rowtotaldetail.adjust;
                            else if(this.index ==1)
                                total = this.rowtotaldetail.adjust1;
                            else
                                total = this.rowtotaldetail.adjust2;
                            if(total!=0){   
                                let adjust = 0; 
                                for(var i=0;i<this.adjustdetail.length;i++){
                                    adjust = 0;
                                    if(this.index == 0){
                                        adjust = ((this.adjustdetail[i].ratio*1)*total)/percent;
                                    }else if(this.index == 1){
                                        adjust = ((this.adjustdetail[i].ratio1*1)*total)/percent;
                                    }else if(this.index == 2){
                                        adjust = ((this.adjustdetail[i].ratio2*1)*total)/percent;
                                    }
                                    this.$store.dispatch('setAdjustDetail',{adjust:adjust,index:this.index,indexDetail:i,table:this.table,code:this.adjustdetail[i].code});
                                }
                            }
                        }
                }, 200);
            },
            setAdjustDetailAndRatioDetailAndTotalDetailAuto(value,code){

                    let total = 0;
                    let indexTotal =-1;
                    for(var i=0;i<this.itemDetail.length;i++){
                        indexTotal = this.itemDetail[i].findIndex(item => item.code === code);
                        if(this.itemDetail[i][indexTotal] == undefined) continue;
                        if(this.index == 0){
                            total += (this.itemDetail[i][indexTotal].adjust*1);
                        }else if(this.index == 1){
                            total += (this.itemDetail[i][indexTotal].adjust1*1);
                        }else if(this.index == 2){
                            total += (this.itemDetail[i][indexTotal].adjust2*1);
                        }
                    }

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
                    //     console.log("adjust : ",adjust_arr);
                        this.setAdjustDetailDiff(total_adjustChange,code,value,adjust_arr,'detail');

                    // const changed = ((total*1)-value)*-1;
                    // const percent = (changed*100)/total;
                    // // console.log("total : ", total , "changed : ", changed , " percent: ", percent);
                    // let adjust = 0;
                    // let adjustChanged = 0;
                    // let indexDetail = -1;
                    // for(var i=0;i<this.itemDetail.length;i++){
                    //     adjust = 0;
                    //     adjustChanged = 0;
                    //     indexDetail = this.itemDetail[i].findIndex(item => item.code === code);
                    //     if(this.itemDetail[i][indexDetail] == undefined) continue;
                    //     if(this.index == 0){
                    //         adjust = ((this.itemDetail[i][indexDetail].adjust*1)*percent)/100;
                    //         adjustChanged = (this.itemDetail[i][indexDetail].adjust*1)+adjust;
                    //     }else if(this.index == 1){
                    //         adjust = ((this.itemDetail[i][indexDetail].adjust1*1)*percent)/100;
                    //         adjustChanged = (this.itemDetail[i][indexDetail].adjust1*1)+adjust;
                    //     }else if(this.index == 2){
                    //         adjust = ((this.itemDetail[i][this.indexDetail].adjust2*1)*percent)/100;
                    //         adjustChanged = (this.itemDetail[i][indexDetail].adjust2*1)+adjust;
                    //     }
                    //     // console.log("indexDetail : ", indexDetail , "adjustChanged : ", adjustChanged , " adjus: ", adjust);
                    //     if(isNaN(adjustChanged)) adjustChanged = 0;
                        
                    //     if(indexDetail != -1) this.$store.dispatch('setAdjustDetail',{adjust:adjustChanged,index:this.index,indexDetail:indexDetail,table:i,code:code});
                    //     this.calculateAdjustSubTable(this.index,i);
                    // }
            },
            calculateAdjustSubTable(index,table) {

                const adjustdetail = this.$store.getters.getAdjustMonthDetail(table);
                let total = 0;
                for(var i=0;i<adjustdetail.length;i++){
                    if(index == 0){
                        total += (adjustdetail[i].adjust*1);
                    }else if(index == 1){
                        total += (adjustdetail[i].adjust1*1);
                    }else if(index == 2){
                        total += (adjustdetail[i].adjust2*1);
                    }
                }

                this.$store.dispatch('setRowTotalAdjustDetail',{total:total,index:table,key:index});
                if(total>0){
                    let ratio =0;
                    for(var i=0;i<adjustdetail.length;i++){
                        ratio =0;
                        if(index == 0){
                            ratio = (((adjustdetail[i].adjust*1)/total)*100);
                        }else if(index == 1){
                            ratio = (((adjustdetail[i].adjust1*1)/total)*100);
                        }else if(index == 2){
                            ratio = (((adjustdetail[i].adjust2*1)/total)*100);
                        }
                        // console.log("ratio : ", ratio);
                         this.$store.dispatch('setRatioDetail',{ratio_total:ratio,index:index,indexDetail:i,table:table,code:adjustdetail[i].code});
                    }
                }
                let ratio = 0;
                for(var i=0;i<adjustdetail.length;i++){
                    if(index == 0){
                        ratio += (adjustdetail[i].ratio*1);
                    }else if(index == 1){
                        ratio += (adjustdetail[i].ratio1*1);
                    }else if(index == 2){
                        ratio += (adjustdetail[i].ratio2*1);
                    }
                }
                this.$store.dispatch('setRowTotalRatioDetail',{total:ratio,index:table,key:index});
            },
            setAdjustMainAndRatioMainAndTotalMainAuto(){

                let total = 0;
                for(var i=0;i<this.rowAdjust.length;i++){
                    if(this.index == 0){
                        total += (this.rowAdjust[i].adjust*1);
                    }else if(this.index == 1){
                        total += (this.rowAdjust[i].adjust1*1);
                    }else if(this.index == 2){
                        total += (this.rowAdjust[i].adjust2*1);
                    }
                }
                // console.log("setAdjustMainAndRatioMainAndTotalMainAuto total : ",total);
                this.$store.dispatch('setRowTotalAdjust',{total:total,index:this.index});
                if(total>0){
                    let ratio =0;
                    for(var i=0;i<this.rowAdjust.length;i++){
                        ratio =0;
                        if(this.index == 0){
                            ratio = (((this.rowAdjust[i].adjust*1)/total)*100);
                        }else if(this.index == 1){
                            ratio = (((this.rowAdjust[i].adjust1*1)/total)*100);
                        }else if(this.index == 2){
                            ratio = (((this.rowAdjust[i].adjust2*1)/total)*100);
                        }
                        //  console.log("rowAdjust ratio : ",ratio);
                        this.$store.dispatch('setRatio',{ratio_total:ratio,index:this.index,indexDetail:i});
                    }
                }
                let ratio = 0;
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
                /* let ratio = 0;
                for(var i=0;i<this.rowAdjust.length;i++){
                    if(this.index == 0){
                        ratio += (this.rowAdjust[i].ratio*1);
                    }else if(this.index == 1){
                        ratio += (this.rowAdjust[i].ratio1*1);
                    }else if(this.index == 2){
                        ratio += (this.rowAdjust[i].ratio2*1);
                    }
                } */
                this.$store.dispatch('setRowTotalRatio',{total:ratio,index:this.index});
                this.$store.dispatch('calculateSummary');
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
            setAdjustDetailDiff(total_adjust,code,value_input,adjust_arr,type){
                let adjustChanged = 0;
                let card_index = 0;
                let indexDetail = -1;
                let _total_adjust = (type == 'total')? total_adjust:this.formatNumber(total_adjust,4,'int');
                let diff_val = parseFloat(value_input) - parseFloat(_total_adjust);
                // console.log("value_input :",value_input);
                //         console.log("total_adjust : ",parseFloat(_total_adjust));
                //         console.log("diff_val : ",diff_val);
                if(isNaN(diff_val)) diff_val = 0;
                if(diff_val != 0){
                    diff_val = parseFloat(value_input) - parseFloat(total_adjust);
                    if(diff_val > 0){
                        card_index = adjust_arr['index_min'];
                    }else{
                        card_index = adjust_arr['index_max'];
                    }
                    if(card_index != ""){
                        indexDetail = this.itemDetail[card_index].findIndex(item => item.code === code);
                        // if(this.itemDetail[card_index][indexDetail] == undefined) continue;
                        if(indexDetail != -1){
                            if(this.index == 0){
                                adjustChanged = (this.itemDetail[card_index][indexDetail].adjust*1) + diff_val;
                            }else if(this.index == 1){
                                adjustChanged = (this.itemDetail[card_index][indexDetail].adjust1*1) + diff_val;
                            }else if(this.index == 2){
                                adjustChanged = (this.itemDetail[card_index][indexDetail].adjust2*1) + diff_val;
                            }
                        }
                        if(isNaN(adjustChanged)) adjustChanged = 0;
                        if(indexDetail != -1) this.$store.dispatch('setAdjustDetail',{adjust:adjustChanged,index:this.index,indexDetail,table:card_index,code:code});
                        this.calculateAdjustSubTable(this.index,card_index);
                    }
                }

            },
            
        },
        data() {
            return {
                isInputActive: false,
                index_card_max:"",
                index_card_min:"",
                adjust_min:0,
                adjust_max:0,
            }
        },
    }
</script>