(window => {

  // Simple access to query parameters.
  const getParameterByName = (name, url) => { // eslint-disable-line no-unused-vars
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // Simple list comparison.
  const compareLists = (previousList, newList) => {
    let added = []
    let removed = []
    added = newList.filter(item => {
      return previousList.indexOf(item) === -1
    })
    previousList.forEach(item => {
      if (newList.indexOf(item) === -1) {
        removed.push(item)
      }
    })
    return { added, removed }
  }

  window.getParamByName = getParameterByName
  window.compareLists = compareLists
})(window)
