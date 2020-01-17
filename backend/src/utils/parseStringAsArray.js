module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(reg => reg.trim);
}