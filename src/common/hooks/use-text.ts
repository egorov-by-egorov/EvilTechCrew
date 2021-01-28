import {textLoader} from 'common/lib/text-loader';

function useText<T extends Parameters<typeof textLoader>[0]>(blockName: T) {
    const t = textLoader(blockName);
    return {t};
}

export {useText};
