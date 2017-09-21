/**
 * Created by admin on 2017/9/15.
 */
import {VisibilityFilters,SET_VISIBILITY_FILTER,ADD_TODO,TOGGLE_TODO} from '../action/actions'
import {combineReducers} from 'redux'
/*const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};*/

function todos(state=[],action) {
    switch (action.type){
        case ADD_TODO:
            return [
                ...state,
                {
                    text:action.text,
                    completed:false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo,index)=>{
                if(index===action.index){
                    return Object.assign({},todo,{
                        completed:!todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
}
function visibilityFilter(state=VisibilityFilters.SHOW_ALL,action) {
    switch (action.type){
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}
function timeNow(state = "",action) {
    switch (action.type){
        case "RECEIVE_POSTS":
            return action.receivedAt
        default:
            return state
    }
}
/*function todoApp(state={}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action)
    }
}*/
const todoApp=combineReducers({
    visibilityFilter,
    todos,
    timeNow
})

/*使用方法
 import {createStore} from 'redux'
 import todoApp from './reducer/reducers'
 import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './action/actions'
 let store=createStore(todoApp)
 let unsubscribe = store.subscribe(() =>
 console.log(store.getState())
 )
 // 发起一系列 action
 store.dispatch(addTodo('Learn about actions'))
 // 停止监听 state 更新
 unsubscribe();
* */
export default todoApp