export default function Login () {
  return (
    <div id='login-page'>
      <form>
        <h3>Portal</h3>
        <label htmlFor='username'>Användarnamn</label>
        <input type='text' placeholder='Email or Phone' id='username' />
        <label htmlFor='password'>Lösenord</label>
        <input type='password' placeholder='Password' id='password' />
        <button>Logga in</button>
        {/*         <div className='social'>
          <div className='go'><i className='fab fa-google' />  Google</div>
          <div className='fb'><i className='fab fa-facebook' />  Facebook</div>
        </div> */}
      </form>
    </div>
  )
}
