import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { shallow } from 'zustand/shallow';

import { enableScreens } from 'react-native-screens';
// import { useStore } from '../stores/store';
import Navigation from '../navigation';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { Text, View } from 'react-native';

function App(): JSX.Element {
  const [lastEventType, setLastEventType] = React.useState('');

  const [queryClient] = useState(() => new QueryClient());
  console.log(queryClient, ' => QUERYCLIENT (app/index.tsx)');

  enableScreens(true);
  const [initializing, setInitializing] = useState(true);

  // const { checkUser } = useStore(
  //   (state) => ({
  //     checkUser: state.checkUser,
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

  // if (initializing) {
  //   return <></>;
  // }
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
