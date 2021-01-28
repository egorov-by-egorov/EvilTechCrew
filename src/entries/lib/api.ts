import {StrapiProvider} from 'common/lib/strapi-provider';

interface Photo {
    url: string;
    formats: {
        thumbnail: {
            url: string;
        };
        small?: {
            url: string;
        };
        medium?: {
            url: string;
        };
        large?: {
            url: string;
        };
    };
}

interface Coach {
    id: number;
    name: string;
    description: string;
    experience: number;
    photo: Photo;
    facebook: string;
    instagram: string;
}

interface Partner {
    id: number;
    type: 'Info' | 'Gym' | 'Partner';
    logo: Photo;
    link: string;
}

interface News {
    id: number;
    title: string;
    image: Photo;
    content: string;
}

const url =
    window.location.hostname === 'thezal.ru' ? 'https://content-admin.thezal.ru' : 'https://content-admin.thezal.pro';
const strapiProvider = new StrapiProvider(url);

class LandingApi {
    static async PartnerRequest<T>(parameters: T): Promise<void> {
        await strapiProvider.strapiFetch<unknown, T>({
            method: 'POST',
            entity: 'partner-reqests',
            body: parameters,
        });
    }

    static async Subscriptions<T>(parameters: T): Promise<void> {
        await strapiProvider.strapiFetch<unknown, T>({
            method: 'POST',
            entity: 'subsiptions',
            body: parameters,
        });
    }

    static async SiteGetNews(offset?: number, limit?: number): Promise<News[]> {
        const response = await strapiProvider.strapiFetch<News[]>({
            method: 'GET',
            entity: 'news',
            parameters: {
                ...(offset !== undefined && {offset}),
                ...(limit !== undefined && {limit}),
                _sort: 'id:desc',
            },
        });

        return response;
    }

    static async SiteGetCurrentNews<T>(currentNews: number): Promise<T> {
        const response = await strapiProvider.strapiFetch<T>({
            method: 'GET',
            entity: 'news',
            currentEntity: currentNews,
        });

        return response;
    }

    static async SiteGetEcosystems<T>(offset: number, limit: number) {
        const response = await strapiProvider.strapiFetch<T[]>({
            method: 'GET',
            entity: 'news',
            parameters: {offset, limit},
        });

        return response;
    }

    static async SiteGetCurrentEcosystem<T>(currentEcosystem: number) {
        const response = await strapiProvider.strapiFetch<T>({
            method: 'GET',
            entity: 'ecosystems',
            currentEntity: currentEcosystem,
        });

        return response;
    }

    static async SiteJobs<T>(offset?: number, limit?: number) {
        const response = await strapiProvider.strapiFetch<T[]>({
            method: 'GET',
            entity: 'jobs',
            parameters: {
                ...(offset !== undefined && {offset}),
                ...(limit !== undefined && {limit}),
            },
        });

        return response;
    }

    static async SiteCoaches(offset?: number, limit?: number) {
        const response = await strapiProvider.strapiFetch<Coach[]>({
            method: 'GET',
            entity: 'coaches',
            parameters: {
                ...(offset !== undefined && {offset}),
                ...(limit !== undefined && {limit}),
            },
        });

        return response;
    }

    static async SitePartners(offset?: number, limit?: number) {
        const response = await strapiProvider.strapiFetch<Partner[]>({
            method: 'GET',
            entity: 'partners',
            parameters: {
                ...(offset !== undefined && {offset}),
                ...(limit !== undefined && {limit}),
            },
        });

        return response;
    }
}

export {LandingApi, Coach, News, Partner};
