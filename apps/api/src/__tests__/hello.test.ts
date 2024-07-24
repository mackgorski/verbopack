import { NextResponse } from 'next/server';
import { GET } from '../app/api/hello/route';

describe('/api/hello', () => {
    it('returns a message', async () => {
        const res = await GET();
        expect(res).toBeInstanceOf(NextResponse);
        const data = await res.json();
        expect(res.status).toBe(200);
        expect(data).toEqual(expect.objectContaining({
            message: 'Hello from API!'
        }));
    });
});
