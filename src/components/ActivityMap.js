import React from 'react';
import './ActivityMap.css';
import polyline from '@mapbox/polyline';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';

class ActivityMap extends React.Component {
  render() {
    const position = this.props.position || [51.505, -0.09];
    const polyData = this.props.polyline ? polyline.decode(this.props.polyline) : [];

    return (
      <div>
        <Map center={position} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {polyData && <Polyline positions={polyData} color="blue" />}
          <Marker position={position}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
          </Marker>
        </Map>
      </div>
    );
  }

}

export default ActivityMap;
