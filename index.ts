'use strict';

const { MultiSelect } = require('enquirer');
const { prompt } = require('enquirer');
const lark = require('@larksuiteoapi/node-sdk');

const client = new lark.Client({});

(async () => {
    const { uat } = await prompt({
        type: 'text',
        name: 'uat',
        message: '请输入你的 UAT'
    });

    const { open_id } = await prompt({
        type: 'text',
        name: 'open_id',
        message: '请输入你的 OpenID'
    });

    for await (const item of await client.im.chat.listWithIterator({
        params: {
            user_id_type: 'open_id',
            sort_type: 'ByActiveTimeDesc',
            page_size: 100,
        },
    },
        lark.withUserAccessToken(uat)
    )) {

        let choices = item.items.map(item => {
            return {
                name: item.name,
                value: item.chat_id
            }
        })

        if (choices.length > 0) {
            const prompt2 = new MultiSelect({
                name: 'value',
                message: '选择你要退出的群',
                choices: choices,
                result(groups) {
                    return this.map(groups);
                }
            });

            let res = await prompt2.run()
            const chat_ids = Object.entries(res).map(([name, id]) => ({ name, id }));

            for (const chat_id of chat_ids) {
               try {
                 res = await client.im.chatMembers.delete({
                     path: {
                         chat_id: chat_id.id,
                     },
                     params: {
                         member_id_type: 'open_id',
                     },
                     data: {
                         id_list: [open_id],
                     },
                 },
                     lark.withUserAccessToken(uat)
                 )
                 console.log(`退出群 ${chat_id.name} 成功`)
               } catch (error) {
                 console.error(`退出群 ${chat_id.name} 失败`)
               }
            }
        }

    }
})();