export const TextArea = (props) => {
  return (
    <div className="col-span-full">
      <label
        htmlFor="about"
        className="block text-lg font-medium leading-6 text-gray-900"
      >
        {props.label}:
      </label>
      <div className="mt-2">
        <textarea
          id="about"
          name="about"
          rows="3"
          value={props.value}
          disabled={props.disabled}
          className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary outline-0 sm:text-sm md:text-md sm:leading-6"
        ></textarea>
      </div>
    </div>
  );
};
