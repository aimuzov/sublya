// Ошибки бота уходят в Sentry, в общий с сайтом проект `sublya`, их различает тег
// `component`. Только ошибки, без трейсинга. Без `SENTRY_DSN` (локально, в тестах)
// SDK не включается, а `captureException` ничего не делает.
//
// Модуль импортируется в main.ts первым: тогда необработанные исключения ловятся
// с самого старта.

import * as Sentry from '@sentry/node'

import pkg from '#package.json' with { type: 'json' }

if (process.env.SENTRY_DSN) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		environment: 'production',
		release: `sublya@${pkg.version}`,
		initialScope: { tags: { component: 'bot' } },
	})
}

export const { captureException, flush } = Sentry
