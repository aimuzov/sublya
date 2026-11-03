import { pageTitle as sharedPageTitle } from '@aimuzov/infra-site-kit/title.js'

import { site } from '#frontend/data/site.ts'

/**
 * Заголовок страницы: её название и через тире название сайта.
 * У главной страницы -- просто заголовок сайта.
 */
export function pageTitle(title?: string) {
	return sharedPageTitle(title, { siteName: site.name, homeTitle: site.title })
}
