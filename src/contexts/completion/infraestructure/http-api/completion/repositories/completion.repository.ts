import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../../infraestructure/prisma/prisma.service';

@Injectable()
export class CompletionRepositoryImple {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async completionSdkAiTokesConsumed({
    userId,
  }: {
    userId: string;
  }): Promise<{ remainingTokens: number }> {
    // Sum tokens consumed for the user across all usage records
    const aggregate = await this.prismaService.usageRecord.aggregate({
      where: {
        userId,
      },
      _sum: {
        tokensConsumed: true,
      },
    });

    const totalConsumed = aggregate._sum.tokensConsumed ?? 0;
    return {
      remainingTokens: totalConsumed,
    };
  }

  async createUsageRecord({
    userId,
    tokensConsumed,
    costEstimated,
    endpoint,
  }: {
    userId: string;
    tokensConsumed: number;
    costEstimated: number;
    endpoint: 'Autocomplete';
  }): Promise<void> {
    await this.prismaService.usageRecord.create({
      data: {
        userId,
        endpoint,
        tokensConsumed,
        costEstimated,
      },
    });
  }
}
