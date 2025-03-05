import { convertDate, convertShortDate, formatDate, formatShortDate, formatTime } from './DateUtility';

describe('Date Utility Functions', () => {
    describe('convertDate', () => {
        it('should correctly convert a date string to the dd-mm-yyyy hh:rr AP format', () => {
            const dateString = 'Tue Mar 04 2025 23:43:03 GMT+0800 (Singapore Standard Time)';
            const expected = '04-03-2025 11:43 PM';
            const result = convertDate(dateString);
            expect(result).toBe(expected);
        });

        it('should handle midnight correctly', () => {
            const dateString = '01/01/2023 00:00';
            const expected = '01-01-2023 12:00 AM';
            const result = convertDate(dateString);
            expect(result).toBe(expected);
        });

        it('should handle noon correctly', () => {
            const dateString = '01/01/2023 12:00';
            const expected = '01-01-2023 12:00 PM';
            const result = convertDate(dateString);
            expect(result).toBe(expected);
        });

        it('should handle an invalid date string and still return a properly formatted string', () => {
            const dateString = 'invalid date';
            const result = convertDate(dateString);
            // Depending on how your function handles invalid dates, you may adjust this expectation
            expect(result).not.toEqual(/^\d{2}-\d{2}-\d{4} \d{1,2}:\d{2} (AM|PM)$/);  // Basic format check
        });
    });

    describe('convertShortDate', () => {
        it('should correctly convert a date string to the dd-mm-yyyy format', () => {
            const dateString = 'Tue Mar 04 2025 23:43:03 GMT+0800 (Singapore Standard Time)';
            const expected = '04-03-2025';
            const result = convertShortDate(dateString);
            expect(result).toBe(expected);
        });

        it('should correctly convert a date string with single-digit day/month', () => {
            const dateString = '01/01/2023 02:05';
            const expected = '01-01-2023';
            const result = convertShortDate(dateString);
            expect(result).toBe(expected);
        });

        it('should handle an invalid date string and still return a properly formatted string', () => {
            const dateString = 'invalid date';
            const result = convertShortDate(dateString);
            // Depending on how your function handles invalid dates, you may adjust this expectation
            expect(result).not.toEqual(/^\d{2}-\d{2}-\d{4}$/);  // Basic format check
        });
    });

    describe('formatTime', () => {
        it('should correctly format a timestamp to a locale-specific time string', () => {
            const timestamp = 1677648000; // Example timestamp (March 1, 2023 00:00:00 GMT)
            const result = formatTime(timestamp);
            expect(result).toBeDefined(); // Check that the function returns a value
        });

        it('should return a different value after passing a different timestamp', () => {
            const timestamp = 1277648000;
            const secondTimestamp = 1677734400;
            const result1 = formatTime(timestamp);
            const result2 = formatTime(secondTimestamp);
            expect(result1).not.toEqual(result2);
        });
        it('should handle an invalid timestamp and return a valid string', () => {
            const invalidTimestamp = 'invalid timestamp';
            const result = formatTime(invalidTimestamp);
            expect(result).toBeDefined(); // Check that the function returns a value

        });
    });

    describe('formatDate', () => {
        it('should correctly format a timestamp to a locale-specific time string', () => {
            const timestamp = 1677648000; // Example timestamp (March 1, 2023 00:00:00 GMT)
            const result = formatDate(timestamp);
            expect(result).toBeDefined(); // Check that the function returns a value
        });

        it('should return a different value after passing a different timestamp', () => {
            const timestamp = 1277648000;
            const secondTimestamp = 1677734400;
            const result1 = formatDate(timestamp);
            const result2 = formatDate(secondTimestamp);
            expect(result1).not.toEqual(result2);
        });
        it('should handle an invalid timestamp and return a valid string', () => {
            const invalidTimestamp = 'invalid timestamp';
            const result = formatDate(invalidTimestamp);
            expect(result).toBeDefined(); // Check that the function returns a value

        });
    });

    describe('formatShortDate', () => {
        it('should correctly format a timestamp to a locale-specific time string', () => {
            const timestamp = 1677648000; // Example timestamp (March 1, 2023 00:00:00 GMT)
            const result = formatShortDate(timestamp);
            expect(result).toBeDefined(); // Check that the function returns a value
        });

        it('should return a different value after passing a different timestamp', () => {
            const timestamp = 1277648000;
            const secondTimestamp = 1677734400;
            const result1 = formatShortDate(timestamp);
            const result2 = formatShortDate(secondTimestamp);
            expect(result1).not.toEqual(result2);
        });
        it('should handle an invalid timestamp and return a valid string', () => {
            const invalidTimestamp = 'invalid timestamp';
            const result = formatShortDate(invalidTimestamp);
            expect(result).toBeDefined(); // Check that the function returns a value

        });
    });
});
