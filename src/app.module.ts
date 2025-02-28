import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './modules/mongo/mongo.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { S3Service } from './services/s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InventoryModule, 
    MongoModule, 
    KafkaModule
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
