const Contact = () => {
  return (
    <div className="flex flex-col items-center my-8 mx-2 md:mx-0">
      <div className="bg-white border w-full md:w-3/4 lg:w-1/2 p-8">
        <p className="mb-4">Connect with me on :</p>
        <span className="grid grid-cols-2 md:grid-cols-3">
            <button className="p-2 mb-2 md:mb-0 mr-2 rounded-sm bg-black text-white hover:shadow-lg hover:shadow-blue-200 transition-shadow duration-300">
          <a href="https://www.facebook.com/sonukumar.hansda2" target="_blank">
              Facebook
          </a>
            </button>
            <button className="p-2 mb-2 md:mb-0 mr-2 rounded-sm bg-black text-white hover:shadow-lg hover:shadow-pink-200 transition-shadow duration-300">
          <a href="https://www.instagram.com/_sonu.hansda_/" target="_blank">
              Instagram
          </a>
            </button>
            <button className="p-2 mb-2 md:mb-0 mr-2 rounded-sm bg-black text-white hover:shadow-lg transition-shadow duration-300">
          <a href="https://github.com/Sonu-Hansda" target="_blank">
              Github
          </a>
            </button>
        </span>
      </div>
      <div className="p-8 bg-white border w-full md:w-3/4 lg:w-1/2">
        <p className="text-3xl mb-4">Or</p>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8"
          action=""
          method="post"
        >
          <span>
            <label htmlFor="firstname" className="text-sm underline">
              First Name
            </label>
            <input
              className="w-full block bg-gray-100 p-4 border outline-none focus:bg-white"
              placeholder="Example"
              type="text"
              name="firstname"
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
              name="lastname"
              id="lastname"
            />
          </span>
          <span className="md:col-span-2">
            <label htmlFor="email" className="text-sm underline">
              Email Address
            </label>
            <input
              className="w-full block bg-gray-100 p-4 border outline-none focus:bg-white"
              placeholder="example@mail.com"
              type="email"
              name="email"
              id="email"
            />
          </span>
          <span className="md:col-span-2">
            <label htmlFor="message" className="text-sm underline">
              Your Message
            </label>
            <textarea
              className="w-full block bg-gray-100 p-4 border outline-none focus:bg-white"
              placeholder="What can I do for you ?"
              name="message"
              id="message"
            />
          </span>
          <span>
            <button className="px-8 py-4 bg-green-500 hover:bg-green-600">
              Send
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Contact;
