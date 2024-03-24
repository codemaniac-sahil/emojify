import { StyleSheet, Image } from "react-native";

function ImageViewer({ placeholder, selectedImage }) {
  const imageHolder = selectedImage ? { uri: selectedImage } : placeholder;
  return <Image source={imageHolder} style={styles.image} />;
}
const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
export default ImageViewer;
