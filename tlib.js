//      |---------------------------------------|
//      |                                       | 
//      |         TLIB (TINAGRITLIBRARY)        |
//      |            HTML DOM LIBRARY           |
//      |        (c) TinagritProject 2021       |
//      |             Minimal jQuery            |
//      |                                       |
//      |---------------------------------------|
//
//                 ** IMPORTANT **
//        IN YOUR PROJECT, DO NOT USE THESE 
//           RESTICTED VARIABLES BY TLIB 
//
//                    1.) tlib*
//                    2.) _tlib*
// 
//
//         Please read the tlib documentation
//      at /doc or https://tlib.tinagrit.com/doc
//
//              This is an open source
//



const tlib=(...tinagritlib)=>{if(isIE())return void _tlib.throw("TLIB doesn't support Internet Explorer, please change your browser");const s=tinagritlib;if("function"==typeof s[0])document.addEventListener("DOMContentLoaded",s[0]);else{if("string"==typeof s[0]){let e;return document.querySelectorAll(s[0])[1]?s[1]?(e=document.querySelectorAll(s[0])[s[1]],e.isObj=!1):(e=document.querySelectorAll(s[0]),e.isObj=!0):(e=document.querySelector(s[0]),e.isObj=!1),_tlib.imp(e),e}if(s[0]instanceof HTMLElement){const e=[s[0]];return e.isObj=!0,_tlib.imp(e),e}_tlib.throw("TLIB function can't have any arguments apart from function, string, and HTML element")}};tlib.json=(u,c)=>{var request=new XMLHttpRequest;request.open("GET",u,!0),request.onload=function(){if(this.status>=200&&this.status<400){var data=JSON.parse(this.response);c(data)}else _tlib.throw("The server returned an error")},request.onerror=function(){_tlib.throw("Can't reach the server")},request.send()},tlib.post=(u,d)=>{var request=new XMLHttpRequest;request.open("POST",u,!0),request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),request.send(d)},tlib.ajax=(m,u,d,c)=>{var request=new XMLHttpRequest;request.open(m,u,!0),request.onload=function(){this.status>=200&&this.status<400?c(this.response):_tlib.throw("The server returned an error")},request.onerror=function(){_tlib.throw("Can't reach the server")},"GET"===m?request.send():request.send(d)},tlib.now=t=>{let d;return d=t?new Date(t):new Date,d},tlib.parse=(f,c)=>{switch(f){case"html":var tmp=document.implementation.createHTMLDocument();return tmp.body.innerHTML=c,tmp.body.children;case"json":return JSON.parse(c);default:_tlib.throw("Can't parse anything apart from HTML and JSON")}},tlib.isArray=arr=>Array.isArray(arr);const _tlib={imp(e){e.css=(...cssProps)=>{if("string"==typeof cssProps[0])if(cssProps[1])if(cssProps[2])_tlib.throw("Provided more than 1 CSS value");else{const[prop,val]=cssProps;e.isObj?e.forEach(element=>{element.style[prop]=val}):e.isObj||(e.style[prop]=val)}else{if(!e.isObj)return getComputedStyle(e)[cssProps[0]];_tlib.throw("Can't get CSS value of an object")}else"object"==typeof cssProps[0]&&(cssProps[1]||Object.entries(cssProps[0]).forEach(([prop,val])=>{e.isObj?e.forEach(element=>{element.style[prop]=val}):e.isObj||(e.style[prop]=val)}))},e.on=(event,handler)=>{e.addEventListener(event,handler)},e.off=(event,handler)=>{e.removeEventListener(event,handler)},e.each=f=>{e.forEach((element,n)=>{const binded=f.bind(element);binded(n,element)})},e.attr=(a,v)=>{if(e.isObj)_tlib.throw("Can't get or set attribute of an object");else{if(!v)return e.getAttribute(a);e.setAttribute(a,v)}},e.class=()=>{if(!e.isObj)return e.className;_tlib.throw("Can't show classes with many elements")},e.class.add=c=>{e.isObj?e.forEach(element=>{element.classList.add(c)}):e.classList.add(c)},e.class.has=c=>{if(!e.isObj)return e.classList.contains(c);_tlib.throw("Can't HASCLASS with many elements")},e.class.remove=c=>{e.isObj?e.forEach(element=>{element.classList.remove(c)}):e.classList.remove(c)},e.class.toggle=c=>{e.isObj?e.forEach(element=>{element.classList.toggle(c)}):e.classList.toggle(c)},e.empty=()=>{for(;e.firstChild;)e.removeChild(e.firstChild)},e.remove=()=>{e.isObj?e.forEach(element=>{element.parentNode.removeChild(element)}):e.parentNode.removeChild(e)}},throw(err){console.error("TLIB ERROR: "+err)},css:""};function isIE(){var myNav=navigator.userAgent.toLowerCase();return-1!=myNav.indexOf("msie")&&parseInt(myNav.split("msie")[1])}
const _ = tlib