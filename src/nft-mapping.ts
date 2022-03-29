import {BigInt, ipfs, json, Bytes} from '@graphprotocol/graph-ts';
import {TransferSingle, SetTokenURI} from '../generated/Nft/Nft';
import {Nft} from '../generated/schema';

export function handleTransferSingle(event: TransferSingle): void {}

export function handleSetTokenUri(event: SetTokenURI): void {
  let nft = Nft.load(event.params._id.toString());

  if (!nft) {
    nft = new Nft(event.params._id.toString());
  }

  nft.url = event.params._uri;

  nft.save();
}
