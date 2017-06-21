# CLI Countdown

A simple countdown inside your favorite CLI, written with [Node.js](https://nodejs.org/).

<br><br>

## Table of contents

-   [Installing](#installing)
-   [Using](#using)
-   [Feedback](#feedback)
-   [License](#license)

<br><br>

## Installing

Before running the countdown, you must have [Node.js](https://nodejs.org/) installed in your machine. After that, open the `cli-countdown` project folder in a command line tool, and execute:

```bash
$ npm install
```

This will download all the needed dependencies.

## Using

If you are on Windows, simply run the `countdown.cmd` file by double clicking it.
If your system doesn't support `.cmd` files, open the `cli-countdown` project folder in a command line tool, and execute the following:

```bash
$ npm start
```

When the application starts, just type:

```bash
> 10s
```

And it will start a `10 seconds` countdown.

The input format must follow this rule:

```text
##h##m##s
```

Where `#` represents a positive integer, and `h`, `m`, `s` stands for `hours`, `minutes` and `seconds` respectively.

<br><br>

## Feedback

If you want a feature to be added or give some other feedback, feel free to open an [issue](https://github.com/Potentii/cli-countdown/issues).

<br><br>

## License
[MIT](LICENSE.txt)
