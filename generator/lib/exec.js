// @ts-check

import pty  from 'node-pty';
import ansiHTML from 'ansi-html'

// import Convert  from '@orta/ansi-to-html'
//  const convert = new Convert({ 
//    fg: 'feffff',  
//    bg: '040404', 
//    space: true,
//    colors: [
//     "#040404",
//     "#d84a33",
//     "#5da602",
//     "#eebb6e",
//     "#417ab3",
//     "#e5c499",
//     "#bdcfe5",
//     "#dbded8",
//     "#685656",
//     "#d76b42",
//     "#99b52c",
//     "#ffb670",
//     "#97d7ef",
//     "#aa7900",
//     "#bdcfe5",
//     "#e4d5c7",
//    ]
// });

/**
 * @param cmd string
 * @param args string[]
 * @param opts {import("node-pty").IPtyForkOptions}
 */
export function execToHTML (cmd, args, opts) {
  return new Promise((done) => {
    /** @type {import("node-pty").IPtyForkOptions)} */
    const spawnOpts = {
      ...opts,
      cols: 90
    }
    const run = pty.spawn(cmd, args, spawnOpts)
    let ansi = ""

    run.onData(function (data) {
      const elmMessages = ["Compiling ...", "Verifying dependencies", "Dependencies ready", "Detected problems in"]
      const tscMessages = ["yarn run v", "[2K[2K[1G"]
      const skipIncludes = [...elmMessages, ...tscMessages]
      const included = skipIncludes.find(si => data.includes(si))
      if (!included) {
        ansi += data
      }
    });

    run.onExit(() => {
      const encoded = ansi.replace(/</g, "&lt;").replace(/>/g, "&gt;")
      
      ansiHTML.setColors({
        reset: ['feffff', '040404'],
        black: '040404',	// String
        red: 'd76b42',
        green: '99b52c',
        yellow: 'ffb670',
        blue: '417ab3',
        magenta: 'aa7900',
        cyan: 'bdcfe5',
        lightgrey: '888',
        darkgrey: '777'
      });
      const html = ansiHTML(encoded)

      
      // const html = convert.toHtml(encoded)
      
      // console.log({ html, ansi })
      done(html)
    })
  })

}
