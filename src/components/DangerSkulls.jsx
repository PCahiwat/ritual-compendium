import React from 'react';

export default function DangerSkulls({ level, size = 'small' }) {
  const skulls = [];
  for (let i = 1; i <= 5; i++) {
    const active = i <= level;
    const lvl = active ? level : 0;
    skulls.push(
      <span
        key={i}
        className={`danger-skull${active ? ' active' : ''}${active ? ` level-${lvl}` : ''}`}
        style={size === 'large' ? { fontSize: '20px' } : undefined}
      >
        💀
      </span>
    );
  }

  return <div className="danger-skulls">{skulls}</div>;
}
