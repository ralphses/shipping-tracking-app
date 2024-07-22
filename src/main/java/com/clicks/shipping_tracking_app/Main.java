package com.clicks.shipping_tracking_app;

import com.algorand.algosdk.crypto.Address;
import com.algorand.algosdk.kmd.client.ApiException;
import com.algorand.algosdk.kmd.client.KmdClient;
import com.algorand.algosdk.kmd.client.api.KmdApi;
import com.algorand.algosdk.kmd.client.model.*;
import com.algorand.algosdk.transaction.SignedTransaction;
import com.algorand.algosdk.transaction.Transaction;
import com.algorand.algosdk.util.Encoder;
import com.algorand.algosdk.v2.client.common.AlgodClient;
import com.algorand.algosdk.v2.client.common.IndexerClient;
import com.algorand.algosdk.v2.client.common.Response;
import com.algorand.algosdk.v2.client.model.PendingTransactionResponse;
import com.algorand.algosdk.v2.client.model.PostTransactionsResponse;
import com.algorand.algosdk.v2.client.model.TransactionsResponse;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    private static final String ALGOD_API_ADDR = "http://localhost";
    private static final int ALGOD_PORT = 4001;
    private static final String INDEXER_API_ADDR = "http://localhost";
    private static final int INDEXER_PORT = 8980;
    private static final String KMD_API_ADDR = "http://localhost:4002";
    private static final String TOKEN = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    private static KmdApi kmd = null;

    public static void main(String[] args) throws Exception {
        // Initialize Algod and Indexer clients
        AlgodClient algod = new AlgodClient(ALGOD_API_ADDR, ALGOD_PORT, TOKEN);
        IndexerClient indexer = new IndexerClient(INDEXER_API_ADDR, INDEXER_PORT);

        // Initialize KMD client
        KmdClient kmdClient = new KmdClient();
        kmdClient.setBasePath(KMD_API_ADDR);
        kmdClient.setApiKey(TOKEN);
        kmd = new KmdApi(kmdClient);

        // Get accounts from sandbox
        String walletHandle = getDefaultWalletHandle();
        List<Address> accounts = getWalletAccounts(walletHandle);

        // Order placed transaction
        Transaction placeOrderTx = createOrderTransaction(algod, accounts.get(0), accounts.get(1), "Order#12345: Placed");
        sendTransaction(algod, placeOrderTx, walletHandle);

        // Order shipped transaction
        Transaction shipOrderTx = createOrderTransaction(algod, accounts.get(0), accounts.get(1), "Order#12345: Shipped");
        sendTransaction(algod, shipOrderTx, walletHandle);

        // Query the order status
        queryOrderStatus(indexer, "Order#12345");
    }

    private static Transaction createOrderTransaction(AlgodClient algod, Address sender, Address receiver, String note) throws Exception {
        return Transaction.PaymentTransactionBuilder()
                .lookupParams(algod)
                .sender(sender)
                .receiver(receiver)
                .amount(1000)
                .noteUTF8(note)
                .build();
    }

    private static void sendTransaction(AlgodClient algod, Transaction tx, String walletHandle) throws Exception {
        SignedTransaction signedTx = signTransactionWithKMD(tx, walletHandle);
        byte[] signedTxBytes = Encoder.encodeToMsgPack(signedTx);

        Response<PostTransactionsResponse> post = algod.RawTransaction().rawtxn(signedTxBytes).execute();
        if (!post.isSuccessful()) {
            throw new RuntimeException("Failed to post transaction");
        }

        waitForConfirmation(algod, post.body().txId);
    }

    private static void queryOrderStatus(IndexerClient indexer, String orderId) throws Exception {
        Response<TransactionsResponse> transactions = indexer.searchForTransactions()
                .notePrefix(Encoder.encodeToBase64(orderId.getBytes()).getBytes())
                .execute();

        if (!transactions.isSuccessful()) {
            throw new RuntimeException("Failed to lookup transaction");
        }

        System.out.println("Order Status: \n" + transactions);
    }

    private static SignedTransaction signTransactionWithKMD(Transaction tx, String walletHandle) throws IOException, ApiException {
        SignTransactionRequest req = new SignTransactionRequest();
        req.transaction(Encoder.encodeToMsgPack(tx));
        req.setWalletHandleToken(walletHandle);
        req.setWalletPassword("");
        byte[] stxBytes = kmd.signTransaction(req).getSignedTransaction();
        return Encoder.decodeFromMsgPack(stxBytes, SignedTransaction.class);
    }

    private static String getDefaultWalletHandle() throws ApiException {
        for (APIV1Wallet w : kmd.listWallets().getWallets()) {
            if (w.getName().equals("unencrypted-default-wallet")) {
                InitWalletHandleTokenRequest tokenreq = new InitWalletHandleTokenRequest();
                tokenreq.setWalletId(w.getId());
                tokenreq.setWalletPassword("");
                return kmd.initWalletHandleToken(tokenreq).getWalletHandleToken();
            }
        }
        throw new RuntimeException("Default wallet not found.");
    }

    private static List<Address> getWalletAccounts(String walletHandle) throws ApiException, NoSuchAlgorithmException {
        List<Address> accounts = new ArrayList<>();

        ListKeysRequest keysRequest = new ListKeysRequest();
        keysRequest.setWalletHandleToken(walletHandle);
        for (String addr : kmd.listKeysInWallet(keysRequest).getAddresses()) {
            accounts.add(new Address(addr));
        }

        return accounts;
    }

    private static void waitForConfirmation(AlgodClient algod, String txId) throws Exception {
        boolean done = false;
        while (!done) {
            Response<PendingTransactionResponse> txInfo = algod.PendingTransactionInformation(txId).execute();
            if (!txInfo.isSuccessful()) {
                throw new RuntimeException("Failed to check on transaction progress");
            }
            if (txInfo.body().confirmedRound != null) {
                done = true;
            }
            Thread.sleep(1000);
        }
    }
}
