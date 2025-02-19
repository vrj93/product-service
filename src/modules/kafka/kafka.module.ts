import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaConsumerService } from './kafka-consumer.service';
import { MongoModule } from '../mongo/mongo.module';

@Module({
  imports: [MongoModule],
  providers: [KafkaService, KafkaConsumerService],
  exports: [KafkaService, KafkaConsumerService],
})
export class KafkaModule {}
