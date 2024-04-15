import Shimmer from "./shimmer";

const Loader = () => {
    return (
        <div className="flex flex-row">
          {/* Left side */}
          <div className="w-full flex flex-col ">
            <div className="p-1 mt-4 ml-4">
              <Shimmer width="100%" height="15.3rem" />
            </div>
            <div className="p-1 mt-4 ml-4">
              <Shimmer width="100%" height="28.1rem" />
            </div>
          </div>
    
          {/* Right side */}
          <div className="w-full flex flex-col">
            <div className="h-4/6 p-1 mt-4 ml-2">
              <Shimmer width="100%" height="100%" />
            </div>
            <div className="h-2/6 flex flex-row">
              <div className="w-7/12 p-1 ml-2">
                <Shimmer width="100%" height="100%" />
              </div>
              <div className="w-5/12 p-1">
                <Shimmer width="100%" height="100%" />
              </div>
            </div>
          </div>
        </div>
      );
}

export default Loader;