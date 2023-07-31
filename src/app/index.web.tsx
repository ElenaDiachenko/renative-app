import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { enableScreens } from 'react-native-screens';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Text, View } from 'react-native';

function App(): JSX.Element {
  const [lastEventType, setLastEventType] = React.useState('');

  const [queryClient] = useState(() => new QueryClient());
  enableScreens(true);
  const [initializing, setInitializing] = useState(true);

  // }
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <View>
          <Text style={{ color: 'white' }}>Hello world! Web</Text>
        </View>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
