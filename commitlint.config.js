module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "jira-ticket": [2, "always"],
  },
  plugins: [
    {
      rules: {
        "jira-ticket": ({ type, scope }) => {
          if (!["fix", "feat"].includes(type)) {
            return [true];
          }

          const ticketRegExp = /(PROJECT|PROJECT-2)-\d+/;

          return [
            ticketRegExp.test(scope),
            "Your scope must match Jira ticket pattern (PROJECT|PROJECT)-XXX.",
          ];
        },
      },
    },
  ],
};
