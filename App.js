import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, View, Text } from "react-native";
import placeholder from "./assets/background.jpg";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react";
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

export default function App() {
  const imageRef = useRef();
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const onReset = () => {
    setshowAppoption(false);
  };
  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  const onSaveImageAsync = async () => {
    try {
      const localURL = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });
      await MediaLibrary.saveToLibraryAsync(localURL);
      if (localURL) {
        console.log("saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSetselectedImage] = useState(null);
  const [showAppoption, setshowAppoption] = useState(false);

  if (status === null) {
    requestPermission();
  }
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSetselectedImage(result.assets[0].uri);
      setshowAppoption(true);
    } else {
      console.log("error");
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerLabel}>EmojiFy</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.imageStyles}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer
              placeholder={placeholder}
              selectedImage={selectedImage}
            />
            {pickedEmoji && (
              <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
            )}
          </View>
        </View>
        {showAppoption ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton
                icon="save-alt"
                label="Save"
                onPress={onSaveImageAsync}
              />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button
              theme="primary"
              label="Choose a photo"
              onPress={pickImageAsync}
            />
            <Button
              label="Use this picture"
              onPress={() => setshowAppoption(true)}
            />
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onclose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
        <StatusBar style="dark" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  headerLabel: {
    color: "#fff",
    fontSize: 52,
    fontWeight: "400",
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyles: {
    flex: 1,
    paddingTop: 18,
    marginTop: 50,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
