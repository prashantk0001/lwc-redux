/**
* Basic framework to implement state management using redux in Lightning Web Components
*
* @author  Prashant Kashyap
* @version 1.0
* @since   2020-07-24
*/



/*
    @done :  recursively freeze the state - done
    @done :  separate store creation and redux init - done
    @done :  add Redux-Thunk & logger - done
    @done :  remove dispatchAction method - done
    @done :  add middlewares - done 
    @done :  add immer.js for immutability (rfdc is deprecated) - done
    @done :  add flag for logger to be disabled for prod - done
    @done :  implement immer with abstraction, hide it from devs
    @done :  implement combineReducers done - connect method depends on how reducers are passed
    @done :  abstract non-required methods/props - done, abstracted loadRedux,createStore,connect,produce
    @done :  implement method to get all storeNames
    @done :  possibility of adding class to be implemented by components if they want to use redux - base component and redux component classes
    @done :  possibility of adding independent event queue module - implemented using js eventloop deferring using settimeout 
    @done :  deprecate dispatch as lightningElement Property
    @done :  add asserts
    @done :  connect method - devs will need to implement connector, which will complement the state they created  - might need to update asserts
    @done :  improve mapstatetoprops - now depends on how developers design state and connector method
    @done :  Load dependencies only once, only first store should load.
    @todo :  add method to unsubscribe from all stores at once.

    ----------------------------------------------------------------------------------------------

    @todo :  Create Readme and dependencies, add more commments - added comments
    @todo :  List use cases for implementing state in large lwc projects
    @todo :  look for how to design state to set guidelines
    @todo :  implement method to set state manually - later

    ----------------------------------------------------------------------------------------------
    
    @nottodo :  add redux dev toolkit enhancer - probably not needed, possibly will be blocked by locker, need analysis
    @nottodo :  look for possibility of adding redux-toolkit - not needed
    @nottodo :  check possibility for state schema and validation - not needed immediately, might be needed for screen layer
    @nottodo :  possibility of adding an independent "screen" application layer module - can be done by implementing separate reducers for different screens
    @nottodo :  possibility of adding an independent navigation module for Aura standalone apps - create another project to implement routing, levarage that with lwc or redux as needed

    remarks : 
        all state props must be initiated initially so they are connected with components.
        implement apex logic using CQS with Service layer design only.
        
*/

/*  PlatformResource loader to load all dependencies */
import { loadScript } from 'lightning/platformResourceLoader';

/*
    @dependencies: 
        Redux           - State Management Library
        Redux-logger    - To log state changes after each action
        Redux-thunk     - To enable async-actions(required for apex actions and other asyc operations)
        immer           - To ensure state immutability
*/
import reduxURL from '@salesforce/resourceUrl/redux';
import reduxloggerURL from '@salesforce/resourceUrl/reduxlogger';
import reduxthunkURL from '@salesforce/resourceUrl/reduxthunk';
import immerURL from '@salesforce/resourceUrl/immer';

/*   to Extend Redux Classes with LightningElement and required decorators*/
import { LightningElement, track, api} from 'lwc';


/*----------------------------------------------------------------------------------------------------------------------
|  Class BaseReduxElement
|
|  Purpose: To identify if the lwc has redux implemented.
*-----------------------------------------------------------------------------------------------------------------------*/
class BaseReduxElement extends LightningElement {}


/*----------------------------------Private props START-----------------------------------------------------------------*/

const stores = {};                          // property to index all stores structure : { storeName : <redux store>... }
let produce;                                // immer.js : produce method to implement immutable states
let redux_combineReducers;                  // Redux.js : combineReducers method to combine multiple reducers
let dependenciesLoaded = false;             // checks if dependencies are loaded already.

/* ----------------------------------Private props END----------------------------------------------------------------- */


/* ----------------------------------Public props START---------------------------------------------------------------- */

const DEFAULT_STORE = 'DEFAULT';            // default storename if no storeName is passed in  c-redux-module(store-name)
const reduxOptions = {                      // decides whether to log all actions and override console.assert method, (should be false in prod)
    useLogger : false
};

/* ----------------------------------Public props END------------------------------------------------------------------ */



/* ----------------------------------Private Methods START------------------------------------------------------------- */


/*----------------------------------------------------------------------------------------------------------------------
|  Method processStoreName
|
|  Purpose:  Checks if passed storeName is null/undefined and assign DEFAULT_STORE.
|
|  Pre-condition: There will be ambiguity if multiple stores are created and storeName is not passed to the module
|      
|  Parameters:
|	storeName(string) -- Name of the store, could be null
|
|  Returns:  (string) Input if it is not null/undefined else DEFAULT_STORE
*-----------------------------------------------------------------------------------------------------------------------*/
const processStoreName = (storeName) => {
    if (!storeName) {
        storeName = DEFAULT_STORE;
    }
    return storeName;
}


