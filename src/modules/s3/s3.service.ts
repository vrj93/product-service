import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;
  private awsRegion: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
      },
    });

    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET');
    this.awsRegion = this.configService.get<string>('AWS_REGION');
  }

  async uploadImage(image: Express.Multer.File, productId: string): Promise<string> {
    const fileKey = `products/${productId}/${randomUUID()}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      Body: image.buffer,
      ContentType: image.mimetype,
    });

    await this.s3Client.send(command);
    return `https://${this.bucketName}.s3.${this.awsRegion}.amazonaws.com/${fileKey}`;
  }

  async getImageUrls(images: string[]): Promise<string[]> {
    try {
      return await Promise.all(
        images.map(async (image) => {
          const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: `products/${image}`,
          });

          return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
        })
      );
    } catch (error) {
      console.error('Error fetching images from S3:', error);
      throw new Error('Failed to retrieve images from S3');
    }
  }
}
