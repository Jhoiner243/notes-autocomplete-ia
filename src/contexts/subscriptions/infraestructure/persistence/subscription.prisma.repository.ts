import { Injectable } from '@nestjs/common';
import {
  StatusSubscription,
  Subscription,
} from '../../../../../generated/prisma';
import { PrismaService } from '../../../../infraestructure/prisma/prisma.service';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository';

export const SubscriptionsRepositoryToken = Symbol('ISubscriptionRepository');

@Injectable()
export class SubscriptionPrismaRepository implements ISubscriptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<SubscriptionEntity | null> {
    const sub = await this.prisma.subscription.findUnique({ where: { id } });
    if (!sub) return null;
    return this.toEntity(sub);
  }

  async findByStripeId(stripeId: string): Promise<SubscriptionEntity | null> {
    const sub = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: stripeId },
    });
    if (!sub) return null;
    return this.toEntity(sub);
  }

  async create(subscription: SubscriptionEntity): Promise<void> {
    await this.prisma.subscription.create({
      data: {
        ...subscription,
      },
    });
  }

  async update(subscription: SubscriptionEntity): Promise<void> {
    await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        ...subscription,
      },
    });
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await this.prisma.subscription.update({
      where: { id },
      data: { status: status as StatusSubscription },
    });
  }

  private toEntity(sub: Subscription): SubscriptionEntity {
    return new SubscriptionEntity(
      sub.id,
      sub.userId,
      sub.stripeSubscriptionId,
      sub.planId,
      sub.status,
      sub.currentPeriodEnd,
    );
  }
}
