# ljyTools
<p style="border-bottom: 1px solid #eaecef"></p>

### 说明

写Js也有一段时间了，将平时和工作中遇到的一些繁琐的操作进行封装，在后面遇到的时候可以快速的调用。

###　Installation
<p style="border-bottom: 1px solid #eaecef"></p>

```javascript
$ npm i -g npm
$ npm i --save ljytools
```
### repositories 
<p style="border-bottom: 1px solid #eaecef"></p>

<b>仓库地址 :</b>

https://github.com/ljylhm/ljyTools.git

<p>git@github.com:ljylhm/ljyTools.git</p>

    
### import
<p style="border-bottom: 1px solid #eaecef"></p>

```javascript
var helper = require("ljytools");
helper.version // 0.0.2
```

### examples
<p style="border-bottom: 1px solid #eaecef"></p>

<b>getDataType</b> 

返回常用数据类型

`[Object Array]` `[Object String]` `[Object Number]` `[Object Object]` `.....`
```javascript
    var t = 1;
    helper.getDataType(t); // Number
    var s = "1";
    helper.getDataType(t); // String
```

<b>isNumber</b> 
```javascript
    var t = 123;
    helper.isNumber(t); // true
    var s = "张三";
    helper.isNumber(s); // false
```

<b>isBoolean</b> 
```javascript
    var t = true;
    helper.isBoolean(t); // true
    var s = "李四";
    helper.isNumber(s); // false
    var o = new Object();
    helper.isNumber(o); // false
```

<b>isString</b> 
```javascript
    var s = "李四";
    helper.isString(s); // true
    var n = 123;
    helper.isString(n); // false
```

<b>inBrowser</b> 

返回是否在浏览器环境

```javascript
   helper.inBrowser() // true 
```

<b>isEmptyObject</b>

检测是否为空对象

```javascript
   var o = new Object();
   helper.isEmptyObject(0) // true
   var t = {
       a:1
   } 
   helper.isEmptyObject(t) // false
```
<b>argrumentsCheck</b>

检测argruments是否存在并且不为0

```javascript
   var t = () => helper.isEmptyObject() 
   
   t() // false
   t(1,2) // true
```








  




