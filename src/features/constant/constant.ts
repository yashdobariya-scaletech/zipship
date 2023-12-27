export const ClientOptions = [
  {
    label: "dTox Organic Juice - Local",
    value: "0000011111111111",
  },
  { label: "dTox Organic Juice - Test", value: "0000011111111111" },
  { label: "Jambo Books", value: "0000011111111111" },
  { label: "Treehouse", value: "0000011111111111" },
];

export const ServiceTypeOptions = [
  {
    label: "Standard",
    value: "Standard",
  },
  { label: "Pick-up & Delivery Home", value: "Pick-up & Delivery Home" },
  {
    label: "Pick Up & Deliver to Locker",
    value: "Pick Up & Deliver to Locker",
  },
  { label: "Local Locker Delivery", value: "Local Locker Delivery" },
];

export const ParcelTypeOptions = [
  {
    label: "Container",
    value: "Container",
  },
  { label: "Truck", value: "Truck" },
  {
    label: "Pallet",
    value: "Pallet",
  },
  { label: "Piece", value: "Piece" },
  { label: "Box", value: "Box" },
  { label: "Drum", value: "Drum" },
  { label: "Letter", value: "Letter" },
  { label: "Over Size", value: "Over Size" },
  { label: "Other", value: "Other" },
  { label: "Unknown", value: "Unknown" },
  { label: "Bag", value: "Bag" },
  { label: "Bin", value: "Bin" },
  { label: "Rack", value: "Rack" },
];

export const StateOptions = [
  {
    label: "Atlanta",
    value: "Atlanta",
  },
  { label: "New York", value: "New York" },
  { label: "Georgia", value: "Georgia" },
];

export const CountryOptions = [
  {
    label: "Australia",
    value: "Australia",
  },
  { label: "Bahamas", value: "Bahamas" },
  { label: "Canada", value: "Canada" },
  { label: "United States of America", value: "United States of America" },
];

export interface ItemsPieceProps {
  Piece: number | null;
  Weight: number | null;
  Height: number | null;
  Width: number | null;
  Length: number | null;
  Description: string;
  Price: number | null;
}
