import {
  db,
  doc,
  collection,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy
} from './script.js'

import { navegacao , gerarIdentificador , modal , alerta , loop, removeLoop } from './script.js'

navegacao()
document.querySelector('.contas').classList.add('destaque')

const USUARIO = localStorage.getItem('usuario')






listarMeses()
function listarMeses() {
    let menuContas = document.querySelector('.menuContas')
    menuContas.onclick = async(e)=> {
        if (!e.target.classList.contains('mes')) return


        let usuarioREF = doc(db, "usuarios", USUARIO)
        loop()
        let consulta = await getDoc(usuarioREF)
        removeLoop()
        let dados = consulta.data()
        let ano = dados.anoVisaoContas || 2026

        let mes = e.target.id;
        carregarConta(ano, mes)
    }
}

async function carregarConta(a, m) {
    let ano = a
    let mes = m

    let id = gerarIdentificador()
    
    let contasREF = collection(db, "usuarios", USUARIO, "contas", ano, mes)
    loop()
    let consulta = await getDocs(contasREF)
    removeLoop()

    modal()
    let conteudoModal = document.querySelector('.conteudoModal')

    if (!consulta.empty) {
        consulta.forEach(e => {
            let dados = e.data()
            let conta = document.createElement('div')
            conta.classList.add('conta')
            conta.id = e.id
            conta.textContent = conta.id
            conteudoModal.prepend(conta)
        })
    } else { conteudoModal.innerHTML = `<p style='text-align: center;'>Nenhuma nota cadastrada!</p>`}


    




}
