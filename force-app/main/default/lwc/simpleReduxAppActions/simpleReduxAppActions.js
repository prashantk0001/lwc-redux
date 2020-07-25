/*
    Example implementation of actions:
      Actions are of two types, synchronous & asynchronous.

    
*/


import getContacts from '@salesforce/apex/ApexMethods.getContacts';

/*
  this is a sync action, it has a type and can carry payload. 
  sync actions typically will deal with state.
  they should not perform any logic, and should return an object with following definition.
    {
      type : <required property which identifies which action was fired on state change and maps to a reducer. value should be unique>,
      you can add other properties as needed.
    }
*/
const loadContacts = (contacts) => {
  return {
    type: 'LOAD_CONTACTS',
    contacts: contacts
  }
}

const removeContact = (contactId) => {
  return {
    type: 'REMOVE_CONTACTS',
    contactId: contactId
  }
}

/*
  this is a async action, it does async activities such as fetching data from api or apex method and then 
  it dispatches a sync action to update the information in state.
  async actions typically get data from an async operation and pass it over to a sync action.

  in below example: 
  loadContactsAsyncAction returns a function which takes "dispatch" as a parameter, and invokes an
  apex imperative method which fetches contacts and passes into "loadContacts() sync action" which in turn
  is passed inside the dispatch() to update the state.

*/
const loadContactsAsyncAction = () => {
  return dispatch => {
    getContacts().then(response => {
      dispatch(loadContacts(response));     //call dispatch to dispatch your sync action inside the async action.
    });
  }
}

export {
  removeContact,
  loadContacts,
  loadContactsAsyncAction
}