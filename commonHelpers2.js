import"./assets/modulepreload-polyfill-3cfb730f.js";import{i}from"./assets/vendor-77e16229.js";const n=document.querySelector(".form");n.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(n),s=parseInt(t.get("delay")),r=t.get("state");m(s,r).then(o=>{i.success({title:"Success",message:`✅ Fulfilled promise in ${o}ms`})}).catch(o=>{i.error({title:"Error",message:`❌ Rejected promise in ${o}ms`})})});function m(e,t){return new Promise((s,r)=>{setTimeout(()=>{t==="fulfilled"?s(e):r(e)},e)})}
//# sourceMappingURL=commonHelpers2.js.map
