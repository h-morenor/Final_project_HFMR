import React, { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

const peoplearound = () => {
  

  function onPlaceSelect(value) {
    console.log(value);
  }

  function onSuggectionChange(value) {
    console.log(value);
  }

  function preprocessHook(value) {
    return `${value}, Munich, Germany`
  }

  function postprocessHook(feature) {
    return feature.properties.street;
  }

  function suggestionsFilter(suggestions) {
    const processedStreets = [];

    const filtered = suggestions.filter(value => {
      if (!value.properties.street || processedStreets.indexOf(value.properties.street) >= 0) {
        return false;
      } else {
        processedStreets.push(value.properties.street);
        return true;
      }
    })

    return filtered;
  }

  return <GeoapifyContext apiKey="178a21e11be94a9f8f92b2a0221c8ac5">

      <GeoapifyGeocoderAutocomplete
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
      />

      <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
        
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
      />

      <GeoapifyGeocoderAutocomplete
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
        preprocessHook={preprocessHook}
        postprocessHook={postprocessHook}
        suggestionsFilter={suggestionsFilter}
      />
    </GeoapifyContext>
}

export default peoplearound

/*
value={value}
        type={type}
        lang={language}
        position={position}
        countryCodes={countryCodes}
        limit={limit}
        filterByCountryCode={filterByCountryCode}
        filterByCircle={filterByCircle}
        filterByRect={filterByRect}
        filterByPlace={filterByPlace}
        biasByCountryCode={biasByCountryCode}
        biasByCircle={biasByCircle}
        biasByRect={biasByRect}
        biasByProximity={biasByProximity}
        */




///////
/* 3
import React, { Component } from "react";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { MapContainer, TileLayer } from "react-leaflet";
//import "./Map.css";

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
});

class MapComp extends Component {
  componentDidMount() {
    //const MapContainer = this.leafletMap.leafletElement;
    //const searchControl = new ELG.Geosearch().addTo(MapContainer);
    /*const results = new L.LayerGroup().addTo(MapContainer);

    searchControl.on("results", function(data) {
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
      }
    });*//*
  }



  render() {
    const center = [37.7833, -122.4167];
    return (
      <MapContainer
        style={{ height: "100vh" }}
        center={center}
        zoom="10"
        ref={m => {
          this.leafletMap = m;
        }}
      >
        <TileLayer
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
          url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />
        <div className="pointer" />
        
      </MapContainer>
    );
  }
}

export default MapComp;

*/


////////
/* 2

import Geocode from "react-geocode";


import React from 'react'

export default function people_around() {
  

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get address from latitude & longitude.
Geocode.fromLatLng("48.8583701", "2.2922926").then(
  (response) => {
    const address = response.results[0].formatted_address;
    console.log(address);
  },
  (error) => {
    console.error(error);
  }
);

// Get formatted address, city, state, country from latitude & longitude when
// Geocode.setLocationType("ROOFTOP") enabled
// the below parser will work for most of the countries
Geocode.fromLatLng("48.8583701", "2.2922926").then(
  (response) => {
    const address = response.results[0].formatted_address;
    let city, state, country;
    for (let i = 0; i < response.results[0].address_components.length; i++) {
      for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
        switch (response.results[0].address_components[i].types[j]) {
          case "locality":
            city = response.results[0].address_components[i].long_name;
            break;
          case "administrative_area_level_1":
            state = response.results[0].address_components[i].long_name;
            break;
          case "country":
            country = response.results[0].address_components[i].long_name;
            break;
        }
      }
    }
    console.log(city, state, country);
    console.log(address);
  },
  (error) => {
    console.error(error);
  }
);

// Get latitude & longitude from address.
Geocode.fromAddress("Eiffel Tower").then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  (error) => {
    console.error(error);
  }
);

return (
    <div>people_around</div>
  )
}
/*


/* 1

import React from 'react'
import marker from "../../assets/person-fill.svg"
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Map, useMap } from "react-leaflet";
import usersData from "../Data/userData.json"

export default function AccessPage() {

  
  function View({ center }) {
  const map = useMap()
  map.setView(center)
  return null
}

const icon = new L.icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [46, 56]
  })

 /* setLat(data.location.lat)
    setLong(data.location.lng)*/

   /* 
    const show = () => {
        usersData.map(user => {   
            console.log("hola")
            console.log(user.address.geo.lat)
            console.log( user.address.geo.lng)
        }
    )}

    show()


const lat = 37.38605
const lng = -122.08385






  return (
    <div>
      <div id="map" >
      <MapContainer center={[51.505, -0.09]} zoom={15} scrollWheelZoom={true}>
        <View center={[51.505, -0.09]} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[51.505, -0.09]}></Marker> 

      {  usersData.map(user => (    
        <Marker key={user.id} position={[user.address.geo.lat, user.address.geo.lng]}>
          <Popup position={[user.address.geo.lat, user.address.geo.lng]}>
            <div>
              <h1>{user.username}</h1>
            </div>
          </Popup>
          
        </Marker>     
        ))}

      </MapContainer>
            
    </div>
    
    </div>
  )
}

*/
