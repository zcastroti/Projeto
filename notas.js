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

import { navegacao , gerarIdentificador , modal , alerta , loop } from './script.js'

navegacao()
document.querySelector('.notas').classList.add('destaque')

let usuario = localStorage.getItem('usuario')
let menuNotas = document.querySelector('.menuNotas')

// Listar Notas
listarNotas()
async function listarNotas() {
    let notasREF = collection(db, 'usuarios', usuario, 'notas')
    let consulta = await getDocs(notasREF)
    if (!consulta.empty) {
        consulta.forEach(e => {
            let dados = e.data()
            let nota = document.createElement('div')
            nota.classList.add('nota')
            nota.id = e.id
            nota.textContent = dados.nome
            menuNotas.prepend(nota)
        })
    } else { menuNotas.innerHTML = `<p style='text-align: center;'>Nenhuma nota cadastrada!</p>`}
}


menuNotas.addEventListener('click', (e) => {
    let nota = e.target.closest('.nota')
    if (nota) { visualizarNota(nota.id, nota) }
})

async function visualizarNota(id, elemento) {

    let notaREF = doc(db, 'usuarios', usuario, 'notas', id)
    let consulta = await getDoc(notaREF)
    let dados = consulta.data()

  console.log(`Nota clicada iD: ${id}`)

    modal()
    let conteudoModal = document.querySelector('.conteudoModal')

    conteudoModal.innerHTML =
    `
    <div style=" display: flex; align-items: center; justify-content: space-between; "> 
        <b>${elemento.textContent} </b>
        <button class="btnFecharModal">Fechar <i class="fa-regular fa-circle-xmark"></i></button>
    </div>
    <div class="editor" contenteditable="true">
        ${dados.conteudo}
    </div>
    <div style=" display: flex; gap: 10px; ">
        <button>Salvar <i class="fa-solid fa-sd-card"></i></button>
        <button>Renomear <i class="fa-solid fa-feather"></i></button>
        <button>Deletar <i class="fa-solid fa-trash"></i></button>
    </div>
    `

    // Fechar Modal
    document.querySelector('.btnFecharModal').onclick = ()=> { 
        document.querySelector('.overlay')?.remove() 
    }

}