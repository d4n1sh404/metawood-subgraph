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

  listing.save();
}

export function handleNFTBuy(event: NFTBuy): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleUserSaved(event: UserSaved): void {
  let user = User.load(event.params.user.toString());

  if (!user) {
    user = new User(event.params.user.toString());
  }

  user.address = event.params.user;
  user.data = event.params.data;

  // let userData = ipfs.cat(user.data.split('/').pop());

  // if (userData) {
  //   let data = json.fromBytes(userData as Bytes).toObject();

  //   user.name = data.get('name')!.toString();
  //   user.email = data.get('email')!.toString();
  //   user.image = data.get('image')!.toString();
  // }

  user.save();
}
