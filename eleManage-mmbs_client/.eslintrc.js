module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true
    },
    extends: 'eslint:recommended',
    // required to lint *.vue files
    plugins: ['html'],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    rules: {
        // don't require .vue extension when importing
        // 'import/extensions': ['error', 'always', {
        //     'js': 'never',
        //     'vue': 'never'
        // }],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        /*
         * Possible Errors
         */

        // disallow unnecessary parentheses
        'no-extra-parens': ['error', 'all', { nestedBinaryExpressions: false }],

        // disallow negating the left operand of relational operators
        'no-unsafe-negation': 'error',

        // enforce valid JSDoc comments
        'valid-jsdoc': 'off',

        /*
         * Best Practices
         */

        // enforce return statements in callbacks of array methods
        'array-callback-return': 0,

        // enforce consistent brace style for all control statements
        curly: ['error', 'multi-line'],

        // enforce consistent newlines before and after dots
        'dot-location': ['error', 'property'],

        // enforce dot notation whenever possible
        'dot-notation': 'error',

        // require the use of === and !==
        //eqeqeq: ['error', 'smart'],

        // disallow the use of arguments.caller or arguments.callee
        'no-caller': 'error',

        // disallow empty functions
        'no-empty-function': 'error',

        // disallow unnecessary calls to .bind()
        'no-extra-bind': 'error',

        // disallow unnecessary labels
        // 不允许不必要的标签（无额外标签）
        'no-extra-label': 'error',

        // disallow leading or trailing decimal points in numeric literals
        // 不允许浮动小数（无浮点十进制）
        'no-floating-decimal': 'error',

        // disallow assignments to native objects or read-only global variables
        // 禁止分配给本地对象或只读全局变量（no-global-assign）
        'no-global-assign': 'error',

        // disallow the use of eval()-like methods
        // 不允许隐含eval（）（不隐含评估）
        'no-implied-eval': 'error',

        // disallow the use of the __iterator__ property
        // 禁止迭代器（无迭代器）
        'no-iterator': 'error',

        // disallow unnecessary nested blocks
        // 禁止不必要的嵌套块（无单块）
        'no-lone-blocks': 'error',

        // disallow multiple spaces
        // 禁止多个空格（无多空格）
        'no-multi-spaces': 'error',

        // disallow new operators with the String, Number, and Boolean objects
        // 不允许原始包装实例（无新包装）
        'no-new-wrappers': 'error',

        // disallow octal escape sequences in string literals
        // 禁止字符串文字中的八进制转义序列（no-octal-escape）
        'no-octal-escape': 'error',

        // disallow the use of the __proto__ property
        // 禁止使用__proto__（no-proto）
        'no-proto': 'error',

        // disallow comparisons where both sides are exactly the same
        // 不允许自我比较（不自我比较）
        'no-self-compare': 'error',

        // disallow throwing literals as exceptions
        // 限制可以抛出的异常（无乱文字）
        'no-throw-literal': 'error',

        // disallow unused expressions
        // 禁止未使用的表达式（不可用的表达式）
        'no-unused-expressions': 0,
        //禁止未使用的变量
        'no-unused-vars': 0,

        // disallow unnecessary calls to .call() and .apply()
        // 禁止不必要的.call()和.apply()。（没有无用的呼叫）
        'no-useless-call': 'error',

        // disallow unnecessary concatenation of literals or template literals
        // 不允许不必要的字符串串联（no-useless-concat）
        'no-useless-concat': 'error',

        // disallow unnecessary escape characters
        // 禁止不必要的转义使用（无用的转义）
        'no-useless-escape': 'error',

        // disallow void operators
        // 不允许使用void操作符。（无空隙）
        'no-void': 'error',

        // require parentheses around immediate function invocations
        // 要求IIFE包装（包装）
        'wrap-iife': 'error',

        // require or disallow “Yoda” conditions
        // 要求或不允许Yoda条件（yoda）
        yoda: 'error',

        /*
         * Variables(变量)
         */

        // disallow labels that share a name with a variable
        // 不允许使用变量名称的标签（no-label-var）
        'no-label-var': 'error',

        // disallow initializing variables to undefined
        // 不允许初始化为undefined（no-undef-init）
        'no-undef-init': 'error',
        // 禁止未声明的变量（no-undef）
        'no-undef': 'off',
        // disallow the use of variables before they are defined
        // 禁止早期使用（禁止使用之前定义）
        'no-use-before-define': 'error',

        /*
         * Node.js and CommonJS
         */

        // disallow new operators with calls to require
        // 不允许新的要求（无新要求）
        'no-new-require': 'error',

        /*
         * Stylistic Issues(风格问题)
         */

        // enforce consistent spacing inside array brackets
        // 禁止或强制使用括号内的空格（array-bracket-spacing）
        'array-bracket-spacing': 'error',

        // enforce consistent spacing inside single-line blocks
        // 禁止或强制打开块之后和关闭块之前的块内部空间（块间距）
        'block-spacing': 'error',

        // enforce consistent brace style for blocks
        // 要求括号样式（括号样式）
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],

        // require or disallow trailing commas
        // 需要或不允许尾随逗号（逗号）
        'comma-dangle': 'error',

        // enforce consistent spacing before and after commas
        // 强制逗号间隔（逗号间距）（默认）在逗号前不允许有空格 （默认）在逗号后需要一个或多个空格
        'comma-spacing': 'error',

        // enforce consistent comma style
        // 逗号样式（逗号式）
        'comma-style': 'error',

        // enforce consistent spacing inside computed property brackets
        // 禁止或强制执行计算属性内的空间（computed-property-spacing）
        'computed-property-spacing': 'error',

        // require or disallow spacing between function identifiers and their invocations
        // 要求或不允许函数标识符与其调用之间的间隔（func-call-spacing）
        'func-call-spacing': 'error',

        // enforce consistent indentation
        // 执行一致的缩进（缩进）
        indent: 0,

        // disallow mixed spaces and tabs for indentation (no-mixed-spaces-and-tabs)
        // 禁止使用 空格 和 tab 混合缩进 (no-mixed-spaces-and-tabs)
        // 大多数代码约定要求使用空格或 tab 进行缩进。因此，一行代码同时混有 tab 缩进和空格缩进，通常是错误的。
        // "smart-tabs" 当 tab 是为了对齐，允许混合使用空格和 tab。
        'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],

        // enforce the consistent use of either double or single quotes in JSX attributes
        // 强制在JSX属性（jsx-quotes）中一致使用双引号或单引号
        'jsx-quotes': 'error',

        // enforce consistent spacing between keys and values in object literal properties
        // 在对象字面量属性中实现键和值之间的一致间距（键间距）
        'key-spacing': 0,

        // enforce consistent spacing before and after keywords
        // 在关键字之前和之后执行一致的间距（keyword-spacing）
        'keyword-spacing': 'error',

        // enforce consistent linebreak style
        // 强制执行一致的换行样式（换行样式）
        'linebreak-style': 'off',

        // require or disallow newlines around directives
        // 要求或不允许围绕指令的换行符（lines-around-directive）
        'lines-around-directive': 'error',

        // require constructor names to begin with a capital letter
        // 要求构造函数名以大写字母（new-cap）开始
        'new-cap': 'off',

        // require parentheses when invoking a constructor with no arguments
        // 调用一个没有参数的构造函数时需要括号（new-parens）
        'new-parens': 'error',

        // disallow Array constructors
        // 禁止Array构造函数（无数组构造函数）
        'no-array-constructor': 'error',

        // disallow Object constructors
        // 禁止Object构造函数（no-new-object）
        'no-new-object': 'error',

        // disallow trailing whitespace at the end of lines
        // 不允许在行尾添加尾随空格（无尾空格）
        'no-trailing-spaces': 0,

        // disallow ternary operators when simpler alternatives exist
        // 当存在更简单的选择时不允许三元运算符（不需要 - 三元）
        'no-unneeded-ternary': 'error',

        // disallow whitespace before properties
        // 在属性之前禁止使用空白（no-whitespace-before-property）
        'no-whitespace-before-property': 'error',

        // enforce consistent spacing inside braces
        // 在大括号内强制执行一致的间距（object-curly-spacing）
        'object-curly-spacing': ['error', 'always'],

        // require or disallow padding within blocks
        // 要求或不允许填充块（填充块）
        'padded-blocks': ['error', 'never'],

        // require quotes around object literal property names
        // 需要引用对象字面值属性名称（quote-props）
        'quote-props': ['error', 'as-needed'],

        // enforce the consistent use of either backticks, double, or single quotes
        // 强制一致使用反引号，双引号或单引号（引号）
        quotes: ['error', 'single'],

        // enforce consistent spacing before and after semicolons
        // 分号前后间隔（半间距）
        'semi-spacing': 'error',

        // require or disallow semicolons instead of ASI
        // 要求或不允许使用分号代替ASI（半）
        // semi: ['error', 'never'],

        // enforce consistent spacing before blocks
        // 在块之前需要或不允许空间（块之前空间）
        'space-before-blocks': 'error',

        // 禁止使用console（无控制台）
        'no-console': 'off',

        // enforce consistent spacing before function definition opening parenthesis
        // 在函数括号之前需要或不允许有空格（空格之前的函数）
        'space-before-function-paren': ['error', 'never'],

        // enforce consistent spacing inside parentheses
        // 禁止或强制执行括号内的空格（空格键）
        'space-in-parens': 'error',

        // require spacing around infix operators
        // 需要中缀运算符（space-infix-ops）
        'space-infix-ops': 'error',

        // enforce consistent spacing before or after unary operators
        // 一元运算符（space-unary-ops）之前/之后需要或不允许空格
        'space-unary-ops': 'error',

        // enforce consistent spacing after the // or /* in a comment
        // 需要或不允许开始评论的空格（空格或制表符）（空格或注释）
        'spaced-comment': 'off',

        // require or disallow Unicode byte order mark (BOM)
        // 需要或不允许Unicode字节顺序标记（BOM）（unicode-bom）
        'unicode-bom': 'error',

        /*
         * ECMAScript 6
         */

        // require braces around arrow function bodies
        // 在箭头函数体中需要大括号（箭头体风格）
        // 'arrow-body-style': ["error", "as-needed", { "requireReturnForObjectLiteral": true }],

        // require parentheses around arrow function arguments
        // 在箭头函数参数（arrow-parens）中需要parens
        'arrow-parens': ['error', 'as-needed'],

        // enforce consistent spacing before and after the arrow in arrow functions
        // 在箭头函数的箭头之前/之后需要空间（箭头间距）
        'arrow-spacing': 'error',

        // enforce consistent spacing around * operators in generator functions
        // 在生成器函数（发生器 - 星号 - 间距）周围强制执行*
        'generator-star-spacing': ['error', 'after'],

        // disallow duplicate module imports
        // 禁止重复导入（不重复导入）
        'no-duplicate-imports': 'error',

        // disallow unnecessary computed property keys in object literals
        // 不允许在对象上使用不必要的计算属性密钥（no-useless-computed-key）
        'no-useless-computed-key': 'error',

        // disallow unnecessary constructors
        // 禁止不必要的构造函数（no-useless-constructor）
        'no-useless-constructor': 'error',

        // disallow renaming import, export, and destructured assignments to the same name
        // 禁止将导入，导出和解构的赋值重命名为相同的名称（无用 - 重命名）
        'no-useless-rename': 'error',

        // require let or const instead of var
        // 要求let或const代替var（no-var）
        'no-var': 'error',

        // require or disallow method and property shorthand syntax for object literals
        // 要求对象字面量简写语法(object - shorthand)
        'object-shorthand': ['error'],

        // require arrow functions as callbacks
        // 需要对象文字速记语法（对象简写）
        'prefer-arrow-callback': 'error',

        // require const declarations for variables that are never reassigned after declared
        // 建议使用const（prefer-const）
        'prefer-const': 0,

        // disallow parseInt() in favor of binary, octal, and hexadecimal literals
        // 禁止parseInt()和Number.parseInt()支持二进制，八进制，和十六进制文字的（更喜欢数字，文字）
        'prefer-numeric-literals': 'error',

        // require rest parameters instead of arguments
        // 建议使用其余参数而不是arguments（prefer-rest-params）
        'prefer-rest-params': 0,

        // require spread operators instead of .apply()
        // 建议使用传播运算符而不是.apply()。（喜欢扩）
        'prefer-spread': 'error',

        // enforce spacing between rest and spread operators and their expressions
        // 强化休息和传播运算符及其表达式之间的间隔（休息 - 传播 - 间隔）
        'rest-spread-spacing': 'error',

        // require or disallow spacing around embedded expressions of template strings
        // 在模板字符串中强制使用间距（模板卷曲间距）
        'template-curly-spacing': 'error',

        // require or disallow spacing around the * in yield* expressions
        // *在yield*表达式周围加强间距（yield-star-spacing）
        'yield-star-spacing': 'error',

        //调用一个没有参数的构造函数时需要括号（new-parens）XXXXX
        'new-parens': 0
    }
};