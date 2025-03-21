export function ajax(config) {
    return new Promise((resolve, reject) => {
        if (!config)
            throw new Error("can't find 'config' on the args");
        if (!config.url)
            throw new Error("can't find parameter 'url'");
        const { url } = config;
        const type = config.type == "GET" ? "GET" : "POST";
        const method = config.method == "xhr" ? "xhr" : "fetch";
        const requestHeader = config.requestHeader;
        const _data = config.data;
        const success = config.success || function () { };
        const error = config.error || function () { };
        let data = _stringifyData(_data, type);
        function _stringifyData(__data, type) {
            let data = "";
            for (const i of Object.keys(__data)) {
                data += `${i}=${__data[i]}&`;
            }
            data = [...data].filter((_, index) => index != data.length - 1).join("");
            if (type === "GET") {
                return "?".concat(data);
            }
            else if (type === "POST") {
                return data;
            }
        }
        function _jsonParse(responseText) {
            try {
                return JSON.parse(responseText);
            }
            catch {
                return responseText;
            }
        }
        if (method == "xhr") {
            const xhr = new XMLHttpRequest();
            xhr.open(type, url + (type == "GET" ? data : ""));
            type == "POST" ? xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8") : undefined;
            for (const i in requestHeader) {
                xhr.setRequestHeader(i, requestHeader[i]);
            }
            xhr.send(type == "POST" ? data : null);
            xhr.onloadend = e => {
                const { responseText } = xhr;
                if (xhr.status === 200) {
                    success(_jsonParse(responseText), xhr.status);
                    resolve({
                        data: _jsonParse(responseText),
                        status: xhr.status
                    });
                }
                else {
                    error(_jsonParse(responseText), xhr.status, "");
                    reject({
                        data: _jsonParse(responseText),
                        status: xhr.status,
                        msg: e
                    });
                }
            };
            xhr.onerror = e => {
                error(null, null, e);
                reject({
                    data: null,
                    status: null,
                    msg: e
                });
            };
        }
        else if (method == "fetch") {
            let body = type == "GET" ? null : new FormData();
            if (body)
                for (const i in _data)
                    body.append(i, _data[i]);
            let headers = new Headers();
            for (const i in requestHeader)
                headers.append(i, requestHeader[i]);
            const request = new Request(url + (type == "GET" ? data : ""), {
                method: type,
                body,
                headers,
            });
            fetch(request)
                .then(response => {
                if (response.status === 200) {
                    response.json().then(value => {
                        success(value, response.status);
                        resolve({
                            data: value,
                            status: response.status
                        });
                    }).catch(() => {
                        error("", null, "can't parse JSON");
                        reject({
                            data: "",
                            status: response.status,
                            msg: "can't parse JSON"
                        });
                    });
                }
                else {
                    response.json().then(value => {
                        error(value, response.status);
                        reject({
                            data: value,
                            status: response.status,
                            msg: null
                        });
                    }).catch(() => {
                        error("", null, "can't parse JSON");
                        reject({
                            data: "",
                            status: response.status,
                            msg: "can't parse JSON"
                        });
                    });
                }
            }).catch(() => {
                error(null, null);
                reject(null);
            });
        }
    });
}
