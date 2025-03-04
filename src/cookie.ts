//为了更方便的cookie操作
export const cookie = {
    //获得所有cookie，返回一个对象
    getAll(): {
        [name: string]: string
    } {
        const cookies = document.cookie
        const all = cookies.split("; ")
        const formated: string[][] = []
        all.forEach(self => formated.push(self.split("=")))
        const result: {
            [name: string]: string
        } = {}
        formated.forEach(self => {
            result[self[0]] = self[1]
        })
        return result
    },
    set(config: {
        key: string,
        value?: string,
        path?: string,
        secure?: Boolean,
        sameSite?: "Lax" | "Strict" | "None",
        expires?: number
    }): void {
        const { key, value, path, secure, sameSite, expires } = config
        document.cookie = `${key || "cookie"}=${value}; path=${path}; expires=${new Date(Date.now() + (expires || 86400) * 1000).toUTCString()}; ${sameSite === "None" ? "Secure; " : secure ? "Secure; " : ""} SameSite=${sameSite}`
    },
    get(key: string): string | false {
        return this.getAll()[key] ?? false
    },
    remove(key: string, path?: string): void {
        document.cookie = `${key}=; path=${path || "/"}; expires=Thu, 01 Jan 1970 00:00:00 UTC`
    }
}
