import { FaChevronRight } from "react-icons/fa";
import "./App.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./index.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getapi } from "./Slice";
function App() {
  const data = useSelector((store: any) => store?.data);
  console.log(data, "data");
  const [ipAddress, setIpdrress] = useState<any>("");
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const dispatch = useDispatch<any>();
  const handleClick = () => {
    if (ipAddress !== "" && ipAddress !== null && ipAddress !== undefined) {
      dispatch(getapi(ipAddress));
    }
  };

  return (
    <div>
      <div className="div1">
        <h1>IP Address Tracker</h1>
        <div>
          <input
            value={ipAddress}
            onChange={(e) => {
              setIpdrress(e.target.value);
            }}
            className="div1_input"
            placeholder="Search For Any IP Address Or Domain"
          />
          <button className="div1_btn" onClick={handleClick}>
            <FaChevronRight />
          </button>
        </div>
      </div>
      {data !== null && (
        <div className="div2">
          <MapContainer
            className="leaflet_container"
            center={[data?.location?.lat, data?.location?.lng]}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution={attribution}
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[data?.location?.lat, data?.location?.lng]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default App;
