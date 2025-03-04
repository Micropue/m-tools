export const cookie = {
    getAll() {
        const cookies = document.cookie;
        const all = cookies.split("; ");
        const formated = [];
        all.forEach(self => formated.push(self.split("=")));
        const result = {};
        formated.forEach(self => {
            result[self[0]] = self[1];
        });
        return result;
    },
    set(config) {
        const { key, value, path, secure, sameSite, expires } = config;
        document.cookie = `${key || "cookie"}=${value}; path=${path}; expires=${new Date(Date.now() + (expires || 86400) * 1000).toUTCString()}; ${sameSite === "None" ? "Secure; " : secure ? "Secure; " : ""} SameSite=${sameSite}`;
    },
    get(key) {
        return this.getAll()[key] ?? false;
    },
    remove(key, path) {
        document.cookie = `${key}=; path=${path || "/"}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    }
};
