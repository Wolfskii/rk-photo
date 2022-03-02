import axios from 'axios'
import { useState } from 'react'
import PropTypes from 'prop-types'

export default function Login ({ setToken }) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async e => {
    e.preventDefault()
    const token = await loginUser({
      email,
      password
    })
    setToken(token)
  }

  return (
    <div id='login-page'>
      <form onSubmit={handleSubmit}>
        <h3>Logga in</h3>
        <label>
          <p>E-post</p>
          <input type='text' id='email' onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Lösenord</p>
          <input type='password' id='password' onChange={e => setPassword(e.target.value)} />
        </label>
        <button type='submit'>Logga in</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

async function loginUser (credentials) {
  // Start upload
  const url = 'http://localhost:4000/auth/login'

  const res = await axios.post(url, credentials)

  return res.data.authToken
}
