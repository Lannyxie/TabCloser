$(document).ready(function() {
  chrome.tabs.query({},function(tabs){
     tabs.forEach(function(tab){

       $("#listOfTabs").append("<li>" + tab.url + "</li>");
     });
  });

});
