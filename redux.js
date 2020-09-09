console.clear();

// creator (somone drop off a form)
const createPolicy = (name, amount)=>{
  return { // Action (a form in our analogy)
    type:'CREATE_POLICY',
    payload:{
      name,
      amount
    }
  };
};

const deletePolicy = (name)=>{
  return {
    type:'DELETE_POLICY',
    payload : {
      name
    }
  }; 
};

const createClaim = (name, amountOfMoneyToCollect)=>{
  return {
    type:'CREATE_CLAIM',
    payload:{
      name,
      amountOfMoneyToCollect
    }
  };
};


//REDUCERS 
const claimsHistory = (oldListOfClaims = [], action)=>{
  if(action.type === "CREATE_CLAIM"){
    return [...oldListOfClaims, action.payload];  
  }
  return oldListOfClaims;
}

const accounting = (bagOfMoney = 100, action)=>{
  if(action.type === 'CREATE_CLAIM'){
   return  bagOfMoney - action.payload.amountOfMoneyToCollect
  } else if(action.type === 'CREATE_POLICY'){
    return bagOfMoney + action.payload.amount
  }
  return bagOfMoney
}

const policies = (listOfPolicies = [], action)=>{
  if(action.type === 'CREATE_POLICY'){
    return [...listOfPolicies, action.payload.name]
  }else if(action.type === 'DELETE_POLICY'){
    return listOfPolicies.filter(name=> name !==action.payload.name )
  }
  return listOfPolicies;
}

const {createStore, combineReducers} = Redux;

const ourDepartements = combineReducers({
  accounting: accounting,
  claimsHistory : claimsHistory,
  policies : policies
})

const store= createStore(ourDepartements);

//intial store
console.log(store.getState())

store.dispatch(createPolicy('Peter', 20));
store.dispatch(createPolicy('Max', 30));
store.dispatch(createPolicy('Rock', 40));

//store.dispatch(createClaim('Peter', 120));
//store.dispatch(createClaim('Max', 50));

store.dispatch(deletePolicy('Rock'));


//updated Store
console.log(store.getState());
