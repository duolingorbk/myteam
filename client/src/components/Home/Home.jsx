import React from 'react';
import "../Home/Home.css";

function Home() {
  return (
    <div className="container">
      <div className="header">
        <img
          alt="speakeasy logo"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/eEElFBiXezkNH0RojjIsHwrBqlptPleq7YSHuJDQIfFtc8fdC.jpg"
          width="100"
        />
        <div className="buttons">
          <a href="#">Apprends gratuitement</a>
          <a href="#">S'identifier</a>
        </div>
      </div>
      <div className="main-content">
        <h1>Parle une nouvelle langue en 10 minutes par jour</h1>
        <p>
          Fixe-toi des objectifs réalistes. Bénéficie de conseils de locuteurs
          natifs. Fais de réels progrès. Découvre un champ de possibilités en
          apprenant une autre langue.
        </p>
        <a className="cta-button" href="#">
          Apprends gratuitement
        </a>
        <div className="rating">
          <span>Excellent</span>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
          <span>16 364 avis sur</span>
          <span>Trustpilot</span>
        </div>
      </div>
      <div className="illustration">
        <div className="speech-bubble">Bonjour!</div>
        <img
          alt="Person with phone"
          height="100"
          src="https://storage.googleapis.com/a1aa/image/Q6l3AdDOffmFmUsumLalXG9dW05PJJ4bX0NYbX6fGn5ZOefdC.jpg"
          width="100"
        />
        <div className="speech-bubble">Hello!</div>
        <img
          alt="Person with laptop"
          height="100"
          src="https://storage.googleapis.com/a1aa/image/TcbJzwQqh1LsGBWbIu4duopyMAxb4FIJNcY8HVqxQybzxf3JA.jpg"
          width="100"
        />
        <div className="speech-bubble">Ciao!</div>
        <img
          alt="Person with phone"
          height="100"
          src="https://storage.googleapis.com/a1aa/image/Q6l3AdDOffmFmUsumLalXG9dW05PJJ4bX0NYbX6fGn5ZOefdC.jpg"
          width="100"
        />
        <div className="speech-bubble">你好</div>
      </div>
    </div>
  );
}

export default Home;