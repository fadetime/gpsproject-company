import config from './addConfig'

export default (value) => {
    const url = config.serveradd+'/' + value
    return url
}