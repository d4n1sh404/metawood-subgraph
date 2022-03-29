import {BigInt, ipfs, json, Bytes} from '@graphprotocol/graph-ts';
import {TransferSingle, SetTokenURI} from '../generated/Nft/Nft';
import {Nft, TransferHistory} from '../generated/schema';

export function handleTransferSingle(event: TransferSingle): void {
  let historyItem = new TransferHistory(event.transaction.hash.toHex());

  historyItem.from = event.params.from;
  historyItem.to = event.params.to;
  historyItem.nftId = event.params.id.toString();
  historyItem.nftAmount = event.params.value;
  historyItem.price = event.transaction.value;

  historyItem.save();
}

export function handleSetTokenUri(event: SetTokenURI): void {
  let nft = Nft.load(event.params._id.toString());

  if (!nft) {
    nft = new Nft(event.params._id.toString());
  }

  nft.url = event.params._uri;

  let getIPFSData = ipfs.cat(event.params._uri.split('/').pop());
  let data = json.fromBytes(getIPFSData as Bytes).toObject();

  if (data != null) {

      nft.name = data.get("name")!.toString();
      nft.description = data.get("description")!.toString();
      nft.image = data.get("image")!.toString();

  }

  nft.save();
}
