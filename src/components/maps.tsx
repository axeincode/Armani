// @ts-nocheck
// @ts-expect-error
"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export const Map = () => {
  const mapStyle = {
    width: "100%",
    height: "400px",
  };

  const center = [51.505, -0.09];

  return (
    <MapContainer center={center} zoom={13} style={mapStyle}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center} />
    </MapContainer>
  );
};
