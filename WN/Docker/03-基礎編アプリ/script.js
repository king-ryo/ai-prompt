/**
 * 用語解説データ
 * ※実務的な解説に更新済み
 */
const keywordDefinitions = {
    iac: {
        title: "IaC (Infrastructure as Code)",
        text: "インフラの構成を、手動操作ではなく<strong>「コード（設定ファイル）」として記述・管理する手法</strong>です。<br><br>従来のGUI操作やコマンド入力では、「何を設定したか」の履歴が残りにくく、担当者によって環境に差異が生じやすい（環境のブラックボックス化）という問題がありました。<br><br>IaCを導入することで、ソフトウェア開発と同じような管理が可能になります：<br><ul style='margin-left:20px; margin-top:10px;'><li><strong>バージョン管理：</strong> Git等を用いて、いつ誰が何を変更したかを追跡できる。</li><li><strong>再現性（冪等性）：</strong> 何度実行しても、常に同じ状態の環境が構築されることを保証する。</li><li><strong>自動化：</strong> 人手を使わず、コマンド一つで構築・破棄ができる。</li></ul><br>Dockerでは <code>Dockerfile</code> がこの「コード」に該当します。"
    },
    image: {
        title: "Dockerイメージ",
        text: "コンテナを作成するための「金型」や「設計図」にあたるものです。<br><br>OS（Linuxなど）、アプリケーション、ライブラリなどが読み取り専用のファイルシステムとしてパッケージされています。<code>docker run</code> コマンドを実行すると、このイメージをもとにして実体（コンテナ）が生成されます。"
    },
    nginx: {
        title: "Nginx (エンジンエックス)",
        text: "世界中で広く使われている、オープンソースのWebサーバソフトウェアです。<br><br>非常に軽量で高速に動作し、大量の同時アクセスを処理することに長けています。Dockerの学習では、「とりあえずWebページを表示させる」ためのサンプルとしてよく利用されます。"
    }
};

/**
 * 講義コンテンツデータ
 */
