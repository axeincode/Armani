"use client";
import { useState, FC } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { isEmpty } from "lodash";
import { LatLng } from "leaflet";

export const ChangeView = ({ center }: { center: LatLng }) => {
  const map = useMap();
  map.flyTo(center, map.getZoom());
  return null;
};

interface MapProps {
  data: LatLng;
  callBack: (value: Record<string, number>) => void;
}

function LocationMarker(props: MapProps) {
  const { data, callBack } = props;
  const initData = isEmpty(data) ? null : data;
  const [position, setPosition] = useState(initData);
  const map = useMapEvents({
    click(e: any) {
      console.log("latlng:::", e.latlng);
      setPosition(e.latlng);
      callBack(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export const Map = (props: MapProps) => {
  const center = { lat: 51.505, lng: -0.09 };

  return (
    // @ts-ignore
    <MapContainer center={center} zoom={10} className="h-full w-full">
      {/* @ts-ignore */}
      <ChangeView center={center} zoom={10} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // @ts-ignore
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker {...props} />
    </MapContainer>
  );
};
