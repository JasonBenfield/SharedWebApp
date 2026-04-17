import { describe, expect, test } from "@jest/globals";
import { DateOnly } from "../Lib/DateOnly";
import { DateTimeFormatOptions } from "../Lib/DateTimeFormatOptions";
import { DateTimeOffset } from "../Lib/DateTimeOffset";
import { DayOfWeek } from "../Lib/DayOfWeek";
import { Month } from "../Lib/Month";
import { TimeSpan } from "../Lib/TimeSpan";

describe("DateOnly", () => {
    test("Parse DateOnly", function () {
        const dateOnly1 = DateOnly.parse("2023-09-01")!;
        expect(dateOnly1.year).toEqual(2023);
        expect(dateOnly1.month).toEqual(Month.September);
        expect(dateOnly1.date).toEqual(1);
        expect(dateOnly1.isMaxYear).toBe(false);
        expect(dateOnly1.dayOfWeek.equals(DayOfWeek.Friday)).toBe(true);
        expect(dateOnly1.dayOfWeek.equals(DayOfWeek.Saturday)).toBe(false);

        const maxDateOnly = DateOnly.max();
        expect(maxDateOnly.year).toEqual(9999);
        expect(maxDateOnly.month).toEqual(Month.December);
        expect(maxDateOnly.date).toEqual(31);
        expect(maxDateOnly.isMaxYear).toBe(true);
    });
    test("Add Days", function () {
        expect(new DateOnly(2023, Month.August, 20).addDays(1).toISOString()).toEqual("2023-08-21");
        expect(new DateOnly(2023, Month.August, 31).addDays(1).toISOString()).toEqual("2023-09-01");
        expect(new DateOnly(2023, Month.August, 0).addDays(1).toISOString()).toEqual("2023-08-01");
        expect(new DateOnly(2023, Month.August, 20).addDays(-1).toISOString()).toEqual("2023-08-19");
        expect(new DateOnly(2022, Month.December, 31).addDays(1).toISOString()).toEqual("2023-01-01");
    });
    test("Add Months", function () {
        expect(new DateOnly(2023, Month.August, 20).addMonths(1).toISOString()).toEqual("2023-09-20");
        expect(new DateOnly(2023, Month.July, 31).addMonths(-1).toISOString()).toEqual("2023-07-01");
        expect(new DateOnly(2023, Month.January, 1).addMonths(-1).toISOString()).toEqual("2022-12-01");
        expect(new DateOnly(2022, Month.December, 31).addMonths(1).toISOString()).toEqual("2023-01-31");
    });
    test("Add Years", function () {
        expect(new DateOnly(2023, Month.August, 20).addYears(1).toISOString()).toEqual("2024-08-20");
        expect(new DateOnly(2023, Month.July, 31).addYears(-1).toISOString()).toEqual("2022-07-31");
    });
    test("Add Time Span", function () {
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).addTimeSpan(TimeSpan.fromDays(1)))!.format()).toEqual("8/21/23");
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).addTimeSpan(TimeSpan.fromHours(1)))!.format()).toEqual("8/20/23 1:00 AM");
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).addTimeSpan(TimeSpan.fromMinutes(5)))!.format()).toEqual("8/20/23 12:05 AM");
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).addTimeSpan(TimeSpan.fromSeconds(15)))!.format(new DateTimeFormatOptions().use2DigitSeconds())).toEqual("8/20/23 12:00:15 AM");
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).addTimeSpan(TimeSpan.fromMilliseconds(234)))!.format(new DateTimeFormatOptions().use2DigitSeconds().useMilliseconds(3))).toEqual("8/20/23 12:00:00.234 AM");
    });
    test("Sub Time Span", function () {
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).subTimeSpan(TimeSpan.fromDays(1)))!.format()).toEqual("8/19/23");
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).subTimeSpan(TimeSpan.fromHours(1)))!.format()).toEqual("8/19/23 11:00 PM");
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).subTimeSpan(TimeSpan.fromMinutes(5)))!.format()).toEqual("8/19/23 11:55 PM");
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).subTimeSpan(TimeSpan.fromSeconds(15)))!.format(new DateTimeFormatOptions().use2DigitSeconds())).toEqual("8/19/23 11:59:45 PM");
        expect(DateTimeOffset.fromDate(new DateOnly(2023, Month.August, 20).subTimeSpan(TimeSpan.fromMilliseconds(234)))!.format(new DateTimeFormatOptions().use2DigitSeconds().useMilliseconds(3))).toEqual("8/19/23 11:59:59.766 PM");
    });
    test("DateOnly toISOString", function () {
        expect(new DateOnly(2023, Month.August, 20).toISOString()).toEqual("2023-08-20");
    });
    test("Equals", function () {
        expect(new DateOnly(2023, Month.August, 20).equals(new DateOnly(2023, Month.August, 20))).toBe(true);
        expect(new DateOnly(2023, Month.August, 20).equals(new DateOnly(2023, Month.August, 19))).toBe(false);
    });
    test("Compare To", function () {
        const date = DateOnly.today();
        expect(date.compareTo(date.addDays(1))).toBeLessThan(0);
        expect(date.compareTo(date.addDays(-1))).toBeGreaterThan(0);
        expect(date.compareTo(new DateOnly(date.year, date.month, date.date))).toEqual(0);
        expect(date.compareTo(null)).toBeLessThan(0);
    });
    test("Comparison Operators", function () {
        const date = DateOnly.today();
        expect(date < date.addDays(1)).toBe(true);
        expect(date < date.addDays(-1)).toBe(false);
        expect(date > date.addDays(-1)).toBe(true);
        expect(date < date.addDays(-1)).toBe(false);
        expect(date >= new DateOnly(date.year, date.month, date.date)).toBe(true);
        expect(date >= date.addDays(-1)).toBe(true);
        expect(date >= date.addDays(1)).toBe(false);
        expect(date <= date.addDays(1)).toBe(true);
        expect(date <= date.addDays(-1)).toBe(false);
    });
});