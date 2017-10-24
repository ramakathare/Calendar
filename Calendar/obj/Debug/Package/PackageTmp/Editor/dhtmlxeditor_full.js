/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/
dhtmlx=function(obj){for (var a in obj)dhtmlx[a]=obj[a];return dhtmlx;};dhtmlx.extend_api=function(name,map,ext){var t = window[name];if (!t)return;window[name]=function(obj){if (obj && typeof obj == "object" && !obj.tagName){var that = t.apply(this,(map._init?map._init(obj):arguments));for (var a in dhtmlx)if (map[a])this[map[a]](dhtmlx[a]);for (var a in obj){if (map[a])this[map[a]](obj[a]);else if (a.indexOf("on")==0){this.attachEvent(a,obj[a]);}
 }
 }else
 var that = t.apply(this,arguments);if (map._patch)map._patch(this);return that||this;};window[name].prototype=t.prototype;if (ext)dhtmlXHeir(window[name].prototype,ext);};dhtmlxAjax={get:function(url,callback){var t=new dtmlXMLLoaderObject(true);t.async=(arguments.length<3);t.waitCall=callback;t.loadXML(url)
 return t;},
 post:function(url,post,callback){var t=new dtmlXMLLoaderObject(true);t.async=(arguments.length<4);t.waitCall=callback;t.loadXML(url,true,post)
 return t;},
 getSync:function(url){return this.get(url,null,true)
 },
 postSync:function(url,post){return this.post(url,post,null,true);}
}
function dtmlXMLLoaderObject(funcObject, dhtmlObject, async, rSeed){this.xmlDoc="";if (typeof (async)!= "undefined")
 this.async=async;else
 this.async=true;this.onloadAction=funcObject||null;this.mainObject=dhtmlObject||null;this.waitCall=null;this.rSeed=rSeed||false;return this;};dtmlXMLLoaderObject.count = 0;dtmlXMLLoaderObject.prototype.waitLoadFunction=function(dhtmlObject){var once = true;this.check=function (){if ((dhtmlObject)&&(dhtmlObject.onloadAction != null)){if ((!dhtmlObject.xmlDoc.readyState)||(dhtmlObject.xmlDoc.readyState == 4)){if (!once)return;once=false;dtmlXMLLoaderObject.count++;if (typeof dhtmlObject.onloadAction == "function")dhtmlObject.onloadAction(dhtmlObject.mainObject, null, null, null, dhtmlObject);if (dhtmlObject.waitCall){dhtmlObject.waitCall.call(this,dhtmlObject);dhtmlObject.waitCall=null;}
 }
 }
 };return this.check;};dtmlXMLLoaderObject.prototype.getXMLTopNode=function(tagName, oldObj){if (this.xmlDoc.responseXML){var temp = this.xmlDoc.responseXML.getElementsByTagName(tagName);if(temp.length==0 && tagName.indexOf(":")!=-1)
 var temp = this.xmlDoc.responseXML.getElementsByTagName((tagName.split(":"))[1]);var z = temp[0];}else
 var z = this.xmlDoc.documentElement;if (z){this._retry=false;return z;}
 if (!this._retry&&_isIE){this._retry=true;var oldObj = this.xmlDoc;this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/,""), true);return this.getXMLTopNode(tagName, oldObj);}
 dhtmlxError.throwError("LoadXML", "Incorrect XML", [
 (oldObj||this.xmlDoc),
 this.mainObject
 ]);return document.createElement("DIV");};dtmlXMLLoaderObject.prototype.loadXMLString=function(xmlString, silent){if (!_isIE){var parser = new DOMParser();this.xmlDoc=parser.parseFromString(xmlString, "text/xml");}else {this.xmlDoc=new ActiveXObject("Microsoft.XMLDOM");this.xmlDoc.async=this.async;this.xmlDoc.onreadystatechange = function(){};this.xmlDoc["loadXM"+"L"](xmlString);}
 
 if (silent)return;if (this.onloadAction)this.onloadAction(this.mainObject, null, null, null, this);if (this.waitCall){this.waitCall();this.waitCall=null;}
}
dtmlXMLLoaderObject.prototype.loadXML=function(filePath, postMode, postVars, rpc){if (this.rSeed)filePath+=((filePath.indexOf("?") != -1) ? "&" : "?")+"a_dhx_rSeed="+(new Date()).valueOf();this.filePath=filePath;if ((!_isIE)&&(window.XMLHttpRequest))
 this.xmlDoc=new XMLHttpRequest();else {this.xmlDoc=new ActiveXObject("Microsoft.XMLHTTP");}
 if (this.async)this.xmlDoc.onreadystatechange=new this.waitLoadFunction(this);this.xmlDoc.open(postMode ? "POST" : "GET", filePath, this.async);if (rpc){this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 ("+navigator.userAgent+")");this.xmlDoc.setRequestHeader("Content-type", "text/xml");}
 else if (postMode)this.xmlDoc.setRequestHeader('Content-type', (this.contenttype || 'application/x-www-form-urlencoded'));this.xmlDoc.setRequestHeader("X-Requested-With","XMLHttpRequest");this.xmlDoc.send(null||postVars);if (!this.async)(new this.waitLoadFunction(this))();};dtmlXMLLoaderObject.prototype.destructor=function(){this._filterXPath = null;this._getAllNamedChilds = null;this._retry = null;this.async = null;this.rSeed = null;this.filePath = null;this.onloadAction = null;this.mainObject = null;this.xmlDoc = null;this.doXPath = null;this.doXPathOpera = null;this.doXSLTransToObject = null;this.doXSLTransToString = null;this.loadXML = null;this.loadXMLString = null;this.doSerialization = null;this.xmlNodeToJSON = null;this.getXMLTopNode = null;this.setXSLParamValue = null;return null;}
dtmlXMLLoaderObject.prototype.xmlNodeToJSON = function(node){var t={};for (var i=0;i<node.attributes.length;i++)t[node.attributes[i].name]=node.attributes[i].value;t["_tagvalue"]=node.firstChild?node.firstChild.nodeValue:"";for (var i=0;i<node.childNodes.length;i++){var name=node.childNodes[i].tagName;if (name){if (!t[name])t[name]=[];t[name].push(this.xmlNodeToJSON(node.childNodes[i]));}
 }
 return t;}
function callerFunction(funcObject, dhtmlObject){this.handler=function(e){if (!e)e=window.event;funcObject(e, dhtmlObject);return true;};return this.handler;};function getAbsoluteLeft(htmlObject){return getOffset(htmlObject).left;}
function getAbsoluteTop(htmlObject){return getOffset(htmlObject).top;}
function getOffsetSum(elem) {var top=0, left=0;while(elem){top = top + parseInt(elem.offsetTop);left = left + parseInt(elem.offsetLeft);elem = elem.offsetParent;}
 return {top: top, left: left};}
function getOffsetRect(elem) {var box = elem.getBoundingClientRect();var body = document.body;var docElem = document.documentElement;var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;var clientTop = docElem.clientTop || body.clientTop || 0;var clientLeft = docElem.clientLeft || body.clientLeft || 0;var top = box.top + scrollTop - clientTop;var left = box.left + scrollLeft - clientLeft;return {top: Math.round(top), left: Math.round(left) };}
function getOffset(elem) {if (elem.getBoundingClientRect){return getOffsetRect(elem);}else {return getOffsetSum(elem);}
}
function convertStringToBoolean(inputString){if (typeof (inputString)== "string")
 inputString=inputString.toLowerCase();switch (inputString){case "1":
 case "true":
 case "yes":
 case "y":
 case 1:
 case true:
 return true;break;default: return false;}
}
function getUrlSymbol(str){if (str.indexOf("?")!= -1)
 return "&"
 else
 return "?"
}
function dhtmlDragAndDropObject(){if (window.dhtmlDragAndDrop)return window.dhtmlDragAndDrop;this.lastLanding=0;this.dragNode=0;this.dragStartNode=0;this.dragStartObject=0;this.tempDOMU=null;this.tempDOMM=null;this.waitDrag=0;window.dhtmlDragAndDrop=this;return this;};dhtmlDragAndDropObject.prototype.removeDraggableItem=function(htmlNode){htmlNode.onmousedown=null;htmlNode.dragStarter=null;htmlNode.dragLanding=null;}
dhtmlDragAndDropObject.prototype.addDraggableItem=function(htmlNode, dhtmlObject){htmlNode.onmousedown=this.preCreateDragCopy;htmlNode.dragStarter=dhtmlObject;this.addDragLanding(htmlNode, dhtmlObject);}
dhtmlDragAndDropObject.prototype.addDragLanding=function(htmlNode, dhtmlObject){htmlNode.dragLanding=dhtmlObject;}
dhtmlDragAndDropObject.prototype.preCreateDragCopy=function(e){if ((e||window.event)&& (e||event).button == 2)
 return;if (window.dhtmlDragAndDrop.waitDrag){window.dhtmlDragAndDrop.waitDrag=0;document.body.onmouseup=window.dhtmlDragAndDrop.tempDOMU;document.body.onmousemove=window.dhtmlDragAndDrop.tempDOMM;return false;}
 
 if (window.dhtmlDragAndDrop.dragNode)window.dhtmlDragAndDrop.stopDrag(e);window.dhtmlDragAndDrop.waitDrag=1;window.dhtmlDragAndDrop.tempDOMU=document.body.onmouseup;window.dhtmlDragAndDrop.tempDOMM=document.body.onmousemove;window.dhtmlDragAndDrop.dragStartNode=this;window.dhtmlDragAndDrop.dragStartObject=this.dragStarter;document.body.onmouseup=window.dhtmlDragAndDrop.preCreateDragCopy;document.body.onmousemove=window.dhtmlDragAndDrop.callDrag;window.dhtmlDragAndDrop.downtime = new Date().valueOf();if ((e)&&(e.preventDefault)){e.preventDefault();return false;}
 return false;};dhtmlDragAndDropObject.prototype.callDrag=function(e){if (!e)e=window.event;dragger=window.dhtmlDragAndDrop;if ((new Date()).valueOf()-dragger.downtime<100) return;if (!dragger.dragNode){if (dragger.waitDrag){dragger.dragNode=dragger.dragStartObject._createDragNode(dragger.dragStartNode, e);if (!dragger.dragNode)return dragger.stopDrag();dragger.dragNode.onselectstart=function(){return false;}
 dragger.gldragNode=dragger.dragNode;document.body.appendChild(dragger.dragNode);document.body.onmouseup=dragger.stopDrag;dragger.waitDrag=0;dragger.dragNode.pWindow=window;dragger.initFrameRoute();}
 else return dragger.stopDrag(e, true);}
 if (dragger.dragNode.parentNode != window.document.body && dragger.gldragNode){var grd = dragger.gldragNode;if (dragger.gldragNode.old)grd=dragger.gldragNode.old;grd.parentNode.removeChild(grd);var oldBody = dragger.dragNode.pWindow;if (grd.pWindow && grd.pWindow.dhtmlDragAndDrop.lastLanding)grd.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(grd.pWindow.dhtmlDragAndDrop.lastLanding);if (_isIE){var div = document.createElement("Div");div.innerHTML=dragger.dragNode.outerHTML;dragger.dragNode=div.childNodes[0];}else
 dragger.dragNode=dragger.dragNode.cloneNode(true);dragger.dragNode.pWindow=window;dragger.gldragNode.old=dragger.dragNode;document.body.appendChild(dragger.dragNode);oldBody.dhtmlDragAndDrop.dragNode=dragger.dragNode;}
 dragger.dragNode.style.left=e.clientX+15+(dragger.fx
 ? dragger.fx*(-1)
 : 0)
 +(document.body.scrollLeft||document.documentElement.scrollLeft)+"px";dragger.dragNode.style.top=e.clientY+3+(dragger.fy
 ? dragger.fy*(-1)
 : 0)
 +(document.body.scrollTop||document.documentElement.scrollTop)+"px";if (!e.srcElement)var z = e.target;else
 z=e.srcElement;dragger.checkLanding(z, e);}
dhtmlDragAndDropObject.prototype.calculateFramePosition=function(n){if (window.name){var el = parent.frames[window.name].frameElement.offsetParent;var fx = 0;var fy = 0;while (el){fx+=el.offsetLeft;fy+=el.offsetTop;el=el.offsetParent;}
 if ((parent.dhtmlDragAndDrop)){var ls = parent.dhtmlDragAndDrop.calculateFramePosition(1);fx+=ls.split('_')[0]*1;fy+=ls.split('_')[1]*1;}
 if (n)return fx+"_"+fy;else
 this.fx=fx;this.fy=fy;}
 return "0_0";}
dhtmlDragAndDropObject.prototype.checkLanding=function(htmlObject, e){if ((htmlObject)&&(htmlObject.dragLanding)){if (this.lastLanding)this.lastLanding.dragLanding._dragOut(this.lastLanding);this.lastLanding=htmlObject;this.lastLanding=this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, e.clientX,
 e.clientY, e);this.lastLanding_scr=(_isIE ? e.srcElement : e.target);}else {if ((htmlObject)&&(htmlObject.tagName != "BODY"))
 this.checkLanding(htmlObject.parentNode, e);else {if (this.lastLanding)this.lastLanding.dragLanding._dragOut(this.lastLanding, e.clientX, e.clientY, e);this.lastLanding=0;if (this._onNotFound)this._onNotFound();}
 }
}
dhtmlDragAndDropObject.prototype.stopDrag=function(e, mode){dragger=window.dhtmlDragAndDrop;if (!mode){dragger.stopFrameRoute();var temp = dragger.lastLanding;dragger.lastLanding=null;if (temp)temp.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject, temp, (_isIE
 ? event.srcElement
 : e.target));}
 dragger.lastLanding=null;if ((dragger.dragNode)&&(dragger.dragNode.parentNode == document.body))
 dragger.dragNode.parentNode.removeChild(dragger.dragNode);dragger.dragNode=0;dragger.gldragNode=0;dragger.fx=0;dragger.fy=0;dragger.dragStartNode=0;dragger.dragStartObject=0;document.body.onmouseup=dragger.tempDOMU;document.body.onmousemove=dragger.tempDOMM;dragger.tempDOMU=null;dragger.tempDOMM=null;dragger.waitDrag=0;}
dhtmlDragAndDropObject.prototype.stopFrameRoute=function(win){if (win)window.dhtmlDragAndDrop.stopDrag(1, 1);for (var i = 0;i < window.frames.length;i++){try{if ((window.frames[i] != win)&&(window.frames[i].dhtmlDragAndDrop))
 window.frames[i].dhtmlDragAndDrop.stopFrameRoute(window);}catch(e){}
 }
 try{if ((parent.dhtmlDragAndDrop)&&(parent != window)&&(parent != win))
 parent.dhtmlDragAndDrop.stopFrameRoute(window);}catch(e){}
}
dhtmlDragAndDropObject.prototype.initFrameRoute=function(win, mode){if (win){window.dhtmlDragAndDrop.preCreateDragCopy();window.dhtmlDragAndDrop.dragStartNode=win.dhtmlDragAndDrop.dragStartNode;window.dhtmlDragAndDrop.dragStartObject=win.dhtmlDragAndDrop.dragStartObject;window.dhtmlDragAndDrop.dragNode=win.dhtmlDragAndDrop.dragNode;window.dhtmlDragAndDrop.gldragNode=win.dhtmlDragAndDrop.dragNode;window.document.body.onmouseup=window.dhtmlDragAndDrop.stopDrag;window.waitDrag=0;if (((!_isIE)&&(mode))&&((!_isFF)||(_FFrv < 1.8)))
 window.dhtmlDragAndDrop.calculateFramePosition();}
 try{if ((parent.dhtmlDragAndDrop)&&(parent != window)&&(parent != win))
 parent.dhtmlDragAndDrop.initFrameRoute(window);}catch(e){}
 for (var i = 0;i < window.frames.length;i++){try{if ((window.frames[i] != win)&&(window.frames[i].dhtmlDragAndDrop))
 window.frames[i].dhtmlDragAndDrop.initFrameRoute(window, ((!win||mode) ? 1 : 0));}catch(e){}
 }
}
 _isFF = false;_isIE = false;_isOpera = false;_isKHTML = false;_isMacOS = false;_isChrome = false;_FFrv = false;_KHTMLrv = false;_OperaRv = false;if (navigator.userAgent.indexOf('Macintosh')!= -1)
 _isMacOS=true;if (navigator.userAgent.toLowerCase().indexOf('chrome')>-1)
 _isChrome=true;if ((navigator.userAgent.indexOf('Safari')!= -1)||(navigator.userAgent.indexOf('Konqueror') != -1)){_KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf('Safari')+7, 5));if (_KHTMLrv > 525){_isFF=true;_FFrv = 1.9;}else
 _isKHTML=true;}else if (navigator.userAgent.indexOf('Opera')!= -1){_isOpera=true;_OperaRv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf('Opera')+6, 3));}
else if (navigator.appName.indexOf("Microsoft")!= -1){_isIE=true;if ((navigator.appVersion.indexOf("MSIE 8.0")!= -1 || navigator.appVersion.indexOf("MSIE 9.0")!= -1 || navigator.appVersion.indexOf("MSIE 10.0")!= -1 ) && document.compatMode != "BackCompat"){_isIE=8;}
}else {_isFF=true;_FFrv = parseFloat(navigator.userAgent.split("rv:")[1])
}
dtmlXMLLoaderObject.prototype.doXPath=function(xpathExp, docObj, namespace, result_type){if (_isKHTML || (!_isIE && !window.XPathResult))
 return this.doXPathOpera(xpathExp, docObj);if (_isIE){if (!docObj)if (!this.xmlDoc.nodeName)docObj=this.xmlDoc.responseXML
 else
 docObj=this.xmlDoc;if (!docObj)dhtmlxError.throwError("LoadXML", "Incorrect XML", [
 (docObj||this.xmlDoc),
 this.mainObject
 ]);if (namespace != null)docObj.setProperty("SelectionNamespaces", "xmlns:xsl='"+namespace+"'");if (result_type == 'single'){return docObj.selectSingleNode(xpathExp);}
 else {return docObj.selectNodes(xpathExp)||new Array(0);}
 }else {var nodeObj = docObj;if (!docObj){if (!this.xmlDoc.nodeName){docObj=this.xmlDoc.responseXML
 }
 else {docObj=this.xmlDoc;}
 }
 if (!docObj)dhtmlxError.throwError("LoadXML", "Incorrect XML", [
 (docObj||this.xmlDoc),
 this.mainObject
 ]);if (docObj.nodeName.indexOf("document")!= -1){nodeObj=docObj;}
 else {nodeObj=docObj;docObj=docObj.ownerDocument;}
 var retType = XPathResult.ANY_TYPE;if (result_type == 'single')retType=XPathResult.FIRST_ORDERED_NODE_TYPE
 var rowsCol = new Array();var col = docObj.evaluate(xpathExp, nodeObj, function(pref){return namespace
 }, retType, null);if (retType == XPathResult.FIRST_ORDERED_NODE_TYPE){return col.singleNodeValue;}
 var thisColMemb = col.iterateNext();while (thisColMemb){rowsCol[rowsCol.length]=thisColMemb;thisColMemb=col.iterateNext();}
 return rowsCol;}
}
function _dhtmlxError(type, name, params){if (!this.catches)this.catches=new Array();return this;}
_dhtmlxError.prototype.catchError=function(type, func_name){this.catches[type]=func_name;}
_dhtmlxError.prototype.throwError=function(type, name, params){if (this.catches[type])return this.catches[type](type, name, params);if (this.catches["ALL"])return this.catches["ALL"](type, name, params);alert("Error type: "+arguments[0]+"\nDescription: "+arguments[1]);return null;}
window.dhtmlxError=new _dhtmlxError();dtmlXMLLoaderObject.prototype.doXPathOpera=function(xpathExp, docObj){var z = xpathExp.replace(/[\/]+/gi, "/").split('/');var obj = null;var i = 1;if (!z.length)return [];if (z[0] == ".")obj=[docObj];else if (z[0] == ""){obj=(this.xmlDoc.responseXML||this.xmlDoc).getElementsByTagName(z[i].replace(/\[[^\]]*\]/g, ""));i++;}else
 return [];for (i;i < z.length;i++)obj=this._getAllNamedChilds(obj, z[i]);if (z[i-1].indexOf("[")!= -1)
 obj=this._filterXPath(obj, z[i-1]);return obj;}
dtmlXMLLoaderObject.prototype._filterXPath=function(a, b){var c = new Array();var b = b.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, "");for (var i = 0;i < a.length;i++)if (a[i].getAttribute(b))
 c[c.length]=a[i];return c;}
dtmlXMLLoaderObject.prototype._getAllNamedChilds=function(a, b){var c = new Array();if (_isKHTML)b=b.toUpperCase();for (var i = 0;i < a.length;i++)for (var j = 0;j < a[i].childNodes.length;j++){if (_isKHTML){if (a[i].childNodes[j].tagName&&a[i].childNodes[j].tagName.toUpperCase()== b)
 c[c.length]=a[i].childNodes[j];}
 else if (a[i].childNodes[j].tagName == b)c[c.length]=a[i].childNodes[j];}
 return c;}
function dhtmlXHeir(a, b){for (var c in b)if (typeof (b[c])== "function")
 a[c]=b[c];return a;}
function dhtmlxEvent(el, event, handler){if (el.addEventListener)el.addEventListener(event, handler, false);else if (el.attachEvent)el.attachEvent("on"+event, handler);}
dtmlXMLLoaderObject.prototype.xslDoc=null;dtmlXMLLoaderObject.prototype.setXSLParamValue=function(paramName, paramValue, xslDoc){if (!xslDoc)xslDoc=this.xslDoc

 if (xslDoc.responseXML)xslDoc=xslDoc.responseXML;var item =
 this.doXPath("/xsl:stylesheet/xsl:variable[@name='"+paramName+"']", xslDoc,
 "http:/\/www.w3.org/1999/XSL/Transform", "single");if (item != null)item.firstChild.nodeValue=paramValue
}
dtmlXMLLoaderObject.prototype.doXSLTransToObject=function(xslDoc, xmlDoc){if (!xslDoc)xslDoc=this.xslDoc;if (xslDoc.responseXML)xslDoc=xslDoc.responseXML

 if (!xmlDoc)xmlDoc=this.xmlDoc;if (xmlDoc.responseXML)xmlDoc=xmlDoc.responseXML

 
 if (!_isIE){if (!this.XSLProcessor){this.XSLProcessor=new XSLTProcessor();this.XSLProcessor.importStylesheet(xslDoc);}
 var result = this.XSLProcessor.transformToDocument(xmlDoc);}else {var result = new ActiveXObject("Msxml2.DOMDocument.3.0");try{xmlDoc.transformNodeToObject(xslDoc, result);}catch(e){result = xmlDoc.transformNode(xslDoc);}
 }
 return result;}
