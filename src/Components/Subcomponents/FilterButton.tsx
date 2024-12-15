
const FilterButton = ({ btnValue, value, setValue }) => {
  const isActive = value === btnValue; // Check if the button is the currently selected one

  const handleClick = () => {
    // If the button is active, set value to "All Doctors"
    if (isActive) {
      setValue("All Doctors");
    } else {
      setValue(btnValue); // Update the value when the button is clicked
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`block w-full px-4 py-3 text-left border rounded-lg 
                  ${isActive ? 'text-white bg-yellow-400 border-none font-semibold' : 'text-[#ada7a6] bg-transparent'}`}
    >
      {btnValue}
    </button>
  );
};

export default FilterButton;
