!function(e){"use strict";function t(e,t){function n(e){return t.bgcolor&&(e.style.backgroundColor=t.bgcolor),t.width&&(e.style.width=t.width+"px"),t.height&&(e.style.height=t.height+"px"),t.style&&Object.keys(t.style).forEach(function(n){e.style[n]=t.style[n]}),e}return t=t||{},u(t),Promise.resolve(e).then(function(e){return a(e,t.filter,!0)}).then(l).then(s).then(n).then(function(n){return f(n,t.width||p.width(e),t.height||p.height(e))})}function n(e,t){return c(e,t||{}).then(function(t){return t.getContext("2d").getImageData(0,0,p.width(e),p.height(e)).data})}function r(e,t){return c(e,t||{}).then(function(e){return e.toDataURL()})}function o(e,t){return t=t||{},c(e,t).then(function(e){return e.toDataURL("image/jpeg",t.quality||1)})}function i(e,t){return c(e,t||{}).then(p.canvasToBlob)}function u(e){b.impl.options.imagePlaceholder=void 0===e.imagePlaceholder?P.imagePlaceholder:e.imagePlaceholder,b.impl.options.cacheBust=void 0===e.cacheBust?P.cacheBust:e.cacheBust}function c(e,n){function r(e){var t=document.createElement("canvas");if(t.width=n.width||p.width(e),t.height=n.height||p.height(e),n.bgcolor){var r=t.getContext("2d");r.fillStyle=n.bgcolor,r.fillRect(0,0,t.width,t.height)}return t}return t(e,n).then(p.makeImage).then(p.delay(100)).then(function(t){var n=r(e);return n.getContext("2d").drawImage(t,0,0),n})}function a(e,t,n){function r(e){return e instanceof HTMLCanvasElement?p.makeImage(e.toDataURL()):e.cloneNode(!1)}function o(e,t,n){function r(e,t,n){var r=Promise.resolve();return t.forEach(function(t){r=r.then(function(){return a(t,n)}).then(function(t){t&&e.appendChild(t)})}),r}var o=e.childNodes;return 0===o.length?Promise.resolve(t):r(t,p.asArray(o),n).then(function(){return t})}function i(e,t){function n(){function n(e,t){function n(e,t){p.asArray(e).forEach(function(n){t.setProperty(n,e.getPropertyValue(n),e.getPropertyPriority(n))})}e.cssText?t.cssText=e.cssText:n(e,t)}n(window.getComputedStyle(e),t.style)}function r(){function n(n){function r(e,t,n){function r(e){var t=e.getPropertyValue("content");return e.cssText+" content: "+t+";"}function o(e){function t(t){return t+": "+e.getPropertyValue(t)+(e.getPropertyPriority(t)?" !important":"")}return p.asArray(e).map(t).join("; ")+";"}var i="."+e+":"+t,u=n.cssText?r(n):o(n);return document.createTextNode(i+"{"+u+"}")}var o=window.getComputedStyle(e,n),i=o.getPropertyValue("content");if(""!==i&&"none"!==i){var u=p.uid();t.className=t.className+" "+u;var c=document.createElement("style");c.appendChild(r(u,n,o)),t.appendChild(c)}}[":before",":after"].forEach(function(e){n(e)})}function o(){e instanceof HTMLTextAreaElement&&(t.innerHTML=e.value),e instanceof HTMLInputElement&&t.setAttribute("value",e.value)}function i(){t instanceof SVGElement&&(t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t instanceof SVGRectElement&&["width","height"].forEach(function(e){var n=t.getAttribute(e);n&&t.style.setProperty(e,n)}))}return t instanceof Element?Promise.resolve().then(n).then(r).then(o).then(i).then(function(){return t}):t}return n||!t||t(e)?Promise.resolve(e).then(r).then(function(n){return o(e,n,t)}).then(function(t){return i(e,t)}):Promise.resolve()}function l(e){return y.resolveAll().then(function(t){var n=document.createElement("style");return e.appendChild(n),n.appendChild(document.createTextNode(t)),e})}function s(e){return w.inlineAll(e).then(function(){return e})}function f(e,t,n){return Promise.resolve(e).then(function(e){return e.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),(new XMLSerializer).serializeToString(e)}).then(p.escapeXhtml).then(function(e){return'<foreignObject x="0" y="0" width="100%" height="100%">'+e+"</foreignObject>"}).then(function(e){return'<svg xmlns="http://www.w3.org/2000/svg" width="'+t+'" height="'+n+'">'+e+"</svg>"}).then(function(e){return"data:image/svg+xml;charset=utf-8,"+e})}function h(){function e(){var e="application/font-woff",t="image/jpeg";return{woff:e,woff2:e,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:t,jpeg:t,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml"}}function t(e){var t=/\.([^\.\/]*?)$/g.exec(e);return t?t[1]:""}function n(n){var r=t(n).toLowerCase();return e()[r]||""}function r(e){return-1!==e.search(/^(data:)/)}function o(e){return new Promise(function(t){for(var n=window.atob(e.toDataURL().split(",")[1]),r=n.length,o=new Uint8Array(r),i=0;r>i;i++)o[i]=n.charCodeAt(i);t(new Blob([o],{type:"image/png"}))})}function i(e){return e.toBlob?new Promise(function(t){e.toBlob(t)}):o(e)}function u(e,t){var n=document.implementation.createHTMLDocument(),r=n.createElement("base");n.head.appendChild(r);var o=n.createElement("a");return n.body.appendChild(o),r.href=t,o.href=e,o.href}function c(){var e=0;return function(){function t(){return("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).slice(-4)}return"u"+t()+e++}}function a(e){return new Promise(function(t,n){var r=new Image;r.onload=function(){t(r)},r.onerror=n,r.src=e})}function l(e){var t=3e4;return b.impl.options.cacheBust&&(e+=(/\?/.test(e)?"&":"?")+(new Date).getTime()),new Promise(function(n){function r(){if(4===u.readyState){if(200!==u.status)return void(c?n(c):i("cannot fetch resource: "+e+", status: "+u.status));var t=new FileReader;t.onloadend=function(){var e=t.result.split(/,/)[1];n(e)},t.readAsDataURL(u.response)}}function o(){c?n(c):i("timeout of "+t+"ms occured while fetching resource: "+e)}function i(e){console.error(e),n("")}var u=new XMLHttpRequest;u.onreadystatechange=r,u.ontimeout=o,u.responseType="blob",u.timeout=t,u.open("GET",e,!0),u.send();var c;if(b.impl.options.imagePlaceholder){var a=b.impl.options.imagePlaceholder.split(/,/);a&&a[1]&&(c=a[1])}})}function s(e,t){return"data:"+t+";base64,"+e}function f(e){return e.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1")}function h(e){return function(t){return new Promise(function(n){setTimeout(function(){n(t)},e)})}}function m(e){for(var t=[],n=e.length,r=0;n>r;r++)t.push(e[r]);return t}function d(e){return e.replace(/#/g,"%23").replace(/\n/g,"%0A")}function g(e){var t=v(e,"border-left-width"),n=v(e,"border-right-width");return e.scrollWidth+t+n}function p(e){var t=v(e,"border-top-width"),n=v(e,"border-bottom-width");return e.scrollHeight+t+n}function v(e,t){var n=window.getComputedStyle(e).getPropertyValue(t);return parseFloat(n.replace("px",""))}return{escape:f,parseExtension:t,mimeType:n,dataAsUrl:s,isDataUrl:r,canvasToBlob:i,resolveUrl:u,getAndEncode:l,uid:c(),delay:h,asArray:m,escapeXhtml:d,makeImage:a,width:g,height:p}}function m(){function e(e){return-1!==e.search(o)}function t(e){for(var t,n=[];null!==(t=o.exec(e));)n.push(t[1]);return n.filter(function(e){return!p.isDataUrl(e)})}function n(e,t,n,r){function o(e){return RegExp("(url\\(['\"]?)("+p.escape(e)+")(['\"]?\\))","g")}return Promise.resolve(t).then(function(e){return n?p.resolveUrl(e,n):e}).then(r||p.getAndEncode).then(function(e){return p.dataAsUrl(e,p.mimeType(t))}).then(function(n){return e.replace(o(t),"$1"+n+"$3")})}function r(r,o,i){function u(){return!e(r)}return u()?Promise.resolve(r):Promise.resolve(r).then(t).then(function(e){var t=Promise.resolve(r);return e.forEach(function(e){t=t.then(function(t){return n(t,e,o,i)})}),t})}var o=/url\(['"]?([^'"]+?)['"]?\)/g;return{inlineAll:r,shouldProcess:e,impl:{readUrls:t,inline:n}}}function d(){function e(){return t(document).then(function(e){return Promise.all(e.map(function(e){return e.resolve()}))}).then(function(e){return e.join("\n")})}function t(){function e(e){return e.filter(function(e){return e.type===CSSRule.FONT_FACE_RULE}).filter(function(e){return v.shouldProcess(e.style.getPropertyValue("src"))})}function t(e){var t=[];return e.forEach(function(e){try{p.asArray(e.cssRules||[]).forEach(t.push.bind(t))}catch(n){console.log("Error while reading CSS rules from "+e.href,""+n)}}),t}function n(e){return{resolve:function(){var t=(e.parentStyleSheet||{}).href;return v.inlineAll(e.cssText,t)},src:function(){return e.style.getPropertyValue("src")}}}return Promise.resolve(p.asArray(document.styleSheets)).then(t).then(e).then(function(e){return e.map(n)})}return{resolveAll:e,impl:{readAll:t}}}function g(){function e(e){function t(t){return p.isDataUrl(e.src)?Promise.resolve():Promise.resolve(e.src).then(t||p.getAndEncode).then(function(t){return p.dataAsUrl(t,p.mimeType(e.src))}).then(function(t){return new Promise(function(n,r){e.onload=n,e.onerror=r,e.src=t})})}return{inline:t}}function t(n){function r(e){var t=e.style.getPropertyValue("background");return t?v.inlineAll(t).then(function(t){e.style.setProperty("background",t,e.style.getPropertyPriority("background"))}).then(function(){return e}):Promise.resolve(e)}return n instanceof Element?r(n).then(function(){return n instanceof HTMLImageElement?e(n).inline():Promise.all(p.asArray(n.childNodes).map(function(e){return t(e)}))}):Promise.resolve(n)}return{inlineAll:t,impl:{newImage:e}}}var p=h(),v=m(),y=d(),w=g(),P={imagePlaceholder:void 0,cacheBust:!1},b={toSvg:t,toPng:r,toJpeg:o,toBlob:i,toPixelData:n,impl:{fontFaces:y,images:w,util:p,inliner:v,options:{}}};"undefined"!=typeof module?module.exports=b:e.domtoimage=b}(this);