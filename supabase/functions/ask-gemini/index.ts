import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not set' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const { prompt, messages } = body || {};

    let contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages) && messages.length > 0) {
      contents = messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(m.content || '') }],
      }));
    } else if (typeof prompt === 'string' && prompt.trim()) {
      contents = [
        {
          role: 'user',
          parts: [{ text: String(prompt).slice(0, 16000) }],
        },
      ];
    } else {
      return new Response(JSON.stringify({ error: 'Missing prompt or messages' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const model = 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
      contents,
      generationConfig: {
        temperature: 0.2,
        topP: 0.9,
        maxOutputTokens: 800,
      },
    };

    console.log('Calling Gemini. Messages:', contents.length);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return new Response(JSON.stringify({ error: data?.error?.message || 'Gemini API error' }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const parts = data?.candidates?.[0]?.content?.parts || [];
    const text = parts.map((p: any) => p?.text ?? '').join('').trim();

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ask-gemini function:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
