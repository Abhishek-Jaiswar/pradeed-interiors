import { NextResponse } from 'next/server';

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export function successResponse<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(error: string, status = 400): NextResponse<ApiResponse<never>> {
  return NextResponse.json({ success: false, error }, { status });
}

export function unauthorizedResponse(message = 'Unauthorized'): NextResponse<ApiResponse<never>> {
  return errorResponse(message, 401);
}

export function notFoundResponse(message = 'Resource not found'): NextResponse<ApiResponse<never>> {
  return errorResponse(message, 404);
}

export function serverErrorResponse(message = 'Internal server error'): NextResponse<ApiResponse<never>> {
  return errorResponse(message, 500);
}
