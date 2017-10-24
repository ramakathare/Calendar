/*
Copyright Dinamenta, UAB. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/
Scheduler.plugin(function(g){g.form_blocks.combo={render:function(a){if(!a.cached_options)a.cached_options={};var d="";d+="<div class='"+a.type+"' style='height:"+(a.height||20)+"px;' ></div>";return d},set_value:function(a,d,c,b){(function(){function b(){a._combo&&a._combo.DOMParent&&a._combo.destructor()}b();var c=g.attachEvent("onAfterLightbox",function(){b();g.detachEvent(c)})})();window.dhx_globalImgPath=b.image_path||"/";a._combo=new dhtmlXCombo(a,b.name,a.offsetWidth-8);b.onchange&&a._combo.attachEvent("onChange",
b.onchange);b.options_height&&a._combo.setOptionHeight(b.options_height);var e=a._combo;e.enableFilteringMode(b.filtering,b.script_path||null,!!b.cache);if(b.script_path){var f=c[b.map_to];f?b.cached_options[f]?(e.addOption(f,b.cached_options[f]),e.disable(1),e.selectOption(0),e.disable(0)):dhtmlxAjax.get(b.script_path+"?id="+f+"&uid="+g.uid(),function(a){var c=a.doXPath("//option")[0],d=c.childNodes[0].nodeValue;b.cached_options[f]=d;e.addOption(f,d);e.disable(1);e.selectOption(0);e.disable(0)}):
e.setComboValue("")}else{for(var i=[],h=0;h<b.options.length;h++){var j=b.options[h],k=[j.key,j.label,j.css];i.push(k)}e.addOption(i);if(c[b.map_to]){var l=e.getIndexByValue(c[b.map_to]);e.selectOption(l)}}},get_value:function(a,d,c){var b=a._combo.getSelectedValue();c.script_path&&(c.cached_options[b]=a._combo.getSelectedText());return b},focus:function(){}};g.form_blocks.radio={render:function(a){var d="";d+="<div class='dhx_cal_ltext dhx_cal_radio' style='height:"+a.height+"px;' >";for(var c=0;c<
a.options.length;c++){var b=g.uid();d+="<input id='"+b+"' type='radio' name='"+a.name+"' value='"+a.options[c].key+"'><label for='"+b+"'> "+a.options[c].label+"</label>";a.vertical&&(d+="<br/>")}d+="</div>";return d},set_value:function(a,d,c,b){for(var e=a.getElementsByTagName("input"),f=0;f<e.length;f++){e[f].checked=!1;var g=c[b.map_to]||d;if(e[f].value==g)e[f].checked=!0}},get_value:function(a){for(var d=a.getElementsByTagName("input"),c=0;c<d.length;c++)if(d[c].checked)return d[c].value},focus:function(){}};
g.form_blocks.checkbox={render:function(a){return g.config.wide_form?'<div class="dhx_cal_wide_checkbox" '+(a.height?"style='height:"+a.height+"px;'":"")+"></div>":""},set_value:function(a,d,c,b){var a=document.getElementById(b.id),e=g.uid(),f=typeof b.checked_value!="undefined"?c[b.map_to]==b.checked_value:!!d;a.className+=" dhx_cal_checkbox";var i="<input id='"+e+"' type='checkbox' value='true' name='"+b.name+"'"+(f?"checked='true'":"")+"'>",h="<label for='"+e+"'>"+(g.locale.labels["section_"+b.name]||
b.name)+"</label>";g.config.wide_form?(a.innerHTML=h,a.nextSibling.innerHTML=i):a.innerHTML=i+h;if(b.handler){var j=a.getElementsByTagName("input")[0];j.onclick=b.handler}},get_value:function(a,d,c){var a=document.getElementById(c.id),b=a.getElementsByTagName("input")[0];b||(b=a.nextSibling.getElementsByTagName("input")[0]);return b.checked?c.checked_value||!0:c.unchecked_value||!1},focus:function(){}}});
