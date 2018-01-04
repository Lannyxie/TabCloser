var pace = 750;

$(document).ready(() => {
  $("#checkBoxes").empty(".a_row");
  $("#theButton").click(closeTabs);
  this.displayTabsOpen();

  var port = chrome.runtime.connect({name: "popup"});

  port.postMessage({request: "data"});
  port.onMessage.addListener(function(msg) {
    console.log('received msg on popup');
    if (msg.replyType == 'checkedMore') {
      console.log('received tabs to close on popup');
      receivedMsg(msg.data);
    }
  });

});


function displayTabsOpen() {

            chrome.tabs.query({},(tabs) => {
               tabs.forEach(function(tab) {
                 $("#checkBoxes").append("<input type=\"checkbox\" class=\"tabRow\""+
                 "name=\"url\" value=\"" + tab.id + "\">" + "<img src=" + tab.favIconUrl + " >" +
                 tab.title + "<br>");
               }
             );
            });


}

function receivedMsg(tabsToCheck) {
  tabsToCheck.forEach(function(tab_id) {
    console.log("recieved tab " + tab_id);
    let selector = "input[type=checkbox][value=" + tab_id + "]";
    $(selector).prop("checked", true);
  });
}



function closeTabs() {
  let curr = 1;
  $(".tabRow:checked").each(function() {
      setTimeout(() => chrome.tabs.remove(parseInt($(this).val())), pace * curr);
      curr += 1;
  });


}
