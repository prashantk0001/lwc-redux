import getContacts from '@salesforce/apex/ApexMethods.getContacts';

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


const loadContactsAsyncAction = () => {
  return dispatch => {
    return getContacts().then(response => {
      dispatch(loadContacts(response));
    });
  }
}

export {
  removeContact,
  loadContacts,
  loadContactsAsyncAction
}