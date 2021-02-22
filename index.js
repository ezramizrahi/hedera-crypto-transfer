const { Client, TransferTransaction, Hbar } = require("@hashgraph/sdk");
require('dotenv').config();

async function main() {
  // set up ID and key
  const operatorAccount = process.env.ACCOUNT_ID;
  const operatorPrivateKey = process.env.PRIVATE_KEY;
  if (operatorAccount == null || operatorPrivateKey == null ) {
    throw new Error("Environment variables operatorAccount and operatorPrivateKey must be present");
  };

  // set up Testnet Client
  const client = Client.forTestnet();
  client.setOperator(operatorAccount, operatorPrivateKey);

  // create new crypto transfer transaction
  const transaction = new TransferTransaction()
    .addHbarTransfer(operatorAccount, new Hbar(-100))
    .addHbarTransfer("0.0.3", new Hbar(100));

  // submit the transaction to a Hedera network
  const txResponse = await transaction.execute(client);

  // request the receipt of the transaction
  const receipt = await txResponse.getReceipt(client);

  // get the transaction consensus status
  const transactionStatus = receipt.status;

  console.log(receipt);
  console.log("The transaction consensus status is " +transactionStatus.toString());
};

main();
