import { AppPlans } from '../../domain/value-objects/planes.value-object';

export class GetPlansUseCase {
  execute() {
    return AppPlans;
  }
}
