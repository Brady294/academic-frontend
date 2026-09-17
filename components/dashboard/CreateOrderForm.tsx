"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  GraduationCap,
  Info,
  Loader2,
  Paperclip,
  Upload,
  X,
} from "lucide-react";

import orderService from "@/services/orderService";

/* =========================================================
   TYPES
========================================================= */

type Step = 1 | 2 | 3;

type AcademicLevel =
  | "High School"
  | "University"
  | "Masters";

interface UploadedFile {
  id: string;
  file: File;
}

/* =========================================================
   TIME ZONES
========================================================= */

const TIME_ZONES = [
  {
    value: "Africa/Nairobi",
    label: "Nairobi (EAT, UTC+3)",
  },
  {
    value: "Africa/Lagos",
    label: "Lagos (WAT, UTC+1)",
  },
  {
    value: "Africa/Johannesburg",
    label: "Johannesburg (SAST, UTC+2)",
  },
  {
    value: "Africa/Cairo",
    label: "Cairo (EET)",
  },
  {
    value: "Africa/Casablanca",
    label: "Casablanca (Morocco)",
  },
  {
    value: "Africa/Accra",
    label: "Accra (GMT, UTC+0)",
  },
  {
    value: "Europe/London",
    label: "London (UK)",
  },
  {
    value: "Europe/Paris",
    label: "Paris (Central Europe)",
  },
  {
    value: "Europe/Berlin",
    label: "Berlin (Central Europe)",
  },
  {
    value: "Europe/Moscow",
    label: "Moscow (MSK, UTC+3)",
  },
  {
    value: "Asia/Dubai",
    label: "Dubai (GST, UTC+4)",
  },
  {
    value: "Asia/Kolkata",
    label: "India (IST, UTC+5:30)",
  },
  {
    value: "Asia/Singapore",
    label: "Singapore (SGT, UTC+8)",
  },
  {
    value: "Asia/Shanghai",
    label: "China (CST, UTC+8)",
  },
  {
    value: "Asia/Tokyo",
    label: "Tokyo (JST, UTC+9)",
  },
  {
    value: "Australia/Sydney",
    label: "Sydney (AEST/AEDT)",
  },
  {
    value: "Pacific/Auckland",
    label: "Auckland (NZST/NZDT)",
  },
  {
    value: "America/New_York",
    label: "New York (Eastern Time)",
  },
  {
    value: "America/Chicago",
    label: "Chicago (Central Time)",
  },
  {
    value: "America/Denver",
    label: "Denver (Mountain Time)",
  },
  {
    value: "America/Los_Angeles",
    label: "Los Angeles (Pacific Time)",
  },
  {
    value: "America/Toronto",
    label: "Toronto (Eastern Time)",
  },
  {
    value: "America/Vancouver",
    label: "Vancouver (Pacific Time)",
  },
  {
    value: "America/Sao_Paulo",
    label: "São Paulo (BRT)",
  },
];

/* =========================================================
   SUBJECTS
========================================================= */

const SUBJECTS: Record<
  AcademicLevel,
  string[]
