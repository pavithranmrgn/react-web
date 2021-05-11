
export function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}