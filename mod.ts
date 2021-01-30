"use strict";

import { parse } from "https://deno.land/std@0.85.0/flags/fs/mod.ts";
import * as Colours from "https://deno.land/std@0.85.0/fmt/fmt/colors.ts";
import { sep } from "https://deno.land/std@0.85.0/path/mod.ts"; // use the right path separator depending on the platform ran on

let verbose = false;
export function info(stringToPrint: string) { verbose ? console.info(Colours.cyan("[Info] ") + stringToPrint) : () => { } }
export function error(stringToPrint: string) { verbose ? console.error(Colours.brightRed(`[Error] ${stringToPrint}`)) : () => { } }

// Parse the CLI args
const args = parse(Deno.args);

console.log("Forge Installer Moderniser v0.1");
console.log("-------------------------------");

if (Deno.args.length === 0 || args.h || args.help) {
    const helpText = [
        "-i, --input       Forge installer jar to modernise",
        "-o, --output      Desired path of outputted modernised jar",
        "-h, --help        Prints this help info",
        "-v, --version     Prints the version of this tool",
        "-V, --verbose     Prints progress details and error help",
        "",
        "Examples:",
        `"-i legacy-forge-installer.jar -o new-forge-installer.jar -V"`,
        `"--input legacy-forge-installer.jar --output new-forge-installer.jar --verbose"`,
        "",
        "Exit codes:",
        "0 - OK",
        "1 - Missing required arg(s)",
        "2 - Patching error",
        "",
        "This utility requires the following Deno permissions: --allow-read --allow-write --allow-run",
        `Tip: Use the "NO_COLOR" environment variable if you want to disable colours.`,
        "",
    ];
    helpText.forEach(line => { line.endsWith(":") ? console.log(Colours.underline(line)) : console.log(line); });
    Deno.exit();
}

if (!args.i && !args.input) {
    error("Missing an input, please specify an -i or --input argument.");
    Deno.exit(1);
} else if (!args.o && !args.output) {
    error("Missing an output, please specify an -o or --output argument.");
    Deno.exit(1);
} else if (args.v || args.version) {
    console.log("v0.1");
    Deno.exit();
} else if (args.V || args.verbose) {
    verbose = true;
}

// If we got to this point, -v/--version or -h/--help weren't specified

const input = args.i || args.input;
const output = args.o || args.output;