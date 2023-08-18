import { DatabaseProvider } from 'src/types';
import { is } from 'src/tools';

export const MultiTypeormProviderDecoratorFactory = function MigrateDecorator<T>(
  options: {[key in DatabaseProvider]: T},
): T {
  if (is.sqlite) {
    return options.sqlite;
  } else if (is.postgres) {
    return options.postgres;
  } else {
    return options.postgres;
  }
};