const lectureData = [
    {
        id: "sec1-1",
        title: "1-1. Dockerの基礎概念",
        slide: "slide/chapter1.pdf",
        steps: [
            {
                type: "text",
                html: `
                    <h2>1. Dockerとは？</h2>
                    <p>Docker（ドッカー）を一言でいうと、<strong>「データやプログラムを隔離された箱（コンテナ）に入れて、どこでも同じように動かせる仕組み」</strong>です。</p>
                    <ul>
                        <li><strong>コンテナ（Container）：</strong> アプリケーションとその実行に必要なもの（ライブラリや設定ファイルなど）を一つにまとめた「箱」のことです。</li>
                    </ul>
                `
            },
            {
                type: "text",
                html: `
                    <h2>2. なぜDockerが必要なのか？</h2>
                    <p>なぜこれまでのやり方ではダメで、Dockerが使われるようになったのでしょうか？「3つの実行スタイル」を比較するとよく分かります。</p>
                    <h3>① ホストOS直接実行（従来の方法）</h3>
                    <p>自分のPC（WindowsやMac）に直接インストーラを使ってソフトを入れる方法です。</p>
                    <ul>
                        <li><strong>メリット：</strong> PCの性能をフルに使える。</li>
                        <li><strong>デメリット：</strong>
                            <ul>
                                <li><strong>環境が汚れる：</strong> 色々なソフトを入れたり消したりするとゴミが残り、PCが不調になる。</li>
                                <li><strong>環境の衝突：</strong> 「アプリAはPython 3が必要」「アプリBはPython 2が必要」といった場合、共存させるのが大変。</li>
                            </ul>
                        </li>
                    </ul>
                `
            },
            {
                type: "text",
                html: `
                    <h3>② 仮想マシン（VM）</h3>
                    <p>PCの中に「別のPC（ゲストOS）」を丸ごと作る方法です（VirtualBoxなど）。</p>
                    <ul>
                        <li><strong>メリット：</strong> 環境を完全に分けられるので安全。</li>
                        <li><strong>デメリット：</strong> 重い・遅い（OSを丸ごと動かすため）。</li>
                    </ul>
                    <h3>③ コンテナ（Docker）</h3>
                    <p>OSの機能（カーネル）は自分のPCと共有し、アプリ部分だけを隔離する方法です。</p>
                    <ul>
                        <li><strong>メリット：</strong> ①と②の「いいとこ取り」。軽くて速い（起動は秒単位）。</li>
                    </ul>
                `
            },
            {
                type: "text",
                html: `
                    <h3>【まとめ：3つの比較表】</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>項目</th>
                                <th>①ホストOS直接実行</th>
                                <th>②仮想マシン (VM)</th>
                                <th>③コンテナ (Docker)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>仕組み</strong></td>
                                <td>PCに直接入れる</td>
                                <td>PCの中に「別のPC」を作る</td>
                                <td>PCの中に「隔離された箱」を作る</td>
                            </tr>
                            <tr>
                                <td><strong>起動速度</strong></td>
                                <td>最速</td>
                                <td>遅い（数分）</td>
                                <td><strong>速い（数秒）</strong></td>
                            </tr>
                            <tr>
                                <td><strong>環境隔離</strong></td>
                                <td>× できない</td>
                                <td>◎ 完全隔離</td>
                                <td><strong>○ プロセス隔離</strong></td>
                            </tr>
                            <tr>
                                <td><strong>マシン負荷</strong></td>
                                <td>軽い</td>
                                <td>重い</td>
                                <td><strong>軽い</strong></td>
                            </tr>
                        </tbody>
                    </table>
                `
            },
            {
                type: "text",
                html: `
                    <h2>3. Dockerを使う目的</h2>
                    <ol>
                        <li><strong>「環境の差異」をなくす：</strong> 「私のPCでは動くのに！」問題を解決。</li>
                        <li><strong><span class="keyword-link" data-keyword="iac">IaC（Infrastructure as Code）</span>の第一歩：</strong> 「どういうサーバを作るか」をコードで管理できます。</li>
                    </ol>
                `
            }
        ]
    },
    {
        id: "sec1-2",
        title: "1-2. 環境構築",
        slide: "slide/chapter1.pdf",
        steps: [
            {
                type: "text",
                html: `
                    <h2>1. Docker Desktopのインストール</h2>
                    <p>お使いのOSに合わせて、公式サイトからインストーラをダウンロード・実行してください。</p>
                    <ul>
                        <li><a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker Desktopのダウンロード (公式サイト)</a></li>
                        <li><strong>Windows:</strong> "Docker Desktop for Windows"</li>
                        <li><strong>Mac:</strong> "Docker Desktop for Mac" (M1/M2の方はApple Chip版)</li>
                    </ul>
                `
            },
            {
                type: "text",
                html: `
                    <h2>2. 動作確認</h2>
                    <p>インストール後、Docker Desktopを起動し、ターミナルで以下のコマンドを入力します。</p>
                    <pre><code>docker --version</code></pre>
                    <p>成功すると、<code>Docker version 24.0.x...</code> のようにバージョンが表示されます。</p>
                    <p><i class="fa-solid fa-circle-info"></i> バージョンが表示されれば、環境構築は完了です！</p>
                `
            }
        ]
    },
    {
        id: "sec1-3",
        title: "1-3. 基本コマンドとライフサイクル",
        slide: "slide/chapter1.pdf",
        steps: [
            {
                type: "text",
                html: `
                    <h2>Step 1: Hello World（最初のコンテナ起動）</h2>
                    <p>Dockerが正しく動くか確認するため、最小のコンテナを動かします。</p>
                    <pre><code>docker run hello-world</code></pre>
                    <h3>何が起きたのか？</h3>
                    <ol>
                        <li>PC内に<span class="keyword-link" data-keyword="image">イメージ</span>（金型）があるか探す。</li>
                        <li>なければインターネット（Docker Hub）からダウンロードする。</li>
                        <li>コンテナ（実体）を作成して起動する。</li>
                        <li>メッセージを表示して終了。</li>
                    </ol>
                `
            },
            {
                type: "text",
                html: `
                    <h2>Step 2: Webサーバ起動（Nginx）</h2>
                    <p>Webサーバ（<span class="keyword-link" data-keyword="nginx">Nginx</span>）を立ち上げてブラウザからアクセスします。</p>
                    <pre><code>docker run -d -p 8080:80 nginx</code></pre>
                    <ul>
                        <li><code>run</code>: コンテナを作成して起動せよ。</li>
                        <li><code>-d</code>: バックグラウンドで実行せよ。</li>
                        <li><code>-p 8080:80</code>: PCの8080番ポートをコンテナの80番に繋げよ。</li>
                    </ul>
                    <p>👉 ブラウザで <strong>http://localhost:8080</strong> にアクセスし、「Welcome to nginx!」が表示されるか確認してください。</p>
                `
            },
            {
                type: "text",
                html: `
                    <h2>Step 3: コンテナの操作と削除</h2>
                    <p><strong>1. 起動中のコンテナ確認</strong></p>
                    <pre><code>docker ps</code></pre>
                    <p><strong>2. コンテナの停止</strong> (IDの先頭数文字を指定)</p>
                    <pre><code>docker stop [コンテナID]</code></pre>
                    <p><strong>3. コンテナの削除</strong>（お掃除）</p>
                    <pre><code>docker rm [コンテナID]</code></pre>
                    <p><strong>4. イメージの削除</strong></p>
                    <pre><code>docker rmi hello-world</code></pre>
                `
            }
        ]
    },
    {
        id: "sec1-4",
        title: "1-4. 確認問題",
        slide: "slide/chapter1.pdf",
        steps: [
            {
                type: "text",
                html: `
                    <h2>学習内容の確認</h2>
                    <p>ここまで学んだ内容をクイズ形式で振り返りましょう。</p>
                `
            },
            {
                type: "quiz",
                questions: [
                    {
                        q: "Q1. 仮想マシン(VM)と比較した際の、Dockerコンテナの特徴として正しいものはどれですか？",
                        options: [
                            "OS（ゲストOS）を丸ごと含んでいるため、起動が遅い",
                            "ホストOSのカーネルを共有するため、起動が高速で軽量である",
                            "環境の隔離性が低く、ホストOSの環境を汚しやすい",
                            "本番環境と開発環境で挙動が異なることが頻繁にある"
                        ],
                        correct: 1, // index of options (0-3)
                        explanation: "正解は「ホストOSのカーネルを共有するため、起動が高速で軽量である」です。<br>VMはゲストOSを丸ごと起動するため重くなりますが、コンテナはプロセスとして動作するため非常に軽量です。"
                    },
                    {
                        q: "Q2. コンテナを新しく作成し、起動するためのコマンドはどれですか？",
                        options: [
                            "docker start",
                            "docker build",
                            "docker ps",
                            "docker run"
                        ],
                        correct: 3,
                        explanation: "正解は <code>docker run</code> です。<br><code>docker start</code> は「停止中の既存コンテナ」を再開するコマンドです。新規作成・起動は <code>run</code> を使います。"
                    },
                    {
                        q: "Q3. 「イメージ」と「コンテナ」の関係性として正しい説明はどれですか？",
                        options: [
                            "イメージは「金型（設計図）」であり、コンテナはその金型から作られた「実体」である",
                            "コンテナは「金型」であり、イメージはその中で動く「実体」である",
                            "イメージとコンテナは全く同じ意味であり、呼び方が違うだけである",
                            "コンテナを削除すると、元のイメージも自動的に削除される"
                        ],
                        correct: 0,
                        explanation: "正解は「イメージは『金型』、コンテナは『実体』」です。<br>1つのイメージから複数のコンテナを作成できます。コンテナを削除してもイメージは残ります。"
                    }
                ]
            }
        ]
    }
];

