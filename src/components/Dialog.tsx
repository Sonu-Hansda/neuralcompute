import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

interface IDialog {
  closeDialog: () => void;
  onVerify: (otp: number) => void;
}

const Dialog = (props: IDialog) => {
  const [otp, setOtp] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedOtp = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setOtp(formattedOtp);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowRight' && otp.length < 6) {
      e.preventDefault();
      inputRef.current?.focus();
    }

    if (e.key === 'ArrowLeft' && otp.length > 0) {
      e.preventDefault();
      inputRef.current?.focus();
    }
  };

  const handleVerify = () => {
    props.onVerify(Number(otp));
  };

  return (
    <div className="bg-white w-1/4 h-auto flex flex-col">
      <span className="flex gap-x-8 justify-between border-b-2 p-4">
        Email verification
        <button onClick={props.closeDialog} aria-label="Close Dialog" >
          <XMarkIcon height={24} />
        </button>
      </span>
      <div className="flex gap-2 justify-center mt-8">
        <label htmlFor="otp">Please enter the OTP that has been sent to your email address.</label>
        <input
          ref={inputRef}
          className="border border-gray-300 w-48 h-12 text-center outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          name="otp"
          maxLength={6}
          value={otp}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        className="p-4 bg-green-600 mx-8 my-4 hover:text-white hover:font-bold hover:bg-green-800 transition-colors duration-500"
        onClick={handleVerify} aria-label="Verify OTP"
      >
        Verify
      </button>
    </div>
  );
};

export default Dialog;
