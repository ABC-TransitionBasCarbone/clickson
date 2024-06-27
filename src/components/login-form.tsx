import { useForm, SubmitHandler } from "react-hook-form"
import { getCurrentUser } from "../../lib/api"


type User = {
  username: string
  password: string
}


export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>()
  const onSubmit: SubmitHandler<User> = (data) => {
    getCurrentUser(data.username, data.password)
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="admin" {...register("username")} />


      {/* include validation with required or other standard HTML validation rules */}
      <input defaultValue="8DwLXRqnbC4G"{...register("password", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}


      <input type="submit" />
    </form>
  )
}