import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{textAlign: 'center'}}>
        <h1>Touch Grass v1.0</h1>
        <Link to="/login">Login</Link> <br/><br/>
        <Link to="/register">Register</Link>
    </div>
  )
}

export default Home