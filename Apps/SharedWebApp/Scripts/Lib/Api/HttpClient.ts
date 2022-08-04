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

    post(url: string, data: string, contentType?: string) {
        return this.execute('POST', url, data, contentType);
    }

    private execute(method: string, url: string, body?: string, contentType?: string) {
        return new Promise<HttpPostResult>((resolve) => {
            function reqListener() {
                console.log(this.responseText);
            }
            let oReq = new XMLHttpRequest();
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
            oReq.addEventListener("load", reqListener.bind(oReq));
            oReq.open(method, url);
            if (contentType) {
                oReq.setRequestHeader("Content-Type", contentType);
            }
            else if (method === 'POST') {
                oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            }
            oReq.send(body);
        });
    }
}