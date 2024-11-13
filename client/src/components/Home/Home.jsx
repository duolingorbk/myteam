import React from 'react';
import "../Home/Home.css"

const Home = () => {
  return (
    <div>
      <main className="main">
        <h2>Speak a new language in 10 minutes a day</h2>
        <p>
          Set realistic goals. Get advice from native speakers. Make real progress. Discover a world of opportunities by learning another language.
        </p>
        <a className="cta" href="#">
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
