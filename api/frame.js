export default function handler(req, res) {
  const frameMetadata = {
    version: "1.0",
    title: "BOOAI Marketplace",
    image: "https://booai-marketplaces.vercel.app/file_000000063387206bf18bb3201d20c8e.png",
    buttons: [
      { label: "🪙 Mint NFT", action: "link", target: "https://booai-marketplaces.vercel.app/mint.html" },
      { label: "💎 Marketplace", action: "link", target: "https://booai-marketplaces.vercel.app/app.html" },
      { label: "📤 List NFT", action: "link", target: "https://booai-marketplaces.vercel.app/list.html" }
    ]
  };
  
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(frameMetadata);
}
