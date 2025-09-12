import {
  APIProvider,
  Map,
  Marker,
  useMarkerRef,
} from "@vis.gl/react-google-maps";
import { getUserLocation } from "../../utils/map";

const MapComponent = ({ setFieldValue, latValue, lngValue }) => {
  const schoolLocation = { lat: 13.69703951249812, lng: 99.92571777851592 };

  const handleMapClick = (event) => {
    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;

    // Update Formik state
    setFieldValue("lat", lat);
    setFieldValue("lng", lng);
  };

  return (
    <dialog id="map_modal" className="modal">
      <div className="modal-box w-full max-w-7xl">
        <h3 className="font-bold text-lg mb-4">กรุณาเลือกตำแหน่ง</h3>

        <div className="w-full h-[60vh] rounded overflow-hidden">
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
              style={{ width: "100%", height: "100%" }}
              defaultCenter={schoolLocation}
              defaultZoom={17}
              gestureHandling="greedy"
              disableDefaultUI={true}
              onClick={handleMapClick}
            >
              {/* Controls */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                <button
                  type="button"
                  onClick={() => {
                    getUserLocation(setFieldValue);
                  }}
                  className="btn btn-sm btn-primary"
                >
                  ใช้ตำแหน่งปัจจุบัน
                </button>
              </div>
              {latValue && lngValue && (
                <Marker
                  position={{ lat: latValue, lng: lngValue }}
                  ref={useMarkerRef()}
                />
              )}
            </Map>
          </APIProvider>
        </div>

        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button
              className="btn-red"
              type="button"
              onClick={() => {
                setFieldValue("lat", "");
                setFieldValue("lng", "");
                document.getElementById("map_modal").close();
              }}
            >
              ยกเลิก
            </button>
            <button
              type="button"
              className="btn-green"
              onClick={() => document.getElementById("map_modal").close()}
            >
              บันทึก
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default MapComponent;
