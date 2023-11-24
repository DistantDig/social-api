const formatTimeStamp = (timeStamp) => {
    const date = timeStamp.toLocaleDateString();
    const time = timeStamp.toLocaleTimeString();

    return `${time} on ${date}.`
}

module.exports = formatTimeStamp;