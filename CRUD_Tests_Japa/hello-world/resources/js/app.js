import '../css/app.css'

document.getElementById('agentes').addEventListener('click', () => {
  const agente_selecionado = document.getElementById('agentes').value
  console.log(agente_selecionado)

  classe_agente(agente_selecionado)
})

function classe_agente(x) {
  if (x == 'Neon' || x == 'Raze' || x == 'Reyna' || x == 'Yoru' || x == 'Jett' || x == 'Phoenix')
    document.getElementById('classe').value = 'Duelista'
  else if (x == 'Breach' || x == 'Fade' || x == 'KAY/O' || x == 'Skye' || x == 'Sova')
    document.getElementById('classe').value = 'Iniciador'
  else if (x == 'Chamber' || x == 'Cypher' || x == 'Killjoy' || x == 'Sage')
    document.getElementById('classe').value = 'Sentinela'
  else if (x == 'Astra' || x == 'Brimstone' || x == 'Omen' || x == 'Viper')
    document.getElementById('classe').value = 'Smoker'
  else document.getElementById('classe').value = ''
}

//patente selecionado
const patente = document.getElementById('patente').innerHTML
const patenteDrop = document.getElementById('patentes')

for (let i = 0; i < patenteDrop.length; i++) {
  if (patente === patenteDrop[i].value) {
    patenteDrop[i].setAttribute('selected', 'selected')
    break
  }
}

//agente selecionado
const agente = document.getElementById('agente').innerHTML
const agentesDrop = document.getElementById('agentes')

for (let i = 0; i < agentesDrop.length; i++) {
  if (agente === agentesDrop[i].value) {
    agentesDrop[i].setAttribute('selected', 'selected')
    classe_agente(agente)
    break
  }
}

//arma selecionada
const arma = document.getElementById('arma').innerHTML
const armasDrop = document.getElementById('arma_fav')

for (let i = 0; i < armasDrop.length; i++) {
  if (arma === armasDrop[i].value) {
    armasDrop[i].setAttribute('selected', 'selected')
    break
  }
}
