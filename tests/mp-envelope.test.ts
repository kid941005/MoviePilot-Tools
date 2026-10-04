import { describe, expect, it } from 'vitest'
import { isMpEnvelope, unwrapMpData } from '../core/mp-envelope'

describe('MoviePilot 响应包络解析', () => {
  it('取出包络内层的业务数据', () => {
    const sites = [{ id: 1, domain: 'example.com' }]
    expect(unwrapMpData({ success: true, message: '', data: sites })).toBe(sites)

    const dict = { 'example.com': { id: 1 } }
    expect(unwrapMpData({ success: true, message: '', data: dict })).toBe(dict)
  })

  it('未包裹时原样返回业务数据', () => {
    const sites = [{ id: 1, domain: 'example.com' }]
    expect(unwrapMpData(sites)).toBe(sites)
    expect(unwrapMpData(null)).toBeNull()
    expect(unwrapMpData('plain')).toBe('plain')
  })

  it('只把 success 为布尔值且带 data 字段的对象识别为包络', () => {
    expect(isMpEnvelope({ success: false, message: '业务失败', data: null })).toBe(true)
    expect(isMpEnvelope({ success: true, data: { 'one.pt': { id: 1 } } })).toBe(true)
    expect(isMpEnvelope({ success: 'yes', data: 1 })).toBe(false)
    expect(isMpEnvelope({ message: 'no envelope' })).toBe(false)
    expect(isMpEnvelope([{ id: 1 }])).toBe(false)
    expect(isMpEnvelope(null)).toBe(false)
  })
})
