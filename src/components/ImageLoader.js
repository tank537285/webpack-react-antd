import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import "./ImageLoader.css"

const Status = {
    PENDING: 'pending',
    LOADING: 'loading',
    LOADED: 'loaded',
    FAILED: 'failed',
};
const par={w:0,h:0,imgw:0,imgh:0};


export default class ImageLoader extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        preloader: PropTypes.func,
        src: PropTypes.string,
        default:PropTypes.string,
        autoSize:PropTypes.bool,
        onLoad: PropTypes.func,
        onError: PropTypes.func,
        imgProps: PropTypes.object
    };
    static defaultProps={
        default:"http://m.ocj.com.cn/common/mobile_phone/cssimage/indeximg/imglogo.png",
        autoSize:true
    }

    constructor(props) {
        super(props);
        this.state = {
            status: props.src ? Status.LOADING : Status.PENDING,
            bili:2
        };
    }

    componentDidMount() {
        par.w=ReactDOM.findDOMNode(this).parentNode.offsetWidth;
        par.h=ReactDOM.findDOMNode(this).parentNode.offsetHeight;
        if (this.state.status === Status.LOADING) {
            this.createLoader();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.src !== nextProps.src) {
            this.setState({
                status: nextProps.src ? Status.LOADING : Status.PENDING,
            });
        }
    }

    componentDidUpdate() {
        if (this.state.status === Status.LOADING && !this.img) {
            this.createLoader();
        }
    }

    componentWillUnmount() {
        this.destroyLoader();
    }

    getClassName() {
        let className = `imageloader ${this.state.status}`;
        if (this.props.className) className = `${className} ${this.props.className}`;
        return className;
    }

    createLoader() {
        this.destroyLoader();  // We can only have one loader at a time.

        this.img = new Image();
        this.img.onload = this.handleLoad;
        this.img.onerror = this.handleError;
        this.img.src = this.props.src;
    }

    destroyLoader() {
        if (this.img) {
            this.img.onload = null;
            this.img.onerror = null;
            this.img = null;
        }
    }

    handleLoad=(event)=> {
        this.destroyLoader();
        par.imgw=event.target.width;
        par.imgh=event.target.height;
        if(event.target.width/event.target.height<par.w/par.h){
            this.setState({status: Status.LOADED,bili:1});
        }else{
            this.setState({status: Status.LOADED,bili:0});
        }

        if (this.props.onLoad) this.props.onLoad(event);
    }

    handleError=(error)=> {
        this.destroyLoader();
        this.setState({status: Status.FAILED});

        if (this.props.onError) this.props.onError(error);
    }

    getMarginTop=()=>{
        return Math.floor((par.h-par.imgh*par.w/par.imgw)/2)
    }
    getMarginLeft=()=>{
        return Math.floor((par.w-par.imgw*par.h/par.imgh)/2)
    }

    render() {
        const {src, imgProps} = this.props;
        let props = {src};

        for (let k in imgProps) {
            if (imgProps.hasOwnProperty(k)) {
                props[k] = imgProps[k];
            }
        }
        if(!this.props.autoSize){
            return (
                <img style={{width:"100%",height:"auto"}} alt="" {...props} />
            )
        }
        if(this.state.status!==Status.LOADED){
            return (
                <img style={{width:"100%",height:"100%"}} alt="" src={this.props.default} />
            )
        }
        switch (this.state.bili){
            case 0:
                return (
                    <CSSTransition classNames="imageLoader" timeout={500} appear in={true}>
                        <img style={{width:"100%",height:"auto",marginTop:this.getMarginTop()}} alt="" {...props} />
                    </CSSTransition>
                )
            case 1:
                return (
                    <CSSTransition classNames="imageLoader" timeout={500} appear in={true}>
                        <img style={{width:"auto",height:"100%",marginLeft:this.getMarginLeft()}} alt="" {...props} />
                    </CSSTransition>
                )
            default:
                return (
                    <CSSTransition classNames="imageLoader" timeout={500} appear in={true}>
                        <img style={{width:"100%",height:"auto"}} alt="" {...props} />
                    </CSSTransition>
                )
        }
    }
}