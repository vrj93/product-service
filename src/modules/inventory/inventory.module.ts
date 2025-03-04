import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { MongoModule } from '../mongo/mongo.module';
import { S3Service } from '../s3/s3.service';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [MongoModule, S3Module],
  controllers: [InventoryController],
  providers: [InventoryService, S3Service],
  exports: [InventoryService],
})
export class InventoryModule {}
