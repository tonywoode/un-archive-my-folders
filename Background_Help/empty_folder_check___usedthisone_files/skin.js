var checkboxHeight="25";var radioHeight="25";var selectWidth="";document.write('<style type="text/css">input.styled { display: none; } select.styled { position: relative; width: '+selectWidth+'px; opacity: 0; filter: alpha(opacity=0); z-index: 5; }</style>');var Custom={init:function(){var inputs=document.getElementsByTagName("input"),span=Array(),textnode,option,active;for(a=0;a<inputs.length;a++){if((inputs[a].type=="checkbox"||inputs[a].type=="radio")&&inputs[a].className=="styled"){span[a]=document.createElement("span");span[a].className=inputs[a].type;if(inputs[a].checked==true){if(inputs[a].type=="checkbox"){position="0 -"+(checkboxHeight*2)+"px";span[a].style.backgroundPosition=position;}else{position="0 -"+(radioHeight*2)+"px";span[a].style.backgroundPosition=position;}}
inputs[a].parentNode.insertBefore(span[a],inputs[a]);inputs[a].onchange=Custom.clear;span[a].onmousedown=Custom.pushed;span[a].onmouseup=Custom.check;document.onmouseup=Custom.clear;}}
inputs=document.getElementsByTagName("select");for(a=0;a<inputs.length;a++){if(inputs[a].className=="styled"){option=inputs[a].getElementsByTagName("option");active=option[0].childNodes[0].nodeValue;textnode=document.createTextNode(active);for(b=0;b<option.length;b++){if(option[b].selected==true){textnode=document.createTextNode(option[b].childNodes[0].nodeValue);}}
span[a]=document.createElement("span");span[a].className="select";span[a].id="select"+inputs[a].name;span[a].appendChild(textnode);inputs[a].parentNode.insertBefore(span[a],inputs[a]);inputs[a].onchange=Custom.choose;}}},pushed:function(){element=this.nextSibling;if(element.checked==true&&element.type=="checkbox"){this.style.backgroundPosition="0 -"+checkboxHeight*3+"px";}else if(element.checked==true&&element.type=="radio"){this.style.backgroundPosition="0 -"+radioHeight*3+"px";}else if(element.checked!=true&&element.type=="checkbox"){this.style.backgroundPosition="0 -"+checkboxHeight+"px";}else{this.style.backgroundPosition="0 -"+radioHeight+"px";}},check:function(){element=this.nextSibling;if(element.checked==true&&element.type=="checkbox"){this.style.backgroundPosition="0 0";element.checked=false;}else{if(element.type=="checkbox"){this.style.backgroundPosition="0 -"+checkboxHeight*2+"px";}else{this.style.backgroundPosition="0 -"+radioHeight*2+"px";group=this.nextSibling.name;inputs=document.getElementsByTagName("input");for(a=0;a<inputs.length;a++){if(inputs[a].name==group&&inputs[a]!=this.nextSibling){inputs[a].previousSibling.style.backgroundPosition="0 0";}}}
element.checked=true;}},clear:function(){inputs=document.getElementsByTagName("input");for(var b=0;b<inputs.length;b++){if(inputs[b].type=="checkbox"&&inputs[b].checked==true&&inputs[b].className=="styled"){inputs[b].previousSibling.style.backgroundPosition="0 -"+checkboxHeight*2+"px";}else if(inputs[b].type=="checkbox"&&inputs[b].className=="styled"){inputs[b].previousSibling.style.backgroundPosition="0 0";}else if(inputs[b].type=="radio"&&inputs[b].checked==true&&inputs[b].className=="styled"){inputs[b].previousSibling.style.backgroundPosition="0 -"+radioHeight*2+"px";}else if(inputs[b].type=="radio"&&inputs[b].className=="styled"){inputs[b].previousSibling.style.backgroundPosition="0 0";}}},choose:function(){option=this.getElementsByTagName("option");for(d=0;d<option.length;d++){if(option[d].selected==true){document.getElementById("select"+this.name).childNodes[0].nodeValue=option[d].childNodes[0].nodeValue;}}}}
window.onload=Custom.init;function verticalRotator(name,parentid,listHeight,detailHeight,timercount,pausecount,currentClass,rotateClass,slideSpeed)
{this.name=name;this.initialized=false;this.currentIndex=0;this.slideSpeed=slideSpeed;this.listItems=new Array();this.detailItems=new Array();this.currentClass=currentClass;this.rotateClass=rotateClass;this.timer=false;this.timercount=timercount;this.pausecount=pausecount;this.parent=jQuery('#'+parentid);this.listHeight=listHeight;this.detailHeight=detailHeight;this.load=function(startIndex,listName,divName)
{var i=startIndex;var x=document.getElementById(listName+i);var y=document.getElementById(divName+i);while(typeof x!='undefined'&&x!=null&&typeof y!='undefined'&&y!=null)
{this.listItems.push(jQuery(x));this.detailItems.push(jQuery(y));i++;x=document.getElementById(listName+i);y=document.getElementById(divName+i);}
this.init();}
this.init=function()
{if(this.count()>0)
{this.parent.css('height',this.count()*this.listHeight+this.detailHeight);this.detail(0);}
else
{this.parent.css('height',0);}
this.initialized=true;this.start();}
this.start=function()
{this.play(this.timercount);}
this.play=function(duration)
{this.pause();this.timer=setTimeout(this.name+'.rotate();',duration);}
this.delay=function()
{this.play(this.pausecount);}
this.pause=function()
{if(this.timer)
clearTimeout(this.timer);}
this.rotate=function()
{if(this.currentIndex+1<this.count())
this.detail(this.currentIndex+1);else
this.detail(0);this.start();}
this.detail=function(index)
{if(index<this.count()&&index>=0)
{if(index!=0)
{this.listItems[index].addClass(this.rotateClass);}
if(this.initialized)
{this.listItems[this.currentIndex].removeClass(this.currentClass);this.listItems[this.currentIndex].removeClass(this.rotateClass);}
for(var i=0;i<this.count();i++)
{if(i!=index)
this.detailItems[i].slideUp(this.slideSpeed);}
if(index==0)
{this.listItems[index].addClass(this.rotateClass);}
if(this.initialized)
this.detailItems[index].slideDown(this.slideSpeed,eval('function callback() {'+this.name+'.listItems[index].addClass('+this.name+'.currentClass)}'));this.currentIndex=index;}
return false;}
this.count=function()
{return this.listItems.length;}}
function tabBlock(name,defaultId)
{this.name=name;this.tabs=new Array();this.pages=new Array();this.tabs['T1']=jQuery('#'+defaultId);this.add=function(id)
{this.pages.push(jQuery('#'+id));if(this.pages.length==1)
this.show(1);else
this.hide(this.pages.length-1);}
this.hide=function(index)
{this.pages[index].css('display','none');}
this.show=function(index,obj)
{if(typeof obj!='undefined'&&obj!=null)
{this.tabs['T'+index]=jQuery(obj);}
for(var i=0;i<this.pages.length;i++)
{if(i==index-1)
{this.pages[i].css('display','block');if(typeof this.tabs['T'+(i+1)]!='undefined'&&this.tabs['T'+(i+1)]!=null)
this.tabs['T'+(i+1)].addClass('current');}
else
{this.hide(i);if(typeof this.tabs['T'+(i+1)]!='undefined'&&this.tabs['T'+(i+1)]!=null)
this.tabs['T'+(i+1)].removeClass('current');}}}}
var srcvalue='';var counter=0;var timer;function printcontent(panename){if(panename==null||panename=='')
panename='ContentPane'
myRef=window.open('/print.aspx','mywin','left=20,top=20,width=700,height=700,toolbar=1,resizable=1,scrollbars=yes');srcvalue=document.getElementById('dnn_'+panename).innerHTML;counter=10;waitfortarget();}
function waitfortarget(){counter--;if(!myRef.document.getElementById('dnn_ContentPane'))
{if(counter>0){timer=setTimeout("waitfortarget()",1500);}
else{alert('Unable to load article. Please try again later.');}}
else{donetarget();}}
function donetarget(){myRef.document.getElementById('dnn_ContentPane').innerHTML=srcvalue;myRef.print();}