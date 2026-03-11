import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret')
    
    console.log('🔔 Webhook received!')
    console.log('Secret provided:', secret ? 'Yes' : 'No')
    
    if (secret !== process.env.REVALIDATE_SECRET) {
      console.log('❌ Invalid secret')
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const body = await request.json()
    console.log('📦 Webhook body:', body)

    const { _type } = body

    console.log('🔄 Revalidating for type:', _type)

    // Use revalidatePath instead of revalidateTag for Next.js 16
    switch (_type) {
      case 'product':
        revalidatePath('/solutions/products')
        revalidatePath('/')
        console.log('✅ Revalidated products page')
        break
      case 'solution':
        revalidatePath('/')
        revalidatePath('/solutions/transit-bus')
        revalidatePath('/solutions/metro-rail')
        revalidatePath('/solutions/Airport')
        console.log('✅ Revalidated solutions and homepage')
        break
      case 'emailSettings':
        revalidatePath('/contact-us')
        console.log('✅ Revalidated contact page')
        break
      case 'contactTopic':
        revalidatePath('/contact-us')
        console.log('✅ Revalidated contact page')
        break
      default:
        revalidatePath('/')
        console.log('✅ Revalidated homepage')
    }

    return NextResponse.json({ 
      revalidated: true, 
      type: _type,
      timestamp: Date.now() 
    })
  } catch (error: unknown) {
    const err = error as Error
    console.error('❌ Webhook error:', err.message)
    return NextResponse.json(
      { message: 'Error', error: err.message },
      { status: 500 }
    )
  }
}
