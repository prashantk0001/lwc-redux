import { track } from 'lwc';
import { DEFAULT_STORE, LightningReduxElement, enqueueDispatch } from 'c/reduxModule';
import { loadContacts, loadContactsAsyncAction } from 'c/simpleReduxAppActions';

export default class SimpleReduxShowContact extends LightningReduxElement {
    
    @track contacts;
    
    constructor(){
        let mapStateToProps = ['contacts'];
        super(null, mapStateToProps, (state, component) => {
            if (state && component && component.mapStateToProps) {
                /*component.mapStateToProps.forEach((prop) => {
                component[prop] = state[prop];
                });*/
                component.mapStateToProps.forEach((prop) => {
                    component[prop] = state.contactstate[prop];
                });
            }
        });

        enqueueDispatch(DEFAULT_STORE, loadContacts([{
            Name : 'Prashant',
            Id : '123'
        },
        {
            Name : 'Yash',
            Id : '234'
        }])).then(()=>{
            enqueueDispatch(DEFAULT_STORE, loadContactsAsyncAction());
        });

    }

    remove(event){
        this.contacts = this.contacts.filter((storeVal) => {
            return storeVal.Id !== event.target.dataset.contactId;
        });

        console.log(this.contacts);
    }
    disconnectedCallback(){
        this.unsubscribe();
    }
}