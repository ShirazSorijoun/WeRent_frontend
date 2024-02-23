const GoogleMapComponent = () => {
  return (
    <iframe
      src="https://moch.maps.arcgis.com/apps/webappviewer/index.html?id=d6191754d18a4fd29ee2e2ca1d040759"
      width="800"
      height="600"
      style={{ border: 0 }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default GoogleMapComponent;
