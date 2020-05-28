import React from "react";
import FirebaseContext from "../../firebase/context";
import XMLParser from "react-xml-parser";
import { Map, TileLayer, Polyline } from "react-leaflet";
import "./Map.css";
import { FilePond } from "react-filepond";
import Loader from "../Loader";
import DownloadLink from "react-download-link";

import "filepond/dist/filepond.min.css";

function TrailDetail(props) {
  const { firebase, user } = React.useContext(FirebaseContext);
  const [trail, setTrail] = React.useState(null);
  const [files, setFiles] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [currentImg, setCurrentImg] = React.useState(null);
  const [trailGPX, setTrailGPX] = React.useState(null);
  const trailId = props.match.params.id;

  React.useEffect(() => {
    getImages();
    getTrail();
  }, []);

  function getTrail() {
    const linkRef = firebase.db.collection("trails").doc(trailId);
    linkRef.get().then((doc) => {
      const jsonTest = new XMLParser().parseFromString(doc.data().gpx);
      const GPXtest = jsonTest.getElementsByTagName("trkpt");

      var newArr = GPXtest.map(function (item) {
        return [item.attributes.lat, item.attributes.lon];
      });
      setTrail({ ...doc.data() });
      setTrailGPX(newArr);
    });
  }

  function getImages() {
    const storageRef = firebase.storage.ref();
    storageRef
      .child(`${trailId}/`)
      .listAll()
      .then(function (result) {
        result.items.forEach(function (imageRef) {
          imageRef
            .getDownloadURL()
            .then(function (url) {
              setImages((prevFiles) => [...prevFiles, url]);
              setCurrentImg(url);
            })
            .catch(function (error) {
              // Handle any errors
            });
        });
      });
  }

  function handleUpload() {
    if (files.length !== 0) {
      for (var i = 0; i < files.length; i++) {
        var imageFile = files[i];

        uploadImageAsPromise(imageFile);
      }
    }
  }

  function uploadImageAsPromise(imageFile) {
    return new Promise(function (resolve, reject) {
      const storageRef = firebase.storage.ref();

      //Upload file
      const task = storageRef
        .child(`${trailId}/` + imageFile.file.name)
        .put(imageFile.file);

      //Update progress bar
      task.on(
        "state_changed",
        function progress(snapshot) {},
        function error(err) {},
        function complete() {
          task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            setImages((prevFiles) => [...prevFiles, downloadURL]);
          });
        }
      );
    });
  }

  function handleCurrentImg(event) {
    setCurrentImg(event);
  }

  if (trail === null || trailGPX === null || images === null) {
    return (
      <div style={{ textAlign: "center", marginTop: "10rem" }}>
        <Loader />
      </div>
    );
  } else {
    return (
      <section className="container">
        <div className="profile-grid my-1">
          <div className="profile-top bg-primary">
            <Map center={trailGPX[0]} zoom={11}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Polyline positions={trailGPX} />
            </Map>
          </div>

          <div className="profile-about bg-light p-2">
            <h2 className="text-primary">{trail.title}</h2>
            <p>{trail.text}</p>
            <div className="line"></div>
            <h2 className="text-primary">Kraji na poti</h2>
            <div className="skills">
              {trail.locationsDB.map((location, index) => (
                <div key={index} className="p-1">
                  <i className="fas fa-check"></i> {location}
                </div>
              ))}
            </div>
            <div className="line"></div>
            <h2 className="text-primary">Informacije</h2>
            <div className="skills">
              <div className="p-1">
                <i className="far fa-clock mr"></i>Čas: {trail.time}h
              </div>
              <div className="p-1">
                <i className="fas fa-globe-europe mr"></i>Dolžina:{" "}
                {trail.length}km
              </div>
              <div className="p-1">
                <DownloadLink
                  label="Prenesi GPX datoteko poti"
                  filename={`${trail.title}.gpx`}
                  exportFile={() => trail.gpx}
                />
              </div>
            </div>
          </div>
          <div className="profile-github">
            <h2 className="text-primary my-1">
              <i className="fas fa-camera-retro"></i> Galerija
            </h2>
            {user ? (
              <>
                <FilePond
                  files={files}
                  allowMultiple={true}
                  onupdatefiles={setFiles}
                  labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
                <button
                  className="btn btn-primary mg-top-1"
                  onClick={handleUpload}
                >
                  Upload Images
                </button>{" "}
              </>
            ) : (
              ""
            )}
          </div>

          {images.length > 0 ? (
            <>
              <div className="container-img">
                <div className="main-img">
                  <img src={currentImg} alt="" />
                </div>

                <div className="imgs">
                  {images.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt=""
                      onClick={() => handleCurrentImg(image)}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </section>
    );
  }
}

export default TrailDetail;
