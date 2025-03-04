export declare const cookie: {
    getAll(): {
        [name: string]: string;
    };
    set(config: {
        key: string;
        value?: string;
        path?: string;
        secure?: Boolean;
        sameSite?: "Lax" | "Strict" | "None";
        expires?: number;
    }): void;
    get(key: string): string | false;
    remove(key: string, path?: string): void;
};
