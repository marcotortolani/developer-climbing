import { Heart } from 'lucide-react'

export default function StatusBar({
  health,
  position,
}: {
  health: number
  position: number
}) {
  return (
    <div className="absolute top-10 left-10 w-1/5 h-1/4 p-4 flex flex-col gap-4 bg-gray-700 border border-gray-400 shadow-md shadow-black/70 rounded-2xl">
      <h4 className=" uppercase font-semibold text-white">Developer Climber</h4>
      <div className=" flex gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <HeartIcon key={index} heartID={index} health={health} />
        ))}
      </div>
      <span className=" text-gray-400 font-medium">
        Altura: {Math.floor(position / 42.8)} metros / 125 metros
      </span>
      <span className=" text-gray-400 font-medium text-lg">
        Level: {Math.floor(position / 1783.33)}
      </span>
    </div>
  )
}

const HeartIcon = ({
  heartID,
  health,
}: {
  heartID: number
  health: number
}) => {
  return (
    <div className="w-6 h-6 rounded-full transition-colors duration-500 ease-in-out">
      <Heart
        color="red"
        size={32}
        fill={heartID + 1 <= health ? 'red' : '#0000'}
      />
    </div>
  )
}
