import { Injectable } from '@nestjs/common';
import { BillingHistory } from '../../../../../generated/prisma';
import { PrismaService } from '../../../../infraestructure/prisma/prisma.service';
import { BillingHistoryEntity } from '../../domain/entities/billing-history.entity';
import { IBillingHistoryRepository } from '../../domain/repositories/billing-history.repository';

export const BillingHistoryRepositoryToken = Symbol(
  'IBillingHistoryRepository',
);

@Injectable()
export class BillingHistoryPrismaRepository
  implements IBillingHistoryRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(history: BillingHistoryEntity): Promise<void> {
    await this.prisma.billingHistory.create({ data: { ...history } });
  }

  async findBySubscriptionId(
    subscriptionId: string,
  ): Promise<BillingHistoryEntity[]> {
    const list = await this.prisma.billingHistory.findMany({
      where: { subscriptionId },
    });
    return list.map((item) => this.toEntity(item));
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await this.prisma.billingHistory.update({
      where: { id },
      data: { status },
    });
  }

  private toEntity(bh: BillingHistory): BillingHistoryEntity {
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
