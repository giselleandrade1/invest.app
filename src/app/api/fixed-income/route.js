const MOCK_URL = 'https://6270328d6a36d4d62c16327c.mockapi.io/getFixedIncomeClassData';

export async function GET() {
    try {
        // Use the global `fetch` available in Next.js runtime instead of node-fetch
        const res = await fetch(MOCK_URL, { method: 'GET' });
        if (!res.ok) {
            return new Response(JSON.stringify({ error: 'Upstream fetch failed', status: res.status }), {
                status: 502,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const data = await res.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                // lightweight caching for 30 seconds
                'Cache-Control': 'public, max-age=30, stale-while-revalidate=60',
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Fetch error', message: String(err) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
