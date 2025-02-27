import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './modules/mongo/mongo.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { InventoryModule } from './modules/inventory/inventory.module';

@Module({
  imports: [InventoryModule, MongoModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
