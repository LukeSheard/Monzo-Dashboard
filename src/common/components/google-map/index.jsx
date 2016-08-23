import React, {
  Component,
  PropTypes,
} from 'react';

import GoogleMap from 'google-map-react';
import Marker from './marker';

export default class GoogleMapView extends Component {
  static propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }

  render() {
    const {
      lat,
      lng,
      zoom,
    } = this.props;

    return (
      <GoogleMap
        bootstrapURLKeys={{
          key: process.env.GOOGLE_API_KEY,
        }}
        center={{
          lat,
          lng,
        }}
        draggable={false}
        options={{
          panControl: false,
          mapTypeControl: false,
          scrollwheel: false,
        }}
        style={{
          height: '120px',
        }}
        zoom={16 - zoom}
      >
        <Marker
          lat={lat}
          lng={lng}
        />
      </GoogleMap>
    );
  }
}
