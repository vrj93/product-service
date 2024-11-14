import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaConsumerService } from './kafka-consumer.service';
import { ElasticSearchModule } from '../elasticsearch/elasticsearch.module';
import { MongoModule } from '../mongo/mongo.module';

@Module({
  imports: [MongoModule, ElasticSearchModule],
  providers: [KafkaService, KafkaConsumerService],
  exports: [KafkaService, KafkaConsumerService],
})
export class KafkaModule {}
