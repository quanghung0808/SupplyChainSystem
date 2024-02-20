export interface UserAuth {
  user_id: number
  username: string
  is_superuser: boolean
}

export interface Product {
  name: string
  category: string
}

export interface Workspace {
  name: string
}

export interface Report {
  weather: string
  traffic: string
  weight: number
  vehicle: string
  starting_point: string
  destination: string
  note: string
  workspace_id: number
  user_id: number
}

export interface Forecast {
  suitable_route: string
  product_comsumption_region: string
  shipment_result: number
  traffic: string
}
