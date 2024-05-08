import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';

import {
  configModuleOptions,
  cacheModuleOptions,
  natsModuleOptions,
} from './config';

@Module({
  imports: [
    CacheModule.register(cacheModuleOptions),
    ConfigModule.forRoot(configModuleOptions),
    ClientsModule.registerAsync([natsModuleOptions]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
