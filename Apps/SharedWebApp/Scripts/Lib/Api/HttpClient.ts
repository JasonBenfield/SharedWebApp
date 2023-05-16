import { isArray } from "lodash";
import { serialize } from "object-to-formdata";
import { JsonText } from "./JsonText";

export class HttpPostResult {
    constructor(
        public readonly result: any,
        public readonly url: string,
        public readonly status: number,
        public readonly responseText: string
    ) {
    }

    isSuccessful() {
        return this.status === 200;
    }

    toString() {
        return `${this.url}\r\n${this.status}\r\n${this.responseText}\r\n${this.result}`;
    }
}

export class HttpClient {
    get(url: string) {
        return this.execute('GET', url);
    }

    post(url: string, data: any, contentType?: string) {
        let hasFiles = false;
        let body: string | FormData;
        if (data && typeof data !== 'string') {
            hasFiles = this.hasFiles(data);
        }
        if (hasFiles) {
            body = serialize(
                data,
                {
                    dotsForObjectNotation: true,
                    noFilesWithArrayNotation: true
                }
            );
        }
        else {
            const isString = typeof data === 'string' && contentType && !contentType.startsWith('application/json');
            body = isString ? data : new JsonText(data).toString();
        }
        return this.execute('POST', url, body, contentType);
    }

    private hasFiles(data) {
        let hasFiles = false;
        if (data) {
            if (data instanceof File || (isArray(data) && data[0] instanceof File)) {
                hasFiles = true;
            }
            else if (typeof data === 'object' && !(data instanceof Date)) {
                Object.keys(data).forEach(key => {
                    hasFiles = this.hasFiles(data[key]);
                });
            }
        }
        return hasFiles;
    }

    private execute(method: string, url: string, body?: string | FormData, contentType?: string) {
        return new Promise<HttpPostResult>((resolve) => {
            const oReq = new XMLHttpRequest();
            oReq.withCredentials = true;
            oReq.onreadystatechange = () => {
                if (oReq.readyState == 4) {
                    let result: any;
                    let contentType = (oReq.getResponseHeader('content-type') || '').toLowerCase();
                    if (method === 'GET' || contentType.indexOf('application/json') === -1) {
                        result = oReq.responseText;
                    }
                    else {
                        result = JSON.parse(oReq.responseText);
                    }
                    resolve(new HttpPostResult(result, url, oReq.status, oReq.responseText));
                }
            };
            oReq.open(method, url);
            if (contentType) {
                oReq.setRequestHeader("Content-Type", contentType);
            }
            else if (method === 'POST' && typeof body === 'string') {
                oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            }
            oReq.send(body);
        });
    }
}