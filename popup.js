$(document).ready(() => { /*
  chrome.tabs.query({},(tabs) => {
     tabs.forEach((tab) => {
       $("#listOfTabs").append("<li>" + tab.url + "</li>");
     });
  }); */


  $("#checkBoxes").empty(".a_row");
  $("#theButton").click(closeTabs);
  this.displayTabsOpen();




});

var currTabs = [];

function displayTabsOpen() {
    chrome.tabs.query({},(tabs) => {
       tabs.forEach(function(tab) {
         $("#checkBoxes").append("<input type=\"checkbox\" name=\"url\" value=\"" + tab.id + "\">" +
         tab.url + "<br>");
         currTabs.push(tab.id);
       }
     );
    });
}


function closeTabs() {
  chrome.tabs.remove(currTabs[0]);
}
