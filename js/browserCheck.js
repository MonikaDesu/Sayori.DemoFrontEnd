/* global navigator */
function get_browser() {
    var ua = navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/);
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }
 
 var acceptedVersions = [
      "Opera15",
       "Chrome62",
       "Chrome61",
       "Firefox57",
       "Firefox58",
       "Firefox59"
     ];
 
 $(document).ready(function () {
     if(get_browser().name + get_browser().version !== acceptedVersions) {
         $(".modal").modal();
     }
 })