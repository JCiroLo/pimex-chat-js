const d = document
const w = window
const ls = localStorage
let cd = {}
w.ChatPimex = {
  init: async function ({ id, token }) {
    const a = 'Basic ' + btoa(`${id}:${token}`)
    async function c () {
      const ru = await fetch('http://localhost:4000/user', {
        method: 'GET',
        headers: { Authorization: a }
      })
      const uId = await ru.json()
      const rc = await fetch('http://localhost:4000/chat', {
        method: 'POST',
        headers: {
          Authorization: a,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          boardId: id,
          location: {
            city: 'Medallo papá',
            country_name: 'Colombia papá'
          }
        })
      })
      const b = await rc.json()
      let p = { id: b.id, userId: uId }
      ls.setItem('pimexChatData', JSON.stringify(p))
      return p
    }
    cd = JSON.parse(ls.getItem('pimexChatData')) || (await c())
    const e = `#chat-pimex-123{ position: fixed;  bottom: 0;  right: 80px;  z-index: 999;  border: none;  width: 400px;  height: 700px;} #button-pimex-123 { background-color: transparent;  position: fixed;  bottom: 20px;  right: 100px;  z-index: 1000;  width: 60px;  height: 60px;  padding: 0;  border: none;  outline: none;}#button-pimex-123.active .open {  opacity: 0;  transform: scale(0.1) rotate(90deg);}#button-pimex-123.active .close {  opacity: 1;  transform: scale(1) rotate(0);}#button-pimex-123 img {  position: absolute;  top: 0;  left: 0;  width: 100%;  height: 100%;}#button-pimex-123 .open {  transition: transform 0.2s ease-out, opacity 0.2s ease-out;  transform: scale(1) rotate(0);}#button-pimex-123 .close {  transition: transform 0.2s ease-out, opacity 0.2s ease-out;  opacity: 0;  transform: scale(0.1) rotate(-90deg);}`
    const s = document.createElement('style')
    if (s.styleSheet) {
      s.styleSheet.cssText = e
    } else {
      s.appendChild(d.createTextNode(e))
    }
    d.getElementsByTagName('head')[0].appendChild(s)
    const i = d.createElement('iframe')
    i.id = 'chat-pimex-123'
    i.src = `http://localhost:8081/${cd.userId}/${cd.id}`
    i.style.display = 'none'
    d.querySelector('body').appendChild(i)
    const b = d.createElement('button')
    b.id = 'button-pimex-123'
    const iO = d.createElement('img')
    const iC = d.createElement('img')
    iO.classList.add('open')
    iC.classList.add('close')
    iO.src = 'https://es.pimex.co/wp-content/uploads/2021/09/open.png'
    iC.src = 'https://es.pimex.co/wp-content/uploads/2021/09/close.png'
    iO.alt = 'Open'
    iC.alt = 'Close'
    b.onclick = function () {
      if (i.style.display === 'none') {
        i.style.display = 'block'
      } else {
        i.style.display = 'none'
      }
      b.classList.toggle('active')
    }
    b.appendChild(iO)
    b.appendChild(iC)
    d.querySelector('body').appendChild(b)
  }
}
