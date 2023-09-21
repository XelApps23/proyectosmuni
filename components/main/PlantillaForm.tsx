import { DefaultValues, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '../main/Button'
import { ReactNode, useEffect } from 'react'
import CancelIcon from '@/components/icons/CancelIcon'
import MiniButton from './MiniButton'

type PlantillaFormProps<T extends FieldValues> = {
  title: string
   schema: yup.Schema<T>
  children: (control: any, errors: any) => ReactNode
  onSubmit: SubmitHandler<T>
  defaultValues?: DefaultValues<T>
}

const PlantillaForm = <T extends object>({
  title,
  schema,
  children,
  onSubmit,
  defaultValues
}: PlantillaFormProps<T>) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<T>({
    mode: 'onChange',
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <div className='p-10 grid gap-4 w-full bg-white1 rounded-xl'>
      <div className='flex justify-end w-full '>
        <MiniButton icon={<CancelIcon />} variant="cancel" />
      </div>
      <h1 className='text-4xl'>{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-5'>
        {children(control, errors)}
        <div className='flex justify-end w-full'>
          <div className='w-36'>
            <Button type="submit" text="Enviar" variant="primary" onlyText={true} />
          </div>
        </div>
        </div>
      </form>
    </div>
  )
}

export default PlantillaForm
