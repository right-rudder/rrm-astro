import { useState } from "react";
import {
  formatPhoneNumber,
  validatePhoneNumber,
} from "../utils/phoneValidation";

const MastermindFormInline = ({ webhook, apiKey }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const confirmEmail = formData.get("confirm-email")?.trim();
    if (confirmEmail) return;

    const name = formData.get("first-name");
    setUserName(name);

    const urlEncodedBody = new URLSearchParams(formData).toString();

    const jsonBody = {
      first_name: formData.get("first-name")?.trim() || "",
      last_name: formData.get("last-name")?.trim() || "",
      email: formData.get("email")?.trim() || "",
      phone: formData.get("phone")?.trim() || "",
      campaign: "webinar",
      account_random_id: "ac_laoegizr",
    };

    try {
      const [ghlRes, portalRes] = await Promise.all([
        fetch(webhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlEncodedBody,
        }),
        fetch("https://portal.rightruddermarketing.com/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify(jsonBody),
        }),
      ]);

      if (ghlRes.ok && portalRes.ok) {
        setFormSubmitted(true);
      } else {
        console.error("Submission failed", {
          ghlStatus: ghlRes.status,
          portalStatus: portalRes.status,
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  // Handle phone input change
  const handlePhoneChange = (e) => {
    const input = e.target.value;

    // Format the phone number
    const formatted = formatPhoneNumber(input);

    // Update the input with formatted value
    setPhoneValue(formatted);

    // Validate and set error if needed
    const validation = validatePhoneNumber(formatted);
    setPhoneError(validation.isValid ? "" : validation.errorMessage);
  };

  return (
    <div className="bg-white p-2 rounded-lg md:p-6 lg:p-12 text-center max-w-sm lg:max-w-full lg:w-full mx-0">
      {!formSubmitted ? (
        <>
          <h2 className="text-4xl font-bold my-4">Sign Up Here</h2>
          <p className="mb-6">
            Fill out the form below get details sent to your directly for our
            next event.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex flex-col lg:flex-row lg:gap-10 w-full">
              <div className="mb-4 w-full">
                <label
                  htmlFor="first-name"
                  className="block mb-1 font-semibold"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  className="w-full p-2 border border-gray-400 rounded-sm"
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="last-name" className="block mb-1 font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  className="w-full p-2 border border-gray-400 rounded-sm"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-10 w-full">
              <div className="mb-4 w-full">
                <label htmlFor="phone" className="block mb-1 font-semibold">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full p-2 border border-gray-400 rounded-sm"
                  required
                  value={phoneValue}
                  onChange={handlePhoneChange}
                />
                {phoneError && (
                  <p className="text-red-500 text-sm">{phoneError}</p>
                )}
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="email" className="block mb-1 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-400 rounded-sm"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center lg:gap-10 w-full">
              <div className="mb-4 w-full">
                <label
                  htmlFor="business-name"
                  className="block mb-1 font-semibold"
                >
                  Flight School Name
                </label>
                <input
                  type="text"
                  id="business-name"
                  name="business-name"
                  className="w-full p-2 border border-gray-400 rounded-sm"
                  required
                />
              </div>

              {/* Honeypot field */}
              <p className="hidden">
                <label>
                  Don't fill this out if you're human:
                  <input name="confirm-email" />
                </label>
              </p>
              <div className="mb-4 w-full">
                <label
                  htmlFor="business-name"
                  className="block mb-1 text-xs font-light text-gray-500 italic"
                >
                  Click Button to Send
                </label>
                <button
                  type="submit"
                  className="w-full p-2 border border-gray-400 rounded-sm btn-primary"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-4xl font-bold mt-6 mb-4">
            Thank you, {userName}, for registering!
          </h2>
          <p className="mb-4">
            You will receive a confirmation email shortly. Please check your
            spam or junk folder if you do not see it.
          </p>
        </div>
      )}
    </div>
  );
};

export default MastermindFormInline;
