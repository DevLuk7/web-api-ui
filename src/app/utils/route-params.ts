import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export const getRouteParam = (param: string): string => {
  const route = inject(ActivatedRoute);

  return route.snapshot.params[param];
};
