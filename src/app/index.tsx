import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { shallow } from 'zustand/shallow';
// import {useTVEventHandler} from 'react-native';
import { enableScreens } from 'react-native-screens';
import { useStore } from '../stores/store';
import Navigation from '../navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Text, View } from 'react-native';

function App(): JSX.Element {
  const [lastEventType, setLastEventType] = React.useState('');

  const [queryClient] = useState(() => new QueryClient());
  enableScreens(true);
  const [initializing, setInitializing] = useState(true);
  // const { checkUser, user } = useStore(
  //   (state) => ({
  //     checkUser: state.checkUser,
  //     user: state.authUser,
  //   }),
  //   shallow,
  // );

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await checkUser();
  //       setInitializing(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [checkUser]);

  // const myTVEventHandler = (evt: {eventType: React.SetStateAction<string>}) => {
  //   setLastEventType(evt.eventType);
  //   console.log(evt, 'EVENT');
  // };
  // console.log(lastEventType);
  // useTVEventHandler(myTVEventHandler);

  // if (initializing) {
  //   return <></>;
  // }
  return (
    // <View>
    //   <Text style={{ color: 'white' }}>Hello world</Text>
    // </View>
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Navigation />
        {/* <View>
          <Text style={{ color: 'white' }}>Hello world</Text>
        </View> */}
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
