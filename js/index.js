console.log('hello')

const { pathname, hostname } = window.location
jump()

// document.onload = function () {
//   if (document.readyState == "interactive") {
//     return false;
//   };
//   jump()
// }

// document.onreadystatechange = function () {
//   if(document.readyState == "interactive" ){
//       return false;
//   };
//   jump()
// }




function jump() {

  if (isGithubRepository() || isGithub1sCode()) {
    console.log("开始初始化==========")
    const btn = createButton()
    const button = setText(btn)
    const newBtn = addClick(button)
    appendToBody(newBtn)
  }
}


function createButton() {
  const button = document.createElement("button")
  button.textContent = isGithubRepository() ? "跳至github1s" : "跳至github仓库"
  console.log("按钮创建成功")
  return button
}

function setText(node) {
  if (!node) return node
  const style = `width: 111px;
  height: 28px;
  vertical-align: top;
  position: fixed;
  top: 125px;
  right: 24px;
  color: black;
  border: 2px solid blue;
  border-radius: 6px 6px;
  background: white;
  z-index: 999;`
  node.style = style
  console.log("样式添加成功")
  return node
}

function addClick(node) {
  if (!(typeof node === "object" && node instanceof HTMLElement)) return node

  const clickFn = () => {
    let url = ""
    const _1surl = "https://www.github1s.com"
    const githubUrl = "https://www.github.com"

    if (isGithubRepository()) {
      url = `${_1surl}${pathname}`
    }
    if (isGithub1sCode()) {
      url = `${githubUrl}${pathname}`
    }

    const tempWindow = window.open("_blank")
    tempWindow.location.href = url

  }
  node.onclick = clickFn
  console.log("事件添加成功")
  return node
}

function isGithub1sCode() {
  return (hostname === "github1s.com" && pathname.lastIndexOf("/") > 0)
}

function isGithubRepository() {
  return (hostname === "github.com" && pathname.lastIndexOf("/") > 0)
}

function appendToBody(node) {
  document.body.appendChild(node)
  console.log("按钮创建成功")
}
