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
document.querySelector('.config').classList.add('destaque')

let usuario = localStorage.getItem('usuario')

