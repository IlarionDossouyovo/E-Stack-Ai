import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ErpModule } from './modules/erp/erp.module';
import { CrmModule } from './modules/crm/crm.module';
import { AiOrchestratorModule } from './modules/ai-orchestrator/ai-orchestrator.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host') || 'localhost',
        port: configService.get('database.port') || 5432,
        username: configService.get('database.username') || 'postgres',
        password: configService.get('database.password') || 'postgres',
        database: configService.get('database.name') || 'estack_ai',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('database.synchronize') || true,
        logging: configService.get('database.logging') || false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ErpModule,
    CrmModule,
    AiOrchestratorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