> = {
  "High School": [
    "Mathematics",
    "English Language",
    "English Literature",
    "Biology",
    "Chemistry",
    "Physics",
    "Computer Science",
    "Information Technology",
    "Business Studies",
    "Economics",
    "Accounting",
    "Geography",
    "History",
    "Government / Civics",
    "Political Science",
    "Religious Studies",
    "Agricultural Science",
    "Environmental Science",
    "Psychology",
    "Sociology",
    "French",
    "Spanish",
    "Art & Design",
    "Music",
    "Physical Education",
    "Other",
  ],

  University: [
    "Accounting",
    "Finance",
    "Economics",
    "Business Administration",
    "Marketing",
    "Management",
    "Entrepreneurship",
    "Human Resource Management",
    "Project Management",

    "Mathematics",
    "Statistics",

    "Computer Science",
    "Information Technology",
    "Software Engineering",
    "Data Science",
    "Cybersecurity",
    "Artificial Intelligence",
    "Information Systems",

    "Engineering",
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Electronic Engineering",
    "Chemical Engineering",
    "Biomedical Engineering",

    "Architecture",

    "Medicine",
    "Nursing",
    "Public Health",
    "Pharmacy",
    "Dentistry",

    "Biology",
    "Biotechnology",
    "Chemistry",
    "Physics",

    "Environmental Science",
    "Environmental Studies",

    "Psychology",
    "Sociology",
    "Social Work",

    "Political Science",
    "International Relations",
    "Law",
    "Criminology",

    "Education",
    "Curriculum Studies",

    "History",
    "Geography",
    "Philosophy",

    "English",
    "Literature",
    "Linguistics",

    "Communication",
    "Media Studies",
    "Journalism",

    "Hospitality Management",
    "Tourism Management",

    "Other",
  ],

  Masters: [
    "Business Administration",
    "Finance",
    "Accounting",
    "Economics",
    "Marketing",
    "Management",
    "Human Resource Management",
    "Project Management",
    "International Business",
    "Entrepreneurship",

    "Public Administration",
    "Public Policy",

    "Computer Science",
    "Information Technology",
    "Software Engineering",
    "Data Science",
    "Artificial Intelligence",
    "Cybersecurity",
    "Information Systems",

    "Engineering",
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Electronic Engineering",
    "Chemical Engineering",
    "Biomedical Engineering",

    "Architecture",

    "Medicine",
    "Nursing",
    "Public Health",
    "Pharmacy",

    "Biology",
    "Biotechnology",
    "Chemistry",
    "Physics",

    "Environmental Science",

    "Psychology",
    "Sociology",
    "Social Work",

    "Political Science",
    "International Relations",
    "Law",
    "Criminology",

    "Education",
    "Educational Leadership",
    "Curriculum Studies",

    "History",
    "Geography",
    "Philosophy",

    "English",
    "Literature",
    "Linguistics",

    "Communication",
    "Media Studies",
    "Journalism",

    "Other",
  ],
};

/* =========================================================
   SERVICE TYPES
========================================================= */

const SERVICE_TYPES = [
  "Assignment",
  "Essay",
  "Research Paper",
  "Coursework",
  "Dissertation",
  "Thesis",
  "Report",
  "Case Study",
  "Literature Review",
  "Proofreading",
  "Editing",
  "Presentation",
  "Programming / Coding",
  "Technical Project",
  "Other",
];

/* =========================================================
   CITATION STYLES
========================================================= */

const CITATION_STYLES = [
  "APA",
  "MLA",
  "Harvard",
  "Chicago",
  "IEEE",
  "Vancouver",
  "Oxford",
  "Other",
  "Not Required",
];

/* =========================================================
   TECHNICAL WORK DETECTION
========================================================= */

const TECHNICAL_KEYWORDS = [
  "programming",
  "coding",
  "software",
  "technical",
  "computer science",
  "information technology",
  "software engineering",
  "data science",
  "artificial intelligence",
  "cybersecurity",
  "web development",
  "app development",
  "database",
  "sql",
  "python",
  "java",
  "javascript",
  "c++",
  "c#",
  "matlab",
  "engineering",
];

/**
 * Determines whether the order should be treated
 * as technical.
 *
 * IMPORTANT:
 * This function ONLY identifies technical work.
 *
 * It does NOT calculate a price.
 */
function isTechnicalOrder(
  subject: string,
  serviceType: string,
  title: string,
  instructions: string
): boolean {
  const combined = [
    subject,
    serviceType,
    title,
    instructions,
  ]
    .join(" ")
    .toLowerCase();

  return TECHNICAL_KEYWORDS.some(
    (keyword) =>
      combined.includes(
        keyword.toLowerCase()
      )
  );
}

/* =========================================================
   TIMEZONE HELPERS
========================================================= */

/**
 * Gets the timezone configured on the user's
 * phone/computer/browser.
 *
 * Example:
 * Africa/Nairobi
 * America/New_York
 * Europe/London
 */
function getBrowserTimezone(): string {
  try {
    return (
      Intl.DateTimeFormat().resolvedOptions()
        .timeZone || "Africa/Nairobi"
    );
  } catch {
    return "Africa/Nairobi";
  }
}

