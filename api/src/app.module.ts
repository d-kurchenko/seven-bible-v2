import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BibleModule } from './modules/bible/bible.module';
import { AppConfig } from './configs';
import { createGraphQLContext } from './tools/gql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      inject: [AppConfig.KEY],
      driver: ApolloDriver,
      useFactory: (appConfig: ConfigType<typeof AppConfig>) => {
        return {
          context: (ctx: { connectionParams: Record<string, unknown> }) => createGraphQLContext({
            app: appConfig.shortname,
            connectionParams: ctx.connectionParams,
          }),
          autoSchemaFile: true,
          playground: false,
          plugins: [
            appConfig.env === 'development'
              ? ApolloServerPluginLandingPageLocalDefault() : undefined,
          ],
        };
      },
    }),
    BibleModule,
  ],
})
export class AppModule {}
