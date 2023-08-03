// ==UserScript==
// @name         x-killled-the-blue-bird
// @namespace    hatopop_x
// @version      0.0.1
// @description  change keyword to X
// @author       hatopopvr
// @match        https://twitter.com/*
// @icon         https://twitter.com/favicon.ico
// @updateURL    https://raw.githubusercontent.com/hatopopvr/x-killed-the-blue-bird/master/x-killed-the-blue-bird.user.js
// @downloadURL  https://raw.githubusercontent.com/hatopopvr/x-killed-the-blue-bird/master/x-killed-the-blue-bird.user.js
// @supportURL   https://github.com/hatopopvr/x-killed-the-blue-bird/issues
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 初回待機時間 1000 -> 1秒
    var replace_timer = 1500;

    // 定期置換する時間 5000 -> 5秒
    var replace_interval = 30000;

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

    function replaceAllKeywords() {
        walkTheDOM(document.body, function(node) {
            if (node.nodeType === 3) { // テキストノードの場合
                replaceKeywordsInTextNode(node);
            }
        });
    }
    
    function scheduleReplacement(initialDelay, interval) {
        // 初回の遅延
        setTimeout(function() {
            replaceAllKeywords();
    
            // その後の定期実行
            setInterval(function() {
                replaceAllKeywords();
            }, interval);
        }, initialDelay);
    }
    
    window.onload = function() {
        scheduleReplacement(replace_timer, replace_interval);
    };

    window.addEventListener('popstate', function() {
        scheduleReplacement(replace_timer, replace_interval);
    });
    
})();    