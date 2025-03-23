import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); // Pega o token do cookie

  if (!token) {
    console.log("Token não encontrado, redirecionando para o login.");
    return NextResponse.redirect(new URL("/", request.url)); // Redireciona para /login
  }

  console.log("Token válido, permitindo o acesso à página.");
  return NextResponse.next(); // Permite o acesso à página
}

export const config = {
  matcher: [
    "/dashboard",
    "/trainings",
    "/trainers",
    "/settings",
    "/clients",
    "/classes",
    "/settings",
  ],
};