/*-----------------------------------------------------------------------------------------------------------------------
|  Method subscribeToStore "DO NOT MODIFY"
|
|  Purpose:  Subscribe a component to a store, also add a few properties to the component:
|      property storeName : {} and assign unsubscription methods to unsubscribe the stores when component is disconnected
|      property subscribedStores : [] and assign all storesNames that have been subscribed by the component
|
|  Pre-condition: store should be created before.
|
|  Parameters:
|	component     -- Component which is subscribing to the store
|	storeName     -- Store whih needs to be subscribed
|   changeHandler -- implementation of how component properties are updated by state after an action fires.
*--------------------------------------------------------------------------------------------------------------------*/
const subscribeToStore = (component, storeName, changeHandler) => {
    let unsubscribe = stores[storeName].subscribe(changeHandler);

    if (!component.subscribedStores) {
        component.subscribedStores = [];
    }
    component.subscribedStores.push(storeName);

    component[storeName] = {};
    component[storeName].unsubscribe = (storeToUnsubscribe) => {
        component.subscribedStores = component.subscribedStores.filter((storeVal) => {
            return storeVal !== storeToUnsubscribe;
        });
        unsubscribe();
    }
}

/*-----------------------------------------------------------------------------------------------------------------------
|  Method unsubscribeAllStores "DO NOT MODIFY"
|
|  Purpose:  Unsubscribe all the stores.
|
|  Pre-condition: atleast one store must be subscribed.
|
|  Parameters:
|	component     -- Component which is unsubscribing all the stores
*--------------------------------------------------------------------------------------------------------------------*/
const unsubscribeAllStores = (component) => {
    component.subscribedStores.forEach((elem) => {
        component[elem].unsubscribe();
    });
}

/*---------------------------------------------------------------------------------------------------------------------
|  Method createLogger
|
|  Purpose:  Initialize logger with available options, all options are described per line.
|
|  Pre-condition: Redux-logger dependency must be loaded.
|
|  Returns:  Logger middleware function to feed in applyMiddleware method
*--------------------------------------------------------------------------------------------------------------------*/
const createLogger = () => {
    
    // eslint-disable-next-line no-undef
    return reduxLogger.createLogger({
        //predicate, // if specified this function will be called before each action is processed with this middleware.
        //collapsed, // takes a Boolean or optionally a Function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.
        duration: true, // Boolean, // print the duration of each action?
        timestamp: true, // Boolean, // print the timestamp with each action?

        level: 'log', // 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
        colors: {
            title: () => 'inherit',
            prevState: () => '#9E9E9E',
            action: () => '#03A9F4',
            nextState: () => '#4CAF50',
            error: () => '#F20404',
        }, // colors for title, prev state, action and next state: https://github.com/LogRocket/redux-logger/blob/master/src/defaults.js#L12-L18
        //titleFormatter, // Format the title used when logging actions.
        
        /*
            stateTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
            actionTransformer, // Transform action before print. Eg. convert Immutable object to plain JSON.
            errorTransformer, // Transform error before print. Eg. convert Immutable object to plain JSON.
        */
        logger: console, // LoggerObject, // implementation of the `console` API.
        logErrors: true, // Boolean, // should the logger catch, log, and re-throw errors?

        diff: true // Boolean, // (alpha) show diff between states?
        //diffPredicate // (alpha) filter function for showing states diff, similar to `predicate`
    });
}


/*-------------------------------------------------------------------------------------------------------------------
|  Method loadRedux "DO NOT MODIFY"
|
|  Purpose: async method, loadsall the required dependencies to implement this module.
|           populates module prop "produce" with immer.js "produce" method.
|           populates module prop "redux_combineReducers" with Redux.js "combineReducers" method.
|           throws error if these loading is unsuccessful.
|
|  Pre-condition: 
|       Following imports are required.
|          import reduxURL from '@salesforce/resourceUrl/redux';
|          import reduxloggerURL from '@salesforce/resourceUrl/reduxlogger';
|          import reduxthunkURL from '@salesforce/resourceUrl/reduxthunk';
|          import immerURL from '@salesforce/resourceUrl/immer';
|
|       "reduxOptions.useLogger" module property must be set to "true" if logging and asserts are to be enabled &
|           dependecy is loaded.
|
|  Post-condition: stores can be created after this.
|
|  Parameters:
|	component -- required for loadScript method to load the dependencies in Base Component.
|
|  Returns:  A Promise, no values.
*--------------------------------------------------------------------------------------------------------------------*/
const loadRedux = async (component) => {
    try {
        await loadScript(component, reduxURL);
        if(reduxOptions.useLogger){
            await loadScript(component, reduxloggerURL);
            
        }
        await loadScript(component, reduxthunkURL);
        await loadScript(component, immerURL);
        
        // eslint-disable-next-line no-undef
        produce = immer.produce;
        
        
        // eslint-disable-next-line no-undef
        redux_combineReducers = Redux.combineReducers;
        dependenciesLoaded = true;
    } catch (err) {
        console.assert(err, err);
    }
}

