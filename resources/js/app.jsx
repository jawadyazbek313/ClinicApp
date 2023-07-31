import './bootstrap';
import '../css/app.css';
import NProgress from 'nprogress'
import { router } from '@inertiajs/react'
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: false,
});
router.on('start', () => NProgress.start());
router.on('progress', (event) => {
    if (event.detail.progress.percentage) {
      NProgress.set((event.detail.progress.percentage / 100) * 0.9)
    }
  })
router.on('finish', (event) => {
    if (event.detail.visit.completed) {
      NProgress.done()
    } else if (event.detail.visit.interrupted) {
      NProgress.set(0)
    } else if (event.detail.visit.cancelled) {
      NProgress.done()
      NProgress.remove()
    }
  })