import qs from 'qs';

export function addQueryParameters(request: Record<string, any>): string {
    return qs.stringify(request, { arrayFormat: 'repeat', skipNulls: true });
}