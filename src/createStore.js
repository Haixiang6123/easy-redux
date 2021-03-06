const createStore = (reducer, enhancer) => {
  // 是否需要增强 createStore
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }

  let currentState = {}
  let observers = [] // 观察者队列

  const getState = () => currentState

  const dispatch = (action) => {
    currentState = reducer(currentState, action)
    observers.forEach(fn => fn())
  }

  const subscribe = (fn) => {
    observers.push(fn)
  }

  // 初始化
  dispatch({type: '@@REDUX_INIT'})

  return { getState, dispatch, subscribe }
}

export default createStore
