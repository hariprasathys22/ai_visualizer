import { useQueryStore } from "../../../store"

const RightSection = () => {
  const { heading } = useQueryStore()
  return (
    <div className="w-full h-full bg-white rounded-3xl shadow-md ">
        <div className="w-full md:h-[55px] shadow-md rounded-t-3xl flex items-center">
            <p className="font-semibold text-lg ml-6">{heading}</p>
        </div>
        <div className="w-full ">

        </div>
    </div>
  )
}

export default RightSection