// 状態管理
let currentSectionIndex = 0;
let currentStepIndex = 0;

// DOM要素
const navList = document.getElementById('chapter-nav');
const contentArea = document.getElementById('content-area');
const nextBtn = document.getElementById('next-btn');
const sectionTitle = document.getElementById('section-title');
const progressBar = document.getElementById('progress-bar');
const tocList = document.getElementById('toc-list');

// ビュー要素
const lectureInterface = document.getElementById('lecture-interface');
const completionView = document.getElementById('completion-view');
const restartBtn = document.getElementById('restart-btn');

// スライドモーダル関連
const slideModal = document.getElementById('slide-modal');
const closeSlideModalBtn = document.getElementById('close-slide-modal');
const slideFrame = document.getElementById('slide-frame');

// キーワードモーダル関連
const keywordModal = document.getElementById('keyword-modal');
const closeKeywordModalBtn = document.getElementById('close-keyword-modal');
const keywordTitle = document.getElementById('keyword-title');
const keywordDesc = document.getElementById('keyword-desc');

// 初期化
function init() {
    renderNav();
    loadSection(0);
    
    nextBtn.addEventListener('click', handleNext);
    restartBtn.addEventListener('click', handleRestart);
    closeSlideModalBtn.addEventListener('click', () => toggleModal(slideModal, false));
    closeKeywordModalBtn.addEventListener('click', () => toggleModal(keywordModal, false));

    // コンテンツエリア内のクリックイベント委譲（キーワードリンク用）
    contentArea.addEventListener('click', (e) => {
        if (e.target.classList.contains('keyword-link')) {
            const key = e.target.getAttribute('data-keyword');
            openKeywordModal(key);
        }
    });
}

