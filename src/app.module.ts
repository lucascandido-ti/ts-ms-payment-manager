import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CacheModule } from '@nestjs/cache-manager';
import { cacheModuleOptions, natsModuleOptions } from './config/api.config';
import { configModuleOptions } from './config';
import { ConfigModule } from '@nestjs/config';

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
