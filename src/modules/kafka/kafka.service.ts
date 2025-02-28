import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../schema/product.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async onModuleInit() {
    this.kafka = new Kafka({
      clientId: 'product-service',
      brokers: [this.configService.get<string>('kafkaConnect')],
    });
    this.producer = this.kafka.producer();
    await this.producer.connect();
    const changeProduct = this.productModel.watch([
      { $match: { operationType: { $in: ['insert', 'update', 'delete'] } } },
    ]);

    changeProduct.on('change', async (change) => {
      await this.publish('product_changes', change);
    });
    console.log('Kafka Producer connected');
  }

  async publish(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
