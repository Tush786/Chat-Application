
import MessageContainer from "../../components/message/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30">
       {/* <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-900"> */}
       <Sidebar />
    <MessageContainer /> 
      {/* </div> */}
    </div>
  );
};
export default Home;