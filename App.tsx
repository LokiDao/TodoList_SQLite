import DialogManager from "@app/components/UI/DialogManager";
import store from "@app/stores";
import { config, lightTheme } from "@app/themes";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import MainApp from "./src";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <NativeBaseProvider theme={lightTheme} config={config}>
            <MainApp />
            <StatusBar />
            <DialogManager />
          </NativeBaseProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
