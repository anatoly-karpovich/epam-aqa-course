import allure from '@wdio/allure-reporter';

export function logStep(stepName: string): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
          await allure.step(stepName, async () => {
            try {
              const result = await originalMethod.apply(this, args);
              return result;
            } catch (error) {
              throw error;
            }
          });
        };
        return descriptor;
      };
  }