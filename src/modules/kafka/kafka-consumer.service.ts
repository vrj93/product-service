import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.kafka = new Kafka({
      clientId: 'product-service',
      brokers: [this.configService.get<string>('kafkaConnect')],
    });
    this.consumer = this.kafka.consumer({ groupId: 'product-group' });
    await this.connectConsumer();
  }

  async connectConsumer() {
    await this.consumer.connect();
    /* await this.consumer.subscribe({
      topic: 'product_changes',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const { operationType, documentKey, fullDocument } = JSON.parse(
          message.value.toString(),
        );

        try {
          if (operationType === 'insert' || operationType === 'update') {
          
          } else if (operationType === 'delete') {
           
          }
        } catch (error) {
          console.error('Failed to process message:', error);
        }
      },
    });
    console.log(
      'Kafka Consumer connected and listening to topic "product_changes"',
    ); */
  }

  async disconnectConsumer() {
    await this.consumer.disconnect();
  }
}
