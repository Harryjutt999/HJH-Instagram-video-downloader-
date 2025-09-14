export default function Home() {
  return (
    <div style={{
      margin: 0,
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      background: "#0b0015",
      color: "white",
      textAlign: "center",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        margin: "20px",
        padding: "25px",
        width: "90%",
        maxWidth: "420px",
        background: "#0d001a",
        borderRadius: "15px",
        boxShadow: "0 0 20px #00cfff"
      }}>
        <div style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          margin: "0 auto 15px auto",
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

        <h1 style={{ fontSize: "22px", margin: "0 0 10px", color: "#00cfff" }}>
          𝑯𝑱𝑯 Instagram Video Downloader
        </h1>
        <span style={{ fontSize: "13px", color: "gray", marginBottom: "12px", display: "block" }}>
          ▄︻┻═┳一
        </span>

        <label htmlFor="urlInput" style={{ display: "block", fontSize: "14px", marginBottom: "8px", color: "#00cfff" }}>
          𝑷𝒂𝒔𝒕𝒆 𝑰𝒏𝒔𝒕𝒂 𝑼𝑹𝑳
        </label>
        <input
          id="urlInput"
          placeholder="https://www.instagram.com/reel/..."
          style={{
            width: "85%",
            maxWidth: "320px",
            padding: "10px",
            marginBottom: "12px",
            border: "2px solid #00cfff",
            borderRadius: "8px",
            background: "#000",
            color: "#fff",
            fontSize: "15px",
            outline: "none",
            textAlign: "center"
          }}
        />

        <button
          id="fetchBtn"
          style={{
            display: "block",
            width: "85%",
            maxWidth: "320px",
            margin: "10px auto",
            padding: "12px",
            background: "#00cfff",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "25px",
            cursor: "pointer"
          }}
          onClick={async () => {
            const url = document.getElementById("urlInput").value.trim();
            if (!url) {
              alert("Please enter an Instagram video URL");
              return;
            }

            try {
              const res = await fetch("/api/instagram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
              });
              const data = await res.json();
              if (data.videoUrl) {
                const videoTag = document.getElementById("videoTag");
                const videoBox = document.getElementById("videoBox");
                const downloadVideo = document.getElementById("downloadVideo");

                videoTag.src = data.videoUrl;
                videoBox.style.display = "block";
                downloadVideo.style.display = "inline-block";
                downloadVideo.href = data.videoUrl;
                downloadVideo.download = "instagram-video.mp4";
              } else {
                alert("Video not found!");
              }
            } catch (err) {
              console.error(err);
              alert("Error fetching video");
            }
          }}
        >
          🎬 Fetch Video
        </button>

        <a
          id="downloadVideo"
          style={{
            display: "none",
            width: "85%",
            maxWidth: "320px",
            margin: "10px auto",
            padding: "12px",
            textDecoration: "none",
            textAlign: "center",
            background: "transparent",
            border: "2px solid #00cfff",
            color: "#00cfff",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "25px",
          }}
        >
          ⬇ Download Video
        </a>

        <div id="videoBox" style={{ display: "none" }}>
          <video id="videoTag" controls style={{
            width: "100%",
            borderRadius: "12px",
            marginTop: "12px",
            boxShadow: "0 0 15px #00cfff"
          }} />
        </div>

        <div style={{ marginTop: "18px", fontSize: "13px", color: "gray" }}>
          Developed by <span style={{ color: "#00cfff", fontWeight: "bold" }}>▄︻┻═┳一𝐇𝐉𝐇 𝐇𝐀𝐂𝐊𝐄𝐑🔥</span>
        </div>
      </div>
    </div>
  );
}
