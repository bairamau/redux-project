//Library code

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


//App code

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

//Reducers
function todos(state = [], action) {
  if (action.type === ADD_TODO) {
    return state.concat([action.todo])
  } else if (action.type === REMOVE_TODO) {
    return state.filter((todo) => todo.id !== action.id)
  } else if (action.type === TOGGLE_TODO) {
    return state.map((todo) => todo.id === action.id ? { ...todo,
      complete: !todo.complete
    } : todo)
  }
  return state
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal])
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id)
    default:
      return state
  }
}

function app(state = {}, action){
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}


const store = createStore(app)
const unsubscribe = store.subscribe(() => console.log("The ne state is", store.getState()))

//unsubscribe()

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: 'Wash the car',
    complete: false,
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true,
  }
})

store.dispatch({
  type: REMOVE_TODO,
  id: 1
})

store.dispatch({
  type: TOGGLE_TODO,
  id: 0
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Learn Redux'
  }
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    name: 'Lose 20 pounds'
  }
})

store.dispatch({
  type: REMOVE_GOAL,
  id: 0
})
