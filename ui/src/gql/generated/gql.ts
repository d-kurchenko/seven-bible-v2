/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation RefreshTokens {\n  refreshTokens\n}": types.RefreshTokensDocument,
    "mutation SignIn($input: SignInInput!) {\n  signIn(input: $input) {\n    ...UserFields\n  }\n}": types.SignInDocument,
    "mutation SignOut {\n  signOut\n}": types.SignOutDocument,
    "mutation SignUp($input: SignUpInput!) {\n  signUp(input: $input) {\n    ...UserFields\n  }\n}": types.SignUpDocument,
    "query GetBible {\n  getBible {\n    bookName\n    booksCount\n  }\n}": types.GetBibleDocument,
    "fragment UserFields on User {\n  id\n  username\n  createdAt\n  lastSeen\n  status\n}": types.UserFieldsFragmentDoc,
    "query Me {\n  me {\n    ...UserFields\n  }\n}": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RefreshTokens {\n  refreshTokens\n}"): (typeof documents)["mutation RefreshTokens {\n  refreshTokens\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SignIn($input: SignInInput!) {\n  signIn(input: $input) {\n    ...UserFields\n  }\n}"): (typeof documents)["mutation SignIn($input: SignInInput!) {\n  signIn(input: $input) {\n    ...UserFields\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SignOut {\n  signOut\n}"): (typeof documents)["mutation SignOut {\n  signOut\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SignUp($input: SignUpInput!) {\n  signUp(input: $input) {\n    ...UserFields\n  }\n}"): (typeof documents)["mutation SignUp($input: SignUpInput!) {\n  signUp(input: $input) {\n    ...UserFields\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetBible {\n  getBible {\n    bookName\n    booksCount\n  }\n}"): (typeof documents)["query GetBible {\n  getBible {\n    bookName\n    booksCount\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserFields on User {\n  id\n  username\n  createdAt\n  lastSeen\n  status\n}"): (typeof documents)["fragment UserFields on User {\n  id\n  username\n  createdAt\n  lastSeen\n  status\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    ...UserFields\n  }\n}"): (typeof documents)["query Me {\n  me {\n    ...UserFields\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;