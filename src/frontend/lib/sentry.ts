import * as Sentry from '@sentry/browser'

// Именованный импорт: в бандл попадает только версия, а не весь package.json.
import { version } from '#package.json'
import { dataCollection } from '#shared/sentry.ts'

/**
 * Отправляет ошибки браузера в Sentry, в общий с ботом проект, с тегом `component: site`.
 * Только ошибки, без трейсинга, Replay и сессий.
 *
 * DSN вшивается при сборке из `PUBLIC_SENTRY_DSN`. Без него (локально, в CI) SDK не включается.
 */
export function sentry() {
	const dsn = import.meta.env.PUBLIC_SENTRY_DSN

	if (!dsn) return

	Sentry.init({
		dsn,
		environment: 'production',
		release: `sublya@${version}`,
		initialScope: { tags: { component: 'site' } },
		dataCollection,
		// без сессий: иначе каждый заход на страницу шлёт запрос в Sentry, даже без ошибок
		integrations: (defaults) => defaults.filter((integration) => integration.name !== 'BrowserSession'),
	})
}
