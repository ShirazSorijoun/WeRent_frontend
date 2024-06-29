const GoogleMapComponent = () => {
  return (
    <iframe
      id="ifrMap"
      width="800"
      height="600"
      style={{ border: 0 }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src="https://www.govmap.gov.il/map.html?bb=1&zb=1&in=1&c=167818.55,634749.67&z=7&lay=TABA_MSBS_ITM,ADD_PROJECTS_UR_MUCHRAZ,URBANRENEWAL_SETTLMENT"
    />
  );
};

export default GoogleMapComponent;
