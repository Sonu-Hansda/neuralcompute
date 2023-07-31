import { useState } from "react";
import Dialog from "../components/Dialog";
import { sendMail, verifyEmail, verifyOTP } from "../utils/CustomAPI";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { APIResponseTypes } from "../types/Enums";

const Contact = () => {
  const initialForm = {
    fname: "",
    lname: "",
    email: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialForm);

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [verifyLoad, setVerifyLoad] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleverify = async () => {
    const { email } = formData;
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setError("Valid email address is required.");
    } else {
      setVerifyLoad(true);
      const req: APIResponseTypes = await verifyEmail(email);
      setVerifyLoad(false);
      if (req == APIResponseTypes.verified) {
        setVerified(true);
        setShowDialog(false);
      } else if (req == APIResponseTypes.notVerified) {
        setShowDialog(true);
      } else {
        setShowDialog(false);
        setError("Error while verifying your email.");
      }
    }
  };

  const handleOTPverification = async (otp: number) => {
    const req = await verifyOTP(formData.email, otp);
    if (req) {
      setShowDialog(false);
      setVerified(true);
    } else {
      setShowDialog(false);
      setVerified(false);
      setError("Unable to verify your email address");
    }
  };
  const handleSubmit = async () => {
    setError(undefined);

    const { fname, email, message } = formData;

    if (!fname.trim()) {
      setError("First name is required.");
    } else if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setError("Valid email address required.");
    } else if (!message.trim()) {
      setError("Message cannot be empty.");
    } else if (!verified) {
      setError("Email is not verified , Please click on verify.");
    } else {
      const req = await sendMail(
        formData.fname,
        formData.email,
        formData.message,
        formData.lname
      );
      if (req == APIResponseTypes.success) {
        setSuccess("Message has been sent successfully.");
        setFormData(initialForm);
        setVerified(false);
        setError("");
        setShowDialog(false);
        setVerifyLoad(false);
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      } else if (req == APIResponseTypes.notFound) {
        setError("Please verify your email");
        setVerified(false);
      } else {
        setError("An unknown error occurred .");
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center my-8 mx-2 md:mx-0">
      <div className="bg-white border w-full md:w-3/4 lg:w-1/2 p-8">
        <p className="mb-4">Connect with me on :</p>
        <span className="grid grid-cols-2 md:grid-cols-3">
          <button className="p-2 mb-2 md:mb-0 mr-2 rounded-sm bg-black text-white hover:shadow-lg hover:shadow-blue-200 transition-shadow duration-300" aria-label="Facebook" >
            <a
              href="https://www.facebook.com/sonukumar.hansda2"
              target="_blank"
            >
              Facebook
            </a>
          </button>
          <button className="p-2 mb-2 md:mb-0 mr-2 rounded-sm bg-black text-white hover:shadow-lg hover:shadow-pink-200 transition-shadow duration-300" aria-label="Instagram" >
            <a href="https://www.instagram.com/_sonu.hansda_/" target="_blank">
              Instagram
            </a>
          </button>
          <button className="p-2 mb-2 md:mb-0 mr-2 rounded-sm bg-black text-white hover:shadow-lg transition-shadow duration-300" aria-label="Github" >
            <a href="https://github.com/Sonu-Hansda" target="_blank">
              Github
            </a>
          </button>
        </span>
      </div>
      <div className="p-8 bg-white border w-full md:w-3/4 lg:w-1/2">
        <p className="text-3xl mb-4">Or</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <span>
            <label htmlFor="firstname" className="text-sm underline">
              First Name
            </label>
            <input
              className="w-full block bg-gray-100 p-4 border outline-none focus:bg-white"
              placeholder="Example"
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              id="firstname"
            />
          </span>
          <span>
            <label htmlFor="lastname" className="text-sm underline">
              Last Name
            </label>
            <input
              className="w-full block bg-gray-100 p-4 border outline-none focus:bg-white"
              placeholder="surname"
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              id="lastname"
            />
          </span>
          <span className="relative md:col-span-2 flex flex-col">
            <label htmlFor="email" className="text-sm underline">
              Email Address
            </label>
            <input
              className="w-full block bg-gray-100 p-4 border outline-none focus:bg-white"
              placeholder="example@mail.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
            />
            {verified && (
              <CheckBadgeIcon
                className="absolute right-4 top-10"
                color="green"
                height={24}
              />
            )}
            {formData.email && !verified && formData.email?.length > 0 && (
              <span
                className={`text-green-600 hover:text-green-800 text-right pr-2 cursor-pointer underline underline-offset-2 transition-all duration-500 ${
                  !verified && formData.email.length > 0 ? "h-12" : "h-0"
                }`}
                onClick={verifyLoad ? () => null : handleverify}
              >
                {verifyLoad ? "verifying..." : "verify"}
              </span>
            )}
          </span>
          <span className="md:col-span-2">
            <label htmlFor="message" className="text-sm underline">
              Your Message
            </label>
            <textarea
              className="w-full block bg-gray-100 p-4 border outline-none focus:bg-white"
              placeholder="What can I do for you?"
              name="message"
              value={formData.message}
              onChange={handleChange}
              id="message"
            />
          </span>
          <span>
            <button
              className="px-8 py-4 bg-green-500 hover:bg-green-600"
              onClick={handleSubmit}
              aria-label="Send"
            >
              Send
            </button>
          </span>
          {error && !success && (
            <span className="block md:col-span-2 text-red-600">⚠️ {error}</span>
          )}
          {success && !error && (
            <span className="block md:col-span-2 text-green-800">
              ✅ {success}
            </span>
          )}
        </div>
      </div>
      {/* Dialog Background */}
      {showDialog && (
        <div className="fixed inset-0 z-50 bg-black opacity-60"></div>
      )}

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <Dialog
            closeDialog={() => setShowDialog(false)}
            onVerify={handleOTPverification}
          />
        </div>
      )}
    </div>
  );
};

export default Contact;
