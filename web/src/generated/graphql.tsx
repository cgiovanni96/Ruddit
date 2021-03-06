/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  posts: PaginatedPostsResponse;
  easyPosts: Array<Post>;
  post?: Maybe<Post>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  subruddits: PaginatedSubrudditsResponse;
  easySubruddits: Array<Subruddit>;
  subruddit: Subruddit;
};


export type QueryPostsArgs = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  subrudditSlug?: Maybe<Scalars['String']>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QuerySubrudditsArgs = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
};


export type QuerySubrudditArgs = {
  slug: Scalars['String'];
};

export type PaginatedPostsResponse = {
  __typename?: 'PaginatedPostsResponse';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  authorId: Scalars['String'];
  author: User;
  subrudditId: Scalars['String'];
  subruddit: Subruddit;
  textSnippet: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Subruddit = {
  __typename?: 'Subruddit';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  slug: Scalars['String'];
  adminId: Scalars['String'];
  admin: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedSubrudditsResponse = {
  __typename?: 'PaginatedSubrudditsResponse';
  subruddits: Array<Subruddit>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  vote: Scalars['Boolean'];
  createSubruddit?: Maybe<Subruddit>;
};


export type MutationCreatePostArgs = {
  data: CreatePostInputType;
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInputType;
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: UserInputType;
};


export type MutationLoginArgs = {
  data: LoginInputType;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['String'];
};


export type MutationCreateSubrudditArgs = {
  data: CreateSubrudditInputType;
};

export type CreatePostInputType = {
  title: Scalars['String'];
  text: Scalars['String'];
  subrudditId?: Maybe<Scalars['String']>;
};

export type UpdatePostInputType = {
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserInputType = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInputType = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type CreateSubrudditInputType = {
  name: Scalars['String'];
  description: Scalars['String'];
  slug: Scalars['String'];
};

export type PostFieldsFragment = { __typename?: 'Post', id: string, title: string, text: string, createdAt: string, points: number, voteStatus?: Maybe<number>, author: { __typename?: 'User', id: string, name: string } };

export type PostSnippetFieldsFragment = { __typename?: 'Post', id: string, title: string, textSnippet: string, createdAt: string, points: number, voteStatus?: Maybe<number>, author: { __typename?: 'User', id: string, name: string }, subruddit: { __typename?: 'Subruddit', id: string, name: string, slug: string } };

export type SubrudditFieldsFragment = { __typename?: 'Subruddit', id: string, name: string, description: string, createdAt: string };

export type UserErrorFieldsFragment = { __typename?: 'FieldError', field: string, message: string };

export type UserFieldsFragment = { __typename?: 'User', id: string, name: string };

export type UserResponseFieldsFragment = { __typename?: 'UserResponse', errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & UserErrorFieldsFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & UserFieldsFragment
  )> };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: (
    { __typename?: 'UserResponse' }
    & UserResponseFieldsFragment
  ) };

export type CreatePostMutationVariables = Exact<{
  data: CreatePostInputType;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: Maybe<{ __typename?: 'Post', id: string, title: string, text: string, authorId: string, points: number }> };

export type CreateSubrudditMutationVariables = Exact<{
  data: CreateSubrudditInputType;
}>;


export type CreateSubrudditMutation = { __typename?: 'Mutation', createSubruddit?: Maybe<{ __typename?: 'Subruddit', id: string, name: string, description: string }> };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  data: LoginInputType;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: (
    { __typename?: 'UserResponse' }
    & UserResponseFieldsFragment
  ) };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  data: UserInputType;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: (
    { __typename?: 'UserResponse' }
    & UserResponseFieldsFragment
  ) };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: Maybe<{ __typename?: 'Post', id: string, title: string, text: string, textSnippet: string }> };

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['String'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<(
    { __typename?: 'User' }
    & UserFieldsFragment
  )> };

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: Maybe<(
    { __typename?: 'Post' }
    & PostFieldsFragment
  )> };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  subrudditSlug?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPostsResponse', hasMore: boolean, posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFieldsFragment
    )> } };

export type SubrudditQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type SubrudditQuery = { __typename?: 'Query', subruddit: (
    { __typename?: 'Subruddit' }
    & SubrudditFieldsFragment
  ) };

export type SubrudditsPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  subrudditSlug?: Maybe<Scalars['String']>;
}>;


export type SubrudditsPostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPostsResponse', hasMore: boolean, posts: Array<(
      { __typename?: 'Post', subruddit: { __typename?: 'Subruddit', id: string, name: string, description: string } }
      & PostSnippetFieldsFragment
    )> } };

