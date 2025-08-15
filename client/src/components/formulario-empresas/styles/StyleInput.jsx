function StyleInput(props){

    return(
        <div>
            <input
              {...props}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border ${
                props.errors ? "border-red-500" : ""
              }`}
            />
            {props.errors && (
              <p className="mt-1 text-sm text-red-600">{props.errors}</p>
            )}
        </div>
    );
}

export default StyleInput