import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
  const [nome, setNome] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const [modo, setModo] = useState('INFO')
  const [data, setData] = useState({})
  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => [
        setData(res.data)
      ])
  }, [match.params.id])

  //custom header
  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

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

  if (sucesso) {
    return <Redirect to='/series' />
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
              </div>
              <div className='col-9'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  <Badge color='success'>Assistindo</Badge>
                  <Badge color='warning'>Para assistir</Badge>
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container '>
        <button onClick={() => { setModo('EDIT') }} className='btn btn-outline-primary'>Editar</button>
      </div>
      {
        modo === 'EDIT' &&
        <div className='container'>
          <h1>Nova Série</h1>
          <pre>{JSON.stringify(data)}</pre>
          <form>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input type="text" value={nome} onChange={onChange} className="form-control" id="nome" placeholder="Nome do gênero" />
            </div>
            <button type="button" onClick={salvar} className="btn btn-outline-primary">Adicionar</button>
          </form>
        </div>
      }
    </div>
  )
}

export default InfoSerie