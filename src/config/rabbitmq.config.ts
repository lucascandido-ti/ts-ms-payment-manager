import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProviderOptions,
  ClientsProviderAsyncOptions,
} from '@nestjs/microservices';
import { IsNotEmpty, IsString } from 'class-validator';

export const rabbitmqModuleOptions: ClientsProviderAsyncOptions = {
  name: 'ORDER_SERVICE',
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    configService.get<ClientProviderOptions>('api.rabbitmq')!,
};

export class QueueOptions {
  durable: boolean;
}

export class RabbitMQOptions {
  urls: string[];
  queue: string;
  queueOptions: QueueOptions;
}

export class RabbitMQConfig {
  @IsString()
  @IsNotEmpty()
  name: string;

  options: RabbitMQOptions;
}
