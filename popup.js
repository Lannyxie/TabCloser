var pace = 750;

$(document).ready(() => {
  $("#checkBoxes").empty(".a_row");
  $("#CloseButton").click(closeTabs);


  var port = chrome.runtime.connect({name: "popup"});
this.displayTabsOpen(port);
  port.postMessage({request: "data"});
  port.onMessage.addListener(function(msg) {
    if (msg.replyType == 'checkedMore') {
      receivedMsg(msg.data);
    }
  });

});


function displayTabsOpen(port) {

/*
  $("#checkBoxes").append(
  "<label for=\"" + tab.id + "\">" +
  "<input type=\"checkbox\" class=\"tabRow\""+ "id=\"" + tab.id + "\" " +
  "name=\"url\" value=\"" + tab.id + "\">"
   + "<img class=\"favIcons\" src=" + tab.favIconUrl + " >" + tab.title + "</label>" +"<br>");
*/

            chrome.tabs.query({},(tabs) => {
               tabs.forEach(function(tab) {
                 let label = document.createElement("label");
                 label.setAttribute("for", tab.id);

                 let box = document.createElement("input");
                 box.setAttribute("type", "checkbox");
                 box.setAttribute("class", "tabRow");
                 box.setAttribute("id", tab.id);
                 box.setAttribute("name", "url");
                 box.setAttribute("value", tab.id);
                 box.addEventListener('click', function() {
                     console.log('clicked ' + box.checked);
                     if (!box.checked) {
                       port.postMessage({request: "uncheck", tabId:box.id});
                     }
                 });

                 let img = document.createElement("img");
                 img.setAttribute("class", "favIcons");
                 img.setAttribute("src", tab.favIconUrl);

                 let title = document.createTextNode(tab.title);

                 let nLine = document.createElement("br");

                label.appendChild(box);
                label.appendChild(img);
                label.appendChild(title);


                 $("#checkBoxes").append([label, nLine]);

               }
             );
            });


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

    let curr = $(this);
    var boxID = parseInt(curr.val());

      setTimeout(() => {chrome.tabs.remove(boxID); curr.parent().remove();}, pace * idx);
      if (sz - 1 <= idx) {
        setTimeout(() => alert('tabs closed'), pace * idx + 500);
      }

  });
  // close the popup window after finished closing tabs

//alert('Sucessfully closed ' + sz + ' tabs!');
}
