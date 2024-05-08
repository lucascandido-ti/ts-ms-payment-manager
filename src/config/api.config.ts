import {
  CacheModuleAsyncOptions,
  CacheModuleOptions,
} from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProviderOptions,
  ClientsProviderAsyncOptions,
} from '@nestjs/microservices';
import { ThrottlerAsyncOptions } from '@nestjs/throttler';

import {
  IsArray,
  IsInstance,
  IsNotEmpty,
  IsNumber,
  IsPort,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ApiCacheConfig implements CacheModuleOptions {
  @IsNumber()
  @IsPositive()
  max: number;

  @IsNumber()
  @IsPositive()
  ttl: number;
}

export const cacheModuleOptions: CacheModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const cacheConfig = configService.get<CacheModuleOptions>('api.cache')!;

    return { isGlobal: true, ...cacheConfig };
  },
};

export class ApiThrottlerConfig {
  @IsNumber()
  @IsPositive()
  limit: number;

  @IsNumber()
  @IsPositive()
  ttl: number;
}

class NatsOptionConfig {
  @IsArray()
  @IsNotEmpty()
  servers: string[];
}

export class NatsConfig {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInstance(NatsOptionConfig)
  @ValidateNested()
  options: NatsOptionConfig;
}

export const throttlerModuleOptions: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    configService.get('api.throttler')!,
};

export const natsModuleOptions: ClientsProviderAsyncOptions = {
  name: 'NATS_SERVICE',
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    configService.get<ClientProviderOptions>('api.nats')!,
};

export class ApiConfig {
  @IsPort()
  @IsString()
  port: string;

  @IsNotEmpty()
  @IsString()
  prefix: string;

  @IsInstance(ApiCacheConfig)
  @ValidateNested()
  cache: ApiCacheConfig;

  @IsInstance(ApiThrottlerConfig)
  @ValidateNested()
  throttler: ApiThrottlerConfig;

  @IsInstance(NatsConfig)
  @ValidateNested()
  nats: NatsConfig;
}
