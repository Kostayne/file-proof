import { apiUrl } from "~/cfg";

export function fetchApi(url: string, params?: RequestInit) {
    return fetch(apiUrl + url, params);
}