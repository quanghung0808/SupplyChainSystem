export interface LoginForm {
  username: string
  password: string
}

export interface ReportForm {
  weather: string
  traffic: string
  weight: number
  vehicle: string
  starting_point: string
  destination: string
  note: string
  workspace_id: number
  product_id: number
}

export interface CreateWorkspaceForm {
  name: string
  product_id: number
}
