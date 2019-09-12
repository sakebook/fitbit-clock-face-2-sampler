import clock, { TickEvent } from "clock";
import document from "document";
import * as util from "../common/utils";
import { MessageEvent, ErrorEvent } from "messaging";
import * as messaging from "messaging";

const clockText = document.getElementById("clock");
const temperatureText = document.getElementById("temperature");

function onTick(evt: TickEvent): void {
  const hours = evt.date.getHours();
  const minutes = evt.date.getMinutes();
  clockText.text = `${util.zeroPad(hours)}:${util.zeroPad(minutes)}`;
}

clock.granularity = "minutes";
clock.ontick = (evt): void => onTick(evt);

messaging.peerSocket.onmessage = (evt: MessageEvent): void => {
  console.log(`peerSocket.onmessage ${evt.type}, ${evt.data}`);
  if (evt.data) {
    temperatureText.text = `${evt.data.temperature}°`;
  } else {
    temperatureText.text = `取得失敗`;
  }
};

function fetchWeather(): void {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({
      command: "weather"
    });
  }
}

messaging.peerSocket.onopen = (): void => {
  fetchWeather();
};

messaging.peerSocket.onerror = (evt: ErrorEvent): void => {
  temperatureText.text = `エラー`;
};

setInterval(fetchWeather, 60 * 1000 * 30);
