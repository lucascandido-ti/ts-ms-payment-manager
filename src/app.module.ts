import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { configModuleOptions, cacheModuleOptions } from '@/config';

import { PaymentModule } from '@/modules';

@Module({
  imports: [
    CacheModule.register(cacheModuleOptions),
    ConfigModule.forRoot(configModuleOptions),
    PaymentModule,
  ],
})
export class AppModule {}
