const Sidebar = () => {
  return (
    <div className="flex bg-white border-r border-gray-300 h-screen relative w-56">
      <div className="h-3/4">
        <img
          src="../UoSM-Logo/Company Logo.svg"
          className="border-b border-gray-300 absolute top-0 p-4"
        />
      </div>

      <div className="bg-white border-t border-gray-300 absolute bottom-0 w-full h-1/4">
        {/*bottom box content in sidebar*/}
      </div>
    </div>
  );
};

export default Sidebar;
