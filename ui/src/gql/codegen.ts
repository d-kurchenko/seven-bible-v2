import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: 'src/gql/documents/**/*.gql',
  generates: {
    'src/gql/generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
    },
    'src/gql/generated/apollo-helpers.ts': {
      plugins: ['typescript-apollo-client-helpers'],
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
