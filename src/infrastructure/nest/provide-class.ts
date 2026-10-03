import type { InjectionToken, Provider } from '@nestjs/common';

/**
 * Registers a framework-free class in Nest without decorating it:
 * Nest builds it through a factory and injects the given dependencies.
 * `deps` must match the constructor parameters one for one.
 */
export function provideClass<Args extends unknown[], T>(
  Class: new (...args: Args) => T,
  deps: { [K in keyof Args]: InjectionToken },
): Provider {
  return {
    provide: Class,
    useFactory: (...args: unknown[]) => new Class(...(args as Args)),
    inject: deps,
  };
}
