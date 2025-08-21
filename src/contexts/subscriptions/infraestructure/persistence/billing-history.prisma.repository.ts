import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '../../../../../generated/prisma';
import { BillingHistoryEntity } from '../../../domain/entities/billing-history.entity';
import { IBillingHistoryRepository } from '../../../domain/repositories/billing-history.repository';

@Injectable()
export class BillingHistoryPrismaRepository
  implements IBillingHistoryRepository
{
  constructor(@Inject(PrismaClient) private readonly prisma: PrismaClient) {}

  async create(history: BillingHistoryEntity): Promise<void> {
    await this.prisma.billingHistory.create({ data: { ...history } });
  }

  async findBySubscriptionId(
    subscriptionId: string,
  ): Promise<BillingHistoryEntity[]> {
    const list = await this.prisma.billingHistory.findMany({
      where: { subscriptionId },
    });
    return list.map(this.toEntity);
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await this.prisma.billingHistory.update({
      where: { id },
      data: { status },
    });
  }

  private toEntity(bh: any): BillingHistoryEntity {
    return new BillingHistoryEntity(
      bh.id,
      bh.subscriptionId,
      bh.stripeInvoiceId,
      bh.amount,
      bh.status,
      bh.createdAt,
    );
  }
}
