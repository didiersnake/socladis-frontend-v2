export function flattenObject(obj) {
    const result = {}

    function recurse(current, property) {
        if (Object(current) !== current) {
            result[property] = current
        } else if (Array.isArray(current)) {
            // Handle array by iterating through its elements
            for (let i = 0; i < current.length; i++) {
                recurse(current[i], property) // Pass the property without index
            }
            if (current.length === 0) {
                result[property] = []
            }
        } else {
            for (let p in current) {
                if (current.hasOwnProperty(p)) {
                    // Handle nested objects
                    recurse(current[p], property ? `${property}_${p}` : p)
                }
            }
        }
    }

    recurse(obj, '')
    return result
}