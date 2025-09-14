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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b0015, #1a0033)",
        backgroundAttachment: "fixed", // 👈 background fixed
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 15px",
      }}
    >
      <div
        style={{
          maxWidth: "450px",
          width: "100%",
          maxHeight: "90vh", // 👈 card ki max height
          overflowY: "auto", // 👈 card ke andar scroll hoga
          padding: "30px",
          borderRadius: "20px",
          background: "#0d001a",
          boxShadow: "0 0 30px rgba(0, 207, 255, 0.6)",
          textAlign: "center",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            margin: "0 auto 20px",
            overflow: "hidden",
            border: "3px solid #00cfff",
            boxShadow: "0 0 20px #00cfff",
          }}
        >
          <img
            src="https://i.postimg.cc/dVWsQpKw/IMG-20250913-WA0039.jpg"
            alt="avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Title */}
        <h1 style={{ color: "#00cfff", fontSize: "24px", marginBottom: "8px" }}>
          𝑯𝑱𝑯 Instagram Video Downloader
        </h1>
        <span style={{ color: "gray", fontSize: "14px" }}>▄︻┻═┳一</span>

        {/* Input */}
        <label
          style={{ display: "block", color: "#00cfff", marginTop: "20px" }}
        >
          𝑷𝒂𝒔𝒕𝒆 𝑰𝒏𝒔𝒕𝒂 𝑼𝑹𝑳
        </label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.instagram.com/reel/..."
          style={{
            width: "90%",
            padding: "12px",
            margin: "12px 0",
            borderRadius: "10px",
            border: "2px solid #00cfff",
            background: "#000",
            color: "#fff",
            textAlign: "center",
            fontSize: "15px",
          }}
        />

        {/* Button */}
        <button
          onClick={fetchVideo}
          disabled={loading}
          style={{
            width: "90%",
            padding: "14px",
            margin: "12px auto",
            borderRadius: "30px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            background: loading ? "#009fbb" : "#00cfff",
            color: "#fff",
            transition: "0.3s",
          }}
        >
          {loading ? "Fetching..." : "🎬 Fetch Video"}
        </button>

        {/* Video */}
        {videoUrl && (
          <>
            <video
              src={videoUrl}
              controls
              style={{
                width: "100%",
                marginTop: "18px",
                borderRadius: "15px",
                boxShadow: "0 0 20px #00cfff",
              }}
            />
            <a
              href={videoUrl}
              download="instagram-video.mp4"
              style={{
                display: "block",
                marginTop: "12px",
                padding: "14px",
                borderRadius: "30px",
                border: "2px solid #00cfff",
                color: "#00cfff",
                textDecoration: "none",
                fontWeight: "bold",
                transition: "0.3s",
              }}
            >
              ⬇ Download Video
            </a>
          </>
        )}

        {/* Footer */}
        <div style={{ marginTop: "25px", fontSize: "14px", color: "gray" }}>
          <span style={{ color: "#00cfff", fontWeight: "bold" }}>
            Developed By ▄︻┻═┳一𝐇𝐉𝐇 𝐇𝐀𝐂𝐊𝐄𝐑🔥
          </span>
        </div>
      </div>
    </div>
  );
          }
