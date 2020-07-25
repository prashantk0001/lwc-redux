/*
    Example implementation of reducers:
    import createReducer() from reduxModule.
    
    createReducer() requires a function as parameter which takes 3 arguments: 
        currentState : readonly state that needs to be changed when an action is fired.
        draftState   : mutable copy of state object which should be returned by the function
        action       : action that needs to be fired to change the state.
*/

import {
    createReducer
} from 'c/reduxModule';

const reducer = createReducer((currentState, draftState, action) => {

    switch (action.type) {
        case 'LOAD_CONTACTS': {
            draftState.contacts = action.contacts;
            return draftState;
        }
        case 'REMOVE_CONTACTS': {
            draftState.contacts = draftState.contacts.filter((storeVal) => {
                return storeVal.Id !== action.contactId;
            });
            return draftState;
        }
        default: {
            return draftState;
        }
    }
});

const reducer2 = createReducer((currentState, draftState, action) => {

    switch (action.type) {
        case 'LOAD_CONTACTS2': {
            draftState.contacts = action.contacts;
            return draftState;
        }
        case 'REMOVE_CONTACTS2': {
            draftState.contacts = draftState.contacts.filter((storeVal) => {
                return storeVal.Id !== action.contactId;
            });
            return draftState;
        }
        default: {
            return draftState;
        }
    }
});

export {
    reducer,
    reducer2
};