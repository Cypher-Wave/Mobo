import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.API_URL;

type RouteParams = {
  path: string[];
};

export async function GET(
  req: NextRequest,
  { params }: { params: RouteParams }
) {
  return handler(req, params);
}

export async function POST(
  req: NextRequest,
  { params }: { params: RouteParams }
) {
  return handler(req, params);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: RouteParams }
) {
  return handler(req, params);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: RouteParams }
) {
  return handler(req, params);
}

async function handler(req: NextRequest, params: RouteParams) {
  const path = params.path.join("/");
  const url = `${BACKEND_URL}/api/${path}`;

  console.log("🔁 PROXY:", req.method, url);

  const body = req.method !== "GET" ? await req.text() : undefined;

  const response = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      cookie: req.headers.get("cookie") || "",
      origin: req.headers.get("origin") || "",
    },
    body,
    credentials: "include",
  });

  const res = new NextResponse(await response.text(), {
    status: response.status,
  });

  const setCookie = response.headers.get("set-cookie");

  if (setCookie) {
    res.headers.set("set-cookie", setCookie);
  }

  return res;
}