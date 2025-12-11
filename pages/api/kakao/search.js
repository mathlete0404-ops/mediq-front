export default async function handler(req, res) {
  const { lat, lng, specialty, x, y } = req.query;
  const apiKey = process.env.KAKAO_REST_API_KEY;
  console.log('[kakao/search] Incoming', { url: req.url, query: req.query });
  if (!apiKey) {
    console.error('[kakao/search] Missing KAKAO_REST_API_KEY');
    return res.status(500).json({ error: 'Missing KAKAO_REST_API_KEY' });
  }
  const latVal = (lat ?? y ?? '').toString().trim();
  const lngVal = (lng ?? x ?? '').toString().trim();
  if (!latVal || !lngVal) {
    console.warn('[kakao/search] Missing coordinates', { lat, lng, x, y });
    return res.status(400).json({ error: 'Missing lat/lng' });
  }

  const origin = req.headers.origin || 'http://localhost:3000';
  const ua = req.headers['user-agent'] || 'Next.js';
  // Kakao API requires KA header: include sdk/os/origin per docs
  const headers = {
    Authorization: `KakaoAK ${apiKey}`,
    KA: `sdk/5.0 os/javascript lang/ko origin/${origin}`,
    'User-Agent': ua,
  };

  const search = async (query, categoryGroupCode = 'HP8') => {
    const url = new URL('https://dapi.kakao.com/v2/local/search/keyword.json');
    url.searchParams.set('query', query);
    url.searchParams.set('x', String(lngVal));
    url.searchParams.set('y', String(latVal));
    url.searchParams.set('radius', '10000');
    url.searchParams.set('category_group_code', categoryGroupCode);
    url.searchParams.set('size', '15');

    const r = await fetch(url.toString(), { headers });
    if (!r.ok) {
      const text = await r.text().catch(() => '');
      throw new Error(`Kakao API error ${r.status}: ${text}`);
    }
    const j = await r.json();
    return (j?.documents || []).map((d) => ({
      id: d.id,
      name: d.place_name,
      address: d.road_address_name || d.address_name,
      phone: d.phone,
      distance: Number(d.distance || 0),
      lat: Number(d.y),
      lng: Number(d.x),
      url: d.place_url,
      category: d.category_name,
    }));
  };

  try {
    const sp = (specialty && String(specialty).trim()) || '전문 병원';
    const uniCandidates = await search('대학병원');
    const uniNearby = uniCandidates
      .sort((a, b) => a.distance - b.distance)
      .filter((h) => /대학|대학병원|의과대학/.test(h.name))
      .slice(0, 3);

    const renownedQuery = `${sp} 유명 병원`;
    const renownedCandidates = await search(renownedQuery);
    const renowned = renownedCandidates
      .filter((h) => !uniNearby.some((n) => n.id === h.id))
      .slice(0, 3);

    const localCandidates = await search('병원');
    const localNearby = localCandidates
      .filter((h) => /의원|클리닉|내과|외과|소아과|피부과|정형외과|치과/.test(h.name))
      .filter((h) => !uniNearby.some((u) => u.id === h.id))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);

    res.status(200).json({
      university: {
        nearby: uniNearby,
        renowned,
      },
      local: {
        nearby: localNearby,
      },
      emergency: [],
    });
  } catch (e) {
    console.error('[kakao/search] Failed', e);
    res.status(500).json({ error: e.message || 'Search failed' });
  }
}
