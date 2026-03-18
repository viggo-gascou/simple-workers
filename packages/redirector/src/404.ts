export const html = `<!doctype html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>404 - Page Not Found</title>
<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

    html,
    body {
        font-family: 'Roboto Mono', monospace;
        margin: 0;
        padding: 0;
        height: 100%;
        background: #000;
        color: #fff;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footer {
        position: absolute;
        bottom: 1rem;
    }
    .content {
        font-size: clamp(18px, 4vw, 24px);
    }

    .footer-typewriter {
        color: #666;
        width: 0;
        overflow: hidden;
        white-space: nowrap;
        letter-spacing: 0.1em;
        font-size: clamp(10px, 2.5vw, 14px);
        animation: typing 0.5s steps(20, end) 1.5s forwards;
    }
    .typewriter {
        font-size: clamp(18px, 4vw, 24px);
        overflow: hidden;
        border-right: 15px solid #ffe500;
        white-space: nowrap;
        letter-spacing: 0.1em;
        animation:
            typing 1.5s steps(20, end),
            blink-caret 1.2s step-end infinite 1.5s;
    }
    @keyframes typing {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }
    @keyframes blink-caret {
        from,
        to {
            border-color: transparent;
        }
        50% {
            border-color: #ffe500;
        }
    }
    /* Light mode styles */
    @media (prefers-color-scheme: light) {
        html,
        body {
            background: #fff;
            color: #111;
        }
        .footer-typewriter {
            color: #aaa;
        }
    }

    /* Dark mode styles */
    @media (prefers-color-scheme: dark) {
        html,
        body {
            background: #000;
            color: #fff;
        }
        .footer-typewriter {
            color: #666;
        }
    }
</style>
</head>
<body>
    <div class="typewriter">404 - Page Not Found</div>
    <div class="footer">
        <div class="footer-typewriter">&copy; vgascou.co - {YEAR}</div>
    </div>
</body>`;
