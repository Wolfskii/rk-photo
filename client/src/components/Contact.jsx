import './Contact.scss'

export default function Contact () {
  return (
    <div id='contact'>
      <div className='content'>
        <div className='container'>
          <div>
            <h3>Kontaktuppgifter</h3>
            <p>Nå mig på annat sätt:</p>
            <div>
              <div>
                <span className='fa fa-facebook-square' />
              </div>
              <div>
                ;
                <p>
                  <span>Facebook:</span>{' '}
                  <a
                    href='https://www.facebook.com/renatakaleta66'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Renata Kaleta
                  </a>
                </p>
              </div>
            </div>
            <div>
              <div>
                <span className='fa fa-phone' />
              </div>
              <div>
                <p>
                  <span>Mobil:</span>{' '}
                  <a href='tel://1234567920'>+46 708 51 51 51</a>
                </p>
              </div>
            </div>
            <div>
              <div>
                <span className='fa fa-envelope' />
              </div>
              <div>
                <p>
                  <span>E-post:</span>{' '}
                  <a href='mailto:renatakaleta@hotmail.com'>
                    renatakaleta@hotmail.com
                  </a>
                </p>
              </div>
            </div>
            <div>
              <div>
                <span className='fa fa-globe' />
              </div>
              <div>
                <p>
                  <span>Hemsida:</span>{' '}
                  <a
                    href='https://rk-photo.se'
                    target='_blank'
                    rel='noreferrer'
                  >
                    rk-photo.se
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div>
            <h3>Skriv till mig</h3>
            <form
              method='POST'
              id='contactForm'
              name='contactForm'
              className='contactForm'
              noValidate='novalidate'
            >
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='label' htmlFor='name'>
                      Namn:
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      name='name'
                      id='name'
                      placeholder='Ert namn'
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='label' htmlFor='email'>
                      E-post:
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      name='email'
                      id='email'
                      placeholder='Er e-postadress'
                    />
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <label className='label' htmlFor='subject'>
                      Ämne:
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      name='subject'
                      id='subject'
                      placeholder='Ämnet för meddelandet'
                    />
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <label className='label' htmlFor='#'>
                      Meddelande:
                    </label>
                    <textarea
                      name='message'
                      className='form-control'
                      id='message'
                      cols={30}
                      rows={4}
                      placeholder='Ert meddelande'
                      defaultValue=''
                    />
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <input
                      type='submit'
                      defaultValue='Send Message'
                      className='btn btn-primary'
                    />
                    <div className='submitting' />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