/*-------------------------------------------------------------------------------------------------------------------
|  Method createStore "DO NOT MODIFY"
|
|  Purpose:  Wrapper method around Redux.js "createStore" method.
|            Creates store with provided storeName, if no storeName is passed, DEFAULT_STORE is set as storeName.
|            Populates created store in "stores" module property, indexed with storeName.
|            Applies Redux-thunnk & Redux-logger middlewares to the store.
|            Works with combined reducers using "combineReducer" method.
|            "reduxOptions.useLogger" must be set to apply Redux-logger middleware.
|
|  Pre-condition: "loadRedux" method must be invoked to load all dependencies.
|                 "reducer" methods must be passed as stores are binded to the reducer(s).
|
|  Parameters:
|	storeName (string)    -- Name of the store to be created.
|	reducer   (function)  -- reducer function/output of combinedReducers method.
|
*--------------------------------------------------------------------------------------------------------------------*/
const createStore = (storeName, reducer) => {
    storeName = processStoreName(storeName);
    // eslint-disable-next-line no-undef, no-shadow
    const createStore = Redux.createStore; 
    
    // eslint-disable-next-line no-undef
    const applyMiddleware = Redux.applyMiddleware;

    const middlewares = [];
    
    // eslint-disable-next-line no-undef
    middlewares.push(ReduxThunk.default);

    if(reduxOptions.useLogger){
        middlewares.push(createLogger());
    }
    stores[storeName] = createStore(reducer, applyMiddleware.apply(this, middlewares));

}

/*-------------------------------------------------------------------------------------------------------------------
|  Method connect "DO NOT MODIFY"
|
|  Purpose:  Wrapper for handler which is called by the state after an action is dispatched.
|            calls "subscribeToStore" to subscribe the store.
|            Throws error if passed component does not implement "BaseReduxElement" Class.
|            Throws error if "component.mapStateToProps" is not populated in "BaseReduxElement" component.
|            Throws error if connector is not a function.
|            "connector" method is crucial and needs to be implemented by the developers to define how 
|               component props are updated from state after an action is dispatched.
|            "component.mapStateToProps" is crucial and developers needs to "design" the property to define
|               mapping of state to component properties.
|
|  Pre-condition: Subscribing component's controller must implement "LightningReduxElement" class. 
|                 Redux dependencies must be pre loaded and store must be created already.
|
|  Parameters:
|	component (instance of LightningReduxElement)   -- component that needs to be connected with store.
|	storeName (string)                              -- Name of the store to be connected with.
|   connector (function)                            -- Method to be implemented by devs to define component props updates with state.
|
|  Returns (function):  to be called if state needs to sync with component as soon as it is connected.
*--------------------------------------------------------------------------------------------------------------------*/
const connect = (component, storeName, connector) => {
    console.assert(component instanceof BaseReduxElement, 'arg0: Component does not extend LightningReduxElement');
    console.assert(typeof component.mapStateToProps == 'object' && component.mapStateToProps instanceof Array, 'arg1: mapStateToProps required, Implement mapStateToProps as an array.');
    console.assert(typeof connector == 'function', 'arg2: Expecting function.');

    storeName = processStoreName(storeName);
    const handleChanges = () => {
        let state = stores[storeName].getState();
        connector(state, component);
    }
    subscribeToStore(component, storeName, handleChanges);

    return handleChanges;
}

/*-------------------------------------------------------------------------------------------------------------------
|  Method deferDispatch "DO NOT MODIFY"
|
|  Purpose:  async method, uses setTimeout to make action dispatch asynchronous and makes use of JS Eventloop
|               to perform actions in synchronized queue - manner.
|            works with both sync and async actions.
|            helps with rendering issues.
|
|  Pre-condition: Actions must be defined & implemented by the devs.
|
|  Post-condition: Make use of returned Promise OR implement async/await to streamline multiple dispatches.
|
|  Parameters:
|	redux_dispatch (function)         -- Redux.js dispatch method destructured from a store.
|	action         (Object/function)  -- Action that needs to be dispatched against the state.
|
|  Returns:  A Promise, resolves after dispatch is called, returns no values.
*--------------------------------------------------------------------------------------------------------------------*/

