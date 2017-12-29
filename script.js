
var rows = document.getElementById("listOfTabs");

    var result = chrome.windows.getAll({populate:true}, getAllOpenWindows);
    this.setState({tabs:result});

  getAllOpenWindows(winData) {
    var tabs = [];
    for (var i in winData) {
      if (winData[i].focused === true) {
        var winTabs = winData[i].tabs;
        var totTabs = winTabs.length;
        for (var j=0; j<totTabs;j++) {
          tabs.push(winTabs[j].url);
      }
  }
}
return tabs;
}

  render() {
  }
