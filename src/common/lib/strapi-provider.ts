import * as qs from 'qs';

interface StrapiFetchParameters<B> {
    method: 'GET' | 'POST';
    entity: string;
    parameters?: Record<string, string | number | boolean>;
    currentEntity?: number | string;
    body?: B;
}

type FetchOptions = Parameters<typeof fetch>[1];

class StrapiProvider {
    private readonly _url: string;

    private readonly _apiOptions: FetchOptions;

    constructor(url: string) {
        this._url = url;

        this._apiOptions = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
    }

    async strapiFetch<T, B = undefined>({
        method,
        entity,
        currentEntity,
        parameters,
        body,
    }: StrapiFetchParameters<B>): Promise<T> {
        const searchParameters = qs.stringify(parameters);
        const url =
            `${this._url}/${entity}${currentEntity !== undefined ? `/${currentEntity}` : ''}` +
            (searchParameters ? '?' + searchParameters : '');

        const fetchResponse = await window.fetch(url, {
            ...this._apiOptions,
            method,
            body: JSON.stringify(body),
        });

        return fetchResponse.json();
    }
}

export {StrapiProvider};
