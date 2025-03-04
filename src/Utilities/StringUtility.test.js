import { toTitleCase } from './StringUtility'; // Adjust the path if necessary

describe('toTitleCase Function', () => {
    it('should convert a simple string to title case', () => {
        const inputString = 'this is a simple string';
        const expected = 'This Is A Simple String';
        const result = toTitleCase(inputString);
        expect(result).toBe(expected);
    });

    it('should handle strings with multiple spaces correctly', () => {
        const inputString = '  multiple   spaces  ';
        const expected = '  Multiple   Spaces  ';
        const result = toTitleCase(inputString);
        expect(result).toBe(expected);
    });

    it('should handle an empty string correctly', () => {
        const inputString = '';
        const expected = '';
        const result = toTitleCase(inputString);
        expect(result).toBe(expected);
    });

    it('should handle a string with only one word correctly', () => {
        const inputString = 'oneword';
        const expected = 'Oneword';
        const result = toTitleCase(inputString);
        expect(result).toBe(expected);
    });

    it('should handle a string with mixed case correctly', () => {
        const inputString = 'mIxEd CaSe StRiNg';
        const expected = 'Mixed Case String';
        const result = toTitleCase(inputString);
        expect(result).toBe(expected);
    });

    it('should handle strings with numbers and special characters correctly', () => {
        const inputString = '123 abc! def@ ghi#';
        const expected = '123 Abc! Def@ Ghi#';
        const result = toTitleCase(inputString);
        expect(result).toBe(expected);
    });

    it('should handle multiple word with non alphabetic start', () => {
        const inputString = '!@# abc! def@ ghi#';
        const expected = '!@# Abc! Def@ Ghi#';
        const result = toTitleCase(inputString);
        expect(result).toBe(expected);
    });
});