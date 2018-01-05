var pace = 750;

$(document).ready(() => {
  $("#checkBoxes").empty(".a_row");
  $("#theButton").click(closeTabs);
  this.displayTabsOpen();

  var port = chrome.runtime.connect({name: "popup"});

  port.postMessage({request: "data"});
  port.onMessage.addListener(function(msg) {
    if (msg.replyType == 'checkedMore') {
      receivedMsg(msg.data);
    }
  });

});


function displayTabsOpen() {

            chrome.tabs.query({},(tabs) => {
               tabs.forEach(function(tab) {
                 $("#checkBoxes").append("<input type=\"checkbox\" class=\"tabRow\""+ "id=\"" + tab.id + "\" " +
                 "name=\"url\" value=\"" + tab.id + "\" onchange=\"manualCheck(this)\">" +
                 "<label for=\"" + tab.id + "\">" + "<img class=\"favIcons\" src=" + tab.favIconUrl + " >" + tab.title + "</label>" +"<br>");
               }
             );
            });


}

function manualCheck(box) {

}

function manuallyChecked(boxID) {
  return true;
}

function receivedMsg(tabsToCheck) {
  tabsToCheck.forEach(function(tab_id) {
    let selector = "input[type=checkbox][value=" + tab_id + "]";
    $(selector).prop("checked", true);
  });
}



function closeTabs() {

  let set = $(".tabRow:checked");
  let sz = set.length;
  set.each(function(idx, element) {
    var boxID = parseInt($(this).val());
    if (manuallyChecked(boxID)) {
      setTimeout(() => chrome.tabs.remove(boxID), pace * idx);
      if (sz - 1 <= idx) {
        setTimeout(() => {window.close();}, pace * idx + 1)
      }
    }
  });
  // close the popup window after finished closing tabs

//alert('Sucessfully closed ' + sz + ' tabs!');
}
