import { useMemo, useState } from 'react';
import { CATEGORIES, FEATURED, POSTS } from '../../data/posts.js';

function PostMeta({ cat, right }) {
  return (
    <div className="post__meta">
      <span className="post__cat">{cat}</span>
      <span className="label">{right}</span>
    </div>
  );
}

function PostFoot({ soon }) {
  return (
    <div className="post__foot">
      <span className="post__soon">{soon ? 'Draft · publishing soon' : 'Read the article'}</span>
    </div>
  );
}

export default function BlogSection() {
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => POSTS.filter((p) => filter === 'all' || p.cat === filter),
    [filter]
  );
  const featuredVisible = filter === 'all' || FEATURED.cat === filter;

  return (
    <section className="section" id="articles" aria-label="Articles" style={{ paddingTop: 'clamp(40px,6vw,72px)' }}>
      <div className="container">
        {featuredVisible && (
          <article className="post post--featured" data-reveal="">
            <div className="post__body">
              <PostMeta cat={FEATURED.catLabel} right={`Featured guide · ${FEATURED.mins}`} />
              <h2 className="display h3 post__title">{FEATURED.title}</h2>
              <p>{FEATURED.blurb}</p>
              <PostFoot soon={FEATURED.soon} />
            </div>
            <figure className="photo photo--duo post__photo">
              <img src={FEATURED.image} alt={FEATURED.imageAlt} loading="lazy" width="900" height="640" />
            </figure>
          </article>
        )}

        <div className="filters" id="postFilters" role="group" aria-label="Filter articles by topic">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className="chip"
              type="button"
              aria-pressed={filter === c.key}
              onClick={() => setFilter(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="posts" id="postGrid">
          {visible.map((p) => (
            <article className="post" key={p.slug} data-reveal="">
              <PostMeta cat={p.catLabel} right={p.mins} />
              <h3 className="display post__title">{p.title}</h3>
              <p>{p.blurb}</p>
              <PostFoot soon={p.soon} />
            </article>
          ))}
        </div>
        {visible.length === 0 && !featuredVisible && (
          <p className="posts__empty label">Nothing in this topic yet — new guides are on the way.</p>
        )}
      </div>
    </section>
  );
}
