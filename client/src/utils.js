export function generateErrorStr(data) {
    if (typeof data === 'object') {
        return Object.values(data).join('. ');
    }
    return data;
}

export function closeSnackbar(openerFn) {
    return (event, reason) => {
        if (reason === "clickaway") return;
        openerFn(false);
    }
}
