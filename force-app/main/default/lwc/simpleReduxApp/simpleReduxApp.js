import { LightningElement } from 'lwc';

import {reducer, reducer2} from './simpleReducer.js';   //implement Reducers in a separate js file or as separate module

export default class SimpleReduxApp extends LightningElement {

    constructor(){
        super();

        //this.reducer = reducer;   use this when creating store with single reducer; state will have no namespaces.


        /*
            when creating store with multiple reducers, use below format,
            the state will be formed with namespaces
            {
                contactstate : {
                    section of the state which is dealt by reducer1
                },
                fakestate : {
                    section of the state which is dealt by reducer2
                }
            }
            don't forget to set combine-reducers as true when creating the store.

        */
        this.reducer = {                
            contactstate : reducer,
            fakestate : reducer2
        };
    }

}
