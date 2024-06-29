module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "google",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "eslint-config-prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint", "simple-import-sort"],
  "rules": {
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": ["interface", "enum", "class", "typeAlias"],
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": false
        }
      },
      {
        "selector": "property",
        "format": ["strictCamelCase"],
        "filter": {
          "regex": "(_env_)|(INN)|(URL)|(NS)|(API_URL)|(API_MIN_DELAY)",
          "match": false
        }
      }
    ],
    "@typescript-eslint/no-empty-function": ["warn"],
    "react/jsx-curly-brace-presence": ["error", "never"],
    "no-var": "error",
    "no-console": "warn",
    "no-alert": "error",
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@*", "*/*/*/*", "!@emotion", "!@tanstack", "!@mantine", "!@testing-library", "!@core", "!@modules", "!@services", "!@globalTypes", "!@assets", "!@libs", "!@i18n", "@modules/*/*", "@services/*/*"]
      }
    ],
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
    "linebreak-style": ["error", "unix"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "jsx-a11y/click-events-have-key-events": "off",
    "prefer-template": "error",
    "no-implicit-coercion": ["error", { "disallowTemplateShorthand": true }],
    "no-duplicate-imports": "error"
  },
  "overrides": [
    {
      "files": ["*schemas.ts"],
      "rules": {
        "@typescript-eslint/naming-convention": [
          "error",
          {
            "selector": ["interface", "enum", "class", "typeAlias"],
            "format": ["PascalCase"],
            "custom": {
              "regex": "^I[A-Z]",
              "match": false
            }
          },
          {
            "selector": "objectLiteralProperty",
            "format": ["strictCamelCase"],
            "filter": {
              "regex": "(([a-z]+_[a-z]+)+)|([А-Я][А-я]+)",
              "match": false
            }
          },
          {
            "selector": ["classProperty", "typeProperty"],
            "format": ["strictCamelCase"]
          }
        ]
      }
    },
    {
      "files": ["./src/core/**/*.{js,jsx,ts,tsx}"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": ["@*", "*/*/*/*", "!@emotion", "!@tanstack", "!@mantine", "!@testing-library", "!@core", "!@modules", "!@services", "!@globalTypes", "!@assets", "!@libs", "!@i18n", "@modules/*/*", "@services/*/*"]
          }
        ]
      }
    },
    {
      "files": ["./src/od/**/*.{js,jsx,ts,tsx}"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": ["@*", "*/*/*/*", "!@emotion", "!@tanstack", "!@mantine", "!@testing-library", "!@core", "!@modules", "!@services", "!@globalTypes", "!@assets", "!@libs", "!@i18n", "@modules/*/*", "@services/*/*", "!@od"]
          }
        ]
      }
    },
    {
      "files": ["./src/sa/**/*.{js,jsx,ts,tsx}"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": ["@*", "*/*/*/*", "!@emotion", "!@tanstack", "!@mantine", "!@testing-library", "!@core", "!@modules", "!@services", "!@globalTypes", "!@assets", "!@libs", "!@i18n", "@modules/*/*", "@services/*/*", "!@sa"]
          }
        ]
      }
    },
    {
      "files": ["./src/mc/**/*.{js,jsx,ts,tsx}"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": ["@*", "*/*/*/*", "!@emotion", "!@tanstack", "!@mantine", "!@testing-library", "!@core", "!@modules", "!@services", "!@globalTypes", "!@assets", "!@libs", "!@i18n", "@modules/*/*", "@services/*/*", "!@mc"]
          }
        ]
      }
    },
    {
      "files": ["./src/kyc/**/*.{js,jsx,ts,tsx}"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": ["@*", "*/*/*/*", "!@emotion", "!@tanstack", "!@mantine", "!@testing-library", "!@core", "!@modules", "!@services", "!@globalTypes", "!@assets", "!@libs", "!@i18n", "@modules/*/*", "@services/*/*", "!@kyc"]
          }
        ]
      }
    },
    {
      "files": ["./src/wlf/**/*.{js,jsx,ts,tsx}"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": ["@*", "*/*/*/*", "!@emotion", "!@tanstack", "!@mantine", "!@testing-library", "!@core", "!@modules", "!@services", "!@globalTypes", "!@assets", "!@libs", "!@i18n", "@modules/*/*", "@services/*/*", "!@wlf"]
          }
        ]
      }
    },
    {
      "files": ["./src/libs/react-router/**/*.{js,jsx,ts,tsx}"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": ["!@*", "*/*/*/*", "!@emotion", "!@tanstack", "!@mantine", "!@testing-library", "!@core", "!@modules", "!@services", "!@globalTypes", "!@assets", "!@libs", "!@i18n", "@modules/*/*", "@services/*/*"]
          }
        ]
      }
    }
  ],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": true
    }
  }
}

