// MoviePilot 响应体解析：业务数据可能包在 `{ success, message, data }` 内层
export interface MpEnvelope<T = unknown> {
  success?: boolean
  message?: string
  data?: T
}

/** 判断响应体是否为 MoviePilot 的统一包络 `{ success, message, data }` */
export function isMpEnvelope(body: unknown): body is MpEnvelope {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return false
  const record = body as Record<string, unknown>
  return typeof record.success === 'boolean' && 'data' in record
}

/**
 * 取出响应体中的业务数据。
 * MoviePilot v3 起接口统一返回 `{ success, message, data }`，更早的接口直接返回业务数据本身；
 * 未命中包络时原样返回，调用方无需区分两种响应体。
 */
export function unwrapMpData<T = unknown>(body: unknown): T {
  return isMpEnvelope(body) ? (body.data as T) : (body as T)
}
