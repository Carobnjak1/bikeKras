import React from "react";
import FirebaseContext from "../../firebase/context";
import TrailItem from "./TrailItem";
import Loader from "../Loader";

function TrailList(props) {
  const { firebase } = React.useContext(FirebaseContext);
  const [trails, setTrails] = React.useState([]);

  React.useEffect(() => {
    getTrails();
  }, []);

  function getTrails() {
    firebase.db.collection("trails").onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const trails = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setTrails(trails);
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Kolesarske poti</h1>
      <p className="lead">
        <i className="fas fa-directions"></i> Preglej in raziskuj!
      </p>
      <div className="profiles">
        {trails.length > 0 ? (
          trails.map((trail) => <TrailItem key={trail.id} trail={trail} />)
        ) : (
          <div style={{ textAlign: "center", marginTop: "10rem" }}>
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
}

export default TrailList;
