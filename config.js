module.exports = {
  prefix: "m/",
  token: process.env['TOKEN'],
  embedcolor: "#303237",
  avatar: 'https://cdn.discordapp.com/attachments/924403120098934835/946911027197538344/PicsArt_02-25-04.26.06.png',
  beta: true,
  mongodb: process.env['MongoDB'],
  opt: {
    maxVol: 100,
    loopMessage: false,
    discordPlayer: {
      ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
      }
    }
  }
}