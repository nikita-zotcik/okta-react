"use strict";var precacheConfig=[["/index.html","56ce5729f1bf54c60ed1c69c44156e1b"],["/static/css/main.56e0ca86.css","8e2344e6032e11c2bfc46e91f965662a"],["/static/js/main.7e50f52b.js","94dfdcc0fb783dbeb64ddff3c64246ca"],["/static/media/brand-icons.13db00b7.eot","13db00b7a34fee4d819ab7f9838cc428"],["/static/media/brand-icons.a046592b.woff","a046592bac8f2fd96e994733faf3858c"],["/static/media/brand-icons.a1a749e8.svg","a1a749e89f578a49306ec2b055c073da"],["/static/media/brand-icons.c5ebe0b3.ttf","c5ebe0b32dc1b5cc449a76c4204d13bb"],["/static/media/brand-icons.e8c322de.woff2","e8c322de9658cbeb8a774b6624167c2c"],["/static/media/checkbox-01.7e720020.png","7e72002067c9047c205fdb3521176196"],["/static/media/checkbox-01@2x.d5554fe4.png","d5554fe41aed23e1e49f249f2f6bcfaa"],["/static/media/checkbox-sign-in-widget@2x.c8c02700.png","c8c027005764d43d83566d88f53844c9"],["/static/media/flags.9c74e172.png","9c74e172f87984c48ddf5c8108cabe67"],["/static/media/icons.0ab54153.woff2","0ab54153eeeca0ce03978cc463b257f7"],["/static/media/icons.8e3c7f55.eot","8e3c7f5520f5ae906c6cf6d7f3ddcd19"],["/static/media/icons.962a1bf3.svg","962a1bf31c081691065fe333d9fa8105"],["/static/media/icons.b87b9ba5.ttf","b87b9ba532ace76ae9f6edfe9f72ded2"],["/static/media/icons.faff9214.woff","faff92145777a3cbaf8e7367b4807987"],["/static/media/montserrat-light-webfont.6225f3ca.woff","6225f3ca44b83090833064727a09cc95"],["/static/media/montserrat-light-webfont.70df5da6.ttf","70df5da69722ec23336c227bf131d5ab"],["/static/media/montserrat-light-webfont.8cde2a0e.svg","8cde2a0e8a4a698a32a3b1c295b9fa8b"],["/static/media/montserrat-light-webfont.a11330db.eot","a11330db59d1e0d7b0935e86754b86be"],["/static/media/montserrat-regular-webfont.362ffe72.eot","362ffe720ba40be359302cab7f83c517"],["/static/media/montserrat-regular-webfont.69eac499.ttf","69eac499e9311b03ed69199e62ea962e"],["/static/media/montserrat-regular-webfont.6fedfc64.svg","6fedfc64a7bfbbb272c4e4d3b8597244"],["/static/media/montserrat-regular-webfont.8f2822b7.woff","8f2822b73b5f9c106c6f2e0db820bcbb"],["/static/media/okticon.243cd7ee.woff","243cd7ee2a2a856732c4f08f01c10f2c"],["/static/media/okticon.29829fe2.eot","29829fe24f3e733e970b05481ccc2305"],["/static/media/okticon.39aa3da8.svg","39aa3da8c027f0a2bceb8f26b4f5ad93"],["/static/media/okticon.51cc1de0.ttf","51cc1de00c0b9b83a649ad3cb5b15175"],["/static/media/outline-icons.701ae6ab.eot","701ae6abd4719e9c2ada3535a497b341"],["/static/media/outline-icons.82f60bd0.svg","82f60bd0b94a1ed68b1e6e309ce2e8c3"],["/static/media/outline-icons.ad97afd3.ttf","ad97afd3337e8cda302d10ff5a4026b8"],["/static/media/outline-icons.cd6c777f.woff2","cd6c777f1945164224dee082abaea03a"],["/static/media/outline-icons.ef60a4f6.woff","ef60a4f6c25ef7f39f2d25a748dbecfe"],["/static/media/radiobutton-01.c837a09b.png","c837a09b25ad85d682483da65dd6420e"],["/static/media/radiobutton-01@2x.dc47af40.png","dc47af40165cadf418a95b6a06964b2e"],["/static/media/sign-on-widget-spinner.eea28db2.gif","eea28db2b98f4df40b5608a54d0b9131"],["/static/media/u2f_usb.591cc98f.png","591cc98f43cbb68c10ddf345cb2d164e"],["/static/media/yubikeyDemo.f10c9db1.png","f10c9db1d9eb441f0bdaffce5bb672a1"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var n="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});