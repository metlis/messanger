export function generateErrorStr(data) {
    if (typeof data === 'object') {
        return Object.values(data).join('. ');
    }
    return data;
}
