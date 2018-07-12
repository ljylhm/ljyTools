var helper = require("./index");

var t = {
    a: {
        t: 1
    },
    b: 1
}

var t1 = {
    a: {
        t: 1,
        t2: {
            a: 123
        },
        t1: 2
    },
    b: 2
}

var t2 = {
    c: 123,
    a: {
        c: 2222
    },
}

var arr = [1, 2];

console.log(helper.merge({}, t, t1, t2));
