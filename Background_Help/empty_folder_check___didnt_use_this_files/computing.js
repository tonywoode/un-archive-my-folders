
 sfHover = function() {
      if(document.getElementById("nav")) {
	var sfEls = document.getElementById("nav").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
     }
}
if (window.attachEvent) window.attachEvent("onload", sfHover); 

function hidebannerdrop(action) { 
if(document.getElementById('rightbanner')) {
   document.getElementById('rightbanner').style.visibility = action;
}
if (!(typeof document.body.style.maxHeight != "undefined")) {   
   document.getElementById('search_section').style.visibility = action;
}
var e=document.getElementsByTagName("iframe");
for(var i=0;i<e.length;i++){e[i].style.visibility = action;}
}

function GetCookie (name) { 
var arg = name + "="; 
var alen = arg.length;  
var clen = document.cookie.length; 
var i = 0;  
while (i < clen) { 
var j = i + alen;  
if (document.cookie.substring(i, j) == arg)  
return getCookieVal (j); 
i = document.cookie.indexOf(" ", i) + 1;    
if (i == 0) break;  
} 
return null;
}
function getCookieVal(offset) {
var endstr = document.cookie.indexOf (";", offset);
if (endstr == -1)
endstr = document.cookie.length;
return unescape(document.cookie.substring(offset, endstr));
}

function createXMLHttp() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      var aVersions = [ "MSXML2.XMLHttp.5.0",
        "MSXML2.XMLHttp.4.0","MSXML2.XMLHttp.3.0",
        "MSXML2.XMLHttp","Microsoft.XMLHttp"
      ];

      for (var i = 0; i < aVersions.length; i++) {
        try {
            var oXmlHttp = new ActiveXObject(aVersions[i]);
            return oXmlHttp;
        } catch (oError) {/*Do nothing*/}
      }
    }
    throw new Error("XMLHttp object could be created.");
}

//Populate an element with the response from a URL (must be within same domain - due to access restrictions)
function GetContent(elementId, url, append)
{
    var oXmlHttp = createXMLHttp(); //Create a XMLHttp object
    
    oXmlHttp.onreadystatechange = function () //do this when the status changes
    {
        if (oXmlHttp.readyState == 4) //response is complete
        {
            if (append==false) document.getElementById(elementId).innerHTML ="";
            if (oXmlHttp.status == 200) //response status is success
                document.getElementById(elementId).innerHTML +=oXmlHttp.responseText;
            else 
                document.getElementById(elementId).innerHTML += '<b>Error:</b>'+oXmlHttp.status+' ['+oXmlHttp.statusText+']<br /><b>Url:</b>'+url;
        }
    };
    
    oXmlHttp.open("GET", url, true); // open(HTTP_REQUEST_TYPE, URL, ASYNC_REQUEST)
    oXmlHttp.send(null);    
}


var tooltip=function(){
	var id = 'tt';
	var top = 3;
	var left = 3;
	var maxw = 400;
	var speed = 10;
	var timer = 20;
	var endalpha = 95;
	var alpha = 0;
	var tt,t,c,b,h;
	var ie = document.all ? true : false;
	return{
		show:function(v,w){
			if(tt == null){
				tt = document.createElement('div');
				tt.setAttribute('id',id);
				t = document.createElement('div');
				t.setAttribute('id',id + 'top');
				c = document.createElement('div');
				c.setAttribute('id',id + 'cont');
				b = document.createElement('div');
				b.setAttribute('id',id + 'bot');
				tt.appendChild(t);
				tt.appendChild(c);
				tt.appendChild(b);
				document.body.appendChild(tt);
				tt.style.opacity = 0;
				tt.style.filter = 'alpha(opacity=0)';
				document.onmousemove = this.pos;
			}
			tt.style.display = 'block';
			c.innerHTML = v;
			tt.style.width = w ? w + 'px' : 'auto';
			if(!w && ie){
				t.style.display = 'none';
				b.style.display = 'none';
				tt.style.width = tt.offsetWidth;
				t.style.display = 'block';
				b.style.display = 'block';
			}
			if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
			h = parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(1)},timer);
			clearInterval(tt.close_timer);
			tt.close_timer = setInterval(function(){tooltip.hide()},3000);
		},
		pos:function(e){
			var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			tt.style.top = (u - h) + 'px';
			tt.style.left = (l + left) + 'px';
		},
		fade:function(d){
			var a = alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i = speed;
				if(endalpha - a < speed && d == 1){
					i = endalpha - a;
				}else if(alpha < speed && d == -1){
					i = a;
				}
				alpha = a + (i * d);
				tt.style.opacity = alpha * .01;
				tt.style.filter = 'alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tt.timer);
				if(d == -1){tt.style.display = 'none'}
			}
		},
		hide:function(){
			clearInterval(tt.timer);
			clearInterval(tt.close_timer);
			tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
		}
	};
}();

BOMshowMore = function(){
	var oElt = document.getElementById('RT-list');
		var aItems = oElt.getElementsByTagName('LI');	
			for (var i = aItems.length - 1; i >= 0; i--){
				aItems[i].className = '';
	}
	var oElt = document.getElementById('RT-list2');
		var aItems = oElt.getElementsByTagName('LI');	
			for (var i = aItems.length - 1; i >= 0; i--){
                                aItems[i].className = '';
	}
}

function BOMgo(sUrl, newWin){
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var chr1,
    chr2,
    chr3,
    enc1,
    enc2,
    enc3,
    enc4;
    var output = "";
    var i = 0;
    sUrl = sUrl.replace(/-/g, "+").replace(/_/g, "=").replace(/\./g, "/");
    if (sUrl.match("/[^A-Za-z0-9+\\/=]/")) {
        return "";
    }
    do {
        enc1 = keyStr.indexOf(sUrl.charAt(i++));
        enc2 = keyStr.indexOf(sUrl.charAt(i++));
        enc3 = keyStr.indexOf(sUrl.charAt(i++));
        enc4 = keyStr.indexOf(sUrl.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output += String.fromCharCode(chr1);
        if (enc3 != 64) {
            output += String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output += String.fromCharCode(chr3);
        }
        chr1 = chr2 = chr3 = enc1 = enc2 = enc3 = enc4 = "";
    }
    while (i < sUrl.length);
	output = output.replace(/&amp;/gi,"&");
	if(newWin)
	  window.open(output);
	 else
	   window.location.href = output;
}
