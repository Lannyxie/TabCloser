var checkTime = 10000;
var tabsToCheck = [];

chrome.runtime.onConnect.addListener(function(port) {
  console.log('port connected: ' + port);
  if (port.name == 'popup') {
    port.onMessage.addListener(function(msg) {
        console.log('background received msg' + msg);
      if (msg.request == 'data') {
        console.log('background was requested for data');
        tabsToCheck.forEach(function(tab) {console.log(tab)});
        port.postMessage({replyType:'checkedMore', data:tabsToCheck});
      }
      else if (msg.request == 'uncheck') {
        uncheckBox(msg.tabId);
        console.log('unchecking msg sent');
      }
    });
  }

});


chrome.tabs.onActivated.addListener(function(activeInfo) {
  uncheckBox(activeInfo.tabId);
  timeoutID(activeInfo.tabId);
});



function uncheckBox(tabId) {
  clearTimeout(idToTimeout[tabId]);
  let loc = -1;
  let idx = 0;
  tabsToCheck.forEach(function(tab) {
    if (tab == tabId) {
        loc = idx;
    }
    idx++;
  });
  if (loc >= 0)  {
    tabsToCheck.splice(loc, 1);
    console.log('unchecking the tab ' + tabId + ' , located at ' + loc);
  }

}


(function() {
    chrome.tabs.query({},(tabs) => {
       tabs.forEach(setTabTimeout);
    });
})();


var idToTimeout = {};
var setTabTimeout = function(tab) {
  console.log('tab id ' + tab.id + ' will be timed out');
  timeoutID(tab.id);
};

function timeoutID(id) {
  var timeout = setTimeout(() => tabsToCheck.push(id), checkTime);
  idToTimeout[id] = timeout;
}
