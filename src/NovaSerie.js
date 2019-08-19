import React, { useState } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const NovaSerie = () => {
  const [nome, setNome] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const onChange = evt => {
    setNome(evt.target.value)
  }
  const salvar = () => {
    axios.post('/api/series', {
      name: nome
    })
    .then(res => {
      setSucesso(true)
    })
  }

  if(sucesso) {
    return <Redirect to='/series' />
  }

  return (
    <div className='container'>
      <h1>Nova Série</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='nome'>Nome</label>
          <input type='text' value={nome} onChange={onChange} className='form-control' id='nome' placeholder='Nome da série' />
        </div>
        <button type='button' onClick={salvar} className='btn btn-outline-primary'>Adicionar</button>
      </form>
    </div>
  )
}

export default NovaSerie