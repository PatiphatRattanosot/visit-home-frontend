import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

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
              defaultZoom={6}
              gestureHandling="greedy"
              disableDefaultUI={true}
              onClick={handleMapClick}
            >
              {/* School Marker */}
              <AdvancedMarker position={schoolLocation}>
                <Pin
                  background="#3b82f6" // Blue
                  glyphColor="white"
                  borderColor="white"
                />
              </AdvancedMarker>

              {/* Student-selected Marker */}
              {latValue && lngValue && (
                <AdvancedMarker position={{ lat: latValue, lng: lngValue }}>
                  <Pin
                    background="#16a34a" // Green
                    glyphColor="white"
                    borderColor="white"
                  />
                </AdvancedMarker>
              )}
            </Map>
          </APIProvider>
        </div>

        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button className="btn-red">ยกเลิก</button>
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
