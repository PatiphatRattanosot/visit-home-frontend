export const getUserLocation = (setFieldValue) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFieldValue("lat", pos.coords.latitude);
        setFieldValue("lng", pos.coords.longitude);
      },
      (err) => {
        console.error("Error fetching geolocation:", err);
      }
    );
  }
};
