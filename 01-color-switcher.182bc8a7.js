!function(){var t=document.querySelector("body"),e=document.querySelector("[data-start]"),r=document.querySelector("[data-stop]"),n=null,a=!1;r.setAttribute("disabled",""),e.addEventListener("click",(function(){if(a)return;a=!0,e.setAttribute("disabled",""),n=setInterval((function(){return t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),r.removeAttribute("disabled","")})),r.addEventListener("click",(function(){clearInterval(n),e.removeAttribute("disabled",""),r.setAttribute("disabled",""),a=!1}))}();
//# sourceMappingURL=01-color-switcher.182bc8a7.js.map
