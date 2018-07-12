/**** 方法库 积累的常用的方法  ****/
var axios = require("axios");
// 时间转天数
var name = "Ljy";
var helper = {

    /* 版本号 */
    version: "0.0.2",
    /************************* 数据检测类 *******************************/

    /**
     *@description 获得被检测的数据类型
     *@param {any} obj 检测的数据
     *@return {String} 被检测的数据类型 
     */

    getDataType: function (obj) {
        var _type = "",
            _type_str = "";

        _type = Object.prototype.toString.call(obj);
        _type_str = _type.substring(8, _type.length - 1);

        return _type_str;
    },

    /**
     *@description 检测是否为数字类型
     *@param {number} num 检测的数据
     *@return boolean 被检测的数据类型 
     */

    isNumber: function (num) { // 检查是否为数字类型
        return this.getDataType(num) == "Number";
    },

    /**
     * @description 检测是否为布尔类型
     * @param {boolean} bol
     * @returns boolean 被检测的数据类型 
     */

    isBoolean: function (bol) { // 检查是否为布尔类型
        return this.getDataType(bol) == "Boolean";
    },

    /**
     * @description 检测是否为布尔类型
     * @param {String} str
     * @returns 检查是否为字符串类型
     */

    isString: function (str) {
        return this.getDataType(str) == "String";
    },

    /**
     * @description 检测是否在浏览器的环境中
     * @returns boolean
     */

    inBrowser: function () { // 检查是否在浏览器
        return typeof window !== 'undefined';
    },

    /**
     * @description 检测是否为空对象
     * @param {Object} obj
     * @returns {boolean}
     * 这种方法不能检测dom的点击事件 
     * 因为dom的点击事件会有一个e 
     * 这个事件不能检测到 这个方法以后会做兼容
    */

    isEmptyObject: function (obj) {
        if (this.getDataType(obj) == "Arguments") {
            if (obj.length <= 0) return true;
            else return false
        }
        for (var key in obj) {
            return false;
        }
        return true;
    },

    /**
    * @description 检测 argruments 是否存在且不为零
    * @returns {boolean}
    */
    argrumentsCheck: function () {
        if (this.isEmptyObject(arguments)) return false;
        for (var i in arguments) {
            if (!arguments[i] && arguments[i] != 0) {
                console.warn("name or value can not be null");
                return false;
            }
        }
        return true;
    },

    /************************* 浏览器存储 *******************************/

    /**
     * @description 对sessionStorage进行设置
     * @param {String} name
     * @param {String} value
     */

    sessionSet: function (name, value) {
        if (!this.argCheck(name, value)) return;
        sessionStorage.setItem(name, value);
    },

    /**
     * @description 得到sessionStorage的值
     * @param {String} name
     * @returns {String}
     */

    sessionGet: function (name) {
        if (!this.argCheck(name)) return window.sessionStorage;
        return sessionStorage.getItem(name);
    },

    /**
    * @description 清除sessionStorage
    * @param {String} name
    */

    sessionClear: function (name) {
        var sessionJson = window.sessionStorage;
        if (!this.argCheck(name) && !this.isEmptyObject(sessionJson)) {
            sessionJson.clear();
        }
        sessionJson.removeItem(name);
    },

    /**
     * @description 对localStroage进行设置
     * @param {String} name
     * @param {String} value
     * @returns
     */

    localStroageSet: function (name, value) {
        if (!this.argCheck(name, value)) return;
        localStorage.setItem(name, value);
    },

    /**
     * @description 获得localStroageGet的值
     * @param {String} name
     * @param {String} value
     * @returns
     */

    localStroageGet: function (name) {
        if (!this.argCheck(name)) return window.localStorage;
        localStorage.getItem(name);
    },

    /**
     * @description 清除localStroage
     * @param {String} name
     */

    localStroageClear: function (name) {
        var localStroageJson = window.localStroage;
        if (!this.argCheck(name) && !this.isEmptyObject(localStroageJson)) {
            localStroageJson.clear();
        }
        localStroageJson.removeItem(name);
    },
    /************************* 关于URL *******************************/

    /**
     * @description 返回当前页面完整的URl
     * @returns 页面的URL链接
     */

    getUrl: function () { // 返回完整的url
        return window.location.href;
    },

    /**
     * @description 获得当前页面的hash
     * @returns {String}
     */

    getHash: function () {
        var href = window.location.href
        var index = href.indexOf('#')
        return index === -1 ? '' : href.slice(index + 1)
    },

    /**
     * @description 为url添加Hash
     * @param {*} path
     * @returns
     */

    setHashUrl: function (path) { // path为hash
        var href = window.location.href
        var i = href.indexOf('#')
        var base = i >= 0 ? href.slice(0, i) : href
        return base + "#" + path
    },

    /************************* 时间戳 *******************************/
    /**
     * @description 时间戳转换为天数 时间戳皆转为毫秒
     * @param {String} timeStamp
     * @returns {String}
     */
    praseDays: function (timeStamp) {
        var tDayStamp = 1000 * 60 * 60 * 24;
        var tDiff = Math.floor(timeStamp / tDayStamp);
        return tDiff;
    },

    /**
     * @description 获取时间戳
     * @param {String} time
     * @returns {String}
     */

    getTimeStamp: function (time) {
        if (!time) return Math.round(new Date().getTime());
        else {
            if (this.getDataType(time) != "Date") {
                return Math.round(new Date(time).getTime());
            }
            return Math.round(time.getTime());
        }
    },

    /**
     * @description 转换为相差的天数 向下取整
     * @param {String} sDate1
     * @param {String} sDate2
     * @returns
     */

    transformDays: function (sDate1, sDate2) {
        sDate2 = sDate2 ? sDate2 : new Date();
        var _stamp1 = this.getTimeStamp(sDate1),
            _stamp2 = this.getTimeStamp(sDate2);
        return this.praseDays(Math.abs(_stamp1 - _stamp2));
    },

    /************************* http请求 *******************************/

    /**
     * @description http请求的拦截器
     * @param {Function} cb
     * http 请求的拦截器 暴露一个请求的内容给cb 一定要有返回值
     */
    httpReqInterceptr: function (cb) {
        axios.interceptors.request.use(cb)
    },

    /**
    * @description http请求返回的拦截器
    * @param {Function} cb
    * http 请求返回的拦截器 暴露一个请求的内容给cb 一定要有返回值
    */

    httpReqInterceptr: function (cb) {
        axios.interceptors.response.use(cb)
    },

    /**
     * @description http通用请求方法
     * @param {String} method
     * @param {String} url
     * @param {Object} data
     * @param {Object} options
     */

    http: function (method, url, data, options) {
        method = method || "GET";
        data = data || {};
        options = options || {};
        if (!url) console.error("[http]url is must");

        var params = {
            url: url,
            method: method,
            data: data,
            timeout: 2000,
        }

        params = Object.assign(params, options);
        return axios(params);
    },

    /**
     * @description GET请求方法
     * @param {String} url
     * @param {Object} data
     * @param {Object} opt
     */

    httpGet: function (url, data, opt) {
        var method = 'get';
        return this.http(method, url, data, opt);
    },

    /**
    * @description POST请求方法
    * @param {String} url
    * @param {Object} data
    * @param {Object} opt
    */

    httpPost: function (url, data, opt) {
        var method = 'post';
        return this.http(method, url, data, opt);
    },

    /************************* 字符串方法 *******************************/

    /**
     * @description 获得对应字符串的数量
     * @param {String} str1 要统计的长字符串
     * @param {String} str2 要统计的字符
     * @returns {num}
     */

    getCharNum: function (str1, str2) {
        if (!this.argCheck(arguments)) return 0;
        var reg = new RegExp(str2, "g");
        return str1.mathch(reg).length;
    },

    /************************* 对象的方法 *******************************/
    /**
     * @description 判断是否两个对象是否相等 值判断
     * @param {Object} obj1
     * @param {Object} obj2
     * @returns
     */
    isEql: function (obj1, obj2) {
        return JSON.stringify(obj1) == JSON.stringify(obj2);
    },

    /**
    * @description 合并两个对象
    * @param {Object} obj1
    * @param {Object} obj2
    * @returns {Object} 第一个对象被改变
    */

    baseMerge: function (obj1, obj2) {
        if (typeof (obj2) != "object") return;
        for (var i in obj2) {
            if (typeof (obj2[i]) == "object") {
                obj1[i] = obj1[i] || {};
                obj1[i] = this.baseMerge(obj1[i], obj2[i])
            } else {
                obj1[i] = obj1[i] || "";
                obj1[i] = obj2[i];
            }
        }
        return obj1;
    },

    /**
    * @description 合并多个参数
    * @param {Object} obj1
    * @param {Object} obj2
    * @returns {Object} 第一个对象被改变
    */

    merge: function () {
        let arg = Array.from(arguments),
            _baseData = arg[0];
        if (arg.length < 2) return arg;
        for (let i = 1, l = arg.length; i < l; i++) {
            _baseData = this.baseMerge(_baseData, arg[i]);
        }
        return _baseData;
    },

    /************************* 数组的方法 *******************************/

    /**
     * @description 对象的深拷贝方法
     * @param {any} obj
     * @returns {Object}
     */

    deepClone: function (obj) {
        if (typeof obj != "object") return obj;
        else {
            var newObj = new Object();
            Object.prototype = obj.prototype; // 保持原型链的完整 
            for (var i in obj) {
                newObj[i] = this.deepClone(obj[i]);
            }
            return newObj;
        }
    },

    /**
     * @description 数组的去重 数组选项中没有对象
     * @param {Array} arr
     * @returns
     */

    clearRepeate: function (arr) {
        return [...new Set(arr)];
    },

    /**
     * @description 数组的去重 数组选项中为对象
     * @param {Array} arr
     * @param {String} id
     * @returns {Array}
     */

    clearRepeateObj: function (arr, id) {
        var obj = {};
        var newArr = arr.reduce((pre, cur, index, arr) => {
            obj[cur[id]] ? "" : obj[cur[id]] = true && pre.push(cur);
            return pre;
        }, [])
        return newArr;
    },

    /**
     * @description 数字数组的求和
     * @param {Array} arr
     * @returns {Array}
     */

    arrSum: function (arr) {
        return arr.reduce((pre, cur) => {
            return pre + cur;
        });
    },

    /** 
    * @description 随机生成一个指定长度的数组
    * @param {Number}
    * @returns {Array}
    */

    outOrder: function (num) {
        var arr = new Array(num);
        for (var i = 0; i < num; i++) {
            arr[i] = Math.round((Math.random() * 1000));
        }
        return arr;
    },

    /**
     * @description 比较两个数组中不同的地方
     * @param {Array} a
     * @param {Array} b
     * @returns {Array}
     */

    difference: function (a, b) {
        var s = new Set(a);
        return b.filter((x) => !s.has(x));
    },
    /************************* 排序的方法 *******************************/

    /**
     * @description 交换数组元素
     * @param {String} arr
     * @param {Number} index1
     * @param {Number} index2
     */

    swap: function (arr, index1, index2) {
        var _tmp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = _tmp;
        return arr;
    },

    /**
     * @description 交换数组元素 ES6交换方法
     * @param {String} arr
     * @param {Number} index1
     * @param {Number} index2
     */

    swap1: function (arr, index1, index2) {
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
        return arr;
    },

    // 快速排序 阮一峰版快排 已被证明效率低下
    quickSort: function (arr, left, right) {
        if (arr.length < 2) return arr;
        var _mid = arr.splice(0, 1)[0];

        arr.forEach(function (ele, index, arr) {
            if (ele < _mid) left.push(ele);
            else right.push(ele);
        });
        return this.arrSort1(left, [], []).concat([_mid], this.arrSort1(right, [], []));
    },

    // 冒泡排序
    bubbleSort: function (arr) {
        for (var i = 0, len = arr.length; i < len; i++) {
            for (var j = 0; j < len - i; j++) {
                if (arr[j] > arr[j + 1]) this.swap(arr, j, j + 1)
            }
        }
    },

    // 选择排序
    selectSort: function (arr) {
        var _cursor = "";
        for (var i = 0, len = arr.length; i < len; i++) {
            _cursor = 0;
            for (var j = 0; j < len - i; j++) {
                _cursor = arr[j] > arr[_cursor] ? j : _cursor;
            };
            this.swap(arr, _cursor, len - i - 1);
        }
    },


    /************************* Window的方法 *******************************/

    /**
     * @description 获取和设置距离顶部的距离
     * @returns 当前滚动条的位置 
     */

    scrollTop: function () {
        var c = document.documentElement.scrollTop || document.body.scrollTop;
        if (!this.argCheck(arguments)) return c;
        var _arg = arguments[0];
        if (_arg && this.isNumber(_arg)) document.documentElement.scrollTop = document.body.scrollTop = _arg;
    },

    /**
     * @description 滚动到顶部
     */

    scrollToTop: function () { // 当前位置滑动到顶部
        var c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            var _ = this;
            window.requestAnimationFrame(function () { // requestAnimationFrame 本质其实是一个定时器);
                _.scrollToTop(hight);
            })
            window.scrollTo(0, c - c / 16);
        }
    },

    /**
     * @description 滚动到任意高度
     */

    scrollToHeight: function (height) { // 当前位置滑动到顶部
        var c = document.documentElement.scrollTop || document.body.scrollTop,
            flag = c > height ? true : false, // "up" : "down"
            _self = this;
        if (Math.abs(c - height) > 20) {
            window.requestAnimationFrame(function () {
                _self.scrollToHeight(height);
            })
            if (flag) window.scrollTo(0, c - 20);
            else window.scrollTo(0, c + 20);
        }
    }

};

module.exports = helper;