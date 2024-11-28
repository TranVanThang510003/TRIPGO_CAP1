import SideBarProfile from "../UserProfile/SideBarProfile"
import ListCardExpired from "./ListCardExpired"

const TourExpired = () => {
  return (
    <div className="flex">
        <div className="h-">
        <SideBarProfile/>
        </div>
        <div className="p-8 ml-[60px]" >
            
            <ListCardExpired/>
        </div>
    </div>
  )
}

export default TourExpired