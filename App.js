import React, {useState, useEffect, useCallback} from "react";

import { Text, View, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { Images, articles, argonTheme } from "./constants";

import * as Font from 'expo-font';


// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default props => {
  const [isLoadingComplete, setLoading] = useState(false);
  
  let customFonts = {
    'ArgonExtra': require('./assets/font/argon.ttf'),
  };
  

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(customFonts);

        await Promise.all([...cacheImages(assetImages)]);

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setLoading(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isLoadingComplete) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isLoadingComplete]);

  if (!isLoadingComplete) {
    return null;
  }
    return (

     
      <NavigationContainer>
        <GalioProvider theme={argonTheme}>
          <Block flex  onLayout={onLayoutRootView}>
            <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>

    );
    // return (
    //   <NavigationContainer onLayout={onLayoutRootView}>
    //     <GalioProvider theme={argonTheme}>
    //       <Block flex>
    //         <Screens />
    //       </Block>
    //     </GalioProvider>
    //   </NavigationContainer>
    // );

}