const Discord = require('discord.js'),
    hastebin = require('hastebin-gen'),
    ms = require('ms'),
    mss = require('parse-ms'),
    db = require('quick.db')
const os = require('os');
const {
    escapeMarkdown
} = require('discord.js')
const {
    oneLine
} = require('common-tags')
const util = require('util')
const apis = require('../data/apis.json');
const snekfetch = require('snekfetch');
const get = require('snekfetch');
exports.run = async (bot, message, args, queue) => {

    var embed = new Discord.MessageEmbed()
        .setTitle("Restricted")
        .setColor("#f45f42")
        .addField("<:error:401869378506719233> Access Denied", "Este comando es solo para dueños del BOT!")

    const clean = text => {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }

    var authors = ["322203879208910849", "324411190396715010", "266063988209483790"];
    if (!authors.includes(message.author.id)) {
        message.channel.send({
            embed: embed
        });
        return;
    }

    if (!args.join(' ')) {
        message.channel.send("What do you want me to evaluate? Ex. `H!eval \"yeet\".toString()`");
        return;
    }
    const msg = message
    const channel = message.channel
    const guild = message.guild
    const client = message.client
    const lastResult = client.lastResult
    const me = message.author
    /* eslint-enable no-unused-vars */

    // Silent Eval
    var code = args.join(' ')
    if (code.split(' ')[0] === '--silent' || code.split(' ')[0] === '-s') {
        try {
            await eval(code.substr(code.indexOf(' ') + 1)) // eslint-disable-line no-eval
        } catch (error) {
            await message.channel.send({
                content: `${error.name}: ${error.message}`,
                code: 'js'
            })
        }
        return
    }

    // Normal Eval
    var evalTime;
    var hrEnd
    try {
        /* Start Eval Block */
        var hrStart = await process.hrtime(this.hrStart)
        var result = await eval(code) // eslint-disable-line no-eval
        hrEnd = await process.hrtime(hrStart)
        evalTime = hrEnd
        /* End Eval Block */

        var type
        if (typeof result === 'object') {
            type = `object - ${result.constructor.name}`
        } else if (typeof result === 'function') {
            type = oneLine `
          function
          ${result.name || result.length ? '-' : ''}
          ${result.name ? `Name: ${result.name}` : ''}
          ${result.name && result.length ? `|` : ''}
          ${result.length ? `#Args: ${result.length}` : ''}
        `
            result = result.toString()
        } else {
            type = typeof result
        }
        if (typeof(result) !== 'string') {
            result = util.inspect(result, {
                showHidden: true,
                compact: false,
                depth: 0
            })
        }

        this.lastResult = result
        // Evaluation Success 1024
        if (result.length > 1024 || code.length > 1024) {
            hastebin(`Output: \n\n${result}`, "js").then(r => {
                message.channel.send({
                    embed: {
                        author: {
                            name: client.user.tag,
                            icon_url: client.user.displayAvatarURL()
                        },
                        footer: {
                            text: message.author.tag,
                            icon_url: message.author.displayAvatarURL()
                        },
                        timestamp: new Date(),
                        description: `*Evaluated in ${evalTime[0] > 0 ? `${evalTime[0]}s ` : ''}${evalTime[1] / 1000000}ms.*`,
                        fields: [{
                                'name': 'Evaluated',
                                'value': '```js\n' + escapeMarkdown(code, true) + '\n```',
                                'inline': false
                            },
                            {
                                'name': 'Result',
                                'value': `[\`${r}\`](${r})`,
                                'inline': false
                            },
                            {
                                'name': 'Type',
                                'value': '```js\n' + escapeMarkdown(type, true) + '\n```',
                                'inline': false
                            }
                        ],
                        color: 0x36393e
                    }
                })
            })
        } else {
            // Evaluation Success
            message.channel.send({
                embed: {
                    author: {
                        name: client.user.tag,
                        icon_url: client.user.displayAvatarURL()
                    },
                    footer: {
                        text: message.author.tag,
                        icon_url: message.author.displayAvatarURL()
                    },
                    timestamp: new Date(),
                    description: `*Evaluated in ${evalTime[0] > 0 ? `${evalTime[0]}s ` : ''}${evalTime[1] / 1000000}ms.*`,
                    fields: [{
                            'name': 'Evaluated',
                            'value': '```js\n' + escapeMarkdown(code, true) + '\n```',
                            'inline': false
                        },
                        {
                            'name': 'Result',
                            'value': ('```js\n' + escapeMarkdown(result.toString(), true) + '\n```').replace(client.token, '[TOKEN]'),
                            'inline': false
                        },
                        {
                            'name': 'Type',
                            'value': '```js\n' + escapeMarkdown(type, true) + '\n```',
                            'inline': false
                        }
                    ],
                    color: 0x36393e
                }
            }).catch(error => {
                message.reply(`there was an error when sending a message:\n\`${escapeMarkdown(error.toString(), true)}\``)
            })
        }
    } catch (error) {
        hrEnd = await process.hrtime(hrStart)
        evalTime = hrEnd

        // Evaluation Error
        hastebin(error.stack, "js").then(r => {
            message.channel.send({
                embed: {
                    author: {
                        name: client.user.tag,
                        icon_url: client.user.displayAvatarURL()
                    },
                    footer: {
                        text: message.author.tag,
                        icon_url: message.author.displayAvatarURL()
                    },
                    timestamp: new Date(),
                    description: `*Evaluated in ${evalTime[0] > 0 ? `${evalTime[0]}s ` : ''}${evalTime[1] / 1000000}ms.*`,
                    fields: [{
                            'name': 'Evaluated',
                            'value': '```js\n' + escapeMarkdown(code, true) + '\n```',
                            'inline': false
                        },
                        {
                            'name': 'Exception',
                            'value': `[\`\`\`js\n${escapeMarkdown(`${error.name}: ${error.message}`, true)}\n\`\`\`](${r})`,
                            'inline': false
                        }
                    ],
                    color: 0x36393e
                }
            }).catch(error => {
                message.reply(`there was an error when sending a message:\n\`${escapeMarkdown(error.toString(), true)}\``)
            })
        })
    }
}
exports.config = {
    command: "eval",
    aliases: ["evaluar", "ev"],
    category: "dev",
    description: "Evalua un codijo de JS",
    usage: "Yu!eval [...code]"
};