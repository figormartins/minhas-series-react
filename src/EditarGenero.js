import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditarGenero = ({ match }) => {
  const [nome, setNome] = useState('')
  const [sucesso, setSucesso] = useState(false)

  useEffect(() => {
    axios
      .get('/api/genres/' + match.params.id)
      .then(res => {
        setNome(res.data.name)
      })
  }, [match.params.id])

  const onChange = evt => {
    setNome(evt.target.value)
  }
  const salvar = () => {
    axios.put('/api/genres/' + match.params.id, {
      name: nome
    })
      .then(res => {
        setSucesso(true)
      })
  }

  if (sucesso) {
    return <Redirect to='/generos' />
  }

  return (
    <div className='container'>
      <h1>Editar Gênero</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='nome'>Nome</label>
          <input type='text' value={nome} onChange={onChange} className='form-control' id='nome' placeholder='Nome do gênero' />
        </div>
        <button type='button' onClick={salvar} className='btn btn-outline-primary'>Salvar</button>
      </form>
    </div>
  )
}

export default EditarGenero