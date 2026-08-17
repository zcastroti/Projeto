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