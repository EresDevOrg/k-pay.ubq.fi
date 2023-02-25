(async function () {
  // decode base64 to get tx data
  const urlParams = new URLSearchParams(window.location.search);
  const base64encodedTxData = urlParams.get("claim");

  if (!base64encodedTxData) {
    alert(`No claim data passed in URL.\n\nhttps://pay.ubq.fi?claim=...`);
    return;
  }
  window.txData;

  try {
    txData = JSON.parse(atob(base64encodedTxData));
  } catch (error) {
    alert(`Invalid claim data passed in URL.`);
    return;
  }
  // insert tx data into table
  const table = document.getElementsByTagName(`table`)[0];

  const requestedAmountElement = await insertTableData(table);

  await renderTokenSymbol(table, requestedAmountElement);

  const toElement = document.getElementById(`transferDetails.to`);
  const fromElement = document.getElementById("owner")

  await renderEnsName(toElement, txData.transferDetails.to);
  await renderEnsName(fromElement, txData.owner);
})();

// const ensRegistryWithFallbackAddress = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"

async function insertTableData(table) {
  const requestedAmountElement = document.getElementById("transferDetails.requestedAmount");

  // TO
  const toFull = document.querySelector("#To .full");
  const toShort = document.querySelector("#To .short");
  toFull.textContent = txData.transferDetails.to;
  toShort.textContent = shortenAddress(txData.transferDetails.to);

  // fetch ens name
  // const ensName = await fetch(`https://api.ens.domains/v1/name/${txData.transferDetails.to}`)
  // await


  const toBoth = document.getElementById(`transferDetails.to`);
  toBoth.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://etherscan.io/address/${txData.transferDetails.to}">${toBoth.innerHTML}</a>`;

  // TOKEN

  const tokenFull = document.querySelector("#Token .full");
  const tokenShort = document.querySelector("#Token .short");
  tokenFull.textContent = txData.permit.permitted.token;
  tokenShort.textContent = shortenAddress(txData.permit.permitted.token);

  const tokenBoth = document.getElementById(`permit.permitted.token`);
  tokenBoth.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://etherscan.io/token/${txData.permit.permitted.token}">${tokenBoth.innerHTML}</a>`;



  document.getElementById("permit.permitted.amount").textContent = txData.permit.permitted.amount / 1e18;

  document.getElementById("owner").innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://etherscan.io/address/${txData.owner}">${txData.owner}</a>`;

  document.getElementById("permit.nonce").textContent = txData.permit.nonce;
  document.getElementById("permit.deadline").textContent = txData.permit.deadline;
  requestedAmountElement.textContent = txData.transferDetails.requestedAmount / 1e18;
  document.getElementById("signature").textContent = txData.signature;

  table.setAttribute(`data-details-rendered`, "true");
  return requestedAmountElement;
}

async function renderEnsName(element, address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const ens = await provider.lookupAddress(address);
  if (ens) element.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://etherscan.io/token/${txData.permit.permitted.token}?a=${txData.owner}">${ens}</a>`;
}

async function renderTokenSymbol(table, requestedAmountElement) {
  const contract = await window.getContract(txData.permit.permitted.token);
  const symbol = await contract.symbol();
  table.setAttribute(`data-contract-loaded`, "true");
  requestedAmountElement.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://etherscan.io/token/${txData.permit.permitted.token}?a=${txData.owner}">${txData.transferDetails.requestedAmount / 1e18} ${symbol}</a>`;
}

function shortenAddress(address) {
  return `${address.slice(0, 10)}...${address.slice(-8)}`;
}