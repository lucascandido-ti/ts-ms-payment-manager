import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ClientsModule } from '@nestjs/microservices';

import {
  configModuleOptions,
  cacheModuleOptions,
  natsModuleOptions,
} from '@/config';

import { PaymentModule } from '@/modules';

@Module({
  imports: [
    CacheModule.register(cacheModuleOptions),
    ConfigModule.forRoot(configModuleOptions),
    ClientsModule.registerAsync([natsModuleOptions]),
    PaymentModule,
  ],
})
export class AppModule {}
