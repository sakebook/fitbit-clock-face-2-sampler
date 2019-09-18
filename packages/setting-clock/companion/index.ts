import {settingsStorage} from "settings";
import * as messaging from "messaging";
import {me} from "companion";

const KEY_COLOR = "select_color";

settingsStorage.onchange = (evt) => {
    sendValue(evt.key, evt.newValue);
};

if (me.launchReasons.settingsChanged) {
    sendValue(KEY_COLOR, settingsStorage.getItem(KEY_COLOR));
} else {
    messaging.peerSocket.onopen = (evt) => {
        sendValue(KEY_COLOR, settingsStorage.getItem(KEY_COLOR));
    };
}

function sendValue(key: string, val: string) {
    if (val) {
        sendSettingData({
            key: key,
            value: JSON.parse(val)
        });
    }
}

function sendSettingData(data: { value: any; key: string }) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    }
}
