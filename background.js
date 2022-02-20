// const switchDomMap = {
//   gitghub1s: 'switch-github1s',
//   mask: 'switch-mask',
// }

// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     const $dom = document.getElementById(switchDomMap[key]);
//     // alert(newValue.toString())
//     $dom && ($dom.checked = newValue);
//   }
// });