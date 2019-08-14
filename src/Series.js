import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Series = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('/api/series')
      .then(res => {
        setData(res.data.data)
      })
  }, [])

  const removeSerie = id => {
    axios
      .delete("api/series/" + id)
      .then(res => {
        setData(data.filter(item => item.id !== id))
      })
  }
  const renderizaLinha = serie => {
    return (
      <tr key={serie.id}>
        <th scope="row">{serie.id}</th>
        <td>{serie.name}</td>
        <td>
          <button type="button" onClick={() => removeSerie(serie.id)} className="btn btn-outline-danger mr-1">Deletar</button>
          <Link to={"/series/" + serie.id} className="btn btn-outline-info">Info</Link>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Séries</h1>
        <Link to='series/novo'>Nova série</Link>
        <div className="alert alert-warning" role="alert">
          Você não possui séries para mostrar.
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Séries</h1>
      <Link to='series/novo'>Nova série</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderizaLinha)}
        </tbody>
      </table>
    </div>
  )
}

export default Series