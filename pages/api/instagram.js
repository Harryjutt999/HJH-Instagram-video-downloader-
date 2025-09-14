import instagramGetUrl from "instagram-url-direct";

export default async function handler(req, res) {
  // Sirf POST request allow karo
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;

  // Agar URL missing hai
  if (!url) {
    return res.status(400).json({ error: "Instagram URL is required" });
  }

  try {
    // instagram-url-direct ka sahi method
    const result = await instagramGetUrl.getInfo(url);

    // Agar video link nahi mila
    if (!result.url_list || result.url_list.length === 0) {
      return res.status(404).json({ error: "No video found at this URL" });
    }

    // Success response
    return res.status(200).json({ videoUrl: result.url_list[0] });

  } catch (err) {
    // Error handle karo
    return res
      .status(500)
      .json({ error: "Failed to fetch Instagram video: " + err.message });
  }
      }
