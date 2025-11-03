// BOOAI NFT Listing Script
let provider, signer;
const CONTRACT_ADDRESS = "0x2805E9dBCe2839C5FeAe858723F9499f15fd88CF";

const connectBtn = document.getElementById("connectWallet");
const listBtn = document.getElementById("listBtn");
const listSection = document.getElementById("listSection");
const status = document.getElementById("status");

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    connectBtn.innerText = `✅ Connected: ${address.slice(0, 6)}...${address.slice(-4)}`;
    listSection.style.display = "block";
  } else {
    alert("Please install MetaMask or use WalletConnect!");
  }
}

async function listNFT() {
  const tokenId = document.getElementById("tokenId").value;
  const price = document.getElementById("price").value;

  if (!tokenId || !price) return alert("Please fill all fields.");

  try {
    const value = ethers.utils.parseEther(price);
    status.innerText = "⏳ Listing in progress...";

    // Simulate listing (for now, no backend or marketplace contract)
    await new Promise(r => setTimeout(r, 2000));

    status.innerText = `✅ NFT #${tokenId} listed for ${price} ETH!`;
  } catch (err) {
    console.error(err);
    status.innerText = "❌ Listing failed. Try again.";
  }
}

connectBtn.addEventListener("click", connectWallet);
listBtn.addEventListener("click", listNFT);
