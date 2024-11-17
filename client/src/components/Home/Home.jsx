import React, { useEffect, useState } from 'react';
import "../Home/Home.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://media.istockphoto.com/id/143176813/photo/language-master.jpg?s=612x612&w=0&k=20&c=S_u2CegMBe7FTI5qhZ_gP76lJbh3Xl-jfryZEFNrV5w=',
    'https://www.ox.ac.uk/sites/files/oxford/styles/ow_medium_feature/s3/field/field_image_main/modern%20foreign%20languages.jpg?itok=kTFZL0CY',
    'https://www.irishtimes.com/resizer/v2/CDZNPSP2QBHEXNVEDXQ5IWGNBA.jpg?auth=a67d1e394a0e9c7dc047d6e7d56ad73cbef3916a2b560b00fb940981cd7ef18a&smart=true&width=1024&height=683',
  ];

  const navigate = useNavigate();

  const handlenavigate = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/Selectlanguage");
    } else {
      navigate("/user/signup");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 2000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div>
      <main className="main" style={{ backgroundImage: `url(${images[currentImage]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h2>Speak a new language in 10 minutes a day</h2>
        <p>
          Set realistic goals. Get advice from native speakers. Make real progress. Discover a world of opportunities by learning another language.
        </p>
        <a className="cta" href="#" onClick={handlenavigate}>
          Start learning
        </a>
        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
        </div>
        <div className="illustration">
          <div className="speech-bubble">Hello!</div>
          <img
            alt="Person with Hello speech bubble"
            height="100"
            src="https://storage.googleapis.com/a1aa/image/u1s5zDgpCQq0KRDIo3zWDdqub9YIf8a6c95Owmla4lfHWgwTA.jpg"
            width="100"
          />
          <div className="speech-bubble">Salut!</div>
          <img
            alt="Person with Hello speech bubble"
            height="100"
            src="https://storage.googleapis.com/a1aa/image/7RqsPi87jSImI90PzednlqwnWb9WQarEIJZn3op6npUCLQ4JA.jpg"
            width="100"
          />
          <div className="speech-bubble">Ciao!</div>
          <img
            alt="Person with Ciao speech bubble"
            height="100"
            src="https://storage.googleapis.com/a1aa/image/hRfpuQXOtyQVWqHJ5qv2lIeZxmBWJDia3SQRL8k7ClmGWgwTA.jpg"
            width="100"
          />
        </div>
      </main>
      <div className="container">
        <div className="title">
          I want to learn
        </div>
        <div className="languages">
          <div className="arrow">
            &lt;
          </div>
          <div className="language">
            <img 
              alt="UK flag" 
              height="60" 
              src="https://storage.googleapis.com/a1aa/image/OylZYRhN2qZHPNW3cRC7uCEXrSTQvzMDUt6di6sgtkNIKI8E.jpg" 
              width="60" 
            />
            <p>
              English
            </p>
          </div>
          <div className="language">
            <img 
              alt="French flag" 
              height="60" 
              src="https://storage.googleapis.com/a1aa/image/hKXxIf4hnVVCF6JoWwqFUfIZ80Vig3Y3ZCYSdHHDUEKiogwTA.jpg" 
              width="60" 
            />
            <p>
              French
            </p>
          </div>
          <div className="arrow">
            &gt;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
