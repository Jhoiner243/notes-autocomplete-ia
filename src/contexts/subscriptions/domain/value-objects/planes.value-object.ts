// Se define un tipo para asegurar que todos los planes tengan la misma estructura.
export type Plan = {
  readonly name: string;
  readonly price: number;
  readonly currency: string;
  readonly total_days: number;
  readonly total_tokens: number;
};

export const AppPlans: Plan[] = [
  {
    name: 'Plan basico',
    price: 30000,
    total_days: 30,
    currency: 'COP',
    total_tokens: 100,
  },

  {
    name: 'Plan premium',
    price: 90000,
    total_days: 90,
    currency: 'COP',
    total_tokens: 500,
  },
];