// モーダル表示切替
function toggleModal(modalEl, show) {
    if (show) {
        modalEl.classList.remove('hidden');
    } else {
        modalEl.classList.add('hidden');
        if (modalEl.id === 'slide-modal') slideFrame.src = '';
    }
}

// キーワード解説表示
function openKeywordModal(key) {
    const data = keywordDefinitions[key];
    if (data) {
        keywordTitle.textContent = data.title;
        keywordDesc.innerHTML = data.text;
        toggleModal(keywordModal, true);
    }
}

// ナビゲーション描画
function renderNav() {
    navList.innerHTML = '';
    lectureData.forEach((section, index) => {
        const li = document.createElement('li');
        li.textContent = section.title;
        li.onclick = () => {
            currentSectionIndex = index;
            loadSection(index);
        };
        if (index === currentSectionIndex) {
            li.classList.add('active');
        }
        navList.appendChild(li);
    });
}

// セクション読み込み
function loadSection(index) {
    // 完了画面が表示されていたら隠して講義画面を表示
    completionView.classList.add('hidden');
    lectureInterface.classList.remove('hidden');

    currentSectionIndex = index;
    currentStepIndex = -1; 
    contentArea.innerHTML = '';
    tocList.innerHTML = '';
    
    const section = lectureData[index];
    sectionTitle.textContent = section.title;
    
    // ナビ更新
    const navItems = navList.querySelectorAll('li');
    navItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    updateProgress();
    revealNextStep();
}

// 次のステップ表示
function revealNextStep() {
    const section = lectureData[currentSectionIndex];
    currentStepIndex++;

    if (currentStepIndex < section.steps.length) {
        const stepData = section.steps[currentStepIndex];
        
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';

        if (stepData.type === 'quiz') {
            renderQuiz(stepDiv, stepData.questions);
        } else {
            stepDiv.innerHTML = stepData.html;
        }
        
        contentArea.appendChild(stepDiv);

        if (window.MathJax) {
            MathJax.typesetPromise([stepDiv]);
        }

        stepDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        updateToc(stepDiv);
        updateBtnState();
        updateProgress();
    } else {
        handleSectionEnd();
    }
}

