/**
 * Что Sentry собирает вместе с ошибкой, одно на бота и сайт. По умолчанию SDK v11 шлёт всё:
 * пользователя, cookies, заголовки, тела запросов, query и локальные переменные. Здесь всё
 * это выключено, остаются стек и сообщение.
 */
export const dataCollection = {
	userInfo: false,
	cookies: false,
	httpHeaders: false,
	httpBodies: [],
	urlQueryParams: false,
	genAI: { inputs: false, outputs: false },
	stackFrameVariables: false,
}
