import './AboutMe.scss'

export default function AboutMe() {
  return (
    <div id='about-me'>
      <div className='container'>
        <p className='pre-heading'>Hej, jag är</p>
        <h2>Renata Kaleta</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <div className='sub-container'>
          <div>
            <h3>Fotografier</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit.
            </p>
          </div>
          <div>
            <h3>Event</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit.
            </p>
          </div>
        </div>
      </div>
      <div className='container'>
        <img
          src='https://scontent-arn2-1.xx.fbcdn.net/v/t1.6435-9/90354605_2676018469190459_6388694351639216128_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=ouSh73byr5UAX9xNFAW&_nc_ht=scontent-arn2-1.xx&oh=00_AT8AByMhofcrbmdlfO8ZD0XwvaIz4KPPg6RCqnvQ8ZTRMg&oe=6254AF7E'
          alt='Renata foto'
        />
      </div>
    </div>
  )
}
