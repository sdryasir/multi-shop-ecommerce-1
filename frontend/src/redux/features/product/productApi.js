import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    credentials: 'include'
  }),
  tagTypes: ['Products', 'Product'],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `/products`,
      providesTags: 'Products'
    }),
    getProductById: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: 'Product'
    }),
    addNewProduct: builder.mutation({
      query: (data) => ({
        url: `/new/product`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: 'Products'
    }),
  })
})


export const { useGetAllProductsQuery, useGetProductByIdQuery, useAddNewProductMutation } = productApi