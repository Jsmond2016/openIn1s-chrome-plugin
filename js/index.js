

const switchDomMap = {
  gitghub1s: 'switch-github1s',
  mask: 'switch-mask',
}


registerEventLisntener();
initConfig()



// -------分割线---------

function initConfig() {
  chrome.storage.sync.get(Object.keys(switchDomMap), function(result) {
    for (let k in result) {
      const $dom = document.getElementById(switchDomMap[k]);
      if (!$dom) return
      $dom.checked = result[k]
    }
  });
}


function registerEventLisntener() {
  for (let key in switchDomMap) {
    const $dom = document.getElementById(switchDomMap[key]);
    $dom.onchange = function(event) {
      chrome.storage.sync.set({ [key]: event.target.checked }, function() {
        console.log(key + 'changed');
      })
    }
  }
}


