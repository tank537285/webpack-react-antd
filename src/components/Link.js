/**
 * Created by admin on 2017/9/18.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Link extends Component {
    static defaultProps = {
        ...Component.defaultProps,
        instructions: 'Usage instructions not provided.'
    }
    static propTypes = {
        active: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {}
        //事件绑定在es6中
        //this.handleClick = this.handleClick.bind(this);
    }

    //组件将要装载
    componentWillMount() {
    }

    //组件加载完毕
    componentDidMount() {
    }

    //组件将要卸载
    componentWillUnmount() {
    }

    //组件将更新
    componentWillUpdate() {
    }

    //组件更新完毕
    componentDidUpdate() {
    }

    //shouldComponentUpdate(nextProps, nextState) {}
    //组件将接收道具
    // componentWillReceiveProps(nextProps){}
    render() {
        if (this.active) {
            return <span>{this.children}</span>
        }
        return (
            <a href="#"
               onClick={e => {
                   e.preventDefault()
                   this.onClick()
               }}
            >
                {this.children}
            </a>
        );
    }
}

export default Link;
