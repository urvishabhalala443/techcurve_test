import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import imageConstants from '../../helper/imageConstants';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import colors from '../../utils/colors';
import BottomComponet from '../../components/BottomComponet';
import {Lyric} from 'react-native-lyric';
import Slider from 'react-native-slider';
import {tracks} from '../../helper/songConstant';

const lrcText = `[length:03:38.59] 
[00:00.10].......
[00:08.95]Main Teri Aankhon Mein 
[00:11.08]Udaasi Kabhi Dekh Sakda Nahi 
[00:14.81]Tujhe Khush Main Rakhunga Sohneya 
[00:19.22]Main Tere Hothon Pe 
[00:20.82]Khamoshi Kabhi Dekh Sakda Nahi 
[00:24.82]Saari Baatein Main Sununga Sohneya 
[00:29.87]Tere Dil Se Na Kabhi Khelunga 
[00:34.65]Saare Raaz Apne Main Tujhko De Doonga 
[00:39.42]Meri Jaan Toone Mujhko Paagal Hai Kiya 
[00:44.74]Mera Lagda Na Jiya Tere Bagair 
[00:48.72]Tu Maan Meri Jaan
[00:51.11]Main Tujhe Jaane Na Doonga 
[00:53.51]Main Tujhko Apni Baahon Mein 
[00:56.44]Chhupa Ke Rakhunga
[00:58.83]Tu Maan Meri Jaan
[01:01.48]Main Tujhe Jaane Na Doonga 
[01:04.14]Main Tujhko Apni Aankhon Mein 
[01:06.80]Basa Ke Rakhunga
[01:08.92]Tu Maan Meri Jaan
[01:18.76]Tu Maan Meri Jaan
[01:29.13]Tu Maan Meri Jaan
[01:36.04]Main Saya Banke Saath Tere 
[01:39.37]Rehna 24 Ghante
[01:41.50]Main Rehna 24 Ghante
[01:43.89]Tere Bina Dil Lagda Nahi
[01:45.62]Main Aankhon Se Chura Loon Jaana 
[01:49.33]Tere Jo Bhi Gham The
[01:51.47]Haaye Tere Jo Bhi Gham The 
[01:53.51]Tere Bina Dil Lagta Nahi
[01:55.31]Meri Baahon Mein Aake
[01:57.70]Tu Jaana Nahi
[02:00.09]Aisi Rabb Se Main Maangu Dua 
[02:07.00]Tere Dil Se Na Kabhi Khelunga 
[02:12.06]Saare Raaz Apne Main Tujhko De Doonga 
[02:17.10]Meri Jaan Toone Mujhko Paagal Hai Kiya 
[02:21.94]Mera Lagda Na Jiya Tere Bagair 
[02:26.44]Tu Maan Meri Jaan
[02:28.83]Main Tujhe Jaane Na Doonga 
[02:30.96]Main Tujhko Apni Baahon Mein 
[02:33.91]Chhupa Ke Rakhunga
[02:36.57]Tu Maan Meri Jaan
[02:38.98]Main Tujhe Jaane Na Doonga 
[02:41.37]Main Tujhko Apni Aankhon Mein 
[02:44.03]Basa Ke Rakhunga
[02:46.42]Tu Maan Meri Jaan 
[02:56.80]Tu Maan Meri Jaan 
[03:02.12]Tu Maan Meri Jaan 
[03:04.23]Maan Meri Jaan 
[03:06.63]Tu Maan Meri Jaan 
[03:11.77].......`;

