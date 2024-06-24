import Reac,{useState, useEffect} from 'react';
import Navigation from './App/navigation/Navigation';
import { useLocationService } from './App/screens/home/views/LocationService';
import { UserLocationContext } from './App/screens/home/views/UserLocationContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useLocationService(setLocation, setErrorMsg);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <GestureHandlerRootView>
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <Navigation />
      </UserLocationContext.Provider>
    </GestureHandlerRootView>
  );
}