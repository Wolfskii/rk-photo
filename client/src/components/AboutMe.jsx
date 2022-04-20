import './AboutMe.scss'

export default function AboutMe () {
  return (
    <div id='about-me'>
      <div className='heading'>
        <p className='pre-heading'>Hej, mitt namn är</p>
        <h2>Renata Kaleta</h2>
      </div>
      <div className='content'>
        <div className='container'>
          <div className='sub-container'>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div className='sub-container'>
            <div>
              <h4>Fotografier</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit.
              </p>
            </div>
            <div>
              <h4>Event</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit.
              </p>
            </div>
          </div>
        </div>
        <div className='container'>
          <img
            src='https://scontent.fbma2-1.fna.fbcdn.net/v/t1.6435-9/90354605_2676018469190459_6388694351639216128_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=jssdoCNcY94AX-R2GIt&tn=0eahHqVl2nNaQd-N&_nc_ht=scontent.fbma2-1.fna&oh=00_AT_LzwpCtAjJR5GlB-5uLJq-taHRqTb5YczpomkcfkRkSA&oe=6284257E'
            alt='Renata foto'
          />
        </div>
      </div>
    </div>
  )
}
