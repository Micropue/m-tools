interface Config<T> {
    url: string;
    type?: "GET" | "POST";
    requestHeader?: {
        [key: string]: string;
    };
    method?: "xhr" | "fetch";
    data?: {
        [query: string]: string;
    };
    success?: (data: T | string, status?: number) => void;
    error?: (data: T | string | null, status?: number | null, msg?: any) => void;
}
export declare function ajax<T>(config: Config<T>): Promise<{
    data: T | string;
    status: number;
}>;
export {};