dtmlXMLLoaderObject.prototype.doXSLTransToString=function(xslDoc, xmlDoc){var res = this.doXSLTransToObject(xslDoc, xmlDoc);if(typeof(res)=="string")
 return res;return this.doSerialization(res);}
dtmlXMLLoaderObject.prototype.doSerialization=function(xmlDoc){if (!xmlDoc)xmlDoc=this.xmlDoc;if (xmlDoc.responseXML)xmlDoc=xmlDoc.responseXML
 if (!_isIE){var xmlSerializer = new XMLSerializer();return xmlSerializer.serializeToString(xmlDoc);}else
 return xmlDoc.xml;}
dhtmlxEventable=function(obj){obj.attachEvent=function(name, catcher, callObj){name='ev_'+name.toLowerCase();if (!this[name])this[name]=new this.eventCatcher(callObj||this);return(name+':'+this[name].addEvent(catcher));}
 obj.callEvent=function(name, arg0){name='ev_'+name.toLowerCase();if (this[name])return this[name].apply(this, arg0);return true;}
 obj.checkEvent=function(name){return (!!this['ev_'+name.toLowerCase()])
 }
 obj.eventCatcher=function(obj){var dhx_catch = [];var z = function(){var res = true;for (var i = 0;i < dhx_catch.length;i++){if (dhx_catch[i] != null){var zr = dhx_catch[i].apply(obj, arguments);res=res&&zr;}
 }
 return res;}
 z.addEvent=function(ev){if (typeof (ev)!= "function")
 ev=eval(ev);if (ev)return dhx_catch.push(ev)-1;return false;}
 z.removeEvent=function(id){dhx_catch[id]=null;}
 return z;}
 obj.detachEvent=function(id){if (id != false){var list = id.split(':');this[list[0]].removeEvent(list[1]);}
 }
 obj.detachAllEvents = function(){for (var name in this){if (name.indexOf("ev_")==0) 
 this[name] = null;}
 }
 obj = null;};function dhtmlXEditor(base, skin) {var that = this;this.skin = (skin||dhtmlx.skin||"dhx_skyblue");this.iconsPath = dhtmlx.image_path||"../../codebase/imgs/";if (typeof(base)== "string") base = document.getElementById(base);this.base = base;while (this.base.childNodes.length > 0)this.base.removeChild(this.base.childNodes[0]);this._isToolbar = (this.initDhtmlxToolbar!=null&&window.dhtmlXToolbarObject!=null?true:false);if (!this._isToolbar){this.tbData = "<div class='dhxeditor_"+this.skin+"_btns'>"+
 "<a href='javascript:void(0);' onclick='return false;' tabindex='-1'><div actv='b' cmd='applyBold' class='dhxeditor_"+this.skin+"_tbbtn btn_bold'></div></a>"+
 "<a href='javascript:void(0);' onclick='return false;' tabindex='-1'><div actv='i' cmd='applyItalic' class='dhxeditor_"+this.skin+"_tbbtn btn_italic'></div></a>"+
 "<a href='javascript:void(0);' onclick='return false;' tabindex='-1'><div actv='u' cmd='applyUnderscore' class='dhxeditor_"+this.skin+"_tbbtn btn_underline'></div></a>"+
 "<a href='javascript:void(0);' onclick='return false;' tabindex='-1'><div actv='c' cmd='clearFormatting' class='dhxeditor_"+this.skin+"_tbbtn btn_clearformat'></div></a>"+
 "<div class='verline_l'></div><div class='verline_r'></div>"+
 "</div>";}else {this.tbData = "";}
 
 
 var pos = (_isIE?this.base.currentStyle["position"]:window.getComputedStyle(this.base, null).getPropertyValue("position"));if (!(pos == "relative" || pos == "absolute")) this.base.style.position = "relative";this.base.innerHTML = this.tbData+"<div style='position:absolute;width: 100%;overflow: hidden;'></div>";var dhxCont = new dhtmlXContainerLite(this.base);dhxCont.skin = this.skin;dhxCont.setContent(this.base.childNodes[(this._isToolbar?0:1)]);var ofs = (this._isToolbar?0:this.base.childNodes[0].offsetHeight);this.base.adjustContent(this.base, ofs);this.cBlock = document.createElement("DIV");this.cBlock.className = "dhxcont_content_blocker";this.cBlock.style.display = "none";this.base.appendChild(this.cBlock);this.editor = document.createElement("IFRAME");this.editor.className = "dhxeditor_mainiframe_"+this.skin;this.editor.frameBorder = 0;if (_isOpera)this.editor.scrolling = "yes";var fr = this.editor;if (_isIE){fr.onreadystatechange = function(a) {if (fr.readyState == "complete"){try {this.contentWindow.document.body.attachEvent("onfocus",function(e){that._ev("focus",e);});this.contentWindow.document.body.attachEvent("onblur",function(e){that._ev("blur",e);});this.contentWindow.document.body.attachEvent("onkeydown",function(e){that._ev("keydown",e);});this.contentWindow.document.body.attachEvent("onkeyup",function(e){that._ev("keyup",e);});this.contentWindow.document.body.attachEvent("onkeypress",function(e){that._ev("keypress",e);});this.contentWindow.document.body.attachEvent("onmouseup",function(e){that._ev("mouseup",e);});this.contentWindow.document.body.attachEvent("onmousedown",function(e){that._ev("mousedown",e);});this.contentWindow.document.body.attachEvent("onclick",function(e){that._ev("click",e);});}catch(e){};}
 }
 fr.onunload = function() {this.contentWindow.document.body.detachEvent("onfocus",function(){that._ev("focus",event);});this.contentWindow.document.body.detachEvent("onblur",function(){that._ev("blur",event);});this.contentWindow.document.body.detachEvent("onkeydown",function(){that._ev("keydown",event);});this.contentWindow.document.body.detachEvent("onkeyup",function(){that._ev("keyup",event);});this.contentWindow.document.body.detachEvent("onkeypress",function(){that._ev("keypress",event);});this.contentWindow.document.body.detachEvent("onmouseup",function(){that._ev("mouseup",event);});this.contentWindow.document.body.detachEvent("onmousedown",function(){that._ev("mousedown",event);});this.contentWindow.document.body.detachEvent("onclick",function(){that._ev("click",event);});}
 }else {var e = this.editor;fr.onload = function() {this.contentWindow.addEventListener("focus",function(e){that._ev("focus",e);},false);this.contentWindow.addEventListener("blur",function(e){that._ev("blur",e);},false);this.contentWindow.addEventListener("keydown",function(e){that._ev("keydown",e);},false);this.contentWindow.addEventListener("keyup",function(e){that._ev("keyup",e);},false);this.contentWindow.addEventListener("keypress",function(e){that._ev("keypress",e);},false);this.contentWindow.addEventListener("mouseup",function(e){that._ev("mouseup",e);},false);this.contentWindow.addEventListener("mousedown",function(e){that._ev("mousedown",e);},false);this.contentWindow.addEventListener("click",function(e){that._ev("click",e);},false);}
 fr.onunload = function(){this.contentWindow.removeEventListener("focus",function(e){that._ev("focus",e);},false);this.contentWindow.removeEventListener("blur",function(e){that._ev("blur",e);},false);this.contentWindow.removeEventListener("keydown",function(e){that._ev("keydown",e);},false);this.contentWindow.removeEventListener("keyup",function(e){that._ev("keyup",e);},false);this.contentWindow.removeEventListener("keypress",function(e){that._ev("keypress",e);},false);this.contentWindow.removeEventListener("mouseup",function(e){that._ev("mouseup",e);},false);this.contentWindow.removeEventListener("mousedown",function(e){that._ev("mousedown",e);},false);this.contentWindow.removeEventListener("click",function(e){that._ev("click",e);},false);}
 }
 
 this._ev = function(t,ev) {this.callEvent("onAccess",[t,ev]);}
 this._focus = function() {if (_isIE){this.editor.contentWindow.document.body.focus();}else {this.editor.contentWindow.focus();}
 }
 
 
 this.base.attachObject(this.editor);this.edWin = this.editor.contentWindow;this.edDoc = this.edWin.document;this._prepareContent = function(saveContent, roMode) {var storedContent = "";if (saveContent === true && this.getContent != null)storedContent = this.getContent();var edDoc = this.editor.contentWindow.document;edDoc.open("text/html", "replace");if (_isOpera){edDoc.write("<html><head><style> html, body {overflow:auto;-webkit-overflow-scrolling: touch;padding:0px;padding-left:1px !important;height:100%;margin:0px;font-family:Tahoma;font-size:10pt;background-color:#ffffff;}</style></head><body "+(roMode!==true?"contenteditable='true'":"")+" tabindex='0'></body></html>");}else {if (window._KHTMLrv){edDoc.write("<html><head><style> html {overflow-x: auto;-webkit-overflow-scrolling: touch;overflow-y: auto;}body {overflow: auto;overflow-y: scroll;}html,body {padding:0px;padding-left:1px !important;height:100%;margin:0px;font-family:Tahoma;font-size:10pt;background-color:#ffffff;}</style></head><body "+(roMode!==true?"contenteditable='true'":"")+" tabindex='0'></body></html>");}else {if (_isIE){edDoc.write("<html><head><style> html {overflow-y: auto;}body {overflow-y: scroll;-webkit-overflow-scrolling: touch;}html,body {overflow-x: auto;padding:0px;padding-left:1px !important;height:100%;margin:0px;font-family:Tahoma;font-size:10pt;background-color: #ffffff;outline: none;}</style></head><body "+(roMode!==true?"contenteditable='true'":"")+" tabindex='0'></body></html>");}else {edDoc.write("<html><head><style> html,body {overflow-x: auto;overflow-y:-webkit-overflow-scrolling: touch;scroll;padding:0px;padding-left:1px !important;height:100%;margin:0px;font-family:Tahoma;font-size:10pt;background-color:#ffffff;}</style></head><body "+(roMode!==true?"contenteditable='true'":"")+" tabindex='0'></body></html>");}
 }
 }
 edDoc.close();if (_isIE)edDoc.contentEditable = (roMode!==true);else edDoc.designMode = (roMode!==true?"On":"Off");if (_isFF)try {edDoc.execCommand("useCSS", false, true);}catch(e) {}
 
 if (saveContent === true && this.setContent != null)this.setContent(storedContent);}
 
 
 this._prepareContent();this.setIconsPath = function() {}
 this.init = function(){}
 
 this.setSizes = function() {var ofs = (this._isToolbar?0:this.base.childNodes[0].offsetHeight);this.base.adjustContent(this.base, ofs);}
 
 this._resizeTM = null;this._resizeTMTime = 100;this._doOnResize = function() {window.clearTimeout(that._resizeTM);that._resizeTM = window.setTimeout(function(){if(that.setSizes)that.setSizes();}, that._resizeTMTime);}
 this._doOnUnload = function() {window.detachEvent("onresize", this._doOnResize);window.removeEventListener("resize", this._doOnResize, false);}
 dhtmlxEvent(window, "resize", this._doOnResize);this.base.childNodes[0].onselectstart = function(e) {e = e||event;e.cancelBubble = true;e.returnValue = false;if (e.preventDefault)e.preventDefault();return false;}
 for (var q=0;q<this.base.childNodes[0].childNodes.length-2;q++){this.base.childNodes[0].childNodes[q].childNodes[0].onmousedown = function(e) {var t = this.getAttribute("cmd");if (typeof that[t] == "function"){that[t]();that.callEvent("onToolbarClick",[this.getAttribute("actv")]);}
 return false;}
 this.base.childNodes[0].childNodes[q].childNodes[0].onclick = function(e) {return false;}
 }
 
 
 this.runCommand = function(name,param){if(this._roMode===true)return;if(arguments.length < 2)param = null;if(_isIE)this.edWin.focus();try {var edDoc = this.editor.contentWindow.document
 edDoc.execCommand(name,false,param);}catch(e){}
 if(_isIE){this.edWin.focus();var self = this;window.setTimeout(function(){self.edWin.focus();},1);}
 }
 
 
 this.applyBold = function() {this.runCommand("Bold");}
 this.applyItalic = function() {this.runCommand("Italic");}
 this.applyUnderscore = function() {this.runCommand("Underline");}
 this.clearFormatting = function() {this.runCommand("RemoveFormat");}
 
 
 if (this._isToolbar)this.initDhtmlxToolbar();dhtmlxEventable(this);dhtmlxEvent(this.edDoc, "click", function(e){var ev = e||window.event;var el = ev.target||ev.srcElement;that.showInfo(el);});if (_isOpera){dhtmlxEvent(this.edDoc, "mousedown", function(e){var ev = e||window.event;var el = ev.target||ev.srcElement;that.showInfo(el);});}
 
 dhtmlxEvent(this.edDoc, "keyup", function(e){var ev = e||window.event;var key = ev.keyCode;var el = ev.target||ev.srcElement;if((key==37)||(key==38)||(key==39)||(key==40)||(key==13))
 that.showInfo(el);});this.attachEvent("onFocusChanged", function(state){if(that._doOnFocusChanged)that._doOnFocusChanged(state);});this.showInfo = function(el){var el = (this.getSelectionBounds().end)?this.getSelectionBounds().end : el;if(!el||!this.setStyleProperty)return
 try{if(this.edWin.getComputedStyle){var st = this.edWin.getComputedStyle(el, null);var fw = ((st.getPropertyValue("font-weight")==401)?700:st.getPropertyValue("font-weight"));this.style = {fontStyle : st.getPropertyValue("font-style"),
 fontSize : st.getPropertyValue("font-size"),
 textDecoration : st.getPropertyValue("text-decoration"),
 fontWeight : fw,
 fontFamily : st.getPropertyValue("font-family"),
 textAlign : st.getPropertyValue("text-align")
 };if(window._KHTMLrv){this.style.fontStyle = st.getPropertyValue("font-style");this.style.vAlign = st.getPropertyValue("vertical-align");this.style.del = this.isStyleProperty(el,"span","textDecoration","line-through");this.style.u = this.isStyleProperty(el,"span","textDecoration","underline");}
 }
 else{var st = el.currentStyle;this.style = {fontStyle : st.fontStyle,
 fontSize : st.fontSize,
 textDecoration : st.textDecoration,
 fontWeight : st.fontWeight,
 fontFamily : st.fontFamily,
 textAlign : st.textAlign
 };}
 this.setStyleProperty(el,"h1");this.setStyleProperty(el,"h2");this.setStyleProperty(el,"h3");this.setStyleProperty(el,"h4");if(!window._KHTMLrv){this.setStyleProperty(el,"del");this.setStyleProperty(el,"sub");this.setStyleProperty(el,"sup");this.setStyleProperty(el,"u");}
 this.callEvent("onFocusChanged",[this.style, st])
 }
 catch(e){return null}
 }
 
 this.getSelectionBounds = function(){var range, root, start, end;if(this.edWin.getSelection){var selection = this.edWin.getSelection();range = selection.getRangeAt(selection.rangeCount-1);start = range.startContainer;end = range.endContainer;root = range.commonAncestorContainer;if(start.nodeName == "#text")root = root.parentNode;if(start.nodeName == "#text")start = start.parentNode;if (start.nodeName.toLowerCase()== "body") start = start.firstChild;if(end.nodeName == "#text")end = end.parentNode;if (end.nodeName.toLowerCase()== "body") end = end.lastChild;if(start == end)root = start;return {root: root,
 start: start,
 end: end
 }
 }else if(this.edWin.document.selection){range = this.edDoc.selection.createRange()
 if(!range.duplicate)return null;root = range.parentElement();var r1 = range.duplicate();var r2 = range.duplicate();r1.collapse(true);r2.moveToElementText(r1.parentElement());r2.setEndPoint("EndToStart",r1);start = r1.parentElement();r1 = range.duplicate();r2 = range.duplicate();r2.collapse(false);r1.moveToElementText(r2.parentElement());r1.setEndPoint("StartToEnd", r2);end = r2.parentElement();if (start.nodeName.toLowerCase()== "body") start = start.firstChild;if (end.nodeName.toLowerCase()== "body") end = end.lastChild;if(start == end)root = start;return {root: root,
 start: start,
 end: end
 }
 }
 return null 
 }
 
 this.getContent = function(){if (!this.edDoc.body){return "";}else {if (_isFF)return this.editor.contentWindow.document.body.innerHTML.replace(/<\/{0,}br\/{0,}>\s{0,}$/gi,"");if (_isIE && this.edDoc.body.innerText.length == 0)return "";return this.edDoc.body.innerHTML;}
 }
 
 this.setContent = function(str){str = str||"";if (this.edDoc.body){if (navigator.userAgent.indexOf('Firefox')!= -1) {if (typeof(this._ffTest)== "undefined") {this.editor.contentWindow.document.body.innerHTML = "";this.runCommand("InsertHTML", "test");this._ffTest = (this.editor.contentWindow.document.body.innerHTML.length > 0);}
 if (this._ffTest){this.editor.contentWindow.document.body.innerHTML = str;}else {this.editor.contentWindow.document.body.innerHTML = "";if (str.length == 0)str=" ";this.runCommand("InsertHTML", str);}
 }else {this.editor.contentWindow.document.body.innerHTML = str;}
 this.callEvent("onContentSet",[]);}else {dhtmlxEvent(this.edWin, "load", function(e){that.setContent(str);});}
 }
 
 this.setContentHTML = function(url){(new dtmlXMLLoaderObject(this._ajaxOnLoad,this,false,true)).loadXML(url);}
 this._ajaxOnLoad = function(obj,a,b,c,loader){if(loader.xmlDoc.responseText)obj.setContent(loader.xmlDoc.responseText);}
};function dhtmlXContainerLite(obj) {var that = this;this.obj = obj;this.dhxcont = null;this.setContent = function(data) {this.dhxcont = data;this.dhxcont.innerHTML = "<div style='position: relative;left: 0px;top: 0px;overflow: hidden;'></div>";this.dhxcont.mainCont = this.dhxcont.childNodes[0];this.obj.dhxcont = this.dhxcont;}
 
 this.obj._genStr = function(w) {var s = "";var z = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";for (var q=0;q<w;q++)s += z.charAt(Math.round(Math.random() * (z.length-1)));return s;}
 
 this.obj.adjustContent = function(parentObj, offsetTop, marginTop, notCalcWidth, offsetBottom) {this.dhxcont.style.left = (this._offsetLeft||0)+"px";this.dhxcont.style.top = (this._offsetTop||0)+offsetTop+"px";var cw = parentObj.clientWidth+(this._offsetWidth||0);if (notCalcWidth !== true)this.dhxcont.style.width = Math.max(0, cw)+"px";if (notCalcWidth !== true)if (this.dhxcont.offsetWidth > cw)this.dhxcont.style.width = Math.max(0, cw*2-this.dhxcont.offsetWidth)+"px";var ch = parentObj.clientHeight+(this._offsetHeight||0);this.dhxcont.style.height = Math.max(0, ch-offsetTop)+(marginTop!=null?marginTop:0)+"px";if (this.dhxcont.offsetHeight > ch - offsetTop)this.dhxcont.style.height = Math.max(0, (ch-offsetTop)*2-this.dhxcont.offsetHeight)+"px";if (offsetBottom)if (!isNaN(offsetBottom)) this.dhxcont.style.height = Math.max(0, parseInt(this.dhxcont.style.height)-offsetBottom)+"px";if (this._minDataSizeH != null){if (parseInt(this.dhxcont.style.height)< this._minDataSizeH) this.dhxcont.style.height = this._minDataSizeH+"px";}
 if (this._minDataSizeW != null){if (parseInt(this.dhxcont.style.width)< this._minDataSizeW) this.dhxcont.style.width = this._minDataSizeW+"px";}
 
 if (notCalcWidth !== true){this.dhxcont.mainCont.style.width = this.dhxcont.clientWidth+"px";if (this.dhxcont.mainCont.offsetWidth > this.dhxcont.clientWidth)this.dhxcont.mainCont.style.width = Math.max(0, this.dhxcont.clientWidth*2-this.dhxcont.mainCont.offsetWidth)+"px";}
 
 var menuOffset = (this.menu!=null?(!this.menuHidden?this.menuHeight:0):0);var toolbarOffset = (this.toolbar!=null?(!this.toolbarHidden?this.toolbarHeight:0):0);var statusOffset = (this.sb!=null?(!this.sbHidden?this.sbHeight:0):0);this.dhxcont.mainCont.style.height = this.dhxcont.clientHeight+"px";if (this.dhxcont.mainCont.offsetHeight > this.dhxcont.clientHeight)this.dhxcont.mainCont.style.height = Math.max(0, this.dhxcont.clientHeight*2-this.dhxcont.mainCont.offsetHeight)+"px";this.dhxcont.mainCont.style.height = Math.max(0, parseInt(this.dhxcont.mainCont.style.height)-menuOffset-toolbarOffset-statusOffset)+"px";}
 
 this.obj.attachToolbar = function() {var toolbarObj = document.createElement("DIV");toolbarObj.style.position = "relative";toolbarObj.style.overflow = "hidden";toolbarObj.id = "dhxtoolbar_"+this._genStr(12);this.dhxcont.insertBefore(toolbarObj, this.dhxcont.childNodes[(this.menu!=null?1:0)]);this.toolbar = new dhtmlXToolbarObject(toolbarObj.id, this.skin);if (that.skin == "dhx_web"){this.toolbarHeight = 32;this.dhxcont.className = "dhtmlx_editor_extended_"+that.skin;}else if (that.skin == "dhx_terrace"){if (this._attached){this.toolbarHeight = 46;toolbarObj.style.marginBottom = "14px";}else {this.toolbarHeight = 34;toolbarObj.style.marginTop = "2px";toolbarObj.style.marginLeft = "2px";toolbarObj.style.marginBottom = "2px";}
 this.dhxcont.className = "dhtmlx_editor_extended_"+that.skin;}else {this.toolbarHeight = toolbarObj.offsetHeight+(this._isLayout&&this.skin=="dhx_skyblue"?2:0);}
 this.toolbarId = toolbarObj.id;if (this._doOnAttachToolbar)this._doOnAttachToolbar("init");this.adjust();return this.toolbar;}
 
 this.obj.attachObject = function(obj, autoSize) {if (typeof(obj)== "string") obj = document.getElementById(obj);if (autoSize){obj.style.visibility = "hidden";obj.style.display = "";var objW = obj.offsetWidth;var objH = obj.offsetHeight;}
 this._attachContent("obj", obj);if (autoSize && this._isWindow){obj.style.visibility = "visible";this._adjustToContent(objW, objH);}
 }
 this.obj.adjust = function() {if (this.skin == "dhx_skyblue"){if (this.toolbar){if (this._isWindow || this._isLayout){document.getElementById(this.toolbarId).style.height = "29px";this.toolbarHeight = document.getElementById(this.toolbarId).offsetHeight;if (this._doOnAttachToolbar)this._doOnAttachToolbar("show");}
 if (this._isCell){document.getElementById(this.toolbarId).className += " in_layoutcell";}
 if (this._isAcc){document.getElementById(this.toolbarId).className += " in_acccell";}
 }
 }
 }
 
 this.obj._attachContent = function(type, obj, append) {while (that.dhxcont.mainCont.childNodes.length > 0){that.dhxcont.mainCont.removeChild(that.dhxcont.mainCont.childNodes[0]);}
 
 if (type == "obj"){if (this._isWindow && obj.cmp == null && this.skin == "dhx_skyblue"){this.dhxcont.mainCont.style.border = "#a4bed4 1px solid";this.dhxcont.mainCont.style.backgroundColor = "#FFFFFF";this._redraw();}
 that.dhxcont._frame = null;that.dhxcont.mainCont.appendChild(obj);that.dhxcont.mainCont.style.overflow = (append===true?"auto":"hidden");obj.style.display = "";}
 }
 
 this.obj._dhxContDestruct = function() {while (this.dhxcont.mainCont.childNodes.length > 0)this.dhxcont.mainCont.removeChild(this.dhxcont.mainCont.childNodes[0]);this.dhxcont.mainCont.innerHTML = "";this.dhxcont.mainCont = null;try {delete this.dhxcont["mainCont"];}catch(e){};while (this.dhxcont.childNodes.length > 0)this.dhxcont.removeChild(this.dhxcont.childNodes[0]);this.dhxcont.innerHTML = "";this.dhxcont = null;try {delete this["dhxcont"];}catch(e){};this._genStr = null;this._attachContent = null;this._dhxContDestruct = null;this.adjust = null;this.attachObject = null;this.moveContentTo = null;this.adjustContent = null;this.attachToolbar = null;}
 
}
(function(){dhtmlx.extend_api("dhtmlXEditor",{_init:function(obj){return [obj.parent, obj.skin ];},
 content:"setContent"
 },{});})();dhtmlXEditor.prototype.unload = function() {if (!this._isToolbar){while (this.base.childNodes[0].childNodes.length > 0){if (this.base.childNodes[0].childNodes[0].tagName && String(this.base.childNodes[0].childNodes[0].tagName).toLowerCase() == "a") {this.base.childNodes[0].childNodes[0].childNodes[0].onclick = null;this.base.childNodes[0].childNodes[0].childNodes[0].onmousedown = null;this.base.childNodes[0].childNodes[0].removeChild(this.base.childNodes[0].childNodes[0].childNodes[0]);}
 this.base.childNodes[0].removeChild(this.base.childNodes[0].childNodes[0]);}
 }else {this._unloadExtModule();}
 
 this.base.childNodes[0].onselectstart = null;this.tbData = null;this.detachAllEvents();if (_isIE)this.editor.onreadystatechange = null;else this.editor.onload = null;this.editor.parentNode.removeChild(this.editor);this.editor.onunload = null;this.editor = null;this.edDoc = null;this.edWin = null;this.base._dhxContDestruct();this.base._idd = null;this.base.name = null;while (this.base.childNodes.length > 0)this.base.removeChild(this.base.childNodes[0]);this.base = null;this.cBlock = null;this._isToolbar = null;this._resizeTM = null;this._resizeTMTime = null;this.skin = null;this.iconsPath = null;this._ajaxOnLoad = null;this._ev = null;this._focus = null;this._prepareContent = null;this._doOnResize = null;this._doOnUnload = null;this.setIconsPath = null;this.init = null;this.setSizes = null;this.runCommand = null;this.applyBold = null;this.applyItalic = null;this.applyUnderscore = null;this.clearFormatting = null;this.attachEvent = null;this.callEvent = null;this.checkEvent = null;this.eventCatcher = null;this.detachEvent = null;this.detachAllEvents = null;this.showInfo = null;this.getSelectionBounds = null;this.getContent = null;this.setContent = null;this.setContentHTML = null;this.setReadonly = null;this.isReadonly = null;this.unload = null;};dhtmlXEditor.prototype.setReadonly = function(mode) {this._roMode = (mode===true);this._prepareContent(true, this._roMode);this.cBlock.style.display = (this._roMode?"":"none");};dhtmlXEditor.prototype.isReadonly = function(mode) {return (this._roMode||false);};dhtmlXEditor.prototype.initDhtmlxToolbar = function() {this.tb = this.base.attachToolbar();this.tb.setSkin(this.skin);if (this.skin == "dhx_skyblue"){this.tb.base.style.borderLeft = "none";this.tb.base.style.borderRight = "none";this.tb.base.style.top = "-1px";}
 this.setSizes();this.tb.setIconsPath(this.iconsPath+"dhxeditor_"+this.skin+"/");this._availFonts = new Array("Arial", "Arial Narrow", "Comic Sans MS", "Courier", "Georgia", "Impact", "Tahoma", "Times New Roman", "Verdana");this._initFont = this._availFonts[0];this._xmlFonts = "";for (var q=0;q<this._availFonts.length;q++){var fnt = String(this._availFonts[q]).replace(/\s/g,"_");this._xmlFonts += '<item type="button" id="applyFontFamily:'+fnt+'"><itemText><![CDATA[<img src="'+this.tb.imagePath+'font_'+String(fnt).toLowerCase()+'.gif" border="0" style="width:110px;height:16px;">]]></itemText></item>';}
 
 this._availSizes = {"1":"8pt", "2":"10pt", "3":"12pt", "4":"14pt", "5":"18pt", "6":"24pt", "7":"36pt"};this._xmlSizes = "";for (var a in this._availSizes){this._xmlSizes += '<item type="button" id="applyFontSize:'+a+':'+this._availSizes[a]+'" text="'+this._availSizes[a]+'"/>';}
 this.tbXML = '<toolbar>'+
 
 '<item id="applyH1" type="buttonTwoState" img="h1.gif" imgdis="h4_dis.gif" title="H1"/>'+
 '<item id="applyH2" type="buttonTwoState" img="h2.gif" imgdis="h4_dis.gif" title="H2"/>'+
 '<item id="applyH3" type="buttonTwoState" img="h3.gif" imgdis="h4_dis.gif" title="H3"/>'+
 '<item id="applyH4" type="buttonTwoState" img="h4.gif" imgdis="h4_dis.gif" title="H4"/>'+
 '<item id="separ01" type="separator"/>'+
 
 '<item id="applyBold" type="buttonTwoState" img="bold.gif" imgdis="bold_dis.gif" title="Bold Text"/>'+
 '<item id="applyItalic" type="buttonTwoState" img="italic.gif" imgdis="italic_dis.gif" title="Italic Text"/>'+
 '<item id="applyUnderscore" type="buttonTwoState" img="underline.gif" imgdis="underline_dis.gif" title="Underscore Text"/>'+
 '<item id="applyStrikethrough" type="buttonTwoState" img="strike.gif" imgdis="strike_dis.gif" title="Strikethrough Text"/>'+
 '<item id="separ02" type="separator"/>'+
 
 '<item id="alignLeft" type="buttonTwoState" img="align_left.gif" imgdis="align_left_dis.gif" title="Left Alignment"/>'+
 '<item id="alignCenter" type="buttonTwoState" img="align_center.gif" imgdis="align_center_dis.gif" title="Center Alignment"/>'+
 '<item id="alignRight" type="buttonTwoState" img="align_right.gif" imgdis="align_right_dis.gif" title="Right Alignment"/>'+
 '<item id="alignJustify" type="buttonTwoState" img="align_justify.gif" title="Justified Alignment"/>'+
 '<item id="separ03" type="separator"/>'+
 
 '<item id="applySub" type="buttonTwoState" img="script_sub.gif" imgdis="script_sub.gif" title="Subscript"/>'+
 '<item id="applySuper" type="buttonTwoState" img="script_super.gif" imgdis="script_super_dis.gif" title="Superscript"/>'+
 '<item id="separ04" type="separator"/>'+
 
 '<item id="createNumList" type="button" img="list_number.gif" imgdis="list_number_dis.gif" title="Number List"/>'+
 '<item id="createBulList" type="button" img="list_bullet.gif" imgdis="list_bullet_dis.gif" title="Bullet List"/>'+
 '<item id="separ05" type="separator"/>'+
 
 '<item id="increaseIndent" type="button" img="indent_inc.gif" imgdis="indent_inc_dis.gif" title="Increase Indent"/>'+
 '<item id="decreaseIndent" type="button" img="indent_dec.gif" imgdis="indent_dec_dis.gif" title="Decrease Indent"/>'+
 '<item id="separ06" type="separator"/>'+
 '<item id="clearFormatting" type="button" img="clear.gif" title="Clear Formatting"/>'+
 '</toolbar>';this.tb.loadXMLString(this.tbXML);this._checkAlign = function(alignSelected) {this.tb.setItemState("alignCenter", false);this.tb.setItemState("alignRight", false);this.tb.setItemState("alignJustify", false);this.tb.setItemState("alignLeft", false);if (alignSelected)this.tb.setItemState(alignSelected, true);}
 
 this._checkH = function(h) {this.tb.setItemState("applyH1", false);this.tb.setItemState("applyH2", false);this.tb.setItemState("applyH3", false);this.tb.setItemState("applyH4", false);if (h)this.tb.setItemState(h, true);}
 
 this._doOnFocusChanged = function(state) {if(!state.h1&&!state.h2&&!state.h3&&!state.h4){var bold = (String(state.fontWeight).search(/bold/i) != -1) || (Number(state.fontWeight) >= 700);this.tb.setItemState("applyBold", bold);}else this.tb.setItemState("applyBold", false);var alignId = "alignLeft";if (String(state.textAlign).search(/center/) != -1) {alignId = "alignCenter";}
 if (String(state.textAlign).search(/right/) != -1) {alignId = "alignRight";}
 if (String(state.textAlign).search(/justify/) != -1) {alignId = "alignJustify";}
 this.tb.setItemState(alignId, true);this._checkAlign(alignId);this.tb.setItemState("applyH1", state.h1);this.tb.setItemState("applyH2", state.h2);this.tb.setItemState("applyH3", state.h3);this.tb.setItemState("applyH4", state.h4);if (window._KHTMLrv){state.sub = (state.vAlign == "sub");state.sup = (state.vAlign == "super");}
 this.tb.setItemState("applyItalic", (state.fontStyle == "italic"));this.tb.setItemState("applyStrikethrough", state.del);this.tb.setItemState("applySub", state.sub);this.tb.setItemState("applySuper", state.sup);this.tb.setItemState("applyUnderscore", state.u);}
 
 this._doOnToolbarClick = function(id) {var action = String(id).split(":");if (this[action[0]] != null){if (typeof(this[action[0]])== "function") {this[action[0]](action[1]);this.callEvent("onToolbarClick",[id]);}
 }
 }
 
 this._doOnStateChange = function(itemId, state) {this[itemId]();switch (itemId) {case "alignLeft":
 case "alignCenter":
 case "alignRight":
 case "alignJustify":
 this._checkAlign(itemId);break;case "applyH1":
 case "applyH2":
 case "applyH3":
 case "applyH4":
 this._checkH(itemId);break;}
 this.callEvent("onToolbarClick",[itemId]);}
 this._doOnBeforeStateChange = function(itemId, state) {if ((itemId == "alignLeft" || itemId == "alignCenter" || itemId == "alignRight" || itemId == "alignJustify")&& state == true) {return false;}
 return true;}
 var that = this;this.tb.attachEvent("onClick", function(id){that._doOnToolbarClick(id);});this.tb.attachEvent("onStateChange", function(id,st){that._doOnStateChange(id,st);});this.tb.attachEvent("onBeforeStateChange", function(id,st){return that._doOnBeforeStateChange(id,st);});this.applyBold = function(){this.runCommand("Bold");}
 
 this.applyItalic = function(){this.runCommand("Italic");}
 
 this.applyUnderscore = function(){this.runCommand("Underline");}
 
 this.applyStrikethrough = function(){this.runCommand("StrikeThrough");}
 
 this.alignLeft = function(){this.runCommand("JustifyLeft");}
 
 this.alignRight = function(){this.runCommand("JustifyRight");}
 
 this.alignCenter = function(){this.runCommand("JustifyCenter");}
 
 this.alignJustify = function(){this.runCommand("JustifyFull");}
 
 this.applySub = function(){this.runCommand("Subscript");}
 
 this.applySuper = function(){this.runCommand("Superscript");}
 
 this.applyH1 = function(){this.runCommand("FormatBlock","<H1>");}
 
 this.applyH2 = function(){this.runCommand("FormatBlock","<H2>");}
 
 this.applyH3 = function(){this.runCommand("FormatBlock","<H3>");}
 
 this.applyH4 = function(){this.runCommand("FormatBlock","<H4>");}
 
 this.createNumList = function(){this.runCommand("InsertOrderedList");}
 
 this.createBulList = function(){this.runCommand("InsertUnorderedList");}
 
 this.increaseIndent = function(){this.runCommand("Indent");}
 
 this.decreaseIndent = function(){this.runCommand("Outdent");}
 this.clearFormatting = function() {this.runCommand("RemoveFormat");this.tb.setItemState("applyBold", false);this.tb.setItemState("applyItalic", false);this.tb.setItemState("applyStrikethrough", false);this.tb.setItemState("applySub", false);this.tb.setItemState("applySuper", false);this.tb.setItemState("applyUnderscore", false);}
 
 
 
 this.getParentByTag = function(node, tag_name){tag_name = tag_name.toLowerCase()
 var p = node
 do{if(tag_name == '' || p.nodeName.toLowerCase()== tag_name) return p
 }while(p = p.parentNode)return node
 }
 
 this.isStyleProperty = function(node, tag_name, name, value){tag_name = tag_name.toLowerCase();var n = node;do{if((n.nodeName.toLowerCase()== tag_name)&&(n.style[name]==value)) return true
 }while(n = n.parentNode)return false
 }
 
 this.setStyleProperty = function(el,prop){this.style[prop] = false;var n = this.getParentByTag(el,prop);if(n&&(n.tagName.toLowerCase()==prop)) this.style[prop] = true;if(prop == "del")if(this.getParentByTag(el,"strike")&&(this.getParentByTag(el,"strike").tagName.toLowerCase()=="strike")) this.style.del = true;}
 
 
 this._unloadExtModule = function() {this.tb.unload();this.tb = null;this._availFonts = null;this._initFont = null;this._xmlFonts = null;this._availSizes = null;this._xmlSizes = null;this.tbXML = null;this._checkAlign = null;this._checkH = null;this._doOnFocusChanged = null;this._doOnToolbarClick = null;this._doOnStateChange = null;this._doOnBeforeStateChange = null;this.applyBold = null;this.applyItalic = null;this.applyUnderscore = null;this.applyStrikethrough = null;this.alignLeft = null;this.alignRight = null;this.alignCenter = null;this.alignJustify = null;this.applySub = null;this.applySuper = null;this.applyH1 = null;this.applyH2 = null;this.applyH3 = null;this.applyH4 = null;this.createNumList = null;this.createBulList = null;this.increaseIndent = null;this.decreaseIndent = null;this.clearFormatting = null;this.getParentByTag = null;this.isStyleProperty = null;this.setStyleProperty = null;}
}
function dhtmlXContainer(obj) {var that = this;this.obj = obj;obj = null;this.obj._padding = true;this.dhxcont = null;this.st = document.createElement("DIV");this.st.style.position = "absolute";this.st.style.left = "-200px";this.st.style.top = "0px";this.st.style.width = "100px";this.st.style.height = "1px";this.st.style.visibility = "hidden";this.st.style.overflow = "hidden";document.body.insertBefore(this.st, document.body.childNodes[0]);this.obj._getSt = function() {return that.st;}
 
 this.obj.dv = "def";this.obj.av = this.obj.dv;this.obj.cv = this.obj.av;this.obj.vs = {};this.obj.vs[this.obj.av] = {};this.obj.view = function(name) {if (!this.vs[name]){this.vs[name] = {};this.vs[name].dhxcont = this.vs[this.dv].dhxcont;var mainCont = document.createElement("DIV");mainCont.style.position = "relative";mainCont.style.left = "0px";mainCont.style.width = "200px";mainCont.style.height = "200px";mainCont.style.overflow = "hidden";mainCont.style.visibility = "";that.st.appendChild(mainCont);this.vs[name].dhxcont.mainCont[name] = mainCont;mainCont = null;}
 
 this.avt = this.av;this.av = name;return this;}
 
 this.obj.setActive = function() {if (!this.vs[this.av])return;this.cv = this.av;if (this.vs[this.avt].dhxcont == this.vs[this.avt].dhxcont.mainCont[this.avt].parentNode){that.st.appendChild(this.vs[this.avt].dhxcont.mainCont[this.avt]);if (this.vs[this.avt].menu)that.st.appendChild(document.getElementById(this.vs[this.avt].menuId));if (this.vs[this.avt].toolbar)that.st.appendChild(document.getElementById(this.vs[this.avt].toolbarId));if (this.vs[this.avt].sb)that.st.appendChild(document.getElementById(this.vs[this.avt].sbId));}
 
 
 
 
 if (this._isCell){}
 
 
 
 if (this.vs[this.av].dhxcont != this.vs[this.av].dhxcont.mainCont[this.av].parentNode){this.vs[this.av].dhxcont.insertBefore(this.vs[this.av].dhxcont.mainCont[this.av],this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length-1]);if (this.vs[this.av].menu)this.vs[this.av].dhxcont.insertBefore(document.getElementById(this.vs[this.av].menuId), this.vs[this.av].dhxcont.childNodes[0]);if (this.vs[this.av].toolbar)this.vs[this.av].dhxcont.insertBefore(document.getElementById(this.vs[this.av].toolbarId), this.vs[this.av].dhxcont.childNodes[(this.vs[this.av].menu?1:0)]);if (this.vs[this.av].sb)this.vs[this.av].dhxcont.insertBefore(document.getElementById(this.vs[this.av].sbId), this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length-1]);}
 if (this._doOnResize)this._doOnResize();if (this._isWindow)this.updateNestedObjects();this.avt = null;}
 
 this.obj._viewRestore = function() {var t = this.av;if (this.avt){this.av = this.avt;this.avt = null;}
 return t;}
 
 this.setContent = function(data) {this.obj.vs[this.obj.av].dhxcont = data;this.obj._init();data = null;}
 
 this.obj._init = function() {this.vs[this.av].dhxcont.innerHTML = "<div ida='dhxMainCont' style='position: relative;left: 0px;top: 0px;overflow: hidden;'></div>"+
 "<div class='dhxcont_content_blocker' style='display: none;'></div>";this.vs[this.av].dhxcont.mainCont = {};this.vs[this.av].dhxcont.mainCont[this.av] = this.vs[this.av].dhxcont.childNodes[0];}
 
 this.obj._genStr = function(w) {var s = "";var z = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";for (var q=0;q<w;q++)s += z.charAt(Math.round(Math.random() * (z.length-1)));return s;}
 
 this.obj.setMinContentSize = function(w, h) {this.vs[this.av]._minDataSizeW = w;this.vs[this.av]._minDataSizeH = h;}
 
 this.obj._setPadding = function(p, altCss) {if (typeof(p)== "object") {this._offsetTop = p[0];this._offsetLeft = p[1];this._offsetWidth = p[2];this._offsetHeight = p[3];p = null;}else {this._offsetTop = p;this._offsetLeft = p;this._offsetWidth = -p*2;this._offsetHeight = -p*2;}
 this.vs[this.av].dhxcont.className = "dhxcont_global_content_area "+(altCss||"");}
 
 this.obj.moveContentTo = function(cont) {for (var a in this.vs){cont.view(a).setActive();var pref = null;if (this.vs[a].grid)pref = "grid";if (this.vs[a].tree)pref = "tree";if (this.vs[a].tabbar)pref = "tabbar";if (this.vs[a].folders)pref = "folders";if (this.vs[a].layout)pref = "layout";if (pref != null){cont.view(a).attachObject(this.vs[a][pref+"Id"], false, true, false);cont.vs[a][pref] = this.vs[a][pref];cont.vs[a][pref+"Id"] = this.vs[a][pref+"Id"];cont.vs[a][pref+"Obj"] = this.vs[a][pref+"Obj"];this.vs[a][pref] = null;this.vs[a][pref+"Id"] = null;this.vs[a][pref+"Obj"] = null;}
 
 if (this.vs[a]._frame){cont.vs[a]._frame = this.vs[a]._frame;this.vs[a]._frame = null;}
 
 if (this.vs[a].menu != null){if (cont.cv == cont.av){cont.vs[cont.av].dhxcont.insertBefore(document.getElementById(this.vs[a].menuId), cont.vs[cont.av].dhxcont.childNodes[0]);}else {var st = cont._getSt();st.appendChild(document.getElementById(this.vs[a].menuId));st = null;}
 cont.vs[a].menu = this.vs[a].menu;cont.vs[a].menuId = this.vs[a].menuId;cont.vs[a].menuHeight = this.vs[a].menuHeight;this.vs[a].menu = null;this.vs[a].menuId = null;this.vs[a].menuHeight = null;if (this.cv == this.av && this._doOnAttachMenu)this._doOnAttachMenu("unload");if (cont.cv == cont.av && cont._doOnAttachMenu)cont._doOnAttachMenu("move");}
 
 if (this.vs[a].toolbar != null){if (cont.cv == cont.av){cont.vs[cont.av].dhxcont.insertBefore(document.getElementById(this.vs[a].toolbarId), cont.vs[cont.av].dhxcont.childNodes[(cont.vs[cont.av].menu!=null?1:0)]);}else {var st = cont._getSt();st.appendChild(document.getElementById(this.vs[a].toolbarId));st = null;}
 
 cont.vs[a].toolbar = this.vs[a].toolbar;cont.vs[a].toolbarId = this.vs[a].toolbarId;cont.vs[a].toolbarHeight = this.vs[a].toolbarHeight;this.vs[a].toolbar = null;this.vs[a].toolbarId = null;this.vs[a].toolbarHeight = null;if (this.cv == this.av && this._doOnAttachToolbar)this._doOnAttachToolbar("unload");if (cont.cv == cont.av && cont._doOnAttachToolbar)cont._doOnAttachToolbar("move");}
 
 if (this.vs[a].sb != null){if (cont.cv == cont.av){cont.vs[cont.av].dhxcont.insertBefore(document.getElementById(this.vs[a].sbId), cont.vs[cont.av].dhxcont.childNodes[cont.vs[cont.av].dhxcont.childNodes.length-1]);}else {var st = cont._getSt();st.appendChild(document.getElementById(this.vs[a].sbId));return st;}
 
 cont.vs[a].sb = this.vs[a].sb;cont.vs[a].sbId = this.vs[a].sbId;cont.vs[a].sbHeight = this.vs[a].sbHeight;this.vs[a].sb = null;this.vs[a].sbId = null;this.vs[a].sbHeight = null;if (this.cv == this.av && this._doOnAttachStatusBar)this._doOnAttachStatusBar("unload");if (cont.cv == cont.av && cont._doOnAttachStatusBar)cont._doOnAttachStatusBar("move");}
 
 
 var objA = this.vs[a].dhxcont.mainCont[a];var objB = cont.vs[a].dhxcont.mainCont[a];while (objA.childNodes.length > 0)objB.appendChild(objA.childNodes[0]);}
 
 cont.view(this.av).setActive();cont = null;}
 
 this.obj.adjustContent = function(parentObj, offsetTop, marginTop, notCalcWidth, offsetBottom) {var dhxcont = this.vs[this.av].dhxcont;var mainCont = dhxcont.mainCont[this.av];dhxcont.style.left = (this._offsetLeft||0)+"px";dhxcont.style.top = (this._offsetTop||0)+offsetTop+"px";var cw = parentObj.clientWidth+(this._offsetWidth||0);if (notCalcWidth !== true)dhxcont.style.width = Math.max(0, cw)+"px";if (notCalcWidth !== true)if (dhxcont.offsetWidth > cw)dhxcont.style.width = Math.max(0, cw*2-dhxcont.offsetWidth)+"px";var ch = parentObj.clientHeight+(this._offsetHeight||0);dhxcont.style.height = Math.max(0, ch-offsetTop)+(marginTop!=null?marginTop:0)+"px";if (dhxcont.offsetHeight > ch - offsetTop)dhxcont.style.height = Math.max(0, (ch-offsetTop)*2-dhxcont.offsetHeight)+"px";if (offsetBottom)if (!isNaN(offsetBottom)) dhxcont.style.height = Math.max(0, parseInt(dhxcont.style.height)-offsetBottom)+"px";if (this.vs[this.av]._minDataSizeH != null){if (parseInt(dhxcont.style.height)< this.vs[this.av]._minDataSizeH) dhxcont.style.height = this.vs[this.av]._minDataSizeH+"px";}
 if (this.vs[this.av]._minDataSizeW != null){if (parseInt(dhxcont.style.width)< this.vs[this.av]._minDataSizeW) dhxcont.style.width = this.vs[this.av]._minDataSizeW+"px";}
 
 if (notCalcWidth !== true){mainCont.style.width = dhxcont.clientWidth+"px";if (mainCont.offsetWidth > dhxcont.clientWidth)mainCont.style.width = Math.max(0, dhxcont.clientWidth*2-mainCont.offsetWidth)+"px";}
 
 var menuOffset = (this.vs[this.av].menu!=null?(!this.vs[this.av].menuHidden?this.vs[this.av].menuHeight:0):0);var toolbarOffset = (this.vs[this.av].toolbar!=null?(!this.vs[this.av].toolbarHidden?this.vs[this.av].toolbarHeight:0):0);var statusOffset = (this.vs[this.av].sb!=null?(!this.vs[this.av].sbHidden?this.vs[this.av].sbHeight:0):0);mainCont.style.height = dhxcont.clientHeight+"px";if (mainCont.offsetHeight > dhxcont.clientHeight)mainCont.style.height = Math.max(0, dhxcont.clientHeight*2-mainCont.offsetHeight)+"px";mainCont.style.height = Math.max(0, parseInt(mainCont.style.height)-menuOffset-toolbarOffset-statusOffset)+"px";mainCont = null;dhxcont = null;parentObj = null;}
 this.obj.coverBlocker = function() {return this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length-1];}
 this.obj.showCoverBlocker = function() {var t = this.coverBlocker();t.style.display = "";t = null;}
 this.obj.hideCoverBlocker = function() {var t = this.coverBlocker();t.style.display = "none";t = null;}
 this.obj.updateNestedObjects = function(fromInit) {if (this.skin == "dhx_terrace"){var mtAttached = (this.vs[this.av].menu != null || this.vs[this.av].toolbar != null);if (this.vs[this.av].grid){var gTop = (mtAttached||this._isWindow?14:0);var gBottom = (this._isWindow?14:0);var gLeft = (this._isWindow?14:0);if (fromInit){if (!this._isWindow){this.vs[this.av].grid.entBox.style.border = "0px solid white";this.vs[this.av].grid.skin_h_correction = -2;}
 
 this.vs[this.av].grid.dontSetSizes = true;this.vs[this.av].gridObj.style.position = "absolute";}
 
 this.vs[this.av].gridObj.style.top = gTop+"px";this.vs[this.av].gridObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-gTop-gBottom+"px";this.vs[this.av].gridObj.style.left = gLeft+"px";this.vs[this.av].gridObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";this.vs[this.av].grid.setSizes();}
 
 if (this.vs[this.av].tree){var gTop = (mtAttached||this._isWindow?14:0);var gBottom = (this._isWindow?14:0);var gLeft = (this._isWindow?14:0);if (fromInit){this.vs[this.av].treeObj.style.position = "absolute";}
 
 this.vs[this.av].treeObj.style.top = gTop+"px";this.vs[this.av].treeObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-gTop-gBottom+"px";this.vs[this.av].treeObj.style.left = gLeft+"px";this.vs[this.av].treeObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";}
 
 if (this.vs[this.av].form){var gTop = (mtAttached||this._isWindow?14:0);var gBottom = (this._isWindow?14:0);var gLeft = (this._isWindow?14:0);if (fromInit){this.vs[this.av].formObj.style.position = "absolute";}
 
 this.vs[this.av].formObj.style.top = gTop+"px";this.vs[this.av].formObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-gTop-gBottom+"px";this.vs[this.av].formObj.style.left = gLeft+"px";this.vs[this.av].formObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";this.vs[this.av].form.setSizes();}
 
 if (this.vs[this.av].layout){if (fromInit){if (!this._isWindow && !this._isCell)this.vs[this.av].layout._hideBorders();}
 
 
 var gTop = (this._isCell&&this._noHeader&&!mtAttached?0:14);var gBottom = (this._isCell&&this._noHeader?0:14)
 var gLeft = (this._isCell&&this._noHeader?0:14);this.vs[this.av].layoutObj.style.top = gTop+"px";this.vs[this.av].layoutObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-gTop-gBottom+"px";this.vs[this.av].layoutObj.style.left = gLeft+"px";this.vs[this.av].layoutObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";this.vs[this.av].layout.setSizes();}
 
 if (this.vs[this.av].accordion){if (fromInit){this.vs[this.av].accordion._hideBorders = true;}
 
 var gTop = (this._isCell&&this._noHeader&&!mtAttached?0:14);var gBottom = (this._isCell&&this._noHeader?0:14)
 var gLeft = (this._isCell&&this._noHeader?0:14);this.vs[this.av].accordionObj.style.top = gTop+"px";this.vs[this.av].accordionObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-gTop-gBottom+"px";this.vs[this.av].accordionObj.style.left = gLeft+"px";this.vs[this.av].accordionObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";this.vs[this.av].accordion.setSizes();}
 
 
 if (this.vs[this.av].tabbar != null){var gTop = (!mtAttached && this._isCell && this._noHeader ? 0:14);var gBottom = (this._isCell && this._noHeader ? gTop : 28);var gLeft = (this._isCell && this._noHeader ? 0 : 14);this.vs[this.av].tabbarObj.style.top = gTop+"px";this.vs[this.av].tabbarObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-gBottom+"px";this.vs[this.av].tabbarObj.style.left = gLeft+"px";this.vs[this.av].tabbarObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";this.vs[this.av].tabbar.adjustOuterSize();}
 
 if (this.vs[this.av].editor){if (fromInit){if (this.vs[this.av].editor.tb != null && this.vs[this.av].editor.tb instanceof dhtmlXToolbarObject){}
 
 }
 
 var gTop = 14;var gLeft = 14;this.vs[this.av].editorObj.style.top = gTop+"px";this.vs[this.av].editorObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)-(gTop*2)+"px";this.vs[this.av].editorObj.style.left = gLeft+"px";this.vs[this.av].editorObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)-(gLeft*2)+"px";if (!_isIE)this.vs[this.av].editor._prepareContent(true);this.vs[this.av].editor.setSizes();}
 
 if (this.vs[this.av].sched){this.vs[this.av].sched.setSizes();}
 
 if (this.vs[this.av].dockedCell){this.vs[this.av].dockedCell.updateNestedObjects();}
 
 return;}
 if (this.vs[this.av].grid){this.vs[this.av].grid.setSizes();}
 if (this.vs[this.av].sched){this.vs[this.av].sched.setSizes();}
 if (this.vs[this.av].tabbar){this.vs[this.av].tabbar.adjustOuterSize();}
 if (this.vs[this.av].folders){this.vs[this.av].folders.setSizes();}
 if (this.vs[this.av].editor){if (!_isIE)this.vs[this.av].editor._prepareContent(true);this.vs[this.av].editor.setSizes();}
 
 
 if (this.vs[this.av].layout){if ((this._isAcc || this._isTabbarCell)&& this.skin == "dhx_skyblue") {this.vs[this.av].layoutObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+2+"px";this.vs[this.av].layoutObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+2+"px";}else {this.vs[this.av].layoutObj.style.width = this.vs[this.av].dhxcont.mainCont[this.av].style.width;this.vs[this.av].layoutObj.style.height = this.vs[this.av].dhxcont.mainCont[this.av].style.height;}
 this.vs[this.av].layout.setSizes();}
 
 if (this.vs[this.av].accordion != null){if (this.skin == "dhx_web"){this.vs[this.av].accordionObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+"px";this.vs[this.av].accordionObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+"px";}else {this.vs[this.av].accordionObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+2+"px";this.vs[this.av].accordionObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+2+"px";}
 this.vs[this.av].accordion.setSizes();}
 
 if (this.vs[this.av].dockedCell){this.vs[this.av].dockedCell.updateNestedObjects();}
 
 if (this.vs[this.av].form)this.vs[this.av].form.setSizes();}
 
 this.obj.attachStatusBar = function() {if (this.vs[this.av].sb)return;var sbObj = document.createElement("DIV");if (this._isCell){sbObj.className = "dhxcont_sb_container_layoutcell";}else {sbObj.className = "dhxcont_sb_container";}
 sbObj.id = "sbobj_"+this._genStr(12);sbObj.innerHTML = "<div class='dhxcont_statusbar'></div>";if (this.cv == this.av)this.vs[this.av].dhxcont.insertBefore(sbObj, this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length-1]);else that.st.appendChild(sbObj);sbObj.setText = function(text) {this.childNodes[0].innerHTML = text;}
 sbObj.getText = function() {return this.childNodes[0].innerHTML;}
 sbObj.onselectstart = function(e) {e=e||event;e.returnValue=false;return false;}
 
 this.vs[this.av].sb = sbObj;this.vs[this.av].sbHeight = (this.skin=="dhx_web"?41:(this.skin=="dhx_skyblue"?23:sbObj.offsetHeight));this.vs[this.av].sbId = sbObj.id;if (this._doOnAttachStatusBar)this._doOnAttachStatusBar("init");this.adjust();return this.vs[this._viewRestore()].sb;}
 
 this.obj.detachStatusBar = function() {if (!this.vs[this.av].sb)return;this.vs[this.av].sb.setText = null;this.vs[this.av].sb.getText = null;this.vs[this.av].sb.onselectstart = null;this.vs[this.av].sb.parentNode.removeChild(this.vs[this.av].sb);this.vs[this.av].sb = null;this.vs[this.av].sbHeight = null;this.vs[this.av].sbId = null;this._viewRestore();if (this._doOnAttachStatusBar)this._doOnAttachStatusBar("unload");}
 
 this.obj.getFrame = function(){return this.getView()._frame;};this.obj.getView = function(name){return this.vs[name||this.av];};this.obj.attachMenu = function(skin) {if (this.vs[this.av].menu)return;var menuObj = document.createElement("DIV");menuObj.style.position = "relative";menuObj.style.overflow = "hidden";menuObj.id = "dhxmenu_"+this._genStr(12);if (this.cv == this.av)this.vs[this.av].dhxcont.insertBefore(menuObj, this.vs[this.av].dhxcont.childNodes[0]);else that.st.appendChild(menuObj);if (typeof(skin)!= "object") {this.vs[this.av].menu = new dhtmlXMenuObject(menuObj.id, (skin||this.skin));}else {skin.parent = menuObj.id;this.vs[this.av].menu = new dhtmlXMenuObject(skin);}
 this.vs[this.av].menuHeight = (this.skin=="dhx_web"?29:menuObj.offsetHeight);this.vs[this.av].menuId = menuObj.id;if (this._doOnAttachMenu)this._doOnAttachMenu("init");this.adjust();return this.vs[this._viewRestore()].menu;}
 
 this.obj.detachMenu = function() {if (!this.vs[this.av].menu)return;var menuObj = document.getElementById(this.vs[this.av].menuId);this.vs[this.av].menu.unload();this.vs[this.av].menu = null;this.vs[this.av].menuId = null;this.vs[this.av].menuHeight = null;if (menuObj)menuObj.parentNode.removeChild(menuObj);menuObj = null;this._viewRestore();if (this._doOnAttachMenu)this._doOnAttachMenu("unload");}
 
 this.obj.attachToolbar = function(skin) {if (this.vs[this.av].toolbar)return;var toolbarObj = document.createElement("DIV");toolbarObj.style.position = "relative";toolbarObj.style.overflow = "hidden";toolbarObj.id = "dhxtoolbar_"+this._genStr(12);if (this.cv == this.av)this.vs[this.av].dhxcont.insertBefore(toolbarObj, this.vs[this.av].dhxcont.childNodes[(this.vs[this.av].menu!=null?1:0)]);else that.st.appendChild(toolbarObj);if (typeof(skin)!= "object") {this.vs[this.av].toolbar = new dhtmlXToolbarObject(toolbarObj.id, (skin||this.skin));}else {skin.parent = toolbarObj.id;this.vs[this.av].toolbar = new dhtmlXToolbarObject(skin);}
 this.vs[this.av].toolbarHeight = toolbarObj.offsetHeight;this.vs[this.av].toolbarId = toolbarObj.id;if (this._doOnAttachToolbar)this._doOnAttachToolbar("init");this.adjust();var t = this;this.vs[this.av].toolbar.attachEvent("_onIconSizeChange",function(size){t.vs[t.av].toolbarHeight = this.cont.offsetHeight;t.vs[t.av].toolbarId = this.cont.id;if (t._doOnAttachToolbar)t._doOnAttachToolbar("iconSizeChange");});if (this.skin != "dhx_terrace")this.vs[this.av].toolbar.callEvent("_onIconSizeChange",[]);return this.vs[this._viewRestore()].toolbar;}
 
 this.obj.detachToolbar = function() {if (!this.vs[this.av].toolbar)return;var toolbarObj = document.getElementById(this.vs[this.av].toolbarId);this.vs[this.av].toolbar.unload();this.vs[this.av].toolbar = null;this.vs[this.av].toolbarId = null;this.vs[this.av].toolbarHeight = null;if (toolbarObj)toolbarObj.parentNode.removeChild(toolbarObj);toolbarObj = null;this._viewRestore();if (this._doOnAttachToolbar)this._doOnAttachToolbar("unload");}
 
 this.obj.attachGrid = function() {if (this._isWindow && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this._redraw();}
 
 var obj = document.createElement("DIV");obj.id = "dhxGridObj_"+this._genStr(12);obj.style.width = "100%";obj.style.height = "100%";obj.cmp = "grid";document.body.appendChild(obj);this.attachObject(obj.id, false, true, false);this.vs[this.av].grid = new dhtmlXGridObject(obj.id);this.vs[this.av].grid.setSkin(this.skin);if (this.skin == "dhx_skyblue" || this.skin == "dhx_black" || this.skin == "dhx_blue"){this.vs[this.av].grid.entBox.style.border = "0px solid white";this.vs[this.av].grid._sizeFix = 2;}
 this.vs[this.av].gridId = obj.id;this.vs[this.av].gridObj = obj;if (this.skin == "dhx_terrace"){this.adjust();this.updateNestedObjects(true);}
 
 return this.vs[this._viewRestore()].grid;}
 
 this.obj.attachScheduler = function(day,mode,cont_id,scheduler) {scheduler = scheduler || window.scheduler;var ready = 0;if (cont_id){obj = document.getElementById(cont_id);if (obj)ready = 1;}
 if (!ready){var tabs = cont_id || '<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>';var obj = document.createElement("DIV");obj.id = "dhxSchedObj_"+this._genStr(12);obj.innerHTML = '<div id="'+obj.id+'" class="dhx_cal_container" style="width:100%;height:100%;"><div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>'+tabs+'</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div></div>';document.body.appendChild(obj.firstChild);}
 
 this.attachObject(obj.id, false, true, false);this.vs[this.av].sched = scheduler;this.vs[this.av].schedId = obj.id;scheduler.setSizes = scheduler.update_view;scheduler.destructor=function(){};scheduler.init(obj.id,day,mode);return this.vs[this._viewRestore()].sched;}
 
 this.obj.attachTree = function(rootId) {if (this._isWindow && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this._redraw();}
 
 var obj = document.createElement("DIV");obj.id = "dhxTreeObj_"+this._genStr(12);obj.style.width = "100%";obj.style.height = "100%";obj.cmp = "tree";document.body.appendChild(obj);this.attachObject(obj.id, false, true, false);this.vs[this.av].tree = new dhtmlXTreeObject(obj.id, "100%", "100%", (rootId||0));this.vs[this.av].tree.setSkin(this.skin);this.vs[this.av].tree.allTree.childNodes[0].style.marginTop = "2px";this.vs[this.av].tree.allTree.childNodes[0].style.marginBottom = "2px";this.vs[this.av].treeId = obj.id;this.vs[this.av].treeObj = obj;if (this.skin == "dhx_terrace"){this.adjust();this.updateNestedObjects(true);}
 
 return this.vs[this._viewRestore()].tree;}
 
 this.obj.attachTabbar = function(mode) {if (this._isWindow && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.style.border = "none";this.setDimension(this.w, this.h);}
 
 var obj = document.createElement("DIV");obj.id = "dhxTabbarObj_"+this._genStr(12);obj.style.width = "100%";obj.style.height = "100%";obj.style.overflow = "hidden";obj.cmp = "tabbar";if (!this._isWindow)obj._hideBorders = true;document.body.appendChild(obj);this.attachObject(obj.id, false, true, false);if (this._isCell){this.hideHeader();obj._hideBorders = false;this._padding = false;}
 
 this.vs[this.av].tabbar = new dhtmlXTabBar(obj.id, mode||"top", (this.skin=="dhx_terrace"?null:20));if (!this._isWindow && this.skin != "dhx_terrace")this.vs[this.av].tabbar._s.expand = true;this.vs[this.av].tabbar.setSkin(this.skin);this.vs[this.av].tabbar.adjustOuterSize();this.vs[this.av].tabbarId = obj.id;this.vs[this.av].tabbarObj = obj;if (this.skin == "dhx_terrace"){this.adjust();this.updateNestedObjects(true);}
 
 return this.vs[this._viewRestore()].tabbar;}
 
 this.obj.attachFolders = function() {if (this._isWindow && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this._redraw();}
 var obj = document.createElement("DIV");obj.id = "dhxFoldersObj_"+this._genStr(12);obj.style.width = "100%";obj.style.height = "100%";obj.style.overflow = "hidden";obj.cmp = "folders";document.body.appendChild(obj);this.attachObject(obj.id, false, true, false);this.vs[this.av].folders = new dhtmlxFolders(obj.id);this.vs[this.av].folders.setSizes();this.vs[this.av].foldersId = obj.id;this.vs[this.av].foldersObj = obj;return this.vs[this._viewRestore()].folders;}
 
 this.obj.attachAccordion = function() {if (this._isWindow && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this._redraw();}
 
 var obj = document.createElement("DIV");obj.id = "dhxAccordionObj_"+this._genStr(12);this._padding = true;if (this.skin == "dhx_web"){obj.style.left = "0px";obj.style.top = "0px";obj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+"px";obj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+"px";}else if (this.skin != "dhx_terrace"){obj.style.left = "-1px";obj.style.top = "-1px";obj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+2+"px";obj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+2+"px";}
 
 
 obj.style.position = "relative";obj.cmp = "accordion";document.body.appendChild(obj);this.attachObject(obj.id, false, true, false);this.vs[this.av].accordion = new dhtmlXAccordion(obj.id, this.skin);this.vs[this.av].accordion.setSizes();this.vs[this.av].accordionId = obj.id;this.vs[this.av].accordionObj = obj;if (this.skin == "dhx_terrace"){this.adjust();this.updateNestedObjects(true);}
 
 return this.vs[this._viewRestore()].accordion;}
 
 this.obj.attachLayout = function(view, skin) {if (this._isCell && this.skin == "dhx_skyblue"){this.hideHeader();this.vs[this.av].dhxcont.style.border = "0px solid white";this.adjustContent(this.childNodes[0], 0);}
 
 if (this._isCell && this.skin == "dhx_web"){this.hideHeader();}
 
 this._padding = true;var obj = document.createElement("DIV");obj.id = "dhxLayoutObj_"+this._genStr(12);obj.style.overflow = "hidden";obj.style.position = "absolute";obj.style.left = "0px";obj.style.top = "0px";obj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+"px";obj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+"px";if ((this._isTabbarCell || this._isAcc)&& (this.skin == "dhx_skyblue")) {obj.style.left = "-1px";obj.style.top = "-1px";obj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width)+2+"px";obj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height)+2+"px";}
 
 
 obj.dhxContExists = true;obj.cmp = "layout";document.body.appendChild(obj);this.attachObject(obj.id, false, true, false);this.vs[this.av].layout = new dhtmlXLayoutObject(obj, view, (skin||this.skin));if (this._isWindow)this.attachEvent("_onBeforeTryResize", this.vs[this.av].layout._defineWindowMinDimension);this.vs[this.av].layoutId = obj.id;this.vs[this.av].layoutObj = obj;if (this.skin == "dhx_terrace"){if (this._isCell){this.style.backgroundColor = "transparent";this.vs[this.av].dhxcont.style.backgroundColor = "transparent";this.hideHeader();}
 this.adjust();this.updateNestedObjects(true);}
 
 return this.vs[this._viewRestore()].layout;}
 
 this.obj.attachEditor = function(skin) {if (this._isWindow && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this._redraw();}
 
 var obj = document.createElement("DIV");obj.id = "dhxEditorObj_"+this._genStr(12);obj.style.position = "relative";obj.style.display = "none";obj.style.overflow = "hidden";obj.style.width = "100%";obj.style.height = "100%";obj.cmp = "editor";document.body.appendChild(obj);if (this.skin == "dhx_terrace")obj._attached = true;this.attachObject(obj.id, false, true, false);this.vs[this.av].editor = new dhtmlXEditor(obj.id, skin||this.skin);this.vs[this.av].editorId = obj.id;this.vs[this.av].editorObj = obj;if (this.skin == "dhx_terrace"){this.adjust();this.updateNestedObjects(true);}
 
 return this.vs[this._viewRestore()].editor;}
 
 this.obj.attachMap = function(opts) {var obj = document.createElement("DIV");obj.id = "GMapsObj_"+this._genStr(12);obj.style.position = "relative";obj.style.display = "none";obj.style.overflow = "hidden";obj.style.width = "100%";obj.style.height = "100%";obj.cmp = "gmaps";document.body.appendChild(obj);this.attachObject(obj.id, false, true, true);if (!opts)opts = {center: new google.maps.LatLng(40.719837,-73.992348), zoom: 11, mapTypeId: google.maps.MapTypeId.ROADMAP};this.vs[this.av].gmaps = new google.maps.Map(obj, opts);return this.vs[this.av].gmaps;}
 
 
 this.obj.attachObject = function(obj, autoSize, localCall, adjustMT) {if (typeof(obj)== "string") obj = document.getElementById(obj);if (autoSize){obj.style.visibility = "hidden";obj.style.display = "";var objW = obj.offsetWidth;var objH = obj.offsetHeight;}
 this._attachContent("obj", obj);if (autoSize && this._isWindow){obj.style.visibility = "";this._adjustToContent(objW, objH);}
 
 if (this.skin == "dhx_terrace"){if (this.vs[this.av].menu != null || this.vs[this.av].toolbar != null){this.adjust(typeof(adjustMT)=="undefined"||adjustMT==true);this.updateNestedObjects(true);}
 }
 if (!localCall){this._viewRestore();}
 
 }
 
 this.obj.detachObject = function(remove, moveTo) {var p = null;var pObj = null;var t = ["tree","grid","layout","tabbar","accordion","folders"];for (var q=0;q<t.length;q++){if (this.vs[this.av][t[q]]){p = this.vs[this.av][t[q]];pObj = this.vs[this.av][t[q]+"Obj"];if (remove){if (p.unload)p.unload();if (p.destructor)p.destructor();while (pObj.childNodes.length > 0)pObj.removeChild(pObj.childNodes[0]);pObj.parentNode.removeChild(pObj);pObj = null;p = null;}else {document.body.appendChild(pObj);pObj.style.display = "none";}
 this.vs[this.av][t[q]] = null;this.vs[this.av][t[q]+"Id"] = null;this.vs[this.av][t[q]+"Obj"] = null;}
 }
 
 if (p != null && pObj != null)return new Array(p, pObj);if (remove && this.vs[this.av]._frame){this._detachURLEvents();this.vs[this.av]._frame = null;}
 
 var objA = this.vs[this.av].dhxcont.mainCont[this.av];while (objA.childNodes.length > 0){if (remove == true){objA.removeChild(objA.childNodes[0]);}else {var obj = objA.childNodes[0];if (moveTo != null){if (typeof(moveTo)!= "object") moveTo = document.getElementById(moveTo);moveTo.appendChild(obj);}else {document.body.appendChild(obj);}
 obj.style.display = "none";}
 }
 
 objA = moveTo = null;}
 
 
 this.obj.appendObject = function(obj) {if (typeof(obj)== "string") {obj = document.getElementById(obj);}
 this._attachContent("obj", obj, true);}
 
 this.obj.attachHTMLString = function(str) {this._attachContent("str", str);var z=str.match(/<script[^>]*>[^\f]*?<\/script>/g)||[];for (var i=0;i<z.length;i++){var s=z[i].replace(/<([\/]{0,1})script[^>]*>/g,"")
 if (s){if (window.execScript)window.execScript(s);else window.eval(s);}
 }
 }
 
 this.obj.attachURL = function(url, ajax) {this._attachContent((ajax==true?"urlajax":"url"), url, false);if (this.skin == "dhx_terrace"){if (this.vs[this.av].menu != null || this.vs[this.av].toolbar != null){this.adjust(true);this.updateNestedObjects(true);}
 }
 this._viewRestore();}
 this.obj.adjust = function(adjustMT) {if (this.skin == "dhx_skyblue"){if (this.vs[this.av].menu){if (this._isWindow || this._isLayout){this.vs[this.av].menu._topLevelOffsetLeft = 0;document.getElementById(this.vs[this.av].menuId).style.height = "26px";this.vs[this.av].menuHeight = document.getElementById(this.vs[this.av].menuId).offsetHeight;if (this._doOnAttachMenu)this._doOnAttachMenu("show");}
 if (this._isCell){document.getElementById(this.vs[this.av].menuId).className += " in_layoutcell";this.vs[this.av].menuHeight = 25;}
 if (this._isAcc){document.getElementById(this.vs[this.av].menuId).className += " in_acccell";this.vs[this.av].menuHeight = 25;}
 if (this._doOnAttachMenu)this._doOnAttachMenu("adjust");}
 if (this.vs[this.av].toolbar){if (this._isWindow){document.getElementById(this.vs[this.av].toolbarId).className += " in_window";}
 if (this._isLayout){document.getElementById(this.vs[this.av].toolbarId).className += " in_layout";}
 if (this._isCell){document.getElementById(this.vs[this.av].toolbarId).className += " in_layoutcell";}
 if (this._isAcc){document.getElementById(this.vs[this.av].toolbarId).className += " in_acccell";}
 if (this._isTabbarCell){document.getElementById(this.vs[this.av].toolbarId).className += " in_tabbarcell";}
 }
 }
 
 if (this.skin == "dhx_web"){if (this.vs[this.av].toolbar){if (this._isWindow){document.getElementById(this.vs[this.av].toolbarId).className += " in_window";}
 if (this._isLayout){document.getElementById(this.vs[this.av].toolbarId).className += " in_layout";}
 if (this._isCell){document.getElementById(this.vs[this.av].toolbarId).className += " in_layoutcell";}
 if (this._isAcc){document.getElementById(this.vs[this.av].toolbarId).className += " in_acccell";}
 if (this._isTabbarCell){document.getElementById(this.vs[this.av].toolbarId).className += " in_tabbarcell";}
 }
 }
 
 if (this.skin == "dhx_terrace"){var mtLRPad = 0;if (this._isWindow || this._isCell || this._isAcc || this._isTabbarCell)mtLRPad = 14;if (this._isCell && this._noHeader)mtLRPad = 0;var mtTPad = 0;if (this._isWindow || this._isCell || this._isAcc || this._isTabbarCell)mtTPad = 14;if (this._isCell && this._noHeader)mtTPad = 0;var mBPad = ((adjustMT == true && !this.vs[this.av].toolbar) || this._isLayout ? 14 : 0);var tBPad = (adjustMT == true || this._isLayout ? 14 : 0);var mtAttached = false;if (this.vs[this.av].menu){document.getElementById(this.vs[this.av].menuId).style.marginLeft = mtLRPad+"px";document.getElementById(this.vs[this.av].menuId).style.marginRight = mtLRPad+"px";document.getElementById(this.vs[this.av].menuId).style.marginTop = mtTPad+"px";document.getElementById(this.vs[this.av].menuId).style.marginBottom = mBPad+"px";this.vs[this.av].menuHeight = 32+mtTPad+mBPad;if (this._doOnAttachMenu)this._doOnAttachMenu("show");mtAttached = true;}
 
 if (this.vs[this.av].toolbar){if (mtTPad == 0 && this.vs[this.av].menu != null & this._isCell)mtTPad = 14;document.getElementById(this.vs[this.av].toolbarId).style.marginLeft = mtLRPad+"px";document.getElementById(this.vs[this.av].toolbarId).style.marginRight = mtLRPad+"px";document.getElementById(this.vs[this.av].toolbarId).style.marginTop = mtTPad+"px";document.getElementById(this.vs[this.av].toolbarId).style.marginBottom = tBPad+"px";this.vs[this.av].toolbarHeight = 32+mtTPad+tBPad;if (this._doOnAttachToolbar)this._doOnAttachToolbar("show");mtAttached = true;}
 }
 }
 
 
 this.obj._attachContent = function(type, obj, append) {if (append !== true){if (this.vs[this.av]._frame){this._detachURLEvents();this.vs[this.av]._frame = null;}
 while (this.vs[this.av].dhxcont.mainCont[this.av].childNodes.length > 0)this.vs[this.av].dhxcont.mainCont[this.av].removeChild(this.vs[this.av].dhxcont.mainCont[this.av].childNodes[0]);}
 
 if (type == "url"){if (this._isWindow && obj.cmp == null && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this._redraw();}
 var fr = document.createElement("IFRAME");fr.frameBorder = 0;fr.border = 0;fr.style.width = "100%";fr.style.height = "100%";fr.setAttribute("src","javascript:false;");this.vs[this.av].dhxcont.mainCont[this.av].appendChild(fr);fr.src = obj;this.vs[this.av]._frame = fr;this._attachURLEvents();}else if (type == "urlajax"){if (this._isWindow && obj.cmp == null && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this.vs[this.av].dhxcont.mainCont[this.av].style.backgroundColor = "#FFFFFF";this._redraw();}
 var t = this;var tav = String(this.av).valueOf();var xmlParser = function(){var tmp = t.av;t.av = tav;t.attachHTMLString(this.xmlDoc.responseText, this);t.av = tmp;if (t._doOnFrameContentLoaded)t._doOnFrameContentLoaded();this.destructor();}
 var xmlLoader = new dtmlXMLLoaderObject(xmlParser, window);xmlLoader.dhxWindowObject = this;xmlLoader.loadXML(obj);}else if (type == "obj"){if (this._isWindow && obj.cmp == null && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this.vs[this.av].dhxcont.mainCont[this.av].style.backgroundColor = "#FFFFFF";this._redraw();}
 this.vs[this.av].dhxcont._frame = null;this.vs[this.av].dhxcont.mainCont[this.av].appendChild(obj);this.vs[this.av].dhxcont.mainCont[this.av].style.overflow = (append===true?"auto":"hidden");obj.style.display = "";}else if (type == "str"){if (this._isWindow && obj.cmp == null && this.skin == "dhx_skyblue"){this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid";this.vs[this.av].dhxcont.mainCont[this.av].style.backgroundColor = "#FFFFFF";this._redraw();}
 this.vs[this.av].dhxcont._frame = null;this.vs[this.av].dhxcont.mainCont[this.av].innerHTML = obj;}
 }
 
 this.obj._attachURLEvents = function() {var t = this;var fr = this.vs[this.av]._frame;if (_isIE){fr.onreadystatechange = function(a) {if (fr.readyState == "complete"){try {fr.contentWindow.document.body.onmousedown=function(){if(t._doOnFrameMouseDown)t._doOnFrameMouseDown();};}catch(e){};try{if(t._doOnFrameContentLoaded)t._doOnFrameContentLoaded();}catch(e){};}
 }
 }else {fr.onload = function() {try{fr.contentWindow.onmousedown=function(){if(t._doOnFrameMouseDown)t._doOnFrameMouseDown();};}catch(e){};try{if(t._doOnFrameContentLoaded)t._doOnFrameContentLoaded();}catch(e){};}
 }
 }
 
 this.obj._detachURLEvents = function() {if (_isIE){try {this.vs[this.av]._frame.onreadystatechange = null;this.vs[this.av]._frame.contentWindow.document.body.onmousedown = null;this.vs[this.av]._frame.onload = null;}catch(e) {};}else {try {this.vs[this.av]._frame.contentWindow.onmousedown = null;this.vs[this.av]._frame.onload = null;}catch(e) {};}
 }
 
 this.obj.showMenu = function() {if (!(this.vs[this.av].menu && this.vs[this.av].menuId)) return;if (document.getElementById(this.vs[this.av].menuId).style.display != "none") return;this.vs[this.av].menuHidden = false;if (this._doOnAttachMenu)this._doOnAttachMenu("show");document.getElementById(this.vs[this.av].menuId).style.display = "";this._viewRestore();}
 
 this.obj.hideMenu = function() {if (!(this.vs[this.av].menu && this.vs[this.av].menuId)) return;if (document.getElementById(this.vs[this.av].menuId).style.display == "none") return;document.getElementById(this.vs[this.av].menuId).style.display = "none";this.vs[this.av].menuHidden = true;if (this._doOnAttachMenu)this._doOnAttachMenu("hide");this._viewRestore();}
 
 this.obj.showToolbar = function() {if (!(this.vs[this.av].toolbar && this.vs[this.av].toolbarId)) return;if (document.getElementById(this.vs[this.av].toolbarId).style.display != "none") return;this.vs[this.av].toolbarHidden = false;if (this._doOnAttachToolbar)this._doOnAttachToolbar("show");document.getElementById(this.vs[this.av].toolbarId).style.display = "";this._viewRestore();}
 
 this.obj.hideToolbar = function() {if (!(this.vs[this.av].toolbar && this.vs[this.av].toolbarId)) return;if (document.getElementById(this.vs[this.av].toolbarId).style.display == "none") return;this.vs[this.av].toolbarHidden = true;document.getElementById(this.vs[this.av].toolbarId).style.display = "none";if (this._doOnAttachToolbar)this._doOnAttachToolbar("hide");this._viewRestore();}
 
 this.obj.showStatusBar = function() {if (!(this.vs[this.av].sb && this.vs[this.av].sbId)) return;if (document.getElementById(this.vs[this.av].sbId).style.display != "none") return;this.vs[this.av].sbHidden = false;if (this._doOnAttachStatusBar)this._doOnAttachStatusBar("show");document.getElementById(this.vs[this.av].sbId).style.display = "";this._viewRestore();}
 
 this.obj.hideStatusBar = function() {if (!(this.vs[this.av].sb && this.vs[this.av].sbId)) return;if (document.getElementById(this.vs[this.av].sbId).style.display == "none") return;this.vs[this.av].sbHidden = true;document.getElementById(this.vs[this.av].sbId).style.display = "none";if (this._doOnAttachStatusBar)this._doOnAttachStatusBar("hide");this._viewRestore();}
 
 this.obj._dhxContDestruct = function() {var av = this.av;for (var a in this.vs){this.av = a;this.detachMenu();this.detachToolbar();this.detachStatusBar();this.detachObject(true);this.vs[a].dhxcont.mainCont[a] = null;}
 
 for (var a in this.vs){this.vs[a].dhxcont.mainCont = null;this.vs[a].dhxcont.innerHTML = "";this.vs[a].dhxcont = null;this.vs[a] = null;}
 this.vs = null;this.attachMenu = null;this.attachToolbar = null;this.attachStatusBar = null;this.detachMenu = null;this.detachToolbar = null;this.detachStatusBar = null;this.showMenu = null;this.showToolbar = null;this.showStatusBar = null;this.hideMenu = null;this.hideToolbar = null;this.hideStatusBar = null;this.attachGrid = null;this.attachScheduler = null;this.attachTree = null;this.attachTabbar = null;this.attachFolders = null;this.attachAccordion = null;this.attachLayout = null;this.attachEditor = null;this.attachObject = null;this.detachObject = null;this.appendObject = null;this.attachHTMLString = null;this.attachURL = null;this.attachMap = null;this.view = null;this.show = null;this.adjust = null;this.setMinContentSize = null;this.moveContentTo = null;this.adjustContent = null;this.coverBlocker = null;this.showCoverBlocker = null;this.hideCoverBlocker = null;this.updateNestedObjects = null;this._attachContent = null;this._attachURLEvents = null;this._detachURLEvents = null;this._viewRestore = null;this._setPadding = null;this._init = null;this._genStr = null;this._dhxContDestruct = null;this._getSt = null;this.getFrame = null;this.getView = null;this.setActive = null;that.st.innerHTML = "";that.st.parentNode.removeChild(that.st);that.st = null;that.setContent = null;that.dhxcont = null;that.obj = null;that = null;if (dhtmlx.detaches)for (var a in dhtmlx.detaches)dhtmlx.detaches[a](this);}
 
 
 if (dhtmlx.attaches)for (var a in dhtmlx.attaches)this.obj[a] = dhtmlx.attaches[a];return this;}
function dataProcessor(serverProcessorURL){this.serverProcessor = serverProcessorURL;this.action_param="!nativeeditor_status";this.object = null;this.updatedRows = [];this.autoUpdate = true;this.updateMode = "cell";this._tMode="GET";this.post_delim = "_";this._waitMode=0;this._in_progress={};this._invalid={};this.mandatoryFields=[];this.messages=[];this.styles={updated:"font-weight:bold;",
 inserted:"font-weight:bold;",
 deleted:"text-decoration : line-through;",
 invalid:"background-color:FFE0E0;",
 invalid_cell:"border-bottom:2px solid red;",
 error:"color:red;",
 clear:"font-weight:normal;text-decoration:none;"
 };this.enableUTFencoding(true);dhtmlxEventable(this);return this;}
dataProcessor.prototype={setTransactionMode:function(mode,total){this._tMode=mode;this._tSend=total;},
 escape:function(data){if (this._utf)return encodeURIComponent(data);else
 return escape(data);},
 
 enableUTFencoding:function(mode){this._utf=convertStringToBoolean(mode);},
 
 setDataColumns:function(val){this._columns=(typeof val == "string")?val.split(","):val;},
 
 getSyncState:function(){return !this.updatedRows.length;},
 
 enableDataNames:function(mode){this._endnm=convertStringToBoolean(mode);},
 
 enablePartialDataSend:function(mode){this._changed=convertStringToBoolean(mode);},
 
 setUpdateMode:function(mode,dnd){this.autoUpdate = (mode=="cell");this.updateMode = mode;this.dnd=dnd;},
 ignore:function(code,master){this._silent_mode=true;code.call(master||window);this._silent_mode=false;},
 
 setUpdated:function(rowId,state,mode){if (this._silent_mode)return;var ind=this.findRow(rowId);mode=mode||"updated";var existing = this.obj.getUserData(rowId,this.action_param);if (existing && mode == "updated")mode=existing;if (state){this.set_invalid(rowId,false);this.updatedRows[ind]=rowId;this.obj.setUserData(rowId,this.action_param,mode);if (this._in_progress[rowId])this._in_progress[rowId]="wait";}else{if (!this.is_invalid(rowId)){this.updatedRows.splice(ind,1);this.obj.setUserData(rowId,this.action_param,"");}
 }
 
 if (!state)this._clearUpdateFlag(rowId);this.markRow(rowId,state,mode);if (state && this.autoUpdate)this.sendData(rowId);},
 _clearUpdateFlag:function(id){},
 markRow:function(id,state,mode){var str="";var invalid=this.is_invalid(id);if (invalid){str=this.styles[invalid];state=true;}
 if (this.callEvent("onRowMark",[id,state,mode,invalid])){str=this.styles[state?mode:"clear"]+str;this.obj[this._methods[0]](id,str);if (invalid && invalid.details){str+=this.styles[invalid+"_cell"];for (var i=0;i < invalid.details.length;i++)if (invalid.details[i])this.obj[this._methods[1]](id,i,str);}
 }
 },
 getState:function(id){return this.obj.getUserData(id,this.action_param);},
 is_invalid:function(id){return this._invalid[id];},
 set_invalid:function(id,mode,details){if (details)mode={value:mode, details:details, toString:function(){return this.value.toString();}};this._invalid[id]=mode;},
 
 checkBeforeUpdate:function(rowId){return true;},
 
 sendData:function(rowId){if (this._waitMode && (this.obj.mytype=="tree" || this.obj._h2)) return;if (this.obj.editStop)this.obj.editStop();if(typeof rowId == "undefined" || this._tSend)return this.sendAllData();if (this._in_progress[rowId])return false;this.messages=[];if (!this.checkBeforeUpdate(rowId)&& this.callEvent("onValidationError",[rowId,this.messages])) return false;this._beforeSendData(this._getRowData(rowId),rowId);},
 _beforeSendData:function(data,rowId){if (!this.callEvent("onBeforeUpdate",[rowId,this.getState(rowId),data])) return false;this._sendData(data,rowId);},
 serialize:function(data, id){if (typeof data == "string")return data;if (typeof id != "undefined")return this.serialize_one(data,"");else{var stack = [];var keys = [];for (var key in data)if (data.hasOwnProperty(key)){stack.push(this.serialize_one(data[key],key+this.post_delim));keys.push(key);}
 stack.push("ids="+this.escape(keys.join(",")));if (dhtmlx.security_key)stack.push("dhx_security="+dhtmlx.security_key);return stack.join("&");}
 },
 serialize_one:function(data, pref){if (typeof data == "string")return data;var stack = [];for (var key in data)if (data.hasOwnProperty(key))
 stack.push(this.escape((pref||"")+key)+"="+this.escape(data[key]));return stack.join("&");},
 _sendData:function(a1,rowId){if (!a1)return;if (!this.callEvent("onBeforeDataSending",rowId?[rowId,this.getState(rowId),a1]:[null, null, a1])) return false;if (rowId)this._in_progress[rowId]=(new Date()).valueOf();var a2=new dtmlXMLLoaderObject(this.afterUpdate,this,true);var a3 = this.serverProcessor+(this._user?(getUrlSymbol(this.serverProcessor)+["dhx_user="+this._user,"dhx_version="+this.obj.getUserData(0,"version")].join("&")):"");if (this._tMode!="POST")a2.loadXML(a3+((a3.indexOf("?")!=-1)?"&":"?")+this.serialize(a1,rowId));else
 a2.loadXML(a3,true,this.serialize(a1,rowId));this._waitMode++;},
 sendAllData:function(){if (!this.updatedRows.length)return;this.messages=[];var valid=true;for (var i=0;i<this.updatedRows.length;i++)valid&=this.checkBeforeUpdate(this.updatedRows[i]);if (!valid && !this.callEvent("onValidationError",["",this.messages])) return false;if (this._tSend)this._sendData(this._getAllData());else
 for (var i=0;i<this.updatedRows.length;i++)if (!this._in_progress[this.updatedRows[i]]){if (this.is_invalid(this.updatedRows[i])) continue;this._beforeSendData(this._getRowData(this.updatedRows[i]),this.updatedRows[i]);if (this._waitMode && (this.obj.mytype=="tree" || this.obj._h2)) return;}
 },
 
 
 
 
 
 
 
 
 _getAllData:function(rowId){var out={};var has_one = false;for(var i=0;i<this.updatedRows.length;i++){var id=this.updatedRows[i];if (this._in_progress[id] || this.is_invalid(id)) continue;if (!this.callEvent("onBeforeUpdate",[id,this.getState(id)])) continue;out[id]=this._getRowData(id,id+this.post_delim);has_one = true;this._in_progress[id]=(new Date()).valueOf();}
 return has_one?out:null;},
 
 
 
 setVerificator:function(ind,verifFunction){this.mandatoryFields[ind] = verifFunction||(function(value){return (value!="");});},
 
 clearVerificator:function(ind){this.mandatoryFields[ind] = false;},
 
 
 
 
 
 findRow:function(pattern){var i=0;for(i=0;i<this.updatedRows.length;i++)if(pattern==this.updatedRows[i])break;return i;},

 
 


 





 
 defineAction:function(name,handler){if (!this._uActions)this._uActions=[];this._uActions[name]=handler;},




 
 afterUpdateCallback:function(sid, tid, action, btag) {var marker = sid;var correct=(action!="error" && action!="invalid");if (!correct)this.set_invalid(sid,action);if ((this._uActions)&&(this._uActions[action])&&(!this._uActions[action](btag))) 
 return (delete this._in_progress[marker]);if (this._in_progress[marker]!="wait")this.setUpdated(sid, false);var soid = sid;switch (action) {case "inserted":
 case "insert":
 if (tid != sid){this.obj[this._methods[2]](sid, tid);sid = tid;}
 break;case "delete":
 case "deleted":
 this.obj.setUserData(sid, this.action_param, "true_deleted");this.obj[this._methods[3]](sid);delete this._in_progress[marker];return this.callEvent("onAfterUpdate", [sid, action, tid, btag]);break;}
 
 if (this._in_progress[marker]!="wait"){if (correct)this.obj.setUserData(sid, this.action_param,'');delete this._in_progress[marker];}else {delete this._in_progress[marker];this.setUpdated(tid,true,this.obj.getUserData(sid,this.action_param));}
 
 this.callEvent("onAfterUpdate", [soid, action, tid, btag]);},

 
 afterUpdate:function(that,b,c,d,xml){xml.getXMLTopNode("data");if (!xml.xmlDoc.responseXML)return;var atag=xml.doXPath("//data/action");for (var i=0;i<atag.length;i++){var btag=atag[i];var action = btag.getAttribute("type");var sid = btag.getAttribute("sid");var tid = btag.getAttribute("tid");that.afterUpdateCallback(sid,tid,action,btag);}
 that.finalizeUpdate();},
 finalizeUpdate:function(){if (this._waitMode)this._waitMode--;if ((this.obj.mytype=="tree" || this.obj._h2)&& this.updatedRows.length) 
 this.sendData();this.callEvent("onAfterUpdateFinish",[]);if (!this.updatedRows.length)this.callEvent("onFullSync",[]);},




 
 
 init:function(anObj){this.obj = anObj;if (this.obj._dp_init)this.obj._dp_init(this);},
 
 
 setOnAfterUpdate:function(ev){this.attachEvent("onAfterUpdate",ev);},
 enableDebug:function(mode){},
 setOnBeforeUpdateHandler:function(func){this.attachEvent("onBeforeDataSending",func);},



 
 setAutoUpdate: function(interval, user) {interval = interval || 2000;this._user = user || (new Date()).valueOf();this._need_update = false;this._loader = null;this._update_busy = false;this.attachEvent("onAfterUpdate",function(sid,action,tid,xml_node){this.afterAutoUpdate(sid, action, tid, xml_node);});this.attachEvent("onFullSync",function(){this.fullSync();});var self = this;window.setInterval(function(){self.loadUpdate();}, interval);},


 
 afterAutoUpdate: function(sid, action, tid, xml_node) {if (action == 'collision'){this._need_update = true;return false;}else {return true;}
 },


 
 fullSync: function() {if (this._need_update == true){this._need_update = false;this.loadUpdate();}
 return true;},


 
 getUpdates: function(url,callback){if (this._update_busy)return false;else
 this._update_busy = true;this._loader = this._loader || new dtmlXMLLoaderObject(true);this._loader.async=true;this._loader.waitCall=callback;this._loader.loadXML(url);},


 
 _v: function(node) {if (node.firstChild)return node.firstChild.nodeValue;return "";},


 
 _a: function(arr) {var res = [];for (var i=0;i < arr.length;i++){res[i]=this._v(arr[i]);};return res;},


 
 loadUpdate: function(){var self = this;var version = this.obj.getUserData(0,"version");var url = this.serverProcessor+getUrlSymbol(this.serverProcessor)+["dhx_user="+this._user,"dhx_version="+version].join("&");url = url.replace("editing=true&","");this.getUpdates(url, function(){var vers = self._loader.doXPath("//userdata");self.obj.setUserData(0,"version",self._v(vers[0]));var upds = self._loader.doXPath("//update");if (upds.length){self._silent_mode = true;for (var i=0;i<upds.length;i++){var status = upds[i].getAttribute('status');var id = upds[i].getAttribute('id');var parent = upds[i].getAttribute('parent');switch (status) {case 'inserted':
 self.callEvent("insertCallback",[upds[i], id, parent]);break;case 'updated':
 self.callEvent("updateCallback",[upds[i], id, parent]);break;case 'deleted':
 self.callEvent("deleteCallback",[upds[i], id, parent]);break;}
 }
 
 self._silent_mode = false;}
 
 self._update_busy = false;self = null;});}
};window.dhx||(dhx={});dhx.version="3.0";dhx.codebase="./";dhx.name="Core";dhx.clone=function(a){var b=dhx.clone.xa;b.prototype=a;return new b};dhx.clone.xa=function(){};dhx.extend=function(a,b,c){if(a.q)return dhx.PowerArray.insertAt.call(a.q,b,1),a;for(var d in b)if(!a[d]||c)a[d]=b[d];b.defaults&&dhx.extend(a.defaults,b.defaults);b.$init&&b.$init.call(a);return a};dhx.copy=function(a){if(arguments.length>1)var b=arguments[0],a=arguments[1];else b=dhx.isArray(a)?[]:{};for(var c in a)a[c]&&typeof a[c]=="object"&&!dhx.isDate(a[c])?(b[c]=dhx.isArray(a[c])?[]:{},dhx.copy(b[c],a[c])):b[c]=a[c];return b};dhx.single=function(a){var b=null,c=function(c){b||(b=new a({}));b.Ia&&b.Ia.apply(b,arguments);return b};return c};dhx.protoUI=function(){var a=arguments,b=a[0].name,c=function(a){if(!c)return dhx.ui[b].prototype;var e=c.q;if(e){for(var f=[e[0]],g=1;g<e.length;g++)f[g]=e[g],f[g].q&&(f[g]=f[g].call(dhx,f[g].name)),f[g].prototype&&f[g].prototype.name&&(dhx.ui[f[g].prototype.name]=f[g]);dhx.ui[b]=dhx.proto.apply(dhx,f);if(c.r)for(g=0;g<c.r.length;g++)dhx.Type(dhx.ui[b],c.r[g]);c=e=null}return this!=dhx?new dhx.ui[b](a):dhx.ui[b]};c.q=Array.prototype.slice.call(arguments,0);return dhx.ui[b]=c};dhx.proto=function(){for(var a=arguments,b=a[0],c=!!b.$init,d=[],e=a.length-1;e>0;e--){if(typeof a[e]=="function")a[e]=a[e].prototype;a[e].$init&&d.push(a[e].$init);if(a[e].defaults){var f=a[e].defaults;if(!b.defaults)b.defaults={};for(var g in f)dhx.isUndefined(b.defaults[g])&&(b.defaults[g]=f[g])}if(a[e].type&&b.type)for(g in a[e].type)b.type[g]||(b.type[g]=a[e].type[g]);for(var h in a[e])b[h]||(b[h]=a[e][h])}c&&d.push(b.$init);b.$init=function(){for(var a=0;a<d.length;a++)d[a].apply(this,arguments)};var i=function(a){this.$ready=[];this.$init(a);this.$&&this.$(a,this.defaults);for(var b=0;b<this.$ready.length;b++)this.$ready[b].call(this)};i.prototype=b;b=a=null;return i};dhx.bind=function(a,b){return function(){return a.apply(b,arguments)}};dhx.require=function(a,b,c,d,e){if(typeof a!="string"){var f=a.length||0,g=b;if(f)b=function(){if(f)f--,dhx.require(a[a.length-f-1],b,c);else return g.apply(this,arguments)},b();else{for(var h in a)f++;b=function(){f--;f===0&&g.apply(this,arguments)};for(h in a)dhx.require(h,b,c)}}else if(dhx.i[a]!==!0)if(a.substr(-4)==".css"){var i=dhx.html.create("LINK",{type:"text/css",rel:"stylesheet",href:dhx.codebase+a});document.head.appendChild(i);b&&b.call(c||window)}else{var j=e;b?dhx.i[a]?dhx.i[a].push([b,
c]):(dhx.i[a]=[[b,c]],dhx.ajax(dhx.codebase+a,function(b){dhx.exec(b);var c=dhx.i[a];dhx.i[a]=!0;for(var d=0;d<c.length;d++)c[d][0].call(c[d][1]||window,!d)})):(dhx.exec(dhx.ajax().sync().get(dhx.codebase+a).responseText),dhx.i[a]=!0)}};dhx.i={};dhx.exec=function(a){window.execScript?window.execScript(a):window.eval(a)};dhx.wrap=function(a,b){return!a?b:function(){var c=a.apply(this,arguments);b.apply(this,arguments);return c}};dhx.isUndefined=function(a){return typeof a=="undefined"};dhx.delay=function(a,b,c,d){return window.setTimeout(function(){var d=a.apply(b,c||[]);a=b=c=null;return d},d||1)};dhx.uid=function(){if(!this.R)this.R=(new Date).valueOf();this.R++;return this.R};dhx.toNode=function(a){return typeof a=="string"?document.getElementById(a):a};dhx.toArray=function(a){return dhx.extend(a||[],dhx.PowerArray,!0)};dhx.toFunctor=function(a){return typeof a=="string"?eval(a):a};dhx.isArray=function(a){return Array.isArray?Array.isArray(a):Object.prototype.toString.call(a)==="[object Array]"};dhx.isDate=function(a){return a instanceof Date};dhx.L={};dhx.event=function(a,b,c,d){var a=dhx.toNode(a),e=dhx.uid();d&&(c=dhx.bind(c,d));dhx.L[e]=[a,b,c];a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c);return e};dhx.eventRemove=function(a){if(a){var b=dhx.L[a];b[0].removeEventListener?b[0].removeEventListener(b[1],b[2],!1):b[0].detachEvent&&b[0].detachEvent("on"+b[1],b[2]);delete this.L[a]}};dhx.EventSystem={$init:function(){if(!this.e)this.e={},this.s={},this.M={}},blockEvent:function(){this.e.T=!0},unblockEvent:function(){this.e.T=!1},mapEvent:function(a){dhx.extend(this.M,a,!0)},on_setter:function(a){if(a)for(var b in a)typeof a[b]=="function"&&this.attachEvent(b,a[b])},callEvent:function(a,b){if(this.e.T)return!0;var a=a.toLowerCase(),c=this.e[a.toLowerCase()],d=!0;if(c)for(var e=0;e<c.length;e++)if(c[e].apply(this,b||[])===!1)d=!1;this.M[a]&&!this.M[a].callEvent(a,b)&&(d=!1);return d},
attachEvent:function(a,b,c){var a=a.toLowerCase(),c=c||dhx.uid(),b=dhx.toFunctor(b),d=this.e[a]||dhx.toArray();d.push(b);this.e[a]=d;this.s[c]={f:b,t:a};return c},detachEvent:function(a){if(this.s[a]){var b=this.s[a].t,c=this.s[a].f,d=this.e[b];d.remove(c);delete this.s[a]}},hasEvent:function(a){a=a.toLowerCase();return this.e[a]?!0:!1}};dhx.extend(dhx,dhx.EventSystem);dhx.PowerArray={removeAt:function(a,b){a>=0&&this.splice(a,b||1)},remove:function(a){this.removeAt(this.find(a))},insertAt:function(a,b){if(!b&&b!==0)this.push(a);else{var c=this.splice(b,this.length-b);this[b]=a;this.push.apply(this,c)}},find:function(a){for(var b=0;b<this.length;b++)if(a==this[b])return b;return-1},each:function(a,b){for(var c=0;c<this.length;c++)a.call(b||this,this[c])},map:function(a,b){for(var c=0;c<this.length;c++)this[c]=a.call(b||this,this[c]);return this},filter:function(a,
b){for(var c=0;c<this.length;c++)a.call(b||this,this[c])||(this.splice(c,1),c--);return this}};dhx.env={};(function(){if(navigator.userAgent.indexOf("Mobile")!=-1)dhx.env.mobile=!0;if(dhx.env.mobile||navigator.userAgent.indexOf("iPad")!=-1||navigator.userAgent.indexOf("Android")!=-1)dhx.env.touch=!0;navigator.userAgent.indexOf("Opera")!=-1?dhx.env.isOpera=!0:(dhx.env.isIE=!!document.all,dhx.env.isFF=!document.all,dhx.env.isWebKit=navigator.userAgent.indexOf("KHTML")!=-1,dhx.env.isSafari=dhx.env.isWebKit&&navigator.userAgent.indexOf("Mac")!=-1);if(navigator.userAgent.toLowerCase().indexOf("android")!=
-1)dhx.env.isAndroid=!0;dhx.env.transform=!1;dhx.env.transition=!1;for(var a={names:["transform","transition"],transform:["transform","WebkitTransform","MozTransform","OTransform","msTransform"],transition:["transition","WebkitTransition","MozTransition","OTransition","msTransition"]},b=document.createElement("DIV"),c=0;c<a.names.length;c++)for(var d=a[a.names[c]],e=0;e<d.length;e++)if(typeof b.style[d[e]]!="undefined"){dhx.env[a.names[c]]=d[e];break}b.style[dhx.env.transform]="translate3d(0,0,0)";dhx.env.translate=b.style[dhx.env.transform]?"translate3d":"translate";var f="",g=!1;dhx.env.isOpera&&(f="-o-",g="O");dhx.env.isFF&&(f="-Moz-");dhx.env.isWebKit&&(f="-webkit-");dhx.env.isIE&&(f="-ms-");dhx.env.transformCSSPrefix=f;dhx.env.transformPrefix=g||dhx.env.transformCSSPrefix.replace(/-/gi,"");dhx.env.transitionEnd=dhx.env.transformCSSPrefix=="-Moz-"?"transitionend":dhx.env.transformPrefix+"TransitionEnd"})();dhx.env.svg=function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")}();dhx.html={v:0,denySelect:function(){if(!dhx.v)dhx.v=document.onselectstart;document.onselectstart=dhx.html.stopEvent},allowSelect:function(){if(dhx.v!==0)document.onselectstart=dhx.v||null;dhx.v=0},index:function(a){for(var b=0;a=a.previousSibling;)b++;return b},ga:{},createCss:function(a){var b="",c;for(c in a)b+=c+":"+a[c]+";";var d=this.ga[b];d||(d="s"+dhx.uid(),this.addStyle("."+d+"{"+b+"}"),this.ga[b]=d);return d},addStyle:function(a){var b=document.createElement("style");b.setAttribute("type",
"text/css");b.setAttribute("media","screen");b.styleSheet?b.styleSheet.cssText=a:b.appendChild(document.createTextNode(a));document.getElementsByTagName("head")[0].appendChild(b)},create:function(a,b,c){var b=b||{},d=document.createElement(a),e;for(e in b)d.setAttribute(e,b[e]);if(b.style)d.style.cssText=b.style;if(b["class"])d.className=b["class"];if(c)d.innerHTML=c;return d},getValue:function(a){a=dhx.toNode(a);return!a?"":dhx.isUndefined(a.value)?a.innerHTML:a.value},remove:function(a){if(a instanceof
Array)for(var b=0;b<a.length;b++)this.remove(a[b]);else a&&a.parentNode&&a.parentNode.removeChild(a)},insertBefore:function(a,b,c){a&&(b&&b.parentNode?b.parentNode.insertBefore(a,b):c.appendChild(a))},locate:function(a,b){if(a.tagName)var c=a;else a=a||event,c=a.target||a.srcElement;for(;c;){if(c.getAttribute){var d=c.getAttribute(b);if(d)return d}c=c.parentNode}return null},offset:function(a){if(a.getBoundingClientRect){var b=a.getBoundingClientRect(),c=document.body,d=document.documentElement,e=
window.pageYOffset||d.scrollTop||c.scrollTop,f=window.pageXOffset||d.scrollLeft||c.scrollLeft,g=d.clientTop||c.clientTop||0,h=d.clientLeft||c.clientLeft||0,i=b.top+e-g,j=b.left+f-h;return{y:Math.round(i),x:Math.round(j)}}else{for(j=i=0;a;)i+=parseInt(a.offsetTop,10),j+=parseInt(a.offsetLeft,10),a=a.offsetParent;return{y:i,x:j}}},posRelative:function(a){a=a||event;return dhx.isUndefined(a.offsetX)?{x:a.layerX,y:a.layerY}:{x:a.offsetX,y:a.offsetY}},pos:function(a){a=a||event;if(a.pageX||a.pageY)return{x:a.pageX,
y:a.pageY};var b=dhx.env.isIE&&document.compatMode!="BackCompat"?document.documentElement:document.body;return{x:a.clientX+b.scrollLeft-b.clientLeft,y:a.clientY+b.scrollTop-b.clientTop}},preventEvent:function(a){a&&a.preventDefault&&a.preventDefault();return dhx.html.stopEvent(a)},stopEvent:function(a){(a||event).cancelBubble=!0;return!1},addCss:function(a,b){a.className+=" "+b},removeCss:function(a,b){a.className=a.className.replace(RegExp(" "+b,"g"),"")}};dhx.ready=function(a){this.Ga?a.call():this.D.push(a)};dhx.D=[];(function(){var a=document.getElementsByTagName("SCRIPT");if(a.length)a=(a[a.length-1].getAttribute("src")||"").split("/"),a.splice(a.length-1,1),dhx.codebase=a.slice(0,a.length).join("/")+"/";dhx.event(window,"load",function(){dhx.callEvent("onReady",[]);dhx.delay(function(){dhx.Ga=!0;for(var a=0;a<dhx.D.length;a++)dhx.D[a].call();dhx.D=[]})})})();dhx.locale=dhx.locale||{};dhx.ready(function(){dhx.event(document.body,"click",function(a){dhx.callEvent("onClick",[a||event])})});(function(){var a={},b=RegExp("(\\r\\n|\\n)","g"),c=RegExp('(\\")',"g");dhx.Template=function(d){if(typeof d=="function")return d;if(a[d])return a[d];d=(d||"").toString();if(d.indexOf("->")!=-1)switch(d=d.split("->"),d[0]){case "html":d=dhx.html.getValue(d[1]);break;case "http":d=(new dhx.ajax).sync().get(d[1],{uid:dhx.uid()}).responseText}d=(d||"").toString();d=d.replace(b,"\\n");d=d.replace(c,'\\"');d=d.replace(/\{obj\.([^}?]+)\?([^:]*):([^}]*)\}/g,'"+(obj.$1?"$2":"$3")+"');d=d.replace(/\{common\.([^}\(]*)\}/g,
"\"+(common.$1||'')+\"");d=d.replace(/\{common\.([^\}\(]*)\(\)\}/g,'"+(common.$1?common.$1.apply(this, arguments):"")+"');d=d.replace(/\{obj\.([^}]*)\}/g,'"+(obj.$1)+"');d=d.replace("{obj}",'"+obj+"');d=d.replace(/#([^#'";, ]+)#/gi,'"+(obj.$1)+"');try{a[d]=Function("obj","common",'return "'+d+'";')}catch(e){}return a[d]};dhx.Template.empty=function(){return""};dhx.Template.bind=function(a){return dhx.bind(dhx.Template(a),this)};dhx.Type=function(a,b){if(a.q){if(!a.r)a.r=[];a.r.push(b)}else{if(typeof a==
"function")a=a.prototype;if(!a.types)a.types={"default":a.type},a.type.name="default";var c=b.name,g=a.type;c&&(g=a.types[c]=dhx.clone(b.baseType?a.types[b.baseType]:a.type));for(var h in b)g[h]=h.indexOf("template")===0?dhx.Template(b[h]):b[h];return c}}})();dhx.Settings={$init:function(){this.a=this.config={}},define:function(a,b){return typeof a=="object"?this.Q(a):this.U(a,b)},U:function(a,b){var c=this[a+"_setter"];return this.a[a]=c?c.call(this,b,a):b},Q:function(a){if(a)for(var b in a)this.U(b,a[b])},$:function(a,b){var c={};b&&(c=dhx.extend(c,b));typeof a=="object"&&!a.tagName&&dhx.extend(c,a,!0);this.Q(c)},Ba:function(a,b){for(var c in b)switch(typeof a[c]){case "object":a[c]=this.Ba(a[c]||{},b[c]);break;case "undefined":a[c]=b[c]}return a}};dhx.ajax=function(a,b,c){if(arguments.length!==0){var d=new dhx.ajax;if(c)d.master=c;return d.get(a,null,b)}return!this.getXHR?new dhx.ajax:this};dhx.ajax.count=0;dhx.ajax.prototype={master:null,getXHR:function(){return dhx.env.isIE?new ActiveXObject("Microsoft.xmlHTTP"):new XMLHttpRequest},send:function(a,b,c){var d=this.getXHR();dhx.isArray(c)||(c=[c]);if(typeof b=="object"){var e=[],f;for(f in b){var g=b[f];if(g===null||g===dhx.undefined)g="";e.push(f+"="+encodeURIComponent(g))}b=e.join("&")}b&&this.request==="GET"&&(a=a+(a.indexOf("?")!=-1?"&":"?")+b,b=null);d.open(this.request,a,!this.Na);this.request==="POST"&&d.setRequestHeader("Content-type","application/x-www-form-urlencoded");var h=this;d.onreadystatechange=function(){if(!d.readyState||d.readyState==4){dhx.ajax.count++;if(c&&h)for(var a=0;a<c.length;a++)if(c[a]){var b=c[a].success||c[a];if(d.status>=400||!d.status&&!d.responseText)b=c[a].error;b&&b.call(h.master||h,d.responseText,d.responseXML,d)}if(h)h.master=null;c=h=null}};d.send(b||null);return d},get:function(a,b,c){arguments.length==2&&(c=b,b=null);this.request="GET";return this.send(a,b,c)},post:function(a,b,c){this.request="POST";return this.send(a,b,c)},put:function(a,
b,c){this.request="PUT";return this.send(a,b,c)},del:function(a,b,c){this.request="DELETE";return this.send(a,b,c)},sync:function(){this.Na=!0;return this},bind:function(a){this.master=a;return this}};dhx.send=function(a,b,c,d){var e=dhx.html.create("FORM",{target:d||"_self",action:a,method:c||"POST"},""),f;for(f in b){var g=dhx.html.create("INPUT",{type:"hidden",name:f,value:b[f]},"");e.appendChild(g)}e.style.display="none";document.body.appendChild(e);e.submit();document.body.removeChild(e)};dhx.AtomDataLoader={$init:function(a){this.data={};if(a)this.a.datatype=a.datatype||"json",this.$ready.push(this.Aa)},Aa:function(){this.aa=!0;this.a.url&&this.url_setter(this.a.url);this.a.data&&this.data_setter(this.a.data)},url_setter:function(a){if(!this.aa)return a;this.load(a,this.a.datatype);return a},data_setter:function(a){if(!this.aa)return a;this.parse(a,this.a.datatype);return!0},load:function(a,b,c){if(a.$proxy)a.load(this,typeof b=="string"?b:"json");else{this.callEvent("onXLS",[]);if(typeof b=="string")this.data.driver=dhx.DataDriver[b],b=c;else if(!this.data.driver)this.data.driver=dhx.DataDriver.json;var d=[{success:this.P,error:this.C}];b&&(dhx.isArray(b)?d.push.apply(d,b):d.push(b));return dhx.ajax(a,d,this)}},parse:function(a,b){this.callEvent("onXLS",[]);this.data.driver=dhx.DataDriver[b||"json"];this.P(a,null)},P:function(a,b,c){var d=this.data.driver,e=d.toObject(a,b);if(e){var f=d.getRecords(e)[0];this.data=d?d.getDetails(f):a}else this.C(a,b,c);this.callEvent("onXLE",
[])},C:function(a,b,c){this.callEvent("onXLE",[]);this.callEvent("onLoadError",arguments);dhx.callEvent("onLoadError",[a,b,c,this])},z:function(a){if(!this.a.dataFeed||this.N||!a)return!0;var b=this.a.dataFeed;if(typeof b=="function")return b.call(this,a.id||a,a);b=b+(b.indexOf("?")==-1?"?":"&")+"action=get&id="+encodeURIComponent(a.id||a);this.callEvent("onXLS",[]);dhx.ajax(b,function(a,b,e){this.N=!0;var f=dhx.DataDriver.toObject(a,b);f?this.setValues(f.getDetails(f.getRecords()[0])):this.C(a,b,
e);this.N=!1;this.callEvent("onXLE",[])},this);return!1}};dhx.DataDriver={};dhx.DataDriver.json={toObject:function(a){a||(a="[]");if(typeof a=="string"){try{eval("dhx.temp="+a)}catch(b){return null}a=dhx.temp}if(a.data){var c=a.data.config={},d;for(d in a)d!="data"&&(c[d]=a[d]);a=a.data}return a},getRecords:function(a){return a&&!dhx.isArray(a)?[a]:a},getDetails:function(a){return typeof a=="string"?{id:dhx.uid(),value:a}:a},getInfo:function(a){var b=a.config;return!b?{}:{n:b.total_count||0,m:b.pos||0,Ea:b.parent||0,K:b.config,O:b.dhx_security}},child:"data"};dhx.DataDriver.html={toObject:function(a){if(typeof a=="string"){var b=null;a.indexOf("<")==-1&&(b=dhx.toNode(a));if(!b)b=document.createElement("DIV"),b.innerHTML=a;return b.getElementsByTagName(this.tag)}return a},getRecords:function(a){for(var b=[],c=0;c<a.childNodes.length;c++){var d=a.childNodes[c];d.nodeType==1&&b.push(d)}return b},getDetails:function(a){return dhx.DataDriver.xml.tagToObject(a)},getInfo:function(){return{n:0,m:0}},tag:"LI"};dhx.DataDriver.jsarray={toObject:function(a){return typeof a=="string"?(eval("dhx.temp="+a),dhx.temp):a},getRecords:function(a){return a},getDetails:function(a){for(var b={},c=0;c<a.length;c++)b["data"+c]=a[c];return b},getInfo:function(){return{n:0,m:0}}};dhx.DataDriver.csv={toObject:function(a){return a},getRecords:function(a){return a.split(this.row)},getDetails:function(a){for(var a=this.stringToArray(a),b={},c=0;c<a.length;c++)b["data"+c]=a[c];return b},getInfo:function(){return{n:0,m:0}},stringToArray:function(a){for(var a=a.split(this.cell),b=0;b<a.length;b++)a[b]=a[b].replace(/^[ \t\n\r]*(\"|)/g,"").replace(/(\"|)[ \t\n\r]*$/g,"");return a},row:"\n",cell:","};dhx.DataDriver.xml={Y:function(a){return!a||!a.documentElement?null:a.getElementsByTagName("parsererror").length?null:a},toObject:function(a){if(this.Y(b))return b;var b=typeof a=="string"?this.fromString(a.replace(/^[\s]+/,"")):a;return this.Y(b)?b:null},getRecords:function(a){return this.xpath(a,this.records)},records:"/*/item",child:"item",config:"/*/config",getDetails:function(a){return this.tagToObject(a,{})},getInfo:function(a){var b=this.xpath(a,this.config),b=b.length?this.assignTypes(this.tagToObject(b[0],
{})):null;return{n:a.documentElement.getAttribute("total_count")||0,m:a.documentElement.getAttribute("pos")||0,Ea:a.documentElement.getAttribute("parent")||0,K:b,O:a.documentElement.getAttribute("dhx_security")||null}},xpath:function(a,b){if(window.XPathResult){var c=a;if(a.nodeName.indexOf("document")==-1)a=a.ownerDocument;for(var d=[],e=a.evaluate(b,c,null,XPathResult.ANY_TYPE,null),f=e.iterateNext();f;)d.push(f),f=e.iterateNext();return d}else{var g=!0;try{typeof a.selectNodes=="undefined"&&(g=
!1)}catch(h){}if(g)return a.selectNodes(b);else{var i=b.split("/").pop();return a.getElementsByTagName(i)}}},assignTypes:function(a){for(var b in a){var c=a[b];typeof c=="object"?this.assignTypes(c):typeof c=="string"&&c!==""&&(c=="true"?a[b]=!0:c=="false"?a[b]=!1:c==c*1&&(a[b]*=1))}return a},tagToObject:function(a,b){var b=b||{},c=!1,d=a.attributes;if(d&&d.length){for(var e=0;e<d.length;e++)b[d[e].name]=d[e].value;c=!0}for(var f=a.childNodes,g={},e=0;e<f.length;e++)if(f[e].nodeType==1){var h=f[e].tagName;typeof b[h]!="undefined"?(dhx.isArray(b[h])||(b[h]=[b[h]]),b[h].push(this.tagToObject(f[e],{}))):b[f[e].tagName]=this.tagToObject(f[e],{});c=!0}if(!c)return this.nodeValue(a);b.value=b.value||this.nodeValue(a);return b},nodeValue:function(a){return a.firstChild?a.firstChild.data:""},fromString:function(a){try{if(window.DOMParser)return(new DOMParser).parseFromString(a,"text/xml");if(window.ActiveXObject){var b=new ActiveXObject("Microsoft.xmlDOM");b.loadXML(a);return b}}catch(c){return null}}};dhx.DataLoader=dhx.proto({$init:function(a){a=a||"";this.o=dhx.toArray();this.data=new dhx.DataStore;this.data.attachEvent("onClearAll",dhx.bind(this.oa,this));this.data.attachEvent("onServerConfig",dhx.bind(this.na,this));this.data.feed=this.sa},sa:function(a,b,c){if(this.u)return this.u=[a,b,c];else this.u=!0;this.W=[a,b];this.ua.call(this,a,b,c)},ua:function(a,b,c){var d=this.data.url;a<0&&(a=0);this.load(d+(d.indexOf("?")==-1?"?":"&")+(this.dataCount()?"continue=true&":"")+"start="+a+"&count="+
b,[this.ta,c])},ta:function(){var a=this.u,b=this.W;this.u=!1;typeof a=="object"&&(a[0]!=b[0]||a[1]!=b[1])&&this.data.feed.apply(this,a)},load:function(a,b){var c=dhx.AtomDataLoader.load.apply(this,arguments);this.o.push(c);if(!this.data.url)this.data.url=a},loadNext:function(a,b,c,d,e){this.a.datathrottle&&!e?(this.ha&&window.clearTimeout(this.ha),this.ha=dhx.delay(function(){this.loadNext(a,b,c,d,!0)},this,0,this.a.datathrottle)):(!b&&b!==0&&(b=this.dataCount()),this.data.url=this.data.url||d,this.callEvent("onDataRequest",
[b,a,c,d])&&this.data.url&&this.data.feed.call(this,b,a,c))},Ra:function(a,b){var c=this.W;return this.u&&c&&c[0]<=b&&c[1]+c[0]>=a+b?!0:!1},P:function(a,b,c){this.o.remove(c);var d=this.data.driver.toObject(a,b);if(d)this.data.Fa(d);else return this.C(a,b,c);this.pa();this.callEvent("onXLE",[])},removeMissed_setter:function(a){return this.data.Ja=a},scheme_setter:function(a){this.data.scheme(a)},dataFeed_setter:function(a){this.data.attachEvent("onBeforeFilter",dhx.bind(function(a,c){if(this.a.dataFeed){var d=
{};if(a||c){if(typeof a=="function"){if(!c)return;a(c,d)}else d={text:c};this.clearAll();var e=this.a.dataFeed,f=[];if(typeof e=="function")return e.call(this,c,d);for(var g in d)f.push("dhx_filter["+g+"]="+encodeURIComponent(d[g]));this.load(e+(e.indexOf("?")<0?"?":"&")+f.join("&"),this.a.datatype);return!1}}},this));return a},pa:function(){if(this.a.ready&&!this.Ha){var a=dhx.toFunctor(this.a.ready);a&&dhx.delay(a,this,arguments);this.Ha=!0}},oa:function(){for(var a=0;a<this.o.length;a++)this.o[a].abort();this.o=dhx.toArray()},na:function(a){this.Q(a)}},dhx.AtomDataLoader);dhx.DataStore=function(){this.name="DataStore";dhx.extend(this,dhx.EventSystem);this.setDriver("json");this.pull={};this.order=dhx.toArray();this.d={}};dhx.DataStore.prototype={setDriver:function(a){this.driver=dhx.DataDriver[a]},Fa:function(a){this.callEvent("onParse",[this.driver,a]);this.c&&this.filter();var b=this.driver.getInfo(a);if(b.O)dhx.securityKey=b.O;b.K&&this.callEvent("onServerConfig",[b.K]);var c=this.driver.getRecords(a);this.za(b,c);this.ba&&this.ya&&this.ya(this.ba);this.da&&(this.blockEvent(),this.sort(this.da),this.unblockEvent());this.callEvent("onStoreLoad",[this.driver,a]);this.refresh()},za:function(a,b){var c=(a.m||0)*1,
d=!0,e=!1;if(c===0&&this.order[0]){if(this.Ja)for(var e={},f=0;f<this.order.length;f++)e[this.order[f]]=!0;d=!1;c=this.order.length}for(var g=0,f=0;f<b.length;f++){var h=this.driver.getDetails(b[f]),i=this.id(h);this.pull[i]?d&&this.order[g+c]&&g++:(this.order[g+c]=i,g++);this.pull[i]?(dhx.extend(this.pull[i],h,!0),this.H&&this.H(this.pull[i]),e&&delete e[i]):(this.pull[i]=h,this.G&&this.G(h))}if(e){this.blockEvent();for(var j in e)this.remove(j);this.unblockEvent()}if(!this.order[a.n-1])this.order[a.n-
1]=dhx.undefined},id:function(a){return a.id||(a.id=dhx.uid())},changeId:function(a,b){this.pull[a]&&(this.pull[b]=this.pull[a]);this.pull[b].id=b;this.order[this.order.find(a)]=b;this.c&&(this.c[this.c.find(a)]=b);this.d[a]&&(this.d[b]=this.d[a],delete this.d[a]);this.callEvent("onIdChange",[a,b]);this.Ka&&this.Ka(a,b);delete this.pull[a]},item:function(a){return this.pull[a]},update:function(a,b){dhx.isUndefined(b)&&(b=this.item(a));this.H&&this.H(b);if(this.callEvent("onBeforeUpdate",[a,b])===
!1)return!1;this.pull[a]=b;this.callEvent("onStoreUpdated",[a,b,"update"])},refresh:function(a){this.fa||(a?this.callEvent("onStoreUpdated",[a,this.pull[a],"paint"]):this.callEvent("onStoreUpdated",[null,null,null]))},silent:function(a,b){this.fa=!0;a.call(b||this);this.fa=!1},getRange:function(a,b){a=a?this.indexById(a):this.$min||this.startOffset||0;b?b=this.indexById(b):(b=Math.min(this.$max||this.endOffset||Infinity,this.dataCount()-1),b<0&&(b=0));if(a>b)var c=b,b=a,a=c;return this.getIndexRange(a,
b)},getIndexRange:function(a,b){for(var b=Math.min(b||Infinity,this.dataCount()-1),c=dhx.toArray(),d=a||0;d<=b;d++)c.push(this.item(this.order[d]));return c},dataCount:function(){return this.order.length},exists:function(a){return!!this.pull[a]},move:function(a,b){var c=this.idByIndex(a),d=this.item(c);this.order.removeAt(a);this.order.insertAt(c,Math.min(this.order.length,b));this.callEvent("onStoreUpdated",[c,d,"move"])},scheme:function(a){this.F={};this.G=a.$init;this.H=a.$update;this.ca=a.$serialize;this.ba=a.$group;this.da=a.$sort;for(var b in a)b.substr(0,1)!="$"&&(this.F[b]=a[b])},sync:function(a,b,c){typeof a=="string"&&(a=$$("source"));typeof b!="function"&&(c=b,b=null);this.I=!1;if(a.name!="DataStore")a.data&&a.data.name=="DataStore"?a=a.data:this.I=!0;var d=dhx.bind(function(d,f,g){if(this.I){if(!d)return;if(d.indexOf("change")===0){if(d=="change")this.pull[f.id]=f.attributes,this.refresh(f.id);return}d=="reset"&&(g=f);this.order=[];this.pull={};this.c=null;for(var h=0;h<g.models.length;h++){var i=
g.models[h].id;this.order.push(i);this.pull[i]=g.models[h].attributes}}else this.c=null,this.order=dhx.toArray([].concat(a.order)),this.pull=a.pull;b&&this.silent(b);this.Z&&this.Z();this.callEvent("onSyncApply",[]);c?c=!1:this.refresh()},this);this.I?a.bind("all",d):this.w=[a.attachEvent("onStoreUpdated",d),a.attachEvent("onIdChange",dhx.bind(function(a,b){this.changeId(a,b)},this))];d()},add:function(a,b,c){if(this.F)for(var d in this.F)dhx.isUndefined(a[d])&&(a[d]=this.F[d]);this.G&&this.G(a);var e=this.id(a),f=c||this.order,g=f.length;if(dhx.isUndefined(b)||b<0)b=g;b>g&&(b=Math.min(f.length,b));if(this.callEvent("onBeforeAdd",[e,a,b])===!1)return!1;this.pull[e]=a;f.insertAt(e,b);if(this.c){var h=this.c.length;!b&&this.order.length&&(h=0);this.c.insertAt(e,h)}this.callEvent("onAfterAdd",[e,b]);this.callEvent("onStoreUpdated",[e,a,"add"]);return e},remove:function(a){if(dhx.isArray(a))for(var b=0;b<a.length;b++)this.remove(a[b]);else{if(this.callEvent("onBeforeDelete",[a])===!1)return!1;var c=this.item(a);this.order.remove(a);this.c&&this.c.remove(a);delete this.pull[a];this.d[a]&&delete this.d[a];this.callEvent("onAfterDelete",[a]);this.callEvent("onStoreUpdated",[a,c,"delete"])}},clearAll:function(){this.pull={};this.order=dhx.toArray();this.c=this.url=null;this.callEvent("onClearAll",[]);this.refresh()},idByIndex:function(a){return this.order[a]},indexById:function(a){var b=this.order.find(a);return b},next:function(a,b){return this.order[this.indexById(a)+(b||1)]},first:function(){return this.order[0]},
last:function(){return this.order[this.order.length-1]},previous:function(a,b){return this.order[this.indexById(a)-(b||1)]},sort:function(a,b,c){var d=a;typeof a=="function"?d={as:a,dir:b}:typeof a=="string"&&(d={by:a.replace(/#/g,""),dir:b,as:c});var e=[d.by,d.dir,d.as];this.callEvent("onBeforeSort",e)&&(this.Ma(d),this.refresh(),this.callEvent("onAfterSort",e))},Ma:function(a){if(this.order.length){var b=this.La.qa(a),c=this.getRange(this.first(),this.last());c.sort(b);this.order=c.map(function(a){return this.id(a)},
this)}},wa:function(a){if(this.c&&!a)this.order=this.c,delete this.c},va:function(a,b,c){for(var d=dhx.toArray(),e=0;e<this.order.length;e++){var f=this.order[e];a(this.item(f),b)&&d.push(f)}if(!c||!this.c)this.c=this.order;this.order=d},filter:function(a,b,c){if(this.callEvent("onBeforeFilter",[a,b])&&(this.wa(c),this.order.length)){if(a){var d=a,b=b||"";typeof a=="string"&&(a=a.replace(/#/g,""),b=b.toString().toLowerCase(),d=function(b,c){return(b[a]||"").toString().toLowerCase().indexOf(c)!=-1});this.va(d,b,c,this.Pa)}this.refresh();this.callEvent("onAfterFilter",[])}},each:function(a,b){for(var c=0;c<this.order.length;c++)a.call(b||this,this.item(this.order[c]))},Ca:function(a,b){return function(){return a[b].apply(a,arguments)}},addMark:function(a,b,c,d){var e=this.d[a]||{};this.d[a]=e;if(!e[b]&&(e[b]=d||!0,c))this.item(a).$css=(this.item(a).$css||"")+" "+b,this.refresh(a);return e[b]},removeMark:function(a,b,c){var d=this.d[a];d&&d[b]&&delete d[b];if(c){var e=this.item(a).$css;if(e)this.item(a).$css=
e.replace(b,""),this.refresh(a)}},hasMark:function(a,b){var c=this.d[a];return c&&c[b]},provideApi:function(a,b){b&&this.mapEvent({onbeforesort:a,onaftersort:a,onbeforeadd:a,onafteradd:a,onbeforedelete:a,onafterdelete:a,onbeforeupdate:a});for(var c="sort,add,remove,exists,idByIndex,indexById,item,update,refresh,dataCount,filter,next,previous,clearAll,first,last,serialize,sync,addMark,removeMark,hasMark".split(","),d=0;d<c.length;d++)a[c[d]]=this.Ca(this,c[d])},serialize:function(){for(var a=this.order,
b=[],c=0;c<a.length;c++){var d=this.pull[a[c]];if(this.ca&&(d=this.ca(d),d===!1))continue;b.push(d)}return b},La:{qa:function(a){return this.ra(a.dir,this.ma(a.by,a.as))},ja:{date:function(a,b){a-=0;b-=0;return a>b?1:a<b?-1:0},"int":function(a,b){a*=1;b*=1;return a>b?1:a<b?-1:0},string_strict:function(a,b){a=a.toString();b=b.toString();return a>b?1:a<b?-1:0},string:function(a,b){if(!b)return 1;if(!a)return-1;a=a.toString().toLowerCase();b=b.toString().toLowerCase();return a>b?1:a<b?-1:0}},ma:function(a,
b){if(!a)return b;typeof b!="function"&&(b=this.ja[b||"string"]);return function(c,d){return b(c[a],d[a])}},ra:function(a,b){return a=="asc"||!a?b:function(a,d){return b(a,d)*-1}}}};dhx.BaseBind={bind:function(a,b,c){typeof a=="string"&&(a=dhx.ui.get(a));a.b&&a.b();this.b&&this.b();a.getBindData||dhx.extend(a,dhx.BindSource);if(!this.ka){var d=this.render;if(this.filter){var e=this.a.id;this.data.Z=function(){a.l[e]=!1}}this.render=function(){if(!this.X){this.X=!0;var a=this.callEvent("onBindRequest");this.X=!1;return d.apply(this,a===!1?arguments:[])}};if(this.getValue||this.getValues)this.save=function(){if(!this.validate||this.validate())a.setBindData(this.getValue?this.getValue:
this.getValues(),this.a.id)};this.ka=!0}a.addBind(this.a.id,b,c);var f=this.a.id;this.attachEvent(this.touchable?"onAfterRender":"onBindRequest",function(){return a.getBindData(f)});!this.a.dataFeed&&this.loadNext&&this.data.attachEvent("onStoreLoad",function(){a.l[f]=!1});this.isVisible(this.a.id)&&this.refresh()},g:function(a){a.removeBind(this.a.id);var b=this.w||(this.data?this.data.w:0);if(b&&a.data)for(var c=0;c<b.length;c++)a.data.detachEvent(b[c])}};dhx.BindSource={$init:function(){this.p={};this.l={};this.A={};this.la(this)},saveBatch:function(a){this.V=!0;a.call(this);this.V=!1;this.k()},setBindData:function(a,b){b&&(this.A[b]=!0);if(this.setValue)this.setValue(a);else if(this.setValues)this.setValues(a);else{var c=this.getCursor();c&&(a=dhx.extend(this.item(c),a,!0),this.update(c,a))}this.callEvent("onBindUpdate",[a,b]);this.save&&this.save();b&&(this.A[b]=!1)},getBindData:function(a,b){if(this.l[a])return!1;var c=dhx.ui.get(a);c.isVisible(c.a.id)&&
(this.l[a]=!0,this.J(c,this.p[a][0],this.p[a][1]),b&&c.filter&&c.refresh())},addBind:function(a,b,c){this.p[a]=[b,c]},removeBind:function(a){delete this.p[a];delete this.l[a];delete this.A[a]},la:function(a){a.filter?dhx.extend(this,dhx.CollectionBind):a.setValue?dhx.extend(this,dhx.ValueBind):dhx.extend(this,dhx.RecordBind)},k:function(){if(!this.V)for(var a in this.p)this.A[a]||(this.l[a]=!1,this.getBindData(a,!0))},S:function(a,b,c){a.setValue?a.setValue(c?c[b]:c):a.filter?a.data.silent(function(){this.filter(b,
c)}):!c&&a.clear?a.clear():a.z(c)&&a.setValues(dhx.clone(c));a.callEvent("onBindApply",[c,b,this])}};dhx.DataValue=dhx.proto({name:"DataValue",isVisible:function(){return!0},$init:function(a){var b=(this.data=a)&&a.id?a.id:dhx.uid();this.a={id:b};dhx.ui.views[b]=this},setValue:function(a){this.data=a;this.callEvent("onChange",[a])},getValue:function(){return this.data},refresh:function(){this.callEvent("onBindRequest")}},dhx.EventSystem,dhx.BaseBind);dhx.DataRecord=dhx.proto({name:"DataRecord",isVisible:function(){return!0},$init:function(a){this.data=a||{};var b=a&&a.id?a.id:dhx.uid();this.a={id:b};dhx.ui.views[b]=this},getValues:function(){return this.data},setValues:function(a){this.data=a;this.callEvent("onChange",[a])},refresh:function(){this.callEvent("onBindRequest")}},dhx.EventSystem,dhx.BaseBind,dhx.AtomDataLoader,dhx.Settings);dhx.DataCollection=dhx.proto({name:"DataCollection",isVisible:function(){return!this.data.order.length&&!this.data.c&&!this.a.dataFeed?!1:!0},$init:function(a){this.data.provideApi(this,!0);var b=a&&a.id?a.id:dhx.uid();this.a.id=b;dhx.ui.views[b]=this;this.data.attachEvent("onStoreLoad",dhx.bind(function(){this.callEvent("onBindRequest",[])},this))},refresh:function(){this.callEvent("onBindRequest",[])}},dhx.DataLoader,dhx.EventSystem,dhx.BaseBind,dhx.Settings);dhx.ValueBind={$init:function(){this.attachEvent("onChange",this.k)},J:function(a,b,c){var d=this.getValue()||"";c&&(d=c(d));if(a.setValue)a.setValue(d);else if(a.filter)a.data.silent(function(){this.filter(b,d)});else{var e={};e[b]=d;a.z(d)&&a.setValues(e)}a.callEvent("onBindApply",[d,b,this])}};dhx.RecordBind={$init:function(){this.attachEvent("onChange",this.k)},J:function(a,b){var c=this.getValues()||null;this.S(a,b,c)}};dhx.CollectionBind={$init:function(){this.h=null;this.attachEvent("onSelectChange",function(){var a=this.getSelected();this.setCursor(a?a.id||a:null)});this.attachEvent("onAfterCursorChange",this.k);this.data.attachEvent("onStoreUpdated",dhx.bind(function(a,b,c){a&&a==this.getCursor()&&c!="paint"&&this.k()},this));this.data.attachEvent("onClearAll",dhx.bind(function(){this.h=null},this));this.data.attachEvent("onIdChange",dhx.bind(function(a,b){if(this.h==a)this.h=b},this))},setCursor:function(a){if(!(a==
this.h||a!==null&&!this.item(a)))this.callEvent("onBeforeCursorChange",[this.h]),this.h=a,this.callEvent("onAfterCursorChange",[a])},getCursor:function(){return this.h},J:function(a,b){var c=this.item(this.getCursor())||this.a.defaultData||null;this.S(a,b,c)}};if(!dhx.ui)dhx.ui={};if(!dhx.ui.views)dhx.ui.views={},dhx.ui.get=function(a){return a.a?a:dhx.ui.views[a]};dhtmlXDataStore=function(a){var b=new dhx.DataCollection(a),c="_dp_init";b[c]=function(a){var b="_methods";a[b]=["dummy","dummy","changeId","dummy"];this.data.Da={add:"inserted",update:"updated","delete":"deleted"};this.data.attachEvent("onStoreUpdated",function(b,c,e){b&&!a.ea&&a.setUpdated(b,!0,this.Da[e])});b="_getRowData";a[b]=function(a){var b=this.obj.data.item(a),c={id:a};c[this.action_param]=this.obj.getUserData(a);if(b)for(var d in b)c[d]=b[d];return c};this.changeId=
function(b,c){this.data.changeId(b,c);a.ea=!0;this.data.callEvent("onStoreUpdated",[c,this.item(c),"update"]);a.ea=!1};b="_clearUpdateFlag";a[b]=function(){};this.ia={}};b.dummy=function(){};b.setUserData=function(a,b,c){this.ia[a]=c};b.getUserData=function(a){return this.ia[a]};b.dataFeed=function(a){this.define("dataFeed",a)};dhx.extend(b,dhx.BindSource);return b};if(window.dhtmlXDataView)dhtmlXDataView.prototype.b=function(){this.isVisible=function(){return!this.data.order.length&&!this.data.c&&!this.a.dataFeed?!1:!0};var a="_settings";this.a=this.a||this[a];if(!this.a.id)this.a.id=dhx.uid();this.unbind=dhx.BaseBind.unbind;this.unsync=dhx.BaseBind.unsync;dhx.ui.views[this.a.id]=this};if(window.dhtmlXChart)dhtmlXChart.prototype.b=function(){this.isVisible=function(){return!this.data.order.length&&!this.data.Qa&&!this.a.dataFeed?!1:!0};var a="_settings";this.a=this.a||this[a];if(!this.a.id)this.a.id=dhx.uid();this.unbind=dhx.BaseBind.unbind;this.unsync=dhx.BaseBind.unsync;dhx.ui.views[this.a.id]=this};dhx.BaseBind.unsync=function(a){return dhx.BaseBind.g.call(this,a)};dhx.BaseBind.unbind=function(a){return dhx.BaseBind.g.call(this,a)};dhx.BaseBind.legacyBind=function(){return dhx.BaseBind.bind.apply(this,arguments)};dhx.BaseBind.legacySync=function(a,b){this.b&&this.b();a.b&&a.b();this.attachEvent("onAfterEditStop",function(a){this.save(a);return!0});this.attachEvent("onDataRequest",function(b,d){for(var e=b;e<b+d;e++)if(!a.data.order[e])return a.loadNext(d,b),!1});this.save=function(b){b||(b=this.getCursor());var d=this.item(b),e=a.item(b),f;for(f in d)f.indexOf("$")!==0&&(e[f]=d[f]);a.refresh(b)};return a&&a.name=="DataCollection"?a.data.sync.apply(this.data,arguments):this.data.sync.apply(this.data,arguments)};if(window.dhtmlXForm)dhtmlXForm.prototype.bind=function(a){dhx.BaseBind.bind.apply(this,arguments);a.getBindData(this.a.id)},dhtmlXForm.prototype.unbind=function(a){dhx.BaseBind.g.call(this,a)},dhtmlXForm.prototype.b=function(){if(dhx.isUndefined(this.a))this.a={id:dhx.uid(),dataFeed:this.j},dhx.ui.views[this.a.id]=this},dhtmlXForm.prototype.z=function(a){if(!this.a.dataFeed||this.N||!a)return!0;var b=this.a.dataFeed;if(typeof b=="function")return b.call(this,a.id||a,a);b=b+(b.indexOf("?")==-1?"?":
"&")+"action=get&id="+encodeURIComponent(a.id||a);this.load(b);return!1},dhtmlXForm.prototype.setValues=dhtmlXForm.prototype.setFormData,dhtmlXForm.prototype.getValues=function(){return this.getFormData(!1,!0)},dhtmlXForm.prototype.dataFeed=function(a){this.a?this.a.dataFeed=a:this.j=a},dhtmlXForm.prototype.refresh=dhtmlXForm.prototype.isVisible=function(){return!0};if(window.scheduler){if(!window.Scheduler)window.Scheduler={};Scheduler.$syncFactory=function(a){a.sync=function(b,c){this.b&&this.b();b.b&&b.b();var d="_process_loading",e=function(){a.clearAll();for(var e=b.data.order,g=b.data.pull,h=[],i=0;i<e.length;i++)h[i]=c&&c.copy?dhx.clone(g[e[i]]):g[e[i]];a[d](h)};this.save=function(a){a||(a=this.getCursor());var c=this.item(a),d=b.item(a);this.callEvent("onStoreSave",[a,c,d])&&(dhx.extend(b.item(a),c,!0),b.update(a))};this.item=function(a){return this.getEvent(a)};this.w=[b.data.attachEvent("onStoreUpdated",function(){e.call(this)}),b.data.attachEvent("onIdChange",function(a,b){combo.changeOptionId(a,b)})];this.attachEvent("onEventChanged",function(a){this.save(a)});this.attachEvent("onEventAdded",function(a,c){b.data.pull[a]||b.add(c)});this.attachEvent("onEventDeleted",function(a){b.data.pull[a]&&b.remove(a)});e()};a.unsync=function(a){dhx.BaseBind.g.call(this,a)};a.b=function(){if(!this.a)this.a={id:dhx.uid()}}};Scheduler.$syncFactory(window.scheduler)}
if(window.dhtmlXCombo)dhtmlXCombo.prototype.bind=function(){dhx.BaseBind.bind.apply(this,arguments)},dhtmlXCombo.unbind=function(a){dhx.BaseBind.g.call(this,a)},dhtmlXCombo.unsync=function(a){dhx.BaseBind.g.call(this,a)},dhtmlXCombo.prototype.dataFeed=function(a){this.a?this.a.dataFeed=a:this.j=a},dhtmlXCombo.prototype.sync=function(a){this.b&&this.b();a.b&&a.b();var b=this,c=function(){b.clearAll();b.addOption(this.serialize())};this.w=[a.data.attachEvent("onStoreUpdated",function(){c.call(this)}),
a.data.attachEvent("onIdChange",function(a,c){b.changeOptionId(a,c)})];c.call(a)},dhtmlXCombo.prototype.b=function(){if(dhx.isUndefined(this.a))this.a={id:dhx.uid(),dataFeed:this.j},dhx.ui.views[this.a.id]=this,this.data={silent:dhx.bind(function(a){a.call(this)},this)},dhtmlxEventable(this.data),this.attachEvent("onChange",function(){this.callEvent("onSelectChange",[this.getSelectedValue()])}),this.attachEvent("onXLE",function(){this.callEvent("onBindRequest",[])})},dhtmlXCombo.prototype.item=function(id){return this.getOption(id)},
dhtmlXCombo.prototype.getSelected=function(){return this.getSelectedValue()},dhtmlXCombo.prototype.isVisible=function(){return!this.optionsArr.length&&!this.a.dataFeed?!1:!0},dhtmlXCombo.prototype.refresh=function(){this.render(!0)},dhtmlXCombo.prototype.filter=function(){alert("not implemented")};if(window.dhtmlXGridObject)dhtmlXGridObject.prototype.bind=function(a,b,c){dhx.BaseBind.bind.apply(this,arguments)},dhtmlXGridObject.prototype.unbind=function(a){dhx.BaseBind.g.call(this,a)},dhtmlXGridObject.prototype.unsync=function(a){dhx.BaseBind.g.call(this,a)},dhtmlXGridObject.prototype.dataFeed=function(a){this.a?this.a.dataFeed=a:this.j=a},dhtmlXGridObject.prototype.sync=function(a,b){this.b&&this.b();a.b&&a.b();var c=this,d="_parsing",e="_parser",f="_locator",g="_process_store_row",h="_get_store_data";this.save=function(b){b||(b=this.getCursor());dhx.extend(a.item(b),this.item(b),!0);a.update(b)};var i=function(){var a=c.getCursor?c.getCursor():null,b=0;c.B?(b=c.B,c.B=!1):c.clearAll();var i=this.dataCount();if(i){c[d]=!0;for(var k=b;k<i;k++){var l=this.order[k];if(l&&(!b||!c.rowsBuffer[k]))c.rowsBuffer[k]={idd:l,data:this.pull[l]},c.rowsBuffer[k][e]=c[g],c.rowsBuffer[k][f]=c[h],c.rowsAr[l]=this.pull[l]}if(!c.rowsBuffer[i-1])c.rowsBuffer[i-1]=dhtmlx.undefined,c.xmlFileUrl=c.xmlFileUrl||this.url;c.pagingOn?c.changePage():c.Ta&&c.Oa?c.Ua():(c.render_dataset(),c.callEvent("onXLE",[]));c[d]=!1}a&&c.setCursor&&c.setCursor(c.rowsAr[a]?a:null)};this.w=[a.data.attachEvent("onStoreUpdated",function(a,b,d){d=="delete"?(c.deleteRow(a),c.data.callEvent("onStoreUpdated",[a,b,d])):d=="update"?(c.callEvent("onSyncUpdate",[b,d]),c.update(a,b),c.data.callEvent("onStoreUpdated",[a,b,d])):d=="add"?(c.callEvent("onSyncUpdate",[b,d]),c.add(a,b,this.indexById(a)),c.data.callEvent("onStoreUpdated",[a,b,d])):i.call(this)}),
a.data.attachEvent("onStoreLoad",function(b,d){c.xmlFileUrl=a.data.url;c.B=b.getInfo(d).m}),a.data.attachEvent("onIdChange",function(a,b){c.changeRowId(a,b)})];c.attachEvent("onDynXLS",function(b,d){for(var e=b;e<b+d;e++)if(!a.data.order[e])return a.loadNext(d,b),!1;c.B=b;i.call(a.data)});i.call(a.data);c.attachEvent("onEditCell",function(a,b){a==2&&this.save(b);return!0});c.attachEvent("onClearAll",function(){var a="_f_rowsBuffer";this[a]=null});b&&b.sort&&c.attachEvent("onBeforeSorting",function(b,
d,e){if(d=="connector")return!1;var f=this.getColumnId(b);a.sort("#"+f+"#",e=="asc"?"asc":"desc",d=="int"?d:"string");c.setSortImgState(!0,b,e);return!1});if(b&&b.filter)c.attachEvent("onFilterStart",function(b,d){var e="_con_f_used";if(c[e]&&c[e].length)return!1;a.data.silent(function(){a.filter();for(var e=0;e<b.length;e++)if(d[e]!=""){var f=c.getColumnId(b[e]);a.filter("#"+f+"#",d[e],e!=0)}});a.refresh();return!1}),c.collectValues=function(b){var c=this.getColumnId(b);return function(a){var b=
[],c={};this.data.each(function(d){var e=d[a];c[e]||(c[e]=!0,b.push(e))});return b}.call(a,c)};b&&b.select&&c.attachEvent("onRowSelect",function(b){a.setCursor(b)});c.clearAndLoad=function(b){a.clearAll();a.load(b)}},dhtmlXGridObject.prototype.b=function(){if(dhx.isUndefined(this.a)){this.a={id:dhx.uid(),dataFeed:this.j};dhx.ui.views[this.a.id]=this;this.data={silent:dhx.bind(function(a){a.call(this)},this)};dhtmlxEventable(this.data);for(var a="_cCount",b=0;b<this[a];b++)this.columnIds[b]||(this.columnIds[b]=
"cell"+b);this.attachEvent("onSelectStateChanged",function(a){this.callEvent("onSelectChange",[a])});this.attachEvent("onSelectionCleared",function(){this.callEvent("onSelectChange",[null])});this.attachEvent("onEditCell",function(a,b){a===2&&this.getCursor&&b&&b==this.getCursor()&&this.k();return!0});this.attachEvent("onXLE",function(){this.callEvent("onBindRequest",[])})}},dhtmlXGridObject.prototype.item=function(a){if(a===null)return null;var b=this.getRowById(a);if(!b)return null;var c="_attrs",
d=dhx.copy(b[c]);d.id=a;for(var e=this.getColumnsNum(),f=0;f<e;f++)d[this.columnIds[f]]=this.cells(a,f).getValue();return d},dhtmlXGridObject.prototype.update=function(a,b){for(var c=0;c<this.columnIds.length;c++){var d=this.columnIds[c];dhx.isUndefined(b[d])||this.cells(a,c).setValue(b[d])}var e="_attrs",f=this.getRowById(a)[e];for(d in b)f[d]=b[d];this.callEvent("onBindUpdate",[a])},dhtmlXGridObject.prototype.add=function(a,b,c){for(var d=[],e=0;e<this.columnIds.length;e++){var f=this.columnIds[e];d[e]=dhx.isUndefined(b[f])?"":b[f]}this.addRow(a,d,c);var g="_attrs";this.getRowById(a)[g]=dhx.copy(b)},dhtmlXGridObject.prototype.getSelected=function(){return this.getSelectedRowId()},dhtmlXGridObject.prototype.isVisible=function(){var a="_f_rowsBuffer";return!this.rowsBuffer.length&&!this[a]&&!this.a.dataFeed?!1:!0},dhtmlXGridObject.prototype.refresh=function(){this.render_dataset()},dhtmlXGridObject.prototype.filter=function(a,b){if(this.a.dataFeed){var c={};if(!a&&!b)return;if(typeof a=="function"){if(!b)return;a(b,c)}else dhx.isUndefined(a)?c=b:c[a]=b;this.clearAll();var d=this.a.dataFeed;if(typeof d=="function")return d.call(this,b,c);var e=[],f;for(f in c)e.push("dhx_filter["+f+"]="+encodeURIComponent(c[f]));this.load(d+(d.indexOf("?")<0?"?":"&")+e.join("&"));return!1}if(b===null)return this.filterBy(0,function(){return!1});this.filterBy(0,function(c,d){return a.call(this,d,b)})};if(window.dhtmlXTreeObject)dhtmlXTreeObject.prototype.bind=function(){dhx.BaseBind.bind.apply(this,arguments)},dhtmlXTreeObject.prototype.unbind=function(a){dhx.BaseBind.g.call(this,a)},dhtmlXTreeObject.prototype.dataFeed=function(a){this.a?this.a.dataFeed=a:this.j=a},dhtmlXTreeObject.prototype.b=function(){if(dhx.isUndefined(this.a))this.a={id:dhx.uid(),dataFeed:this.j},dhx.ui.views[this.a.id]=this,this.data={silent:dhx.bind(function(a){a.call(this)},this)},dhtmlxEventable(this.data),this.attachEvent("onSelect",
function(a){this.callEvent("onSelectChange",[a])}),this.attachEvent("onEdit",function(a,b){a===2&&b&&b==this.getCursor()&&this.k();return!0})},dhtmlXTreeObject.prototype.item=function(a){return a===null?null:{id:a,text:this.getItemText(a)}},dhtmlXTreeObject.prototype.getSelected=function(){return this.getSelectedItemId()},dhtmlXTreeObject.prototype.isVisible=function(){return!0},dhtmlXTreeObject.prototype.refresh=function(){},dhtmlXTreeObject.prototype.filter=function(a,b){if(this.a.dataFeed){var c=
{};if(a||b){if(typeof a=="function"){if(!b)return;a(b,c)}else dhx.isUndefined(a)?c=b:c[a]=b;this.deleteChildItems(0);var d=this.a.dataFeed;if(typeof d=="function")return d.call(this,[data.id||data,data]);var e=[],f;for(f in c)e.push("dhx_filter["+f+"]="+encodeURIComponent(c[f]));this.loadXML(d+(d.indexOf("?")<0?"?":"&")+e.join("&"));return!1}}},dhtmlXTreeObject.prototype.update=function(a,b){dhx.isUndefined(b.text)||this.setItemText(a,b.text)};dhtmlx.skin='dhx_skyblue';