export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ""

export const ENDPOINTS = {
  promotersRanking: `${API_BASE_URL}/promoters/ranking`,
} as const
