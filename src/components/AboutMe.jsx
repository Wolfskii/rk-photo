import ProfilePhoto from '../assets/images/profile-photo.png'
import './AboutMe.scss'

/**
 * AboutMe component displays information about Renata Kaleta.
 * @returns {JSX.Element} - Rendered AboutMe component.
 */
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
              <p>Foton är väldigt intressanta. De kan berätta en historia, beröra, lugna själen och så mycket mer. Foton kan ha olika betydelse från person till person och ingens tolkning eller känslor är någonsin fel. Det är helt enkelt så mycket mer än bara en bild. För mig kan ett foto återblicka till ett kärt minne, med familj, vänner eller en speciell plats som ligger en nära om hjärtat.</p>
            </div>
          </div>
          <div className='sub-container'>
            <div>
              <h4>Fotografier</h4>
              <p>Fotografier besitter en fascinerande kraft. De kan förmedla historier, väcka känslor, bringa ro till sinnet och mycket mer. Bilders innebörd kan variera för olika individer, och ingen tolkning eller känsla är felaktig. Fotografier utgör helt enkelt mer än enbart visuella avbildningar. Personligen kan ett foto för mig återspegla ett älskat minne, oavsett om det involverar familj, vänner eller en speciell plats som ligger mig varmt om hjärtat.</p>
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
