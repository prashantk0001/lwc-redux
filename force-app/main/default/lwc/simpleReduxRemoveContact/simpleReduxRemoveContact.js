import { api } from 'lwc';
import { DEFAULT_STORE, LightningReduxElement, enqueueDispatch } from 'c/reduxModule';
import { removeContact } from 'c/simpleReduxAppActions';
export default class SimpleReduxRemoveContact extends LightningReduxElement {

    @api contactId;
    constructor(){
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