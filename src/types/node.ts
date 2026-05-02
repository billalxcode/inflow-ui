export type NetworkDeviceType =
  | "router"
  | "switch"
  | "access-point"
  | "server"
  | "laptop"
  | "desktop"
  | "smartphone"
  | "printer";

export interface NetworkNodeData {
  label: string;
  deviceType: NetworkDeviceType;
  ip?: string;
  mac?: string;
  status?: "online" | "offline";
}
