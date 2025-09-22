import React from "react";
import {
  Map,
  APIProvider,
  Marker,
  useMarkerRef,
} from "@vis.gl/react-google-maps";

const ViewMap = ({ lat, lng }) => {
  const homeLocation = { lat, lng };
  return (
    <div className="w-full h-[60vh] rounded overflow-hidden">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={homeLocation}
          defaultZoom={17}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <Marker position={homeLocation} ref={useMarkerRef()} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default ViewMap;
