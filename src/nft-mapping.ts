import {BigInt, ipfs, json, Bytes} from '@graphprotocol/graph-ts';
import {TransferSingle, SetTokenURI} from '../generated/Nft/Nft';
import {Nft,TransferHistory} from '../generated/schema';

export function handleTransferSingle(event: TransferSingle): void {
 let historyItem = new TransferHistory(event.transaction.hash.toString());

 historyItem.from = event.params.from;
 historyItem.to = event.params.to;
 historyItem.nftId = event.params.id.toString();
 historyItem.nftAmount = event.params.value;
 historyItem.price = event.transaction.value;

}

export function handleSetTokenUri(event: SetTokenURI): void {
  let nft = Nft.load(event.params._id.toString());

  if (!nft) {
    nft = new Nft(event.params._id.toString());
  }

  nft.url = event.params._uri;

  nft.save();
}
