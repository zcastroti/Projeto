import { db , collection , getDocs  } from './script.js'
import { navegacao , gerarIdentificador , modal , alerta , loop } from './script.js'

navegacao()

let usuario = localStorage.getItem('usuario')

alerta(usuario)