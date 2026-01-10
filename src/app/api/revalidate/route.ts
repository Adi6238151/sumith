import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(request: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string
      slug?: { current: string }
    }>(request, process.env.SANITY_WEBHOOK_SECRET)

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 401 }
      )
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: 'Bad Request' },
        { status: 400 }
      )
    }

    // Revalidate based on content type
    console.log('🔄 Revalidating:', body._type)

    switch (body._type) {
      case 'product':
        revalidatePath('/solutions/products')
        revalidatePath('/')
        break
      case 'emailSettings':
        revalidateTag('email-settings')
        break
      case 'contactTopic':
        revalidateTag('contact-topics')
        break
      default:
        revalidatePath('/')
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      now: Date.now(),
    })
  } catch (error: unknown) {
    const err = error as Error
    console.error('Webhook error:', err)
    return NextResponse.json(
      { message: 'Internal Server Error', error: err.message },
      { status: 500 }
    )
  }
}
