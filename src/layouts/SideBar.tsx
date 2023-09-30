import { Hamburger } from "../icons/icons";

const SideBar: React.FC = () => {
  return (
    <>
      <div
        className="h-full flex flex-col p-2 bg-white shadow-md fixed z-50"
        style={{ width: "3%" }}
      >
        <div className="w-full flex justify-center p-2 mt-2 mb-12">
          <Hamburger />
        </div>
        <div className="w-full flex justify-center p-2 my-2">
          <img src="./home-icon.png" alt="home" />
        </div>
        <div className="w-full flex justify-center p-2 my-2">
          <img src="./todoList.png" alt="todoList" />
        </div>
      </div>
    </>
  );
};

export default SideBar;
