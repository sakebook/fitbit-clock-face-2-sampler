import document from "document";
import clock, { TickEvent } from "clock";

const clockText = document.getElementById("clock");

function zeroPad(i: number): string {
    if (i < 10) {
        return `0${i}`;
    }
    return `${i}`;
}

function onTick(evt: TickEvent): void {
    const hours = evt.date.getHours();
    const minutes = evt.date.getMinutes();
    const seconds = evt.date.getSeconds();
    clockText.text = `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
}

clock.granularity = "seconds";
clock.ontick = (evt: TickEvent): void => onTick(evt);
