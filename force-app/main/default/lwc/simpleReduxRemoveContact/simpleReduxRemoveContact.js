import { api } from 'lwc';
import { DEFAULT_STORE, LightningReduxElement, enqueueDispatch } from 'c/reduxModule';
import { removeContact } from 'c/simpleReduxAppActions';

export default class SimpleReduxRemoveContact extends LightningReduxElement {

    @api contactId;

    constructor(){

        /* this example is to connect the compoent which does not take any input from state 
            but information is passed using @api and the component mutates the state using 
            the passed info and invoking the dispatch
        */
        
        super(null,[], (state, component) => {
            if (state && component && component.mapStateToProps) {
                component.mapStateToProps.forEach((prop) => {
                component[prop] = state[prop];
                });
            }
        });

    }
    removeTodo(){
        enqueueDispatch(DEFAULT_STORE, removeContact(this.contactId));
    }
}