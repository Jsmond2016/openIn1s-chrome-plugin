console.log('content.js');

const keyWords = ["前端面试", "面试", "面经", "算法"]

chrome.storage.sync.get('mask', function (result) {
  if (result.mask) {
    maskKeyWords();
  }
});

function maskKeyWords() {
  // 此方法不可取，切断了 dom 和 事件关系
  // const bodyHtml = document.body.innerHTML;
  // console.log('bodyHtml: ', bodyHtml);
  // const htmlStr = keyWords.reduce((pre, cur) => pre.replaceAll(cur, "*".repeat((cur || "").length)), bodyHtml); 
  // document.body.innerHTML = htmlStr; 
  console.log('maskKeyWords');
  for (let value of keyWords) {
    const reg = new RegExp(`${value}`, 'g')
    replaceInText(document.body, reg, "*".repeat((value || "").length))
  }
}


//  Replace words in the body text 替换 dom 关键字，若使用 innerHTML 替换，则会影响 js 交互；
//  https://stackoverflow.com/a/50537862/14366000
//  备选方案：https://github.com/padolsey/findAndReplaceDOMText
function replaceInText(element, pattern, replacement) {
  console.log('excute');
  for (let node of element.childNodes) {
      switch (node.nodeType) {
          case Node.ELEMENT_NODE:
              replaceInText(node, pattern, replacement);
              break;
          case Node.TEXT_NODE:
              node.textContent = node.textContent.replace(pattern, replacement);
              console.log('node.textContent: ', node.textContent);
              break;
          case Node.DOCUMENT_NODE:
              replaceInText(node, pattern, replacement);
      }
  }
}
