import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import imageConstants from '../helper/imageConstants';
import colors from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const BottomComponet = ({onPlay, playImage, playStyle, onReplay}) => {
  return (
    <View style={styles.bottomView}>
      <View style={styles.leftContainerView}>
        <TouchableOpacity>
          <Image
            source={imageConstants.musicPlayer}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={imageConstants.setting}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainerView}>
        <TouchableOpacity style={styles.middleBtnStyle} onPress={onPlay}>
          <LinearGradient
            colors={[
              colors.gradientColorOne,
              colors.gradientColorTwo,
              colors.gradientColorThree,
              colors.gradientColorFour,
              colors.gradientColorFive,
            ]}
            style={styles.middleBtnStyle}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Image source={playImage} style={playStyle} resizeMode="contain" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainerView}>
        <TouchableOpacity onPress={onReplay}>
          <Image
            source={imageConstants.replay}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={imageConstants.check}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomComponet;

const styles = StyleSheet.create({
  bottomView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  leftContainerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  middleContainerView: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  middleBtnStyle: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playImage: {
    height: 40,
    width: 40,
  },
  pauseImage: {
    height: 30,
    width: 30,
  },
  image: {
    height: 30,
    width: 30,
  },
});