export type SubrudditsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type SubrudditsQuery = { __typename?: 'Query', subruddits: { __typename?: 'PaginatedSubrudditsResponse', hasMore: boolean, subruddits: Array<(
      { __typename?: 'Subruddit' }
      & SubrudditFieldsFragment
    )> } };

export type SubrudditsListQueryVariables = Exact<{ [key: string]: never; }>;


export type SubrudditsListQuery = { __typename?: 'Query', easySubruddits: Array<(
    { __typename?: 'Subruddit' }
    & SubrudditFieldsFragment
  )> };

export const PostFieldsFragmentDoc = gql`
    fragment PostFields on Post {
  id
  title
  text
  createdAt
  points
  voteStatus
  author {
    id
    name
  }
}
    `;
export const PostSnippetFieldsFragmentDoc = gql`
    fragment PostSnippetFields on Post {
  id
  title
  textSnippet
  createdAt
  points
  voteStatus
  author {
    id
    name
  }
  subruddit {
    id
    name
    slug
  }
}
    `;
export const SubrudditFieldsFragmentDoc = gql`
    fragment SubrudditFields on Subruddit {
  id
  name
  description
  createdAt
}
    `;
export const UserErrorFieldsFragmentDoc = gql`
    fragment UserErrorFields on FieldError {
  field
  message
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  name
}
    `;
export const UserResponseFieldsFragmentDoc = gql`
    fragment UserResponseFields on UserResponse {
  errors {
    ...UserErrorFields
  }
  user {
    ...UserFields
  }
}
    ${UserErrorFieldsFragmentDoc}
${UserFieldsFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...UserResponseFields
  }
}
    ${UserResponseFieldsFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($data: CreatePostInputType!) {
  createPost(data: $data) {
    id
    title
    text
    authorId
    points
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreateSubrudditDocument = gql`
    mutation CreateSubruddit($data: CreateSubrudditInputType!) {
  createSubruddit(data: $data) {
    id
    name
    description
  }
}
    `;
export type CreateSubrudditMutationFn = Apollo.MutationFunction<CreateSubrudditMutation, CreateSubrudditMutationVariables>;

/**
 * __useCreateSubrudditMutation__
 *
 * To run a mutation, you first call `useCreateSubrudditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubrudditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubrudditMutation, { data, loading, error }] = useCreateSubrudditMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSubrudditMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubrudditMutation, CreateSubrudditMutationVariables>) {
        return Apollo.useMutation<CreateSubrudditMutation, CreateSubrudditMutationVariables>(CreateSubrudditDocument, baseOptions);
      }
export type CreateSubrudditMutationHookResult = ReturnType<typeof useCreateSubrudditMutation>;
export type CreateSubrudditMutationResult = Apollo.MutationResult<CreateSubrudditMutation>;
export type CreateSubrudditMutationOptions = Apollo.BaseMutationOptions<CreateSubrudditMutation, CreateSubrudditMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInputType!) {
  login(data: $data) {
    ...UserResponseFields
  }
}
    ${UserResponseFieldsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: UserInputType!) {
  register(data: $data) {
    ...UserResponseFields
  }
}
    ${UserResponseFieldsFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: String!, $title: String, $text: String) {
  updatePost(id: $id, data: {title: $title, text: $text}) {
    id
    title
    text
    textSnippet
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: String!) {
  vote(value: $value, postId: $postId)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, baseOptions);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    query Post($id: String!) {
  post(id: $id) {
    ...PostFields
  }
}
    ${PostFieldsFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String, $subrudditSlug: String) {
  posts(limit: $limit, cursor: $cursor, subrudditSlug: $subrudditSlug) {
    hasMore
    posts {
      ...PostSnippetFields
    }
  }
}
    ${PostSnippetFieldsFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      subrudditSlug: // value for 'subrudditSlug'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const SubrudditDocument = gql`
    query Subruddit($slug: String!) {
  subruddit(slug: $slug) {
    ...SubrudditFields
  }
}
    ${SubrudditFieldsFragmentDoc}`;

/**
 * __useSubrudditQuery__
 *
 * To run a query within a React component, call `useSubrudditQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubrudditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubrudditQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useSubrudditQuery(baseOptions: Apollo.QueryHookOptions<SubrudditQuery, SubrudditQueryVariables>) {
        return Apollo.useQuery<SubrudditQuery, SubrudditQueryVariables>(SubrudditDocument, baseOptions);
      }
export function useSubrudditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubrudditQuery, SubrudditQueryVariables>) {
          return Apollo.useLazyQuery<SubrudditQuery, SubrudditQueryVariables>(SubrudditDocument, baseOptions);
        }
export type SubrudditQueryHookResult = ReturnType<typeof useSubrudditQuery>;
export type SubrudditLazyQueryHookResult = ReturnType<typeof useSubrudditLazyQuery>;
export type SubrudditQueryResult = Apollo.QueryResult<SubrudditQuery, SubrudditQueryVariables>;
export const SubrudditsPostsDocument = gql`
    query SubrudditsPosts($limit: Int!, $cursor: String, $subrudditSlug: String) {
  posts(limit: $limit, cursor: $cursor, subrudditSlug: $subrudditSlug) {
    hasMore
    posts {
      ...PostSnippetFields
      subruddit {
        id
        name
        description
      }
    }
  }
}
    ${PostSnippetFieldsFragmentDoc}`;

/**
 * __useSubrudditsPostsQuery__
 *
 * To run a query within a React component, call `useSubrudditsPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubrudditsPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubrudditsPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      subrudditSlug: // value for 'subrudditSlug'
 *   },
 * });
 */
export function useSubrudditsPostsQuery(baseOptions: Apollo.QueryHookOptions<SubrudditsPostsQuery, SubrudditsPostsQueryVariables>) {
        return Apollo.useQuery<SubrudditsPostsQuery, SubrudditsPostsQueryVariables>(SubrudditsPostsDocument, baseOptions);
      }
export function useSubrudditsPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubrudditsPostsQuery, SubrudditsPostsQueryVariables>) {
          return Apollo.useLazyQuery<SubrudditsPostsQuery, SubrudditsPostsQueryVariables>(SubrudditsPostsDocument, baseOptions);
        }
