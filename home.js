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
document.querySelector('.home')?.classList.add('destaque')

const USUARIO = localStorage.getItem('usuario')


document.addEventListener('DOMContentLoaded', () => {
    paginarTabela('#tabela', 10);
    
});