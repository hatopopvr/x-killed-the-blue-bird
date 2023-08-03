// ==UserScript==
// @name         XKilledTheBlueBird
// @namespace    hatopop_x
// @version      0.0.1
// @description  十字の象徴よ！青き鳥を駆逐しその身に刻め！おさらバード！(ネタツールです。Twitterの表示を変えるだけです。)
// @author       hatopopvr
// @match        https://twitter.com/*
// @icon         https://twitter.com/favicon.ico
// @updateURL    https://github.com/hatopopvr/x-killed-the-blue-bird/raw/master/x-killed-the-blue-bird.user.js
// @downloadURL  https://github.com/hatopopvr/x-killed-the-blue-bird/raw/master/x-killed-the-blue-bird.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 置換する項目
    var replace_dictionary = {
        'リツイート': 'ReX',
        'ツイート': 'X',
        '投稿': 'X',
        'ホーム': 'X',
        '認証': 'X',
        'サブスクライブ': 'X',
        'アカウント': 'X',
        '話題': 'X',
        'おすすめ': 'X',
        'フォロー': 'Xing',
        'フォロワー': 'Xer',
        '通知': 'Xed',
        'メッセージ': 'ToX',
        'リスト': 'Xs',
        'ブックマーク': 'Xマーク',
        'プロフィール': 'Xファイル',
        'もっと見る': 'もっとX',
        '返信': 'Xly',
        'reply': 'Xly',
        'Post': 'X',
        'いまどうしてる？': 'Xする？',
        'ユーザー': 'Xer',
        'ログアウト': 'Xout',
        // ここに追加したいキーワードを書くのよ
    };

    function replaceKeywordsInTextNode(node) {
        var keys = Object.keys(replace_dictionary);
        for (var i = 0; i < keys.length; i++) {
            var regex = new RegExp(keys[i], 'g');
            node.textContent = node.textContent.replace(regex, replace_dictionary[keys[i]]);
        }
    }

    function walkTheDOM(node, func) {
        func(node);
        node = node.firstChild;
        while (node) {
            walkTheDOM(node, func);
            node = node.nextSibling;
        }
    }   

    function observeChanges() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 3) {
                        replaceKeywordsInTextNode(node);
                    } else if (node.childNodes && node.childNodes.length) {
                        node.childNodes.forEach(function(child) {
                            if (child.nodeType === 3) {
                                replaceKeywordsInTextNode(child);
                            }
                        });
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    window.onload = function() {
        setTimeout(function() {
            walkTheDOM(document.body, function(node) {
                if (node.nodeType === 3) { // テキストノードの場合
                    replaceKeywordsInTextNode(node);
                }
            });
            observeChanges();
        }, 1000); // ここで1000ミリ秒（1秒）待つように設定しているわ
    };
})();