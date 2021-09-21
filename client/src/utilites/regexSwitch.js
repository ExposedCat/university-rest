async function matchByRegex(data, cases) {
    for (const [regex, callback, ...parameters] of cases) {
        const parsed = data.match(regex)
        if (parsed) {
            await callback(parsed.slice(1), ...parameters)
            return
        }
    }
}


export {
    matchByRegex
}