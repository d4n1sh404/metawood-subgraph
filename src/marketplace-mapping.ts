import {BigInt, ipfs, json, Bytes} from '@graphprotocol/graph-ts';
import {
  Marketplace,
  ListingClosed,
  ListingCreated,
  NFTBuy,
  OwnershipTransferred,
  UserSaved,
} from '../generated/Marketplace/Marketplace';

import {User, Listing, Nft} from '../generated/schema';

export function handleListingClosed(event: ListingClosed): void {
  let listing = Listing.load(event.params.listingId.toString());
  if (!listing) {
    listing = new Listing(event.params.listingId.toString());
  }

  listing.open = false;

  listing.save();
}

export function handleListingCreated(event: ListingCreated): void {
  let listing = Listing.load(event.params.listingId.toString());

  if (!listing) {
    listing = new Listing(event.params.listingId.toString());
  }

  listing.creator = event.params.creator;
  listing.price = event.params.tokenPrice;
  listing.tokenId = event.params.tokenId;
  listing.open = true;
  listing.nft = event.params.tokenId.toString();

  listing.save();
}

export function handleNFTBuy(event: NFTBuy): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleUserSaved(event: UserSaved): void {
  let user = User.load(event.params.user.toHex());

  if (!user) {
    user = new User(event.params.user.toHex());
  }

  user.address = event.params.user;
  user.data = event.params.data;


  let getIPFSData = ipfs.cat(event.params.data.split('/').pop());
  let data = json.fromBytes(getIPFSData as Bytes).toObject();

  if (data != null) {

      user.name = data.get("name")!.toString();
      user.userName = data.get("userName")!.toString();
      user.image = data.get("image")!.toString();

  }

  user.save();
}
