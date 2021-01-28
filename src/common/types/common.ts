export type Sizes = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
export type Theme = 'white' | 'black' | 'yellow';
export type LoadStatus = 'initial' | 'pending' | 'success' | 'error';

export interface LinkItem {
    name: string;
    href: string;
}
