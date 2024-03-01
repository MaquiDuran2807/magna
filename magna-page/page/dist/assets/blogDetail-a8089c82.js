import{e as Ft,j as s,r as be,u as Ht}from"./index-6bd21382.js";import{u as jt,B as zt,S as Bt}from"./sidebarBolgs-dc0d06a0.js";import"./index.esm-d3e98ac3.js";/*! @license DOMPurify 3.0.8 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.8/LICENSE */const{entries:dt,setPrototypeOf:st,isFrozen:Wt,getPrototypeOf:Gt,getOwnPropertyDescriptor:Ce}=Object;let{freeze:E,seal:y,create:ht}=Object,{apply:Ie,construct:we}=typeof Reflect<"u"&&Reflect;E||(E=function(n){return n});y||(y=function(n){return n});Ie||(Ie=function(n,c,a){return n.apply(c,a)});we||(we=function(n,c){return new n(...c)});const ae=R(Array.prototype.forEach),lt=R(Array.prototype.pop),V=R(Array.prototype.push),le=R(String.prototype.toLowerCase),ye=R(String.prototype.toString),Yt=R(String.prototype.match),q=R(String.prototype.replace),Xt=R(String.prototype.indexOf),$t=R(String.prototype.trim),N=R(RegExp.prototype.test),K=Vt(TypeError);function R(r){return function(n){for(var c=arguments.length,a=new Array(c>1?c-1:0),m=1;m<c;m++)a[m-1]=arguments[m];return Ie(r,n,a)}}function Vt(r){return function(){for(var n=arguments.length,c=new Array(n),a=0;a<n;a++)c[a]=arguments[a];return we(r,c)}}function l(r,n){let c=arguments.length>2&&arguments[2]!==void 0?arguments[2]:le;st&&st(r,null);let a=n.length;for(;a--;){let m=n[a];if(typeof m=="string"){const b=c(m);b!==m&&(Wt(n)||(n[a]=b),m=b)}r[m]=!0}return r}function qt(r){for(let n=0;n<r.length;n++)Ce(r,n)===void 0&&(r[n]=null);return r}function M(r){const n=ht(null);for(const[c,a]of dt(r))Ce(r,c)!==void 0&&(Array.isArray(a)?n[c]=qt(a):a&&typeof a=="object"&&a.constructor===Object?n[c]=M(a):n[c]=a);return n}function re(r,n){for(;r!==null;){const a=Ce(r,n);if(a){if(a.get)return R(a.get);if(typeof a.value=="function")return R(a.value)}r=Gt(r)}function c(a){return console.warn("fallback value for",a),null}return c}const ct=E(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Le=E(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),De=E(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Kt=E(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),xe=E(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Zt=E(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ft=E(["#text"]),ut=E(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),Oe=E(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),mt=E(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),se=E(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Qt=y(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Jt=y(/<%[\w\W]*|[\w\W]*%>/gm),en=y(/\${[\w\W]*}/gm),tn=y(/^data-[\-\w.\u00B7-\uFFFF]/),nn=y(/^aria-[\-\w]+$/),gt=y(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),on=y(/^(?:\w+script|data):/i),an=y(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Tt=y(/^html$/i);var pt=Object.freeze({__proto__:null,MUSTACHE_EXPR:Qt,ERB_EXPR:Jt,TMPLIT_EXPR:en,DATA_ATTR:tn,ARIA_ATTR:nn,IS_ALLOWED_URI:gt,IS_SCRIPT_OR_DATA:on,ATTR_WHITESPACE:an,DOCTYPE_NAME:Tt});const rn=function(){return typeof window>"u"?null:window},sn=function(n,c){if(typeof n!="object"||typeof n.createPolicy!="function")return null;let a=null;const m="data-tt-policy-suffix";c&&c.hasAttribute(m)&&(a=c.getAttribute(m));const b="dompurify"+(a?"#"+a:"");try{return n.createPolicy(b,{createHTML(O){return O},createScriptURL(O){return O}})}catch{return console.warn("TrustedTypes policy "+b+" could not be created."),null}};function _t(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:rn();const n=i=>_t(i);if(n.version="3.0.8",n.removed=[],!r||!r.document||r.document.nodeType!==9)return n.isSupported=!1,n;let{document:c}=r;const a=c,m=a.currentScript,{DocumentFragment:b,HTMLTemplateElement:O,Node:j,Element:Z,NodeFilter:z,NamedNodeMap:Me=r.NamedNodeMap||r.MozNamedAttrMap,HTMLFormElement:Q,DOMParser:B,trustedTypes:J}=r,ee=Z.prototype,Et=re(ee,"cloneNode"),At=re(ee,"nextSibling"),St=re(ee,"childNodes"),ce=re(ee,"parentNode");if(typeof O=="function"){const i=c.createElement("template");i.content&&i.content.ownerDocument&&(c=i.content.ownerDocument)}let _,W="";const{implementation:fe,createNodeIterator:Nt,createDocumentFragment:Rt,getElementsByTagName:bt}=c,{importNode:yt}=a;let L={};n.isSupported=typeof dt=="function"&&typeof ce=="function"&&fe&&fe.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ue,ERB_EXPR:me,TMPLIT_EXPR:pe,DATA_ATTR:Lt,ARIA_ATTR:Dt,IS_SCRIPT_OR_DATA:xt,ATTR_WHITESPACE:ve}=pt;let{IS_ALLOWED_URI:Pe}=pt,p=null;const ke=l({},[...ct,...Le,...De,...xe,...ft]);let d=null;const Ue=l({},[...ut,...Oe,...mt,...se]);let u=Object.seal(ht(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),G=null,de=null,Fe=!0,he=!0,He=!1,je=!0,v=!1,I=!1,ge=!1,Te=!1,P=!1,te=!1,ne=!1,ze=!0,Be=!1;const Ot="user-content-";let _e=!0,Y=!1,k={},U=null;const We=l({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ge=null;const Ye=l({},["audio","video","img","source","image","track"]);let Ee=null;const Xe=l({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),oe="http://www.w3.org/1998/Math/MathML",ie="http://www.w3.org/2000/svg",D="http://www.w3.org/1999/xhtml";let F=D,Ae=!1,Se=null;const It=l({},[oe,ie,D],ye);let X=null;const wt=["application/xhtml+xml","text/html"],Ct="text/html";let h=null,H=null;const Mt=c.createElement("form"),$e=function(e){return e instanceof RegExp||e instanceof Function},Ne=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(H&&H===e)){if((!e||typeof e!="object")&&(e={}),e=M(e),X=wt.indexOf(e.PARSER_MEDIA_TYPE)===-1?Ct:e.PARSER_MEDIA_TYPE,h=X==="application/xhtml+xml"?ye:le,p="ALLOWED_TAGS"in e?l({},e.ALLOWED_TAGS,h):ke,d="ALLOWED_ATTR"in e?l({},e.ALLOWED_ATTR,h):Ue,Se="ALLOWED_NAMESPACES"in e?l({},e.ALLOWED_NAMESPACES,ye):It,Ee="ADD_URI_SAFE_ATTR"in e?l(M(Xe),e.ADD_URI_SAFE_ATTR,h):Xe,Ge="ADD_DATA_URI_TAGS"in e?l(M(Ye),e.ADD_DATA_URI_TAGS,h):Ye,U="FORBID_CONTENTS"in e?l({},e.FORBID_CONTENTS,h):We,G="FORBID_TAGS"in e?l({},e.FORBID_TAGS,h):{},de="FORBID_ATTR"in e?l({},e.FORBID_ATTR,h):{},k="USE_PROFILES"in e?e.USE_PROFILES:!1,Fe=e.ALLOW_ARIA_ATTR!==!1,he=e.ALLOW_DATA_ATTR!==!1,He=e.ALLOW_UNKNOWN_PROTOCOLS||!1,je=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,v=e.SAFE_FOR_TEMPLATES||!1,I=e.WHOLE_DOCUMENT||!1,P=e.RETURN_DOM||!1,te=e.RETURN_DOM_FRAGMENT||!1,ne=e.RETURN_TRUSTED_TYPE||!1,Te=e.FORCE_BODY||!1,ze=e.SANITIZE_DOM!==!1,Be=e.SANITIZE_NAMED_PROPS||!1,_e=e.KEEP_CONTENT!==!1,Y=e.IN_PLACE||!1,Pe=e.ALLOWED_URI_REGEXP||gt,F=e.NAMESPACE||D,u=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&$e(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(u.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&$e(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(u.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(u.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),v&&(he=!1),te&&(P=!0),k&&(p=l({},ft),d=[],k.html===!0&&(l(p,ct),l(d,ut)),k.svg===!0&&(l(p,Le),l(d,Oe),l(d,se)),k.svgFilters===!0&&(l(p,De),l(d,Oe),l(d,se)),k.mathMl===!0&&(l(p,xe),l(d,mt),l(d,se))),e.ADD_TAGS&&(p===ke&&(p=M(p)),l(p,e.ADD_TAGS,h)),e.ADD_ATTR&&(d===Ue&&(d=M(d)),l(d,e.ADD_ATTR,h)),e.ADD_URI_SAFE_ATTR&&l(Ee,e.ADD_URI_SAFE_ATTR,h),e.FORBID_CONTENTS&&(U===We&&(U=M(U)),l(U,e.FORBID_CONTENTS,h)),_e&&(p["#text"]=!0),I&&l(p,["html","head","body"]),p.table&&(l(p,["tbody"]),delete G.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!="function")throw K('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw K('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');_=e.TRUSTED_TYPES_POLICY,W=_.createHTML("")}else _===void 0&&(_=sn(J,m)),_!==null&&typeof W=="string"&&(W=_.createHTML(""));E&&E(e),H=e}},Ve=l({},["mi","mo","mn","ms","mtext"]),qe=l({},["foreignobject","desc","title","annotation-xml"]),vt=l({},["title","style","font","a","script"]),Ke=l({},[...Le,...De,...Kt]),Ze=l({},[...xe,...Zt]),Pt=function(e){let t=ce(e);(!t||!t.tagName)&&(t={namespaceURI:F,tagName:"template"});const o=le(e.tagName),f=le(t.tagName);return Se[e.namespaceURI]?e.namespaceURI===ie?t.namespaceURI===D?o==="svg":t.namespaceURI===oe?o==="svg"&&(f==="annotation-xml"||Ve[f]):!!Ke[o]:e.namespaceURI===oe?t.namespaceURI===D?o==="math":t.namespaceURI===ie?o==="math"&&qe[f]:!!Ze[o]:e.namespaceURI===D?t.namespaceURI===ie&&!qe[f]||t.namespaceURI===oe&&!Ve[f]?!1:!Ze[o]&&(vt[o]||!Ke[o]):!!(X==="application/xhtml+xml"&&Se[e.namespaceURI]):!1},w=function(e){V(n.removed,{element:e});try{e.parentNode.removeChild(e)}catch{e.remove()}},Re=function(e,t){try{V(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch{V(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e==="is"&&!d[e])if(P||te)try{w(t)}catch{}else try{t.setAttribute(e,"")}catch{}},Qe=function(e){let t=null,o=null;if(Te)e="<remove></remove>"+e;else{const T=Yt(e,/^[\r\n\t ]+/);o=T&&T[0]}X==="application/xhtml+xml"&&F===D&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const f=_?_.createHTML(e):e;if(F===D)try{t=new B().parseFromString(f,X)}catch{}if(!t||!t.documentElement){t=fe.createDocument(F,"template",null);try{t.documentElement.innerHTML=Ae?W:f}catch{}}const g=t.body||t.documentElement;return e&&o&&g.insertBefore(c.createTextNode(o),g.childNodes[0]||null),F===D?bt.call(t,I?"html":"body")[0]:I?t.documentElement:g},Je=function(e){return Nt.call(e.ownerDocument||e,e,z.SHOW_ELEMENT|z.SHOW_COMMENT|z.SHOW_TEXT,null)},kt=function(e){return e instanceof Q&&(typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof Me)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function")},et=function(e){return typeof j=="function"&&e instanceof j},x=function(e,t,o){L[e]&&ae(L[e],f=>{f.call(n,t,o,H)})},tt=function(e){let t=null;if(x("beforeSanitizeElements",e,null),kt(e))return w(e),!0;const o=h(e.nodeName);if(x("uponSanitizeElement",e,{tagName:o,allowedTags:p}),e.hasChildNodes()&&!et(e.firstElementChild)&&N(/<[/\w]/g,e.innerHTML)&&N(/<[/\w]/g,e.textContent))return w(e),!0;if(!p[o]||G[o]){if(!G[o]&&ot(o)&&(u.tagNameCheck instanceof RegExp&&N(u.tagNameCheck,o)||u.tagNameCheck instanceof Function&&u.tagNameCheck(o)))return!1;if(_e&&!U[o]){const f=ce(e)||e.parentNode,g=St(e)||e.childNodes;if(g&&f){const T=g.length;for(let A=T-1;A>=0;--A)f.insertBefore(Et(g[A],!0),At(e))}}return w(e),!0}return e instanceof Z&&!Pt(e)||(o==="noscript"||o==="noembed"||o==="noframes")&&N(/<\/no(script|embed|frames)/i,e.innerHTML)?(w(e),!0):(v&&e.nodeType===3&&(t=e.textContent,ae([ue,me,pe],f=>{t=q(t,f," ")}),e.textContent!==t&&(V(n.removed,{element:e.cloneNode()}),e.textContent=t)),x("afterSanitizeElements",e,null),!1)},nt=function(e,t,o){if(ze&&(t==="id"||t==="name")&&(o in c||o in Mt))return!1;if(!(he&&!de[t]&&N(Lt,t))){if(!(Fe&&N(Dt,t))){if(!d[t]||de[t]){if(!(ot(e)&&(u.tagNameCheck instanceof RegExp&&N(u.tagNameCheck,e)||u.tagNameCheck instanceof Function&&u.tagNameCheck(e))&&(u.attributeNameCheck instanceof RegExp&&N(u.attributeNameCheck,t)||u.attributeNameCheck instanceof Function&&u.attributeNameCheck(t))||t==="is"&&u.allowCustomizedBuiltInElements&&(u.tagNameCheck instanceof RegExp&&N(u.tagNameCheck,o)||u.tagNameCheck instanceof Function&&u.tagNameCheck(o))))return!1}else if(!Ee[t]){if(!N(Pe,q(o,ve,""))){if(!((t==="src"||t==="xlink:href"||t==="href")&&e!=="script"&&Xt(o,"data:")===0&&Ge[e])){if(!(He&&!N(xt,q(o,ve,"")))){if(o)return!1}}}}}}return!0},ot=function(e){return e.indexOf("-")>0},it=function(e){x("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const o={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:d};let f=t.length;for(;f--;){const g=t[f],{name:T,namespaceURI:A,value:C}=g,$=h(T);let S=T==="value"?C:$t(C);if(o.attrName=$,o.attrValue=S,o.keepAttr=!0,o.forceKeepAttr=void 0,x("uponSanitizeAttribute",e,o),S=o.attrValue,o.forceKeepAttr||(Re(T,e),!o.keepAttr))continue;if(!je&&N(/\/>/i,S)){Re(T,e);continue}v&&ae([ue,me,pe],rt=>{S=q(S,rt," ")});const at=h(e.nodeName);if(nt(at,$,S)){if(Be&&($==="id"||$==="name")&&(Re(T,e),S=Ot+S),_&&typeof J=="object"&&typeof J.getAttributeType=="function"&&!A)switch(J.getAttributeType(at,$)){case"TrustedHTML":{S=_.createHTML(S);break}case"TrustedScriptURL":{S=_.createScriptURL(S);break}}try{A?e.setAttributeNS(A,T,S):e.setAttribute(T,S),lt(n.removed)}catch{}}}x("afterSanitizeAttributes",e,null)},Ut=function i(e){let t=null;const o=Je(e);for(x("beforeSanitizeShadowDOM",e,null);t=o.nextNode();)x("uponSanitizeShadowNode",t,null),!tt(t)&&(t.content instanceof b&&i(t.content),it(t));x("afterSanitizeShadowDOM",e,null)};return n.sanitize=function(i){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=null,o=null,f=null,g=null;if(Ae=!i,Ae&&(i="<!-->"),typeof i!="string"&&!et(i))if(typeof i.toString=="function"){if(i=i.toString(),typeof i!="string")throw K("dirty is not a string, aborting")}else throw K("toString is not a function");if(!n.isSupported)return i;if(ge||Ne(e),n.removed=[],typeof i=="string"&&(Y=!1),Y){if(i.nodeName){const C=h(i.nodeName);if(!p[C]||G[C])throw K("root node is forbidden and cannot be sanitized in-place")}}else if(i instanceof j)t=Qe("<!---->"),o=t.ownerDocument.importNode(i,!0),o.nodeType===1&&o.nodeName==="BODY"||o.nodeName==="HTML"?t=o:t.appendChild(o);else{if(!P&&!v&&!I&&i.indexOf("<")===-1)return _&&ne?_.createHTML(i):i;if(t=Qe(i),!t)return P?null:ne?W:""}t&&Te&&w(t.firstChild);const T=Je(Y?i:t);for(;f=T.nextNode();)tt(f)||(f.content instanceof b&&Ut(f.content),it(f));if(Y)return i;if(P){if(te)for(g=Rt.call(t.ownerDocument);t.firstChild;)g.appendChild(t.firstChild);else g=t;return(d.shadowroot||d.shadowrootmode)&&(g=yt.call(a,g,!0)),g}let A=I?t.outerHTML:t.innerHTML;return I&&p["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&N(Tt,t.ownerDocument.doctype.name)&&(A="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+A),v&&ae([ue,me,pe],C=>{A=q(A,C," ")}),_&&ne?_.createHTML(A):A},n.setConfig=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ne(i),ge=!0},n.clearConfig=function(){H=null,ge=!1},n.isValidAttribute=function(i,e,t){H||Ne({});const o=h(i),f=h(e);return nt(o,f,t)},n.addHook=function(i,e){typeof e=="function"&&(L[i]=L[i]||[],V(L[i],e))},n.removeHook=function(i){if(L[i])return lt(L[i])},n.removeHooks=function(i){L[i]&&(L[i]=[])},n.removeAllHooks=function(){L={}},n}var ln=_t();const mn=()=>{const{id:r}=Ft();if(!r)return s.jsx("p",{children:"No hay id"});const[n,c]=be.useState(null),{mutateAsync:a}=jt(),{data:m,isError:b,isLoading:O,refetch:j}=Ht({queryKey:["blogDetail"],staleTime:1e3*60*30,refetchOnWindowFocus:!1,refetchInterval:1e3*60*30,queryFn:()=>a({id:r})});if(be.useEffect(()=>{j()},[r]),be.useEffect(()=>{m&&c(m[0])},[m]),O)return s.jsx("p",{children:"Cargando..."});if(b)return s.jsx("p",{children:"Error"});if(!n)return s.jsx("p",{children:"No hay blog"});if(console.log(m,"blog detail"),console.log(n,"blogDetail"),n.author===void 0)return s.jsx("p",{children:"No hay blog"});const Z=ln.sanitize(n.content),z=/<img/g,Q=Z.replace(z,'<img class="img-fluid img-blog"').replace(/(<img [^>]*?)style="([^"]*?)(?:\bheight\s*:\s*[^;]*;?)([^"]*?)"([^>]*?>)/g,'$1style="$2$3"$4');return console.log(Q,"este es el newcomente"),s.jsxs("div",{className:"blog-container ",children:[s.jsx("br",{}),s.jsx(zt,{children:s.jsxs("div",{className:"container content-blog",children:[s.jsxs("div",{className:"row ",children:[s.jsxs("div",{className:"col-9 blog-izq",children:[s.jsxs("div",{className:"col-12 text-white text-center pt-3 pb-5 blog-banner",style:{backgroundImage:`url(${n.category.image})`},children:[s.jsx("h3",{children:"MagnaBlog"}),s.jsx("h6",{children:n.category.name})]}),s.jsxs("div",{className:"row header-post",children:[s.jsx("h2",{children:n.title}),s.jsxs("p",{className:"author",children:["Author: ",n.author.first_name+" "+n.author.last_name]}),s.jsxs("p",{children:["Fecha de publicación: ",new Date(n.date_posted).toDateString()]}),s.jsx("div",{className:"divider"})]}),s.jsx("div",{className:"row ",children:s.jsx("div",{className:"col-12",children:n.content&&s.jsx("div",{dangerouslySetInnerHTML:{__html:Q}})})}),s.jsxs("div",{className:"row coments",children:[s.jsx("h3",{children:"Comentarios"}),s.jsx("div",{className:"container",children:s.jsx("div",{className:"row",children:s.jsx("div",{className:"col-10",children:s.jsx("div",{className:"card",children:s.jsxs("div",{className:"card-body",children:[n.comments.map(B=>s.jsxs(s.Fragment,{children:[s.jsx("h5",{children:B.author.first_name+" "+B.author.last_name}),s.jsx("p",{children:B.text})]})),s.jsx("p",{className:"card-text",children:"Este es el comentario 1"})]})})})})})]})]}),s.jsx("div",{className:"col-3 blog-der",children:s.jsx(Bt,{})})]}),s.jsx("div",{className:"row",children:s.jsxs("p",{children:["Fecha de publicación: ",new Date(n.date_posted).toDateString()]})})]})})]})};export{mn as default};
