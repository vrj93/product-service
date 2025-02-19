import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './modules/mongo/mongo.module';
import { KafkaModule } from './modules/kafka/kafka.module';

@Module({
  imports: [MongoModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
