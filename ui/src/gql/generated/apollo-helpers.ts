import type { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type BibleKeySpecifier = ('bookName' | 'booksCount' | 'id' | BibleKeySpecifier)[];
export type BibleFieldPolicy = {
	bookName?: FieldPolicy<any> | FieldReadFunction<any>,
	booksCount?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('refreshTokens' | 'signIn' | 'signOut' | 'signUp' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	refreshTokens?: FieldPolicy<any> | FieldReadFunction<any>,
	signIn?: FieldPolicy<any> | FieldReadFunction<any>,
	signOut?: FieldPolicy<any> | FieldReadFunction<any>,
	signUp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('getBible' | 'me' | 'user' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	getBible?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('createdAt' | 'id' | 'lastSeen' | 'status' | 'username' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastSeen?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Bible?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BibleKeySpecifier | (() => undefined | BibleKeySpecifier),
		fields?: BibleFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;