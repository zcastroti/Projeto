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

import { navegacao , gerarIdentificador , modal , alerta , loop, removeLoop, paginarTabela } from './script.js'

navegacao()
document.querySelector('.contas')?.classList.add('destaque')

const USUARIO = localStorage.getItem('usuario')

// Função - Listar Meses Conforme Ano Configurado
listarMeses()
function listarMeses() {
  let menuContas = document.querySelector('.menuContas')
  menuContas.onclick = async (e) => {
    if (!e.target.classList.contains('mes')) return

    let usuarioREF = doc(db, "usuarios", USUARIO)
    
    loop()
    let consulta = await getDoc(usuarioREF)
    removeLoop()

    let dados = consulta.data()
    let ano = dados.anoVisaoContas || 2026
    
    let mes = e.target.id
    carregarMes(ano, mes)
  }
}

// Função - Carregar Contas Conforme Mês Selecionado
async function carregarMes(a, m) {
  let ano = String(a)
  let mes = String(m)

  let contasREF = collection(db, "usuarios", USUARIO, "contas", ano, mes)
  
  loop()
  let consulta = await getDocs(contasREF)
  removeLoop()

  modal(mes)
  document.querySelector('.bodyModal').innerHTML = 
  `
  <table id="tabela">
    <tbody class="corpoTabela"></tbody>
  </table>

  <!-- Paginação -->
  <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
      <button class="btnVoltar">&lt; Voltar</button>
      <p class="nomePagina">Página 1 de 1</p>
      <button class="btnAvancar">Avançar &gt;</button>
  </div>
  `

  let corpoTabela = document.querySelector('.corpoTabela')

  if (!consulta.empty) {
    consulta.forEach(docSnap => {
      let dados = docSnap.data()
      let tr1 = document.createElement('tr')
      tr1.innerHTML = `
        <td class="col-nome">${dados.nome || ''}</td>
        <td class="col-valor">R$ ${dados.valor || ''}</td>
        <td class="col-btnEditar"><button><i class="fa-solid fa-gear"></i></button></td>
      `
      corpoTabela.appendChild(tr1)

    })
  } else { corpoTabela.innerHTML = `<tr><td colspan="2">Nenhuma Conta</td></tr>` }

  adicionarConta(a, m)

  paginarTabela('#tabela', 10); 
}


function adicionarConta(a, m) {
  let ano = String(a)
  let mes = String(m)

  let btnAddConta = document.createElement('button')
  btnAddConta.innerHTML = `Adicionar Conta <i class="fa-solid fa-circle-plus"></i>`
  document.querySelector('.bodyModal').appendChild(btnAddConta)

  btnAddConta.onclick = ()=> {
    modal("Adicionar Conta")
    document.querySelector('.bodyModal').innerHTML =
    `
    <div class="grid5">
        <div>
            <label for="nome">Nome</label>
            <input type="text" class="nome">
        </div>
        <div>
            <label for="valor">Valor</label>
            <input type="text" class="valor">
        </div>
        <div>
            <label for="vencimento">Dia Vencimento</label>
            <input type="text" class="vencimento">
        </div>
        <div>
            <label for="parcela">Parcela</label>
            <input type="text" class="parcela">
        </div>
    </div>
    <div style=" display: flex; gap: 10px; ">
      <button class="btnCancelar">Cancelar <i class="fa-regular fa-circle-xmark"></i></button>
      <button class="btnConfirmar">Confirmar <i class="fa-regular fa-circle-check"></i></button>
    </div>
    `

    // Cancelar
    document.querySelector('.btnCancelar').onclick = ()=> {
        document.querySelector('.modal')?.remove()
        document.querySelector('.overlay')?.remove()
        carregarMes(ano, mes)
    }

    // Confirmar
    document.querySelector('.btnConfirmar').onclick = async ()=> {
        let nome = document.querySelector('.nome').value.trim()
        let valor = document.querySelector('.valor').value.trim()
        let vencimento = document.querySelector('.vencimento').value.trim()
        let parcela = document.querySelector('.parcela').value.trim()

        if (!nome || !valor || !vencimento || !parcela) {
          alerta('Preencha todos os dados!') 
          return }

        let id = gerarIdentificador()
        let contaREF = doc(db, "usuarios", USUARIO, "contas", ano, mes, id)

        
        loop()
        await setDoc(contaREF, { 
          nome: nome,
          valor: valor,
          vencimento: vencimento,
          parcela: parcela
        })
        
        document.querySelector('.modal')?.remove()
        document.querySelector('.overlay')?.remove()

        await carregarMes(ano, mes)
        removeLoop()
        alerta('Conta cadastrada com sucesso!')
    }

  }
}
  
  



