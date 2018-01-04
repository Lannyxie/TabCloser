var checkTime = 10000;
var tabsToCheck = [];

chrome.runtime.onConnect.addListener(function(port) {
  console.log('port connected: ' + port);
  if (port.name == 'popup') {
    port.onMessage.addListener(function(msg) {
        console.log('background received msg' + msg);
      if (msg.request == 'data') {
        console.log('background was requested for data');
        tabsToCheck.forEach(function(tab) {console.log(tab.id)});
        port.postMessage({replyType:'checkedMore', data:tabsToCheck});
      }
    });
  }

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



var setTabTimeout = function(tab) {
  console.log('tab id ' + tab.id + ' will be timed out');
  setTimeout(() => tabsToCheck.push(tab.id), checkTime);
};
