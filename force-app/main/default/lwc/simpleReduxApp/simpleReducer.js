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