import { Popup, Marker } from "react-leaflet";
import { LatLng, type MarkerOptions } from "leaflet";
import { Icon } from "leaflet";
import type { MyIcon } from "~/types";

interface MarkerCompProps {
  showPopupOnOpen?: boolean;
  position: [number, number] | LatLng;
  popupContent?: React.ReactNode | string;
  eventHandlers?: Record<string, Function>;
  icon: MyIcon;
}

export default function MarkerPopup({
  position,
  popupContent,
  eventHandlers,
  icon,
}: MarkerCompProps) {

  return (
    <Marker
      position={position}
      icon={new Icon({iconUrl: icon.url, iconSize: icon.size})}
      eventHandlers={{
        ...eventHandlers,
      }}
    >
      <Popup >
        {popupContent}
      </Popup>
    </Marker>
  );
}
