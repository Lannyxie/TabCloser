$(document).ready(() => {
  $("#checkBoxes").empty(".a_row");
  $("#theButton").click(closeTabs);
  this.displayTabsOpen();
});

var pace = 3000;

function displayTabsOpen() {
    chrome.tabs.query({},(tabs) => {
       tabs.forEach(function(tab) {
         $("#checkBoxes").append("<input type=\"checkbox\" class=\"tabRow\""+
         "name=\"url\" value=\"" + tab.id + "\">" +
         tab.url + "<br>");
       }
     );
    });
}


function closeTabs() {

  var updatingInterval = setInterval(
  $(".tabRow:checked").each(function() {
      chrome.tabs.remove(parseInt($(this).val()));
  }), pace);
  clearInterval(updatingInterval);

}
