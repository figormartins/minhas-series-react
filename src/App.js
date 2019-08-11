import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import Generos from './Generos'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'

const Home = () => {
  return <h1>Home</h1>
}

function App() {
  const [data, setData] = useState({})
  useEffect(() => {
    axios.get('/api').then(res => {
      setData(res.data)
    })
  }, [])

  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/generos" exact component={Generos} />
        <Route path="/generos/:id" exact component={EditarGenero} />
        <Route path="/generos/novo" exact component={NovoGenero} />
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
}

export default App;