/**
 * Converts the selected deadline into a readable
 * date/time using the selected timezone.
 */
function formatDeadline(
  value: string,
  timezone: string
): string {
  if (!value) {
    return "-";
  }

  try {
    /*
     * datetime-local has no timezone information.
     *
     * We intentionally interpret the selected
     * deadline as belonging to the selected timezone.
     */
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat(
      undefined,
      {
        timeZone: timezone,
        dateStyle: "medium",
        timeStyle: "short",
      }
    ).format(date);
  } catch {
    return value;
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function CreateOrderForm() {
  /* -------------------------------------------------------
     STEP
  ------------------------------------------------------- */

  const [step, setStep] = useState<Step>(1);

  /* -------------------------------------------------------
     ORDER DETAILS
  ------------------------------------------------------- */

  const [title, setTitle] = useState("");

  const [academicLevel, setAcademicLevel] =
    useState<AcademicLevel>("University");

  const [subject, setSubject] = useState("");

  const [serviceType, setServiceType] =
    useState("");

  const [deadline, setDeadline] =
    useState("");

  const [pages, setPages] =
    useState("");

  const [spacing, setSpacing] =
    useState("Double");

  /* -------------------------------------------------------
     TIMEZONE
  ------------------------------------------------------- */

  /*
   * Start empty so the browser can determine the
   * timezone on the client.
   */
  const [timezone, setTimezone] =
    useState("Africa/Nairobi");

  /*
   * Indicates whether the timezone was automatically
   * detected.
   */
  const [timezoneDetected, setTimezoneDetected] =
    useState(false);

  /* -------------------------------------------------------
     REQUIREMENTS
  ------------------------------------------------------- */

  const [citationStyle, setCitationStyle] =
    useState("");

  const [instructions, setInstructions] =
    useState("");

  /* -------------------------------------------------------
     FILES
  ------------------------------------------------------- */

  const [files, setFiles] =
    useState<UploadedFile[]>([]);

  /* -------------------------------------------------------
     SUBMISSION STATE
  ------------------------------------------------------- */

  const [submitting, setSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  /* =======================================================
     AUTOMATIC TIMEZONE DETECTION
  ======================================================= */

  useEffect(() => {
    /*
     * This runs only in the browser.
     *
     * The browser gets the timezone from the user's
     * operating system / device settings.
     */
    const detectedTimezone =
      getBrowserTimezone();

    /*
     * Check whether the detected timezone exists
     * in our selectable timezone list.
     */
    const supportedTimezone =
      TIME_ZONES.some(
        (item) =>
          item.value === detectedTimezone
      );

    if (supportedTimezone) {
      setTimezone(detectedTimezone);
    } else {
      /*
       * If the browser reports a timezone that is not
       * included in our list, keep the detected IANA
       * timezone so it can still be sent to the backend.
       */
      setTimezone(detectedTimezone);
    }

    setTimezoneDetected(true);
  }, []);

  /* -------------------------------------------------------
     TECHNICAL ORDER
  ------------------------------------------------------- */

  const technicalOrder =
    isTechnicalOrder(
      subject,
      serviceType,
      title,
      instructions
    );

  /* -------------------------------------------------------
     SUBJECT LIST
  ------------------------------------------------------- */

  const subjects =
    SUBJECTS[academicLevel];

  /* =======================================================
     VALIDATION
  ======================================================= */

  function validateStepOne(): boolean {
    if (!title.trim()) {
      setSubmitError(
        "Please enter the assignment title."
      );
      return false;
    }

    if (!academicLevel) {
      setSubmitError(
        "Please select your academic level."
      );
      return false;
    }

    if (!subject) {
      setSubmitError(
        "Please select a subject."
      );
      return false;
    }

    if (!serviceType) {
      setSubmitError(
        "Please select the type of work."
      );
      return false;
    }

    if (!deadline) {
      setSubmitError(
        "Please select your deadline."
      );
      return false;
    }

    const deadlineDate =
      new Date(deadline);

    if (
      Number.isNaN(
        deadlineDate.getTime()
      )
    ) {
      setSubmitError(
        "Please select a valid deadline."
      );
      return false;
    }

    if (
      deadlineDate.getTime() <=
      Date.now()
    ) {
      setSubmitError(
        "Please select a future deadline."
      );
      return false;
    }

    if (
      !pages ||
      Number(pages) <= 0
    ) {
      setSubmitError(
        "Please enter the number of pages."
      );
      return false;
    }

    if (!timezone) {
      setSubmitError(
        "Please select your timezone."
      );
      return false;
    }

    return true;
  }

  function validateStepTwo(): boolean {
    if (!instructions.trim()) {
      setSubmitError(
        "Please provide instructions for your work."
      );

      return false;
    }

    return true;
  }

  /* =======================================================
     NEXT
  ======================================================= */

  function handleNext() {
    setSubmitError("");

    if (step === 1) {
      if (!validateStepOne()) {
        return;
      }

      setStep(2);

      return;
    }

    if (step === 2) {
      if (!validateStepTwo()) {
        return;
      }

      setStep(3);
    }
  }

  /* =======================================================
     BACK
  ======================================================= */

  function handleBack() {
    setSubmitError("");
    setSuccessMessage("");

    if (step === 2) {
      setStep(1);
      return;
    }

    if (step === 3) {
      setStep(2);
    }
  }

  /* =======================================================
     FILE HANDLING
  ======================================================= */

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles =
      Array.from(
        event.target.files ?? []
      );

    if (
      selectedFiles.length === 0
    ) {
      return;
    }

    const newFiles =
      selectedFiles.map(
        (file) => ({
          file,
          id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        })
      );

    setFiles((current) => [
      ...current,
      ...newFiles,
    ]);

    /*
     * Allows the same file to be selected again.
     */
    event.target.value = "";
  }

  function removeFile(id: string) {
    setFiles((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  /* =======================================================
     SUBMIT
  ======================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSubmitError("");
    setSuccessMessage("");

    if (!validateStepOne()) {
      setStep(1);
      return;
    }

    if (!validateStepTwo()) {
      setStep(2);
      return;
    }

    try {
      setSubmitting(true);

      /*
       * IMPORTANT:
       *
       * There is NO budget here.
       *
       * The backend receives the order details and
       * calculates the price.
       *
       * TIMEZONE has now been added so the backend
       * knows which timezone the client selected.
       */
      const response =
        await orderService.createOrder({
          title: title.trim(),

          subject,

          service_type:
            serviceType,

          academic_level:
            academicLevel,

          pages: Number(pages),

          spacing,

          citation_style:
            citationStyle ||
            "Not Required",

          deadline,

          /*
           * NEW
           */
          timezone,

          instructions:
            instructions.trim(),
        });

      const orderId =
        response?.order?.id ??
        response?.data?.order?.id ??
        response?.id ??
        response?.data?.id;

      setSuccessMessage(
        "Your order has been submitted successfully."
      );

      /*
       * Give the success message a moment to display.
       *
       * There is no state update loop here.
       */
      if (orderId) {
        window.setTimeout(() => {
          window.location.href =
            `/dashboard/orders/${orderId}`;
        }, 800);
      }
    } catch (error: any) {
      console.error(
        "Create order error:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "We could not submit your order. Please try again.";

      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="w-full pb-6">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Create New Order
            </h1>

            <p className="text-sm text-gray-500">
              Tell us what you need and provide the
              materials we need to get started.
            </p>
          </div>
        </div>
      </div>

      {/* =================================================
          PROGRESS
      ================================================= */}

      <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <div className="flex items-center">
          {[1, 2, 3].map(
            (item, index) => {
              const active =
                step === item;

              const completed =
                step > item;

              return (
                <div
                  key={item}
                  className="flex min-w-0 flex-1 items-center"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-full text-xs
                        font-bold
                        ${
                          active ||
                          completed
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-500"
                        }
                      `}
                    >
                      {completed ? (
                        <CheckCircle2
                          size={16}
                        />
                      ) : (
                        item
                      )}
                    </div>

                    <span
                      className={`
                        hidden text-xs
                        font-semibold sm:block
                        ${
                          active ||
                          completed
                            ? "text-blue-600"
                            : "text-gray-400"
                        }
                      `}
                    >
                      {item === 1 &&
                        "Details"}

                      {item === 2 &&
                        "Requirements"}

                      {item === 3 &&
                        "Review"}
                    </span>
                  </div>

                  {index < 2 && (
                    <div
                      className={`
                        mx-2 h-px flex-1
                        ${
                          step >
                          item
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        }
                      `}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="w-full"
      >
        {/* =================================================
            STEP 1
        ================================================= */}

        {step === 1 && (
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-4 py-4 sm:px-6">
              <h2 className="text-lg font-bold text-gray-900">
                Assignment details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Start with the basic information about
                your work.
              </p>
            </div>

            <div className="space-y-4 p-4 sm:p-6">
              {/* TITLE */}

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Assignment title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Marketing Strategy Report"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* LEVEL + SUBJECT */}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <GraduationCap
                      size={16}
                      className="text-blue-600"
                    />

                    Academic level
                  </label>

                  <div className="relative">
                    <select
                      value={
                        academicLevel
                      }
                      onChange={(event) => {
                        setAcademicLevel(
                          event.target
                            .value as AcademicLevel
                        );

                        /*
                         * Reset subject when academic
                         * level changes because the subject
                         * list also changes.
                         */
                        setSubject("");
                      }}
                      className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="High School">
                        High School
                      </option>

                      <option value="University">
                        University
                      </option>

                      <option value="Masters">
                        Masters
                      </option>
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <BookOpen
                      size={16}
                      className="text-blue-600"
                    />

                    Subject
                  </label>

                  <div className="relative">
                    <select
                      value={subject}
                      onChange={(event) =>
                        setSubject(
                          event.target.value
                        )
                      }
                      className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">
                        Select subject
                      </option>

                      {subjects.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* SERVICE */}

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Type of work
                </label>

                <div className="relative">
                  <select
                    value={serviceType}
                    onChange={(event) =>
                      setServiceType(
                        event.target.value
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      Select type of work
                    </option>

                    {SERVICE_TYPES.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* DEADLINE + PAGES */}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Clock3
                      size={16}
                      className="text-blue-600"
                    />

                    Deadline
                  </label>

                  <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(event) =>
                      setDeadline(
                        event.target.value
                      )
                    }
                    min={new Date()
                      .toISOString()
                      .slice(
                        0,
                        16
                      )}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Number of pages
                  </label>

                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={pages}
                    onChange={(event) =>
                      setPages(
                        event.target.value
                      )
                    }
                    placeholder="e.g. 10"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* =================================================
                  TIMEZONE
              ================================================= */}

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Clock3
                    size={16}
                    className="text-blue-600"
                  />

                  Your timezone
                </label>

                <div className="relative">
                  <select
                    value={timezone}
                    onChange={(event) =>
                      setTimezone(
                        event.target.value
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {/*
                     * If the browser detects a timezone that
                     * isn't in our predefined list, add it
                     * dynamically so the selected value is
                     * still visible.
                     */}
                    {!TIME_ZONES.some(
                      (item) =>
                        item.value ===
                        timezone
                    ) &&
                      timezone && (
                        <option
                          value={timezone}
                        >
                          {timezone}
                        </option>
                      )}

                    {TIME_ZONES.map(
                      (item) => (
                        <option
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                <div className="mt-2 flex items-start gap-2">
                  <Info
                    size={15}
                    className="mt-0.5 shrink-0 text-gray-400"
                  />

                  <p className="text-xs leading-5 text-gray-500">
                    {timezoneDetected
                      ? `Your device timezone was detected as ${timezone}. You can change it if needed.`
                      : "Detecting your device timezone..."}
                  </p>
                </div>
              </div>

              {/* SPACING */}

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Spacing
                </label>

                <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-gray-300">
                  {[
                    "Single",
                    "1.5 Spacing",
                    "Double",
                  ].map(
                    (option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setSpacing(
                            option
                          )
                        }
                        className={`
                          px-2 py-3 text-xs
                          font-semibold
                          transition sm:text-sm
                          ${
                            spacing ===
                            option
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }
                        `}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* TECHNICAL NOTICE */}

              {technicalOrder && (
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                  <div className="flex gap-3">
                    <Info
                      size={19}
                      className="mt-0.5 shrink-0 text-orange-600"
                    />

                    <div>
                      <p className="text-sm font-bold text-orange-900">
                        Technical work
                      </p>

                      <p className="mt-1 text-sm leading-5 text-orange-800">
                        Technical and programming
                        work is not automatically
                        priced. Please provide all
                        necessary files, requirements
                        and materials. Our admin team
                        will review your request and
                        provide the final price.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ERROR */}

              {submitError && (
                <ErrorMessage
                  message={submitError}
                />
              )}
            </div>

            {/* FOOTER */}

            <div className="border-t border-gray-100 p-4 sm:px-6">
              <button
                type="button"
                onClick={handleNext}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 sm:ml-auto sm:w-auto"
              >
                Continue
                <ArrowRight
                  size={18}
                />
              </button>
            </div>
          </section>
        )}

        {/* =================================================
            STEP 2
        ================================================= */}

        {step === 2 && (
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-4 py-4 sm:px-6">
              <h2 className="text-lg font-bold text-gray-900">
                Requirements & materials
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Give us the information and files needed
                to understand your work.
              </p>
            </div>

            <div className="space-y-4 p-4 sm:p-6">
              {/* INSTRUCTIONS */}

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Assignment instructions
                </label>

                <textarea
                  value={instructions}
                  onChange={(event) =>
                    setInstructions(
                      event.target.value
                    )
                  }
                  rows={7}
                  placeholder="Tell us exactly what needs to be done. Include your lecturer's instructions, questions, requirements, grading rubric, formatting requirements, sources, or anything else we should know."
                  className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* CITATION */}

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Citation style
                  <span className="ml-2 font-normal text-gray-400">
                    Optional
                  </span>
                </label>

                <div className="relative">
                  <select
                    value={citationStyle}
                    onChange={(event) =>
                      setCitationStyle(
                        event.target.value
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      Select citation style
                    </option>

                    {CITATION_STYLES.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* FILE UPLOAD */}

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Assignment materials
                  <span className="ml-2 font-normal text-gray-400">
                    Optional
                  </span>
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-7 text-center transition hover:border-blue-400 hover:bg-blue-50">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Upload
                      size={21}
                    />
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-700">
                    Add files
                  </p>

                  <p className="mt-1 max-w-md text-xs leading-5 text-gray-500">
                    Upload your assignment brief,
                    rubric, lecture notes, datasets,
                    references or other materials.
                  </p>

                  <span className="mt-3 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-blue-600 shadow-sm">
                    Choose files
                  </span>

                  <input
                    type="file"
                    multiple
                    onChange={
                      handleFileChange
                    }
                    className="hidden"
                  />
                </label>
              </div>

              {/* FILE LIST */}

              {files.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Selected files
                  </p>

                  {files.map(
                    (item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <Paperclip
                            size={17}
                            className="shrink-0 text-blue-600"
                          />

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-gray-700">
                              {
                                item.file
                                  .name
                              }
                            </p>

                            <p className="text-xs text-gray-400">
                              {(
                                item.file
                                  .size /
                                1024 /
                                1024
                              ).toFixed(
                                2
                              )}{" "}
                              MB
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFile(
                              item.id
                            )
                          }
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"
                          aria-label="Remove file"
                        >
                          <X
                            size={17}
                          />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}

              {/* TECHNICAL MATERIAL NOTICE */}

              {technicalOrder && (
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                  <div className="flex gap-3">
                    <Info
                      size={19}
                      className="mt-0.5 shrink-0 text-orange-600"
                    />

                    <div>
                      <p className="text-sm font-bold text-orange-900">
                        Please provide all technical materials
                      </p>

                      <p className="mt-1 text-sm leading-5 text-orange-800">
                        For programming and technical
                        work, please include source files,
                        datasets, screenshots, project
                        specifications, error messages,
                        expected results and any other
                        relevant materials. The admin team
                        will review everything and provide
                        the final price.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitError && (
                <ErrorMessage
                  message={submitError}
                />
              )}
            </div>

            {/* FOOTER */}

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <button
                type="button"
                onClick={handleBack}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:w-auto"
              >
                <ArrowLeft
                  size={18}
                />

                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-blue-700 sm:w-auto"
              >
                Review Order

                <ArrowRight
                  size={18}
                />
              </button>
            </div>
          </section>
        )}

        {/* =================================================
            STEP 3
        ================================================= */}

        {step === 3 && (
          <div className="space-y-4">
            {/* REVIEW */}

            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-4 py-4 sm:px-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Review your order
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Check everything before submitting.
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <SummaryItem
                    label="Assignment"
                    value={title}
                  />

                  <SummaryItem
                    label="Academic level"
                    value={academicLevel}
                  />

                  <SummaryItem
                    label="Subject"
                    value={subject}
                  />

                  <SummaryItem
                    label="Type of work"
                    value={serviceType}
                  />

                  <SummaryItem
                    label="Deadline"
                    value={
                      deadline
                        ? formatDeadline(
                            deadline,
                            timezone
                          )
                        : "-"
                    }
                  />

                  {/* NEW TIMEZONE REVIEW */}

                  <SummaryItem
                    label="Timezone"
                    value={timezone}
                  />

                  <SummaryItem
                    label="Pages"
                    value={pages}
                  />

                  <SummaryItem
                    label="Spacing"
                    value={spacing}
                  />

                  <SummaryItem
                    label="Citation"
                    value={
                      citationStyle ||
                      "Not Required"
                    }
                  />
                </div>

                {/* INSTRUCTIONS */}

                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Instructions
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                    {instructions}
                  </p>
                </div>

                {/* FILES */}

                {files.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      Attached materials
                    </p>

                    <div className="mt-2 space-y-2">
                      {files.map(
                        (item) => (
                          <div
                            key={
                              item.id
                            }
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <Paperclip
                              size={15}
                              className="text-blue-600"
                            />

                            <span className="truncate">
                              {
                                item.file
                                  .name
                              }
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* =================================================
                PRICING NOTICE
            ================================================= */}

            <section
              className={`
                rounded-2xl border p-4 sm:p-5
                ${
                  technicalOrder
                    ? "border-orange-200 bg-orange-50"
                    : "border-blue-200 bg-blue-50"
                }
              `}
            >
              <div className="flex gap-3">
                <div
                  className={`
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    ${
                      technicalOrder
                        ? "bg-orange-100 text-orange-600"
                        : "bg-blue-100 text-blue-600"
                    }
                  `}
                >
                  <Info
                    size={20}
                  />
                </div>

                <div>
                  {technicalOrder ? (
                    <>
                      <h3 className="text-sm font-bold text-orange-900">
                        Price will be provided after review
                      </h3>

                      <p className="mt-1 text-sm leading-5 text-orange-800">
                        This appears to be programming or
                        technical work. No automatic price
                        will be calculated. Please make sure
                        you have provided all necessary
                        materials. Our admin team will review
                        your order and provide the final price.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-sm font-bold text-blue-900">
                        Price calculated by our system
                      </h3>

                      <p className="mt-1 text-sm leading-5 text-blue-800">
                        Your price will be calculated by our
                        server using your academic level,
                        number of pages and deadline. The
                        required deposit is calculated by the
                        server as well.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* ERROR */}

            {submitError && (
              <ErrorMessage
                message={submitError}
              />
            )}

            {/* SUCCESS */}

            {successMessage && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {successMessage}
              </div>
            )}

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                <ArrowLeft
                  size={18}
                />

                Back
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle2
                      size={18}
                    />

                    Submit Order
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

/* =========================================================
   SUMMARY ITEM
========================================================= */

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-gray-800">
        {value || "-"}
      </p>
    </div>
  );
}

/* =========================================================
   ERROR MESSAGE
========================================================= */

function ErrorMessage({
  message,
}: {
  message: string;
}) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
      {message}
    </div>
  );
}