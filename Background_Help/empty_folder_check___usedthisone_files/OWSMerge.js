if(typeof ows=='undefined'||ows==null)
{function OWSParameters(){this.ConfigurationID='id';this.Source='lxSrc';this.ResourceKey='key';this.ResourceFile='file';this.PageId='p';this.ModuleId='m';this.Download='download';this.CPageId='cp';this.CModuleId='cm';this.Type='type';this.Sort='sort';this.Action='lxA';this.Actions='xActions';this.UpgradeModule='uM';this.UpgradePage='uT';this.Filename='filename';this.CheckIndex='lxIx';this.CheckModuleID='lxM';this.CheckGroup='lxG';this.CheckItem='lxI';this.CheckValue='lxV';this.CheckRemove='lxR';this.Name='lxN';this.RecordsPerPage='lxC';this.PageNumber='lxP';}
var _OWS_=new OWSParameters();function OWSControl(id,ipage,rpp,requestparameters,wurl,onload,forcepager,historypager)
{this.id=id;this.page=ipage;this.length=0;this.tbl=false;this.sort=null;this.xml=false;this.data=false;this.pgs=false;this.status=false;this.forcepager=forcepager;if(typeof historypager!='undefined'&&historypager!=null&&historypager.length>0)
{this.historypagerDisplay=historypager;this.historypager=true;}
else
{this.historypagerDisplay='Page'+id;this.historypager=false;}
this.request=requestparameters;this.url=wurl;this.hide=false;if(this.id!=null)
{if(this.forcepager)
this.pgsn=this.forcepager;else
this.pgsn='lxP'+this.id;this.statusn='lxS'+this.id;}
else
{this.pgsn='';this.statusn='';}
this.rpp=rpp;this.onLoad=onload;}
function OWS()
{this.items=new Array();this.urlbase='';this.DETECT=navigator.userAgent.toLowerCase();this.SPINWAIT=250;this.STARTDELAY=1000;this.LOCALE_PAGEFIRST='First';this.LOCALE_PAGELAST='Last';this.LOCALE_PAGENEXT='Next';this.LOCALE_PAGEBACK='Back';this.LOCALE_STATUS1='Rendering Data...';this.LOCALE_STATUS2='Fetching Data...';this.LOCALE_STATUS3='Data Failure.';this.LOCALE_STATUS4='AJAX: Asynchronous XML with Javascript is not supported by your browser.';this.LOCALE_STATUS5='There was a problem retrieving the XML data:\n';this.Create=function Create(id,page,rpp,request,wurl,url,enable,refresh,historypager,targetobjectid,forcepager,qparams){this.urlbase=url;if(page<=0)
page=0;var skip=false;var loadpages=null;if(typeof(enable)!="boolean"&&!isNaN(enable))
{loadpages=enable;skip=true;}
else
{skip=enable;}
this.items['o'+id]=new OWSControl(id,page,rpp,request,wurl,null,forcepager,historypager);var cPage=this.PageGet(id);if(cPage!=null)
page=cPage;this.items['o'+id].page=page;if(typeof qparams==undefined||qparams==null)
qparams='';this.Pagers['o'+id]=undefined;this.Init(id,this.items['o'+id].page,skip,qparams,targetobjectid);if(refresh>-1)
{var starget='';if(typeof qparams!='undefined'&&qparams!=null&&qparams.length>0)
starget='\''+qparams+'\'';else
starget='\'\'';if(typeof targetobjectid!='undefined'&&targetobjectid!=null&&targetobjectid.length>0)
starget=starget+',\''+targetobjectid+'\'';window.setInterval("ows.Fetch("+id+",ows.items['o"+id+"'].page,"+starget+");",refresh);}
if(loadpages!=null&&loadpages>0)
{this.items['o'+id].length=loadpages;this.Page(id);}}
this.PageGet=function(id)
{var historyPageText=this.items['o'+id].historypagerDisplay;var strLocation=document.location+'';var lsplit=strLocation.split('#'+historyPageText+':');if(lsplit.length>1)
{var nsplit=lsplit[lsplit.length-1].split('#');return nsplit[0];}
return null;}
this.PageSet=function(id,page)
{var historyPageText=this.items['o'+id].historypagerDisplay;var strLocation=document.location+'';var value='#'+historyPageText+':'+page;var lsplit=strLocation.split('#'+historyPageText+':');var locLeft=lsplit[0];if(lsplit.length>1)
{var nsplit=lsplit[lsplit.length-1].split('#');nsplit[0]='#'+historyPageText+':'+page;locLeft+=nsplit.join('#');}
else
{locLeft+=value;}
return locLeft;}
this.BrowserType=function BrowserType(string)
{return this.DETECT.indexOf(string)+1;}
this.Init=function Init(TM,page,skip,qparams,targetobjectid)
{if(qparams==undefined||qparams==null&&qparams.length==0)
qparams='';if(targetobjectid==undefined||targetobjectid==null&&targetobjectid.length==0)
targetobjectid='';if(!skip&&this.BrowserType('msie')&&document.readyState!='complete')
{var exparams='';if(qparams.length>0)
exparams=",'"+qparams+"'";else
exparams=",null";if(targetobjectid.length>0)
exparams=exparams+",'"+targetobjectid+"'";else
exparams=exparams+",null";if(page)
{window.setTimeout('ows.Init(\''+TM+'\','+page+','+skip+exparams+');',this.SPINWAIT)}
else
{window.setTimeout('ows.Init(\''+TM+'\',0,'+skip+exparams+');',this.SPINWAIT)}}
else
{if(targetobjectid.length==0)
targetobjectid=null;this.lxOverride();this.onLoad(TM,targetobjectid);if(!page)
page=0;window['CURRENTPAGE'+TM]=page;if(!skip)
{if(targetobjectid!=null)
this.Fetch(TM,page,qparams,targetobjectid);else
this.Fetch(TM,page,qparams);}}}
this.onLoad=function onLoad(TM,targetobjectid)
{if(targetobjectid==undefined||targetobjectid==null)
this.items['o'+TM].tbl=document.getElementById('lxT'+TM);else
this.items['o'+TM].tbl=document.getElementById(targetobjectid);}
this.Status=function Status(TM,value)
{try
{if(!this.items['o'+TM].status)
{this.items['o'+TM].status=document.getElementById(this.items['o'+TM].statusn);}
if(this.items['o'+TM].status)
{this.items['o'+TM].status.innerHTML=value;}}
catch(ex)
{}}
this.Load=function Load(TM,targetobjectid)
{var parse=0;if(this.items['o'+TM].tbl&&this.items['o'+TM].data)
{parse=1;this.Status(TM,this.LOCALE_STATUS1);this.HASSTARTED=false;this.Render(TM,targetobjectid);}
this.Status(TM,'');if(targetobjectid==null)
{this.Page(TM);}
else
{if(this.items['o'+TM].forcepager)
{this.Page(TM);}}
if(parse==1)
{if(typeof targetobjectid!=undefined&&targetobjectid!=null)
{var targetobject=document.getElementById(targetobjectid);if(targetobject!=undefined)
{this.Parse(targetobject);}}
else
{this.Parse(this.items['o'+TM].tbl);}}
this.CompleteLoad(TM);}
this.Parse=function Parse(obj)
{var objects=new Array();objects=obj.getElementsByTagName('SCRIPT');for(i=0;i<objects.length;i++)
{this.InstallScript(objects[i]);}}
this.InstallScript=function InstallScript(script)
{if(!script)
return;if(script.src)
{var head=document.getElementsByTagName("head")[0];var scriptObj=document.createElement("script");scriptObj.setAttribute("type","text/javascript");scriptObj.setAttribute("src",script.src);head.appendChild(scriptObj);}
else if(script.innerHTML)
{if(window.execScript)
{window.execScript(script.innerHTML);}
else
window.eval(script.innerHTML);}}
this.CompleteLoad=function CompleteLoad(TM)
{try{if(this.items['o'+TM].onLoad!=null&&this.items['o'+TM].onLoad.length>0){eval(this.items['o'+TM].onLoad+'();');}}
catch(errObj){}}
this.Content=function Content(TM,src,ignoreResultStats){if(src&&src.length>=20)
{var strRecordCount;strRecordCount=src.substring(0,20);if(isNaN(strRecordCount))
{if(typeof ignoreResultStats=='undefined'||ignoreResultStats=='false')
this.items['o'+TM].length=0;return src;}
else
{if(typeof ignoreResultStats=='undefined'||ignoreResultStats=='false')
this.items['o'+TM].length=strRecordCount;return src.substring(20);}}}
this.GetForm=function GetForm(fobj)
{var str="";for(var i=0;i<fobj.elements.length;i++)
{var value="";switch(fobj.elements[i].type)
{case'text':case'password':case'textarea':value+=this.GetElementName(fobj.elements[i].name)+"="+encodeURIComponent(fobj.elements[i].value);break;case'select-one':if(fobj.elements[i].options.length>0&&fobj.elements[i].selectedIndex>=0){value+=this.GetElementName(fobj.elements[i].name)+"="+encodeURIComponent(fobj.elements[i].options[fobj.elements[i].selectedIndex].value);}
break;case'select-multiple':if(fobj.elements[i].length>0){var sSelValues='';try
{for(var iSel=0;iSel<fobj.elements[i].length;iSel++)
{if(fobj.elements[i].options[iSel].selected==true)
{if(sSelValues!='')
sSelValues+="&"+this.GetElementName(fobj.elements[i].name)+'=';sSelValues+=encodeURIComponent(fobj.elements[i].options[iSel].value);}}}
catch(err)
{}
value+=this.GetElementName(fobj.elements[i].name)+"="+sSelValues;}
break;case'hidden':if(fobj.elements[i].name!='__VIEWSTATE')
{value+=this.GetElementName(fobj.elements[i].name)+"="+encodeURIComponent(fobj.elements[i].value);}
break;case'radio':if(fobj.elements[i].checked)
{value+=this.GetElementName(fobj.elements[i].name)+"="+encodeURIComponent(fobj.elements[i].value);}
break;case'checkbox':if(fobj.elements[i].checked)
{value+=this.GetElementName(fobj.elements[i].name)+"="+encodeURIComponent(fobj.elements[i].value);}
break;default:}
if(value!="")
{if(str!="")
str+="&";str+=value;}}
return str;}
this.GetQuery=function GetQuery(appendQuery)
{var QRY='';var cleanURL;var urlParts;var recordElement=false;var isKey=true;var pathQuery="";var isSkipped=false;if(appendQuery==null)
appendQuery='';appendQuery='&'+appendQuery.toLowerCase();if(document.location.search.length>0)
{QRY=document.location.search.substr(1);}
var QRYpairs=QRY.split('&');QRY=new Array();for(i=0;i<QRYpairs.length;i++)
{var QRYKey=QRYpairs[i].split('=');if(appendQuery.indexOf('&'+QRYKey[0].toLowerCase()+'=')==-1)
{QRY.push(QRYpairs[i]);}}
QRY=QRY.join('&');cleanURL=document.location.pathname;urlParts=cleanURL.split("/");for(var i=0;i<urlParts.length-1;i++)
{if(!recordElement&&urlParts[i].toLowerCase()=="tabid")
{recordElement=true;}
if(recordElement)
{if(isKey)
{isSkipped=false;if(appendQuery.indexOf('&'+urlParts[i].toLowerCase()+'=')>0)
isSkipped=true;else
pathQuery+="&"+urlParts[i]+"=";}
else
{if(!isSkipped)
pathQuery+=urlParts[i];}
isKey=!isKey;}}
if(pathQuery.length>0)
{if(QRY.length>0)
{QRY+=pathQuery;}
else
{QRY=pathQuery.substr(1);}}
return QRY;}
this.GetElementName=function GetElementName(name)
{if(name.length>1&&name.substr(0,1)=='_')
return'"'+name+'"';else
return name;}
this.Sort=function(TM,page,sortIndex,appendQuery,targetobjectid)
{this.items['o'+TM].sort=sortIndex;if(typeof appendQuery=='undefined'||appendQuery==null)
appendQuery='';if(typeof targetobjectid=='undefined'||targetobjectid==null)
this.Fetch(TM,this.items['o'+TM].page,appendQuery);else
this.Fetch(TM,this.items['o'+TM].page,appendQuery,targetobjectid);}
this.Fetch=function(TM,page,appendQuery,targetobjectid)
{var ignoreResultStats=false;this.Status(TM,this.LOCALE_STATUS2);if(!page)
{page=0;}
if(!this.items['o'+TM].page)
{this.items['o'+TM].page=0}
if(page>=0&&((this.items['o'+TM].length==0&&page==0)||((page)<=Math.round((this.items['o'+TM].length/this.items['o'+TM].rpp)+0.5))))
{window['CURRENTPAGE'+TM]=page;this.items['o'+TM].page=page;this.items['o'+TM].data=false;}
if(page<0)
{ignoreResultStats=true;}
if(!this.items['o'+TM].data)
{this.FetchStart(TM,appendQuery,targetobjectid,ignoreResultStats);}
else
{this.Load(TM);}}
this.CleanQuery=function CleanQuery(value)
{var query=value;var vars=query.split('&');var result='';var tabid=false;var mid=false;var tmid=false;for(var i=0;i<vars.length;i++)
{var pair=vars[i].split('=');switch(pair[0].toLowerCase())
{case'tabid':tabid=pair[1];break;case'mid':mid=pair[1];break;case'tmid':tmid=pair[1];break;default:if(result.length>0)
result+='&'
result+=pair[0]+'='+pair[1]}}
if(tabid)
{if(result.length>0)
result+='&'
result+='tabid='+tabid;}
if(mid)
{if(result.length>0)
result+='&'
result+='mid='+mid;}
if(tmid)
{if(result.length>0)
result+='&'
result+='tmid='+tmid;}
return result;}
this.FetchStart=function FetchStart(TM,appendQuery,targetobjectid,ignoreResultStats)
{var isIframe=false;var pgValue=this.items['o'+TM].page;if(ignoreResultStats)
pgValue=-1;var qParams={"QueryString":""}
var oParams={"Default":this.items['o'+TM].request,"RecordsPerPage":this.items['o'+TM].rpp,"PageNumber":pgValue}
if(typeof this.items['o'+TM].sort!='undefined'&&this.items['o'+TM].sort!=null)
{oParams.sort=this.items['o'+TM].sort;this.items['o'+TM].sort=null;}
if(appendQuery.length>=1)
qParams.QueryString=qParams.QueryString+(qParams.QueryString.length>0?'&':'')+appendQuery;var getQuery=this.GetQuery(qParams.QueryString);if(getQuery.length>0)
qParams.QueryString=qParams.QueryString+'&'+getQuery;url=this.CallbackUrl(oParams,qParams);if(window.XMLHttpRequest)
{try{this.items['o'+TM].xml=new XMLHttpRequest();}
catch(e)
{this.items['o'+TM].xml=false;}}
else if(window.ActiveXObject){try{this.items['o'+TM].xml=new ActiveXObject("Msxml2.XMLHTTP");}
catch(e)
{try{this.items['o'+TM].xml=new ActiveXObject("Microsoft.XMLHTTP");}
catch(e)
{isIframe=true;}}}
if(this.items['o'+TM].xml||isIframe)
{this.Status(TM,this.LOCALE_STATUS2);try{if(document.forms.length>0)
var fstr=this.GetForm(document.forms[0]);else
var fstr=""
var random_num=(Math.round((Math.random()*100000000)+1))
if(!isIframe){if(targetobjectid!=null)
eval('this.items[\'o'+TM+'\'].xml.onreadystatechange = function() {ows.FetchEnd(\''+TM+'\',\''+targetobjectid+'\',\''+ignoreResultStats+'\');}');else
eval('this.items[\'o'+TM+'\'].xml.onreadystatechange = function() {ows.FetchEnd(\''+TM+'\');}');this.items['o'+TM].xml.open("POST",url+'&RA='+random_num,true);this.items['o'+TM].xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");this.items['o'+TM].xml.send(fstr);}
else
{new iframerequest({extendedId:TM,targetObjectId:targetobjectid,onEndResponse:'ows.FetchEndIFrame',formdata:fstr,url:url+'&RA='+random_num});}}
catch(e)
{this.Status(TM,this.LOCALE_STATUS3+e.message);}}
else
{this.Status(TM,this.LOCALE_STATUS4);}}
this.FetchEndIFrame=function FetchEndIFrame(TM,src,targetobjectid)
{DATA=this.Content(TM,src);this.Status(TM,'');if(DATA)
{this.items['o'+TM].DATA=DATA;this.Load(TM,targetobjectid);}}
this.FetchEnd=function FetchEnd(TM,targetobjectid,ignoreResultStats)
{var DATA=false;if(this.items['o'+TM].xml)
{if(this.items['o'+TM].xml.readyState==4)
{if(this.items['o'+TM].xml.status==200)
{if(this.items['o'+TM].xml.responseText)
{DATA=this.Content(TM,this.items['o'+TM].xml.responseText,ignoreResultStats);this.Status(TM,'');if(DATA)
{this.items['o'+TM].data=DATA;this.Load(TM,targetobjectid);}}}else{this.Status(TM,this.LOCALE_STATUS5+this.items['o'+TM].xml.statusText);}
this.items['o'+TM].xml.onreadystatechange=new function(){};this.CleanUp(TM);}}}
this.CleanUp=function CleanUp(TM)
{this.items['o'+TM].data=null;this.items['o'+TM].xml=null;}
this.Render_ScriptParseIE='<br style="display: none;">'
this.Render=function Render(TM,targetobjectid)
{var strvalue='';if(this.items['o'+TM].tbl&&this.items['o'+TM].data){if(targetobjectid!=undefined)
{var targetobject=document.getElementById(targetobjectid);if(targetobject!=undefined)
{targetobject.innerHTML=this.Render_ScriptParseIE+this.items['o'+TM].data;}}
else
{this.items['o'+TM].tbl.innerHTML=this.Render_ScriptParseIE+this.items['o'+TM].data;}}
if(this.items['o'+TM].hide==true)
{if(!this.items['o'+TM].data||this.items['o'+TM].data.length==0)
{this.Module(TM,false);}
else
{this.Module(TM,true);}}}
this.MaxPage=function MaxPage(TM)
{var lastPage=1;if(this.items['o'+TM].length>2)
{if(this.items['o'+TM].rpp>0)
{lastPage=Math.ceil((this.items['o'+TM].length/this.items['o'+TM].rpp));}}
return lastPage;}
this.Pagers=new Array();this.History=function(TM,page)
{try{if(this.items['o'+TM].historypager)
window.setTimeout('ows.SetHistory(\''+TM+'\','+page+');',100);}
catch(ex)
{}
return false;}
this.SetHistory=function(TM,page)
{document.location.replace(this.PageSet(TM,page));}
this.Page=function Page(TM)
{this.items['o'+TM].pgs=document.getElementById(this.items['o'+TM].pgsn);var CURRENTPAGE=0;var DATALENGTH=0;var RPP=0;var PGS=false;var PGSa=false;var PGSb=new Array();var PGStext='';var minPage=0;var maxPage=0;var lastPage=0;var PGSHeader='';var PGSFooter='';var PGSPages=10;var PGSPageHalf=0;var PGSPage='PAGENUMBER';var PGSBack=this.LOCALE_PAGEBACK;var PGSNext=this.LOCALE_PAGENEXT;var PGSFirst=this.LOCALE_PAGEFIRST;var PGSLast=this.LOCALE_PAGELAST;var PGSSeparator='|';var PGSPageSeparator=' ';var PGSBackSeparator='...';var PGSNextSeparator='...';var HistoryPageAnchor;CURRENTPAGE=Number(this.items['o'+TM].page);DATALENGTH=this.items['o'+TM].length;RPP=this.items['o'+TM].rpp;PGS=this.items['o'+TM].pgs;HistoryPageAnchor=this.items['o'+TM].historypagerDisplay;PGSa=this.Pagers['o'+TM];if(!PGSa)
{if(!PGS)
{PGSa=document.getElementsByTagName('lxPager'+TM);}
else
{PGSa=new Array();PGSa[0]=PGS;}
this.Pagers['o'+TM]=PGSa;}
if(PGSa.length>0)
{if(PGSa[0].getAttribute('Header')!=null)PGSHeader=PGSa[0].getAttribute('Header');if(PGSa[0].getAttribute('Footer')!=null)PGSFooter=PGSa[0].getAttribute('Footer');if(PGSa[0].getAttribute('Pages')!=null)PGSPages=PGSa[0].getAttribute('Pages');if(PGSa[0].getAttribute('Page')!=null)PGSPage=PGSa[0].getAttribute('Page');if(PGSa[0].getAttribute('Back')!=null)PGSBack=PGSa[0].getAttribute('Back');if(PGSa[0].getAttribute('Next')!=null)PGSNext=PGSa[0].getAttribute('Next');if(PGSa[0].getAttribute('First')!=null)PGSFirst=PGSa[0].getAttribute('First');if(PGSa[0].getAttribute('Last')!=null)PGSLast=PGSa[0].getAttribute('Last');if(PGSa[0].getAttribute('Separator')!=null)PGSSeparator=PGSa[0].getAttribute('Separator');if(PGSa[0].getAttribute('PageSeparator')!=null)PGSPageSeparator=PGSa[0].getAttribute('PageSeparator');if(PGSa[0].getAttribute('BackSeparator')!=null)PGSBackSeparator=PGSa[0].getAttribute('BackSeparator');if(PGSa[0].getAttribute('NextSeparator')!=null)PGSNextSeparator=PGSa[0].getAttribute('NextSeparator');}
if(DATALENGTH>1)
{PGSPageHalf=PGSPages/2;minPage=(CURRENTPAGE+1)-(PGSPageHalf-1);if(RPP>0)
{lastPage=Math.ceil((DATALENGTH/RPP));}
else
{lastPage=minPage;}
if(minPage<0)
{minPage=0;}
maxPage=minPage+(PGSPageHalf+1);if(maxPage>lastPage)
{maxPage=lastPage;}
if(DATALENGTH==RPP)
{maxPage=minPage;lastPage=minPage;}
if((lastPage-1)>0)
{if(CURRENTPAGE>0)
{if(PGSBack.length>0)
{PGStext+='<a href="#'+HistoryPageAnchor+':'+(CURRENTPAGE-1)+'" onclick="ows.Fetch(\''+TM+'\','+(CURRENTPAGE-1)+',\'\');'+'return ows.History(\''+TM+'\','+(CURRENTPAGE-1)+');'+'">'+PGSBack+'</a>'+PGSPageSeparator+''+PGSBackSeparator+' ';}
if(PGSFirst.length>0)
{PGStext+='<a href="#'+HistoryPageAnchor+':'+0+'" onclick="ows.Fetch(\''+TM+'\','+0+',\'\');'+'return ows.History(\''+TM+'\','+0+');'+'">'+PGSFirst+'</a>'+PGSPageSeparator+''+PGSSeparator+''+PGSPageSeparator+'';}}
else
{if(PGSBack.length>0)
{PGStext+=''+PGSBack+''+PGSPageSeparator+''+PGSBackSeparator+''+PGSPageSeparator+'';}
if(PGSFirst.length>0)
{PGStext+=''+PGSFirst+''+PGSPageSeparator+''+PGSSeparator+''+PGSPageSeparator+'';}}
for(x=minPage;x<maxPage;x++)
{if(x==CURRENTPAGE)
PGStext+=PGSPage.replace(/PAGENUMBER/,(x+1));else
PGStext+='<a href="#'+HistoryPageAnchor+':'+(x)+'" onclick="ows.Fetch(\''+TM+'\','+x+',\'\');'+'return ows.History(\''+TM+'\','+x+');'+'">'+PGSPage.replace(/PAGENUMBER/,(x+1))+'</a>';PGStext+=''+PGSPageSeparator+'';}
if(CURRENTPAGE<(lastPage-1))
{if(PGSLast.length>0)
{PGStext+=''+PGSSeparator+''+PGSPageSeparator+'<a href="#'+HistoryPageAnchor+':'+(lastPage-1)+'" onclick="ows.Fetch(\''+TM+'\','+(lastPage-1)+',\'\');'+'return ows.History(\''+TM+'\','+(lastPage-1)+');'+'">'+PGSLast+'</a>'+PGSPageSeparator+''+PGSNextSeparator+''+PGSPageSeparator+'';}
if(PGSNext.length>0)
{PGStext+='<a href="#'+HistoryPageAnchor+':'+(CURRENTPAGE+1)+'" onclick="ows.Fetch(\''+TM+'\','+(CURRENTPAGE+1)+',\'\');'+'return ows.History(\''+TM+'\','+(CURRENTPAGE+1)+');'+'">'+PGSNext+'</a>';}}
else
{if(PGSLast.length>0)
{PGStext+=''+PGSSeparator+' '+PGSLast+' '+PGSNextSeparator+' ';}
if(PGSNext.length>0)
{PGStext+=''+PGSNext+'';}}
PGStext=PGSHeader+PGStext+PGSFooter;}}
if(PGSa.length>0)
{for(ii=0;ii<PGSa.length;ii++)
{try
{PGSa[ii].innerHTML=PGStext;}
catch(x)
{xt=null;xt=document.createElement('span');xt.innerHTML=PGStext;xt.Header=PGSHeader;xt.Footer=PGSFooter;xt.Pages=PGSPages;xt.Page=PGSPage;xt.Back=PGSBack;xt.Next=PGSNext;xt.First=PGSFirst;xt.Last=PGSLast;xt.Separator=PGSSeparator;xt.PageSeparator=PGSPageSeparator;xt.BackSeparator=PGSBackSeparator;xt.NextSeparator=PGSNextSeparator;PGSa[ii].parentNode.insertBefore(xt,PGSa[ii]);PGSb[ii]=xt;}}}
if(PGSb.length>0)
{this.Pagers['o'+TM]=PGSb;}}
this.CurrentPage=function(TM)
{return this.items['o'+TM].page;}
this.Module=function Module(moduleid,display)
{var anchor=false;for(i=0;i<document.anchors.length;i++)
{if(document.anchors[i].name==moduleid)
{anchor=document.anchors[i];i=document.anchors.length;}}
if(anchor!=null)
{var sibling=anchor.nextSibling;var displaytext='';if(display)
{displaytext='block';}
else
{displaytext='none';}
while(sibling!=null)
{if(sibling!=null&&(sibling.tagName!='A'||(sibling.tagName=='A'&&!isNaN(sibling.Name))))
{if(sibling.style!=null&&sibling.tagName!='SCRIPT')
{sibling.style.display=displaytext;}
sibling=sibling.nextSibling;}
else
{sibling=null;}}}}
this.CheckArray=new Array();this.CheckArrayIndex=0;this.onGroupCheckChange=function onGroupCheckChange(moduleid,value)
{var form=document.forms[0];for(i=0;i<form.length;i++)
{if(form[i].id.substr(0,value.id.length)==value.id&&form[i].id!=value.id)
{form[i].checked=value.checked;if(form[i].getAttribute('name'))
{form[i].onclick();}}}}
this.CallbackUrl=function CallbackUrl(oObj,qObj)
{var qParams=new Array();var oParams=new Array();var dParams='';for(prop in oObj)
{if(prop.toUpperCase()!='DEFAULT')
for(Oprop in _OWS_)
{if(Oprop.toUpperCase()==prop.toUpperCase())
{oParams.push(_OWS_[Oprop]+':'+oObj[prop]);break;}}
else
dParams=oObj[prop];}
for(prop in qObj)
{switch(prop.toUpperCase())
{case'QUERYSTRING':qParams.push(qObj[prop]);break;default:qParams.push(prop+'='+escape(qObj[prop]));}}
var op=oParams.join(',');if(op.length>0&&dParams.length>0)
op+=','
op+=dParams;qParams.push('_OWS_='+op);return this.urlbase+'IM.aspx?'+qParams.join('&');}
this.onCheck=function onCheckChange(moduleid,group,item,value)
{var val;val=0;if(value.checked)
{val=1;}
this.CheckArray[this.CheckArrayIndex]=new Image();this.CheckArray[this.CheckArrayIndex].src=this.urlbase+'IM.aspx?_OWS_='+_OWS_.Action+':C,'+_OWS_.CheckIndex+':'+this.CheckArrayIndex+','+_OWS_.CheckModuleID+':'+moduleid+','+_OWS_.CheckGroup+':'+group+','+_OWS_.CheckItem+':'+item+','+_OWS_.CheckValue+':'+val+'&'+this.items['o'+moduleid].request;this.CheckArrayIndex=this.CheckArrayIndex+1;}
this.onUncheck=function onUncheck(moduleid,group,item,value)
{var val;val=0;if(value.checked)
{val=1;}
this.CheckArray[this.CheckArrayIndex]=new Image();this.CheckArray[this.CheckArrayIndex].src=this.urlbase+'IM.aspx?_OWS_='+_OWS_.Action+':U,'+_OWS_.CheckIndex+':'+this.CheckArrayIndex+','+_OWS_.CheckModuleID+':'+moduleid+','+_OWS_.CheckGroup+':'+group+','+_OWS_.CheckItem+':'+item+','+_OWS_.CheckValue+':'+val+','+_OWS_.CheckRemove+':1&'+this.items['o'+moduleid].request;this.CheckArrayIndex=this.CheckArrayIndex+1;}
this.onSet=function onSet(moduleid,name,value)
{var val;val=0;if(value.checked)
{val=1;}
this.CheckArray[this.CheckArrayIndex]=new Image();this.CheckArray[this.CheckArrayIndex].src=this.urlbase+'IM.aspx?_OWS_='+_OWS_.Action+':V,'+_OWS_.CheckIndex+':'+this.CheckArrayIndex+','+_OWS_.CheckModuleID+':'+moduleid+','+_OWS_.CheckValue+':'+val+','+_OWS_.Name+':'+sessionVariable+'&'+this.items['o'+moduleid].request;this.CheckArrayIndex=this.CheckArrayIndex+1;}
this.lxiRequests={};this.iframerequest=function iframerequest(options)
{this.createForm=function(doc,fstr,url)
{var frm=doc.createElement('FORM');frm.setAttribute('action',url);frm.setAttribute('method','post');frm.setAttribute('enctype','multipart/form-data');var items=new Array();items=fstr.split('&');for(i=0;i<items.length;i++)
{var pair=items[i].split('=');var name='';var value='';name=pair[0];if(pair.length==2)
{value=pair[1];}
var elem=doc.createElement('INPUT');elem.setAttribute('type','HIDDEN');elem.setAttribute('name',name);elem.setAttribute('value',value);frm.appendChild(elem);}
var elem=doc.createElement('INPUT');elem.setAttribute('type','HIDDEN');elem.setAttribute('name','lxiAJAXRESPONSE');elem.setAttribute('value','1');frm.appendChild(elem);doc.documentElement.appendChild(frm);return frm;};this.onLoad=function(){this.frame=document.getElementById('lxi_'+this.uniqueId);try{var data=this.frame.contentDocument.document.body.innerHTML;this.frame.contentDocument.document.close();}
catch(e){try{var data=this.frame.contentWindow.document.body.innerHTML;this.frame.contentWindow.document.close();}
catch(e){try{var data=this.frame.document.body.innerHTML;this.frame.document.body.close();}
catch(e){try{var data=window.frames['lxi_'+this.uniqueId].document.body.innerText;}
catch(e){}}}}
if(this.onEndResponse)eval(this.onEndResponse+'(this.extendedId,this.parseContent(data),this.targetObjectId);');};this.padLeft=function(str,pad,count){while(str.length<count)str=pad+str;return str;};this.parseContent=function(src)
{if(src&&src.length>=20)
{var strRecordCount;var iOffset=0;var ltOffset=src.indexOf('<');strRecordCount=src.substring(0,ltOffset);if(!isNaN(strRecordCount))
{iOffset=ltOffset;}
if(src.substring(iOffset,16+iOffset).toUpperCase()=='<AJAX><NOSCRIPT>')
{if(iOffset>0){return this.padLeft(strRecordCount,' ',20)+src.substring(16+iOffset,src.length-18);}}
else{return src;}}}
this.createFrame=function()
{var divElm=document.createElement('DIV');divElm.style.position="absolute";divElm.style.top="0";divElm.style.marginLeft="-10000px";divElm.style.display="";if(navigator.userAgent.indexOf('MSIE')>0&&navigator.userAgent.indexOf('Opera')==-1){divElm.innerHTML='<iframe  name=\"lxi_'+this.uniqueId+'\" id=\"lxi_'+this.uniqueId+'\" src=\"about:blank\" onload=\"setTimeout(function(){document.lxiRequests['+this.uniqueId+'].onLoad()},20);"></iframe>';}else{var frame=document.createElement("iframe");frame.setAttribute("name","lxi_"+this.uniqueId);frame.setAttribute("id","lxi_"+this.uniqueId);eval('frame.onload = function() {document.ows.lxiRequests['+this.uniqueId+'].onLoad()};');divElm.appendChild(frame);}
document.documentElement.appendChild(divElm);return divElm;}
if(!options)options={};this.form=this.createForm(document,options.formdata,options.url);this.uniqueId=new Date().getTime();document.lxiRequests[this.uniqueId]=this;this.frame=this.createFrame();this.onEndResponse=options.onEndResponse||null;this.extendedId=options.extendedId||null;this.targetObjectId=options.targetObjectId||null;this.form.target='lxi_'+this.uniqueId;this.form.setAttribute("target",'lxi_'+this.uniqueId);this.form.submit();}
this.override=false;this.lxFetch=false;this.lxSort=false;this._lxFetch=false;this._lxSort=false;this._lxModule=false;this.lxModule=false;this.lxOverride=function lxOverride()
{if(!this.override&&!typeof lxFetch=='function'&&document.readyState!='complete')
{window.setTimeout('ows.lxOverride();',this.SPINWAIT)}
else if(!this.override)
{this.override=true;if(typeof window['lxFetch']=='function')
{eval('ows._lxFetch = '+window['lxFetch'].toString());eval('ows._lxSort = '+window['lxSort'].toString());eval('ows._lxModule = '+window['lxModule'].toString());}
else
{ows._lxFetch=ows.Fetch;ows._lxSort=ows.Sort;ows._lxModule=ows.Module;}
ows.fetch=ows.Fetch;ows.lxFetch=ows.Fetch;ows.lxSort=ows.Sort;ows.lxModule=ows.Module;window['lxFetch']=function lxFetch(TM,page,appendQuery,targetobjectid)
{if(typeof ows.items['o'+TM]=='undefined')
ows._lxFetch(TM,page,appendQuery,targetobjectid);else
ows.Fetch(TM,page,appendQuery,targetobjectid);};window['lxSort']=function lxSort(TM,page,sortIndex)
{if(typeof ows.items['o'+TM]=='undefined')
ows._lxSort(TM,page,sortIndex);else
ows.Sort(TM,page,sortIndex);};window['lxModule']=function lxModule(TM,display)
{if(typeof ows.items['o'+TM]=='undefined')
ows._lxModule(TM,display);else
ows.Module(TM,display);};}}}
var ows=new OWS();}
var lxprintSource='';var lxprintCounter=0;var lxprintTimer;function lxprintContent(reportFile,reportPane,reportControl){lxwinPrint=window.open(reportFile,'mywin','left=20,top=20,width=700,height=700,toolbar=1,resizable=1,scrollbars=yes');lxprintSource=document.getElementById(reportPane).innerHTML;lxprintCounter=10;lxwaitForTarget(reportControl);}
function lxwaitForTarget(reportControl){lxprintCounter--;if(!lxwinPrint.document.getElementById(reportControl)){if(lxprintCounter>0){eval('lxprintTimer=setTimeout("lxwaitForTarget(\''+reportControl+'\')", 1000); ');}else{alert('Unable to load report. Please try again later.');}}else{lxdoneTarget(reportControl);}}
function lxdoneTarget(reportControl){lxwinPrint.document.getElementById(reportControl).innerHTML=lxprintSource;lxwinPrint.print();}
function lxToggle(ObjectId,trackingType,trackingName,trackOn,trackOff,visualObjectId,visualAttribute,visualOn,visualOff){var state='none';var visual='';var tobj=null;var obj=false;obj=document.getElementById(ObjectId);if(obj){if(trackingType.toUpperCase()=='F'){try{var tobj=document.getElementById(trackingName);if(trackOn==tobj.value){state='none';tobj.value=trackOff;visual=visualOff;}else{state='block';tobj.value=trackOn;visual=visualOn;}}
catch(ex){}}else if(trackingType.toUpperCase()=='C'){try{var tobj=false;var cval='';tobj=lxGetCookie(trackingName);if(tobj){cval=tobj;}
if(trackOn==cval){state='none';lxSetCookie(trackingName,trackOff);visual=visualOff;}else{state='block';lxSetCookie(trackingName,trackOn);visual=visualOn;}}
catch(ex){}}else if(trackingType.toUpperCase()=='A'){try{var tobj=obj.getAttribute(trackingName);if(trackOn==tobj){state='none';obj.setAttribute(trackingName,trackOff);visual=visualOff;}else{state='block';obj.setAttribute(trackingName,trackOn);visual=visualOn;}}
catch(ex){}}else{if(obj.style.display.toUpperCase()=='BLOCK'){state='none';visual=visualOff;}else{state='block';visual=visualOn;}}
obj.style.display=state;var visObject=false;visObject=document.getElementById(visualObjectId);if(visObject){if(visualAttribute.toUpperCase()=='SCRIPT')
eval(visual);else{eval('visObject.'+visualAttribute+'=visual;');}}}}
function lxExpander(srcText,parentId,tagType,attributeName,autoHide,showAll,showChild){var parentObj=document.getElementById(parentId);if(parentObj){var childTags=parentObj.getElementsByTagName(tagType);var targetTag=false;for(var i=0;i<childTags.length&&targetTag==false;i++){if(childTags[i].getAttribute(attributeName)&&childTags[i].getAttribute(attributeName)==srcText){targetTag=childTags[i];}}
var defaultblock='none';if(!targetTag){defaultblock='none';}else{defaultblock=targetTag.style.display;}
for(var i=0;i<childTags.length;i++){if(childTags[i].getAttribute(attributeName)){var isExpander=(childTags[i].getAttribute(attributeName)==srcText);var isChildExpanded=false;if(showChild==true&&childTags[i].getAttribute(attributeName).indexOf(srcText)==0){isChildExpanded=true;}
if(isExpander==true||showAll==true){var blocktype=defaultblock;if(isExpander==false&&autoHide==true){blocktype='none';}
if(childTags[i].style.display==blocktype){if(blocktype=='none'){blocktype='block';}else{blocktype='none';}}
if(isExpander==true){if(defaultblock=='none'){blocktype='block';}else{blocktype='none';}}
childTags[i].style.display=blocktype;}else{if(autoHide==true){childTags[i].style.display='none';}}}}}}
function lxSetValue(objectName,Value,checkValue){var obj=document.getElementById(objectName);if(Value!=checkValue&&obj){obj.value=Value;}}
var lxSet_=new Array();var lxSet_i=0;function lxSet(src,ModuleID,Name,Value){lxSet_[lxSet_i]=new Image();lxSet_[lxSet_i].src=src+'/DesktopModules/ListX/xListing.IM.aspx?'+eval('S'+ModuleID)+'&IX='+lxSet_i+'&M='+ModuleID+'&V='+Value+'&N='+Name;lxSet_i++;}
function lxComboSelect(objectName,currentValue){var objDrop=document.getElementById(objectName);for(i=0;i<objDrop.options.length;i++){if(objDrop.options[i].value==currentValue)
objDrop.options[i].selected=true;else
objDrop.options[i].selected=false;}}
function lx_ie_getElementsByTagName(parentObj,str){if(str=="*")
return parentObj.all
else
return parentObj.all.tags(str)}
function lxSmartJoiner(parentObjID,childTagName,valueFunction){childTagName=childTagName.toUpperCase();if(valueFunction==null)
valueFunction=lxGetElementValue;var eltParent=document.getElementById(parentObjID);var eltsChildren;var sJoin='';var sHead='';var sValue;var eltChild;var arrItems=new Array();if(document.all)
eltsChildren=lx_ie_getElementsByTagName(eltParent,childTagName);else
eltsChildren=eltParent.getElementsByTagName(childTagName);if((eltsChildren!="undefined")&&(eltsChildren!=null)){for(var iChild=0;iChild<eltsChildren.length;iChild++){eltChild=eltsChildren[iChild];sValue=valueFunction(eltChild);if(sValue!=null){arrItems[arrItems.length]=sValue;}}}
return(lxSmartJoinArray(arrItems));}
function lxSmartJoinArray(values){var sValue;var sHead='';var sJoin='';if(values.length>0){for(var iValue=0;iValue<values.length;iValue++){sValue=values[iValue];if(sValue!=null){sHead+=sValue.length+';';sJoin+=sValue;}else{sHead+='0;';}}}else{sHead='0;';}
sHead=sHead.length+':'+sHead;return(sHead+sJoin);}
function lxSmartSplitter(sJoinedText){var iPos;var sItems=new Array();if((sJoinedText!=null)&&(sJoinedText.length>0)){iPos=sJoinedText.indexOf(':');if(iPos>0){var sHeadLen=sJoinedText.substring(0,iPos);var iHeadLen=parseInt(sHeadLen);if(iHeadLen==sHeadLen){if(sJoinedText.length>(iHeadLen+iPos)){var sHeader=sJoinedText.substring((iPos+1),(iPos+1+iHeadLen)).split(';');if((sHeader!=null)&&(sHeader.length>0)){iPos=(iPos+iHeadLen+1);for(var iChunk=0;iChunk<sHeader.length;iChunk++){var str=sHeader[iChunk];var iLen=parseInt(str);if(sJoinedText.length>=(iPos+iLen)){if(iLen>0){sItems[sItems.length]=sJoinedText.substring(iPos,(iPos+iLen));iPos+=iLen;}else{sItems[sItems.length]='';}}}}}}}}
return(sItems);}
function lxGetElementValue(elementObj){if((elementObj.getAttribute('type')!="undefined")&&(elementObj.getAttribute('type')!=null)){if(elementObj.getAttribute('type')=="checkbox")
return(elementObj.checked.toString());else
return(elementObj.value);}else if((elementObj.getAttribute('value')!="undefined")&&(elementObj.getAttribute('value')!=null))
return(elementObj.getAttribute('value'));else
return(elementObj.innerHTML);}
function lxEncodeURI(value){return encodeURIComponent(value);}
function lxDecodeURI(value){return decodeURIComponent(value);}
String.prototype.endsWith=function(svalue){if(this.length>svalue.length)
return(this.substr(this.length-svalue.length,svalue.length)==svalue);return false;}
function lxgetCookieVal(offset){var endstr=document.cookie.indexOf(";",offset);if(endstr==-1)
endstr=document.cookie.length;return unescape(document.cookie.substring(offset,endstr));}
function lxGetCookie(name){var arg=name+"=";var alen=arg.length;var clen=document.cookie.length;var cookiei=0;while(cookiei<clen){var j=cookiei+alen;if(document.cookie.substring(cookiei,j)==arg)
return lxgetCookieVal(j);cookiei=document.cookie.indexOf(" ",cookiei)+1;if(cookiei==0)break;}
return null;}
function lxSetCookie(name,value){var argv=lxSetCookie.arguments;var argc=lxSetCookie.arguments.length;var expires=(argc>2)?argv[2]:null;var path=(argc>3)?argv[3]:null;var domain=(argc>4)?argv[4]:null;var secure=(argc>5)?argv[5]:false;document.cookie=name+"="+escape(value)+((expires==null)?"":("; expires="+expires.toGMTString()))+((path==null)?"":("; path="+path))+((domain==null)?"":("; domain="+domain))+((secure==true)?"; secure":"");}
function lxDeleteCookie(){var exp=new Date();exp.setTime(exp.getTime()-1000000000);var cval=lxGetCookie('DemoName');document.cookie='DemoName'+"="+cval+"; expires="+exp.toGMTString();}
function lxsetSelectionRange(input,selectionStart,selectionEnd){if(input.setSelectionRange){input.focus();input.setSelectionRange(selectionStart,selectionEnd);}else if(input.createTextRange){var range=input.createTextRange();range.collapse(true);range.moveEnd('character',selectionEnd);range.moveStart('character',selectionStart);range.select();}}
function lxreplaceValue(replaceValue,input){var result=input;if(replaceValue==true){var re=new RegExp("\\\\+","g");var s='';var lindex=0;var m=re.exec(result);while(m!=null){if(m.index>lindex){s=s+result.substring(lindex,m.index);}
s=s+result.substring(m.index,m.index+m.length);lindex=m.index+m.length;m=re.exec(result);}
if(lindex<result.length){s=s+result.substring(lindex);}
result=s;re=new RegExp("[\"]","g");result=result.replace(re,"\\\"");re=new RegExp("[\[]","g");result=result.replace(re,"\\[");re=new RegExp("[\]]","g");result=result.replace(re,"\\]");re=new RegExp("[\{]","g");result=result.replace(re,'\\{');re=new RegExp("[\}]","g");result=result.replace(re,'\\}');}else{var re=new RegExp("\\\\+","g");var s='';var lindex=0;var m=re.exec(result);while(m!=null){if(m.index>lindex){s=s+result.substring(lindex,m.index);}
s=s+result.substring(m.index,m.index+m.length-1);lindex=m.index+m.length;m=re.exec(result);}
if(lindex<result.length){s=s+result.substring(lindex);}
result=s;}
return result;}
function lxreplaceSelection(input,replaceString,replaceValue){if(input.setSelectionRange){var selectionStart=input.selectionStart;var selectionEnd=input.selectionEnd;var scrollTop=input.scrollTop;if(replaceValue!=undefined&&selectionEnd>selectionStart){var result=input.value.substring(selectionStart,selectionEnd);replaceString=lxreplaceValue(replaceValue,result);}
input.value=input.value.substring(0,selectionStart)+replaceString+input.value.substring(selectionEnd);input.scrollTop=scrollTop;if(selectionStart!=selectionEnd){lxsetSelectionRange(input,selectionStart,selectionStart+replaceString.length);}else{lxsetSelectionRange(input,selectionStart+replaceString.length,selectionStart+replaceString.length);}}else if(document.selection){var range=document.selection.createRange();if(range.parentElement()==input){if(replaceValue!=undefined){var result=range.text;replaceString=lxreplaceValue(replaceValue,result);}
var isCollapsed=range.text=='';range.text=replaceString;if(!isCollapsed){range.moveStart('character',-replaceString.length);range.select();}}}}
function lxsetTab(item){var cookiei=0;if(lxGetCookie(item.name)!=null)
cookiei=parseInt(lxGetCookie(item.name).replace('px',''));var itemi=parseInt(item.style.height.replace('px',''));if(itemi<iMinHeight||cookiei<iMinHeight){itemi=iMinHeight;lxtxtUp(item);}else{item.style.height=lxGetCookie(item.name);}}
var iMinHeight=50;var iHitHeight=50;var iMinWidth=50;var iHitWidth=50;function lxtxtRt(item){var itemi=parseInt(item.style.width.replace('px',''));if(itemi>=iMinWidth){item.style.width=(itemi+iHitWidth)+'px';}else{item.style.width=iMinWidth+'px';}
lxSetCookie(item.name+'w',item.style.width);return false;}
function lxtxtLt(item){var itemi=parseInt(item.style.width.replace('px',''));if(itemi>iMinWidth){item.style.width=(itemi-iHitWidth)+'px';}else{item.style.width=iMinWidth+'px';}
lxSetCookie(item.name+'w',item.style.width);return false;}
function lxtxtUp(item){var itemi=parseInt(item.style.height.replace('px',''));if(itemi>=iMinHeight){item.style.height=(itemi+iHitHeight)+'px';}else{item.style.height=iMinHeight+'px';}
lxSetCookie(item.name,item.style.height);return false;}
function lxtxtDn(item){var itemi=parseInt(item.style.height.replace('px',''));if(itemi>iMinHeight){item.style.height=(itemi-iHitHeight)+'px';}else{item.style.height=iMinHeight+'px';}
lxSetCookie(item.name,item.style.height);return false;}
function lxtxtTb(item){lxreplaceSelection(item,String.fromCharCode(9));return false;}
function lxtxtEscape(item){lxreplaceSelection(item,'',true);return false;}
function lxtxtUnescape(item){lxreplaceSelection(item,'',false);return false;}
function lxcatchTab(item,e){if(!e)
e=window.event;c=e.which?e.which:e.keyCode;if(c==9){return lxtxtTb(item);}else if(c==40&&e.ctrlKey){return lxtxtUp(item);}else if(c==38&&e.ctrlKey){return lxtxtDn(item);}else if(c==39&&e.ctrlKey&&e.altKey){return lxtxtRt(item);}else if(c==37&&e.ctrlKey&&e.altKey){return lxtxtLt(item);}else if(c==69&&e.ctrlKey){return lxtxtEscape(item);}else if(c==82&&e.ctrlKey){return lxtxtUnescape(item);}}
var xUtilities=document.createElement('span');xUtilities.msgCtrlDown='Press the key combination: [Control+DownArrow] within the text editor to increase the height of the text content area. ';xUtilities.msgCtrlUp='Press the key combination: [Control+UpArrow] within the text editor to decrease the height of the text content area. ';xUtilities.msgCtrlRight='Press the key combination: [Alt+Control+RightArrow] within the text editor to increase the width of the text content area. ';xUtilities.msgCtrlLeft='Press the key combination: [Alt+Control+LeftArrow] within the text editor to decrease the width of the text content area. ';xUtilities.msgCtrlE='Press the key combination: [Control+E] to automatically escape (\\) the selected value within the text area. ';xUtilities.msgCtrlR='Press the key combination: [Control+R] to automatically remove escapes (\\) from the selected value within the text area. ';function lxInit_RichText(requireRichtext){items=document.getElementsByTagName('TEXTAREA');var override=false;for(i=0;i<items.length;i++){rtext=items[i].getAttribute('richtext');if(requireRichtext!=null&&requireRichtext!=true){rtext=true;override=true;}
if(items[i].getAttribute('isLoaded'))
rtext=false;if(rtext){items[i].setAttribute('isLoaded','true');lxsetTab(items[i]);items[i].onkeydown=function(event){return lxcatchTab(this,event)};var dv=document.createElement('div');dv.style.border='1px solid #cccccc'
dv.style.background='#eeeeee';dv.style.width='100%';dv.style.fontFamily='arial';dv.style.fontSize='9px';dv.style.fontWeight='normal';dv.style.textAlign='center';dv.style.padding='2px';var btnstyle='onmouseover=this.style.background=\'#ffffff\' onmouseout=this.style.background=\'#cccccc\' style=\'margin-right:2px; border: 1px solid #bbbbbb; background: #cccccc;cursor: pointer;\'';dv.innerHTML="";dv.innerHTML+="<a "+btnstyle+" title='Increase the height of this editor.' onclick=\"alert(xUtilities.msgCtrlDown);\">Height [+]</a>";dv.innerHTML+="<a "+btnstyle+" title='Decrease the height of this editor.'onclick=\"alert(xUtilities.msgCtrlUp);\">Height [-]</a>";dv.innerHTML+="<a "+btnstyle+" title='Increase the width of this editor.' onclick=\"alert(xUtilities.msgCtrlRight);\">Width [+]</a>";dv.innerHTML+="<a "+btnstyle+" title='Decrease the width of this editor.'onclick=\"alert(xUtilities.msgCtrlLeft);\">Width [-]</a>";dv.innerHTML+="<a "+btnstyle+" title='Escape (backslash) the selected text.'onclick=\"alert(xUtilities.msgCtrlE);\">Escape</a>";dv.innerHTML+="<a "+btnstyle+" title='Remove Escaping (backslash) from the selected text.'onclick=\"alert(xUtilities.msgCtrlR);\">Unescape</a>";dv.innerHTML+="";items[i].parentNode.appendChild(dv);}}}
function lxInit_Delete(TagType){var items=[];if(!TagType)
TagType='INPUT';items=document.getElementsByTagName(TagType);for(i=0;i<items.length;i++){if(items[i].src!=null&&items[i].src.length>0){if(items[i].src.endsWith('delete.gif')&&typeof(items[i].lxDL)=='undefined'){items[i].lxDL=true;items[i].onclick=function(){return confirm('Are you certain you want to delete this item?');};}}}}
function lxContainerGroup(group,skipCookies){if(!document.forms[0].__VIEWSTATE){if(!skipCookies)
window.setTimeout('lxContainerGroup(\''+group+'\');',200);else
window.setTimeout('lxContainerGroup(\''+group+'\',true);',200);}else{var cki=false;var name=false;if(!skipCookies){cki=lxGetCookie('lxCon_'+group);}
if(cki){name=cki;}else{var containers=document.getElementsByTagName('lxContainer');for(var i=0;i<containers.length;i++){if(containers[i].getAttribute('Group')){if(containers[i].getAttribute('Group')==group){name=containers[i].getAttribute('Name');i=containers.length;}}}}
if(name){lxContainer(name);}}}
function lxSetClass(name,classname){if(name!=null&&name.length>0){var objs=document.getElementsByName(name);if(objs.length==0){var obj=false;obj=document.getElementById(name);if(obj){objs=new Array();objs[0]=obj;}}
for(var i=0;i<objs.length;i++){objs[i].className=classname;}}}
function lxContainer(name){var containers=document.getElementsByTagName('lxContainer');var srccontainer=false;for(var i=0;i<containers.length;i++){if(containers[i].getAttribute('Name')){if(containers[i].getAttribute('Name')==name){srccontainer=containers[i];i=containers.length;}}}
if(srccontainer){var srcGroup='';if(srccontainer.getAttribute('Group')){srcGroup=srccontainer.getAttribute('Group');}
for(var i=0;i<containers.length;i++){lxmoduleid=0;lxmoduleid=containers[i].getAttribute('ModuleId');if(lxmoduleid>0&&containers[i].getAttribute('Group')){if(containers[i].getAttribute('Group')==srcGroup){var markername=containers[i].getAttribute('Marker');var activemarker=containers[i].getAttribute('ActiveCss');var inactivemarker=containers[i].getAttribute('InactiveCss');var onInit=containers[i].getAttribute('onInit');var onLoad=containers[i].getAttribute('onLoad');var onUnload=containers[i].getAttribute('onUnload');if(containers[i].getAttribute('Name')!=name){if(containers[i].getAttribute('Loaded')&&onUnload)
eval(onUnload);lxModule(lxmoduleid,false);lxSetClass(markername,inactivemarker);}
else{if(!containers[i].getAttribute('Loaded')){containers[i].setAttribute('Loaded','true');if(onInit){eval(onInit);}}
else if(onLoad){eval(onLoad);}
cki=lxSetCookie('lxCon_'+srcGroup,name);lxModule(lxmoduleid,true);lxSetClass(markername,activemarker);}}}}}}