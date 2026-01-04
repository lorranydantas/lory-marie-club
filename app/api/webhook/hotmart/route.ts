import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  'https://ylhzxbzfgskcgsgowubp.supabase.co',
  'sb_publishable_7-Ot-sy99CWbCa_fslP_qA_gsrGHQU8'
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Hotmart envia dados da compra
    const email = body.data?.buyer?.email || body.buyer?.email;
    const productName = body.data?.product?.name || body.product?.name;
    const hotmartId = body.data?.purchase?.transaction || body.purchase?.transaction;
    const status = body.event || 'purchase';

    if (!email) {
      return NextResponse.json({ error: 'Email não encontrado' }, { status: 400 });
    }

    // Salva no banco de dados
    const { error } = await supabase
      .from('subscriptions')
      .insert({
        email: email.toLowerCase(),
        product_name: productName,
        hotmart_id: hotmartId,
        status: status === 'PURCHASE_COMPLETE' ? 'active' : status
      });

    if (error) {
      console.error('Erro ao salvar:', error);
      return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}