import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(request) {
  try {
    const data = await kv.get(request.nextUrl.searchParams.get('key'));
    if (data) {
      // 如果数据存在，返回 JSON 响应
      console.log(data);
      return NextResponse.json({
        data: data, // 将 KV 中的数据转换为字符串
      }, {
        status: 200,
      });
    } else {
      // 如果数据不存在，返回 404
      return NextResponse.json({
        key: request.nextUrl.searchParams.get('key'),
        error: 'Key not found',
      }, {
        status: 404,
      });
    }
  } catch (error) {
    // 如果发生错误，返回 500
    return NextResponse.json({
      body: request.body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
      error: 'Failed to fetch data from KV store',
    }, {
      status: 500,
    });
  }
}


export async function POST(request) {
  try {
    const json = await request.json();
    const data = await kv.set(json.key, json.value);
    if (data === 'OK') {
      // 如果数据存在，返回 JSON 响应
      return NextResponse.json({
        data: data.toString(), // 将 KV 中的数据转换为字符串
      }, {
        status: 200,
      });
    }
  } catch (error) {
    // 如果发生错误，返回 500
    return NextResponse.json({
      body: request.body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
      error: 'Failed to fetch data from KV store',
    }, {
      status: 500,
    });
  }
}