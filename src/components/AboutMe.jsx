import ProfilePhoto from '../assets/images/profile-photo.png'
import './AboutMe.scss'

export default function AboutMe() {
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
              <p>Kul att just du hittat hit! Hoppas du gillar mina bilder. Vad kan jag berätta om mig själv? Jag har över tio år fotograferat som en extra hobby och blivit rätt vass på det, om jag får säga det själv. Jag tyckte det var kul efter att ha testat att fotografera på några danstävlingar i början och fastnade snabbt, vilket ledde till fördjupat lärande och mängder med inköp av kameror, linser och stativ.</p>
            </div>
          </div>
          <div className='sub-container'>
            <div>
              <h4>Fotografier</h4>
              <p>Foton är väldigt intressanta. De kan berätta en historia, beröra, lugna själen och så mycket mer. Foton kan ha olika betydelse från person till person och ingens tolkning eller känslor är någonsin fel. Det är helt enkelt så mycket mer än bara en bild. För mig kan ett foto återblicka till ett kärt minne, med familj, vänner eller en speciell plats som ligger en nära om hjärtat.</p>
            </div>
            <div>
              <h4>Evenemang</h4>
              <p>Jag är numera rätt van och erfaren när det kommer till evenemange, stora som små, inomhus och utomhus i olika ljusförhållanden. Intresserad? Gå till sidan "Kontakta mig" för att ta kontakt!</p>
            </div>
          </div>
        </div>
        <div className='container'>
          <img src={ProfilePhoto} alt='Renata foto' />
        </div>
      </div>
    </div>
  )
}
