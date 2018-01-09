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

chrome.alarms.onAlarm.addListener(function(alarm) {
  tabsToCheck.push(parseInt(alarm.name));
});


// if a tab is activated, uncheck the box, reset its timeout to the beginning
chrome.tabs.onActivated.addListener(function(activeInfo) {
  uncheckBox(activeInfo.tabId);
  timeoutID(activeInfo.tabId);
});

// if tab is manuallyunchecked by user, do not reset or reset timeout for the tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  if (manuallyUnchecked[tabId]) {
    return;
  }
  else if (changeInfo.audible) {
    uncheckBox(tab.id);

  }
  else if (changeInfo.url) {
    uncheckBox(tab.id);
    timeoutID(tab.id);
  }
})



function uncheckBox(tabId) {
  chrome.alarms.clear(tabId.toString());
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
  chrome.alarms.create(id.toString(), {when: Date.now() + checkTime});
}
