import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVideo = async () => {
    if (!url) {
      alert("Please enter an Instagram video URL");
      return;
    }

    setLoading(true);
    setVideoUrl("");

    try {
      const res = await fetch("/api/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (res.ok && data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else {
        alert(data.error || "Failed to fetch video");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching video. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#0b0015", 
      color: "white", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      <div style={{ 
        width: "90%", 
        maxWidth: "400px", 
        padding: "25px", 
        borderRadius: "15px", 
        background: "#0d001a", 
        boxShadow: "0 0 20px #00cfff", 
        textAlign: "center" 
      }}>
        <div style={{ 
          width: "100px", 
          height: "100px", 
          borderRadius: "50%", 
          margin: "0 auto 15px", 
          overflow: "hidden", 
          border: "2px solid #00cfff", 
          boxShadow: "0 0 15px #00cfff" 
        }}>
          <img 
            src="https://i.postimg.cc/dVWsQpKw/IMG-20250913-WA0039.jpg" 
            alt="avatar" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
        </div>

        <h1 style={{ color: "#00cfff", fontSize: "22px", marginBottom: "10px" }}>
          𝑯𝑱𝑯 Instagram Video Downloader
        </h1>
        <span style={{ color: "gray", fontSize: "14px" }}>▄︻┻═┳一</span>

        <label style={{ display: "block", color: "#00cfff", marginTop: "20px" }}>
          𝑷𝒂𝒔𝒕𝒆 𝑰𝒏𝒔𝒕𝒂 𝑼𝑹𝑳
        </label>
        <input 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.instagram.com/reel/..."
          style={{ 
            width: "85%", 
            padding: "10px", 
            margin: "10px 0", 
            borderRadius: "8px", 
            border: "2px solid #00cfff", 
            background: "#000", 
            color: "#fff", 
            textAlign: "center" 
          }}
        />

        <button 
          onClick={fetchVideo}
          disabled={loading}
          style={{ 
            width: "85%", 
            padding: "12px", 
            margin: "10px auto", 
            borderRadius: "25px", 
            border: "none", 
            fontWeight: "bold", 
            cursor: "pointer", 
            background: "#00cfff", 
            color: "#fff" 
          }}
        >
          {loading ? "Fetching..." : "🎬 Fetch Video"}
        </button>

        {videoUrl && (
          <>
            <video 
              src={videoUrl} 
              controls 
              style={{ 
                width: "100%", 
                marginTop: "15px", 
                borderRadius: "12px", 
                boxShadow: "0 0 15px #00cfff" 
              }} 
            />
            <a 
              href={videoUrl} 
              download="instagram-video.mp4"
              style={{ 
                display: "block", 
                marginTop: "10px", 
                padding: "12px", 
                borderRadius: "25px", 
                border: "2px solid #00cfff", 
                color: "#00cfff", 
                textDecoration: "none" 
              }}
            >
              ⬇ Download Video
            </a>
          </>
        )}

        <div style={{ marginTop: "20px", fontSize: "13px", color: "gray" }}>
          <span style={{ color: "#00cfff", fontWeight: "bold" }}>
            Developed By ▄︻┻═┳一𝐇𝐉𝐇 𝐇𝐀𝐂𝐊𝐄𝐑🔥
          </span>
        </div>
      </div>
    </div>
  );
}
