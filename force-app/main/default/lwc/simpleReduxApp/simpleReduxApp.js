import { LightningElement } from 'lwc';
import {reducer, reducer2} from './simpleReducer.js';

export default class SimpleReduxApp extends LightningElement {

    constructor(){
        super();
        this.reducer = {     //reducer; //[reducer,reducer2];
            contactstate : reducer,
            fakestate : reducer2
        };
    }

}

export {reducer};