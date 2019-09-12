import * as messaging from "messaging";
import { me } from "companion";

const API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";

function createQuery(): string {
  return (
    ENDPOINT +
    "?q=Tokyo,jp" +
    "&units=metric" +
    "&lang=ja" +
    `&APPID=${API_KEY}`
  );
}

function returnWeatherData(data: { temperature: number }): void {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    messaging.peerSocket.send(null);
    console.log("Error: Connection is not open");
  }
}

function fetchWeatherCompanion(): void {
  if (!me.permissions.granted("access_internet")) {
    console.log("We're allowed to access the internet!");
    returnWeatherData(null);
    return;
  }
  fetch(createQuery())
    .then(response => {
      response.json().then(data => {
        const weather: { temperature: number } = {
          temperature: data["main"]["temp"] as number
        };
        returnWeatherData(weather);
      });
    })
    .catch(err => {
      returnWeatherData(null);
    });
}

messaging.peerSocket.onmessage = (evt: MessageEvent): void => {
  if (evt.data && evt.data.command == "weather") {
    fetchWeatherCompanion();
  }
};