const MusicPlayerScreen = () => {
  const {position, duration} = useProgress();
  const [play, setPlay] = useState(true);

  const setUpTrackPlayer = async () => {
    try {
      Platform.OS === 'android' &&
        TrackPlayer.updateOptions({
          stopWithApp: false,
          capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
          ],
          compactCapabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
          ],
        });
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
    } catch (e) {}
  };
  useEffect(() => {
    setUpTrackPlayer();
  }, []);

  const lineRenderer = useCallback(({lrcLine: {content}, index, active}) => {
    return (
      <Text
        style={[
          styles.lyricsText,
          {
            color: active ? colors.activeLyrics : colors.inActiveLyrics,
            fontSize: active ? 20 : 15,
          },
        ]}>
        {content}
      </Text>
    );
  }, []);

  useEffect(() => {
    if (position >= duration) {
      setPlay(!play);
    }
  }, [position, duration]);

  const millisToMinutesAndSeconds = millis => {
    var minutes = Math.floor(millis / 60);
    var seconds = (millis % 60).toFixed(0);

    if (Platform.OS === 'android' && minutes === -1) {
      return '0:00';
    } else {
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        bottomImage={imageConstants.homeHeader}
        points={'0 PTS'}
        headerContainer={styles.headerContainer}
      />
      <View style={styles.waveView}>
        <Image
          source={imageConstants.wave}
          style={styles.waveImage}
          resizeMode="contain"
        />
        <Slider
          animateTransitions={true}
          animationType="spring"
          minimumValue={0}
          maximumValue={duration.toFixed(2) / 60}
          value={position / 60}
          thumbTouchSize={{width: 300, height: 40}}
          minimumTrackTintColor={colors.activeLyrics}
          maximumTrackTintColor={colors.sliderColor}
          thumbTintColor="transparent"
          onValueChange={async value => {
            await TrackPlayer.seekTo(value * 60);
          }}
          style={styles.sliderStyle}
          trackStyle={styles.trackStyle}
        />
        <View style={styles.seekBarStyle}>
          <Text style={styles.timeText}>
            {millisToMinutesAndSeconds(position)}
          </Text>
          <Text style={styles.timeText}>
            - {millisToMinutesAndSeconds(duration - position)}
          </Text>
        </View>
      </View>

      <View style={styles.lyricsView}>
        <Lyric
          height={250}
          showsVerticalScrollIndicator={false}
          lrc={lrcText}
          autoScroll={true}
          currentTime={position * 1000}
          lineRenderer={lineRenderer}
          lineHeight={40}
        />
      </View>
      <View style={styles.bottomMainContainer}>
        <View style={styles.bottomContainer}>
          <View
            style={[
              styles.rowView,
              {justifyContent: 'space-between', marginHorizontal: 20},
            ]}>
            <View style={[styles.rowView]}>
              <Image source={imageConstants.image} style={styles.imageStyle} />
              <View style={styles.songTextView}>
                <Text style={styles.bottomText}>Maan Meri Jaan...</Text>
                <Text style={styles.bottomSubText}>King</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Image
                source={imageConstants.like}
                style={styles.likeImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <BottomComponet
            playStyle={!play ? styles.playImage : styles.pauseImage}
            onPlay={() => {
              setPlay(!play);
              if (!play) {
                TrackPlayer.play();
              } else {
                TrackPlayer.pause();
              }
            }}
            playImage={!play ? imageConstants.play : imageConstants.pause}
            onReplay={() => {
              TrackPlayer.seekTo(0);
              setPlay(play);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  textStyle: {
    color: colors.primaryBlack,
    fontSize: 18,
  },
  image: {
    height: 30,
    width: 30,
  },
  leftContainerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  middleContainerView: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  bottomContainer: {
    width: '100%',
    bottom: -10,
  },
  imageStyle: {
    height: 47,
    width: 47,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  likeImage: {
    height: 24,
    width: 24,
  },
  bottomText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.inActiveLyrics,
    fontFamily: 'Poppins-Medium',
  },
  bottomSubText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.primaryBlack,
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
  lyricsText: {
    textAlign: 'center',
    marginVertical: 5,
    fontFamily: 'Poppins-Medium',
  },
  waveImage: {
    height: 135,
    width: '100%',
  },
  timeText: {
    color: colors.primaryBlack,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  headerContainer: {
    marginTop: 10,
  },
  waveView: {
    flex: 1,
    marginTop: 16,
  },
  sliderStyle: {
    marginVertical: Platform.OS === 'ios' ? -32 : -30,
  },
  trackStyle: {
    height: 5,
  },
  seekBarStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
  },
  lyricsView: {
    flex: 2,
    paddingTop: 20,
  },
  bottomMainContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  songTextView: {
    marginLeft: 16,
  },
});
