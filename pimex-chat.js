const d = document
const w = window
const ls = localStorage
const ua = 'http://localhost:4000'
const ui = 'http://localhost:8081'
let cd = {}
async function r () {
  const o = await fetch('https://freegeoip.app/json/', {
    method: 'GET'
  })
  const { city, country_name } = await o.json()
  return city || country_name
}
async function c (a, u, i) {
  const ru = await fetch(`${u}/user`, {
    method: 'GET',
    headers: { Authorization: a }
  })
  const uId = await ru.json()
  const s = await r()
  const rc = await fetch(`${u}/chat`, {
    method: 'POST',
    headers: {
      Authorization: a,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      boardId: i,
      location: s
    })
  })
  const b = await rc.json()
  let k = { id: b.id, userId: uId }
  ls.setItem('pimexChatData', JSON.stringify(k))
  return k
}
async function p (a, u, i) {
  const rc = await fetch(`${u}/chat/${i}/config`, {
    method: 'GET',
    headers: { Authorization: a }
  })
  const { margin } = await rc.json()
  return margin
}
w.ChatPimex = {
  init: async function ({ id, token }) {
    const a = 'Basic ' + btoa(`${id}:${token}`)
    cd = JSON.parse(ls.getItem('pimexChatData')) || (await c(a, ua, id))
    const m = (await p(a, ua, id)) || { right: 20, bottom: 20 }
    const bn = `button-pimex-${cd.id}`
    const e = `
      #chat-pimex-${cd.id}{ 
        opacity: 0;
        visibility: hidden;
        position: fixed;  
        bottom: 0;  
        right: 20px;
        z-index: 9999;  
        border: none;  
        width: 400px;  
        height: 700px;
        transform: translateY(25px);
        transition: opacity 0.2s ease-out, visibility 0.2s ease-out, transform 0.1s ease-out;
      } 
      #chat-pimex-${cd.id}.active{
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      #${bn} { background-color: #134251; border-radius: 50%;  position: fixed;  bottom: ${m.bottom}px;  right: ${m.right}px;  z-index: 10000;  width: 60px;  height: 60px;  padding: 0;  border: none;  outline: none; transform: scale(0); opacity: 0; transition: opacity 0.2s ease-out, transform 0.2s ease-out;}
      #${bn}.loaded { transform: scale(1); opacity: 1; }
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
    d.querySelector('body').appendChild(i)
    b.appendChild(iO)
    b.appendChild(iC)
    d.querySelector('body').appendChild(b)
    b.onclick = function () {
      b.classList.toggle('active')
      i.classList.toggle('active')
    }
    function l () {
      b.classList.add('loaded')
    }
    if (w.attachEvent) {
      w.attachEvent('onload', l)
    } else {
      w.addEventListener('load', l, false)
    }
  }
}
