import api from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 오늘만 무료
    login: builder.mutation<any, TReqLogin>({
      query: (body) => ({
        url: `/v1/client/signin`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),
    setFavorite: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/webtoon/recommended/register`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        console.log(rawResult);
        return rawResult;
      },
    }),
    getFavorite: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/webtoon/recommended/search`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data.lists;
      },
    }),
    getRecentView: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/account/recommended/search`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data.lists;
      },
    }),
    getUserProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/auth/profile`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),
    getUserSession: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/auth/session`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),
    validateUserSession: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/auth/validate`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),
    getUserSessionProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/auth/profile`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),
    buyContent: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/buy/register`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        console.log(rawResult);
        return rawResult;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSetFavoriteMutation,
  useGetFavoriteMutation,
  useGetRecentViewMutation,
  useGetUserProfileMutation,
  useGetUserSessionMutation,
  useValidateUserSessionMutation,
  useGetUserSessionProfileMutation,
  useBuyContentMutation,
} = userApi;
