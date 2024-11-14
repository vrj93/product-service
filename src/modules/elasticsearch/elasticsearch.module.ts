import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchSyncService } from './elasticsearch.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.elasticConnect,
      auth: {
        username: process.env.elasticUser,
        password: process.env.elasticPassword,
      },
    }),
  ],
  providers: [ElasticsearchSyncService],
  exports: [ElasticsearchModule, ElasticsearchSyncService],
})
export class ElasticSearchModule {}
