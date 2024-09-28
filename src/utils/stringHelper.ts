/**
 * Wraps a value in apostrophes
 * @param value 
 * @returns The value in apostrophes, or null if the value is null
 */
export const wrap = (value: string | null) => {
    return value ? `'${value}'` : null;
}

/**
 * Wraps an object in apostrophes
 * @param value 
 * @returns The object's string representation in apostrophes, or null if the value is null
 */
export const wrapValue = (jsonValue) => (jsonValue ? wrap(JSON.stringify(jsonValue)) : null);
