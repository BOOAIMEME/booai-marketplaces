// BOOAI Marketplace – OpenSea Style
let provider, signer;
const CONTRACT_ADDRESS = "0x2805E9dBCe2839C5FeAe858723F9499f15fd88CF";

const nftGrid = document.getElementById("nftGrid");
const connectBtn = document.getElementById("connectWallet");

// Mock NFT data (you’ll connect live data next)
const mockNFTs = [
  { id: 1, name: "BOOAI Genesis #1", price: "0.001", img: "bg.jpg", owner: "0xF00..." },
  { id: 2, name: "BOOAI Genesis #2", price: "0.001", img: "file_000000063387206bf18bb3201d20c8e.png", owner: "0xB33..." },
  { id: 3, name: "BOOAI Genesis #3", price: "0.002", img: "bg.jpg", owner: "0xE99..." }
];

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    connectBtn.innerText = `✅ ${address.slice(0, 6)}...${address.slice(-4)}`;
  } else {
    alert("Install MetaMask or use WalletConnect!");
  }
}

function loadNFTs() {
  nftGrid.innerHTML = "";
  mockNFTs.forEach(nft => {
    const card = document.createElement("div");
    card.classList.add("nft-card");
    card.innerHTML = `
      <img src="${nft.img}" alt="${nft.name}" class="nft-img" />
      <h3>${nft.name}</h3>
      <p>💰 ${nft.price} ETH</p>
      <p>👤 Owner: ${nft.owner}</p>
      <button class="buy-btn" onclick="buyNFT(${nft.id})">Buy Now</button>
    `;
    nftGrid.appendChild(card);
  });
}

async function buyNFT(id) {
  try {
    const nft = mockNFTs.find(n => n.id === id);
    const value = ethers.utils.parseEther(nft.price);
    const tx = await signer.sendTransaction({
      to: CONTRACT_ADDRESS,
      value
    });
    await tx.wait();
    alert(`✅ You bought ${nft.name}!`);
  } catch (err) {
    alert("❌ Transaction failed.");
  }
}

connectBtn.addEventListener("click", connectWallet);
window.addEventListener("load", loadNFTs);
