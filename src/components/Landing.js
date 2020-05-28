import React from "react";
import { Link } from "react-router-dom";

import bike from "../styles/bike-landing.png";
import kras from "../styles/kras2.jpg";

function Landing() {
  return (
    <>
      <div className="top">
        <section id="welcome" className="grid">
          <div className="welcome-text">
            <h2>Kras Bike</h2>
            <h3>Seznam kolesarkih poti po krasu</h3>
            <p className="leading hide-sm">
              V barviti jeseni, mili zimi, cvetoči pomladi ali žgočem poletju,
              kolesarjenje po Krasu je vedno dobra ideja. Za vsakega se nekaj
              najde. Makadamske poti, asfaltne ceste, klanci, ovinki in ravnine
              – vse to nas vodi skozi tipične kraške vasice. Ta spletna stran je
              primerna za tiste, ki imajo Kras že v mezincu in tiste, ki bi se
              radi prvič zapeljali.
            </p>
            <Link to="/trails" className="btn btn-primary">
              Raziskuj poti
            </Link>
          </div>
          <div className="welcome-img">
            <img src={bike} alt="pic of bike" />
          </div>
        </section>
      </div>
      <section className="features grid">
        <div className="feature">
          <i className="fas fa-tree feature__icon"></i>
          <h4 className="heading-4  mb">Narava</h4>
          <p className="feature__text">
            Jesen je čas, ko Kras zaživi v svojih pravih barvah, ampak narava
            ponuja božanske razglede kolesarjem celo leto.
          </p>
        </div>
        <div className="feature">
          <i className="fas fa-sun feature__icon"></i>
          <h4 className="heading-4  mb">Bližina morja</h4>
          <p className="feature__text">
            Za piko na i po dnevu kolesarjenja svetujemo hiter skok v morje na
            Italijanski obali.
          </p>
        </div>
        <div className="feature">
          <i className="fas fa-directions feature__icon"></i>
          <h4 className="heading-4 mb">Turistična ponudba</h4>
          <p className="feature__text">
            Če Vas ne narava prepriča, Vas pa gotovo neskončna izbira
            turističnih kmetij in vinskih kleti in bogata kulturna dediščina, ki
            je s kolesom samo še bolj dostopna.
          </p>
        </div>
      </section>
      <section id="about-project">
        <div className="about-content grid">
          <div className="about-txt m-1">
            <p>
              Projekt Kras Bike je rezultat samostojnega dela ljubitelja
              kolesarjenja, ki živi na Krasu. V njem se je pojavila želja
              predstaviti kraške kolesarske poti širši Sloveniji in povabiti vse
              sebi podobne, da delijo svoje poti in fotografije.
            </p>
          </div>
          <div className="about-img m-1">
            <img src={kras} className="round-img-main" alt="Kras slika" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Landing;