// クイズのレンダリング
function renderQuiz(container, questions) {
    questions.forEach((q, qIndex) => {
        const quizBox = document.createElement('div');
        quizBox.className = 'quiz-container';
        
        const qTitle = document.createElement('div');
        qTitle.className = 'quiz-question';
        qTitle.textContent = q.q;
        quizBox.appendChild(qTitle);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'quiz-options';

        // フィードバックエリア
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'quiz-feedback';
        
        q.options.forEach((opt, optIndex) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.onclick = () => {
                // すべてのボタンを無効化
                const allBtns = optionsDiv.querySelectorAll('.option-btn');
                allBtns.forEach(b => b.disabled = true);

                if (optIndex === q.correct) {
                    // 正解
                    btn.classList.add('selected-correct');
                    feedbackDiv.className = 'quiz-feedback correct';
                    feedbackDiv.innerHTML = `<span class="feedback-title"><i class="fa-solid fa-circle-check"></i> 正解！</span>${q.explanation}`;
                } else {
                    // 不正解
                    btn.classList.add('selected-incorrect');
                    // 正解のボタンも教える
                    allBtns[q.correct].classList.add('selected-correct');
                    feedbackDiv.className = 'quiz-feedback incorrect';
                    feedbackDiv.innerHTML = `<span class="feedback-title"><i class="fa-solid fa-circle-xmark"></i> 残念...</span>${q.explanation}`;
                }
            };
            optionsDiv.appendChild(btn);
        });

        quizBox.appendChild(optionsDiv);
        quizBox.appendChild(feedbackDiv);
        container.appendChild(quizBox);
    });
}

// 次へボタン処理
function handleNext() {
    const section = lectureData[currentSectionIndex];
    if (currentStepIndex < section.steps.length - 1) {
        revealNextStep();
    } else {
        if (currentSectionIndex === lectureData.length - 1) {
             // 最終章完了時 -> 学習完了ページ表示
             showCompletionView();
        } else {
            loadSection(currentSectionIndex + 1);
        }
    }
}

// 学習完了ページの表示
function showCompletionView() {
    lectureInterface.classList.add('hidden');
    completionView.classList.remove('hidden');
    // ナビゲーションのハイライトを全解除しても良いが、学習履歴として残しておいても良い
}

// リスタート処理
function handleRestart() {
    // 最初のセクションをロード
    loadSection(0);
}

// ボタン表示更新
function updateBtnState() {
    const section = lectureData[currentSectionIndex];
    
    if (currentStepIndex < section.steps.length - 1) {
        nextBtn.innerHTML = '次へ進む <i class="fa-solid fa-arrow-down"></i>';
        nextBtn.classList.remove('btn-secondary');
    } else {
        if (currentSectionIndex === lectureData.length - 1) {
            nextBtn.innerHTML = '学習完了 <i class="fa-solid fa-check"></i>';
            nextBtn.classList.add('btn-primary');
        } else {
            nextBtn.innerHTML = '次の章へ <i class="fa-solid fa-forward"></i>';
            nextBtn.classList.add('btn-primary');
        }
    }
}

// セクション終了処理
function handleSectionEnd() {
    // ボタンの状態更新で対応済み
}

// プログレスバー更新
function updateProgress() {
    const section = lectureData[currentSectionIndex];
    const total = section.steps.length;
    const current = currentStepIndex + 1;
    const percentage = total === 0 ? 0 : (current / total) * 100;
    progressBar.style.width = `${percentage}%`;
}

// 目次更新
function updateToc(stepElement) {
    const headers = stepElement.querySelectorAll('h2, h3');
    headers.forEach(header => {
        const li = document.createElement('li');
        li.textContent = header.innerText;
        li.onclick = () => {
            header.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        tocList.appendChild(li);
    });
}

// アプリ開始
document.addEventListener('DOMContentLoaded', init);