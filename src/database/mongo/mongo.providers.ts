import * as mongoose from 'mongoose';

export const mongoProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://root:example@localhost:27017/nest?authSource=admin',
      ),
  },
];
