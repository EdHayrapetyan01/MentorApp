import React from 'react';
import Image from '../assets/mentors.png';

import './styles.scss';

export default function Home() {
  return (
    <>
      <div
        className='root'
        style={{
          backgroundImage: `url${Image})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '500px',
        }}
      >
        <p className='root-text'>They reached their potential with the help of a mentor. Now it's our turn.</p>
      </div>
      <div className='root-paragraph'>
        <h3>We facilitate mentorship programs.</h3>
        <p className='home-paragraph'>
          - The application have a registration process, multi-step profile filling (2 steps), and a third step — making
          a match suggestion. - You able to see a list of potential matches (other employees). You have an option to
          suggest up to 5 potential matches. You can manage and reorder your suggestions. - After the registration step
          is complete, you should be navigated to your profile page which includes a link allowing them to return and
          manage their suggestions.
        </p>
      </div>
    </>
  );
}
