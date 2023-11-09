import { User } from '@/hooks/types/User'

type Props = {
  user: User
}

const ProfilePicture = ({ user }: Props) => {
  return (
    <img
      src={
        user &&
        `https://ui-avatars.com/api/?name=${user?.firstname}+${user?.lastname}`
      }
      className="w-full h-full rounded-full"
    />
  )
}

export default ProfilePicture
