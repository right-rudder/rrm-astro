import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

const WebinarForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userName, setUserName] = useState("");

  const GHL_WEBINAR_FORM_WEBHOOK_URL =
    "https://services.leadconnectorhq.com/hooks/Tg7heLI3UCqo8uRITWhZ/webhook-trigger/e51e207e-85ac-4cd3-9db0-126855135855";

  const toggleModal = () => {
    setShowModal(!showModal);
    setFormSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (formData.get("confirm-email")) {
      return;
    }

    const name = formData.get("first-name");
    setUserName(name);

    const url = GHL_WEBINAR_FORM_WEBHOOK_URL;
    fetch(url, {
      method: "POST",
      body: new URLSearchParams(formData),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        if (response.ok) {
          setFormSubmitted(true);
          document.body.style.overflow = "auto";
        } else {
          console.error("Form submission failed:", response.statusText);
        }
      })
      .catch((error) => {
        console.error(
          "Network error occurred while submitting the form:",
          error
        );
      });
  };

  return (
    <>
      <button
        className="btn-primary w-full md:w-auto"
        onClick={() => {
          toggleModal();
          document.body.style.overflow = "hidden";
        }}
      >
        Register Now
      </button>

      {showModal && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-40">
          <div className="bg-white px-12 pb-9 pt-0 max-w-md lg:max-h-[77vh] overflow-auto text-black relative rounded-md z-50">
            {!formSubmitted && (
              <>
                <h2 className="text-4xl text-gray-900 text-center font-bold mb-1">
                  Register To Our Next Webinar
                </h2>
                <p className="mb-4 text-center text-gray-600">
                  Fill out the form below to assist to our webinar.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="">
                    <div className="mb-4">
                      <label
                        htmlFor="first-name"
                        className="block mb-0 font-semibold"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        autoComplete="given-name"
                        className="w-full h-9 p-2 border bg-gray-100 border-gray-400 rounded-sm focus:outline focus:outline-primary-600/50 focus:ring focus:ring-primary-600/50 focus:border-primary-600/50"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="last-name"
                        className="block mb-0 font-semibold"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        autoComplete="family-name"
                        className="w-full h-9 p-2 border bg-gray-100 border-gray-400 rounded-sm focus:outline focus:outline-primary-600/50 focus:ring focus:ring-primary-600/50 focus:border-primary-600/50"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block mb-0 font-semibold"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        className="w-full h-9 p-2 border bg-gray-100 border-gray-400 rounded-sm focus:outline focus:outline-primary-600/50 focus:ring focus:ring-primary-600/50 focus:border-primary-600/50"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block mb-0 font-semibold"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        className="w-full h-9 p-2 border bg-gray-100 border-gray-400 rounded-sm focus:outline focus:outline-primary-600/50 focus:ring focus:ring-primary-600/50 focus:border-primary-600/50"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="business-name"
                        className="block mb-0 font-semibold"
                      >
                        Business Name
                      </label>
                      <input
                        type="business-name"
                        id="business-name"
                        name="business-name"
                        autoComplete="organization"
                        className="w-full h-9 p-2 border bg-gray-100 border-gray-400 rounded-sm focus:outline focus:outline-primary-600/50 focus:ring focus:ring-primary-600/50 focus:border-primary-600/50"
                        required
                      />
                    </div>

                    <p className="hidden">
                      <label>
                        Don't fill this out if you're human:
                        <input name="confirm-email" />
                      </label>
                    </p>
                  </div>
                  <button type="submit" className="btn-primary w-full mt-8">
                    Register
                  </button>
                </form>
              </>
            )}

            {formSubmitted && (
              <>
                <LiaChalkboardTeacherSolid className="text-primary-600 text-9xl text-center mx-auto" />
                <h2 className="text-4xl font-bold mt-6 mb-4">
                  Thank you {userName}, for your interest in our Webinar!
                </h2>
                <p className="mb-4 text-lg px-2">
                  You will receive an email with a confirmation shortly. Please
                  check your junk/spam folders if you do not receive anything
                  from us. We will reach out to you soon.
                </p>
              </>
            )}

            <button
              className="bg-primary-600 p-1 rounded-full absolute top-2 right-2"
              onClick={() => {
                toggleModal();
                document.body.style.overflow = "auto";
              }}
            >
              <IoMdClose className="text-xl text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WebinarForm;
