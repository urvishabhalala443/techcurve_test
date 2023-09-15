import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import imageConstants from '../helper/imageConstants';
import colors from '../utils/colors';

const Header = ({bottomImage, points, onBackPress, headerContainer}) => {
  return (
    <View style={[styles.container, {...headerContainer}]}>
      <TouchableOpacity style={styles.leftContainerView} onPress={onBackPress}>
        <Image
          source={imageConstants.arrow}
          style={styles.arrowImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.middleContainerView}>
        <View
          style={{
            borderRadius: 40,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 0,
          }}>
          <Image
            source={bottomImage}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.rightContainerView}>
        <Text style={styles.text}>{points}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerImage: {
    height: 35,
    width: 35,
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    justifyContent: 'space-between',
  },
  text: {
    color: colors.primaryBlack,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  leftContainerView: {
    flex: 1,
  },
  middleContainerView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainerView: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
