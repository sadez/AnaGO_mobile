module.exports = {
    "env": {
        "browser": false,
        "es6": true
    },
    "parser": "babel-eslint",
    "globals": { "fetch": false },  
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "modules": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native"
    ],
    "extends" : [    "eslint:recommended",    "plugin:react/recommended",    "airbnb-base"  ],
    "rules": {
        "arrow-body-style" : "warn",
        "linebreak-style": "off",
        "no-use-before-define": "off",
        "react/prop-types": "off",
        "max-len": ["error", { "code": 400 }],
        "padded-blocks": ["error", "never"],
        "no-underscore-dangle" : "off",
        "global-require" : "off",
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
        "class-methods-use-this": "off",
    }
};
