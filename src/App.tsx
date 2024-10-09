import { FaChevronRight } from "react-icons/fa";
import "./App.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "./index.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getapi } from "./Slice";

interface MapUpdaterProps {
  lat: number;
  lng: number;
}

function MapUpdater({ lat, lng }: MapUpdaterProps) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);

  return null;
}

function App() {
  const data = useSelector((store: any) => store?.data);
  const loading = useSelector((store: any) => store?.loading);
  const error = useSelector((store: any) => store?.error);

  const [ipAddress, setIpdrress] = useState<string>("");
  const dispatch = useDispatch<any>();

  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const handleClick = () => {
    if (ipAddress) {
      dispatch(getapi(ipAddress));
      setIpdrress("");
    }
  };

  return (
    <div>
      <div className="div1">
        <h1>IP Address Tracker</h1>
        <div>
          <input
            value={ipAddress}
            onChange={(e) => setIpdrress(e.target.value)}
            className="div1_input"
            placeholder="Search For Any IP Address Or Domain"
          />
          <button className="div1_btn" onClick={handleClick}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      {error && <p>Error fetching data: {error}</p>}
      {loading && <p>Loading...</p>}

      {data?.location ? (
        <div className="div2">
          <MapContainer
            className="leaflet_container"
            center={[data.location.lat, data.location.lng]}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution={attribution}
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[data.location.lat, data.location.lng]}>
              <Popup>
                Location: {data.location.city}, {data.location.region},{" "}
                {data.location.country}.
              </Popup>
            </Marker>

            <MapUpdater lat={data.location.lat} lng={data.location.lng} />
          </MapContainer>
        </div>
      ) : (
        <div className="div3">Enter the Cordinates Above To get the Data</div>
      )}
      <div className="div4">
        <div className="div5">
          <h4 className="h4">Ip Address</h4>
          <h2>{data?.ip}</h2>
        </div>

        <div className="div5">
          <h4 className="h4">Location</h4>
          <h3>{data?.location?.region}</h3>
        </div>
        <div className="div5">
          <h4 className="h4">City</h4>
          <h2>{data?.location?.city}</h2>
        </div>
        <div>
          <h4 className="h4">ISP</h4>
          <h2>{data?.isp}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
