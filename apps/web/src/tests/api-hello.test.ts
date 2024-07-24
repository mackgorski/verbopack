// apps/web/src/__tests__/api-hello.test.ts
import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '../app/api/hello/route'

describe('API Hello Route', () => {
    it('should return the correct response', async () => {
        new NextRequest('http://localhost:3000/api/hello', {
            method: 'GET',
        })

        const res = await GET()
        const data = await res.json()

        expect(res.status).toBe(200)
        expect(data).toEqual({ message: 'Hello from the API!' })
    })
})