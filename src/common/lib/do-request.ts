interface Settings {
    method: Methods;
    url: string;
    values: any;
    key: string;
}

export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
}

export async function doRequest({values, method, key, url}: Settings): Promise<Response> {
    const body = JSON.stringify(values);

    const formData = new FormData();
    formData.set(key, body);

    return await window.fetch(url, {body: formData, method});
}
