import React, {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {StyleSheet, View, Alert} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Button from './src/components/common/Button';
import CheckOut from './src/views/check-out-modal';
import Images from './assets/images';

const styles = StyleSheet.create({
  container: {flex: 2},
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    marginTop: 40,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '98%',
    alignSelf: 'center',
  },
});

const App = () => {
  const [currentLocation, setCurrentLocation] = useState();
  const targetLocation = {
    latitude: 30.05719,
    longitude: 31.22167,
  };
  const [userPay, setPay] = useState(false);
  const [start, setStart] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

  const handlePayment = async () => {
    if (!userPay) {
      setShowCheckOut(true);
    } else {
      setStart(true);
      setCurrentLocation({...targetLocation});
    }
  };
  const handleSuccess = () => {
    setPay(true);
    setShowCheckOut(!showCheckOut);
  };

  const handleCloseModal = () => {
    setShowCheckOut(!showCheckOut);
  };

  const findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000000, maximumAge: 10000000},
    );
  };

  useEffect(() => {
    findCoordinates();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        mapType={'standard'}
        moveOnMarkerPress={false}
        style={styles.map}
        region={{
          latitude: 30.04442,
          longitude: 31.235712,
          latitudeDelta: 0.0111,
          longitudeDelta: 0.7,
        }}>
        {currentLocation && (
          <>
            {!start && (
              <>
                <Polyline
                  coordinates={[{...currentLocation}, {...targetLocation}]}
                  strokeColors={['#0000FF']}
                  strokeWidth={4}
                />
                <Marker coordinate={{...targetLocation}} />
              </>
            )}
            <Marker coordinate={{...currentLocation}} image={Images.car} />
          </>
        )}
        <Button
          label={userPay ? 'START' : 'PAY WITH STRIPE'}
          onPress={handlePayment}
          style={styles.btn}
        />
      </MapView>
      <CheckOut
        isVisable={showCheckOut}
        toggle={handleCloseModal}
        handleSuccess={handleSuccess}
      />
    </View>
  );
};

export default App;
