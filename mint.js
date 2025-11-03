// BOOAI Marketplace Mint Script (WalletConnect v2)
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

let provider, signer;

const connectBtn = document.getElementById("connectWallet");
const mintBtn = document.getElementById("mintBtn");
const mintSection = document.getElementById("mintSection");
const status = document.getElementById("status");

// Your NFT contract on Base
const CONTRACT_ADDRESS = "0x2805E9dBCe2839C5FeAe858723F9499f15fd88CF";
const ABI = [
  "function mint(uint256 amount) public payable",
  "function totalSupply() public view returns (uint256)"
];

async function connectWallet() {
  try {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      const address = await signer.getAddress();
      connectBtn.innerText = `✅ Connected: ${address.slice(0, 6)}...${address.slice(-4)}`;
      mintSection.style.display = "block";
    } else {
      alert("No wallet found. Use MetaMask or WalletConnect!");
    }
  } catch (err) {
    console.error(err);
    alert("Connection failed!");
  }
}

async function mintNFT() {
  const mintAmount = document.getElementById("mintAmount").value;
  if (!mintAmount || mintAmount < 1) {
    return alert("Enter a valid amount (1–5).");
  }

  try {
    status.innerText = "⏳ Minting in progress...";
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const pricePerNFT = ethers.utils.parseEther("0.001"); // ≈ $2 in ETH
    const totalValue = pricePerNFT.mul(mintAmount);

    const tx = await contract.mint(mintAmount, { value: totalValue });
    await tx.wait();

    status.innerText = `✅ Successfully minted ${mintAmount} NFT(s)!`;
  } catch (err) {
    console.error(err);
    status.innerText = "❌ Mint failed. Try again.";
  }
}

connectBtn.addEventListener("click", connectWallet);
mintBtn.addEventListener("click", mintNFT);