export type SubrudditsPostsQueryHookResult = ReturnType<typeof useSubrudditsPostsQuery>;
export type SubrudditsPostsLazyQueryHookResult = ReturnType<typeof useSubrudditsPostsLazyQuery>;
export type SubrudditsPostsQueryResult = Apollo.QueryResult<SubrudditsPostsQuery, SubrudditsPostsQueryVariables>;
export const SubrudditsDocument = gql`
    query Subruddits($limit: Int!, $cursor: String) {
  subruddits(limit: $limit, cursor: $cursor) {
    subruddits {
      ...SubrudditFields
    }
    hasMore
  }
}
    ${SubrudditFieldsFragmentDoc}`;

/**
 * __useSubrudditsQuery__
 *
 * To run a query within a React component, call `useSubrudditsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubrudditsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubrudditsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSubrudditsQuery(baseOptions: Apollo.QueryHookOptions<SubrudditsQuery, SubrudditsQueryVariables>) {
        return Apollo.useQuery<SubrudditsQuery, SubrudditsQueryVariables>(SubrudditsDocument, baseOptions);
      }
export function useSubrudditsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubrudditsQuery, SubrudditsQueryVariables>) {
          return Apollo.useLazyQuery<SubrudditsQuery, SubrudditsQueryVariables>(SubrudditsDocument, baseOptions);
        }
export type SubrudditsQueryHookResult = ReturnType<typeof useSubrudditsQuery>;
export type SubrudditsLazyQueryHookResult = ReturnType<typeof useSubrudditsLazyQuery>;
export type SubrudditsQueryResult = Apollo.QueryResult<SubrudditsQuery, SubrudditsQueryVariables>;
export const SubrudditsListDocument = gql`
    query SubrudditsList {
  easySubruddits {
    ...SubrudditFields
  }
}
    ${SubrudditFieldsFragmentDoc}`;

/**
 * __useSubrudditsListQuery__
 *
 * To run a query within a React component, call `useSubrudditsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubrudditsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubrudditsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useSubrudditsListQuery(baseOptions?: Apollo.QueryHookOptions<SubrudditsListQuery, SubrudditsListQueryVariables>) {
        return Apollo.useQuery<SubrudditsListQuery, SubrudditsListQueryVariables>(SubrudditsListDocument, baseOptions);
      }
export function useSubrudditsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubrudditsListQuery, SubrudditsListQueryVariables>) {
          return Apollo.useLazyQuery<SubrudditsListQuery, SubrudditsListQueryVariables>(SubrudditsListDocument, baseOptions);
        }
export type SubrudditsListQueryHookResult = ReturnType<typeof useSubrudditsListQuery>;
export type SubrudditsListLazyQueryHookResult = ReturnType<typeof useSubrudditsListLazyQuery>;
export type SubrudditsListQueryResult = Apollo.QueryResult<SubrudditsListQuery, SubrudditsListQueryVariables>;