const deferDispatch = (redux_dispatch, action) => {
    return new Promise((resolve) =>{
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            redux_dispatch(action);
            resolve();
        }, 0);
    });
}

/* ----------------------------------Overriding Console.Assert------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------
|  Method overrideAssert "DO NOT MODIFY"
|
|  Purpose:  Console API's assert does not stop JS execution after logging error to console,
|               this override will stop JS Execution by throwing an error and log it to console.
|            Implemented for better code quality, expecting it to be disabled in PROD using
|               "reduxOptions.useLogger" module property.
*--------------------------------------------------------------------------------------------------------------------*/
const overrideAssert = () => {    
    window.console.assert = (statement, message) => {
        if (!statement) throw new Error(message);
    };
}
/* ----------------------------------Overriding Console.Assert-------------------------------------------------------*/


/* ----------------------------------Private Methods END------------------------------------------------------------ */


/* ----------------------------------Public Methods START----------------------------------------------------------- */


/*-------------------------------------------------------------------------------------------------------------------
|  Method createReducer "DO NOT MODIFY"
|
|  Purpose:  To create abstraction of immutability implementation using immer.js.
|            Devs need to call this method to create Reducers.
|            Throws error if reducer is not a function.
|
|  Pre-condition: A reducer must be implemented. 
|                 immer.js must be loaded beforehand and "produce" module property must be prepopulated.
|
|  Parameters:
|	reducer (function) -- method which defines mapping of behavior and action. Needs to be implemented to mutate state.
|
|  Returns (function) :  function with immer.js added as thunk.
*--------------------------------------------------------------------------------------------------------------------*/
const createReducer = ( reducer ) => {
    console.assert(reducer && typeof reducer == 'function', 'Reducer not defined appropriately, should be a function.');
    const createReducerWithImmer = (state = {}, action) => produce(state, draftState => {
        return reducer(state, draftState, action);
    });
    return createReducerWithImmer;
}

/*-------------------------------------------------------------------------------------------------------------------
|  Method combineReducers "DO NOT MODIFY"
|
|  Purpose:  Wrapper around Redux.js "combineReducers" method, helps creating abstraction for immer.js implementation.
|            Accepts "reducers" as an Object { namespace : reducer_function }, this is importance since state is then
|               created in namespaced manner. "connector & mapstatetoprops" implementation will depend on this.
|            Throws error if "reducers" is not an object.
|
|  Pre-condition: Multiple reducers must be implemented and "reducers" must be namespaced. 
|                 immer.js must be loaded beforehand and "produce" module property must be prepopulated.
|
|  Post-condition: output can be passed to createStore.
|
|  Parameters:
|	reducers (Object) -- { namespace : reducer_function... }
|
|  Returns (Object) :  combined reducers which can then be passed to createStore.
*--------------------------------------------------------------------------------------------------------------------*/
const combineReducers = async ( reducers ) => {
    console.assert(typeof reducers == 'object', 'arg0: Expected Reducers as JSON Object');
    let reducersWithImmer = [];
    reducers.forEach((reducer) => {
        reducersWithImmer.push(reducer);
    });
    return redux_combineReducers(reducersWithImmer);
}


/*-------------------------------------------------------------------------------------------------------------------
|  Method fetchAllStoreNames "DO NOT MODIFY"
|
|  Purpose:  fetches all storeNames against stores that have been created so far.
|
|  Returns (Array) :  List of storeNames.
*--------------------------------------------------------------------------------------------------------------------*/
const fetchAllStoreNames = () => {
    return Object.keys(stores);
}


/*-------------------------------------------------------------------------------------------------------------------
|  Method enqueueDispatch "DO NOT MODIFY"
|
|  Purpose:  async method, finds the "dispatch()" method from store whose name is passed and defers dispatch
|               till JS Eventloop is empty.
|
|  Parameters:
|	storeName (string)          -- Name of the store whose dispatch method needs to be invoked.
|	action    (Object/function) -- action to be dispatched.
|
|  Returns:  A Promise, resolves after dispatch is called, returns no values.
*--------------------------------------------------------------------------------------------------------------------*/
const enqueueDispatch = (storeName, action) => {
    storeName = processStoreName(storeName);
    return deferDispatch(stores[storeName].dispatch, action);
}

