/**
 * Created by admin on 2017/9/18.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

class TodoList extends Component {
    static defaultProps = {
        ...Component.defaultProps
    }
    static propTypes = {
        todos: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired).isRequired,
        timeNow:PropTypes.string.isRequired,
        onTodoClick: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {}
        //事件绑定在es6中
        // this.onTodoClick = this.onTodoClick.bind(this);
    }
    render() {
        return (
            <ul>
                {this.props.todos.map((todo) =>
                    <Todo
                        key={todo.id}
                        {...todo}
                        onClick={()=>this.props.onTodoClick(todo.id)}
                    />
                )}
                <div>{this.props.timeNow}</div>
            </ul>
        );
    }
}

export default TodoList;
