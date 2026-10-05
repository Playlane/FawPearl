// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://fawpearl.org',
  // Old WordPress addresses keep working after the move.
  redirects: {
    '/book-online': '/book',
    '/schedule-appointment': '/book',
    '/prices': '/insurance',
    '/fees-insurance': '/insurance',
    '/insurance-and-fees': '/insurance',
    '/meet-the-team': '/provider',
  },
});
