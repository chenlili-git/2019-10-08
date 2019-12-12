var a = {
    x: 1
};
var b = a;
a.c = a = {
    y: 1
};
console.log(a); // {y:1}
//--------------------------


console.log(a, b, c); //undefined undefined undefined
var a = 10,
    b = 20,
    c = 30;

function f(a) {
    console.log(a, b, c);//10 undefined 30
    var b = a = c = 100;  //a=100 window.c=100
    console.log(a, b, c) //100 100 100
}
f(10, 20);
console.log(a, b, c)//10 20 100



//----------------------------
var a 
function a() {}
a(); //1
var a = c = function () {
    console.log(2)
};
a(); //2
function a() {
    console.log(1)
};
a(); //2

//----------------------------
console.log(a);//undefined
var a = 12;

function fn() {
    console.log(a);//12
    a = 13;
}
fn();

//----------------
var foo = 1;

function bar() {
    console.log(foo);
    if (!foo) {
        var foo = 10;
    }
    console.log(foo);//10
}
bar();

//----------------------------

//----------------------------
function a() {
    console.log(1)
};

function c() {
    console.log(2)
}
(function (b) {
    b(); 
    c(); 
    var b = c = function a() {
        console.log(3)
    };

    function b() {
        console.log(4)
    }
    b(); 
})(a);
c();

//----------------------------------------------------
alert(a);
console.log("a" in window);
if (("a" in window)) {
    var a = 10;

    function fn() {
        console.log(3)
    }
}
console.log(a); 
console.log(fn()); 
if (8 == 8) {
    function fn() {
        console.log(2);
    }
}
console.log(fn()); 
//===============================
var n = 5;

function a(n) { // n 是私有的undefined
    n++;
    n = 10; 
    b();

    function b() {
        n++;
        alert(n);
    };
}
a();
alert(n);

//
var a = 3;

function c(a) {
    alert(a);
}
(function () {
    var a = 4;
    c(a); 
})();


//
var n = 10;

function fn() {
    var n = 20; 
    function f() {
        n++;
        console.log(n)
    };
    f();
    return f
}
var f = fn();
f();
f();
console.log(n);

//======================
var i = 1;

function fn(i) {
    return function (n) {
        console.log(n + (++i))
    }
}
var f = fn(2);
f(3);
fn(5)(6)
fn(3)(2)
f(4);

//
let i = 1;
let fn = function (n) {
    i *= 2;
    return function (m) {
        n++; // 自己练习
        i += n + m;
        console.log(i);
    }
};
let f = fn(2);
f(3);
fn(2)(3);
f(4);
f(5);



for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 2000);
}


for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1);
}
// {
//     let i = 0;
//     setTimeout(() => console.log(i), 1);
// }
// {
//     let i = 1;
//     setTimeout(() => console.log(i), 1);
// }
// {
//     let i = 2;
//     setTimeout(() => console.log(i), 1);
// }

// if(1<2){
//     let aaa = 123;
// }
// console.log(aaa)