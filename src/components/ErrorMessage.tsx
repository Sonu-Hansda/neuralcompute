import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface Props {
    message:string;
}

const ErrorMessage = (props: Props) => {
  return (
    <div className="my-2">
    <p className="flex justify-center flex-col items-center">
      <ExclamationTriangleIcon className="h-10 md:h-12" color="red" />
      {props.message}
    </p>
  </div>
  );
}

export default ErrorMessage;