/*-------------------------------------------------------------------------------------------------------------------
|  Exports to help implement Redux with LWC.
*--------------------------------------------------------------------------------------------------------------------*/
export {
    DEFAULT_STORE,
    combineReducers,
    createReducer,
    fetchAllStoreNames,
    enqueueDispatch,
    unsubscribeAllStores
};


/* ----------------------------------Public Methods END------------------------------------------------------------- */

/*---------------------------------Controller for Store Creation(CreateStore)----------------------------------------*/



/*-------------------------------------------------------------------------------------------------------------------
|  Class CreateStore "DO NOT MODIFY"
|
|  Purpose:  Extends BaseReduxElement & LightningElement
|            Controller for component "reduxModule", to be used to load dependencies & create a store.
|            To implement Redux with LWC, this is the BaseComponent that needs to be implemented.
|            Default Export. i.e. used as component controller
|            Template contains a slot which is only loaded after the component is ready with the dependencies & store.
|            first CreateStore component in heirarchy sets "reduxOptions.useLogger" module property.
|            Helps create stores declaratively
|
|  Pre-condition: This is the first step.
|
|  Post-condition: All the Child components must implement LightningReduxElement class
|
|  Properties:
|	ready                  -- set to true after all the dependencies are loaded and requested store is created.
|	public storeName       -- name of the store to be created
|	public useLogger       -- to enable/disable logging & asserts.
|	public reducer         -- either single reducer function or Object.
|	public combineReducers -- if reducer is an Object, call combineReducers.
|   mapStateToProps        -- not needed, initialized to empty array.
*--------------------------------------------------------------------------------------------------------------------*/
export default class CreateStore extends BaseReduxElement {
    @track ready = false;                   // boolean  : checks whether redux is loaded
    @api storeName;                         // string   : name of the store to be created
    @api useLogger;                         // boolean  : to enable/disable logging
    @api reducer;                           // Object   : reducers to bind with store, pass the reducer directly if no need to combine
    @api combineReducers = false;           // boolean  : should the reducer needs to be combined
    mapStateToProps = [];


/*-------------------------------------------------------------------------------------------------------------------
|  Method connectedCallback 
|
|  Purpose:  lwc lifecycle hook
|            overrides console.assert() if logging is enabled.
|            throws error if reducer is set to null/undefined.
|            loads all dependencies, creates store.
*--------------------------------------------------------------------------------------------------------------------*/
    async connectedCallback(){
        if(this.useLogger){
            reduxOptions.useLogger = true;
            overrideAssert();               //Overriding Console.Assert if not in Production
        }
        console.assert(this.reducer, 'Reducer cannot be null/undefined.');

        this.storeName = processStoreName(this.storeName);
        if(!dependenciesLoaded){
            await loadRedux(this);
        }
        if(this.combineReducers){
            this.reducer = redux_combineReducers(this.reducer);
        }
        createStore(this.storeName, this.reducer);
        
        connect(this,this.storeName, ()=>{ console.log('connector'); })();
        this.ready = true;
    }
    
/*-------------------------------------------------------------------------------------------------------------------
|  Method disconnectedCallback 
|
|  Purpose:  lwc lifecycle hook, Unsubscribe all the stores.
*--------------------------------------------------------------------------------------------------------------------*/
    disconnectedCallback(){       
        unsubscribeAllStores(this);
    }

}

/*---------------------------------Redux Element Class-------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------------------
|  Class LightningReduxElement "DO NOT MODIFY"
|
|  Purpose:  Extends BaseReduxElement & LightningElement
|            This class should be extended by all the components which are child to CreateStore component.
|            Uses constructor to mandate implementation of logic to connect state with component props.
|            Throws error if mapStateToProps is null/undefined
|            Throws error if connector is not a function
|
|  Pre-condition: CreateStore must be used to create a store.
|                 Components implementing this class should be passed as a slot down the heirarchy of CreateStore.
|                 State Design is VERY CRUCIAL to complement implementation of reducers, actions, mapStateToProps and connector methods.
*--------------------------------------------------------------------------------------------------------------------*/
export class LightningReduxElement extends BaseReduxElement {

    mapStateToProps;                                                //to be populated by class that extends this

    constructor(storeName, mapStateToProps, connector){             //to be passed by the class that implements
        console.assert(mapStateToProps, 'arg1: mapStateToProps is required.');
        console.assert(typeof connector == 'function', 'arg2: Expecting function.');

        super();
        this.storeName = processStoreName(storeName);
        this.mapStateToProps = mapStateToProps;
        connect(this, this.storeName, connector)();
    }

}

/*
---------------------------Thunk async action examples----------------------------------------------------------------


function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}
----------------------------------------------------------------------------------------------------------------------
*/