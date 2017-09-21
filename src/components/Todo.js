/**
 * Created by admin on 2017/9/18.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Todo extends Component {
    static defaultProps = {
        ...Component.defaultProps,
        instructions: 'Usage instructions not provided.'
    }
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {}
        //事件绑定在es6中用于自定义事件
        // this.props.onClicks = this.props.onClicks.bind(this);
    }
    render() {
        return (
            <li
                onClick={this.props.onClick}
                style={{
                    textDecoration: this.props.completed ? 'line-through' : 'none'
                }}
            >
                {this.props.text}
            </li>
        );
    }
}

export default Todo;
