import { describe, it, expect } from 'vitest'
import { calculateTotal } from '../../utils/price'

describe('calculateTotal', () => {
  // 正常情况
  describe('正常情况', () => {
    it('单个商品，无折扣', () => {
      const items = [{ price: 100, quantity: 2 }]
      expect(calculateTotal(items)).toBe(200)
    })

    it('多个商品，无折扣', () => {
      const items = [
        { price: 50, quantity: 3 },
        { price: 20, quantity: 1 },
      ]
      expect(calculateTotal(items)).toBe(170)
    })

    it('有折扣率 0.1（九折）', () => {
      const items = [{ price: 100, quantity: 1 }]
      expect(calculateTotal(items, 0.1)).toBe(90)
    })

    it('多个商品 + 折扣', () => {
      const items = [
        { price: 200, quantity: 2 },
        { price: 100, quantity: 1 },
      ]
      // subtotal = 500, discount 20% => 400
      expect(calculateTotal(items, 0.2)).toBe(400)
    })
  })

  // 边界情况
  describe('边界情况', () => {
    it('空数组返回 0', () => {
      expect(calculateTotal([])).toBe(0)
    })

    it('折扣率为 0 时不打折', () => {
      const items = [{ price: 80, quantity: 5 }]
      expect(calculateTotal(items, 0)).toBe(400)
    })

    it('折扣率为 1 时总价为 0', () => {
      const items = [{ price: 80, quantity: 5 }]
      expect(calculateTotal(items, 1)).toBe(0)
    })

    it('商品数量为 0 时该商品不计入总价', () => {
      const items = [
        { price: 100, quantity: 0 },
        { price: 50, quantity: 2 },
      ]
      expect(calculateTotal(items)).toBe(100)
    })
  })

  // 异常情况
  describe('异常情况', () => {
    it('items 为 null 返回 0', () => {
      expect(calculateTotal(null)).toBe(0)
    })

    it('items 为 undefined 返回 0', () => {
      expect(calculateTotal(undefined)).toBe(0)
    })

    it('商品价格为负数时从总价中扣减', () => {
      const items = [
        { price: 100, quantity: 1 },
        { price: -20, quantity: 1 },
      ]
      // 当前实现直接累加，负价格会被计入
      expect(calculateTotal(items)).toBe(80)
    })
  })
})
