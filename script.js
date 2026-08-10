import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"

import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyAzChmCdzNXfSx5x_gL8m69ohYcVSdfagA",
  authDomain: "projeto-bc2b5.firebaseapp.com",
  projectId: "projeto-bc2b5",
  storageBucket: "projeto-bc2b5.firebasestorage.app",
  messagingSenderId: "7604977733",
  appId: "1:7604977733:web:26c3b831bf961530bea32c" };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


// --------------------------------------------------------------------------


// Gerar ID
function gerarID() { 
  return Math.random().toString(36).substring(2, 6) }

// Função - Modal
function modal() {
  
  let overlay = document.createElement('div')
  overlay.classList.add('overlay')
  document.body.prepend(overlay)

  
  let modal = document.createElement('div')
  modal.classList.add('modal')
  overlay.prepend(modal)

  modal.innerHTML = 
  `
  `
}

// Função - Alerta
function alerta(txt , tempo) {
  document.querySelector('.alerta')?.remove()
  let alerta = document.createElement('div')
  alerta.classList.add('alerta')
  document.body.prepend(alerta)

  alerta.innerHTML = `<i class="fa-solid fa-info"></i> ${txt}`
  setTimeout(() => { document.querySelector('.alerta').remove() }, tempo || 1500)
}

// Função - Loop
function loop() {
  let loop = document.createElement('div')
  loop.classList.add('loop')
  loop.innerHTML = '<img src="carregando.gif" class="gif" width="120px">'
  document.body.prepend(loop)
}


// Navegação
function navegacao() {
  let nav = document.createElement('nav')
  document.querySelector('.conteudo').prepend(nav)

  nav.innerHTML =
  `
  <a href="#"><i class="fa-solid fa-pen-clip"></i> Notas</a>
  <a href="#"><i class="fa-solid fa-piggy-bank"></i> Financeiro</a>
  <a href="#"><i class="fa-solid fa-gears"></i> Gerencial</a>
  `
}

// Tela de Login
if (window.location.pathname.includes('index.html')) {
  document.querySelector('.inputUsuario').focus()

  let btnLogin = document.querySelector('.btnLogin')
  btnLogin.onclick = ()=> { login() }
  window.addEventListener('keydown', (e) => { if (e.key === 'Enter') login() })

  async function login() {
    let inputUsuario = document.querySelector('.inputUsuario').value.trim().toLowerCase()
    let inputSenha = document.querySelector('.inputSenha').value.trim().toLowerCase()

    if (!inputUsuario || !inputSenha){
      alerta('Preencha todos os campos!')
      return
    }

    let usuarios = collection(db, 'usuarios')
    let filtro = query(usuarios, where("login", "==", inputUsuario) , where("senha", "==", inputSenha))
    let consulta = await getDocs(filtro)

    if (!consulta.empty) {
      let docSnap = consulta.docs[0]
      let usuario = docSnap.data()

      localStorage.setItem('usuario', usuario.id)
      window.location.href = 'notas.html'
    } else { alerta('Usuário não encontrado ou senha incorreta!') }
  }
}

// Tela de Login
if (window.location.pathname.includes('notas.html')) {
  navegacao()
  let usuario = localStorage.getItem('usuario')
  alerta('Seja bem vindo ' + usuario + '!' , 1500)

  listarNotas()
  async function listarNotas() {
    let notasREF = collection(db, 'usuarios', usuario, 'notas')
    let consulta = await getDocs(notasREF)
    consulta.forEach(e => {
      let dados = e.data()
      console.log(dados.nome)
    })

  }
}