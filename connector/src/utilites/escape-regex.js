const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export { escapeRegExp }