import fetch from 'node-fetch'
import { config } from './config.js'

async function localApiCall(path, parameters) {
    const stringParameters = Object
        .entries(parameters)
        .map(parameter => `${parameter[0]}=${parameter[1]}`)
        .join('&')
    const url = `${config.api.host}:${config.api.port}/${path}?${stringParameters}`
    try {
        const response = await fetch(url)
        if (response.ok) {
            return {
                error: null,
                data: await response.json()
            }
        } else {
            return {
                error: await response.text()
            }
        }
    } catch (error) {
        console.error(`Fetch error:`)
        console.error(error)
        return { error }
    }
}

export { localApiCall }