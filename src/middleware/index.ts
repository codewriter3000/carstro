import {isAdmin, redirect} from '@/../lib'
import { defineMiddleware } from 'astro/middleware'
import type {APIContext, MiddlewareNext} from 'astro'

const isAdminUrl = (url: string) => {
    const re = /^[htps]+:\/\/[A-Za-z0-9.:]+\/admin/

    const loginRe = /login$/

    return re.test(url) && !loginRe.test(url)
}


export const onRequest = async (context: any, next: MiddlewareNext) => {
    if (!isAdminUrl(context['url'].toString())) {
        return next()
    }

    const isAdminJSON: any = await isAdmin(context.cookies.get('token').value)

    if (isAdminJSON['is_admin']) {
        return next()
    } else {
        return new Response(null, {
            status: 403,
            statusText: 'Unauthorized'
        })
    }
}