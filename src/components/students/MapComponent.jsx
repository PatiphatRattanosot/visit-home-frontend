import { APIProvider, Map } from "@vis.gl/react-google-maps";

const MapComponent = () => {
  return (
    <dialog id="map_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">กรุณาเลือกตำแหน่ง</h3>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map
            style={{ width: "50vw", height: "50vh" }}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          />
        </APIProvider>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button className="btn-red">ยกเลิก</button>
            <button type="button" className="btn-green">
              บันทึก
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default MapComponent;
