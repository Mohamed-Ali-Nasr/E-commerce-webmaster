import { LiaPhoneSolid, LiaEnvelopeSolid } from "react-icons/lia";

const Contact = () => {
  return (
    <section className="md:px-6 lg:px-8 px-4 mt-6 mx-auto container py-12">
      <div className="flex items-center gap-2.5 mb-10 pb-10 pt-4">
        <p className="text-gray-500">Home</p>
        <span className="text-gray-500">/</span>
        <h4 className="font-medium">Contact</h4>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mb-20 pb-12">
        <div className="shadow-[0_1px_13px_rgba(0,0,0,0.05)] xl:px-8 px-6 py-12">
          <div className="border-b">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#DB4444] p-1.5 rounded-full text-white">
                <LiaPhoneSolid size={25} />
              </div>
              <p className="font-medium">Call To Us</p>
            </div>
            <p className="mb-4">We are available 24/7, 7 days a week.</p>
            <p className="pb-8">Phone: +8801611112222</p>
          </div>

          <div className="pt-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#DB4444] p-1.5 rounded-full text-white">
                <LiaEnvelopeSolid size={25} />
              </div>
              <p className="font-medium">Write To US</p>
            </div>
            <p className="mb-4">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="mb-4">Emails: customer@exclusive.com</p>
            <p>Emails: support@exclusive.com</p>
          </div>
        </div>

        <div className="shadow-[0_1px_13px_rgba(0,0,0,0.05)] lg:col-span-2 2xl:col-span-3 xl:px-8 px-6 py-12">
          <div className="mb-12">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 place-items-center gap-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="h-[45px] w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-500 placeholder:font-normal"
                />
                <span className="absolute left-25 top-1/2 -translate-y-1/2 pt-0.5 text-[#DB4444]">
                  *
                </span>
              </div>
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="h-[45px] w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-500 placeholder:font-normal"
                />
                <span className="absolute left-24 top-1/2 -translate-y-1/2 pt-0.5 text-[#DB4444]">
                  *
                </span>
              </div>
              <div className="relative lg:col-span-2 xl:col-span-1 w-full">
                <input
                  type="tel"
                  placeholder="Your phone"
                  className="h-[45px] w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-500 placeholder:font-normal"
                />
                <span className="absolute left-25 top-1/2 -translate-y-1/2 pt-0.5 text-[#DB4444]">
                  *
                </span>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <textarea
              placeholder="Your Message"
              rows={10}
              className="w-full rounded-sm bg-gray-100 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 placeholder:text-gray-500 placeholder:font-normal"
            />
          </div>

          <button
            type="submit"
            className="hover:bg-red-700 transition-all duration-300 cursor-pointer block bg-[#DB4444] sm:text-lg font-medium text-white lg:px-12 sm:px-8 px-4 sm:py-4 py-3 rounded-md lg:ml-auto mx-auto lg:mx-0 tracking-wide"
          >
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
