(function(f){var h,d;function g(k){k=k.toLowerCase();var j=/(chrome)[ \/]([\w.]+)/.exec(k)||/(webkit)[ \/]([\w.]+)/.exec(k)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(k)||/(msie) ([\w.]+)/.exec(k)||k.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(k)||[];return{browser:j[1]||"",version:j[2]||"0"}}if(!jQuery.browser){d=g(navigator.userAgent);h={};if(d.browser){h[d.browser]=true;h.version=d.version}if(h.chrome){h.webkit=true}else{if(h.webkit){h.safari=true}}jQuery.browser=h}f.skywarrior=f.skywarrior||{version:"1.0.0"};var b=navigator.userAgent.toLowerCase();var c=b.match(/(iphone|ipod|ipad)/)!==null;var e=!c&&b.match(/android ([^;]+)/);var i=b.match("webkit")!==null;if(e){e=e[1].split(/\./);e=parseFloat(e.shift()+"."+e.join(""))}else{e=false}var a=(c||e||b.match(/(android|blackberry|webOS|opera mobi)/)!==null);f.skywarrior.browser={iDev:c,android:e,mobile:a,webkit:i}}(jQuery));(function(y){var E={frameRate:150,animationTime:800,stepSize:100,pulseAlgorithm:true,pulseScale:8,pulseNormalize:1,accelerationDelta:20,accelerationMax:1,keyboardSupport:true,arrowScroll:50,touchpadSupport:true,fixedBackground:true,excluded:""};var t=E;var r=false;var p=false;var h={x:0,y:0};var b=false;var v=document.documentElement;var d;var z;var H=[120,120,120];var o={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36};function J(){var M=false;if(document.URL.indexOf("google.com/reader/view")>-1){M=true}if(t.excluded){var K=t.excluded.split(/[,\n] ?/);K.push("mail.google.com");for(var L=K.length;L--;){if(document.URL.indexOf(K[L])>-1){z&&z.disconnect();a("mousewheel",l);M=true;r=true;break}}}if(M){a("keydown",s)}if(t.keyboardSupport&&!M){f("keydown",s)}}function F(){if(!document.body){return}var P=document.body;var O=document.documentElement;var K=window.innerHeight;var T=P.scrollHeight;v=(document.compatMode.indexOf("CSS")>=0)?O:P;d=P;J();b=true;if(top!=self){p=true}else{if(T>K&&(P.offsetHeight<=K||O.offsetHeight<=K)){var L=false;var Q=function(){if(!L&&O.scrollHeight!=document.height){L=true;setTimeout(function(){O.style.height=document.height+"px";L=false},500)}};O.style.height="auto";setTimeout(Q,10);var N={attributes:true,childList:true,characterData:false};z=new w(Q);z.observe(P,N);if(v.offsetHeight<=K){var M=document.createElement("div");M.style.clear="both";P.appendChild(M)}}}if(document.URL.indexOf("mail.google.com")>-1){var S=document.createElement("style");S.innerHTML=".iu { visibility: hidden }";(document.getElementsByTagName("head")[0]||O).appendChild(S)}else{if(document.URL.indexOf("www.facebook.com")>-1){var R=document.getElementById("home_stream");R&&(R.style.webkitTransform="translateZ(0)")}}if(!t.fixedBackground&&!r){P.style.backgroundAttachment="scroll";O.style.backgroundAttachment="scroll"}}var A=[];var g=false;var m=+new Date;function G(N,M,R,O){O||(O=1000);x(M,R);if(t.accelerationMax!=1){var K=+new Date;var S=K-m;if(S<t.accelerationDelta){var P=(1+(30/S))/2;if(P>1){P=Math.min(P,t.accelerationMax);M*=P;R*=P}}m=+new Date}A.push({x:M,y:R,lastX:(M<0)?0.99:-0.99,lastY:(R<0)?0.99:-0.99,start:+new Date});if(g){return}var Q=(N===document.body);var L=function(U){var T=+new Date;var ab=0;var aa=0;for(var W=0;W<A.length;W++){var ad=A[W];var ac=T-ad.start;var V=(ac>=t.animationTime);var X=(V)?1:ac/t.animationTime;if(t.pulseAlgorithm){X=j(X)}var Z=(ad.x*X-ad.lastX)>>0;var Y=(ad.y*X-ad.lastY)>>0;ab+=Z;aa+=Y;ad.lastX+=Z;ad.lastY+=Y;if(V){A.splice(W,1);W--}}if(Q){window.scrollBy(ab,aa)}else{if(ab){N.scrollLeft+=ab}if(aa){N.scrollTop+=aa}}if(!M&&!R){A=[]}if(A.length){B(L,N,(O/t.frameRate+1))}else{g=false}};B(L,N,0);g=true}function l(N){if(!b){F()}var O=N.target;var M=C(O);if(!M||N.defaultPrevented||k(d,"embed")||(k(O,"embed")&&/\.pdf/i.test(O.src))){return true}var L=N.wheelDeltaX||0;var K=N.wheelDeltaY||0;if(!L&&!K){K=N.wheelDelta||0}if(!t.touchpadSupport&&I(K)){return true}if(Math.abs(L)>1.2){L*=t.stepSize/120}if(Math.abs(K)>1.2){K*=t.stepSize/120}G(M,-L,-K);N.preventDefault()}function s(L){var Q=L.target;var O=L.ctrlKey||L.altKey||L.metaKey||(L.shiftKey&&L.keyCode!==o.spacebar);if(/input|textarea|select|embed/i.test(Q.nodeName)||Q.isContentEditable||L.defaultPrevented||O){return true}if(k(Q,"button")&&L.keyCode===o.spacebar){return true}var M,S=0,R=0;var N=C(d);if(!N){return true}var P=N.clientHeight;if(N==document.body){P=window.innerHeight}switch(L.keyCode){case o.up:R=-t.arrowScroll;break;case o.down:R=t.arrowScroll;break;case o.spacebar:M=L.shiftKey?1:-1;R=-M*P*0.9;break;case o.pageup:R=-P*0.9;break;case o.pagedown:R=P*0.9;break;case o.home:R=-N.scrollTop;break;case o.end:var K=N.scrollHeight-N.scrollTop-P;R=(K>0)?K+10:0;break;case o.left:S=-t.arrowScroll;break;case o.right:S=t.arrowScroll;break;default:return true}G(N,S,R);L.preventDefault()}function n(K){d=K.target}var i={};setInterval(function(){i={}},10*1000);var u=(function(){var K=0;return function(L){return L.uniqueID||(L.uniqueID=K++)}})();function c(L,K){for(var M=L.length;M--;){i[u(L[M])]=K}return K}function C(N){var L=[];var K=v.scrollHeight;do{var M=i[u(N)];if(M){return c(L,M)}L.push(N);if(K===N.scrollHeight){if(!p||v.clientHeight+10<K){return c(L,document.body)}}else{if(N.clientHeight+10<N.scrollHeight){overflow=getComputedStyle(N,"").getPropertyValue("overflow-y");if(overflow==="scroll"||overflow==="auto"){return c(L,N)}}}}while(N=N.parentNode)}function f(M,L,K){window.addEventListener(M,L,(K||false))}function a(M,L,K){window.removeEventListener(M,L,(K||false))}function k(L,K){return(L.nodeName||"").toLowerCase()===K.toLowerCase()}function x(K,L){K=(K>0)?1:-1;L=(L>0)?1:-1;if(h.x!==K||h.y!==L){h.x=K;h.y=L;A=[];m=0}}var e;function I(K){if(!K){return}K=Math.abs(K);H.push(K);H.shift();clearTimeout(e);var M=(H[0]==H[1]&&H[1]==H[2]);var L=(q(H[0],120)&&q(H[1],120)&&q(H[2],120));return!(M||L)}function q(L,K){return(Math.floor(L/K)==L/K)}var B=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(M,L,K){window.setTimeout(M,K||(1000/60))}})();var w=window.MutationObserver||window.WebKitMutationObserver;function D(K){var M,N,L;K=K*t.pulseScale;if(K<1){M=K-(1-Math.exp(-K))}else{N=Math.exp(-1);K-=1;L=1-Math.exp(-K);M=N+(L*(1-N))}return M*t.pulseNormalize}function j(K){if(K>=1){return 1}if(K<=0){return 0}if(t.pulseNormalize==1){t.pulseNormalize/=D(1)}return D(K)}if((window.peSmoothScroll!==false)&&!y.skywarrior.browser.mobile&&y.browser.webkit&&(!y("html").hasClass("safari"))){f("mousedown",n);f("mousewheel",l);f("load",F)}}(jQuery));(function(){var a=[].indexOf||function(e){for(var d=0,c=this.length;d<c;d++){if(d in this&&this[d]===e){return d}}return-1},b=[].slice;(function(c,d){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(e){return d(e,c)})}else{return d(c.jQuery,c)}})(this,function(d,g){var p,n,q,s,j,e,f,k,i,t,h,m,r,o,c,l;p=d(g);k=a.call(g,"ontouchstart")>=0;s={horizontal:{},vertical:{}};j=1;f={};e="waypoints-context-id";h="resize.waypoints";m="scroll.waypoints";r=1;o="waypoints-waypoint-ids";c="waypoint";l="waypoints";n=(function(){function u(v){var w=this;this.$element=v;this.element=v[0];this.didResize=false;this.didScroll=false;this.id="context"+j++;this.oldScroll={x:v.scrollLeft(),y:v.scrollTop()};this.waypoints={horizontal:{},vertical:{}};v.data(e,this.id);f[this.id]=this;v.bind(m,function(){var x;if(!(w.didScroll||k)){w.didScroll=true;x=function(){w.doScroll();return w.didScroll=false};return g.setTimeout(x,d[l].settings.scrollThrottle)}});v.bind(h,function(){var x;if(!w.didResize){w.didResize=true;x=function(){d[l]("refresh");return w.didResize=false};return g.setTimeout(x,d[l].settings.resizeThrottle)}})}u.prototype.doScroll=function(){var v,w=this;v={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(k&&(!v.vertical.oldScroll||!v.vertical.newScroll)){d[l]("refresh")}d.each(v,function(z,y){var B,A,x;x=[];A=y.newScroll>y.oldScroll;B=A?y.forward:y.backward;d.each(w.waypoints[z],function(E,D){var F,C;if((y.oldScroll<(F=D.offset)&&F<=y.newScroll)){return x.push(D)}else{if((y.newScroll<(C=D.offset)&&C<=y.oldScroll)){return x.push(D)}}});x.sort(function(D,C){return D.offset-C.offset});if(!A){x.reverse()}return d.each(x,function(D,C){if(C.options.continuous||D===x.length-1){return C.trigger([B])}})});return this.oldScroll={x:v.horizontal.newScroll,y:v.vertical.newScroll}};u.prototype.refresh=function(){var x,v,w,y=this;w=d.isWindow(this.element);v=this.$element.offset();this.doScroll();x={horizontal:{contextOffset:w?0:v.left,contextScroll:w?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:w?0:v.top,contextScroll:w?0:this.oldScroll.y,contextDimension:w?d[l]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return d.each(x,function(A,z){return d.each(y.waypoints[A],function(F,C){var E,D,H,G,B;E=C.options.offset;H=C.offset;D=d.isWindow(C.element)?0:C.$element.offset()[z.offsetProp];if(d.isFunction(E)){E=E.apply(C.element)}else{if(typeof E==="string"){E=parseFloat(E);if(C.options.offset.indexOf("%")>-1){E=Math.ceil(z.contextDimension*E/100)}}}C.offset=D-z.contextOffset+z.contextScroll-E;if((C.options.onlyOnScroll&&(H!=null))||!C.enabled){return}if(H!==null&&(H<(G=z.oldScroll)&&G<=C.offset)){return C.trigger([z.backward])}else{if(H!==null&&(H>(B=z.oldScroll)&&B>=C.offset)){return C.trigger([z.forward])}else{if(H===null&&z.oldScroll>=C.offset){return C.trigger([z.forward])}}}})})};u.prototype.checkEmpty=function(){if(d.isEmptyObject(this.waypoints.horizontal)&&d.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([h,m].join(" "));return delete f[this.id]}};return u})();q=(function(){function u(v,x,w){var y,z;w=d.extend({},d.fn[c].defaults,w);if(w.offset==="bottom-in-view"){w.offset=function(){var A;A=d[l]("viewportHeight");if(!d.isWindow(x.element)){A=x.$element.height()}return A-d(this).outerHeight()}}this.$element=v;this.element=v[0];this.axis=w.horizontal?"horizontal":"vertical";this.callback=w.handler;this.context=x;this.enabled=w.enabled;this.id="waypoints"+r++;this.offset=null;this.options=w;x.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;y=(z=v.data(o))!=null?z:[];y.push(this.id);v.data(o,y)}u.prototype.trigger=function(v){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,v)}if(this.options.triggerOnce){return this.destroy()}};u.prototype.disable=function(){return this.enabled=false};u.prototype.enable=function(){this.context.refresh();return this.enabled=true};u.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};u.getWaypointsByElement=function(v){var x,w;w=d(v).data(o);if(!w){return[]}x=d.extend({},s.horizontal,s.vertical);return d.map(w,function(y){return x[y]})};return u})();t={init:function(w,u){var v;if(u==null){u={}}if((v=u.handler)==null){u.handler=w}this.each(function(){var A,z,y,x;A=d(this);y=(x=u.context)!=null?x:d.fn[c].defaults.context;if(!d.isWindow(y)){y=A.closest(y)}y=d(y);z=f[y.data(e)];if(!z){z=new n(y)}return new q(A,z,u)});d[l]("refresh");return this},disable:function(){return t._invoke(this,"disable")},enable:function(){return t._invoke(this,"enable")},destroy:function(){return t._invoke(this,"destroy")},prev:function(v,u){return t._traverse.call(this,v,u,function(w,x,y){if(x>0){return w.push(y[x-1])}})},next:function(v,u){return t._traverse.call(this,v,u,function(w,x,y){if(x<y.length-1){return w.push(y[x+1])}})},_traverse:function(x,v,w){var u,y;if(x==null){x="vertical"}if(v==null){v=g}y=i.aggregate(v);u=[];this.each(function(){var z;z=d.inArray(this,y[x]);return w(u,z,y[x])});return this.pushStack(u)},_invoke:function(u,v){u.each(function(){var w;w=q.getWaypointsByElement(this);return d.each(w,function(y,x){x[v]();return true})});return this}};d.fn[c]=function(){var u,v;v=arguments[0],u=2<=arguments.length?b.call(arguments,1):[];if(t[v]){return t[v].apply(this,u)}else{if(d.isFunction(v)){return t.init.apply(this,arguments)}else{if(d.isPlainObject(v)){return t.init.apply(this,[null,v])}else{if(!v){return d.error("jQuery Waypoints needs a callback function or handler option.")}else{return d.error("The "+v+" method does not exist in jQuery Waypoints.")}}}}};d.fn[c].defaults={context:g,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};i={refresh:function(){return d.each(f,function(v,u){return u.refresh()})},viewportHeight:function(){var u;return(u=g.innerHeight)!=null?u:p.height()},aggregate:function(x){var v,w,u;v=s;if(x){v=(u=f[d(x).data(e)])!=null?u.waypoints:void 0}if(!v){return[]}w={horizontal:[],vertical:[]};d.each(w,function(z,y){d.each(v[z],function(B,A){return y.push(A)});y.sort(function(B,A){return B.offset-A.offset});w[z]=d.map(y,function(A){return A.element});return w[z]=d.unique(w[z])});return w},above:function(u){if(u==null){u=g}return i._filter(u,"vertical",function(w,v){return v.offset<=w.oldScroll.y})},below:function(u){if(u==null){u=g}return i._filter(u,"vertical",function(w,v){return v.offset>w.oldScroll.y})},left:function(u){if(u==null){u=g}return i._filter(u,"horizontal",function(w,v){return v.offset<=w.oldScroll.x})},right:function(u){if(u==null){u=g}return i._filter(u,"horizontal",function(w,v){return v.offset>w.oldScroll.x})},enable:function(){return i._invoke("enable")},disable:function(){return i._invoke("disable")},destroy:function(){return i._invoke("destroy")},extendFn:function(u,v){return t[u]=v},_invoke:function(v){var u;u=d.extend({},s.vertical,s.horizontal);return d.each(u,function(x,w){w[v]();return true})},_filter:function(u,w,y){var v,x;v=f[d(u).data(e)];if(!v){return[]}x=[];d.each(v.waypoints[w],function(A,z){if(y(v,z)){return x.push(z)}});x.sort(function(A,z){return A.offset-z.offset});return d.map(x,function(z){return z.element})}};d[l]=function(){var u,v;v=arguments[0],u=2<=arguments.length?b.call(arguments,1):[];if(i[v]){return i[v].apply(null,u)}else{return i.aggregate.call(null,v)}};d[l].settings={resizeThrottle:100,scrollThrottle:30};return p.load(function(){return d[l]("refresh")})})}).call(this);