import { Injectable } from '@nestjs/common';
import { AppPlans } from '../../domain/value-objects/planes.value-object';

@Injectable()
export class GetPlansUseCase {
  execute() {
    return AppPlans;
  }
}
