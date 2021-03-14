const { pathname, hostname } = window.location
const isGithub1sCode = hostname === "github1s.com" && pathname.lastIndexOf("/") > 0
const isGithubRepository = hostname === "github.com" && pathname.lastIndexOf("/") > 0


jump()


// 具体实现
function jump() {

  if (isGithubRepository || isGithub1sCode) {
    const btn = createButton()
    const button = setText(btn)
    const newBtn = addClick(button)
    appendToBody(newBtn)
  }
}


function createButton() {
  const button = document.createElement("button")
  button.textContent = isGithubRepository ? "跳至github1s" : "跳至github仓库"
  return button
}

function setText(node) {
  if (!node) return node
  const styleColor = isGithubRepository ? "black" : "white"
  const style = `width: 111px;
  height: 28px;
  vertical-align: top;
  position: fixed;
  top: 125px;
  right: -80px;
  color: ${styleColor};
  border: 2px solid gray;
  border-radius: 6px 6px;
  background: inherit;
  z-index: 999;
  cursor: pointer;
  transition-property: right;
  transition-duration: 1s;
  transition-timing-function: ease;
  `
  node.style = style
  node.onmouseover = function() {
    node.style.right = `2px`
  }
  node.onmouseout = function () {
    node.style.right = "-84px"
   }
  return node
}

function addClick(node) {
  if (!(typeof node === "object" && node instanceof HTMLElement)) return node

  const clickFn = () => {
    let url = ""
    const _1surl = "https://www.github1s.com"
    const githubUrl = "https://www.github.com"

    if (isGithubRepository) {
      url = `${_1surl}${pathname}`
    }
    if (isGithub1sCode) {
      url = `${githubUrl}${pathname}`
    }

    const tempWindow = window.open("_blank")
    tempWindow.location.href = url

  }
  node.onclick = clickFn
  return node
}


function appendToBody(node) {
  document.body.appendChild(node)
}
