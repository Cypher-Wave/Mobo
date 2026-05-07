export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.API_URL!;

type RouteParams = {
  params: {
    path: string[];
  };
};

export async function GET(
  req: NextRequest,
  context: RouteParams
) {
  return handler(req, context);
}

export async function POST(
  req: NextRequest,
  context: RouteParams
) {
  return handler(req, context);
}

export async function PUT(
  req: NextRequest,
  context: RouteParams
) {
  return handler(req, context);
}

export async function DELETE(
  req: NextRequest,
  context: RouteParams
) {
  return handler(req, context);
}

async function handler(
  req: NextRequest,
  context: RouteParams
) {
  const path = context.params.path.join("/");
  const url = `${BACKEND_URL}/api/${path}`;

  console.log("🔁 Proxy:", req.method, url);

  const body =
    req.method !== "GET"
      ? await req.text()
      : undefined;

  const backendResponse = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      cookie: req.headers.get("cookie") || "",
    },
    body,
  });

  const responseBody = await backendResponse.text();

  const response = new NextResponse(responseBody, {
    status: backendResponse.status,
  });

  // 🔥 copia TODOS os headers importantes
  backendResponse.headers.forEach((value, key) => {
    if (
      key.toLowerCase() === "set-cookie" ||
      key.toLowerCase() === "content-type"
    ) {
      response.headers.append(key, value);
    }
  });

  return response;
}