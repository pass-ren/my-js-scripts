const e = "【可点击的选择框】",
    t = /<checkbox>\s*```[\s\S]*?\n([\s\S]*?)\n\s*```\s*<\/checkbox>/i;
var a, n;

async function o(e) {
    const a = getChatMessages(e)[0].message.match(t);
    if (!a) return;
    const o = n.extract_checkbox_element(a[1]),
        r = retrieveDisplayedMessage(e),
        s = r.find('.roleplay_checkbox, pre:contains("<Checkbox>")');
    s.length > 0 && (s.remove(), r.append(o))
}

async function r() {
    $("#chat").children(".mes[is_user='false'][is_system='false']").each(((e, t) => {
        o(Number(t.getAttribute("mesid")))
    }))
}

function s() {
    const e = $('.mes[is_user="false"][is_system="false"]').last().find(".roleplay_checkbox_content").map(((e, t) => $(t).text().trim())).toArray();
    triggerSlash(`/send ${0===e.length?"继续推进":_.sample(e)} || /trigger`)
}! function(t) {
    const a = {
        input_mode: "直接发送"
    };
    t.update = async function() {
        const n = t.option;
        return t.option = await async function() {
            const t = _.merge({}, ...(await getLorebookEntries(e)).filter((e => e.comment.startsWith("设置-") && e.enabled)).map((e => {
                const t = e.comment.replace("设置-", "");
                return {
                    [t]: e.content
                }
            })));
            let n = a;
            return _.has(t, "直接发送") ? n.input_mode = "直接发送" : _.has(t, "覆盖输入") ? n.input_mode = "覆盖输入" : _.has(t, "尾附输入") && (n.input_mode = "尾附输入"), n
        }(), !_.isEqual(t.option, n)
    }
}(a || (a = {})),
function(t) {
    let n;
    t.update = async function() {
        const t = n;
        return n = await async function() {
            const t = (await getLorebookEntries(e)).filter((e => e.comment.startsWith("样式-") && e.enabled));
            return 0 === t.length ? '<style>.roleplay_checkbox_back{background:linear-gradient(160deg, rgba(45, 45, 45, 0.75), rgba(35, 35, 35, 0.85));border-radius:14px;box-shadow:0 10px 28px rgba(0,0,0,.15),0 3px 10px rgba(0,0,0,.12);padding:16px 18px;display:flex;flex-direction:column;gap:10px;border:1px solid hsla(0,0%,100%,.06);max-width:100%;margin:20px 0}.roleplay_checkbox_title{font-size:.94em;font-weight:600;color:#f0f0f0;padding-right:12px;letter-spacing:.02em;text-align:left;margin-bottom:4px}.roleplay_checkbox_content{font-size:.94em;line-height:1.55;color:#c6c6c6;font-weight:normal;transition:color .25s ease;text-align:left;flex:1;letter-spacing:.015em;overflow-wrap:anywhere}.roleplay_checkbox_content:not(:empty):not(.short-content)~.roleplay_checkbox_title{width:100%;margin-bottom:8px;border-bottom:1px solid hsla(0,0%,100%,.08);padding-bottom:6px}.roleplay_checkbox_content.short-content{flex:1}.roleplay_checkbox_hr{display:none}.roleplay_checkbox_item{position:relative;background:rgba(50,50,50,.65);border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,.1);padding:14px 16px;cursor:default;border:1px solid hsla(0,0%,100%,.04);transition:all .25s cubic-bezier(0.25, 0.8, 0.25, 1);overflow:hidden;display:flex;flex-wrap:wrap;align-items:flex-start;z-index:1;margin:2px 0;color:#d8d8d8;font-weight:400;line-height:1.5}.roleplay_checkbox_item::after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, rgba(90, 90, 90, 0.06) 0%, transparent 70%);opacity:0;transition:opacity .3s ease;z-index:-1}.roleplay_checkbox_item:before{content:"";position:absolute;top:0;left:0;width:3px;height:100%;background:linear-gradient(to bottom, rgba(160, 160, 160, 0.6), rgba(180, 180, 180, 0.3));transform:scaleY(0);transform-origin:top;transition:transform .3s cubic-bezier(0.4, 0, 0.2, 1)}.last_mes .roleplay_checkbox_item{cursor:pointer}.last_mes .roleplay_checkbox_item:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.15);background:rgba(58,58,58,.75);border-color:rgba(200,200,200,.12)}.last_mes .roleplay_checkbox_item:hover::after{opacity:1}.last_mes .roleplay_checkbox_item:hover .roleplay_checkbox_content{color:#e2e2e2}.last_mes .roleplay_checkbox_item:active{transform:translateY(-1px);box-shadow:0 3px 8px rgba(0,0,0,.12)}.last_mes .roleplay_checkbox_item:hover:before{transform:scaleY(1)}@media(max-width: 768px){.roleplay_checkbox_back{padding:14px;gap:8px}.roleplay_checkbox_item{padding:12px 14px}.roleplay_checkbox_title{font-size:.9em;padding-right:10px}.roleplay_checkbox_content{font-size:.9em;line-height:1.5}}@media(prefers-reduced-motion: reduce){.roleplay_checkbox_item{transition:none}.roleplay_checkbox_item::before,.roleplay_checkbox_item::after{transition:none}.roleplay_checkbox_content,.roleplay_checkbox_title{transition:none}}</style>' : t[0].content
        }(), !_.isEqual(n, t)
    }, t.extract_checkbox_element = function(e) {
        const t = $('<div class="roleplay_checkbox">');
        return t.append(n), t.append($('<div class="roleplay_checkbox_back">').append([...e.matchAll(/(.+?)[:：]\s*(.+)/gm)].map((e => ({
            title: e[1],
            content: e[2].replace(/^\$\{(.+)\}$/, "$1").replace(/^「(.+)」$/, "$1")
        }))).map((({
            title: e,
            content: t
        }) => $('<div class="roleplay_checkbox_item" tabindex="1">').on("click", (function() {
            ! async function(e) {
                if (e.parents(".last_mes").length > 0) {
                    const t = e.find(".roleplay_checkbox_content").text().trim();
                    if ("直接发送" === a.option.input_mode) triggerSlash(`/send ${t} || /trigger`);
                    else if ("覆盖输入" === a.option.input_mode) triggerSlash(`/setinput ${t}`);
                    else if ("尾附输入" === a.option.input_mode) {
                        const e = $("#send_textarea").val();
                        $("#send_textarea").val([e, t].join("\n") || "")[0].dispatchEvent(new Event("input", {
                            bubbles: !0
                        }))
                    }
                }
            }($(this))
        })).append(`<span class="roleplay_checkbox_title"><strong>${e}</strong></span>`).append('<hr class="roleplay_checkbox_hr">').append(`<span class="roleplay_checkbox_content">${t}</span>`))))), t
    }
}(n || (n = {})), $((async() => {
    await errorCatched(a.update)(), await errorCatched(n.update)(), await r(), eventOn(tavern_events.CHAT_CHANGED, errorCatched(r)), eventOn(tavern_events.CHARACTER_MESSAGE_RENDERED, errorCatched(o)), eventOn(tavern_events.MESSAGE_UPDATED, errorCatched(o)), eventOn(tavern_events.MESSAGE_SWIPED, errorCatched(o)), eventOn(tavern_events.MESSAGE_DELETED, (() => setTimeout(errorCatched(r), 1e3))), eventOn(tavern_events.WORLDINFO_UPDATED, errorCatched((async t => {
        t === e && (await a.update() || await n.update()) && await r()
    })))
}));
let l = null;

