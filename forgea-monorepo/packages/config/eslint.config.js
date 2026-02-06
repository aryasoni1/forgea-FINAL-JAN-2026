import boundaries from "eslint-plugin-boundaries";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.turbo/**",
      "**/dist/**",
      "**/.next/**",
    ],
  },
  {
    files: [
      "apps/**/*.{ts,tsx,js,jsx}",
      "services/**/*.{ts,tsx,js,jsx}",
      "packages/**/*.{ts,tsx,js,jsx}",
    ],
    plugins: {
      boundaries,
    },
    settings: {
      "boundaries/elements": [
        { type: "app-admin", pattern: "apps/forgea-admin/**" },
        { type: "app-labs", pattern: "apps/forgea-labs/**" },
        { type: "app-learn", pattern: "apps/forgea-learn/**" },
        { type: "app-lessons", pattern: "apps/forgea-lessons/**" },
        { type: "service-api-core", pattern: "services/api-core/**" },
        {
          type: "service-content-engine",
          pattern: "services/content-engine/**",
        },
        {
          type: "service-verification-runner",
          pattern: "services/verification-runner/**",
        },
        { type: "package", pattern: "packages/*/**" },
      ],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "app-admin", allow: ["app-admin", "package"] },
            { from: "app-labs", allow: ["app-labs", "package"] },
            { from: "app-learn", allow: ["app-learn", "package"] },
            { from: "app-lessons", allow: ["app-lessons", "package"] },
            {
              from: "service-api-core",
              allow: ["service-api-core", "package"],
            },
            {
              from: "service-content-engine",
              allow: ["service-content-engine", "package"],
            },
            {
              from: "service-verification-runner",
              allow: ["service-verification-runner", "package"],
            },
            { from: "package", allow: ["package"] },
          ],
        },
      ],
    },
  },
];
