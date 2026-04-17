import { describe, expect, test } from "@jest/globals";
import { TimeOnly } from "../Lib/TimeOnly";

describe("TimeOnly", () => {
    test("Parse TimeOnly", function () {
        const timeOnly1 = TimeOnly.parse("21:34:56.1230000")!;
        expect(timeOnly1.hours).toEqual(21);
        expect(timeOnly1.minutes).toEqual(34);
        expect(timeOnly1.seconds).toEqual(56);
        expect(timeOnly1.milliseconds).toEqual(123);
    });
    test("TimeOnly toISOString", function () {
        expect(new TimeOnly(8, 5).toISOString()).toEqual("08:05:00.0000000");
    });
    test("Equals", function () {
        expect(new TimeOnly(8, 5, 3, 132).equals(new TimeOnly(8, 5, 3, 132))).toBe(true);
        expect(new TimeOnly(8, 5, 3, 132).equals(new TimeOnly(8, 5, 3, 1))).toBe(false);
    });
    test("Compare To", function () {
        const now = TimeOnly.now();
        expect(now.compareTo(now.addHours(1))).toBeLessThan(0);
        expect(now.compareTo(now.addHours(-1))).toBeGreaterThan(0);
        expect(now.compareTo(new TimeOnly(now.hours, now.minutes, now.seconds, now.milliseconds))).toEqual(0);
        expect(now.compareTo(null)).toBeLessThan(0);
    });
    test("Comparison Operators", function () {
        const now = TimeOnly.now();
        expect(now < now.addHours(1)).toBe(true);
        expect(now <= new TimeOnly(now.hours, now.minutes, now.seconds, now.milliseconds)).toBe(true);
        expect(now > now.addHours(-1)).toBe(true);
        expect(now >= new TimeOnly(now.hours, now.minutes, now.seconds, now.milliseconds)).toBe(true);
    });
});