import { LightningElement,api, track } from 'lwc';

export default class SampleTableComponent extends LightningElement {

    callBacks = {};
    @track tableData = [];

    @api
    get tableContent() {
        return this.tableData;
    }
    set tableContent(value) {
        if(value){
            this.tableData = JSON.parse(JSON.stringify(value));
        }
    }

    sort(){
        this.tableData = this.callBacks['sort'](this.tableData);
    }

    
    @api registerCallback(key,callbackmethod){
        callBacks[key] = callbackmethod;
    }
}