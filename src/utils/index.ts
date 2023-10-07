export function assertValidDate(d: Date): asserts d is Date {
  if (!(d instanceof Date) || isNaN(d.getTime()))
    throw new Error("Invalid Date");
}
