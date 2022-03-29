import {BigInt, ipfs, json, Bytes} from '@graphprotocol/graph-ts';
import {
  Contract,
  ListingClosed,
  ListingCreated,
  NFTBuy,
  OwnershipTransferred,
  UserSaved,
} from '../generated/Contract/Contract';
import {ExampleEntity, User, Listing} from '../generated/schema';

/*
export function handleListingClosed(event: ListingClosed): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.creator = event.params.creator
  entity.listingId = event.params.listingId

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.getAllOpenListings(...)
  // - contract.getLatestListings(...)
  // - contract.getListing(...)
  // - contract.getOpenListings(...)
  // - contract.getOwnedTokens(...)
  // - contract.getUser(...)
  // - contract.owner(...)
}
*/

export function handleListingClosed(event: ListingClosed): void {}

export function handleListingCreated(event: ListingCreated): void {
  let listing = Listing.load(event.params.id);

  if (!listing) {
    listing = new Listing(event.transaction.from.toHex());
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
