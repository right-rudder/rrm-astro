import { set } from "astro:schema";
import { useState } from "react";

export default function SEOChecker({ webhook, apiKey }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [fullResults, setFullResults] = useState(null);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleCheck = async (e) => {
    e.preventDefault();
    setError("");
    setPreview(null);
    setFullResults(null);
    setShowEmailGate(false);
    setLoading(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/seo-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze URL");
      }

      setPreview(data.preview);
      setFullResults(data);
      setShowEmailGate(true);
    } catch (err) {
      setError(err.message || "An error occurred while analyzing the URL");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailSubmitting(true);

    // Simulate API call for email capture
    // In production, you would send this to your CRM or email service
    setTimeout(() => {
      setShowEmailGate(false);
      setEmailSubmitting(false);

      // Track conversion
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "generate_lead", {
          event_category: "SEO Checker",
          event_label: "Email Captured",
        });
      }
    }, 800);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailSubmitting(true);
    setSubmitError("");

    const formData = new FormData(e.target);

    const confirmEmail = formData.get("confirm-email")?.trim();
    if (confirmEmail) return;

    const urlEncodedBody = new URLSearchParams(formData).toString();

    //Split name into first and last name
    const firstName = formData.get("full-name")?.trim().split(" ")[0] || "";
    const lastName = formData.get("full-name")?.trim().split(" ")[1] || "";

    const jsonBody = {
      first_name: firstName,
      last_name: lastName,
      email: formData.get("email")?.trim() || "",
      phone: formData.get("phone")?.trim() || "",
      campaign: "seo_checker",
      account_random_id: "ac_laoegizr",
    };

    try {
      const [ghlRes, portalRes] = await Promise.all([
        fetch(webhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlEncodedBody.concat(url),
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
        setShowEmailGate(false);
        setEmailSubmitting(false);
        // Track conversion
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "generate_lead", {
            event_category: "SEO Checker",
            event_label: "Email Captured",
          });
        }
      } else {
        console.error("Submission failed", {
          ghlStatus: ghlRes.status,
          portalStatus: portalRes.status,
          RequestBody: jsonBody,
        });
        setSubmitError("Failed to submit the form. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(
        err.message ||
          "An error occurred while submitting the form. Please try again.",
      );
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreLabel = (level) => {
    const labels = {
      excellent: "Excellent",
      good: "Good",
      "needs-improvement": "Needs Improvement",
      poor: "Poor",
    };
    return labels[level] || "Unknown";
  };

  const getStatusIcon = (status) => {
    if (status === "pass") {
      return (
        <svg
          className="w-5 h-5 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else if (status === "warning") {
      return (
        <svg
          className="w-5 h-5 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-5 h-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  };

  const getImpactBadge = (impact) => {
    const colors = {
      critical: "bg-red-100 text-red-800",
      high: "bg-orange-100 text-orange-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-blue-100 text-blue-800",
    };
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[impact] || colors.medium}`}
      >
        {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* SEO Check Form */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <form onSubmit={handleCheck}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter Your Website URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  "Check SEO"
                )}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </div>

      {/* Preview Results (before email gate) */}
      {preview && showEmailGate && (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <div
              className={`text-6xl font-bold mb-2 ${getScoreColor(preview.score)}`}
            >
              {preview.score}/{preview.maxScore}
            </div>
            <div className="text-2xl font-semibold text-gray-700 mb-1">
              {getScoreLabel(preview.level)}
            </div>
            <p className="text-gray-600">Your SEO Score</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {preview.checksCount}
              </div>
              <div className="text-sm text-gray-600">Total Checks</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">
                {preview.criticalIssues}
              </div>
              <div className="text-sm text-gray-600">Critical Issues</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {preview.highIssues}
              </div>
              <div className="text-sm text-gray-600">High Priority Issues</div>
            </div>
          </div>

          {/* Email Gate */}
          <div className="border-t-2 border-gray-200 pt-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Your Complete SEO Report
                </h3>
                <p className="text-gray-600">
                  Unlock detailed insights and actionable recommendations to
                  improve your rankings
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    autoComplete="name"
                    name="full-name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Flight School Name / Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    autoComplete="organization"
                    name="company"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <p className="hidden">
                  <label>
                    Don't fill this out if you're human:
                    <input name="confirm-email" />
                  </label>
                </p>

                <button
                  type="submit"
                  disabled={emailSubmitting}
                  className="w-full px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {emailSubmitting ? "Processing..." : "Get My Full Report"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Your information will never be
                  shared.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Full Results (after email submission) */}
      {fullResults && !showEmailGate && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete SEO Analysis
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`text-5xl font-bold ${getScoreColor(fullResults.score)}`}
              >
                {fullResults.score}/{fullResults.maxScore}
              </div>
              <div>
                <div className="text-xl font-semibold text-gray-700">
                  {getScoreLabel(fullResults.preview.level)} SEO Score
                </div>
                <div className="text-sm text-gray-600">
                  for {fullResults.url}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Checks */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Detailed Analysis
            </h3>

            {fullResults.detailed.checks.map((check, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(check.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {check.category}
                      </h4>
                      {getImpactBadge(check.impact)}
                    </div>
                    <p className="text-gray-700 mb-2">{check.message}</p>
                    {check.value && (
                      <div className="bg-gray-50 rounded p-3 mb-2">
                        <p className="text-sm text-gray-600 font-mono break-words">
                          {check.value}
                        </p>
                      </div>
                    )}
                    {check.recommendation && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                        <p className="text-sm text-blue-900">
                          <strong>Recommendation:</strong>{" "}
                          {check.recommendation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">
              Need Help Improving Your SEO?
            </h3>
            <p className="text-lg mb-6 text-primary-100">
              Our aviation marketing experts can help you implement these
              recommendations and boost your rankings
            </p>
            <a
              href="/schedule-call"
              className="inline-block px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-lg transition-colors"
            >
              Get a Free Consultation
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
