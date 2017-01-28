const keycode = document.getElementById('keycode')
const keyinfo = document.getElementById('key')
const history = document.getElementById('history')

history.createBindList(x => {
    x = x.split('|')
    const wraper = Node.create("div", { class: "wraper" })
    const key = Node.create("span", { class: "key" }, x[1])
    const code = Node.create("span", { class: "code" }, x[0])
    wraper.add([code, key])
    return wraper
})

window.addEventListener('keydown', e => {
    keycode.innerHTML = e.keyCode // code, key
    keyinfo.innerHTML = e.code.replace("Key", "").replace("Digit", "")
    e.preventDefault()
    const code = `${e.keyCode}|${e.code.replace("Key", "").replace("Digit", "")}`
    let list = history.bindList
    let index = list.indexOf(code)
    if (index != -1) list.splice(index, 1)
    list.unshift(code)
    history.bindList = list
})

