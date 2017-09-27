/**
 * Created by admin on 2017/9/18.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImageLoader from './ImageLoader';
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
                <div style={{width:200,height:200}}>
                    <ImageLoader
                        src={"http://cdnimg.ocj.com.cn/image_site/event/eventitem/htmlmake/upload_c068a1a01653c9c6c2bc9eed50b0ad9a.jpg"}
                    />
                </div>
            </li>
        );
    }
}

export default Todo;
