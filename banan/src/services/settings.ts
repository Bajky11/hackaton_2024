import { fetchBaseQuery } from '@reduxjs/toolkit/query'

const username = 'dopo';
const password = 'DevOps2024';
const encodedCredentials = btoa(`${username}:${password}`);

export const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://hackaton-api.fly.dev/api/v1/',
    prepareHeaders: (headers) => {
        headers.set('Authorization', `Basic ${encodedCredentials}`);
        return headers;
    },
})