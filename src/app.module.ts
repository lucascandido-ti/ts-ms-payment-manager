import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ClientsModule, Transport } from '@nestjs/microservices';

import {
  configModuleOptions,
  cacheModuleOptions,
  rabbitmqModuleOptions,
} from '@/config';

import { PaymentModule } from '@/modules';

@Module({
  imports: [
    ClientsModule.register([
      { ...rabbitmqModuleOptions, transport: Transport.RMQ },
    ]),
    CacheModule.register(cacheModuleOptions),
    ConfigModule.forRoot(configModuleOptions),
    PaymentModule,
  ],
})
export class AppModule {}
