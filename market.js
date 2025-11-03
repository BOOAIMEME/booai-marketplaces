// BOOAI Marketplace JS
let provider, signer;
const CONTRACT_ADDRESS = "0x2805E9dBCe2839C5FeAe858723F9499f15fd88CF";

// Example NFT data (later you’ll connect live metadata from contract)
const mockNFTs = [
  { id: 1, name: "BOOAI Genesis #1", price: "0.001", img: "bg.jpg" },
  { id: 2, name: "BOOAI Genesis #2", price: "0.001", img: "file_000000063387206bf18bb3201d20c8e.png" },
  { id: 3, name: "BOOAI Genesis #3", price: "0.001", img: "bg.jpg" }
];

const connectBtn = document.getElementById("connectWallet");
const marketSection = document.getElementById("marketSection");
const nftList = document.getElementById("nftList");

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    connectBtn.innerText = `✅ Connected: ${address.slice(0, 6)}...${address.slice(-4)}`;
    marketSection.style.display = "block";
    loadNFTs();
  } else {
    alert("Please install MetaMask or use WalletConnect!");
  }
}

function loadNFTs() {
  nftList.innerHTML = "";
  mockNFTs.forEach(nft => {
    const nftCard = document.createElement("div");
    nftCard.classList.add("nft-card");
    nftCard.innerHTML = `
      <img src="${nft.img}" alt="${nft.name}" class="nft-img" />
      <h3>${nft.name}</h3>
      <p>💰 Price: ${nft.price} ETH</p>
      <button class="btn" onclick="buyNFT(${nft.id})">Buy</button>
    `;
    nftList.appendChild(nftCard);
  });
}

async function buyNFT(id) {
  try {
    const nft = mockNFTs.find(n => n.id === id);
    if (!nft) return alert("NFT not found!");
    const value = ethers.utils.parseEther(nft.price);
    const tx = await signer.sendTransaction({
      to: CONTRACT_ADDRESS,
      value
    });
    await tx.wait();
    alert(`✅ You bought ${nft.name}!`);
  } catch (err) {
    console.error(err);
    alert("❌ Purchase failed.");
  }
}

connectBtn.addEventListener("click", connectWallet);
