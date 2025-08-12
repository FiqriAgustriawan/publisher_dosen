import { usePage } from '@inertiajs/react';

export function useRoute() {
  const page = usePage();
  return page.url;
}