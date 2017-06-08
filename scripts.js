const keycode = document.getElementById('keycode')
const keyinfo = document.getElementById('key')
const history = document.getElementById('history')
const Case = document.getElementById('case')

history.createBindList(x => {
    x = x.split('|')
    const wraper = Node.create('div', { class: 'wraper' })
    const key = Node.create('span', { class: 'key' }, x[1])
    const code = Node.create('span', { class: 'code' }, x[0])
    wraper.add([code, key])
    return wraper
})

window.addEventListener('keydown', e => {
    e.preventDefault()
    keycode.innerHTML = e.keyCode // code, key
    
    let keyname = e.code
        .replace('Key', '')
        .replace('Digit', '')
    if (/([A-Z]\w+)([A-Z]\w+)/.test(keyname)) {
        const temp = keyname.match(/([A-Z]\w+)([A-Z]\w+)/)
        keyname = `${temp[2]} ${temp[1]}`
    } else if (/(\w+)(\d+)/.test(keyname)) {
        const temp = keyname.match(/(\w+)(\d+)/)
        keyname = `${temp[1]} ${temp[2]}`
    }
    
    keyinfo.innerHTML = keyname
    const code = `${e.keyCode}|${keyname}`
    let list = history.bindList
    let index = list.indexOf(code)
    if (index != -1) list.splice(index, 1)
    list.unshift(code)
    history.bindList = list

    let string = 'switch (e.keyCode) {\n'
    for (let s of list) {
        s = s.split('|')
        string += `    case ${s[0]}: // ${s[1]} \n        break\n`
    }
    string += '}'
    Case.value = string
})

function copyToClipboard() {
    Case.focus()
    Case.setSelectionRange(0, Case.value.length)

    try {
        var succeed = document.execCommand('copy')
    } catch (e) {
        var succeed = false
    }

    return succeed
}

document.getElementById('copy').addEventListener('click', () => {
    copyToClipboard()
    alert('copied to clipboard')
})