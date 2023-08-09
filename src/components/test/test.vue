<template>
<div id="mainpageInformation">
    <div id="pageInformation">
        <md-spinner :md-size="150" :md-stroke="1" md-indeterminate v-show="(loadingProductAll)" style="position: fixed; z-index: 10; top: 23%; left: 45%;"></md-spinner>
        <md-layout>
            <div class="title">Test - EDI</div>
<!--            <div class="select-information" v-click-outside="mouseLeave">
                <md-input-container md-theme>
                    <div class="input-information" @click="showSelected()">
                        <md-input v-model="selectedInformation" readonly></md-input>
                        <md-icon class="pl-4">expand_more</md-icon>
                    </div>
                    <div class="options-information" :style="{'display': (vShowSelected) ? 'block' : 'none'}">
                        <ul>
                            <li v-for="(list, index) in listInformation" :key="index" @click="onSelectedInformation(list)">{{ list.name }}</li>
                        </ul>
                    </div>
                </md-input-container>
            </div>-->
        </md-layout>

        <md-layout>
            <div class="-title">
                <div class="md-layout-item">
                    <!--<md-field>-->
                    <div style="text-align: left">
                        <md-select v-model="corporateSelected" name="corporate" id="corporate"
                        style="width: 200px;display: inline-table">
                            <md-option v-for="items in corporate"
                                :value="items.code" :key="items.code">
                                {{items.code}}
                            </md-option>
                        </md-select>
                    <!--</md-field>-->
    <!--                <div class="select-information" v-click-outside="mouseLeave">
                        <md-input-container md-theme>
                            <div class="input-information" @click="showSelected()">
                                <md-input v-model="selectedInformation" readonly></md-input>
                                <md-icon class="pl-4">expand_more</md-icon>
                            </div>
                            <div class="options-information" :style="{'display': (vShowSelected) ? 'block' : 'none'}">
                                <ul>
                                    <li v-for="(list, index) in listInformation" :key="index" @click="onSelectedInformation(list)">{{ list.name }}</li>
                                </ul>
                            </div>
                        </md-input-container>
                    </div>-->
                    
                    <!--<div class="-info"  style="text-align: left">-->
                        <label class="text-reader">
                            <input type="file" ref="fileupload" @change="loadTextFromFile">
                        </label>
                        
                    </div>
                    <div style='text-align: left' >
                        {{fileupload.name}}
                        <md-button class="md-raised md-primary" style='margin-left: 0'
                            title="upload" @click="uploadFile">
                            Upload
                        </md-button>
