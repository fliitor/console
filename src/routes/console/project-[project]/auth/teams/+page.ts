import { Query } from '@appwrite.io/console';
import { sdk } from '$lib/stores/sdk';
import { getLimit, getPage, getSearch, pageToOffset } from '$lib/helpers/load';
import { PAGE_LIMIT } from '$lib/constants';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, route }) => {
    const page = getPage(url);
    const search = getSearch(url);
    const limit = getLimit(url, route, PAGE_LIMIT);
    const offset = pageToOffset(page, limit);

    return {
        offset,
        limit,
        search,
        page,
        teams: await sdk.forProject.teams.list(
            [Query.limit(limit), Query.offset(offset), Query.orderDesc('$createdAt')],
            search
        )
    };
};
