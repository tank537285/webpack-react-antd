/**
 * Created by admin on 2017/9/26.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
import ImageLoader from '../ImageLoader'
import {historyGo,shareapi,sharebase,isNotSelfApp,is_weixn} from '../../common/Tool'
import './OcjTitleBar.css'
class OcjTitleBar extends Component {
    static defaultProps = {
        ...Component.defaultProps
    }
    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            hideTitleBar:isNotSelfApp()
        }
        //事件绑定在es6中用于自定义事件props事件不适用
        sharebase();
        this.shareapi = shareapi.bind(this,"hh","hh"
            ,"http://cdnimg.ocj.com.cn/common/html5/images/mevent/Activity-v2/img.Share.png"
            ,window.location.href);
        if(is_weixn()){
            this.shareapi()
        }
    }

    //组件将要装载
    componentWillMount(){
        window.document.getElementsByTagName("html")[0].setAttribute("style",`font-size:${Math.floor(window.screen.width*12/320)}px`)
    }
    //组件加载完毕
    //componentDidMount(){}
    //组件将要卸载
    //componentWillUnmount(){}
    //组件将更新
    //componentWillUpdate(){}
    //组件更新完毕
    //componentDidUpdate(){}
    //shouldComponentUpdate(nextProps, nextState) {}
    //组件将接收道具
    // componentWillReceiveProps(nextProps){}
    render() {
        if(!this.state.hideTitleBar){
            return (
                <header className="OldHeader">
                    <div className="OHeader">
                        <h1>东方优选</h1>
                        <div className="OHeadBack" onClick={historyGo}>返回</div>
                        <div className="OHeadShare"
                             onClick={this.shareapi}>
                            <ImageLoader autoSize={false} src={"http://cdnimg.ocj.com.cn/common/html5/images/mevent/Activity-v2/img.Share.png"}/>
                        </div>
                    </div>
                </header>
            );
        }else {
            return(<div style={{display:"none"}}></div>)
        }

    }
}

export default OcjTitleBar;
