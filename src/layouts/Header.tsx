const Header: React.FC = () => {
  return (
    <>
      <div
        className="flex flex-grow bg-white fixed pt-16 w-full header-font shadow-md"
        style={{ margin: "0 1px", zIndex: "9999" }}
      >
        <div className="flex w-1/4 px-4 justify-center">
          <div className="flex flex-grow justify-center py-5">
            <span className="text-lg">Program Details</span>
          </div>
        </div>
        <div className="flex w-1/4 px-4 justify-center bg-darkGreen">
          <div className="flex flex-grow justify-center py-5">
            <span className="text-lg text-white">Application Form</span>
            <div className="arrow-triangle left"></div>
          </div>
        </div>
        <div className="flex w-1/4 px-4 justify-center">
          <div className="flex flex-grow justify-center py-5">
            <span className="text-lg">Workflow</span>
          </div>
          <div className="h-3/4 my-2 border" />
        </div>
        <div className="flex w-1/4 px-4 justify-center">
          <div className="flex flex-grow justify-center py-5">
            <span className="text-lg">Preview</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
