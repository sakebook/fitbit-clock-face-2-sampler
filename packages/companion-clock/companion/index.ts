import * as messaging from "messaging";
import { me } from "companion";
import { geolocation } from "geolocation";

const API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";

function createQuery(latitude: number, longitude: number): string {
  return (
    ENDPOINT +
    `?lat=${latitude}&lon=${longitude}` +
    "&units=metric" +
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

function isValidPermission(): boolean {
  if (!me.permissions.granted("access_internet")) {
    console.log("We're not allowed to access the internet!");
    return false;
  }
  if (!me.permissions.granted("access_location")) {
    console.log("We're not allowed to access the location!");
    return false;
  }
  return true;
}

function fetchWeatherCompanion(): void {
  geolocation.getCurrentPosition(
    (position: Position) => {
      fetch(createQuery(position.coords.latitude, position.coords.longitude))
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
    },
    err => {
      returnWeatherData(null);
    }
  );
}

messaging.peerSocket.onmessage = (evt: MessageEvent): void => {
  if (evt.data && evt.data.command == "weather") {
    if (!isValidPermission()) {
      returnWeatherData(null);
      return;
    }
    fetchWeatherCompanion();
  }
};
