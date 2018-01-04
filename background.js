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
    });
  }

});


chrome.tabs.onActivated.addListener(function(activeInfo) {
  clearTimeout(idToTimeout[activeInfo.tabId]);
  var loc = tabsToCheck.indexOf(activeInfo.tabId);
  console.log('listening for changes to tab ' + activeInfo.tabId);
  console.log('located at ' + loc);
  if (loc >= 0)  {
    tabsToCheck.splice(loc, 1);
    console.log('unchecking the tab ' + activeInfo.tabId + ' , located at ' + loc);
  }
  timeoutID(activeInfo.tabId);
});

/*
chrome.tabs.onCreated.addListener(function(tab) {
  console.log('tab id ' + tab.id + ' will be timed out');
  setTimeout(() => tabsToCheck.push(tab.id), checkTime);
  tabsToCheck.push(tab.id);
});
*/

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
