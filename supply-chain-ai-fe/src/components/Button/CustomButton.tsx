import { Image } from 'antd'
import { MouseEventHandler } from 'react'
interface CustomButtonProps {
  isDisabled?: boolean
  btnType?: 'button' | 'submit'
  containerStyles?: string
  textStyles?: string
  title: string
  rightIcon?: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
}

const CustomButton = ({
  isDisabled,
  btnType,
  containerStyles,
  textStyles,
  title,
  rightIcon,
  handleClick
}: CustomButtonProps) => {
  return (
    <button disabled={isDisabled} type={btnType || 'button'} className={` ${containerStyles}`} onClick={handleClick}>
      <span className={`flex-1  ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className='relative w-6 h-6'>
          <Image src={rightIcon} alt='arrow_left' className='object-contain' />
        </div>
      )}
    </button>
  )
}

export default CustomButton
