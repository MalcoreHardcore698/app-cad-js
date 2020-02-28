
class CE_CSS {
    constructor() {
      const head = document.querySelector(`head`)
      const style = document.createElement('style')
      const css = `
          :root {
            --accent: #0070bf;
            --gray: #999
          }
  
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
            font-size: 16px;
          }
  
          #constructor {
            position: relative;
            margin: 25px;
            width: 100%;
            height: calc(100vmin - 50px);
            font-size: 14px;
            overflow: hidden;
            background: var(--accent);
            border-radius: 5px;
            overflow: hidden;
          }
  
          #container {
            width: 100%;
            height: 100%;
          }
  
          .menu {
            z-index: 1000;
          }
  
          main {
            margin-bottom: 90px;
          }
  
          footer.page-footer {
            bottom: -90px;
          }
  
          #container, body, ul, ul li {
            margin: 0;
            padding: 0
          }
  
          #load-blueprint {
            transform: rotate(180deg)
          }
  
          #line-tool img {
            transform: rotate(-45deg)
          }
  
          .btn {
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            outline: none;
            background: #fff;
            border-radius: 5px;
            margin: 5px;
            cursor: pointer;
            color: #072850;
            opacity: .75;
            transition: all .3s ease
          }
  
            .btn-indicator, .btn:hover {
                opacity: 1
            }
  
            .btn img {
                position: relative;
                width: 16px;
                height: 16px;
                object-fit: contain
            }
  
          .btn-accent {
            width: 38px;
            height: 38px
          }
  
          .btn-indicator {
            width: min-content;
            padding: 0 15px;
            white-space: nowrap
          }
  
            .btn-indicator img {
                margin-right: 10px
            }
  
            .btn-indicator span {
                opacity: .45;
                color: var(--accent);
                transition: all .3s ease;
            }
  
          .btn-indicator:hover span {
            opacity: 1;
          }
  
          .form-group {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px
          }
  
            .form-group input.setting {
                color: #072850;
                transition: all .3s ease;
                box-shadow: 0 0 75px 0 rgba(41,46,56,.25)
            }
  
            .form-group .setting {
                border: none;
                background: #fff;
                border-radius: 5px;
                height: 38px;
                margin: 5px;
                padding: 0 15px
            }
  
            .form-group button.setting {
                cursor: pointer;
                color: var(--accent);
                transition: all .3s ease
            }
  
                .form-group button.setting span {
                    opacity: .45;
                    transition: all .3s ease
                }
  
            .form-group input.setting::placeholder {
                color: var(--accent);
                opacity: .45;
                transition: all .3s ease
            }
  
            .form-group input.setting:hover::placeholder {
                opacity: 1
            }
  
            .form-group input.setting::placeholder:focus {
                opacity: 0
            }
  
            .form-group input::-webkit-inner-spin-button, .form-group input::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0
            }
  
            .form-group input[type=number] {
                -moz-appearance: textfield
            }
  
            .form-group button.setting:hover span {
                opacity: 1
            }
  
          .hide {
            display: none;
            opacity: 0
          }
  
          .show {
            display: flex;
            opacity: 1
          }
  
          #shape-context, #shape-tooltip {
            display: none;
            position: absolute;
            z-index: 800;
            width: 220px;
            background-color: #fff;
            box-shadow: 0 0 75px 0 rgba(41,46,56,.15);
            border-radius: 5px;
            overflow: hidden
          }
  
            #shape-context button {
                width: 100%;
                background-color: #fff;
                border: none;
                margin: 0;
                padding: 8px 15px;
                text-align: left;
                outline: none
            }
  
                #shape-context button span, #shape-tooltip p {
                    color: var(--accent);
                    opacity: .45;
                    transition: all .3s ease
                }
  
                    #shape-context button:hover span, #shape-tooltip p:hover {
                        opacity: 1
                    }
  
          .constructor-modal {
            display: none;
            justify-content: center;
            align-items: center;
            position: absolute;
            z-index: 900;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.55);
            opacity: 0
          }
  
            .constructor-modal.active {
                display: flex;
                opacity: 1
            }
  
            .constructor-modal .wrapper {
                display: none;
                position: relative;
                z-index: 905;
                background: #fff;
                padding: 15px;
                border-radius: 5px;
                min-width: 525px
            }
  
                .constructor-modal .wrapper h1 {
                    margin: 0 0 15px;
                    padding: 0;
                    font-size: 20px;
                    font-weight: 500;
                    color: var(--accent);
                    text-align: center
                }
  
                .constructor-modal .wrapper ul {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-template-rows: auto;
                    grid-gap: 10px;
                    margin: 0;
                    padding: 0
                }
  
                    .constructor-modal .wrapper ul li {
                        display: flex;
                        justify-content: space-between;
                        list-style: none;
                        padding: 20px 10px;
                        margin: 0;
                        background: #f3f3f3;
                        border-radius: 5px;
                        height: 16px;
                        width: 100%;
                    }
  
                        .constructor-modal .wrapper ul li label {
                            color: var(--accent);
                            width: 100%;
                            line-height: 0;
                        }
  
                        .constructor-modal .wrapper ul li span {
                            font-size: 14px;
                            color: var(--accent);
                            opacity: 1;
                            line-height: 0;
                        }
  
            .constructor-modal .background {
                position: absolute;
                z-index: 902;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: transparent;
                cursor: pointer;
                animation: fadeIn .3s ease
            }
  
            .constructor-modal .wrapper button {
                margin-top: 10px;
                padding: 10px;
                background: #f3f3f3;
                border: none;
                outline: none;
                border-radius: 5px;
                width: 100%;
                cursor: pointer
            }
  
                .constructor-modal .wrapper button span {
                    color: var(--accent);
                    opacity: .4;
                    transition: all .3s ease
                }
  
                .constructor-modal .wrapper button:hover span {
                    opacity: 1
                }
  
          .checkbox-container {
            display: block;
            position: relative;
            cursor: pointer;
            font-size: 14px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none
          }
  
            .checkbox-container input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0
            }
  
            .checkbox-container .checkbox-checkmark {
                position: absolute;
                z-index: 906;
                top: -15px;
                right: -60px;
                height: 30px;
                width: 30px;
                background: #f3f3f3;
                border-radius: 5px;
                transition: all .3s ease
            }
  
            .checkbox-container:hover input ~ .checkbox-checkmark {
                background-color: var(--accent);
                opacity: .25
            }
  
            .checkbox-container input:checked ~ .checkbox-checkmark {
                background-color: var(--accent);
                opacity: 1
            }
  
            .checkbox-container .checkbox-checkmark:after {
                content: "";
                position: absolute;
                display: none
            }
  
            .checkbox-container input:checked ~ .checkbox-checkmark:after {
                display: block
            }
  
            .checkbox-container .checkbox-checkmark:after {
                top: 10px;
                left: 10px;
                width: calc(100% - 20px);
                height: calc(100% - 20px);
                border-radius: 3px;
                background: #fff
            }
  
          .checkbox-empty {
            text-align: center;
            font-weight: 300;
            opacity: .45;
            margin: 15px 0;
          }
  
          .constructor-modal .wrapper ul li.checkbox-item {
            width: calc(100% - 40px);
            padding: 15px 20px 15px 10px;
          }
  
          .constructor-modal .wrapper button {
            background: var(--accent)
          }
  
            .constructor-modal .wrapper button span {
                opacity: 1;
                color: #fff
            }
  
          .constructor-modal .wrapper .options-list .option-item .option-value img {
            width: 16px;
            height: 16px;
            object-fit: contain;
            position: absolute;
            right: 25px;
            opacity: .75;
            cursor: pointer;
            transition: all .3s ease
          }
  
            .constructor-modal .wrapper .options-list .option-item .option-value img:hover {
                opacity: 1
            }
  
          .wrapper.save-content .form-group {
            margin: 0 0 10px
          }
  
            .wrapper.save-content .form-group .setting {
                width: 100%;
                box-shadow: none;
                padding: 10px;
                margin: 0;
                background: #f3f3f3;
                border-radius: 5px;
                outline: none
            }
  
          #drop_zone {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px dashed var(--accent);
            border-radius: 10px;
            height: 256px;
            color: var(--accent);
            font-size: 14px;
            opacity: .4;
            cursor: pointer;
            transition: all .3s ease
          }
  
            #drop_zone:hover {
                opacity: 1
            }
  
            #drop_zone span {
                background: #153f86;
                border-radius: 5px;
                padding: 10px 15px;
                color: #fff;
                cursor: default
            }
  
            #drop_zone.dropped {
                opacity: 1;
                background: rgba(21,63,134,.17)
            }
  
          .wrapper.resize-content {
            width: 525px
          }
  
            .wrapper.resize-content h2 {
                font-size: 14px;
                font-weight: 400;
                padding: 0 15px;
                text-align: center;
                color: var(--accent)
            }
  
            .wrapper.resize-content .form-group {
                margin: 0
            }
  
                .wrapper.resize-content .form-group button {
                    color: #fff;
                    opacity: 1
                }
  
          .load-select-button {
            background: var(--accent);
            color: #fff;
            margin: 0;
            padding: 10px;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer
          }
  
          .load-select-zone {
            position: relative
          }
  
            .load-select-zone #load-select-list {
                position: absolute;
                width: 100%;
                background: var(--accent);
                padding: 10px;
                margin-top: 15px;
                border-radius: 5px;
                z-index: 907;
                box-shadow: 0 0 50px 0 rgba(0,0,0,.45);
                font-size: 14px
            }
  
                .load-select-zone #load-select-list .load-select-item {
                    display: flex;
                    justify-content: space-between;
                    list-style: none;
                    padding: 20px 10px;
                    margin: 0;
                    background: #f3f3f3;
                    border-radius: 5px;
                    width: 100%;
                    cursor: pointer
                }
  
                    .load-select-zone #load-select-list .load-select-item span {
                        opacity: .4;
                        transition: all .3s ease
                    }
  
                    .load-select-zone #load-select-list .load-select-item:hover span {
                        opacity: 1
                    }
  
          .delimiter {
            width: 100%;
            text-align: center;
            color: var(--gray);
            text-transform: uppercase;
            font-size: 14px;
            margin: 10px 0
          }
  
          .constructor-logo {
            display: flex;
            position: absolute;
            z-index: 540;
            top: 0;
            left: 0;
            margin: 25px 0 0 25px;
            cursor: pointer;
            user-select: none
          }
  
            .constructor-logo .image {
                position: relative;
                z-index: 542;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #fff;
                border-radius: 5px;
                width: 64px;
                height: 64px
            }
  
                .constructor-logo .image img {
                    width: 48px;
                    height: 48px;
                    object-fit: contain;
                }
  
            .constructor-logo .title {
                position: relative;
                z-index: 541;
                top: 6px;
                background: #fff;
                border-radius: 0 5px 5px 0;
                padding: 0 75px 0 15px;
                height: 35px;
                box-shadow: 0 0 75px 0 rgba(41,46,56,.25);
                display: flex;
                align-items: center;
            }
  
                .constructor-logo .title h1 {
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--accent);
                    line-height: 0;
                    opacity: .45;
                    padding: 0;
                    position: relative;
                    top: 3px;
                }
  
          .constructor-tools {
            position: absolute;
            z-index: 500;
            top: 0;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 15px
          }
  
            .constructor-tools .tool {
                display: flex;
                justify-content: center;
                align-items: center;
                border: none;
                outline: none;
                background: #fff;
                border-radius: 5px;
                width: 38px;
                height: 38px;
                margin: 5px;
                cursor: pointer;
                color: #072850;
                opacity: .75;
                transition: all .3s ease
            }
  
                .constructor-tools .tool img {
                    position: relative;
                    width: 16px;
                    height: 16px;
                    object-fit: contain
                }
  
                .constructor-tools .tool.active, .constructor-tools .tool:hover {
                    opacity: 1
                }
  
                .constructor-tools .tool.disable:hover {
                    opacity: .75;
                    cursor: default
                }
  
          .constructor-funcs {
            position: absolute;
            z-index: 541;
            top: 0;
            right: 0;
            margin: 15px 15px 0 0
          }
  
          .constructor-layers {
            position: absolute;
            z-index: 555;
            right: 0;
            bottom: 0;
            margin-right: 25px;
            margin-bottom: 25px;
            width: 256px;
            height: 256px;
            background: #fff;
            border-radius: 5px;
            overflow-y: scroll;
            box-shadow: 0 0 75px 0 rgba(41,46,56,.25)
          }
  
            .constructor-layers::-webkit-scrollbar {
                width: 2px;
                border-radius: 5px
            }
  
            .constructor-layers::-webkit-scrollbar-track {
                box-shadow: none
            }
  
            .constructor-layers::-webkit-scrollbar-thumb {
                background-color: #a9a9a9;
                outline: 1px solid #708090
            }
  
            .constructor-layers .list .item {
                display: flex;
                align-items: center;
                position: relative;
                padding: 10px;
                margin: 10px;
                background: #f3f3f3;
                border-radius: 5px;
                opacity: .4;
                cursor: pointer;
                transition: all .3s ease
            }
  
                .constructor-layers .list .item.empty {
                    opacity: .75
                }
  
                .constructor-layers .list .item.active, .constructor-layers .list .item:hover {
                    opacity: 1
                }
  
                .constructor-layers .list .item h3 {
                    font-size: 14px;
                    color: var(--accent);
                    font-weight: 400;
                    padding: 5px 0;
                    margin: -10px 0 0;
                    position: relative;
                    top: 5px;
                }
  
                .constructor-layers .list .item input.active {
                    color: #333
                }
  
                .constructor-layers .list .item .form-group {
                    position: absolute;
                    right: 0;
                    top: 2px;
                }
  
                .constructor-layers .list .item .action {
                    position: relative;
                    top: -5px;
                    border: none;
                    outline: none;
                    background: none;
                    width: 16px;
                    height: 16px;
                    opacity: .75;
                    margin: 0 5px;
                    cursor: pointer;
                    transition: all .3s ease
                }
  
                    .constructor-layers .list .item .action:hover {
                        opacity: 1
                    }
  
                    .constructor-layers .list .item .action img {
                        width: 16px;
                        height: 16px;
                        object-fit: contain
                    }
  
                .constructor-layers .list .item.empty {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px 10px;
                }
  
                    .constructor-layers .list .item.empty .form-group {
                        width: 100%
                    }
  
                        .constructor-layers .list .item.empty .form-group .action {
                            left: 10px;
                            width: 100%;
                            height: 100%
                        }
  
            .constructor-layers .layer.active {
                opacity: 1
            }
  
            .constructor-layers .layer .input-layer {
                display: none;
                position: relative;
                top: 0;
                left: 0;
                border-radius: 5px;
                border: none;
                outline: none;
                background: none;
                width: calc(100% - 20px);
                font-size: 14px;
                color: var(--accent);
                padding: 1px 0;
                line-height: 0
            }
  
          .constructor-message {
            position: absolute;
            z-index: 155;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
            opacity: 1;
            top: 0;
            left: 0;
            display: none;
            background: rgba(0, 0, 0, .25);
            transition: all .3s ease;
          }
  
            .constructor-message.warning {
                top: 100px;
                align-items: flex-start;
                animation: slideIn .3s ease
            }
  
            .constructor-message.open p {
                top: 0;
                align-items: flex-start;
                animation: fadeIn .3s ease
            }
  
            .constructor-message.hide {
                display: none;
                opacity: 0;
                animation: fadeOut .3s ease
            }
  
            .constructor-message p {
                background: #fff;
                border-radius: 5px;
                padding: 25px;
                cursor: default;
                box-shadow: 0 0 75px 0 rgba(41,46,56,.25)
            }
  
                .constructor-message p span {
                    color: var(--accent);
                    opacity: .45;
                    font-size: 14px
                }
  
          .constructor-informations {
            position: absolute;
            z-index: 255;
            left: 0;
            bottom: 0;
            margin-left: 20px;
            margin-bottom: 20px
          }
  
            .constructor-informations .wrap-notifications {
                display: flex;
                flex-direction: column;
                margin-left: 5px;
                margin-bottom: 5px
            }
  
                .constructor-informations .wrap-notifications .notify-list {
                    display: flex;
                    flex-direction: column
                }
  
                    .constructor-informations .wrap-notifications .notify-list .notify-item {
                        list-style: none;
                        padding: 10px 15px;
                        background: #fff;
                        border-radius: 5px;
                        margin: 5px 0;
                        cursor: pointer;
                        opacity: 1
                    }
  
                        .constructor-informations .wrap-notifications .notify-list .notify-item span {
                            font-size: 14px;
                            color: var(--accent);
                            opacity: .45
                        }
  
            .constructor-informations .wrap-buttons {
                display: flex
            }
  
          .shape-tooltip li {
            display: none;
          }
  
          .disable {
            opacity: .25;
            cursor: default !important;
          }
  
          .fadeIn {
            animation: fadeIn .3s ease
          }
  
          .fadeOut {
            animation: fadeOut .3s ease
          }
  
          .slideIn {
            animation: fadeIn .3s ease
          }
  
          .slideOut {
            animation: fadeOut .3s ease
          }
  
          @keyframes fadeIn {
            0% {
                opacity: 0
            }
  
            25% {
                opacity: .25
            }
  
            50% {
                opacity: .5
            }
  
            75% {
                opacity: .75
            }
  
            to {
                opacity: 1
            }
          }
  
          @keyframes fadeOut {
            0% {
                opacity: 1
            }
  
            25% {
                opacity: .75
            }
  
            50% {
                opacity: .5
            }
  
            75% {
                opacity: .25
            }
  
            to {
                opacity: 0
            }
          }
  
          @keyframes slideIn {
            0% {
                opacity: 0;
                top: 0
            }
  
            25% {
                opacity: .25;
                top: 25px
            }
  
            50% {
                opacity: .5;
                top: 50px
            }
  
            75% {
                opacity: .75;
                top: 75px
            }
  
            to {
                opacity: 1;
                top: 100px
            }
          }
  
          @keyframes slideOut {
            0% {
                opacity: 1;
                top: 100px
            }
  
            25% {
                opacity: .75;
                top: 75px
            }
  
            50% {
                opacity: .5;
                top: 50px
            }
  
            75% {
                opacity: .25;
                top: 25px
            }
  
            to {
                opacity: 0;
                top: 0
            }
          }
      `
      style.innerHTML = css
      head.append(style)
    }
  }