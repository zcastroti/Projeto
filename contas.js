import {
  db,
  doc,
  collection,
  getDoc,
  getDocs
} from './script.js'

import { navegacao, modal, loop, removeLoop } from './script.js'

navegacao()
document.querySelector('.contas')?.classList.add('destaque')

let USUARIO = localStorage.getItem('usuario')

listarMeses()

function listarMeses() {
  let menuContas = document.querySelector('.menuContas')
  if (!menuContas) return

  menuContas.onclick = async (e) => {
    if (!e.target.classList.contains('mes')) return
    if (!USUARIO) return console.error('Usuário não encontrado no localStorage')

    let usuarioREF = doc(db, "usuarios", USUARIO)
    
    loop()
    let consulta = await getDoc(usuarioREF)
    removeLoop()

    let ano = 2026
    if (consulta.exists()) {
      let dados = consulta.data()
      ano = dados.anoVisaoContas || 2026
    }

    let mes = e.target.id
    carregarConta(ano, mes)
    console.log(ano + " " + mes)
  }
}

async function carregarConta(a, m) {
  let ano = String(a)
  let mes = String(m)

  if (!USUARIO) return

  let contasREF = collection(db, "usuarios", USUARIO, "contas", ano, mes)
  
  loop()
  let consulta = await getDocs(contasREF)
  removeLoop()

  modal()
  
  let conteudoModal = document.querySelector('.conteudoModal')
  if (conteudoModal) {
    conteudoModal.innerHTML = `
      <table class="tabelaContas">
        <thead>
          <tr>
            <th>iD</th>
            <th>Nome</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody class="corpoTabela"></tbody>
      </table>
    `
  }

  let corpoTabela = document.querySelector('.corpoTabela')

  if (!consulta.empty) {
    consulta.forEach(docSnap => {
      let dados = docSnap.data()
      let tr = document.createElement('tr')
      tr.innerHTML = `
        <td>${dados.id || docSnap.id}</td>
        <td>${dados.nome || ''}</td>
        <td>${dados.valor || 0}</td>
      `
      corpoTabela.appendChild(tr)
    })
  } else {
    corpoTabela.innerHTML = `<tr><td colspan="3">Nenhuma Conta</td></tr>`
  }



  let btnAddConta = document.createElement('button')
  btnAddConta.innerHTML = `Adicionar Conta <i class="fa-solid fa-circle-plus"></i>`
  conteudoModal.appendChild(btnAddConta)
  



}