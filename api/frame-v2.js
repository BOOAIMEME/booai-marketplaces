export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { method } = req;

  if (method === "POST") {
    // When user interacts (e.g. clicks Mint button)
    const body = await req.json();
    if (body.untrustedData?.buttonIndex === 1) {
      // Mint button clicked
      return new Response(
        JSON.stringify({
          type: "transaction",
          chain: "base",
          name: "Mint BOOAI NFT",
          target: "0x2805E9dBCe2839C5FeAe858723F9499f15fd88CF",
          abi: [
            {
              "inputs": [],
              "name": "mint",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            }
          ],
          value: "10000000000000000" // 0.01 ETH
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // Default (GET) – show frame
  return new Response(
    JSON.stringify({
      version: "vNext",
      image: "https://booai-marketplaces.vercel.app/logo.png",
      post_url: "https://booai-marketplaces.vercel.app/api/frame-v2",
      buttons: [
        { label: "🪙 Mint NFT" },
        { label: "💎 View Market", action: "link", target: "https://booai-marketplaces.vercel.app/app.html" },
        { label: "📤 List NFT", action: "link", target: "https://booai-marketplaces.vercel.app/list.html" }
      ]
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
