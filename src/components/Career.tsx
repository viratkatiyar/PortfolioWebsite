import { useEffect, useState } from "react";
import "./styles/Career.css";
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";
import { MdArrowOutward } from "react-icons/md";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: string;
}


// ─── Individual Cards ──────────────────────────────────────────────────────────

const LeetCodeCard = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const user = "viratkatiyar";

  useEffect(() => {
    fetch(`https://leetcode-stats-api.herokuapp.com/${user}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.status === "success") {
          setStats({
            totalSolved: d.totalSolved,
            easySolved: d.easySolved,
            mediumSolved: d.mediumSolved,
            hardSolved: d.hardSolved,
            ranking: d.ranking,
            acceptanceRate: Number(d.acceptanceRate).toFixed(1),
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const easyPct = stats ? (stats.easySolved / Math.max(stats.totalSolved, 1)) * 100 : 0;
  const medPct = stats ? (stats.mediumSolved / Math.max(stats.totalSolved, 1)) * 100 : 0;
  const hardPct = stats ? (stats.hardSolved / Math.max(stats.totalSolved, 1)) * 100 : 0;

  return (
    <div className="cp-card cp-card--leetcode">
      <div className="cp-card__header">
        <SiLeetcode className="cp-icon" />
        <div>
          <h3 className="cp-card__title">LeetCode</h3>
          <p className="cp-card__handle">@{user}</p>
        </div>
        <a
          href={`https://leetcode.com/${user}`}
          target="_blank"
          rel="noreferrer"
          className="cp-card__link"
          data-cursor="disable"
        >
          <MdArrowOutward />
        </a>
      </div>

      {loading ? (
        <div className="cp-skeleton-wrap">
          <div className="cp-skeleton" />
          <div className="cp-skeleton cp-skeleton--sm" />
          <div className="cp-skeleton cp-skeleton--sm" />
        </div>
      ) : !stats ? (
        <p className="cp-error">Could not load stats.</p>
      ) : (
        <>
          <div className="cp-stat-hero">
            <span className="cp-stat-big">{stats.totalSolved}</span>
            <span className="cp-stat-label">Problems Solved</span>
          </div>

          <div className="cp-diff-bars">
            <div className="cp-diff-row">
              <span className="cp-diff-label easy">Easy</span>
              <div className="cp-bar"><div className="cp-bar-fill easy" style={{ width: `${easyPct}%` }} /></div>
              <span className="cp-diff-count">{stats.easySolved}</span>
            </div>
            <div className="cp-diff-row">
              <span className="cp-diff-label medium">Medium</span>
              <div className="cp-bar"><div className="cp-bar-fill medium" style={{ width: `${medPct}%` }} /></div>
              <span className="cp-diff-count">{stats.mediumSolved}</span>
            </div>
            <div className="cp-diff-row">
              <span className="cp-diff-label hard">Hard</span>
              <div className="cp-bar"><div className="cp-bar-fill hard" style={{ width: `${hardPct}%` }} /></div>
              <span className="cp-diff-count">{stats.hardSolved}</span>
            </div>
          </div>

          <div className="cp-meta-row">
            <div className="cp-meta-item">
              <span className="cp-meta-val">#{stats.ranking.toLocaleString()}</span>
              <span className="cp-meta-key">Global Rank</span>
            </div>
            <div className="cp-meta-item">
              <span className="cp-meta-val">{stats.acceptanceRate}%</span>
              <span className="cp-meta-key">Acceptance</span>
            </div>
          </div>

          <div className="cp-heatmap">
            <span className="cp-meta-key" style={{ marginBottom: 6, display: 'block' }}>Activity Heatmap</span>
            <img
              src={`https://leetcard.jacoblin.cool/${user}?theme=dark&font=Inter&ext=heatmap&width=340&border=0`}
              alt="LeetCode Heatmap"
              className="cp-heatmap-img"
            />
          </div>
        </>
      )}
    </div>
  );
};

const CodeforcesCard = () => {
  const user = "viratkatiyar";

  return (
    <div className="cp-card cp-card--codeforces cp-card--simple">
      <div className="cp-card__header">
        <SiCodeforces className="cp-icon" />
        <div>
          <h3 className="cp-card__title">Codeforces</h3>
          <p className="cp-card__handle">@{user}</p>
        </div>
        <a
          href={`https://codeforces.com/profile/${user}`}
          target="_blank"
          rel="noreferrer"
          className="cp-card__link"
          data-cursor="disable"
        >
          <MdArrowOutward />
        </a>
      </div>
    </div>
  );
};

const CodeChefCard = () => {
  const user = "viratkatiyar21";

  return (
    <div className="cp-card cp-card--codechef cp-card--simple">
      <div className="cp-card__header">
        <SiCodechef className="cp-icon" />
        <div>
          <h3 className="cp-card__title">CodeChef</h3>
          <p className="cp-card__handle">@{user}</p>
        </div>
        <a
          href={`https://www.codechef.com/users/${user}`}
          target="_blank"
          rel="noreferrer"
          className="cp-card__link"
          data-cursor="disable"
        >
          <MdArrowOutward />
        </a>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          Coding <span>Profiles</span>
        </h2>

        <div className="coding-profiles-grid">
          <LeetCodeCard />
          <CodeforcesCard />
          <CodeChefCard />
        </div>
      </div>
    </div>
  );
};

export default Career;
