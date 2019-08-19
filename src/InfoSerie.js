import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({
    name: ''
  })
  const [sucesso, setSucesso] = useState(false)
  const [modo, setModo] = useState('INFO')
  const [generos, setGeneros] = useState([])
  const [generoId, setGeneroId] = useState('')
  const [data, setData] = useState({})

  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setGeneros(res.data.data)
        const generos = res.data.data
        const encontrado = generos.find(valor => data.genre === valor.name)
        
        if (encontrado) {
          setGeneroId(encontrado.id)
        }
      })
  }, [data])

  //custom header
  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const onChangeGenero = evt => {
    setGeneroId(evt.target.value)
  }

  const onChange = campo => evt => {
    setForm({
      ...form,
      [campo]: evt.target.value
    })
  }

  const seleciona = valor => () => {
    setForm({
      ...form,
      status: ''
    });
  }

  const salvar = () => {
    axios
      .put('/api/series/' + match.params.id, {
        ...form,
        genre_id: generoId
      })
      .then(res => {
        setSucesso(true)
      })
  }

  if (sucesso)
    return <Redirect to='/series' />


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
                  {data.status === 'ASSISTIDO' && <Badge color='success'>Assistindo</Badge>}
                  {data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
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
          <h1>Editar série</h1>
          <button onClick={() => { setModo('INFO') }} className='btn btn-outline-danger'>Cancelar</button>
          <form>
            <div className='form-group'>
              <label htmlFor='nome'>Nome</label>
              <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='nome' placeholder='Nome do gênero' />
            </div>
            <div className='form-group'>
              <label htmlFor='comentarios'>Comentários</label>
              <input type='text' value={form.coments} onChange={onChange('coments')} className='form-control' id='nome' placeholder='Nome do gênero' />
            </div>
            <div className='form-group'>
              <label htmlFor='genero'>Gênero</label>
              <select className='form-control' onChange={onChangeGenero} value={generoId}>
                {generos.map(genero => <option key={genero.id} value={genero.id} >{genero.name}</option>)}
              </select>
            </div>

            <div className='form-check'>
              <input className='form-check-input' type='radio' checked={form.status === 'ASSISTIDO'} name='status' id='assistido' value='ASSISTIDO' onChange={seleciona('ASSISTIDO')} />
              <label className='form-check-label' htmlFor='assistido'>
                Assistindo
              </label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='radio' checked={form.status === 'PARA_ASSISTIR'} name='status' id='paraAssistir' value='PARA_ASSISTIR' onChange={seleciona('PARA_ASSISTIR')} />
              <label className='form-check-label' htmlFor='paraAssistir'>
              Para assistir
            </label>
            </div>

            <button type='button' onClick={salvar} className='btn btn-outline-primary'>Adicionar</button>
          </form>
        </div>
      }
    </div>
  )
}

export default InfoSerie