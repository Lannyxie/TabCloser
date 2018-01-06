var checkTime = 10000;
var tabsToCheck = [];
var manuallyUnchecked = {};
chrome.runtime.onConnect.addListener(function(port) {
  if (port.name == 'popup') {
    port.onMessage.addListener(function(msg) {
      if (msg.request == 'data') {
        port.postMessage({replyType:'checkedMore', data:tabsToCheck});
      }
      else if (msg.request == 'uncheck') {
        uncheckBox(msg.tabId);
        manuallyUnchecked[msg.tabId] = true;
      }
    });
  }

});


chrome.tabs.onActivated.addListener(function(activeInfo) {
  uncheckBox(activeInfo.tabId);
  timeoutID(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  if (manuallyUnchecked[tabId]) {
    console.log('manually unchecked, continue');
    return;
  }
  else if (changeInfo.audible) {
    console.log('audio changed');
    uncheckBox(tab.id);

  }
  else if (changeInfo.url) {
    console.log('url changed');
    uncheckBox(tab.id);
    timeoutID(tab.id);
  }
})



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
  }

}


(function() {
    chrome.tabs.query({},(tabs) => {
       tabs.forEach(setTabTimeout);
    });
})();


var idToTimeout = {};
var setTabTimeout = function(tab) {
  timeoutID(tab.id);
};

function timeoutID(id) {
  var timeout = setTimeout(() => tabsToCheck.push(id), checkTime);
  idToTimeout[id] = timeout;
}
