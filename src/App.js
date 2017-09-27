import React, { Component } from 'react';
import './App.css';
// import Footer from './components/Footer'
// import AddTodo from './container/AddTodo'
import OcjTitleBar from './components/ocjTitleBar/OcjTitleBar'
import VisibleTodoList from './container/VisibleTodoList'
class App extends Component {
    static defaultProps = {
        ...Component.defaultProps,
        instructions: 'Usage instructions not provided.',
    }
    static propTypes = {}
    constructor(props){
        super(props)
        this.state = {}
    }
    //组件将要装载
    componentWillMount(){}
    //组件加载完毕
    componentDidMount(){}
    //组件将要卸载
    componentWillUnmount(){}
    //组件将接收道具
    // componentWillReceiveProps(nextProps){}
    //组件将更新
    componentWillUpdate(){}
    //组件更新完毕
    componentDidUpdate(){}
    //shouldComponentUpdate(nextProps, nextState) {}
  render() {
    return (
        <div>
            <OcjTitleBar></OcjTitleBar>
            <VisibleTodoList/>
        </div>
    );
  }
}

export default App;
