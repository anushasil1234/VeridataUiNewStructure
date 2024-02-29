import twoDigits from "./two-digits";

const secondsToMinuteString = (seconds) => {

        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        minutes = twoDigits(minutes);
        remainingSeconds = twoDigits(remainingSeconds);
        if (minutes === 0) {
          return `00:${remainingSeconds}`;
        } else if (remainingSeconds === 0) {
          return `${minutes}:00`;
        } else {
          return `${minutes}:${remainingSeconds}`;
        }
}

export default secondsToMinuteString