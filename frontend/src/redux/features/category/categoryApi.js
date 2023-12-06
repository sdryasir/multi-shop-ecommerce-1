import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api/',
    credentials:'include'
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `/categories`,
    }),
    addNewCategory: builder.mutation({
      query: (data) => ({
        url: `/new/category`,
        method: 'POST',
        body: data,
      })
  }),
})
})


export const { useGetAllCategoriesQuery, useAddNewCategoryMutation } = categoryApi