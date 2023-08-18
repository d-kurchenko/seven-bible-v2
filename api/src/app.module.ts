import {
  DynamicModule, ForwardReference, Module, Type,
} from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import * as configs from 'src/configs';
import { createGraphQLContext } from 'src/tools';
import { IdModule } from 'src/modules/id/id.module';
import { BibleModule } from 'src/modules/bible/bible.module';
import { UsersModule } from './modules/users/users.module';
import { UserManagerModule } from './modules/user-manager/user-manager.module';
import { NodeEnv } from 'src/types';
import { AuthModule } from './modules/auth/auth.module';

type ModuleImport = Type<unknown> | DynamicModule | Promise<DynamicModule> | ForwardReference<unknown>

const coreModules: ModuleImport[] = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: Object.values(configs),
  }),
  TypeOrmModule.forRootAsync({
    useFactory: async (dbConfig: ConfigType<typeof configs['DatabaseConfig']>) => dbConfig,
    inject: [configs.DatabaseConfig.KEY],
  }),
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
    inject: [configs.AppConfig.KEY],
    driver: ApolloDriver,
    useFactory: (appConfig: ConfigType<typeof configs['AppConfig']>) => {
      return {
        context: (context: { connectionParams: Record<string, unknown> }) => createGraphQLContext({
          app: appConfig.shortname,
          connectionParams: context.connectionParams,
        }),
        cors: {
          credentials: true,
          origin: 'http://localhost:4100',
        },
        autoSchemaFile: true,
        playground: false,
        plugins: [
          appConfig.nodeEnv === NodeEnv.LOCAL
            ? ApolloServerPluginLandingPageLocalDefault() : undefined,
        ],
      };
    },
  }),
];

const appModules: ModuleImport[] = [
  IdModule,
  BibleModule,
  UserManagerModule,
  UsersModule,
  AuthModule,
];

@Module({
  imports: [
    ...coreModules,
    ...appModules,
  ],
})
export class AppModule {}
