/*
    Example implementation of LightningReduxElement to create a redux element:
        Any other import that works with LightningElement will work as is.
        Extend your controller class with LightningReduxElement exported by reduxModule,
        this will connect your store with the component and will enable you to update component properties
            whenever the state is updated.
        it is mandatory to implement a constructor and call super();
          super lists all the storenames which have been subscribed by the component in "subscribedStores" component property
            access it using this.subscribedStores
          super requires 3 params:
            arg0: storeName (string)  - Name of the store to connect your component with.
            arg1: mapStateToProps (Array/Object)  - required and crucial, mapping of state properties and component properties. 
            arg2: connector (function)  - required and crucial, function that makes use of mapStateToProps and
                    assigns state prop values to component props.
                    connector methods needs two params:
                        state : readonly state
                        component : is reference to your current component.

        As soon as the component is connected to the store, you can dispatch the actions.
        Component should only interact with the view layer, data layer should be managed using Redux state, reducers and actions.
*/



import { track } from 'lwc';
/* 
    DEFAULT_STORE is the name of the store if you don't specify a name during store creation
    LightningReduxElement can be exported from reduxModule
    enqueueDispatch() is used to invoke actions.
    invoke unsubscribeAllStores when component is removed from DOM.
*/
import { DEFAULT_STORE, LightningReduxElement, enqueueDispatch, unsubscribeAllStores } from 'c/reduxModule';

/*
    Import the action that needs to be invoked by the component.
*/
import { loadContacts, loadContactsAsyncAction } from 'c/simpleReduxAppActions';

export default class SimpleReduxShowContact extends LightningReduxElement {
    
    //component property, @track so it can be reactive and updated as soon as an action mutates the state.
    @track contacts;                    
    
    constructor(){

        let mapStateToProps = ['contacts'];         //if specified as an array, component propName should typicall match with state propName
        /*
            super invocation, 
            1st param : if passed null, reduxModule will replace with DEFAULT_STORE
            2nd param : passed mapStateToProps as specified above.
            3rd param : implementation of connector method to let you define how your component interacts with state.
        */
        super(null, mapStateToProps, (state, component) => {
            if (state && component && component.mapStateToProps) {

                component.mapStateToProps.forEach((prop) => {
                    component[prop] = state.contactstate[prop];         //contactstate is the namespace created for reducer1
                });

            }
        });


        /*
            enqueueDispatch() is async and returns a promise.
                param1 : storeName
                param2 : action to be dispatched

            below example dispatches a sync action
        */
        enqueueDispatch(DEFAULT_STORE, loadContacts([{
            Name : 'Prashant',
            Id : '123'
        },
        {
            Name : 'Yash',
            Id : '234'
        }])).then(()=>{
            /* 
                this is an example of how async actions should be fired.
            */
            enqueueDispatch(DEFAULT_STORE, loadContactsAsyncAction());
        });

    }


    /*
        properties which are updated by state directly are readonly, and should not be updated directly 
        as these are part of data layer and should be updated using actions only.
        below code will not work.
    */
    remove(event){
        this.contacts = this.contacts.filter((storeVal) => {
            return storeVal.Id !== event.target.dataset.contactId;
        });

        console.log(this.contacts);
    }



    disconnectedCallback(){
        //use unsubscribe all stores when component is removed from DOM. pass this reference to unsubscribe.
        unsubscribeAllStores(this);
    }
}