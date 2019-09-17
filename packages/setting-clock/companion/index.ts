import { settingsStorage } from "settings";
import * as messaging from "messaging";

settingsStorage.onchange = (evt: StorageChangeEvent): void => {
    console.log(`onchange ${evt}`);
};