function c() {
    null !== l && (setTimeout(s, _.get(getVariables({
        type: "global"
    }), [e, "自动推进发送间隔"], 3e3)), ++l, l === _.get(getVariables({
        type: "global"
    }), [e, "自动推进循环次数"], -1) && i())
}

function i() {
    eventRemoveListener(tavern_events.CHARACTER_MESSAGE_RENDERED, c), l = null, toastr.success("已停止自动推进", e)
}
$((async() => {
    eventOnButton("设置循环次数", (async() => {
        const t = Number(await SillyTavern.callGenericPopup("设置循环次数 (-1 为直到按下 '停止自动推进')", SillyTavern.POPUP_TYPE.INPUT, _.get(getVariables({
            type: "global"
        }), [e, "自动推进循环次数"], "-1")));
        -1 !== t && t <= 0 ? toastr.error("循环次数要么是 -1, 要么是大于 0 的整数") : (insertOrAssignVariables({
            [e]: {
                自动推进循环次数: t
            }
        }, {
            type: "global"
        }), -1 === t ? toastr.success('已设置推进次数为 -1, 即直到按下 "停止自动推进" 才会停止', e) : toastr.success(`已设置推进次数为 ${t} 次`, e))
    })), eventOnButton("设置发送间隔", (async() => {
        const t = Number(await SillyTavern.callGenericPopup("设置发送间隔 (单位: 毫秒)", SillyTavern.POPUP_TYPE.INPUT, _.get(getVariables({
            type: "global"
        }), [e, "自动推进发送间隔"], "3000")));
        t <= 0 ? toastr.error("发送间隔必须大于 0") : (insertOrAssignVariables({
            [e]: {
                自动推进发送间隔: t
            }
        }, {
            type: "global"
        }), toastr.success(`已设置发送间隔为 ${t} 毫秒`, e))
    })), eventOnButton("启动自动推进", (() => {
        null === l ? (l = 0, c(), eventOn(tavern_events.CHARACTER_MESSAGE_RENDERED, c), toastr.success("已开启自动推进", e)) : toastr.error("自动推进在之前已开启, 请先停止自动推进")
    })), eventOnButton("停止自动推进", i)
}));