<!--                        <md-button class="md-raised md-primary" style='margin-left: 0'
                            title="save" @click="insertMap">-->
                        <md-button class="md-raised md-primary" style='margin-left: 0'
                            title="save" @click="transfer">
                            Transfer
                        </md-button>
                    </div>
                    <br />
                    <br />
                    <div style="text-align: left">
                        <span class="numpage" @click="selectPage(index)" 
                            @mouseover="hover = true"
                            @mouseleave="hover = false"
                            :class="[index == dataPageSelect ? 'active': '' ]"
                            v-for="(num, index) in dataAll" style="margin: 0 3px;padding: 3px 3px">
                            {{index + 1}}
                        </span>
                    </div>
                    <div class="-info test-table">
                        <h2 style="text-align: left">HEAD</h2>
                        <table>
                            <tr>
                                <th style="background-color: lightblue">Title</th>
                                <th style="background-color: lightgreen">filed</th>
                                <th>value</th>
                                <th>type</th>
                            </tr>
                            <tr v-for="h_row in mapping_head">
                                <td>{{h_row.title}}</td>
                                <td>{{h_row.label}}</td>
                                <td>{{h_row.value}}</td>
                                <td>{{h_row.type}}</td>
                            </tr>
                        </table>
                    </div>
                    <hr/>
                    <div class="-info test-table">
                        <h2 style="text-align: left">Details</h2>
                        <table>
                            <tr style="background-color: lightblue">
                                <th>No.</th>
                                <th v-for="head in mapping_detail[0]" :title="head.type">{{head.title}}</th>
                            </tr>
                            <tr style="background-color: lightgreen">
                                <th></th>
                                <th v-for="head in mapping_detail[0]" :title="head.type">{{head.label}}</th>
                            </tr>
                            <tr v-for="(item_row, index) in mapping_detail">
                                <td>{{index+1}}</td>
                                <td v-for="d_row in item_row">{{d_row.value}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </md-layout>
    </div>

    <!--<dialog-product-all v-model="dataProductAll" :showDialog="showDialogProudctAll" @addProduct="onAddProduct" @clickClose="onCloseDialog"></dialog-product-all>-->

<!--    <dialog-pricing :showDialog="showDialogPricing" v-model="dataSearch" :descriptionTH="descriptionTH" @confirm="confirmCloseDialog"></dialog-pricing>
    <dialog-promotion :showDialog="showDialogPromotion" v-model="dataSearch" :descriptionTH="descriptionTH" @confirm="confirmCloseDialog"></dialog-promotion>
    <dialog-packing :showDialog="showDialogPacking" v-model="dataSearch" :descriptionTH="descriptionTH" @confirm="confirmCloseDialog"></dialog-packing>
    <dialog-volume-pricing :showDialog="showDialogVolumePricing" v-model="dataSearch" :descriptionTH="descriptionTH" @confirm="confirmCloseDialog"></dialog-volume-pricing>
    <dialog-warehouse :showDialog="showDialogWarehouse" v-model="dataSearch" :descriptionTH="descriptionTH" @confirm="confirmCloseDialog"></dialog-warehouse>-->

    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
        <span>{{ snackbarContent }}</span>
        <md-button class="md-accent" @click="$refs.snackbar.close()">OK</md-button>
    </md-snackbar>
</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import ClickOutside from "vue-click-outside";
//import PizZip from 'pizzip';
//import Docxtemplater from 'docxtemplater';
//import service from '@/services/test/test'
import EDIReadfileService from "@/services/test/test";
import jschardet from "jschardet";
export default {
  name: 'test-service',
  components: {
    /* เรียกใช้ component ต่างๆ */
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
  },
  computed: {
    /*  เขียนฟังชั่นคำนวนใน template ในขณะ render view โหลด vuex*/

//    ...mapGetters([])
  },
  props: [],
  data () {
    /* ประกาศตัวแปรเพื่อใช้ใน template */
    return {
        hover: false,
        vShowAutoSearch: false,
            vShowSelected: false,
            listAutoSearch: [],
            listInformation: [{
                value: 0,
                name: "Product Information"
            }],
            selectedInformation: "Product Information",
//            dataSearch: "",
//            descriptionTH: "",
//            descriptionEN: "",
//            barcode: "",
//            type: "",
//            group: "",
//            productcode: "",
//            subgroup: "",
//            cg: "",
//            loadingPage: false,
            loadingProductAll: false,
//            showDialogProudctAll: false,
//            dataProductAll: {},
//            oldData: "",
            snackbarContent: "",
            vertical: "bottom",
            horizontal: "center",
            duration: 4000,
            corporateSelected:'LOTUS',
            corporate:[],
            mapping_head:[],
            mapping_detail:[],
            fileupload:'',
            file_id: '',
//            showDialogPricing: false,
//            showDialogPacking: false,
//            showDialogPromotion: false,
//            showDialogVolumePricing: false,
//            showDialogWarehouse: false,
//            listAutoBarcodeSearch: [],
//            vShowAutoBarcodeSearch: false,
//            loadingPage_barcode: false,
//            oldBarcode:"",
            dataAll: [],
            dataPageSelect: 0,
    }
  },
  methods: {
    /* สร้างฟังชั่นเรียกใช้ใน template รวมถึงฟังชั่น vuex */
    connectAPI () {
      service
        .testService()
        .then(response => {
          console.log('test service')
        })
        .catch()
    },
    getCorporate(){
            this.corporate = [
                {code:'LOTUS'},
                {code:'B2SN'},
                {code:'TMALL'},
                {code:'SEVEN'},
                {code:'MAKRO'},
                {code:'BIGC'},
                {code:'ODPN'},
                {code:'MEGAHOME'},
                {code:'OFM'},
                {code:'THAIWAT'},
                {code:'ROBINSON'},
                {code:'Thai Watts'}
            ];
        },
        selectPage(select){
//            this.dataAll = response
            this.mapping_head = this.dataAll[select].head;
            this.mapping_detail = this.dataAll[select].details;
            this.dataPageSelect = select;
        },
        readTextFile(text, filename){
            const data = {
                file_name: filename,
                file_data: text, 
                file_type: 'edi',
                corporate: this.corporateSelected
            } 
            console.log('readText');
            EDIReadfileService.mappingData(data).then(response => {
                if(response.data.head !== undefined){
                    this.mapping_head = response.data.head;
                }
                if(response.data.details !== undefined){
                    this.mapping_detail = response.data.details;
                }
//                console.info('response', response);
                if(response.status === 'fail' && response.message_map){
                    this.snackbarContent = response.message_map;
                    this.$refs.snackbar.open();
                }else if(response.data.length <= 0){
                    this.snackbarContent = 'File Format Error!';
                    this.$refs.snackbar.open();
                }
                
                /* have head more then 1 */
                if(response.data.length > 0){
                    this.dataAll = response.data;
                    this.mapping_head = response.data[0].head;
                    this.mapping_detail = response.data[0].details;
                }
            });
        },
        readXMLFile(xml, filename, isTransfer = false){
            console.log('readXML');
            let file_ext =  filename.split('.').pop();
            const data = {
                file_name: filename,
                file_data: xml, 
                file_type: file_ext,
                corporate: this.corporateSelected
            } 
            if(isTransfer){
                return data;
            }
            EDIReadfileService.mappingData(data).then(response => {
                if(response.data.head !== undefined){
                    this.mapping_head = response.data.head;
                }
                if(response.data.details !== undefined){
                    this.mapping_detail = response.data.details;
                }
                if(response.status === 'fail' && response.message_map){
                    this.snackbarContent = response.message_map;
                    this.$refs.snackbar.open();
                }else if(response.data.length <= 0){
                    this.snackbarContent = 'File Format Error!';
                    this.$refs.snackbar.open();
                }
                
                /* have head more then 1 */
                if(response.data.length > 0){
                    this.dataAll = response.data;
                    this.mapping_head = response.data[0].head;
                    this.mapping_detail = response.data[0].details;
                }
            });
        },
//        readPDFFile(pdf){
//            console.log('read...');
////        console.info('pdf', pdf);
////           const pdfjsLib = require('pdfjs-dist');
////            const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.min');
////            const pdfjsWorkerBlob = new Blob([pdfjsWorker]);
////            const pdfjsWorkerBlobURL = URL.createObjectURL(pdfjsWorkerBlob);
//
////            PDFJS.workerSrc = pdfjsWorkerBlobURL;
//
//            const loadingTask = PDFJS.getDocument({data: pdf});
//            loadingTask.onPassword = (callback, reason) => {
//                console.log('onPassword');
//            };
//
//            loadingTask.onProgress = (progressData) => {
//                console.log('onProgress');
//            };
//
////            loadingTask.then((pdfDocument: PDFDocumentProxy) => {
////                console.log('then...');
////            });  
//                loadingTask.promise.then((pdfDocument) => {
//                    let pagesPromises = [];
//                    console.log('then');
//                    console.info('pdfDocument', pdfDocument);
////                    console.info('count page',pdfDocument.pdfInfo.numPages);
//                    var pageNumber = 1;
//                    console.log(pdfDocument.numPages);
//                    for(var i = 0; i < pdfDocument.numPages; i++){
////                        (function (pageNumber) {
//                            // Store the promise of getPageText that returns the text of a page
////                            pagesPromises.push(getPageText(pageNumber, pdfDocument));
//                        pagesPromises.push(this.getPageText(i+1, pdfDocument))
//                            
////                        })(i + 1);
//                    }
//                    Promise.all(pagesPromises).then(function (pagesText) {
//                        console.log('Start...');
//                        // Display text of all the pages in the console
//                        console.log('pages',JSON.parse(JSON.stringify(pagesText)));
//                        EDIReadfileService.mappingData({file_data:pagesText,file_type:'pdf'})
//                            .then(response => {
//                                console.log('rs', response);
////                                this.listAutoSearch = response
////                                this.vShowAutoSearch = true;
////                                this.loadingPage = false;
//                            }
//                        );
//                    });
//                    console.log('end');
////                    console.info('pages', pages);
////                  this.load(pdfDocument); 
//                }, (exception) => { 
//                    console.log('ex',exception && exception.message );
////                  if (loadingTask !== this.pdfLoadingTask) { 
////                    return undefined; // Ignore errors for previously opened PDF files. 
////                  } 
////
////                  let message = exception && exception.message; 
////                  let loadingErrorMessage; 
////                  if (exception instanceof InvalidPDFException) { 
////                    // change error message also for other builds 
////                    loadingErrorMessage = this.l10n.get('invalid_file_error', null, 
////                                                        'Invalid or corrupted PDF file.'); 
////                  } else if (exception instanceof MissingPDFException) { 
////                    // special message for missing PDF's 
////                    loadingErrorMessage = this.l10n.get('missing_file_error', null, 
////                                                        'Missing PDF file.'); 
////                  } else if (exception instanceof UnexpectedResponseException) { 
////                    loadingErrorMessage = this.l10n.get('unexpected_response_error', null, 
////                                                        'Unexpected server response.'); 
////                  } else { 
////                    loadingErrorMessage = this.l10n.get('loading_error', null, 
////                      'An error occurred while loading the PDF.'); 
////                  } 
////
////                  return loadingErrorMessage.then((msg) => { 
////                    this.error(msg, { message, }); 
////                    throw new Error(msg); 
////                  }); 
//                }); 
//
////        console.info('pdf', pdf);
////            PDFJS.getDocument({data: pdf}).then(function(pdf){
////                console.log('pdf>');
////            var pdfPages = pdf.pdfInfo.numPages;
////            console.log(pdfPages); }).catch((err)=>{console.info('err', err);}); 
//        },
        fileSelected:function($event){
            this.fileupload = $event.target.files[0]
        },
        insertMap(){
            let data = {
                data: {
                    file_id: this.file_id,
                    head: this.mapping_head,
                    detail: this.mapping_detail
                }
            };
            
            EDIReadfileService.mapingInsert(data).then(response => {
                if(response == true){
                    this.snackbarContent = "Insert Success";
                    this.$refs.snackbar.open();
                    return;
                }else if(response !== undefined && response.msg !== undefined){
                    this.snackbarContent = response.msg;
                    this.$refs.snackbar.open();
                    return;
                }
            });
        },
        transfer(){
            let data = {
                data: {
                    file_id: this.file_id,
                }
            };
            
            EDIReadfileService.transfer(data).then(response => {
                if(response.data == true){
                    this.snackbarContent = "Insert Success";
                    this.$refs.snackbar.open();
                    return;
                }else if(response.data !== undefined && response.data.msg !== undefined){
                    this.snackbarContent = response.data.msg;
                    this.$refs.snackbar.open();
                    return;
                }else if(response.data.status === 'fail' && response.data.message_map){
                    this.snackbarContent = response.data.message_map;
                    this.$refs.snackbar.open();
                    return;
                }
            });
        },
        uploadFile(){
            this.file_id = '';
//            let fileTxt = this.$refs.fileupload.files;
//            console.info('fileTxt', fileTxt);
//            const file = fileTxt[0];
            let formData = new FormData();
			formData.append('upload_file', this.fileupload)
			formData.append('corporate', this.corporateSelected)
//            let formData = new FormData();
//            formData.append('file', fileTxt);
            EDIReadfileService.upload(formData).then(response => {
                if(response.data == true){
                    this.file_id = response.file_id;
                    this.snackbarContent = "Upload Success";
                    this.$refs.snackbar.open();
                    return;
                }else if(response.data !== undefined && response.data.msg !== undefined){
                    if(response.file_id !== undefined){
                        this.file_id = response.file_id;
                    }
                    this.snackbarContent = response.data.msg;
                    this.$refs.snackbar.open();
                    return;
                }
            });
        },
        loadTextFromFile(ev, roundSecond = false, enc = '') { // enc: encoding
            this.file_id = '';
            this.dataAll = [];
            this.mapping_head = [];
            this.mapping_detail = [];
            this.dataPageSelect = 0;
            let fileTxt = this.$refs.fileupload.files;
            const file = fileTxt[0];
            this.fileupload = file
            const reader = new FileReader();
//            reader.onload = e => this.$emit("load", e.target.result);
//            reader.readAsText(file);
//            reader.readAsDataURL(file);
            
//            reader.onload = async () => {
//                console.log('onload...');
//                console.info('reader.result', reader.result);
//                let arr = reader.result.split(",");
//                let pdf_data = new Uint8Array(reader.result)
//                console.info('pdf_data', pdf_data);
////                let bin = atob(arr[1])
////                var pdf = new PDFJS.getDocument(arr[1]);
//    PDFJS.getDocument({data: pdf_data}).then(function(pdf) {
//    console.log('>>>>>>>');
//          console.log(pdf);
//        }, err => console.log('err',err));
//        
//            }
            
//            document.getElementById('thisfile').addEventListener('change', function(){
//var file = this.files[0]; if (!file){ return; }
//            PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;
//   pdfjsLib.PDFJS.workerSrc = `${process.env.APP_ROOT}/node_modules/pdfjs-dist/build/pdf.worker.js`;
   //in prod, get it from the build directory pdfjs-dist/build/pdf.worker.entry
//   PDFJS.workerSrc = `pdfjs-dist/build/pdf.worker.js`;

            var fileReader = new FileReader();
            let self = this;
//fileReader.onload = function(e){ self.readPDFFile(new Uint8Array(e.target.result)); };


            fileReader.onload = function(e){
//                console.info('e',e.target.result);
                switch (file.type) {
                    case 'application/pdf':
                        console.log('type pdf');
//                        self.readPDFFile(new Uint8Array(e.target.result)); 
                        break;
                    case 'text/xml':
                        console.log('type xml');
                        self.readXMLFile(e.target.result, file.name); 
                        break;

                    default:
                        let file_ext =  file.name.split('.').pop();
                        if(file_ext === 'docx'){
//                            var zip = new PizZip(e.target.result);
//                            var buf = zip.generate({type: 'base64'});
//    //                        var buf = zip.generate({type: 'nodebuffer'});
//    //                        var string = new TextDecoder("utf-8").decode(buf);
//    //                        console.info('string', string);
//    //                        string = JSON.stringify(string)
//    //                        const doc = new Docxtemplater(zip);
//    //                        console.info('doc', doc);
//    //                        try {
//    //                            doc.render();
//    //                        } catch (e) {
//    //                            console.log('err',e);
//    //                        }
//    //                        var buf = doc.getZip()
//    //                            .generate({type: 'nodebuffer'});
//    //                        console.log('bur',buf);
//    //                        var string = new TextDecoder("utf-8").decode(buf);
//    //                        console.log('string', string);
//    ////                        let test = doc.loadZip(doc);
//    ////                        console.info('test', test);
//                            self.readXMLFile(buf, file.name); 
                        }else{
//                            var arr = e.target.result.split(',');
//                            console.info('arr', arr);
//                            var base64 = arr[arr.length-1];
//                            console.log('atob(encodedString);', e.target.result.toString());
                            
                            if( ! roundSecond){
                                /* recursive */
                                let encoding = jschardet.detect(e.target.result).encoding;
                                self.loadTextFromFile(ev, true, encoding);
                            }else{
                                self.readTextFile(e.target.result, file.name); 
                            }
                        }
                        
                        break;
                }
            };
//fileReader.onload = function(e){ self.readPDFFile(e.target.result); };

            let clearUploadFile = true;
            switch (file.type) {
                case 'application/pdf':
                    fileReader.readAsArrayBuffer(file); 
                    break;
                case 'text/xml': 
                    fileReader.readAsText(file);  
                    break;
                    
                default:
                    let file_ext =  file.name.split('.').pop();
                    if(file_ext === 'docx'){
                        console.log('docx');
                        fileReader.readAsBinaryString(file); 
                    }else{
                        if( ! roundSecond)
                        {
                            /* round one read is binary check encoding for round two */
                            clearUploadFile = false;
                            fileReader.readAsBinaryString(file);
                        }else{
                            /* round two for read text with correct encoded and next step */
                            fileReader.readAsText(file, enc);
                        }
                        //fileReader.readAsText(file, 'TIS-620'); /* 'ISO-8859-11' */
                    }
                    break;
            }
            if(clearUploadFile){
                this.$refs.fileupload.value='';
            }
//});
        },
//        openDialog(page) {
//            if (this.dataSearch == "") {
//                this.snackbarContent = "Please Select Item Code";
//                this.$refs.snackbar.open();
//                return;
//            }
//
//            if (page == "pricing") {
//                this.showDialogPricing = true;
//            } else if (page == "promotion") {
//                this.showDialogPromotion = true;
//            } else if(page == "packing") {
//                this.showDialogPacking = true;
//            } else if(page == "volumepricing") {
//                this.showDialogVolumePricing = true;
//            } else if(page == "warehouse") {
//                this.showDialogWarehouse = true;
//            }
//
//        },
//        confirmCloseDialog() {
//            this.showDialogPricing = false;
//            this.showDialogPromotion = false;
//            this.showDialogPacking = false;
//            this.showDialogVolumePricing = false;
//            this.showDialogWarehouse = false;
//        },
//        onAddProduct(data) {
//            this.dataSearch = data.code;
//            this.descriptionTH = (data.title_th) ? data.title_th : "";
//            this.descriptionEN = (data.title) ? data.title : "";
//            this.barcode = (data.barcode) ? data.barcode : "";
//            this.type = ((data.productype_code) ? data.productype_code : "") + " " + ((data.productype_title) ? data.productype_title : "");
//            this.group = ((data.productgroup_code) ? data.productgroup_code : "") + " " + ((data.productgroup_title) ? data.productgroup_title : "");
//            this.productcode = (data.refcode) ? data.refcode : "";
//            this.subgroup = ((data.productsubgroup_code) ? data.productsubgroup_code : "") + " " + ((data.productsubgroup_title) ? data.productsubgroup_title : "");
//            this.cg = ((data.productcg_code) ? data.productcg_code : "") + " " + ((data.productcg_title) ? data.productcg_title : "");
//            this.oldData = data.code;
//            this.oldBarcode = data.barcode;
//            this.showDialogProudctAll = false;
//        },
//        onCloseDialog(boolean) {
//            this.showDialogProudctAll = boolean;
//        },
//        searchAllProduct() {
//            let self = this;
//            this.loadingProductAll = true;
//            promotionInformationService.GetProductAll()
//                .then(response => {
//                    response.group.unshift({
//                        code: "",
//                        title: "All Product Group"
//                    });
//                    response.subgroup.unshift({
//                        code: "",
//                        title: "All Sub Group"
//                    });
//                    response.cg.unshift({
//                        code: "",
//                        title: "All CG"
//                    });
//
//                    response.group.sort((a, b) => (a.code > b.code) ? 1 : -1);
//                    response.subgroup.sort((a, b) => (a.code > b.code) ? 1 : -1);
//                    response.cg.sort((a, b) => (a.code > b.code) ? 1 : -1);
//
//                    self.dataProductAll = response;
//                    self.showDialogProudctAll = true;
//                    this.loadingProductAll = false;
//                });
//        },
//        autoSearch(evt) {
//            evt = evt ? evt : window.event;
//            var charCode = evt.which ? evt.which : evt.keyCode;
//            if (charCode == 13) {
//                this.loadingPage = true;
//                // let value = event.target.value;
//                let value = {
//                    keyword:  _.trim(this.dataSearch)
//                };
//                promotionInformationService.GetAutoSearchItemCode(value)
//                    .then(response => {
//                        this.listAutoSearch = response
//                        this.vShowAutoSearch = true;
//                        this.loadingPage = false;
//                    });
//
//                if (value == "") {
//                    this.descriptionTH = "";
//                    this.descriptionEN = "";
//                    this.barcode = "";
//                    this.type = "";
//                    this.group = "";
//                    this.productcode = "";
//                    this.subgroup = "";
//                    this.cg = "";
//                    this.oldData = "";
//                    this.oldBarcode = "";
//                }
//            }
//        },
//        autoSearchBarcode(evt) {
//            evt = evt ? evt : window.event;
//            var charCode = evt.which ? evt.which : evt.keyCode;
//            if (charCode == 13) {
//                this.loadingPage_barcode = true;
//                // let value = event.target.value;
//                let value = {
//                    keyword: this.barcode
//                };
//                promotionInformationService.GetAutoSearchBarcodeode(value)
//                    .then(response => {
//                        this.listAutoBarcodeSearch = response
//                        this.vShowAutoBarcodeSearch = true;
//                        this.loadingPage_barcode = false;
//                    });
//
//                if (value == "") {
//                    this.dataSearch = "";
//                    this.descriptionTH = "";
//                    this.descriptionEN = "";
//                    // this.barcode = "";
//                    this.type = "";
//                    this.group = "";
//                    this.productcode = "";
//                    this.subgroup = "";
//                    this.cg = "";
//                    this.oldData = "";
//                    this.oldBarcode = "";
//                }
//            }
//        },
//        searchBarcode() {
//            // let self = this;
//            this.loadingPage_barcode = true;
//            let value = {
//                    keyword: this.barcode
//                };
//                promotionInformationService.GetAutoSearchBarcodeode(value)
//                    .then(response => {
//                        this.listAutoBarcodeSearch = response
//                        this.vShowAutoBarcodeSearch = true;
//                        this.loadingPage_barcode = false;
//                    });
//
//                if (value == "") {
//                    this.dataSearch = "";
//                    this.descriptionTH = "";
//                    this.descriptionEN = "";
//                    // this.barcode = "";
//                    this.type = "";
//                    this.group = "";
//                    this.productcode = "";
//                    this.subgroup = "";
//                    this.cg = "";
//                    this.oldData = "";
//                    this.oldBarcode = "";
//                }
//            // promotionInformationService.GetProductAll()
//            //     .then(response => {
//            //         response.group.unshift({
//            //             code: "",
//            //             title: "All Product Group"
//            //         });
//            //         response.subgroup.unshift({
//            //             code: "",
//            //             title: "All Sub Group"
//            //         });
//            //         response.cg.unshift({
//            //             code: "",
//            //             title: "All CG"
//            //         });
//
//            //         response.group.sort((a, b) => (a.code > b.code) ? 1 : -1);
//            //         response.subgroup.sort((a, b) => (a.code > b.code) ? 1 : -1);
//            //         response.cg.sort((a, b) => (a.code > b.code) ? 1 : -1);
//
//            //         self.dataProductAll = response;
//            //         self.showDialogProudctAll = true;
//            //         this.loadingProductAll = false;
//            //     });
//        },
        mouseLeaveAutoSearch() {
            this.vShowAutoSearch = false;
            if(this.dataSearch != this.oldData) {
                this.dataSearch = this.oldData;
            }
        },
        mouseLeaveAutoBarcodeSearch() {
            this.vShowAutoBarcodeSearch = false;
            if(this.barcode != this.oldBarcode) {
                this.barcode = this.oldBarcode;
            }
        },
//        onSelectedAutoSearch(data) {
//            this.dataSearch = data.code;
//            this.descriptionTH = (data.title_th) ? data.title_th : "";
//            this.descriptionEN = (data.title) ? data.title : "";
//            this.barcode = (data.barcode) ? data.barcode : "";
//            this.type = ((data.productype_code) ? data.productype_code : "") + " " + ((data.productype_title) ? data.productype_title : "");
//            this.group = ((data.productgroup_code) ? data.productgroup_code : "") + " " + ((data.productgroup_title) ? data.productgroup_title : "");
//            this.productcode = (data.refcode) ? data.refcode : "";
//            this.subgroup = ((data.productsubgroup_code) ? data.productsubgroup_code : "") + " " + ((data.productsubgroup_title) ? data.productsubgroup_title : "");
//            this.cg = ((data.productcg_code) ? data.productcg_code : "") + " " + ((data.productcg_title) ? data.productcg_title : "");
//            this.oldData = data.code;
//            this.oldBarcode = data.barcode;
//            this.vShowAutoSearch = false;
//            this.vShowAutoBarcodeSearch = false;
//
//        },
        mouseLeave() {
            this.vShowSelected = false;
        },
        onSelectedInformation(list) {
            let index = this.listInformation.findIndex(item => item.value === list.value);
            this.selectedInformation = this.listInformation[index].name;
            this.vShowSelected = false;
        },
        showSelected() {
            this.vShowSelected = (this.vShowSelected) ? false : true;
        }
  },
  beforeCreate () {
    /* */
  },
  created () {
    if (Vue.localStorage.get("login") == null) {
            this.login = false;
            this.$router.replace("/");
        } else {
            this.login = true;
            this.$store.dispatch("setPathMenuService", "orders");
        }
        this.getCorporate();
  },
  beforeMount () {
    /* */
  },
  mounted () {
    /* สร้างฟังชั่นเรียกใช้ใน template */
  },
  beforeUpdate () {
    /* */
  },
  updated () {
    /* */
  },
  activated () {
    /* */
  },
  deactivated () {
    ClickOutside
  },
  // beforeDestroy() { /* */ },
  destroyed () {
    /* */
  },
  watch: {
    /* ตรวจจับการเปลี่ยนแปลง */

    $route () {}
  },
  directives: {
    /* สร้าง tool เพื่อเรียกใช้ */
  }
}
</script>
<style lang="scss">
#mainpageInformation {
    overflow-y: scroll;
    height: calc(100vh - 110px);
    .numpage:hover {
        background: lightgreen;
        cursor: pointer;
    };
    .numpage.active {
        background: lightblue;
    };
    #pageInformation {
        margin: 30px 55px 30px 60px;

        .title {
            width: 25%;
            text-align: left;
            color: #797979;
            font-family: Lato;
            font-size: 18px;
            padding-top: 8px;
            
        }
        .test-table{
                table, th, td {
                    border: 1px solid black;
                }
        }

        .select-information {
            width: 20%;

            .md-input-container {
                margin: 0px;
                padding: 0px;
                min-height: unset;
            }

            .input-information {
                display: flex;
                width: 100%;

                input {
                    cursor: pointer;
                    padding-left: 10px;
                    font-size: 16px;
                    color: rgba(0, 0, 0, 0.87);
                }

                .md-icon {
                    cursor: pointer;
                    padding-left: 3px;
                }
            }

            .options-information {
                position: absolute;
                width: 100%;
                margin-top: 5px;
                z-index: 2;
                box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);

                ul {
                    display: inline;
                    margin: 0;
                    padding: 0;

                    li {
                        display: block;
                        padding: 8px 10px;
                        margin: 0;
                        text-align: left;
                        font-family: Lato;
                        font-size: 16px;
                        color: rgba(0, 0, 0, 0.87);
                        background-color: white;
                    }

                    li:hover {
                        // background: #c5c5c5;
                        background: #e0e0e0;
                        cursor: pointer;
                    }
                }
            }
        }


        .card-info {
            width: 100%;
            margin-top: 40px;
            padding: 30px;
            

            .-title {
                text-align: left;
                font-family: Roboto;
                font-size: 12px;
                color: #727272;
                margin: 0px 10px;
            }
            


            .-info {
                background-color: #F8F8F8;
                margin: 10px 10px;
                padding: 25px;

                .md-input-container input::-webkit-input-placeholder {
                    font-family: Roboto;
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.54);
                }

                .display-info {
                    padding: 10px 40px;

                    .auto-search {
                        display: flex;
                        width: 100%;

                        .md-icon {
                            cursor: pointer;
                        }
                    }

                    .value-label {
                        top: 0;
                        opacity: 1;
                        font-family: Roboto;
                        font-size: 11px;
                        color: #727272;
                    }

                    input {
                        font-family: kanit;
                        font-size: 13px;
                        font-weight: 300;
                        color: #414141;
                    }

                    .md-icon {
                        margin-left: 3px !important;
                    }

                    .md-input-container {
                        margin: 0px 0px;

                        &.md-input-focused label {
                            color: #FF9800;
                        }

                        &.-readonly {
                            label {
                                color: #727272 !important;
                            }

                            &.md-input-focused:after {
                                height: 1px;
                                position: absolute;
                                right: 0;
                                bottom: 0;
                                left: 0;
                                background-color: rgba(0, 0, 0, 0.12);
                                transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                                content: " ";
                            }
                        }
                    }

                    .datas-auto-search {
                        position: absolute;
                        width: 100%;
                        margin-top: 32px;
                        z-index: 2;
                        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
                        overflow-y: scroll;
                        max-height: 180px;

                        ul {
                            display: inline;
                            margin: 0;
                            padding: 0;

                            li {
                                display: block;
                                padding: 8px 10px;
                                margin: 0;
                                text-align: left;
                                font-family: Lato;
                                font-size: 14px;
                                color: rgba(0, 0, 0, 0.87);
                                background-color: white;

                                &.nowrap {
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }

                                &.initial {
                                    white-space: initial;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }
                            }

                            li:hover {
                                background: #efefef;
                                cursor: pointer;
                            }
                        }

                        &::-webkit-scrollbar {
                            height: 7px;
                            width: 8px;
                            background: #f7f7f7;
                        }

                        &::-webkit-scrollbar-thumb {
                            background-color: rgba(0, 0, 0, 0.11);
                            border-radius: 5px;
                        }
                    }
                }
            }

            .display-dialog {
                display: flex;
                justify-content: center;

                >div {
                    margin: 10px 30px;

                    .md-button {
                        width: 200px;
                        height: 80px;
                        border-radius: 4px;
                        padding: 0px;

                        &.-btn-gray {
                            background-color: #A8A8A8;
                        }

                        &.-btn-orange:hover {
                            background-color: #FD7F00;
                        }

                        label {
                            font-family: Roboto;
                            font-size: 18px;
                            font-weight: bold;
                            color: #FFFFFF;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

    &::-webkit-scrollbar {
        height: 7px;
        width: 8px;
        background: #f7f7f7;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.11);
        border-radius: 5px;
    }
}
</style>
