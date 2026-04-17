import { describe, expect, test } from "@jest/globals";
import { TimeSpan } from "../Lib/TimeSpan";

describe("Time Span", () => {
    test("Time Span from Milliseconds", function () {
        const dateStart = new Date(2022, 6, 21, 7, 0, 0, 0);
        const dateEnd = new Date(2022, 6, 21, 9, 30, 2, 0);
        const timeSpan = TimeSpan.fromMilliseconds(dateEnd.getTime() - dateStart.getTime());
        expect(timeSpan.days).toEqual(0);
        expect(timeSpan.hours).toEqual(2);
        expect(timeSpan.minutes).toEqual(30);
        expect(timeSpan.seconds).toEqual(2);
    });
    test("Parse Time Span", function () {
        const timeSpan1 = TimeSpan.parse("10675199.02:48:05.4775807")!;
        expect(timeSpan1.days).toEqual(10675199);
        expect(timeSpan1.hours).toEqual(2);
        expect(timeSpan1.minutes).toEqual(48);
        expect(timeSpan1.seconds).toEqual(5);
        expect(timeSpan1.ticks).toEqual(4775807);

        const timeSpan2 = TimeSpan.parse("03:45")!;
        expect(timeSpan2.days).toEqual(0);
        expect(timeSpan2.hours).toEqual(3);
        expect(timeSpan2.minutes).toEqual(45);
        expect(timeSpan2.seconds).toEqual(0);
        expect(timeSpan2.ticks).toEqual(0);

        const timeSpan3 = TimeSpan.parse("03:45:23")!;
        expect(timeSpan3.days).toEqual(0);
        expect(timeSpan3.hours).toEqual(3);
        expect(timeSpan3.minutes).toEqual(45);
        expect(timeSpan3.seconds).toEqual(23);
        expect(timeSpan3.ticks).toEqual(0);
    });
    test("Time Span toString", function () {
        expect(new TimeSpan(1, 2, 3, 4, 5).toString()).toEqual("1.02:03:04.0000005");
        expect(new TimeSpan(1, 2, 3, 4, 0).toString()).toEqual("1.02:03:04");
        expect(new TimeSpan(0, 2, 3, 4, 0).toString()).toEqual("02:03:04");
    });
    test("Time Span Rounding", function () {
        expect(new TimeSpan(1, 2, 3, 4, 1235555).toNearestMillisecond().toString()).toEqual("1.02:03:04.124");
        expect(new TimeSpan(1, 2, 3, 4, 5235555).toNearestSecond().toString()).toEqual("1.02:03:05");
        expect(new TimeSpan(1, 2, 3, 32, 5235555).toNearestMinute().toString()).toEqual("1.02:04");
    });
    test("Normalize Time Span", function () {
        expect(new TimeSpan(1, 24, 3, 4).toISOString()).toEqual("2.00:03:04.0000000");
        expect(new TimeSpan(1, 12, 61, 4).toISOString()).toEqual("1.13:01:04.0000000");
        expect(new TimeSpan(1, 12, 3, 65).toISOString()).toEqual("1.12:04:05.0000000");
        expect(new TimeSpan(1, 25, 63, 65).toISOString()).toEqual("2.02:04:05.0000000");
    });
    test("Compare To", function () {
        const ts = new TimeSpan(1, 2, 3, 4);
        expect(ts.compareTo(ts.add(TimeSpan.fromHours(1)))).toBeLessThan(0);
        expect(ts.compareTo(ts.sub(TimeSpan.fromHours(1)))).toBeGreaterThan(0);
        expect(ts.compareTo(new TimeSpan(1, 2, 3, 4))).toEqual(0);
        expect(ts.compareTo(null)).toBeLessThan(0);
    });
});