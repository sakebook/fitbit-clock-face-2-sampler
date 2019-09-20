import document from "document";
import { inbox } from "file-transfer";
import * as fs from "fs";

const SETTINGS_FILE = "settings.txt";
const SETTINGS_FILE_FORMAT = "utf-8";
const imageBackground = document.getElementById(
  "imageBackground"
) as ImageElement;

function loadImageName(): string {
  let imageName;
  try {
    imageName = fs.readFileSync(SETTINGS_FILE, SETTINGS_FILE_FORMAT);
  } catch (ex) {}
  return imageName;
}

function cleanFiles(imageName: string) {
    const listDir = fs.listDirSync("/private/data");
    do {
        const dirIter = listDir.next();
        if (dirIter.done) {
            break;
        }
        if (dirIter.value == SETTINGS_FILE || dirIter.value == imageName) {
            continue;
        }
        fs.unlinkSync(dirIter.value);
    } while (true);
}

let imageName = loadImageName();
if (imageName) {
    cleanFiles(imageName);
  imageBackground.href = `/private/data/${imageName}`;
}
const listDir = fs.listDirSync("/private/data");
do {
    const dirIter = listDir.next();
    if (dirIter.done) {
        break;
    }
    console.log(dirIter.value);
} while (true);

inbox.onnewfile = () => {
  let fileName;
  do {
    fileName = inbox.nextFile();
    console.log(`fileName: ${fileName}`);
    if (fileName) {
      imageBackground.href = `/private/data/${fileName}`;
      fs.writeFileSync(SETTINGS_FILE, fileName, SETTINGS_FILE_FORMAT);
      cleanFiles(fileName)
    }
  } while (fileName);
};
