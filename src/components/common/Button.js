import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(6.6),
    borderRadius: 2,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: wp(5),
    color: '#FFFFFF',
  },
});

const Button = ({style, label, onPress, styleLabel, icon, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.6}
      style={[styles.container, style]}
      onPress={onPress}>
      <Text style={{...styles.label, ...styleLabel}}>{label}</Text>
      {icon}
    </TouchableOpacity>
  );
};

export default Button;
