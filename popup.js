$(document).ready(() => {
  $("#checkBoxes").empty(".a_row");
  $("#theButton").click(closeTabs);
  this.displayTabsOpen();
});

var pace = 750;

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
  let curr = 1;
  $(".tabRow:checked").each(function() {
      setTimeout(() => chrome.tabs.remove(parseInt($(this).val())), pace * curr);
      curr += 1;
  });


}
