function google_ad_request_done(google_ads){var s='';var i;if(google_ads.length==0)
{return;}
if(google_ads[0].type!="image"){for(i=0;i<google_ads.length;++i) {
s+="";s+='<a href="'+google_ads[i].url+'" target="_blank" rel="nofollow" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to '+google_ads[i].visible_url+'\'" style="text-decoration:underline">';s+='<b>'+google_ads[i].line1+'</b>';s+='</a><br />';s+='<span style="color:#000000"><a href="'+google_ads[i].url+'" target="_blank" rel="nofollow" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to '+google_ads[i].visible_url+'\'" style="text-decoration:none">';s+=google_ads[i].line2+'&nbsp;'+google_ads[i].line3;s+='</a><br /></span>';s+='<a href="'+google_ads[i].url+'" target="_blank" rel="nofollow" style="color:#008000;text-decoration:none">'+google_ads[i].visible_url+'</a>';
if(i != (google_ads.length-1)) {
s+="<br /><br />";
}
}}
document.write(s);return;}
