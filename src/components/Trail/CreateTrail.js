import React from "react";
import { Link } from "react-router-dom";
import useFormValidation from "../Auth/useFormValidation";
import FirebaseContext from "../../firebase/context";
import { withRouter } from "react-router";

const INITIAL_STATE = {
  difficulty: "",
  title: "",
  time: "",
  text: "",
  length: "",
  locations: [],
  GPXfile: null,
};

function CreateTrail(props) {
  const { firebase, user } = React.useContext(FirebaseContext);
  const { handleSubmit, handleChange, handleFile, values } = useFormValidation(
    INITIAL_STATE,
    handleCreateTrail
  );

  const { difficulty, title, time, length, locations, text, GPXfile } = values;

  function handleCreateTrail() {
    if (!user) {
      props.history.push("/login");
    } else {
      // upload file

      const file = GPXfile;
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;

        const locationsDB = locations
          .split(",")
          .map((location) => location.trim());

        const newTrail = {
          userId: user.uid,
          difficulty,
          title,
          time,
          text,
          length,
          locationsDB,
          gpx: content,
          created: Date.now(),
        };
        firebase.db
          .collection("trails")
          .add(newTrail)
          .then(function () {
            props.history.push("/trails");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      };
      reader.readAsText(file);
    }
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Dodaj novo pot</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Vnesite informacije in pomagajte drugim
      </p>
      <small>* = obvezna polja</small>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <select
            onChange={handleChange}
            value={values.difficulty}
            name="difficulty"
          >
            <option value="0">* Izberi težavnost</option>
            <option value="Easy">Lahko</option>
            <option value="Medium">Srednje</option>
            <option value="Hard">Zahtevno</option>
          </select>
          <small className="form-text">Ocenite težavnost poti</small>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            value={values.title}
            type="text"
            placeholder="Naslov"
            name="title"
            required
          />
          <small className="form-text">Ime poti</small>
        </div>
        <div className="form-group">
          <input type="file" onChange={handleFile} name="GPXfile" required />
          <small className="form-text">GPX datoteka</small>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            value={values.time}
            type="text"
            placeholder="Čas"
            name="time"
            required
          />
          <small className="form-text">Predviden čas</small>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            value={values.length}
            type="text"
            placeholder="Dolžina"
            name="length"
            required
          />
          <small className="form-text">Dolžina poti</small>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            value={values.locations}
            type="text"
            placeholder="Kraji na poti (npr. Miren, Komen, Sežana)"
            name="locations"
            required
          />
          <small className="form-text">
            Skozi katere kraje poteka pot ( loči z vejico )
          </small>
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange}
            value={values.text}
            placeholder="Opis poti"
            name="text"
          ></textarea>
          <small className="form-text">Povejte nam nekaj več</small>
        </div>
        <button type="submit" className="btn btn-primary my-1">
          Objavi
        </button>
        <Link className="btn btn-light my-1" to="/">
          Nazaj
        </Link>
      </form>
    </section>
  );
}

export default withRouter(CreateTrail);
