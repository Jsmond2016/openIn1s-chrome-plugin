"use strict"

console.log('content.js');

const keyWords = ["前端面试", "面试", "面经", "算法", "跳槽"]
setMaskPage();

// 为啥没有监听到 路由变化？
registerHistoryListener();

function maskKeyWords() {
  for (let value of keyWords) {
    const reg = new RegExp(value, "g")
    replaceInText(document.body, reg, "*".repeat((value || "").length))
  }
}


//  Replace words in the body text 替换 dom 关键字，若使用 innerHTML 替换，则会影响 js 交互；
//  https://stackoverflow.com/a/50537862/14366000
//  备选方案：https://github.com/padolsey/findAndReplaceDOMText
function replaceInText(element, pattern, replacement) {
  for (let node of element.childNodes) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        replaceInText(node, pattern, replacement);
        break;
      case Node.TEXT_NODE:
        node.textContent = node.textContent.replace(pattern, replacement);
        break;
      case Node.DOCUMENT_NODE:
        replaceInText(node, pattern, replacement);
    }
  }
}

function setMaskPage() {
  chrome.storage.sync.get('mask', function (result) {
    if (result.mask) {
      console.log("mask-plugin-excute ");
      maskKeyWords();
    }
  });
}




function registerHistoryListener() {
  history.pushState = (f => function pushState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  })(history.pushState);
  
  history.replaceState = (f => function replaceState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  })(history.replaceState);
  
  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'))
  });
  window.addEventListener('locationchange', function () {
    console.log('locationchange: ');
    setMaskPage();
  })
}