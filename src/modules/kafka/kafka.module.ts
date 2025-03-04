import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaConsumerService } from './kafka-consumer.service';
import { MongoModule } from '../mongo/mongo.module';
import { InventoryService } from '../inventory/inventory.service';
import { InventoryModule } from '../inventory/inventory.module';
import { S3Module } from '../s3/s3.module';
import { S3Service } from '../s3/s3.service';

@Module({
  imports: [MongoModule, InventoryModule, S3Module],
  providers: [KafkaService, KafkaConsumerService, InventoryService, S3Service],
  exports: [KafkaService, KafkaConsumerService],
})
export class KafkaModule {}
