namespace we {
  export namespace ro {
    export function getNeighbour(num: number, interval: number) {
      if (interval === 0) {
        return [num];
      }

      const index = RACETRACK.indexOf(num);
      const lastElementIndex = RACETRACK.length - 1;
      let computedInterval = interval;

      if (lastElementIndex - computedInterval * 2 <= 0) {
        computedInterval = 18;
      }

      if (index < interval) {
        const diff = computedInterval - index;
        return RACETRACK.slice(RACETRACK.length - diff).concat(RACETRACK.slice(0, computedInterval + index + 1));
      }

      if (index + computedInterval > lastElementIndex) {
        const diff = index + computedInterval - lastElementIndex;
        return RACETRACK.slice(index - computedInterval).concat(RACETRACK.slice(0, diff));
      }

      return RACETRACK.slice(index - interval, index + computedInterval + 1);
    }
  }
}
