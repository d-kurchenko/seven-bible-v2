import type { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type BibleKeySpecifier = ('bookName' | 'booksCount' | BibleKeySpecifier)[];
export type BibleFieldPolicy = {
	bookName?: FieldPolicy<any> | FieldReadFunction<any>,
	booksCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('getBible' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	getBible?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Bible?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BibleKeySpecifier | (() => undefined | BibleKeySpecifier),
		fields?: BibleFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;