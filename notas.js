import { db , collection , getDocs } from './script.js'
import { navegacao , gerarIdentificador , modal , alerta , loop } from './script.js'

navegacao()

let usuario = localStorage.getItem('usuario')

listarNotas()
async function listarNotas() {
    let menuNotas = document.querySelector('.menuNotas')
    let notasREF = collection(db, 'usuarios', usuario, 'notas')
    let consulta = await getDocs(notasREF)
    consulta.forEach(e => {
        let dados = e.data()
        
        let nota = document.createElement('div')
        nota.classList.add('nota')
        nota.textContent = dados.nome
        menuNotas.prepend(nota)
    })

}
