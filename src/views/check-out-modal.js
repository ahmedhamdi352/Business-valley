import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../components/common/Button';
import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import Config from 'react-native-config';

const styles = StyleSheet.create({
  text: {
    color: '#14b90f',
  },
  modal: {
    flex: 1,
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '95%',
    height: 280,
    borderRadius: 5,
    backgroundColor: '#ffff',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#14b90f',
    backgroundColor: '#fffff',
    marginTop: 28,
  },
  cardField: {
    width: '100%',
    height: '50%',
  },
});

const CheckOut = ({isVisable, toggle, handleSuccess}) => {
  const {confirmPayment} = useStripe();

  const [clientKey, setClientKey] = useState('');
  const [loading, showLoading] = useState(false);

  useEffect(() => {
    fetch(`${Config.API_URL}create-payment-intent`, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(res => {
        setClientKey(res.clientSecret);
      });
  }, []);

  const handlePayment = async () => {
    showLoading(true);
    const {error} = await confirmPayment(clientKey, {
      type: 'Card',
      billingDetails: {
        email: 'ahmedhamdi352@gmail.com',
      },
    });
    if (error) {
      showLoading(false);
      Alert.alert('Payment Failed', error.message);
    } else {
      showLoading(false);
      handleSuccess();
    }
  };

  return (
    <StripeProvider
      publishableKey={Config.PUBLISHABLE_KEY}
      merchantIdentifier="merchant.identifier">
      <Modal
        visible={isVisable || false}
        swipeDirection={'down'}
        backdropOpacity={0.6}
        transparent={true}
        style={styles.modal}
        onRequestClose={() => {}}
        onBackdropPress={toggle}
        onSwipeComplete={() => () => {}}
        backdropTransitionOutTiming={0}
        onBackButtonPress={() => {}}>
        <View style={styles.container}>
          <CardField postalCodeEnabled={false} style={styles.cardField} />
          {!loading ? (
            <Button
              style={styles.button}
              label="Continue"
              styleLabel={styles.text}
              onPress={handlePayment}
            />
          ) : (
            <ActivityIndicator size="small" color="#0000ff" />
          )}
        </View>
      </Modal>
    </StripeProvider>
  );
};

export default CheckOut;
