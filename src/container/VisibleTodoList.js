/**
 * Created by admin on 2017/9/18.
 */
import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import {toggleTodo,fetchPostsIfNeeded} from '../action/actions'
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
        default :
            return todos
    }
}


const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter),
        timeNow:state.timeNow.toString()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id))
            dispatch(fetchPostsIfNeeded("reactjs"))
        }
    }
}
const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList