import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'
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
  const router = useRouter()

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
    <Card>
      <div className="flex items-center">
        <Button
          onlyIcon
          variant="icon"
          icon={<ArrowLeftIcon />}
          onClick={() => router.back()}
        />
        <h2 className="text-xl ml-4">{title}</h2>
      </div>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {children(control, errors)}
          <div className="flex justify-end w-full">
            <Button
              icon={<ArrowRightIcon color="white" />}
              type="submit"
              text="Aceptar"
              variant="primary"
            />
          </div>
        </div>
      </form>
    </Card>
  )
}

export default PlantillaForm
