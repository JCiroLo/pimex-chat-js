const d = document
const w = window
const ls = localStorage
const u = 'http://localhost:4000'
const ui = 'http://localhost:8081'
let cd = {}
let p = {}
w.ChatPimex = {
  init: async function ({ id, token, pos }) {
    p = pos
    const a = 'Basic ' + btoa(`${id}:${token}`)
    async function c () {
      const ru = await fetch(`${u}/user`, {
        method: 'GET',
        headers: { Authorization: a }
      })
      const uId = await ru.json()
      const rc = await fetch(`${u}/chat`, {
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
      let k = { id: b.id, userId: uId }
      ls.setItem('pimexChatData', JSON.stringify(k))
      return k
    }
    cd = JSON.parse(ls.getItem('pimexChatData')) || (await c())
    const bn = `button-pimex-${cd.id}`
    const e = `
      #chat-pimex-${cd.id}{ 
        opacity: 0;
        visibility: hidden;
        position: fixed;  
        bottom: 0;  
        right: 80px;  
        z-index: 9999;  
        border: none;  
        width: 400px;  
        height: 700px;
        transform: translateY(-20px);
        transition: opacity 0.2s ease-out, visibility 0.2s ease-out, transform 0.2s ease-out;
      } 
      #chat-pimex-${cd.id}.active{
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      #${bn} { background-color: #134251; border-radius: 50%;  position: fixed;  bottom: ${pos.y}px;  right: ${pos.x}px;  z-index: 10000;  width: 60px;  height: 60px;  padding: 0;  border: none;  outline: none;}
      #${bn}.active .open {  opacity: 0;  transform: scale(0.1) rotate(90deg);}
      #${bn}.active .close {  opacity: 1;  transform: scale(1) rotate(0);}
      #${bn} img {  position: absolute;  top: 0;  left: 0;  width: 100%;  height: 100%;}
      #${bn} .open {  transition: transform 0.2s ease-out, opacity 0.2s ease-out;  transform: scale(1) rotate(0);}
      #${bn} .close {  transition: transform 0.2s ease-out, opacity 0.2s ease-out;  opacity: 0;  transform: scale(0.1) rotate(-90deg);}`
    const s = document.createElement('style')
    if (s.styleSheet) {
      s.styleSheet.cssText = e
    } else {
      s.appendChild(d.createTextNode(e))
    }
    d.getElementsByTagName('head')[0].appendChild(s)
    const i = d.createElement('iframe')
    i.id = `chat-pimex-${cd.id}`
    i.src = `${ui}/${cd.userId}/${cd.id}`
    i.style.display = 'none'
    d.querySelector('body').appendChild(i)
    const b = d.createElement('button')
    b.id = bn
    const iO = d.createElement('img')
    const iC = d.createElement('img')
    iO.classList.add('open')
    iC.classList.add('close')
    iO.src = 'https://es.pimex.co/wp-content/uploads/2021/09/open_btn.png'
    iC.src = 'https://es.pimex.co/wp-content/uploads/2021/09/close_btn.png'
    iO.alt = 'Open'
    iC.alt = 'Close'
    b.onclick = function () {
      b.classList.toggle('active')
      i.classList.toggle('active')
    }
    b.appendChild(iO)
    b.appendChild(iC)
    d.querySelector('body').appendChild(b)
  }
}
