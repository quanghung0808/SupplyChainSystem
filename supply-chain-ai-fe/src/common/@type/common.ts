import { MouseEventHandler } from 'react'

export interface CustomButtonProps {
  isDisabled?: boolean
  btnType?: 'button' | 'submit'
  containerStyles?: string
  textStyles?: string
  title: string
  rightIcon?: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
}

export interface LoginResponse {
  username: string
  is_superuser: boolean
  tokens: {
    accessToken: string
    refreshToken: string
  }
}
