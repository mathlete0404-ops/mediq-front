export default async function handler(req, res) {
    const { q = "", address = "", city = "" } = req.query;
    const apiKey = process.env.KAKAO_REST_API_KEY;
  
    if (!apiKey) return res.status(500).json({ error: "Missing KAKAO_REST_API_KEY" });
  
    const origin = req.headers.origin || "http://localhost:3000";
    const ua = req.headers["user-agent"] || "Next.js";
  
    const headers = {
      Authorization: `KakaoAK ${apiKey}`,
      KA: `sdk/5.0 os/javascript lang/ko origin/${origin}`,
      "User-Agent": ua,
    };
  
    // ✅ query를 최대한 강하게 (정확도↑)
    const query = [q, address, city].filter(Boolean).join(" ").trim();
    if (!query) return res.status(400).json({ error: "Missing query" });
  
    try {
      const url = new URL("https://dapi.kakao.com/v2/local/search/keyword.json");
      url.searchParams.set("query", query);
      url.searchParams.set("size", "1");
  
      const r = await fetch(url.toString(), { headers });
      if (!r.ok) {
        const text = await r.text().catch(() => "");
        return res.status(r.status).json({ error: text || "Kakao API error" });
      }
  
      const j = await r.json();
      console.log("j",j)
      const d = j?.documents?.[0];
      if (!d) return res.status(404).json({ error: "No result" });
  
      return res.status(200).json({
        lat: Number(d.y),
        lng: Number(d.x),
        name: d.place_name,
        address: d.road_address_name || d.address_name,
        url: d.place_url,
        id: d.id,
      });
    } catch (e) {
      return res.status(500).json({ error: e?.message || "Geocode failed" });
    }
  }
  