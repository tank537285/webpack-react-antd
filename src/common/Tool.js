/**
 * Created by admin on 2017/9/26.
 */
import fetch from 'isomorphic-fetch'
var wx = require("weixin-js-sdk")
export function historyGo(){
    var ref = window.document.referrer;

    if(ref !== undefined && ref !== '' && ref !== 'undefined' && ref.indexOf("event/niuslanquestion") >= 0)
    {
        window.location.href = "/";
        return;
    }
    if(ref !== undefined && ref !== '' && ref !== 'undefined' && (ref.indexOf("darw/living") >= 0||ref.indexOf("events/yxred") >= 0 ||ref.indexOf("event/tianmao") >= 0 ||ref.indexOf("darw/intoActivity") >= 0 ||ref.indexOf("darw/qszcfst") >= 0 ||ref.indexOf("darw/foodtime") >= 0 ||ref.indexOf("darw/guyu") >= 0 ||ref.indexOf("darw/goldrain") >= 0 ||ref.indexOf("darw/hotList") >= 0||ref.indexOf("darw/newCustomer") >= 0))
    {
        window.location.href = ref;
        return;
    }
    if(ref !== undefined && ref !== '' && ref !== 'undefined' && ref.indexOf("?isPufa=1") > 0)
    {
        window.location.href = ref;
        return;
    }
    if(ref == ''||ref.indexOf("/qr") > 0 ||ref.indexOf("/detail") > 0 ||ref.indexOf("/admin/se_ads/parseandforward") > 0 ){
        window.location.href ="/";
    }else{
        window.history.go(-1);
    }
}
export function sharebase() {
    if(!isNotSelfApp()){
        var classCallCheck = function (instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        };

        var get$1 = function get$1(object, property, receiver) {
            if (object == null) object = Function.prototype;
            var desc = Object.getOwnPropertyDescriptor(object, property);

            if (desc == undefined) {
                var parent = Object.getPrototypeOf(object);

                if (parent == null) {
                    return undefined;
                } else {
                    return get$1(parent, property, receiver);
                }
            } else if ("value" in desc) {
                return desc.value;
            } else {
                var getter = desc.get;

                if (getter == undefined) {
                    return undefined;
                }

                return getter.call(receiver);
            }
        };

        var set$1 = function set$1(object, property, value, receiver) {
            var desc = Object.getOwnPropertyDescriptor(object, property);

            if (desc == undefined) {
                var parent = Object.getPrototypeOf(object);

                if (parent !== null) {
                    set$1(parent, property, value, receiver);
                }
            } else if ("value" in desc && desc.writable) {
                desc.value = value;
            } else {
                var setter = desc.set;

                if (setter !== undefined) {
                    setter.call(receiver, value);
                }
            }

            return value;
        };

        var toConsumableArray = function (arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

                return arr2;
            } else {
                return Array.from(arr);
            }
        };

        var Deferred = function Deferred() {
            var _this = this;

            classCallCheck(this, Deferred);

            this.promise = new Promise(function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
            });
        };

        var count = 0;

        function getUID() {
            return count++;
        }

        var getTransactionKey = function getTransactionKey(data) {
            return data.command + '(' + data.id + ')';
        };

        var SYNC_COMMAND = 'RNWV:sync';

        function createMessager(sendHandler) {
            var needWait = [];

            var transactions = {};
            var callbacks = {};
            var fn = {};

            function bind(name) {
                return function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    return send(name, args);
                };
            }

            function define(name, func) {
                callbacks[name] = function (args) {
                    return func.apply(undefined, toConsumableArray(args));
                };
                !needWait && sync();
                return { define: define, bind: bind };
            }

            /** sender parts */
            function sender(data) {
                var force = data.command == SYNC_COMMAND;
                if (!force && needWait) {
                    needWait.push(data);
                } else {
                    sendHandler(data);
                }
            }
            function initialize() {
                if (needWait) {
                    var waiting = needWait;
                    needWait = null;
                    waiting.forEach(function (payload) {
                        sender(payload);
                    });
                }
            }

            function send(command, data) {
                var payload = {
                    command: command, data: data, id: getUID(), reply: false
                };
                var defer = new Deferred();
                transactions[getTransactionKey(payload)] = defer;
                sender(payload);
                return defer.promise;
            }

            function reply(data, result) {
                data.reply = true;
                data.data = result;
                sender(data);
            }
            /** listener parts */
            function listener(data) {
                if (data.reply) {
                    var _key2 = getTransactionKey(data);
                    transactions[_key2] && transactions[_key2].resolve(data.data);
                } else {
                    if (callbacks[data.command]) {
                        var result = callbacks[data.command](data.data);
                        if (result && result.then) {
                            result.then(function (d) {
                                return reply(data, d);
                            });
                        } else {
                            reply(data, result);
                        }
                    } else {
                        reply(data, null);
                    }
                }
            }
            var __sync = bind(SYNC_COMMAND);
            function _sync() {
                var defines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                defines.filter(function (d) {
                    return !(d in fn);
                }).map(function (d) {
                    fn[d] = bind(d);
                });
                initialize();
                return Object.keys(callbacks);
            }
            define(SYNC_COMMAND, _sync);

            function sync() {
                __sync(Object.keys(callbacks)).then(_sync);
            }

            return { bind: bind, define: define, listener: listener, ready: sync, fn: fn };
        }

        var originalPostMessage = window['originalPostMessage'];

        var _createMessager = createMessager(function (data) {
            return window.postMessage(JSON.stringify(data));
        });
        var bind = _createMessager.bind;
        var define = _createMessager.define;
        var listener = _createMessager.listener;
        var ready = _createMessager.ready;
        var fn = _createMessager.fn;

        if (originalPostMessage) {
            ready();
        } else {
            var descriptor = {
                get: function get() {
                    return originalPostMessage;
                },
                set: function set(value) {
                    originalPostMessage = value;
                    if (originalPostMessage) {
                        setTimeout(ready, 50);
                    }
                }
            };
            Object.defineProperty(window, 'originalPostMessage', descriptor);
        }

        window.document.addEventListener('message', function (e) {
            return listener(JSON.parse(e.data));
        });


        // 闅忔満鏁�
        var hd = function() {
                return Math.round(2147483647 * Math.random()) },
            Bd = function() {
                try {
                    var a = new Uint32Array(1);
                    window.crypto.getRandomValues(a);
                    return a[0] & 2147483647 } catch (b) {
                    return hd() } };
        // encodeURIComponent缂栫爜
        var encode = function(a) {
            if (encodeURIComponent instanceof Function) return encodeURIComponent(a);
            return a };
        // decodeURIComponent瑙ｇ爜
        var decode = function(a) {
            if (decodeURIComponent instanceof Function) return decodeURIComponent(decodeURIComponent(a));
            return a };
        // 杩囨护鍦嗘嫭鍙�'()', 杩涜缂栫爜澶勭悊
        var strongEncode = function(a) {
            return encode(a).replace(/\(/g, "%28").replace(/\)/g, "%29") };

        // 鑾峰彇get queryString 瀛楃涓诧紝濡傦細?a=b&c=d&e=f
        var getQueryString = function(params) {
            var qs = JSON.stringify(params).replace(/^\{/, '').replace(/\}$/, '').replace(/( |"|)/g,'');
            var qsArr = qs.split(',').map(function(item, index) {
                var arr = item.split(':');
                return arr[0] + '=' + strongEncode(arr[1]);
            });
            qsArr.push('rnd=' + Bd())
            // alert(qsArr.join('&'))
            return qsArr.join('&');
        };

        window.browser = {
            bind: bind, define: define, fn: fn, qs: getQueryString
        };
        return;
    }else if(is_weixn()){
        var form = new FormData();
        form.append("url", window.location.href);
        fetch(`http://m.ocj.com.cn/event/fenx?ts=${new Date().getTime()}`,
            {
                method: "POST",
                body: form
            })
            .then(response => response.json())
            .then(data => {
                // var jsApiTicket=data.jsApiTicket;
                var noncestr=data.noncestr;
                var timestamp=data.timestamp;
                var signature=data.signature;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx3fb3c2f24d8ee8b7', // 必填，公众号的唯一标识
                    timestamp: window.parseInt(timestamp), // 必填，生成签名的时间戳
                    nonceStr:noncestr, // 必填，生成签名的随机串
                    signature:  signature,     // 必填，签名，见附录1
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline'
                        ,'onMenuShareAppMessage'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            })
            .catch(err=>console.log(err))
    }
}
export function shareapi(shareTitle,shareContent,shareimg,sharehref) {
    var img1 = shareimg?shareimg:"http://cdnimg.ocj.com.cn/common/html5/images/mevent/Activity-v2/fenxlogo.jpg";
    var title = shareTitle;
    var content = shareContent;
    var eventhref = sharehref?sharehref:window.location.href;
    if(!isNotSelfApp()){
        var picUrls = shareimg?shareimg:"http://cdnimg.ocj.com.cn/common/html5/images/mevent/Activity-v2/fenxlogo.jpg";
        var titles =  shareTitle?shareTitle:"精彩活动为您推荐，绝对不容错过！";
        var str = {
            action: 'share', // back login pay
            param:{
                image_url:picUrls,
                title:titles,
                content:shareContent,
                target_url:window.location.href
            }
        };
        window.location.href = window.location.href+"#"+JSON.stringify(str);
    }else if (is_weixn()){
        wx.ready(function () {
            // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
            wx.checkJsApi({
                jsApiList: [
                    'getNetworkType',
                    'previewImage',
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ],
                success: function (res) {
                }
            });

            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: content, // 分享描述
                link: eventhref , // 分享链接
                imgUrl: img1, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            //2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareTimeline({
                title: content,
                link:  eventhref,
                imgUrl:img1,
                success: function (res) {
                },
                cancel: function (res) {

                },fail: function (res) {

                }

            });

        });

        wx.error(function (res) {
        });
    }
}
export function isNotSelfApp() {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/OCJ/i) == "ocj") {
        return false;
    } else {
        return true;
    }
}

export function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}