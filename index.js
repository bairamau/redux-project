// {
//   type: 'ADD_TODO',
//   todo: {
//     id: 0,
//     name: 'Learn Redux',
//     complete: false,
//   }
// }

// {
//   type: 'REMOVE_TODO',
//   id: 0,
// }

// {
//   type: 'TOGGLE_TODO',
//   id: 0,
// }

// {
//   type: 'ADD_GOAL',
//   goal: {
//     id: 0,
//     name: 'Run a Marathon'
//   }
// }

// {
//   type: 'REMOVE_GOAL',
//   id: 0,
// }

//Reducer
function todos(state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo])
  } else if (action.type === 'REMOVE_TODO') {
    return state.filter((todo) => todo.id !== action.id)
  } else if (action.type === 'TOGGLE_TODO') {
    return state.map((todo) => todo.id === action.id ? { ...todo,
      complete: !todo.complete
    } : todo)
  }
  return state
}

function createStore(reducer) {
  //The store should have 4 parts
  //1. The state
  //2. Get the state (getState)
  //3. Listen to changes on the state (subscribe)
  //4. Update the state (dispatch)

  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    //call todos
    state = reducer(state, action)
    //loop over listeners and invoke them
    listeners.forEach((listener) => listener())
    // console.log(state, listeners)
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}

const store = createStore(todos)
const unsubscribe = store.subscribe(() => console.log("The ne state is", store.getState()))
store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
})
store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    name: 'Learn pure functions',
    complete: true,
  }
})

// unsubscribe()

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 3,
    name: 'Learn vue.js',
    complete: false,
  }
})

store.dispatch({
  type: 'REMOVE_TODO',
  id: 1
})

store.dispatch({type:'TOGGLE_TODO', id:0})