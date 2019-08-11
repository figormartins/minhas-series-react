import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Generos = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setData(res.data.data)
      })
  }, [])

  const removeGenero = id => {
    axios
      .delete("api/genres/" + id)
      .then(res => {
        setData(data.filter(item => item.id !== id))
      })
  }
  const renderizaLinha = genero => {
    return (
      <tr key={genero.id}>
        <th scope="row">{genero.id}</th>
        <td>{genero.name}</td>
        <td>
          <button type="button" onClick={() => removeGenero(genero.id)} className="btn btn-outline-danger">Deletar</button>
          <Link to={"/generos/" + genero.id} className="btn btn-outline-info">Editar</Link>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Generos</h1>
        <div className="alert alert-warning" role="alert">
          Você não possui gêneros para mostrar.
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1> Gêneros</h1>
      <Link to='generos/novo'>Adicionar Novo</Link>
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

export default Generos