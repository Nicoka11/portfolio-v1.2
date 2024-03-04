export default class Utils {
  static lerp(a: number, b: number, n: number) {
    return (1 - n) * a + n * b;
  }

  static rangeMap(
    value: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number
  ) {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }
}
