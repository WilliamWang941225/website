import BackHomeButton from "./BackHomeButton";

export default function Tutor() {
  return (
    <section id="four">
      <div className="container">
        <BackHomeButton />

        <header className="tutor-hero">
          <p className="section-eyebrow">家教簡歷</p>
          <h2>物理奧林匹亞</h2>
          <p>時間：晚上，每次上課時間需大於 1 小時</p>
          <p>上課方式：線上，視訊軟體 Google Meet</p>
          <div className="tutor-actions">
            <a
              className="button primary"
              href="mailto:WilliamWang941225@gmail.com"
            >
              Gmail：WilliamWang941225@gmail.com
            </a>
            <a
              className="button alt"
              href="document/CV.pdf"
              target="_blank"
              rel="noreferrer"
            >
              家教簡歷
            </a>
          </div>
        </header>

        <section className="tutor-section" aria-labelledby="student-title">
          <p className="section-eyebrow">學生條件</p>
          <h3 id="student-title">學生條件</h3>
          <ol className="tutor-numbered-list">
            <li>有意願通過物理奧林匹亞初選或複選</li>
            <li>在課後願意花費時間吸收與練習</li>
          </ol>
        </section>

        <section className="tutor-section" aria-labelledby="method-title">
          <p className="section-eyebrow">教學方式</p>
          <h3 id="method-title">依能力分為兩班：</h3>

          <div className="tutor-detail-grid tutor-tier-grid">
            <article>
              <h4>初選/高中物理進階班</h4>
              <p>價格：NTD 1200/hr 以上</p>
              <p>目標：通過物理奧林匹亞初選，能解決高中物理難題</p>
            </article>
            <article>
              <h4>複選班</h4>
              <p>價格：NTD 1600/hr 以上</p>
              <p>目標：通過物理奧林匹亞複選</p>
            </article>
          </div>

          <p className="tutor-note">
            補充說明：以上價格皆可議，且為一對一價格，若能多人同時上課則會減價。
          </p>
        </section>

        <section className="tutor-section tutor-practical" aria-labelledby="study-title">
          <p className="section-eyebrow">共通教學模式</p>
          <h3 id="study-title">共通教學模式：</h3>

          <div className="tutor-pillar-grid">
            <article className="tutor-pillar">
              <span className="icon solid fa-lightbulb" aria-hidden="true" />
              <h4>觀念</h4>
              <p>基本知識教授</p>
            </article>
            <article className="tutor-pillar">
              <span className="icon solid fa-pencil-ruler" aria-hidden="true" />
              <h4>刷題</h4>
              <p>給予大量題目，有博士班考題、國內外物奧練習題、自編題目</p>
            </article>
            <article className="tutor-pillar">
              <span className="icon solid fa-clipboard-check" aria-hidden="true" />
              <h4>檢討</h4>
              <p>每次上課會檢討題目並提點重要概念，從題目中學習</p>
            </article>
          </div>
        </section>

        <section className="tutor-section" aria-labelledby="experience-title">
          <p className="section-eyebrow">個人經歷</p>
          <h3 id="experience-title">個人經歷</h3>
          <ul className="tutor-experience-list">
            <li>第 53 屆國際物理奧林匹亞競賽金牌</li>
            <li>第 23 屆亞洲物理奧林匹亞競賽金牌</li>
            <li>2022 年初選 PR98，複選 PR97</li>
            <li>2023 年初選 PR99，決選第四名</li>
            <li>2024 年初選 PR99</li>
            <li>111 學年度物理學科能力競賽區域賽第一名，全國賽佳作</li>
            <li>清華大學高中科學研究人才培育計畫（物理組）</li>
            <li>2022 全國高中物理探究實作競賽金牌</li>
            <li>多益 930 金色證書，寫作 170（裸考）</li>
          </ul>
        </section>

        <section className="tutor-section" aria-labelledby="teaching-title">
          <p className="section-eyebrow">教學經歷</p>
          <h3 id="teaching-title">教學經歷</h3>
          <ol className="tutor-numbered-list">
            <li>精誠中學物理讀書會負責人兼講師（三位學生入選選訓營）</li>
            <li>第七屆天物盃出題者</li>
            <li>2024 IPhOC 講師</li>
            <li>2025 IPhOC 總召兼講師</li>
          </ol>
        </section>

        <section className="tutor-credibility" aria-labelledby="contact-title">
          <span className="icon solid fa-envelope" aria-hidden="true" />
          <div>
            <p className="section-eyebrow">聯絡方式</p>
            <h3 id="contact-title">聯絡方式</h3>
            <p>
              Gmail：
              <a href="mailto:WilliamWang941225@gmail.com">
                WilliamWang941225@gmail.com
              </a>
            </p>
            <p>
              Facebook 私訊：
              <a
                href="https://www.facebook.com/wang.zhao.guo.2025/"
                target="_blank"
                rel="noreferrer"
              >
                https://www.facebook.com/wang.zhao.guo.2025/
              </a>
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
