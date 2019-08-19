import React, { useState } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const NovoGenero = () => {
  const [nome, setNome] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const onChange = evt => {
    setNome(evt.target.value)
  }
  const salvar = () => {
    axios.post('/api/genres', {
      name: nome
    })
    .then(res => {
      setSucesso(true)
    })
  }

  if(sucesso) {
    return <Redirect to='/generos' />
  }

  return (
    <div className='container'>
      <h1>Novo Gênero</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='nome'>Nome</label>
          <input type='text' value={nome} onChange={onChange} className='form-control' id='nome' placeholder='Nome do gênero' />
        </div>
        <button type='button' onClick={salvar} className='btn btn-outline-primary'>Adicionar</button>
      </form>
    </div>
  )
}

export default NovoGenero