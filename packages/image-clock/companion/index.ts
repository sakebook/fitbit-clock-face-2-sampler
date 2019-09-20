import { Image } from "image";
import { settingsStorage } from "settings";
import { device } from "peer";
import { outbox } from "file-transfer";

settingsStorage.setItem("screenWidth", `${device.screen.width}`);
settingsStorage.setItem("screenHeight", `${device.screen.height}`);

settingsStorage.onchange = (evt: StorageChangeEvent): void => {
  if (evt.key === "select_image") {
    compressAndTransferImage(evt.newValue);
  }
};

function compressAndTransferImage(settingsValue: string) {
  const imageData = JSON.parse(settingsValue);
  Image.from(imageData.imageUri)
    .then(image =>
      image.export("image/jpeg", {
        background: "#FFFFFF",
        quality: 40
      })
    )
    .then(buffer => outbox.enqueue(`${Date.now()}.jpg`, buffer))
}
