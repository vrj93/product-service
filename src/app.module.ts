import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './modules/mongo/mongo.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { S3Service } from './modules/s3/s3.service';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './modules/s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InventoryModule,
    MongoModule,
    KafkaModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
